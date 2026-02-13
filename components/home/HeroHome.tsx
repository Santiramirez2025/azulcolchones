'use client'

import AsesorColchon from '@/app/piero-fabrica/AsesorColchon'
import Link from 'next/link'

// ============================================================================
// HERO HOME - OPTIMIZADO PROFESIONALMENTE
// ============================================================================

export default function HeroHome() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center bg-zinc-950 overflow-hidden">
      
      {/* Background glow mejorado con más profundidad */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[800px] h-[800px] bg-blue-600/8 rounded-full blur-[200px] -top-48 right-0 animate-pulse-slow"></div>
        <div className="absolute w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[180px] top-1/4 left-1/4"></div>
        <div className="absolute w-[500px] h-[500px] bg-emerald-500/4 rounded-full blur-[150px] bottom-0 left-0"></div>
      </div>

      {/* Grain texture overlay sutil para profundidad */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.015] pointer-events-none mix-blend-overlay"></div>

      <div className="relative z-10 w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          
          {/* Badge de confianza mejorado */}
          <div className="text-center mb-8 md:mb-10">
            <div className="inline-flex items-center gap-2.5 px-5 py-3 bg-gradient-to-r from-blue-500/10 via-blue-500/15 to-blue-500/10 border border-blue-500/40 rounded-full text-blue-300 text-sm md:text-base font-bold shadow-lg shadow-blue-500/10 backdrop-blur-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-400 shadow-sm shadow-blue-400"></span>
              </span>
              Más de 35 años en Villa María
            </div>
          </div>

          {/* Headline optimizado con mejor jerarquía */}
          <div className="text-center mb-12 md:mb-16 space-y-5 md:space-y-6">
            <h1 className="text-[2.75rem] sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight px-4">
              ¿No sabés qué
              <br />
              <span className="relative inline-block mt-1">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 animate-gradient">
                  colchón elegir?
                </span>
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0 blur-sm"></span>
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-300 max-w-3xl mx-auto font-medium leading-relaxed px-4">
              Nuestro asesor inteligente te ayuda a encontrar tu colchón ideal en{' '}
              <span className="text-white font-bold bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-2 py-0.5 rounded-md border border-blue-500/30">
                30 segundos
              </span>
            </p>
          </div>

          {/* ASESOR - Protagonista con mejor contenedor */}
          <div className="mb-12 md:mb-16 max-w-4xl mx-auto">
            <AsesorColchon />
          </div>

          {/* Separador visual mejorado */}
          <div className="flex items-center gap-4 mb-10 md:mb-12 max-w-2xl mx-auto px-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-700/60 to-zinc-700/60"></div>
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest whitespace-nowrap">
              O mirá el catálogo
            </span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-zinc-700/60 to-zinc-700/60"></div>
          </div>

          {/* CTA Piero Fábrica - Mejorado visualmente */}
          <div className="max-w-xl mx-auto px-4 mb-12 md:mb-14">
            <Link 
              href="/piero-fabrica"
              className="group relative block overflow-hidden bg-gradient-to-br from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 border border-emerald-400/30 rounded-2xl transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-500/30 shadow-xl shadow-emerald-500/20"
            >
              {/* Shine effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <div className="relative p-6 md:p-7">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-emerald-900/30 group-hover:scale-105 transition-transform">
                      <svg className="w-8 h-8 text-white drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-black text-2xl mb-0.5 tracking-tight">Piero Fábrica</h3>
                      <p className="text-emerald-50 text-base font-bold">Hasta 49% OFF</p>
                    </div>
                  </div>
                  <svg className="w-7 h-7 text-white/90 group-hover:translate-x-1.5 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <p className="text-sm md:text-base text-emerald-50/90 font-medium">
                  Directo de fábrica • 7-10 días de espera • Garantía oficial
                </p>
              </div>
            </Link>
          </div>

          {/* WhatsApp mejorado con mejor diseño */}
          <div className="text-center max-w-md mx-auto px-4">
            <a
              href="https://wa.me/5493534096566?text=Hola!%20Quiero%20consultar%20por%20colchones"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-7 py-4 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-600 text-white text-base font-bold rounded-2xl transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-green-600/40 shadow-xl shadow-green-600/25"
            >
              <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span>¿Dudas? Consultanos por WhatsApp</span>
            </a>
            <p className="text-sm text-zinc-500 mt-4 font-medium">
              Lun-Vie 9-19hs • Sáb 9-13hs
              <br />
              <span className="text-zinc-600">Balerdi 855, Villa María</span>
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}