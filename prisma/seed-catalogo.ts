/**
 * ============================================================================
 * SEED CATÁLOGO AZUL COLCHONES — Lista Exclusivos Piero · Vigencia JUNIO 2026
 * ============================================================================
 * Precios en ARS (columna VENTA) → se guardan en CENTAVOS (×100).
 * Idempotente: upsert por slug. Desactiva productos que no estén en esta lista.
 *
 *   npm run db:seed:catalogo
 * ============================================================================
 */
import { PrismaClient, Prisma } from '@prisma/client'
import fs from 'node:fs'
import path from 'node:path'

const prisma = new PrismaClient()

const ARS = (pesos: number) => Math.round(pesos * 100) // → centavos

// PVP sugerido Piero = precio directo de fábrica + 30% (tachado honesto).
const PVP_MARKUP = 1.3
const pvp = (priceCents: number) => Math.round(priceCents * PVP_MARKUP)

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\./g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

/** "190×140" → {length:190, width:140}. */
function parseMeasure(measure: string): { length: number; width: number } {
  const m = measure.replace(/\s/g, '').split('×')
  const length = Number.parseInt(m[0] ?? '', 10)
  const width = Number.parseInt(m[1] ?? '', 10)
  return { length: Number.isFinite(length) ? length : 0, width: Number.isFinite(width) ? width : 0 }
}

/** Plaza derivada de la medida (según lista Piero). */
function plazaFor(measure: string): string {
  const { length, width } = parseMeasure(measure)
  if (width === 130) return '1½'
  if (width === 140 || width === 160) return length >= 200 ? (width === 160 ? 'Queen' : '2pl') : '2pl'
  if (width === 180) return 'Queen XL'
  if (width === 200) return 'King'
  if (length >= 200 && width === 160) return 'Queen'
  return '1pl' // 80 / 90 / 100
}
// Nota: 200×160 → Queen, 190×140/160 → 2pl, manejado abajo con overrides explícitos.
function plaza(measure: string): string {
  const map: Record<string, string> = {
    '190×80': '1pl',
    '190×90': '1pl',
    '190×100': '1pl',
    '190×130': '1½',
    '190×140': '2pl',
    '190×160': '2pl',
    '200×80': '1pl',
    '200×90': '1pl',
    '200×100': '1pl',
    '200×160': 'Queen',
    '200×180': 'Queen XL',
    '200×200': 'King',
  }
  return map[measure] ?? plazaFor(measure)
}

// ── Imágenes en /public/images por prefijo (los nuevos se suben desde el panel) ──
const IMG_PREFIX: Record<string, string> = {
  'meditare-europillow': 'meditare-ep',
  'sonno-europillow': 'sonno-ep',
  'nirvana-20': 'nirvana',
  namaste: 'namaste',
  regno: 'regno',
  'regno-con-pillow': 'regno-pillow',
  montreaux: 'montreaux',
  'montreaux-pillow-top': 'montreaux-pillow',
  'dream-fit-pocket': 'dreamfit-pocket',
  'dream-fit-foam': 'dreamfit-foam',
  'dream-fit-i-pocket': 'dreamfit-pocket',
  'dream-fit-ii-foam': 'dreamfit-foam',
  'sommier-grey': 'sommier-grey',
  'sommier-sognare': 'sommier-sognare',
  'sommier-exclusivo': 'sommier-exclusivo',
  'sommier-dream-fit': 'sommier-dreamfit',
  'procol-4-elasticos': 'protector',
  'cubre-lateral': 'protector-lateral',
  'almohada-visco-dream-fit-clasica': 'almohada-visco-clasica',
  'almohada-visco-dream-fit-cervical': 'almohada-visco-cervical',
  'almohada-visco-dream-tech': 'almohada-visco-tech',
  'almohada-micro-max-tech-rollo': 'almohada-micro-rollo',
  'almohada-micro-max-tech-nucleo': 'almohada-micro-nucleo',
  'almohada-fibra-smart-tech-plus': 'almohada-fibra-plus',
  'almohada-fibra-smart-tech-confort': 'almohada-fibra-confort',
}

