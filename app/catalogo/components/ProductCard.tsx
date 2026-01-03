// app/catalogo/components/ProductCard.tsx - ✅ CON RESERVA DIRECTA POR WHATSAPP
'use client'

import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { Star, Heart, TrendingUp, Sparkles, Zap, Package, AlertCircle, MessageCircle } from 'lucide-react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { formatARS } from '@/lib/utils/currency'
import { getMejorCuota } from '@/lib/utils/pricing'

// ============================================================================
// CONFIGURACIÓN WHATSAPP
// ============================================================================
const WHATSAPP_NUMBER = '5493534017332' // Tu número de WhatsApp con código de país

function generateWhatsAppMessage(product: {
  name: string
  price: number
  variant?: string
  slug: string
}): string {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://azulcolchones.com'
  const productUrl = `${baseUrl}/producto/${product.slug}`
  
  const message = `¡Hola! 👋 Quiero reservar:

🛏️ *${product.name}*
📏 Medida: *${product.variant || 'A confirmar'}*
💰 Precio: *${formatARS(product.price)}*

🔗 ${productUrl}

¿Está disponible para entrega inmediata?`

  return encodeURIComponent(message)
}

// ============================================================================
// TYPES
// ============================================================================
interface ProductVariant {
  id: string
  productId: string
  size: string
  dimensions: string
  price: number
  stock: number
  sku: string | null
  isActive: boolean
  originalPrice?: number | null
}

interface ProductCardProps {
  product: {
    id: string
    name: string
    subtitle?: string | null
    price: number
    originalPrice?: number | null
    discount?: number | null
    rating: number
    reviewCount: number
    firmness?: string | null
    images?: string | string[] | null
    slug: string
    isBestSeller?: boolean | null
    isNew?: boolean | null
    isPremium?: boolean | null
    mainColor?: string | null
    variants?: ProductVariant[] | null
  }
  index?: number
  avgPrice?: number
}

// ============================================================================
// CONFIGURACIÓN
// ============================================================================
const SIZE_LABELS: Record<string, string> = {
  '1 plaza': '🛏️ 1 Plaza',
  '1 plaza grande': '🛏️ 1 Plaza XL',
  '2 plazas': '🛏️🛏️ 2 Plazas',
  'Matrimonial chico': '👫 Matrimonial',
  'Matrimonial': '👫 Matrimonial',
  'Queen': '👑 Queen',
  'Super King': '♛ Super King',
  'King': '♛ King'
}

// ============================================================================
// HOOKS
// ============================================================================
function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  
  useEffect(() => {
    try {
      const stored = localStorage.getItem('product-favorites')
      if (stored) setFavorites(new Set(JSON.parse(stored)))
    } catch (error) {
      console.error('Error loading favorites:', error)
    }
  }, [])
  
  const toggleFavorite = useCallback((id: string) => {
    setFavorites(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      try {
        localStorage.setItem('product-favorites', JSON.stringify([...next]))
      } catch (error) {
        console.error('Error saving favorites:', error)
      }
      return next
    })
  }, [])
  
  return { favorites, toggleFavorite }
}

