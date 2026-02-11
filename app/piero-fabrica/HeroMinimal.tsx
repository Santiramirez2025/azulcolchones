'use client'

import AsesorColchon from './AsesorColchon'

// ============================================================================
// HERO OPTIMIZADO: Mobile-first, foco en simulador, cero fricción
// ============================================================================

export default function HeroMinimal() {
  const scrollToProductos = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const productosSection = document.getElementById('productos')
    if (productosSection) {
      productosSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section className="relative bg-zinc-950 px-4 py-8 md:py-12 overflow-hidden">
      {/* Glow de fondo sutil */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[150px] -top-48 right-0"></div>
      </div>
      
      <div className="relative max-w-4xl mx-auto text-center">
        {/* Badge de confianza - PRIMERO en jerarquía visual */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-xs md:text-sm font-bold mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Más de 35 años en Villa María
        </div>
        
        {/* Headline optimizada mobile-first */}
        <h1 className="text-3xl md:text-5xl font-black text-white mb-3 leading-tight tracking-tight">
          Colchones PIERO
          <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"> Distribuidor Oficial</span>
        </h1>
        
        <p className="text-base md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
          Mismo producto. Misma garantía. <strong className="text-white">Hasta 49% menos</strong> que MercadoLibre.
        </p>

        {/* SIMULADOR - Protagonista visual del hero */}
        <div className="mb-8">
          <AsesorColchon />
        </div>

        {/* Scroll suave a productos - CTA secundario discreto */}
        <a
          href="#productos"
          onClick={scrollToProductos}
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-blue-400 transition-colors group"
        >
          <span>Ver catálogo completo</span>
          <svg 
            className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </div>
    </section>
  )
}