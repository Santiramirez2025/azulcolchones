// components/cart/CheckoutForm.tsx - DISEÑO PROFESIONAL SIMPLE 2025 🚀
// Optimizado mobile-first • Sin fricción • Conversion-focused
'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, CreditCard, Lock, CheckCircle2, Loader2, AlertCircle,
  Shield, Wallet, Check, ChevronDown, DollarSign, Percent, 
  Phone, Mail, User, Package, Zap
} from 'lucide-react'
import Link from 'next/link'
import { useCartStore } from '@/lib/store/cart-store'
import { useAuth } from '@/lib/firebase/context/AuthContext'
import { formatARS } from '@/lib/utils/currency'
import { getMejorCuota, calcularTodasLasCuotas } from '@/lib/utils/pricing'
import { CheckoutSteps, TrustBadges } from './CartComponents'

interface CheckoutFormProps {
  step: 1 | 2 | 3 | 4
  total: number
  onBack: () => void
  onNext: () => void
}

type PaymentMethodType = 'mercadopago' | 'efectivo_domicilio'

// ============================================================================
// HOOKS PERSONALIZADOS
// ============================================================================

/** Hook para analytics */
function useCheckoutAnalytics() {
  const trackStep = useCallback((step: number, data?: Record<string, any>) => {
    const events: Record<number, string> = {
      1: 'view_cart',
      2: 'begin_checkout', 
      3: 'add_payment_info',
      4: 'purchase'
    }
    
    const eventName = events[step]
    
    try {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', eventName, {
          currency: 'ARS',
          timestamp: new Date().toISOString(),
          ...data
        })
      }
      
      if (typeof window !== 'undefined' && (window as any).fbq) {
        const fbEventNames: readonly string[] = ['', 'ViewContent', 'InitiateCheckout', 'AddPaymentInfo', 'Purchase']
        const fbEventName = fbEventNames[step]
        
        if (fbEventName) {
          (window as any).fbq('track', fbEventName, {
            currency: 'ARS',
            ...data
          })
        }
      }
      
      if (typeof window !== 'undefined' && (window as any).DD_RUM) {
        (window as any).DD_RUM.addAction(`checkout_step_${step}`, data)
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('[Analytics] Error:', error)
      }
    }
  }, [])
  
  const trackPaymentMethod = useCallback((method: string, data?: Record<string, any>) => {
    try {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'select_promotion', {
          promotion_name: method,
          creative_name: 'payment_method_selector',
          creative_slot: 'checkout_step_3',
          ...data
        })
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('[Analytics] Error:', error)
      }
    }
  }, [])
  
  return { trackStep, trackPaymentMethod }
}

/** Hook para validación de formularios */
function useFormValidation<T extends Record<string, any>>(
  initialValues: T,
  validationRules: Record<keyof T, (value: any) => string | null>
) {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({})
  
  const sanitize = useCallback((value: string, type: 'text' | 'email' | 'phone' | 'number' = 'text'): string => {
    if (!value) return ''
    
    let sanitized = value.trim()
    
    sanitized = sanitized
      .replace(/<[^>]*>/g, '')
      .replace(/[<>{}]/g, '')
    
    switch (type) {
      case 'email':
        sanitized = sanitized.toLowerCase()
        break
      case 'phone':
        sanitized = sanitized.replace(/[^\d\s\-\+\(\)]/g, '')
        break
      case 'number':
        sanitized = sanitized.replace(/[^\d]/g, '')
        break
      case 'text':
      default:
        sanitized = sanitized.substring(0, 500)
        break
    }
    
    return sanitized
  }, [])
  
  const validateField = useCallback((field: keyof T, value: any) => {
    const error = validationRules[field]?.(value)
    setErrors(prev => ({ ...prev, [field]: error || undefined }))
    return !error
  }, [validationRules])
  
  const handleChange = useCallback((field: keyof T, value: any, type?: 'text' | 'email' | 'phone' | 'number') => {
    const sanitizedValue = typeof value === 'string' && type ? sanitize(value, type) : value
    setValues(prev => ({ ...prev, [field]: sanitizedValue }))
    
    if (touched[field]) {
      validateField(field, sanitizedValue)
    }
  }, [touched, validateField, sanitize])
  
  const handleBlur = useCallback((field: keyof T) => {
    setTouched(prev => ({ ...prev, [field]: true }))
    validateField(field, values[field])
  }, [values, validateField])
  
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
    setTouched(
      Object.keys(validationRules).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    )
    
    return isValid
  }, [values, validationRules])
  
  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    setValues
  }
}

