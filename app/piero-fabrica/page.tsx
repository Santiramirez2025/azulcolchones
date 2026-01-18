// app/piero-fabrica/page.tsx - OPTIMIZADO CON META PIXEL 🎯
// NUEVO ORDEN: CTA PRIMERO → PRODUCTOS → TRUST BADGES AL FINAL
// Todos los CTAs de WhatsApp con tracking de conversión

import type { Metadata } from 'next'
import ProductosGridOptimizado from './ProductosGrid'
import FAQOptimizada from './FAQSection'
import ComparadorMercadoLibre from './ComparadorMercadoLibre'
import WhatsAppCTA from '@/components/WhatsAppCTA' // 🎯 Componente con tracking

// ============================================================================
// METADATA - CONVERSION FOCUSED SEO 🚀
// ============================================================================

export const metadata: Metadata = {
  title: 'Piero Fábrica | Ahorrá Hasta 48% Comprando Directo | Villa María',
  description: 'El mismo colchón Piero hasta $1.266.156 más barato que MercadoLibre. 7-10 días de espera = ahorro real. Financiación 12 cuotas sin interés.',
  robots: 'index, follow',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/piero-fabrica`,
  },
}

// ============================================================================
// FINAL CTA - PRIMER IMPACTO 🎯
// ============================================================================

function FinalCTAOptimizada() {
  return (
    <section className="relative bg-gradient-to-br from-blue-950 via-purple-950 to-zinc-950 overflow-hidden">
      
      <div className="absolute inset-0 opacity-20">
        <div className="absolute w-96 h-96 bg-blue-500/40 rounded-full blur-3xl top-0 right-0"></div>
        <div className="absolute w-96 h-96 bg-purple-500/30 rounded-full blur-3xl bottom-0 left-0"></div>
      </div>

      <div className="relative max-w-screen-2xl mx-auto px-4 py-20 md:py-32">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              Comprá Inteligente:
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Mismo Producto, Mejor Precio
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-300">
              No pagues de más por el mismo colchón y el mismo tiempo de espera
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-700/50 rounded-2xl p-8 text-center hover:border-blue-500/50 transition-all">
              <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🏭</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Directo de Fábrica</h3>
              <p className="text-zinc-400">
                Sin intermediarios que inflan el precio hasta un 48%
              </p>
            </div>

            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-700/50 rounded-2xl p-8 text-center hover:border-green-500/50 transition-all">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">💰</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Hasta 48% OFF</h3>
              <p className="text-zinc-400">
                Ahorro real de $113k hasta $1.266k según el modelo
              </p>
            </div>

            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-700/50 rounded-2xl p-8 text-center hover:border-purple-500/50 transition-all">
              <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">✅</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Garantía Oficial</h3>
              <p className="text-zinc-400">
                La misma garantía PIERO de 5-10 años
              </p>
            </div>

          </div>

          <div className="text-center space-y-6">
            <a
              href="#productos"
              className="inline-flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-600 hover:from-blue-700 hover:via-blue-600 hover:to-cyan-700 text-white text-2xl font-black rounded-2xl transition-all duration-300 shadow-2xl shadow-blue-500/40 hover:shadow-blue-500/60 hover:scale-105"
            >
              <span>Ver Productos Disponibles</span>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-zinc-400">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Respondemos en menos de 5 minutos</span>
              </div>
              <div className="hidden sm:block text-zinc-600">•</div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <span>Lun-Vie 9-19hs | Sáb 9-13hs</span>
              </div>
            </div>

            <div className="pt-8 border-t border-zinc-700/30 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-3 text-zinc-400">
                <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-sm">
                  <strong className="text-white">Garantía de mejor precio</strong> • Si encontrás más barato, te igualamos + 5% OFF
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}

// ============================================================================
// HERO SECTION - CON CTA TRACKEADO 🎯
// ============================================================================

function HeroFabrica() {
  return (
    <section className="relative bg-gradient-to-br from-zinc-900 via-blue-950/30 to-zinc-900">
      
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute w-96 h-96 bg-blue-500/30 rounded-full blur-3xl -top-48 -right-48"></div>
        <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl -bottom-48 -left-48"></div>
      </div>

      <div className="relative max-w-screen-2xl mx-auto px-4 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Programa Exclusivo Fábrica PIERO
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                Mismo Colchón Piero,
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500">
                  Hasta $1.266.156
                </span>
                <br />
                Más Barato
              </h2>

              <div className="space-y-3">
                <p className="text-xl md:text-2xl text-zinc-300 font-medium">
                  El secreto: <span className="text-white font-bold">comprás directo de fábrica</span>
                </p>
                <p className="text-lg text-zinc-400">
                  Esperás 7-10 días (mismo tiempo que MercadoLibre)<br />
                  pero pagás <strong className="text-green-400">hasta 48% menos</strong>
                </p>
              </div>

              {/* ============================================================ */}
              {/* 🎯 CTAs - AHORA CON TRACKING                                 */}
              {/* ============================================================ */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a 
                  href="#productos"
                  className="group px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all duration-300 shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 flex items-center justify-center gap-2"
                >
                  <span>Ver Productos</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                
                {/* 🎯 WHATSAPP CTA CON TRACKING */}
                <WhatsAppCTA 
                  texto="Consultar WhatsApp"
                  mensaje="Hola! Quiero consultar por Piero Fábrica"
                  producto="Hero Section CTA"
                  categoria="hero-piero-fabrica"
                  variante="hero"
                  icono={false}
                />
              </div>

              <div className="flex items-center gap-4 pt-4 justify-center lg:justify-start">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-2 border-zinc-900"></div>
                  ))}
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1 text-yellow-400 text-sm">
                    {'⭐'.repeat(5)}
                  </div>
                  <p className="text-xs text-zinc-400">+120 clientes este mes</p>
                </div>
              </div>

            </div>

            <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-zinc-700/50 rounded-2xl p-8 shadow-2xl">
              
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                Ejemplo Real: Montreaux Pillow Top King
              </h3>

              <div className="bg-red-950/30 border border-red-500/30 rounded-xl p-5 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-zinc-400">MercadoLibre</span>
                  <span className="px-3 py-1 bg-red-500/20 text-red-400 text-xs font-bold rounded-full">
                    MÁS CARO
                  </span>
                </div>
                <div className="text-3xl font-black text-white mb-2">
                  $2.612.000
                </div>
                <div className="text-xs text-zinc-500">
                  Montreaux Pillow Top King | 10-15 días
                </div>
              </div>

              <div className="bg-green-950/30 border-2 border-green-500/50 rounded-xl p-5 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-green-500 text-white text-xs font-bold rounded-full whitespace-nowrap">
                  ✅ AZUL FÁBRICA
                </div>
                
                <div className="flex items-center justify-between mb-3 mt-2">
                  <span className="text-sm font-medium text-zinc-400">Precio Directo</span>
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full">
                    48% OFF
                  </span>
                </div>
                <div className="text-3xl font-black text-white mb-2">
                  $1.345.844
                </div>
                <div className="text-xs text-zinc-500 mb-4">
                  Montreaux Pillow Top King | 7-10 días
                </div>

                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-center">
                  <div className="text-sm text-green-400 font-medium mb-1">
                    Te ahorrás
                  </div>
                  <div className="text-2xl font-black text-green-400">
                    $1.266.156
                  </div>
                  <div className="text-xs text-green-400/70">
                    (48% de descuento)
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-zinc-400">
                  Mismo producto, misma garantía, <strong className="text-white">CASI LA MITAD de precio</strong>
                </p>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// SECCIÓN: ¿POR QUÉ FÁBRICA? 💎
// ============================================================================

function PorQueFabrica() {
  const beneficios = [
    {
      icon: '🏭',
      titulo: 'Sin Intermediarios',
      descripcion: 'Tu colchón viene directo de fábrica PIERO. Sin distribuidores, sin locales, sin márgenes extras.',
      ahorro: 'Ahorrás hasta 48%'
    },
    {
      icon: '⏱️',
      titulo: 'Espera Inteligente',
      descripcion: 'MercadoLibre: 10-15 días. Nosotros: 7-10 días. Casi el mismo tiempo, precio muchísimo mejor.',
      ahorro: 'Mismo tiempo'
    },
    {
      icon: '✅',
      titulo: 'Garantía Oficial',
      descripcion: 'La misma garantía de fábrica PIERO (5-10 años). Respaldo directo en Villa María.',
      ahorro: 'Sin riesgos'
    }
  ]

  return (
    <section className="bg-zinc-900/50 border-y border-zinc-800/30">
      <div className="max-w-screen-2xl mx-auto px-4 py-16 md:py-20">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Por Qué Comprar Directo de Fábrica?
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            La pregunta no es "¿por qué?", sino "¿por qué NO?"
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {beneficios.map((item, index) => (
            <div 
              key={index}
              className="group bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-zinc-700/50 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-4xl">{item.icon}</span>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3">
                {item.titulo}
              </h3>
              
              <p className="text-zinc-400 leading-relaxed mb-4">
                {item.descripcion}
              </p>

              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full">
                <span className="text-green-400 font-semibold text-sm">
                  {item.ahorro}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 max-w-3xl mx-auto bg-gradient-to-r from-blue-950/30 to-purple-950/30 border border-blue-500/20 rounded-2xl p-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
              M
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1 text-yellow-400 mb-2">
                {'⭐'.repeat(5)}
              </div>
              <p className="text-zinc-300 italic mb-3">
                "Compré el Montreaux Pillow Top King a $1.345k. En MercadoLibre estaba $2.612k. Me ahorré $1.266k esperando solo 8 días. Es increíble que la gente pague el doble."
              </p>
              <p className="text-sm text-zinc-500">
                <strong className="text-zinc-400">Martín G.</strong> - Villa María, Córdoba
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

// ============================================================================
// STATS SECTION - DATOS IMPACTANTES 📊
// ============================================================================

function StatsImpactantes() {
  const stats = [
    {
      numero: '$1.266.156',
      descripcion: 'Ahorro máximo en un solo colchón',
      detalle: 'Montreaux Pillow Top King',
      color: 'from-green-500 to-emerald-500'
    },
    {
      numero: '48%',
      descripcion: 'Descuento máximo vs. MercadoLibre',
      detalle: 'En productos premium',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      numero: '62',
      descripcion: 'Productos disponibles',
      detalle: 'Desde $205k hasta $2.498k',
      color: 'from-purple-500 to-pink-500'
    },
    {
      numero: '7-10',
      descripcion: 'Días de entrega promedio',
      detalle: 'Más rápido que ML en muchos casos',
      color: 'from-amber-500 to-orange-500'
    }
  ]

  return (
    <section className="relative bg-zinc-950 py-16 md:py-20 overflow-hidden">
      
      <div className="absolute inset-0 opacity-5">
        <div className="absolute w-96 h-96 bg-green-500 rounded-full blur-3xl top-0 left-0"></div>
        <div className="absolute w-96 h-96 bg-blue-500 rounded-full blur-3xl bottom-0 right-0"></div>
      </div>

      <div className="relative max-w-screen-2xl mx-auto px-4">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Números que Hablan por Sí Solos
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Datos reales de nuestra comparación con MercadoLibre
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 border border-zinc-700/50 rounded-2xl p-8 hover:border-zinc-600 transition-all duration-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
              
              <div className="relative">
                <div className={`text-4xl md:text-5xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-3`}>
                  {stat.numero}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {stat.descripcion}
                </h3>
                <p className="text-sm text-zinc-400">
                  {stat.detalle}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

// ============================================================================
// TRUST BADGES - AL FINAL 🏆
// ============================================================================

function TrustBadges() {
  return (
    <div className="bg-gradient-to-r from-blue-950/60 via-zinc-900/60 to-blue-950/60 border-y border-blue-700/40">
      <div className="max-w-screen-2xl mx-auto px-4 py-5">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-1">
              <span className="text-3xl">🏭</span>
            </div>
            <p className="text-base font-bold text-white">Precio Directo</p>
            <p className="text-xs text-zinc-400">Sin intermediarios</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-1">
              <span className="text-3xl">💰</span>
            </div>
            <p className="text-base font-bold text-white">Hasta 48% OFF</p>
            <p className="text-xs text-zinc-400">vs. MercadoLibre</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-1">
              <span className="text-3xl">📦</span>
            </div>
            <p className="text-base font-bold text-white">7-10 Días</p>
            <p className="text-xs text-zinc-400">Producción directa</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center mb-1">
              <span className="text-3xl">✅</span>
            </div>
            <p className="text-base font-bold text-white">Garantía Oficial</p>
            <p className="text-xs text-zinc-400">Misma que cualquier lado</p>
          </div>

        </div>
      </div>
    </div>
  )
}

// ============================================================================
// MAIN PAGE COMPONENT - NUEVO ORDEN ⚡
// ============================================================================

export default function PieroFabricaPage() {
  return (
    <div className="min-h-screen w-full bg-zinc-950 overflow-x-hidden antialiased">
      
      {/* 🎯 1. FINAL CTA - PRIMER IMPACTO */}
      <FinalCTAOptimizada />
      
      {/* ⚡ 2. PRODUCTOS GRID - SEGUNDO (con tracking en ProductosGrid) */}
      <section id="productos">
        <ProductosGridOptimizado />
      </section>
      
      {/* 3. Hero con contexto (con WhatsAppCTA trackeado) */}
      <HeroFabrica />
      
      {/* 4. ¿Por Qué Fábrica? */}
      <PorQueFabrica />
      
      {/* 5. Stats Impactantes */}
      <StatsImpactantes />
      
      {/* 6. Comparador MercadoLibre */}
      <ComparadorMercadoLibre />
      
      {/* 7. FAQ Optimizada */}
      <FAQOptimizada />
      
      {/* 🏆 8. Trust Badges - AL FINAL */}
      <TrustBadges />
      
    </div>
  )
}