// ============================================================================
// SELECTOR DE MEDIDAS
// ============================================================================
function SizeSelector({ 
  variants, 
  selectedVariant, 
  onSelectVariant 
}: { 
  variants: ProductVariant[]
  selectedVariant: ProductVariant | null
  onSelectVariant: (variant: ProductVariant) => void
}) {
  const available = useMemo(
    () => variants.filter(v => v.isActive && v.stock > 0),
    [variants]
  )
  
  useEffect(() => {
    if (available.length === 1 && !selectedVariant) {
      onSelectVariant(available[0])
    }
  }, [available, selectedVariant, onSelectVariant])
  
  if (available.length === 0) {
    return (
      <div className="p-3 rounded-xl bg-red-50 border border-red-200 flex items-center gap-2">
        <AlertCircle className="w-4 h-4 text-red-600" />
        <p className="text-xs font-semibold text-red-900">Sin stock disponible</p>
      </div>
    )
  }
  
  if (available.length === 1) {
    return (
      <div className="flex items-center gap-2 p-2 rounded-lg bg-blue-50 border border-blue-200">
        <Package className="w-4 h-4 text-blue-600" />
        <span className="text-xs font-semibold text-blue-900">
          {SIZE_LABELS[available[0].size] || available[0].size}
        </span>
      </div>
    )
  }
  
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-gray-700">Elegí tu medida:</p>
      
      <div className="grid grid-cols-2 gap-2">
        {available.map(variant => {
          const isSelected = selectedVariant?.id === variant.id
          const label = SIZE_LABELS[variant.size] || variant.size
          const lowStock = variant.stock <= 5
          
          return (
            <div key={variant.id} className="relative">
              <motion.button
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation()
                  onSelectVariant(variant)
                }}
                className={`
                  w-full p-2.5 rounded-lg text-xs font-semibold transition-all
                  ${isSelected
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-900 border border-gray-200 hover:border-blue-300'
                  }
                `}
              >
                <div className="flex flex-col items-center gap-0.5">
                  <span className="leading-tight">{label}</span>
                  {lowStock && (
                    <span className={`text-[9px] font-bold leading-none ${
                      isSelected ? 'text-blue-100' : 'text-orange-600'
                    }`}>
                      {variant.stock === 1 ? '¡Último!' : `${variant.stock} disponibles`}
                    </span>
                  )}
                </div>
              </motion.button>
              
              {lowStock && (
                <div className="absolute -top-2 -right-2 z-10 pointer-events-none">
                  <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-[10px] font-black text-white">
                      {variant.stock}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================
export default function ProductCard({ 
  product, 
  index = 0,
  avgPrice = 300000
}: ProductCardProps) {
  const router = useRouter()
  const { favorites, toggleFavorite } = useFavorites()
  
  const isFavorite = favorites.has(product.id)
  
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null)
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number}>>([])
  
  const cardRef = useRef<HTMLDivElement>(null)
  const particleIdRef = useRef(0)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [2, -2]), {
    stiffness: 150,
    damping: 20
  })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-2, 2]), {
    stiffness: 150,
    damping: 20
  })
  
  const variants = useMemo(() => product.variants || [], [product.variants])
  
  const hasStock = useMemo(() => {
    return variants.some(v => v.isActive && v.stock > 0)
  }, [variants])
  
  useEffect(() => {
    if (!selectedVariant && variants.length > 0) {
      const available = variants
        .filter(v => v.isActive && v.stock > 0)
        .sort((a, b) => b.stock - a.stock)
      
      if (available.length > 0) {
        setSelectedVariant(available[0])
      }
    }
  }, [variants, selectedVariant])
  
  const finalPrice = useMemo(() => {
    return selectedVariant?.price || product.price
  }, [selectedVariant, product.price])
  
  const originalPrice = useMemo(() => {
    const variantOriginal = selectedVariant?.originalPrice
    if (variantOriginal && variantOriginal > finalPrice) {
      return variantOriginal
    }
    if (product.originalPrice && product.originalPrice > finalPrice) {
      return product.originalPrice
    }
    return null
  }, [selectedVariant, product.originalPrice, finalPrice])
  
  const mejorCuota = useMemo(() => getMejorCuota(finalPrice), [finalPrice])
  
  const productImage = useMemo(() => {
    if (imageError) return '/images/placeholder-colchon.jpg'
    if (!product.images) return '/images/placeholder-colchon.jpg'
    if (typeof product.images === 'string') return product.images
    if (Array.isArray(product.images) && product.images[0]) return product.images[0]
    return '/images/placeholder-colchon.jpg'
  }, [product.images, imageError])
  
  const discountPercentage = useMemo(() => {
    if (originalPrice && originalPrice > finalPrice) {
      return Math.round(((originalPrice - finalPrice) / originalPrice) * 100)
    }
    return product.discount || 0
  }, [originalPrice, finalPrice, product.discount])
  
  const savings = useMemo(() => {
    if (originalPrice && originalPrice > finalPrice) {
      return originalPrice - finalPrice
    }
    return 0
  }, [originalPrice, finalPrice])
  
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || window.innerWidth < 768) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    
    mouseX.set(x)
    mouseY.set(y)
  }, [mouseX, mouseY])
  
  const handleMouseLeave = useCallback(() => {
    mouseX.set(0)
    mouseY.set(0)
  }, [mouseX, mouseY])
  
  const handleFavoriteClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    const rect = cardRef.current?.getBoundingClientRect()
    if (rect) {
      const newParticles = Array.from({ length: 6 }, () => ({
        id: particleIdRef.current++,
        x: rect.right - 50,
        y: rect.top + 30
      }))
      setParticles(prev => [...prev, ...newParticles])
      
      setTimeout(() => {
        setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)))
      }, 1000)
    }
    
    toggleFavorite(product.id)
  }, [toggleFavorite, product.id])
  
  const handleNavigateToProduct = useCallback((e: React.MouseEvent) => {
    const url = `/producto/${product.slug}${selectedVariant ? `?variant=${selectedVariant.id}` : ''}`
    router.push(url)
  }, [product.slug, selectedVariant, router])
  
  // ✅ NUEVO: Handler para reservar por WhatsApp
  const handleReserveWhatsApp = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!selectedVariant) {
      alert('Por favor seleccioná una medida primero')
      return
    }
    
    const message = generateWhatsAppMessage({
      name: product.name,
      price: finalPrice,
      variant: selectedVariant.size,
      slug: product.slug
    })
    
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`
    
    // Track analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'reserve_whatsapp', {
        event_category: 'engagement',
        event_label: product.name,
        value: finalPrice,
        currency: 'ARS',
        items: [{
          item_id: product.id,
          item_name: product.name,
          item_variant: selectedVariant.size,
          price: finalPrice,
        }]
      })
    }
    
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }, [selectedVariant, product, finalPrice])
  
  const handleImageError = useCallback(() => {
    console.warn(`Image load error for product: ${product.id}`)
    setImageError(true)
    setImageLoaded(true)
  }, [product.id])
  
  return (
    <>
      <AnimatePresence>
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            initial={{ opacity: 1, scale: 0, x: particle.x, y: particle.y }}
            animate={{
              opacity: 0,
              scale: 1.5,
              x: particle.x + (Math.random() - 0.5) * 100,
              y: particle.y - 100 - Math.random() * 50,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="fixed pointer-events-none z-50"
            style={{ left: 0, top: 0 }}
          >
            <Heart className="w-6 h-6 fill-red-500 text-red-500" />
          </motion.div>
        ))}
      </AnimatePresence>
      
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
          delay: index * 0.05,
          type: 'spring',
          stiffness: 100
        }}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full group"
      >
        <div className="relative">
          <div className={`relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden border shadow-md transition-all duration-300 ${
            hasStock 
              ? 'border-gray-200 group-hover:shadow-xl group-hover:border-blue-300' 
              : 'border-gray-300 opacity-75'
          }`}>
            
            {!hasStock && (
              <div className="absolute inset-0 bg-white/90 z-30 flex items-center justify-center backdrop-blur-sm">
                <div className="text-center p-6">
                  <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-lg font-black text-gray-900">Agotado</p>
                  <p className="text-sm text-gray-600 mt-1">Consultá disponibilidad</p>
                </div>
              </div>
            )}
            
            <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-20 flex flex-col gap-1 sm:gap-2">
              {product.isBestSeller && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="px-2 py-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full text-white text-[9px] sm:text-[10px] font-black flex items-center gap-1 shadow-lg"
                >
                  <TrendingUp className="w-2.5 h-2.5" />
                  <span>TOP</span>
                </motion.div>
              )}
              
              {product.isNew && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="px-2 py-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full text-white text-[9px] sm:text-[10px] font-black flex items-center gap-1 shadow-lg"
                >
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>NUEVO</span>
                </motion.div>
              )}
              
              {discountPercentage > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="px-2 py-1 bg-gradient-to-r from-red-500 to-pink-600 rounded-full text-white text-[9px] sm:text-[10px] font-black shadow-lg"
                >
                  -{discountPercentage}%
                </motion.div>
              )}
            </div>
            
            <motion.button
              onClick={handleFavoriteClick}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              className={`absolute top-2 right-2 sm:top-4 sm:right-4 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-xl backdrop-blur-md border flex items-center justify-center shadow-lg transition-all ${
                isFavorite 
                  ? 'bg-red-500 border-red-400' 
                  : 'bg-white/90 border-gray-200 hover:border-red-400'
              }`}
              aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            >
              <Heart 
                className={`w-5 h-5 transition-all ${
                  isFavorite ? 'fill-white text-white' : 'text-gray-700'
                }`} 
              />
            </motion.button>
            
            <div 
              onClick={handleNavigateToProduct}
              className="relative h-64 sm:h-80 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden cursor-pointer"
            >
              {!imageLoaded && (
                <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200" />
              )}
              
              <img
                src={productImage}
                alt={`${product.name} - Colchón premium Villa María`}
                loading="lazy"
                decoding="async"
                onLoad={() => setImageLoaded(true)}
                onError={handleImageError}
                className={`w-full h-full object-cover transition-all duration-500 ${
                  imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                } ${hasStock ? 'group-hover:scale-110' : ''}`}
              />
              
              {imageError && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Package className="w-16 h-16 text-gray-300" />
                </div>
              )}
            </div>
            
            <div className="p-4 sm:p-6 space-y-3 sm:space-y-4 bg-white">
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs sm:text-sm font-bold text-gray-900">
                  {product.rating.toFixed(1)}
                </span>
                <span className="text-[10px] sm:text-xs text-gray-500">
                  ({product.reviewCount > 1000 ? `${(product.reviewCount / 1000).toFixed(1)}k` : product.reviewCount})
                </span>
              </div>
              
              <div>
                <h3 
                  onClick={handleNavigateToProduct}
                  className="text-lg sm:text-xl font-black text-gray-900 mb-1 leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors cursor-pointer"
                >
                  {product.name}
                </h3>
                {product.subtitle && (
                  <p className="text-xs sm:text-sm text-gray-600 line-clamp-1">
                    {product.subtitle}
                  </p>
                )}
              </div>
              
              {hasStock && (
                <SizeSelector
                  variants={variants}
                  selectedVariant={selectedVariant}
                  onSelectVariant={setSelectedVariant}
                />
              )}
              
              {hasStock && (
                <div className="space-y-2 pt-2">
                  <div>
                    {originalPrice && originalPrice > finalPrice && (
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-sm text-gray-400 line-through">
                          {formatARS(originalPrice)}
                        </span>
                      </div>
                    )}
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-black text-gray-900">
                        {formatARS(finalPrice)}
                      </span>
                      {discountPercentage > 0 && (
                        <span className="text-xs text-red-600 font-bold">
                          -{discountPercentage}%
                        </span>
                      )}
                    </div>
                    {savings > 0 && (
                      <p className="text-xs text-emerald-600 font-semibold mt-0.5">
                        Ahorrás {formatARS(savings)}
                      </p>
                    )}
                    <div className="flex items-center gap-2 text-[10px] sm:text-xs mt-1">
                      <span className="text-emerald-600 font-bold">
                        💳 Efectivo/Transferencia
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-xl bg-blue-50 border border-blue-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-blue-600 font-semibold mb-0.5">
                          Hasta {mejorCuota.cuotas} cuotas sin interés
                        </div>
                        <div className="text-sm font-black text-gray-900">
                          {mejorCuota.formatted.precioCuota}
                        </div>
                      </div>
                      <Zap className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                </div>
              )}
              
              <div className={`grid gap-2 pt-2 ${hasStock ? 'grid-cols-2' : 'grid-cols-1'}`}>
                <motion.button
                  onClick={handleNavigateToProduct}
                  whileTap={{ scale: 0.97 }}
                  className={`py-3 rounded-xl font-bold text-xs sm:text-sm text-center border-2 transition-all ${
                    hasStock
                      ? 'text-blue-600 border-blue-600 hover:bg-blue-50'
                      : 'text-gray-900 border-gray-900 hover:bg-gray-50'
                  }`}
                >
                  Ver detalles
                </motion.button>
                
                {hasStock && (
                  <motion.button
                    onClick={handleReserveWhatsApp}
                    whileTap={{ scale: 0.97 }}
                    disabled={!selectedVariant}
                    className={`py-3 rounded-xl font-bold text-white text-xs sm:text-sm text-center transition-all ${
                      selectedVariant
                        ? 'bg-gradient-to-r from-emerald-600 to-green-600 shadow-md hover:shadow-lg hover:from-emerald-700 hover:to-green-700'
                        : 'bg-gray-300 cursor-not-allowed'
                    }`}
                  >
                    <span className="flex items-center justify-center gap-1.5">
                      <MessageCircle className="w-4 h-4" />
                      <span>Reservar</span>
                    </span>
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}