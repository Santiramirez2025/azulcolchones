'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Star, ChevronLeft, ChevronRight, CheckCircle2, Truck, ShieldCheck } from 'lucide-react'
import { useState, useEffect } from 'react'

// 🎯 IMÁGENES CAROUSEL - USANDO RUTAS CORRECTAS
const CAROUSEL_IMAGES = [
  {
    url: '/images/piero-spring-1.jpg',
    alt: 'Colchón Piero Spring',
    title: 'Piero Spring',
    subtitle: 'Resortes Pocket',
    fallback: '/images/products/piero-spring.jpg'
  },
  {
    url: '/images/piero-foam-1.jpg',
    alt: 'Colchón Piero Foam',
    title: 'Piero Foam',
    subtitle: 'Alta Densidad',
    fallback: '/images/products/piero-foam.jpg'
  },
  {
    url: '/images/piero-bahia-1.jpg',
    alt: 'Colchón Piero Bahía',
    title: 'Piero Bahía',
    subtitle: 'Euro Pillow',
    fallback: '/images/products/piero-bahia.jpg'
  },
  {
    url: '/images/piero-mattina-1.jpg',
    alt: 'Colchón Piero Mattina',
    title: 'Piero Mattina',
    subtitle: '30cm Premium',
    fallback: '/images/products/piero-mattina.jpg'
  }
]

// 📊 SEO ESTRUCTURADO
const productStructuredData = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Colchones Piero Premium",
  "description": "Colchones Piero en Villa María. Marca líder argentina. Envío gratis.",
  "brand": { "@type": "Brand", "name": "Piero" },
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "ARS",
    "lowPrice": "220000",
    "highPrice": "991000"
  }
}

