import { NextRequest, NextResponse } from 'next/server'
import { after } from 'next/server'
import { Resend } from 'resend'
import { randomBytes } from 'node:crypto'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'
import { ReservaSchema, type ReservaShipping } from '@/lib/validators/reserva'
import { rateLimit, getClientIp } from '@/lib/utils/rate-limit'
import { escapeHtml } from '@/lib/utils/html'
import { logger } from '@/lib/logger'

const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || 'info@azulcolchones.com'
const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev'

const resend =
  process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 're_dummy_key_for_build'
    ? new Resend(process.env.RESEND_API_KEY)
    : null

type DbItem = { id: string; name: string; price: number; stock: number; slug: string }
type EmailItem = { name: string; size: string | null; quantity: number; priceCents: number }

export async function POST(request: NextRequest) {
  const ip = getClientIp(request.headers)
  const rl = rateLimit({ key: `reserva:${ip}`, limit: 10, windowMs: 60 * 60 * 1000 })
  if (!rl.allowed) {
    return NextResponse.json(
      { error: 'Demasiadas reservas. Probá más tarde.', resetIn: rl.resetIn },
      {
        status: 429,
        headers: {
          'Retry-After': String(rl.resetIn),
          'X-RateLimit-Remaining': String(rl.remaining),
        },
      },
    )
  }

  let parsed
  try {
    const body = await request.json()
    parsed = ReservaSchema.parse(body)
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Datos inválidos',
          details: err.issues.map((i) => ({ field: i.path.join('.'), message: i.message })),
        },
        { status: 400 },
      )
    }
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  const { items, shipping } = parsed
  const productIds = items.map((i) => i.productId)

  const dbProducts = await prisma.product.findMany({
    where: { id: { in: productIds }, isActive: true },
    select: { id: true, name: true, price: true, stock: true, slug: true },
  })
  const byId = new Map<string, DbItem>(dbProducts.map((p) => [p.id, p]))

  const missing = items.find((i) => !byId.has(i.productId))
  if (missing) {
    return NextResponse.json(
      { error: `Producto no disponible: ${missing.productId}` },
      { status: 400 },
    )
  }

  // Recalcular totales con precios reales (centavos)
  let subtotalCents = 0
  const itemsForDb = items.map((i) => {
    const p = byId.get(i.productId)!
    subtotalCents += p.price * i.quantity
    return {
      productId: p.id,
      quantity: i.quantity,
      price: p.price,
      size: i.size ?? null,
    }
  })
  const itemsForEmail: EmailItem[] = items.map((i) => ({
    name: byId.get(i.productId)!.name,
    size: i.size ?? null,
    quantity: i.quantity,
    priceCents: byId.get(i.productId)!.price,
  }))

  const orderNumber = `RES-${Date.now()}-${randomBytes(3).toString('hex').toUpperCase()}`
  const fullName = `${shipping.firstName} ${shipping.lastName}`.trim()
  const emailLower = shipping.email.toLowerCase()

  try {
    // Upsert User (guest o recurrente) + Order + items en una transacción
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.upsert({
        where: { email: emailLower },
        create: {
          email: emailLower,
          name: fullName,
          phone: shipping.phone,
          address: shipping.address,
          city: shipping.city,
          province: shipping.province ?? null,
          postalCode: shipping.postalCode ?? null,
        },
        update: { name: fullName, phone: shipping.phone },
        select: { id: true },
      })

      const order = await tx.order.create({
        data: {
          orderNumber,
          userId: user.id,
          customerName: fullName,
          customerEmail: emailLower,
          customerPhone: shipping.phone,
          shippingAddress: {
            address: shipping.address,
            addressNumber: shipping.addressNumber ?? '',
            city: shipping.city,
            province: shipping.province ?? '',
            postalCode: shipping.postalCode ?? '',
            notes: shipping.notes ?? '',
          },
          paymentMethod: 'whatsapp',
          paymentStatus: 'pending_contact',
          subtotal: subtotalCents,
          shipping: 0,
          discount: 0,
          total: subtotalCents,
          status: 'pending',
          items: { create: itemsForDb },
        },
        select: { id: true, orderNumber: true, total: true },
      })

      return order
    })

    // Emails fuera del happy path: si fallan, la reserva queda guardada igual
    if (resend) {
      after(() =>
        sendNotificationEmails({
          orderNumber: result.orderNumber,
          totalCents: result.total,
          shipping,
          items: itemsForEmail,
        }),
      )
    }

    return NextResponse.json({
      success: true,
      orderId: result.id,
      orderNumber: result.orderNumber,
      message: 'Reserva registrada. Te contactamos por WhatsApp.',
    })
  } catch (err) {
    logger.error('[reservas/whatsapp] Error creando orden:', err)
    return NextResponse.json(
      { error: 'No se pudo registrar la reserva. Probá de nuevo.' },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    endpoint: 'reservas/whatsapp',
    emailsEnabled: resend !== null,
  })
}

