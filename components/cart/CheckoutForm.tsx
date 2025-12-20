// components/cart/CheckoutForm.tsx - RESERVA POR WHATSAPP 🚀
'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, Lock, CheckCircle2, Loader2, AlertCircle,
  Shield, Package, Phone, Mail, User, MessageCircle
} from 'lucide-react'
import Link from 'next/link'
import { useCartStore } from '@/lib/store/cart-store'
import { useAuth } from '@/lib/firebase/context/AuthContext'
import { formatARS } from '@/lib/utils/currency'
import { CheckoutSteps, TrustBadges } from './CartComponents'

interface CheckoutFormProps {
  step: 1 | 2 | 3 | 4
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
            {step === 4 && '¡Reserva confirmada! 🎉'}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-zinc-400">
            {step === 2 && 'Completá tus datos de contacto'}
            {step === 3 && 'Revisá y confirmá tu pedido'}
            {step === 4 && 'Te contactamos por WhatsApp'}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2">
            {step === 2 && <ShippingForm onNext={onNext} />}
            {step === 3 && <ReservaForm total={total} onNext={onNext} />}
            {step === 4 && <ConfirmationView />}
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
// RESERVA FORM - WHATSAPP
// ============================================================================

function ReservaForm({ total, onNext }: { total: number; onNext: () => void }) {
  const clearCart = useCartStore(state => state.clearCart)
  const items = useCartStore(state => state.items)
  const [isProcessing, setIsProcessing] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  
  const { trackStep } = useCheckoutAnalytics()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!acceptedTerms) {
      setErrorMessage('Aceptá los términos para continuar')
      return
    }

    setIsProcessing(true)

    try {
      const shippingData = sessionStorage.getItem('shippingData')
      const shipping = shippingData ? JSON.parse(shippingData) : null
      
      const orderId = `RES-${Date.now()}`
      
      // 🔥 LLAMAR A LA API DE WHATSAPP
      const response = await fetch('/api/reservas/whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          total,
          shipping,
          orderId,
          timestamp: new Date().toISOString()
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Error al procesar la reserva')
      }

      const data = await response.json()
      
      // Guardar orden localmente
      sessionStorage.setItem('lastOrder', JSON.stringify({
        orderId,
        paymentMethod: 'reserva_whatsapp',
        amount: total,
        shipping,
        items,
        date: new Date().toISOString()
      }))

      trackStep(4, {
        payment_method: 'reserva_whatsapp',
        value: total,
        items_count: items.length
      })

      clearCart()
      sessionStorage.removeItem('shippingData')
      onNext()

    } catch (err) {
      console.error('[Reserva] Error:', err)
      setErrorMessage(err instanceof Error ? err.message : 'Error al procesar. Intentá de nuevo.')
      setIsProcessing(false)
    }
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
          <h3 className="text-xl sm:text-2xl font-black text-white mb-1 sm:mb-2">Reservar Pedido</h3>
          <p className="text-sm sm:text-base text-zinc-400">Te contactamos por WhatsApp para coordinar</p>
        </div>

        {/* Cómo funciona */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg sm:rounded-xl">
          <p className="text-xs sm:text-sm text-blue-300 font-semibold mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2">
            <Package className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            ¿Cómo funciona?
          </p>
          <ol className="text-xs sm:text-sm text-zinc-300 space-y-1.5 sm:space-y-2 list-decimal list-inside leading-tight">
            <li>Confirmás tu reserva ahora</li>
            <li>Se abre WhatsApp con tu pedido</li>
            <li>Coordinamos entrega y pago</li>
            <li>Recibís tu colchón</li>
          </ol>
        </div>

        {/* Benefits */}
        <div className="space-y-2 sm:space-y-3">
          <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-emerald-300">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-semibold">✅ Confirmación inmediata</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-zinc-300">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
            <span>📱 Atención personalizada</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-zinc-300">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
            <span>💬 Coordinamos todo por WhatsApp</span>
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
        <div className="flex items-start gap-2 sm:gap-3">
          <input
            type="checkbox"
            id="terms"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            className="mt-1 w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 border-zinc-700 bg-zinc-800 rounded focus:ring-emerald-500 focus:ring-2"
            disabled={isProcessing}
          />
          <label htmlFor="terms" className="text-xs sm:text-sm text-zinc-400 leading-tight">
            Acepto los{' '}
            <Link href="/terminos" className="text-emerald-400 hover:underline font-semibold">términos</Link>
            {' '}y entiendo que me contactarán por WhatsApp
          </label>
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

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={isProcessing}
          whileHover={{ scale: isProcessing ? 1 : 1.01 }}
          whileTap={{ scale: isProcessing ? 1 : 0.99 }}
          className="w-full py-4 sm:py-5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl font-bold text-base sm:text-lg shadow-2xl shadow-emerald-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 sm:gap-3"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Procesando...</span>
            </>
          ) : (
            <>
              <MessageCircle className="w-5 h-5" />
              <span>Reservar por WhatsApp</span>
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  )
}

// ============================================================================
// CONFIRMATION
// ============================================================================

function ConfirmationView() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-xl sm:rounded-2xl p-8 sm:p-10 md:p-12 shadow-2xl border border-emerald-500/30 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring' }}
        className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center"
      >
        <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
      </motion.div>

      <h2 className="text-2xl sm:text-3xl font-black text-white mb-3 sm:mb-4">¡Reserva confirmada! 🎉</h2>

      <p className="text-base sm:text-lg text-zinc-300 mb-2">Tu pedido está reservado.</p>
      <p className="text-sm sm:text-base text-zinc-400 mb-6 sm:mb-8">
        Te contactamos por WhatsApp para coordinar la entrega.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-bold shadow-2xl shadow-blue-500/30 transition-all"
          >
            Volver al inicio
          </motion.button>
        </Link>

        <a href={`https://wa.me/5493534017332?text=${encodeURIComponent('Hola, necesito ayuda con mi pedido')}`} target="_blank" rel="noopener noreferrer">
          <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Abrir WhatsApp
          </button>
        </a>
      </div>
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