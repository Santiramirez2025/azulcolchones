'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Brain, ArrowRight, CheckCircle2, Clock, Shield, Zap } from 'lucide-react'
import { useState, useEffect, memo } from 'react'

// Features compactos y claros
const CTA_FEATURES = [
  { icon: Clock, text: '2 minutos' },
  { icon: Brain, text: 'Personalizado' },
  { icon: Shield, text: 'Garantizado' },
  { icon: Zap, text: 'Resultado instant.' }
]

// Componente de feature optimizado con memo
const CTAFeature = memo(({ item, index }: { item: any, index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ delay: 0.5 + index * 0.08, duration: 0.4 }}
    className="flex items-center gap-1.5 sm:gap-2 bg-white/15 backdrop-blur-sm px-3 sm:px-4 py-2 sm:py-2.5 rounded-full border border-white/25"
  >
    <item.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" aria-hidden="true" />
    <span className="font-semibold text-xs sm:text-sm whitespace-nowrap">{item.text}</span>
  </motion.div>
))
CTAFeature.displayName = 'CTAFeature'

export function CTASection() {
  const [isMobile, setIsMobile] = useState(false)
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  // Detectar móvil y preferencias
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640)
    const checkMotion = () => setIsReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    
    checkMobile()
    checkMotion()
    
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const shouldAnimate = !isReducedMotion && !isMobile

  return (
    <section 
      className="relative py-12 sm:py-16 md:py-20 lg:py-28 overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Background base - colores Azul Colchones */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-700" />
      
      {/* Orbes animados - SOLO DESKTOP */}
      {shouldAnimate && (
        <div className="absolute inset-0 opacity-30">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/40 to-cyan-500/40 rounded-full mix-blend-screen filter blur-[100px]"
          />
          <motion.div
            animate={{ 
              scale: [1, 1.3, 1],
              x: [0, -80, 0],
              y: [0, 80, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-indigo-400/40 to-purple-500/40 rounded-full mix-blend-screen filter blur-[100px]"
          />
        </div>
      )}

      {/* Grid pattern - MÁS SUTIL EN MOBILE */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] sm:bg-[linear-gradient(rgba(255,255,255,.04)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(255,255,255,.04)_1.5px,transparent_1.5px)] bg-[size:48px_48px] sm:bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_50%,transparent_100%)]" />

      {/* Vignette sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.15)_100%)]" />

      <div className="relative container mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-5 sm:space-y-6 md:space-y-8"
        >
          {/* Título principal - RESPONSIVE */}
          <div className="space-y-3 sm:space-y-4 md:space-y-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.6 }}
            >
              <h2 
                id="cta-heading" 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.1] tracking-tight px-2"
              >
                <span className="block mb-1 sm:mb-2">Creamos un Test</span>
                <span className="relative inline-block">
                  Para elegir tu colchón
                  {shouldAnimate && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6, duration: 0.8 }}
                      className="absolute bottom-1 sm:bottom-2 left-0 right-0 h-1.5 sm:h-2 md:h-3 bg-white/30 blur-sm sm:blur-lg"
                      aria-hidden="true"
                    />
                  )}
                </span>
              </h2>
            </motion.div>
            
            {/* Subtítulo COMPACTO */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 max-w-2xl mx-auto leading-relaxed font-medium px-4"
            >
              Descubrí en <span className="font-bold text-white">2 minutos</span> qué colchón se adapta perfectamente a vos
            </motion.p>

            {/* Badge Villa María - COMPACTO */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex justify-center px-4"
            >
              <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/15 backdrop-blur-md px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-full border border-white/25">
                <span className="text-lg sm:text-xl" role="img" aria-label="Argentina">🇦🇷</span>
                <span className="text-white font-bold text-xs sm:text-sm">
                  Villa María · 35+ años
                </span>
              </div>
            </motion.div>
          </div>

          {/* CTA Button principal - OPTIMIZADO MOBILE */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5, type: "spring", bounce: 0.3 }}
            className="pt-2 sm:pt-3 md:pt-4 px-4"
          >
            <Link
              href="/simulador"
              prefetch={true}
              className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 bg-white text-blue-600 px-6 sm:px-8 md:px-10 lg:px-12 py-4 sm:py-5 md:py-6 rounded-xl sm:rounded-2xl font-black text-base sm:text-lg md:text-xl lg:text-2xl shadow-2xl hover:shadow-white/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto max-w-md mx-auto"
              aria-label="Hacer test de colchón personalizado ahora"
            >
              {/* Efecto hover - SOLO DESKTOP */}
              {!isMobile && (
                <div className="absolute inset-0 bg-gradient-to-r from-white via-blue-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl sm:rounded-2xl" />
              )}
              
              <Brain className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 group-hover:scale-110 transition-transform flex-shrink-0" aria-hidden="true" />
              <span className="relative z-10">Hacer test ahora</span>
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 group-hover:translate-x-1 transition-transform flex-shrink-0" aria-hidden="true" />
            </Link>
          </motion.div>

          {/* WhatsApp alternativo - MEJOR VISIBLE */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex justify-center px-4"
          >
            <Link
              href="https://wa.me/5493534017332?text=Hola!%20Quiero%20saber%20más%20sobre%20colchones"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 sm:gap-2 text-white/90 hover:text-white font-semibold text-sm sm:text-base transition-all"
            >
              <span>O hablá con nosotros por WhatsApp</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Features list - GRID RESPONSIVE */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center items-center gap-2 sm:gap-3 md:gap-4 pt-4 sm:pt-6 text-white/95 px-4 max-w-2xl mx-auto">
            {CTA_FEATURES.map((item, index) => (
              <CTAFeature key={index} item={item} index={index} />
            ))}
          </div>

          {/* Trust indicators - COMPACTOS */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-6 pt-4 sm:pt-6 text-white/80 text-xs sm:text-sm px-4"
          >
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/90" />
              <span>Sin compromiso</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-white/40 rounded-full" />
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/90" />
              <span>100% gratis</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-white/40 rounded-full" />
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/90" />
              <span>Envío incluido</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Efectos de brillo - MÁS SUTILES EN MOBILE */}
      <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-gradient-to-br from-cyan-400/15 to-transparent rounded-full blur-[80px] sm:blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-gradient-to-tl from-blue-400/15 to-transparent rounded-full blur-[80px] sm:blur-[100px] pointer-events-none" />
    </section>
  )
}