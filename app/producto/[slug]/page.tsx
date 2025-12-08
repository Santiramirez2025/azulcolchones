// app/producto/[slug]/page.tsx - BUILD OPTIMIZADO ✅
import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
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
// METADATA GENERATION - SEO OPTIMIZADO
// ============================================================================
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  try {
    const { slug } = await params
    const product = await getProductBySlug(slug)

    if (!product) {
      return {
        title: 'Producto no encontrado | Azul Colchones',
        description: 'El producto que buscás no está disponible',
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

    const keywords = [
      product.name,
      `${product.name} precio Argentina`,
      `comprar ${product.name}`,
      `${product.name} Villa María`,
      `${product.name} en cuotas`,
      product.category || 'colchón',
      'colchón Villa María',
      'Piero colchones',
    ].filter(Boolean).join(', ')

    const metaDescription = [
      `${product.name} - ${priceText}`,
      savingsPercentage >= 20 ? `${savingsPercentage}% OFF` : null,
      `${financingText}`,
      `⭐ ${product.rating}/5`,
      'Envío gratis',
      warrantyText,
    ].filter(Boolean).join(' · ').substring(0, 155)

    const seoTitle = `${product.name} - ${priceText} | Azul Colchones`.substring(0, 60)

    return {
      title: seoTitle,
      description: metaDescription,
      keywords,
      
      openGraph: {
        title: `${product.name} - ${priceText}`,
        description: metaDescription,
        url: `https://azulcolchones.com.ar/producto/${slug}`,
        siteName: 'Azul Colchones',
        locale: 'es_AR',
        type: 'website',
        images: images.map((img, index) => ({
          url: img,
          width: 1200,
          height: 630,
          alt: `${product.name} - Vista ${index + 1}`,
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
        canonical: `https://azulcolchones.com.ar/producto/${slug}`,
      },

      other: {
        'product:price:amount': pricePesos.toString(),
        'product:price:currency': 'ARS',
        'product:availability': product.inStock ? 'in stock' : 'out of stock',
        'theme-color': '#3b82f6',
      },
    }
  } catch (error) {
    console.error('❌ Error generating metadata:', error)
    return {
      title: 'Error | Azul Colchones',
      description: 'Ha ocurrido un error',
      robots: { index: false, follow: false },
    }
  }
}

// ============================================================================
// SCHEMAS JSON-LD
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
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://azulcolchones.com.ar' },
      { '@type': 'ListItem', position: 2, name: product.category || 'Productos', item: 'https://azulcolchones.com.ar/catalogo' },
      { '@type': 'ListItem', position: 3, name: product.name, item: `https://azulcolchones.com.ar/producto/${product.slug}` }
    ]
  }
}

// ============================================================================
// SKELETON
// ============================================================================
function ProductPageSkeleton() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 overflow-x-hidden antialiased">
      <div className="fixed inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent pointer-events-none" />
      <div className="fixed inset-0 bg-[linear-gradient(rgba(59,130,246,.02)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(59,130,246,.02)_1.5px,transparent_1.5px)] bg-[size:64px_64px] pointer-events-none" />
      
      <div className="max-w-[1700px] mx-auto px-2 sm:px-4 lg:px-12 xl:px-[80px] relative z-10">
        <div className="py-4 md:py-6">
          <div className="flex items-center gap-2 animate-pulse">
            <div className="h-4 w-16 bg-blue-500/20 rounded" />
            <div className="h-4 w-4 bg-blue-500/10 rounded" />
            <div className="h-4 w-24 bg-blue-500/20 rounded" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 py-8 md:py-12">
          <div className="space-y-4 animate-pulse">
            <div className="aspect-square w-full bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl border border-blue-500/20" />
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-blue-500/10 border border-blue-500/20 rounded-lg" />
              ))}
            </div>
          </div>

          <div className="space-y-6 animate-pulse">
            <div className="h-8 bg-blue-500/20 rounded-lg w-3/4" />
            <div className="space-y-3 p-6 bg-blue-500/5 border border-blue-500/20 rounded-2xl">
              <div className="h-12 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg w-2/3" />
              <div className="h-4 bg-blue-500/10 rounded w-1/2" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-14 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl" />
              <div className="h-14 bg-blue-500/10 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// MAIN PAGE
// ============================================================================
export default async function ProductPage({ params }: { params: Params }) {
  try {
    const { slug } = await params
    const productRaw = await getProductBySlug(slug)
    
    if (!productRaw) notFound()

    const product = convertirPreciosProducto(productRaw)

    void trackProductView(product.id, {
      productId: product.id,
      productName: product.name,
      price: product.price,
      category: product.category
    })

    const [relatedProductsRaw, similarProductsRaw] = await Promise.allSettled([
      getRelatedProducts(product.id, product.category, 4),
      getSimilarProducts(product.id, product.category, 4),
    ]).then(results => [
      results[0].status === 'fulfilled' ? results[0].value : [],
      results[1].status === 'fulfilled' ? results[1].value : [],
    ])

    const relatedProducts = relatedProductsRaw.map(convertirPreciosProducto).filter(Boolean)
    const similarProducts = similarProductsRaw.map(convertirPreciosProducto).filter(Boolean)

    const stockInfo = {
      available: product.inStock ?? false,
      quantity: product.stock ?? 0,
      lowStock: (product.stock ?? 0) < 10,
      availableVariantsCount: product.variants?.filter((v: any) => v.stock > 0).length || 0,
      totalVariantsCount: product.variants?.length || 0,
    }

    const breadcrumbs = [
      { name: 'Inicio', href: '/', current: false },
      { name: product.category || 'Productos', href: '/catalogo', current: false },
      { name: product.name, href: `/producto/${slug}`, current: true }
    ]

    const productSchema = generateProductSchema(productRaw)
    const breadcrumbSchema = generateBreadcrumbSchema(product)

    return (
      <>
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

        <div className="min-h-screen w-full bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 overflow-x-hidden scroll-smooth antialiased relative">
          <div className="fixed inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent pointer-events-none" />
          <div className="fixed inset-0 bg-[linear-gradient(rgba(59,130,246,.02)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(59,130,246,.02)_1.5px,transparent_1.5px)] bg-[size:64px_64px] pointer-events-none" />

          <Suspense fallback={<ProductPageSkeleton />}>
            <div className="w-full max-w-[1920px] mx-auto px-0 md:px-4 lg:px-6 py-6 md:py-10 relative z-10">
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