// app/producto/[slug]/product-client.tsx - ULTRA OPTIMIZADO MOBILE-FIRST 2025
// ✅ Performance | Accessibility | Conversion | Analytics | UX | Responsive
'use client'

import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, ShoppingCart, AlertCircle, TrendingUp, Clock, CreditCard } from 'lucide-react'
import { useCartStore } from '@/lib/store/cart-store'
import type { ProductWithRelations, StockInfo, Breadcrumb } from '@/lib/types/product'
import type { ProductVariant, Review } from '@prisma/client'
import { formatARS } from '@/lib/utils/currency'
import { getMejorCuota, calcularTodasLasCuotas, getTextoPromocional } from '@/lib/utils/pricing'

// Component imports
import Breadcrumbs from './components/Breadcrumbs'
import StickyBar from './components/StickyBar'
import ImageGallery from './components/ImageGallery'
import ProductInfo from './components/ProductInfo'
import TabsSection from './components/TabsSection'
import RelatedProducts from './components/RelatedProducts'
import ImageModal from './components/ImageModal'

// Helper imports
import { calculateRatings, generateFaqs } from '@/lib/helpers/product-utils'
import { throttle } from '@/lib/utils/performance'

// ============================================================================
// CONSTANTS
// ============================================================================

const TOAST_DURATION = 3000
const MAX_QUANTITY = 10
const PLACEHOLDER_IMAGE = '/images/placeholder.jpg'
const SCROLL_THROTTLE_MS = 100
const LOW_STOCK_THRESHOLD = 5
const RECENT_VIEWS_KEY = 'recent_product_views'
const FREE_SHIPPING_THRESHOLD = 50000

// ============================================================================
// TYPES
// ============================================================================

type TabType = 'description' | 'specs' | 'reviews' | 'faq'

interface ToastState {
  show: boolean
  type: 'success' | 'error' | 'info'
  message: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
}

