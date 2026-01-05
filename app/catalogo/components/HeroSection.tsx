import React, { RefObject, useMemo } from 'react'
import { motion, MotionValue } from 'framer-motion'
import { Zap, ArrowRight, Clock, Package, Award } from 'lucide-react'
import { formatARS } from '@/lib/utils/currency'
import Link from 'next/link'

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
  
  // 📊 Memoizar datos estáticos - PIERO PREMIUM
  const heroData = useMemo(() => ({
    badge: 'Marca Piero • Calidad Premium',
    title: 'Colchones Piero Premium',
    subtitle: 'Stock disponible con entrega inmediata en Villa María',
    eyebrow: 'ENTREGA INMEDIATA',
    cta: 'Ver Stock Disponible',
    priceFrom: formatARS(Math.floor(avgPrice * 0.8)), // 20% OFF
    originalPrice: formatARS(avgPrice),
    discount: '20',
    benefit: 'Llevátelo hoy mismo',
  }), [avgPrice])
  
  return (
    <motion.section 
      ref={heroRef}
      style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
      className="relative min-h-[50vh] sm:min-h-[60vh] lg:min-h-[75vh] flex items-center overflow-hidden bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950"
      aria-label="Colchones Piero Premium - Entrega Inmediata"
    >
      
      {/* ✅ Background optimizado - PIERO PREMIUM THEME */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Mobile: Gradiente simple azul */}
        <div className="sm:hidden absolute inset-0 bg-gradient-to-br from-blue-600/5 to-cyan-600/5" />
        
        {/* Desktop: Grid pattern */}
        <div className="hidden sm:block absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000,transparent)]" />
        
        {/* Desktop: Gradient Orbs - PREMIUM COLORS */}
        <div className="hidden lg:block absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="hidden lg:block absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl" />
        
        {/* Desktop: Partículas reducidas */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="hidden lg:block absolute w-1 h-1 bg-blue-400/30 rounded-full animate-float"
            style={{
              left: `${25 + (i * 25)}%`,
              top: `${30 + (i * 15)}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${8 + i * 2}s`
            }}
          />
        ))}
      </div>

      {/* Schema.org structured data - PIERO PREMIUM */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Store",
            "name": "Azul Colchones - Piero Premium",
            "description": "Colchones Piero Premium con hasta 20% de descuento y entrega inmediata",
            "url": "https://azulcolchones.com/catalogo",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Colchones Piero Premium",
              "itemListElement": [{
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Product",
                  "name": "Colchones Piero Premium",
                  "brand": {
                    "@type": "Brand",
                    "name": "Piero"
                  }
                },
                "price": avgPrice * 0.8,
                "priceCurrency": "ARS",
                "availability": "https://schema.org/InStock"
              }]
            }
          })
        }}
      />

      {/* Content - ✅ PIERO PREMIUM OPTIMIZADO */}
      <div className="relative z-10 w-full container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="max-w-5xl mx-auto">
          
          {/* Layout: 2 Columnas en Desktop */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* COLUMNA IZQUIERDA: Copy Principal */}
            <div className="text-center lg:text-left space-y-4 sm:space-y-6">
              
              {/* Eyebrow - ENTREGA INMEDIATA */}
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 backdrop-blur-sm animate-pulse-slow">
                <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" aria-hidden="true" fill="currentColor" />
                <span className="text-xs sm:text-sm font-bold text-blue-400 uppercase tracking-wide">
                  {heroData.eyebrow}
                </span>
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" aria-hidden="true" />
              </div>

              {/* Badge - MARCA PIERO */}
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-zinc-900/80 border border-zinc-700/50 backdrop-blur-sm">
                <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" aria-hidden="true" />
                <span className="text-xs sm:text-sm font-medium text-zinc-300">
                  {heroData.badge}
                </span>
              </div>

              {/* Main Title - SEO PIERO */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight">
                {/* Texto real para SEO */}
                <span className="sr-only">Colchones Piero Premium Villa María - Entrega Inmediata - Hasta 20% OFF</span>
                
                {/* Visual */}
                <span className="block text-white drop-shadow-2xl" aria-hidden="true">
                  {heroData.title}
                </span>
                <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent animate-gradient" aria-hidden="true">
                  {heroData.discount}% OFF
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base md:text-lg text-zinc-300 font-light leading-relaxed">
                {heroData.subtitle}
              </p>

              {/* Price Display - DESTACADO */}
              <div className="inline-block bg-gradient-to-br from-zinc-900/90 to-zinc-800/80 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-4 sm:p-6 shadow-2xl shadow-blue-500/10">
                <div className="flex items-baseline gap-3 sm:gap-4 justify-center lg:justify-start">
                  <div>
                    <div className="text-xs sm:text-sm text-blue-400 font-semibold mb-1">
                      Desde
                    </div>
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
                      {heroData.priceFrom}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-base sm:text-lg lg:text-xl text-zinc-500 line-through">
                      {heroData.originalPrice}
                    </div>
                    <div className="mt-1 px-2.5 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs sm:text-sm font-black rounded-md shadow-lg">
                      -{heroData.discount}%
                    </div>
                  </div>
                </div>
                <div className="mt-3 text-xs sm:text-sm text-emerald-400 font-semibold text-center lg:text-left flex items-center gap-2 justify-center lg:justify-start">
                  <Package className="w-4 h-4" aria-hidden="true" />
                  <span>{heroData.benefit}</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-2">
                <button
                  onClick={scrollToProducts}
                  className="w-full sm:w-auto group relative px-6 sm:px-8 lg:px-10 py-3.5 sm:py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl sm:rounded-2xl font-bold text-white text-sm sm:text-base lg:text-lg overflow-hidden transition-all duration-300 shadow-lg shadow-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/60 focus:outline-none focus:ring-4 focus:ring-blue-500/50 active:scale-95 min-h-[48px]"
                  aria-label="Ver stock disponible de colchones Piero"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {heroData.cta}
                    <ArrowRight 
                      className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" 
                      aria-hidden="true"
                    />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                <Link
                  href="/piero-fabrica"
                  className="w-full sm:w-auto group px-6 sm:px-8 lg:px-10 py-3.5 sm:py-4 bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700 rounded-xl sm:rounded-2xl font-semibold text-white text-sm sm:text-base transition-all duration-300 min-h-[48px] flex items-center justify-center gap-2"
                  aria-label="Ver pedidos directo de fábrica con mejor precio"
                >
                  <Clock className="w-4 h-4 text-orange-400" aria-hidden="true" />
                  <span className="text-zinc-400 group-hover:text-white transition-colors">
                    Pedido Fábrica
                  </span>
                  <span className="text-orange-400 font-bold">
                    30-40% OFF
                  </span>
                </Link>
              </div>

              {/* Info adicional */}
              <p className="text-xs sm:text-sm text-blue-400 font-medium flex items-center gap-2 justify-center lg:justify-start">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Stock real verificado online</span>
              </p>

            </div>

            {/* COLUMNA DERECHA: Trust Signals + Benefits */}
            <div className="space-y-4 sm:space-y-6">
              
              {/* Trust Badges Grid */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                
                <div className="bg-gradient-to-br from-zinc-900/80 to-zinc-800/60 backdrop-blur-xl border border-blue-500/20 rounded-xl p-4 sm:p-5 text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 bg-blue-500/10 rounded-lg flex items-center justify-center border border-blue-500/20">
                    <Package className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" aria-hidden="true" />
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-white mb-1">
                    Hoy
                  </div>
                  <div className="text-xs sm:text-sm text-zinc-400">
                    Te lo llevás
                  </div>
                </div>

                <div className="bg-gradient-to-br from-zinc-900/80 to-zinc-800/60 backdrop-blur-xl border border-blue-500/20 rounded-xl p-4 sm:p-5 text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 bg-blue-500/10 rounded-lg flex items-center justify-center border border-blue-500/20">
                    <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" aria-hidden="true" fill="currentColor" />
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-white mb-1">
                    20%
                  </div>
                  <div className="text-xs sm:text-sm text-zinc-400">
                    Descuento
                  </div>
                </div>

                <div className="bg-gradient-to-br from-zinc-900/80 to-zinc-800/60 backdrop-blur-xl border border-zinc-700/50 rounded-xl p-4 sm:p-5 text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 bg-emerald-500/10 rounded-lg flex items-center justify-center border border-emerald-500/20">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-white mb-1">
                    5 años
                  </div>
                  <div className="text-xs sm:text-sm text-zinc-400">
                    Garantía
                  </div>
                </div>

                <div className="bg-gradient-to-br from-zinc-900/80 to-zinc-800/60 backdrop-blur-xl border border-zinc-700/50 rounded-xl p-4 sm:p-5 text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 bg-purple-500/10 rounded-lg flex items-center justify-center border border-purple-500/20">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-white mb-1">
                    12
                  </div>
                  <div className="text-xs sm:text-sm text-zinc-400">
                    Cuotas s/int
                  </div>
                </div>

              </div>

              {/* Benefits List - PIERO PREMIUM */}
              <div className="bg-gradient-to-br from-zinc-900/60 to-zinc-800/40 backdrop-blur-xl border border-zinc-700/50 rounded-xl p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Beneficios Piero Premium
                </h3>
                <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-zinc-300">
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span><strong className="text-white">Retiro inmediato</strong> en Villa María</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span><strong className="text-white">Envío gratis</strong> en zona y Argentina</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span><strong className="text-white">Calidad Premium</strong> marca Piero</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span><strong className="text-white">12 cuotas</strong> sin interés</span>
                  </li>
                </ul>
              </div>

              {/* Social Proof Compact */}
              <div className="flex justify-center lg:justify-start items-center gap-4 sm:gap-6 text-xs sm:text-sm text-zinc-400 pt-2">
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span><strong className="text-white">4.9</strong>/5</span>
                </div>
                <div className="h-4 w-px bg-zinc-700" />
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-blue-400" aria-hidden="true" />
                  <span><strong className="text-white">35+</strong> años</span>
                </div>
                <div className="h-4 w-px bg-zinc-700" />
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span><strong className="text-white">+5K</strong> clientes</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Scroll Indicator - Solo Desktop */}
      <div 
        className="hidden sm:flex absolute bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 animate-bounce"
        aria-hidden="true"
      >
        <div className="w-6 h-10 border-2 border-zinc-700 rounded-full p-1">
          <div className="w-1.5 h-3 bg-blue-400 rounded-full animate-scroll" />
        </div>
        <span className="text-xs text-zinc-500 font-medium">Ver productos</span>
      </div>

      {/* Estilos optimizados */}
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

          @keyframes gradient {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          .animate-gradient {
            background-size: 200% auto;
            animation: gradient 3s ease infinite;
          }

          @keyframes pulse-slow {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }
          .animate-pulse-slow {
            animation: pulse-slow 3s ease-in-out infinite;
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .animate-float,
          .animate-scroll,
          .animate-bounce,
          .animate-pulse,
          .animate-gradient,
          .animate-pulse-slow {
            animation: none !important;
          }
        }
      `}</style>
    </motion.section>
  )
}