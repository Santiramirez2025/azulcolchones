// ============================================================================
// LÓGICA DE RECOMENDACIÓN - ASESOR DE COLCHONES
// Actualizada: Abril 2026 · Precios Azul Colchones · Piero
// Medidas: 1 plaza 80×190 · 1½ plaza 100×190 · 2 plazas 140×190 · 
//          Queen 160×200 · King 180×200 y 200×200
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
  precio: number
  cuotas: number
  razonamiento: string
  caracteristicas: string[]
  ancla: string
  slug: string
}

export interface ResultadoRecomendacion {
  principal: Recomendacion
  alternativa: Recomendacion | null
}

// ============================================================================
// CATÁLOGO DE PRECIOS - Abril 2026
// ============================================================================

const CATALOGO = {
  meditare: {
    nombre: 'Meditare EuroPillow',
    linea: 'Entrada' as const,
    cuotas: 2,
    ancla: '#meditare',
    medidas: {
      'plaza':       { precio: 325000, display: '80×190 · 1 plaza' },
      'plaza-media': { precio: 398000, display: '100×190 · 1½ plaza' },
      'dos-plazas':  { precio: 545000, display: '140×190 · 2 plazas' },
      'queen':       null,
      'king':        null,
    },
    caracteristicas: [
      'Diseño EuroPillow para mayor confort superficial',
      'Mejor relación precio-calidad del catálogo',
      'Garantía oficial Piero',
    ],
  },
  sonno: {
    nombre: 'Sonno EuroPillow',
    linea: 'Entrada' as const,
    cuotas: 2,
    ancla: '#sonno',
    medidas: {
      'plaza':       { precio: 430000, display: '80×190 · 1 plaza' },
      'plaza-media': { precio: 509000, display: '100×190 · 1½ plaza' },
      'dos-plazas':  { precio: 699000, display: '140×190 · 2 plazas' },
      'queen':       null,
      'king':        null,
    },
    caracteristicas: [
      'Modelo más vendido de la línea Entrada',
      'EuroPillow de densidad media-firme',
      'Excelente durabilidad en uso diario',
    ],
  },
  nirvana: {
    nombre: 'Nirvana',
    linea: 'Media' as const,
    cuotas: 3,
    ancla: '#nirvana',
    medidas: {
      'plaza':       { precio: 544000,  display: '80×190 · 1 plaza' },
      'plaza-media': { precio: 689000,  display: '100×190 · 1½ plaza' },
      'dos-plazas':  { precio: 922000,  display: '140×190 · 2 plazas' },
      'queen':       { precio: 1175000, display: '160×200 · Queen' },
      'king':        { precio: 1395000, display: '200×200 · King' },
    },
    caracteristicas: [
      'Confort superior con soporte equilibrado',
      'Ideal para uso diario prolongado',
      'Firmeza media · Apto la mayoría de pesos',
    ],
  },
  namaste: {
    nombre: 'Namaste',
    linea: 'Media' as const,
    cuotas: 3,
    ancla: '#namaste',
    medidas: {
      'plaza':       { precio: 422000,  display: '80×190 · 1 plaza' },
      'plaza-media': { precio: 519000,  display: '100×190 · 1½ plaza' },
      'dos-plazas':  { precio: 711000,  display: '140×190 · 2 plazas' },
      'queen':       { precio: 907000,  display: '160×200 · Queen' },
      'king':        { precio: 1088000, display: '200×200 · King' },
    },
    caracteristicas: [
      'Ergonomía diseñada para descanso profundo',
      'Firmeza media-firme · Buen soporte lumbar',
      'Ideal para quienes duermen boca arriba',
    ],
  },
  'namaste-pt': {
    nombre: 'Namaste Pillow Top',
    linea: 'Media' as const,
    cuotas: 3,
    ancla: '#namaste',
    medidas: {
      'plaza':       null,
      'plaza-media': { precio: 647000,  display: '100×190 · 1½ plaza' },
      'dos-plazas':  { precio: 933000,  display: '140×190 · 2 plazas' },
      'queen':       { precio: 1067000, display: '160×200 · Queen' },
      'king':        { precio: 1309000, display: '200×200 · King' },
    },
    caracteristicas: [
      'Capa Pillow Top superior para mayor suavidad',
      'Soporte firme + confort acolchado arriba',
      'Recomendado para dormir de lado',
    ],
  },
  regno: {
    nombre: 'Regno',
    linea: 'Media Alta' as const,
    cuotas: 3,
    ancla: '#regno',
    medidas: {
      'plaza':       { precio: 482000,  display: '80×190 · 1 plaza' },
      'plaza-media': { precio: 568000,  display: '100×190 · 1½ plaza' },
      'dos-plazas':  { precio: 743000,  display: '140×190 · 2 plazas' },
      'queen':       { precio: 877000,  display: '160×200 · Queen' },
      'king':        { precio: 1079000, display: '200×200 · King' },
    },
    caracteristicas: [
      'Tecnología avanzada de resortes',
      'Firmeza superior · Excelente para pesos medios-altos',
      'Independencia de movimiento',
    ],
  },
  'regno-pt': {
    nombre: 'Regno Pillow Top',
    linea: 'Media Alta' as const,
    cuotas: 3,
    ancla: '#regno',
    medidas: {
      'plaza':       null,
      'plaza-media': null,
      'dos-plazas':  { precio: 961000,  display: '140×190 · 2 plazas' },
      'queen':       { precio: 1102000, display: '160×200 · Queen' },
      'king':        { precio: 1341000, display: '200×200 · King' },
    },
    caracteristicas: [
      'Pillow Top premium con excelente acolchado',
      'Firmeza adaptativa · Soporte sin dureza',
      'Ideal para dormir de lado con peso alto',
    ],
  },
  gravita: {
    nombre: 'Gravita',
    linea: 'Alta Gama' as const,
    cuotas: 3,
    ancla: '#gravita',
    medidas: {
      'plaza':       null,
      'plaza-media': null,
      'dos-plazas':  { precio: 1259000, display: '140×190 · 2 plazas' },
      'queen':       { precio: 1549000, display: '160×200 · Queen' },
      'king':        { precio: 1763000, display: '200×200 · King' },
    },
    caracteristicas: [
      'Tecnología de punta · Máxima ergonomía',
      'Soporte zonificado para columna',
      'Alta durabilidad y confort prolongado',
    ],
  },
  montreaux: {
    nombre: 'Montreaux',
    linea: 'Premium' as const,
    cuotas: 6,
    ancla: '#montreaux',
    medidas: {
      'plaza':       null,
      'plaza-media': null,
      'dos-plazas':  { precio: 1394000, display: '140×190 · 2 plazas' },
      'queen':       { precio: 1749000, display: '160×200 · Queen' },
      'king':        { precio: 1982000, display: '200×200 · King' },
    },
    caracteristicas: [
      'Línea Premium · Lujo y confort superior',
      'Firmeza media-alta · Soporte prolongado',
      'Materiales de alta gama',
    ],
  },
  'montreaux-pt': {
    nombre: 'Montreaux Pillow Top',
    linea: 'Premium' as const,
    cuotas: 6,
    ancla: '#montreaux',
    medidas: {
      'plaza':       null,
      'plaza-media': null,
      'dos-plazas':  { precio: 1751000, display: '140×190 · 2 plazas' },
      'queen':       { precio: 2133000, display: '160×200 · Queen' },
      'king':        { precio: 2428000, display: '200×200 · King' },
    },
    caracteristicas: [
      'Pillow Top premium con máximo confort',
      'Soporte firme con superficie acolchada',
      'Ideal para el descanso más exigente',
    ],
  },
} as const

