// app/catalogo/page.tsx - ULTRA OPTIMIZED ⚡ - Azul Colchones
import { Suspense } from 'react'
import type { Metadata } from 'next'
import { getProducts } from '@/lib/api/products'
import { centavosToARS } from '@/lib/utils/currency'
import CatalogoClient from './catalogo-client'
import { NormalizedProduct } from './components/types'

// ============================================================================
// METADATA - SEO EXHAUSTIVO 🎯
// ============================================================================

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://azulcolchones.com'

export const metadata: Metadata = {
  title: 'Catálogo de Colchones Villa María | Envío GRATIS 24-48hs | 12 Cuotas',
  description: '🛏️ Colchones premium en Villa María, Córdoba. ✅ Envío GRATIS 24-48hs ✅ Hasta 12 cuotas sin interés ✅ Todas las medidas ✅ Stock disponible ✅ Garantía extendida. 35+ años de experiencia. Comprá tu colchón ideal.',
  
  keywords: [
    // === CORE LOCAL ===
    'colchones villa maría',
    'catálogo colchones villa maría',
    'tienda colchones villa maría',
    'comprar colchones villa maría',
    'precios colchones villa maría',
    
    // === REGIONAL ===
    'colchones córdoba',
    'catálogo colchones córdoba',
    'colchones premium córdoba',
    
    // === PRODUCTOS ESPECÍFICOS ===
    'colchón matrimonial villa maría',
    'colchón queen villa maría',
    'colchón king villa maría',
    'colchón 1 plaza villa maría',
    'colchón 2 plazas villa maría',
    'sommier villa maría',
    
    // === MATERIALES ===
    'colchones memory foam villa maría',
    'colchones resortes villa maría',
    'colchones pocket villa maría',
    'colchones viscoelásticos villa maría',
    'colchones ortopédicos villa maría',
    
    // === BENEFICIOS (Purchase Intent) ===
    'colchones envío gratis villa maría',
    'colchones 12 cuotas villa maría',
    'colchones cuotas sin interés',
    'ofertas colchones villa maría',
    'promociones colchones córdoba',
    'colchones stock disponible',
    
    // === LONG TAIL ===
    'mejor catálogo colchones villa maría',
    'donde comprar colchones baratos villa maría',
    'colchones calidad precio villa maría',
    'tienda colchones online villa maría',
    'catálogo completo colchones córdoba',
  ].join(', '),
  
  openGraph: {
    title: '🛏️ Catálogo Completo | Azul Colchones Villa María',
    description: 'Todas las medidas | Envío GRATIS 24-48hs | 12 cuotas | Stock disponible',
    type: 'website',
    locale: 'es_AR',
    url: `${BASE_URL}/catalogo`,
    siteName: 'Azul Colchones Villa María',
    images: [
      {
        url: `${BASE_URL}/og-catalogo.jpg`,
        width: 1200,
        height: 630,
        alt: 'Catálogo de Colchones - Azul Colchones Villa María',
      }
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: '🛏️ Catálogo Completo - Azul Colchones',
    description: 'Envío GRATIS | 12 cuotas | Stock disponible',
    images: [`${BASE_URL}/twitter-catalogo.jpg`],
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  alternates: {
    canonical: `${BASE_URL}/catalogo`,
  },
  
  other: {
    'product:availability': 'in stock',
    'product:condition': 'new',
    'product:price:currency': 'ARS',
  },
}

// ✅ ISR: Regenerate every 1 hour
export const revalidate = 3600

// ✅ Dynamic rendering
export const dynamic = 'force-dynamic'

// ============================================================================
// STRUCTURED DATA - CATALOG PAGE 🎯
// ============================================================================

const catalogStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Catálogo de Colchones - Azul Colchones Villa María',
  description: 'Colección completa de colchones premium con envío gratis en Villa María',
  url: `${BASE_URL}/catalogo`,
  provider: {
    '@type': 'LocalBusiness',
    name: 'Azul Colchones',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Balerdi 855',
      addressLocality: 'Villa María',
      addressRegion: 'Córdoba',
      postalCode: '5900',
      addressCountry: 'AR'
    },
    telephone: '+54-9-353-4017332',
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: BASE_URL
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Catálogo',
        item: `${BASE_URL}/catalogo`
      }
    ]
  }
}

