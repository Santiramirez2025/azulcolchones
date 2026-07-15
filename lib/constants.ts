// lib/constants.ts - ULTRA OPTIMIZED CONFIG - AZUL COLCHONES VILLA MARÍA 🚀

// ============================================================================
// SITE CONFIGURATION - CRÍTICO PARA SEO
// ============================================================================
export const SITE_CONFIG = {
  // Brand Identity
  name: 'Azul Colchones',
  displayName: 'Azul Colchones Villa María',
  legalName: 'Azul Colchones', // TODO: Razón social legal completa
  domain: 'azulcolchones.com.ar',
  url: 'https://azulcolchones.com',
  
  // Location - NAP (Name, Address, Phone) CONSISTENCY IS CRITICAL
  location: {
    city: 'Villa María',
    state: 'Córdoba',
    country: 'Argentina',
    countryCode: 'AR',
    address: 'Balerdi 855', // CRITICAL: Must match Google Business Profile EXACTLY
    addressExtended: 'Balerdi 855, Villa María, Córdoba',
    postalCode: '5900',
    neighborhood: 'Centro', // Opcional pero útil para local SEO
    coordinates: {
      lat: -32.4117, // Coordenadas exactas para LocalBusiness schema
      lng: -63.2402
    }
  },
  
  // Contact - CONSISTENCY ACROSS ALL PLATFORMS
  phone: {
    number: '+54 9 3534 09-6566', // E.164 format for schema
    display: '+54 9 3534 09-6566', // User-friendly format
    displayInternational: '+54 9 3534 09-6566',
    whatsapp: '+54 9 3534 09-6566', // Sin + para WhatsApp API
    link: 'tel:+54 9 3534 09-6566' // Para href
  },
  email: {
    primary: 'info@azulcolchones.com.ar',
    sales: 'ventas@azulcolchones.com.ar',
    support: 'soporte@azulcolchones.com.ar',
    privacy: 'privacidad@azulcolchones.com.ar'
  },
  
  // Social Media - Autoridad y señales sociales
  social: {
    facebook: 'https://facebook.com/azulcolchones',
    instagram: 'https://instagram.com/azulcolchones',
    whatsapp: 'https://wa.me/5493534096566',
    youtube: '', // Opcional: videos de productos
    linkedin: '', // Opcional: B2B
    tiktok: '', // Opcional: contenido viral
  },
  
  // Branding & Messaging
  tagline: 'Tu colchonería de confianza en Villa María',
  slogan: '35+ años cuidando tu descanso', // UPDATED: Más credibilidad
  description: 'Colchonería familiar en Villa María, Córdoba con 35+ años de experiencia. Colchones premium Piero, sommiers y almohadas. Envío GRATIS en Villa María, 12 cuotas, garantía de 3 años.',
  
  // Brand Values - Para About page
  values: [
    'Calidad premium garantizada',
    '35+ años de experiencia familiar',
    'Asesoramiento personalizado experto',
    'Garantía de 3 años extendida',
    'Showroom físico en Villa María',
    'Entrega e instalación profesional'
  ],

  // Trust Signals
  trustSignals: {
    yearsExperience: 35,
    warrantyYears: 3,
    satisfactionRate: 98,
    reviewsCount: 1847,
    rating: 4.9
  }
}

// ============================================================================
// TRUST BAR - CONVERSIÓN CRÍTICA
// ============================================================================
export const TRUST_BAR_ITEMS = [
  { 
    icon: 'Truck', 
    text: 'Envío Gratis',
    highlight: 'Villa María',
    description: 'Entrega 2-3 días hábiles',
    seoText: 'Envío gratis en Villa María y zona'
  },
  { 
    icon: 'CreditCard', 
    text: '12 Cuotas',
    highlight: 'Con tarjeta',
    description: 'Mercado Pago y tarjetas',
    seoText: 'Hasta 12 cuotas con todas las tarjetas'
  },
  { 
    icon: 'Shield', 
    text: 'Garantía',
    highlight: '3 Años',
    description: 'Defectos de fabricación',
    seoText: '3 años de garantía contra defectos de fabricación'
  },
  { 
    icon: 'Award', 
    text: 'Experiencia',
    highlight: '35+ Años',
    description: 'Negocio familiar',
    seoText: '35 años de experiencia en descanso y confort'
  }
]

