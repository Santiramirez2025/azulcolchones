// app/catalogo/page.tsx - ✅ OPTIMIZADO MOBILE-FIRST
import { Suspense } from 'react'
import type { Metadata } from 'next'
import { getProducts } from '@/lib/api/products'
import { centavosToARS } from '@/lib/utils/currency'
import CatalogoClient from './catalogo-client'
import { NormalizedProduct } from './components/types'

// ============================================================================
// METADATA - SEO OPTIMIZADO
// ============================================================================

export const metadata: Metadata = {
  title: 'Catálogo de Colchones Premium | Azul Colchones Villa María',
  description: 'Descubrí nuestra colección exclusiva de colchones premium en Villa María, Córdoba. ✓ Tecnología de última generación ✓ Envío GRATIS ✓ 12 cuotas sin interés ✓ Garantía extendida. Tu colchonería de confianza.',
  keywords: [
    'catálogo colchones villa maría',
    'colchones premium córdoba',
    'comprar colchones villa maría',
    'precios colchones villa maría',
    'ofertas colchones córdoba',
    'tienda colchones villa maría',
  ],
  openGraph: {
    title: 'Catálogo de Colchones Premium | Azul Colchones',
    description: 'Colchones premium con envío gratis en Villa María. 12 cuotas sin interés.',
    type: 'website',
    locale: 'es_AR',
  },
  alternates: {
    canonical: 'https://azulcolchones.com/catalogo',
  },
}

export const dynamic = 'force-dynamic'
export const revalidate = 3600 // Revalidar cada hora

// ============================================================================
// ICONOS INLINE SVG
// ============================================================================

