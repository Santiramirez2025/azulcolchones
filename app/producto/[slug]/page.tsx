// app/producto/[slug]/page.tsx - OPTIMIZADO MOBILE-FIRST & PERFORMANCE ✅
import { Suspense } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { 
  getProductBySlug, 
  getRelatedProducts, 
  getSimilarProducts, 
  getPopularProducts 
} from '@/lib/api/products'
import { trackProductView } from '@/lib/analytics'
import { centavosToARS, formatARS } from '@/lib/utils/currency'
import { getMejorCuota, calcularTodasLasCuotas, getTextoPromocional } from '@/lib/utils/pricing'
import ProductClient from './product-client'

type Params = Promise<{ slug: string }>

// ============================================================================
// ✅ CONFIGURACIÓN PARA VERCEL BUILD - CRÍTICO
// ============================================================================
export const revalidate = 3600 // ISR cada 1 hora
export const dynamic = 'force-dynamic' // ✅ Evita errores de DB en build
export const dynamicParams = true // ✅ Permite rutas no pre-generadas

// ============================================================================
// HELPER: CONVERTIR PRECIOS
// ============================================================================
function convertirPreciosProducto(product: any) {
  if (!product) return null
  
  return {
    ...product,
    price: centavosToARS(product.price),
    originalPrice: product.originalPrice ? centavosToARS(product.originalPrice) : null,
    compareAtPrice: product.compareAtPrice ? centavosToARS(product.compareAtPrice) : null,
    shippingCost: product.shippingCost ? centavosToARS(product.shippingCost) : 0,
    variants: product.variants?.map((variant: any) => ({
      ...variant,
      price: centavosToARS(variant.price),
      originalPrice: variant.originalPrice ? centavosToARS(variant.originalPrice) : null,
    })) || [],
  }
}

// ============================================================================
// ✅ STATIC GENERATION - DESHABILITADO PARA BUILD
// ============================================================================
// NOTA: Comentado para evitar conexión a DB durante build en Vercel
// Una vez que el sitio esté live, puedes descomentar esto para mejor performance
/*
export async function generateStaticParams() {
  try {
    const products = await getPopularProducts(10) // Solo los 10 más populares
    return products.map((product) => ({ slug: product.slug }))
  } catch (error) {
    console.warn('⚠️ generateStaticParams skipped:', error)
    return []
  }
}
*/

// ============================================================================
// METADATA GENERATION - SEO OPTIMIZADO VILLA MARÍA
// ============================================================================
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  try {
    const { slug } = await params
    const product = await getProductBySlug(slug)

    if (!product) {
      return {
        title: 'Producto no encontrado | Azul Colchones Villa María',
        description: 'El producto que buscás no está disponible en nuestra colchonería de Villa María, Córdoba',
        robots: { index: false, follow: false },
      }
    }

    const images = Array.isArray(product.images) ? product.images : []
    const imageUrl = images[0] || '/og-default.jpg'
    
    const pricePesos = centavosToARS(product.price)
    const originalPricePesos = product.originalPrice ? centavosToARS(product.originalPrice) : null
    
    const mejorCuota = getMejorCuota(pricePesos)
    
    const savingsAmount = originalPricePesos && originalPricePesos > pricePesos
      ? originalPricePesos - pricePesos
      : 0
    
    const savingsPercentage = savingsAmount > 0 && originalPricePesos
      ? Math.round((savingsAmount / originalPricePesos) * 100)
      : 0

    const priceText = savingsPercentage > 0
      ? `${formatARS(pricePesos)} (${savingsPercentage}% OFF)`
      : formatARS(pricePesos)
    
    const financingText = `${mejorCuota.cuotas} cuotas sin interés`
    const warrantyText = product.warranty ? `${product.warranty} años garantía` : '5 años garantía'

    // ✅ Keywords optimizados para Villa María
    const keywords = [
      product.name,
      `${product.name} Villa María`,
      `${product.name} Córdoba`,
      `${product.name} precio Argentina`,
      `comprar ${product.name} Villa María`,
      `${product.name} en cuotas Villa María`,
      product.category || 'colchón',
      'colchón Villa María',
      'colchonería Villa María',
      'Azul Colchones Villa María',
      'envío gratis Villa María',
    ].filter(Boolean).join(', ')

    // ✅ Meta description optimizada
    const metaDescription = [
      `${product.name} en Villa María`,
      priceText,
      savingsPercentage >= 20 ? `${savingsPercentage}% OFF` : null,
      financingText,
      `⭐ ${product.rating}/5`,
      'Envío GRATIS Villa María',
      warrantyText,
    ].filter(Boolean).join(' · ').substring(0, 155)

    const seoTitle = `${product.name} - ${priceText} | Azul Colchones Villa María`.substring(0, 60)

    return {
      title: seoTitle,
      description: metaDescription,
      keywords,
      
      openGraph: {
        title: `${product.name} - ${priceText}`,
        description: metaDescription,
        url: `https://azulcolchones.com/producto/${slug}`,
        siteName: 'Azul Colchones Villa María',
        locale: 'es_AR',
        type: 'website',
        images: images.map((img, index) => ({
          url: img,
          width: 1200,
          height: 630,
          alt: `${product.name} - Azul Colchones Villa María - Vista ${index + 1}`,
        })),
      },
      
      twitter: {
        card: 'summary_large_image',
        title: seoTitle,
        description: metaDescription,
        images: [imageUrl],
      },
      
      robots: { 
        index: Boolean(product.isActive && product.inStock), 
        follow: true,
      },
      
      alternates: { 
        canonical: `https://azulcolchones.com/producto/${slug}`,
      },

      other: {
        'product:price:amount': pricePesos.toString(),
        'product:price:currency': 'ARS',
        'product:availability': product.inStock ? 'in stock' : 'out of stock',
        'product:condition': 'new',
        'product:brand': 'Piero',
        'theme-color': '#3b82f6',
      },
    }
  } catch (error) {
    console.error('❌ Error generating metadata:', error)
    return {
      title: 'Error | Azul Colchones Villa María',
      description: 'Ha ocurrido un error al cargar el producto',
      robots: { index: false, follow: false },
    }
  }
}

