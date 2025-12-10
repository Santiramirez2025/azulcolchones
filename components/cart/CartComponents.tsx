// components/cart/CartComponents.tsx - ✅ ULTRA-OPTIMIZADO MOBILE-FIRST 2025
'use client'

import { useState, useEffect, useCallback, useMemo, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Shield, Truck, Award, Star, ChevronRight, Package, 
  BadgeCheck, Plus, Check, Sparkles, ChevronDown, 
  CreditCard, RotateCcw, Zap
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useCartStore } from '@/lib/store/cart-store'
import { formatARS } from '@/lib/utils/currency'
import type { Product, ProductVariant } from '@prisma/client'

type ProductWithVariants = Product & {
  variants: ProductVariant[]
}

// ============================================================================
// CONFIGURACIÓN CENTRALIZADA - VILLA MARÍA
// ============================================================================
const STORE_CONFIG = {
  name: 'Azul Colchones',
  address: {
    street: 'Balerdi 855',
    city: 'Villa María',
    province: 'Córdoba',
    postalCode: '5900',
    country: 'AR'
  },
  contact: {
    email: 'ventas@azulcolchones.com',
    phone: '+54 9 353 4017332'
  },
  rating: {
    value: 4.9,
    count: 1234
  },
  shipping: {
    freeThreshold: 50000,
    localDelivery: true
  }
} as const

// ============================================================================
// UTILIDADES - IMAGE PLACEHOLDER
// ============================================================================
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#1a1a1a" offset="20%" />
      <stop stop-color="#0a0a0a" offset="50%" />
      <stop stop-color="#1a1a1a" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#0a0a0a" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite" />
</svg>`

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

const getPlaceholder = (w: number, h: number) =>
  `data:image/svg+xml;base64,${toBase64(shimmer(w, h))}`

// ============================================================================
// HOOKS OPTIMIZADOS
// ============================================================================

/** Hook para analytics centralizado con error reporting */
function useAnalytics() {
  const trackEvent = useCallback((eventName: string, params?: Record<string, any>) => {
    try {
      if (typeof window === 'undefined') return
      
      const gtag = (window as any).gtag
      const fbq = (window as any).fbq
      
      // Google Analytics 4
      if (gtag) {
        gtag('event', eventName, {
          timestamp: new Date().toISOString(),
          ...params
        })
      }
      
      // Meta Pixel
      if (fbq) {
        fbq('track', eventName, params)
      }
      
      // Datadog RUM
      if ((window as any).DD_RUM) {
        (window as any).DD_RUM.addAction(eventName, params)
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('[Analytics] Error:', error)
      }
      
      // Report to Sentry if available
      if (typeof window !== 'undefined' && (window as any).Sentry) {
        (window as any).Sentry.captureException(error, {
          tags: { 
            component: 'Analytics', 
            event: eventName 
          },
          extra: params
        })
      }
    }
  }, [])
  
  return { trackEvent }
}

/** Hook para sanitización segura de inputs */
function useSanitizedInput(initialValue: string = '') {
  const [value, setValue] = useState(initialValue)
  
  const sanitize = useCallback((input: string, type: 'text' | 'email' | 'number' = 'text'): string => {
    if (!input) return ''
    
    let sanitized = input.trim()
    
    // Sanitización agresiva
    sanitized = sanitized
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '')
      .replace(/<[^>]*>/g, '')
      .replace(/[<>{}]/g, '')
    
    switch (type) {
      case 'email':
        sanitized = sanitized.toLowerCase()
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitized)) {
          return ''
        }
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
  
  const handleChange = useCallback((newValue: string, type: 'text' | 'email' | 'number' = 'text') => {
    setValue(sanitize(newValue, type))
  }, [sanitize])
  
  return { value, handleChange, sanitize }
}

// ============================================================================
// SHIPPING PROGRESS - MOBILE OPTIMIZED
// ============================================================================

interface ShippingProgressProps {
  current: number
  target?: number
}

export const ShippingProgress = memo(function ShippingProgress({ 
  current, 
  target = STORE_CONFIG.shipping.freeThreshold
}: ShippingProgressProps) {
  const percentage = Math.min((current / target) * 100, 100)
  const remaining = Math.max(target - current, 0)
  const isUnlocked = percentage === 100
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-blue-500/10 border border-blue-500/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 mb-4 sm:mb-6"
      role="region"
      aria-label="Progreso hacia envío gratis"
    >
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <div 
            className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-blue-500/20 border border-blue-500/30 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0"
            aria-hidden="true"
          >
            <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="font-bold text-white text-xs sm:text-sm md:text-base block">
              {isUnlocked ? (
                '¡Envío gratis desbloqueado! 🎉'
              ) : (
                'Envío gratis Villa María'
              )}
            </span>
            {!isUnlocked && (
              <span className="text-[10px] sm:text-xs text-zinc-400">
                Te faltan {formatARS(remaining)}
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div 
        className="relative h-2 sm:h-2.5 bg-zinc-800 rounded-full overflow-hidden border border-white/10"
        role="progressbar"
        aria-valuenow={Math.round(percentage)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Progreso: ${Math.round(percentage)}%`}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-400 rounded-full shadow-lg shadow-blue-500/50"
        />
      </div>
      
      <span className="sr-only">
        {isUnlocked 
          ? 'Has desbloqueado el envío gratis' 
          : `Te faltan ${formatARS(remaining)} para conseguir envío gratis`
        }
      </span>
    </motion.div>
  )
})

