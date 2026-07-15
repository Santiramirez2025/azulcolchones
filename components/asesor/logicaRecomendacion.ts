// ============================================================================
// LÓGICA DE RECOMENDACIÓN - ASESOR DE COLCHONES (DB-driven)
// Los PRECIOS vienen de la base (prop `precios`), NO se hardcodean.
// La disponibilidad por medida también la define la DB: si no hay precio para
// (modelo, medida), ese modelo queda excluido para esa medida. Así caen solas
// las reglas: Gravita/Montreaux no existen en 1 plaza ni 1½, etc.
// Cuotas: SIEMPRE 3 (única promo real).
// ============================================================================

export type Medida = 'plaza' | 'plaza-media' | 'dos-plazas' | 'queen' | 'king'
export type Postura = 'lado' | 'boca-arriba' | 'boca-abajo' | 'cambia'
export type Peso = 'menos-60' | '60-80' | '80-100' | 'mas-100'

export interface Respuestas {
  medida: Medida | null
  postura: Postura | null
  peso: Peso | null
}

export interface Recomendacion {
  modelo: string
  linea: 'Entrada' | 'Media' | 'Media Alta' | 'Alta Gama' | 'Premium' | 'Ultra Premium'
  medidaDisplay: string
  precio: number // pesos
  precioLista?: number // PVP sugerido (tachado), pesos
  cuotas: number // siempre 3 (con 18% de recargo)
  razonamiento: string
  caracteristicas: string[]
  slugDb: string // slug del producto en la DB → /producto/[slugDb]
}

export interface ResultadoRecomendacion {
  principal: Recomendacion
  alternativa: Recomendacion | null
}

/** Precio + label por (modelo asesor, medida), inyectado desde la DB. */
export type PreciosAsesor = Partial<
  Record<
    SlugModelo,
    Partial<Record<Medida, { precio: number; display: string; precioLista?: number }>>
  >
>

export const CUOTAS_SIN_INTERES = 3

// ============================================================================
// MAPEOS DB (usados por la página server para construir `precios`)
// ============================================================================

export const ASESOR_TO_DB_SLUG = {
  meditare: 'meditare-europillow',
  sonno: 'sonno-europillow',
  nirvana: 'nirvana-20',
  namaste: 'namaste',
  'namaste-pt': 'namaste-pillow-top',
  regno: 'regno',
  'regno-pt': 'regno-pillow-top',
  gravita: 'gravita',
  montreaux: 'montreaux',
  'montreaux-pt': 'montreaux-pillow-top',
} as const

export const MEDIDA_TO_MEASURE: Record<Medida, string> = {
  plaza: '190×80',
  'plaza-media': '190×130',
  'dos-plazas': '190×140',
  queen: '200×160',
  king: '200×200',
}

export const MEDIDA_LABEL: Record<Medida, string> = {
  plaza: '1 plaza',
  'plaza-media': '1½ plaza',
  'dos-plazas': '2 plazas',
  queen: 'Queen',
  king: 'King',
}

// ============================================================================
// METADATA DE MODELOS (sin precios — esos vienen de la DB)
// ============================================================================

interface ModeloMeta {
  nombre: string
  linea: Recomendacion['linea']
  firmeza: 1 | 2 | 3 | 4 | 5
  caracteristicas: readonly string[]
}

