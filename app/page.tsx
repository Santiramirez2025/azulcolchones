// app/page.tsx - OPTIMIZADO + COHERENTE CON HEADER Y LANDINGS
// Nomenclatura unificada: Stock Inmediato | Piero Fábrica

import type { Metadata } from 'next'
import HeroSection from '@/components/home/HeroSection'
import { TrustBar } from '@/components/home/TrustBar'
import { ScrollProgressBar } from '@/components/ScrollProgressBar'

// ============================================================================
// METADATA - COHERENTE CON REALIDAD (sin % inflados)
// ============================================================================

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://azulcolchones.com'

export const metadata: Metadata = {
  title: 'Azul Colchones Villa María | Colchones PIERO Directo de Fábrica',
  description: 'Colchones PIERO en Villa María: Stock Inmediato con entrega hoy o Piero Fábrica con hasta 22% OFF (7-10 días). Envío gratis, 12 cuotas sin interés. +35 años de experiencia.',
  keywords: 'colchones villa maria, piero villa maria, colchones piero cordoba, colchones fabrica, azul colchones, colchones matrimonial, colchones queen, colchones king, resortes pocket, memory foam, nirvana, montreaux, sommier',
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'Azul Colchones',
    title: 'Azul Colchones | PIERO Directo de Fábrica | Villa María',
    description: 'Colchones PIERO: Stock Inmediato o Piero Fábrica hasta 22% OFF. Envío gratis, 12 cuotas sin interés.',
    images: [
      {
        url: `${siteUrl}/og-home-hero.jpg`,
        width: 1200,
        height: 630,
        alt: 'Azul Colchones - PIERO Fábrica Villa María',
      }
    ],
    locale: 'es_AR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Azul Colchones | PIERO Fábrica Villa María',
    description: 'Stock Inmediato o Piero Fábrica hasta 22% OFF. Vos elegís.',
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
// PERFORMANCE
// ============================================================================

export const revalidate = 43200 // 12 hours

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-zinc-950 overflow-x-hidden antialiased">
      
      {/* Fixed UI Elements */}
      <ScrollProgressBar />
      <TrustBar />
      
      {/* Hero Section */}
      <section className="w-full" aria-labelledby="hero-heading">
        <HeroSection />
      </section>
      
      {/* ================================================================ */}
      {/* SEO CONTENT - HIDDEN BUT CRAWLABLE                              */}
      {/* ================================================================ */}
      
      <section className="sr-only" aria-hidden="true">
        <div>
          <h2>Colchones PIERO en Villa María: Elegí Tu Forma de Comprar</h2>
          
          <p>
            En Azul Colchones te ofrecemos dos formas de comprar colchones PIERO: 
            Stock Inmediato con entrega el mismo día, o 
            Piero Fábrica directo con hasta 22% de descuento (7-10 días de espera). 
            Vos elegís según tu urgencia y presupuesto.
          </p>
          
          <div>
            <h3>Stock Inmediato - Entrega Hoy</h3>
            <ul>
              <li>Productos en stock disponible</li>
              <li>Retiro inmediato en Villa María</li>
              <li>Envío en el día a zona cercana</li>
              <li>Probá el colchón antes de comprar</li>
              <li>Financiación disponible</li>
            </ul>
          </div>
          
          <div>
            <h3>Piero Fábrica - Mejor Precio</h3>
            <ul>
              <li>Hasta 22% de descuento vs MercadoLibre</li>
              <li>7-10 días de espera</li>
              <li>Directo de fábrica sin intermediarios</li>
              <li>12 cuotas sin interés</li>
              <li>Garantía oficial PIERO (5-10 años)</li>
            </ul>
          </div>

          <div>
            <h3>Líneas PIERO Disponibles</h3>
            
            <h4>Por Tamaño:</h4>
            <ul>
              <li>1 Plaza (80-100cm) - Individual</li>
              <li>1½ Plaza (130cm) - Individual amplio</li>
              <li>2 Plazas (140cm) - Matrimonial</li>
              <li>Queen (160cm) - Más espacio</li>
              <li>King (180-200cm) - Máximo confort</li>
            </ul>
            
            <h4>Modelos Destacados:</h4>
            <ul>
              <li>Nirvana - Excelente relación calidad-precio</li>
              <li>Sonno EuroPillow - Confort superior</li>
              <li>Regno - Resortes pocket premium</li>
              <li>Montreaux - Línea premium</li>
              <li>Dream Fit - Gama alta</li>
            </ul>
          </div>
          
          <div>
            <h3>Visitá Nuestro Local en Villa María</h3>
            
            <address>
              <p>Dirección: Balerdi 855, Villa María, Córdoba, Argentina</p>
              <p>WhatsApp: +54 9 3534 09-6566</p>
              <p>Horarios: Lunes a Viernes 9-19hs, Sábados 9-13hs</p>
              <p>Zona de envío: Villa María, Villa Nueva, Córdoba y toda Argentina</p>
            </address>
          </div>

          <div>
            <h3>Preguntas Frecuentes</h3>
            
            <dl>
              <dt>¿Cuál es la diferencia entre Stock Inmediato y Piero Fábrica?</dt>
              <dd>
                Stock Inmediato son productos disponibles para entrega hoy. 
                Piero Fábrica son pedidos directos a fábrica que tardan 7-10 días 
                pero tienen hasta 22% de descuento porque no hay intermediarios.
              </dd>
              
              <dt>¿El envío es gratis?</dt>
              <dd>
                Sí, envío gratis en Villa María y zona cercana. 
                Para el resto de Argentina coordinamos sin cargo adicional.
              </dd>
              
              <dt>¿Puedo financiar mi compra?</dt>
              <dd>
                Sí, ofrecemos hasta 12 cuotas sin interés con tarjetas bancarias.
              </dd>
              
              <dt>¿La garantía es la misma en ambas opciones?</dt>
              <dd>
                Sí, todos los colchones PIERO tienen garantía oficial de fábrica 
                (5-10 años según modelo), sin importar cómo los compres.
              </dd>
            </dl>
          </div>
          
        </div>
      </section>
      
    </div>
  )
}