// ============================================================================
// SCHEMAS JSON-LD - VILLA MARÍA
// ============================================================================
function generateProductSchema(product: any) {
  const images = Array.isArray(product.images) ? product.images : []
  const pricePesos = centavosToARS(product.price)

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.subtitle || product.description || product.name,
    image: images,
    sku: product.sku || product.id,
    brand: {
      '@type': 'Brand',
      name: 'Piero',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'ARS',
      price: pricePesos.toFixed(2),
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'Azul Colchones',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Balerdi 855',
          addressLocality: 'Villa María',
          addressRegion: 'Córdoba',
          postalCode: '5900',
          addressCountry: 'AR'
        }
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0',
          currency: 'ARS'
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'AR',
          addressRegion: 'Córdoba'
        }
      }
    },
    aggregateRating: product.reviewCount > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: product.rating || 4.8,
      reviewCount: product.reviewCount,
    } : undefined,
  }
}

function generateBreadcrumbSchema(product: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { 
        '@type': 'ListItem', 
        position: 1, 
        name: 'Inicio', 
        item: 'https://azulcolchones.com' 
      },
      { 
        '@type': 'ListItem', 
        position: 2, 
        name: product.category || 'Productos', 
        item: 'https://azulcolchones.com/catalogo' 
      },
      { 
        '@type': 'ListItem', 
        position: 3, 
        name: product.name, 
        item: `https://azulcolchones.com/producto/${product.slug}` 
      }
    ]
  }
}