// ============================================================================
// TRUST BADGES - MOBILE OPTIMIZED
// ============================================================================

export const TrustBadges = memo(function TrustBadges() {
  const badges = useMemo(() => [
    {
      icon: Shield,
      title: '5 Años',
      titleFull: '5 Años Garantía',
      description: 'Piero Argentina',
      color: 'text-blue-400',
      bg: 'from-blue-500/10 to-blue-600/5',
      border: 'border-blue-500/20'
    },
    {
      icon: RotateCcw,
      title: '100 Noches',
      titleFull: '100 Noches de prueba',
      description: 'Prueba gratis',
      color: 'text-emerald-400',
      bg: 'from-emerald-500/10 to-emerald-600/5',
      border: 'border-emerald-500/20'
    },
    {
      icon: CreditCard,
      title: 'Pago Seguro',
      titleFull: 'Pago 100% Seguro',
      description: 'SSL 256 bits',
      color: 'text-cyan-400',
      bg: 'from-cyan-500/10 to-cyan-600/5',
      border: 'border-cyan-500/20'
    },
    {
      icon: Truck,
      title: 'Envío Gratis',
      titleFull: 'Envío Gratis',
      description: 'Villa María',
      color: 'text-violet-400',
      bg: 'from-violet-500/10 to-violet-600/5',
      border: 'border-violet-500/20'
    }
  ], [])
  
  // Schema markup dinámico
  const schemaMarkup = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Store",
    "name": STORE_CONFIG.name,
    "image": "https://azulcolchones.com/logo.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": STORE_CONFIG.address.street,
      "addressLocality": STORE_CONFIG.address.city,
      "addressRegion": STORE_CONFIG.address.province,
      "postalCode": STORE_CONFIG.address.postalCode,
      "addressCountry": STORE_CONFIG.address.country
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": STORE_CONFIG.rating.value.toString(),
      "reviewCount": STORE_CONFIG.rating.count.toString(),
      "bestRating": "5",
      "worstRating": "1"
    },
    "priceRange": "$$",
    "paymentAccepted": ["MercadoPago", "Efectivo"],
    "currenciesAccepted": "ARS",
    "telephone": STORE_CONFIG.contact.phone,
    "email": STORE_CONFIG.contact.email
  }), [])
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-blue-500/20 mb-4 sm:mb-6"
        role="region"
        aria-label="Beneficios de compra"
      >
        <h4 className="text-xs sm:text-sm font-bold text-white mb-3 sm:mb-4 flex items-center gap-1.5 sm:gap-2">
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400 flex-shrink-0" aria-hidden="true" />
          Comprá con confianza
        </h4>
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {badges.map((badge, index) => {
            const Icon = badge.icon
            return (
              <motion.div
                key={badge.titleFull}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className={`bg-gradient-to-br ${badge.bg} rounded-lg sm:rounded-xl p-2.5 sm:p-3 border ${badge.border} transition-all duration-300`}
              >
                <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${badge.color} mb-1.5 sm:mb-2`} aria-hidden="true" />
                <div className="text-[10px] sm:text-xs font-bold text-white leading-tight">
                  <span className="hidden sm:inline">{badge.titleFull}</span>
                  <span className="sm:hidden">{badge.title}</span>
                </div>
                <div className="text-[9px] sm:text-[10px] text-zinc-400 leading-tight">{badge.description}</div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </>
  )
})

// ============================================================================
// URGENCY BANNER - MOBILE OPTIMIZED
// ============================================================================

interface UrgencyBannerProps {
  message?: string
  type?: 'stock' | 'time' | 'discount'
}

export const UrgencyBanner = memo(function UrgencyBanner({ 
  message, 
  type = 'stock' 
}: UrgencyBannerProps) {
  const config = useMemo(() => ({
    stock: {
      icon: '📦',
      color: 'from-orange-500 via-red-500 to-orange-600',
      text: message || '¡Stock limitado! Solo quedan pocas unidades',
      textColor: 'text-white'
    },
    time: {
      icon: '⏰',
      color: 'from-violet-500 via-purple-500 to-violet-600',
      text: message || 'Oferta válida solo por hoy',
      textColor: 'text-white'
    },
    discount: {
      icon: '🎁',
      color: 'from-emerald-500 via-teal-500 to-emerald-600',
      text: message || '15% OFF con VILLAMARIA',
      textColor: 'text-white'
    }
  }), [message])
  
  const current = config[type]
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`bg-gradient-to-r ${current.color} ${current.textColor} rounded-lg sm:rounded-xl p-3 sm:p-3.5 mb-3 sm:mb-4 text-center shadow-xl border border-white/20`}
      role="alert"
      aria-live="polite"
    >
      <span className="text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 sm:gap-2">
        <span className="text-base sm:text-lg flex-shrink-0" aria-hidden="true">{current.icon}</span>
        <span className="leading-tight">{current.text}</span>
      </span>
    </motion.div>
  )
})

// ============================================================================
// UPSELL - MOBILE OPTIMIZED
// ============================================================================

interface UpsellProps {
  onAdd?: () => void
}

export const Upsell = memo(function Upsell({ onAdd }: UpsellProps) {
  const [topper, setTopper] = useState<ProductWithVariants | null>(null)
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [addedToCart, setAddedToCart] = useState(false)
  const [showVariants, setShowVariants] = useState(false)
  
  const addItem = useCartStore(state => state.addItem)
  const items = useCartStore(state => state.items)
  const { trackEvent } = useAnalytics()

  useEffect(() => {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)
    
    const fetchTopper = async () => {
      try {
        const response = await fetch('/api/products/upsell/topper', {
          signal: controller.signal,
          headers: { 
            'Accept': 'application/json',
            'Cache-Control': 'max-age=300'
          }
        })
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }
        
        const data = await response.json()
        
        if (data.success && data.product) {
          setTopper(data.product)
          const defaultVariant = data.product.variants.find((v: ProductVariant) => v.isDefault) 
            || data.product.variants[0]
          setSelectedVariant(defaultVariant)
          
          trackEvent('view_item_list', {
            item_list_name: 'cart_upsell',
            items: [{
              item_id: data.product.id,
              item_name: data.product.name,
              price: defaultVariant.price
            }]
          })
        }
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          if (process.env.NODE_ENV === 'development') {
            console.error('[Upsell] Error:', err)
          }
          setError('No pudimos cargar las recomendaciones')
        }
      } finally {
        clearTimeout(timeoutId)
        setIsLoading(false)
      }
    }

    fetchTopper()
    
    return () => {
      clearTimeout(timeoutId)
      controller.abort()
    }
  }, [trackEvent])

  const handleAddToCart = useCallback(() => {
    if (!topper || !selectedVariant) return

    const isInCart = items.some(item => 
      item.productId === topper.id && item.size === selectedVariant.size
    )

    if (isInCart) {
      setAddedToCart(true)
      setTimeout(() => setAddedToCart(false), 2000)
      return
    }

    addItem({
      productId: topper.id,
      name: topper.name,
      size: selectedVariant.size,
      price: selectedVariant.price,
      originalPrice: selectedVariant.originalPrice || undefined,
      quantity: 1,
      image: topper.images[0] || '/placeholder.jpg',
      slug: topper.slug,
      variant: selectedVariant.size
    })

    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
    
    trackEvent('add_to_cart', {
      currency: 'ARS',
      value: selectedVariant.price,
      items: [{
        item_id: topper.id,
        item_name: topper.name,
        item_variant: selectedVariant.size,
        price: selectedVariant.price,
        quantity: 1
      }]
    })
    
    onAdd?.()
  }, [topper, selectedVariant, items, addItem, trackEvent, onAdd])

  if (isLoading) {
    return (
      <div 
        className="animate-pulse bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-blue-500/20"
        role="status"
        aria-label="Cargando recomendaciones"
      >
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-zinc-700/50 rounded-lg flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-3 sm:h-4 bg-zinc-700/50 rounded w-2/3" />
            <div className="h-2.5 sm:h-3 bg-zinc-700/50 rounded w-1/2" />
          </div>
        </div>
      </div>
    )
  }

  if (error || !topper || !selectedVariant) {
    return null
  }

  const hasDiscount = selectedVariant.originalPrice && selectedVariant.originalPrice > selectedVariant.price
  const discountPercent = hasDiscount 
    ? Math.round(((selectedVariant.originalPrice! - selectedVariant.price) / selectedVariant.originalPrice!) * 100)
    : 0

  const isInCart = items.some(item => 
    item.productId === topper.id && item.size === selectedVariant.size
  )

  const productImage = Array.isArray(topper.images) && topper.images.length > 0 
    ? topper.images[0] 
    : '/placeholder.jpg'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="relative bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-blue-500/10 border border-blue-500/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 overflow-hidden"
    >
      {hasDiscount && (
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[10px] sm:text-xs font-black px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md sm:rounded-lg shadow-lg">
          -{discountPercent}%
        </div>
      )}

      <div className="flex items-center gap-3 sm:gap-4">
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-zinc-800 rounded-lg sm:rounded-xl flex-shrink-0 overflow-hidden border border-blue-500/20">
          <Image
            src={productImage}
            alt={topper.name}
            fill
            sizes="(max-width: 640px) 64px, 80px"
            quality={75}
            loading="lazy"
            placeholder="blur"
            blurDataURL={getPlaceholder(80, 80)}
            className="object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = '/placeholder.jpg'
            }}
          />
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="font-black text-white text-xs sm:text-sm mb-0.5 sm:mb-1 flex items-center gap-1.5 sm:gap-2 leading-tight">
            <span className="line-clamp-1">{topper.name}</span>
            {topper.rating && topper.rating >= 4.5 && (
              <div className="flex items-center gap-0.5 flex-shrink-0" aria-label={`${topper.rating} estrellas`}>
                <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-amber-400 text-amber-400" />
                <span className="text-[9px] sm:text-[10px] text-amber-400 font-bold">{topper.rating}</span>
              </div>
            )}
          </h4>
          
          <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
            {hasDiscount && (
              <span className="text-zinc-500 line-through text-[10px] sm:text-xs">
                {formatARS(selectedVariant.originalPrice!)}
              </span>
            )}
            <span className="text-blue-400 font-black text-sm sm:text-base">
              {formatARS(selectedVariant.price)}
            </span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddToCart}
          disabled={addedToCart || isInCart}
          className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm transition-all shadow-lg flex items-center gap-1.5 sm:gap-2 flex-shrink-0 ${
            addedToCart || isInCart
              ? 'bg-emerald-500 text-white'
              : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
          }`}
          aria-label={addedToCart || isInCart ? 'Añadido' : 'Añadir'}
        >
          {addedToCart || isInCart ? (
            <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          ) : (
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          )}
        </motion.button>
      </div>
    </motion.div>
  )
})

