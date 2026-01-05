// app/producto/[slug]/components/ProductInfo.tsx - ✅ SOLO RESERVA POR WHATSAPP
'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Star, Heart, Share2, Plus, Minus, Check,
  Truck, Shield, RotateCcw, MessageCircle, X
} from 'lucide-react'
import { formatARS } from '@/lib/utils/currency'
import type { ProductWithRelations, StockInfo } from '@/lib/types/product'
import type { ProductVariant } from '@prisma/client'

// ============================================================================
// CONFIGURACIÓN WHATSAPP
// ============================================================================
const WHATSAPP_NUMBER = '+54 9 3534 09-6566' // Tu número de WhatsApp con código de país

function generateWhatsAppMessage(product: {
  name: string
  subtitle?: string | null
  price: number
  variant?: string
  quantity: number
  slug: string
  selectedPayment?: string
}): string {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://azulcolchones.com'
  const productUrl = `${baseUrl}/producto/${product.slug}`
  
  const paymentInfo = product.selectedPayment 
    ? `\n💳 Forma de pago: *${product.selectedPayment}*`
    : ''
  
  const message = `¡Hola! 👋 Quiero reservar:

🛏️ *${product.name}*
${product.subtitle ? `📝 ${product.subtitle}\n` : ''}📏 Medida: *${product.variant || 'A confirmar'}*
📦 Cantidad: *${product.quantity}*
💰 Precio: *${formatARS(product.price)}*${paymentInfo}

🔗 ${productUrl}

¿Está disponible para entrega inmediata?`

  return encodeURIComponent(message)
}

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