// ============================================================================
// SKELETON - MOBILE OPTIMIZADO
// ============================================================================
function ProductPageSkeleton() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 overflow-x-hidden antialiased">
      {/* Background effects - SOLO DESKTOP */}
      <div className="hidden md:block fixed inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent pointer-events-none" aria-hidden="true" />
      <div className="hidden md:block fixed inset-0 bg-[linear-gradient(rgba(59,130,246,.02)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(59,130,246,.02)_1.5px,transparent_1.5px)] bg-[size:64px_64px] pointer-events-none" aria-hidden="true" />
      
      <div className="max-w-[1700px] mx-auto px-3 sm:px-4 md:px-6 lg:px-12 xl:px-20 relative z-10">
        {/* Breadcrumbs - MOBILE RESPONSIVE */}
        <div className="py-3 sm:py-4 md:py-6">
          <div className="flex items-center gap-1.5 sm:gap-2 animate-pulse">
            <div className="h-3 sm:h-4 w-12 sm:w-16 bg-blue-500/20 rounded" />
            <div className="h-3 sm:h-4 w-3 sm:w-4 bg-blue-500/10 rounded" />
            <div className="h-3 sm:h-4 w-20 sm:w-24 bg-blue-500/20 rounded" />
          </div>
        </div>

        {/* Main Content - MOBILE FIRST GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 py-6 sm:py-8 md:py-12">
          {/* Gallery - MOBILE OPTIMIZED */}
          <div className="space-y-3 sm:space-y-4 animate-pulse">
            <div className="aspect-square w-full bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl sm:rounded-2xl border border-blue-500/20" />
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-blue-500/10 border border-blue-500/20 rounded-lg" />
              ))}
            </div>
          </div>

          {/* Info - MOBILE OPTIMIZED */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6 animate-pulse">
            <div className="h-6 sm:h-7 md:h-8 bg-blue-500/20 rounded-lg w-3/4" />
            
            {/* Price Box */}
            <div className="space-y-2 sm:space-y-3 p-4 sm:p-5 md:p-6 bg-blue-500/5 border border-blue-500/20 rounded-xl sm:rounded-2xl">
              <div className="h-10 sm:h-11 md:h-12 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg w-2/3" />
              <div className="h-3 sm:h-4 bg-blue-500/10 rounded w-1/2" />
            </div>
            
            {/* Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="h-12 sm:h-13 md:h-14 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl" />
              <div className="h-12 sm:h-13 md:h-14 bg-blue-500/10 rounded-xl" />
            </div>

            {/* Features */}
            <div className="space-y-2 sm:space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-white/5 rounded-lg">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 bg-blue-500/20 rounded-full flex-shrink-0" />
                  <div className="h-3 sm:h-4 bg-blue-500/10 rounded flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// MAIN PAGE - OPTIMIZADO
// ============================================================================
export default async function ProductPage({ params }: { params: Params }) {
  try {
    const { slug } = await params
    const productRaw = await getProductBySlug(slug)
    
    if (!productRaw) notFound()

    const product = convertirPreciosProducto(productRaw)

    // ✅ Track view async (no bloquea render)
    void trackProductView(product.id, {
      productId: product.id,
      productName: product.name,
      price: product.price,
      category: product.category
    })

    // ✅ Parallel fetching con fallback
    const [relatedProductsRaw, similarProductsRaw] = await Promise.allSettled([
      getRelatedProducts(product.id, product.category, 4),
      getSimilarProducts(product.id, product.category, 4),
    ]).then(results => [
      results[0].status === 'fulfilled' ? results[0].value : [],
      results[1].status === 'fulfilled' ? results[1].value : [],
    ])

    const relatedProducts = relatedProductsRaw.map(convertirPreciosProducto).filter(Boolean)
    const similarProducts = similarProductsRaw.map(convertirPreciosProducto).filter(Boolean)

    // ✅ Stock info normalizado
    const stockInfo = {
      available: product.inStock ?? false,
      quantity: product.stock ?? 0,
      lowStock: (product.stock ?? 0) < 10,
      availableVariantsCount: product.variants?.filter((v: any) => v.stock > 0).length || 0,
      totalVariantsCount: product.variants?.length || 0,
    }

    // ✅ Breadcrumbs
    const breadcrumbs = [
      { name: 'Inicio', href: '/', current: false },
      { name: product.category || 'Productos', href: '/catalogo', current: false },
      { name: product.name, href: `/producto/${slug}`, current: true }
    ]

    // ✅ Schemas
    const productSchema = generateProductSchema(productRaw)
    const breadcrumbSchema = generateBreadcrumbSchema(product)

    return (
      <>
        {/* JSON-LD Schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
          key="product-schema"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
          key="breadcrumb-schema"
        />

        {/* Main Container - MOBILE OPTIMIZED */}
        <div className="min-h-screen w-full bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 overflow-x-hidden scroll-smooth antialiased relative">
          {/* Background effects - SOLO DESKTOP */}
          <div className="hidden md:block fixed inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent pointer-events-none" aria-hidden="true" />
          <div className="hidden md:block fixed inset-0 bg-[linear-gradient(rgba(59,130,246,.02)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(59,130,246,.02)_1.5px,transparent_1.5px)] bg-[size:64px_64px] pointer-events-none" aria-hidden="true" />

          <Suspense fallback={<ProductPageSkeleton />}>
            <div className="w-full max-w-[1920px] mx-auto px-0 sm:px-3 md:px-4 lg:px-6 py-4 sm:py-6 md:py-10 relative z-10">
              <ProductClient
                product={product}
                relatedProducts={relatedProducts}
                similarProducts={similarProducts}
                reviews={[]}
                stockInfo={stockInfo}
                breadcrumbs={breadcrumbs}
              />
            </div>
          </Suspense>
        </div>
      </>
    )
  } catch (error) {
    console.error('❌ Error loading product page:', error)
    notFound()
  }
}