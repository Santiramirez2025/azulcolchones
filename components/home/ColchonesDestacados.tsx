'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { trackWhatsAppClick, trackViewContent } from '@/lib/pixel'

// ─────────────────────────────────────────────────────────────────────────────
// TIPOS
// ─────────────────────────────────────────────────────────────────────────────

interface ColchonDestacado {
  id: string
  nombre: string
  subtitulo: string
  tamaño: string
  dimensiones: string
  plaza: string
  precioPublico: number
  precioML: number
  etiqueta: string
  descripcion: string
  atributos: string[]
  imagen: string
  esDestacado?: boolean
  acento: {
    gradientBadge: string
    gradientBtn: string
    colorText: string
    colorBorder: string
    colorGlow: string
    colorDot: string
    colorRing: string
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// DATOS
// Estrategia anclaje de precios:
//   Meditare EP 80 → $189.900  (1 plaza  / ahorro 24% vs ML $249.900) entrada
//   Nirvana 140    → $549.900  (2 plazas / ahorro 22% vs ML $709.900) ← VENDER
//   Montreaux 200  → $1.369.900 (King    / ahorro 49% vs ML) aspiracional
// ─────────────────────────────────────────────────────────────────────────────

const COLCHONES: ColchonDestacado[] = [
  {
    id: 'meditare-ep-80',
    nombre: 'Piero Meditare EuroPillow',
    subtitulo: 'Colchón 1 Plaza',
    tamaño: '190 × 80 cm',
    dimensiones: '190x80',
    plaza: '1 Plaza',
    precioPublico: 189900,
    precioML: 249900,
    etiqueta: 'Entrada',
    descripcion: 'El acceso perfecto al descanso Piero. EuroPillow con soporte firme y adaptación al cuerpo.',
    atributos: ['EuroPillow', 'Soporte firme', 'Tela premium', '10 años garantía'],
    imagen: '/images/meditare-ep-80.jpg',
    esDestacado: false,
    acento: {
      gradientBadge: 'from-rose-500 to-red-600',
      gradientBtn:   'from-rose-600 to-red-700',
      colorText:     'text-rose-400',
      colorBorder:   'border-rose-500/30',
      colorGlow:     'shadow-rose-500/15',
      colorDot:      'bg-rose-400',
      colorRing:     'ring-rose-500/20',
    },
  },
  {
    id: 'nirvana-140',
    nombre: 'Piero Nirvana',
    subtitulo: 'Colchón 2 Plazas',
    tamaño: '190 × 140 cm',
    dimensiones: '190x140',
    plaza: '2 Plazas',
    precioPublico: 549900,
    precioML: 709900,
    etiqueta: 'Más Vendido',
    descripcion: 'El más elegido de Villa María en 2 plazas. Alta densidad, soporte óptimo y durabilidad comprobada.',
    atributos: ['Alta densidad', 'Soporte óptimo', 'Máxima durabilidad', '10 años garantía'],
    imagen: '/images/nirvana-140.jpg',
    esDestacado: true,
    acento: {
      gradientBadge: 'from-blue-500 to-indigo-600',
      gradientBtn:   'from-blue-600 to-indigo-700',
      colorText:     'text-blue-400',
      colorBorder:   'border-blue-500/40',
      colorGlow:     'shadow-blue-500/25',
      colorDot:      'bg-blue-400',
      colorRing:     'ring-blue-500/30',
    },
  },
  {
    id: 'montreaux-pillow-200',
    nombre: 'Piero Montreaux Pillow',
    subtitulo: 'Colchón King Size',
    tamaño: '200 × 200 cm',
    dimensiones: '200x200',
    plaza: 'King',
    precioPublico: 1369900,
    precioML: 2679900,
    etiqueta: 'Premium',
    descripcion: 'La experiencia más lujosa. Pillow Top premium con sistema de resortes independientes.',
    atributos: ['Pillow Top', 'Resortes pocket', 'Hotel 5★', '10 años garantía'],
    imagen: '/images/montreaux-pillow-200.jpg',
    esDestacado: false,
    acento: {
      gradientBadge: 'from-amber-500 to-orange-600',
      gradientBtn:   'from-amber-500 to-orange-600',
      colorText:     'text-amber-400',
      colorBorder:   'border-amber-500/30',
      colorGlow:     'shadow-amber-500/15',
      colorDot:      'bg-amber-400',
      colorRing:     'ring-amber-500/20',
    },
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// ÍCONO WA
// ─────────────────────────────────────────────────────────────────────────────

function WAIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CARD
//
// MOBILE  (< 640px): layout HORIZONTAL — foto cuadrada izq + info der + CTA abajo
// DESKTOP (≥ 640px): layout VERTICAL  — foto arriba + info abajo
// Card central elevada en desktop para efecto de anclaje visual
// ─────────────────────────────────────────────────────────────────────────────

function ColchonCard({ colchon, index }: { colchon: ColchonDestacado; index: number }) {
  const ref        = useRef<HTMLDivElement>(null)
  const tracked    = useRef(false)
  const [visible,  setVisible]  = useState(false)
  const [imgError, setImgError] = useState(false)

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 90)
          if (!tracked.current) {
            tracked.current = true
            trackViewContent({ producto: colchon.nombre, tamaño: colchon.dimensiones, precio: colchon.precioPublico, categoria: 'colchon-destacado' })
          }
        }
      },
      { threshold: 0.08 }
    )
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [colchon, index])

  const ahorroPesos = colchon.precioML - colchon.precioPublico
  const ahorroPorc  = Math.round((ahorroPesos / colchon.precioML) * 100)
  const msgWA       = `Hola! Me interesa el *${colchon.nombre}* en ${colchon.tamaño} a $${colchon.precioPublico.toLocaleString('es-AR')}. ¿Tienen disponibilidad?`
  const urlWA       = `https://wa.me/5493534096566?text=${encodeURIComponent(msgWA)}`

  return (
    <div
      ref={ref}
      className={`
        relative transition-all duration-600 ease-out
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}
        ${colchon.esDestacado ? 'sm:-mt-4 sm:mb-4' : ''}
      `}
    >
      {/* Glow exterior en card destacada */}
      {colchon.esDestacado && (
        <div className="absolute -inset-[2px] rounded-[20px] bg-gradient-to-b from-blue-500/25 to-blue-500/5 blur-md pointer-events-none" />
      )}

      <article
        className={`
          relative rounded-[18px] overflow-hidden bg-zinc-900
          border transition-colors duration-300
          ${colchon.esDestacado
            ? `${colchon.acento.colorBorder} shadow-2xl ${colchon.acento.colorGlow} ring-1 ${colchon.acento.colorRing}`
            : `border-zinc-800 hover:${colchon.acento.colorBorder} shadow-md hover:shadow-xl`
          }
        `}
      >
        {/* Badge RECOMENDADO — esquina sup-der */}
        {colchon.esDestacado && (
          <div className="absolute top-0 right-0 z-30">
            <span className="block px-3 py-1.5 bg-gradient-to-r from-amber-400 to-orange-500 text-zinc-900 text-[10px] font-black rounded-bl-2xl shadow-lg">
              ⭐ RECOMENDADO
            </span>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════
            MOBILE: layout horizontal (foto izq + info der)
            sm:hidden → solo visible en mobile
        ══════════════════════════════════════════════════════ */}
        <div className="flex sm:hidden">

          {/* Foto cuadrada */}
          <div className="relative w-[140px] h-[140px] flex-shrink-0 bg-zinc-800">
            {!imgError ? (
              <Image
                src={colchon.imagen}
                alt={colchon.nombre}
                fill
                sizes="140px"
                className="object-cover object-center"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl">🛏️</span>
              </div>
            )}
            {/* Gradiente der para fundir con el fondo */}
            <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-zinc-900 to-transparent" />
          </div>

          {/* Info derecha */}
          <div className="flex flex-col flex-1 min-w-0 px-3 py-3 gap-1.5">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className={`inline-flex px-2 py-0.5 bg-gradient-to-r ${colchon.acento.gradientBadge} text-white text-[10px] font-black rounded-full`}>
                {colchon.etiqueta}
              </span>
              <span className={`text-[10px] font-bold uppercase tracking-wider ${colchon.acento.colorText}`}>
                {colchon.subtitulo}
              </span>
            </div>

            <h3 className="text-sm font-black text-white leading-tight">{colchon.nombre}</h3>

            <span className={`text-[10px] font-mono font-semibold ${colchon.acento.colorText}`}>
              {colchon.tamaño}
            </span>

            <div className="mt-auto pt-1">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-zinc-600 line-through tabular-nums">
                  ${colchon.precioML.toLocaleString('es-AR')}
                </span>
                <span className={`text-[10px] font-bold ${colchon.acento.colorText} bg-zinc-800 px-1 rounded`}>
                  -{ahorroPorc}%
                </span>
              </div>
              <p className="text-xl font-black text-white tabular-nums leading-none">
                ${colchon.precioPublico.toLocaleString('es-AR')}
              </p>
            </div>
          </div>
        </div>

        {/* CTA mobile — abajo del layout horizontal */}
        <div className="sm:hidden px-3 pb-3">
          <a
            href={urlWA}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick({ producto: colchon.nombre, tamaño: colchon.dimensiones, precio: colchon.precioPublico, categoria: 'colchon-destacado' })}
            className={`flex items-center justify-center gap-2 w-full h-10 bg-gradient-to-r ${colchon.acento.gradientBtn} text-white text-xs font-bold rounded-xl transition-all duration-200 active:brightness-90`}
          >
            <WAIcon className="w-3.5 h-3.5" />
            Consultar disponibilidad
          </a>
        </div>

        {/* ══════════════════════════════════════════════════════
            DESKTOP sm+: layout vertical (foto arriba + info)
            hidden sm:flex → solo visible en sm+
        ══════════════════════════════════════════════════════ */}
        <div className="hidden sm:flex flex-col">

          {/* Foto */}
          <div className="relative w-full h-[230px] bg-zinc-800 flex-shrink-0 overflow-hidden">
            {!imgError ? (
              <Image
                src={colchon.imagen}
                alt={`${colchon.nombre} ${colchon.tamaño}`}
                fill
                sizes="(max-width: 1024px) 50vw, 33vw"
                className="object-cover object-center transition-transform duration-500 hover:scale-[1.04]"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <span className="text-5xl">🛏️</span>
                <span className={`text-xs font-bold ${colchon.acento.colorText} uppercase tracking-widest`}>{colchon.plaza}</span>
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-zinc-900 to-transparent pointer-events-none" />

            {/* Badge categoría */}
            <div className="absolute top-3 left-3 z-10">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r ${colchon.acento.gradientBadge} text-white text-[11px] font-black rounded-full shadow-md`}>
                {colchon.etiqueta === 'Más Vendido' && (
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                )}
                {colchon.etiqueta}
              </span>
            </div>

            {/* Badge dimensión */}
            <div className="absolute bottom-3 right-3 z-10">
              <span className={`text-[11px] font-mono font-bold ${colchon.acento.colorText} bg-zinc-900/85 backdrop-blur-sm px-2 py-0.5 rounded-md border border-zinc-700/50`}>
                {colchon.tamaño}
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col flex-1 p-5 gap-4">
            <div>
              <p className={`text-[11px] font-bold uppercase tracking-widest ${colchon.acento.colorText} mb-0.5`}>
                {colchon.subtitulo}
              </p>
              <h3 className="text-xl font-black text-white leading-tight">{colchon.nombre}</h3>
              <p className="text-sm text-zinc-400 mt-1.5 leading-relaxed">{colchon.descripcion}</p>
            </div>

            <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5">
              {colchon.atributos.map((a) => (
                <li key={a} className="flex items-center gap-1.5 min-w-0">
                  <span className={`flex-shrink-0 w-1.5 h-1.5 rounded-full ${colchon.acento.colorDot}`} />
                  <span className="text-xs text-zinc-400 truncate">{a}</span>
                </li>
              ))}
            </ul>

            <div className="border-t border-zinc-800" />

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-600 line-through tabular-nums">
                  ML ${colchon.precioML.toLocaleString('es-AR')}
                </span>
                <span className={`text-[11px] font-bold ${colchon.acento.colorText} bg-zinc-800 border border-zinc-700 px-1.5 py-px rounded`}>
                  -{ahorroPorc}% OFF
                </span>
              </div>
              <div className="flex items-end justify-between gap-2">
                <div>
                  <p className="text-[11px] text-zinc-500 font-medium leading-none mb-1">Precio fábrica</p>
                  <p className="text-3xl font-black text-white tabular-nums leading-none">
                    ${colchon.precioPublico.toLocaleString('es-AR')}
                  </p>
                </div>
                <div className="text-right pb-0.5">
                  <p className={`text-[11px] font-semibold ${colchon.acento.colorText}`}>Ahorrás</p>
                  <p className={`text-lg font-black ${colchon.acento.colorText} tabular-nums`}>
                    ${ahorroPesos.toLocaleString('es-AR')}
                  </p>
                </div>
              </div>
            </div>

            <a
              href={urlWA}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick({ producto: colchon.nombre, tamaño: colchon.dimensiones, precio: colchon.precioPublico, categoria: 'colchon-destacado' })}
              className={`
                mt-auto w-full min-h-[50px] flex items-center justify-center gap-2.5
                bg-gradient-to-r ${colchon.acento.gradientBtn}
                hover:brightness-110 active:brightness-90
                text-white font-bold text-sm rounded-xl
                transition-all duration-200 shadow-lg hover:-translate-y-px hover:shadow-xl
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900
              `}
            >
              <WAIcon />
              Consultar disponibilidad
            </a>
          </div>
        </div>

      </article>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SECCIÓN PRINCIPAL
// ─────────────────────────────────────────────────────────────────────────────

export default function ColchonesDestacados() {
  return (
    <section
      id="colchones-destacados"
      className="relative bg-zinc-950 py-14 md:py-24 overflow-hidden"
      aria-labelledby="destacados-heading"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
        <div className="absolute w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[160px] -top-24 left-1/2 -translate-x-1/2" />
        <div className="absolute w-[280px] h-[280px] bg-rose-600/4 rounded-full blur-[120px] top-1/3 -left-20" />
        <div className="absolute w-[280px] h-[280px] bg-amber-500/4 rounded-full blur-[120px] top-1/3 -right-20" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6">

        <header className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800/70 border border-zinc-700/60 rounded-full text-zinc-400 text-xs font-bold uppercase tracking-widest mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Stock disponible hoy en Villa María
          </div>

          <h2
            id="destacados-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-3 leading-tight"
          >
            Los colchones que{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 via-white to-zinc-400">
              más se venden
            </span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-500 max-w-md mx-auto">
            Selección curada para cada necesidad.{' '}
            <span className="text-white font-semibold">Precios directos de fábrica</span>, sin intermediarios.
          </p>
        </header>

        {/* Grid: 1col mobile / 3col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5 md:gap-6 items-start">
          {COLCHONES.map((c, i) => (
            <ColchonCard key={c.id} colchon={c} index={i} />
          ))}
        </div>

        <div className="mt-10 md:mt-14 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
          <a
            href="/catalogo"
            className="flex items-center justify-center gap-2 min-h-[48px] px-5 py-3
              border border-zinc-700 hover:border-zinc-500 text-zinc-400 hover:text-white
              text-sm font-bold rounded-xl transition-all duration-200 hover:bg-zinc-800/50"
          >
            Ver catálogo completo
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>

          <a
            href="https://wa.me/5493534096566?text=Hola!%20Necesito%20asesoramiento%20para%20elegir%20mi%20colch%C3%B3n%20ideal."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 min-h-[48px] px-5 py-3
              bg-zinc-800 hover:bg-zinc-700 border border-zinc-700/60
              text-white text-sm font-bold rounded-xl transition-all duration-200"
          >
            <WAIcon className="w-4 h-4 text-green-400" />
            Asesoramiento gratis por WhatsApp
          </a>
        </div>

      </div>
    </section>
  )
}