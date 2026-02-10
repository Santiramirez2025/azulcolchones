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
  const urlWhatsApp = `https://wa.me/5493534017332?text=${encodeURIComponent(`Hola! Consulto por ${nombre} ${tamaño} a $${precioPublico.toLocaleString('es-AR')}`)}`

  const tipoEmoji = {
    colchon: '🛏️',
    protector: '🛡️',
    almohada: '💤',
    sabanas: '✨',
    cubre: '🧵'
  }

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
      
      {destacado && (
        <div 
          className="absolute top-4 left-4 z-20 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold rounded-full shadow-lg shadow-blue-500/40"
          aria-label="Producto recomendado"
        >
          ⭐ Recomendado
        </div>
      )}

      <div className={`bg-gradient-to-r ${config.colorBg} text-white px-6 py-3 text-center`}>
        <span className="text-sm font-bold tracking-wide uppercase" aria-label={`Categoría: ${config.badge}`}>
          {config.badge}
        </span>
      </div>

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

      <div className="p-5 md:p-6 flex-1 flex flex-col gap-3 md:gap-4">
        
        <div>
          <h3 
            className="text-lg md:text-xl font-bold text-white leading-tight tracking-tight mb-1"
            itemProp="name"
          >
            {nombre}
          </h3>
          <p className="text-sm text-zinc-400 font-medium">{tamaño}</p>
        </div>

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

        <div className="py-3 border-t border-zinc-700/50">
          {stock === 'disponible' ? (
            <div className="flex items-center gap-2.5 text-green-400">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <span className="text-sm font-bold">Disponible • 2 a 5 días</span>
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
// HELPER: Calcular ahorro y porcentaje
// ============================================================================
function calcularAhorro(precioML: number, precioFabrica: number): { ahorro: number; ahorroPorc: number } {
  const ahorro = precioML - precioFabrica
  const ahorroPorc = Math.round((ahorro / precioML) * 100)
  return { ahorro, ahorroPorc }
}

// ============================================================================
// PRODUCTOS GRID - PRECIOS OPTIMIZADOS CON PSICOLOGÍA DE PRICING 🧠
// Estrategia: Charm Pricing (.900) + Left-Digit Effect + Price Anchoring
// ============================================================================

export default function ProductosGridOptimizado() {
  const [categoriaActiva, setCategoriaActiva] = useState<'todos' | 'plaza' | 'plaza-media' | 'queen' | 'king' | 'accesorios'>('todos')
  
  // =========================================================================
  // PRODUCTOS DATA - PRECIOS CHARM PRICING (.900)
  // =========================================================================

  const productosAncla: ProductCardProps[] = [
    // ========== MEDITARE EUROPILLOW - Entrada ==========
    {
      nombre: 'Colchón Piero Meditare EuroPillow',
      tamaño: '190x80 (1 plaza)',
      precioPublico: 189900,
      precioMercadoLibre: 249900,
      ...calcularAhorro(249900, 189900),
      categoria: 'ancla',
      stock: 'disponible',
      imagen: '/images/meditare-ep-80.jpg'
    },
    {
      nombre: 'Colchón Piero Meditare EuroPillow',
      tamaño: '190x90 (1 plaza)',
      precioPublico: 234900,
      precioMercadoLibre: 279900,
      ...calcularAhorro(279900, 234900),
      categoria: 'ancla',
      stock: 'disponible',
      imagen: '/images/meditare-ep-90.jpg'
    },
    {
      nombre: 'Colchón Piero Meditare EuroPillow',
      tamaño: '190x100 (1 plaza)',
      precioPublico: 259900,
      precioMercadoLibre: 299900,
      ...calcularAhorro(299900, 259900),
      categoria: 'ancla',
      stock: 'disponible',
      imagen: '/images/meditare-ep-100.jpg'
    },
    {
      nombre: 'Colchón Piero Meditare EuroPillow',
      tamaño: '190x130 (1½ plaza)',
      precioPublico: 329900,
      precioMercadoLibre: 379900,
      ...calcularAhorro(379900, 329900),
      categoria: 'ancla',
      stock: 'disponible',
      imagen: '/images/meditare-ep-130.jpg'
    },
    {
      nombre: 'Colchón Piero Meditare EuroPillow',
      tamaño: '190x140 (2 plazas)',
      precioPublico: 354900,
      precioMercadoLibre: 399900,
      ...calcularAhorro(399900, 354900),
      categoria: 'ancla',
      stock: 'disponible',
      imagen: '/images/meditare-ep-140.jpg'
    },
    
    // ========== NIRVANA - Alta rotación ==========
    {
      nombre: 'Colchón Piero Nirvana',
      tamaño: '190x80 (1 plaza)',
      precioPublico: 324900,
      precioMercadoLibre: 449900,
      ...calcularAhorro(449900, 324900),
      categoria: 'ancla',
      stock: 'disponible',
      imagen: '/images/nirvana-80.jpg'
    },
    {
      nombre: 'Colchón Piero Nirvana',
      tamaño: '190x90 (1 plaza)',
      precioPublico: 359900,
      precioMercadoLibre: 519900,
      ...calcularAhorro(519900, 359900),
      categoria: 'ancla',
      stock: 'disponible',
      imagen: '/images/nirvana-90.jpg'
    },
    {
      nombre: 'Colchón Piero Nirvana',
      tamaño: '190x100 (1 plaza)',
      precioPublico: 409900,
      precioMercadoLibre: 589900,
      ...calcularAhorro(589900, 409900),
      categoria: 'ancla',
      stock: 'disponible',
      imagen: '/images/nirvana-100.jpg'
    },
    {
      nombre: 'Colchón Piero Nirvana',
      tamaño: '190x130 (1½ plaza)',
      precioPublico: 514900,
      precioMercadoLibre: 739900,
      ...calcularAhorro(739900, 514900),
      categoria: 'ancla',
      stock: 'disponible',
      imagen: '/images/nirvana-130.jpg'
    },
    {
      nombre: 'Colchón Piero Nirvana',
      tamaño: '190x140 (2 plazas)',
      precioPublico: 549900,
      precioMercadoLibre: 709900,
      ...calcularAhorro(709900, 549900),
      categoria: 'ancla',
      stock: 'disponible',
      imagen: '/images/nirvana-140.jpg'
    },
    {
      nombre: 'Colchón Piero Nirvana',
      tamaño: '190x160 (2 plazas)',
      precioPublico: 699900,
      precioMercadoLibre: 999900,
      ...calcularAhorro(999900, 699900),
      categoria: 'ancla',
      stock: 'disponible',
      imagen: '/images/nirvana-160.jpg'
    },
    {
      nombre: 'Colchón Piero Nirvana',
      tamaño: '200x180 (Queen)',
      precioPublico: 769900,
      precioMercadoLibre: 1099900,
      ...calcularAhorro(1099900, 769900),
      categoria: 'ancla',
      stock: 'disponible',
      imagen: '/images/nirvana-180.jpg'
    },
    {
      nombre: 'Colchón Piero Nirvana',
      tamaño: '200x200 (King)',
      precioPublico: 829900,
      precioMercadoLibre: 1019900,
      ...calcularAhorro(1019900, 829900),
      categoria: 'ancla',
      stock: 'disponible',
      imagen: '/images/nirvana-200.jpg'
    },
  ]

  const productosEquilibrio: ProductCardProps[] = [
    // ========== SONNO EUROPILLOW ==========
    {
      nombre: 'Colchón Piero Sonno EuroPillow',
      tamaño: '190x80 (1 plaza)',
      precioPublico: 289900,
      precioMercadoLibre: 339900,
      ...calcularAhorro(339900, 289900),
      categoria: 'equilibrio',
      stock: 'disponible',
      imagen: '/images/sonno-ep-80.jpg'
    },
    {
      nombre: 'Colchón Piero Sonno EuroPillow',
      tamaño: '190x90 (1 plaza)',
      precioPublico: 314900,
      precioMercadoLibre: 369900,
      ...calcularAhorro(369900, 314900),
      categoria: 'equilibrio',
      stock: 'disponible',
      imagen: '/images/sonno-ep-90.jpg'
    },
    {
      nombre: 'Colchón Piero Sonno EuroPillow',
      tamaño: '190x100 (1 plaza)',
      precioPublico: 344900,
      precioMercadoLibre: 399900,
      ...calcularAhorro(399900, 344900),
      categoria: 'equilibrio',
      stock: 'disponible',
      imagen: '/images/sonno-ep-100.jpg'
    },
    {
      nombre: 'Colchón Piero Sonno EuroPillow',
      tamaño: '190x130 (1½ plaza)',
      precioPublico: 434900,
      precioMercadoLibre: 499900,
      ...calcularAhorro(499900, 434900),
      categoria: 'equilibrio',
      stock: 'disponible',
      imagen: '/images/sonno-ep-130.jpg'
    },
    {
      nombre: 'Colchón Piero Sonno EuroPillow',
      tamaño: '190x140 (2 plazas)',
      precioPublico: 469900,
      precioMercadoLibre: 679900,
      ...calcularAhorro(679900, 469900),
      categoria: 'equilibrio',
      destacado: true,
      stock: 'disponible',
      imagen: '/images/sonno-ep-140.jpg'
    },
    {
      nombre: 'Colchón Piero Sonno EuroPillow',
      tamaño: '190x160 (2 plazas)',
      precioPublico: 514900,
      precioMercadoLibre: 579900,
      ...calcularAhorro(579900, 514900),
      categoria: 'equilibrio',
      stock: 'disponible',
      imagen: '/images/sonno-ep-160.jpg'
    },
    
    // ========== REGNO ==========
    {
      nombre: 'Colchón Piero Regno',
      tamaño: '190x80 (1 plaza)',
      precioPublico: 299900,
      precioMercadoLibre: 409900,
      ...calcularAhorro(409900, 299900),
      categoria: 'equilibrio',
      stock: 'disponible',
      imagen: '/images/regno-80.jpg'
    },
    {
      nombre: 'Colchón Piero Regno',
      tamaño: '190x90 (1 plaza)',
      precioPublico: 324900,
      precioMercadoLibre: 449900,
      ...calcularAhorro(449900, 324900),
      categoria: 'equilibrio',
      stock: 'disponible',
      imagen: '/images/regno-90.jpg'
    },
    {
      nombre: 'Colchón Piero Regno',
      tamaño: '190x140 (2 plazas)',
      precioPublico: 459900,
      precioMercadoLibre: 729900,
      ...calcularAhorro(729900, 459900),
      categoria: 'equilibrio',
      stock: 'disponible',
      imagen: '/images/regno-140.jpg'
    },
    {
      nombre: 'Colchón Piero Regno',
      tamaño: '200x160 (Queen)',
      precioPublico: 544900,
      precioMercadoLibre: 979900,
      ...calcularAhorro(979900, 544900),
      categoria: 'equilibrio',
      stock: 'disponible',
      imagen: '/images/regno-160.jpg'
    },
    {
      nombre: 'Colchón Piero Regno',
      tamaño: '200x200 (King)',
      precioPublico: 669900,
      precioMercadoLibre: 899900,
      ...calcularAhorro(899900, 669900),
      categoria: 'equilibrio',
      stock: 'disponible',
      imagen: '/images/regno-200.jpg'
    },
    
    // ========== REGNO PILLOW TOP ==========
    {
      nombre: 'Colchón Piero Regno Pillow Top',
      tamaño: '190x140 (2 plazas)',
      precioPublico: 574900,
      precioMercadoLibre: 629900,
      ...calcularAhorro(629900, 574900),
      categoria: 'equilibrio',
      stock: 'disponible',
      imagen: '/images/regno-pillow-140.jpg'
    },
    {
      nombre: 'Colchón Piero Regno Pillow Top',
      tamaño: '200x160 (Queen)',
      precioPublico: 659900,
      precioMercadoLibre: 799900,
      ...calcularAhorro(799900, 659900),
      categoria: 'equilibrio',
      stock: 'disponible',
      imagen: '/images/regno-pillow-160.jpg'
    },
    {
      nombre: 'Colchón Piero Regno Pillow Top',
      tamaño: '200x180 (Queen XL)',
      precioPublico: 729900,
      precioMercadoLibre: 979900,
      ...calcularAhorro(979900, 729900),
      categoria: 'equilibrio',
      stock: 'disponible',
      imagen: '/images/regno-pillow-180.jpg'
    },
    {
      nombre: 'Colchón Piero Regno Pillow Top',
      tamaño: '200x200 (King)',
      precioPublico: 799900,
      precioMercadoLibre: 1079900,
      ...calcularAhorro(1079900, 799900),
      categoria: 'equilibrio',
      stock: 'disponible',
      imagen: '/images/regno-pillow-200.jpg'
    },
    
    // ========== GRAVITA ==========
    {
      nombre: 'Colchón Piero Gravita',
      tamaño: '190x140 (2 plazas)',
      precioPublico: 749900,
      precioMercadoLibre: 999900,
      ...calcularAhorro(999900, 749900),
      categoria: 'equilibrio',
      stock: 'disponible',
      imagen: '/images/gravita-140.jpg'
    },
    {
      nombre: 'Colchón Piero Gravita',
      tamaño: '200x160 (Queen)',
      precioPublico: 924900,
      precioMercadoLibre: 1109900,
      ...calcularAhorro(1109900, 924900),
      categoria: 'equilibrio',
      stock: 'disponible',
      imagen: '/images/gravita-160.jpg'
    },
    {
      nombre: 'Colchón Piero Gravita',
      tamaño: '200x180 (Queen XL)',
      precioPublico: 989900,
      precioMercadoLibre: 1299900,
      ...calcularAhorro(1299900, 989900),
      categoria: 'equilibrio',
      stock: 'disponible',
      imagen: '/images/gravita-180.jpg'
    },
    {
      nombre: 'Colchón Piero Gravita',
      tamaño: '200x200 (King)',
      precioPublico: 1049900,
      precioMercadoLibre: 1319900,
      ...calcularAhorro(1319900, 1049900),
      categoria: 'equilibrio',
      stock: 'disponible',
      imagen: '/images/gravita-200.jpg'
    },
    
    // ========== NAMASTE ==========
    {
      nombre: 'Colchón Piero Namaste',
      tamaño: '190x140 (2 plazas)',
      precioPublico: 424900,
      precioMercadoLibre: 449900,
      ...calcularAhorro(449900, 424900),
      categoria: 'equilibrio',
      stock: 'disponible',
      imagen: '/images/namaste-140.jpg'
    },
    {
      nombre: 'Colchón Piero Namaste',
      tamaño: '200x160 (Queen)',
      precioPublico: 539900,
      precioMercadoLibre: 579900,
      ...calcularAhorro(579900, 539900),
      categoria: 'equilibrio',
      stock: 'disponible',
      imagen: '/images/namaste-160.jpg'
    },
    {
      nombre: 'Colchón Piero Namaste',
      tamaño: '200x200 (King)',
      precioPublico: 649900,
      precioMercadoLibre: 699900,
      ...calcularAhorro(699900, 649900),
      categoria: 'equilibrio',
      stock: 'disponible',
      imagen: '/images/namaste-200.jpg'
    },
    
    // ========== NAMASTE PILLOW TOP ==========
    {
      nombre: 'Colchón Piero Namaste Pillow Top',
      tamaño: '190x140 (2 plazas)',
      precioPublico: 539900,
      precioMercadoLibre: 579900,
      ...calcularAhorro(579900, 539900),
      categoria: 'equilibrio',
      stock: 'disponible',
      imagen: '/images/namaste-pillow-140.jpg'
    },
    {
      nombre: 'Colchón Piero Namaste Pillow Top',
      tamaño: '200x160 (Queen)',
      precioPublico: 619900,
      precioMercadoLibre: 659900,
      ...calcularAhorro(659900, 619900),
      categoria: 'equilibrio',
      stock: 'disponible',
      imagen: '/images/namaste-pillow-160.jpg'
    },
  ]

  const productosPremium: ProductCardProps[] = [
    // ========== MONTREAUX - Premium ==========
    {
      nombre: 'Colchón Piero Montreaux',
      tamaño: '190x140 (2 plazas)',
      precioPublico: 789900,
      precioMercadoLibre: 1369900,
      ...calcularAhorro(1369900, 789900),
      categoria: 'premium',
      stock: 'disponible',
      imagen: '/images/montreaux-140.jpg'
    },
    {
      nombre: 'Colchón Piero Montreaux',
      tamaño: '200x160 (Queen)',
      precioPublico: 989900,
      precioMercadoLibre: 1699900,
      ...calcularAhorro(1699900, 989900),
      categoria: 'premium',
      stock: 'disponible',
      imagen: '/images/montreaux-160.jpg'
    },
    {
      nombre: 'Colchón Piero Montreaux',
      tamaño: '200x200 (King)',
      precioPublico: 1119900,
      precioMercadoLibre: 1929900,
      ...calcularAhorro(1929900, 1119900),
      categoria: 'premium',
      stock: 'disponible',
      imagen: '/images/montreaux-200.jpg'
    },
    
    // ========== MONTREAUX PILLOW TOP - Flagship ==========
    {
      nombre: 'Colchón Piero Montreaux Pillow Top',
      tamaño: '190x140 (2 plazas)',
      precioPublico: 989900,
      precioMercadoLibre: 1529900,
      ...calcularAhorro(1529900, 989900),
      categoria: 'premium',
      stock: 'disponible',
      imagen: '/images/montreaux-pillow-140.jpg'
    },
    {
      nombre: 'Colchón Piero Montreaux Pillow Top',
      tamaño: '200x160 (Queen)',
      precioPublico: 1199900,
      precioMercadoLibre: 2079900,
      ...calcularAhorro(2079900, 1199900),
      categoria: 'premium',
      destacado: true,
      stock: 'disponible',
      imagen: '/images/montreaux-pillow-160.jpg'
    },
    {
      nombre: 'Colchón Piero Montreaux Pillow Top',
      tamaño: '200x180 (Queen XL)',
      precioPublico: 1289900,
      precioMercadoLibre: 2289900,
      ...calcularAhorro(2289900, 1289900),
      categoria: 'premium',
      stock: 'disponible',
      imagen: '/images/montreaux-pillow-180.jpg'
    },
    {
      nombre: 'Colchón Piero Montreaux Pillow Top',
      tamaño: '200x200 (King)',
      precioPublico: 1369900,
      precioMercadoLibre: 2679900,
      ...calcularAhorro(2679900, 1369900),
      categoria: 'premium',
      stock: 'disponible',
      imagen: '/images/montreaux-pillow-200.jpg'
    },
    
    // ========== DREAM FIT POCKET - Ultra Premium ==========
    {
      nombre: 'Colchón Piero Dream Fit Pocket',
      tamaño: '190x140 (2 plazas)',
      precioPublico: 1949900,
      precioMercadoLibre: 2099900,
      ...calcularAhorro(2099900, 1949900),
      categoria: 'premium',
      stock: 'consultar',
      imagen: '/images/dreamfit-pocket-140.jpg'
    },
    {
      nombre: 'Colchón Piero Dream Fit Pocket',
      tamaño: '200x160 (Queen)',
      precioPublico: 2249900,
      precioMercadoLibre: 2399900,
      ...calcularAhorro(2399900, 2249900),
      categoria: 'premium',
      stock: 'consultar',
      imagen: '/images/dreamfit-pocket-160.jpg'
    },
    {
      nombre: 'Colchón Piero Dream Fit Pocket',
      tamaño: '200x200 (King)',
      precioPublico: 2549900,
      precioMercadoLibre: 2749900,
      ...calcularAhorro(2749900, 2549900),
      categoria: 'premium',
      stock: 'consultar',
      imagen: '/images/dreamfit-pocket-200.jpg'
    },
  ]

  // ========== ACCESORIOS - Precios psicológicos ==========
  const accesorios: ProductCardProps[] = [
    {
      nombre: 'Protector Impermeable Piero',
      tamaño: '140x190 cm',
      precioPublico: 37900,
      categoria: 'accesorio',
      stock: 'disponible',
      tipo: 'protector',
      imagen: '/images/protector-140.jpg'
    },
    {
      nombre: 'Protector Impermeable Piero',
      tamaño: '160x200 cm (Queen)',
      precioPublico: 42900,
      categoria: 'accesorio',
      stock: 'disponible',
      tipo: 'protector',
      imagen: '/images/protector-160.jpg'
    },
    {
      nombre: 'Protector Impermeable Piero',
      tamaño: '200x200 cm (King)',
      precioPublico: 47900,
      categoria: 'accesorio',
      stock: 'disponible',
      tipo: 'protector',
      imagen: '/images/protector-200.jpg'
    },
    {
      nombre: 'Almohada Piero Fibra Smart Tech Plus',
      tamaño: '70x50 cm',
      precioPublico: 42900,
      categoria: 'accesorio',
      stock: 'disponible',
      tipo: 'almohada',
      imagen: '/images/almohada-fibra.jpg'
    },
    {
      nombre: 'Almohada Piero Micro Max Premium',
      tamaño: '70x50 cm',
      precioPublico: 74900,
      categoria: 'accesorio',
      stock: 'disponible',
      tipo: 'almohada',
      imagen: '/images/almohada-micro.jpg'
    },
    {
      nombre: 'Sábanas Bamboo Piero 600 Hilos',
      tamaño: '140x190 cm',
      precioPublico: 94900,
      categoria: 'accesorio',
      stock: 'disponible',
      tipo: 'sabanas',
      imagen: '/images/sabanas-140.jpg'
    },
    {
      nombre: 'Sábanas Bamboo Piero 600 Hilos',
      tamaño: '160x200 cm (Queen)',
      precioPublico: 124900,
      categoria: 'accesorio',
      stock: 'disponible',
      tipo: 'sabanas',
      imagen: '/images/sabanas-160.jpg'
    },
    {
      nombre: 'Sábanas Bamboo Piero 600 Hilos',
      tamaño: '200x200 cm (King)',
      precioPublico: 149900,
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

  const handleCtaFinalClick = () => {
    trackWhatsAppClick({
      producto: 'Consulta General',
      categoria: 'cta-final-landing'
    })
  }

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
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] -top-48 right-0"></div>
        <div className="absolute w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px] bottom-0 -left-24"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        
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
            Todos los modelos con <strong className="text-white">hasta 49% de descuento</strong> vs. Mercado Libre
          </p>
        </header>

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

        <div className="text-center mb-8">
          <p className="text-sm text-zinc-500">
            Mostrando <strong className="text-white">{productosFiltrados.length}</strong> productos
          </p>
        </div>

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