// ============================================================================
// ✅ COMPONENTE DE OPCIÓN DE PAGO OPTIMIZADO
// ============================================================================
function PaymentOption({ 
  icon, 
  label, 
  sublabel, 
  price, 
  tag, 
  selected, 
  onClick,
  highlight = false
}: {
  icon: string
  label: string
  sublabel?: string
  price: string
  tag?: string
  selected: boolean
  onClick: () => void
  highlight?: boolean
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative overflow-hidden p-3 sm:p-4 rounded-xl border-2 transition-all duration-300 text-left ${
        selected
          ? highlight
            ? 'border-emerald-500 bg-emerald-500/10 ring-2 ring-emerald-500/30'
            : 'border-blue-500 bg-blue-500/10 ring-2 ring-blue-500/30'
          : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700'
      }`}
    >
      {/* Background gradient on hover/select */}
      <div className={`absolute inset-0 transition-opacity duration-300 ${
        selected 
          ? highlight
            ? 'bg-gradient-to-br from-emerald-500/5 to-green-500/5 opacity-100'
            : 'bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-100'
          : 'opacity-0'
      }`} />
      
      <div className="relative">
        {/* Tag (ej: "SIN INTERÉS") */}
        {tag && (
          <div className={`absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black ${
            highlight ? 'bg-emerald-500 text-white' : 'bg-blue-500 text-white'
          }`}>
            {tag}
          </div>
        )}
        
        {/* Icono */}
        <div className="text-2xl sm:text-3xl mb-2">{icon}</div>
        
        {/* Label */}
        <p className={`text-xs sm:text-sm font-bold mb-1 ${
          selected 
            ? highlight ? 'text-emerald-400' : 'text-blue-400'
            : 'text-zinc-400'
        }`}>
          {label}
        </p>
        
        {/* Sublabel */}
        {sublabel && (
          <p className="text-[10px] text-zinc-500 mb-2">{sublabel}</p>
        )}
        
        {/* Precio */}
        <p className={`text-base sm:text-lg font-black ${
          selected ? 'text-white' : 'text-zinc-300'
        }`}>
          {price}
        </p>
      </div>
      
      {/* Checkmark cuando está seleccionado */}
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={`absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center ${
            highlight ? 'bg-emerald-500' : 'bg-blue-500'
          }`}
        >
          <Check className="w-3 h-3 text-white" />
        </motion.div>
      )}
    </motion.button>
  )
}

// ============================================================================
// ✅ MODAL DE TODAS LAS CUOTAS
// ============================================================================
function AllPaymentPlansModal({ 
  isOpen, 
  onClose, 
  todasLasCuotas, 
  basePrice,
  selectedCuotas,
  onSelect 
}: {
  isOpen: boolean
  onClose: () => void
  todasLasCuotas: CuotaOption[]
  basePrice: number
  selectedCuotas: number | null
  onSelect: (cuotas: number | null) => void
}) {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
        
        {/* Modal Content */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full sm:max-w-2xl bg-zinc-900 sm:rounded-2xl overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-zinc-800">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Todas las opciones de pago
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                Elegí la que más te convenga
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-zinc-400" />
            </button>
          </div>
          
          {/* Options List */}
          <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 space-y-3">
            {/* Contado */}
            <button
              onClick={() => {
                onSelect(null)
                onClose()
              }}
              className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                selectedCuotas === null
                  ? 'border-emerald-500 bg-emerald-500/10'
                  : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">💵</div>
                  <div>
                    <p className="font-bold text-white flex items-center gap-2">
                      Precio de Contado
                      <span className="px-2 py-0.5 bg-emerald-500 text-white text-[10px] font-black rounded-full">
                        MEJOR PRECIO
                      </span>
                    </p>
                    <p className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">
                      {formatARS(basePrice)}
                    </p>
                  </div>
                </div>
                {selectedCuotas === null && (
                  <Check className="w-6 h-6 text-emerald-400" />
                )}
              </div>
            </button>

            {/* Todas las cuotas */}
            {todasLasCuotas.map((cuota) => (
              <button
                key={cuota.cuotas}
                onClick={() => {
                  onSelect(cuota.cuotas)
                  onClose()
                }}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                  selectedCuotas === cuota.cuotas
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/20 border border-blue-500/30 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-400">
                        {cuota.cuotas}
                      </span>
                    </div>
                    <div>
                      <p className="text-base sm:text-lg font-black text-white">
                        {cuota.formatted.precioCuota}
                      </p>
                      <p className="text-xs sm:text-sm text-zinc-400">
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
                    <Check className="w-6 h-6 text-blue-400" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// ============================================================================
// ✅ COMPONENTE PRINCIPAL
// ============================================================================
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
  
  const [showAllPlans, setShowAllPlans] = useState(false)
  const [showAllFeatures, setShowAllFeatures] = useState(false)
  
  const currentStock = selectedVariant?.stock ?? stockInfo.quantity ?? 0
  const isLowStock = currentStock > 0 && currentStock <= 5
  
  // Opciones principales (3 cuotas + contado)
  const mejorCuotaSinRecargo = useMemo(() => {
    return todasLasCuotas.find(c => c.cuotas === 3) || todasLasCuotas[0]
  }, [todasLasCuotas])
  
  const cuota6 = useMemo(() => {
    return todasLasCuotas.find(c => c.cuotas === 6) || todasLasCuotas[1]
  }, [todasLasCuotas])

  // ✅ Handler para reservar por WhatsApp
  const handleReserveWhatsApp = () => {
    if (!selectedVariant) {
      alert('Por favor seleccioná un tamaño primero')
      return
    }

    // Determinar el texto del método de pago seleccionado
    let paymentText = ''
    if (selectedCuotas === null) {
      paymentText = 'Contado - ' + formatARS(basePrice)
    } else {
      const cuota = todasLasCuotas.find(c => c.cuotas === selectedCuotas)
      if (cuota) {
        paymentText = `${selectedCuotas} cuotas de ${cuota.formatted.precioCuota} (Total: ${cuota.formatted.precioTotal})`
      }
    }

    const message = generateWhatsAppMessage({
      name: product.name,
      subtitle: product.subtitle,
      price: currentPrice * quantity,
      variant: selectedVariant.size,
      quantity: quantity,
      slug: product.slug,
      selectedPayment: paymentText
    })
    
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`
    
    // Track analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'reserve_whatsapp', {
        event_category: 'engagement',
        event_label: product.name,
        value: currentPrice * quantity,
        currency: 'ARS',
        items: [{
          item_id: product.id,
          item_name: product.name,
          item_variant: selectedVariant.size,
          price: currentPrice,
          quantity: quantity
        }]
      })
    }
    
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

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
      {/* ✅ SECCIÓN DE PRECIOS OPTIMIZADA */}
      {/* ============================================================================ */}
      <div className="space-y-4 sm:space-y-5 p-4 sm:p-6 bg-gradient-to-br from-blue-500/5 via-cyan-500/5 to-blue-500/5 border border-blue-500/20 rounded-xl sm:rounded-2xl">
        
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

        {/* ✅ 3 OPCIONES PRINCIPALES */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {/* CONTADO */}
          <PaymentOption
            icon="💵"
            label="Contado"
            sublabel="Mejor precio"
            price={formatARS(basePrice)}
            tag="MEJOR"
            selected={selectedCuotas === null}
            onClick={() => onCuotasChange(null)}
            highlight={true}
          />
          
          {/* 3 CUOTAS SIN INTERÉS */}
          <PaymentOption
            icon="💳"
            label="3 cuotas"
            sublabel="Sin interés"
            price={mejorCuotaSinRecargo.formatted.precioCuota}
            tag="SIN INTERÉS"
            selected={selectedCuotas === 3}
            onClick={() => onCuotasChange(3)}
          />
          
          {/* 6 CUOTAS */}
          <PaymentOption
            icon="🔢"
            label="6 cuotas"
            sublabel={cuota6.recargo === 0 ? 'Sin interés' : 'Con interés'}
            price={cuota6.formatted.precioCuota}
            selected={selectedCuotas === 6}
            onClick={() => onCuotasChange(6)}
          />
        </div>

        {/* ✅ LINK PARA VER MÁS OPCIONES */}
        <div className="text-center pt-2">
          <button
            onClick={() => setShowAllPlans(true)}
            className="text-xs sm:text-sm text-blue-400 hover:text-blue-300 underline transition-colors inline-flex items-center gap-1"
          >
            Ver hasta 12 cuotas sin interés →
          </button>
        </div>

        {/* ✅ PRECIO TOTAL SELECCIONADO */}
        <div className="pt-3 border-t border-white/10">
          <div className="flex items-baseline justify-between">
            <span className="text-xs sm:text-sm text-zinc-400">
              {selectedCuotas === null ? 'Pagas ahora:' : 'Pagas en cuotas:'}
            </span>
            <div className="text-right">
              <p className="text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                {selectedCuotas === null 
                  ? formatARS(basePrice)
                  : `${selectedCuotas} × ${todasLasCuotas.find(c => c.cuotas === selectedCuotas)?.formatted.precioCuota}`
                }
              </p>
              {selectedCuotas !== null && (
                <p className="text-xs text-zinc-500 mt-1">
                  Total: {todasLasCuotas.find(c => c.cuotas === selectedCuotas)?.formatted.precioTotal}
                </p>
              )}
            </div>
          </div>
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
            className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-zinc-900 border border-zinc-800 rounded-lg sm:rounded-xl hover:bg-zinc-800 hover:border-blue-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Minus className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-400" />
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
            className="w-20 sm:w-24 h-12 sm:h-14 text-center bg-zinc-900 border border-zinc-800 rounded-lg sm:rounded-xl text-white font-bold text-lg sm:text-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
          
          <button
            onClick={() => setQuantity(Math.min(10, quantity + 1))}
            disabled={quantity >= 10 || quantity >= currentStock}
            className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-zinc-900 border border-zinc-800 rounded-lg sm:rounded-xl hover:bg-zinc-800 hover:border-blue-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-400" />
          </button>
          
          <span className="text-xs sm:text-sm text-zinc-400 ml-1 sm:ml-2">
            (Máx. 10)
          </span>
        </div>
      </div>

      {/* ✅ ACTION BUTTONS - SOLO RESERVAR POR WHATSAPP */}
      <div className="space-y-3 sm:space-y-4">
        {/* ✅ Reservar por WhatsApp - CTA PRINCIPAL */}
        <button
          onClick={handleReserveWhatsApp}
          disabled={isOutOfStock}
          className="w-full px-6 sm:px-8 py-5 sm:py-6 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold text-lg sm:text-xl rounded-xl hover:from-emerald-700 hover:to-green-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl shadow-emerald-500/25 flex items-center justify-center gap-3 min-h-[64px] sm:min-h-[72px]"
        >
          <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
          <span>{isOutOfStock ? 'Agotado' : 'Reservar por WhatsApp'}</span>
        </button>

        {/* Secondary Actions */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className={`px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl border-2 font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 min-h-[52px] ${
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
            className="px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl border-2 border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-blue-500/50 font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 min-h-[52px]"
          >
            <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Compartir</span>
          </button>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-white/10">
        <div className="flex items-start gap-2 sm:gap-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 bg-emerald-500/20 border border-emerald-500/30 rounded-lg flex items-center justify-center flex-shrink-0">
            <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
          </div>
          <div>
            <p className="font-semibold text-white text-sm sm:text-base">Envío Gratis</p>
            <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">Villa María</p>
          </div>
        </div>

        <div className="flex items-start gap-2 sm:gap-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 bg-blue-500/20 border border-blue-500/30 rounded-lg flex items-center justify-center flex-shrink-0">
            <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
          </div>
          <div>
            <p className="font-semibold text-white text-sm sm:text-base">
              {product.warranty || 5} Años
            </p>
            <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">Garantía</p>
          </div>
        </div>

        <div className="flex items-start gap-2 sm:gap-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 bg-violet-500/20 border border-violet-500/30 rounded-lg flex items-center justify-center flex-shrink-0">
            <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6 text-violet-400" />
          </div>
          <div>
            <p className="font-semibold text-white text-sm sm:text-base">
              {product.trialNights || 100} Noches
            </p>
            <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">Prueba gratis</p>
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
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
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

      {/* ✅ MODAL DE TODAS LAS CUOTAS */}
      <AllPaymentPlansModal
        isOpen={showAllPlans}
        onClose={() => setShowAllPlans(false)}
        todasLasCuotas={todasLasCuotas}
        basePrice={basePrice}
        selectedCuotas={selectedCuotas}
        onSelect={onCuotasChange}
      />
    </div>
  )
}