const IMAGES_DIR = path.join(process.cwd(), 'public', 'images')
let _imgCache: string[] | null = null
function listImages(): string[] {
  if (_imgCache) return _imgCache
  try {
    _imgCache = fs.readdirSync(IMAGES_DIR)
  } catch {
    _imgCache = []
  }
  return _imgCache
}
function imagesForSlug(slug: string): string[] {
  const prefix = IMG_PREFIX[slug]
  if (!prefix) return []
  const re = new RegExp(`^${prefix}(-[a-z0-9]+)?\\.jpg$`, 'i')
  return listImages()
    .filter((f) => re.test(f))
    .sort()
    .map((f) => `/images/${f}`)
}

// [ medida, precioVENTA ]
type Row = [string, number]

interface ProductSeed {
  name: string
  slug?: string
  category: 'colchones' | 'sommiers' | 'protectores' | 'almohadas' | 'combos'
  subtitle: string
  description: string
  line?: 'entrada' | 'media' | 'premium' | 'ultra'
  springType?: 'espuma' | 'resorte-continuo' | 'pocket'
  densityKgM3?: number
  supportKg?: number
  height: number
  pillowTop?: boolean
  bajoPedido?: boolean
  warranty?: number
  isBestSeller?: boolean
  isFeatured?: boolean
  badge?: string
  highlights?: string[]
  rows: Row[]
}

// ============================================================================
// CATEGORÍAS
// ============================================================================
const CATEGORIES = [
  { name: 'Combos', slug: 'combos', emoji: '🎁', order: 0 },
  { name: 'Colchones', slug: 'colchones', emoji: '🛏️', order: 1 },
  { name: 'Sommiers', slug: 'sommiers', emoji: '📦', order: 2 },
  { name: 'Protectores', slug: 'protectores', emoji: '🛡️', order: 3 },
  { name: 'Almohadas', slug: 'almohadas', emoji: '💤', order: 4 },
]