/** Hook para fetch con retry */
function useFetchWithRetry() {
  const fetchWithRetry = useCallback(async (
    url: string, 
    options: RequestInit, 
    maxRetries = 3,
    timeout = 10000
  ): Promise<Response> => {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)
    
    for (let i = 0; i < maxRetries; i++) {
      try {
        const response = await fetch(url, {
          ...options,
          signal: controller.signal
        })
        
        clearTimeout(timeoutId)
        return response
        
      } catch (error) {
        clearTimeout(timeoutId)
        
        if (i === maxRetries - 1) throw error
        
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000))
      }
    }
    
    throw new Error('Max retries reached')
  }, [])
  
  return { fetchWithRetry }
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export default function CheckoutForm({ step, total, onBack, onNext }: CheckoutFormProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethodType>('mercadopago')
  const { trackStep } = useCheckoutAnalytics()
  
  useEffect(() => {
    trackStep(step, { total })
  }, [step, total, trackStep])

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-12 sm:pb-16 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 overflow-x-hidden">
      {/* Background effects - SOLO DESKTOP */}
      <div className="hidden md:block fixed inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent pointer-events-none" aria-hidden="true" />
      <div className="hidden md:block fixed inset-0 bg-[linear-gradient(rgba(59,130,246,.02)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(59,130,246,.02)_1.5px,transparent_1.5px)] bg-[size:64px_64px] pointer-events-none" aria-hidden="true" />
      
      {/* Schema Markup para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CheckoutPage",
            "name": "Checkout - Azul Colchones",
            "description": "Proceso de compra seguro",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Azul Colchones",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Balerdi 855",
                "addressLocality": "Villa María",
                "addressRegion": "Córdoba",
                "addressCountry": "AR"
              }
            }
          })
        }}
      />
      
      <div className="container mx-auto px-3 sm:px-4 md:px-6 relative z-10">
        {/* Checkout Steps */}
        <CheckoutSteps currentStep={step} />

        {/* Header - MOBILE OPTIMIZED */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8"
        >
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 sm:gap-2 text-zinc-400 hover:text-white mb-3 sm:mb-4 transition-colors touch-target"
            aria-label="Volver al carrito"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
            <span className="text-sm sm:text-base font-semibold">Volver</span>
          </button>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-2 sm:mb-3">
            {step === 2 && 'Tus datos'}
            {step === 3 && 'Pago'}
            {step === 4 && '¡Listo! 🎉'}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-zinc-400">
            {step === 2 && 'Completá tus datos de envío'}
            {step === 3 && 'Elegí cómo pagar'}
            {step === 4 && 'Tu pedido fue confirmado'}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 2 && <ShippingForm onNext={onNext} />}
            
            {step === 3 && (
              <div className="space-y-4 sm:space-y-6">
                <PaymentMethodSelector 
                  selected={selectedPaymentMethod}
                  onSelect={setSelectedPaymentMethod}
                />

                {selectedPaymentMethod === 'mercadopago' && (
                  <MercadoPagoPaymentForm total={total} onNext={onNext} />
                )}

                {selectedPaymentMethod === 'efectivo_domicilio' && (
                  <EfectivoPaymentForm total={total} onNext={onNext} />
                )}
              </div>
            )}
            
            {step === 4 && <ConfirmationView />}
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <OrderSummary total={total} />
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// PAYMENT METHOD SELECTOR - SIMPLE & AMIGABLE
// ============================================================================

function PaymentMethodSelector({ 
  selected, 
  onSelect 
}: { 
  selected: PaymentMethodType
  onSelect: (method: PaymentMethodType) => void 
}) {
  const { trackPaymentMethod } = useCheckoutAnalytics()
  
  const methods = useMemo(() => [
    {
      id: 'mercadopago' as PaymentMethodType,
      name: 'Tarjeta',
      description: 'Hasta 12 cuotas sin interés',
      icon: CreditCard,
      color: 'from-blue-500 to-cyan-600',
      badge: 'Más elegido'
    },
    {
      id: 'efectivo_domicilio' as PaymentMethodType,
      name: 'Efectivo',
      description: '15% OFF - Pagás al recibir',
      icon: Wallet,
      color: 'from-emerald-500 to-teal-600',
      badge: 'Mejor precio'
    }
  ], [])

  const handleSelect = useCallback((methodId: PaymentMethodType) => {
    onSelect(methodId)
    trackPaymentMethod(methodId, { step: 'payment_selection' })
  }, [onSelect, trackPaymentMethod])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl border border-blue-500/20"
    >
      <h3 className="text-lg sm:text-xl font-black text-white mb-4 sm:mb-6 flex items-center gap-2">
        <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 flex-shrink-0" aria-hidden="true" />
        <span>¿Cómo querés pagar?</span>
      </h3>

      <div 
        className="grid gap-3 sm:gap-4"
        role="radiogroup"
        aria-label="Métodos de pago"
      >
        {methods.map((method) => {
          const Icon = method.icon
          const isSelected = selected === method.id

          return (
            <motion.button
              key={method.id}
              onClick={() => handleSelect(method.id)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`relative p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl border-2 transition-all text-left touch-target ${
                isSelected
                  ? 'border-blue-500 bg-blue-500/20 ring-2 ring-blue-500/30'
                  : 'border-zinc-800 bg-zinc-900/50 hover:border-blue-500/50'
              }`}
              role="radio"
              aria-checked={isSelected}
            >
              {/* Badge */}
              <div className={`absolute -top-2 -right-2 bg-gradient-to-r ${method.color} text-white text-[10px] sm:text-xs font-black px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-lg`}>
                {method.badge}
              </div>

              <div className="flex items-center gap-3 sm:gap-4">
                {/* Icon */}
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" aria-hidden="true" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-base sm:text-lg font-bold text-white mb-0.5 sm:mb-1">{method.name}</h4>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-tight">{method.description}</p>
                </div>

                {/* Check */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-6 h-6 sm:w-7 sm:h-7 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0"
                    aria-hidden="true"
                  >
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </motion.div>
                )}
              </div>
            </motion.button>
          )
        })}
      </div>

      {/* Security */}
      <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg sm:rounded-xl">
        <div className="flex items-center gap-2 sm:gap-3">
          <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 flex-shrink-0" aria-hidden="true" />
          <div className="text-xs sm:text-sm text-emerald-300 leading-tight">
            <strong>Pago 100% seguro</strong> • SSL 256 bits
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ============================================================================
// MERCADOPAGO - SIMPLE & CONVERSION-FOCUSED
// ============================================================================

function MercadoPagoPaymentForm({ total, onNext }: { total: number; onNext: () => void }) {
  const clearCart = useCartStore(state => state.clearCart)
  const items = useCartStore(state => state.items)
  const { user } = useAuth()
  const [isProcessing, setIsProcessing] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [selectedCuotas, setSelectedCuotas] = useState<number | null>(null)
  const [showCuotasDropdown, setShowCuotasDropdown] = useState(false)
  
  const { trackStep, trackPaymentMethod } = useCheckoutAnalytics()
  const { fetchWithRetry } = useFetchWithRetry()

  const todasLasCuotas = useMemo(() => calcularTodasLasCuotas(total), [total])
  const cuotaSeleccionada = useMemo(() => {
    if (selectedCuotas === null) return null
    return todasLasCuotas.find(c => c.cuotas === selectedCuotas) || null
  }, [selectedCuotas, todasLasCuotas])

  const finalTotal = cuotaSeleccionada ? cuotaSeleccionada.precioTotal : total

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')

    if (!acceptedTerms) {
      setErrorMessage('Aceptá los términos para continuar')
      return
    }

    setIsProcessing(true)

    try {
      const shippingData = sessionStorage.getItem('shippingData')
      
      const response = await fetchWithRetry('/api/checkout', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-Request-ID': `req-${Date.now()}-${Math.random().toString(36).substring(7)}`
        },
        body: JSON.stringify({
          items,
          userId: user?.id,
          userEmail: user?.email || JSON.parse(shippingData || '{}').email,
          shippingAddress: shippingData ? JSON.parse(shippingData) : null,
          paymentMethod: 'mercadopago',
          paymentPlan: selectedCuotas ? `${selectedCuotas} cuotas` : 'Contado',
          totalAmount: finalTotal
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || `HTTP ${response.status}`)
      }

      const data = await response.json()

      if (data.initPoint) {
        trackStep(3, {
          payment_method: 'mercadopago',
          payment_plan: selectedCuotas ? `${selectedCuotas}_cuotas` : 'contado',
          value: finalTotal
        })
        
        window.location.href = data.initPoint
      } else {
        throw new Error('No se pudo obtener el link de pago')
      }

    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error('[MercadoPago] Error:', err)
      }
      
      let userMessage = 'Error al procesar. Intentá de nuevo.'
      
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          userMessage = 'Conexión lenta. Intentá de nuevo.'
        } else if (err.message.includes('HTTP 429')) {
          userMessage = 'Esperá un momento e intentá de nuevo.'
        } else if (err.message.includes('HTTP 503')) {
          userMessage = 'Servicio no disponible. Intentá en unos minutos.'
        }
      }
      
      setErrorMessage(userMessage)
      setIsProcessing(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl border border-blue-500/20"
    >
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        {/* Header - SIMPLE */}
        <div className="text-center pb-4 sm:pb-6 border-b border-blue-500/20">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center">
            <CreditCard className="w-8 h-8 sm:w-10 sm:h-10 text-white" aria-hidden="true" />
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white mb-1 sm:mb-2">Mercado Pago</h3>
          <p className="text-sm sm:text-base text-zinc-400">Pagá seguro con tarjeta o efectivo</p>
        </div>

        {/* Selector de Cuotas - MOBILE FRIENDLY */}
        <div className="space-y-2 sm:space-y-3">
          <label 
            htmlFor="cuotas-selector"
            className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5 sm:gap-2"
          >
            <Percent className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400 flex-shrink-0" aria-hidden="true" />
            Plan de pago
          </label>
          
          <button
            id="cuotas-selector"
            type="button"
            onClick={() => setShowCuotasDropdown(!showCuotasDropdown)}
            className="w-full flex items-center justify-between p-3 sm:p-4 bg-zinc-800/50 hover:bg-zinc-800 border border-blue-500/30 rounded-lg sm:rounded-xl transition-all touch-target"
            aria-expanded={showCuotasDropdown}
          >
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0 text-left">
              <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0" aria-hidden="true" />
              <div className="flex-1 min-w-0">
                {selectedCuotas === null ? (
                  <div>
                    <span className="text-white font-bold block text-xs sm:text-sm">Contado</span>
                    <span className="text-[10px] sm:text-xs text-zinc-400">Sin recargo</span>
                  </div>
                ) : (
                  <div>
                    <span className="text-white font-bold block text-xs sm:text-sm">
                      {cuotaSeleccionada?.cuotas}x {cuotaSeleccionada?.formatted.precioCuota}
                    </span>
                    <span className="text-[10px] sm:text-xs text-zinc-400">
                      {cuotaSeleccionada?.formatted.precioTotal}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <motion.div
              animate={{ rotate: showCuotasDropdown ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" aria-hidden="true" />
            </motion.div>
          </button>

          <AnimatePresence>
            {showCuotasDropdown && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="space-y-2 mt-2 sm:mt-3">
                  {/* Contado */}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCuotas(null)
                      setShowCuotasDropdown(false)
                      trackPaymentMethod('contado', { amount: total })
                    }}
                    className={`w-full p-2.5 sm:p-3 rounded-lg sm:rounded-xl border transition-all text-left touch-target ${
                      selectedCuotas === null
                        ? 'bg-emerald-500/20 border-emerald-500/50 ring-2 ring-emerald-500/30'
                        : 'bg-zinc-800/50 border-zinc-700 hover:border-emerald-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
                          <DollarSign className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 flex-shrink-0" aria-hidden="true" />
                          <span className="font-bold text-white text-xs sm:text-sm">Contado</span>
                        </div>
                        <div className="text-lg sm:text-xl font-black text-emerald-400">
                          {formatARS(total)}
                        </div>
                      </div>
                      {selectedCuotas === null && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0"
                          aria-hidden="true"
                        >
                          <Check className="w-3 h-3 text-white" />
                        </motion.div>
                      )}
                    </div>
                  </button>

                  {/* Cuotas */}
                  {todasLasCuotas.map((cuota, index) => (
                    <motion.button
                      key={cuota.cuotas}
                      type="button"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => {
                        setSelectedCuotas(cuota.cuotas)
                        setShowCuotasDropdown(false)
                        trackPaymentMethod(`${cuota.cuotas}_cuotas`, { 
                          amount: cuota.precioTotal,
                          monthly: cuota.precioCuota
                        })
                      }}
                      className={`w-full p-2.5 sm:p-3 rounded-lg sm:rounded-xl border transition-all text-left touch-target ${
                        selectedCuotas === cuota.cuotas
                          ? 'bg-blue-500/20 border-blue-500/50 ring-2 ring-blue-500/30'
                          : 'bg-zinc-800/50 border-zinc-700 hover:border-blue-500/30'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 sm:gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
                            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-500/20 border border-blue-500/30 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-[10px] sm:text-xs font-bold text-blue-400">
                                {cuota.cuotas}
                              </span>
                            </div>
                            <span className="text-base sm:text-lg font-black text-white">
                              {cuota.formatted.precioCuota}
                            </span>
                            <span className="text-[10px] sm:text-xs text-zinc-400">/ mes</span>
                          </div>
                          <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs">
                            <span className="text-zinc-400 truncate">
                              Total: {cuota.formatted.precioTotal}
                            </span>
                            <span className="px-1.5 sm:px-2 py-0.5 bg-orange-500/20 border border-orange-500/30 text-orange-400 font-bold rounded-full flex-shrink-0">
                              +{cuota.recargoPercentage}
                            </span>
                          </div>
                        </div>
                        {selectedCuotas === cuota.cuotas && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0"
                            aria-hidden="true"
                          >
                            <Check className="w-3 h-3 text-white" />
                          </motion.div>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Tip */}
                {selectedCuotas !== null && cuotaSeleccionada && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 sm:mt-3 p-2.5 sm:p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg"
                  >
                    <div className="flex items-start gap-1.5 sm:gap-2">
                      <Percent className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <div className="text-[10px] sm:text-xs text-zinc-400 leading-tight">
                        <p className="font-semibold text-blue-400 mb-0.5">
                          💡 Ahorrá pagando de contado
                        </p>
                        <p>
                          Diferencia: {formatARS(cuotaSeleccionada.precioTotal - total)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Features - SIMPLE */}
        <div className="space-y-2 sm:space-y-3">
          <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-zinc-300">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0" aria-hidden="true" />
            <span>Tarjetas Visa, Mastercard, Amex</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-zinc-300">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0" aria-hidden="true" />
            <span>Rapipago, Pago Fácil</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-zinc-300">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0" aria-hidden="true" />
            <span>Compra protegida</span>
          </div>
        </div>

        {/* Terms */}
        <div className="flex items-start gap-2 sm:gap-3">
          <input
            type="checkbox"
            id="terms"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            className="mt-1 w-4 h-4 sm:w-5 sm:h-5 text-blue-600 border-zinc-700 bg-zinc-800 rounded focus:ring-blue-500 focus:ring-2 flex-shrink-0"
            disabled={isProcessing}
          />
          <label htmlFor="terms" className="text-xs sm:text-sm text-zinc-400 leading-tight">
            Acepto los{' '}
            <Link href="/terminos" className="text-blue-400 hover:underline font-semibold">
              términos
            </Link>
            {' '}y{' '}
            <Link href="/privacidad" className="text-blue-400 hover:underline font-semibold">
              privacidad
            </Link>
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
              role="alert"
            >
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <p className="leading-tight">{errorMessage}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Total - DESTACADO */}
        <div className="p-3 sm:p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg sm:rounded-xl">
          <div className="flex items-center justify-between mb-1 sm:mb-2">
            <span className="text-xs sm:text-sm font-semibold text-zinc-300">Total</span>
            <span className="text-xl sm:text-2xl font-black text-white">{formatARS(finalTotal)}</span>
          </div>
          {cuotaSeleccionada && (
            <p className="text-[10px] sm:text-xs text-zinc-400">
              {cuotaSeleccionada.cuotas}x {cuotaSeleccionada.formatted.precioCuota}
            </p>
          )}
        </div>

        {/* Submit - GRANDE Y CLARO */}
        <motion.button
          type="submit"
          disabled={isProcessing}
          whileHover={{ scale: isProcessing ? 1 : 1.01 }}
          whileTap={{ scale: isProcessing ? 1 : 0.99 }}
          className="w-full py-4 sm:py-5 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white rounded-xl font-bold text-base sm:text-lg shadow-2xl shadow-blue-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 sm:gap-3 touch-target"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
              <span>Procesando...</span>
            </>
          ) : (
            <>
              <CreditCard className="w-5 h-5" aria-hidden="true" />
              <span>Pagar</span>
            </>
          )}
        </motion.button>

        {/* Security - DISCRETO */}
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-zinc-500">
            <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" aria-hidden="true" />
            <span>Conexión segura SSL</span>
          </div>
        </div>
      </form>
    </motion.div>
  )
}

// ============================================================================
// EFECTIVO - SUPER SIMPLE
// ============================================================================

function EfectivoPaymentForm({ total, onNext }: { total: number; onNext: () => void }) {
  const clearCart = useCartStore(state => state.clearCart)
  const [isProcessing, setIsProcessing] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  
  const { trackStep } = useCheckoutAnalytics()

  const discount = total * 0.15
  const finalTotal = total - discount

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!acceptedTerms) {
      setErrorMessage('Aceptá los términos para continuar')
      return
    }

    setIsProcessing(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1500))

      const shippingData = sessionStorage.getItem('shippingData')
      const mockOrderId = `EFEC-${Date.now()}`
      
      sessionStorage.setItem('lastOrder', JSON.stringify({
        orderId: mockOrderId,
        paymentMethod: 'efectivo_domicilio',
        amount: finalTotal,
        discount: discount,
        shipping: shippingData ? JSON.parse(shippingData) : null,
        date: new Date().toISOString()
      }))

      trackStep(4, {
        payment_method: 'efectivo_domicilio',
        value: finalTotal,
        discount: discount
      })

      clearCart()
      sessionStorage.removeItem('shippingData')
      onNext()

    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error('[Efectivo] Error:', err)
      }
      setErrorMessage('Error. Intentá de nuevo.')
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
            <Wallet className="w-8 h-8 sm:w-10 sm:h-10 text-white" aria-hidden="true" />
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white mb-1 sm:mb-2">Efectivo</h3>
          <p className="text-sm sm:text-base text-zinc-400">Pagás al recibir - 15% OFF</p>
        </div>

        {/* Discount - DESTACADO */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-lg sm:rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs sm:text-sm font-semibold text-zinc-300">Total:</span>
            <span className="text-base sm:text-lg font-bold text-zinc-500 line-through">{formatARS(total)}</span>
          </div>
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <span className="text-sm sm:text-base font-semibold text-emerald-400">Pagás:</span>
            <span className="text-2xl sm:text-3xl font-black text-emerald-400">{formatARS(finalTotal)}</span>
          </div>
          <div className="p-2.5 sm:p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 flex-shrink-0" aria-hidden="true" />
              <p className="text-xs sm:text-sm text-emerald-300 font-bold">
                ¡Ahorrás {formatARS(discount)}! 🎉
              </p>
            </div>
          </div>
        </div>

        {/* Cómo funciona - SIMPLE */}
        <div className="p-3 sm:p-5 bg-blue-500/10 border border-blue-500/30 rounded-lg sm:rounded-xl">
          <p className="text-xs sm:text-sm text-blue-300 font-semibold mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2">
            <Package className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" aria-hidden="true" />
            ¿Cómo funciona?
          </p>
          <ol className="text-xs sm:text-sm text-zinc-300 space-y-1.5 sm:space-y-2 list-decimal list-inside leading-tight">
            <li>Confirmás ahora</li>
            <li>Te contactamos para coordinar</li>
            <li>Recibís en tu domicilio</li>
            <li>Pagás en efectivo</li>
          </ol>
        </div>

        {/* Benefits - COMPACTO */}
        <div className="space-y-2 sm:space-y-3">
          <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-emerald-300">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" aria-hidden="true" />
            <span className="font-semibold">15% OFF garantizado</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-zinc-300">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0" aria-hidden="true" />
            <span>Pagás al recibir</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-zinc-300">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0" aria-hidden="true" />
            <span>100 noches de prueba</span>
          </div>
        </div>

        {/* Terms */}
        <div className="flex items-start gap-2 sm:gap-3">
          <input
            type="checkbox"
            id="terms-efec"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            className="mt-1 w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 border-zinc-700 bg-zinc-800 rounded focus:ring-emerald-500 focus:ring-2 flex-shrink-0"
            disabled={isProcessing}
          />
          <label htmlFor="terms-efec" className="text-xs sm:text-sm text-zinc-400 leading-tight">
            Acepto pagar en efectivo al recibir
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
              role="alert"
            >
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <p className="leading-tight">{errorMessage}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={isProcessing}
          whileHover={{ scale: isProcessing ? 1 : 1.01 }}
          whileTap={{ scale: isProcessing ? 1 : 0.99 }}
          className="w-full py-4 sm:py-5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl font-bold text-base sm:text-lg shadow-2xl shadow-emerald-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 sm:gap-3 touch-target"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
              <span>Confirmando...</span>
            </>
          ) : (
            <>
              <Wallet className="w-5 h-5" aria-hidden="true" />
              <span>Confirmar</span>
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  )
}

