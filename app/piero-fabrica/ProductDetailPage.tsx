'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import Image from 'next/image'
import { trackWhatsAppClick, trackViewContent } from '@/lib/pixel'
import type { Producto } from '@/data/productos'
import { formatPrecio, extraerMedidaCorta } from './product-helpers'

// ============================================================================
// PRODUCT INFO POR MODELO — comercial + conversión
// ============================================================================

interface InfoModelo {
  subtitulo: string
  beneficio: string
  idealPara: string
  pitch: string
  highlights: string[]
}

const INFO_MODELOS: Record<string, InfoModelo> = {
  'Meditare EuroPillow': {
    subtitulo: 'Confort equilibrado, densidad alta',
    beneficio: 'Soporte estable con ventilación superior al promedio',
    idealPara: 'Primer colchón o renovación con excelente relación precio–calidad',
    pitch: 'Comodidad firme con ventilación y soporte superior al promedio.',
    highlights: ['Alta densidad', 'EuroPillow integrado', 'Ventilación optimizada'],
  },
  'Nirvana': {
    subtitulo: 'El favorito de Argentina',
    beneficio: 'Confort probado con el mejor precio del mercado',
    idealPara: 'Familias que buscan calidad garantizada al mejor precio',
    pitch: 'El colchón más vendido de PIERO. Confort comprobado por miles de familias argentinas.',
    highlights: ['Más vendido del país', 'Espuma alta densidad', 'Máximo ahorro vs ML'],
  },
  'Sonno EuroPillow': {
    subtitulo: 'Se adapta a tu cuerpo',
    beneficio: 'Sistema de confort adaptable, ni muy blando ni muy firme',
    idealPara: 'Parejas o quienes duermen en varias posiciones',
    pitch: 'Se adapta a tu cuerpo sin ser ni muy blando ni muy firme.',
    highlights: ['Adaptable a posiciones', 'EuroPillow premium', 'Ideal parejas'],
  },
  'Regno': {
    subtitulo: 'Soporte firme para tu espalda',
    beneficio: 'Estructura firme y estable que cuida tu postura',
    idealPara: 'Quienes sienten dolor lumbar o buscan mayor firmeza',
    pitch: 'Soporte firme con confort pensado para tu espalda.',
    highlights: ['Firmeza estructurada', 'Alivio lumbar', 'Durabilidad superior'],
  },
  'Regno Pillow Top': {
    subtitulo: 'Firmeza + confort acolchado',
    beneficio: 'La firmeza del Regno con una capa suave premium extra',
    idealPara: 'Quienes quieren firmeza sin sacrificar suavidad',
    pitch: 'Firmeza potente con capa suave premium extra.',
    highlights: ['Pillow Top premium', 'Doble confort', 'Soporte + suavidad'],
  },
  'Gravita': {
    subtitulo: 'Abrazo profundo, confort envolvente',
    beneficio: 'Sensación envolvente con diseño robusto',
    idealPara: 'Amantes del confort medio-alto',
    pitch: 'Equilibrio perfecto entre firmeza y abrazo profundo.',
    highlights: ['Confort envolvente', 'Diseño robusto', 'Sensación premium'],
  },
  'Namaste': {
    subtitulo: 'Descanso confiable todos los días',
    beneficio: 'Confort medio con excelente relación precio-beneficio',
    idealPara: 'Uso familiar diario sin gastar de más',
    pitch: 'Descanso confiable todos los días sin gastar de más.',
    highlights: ['Gran relación precio-calidad', 'Confort medio', 'Uso diario'],
  },
  'Namaste Pillow Top': {
    subtitulo: 'Más suavidad sin perder soporte',
    beneficio: 'Acolchado extra para comodidad profunda',
    idealPara: 'Personas que valoran sensación acogedora',
    pitch: 'Más suavidad sin perder soporte.',
    highlights: ['Pillow Top suave', 'Sensación acogedora', 'Soporte balanceado'],
  },
  'Montreaux': {
    subtitulo: 'Alta gama con resortes Pocket',
    beneficio: 'Sistema Pocket premium para soporte personalizado',
    idealPara: 'Quienes quieren confort de alta gama',
    pitch: 'Descanso de alta gama con soporte máximo personalizado.',
    highlights: ['Resortes Pocket', 'Aislación de movimiento', 'Confort premium'],
  },
  'Montreaux Pillow Top': {
    subtitulo: 'Sensación de hotel 5 estrellas',
    beneficio: 'Experiencia súper acolchada con sistema Pocket',
    idealPara: 'Parejas exigentes que buscan el máximo confort',
    pitch: 'Sensación de hotel 5 estrellas en tu dormitorio.',
    highlights: ['Pocket + Pillow Top', 'Máximo confort', 'Experiencia hotel 5★'],
  },
  'Dream Fit Pocket': {
    subtitulo: 'Tecnología Pocket avanzada',
    beneficio: 'Confort profundo con aislación total de movimiento',
    idealPara: 'Personas exigentes con postura y soporte',
    pitch: 'Descanso profundo, aislación de movimiento y soporte para toda la noche.',
    highlights: ['Pocket avanzado', 'Zero movimiento', 'Ergonómico'],
  },
  'Dream Fit Foam': {
    subtitulo: 'Confort continuo sin resortes',
    beneficio: 'Espuma de densidad superior, respuesta ergonómica uniforme',
    idealPara: 'Quienes prefieren superficie uniforme sin rebote',
    pitch: 'Confort continuo y respuesta ergonómica homogénea.',
    highlights: ['Sin resortes', 'Espuma premium', 'Respuesta uniforme'],
  },
}