// ============================================================================
// COLCHONES
// ============================================================================
const COLCHONES: ProductSeed[] = [
  {
    name: 'Smart Tech Espuma',
    category: 'colchones',
    subtitle: 'Espuma 25 kg/m³ · Soporte hasta 85 kg',
    description: 'Colchón de espuma Smart Tech, densidad 25 kg/m³. Soporte recomendado hasta 85 kg. Línea de entrada Piero.',
    line: 'entrada',
    springType: 'espuma',
    densityKgM3: 25,
    supportKg: 85,
    height: 21,
    highlights: ['Espuma 25 kg/m³', 'Hasta 85 kg'],
    rows: [
      ['190×80', 235799],
      ['190×90', 262108],
      ['190×100', 288622],
      ['190×140', 395451],
    ],
  },
  {
    name: 'Smart Tech Resortes',
    category: 'colchones',
    subtitle: 'Resortes Ultra Coil · 26 cm',
    description: 'Colchón de resortes Ultra Coil continuos Smart Tech, 26 cm. Línea de entrada Piero.',
    line: 'entrada',
    springType: 'resorte-continuo',
    height: 26,
    highlights: ['Resortes Ultra Coil', '26 cm'],
    rows: [
      ['190×80', 308697],
      ['190×90', 320792],
      ['190×100', 347885],
      ['190×140', 468012],
      ['200×160', 521581],
    ],
  },
  {
    name: 'Max Tech Espuma',
    category: 'colchones',
    subtitle: 'Espuma 30 kg/m³ · 27 cm',
    description: 'Colchón de espuma Max Tech, densidad 30 kg/m³, 27 cm. Línea media Piero.',
    line: 'media',
    springType: 'espuma',
    densityKgM3: 30,
    height: 27,
    highlights: ['Espuma 30 kg/m³', '27 cm'],
    rows: [
      ['190×140', 546491],
      ['200×160', 620380],
      ['200×200', 743403],
    ],
  },
  {
    name: 'Max Tech Resortes',
    category: 'colchones',
    subtitle: 'Resortes Pocket · 30 cm',
    description: 'Colchón de resortes Pocket Max Tech, 30 cm. Línea media Piero.',
    line: 'media',
    springType: 'pocket',
    height: 30,
    highlights: ['Resortes Pocket', '30 cm'],
    rows: [
      ['190×140', 860535],
      ['200×160', 1077304],
      ['200×200', 1242019],
    ],
  },
  {
    name: 'Meditare EuroPillow',
    category: 'colchones',
    subtitle: 'Espuma · Euro Pillow',
    description: 'Colchón de espuma con Euro Pillow, 23 cm. Línea de entrada Piero.',
    line: 'entrada',
    springType: 'espuma',
    height: 23,
    pillowTop: true,
    highlights: ['Euro Pillow', '23 cm'],
    rows: [
      ['190×80', 262000],
      ['190×90', 291231],
      ['190×100', 320691],
      ['190×130', 408341],
      ['190×140', 439390],
    ],
  },
  {
    name: 'Nirvana 2.0',
    category: 'colchones',
    subtitle: 'Espuma alta densidad · Soporte hasta 120 kg',
    description: 'Colchón de espuma de alta densidad Nirvana 2.0. La mejor opción para persona de mayor peso en 1 plaza: la espuma compacta distribuye mejor el peso.',
    line: 'media',
    springType: 'espuma',
    densityKgM3: 35,
    supportKg: 120,
    height: 25,
    highlights: ['Alta densidad', 'Hasta 120 kg', 'Sin resortes'],
    rows: [
      ['190×80', 449898],
      ['190×90', 501402],
      ['190×100', 569711],
      ['190×140', 762035],
      ['200×160', 971256],
      ['200×180', 1068382],
      ['200×200', 1153868],
    ],
  },
  {
    name: 'Regno',
    category: 'colchones',
    subtitle: 'Resortes · Soporte superior',
    description: 'Colchón de resortes Regno con soporte superior, 27 cm.',
    line: 'media',
    springType: 'resorte-continuo',
    height: 27,
    highlights: ['Resortes', 'Soporte superior'],
    rows: [
      ['190×80', 379547],
      ['190×140', 584934],
    ],
  },
  {
    name: 'Regno con Pillow',
    category: 'colchones',
    subtitle: 'Resortes + Pillow · 29 cm',
    description: 'Colchón Regno con Pillow Top, resortes, 29 cm.',
    line: 'media',
    springType: 'resorte-continuo',
    height: 29,
    pillowTop: true,
    highlights: ['Resortes + Pillow', '29 cm'],
    rows: [
      ['190×140', 734686],
      ['200×160', 842819],
      ['200×180', 934575],
      ['200×200', 1025470],
    ],
  },
  {
    name: 'Sonno EuroPillow',
    category: 'colchones',
    subtitle: 'Resortes Ultra Coil · Euro Pillow',
    description: 'Colchón de resortes Ultra Coil con Euro Pillow, 26 cm. El más vendido.',
    line: 'entrada',
    springType: 'resorte-continuo',
    height: 26,
    pillowTop: true,
    isBestSeller: true,
    isFeatured: true,
    badge: 'Más vendido',
    highlights: ['Resortes Ultra Coil', 'Euro Pillow', 'Más vendido'],
    rows: [
      ['190×90', 400368],
      ['190×100', 434182],
      ['190×130', 549626],
      ['190×140', 596669],
      ['190×160', 650965],
    ],
  },
  {
    name: 'Namaste',
    category: 'colchones',
    subtitle: 'Espuma · Firme',
    description: 'Colchón de espuma Namaste, firme, 24 cm.',
    line: 'entrada',
    springType: 'espuma',
    height: 24,
    highlights: ['Espuma', 'Firme'],
    rows: [['200×160', 714312]],
  },
  {
    name: 'Dream Tech Espuma EP',
    category: 'colchones',
    subtitle: 'Espuma 30 kg/m³ · Euro Pillow · 32 cm',
    description: 'Colchón Dream Tech de espuma 30 kg/m³ con Euro Pillow, 32 cm. Línea premium.',
    line: 'premium',
    springType: 'espuma',
    densityKgM3: 30,
    height: 32,
    pillowTop: true,
    highlights: ['Espuma 30 kg/m³', 'Euro Pillow', '32 cm'],
    rows: [
      ['190×80', 705426],
      ['190×140', 1024824],
      ['200×160', 1159639],
      ['200×180', 1273051],
      ['200×200', 1370126],
    ],
  },
  {
    name: 'Dream Tech Resortes PT',
    category: 'colchones',
    subtitle: 'Resortes Pocket · Pillow Top · Hasta 130 kg',
    description: 'Colchón Dream Tech de resortes Pocket con Pillow Top, 36 cm. Soporte hasta 130 kg. Línea premium.',
    line: 'premium',
    springType: 'pocket',
    supportKg: 130,
    height: 36,
    pillowTop: true,
    highlights: ['Resortes Pocket', 'Pillow Top', 'Hasta 130 kg'],
    rows: [
      ['190×80', 806704],
      ['190×140', 1171906],
      ['200×160', 1428056],
      ['200×180', 1532189],
      ['200×200', 1625112],
    ],
  },
  {
    name: 'Montreaux',
    category: 'colchones',
    subtitle: 'Resortes Pocket · 30 cm · Premium',
    description: 'Colchón Montreaux con resortes Pocket, 30 cm. Línea premium.',
    line: 'premium',
    springType: 'pocket',
    supportKg: 130,
    height: 30,
    highlights: ['Resortes Pocket', 'Premium'],
    rows: [
      ['190×140', 932871],
      ['200×160', 1170431],
      ['200×180', 1251930],
      ['200×200', 1326849],
    ],
  },
  {
    name: 'Montreaux Pillow Top',
    category: 'colchones',
    subtitle: 'Pocket + Pillow Top · 34 cm · Premium',
    description: 'Colchón Montreaux con Pillow Top, resortes Pocket, 34 cm. Línea premium.',
    line: 'premium',
    springType: 'pocket',
    supportKg: 130,
    height: 34,
    pillowTop: true,
    isFeatured: true,
    badge: 'Destacado',
    highlights: ['Pocket + Pillow Top', 'Premium'],
    rows: [
      ['190×140', 1263820],
      ['200×160', 1540060],
      ['200×180', 1652360],
      ['200×200', 1752572],
    ],
  },
  {
    name: 'Dream Fit I Pocket',
    category: 'colchones',
    subtitle: 'Resortes Pocket · Ultra premium',
    description: 'Colchón Dream Fit I con resortes Pocket, 33 cm. Ultra premium. Bajo pedido: consultar stock.',
    line: 'ultra',
    springType: 'pocket',
    height: 33,
    pillowTop: true,
    bajoPedido: true,
    highlights: ['Resortes Pocket', 'Ultra premium'],
    rows: [
      ['190×140', 1377093],
      ['200×160', 1576984],
      ['200×200', 1856622],
    ],
  },
  {
    name: 'Dream Fit II Foam',
    category: 'colchones',
    subtitle: 'Espuma 35 kg/m³ · Ultra premium',
    description: 'Colchón Dream Fit II de espuma 35 kg/m³, 33 cm. Ultra premium. Bajo pedido: consultar stock.',
    line: 'ultra',
    springType: 'espuma',
    densityKgM3: 35,
    height: 33,
    bajoPedido: true,
    highlights: ['Espuma 35 kg/m³', 'Ultra premium'],
    rows: [
      ['190×140', 1352213],
      ['200×160', 1570350],
      ['200×200', 1874721],
    ],
  },
  {
    name: 'Dream Fit Foam',
    category: 'colchones',
    subtitle: 'Espuma ultra premium · 32 cm',
    description: 'Colchón Dream Fit Foam de espuma, 32 cm. Ultra premium. Bajo pedido: consultar stock.',
    line: 'ultra',
    springType: 'espuma',
    height: 32,
    bajoPedido: true,
    highlights: ['Espuma ultra premium', '32 cm'],
    rows: [
      ['190×140', 1475829],
      ['200×160', 1747987],
      ['200×200', 1989191],
    ],
  },
  {
    name: 'Dream Fit Pocket',
    category: 'colchones',
    subtitle: 'Resortes Pocket · Ultra premium · 35 cm',
    description: 'Colchón Dream Fit Pocket con resortes Pocket, 35 cm. Ultra premium. Bajo pedido: consultar stock.',
    line: 'ultra',
    springType: 'pocket',
    height: 35,
    pillowTop: true,
    bajoPedido: true,
    highlights: ['Resortes Pocket', 'Ultra premium', '35 cm'],
    rows: [
      ['190×140', 1519609],
      ['200×160', 1749844],
      ['200×200', 1991305],
    ],
  },
]

