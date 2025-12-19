// app/page.tsx - ULTRA OPTIMIZED ⚡ DUAL STRATEGY 🎯
// SEO Level: SENIOR | Performance: A+ | Strategy: Outlet + Fábrica

import type { Metadata } from 'next'
import HeroSection from '@/components/home/HeroSection'
import { TrustBar } from '@/components/home/TrustBar'
import { ScrollProgressBar } from '@/components/ScrollProgressBar'
import { CTASection } from '@/components/home/CTASection'
import { BenefitsSection } from '@/components/home/BenefitsSection'
import { FeaturedProducts } from '@/components/home/FeaturedProducts'
import { getFeaturedProducts } from '@/lib/api/products'

// ============================================================================
// METADATA - DUAL STRATEGY SEO 🎯
// ============================================================================

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://azulcolchones.com'

export const metadata: Metadata = {
  title: 'Azul Colchones Villa María | Outlet 60% OFF + Piero Fábrica 40% OFF',
  description: 'Colchones Piero en Villa María: Outlet con entrega HOY (60% OFF) o Piero Fábrica directo (30-40% OFF, 7-10 días). Envío gratis, 12 cuotas sin interés. ¡Vos elegís!',
  keywords: 'colchones villa maria, piero villa maria, colchones outlet cordoba, colchones fabrica, colchones baratos argentina, piero fabrica directo',
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'Azul Colchones',
    title: 'Azul Colchones | Outlet + Piero Fábrica | Villa María',
    description: 'Comprá colchones Piero: Outlet (60% OFF, hoy) o Fábrica (40% OFF, 7-10 días). Envío gratis, 12 cuotas.',
    images: [
      {
        url: `${siteUrl}/og-home-hero.jpg`,
        width: 1200,
        height: 630,
        alt: 'Azul Colchones - Outlet y Piero Fábrica Villa María',
      }
    ],
    locale: 'es_AR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Azul Colchones | Outlet 60% + Piero Fábrica 40%',
    description: 'Villa María, Córdoba. Entrega inmediata o precio de fábrica. Vos elegís.',
    images: [`${siteUrl}/og-home-hero.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
}

// ============================================================================
// PERFORMANCE CONFIGURATION - OPTIMIZED ⚡
// ============================================================================

export const revalidate = 43200 // 12 hours

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
      
      {/* Hero Section - Dual Strategy (Outlet + Fábrica) */}
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
      {/* SEO CONTENT - DUAL STRATEGY EXPLANATION 📝 */}
      {/* ================================================================ */}
      
      <section className="w-full bg-zinc-900/30 border-t border-zinc-800/50">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="prose prose-invert prose-lg max-w-4xl mx-auto">
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
              Colchones Piero en Villa María: Elegí Tu Forma de Comprar
            </h2>
            
            <p className="text-zinc-300 text-lg leading-relaxed mb-8 text-center">
              En <strong>Azul Colchones</strong> te ofrecemos <strong>dos formas de comprar</strong>:{' '}
              <strong className="text-orange-400">Outlet con entrega inmediata</strong> (hasta 60% OFF) o{' '}
              <strong className="text-blue-400">directo de Fábrica Piero</strong> (30-40% OFF, 7-10 días).{' '}
              <span className="text-white">Vos elegís según tu urgencia y presupuesto.</span>
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              
              {/* Outlet - Stock Actual */}
              <div className="bg-gradient-to-br from-orange-900/20 to-zinc-800/30 rounded-xl p-6 border border-orange-700/30">
                <h3 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
                  🔥 Outlet - Entrega Inmediata
                </h3>
                <ul className="space-y-3 text-zinc-300 list-none">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400 mt-1 text-xl">✓</span>
                    <span><strong className="text-white">Hasta 60% OFF</strong> en stock limitado</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400 mt-1 text-xl">✓</span>
                    <span><strong className="text-white">Hoy te lo llevás</strong> - Retiro en Villa María</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400 mt-1 text-xl">✓</span>
                    <span><strong className="text-white">Envío gratis</strong> a toda Argentina</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400 mt-1 text-xl">✓</span>
                    <span><strong className="text-white">6 cuotas sin interés</strong> disponibles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400 mt-1 text-xl">✓</span>
                    <span><strong className="text-white">Stock verificado</strong> en tiempo real online</span>
                  </li>
                </ul>
                <div className="mt-6 pt-4 border-t border-orange-700/30">
                  <a 
                    href="/catalogo"
                    className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-semibold transition-colors"
                  >
                    Ver productos en Outlet
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
              
              {/* Piero Fábrica - Futuro */}
              <div className="bg-gradient-to-br from-blue-900/20 to-zinc-800/30 rounded-xl p-6 border border-blue-700/30">
                <h3 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
                  🏭 Piero Fábrica - Mejor Precio
                </h3>
                <ul className="space-y-3 text-zinc-300 list-none">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1 text-xl">✓</span>
                    <span><strong className="text-white">30-40% OFF</strong> directo de fábrica</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1 text-xl">✓</span>
                    <span><strong className="text-white">7-10 días</strong> de espera (vale la pena el ahorro)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1 text-xl">✓</span>
                    <span><strong className="text-white">Sin intermediarios</strong> - Precio real de producción</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1 text-xl">✓</span>
                    <span><strong className="text-white">12 cuotas sin interés</strong> habilitadas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1 text-xl">✓</span>
                    <span><strong className="text-white">Garantía de fábrica</strong> oficial certificada</span>
                  </li>
                </ul>
                <div className="mt-6 pt-4 border-t border-blue-700/30">
                  <a 
                    href="/piero-fabrica"
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                  >
                    Ver precios Piero Fábrica
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Tipos de Colchones Piero */}
            <div className="mt-12 bg-zinc-800/30 rounded-xl p-6 border border-zinc-700/50">
              <h3 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
                🛏️ Colchones Piero para Cada Necesidad
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-zinc-300 text-sm">
                <div>
                  <h4 className="text-white font-semibold mb-3 text-base">Por Tamaño:</h4>
                  <ul className="space-y-2 list-none">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-0.5">•</span>
                      <span><strong className="text-white">Matrimonial</strong> (1.40m x 1.90m) - Ideal parejas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-0.5">•</span>
                      <span><strong className="text-white">Queen</strong> (1.60m x 2.00m) - Más espacio y confort</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-0.5">•</span>
                      <span><strong className="text-white">King</strong> (1.80m/2.00m x 2.00m) - Máximo lujo</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-3 text-base">Por Tecnología:</h4>
                  <ul className="space-y-2 list-none">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-0.5">•</span>
                      <span><strong className="text-white">Resortes Pocket</strong> - Independencia de movimiento</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-0.5">•</span>
                      <span><strong className="text-white">Memory Foam</strong> - Adaptación perfecta al cuerpo</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-0.5">•</span>
                      <span><strong className="text-white">Alta Densidad</strong> - Firmeza y larga durabilidad</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-3 text-base">Por Línea:</h4>
                  <ul className="space-y-2 list-none">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-0.5">•</span>
                      <span><strong className="text-white">Dream Fit</strong> - Gama premium superior</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-0.5">•</span>
                      <span><strong className="text-white">Nirvana</strong> - Best seller calidad-precio</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-0.5">•</span>
                      <span><strong className="text-white">Montreaux</strong> - Ultra premium pocket</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Ubicación y Contacto */}
            <div className="mt-12 bg-gradient-to-br from-blue-900/20 to-zinc-800/30 rounded-xl p-8 border border-blue-700/30">
              <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                📍 Visitá Nuestro Showroom en Villa María
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <address className="not-italic text-zinc-300 space-y-3">
                  <p className="flex items-start gap-3">
                    <span className="text-blue-400 mt-1 text-xl">📍</span>
                    <span>
                      <strong className="text-white block mb-1">Dirección:</strong>
                      Balerdi 855, Villa María, Córdoba, Argentina
                    </span>
                  </p>
                  
                  <p className="flex items-start gap-3">
                    <span className="text-blue-400 mt-1 text-xl">📞</span>
                    <span>
                      <strong className="text-white block mb-1">WhatsApp:</strong>
                      <a 
                        href="https://wa.me/5493534017332?text=Hola!%20Quiero%20consultar%20por%20colchones%20Piero" 
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        +54 9 353 4017332
                      </a>
                    </span>
                  </p>
                  
                  <p className="flex items-start gap-3">
                    <span className="text-blue-400 mt-1 text-xl">✉️</span>
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
                    <span className="text-blue-400 mt-1 text-xl">🕐</span>
                    <span>
                      <strong className="text-white block mb-1">Horarios:</strong>
                      Lunes a Viernes: 9:00 - 19:00hs<br />
                      Sábados: 9:00 - 13:00hs
                    </span>
                  </p>
                  
                  <p className="flex items-start gap-3">
                    <span className="text-blue-400 mt-1 text-xl">🚚</span>
                    <span>
                      <strong className="text-white block mb-1">Zona de envío:</strong>
                      Villa María, Villa Nueva, Bell Ville, San Francisco y toda Argentina
                    </span>
                  </p>

                  <p className="flex items-start gap-3">
                    <span className="text-blue-400 mt-1 text-xl">💳</span>
                    <span>
                      <strong className="text-white block mb-1">Formas de pago:</strong>
                      Efectivo, transferencia, débito, crédito, MercadoPago
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ Rápido */}
            <div className="mt-12 bg-zinc-800/30 rounded-xl p-6 border border-zinc-700/50">
              <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                ❓ Preguntas Frecuentes
              </h3>
              <dl className="space-y-6 text-sm sm:text-base">
                <div>
                  <dt className="text-white font-bold mb-2 text-base">¿Cuál es la diferencia entre Outlet y Piero Fábrica?</dt>
                  <dd className="text-zinc-400 leading-relaxed">
                    <strong className="text-orange-400">Outlet</strong> son productos en stock con entrega inmediata (60% OFF). 
                    <strong className="text-blue-400"> Piero Fábrica</strong> son pedidos directos que tardan 7-10 días pero tienen mejor precio (30-40% OFF) porque no hay intermediarios.
                  </dd>
                </div>
                <div>
                  <dt className="text-white font-bold mb-2 text-base">¿El envío es realmente gratis en ambas opciones?</dt>
                  <dd className="text-zinc-400 leading-relaxed">
                    Sí, totalmente gratis en Villa María y zona cercana. Para el resto de Argentina coordinamos el envío sin cargo adicional en ambas modalidades.
                  </dd>
                </div>
                <div>
                  <dt className="text-white font-bold mb-2 text-base">¿Puedo ver los colchones antes de comprar?</dt>
                  <dd className="text-zinc-400 leading-relaxed">
                    ¡Por supuesto! Visitá nuestro showroom en Balerdi 855, Villa María. Te asesoramos personalmente y podés probar los colchones del Outlet disponibles.
                  </dd>
                </div>
                <div>
                  <dt className="text-white font-bold mb-2 text-base">¿La garantía es la misma en Outlet y Piero Fábrica?</dt>
                  <dd className="text-zinc-400 leading-relaxed">
                    Sí, todos nuestros colchones Piero tienen la garantía oficial de fábrica (5-10 años según modelo), sin importar si los comprás en Outlet o por Piero Fábrica.
                  </dd>
                </div>
              </dl>
            </div>
            
          </div>
        </div>
      </section>
      
    </div>
  )
}