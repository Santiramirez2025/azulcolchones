'use client'

import AsesorColchon from '@/app/piero-fabrica/AsesorColchon'
import Link from 'next/link'

// ============================================================================
// HERO HOME - ASESOR COMO PROTAGONISTA ABSOLUTO
// ============================================================================

export default function HeroHome() {
  return (
    <section className="relative min-h-[100dvh] flex items-center bg-zinc-950 overflow-hidden">
      
      {/* Background glow sutil */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[150px] -top-32 right-0"></div>
        <div className="absolute w-[500px] h-[500px] bg-green-500/3 rounded-full blur-[120px] bottom-0 left-0"></div>
      </div>

      <div className="relative z-10 w-full">
        <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
          
          {/* Badge de confianza */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm md:text-base font-bold">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
              </span>
              Más de 35 años en Villa María
            </div>
          </div>

          {/* Headline directo al grano */}
          <div className="text-center mb-8 md:mb-12 space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
              ¿No sabés qué
              <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"> colchón elegir?</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto">
              Nuestro asesor inteligente te ayuda a encontrar tu colchón ideal en <strong className="text-white">30 segundos</strong>
            </p>
          </div>

          {/* ASESOR - Protagonista gigante */}
          <div className="mb-10 md:mb-14">
            <AsesorColchon />
          </div>

          {/* Separador visual sutil */}
          <div className="flex items-center gap-4 mb-8 md:mb-10">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent"></div>
            <span className="text-xs font-bold text-zinc-600 uppercase tracking-wider">O mirá el catálogo completo</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent"></div>
          </div>

          {/* CTA Piero Fábrica - Centrado */}
          <div className="max-w-lg mx-auto">
            <Link 
              href="/piero-fabrica"
              className="group relative block bg-gradient-to-br from-emerald-600/90 to-emerald-500/80 hover:from-emerald-500 hover:to-emerald-600 border border-emerald-400/20 rounded-xl p-6 transition-all hover:scale-[1.02] shadow-xl shadow-emerald-500/20"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-black text-xl">Piero Fábrica</h3>
                    <p className="text-emerald-100 text-sm font-bold">Hasta 22% OFF</p>
                  </div>
                </div>
                <svg className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <p className="text-sm text-emerald-50">
                Directo de fábrica • 7-10 días de espera • Garantía oficial
              </p>
            </Link>
          </div>

          {/* WhatsApp flotante discreto */}
          <div className="text-center mt-10">
            <a
              href="https://wa.me/5493534096566?text=Hola!%20Quiero%20consultar%20por%20colchones"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600/90 hover:bg-green-600 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-green-600/20"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              ¿Dudas? Consultanos por WhatsApp
            </a>
            <p className="text-xs text-zinc-600 mt-3">
              Lun-Vie 9-19hs • Sáb 9-13hs • Balerdi 855, Villa María
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}