// ============================================================================
// SOMMIERS
// ============================================================================
const SOMMIERS: ProductSeed[] = [
  {
    name: 'Sommier Smart Tech',
    category: 'sommiers',
    subtitle: 'Base sommier Piero',
    description: 'Base sommier Smart Tech, combo oficial de la línea Smart Tech.',
    height: 20,
    rows: [
      ['190×80', 168861],
      ['190×90', 177166],
      ['190×100', 191007],
      ['190×140', 224225],
      ['200×80', 189544],
    ],
  },
  {
    name: 'Sommier LE',
    category: 'sommiers',
    subtitle: 'Base sommier Piero',
    description: 'Base sommier LE, combo oficial de la línea Max Tech.',
    height: 20,
    rows: [
      ['190×140', 236086],
      ['200×80', 189759],
      ['200×100', 205991],
    ],
  },
  {
    name: 'Sommier Sognare',
    category: 'sommiers',
    subtitle: 'Base sommier Piero',
    description: 'Base sommier Sognare, combo oficial para Meditare.',
    height: 20,
    rows: [
      ['190×80', 171031],
      ['190×90', 179442],
      ['190×100', 193461],
      ['190×130', 210284],
      ['190×140', 227106],
    ],
  },
  {
    name: 'Sommier Grey',
    category: 'sommiers',
    subtitle: 'Base sommier Piero',
    description: 'Base sommier Grey, combo oficial para Nirvana, Regno y Sonno.',
    height: 20,
    rows: [
      ['190×80', 166383],
      ['190×90', 178025],
      ['190×100', 195227],
      ['190×140', 220583],
      ['200×80', 176980],
      ['200×90', 183956],
      ['200×100', 195692],
    ],
  },
  {
    name: 'Sommier Exclusivo',
    category: 'sommiers',
    subtitle: 'Base sommier Piero',
    description: 'Base sommier Exclusivo, combo oficial para Montreaux y Dream Tech.',
    height: 20,
    rows: [
      ['190×140', 221057],
      ['200×80', 190395],
      ['200×90', 195211],
      ['200×100', 216643],
    ],
  },
  {
    name: 'Sommier Dream Fit',
    category: 'sommiers',
    subtitle: 'Base sommier Piero · Bajo pedido',
    description: 'Base sommier Dream Fit, combo oficial para la línea Dream Fit. Bajo pedido.',
    height: 10,
    bajoPedido: true,
    rows: [
      ['190×140', 419308],
      ['200×80', 361147],
      ['200×100', 379594],
    ],
  },
]

