'use client'

import { ArrowRight, Star, Truck, CheckCircle2, ShieldCheck, Zap, Clock } from 'lucide-react'
import { useState, useEffect } from 'react'

// ============================================================================
// IMÁGENES - COHERENTE CON TUS ARCHIVOS
// ============================================================================

const HERO_IMAGES = [
  {
    url: '/images/optimized/hero-colchon-1.jpg',
    fallback: '/images/optimized/hero-colchon-2.jpg',
    alt: 'Colchón Piero - Stock Disponible',
    badge: 'HOT'
  },
  {
    url: '/images/optimized/hero-colchon-2.jpg',
    fallback: '/images/optimized/hero-colchon-1.jpg',
    alt: 'Colchón Piero Premium',
    badge: 'Premium'
  }
] as const

// ============================================================================
// CONFIG - COHERENTE CON HEADER
// ============================================================================

const SITE_CONFIG = {
  whatsappNumber: '+54 9 3534 09-6566',
  tagline: 'Ofertas de Enero',
  discount: 'Hasta 20% OFF',
  priceFrom: '$220.000',
  priceOriginal: '$552.000',
  discountPercent: '60%',
  yearsExperience: '35+',
  location: 'Villa María, Córdoba',
} as const

// ============================================================================
// HERO SECTION - COHERENTE CON HEADER MINIMALISTA
// ============================================================================

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [imageLoaded, setImageLoaded] = useState<Record<number, boolean>>({})
  const [imageError, setImageError] = useState<Record<number, boolean>>({})

  // Detectar mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
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

  // Pre-cargar imágenes
  useEffect(() => {
    const preloadImages = async () => {
      const loadPromises = HERO_IMAGES.map((img, index) => {
        return new Promise((resolve) => {
          const image = new Image()
          image.onload = () => {
            setImageLoaded(prev => ({ ...prev, [index]: true }))
            resolve(true)
          }
          image.onerror = () => {
            const fallbackImage = new Image()
            fallbackImage.onload = () => {
              setImageLoaded(prev => ({ ...prev, [index]: true }))
              resolve(true)
            }
            fallbackImage.onerror = () => {
              setImageError(prev => ({ ...prev, [index]: true }))
              resolve(false)
            }
            fallbackImage.src = img.fallback
          }
          image.src = img.url
        })
      })
      await Promise.all(loadPromises)
    }
    preloadImages()
  }, [])

  // Carrusel automático
  useEffect(() => {
    if (isMobile) return
    const loadedCount = Object.values(imageLoaded).filter(Boolean).length
    if (loadedCount < 2) return

    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % HERO_IMAGES.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [isMobile, imageLoaded])

  const getImageUrl = (index: number) => {
    if (imageError[index]) return HERO_IMAGES[index].fallback
    return HERO_IMAGES[index].url
  }

  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Efectos de fondo - Desktop only */}
      {!isMobile && (
        <>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none" aria-hidden="true" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" aria-hidden="true" />
        </>
      )}

      <div className="relative z-10 w-full">
        <div className="container mx-auto px-4 py-6 sm:py-8 lg:py-16">
          
          {/* MOBILE LAYOUT */}
          {isMobile ? (
            <div className="space-y-5 max-w-lg mx-auto">
              
              {/* Header */}
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-2 bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 px-4 py-1.5 rounded-lg shadow-lg">
                  <span className="text-xl font-black text-white tracking-tight">AZUL COLCHONES</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 text-xs text-slate-300">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" aria-hidden="true" />
                  <span>{SITE_CONFIG.yearsExperience} años · {SITE_CONFIG.location}</span>
                </div>
              </div>

              {/* Título */}
              <div className="text-center space-y-3">
                <h1 className="text-[2rem] sm:text-4xl font-black leading-[1.1] tracking-tight">
                  <span className="block text-white mb-1">{SITE_CONFIG.tagline}</span>
                  <span className="block bg-gradient-to-r from-blue-400 via-blue-300 to-indigo-400 bg-clip-text text-transparent">{SITE_CONFIG.discount}</span>
                </h1>

                {/* Precio destacado */}
                <div className="inline-block w-full max-w-[280px]">
                  <div className="bg-gradient-to-br from-blue-600 to-blue-500 p-[2px] rounded-xl shadow-2xl shadow-blue-500/20">
                    <div className="bg-slate-900 rounded-[11px] px-4 py-3">
                      <div className="text-xs text-blue-400 font-semibold uppercase tracking-wider mb-0.5">Desde</div>
                      <div className="flex items-baseline justify-center gap-2 mb-1.5">
                        <span className="text-[2.25rem] font-black text-white leading-none">{SITE_CONFIG.priceFrom}</span>
                        <span className="text-base text-slate-500 line-through leading-none">{SITE_CONFIG.priceOriginal}</span>
                      </div>
                      <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-black px-2.5 py-1 rounded-full text-[11px] font-black shadow-md">
                        <Zap className="w-3 h-3" aria-hidden="true" />
                        <span>{SITE_CONFIG.discountPercent} OFF</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-slate-300 max-w-xs mx-auto leading-snug">
                  Directo de fábrica sin intermediarios
                  <span className="block text-white font-bold mt-0.5">AL MEJOR PRECIO</span>
                </p>
              </div>

              {/* CTAs - COHERENTE CON HEADER */}
              <div className="space-y-2.5 pt-1">
                
                {/* CTA 1: Stock Disponible - IGUAL QUE HEADER */}
                <a 
                  href="/catalogo" 
                  className="group block w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 active:scale-[0.98] text-white px-5 py-4 rounded-xl font-bold text-base shadow-2xl shadow-blue-500/30 transition-all duration-200 touch-manipulation"
                >
                  <div className="flex items-center justify-center gap-2.5">
                    <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" aria-hidden="true" />
                    <span>Stock Disponible</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                  </div>
                  <div className="text-xs text-blue-100 mt-1.5 font-normal">Entrega inmediata • Hasta 20% OFF</div>
                </a>

                {/* CTA 2: Pedido Fábrica - IGUAL QUE HEADER */}
                <a 
                  href="/piero-fabrica" 
                  className="group block w-full bg-slate-800/50 hover:bg-slate-700/50 active:scale-[0.98] border-2 border-slate-600/40 text-white px-4 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 touch-manipulation"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="w-4 h-4 text-orange-400 group-hover:scale-110 transition-transform" aria-hidden="true" />
                    <span>Pedido de Fábrica</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">7-10 días • Mejor precio (-40%)</div>
                </a>

                {/* CTA 3: WhatsApp */}
                <a 
                  href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Hola!%20Quiero%20consultar%20sobre%20colchones%20Piero`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white px-4 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 touch-manipulation shadow-lg shadow-emerald-500/20"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span>Consultar WhatsApp</span>
                </a>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center justify-center gap-3 text-xs pt-1">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Truck className="w-3.5 h-3.5 text-blue-400" aria-hidden="true" />
                  <span>Envío Gratis</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                  <span>12 cuotas s/int</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" aria-hidden="true" />
                  <span>Garantía 5 años</span>
                </div>
              </div>

              {/* Imagen */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-slate-700/50 shadow-2xl">
                {!imageLoaded[0] && !imageError[0] && (
                  <div className="absolute inset-0 bg-slate-800 animate-pulse" />
                )}
                <img 
                  src={getImageUrl(0)} 
                  alt={HERO_IMAGES[0].alt} 
                  className={`w-full h-full object-cover transition-opacity duration-500 ${
                    imageLoaded[0] ? 'opacity-100' : 'opacity-0'
                  }`} 
                  loading="eager"
                />
                <div className="absolute top-3 right-3 bg-gradient-to-br from-amber-400 to-orange-500 px-2.5 py-1.5 rounded-lg shadow-lg">
                  <div className="text-white text-[10px] font-bold uppercase leading-none">Hasta</div>
                  <div className="text-white text-xl font-black leading-none mt-0.5">60%</div>
                </div>
              </div>
            </div>
          ) : (
            // DESKTOP LAYOUT
            <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center max-w-7xl mx-auto">
              
              {/* LEFT COLUMN - Content */}
              <div className="space-y-8">
                
                {/* Brand */}
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 px-4 py-2 rounded-lg shadow-lg">
                    <span className="text-4xl font-black text-white tracking-tight">AZUL COLCHONES</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" aria-hidden="true" />
                    <span>{SITE_CONFIG.yearsExperience} años en {SITE_CONFIG.location}</span>
                  </div>
                </div>

                {/* Headline */}
                <div>
                  <h1 className="text-6xl xl:text-7xl font-black leading-tight tracking-tight">
                    <span className="block text-white mb-2">{SITE_CONFIG.tagline}</span>
                    <span className="block bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">{SITE_CONFIG.discount}</span>
                  </h1>
                </div>

                <p className="text-xl text-slate-300 max-w-xl">
                  Directo de fábrica sin intermediarios
                  <span className="block text-white font-semibold mt-1">AL MEJOR PRECIO</span>
                </p>

                {/* Price Card */}
                <div className="inline-block">
                  <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
                    <div className="flex items-center gap-6">
                      <div>
                        <div className="text-sm text-blue-400 font-semibold mb-1">Desde</div>
                        <div className="text-6xl font-black text-white">{SITE_CONFIG.priceFrom}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl text-slate-500 line-through">{SITE_CONFIG.priceOriginal}</div>
                        <div className="mt-1 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold rounded-md">-{SITE_CONFIG.discountPercent} OFF</div>
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-emerald-400 font-semibold">💳 12 cuotas sin interés</div>
                  </div>
                </div>

                {/* CTAs - COHERENTE CON HEADER */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    
                    {/* CTA 1: Stock Disponible - COHERENTE */}
                    <a 
                      href="/catalogo" 
                      className="group relative bg-gradient-to-br from-blue-950/80 to-blue-900/60 backdrop-blur-xl border-2 border-blue-500/30 hover:border-blue-400/60 rounded-xl p-5 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-blue-500/20"
                    >
                      {/* Badge HOT - IGUAL QUE HEADER */}
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-[10px] font-black px-2 py-1 rounded-full uppercase shadow-lg animate-pulse">
                        HOT
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-400/30">
                          <Zap className="w-6 h-6 text-blue-400" aria-hidden="true" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-bold text-base mb-1">Stock Disponible</h3>
                          <p className="text-sm text-slate-300 mb-2">Entrega inmediata • Hasta 20% OFF</p>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-emerald-400 font-semibold">Hoy mismo</span>
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform flex-shrink-0 mt-1" aria-hidden="true" />
                      </div>
                    </a>

                    {/* CTA 2: Pedido Fábrica - COHERENTE */}
                    <a 
                      href="/piero-fabrica" 
                      className="group relative bg-gradient-to-br from-orange-950/80 to-red-900/60 backdrop-blur-xl border-2 border-orange-500/30 hover:border-orange-400/60 rounded-xl p-5 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-orange-500/20"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center border border-orange-400/30">
                          <Clock className="w-6 h-6 text-orange-400" aria-hidden="true" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-bold text-base mb-1">Pedido Fábrica</h3>
                          <p className="text-sm text-slate-300 mb-2">7-10 días • Mejor precio</p>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-orange-400 font-bold">30-40% OFF</span>
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-orange-400 group-hover:translate-x-1 transition-transform flex-shrink-0 mt-1" aria-hidden="true" />
                      </div>
                    </a>
                  </div>

                  {/* WhatsApp CTA */}
                  <a 
                    href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Hola!%20Quiero%20consultar%20sobre%20colchones%20Piero`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-xl font-bold text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    <span>Asesoramiento WhatsApp</span>
                  </a>
                </div>

                {/* Trust badges */}
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Truck className="w-4 h-4 text-blue-400" aria-hidden="true" />
                    <span>Envío Gratis</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-blue-400" aria-hidden="true" />
                    <span>Garantía 5 años</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <ShieldCheck className="w-4 h-4 text-blue-400" aria-hidden="true" />
                    <span>Pago Seguro</span>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN - Visual */}
              <div className="relative">
                <div className="absolute -inset-8 bg-blue-500/20 rounded-[3rem] blur-[100px] opacity-60 pointer-events-none" aria-hidden="true" />
                <div className="relative bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl overflow-hidden p-3 shadow-2xl">
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950">
                    {!imageLoaded[currentImage] && !imageError[currentImage] && (
                      <div className="absolute inset-0 bg-slate-800 animate-pulse" />
                    )}
                    
                    <img 
                      key={currentImage}
                      src={getImageUrl(currentImage)} 
                      alt={HERO_IMAGES[currentImage].alt} 
                      className={`w-full h-full object-cover transition-opacity duration-700 ${
                        imageLoaded[currentImage] ? 'opacity-100' : 'opacity-0'
                      }`} 
                      loading="eager"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <div className="absolute top-4 right-4 bg-gradient-to-br from-amber-400 to-orange-500 px-4 py-3 rounded-lg shadow-lg">
                      <div className="text-white text-xs font-bold uppercase leading-none">Hasta</div>
                      <div className="text-white text-2xl font-black leading-none mt-0.5">60%</div>
                    </div>
                    
                    {/* Indicadores */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {HERO_IMAGES.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImage(index)}
                          className={`h-1.5 rounded-full transition-all ${
                            index === currentImage 
                              ? 'w-8 bg-white' 
                              : 'w-1.5 bg-white/40 hover:bg-white/60'
                          }`}
                          aria-label={`Ver imagen ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Features cards */}
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