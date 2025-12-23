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
  tipo?: 'colchon' | 'protector' | 'almohada' | 'sabanas' | 'cubre'
}

// ============================================================================
// PRODUCT CARD - DISEÑO PROFESIONAL COHERENTE
// ============================================================================

function ProductCard({ 
  nombre, 
  tamaño, 
  precioFabrica, 
  precioOnline,
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
      badge: 'Mejor Precio',
      colorBg: 'from-red-600 to-red-700',
      colorBorder: 'border-red-500/30',
      colorAccent: 'text-red-600'
    },
    equilibrio: { 
      badge: 'Más Vendido',
      colorBg: 'from-blue-600 to-blue-700',
      colorBorder: 'border-blue-500/30',
      colorAccent: 'text-blue-600'
    },
    premium: { 
      badge: 'Premium',
      colorBg: 'from-amber-600 to-amber-700',
      colorBorder: 'border-amber-500/30',
      colorAccent: 'text-amber-600'
    },
    accesorio: {
      badge: 'Complemento',
      colorBg: 'from-green-600 to-green-700',
      colorBorder: 'border-green-500/30',
      colorAccent: 'text-green-600'
    }
  }

  const config = categoriaConfig[categoria]
  const urlWhatsApp = `https://wa.me/5493534017332?text=${encodeURIComponent(`Hola! Consulto por ${nombre} ${tamaño} a precio de fábrica`)}`

  // Emoji según tipo de producto
  const tipoEmoji = {
    colchon: '🛏️',
    protector: '🛡️',
    almohada: '💤',
    sabanas: '✨',
    cubre: '🧵'
  }

  return (
    <article 
      className={`
        group relative bg-white rounded-2xl overflow-hidden
        border ${destacado ? 'border-blue-500 border-2' : 'border-zinc-200'}
        ${destacado ? 'shadow-2xl shadow-blue-500/20' : 'shadow-lg hover:shadow-xl'}
        transition-all duration-300 hover:-translate-y-1
        flex flex-col h-full
      `}
      itemScope 
      itemType="https://schema.org/Product"
    >
      
      {/* Badge Destacado */}
      {destacado && (
        <div 
          className="absolute top-4 left-4 z-20 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs font-bold rounded-full shadow-lg animate-pulse"
          aria-label="Producto recomendado"
        >
          ⭐ Recomendado
        </div>
      )}

      {/* Badge Categoría - Integrado con el diseño principal */}
      <div className={`bg-gradient-to-r ${config.colorBg} text-white px-6 py-3 text-center`}>
        <span className="text-sm font-bold tracking-wide" aria-label={`Categoría: ${config.badge}`}>
          {config.badge}
        </span>
      </div>

      {/* Imagen - Placeholder coherente con el diseño */}
      <div className="relative aspect-[4/3] bg-gradient-to-br from-zinc-50 to-zinc-100 overflow-hidden">
        {imagen ? (
          <Image
            src={imagen}
            alt={`${nombre} ${tamaño} - Precio de fábrica`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            loading={destacado ? "eager" : "lazy"}
            quality={85}
            itemProp="image"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-3 opacity-20" role="img" aria-label={tipo}>
                {tipoEmoji[tipo]}
              </div>
              <p className="text-zinc-400 text-sm font-semibold px-4">{nombre}</p>
            </div>
          </div>
        )}
        
        {/* Overlay sutil en hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Contenido Principal */}
      <div className="p-6 flex-1 flex flex-col gap-4">
        
        {/* Header: Nombre + Tamaño */}
        <div>
          <h3 
            className="text-xl font-bold text-zinc-900 leading-tight mb-1.5"
            itemProp="name"
          >
            {nombre}
          </h3>
          <p className="text-sm text-zinc-600 font-medium">{tamaño}</p>
        </div>

        {/* Ahorro Destacado */}
        {ahorro && ahorroPorc && (
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-green-700">Ahorrás:</span>
              <div className="text-right">
                <div className="text-lg font-black text-green-700">
                  ${ahorro.toLocaleString('es-AR')}
                </div>
                <div className="text-xs font-bold text-green-600">
                  {ahorroPorc}% de descuento
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Precio Principal */}
        <div className="space-y-1.5" itemProp="offers" itemScope itemType="https://schema.org/Offer">
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">Precio Fábrica</p>
          <p 
            className="text-4xl font-black text-zinc-900"
            itemProp="price"
            content={precioFabrica.toString()}
          >
            ${precioFabrica.toLocaleString('es-AR')}
          </p>
          <meta itemProp="priceCurrency" content="ARS" />
          <meta itemProp="availability" content={
            stock === 'disponible' ? 'https://schema.org/InStock' : 
            stock === 'consultar' ? 'https://schema.org/PreOrder' :
            'https://schema.org/PreSale'
          } />
          
          {/* Precio comparativo tachado */}
          {precioOnline && (
            <p className="text-sm text-zinc-500">
              <span className="line-through">${precioOnline.toLocaleString('es-AR')}</span>
              <span className="ml-2 text-green-600 font-semibold">en otros sitios</span>
            </p>
          )}
        </div>

        {/* Opciones de Pago - Solo para colchones */}
        {tipo === 'colchon' && (
          <details className="group/cuotas border border-zinc-200 rounded-xl overflow-hidden">
            <summary className="flex items-center justify-between cursor-pointer list-none py-3 px-4 bg-zinc-50 hover:bg-zinc-100 transition-colors">
              <span className="text-sm font-bold text-zinc-700 flex items-center gap-2">
                💳 Opciones de pago
              </span>
              <svg 
                className="w-5 h-5 text-zinc-500 transition-transform group-open/cuotas:rotate-180" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            
            <div className="bg-white border-t border-zinc-200">
              <div className="p-4 space-y-2.5">
                {/* Métodos sin recargo */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs font-bold text-green-800 uppercase tracking-wide">Sin Recargo</span>
                  </div>
                  <div className="space-y-1 text-xs text-green-700">
                    <p className="font-semibold">• Efectivo / Transferencia</p>
                    <p className="font-semibold">• Débito / Crédito 1 pago</p>
                  </div>
                </div>
                
                {/* Cuotas con recargo */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between py-2 px-3 bg-zinc-50 rounded">
                    <span className="font-medium text-zinc-700">3 cuotas</span>
                    <span className="font-bold text-zinc-600">+18%</span>
                  </div>
                  <div className="flex items-center justify-between py-2 px-3 bg-zinc-50 rounded">
                    <span className="font-medium text-zinc-700">6 cuotas</span>
                    <span className="font-bold text-zinc-600">+25%</span>
                  </div>
                  <div className="flex items-center justify-between py-2 px-3 bg-zinc-50 rounded">
                    <span className="font-medium text-zinc-700">9 cuotas</span>
                    <span className="font-bold text-zinc-600">+35%</span>
                  </div>
                  <div className="flex items-center justify-between py-2 px-3 bg-zinc-50 rounded">
                    <span className="font-medium text-zinc-700">12 cuotas</span>
                    <span className="font-bold text-zinc-600">+47%</span>
                  </div>
                </div>
              </div>
            </div>
          </details>
        )}

        {/* Estado de Stock */}
        <div className="py-3 border-t border-zinc-100">
          {stock === 'disponible' ? (
            <div className="flex items-center gap-2.5 text-green-700">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-sm font-bold">Disponible • 7-10 días</span>
            </div>
          ) : stock === 'consultar' ? (
            <div className="flex items-center gap-2.5 text-amber-700">
              <span className="w-3 h-3 bg-amber-500 rounded-full" aria-hidden="true"></span>
              <span className="text-sm font-bold">Consultar disponibilidad</span>
            </div>
          ) : (
            <div className="flex items-center gap-2.5 text-blue-700">
              <span className="w-3 h-3 bg-blue-500 rounded-full" aria-hidden="true"></span>
              <span className="text-sm font-bold">Bajo pedido • 7-10 días</span>
            </div>
          )}
        </div>

        {/* CTA Principal */}
        <a
          href={urlWhatsApp}
          target="_blank"
          rel="noopener noreferrer"
          className="
            mt-auto w-full min-h-[56px] px-6 py-4
            bg-gradient-to-r from-green-600 to-green-700
            hover:from-green-700 hover:to-green-800
            active:from-green-800 active:to-green-900
            text-white text-center font-bold text-base
            rounded-xl
            flex items-center justify-center gap-3
            transition-all duration-300
            shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40
            focus:outline-none focus:ring-4 focus:ring-green-500/50
            group/cta
          "
          aria-label={`Consultar ${nombre} por WhatsApp`}
        >
          <svg className="w-6 h-6 flex-shrink-0 group-hover/cta:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          <span>Consultar Ahora</span>
        </a>

      </div>
    </article>
  )
}

// ============================================================================
// PRODUCTOS GRID PRINCIPAL
// ============================================================================

export default function ProductosGridOptimizado() {
  const [categoriaActiva, setCategoriaActiva] = useState<'todos' | 'plaza' | 'plaza-media' | 'queen' | 'king' | 'accesorios'>('todos')

  // ============================================================================
  // PRODUCTOS DATA
  // ============================================================================
  
  const productosAncla: ProductCardProps[] = [
    // ========== 1 PLAZA ==========
    {
      nombre: 'Meditare EP',
      tamaño: '190x80 (1 plaza)',
      precioFabrica: 359000,
      precioOnline: 387000,
      ahorro: 28000,
      ahorroPorc: 7,
      categoria: 'ancla',
      stock: 'bajo-pedido',
      imagen: '/images/meditare-80.jpg'
    },
    {
      nombre: 'Meditare EP',
      tamaño: '190x90 (1 plaza)',
      precioFabrica: 369000,
      precioOnline: 398000,
      ahorro: 29000,
      ahorroPorc: 7,
      categoria: 'ancla',
      stock: 'bajo-pedido',
      imagen: '/images/meditare-90.jpg'
    },
    {
      nombre: 'Nirvana',
      tamaño: '190x80 (1 plaza)',
      precioFabrica: 549000,
      precioOnline: 595000,
      ahorro: 46000,
      ahorroPorc: 8,
      categoria: 'ancla',
      stock: 'bajo-pedido',
      imagen: '/images/nirvana-80.jpg'
    },
    {
      nombre: 'Nirvana',
      tamaño: '190x90 (1 plaza)',
      precioFabrica: 579000,
      precioOnline: 627000,
      ahorro: 48000,
      ahorroPorc: 8,
      categoria: 'ancla',
      stock: 'bajo-pedido',
      imagen: '/images/nirvana-90.jpg'
    },
    // ========== 1½ PLAZA ==========
    {
      nombre: 'Meditare EP',
      tamaño: '190x140 (2 plazas)',
      precioFabrica: 469000,
      precioOnline: 506000,
      ahorro: 37000,
      ahorroPorc: 7,
      categoria: 'ancla',
      stock: 'disponible',
      imagen: '/images/meditare-140.jpg'
    },
    {
      nombre: 'Nirvana',
      tamaño: '190x140 (2 plazas)',
      precioFabrica: 799000,
      precioOnline: 877628,
      ahorro: 78628,
      ahorroPorc: 9,
      categoria: 'ancla',
      stock: 'disponible',
      imagen: '/images/nirvana-140.jpg'
    },
    // ========== QUEEN ==========
    {
      nombre: 'Nirvana Queen',
      tamaño: '200x160 (Queen)',
      precioFabrica: 1099000,
      precioOnline: 1261069,
      ahorro: 162069,
      ahorroPorc: 13,
      categoria: 'ancla',
      stock: 'disponible',
      imagen: '/images/nirvana-1600.jpg'
    },
    // ========== KING ==========
    {
      nombre: 'Nirvana King',
      tamaño: '200x200 (King)',
      precioFabrica: 1149000,
      precioOnline: 1212250,
      ahorro: 63250,
      ahorroPorc: 5,
      categoria: 'ancla',
      stock: 'disponible',
      imagen: '/images/nirvana-2000.jpg'
    },
  ]

  const productosEquilibrio: ProductCardProps[] = [
    // ========== 1 PLAZA ==========
    {
      nombre: 'Sonno EP',
      tamaño: '190x80 (1 plaza)',
      precioFabrica: 489000,
      precioOnline: 529000,
      ahorro: 40000,
      ahorroPorc: 8,
      categoria: 'equilibrio',
      stock: 'bajo-pedido',
      imagen: '/images/sonno-ep-80.jpg'
    },
    {
      nombre: 'Sonno EP',
      tamaño: '190x90 (1 plaza)',
      precioFabrica: 519000,
      precioOnline: 562000,
      ahorro: 43000,
      ahorroPorc: 8,
      categoria: 'equilibrio',
      stock: 'bajo-pedido',
      imagen: '/images/sonno-ep-90.jpg'
    },
    // ========== 1½ PLAZA ==========
    {
      nombre: 'Sonno EP',
      tamaño: '190x140 (2 plazas)',
      precioFabrica: 599000,
      precioOnline: 652703,
      ahorro: 53703,
      ahorroPorc: 8,
      categoria: 'equilibrio',
      destacado: true,
      stock: 'disponible',
      imagen: '/images/sonno-ep-140.jpg'
    },
    {
      nombre: 'Gravita',
      tamaño: '190x140 (2 plazas)',
      precioFabrica: 899000,
      precioOnline: 942966,
      ahorro: 43966,
      ahorroPorc: 5,
      categoria: 'equilibrio',
      stock: 'disponible',
      imagen: '/images/gravita-140.jpg'
    },
    {
      nombre: 'Regno Pillow Top',
      tamaño: '190x140 (2 plazas)',
      precioFabrica: 799000,
      precioOnline: 871000,
      ahorro: 72000,
      ahorroPorc: 8,
      categoria: 'equilibrio',
      stock: 'disponible',
      imagen: '/images/regno-pillow-140.jpg'
    },
    // ========== QUEEN ==========
    {
      nombre: 'Regno Queen',
      tamaño: '200x160 (Queen)',
      precioFabrica: 749000,
      precioOnline: 788724,
      ahorro: 39724,
      ahorroPorc: 5,
      categoria: 'equilibrio',
      stock: 'disponible',
      imagen: '/images/regno-160.jpg'
    },
    {
      nombre: 'Gravita Queen',
      tamaño: '200x160 (Queen)',
      precioFabrica: 1099000,
      precioOnline: 1159000,
      ahorro: 60000,
      ahorroPorc: 5,
      categoria: 'equilibrio',
      stock: 'disponible',
      imagen: '/images/gravita-1600.jpg'
    },
  ]

  const productosPremium: ProductCardProps[] = [
    // ========== 1½ PLAZA ==========
    {
      nombre: 'Montreaux',
      tamaño: '190x140 (2 plazas)',
      precioFabrica: 1399000,
      precioOnline: 1547475,
      ahorro: 148475,
      ahorroPorc: 10,
      categoria: 'premium',
      stock: 'consultar',
      imagen: '/images/montreaux-140.jpg'
    },
    {
      nombre: 'Montreaux Pillow Top',
      tamaño: '190x140 (2 plazas)',
      precioFabrica: 1599000,
      precioOnline: 1747558,
      ahorro: 148558,
      ahorroPorc: 9,
      categoria: 'premium',
      stock: 'consultar',
      imagen: '/images/montreaux-pillow-1400.jpg'
    },
    {
      nombre: 'Dream Fit Pocket',
      tamaño: '190x140 (2 plazas)',
      precioFabrica: 1699000,
      precioOnline: 1747558,
      ahorro: 48558,
      ahorroPorc: 3,
      categoria: 'premium',
      stock: 'consultar',
      imagen: '/images/dreamfit-pocket-140.jpg'
    },
    // ========== QUEEN ==========
    {
      nombre: 'Montreaux Pillow Top Queen',
      tamaño: '200x160 (Queen)',
      precioFabrica: 1799000,
      precioOnline: 1929273,
      ahorro: 130273,
      ahorroPorc: 7,
      categoria: 'premium',
      stock: 'consultar',
      imagen: '/images/montreaux-pillow-1600.jpg'
    },
    {
      nombre: 'Dream Fit Pocket Queen',
      tamaño: '200x160 (Queen)',
      precioFabrica: 2099000,
      precioOnline: 2230216,
      ahorro: 131216,
      ahorroPorc: 6,
      categoria: 'premium',
      stock: 'consultar',
      imagen: '/images/dreamfit-pocket-140.jpg'
    },
  ]

  const accesorios: ProductCardProps[] = [
    // ========== PROTECTORES ==========
    {
      nombre: 'Protector Impermeable',
      tamaño: '140x190 cm',
      precioFabrica: 36900,
      categoria: 'accesorio',
      stock: 'disponible',
      tipo: 'protector',
      imagen: '/images/protector-140.jpg'
    },
    {
      nombre: 'Protector Impermeable',
      tamaño: '160x200 cm (Queen)',
      precioFabrica: 39900,
      categoria: 'accesorio',
      stock: 'disponible',
      tipo: 'protector',
      imagen: '/images/protector-160.jpg'
    },
    {
      nombre: 'Protector Impermeable',
      tamaño: '200x200 cm (King)',
      precioFabrica: 42900,
      categoria: 'accesorio',
      stock: 'disponible',
      tipo: 'protector',
      imagen: '/images/protector-200.jpg'
    },
    // ========== ALMOHADAS ==========
    {
      nombre: 'Almohada Fibra Smart Tech Plus',
      tamaño: '70x50 cm',
      precioFabrica: 39900,
      categoria: 'accesorio',
      stock: 'disponible',
      tipo: 'almohada',
      imagen: '/images/almohada-fibra.jpg'
    },
    {
      nombre: 'Almohada Micro Max Premium',
      tamaño: '70x50 cm',
      precioFabrica: 69900,
      categoria: 'accesorio',
      stock: 'disponible',
      tipo: 'almohada',
      imagen: '/images/almohada-micro.jpg'
    },
    // ========== SÁBANAS BAMBOO ==========
    {
      nombre: 'Sábanas Bamboo 600 Hilos',
      tamaño: '140x190 cm',
      precioFabrica: 89900,
      categoria: 'accesorio',
      stock: 'disponible',
      tipo: 'sabanas',
      imagen: '/images/sabanas-140.jpg'
    },
    {
      nombre: 'Sábanas Bamboo 600 Hilos',
      tamaño: '160x200 cm (Queen)',
      precioFabrica: 119900,
      categoria: 'accesorio',
      stock: 'disponible',
      tipo: 'sabanas',
      imagen: '/images/sabanas-160.jpg'
    },
    {
      nombre: 'Sábanas Bamboo 600 Hilos',
      tamaño: '200x200 cm (King)',
      precioFabrica: 139900,
      categoria: 'accesorio',
      stock: 'disponible',
      tipo: 'sabanas',
      imagen: '/images/sabanas-200.jpg'
    },
  ]

  const todosLosProductos = [
    ...productosAncla,
    ...productosEquilibrio,
    ...productosPremium,
    ...accesorios
  ]

  const productosFiltrados = todosLosProductos.filter(producto => {
    if (categoriaActiva === 'todos') return true
    if (categoriaActiva === 'plaza') return producto.tamaño.includes('1 plaza') && !producto.tamaño.includes('1½')
    if (categoriaActiva === 'plaza-media') return producto.tamaño.includes('1½ plaza') || producto.tamaño.includes('140')
    if (categoriaActiva === 'queen') return producto.tamaño.includes('Queen') || producto.tamaño.includes('160')
    if (categoriaActiva === 'king') return producto.tamaño.includes('King') || producto.tamaño.includes('200x200')
    if (categoriaActiva === 'accesorios') return producto.categoria === 'accesorio'
    return true
  })

  return (
    <section 
      id="productos" 
      className="relative bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-950 py-20"
      aria-labelledby="productos-heading"
    >
      {/* Efecto de fondo sutil */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute w-96 h-96 bg-blue-500 rounded-full blur-3xl top-0 right-0"></div>
        <div className="absolute w-96 h-96 bg-purple-500 rounded-full blur-3xl bottom-0 left-0"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        
        {/* Header Refinado */}
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm font-bold mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Catálogo Completo PIERO
          </div>
          
          <h2 
            id="productos-heading"
            className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight"
          >
            Elegí Tu Colchón
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500">
              Directo de Fábrica
            </span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Todos los modelos con <strong className="text-white">30-40% de descuento</strong> vs. online
          </p>
        </header>

        {/* Filtros Refinados */}
        <div className="mb-12 overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex gap-3 min-w-max justify-center px-4">
            {[
              { id: 'todos', label: 'Todos', count: todosLosProductos.length },
              { id: 'plaza', label: '1 Plaza', count: null },
              { id: 'plaza-media', label: '1½ Plaza', count: null },
              { id: 'queen', label: 'Queen', count: null },
              { id: 'king', label: 'King', count: null },
              { id: 'accesorios', label: '💎 Accesorios', count: null },
            ].map((filtro) => (
              <button
                key={filtro.id}
                onClick={() => setCategoriaActiva(filtro.id as any)}
                className={`
                  px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300
                  ${categoriaActiva === filtro.id
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30 scale-105' 
                    : 'bg-zinc-800/50 text-zinc-400 border border-zinc-700/50 hover:border-blue-500/50 hover:text-white'
                  }
                `}
              >
                {filtro.label} {filtro.count && `(${filtro.count})`}
              </button>
            ))}
          </div>
        </div>

        {/* Contador de Productos */}
        <div className="text-center mb-8">
          <p className="text-sm text-zinc-500">
            Mostrando <strong className="text-white">{productosFiltrados.length}</strong> productos
          </p>
        </div>

        {/* Grid Principal */}
        <div 
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-16"
          role="list"
        >
          {productosFiltrados.map((producto, index) => (
            <div key={`${producto.nombre}-${producto.tamaño}-${index}`} role="listitem">
              <ProductCard {...producto} />
            </div>
          ))}
        </div>

        {/* CTA Final Refinado */}
        <div className="bg-gradient-to-br from-blue-950/50 to-purple-950/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            ¿No encontrás tu modelo?
          </h3>
          <p className="text-lg text-zinc-300 mb-8 max-w-2xl mx-auto">
            Consultanos por cualquier producto PIERO en cualquier medida al precio de fábrica
          </p>
          <a
            href="https://wa.me/5493534017332?text=Hola!%20Quiero%20consultar%20por%20productos%20Piero%20Fábrica"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center justify-center gap-3
              min-h-[56px] px-10 py-4
              bg-gradient-to-r from-green-600 to-green-700
              hover:from-green-700 hover:to-green-800
              text-white font-bold text-lg
              rounded-xl
              transition-all duration-300
              shadow-2xl shadow-green-500/40 hover:shadow-green-500/60
              hover:scale-105
              focus:outline-none focus:ring-4 focus:ring-green-500/50
            "
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            <span>Consultar Ahora</span>
          </a>
        </div>

      </div>
    </section>
  )
}