// lib/mercadopago/email.ts — Email de confirmación de orden (Resend, best-effort)
import { Resend } from 'resend'
import { prisma } from '@/lib/prisma'
import { formatARS } from '@/lib/utils/currency'
import { escapeHtml } from '@/lib/utils/html'

const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev'
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || 'info@azulcolchones.com'

const resend =
  process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 're_dummy_key_for_build'
    ? new Resend(process.env.RESEND_API_KEY)
    : null

/**
 * Envía email de confirmación al cliente + aviso a la tienda.
 * Montos de la orden en pesos. No falla la confirmación si el email falla.
 */
export async function sendOrderConfirmationEmail(orderId: string): Promise<void> {
  if (!resend) return

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: { include: { product: true } } },
  })
  if (!order) return

  const rows = order.items
    .map(
      (it) =>
        `<tr>
          <td style="padding:8px;border-bottom:1px solid #eee">${escapeHtml(it.product?.name ?? 'Producto')}${
          it.size ? ` · ${escapeHtml(it.size)}` : ''
        }</td>
          <td style="padding:8px;border-bottom:1px solid #eee;text-align:center">${it.quantity}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;text-align:right">${formatARS(it.price)}</td>
        </tr>`,
    )
    .join('')

  const html = `
  <div style="font-family:system-ui,Arial,sans-serif;max-width:600px;margin:0 auto;color:#111">
    <h2 style="color:#1e3a8a">¡Gracias por tu compra! 🛏️</h2>
    <p>Hola ${escapeHtml(order.customerName)}, confirmamos tu pago. Pedido <strong>#${order.orderNumber}</strong>.</p>
    <table style="width:100%;border-collapse:collapse;margin:16px 0">
      <thead>
        <tr style="text-align:left;border-bottom:2px solid #1e3a8a">
          <th style="padding:8px">Producto</th>
          <th style="padding:8px;text-align:center">Cant.</th>
          <th style="padding:8px;text-align:right">Precio</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
    <p style="text-align:right;font-size:18px"><strong>Total: ${formatARS(order.total)}</strong></p>
    <p style="color:#555">Coordinamos la entrega por WhatsApp. Entrega inmediata con stock en Villa María y Villa Nueva; sin stock, 24-72 hs.</p>
    <p style="color:#555">Azul Colchones · Distribuidor oficial Piero · Balerdi 855, Villa María · WhatsApp +54 9 3534 09-6566</p>
  </div>`

  // Cliente
  await resend.emails.send({
    from: FROM_EMAIL,
    to: order.customerEmail,
    subject: `Confirmación de tu pedido #${order.orderNumber} — Azul Colchones`,
    html,
  })

  // Aviso a la tienda
  await resend.emails
    .send({
      from: FROM_EMAIL,
      to: NOTIFICATION_EMAIL,
      subject: `🟢 Nueva venta pagada #${order.orderNumber} — ${formatARS(order.total)}`,
      html,
    })
    .catch(() => {})
}
