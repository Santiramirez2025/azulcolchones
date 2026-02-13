// app/piero-fabrica/page.tsx - OPTIMIZADO
import type { Metadata } from 'next'
import ProductosPage from './ProductPage'
import PacksComerciales from './PacksComerciales'
import HeroMinimal from './HeroMinimal'
import FAQSection from './FAQSection'
import CTAFinal from './CTAFinal'
import Footer from '@/components/productos/Footer'

// ============================================================================
// METADATA SEO
// ============================================================================

export const metadata: Metadata = {
  title: 'Colchones PIERO Fábrica | Hasta 49% OFF vs MercadoLibre | Villa María',
  description: 'Comprá colchones PIERO directo de fábrica. Mismo producto, misma garantía, hasta 49% menos que MercadoLibre. Entrega 7-10 días. Distribuidor oficial en Villa María.',
  
  keywords: [
    'colchones PIERO fábrica',
    'PIERO Villa María',
    'colchones descuento',
    'colchones baratos Córdoba',
    'distribuidor PIERO',
  ],

  robots: 'index, follow',
  
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/piero-fabrica`,
  },

  openGraph: {
    type: 'website',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/piero-fabrica`,
    siteName: 'Azul Colchones',
    title: 'PIERO Fábrica: Hasta 49% OFF | Azul Colchones Villa María',
    description: 'Comprá directo de fábrica. Mismo producto, misma garantía, hasta 49% menos.',
    images: [{
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-piero-fabrica.jpg`,
      width: 1200,
      height: 630,
      alt: 'Colchones PIERO Fábrica - Azul Colchones Villa María',
    }],
    locale: 'es_AR',
  },
}

export const revalidate = 43200 // 12 hours

// ============================================================================
// SEPARADOR VISUAL OPTIMIZADO
// ============================================================================

function SeparadorSeccion({ texto }: { texto: string }) {
  return (
    <div className="relative py-10 md:py-14 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-700/60 to-zinc-700/60"></div>
          <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest whitespace-nowrap px-2">
            {texto}
          </span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-zinc-700/60 to-zinc-700/60"></div>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// PAGE PRINCIPAL - Flujo optimizado
// ============================================================================

export default function PieroFabricaPage() {
  return (
    <div className="min-h-screen w-full bg-zinc-950 antialiased">
      
      {/* Hero con Asesor */}
      <HeroMinimal />
      
      {/* Catálogo de Productos */}
      <section id="productos">
        <ProductosPage />
      </section>

      {/* Separador */}
      <SeparadorSeccion texto="O aprovechá nuestros combos con descuento extra" />

      {/* Packs Comerciales */}
      <section id="packs">
        <PacksComerciales />
      </section>

      {/* FAQ */}
      <FAQSection />

      {/* CTA Final */}
      <CTAFinal />

      {/* Footer */}
      <Footer />
    </div>
  )
}