function getInfoModelo(modelo: string): InfoModelo {
  return INFO_MODELOS[modelo] || {
    subtitulo: 'Calidad PIERO garantizada',
    beneficio: 'Confort y soporte con garantía oficial de fábrica',
    idealPara: 'Quienes buscan calidad comprobada',
    pitch: 'Calidad PIERO con garantía oficial, directo de fábrica.',
    highlights: ['Garantía oficial', 'Directo de fábrica', 'PIERO original'],
  }
}

// ============================================================================
// TESTIMONIOS
// ============================================================================

interface Testimonio {
  nombre: string
  ciudad: string
  modelo: string
  texto: string
  hace: string
}

const TESTIMONIOS: Testimonio[] = [
  {
    nombre: 'Marcela G.',
    ciudad: 'Villa María',
    modelo: 'Sonno EuroPillow 140',
    texto: 'Excelente calidad. Llegó en 8 días, bien embalado. Mucho mejor que lo que habíamos visto en MercadoLibre. Recomiendo.',
    hace: 'Hace 3 semanas',
  },
  {
    nombre: 'Carlos R.',
    ciudad: 'Córdoba Capital',
    modelo: 'Montreaux Pillow Top 160',
    texto: 'No podía creer el precio. Es exactamente el mismo colchón que vi en un local a casi el doble. La atención por WhatsApp fue rapidísima.',
    hace: 'Hace 1 mes',
  },
  {
    nombre: 'Laura P.',
    ciudad: 'Río Cuarto',
    modelo: 'Nirvana 200x200',
    texto: 'Compramos el King para toda la familia. Llegó perfecto, con garantía oficial. Ya recomendé a dos amigas.',
    hace: 'Hace 2 meses',
  },
]

// ============================================================================
// CONFIG
// ============================================================================

