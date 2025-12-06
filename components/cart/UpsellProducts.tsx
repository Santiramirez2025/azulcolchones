// components/cart/UpsellProducts.tsx - ✅ FUNCIONAL Y OPTIMIZADO
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Plus, Star, TrendingUp, Package, Heart, ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/lib/store/cart-store'
import { formatARS } from '@/lib/utils/currency'
import { getMejorCuota } from '@/lib/utils/pricing'

// ============================================================================
// TYPES
// ============================================================================

interface UpsellProduct {
  id: string
  name: string
  subtitle?: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviewCount: number
  category: string
  size?: string
  isBestSeller?: boolean
  isNew?: boolean
  stock: number
  badge?: 'COMBO' | 'POPULAR' | 'AHORRO'
  savings?: number
}

interface UpsellProductsProps {
  currentCartItems?: string[] // IDs de productos ya en carrito
  limit?: number
}

// ============================================================================
// MOCK DATA - PRODUCTOS COMPLEMENTARIOS REALES
// ============================================================================

const UPSELL_PRODUCTS: UpsellProduct[] = [
  {
    id: 'upsell-almohada-viscoelastica',
    name: 'Almohada Viscoelástica Premium',
    subtitle: 'Memory Foam con gel refrigerante',
    price: 45000,
    originalPrice: 65000,
    image: '/images/products/almohada-viscoelastica.jpg',
    rating: 4.8,
    reviewCount: 342,
    category: 'Almohadas',
    isBestSeller: true,
    stock: 24,
    badge: 'POPULAR',
    savings: 20000
  },
  {
    id: 'upsell-protector-impermeable',
    name: 'Protector de Colchón Impermeable',
    subtitle: 'Respirable y anti-ácaros',
    price: 32000,
    originalPrice: 42000,
    image: '/images/products/protector-colchon.jpg',
    rating: 4.7,
    reviewCount: 218,
    category: 'Blanquería',
    stock: 31,
    badge: 'AHORRO',
    savings: 10000
  },
  {
    id: 'upsell-sabanas-algondon',
    name: 'Juego de Sábanas Algodón Premium',
    subtitle: '100% algodón egipcio 300 hilos',
    price: 52000,
    originalPrice: 72000,
    image: '/images/products/sabanas-premium.jpg',
    rating: 4.9,
    reviewCount: 187,
    category: 'Blanquería',
    isNew: true,
    stock: 18,
    badge: 'COMBO',
    savings: 20000
  },
  {
    id: 'upsell-almohada-cervical',
    name: 'Almohada Cervical Ortopédica',
    subtitle: 'Diseño ergonómico para cuello',
    price: 38000,
    originalPrice: 48000,
    image: '/images/products/almohada-cervical.jpg',
    rating: 4.6,
    reviewCount: 156,
    category: 'Almohadas',
    stock: 22,
    savings: 10000
  },
  {
    id: 'upsell-base-box',
    name: 'Base Box con Cajones',
    subtitle: 'Organizador + soporte reforzado',
    price: 125000,
    originalPrice: 165000,
    image: '/images/products/base-box.jpg',
    rating: 4.7,
    reviewCount: 94,
    category: 'Bases',
    size: '2 Plazas',
    stock: 8,
    badge: 'AHORRO',
    savings: 40000
  },
  {
    id: 'upsell-funda-nordica',
    name: 'Funda Nórdica Microfibra',
    subtitle: 'Suave y térmica para invierno',
    price: 42000,
    image: '/images/products/funda-nordica.jpg',
    rating: 4.5,
    reviewCount: 128,
    category: 'Blanquería',
    stock: 15
  }
]

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export default function UpsellProducts({ 
  currentCartItems = [],
  limit = 3 
}: UpsellProductsProps) {
  const addItem = useCartStore(state => state.addItem)
  const items = useCartStore(state => state.items)
  
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [addingToCart, setAddingToCart] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Filtrar productos que NO están en el carrito
  const availableUpsells = UPSELL_PRODUCTS.filter(
    product => !items.some(item => item.productId === product.id)
  ).slice(0, limit)

  // Si no hay productos disponibles, no mostrar nada
  if (!mounted || availableUpsells.length === 0) {
    return null
  }

  const handleAddToCart = async (product: UpsellProduct) => {
    setAddingToCart(product.id)

    try {
      addItem({
        productId: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        quantity: 1,
        image: product.image,
        size: product.size || 'Estándar',
        variant: product.subtitle,
        slug: product.id.replace('upsell-', ''),
        sku: `SKU-${product.id}`,
        category: product.category,
        rating: product.rating,
        isBestSeller: product.isBestSeller
      })

      // Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'add_to_cart', {
          currency: 'ARS',
          value: product.price,
          items: [{
            item_id: product.id,
            item_name: product.name,
            price: product.price,
            quantity: 1,
            item_category: product.category,
            discount: product.savings || 0
          }]
        })
      }

      // Animación de éxito
      setSelectedProducts(prev => [...prev, product.id])
      
      setTimeout(() => {
        setAddingToCart(null)
      }, 1500)

    } catch (error) {
      console.error('Error adding upsell to cart:', error)
      setAddingToCart(null)
    }
  }

  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {availableUpsells.map((product, index) => {
          const isAdding = addingToCart === product.id
          const isAdded = selectedProducts.includes(product.id)
          const discount = product.originalPrice 
            ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
            : 0
          const mejorCuota = getMejorCuota(product.price)

          return (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-zinc-800/50 border rounded-xl sm:rounded-2xl p-3 sm:p-4 transition-all duration-300 ${
                isAdded 
                  ? 'border-emerald-500/50 bg-emerald-500/10' 
                  : 'border-blue-500/20 hover:border-blue-400/40'
              }`}
            >
              {/* Badge superior */}
              {product.badge && (
                <div className="absolute top-2 left-2 z-10">
                  <div className={`px-2 py-1 rounded-lg text-[10px] font-black shadow-lg ${
                    product.badge === 'POPULAR' 
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                      : product.badge === 'AHORRO'
                      ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white'
                      : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                  }`}>
                    {product.badge}
                  </div>
                </div>
              )}

              {/* Checkmark cuando está agregado */}
              <AnimatePresence>
                {isAdded && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0 }}
                    className="absolute top-2 right-2 z-10 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <Package className="w-5 h-5 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex gap-3 sm:gap-4">
                {/* Imagen */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-zinc-900 rounded-lg sm:rounded-xl flex-shrink-0 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 80px, 96px"
                  />
                  
                  {/* Descuento badge */}
                  {discount > 0 && (
                    <div className="absolute bottom-1 right-1 bg-red-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded">
                      -{discount}%
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="mb-2">
                    <h4 className="text-sm sm:text-base font-bold text-white mb-0.5 line-clamp-1">
                      {product.name}
                    </h4>
                    {product.subtitle && (
                      <p className="text-xs text-zinc-400 line-clamp-1">
                        {product.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(product.rating)
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-zinc-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-zinc-400">
                      ({product.reviewCount})
                    </span>
                  </div>

                  {/* Precio y acción */}
                  <div className="flex items-end justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      {product.originalPrice && (
                        <p className="text-xs text-zinc-500 line-through">
                          {formatARS(product.originalPrice)}
                        </p>
                      )}
                      <p className="text-lg sm:text-xl font-black text-blue-400 mb-0.5">
                        {formatARS(product.price)}
                      </p>
                      <p className="text-[10px] sm:text-xs text-emerald-400 font-semibold">
                        {mejorCuota.cuotas}x {mejorCuota.formatted.precioCuota}
                      </p>
                    </div>

                    {/* Botón agregar */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAddToCart(product)}
                      disabled={isAdding || isAdded}
                      className={`px-3 sm:px-4 py-2 rounded-lg font-bold text-xs sm:text-sm transition-all shadow-lg flex items-center gap-1.5 flex-shrink-0 ${
                        isAdded
                          ? 'bg-emerald-600 text-white cursor-default'
                          : isAdding
                          ? 'bg-blue-600/50 text-white cursor-wait'
                          : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700'
                      }`}
                    >
                      {isAdding ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          >
                            <Package className="w-4 h-4" />
                          </motion.div>
                          <span className="hidden sm:inline">...</span>
                        </>
                      ) : isAdded ? (
                        <>
                          <Package className="w-4 h-4" />
                          <span className="hidden sm:inline">¡Listo!</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          <span className="hidden sm:inline">Agregar</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Beneficio adicional */}
              {product.savings && product.savings > 0 && !isAdded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-3 pt-3 border-t border-blue-500/20"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      Ahorrás {formatARS(product.savings)}
                    </span>
                    {product.stock <= 10 && (
                      <span className="text-orange-400 font-semibold">
                        ¡Solo {product.stock} disponibles!
                      </span>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </AnimatePresence>

      {/* CTA de valor agregado */}
      {availableUpsells.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Heart className="w-5 h-5 text-blue-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-white mb-1">
                💡 Completá tu compra
              </p>
              <p className="text-xs text-zinc-400">
                Estos productos complementan perfectamente tu pedido. 
                Aprovechá el envío y mejorá tu experiencia de descanso.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
} 