// ============================================================================
// PAYMENT METHODS - E-COMMERCE
// ============================================================================
export const PAYMENT_METHODS = {
  mercadopago: {
    name: 'Mercado Pago',
    installments: [1, 3, 6, 9, 12],
    maxInstallments: 12,
    icon: '/icons/mercadopago.svg',
    description: 'Hasta 12 cuotas',
    fees: {
      1: 0,
      3: 0.18,
      6: 0.27,
      9: 0.38,
      12: 0.52
    }
  },
  transfer: {
    name: 'Transferencia Bancaria',
    discount: 10, // 10% descuento
    description: '10% de descuento - Pago al contado',
    banks: [
      {
        name: 'Banco Macro',
        cbu: 'XXXXXXXXXXXXXXXXXXX', // TODO: Completar
        alias: 'azul.colchones', // TODO: Completar
        holder: 'Azul Colchones'
      }
    ]
  },
  cash: {
    name: 'Efectivo en Local',
    discount: 15, // 15% descuento efectivo
    description: '15% OFF pagando en efectivo en showroom',
    location: 'Balerdi 855, Villa María'
  },
  cards: {
    name: 'Tarjetas de Crédito/Débito',
    accepted: ['Visa', 'Mastercard', 'American Express', 'Cabal', 'Naranja'],
    installments: 12,
    description: 'Todas las tarjetas - Terminal propia'
  }
}

// ============================================================================
// SHIPPING ZONES - LOCAL SEO CRÍTICO
// ============================================================================
export const SHIPPING_ZONES = {
  villamaria: {
    name: 'Villa María',
    cities: ['Villa María', 'Villa Nueva'],
    postcodes: ['5900'],
    cost: 0,
    deliveryTime: '2-3 días hábiles',
    description: 'Envío GRATIS',
    seoDescription: 'Envío gratis en Villa María y Villa Nueva con entrega en 2-3 días hábiles'
  },
  zonaCercana: {
    name: 'Zona Cercana',
    cities: ['Bell Ville', 'San Francisco', 'Río Tercero', 'Arroyito'],
    radius: '100km',
    cost: 0,
    deliveryTime: '3-5 días hábiles',
    description: 'Envío GRATIS hasta 100km',
    seoDescription: 'Envío gratis a Bell Ville, San Francisco, Río Tercero y localidades cercanas'
  },
  cordobaCapital: {
    name: 'Córdoba Capital',
    cities: ['Córdoba'],
    postcodes: ['5000', '5001', '5002', '5003', '5004', '5005', '5006', '5007', '5008', '5009'],
    cost: 8000,
    deliveryTime: '3-5 días hábiles',
    description: 'Envío económico',
    seoDescription: 'Envío a Córdoba Capital con tarifa económica'
  },
  cordobaProvincia: {
    name: 'Resto de Córdoba',
    cost: 12000,
    deliveryTime: '5-7 días hábiles',
    description: 'Envío a toda la provincia',
    seoDescription: 'Envío a toda la provincia de Córdoba'
  },
  nacional: {
    name: 'Resto del País',
    cost: 20000,
    deliveryTime: '7-10 días hábiles',
    description: 'Envío a toda Argentina',
    seoDescription: 'Envío a todo el país con transporte especializado'
  }
}

// ============================================================================
// BUSINESS HOURS - LocalBusiness Schema
// ============================================================================
export const BUSINESS_HOURS = {
  weekdays: {
    days: 'Lunes a Viernes',
    hours: '09:00 - 19:00',
    opens: '09:00',
    closes: '19:00'
  },
  saturday: {
    days: 'Sábados',
    hours: '09:00 - 13:00',
    opens: '09:00',
    closes: '13:00'
  },
  sunday: {
    days: 'Domingos',
    hours: 'Cerrado',
    opens: null,
    closes: null
  },
  // Schema.org format
  schema: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '19:00'
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '09:00',
      closes: '13:00'
    }
  ]
}

