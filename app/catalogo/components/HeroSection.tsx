import React, { RefObject, useMemo } from 'react'
import { motion, MotionValue } from 'framer-motion'
import { Sparkles, ArrowRight } from 'lucide-react'
import { formatARS } from '@/lib/utils/currency'

interface HeroSectionProps {
  heroRef: RefObject<HTMLDivElement>
  heroY: MotionValue<string>
  heroOpacity: MotionValue<number>
  heroScale: MotionValue<number>
  scrollToProducts: () => void
  avgPrice: number
}

export default function HeroSection({ 
  heroRef, 
  heroY, 
  heroOpacity, 
  heroScale, 
  scrollToProducts,
  avgPrice 
}: HeroSectionProps) {
  
  // 📊 Memoizar datos estáticos
  const heroData = useMemo(() => ({
    badge: 'Ofertas de liquidación 2025',
    title: 'Tu descanso merece lo mejor',
    subtitle: 'Una selección exclusiva de colchones premium y accesorios para el mejor descanso',
    cta: 'Explorar Catálogo',
    priceFrom: formatARS(avgPrice * 0.7),
  }), [avgPrice])
  
  return (
    <motion.section 
      ref={heroRef}
      style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
      className="relative min-h-[50vh] sm:min-h-[60vh] lg:min-h-[80vh] flex items-center overflow-hidden bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950"
      aria-label="Sección principal"
    >
      
      {/* ✅ Background optimizado - SIMPLE EN MOBILE */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Mobile: Gradiente simple sin animaciones */}
        <div className="sm:hidden absolute inset-0 bg-gradient-to-br from-violet-600/5 to-fuchsia-600/5" />
        
        {/* Desktop: Grid pattern */}
        <div className="hidden sm:block absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000,transparent)]" />
        
        {/* Desktop: Gradient Orbs - SOLO ≥1024px */}
        <div className="hidden lg:block absolute top-0 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
        <div className="hidden lg:block absolute bottom-0 right-1/4 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-3xl" />
        
        {/* Desktop: Partículas - SOLO ≥1024px, REDUCIDAS */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="hidden lg:block absolute w-1 h-1 bg-violet-400/30 rounded-full animate-float"
            style={{
              left: `${25 + (i * 25)}%`,
              top: `${30 + (i * 15)}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${8 + i * 2}s`
            }}
          />
        ))}
      </div>

      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Azul Colchones",
            "url": "https://azulcolchones.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://azulcolchones.com/catalogo?q={search_term}",
              "query-input": "required name=search_term"
            }
          })
        }}
      />

      {/* Content - ✅ PADDING OPTIMIZADO MOBILE */}
      <div className="relative z-10 w-full container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="max-w-5xl mx-auto text-center">
          
          {/* Badge - RESPONSIVE */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 backdrop-blur-sm mb-4 sm:mb-6 lg:mb-8">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-violet-400" aria-hidden="true" />
            <span className="text-xs sm:text-sm font-medium bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              {heroData.badge}
            </span>
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" aria-hidden="true" />
          </div>

          {/* Main Title - SEO + MOBILE OPTIMIZADO */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight mb-3 sm:mb-4 lg:mb-6">
            {/* Texto real para SEO */}
            <span className="sr-only">{heroData.title} - Azul Colchones Villa María</span>
            
            {/* Visual con gradiente */}
            <span className="block text-white drop-shadow-2xl" aria-hidden="true">
              Tu descanso 
            </span>
            <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent" aria-hidden="true">
              merece lo mejor
            </span>
          </h1>

          {/* Subtitle - RESPONSIVE */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-zinc-300 font-light max-w-3xl mx-auto mb-4 sm:mb-6 lg:mb-8 leading-relaxed">
            {heroData.subtitle}
            <span className="block mt-2 text-xs sm:text-sm text-zinc-400">
              Desde {heroData.priceFrom} • Envío gratis • 100 noches de prueba
            </span>
          </p>

          {/* CTA Button - ✅ TOUCH-FRIENDLY */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mb-8 sm:mb-12 lg:mb-16">
            <button
              onClick={scrollToProducts}
              className="w-full sm:w-auto group relative px-6 sm:px-8 lg:px-10 py-3.5 sm:py-4 lg:py-5 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl sm:rounded-2xl font-semibold text-white text-sm sm:text-base lg:text-lg overflow-hidden transition-all duration-300 shadow-lg shadow-violet-500/50 hover:shadow-2xl hover:shadow-violet-500/60 focus:outline-none focus:ring-4 focus:ring-violet-500/50 active:scale-95 min-h-[48px]"
              aria-label="Explorar catálogo de colchones"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {heroData.cta}
                <ArrowRight 
                  className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" 
                  aria-hidden="true"
                />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>

          {/* Social Proof - RESPONSIVE */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-8 text-xs sm:text-sm text-zinc-400">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-violet-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span><strong className="text-white">4.8</strong> valoración</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-violet-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span><strong className="text-white">+5,000</strong> clientes</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-violet-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span><strong className="text-white">35+</strong> años</span>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll Indicator - ✅ SOLO DESKTOP */}
      <div 
        className="hidden sm:flex absolute bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 animate-bounce"
        aria-hidden="true"
      >
        <div className="w-6 h-10 border-2 border-zinc-700 rounded-full p-1">
          <div className="w-1.5 h-3 bg-violet-400 rounded-full animate-scroll" />
        </div>
        <span className="text-xs text-zinc-500 font-medium">Desliza</span>
      </div>

      {/* Estilos optimizados con prefers-reduced-motion */}
      <style jsx>{`
        @media (prefers-reduced-motion: no-preference) {
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          .animate-float {
            animation: float linear infinite;
          }
          
          @keyframes scroll {
            0% { transform: translateY(0); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateY(100%); opacity: 0; }
          }
          .animate-scroll {
            animation: scroll 2s ease-in-out infinite;
          }
        }
        
        /* Desactivar todas las animaciones si el usuario prefiere menos movimiento */
        @media (prefers-reduced-motion: reduce) {
          .animate-float,
          .animate-scroll,
          .animate-bounce,
          .animate-pulse {
            animation: none !important;
          }
        }
      `}</style>
    </motion.section>
  )
}