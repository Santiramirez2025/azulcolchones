// lib/mercadopago/orders.ts — Confirmación de pago idempotente (webhook + success page)
import { prisma } from '@/lib/prisma'
import { getPaymentClient } from './client'
import { sendOrderConfirmationEmail } from './email'
import { logger } from '@/lib/logger'

export type ConfirmResult = {
  ok: boolean
  reason?: string
  orderId?: string
  paymentStatus?: string
  alreadyPaid?: boolean
}

/** Mapea el estado de pago de MP a nuestro paymentStatus. */
function mapStatus(mpStatus?: string): 'paid' | 'pending' | 'failed' {
  if (mpStatus === 'approved') return 'paid'
  if (mpStatus === 'pending' || mpStatus === 'in_process' || mpStatus === 'authorized')
    return 'pending'
  return 'failed'
}

/**
 * Consulta el pago en MP y actualiza la orden de forma idempotente.
 * Se invoca tanto desde el webhook como desde la página de éxito (fallback).
 */
export async function confirmPaymentById(paymentId: string): Promise<ConfirmResult> {
  let payment
  try {
    const paymentClient = await getPaymentClient()
    payment = await paymentClient.get({ id: paymentId })
  } catch (e) {
    logger.error('MP payment.get falló', { paymentId, error: String(e) })
    return { ok: false, reason: 'payment_fetch_failed' }
  }

  const externalReference = payment.external_reference // = order.id
  const mpStatus = payment.status
  if (!externalReference) return { ok: false, reason: 'no_external_reference' }

  const order = await prisma.order.findUnique({ where: { id: externalReference } })
  if (!order) return { ok: false, reason: 'order_not_found' }

  const paymentStatus = mapStatus(mpStatus)

  // Idempotencia: si ya está pagada, no reprocesar ni reenviar email.
  if (order.paymentStatus === 'paid') {
    return { ok: true, orderId: order.id, paymentStatus: 'paid', alreadyPaid: true }
  }

  const updated = await prisma.order.update({
    where: { id: order.id },
    data: {
      paymentStatus,
      status: paymentStatus === 'paid' ? 'paid' : order.status,
      paymentId: String(payment.id),
    },
  })

  if (paymentStatus === 'paid') {
    // Email best-effort: no bloquea ni falla la confirmación.
    void sendOrderConfirmationEmail(updated.id).catch((e) =>
      logger.error('Email de confirmación falló', { orderId: updated.id, error: String(e) }),
    )
  }

  return { ok: true, orderId: updated.id, paymentStatus }
}
