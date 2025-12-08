// app/page.tsx - PRODUCTION READY ✅
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { HeroSection } from '@/components/home/HeroSection'
import { TrustBar } from '@/components/home/TrustBar'
import { ScrollProgressBar } from '@/components/ScrollProgressBar'
import { FeaturedProducts } from '@/components/home/FeaturedProducts'
import { homeMetadata, getAllStructuredData } from '@/lib/metadata'
import { getFeaturedProducts } from '@/lib/api/products'

// ============================================================================
// METADATA & CONFIG
// ============================================================================
export const metadata: Metadata = homeMetadata

// ISR Configuration: Revalidate every hour
export const revalidate = 3600

// Dynamic rendering for real-time data
export const dynamicParams = true

// ============================================================================
// DYNAMIC IMPORTS - Lazy loading non-critical components
// ============================================================================
const BenefitsSection = dynamic(
  () => import('@/components/home/BenefitsSection').then(mod => ({ default: mod.BenefitsSection })),
  { 
    loading: () => <BenefitsSkeleton />, 
    ssr: true 
  }
)

const CTASection = dynamic(
  () => import('@/components/home/CTASection').then(mod => ({ default: mod.CTASection })),
  { 
    loading: () => <CTASkeleton />, 
    ssr: true 
  }
)

// ============================================================================
// LOADING SKELETONS
// ============================================================================
function BenefitsSkeleton() {
  return (
    <div className="w-full bg-zinc-950" role="status" aria-label="Cargando beneficios">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="space-y-8 animate-pulse">
          <div className="h-10 bg-zinc-800/50 rounded-lg w-2/3 mx-auto" />
          <div className="h-6 bg-zinc-800/30 rounded w-1/2 mx-auto" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-zinc-800/40 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ProductsSkeleton() {
  return (
    <div className="w-full bg-zinc-950" role="status" aria-label="Cargando productos">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="space-y-8 animate-pulse">
          <div className="h-10 bg-zinc-800/50 rounded-lg w-1/2 mx-auto" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-4">
                <div className="aspect-square bg-zinc-800/40 rounded-xl" />
                <div className="h-6 bg-zinc-800/30 rounded w-3/4" />
                <div className="h-4 bg-zinc-800/20 rounded w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function CTASkeleton() {
  return (
    <div className="w-full bg-zinc-950" role="status" aria-label="Cargando llamada a la acción">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="space-y-6 animate-pulse text-center">
          <div className="h-12 bg-zinc-800/50 rounded-lg w-3/4 mx-auto" />
          <div className="h-6 bg-zinc-800/30 rounded w-1/2 mx-auto" />
          <div className="h-12 bg-zinc-800/40 rounded-lg w-48 mx-auto mt-8" />
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================
export default async function Home() {
  // Generate all structured data schemas for SEO
  const structuredDataSchemas = getAllStructuredData()
  
  // Fetch featured products with error handling
  let featuredProducts: Awaited<ReturnType<typeof getFeaturedProducts>> = []
  
  try {
    featuredProducts = await getFeaturedProducts(6)
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ [HOME] Loaded ${featuredProducts.length} featured products`)
    }
  } catch (error) {
    // Graceful degradation: Site works without products during build
    console.error('⚠️ [HOME] Failed to fetch featured products:', error)
    
    // In production, this allows the build to succeed even if DB is unavailable
    // Products will be loaded when the database connection is restored
  }

  return (
    <>
      {/* ============================================================================ */}
      {/* STRUCTURED DATA - SEO OPTIMIZATION */}
      {/* ============================================================================ */}
      {structuredDataSchemas.map((schema, index) => (
        <script
          key={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* ============================================================================ */}
      {/* PRECONNECT HINTS - PERFORMANCE OPTIMIZATION */}
      {/* ============================================================================ */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      <link rel="dns-prefetch" href="https://images.unsplash.com" />

      {/* ============================================================================ */}
      {/* MAIN CONTAINER */}
      {/* ============================================================================ */}
      <div className="min-h-screen w-full bg-zinc-950 overflow-x-hidden scroll-smooth antialiased">
        
        {/* ================================================================ */}
        {/* FIXED UI ELEMENTS */}
        {/* ================================================================ */}
        <ScrollProgressBar />
        <TrustBar />
        
        {/* ================================================================ */}
        {/* HERO SECTION */}
        {/* ================================================================ */}
        <section className="w-full" aria-label="Sección principal">
          <HeroSection />
        </section>
        
        {/* ================================================================ */}
        {/* BENEFITS SECTION */}
        {/* ================================================================ */}
        <section className="w-full" aria-labelledby="benefits-heading">
          <Suspense fallback={<BenefitsSkeleton />}>
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
              <BenefitsSection />
            </div>
          </Suspense>
        </section>
        
        {/* ================================================================ */}
        {/* FEATURED PRODUCTS SECTION */}
        {/* ================================================================ */}
        {featuredProducts.length > 0 && (
          <section 
            className="w-full border-t border-zinc-800/50" 
            aria-labelledby="featured-products-heading"
          >
            <Suspense fallback={<ProductsSkeleton />}>
              <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                <FeaturedProducts initialProducts={featuredProducts} />
              </div>
            </Suspense>
          </section>
        )}
        
        {/* ================================================================ */}
        {/* CALL TO ACTION SECTION */}
        {/* ================================================================ */}
        <section 
          className="w-full border-t border-zinc-800/50"
          aria-labelledby="cta-heading"
        >
          <Suspense fallback={<CTASkeleton />}>
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
              <CTASection />
            </div>
          </Suspense>
        </section>
      </div>
    </>
  )
}