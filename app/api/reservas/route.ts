// app/api/reservas/route.ts - NOTIFICACIONES AUTOMÁTICAS 📧
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

// ============================================================================
// CONFIGURACIÓN
// ============================================================================

const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || 'info@azulcolchones.com'
const FROM_EMAIL = process.env.FROM_EMAIL || 'pedidos@azulcolchones.com'

// Inicializar Resend solo si la API key está disponible
let resend: Resend | null = null

if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 're_dummy_key_for_build') {
  resend = new Resend(process.env.RESEND_API_KEY)
} else {
  console.warn('⚠️ RESEND_API_KEY no configurado - Sistema de emails deshabilitado')
}

// ============================================================================
// POST - CREAR RESERVA
// ============================================================================

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const {
      items,
      total,
      shipping,
      orderId,
      timestamp
    } = body

    // Validación básica
    if (!items || !total || !shipping) {
      return NextResponse.json(
        { error: 'Datos incompletos' },
        { status: 400 }
      )
    }

    // ========================================
    // LOG DE LA RESERVA (siempre funciona)
    // ========================================
    
    console.log('📦 Nueva reserva recibida:', {
      orderId,
      cliente: `${shipping.firstName} ${shipping.lastName}`,
      email: shipping.email,
      phone: shipping.phone,
      total: `$${total.toLocaleString('es-AR')}`,
      items: items.map((item: any) => `${item.name} (${item.size}) x${item.quantity}`),
      timestamp: new Date(timestamp).toLocaleString('es-AR')
    })

    // ========================================
    // ENVIAR EMAILS (solo si Resend está configurado)
    // ========================================
    
    if (!resend) {
      console.warn('⚠️ Sistema de emails no disponible - Reserva registrada solo en logs')
      console.log('💡 Para habilitar emails, configura RESEND_API_KEY en .env.local')
      
      return NextResponse.json({
        success: true,
        orderId,
        message: 'Reserva registrada (emails deshabilitados)',
        emailsDisabled: true
      })
    }

    // ========================================
    // 1. ENVIAR EMAIL DE NOTIFICACIÓN AL ADMIN
    // ========================================
    
    const productList = items.map((item: any) => 
      `• ${item.name} (${item.size}) x${item.quantity} - $${(item.price * item.quantity).toLocaleString('es-AR')}`
    ).join('\n')

    const emailHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .section { background: white; padding: 20px; margin-bottom: 20px; border-radius: 8px; border-left: 4px solid #3b82f6; }
            .section h3 { margin-top: 0; color: #1f2937; }
            .product-item { padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
            .product-item:last-child { border-bottom: none; }
            .total { font-size: 24px; font-weight: bold; color: #059669; text-align: right; margin-top: 20px; }
            .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
            .badge { display: inline-block; background: #10b981; color: white; padding: 5px 15px; border-radius: 20px; font-size: 12px; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">🛏️ Nueva Reserva</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Azul Colchones</p>
            </div>
            
            <div class="content">
              <div class="section">
                <h3>📦 Productos</h3>
                ${items.map((item: any) => `
                  <div class="product-item">
                    <strong>${item.name}</strong><br>
                    <small style="color: #6b7280;">
                      Tamaño: ${item.size} | Cantidad: ${item.quantity}
                    </small><br>
                    <strong style="color: #3b82f6;">$${(item.price * item.quantity).toLocaleString('es-AR')}</strong>
                  </div>
                `).join('')}
                <div class="total">Total: $${total.toLocaleString('es-AR')}</div>
              </div>

              <div class="section">
                <h3>👤 Cliente</h3>
                <p>
                  <strong>Nombre:</strong> ${shipping.firstName} ${shipping.lastName}<br>
                  <strong>Email:</strong> ${shipping.email}<br>
                  <strong>WhatsApp:</strong> ${shipping.phone}
                </p>
              </div>

              <div class="section">
                <h3>📍 Dirección de Entrega</h3>
                <p>
                  ${shipping.address}<br>
                  ${shipping.city}<br>
                  ${shipping.notes ? `<em>Notas: ${shipping.notes}</em>` : ''}
                </p>
              </div>

              <div class="section">
                <h3>📋 Detalles del Pedido</h3>
                <p>
                  <strong>ID:</strong> ${orderId}<br>
                  <strong>Fecha:</strong> ${new Date(timestamp).toLocaleString('es-AR')}<br>
                  <span class="badge">PENDIENTE CONTACTO</span>
                </p>
              </div>

              <div style="text-align: center; margin-top: 30px;">
                <a href="https://wa.me/${shipping.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hola ${shipping.firstName}! Te contacto desde Azul Colchones por tu pedido #${orderId}`)}" 
                   style="display: inline-block; background: #10b981; color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold;">
                  📱 Contactar por WhatsApp
                </a>
              </div>
            </div>

            <div class="footer">
              <p>Pedido generado desde azulcolchones.com</p>
              <p style="font-size: 12px; color: #9ca3af;">
                Este es un email automático. No respondas a este mensaje.
              </p>
            </div>
          </div>
        </body>
      </html>
    `

    try {
      // Enviar email de notificación al admin
      await resend.emails.send({
        from: FROM_EMAIL,
        to: NOTIFICATION_EMAIL,
        subject: `🛏️ Nueva Reserva #${orderId} - ${shipping.firstName} ${shipping.lastName}`,
        html: emailHTML,
        text: `Nueva Reserva - Azul Colchones\n\nProductos:\n${productList}\n\nTotal: $${total.toLocaleString('es-AR')}\n\nCliente:\n${shipping.firstName} ${shipping.lastName}\n${shipping.email}\n${shipping.phone}\n\nDirección:\n${shipping.address}\n${shipping.city}\n\nID: ${orderId}\nFecha: ${new Date(timestamp).toLocaleString('es-AR')}`
      })

      console.log('✅ Email de notificación enviado a:', NOTIFICATION_EMAIL)
    } catch (emailError) {
      console.error('❌ Error enviando email de notificación:', emailError)
      // No fallar la reserva si el email falla
    }

    // ========================================
    // 2. ENVIAR EMAIL AL CLIENTE
    // ========================================
    
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: shipping.email,
        subject: `✅ Reserva confirmada #${orderId} - Azul Colchones`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
                .section { background: white; padding: 20px; margin-bottom: 20px; border-radius: 8px; }
                .total { font-size: 24px; font-weight: bold; color: #059669; text-align: right; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1 style="margin: 0;">✅ ¡Reserva Confirmada!</h1>
                  <p style="margin: 10px 0 0 0;">Gracias por tu confianza</p>
                </div>
                
                <div class="content">
                  <div class="section">
                    <h2 style="color: #059669;">Hola ${shipping.firstName}! 👋</h2>
                    <p>Tu reserva fue confirmada exitosamente.</p>
                    <p><strong>Número de pedido:</strong> #${orderId}</p>
                  </div>

                  <div class="section">
                    <h3>📦 Resumen de tu pedido</h3>
                    ${items.map((item: any) => `
                      <p style="border-bottom: 1px solid #e5e7eb; padding: 10px 0;">
                        <strong>${item.name}</strong><br>
                        <small style="color: #6b7280;">${item.size} | x${item.quantity}</small><br>
                        <strong style="color: #3b82f6;">$${(item.price * item.quantity).toLocaleString('es-AR')}</strong>
                      </p>
                    `).join('')}
                    <div class="total">Total: $${total.toLocaleString('es-AR')}</div>
                  </div>

                  <div class="section" style="background: #ecfdf5; border-left: 4px solid #10b981;">
                    <h3 style="color: #059669;">📱 Próximos pasos</h3>
                    <ol>
                      <li>Nuestro equipo te contactará por WhatsApp en las próximas horas</li>
                      <li>Coordinaremos el método de pago y la entrega</li>
                      <li>Recibirás tu colchón en la dirección indicada</li>
                    </ol>
                  </div>

                  <div class="section">
                    <h3>📍 Dirección de entrega</h3>
                    <p>
                      ${shipping.address}<br>
                      ${shipping.city}
                    </p>
                  </div>

                  <div style="text-align: center; margin-top: 30px;">
                    <p>¿Tenés alguna pregunta?</p>
                    <a href="https://wa.me/5493534017332" 
                       style="display: inline-block; background: #10b981; color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold;">
                      💬 Escribinos por WhatsApp
                    </a>
                  </div>
                </div>

                <div style="text-align: center; padding: 20px; color: #6b7280; font-size: 14px;">
                  <p>Gracias por elegir Azul Colchones 🛏️</p>
                  <p style="font-size: 12px;">Balerdi 855, Villa María, Córdoba</p>
                </div>
              </div>
            </body>
          </html>
        `,
        text: `¡Reserva Confirmada!\n\nHola ${shipping.firstName}!\n\nTu pedido #${orderId} fue confirmado.\n\nNuestro equipo te contactará por WhatsApp para coordinar la entrega.\n\nTotal: $${total.toLocaleString('es-AR')}\n\nGracias por tu confianza!\nAzul Colchones`
      })

      console.log('✅ Email de confirmación enviado a:', shipping.email)
    } catch (emailError) {
      console.error('❌ Error enviando email al cliente:', emailError)
      // No fallar la reserva si el email falla
    }

    // ========================================
    // 3. RESPUESTA EXITOSA
    // ========================================

    return NextResponse.json({
      success: true,
      orderId,
      message: 'Reserva procesada correctamente',
      emailsSent: true
    })

  } catch (error) {
    console.error('❌ Error procesando reserva:', error)
    
    return NextResponse.json(
      { 
        error: 'Error al procesar la reserva',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// ============================================================================
// GET - HEALTH CHECK
// ============================================================================

export async function GET(request: NextRequest) {
  const status = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    emailsEnabled: resend !== null,
    resendConfigured: !!process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 're_dummy_key_for_build'
  }
  
  return NextResponse.json(status)
}