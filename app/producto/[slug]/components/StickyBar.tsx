// app/producto/[slug]/components/StickyBar.tsx - ✅ ULTRA COMPACTO MOBILE
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Check } from 'lucide-react'
import { formatARS } from '@/lib/utils/currency'

interface StickyBarProps {
  show: boolean
  product: any
  currentPrice: number
  originalPrice?: number
  quantity: number
  setQuantity: (qty: number) => void
  isOutOfStock: boolean
  handleAddToCart: () => void
  currentImage?: string
}

export default function StickyBar({ 
  show, 
  product, 
  currentPrice, 
  quantity, 
  isOutOfStock, 
  handleAddToCart,
  currentImage
}: StickyBarProps) {
  const [addedToCart, setAddedToCart] = useState(false)

  const handleAddWithFeedback = () => {
    handleAddToCart()
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed top-0 left-0 right-0 z-[60]"
        >
          {/* Background con blur */}
          <div className="absolute inset-0 bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-800" />
          
          {/* ✅ CONTENIDO COMPACTO - 60px altura mobile */}
          <div className="relative max-w-screen-2xl mx-auto px-3 sm:px-4 lg:px-6 py-2 sm:py-3">
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* ✅ IMAGEN MINI - 40x40px mobile, 56x56px desktop */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg overflow-hidden flex-shrink-0 border border-white/10 shadow-lg"
              >
                {currentImage ? (
                  <img
                    src={currentImage}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xl bg-zinc-800">
                    🛏️
                  </div>
                )}
              </motion.div>

              {/* ✅ INFO COMPACTA */}
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-white line-clamp-1 text-xs sm:text-sm md:text-base leading-tight">
                  {product.name}
                </h3>
                <div className="flex items-baseline gap-1.5 sm:gap-2 mt-0.5">
                  <span className="text-base sm:text-lg md:text-xl font-black bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                    {formatARS(currentPrice)}
                  </span>
                  {quantity > 1 && (
                    <span className="text-[10px] sm:text-xs text-zinc-400 font-medium">
                      × {quantity}
                    </span>
                  )}
                </div>
              </div>

              {/* ✅ CTA COMPACTO - Solo botón en mobile */}
              <motion.button
                whileHover={{ scale: isOutOfStock ? 1 : 1.02 }}
                whileTap={{ scale: isOutOfStock ? 1 : 0.98 }}
                onClick={handleAddWithFeedback}
                disabled={isOutOfStock || addedToCart}
                className="relative overflow-hidden flex-shrink-0 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-xs sm:text-sm md:text-base rounded-lg sm:rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] sm:min-h-[48px]"
                aria-label={isOutOfStock ? 'Producto agotado' : addedToCart ? 'Producto agregado' : `Agregar ${quantity} al carrito`}
              >
                <AnimatePresence mode="wait">
                  {addedToCart ? (
                    <motion.div
                      key="added"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="flex items-center justify-center gap-1.5"
                    >
                      <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="hidden sm:inline">Agregado</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="add"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="flex items-center justify-center gap-1.5"
                    >
                      <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="hidden sm:inline">
                        {isOutOfStock ? 'Agotado' : 'Comprar'}
                      </span>
                      {/* Mobile: solo ícono o precio total */}
                      <span className="sm:hidden">
                        {!isOutOfStock && formatARS(currentPrice * quantity)}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Shine effect */}
                {!isOutOfStock && !addedToCart && (
                  <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  />
                )}
              </motion.button>
            </div>
          </div>

          {/* Border glow inferior */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}