// ============================================================================
// PROTECTORES (garantía 0)
// ============================================================================
const PROTECTORES: ProductSeed[] = [
  {
    name: 'Procol 4 Elásticos',
    category: 'protectores',
    subtitle: 'Cubre colchón impermeable · 4 elásticos',
    description: 'Cubre colchón Procol con 4 elásticos, impermeable.',
    height: 2,
    warranty: 0,
    rows: [
      ['190×80', 17846],
      ['190×90', 19164],
      ['190×100', 20560],
      ['190×140', 24685],
      ['200×160', 30581],
      ['200×180', 32729],
      ['200×200', 36467],
    ],
  },
  {
    name: 'Cubre Lateral',
    category: 'protectores',
    subtitle: 'Cubre colchón con lateral',
    description: 'Cubre colchón con protección lateral (lateral de sábana).',
    height: 2,
    warranty: 0,
    rows: [
      ['190×80', 34618],
      ['190×90', 35594],
      ['190×100', 36799],
      ['190×140', 42447],
      ['200×160', 66723],
      ['200×180', 71786],
      ['200×200', 86535],
    ],
  },
]

// ============================================================================
// ALMOHADAS (garantía 0). medida cm.
// ============================================================================
const ALMOHADAS: ProductSeed[] = [
  { name: 'Almohada Visco Dream Fit Clásica', category: 'almohadas', subtitle: 'Viscoelástica', description: 'Almohada viscoelástica Dream Fit Clásica.', height: 12, warranty: 0, rows: [['62×40', 183078]] },
  { name: 'Almohada Visco Dream Fit Cervical', category: 'almohadas', subtitle: 'Viscoelástica cervical', description: 'Almohada viscoelástica cervical Dream Fit.', height: 12, warranty: 0, rows: [['57×37', 176052]] },
  { name: 'Almohada Visco Dream Tech', category: 'almohadas', subtitle: 'Viscoelástica tech', description: 'Almohada viscoelástica Dream Tech.', height: 12, warranty: 0, rows: [['70×40', 158241]] },
  { name: 'Almohada Micro Max Tech Rollo', category: 'almohadas', subtitle: 'Micro fibra en rollo', description: 'Almohada Micro Max Tech en rollo.', height: 14, warranty: 0, rows: [['70×50', 111895], ['80×50', 115234], ['90×50', 120431]] },
  { name: 'Almohada Micro Max Tech Núcleo', category: 'almohadas', subtitle: 'Micro fibra con núcleo', description: 'Almohada Micro Max Tech con núcleo.', height: 14, warranty: 0, rows: [['70×40', 150925]] },
  { name: 'Almohada Fibra Smart Tech Plus', category: 'almohadas', subtitle: 'Fibra', description: 'Almohada de fibra Smart Tech Plus.', height: 14, warranty: 0, rows: [['70×50', 58885], ['80×50', 64838]] },
  { name: 'Almohada Fibra Smart Tech Confort', category: 'almohadas', subtitle: 'Fibra', description: 'Almohada de fibra Smart Tech Confort.', height: 12, warranty: 0, rows: [['70×40', 22668], ['80×40', 24733], ['90×40', 23503]] },
]