export function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [imageError, setImageError] = useState<Record<number, boolean>>({})

  // Detectar móvil
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % CAROUSEL_IMAGES.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  // Navegación
  const goToNext = () => {
    setCurrentImage((prev) => (prev + 1) % CAROUSEL_IMAGES.length)
    setIsAutoPlaying(false)
  }

  const goToPrev = () => {
    setCurrentImage((prev) => (prev - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentImage(index)
    setIsAutoPlaying(false)
  }

  // Handle image error
  const handleImageError = (index: number) => {
    setImageError(prev => ({ ...prev, [index]: true }))
  }

  return (
    <>
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productStructuredData) }}
      />

      <section className="relative min-h-[100dvh] flex items-center overflow-hidden bg-slate-950">
        
        {/* 🌌 BACKGROUND MINIMALISTA */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,.02)_1px,transparent_1px)] bg-[size:64px_64px] opacity-50" />
        </div>

        <div className="relative z-10 w-full">
          <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-20">
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-center max-w-7xl mx-auto">
              
              {/* 👈 CONTENIDO - OPTIMIZADO MOBILE */}
              <div className="text-center lg:text-left space-y-4 sm:space-y-6 order-2 lg:order-1">
                
                {/* Logo + Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-3"
                >
                  {/* Logo PIERO compacto mobile */}
                  <div className="inline-flex items-center gap-2 sm:gap-3 bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 px-3 sm:px-5 py-2 sm:py-3 rounded-lg sm:rounded-xl">
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">PIERO</span>
                    <div className="h-5 sm:h-6 w-px bg-slate-600" />
                    <span className="text-blue-400 font-semibold text-xs sm:text-sm">🇦🇷 Argentina</span>
                  </div>

                  {/* Trust badge */}
                  <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400 fill-amber-400" />
                    <span>40+ años · +100K clientes</span>
                  </div>
                </motion.div>

                {/* Título RESPONSIVE */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.6 }}
                >
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight tracking-tight">
                    <span className="block text-white mb-1 sm:mb-2">
                      Ofertas fin de año
                    </span>
                    <span className="block bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                      Hasta 50% OFF
                    </span>
                  </h1>
                </motion.div>

                {/* Subtítulo COMPACTO */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.6 }}
                  className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-xl mx-auto lg:mx-0"
                >
                  Los mejores colchones de Argentina
                  <span className="block text-white font-semibold mt-1">AL MEJOR PRECIO</span>
                </motion.p>

                {/* PRECIO COMPACTO MOBILE */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.6 }}
                  className="inline-block w-full sm:w-auto"
                >
                  <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8">
                    <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 justify-center lg:justify-start">
                      <div>
                        <div className="text-xs sm:text-sm text-blue-400 font-semibold mb-1">Desde</div>
                        <div className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white">$220K</div>
                      </div>
                      <div className="text-right">
                        <div className="text-base sm:text-lg lg:text-xl text-slate-500 line-through">$552K</div>
                        <div className="mt-1 px-2 sm:px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] sm:text-xs font-bold rounded-md sm:rounded-lg">
                          -60% OFF
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-green-400 font-semibold text-center lg:text-left">
                      💳 6 cuotas de $36.666 sin interés
                    </div>
                  </div>
                </motion.div>

                {/* CTA BUTTONS - STACK EN MOBILE */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.6 }}
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
                >
                  <Link 
                    href="/catalogo"
                    className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
                  >
                    <span>Ver Colección</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href="https://wa.me/5493534017332?text=Hola!%20Quiero%20info%20sobre%20colchones%20Piero"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300"
                  >
                    <span>WhatsApp</span>
                  </Link>
                </motion.div>

                {/* Trust indicators COMPACTOS */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.55 }}
                  className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-4 sm:pt-6 text-xs sm:text-sm"
                >
                  <div className="flex items-center gap-1.5 sm:gap-2 text-slate-300">
                    <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" />
                    <span>Envío Gratis</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" />
                    <span>Garantía</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 text-slate-300">
                    <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" />
                    <span>Pago Seguro</span>
                  </div>
                </motion.div>
              </div>

              {/* 👉 CAROUSEL OPTIMIZADO MOBILE */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="relative order-1 lg:order-2 w-full max-w-lg mx-auto lg:max-w-none"
              >
                {/* Glow sutil */}
                <div className="absolute -inset-4 sm:-inset-8 bg-blue-500/20 rounded-2xl sm:rounded-[3rem] blur-[60px] sm:blur-[100px] opacity-60" />
                
                {/* Container COMPACTO EN MOBILE */}
                <div className="relative bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl sm:rounded-3xl overflow-hidden p-2 sm:p-3 shadow-2xl">
                  
                  {/* Carousel - ASPECT RATIO AJUSTADO */}
                  <div className="relative w-full aspect-[4/3] sm:aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-slate-950">
                    
                    {/* Imágenes con Fallback */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentImage}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0"
                      >
                        <Image 
                          src={imageError[currentImage] 
                            ? CAROUSEL_IMAGES[currentImage].fallback 
                            : CAROUSEL_IMAGES[currentImage].url
                          }
                          alt={CAROUSEL_IMAGES[currentImage].alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 95vw, (max-width: 1024px) 50vw, 40vw"
                          priority={currentImage === 0}
                          quality={85}
                          onError={() => handleImageError(currentImage)}
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Overlay sutil */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                    {/* Controles DESKTOP ONLY */}
                    {!isMobile && (
                      <>
                        <button
                          onClick={goToPrev}
                          className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white rounded-lg sm:rounded-xl transition-all z-20"
                          aria-label="Anterior"
                        >
                          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                        <button
                          onClick={goToNext}
                          className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white rounded-lg sm:rounded-xl transition-all z-20"
                          aria-label="Siguiente"
                        >
                          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                      </>
                    )}

                    {/* Info overlay COMPACTO */}
                    <div className="absolute top-2 sm:top-4 left-2 sm:left-4 right-2 sm:right-4 z-20">
                      <div className="flex items-center justify-between">
                        <div className="bg-black/60 backdrop-blur-xl px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-md sm:rounded-lg">
                          <div className="text-white text-xs sm:text-sm font-bold">
                            {CAROUSEL_IMAGES[currentImage].title}
                          </div>
                          <div className="text-slate-300 text-[10px] sm:text-xs">
                            {CAROUSEL_IMAGES[currentImage].subtitle}
                          </div>
                        </div>
                        <div className="bg-black/60 backdrop-blur-xl px-2 sm:px-3 py-1 sm:py-2 rounded-md sm:rounded-lg text-white text-xs sm:text-sm font-semibold">
                          {currentImage + 1}/{CAROUSEL_IMAGES.length}
                        </div>
                      </div>
                    </div>

                    {/* Dots POSICIONADOS CORRECTAMENTE */}
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
                          aria-label={`Ir a imagen ${index + 1}`}
                        />
                      ))}
                    </div>

                    {/* Badge descuento COMPACTO */}
                    <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-gradient-to-br from-amber-400 to-orange-500 px-2.5 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl shadow-lg z-20">
                      <div className="text-white text-[10px] sm:text-xs font-bold uppercase">Hasta</div>
                      <div className="text-white text-xl sm:text-2xl font-black leading-none">40%</div>
                    </div>
                  </div>

                  {/* Specs COMPACTOS */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-2 sm:mt-4">
                    <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 p-2 sm:p-3 rounded-lg sm:rounded-xl text-center">
                      <div className="text-blue-400 text-[10px] sm:text-xs font-semibold">Resortes</div>
                      <div className="text-white text-xs sm:text-sm font-bold mt-0.5 sm:mt-1">Pocket</div>
                    </div>
                    <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 p-2 sm:p-3 rounded-lg sm:rounded-xl text-center">
                      <div className="text-blue-400 text-[10px] sm:text-xs font-semibold">Memory</div>
                      <div className="text-white text-xs sm:text-sm font-bold mt-0.5 sm:mt-1">Foam</div>
                    </div>
                    <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 p-2 sm:p-3 rounded-lg sm:rounded-xl text-center">
                      <div className="text-blue-400 text-[10px] sm:text-xs font-semibold">Garantía</div>
                      <div className="text-white text-xs sm:text-sm font-bold mt-0.5 sm:mt-1">5 años</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}