const BADGE_CONFIG = {
  ancla: { label: 'Mejor Precio', bg: 'bg-rose-500/20', text: 'text-rose-400', border: 'border-rose-500/30' },
  equilibrio: { label: 'Más Vendido', bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30' },
  premium: { label: 'Premium', bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30' },
  accesorio: { label: 'Complemento', bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/30' },
}

// ============================================================================
// ICONS
// ============================================================================

function WhatsAppIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

/** Hero Image con galería de variantes */
function ProductImage({
  imagen,
  nombre,
  modelo,
  allImages,
}: {
  imagen?: string
  nombre: string
  modelo: string
  allImages: string[]
}) {
  const [activeImg, setActiveImg] = useState(0)

  // Deduplicar imágenes (muchas variantes comparten la misma)
  const uniqueImages = useMemo(() => {
    const unique = [...new Set(allImages.filter(Boolean))]
    return unique.length > 0 ? unique : []
  }, [allImages])

  const currentSrc = uniqueImages[activeImg] || imagen

  return (
    <div className="mb-8">
      {/* Imagen principal */}
      <div className="relative aspect-[4/3] sm:aspect-[16/10] bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 rounded-2xl overflow-hidden border border-zinc-700/40">
        {currentSrc ? (
          <Image
            src={currentSrc}
            alt={`Colchón Piero ${modelo} - Vista del producto`}
            fill
            sizes="(max-width: 768px) 100vw, 720px"
            className="object-cover"
            priority
            quality={90}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-8xl mb-4 opacity-20">🛏️</div>
              <p className="text-zinc-500 text-sm font-semibold">Piero {modelo}</p>
              <p className="text-zinc-600 text-xs mt-1">Imagen de referencia</p>
            </div>
          </div>
        )}

        {/* Overlay gradient sutil */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/30 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Thumbnails — solo si hay más de 1 imagen única */}
      {uniqueImages.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
          {uniqueImages.map((src, idx) => (
            <button
              key={src}
              onClick={() => setActiveImg(idx)}
              className={`
                relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all duration-200
                ${activeImg === idx
                  ? 'border-blue-500 ring-1 ring-blue-500/30'
                  : 'border-zinc-700/50 hover:border-zinc-600 opacity-70 hover:opacity-100'
                }
              `}
            >
              <Image
                src={src}
                alt={`${modelo} vista ${idx + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/** Info comercial del modelo */
function ProductInfo({ info, modelo }: { info: InfoModelo; modelo: string }) {
  return (
    <div className="mb-8 p-5 bg-zinc-800/40 border border-zinc-700/40 rounded-2xl">
      <p className="text-sm text-zinc-300 leading-relaxed mb-4">
        {info.pitch}
      </p>

      {/* Highlights */}
      <div className="flex flex-wrap gap-2 mb-4">
        {info.highlights.map((h) => (
          <span
            key={h}
            className="px-3 py-1.5 bg-zinc-700/40 border border-zinc-600/30 rounded-lg text-xs font-semibold text-zinc-300"
          >
            {h}
          </span>
        ))}
      </div>

      {/* Ideal para */}
      <div className="flex items-start gap-2.5 pt-3 border-t border-zinc-700/40">
        <span className="text-sm">👤</span>
        <p className="text-xs text-zinc-400 leading-relaxed">
          <span className="font-bold text-zinc-300">Ideal para:</span> {info.idealPara}
        </p>
      </div>
    </div>
  )
}

function Breadcrumb({ modelo }: { modelo: string }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-1.5 text-xs text-zinc-500">
        <li><a href="/" className="hover:text-zinc-300 transition-colors">Inicio</a></li>
        <li aria-hidden="true"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></li>
        <li><a href="/piero-fabrica" className="hover:text-zinc-300 transition-colors">Catálogo PIERO</a></li>
        <li aria-hidden="true"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></li>
        <li><span className="text-zinc-400 font-medium">{modelo}</span></li>
      </ol>
    </nav>
  )
}

function TrustStrip() {
  const items = [
    { icon: '🏭', text: 'Directo de fábrica' },
    { icon: '🛡️', text: 'Garantía oficial' },
    { icon: '🚚', text: '7-10 días hábiles' },
    { icon: '💳', text: 'Todas las tarjetas' },
  ]
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {items.map((item) => (
        <div key={item.text} className="flex items-center gap-2.5 p-3 bg-zinc-800/60 rounded-xl border border-zinc-700/40">
          <span className="text-lg flex-shrink-0">{item.icon}</span>
          <span className="text-xs font-semibold text-zinc-300 leading-tight">{item.text}</span>
        </div>
      ))}
    </div>
  )
}

function BloquePrecios({ precio, precioML, ahorro, ahorroPorcentaje }: { precio: number; precioML?: number; ahorro: number; ahorroPorcentaje: number }) {
  return (
    <div className="space-y-3">
      {precioML && precioML > precio && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-zinc-500">En MercadoLibre:</span>
          <span className="text-lg text-zinc-500 line-through tabular-nums">${formatPrecio(precioML)}</span>
        </div>
      )}
      <div className="flex items-baseline gap-3">
        <span className="text-4xl sm:text-5xl font-black text-white tabular-nums tracking-tight">${formatPrecio(precio)}</span>
      </div>
      {ahorro > 0 && (
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/15 border border-emerald-500/30 rounded-lg text-sm font-bold text-emerald-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
            Ahorrás ${formatPrecio(ahorro)} ({ahorroPorcentaje}%)
          </span>
        </div>
      )}
      <p className="text-sm text-zinc-400">Consultá cuotas actualizadas por WhatsApp · Todas las tarjetas</p>
    </div>
  )
}

function TrustMicrocopys() {
  const items = ['Mismo producto que en MercadoLibre', 'Garantía oficial PIERO', 'Entrega 7-10 días hábiles', 'Directo de fábrica, sin intermediarios']
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-sm text-zinc-400">
          <svg className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function GarantiaPiero() {
  return (
    <div className="bg-zinc-800/40 border border-zinc-700/50 rounded-2xl p-6 sm:p-8">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 bg-blue-500/15 border border-blue-500/30 rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-white mb-2">Garantía Oficial PIERO</h3>
          <p className="text-sm text-zinc-400 mb-4 leading-relaxed">Tu colchón tiene la misma garantía que si lo comprás en cualquier local oficial PIERO del país. Somos distribuidores oficiales desde 1991.</p>
          <div className="space-y-2">
            {['Defectos de fabricación', 'Deformación del núcleo', 'Hundimiento anormal'].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-zinc-300">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-zinc-700/50">
            <p className="text-xs text-zinc-500">Azul Colchones · Distribuidor Oficial PIERO · Villa María, Córdoba · Desde 1991</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProcesoCompra() {
  const pasos = [
    { numero: '1', titulo: 'Consultá', desc: 'Escribinos por WhatsApp con el modelo que te interesa. Te asesoramos sin compromiso.' },
    { numero: '2', titulo: 'Confirmá', desc: 'Elegí forma de pago (transferencia, tarjeta, efectivo). Coordinamos la entrega.' },
    { numero: '3', titulo: 'Recibí', desc: 'Tu colchón PIERO llega a domicilio en 7-10 días hábiles, directo de fábrica.' },
  ]
  return (
    <div>
      <h3 className="text-lg font-bold text-white mb-6">¿Cómo comprar?</h3>
      <div className="grid gap-4 sm:grid-cols-3">
        {pasos.map((paso) => (
          <div key={paso.numero} className="relative p-5 bg-zinc-800/40 border border-zinc-700/40 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-500/20 border border-blue-500/30 rounded-lg flex items-center justify-center text-sm font-black text-blue-400">{paso.numero}</span>
              <h4 className="font-bold text-white">{paso.titulo}</h4>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">{paso.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function SeccionTestimonios() {
  return (
    <div>
      <h3 className="text-lg font-bold text-white mb-6">Opiniones de clientes</h3>
      <div className="grid gap-4 sm:grid-cols-3">
        {TESTIMONIOS.map((t) => (
          <div key={t.nombre} className="p-5 bg-zinc-800/40 border border-zinc-700/40 rounded-xl">
            <div className="flex gap-0.5 mb-3">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              ))}
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed mb-4">&ldquo;{t.texto}&rdquo;</p>
            <div className="pt-3 border-t border-zinc-700/40">
              <p className="text-sm font-semibold text-zinc-300">{t.nombre}</p>
              <p className="text-xs text-zinc-500">{t.ciudad} · {t.modelo} · {t.hace}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function FAQProducto() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const faqs = [
    { q: '¿Es exactamente el mismo colchón que venden en MercadoLibre?', a: 'Sí, es el mismo producto PIERO con la misma garantía oficial de fábrica. La diferencia de precio es porque no pagás comisiones de marketplace ni intermediarios.' },
    { q: '¿Cuánto tarda en llegar?', a: 'El colchón sale directo de fábrica PIERO y llega a tu domicilio en 7 a 10 días hábiles. Te avisamos el día exacto de entrega.' },
    { q: '¿Qué formas de pago aceptan?', a: 'Transferencia bancaria, efectivo, y todas las tarjetas de crédito y débito. Consultanos por cuotas vigentes, las actualizamos cada semana.' },
    { q: '¿Hacen envíos fuera de Villa María?', a: 'Sí, hacemos envíos a toda la provincia de Córdoba y zonas cercanas. Consultanos por tu localidad y te pasamos el costo de envío.' },
    { q: '¿Puedo probarlo antes de comprarlo?', a: 'Podés venir a nuestro local en Balerdi 855, Villa María, para probar los modelos disponibles en exhibición. De lunes a viernes de 9 a 19hs, sábados de 9 a 13hs.' },
  ]
  return (
    <div>
      <h3 className="text-lg font-bold text-white mb-6">Preguntas frecuentes</h3>
      <div className="space-y-2">
        {faqs.map((faq, idx) => (
          <div key={idx} className="border border-zinc-700/40 rounded-xl overflow-hidden">
            <button onClick={() => setOpenIndex(openIndex === idx ? null : idx)} className="w-full flex items-center justify-between p-4 text-left hover:bg-zinc-800/50 transition-colors">
              <span className="text-sm font-semibold text-zinc-200 pr-4">{faq.q}</span>
              <svg className={`w-4 h-4 text-zinc-500 flex-shrink-0 transition-transform duration-200 ${openIndex === idx ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {openIndex === idx && (<div className="px-4 pb-4"><p className="text-sm text-zinc-400 leading-relaxed">{faq.a}</p></div>)}
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================================================
// MAIN: ProductDetailPage
// ============================================================================

interface ProductDetailPageProps {
  modelo: string
  variantes: Producto[]
  varianteInicial?: string
}

export default function ProductDetailPage({ modelo, variantes, varianteInicial }: ProductDetailPageProps) {
  const [selectedId, setSelectedId] = useState<string>(varianteInicial || variantes[0]?.id || '')
  const hasTrackedView = useRef(false)

  const selected = useMemo(() => variantes.find((v) => v.id === selectedId) || variantes[0], [variantes, selectedId])

  const badgeConfig = BADGE_CONFIG[selected.categoria]
  const info = getInfoModelo(modelo)

  // Todas las imágenes de las variantes
  const allImages = useMemo(() => variantes.map((v) => v.imagen).filter(Boolean) as string[], [variantes])

  const ahorro = selected.precioMercadoLibre ? selected.precioMercadoLibre - selected.precioPublico : 0
  const ahorroPorcentaje = selected.precioMercadoLibre ? Math.round((ahorro / selected.precioMercadoLibre) * 100) : 0

  const mensajeWA = `Hola! Vi el *Piero ${modelo} ${selected.tamaño}* a $${formatPrecio(selected.precioPublico)} en la web. ¿Tienen disponibilidad?`
  const urlWA = `https://wa.me/5493534017332?text=${encodeURIComponent(mensajeWA)}`

  useEffect(() => {
    if (!hasTrackedView.current && selected) {
      hasTrackedView.current = true
      trackViewContent({ producto: `Piero ${modelo}`, tamaño: selected.tamaño, precio: selected.precioPublico, categoria: selected.categoria })
    }
  }, [selected, modelo])

  const handleWhatsAppClick = () => {
    trackWhatsAppClick({ producto: `Piero ${modelo}`, tamaño: selected.tamaño, precio: selected.precioPublico, categoria: selected.categoria })
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-zinc-950 antialiased isolate touch-pan-y">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10 pb-28 sm:pb-10">

        {/* 1. Breadcrumb */}
        <Breadcrumb modelo={modelo} />

        {/* 2. IMAGEN DEL PRODUCTO */}
        <ProductImage
          imagen={selected.imagen}
          nombre={selected.nombre}
          modelo={modelo}
          allImages={allImages}
        />

        {/* 3. Badge + Nombre + Subtítulo */}
        <div className="mb-4">
          <div className={`inline-flex items-center px-3 py-1 ${badgeConfig.bg} ${badgeConfig.border} border rounded-full text-xs font-bold ${badgeConfig.text} mb-3`}>
            {badgeConfig.label}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight tracking-tight mb-1">
            Colchón Piero {modelo}
          </h1>
          <p className="text-base text-zinc-400 font-medium">
            {info.subtitulo}
          </p>
          <p className="text-xs text-zinc-500 mt-1">
            Distribuidor oficial PIERO · Directo de fábrica
          </p>
        </div>

        {/* 4. Info comercial del modelo */}
        <ProductInfo info={info} modelo={modelo} />

        {/* 5. Selector de medida */}
        {variantes.length > 1 && (
          <div className="mb-8">
            <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Elegí tu medida</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {variantes.map((v) => {
                const isSelected = v.id === selectedId
                const medida = extraerMedidaCorta(v.tamaño)
                return (
                  <button
                    key={v.id}
                    onClick={() => setSelectedId(v.id)}
                    className={`relative p-3 rounded-xl border-2 text-left transition-all duration-200 ${isSelected ? 'border-blue-500 bg-blue-500/10 ring-1 ring-blue-500/30' : 'border-zinc-700/60 bg-zinc-800/40 hover:border-zinc-600 hover:bg-zinc-800/60'}`}
                  >
                    <span className={`block text-sm font-bold ${isSelected ? 'text-white' : 'text-zinc-300'}`}>{medida}</span>
                    <span className={`block text-xs mt-0.5 tabular-nums ${isSelected ? 'text-blue-400' : 'text-zinc-500'}`}>${formatPrecio(v.precioPublico)}</span>
                    {v.precioMercadoLibre && v.precioMercadoLibre > v.precioPublico && (
                      <span className="absolute top-2 right-2">
                        <span className="px-1.5 py-0.5 bg-emerald-500/20 rounded text-[10px] font-bold text-emerald-400">
                          -{Math.round(((v.precioMercadoLibre - v.precioPublico) / v.precioMercadoLibre) * 100)}%
                        </span>
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* 6. Precio */}
        <div className="mb-6">
          <BloquePrecios precio={selected.precioPublico} precioML={selected.precioMercadoLibre} ahorro={ahorro} ahorroPorcentaje={ahorroPorcentaje} />
        </div>

        {/* 7. Trust microcopys */}
        <div className="mb-8"><TrustMicrocopys /></div>

        {/* 8. CTA WhatsApp (desktop) */}
        <div className="hidden sm:block mb-10">
          <a href={urlWA} target="_blank" rel="noopener noreferrer" onClick={handleWhatsAppClick}
            className="w-full min-h-[56px] px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 active:from-green-700 active:to-emerald-700 text-white text-center font-bold text-base rounded-xl flex items-center justify-center gap-3 transition-all duration-300 shadow-xl shadow-green-500/25 hover:shadow-green-500/40 hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-green-500/30">
            <WhatsAppIcon /><span>Consultar por WhatsApp</span>
          </a>
          <p className="text-center text-xs text-zinc-500 mt-2">Respondemos en menos de 2 horas · Sin compromiso</p>
        </div>

        {/* 9. Trust strip */}
        <div className="mb-10"><TrustStrip /></div>

        <div className="h-px bg-gradient-to-r from-transparent via-zinc-700/60 to-transparent mb-10" />

        {/* 10-13. Secciones de confianza */}
        <div className="mb-10"><GarantiaPiero /></div>
        <div className="mb-10"><ProcesoCompra /></div>
        <div className="mb-10"><SeccionTestimonios /></div>
        <div className="mb-10"><FAQProducto /></div>

        {/* 14. CTA final */}
        <div className="bg-zinc-800/40 border border-zinc-700/50 rounded-2xl p-6 sm:p-8 text-center">
          <h3 className="text-xl font-black text-white mb-2">¿Tenés dudas sobre este colchón?</h3>
          <p className="text-sm text-zinc-400 mb-6">Con más de 35 años vendiendo colchones, te asesoramos para que elijas bien.</p>
          <a href={urlWA} target="_blank" rel="noopener noreferrer" onClick={handleWhatsAppClick}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold text-base rounded-xl transition-all duration-300 shadow-xl shadow-green-500/25 hover:shadow-green-500/40 hover:scale-[1.02] active:scale-[0.98]">
            <WhatsAppIcon /><span>Hablar con un asesor</span>
          </a>
        </div>
      </div>

      {/* STICKY CTA MOBILE */}
      <div className="fixed bottom-0 inset-x-0 z-50 sm:hidden">
        <div className="bg-zinc-950/95 backdrop-blur-md border-t border-zinc-800 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
          <a href={urlWA} target="_blank" rel="noopener noreferrer" onClick={handleWhatsAppClick}
            className="w-full min-h-[52px] px-6 py-3.5 bg-gradient-to-r from-green-600 to-emerald-600 active:from-green-700 active:to-emerald-700 text-white text-center font-bold text-base rounded-xl flex items-center justify-center gap-3 shadow-xl shadow-green-500/25 active:scale-[0.98] transition-transform">
            <WhatsAppIcon /><span>Consultar · ${formatPrecio(selected.precioPublico)}</span>
          </a>
        </div>
      </div>
    </div>
  )
}