const CATALOGO = {
  meditare: {
    nombre: 'Meditare EuroPillow',
    linea: 'Entrada',
    firmeza: 1,
    caracteristicas: [
      'Diseño doble Euro Pillow para mayor confort superficial',
      'Espuma 25 kg/m³ · soporte hasta 90 kg',
      'Garantía oficial Piero 5 años',
    ],
  },
  sonno: {
    nombre: 'Sonno EuroPillow',
    linea: 'Entrada',
    firmeza: 2,
    caracteristicas: [
      'Resortes Ultra Coil continuos · 26 cm',
      'Modelo más vendido de la línea Entrada',
      'Soporte hasta 100 kg · Garantía oficial Piero 5 años',
    ],
  },
  nirvana: {
    nombre: 'Nirvana 2.0',
    linea: 'Media',
    firmeza: 3,
    caracteristicas: [
      'Espuma alta densidad 35 kg/m³ (sin resortes)',
      'Soporte hasta 120 kg · ideal para mayor peso',
      'Garantía oficial Piero 5 años',
    ],
  },
  namaste: {
    nombre: 'Namaste',
    linea: 'Media',
    firmeza: 3,
    caracteristicas: [
      'Espuma 30 kg/m³ · firme',
      'Buen soporte lumbar · ideal boca arriba',
      'Soporte hasta 100 kg · Garantía oficial Piero 5 años',
    ],
  },
  'namaste-pt': {
    nombre: 'Namaste Pillow Top',
    linea: 'Media',
    firmeza: 3,
    caracteristicas: [
      'Doble Pillow Top · 27 cm',
      'Soporte firme + confort acolchado arriba',
      'Recomendado para dormir de lado',
    ],
  },
  regno: {
    nombre: 'Regno',
    linea: 'Media Alta',
    firmeza: 4,
    caracteristicas: [
      'Resortes Ultra Coil · soporte superior',
      'Excelente para pesos medios-altos',
      'Garantía oficial Piero 5 años',
    ],
  },
  'regno-pt': {
    nombre: 'Regno Pillow Top',
    linea: 'Media Alta',
    firmeza: 4,
    caracteristicas: [
      'Ultra Coil + Pocket en el Pillow Top',
      'Firmeza adaptativa · soporte sin dureza',
      'Ideal para dormir de lado con peso alto',
    ],
  },
  gravita: {
    nombre: 'Gravita',
    linea: 'Alta Gama',
    firmeza: 5,
    caracteristicas: [
      'Pocket individual de acero · 29 cm',
      'Cero transferencia de movimiento · hasta 125 kg',
      'Disponible solo desde 2 plazas',
    ],
  },
  montreaux: {
    nombre: 'Montreaux',
    linea: 'Premium',
    firmeza: 5,
    caracteristicas: [
      'Pocket 30 cm · tela Jacquard importada',
      'Sensación hotel · soporte hasta 130 kg',
      'Disponible solo desde 2 plazas',
    ],
  },
  'montreaux-pt': {
    nombre: 'Montreaux Pillow Top',
    linea: 'Premium',
    firmeza: 4,
    caracteristicas: [
      'Pocket + Pillow Top · línea premium',
      'Máximo confort con soporte firme',
      'Disponible solo desde 2 plazas',
    ],
  },
} as const satisfies Record<string, ModeloMeta>

export type SlugModelo = keyof typeof CATALOGO

const TODOS_LOS_SLUGS = Object.keys(CATALOGO) as SlugModelo[]

// ============================================================================
// DISPONIBILIDAD (driven by DB prices)
// ============================================================================

function estaDisponible(slug: SlugModelo, medida: Medida, precios: PreciosAsesor): boolean {
  return Boolean(precios[slug]?.[medida])
}

// ============================================================================
// SCORING
// ============================================================================

function scoringModelo(
  slug: SlugModelo,
  medida: Medida,
  postura: Postura,
  peso: Peso,
  precios: PreciosAsesor,
): number {
  if (!estaDisponible(slug, medida, precios)) return -1

  const modelo = CATALOGO[slug]
  const esFirmeza = modelo.firmeza
  let score = 0

  // FACTOR 1: Peso → Firmeza
  if (peso === 'menos-60') {
    score += esFirmeza <= 3 ? 20 : esFirmeza === 4 ? 10 : 0
  } else if (peso === '60-80') {
    score += esFirmeza >= 2 && esFirmeza <= 4 ? 20 : 10
  } else if (peso === '80-100') {
    score += esFirmeza >= 3 ? 20 : 5
  } else if (peso === 'mas-100') {
    score += esFirmeza >= 4 ? 25 : esFirmeza === 3 ? 10 : -10
  }

  // FACTOR 2: Postura → Superficie
  const tienePillowTop = slug.includes('-pt')
  if (postura === 'lado') {
    score += tienePillowTop ? 15 : 5
  } else if (postura === 'boca-arriba') {
    score += tienePillowTop ? 8 : 15
  } else if (postura === 'boca-abajo') {
    score += tienePillowTop ? 0 : 15
    score += esFirmeza >= 3 ? 5 : -5
  } else if (postura === 'cambia') {
    score += esFirmeza >= 2 && esFirmeza <= 4 ? 12 : 5
    if (tienePillowTop) score += 3
  }

  // FACTOR 3: Medida → Línea
  if (medida === 'king' || medida === 'queen') {
    if (modelo.linea === 'Media' || modelo.linea === 'Media Alta') score += 8
    if (modelo.linea === 'Alta Gama' || modelo.linea === 'Premium') score += 5
    if (modelo.linea === 'Entrada') score -= 5
  } else if (medida === 'plaza') {
    if (modelo.linea === 'Entrada' || modelo.linea === 'Media') score += 10
    if (modelo.linea === 'Premium') score -= 10
  } else if (medida === 'plaza-media') {
    if (modelo.linea === 'Entrada' || modelo.linea === 'Media' || modelo.linea === 'Media Alta')
      score += 8
    if (modelo.linea === 'Premium') score -= 5
  } else if (medida === 'dos-plazas') {
    if (modelo.linea === 'Media' || modelo.linea === 'Media Alta' || modelo.linea === 'Alta Gama')
      score += 8
    if (modelo.linea === 'Entrada') score += 2
  }

  return score
}

// ============================================================================
// FUNCIÓN PRINCIPAL
// ============================================================================