// ============================================================================
// SEO DEFAULTS - CRÍTICO PARA RANKINGS
// ============================================================================
export const SEO_DEFAULTS = {
  // Home defaults
  title: 'Azul Colchones Villa María | Colchonería Premium en Córdoba - 35 Años',
  titleTemplate: '%s | Azul Colchones Villa María',
  description: 'Colchonería premium en Villa María, Córdoba con 35+ años de experiencia familiar. ✓ Colchones Piero ✓ Envío GRATIS ✓ 12 cuotas ✓ Garantía 3 años ✓ Showroom Balerdi 855',
  
  // Keywords - Ordenadas por prioridad SEO
  keywords: [
    // PRIMARY - Alta intención comercial + local
    'colchones villa maría',
    'colchonería villa maría',
    'colchones piero villa maría',
    'sommier villa maría',
    'colchones villa maría córdoba',
    
    // SECONDARY - Específicos de producto
    'colchón 2 plazas villa maría',
    'colchón matrimonial villa maría',
    'colchón 1 plaza villa maría',
    'sommier 2 plazas villa maría',
    'almohadas villa maría',
    
    // TERTIARY - Long-tail comerciales
    'donde comprar colchones villa maría',
    'colchonería balerdi villa maría',
    'tienda colchones villa maría',
    'colchones envío gratis villa maría',
    'colchones en cuotas villa maría',
    
    // Tecnología/Tipo
    'colchones memory foam villa maría',
    'colchones viscoelásticos córdoba',
    'colchones resortes ensacados',
    'colchones ortopédicos villa maría',
    
    // Comerciales amplios
    'colchones córdoba',
    'sommiers córdoba',
    'colchonería córdoba',
    'colchones bell ville',
    'colchones san francisco',
    
    // Beneficios
    '12 cuotas colchones',
    'garantía colchones villa maría',
    'colchones con garantía córdoba',
    
    // Marca
    'azul colchones',
    'azul colchones villa maría',
    'piero colchones villa maría'
  ],
  
  // Open Graph
  ogImage: '/og-home.jpg',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  twitterCard: 'summary_large_image',
  
  // Canonical
  canonicalBase: 'https://azulcolchones.com'
}

// ============================================================================
// LEGAL INFO - Compliance
// ============================================================================
export const LEGAL_INFO = {
  businessName: 'Azul Colchones', // TODO: Razón social completa legal
  cuit: 'XX-XXXXXXXX-X', // TODO: CUIT real
  taxStatus: 'Responsable Inscripto', // o Monotributista
  address: 'Balerdi 855, Villa María, Córdoba, Argentina',
  postalCode: '5900',
  
  // Defensa del Consumidor
  defenseConsumer: {
    phone: '0800-666-1518',
    web: 'https://www.argentina.gob.ar/defensadelconsumidor',
    cordoba: 'https://consumidor.cba.gov.ar'
  },
  
  // Autoridad de Protección de Datos
  dataProtection: {
    authority: 'Agencia de Acceso a la Información Pública',
    web: 'https://www.argentina.gob.ar/aaip',
    phone: '0800-222-3425'
  }
}

// ============================================================================
// CURRENCY - Argentina
// ============================================================================
export const CURRENCY = {
  code: 'ARS',
  symbol: '$',
  locale: 'es-AR',
  format: (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  },
  formatWithDecimals: (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  }
}

