// components/cart/CheckoutForm.tsx - COMPLETO Y LISTO 🚀
'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, 
  CheckCircle2, 
  Loader2, 
  AlertCircle, 
  MessageCircle,
  ExternalLink
} from 'lucide-react'
import Link from 'next/link'
import { useCartStore } from '@/lib/store/cart-store'
import { useAuth } from '@/lib/firebase/context/AuthContext'
import { formatARS } from '@/lib/utils/currency'
import { CheckoutSteps, TrustBadges } from './CartComponents'

interface CheckoutFormProps {
  step: 1 | 2 | 3
  total: number
  onBack: () => void
  onNext: () => void
}

// ============================================================================
// HOOKS
// ============================================================================

function useCheckoutAnalytics() {
  const trackStep = useCallback((step: number, data?: Record<string, any>) => {
    try {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', `checkout_step_${step}`, data)
      }
    } catch (error) {
      console.error('[Analytics] Error:', error)
    }
  }, [])
  
  return { trackStep }
}

function useFormValidation<T extends Record<string, any>>(
  initialValues: T,
  validationRules: Record<keyof T, (value: any) => string | null>
) {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({})
  
  const handleChange = useCallback((field: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }))
    if (touched[field]) {
      const error = validationRules[field]?.(value)
      setErrors(prev => ({ ...prev, [field]: error || undefined }))
    }
  }, [touched, validationRules])
  
  const handleBlur = useCallback((field: keyof T) => {
    setTouched(prev => ({ ...prev, [field]: true }))
    const error = validationRules[field]?.(values[field])
    setErrors(prev => ({ ...prev, [field]: error || undefined }))
  }, [values, validationRules])
  
  const validateAll = useCallback(() => {
    const newErrors: Partial<Record<keyof T, string>> = {}
    let isValid = true
    
    Object.keys(validationRules).forEach((field) => {
      const error = validationRules[field as keyof T](values[field as keyof T])
      if (error) {
        newErrors[field as keyof T] = error
        isValid = false
      }
    })
    
    setErrors(newErrors)
    setTouched(Object.keys(validationRules).reduce((acc, key) => ({ ...acc, [key]: true }), {}))
    return isValid
  }, [values, validationRules])
  
  return { values, errors, touched, handleChange, handleBlur, validateAll }
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export default function CheckoutForm({ step, total, onBack, onNext }: CheckoutFormProps) {
  const { trackStep } = useCheckoutAnalytics()
  
  useEffect(() => {
    trackStep(step, { total })
  }, [step, total, trackStep])

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-12 sm:pb-16 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 overflow-x-hidden">
      <div className="hidden md:block fixed inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent pointer-events-none" />
      <div className="hidden md:block fixed inset-0 bg-[linear-gradient(rgba(59,130,246,.02)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(59,130,246,.02)_1.5px,transparent_1.5px)] bg-[size:64px_64px] pointer-events-none" />
      
      <div className="container mx-auto px-3 sm:px-4 md:px-6 relative z-10">
        <CheckoutSteps currentStep={step} />

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8"
        >
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 sm:gap-2 text-zinc-400 hover:text-white mb-3 sm:mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base font-semibold">Volver</span>
          </button>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-2 sm:mb-3">
            {step === 2 && 'Tus datos'}
            {step === 3 && 'Confirmar pedido'}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-zinc-400">
            {step === 2 && 'Completá tus datos de contacto'}
            {step === 3 && 'Revisá y confirmá tu pedido'}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2">
            {step === 2 && <ShippingForm onNext={onNext} />}
            {step === 3 && <ReservaForm total={total} />}
          </div>

          <div className="lg:col-span-1">
            <OrderSummary total={total} />
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// SHIPPING FORM
// ============================================================================

function ShippingForm({ onNext }: { onNext: () => void }) {
  const { user } = useAuth()
  
  const validationRules = useMemo(() => ({
    firstName: (value: string) => !value?.trim() ? 'Nombre requerido' : value.length < 2 ? 'Muy corto' : null,
    lastName: (value: string) => !value?.trim() ? 'Apellido requerido' : value.length < 2 ? 'Muy corto' : null,
    email: (value: string) => !value?.trim() ? 'Email requerido' : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Email inválido' : null,
    phone: (value: string) => !value?.trim() ? 'Teléfono requerido' : value.replace(/[\s\-\(\)]/g, '').length < 10 ? 'Muy corto' : null,
    address: (value: string) => !value?.trim() ? 'Dirección requerida' : value.length < 3 ? 'Muy corta' : null,
    city: (value: string) => !value?.trim() ? 'Ciudad requerida' : null,
    notes: () => null
  }), [])

  const { values: formData, errors, touched, handleChange, handleBlur, validateAll } = useFormValidation({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ').slice(1).join(' ') || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || 'Villa María',
    notes: ''
  }, validationRules)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateAll()) {
      sessionStorage.setItem('shippingData', JSON.stringify(formData))
      onNext()
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      onSubmit={handleSubmit}
      className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl border border-blue-500/20"
      noValidate
    >
      <div className="mb-6 sm:mb-8">
        <h3 className="text-lg sm:text-xl font-black text-white mb-3 sm:mb-4 flex items-center gap-2">
          <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 flex items-center justify-center text-sm font-bold">1</span>
          <span>Contacto</span>
        </h3>

        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label htmlFor="firstName" className="block text-xs sm:text-sm font-semibold text-white mb-1.5 sm:mb-2">Nombre *</label>
            <input
              id="firstName"
              type="text"
              value={formData.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              onBlur={() => handleBlur('firstName')}
              className={`w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-zinc-800 border-2 rounded-lg sm:rounded-xl focus:outline-none transition-colors text-white ${
                touched.firstName && errors.firstName ? 'border-red-500' : 'border-zinc-700 focus:border-blue-500'
              }`}
              placeholder="Juan"
            />
            {touched.firstName && errors.firstName && <p className="text-xs text-red-400 mt-1">{errors.firstName}</p>}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-xs sm:text-sm font-semibold text-white mb-1.5 sm:mb-2">Apellido *</label>
            <input
              id="lastName"
              type="text"
              value={formData.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              onBlur={() => handleBlur('lastName')}
              className={`w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-zinc-800 border-2 rounded-lg sm:rounded-xl focus:outline-none transition-colors text-white ${
                touched.lastName && errors.lastName ? 'border-red-500' : 'border-zinc-700 focus:border-blue-500'
              }`}
              placeholder="Pérez"
            />
            {touched.lastName && errors.lastName && <p className="text-xs text-red-400 mt-1">{errors.lastName}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-white mb-1.5 sm:mb-2">Email *</label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              onBlur={() => handleBlur('email')}
              className={`w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-zinc-800 border-2 rounded-lg sm:rounded-xl focus:outline-none transition-colors text-white ${
                touched.email && errors.email ? 'border-red-500' : 'border-zinc-700 focus:border-blue-500'
              }`}
              placeholder="juan@ejemplo.com"
            />
            {touched.email && errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="block text-xs sm:text-sm font-semibold text-white mb-1.5 sm:mb-2">WhatsApp *</label>
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              onBlur={() => handleBlur('phone')}
              className={`w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-zinc-800 border-2 rounded-lg sm:rounded-xl focus:outline-none transition-colors text-white ${
                touched.phone && errors.phone ? 'border-red-500' : 'border-zinc-700 focus:border-blue-500'
              }`}
              placeholder="353 123 4567"
            />
            {touched.phone && errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
          </div>
        </div>
      </div>

      <div className="mb-6 sm:mb-8">
        <h3 className="text-lg sm:text-xl font-black text-white mb-3 sm:mb-4 flex items-center gap-2">
          <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 flex items-center justify-center text-sm font-bold">2</span>
          <span>Dirección</span>
        </h3>

        <div className="space-y-3 sm:space-y-4">
          <div>
            <label htmlFor="address" className="block text-xs sm:text-sm font-semibold text-white mb-1.5 sm:mb-2">Dirección *</label>
            <input
              id="address"
              type="text"
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              onBlur={() => handleBlur('address')}
              className={`w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-zinc-800 border-2 rounded-lg sm:rounded-xl focus:outline-none transition-colors text-white ${
                touched.address && errors.address ? 'border-red-500' : 'border-zinc-700 focus:border-blue-500'
              }`}
              placeholder="Av. Libertador 1234"
            />
            {touched.address && errors.address && <p className="text-xs text-red-400 mt-1">{errors.address}</p>}
          </div>

          <div>
            <label htmlFor="city" className="block text-xs sm:text-sm font-semibold text-white mb-1.5 sm:mb-2">Ciudad *</label>
            <input
              id="city"
              type="text"
              value={formData.city}
              onChange={(e) => handleChange('city', e.target.value)}
              onBlur={() => handleBlur('city')}
              className={`w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-zinc-800 border-2 rounded-lg sm:rounded-xl focus:outline-none transition-colors text-white ${
                touched.city && errors.city ? 'border-red-500' : 'border-zinc-700 focus:border-blue-500'
              }`}
              placeholder="Villa María"
            />
            {touched.city && errors.city && <p className="text-xs text-red-400 mt-1">{errors.city}</p>}
          </div>

          <div>
            <label htmlFor="notes" className="block text-xs sm:text-sm font-semibold text-white mb-1.5 sm:mb-2">Notas (opcional)</label>
            <textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              rows={2}
              className="w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-zinc-800 border-2 border-zinc-700 rounded-lg sm:rounded-xl focus:outline-none focus:border-blue-500 transition-colors resize-none text-white placeholder-zinc-500"
              placeholder="Piso, depto, referencias..."
            />
          </div>
        </div>
      </div>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="w-full py-4 sm:py-5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-bold text-base sm:text-lg shadow-2xl shadow-blue-500/30 transition-all"
      >
        Continuar
      </motion.button>
    </motion.form>
  )
}

// ============================================================================
// RESERVA FORM - WHATSAPP (ULTRA ROBUST) 🔥
// ============================================================================

function ReservaForm({ total }: { total: number }) {
  const clearCart = useCartStore(state => state.clearCart)
  const items = useCartStore(state => state.items)
  const [isProcessing, setIsProcessing] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [whatsappURL, setWhatsappURL] = useState<string | null>(null)
  const [showManualLink, setShowManualLink] = useState(false)
  
  const { trackStep } = useCheckoutAnalytics()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    console.log('🚀 [RESERVA] Iniciando proceso...')
    console.log('📦 [RESERVA] Items en carrito:', items.length)
    console.log('💰 [RESERVA] Total:', total)
    
    setIsProcessing(true)
    setErrorMessage('')
    setShowManualLink(false)

    try {
      const shippingData = sessionStorage.getItem('shippingData')
      console.log('📋 [RESERVA] Datos de envío encontrados:', !!shippingData)
      
      const shipping = shippingData ? JSON.parse(shippingData) : null
      
      if (!shipping) {
        console.error('❌ [RESERVA] No hay datos de envío')
        setErrorMessage('Datos de envío no encontrados')
        setIsProcessing(false)
        return
      }
      
      const orderId = `RES-${Date.now()}`
      console.log('🆔 [RESERVA] Order ID generado:', orderId)
      
      const productList = items.map((item: any) => 
        `• ${item.name} (${item.size}) x${item.quantity} - $${(item.price * item.quantity).toLocaleString('es-AR')}`
      ).join('\n')

      const whatsappMessage = `🛏️ *NUEVA RESERVA - Azul Colchones*

📋 *Pedido:* #${orderId}

👤 *Mis datos:*
Nombre: ${shipping.firstName} ${shipping.lastName}
Email: ${shipping.email}
Teléfono: ${shipping.phone}

📦 *Productos:*
${productList}

💰 *Total: $${total.toLocaleString('es-AR')}*

📍 *Dirección de entrega:*
${shipping.address}
${shipping.city}${shipping.notes ? `\nNotas: ${shipping.notes}` : ''}

✅ Quiero confirmar esta reserva y coordinar la entrega.`

      const phoneNumber = '5493534017332'
      const encodedMessage = encodeURIComponent(whatsappMessage)
      const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
      
      console.log('💬 [RESERVA] URL generada (primeros 100 chars):', url.substring(0, 100) + '...')
      console.log('📏 [RESERVA] Longitud total de la URL:', url.length)
      setWhatsappURL(url)

      // Guardar orden
      sessionStorage.setItem('lastOrder', JSON.stringify({
        orderId,
        paymentMethod: 'reserva_whatsapp',
        amount: total,
        shipping,
        items,
        date: new Date().toISOString()
      }))
      console.log('💾 [RESERVA] Orden guardada')

      trackStep(3, {
        payment_method: 'reserva_whatsapp',
        value: total,
        items_count: items.length
      })
      console.log('📊 [RESERVA] Analytics tracked')

      // Limpiar carrito
      clearCart()
      sessionStorage.removeItem('shippingData')
      console.log('🧹 [RESERVA] Carrito limpiado')

      // INTENTAR ABRIR WHATSAPP
      console.log('🔄 [RESERVA] Intentando abrir WhatsApp...')
      
      // Estrategia 1: window.open
      console.log('🪟 [RESERVA] Método 1: window.open()')
      const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
      
      if (newWindow && !newWindow.closed) {
        console.log('✅ [RESERVA] window.open EXITOSO - WhatsApp abierto')
        setTimeout(() => {
          setIsProcessing(false)
          setShowManualLink(true)
          console.log('🎯 [RESERVA] Mostrando enlaces manuales como backup')
        }, 1500)
      } else {
        console.log('⚠️ [RESERVA] window.open BLOQUEADO - Intentando redirección...')
        
        // Estrategia 2: location.href
        console.log('🌐 [RESERVA] Método 2: location.href')
        window.location.href = url
        
        setTimeout(() => {
          setIsProcessing(false)
          setShowManualLink(true)
          console.log('🔗 [RESERVA] Redirección ejecutada, mostrando backup')
        }, 2000)
      }

    } catch (err) {
      console.error('❌ [RESERVA] ERROR CRÍTICO:', err)
      console.error('📍 [RESERVA] Stack trace:', (err as Error).stack)
      setErrorMessage('Error al procesar. Por favor, contactanos directamente.')
      setIsProcessing(false)
      setShowManualLink(true)
    }
  }

  const copyToClipboard = () => {
    if (!whatsappURL) {
      console.log('⚠️ [COPY] No hay URL para copiar')
      return
    }
    
    console.log('📋 [COPY] Copiando al portapapeles...')
    navigator.clipboard.writeText(whatsappURL)
      .then(() => {
        console.log('✅ [COPY] URL copiada exitosamente')
        alert('✅ Link copiado! Ahora abrí WhatsApp y pegá el link.')
      })
      .catch((err) => {
        console.error('❌ [COPY] Error al copiar:', err)
        alert('No se pudo copiar. Probá abrir el link manualmente.')
      })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl border border-emerald-500/20"
    >
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="text-center pb-4 sm:pb-6 border-b border-emerald-500/20">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center">
            <MessageCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white mb-1 sm:mb-2">Reservar por WhatsApp</h3>
          <p className="text-sm sm:text-base text-zinc-400">Se abrirá WhatsApp con tu pedido completo</p>
        </div>

        {/* Cómo funciona */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-lg sm:rounded-xl">
          <p className="text-xs sm:text-sm text-emerald-300 font-semibold mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2">
            <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            ¿Cómo funciona?
          </p>
          <ol className="text-xs sm:text-sm text-zinc-300 space-y-1.5 sm:space-y-2 list-decimal list-inside leading-tight">
            <li>Confirmás tu reserva</li>
            <li>Se abre WhatsApp automáticamente</li>
            <li>Enviás el mensaje</li>
            <li>Coordinamos entrega y pago</li>
          </ol>
        </div>

        {/* Benefits */}
        <div className="space-y-2 sm:space-y-3">
          <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-emerald-300">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-semibold">✅ Atención directa e inmediata</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-zinc-300">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
            <span>📱 Tu pedido ya viene armado</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-zinc-300">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
            <span>💬 Coordinamos todo al instante</span>
          </div>
        </div>

        {/* Total */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-lg sm:rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-sm sm:text-base font-semibold text-emerald-400">Total a pagar:</span>
            <span className="text-2xl sm:text-3xl font-black text-emerald-400">{formatARS(total)}</span>
          </div>
        </div>

        {/* Terms */}
        <div className="p-3 sm:p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-lg sm:rounded-xl">
          <p className="text-xs sm:text-sm text-zinc-400 leading-tight flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>
              Al confirmar aceptás nuestros{' '}
              <Link href="/terminos" className="text-emerald-400 hover:underline font-semibold">
                términos y condiciones
              </Link>
            </span>
          </p>
        </div>

        {/* Error */}
        <AnimatePresence>
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-3 sm:p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg sm:rounded-xl text-xs sm:text-sm flex items-start gap-2 sm:gap-3"
            >
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5" />
              <p>{errorMessage}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isProcessing}
          whileHover={{ scale: isProcessing ? 1 : 1.01 }}
          whileTap={{ scale: isProcessing ? 1 : 0.99 }}
          className="w-full py-4 sm:py-5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl font-bold text-base sm:text-lg shadow-2xl shadow-emerald-500/30 transition-all disabled:opacity-75 disabled:cursor-wait flex items-center justify-center gap-2 sm:gap-3"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Abriendo WhatsApp...</span>
            </>
          ) : (
            <>
              <MessageCircle className="w-5 h-5" />
              <span>Enviar por WhatsApp</span>
            </>
          )}
        </motion.button>

        {/* Manual Links */}
        <AnimatePresence>
          {showManualLink && whatsappURL && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3"
            >
              <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                <p className="text-sm text-blue-400 mb-3 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Si WhatsApp no se abrió automáticamente:</span>
                </p>

                <div className="space-y-2">
                  <a
                    href={whatsappURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => console.log('🔗 [CLICK] Link manual de WhatsApp clickeado')}
                    className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Abrir WhatsApp manualmente</span>
                  </a>

                  <button
                    type="button"
                    onClick={copyToClipboard}
                    className="w-full py-3 px-4 bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all"
                  >
                    📋 Copiar link de WhatsApp
                  </button>

                  <a
                    href="https://wa.me/5493534017332"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => console.log('📞 [CLICK] Contacto directo clickeado')}
                    className="w-full py-3 px-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all border border-zinc-700"
                  >
                    💬 Contactar directamente (353 401 7332)
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </motion.div>
  )
}

// ============================================================================
// ORDER SUMMARY
// ============================================================================

function OrderSummary({ total }: { total: number }) {
  const items = useCartStore(state => state.items)
  const getSubtotal = useCartStore(state => state.getSubtotal)
  const getDiscount = useCartStore(state => state.getDiscount)
  const getShipping = useCartStore(state => state.getShipping)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-20 sm:top-24 bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl border border-blue-500/20"
    >
      <h3 className="text-lg sm:text-xl font-black text-white mb-4 sm:mb-6">Resumen</h3>

      <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-blue-500/20">
        {items.map((item) => (
          <div key={item.id} className="flex gap-2 sm:gap-3">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-zinc-800 rounded-lg overflow-hidden">
              {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-xs sm:text-sm text-white truncate">{item.name}</h4>
              <p className="text-[10px] sm:text-xs text-zinc-400">x{item.quantity} • {item.size}</p>
              <p className="text-xs sm:text-sm font-bold text-white mt-0.5">{formatARS(item.price * item.quantity)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-blue-500/20">
        <div className="flex justify-between text-zinc-400 text-xs sm:text-sm">
          <span>Subtotal</span>
          <span className="font-semibold text-white">{formatARS(getSubtotal())}</span>
        </div>

        {getDiscount() > 0 && (
          <div className="flex justify-between text-emerald-400 text-xs sm:text-sm">
            <span>Descuento</span>
            <span className="font-semibold">-{formatARS(getDiscount())}</span>
          </div>
        )}

        <div className="flex justify-between text-zinc-400 text-xs sm:text-sm">
          <span>Envío</span>
          <span className="font-semibold">{getShipping() === 0 ? <span className="text-emerald-400">GRATIS</span> : formatARS(getShipping())}</span>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <span className="text-base sm:text-lg font-bold text-white">Total</span>
        <span className="text-xl sm:text-2xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          {formatARS(total)}
        </span>
      </div>

      <TrustBadges />
    </motion.div>
  )
}