export function calcularRecomendacion(
  respuestas: Respuestas,
  precios: PreciosAsesor,
): ResultadoRecomendacion {
  if (!respuestas.medida || !respuestas.postura || !respuestas.peso) {
    throw new Error('Respuestas incompletas')
  }

  const { medida, postura, peso } = respuestas

  const ranking = TODOS_LOS_SLUGS.map((slug) => ({
    slug,
    score: scoringModelo(slug, medida, postura, peso, precios),
  }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)

  if (ranking.length === 0) {
    // Fallback ultra defensivo: el primer modelo disponible en esa medida.
    const fallback = TODOS_LOS_SLUGS.find((s) => estaDisponible(s, medida, precios))
    if (!fallback) throw new Error('Sin modelos disponibles para esta medida')
    return { principal: construir(fallback, medida, postura, peso, precios, true), alternativa: null }
  }

  // ── REGLA: persona pesada (+100 kg) en 1 plaza → Nirvana 2.0 por encima del Sonno ──
  let principalSlug = ranking[0].slug
  if (peso === 'mas-100' && medida === 'plaza' && estaDisponible('nirvana', 'plaza', precios)) {
    principalSlug = 'nirvana'
  }

  const principal = construir(principalSlug, medida, postura, peso, precios, peso === 'mas-100' && medida === 'plaza')

  // Alternativa: siguiente del ranking de línea superior a la principal
  const lineasOrden = ['Entrada', 'Media', 'Media Alta', 'Alta Gama', 'Premium', 'Ultra Premium']
  const idxLineaPrincipal = lineasOrden.indexOf(principal.linea)
  const altSlug = ranking.find(
    (r) => r.slug !== principalSlug && lineasOrden.indexOf(CATALOGO[r.slug].linea) > idxLineaPrincipal,
  )?.slug

  const alternativa = altSlug ? construir(altSlug, medida, postura, peso, precios, false) : null

  return { principal, alternativa }
}

// ============================================================================
// CONSTRUCTOR
// ============================================================================

function construir(
  slug: SlugModelo,
  medida: Medida,
  postura: Postura,
  peso: Peso,
  precios: PreciosAsesor,
  esPesadoUnaPlaza: boolean,
): Recomendacion {
  const modelo = CATALOGO[slug]
  const data = precios[slug]?.[medida]
  if (!data) throw new Error(`Sin precio para ${slug} / ${medida}`)

  return {
    modelo: modelo.nombre,
    linea: modelo.linea,
    medidaDisplay: data.display,
    precio: data.precio,
    precioLista: data.precioLista,
    cuotas: CUOTAS_SIN_INTERES,
    razonamiento: generarRazonamiento(slug, postura, peso, esPesadoUnaPlaza),
    caracteristicas: [...modelo.caracteristicas],
    slugDb: ASESOR_TO_DB_SLUG[slug],
  }
}

// ============================================================================
// RAZONAMIENTO
// ============================================================================

function generarRazonamiento(
  slug: SlugModelo,
  postura: Postura,
  peso: Peso,
  esPesadoUnaPlaza: boolean,
): string {
  const modelo = CATALOGO[slug]
  const tienePT = slug.includes('-pt')

  if (esPesadoUnaPlaza && slug === 'nirvana') {
    return (
      'Para más de 100 kg en 1 plaza, el Nirvana 2.0 es la mejor opción: su espuma de alta ' +
      'densidad (35 kg/m³) distribuye mejor el peso y no tiene resortes que puedan vencerse. ' +
      'Garantía oficial Piero 5 años.'
    )
  }

  const posturaTexto = {
    lado: 'dormís de lado',
    'boca-arriba': 'dormís boca arriba',
    'boca-abajo': 'dormís boca abajo',
    cambia: 'cambiás de postura durante la noche',
  }[postura]

  const pesoTexto = {
    'menos-60': 'contextura liviana',
    '60-80': 'peso medio',
    '80-100': 'peso medio-alto',
    'mas-100': 'peso alto',
  }[peso]

  let razon = `Como ${posturaTexto} y tenés ${pesoTexto}, el ${modelo.nombre} es ideal. `
  if (tienePT) {
    razon += 'Su capa Pillow Top te da el acolchado que necesitás sin perder soporte. '
  }
  if (modelo.linea === 'Entrada') {
    razon += 'Una excelente opción para entrar a la marca Piero con garantía oficial.'
  } else if (modelo.linea === 'Media' || modelo.linea === 'Media Alta') {
    razon += 'Línea media con el mejor equilibrio entre confort y durabilidad.'
  } else if (modelo.linea === 'Alta Gama') {
    razon += 'Alta gama con tecnología superior para un descanso prolongado.'
  } else {
    razon += 'Línea Premium con los mejores materiales del catálogo Piero.'
  }
  return razon
}
