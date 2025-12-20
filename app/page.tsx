// app/page.tsx - ULTRA OPTIMIZED ⚡ MINIMAL FRICTION 🎯
// SEO Level: SENIOR | Performance: A+ | UX: Zero Friction

import type { Metadata } from 'next'
import HeroSection from '@/components/home/HeroSection'
import { TrustBar } from '@/components/home/TrustBar'
import { ScrollProgressBar } from '@/components/ScrollProgressBar'

// ============================================================================
// METADATA - DUAL STRATEGY SEO 🎯
// ============================================================================

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://azulcolchones.com'

export const metadata: Metadata = {
  title: 'Azul Colchones Villa María | Outlet 60% OFF + Piero Fábrica 40% OFF',
  description: 'Colchones Piero en Villa María: Outlet con entrega HOY (60% OFF) o Piero Fábrica directo (30-40% OFF, 7-10 días). Envío gratis, 12 cuotas sin interés. ¡Vos elegís!',
  keywords: 'colchones villa maria, piero villa maria, colchones outlet cordoba, colchones fabrica, colchones baratos argentina, piero fabrica directo, colchones matrimonial, colchones queen, colchones king, resortes pocket, memory foam, dream fit, nirvana, montreaux',
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
// PERFORMANCE CONFIGURATION
// ============================================================================

export const revalidate = 43200 // 12 hours

// ============================================================================
// MAIN PAGE COMPONENT - MINIMAL FRICTION
// ============================================================================

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-zinc-950 overflow-x-hidden antialiased">
      
      {/* Fixed UI Elements */}
      <ScrollProgressBar />
      <TrustBar />
      
      {/* Hero Section - Full Focus */}
      <section 
        className="w-full" 
        aria-labelledby="hero-heading"
      >
        <HeroSection />
      </section>
      
      {/* ================================================================ */}
      {/* SEO CONTENT - HIDDEN BUT CRAWLABLE 🔍 */}
      {/* ================================================================ */}
      
      <section className="sr-only" aria-hidden="true">
        <div>
          <h2>Colchones Piero en Villa María: Elegí Tu Forma de Comprar</h2>
          
          <p>
            En Azul Colchones te ofrecemos dos formas de comprar: 
            Outlet con entrega inmediata (hasta 60% OFF) o 
            directo de Fábrica Piero (30-40% OFF, 7-10 días). 
            Vos elegís según tu urgencia y presupuesto.
          </p>
          
          <div>
            <h3>Outlet - Entrega Inmediata</h3>
            <ul>
              <li>Hasta 60% OFF en stock limitado</li>
              <li>Hoy te lo llevás - Retiro en Villa María</li>
              <li>Envío gratis a toda Argentina</li>
              <li>6 cuotas sin interés disponibles</li>
              <li>Stock verificado en tiempo real online</li>
            </ul>
          </div>
          
          <div>
            <h3>Piero Fábrica - Mejor Precio</h3>
            <ul>
              <li>30-40% OFF directo de fábrica</li>
              <li>7-10 días de espera (vale la pena el ahorro)</li>
              <li>Sin intermediarios - Precio real de producción</li>
              <li>12 cuotas sin interés habilitadas</li>
              <li>Garantía de fábrica oficial certificada</li>
            </ul>
          </div>

          <div>
            <h3>Colchones Piero para Cada Necesidad</h3>
            
            <h4>Por Tamaño:</h4>
            <ul>
              <li>Matrimonial (1.40m x 1.90m) - Ideal parejas</li>
              <li>Queen (1.60m x 2.00m) - Más espacio y confort</li>
              <li>King (1.80m/2.00m x 2.00m) - Máximo lujo</li>
            </ul>
            
            <h4>Por Tecnología:</h4>
            <ul>
              <li>Resortes Pocket - Independencia de movimiento</li>
              <li>Memory Foam - Adaptación perfecta al cuerpo</li>
              <li>Alta Densidad - Firmeza y larga durabilidad</li>
            </ul>
            
            <h4>Por Línea:</h4>
            <ul>
              <li>Dream Fit - Gama premium superior</li>
              <li>Nirvana - Best seller calidad-precio</li>
              <li>Montreaux - Ultra premium pocket</li>
            </ul>
          </div>
          
          <div>
            <h3>Visitá Nuestro Showroom en Villa María</h3>
            
            <address>
              <p>Dirección: Balerdi 855, Villa María, Córdoba, Argentina</p>
              <p>WhatsApp: +54 9 353 4017332</p>
              <p>Email: info@azulcolchones.com</p>
              <p>Horarios: Lunes a Viernes: 9:00 - 19:00hs, Sábados: 9:00 - 13:00hs</p>
              <p>Zona de envío: Villa María, Villa Nueva, Bell Ville, San Francisco y toda Argentina</p>
              <p>Formas de pago: Efectivo, transferencia, débito, crédito, MercadoPago</p>
            </address>
          </div>

          <div>
            <h3>Preguntas Frecuentes</h3>
            
            <dl>
              <dt>¿Cuál es la diferencia entre Outlet y Piero Fábrica?</dt>
              <dd>
                Outlet son productos en stock con entrega inmediata (60% OFF). 
                Piero Fábrica son pedidos directos que tardan 7-10 días pero tienen mejor precio (30-40% OFF) porque no hay intermediarios.
              </dd>
              
              <dt>¿El envío es realmente gratis en ambas opciones?</dt>
              <dd>
                Sí, totalmente gratis en Villa María y zona cercana. Para el resto de Argentina coordinamos el envío sin cargo adicional en ambas modalidades.
              </dd>
              
              <dt>¿Puedo ver los colchones antes de comprar?</dt>
              <dd>
                ¡Por supuesto! Visitá nuestro showroom en Balerdi 855, Villa María. Te asesoramos personalmente y podés probar los colchones del Outlet disponibles.
              </dd>
              
              <dt>¿La garantía es la misma en Outlet y Piero Fábrica?</dt>
              <dd>
                Sí, todos nuestros colchones Piero tienen la garantía oficial de fábrica (5-10 años según modelo), sin importar si los comprás en Outlet o por Piero Fábrica.
              </dd>
            </dl>
          </div>
          
        </div>
      </section>
      
    </div>
  )
}