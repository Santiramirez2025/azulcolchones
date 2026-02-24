'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { trackWhatsAppClick, trackViewContent } from '@/lib/pixel'

// ─────────────────────────────────────────────────────────────────────────────
// TIPOS
// ─────────────────────────────────────────────────────────────────────────────

interface PackItem {
  nombre: string
  detalle: string
  precioIndividual: number
}

interface PackComercial {
  id: string
  nombre: string
  slogan: string
  emoji: string
  imagenColchon: string     // foto del colchón principal (del products.ts)
  nombreColchon: string
  items: PackItem[]
  precioTotal: number
  precioPack: number
  ahorroVsML: number
  badge: string
  accentBg: string          // clases Tailwind para el encabezado de color
  accentText: string
  accentBorder: string
  accentGlow: string
  accentBadge: string       // bg color del badge pequeño
  perfilCliente: string
  destacado?: boolean
}

// ─────────────────────────────────────────────────────────────────────────────
// DATOS
// Pack 1 · Nirvana 140      $629.900   ahorro 10.9%
// Pack 2 · Sonno EP 140     $599.900   ahorro 11.4%  ← DESTACADO
// Pack 3 · Regno Pillow 160 $879.900   ahorro 13.1%
// Pack 4 · Montreaux P 160  $1.389.900 ahorro 10.5%
// ─────────────────────────────────────────────────────────────────────────────

