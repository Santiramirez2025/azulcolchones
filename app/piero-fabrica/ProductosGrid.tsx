'use client'

import { useState } from 'react'
import Image from 'next/image'

// ============================================================================
// TYPES
// ============================================================================

interface ProductCardProps {
  nombre: string
  tamaño: string
  precioFabrica: number
  precioOnline?: number
  ahorro?: number
  ahorroPorc?: number
  categoria: 'ancla' | 'equilibrio' | 'premium' | 'accesorio'
  destacado?: boolean
  stock: 'disponible' | 'consultar' | 'bajo-pedido'
  imagen?: string
  tipo?: 'colchon' | 'protector' | 'almohada' | 'sabanas'
}

// ============================================================================
// PRODUCT CARD - DISEÑO PROFESIONAL LIMPIO 📱
// ============================================================================

function ProductCard({ 
  nombre, 
  tamaño, 
  precioFabrica, 
  ahorro,
  ahorroPorc,
  categoria,
  destacado = false,
  stock,
  imagen,
  tipo = 'colchon'
}: ProductCardProps) {
  
  const categoriaConfig = {
    ancla: { 
      badge: 'Precio Top',
      color: 'bg-red-50 text-red-700 border-red-200'
    },
    equilibrio: { 
      badge: 'Más Vendido',
      color: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    premium: { 
      badge: 'Premium',
      color: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    accesorio: {
      badge: 'Accesorio',
      color: 'bg-green-50 text-green-700 border-green-200'
    }
  }

  const config = categoriaConfig[categoria]
  const urlWhatsApp = `https://wa.me/5493534017332?text=${encodeURIComponent(`Hola! Consulto por ${nombre} ${tamaño}`)}`

  const tipoEmoji = {
    colchon: '🛏️',
    protector: '🛡️',
    almohada: '💤',
    sabanas: '✨'
  }

  return (
    <article 
      className="bg-white rounded-xl border border-zinc-200 hover:border-blue-300 hover:shadow-lg transition-all overflow-hidden flex flex-col h-full group"
      itemScope 
      itemType="https://schema.org/Product"
    >
      
      {/* Imagen */}
      <div className="relative aspect-[4/3] bg-zinc-50 overflow-hidden">
        {imagen ? (
          <Image
            src={imagen}
            alt={`${nombre} ${tamaño}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            loading={destacado ? "eager" : "lazy"}
            quality={85}
            itemProp="image"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl opacity-20">{tipoEmoji[tipo]}</span>
          </div>
        )}
        
        {/* Badge flotante */}
        {destacado && (
          <div className="absolute top-2 right-2 px-2.5 py-1 bg-blue-600 text-white text-xs font-bold rounded-md shadow-lg">
            ⭐ Top
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-4 flex-1 flex flex-col gap-3">
        
        {/* Badge + Stock en una línea */}
        <div className="flex items-center justify-between gap-2">
          <span className={`text-xs font-semibold px-2 py-1 rounded border ${config.color}`}>
            {config.badge}
          </span>
          <span className={`text-xs font-medium ${
            stock === 'disponible' ? 'text-green-600' : 
            stock === 'consultar' ? 'text-amber-600' : 'text-blue-600'
          }`}>
            {stock === 'disponible' ? '✓ Stock' : 
             stock === 'consultar' ? 'Consultar' : '7-10 días'}
          </span>
        </div>

        {/* Nombre + Tamaño */}
        <div>
          <h3 className="font-bold text-zinc-900 text-base leading-tight mb-0.5" itemProp="name">
            {nombre}
          </h3>
          <p className="text-sm text-zinc-600">{tamaño}</p>
        </div>

        {/* Precio */}
        <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-2xl font-black text-zinc-900" itemProp="price">
              ${(precioFabrica / 1000).toFixed(0)}k
            </span>
            {ahorro && (
              <span className="text-xs text-green-600 font-semibold">
                (-{ahorroPorc}%)
              </span>
            )}
          </div>
          <meta itemProp="priceCurrency" content="ARS" />
          
          {/* Cuotas - solo colchones */}
          {tipo === 'colchon' && (
            <p className="text-xs text-blue-600 font-medium">
              12 cuotas sin interés
            </p>
          )}
        </div>

        {/* CTA */}
        <a
          href={urlWhatsApp}
          target="_blank"
          rel="noopener noreferrer"
          className="
            mt-auto w-full py-3 px-4
            bg-green-600 hover:bg-green-700 active:bg-green-800
            text-white text-center font-semibold text-sm
            rounded-lg
            transition-colors
            flex items-center justify-center gap-1.5
          "
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          Consultar
        </a>

      </div>
    </article>
  )
}

// ============================================================================
// PRODUCTOS GRID - VERSIÓN PROFESIONAL OPTIMIZADA 📦
// ============================================================================

export default function ProductosGridOptimizado() {
  const [filtroActivo, setFiltroActivo] = useState<'estrella' | 'todos'>('estrella')

  // ============================================================================
  // PRODUCTOS ESTRELLA (6) - Lo que más se vende
  // ============================================================================
  const productosEstrella: ProductCardProps[] = [
    {
      nombre: 'Sonno EP',
      tamaño: '1½ plaza (140cm)',
      precioFabrica: 599000,
      ahorro: 53703,
      ahorroPorc: 8,
      categoria: 'equilibrio',
      destacado: true,
      stock: 'disponible',
      imagen: '/piero-fabrica/images/sonno-ep-140.jpg'
    },
    {
      nombre: 'Nirvana',
      tamaño: '1½ plaza (140cm)',
      precioFabrica: 799000,
      ahorro: 78628,
      ahorroPorc: 9,
      categoria: 'ancla',
      stock: 'disponible',
      imagen: '/piero-fabrica/images/nirvana-140.jpg'
    },
    {
      nombre: 'Nirvana Queen',
      tamaño: 'Queen (160cm)',
      precioFabrica: 1099000,
      ahorro: 162069,
      ahorroPorc: 13,
      categoria: 'ancla',
      stock: 'disponible',
      imagen: '/piero-fabrica/images/nirvana-160.jpg'
    },
    {
      nombre: 'Regno Queen',
      tamaño: 'Queen (160cm)',
      precioFabrica: 749000,
      ahorro: 39724,
      ahorroPorc: 5,
      categoria: 'equilibrio',
      stock: 'disponible',
      imagen: '/piero-fabrica/images/regno-160.jpg'
    },
    {
      nombre: 'Montreaux',
      tamaño: '1½ plaza (140cm)',
      precioFabrica: 1399000,
      ahorro: 148475,
      ahorroPorc: 10,
      categoria: 'premium',
      stock: 'consultar',
      imagen: '/piero-fabrica/images/montreaux-140.jpg'
    },
    {
      nombre: 'Montreaux Pillow',
      tamaño: '1½ plaza (140cm)',
      precioFabrica: 1599000,
      ahorro: 148558,
      ahorroPorc: 9,
      categoria: 'premium',
      stock: 'consultar',
      imagen: '/piero-fabrica/images/montreaux-pillow-140.jpg'
    },
  ]

  // ============================================================================
  // CATÁLOGO COMPLETO - Todos los productos
  // ============================================================================
  const catalogoCompleto: ProductCardProps[] = [
    // PRODUCTOS ESTRELLA (ya mostrados arriba)
    ...productosEstrella,
    
    // 1 PLAZA
    {
      nombre: 'Meditare EP',
      tamaño: '1 plaza (80cm)',
      precioFabrica: 359000,
      ahorro: 28000,
      ahorroPorc: 7,
      categoria: 'ancla',
      stock: 'bajo-pedido',
      imagen: '/piero-fabrica/images/meditare-80.jpg'
    },
    {
      nombre: 'Meditare EP',
      tamaño: '1 plaza (90cm)',
      precioFabrica: 369000,
      ahorro: 29000,
      ahorroPorc: 7,
      categoria: 'ancla',
      stock: 'bajo-pedido',
      imagen: '/piero-fabrica/images/meditare-90.jpg'
    },
    {
      nombre: 'Nirvana',
      tamaño: '1 plaza (80cm)',
      precioFabrica: 549000,
      ahorro: 46000,
      ahorroPorc: 8,
      categoria: 'ancla',
      stock: 'bajo-pedido',
      imagen: '/piero-fabrica/images/nirvana-80.jpg'
    },
    {
      nombre: 'Nirvana',
      tamaño: '1 plaza (90cm)',
      precioFabrica: 579000,
      ahorro: 48000,
      ahorroPorc: 8,
      categoria: 'ancla',
      stock: 'bajo-pedido',
      imagen: '/piero-fabrica/images/nirvana-90.jpg'
    },
    {
      nombre: 'Sonno EP',
      tamaño: '1 plaza (80cm)',
      precioFabrica: 489000,
      ahorro: 40000,
      ahorroPorc: 8,
      categoria: 'equilibrio',
      stock: 'bajo-pedido',
      imagen: '/piero-fabrica/images/sonno-ep-80.jpg'
    },
    {
      nombre: 'Sonno EP',
      tamaño: '1 plaza (90cm)',
      precioFabrica: 519000,
      ahorro: 43000,
      ahorroPorc: 8,
      categoria: 'equilibrio',
      stock: 'bajo-pedido',
      imagen: '/piero-fabrica/images/sonno-ep-90.jpg'
    },
    
    // 1½ PLAZA ADICIONALES
    {
      nombre: 'Meditare EP',
      tamaño: '1½ plaza (140cm)',
      precioFabrica: 469000,
      ahorro: 37000,
      ahorroPorc: 7,
      categoria: 'ancla',
      stock: 'disponible',
      imagen: '/piero-fabrica/images/meditare-140.jpg'
    },
    {
      nombre: 'Gravita',
      tamaño: '1½ plaza (140cm)',
      precioFabrica: 899000,
      ahorro: 43966,
      ahorroPorc: 5,
      categoria: 'equilibrio',
      stock: 'disponible',
      imagen: '/piero-fabrica/images/gravita-140.jpg'
    },
    {
      nombre: 'Regno Pillow',
      tamaño: '1½ plaza (140cm)',
      precioFabrica: 799000,
      ahorro: 72000,
      ahorroPorc: 8,
      categoria: 'equilibrio',
      stock: 'disponible',
      imagen: '/piero-fabrica/images/regno-pillow-140.jpg'
    },
    {
      nombre: 'Dream Fit Pocket',
      tamaño: '1½ plaza (140cm)',
      precioFabrica: 1699000,
      ahorro: 48558,
      ahorroPorc: 3,
      categoria: 'premium',
      stock: 'consultar',
      imagen: '/piero-fabrica/images/dreamfit-pocket-140.jpg'
    },
    
    // QUEEN ADICIONALES
    {
      nombre: 'Gravita Queen',
      tamaño: 'Queen (160cm)',
      precioFabrica: 1099000,
      ahorro: 60000,
      ahorroPorc: 5,
      categoria: 'equilibrio',
      stock: 'disponible',
      imagen: '/piero-fabrica/images/gravita-160.jpg'
    },
    {
      nombre: 'Montreaux Pillow Queen',
      tamaño: 'Queen (160cm)',
      precioFabrica: 1799000,
      ahorro: 130273,
      ahorroPorc: 7,
      categoria: 'premium',
      stock: 'consultar',
      imagen: '/piero-fabrica/images/montreaux-pillow-160.jpg'
    },
    {
      nombre: 'Dream Fit Pocket Queen',
      tamaño: 'Queen (160cm)',
      precioFabrica: 2099000,
      ahorro: 131216,
      ahorroPorc: 6,
      categoria: 'premium',
      stock: 'consultar',
      imagen: '/piero-fabrica/images/dreamfit-pocket-160.jpg'
    },
    
    // KING
    {
      nombre: 'Nirvana King',
      tamaño: 'King (200cm)',
      precioFabrica: 1149000,
      ahorro: 63250,
      ahorroPorc: 5,
      categoria: 'ancla',
      stock: 'disponible',
      imagen: '/piero-fabrica/images/nirvana-200.jpg'
    },
    
    // ACCESORIOS
    {
      nombre: 'Protector Impermeable',
      tamaño: '140cm',
      precioFabrica: 36900,
      categoria: 'accesorio',
      stock: 'disponible',
      tipo: 'protector',
      imagen: '/piero-fabrica/images/protector-140.jpg'
    },
    {
      nombre: 'Protector Impermeable',
      tamaño: 'Queen (160cm)',
      precioFabrica: 39900,
      categoria: 'accesorio',
      stock: 'disponible',
      tipo: 'protector',
      imagen: '/piero-fabrica/images/protector-160.jpg'
    },
    {
      nombre: 'Almohada Fibra Smart',
      tamaño: '70x50cm',
      precioFabrica: 39900,
      categoria: 'accesorio',
      stock: 'disponible',
      tipo: 'almohada',
      imagen: '/piero-fabrica/images/almohada-fibra.jpg'
    },
    {
      nombre: 'Sábanas Bamboo',
      tamaño: 'Queen (160cm)',
      precioFabrica: 119900,
      categoria: 'accesorio',
      stock: 'disponible',
      tipo: 'sabanas',
      imagen: '/piero-fabrica/images/sabanas-160.jpg'
    },
  ]

  const productosAMostrar = filtroActivo === 'estrella' ? productosEstrella : catalogoCompleto

  return (
    <section 
      id="productos" 
      className="bg-white py-12 sm:py-16"
      aria-labelledby="productos-heading"
    >
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 
            id="productos-heading"
            className="text-2xl sm:text-3xl font-black text-zinc-900 mb-3"
          >
            Colchones Piero Fábrica
          </h2>
          <p className="text-zinc-600 max-w-2xl mx-auto">
            30-40% más barato que MercadoLibre • Envío gratis • 7-10 días
          </p>
        </div>

        {/* Toggle Estrella/Todos */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg border border-zinc-200 p-1 bg-zinc-50">
            <button
              onClick={() => setFiltroActivo('estrella')}
              className={`
                px-4 py-2 rounded-md text-sm font-semibold transition-all
                ${filtroActivo === 'estrella' 
                  ? 'bg-white text-zinc-900 shadow-sm' 
                  : 'text-zinc-600 hover:text-zinc-900'
                }
              `}
            >
              ⭐ Más Vendidos (6)
            </button>
            <button
              onClick={() => setFiltroActivo('todos')}
              className={`
                px-4 py-2 rounded-md text-sm font-semibold transition-all
                ${filtroActivo === 'todos' 
                  ? 'bg-white text-zinc-900 shadow-sm' 
                  : 'text-zinc-600 hover:text-zinc-900'
                }
              `}
            >
              Ver Todos ({catalogoCompleto.length})
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-3 mb-8">
          {productosAMostrar.map((producto, index) => (
            <ProductCard key={`${producto.nombre}-${producto.tamaño}-${index}`} {...producto} />
          ))}
        </div>

        {/* CTA Bottom */}
        <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-6 text-center">
          <p className="text-zinc-700 mb-4">
            ¿No encontrás tu modelo? <strong className="text-zinc-900">Consultanos por cualquier producto PIERO</strong>
          </p>
          <a
            href="https://wa.me/5493534017332?text=Hola!%20Quiero%20consultar%20por%20productos%20Piero"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Consultar por WhatsApp
          </a>
        </div>

      </div>
    </section>
  )
}