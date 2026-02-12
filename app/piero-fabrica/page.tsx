// app/piero-fabrica/page.tsx
import type { Metadata } from 'next'
import ProductosPage from './ProductPage'
import PacksComerciales from './PacksComerciales'
import HeroMinimal from './HeroMinimal'
import FAQSection from './FAQSection'
import CTAFinal from './CTAFinal'
import Footer from '@/components/productos/Footer'

export const metadata: Metadata = {
  title: 'Colchones PIERO Fábrica | Hasta 49% OFF vs MercadoLibre | Villa María',
  description: 'Comprá colchones PIERO directo de fábrica. Mismo producto, misma garantía, hasta 49% menos que MercadoLibre. Entrega 7-10 días.',
  robots: 'index, follow',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/piero-fabrica`,
  },
}

function SeparadorSeccion({ texto }: { texto: string }) {
  return (
    <div className="relative py-8 md:py-12 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent"></div>
          <span className="text-xs font-bold text-zinc-600 uppercase tracking-widest">
            {texto}
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent"></div>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// PAGE PRINCIPAL - Flujo optimizado sin navegación sticky
// ============================================================================
export default function PieroFabricaPage() {
  return (
    <div className="min-h-screen w-full bg-zinc-950 antialiased">
      <HeroMinimal />
      
      {/* Catálogo de Productos */}
      <section id="productos" className="pt-4 pb-8">
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