// ============================================================================
// COMBOS 5 EN 1 (packs promocionales: colchón + sommier + almohada + respaldo + protector)
// Precio = contado. SIN tachado +30% (se maneja aparte en la UI / panel).
// ============================================================================
const COMBO_DESC =
  'Combo 5 en 1: colchón + sommier + almohada + respaldo + protector. Todo el descanso en un solo pack, al mejor precio.'
const COMBOS_5EN1: ProductSeed[] = [
  { name: 'Combo Merit 1 plaza', category: 'combos', subtitle: '5 productos en 1 · 1 plaza', description: COMBO_DESC, height: 25, badge: '5 EN 1', isFeatured: true, highlights: ['Colchón + sommier + almohada + respaldo + protector'], rows: [['190×100', 575000]] },
  { name: 'Combo Foam 1 plaza', category: 'combos', subtitle: '5 productos en 1 · 1 plaza', description: COMBO_DESC, height: 25, badge: '5 EN 1', isFeatured: true, highlights: ['Colchón + sommier + almohada + respaldo + protector'], rows: [['190×100', 510000]] },
  { name: 'Combo Merit 2 plazas', category: 'combos', subtitle: '5 productos en 1 · 2 plazas', description: COMBO_DESC, height: 25, badge: '5 EN 1', isFeatured: true, isBestSeller: true, highlights: ['Colchón + sommier + almohada + respaldo + protector'], rows: [['190×140', 730000]] },
  { name: 'Combo Foam 2 plazas', category: 'combos', subtitle: '5 productos en 1 · 2 plazas', description: COMBO_DESC, height: 25, badge: '5 EN 1', isFeatured: true, highlights: ['Colchón + sommier + almohada + respaldo + protector'], rows: [['190×140', 650000]] },
  { name: 'Combo Merit Queen', category: 'combos', subtitle: '5 productos en 1 · Queen', description: COMBO_DESC, height: 25, badge: '5 EN 1', isFeatured: true, highlights: ['Colchón + sommier + almohada + respaldo + protector'], rows: [['200×160', 915000]] },
  { name: 'Combo Oxford Queen', category: 'combos', subtitle: '5 productos en 1 · Queen premium', description: COMBO_DESC, height: 25, badge: '5 EN 1', isFeatured: true, highlights: ['Colchón + sommier + almohada + respaldo + protector'], rows: [['200×160', 1375000]] },
]

