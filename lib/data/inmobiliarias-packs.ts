// lib/data/inmobiliarias-packs.ts
import { Pack, NivelComision } from './types/inmobiliarias'

export const NIVELES_COMISION: NivelComision[] = [
  {
    nombre: 'BÁSICO',
    nivel: 'basico',
    unidadesTrimestre: '1-5 unidades',
    comision: '12-15%',
    descuentoCompra: '8%',
    beneficios: [
      'Precios preferenciales',
      'Asesoramiento personalizado',
      'Entrega estándar'
    ],
    color: 'zinc'
  },
  {
    nombre: 'ESTÁNDAR',
    nivel: 'estandar',
    unidadesTrimestre: '6-12 unidades',
    comision: '15-18%',
    descuentoCompra: '10%',
    beneficios: [
      'Todos los anteriores',
      'Entregas prioritarias',
      'Soporte dedicado'
    ],
    color: 'blue'
  },
  {
    nombre: 'PREMIUM',
    nivel: 'premium',
    unidadesTrimestre: '13-24 unidades',
    comision: '18-20%',
    descuentoCompra: '12%',
    beneficios: [
      'Todos los anteriores',
      'Bonos por volumen',
      'Condiciones especiales'
    ],
    color: 'purple'
  },
  {
    nombre: 'PLATINUM',
    nivel: 'platinum',
    unidadesTrimestre: '25+ o edificios',
    comision: '20-22%',
    descuentoCompra: '15%',
    beneficios: [
      'Todos los anteriores',
      'Cuenta corriente 15 días',
      'Gestor de cuenta exclusivo',
      'Descuentos edificios completos'
    ],
    color: 'amber'
  }
]