const PACKS: PackComercial[] = [
  {
    id: 'ahorro-inteligente',
    nombre: 'Pack Ahorro',
    slogan: 'Todo lo que necesitás, al mejor precio',
    emoji: '💰',
    imagenColchon: '/images/nirvana-140.jpg',
    nombreColchon: 'Nirvana 2 Plazas',
    badge: 'MEJOR PRECIO',
    accentBg: 'bg-gradient-to-br from-rose-700/70 to-rose-900/90',
    accentText: 'text-rose-400',
    accentBorder: 'border-rose-500/25',
    accentGlow: 'shadow-rose-500/10',
    accentBadge: 'bg-rose-600',
    items: [
      { nombre: 'Colchón Piero Nirvana 2P',          detalle: '190×140 cm',                          precioIndividual: 549900 },
      { nombre: 'Cubre Colchón Lateral',              detalle: '190×140 cm — ajustable impermeable',  precioIndividual: 37000  },
      { nombre: '2× Almohadas Fibra Smart Confort',   detalle: '70×40 cm c/u',                        precioIndividual: 120000 },
    ],
    precioTotal: 706900,
    precioPack:  629900,
    ahorroVsML:  200000,
    perfilCliente: 'Parejas jóvenes, primer hogar, presupuesto controlado.',
    destacado: false,
  },
  {
    id: 'mas-vendido',
    nombre: 'Pack Más Vendido',
    slogan: 'Lo que eligen 7 de cada 10 familias',
    emoji: '⭐',
    imagenColchon: '/images/sonno-ep-140.jpg',
    nombreColchon: 'Sonno EuroPillow 2 Plazas',
    badge: 'TOP VENTAS',
    accentBg: 'bg-gradient-to-br from-blue-700/70 to-indigo-900/90',
    accentText: 'text-blue-400',
    accentBorder: 'border-blue-500/35',
    accentGlow: 'shadow-blue-500/20',
    accentBadge: 'bg-blue-600',
    items: [
      { nombre: 'Colchón Piero Sonno EuroPillow',     detalle: '190×140 cm',                          precioIndividual: 469900 },
      { nombre: 'Cubre Colchón Lateral',              detalle: '190×140 cm — ajustable impermeable',  precioIndividual: 37000  },
      { nombre: '2× Almohadas Micro Max Tech Rollo',  detalle: '70×50 cm c/u',                        precioIndividual: 170000 },
    ],
    precioTotal: 676900,
    precioPack:  599900,
    ahorroVsML:  180000,
    perfilCliente: 'Familias, renovación, buscan calidad probada.',
    destacado: true,
  },
  {
    id: 'confort-total',
    nombre: 'Pack Confort Total',
    slogan: 'Dormí como en hotel 5 estrellas',
    emoji: '🛏️',
    imagenColchon: '/images/regno-pillow-160.jpg',
    nombreColchon: 'Regno Pillow Top Queen',
    badge: 'COMPLETO',
    accentBg: 'bg-gradient-to-br from-purple-700/70 to-violet-900/90',
    accentText: 'text-purple-400',
    accentBorder: 'border-purple-500/25',
    accentGlow: 'shadow-purple-500/10',
    accentBadge: 'bg-purple-600',
    items: [
      { nombre: 'Colchón Piero Regno Pillow Top',     detalle: '200×160 cm (Queen)',                  precioIndividual: 659900 },
      { nombre: 'Cubre Colchón Lateral',              detalle: '200×160 cm — ajustable impermeable',  precioIndividual: 58000  },
      { nombre: '2× Almohadas Micro Max Tech Rollo',  detalle: '70×50 cm c/u',                        precioIndividual: 170000 },
      { nombre: 'Sábanas Piero 144 Hilos',            detalle: '160×200 cm (Queen)',                  precioIndividual: 124900 },
    ],
    precioTotal: 1012800,
    precioPack:   879900,
    ahorroVsML:   350000,
    perfilCliente: 'Parejas consolidadas, valoran calidad de sueño.',
    destacado: false,
  },
  {
    id: 'premium',
    nombre: 'Pack Premium',
    slogan: 'El mejor descanso de tu vida',
    emoji: '👑',
    imagenColchon: '/images/montreaux-pillow-160.jpg',
    nombreColchon: 'Montreaux Pillow Top Queen',
    badge: 'LO MEJOR',
    accentBg: 'bg-gradient-to-br from-amber-600/70 to-orange-900/90',
    accentText: 'text-amber-400',
    accentBorder: 'border-amber-500/25',
    accentGlow: 'shadow-amber-500/10',
    accentBadge: 'bg-amber-500',
    items: [
      { nombre: 'Colchón Piero Montreaux Pillow Top', detalle: '200×160 cm (Queen)',                  precioIndividual: 1199900 },
      { nombre: 'Cubre Colchón Lateral',              detalle: '200×160 cm — ajustable impermeable',  precioIndividual: 58000   },
      { nombre: '2× Almohadas Micro Max Tech Rollo',  detalle: '70×50 cm c/u',                        precioIndividual: 170000  },
      { nombre: 'Sábanas Piero 144 Hilos',            detalle: '160×200 cm (Queen)',                  precioIndividual: 124900  },
    ],
    precioTotal: 1552800,
    precioPack:  1389900,
    ahorroVsML:  1000000,
    perfilCliente: 'Profesionales exigentes, problemas de espalda, lo mejor.',
    destacado: false,
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// ÍCONOS
// ─────────────────────────────────────────────────────────────────────────────

function WAIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg className="w-3 h-3 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PACK CARD
//
// MOBILE (< 640px):
//   Foto del colchón arriba — proporción 16:9 (ancha, no muy alta)
//   Header de color justo debajo con nombre + slogan
//   Lista de items compacta
//   Precio + CTA al final
//   → El usuario ve la foto del producto REAL, entiende qué incluye, ve el precio
//
// DESKTOP (≥ 640px):
//   4 columnas. Misma estructura vertical pero con más espacio.
//   La card destacada tiene ring + shadow extra.
// ─────────────────────────────────────────────────────────────────────────────

function PackCard({ pack, index }: { pack: PackComercial; index: number }) {
  const ref        = useRef<HTMLElement>(null)
  const tracked    = useRef(false)
  const [visible,  setVisible]  = useState(false)
  const [imgError, setImgError] = useState(false)

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 70)
          if (!tracked.current) {
            tracked.current = true
            trackViewContent({ producto: `Pack ${pack.nombre}`, tamaño: 'combo', precio: pack.precioPack, categoria: 'pack-comercial' })
          }
        }
      },
      { threshold: 0.08 }
    )
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [pack, index])

  const ahorroPack       = pack.precioTotal - pack.precioPack
  const ahorroPorcentaje = Math.round((ahorroPack / pack.precioTotal) * 100)
  const msgWA            = `Hola! Me interesa el *${pack.nombre}* a $${pack.precioPack.toLocaleString('es-AR')}. ¿Tienen disponibilidad?`
  const urlWA            = `https://wa.me/5493534017332?text=${encodeURIComponent(msgWA)}`

  return (
    <div
      className={`
        relative transition-all duration-600 ease-out
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}
      `}
    >
      {/* Glow en destacado */}
      {pack.destacado && (
        <div className="absolute -inset-[2px] rounded-[20px] bg-gradient-to-b from-blue-500/25 to-blue-500/5 blur-md pointer-events-none" />
      )}

      <article
        ref={ref}
        className={`
          relative flex flex-col h-full overflow-hidden rounded-[18px]
          bg-zinc-900 border transition-colors duration-300
          ${pack.destacado
            ? `${pack.accentBorder} ring-2 ring-blue-500/20 shadow-2xl ${pack.accentGlow}`
            : `border-zinc-800 hover:${pack.accentBorder} shadow-md hover:shadow-xl`
          }
        `}
      >
        {/* Badge MÁS ELEGIDO */}
        {pack.destacado && (
          <div className="absolute top-0 right-0 z-30">
            <span className="block px-3 py-1.5 bg-gradient-to-r from-amber-400 to-orange-500 text-zinc-900 text-[10px] font-black rounded-bl-2xl shadow-lg">
              ⭐ MÁS ELEGIDO
            </span>
          </div>
        )}

        {/* ── FOTO DEL COLCHÓN ─────────────────────────────────────────
            Proporción 16:9 en mobile para que sea ancha sin ser muy alta.
            En desktop un poco más cuadrada (3:2).
            La foto muestra el colchón real que incluye el pack.
        ──────────────────────────────────────────────────────────── */}
        <div className="relative w-full aspect-video sm:aspect-[4/3] overflow-hidden bg-zinc-800 flex-shrink-0">
          {!imgError ? (
            <Image
              src={pack.imagenColchon}
              alt={pack.nombreColchon}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover object-center"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-zinc-800">
              <span className="text-5xl">{pack.emoji}</span>
            </div>
          )}

          {/* Gradiente inferior que conecta con el header */}
          <div className={`absolute inset-x-0 bottom-0 h-16 ${pack.accentBg} opacity-80`}
            style={{ maskImage: 'linear-gradient(to top, black 40%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to top, black 40%, transparent 100%)' }}
          />

          {/* Badge categoría sobre la foto */}
          <div className="absolute top-3 left-3 z-10">
            <span className={`px-2.5 py-1 ${pack.accentBadge} text-white text-[11px] font-black rounded-full shadow-md uppercase tracking-wide`}>
              {pack.badge}
            </span>
          </div>

          {/* Nombre del colchón en overlay inferior */}
          <div className="absolute bottom-0 inset-x-0 px-3 pb-2 z-10">
            <p className="text-white/70 text-[10px] font-medium truncate">{pack.nombreColchon}</p>
          </div>
        </div>

        {/* ── HEADER DE COLOR ──────────────────────────────────────────── */}
        <div className={`${pack.accentBg} px-4 pt-3 pb-4`}>
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-base font-black text-white leading-tight">{pack.nombre}</h3>
              <p className="text-white/65 text-xs mt-0.5 italic">"{pack.slogan}"</p>
            </div>
            <span className="text-xl flex-shrink-0" aria-hidden>{pack.emoji}</span>
          </div>
        </div>

        {/* ── CONTENIDO ────────────────────────────────────────────────── */}
        <div className="flex flex-col flex-1 p-4 gap-3">

          {/* Lista de items incluidos */}
          <div>
            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-2">Incluye:</p>
            <ul className="space-y-1.5">
              {pack.items.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 p-2 bg-zinc-800/70 rounded-xl border border-zinc-700/30"
                >
                  <div className="flex-shrink-0 w-5 h-5 bg-green-500/15 rounded-full flex items-center justify-center mt-px">
                    <CheckIcon />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white leading-tight">{item.nombre}</p>
                    <p className="text-[10px] text-zinc-500 mt-px leading-tight">{item.detalle}</p>
                  </div>
                  <span className="text-[10px] text-zinc-600 font-medium tabular-nums flex-shrink-0 mt-px">
                    ${item.precioIndividual.toLocaleString('es-AR')}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Separador */}
          <div className="border-t border-dashed border-zinc-800" />

          {/* Bloque precios */}
          <div className="space-y-2">
            {/* Precio por separado tachado */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-zinc-600">Por separado:</span>
              <span className="text-sm text-zinc-600 line-through tabular-nums">
                ${pack.precioTotal.toLocaleString('es-AR')}
              </span>
            </div>

            {/* Precio pack principal */}
            <div className="bg-zinc-800/80 rounded-xl p-3 border border-zinc-700/40">
              <div className="flex items-end justify-between mb-2">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide">Precio Pack</span>
                <p className="text-2xl font-black text-white tabular-nums leading-none">
                  ${pack.precioPack.toLocaleString('es-AR')}
                </p>
              </div>
              {/* Pill de ahorro */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-500/15 border border-green-500/20 rounded-lg text-[11px] font-bold text-green-400">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                  </svg>
                  Ahorrás ${ahorroPack.toLocaleString('es-AR')} ({ahorroPorcentaje}%)
                </span>
              </div>
            </div>
          </div>

          {/* Perfil del cliente */}
          <p className="text-[11px] text-zinc-500 leading-relaxed px-1">
            <span className="font-semibold text-zinc-400">Ideal para:</span>{' '}
            {pack.perfilCliente}
          </p>

          {/* CTA */}
          <a
            href={urlWA}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick({ producto: `Pack ${pack.nombre}`, tamaño: 'combo', precio: pack.precioPack, categoria: 'pack-comercial' })}
            className="
              mt-auto w-full min-h-[48px] flex items-center justify-center gap-2.5
              bg-gradient-to-r from-green-600 to-emerald-600
              hover:brightness-110 active:brightness-90
              text-white font-bold text-sm rounded-xl
              transition-all duration-200 shadow-lg hover:-translate-y-px hover:shadow-xl
              focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:ring-offset-2 focus:ring-offset-zinc-900
            "
          >
            <WAIcon />
            Consultar este pack
          </a>
        </div>
      </article>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SECCIÓN PRINCIPAL
// ─────────────────────────────────────────────────────────────────────────────

export default function PacksComerciales() {
  return (
    <section
      id="packs"
      className="relative bg-gradient-to-b from-zinc-950 via-zinc-900/40 to-zinc-950 py-14 md:py-24 overflow-hidden"
      aria-labelledby="packs-heading"
    >
      {/* Fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
        <div className="absolute w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[160px] -top-40 -left-20" />
        <div className="absolute w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[140px] top-1/2 -right-36" />
        <div className="absolute w-[300px] h-[300px] bg-amber-500/4 rounded-full blur-[100px] bottom-0 left-1/3" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <header className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/25 rounded-full text-green-400 text-xs font-bold uppercase tracking-widest mb-5">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm2.5 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm6.207.293a1 1 0 00-1.414 0l-6 6a1 1 0 101.414 1.414l6-6a1 1 0 000-1.414zM12.5 10a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" clipRule="evenodd" />
            </svg>
            Combos Exclusivos Piero
          </div>

          <h2
            id="packs-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-3 leading-tight"
          >
            Packs con{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400">
              Ahorro Extra
            </span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto mb-6">
            Combos armados con{' '}
            <strong className="text-white">hasta 13% de descuento adicional</strong>{' '}
            vs comprar cada producto por separado
          </p>

          {/* Trust pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs text-zinc-500">
            {['Garantía Piero oficial', 'Envío a domicilio', 'Todas las tarjetas'].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {t}
              </span>
            ))}
          </div>
        </header>

        {/* ── GRID DE PACKS ──
          Mobile  (< sm):  1 col full-width
          Tablet  (sm–lg): 2 col
          Desktop (lg+):   4 col
        */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mb-10 md:mb-12"
          role="list"
        >
          {PACKS.map((pack, i) => (
            <div key={pack.id} role="listitem">
              <PackCard pack={pack} index={i} />
            </div>
          ))}
        </div>

        {/* CTA personalizado */}
        <div className="flex justify-center">
          <div className="w-full max-w-lg flex flex-col sm:flex-row items-stretch sm:items-center gap-4 p-5 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-2xl">
            <div className="text-center sm:text-left">
              <p className="text-white font-bold text-sm mb-0.5">¿Necesitás un pack a medida?</p>
              <p className="text-xs text-zinc-400">Armamos combos personalizados según tu presupuesto</p>
            </div>
            <a
              href="https://wa.me/5493534017332?text=Hola!%20Quiero%20armar%20un%20pack%20personalizado%20de%20colchones%20Piero"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5
                bg-zinc-700 hover:bg-zinc-600 text-white font-bold text-sm
                rounded-xl transition-all duration-200 hover:scale-[1.01]"
            >
              <WAIcon className="w-4 h-4 text-green-400" />
              Armar mi pack
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}