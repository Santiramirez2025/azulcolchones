// app/producto/[slug]/components/ProductInfo.tsx - ✅ CUOTAS COMPACTAS SIN MODAL
'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Star, Heart, Share2, ShoppingCart, Plus, Minus, Check,
  Truck, Shield, RotateCcw, CreditCard, DollarSign, ChevronDown
} from 'lucide-react'
import { formatARS } from '@/lib/utils/currency'
import type { ProductWithRelations, StockInfo } from '@/lib/types/product'
import type { ProductVariant } from '@prisma/client'

interface CuotaOption {
  cuotas: number
  precioTotal: number
  precioCuota: number
  recargo: number
  recargoPercentage: string
  formatted: {
    precioTotal: string
    precioCuota: string
    recargo: string
  }
}

interface ProductInfoProps {
  product: ProductWithRelations
  averageRatings: any
  currentPrice: number
  basePrice: number
  originalPrice?: number
  savings: number
  stockInfo: StockInfo
  variants: ProductVariant[]
  selectedVariant: ProductVariant | null
  setSelectedVariant: (variant: ProductVariant) => void
  quantity: number
  setQuantity: (quantity: number) => void
  isOutOfStock: boolean
  handleAddToCart: () => void
  isFavorite: boolean
  setIsFavorite: (favorite: boolean) => void
  handleShare: (platform?: string) => void
  showShareMenu: boolean
  features: string[]
  setActiveTab: (tab: string) => void
  todasLasCuotas: CuotaOption[]
  selectedCuotas: number | null
  onCuotasChange: (cuotas: number | null) => void
}

