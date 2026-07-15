// app/api/webhooks/mercadopago/route.ts — Notificaciones de pago (Checkout Pro)
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'node:crypto'
import { confirmPaymentById } from '@/lib/mercadopago/orders'
import { getMpWebhookSecret } from '@/lib/mercadopago/client'
import { logger } from '@/lib/logger'

export const runtime = 'nodejs'

/**
 * Verifica la firma x-signature de MP (opcional, si hay MP_WEBHOOK_SECRET).
 * Manifest: id:<dataId>;request-id:<xRequestId>;ts:<ts>;
 */
async function verifySignature(req: NextRequest, dataId: string): Promise<boolean> {
  const secret = await getMpWebhookSecret()
  if (!secret) return true // sin secret configurado → no bloqueamos (re-consultamos el pago igual)

  const xSignature = req.headers.get('x-signature') || ''
  const xRequestId = req.headers.get('x-request-id') || ''
  const parts = Object.fromEntries(
    xSignature.split(',').map((kv) => kv.split('=').map((s) => s.trim()) as [string, string]),
  )
  const ts = parts['ts']
  const v1 = parts['v1']
  if (!ts || !v1) return false

  const manifest = `id:${dataId};request-id:${xRequestId};ts:${ts};`
  const hmac = crypto.createHmac('sha256', secret).update(manifest).digest('hex')
  try {
    return crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(v1))
  } catch {
    return false
  }
}

export async function POST(request: NextRequest) {
  const url = new URL(request.url)

  // El dataId puede venir por query (?data.id=) o en el body { data: { id } }
  let body: any = {}
  try {
    body = await request.json()
  } catch {
    /* algunos pings vienen sin body */
  }

  const type = body?.type || url.searchParams.get('type') || url.searchParams.get('topic')
  const dataId =
    body?.data?.id?.toString() ||
    url.searchParams.get('data.id') ||
    url.searchParams.get('id') ||
    ''

  // Solo nos interesan notificaciones de pago
  if (type && type !== 'payment') {
    return NextResponse.json({ received: true, ignored: type }, { status: 200 })
  }
  if (!dataId) {
    return NextResponse.json({ received: true, note: 'no data id' }, { status: 200 })
  }

  if (!(await verifySignature(request, dataId))) {
    logger.warn('Webhook MP con firma inválida', { dataId })
    return NextResponse.json({ error: 'firma inválida' }, { status: 401 })
  }

  try {
    const result = await confirmPaymentById(dataId)
    logger.info('Webhook MP procesado', { dataId, ...result })
    // Siempre 200 para que MP no reintente en bucle (ya es idempotente).
    return NextResponse.json({ received: true, ...result }, { status: 200 })
  } catch (e) {
    logger.error('Webhook MP error', { dataId, error: String(e) })
    // 200 igual: el reintento no ayudaría si es un error de datos; los aprobados
    // se reconcilian además desde la página de éxito.
    return NextResponse.json({ received: true, error: 'processing' }, { status: 200 })
  }
}

// MP a veces hace GET de verificación
export async function GET() {
  return NextResponse.json({ ok: true })
}
