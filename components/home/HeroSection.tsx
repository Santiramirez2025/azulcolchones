'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Star, ChevronLeft, ChevronRight, CheckCircle2, Truck, ShieldCheck } from 'lucide-react'
import { useState, useEffect } from 'react'

// 🎯 IMÁGENES CAROUSEL
const CAROUSEL_IMAGES = [
  {
    url: '/images/piero-spring-1.jpg',
    alt: 'Colchón Piero Spring',
    title: 'Piero Spring',
    subtitle: 'Resortes Ultra Coil',
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

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % CAROUSEL_IMAGES.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying])

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

  const handleImageError = (index: number) => {
    setImageError(prev => ({ ...prev, [index]: true }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productStructuredData) }}
      />

      {/* CRITICAL: Usar min-h-screen en lugar de min-h-[100dvh] para iPhone */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-950">
        
        {/* Background - MÁS SIMPLE EN MOBILE */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
          <div className="hidden sm:block absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 w-full">
          {/* CRITICAL: Padding ajustado para iPhone - más compacto */}
          <div className="container mx-auto px-4 py-6 sm:px-6 sm:py-12 lg:py-20">
            <div className="grid lg:grid-cols-2 gap-4 sm:gap-8 lg:gap-16 items-center max-w-7xl mx-auto">
              
              {/* CONTENIDO - ORDEN INVERTIDO EN MOBILE */}
              <div className="text-center lg:text-left space-y-3 sm:space-y-6 order-2 lg:order-1">
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-2 sm:space-y-3"
                >
                  {/* Logo PIERO - MÁS COMPACTO */}
                  <div className="inline-flex items-center gap-2 bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 px-3 py-2 rounded-lg">
                    <span className="text-xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">PIERO</span>
                    <div className="h-4 sm:h-6 w-px bg-slate-600" />
                    <span className="text-blue-400 font-semibold text-xs">🇦🇷</span>
                  </div>

                  {/* Trust badge - MÁS PEQUEÑO */}
                  <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-sm text-slate-300">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span>40+ años · +100K clientes</span>
                  </div>
                </motion.div>

                {/* Título - TAMAÑOS ESPECÍFICOS IPHONE */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.6 }}
                >
                  <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight tracking-tight">
                    <span className="block text-white mb-1">
                      Ofertas fin de año
                    </span>
                    <span className="block bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                      Hasta 50% OFF
                    </span>
                  </h1>
                </motion.div>

                {/* Subtítulo - MÁS PEQUEÑO */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.6 }}
                  className="text-sm sm:text-lg lg:text-xl text-slate-300 max-w-xl mx-auto lg:mx-0"
                >
                  Los mejores colchones de Argentina
                  <span className="block text-white font-semibold">AL MEJOR PRECIO</span>
                </motion.p>

                {/* PRECIO - MÁS COMPACTO */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.6 }}
                  className="inline-block w-full sm:w-auto"
                >
                  <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-xl p-3 sm:p-6 lg:p-8">
                    <div className="flex items-center gap-2 sm:gap-4 lg:gap-6 justify-center lg:justify-start">
                      <div>
                        <div className="text-[10px] sm:text-sm text-blue-400 font-semibold mb-0.5 sm:mb-1">Desde</div>
                        <div className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white">$220K</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm sm:text-lg lg:text-xl text-slate-500 line-through">$552K</div>
                        <div className="mt-0.5 sm:mt-1 px-2 py-0.5 sm:py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[9px] sm:text-xs font-bold rounded-md">
                          -60% OFF
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 sm:mt-4 text-[11px] sm:text-sm text-green-400 font-semibold text-center lg:text-left">
                      💳 6 cuotas sin interés
                    </div>
                  </div>
                </motion.div>

                {/* CTA BUTTONS - MÁS PEQUEÑOS */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.6 }}
                  className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center lg:justify-start"
                >
                  <Link 
                    href="/catalogo"
                    className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-5 py-2.5 sm:px-8 sm:py-4 rounded-lg sm:rounded-xl font-bold text-sm sm:text-lg shadow-lg transition-all duration-300"
                  >
                    <span>Ver Colección</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="https://wa.me/5493534017332?text=Hola!%20Quiero%20info%20sobre%20colchones%20Piero"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white px-5 py-2.5 sm:px-8 sm:py-4 rounded-lg sm:rounded-xl font-bold text-sm sm:text-lg shadow-lg transition-all duration-300"
                  >
                    <span>WhatsApp</span>
                  </Link>
                </motion.div>

                {/* Trust indicators - ULTRA COMPACTOS */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.55 }}
                  className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-6 pt-3 sm:pt-6 text-[11px] sm:text-sm"
                >
                  <div className="flex items-center gap-1 text-slate-300">
                    <Truck className="w-3 h-3 text-blue-400" />
                    <span>Envío Gratis</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-300">
                    <CheckCircle2 className="w-3 h-3 text-blue-400" />
                    <span>Garantía</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-300">
                    <ShieldCheck className="w-3 h-3 text-blue-400" />
                    <span>Pago Seguro</span>
                  </div>
                </motion.div>
              </div>

              {/* CAROUSEL - CRÍTICO PARA IPHONE */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="relative order-1 lg:order-2 w-full max-w-md mx-auto lg:max-w-none"
              >
                {/* Glow - SOLO DESKTOP */}
                <div className="hidden sm:block absolute -inset-8 bg-blue-500/20 rounded-[3rem] blur-[100px] opacity-60" />
                
                {/* Container - PADDING MÍNIMO EN MOBILE */}
                <div className="relative bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-xl sm:rounded-3xl overflow-hidden p-1.5 sm:p-3 shadow-2xl">
                  
                  {/* CRITICAL: aspect-[3/2] para que sea MÁS HORIZONTAL en iPhone */}
                  <div className="relative w-full aspect-[3/2] sm:aspect-[4/3] rounded-lg sm:rounded-2xl overflow-hidden bg-slate-950">
                    
                    {/* Imágenes */}
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
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                          priority={currentImage === 0}
                          quality={85}
                          onError={() => handleImageError(currentImage)}
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                    {/* Info overlay - MÁS COMPACTO */}
                    <div className="absolute top-1.5 sm:top-4 left-1.5 sm:left-4 right-1.5 sm:right-4 z-20">
                      <div className="flex items-center justify-between">
                        <div className="bg-black/60 backdrop-blur-xl px-2 py-1 sm:px-4 sm:py-2 rounded-md">
                          <div className="text-white text-[11px] sm:text-sm font-bold">
                            {CAROUSEL_IMAGES[currentImage].title}
                          </div>
                          <div className="text-slate-300 text-[9px] sm:text-xs">
                            {CAROUSEL_IMAGES[currentImage].subtitle}
                          </div>
                        </div>
                        <div className="bg-black/60 backdrop-blur-xl px-1.5 py-0.5 sm:px-3 sm:py-2 rounded-md text-white text-[10px] sm:text-sm font-semibold">
                          {currentImage + 1}/{CAROUSEL_IMAGES.length}
                        </div>
                      </div>
                    </div>

                    {/* Dots - BIEN POSICIONADOS */}
                    <div className="absolute bottom-2 sm:bottom-4 left-0 right-0 flex justify-center gap-1 sm:gap-2 z-20">
                      {CAROUSEL_IMAGES.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToSlide(index)}
                          className={`transition-all ${
                            currentImage === index
                              ? 'w-5 sm:w-8 h-1 sm:h-2 bg-white rounded-full'
                              : 'w-1 sm:w-2 h-1 sm:h-2 bg-white/40 hover:bg-white/60 rounded-full'
                          }`}
                          aria-label={`Ir a imagen ${index + 1}`}
                        />
                      ))}
                    </div>

                    {/* Badge - MÁS PEQUEÑO */}
                    <div className="absolute top-1.5 sm:top-4 right-1.5 sm:right-4 bg-gradient-to-br from-amber-400 to-orange-500 px-2 py-1.5 sm:px-4 sm:py-3 rounded-lg shadow-lg z-20">
                      <div className="text-white text-[9px] sm:text-xs font-bold uppercase leading-none">Hasta</div>
                      <div className="text-white text-lg sm:text-2xl font-black leading-none">40%</div>
                    </div>
                  </div>

                  {/* Specs - MÁS COMPACTOS */}
                  <div className="grid grid-cols-3 gap-1.5 sm:gap-3 mt-1.5 sm:mt-4">
                    <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 p-1.5 sm:p-3 rounded-md sm:rounded-xl text-center">
                      <div className="text-blue-400 text-[9px] sm:text-xs font-semibold">Resortes</div>
                      <div className="text-white text-[10px] sm:text-sm font-bold mt-0.5">Pocket</div>
                    </div>
                    <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 p-1.5 sm:p-3 rounded-md sm:rounded-xl text-center">
                      <div className="text-blue-400 text-[9px] sm:text-xs font-semibold">Memory</div>
                      <div className="text-white text-[10px] sm:text-sm font-bold mt-0.5">Foam</div>
                    </div>
                    <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 p-1.5 sm:p-3 rounded-md sm:rounded-xl text-center">
                      <div className="text-blue-400 text-[9px] sm:text-xs font-semibold">Garantía</div>
                      <div className="text-white text-[10px] sm:text-sm font-bold mt-0.5">5 años</div>
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