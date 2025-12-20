// test-twilio.js - TEST DE CONEXIÓN TWILIO
// Ejecutar: node test-twilio.js

require('dotenv').config({ path: '.env.local' })
const twilio = require('twilio')

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const from = process.env.TWILIO_WHATSAPP_NUMBER
const to = process.env.BUSINESS_WHATSAPP_NUMBER

console.log('🔍 Verificando configuración Twilio...\n')

console.log('Account SID:', accountSid ? '✅ Configurado' : '❌ Falta')
console.log('Auth Token:', authToken ? '✅ Configurado' : '❌ Falta')
console.log('From Number:', from)
console.log('To Number:', to)

if (!accountSid || !authToken) {
  console.error('\n❌ ERROR: Faltan credenciales en .env.local')
  process.exit(1)
}

const client = twilio(accountSid, authToken)

console.log('\n📱 Enviando mensaje de prueba...\n')

client.messages
  .create({
    from: from,
    to: to,
    body: '✅ *TEST EXITOSO*\n\nTu integración con Twilio WhatsApp está funcionando correctamente!\n\n🛏️ Azul Colchones'
  })
  .then(message => {
    console.log('✅ Mensaje enviado correctamente!')
    console.log('Message SID:', message.sid)
    console.log('Status:', message.status)
    console.log('\n🎉 ¡Todo configurado! Revisá tu WhatsApp.')
  })
  .catch(error => {
    console.error('❌ Error al enviar mensaje:')
    console.error('Código:', error.code)
    console.error('Mensaje:', error.message)
    console.error('\n💡 Soluciones:')
    
    if (error.code === 20003) {
      console.error('- Verificá que el Auth Token sea correcto')
    } else if (error.code === 21211) {
      console.error('- Verificá que el número "To" sea correcto')
      console.error('- Asegurate que hiciste "join código" desde ese número')
    } else if (error.code === 21608) {
      console.error('- El número no está en la sandbox de WhatsApp')
      console.error('- Enviá "join <tu-codigo>" a +14155238886 desde tu WhatsApp')
    } else {
      console.error('- Verificá todas las credenciales en .env.local')
      console.error('- Docs: https://www.twilio.com/docs/api/errors/' + error.code)
    }
  })