export default function ProductInfo({
  product,
  averageRatings,
  currentPrice,
  basePrice,
  originalPrice,
  savings,
  stockInfo,
  variants,
  selectedVariant,
  setSelectedVariant,
  quantity,
  setQuantity,
  isOutOfStock,
  handleAddToCart,
  isFavorite,
  setIsFavorite,
  handleShare,
  showShareMenu,
  features,
  setActiveTab,
  todasLasCuotas,
  selectedCuotas,
  onCuotasChange
}: ProductInfoProps) {
  
  // ✅ DROPDOWN COMPACTO en lugar de modal fullscreen
  const [showCuotasDropdown, setShowCuotasDropdown] = useState(false)
  const [showAllFeatures, setShowAllFeatures] = useState(false)
  
  const currentStock = selectedVariant?.stock ?? stockInfo.quantity ?? 0
  const isLowStock = currentStock > 0 && currentStock <= 5
  
  // Mejor cuota destacada (3 cuotas sin recargo)
  const mejorCuotaSinRecargo = useMemo(() => {
    return todasLasCuotas.find(c => c.cuotas === 3) || todasLasCuotas[0]
  }, [todasLasCuotas])
  
  // Cuota seleccionada actual
  const cuotaSeleccionada = useMemo(() => {
    if (selectedCuotas === null) return null
    return todasLasCuotas.find(c => c.cuotas === selectedCuotas) || null
  }, [selectedCuotas, todasLasCuotas])

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="space-y-3 sm:space-y-4">
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2">
          {product.isBestSeller && (
            <span className="px-2 sm:px-3 py-1 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-400 text-[10px] sm:text-xs font-bold rounded-full">
              ⭐ MÁS VENDIDO
            </span>
          )}
          {product.isNew && (
            <span className="px-2 sm:px-3 py-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 text-blue-400 text-[10px] sm:text-xs font-bold rounded-full">
              🆕 NUEVO
            </span>
          )}
          {savings > 0 && (
            <span className="px-2 sm:px-3 py-1 bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-500/30 text-emerald-400 text-[10px] sm:text-xs font-bold rounded-full">
              💰 AHORRÁS {formatARS(savings)}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
          {product.name}
        </h1>

        {/* Subtitle */}
        {product.subtitle && (
          <p className="text-base sm:text-lg md:text-xl text-zinc-400 leading-relaxed">
            {product.subtitle}
          </p>
        )}

        {/* Rating & Reviews */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 sm:w-5 sm:h-5 ${
                    star <= Math.round(product.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-zinc-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-zinc-300">
              {product.rating.toFixed(1)}
            </span>
          </div>
          
          {product.reviews && product.reviews.length > 0 && (
            <button
              onClick={() => setActiveTab('reviews')}
              className="text-sm text-blue-400 hover:text-blue-300 underline transition-colors"
            >
              ({product.reviews.length} opiniones)
            </button>
          )}
        </div>
      </div>

      {/* ============================================================================ */}
      {/* ✅ SECCIÓN DE PRECIOS COMPACTA */}
      {/* ============================================================================ */}
      <div className="space-y-3 sm:space-y-4 p-4 sm:p-6 bg-gradient-to-br from-blue-500/5 via-cyan-500/5 to-blue-500/5 border border-blue-500/20 rounded-xl sm:rounded-2xl">
        
        {/* Precio Original Tachado */}
        {originalPrice && originalPrice > basePrice && (
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-lg sm:text-xl md:text-2xl text-zinc-500 line-through">
              {formatARS(originalPrice)}
            </span>
            <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-red-500/20 border border-red-500/30 text-red-400 text-xs sm:text-sm font-bold rounded-full">
              -{Math.round(((originalPrice - basePrice) / originalPrice) * 100)}%
            </span>
          </div>
        )}

        {/* ✅ PRECIO DE CONTADO (destacado) */}
        <div className="space-y-1.5 sm:space-y-2">
          <div className="flex items-baseline gap-2 sm:gap-3">
            <span className="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              {formatARS(basePrice)}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2 sm:px-3 py-1 sm:py-1.5 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-bold rounded-lg flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              CONTADO
            </span>
            <span className="text-xs sm:text-sm text-zinc-500">
              Transferencia • Débito
            </span>
          </div>
        </div>

        {/* ✅ DROPDOWN COMPACTO PARA CUOTAS */}
        <div className="relative">
          <button
            onClick={() => setShowCuotasDropdown(!showCuotasDropdown)}
            className="w-full flex items-center justify-between p-3 sm:p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg sm:rounded-xl hover:bg-blue-500/15 transition-all group"
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
              <div className="text-left">
                {selectedCuotas === null ? (
                  <>
                    <p className="text-sm sm:text-base font-bold text-white">
                      o {mejorCuotaSinRecargo.cuotas} × {mejorCuotaSinRecargo.formatted.precioCuota}
                    </p>
                    <p className="text-[10px] sm:text-xs text-blue-300">
                      SIN RECARGO • Click para más opciones
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-sm sm:text-base font-bold text-white">
                      {cuotaSeleccionada?.cuotas} × {cuotaSeleccionada?.formatted.precioCuota}
                    </p>
                    <p className="text-[10px] sm:text-xs text-zinc-400">
                      Total: {cuotaSeleccionada?.formatted.precioTotal}
                    </p>
                  </>
                )}
              </div>
            </div>
            <motion.div
              animate={{ rotate: showCuotasDropdown ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
            </motion.div>
          </button>

          {/* ✅ DROPDOWN EXPANDIBLE (no modal) */}
          <AnimatePresence>
            {showCuotasDropdown && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden mt-2"
              >
                <div className="space-y-2 p-3 sm:p-4 bg-zinc-900/80 border border-zinc-800 rounded-lg sm:rounded-xl backdrop-blur-sm">
                  {/* Opción CONTADO */}
                  <button
                    onClick={() => {
                      onCuotasChange(null)
                      setShowCuotasDropdown(false)
                    }}
                    className={`w-full p-3 rounded-lg border transition-all text-left ${
                      selectedCuotas === null
                        ? 'bg-emerald-500/20 border-emerald-500/50'
                        : 'bg-zinc-800/50 border-zinc-700 hover:border-emerald-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-white flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-emerald-400" />
                          Precio de Contado
                        </p>
                        <p className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">
                          {formatARS(basePrice)}
                        </p>
                      </div>
                      {selectedCuotas === null && (
                        <Check className="w-5 h-5 text-emerald-400" />
                      )}
                    </div>
                  </button>

                  {/* Opciones de CUOTAS */}
                  {todasLasCuotas.map((cuota) => (
                    <button
                      key={cuota.cuotas}
                      onClick={() => {
                        onCuotasChange(cuota.cuotas)
                        setShowCuotasDropdown(false)
                      }}
                      className={`w-full p-3 rounded-lg border transition-all text-left ${
                        selectedCuotas === cuota.cuotas
                          ? 'bg-blue-500/20 border-blue-500/50'
                          : 'bg-zinc-800/50 border-zinc-700 hover:border-blue-500/30'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-500/20 border border-blue-500/30 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-blue-400">
                              {cuota.cuotas}
                            </span>
                          </div>
                          <div>
                            <p className="text-base sm:text-lg font-black text-white">
                              {cuota.formatted.precioCuota}
                            </p>
                            <p className="text-[10px] sm:text-xs text-zinc-400">
                              Total: {cuota.formatted.precioTotal}
                              {cuota.recargo === 0 ? (
                                <span className="ml-2 text-emerald-400 font-bold">SIN RECARGO</span>
                              ) : (
                                <span className="ml-2 text-orange-400">(+{cuota.recargoPercentage})</span>
                              )}
                            </p>
                          </div>
                        </div>
                        {selectedCuotas === cuota.cuotas && (
                          <Check className="w-5 h-5 text-blue-400" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Stock Status */}
      {!isOutOfStock && isLowStock && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-orange-500/10 border border-orange-500/20 rounded-lg sm:rounded-xl"
        >
          <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
          <span className="text-xs sm:text-sm font-semibold text-orange-400">
            ¡Solo quedan {currentStock} unidades!
          </span>
        </motion.div>
      )}

      {/* Variants (Tamaños) */}
      {variants && variants.length > 0 && (
        <div className="space-y-2 sm:space-y-3">
          <label className="text-xs sm:text-sm font-semibold text-zinc-300 uppercase tracking-wider">
            Tamaño
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
            {variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => setSelectedVariant(variant)}
                disabled={!variant.stock || variant.stock === 0}
                className={`px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border-2 font-semibold text-xs sm:text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px] ${
                  selectedVariant?.id === variant.id
                    ? 'border-blue-500 bg-blue-500/20 text-blue-400 ring-2 ring-blue-500/30'
                    : 'border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-blue-500/50'
                }`}
              >
                <div className="font-bold">{variant.size}</div>
                {variant.dimensions && (
                  <div className="text-[10px] sm:text-xs text-zinc-500 mt-0.5">
                    {variant.dimensions}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity Selector */}
      <div className="space-y-2 sm:space-y-3">
        <label className="text-xs sm:text-sm font-semibold text-zinc-300 uppercase tracking-wider">
          Cantidad
        </label>
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
            className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center bg-zinc-900 border border-zinc-800 rounded-lg sm:rounded-xl hover:bg-zinc-800 hover:border-blue-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Minus className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-400" />
          </button>
          
          <input
            type="number"
            min="1"
            max="10"
            value={quantity}
            onChange={(e) => {
              const val = parseInt(e.target.value) || 1
              setQuantity(Math.max(1, Math.min(10, val)))
            }}
            className="w-16 sm:w-20 h-11 sm:h-12 text-center bg-zinc-900 border border-zinc-800 rounded-lg sm:rounded-xl text-white font-bold text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
          
          <button
            onClick={() => setQuantity(Math.min(10, quantity + 1))}
            disabled={quantity >= 10 || quantity >= currentStock}
            className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center bg-zinc-900 border border-zinc-800 rounded-lg sm:rounded-xl hover:bg-zinc-800 hover:border-blue-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-400" />
          </button>
          
          <span className="text-xs sm:text-sm text-zinc-400 ml-1 sm:ml-2">
            (Máx. 10)
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 gap-3 sm:gap-4">
        {/* Add to Cart - Main CTA */}
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className="w-full px-6 sm:px-8 py-4 sm:py-5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-base sm:text-lg rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl shadow-blue-500/25 flex items-center justify-center gap-2 sm:gap-3 min-h-[52px] sm:min-h-[56px]"
        >
          <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
          <span>{isOutOfStock ? 'Agotado' : 'Agregar al Carrito'}</span>
        </button>

        {/* Secondary Actions */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className={`px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl border-2 font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 min-h-[48px] ${
              isFavorite
                ? 'border-red-500 bg-red-500/20 text-red-400'
                : 'border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-red-500/50'
            }`}
          >
            <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isFavorite ? 'fill-current' : ''}`} />
            <span className="hidden sm:inline">Favorito</span>
          </button>

          <button
            onClick={() => handleShare()}
            className="px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl border-2 border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-blue-500/50 font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 min-h-[48px]"
          >
            <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Compartir</span>
          </button>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-white/10">
        <div className="flex items-start gap-2 sm:gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-emerald-500/20 border border-emerald-500/30 rounded-lg flex items-center justify-center flex-shrink-0">
            <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
          </div>
          <div>
            <p className="font-semibold text-white text-xs sm:text-sm">Envío Gratis</p>
            <p className="text-[10px] sm:text-xs text-zinc-400 mt-0.5">Villa María</p>
          </div>
        </div>

        <div className="flex items-start gap-2 sm:gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-500/20 border border-blue-500/30 rounded-lg flex items-center justify-center flex-shrink-0">
            <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
          </div>
          <div>
            <p className="font-semibold text-white text-xs sm:text-sm">
              {product.warranty || 5} Años
            </p>
            <p className="text-[10px] sm:text-xs text-zinc-400 mt-0.5">Garantía</p>
          </div>
        </div>

        <div className="flex items-start gap-2 sm:gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-violet-500/20 border border-violet-500/30 rounded-lg flex items-center justify-center flex-shrink-0">
            <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 text-violet-400" />
          </div>
          <div>
            <p className="font-semibold text-white text-xs sm:text-sm">
              {product.trialNights || 100} Noches
            </p>
            <p className="text-[10px] sm:text-xs text-zinc-400 mt-0.5">Prueba gratis</p>
          </div>
        </div>
      </div>

      {/* Features Preview */}
      {features && features.length > 0 && (
        <div className="space-y-2 sm:space-y-3">
          <h3 className="text-xs sm:text-sm font-semibold text-zinc-300 uppercase tracking-wider">
            Características principales
          </h3>
          <div className="space-y-1.5 sm:space-y-2">
            {features.slice(0, showAllFeatures ? undefined : 5).map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-2 text-xs sm:text-sm text-zinc-400"
              >
                <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span>{feature}</span>
              </motion.div>
            ))}
          </div>
          {features.length > 5 && (
            <button
              onClick={() => setShowAllFeatures(!showAllFeatures)}
              className="text-xs sm:text-sm text-blue-400 hover:text-blue-300 underline transition-colors"
            >
              {showAllFeatures ? 'Ver menos' : `Ver ${features.length - 5} más`}
            </button>
          )}
        </div>
      )}
    </div>
  )
}