// ============================================================================
// PRODUCT CATEGORIES - Jerarquía SEO
// ============================================================================
export const PRODUCT_CATEGORIES = [
  {
    slug: 'colchones',
    name: 'Colchones',
    pluralName: 'Colchones',
    description: 'Colchones premium de todas las medidas, tecnologías y firmezas',
    metaDescription: 'Colchones de 1 plaza, 2 plazas, Queen y King. Memory foam, resortes, viscoelásticos. Envío gratis en Villa María.',
    icon: 'Bed',
    priority: 1,
    subcategories: [
      { slug: '1-plaza', name: '1 Plaza' },
      { slug: '2-plazas', name: '2 Plazas' },
      { slug: 'queen', name: 'Queen' },
      { slug: 'king', name: 'King' }
    ]
  },
  {
    slug: 'sommiers',
    name: 'Sommiers',
    pluralName: 'Sommiers',
    description: 'Sommiers completos con base reforzada y colchón incluido',
    metaDescription: 'Sommiers de 1 y 2 plazas con colchón. Base reforzada, alta durabilidad. 12 cuotas.',
    icon: 'Box',
    priority: 2
  },
  {
    slug: 'almohadas',
    name: 'Almohadas',
    pluralName: 'Almohadas',
    description: 'Almohadas ergonómicas, memory foam y tradicionales',
    metaDescription: 'Almohadas ergonómicas, viscoelásticas y memory foam. Ideales para cervicales.',
    icon: 'CloudRain',
    priority: 3
  },
  {
    slug: 'accesorios',
    name: 'Accesorios',
    pluralName: 'Accesorios',
    description: 'Protectores, acolchados, sábanas y más',
    metaDescription: 'Protectores impermeables, acolchados, sábanas y accesorios para tu descanso.',
    icon: 'Package',
    priority: 4
  }
]

// ============================================================================
// WHATSAPP MESSAGES - Conversión
// ============================================================================
export const WHATSAPP_MESSAGES = {
  general: '¡Hola! Me interesa conocer más sobre los colchones de Azul Colchones en Villa María',
  product: (productName: string) => `¡Hola! Me interesa el producto: ${productName}. ¿Está disponible?`,
  quote: 'Hola, me gustaría recibir una cotización personalizada',
  showroom: '¡Hola! Quiero visitar el showroom en Balerdi 855, Villa María. ¿Cuál es el horario?',
  delivery: 'Hola, quisiera consultar sobre tiempos y costos de envío a mi zona',
  financing: '¡Hola! Quiero consultar sobre opciones de financiación y cuotas',
  warranty: 'Hola, quisiera información sobre la garantía de los colchones'
}

// ============================================================================
// CAMPAIGNS - Eventos comerciales Argentina
// ============================================================================
export const CAMPAIGNS = {
  hotSale: {
    name: 'Hot Sale',
    month: 5, // Mayo
    startDay: 20,
    endDay: 31,
    discount: 40,
    code: 'HOTSALE40',
    active: false // Toggle según temporada
  },
  cyberMonday: {
    name: 'Cyber Monday',
    month: 11, // Noviembre
    startDay: 1,
    endDay: 10,
    discount: 45,
    code: 'CYBER45',
    active: false
  },
  buentFin: {
    name: 'Buen Fin',
    month: 11, // Noviembre
    startDay: 15,
    endDay: 22,
    discount: 35,
    code: 'BUENFIN35',
    active: false
  },
  blackFriday: {
    name: 'Black Friday',
    month: 11, // Noviembre (último viernes)
    discount: 50,
    code: 'BLACK50',
    active: false
  }
}

// ============================================================================
// ANIMATION CONFIG - Performance
// ============================================================================
export const ANIMATION_CONFIG = {
  particles: {
    count: 6,
    minDuration: 10,
    maxDuration: 20
  },
  scroll: {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  },
  transitions: {
    ease: [0.4, 0, 0.2, 1],
    duration: 0.3
  },
  reducedMotion: {
    // Respect prefers-reduced-motion
    enabled: true
  }
}

// ============================================================================
// PERFORMANCE THRESHOLDS - Core Web Vitals
// ============================================================================
export const PERFORMANCE_TARGETS = {
  LCP: 2.5, // Largest Contentful Paint (seconds)
  FID: 100, // First Input Delay (milliseconds)
  CLS: 0.1, // Cumulative Layout Shift
  INP: 200, // Interaction to Next Paint (milliseconds)
  TTFB: 800 // Time to First Byte (milliseconds)
}

// ============================================================================
// COMPETITOR DATA - Para análisis (privado, no exponer)
// ============================================================================
export const COMPETITORS = {
  // Solo para referencia interna - NO usar en frontend
  local: [
    'Colchonería XXX Villa María',
    'Sommiers YYY Córdoba'
  ],
  regional: [
    'Colchones ZZZ Córdoba Capital'
  ]
}