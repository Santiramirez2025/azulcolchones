// app/piero-fabrica/page.tsx — PRODUCT-FIRST | Zero Friction
// Estructura: Packs Destacados → Product Grid → FAQ compacto → CTA Final

import type { Metadata } from 'next'
import ProductosGridOptimizado from './ProductosGrid'
import PacksComerciales from './PacksComerciales'

// ============================================================================
// METADATA
// ============================================================================

export const metadata: Metadata = {
  title: 'Colchones PIERO Fábrica | Hasta 49% OFF vs MercadoLibre | Villa María',
  description:
    'Comprá colchones PIERO directo de fábrica. Mismo producto, misma garantía, hasta 49% menos que MercadoLibre. Entrega 7-10 días.',
  robots: 'index, follow',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/piero-fabrica`,
  },
}

// ============================================================================
// HERO MINIMALISTA — Contexto rápido antes de los packs
// ============================================================================

function HeroMinimal() {
  return (
    <section className="relative bg-zinc-950 pt-8 pb-6 md:pt-12 md:pb-8 overflow-hidden">
      {/* Background subtle */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[150px] -top-48 right-0"></div>
      </div>
      
      <div className="relative max-w-4xl mx-auto px-4 text-center">
        {/* Badge de Confianza */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-xs font-bold mb-5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          +35 años de experiencia · Fábrica en Villa María
        </div>
        
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight tracking-tight">
          Colchones PIERO
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"> Directo de Fábrica</span>
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-6">
          Mismo producto. Misma garantía. <strong className="text-white">Hasta 49% menos</strong> que MercadoLibre.
        </p>

        {/* Value Props compactos */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-zinc-500">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Garantía oficial 5-10 años
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
            </svg>
            Entrega 7-10 días
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            Todas las tarjetas
          </span>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// NAVEGACIÓN RÁPIDA — Anclas a secciones
// ============================================================================

function NavegacionRapida() {
  return (
    <nav className="sticky top-0 z-40 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center gap-2 py-3 overflow-x-auto scrollbar-hide">
          <a 
            href="#productos" 
            className="flex-shrink-0 px-4 py-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-bold rounded-lg hover:bg-blue-500/20 transition-colors"
          >
            📦 Ver Catálogo
          </a>
          <a 
            href="#packs" 
            className="flex-shrink-0 px-4 py-2 bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-bold rounded-lg hover:bg-green-500/20 transition-colors"
          >
            🎁 Packs con Ahorro
          </a>
          <a 
            href="https://wa.me/5493534017332?text=Hola!%20Quiero%20consultar%20por%20colchones%20PIERO"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 px-4 py-2 bg-zinc-800/60 border border-zinc-700/50 text-zinc-300 text-sm font-bold rounded-lg hover:bg-zinc-700/60 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Consultar
          </a>
        </div>
      </div>
    </nav>
  )
}

// ============================================================================
// SEPARADOR VISUAL — Transición entre secciones
// ============================================================================

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
// FAQ COMPACTO — Solo lo esencial, al final. Mínimo necesario.
// ============================================================================

function FAQCompacto() {
  const preguntas = [
    {
      q: '¿Es el mismo colchón que en MercadoLibre?',
      a: 'Sí. Mismo producto, misma fábrica PIERO, misma garantía oficial. La diferencia de precio es porque eliminamos intermediarios y comisiones de plataforma.',
    },
    {
      q: '¿Cuánto demora la entrega?',
      a: '7 a 10 días hábiles desde Villa María hasta tu domicilio. Te enviamos el tracking con cada paso.',
    },
    {
      q: '¿Cuáles son los métodos de pago?',
      a: 'Efectivo, transferencia bancaria, y todas las tarjetas de crédito y débito. También podés pagar en cuotas (consultar recargos vigentes).',
    },
    {
      q: '¿Qué pasa si no me conviene el colchón?',
      a: 'Garantía de satisfacción. Si tenés algún inconveniente, nos comunicamos y lo resolvemos. Además, cada modelo tiene garantía oficial PIERO de 5 a 10 años.',
    },
    {
      q: '¿Por qué los packs tienen descuento extra?',
      a: 'Al comprar combo reducimos costos de logística y preparación. Ese ahorro te lo trasladamos directamente. Además, te asegurás de tener todo lo necesario para estrenar tu colchón.',
    },
  ]

  return (
    <section className="bg-zinc-950 py-12 md:py-16 border-t border-zinc-800">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-xl font-bold text-white mb-6 text-center">Preguntas frecuentes</h2>
        <div className="space-y-3">
          {preguntas.map((item, i) => (
            <details key={i} className="group">
              <summary className="flex items-center justify-between cursor-pointer list-none p-4 rounded-xl bg-zinc-900 hover:bg-zinc-900/80 transition-colors">
                <span className="text-sm font-semibold text-zinc-200 pr-4">{item.q}</span>
                <svg
                  className="w-4 h-4 text-zinc-500 flex-shrink-0 transition-transform duration-200 group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-4 pt-2 pb-4 text-sm text-zinc-500 leading-relaxed">{item.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// CTA FINAL — Simple. Una acción clara.
// ============================================================================

function CTAFinal() {
  return (
    <section className="bg-zinc-950 py-12 md:py-16 border-t border-zinc-800">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <p className="text-zinc-400 text-base mb-5">
          ¿Tenés dudas? Consultanos por WhatsApp, sin compromiso.
        </p>
        <a
          href="https://wa.me/5493534017332?text=Hola!%20Quiero%20consultar%20por%20colchones%20PIERO%20Fábrica"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-8 py-4 bg-green-600 hover:bg-green-500 text-white font-bold text-base rounded-xl transition-colors shadow-lg shadow-green-600/20"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          Consultar por WhatsApp
        </a>
        <p className="text-xs text-zinc-600 mt-4">
          Lun–Vie 9–19hs · Sáb 9–13hs · Respondemos en minutos
        </p>
      </div>
    </section>
  )
}

// ============================================================================
// FOOTER MÍNIMO
// ============================================================================

function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 py-5">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-zinc-600">
        <span>© 2025 Colchones PIERO Fábrica · Villa María, Córdoba</span>
        <span>+35 años de experiencia · Garantía de mejor precio</span>
      </div>
    </footer>
  )
}

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function PieroFabricaPage() {
  return (
    <div className="min-h-screen w-full bg-zinc-950 antialiased">
      {/* HERO - Contexto rápido */}
      <HeroMinimal />
      
      {/* NAVEGACIÓN - Anclas sticky */}
      <NavegacionRapida />

      {/* CATÁLOGO COMPLETO - Primero para no abrumar */}
      <section id="productos" className="pt-4 pb-8">
        <ProductosGridOptimizado />
      </section>

      {/* SEPARADOR */}
      <SeparadorSeccion texto="O aprovechá nuestros combos con descuento extra" />

      {/* PACKS - Después del catálogo como upsell */}
      <PacksComerciales />

      {/* FAQ solo si necesita resolver dudas antes de comprar */}
      <FAQCompacto />

      {/* Una sola llamada a la acción */}
      <CTAFinal />

      {/* Footer */}
      <Footer />
    </div>
  )
}