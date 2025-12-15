'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Star, Truck, CheckCircle2, ShieldCheck } from 'lucide-react'
import { useState, useEffect, useCallback } from 'react'

// ============================================================================
// IMÁGENES OPTIMIZADAS - WebP con fallback
// ============================================================================
const CAROUSEL_IMAGES = [
  {
    url: '/images/optimized/piero-spring-1.webp',
    fallback: '/images/piero-spring-1.jpg',
    alt: 'Colchón Piero Spring con resortes Ultra Coil - Villa María',
    title: 'Piero Spring',
    subtitle: 'Resortes Ultra Coil',
    width: 1200,
    height: 800,
  },
  {
    url: '/images/optimized/piero-foam-1.webp',
    fallback: '/images/piero-foam-1.jpg',
    alt: 'Colchón Piero Foam alta densidad - Villa María',
    title: 'Piero Foam',
    subtitle: 'Alta Densidad',
    width: 1200,
    height: 800,
  },
  {
    url: '/images/optimized/piero-bahia-1.webp',
    fallback: '/images/piero-bahia-1.jpg',
    alt: 'Colchón Piero Bahía Euro Pillow - Villa María',
    title: 'Piero Bahía',
    subtitle: 'Euro Pillow',
    width: 1200,
    height: 800,
  },
  {
    url: '/images/optimized/piero-mattina-1.webp',
    fallback: '/images/piero-mattina-1.jpg',
    alt: 'Colchón Piero Mattina 30cm premium - Villa María',
    title: 'Piero Mattina',
    subtitle: '30cm Premium',
    width: 1200,
    height: 800,
  },
] as const