// ============================================================================
// COMBOS OFICIALES colchón → sommier (mapeo confirmado por secciones).
// ============================================================================
const COMBOS: Array<{ mattress: string; sommier: string }> = [
  { mattress: 'smart-tech-espuma', sommier: 'sommier-smart-tech' },
  { mattress: 'smart-tech-resortes', sommier: 'sommier-smart-tech' },
  { mattress: 'max-tech-espuma', sommier: 'sommier-le' },
  { mattress: 'max-tech-resortes', sommier: 'sommier-le' },
  { mattress: 'meditare-europillow', sommier: 'sommier-sognare' },
  { mattress: 'nirvana-20', sommier: 'sommier-grey' },
  { mattress: 'regno', sommier: 'sommier-grey' },
  { mattress: 'regno-con-pillow', sommier: 'sommier-grey' },
  { mattress: 'sonno-europillow', sommier: 'sommier-grey' },
  { mattress: 'namaste', sommier: 'sommier-grey' },
  { mattress: 'montreaux', sommier: 'sommier-exclusivo' },
  { mattress: 'montreaux-pillow-top', sommier: 'sommier-exclusivo' },
  { mattress: 'dream-tech-espuma-ep', sommier: 'sommier-exclusivo' },
  { mattress: 'dream-tech-resortes-pt', sommier: 'sommier-exclusivo' },
  { mattress: 'dream-fit-i-pocket', sommier: 'sommier-dream-fit' },
  { mattress: 'dream-fit-ii-foam', sommier: 'sommier-dream-fit' },
  { mattress: 'dream-fit-foam', sommier: 'sommier-dream-fit' },
  { mattress: 'dream-fit-pocket', sommier: 'sommier-dream-fit' },
]

// ============================================================================
// UPSERT
// ============================================================================
async function upsertProduct(p: ProductSeed, categoryId: string) {
  const slug = p.slug ?? slugify(p.name)
  const minArs = Math.min(...p.rows.map((r) => r[1]))
  const warranty = p.warranty ?? 5
  const images = imagesForSlug(slug)
  const isCombo = p.category === 'combos'

  const data = {
    name: p.name,
    subtitle: p.subtitle,
    description: p.description,
    price: ARS(minArs),
    // Combos: sin tachado +30% (el ahorro "5 en 1" se define aparte).
    originalPrice: isCombo ? null : pvp(ARS(minArs)),
    discount: isCombo ? 0 : Math.round((1 - 1 / PVP_MARKUP) * 100),
    category: p.category,
    categoryId,
    brand: 'Piero',
    line: p.line ?? null,
    springType: p.springType ?? null,
    densityKgM3: p.densityKgM3 ?? null,
    supportKg: p.supportKg ?? null,
    height: p.height,
    pillowTop: p.pillowTop ?? false,
    bajoPedido: p.bajoPedido ?? false,
    warranty,
    isPremium: p.line === 'premium' || p.line === 'ultra',
    isBestSeller: p.isBestSeller ?? false,
    isFeatured: p.isFeatured ?? false,
    isActive: true,
    badge: p.badge ?? null,
    highlights: p.highlights ?? [],
    images,
    image: images[0] ?? null,
    sku: slug,
    inStock: !p.bajoPedido,
    metaTitle: `${p.name} Piero — Azul Colchones`,
    metaDescription: p.description.slice(0, 160),
  } satisfies Prisma.ProductUncheckedUpdateInput

  const product = await prisma.product.upsert({
    where: { slug },
    create: { slug, ...data },
    update: data,
  })

  await prisma.productVariant.deleteMany({ where: { productId: product.id } })

  let i = 0
  for (const [measure, ars] of p.rows) {
    const { length, width } = parseMeasure(measure)
    const priceCents = ARS(ars)
    await prisma.productVariant.create({
      data: {
        productId: product.id,
        sku: `${slug}-${slugify(measure)}`,
        size: plaza(measure),
        dimensions: measure,
        measure,
        plaza: plaza(measure),
        width,
        length,
        height: p.height,
        price: priceCents,
        priceList: isCombo ? null : pvp(priceCents),
        originalPrice: isCombo ? null : pvp(priceCents),
        available: !p.bajoPedido,
        inStock: !p.bajoPedido,
        stock: p.bajoPedido ? 0 : 10,
        isDefault: i === 0,
        isActive: true,
      },
    })
    i++
  }

  return { product, slug }
}