export const PACKS: Pack[] = [
  {
    id: 'mono-economico',
    nombre: 'Monoambiente Económico',
    categoria: 'economico',
    imagen: '/packs/mono-economico.jpg',
    imagenes: [
      '/packs/mono-economico-1.jpg',
      '/packs/mono-economico-2.jpg',
      '/packs/mono-economico-3.jpg',
      '/packs/mono-economico-4.jpg'
    ],
    incluye: [
      {
        producto: 'Colchón',
        modelo: 'Meditare EP',
        medida: '190x140x23',
        descripcion: 'Espuma alta densidad, ideal para uso frecuente'
      },
      {
        producto: 'Sommier',
        modelo: 'Sognare',
        medida: '190x140',
        descripcion: 'Reforzado, patas metálicas incluidas'
      },
      {
        producto: 'Almohadas',
        modelo: 'Fibra Smart Tech (x2)',
        medida: '70x50',
        descripcion: 'Hipoalergénicas, lavables'
      },
      {
        producto: 'Protector',
        modelo: 'Impermeable',
        medida: '140x190',
        descripcion: 'Protección total contra líquidos y ácaros'
      }
    ],
    precioInmobiliaria: 680000,
    precioSugerido: 795000,
    ganancia: 115000,
    porcentajeGanancia: 17,
    idealPara: [
      'Monoambientes estándar',
      'Habitaciones secundarias',
      'Alquileres anuales',
      'Presupuestos ajustados'
    ],
    comparativaMercado: {
      proveedor: 'Retail promedio',
      precio: 850000,
      incluye: 'Solo colchón + sommier básico'
    }
  },
  {
    id: '1-dorm-estandar',
    nombre: '1 Dormitorio Estándar',
    categoria: 'economico',
    imagen: '/packs/1-dorm-estandar.jpg',
    imagenes: [
      '/packs/1-dorm-estandar-1.jpg',
      '/packs/1-dorm-estandar-2.jpg',
      '/packs/1-dorm-estandar-3.jpg',
      '/packs/1-dorm-estandar-4.jpg'
    ],
    incluye: [
      {
        producto: 'Colchón',
        modelo: 'Namaste',
        medida: '190x140x24',
        descripcion: 'Tecnología superior, mayor confort'
      },
      {
        producto: 'Sommier',
        modelo: 'Grey',
        medida: '190x140',
        descripcion: 'Reforzado, terminación premium'
      },
      {
        producto: 'Almohadas',
        modelo: 'Fibra Smart Tech Plus (x2)',
        medida: '70x50',
        descripcion: 'Mayor densidad y durabilidad'
      },
      {
        producto: 'Protector',
        modelo: 'Impermeable',
        medida: '140x190',
        descripcion: 'Protección certificada'
      }
    ],
    precioInmobiliaria: 820000,
    precioSugerido: 975000,
    ganancia: 155000,
    porcentajeGanancia: 19,
    idealPara: [
      'Departamentos 1 dormitorio',
      'Alquileres temporarios',
      'Calidad-precio equilibrado'
    ]
  },
  {
    id: '1-dorm-premium',
    nombre: '1 Dormitorio Premium',
    categoria: 'equilibrio',
    imagen: '/packs/1-dorm-premium.jpg',
    imagenes: [
      '/packs/1-dorm-premium-1.jpg',
      '/packs/1-dorm-premium-2.jpg',
      '/packs/1-dorm-premium-3.jpg',
      '/packs/1-dorm-premium-4.jpg'
    ],
    incluye: [
      {
        producto: 'Colchón',
        modelo: 'Sonno EP (RESORTES)',
        medida: '190x140x26',
        descripcion: 'Resortes ensacados, máxima durabilidad'
      },
      {
        producto: 'Sommier',
        modelo: 'Sognare',
        medida: '190x140',
        descripcion: 'Reforzado para resortes'
      },
      {
        producto: 'Almohadas',
        modelo: 'Micro Max Tech (x2)',
        medida: '70x40',
        descripcion: 'Espuma viscoelástica premium'
      },
      {
        producto: 'Protector',
        modelo: 'Impermeable',
        medida: '140x190',
        descripcion: 'Alta protección'
      },
      {
        producto: 'Sábanas',
        modelo: 'Juego completo',
        medida: 'Twin',
        descripcion: 'Calidad superior incluida'
      }
    ],
    precioInmobiliaria: 985000,
    precioSugerido: 1180000,
    ganancia: 195000,
    porcentajeGanancia: 20,
    idealPara: [
      'Departamentos premium',
      'Temporarios ejecutivos',
      'Parejas jóvenes',
      'Cliente busca calidad'
    ],
    destacado: true,
    badge: '⭐ MÁS VENDIDO',
    comparativaMercado: {
      proveedor: 'Bed Collection ML',
      precio: 1350000,
      incluye: 'Solo colchón'
    }
  },
  {
    id: '2-dorm-economico',
    nombre: '2 Dormitorios Económico',
    categoria: 'equilibrio',
    imagen: '/packs/2-dorm-economico.jpg',
    imagenes: [
      '/packs/2-dorm-economico-1.jpg',
      '/packs/2-dorm-economico-2.jpg',
      '/packs/2-dorm-economico-3.jpg',
      '/packs/2-dorm-economico-4.jpg'
    ],
    incluye: [
      {
        producto: 'Dormitorio Principal',
        modelo: 'Namaste 200x160x24 + Sommier Grey Queen',
        medida: 'Queen',
        descripcion: 'Colchón Queen + sommier + 2 almohadas + protector'
      },
      {
        producto: 'Dormitorio Secundario',
        modelo: 'Meditare EP 190x140x23 + Sommier Sognare',
        medida: '1½ Plaza',
        descripcion: 'Colchón 1½ + sommier + 2 almohadas + protector'
      }
    ],
    precioInmobiliaria: 1850000,
    precioSugerido: 2195000,
    ganancia: 345000,
    porcentajeGanancia: 19,
    idealPara: [
      'Departamentos 2 dormitorios',
      'Familias',
      'Alquileres largos',
      'Presupuesto moderado'
    ]
  },
  {
    id: '2-dorm-completo',
    nombre: '2 Dormitorios Completo',
    categoria: 'equilibrio',
    imagen: '/packs/2-dorm-completo.jpg',
    imagenes: [
      '/packs/2-dorm-completo-1.jpg',
      '/packs/2-dorm-completo-2.jpg',
      '/packs/2-dorm-completo-3.jpg',
      '/packs/2-dorm-completo-4.jpg'
    ],
    incluye: [
      {
        producto: 'Dormitorio Principal',
        modelo: 'Regno 200x160x27 (RESORTES) + Sommier Grey Queen',
        medida: 'Queen',
        descripcion: 'Pack completo Queen con resortes premium'
      },
      {
        producto: 'Dormitorio Secundario',
        modelo: 'Sonno EP 190x140x26 (RESORTES) + Sommier',
        medida: '1½ Plaza',
        descripcion: 'Pack completo 1½ con resortes'
      }
    ],
    precioInmobiliaria: 2350000,
    precioSugerido: 2820000,
    ganancia: 470000,
    porcentajeGanancia: 20,
    idealPara: [
      'Departamentos premium 2 dorm',
      'Familias temporarias',
      'Contratos 6-12 meses',
      'Zonas premium'
    ],
    badge: '🔥 ALTA RENTABILIDAD'
  },
  {
    id: 'premium-ejecutivo',
    nombre: 'Premium Ejecutivo',
    categoria: 'premium',
    imagen: '/packs/premium-ejecutivo.jpg',
    imagenes: [
      '/packs/premium-ejecutivo-1.jpg',
      '/packs/premium-ejecutivo-2.jpg',
      '/packs/premium-ejecutivo-3.jpg',
      '/packs/premium-ejecutivo-4.jpg'
    ],
    incluye: [
      {
        producto: 'Colchón',
        modelo: 'Gravita 200x160x29 (HÍBRIDO)',
        medida: 'Queen',
        descripcion: 'Resortes + Espuma Viscoelástica'
      },
      {
        producto: 'Sommier',
        modelo: 'Brown Queen',
        medida: '200x160',
        descripcion: 'Premium, terminación lujo'
      },
      {
        producto: 'Almohadas',
        modelo: 'Visco Dream Tech (x2)',
        medida: '70x40',
        descripcion: 'Memory foam de alta gama'
      },
      {
        producto: 'Protector',
        modelo: 'Premium Queen',
        medida: '160x200',
        descripcion: 'Máxima protección'
      },
      {
        producto: 'Sábanas',
        modelo: 'Bamboo 600 hilos (x2 juegos)',
        medida: 'Queen',
        descripcion: 'Calidad hotelera 5 estrellas'
      }
    ],
    precioInmobiliaria: 1850000,
    precioSugerido: 2250000,
    ganancia: 400000,
    porcentajeGanancia: 22,
    idealPara: [
      'Airbnb Premium',
      'Ejecutivos extranjeros',
      'Temporarios corporativos',
      'Contratos USD'
    ],
    badge: '💎 PREMIUM'
  },
  {
    id: 'luxury-pillow-140',
    nombre: 'Luxury Pillow Top',
    categoria: 'premium',
    imagen: '/packs/luxury-pillow-140.jpg',
    imagenes: [
      '/packs/luxury-pillow-140-1.jpg',
      '/packs/luxury-pillow-140-2.jpg',
      '/packs/luxury-pillow-140-3.jpg',
      '/packs/luxury-pillow-140-4.jpg'
    ],
    incluye: [
      {
        producto: 'Colchón',
        modelo: 'Montreaux Pillow Top',
        medida: '190x140x34',
        descripcion: 'Tecnología Pillow Top, máximo confort'
      },
      {
        producto: 'Sommier',
        modelo: 'Exclusivo',
        medida: '190x140',
        descripcion: 'Diseño premium'
      },
      {
        producto: 'Almohadas',
        modelo: 'Visco Dream Tech (x2)',
        medida: '70x40',
        descripcion: 'Memory foam premium'
      },
      {
        producto: 'Protector',
        modelo: 'Premium',
        medida: '140x190',
        descripcion: 'Alta gama'
      },
      {
        producto: 'Sábanas',
        modelo: 'Bamboo 600 hilos',
        medida: 'Twin',
        descripcion: 'Lujo absoluto'
      }
    ],
    precioInmobiliaria: 1620000,
    precioSugerido: 2000000,
    ganancia: 380000,
    porcentajeGanancia: 23,
    idealPara: [
      'Departamentos categoría AAA',
      'Penthouses',
      'Propiedades luxury',
      'Cliente premium'
    ],
    badge: '👑 LUXURY'
  },
  {
    id: 'luxury-pillow-queen',
    nombre: 'Luxury Queen Pillow Top',
    categoria: 'premium',
    imagen: '/packs/luxury-pillow-queen.jpg',
    imagenes: [
      '/packs/luxury-pillow-queen-1.jpg',
      '/packs/luxury-pillow-queen-2.jpg',
      '/packs/luxury-pillow-queen-3.jpg',
      '/packs/luxury-pillow-queen-4.jpg'
    ],
    incluye: [
      {
        producto: 'Colchón',
        modelo: 'Montreaux Pillow Top Queen',
        medida: '200x160x34',
        descripcion: 'Top de línea Piero'
      },
      {
        producto: 'Sommier',
        modelo: 'Exclusivo Queen',
        medida: '200x160',
        descripcion: 'Diseño premium'
      },
      {
        producto: 'Almohadas',
        modelo: 'Visco Dream Tech (x2)',
        medida: '70x40',
        descripcion: 'Memory foam'
      },
      {
        producto: 'Protector',
        modelo: 'Premium Queen',
        medida: '160x200',
        descripcion: 'Máxima calidad'
      },
      {
        producto: 'Sábanas',
        modelo: 'Bamboo 600h (x2 juegos)',
        medida: 'Queen',
        descripcion: 'Doble juego incluido'
      }
    ],
    precioInmobiliaria: 2095000,
    precioSugerido: 2620000,
    ganancia: 525000,
    porcentajeGanancia: 25,
    idealPara: [
      'Propiedades ultra premium',
      'Desarrollos boutique',
      'Airbnb Premium Plus',
      'Máxima rentabilidad'
    ],
    destacado: true,
    badge: '🚀 MÁXIMA GANANCIA'
  }
]