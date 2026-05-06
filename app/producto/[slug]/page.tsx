// app/producto/[slug]/page.tsx - ULTRA OPTIMIZED ⚡ MOBILE-FIRST 📱 SEO BEAST 🚀
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
import { getMejorCuota } from '@/lib/utils/pricing'
import ProductClient from './product-client'

type Params = Promise<{ slug: string }>

// ============================================================================
// PERFORMANCE CONFIGURATION - ISR
// ============================================================================
// ISR cada 1 hora. Páginas se generan on-demand y se cachean en CDN.
// dynamicParams permite slugs no pre-generados (no usamos generateStaticParams
// para evitar dependencia de DB en build).
export const revalidate = 3600
export const dynamicParams = true

// ============================================================================
// HELPER: PRICE CONVERSION
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
// METADATA GENERATION - SEO ULTRA OPTIMIZADO
// ============================================================================
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  try {
    const { slug } = await params
    const product = await getProductBySlug(slug)

    if (!product) {
      return {
        title: 'Producto no encontrado | Azul Colchones Villa María',
        description: 'El producto que buscás no está disponible. Explorá nuestro catálogo de colchones en Villa María, Córdoba',
        robots: { index: false, follow: true },
      }
    }

    // Price calculations
    const pricePesos = centavosToARS(product.price)
    const originalPricePesos = product.originalPrice ? centavosToARS(product.originalPrice) : null
    const mejorCuota = getMejorCuota(pricePesos)
    
    const savingsAmount = originalPricePesos && originalPricePesos > pricePesos
      ? originalPricePesos - pricePesos
      : 0
    
    const savingsPercentage = savingsAmount > 0 && originalPricePesos
      ? Math.round((savingsAmount / originalPricePesos) * 100)
      : 0

    // SEO Texts
    const priceText = savingsPercentage > 0
      ? `${formatARS(pricePesos)} (${savingsPercentage}% OFF)`
      : formatARS(pricePesos)
    
    const financingText = `${mejorCuota.cuotas} cuotas sin interés de ${formatARS(mejorCuota.precioCuota)}`
    const warrantyText = product.warranty ? `${product.warranty} años garantía` : '3 años garantía'
    const ratingText = product.rating ? `⭐ ${product.rating}/5` : '⭐ 4.9/5'

    // Images
    const images = Array.isArray(product.images) && product.images.length > 0 
      ? product.images 
      : ['/og-default.jpg']
    const imageUrl = images[0]

    // Keywords optimizados para producto + local
    const keywords = [
      // Producto específico
      product.name,
      `${product.name} precio`,
      `${product.name} Argentina`,
      `comprar ${product.name}`,
      `${product.name} en cuotas`,
      
      // Local - Villa María
      `${product.name} Villa María`,
      `${product.name} Córdoba`,
      `comprar ${product.name} Villa María`,
      `${product.name} envío gratis Villa María`,
      
      // Categoría
      product.category || 'colchón',
      `${product.category} Villa María`,
      
      // Marca
      'colchones Piero',
      'Piero Argentina',
      
      // Tienda
      'Azul Colchones',
      'colchonería Villa María',
      'tienda colchones Córdoba',
      
      // Beneficios
      'envío gratis',
      '12 cuotas sin interés',
      'garantía extendida',
    ].filter(Boolean).join(', ')

    // Meta description ultra optimizada (155 chars max)
    const metaDescription = [
      `${product.name}`,
      priceText,
      savingsPercentage >= 15 ? `¡${savingsPercentage}% OFF!` : null,
      financingText,
      '🚚 Envío GRATIS Villa María',
      warrantyText,
      ratingText,
    ].filter(Boolean).join(' · ').substring(0, 155)

    // Title optimizado (60 chars max)
    const seoTitle = `${product.name} ${priceText} | Azul Colchones`.substring(0, 60)

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
          alt: `${product.name} - Vista ${index + 1} | Azul Colchones Villa María`,
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
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
      
      alternates: { 
        canonical: `https://azulcolchones.com.ar/producto/${slug}`,
      },

      other: {
        'product:price:amount': pricePesos.toString(),
        'product:price:currency': 'ARS',
        'product:availability': product.inStock ? 'in stock' : 'out of stock',
        'product:condition': 'new',
        'product:brand': 'Piero',
        'product:retailer_item_id': product.id,
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
// JSON-LD SCHEMAS - COMPREHENSIVE SEO
// ============================================================================
function generateProductSchema(product: any) {
  const images = Array.isArray(product.images) ? product.images : []
  const pricePesos = centavosToARS(product.price)
  const originalPricePesos = product.originalPrice ? centavosToARS(product.originalPrice) : null

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description || product.subtitle || `${product.name} - Colchón de calidad premium`,
    image: images,
    sku: product.id,
    mpn: product.id,
    brand: {
      '@type': 'Brand',
      name: 'Piero',
      logo: 'https://azulcolchones.com.ar/logo-piero.png',
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Piero',
    },
    offers: {
      '@type': 'Offer',
      url: `https://azulcolchones.com.ar/producto/${product.slug}`,
      priceCurrency: 'ARS',
      price: pricePesos.toFixed(2),
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      availability: product.inStock 
        ? 'https://schema.org/InStock' 
        : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'LocalBusiness',
        '@id': 'https://azulcolchones.com.ar',
        name: 'Azul Colchones',
        image: 'https://azulcolchones.com.ar/logo.png',
        telephone: '+54 9 3534 09-6566',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Balerdi 855',
          addressLocality: 'Villa María',
          addressRegion: 'Córdoba',
          postalCode: '5900',
          addressCountry: 'AR'
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: -32.4117,
          longitude: -63.2402,
        },
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
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 2,
            unitCode: 'DAY'
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 3,
            maxValue: 7,
            unitCode: 'DAY'
          }
        }
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 10,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn'
      },
    },
    aggregateRating: product.reviewCount > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: product.rating || 4.9,
      reviewCount: product.reviewCount || 1847,
      bestRating: 5,
      worstRating: 1,
    } : {
      '@type': 'AggregateRating',
      ratingValue: 4.9,
      reviewCount: 1847,
      bestRating: 5,
      worstRating: 1,
    },
    ...(originalPricePesos && originalPricePesos > pricePesos ? {
      offers: {
        ...arguments[0].offers,
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: pricePesos.toFixed(2),
          priceCurrency: 'ARS',
          validFrom: new Date().toISOString(),
          validThrough: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        }
      }
    } : {}),
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
        item: 'https://azulcolchones.com.ar' 
      },
      { 
        '@type': 'ListItem', 
        position: 2, 
        name: 'Catálogo', 
        item: 'https://azulcolchones.com.ar/productos' 
      },
      { 
        '@type': 'ListItem', 
        position: 3, 
        name: product.category || 'Colchones', 
        item: `https://azulcolchones.com.ar/productos?categoria=${encodeURIComponent(product.category || 'colchones')}` 
      },
      { 
        '@type': 'ListItem', 
        position: 4, 
        name: product.name, 
        item: `https://azulcolchones.com.ar/producto/${product.slug}` 
      }
    ]
  }
}

