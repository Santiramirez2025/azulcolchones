// ============================================================================
// TIPOS Y CONFIGURACIÓN
// ============================================================================

export type CategoriaProducto = 'ancla' | 'equilibrio' | 'premium' | 'accesorio'
export type StockStatus = 'disponible' | 'consultar' | 'bajo-pedido'
export type TipoProducto = 'colchon' | 'protector' | 'almohada' | 'sabanas' | 'cubre' | 'sommier'

export interface Producto {
  id: string
  nombre: string
  tamaño: string
  precioPublico: number
  precioMercadoLibre?: number
  categoria: CategoriaProducto
  destacado?: boolean
  stock: StockStatus
  imagen?: string
  tipo?: TipoProducto
  ahorro?: number
  ahorroPorc?: number
}

export interface CategoriaConfig {
  badge: string
  colorBg: string
  colorBorder: string
  colorGlow: string
}

// ============================================================================
// CONFIGURACIÓN DE CATEGORÍAS
// ============================================================================

export const CATEGORIAS_CONFIG: Record<CategoriaProducto, CategoriaConfig> = {
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

export const TIPO_EMOJI: Record<TipoProducto, string> = {
  colchon: '🛏️',
  protector: '🛡️',
  almohada: '💤',
  sabanas: '✨',
  cubre: '🧵',
  sommier: '📦'
}

// ============================================================================
// BASE DE DATOS DE PRODUCTOS
// ============================================================================

// ========== MEDITARE EUROPILLOW ==========
const meditareEP: Producto[] = [
  {
    id: 'meditare-ep-80',
    nombre: 'Colchón Piero Meditare EuroPillow',
    tamaño: '190x80 (1 plaza)',
    precioPublico: 189900,
    precioMercadoLibre: 249900,
    categoria: 'ancla',
    stock: 'disponible',
    imagen: '/images/meditare-ep-80.jpg',
    tipo: 'colchon'
  },
  {
    id: 'meditare-ep-90',
    nombre: 'Colchón Piero Meditare EuroPillow',
    tamaño: '190x90 (1 plaza)',
    precioPublico: 234900,
    precioMercadoLibre: 279900,
    categoria: 'ancla',
    stock: 'disponible',
    imagen: '/images/meditare-ep-90.jpg',
    tipo: 'colchon'
  },
  {
    id: 'meditare-ep-100',
    nombre: 'Colchón Piero Meditare EuroPillow',
    tamaño: '190x100 (1 plaza)',
    precioPublico: 259900,
    precioMercadoLibre: 299900,
    categoria: 'ancla',
    stock: 'disponible',
    imagen: '/images/meditare-ep-100.jpg',
    tipo: 'colchon'
  },
  {
    id: 'meditare-ep-130',
    nombre: 'Colchón Piero Meditare EuroPillow',
    tamaño: '190x130 (1½ plaza)',
    precioPublico: 329900,
    precioMercadoLibre: 379900,
    categoria: 'ancla',
    stock: 'disponible',
    imagen: '/images/meditare-ep-130.jpg',
    tipo: 'colchon'
  },
  {
    id: 'meditare-ep-140',
    nombre: 'Colchón Piero Meditare EuroPillow',
    tamaño: '190x140 (2 plazas)',
    precioPublico: 354900,
    precioMercadoLibre: 399900,
    categoria: 'ancla',
    stock: 'disponible',
    imagen: '/images/meditare-ep-140.jpg',
    tipo: 'colchon'
  }
]

// ========== NIRVANA ==========
const nirvana: Producto[] = [
  {
    id: 'nirvana-80',
    nombre: 'Colchón Piero Nirvana',
    tamaño: '190x80 (1 plaza)',
    precioPublico: 324900,
    precioMercadoLibre: 449900,
    categoria: 'ancla',
    stock: 'disponible',
    imagen: '/images/nirvana-80.jpg',
    tipo: 'colchon'
  },
  {
    id: 'nirvana-90',
    nombre: 'Colchón Piero Nirvana',
    tamaño: '190x90 (1 plaza)',
    precioPublico: 359900,
    precioMercadoLibre: 519900,
    categoria: 'ancla',
    stock: 'disponible',
    imagen: '/images/nirvana-90.jpg',
    tipo: 'colchon'
  },
  {
    id: 'nirvana-100',
    nombre: 'Colchón Piero Nirvana',
    tamaño: '190x100 (1 plaza)',
    precioPublico: 409900,
    precioMercadoLibre: 589900,
    categoria: 'ancla',
    stock: 'disponible',
    imagen: '/images/nirvana-100.jpg',
    tipo: 'colchon'
  },
  {
    id: 'nirvana-130',
    nombre: 'Colchón Piero Nirvana',
    tamaño: '190x130 (1½ plaza)',
    precioPublico: 514900,
    precioMercadoLibre: 739900,
    categoria: 'ancla',
    stock: 'disponible',
    imagen: '/images/nirvana-130.jpg',
    tipo: 'colchon'
  },
  {
    id: 'nirvana-140',
    nombre: 'Colchón Piero Nirvana',
    tamaño: '190x140 (2 plazas)',
    precioPublico: 549900,
    precioMercadoLibre: 709900,
    categoria: 'ancla',
    stock: 'disponible',
    imagen: '/images/nirvana-140.jpg',
    tipo: 'colchon'
  },
  {
    id: 'nirvana-160',
    nombre: 'Colchón Piero Nirvana',
    tamaño: '190x160 (2 plazas)',
    precioPublico: 699900,
    precioMercadoLibre: 999900,
    categoria: 'ancla',
    stock: 'disponible',
    imagen: '/images/nirvana-160.jpg',
    tipo: 'colchon'
  },
  {
    id: 'nirvana-180',
    nombre: 'Colchón Piero Nirvana',
    tamaño: '200x180 (Queen)',
    precioPublico: 769900,
    precioMercadoLibre: 1099900,
    categoria: 'ancla',
    stock: 'disponible',
    imagen: '/images/nirvana-180.jpg',
    tipo: 'colchon'
  },
  {
    id: 'nirvana-200',
    nombre: 'Colchón Piero Nirvana',
    tamaño: '200x200 (King)',
    precioPublico: 829900,
    precioMercadoLibre: 1019900,
    categoria: 'ancla',
    stock: 'disponible',
    imagen: '/images/nirvana-200.jpg',
    tipo: 'colchon'
  }
]

// ========== SONNO EUROPILLOW ==========
const sonnoEP: Producto[] = [
  {
    id: 'sonno-ep-80',
    nombre: 'Colchón Piero Sonno EuroPillow',
    tamaño: '190x80 (1 plaza)',
    precioPublico: 289900,
    precioMercadoLibre: 339900,
    categoria: 'equilibrio',
    stock: 'disponible',
    imagen: '/images/sonno-ep-80.jpg',
    tipo: 'colchon'
  },
  {
    id: 'sonno-ep-90',
    nombre: 'Colchón Piero Sonno EuroPillow',
    tamaño: '190x90 (1 plaza)',
    precioPublico: 314900,
    precioMercadoLibre: 369900,
    categoria: 'equilibrio',
    stock: 'disponible',
    imagen: '/images/sonno-ep-90.jpg',
    tipo: 'colchon'
  },
  {
    id: 'sonno-ep-100',
    nombre: 'Colchón Piero Sonno EuroPillow',
    tamaño: '190x100 (1 plaza)',
    precioPublico: 344900,
    precioMercadoLibre: 399900,
    categoria: 'equilibrio',
    stock: 'disponible',
    imagen: '/images/sonno-ep-100.jpg',
    tipo: 'colchon'
  },
  {
    id: 'sonno-ep-130',
    nombre: 'Colchón Piero Sonno EuroPillow',
    tamaño: '190x130 (1½ plaza)',
    precioPublico: 434900,
    precioMercadoLibre: 499900,
    categoria: 'equilibrio',
    stock: 'disponible',
    imagen: '/images/sonno-ep-130.jpg',
    tipo: 'colchon'
  },
  {
    id: 'sonno-ep-140',
    nombre: 'Colchón Piero Sonno EuroPillow',
    tamaño: '190x140 (2 plazas)',
    precioPublico: 469900,
    precioMercadoLibre: 679900,
    categoria: 'equilibrio',
    destacado: true,
    stock: 'disponible',
    imagen: '/images/sonno-ep-140.jpg',
    tipo: 'colchon'
  },
  {
    id: 'sonno-ep-160',
    nombre: 'Colchón Piero Sonno EuroPillow',
    tamaño: '190x160 (2 plazas)',
    precioPublico: 514900,
    precioMercadoLibre: 579900,
    categoria: 'equilibrio',
    stock: 'disponible',
    imagen: '/images/sonno-ep-160.jpg',
    tipo: 'colchon'
  }
]

// ========== REGNO ==========
const regno: Producto[] = [
  {
    id: 'regno-80',
    nombre: 'Colchón Piero Regno',
    tamaño: '190x80 (1 plaza)',
    precioPublico: 299900,
    precioMercadoLibre: 409900,
    categoria: 'equilibrio',
    stock: 'disponible',
    imagen: '/images/regno-80.jpg',
    tipo: 'colchon'
  },
  {
    id: 'regno-90',
    nombre: 'Colchón Piero Regno',
    tamaño: '190x90 (1 plaza)',
    precioPublico: 324900,
    precioMercadoLibre: 449900,
    categoria: 'equilibrio',
    stock: 'disponible',
    imagen: '/images/regno-90.jpg',
    tipo: 'colchon'
  },
  {
    id: 'regno-100',
    nombre: 'Colchón Piero Regno',
    tamaño: '190x100 (1 plaza)',
    precioPublico: 360000,
    categoria: 'equilibrio',
    stock: 'disponible',
    imagen: '/images/regno-100.jpg',
    tipo: 'colchon'
  },
  {
    id: 'regno-140',
    nombre: 'Colchón Piero Regno',
    tamaño: '190x140 (2 plazas)',
    precioPublico: 459900,
    precioMercadoLibre: 729900,
    categoria: 'equilibrio',
    stock: 'disponible',
    imagen: '/images/regno-140.jpg',
    tipo: 'colchon'
  },
  {
    id: 'regno-160',
    nombre: 'Colchón Piero Regno',
    tamaño: '200x160 (Queen)',
    precioPublico: 544900,
    precioMercadoLibre: 979900,
    categoria: 'equilibrio',
    stock: 'disponible',
    imagen: '/images/regno-160.jpg',
    tipo: 'colchon'
  },
  {
    id: 'regno-200',
    nombre: 'Colchón Piero Regno',
    tamaño: '200x200 (King)',
    precioPublico: 669900,
    precioMercadoLibre: 899900,
    categoria: 'equilibrio',
    stock: 'disponible',
    imagen: '/images/regno-200.jpg',
    tipo: 'colchon'
  }
]

// ========== REGNO PILLOW TOP ==========
const regnoPillow: Producto[] = [
  {
    id: 'regno-pillow-140',
    nombre: 'Colchón Piero Regno Pillow Top',
    tamaño: '190x140 (2 plazas)',
    precioPublico: 574900,
    precioMercadoLibre: 629900,
    categoria: 'equilibrio',
    stock: 'disponible',
    imagen: '/images/regno-pillow-140.jpg',
    tipo: 'colchon'
  },
  {
    id: 'regno-pillow-160',
    nombre: 'Colchón Piero Regno Pillow Top',
    tamaño: '200x160 (Queen)',
    precioPublico: 659900,
    precioMercadoLibre: 799900,
    categoria: 'equilibrio',
    stock: 'disponible',
    imagen: '/images/regno-pillow-160.jpg',
    tipo: 'colchon'
  },
  {
    id: 'regno-pillow-180',
    nombre: 'Colchón Piero Regno Pillow Top',
    tamaño: '200x180 (Queen XL)',
    precioPublico: 729900,
    precioMercadoLibre: 979900,
    categoria: 'equilibrio',
    stock: 'disponible',
    imagen: '/images/regno-pillow-180.jpg',
    tipo: 'colchon'
  },
  {
    id: 'regno-pillow-200',
    nombre: 'Colchón Piero Regno Pillow Top',
    tamaño: '200x200 (King)',
    precioPublico: 799900,
    precioMercadoLibre: 1079900,
    categoria: 'equilibrio',
    stock: 'disponible',
    imagen: '/images/regno-pillow-200.jpg',
    tipo: 'colchon'
  }
]

// ========== GRAVITA ==========
const gravita: Producto[] = [
  {
    id: 'gravita-140',
    nombre: 'Colchón Piero Gravita',
    tamaño: '190x140 (2 plazas)',
    precioPublico: 749900,
    precioMercadoLibre: 999900,
    categoria: 'equilibrio',
    stock: 'disponible',
    imagen: '/images/gravita-140.jpg',
    tipo: 'colchon'
  },
  {
    id: 'gravita-160',
    nombre: 'Colchón Piero Gravita',
    tamaño: '200x160 (Queen)',
    precioPublico: 924900,
    precioMercadoLibre: 1109900,
    categoria: 'equilibrio',
    stock: 'disponible',
    imagen: '/images/gravita-160.jpg',
    tipo: 'colchon'
  },
  {
    id: 'gravita-180',
    nombre: 'Colchón Piero Gravita',
    tamaño: '200x180 (Queen XL)',
    precioPublico: 989900,
    precioMercadoLibre: 1299900,
    categoria: 'equilibrio',
    stock: 'disponible',
    imagen: '/images/gravita-180.jpg',
    tipo: 'colchon'
  },
  {
    id: 'gravita-200',
    nombre: 'Colchón Piero Gravita',
    tamaño: '200x200 (King)',
    precioPublico: 1049900,
    precioMercadoLibre: 1319900,
    categoria: 'equilibrio',
    stock: 'disponible',
    imagen: '/images/gravita-200.jpg',
    tipo: 'colchon'
  }
]

// ========== NAMASTE ==========
const namaste: Producto[] = [
  {
    id: 'namaste-80',
    nombre: 'Colchón Piero Namaste',
    tamaño: '190x80 (1 plaza)',
    precioPublico: 260000,
    categoria: 'equilibrio',
    stock: 'disponible',
    imagen: '/images/namaste-80.jpg',
    tipo: 'colchon'
  },
  {
    id: 'namaste-90',
    nombre: 'Colchón Piero Namaste',
    tamaño: '190x90 (1 plaza)',
    precioPublico: 290000,
    categoria: 'equilibrio',
    stock: 'disponible',
    imagen: '/images/namaste-90.jpg',
    tipo: 'colchon'
  },
  {
    id: 'namaste-100',
    nombre: 'Colchón Piero Namaste',
    tamaño: '190x100 (1 plaza)',
    precioPublico: 320000,
    categoria: 'equilibrio',
    stock: 'disponible',
    imagen: '/images/namaste-100.jpg',
    tipo: 'colchon'
  },
  {
    id: 'namaste-140',
    nombre: 'Colchón Piero Namaste',
    tamaño: '190x140 (2 plazas)',
    precioPublico: 424900,
    precioMercadoLibre: 449900,
    categoria: 'equilibrio',
    stock: 'disponible',
    imagen: '/images/namaste-140.jpg',
    tipo: 'colchon'
  },
  {
    id: 'namaste-160',
    nombre: 'Colchón Piero Namaste',
    tamaño: '200x160 (Queen)',
    precioPublico: 539900,
    precioMercadoLibre: 579900,
    categoria: 'equilibrio',
    stock: 'disponible',
    imagen: '/images/namaste-160.jpg',
    tipo: 'colchon'
  },
  {
    id: 'namaste-200',
    nombre: 'Colchón Piero Namaste',
    tamaño: '200x200 (King)',
    precioPublico: 649900,
    precioMercadoLibre: 699900,
    categoria: 'equilibrio',
    stock: 'disponible',
    imagen: '/images/namaste-200.jpg',
    tipo: 'colchon'
  }
]

// ========== NAMASTE PILLOW TOP ==========
const namastePillow: Producto[] = [
  {
    id: 'namaste-pillow-140',
    nombre: 'Colchón Piero Namaste Pillow Top',
    tamaño: '190x140 (2 plazas)',
    precioPublico: 539900,
    precioMercadoLibre: 579900,
    categoria: 'equilibrio',
    stock: 'disponible',
    imagen: '/images/namaste-pillow-140.jpg',
    tipo: 'colchon'
  },
  {
    id: 'namaste-pillow-160',
    nombre: 'Colchón Piero Namaste Pillow Top',
    tamaño: '200x160 (Queen)',
    precioPublico: 619900,
    precioMercadoLibre: 659900,
    categoria: 'equilibrio',
    stock: 'disponible',
    imagen: '/images/namaste-pillow-160.jpg',
    tipo: 'colchon'
  }
]

// ========== MONTREAUX ==========
const montreaux: Producto[] = [
  {
    id: 'montreaux-140',
    nombre: 'Colchón Piero Montreaux',
    tamaño: '190x140 (2 plazas)',
    precioPublico: 789900,
    precioMercadoLibre: 1369900,
    categoria: 'premium',
    stock: 'disponible',
    imagen: '/images/montreaux-140.jpg',
    tipo: 'colchon'
  },
  {
    id: 'montreaux-160',
    nombre: 'Colchón Piero Montreaux',
    tamaño: '200x160 (Queen)',
    precioPublico: 989900,
    precioMercadoLibre: 1699900,
    categoria: 'premium',
    stock: 'disponible',
    imagen: '/images/montreaux-160.jpg',
    tipo: 'colchon'
  },
  {
    id: 'montreaux-180',
    nombre: 'Colchón Piero Montreaux',
    tamaño: '200x180 (Queen XL)',
    precioPublico: 1100000,
    categoria: 'premium',
    stock: 'disponible',
    imagen: '/images/montreaux-180.jpg',
    tipo: 'colchon'
  },
  {
    id: 'montreaux-200',
    nombre: 'Colchón Piero Montreaux',
    tamaño: '200x200 (King)',
    precioPublico: 1119900,
    precioMercadoLibre: 1929900,
    categoria: 'premium',
    stock: 'disponible',
    imagen: '/images/montreaux-200.jpg',
    tipo: 'colchon'
  }
]

// ========== MONTREAUX PILLOW TOP ==========
const montreauxPillow: Producto[] = [
  {
    id: 'montreaux-pillow-140',
    nombre: 'Colchón Piero Montreaux Pillow Top',
    tamaño: '190x140 (2 plazas)',
    precioPublico: 989900,
    precioMercadoLibre: 1529900,
    categoria: 'premium',
    stock: 'disponible',
    imagen: '/images/montreaux-pillow-140.jpg',
    tipo: 'colchon'
  },
  {
    id: 'montreaux-pillow-160',
    nombre: 'Colchón Piero Montreaux Pillow Top',
    tamaño: '200x160 (Queen)',
    precioPublico: 1199900,
    precioMercadoLibre: 2079900,
    categoria: 'premium',
    destacado: true,
    stock: 'disponible',
    imagen: '/images/montreaux-pillow-160.jpg',
    tipo: 'colchon'
  },
  {
    id: 'montreaux-pillow-180',
    nombre: 'Colchón Piero Montreaux Pillow Top',
    tamaño: '200x180 (Queen XL)',
    precioPublico: 1289900,
    precioMercadoLibre: 2289900,
    categoria: 'premium',
    stock: 'disponible',
    imagen: '/images/montreaux-pillow-180.jpg',
    tipo: 'colchon'
  },
  {
    id: 'montreaux-pillow-200',
    nombre: 'Colchón Piero Montreaux Pillow Top',
    tamaño: '200x200 (King)',
    precioPublico: 1369900,
    precioMercadoLibre: 2679900,
    categoria: 'premium',
    stock: 'disponible',
    imagen: '/images/montreaux-pillow-200.jpg',
    tipo: 'colchon'
  }
]

// ========== DREAM FIT POCKET ==========
const dreamFitPocket: Producto[] = [
  {
    id: 'dreamfit-pocket-140',
    nombre: 'Colchón Piero Dream Fit Pocket',
    tamaño: '190x140 (2 plazas)',
    precioPublico: 1600000,
    precioMercadoLibre: 2099900,
    categoria: 'premium',
    stock: 'consultar',
    imagen: '/images/dreamfit-pocket-140.jpg',
    tipo: 'colchon'
  },
  {
    id: 'dreamfit-pocket-160',
    nombre: 'Colchón Piero Dream Fit Pocket',
    tamaño: '200x160 (Queen)',
    precioPublico: 1900000,
    precioMercadoLibre: 2399900,
    categoria: 'premium',
    stock: 'consultar',
    imagen: '/images/dreamfit-pocket-160.jpg',
    tipo: 'colchon'
  },
  {
    id: 'dreamfit-pocket-200',
    nombre: 'Colchón Piero Dream Fit Pocket',
    tamaño: '200x200 (King)',
    precioPublico: 2100000,
    precioMercadoLibre: 2749900,
    categoria: 'premium',
    stock: 'consultar',
    imagen: '/images/dreamfit-pocket-200.jpg',
    tipo: 'colchon'
  }
]

// ========== DREAM FIT FOAM ==========
const dreamFitFoam: Producto[] = [
  {
    id: 'dreamfit-foam-140',
    nombre: 'Colchón Piero Dream Fit Foam',
    tamaño: '190x140x32 (2 plazas)',
    precioPublico: 1500000,
    categoria: 'premium',
    stock: 'consultar',
    imagen: '/images/dreamfit-foam-140.jpg',
    tipo: 'colchon'
  },
  {
    id: 'dreamfit-foam-160',
    nombre: 'Colchón Piero Dream Fit Foam',
    tamaño: '200x160x32 (Queen)',
    precioPublico: 1750000,
    categoria: 'premium',
    stock: 'consultar',
    imagen: '/images/dreamfit-foam-160.jpg',
    tipo: 'colchon'
  },
  {
    id: 'dreamfit-foam-200',
    nombre: 'Colchón Piero Dream Fit Foam',
    tamaño: '200x200x32 (King)',
    precioPublico: 1950000,
    categoria: 'premium',
    stock: 'consultar',
    imagen: '/images/dreamfit-foam-200.jpg',
    tipo: 'colchon'
  }
]

// ========== SOMMIERS ==========
const sommiers: Producto[] = [
  // DREAM FIT
  {
    id: 'sommier-dreamfit-140',
    nombre: 'Sommier Piero Dream Fit',
    tamaño: '190x140',
    precioPublico: 500000,
    categoria: 'accesorio',
    stock: 'consultar',
    imagen: '/images/sommier-dreamfit-140.jpg',
    tipo: 'sommier'
  },
  {
    id: 'sommier-dreamfit-160',
    nombre: 'Sommier Piero Dream Fit',
    tamaño: '200x160',
    precioPublico: 800000,
    categoria: 'accesorio',
    stock: 'consultar',
    imagen: '/images/sommier-dreamfit-160.jpg',
    tipo: 'sommier'
  },
  {
    id: 'sommier-dreamfit-200',
    nombre: 'Sommier Piero Dream Fit',
    tamaño: '200x200',
    precioPublico: 850000,
    categoria: 'accesorio',
    stock: 'consultar',
    imagen: '/images/sommier-dreamfit-200.jpg',
    tipo: 'sommier'
  },

  // BROWN
  {
    id: 'sommier-brown-80',
    nombre: 'Sommier Piero Brown',
    tamaño: '190x80',
    precioPublico: 170000,
    categoria: 'accesorio',
    stock: 'disponible',
    imagen: '/images/sommier-brown-80.jpg',
    tipo: 'sommier'
  },
  {
    id: 'sommier-brown-90',
    nombre: 'Sommier Piero Brown',
    tamaño: '190x90',
    precioPublico: 180000,
    categoria: 'accesorio',
    stock: 'disponible',
    imagen: '/images/sommier-brown-90.jpg',
    tipo: 'sommier'
  },
  {
    id: 'sommier-brown-100',
    nombre: 'Sommier Piero Brown',
    tamaño: '190x100',
    precioPublico: 190000,
    categoria: 'accesorio',
    stock: 'disponible',
    imagen: '/images/sommier-brown-100.jpg',
    tipo: 'sommier'
  },
  {
    id: 'sommier-brown-130',
    nombre: 'Sommier Piero Brown',
    tamaño: '190x130',
    precioPublico: 210000,
    categoria: 'accesorio',
    stock: 'disponible',
    imagen: '/images/sommier-brown-130.jpg',
    tipo: 'sommier'
  },
  {
    id: 'sommier-brown-140',
    nombre: 'Sommier Piero Brown',
    tamaño: '190x140',
    precioPublico: 220000,
    categoria: 'accesorio',
    stock: 'disponible',
    imagen: '/images/sommier-brown-140.jpg',
    tipo: 'sommier'
  },
  {
    id: 'sommier-brown-160',
    nombre: 'Sommier Piero Brown',
    tamaño: '190x160',
    precioPublico: 380000,
    categoria: 'accesorio',
    stock: 'disponible',
    imagen: '/images/sommier-brown-160.jpg',
    tipo: 'sommier'
  },
  {
    id: 'sommier-brown-180',
    nombre: 'Sommier Piero Brown',
    tamaño: '200x180',
    precioPublico: 380000,
    categoria: 'accesorio',
    stock: 'disponible',
    imagen: '/images/sommier-brown-180.jpg',
    tipo: 'sommier'
  },
  {
    id: 'sommier-brown-200',
    nombre: 'Sommier Piero Brown',
    tamaño: '200x200',
    precioPublico: 390000,
    categoria: 'accesorio',
    stock: 'disponible',
    imagen: '/images/sommier-brown-200.jpg',
    tipo: 'sommier'
  },

  // GREY
  {
    id: 'sommier-grey-80',
    nombre: 'Sommier Piero Grey',
    tamaño: '190x80',
    precioPublico: 150000,
    categoria: 'accesorio',
    stock: 'disponible',
    imagen: '/images/sommier-grey-80.jpg',
    tipo: 'sommier'
  },
  {
    id: 'sommier-grey-90',
    nombre: 'Sommier Piero Grey',
    tamaño: '190x90',
    precioPublico: 160000,
    categoria: 'accesorio',
    stock: 'disponible',
    imagen: '/images/sommier-grey-90.jpg',
    tipo: 'sommier'
  },
  {
    id: 'sommier-grey-100',
    nombre: 'Sommier Piero Grey',
    tamaño: '190x100',
    precioPublico: 180000,
    categoria: 'accesorio',
    stock: 'disponible',
    imagen: '/images/sommier-grey-100.jpg',
    tipo: 'sommier'
  },
  {
    id: 'sommier-grey-140',
    nombre: 'Sommier Piero Grey',
    tamaño: '190x140',
    precioPublico: 200000,
    categoria: 'accesorio',
    stock: 'disponible',
    imagen: '/images/sommier-grey-140.jpg',
    tipo: 'sommier'
  },
  {
    id: 'sommier-grey-160',
    nombre: 'Sommier Piero Grey',
    tamaño: '200x160',
    precioPublico: 320000,
    categoria: 'accesorio',
    stock: 'disponible',
    imagen: '/images/sommier-grey-160.jpg',
    tipo: 'sommier'
  },
  {
    id: 'sommier-grey-180',
    nombre: 'Sommier Piero Grey',
    tamaño: '200x180',
    precioPublico: 330000,
    categoria: 'accesorio',
    stock: 'disponible',
    imagen: '/images/sommier-grey-180.jpg',
    tipo: 'sommier'
  },
  {
    id: 'sommier-grey-200',
    nombre: 'Sommier Piero Grey',
    tamaño: '200x200',
    precioPublico: 350000,
    categoria: 'accesorio',
    stock: 'disponible',
    imagen: '/images/sommier-grey-200.jpg',
    tipo: 'sommier'
  },

  // SOGNARE
  {
    id: 'sommier-sognare-80',
    nombre: 'Sommier Piero Sognare',
    tamaño: '190x80',
    precioPublico: 160000,
    categoria: 'accesorio',
    stock: 'disponible',
    imagen: '/images/sommier-sognare-80.jpg',
    tipo: 'sommier'
  },
  {
    id: 'sommier-sognare-90',
    nombre: 'Sommier Piero Sognare',
    tamaño: '190x90',
    precioPublico: 170000,
    categoria: 'accesorio',
    stock: 'disponible',
    imagen: '/images/sommier-sognare-90.jpg',
    tipo: 'sommier'
  },
  {
    id: 'sommier-sognare-100',
    nombre: 'Sommier Piero Sognare',
    tamaño: '190x100',
    precioPublico: 180000,
    categoria: 'accesorio',
    stock: 'disponible',
    imagen: '/images/sommier-sognare-100.jpg',
    tipo: 'sommier'
  },
  {
    id: 'sommier-sognare-130',
    nombre: 'Sommier Piero Sognare',
    tamaño: '190x130',
    precioPublico: 200000,
    categoria: 'accesorio',
    stock: 'disponible',
    imagen: '/images/sommier-sognare-130.jpg',
    tipo: 'sommier'
  },
  {
    id: 'sommier-sognare-140',
    nombre: 'Sommier Piero Sognare',
    tamaño: '190x140',
    precioPublico: 220000,
    categoria: 'accesorio',
    stock: 'disponible',
    imagen: '/images/sommier-sognare-140.jpg',
    tipo: 'sommier'
  },
  {
    id: 'sommier-sognare-160',
    nombre: 'Sommier Piero Sognare',
    tamaño: '190x160',
    precioPublico: 320000,
    categoria: 'accesorio',
    stock: 'disponible',
    imagen: '/images/sommier-sognare-160.jpg',
    tipo: 'sommier'
  },

  // EXCLUSIVO
  {
    id: 'sommier-exclusivo-140',
    nombre: 'Sommier Piero Exclusivo',
    tamaño: '190x140',
    precioPublico: 200000,
    categoria: 'accesorio',
    stock: 'disponible',
    imagen: '/images/sommier-exclusivo-140.jpg',
    tipo: 'sommier'
  },
  {
    id: 'sommier-exclusivo-160',
    nombre: 'Sommier Piero Exclusivo',
    tamaño: '200x160',
    precioPublico: 350000,
    categoria: 'accesorio',
    stock: 'disponible',
    imagen: '/images/sommier-exclusivo-160.jpg',
    tipo: 'sommier'
  },
  {
    id: 'sommier-exclusivo-180',
    nombre: 'Sommier Piero Exclusivo',
    tamaño: '200x180',
    precioPublico: 350000,
    categoria: 'accesorio',
    stock: 'disponible',
    imagen: '/images/sommier-exclusivo-180.jpg',
    tipo: 'sommier'
  },
  {
    id: 'sommier-exclusivo-200',
    nombre: 'Sommier Piero Exclusivo',
    tamaño: '200x200',
    precioPublico: 390000,
    categoria: 'accesorio',
    stock: 'disponible',
    imagen: '/images/sommier-exclusivo-200.jpg',
    tipo: 'sommier'
  }
]

// ============================================================================
// ACCESORIOS
// ============================================================================

const accesorios: Producto[] = [

  // ========== PROTECTORES IMPERMEABLES (4 ELÁSTICOS) ==========
  {
    id: 'protector-80',
    nombre: 'Cubre Colchon Procol (4 elásticos)',
    tamaño: '190x80 cm',
    precioPublico: 16000,
    categoria: 'accesorio',
    stock: 'disponible',
    tipo: 'protector',
    imagen: '/images/protector-80.jpg'
  },
  {
    id: 'protector-90',
    nombre: 'Cubre Colchon Procol (4 elásticos)',
    tamaño: '190x90 cm',
    precioPublico: 17000,
    categoria: 'accesorio',
    stock: 'disponible',
    tipo: 'protector',
    imagen: '/images/protector-90.jpg'
  },
  {
    id: 'protector-100',
    nombre: 'Cubre Colchon Procol (4 elásticos)',
    tamaño: '190x100 cm',
    precioPublico: 18000,
    categoria: 'accesorio',
    stock: 'disponible',
    tipo: 'protector',
    imagen: '/images/protector-100.jpg'
  },
  {
    id: 'protector-140',
    nombre: 'Cubre Colchon Procol (4 elásticos)',
    tamaño: '190x140 cm',
    precioPublico: 22000,
    categoria: 'accesorio',
    stock: 'disponible',
    tipo: 'protector',
    imagen: '/images/protector-140.jpg'
  },
  {
    id: 'protector-160',
    nombre: 'Cubre Colchon Procol (4 elásticos)',
    tamaño: '200x160 cm (Queen)',
    precioPublico: 27000,
    categoria: 'accesorio',
    stock: 'disponible',
    tipo: 'protector',
    imagen: '/images/protector-160.jpg'
  },
  {
    id: 'protector-180',
    nombre: 'Cubre Colchon Procol (4 elásticos)',
    tamaño: '200x180 cm',
    precioPublico: 29000,
    categoria: 'accesorio',
    stock: 'disponible',
    tipo: 'protector',
    imagen: '/images/protector-180.jpg'
  },
  {
    id: 'protector-200',
    nombre: 'Cubre Colchon Procol (4 elásticos)',
    tamaño: '200x200 cm (King)',
    precioPublico: 32000,
    categoria: 'accesorio',
    stock: 'disponible',
    tipo: 'protector',
    imagen: '/images/protector-200.jpg'
  },

  // ========== PROTECTORES LATERALES ==========
  {
    id: 'protector-lateral-80',
    nombre: 'Cubre Colchon Lateral',
    tamaño: '190x80 cm',
    precioPublico: 30000,
    categoria: 'accesorio',
    stock: 'disponible',
    tipo: 'protector',
    imagen: '/images/protector-lateral-80.jpg'
  },
  {
    id: 'protector-lateral-90',
    nombre: 'Cubre Colchon Lateral',
    tamaño: '190x90 cm',
    precioPublico: 31000,
    categoria: 'accesorio',
    stock: 'disponible',
    tipo: 'protector',
    imagen: '/images/protector-lateral-90.jpg'
  },
  {
    id: 'protector-lateral-100',
    nombre: 'Cubre Colchon Lateral',
    tamaño: '190x100 cm',
    precioPublico: 32000,
    categoria: 'accesorio',
    stock: 'disponible',
    tipo: 'protector',
    imagen: '/images/protector-lateral-100.jpg'
  },
  {
    id: 'protector-lateral-140',
    nombre: 'Cubre Colchon Lateral',
    tamaño: '190x140 cm',
    precioPublico: 37000,
    categoria: 'accesorio',
    stock: 'disponible',
    tipo: 'protector',
    imagen: '/images/protector-lateral-140.jpg'
  },
  {
    id: 'protector-lateral-160',
    nombre: 'Cubre Colchon Lateral',
    tamaño: '200x160 cm (Queen)',
    precioPublico: 58000,
    categoria: 'accesorio',
    stock: 'disponible',
    tipo: 'protector',
    imagen: '/images/protector-lateral-160.jpg'
  },
  {
    id: 'protector-lateral-180',
    nombre: 'Cubre Colchon Lateral',
    tamaño: '200x180 cm',
    precioPublico: 63000,
    categoria: 'accesorio',
    stock: 'disponible',
    tipo: 'protector',
    imagen: '/images/protector-lateral-180.jpg'
  },
  {
    id: 'protector-lateral-200',
    nombre: 'Cubre Colchon Lateral',
    tamaño: '200x200 cm (King)',
    precioPublico: 75000,
    categoria: 'accesorio',
    stock: 'disponible',
    tipo: 'protector',
    imagen: '/images/protector-lateral-200.jpg'
  },

  // ========== ALMOHADAS ==========

  // Visco Dream Fit Clásica
  {
    id: 'almohada-visco-clasica-62',
    nombre: 'Almohada Piero Visco Dream Fit Clásica',
    tamaño: '62x40 cm',
    precioPublico: 120000,
    categoria: 'accesorio',
    stock: 'disponible',
    tipo: 'almohada',
    imagen: '/images/almohada-visco-clasica-62.jpg'
  },
  {
    id: 'almohada-visco-clasica-90',
    nombre: 'Almohada Piero Visco Dream Fit Clásica',
    tamaño: '90x40 cm',
    precioPublico: 0,
    categoria: 'accesorio',
    stock: 'consultar',
    tipo: 'almohada',
    imagen: '/images/almohada-visco-clasica-90.jpg'
  },

  // Visco Dream Fit Cervical
  {
    id: 'almohada-visco-cervical-57',
    nombre: 'Almohada Piero Visco Dream Fit Cervical',
    tamaño: '57x37 cm',
    precioPublico: 120000,
    categoria: 'accesorio',
    stock: 'disponible',
    tipo: 'almohada',
    imagen: '/images/almohada-visco-cervical-57.jpg'
  },

  // Visco Dream Tech
  {
    id: 'almohada-visco-tech-70',
    nombre: 'Almohada Piero Visco Dream Tech',
    tamaño: '70x40 cm',
    precioPublico: 115000,
    categoria: 'accesorio',
    stock: 'disponible',
    tipo: 'almohada',
    imagen: '/images/almohada-visco-tech-70.jpg'
  },

  // Micro Max Tech Rollo
  {
    id: 'almohada-micro-rollo-70',
    nombre: 'Almohada Piero Micro Max Tech Rollo',
    tamaño: '70x50 cm',
    precioPublico: 85000,
    categoria: 'accesorio',
    stock: 'disponible',
    tipo: 'almohada',
    imagen: '/images/almohada-micro-rollo-70.jpg'
  },
  {
    id: 'almohada-micro-rollo-80',
    nombre: 'Almohada Piero Micro Max Tech Rollo',
    tamaño: '80x50 cm',
    precioPublico: 90000,
    categoria: 'accesorio',
    stock: 'disponible',
    tipo: 'almohada',
    imagen: '/images/almohada-micro-rollo-80.jpg'
  },
  {
    id: 'almohada-micro-rollo-90',
    nombre: 'Almohada Piero Micro Max Tech Rollo',
    tamaño: '90x50 cm',
    precioPublico: 95000,
    categoria: 'accesorio',
    stock: 'disponible',
    tipo: 'almohada',
    imagen: '/images/almohada-micro-rollo-90.jpg'
  },

  // Fibra Smart Tech Plus
  {
    id: 'almohada-fibra-plus-70',
    nombre: 'Almohada Piero Fibra Smart Tech Plus',
    tamaño: '70x50 cm',
    precioPublico: 65000,
    categoria: 'accesorio',
    stock: 'disponible',
    tipo: 'almohada',
    imagen: '/images/almohada-fibra-plus-70.jpg'
  },
  {
    id: 'almohada-fibra-plus-80',
    nombre: 'Almohada Piero Fibra Smart Tech Plus',
    tamaño: '80x50 cm',
    precioPublico: 67000,
    categoria: 'accesorio',
    stock: 'disponible',
    tipo: 'almohada',
    imagen: '/images/almohada-fibra-plus-80.jpg'
  },

  // Micro Max Tech Núcleo
  {
    id: 'almohada-micro-nucleo-70',
    nombre: 'Almohada Piero Micro Max Tech Núcleo',
    tamaño: '70x40 cm',
    precioPublico: 105000,
    categoria: 'accesorio',
    stock: 'disponible',
    tipo: 'almohada',
    imagen: '/images/almohada-micro-nucleo-70.jpg'
  },

  // Fibra Smart Tech Confort
  {
    id: 'almohada-fibra-confort-70',
    nombre: 'Almohada Piero Fibra Smart Tech Confort',
    tamaño: '70x40 cm',
    precioPublico: 60000,
    categoria: 'accesorio',
    stock: 'disponible',
    tipo: 'almohada',
    imagen: '/images/almohada-fibra-confort-70.jpg'
  },
  {
    id: 'almohada-fibra-confort-80',
    nombre: 'Almohada Piero Fibra Smart Tech Confort',
    tamaño: '80x40 cm',
    precioPublico: 60000,
    categoria: 'accesorio',
    stock: 'disponible',
    tipo: 'almohada',
    imagen: '/images/almohada-fibra-confort-80.jpg'
  },

  // Pendientes (próximamente)
  {
    id: 'almohada-visco-dream-tech-pend',
    nombre: 'Almohada Piero Visco Dream Tech',
    tamaño: 'Próximamente',
    precioPublico: 0,
    categoria: 'accesorio',
    stock: 'consultar',
    tipo: 'almohada',
    imagen: '/images/almohada-visco-dream-tech.jpg'
  },
  {
    id: 'almohada-micro-nucleo-pend',
    nombre: 'Almohada Piero Micro Max Tech Núcleo',
    tamaño: 'Próximamente',
    precioPublico: 0,
    categoria: 'accesorio',
    stock: 'consultar',
    tipo: 'almohada',
    imagen: '/images/almohada-micro-nucleo.jpg'
  },
  {
    id: 'almohada-fibra-smart-pend',
    nombre: 'Almohada Piero Fibra Smart Tech Confort',
    tamaño: 'Próximamente',
    precioPublico: 0,
    categoria: 'accesorio',
    stock: 'consultar',
    tipo: 'almohada',
    imagen: '/images/almohada-fibra-smart.jpg'
  },

  // ========== SÁBANAS ==========
  {
    id: 'sabanas-140',
    nombre: 'Sábanas Bamboo Piero 600 Hilos',
    tamaño: '140x190 cm',
    precioPublico: 94900,
    categoria: 'accesorio',
    stock: 'disponible',
    tipo: 'sabanas',
    imagen: '/images/sabanas-140.jpg'
  },
  {
    id: 'sabanas-160',
    nombre: 'Sábanas Bamboo Piero 600 Hilos',
    tamaño: '160x200 cm (Queen)',
    precioPublico: 124900,
    categoria: 'accesorio',
    stock: 'disponible',
    tipo: 'sabanas',
    imagen: '/images/sabanas-160.jpg'
  },
  {
    id: 'sabanas-200',
    nombre: 'Sábanas Bamboo Piero 600 Hilos',
    tamaño: '200x200 cm (King)',
    precioPublico: 149900,
    categoria: 'accesorio',
    stock: 'disponible',
    tipo: 'sabanas',
    imagen: '/images/sabanas-200.jpg'
  }
]

// ============================================================================
// EXPORTACIÓN PRINCIPAL
// ============================================================================

export const PRODUCTOS: Producto[] = [
  ...meditareEP,
  ...nirvana,
  ...sonnoEP,
  ...regno,
  ...regnoPillow,
  ...gravita,
  ...namaste,
  ...namastePillow,
  ...montreaux,
  ...montreauxPillow,
  ...dreamFitPocket,
  ...dreamFitFoam,
  ...sommiers,
  ...accesorios
]

export const COLECCIONES = {
  meditareEP,
  nirvana,
  sonnoEP,
  regno,
  regnoPillow,
  gravita,
  namaste,
  namastePillow,
  montreaux,
  montreauxPillow,
  dreamFitPocket,
  dreamFitFoam,
  sommiers,
  accesorios
}