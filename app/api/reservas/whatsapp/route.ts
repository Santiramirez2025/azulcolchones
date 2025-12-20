// app/api/reservas/whatsapp/route.ts - WHATSAPP BUSINESS API 📱
import { NextRequest, NextResponse } from 'next/server'
import twilio from 'twilio'

// ============================================================================
// CONFIGURACIÓN TWILIO
// ============================================================================

const accountSid = process.env.TWILIO_ACCOUNT_SID!
const authToken = process.env.TWILIO_AUTH_TOKEN!
const twilioWhatsAppNumber = process.env.TWILIO_WHATSAPP_NUMBER!
const businessWhatsAppNumber = process.env.BUSINESS_WHATSAPP_NUMBER!

// Validar variables de entorno
if (!accountSid || !authToken || !twilioWhatsAppNumber || !businessWhatsAppNumber) {
  throw new Error('Faltan variables de entorno de Twilio. Verificá .env.local')
}

const client = twilio(accountSid, authToken)