interface ProductClientProps {
  product: ProductWithRelations
  relatedProducts: any[]
  similarProducts: any[]
  reviews: Review[]
  stockInfo: StockInfo
  breadcrumbs: Breadcrumb[]
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function ProductClient({ 
  product, 
  relatedProducts = [],
  similarProducts = [],
  reviews = [],
  stockInfo,
  breadcrumbs = []
}: ProductClientProps) {
  const router = useRouter()
  const addItem = useCartStore(state => state.addItem)
  
  // Refs
  const productRef = useRef<HTMLDivElement>(null)
  const toastTimeoutRef = useRef<NodeJS.Timeout>()
  const impressionTracked = useRef(false)
  
  // ✅ MEMOIZED ARRAYS - Performance optimization
  const images = useMemo(() => {
    const imgs = Array.isArray(product.images) 
      ? product.images 
      : typeof product.images === 'string'
        ? JSON.parse(product.images)
        : []
    return imgs
  }, [product.images])
  
  const features = useMemo(() => {
    const feats = Array.isArray(product.features) 
      ? product.features 
      : typeof product.features === 'string'
        ? JSON.parse(product.features)
        : []
    return feats
  }, [product.features])
  
  const variants = useMemo(() => {
    return Array.isArray(product.variants) ? product.variants : []
  }, [product.variants])
  
  // ✅ FIX: Normalizar reviews para convertir Date a string y null a undefined
  const normalizedReviews = useMemo(() => {
    return reviews.map(review => ({
      ...review,
      createdAt: review.createdAt instanceof Date 
        ? review.createdAt.toISOString() 
        : review.createdAt,
      updatedAt: review.updatedAt instanceof Date 
        ? review.updatedAt.toISOString() 
        : review.updatedAt,
      title: review.title ?? undefined, // Normalizar null a undefined
    }))
  }, [reviews])
  
  // ============================================================================
  // STATE
  // ============================================================================
  
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(variants[0] || null)
  const [quantity, setQuantity] = useState(1)
  const [selectedCuotas, setSelectedCuotas] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState<TabType>('description')
  const [imageIndex, setImageIndex] = useState(0)
  const [showImageModal, setShowImageModal] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [showStickyBar, setShowStickyBar] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [recentViewers, setRecentViewers] = useState(0)
  const [showLowStockWarning, setShowLowStockWarning] = useState(false)
  
  const [toast, setToast] = useState<ToastState>({
    show: false,
    type: 'success',
    message: '',
  })
  
  // ============================================================================
  // COMPUTED VALUES
  // ============================================================================
  
  const averageRatings = useMemo(
    () => calculateRatings(normalizedReviews, product.rating), 
    [normalizedReviews, product.rating]
  )
  
  const faqs = useMemo(() => generateFaqs(product), [product])
  
  const basePrice = selectedVariant?.price || product.price
  const originalPrice = selectedVariant?.originalPrice || product.originalPrice || undefined
  
  const mejorCuota = useMemo(() => getMejorCuota(basePrice), [basePrice])
  const todasLasCuotas = useMemo(() => calcularTodasLasCuotas(basePrice), [basePrice])
  const cuotaSeleccionada = useMemo(() => {
    if (selectedCuotas === null) return null
    return todasLasCuotas.find(c => c.cuotas === selectedCuotas) || null
  }, [selectedCuotas, todasLasCuotas])
  
  const currentPrice = cuotaSeleccionada ? cuotaSeleccionada.precioTotal : basePrice
  const displayPrice = cuotaSeleccionada 
    ? `${cuotaSeleccionada.cuotas} x ${cuotaSeleccionada.formatted.precioCuota}`
    : formatARS(basePrice)
  
  const savings = originalPrice ? originalPrice - basePrice : 0
  const discountPercent = originalPrice 
    ? Math.round(((originalPrice - basePrice) / originalPrice) * 100)
    : 0
  
  const currentStock = selectedVariant?.stock ?? stockInfo.quantity ?? 0
  const isOutOfStock = !product.inStock || currentStock === 0
  const isLowStock = currentStock > 0 && currentStock <= LOW_STOCK_THRESHOLD
  
  const currentImage = images.length > 0 
    ? images[imageIndex] 
    : product.images[0] || PLACEHOLDER_IMAGE

  // ✅ FIX: Enhanced product con normalización de tipos null a undefined
  const enhancedProduct = useMemo(() => {
    const base: any = {
      ...product,
      features: features,
    }
    
    // Normalizar null a undefined solo para propiedades que existen
    const nullableProps = [
      'firmness', 'comfort', 'support', 'breathability', 'durability',
      'originalPrice', 'compareAtPrice', 'discount', 'warranty', 
      'trialNights', 'sku', 'brand', 'material', 'height', 'weight',
      'certifications', 'careInstructions', 'shippingInfo', 'returnPolicy',
      'seoTitle', 'seoDescription', 'seoKeywords'
    ]
    
    nullableProps.forEach(prop => {
      if (prop in product) {
        base[prop] = (product as any)[prop] ?? undefined
      }
    })
    
    return base
  }, [product, features])

  // ============================================================================
  // HANDLERS
  // ============================================================================
  
  const showToast = useCallback((
    type: 'success' | 'error' | 'info', 
    message: string, 
    description?: string,
    action?: { label: string; onClick: () => void }
  ) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current)
    }
    
    setToast({ show: true, type, message, description, action })
    