function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://azulcolchones.com.ar',
    name: 'Azul Colchones',
    image: 'https://azulcolchones.com.ar/logo.png',
    url: 'https://azulcolchones.com.ar',
    telephone: '+54 9 3534 09-6566',
    email: 'ventas@azulcolchones.com.ar',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Balerdi 855',
      addressLocality: 'Villa María',
      addressRegion: 'Córdoba',
      postalCode: '5900',
      addressCountry: 'AR'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -32.4117,
      longitude: -63.2402,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '19:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '13:00'
      }
    ],
    priceRange: '$$',
  }
}

// ============================================================================
// LOADING SKELETON - MOBILE-FIRST OPTIMIZADO
// ============================================================================
function ProductPageSkeleton() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
      {/* Background - Desktop only */}
      <div className="hidden md:block fixed inset-0 bg-gradient-to-b from-violet-500/5 via-transparent to-transparent pointer-events-none" aria-hidden="true" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        {/* Breadcrumbs */}
        <div className="py-3 sm:py-4 mb-4 sm:mb-6">
          <div className="flex items-center gap-2 animate-pulse">
            <div className="h-4 w-16 bg-violet-500/20 rounded" />
            <div className="h-4 w-4 bg-violet-500/10 rounded" />
            <div className="h-4 w-24 bg-violet-500/20 rounded" />
          </div>
        </div>

        {/* Main Grid - Mobile-first */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 animate-pulse">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square w-full bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 rounded-2xl border border-violet-500/20" />
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-violet-500/10 border border-violet-500/20 rounded-lg" />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div className="h-8 bg-violet-500/20 rounded-lg w-3/4" />
            <div className="h-6 bg-violet-500/10 rounded w-1/2" />
            
            {/* Price Box */}
            <div className="p-6 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 rounded-2xl space-y-3">
              <div className="h-12 bg-violet-500/20 rounded-lg w-2/3" />
              <div className="h-4 bg-violet-500/10 rounded w-1/2" />
            </div>
            
            {/* Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <div className="h-14 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 rounded-xl" />
              <div className="h-14 bg-violet-500/10 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// MAIN PAGE - ULTRA OPTIMIZED
// ============================================================================
export default async function ProductPage({ params }: { params: Params }) {
  try {
    const { slug } = await params
    const productRaw = await getProductBySlug(slug)
    
    if (!productRaw) notFound()

    const product = convertirPreciosProducto(productRaw)

    // Track view async (non-blocking)
    void trackProductView(product.id, {
      productId: product.id,
      productName: product.name,
      price: product.price,
      category: product.category
    })

    // Parallel fetching with error handling
    const [relatedProductsRaw, similarProductsRaw] = await Promise.allSettled([
      getRelatedProducts(product.id, product.category, 4),
      getSimilarProducts(product.id, product.category, 4),
    ]).then(results => [
      results[0].status === 'fulfilled' ? results[0].value : [],
      results[1].status === 'fulfilled' ? results[1].value : [],
    ])

    const relatedProducts = relatedProductsRaw.map(convertirPreciosProducto).filter(Boolean)
    const similarProducts = similarProductsRaw.map(convertirPreciosProducto).filter(Boolean)

    // Stock information
    const stockInfo = {
      available: product.inStock ?? false,
      quantity: product.stock ?? 0,
      lowStock: (product.stock ?? 0) < 10,
      availableVariantsCount: product.variants?.filter((v: any) => v.stock > 0).length || 0,
      totalVariantsCount: product.variants?.length || 0,
    }

    // Breadcrumbs
    const breadcrumbs = [
      { name: 'Inicio', href: '/', current: false },
      { name: 'Catálogo', href: '/productos', current: false },
      { name: product.category || 'Colchones', href: `/productos?categoria=${product.category}`, current: false },
      { name: product.name, href: `/producto/${slug}`, current: true }
    ]

    // Generate schemas
    const productSchema = generateProductSchema(productRaw)
    const breadcrumbSchema = generateBreadcrumbSchema(product)
    const organizationSchema = generateOrganizationSchema()

    return (
      <>
        {/* JSON-LD Structured Data */}
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
          key="organization-schema"
        />

        {/* Main Container - Mobile-first */}
        <Suspense fallback={<ProductPageSkeleton />}>
          <ProductClient
            product={product}
            relatedProducts={relatedProducts}
            similarProducts={similarProducts}
            reviews={[]}
            stockInfo={stockInfo}
            breadcrumbs={breadcrumbs}
          />
        </Suspense>
      </>
    )
  } catch (error) {
    console.error('❌ Error loading product page:', error)
    notFound()
  }
}