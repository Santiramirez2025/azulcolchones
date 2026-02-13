'use client'

import AsesorColchon from './AsesorColchon'

// ============================================================================
// HERO PIERO FÁBRICA - OPTIMIZADO PROFESIONALMENTE
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
    <section className="relative min-h-[85vh] flex items-center justify-center bg-zinc-950 px-4 py-12 md:py-16 overflow-hidden">
      
      {/* Background glows mejorados */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[700px] h-[700px] bg-blue-600/8 rounded-full blur-[200px] -top-32 right-0 animate-pulse-slow"></div>
        <div className="absolute w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[160px] bottom-0 left-0"></div>
      </div>

      {/* Grain texture overlay */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.015] pointer-events-none mix-blend-overlay"></div>
      
      <div className="relative max-w-5xl mx-auto text-center">
        
        {/* Badge de confianza mejorado */}
        <div className="mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2.5 px-5 py-3 bg-gradient-to-r from-blue-500/10 via-blue-500/15 to-blue-500/10 border border-blue-500/40 rounded-full text-blue-300 text-sm md:text-base font-bold shadow-lg shadow-blue-500/10 backdrop-blur-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-400 shadow-sm shadow-blue-400"></span>
            </span>
            Más de 35 años en Villa María
          </div>
        </div>
        
        {/* Headline optimizada con mejor jerarquía */}
        <div className="mb-12 md:mb-16 space-y-5 md:space-y-6">
          <h1 className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight px-4">
            Colchones PIERO
            <br />
            <span className="relative inline-block mt-1">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 animate-gradient">
                Distribuidor Oficial
              </span>
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0 blur-sm"></span>
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-zinc-300 max-w-3xl mx-auto font-medium leading-relaxed px-4">
            Mismo producto. Misma garantía.{' '}
            <span className="text-white font-bold bg-gradient-to-r from-emerald-500/20 to-emerald-500/30 px-2 py-0.5 rounded-md border border-emerald-500/30">
              Hasta 49% menos
            </span>
            {' '}que MercadoLibre.
          </p>
        </div>

        {/* ASESOR - Protagonista con mejor contenedor */}
        <div className="mb-12 md:mb-16 max-w-4xl mx-auto">
          <AsesorColchon />
        </div>

        {/* Separador visual mejorado */}
        <div className="flex items-center gap-4 mb-8 md:mb-10 max-w-2xl mx-auto px-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-700/60 to-zinc-700/60"></div>
          <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest whitespace-nowrap">
            O explorá el catálogo
          </span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-zinc-700/60 to-zinc-700/60"></div>
        </div>

        {/* CTA scroll suave - mejorado */}
        <a
          href="#productos"
          onClick={scrollToProductos}
          className="group inline-flex items-center gap-2.5 px-6 py-3.5 bg-zinc-800/50 hover:bg-zinc-700/50 border border-zinc-700/50 hover:border-zinc-600 rounded-xl text-sm font-semibold text-zinc-400 hover:text-white transition-all hover:scale-[1.02] shadow-lg shadow-zinc-900/20"
        >
          <span>Ver catálogo completo</span>
          <svg 
            className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </a>

      </div>
    </section>
  )
}