// ============================================================================
// CHECKOUT STEPS - MOBILE OPTIMIZED
// ============================================================================

interface CheckoutStepsProps {
  currentStep: number
}

export const CheckoutSteps = memo(function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  const steps = useMemo(() => [
    { number: 1, label: 'Carrito', labelShort: 'Cart' },
    { number: 2, label: 'Datos', labelShort: 'Data' },
    { number: 3, label: 'Pago', labelShort: 'Pay' },
    { number: 4, label: 'OK', labelShort: 'OK' }
  ], [])
  
  return (
    <nav className="mb-8 sm:mb-10 md:mb-12" aria-label="Progreso del checkout">
      <ol className="flex items-center justify-between max-w-2xl mx-auto">
        {steps.map((step, index) => {
          const isActive = step.number === currentStep
          const isCompleted = step.number < currentStep
          
          return (
            <li key={step.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center w-full">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm mb-1.5 sm:mb-2 ${
                    step.number <= currentStep
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg'
                      : 'bg-zinc-800 border border-zinc-700 text-zinc-500'
                  }`}
                  aria-current={isActive ? 'step' : undefined}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    step.number
                  )}
                </motion.div>
                <span className={`text-[10px] sm:text-xs font-medium ${
                  step.number <= currentStep ? 'text-white' : 'text-zinc-500'
                }`}>
                  <span className="hidden xs:inline">{step.label}</span>
                  <span className="xs:hidden">{step.labelShort}</span>
                </span>
              </div>
              
              {index < steps.length - 1 && (
                <div className="flex-1 h-0.5 mx-1 sm:mx-2 relative">
                  <div className="absolute inset-0 bg-zinc-800" />
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: step.number < currentStep ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 origin-left"
                  />
                </div>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
})

// ============================================================================
// EMPTY CART - MOBILE OPTIMIZED
// ============================================================================

export const EmptyCart = memo(function EmptyCart() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl sm:rounded-3xl p-8 sm:p-10 md:p-12 text-center shadow-2xl border border-blue-500/20"
    >
      <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center border border-blue-500/30">
        <span className="text-4xl sm:text-5xl">🛒</span>
      </div>
      <h3 className="text-xl sm:text-2xl font-black text-white mb-2 sm:mb-3">
        Tu carrito está vacío
      </h3>
      <p className="text-sm sm:text-base text-zinc-400 mb-6 sm:mb-8 max-w-md mx-auto">
        Explorá nuestro catálogo y encontrá tu colchón perfecto
      </p>
      <Link href="/catalogo">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-bold inline-flex items-center gap-2 shadow-2xl text-sm sm:text-base"
        >
          <span>Explorar productos</span>
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </motion.button>
      </Link>
    </motion.div>
  )
})

// ============================================================================
// PAYMENT METHODS - MOBILE OPTIMIZED
// ============================================================================

interface PaymentMethodsProps {
  selected: string
  onSelect: (method: string) => void
}

export const PaymentMethods = memo(function PaymentMethods({ 
  selected, 
  onSelect 
}: PaymentMethodsProps) {
  const { trackEvent } = useAnalytics()
  
  const methods = useMemo(() => {
    const allMethods = [
      {
        id: 'mercadopago',
        name: 'MercadoPago',
        icon: '💳',
        description: 'Tarjeta crédito/débito',
        badges: ['Visa', 'Mastercard'],
        recommended: true,
        available: !!process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY
      },
      {
        id: 'efectivo_domicilio',
        name: 'Efectivo',
        nameShort: 'Efectivo',
        icon: '💵',
        description: 'Pagás al recibir',
        badge: 'Sin recargo',
        available: true
      }
    ]
    
    return allMethods.filter(m => m.available)
  }, [])
  
  const handleSelect = useCallback((methodId: string) => {
    onSelect(methodId)
    trackEvent('select_promotion', {
      promotion_name: methodId,
      creative_name: 'payment_method_cart'
    })
  }, [onSelect, trackEvent])
  
  return (
    <div className="space-y-2 sm:space-y-3" role="radiogroup" aria-label="Métodos de pago">
      {methods.map((method) => {
        const isSelected = selected === method.id
        
        return (
          <motion.button
            key={method.id}
            type="button"
            onClick={() => handleSelect(method.id)}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={`w-full p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all text-left ${
              isSelected
                ? 'border-blue-500 bg-blue-500/20'
                : 'border-zinc-800 hover:border-blue-500/50 bg-zinc-900/50'
            }`}
            role="radio"
            aria-checked={isSelected}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                <span className="text-xl sm:text-2xl flex-shrink-0">{method.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-white text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 flex-wrap">
                    <span className="truncate">{method.name}</span>
                    {method.recommended && (
                      <span className="text-[8px] sm:text-[9px] px-1 sm:px-1.5 py-0.5 bg-blue-500/20 text-blue-400 rounded flex-shrink-0">
                        TOP
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] sm:text-xs text-zinc-400 truncate">{method.description}</div>
                </div>
              </div>
              
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 ml-2"
                >
                  <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </motion.div>
              )}
            </div>
          </motion.button>
        )
      })}
    </div>
  )
})