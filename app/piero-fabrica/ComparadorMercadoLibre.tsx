'use client'

import { useState } from 'react'

// ============================================================================
// COMPARADOR MERCADOLIBRE - REDISEÑO UNIFICADO CON LANDING 🎯
// ============================================================================

interface ComparacionProducto {
  producto: string
  tamaño: string
  precioML: number
  precioFabrica: number
  ahorro: number
  ahorroPorc: number
  urlML?: string
  badge?: string
  categoria: 'ancla' | 'equilibrio' | 'premium'
}

export default function ComparadorMercadoLibre() {
  const [productoActivo, setProductoActivo] = useState(0)

  const comparaciones: ComparacionProducto[] = [
    {
      producto: 'Montreaux PT King',
      tamaño: '200x200x34',
      precioML: 2612000,
      precioFabrica: 1345844,
      ahorro: 1266156,
      ahorroPorc: 48,
      urlML: 'https://www.mercadolibre.com.ar/colchon-piero-montreaux-pillow-top-king',
      badge: '🔥 MÁXIMO AHORRO',
      categoria: 'premium'
    },
    {
      producto: 'Montreaux PT Queen',
      tamaño: '200x160x34',
      precioML: 2027000,
      precioFabrica: 1182651,
      ahorro: 844349,
      ahorroPorc: 42,
      urlML: 'https://www.mercadolibre.com.ar/colchon-piero-montreaux-pillow-top-queen',
      badge: '⭐ TOP VENTAS',
      categoria: 'premium'
    },
    {
      producto: 'Regno Queen',
      tamaño: '200x160x27',
      precioML: 956000,
      precioFabrica: 530167,
      ahorro: 425833,
      ahorroPorc: 45,
      urlML: 'https://www.mercadolibre.com.ar/colchon-piero-regno-queen',
      badge: '💰 45% OFF',
      categoria: 'equilibrio'
    },
    {
      producto: 'Montreaux 140',
      tamaño: '190x140x34',
      precioML: 1339000,
      precioFabrica: 772562,
      ahorro: 566438,
      ahorroPorc: 42,
      urlML: 'https://www.mercadolibre.com.ar/colchon-piero-montreaux-140',
      badge: '🎯 PREMIUM',
      categoria: 'premium'
    },
    {
      producto: 'Nirvana 160',
      tamaño: '190x160x25',
      precioML: 977163,
      precioFabrica: 684966,
      ahorro: 292197,
      ahorroPorc: 30,
      urlML: 'https://www.mercadolibre.com.ar/colchon-piero-nirvana-160',
      badge: '✅ MÁS VENDIDO',
      categoria: 'ancla'
    },
    {
      producto: 'Sonno EP 140',
      tamaño: '190x140x26',
      precioML: 650000,
      precioFabrica: 458198,
      ahorro: 191802,
      ahorroPorc: 29,
      urlML: 'https://www.mercadolibre.com.ar/colchon-piero-sonno-europillow',
      badge: '🏆 BEST SELLER',
      categoria: 'equilibrio'
    },
  ]

  const productoComparacion = comparaciones[productoActivo]
  
  const categoriasConfig = {
    ancla: {
      badgeGradient: 'from-rose-600 to-red-600',
      borderColor: 'border-rose-500/40',
      glowColor: 'shadow-rose-500/20'
    },
    equilibrio: {
      badgeGradient: 'from-blue-600 to-blue-700',
      borderColor: 'border-blue-500/40',
      glowColor: 'shadow-blue-500/20'
    },
    premium: {
      badgeGradient: 'from-amber-500 to-orange-600',
      borderColor: 'border-amber-500/40',
      glowColor: 'shadow-amber-500/20'
    }
  }

  const categoriaActual = categoriasConfig[productoComparacion.categoria]

  return (
    <section className="relative bg-gradient-to-b from-zinc-900 via-zinc-950 to-zinc-900 py-16 md:py-20 overflow-hidden">
      
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[150px] -top-24 right-0"></div>
        <div className="absolute w-[400px] h-[400px] bg-green-500/5 rounded-full blur-[120px] bottom-0 -left-24"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4">
        
        {/* Header */}
        <header className="text-center mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-full text-orange-400 text-sm font-bold mb-6">
            <span>🔍</span>
            <span>Verificá vos mismo en ML</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
            Comparación en
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400"> Tiempo Real</span>
          </h2>
          <p className="text-base md:text-lg text-zinc-400 max-w-2xl mx-auto">
            Los mismos productos que ves en <strong className="text-white">MercadoLibre</strong>, 
            hasta <strong className="text-green-400">$1.266.156 más baratos</strong>
          </p>
        </header>

        {/* Selector de Productos - Mobile Optimizado */}
        <div className="mb-8 md:mb-10">
          <div className="bg-zinc-800/60 backdrop-blur-sm border border-zinc-700/50 rounded-xl md:rounded-2xl p-4 md:p-5">
            <p className="text-sm text-zinc-400 mb-3 text-center font-medium">Seleccioná un producto:</p>
            
            {/* Mobile: Horizontal scroll */}
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide md:hidden">
              {comparaciones.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setProductoActivo(index)}
                  className={`
                    relative flex-shrink-0 px-4 py-3 rounded-xl font-semibold text-sm
                    transition-all duration-300 min-w-[140px]
                    ${productoActivo === index
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-zinc-700/50 text-zinc-300 border border-zinc-600/50'
                    }
                  `}
                >
                  <div className="font-bold leading-tight mb-0.5">{item.producto}</div>
                  <div className="text-green-400 font-bold text-xs">
                    -{item.ahorroPorc}% OFF
                  </div>
                </button>
              ))}
            </div>
            
            {/* Desktop: Grid */}
            <div className="hidden md:grid grid-cols-3 lg:grid-cols-6 gap-2">
              {comparaciones.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setProductoActivo(index)}
                  className={`
                    relative px-3 py-3 rounded-xl font-semibold text-sm
                    transition-all duration-300
                    ${productoActivo === index
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30 scale-105'
                      : 'bg-zinc-700/50 text-zinc-300 border border-zinc-600/50 hover:border-blue-500/50 hover:bg-zinc-700'
                    }
                  `}
                >
                  <div className="font-bold leading-tight mb-1">{item.producto}</div>
                  <div className="text-green-400 font-bold text-xs">
                    Ahorrás ${Math.floor(item.ahorro / 1000)}k
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Comparación Visual - Responsive */}
        <div className="grid lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          
          {/* MERCADOLIBRE */}
          <div className="relative order-2 lg:order-1">
            <div className="bg-zinc-800/60 backdrop-blur-sm border-2 border-zinc-600/50 rounded-xl md:rounded-2xl p-5 md:p-6 lg:p-8 h-full">
              
              {/* Header ML */}
              <div className="flex items-center justify-between mb-5 md:mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-400 rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 md:w-7 md:h-7 text-blue-900" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-white font-bold text-base md:text-lg">MercadoLibre</div>
                    <div className="text-xs text-zinc-500">Precio marketplace</div>
                  </div>
                </div>
                <span className="px-3 py-1.5 bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-bold rounded-full">
                  MÁS CARO
                </span>
              </div>

              {/* Producto */}
              <div className="mb-5 md:mb-6">
                <h3 className="text-xl md:text-2xl font-black text-white mb-1">
                  {productoComparacion.producto}
                </h3>
                <p className="text-zinc-500 text-sm">{productoComparacion.tamaño} cm</p>
              </div>

              {/* Precio ML */}
              <div className="bg-red-950/30 border border-red-500/30 rounded-xl p-4 md:p-5 mb-5">
                <p className="text-xs text-zinc-500 uppercase tracking-wide mb-2">Precio en ML</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-red-400 text-lg">$</span>
                  <span className="text-4xl md:text-5xl font-black text-white tabular-nums">
                    {productoComparacion.precioML.toLocaleString('es-AR')}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-500 mt-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Envío: 10-15 días</span>
                </div>
              </div>

              {/* Link Verificar */}
              {productoComparacion.urlML && (
                <a
                  href={productoComparacion.urlML}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    w-full px-5 py-3 
                    bg-zinc-700/50 hover:bg-zinc-600/50 
                    border border-zinc-600/50 hover:border-zinc-500
                    text-zinc-300 hover:text-white font-semibold text-sm
                    rounded-xl
                    transition-all duration-300
                    flex items-center justify-center gap-2
                  "
                >
                  <span>Verificar precio en ML</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>

            {/* VS Badge - Solo desktop */}
            <div className="absolute -right-5 top-1/2 -translate-y-1/2 z-20 hidden lg:flex">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 border-4 border-zinc-950 flex items-center justify-center shadow-xl">
                <span className="text-white font-black text-xs">VS</span>
              </div>
            </div>
          </div>

          {/* AZUL COLCHONES - Fábrica */}
          <div className="relative order-1 lg:order-2">
            
            {/* Badge Flotante */}
            <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 md:px-6 py-1.5 md:py-2 bg-gradient-to-r ${categoriaActual.badgeGradient} text-white text-xs md:text-sm font-black rounded-full shadow-lg whitespace-nowrap z-10`}>
              {productoComparacion.badge}
            </div>

            <div className={`bg-zinc-800/60 backdrop-blur-sm border-2 ${categoriaActual.borderColor} rounded-xl md:rounded-2xl p-5 md:p-6 lg:p-8 shadow-2xl ${categoriaActual.glowColor} h-full`}>
              
              {/* Header Azul */}
              <div className="flex items-center justify-between mb-5 md:mb-6 mt-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-xl md:text-2xl">🏭</span>
                  </div>
                  <div>
                    <div className="text-white font-bold text-base md:text-lg">Azul Colchones</div>
                    <div className="text-xs text-blue-400">Precio directo fábrica</div>
                  </div>
                </div>
                <span className="px-3 py-1.5 bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-bold rounded-full">
                  AHORRÁS
                </span>
              </div>

              {/* Producto */}
              <div className="mb-5 md:mb-6">
                <h3 className="text-xl md:text-2xl font-black text-white mb-1">
                  {productoComparacion.producto}
                </h3>
                <p className="text-blue-400 text-sm">{productoComparacion.tamaño} cm</p>
              </div>

              {/* Precio Fábrica */}
              <div className="bg-green-950/40 border border-green-500/30 backdrop-blur-sm rounded-xl p-4 md:p-5 mb-4">
                <p className="text-xs text-green-400 uppercase tracking-wide mb-2">Precio Fábrica</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-green-400 text-lg">$</span>
                  <span className="text-4xl md:text-5xl font-black text-white tabular-nums">
                    {productoComparacion.precioFabrica.toLocaleString('es-AR')}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-400/80 mt-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Envío GRATIS • 7-10 días</span>
                </div>
              </div>

              {/* Ahorro Box */}
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-4 md:p-5 mb-5 text-center shadow-xl shadow-green-500/30">
                <div className="text-white/80 text-xs font-semibold uppercase tracking-wide mb-1">
                  Te ahorrás
                </div>
                <div className="text-3xl md:text-4xl font-black text-white tabular-nums mb-1">
                  ${productoComparacion.ahorro.toLocaleString('es-AR')}
                </div>
                <div className="text-green-100 text-sm font-bold">
                  {productoComparacion.ahorroPorc}% de descuento
                </div>
              </div>

              {/* CTA WhatsApp */}
              <a
                href={`https://wa.me/5493534017332?text=Hola!%20Vi%20el%20${encodeURIComponent(productoComparacion.producto)}%20a%20$${productoComparacion.precioFabrica.toLocaleString('es-AR')}%20(${productoComparacion.ahorroPorc}%25%20OFF%20vs%20ML).%20Quiero%20comprarlo!`}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  w-full px-6 py-4
                  bg-gradient-to-r from-green-600 to-emerald-600 
                  hover:from-green-500 hover:to-emerald-500
                  text-white font-bold text-base
                  rounded-xl
                  transition-all duration-300
                  flex items-center justify-center gap-3
                  shadow-xl shadow-green-500/30 hover:shadow-green-500/50
                  hover:scale-[1.02] active:scale-[0.98]
                  group
                "
              >
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span>Comprar a Precio Fábrica</span>
              </a>

            </div>
          </div>

        </div>

        {/* Stats Rápidos */}
        <div className="mt-10 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {[
            { value: 'Hasta 48%', label: 'Más barato que ML', color: 'text-green-400', hoverBorder: 'hover:border-green-500/50' },
            { value: '7-10', label: 'Días de entrega', color: 'text-blue-400', hoverBorder: 'hover:border-blue-500/50' },
            { value: '100%', label: 'Garantía oficial', color: 'text-purple-400', hoverBorder: 'hover:border-purple-500/50' },
            { value: '$0', label: 'Envío gratis', color: 'text-yellow-400', hoverBorder: 'hover:border-yellow-500/50' },
          ].map((stat, index) => (
            <div 
              key={index}
              className={`bg-zinc-800/60 backdrop-blur-sm border border-zinc-700/50 rounded-xl p-4 text-center transition-all duration-300 ${stat.hoverBorder}`}
            >
              <div className={`text-2xl md:text-3xl font-black ${stat.color} mb-1 tabular-nums`}>{stat.value}</div>
              <div className="text-xs text-zinc-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Garantía Mejor Precio */}
        <div className="mt-10 md:mt-12">
          <div className="bg-zinc-800/60 backdrop-blur-sm border border-blue-500/30 rounded-xl md:rounded-2xl p-5 md:p-8">
            <div className="flex flex-col md:flex-row items-center gap-5 md:gap-6 text-center md:text-left">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <span className="text-4xl md:text-5xl">🛡️</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                  Garantía de Mejor Precio
                </h3>
                <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                  Si encontrás el mismo producto más barato en otro lado, 
                  <strong className="text-white"> te igualamos el precio + 5% de descuento adicional</strong>.
                </p>
              </div>
              <div className="flex-shrink-0">
                <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white font-bold text-sm rounded-lg shadow-lg">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Garantizado</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Final */}
        <div className="mt-10 md:mt-12 text-center">
          <p className="text-zinc-400 mb-4">
            ¿Querés ver todos los productos con descuento?
          </p>
          <a
            href="#productos"
            className="
              inline-flex items-center gap-2 
              px-8 py-3.5 
              bg-gradient-to-r from-blue-600 to-blue-700 
              hover:from-blue-500 hover:to-blue-600 
              text-white font-bold 
              rounded-xl 
              transition-all duration-300 
              hover:scale-[1.02] active:scale-[0.98]
              shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50
            "
          >
            <span>Ver Catálogo Completo</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  )
}