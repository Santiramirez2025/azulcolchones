// app/page.tsx - ULTRA OPTIMIZED ⚡ PROFESSIONAL SEO 🚀
// SEO Level: SENIOR | Performance: A+ | Validated: ✅

import type { Metadata } from 'next'
import { HeroSection } from '@/components/home/HeroSection'
import { TrustBar } from '@/components/home/TrustBar'
import { ScrollProgressBar } from '@/components/ScrollProgressBar'
import { CTASection } from '@/components/home/CTASection'
import { BenefitsSection } from '@/components/home/BenefitsSection'
import { FeaturedProducts } from '@/components/home/FeaturedProducts'
import { getFeaturedProducts } from '@/lib/api/products'

// ============================================================================
// METADATA - HOME SPECIFIC SEO 🎯
// ============================================================================

export const metadata: Metadata = {
  title: 'Colchones Online Argentina | Envío GRATIS | 12 Cuotas | Azul Colchones',
  description: 'Comprá colchones online con envío GRATIS | 12 cuotas sin interés | Garantía extendida | 30 días de prueba | Matrimoniales, Queen, King | Azul Colchones',
  alternates: {
    canonical: 'https://azulcolchones.com',
  },
  openGraph: {
    type: 'website',
    url: 'https://azulcolchones.com',
    title: 'Colchones Online Argentina | Envío GRATIS | Azul Colchones',
    description: 'Comprá colchones con envío GRATIS | 12 cuotas sin interés | Garantía extendida',
    images: [
      {
        url: '/og-home-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Colchones premium Argentina - Azul Colchones',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Colchones Online Argentina | Envío GRATIS',
    description: '12 cuotas sin interés | Garantía extendida | 30 días de prueba',
    images: ['/og-home-hero.jpg'],
  },
}

// ============================================================================
// PERFORMANCE CONFIGURATION - OPTIMIZED ⚡
// ============================================================================

export const revalidate = 43200 // 12 hours

// ❌ ELIMINADO: export const dynamic = 'force-static'
// Conflicto con import dynamic de next/dynamic

// ============================================================================
// BREADCRUMBS COMPONENT - VISIBLE + SCHEMA ✅
// ============================================================================

function Breadcrumbs({ items }: { items: { label: string; href: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="py-3">
      <ol 
        className="flex items-center gap-2 text-sm"
        itemScope 
        itemType="https://schema.org/BreadcrumbList"
      >
        {items.map((item, i) => (
          <li 
            key={i}
            itemProp="itemListElement" 
            itemScope 
            itemType="https://schema.org/ListItem"
            className="flex items-center gap-2"
          >
            {i > 0 && <span className="text-zinc-600">/</span>}
            <a 
              href={item.href}
              itemProp="item"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              <span itemProp="name">{item.label}</span>
            </a>
            <meta itemProp="position" content={String(i + 1)} />
          </li>
        ))}
      </ol>
    </nav>
  )
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default async function Home() {
  // ========================================
  // DATA FETCHING - Graceful Error Handling
  // ========================================
  
  let featuredProducts: Awaited<ReturnType<typeof getFeaturedProducts>> = []
  
  try {
    featuredProducts = await getFeaturedProducts(6)
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ [HOME] Loaded ${featuredProducts.length} featured products`)
    }
  } catch (error) {
    console.error('⚠️ [HOME] Failed to fetch products:', error)
  }

  return (
    <div className="min-h-screen w-full bg-zinc-950 overflow-x-hidden antialiased">
      
      {/* ================================================================ */}
      {/* ABOVE THE FOLD - CRITICAL CONTENT ⚡ */}
      {/* ================================================================ */}
      
      {/* Fixed UI */}
      <ScrollProgressBar />
      <TrustBar />
      
      {/* Breadcrumbs - SEO + UX */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[
          { label: 'Inicio', href: '/' }
        ]} />
      </div>
      
      {/* Hero Section - Highest Priority */}
      <section 
        className="w-full" 
        aria-labelledby="hero-heading"
      >
        <HeroSection />
      </section>
      
      {/* ================================================================ */}
      {/* BELOW THE FOLD - CONTENT 🚀 */}
      {/* ================================================================ */}
      
      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section 
          className="w-full border-t border-zinc-800/50" 
          aria-labelledby="featured-products-heading"
        >
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <FeaturedProducts initialProducts={featuredProducts} />
          </div>
        </section>
      )}
      
      {/* Benefits Section */}
      <section 
        className="w-full border-t border-zinc-800/50" 
        aria-labelledby="benefits-heading"
      >
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <BenefitsSection />
        </div>
      </section>
      
      {/* Call to Action */}
      <section 
        className="w-full border-t border-zinc-800/50"
        aria-labelledby="cta-heading"
      >
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <CTASection />
        </div>
      </section>
      
      {/* ================================================================ */}
      {/* SEO CONTENT - VISIBLE + USEFUL 📝 */}
      {/* ================================================================ */}
      
      <section className="w-full bg-zinc-900/30 border-t border-zinc-800/50">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="prose prose-invert prose-lg max-w-4xl mx-auto">
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
              Tu Tienda de Colchones de Confianza en Villa Maria
            </h2>
            
            <p className="text-zinc-300 text-lg leading-relaxed mb-8 text-center">
              En <strong>Azul Colchones</strong> ofrecemos la mejor selección de{' '}
              <strong>colchones premium</strong> para tu hogar. Con{' '}
              <strong>envío gratis a todo el país</strong>, financiación en{' '}
              <strong>12 cuotas sin interés</strong> y garantía extendida, 
              hacer realidad el descanso que merecés nunca fue tan fácil.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              {/* Tipos de Colchones */}
              <div className="bg-zinc-800/30 rounded-xl p-6 border border-zinc-700/50">
                <h3 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
                  🛏️ Colchones para Cada Necesidad
                </h3>
                <ul className="space-y-3 text-zinc-300 list-none">
                  <li>
                    <strong className="text-white">Matrimoniales</strong> - 
                    Tamaño estándar 1.40m x 1.90m, ideal para parejas
                  </li>
                  <li>
                    <strong className="text-white">Queen</strong> - 
                    Mayor espacio, 1.60m x 2.00m, confort premium
                  </li>
                  <li>
                    <strong className="text-white">King</strong> - 
                    Máximo lujo, 1.80m x 2.00m y 2.00m x 2.00m
                  </li>
                  <li>
                    <strong className="text-white">Resortes</strong> - 
                    Mayor firmeza, ventilación superior
                  </li>
                  <li>
                    <strong className="text-white">Memory Foam</strong> - 
                    Confort adaptable, reduce puntos de presión
                  </li>
                </ul>
              </div>
              
              {/* Beneficios */}
              <div className="bg-zinc-800/30 rounded-xl p-6 border border-zinc-700/50">
                <h3 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
                  ✅ ¿Por Qué Elegirnos?
                </h3>
                <ul className="space-y-3 text-zinc-300 list-none">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span><strong className="text-white">Envío gratis</strong> a toda Argentina</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span><strong className="text-white">12 cuotas sin interés</strong> con tarjetas habilitadas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span><strong className="text-white">Garantía extendida</strong> de fábrica certificada</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span><strong className="text-white">30 días de prueba</strong> en tu casa</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span><strong className="text-white">Fabricación nacional</strong> con materiales certificados</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span><strong className="text-white">Mejor precio</strong> garantizado online</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Ubicación y Contacto */}
            <div className="mt-12 bg-gradient-to-br from-blue-900/20 to-zinc-800/30 rounded-xl p-8 border border-blue-700/30">
              <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                📍 Visitá Nuestro Showroom
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <address className="not-italic text-zinc-300 space-y-3">
                  <p className="flex items-start gap-3">
                    <span className="text-blue-400 mt-1">📍</span>
                    <span>
                      <strong className="text-white block mb-1">Dirección:</strong>
                      Balerdi 855, Villa María, Córdoba, Argentina
                    </span>
                  </p>
                  
                  <p className="flex items-start gap-3">
                    <span className="text-blue-400 mt-1">📞</span>
                    <span>
                      <strong className="text-white block mb-1">WhatsApp:</strong>
                      <a 
                        href="https://wa.me/5493534017332" 
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        +54 9 353 4017332
                      </a>
                    </span>
                  </p>
                  
                  <p className="flex items-start gap-3">
                    <span className="text-blue-400 mt-1">✉️</span>
                    <span>
                      <strong className="text-white block mb-1">Email:</strong>
                      <a 
                        href="mailto:info@azulcolchones.com" 
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        info@azulcolchones.com
                      </a>
                    </span>
                  </p>
                </address>
                
                <div className="text-zinc-300 space-y-3">
                  <p className="flex items-start gap-3">
                    <span className="text-blue-400 mt-1">🕐</span>
                    <span>
                      <strong className="text-white block mb-1">Horarios:</strong>
                      Lunes a Viernes: 9:00 - 19:00hs<br />
                      Sábados: 9:00 - 13:00hs
                    </span>
                  </p>
                  
                  <p className="flex items-start gap-3">
                    <span className="text-blue-400 mt-1">🚚</span>
                    <span>
                      <strong className="text-white block mb-1">Zona de envío:</strong>
                      Villa María, Villa Nueva, Bell Ville, San Francisco y toda Argentina
                    </span>
                  </p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>
      
    </div>
  )
}