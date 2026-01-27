'use client'

import { useState, useEffect } from 'react'

// ============================================================================
// CONFIG - COHERENTE CON HEADER
// ============================================================================

const CONFIG = {
  whatsapp: '5493534096566',
  whatsappMessage: 'Hola! Quiero consultar por colchones PIERO',
  location: 'Villa María, Córdoba',
  years: '35+',
} as const

// ============================================================================
// ICONOS SVG INLINE
// ============================================================================

const Icons = {
  Zap: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  Clock: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  WhatsApp: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  ),
  ArrowRight: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  ),
  Check: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  Truck: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
    </svg>
  ),
  Shield: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  CreditCard: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  ),
}

// ============================================================================
// HERO SECTION - COHERENTE CON HEADER
// ============================================================================

export default function HeroSection() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    
    let timeoutId: NodeJS.Timeout
    const debouncedResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(checkMobile, 150)
    }
    
    window.addEventListener('resize', debouncedResize)
    return () => {
      window.removeEventListener('resize', debouncedResize)
      clearTimeout(timeoutId)
    }
  }, [])

  const whatsappUrl = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`

  return (
    <section className="relative min-h-[100dvh] flex items-center bg-zinc-950 overflow-hidden">
      
      {/* Background Effects - Desktop only */}
      {!isMobile && (
        <>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-green-500/5 rounded-full blur-[100px] pointer-events-none" />
        </>
      )}

      <div className="relative z-10 w-full">
        <div className="max-w-6xl mx-auto px-4 py-8 lg:py-16">
          
          {/* ============================================================ */}
          {/* MOBILE LAYOUT                                                */}
          {/* ============================================================ */}
          {isMobile ? (
            <div className="space-y-6 max-w-md mx-auto">
              
              {/* Header */}
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl">
                  <span className="text-lg font-black text-white">AZUL COLCHONES</span>
                </div>
                <p className="text-xs text-zinc-400">
                  {CONFIG.years} años • {CONFIG.location}
                </p>
              </div>

              {/* Headline */}
              <div className="text-center">
                <h1 id="hero-heading" className="text-3xl font-black text-white leading-tight mb-2">
                  Colchones PIERO
                  <span className="block text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">
                    Directo de Fábrica
                  </span>
                </h1>
                <p className="text-base text-zinc-400">
                  Elegí cómo comprar según tu urgencia
                </p>
              </div>

              {/* Options Cards - COHERENTE CON HEADER */}
              <div className="space-y-3">
                
                {/* Opción 1: Stock Inmediato */}
                <a 
                  href="/catalogo"
                  className="group block bg-zinc-900 border-2 border-blue-500/30 hover:border-blue-500/60 rounded-xl p-4 transition-all active:scale-[0.98]"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <Icons.Zap className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-bold text-base">Stock Inmediato</h3>
                      <p className="text-sm text-blue-400 font-medium">Entrega hoy</p>
                      <p className="text-xs text-zinc-500 mt-1">Probá antes de comprar</p>
                    </div>
                    <Icons.ArrowRight className="w-5 h-5 text-zinc-600 group-hover:text-blue-400 transition-colors flex-shrink-0 mt-1" />
                  </div>
                </a>

                {/* Opción 2: Piero Fábrica - COHERENTE CON HEADER */}
                <a 
                  href="/piero-fabrica"
                  className="group block bg-zinc-900 border-2 border-green-500/30 hover:border-green-500/60 rounded-xl p-4 transition-all active:scale-[0.98]"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
                      <Icons.Clock className="w-5 h-5 text-green-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-bold text-base">Piero Fábrica</h3>
                      <p className="text-sm text-green-400 font-medium">Hasta 22% OFF</p>
                      <p className="text-xs text-zinc-500 mt-1">7-10 días • Sin intermediarios</p>
                    </div>
                    <Icons.ArrowRight className="w-5 h-5 text-zinc-600 group-hover:text-green-400 transition-colors flex-shrink-0 mt-1" />
                  </div>
                </a>

              </div>

              {/* WhatsApp CTA */}
              <a 
                href={whatsappUrl}
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-500 text-white px-4 py-4 rounded-xl font-bold text-base transition-all active:scale-[0.98] shadow-lg shadow-green-500/25"
              >
                <Icons.WhatsApp className="w-5 h-5" />
                <span>Consultar por WhatsApp</span>
              </a>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg py-3 px-2">
                  <Icons.Truck className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                  <p className="text-[10px] text-zinc-400 leading-tight">Envío Gratis</p>
                </div>
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg py-3 px-2">
                  <Icons.CreditCard className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                  <p className="text-[10px] text-zinc-400 leading-tight">12 Cuotas</p>
                </div>
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg py-3 px-2">
                  <Icons.Shield className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                  <p className="text-[10px] text-zinc-400 leading-tight">Garantía 5 años</p>
                </div>
              </div>

              {/* Image */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-zinc-800">
                <img 
                  src="/images/optimized/hero-colchon-1.jpg" 
                  alt="Colchón PIERO" 
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 to-transparent" />
              </div>

            </div>
          ) : (
            
            /* ============================================================ */
            /* DESKTOP LAYOUT                                               */
            /* ============================================================ */
            <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center">
              
              {/* LEFT COLUMN - Content */}
              <div className="space-y-8">
                
                {/* Brand */}
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-3 bg-zinc-900 border border-zinc-800 px-5 py-3 rounded-xl">
                    <span className="text-3xl font-black text-white tracking-tight">AZUL COLCHONES</span>
                  </div>
                  <p className="text-sm text-zinc-400">
                    {CONFIG.years} años en {CONFIG.location}
                  </p>
                </div>

                {/* Headline */}
                <div>
                  <h1 id="hero-heading" className="text-5xl xl:text-6xl font-black leading-tight">
                    <span className="text-white">Colchones PIERO</span>
                    <span className="block text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text mt-2">
                      Directo de Fábrica
                    </span>
                  </h1>
                  <p className="text-xl text-zinc-400 mt-4 max-w-lg">
                    Elegí cómo comprar según tu urgencia y presupuesto
                  </p>
                </div>

                {/* Options Cards - COHERENTE CON HEADER */}
                <div className="grid grid-cols-2 gap-4">
                  
                  {/* Opción 1: Stock Inmediato */}
                  <a 
                    href="/catalogo"
                    className="group bg-zinc-900 border-2 border-blue-500/30 hover:border-blue-500/60 rounded-xl p-5 transition-all hover:scale-[1.02]"
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4">
                      <Icons.Zap className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-1">Stock Inmediato</h3>
                    <p className="text-blue-400 font-semibold text-sm mb-2">Entrega hoy</p>
                    <ul className="space-y-1 text-xs text-zinc-500">
                      <li className="flex items-center gap-1.5">
                        <Icons.Check className="w-3 h-3 text-blue-400" />
                        <span>Probá antes de comprar</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <Icons.Check className="w-3 h-3 text-blue-400" />
                        <span>Retiro o envío inmediato</span>
                      </li>
                    </ul>
                  </a>

                  {/* Opción 2: Piero Fábrica */}
                  <a 
                    href="/piero-fabrica"
                    className="group bg-zinc-900 border-2 border-green-500/30 hover:border-green-500/60 rounded-xl p-5 transition-all hover:scale-[1.02]"
                  >
                    <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mb-4">
                      <Icons.Clock className="w-6 h-6 text-green-400" />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-1">Piero Fábrica</h3>
                    <p className="text-green-400 font-semibold text-sm mb-2">Hasta 22% OFF</p>
                    <ul className="space-y-1 text-xs text-zinc-500">
                      <li className="flex items-center gap-1.5">
                        <Icons.Check className="w-3 h-3 text-green-400" />
                        <span>7-10 días de espera</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <Icons.Check className="w-3 h-3 text-green-400" />
                        <span>Sin intermediarios</span>
                      </li>
                    </ul>
                  </a>

                </div>

                {/* WhatsApp CTA */}
                <a 
                  href={whatsappUrl}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-xl font-bold text-base transition-all hover:scale-[1.02] shadow-lg shadow-green-500/25"
                >
                  <Icons.WhatsApp className="w-5 h-5" />
                  <span>Asesoramiento por WhatsApp</span>
                </a>

                {/* Trust Badges */}
                <div className="flex items-center gap-6 text-sm text-zinc-400">
                  <div className="flex items-center gap-2">
                    <Icons.Truck className="w-4 h-4 text-blue-400" />
                    <span>Envío Gratis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icons.CreditCard className="w-4 h-4 text-blue-400" />
                    <span>12 cuotas s/int</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icons.Shield className="w-4 h-4 text-blue-400" />
                    <span>Garantía 5 años</span>
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN - Visual */}
              <div className="relative">
                
                {/* Glow Effect */}
                <div className="absolute -inset-8 bg-blue-500/10 rounded-[3rem] blur-[80px] pointer-events-none" />
                
                {/* Image Card */}
                <div className="relative bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden p-4">
                  
                  {/* Main Image */}
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-zinc-900">
                    <img 
                      src="/images/optimized/hero-colchon-1.jpg" 
                      alt="Colchón PIERO Premium" 
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 to-transparent" />
                  </div>

                  {/* Feature Cards */}
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-3 text-center">
                      <p className="text-xs text-blue-400 font-medium">Resortes</p>
                      <p className="text-sm text-white font-bold">Pocket</p>
                    </div>
                    <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-3 text-center">
                      <p className="text-xs text-blue-400 font-medium">Memory</p>
                      <p className="text-sm text-white font-bold">Foam</p>
                    </div>
                    <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-3 text-center">
                      <p className="text-xs text-blue-400 font-medium">Garantía</p>
                      <p className="text-sm text-white font-bold">5 años</p>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </section>
  )
}