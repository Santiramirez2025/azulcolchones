'use client'

import { useState, useEffect } from 'react'

// ============================================================================
// CONFIG
// ============================================================================

const CONFIG = {
  whatsapp: '5493534096566',
  whatsappMessage: 'Hola! Quiero consultar por colchones',
  location: 'Balerdi 855, Villa María',
  years: 35,
  foundedYear: 1991,
} as const

// ============================================================================
// ICONOS SVG INLINE
// ============================================================================

const Icons = {
  WhatsApp: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  ),
  MapPin: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
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
  Heart: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  Tag: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
    </svg>
  ),
  ArrowRight: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  ),
}

// ============================================================================
// HERO SECTION
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
              
              {/* Header - Familiar y cercano */}
              <div className="text-center space-y-3">
                <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-4 py-2.5 rounded-xl">
                  <Icons.Heart className="w-4 h-4 text-blue-400" />
                  <span className="text-base font-bold text-white">Negocio Familiar</span>
                </div>
                <h1 className="text-3xl font-black text-white leading-tight">
                  Más de {CONFIG.years} años
                  <span className="block text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">
                    vendiendo descanso
                  </span>
                </h1>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Siempre estuvimos en el centro de Villa María. <br className="hidden sm:block" />
                  Ahora te esperamos en nuestro nuevo local
                </p>
              </div>

              {/* Ubicación destacada */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <Icons.MapPin className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-bold text-sm mb-1">Nuestro Nuevo Local</p>
                    <p className="text-zinc-400 text-xs leading-relaxed">
                      {CONFIG.location}<br />
                      <span className="text-blue-400">✓ Estacionamiento disponible</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Imagen */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-zinc-800">
                <img 
                  src="/images/optimized/hero-colchon-1.jpg" 
                  alt="Colchones PIERO - Azul Colchones Villa María" 
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-bold text-sm">Colchones PIERO</p>
                  <p className="text-zinc-300 text-xs">Distribuidores Oficiales</p>
                </div>
              </div>

              {/* Propuesta de valor */}
              <div className="text-center space-y-4">
                <p className="text-zinc-300 text-sm leading-relaxed">
                  Somos <span className="text-white font-semibold">distribuidores oficiales PIERO</span>.<br />
                  Comprá directo de fábrica al mejor precio
                </p>

                {/* CTA Principal - Piero Fábrica */}
                <a 
                  href="/piero-fabrica"
                  className="group block bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 rounded-xl p-5 transition-all active:scale-[0.98] shadow-lg shadow-emerald-500/25"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                        <Icons.Tag className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-white font-black text-lg">Piero Fábrica</h3>
                        <p className="text-emerald-100 text-sm font-medium">Hasta 22% OFF</p>
                      </div>
                    </div>
                    <Icons.ArrowRight className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-emerald-50 text-xs text-left">
                    Directo de fábrica • 7-10 días de espera • Sin intermediarios
                  </p>
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
                <span>Consultanos por WhatsApp</span>
              </a>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 text-center pt-2">
                <div className="py-3">
                  <Icons.Truck className="w-5 h-5 text-blue-400 mx-auto mb-1.5" />
                  <p className="text-[11px] text-zinc-400 font-medium">Envío<br />Gratis</p>
                </div>
                <div className="py-3">
                  <Icons.CreditCard className="w-5 h-5 text-blue-400 mx-auto mb-1.5" />
                  <p className="text-[11px] text-zinc-400 font-medium">12 Cuotas<br />Sin Interés</p>
                </div>
                <div className="py-3">
                  <Icons.Shield className="w-5 h-5 text-blue-400 mx-auto mb-1.5" />
                  <p className="text-[11px] text-zinc-400 font-medium">Garantía<br />Oficial</p>
                </div>
              </div>

            </div>
          ) : (
            
            /* ============================================================ */
            /* DESKTOP LAYOUT                                               */
            /* ============================================================ */
            <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center">
              
              {/* LEFT COLUMN - Content */}
              <div className="space-y-8">
                
                {/* Brand Story */}
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-4 py-2.5 rounded-xl">
                    <Icons.Heart className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-semibold text-white">Negocio Familiar desde {CONFIG.foundedYear}</span>
                  </div>
                  
                  <h1 id="hero-heading" className="text-5xl xl:text-6xl font-black leading-tight">
                    <span className="text-white">Más de {CONFIG.years} años</span>
                    <span className="block text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text mt-2">
                      vendiendo descanso en Villa María
                    </span>
                  </h1>
                  
                  <p className="text-lg text-zinc-400 leading-relaxed max-w-xl">
                    Siempre estuvimos en el centro. Ahora nos trasladamos a <span className="text-white font-semibold">{CONFIG.location}</span>, 
                    un lugar más cómodo donde <span className="text-blue-400">siempre hay estacionamiento</span> disponible para vos.
                  </p>
                </div>

                {/* Propuesta de valor */}
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                  <p className="text-zinc-300 text-base leading-relaxed">
                    Somos <span className="text-white font-semibold">distribuidores oficiales PIERO</span>. 
                    Comprá directo de fábrica y ahorrá hasta 22% vs otros canales.
                  </p>
                </div>

                {/* CTA Principal - Piero Fábrica */}
                <a 
                  href="/piero-fabrica"
                  className="group block bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 rounded-xl p-6 transition-all hover:scale-[1.01] shadow-lg shadow-emerald-500/25"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
                        <Icons.Tag className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-black text-2xl">Piero Fábrica</h3>
                        <p className="text-emerald-100 text-base font-semibold">Hasta 22% OFF</p>
                      </div>
                    </div>
                    <Icons.ArrowRight className="w-7 h-7 text-white group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-emerald-50 text-sm">
                    Directo de fábrica • 7-10 días de espera • Sin intermediarios • Garantía oficial
                  </p>
                </a>

                {/* WhatsApp CTA */}
                <a 
                  href={whatsappUrl}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-xl font-bold text-base transition-all hover:scale-[1.02] shadow-lg shadow-green-500/25"
                >
                  <Icons.WhatsApp className="w-5 h-5" />
                  <span>Consultanos por WhatsApp</span>
                </a>

                {/* Trust Badges */}
                <div className="flex items-center gap-8 text-sm text-zinc-400 pt-4">
                  <div className="flex items-center gap-2">
                    <Icons.Truck className="w-5 h-5 text-blue-400" />
                    <span>Envío gratis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icons.CreditCard className="w-5 h-5 text-blue-400" />
                    <span>12 cuotas sin interés</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icons.Shield className="w-5 h-5 text-blue-400" />
                    <span>Garantía oficial</span>
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN - Visual */}
              <div className="relative">
                
                {/* Glow Effect */}
                <div className="absolute -inset-8 bg-emerald-500/10 rounded-[3rem] blur-[80px] pointer-events-none" />
                
                {/* Image Card */}
                <div className="relative bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden p-4">
                  
                  {/* Main Image */}
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-zinc-900">
                    <img 
                      src="/images/optimized/hero-colchon-1.jpg" 
                      alt="Colchones PIERO - Distribuidores Oficiales en Villa María" 
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 to-transparent" />
                    
                    {/* Badge sobre imagen */}
                    <div className="absolute top-4 left-4 bg-zinc-950/90 backdrop-blur-sm border border-zinc-800 rounded-lg px-3 py-2">
                      <p className="text-white font-bold text-sm">Distribuidores Oficiales</p>
                      <p className="text-emerald-400 text-xs font-semibold">PIERO</p>
                    </div>

                    {/* Precio badge */}
                    <div className="absolute top-4 right-4 bg-emerald-600 rounded-lg px-3 py-2">
                      <p className="text-white font-black text-sm">Hasta 22% OFF</p>
                    </div>
                  </div>

                  {/* Ubicación Card */}
                  <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-4 mt-4">
                    <div className="flex items-start gap-3">
                      <Icons.MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-white font-semibold text-sm mb-1">{CONFIG.location}</p>
                        <p className="text-zinc-400 text-xs">Estacionamiento disponible</p>
                      </div>
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