// ============================================================================
// HERO SECTION - ULTRA OPTIMIZADO ⚡
// ============================================================================
export function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(false) // ✅ Desactivado por defecto
  const [isMobile, setIsMobile] = useState(false)
  const [imageError, setImageError] = useState<Record<number, boolean>>({})
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({})

  // ============================================================================
  // DETECT MOBILE - Optimizado
  // ============================================================================
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      // ✅ Solo autoplay en desktop
      setIsAutoPlaying(!mobile)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // ============================================================================
  // AUTOPLAY - Solo desktop
  // ============================================================================
  useEffect(() => {
    if (!isAutoPlaying || isMobile) return
    
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % CAROUSEL_IMAGES.length)
    }, 6000) // ✅ 6s en lugar de 5s (menos agresivo)
    
    return () => clearInterval(interval)
  }, [isAutoPlaying, isMobile])

  // ============================================================================
  // CAROUSEL CONTROLS - Memoized
  // ============================================================================
  const goToNext = useCallback(() => {
    setCurrentImage((prev) => (prev + 1) % CAROUSEL_IMAGES.length)
    setIsAutoPlaying(false)
  }, [])

  const goToPrev = useCallback(() => {
    setCurrentImage((prev) => (prev - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length)
    setIsAutoPlaying(false)
  }, [])

  const goToSlide = useCallback((index: number) => {
    setCurrentImage(index)
    setIsAutoPlaying(false)
  }, [])

  const handleImageError = useCallback((index: number) => {
    setImageError(prev => ({ ...prev, [index]: true }))
  }, [])

  const handleImageLoad = useCallback((index: number) => {
    setImagesLoaded(prev => ({ ...prev, [index]: true }))
  }, [])

  return (
    <section 
      className="relative min-h-screen flex items-center overflow-hidden bg-slate-950"
      id="hero-heading"
      aria-labelledby="hero-title"
    >
      
      {/* ================================================================ */}
      {/* BACKGROUND - Simplificado para mobile */}
      {/* ================================================================ */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        {!isMobile && (
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px]" />
        )}
      </div>

      <div className="relative z-10 w-full">
        <div className="container mx-auto px-4 py-6 sm:px-6 sm:py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-center max-w-7xl mx-auto">
            
            {/* ============================================================ */}
            {/* CONTENIDO - Sin animaciones bloqueantes */}
            {/* ============================================================ */}
            <div className="text-center lg:text-left space-y-4 sm:space-y-6 order-2 lg:order-1">
              
              {/* Logo PIERO */}
              <div className="space-y-2 sm:space-y-3">
                <div className="inline-flex items-center gap-2 bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 px-3 py-2 rounded-lg">
                  <span className="text-xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                    PIERO
                  </span>
                  <div className="h-4 sm:h-6 w-px bg-slate-600" />
                  <span className="text-blue-400 font-semibold text-xs" aria-label="Marca Argentina">
                    🇦🇷
                  </span>
                </div>

                {/* Trust badge */}
                <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-slate-300">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400 fill-amber-400" aria-hidden="true" />
                  <span>40+ años · +100K clientes</span>
                </div>
              </div>

              {/* ✅ H1 OPTIMIZADO SEO */}
              <div>
                <h1 
                  id="hero-title"
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight tracking-tight"
                >
                  <span className="block text-white mb-1 sm:mb-2">
                    Ofertas fin de año
                  </span>
                  <span className="block bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                    Hasta 50% OFF
                  </span>
                </h1>
              </div>

              {/* Subtítulo */}
              <p className="text-sm sm:text-lg lg:text-xl text-slate-300 max-w-xl mx-auto lg:mx-0">
                Los mejores colchones de Argentina
                <span className="block text-white font-semibold mt-1">AL MEJOR PRECIO</span>
              </p>

              {/* PRECIO */}
              <div className="inline-block w-full sm:w-auto">
                <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4 sm:p-6 lg:p-8">
                  <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 justify-center lg:justify-start">
                    <div>
                      <div className="text-xs sm:text-sm text-blue-400 font-semibold mb-1">
                        Desde
                      </div>
                      <div className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white">
                        $220K
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-base sm:text-lg lg:text-xl text-slate-500 line-through">
                        $552K
                      </div>
                      <div className="mt-1 px-2 sm:px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs sm:text-sm font-bold rounded-md">
                        -60% OFF
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-green-400 font-semibold text-center lg:text-left">
                    💳 6 cuotas sin interés
                  </div>
                </div>
              </div>

              {/* CTA BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <Link 
                  href="/catalogo"
                  className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                  aria-label="Ver colección completa de colchones Piero"
                >
                  <span>Ver Colección</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="https://wa.me/5493534017332?text=Hola!%20Quiero%20info%20sobre%20colchones%20Piero"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                  aria-label="Consultar por WhatsApp sobre colchones Piero"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span>WhatsApp</span>
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-4 sm:pt-6 text-xs sm:text-sm">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Truck className="w-4 h-4 text-blue-400" aria-hidden="true" />
                  <span>Envío Gratis</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" aria-hidden="true" />
                  <span>Garantía 5 años</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-blue-400" aria-hidden="true" />
                  <span>Pago Seguro</span>
                </div>
              </div>
            </div>

            {/* ============================================================ */}
            {/* CAROUSEL - OPTIMIZADO PERFORMANCE ⚡ */}
            {/* ============================================================ */}
            <div className="relative order-1 lg:order-2 w-full max-w-md mx-auto lg:max-w-none">
              
              {/* Glow - Solo desktop */}
              {!isMobile && (
                <div className="absolute -inset-8 bg-blue-500/20 rounded-[3rem] blur-[100px] opacity-60" aria-hidden="true" />
              )}
              
              {/* Container */}
              <div className="relative bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl sm:rounded-3xl overflow-hidden p-2 sm:p-3 shadow-2xl">
                
                {/* ✅ IMAGEN CON PRIORITY + OPTIMIZACIÓN */}
                <div className="relative w-full aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-slate-950">
                  
                  {/* Imagen actual */}
                  <Image 
                    src={imageError[currentImage] 
                      ? CAROUSEL_IMAGES[currentImage].fallback 
                      : CAROUSEL_IMAGES[currentImage].url
                    }
                    alt={CAROUSEL_IMAGES[currentImage].alt}
                    fill
                    priority={true} // ✅ CRITICAL: Preload hero image
                    quality={85}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                    className={`object-cover transition-opacity duration-500 ${
                      imagesLoaded[currentImage] ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => handleImageLoad(currentImage)}
                    onError={() => handleImageError(currentImage)}
                  />

                  {/* ✅ PRELOAD próxima imagen en background */}
                  {!isMobile && (
                    <div className="hidden">
                      <Image 
                        src={CAROUSEL_IMAGES[(currentImage + 1) % CAROUSEL_IMAGES.length].url}
                        alt=""
                        width={1200}
                        height={800}
                        quality={85}
                        onError={() => handleImageError((currentImage + 1) % CAROUSEL_IMAGES.length)}
                      />
                    </div>
                  )}

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                  {/* Info overlay */}
                  <div className="absolute top-2 sm:top-4 left-2 sm:left-4 right-2 sm:right-4 z-20">
                    <div className="flex items-center justify-between">
                      <div className="bg-black/60 backdrop-blur-xl px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg">
                        <div className="text-white text-xs sm:text-sm font-bold">
                          {CAROUSEL_IMAGES[currentImage].title}
                        </div>
                        <div className="text-slate-300 text-[10px] sm:text-xs">
                          {CAROUSEL_IMAGES[currentImage].subtitle}
                        </div>
                      </div>
                      <div className="bg-black/60 backdrop-blur-xl px-2 py-1 sm:px-3 sm:py-2 rounded-lg text-white text-xs sm:text-sm font-semibold">
                        {currentImage + 1}/{CAROUSEL_IMAGES.length}
                      </div>
                    </div>
                  </div>

                  {/* Navigation dots */}
                  <div className="absolute bottom-3 sm:bottom-4 left-0 right-0 flex justify-center gap-1.5 sm:gap-2 z-20">
                    {CAROUSEL_IMAGES.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`transition-all ${
                          currentImage === index
                            ? 'w-6 sm:w-8 h-1.5 sm:h-2 bg-white rounded-full'
                            : 'w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/40 hover:bg-white/60 rounded-full'
                        }`}
                        aria-label={`Ir a ${CAROUSEL_IMAGES[index].title}`}
                        aria-current={currentImage === index}
                      />
                    ))}
                  </div>

                  {/* Discount badge */}
                  <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-gradient-to-br from-amber-400 to-orange-500 px-2.5 py-2 sm:px-4 sm:py-3 rounded-lg shadow-lg z-20">
                    <div className="text-white text-[10px] sm:text-xs font-bold uppercase leading-none">
                      Hasta
                    </div>
                    <div className="text-white text-xl sm:text-2xl font-black leading-none mt-0.5">
                      40%
                    </div>
                  </div>
                </div>

                {/* Specs */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-2 sm:mt-4">
                  <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 p-2 sm:p-3 rounded-lg sm:rounded-xl text-center">
                    <div className="text-blue-400 text-[10px] sm:text-xs font-semibold">
                      Resortes
                    </div>
                    <div className="text-white text-xs sm:text-sm font-bold mt-0.5">
                      Pocket
                    </div>
                  </div>
                  <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 p-2 sm:p-3 rounded-lg sm:rounded-xl text-center">
                    <div className="text-blue-400 text-[10px] sm:text-xs font-semibold">
                      Memory
                    </div>
                    <div className="text-white text-xs sm:text-sm font-bold mt-0.5">
                      Foam
                    </div>
                  </div>
                  <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 p-2 sm:p-3 rounded-lg sm:rounded-xl text-center">
                    <div className="text-blue-400 text-[10px] sm:text-xs font-semibold">
                      Garantía
                    </div>
                    <div className="text-white text-xs sm:text-sm font-bold mt-0.5">
                      5 años
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}