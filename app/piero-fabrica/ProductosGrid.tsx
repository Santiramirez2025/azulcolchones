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
// PRODUCT CARD - MOBILE-FIRST EXTREMO 📱
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
      emoji: '🔥',
      colorBg: 'bg-red-600',
      colorText: 'text-red-600',
      colorBorder: 'border-red-500/30'
    },
    equilibrio: { 
      badge: 'Más Vendido',
      emoji: '⭐',
      colorBg: 'bg-blue-600',
      colorText: 'text-blue-600',
      colorBorder: 'border-blue-500/30'
    },
    premium: { 
      badge: 'Premium',
      emoji: '👑',
      colorBg: 'bg-amber-600',
      colorText: 'text-amber-600',
      colorBorder: 'border-amber-500/30'
    },
    accesorio: {
      badge: 'Complemento',
      emoji: '💎',
      colorBg: 'bg-green-600',
      colorText: 'text-green-600',
      colorBorder: 'border-green-500/30'
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
        relative bg-white rounded-2xl overflow-hidden
        border-2 ${destacado ? 'border-blue-500' : 'border-zinc-200'}
        ${destacado ? 'shadow-xl shadow-blue-500/20' : 'shadow-lg'}
        flex flex-col h-full
      `}
      itemScope 
      itemType="https://schema.org/Product"
    >
      
      {/* Badge Destacado - Solo si aplica */}
      {destacado && (
        <div 
          className="absolute top-3 left-3 z-20 px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-full shadow-lg"
          aria-label="Producto recomendado"
        >
          ⭐ Recomendado
        </div>
      )}

      {/* Badge Categoría */}
      <div className={`${config.colorBg} text-white px-4 py-2 text-center`}>
        <span className="text-xs font-bold tracking-wide" aria-label={`Categoría: ${config.badge}`}>
          {config.emoji} {config.badge}
        </span>
      </div>

      {/* Imagen - Optimizada Next.js */}
      <div className="relative aspect-[4/3] bg-zinc-100 overflow-hidden">
        {imagen ? (
          <Image
            src={imagen}
            alt={`${nombre} ${tamaño} - Precio de fábrica`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            loading={destacado ? "eager" : "lazy"}
            quality={85}
            itemProp="image"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-200">
            <div className="text-center">
              <div className="text-5xl mb-2" role="img" aria-label={tipo}>
                {tipoEmoji[tipo]}
              </div>
              <p className="text-zinc-500 text-sm font-medium">{nombre}</p>
            </div>
          </div>
        )}
      </div>

      {/* Contenido - Jerarquía Visual Clara */}
      <div className="p-4 flex-1 flex flex-col gap-3">
        
        {/* Nombre + Medida */}
        <div>
          <h3 
            className="text-xl font-black text-zinc-900 leading-tight mb-1"
            itemProp="name"
          >
            {nombre}
          </h3>
          <p className="text-sm text-zinc-600">{tamaño}</p>
        </div>

        {/* Ahorro - Solo si existe */}
        {ahorro && ahorroPorc && (
          <div className={`border ${config.colorBorder} rounded-lg p-2.5 bg-green-50`}>
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-700">Ahorrás:</span>
              <div className="text-right">
                <div className="text-base font-bold text-green-700">
                  ${ahorro.toLocaleString('es-AR')}
                </div>
                <div className="text-xs text-green-600">
                  {ahorroPorc}% menos
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Precio - Máxima Prominencia */}
        <div className="space-y-1" itemProp="offers" itemScope itemType="https://schema.org/Offer">
          <p className="text-xs text-zinc-600">Precio Fábrica:</p>
          <p 
            className="text-3xl font-black text-zinc-900"
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
        </div>

        {/* Sistema de Cuotas - Compacto - Solo para colchones */}
        {tipo === 'colchon' && (
          <details className="group/cuotas">
            <summary className="flex items-center justify-between cursor-pointer list-none py-2 px-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
              <span className="text-sm font-semibold text-blue-700 flex items-center gap-1.5">
                💳 Ver opciones de pago
              </span>
              <svg 
                className="w-4 h-4 text-blue-600 transition-transform group-open/cuotas:rotate-180" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            
            <div className="mt-2 space-y-1.5 text-xs">
              <div className="flex items-center justify-between py-1.5 px-2 bg-green-50 rounded">
                <span className="font-medium text-green-800">Efectivo/Transferencia</span>
                <span className="font-bold text-green-700">Sin recargo</span>
              </div>
              <div className="flex items-center justify-between py-1.5 px-2 bg-green-50 rounded">
                <span className="font-medium text-green-800">Débito/Crédito 1 pago</span>
                <span className="font-bold text-green-700">Sin recargo</span>
              </div>
              <div className="flex items-center justify-between py-1 px-2">
                <span className="text-zinc-700">3 cuotas</span>
                <span className="text-zinc-600">+18%</span>
              </div>
              <div className="flex items-center justify-between py-1 px-2">
                <span className="text-zinc-700">6 cuotas</span>
                <span className="text-zinc-600">+25%</span>
              </div>
              <div className="flex items-center justify-between py-1 px-2">
                <span className="text-zinc-700">9 cuotas</span>
                <span className="text-zinc-600">+35%</span>
              </div>
              <div className="flex items-center justify-between py-1 px-2">
                <span className="text-zinc-700">12 cuotas</span>
                <span className="text-zinc-600">+47%</span>
              </div>
            </div>
          </details>
        )}

        {/* Stock */}
        <div className="py-2">
          {stock === 'disponible' ? (
            <div className="flex items-center gap-2 text-green-700">
              <span className="w-2 h-2 bg-green-500 rounded-full" aria-hidden="true"></span>
              <span className="text-sm font-semibold">Disponible • 7-10 días</span>
            </div>
          ) : stock === 'consultar' ? (
            <div className="flex items-center gap-2 text-amber-700">
              <span className="w-2 h-2 bg-amber-500 rounded-full" aria-hidden="true"></span>
              <span className="text-sm font-semibold">Consultar stock</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-blue-700">
              <span className="w-2 h-2 bg-blue-500 rounded-full" aria-hidden="true"></span>
              <span className="text-sm font-semibold">Bajo pedido • 7-10 días</span>
            </div>
          )}
        </div>

        {/* CTA - Thumb-Friendly */}
        <a
          href={urlWhatsApp}
          target="_blank"
          rel="noopener noreferrer"
          className="
            mt-auto w-full min-h-[56px] px-6 py-4
            bg-green-600 hover:bg-green-700 active:bg-green-800
            text-white text-center font-bold text-base
            rounded-xl
            flex items-center justify-center gap-2
            transition-colors duration-200
            focus:outline-none focus:ring-4 focus:ring-green-500/50
          "
          aria-label={`Consultar ${nombre} por WhatsApp`}
        >
          <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          <span>Consultar</span>
        </a>

      </div>
    </article>
  )
}

// ============================================================================
// PRODUCTOS GRID - CATÁLOGO COMPLETO MODELO FINAL 📦
// ============================================================================

export default function ProductosGridCompleto() {
  const [categoriaActiva, setCategoriaActiva] = useState<'todos' | 'plaza' | 'plaza-media' | 'queen' | 'king' | 'accesorios'>('todos')

  // ============================================================================
  // PILAR 1: PRODUCTOS ANCLA 🎣
  // ============================================================================
  const productosAncla: ProductCardProps[] = [
    // ========== 1 PLAZA (Bajo Pedido - Seña 30%) ==========
    {
      nombre: 'Meditare EP',
      tamaño: '190x80 (1 plaza)',
      precioFabrica: 359000,
      precioOnline: 387000,
      ahorro: 28000,
      ahorroPorc: 7,
      categoria: 'ancla',
      stock: 'bajo-pedido',
      imagen: 'images/meditare-80.jpg'
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
      imagen: 'images/meditare-90.jpg'
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
      imagen: 'images/nirvana-80.jpg'
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
      imagen: 'images/nirvana-90.jpg'
    },
    // ========== 1½ PLAZA (Stock Principal) ==========
    {
      nombre: 'Meditare EP',
      tamaño: '190x140 (1½ plaza)',
      precioFabrica: 469000,
      precioOnline: 506000,
      ahorro: 37000,
      ahorroPorc: 7,
      categoria: 'ancla',
      stock: 'disponible',
      imagen: 'images/meditare-140.jpg'
    },
    {
      nombre: 'Nirvana',
      tamaño: '190x140 (1½ plaza)',
      precioFabrica: 799000,
      precioOnline: 877628,
      ahorro: 78628,
      ahorroPorc: 9,
      categoria: 'ancla',
      stock: 'disponible',
      imagen: 'images/nirvana-140.jpg'
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
      imagen: 'images/nirvana-160.jpg'
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
      imagen: 'images/nirvana-200.jpg'
    },
  ]

  // ============================================================================
  // PILAR 2: PRODUCTOS EQUILIBRIO ⭐ (El corazón del negocio)
  // ============================================================================
  const productosEquilibrio: ProductCardProps[] = [
    // ========== 1 PLAZA (Bajo Pedido) ==========
    {
      nombre: 'Sonno EP',
      tamaño: '190x80 (1 plaza)',
      precioFabrica: 489000,
      precioOnline: 529000,
      ahorro: 40000,
      ahorroPorc: 8,
      categoria: 'equilibrio',
      stock: 'bajo-pedido',
      imagen: 'images/sonno-ep-80.jpg'
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
      imagen: 'images/sonno-ep-90.jpg'
    },
    // ========== 1½ PLAZA (Estrella Absoluta) ==========
    {
      nombre: 'Sonno EP',
      tamaño: '190x140 (1½ plaza)',
      precioFabrica: 599000,
      precioOnline: 652703,
      ahorro: 53703,
      ahorroPorc: 8,
      categoria: 'equilibrio',
      destacado: true, // ⭐ PRODUCTO PIVOT CENTRAL
      stock: 'disponible',
      imagen: 'images/sonno-ep-140.jpg'
    },
    {
      nombre: 'Gravita',
      tamaño: '190x140 (1½ plaza)',
      precioFabrica: 899000,
      precioOnline: 942966,
      ahorro: 43966,
      ahorroPorc: 5,
      categoria: 'equilibrio',
      stock: 'disponible',
      imagen: 'images/gravita-140.jpg'
    },
    {
      nombre: 'Regno Pillow Top',
      tamaño: '190x140 (1½ plaza)',
      precioFabrica: 799000,
      precioOnline: 871000,
      ahorro: 72000,
      ahorroPorc: 8,
      categoria: 'equilibrio',
      stock: 'disponible',
      imagen: 'images/regno-pillow-140.jpg'
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
      imagen: 'images/regno-160.jpg'
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
      imagen: 'images/gravita-160.jpg'
    },
  ]

  // ============================================================================
  // PILAR 3: PRODUCTOS PREMIUM 👑
  // ============================================================================
  const productosPremium: ProductCardProps[] = [
    // 1½ PLAZA
    {
      nombre: 'Montreaux',
      tamaño: '190x140 (1½ plaza)',
      precioFabrica: 1399000,
      precioOnline: 1547475,
      ahorro: 148475,
      ahorroPorc: 10,
      categoria: 'premium',
      stock: 'consultar',
      imagen: 'images/montreaux-140.jpg'
    },
    {
      nombre: 'Montreaux Pillow Top',
      tamaño: '190x140 (1½ plaza)',
      precioFabrica: 1599000,
      precioOnline: 1747558,
      ahorro: 148558,
      ahorroPorc: 9,
      categoria: 'premium',
      stock: 'consultar',
      imagen: 'images/montreaux-pillow-140.jpg'
    },
    {
      nombre: 'Dream Fit Pocket',
      tamaño: '190x140 (1½ plaza)',
      precioFabrica: 1699000,
      precioOnline: 1747558,
      ahorro: 48558,
      ahorroPorc: 3,
      categoria: 'premium',
      stock: 'consultar',
      imagen: 'images/dreamfit-pocket-140.jpg'
    },
    // QUEEN
    {
      nombre: 'Montreaux Pillow Top Queen',
      tamaño: '200x160 (Queen)',
      precioFabrica: 1799000,
      precioOnline: 1929273,
      ahorro: 130273,
      ahorroPorc: 7,
      categoria: 'premium',
      stock: 'consultar',
      imagen: 'images/montreaux-pillow-160.jpg'
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
      imagen: 'images/dreamfit-pocket-160.jpg'
    },
  ]

  // ============================================================================
  // ACCESORIOS 💎 (Rentabilidad oculta)
  // ============================================================================
  const accesorios: ProductCardProps[] = [
    // PROTECTORES (TOP rentabilidad)
    {
      nombre: 'Protector Impermeable',
      tamaño: '140x190 cm',
      precioFabrica: 36900,
      categoria: 'accesorio',
      stock: 'disponible',
      tipo: 'protector',
      imagen: 'images/protector-140.jpg'
    },
    {
      nombre: 'Protector Impermeable',
      tamaño: '160x200 cm (Queen)',
      precioFabrica: 39900,
      categoria: 'accesorio',
      stock: 'disponible',
      tipo: 'protector',
      imagen: 'images/protector-160.jpg'
    },
    {
      nombre: 'Protector Impermeable',
      tamaño: '200x200 cm (King)',
      precioFabrica: 42900,
      categoria: 'accesorio',
      stock: 'disponible',
      tipo: 'protector',
      imagen: 'images/protector-200.jpg'
    },
    // ALMOHADAS
    {
      nombre: 'Almohada Fibra Smart Tech Plus',
      tamaño: '70x50 cm',
      precioFabrica: 39900,
      categoria: 'accesorio',
      stock: 'disponible',
      tipo: 'almohada',
      imagen: 'images/almohada-fibra.jpg'
    },
    {
      nombre: 'Almohada Micro Max Premium',
      tamaño: '70x50 cm',
      precioFabrica: 69900,
      categoria: 'accesorio',
      stock: 'disponible',
      tipo: 'almohada',
      imagen: 'images/almohada-micro.jpg'
    },
    // SÁBANAS BAMBOO
    {
      nombre: 'Sábanas Bamboo 600 Hilos',
      tamaño: '140x190 cm',
      precioFabrica: 89900,
      categoria: 'accesorio',
      stock: 'disponible',
      tipo: 'sabanas',
      imagen: 'images/sabanas-140.jpg'
    },
    {
      nombre: 'Sábanas Bamboo 600 Hilos',
      tamaño: '160x200 cm (Queen)',
      precioFabrica: 119900,
      categoria: 'accesorio',
      stock: 'disponible',
      tipo: 'sabanas',
      imagen: 'images/sabanas-160.jpg'
    },
    {
      nombre: 'Sábanas Bamboo 600 Hilos',
      tamaño: '200x200 cm (King)',
      precioFabrica: 139900,
      categoria: 'accesorio',
      stock: 'disponible',
      tipo: 'sabanas',
      imagen: 'images/sabanas-200.jpg'
    },
  ]

  // COMBINAR TODOS LOS PRODUCTOS
  const todosLosProductos = [
    ...productosAncla,
    ...productosEquilibrio,
    ...productosPremium,
    ...accesorios
  ]

  // FILTRAR PRODUCTOS SEGÚN CATEGORÍA
  const productosFiltrados = todosLosProductos.filter(producto => {
    if (categoriaActiva === 'todos') return true
    if (categoriaActiva === 'plaza') return producto.tamaño.includes('1 plaza') && !producto.tamaño.includes('1½')
    if (categoriaActiva === 'plaza-media') return producto.tamaño.includes('1½ plaza') || producto.tamaño.includes('140')
    if (categoriaActiva === 'queen') return producto.tamaño.includes('Queen') || producto.tamaño.includes('160')
    if (categoriaActiva === 'king') return producto.tamaño.includes('King') || producto.tamaño.includes('200x200')
    if (categoriaActiva === 'accesorios') return producto.categoria === 'accesorio'
    return true
  })

  // ✅ TODOS LOS PRODUCTOS SIEMPRE VISIBLES - CERO FRICCIÓN
  const productosAMostrar = productosFiltrados

  return (
    <section 
      id="productos" 
      className="bg-zinc-50 py-12 sm:py-16"
      aria-labelledby="productos-heading"
    >
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <header className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 border border-blue-200 rounded-full text-blue-700 text-xs font-semibold mb-3">
            <span role="img" aria-label="Productos">📦</span>
            <span>Catálogo Completo PIERO Fábrica</span>
          </div>
          
          <h2 
            id="productos-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-black text-zinc-900 mb-3"
          >
            Elegí Tu Colchón Perfecto
          </h2>
          <p className="text-base sm:text-lg text-zinc-700 max-w-2xl mx-auto">
            Directo de fábrica con <strong className="text-zinc-900">30-40% descuento</strong><br/>
            <span className="text-sm text-zinc-600">Todas las medidas + Accesorios premium</span>
          </p>
        </header>

        {/* FILTROS POR CATEGORÍA */}
        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex gap-2 min-w-max justify-center">
            <button
              onClick={() => setCategoriaActiva('todos')}
              className={`
                px-4 py-2 rounded-lg font-semibold text-sm transition-all
                ${categoriaActiva === 'todos' 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-white text-zinc-700 border border-zinc-300 hover:border-blue-500'
                }
              `}
            >
              Todos ({todosLosProductos.length})
            </button>
            <button
              onClick={() => setCategoriaActiva('plaza')}
              className={`
                px-4 py-2 rounded-lg font-semibold text-sm transition-all
                ${categoriaActiva === 'plaza' 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-white text-zinc-700 border border-zinc-300 hover:border-blue-500'
                }
              `}
            >
              1 Plaza
            </button>
            <button
              onClick={() => setCategoriaActiva('plaza-media')}
              className={`
                px-4 py-2 rounded-lg font-semibold text-sm transition-all
                ${categoriaActiva === 'plaza-media' 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-white text-zinc-700 border border-zinc-300 hover:border-blue-500'
                }
              `}
            >
              1½ Plaza
            </button>
            <button
              onClick={() => setCategoriaActiva('queen')}
              className={`
                px-4 py-2 rounded-lg font-semibold text-sm transition-all
                ${categoriaActiva === 'queen' 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-white text-zinc-700 border border-zinc-300 hover:border-blue-500'
                }
              `}
            >
              Queen
            </button>
            <button
              onClick={() => setCategoriaActiva('king')}
              className={`
                px-4 py-2 rounded-lg font-semibold text-sm transition-all
                ${categoriaActiva === 'king' 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-white text-zinc-700 border border-zinc-300 hover:border-blue-500'
                }
              `}
            >
              King
            </button>
            <button
              onClick={() => setCategoriaActiva('accesorios')}
              className={`
                px-4 py-2 rounded-lg font-semibold text-sm transition-all
                ${categoriaActiva === 'accesorios' 
                  ? 'bg-green-600 text-white shadow-lg' 
                  : 'bg-white text-zinc-700 border border-zinc-300 hover:border-green-500'
                }
              `}
            >
              💎 Accesorios
            </button>
          </div>
        </div>

        {/* CONTADOR DE PRODUCTOS FILTRADOS */}
        <div className="text-center mb-6">
          <p className="text-sm text-zinc-600">
            Mostrando <strong className="text-zinc-900">{productosAMostrar.length}</strong> de <strong className="text-zinc-900">{productosFiltrados.length}</strong> productos
          </p>
        </div>

        {/* Grid - Mobile-first optimizado */}
        <div 
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8"
          role="list"
        >
          {productosAMostrar.map((producto, index) => (
            <div key={`${producto.nombre}-${producto.tamaño}-${index}`} role="listitem">
              <ProductCard {...producto} />
            </div>
          ))}
        </div>

        {/* INFO BOX: Accesorios complementan rentabilidad */}
        {categoriaActiva === 'accesorios' && (
          <div className="mb-8 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="text-4xl">💎</div>
              <div>
                <h3 className="text-xl font-bold text-green-900 mb-2">
                  Accesorios: La rentabilidad oculta
                </h3>
                <p className="text-green-800 mb-3">
                  Los accesorios tienen <strong>márgenes del 20-26%</strong> y se venden en el 70% de las compras de colchones.
                </p>
                <ul className="space-y-1 text-sm text-green-700">
                  <li>✅ Protector: Argumento "Protege tu inversión"</li>
                  <li>✅ Almohadas: "Están vencidas después de 2 años"</li>
                  <li>✅ Sábanas Bamboo: Premium 600 hilos</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* CTA Final - Thumb-friendly */}
        <div className="mt-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 sm:p-8 text-center shadow-xl">
          <div className="max-w-2xl mx-auto space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              ¿No encontrás tu modelo o medida?
            </h3>
            <p className="text-sm sm:text-base text-blue-100">
              Consultanos por cualquier producto PIERO en cualquier medida al precio de fábrica
            </p>
            <a
              href="https://wa.me/5493534017332?text=Hola!%20Quiero%20consultar%20por%20productos%20Piero%20Fábrica"
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center justify-center gap-2
                min-h-[56px] px-8 py-4
                bg-white hover:bg-zinc-50 active:bg-zinc-100
                text-blue-700 font-bold text-base
                rounded-xl
                transition-colors duration-200
                focus:outline-none focus:ring-4 focus:ring-white/50
                w-full sm:w-auto
              "
              aria-label="Consultar por WhatsApp"
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span>Consultar Ahora</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}