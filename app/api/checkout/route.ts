// app/api/checkout/route.ts — Crea Order (pending) + preference de Mercado Pago (Checkout Pro)
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { centavosToARS } from '@/lib/utils/currency'
import { getPreferenceClient, getBaseUrl, isMpConfigured } from '@/lib/mercadopago/client'
import { rateLimit, getClientIp } from '@/lib/utils/rate-limit'
import { logger } from '@/lib/logger'

export const runtime = 'nodejs'

const CheckoutSchema = z.object({
  items: z
    .array(
      z.object({
        sku: z.string().min(1),
        quantity: z.number().int().min(1).max(20),
      }),
    )
    .min(1)
    .max(20),
  customer: z.object({
    firstName: z.string().min(1).max(80),
    lastName: z.string().min(1).max(80),
    email: z.string().email().max(120),
    phone: z.string().min(6).max(40),
  }),
  shipping: z
    .object({
      address: z.string().max(200).optional(),
      city: z.string().max(120).optional(),
      notes: z.string().max(500).optional(),
    })
    .optional(),
})

function orderNumber(): string {
  // AZ + base36 de epoch (sin Date.now en build, acá es runtime → OK)
  return `AZ-${Date.now().toString(36).toUpperCase()}`
}

export async function POST(request: NextRequest) {
  if (!(await isMpConfigured())) {
    return NextResponse.json(
      { error: 'Mercado Pago no está configurado.' },
      { status: 503 },
    )
  }

  const ip = getClientIp(request.headers)
  const rl = rateLimit({ key: `checkout:${ip}`, limit: 15, windowMs: 60 * 60 * 1000 })
  if (!rl.allowed) {
    return NextResponse.json(
      { error: 'Demasiados intentos. Probá más tarde.' },
      { status: 429, headers: { 'Retry-After': String(rl.resetIn) } },
    )
  }

  let parsed: z.infer<typeof CheckoutSchema>
  try {
    parsed = CheckoutSchema.parse(await request.json())
  } catch (e) {
    return NextResponse.json({ error: 'Datos inválidos', detail: String(e) }, { status: 400 })
  }

  // ── RE-PRICING SERVER-SIDE (nunca confiar en precios del cliente) ──
  const skus = parsed.items.map((i) => i.sku)
  const variants = await prisma.productVariant.findMany({
    where: { sku: { in: skus }, isActive: true },
    include: { product: true },
  })
  const bySku = new Map(variants.map((v) => [v.sku, v]))

  const lineItems = parsed.items.map((it) => {
    const v = bySku.get(it.sku)
    if (!v) throw new Error(`SKU no encontrado: ${it.sku}`)
    return { variant: v, quantity: it.quantity, unitPrice: centavosToARS(v.price) }
  })

  // Validar que todos existan (si alguno falta, abortar con error claro)
  const missing = parsed.items.filter((it) => !bySku.has(it.sku))
  if (missing.length > 0) {
    return NextResponse.json(
      { error: 'Algún producto ya no está disponible.', skus: missing.map((m) => m.sku) },
      { status: 409 },
    )
  }

  const subtotal = lineItems.reduce((s, li) => s + li.unitPrice * li.quantity, 0)
  const shippingCost = 0 // envío gratis Villa María; resto a coordinar
  const total = subtotal + shippingCost

  const { customer, shipping } = parsed
  const customerName = `${customer.firstName} ${customer.lastName}`.trim()

  // ── Crear Order (pending) ──
  let order
  try {
    order = await prisma.order.create({
      data: {
        orderNumber: orderNumber(),
        customerName,
        customerEmail: customer.email,
        customerPhone: customer.phone,
        shippingAddress: (shipping ?? {}) as object,
        paymentMethod: 'mercadopago',
        paymentStatus: 'pending',
        deliveryMethod: 'piero-fabrica',
        subtotal,
        shipping: shippingCost,
        total,
        status: 'pending',
        items: {
          create: lineItems.map((li) => ({
            productId: li.variant.productId,
            variantId: li.variant.id,
            quantity: li.quantity,
            price: li.unitPrice,
            size: li.variant.measure ?? li.variant.dimensions,
          })),
        },
      },
    })
  } catch (e) {
    logger.error('Error creando orden', { error: String(e) })
    return NextResponse.json({ error: 'No se pudo crear la orden.' }, { status: 500 })
  }

  // ── Crear preference de Mercado Pago ──
  const base = getBaseUrl()
  // MP exige HTTPS público para auto_return; en local (http) lo omitimos.
  const isHttps = base.startsWith('https://')
  try {
    const preferenceClient = await getPreferenceClient()
    const pref = await preferenceClient.create({
      body: {
        items: lineItems.map((li) => ({
          id: li.variant.sku ?? li.variant.id,
          title: `${li.variant.product.name} · ${li.variant.measure ?? li.variant.dimensions}`,
          quantity: li.quantity,
          unit_price: li.unitPrice,
          currency_id: 'ARS',
        })),
        payer: {
          name: customer.firstName,
          surname: customer.lastName,
          email: customer.email,
          phone: { number: customer.phone },
        },
        back_urls: {
          success: `${base}/checkout/exito`,
          pending: `${base}/checkout/pendiente`,
          failure: `${base}/checkout/error`,
        },
        ...(isHttps ? { auto_return: 'approved' as const } : {}),
        external_reference: order.id,
        notification_url: `${base}/api/webhooks/mercadopago`,
        statement_descriptor: 'AZULCOLCHONES',
        metadata: { order_id: order.id },
      },
    })

    await prisma.order.update({
      where: { id: order.id },
      data: { preferenceId: pref.id, externalReference: order.id },
    })

    const initPoint = pref.init_point ?? pref.sandbox_init_point
    if (!initPoint) {
      return NextResponse.json({ error: 'MP no devolvió init_point.' }, { status: 502 })
    }

    return NextResponse.json({ init_point: initPoint, orderId: order.id, orderNumber: order.orderNumber })
  } catch (e: any) {
    logger.error('Error creando preference MP', {
      orderId: order.id,
      message: e?.message,
      cause: JSON.stringify(e?.cause ?? null),
      status: e?.status,
    })
    await prisma.order
      .update({ where: { id: order.id }, data: { status: 'failed', paymentStatus: 'failed' } })
      .catch(() => {})
    return NextResponse.json({ error: 'No se pudo iniciar el pago.' }, { status: 502 })
  }
}
