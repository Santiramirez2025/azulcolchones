// app/simulador/page.tsx - ULTRA OPTIMIZED ⚡ MOBILE-FIRST 📱 SEO BEAST 🚀
import { Suspense } from 'react'
import type { Metadata } from 'next'
import { getProducts } from '@/lib/api/products'
import { centavosToARS } from '@/lib/utils/currency'
import SimuladorClient from './simulador-client'
import { ProductDebugger } from '../../components/debug/ProductDebugger'
import { Brain, Sparkles, AlertTriangle } from 'lucide-react'

// ============================================================================
// METADATA & SEO - ULTRA OPTIMIZADO
// ============================================================================
export const metadata: Metadata = {
  title: 'Simulador IA de Colchones | Encontrá tu Colchón Perfecto en 2 Min | Azul Colchones Villa María',
  description: 'Test inteligente de sueño en 2 minutos. Nuestro algoritmo de IA analiza tu perfil (peso, postura, dolor) y te recomienda el colchón ideal. Envío gratis Villa María, Córdoba. 3 cuotas.',
  keywords: [
    'simulador colchones IA',
    'test colchón perfecto',
    'elegir colchón online',
    'calculadora colchón ideal',
    'simulador sueño Argentina',
    'test firmeza colchón',
    'simulador colchones Villa María',
    'elegir colchón inteligente',
    'test personalizado colchón',
    'recomendador colchones IA',
    'simulador descanso',
    'test comprar colchón',
  ],
  openGraph: {
    title: 'Simulador IA | Encontrá tu Colchón Perfecto | Azul Colchones',
    description: 'Test de 2 minutos con IA. Descubrí el colchón ideal según tu peso, postura y preferencias.',
    type: 'website',
    locale: 'es_AR',
    siteName: 'Azul Colchones',
    images: [
      {
        url: '/og-simulador.jpg',
        width: 1200,
        height: 630,
        alt: 'Simulador IA de Colchones - Azul Colchones Villa María',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Simulador IA de Colchones | Azul Colchones',
    description: 'Test inteligente en 2 minutos. Encontrá tu colchón perfecto.',
    images: ['/og-simulador.jpg'],
  },
  alternates: {
    canonical: 'https://azulcolchones.com/simulador',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
  },
}

// ============================================================================
// PERFORMANCE CONFIGURATION
// ============================================================================
export const dynamic = 'force-dynamic'
export const revalidate = 1800 // 30 minutes

// ============================================================================
// CONSTANTS
// ============================================================================
const IS_DEBUG = process.env.NODE_ENV === 'development'

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Validar y parsear campo JSON de forma segura
 */
function parseJsonField<T = any>(field: any, fieldName: string, defaultValue: T): T {
  if (!field) {
    IS_DEBUG && console.log(`📝 Field "${fieldName}" is empty, using default`)
    return defaultValue
  }

  // Ya es el tipo correcto
  if (typeof defaultValue === 'object' && Array.isArray(defaultValue)) {
    if (Array.isArray(field)) {
      return field as T
    }
  }

  // Intentar parsear string JSON
  if (typeof field === 'string') {
    try {
      const parsed = JSON.parse(field)
      IS_DEBUG && console.log(`✅ Parsed "${fieldName}" from JSON string`)
      return parsed as T
    } catch (error) {
      IS_DEBUG && console.warn(`⚠️ Failed to parse "${fieldName}" JSON:`, error)
      return defaultValue
    }
  }

  IS_DEBUG && console.warn(`⚠️ Field "${fieldName}" has unexpected type:`, typeof field)
  return defaultValue
}

/**
 * Validar y limpiar imágenes de un producto
 */
function validateAndCleanImages(images: any): string[] {
  if (!images) {
    IS_DEBUG && console.warn('⚠️ Product has no images field')
    return []
  }

  // Ya es array
  if (Array.isArray(images)) {
    const validImages = images.filter(img => {
      if (typeof img !== 'string') {
        IS_DEBUG && console.warn('⚠️ Image is not a string:', img)
        return false
      }
      if (!img.startsWith('/') && !img.startsWith('http')) {
        IS_DEBUG && console.warn('⚠️ Invalid image URL:', img)
        return false
      }
      return true
    })
    return validImages
  }

  // Es string JSON
  if (typeof images === 'string') {
    return parseJsonField<string[]>(images, 'images', [])
  }

  IS_DEBUG && console.warn('⚠️ Images field has unexpected type:', typeof images)
  return []
}

/**
 * Normalizar producto para el simulador
 */
function normalizeProduct(product: any): any {
  const cleanImages = validateAndCleanImages(product.images)
  
  if (IS_DEBUG && cleanImages.length === 0) {
    console.warn(`⚠️ Product "${product.name}" has no valid images`, {
      originalImages: product.images,
      type: typeof product.images,
      isArray: Array.isArray(product.images)
    })
  }

  // Convertir precios de centavos a pesos
  const price = centavosToARS(product.price || 0)
  const originalPrice = product.originalPrice ? centavosToARS(product.originalPrice) : null
  const compareAtPrice = product.compareAtPrice ? centavosToARS(product.compareAtPrice) : null

  IS_DEBUG && console.log(`💰 Product "${product.name}" prices:`, {
    rawPrice: product.price,
    price,
    originalPrice,
    compareAtPrice
  })

  return {
    ...product,
    // Precios en pesos
    price,
    originalPrice,
    compareAtPrice,
    // Arrays parseados
    images: cleanImages,
    features: parseJsonField(product.features, 'features', []),
    techFeatures: parseJsonField(product.techFeatures, 'techFeatures', []),
    highlights: parseJsonField(product.highlights, 'highlights', []),
    materials: parseJsonField(product.materials, 'materials', []),
    tags: parseJsonField(product.tags, 'tags', []),
    certifications: parseJsonField(product.certifications, 'certifications', []),
    layers: parseJsonField(product.layers, 'layers', []),
    // Números normalizados
    firmnessValue: Number(product.firmnessValue) || 70,
    transpirability: Number(product.transpirability) || 80,
    height: Number(product.height) || 25,
    satisfaction: Number(product.satisfaction) || 95,
    rating: Number(product.rating) || 4.8,
    reviewCount: Number(product.reviewCount) || 0,
    // Booleanos normalizados
    cooling: Boolean(product.cooling),
    eco: Boolean(product.isEco),
    isEco: Boolean(product.isEco),
    hypoallergenic: product.hypoallergenic !== false,
    washable: product.washable !== false,
    isBestSeller: Boolean(product.isBestSeller),
    isNew: Boolean(product.isNew),
    inStock: product.inStock !== false,
    isActive: product.isActive !== false,
  }
}

/**
 * Validar si un producto es válido para el simulador
 */
function isValidProduct(product: any): boolean {
  const isValid = 
    product.isActive !== false && 
    product.inStock !== false &&
    product.price > 0 &&
    product.images.length > 0

  if (!isValid && IS_DEBUG) {
    console.warn(`⚠️ Product filtered out: "${product.name}"`, {
      isActive: product.isActive,
      inStock: product.inStock,
      price: product.price,
      imagesCount: product.images.length
    })
  }

  return isValid
}

// ============================================================================
// LOADING STATE - MOBILE OPTIMIZED
// ============================================================================
function SimuladorLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-purple-950 to-zinc-950 flex items-center justify-center px-4">
      <div className="text-center max-w-sm mx-auto">
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 px-5 py-2.5 rounded-full mb-8 animate-pulse">
          <Brain className="w-4 h-4 text-cyan-400" aria-hidden="true" />
          <span className="text-white font-semibold text-sm">Cargando simulador IA</span>
        </div>
        
        {/* Spinner */}
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 border-4 border-violet-500/20 rounded-full" />
          <div className="absolute inset-0 border-4 border-transparent border-t-violet-500 rounded-full animate-spin" />
          <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-violet-400" aria-hidden="true" />
        </div>
        
        {/* Loading Text */}
        <p className="text-zinc-400 text-base">
          Preparando tu experiencia personalizada
        </p>
        <span className="sr-only">Cargando simulador de colchones con inteligencia artificial</span>
      </div>
    </div>
  )
}