const Icons = {
  Sparkles: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  Zap: ({ className = "w-8 h-8" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  Package: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),
}

// ============================================================================
// LOADING SKELETON - MOBILE OPTIMIZADO
// ============================================================================

function CatalogoLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
      {/* Background effects - SOLO DESKTOP */}
      <div className="hidden md:block absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent pointer-events-none" aria-hidden="true" />
      <div className="hidden md:block absolute inset-0 bg-[linear-gradient(rgba(59,130,246,.02)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(59,130,246,.02)_1.5px,transparent_1.5px)] bg-[size:64px_64px] pointer-events-none" aria-hidden="true" />

      <div className="max-w-screen-2xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-24">
        {/* Header Section - MOBILE OPTIMIZADO */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 rounded-full mb-4 sm:mb-5 md:mb-6 lg:mb-8 animate-pulse backdrop-blur-sm">
            <Icons.Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-blue-400 flex-shrink-0" />
            <span className="text-[10px] sm:text-xs md:text-sm font-bold text-blue-300">
              Cargando catálogo premium...
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-2 sm:mb-3 md:mb-4 leading-tight px-4">
            Nuestros{' '}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300 bg-clip-text text-transparent">
              Colchones
            </span>
          </h1>
          
          <p className="text-zinc-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
            Villa María, Córdoba 🇦🇷
          </p>
        </div>

        {/* Skeleton Grid - RESPONSIVE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-white/5 border border-blue-500/20 rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-xl backdrop-blur-sm">
                {/* Image Skeleton */}
                <div className="aspect-square bg-gradient-to-br from-blue-500/10 to-cyan-500/10 relative">
                  <div className="absolute top-2 sm:top-3 left-2 sm:left-3 right-2 sm:right-3 flex justify-between">
                    <div className="h-5 sm:h-6 w-16 sm:w-20 bg-blue-500/20 rounded-lg" />
                    <div className="h-5 sm:h-6 w-5 sm:w-6 bg-blue-500/20 rounded-lg" />
                  </div>
                </div>
                
                {/* Content Skeleton */}
                <div className="p-3 sm:p-4 md:p-6 space-y-2 sm:space-y-3 md:space-y-4">
                  <div className="space-y-1.5 sm:space-y-2">
                    <div className="h-4 sm:h-5 md:h-6 bg-blue-500/20 rounded-lg w-3/4" />
                    <div className="h-3 sm:h-3 md:h-4 bg-blue-500/10 rounded w-1/2" />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="h-7 sm:h-8 md:h-10 bg-blue-500/20 rounded-lg w-20 sm:w-24" />
                    <div className="h-5 sm:h-6 md:h-8 bg-blue-500/10 rounded w-14 sm:w-16" />
                  </div>
                  
                  <div className="pt-2">
                    <div className="h-10 sm:h-12 md:h-14 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg sm:rounded-xl w-full" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Loading indicator - RESPONSIVE */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-8 sm:mt-10 md:mt-12 text-blue-400">
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// EMPTY STATE - MOBILE OPTIMIZADO
// ============================================================================

function EmptyState() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center relative">
      {/* Background effects - SOLO DESKTOP */}
      <div className="hidden md:block absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent pointer-events-none" aria-hidden="true" />
      <div className="hidden md:block absolute inset-0 bg-[linear-gradient(rgba(59,130,246,.02)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(59,130,246,.02)_1.5px,transparent_1.5px)] bg-[size:64px_64px] pointer-events-none" aria-hidden="true" />
      
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24 relative z-10">
        <div className="text-center max-w-2xl mx-auto">
          {/* Icon - RESPONSIVE */}
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-500 mb-4 sm:mb-6 md:mb-8 shadow-2xl shadow-blue-500/50">
            <Icons.Zap className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
          </div>
          
          {/* Title - RESPONSIVE */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-2 sm:mb-3 md:mb-4 leading-tight px-4">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300 bg-clip-text text-transparent">
              Catálogo en construcción
            </span>
          </h1>
          
          {/* Description - RESPONSIVE */}
          <p className="text-zinc-400 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 md:mb-8 max-w-md mx-auto leading-relaxed px-4">
            Estamos preparando nuestra colección premium de colchones. Volvé pronto.
          </p>
          
          {/* Dev Instructions - RESPONSIVE */}
          <div className="inline-block bg-white/5 border border-blue-500/20 rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 backdrop-blur-sm max-w-md mx-auto">
            <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
              <Icons.Package className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0" />
              <p className="text-zinc-300 text-xs sm:text-sm font-bold">
                💡 Desarrolladores: Ejecutá el seed
              </p>
            </div>
            <code className="text-blue-400 font-mono text-[10px] sm:text-xs md:text-sm break-all block bg-zinc-900/50 p-2 sm:p-3 rounded-lg border border-blue-500/20">
              npm run db:seed
            </code>
          </div>

          {/* Location Badge - RESPONSIVE */}
          <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl backdrop-blur-sm max-w-sm mx-auto">
            <p className="text-zinc-400 text-xs sm:text-sm">
              📍 <span className="text-white font-semibold">Villa María, Córdoba</span> 🇦🇷
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default async function CatalogoPage() {
  try {
    // Fetch products from API
    const { data: products, total } = await getProducts()

    // Handle empty state
    if (!products || products.length === 0) {
      return <EmptyState />
    }

    // ✅ CONVERSIÓN COMPLETA DE PRECIOS (PRODUCTO + VARIANTS)
    console.log('🔄 Converting prices for', products.length, 'products')
    
    const productsWithPrices: NormalizedProduct[] = (products as any[]).map((product: any) => {
      // Log para debugging en desarrollo
      if (process.env.NODE_ENV === 'development') {
        console.log(`  📦 ${product.name}`)
        console.log(`    - Product price (centavos): ${product.price}`)
      }
      
      return {
        ...product,
        // ✅ Convertir precios del producto principal
        price: centavosToARS(product.price),
        originalPrice: product.originalPrice ? centavosToARS(product.originalPrice) : null,
        compareAtPrice: product.compareAtPrice ? centavosToARS(product.compareAtPrice) : null,
        shippingCost: centavosToARS(product.shippingCost || 0),
        
        // ✅ Convertir precios de variants SI EXISTEN
        ...(product.variants && product.variants.length > 0 && {
          variants: product.variants.map((variant: any) => ({
            ...variant,
            price: centavosToARS(variant.price),
            originalPrice: variant.originalPrice ? centavosToARS(variant.originalPrice) : null,
          }))
        })
      }
    })

    // Log de confirmación
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ Products with converted prices:', productsWithPrices.length)
      if (productsWithPrices.length > 0) {
        console.log('✅ Sample product:', {
          name: productsWithPrices[0].name,
          price: productsWithPrices[0].price
        })
      }
    }

    return (
      <Suspense fallback={<CatalogoLoading />}>
        <CatalogoClient 
          initialProducts={productsWithPrices}
          totalProducts={total}
        />
      </Suspense>
    )
  } catch (error) {
    // Error handling
    console.error('❌ Error loading catalog:', error)
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-red-500/10 border border-red-500/20 mb-6">
            <Icons.Zap className="w-8 h-8 text-red-400" />
          </div>
          
          <h1 className="text-2xl md:text-3xl font-black text-white mb-3">
            Error al cargar el catálogo
          </h1>
          
          <p className="text-zinc-400 text-sm md:text-base mb-6">
            Ocurrió un problema al cargar los productos. Por favor, intentá nuevamente.
          </p>
          
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl font-bold text-sm transition-all hover:scale-105 active:scale-95"
          >
            Reintentar
          </button>
        </div>
      </div>
    )
  }
}