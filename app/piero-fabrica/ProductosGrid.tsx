'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { trackWhatsAppClick, trackViewContent, trackSearch } from '@/lib/pixel'

// ============================================================================
// TYPES
// ============================================================================

interface ProductCardProps {
  nombre: string
  tamaño: string
  precioPublico: number
  precioMercadoLibre?: number
  ahorro?: number
  ahorroPorc?: number
  categoria: 'ancla' | 'equilibrio' | 'premium' | 'accesorio'
  destacado?: boolean
  stock: 'disponible' | 'consultar' | 'bajo-pedido'
  imagen?: string
  tipo?: 'colchon' | 'protector' | 'almohada' | 'sabanas' | 'cubre'
}

// ============================================================================
// PRODUCT CARD - REDISEÑO UNIFICADO CON LANDING 🎯
// ============================================================================

function ProductCard({ 
  nombre, 
  tamaño, 
  precioPublico, 
  precioMercadoLibre,
  ahorro,
  ahorroPorc,
  categoria,
  destacado = false,
  stock,
  imagen,
  tipo = 'colchon'
}: ProductCardProps) {
  
  const cardRef = useRef<HTMLElement>(null)
  const hasTrackedView = useRef(false)

  // =========================================================================
  // 🎯 TRACK VIEW CONTENT - Cuando el producto entra en viewport
  // =========================================================================
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTrackedView.current) {
            hasTrackedView.current = true
            trackViewContent({
              producto: nombre,
              tamaño: tamaño,
              precio: precioPublico,
              categoria: categoria,
              precioMercadoLibre: precioMercadoLibre
            })
          }
        })
      },
      { threshold: 0.5 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [nombre, tamaño, precioPublico, categoria, precioMercadoLibre])

  // =========================================================================
  // CONFIG DE CATEGORÍAS - Paleta unificada con landing
  // =========================================================================
  const categoriaConfig = {
    ancla: { 
      badge: 'Mejor Precio',
      colorBg: 'from-rose-600 to-red-600',
      colorBorder: 'border-rose-500/30',
      colorGlow: 'shadow-rose-500/20'
    },
    equilibrio: { 
      badge: 'Más Vendido',
      colorBg: 'from-blue-600 to-blue-700',
      colorBorder: 'border-blue-500/30',
      colorGlow: 'shadow-blue-500/20'
    },
    premium: { 
      badge: 'Premium',
      colorBg: 'from-amber-500 to-orange-600',
      colorBorder: 'border-amber-500/30',
      colorGlow: 'shadow-amber-500/20'
    },
    accesorio: {
      badge: 'Complemento',
      colorBg: 'from-emerald-600 to-green-600',
      colorBorder: 'border-emerald-500/30',
      colorGlow: 'shadow-emerald-500/20'
    }
  }

  const config = categoriaConfig[categoria]
  const urlWhatsApp = `https://wa.me/5493534017332?text=${encodeURIComponent(`Hola! Consulto por ${nombre} ${tamaño} a precio de fábrica`)}`

  const tipoEmoji = {
    colchon: '🛏️',
    protector: '🛡️',
    almohada: '💤',
    sabanas: '✨',
    cubre: '🧵'
  }

  // =========================================================================
  // 🎯 HANDLER WHATSAPP - EVENTO LEAD
  // =========================================================================
  const handleWhatsAppClick = () => {
    trackWhatsAppClick({
      producto: nombre,
      tamaño: tamaño,
      precio: precioPublico,
      categoria: categoria,
      precioMercadoLibre: precioMercadoLibre
    })
  }

  return (
    <article 
      ref={cardRef}
      className={`
        group relative 
        bg-zinc-800/60 backdrop-blur-sm
        rounded-xl md:rounded-2xl overflow-hidden
        border transition-all duration-300
        ${destacado 
          ? 'border-blue-500/70 ring-1 ring-blue-500/20 shadow-2xl shadow-blue-500/20' 
          : 'border-zinc-700/50 hover:border-zinc-600/80 shadow-xl shadow-zinc-900/20 hover:shadow-2xl hover:shadow-zinc-900/30'
        }
        hover:-translate-y-1
        flex flex-col h-full
      `}
      itemScope 
      itemType="https://schema.org/Product"
    >
      
      {/* Badge Destacado - Rediseñado sin pulse agresivo */}
      {destacado && (
        <div 
          className="absolute top-4 left-4 z-20 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold rounded-full shadow-lg shadow-blue-500/40"
          aria-label="Producto recomendado"
        >
          ⭐ Recomendado
        </div>
      )}

      {/* Badge Categoría */}
      <div className={`bg-gradient-to-r ${config.colorBg} text-white px-6 py-3 text-center`}>
        <span className="text-sm font-bold tracking-wide uppercase" aria-label={`Categoría: ${config.badge}`}>
          {config.badge}
        </span>
      </div>

      {/* Imagen */}
      <div className="relative aspect-[4/3] bg-gradient-to-br from-zinc-900 to-zinc-800 overflow-hidden">
        {imagen ? (
          <Image
            src={imagen}
            alt={`${nombre} ${tamaño} - Precio de fábrica`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
            loading={destacado ? "eager" : "lazy"}
            quality={85}
            itemProp="image"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-3 opacity-30" role="img" aria-label={tipo}>
                {tipoEmoji[tipo]}
              </div>
              <p className="text-zinc-500 text-sm font-semibold px-4">{nombre}</p>
            </div>
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Contenido Principal */}
      <div className="p-5 md:p-6 flex-1 flex flex-col gap-3 md:gap-4">
        
        {/* Header: Nombre + Tamaño */}
        <div>
          <h3 
            className="text-lg md:text-xl font-bold text-white leading-tight tracking-tight mb-1"
            itemProp="name"
          >
            {nombre}
          </h3>
          <p className="text-sm text-zinc-400 font-medium">{tamaño}</p>
        </div>

        {/* Ahorro Destacado - Dark Mode Coherente */}
        {ahorro && ahorroPorc && ahorro > 0 && (
          <div className="bg-green-950/40 border border-green-500/30 backdrop-blur-sm rounded-xl p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-green-400 uppercase tracking-wide">Ahorrás:</span>
              <div className="text-right">
                <div className="text-xl font-black text-green-400 tabular-nums">
                  ${ahorro.toLocaleString('es-AR')}
                </div>
                <div className="text-xs font-bold text-green-500">
                  {ahorroPorc}% OFF
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Precio Principal */}
        <div className="space-y-1.5" itemProp="offers" itemScope itemType="https://schema.org/Offer">
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">Precio Fábrica</p>
          <p 
            className="text-3xl md:text-4xl font-black text-white tabular-nums"
            itemProp="price"
            content={precioPublico.toString()}
          >
            ${precioPublico.toLocaleString('es-AR')}
          </p>
          <meta itemProp="priceCurrency" content="ARS" />
          <meta itemProp="availability" content={
            stock === 'disponible' ? 'https://schema.org/InStock' : 
            stock === 'consultar' ? 'https://schema.org/PreOrder' :
            'https://schema.org/PreSale'
          } />
          
          {precioMercadoLibre && (
            <p className="text-sm text-zinc-500">
              <span className="line-through">${precioMercadoLibre.toLocaleString('es-AR')}</span>
              <span className="ml-2 text-green-500 font-semibold">en ML</span>
            </p>
          )}
        </div>

        {/* Opciones de Pago - Dark Mode */}
        {tipo === 'colchon' && (
          <details className="group/cuotas border border-zinc-700/50 rounded-xl overflow-hidden">
            <summary className="flex items-center justify-between cursor-pointer list-none py-3 px-4 bg-zinc-800/80 hover:bg-zinc-700/50 transition-colors">
              <span className="text-sm font-bold text-zinc-300 flex items-center gap-2">
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
            
            <div className="bg-zinc-900/50 border-t border-zinc-700/50">
              <div className="p-4 space-y-3">
                {/* Sin Recargo */}
                <div className="bg-green-950/40 border border-green-500/30 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs font-bold text-green-400 uppercase tracking-wide">Sin Recargo</span>
                  </div>
                  <div className="space-y-1 text-xs text-green-300/80">
                    <p className="font-medium">• Efectivo / Transferencia</p>
                    <p className="font-medium">• Débito / Crédito 1 pago</p>
                  </div>
                </div>
                
                {/* Cuotas */}
                <div className="space-y-1.5 text-xs">
                  {[
                    { cuotas: '3 cuotas', recargo: '+18%' },
                    { cuotas: '6 cuotas', recargo: '+25%' },
                    { cuotas: '9 cuotas', recargo: '+35%' },
                    { cuotas: '12 cuotas', recargo: '+47%' },
                  ].map((item) => (
                    <div key={item.cuotas} className="flex items-center justify-between py-2 px-3 bg-zinc-800/50 border border-zinc-700/30 rounded-lg">
                      <span className="font-medium text-zinc-400">{item.cuotas}</span>
                      <span className="font-bold text-zinc-300">{item.recargo}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </details>
        )}

        {/* Estado de Stock - Simplificado */}
        <div className="py-3 border-t border-zinc-700/50">
          {stock === 'disponible' ? (
            <div className="flex items-center gap-2.5 text-green-400">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <span className="text-sm font-bold">Disponible • 7-10 días</span>
            </div>
          ) : stock === 'consultar' ? (
            <div className="flex items-center gap-2.5 text-amber-400">
              <span className="w-2.5 h-2.5 bg-amber-500 rounded-full" aria-hidden="true"></span>
              <span className="text-sm font-bold">Consultar disponibilidad</span>
            </div>
          ) : (
            <div className="flex items-center gap-2.5 text-blue-400">
              <span className="w-2.5 h-2.5 bg-blue-500 rounded-full" aria-hidden="true"></span>
              <span className="text-sm font-bold">Bajo pedido • 7-10 días</span>
            </div>
          )}
        </div>

        {/* CTA Principal - Unificado con Landing */}
        <a
          href={urlWhatsApp}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleWhatsAppClick}
          className="
            mt-auto w-full min-h-[52px] px-6 py-3.5
            bg-gradient-to-r from-green-600 to-emerald-600
            hover:from-green-500 hover:to-emerald-500
            active:from-green-700 active:to-emerald-700
            text-white text-center font-bold text-base
            rounded-xl
            flex items-center justify-center gap-3
            transition-all duration-300
            shadow-xl shadow-green-500/30 hover:shadow-green-500/50
            hover:scale-[1.02] active:scale-[0.98]
            focus:outline-none focus:ring-4 focus:ring-green-500/30
            group/cta
          "
          aria-label={`Consultar ${nombre} por WhatsApp`}
        >
          <svg className="w-5 h-5 flex-shrink-0 group-hover/cta:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          <span>Consultar Ahora</span>
        </a>

      </div>
    </article>
  )
}

// ============================================================================
// PRODUCTOS GRID - CON TRACKING DE FILTROS
// ============================================================================

export default function ProductosGridOptimizado() {
  const [categoriaActiva, setCategoriaActiva] = useState<'todos' | 'plaza' | 'plaza-media' | 'queen' | 'king' | 'accesorios'>('todos')
  
  // =========================================================================
  // PRODUCTOS DATA
  // =========================================================================

  const productosAncla: ProductCardProps[] = [
    {
      nombre: 'Colchón Piero Meditare EuroPillow',
      tamaño: '190x80 (1 plaza)',
      precioPublico: 205302,
      precioMercadoLibre: 220000,
      ahorro: 14698,
      ahorroPorc: 7,
      categoria: 'ancla',
      stock: 'disponible',
      imagen: '/images/meditare-ep-80.jpg'
    },
    {
      nombre: 'Colchón Piero Meditare EuroPillow',
      tamaño: '190x90 (1 plaza)',
      precioPublico: 228208,
      precioMercadoLibre: 245000,
      ahorro: 16792,
      ahorroPorc: 7,
      categoria: 'ancla',
      stock: 'disponible',
      imagen: '/images/meditare-ep-90.jpg'
    },
    {
      nombre: 'Colchón Piero Meditare EuroPillow',
      tamaño: '190x100 (1 plaza)',
      precioPublico: 251292,
      precioMercadoLibre: 262000,
      ahorro: 10708,
      ahorroPorc: 4,
      categoria: 'ancla',
      stock: 'disponible',
      imagen: '/images/meditare-ep-100.jpg'
    },
    {
      nombre: 'Colchón Piero Meditare EuroPillow',
      tamaño: '190x130 (1½ plaza)',
      precioPublico: 319975,
      precioMercadoLibre: 332000,
      ahorro: 12025,
      ahorroPorc: 4,
      categoria: 'ancla',
      stock: 'disponible',
      imagen: '/images/meditare-ep-130.jpg'
    },
    {
      nombre: 'Colchón Piero Meditare EuroPillow',
      tamaño: '190x140 (2 plazas)',
      precioPublico: 344305,
      precioMercadoLibre: 357000,
      ahorro: 12695,
      ahorroPorc: 4,
      categoria: 'ancla',
      stock: 'disponible',
      imagen: '/images/meditare-ep-140.jpg'
    },
    {
      nombre: 'Colchón Piero Nirvana',
      tamaño: '190x80 (1 plaza)',
      precioPublico: 317285,
      precioMercadoLibre: 431080,
      ahorro: 113795,
      ahorroPorc: 26,
      categoria: 'ancla',
      stock: 'disponible',
      imagen: '/images/nirvana-80.jpg'
    },
    {
      nombre: 'Colchón Piero Nirvana',
      tamaño: '190x90 (1 plaza)',
      precioPublico: 353608,
      precioMercadoLibre: 504451,
      ahorro: 150843,
      ahorroPorc: 30,
      categoria: 'ancla',
      stock: 'disponible',
      imagen: '/images/nirvana-90.jpg'
    },
    {
      nombre: 'Colchón Piero Nirvana',
      tamaño: '190x100 (1 plaza)',
      precioPublico: 401781,
      precioMercadoLibre: 573175,
      ahorro: 171394,
      ahorroPorc: 30,
      categoria: 'ancla',
      stock: 'disponible',
      imagen: '/images/nirvana-100.jpg'
    },
    {
      nombre: 'Colchón Piero Nirvana',
      tamaño: '190x130 (1½ plaza)',
      precioPublico: 502036,
      precioMercadoLibre: 716197,
      ahorro: 214161,
      ahorroPorc: 30,
      categoria: 'ancla',
      stock: 'disponible',
      imagen: '/images/nirvana-130.jpg'
    },
    {
      nombre: 'Colchón Piero Nirvana',
      tamaño: '190x140 (2 plazas)',
      precioPublico: 537416,
      precioMercadoLibre: 688483,
      ahorro: 151067,
      ahorroPorc: 22,
      categoria: 'ancla',
      stock: 'disponible',
      imagen: '/images/nirvana-140.jpg'
    },
    {
      nombre: 'Colchón Piero Nirvana',
      tamaño: '190x160 (2 plazas)',
      precioPublico: 684966,
      precioMercadoLibre: 977163,
      ahorro: 292197,
      ahorroPorc: 30,
      categoria: 'ancla',
      stock: 'disponible',
      imagen: '/images/nirvana-160.jpg'
    },
    {
      nombre: 'Colchón Piero Nirvana',
      tamaño: '200x180 (Queen)',
      precioPublico: 753463,
      precioMercadoLibre: 1074879,
      ahorro: 321416,
      ahorroPorc: 30,
      categoria: 'ancla',
      stock: 'disponible',
      imagen: '/images/nirvana-180.jpg'
    },
    {
      nombre: 'Colchón Piero Nirvana',
      tamaño: '200x200 (King)',
      precioPublico: 813751,
      precioMercadoLibre: 988077,
      ahorro: 174326,
      ahorroPorc: 18,
      categoria: 'ancla',
      stock: 'disponible',
      imagen: '/images/nirvana-200.jpg'
    },
  ]

  const productosEquilibrio: ProductCardProps[] = [
    {
      nombre: 'Colchón Piero Sonno EuroPillow',
      tamaño: '190x80 (1 plaza)',
      precioPublico: 281772,
      precioMercadoLibre: 312000,
      ahorro: 30228,
      ahorroPorc: 10,
      categoria: 'equilibrio',
      stock: 'disponible',
      imagen: '/images/sonno-ep-80.jpg'
    },
    {
      nombre: 'Colchón Piero Sonno EuroPillow',
      tamaño: '190x90 (1 plaza)',
      precioPublico: 307453,
      precioMercadoLibre: 341000,
      ahorro: 33547,
      ahorroPorc: 10,
      categoria: 'equilibrio',
      stock: 'disponible',
      imagen: '/images/sonno-ep-90.jpg'
    },
    {
      nombre: 'Colchón Piero Sonno EuroPillow',
      tamaño: '190x100 (1 plaza)',
      precioPublico: 333420,
      precioMercadoLibre: 370000,
      ahorro: 36580,
      ahorroPorc: 10,
      categoria: 'equilibrio',
      stock: 'disponible',
      imagen: '/images/sonno-ep-100.jpg'
    },
    {
      nombre: 'Colchón Piero Sonno EuroPillow',
      tamaño: '190x130 (1½ plaza)',
      precioPublico: 422073,
      precioMercadoLibre: 468000,
      ahorro: 45927,
      ahorroPorc: 10,
      categoria: 'equilibrio',
      stock: 'disponible',
      imagen: '/images/sonno-ep-130.jpg'
    },
    {
      nombre: 'Colchón Piero Sonno EuroPillow',
      tamaño: '190x140 (2 plazas)',
      precioPublico: 458198,
      precioMercadoLibre: 650000,
      ahorro: 191802,
      ahorroPorc: 29,
      categoria: 'equilibrio',
      destacado: true,
      stock: 'disponible',
      imagen: '/images/sonno-ep-140.jpg'
    },
    {
      nombre: 'Colchón Piero Sonno EuroPillow',
      tamaño: '190x160 (2 plazas)',
      precioPublico: 499893,
      precioMercadoLibre: 555000,
      ahorro: 55107,
      ahorroPorc: 10,
      categoria: 'equilibrio',
      stock: 'disponible',
      imagen: '/images/sonno-ep-160.jpg'
    },
    {
      nombre: 'Colchón Piero Regno',
      tamaño: '190x80 (1 plaza)',
      precioPublico: 291464,
      precioMercadoLibre: 390000,
      ahorro: 98536,
      ahorroPorc: 25,
      categoria: 'equilibrio',
      stock: 'disponible',
      imagen: '/images/regno-80.jpg'
    },
    {
      nombre: 'Colchón Piero Regno',
      tamaño: '190x90 (1 plaza)',
      precioPublico: 315299,
      precioMercadoLibre: 422000,
      ahorro: 106701,
      ahorroPorc: 25,
      categoria: 'equilibrio',
      stock: 'disponible',
      imagen: '/images/regno-90.jpg'
    },
    {
      nombre: 'Colchón Piero Regno',
      tamaño: '190x140 (2 plazas)',
      precioPublico: 449186,
      precioMercadoLibre: 709000,
      ahorro: 259814,
      ahorroPorc: 37,
      categoria: 'equilibrio',
      stock: 'disponible',
      imagen: '/images/regno-140.jpg'
    },
    {
      nombre: 'Colchón Piero Regno',
      tamaño: '200x160 (Queen)',
      precioPublico: 530167,
      precioMercadoLibre: 956000,
      ahorro: 425833,
      ahorroPorc: 45,
      categoria: 'equilibrio',
      stock: 'disponible',
      imagen: '/images/regno-160.jpg'
    },
    {
      nombre: 'Colchón Piero Regno',
      tamaño: '200x200 (King)',
      precioPublico: 652582,
      precioMercadoLibre: 873000,
      ahorro: 220418,
      ahorroPorc: 25,
      categoria: 'equilibrio',
      stock: 'disponible',
      imagen: '/images/regno-200.jpg'
    },
    {
      nombre: 'Colchón Piero Regno Pillow Top',
      tamaño: '190x140 (2 plazas)',
      precioPublico: 561631,
      precioMercadoLibre: 601000,
      ahorro: 39369,
      ahorroPorc: 7,
      categoria: 'equilibrio',
      stock: 'disponible',
      imagen: '/images/regno-pillow-140.jpg'
    },
    {
      nombre: 'Colchón Piero Regno Pillow Top',
      tamaño: '200x160 (Queen)',
      precioPublico: 644294,
      precioMercadoLibre: 775000,
      ahorro: 130706,
      ahorroPorc: 17,
      categoria: 'equilibrio',
      stock: 'disponible',
      imagen: '/images/regno-pillow-160.jpg'
    },
    {
      nombre: 'Colchón Piero Regno Pillow Top',
      tamaño: '200x180 (Queen XL)',
      precioPublico: 714436,
      precioMercadoLibre: 956000,
      ahorro: 241564,
      ahorroPorc: 25,
      categoria: 'equilibrio',
      stock: 'disponible',
      imagen: '/images/regno-pillow-180.jpg'
    },
    {
      nombre: 'Colchón Piero Regno Pillow Top',
      tamaño: '200x200 (King)',
      precioPublico: 783921,
      precioMercadoLibre: 1049000,
      ahorro: 265079,
      ahorroPorc: 25,
      categoria: 'equilibrio',
      stock: 'disponible',
      imagen: '/images/regno-pillow-200.jpg'
    },
    {
      nombre: 'Colchón Piero Gravita',
      tamaño: '190x140 (2 plazas)',
      precioPublico: 736057,
      precioMercadoLibre: 980000,
      ahorro: 243943,
      ahorroPorc: 25,
      categoria: 'equilibrio',
      stock: 'disponible',
      imagen: '/images/gravita-140.jpg'
    },
    {
      nombre: 'Colchón Piero Gravita',
      tamaño: '200x160 (Queen)',
      precioPublico: 905309,
      precioMercadoLibre: 1083000,
      ahorro: 177691,
      ahorroPorc: 16,
      categoria: 'equilibrio',
      stock: 'disponible',
      imagen: '/images/gravita-160.jpg'
    },
    {
      nombre: 'Colchón Piero Gravita',
      tamaño: '200x180 (Queen XL)',
      precioPublico: 969064,
      precioMercadoLibre: 1266000,
      ahorro: 296936,
      ahorroPorc: 23,
      categoria: 'equilibrio',
      stock: 'disponible',
      imagen: '/images/gravita-180.jpg'
    },
    {
      nombre: 'Colchón Piero Gravita',
      tamaño: '200x200 (King)',
      precioPublico: 1030613,
      precioMercadoLibre: 1289000,
      ahorro: 258387,
      ahorroPorc: 20,
      categoria: 'equilibrio',
      stock: 'disponible',
      imagen: '/images/gravita-200.jpg'
    },
    {
      nombre: 'Colchón Piero Namaste',
      tamaño: '190x140 (2 plazas)',
      precioPublico: 414729,
      precioMercadoLibre: 394000,
      ahorro: 0,
      ahorroPorc: 0,
      categoria: 'equilibrio',
      stock: 'disponible',
      imagen: '/images/namaste-140.jpg'
    },
    {
      nombre: 'Colchón Piero Namaste',
      tamaño: '200x160 (Queen)',
      precioPublico: 528948,
      precioMercadoLibre: 558000,
      ahorro: 29052,
      ahorroPorc: 5,
      categoria: 'equilibrio',
      stock: 'disponible',
      imagen: '/images/namaste-160.jpg'
    },
    {
      nombre: 'Colchón Piero Namaste',
      tamaño: '200x200 (King)',
      precioPublico: 634739,
      precioMercadoLibre: 669000,
      ahorro: 34261,
      ahorroPorc: 5,
      categoria: 'equilibrio',
      stock: 'disponible',
      imagen: '/images/namaste-200.jpg'
    },
    {
      nombre: 'Colchón Piero Namaste Pillow Top',
      tamaño: '190x140 (2 plazas)',
      precioPublico: 526051,
      precioMercadoLibre: 554353,
      ahorro: 28302,
      ahorroPorc: 5,
      categoria: 'equilibrio',
      stock: 'disponible',
      imagen: '/images/namaste-pillow-140.jpg'
    },
    {
      nombre: 'Colchón Piero Namaste Pillow Top',
      tamaño: '200x160 (Queen)',
      precioPublico: 601644,
      precioMercadoLibre: 635000,
      ahorro: 33356,
      ahorroPorc: 5,
      categoria: 'equilibrio',
      stock: 'disponible',
      imagen: '/images/namaste-pillow-160.jpg'
    },
  ]

  const productosPremium: ProductCardProps[] = [
    {
      nombre: 'Colchón Piero Montreaux',
      tamaño: '190x140 (2 plazas)',
      precioPublico: 772562,
      precioMercadoLibre: 1339000,
      ahorro: 566438,
      ahorroPorc: 42,
      categoria: 'premium',
      stock: 'disponible',
      imagen: '/images/montreaux-140.jpg'
    },
    {
      nombre: 'Colchón Piero Montreaux',
      tamaño: '200x160 (Queen)',
      precioPublico: 969298,
      precioMercadoLibre: 1661000,
      ahorro: 691702,
      ahorroPorc: 42,
      categoria: 'premium',
      stock: 'disponible',
      imagen: '/images/montreaux-160.jpg'
    },
    {
      nombre: 'Colchón Piero Montreaux',
      tamaño: '200x200 (King)',
      precioPublico: 1098836,
      precioMercadoLibre: 1883000,
      ahorro: 784164,
      ahorroPorc: 42,
      categoria: 'premium',
      stock: 'disponible',
      imagen: '/images/montreaux-200.jpg'
    },
    {
      nombre: 'Colchón Piero Montreaux Pillow Top',
      tamaño: '190x140 (2 plazas)',
      precioPublico: 970520,
      precioMercadoLibre: 1496000,
      ahorro: 525480,
      ahorroPorc: 35,
      categoria: 'premium',
      stock: 'disponible',
      imagen: '/images/montreaux-pillow-140.jpg'
    },
    {
      nombre: 'Colchón Piero Montreaux Pillow Top',
      tamaño: '200x160 (Queen)',
      precioPublico: 1182651,
      precioMercadoLibre: 2027000,
      ahorro: 844349,
      ahorroPorc: 42,
      categoria: 'premium',
      destacado: true,
      stock: 'disponible',
      imagen: '/images/montreaux-pillow-160.jpg'
    },
    {
      nombre: 'Colchón Piero Montreaux Pillow Top',
      tamaño: '200x180 (Queen XL)',
      precioPublico: 1268890,
      precioMercadoLibre: 2234000,
      ahorro: 965110,
      ahorroPorc: 43,
      categoria: 'premium',
      stock: 'disponible',
      imagen: '/images/montreaux-pillow-180.jpg'
    },
    {
      nombre: 'Colchón Piero Montreaux Pillow Top',
      tamaño: '200x200 (King)',
      precioPublico: 1345844,
      precioMercadoLibre: 2612000,
      ahorro: 1266156,
      ahorroPorc: 48,
      categoria: 'premium',
      stock: 'disponible',
      imagen: '/images/montreaux-pillow-200.jpg'
    },
    {
      nombre: 'Colchón Piero Dream Fit Pocket',
      tamaño: '190x140 (2 plazas)',
      precioPublico: 1906774,
      precioMercadoLibre: 2037000,
      ahorro: 130226,
      ahorroPorc: 6,
      categoria: 'premium',
      stock: 'consultar',
      imagen: '/images/dreamfit-pocket-140.jpg'
    },
    {
      nombre: 'Colchón Piero Dream Fit Pocket',
      tamaño: '200x160 (Queen)',
      precioPublico: 2195670,
      precioMercadoLibre: 2346000,
      ahorro: 150330,
      ahorroPorc: 6,
      categoria: 'premium',
      stock: 'consultar',
      imagen: '/images/dreamfit-pocket-160.jpg'
    },
    {
      nombre: 'Colchón Piero Dream Fit Pocket',
      tamaño: '200x200 (King)',
      precioPublico: 2498649,
      precioMercadoLibre: 2670000,
      ahorro: 171351,
      ahorroPorc: 6,
      categoria: 'premium',
      stock: 'consultar',
      imagen: '/images/dreamfit-pocket-200.jpg'
    },
  ]

  const accesorios: ProductCardProps[] = [
    {
      nombre: 'Protector Impermeable Piero',
      tamaño: '140x190 cm',
      precioPublico: 36900,
      categoria: 'accesorio',
      stock: 'disponible',
      tipo: 'protector',
      imagen: '/images/protector-140.jpg'
    },
    {
      nombre: 'Protector Impermeable Piero',
      tamaño: '160x200 cm (Queen)',
      precioPublico: 39900,
      categoria: 'accesorio',
      stock: 'disponible',
      tipo: 'protector',
      imagen: '/images/protector-160.jpg'
    },
    {
      nombre: 'Protector Impermeable Piero',
      tamaño: '200x200 cm (King)',
      precioPublico: 42900,
      categoria: 'accesorio',
      stock: 'disponible',
      tipo: 'protector',
      imagen: '/images/protector-200.jpg'
    },
    {
      nombre: 'Almohada Piero Fibra Smart Tech Plus',
      tamaño: '70x50 cm',
      precioPublico: 39900,
      categoria: 'accesorio',
      stock: 'disponible',
      tipo: 'almohada',
      imagen: '/images/almohada-fibra.jpg'
    },
    {
      nombre: 'Almohada Piero Micro Max Premium',
      tamaño: '70x50 cm',
      precioPublico: 69900,
      categoria: 'accesorio',
      stock: 'disponible',
      tipo: 'almohada',
      imagen: '/images/almohada-micro.jpg'
    },
    {
      nombre: 'Sábanas Bamboo Piero 600 Hilos',
      tamaño: '140x190 cm',
      precioPublico: 89900,
      categoria: 'accesorio',
      stock: 'disponible',
      tipo: 'sabanas',
      imagen: '/images/sabanas-140.jpg'
    },
    {
      nombre: 'Sábanas Bamboo Piero 600 Hilos',
      tamaño: '160x200 cm (Queen)',
      precioPublico: 119900,
      categoria: 'accesorio',
      stock: 'disponible',
      tipo: 'sabanas',
      imagen: '/images/sabanas-160.jpg'
    },
    {
      nombre: 'Sábanas Bamboo Piero 600 Hilos',
      tamaño: '200x200 cm (King)',
      precioPublico: 139900,
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
    if (categoriaActiva === 'plaza-media') return producto.tamaño.includes('1½ plaza') || (producto.tamaño.includes('140') && producto.tipo === 'colchon')
    if (categoriaActiva === 'queen') return producto.tamaño.includes('Queen') || (producto.tamaño.includes('160') && producto.tipo === 'colchon') || (producto.tamaño.includes('180') && producto.tipo === 'colchon')
    if (categoriaActiva === 'king') return producto.tamaño.includes('King') || (producto.tamaño.includes('200x200') && producto.tipo === 'colchon')
    if (categoriaActiva === 'accesorios') return producto.categoria === 'accesorio'
    return true
  })

  // =========================================================================
  // 🎯 TRACK FILTER CHANGE - Evento Search
  // =========================================================================
  const handleFilterChange = useCallback((filterId: string) => {
    setCategoriaActiva(filterId as typeof categoriaActiva)
    
    const filterLabels: Record<string, string> = {
      'todos': 'Todos los productos',
      'plaza': '1 Plaza',
      'plaza-media': '1½ Plaza / 2 Plazas',
      'queen': 'Queen',
      'king': 'King',
      'accesorios': 'Accesorios'
    }
    
    trackSearch(filterLabels[filterId] || filterId, productosFiltrados.length)
  }, [productosFiltrados.length])

  // =========================================================================
  // 🎯 TRACK CTA FINAL
  // =========================================================================
  const handleCtaFinalClick = () => {
    trackWhatsAppClick({
      producto: 'Consulta General',
      categoria: 'cta-final-landing'
    })
  }

  // =========================================================================
  // FILTROS CONFIG
  // =========================================================================
  const filtros = [
    { id: 'todos', label: 'Todos', count: todosLosProductos.length },
    { id: 'plaza', label: '1 Plaza', count: null },
    { id: 'plaza-media', label: '1½ Plaza', count: null },
    { id: 'queen', label: 'Queen', count: null },
    { id: 'king', label: 'King', count: null },
    { id: 'accesorios', label: '💎 Accesorios', count: null },
  ]

  return (
    <section 
      id="productos" 
      className="relative bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-950 py-16 md:py-20"
      aria-labelledby="productos-heading"
    >
      {/* Background Effects - Match con Landing */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] -top-48 right-0"></div>
        <div className="absolute w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px] bottom-0 -left-24"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <header className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm font-bold mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Catálogo Completo PIERO
          </div>
          
          <h2 
            id="productos-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 md:mb-6 leading-tight"
          >
            Elegí Tu Colchón
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500">
              Directo de Fábrica
            </span>
          </h2>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto">
            Todos los modelos con <strong className="text-white">hasta 48% de descuento</strong> vs. Mercado Libre
          </p>
        </header>

        {/* Filtros - Rediseñados */}
        <div className="mb-10 md:mb-12 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4">
          <div className="flex gap-2 md:gap-3 min-w-max justify-start md:justify-center">
            {filtros.map((filtro) => (
              <button
                key={filtro.id}
                onClick={() => handleFilterChange(filtro.id)}
                className={`
                  px-4 md:px-6 py-2.5 md:py-3 rounded-xl font-bold text-sm transition-all duration-300
                  ${categoriaActiva === filtro.id
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30 scale-105' 
                    : 'bg-zinc-800/60 text-zinc-400 border border-zinc-700/50 hover:border-blue-500/50 hover:text-white hover:bg-zinc-800'
                  }
                `}
              >
                {filtro.label} {filtro.count && `(${filtro.count})`}
              </button>
            ))}
          </div>
        </div>

        {/* Counter */}
        <div className="text-center mb-8">
          <p className="text-sm text-zinc-500">
            Mostrando <strong className="text-white">{productosFiltrados.length}</strong> productos
          </p>
        </div>

        {/* Grid de Productos */}
        <div 
          className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-16"
          role="list"
        >
          {productosFiltrados.map((producto, index) => (
            <div key={`${producto.nombre}-${producto.tamaño}-${index}`} role="listitem">
              <ProductCard {...producto} />
            </div>
          ))}
        </div>

        {/* CTA Final - Unificado con Landing */}
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
            onClick={handleCtaFinalClick}
            className="
              inline-flex items-center justify-center gap-3
              min-h-[56px] px-10 py-4
              bg-gradient-to-r from-green-600 to-emerald-600
              hover:from-green-500 hover:to-emerald-500
              text-white font-bold text-lg
              rounded-xl
              transition-all duration-300
              shadow-xl shadow-green-500/30 hover:shadow-green-500/50
              hover:scale-[1.02] active:scale-[0.98]
              focus:outline-none focus:ring-4 focus:ring-green-500/30
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