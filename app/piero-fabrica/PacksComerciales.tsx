'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { trackWhatsAppClick, trackViewContent } from '@/lib/pixel'

// ============================================================================
// TYPES
// ============================================================================

interface PackItem {
  nombre: string
  detalle: string
  precioIndividual: number
  imagen?: string
}

interface PackComercial {
  id: string
  nombre: string
  slogan: string
  emoji: string
  items: PackItem[]
  precioTotal: number
  precioPack: number
  ahorroVsML: number
  badge: string
  badgeColor: string
  gradientFrom: string
  gradientTo: string
  borderColor: string
  glowColor: string
  perfilCliente: string
  destacado?: boolean
}

// ============================================================================
// PACK CARD COMPONENT
// ============================================================================

function PackCard({ pack }: { pack: PackComercial }) {
  const cardRef = useRef<HTMLElement>(null)
  const hasTrackedView = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTrackedView.current) {
            hasTrackedView.current = true
            trackViewContent({
              producto: `Pack ${pack.nombre}`,
              tamaño: 'combo',
              precio: pack.precioPack,
              categoria: 'pack-comercial'
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
  }, [pack.nombre, pack.precioPack])

  const ahorroPack = pack.precioTotal - pack.precioPack
  const ahorroPorcentaje = Math.round((ahorroPack / pack.precioTotal) * 100)

  const mensajeWhatsApp = `Hola! Me interesa el *${pack.nombre}* a $${pack.precioPack.toLocaleString('es-AR')}. ¿Tienen disponibilidad?`
  const urlWhatsApp = `https://wa.me/5493534017332?text=${encodeURIComponent(mensajeWhatsApp)}`

  const handleWhatsAppClick = () => {
    trackWhatsAppClick({
      producto: `Pack ${pack.nombre}`,
      tamaño: 'combo',
      precio: pack.precioPack,
      categoria: 'pack-comercial'
    })
  }

  return (
    <article
      ref={cardRef}
      className={`
        group relative
        bg-zinc-800/40 backdrop-blur-sm
        rounded-2xl overflow-hidden
        border-2 transition-all duration-500
        ${pack.destacado 
          ? `${pack.borderColor} ring-2 ring-blue-500/30 shadow-2xl ${pack.glowColor}` 
          : 'border-zinc-700/50 hover:border-zinc-600/80 shadow-xl'
        }
        hover:-translate-y-2 hover:shadow-2xl
        flex flex-col h-full
      `}
    >
      {/* Badge Destacado */}
      {pack.destacado && (
        <div className="absolute -top-1 -right-1 z-20">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 blur-lg opacity-60"></div>
            <div className="relative px-4 py-1.5 bg-gradient-to-r from-amber-400 to-orange-500 text-zinc-900 text-xs font-black rounded-bl-xl rounded-tr-xl shadow-lg">
              ⭐ MÁS ELEGIDO
            </div>
          </div>
        </div>
      )}

      {/* Header con Gradiente */}
      <div className={`relative bg-gradient-to-br ${pack.gradientFrom} ${pack.gradientTo} p-6 pb-8`}>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        
        <div className="relative">
          <div className="flex items-start justify-between mb-3">
            <span className="text-4xl" role="img" aria-label={pack.nombre}>
              {pack.emoji}
            </span>
            <span className={`px-3 py-1 ${pack.badgeColor} text-white text-xs font-bold rounded-full shadow-lg`}>
              {pack.badge}
            </span>
          </div>
          
          <h3 className="text-2xl font-black text-white mb-1 tracking-tight">
            {pack.nombre}
          </h3>
          <p className="text-white/80 text-sm font-medium italic">
            "{pack.slogan}"
          </p>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-6 flex-1 flex flex-col gap-5">
        
        {/* Items del Pack */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
            Incluye:
          </p>
          <ul className="space-y-2.5">
            {pack.items.map((item, idx) => (
              <li 
                key={idx}
                className="flex items-start gap-3 p-3 bg-zinc-900/50 rounded-xl border border-zinc-700/30"
              >
                <div className="flex-shrink-0 w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white leading-tight">
                    {item.nombre}
                  </p>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    {item.detalle}
                  </p>
                </div>
                <span className="text-xs text-zinc-600 font-medium tabular-nums">
                  ${item.precioIndividual.toLocaleString('es-AR')}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Separador Visual */}
        <div className="border-t border-dashed border-zinc-700/50"></div>

        {/* Bloque de Precios */}
        <div className="space-y-3">
          {/* Precio Separado (tachado) */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-500">Comprando por separado:</span>
            <span className="text-lg text-zinc-500 line-through tabular-nums">
              ${pack.precioTotal.toLocaleString('es-AR')}
            </span>
          </div>

          {/* Precio Pack */}
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-xl p-4 border border-zinc-700/50">
            <div className="flex items-end justify-between mb-2">
              <span className="text-sm font-bold text-zinc-400 uppercase tracking-wide">
                Precio Pack:
              </span>
              <div className="text-right">
                <p className="text-3xl font-black text-white tabular-nums">
                  ${pack.precioPack.toLocaleString('es-AR')}
                </p>
              </div>
            </div>
            
            {/* Ahorros */}
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-500/20 border border-green-500/30 rounded-lg text-xs font-bold text-green-400">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                </svg>
                Ahorrás ${ahorroPack.toLocaleString('es-AR')} ({ahorroPorcentaje}%)
              </span>
              {pack.ahorroVsML > 0 && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-500/20 border border-blue-500/30 rounded-lg text-xs font-bold text-blue-400">
                  vs ML: ${pack.ahorroVsML.toLocaleString('es-AR')}+
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Perfil de Cliente */}
        <div className="flex items-start gap-2 p-3 bg-zinc-900/30 rounded-xl border border-zinc-800/50">
          <span className="text-base">👤</span>
          <p className="text-xs text-zinc-500 leading-relaxed">
            <span className="font-semibold text-zinc-400">Ideal para:</span> {pack.perfilCliente}
          </p>
        </div>

        {/* CTA WhatsApp */}
        <a
          href={urlWhatsApp}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleWhatsAppClick}
          className={`
            mt-auto w-full min-h-[56px] px-6 py-4
            bg-gradient-to-r from-green-600 to-emerald-600
            hover:from-green-500 hover:to-emerald-500
            active:from-green-700 active:to-emerald-700
            text-white text-center font-bold text-base
            rounded-xl
            flex items-center justify-center gap-3
            transition-all duration-300
            shadow-xl shadow-green-500/25 hover:shadow-green-500/40
            hover:scale-[1.02] active:scale-[0.98]
            focus:outline-none focus:ring-4 focus:ring-green-500/30
            group/cta
          `}
        >
          <svg className="w-5 h-5 flex-shrink-0 group-hover/cta:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          <span>Consultar Este Pack</span>
        </a>
      </div>
    </article>
  )
}

// ============================================================================
// PACKS DATA
// ============================================================================

const packsComerciales: PackComercial[] = [
  {
    id: 'ahorro-inteligente',
    nombre: 'Pack Ahorro Inteligente',
    slogan: 'Todo lo que necesitás, al mejor precio',
    emoji: '💰',
    badge: 'MEJOR PRECIO',
    badgeColor: 'bg-rose-600',
    gradientFrom: 'from-rose-600/90',
    gradientTo: 'to-red-700/90',
    borderColor: 'border-rose-500/50',
    glowColor: 'shadow-rose-500/20',
    items: [
      { nombre: 'Colchón Piero Nirvana', detalle: '190x140 (2 plazas)', precioIndividual: 549900 },
      { nombre: 'Protector Impermeable', detalle: '140x190 cm', precioIndividual: 37900 },
      { nombre: '2x Almohadas Fibra Smart Tech', detalle: '70x50 cm c/u', precioIndividual: 85800 },
    ],
    precioTotal: 673600,
    precioPack: 599900,
    ahorroVsML: 200000,
    perfilCliente: 'Parejas jóvenes, primer hogar, presupuesto controlado.',
    destacado: false
  },
  {
    id: 'mas-vendido',
    nombre: 'Pack Más Vendido',
    slogan: 'Lo que eligen 7 de cada 10 cordobeses',
    emoji: '⭐',
    badge: 'TOP VENTAS',
    badgeColor: 'bg-blue-600',
    gradientFrom: 'from-blue-600/90',
    gradientTo: 'to-indigo-700/90',
    borderColor: 'border-blue-500/50',
    glowColor: 'shadow-blue-500/20',
    items: [
      { nombre: 'Colchón Piero Sonno EuroPillow', detalle: '190x140 (2 plazas)', precioIndividual: 469900 },
      { nombre: 'Protector Impermeable', detalle: '140x190 cm', precioIndividual: 37900 },
      { nombre: '2x Almohadas Micro Max Premium', detalle: '70x50 cm c/u', precioIndividual: 149800 },
    ],
    precioTotal: 657600,
    precioPack: 579900,
    ahorroVsML: 180000,
    perfilCliente: 'Familias, renovación, buscan calidad probada.',
    destacado: true
  },
  {
    id: 'confort-total',
    nombre: 'Pack Confort Total',
    slogan: 'Dormí como en hotel 5 estrellas',
    emoji: '🛏️',
    badge: 'COMPLETO',
    badgeColor: 'bg-purple-600',
    gradientFrom: 'from-purple-600/90',
    gradientTo: 'to-violet-700/90',
    borderColor: 'border-purple-500/50',
    glowColor: 'shadow-purple-500/20',
    items: [
      { nombre: 'Colchón Piero Regno Pillow Top', detalle: '200x160 (Queen)', precioIndividual: 659900 },
      { nombre: 'Protector Impermeable', detalle: '160x200 cm', precioIndividual: 42900 },
      { nombre: '2x Almohadas Micro Max Premium', detalle: '70x50 cm c/u', precioIndividual: 149800 },
      { nombre: 'Sábanas Bamboo 600 Hilos', detalle: '160x200 cm', precioIndividual: 124900 },
    ],
    precioTotal: 977500,
    precioPack: 849900,
    ahorroVsML: 350000,
    perfilCliente: 'Parejas consolidadas, valoran calidad de sueño.',
    destacado: false
  },
  {
    id: 'premium-descanso',
    nombre: 'Pack Premium',
    slogan: 'El mejor descanso de tu vida',
    emoji: '👑',
    badge: 'LO MEJOR',
    badgeColor: 'bg-amber-500',
    gradientFrom: 'from-amber-500/90',
    gradientTo: 'to-orange-600/90',
    borderColor: 'border-amber-500/50',
    glowColor: 'shadow-amber-500/20',
    items: [
      { nombre: 'Colchón Piero Montreaux Pillow Top', detalle: '200x160 (Queen)', precioIndividual: 1199900 },
      { nombre: 'Protector Impermeable', detalle: '160x200 cm', precioIndividual: 42900 },
      { nombre: '2x Almohadas Micro Max Premium', detalle: '70x50 cm c/u', precioIndividual: 149800 },
      { nombre: 'Sábanas Bamboo 600 Hilos', detalle: '160x200 cm', precioIndividual: 124900 },
    ],
    precioTotal: 1517500,
    precioPack: 1349900,
    ahorroVsML: 1000000,
    perfilCliente: 'Profesionales exigentes, problemas de espalda, buscan lo mejor.',
    destacado: false
  },
]

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function PacksComerciales() {
  const [mostrarTodos, setMostrarTodos] = useState(false)
  
  // En mobile mostramos 2 primero, en desktop los 4
  const packsVisibles = mostrarTodos ? packsComerciales : packsComerciales.slice(0, 4)

  return (
    <section 
      id="packs" 
      className="relative bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 py-16 md:py-24 overflow-hidden"
      aria-labelledby="packs-heading"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[600px] h-[600px] bg-blue-600/8 rounded-full blur-[180px] -top-64 -left-32"></div>
        <div className="absolute w-[500px] h-[500px] bg-purple-600/8 rounded-full blur-[150px] top-1/2 -right-48"></div>
        <div className="absolute w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[120px] bottom-0 left-1/4"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <header className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-full text-green-400 text-sm font-bold mb-6">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm2.5 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm6.207.293a1 1 0 00-1.414 0l-6 6a1 1 0 101.414 1.414l6-6a1 1 0 000-1.414zM12.5 10a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" clipRule="evenodd" />
            </svg>
            Combos Exclusivos
          </div>
          
          <h2 
            id="packs-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 md:mb-6 leading-tight"
          >
            Packs con
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400"> Ahorro Extra</span>
          </h2>
          
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-6">
            Combos armados con <strong className="text-white">hasta 13% de descuento adicional</strong> vs comprar por separado
          </p>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm text-zinc-500">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Garantía Piero
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
              </svg>
              Envío a domicilio
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              Todas las tarjetas
            </span>
          </div>
        </header>

        {/* Grid de Packs */}
        <div 
          className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-12"
          role="list"
        >
          {packsVisibles.map((pack) => (
            <div key={pack.id} role="listitem">
              <PackCard pack={pack} />
            </div>
          ))}
        </div>

        {/* CTA Personalizado */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-2xl">
            <div className="text-center sm:text-left">
              <p className="text-white font-bold mb-1">
                ¿Necesitás un pack a medida?
              </p>
              <p className="text-sm text-zinc-400">
                Armamos combos personalizados según tu presupuesto
              </p>
            </div>
            <a
              href="https://wa.me/5493534017332?text=Hola!%20Quiero%20armar%20un%20pack%20personalizado%20de%20colchones%20Piero"
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex-shrink-0
                inline-flex items-center gap-2
                px-6 py-3
                bg-zinc-700 hover:bg-zinc-600
                text-white font-bold text-sm
                rounded-xl
                transition-all duration-300
                hover:scale-[1.02]
              "
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Armar mi pack
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}