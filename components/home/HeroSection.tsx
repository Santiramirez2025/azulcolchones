'use client'

import { ArrowRight, Star, Truck, CheckCircle2, ShieldCheck, Zap, Clock, Tag } from 'lucide-react'
import { useState, useEffect } from 'react'

// Simplificado: Solo 2 imágenes principales para mobile
const HERO_IMAGES = [
  {
    url: '/images/optimized/piero-spring-1.webp',
    alt: 'Colchón Piero Spring - Outlet 60% OFF',
    badge: '60% OFF'
  },
  {
    url: '/images/optimized/piero-mattina-1.webp',
    alt: 'Colchón Piero Premium',
    badge: 'Premium'
  }
]

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Auto-rotate solo en desktop
  useEffect(() => {
    if (isMobile) return
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % HERO_IMAGES.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isMobile])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      
      {/* Background Effects - Solo Desktop */}
      {!isMobile && (
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px]" />
      )}

      <div className="relative z-10 w-full">
        <div className="container mx-auto px-4 py-8 lg:py-16">
          
          {/* ================================================================ */}
          {/* MOBILE LAYOUT - Jerarquía Optimizada para Conversión */}
          {/* ================================================================ */}
          {isMobile ? (
            <div className="space-y-6">
              
              {/* 1️⃣ LOGO + TRUST (Credibilidad Inmediata) */}
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-2 bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 px-4 py-2 rounded-lg">
                  <span className="text-2xl font-black text-white tracking-tight">PIERO</span>
                  <span className="text-blue-400 text-lg">🇦🇷</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-xs text-slate-300">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span>40+ años · +100K clientes</span>
                </div>
              </div>

              {/* 2️⃣ HEADLINE + PRECIO (Propuesta de Valor Clara) */}
              <div className="text-center space-y-4">
                <h1 className="text-4xl font-black leading-tight">
                  <span className="block text-white">Ofertas</span>
                  <span className="block bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                    Fin de Año
                  </span>
                </h1>

                {/* PRECIO HERO - Máxima Visibilidad */}
                <div className="inline-block">
                  <div className="bg-gradient-to-br from-blue-600 to-blue-500 p-1 rounded-2xl shadow-2xl">
                    <div className="bg-slate-900 rounded-xl px-6 py-4">
                      <div className="text-xs text-blue-400 font-semibold uppercase tracking-wide mb-1">
                        Desde
                      </div>
                      <div className="flex items-end justify-center gap-3 mb-2">
                        <span className="text-5xl font-black text-white">$220K</span>
                        <span className="text-xl text-slate-500 line-through mb-2">$552K</span>
                      </div>
                      <div className="inline-flex items-center gap-2 bg-amber-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                        <Zap className="w-3 h-3" />
                        60% OFF
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-slate-300">
                  Los mejores colchones de Argentina
                  <span className="block text-white font-semibold mt-1">AL MEJOR PRECIO</span>
                </p>
              </div>

              {/* 3️⃣ CTA PRINCIPAL - UN SOLO BOTÓN DOMINANTE */}
              <div className="space-y-3">
                <a
                  href="/catalogo"
                  className="block w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-8 py-5 rounded-2xl font-bold text-lg shadow-2xl shadow-blue-500/30 transition-all duration-300 active:scale-95"
                >
                  <div className="flex items-center justify-center gap-3">
                    <Zap className="w-6 h-6" />
                    <span>Ver Ofertas Disponibles</span>
                    <ArrowRight className="w-6 h-6" />
                  </div>
                  <div className="text-xs text-blue-100 mt-2 font-normal">
                    Stock limitado • Entrega inmediata
                  </div>
                </a>

                {/* CTA Secundario - Menos prominente */}
                <a
                  href="/piero-fabrica"
                  className="block w-full bg-slate-800/60 hover:bg-slate-700/60 border-2 border-slate-600/50 text-white px-6 py-4 rounded-xl font-semibold text-base transition-all duration-300"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="w-5 h-5 text-orange-400" />
                    <span>O pedir de Fábrica</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    30-40% OFF • 7-10 días
                  </div>
                </a>

                {/* WhatsApp - Siempre accesible */}
                <a
                  href="https://wa.me/5493534017332?text=Hola!%20Quiero%20consultar%20sobre%20colchones%20Piero"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span>Consultar por WhatsApp</span>
                </a>
              </div>

              {/* 4️⃣ TRUST INDICATORS */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Truck className="w-4 h-4 text-blue-400" />
                  <span>Envío Gratis</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span>6 cuotas s/int</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                  <span>Garantía 5 años</span>
                </div>
              </div>

              {/* 5️⃣ IMAGEN - Al final, no distrae */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl">
                <img 
                  src={HERO_IMAGES[currentImage].url}
                  alt={HERO_IMAGES[currentImage].alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-gradient-to-br from-amber-400 to-orange-500 px-3 py-2 rounded-lg shadow-lg">
                  <div className="text-white text-xs font-bold uppercase">Hasta</div>
                  <div className="text-white text-2xl font-black leading-none">60%</div>
                </div>
              </div>
            </div>
          ) : (
            /* ================================================================ */
            /* DESKTOP LAYOUT - Dos Columnas Clásico */
            /* ================================================================ */
            <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
              
              {/* CONTENIDO IZQUIERDA */}
              <div className="space-y-8">
                
                {/* Logo + Trust */}
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 px-4 py-2 rounded-lg">
                    <span className="text-4xl font-black text-white tracking-tight">PIERO</span>
                    <div className="h-6 w-px bg-slate-600" />
                    <span className="text-blue-400 font-semibold text-xl">🇦🇷</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span>40+ años · +100K clientes</span>
                  </div>
                </div>

                {/* Headline */}
                <div>
                  <h1 className="text-7xl font-black leading-tight tracking-tight">
                    <span className="block text-white mb-2">Ofertas fin de año</span>
                    <span className="block bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                      Hasta 60% OFF
                    </span>
                  </h1>
                </div>

                {/* Subtítulo */}
                <p className="text-xl text-slate-300 max-w-xl">
                  Los mejores colchones de Argentina
                  <span className="block text-white font-semibold mt-1">AL MEJOR PRECIO</span>
                </p>

                {/* Precio Destacado */}
                <div className="inline-block">
                  <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-xl p-8">
                    <div className="flex items-center gap-6">
                      <div>
                        <div className="text-sm text-blue-400 font-semibold mb-1">Outlet desde</div>
                        <div className="text-6xl font-black text-white">$220.000</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl text-slate-500 line-through">$552K</div>
                        <div className="mt-1 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold rounded-md">
                          -60% OFF
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-green-400 font-semibold">
                      💳 6 cuotas sin interés
                    </div>
                  </div>
                </div>

                {/* CTAs Desktop */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    
                    {/* Outlet */}
                    <a 
                      href="/catalogo"
                      className="group relative bg-gradient-to-br from-blue-950/80 to-blue-900/60 backdrop-blur-xl border-2 border-blue-500/30 hover:border-blue-400/60 rounded-xl p-5 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-blue-500/20"
                    >
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-[10px] font-black px-2 py-1 rounded-full uppercase shadow-lg animate-pulse">
                        HOT
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-400/30">
                          <Zap className="w-6 h-6 text-blue-400" />
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="text-white font-bold text-base mb-1">Outlet Disponible</h3>
                          <p className="text-sm text-slate-300 mb-2">Stock limitado • Entrega inmediata</p>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-blue-400 font-bold">Hasta 60% OFF</span>
                            <span className="text-slate-500">•</span>
                            <span className="text-green-400 font-semibold">Hoy mismo</span>
                          </div>
                        </div>
                        
                        <ArrowRight className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform flex-shrink-0 mt-1" />
                      </div>
                    </a>

                    {/* Fábrica */}
                    <a 
                      href="/piero-fabrica"
                      className="group relative bg-gradient-to-br from-orange-950/80 to-red-900/60 backdrop-blur-xl border-2 border-orange-500/30 hover:border-orange-400/60 rounded-xl p-5 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-orange-500/20"
                    >
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-black px-2 py-1 rounded-full uppercase shadow-lg">
                        NUEVO
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center border border-orange-400/30">
                          <Clock className="w-6 h-6 text-orange-400" />
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="text-white font-bold text-base mb-1">Piero Fábrica</h3>
                          <p className="text-sm text-slate-300 mb-2">Directo de fábrica • 7-10 días</p>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-orange-400 font-bold">30-40% OFF</span>
                            <span className="text-slate-500">•</span>
                            <span className="text-slate-400 font-medium">Sin intermediarios</span>
                          </div>
                        </div>
                        
                        <ArrowRight className="w-5 h-5 text-orange-400 group-hover:translate-x-1 transition-transform flex-shrink-0 mt-1" />
                      </div>
                    </a>
                  </div>

                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/5493534017332?text=Hola!%20Quiero%20consultar%20sobre%20colchones%20Piero"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-xl font-bold text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    <span>Asesoramiento WhatsApp</span>
                  </a>
                </div>

                {/* Trust */}
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Truck className="w-4 h-4 text-blue-400" />
                    <span>Envío Gratis</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-blue-400" />
                    <span>Garantía 5 años</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <ShieldCheck className="w-4 h-4 text-blue-400" />
                    <span>Pago Seguro</span>
                  </div>
                </div>
              </div>

              {/* IMAGEN DERECHA */}
              <div className="relative">
                <div className="absolute -inset-8 bg-blue-500/20 rounded-[3rem] blur-[100px] opacity-60" />
                
                <div className="relative bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl overflow-hidden p-3 shadow-2xl">
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950">
                    <img 
                      src={HERO_IMAGES[currentImage].url}
                      alt={HERO_IMAGES[currentImage].alt}
                      className="w-full h-full object-cover"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    
                    <div className="absolute top-4 right-4 bg-gradient-to-br from-amber-400 to-orange-500 px-4 py-3 rounded-lg shadow-lg">
                      <div className="text-white text-xs font-bold uppercase leading-none">Hasta</div>
                      <div className="text-white text-2xl font-black leading-none mt-0.5">60%</div>
                    </div>
                  </div>

                  {/* Specs */}
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 p-3 rounded-xl text-center">
                      <div className="text-blue-400 text-xs font-semibold">Resortes</div>
                      <div className="text-white text-sm font-bold mt-0.5">Pocket</div>
                    </div>
                    <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 p-3 rounded-xl text-center">
                      <div className="text-blue-400 text-xs font-semibold">Memory</div>
                      <div className="text-white text-sm font-bold mt-0.5">Foam</div>
                    </div>
                    <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 p-3 rounded-xl text-center">
                      <div className="text-blue-400 text-xs font-semibold">Garantía</div>
                      <div className="text-white text-sm font-bold mt-0.5">5 años</div>
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