// ============================================================================
// SHIPPING FORM - SUPER SIMPLE
// ============================================================================

function ShippingForm({ onNext }: { onNext: () => void }) {
  const { user } = useAuth()
  
  const validationRules = useMemo(() => ({
    firstName: (value: string) => {
      if (!value?.trim()) return 'Nombre requerido'
      if (value.length < 2) return 'Muy corto'
      if (!/^[a-záéíóúñü\s]+$/i.test(value)) return 'Solo letras'
      return null
    },
    lastName: (value: string) => {
      if (!value?.trim()) return 'Apellido requerido'
      if (value.length < 2) return 'Muy corto'
      if (!/^[a-záéíóúñü\s]+$/i.test(value)) return 'Solo letras'
      return null
    },
    email: (value: string) => {
      if (!value?.trim()) return 'Email requerido'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Email inválido'
      return null
    },
    phone: (value: string) => {
      if (!value?.trim()) return 'Teléfono requerido'
      const cleaned = value.replace(/[\s\-\(\)]/g, '')
      if (cleaned.length < 10) return 'Muy corto'
      return null
    },
    address: (value: string) => {
      if (!value?.trim()) return 'Calle requerida'
      if (value.length < 3) return 'Muy corta'
      return null
    },
    addressNumber: (value: string) => {
      if (!value?.trim()) return 'Número requerido'
      return null
    },
    city: (value: string) => {
      if (!value?.trim()) return 'Ciudad requerida'
      return null
    },
    postalCode: (value: string) => {
      if (!value?.trim()) return 'CP requerido'
      if (value.length < 4) return 'CP inválido'
      return null
    },
    province: (value: string) => {
      if (!value?.trim()) return 'Provincia requerida'
      return null
    },
    notes: () => null
  }), [])

  const {
    values: formData,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll
  } = useFormValidation({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ').slice(1).join(' ') || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    addressNumber: '',
    city: user?.city || 'Villa María',
    postalCode: user?.postalCode || '',
    province: user?.province || 'Córdoba',
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
      {/* Contact */}
      <div className="mb-6 sm:mb-8">
        <h3 className="text-lg sm:text-xl font-black text-white mb-3 sm:mb-4 flex items-center gap-2">
          <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 flex items-center justify-center text-sm font-bold flex-shrink-0">
            1
          </span>
          <span>Contacto</span>
        </h3>

        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label htmlFor="firstName" className="block text-xs sm:text-sm font-semibold text-white mb-1.5 sm:mb-2">
              Nombre *
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={(e) => handleChange('firstName', e.target.value, 'text')}
              onBlur={() => handleBlur('firstName')}
              className={`w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-zinc-800 border-2 rounded-lg sm:rounded-xl focus:outline-none transition-colors text-white text-sm sm:text-base ${
                touched.firstName && errors.firstName ? 'border-red-500' : 'border-zinc-700 focus:border-blue-500'
              }`}
              placeholder="Juan"
              autoComplete="given-name"
            />
            {touched.firstName && errors.firstName && (
              <p className="text-xs text-red-400 mt-1">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-xs sm:text-sm font-semibold text-white mb-1.5 sm:mb-2">
              Apellido *
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={(e) => handleChange('lastName', e.target.value, 'text')}
              onBlur={() => handleBlur('lastName')}
              className={`w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-zinc-800 border-2 rounded-lg sm:rounded-xl focus:outline-none transition-colors text-white text-sm sm:text-base ${
                touched.lastName && errors.lastName ? 'border-red-500' : 'border-zinc-700 focus:border-blue-500'
              }`}
              placeholder="Pérez"
              autoComplete="family-name"
            />
            {touched.lastName && errors.lastName && (
              <p className="text-xs text-red-400 mt-1">{errors.lastName}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-white mb-1.5 sm:mb-2">
              Email *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value, 'email')}
              onBlur={() => handleBlur('email')}
              className={`w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-zinc-800 border-2 rounded-lg sm:rounded-xl focus:outline-none transition-colors text-white text-sm sm:text-base ${
                touched.email && errors.email ? 'border-red-500' : 'border-zinc-700 focus:border-blue-500'
              }`}
              placeholder="juan@ejemplo.com"
              autoComplete="email"
            />
            {touched.email && errors.email && (
              <p className="text-xs text-red-400 mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-xs sm:text-sm font-semibold text-white mb-1.5 sm:mb-2">
              WhatsApp *
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value, 'phone')}
              onBlur={() => handleBlur('phone')}
              className={`w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-zinc-800 border-2 rounded-lg sm:rounded-xl focus:outline-none transition-colors text-white text-sm sm:text-base ${
                touched.phone && errors.phone ? 'border-red-500' : 'border-zinc-700 focus:border-blue-500'
              }`}
              placeholder="353 123 4567"
              autoComplete="tel"
            />
            {touched.phone && errors.phone && (
              <p className="text-xs text-red-400 mt-1">{errors.phone}</p>
            )}
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="mb-6 sm:mb-8">
        <h3 className="text-lg sm:text-xl font-black text-white mb-3 sm:mb-4 flex items-center gap-2">
          <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 flex items-center justify-center text-sm font-bold flex-shrink-0">
            2
          </span>
          <span>Dirección</span>
        </h3>

        <div className="space-y-3 sm:space-y-4">
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            <div className="col-span-2">
              <label htmlFor="address" className="block text-xs sm:text-sm font-semibold text-white mb-1.5 sm:mb-2">
                Calle *
              </label>
              <input
                id="address"
                name="address"
                type="text"
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value, 'text')}
                onBlur={() => handleBlur('address')}
                className={`w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-zinc-800 border-2 rounded-lg sm:rounded-xl focus:outline-none transition-colors text-white text-sm sm:text-base ${
                  touched.address && errors.address ? 'border-red-500' : 'border-zinc-700 focus:border-blue-500'
                }`}
                placeholder="Av. Libertador"
                autoComplete="street-address"
              />
              {touched.address && errors.address && (
                <p className="text-xs text-red-400 mt-1">{errors.address}</p>
              )}
            </div>

            <div>
              <label htmlFor="addressNumber" className="block text-xs sm:text-sm font-semibold text-white mb-1.5 sm:mb-2">
                Nro *
              </label>
              <input
                id="addressNumber"
                name="addressNumber"
                type="text"
                value={formData.addressNumber}
                onChange={(e) => handleChange('addressNumber', e.target.value, 'text')}
                onBlur={() => handleBlur('addressNumber')}
                className={`w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-zinc-800 border-2 rounded-lg sm:rounded-xl focus:outline-none transition-colors text-white text-sm sm:text-base ${
                  touched.addressNumber && errors.addressNumber ? 'border-red-500' : 'border-zinc-700 focus:border-blue-500'
                }`}
                placeholder="1234"
              />
              {touched.addressNumber && errors.addressNumber && (
                <p className="text-xs text-red-400 mt-1">{errors.addressNumber}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            <div>
              <label htmlFor="postalCode" className="block text-xs sm:text-sm font-semibold text-white mb-1.5 sm:mb-2">
                CP *
              </label>
              <input
                id="postalCode"
                name="postalCode"
                type="text"
                value={formData.postalCode}
                onChange={(e) => handleChange('postalCode', e.target.value, 'number')}
                onBlur={() => handleBlur('postalCode')}
                className={`w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-zinc-800 border-2 rounded-lg sm:rounded-xl focus:outline-none transition-colors text-white text-sm sm:text-base ${
                  touched.postalCode && errors.postalCode ? 'border-red-500' : 'border-zinc-700 focus:border-blue-500'
                }`}
                placeholder="5900"
                autoComplete="postal-code"
              />
              {touched.postalCode && errors.postalCode && (
                <p className="text-xs text-red-400 mt-1">{errors.postalCode}</p>
              )}
            </div>

            <div>
              <label htmlFor="city" className="block text-xs sm:text-sm font-semibold text-white mb-1.5 sm:mb-2">
                Ciudad *
              </label>
              <input
                id="city"
                name="city"
                type="text"
                value={formData.city}
                onChange={(e) => handleChange('city', e.target.value, 'text')}
                onBlur={() => handleBlur('city')}
                className={`w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-zinc-800 border-2 rounded-lg sm:rounded-xl focus:outline-none transition-colors text-white text-sm sm:text-base ${
                  touched.city && errors.city ? 'border-red-500' : 'border-zinc-700 focus:border-blue-500'
                }`}
                placeholder="Villa María"
                autoComplete="address-level2"
              />
              {touched.city && errors.city && (
                <p className="text-xs text-red-400 mt-1">{errors.city}</p>
              )}
            </div>

            <div>
              <label htmlFor="province" className="block text-xs sm:text-sm font-semibold text-white mb-1.5 sm:mb-2">
                Provincia *
              </label>
              <select
                id="province"
                name="province"
                value={formData.province}
                onChange={(e) => handleChange('province', e.target.value)}
                onBlur={() => handleBlur('province')}
                className="w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-zinc-800 border-2 border-zinc-700 rounded-lg sm:rounded-xl focus:outline-none focus:border-blue-500 transition-colors text-white text-sm sm:text-base"
                autoComplete="address-level1"
              >
                <option value="Córdoba">Córdoba</option>
                <option value="Buenos Aires">Buenos Aires</option>
                <option value="Santa Fe">Santa Fe</option>
                <option value="Mendoza">Mendoza</option>
                <option value="Tucumán">Tucumán</option>
                <option value="Otra">Otra</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="notes" className="block text-xs sm:text-sm font-semibold text-white mb-1.5 sm:mb-2">
              Notas (opcional)
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value, 'text')}
              rows={2}
              className="w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-zinc-800 border-2 border-zinc-700 rounded-lg sm:rounded-xl focus:outline-none focus:border-blue-500 transition-colors resize-none text-white placeholder-zinc-500 text-sm sm:text-base"
              placeholder="Piso, depto..."
              maxLength={500}
            />
          </div>
        </div>
      </div>

      {/* Submit */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="w-full py-4 sm:py-5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-bold text-base sm:text-lg shadow-2xl shadow-blue-500/30 transition-all touch-target"
      >
        Continuar
      </motion.button>
    </motion.form>
  )
}

// ============================================================================
// CONFIRMATION - SIMPLE & CELEBRATORIO
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
        aria-hidden="true"
      >
        <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-2xl sm:text-3xl font-black text-white mb-3 sm:mb-4">¡Listo! 🎉</h2>

        <p className="text-base sm:text-lg text-zinc-300 mb-2">
          Tu pedido fue confirmado.
        </p>
        <p className="text-sm sm:text-base text-zinc-400 mb-6 sm:mb-8">
          Te enviamos un email con los detalles.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Link href="/cuenta/pedidos">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-bold shadow-2xl shadow-blue-500/30 transition-all text-sm sm:text-base"
            >
              Ver pedido
            </motion.button>
          </Link>

          <Link href="/">
            <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-bold transition-colors text-sm sm:text-base">
              Ir al inicio
            </button>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ============================================================================
// ORDER SUMMARY - COMPACTO
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

      {/* Items - COMPACTO */}
      <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-blue-500/20 max-h-48 sm:max-h-64 overflow-y-auto">
        {items.map((item) => (
          <div key={item.id} className="flex gap-2 sm:gap-3">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden border border-blue-500/20">
              {item.image ? (
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <span className="text-xl sm:text-2xl" aria-hidden="true">🛏️</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-xs sm:text-sm text-white truncate">{item.name}</h4>
              <p className="text-[10px] sm:text-xs text-zinc-400">
                x{item.quantity}
                {item.size && ` • ${item.size}`}
              </p>
              <p className="text-xs sm:text-sm font-bold text-white mt-0.5 sm:mt-1">
                {formatARS(item.price * item.quantity)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Breakdown */}
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
          <span className="font-semibold">
            {getShipping() === 0 ? (
              <span className="text-emerald-400">GRATIS</span>
            ) : (
              <span className="text-white">{formatARS(getShipping())}</span>
            )}
          </span>
        </div>
      </div>

      {/* Total - DESTACADO */}
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <span className="text-base sm:text-lg font-bold text-white">Total</span>
        <span className="text-xl sm:text-2xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          {formatARS(total)}
        </span>
      </div>

      {/* Trust Badges */}
      <TrustBadges />
    </motion.div>
  )
}