type SlugModelo = keyof typeof CATALOGO

// ============================================================================
// SISTEMA DE SCORING
// ============================================================================

function scoringModelo(
  slug: SlugModelo,
  medida: Medida,
  postura: Postura,
  peso: Peso
): number {
  const modelo = CATALOGO[slug]
  
  if (!modelo.medidas[medida]) return -1

  let score = 0

  // ---- FACTOR 1: Peso → Firmeza ----
  const esFirmeza = {
    meditare:       1,
    sonno:          2,
    nirvana:        3,
    namaste:        3,
    'namaste-pt':   3,
    regno:          4,
    'regno-pt':     4,
    gravita:        5,
    montreaux:      5,
    'montreaux-pt': 4,
  }[slug]

  if (peso === 'menos-60') {
    score += esFirmeza <= 3 ? 20 : esFirmeza === 4 ? 10 : 0
  } else if (peso === '60-80') {
    score += esFirmeza >= 2 && esFirmeza <= 4 ? 20 : 10
  } else if (peso === '80-100') {
    score += esFirmeza >= 3 ? 20 : 5
  } else if (peso === 'mas-100') {
    score += esFirmeza >= 4 ? 25 : esFirmeza === 3 ? 10 : -10
  }

  // ---- FACTOR 2: Postura → Superficie ----
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

  // ---- FACTOR 3: Medida → Línea ----
  if (medida === 'king' || medida === 'queen') {
    if (modelo.linea === 'Media' || modelo.linea === 'Media Alta') score += 8
    if (modelo.linea === 'Alta Gama' || modelo.linea === 'Premium') score += 5
    if (modelo.linea === 'Entrada') score -= 5
  } else if (medida === 'plaza') {
    if (modelo.linea === 'Entrada' || modelo.linea === 'Media') score += 10
    if (modelo.linea === 'Premium') score -= 10
  } else if (medida === 'plaza-media') {
    if (modelo.linea === 'Entrada' || modelo.linea === 'Media' || modelo.linea === 'Media Alta') score += 8
    if (modelo.linea === 'Premium') score -= 5
  } else if (medida === 'dos-plazas') {
    if (modelo.linea === 'Media' || modelo.linea === 'Media Alta' || modelo.linea === 'Alta Gama') score += 8
    if (modelo.linea === 'Entrada') score += 2
  }

  return score
}