    toastTimeoutRef.current = setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }))
    }, TOAST_DURATION)
  }, [])

  const handleViewCart = useCallback(() => {
    router.push('/carrito')
  }, [router])

  const handleCuotasChange = useCallback((cuotas: number | null) => {
    setSelectedCuotas(cuotas)
    
    // ✅ ANALYTICS - Track payment method selection
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'select_promotion', {
        promotion_name: cuotas ? `${cuotas} cuotas` : 'Contado',
        creative_name: 'payment_plan',
        creative_slot: 'product_page'
      })
    }
  }, [])

  // ============================================================================
  // EFFECTS
  // ============================================================================
  
  // ✅ ANALYTICS - Track product view impression
  useEffect(() => {
    if (!impressionTracked.current) {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'view_item', {
          currency: 'ARS',
          value: basePrice,
          items: [{
            item_id: product.id,
            item_name: product.name,
            item_category: product.category,
            price: basePrice,
            discount: savings
          }]
        })
      }
      
      // Store recent view for recommendations
      try {
        const recentViews = JSON.parse(localStorage.getItem(RECENT_VIEWS_KEY) || '[]')
        const updatedViews = [
          { id: product.id, slug: product.slug, timestamp: Date.now() },
          ...recentViews.filter((v: any) => v.id !== product.id)
        ].slice(0, 10)
        localStorage.setItem(RECENT_VIEWS_KEY, JSON.stringify(updatedViews))
      } catch (e) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Error storing recent view:', e)
        }
      }
      
      impressionTracked.current = true
    }
    
    // Social proof simulation
    setRecentViewers(Math.floor(Math.random() * 15) + 5)
  }, [product.id, product.slug, product.name, product.category, basePrice, savings])
  
  // ✅ PERFORMANCE - Throttled scroll detection for sticky bar
  useEffect(() => {
    const handleScroll = throttle(() => {
      if (productRef.current) {
        const rect = productRef.current.getBoundingClientRect()
        setShowStickyBar(rect.bottom < 0)
      }
    }, SCROLL_THROTTLE_MS)
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // ✅ UX - Low stock warning
  useEffect(() => {
    if (isLowStock && !showLowStockWarning) {
      const timer = setTimeout(() => {
        setShowLowStockWarning(true)
        showToast(
          'info',
          '⚡ Stock limitado',
          `Solo quedan ${currentStock} unidades disponibles`
        )
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isLowStock, showLowStockWarning, currentStock, showToast])
  
  // Cleanup
  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current)
      }
    }
  }, [])

  // ============================================================================
  // ADD TO CART HANDLER - OPTIMIZADO CON ANALYTICS
  // ============================================================================
  
  const handleAddToCart = useCallback(async () => {
    if (isAddingToCart || isOutOfStock) return
    
    const paymentPlan = cuotaSeleccionada 
      ? `${cuotaSeleccionada.cuotas} cuotas` 
      : 'Contado'
    
    setIsAddingToCart(true)
    
    try {
      addItem({
        productId: product.id,
        slug: product.slug,
        name: product.name,
        price: currentPrice,
        originalPrice: originalPrice || undefined,
        quantity: quantity,
        image: currentImage,
        images: images.length > 0 ? images : (product.images[0] ? [product.images[0]] : []),
        size: selectedVariant?.size || 'Estándar',
        variant: selectedVariant?.dimensions || undefined,
        sku: selectedVariant?.sku || product.sku || undefined,
        maxQuantity: MAX_QUANTITY,
        inStock: product.inStock,
        category: product.category,
        rating: product.rating,
        isBestSeller: product.isBestSeller
      })
      
      const description = cuotaSeleccionada
        ? `${quantity} ${quantity === 1 ? 'unidad' : 'unidades'} · ${cuotaSeleccionada.cuotas} cuotas de ${cuotaSeleccionada.formatted.precioCuota}`
        : `${quantity} ${quantity === 1 ? 'unidad' : 'unidades'} · Pago de contado`
      
      showToast(
        'success',
        '¡Agregado al carrito!',
        description,
        {
          label: 'Ver carrito',
          onClick: handleViewCart
        }
      )
      
      // ✅ ANALYTICS - Add to cart event
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'add_to_cart', {
          currency: 'ARS',
          value: currentPrice * quantity,
          items: [{
            item_id: product.id,
            item_name: product.name,
            price: currentPrice,
            quantity: quantity,
            item_category: product.category,
            dimension1: paymentPlan
          }]
        })
      }
      
      // ✅ FACEBOOK PIXEL - Add to cart
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'AddToCart', {
          content_ids: [product.id],
          content_name: product.name,
          content_type: 'product',
          value: currentPrice * quantity,
          currency: 'ARS'
        })
      }
      
      // Suggest related products
      setTimeout(() => {
        if (relatedProducts.length > 0) {
          const scrollToRelated = () => {
            document.querySelector('[data-related-products]')?.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            })
          }
          showToast(
            'info',
            '💡 Completá tu pedido',
            'Descubrí productos complementarios',
            { label: 'Ver más', onClick: scrollToRelated }
          )
        }
      }, 2000)
      
    } catch (error) {
      console.error('AddToCart error:', error)
      showToast(
        'error',
        'Error al agregar al carrito',
        'Por favor, intentá de nuevo'
      )
    } finally {
      setIsAddingToCart(false)
    }
  }, [
    isAddingToCart,
    isOutOfStock,
    product,
    currentPrice,
    originalPrice,
    quantity,
    currentImage,
    images,
    selectedVariant,
    cuotaSeleccionada,
    addItem,
    showToast,
    relatedProducts.length,
    handleViewCart
  ])

  // ✅ SHARE HANDLER CON ANALYTICS
  const handleShare = useCallback(async (platform?: string) => {
    const url = window.location.href
    const text = `${product.name} - ${product.subtitle || ''} | Azul Colchones Villa María`
    
    if (platform === 'copy') {
      try {
        await navigator.clipboard.writeText(url)
        showToast('success', '¡Link copiado!', 'URL copiada al portapapeles')
        setShowShareMenu(false)
        
        // ✅ ANALYTICS - Share event
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'share', {
            method: 'copy_link',
            content_type: 'product',
            item_id: product.id
          })
        }
      } catch (error) {
        showToast('error', 'Error al copiar', 'No se pudo copiar el enlace')
      }
      return
    }
    
    if (platform === 'native' && navigator.share) {
      try {
        await navigator.share({ title: product.name, text, url })
        setShowShareMenu(false)
        
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'share', {
            method: 'native',
            content_type: 'product',
            item_id: product.id
          })
        }
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          if (process.env.NODE_ENV === 'development') {
            console.error('Share error:', error)
          }
        }
      }
      return
    }
    
    const shareUrls: Record<string, string> = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    }
    
    if (platform && shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'noopener,noreferrer')
      setShowShareMenu(false)
      
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'share', {
          method: platform,
          content_type: 'product',
          item_id: product.id
        })
      }
    } else {
      setShowShareMenu(!showShareMenu)
    }
  }, [product, showToast, showShareMenu])

  const handleVariantChange = useCallback((variant: ProductVariant) => {
    setSelectedVariant(variant)
    
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'select_item', {
        item_list_name: 'Product Variants',
        items: [{
          item_id: product.id,
          item_name: product.name,
          item_variant: variant.size
        }]
      })
    }
  }, [product.id, product.name])

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab as TabType)
  }, [])

  // ============================================================================
  // RENDER - MOBILE OPTIMIZED
  // ============================================================================
  
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 overflow-x-hidden scroll-smooth antialiased">
      {/* Background effects - SOLO DESKTOP */}
      <div className="hidden md:block fixed inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent pointer-events-none" aria-hidden="true" />
      <div className="hidden md:block fixed inset-0 bg-[linear-gradient(rgba(59,130,246,.02)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(59,130,246,.02)_1.5px,transparent_1.5px)] bg-[size:64px_64px] pointer-events-none" aria-hidden="true" />

      {/* ✅ ACCESSIBILITY - Skip to content */}
      <a 
        href="#product-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:font-semibold"
      >
        Saltar al contenido principal
      </a>

      {/* ✅ TOAST NOTIFICATION - MOBILE OPTIMIZED */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`fixed top-20 sm:top-24 left-1/2 -translate-x-1/2 z-50 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-2xl border ${
              toast.type === 'success'
                ? 'bg-gradient-to-r from-emerald-600 to-green-600 border-emerald-400/20'
                : toast.type === 'info'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 border-blue-400/20'
                : 'bg-gradient-to-r from-red-600 to-rose-600 border-red-400/20'
            } text-white max-w-[calc(100vw-2rem)] sm:max-w-md w-full backdrop-blur-sm`}
            role="alert"
            aria-live="polite"
          >
            <div className="flex items-start gap-2 sm:gap-3">
              {toast.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 mt-0.5" aria-hidden="true" />
              ) : toast.type === 'info' ? (
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 mt-0.5" aria-hidden="true" />
              ) : (
                <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 mt-0.5" aria-hidden="true" />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm sm:text-base">{toast.message}</p>
                {toast.description && (
                  <p className="text-xs sm:text-sm opacity-90 mt-0.5">{toast.description}</p>
                )}
                {toast.action && (
                  <button
                    onClick={toast.action.onClick}
                    className="mt-2 text-xs sm:text-sm font-semibold underline hover:no-underline inline-flex items-center gap-1 transition-transform hover:translate-x-1"
                  >
                    {toast.action.label} →
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Breadcrumbs productName={product.name} />

      <StickyBar 
        show={showStickyBar}
        product={product}
        currentPrice={currentPrice}
        originalPrice={originalPrice}
        quantity={quantity}
        setQuantity={setQuantity}
        isOutOfStock={isOutOfStock}
        handleAddToCart={handleAddToCart}
        currentImage={currentImage}
      />

      <div 
        id="product-content"
        className="max-w-screen-2xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12 relative z-10" 
        ref={productRef}
      >
        {/* ✅ SOCIAL PROOF BANNER - MOBILE OPTIMIZED */}
        {(recentViewers > 0 || isLowStock) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 sm:mb-6 flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 justify-center"
          >
            {recentViewers > 0 && (
              <div className="bg-blue-600/10 border border-blue-500/20 text-blue-400 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2">
                <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" aria-hidden="true" />
                <span>{recentViewers} personas viendo este producto</span>
              </div>
            )}
            {isLowStock && (
              <div className="bg-orange-600/10 border border-orange-500/20 text-orange-400 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2 animate-pulse">
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" aria-hidden="true" />
                <span>¡Solo quedan {currentStock} unidades!</span>
              </div>
            )}
          </motion.div>
        )}

        {/* Main Grid - MOBILE OPTIMIZED */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-12 sm:mb-16 md:mb-24">
          <ImageGallery
            images={images}
            currentImage={currentImage}
            imageIndex={imageIndex}
            setImageIndex={setImageIndex}
            setShowImageModal={setShowImageModal}
            product={product}
            isFavorite={isFavorite}
            setIsFavorite={setIsFavorite}
            discountPercent={discountPercent}
          />

          <ProductInfo
            product={product}
            averageRatings={averageRatings}
            currentPrice={currentPrice}
            basePrice={basePrice}
            originalPrice={originalPrice}
            savings={savings}
            stockInfo={stockInfo}
            variants={variants}
            selectedVariant={selectedVariant}
            setSelectedVariant={handleVariantChange}
            quantity={quantity}
            setQuantity={setQuantity}
            isOutOfStock={isOutOfStock}
            handleAddToCart={handleAddToCart}
            isFavorite={isFavorite}
            setIsFavorite={setIsFavorite}
            handleShare={handleShare}
            showShareMenu={showShareMenu}
            features={features}
            setActiveTab={handleTabChange}
            todasLasCuotas={todasLasCuotas}
            selectedCuotas={selectedCuotas}
            onCuotasChange={handleCuotasChange}
          />
        </div>

        {/* Tabs Section - MOBILE OPTIMIZED */}
        <section className="border-t border-white/10 py-12 sm:py-16 md:py-24">
          <TabsSection
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            product={enhancedProduct}
            reviews={normalizedReviews}
            averageRatings={averageRatings}
            faqs={faqs}
            expandedFaq={expandedFaq}
            setExpandedFaq={setExpandedFaq}
          />
        </section>

        {/* Related Products - MOBILE OPTIMIZED */}
        {relatedProducts.length > 0 && (
          <section 
            className="border-t border-white/10 py-12 sm:py-16 md:py-24"
            data-related-products
          >
            <RelatedProducts 
              products={relatedProducts}
              title="También te puede interesar"
            />
          </section>
        )}

        {/* ✅ FINAL CTA SECTION - MOBILE OPTIMIZED */}
        {!isOutOfStock && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border-t border-white/10 py-12 sm:py-16 md:py-24"
          >
            <div className="max-w-3xl mx-auto text-center space-y-4 sm:space-y-5 md:space-y-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 px-4">
                ¿Listo para mejorar tu descanso?
              </h2>
              <p className="text-zinc-400 text-base sm:text-lg mb-4 sm:mb-6 px-4">
                Envío gratis Villa María · {product.warranty || 5} años de garantía · Compra segura
              </p>
              
              {/* Trust Badges - MOBILE STACK */}
              <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-zinc-400 mb-6 sm:mb-8 px-4">
                <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg w-full sm:w-auto justify-center">
                  <CreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" aria-hidden="true" />
                  <span>Hasta 12 cuotas sin interés</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg w-full sm:w-auto justify-center">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" aria-hidden="true" />
                  <span>{product.trialNights || 100} noches de prueba</span>
                </div>
              </div>
              
              {/* CTA Button - MOBILE FULL WIDTH */}
              <div className="space-y-3 sm:space-y-4 px-4">
                <button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className="w-full sm:max-w-md sm:mx-auto px-6 sm:px-8 py-4 sm:py-5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-base sm:text-lg rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl shadow-blue-500/25 flex items-center justify-center gap-2 sm:gap-3"
                >
                  <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" aria-hidden="true" />
                  <span>Agregar al carrito</span>
                </button>
                
                {/* Price Display - MOBILE OPTIMIZED */}
                <div className="text-center space-y-0.5 sm:space-y-1">
                  <p className="text-2xl sm:text-3xl font-black text-white">
                    {formatARS(currentPrice * quantity)}
                  </p>
                  {cuotaSeleccionada ? (
                    <p className="text-xs sm:text-sm text-zinc-400">
                      {cuotaSeleccionada.cuotas} cuotas de {cuotaSeleccionada.formatted.precioCuota}
                    </p>
                  ) : (
                    <p className="text-xs sm:text-sm text-emerald-400 font-semibold">
                      Precio de contado · {getTextoPromocional(basePrice)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </div>

      <ImageModal
        isOpen={showImageModal}
        onClose={() => setShowImageModal(false)}
        images={images}
        currentIndex={imageIndex}
        productName={product.name}
      />
    </div>
  )
}