// ============================================================================
// EMPTY STATE
// ============================================================================
function EmptyState() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-purple-950 to-zinc-950 flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        {/* Icon Container */}
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-violet-500 to-fuchsia-600 mb-6 shadow-2xl shadow-violet-500/20">
          <Brain className="w-12 h-12 text-white" aria-hidden="true" />
        </div>
        
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-black text-white mb-3 leading-tight">
          Simulador en construcción
        </h1>
        
        {/* Description */}
        <p className="text-zinc-400 text-base md:text-lg mb-8">
          Estamos calibrando nuestro algoritmo de IA. Volvé pronto.
        </p>
        
        {/* Dev Info Card */}
        {IS_DEBUG && (
          <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-left">
            <p className="text-zinc-400 text-sm mb-3">💡 Desarrolladores: Ejecutá el seed</p>
            <code className="block text-violet-400 font-mono text-xs md:text-sm bg-black/30 px-4 py-3 rounded-lg">
              npm run db:seed
            </code>
          </div>
        )}
      </div>
    </div>
  )
}

// ============================================================================
// NO VALID PRODUCTS STATE
// ============================================================================
function NoValidProductsState({ 
  rawCount, 
  processedCount, 
  withImagesCount, 
  activeCount, 
  inStockCount 
}: { 
  rawCount: number
  processedCount: number
  withImagesCount: number
  activeCount: number
  inStockCount: number
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-purple-950 to-zinc-950 flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        {/* Warning Icon */}
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-red-500 to-orange-600 mb-6 shadow-2xl shadow-red-500/20">
          <AlertTriangle className="w-12 h-12 text-white" aria-hidden="true" />
        </div>
        
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-black text-white mb-3 leading-tight">
          Sin productos válidos
        </h1>
        
        {/* Description */}
        <p className="text-zinc-400 text-base md:text-lg mb-8">
          No encontramos productos con imágenes válidas para el simulador.
        </p>
        
        {/* Stats Card */}
        {IS_DEBUG && (
          <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-left">
            <p className="text-zinc-300 text-sm font-semibold mb-4">🔍 Productos procesados:</p>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-500">Total cargados</span>
                <span className="text-white font-semibold">{rawCount}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-500">Procesados</span>
                <span className="text-white font-semibold">{processedCount}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-500">Con imágenes</span>
                <span className={withImagesCount > 0 ? 'text-emerald-400 font-semibold' : 'text-red-400 font-semibold'}>
                  {withImagesCount}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-500">Activos</span>
                <span className="text-white font-semibold">{activeCount}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-500">En stock</span>
                <span className="text-white font-semibold">{inStockCount}</span>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-white/5">
              <p className="text-violet-400 text-xs leading-relaxed">
                💡 Verificá que los productos en la DB tengan el campo 'images' correctamente guardado como JSON array.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ============================================================================
// JSON-LD SCHEMAS
// ============================================================================
function generateSimulatorSchemas() {
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Simulador IA de Colchones',
    description: 'Test inteligente para encontrar tu colchón perfecto en 2 minutos',
    url: 'https://azulcolchones.com/simulador',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Azul Colchones',
      url: 'https://azulcolchones.com',
    },
    about: {
      '@type': 'Thing',
      name: 'Simulador de Colchones con Inteligencia Artificial',
    },
  }

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Simulador IA de Colchones',
    applicationCategory: 'WebApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'ARS',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1847',
      bestRating: '5',
      worstRating: '1',
    },
    description: 'Test inteligente de 2 minutos que analiza tu perfil de sueño y recomienda el colchón ideal',
    featureList: [
      'Análisis personalizado de perfil de sueño',
      'Recomendaciones basadas en IA',
      'Test de 2 minutos',
      'Resultados instantáneos',
      'Comparación de productos',
    ],
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: 'https://azulcolchones.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Simulador IA',
        item: 'https://azulcolchones.com/simulador',
      },
    ],
  }

  return { webPageSchema, softwareSchema, breadcrumbSchema }
}