// ----------------------------------------------------------------------------
// Emails
// ----------------------------------------------------------------------------

async function sendNotificationEmails(args: {
  orderNumber: string
  totalCents: number
  shipping: ReservaShipping
  items: EmailItem[]
}) {
  if (!resend) return
  const { orderNumber, totalCents, shipping, items } = args
  const totalArs = (totalCents / 100).toLocaleString('es-AR')
  const phoneDigits = shipping.phone.replace(/\D/g, '')
  const waLink = `https://wa.me/549${phoneDigits}`

  const itemsHtml = items
    .map((it) => {
      const sizeLabel = it.size ? ` (${escapeHtml(it.size)})` : ''
      return `<li>${escapeHtml(it.name)}${sizeLabel} × ${it.quantity}</li>`
    })
    .join('')

  const adminHtml = `
    <h2>Nueva reserva por WhatsApp</h2>
    <p><strong>Pedido:</strong> ${escapeHtml(orderNumber)}</p>
    <p><strong>Cliente:</strong> ${escapeHtml(shipping.firstName)} ${escapeHtml(shipping.lastName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(shipping.email)}</p>
    <p><strong>Teléfono:</strong> ${escapeHtml(shipping.phone)}</p>
    <p><strong>Total:</strong> $${escapeHtml(totalArs)}</p>
    <h3>Productos</h3>
    <ul>${itemsHtml}</ul>
    <p><strong>Dirección:</strong> ${escapeHtml(shipping.address)}${shipping.addressNumber ? ' ' + escapeHtml(shipping.addressNumber) : ''}, ${escapeHtml(shipping.city)}${shipping.province ? ', ' + escapeHtml(shipping.province) : ''}</p>
    ${shipping.notes ? `<p><strong>Notas:</strong> ${escapeHtml(shipping.notes)}</p>` : ''}
    <p><a href="${waLink}">Contactar por WhatsApp</a></p>
  `

  const customerHtml = `
    <h2>¡Reserva confirmada!</h2>
    <p>Hola ${escapeHtml(shipping.firstName)},</p>
    <p>Tu reserva <strong>${escapeHtml(orderNumber)}</strong> fue registrada.</p>
    <p><strong>Total estimado:</strong> $${escapeHtml(totalArs)}</p>
    <p>En breve te contactamos por WhatsApp para coordinar la entrega.</p>
    <p>Gracias por elegir Azul Colchones.</p>
  `

  try {
    await Promise.allSettled([
      resend.emails.send({
        from: FROM_EMAIL,
        to: NOTIFICATION_EMAIL,
        subject: `🛏️ Nueva reserva ${orderNumber}`,
        html: adminHtml,
      }),
      resend.emails.send({
        from: FROM_EMAIL,
        to: shipping.email,
        subject: `Reserva confirmada ${orderNumber}`,
        html: customerHtml,
      }),
    ])
  } catch (err) {
    logger.error('[reservas/whatsapp] Error enviando emails:', err)
  }
}
