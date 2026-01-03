// app/api/reservas/whatsapp/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

// ============================================================================
// CONFIGURACIÓN
// ============================================================================

const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || 'info@azulcolchones.com'
const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev'

let resend: Resend | null = null

if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 're_dummy_key_for_build') {
  resend = new Resend(process.env.RESEND_API_KEY)
} else {
  console.warn('⚠️ RESEND_API_KEY no configurado')
}

// ============================================================================
// POST - CREAR RESERVA
// ============================================================================

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { items, total, shipping, orderId, timestamp } = body

    if (!items || !total || !shipping) {
      return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 })
    }

    // LOG
    console.log('📦 Nueva reserva WhatsApp:', {
      orderId,
      cliente: `${shipping.firstName} ${shipping.lastName}`,
      total: `$${total.toLocaleString('es-AR')}`
    })

    // 🔥 ENVIAR EMAILS DE FORMA ASÍNCRONA (fire and forget)
    if (resend) {
      sendEmailsAsync(resend, items, total, shipping, orderId, timestamp)
    }

    // ✅ RESPONDER INMEDIATAMENTE
    return NextResponse.json({
      success: true,
      orderId,
      message: 'Reserva registrada'
    })

  } catch (error) {
    console.error('❌ Error:', error)
    return NextResponse.json({ error: 'Error al procesar' }, { status: 500 })
  }
}

// ============================================================================
// FUNCIÓN ASÍNCRONA PARA EMAILS (no bloqueante)
// ============================================================================

async function sendEmailsAsync(
  resend: Resend,
  items: any[],
  total: number,
  shipping: any,
  orderId: string,
  timestamp: string
) {
  try {
    // Email al admin
    await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFICATION_EMAIL,
      subject: `🛏️ Nueva Reserva #${orderId}`,
      html: `
        <h2>Nueva Reserva WhatsApp</h2>
        <p><strong>Cliente:</strong> ${shipping.firstName} ${shipping.lastName}</p>
        <p><strong>Email:</strong> ${shipping.email}</p>
        <p><strong>Tel:</strong> ${shipping.phone}</p>
        <p><strong>Total:</strong> $${total.toLocaleString('es-AR')}</p>
        <h3>Productos:</h3>
        <ul>
          ${items.map(item => `<li>${item.name} (${item.size}) x${item.quantity}</li>`).join('')}
        </ul>
        <p><strong>Dirección:</strong> ${shipping.address}, ${shipping.city}</p>
        <a href="https://wa.me/549${shipping.phone.replace(/\D/g, '')}">Contactar por WhatsApp</a>
      `
    })
    console.log('✅ Email admin enviado')

    // Email al cliente
    await resend.emails.send({
      from: FROM_EMAIL,
      to: shipping.email,
      subject: `✅ Reserva confirmada #${orderId}`,
      html: `
        <h2>¡Reserva Confirmada!</h2>
        <p>Hola ${shipping.firstName},</p>
        <p>Tu reserva #${orderId} fue confirmada.</p>
        <p><strong>Total:</strong> $${total.toLocaleString('es-AR')}</p>
        <p>Te contactaremos por WhatsApp para coordinar la entrega.</p>
      `
    })
    console.log('✅ Email cliente enviado')

  } catch (error) {
    console.error('❌ Error enviando emails:', error)
  }
}

// ============================================================================
// GET - HEALTH CHECK
// ============================================================================

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    endpoint: 'whatsapp',
    timestamp: new Date().toISOString(),
    emailsEnabled: resend !== null
  })
}