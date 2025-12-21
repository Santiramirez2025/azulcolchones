// ============================================================================
// COMPARADOR INNOVADOR - EVIDENCIA DIRECTA MERCADOLIBRE 🔍
// ============================================================================

'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ComparacionProducto {
  producto: string
  tamaño: string
  precioML: number
  precioFabrica: number
  ahorro: number
  ahorroPorc: number
  urlML?: string
  imagenML?: string // Captura de pantalla ML (opcional)
  badge?: string
}

export default function ComparadorMercadoLibre() {
  const [productoActivo, setProductoActivo] = useState(0)

  const comparaciones: ComparacionProducto[] = [
    {
      producto: 'Nirvana Queen',
      tamaño: '200x160x25',
      precioML: 1261069,
      precioFabrica: 951342,
      ahorro: 309727,
      ahorroPorc: 25,
      urlML: 'https://www.mercadolibre.com.ar/colchon-piero-nirvana-queen-200-x-160-x-25-cm',
      badge: 'MÁS VENDIDO'
    },
    {
      producto: 'Nirvana 140',
      tamaño: '190x140x25',
      precioML: 877628,
      precioFabrica: 799000,
      ahorro: 78628,
      ahorroPorc: 9,
      urlML: 'https://www.mercadolibre.com.ar/colchon-piero-nirvana-140',
      badge: 'MEJOR PRECIO'
    },
    {
      producto: 'Sonno EP 140',
      tamaño: '190x140x26',
      precioML: 652703,
      precioFabrica: 599000,
      ahorro: 53703,
      ahorroPorc: 8,
      urlML: 'https://www.mercadolibre.com.ar/colchon-piero-sonno-ep',
      badge: '⭐ TOP'
    },
    {
      producto: 'Montreaux 140',
      tamaño: '190x140x30',
      precioML: 1547475,
      precioFabrica: 1399000,
      ahorro: 148475,
      ahorroPorc: 10,
      urlML: 'https://www.mercadolibre.com.ar/colchon-piero-montreaux',
      badge: 'PREMIUM'
    },
  ]

  const productoComparacion = comparaciones[productoActivo]

  return (
    <section className="relative bg-gradient-to-br from-zinc-950 via-blue-950/20 to-zinc-950 py-16 md:py-24 overflow-hidden">
      
      {/* Background decorativo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <header className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-full text-orange-400 text-sm font-bold mb-4">
            <span>🔍</span>
            <span>Verificá vos mismo en MercadoLibre</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            Comparación en Tiempo Real
          </h2>
          <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto">
            Los mismos productos que ves en <strong className="text-white">MercadoLibre</strong>, 
            hasta <strong className="text-green-400">$400.000 más baratos</strong> comprando directo de fábrica
          </p>
        </header>

        {/* Selector de Productos */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-4">
            <p className="text-sm text-zinc-400 mb-3 text-center">Seleccioná un producto para comparar:</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {comparaciones.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setProductoActivo(index)}
                  className={`
                    relative px-4 py-3 rounded-xl font-semibold text-sm
                    transition-all duration-300
                    ${productoActivo === index
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105'
                      : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
                    }
                  `}
                >
                  {item.badge && productoActivo === index && (
                    <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-green-500 text-white text-xs rounded-full">
                      {item.badge}
                    </span>
                  )}
                  <div className="font-black">{item.producto}</div>
                  <div className="text-xs opacity-75">{item.tamaño} cm</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Comparación Visual */}
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            
            {/* Columna IZQUIERDA: MercadoLibre */}
            <div className="relative">
              <div className="bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 backdrop-blur-sm border-2 border-zinc-700 rounded-2xl p-6 md:p-8">
                
                {/* Badge ML */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center">
                      <svg className="w-8 h-8 text-blue-900" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M15.58 5.5L12 2.5 8.42 5.5 5.5 3.5v8l6.5 4 6.5-4v-8l-2.92 2z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg">MercadoLibre</div>
                      <div className="text-xs text-zinc-400">Precio en el marketplace</div>
                    </div>
                  </div>
                  <span className="px-3 py-1.5 bg-red-500/20 border border-red-500/40 text-red-400 text-xs font-bold rounded-full">
                    MÁS CARO
                  </span>
                </div>

                {/* Producto Info */}
                <div className="mb-6">
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-2">
                    {productoComparacion.producto}
                  </h3>
                  <p className="text-zinc-400">{productoComparacion.tamaño} cm</p>
                </div>

                {/* Precio ML - DESTACADO */}
                <div className="bg-red-950/30 border-2 border-red-500/30 rounded-xl p-6 mb-6">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-red-400 text-lg font-medium">$</span>
                    <span className="text-5xl md:text-6xl font-black text-white">
                      {Math.floor(productoComparacion.precioML / 1000)}
                      <span className="text-3xl">.{String(productoComparacion.precioML % 1000).padStart(3, '0')}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Envío: 10-15 días hábiles</span>
                  </div>
                </div>

                {/* Verificar en ML */}
                {productoComparacion.urlML && (
                  <a
                    href={productoComparacion.urlML}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      w-full px-6 py-3 
                      bg-zinc-800 hover:bg-zinc-700 
                      border border-zinc-600
                      text-white font-semibold text-sm
                      rounded-lg
                      transition-all duration-200
                      flex items-center justify-center gap-2
                    "
                  >
                    <span>Verificar en MercadoLibre</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}

              </div>

              {/* Badge "VS" */}
              <div className="absolute -right-6 top-1/2 -translate-y-1/2 z-20 hidden lg:block">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 border-4 border-zinc-950 flex items-center justify-center shadow-xl">
                  <span className="text-white font-black text-sm">VS</span>
                </div>
              </div>
            </div>

            {/* Columna DERECHA: Azul */}
            <div className="relative">
              <div className="bg-gradient-to-br from-green-950/40 to-blue-950/40 backdrop-blur-sm border-2 border-green-500/50 rounded-2xl p-6 md:p-8 shadow-2xl shadow-green-500/20">
                
                {/* Badge Destacado Superior */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-black rounded-full shadow-lg whitespace-nowrap z-10">
                  ✅ MEJOR PRECIO GARANTIZADO
                </div>

                {/* Badge Azul */}
                <div className="flex items-center justify-between mb-6 mt-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">🏭</span>
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg">Azul Colchones</div>
                      <div className="text-xs text-blue-300">Precio directo de fábrica</div>
                    </div>
                  </div>
                  <span className="px-3 py-1.5 bg-green-500/20 border border-green-500/40 text-green-400 text-xs font-bold rounded-full">
                    AHORRÁS
                  </span>
                </div>

                {/* Producto Info */}
                <div className="mb-6">
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-2">
                    {productoComparacion.producto}
                  </h3>
                  <p className="text-blue-200">{productoComparacion.tamaño} cm</p>
                </div>

                {/* Precio Fábrica - DESTACADO */}
                <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border-2 border-green-500/40 rounded-xl p-6 mb-4">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-green-400 text-lg font-medium">$</span>
                    <span className="text-5xl md:text-6xl font-black text-white">
                      {Math.floor(productoComparacion.precioFabrica / 1000)}
                      <span className="text-3xl">.{String(productoComparacion.precioFabrica % 1000).padStart(3, '0')}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-blue-300">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Envío GRATIS: 7-10 días</span>
                  </div>
                </div>

                {/* Ahorro DESTACADO */}
                <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-5 mb-6 text-center shadow-xl">
                  <div className="text-white/90 text-sm font-medium mb-2">
                    TE AHORRÁS
                  </div>
                  <div className="text-4xl md:text-5xl font-black text-white mb-1">
                    ${productoComparacion.ahorro.toLocaleString('es-AR')}
                  </div>
                  <div className="text-green-100 text-lg font-bold">
                    {productoComparacion.ahorroPorc}% de descuento
                  </div>
                  <div className="mt-3 pt-3 border-t border-white/20 text-xs text-white/80">
                    + Envío gratis + 12 cuotas sin interés
                  </div>
                </div>

                {/* CTA WhatsApp */}
                <a
                  href={`https://wa.me/5493534017332?text=Hola!%20Vi%20que%20el%20${encodeURIComponent(productoComparacion.producto)}%20está%20$${productoComparacion.ahorro.toLocaleString('es-AR')}%20más%20barato%20que%20en%20MercadoLibre.%20Quiero%20comprarlo!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    w-full px-6 py-4
                    bg-gradient-to-r from-green-600 to-green-700 
                    hover:from-green-700 hover:to-green-800
                    text-white font-bold text-base
                    rounded-xl
                    transition-all duration-300
                    flex items-center justify-center gap-3
                    shadow-xl shadow-green-500/30
                    hover:scale-105
                  "
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span>Comprar a Precio de Fábrica</span>
                </a>

              </div>
            </div>

          </div>
        </div>

        {/* Garantía de Mejor Precio */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-950/50 to-purple-950/50 border border-blue-500/30 rounded-2xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <span className="text-5xl">🛡️</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                  Garantía de Mejor Precio
                </h3>
                <p className="text-zinc-300 leading-relaxed">
                  Si encontrás el mismo producto más barato en otro lado, 
                  <strong className="text-white"> te igualamos el precio + 5% de descuento adicional</strong>. 
                  Así de seguros estamos de que tenemos los mejores precios de Argentina.
                </p>
              </div>
              <div className="flex-shrink-0">
                <span className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-bold rounded-lg">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Garantizado</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats rápidos */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 text-center">
            <div className="text-3xl font-black text-green-400 mb-1">30-40%</div>
            <div className="text-xs text-zinc-400">Más barato</div>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 text-center">
            <div className="text-3xl font-black text-blue-400 mb-1">7-10</div>
            <div className="text-xs text-zinc-400">Días de entrega</div>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 text-center">
            <div className="text-3xl font-black text-purple-400 mb-1">100%</div>
            <div className="text-xs text-zinc-400">Garantía oficial</div>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 text-center">
            <div className="text-3xl font-black text-yellow-400 mb-1">12x</div>
            <div className="text-xs text-zinc-400">Cuotas sin interés</div>
          </div>
        </div>

      </div>
    </section>
  )
}