// ============================================================================
// FUNCIÓN PRINCIPAL
// ============================================================================

export function calcularRecomendacion(respuestas: Respuestas): ResultadoRecomendacion {
  if (!respuestas.medida || !respuestas.postura || !respuestas.peso) {
    throw new Error('Respuestas incompletas')
  }

  const { medida, postura, peso } = respuestas

  const ranking = (Object.keys(CATALOGO) as SlugModelo[])
    .map(slug => ({ slug, score: scoringModelo(slug, medida, postura, peso) }))
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score)

  if (ranking.length === 0) {
    return {
      principal: construirRecomendacion('sonno', 'dos-plazas', postura, peso),
      alternativa: null,
    }
  }

  const principal = construirRecomendacion(ranking[0].slug, medida, postura, peso)

  const lineasOrden = ['Entrada', 'Media', 'Media Alta', 'Alta Gama', 'Premium', 'Ultra Premium']
  const idxLineaPrincipal = lineasOrden.indexOf(principal.linea)
  
  const alternativaSlug = ranking.slice(1).find(r => {
    const lineaAlt = CATALOGO[r.slug].linea
    return lineasOrden.indexOf(lineaAlt) > idxLineaPrincipal
  })

  const alternativa = alternativaSlug
    ? construirRecomendacion(alternativaSlug.slug, medida, postura, peso)
    : null

  return { principal, alternativa }
}

// ============================================================================
// CONSTRUCTOR DE RECOMENDACIÓN
// ============================================================================

function construirRecomendacion(
  slug: SlugModelo,
  medida: Medida,
  postura: Postura,
  peso: Peso
): Recomendacion {
  const modelo = CATALOGO[slug]
  const medidaData = modelo.medidas[medida]

  if (!medidaData) {
    const fallbackMedida = (['dos-plazas', 'queen', 'king', 'plaza-media', 'plaza'] as Medida[])
      .find(m => modelo.medidas[m]) as Medida
    return construirRecomendacion(slug, fallbackMedida, postura, peso)
  }

  return {
    modelo: modelo.nombre,
    linea: modelo.linea,
    medidaDisplay: medidaData.display,
    precio: medidaData.precio,
    cuotas: modelo.cuotas,
    razonamiento: generarRazonamiento(slug, postura, peso),
    caracteristicas: [...modelo.caracteristicas],
    ancla: modelo.ancla,
    slug,
  }
}

// ============================================================================
// RAZONAMIENTO
// ============================================================================

function generarRazonamiento(slug: SlugModelo, postura: Postura, peso: Peso): string {
  const modelo = CATALOGO[slug]
  const tienePT = slug.includes('-pt')

  const posturaTexto = {
    'lado': 'dormís de lado',
    'boca-arriba': 'dormís boca arriba',
    'boca-abajo': 'dormís boca abajo',
    'cambia': 'cambiás de postura durante la noche',
  }[postura]

  const pesoTexto = {
    'menos-60': 'contextura liviana',
    '60-80': 'peso medio',
    '80-100': 'peso medio-alto',
    'mas-100': 'peso alto',
  }[peso]

  let razon = `Como ${posturaTexto} y tenés ${pesoTexto}, el ${modelo.nombre} es ideal. `

  if (tienePT) {
    razon += 'Su capa Pillow Top te va a dar el acolchado que necesitás sin perder soporte. '
  }

  if (modelo.linea === 'Entrada') {
    razon += 'Una excelente opción para entrar a la marca Piero con calidad garantizada.'
  } else if (modelo.linea === 'Media' || modelo.linea === 'Media Alta') {
    razon += 'Línea media con el mejor equilibrio entre confort y durabilidad.'
  } else if (modelo.linea === 'Alta Gama') {
    razon += 'Alta gama con tecnología superior para un descanso prolongado.'
  } else {
    razon += 'Línea Premium con los mejores materiales del catálogo Piero.'
  }

  return razon
}