// ============================================================================
// ICONOS INLINE SVG (optimizados)
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
// LOADING SKELETON - OPTIMIZADO
// ============================================================================

function CatalogoLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 overflow-x-hidden">
      {/* Background effects - SOLO DESKTOP */}
      <div className="hidden md:block absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent pointer-events-none" aria-hidden="true" />
      <div className="hidden md:block absolute inset-0 bg-[linear-gradient(rgba(59,130,246,.02)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(59,130,246,.02)_1.5px,transparent_1.5px)] bg-[size:64px_64px] pointer-events-none" aria-hidden="true" />

      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-24">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 rounded-full mb-4 sm:mb-5 md:mb-6 lg:mb-8 animate-pulse backdrop-blur-sm">
            <Icons.Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-blue-400 flex-shrink-0" />
            <span className="text-[10px] sm:text-xs md:text-sm font-bold text-blue-300">
              Cargando catálogo premium...
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-2 sm:mb-3 md:mb-4 leading-tight">
            Nuestros{' '}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300 bg-clip-text text-transparent">
              Colchones
            </span>
          </h1>
          
          <p className="text-zinc-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            Villa María, Córdoba 🇦🇷
          </p>
        </div>

        {/* Skeleton Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-full animate-pulse">
              <div className="w-full bg-white/5 border border-blue-500/20 rounded-2xl md:rounded-3xl overflow-hidden shadow-xl backdrop-blur-sm">
                <div className="w-full aspect-square bg-gradient-to-br from-blue-500/10 to-cyan-500/10 relative">
                  <div className="absolute top-3 left-3 right-3 flex justify-between">
                    <div className="h-6 w-20 bg-blue-500/20 rounded-lg" />
                    <div className="h-6 w-6 bg-blue-500/20 rounded-lg" />
                  </div>
                </div>
                
                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  <div className="space-y-2">
                    <div className="h-5 sm:h-6 bg-blue-500/20 rounded-lg w-3/4" />
                    <div className="h-3 sm:h-4 bg-blue-500/10 rounded w-1/2" />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="h-8 sm:h-10 bg-blue-500/20 rounded-lg w-24" />
                    <div className="h-6 sm:h-8 bg-blue-500/10 rounded w-16" />
                  </div>
                  
                  <div className="pt-2">
                    <div className="h-12 sm:h-14 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl w-full" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Loading indicator */}
        <div className="flex items-center justify-center gap-2 mt-10 sm:mt-12 text-blue-400">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// EMPTY STATE - OPTIMIZADO
// ============================================================================

function EmptyState() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center relative overflow-x-hidden">
      <div className="hidden md:block absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent pointer-events-none" aria-hidden="true" />
      <div className="hidden md:block absolute inset-0 bg-[linear-gradient(rgba(59,130,246,.02)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(59,130,246,.02)_1.5px,transparent_1.5px)] bg-[size:64px_64px] pointer-events-none" aria-hidden="true" />
      
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24 relative z-10">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-500 mb-6 sm:mb-8 shadow-2xl shadow-blue-500/50">
            <Icons.Zap className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3 sm:mb-4 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300 bg-clip-text text-transparent">
              Catálogo en construcción
            </span>
          </h1>
          
          <p className="text-zinc-400 text-base sm:text-lg mb-6 sm:mb-8 max-w-md mx-auto leading-relaxed">
            Estamos preparando nuestra colección premium de colchones. Volvé pronto.
          </p>
          
          <div className="w-full max-w-md mx-auto bg-white/5 border border-blue-500/20 rounded-2xl p-4 sm:p-6 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-3">
              <Icons.Package className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <p className="text-zinc-300 text-sm font-bold">
                💡 Desarrolladores: Ejecutá el seed
              </p>
            </div>
            <code className="text-blue-400 font-mono text-xs sm:text-sm break-all block bg-zinc-900/50 p-3 rounded-lg border border-blue-500/20">
              npm run db:seed
            </code>
          </div>

          <div className="mt-8 p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl backdrop-blur-sm max-w-sm mx-auto">
            <p className="text-zinc-400 text-sm">
              📍 <span className="text-white font-semibold">Villa María, Córdoba</span> 🇦🇷
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// ✅ FUNCIÓN DE ORDENAMIENTO PERSONALIZADO
// ============================================================================
function sortProducts(products: any[]): any[] {
  return [...products].sort((a, b) => {
    // 1️⃣ PRIORIDAD MÁXIMA: Colchones Piero
    const aIsPiero = a.name.toLowerCase().includes('piero')
    const bIsPiero = b.name.toLowerCase().includes('piero')
    
    if (aIsPiero && !bIsPiero) return -1
    if (!aIsPiero && bIsPiero) return 1
    
    // 2️⃣ SEGUNDA PRIORIDAD: Otros colchones (excepto cuna)
    const aIsColchon = (
      a.name.toLowerCase().includes('colchón') || 
      a.name.toLowerCase().includes('colchon')
    ) && !a.name.toLowerCase().includes('cuna')
    
    const bIsColchon = (
      b.name.toLowerCase().includes('colchón') || 
      b.name.toLowerCase().includes('colchon')
    ) && !b.name.toLowerCase().includes('cuna')
    
    if (aIsColchon && !bIsColchon) return -1
    if (!aIsColchon && bIsColchon) return 1
    
    // 3️⃣ TERCERA PRIORIDAD: Stock total disponible
    const aStock = a.variants?.reduce((sum: number, v: any) => sum + (v.stock || 0), 0) || 0
    const bStock = b.variants?.reduce((sum: number, v: any) => sum + (v.stock || 0), 0) || 0
    
    if (aStock !== bStock) return bStock - aStock
    
    // 4️⃣ ÚLTIMA PRIORIDAD: Orden alfabético
    return a.name.localeCompare(b.name, 'es')
  })
}

