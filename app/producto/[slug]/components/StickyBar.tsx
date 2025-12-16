// app/producto/[slug]/components/StickyBar.tsx - ✅ ALWAYS VISIBLE + OPTIMIZADO
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Check, Minus, Plus } from 'lucide-react'
import { formatARS } from '@/lib/utils/currency'
import Image from 'next/image'

interface StickyBarProps {
  show: boolean // Mantener para desktop (solo aparece al hacer scroll)
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
  setQuantity,
  isOutOfStock, 
  handleAddToCart,
  currentImage
}: StickyBarProps) {
  const [addedToCart, setAddedToCart] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const handleAddWithFeedback = () => {
    handleAddToCart()
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  // ✅ MOBILE: Siempre visible (no depende de scroll)
  // ✅ DESKTOP: Solo visible cuando hace scroll (comportamiento original)
  const shouldShow = typeof window !== 'undefined' 
    ? window.innerWidth < 1024 // Mobile: siempre
      ? true 
      : show // Desktop: solo al hacer scroll
    : false

  return (
    <>
      {/* ============================================================================ */}
      {/* ✅ MOBILE STICKY BAR - ALWAYS VISIBLE */}
      {/* ============================================================================ */}
      <AnimatePresence>
        {shouldShow && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-[70] lg:top-0 lg:bottom-auto"
          >
            {/* Background con blur */}
            <div className="absolute inset-0 bg-zinc-950/98 backdrop-blur-xl border-t lg:border-b lg:border-t-0 border-zinc-800/80" />
            
            {/* ✅ MOBILE VERSION - Siempre abajo */}
            <div className="relative lg:hidden">
              {/* Expandible con cantidad */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden border-b border-zinc-800"
                  >
                    <div className="p-3 bg-zinc-900/50">
                      <div className="flex items-center justify-between max-w-md mx-auto">
                        <span className="text-sm font-semibold text-zinc-400">
                          Cantidad
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            disabled={quantity <= 1}
                            className="w-10 h-10 flex items-center justify-center bg-zinc-800 border border-zinc-700 rounded-lg hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Minus className="w-4 h-4 text-zinc-400" />
                          </button>
                          <span className="w-12 text-center font-bold text-white">
                            {quantity}
                          </span>
                          <button
                            onClick={() => setQuantity(Math.min(10, quantity + 1))}
                            disabled={quantity >= 10}
                            className="w-10 h-10 flex items-center justify-center bg-zinc-800 border border-zinc-700 rounded-lg hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Plus className="w-4 h-4 text-zinc-400" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Main bar */}
              <div className="p-3 safe-area-inset-bottom">
                <div className="max-w-md mx-auto">
                  <div className="flex items-center gap-3">
                    {/* Imagen mini */}
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-white/10 shadow-lg"
                    >
                      {currentImage ? (
                        <Image
                          src={currentImage}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xl bg-zinc-800">
                          🛏️
                        </div>
                      )}
                      {isExpanded && (
                        <div className="absolute inset-0 bg-blue-500/20 border-2 border-blue-500" />
                      )}
                    </button>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-zinc-400 truncate leading-tight">
                        {product.name}
                      </p>
                      <div className="flex items-baseline gap-1.5 mt-0.5">
                        <span className="text-lg font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                          {formatARS(currentPrice * quantity)}
                        </span>
                        {quantity > 1 && (
                          <span className="text-xs text-zinc-500 font-medium">
                            ({quantity} × {formatARS(currentPrice)})
                          </span>
                        )}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <motion.button
                      whileTap={{ scale: isOutOfStock ? 1 : 0.95 }}
                      onClick={handleAddWithFeedback}
                      disabled={isOutOfStock || addedToCart}
                      className="relative overflow-hidden flex-shrink-0 px-5 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-sm rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px] min-h-[48px] flex items-center justify-center"
                    >
                      <AnimatePresence mode="wait">
                        {addedToCart ? (
                          <motion.div
                            key="added"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="flex items-center gap-1.5"
                          >
                            <Check className="w-4 h-4" />
                            <span>Listo</span>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="add"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="flex items-center gap-1.5"
                          >
                            <ShoppingCart className="w-4 h-4" />
                            <span>{isOutOfStock ? 'Agotado' : 'Comprar'}</span>
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
              </div>

              {/* Border glow */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
            </div>

            {/* ============================================================================ */}
            {/* ✅ DESKTOP VERSION - Solo al hacer scroll (comportamiento original) */}
            {/* ============================================================================ */}
            <div className="relative hidden lg:block">
              <div className="max-w-screen-2xl mx-auto px-6 py-3">
                <div className="flex items-center gap-4">
                  {/* Imagen */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 border border-white/10 shadow-lg"
                  >
                    {currentImage ? (
                      <Image
                        src={currentImage}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xl bg-zinc-800">
                        🛏️
                      </div>
                    )}
                  </motion.div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-white line-clamp-1 text-base leading-tight">
                      {product.name}
                    </h3>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-xl font-black bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                        {formatARS(currentPrice)}
                      </span>
                      {quantity > 1 && (
                        <span className="text-xs text-zinc-400 font-medium">
                          × {quantity} = {formatARS(currentPrice * quantity)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="w-10 h-10 flex items-center justify-center bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 disabled:opacity-50"
                    >
                      <Minus className="w-4 h-4 text-zinc-400" />
                    </button>
                    <span className="w-12 text-center font-bold text-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(10, quantity + 1))}
                      disabled={quantity >= 10}
                      className="w-10 h-10 flex items-center justify-center bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 disabled:opacity-50"
                    >
                      <Plus className="w-4 h-4 text-zinc-400" />
                    </button>
                  </div>

                  {/* CTA */}
                  <motion.button
                    whileHover={{ scale: isOutOfStock ? 1 : 1.02 }}
                    whileTap={{ scale: isOutOfStock ? 1 : 0.98 }}
                    onClick={handleAddWithFeedback}
                    disabled={isOutOfStock || addedToCart}
                    className="relative overflow-hidden px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-base rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed min-h-[56px] min-w-[180px]"
                  >
                    <AnimatePresence mode="wait">
                      {addedToCart ? (
                        <motion.div
                          key="added"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="flex items-center justify-center gap-2"
                        >
                          <Check className="w-5 h-5" />
                          <span>Agregado</span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="add"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="flex items-center justify-center gap-2"
                        >
                          <ShoppingCart className="w-5 h-5" />
                          <span>{isOutOfStock ? 'Agotado' : 'Comprar ahora'}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

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
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================================================ */}
      {/* ✅ SPACER - Para evitar que el contenido quede oculto debajo del sticky bar */}
      {/* ============================================================================ */}
      {shouldShow && (
        <div className="h-[76px] lg:h-0" aria-hidden="true" />
      )}
    </>
  )
}