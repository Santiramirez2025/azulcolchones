// app/piero-fabrica/page.tsx - REDISEÑO CONVERSIÓN-FIRST 🚀
// Estructura: Hero Compacto → Trust → Productos → Comparador → Social → FAQ → CTA Final

import type { Metadata } from 'next'
import ProductosGridOptimizado from './ProductosGrid'
import FAQOptimizada from './FAQSection'
import ComparadorMercadoLibre from './ComparadorMercadoLibre'

// ============================================================================
// METADATA - SEO OPTIMIZADO
// ============================================================================

export const metadata: Metadata = {
  title: 'Colchones PIERO Fábrica | Hasta 22% OFF vs MercadoLibre | Villa María',
  description: 'Comprá colchones PIERO directo de fábrica. Mismo producto, misma garantía, hasta $523.000 menos que MercadoLibre. Entrega 7-10 días en Villa María.',
  robots: 'index, follow',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/piero-fabrica`,
  },
}

// ============================================================================
// 1. HERO COMPACTO - ABOVE THE FOLD 🎯
// Todo visible sin scroll: propuesta + precio + CTA
// ============================================================================

function HeroCompacto() {
  return (
    <section className="relative bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-950 overflow-hidden">
      
      {/* Background sutil */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -top-48 -right-24"></div>
        <div className="absolute w-[400px] h-[400px] bg-green-500/10 rounded-full blur-[100px] bottom-0 -left-24"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-12 md:py-16">
        
        {/* Badge de programa */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm font-semibold text-blue-400">Programa Fábrica PIERO</span>
          </div>
        </div>

        {/* Headline Principal */}
        <div className="text-center max-w-4xl mx-auto mb-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-[1.1]">
            Colchones PIERO
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400">
              Hasta $523.000 Menos
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-zinc-300 font-medium">
            Mismo colchón. Misma garantía. <span className="text-green-400 font-bold">Hasta 22% OFF.</span>
          </p>
        </div>

        {/* Precio Anchor + CTA */}
        <div className="max-w-2xl mx-auto">
          
          {/* Card de ejemplo rápido */}
          <div className="bg-zinc-800/60 backdrop-blur-sm border border-zinc-700/50 rounded-2xl p-6 mb-6">
            <div className="grid grid-cols-2 gap-4 items-center">
              
              <div className="text-center border-r border-zinc-700/50 pr-4">
                <p className="text-xs text-zinc-500 uppercase tracking-wide mb-1">MercadoLibre</p>
                <p className="text-2xl font-bold text-zinc-400 line-through">$2.612.000</p>
              </div>
              
              <div className="text-center pl-4">
                <p className="text-xs text-green-400 uppercase tracking-wide mb-1">Precio Fábrica</p>
                <p className="text-2xl md:text-3xl font-black text-white">$2.089.000</p>
              </div>
              
            </div>
            
            <div className="mt-4 pt-4 border-t border-zinc-700/50 text-center">
              <p className="text-sm text-zinc-400">
                Montreaux Pillow Top King • <span className="text-green-400 font-bold">Ahorrás $523.000</span>
              </p>
            </div>
          </div>

          {/* CTA Principal - ÚNICO */}
          <a
            href="#productos"
            className="
              group w-full flex items-center justify-center gap-3
              px-8 py-5 
              bg-gradient-to-r from-green-600 to-emerald-600 
              hover:from-green-500 hover:to-emerald-500
              text-white text-xl font-bold 
              rounded-xl
              transition-all duration-300
              shadow-xl shadow-green-500/30 hover:shadow-green-500/50
              hover:scale-[1.02]
            "
          >
            <span>Ver Todos los Precios</span>
            <svg className="w-6 h-6 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </a>

          {/* Micro-copy de confianza */}
          <p className="text-center text-sm text-zinc-500 mt-4">
            +120 clientes este mes • Respondemos en minutos
          </p>

        </div>

      </div>
    </section>
  )
}

// ============================================================================
// 2. TRUST STRIP - CREDIBILIDAD INMEDIATA 🏆
// Horizontal, compacto, visible rápido
// ============================================================================

function TrustStrip() {
  const badges = [
    { icon: '🏭', texto: 'Directo Fábrica', subtexto: 'Sin intermediarios' },
    { icon: '💰', texto: 'Hasta 22% OFF', subtexto: 'vs MercadoLibre' },
    { icon: '📦', texto: '7-10 Días', subtexto: 'Entrega rápida' },
    { icon: '✅', texto: 'Garantía Oficial', subtexto: '5-10 años PIERO' },
  ]

  return (
    <div className="bg-zinc-900 border-y border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {badges.map((badge, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">{badge.icon}</span>
              </div>
              <div>
                <p className="text-sm font-bold text-white leading-tight">{badge.texto}</p>
                <p className="text-xs text-zinc-500">{badge.subtexto}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// 3. INTRO RÁPIDA - CONTEXTO EN 10 SEGUNDOS ⚡
// ============================================================================

function IntroRapida() {
  return (
    <section className="bg-zinc-950 py-10 md:py-12">
      <div className="max-w-4xl mx-auto px-4 text-center">
        
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          ¿Por qué pagás de más si esperás lo mismo?
        </h2>
        
        <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
          En MercadoLibre esperás <strong className="text-white">10-15 días</strong>. 
          Con nosotros, <strong className="text-white">7-10 días</strong>. 
          La diferencia: <strong className="text-green-400">hasta 22% menos</strong> porque eliminamos intermediarios.
        </p>

      </div>
    </section>
  )
}



// ============================================================================
// 5. SOCIAL PROOF COMPACTO 💬
// ============================================================================

function SocialProofCompacto() {
  const testimonios = [
    {
      nombre: 'Martín G.',
      ciudad: 'Villa María',
      texto: 'Compré el Montreaux PT King. Me ahorré más de $500k. Llegó en 8 días.',
      ahorro: '$523.000'
    },
    {
      nombre: 'Carolina S.',
      ciudad: 'Córdoba',
      texto: 'No podía creer la diferencia de precio. Mismo colchón, mucho menos plata.',
      ahorro: '$207.000'
    },
    {
      nombre: 'Diego R.',
      ciudad: 'Villa María',
      texto: 'Excelente atención. Me asesoraron bien y el colchón es espectacular.',
      ahorro: '$121.000'
    },
  ]

  return (
    <section className="bg-zinc-900/50 py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4">
        
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Lo que dicen nuestros clientes
          </h2>
          <div className="flex items-center justify-center gap-1 text-yellow-400">
            {'⭐'.repeat(5)}
            <span className="text-zinc-400 text-sm ml-2">4.9/5 en +120 ventas</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonios.map((t, i) => (
            <div 
              key={i}
              className="bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-6"
            >
              <div className="flex items-center gap-1 text-yellow-400 text-sm mb-3">
                {'⭐'.repeat(5)}
              </div>
              <p className="text-zinc-300 text-sm mb-4 leading-relaxed">
                "{t.texto}"
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-semibold text-sm">{t.nombre}</p>
                  <p className="text-zinc-500 text-xs">{t.ciudad}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-zinc-500">Ahorró</p>
                  <p className="text-green-400 font-bold">{t.ahorro}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

// ============================================================================
// 6. POR QUÉ FÁBRICA - VERSIÓN COMPACTA 🏭
// ============================================================================

function PorQueFabricaCompacto() {
  return (
    <section className="bg-zinc-950 py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4">
        
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            ¿Por qué el precio es tan diferente?
          </h2>
          <p className="text-zinc-400">
            Simple: eliminamos todos los intermediarios
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Cómo funciona ML */}
          <div className="bg-red-950/20 border border-red-500/20 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                <span className="text-xl">❌</span>
              </div>
              <h3 className="text-lg font-bold text-white">MercadoLibre</h3>
            </div>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5">•</span>
                <span>Fábrica → Distribuidor (+15%)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5">•</span>
                <span>Distribuidor → Vendedor ML (+10%)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5">•</span>
                <span>Comisión MercadoLibre (+13%)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5">•</span>
                <span>Envío con recargo (+5%)</span>
              </li>
            </ul>
            <p className="mt-4 text-red-400 font-semibold text-sm">
              = Hasta 43% más caro
            </p>
          </div>

          {/* Cómo funciona Azul */}
          <div className="bg-green-950/20 border border-green-500/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <span className="text-xl">✅</span>
              </div>
              <h3 className="text-lg font-bold text-white">Azul Fábrica</h3>
            </div>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Fábrica PIERO → Vos</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Sin distribuidores</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Sin comisiones de plataforma</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Envío a precio de costo</span>
              </li>
            </ul>
            <p className="mt-4 text-green-400 font-semibold text-sm">
              = Mismo producto, hasta 22% menos
            </p>
          </div>

        </div>

        {/* Garantía */}
        <div className="mt-8 bg-blue-950/20 border border-blue-500/20 rounded-xl p-6 text-center">
          <p className="text-zinc-300">
            <strong className="text-white">¿Y la garantía?</strong> La misma de siempre. 
            5-10 años de garantía oficial PIERO. 
            <span className="text-blue-400"> El colchón es idéntico.</span>
          </p>
        </div>

      </div>
    </section>
  )
}

// ============================================================================
// 7. CTA FINAL - PARA LOS QUE SCROLLEARON TODO 🎯
// ============================================================================

function CTAFinal() {
  return (
    <section className="bg-gradient-to-b from-zinc-900 to-zinc-950 py-16 md:py-20">
      <div className="max-w-3xl mx-auto px-4 text-center">
        
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          ¿Listo para ahorrar?
        </h2>
        
        <p className="text-lg text-zinc-400 mb-8">
          Consultanos por WhatsApp y te asesoramos sin compromiso
        </p>

        <a
          href="https://wa.me/5493534017332?text=Hola!%20Quiero%20consultar%20por%20colchones%20PIERO%20Fábrica"
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-flex items-center justify-center gap-3
            px-10 py-5
            bg-gradient-to-r from-green-600 to-green-700
            hover:from-green-500 hover:to-green-600
            text-white font-bold text-xl
            rounded-xl
            transition-all duration-300
            shadow-xl shadow-green-500/30 hover:shadow-green-500/50
            hover:scale-105
          "
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          <span>Consultar por WhatsApp</span>
        </a>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-zinc-500">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Respuesta en minutos
          </span>
          <span className="hidden sm:inline text-zinc-700">•</span>
          <span>Lun-Vie 9-19hs | Sáb 9-13hs</span>
        </div>

      </div>
    </section>
  )
}

// ============================================================================
// 8. FOOTER TRUST - CIERRE CON CREDIBILIDAD 🏆
// ============================================================================

function FooterTrust() {
  return (
    <div className="bg-zinc-900 border-t border-zinc-800 py-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
          
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span><strong className="text-zinc-400">Garantía de mejor precio:</strong> si encontrás más barato, te igualamos + 5% OFF</span>
          </div>

          <div className="flex items-center gap-4">
            <span>Villa María, Córdoba</span>
            <span>•</span>
            <span>+35 años de experiencia</span>
          </div>

        </div>
      </div>
    </div>
  )
}

// ============================================================================
// MAIN PAGE - ESTRUCTURA ÓPTIMA DE CONVERSIÓN 🚀
// ============================================================================

export default function PieroFabricaPage() {
  return (
    <div className="min-h-screen w-full bg-zinc-950 overflow-x-hidden antialiased">
      
      {/* ========================================= */}
      {/* ABOVE THE FOLD - Decisión en 5 segundos  */}
      {/* ========================================= */}
      
      {/* 1. Hero Compacto - Propuesta + Precio + CTA */}
      <HeroCompacto />
      
      {/* 2. Trust Strip - Credibilidad inmediata */}
      <TrustStrip />
      
      {/* ========================================= */}
      {/* PRODUCTOS - Lo que vinieron a ver        */}
      {/* ========================================= */}
      
      {/* 3. Intro rápida - Contexto en 10 segundos */}
      <IntroRapida />
      
      {/* 4. Grid de Productos - CON TRACKING */}
      <section id="productos">
        <ProductosGridOptimizado />
      </section>
      
      {/* ========================================= */}
      {/* REFUERZO - Para los indecisos           */}
      {/* ========================================= */}
      
      {/* 5. Comparador ML */}
      <ComparadorMercadoLibre />
      
      {/* 6. Social Proof */}
      <SocialProofCompacto />
      
      {/* 7. Por Qué Fábrica */}
      <PorQueFabricaCompacto />
      
      {/* ========================================= */}
      {/* CIERRE - Resolver objeciones + CTA      */}
      {/* ========================================= */}
      
      {/* 8. FAQ */}
      <FAQOptimizada />
      
      {/* 9. CTA Final */}
      <CTAFinal />
      
      {/* 10. Footer Trust */}
      <FooterTrust />
      
    </div>
  )
}