async function main() {
  console.log('🌱 Seed catálogo Azul Colchones — Lista Exclusivos Piero JUNIO 2026\n')

  // 1) Categorías
  const catIdBySlug = new Map<string, string>()
  for (const c of CATEGORIES) {
    const cat = await prisma.category.upsert({ where: { slug: c.slug }, create: c, update: { name: c.name, emoji: c.emoji, order: c.order } })
    catIdBySlug.set(c.slug, cat.id)
  }
  console.log(`✅ ${CATEGORIES.length} categorías`)

  // 2) Productos
  const all = [...COMBOS_5EN1, ...COLCHONES, ...SOMMIERS, ...PROTECTORES, ...ALMOHADAS]
  const seededSlugs = new Set<string>()
  let variantCount = 0
  for (const p of all) {
    const categoryId = catIdBySlug.get(p.category)!
    const { slug } = await upsertProduct(p, categoryId)
    seededSlugs.add(slug)
    variantCount += p.rows.length
  }
  console.log(`✅ ${all.length} productos · ${variantCount} variantes`)

  // 3) Limpieza: desactivar/borrar productos que NO están en la lista nueva
  const orphans = await prisma.product.findMany({
    where: { slug: { notIn: Array.from(seededSlugs) } },
    select: { id: true, slug: true },
  })
  let deleted = 0
  let deactivated = 0
  for (const o of orphans) {
    try {
      await prisma.$transaction([
        prisma.comboSuggestion.deleteMany({ where: { OR: [{ mattressId: o.id }, { sommierId: o.id }] } }),
        prisma.cartItem.deleteMany({ where: { productId: o.id } }),
        prisma.productVariant.deleteMany({ where: { productId: o.id } }),
        prisma.product.delete({ where: { id: o.id } }),
      ])
      deleted++
    } catch {
      // Si tiene órdenes (FK), no se puede borrar → lo desactivamos.
      await prisma.product.update({ where: { id: o.id }, data: { isActive: false } }).catch(() => {})
      deactivated++
    }
  }
  console.log(`🧹 Fuera de lista: ${deleted} borrados, ${deactivated} desactivados (${orphans.map((o) => o.slug).join(', ') || '—'})`)

  // 4) Combos oficiales
  await prisma.comboSuggestion.deleteMany({})
  let comboCount = 0
  for (const { mattress, sommier } of COMBOS) {
    const m = await prisma.product.findUnique({ where: { slug: mattress } })
    const s = await prisma.product.findUnique({ where: { slug: sommier } })
    if (!m || !s) {
      console.warn(`⚠️  Combo omitido: ${mattress} → ${sommier}`)
      continue
    }
    await prisma.comboSuggestion.create({ data: { mattressId: m.id, sommierId: s.id, note: 'Combo oficial Piero' } })
    comboCount++
  }
  console.log(`✅ ${comboCount} combos oficiales`)

  console.log('\n🎉 Seed completado.')
}

main()
  .catch((e) => {
    console.error('❌ Seed falló:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