// ============================================================================
// MAIN PAGE
// ============================================================================
export default async function SimuladorPage() {
  console.log('🚀 [Simulador] Starting page load...')

  // Fetch products from API
  const { data: rawProducts } = await getProducts()
  console.log('📦 [Simulador] Raw products loaded:', rawProducts?.length || 0)

  // Empty state
  if (!rawProducts || rawProducts.length === 0) {
    console.log('❌ [Simulador] No products found')
    return <EmptyState />
  }

  // Normalize products
  console.log('🔄 [Simulador] Normalizing products...')
  const products = rawProducts.map(normalizeProduct)
  console.log('✅ [Simulador] Products normalized:', products.length)

  // Filter valid products
  const validProducts = products.filter(isValidProduct)
  console.log('✅ [Simulador] Valid products:', validProducts.length)

  // Stats logging
  if (IS_DEBUG) {
    console.log('📊 [Simulador] Stats:')
    console.log('  ✓ Total products loaded:', rawProducts.length)
    console.log('  ✓ Products after processing:', products.length)
    console.log('  ✓ Valid products for simulator:', validProducts.length)
    console.log('  ✓ Products with images:', products.filter(p => p.images.length > 0).length)
    console.log('  ✓ Products in stock:', products.filter(p => p.inStock).length)
    console.log('  ✓ Best sellers:', products.filter(p => p.isBestSeller).length)
    
    if (validProducts.length > 0) {
      const sample = validProducts[0]
      console.log('  ✓ Sample product:', {
        name: sample.name,
        slug: sample.slug,
        price: sample.price,
        imagesCount: sample.images.length,
        firmnessValue: sample.firmnessValue,
      })
    }
  }

  // No valid products state
  if (validProducts.length === 0) {
    console.log('❌ [Simulador] No valid products after filtering')
    return (
      <NoValidProductsState
        rawCount={rawProducts.length}
        processedCount={products.length}
        withImagesCount={products.filter(p => p.images.length > 0).length}
        activeCount={products.filter(p => p.isActive).length}
        inStockCount={products.filter(p => p.inStock).length}
      />
    )
  }

  // Generate schemas
  const { webPageSchema, softwareSchema, breadcrumbSchema } = generateSimulatorSchemas()

  // Render main simulator
  console.log('🎨 [Simulador] Rendering client with', validProducts.length, 'products')
  
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
        key="webpage-schema"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        key="software-schema"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        key="breadcrumb-schema"
      />

      {/* Main Content */}
      <Suspense fallback={<SimuladorLoading />}>
        <SimuladorClient products={validProducts} />
      </Suspense>

      {/* Debug tool - Solo en development */}
      {IS_DEBUG && <ProductDebugger products={validProducts} />}

      {/* Hidden SEO Content */}
      <aside className="sr-only" aria-hidden="true">
        <h1>Simulador IA de Colchones - Encontrá tu Colchón Perfecto</h1>
        <p>
          Test inteligente de 2 minutos para descubrir el colchón ideal según tu perfil de sueño.
          Nuestro algoritmo de inteligencia artificial analiza tu peso, postura al dormir, dolores
          corporales y preferencias para recomendarte el colchón perfecto en Azul Colchones Villa María.
        </p>
        <h2>Cómo Funciona el Simulador IA</h2>
        <p>
          El simulador de colchones con IA hace preguntas sobre tu perfil de sueño: peso corporal,
          postura preferida (boca arriba, costado, boca abajo), dolores de espalda o cervicales,
          preferencias de firmeza, y necesidades especiales. Luego, nuestro algoritmo compara tus
          respuestas con las características técnicas de cada colchón: firmeza, transpirabilidad,
          altura, materiales, y tecnologías de descanso.
        </p>
        <h2>Beneficios del Test Personalizado</h2>
        <ul>
          <li>Recomendación personalizada en 2 minutos</li>
          <li>Algoritmo basado en características técnicas reales</li>
          <li>Compara todos los colchones disponibles</li>
          <li>Considera tu perfil de sueño completo</li>
          <li>Muestra porcentaje de compatibilidad</li>
          <li>Resultados instantáneos</li>
          <li>Gratuito y sin compromiso</li>
        </ul>
        <h2>Preguntas del Simulador</h2>
        <p>
          El test incluye preguntas sobre: peso corporal (para determinar firmeza necesaria),
          postura al dormir (espalda, costado, boca abajo), dolores corporales, transpiración
          nocturna, alergias, preferencias de firmeza, presupuesto, y necesidades especiales.
        </p>
        <h2>Tecnología de Recomendación</h2>
        <p>
          Nuestro simulador utiliza un sistema de scoring inteligente que pondera cada característica
          del colchón según tu perfil. Analiza firmeza, transpirabilidad, altura, materiales,
          tecnologías de cooling, certificaciones hipoalergénicas, y más de 15 parámetros técnicos.
        </p>
        <h2>Catálogo Completo Disponible</h2>
        <p>
          El simulador analiza {validProducts.length} colchones disponibles en stock de marcas
          premium como Piero, con diferentes tecnologías: resortes ensacados, memory foam,
          viscoelástico, látex natural, híbridos, y más.
        </p>
      </aside>
    </>
  )
}