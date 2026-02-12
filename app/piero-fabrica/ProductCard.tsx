'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { trackWhatsAppClick, trackViewContent } from '@/lib/pixel'
import { Producto, CATEGORIAS_CONFIG, TIPO_EMOJI } from '@/data/productos'
import { generarURLWhatsApp, obtenerSchemaAvailability } from '@/lib/producto-utils'

interface ProductCardProps {
  producto: Producto
}

export default function ProductCard({ producto }: ProductCardProps) {
  const {
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
  } = producto

  const cardRef = useRef<HTMLElement>(null)
  const hasTrackedView = useRef(false)

  // ========== TRACKING ==========
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

  const handleWhatsAppClick = () => {
    trackWhatsAppClick({
      producto: nombre,
      tamaño: tamaño,
      precio: precioPublico,
      categoria: categoria,
      precioMercadoLibre: precioMercadoLibre
    })
  }

  const config = CATEGORIAS_CONFIG[categoria]
  const urlWhatsApp = generarURLWhatsApp(producto)

  // ========== RENDER ==========
  return (
    <article
      ref={cardRef}
      className={`
        group relative 
        bg-zinc-800/60 backdrop-blur-sm
        rounded-xl md:rounded-2xl overflow-hidden
        border transition-all duration-300
        ${
          destacado
            ? 'border-blue-500/70 ring-1 ring-blue-500/20 shadow-2xl shadow-blue-500/20'
            : 'border-zinc-700/50 hover:border-zinc-600/80 shadow-xl shadow-zinc-900/20 hover:shadow-2xl hover:shadow-zinc-900/30'
        }
        hover:-translate-y-1
        flex flex-col h-full
      `}
      itemScope
      itemType="https://schema.org/Product"
    >
      {/* Badge Recomendado */}
      {destacado && (
        <div
          className="absolute top-4 left-4 z-20 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold rounded-full shadow-lg shadow-blue-500/40"
          aria-label="Producto recomendado"
        >
          ⭐ Recomendado
        </div>
      )}

      {/* Header con categoría */}
      <div className={`bg-gradient-to-r ${config.colorBg} text-white px-6 py-3 text-center`}>
        <span className="text-sm font-bold tracking-wide uppercase">
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
            loading={destacado ? 'eager' : 'lazy'}
            quality={85}
            itemProp="image"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-3 opacity-30" role="img" aria-label={tipo}>
                {TIPO_EMOJI[tipo]}
              </div>
              <p className="text-zinc-500 text-sm font-semibold px-4">{nombre}</p>
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Contenido */}
      <div className="p-5 md:p-6 flex-1 flex flex-col gap-3 md:gap-4">
        {/* Título */}
        <div>
          <h3
            className="text-lg md:text-xl font-bold text-white leading-tight tracking-tight mb-1"
            itemProp="name"
          >
            {nombre}
          </h3>
          <p className="text-sm text-zinc-400 font-medium">{tamaño}</p>
        </div>

        {/* Ahorro (si existe) */}
        {ahorro && ahorroPorc && ahorro > 0 && (
          <div className="bg-green-950/40 border border-green-500/30 backdrop-blur-sm rounded-xl p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-green-400 uppercase tracking-wide">
                Ahorrás:
              </span>
              <div className="text-right">
                <div className="text-xl font-black text-green-400 tabular-nums">
                  ${ahorro.toLocaleString('es-AR')}
                </div>
                <div className="text-xs font-bold text-green-500">{ahorroPorc}% OFF</div>
              </div>
            </div>
          </div>
        )}

        {/* Precios */}
        <div className="space-y-1.5" itemProp="offers" itemScope itemType="https://schema.org/Offer">
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">
            Precio Fábrica
          </p>
          <p
            className="text-3xl md:text-4xl font-black text-white tabular-nums"
            itemProp="price"
            content={precioPublico.toString()}
          >
            ${precioPublico.toLocaleString('es-AR')}
          </p>
          <meta itemProp="priceCurrency" content="ARS" />
          <meta itemProp="availability" content={obtenerSchemaAvailability(stock)} />

          {precioMercadoLibre && (
            <p className="text-sm text-zinc-500">
              <span className="line-through">${precioMercadoLibre.toLocaleString('es-AR')}</span>
              <span className="ml-2 text-green-500 font-semibold">en ML</span>
            </p>
          )}
        </div>

        {/* Cuotas (solo colchones) */}
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </summary>

            <div className="bg-zinc-900/50 border-t border-zinc-700/50">
              <div className="p-4 space-y-3">
                <div className="bg-green-950/40 border border-green-500/30 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <svg
                      className="w-4 h-4 text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-xs font-bold text-green-400 uppercase tracking-wide">
                      Sin Recargo
                    </span>
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
                    { cuotas: '12 cuotas', recargo: '+47%' }
                  ].map((item) => (
                    <div
                      key={item.cuotas}
                      className="flex items-center justify-between py-2 px-3 bg-zinc-800/50 border border-zinc-700/30 rounded-lg"
                    >
                      <span className="font-medium text-zinc-400">{item.cuotas}</span>
                      <span className="font-bold text-zinc-300">{item.recargo}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </details>
        )}

        {/* Stock */}
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

        {/* CTA WhatsApp */}
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
          <svg
            className="w-5 h-5 flex-shrink-0 group-hover/cta:scale-110 transition-transform"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          <span>Consultar Ahora</span>
        </a>
      </div>
    </article>
  )
}