// ============================================================================
// MAIN PAGE COMPONENT - ULTRA OPTIMIZED ⚡
// ============================================================================

export default async function CatalogoPage() {
  try {
    // ✅ Fetch products from API (with error handling)
    const { data: products, total } = await getProducts().catch(() => ({ data: [], total: 0 }))

    // Handle empty state
    if (!products || products.length === 0) {
      return <EmptyState />
    }

    // ✅ ORDENAR PRODUCTOS ANTES DE CONVERTIR PRECIOS
    const sortedProducts = sortProducts(products)

    // ✅ CONVERSIÓN OPTIMIZADA DE PRECIOS
    const productsWithPrices: NormalizedProduct[] = sortedProducts.map((product: any) => ({
      ...product,
      // Convert product prices
      price: centavosToARS(product.price),
      originalPrice: product.originalPrice ? centavosToARS(product.originalPrice) : null,
      compareAtPrice: product.compareAtPrice ? centavosToARS(product.compareAtPrice) : null,
      shippingCost: centavosToARS(product.shippingCost || 0),
      
      // Convert variant prices if exist
      ...(product.variants?.length > 0 && {
        variants: product.variants.map((variant: any) => ({
          ...variant,
          price: centavosToARS(variant.price),
          originalPrice: variant.originalPrice ? centavosToARS(variant.originalPrice) : null,
        }))
      })
    }))

    return (
      <>
        {/* ✅ STRUCTURED DATA - SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(catalogStructuredData)
          }}
        />

        {/* ✅ PRODUCT LIST STRUCTURED DATA */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              numberOfItems: productsWithPrices.length,
              itemListElement: productsWithPrices.slice(0, 10).map((product, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: {
                  '@type': 'Product',
                  name: product.name,
                  description: product.description,
                  image: product.images?.[0] || `${BASE_URL}/placeholder.jpg`,
                  url: `${BASE_URL}/producto/${product.slug}`,
                  offers: {
                    '@type': 'Offer',
                    price: product.price,
                    priceCurrency: 'ARS',
                    availability: 'https://schema.org/InStock',
                    seller: {
                      '@type': 'Organization',
                      name: 'Azul Colchones'
                    }
                  }
                }
              }))
            })
          }}
        />

        <Suspense fallback={<CatalogoLoading />}>
          <CatalogoClient 
            initialProducts={productsWithPrices}
            totalProducts={total}
          />
        </Suspense>
      </>
    )
  } catch (error) {
    // ✅ ERROR HANDLING
    console.error('❌ [CATALOG] Error loading catalog:', error)
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center overflow-x-hidden">
        <div className="w-full max-w-md mx-auto px-4 text-center">
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