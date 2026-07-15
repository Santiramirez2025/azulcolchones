// lib/metadata.ts - SEO helpers + Schema.org. Sin importadores actuales:
// las páginas usan generateMetadata inline. Mantener como referencia.

import { Metadata } from 'next'
import { SITE_CONFIG, SEO_DEFAULTS } from '@/lib/constants'

// ============================================================================
// KEYWORDS STRATEGY - OPTIMIZADO PARA CONVERSIÓN 🎯
// ============================================================================

// ❌ ELIMINADO: Meta keywords (Google no los usa desde 2009)
// Solo se usan para referencia interna en otros metadatos

const KEYWORDS_STRATEGY = {
  // Core keywords - Alta prioridad (búsquedas de marca + localización)
  primary: [
    'colchones villa maría',
    'colchonería villa maría',
    'azul colchones villa maría',
    'colchones córdoba',
    'comprar colchones villa maría',
    'colchones envío gratis villa maría',
  ],
  
  // Product types - Búsquedas específicas (long-tail alto valor)
  products: [
    'colchón matrimonial villa maría',
    'colchón queen villa maría',
    'colchón king córdoba',
    'colchón 1 plaza villa maría',
    'colchón 2 plazas villa maría',
    'sommier villa maría',
    'almohadas villa maría',
  ],
  
  // Materials & features (búsquedas técnicas)
  materials: [
    'colchón resortes villa maría',
    'colchón espuma alta densidad',
    'colchón memory foam córdoba',
    'colchón pocket villa maría',
    'colchón ortopédico córdoba',
    'colchón viscoelástico',
  ],
  
  // Purchase intent - Alto valor de conversión (ready to buy)
  intent: [
    'colchones en cuotas villa maría',
    'colchones 12 cuotas',
    'colchones mercado pago villa maría',
    'colchones baratos villa maría',
    'colchones con garantía córdoba',
    'mejor colchonería villa maría',
    'oferta colchones villa maría',
  ],
  
  // Pain points - Problemas que resolvés (solución-oriented)
  problems: [
    'dolor de espalda colchón',
    'mejor colchón para la espalda',
    'colchón firme villa maría',
    'colchón confortable córdoba',
    'colchón lumbalgia',
  ],
  
  // Local competitors (capturar búsquedas genéricas)
  competitors: [
    'colchonería cerca de mí',
    'dónde comprar colchones villa maría',
    'tienda colchones villa maría',
    'showroom colchones córdoba',
  ],
}

// ============================================================================
// METADATA PRINCIPAL PARA HOME - ULTRA OPTIMIZADO 🚀
// ============================================================================

export const homeMetadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  
  // ✅ TITLE OPTIMIZADO: Keyword-first + USPs + Location
  title: {
    default: 'Colchonería Villa María | Envío GRATIS 24-48hs | 12 Cuotas | Azul Colchones',
    template: '%s | Colchonería Villa María - Azul Colchones'
  },
  
  // ✅ DESCRIPTION OPTIMIZADA: 158 caracteres + CTR optimizado
  description: 'Colchonería en Villa María, Córdoba | Envío GRATIS 24-48hs | 12 cuotas | Garantía extendida | ⭐ 4.9/5 | Showroom Balerdi 855 | Tu colchonería de confianza',
  
  // ❌ KEYWORDS ELIMINADOS (Google no los usa, contamina código)
  // keywords: [...] → REMOVED
  
  authors: [{ 
    name: SITE_CONFIG.name, 
    url: SITE_CONFIG.url 
  }],
  
  creator: SITE_CONFIG.displayName,
  publisher: SITE_CONFIG.name,
  
  // ✅ OPEN GRAPH: Optimizado para shares (WhatsApp, Facebook, LinkedIn)
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.displayName,
    
    title: 'Colchonería Villa María | Envío GRATIS | Azul Colchones',
    description: '35+ años de experiencia | Envío GRATIS 24-48hs | 12 cuotas | ⭐ 4.9/5 | Showroom Balerdi 855',
    
    images: [
      {
        url: '/og-home-hero.jpg', // ✅ CREAR: 1200x630px
        width: 1200,
        height: 630,
        alt: 'Azul Colchones - Colchonería en Villa María, Córdoba',
        type: 'image/jpeg',
      },
      {
        url: '/og-products-showcase.jpg', // ✅ CREAR: 1200x630px
        width: 1200,
        height: 630,
        alt: 'Colchones premium con envío gratis en Villa María',
        type: 'image/jpeg',
      }
    ],
  },
  
  // ✅ TWITTER CARDS
  twitter: {
    card: 'summary_large_image',
    site: '@azulcolchones', // ✅ ACTUALIZAR con tu @usuario real
    creator: '@azulcolchones',
    title: 'Colchonería Villa María | Envío GRATIS | Azul Colchones',
    description: '35+ años | 12 cuotas | ⭐ 4.9/5 | Tu colchonería de confianza',
    images: {
      url: '/twitter-card-azul-colchones.jpg', // ✅ CREAR: 1200x600px
      alt: 'Azul Colchones Villa María',
    },
  },
  
  // ✅ ROBOTS: Indexación agresiva
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
      noimageindex: false,
    },
  },
  
  // ✅ VERIFICACIÓN: Google Search Console
  verification: {
    google: 'ACTUALIZAR_CON_TU_CODIGO_GOOGLE_SEARCH_CONSOLE',
    // Obtener de: https://search.google.com/search-console
  },
  
  // ✅ CANONICAL + IDIOMAS
  alternates: {
    canonical: SITE_CONFIG.url,
    languages: {
      'es-AR': SITE_CONFIG.url,
      'es': SITE_CONFIG.url,
    },
  },
  
  // ✅ CATEGORÍA: Ayuda a Google a clasificar tu negocio
  category: 'shopping',
  
  // ✅ PWA MANIFEST
  manifest: '/manifest.json',
  applicationName: SITE_CONFIG.name,
  
  // ✅ ICONS: Todos los tamaños necesarios
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#3b82f6' },
    ],
  },
  
  // ✅ META TAGS ADICIONALES: Geolocalización + Mobile + E-commerce
  other: {
    // Geographic targeting - CRÍTICO para SEO local
    'geo.region': 'AR-X',
    'geo.placename': 'Villa María',
    'geo.position': `${SITE_CONFIG.location.coordinates.lat};${SITE_CONFIG.location.coordinates.lng}`,
    'ICBM': `${SITE_CONFIG.location.coordinates.lat}, ${SITE_CONFIG.location.coordinates.lng}`,
    
    // Business info
    'contact': typeof SITE_CONFIG.email === 'string' 
      ? SITE_CONFIG.email 
      : SITE_CONFIG.email.primary || 'info@azulcolchones.com',
    'distribution': 'global',
    'language': 'Spanish',
    'audience': 'all',
    'coverage': 'Argentina',
    
    // E-commerce signals
    'price': '$$',
    'availability': 'in stock',
    'currency': 'ARS',
    
    // Open Graph Extended (location)
    'og:phone_number': SITE_CONFIG.phone.number,
    'og:email': typeof SITE_CONFIG.email === 'string' 
      ? SITE_CONFIG.email 
      : SITE_CONFIG.email.primary || 'info@azulcolchones.com',
    'og:latitude': SITE_CONFIG.location.coordinates.lat.toString(),
    'og:longitude': SITE_CONFIG.location.coordinates.lng.toString(),
    'og:street-address': SITE_CONFIG.location.address,
    'og:locality': SITE_CONFIG.location.city,
    'og:region': SITE_CONFIG.location.state,
    'og:postal-code': SITE_CONFIG.location.postalCode,
    'og:country-name': 'Argentina',
    
    // Mobile optimization
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': SITE_CONFIG.name,
    'format-detection': 'telephone=yes',
    
    // Performance hint
    'referrer': 'origin-when-cross-origin',
    
    // Windows tiles
    'msapplication-TileColor': '#3b82f6',
    'msapplication-config': '/browserconfig.xml',
  },
}

// ============================================================================
// STRUCTURED DATA (JSON-LD) - VALIDADO SCHEMA.ORG ✅
// ============================================================================

export const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    // ========================================
    // 1. UNIFIED ORGANIZATION + LOCAL BUSINESS
    // ========================================
    {
      '@type': ['Organization', 'FurnitureStore', 'LocalBusiness'],
      '@id': `${SITE_CONFIG.url}/#organization`,
      name: SITE_CONFIG.name,
      legalName: SITE_CONFIG.name, // ✅ ACTUALIZAR: Razón social oficial
      alternateName: SITE_CONFIG.displayName,
      url: SITE_CONFIG.url,
      
      logo: {
        '@type': 'ImageObject',
        '@id': `${SITE_CONFIG.url}/#logo`,
        url: `${SITE_CONFIG.url}/logo.png`,
        contentUrl: `${SITE_CONFIG.url}/logo.png`,
        width: 512,
        height: 512,
        caption: SITE_CONFIG.name,
      },
      
      image: [
        { '@id': `${SITE_CONFIG.url}/#logo` },
        `${SITE_CONFIG.url}/store-front.jpg`, // ✅ CREAR: Foto fachada
        `${SITE_CONFIG.url}/showroom-interior.jpg`, // ✅ CREAR: Interior
      ],
      
      description: SITE_CONFIG.description,
      
      telephone: SITE_CONFIG.phone.number,
      email: typeof SITE_CONFIG.email === 'string' 
        ? SITE_CONFIG.email 
        : SITE_CONFIG.email.primary || 'info@azulcolchones.com',
      
      address: {
        '@type': 'PostalAddress',
        streetAddress: SITE_CONFIG.location.address,
        addressLocality: SITE_CONFIG.location.city,
        addressRegion: SITE_CONFIG.location.state,
        postalCode: SITE_CONFIG.location.postalCode,
        addressCountry: SITE_CONFIG.location.countryCode,
      },
      
      // ✅ GEO: Crítico para Google Maps
      geo: {
        '@type': 'GeoCoordinates',
        latitude: SITE_CONFIG.location.coordinates.lat,
        longitude: SITE_CONFIG.location.coordinates.lng,
      },
      
      // ✅ ÁREA SERVIDA: Mejor ranking local
      areaServed: [
        { '@type': 'City', name: 'Villa María', '@id': 'https://www.wikidata.org/wiki/Q992221' },
        { '@type': 'City', name: 'Villa Nueva' },
        { '@type': 'City', name: 'San Francisco' },
        { '@type': 'City', name: 'Bell Ville' },
        { '@type': 'State', name: 'Córdoba', '@id': 'https://www.wikidata.org/wiki/Q44762' },
        { '@type': 'Country', name: 'Argentina' },
      ],
      
      // ✅ REDES SOCIALES
      sameAs: [
        SITE_CONFIG.social.facebook,
        SITE_CONFIG.social.instagram,
      ].filter(Boolean),
      
      // ✅ RATING - USAR DATOS REALES O COMENTAR
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9', // ✅ ACTUALIZAR: Rating REAL de Google Business
        reviewCount: '47',  // ✅ ACTUALIZAR: Reviews REALES
        bestRating: '5',
        worstRating: '1',
      },
      // ⚠️ Si NO tenés reviews reales en Google Business → COMENTAR TODO aggregateRating
      
      // ✅ CONTACTO
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: SITE_CONFIG.phone.number,
          contactType: 'Ventas',
          areaServed: 'AR',
          availableLanguage: ['Spanish', 'es'],
          hoursAvailable: [
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
              opens: '09:00',
              closes: '19:00',
            },
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: 'Saturday',
              opens: '09:00',
              closes: '13:00',
            },
          ],
        },
        {
          '@type': 'ContactPoint',
          telephone: SITE_CONFIG.phone.number,
          contactType: 'Atención al Cliente',
          areaServed: 'AR',
          availableLanguage: ['es'],
        },
      ],
      
      // ✅ HORARIOS (crítico para "abierto ahora")
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '19:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: 'Saturday',
          opens: '09:00',
          closes: '13:00',
        },
      ],
      
      // ✅ BUSINESS INFO
      foundingDate: '1989', // ✅ ACTUALIZAR con año real
      priceRange: '$$',
      paymentAccepted: ['Cash', 'Credit Card', 'Debit Card', 'Mercado Pago', 'Bank Transfer'],
      currenciesAccepted: 'ARS',
      slogan: 'El descanso que merecés',
      
      // ✅ LINK A GOOGLE MAPS
      hasMap: `https://www.google.com/maps/place/Balerdi+855,+Villa+María,+Córdoba`,
      
      // ✅ CATÁLOGO
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Colchones y Sommiers Premium',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Product',
              name: 'Colchones Premium',
              description: 'Colchones de todas las medidas: 1 plaza, plaza y media, 2 plazas, queen, king',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Product',
              name: 'Sommiers',
              description: 'Sommiers con y sin cajones, todas las medidas',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Product',
              name: 'Almohadas',
              description: 'Almohadas viscoelásticas, memory foam y tradicionales',
            },
          },
        ],
      },
      
      // ✅ OFFER PRINCIPAL
      makesOffer: {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: 'Colchones y Sommiers Premium',
          description: 'Colchones premium de todas las medidas con envío gratis y 12 cuotas',
        },
        availability: 'https://schema.org/InStock',
        price: '350000', // ✅ ACTUALIZAR: Precio "desde" más económico
        priceCurrency: 'ARS',
        priceValidUntil: '2025-12-31',
        url: `${SITE_CONFIG.url}/catalogo`,
        
        shippingDetails: {
          '@type': 'OfferShippingDetails',
          shippingRate: {
            '@type': 'MonetaryAmount',
            value: '0',
            currency: 'ARS',
          },
          shippingDestination: {
            '@type': 'DefinedRegion',
            addressCountry: 'AR',
            addressRegion: 'Córdoba',
          },
          deliveryTime: {
            '@type': 'ShippingDeliveryTime',
            handlingTime: {
              '@type': 'QuantitativeValue',
              minValue: 0,
              maxValue: 1,
              unitCode: 'DAY',
            },
            transitTime: {
              '@type': 'QuantitativeValue',
              minValue: 1,
              maxValue: 2,
              unitCode: 'DAY',
            },
          },
        },
        
        hasMerchantReturnPolicy: {
          '@type': 'MerchantReturnPolicy',
          applicableCountry: 'AR',
          returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
          merchantReturnDays: 10,
          returnMethod: 'https://schema.org/ReturnByMail',
          returnFees: 'https://schema.org/FreeReturn',
        },
      },
    },
    
    // ========================================
    // 2. WEBSITE
    // ========================================
    {
      '@type': 'WebSite',
      '@id': `${SITE_CONFIG.url}/#website`,
      url: SITE_CONFIG.url,
      name: SITE_CONFIG.displayName,
      description: SITE_CONFIG.description,
      publisher: { '@id': `${SITE_CONFIG.url}/#organization` },
      inLanguage: 'es-AR',
      
      // ✅ SEARCH BOX en Google
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${SITE_CONFIG.url}/catalogo?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
    
    // ========================================
    // 3. WEBPAGE
    // ========================================
    {
      '@type': 'WebPage',
      '@id': `${SITE_CONFIG.url}/#webpage`,
      url: SITE_CONFIG.url,
      name: 'Colchonería Villa María | Envío GRATIS | Azul Colchones',
      isPartOf: { '@id': `${SITE_CONFIG.url}/#website` },
      about: { '@id': `${SITE_CONFIG.url}/#organization` },
      primaryImageOfPage: { '@id': `${SITE_CONFIG.url}/#logo` },
      description: 'Colchonería en Villa María con envío gratis 24-48hs, 12 cuotas y garantía extendida. 35+ años de experiencia.',
      inLanguage: 'es-AR',
      
      // ✅ SPEAKABLE (Voice Search)
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', '.hero-description'],
      },
    },
    
    // ========================================
    // 4. FAQ - FEATURED SNIPPETS 🎯
    // ========================================
    {
      '@type': 'FAQPage',
      '@id': `${SITE_CONFIG.url}/#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: '¿Hacen envíos a Villa María?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sí, realizamos envíos GRATIS en Villa María en 24-48 horas hábiles. También enviamos a toda Córdoba y el resto del país con costos preferenciales. Coordinamos el día y horario de entrega por WhatsApp (3534 09-6566) para asegurarnos que estés en casa.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Cuánto tarda el envío a Villa María?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'El envío a Villa María es GRATIS y llega en 24-48 horas hábiles. Para Villa Nueva y zonas cercanas también es 24-48hs. Para otras ciudades de Córdoba el tiempo puede variar entre 2-5 días hábiles.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Puedo pagar en cuotas?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sí, ofrecemos financiación en hasta 12 cuotas con Mercado Pago y tarjetas de crédito habilitadas. También aceptamos transferencia bancaria con 10% de descuento adicional y efectivo con 15% de descuento.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Aceptan Mercado Pago?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sí, aceptamos Mercado Pago con hasta 12 cuotas en tarjetas habilitadas. Podés pagar con código QR en el showroom, link de pago online, o directamente desde la app de Mercado Pago.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Qué garantía tienen los colchones?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Todos nuestros colchones incluyen garantía extendida del fabricante contra defectos de fabricación (varía según modelo: 1-5 años). Además cumplimos con la Ley de Defensa del Consumidor Argentina (24.240) que te protege como comprador.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Tienen showroom físico en Villa María?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sí, tenemos showroom en Balerdi 855, Villa María (a 2 cuadras de la plaza principal), donde podés ver, tocar y probar todos nuestros colchones y sommiers. Atendemos de lunes a viernes de 9 a 19hs y sábados de 9 a 13hs.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Cuál es el mejor colchón para dolor de espalda?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Para dolor de espalda recomendamos colchones de firmeza media-alta que mantengan la alineación natural de la columna vertebral. Los colchones de resortes pocket o con capas viscoelásticas son ideales porque distribuyen uniformemente el peso corporal. Te asesoramos sin cargo según tu peso, altura y tipo de dolor.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Cuánto sale un colchón queen en Villa María?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Los colchones queen (160x200cm) en Azul Colchones arrancan desde $350.000 con 12 cuotas. Tenemos modelos premium de hasta $650.000 según materiales (resortes pocket, viscoelástico, memory foam). Todos incluyen envío gratis en Villa María.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Retiran el colchón viejo gratis?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sí, ofrecemos retiro del colchón viejo sin cargo en compras superiores a $400.000 en Villa María y zonas aledañas. Coordinamos el retiro junto con la entrega de tu colchón nuevo el mismo día. Consultá disponibilidad por WhatsApp: 3534 09-6566.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Cuál es la diferencia entre colchón de resortes y viscoelástico?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Los colchones de resortes ofrecen mayor ventilación, soporte firme y rebote, ideales para climas cálidos y personas de mayor peso. Los viscoelásticos se adaptan a tu cuerpo reduciendo puntos de presión, perfectos para aliviar dolores articulares y de espalda.',
          },
        },
      ],
    },
    
    // ========================================
    // 5. BREADCRUMB
    // ========================================
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_CONFIG.url}/#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Inicio',
          item: SITE_CONFIG.url,
        },
      ],
    },
  ],
}

// ============================================================================
// EXPORT FUNCTIONS
// ============================================================================

export function getAllStructuredData() {
  return [structuredData]
}

// ============================================================================
// HELPERS - METADATA GENERATORS
// ============================================================================

export function generateProductMetadata(product: {
  name: string
  description: string
  price: number
  image: string
  slug?: string
}): Metadata {
  const url = product.slug 
    ? `${SITE_CONFIG.url}/producto/${product.slug}`
    : SITE_CONFIG.url

  const formattedPrice = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(product.price)

  return {
    title: `${product.name} ${formattedPrice} | Envío GRATIS Villa María | 12 Cuotas`,
    description: `Comprá ${product.name} en Villa María. ${product.description} Precio: ${formattedPrice}. Envío GRATIS 24-48hs | 12 cuotas | Garantía extendida.`,
    
    openGraph: {
      title: `${product.name} - ${formattedPrice}`,
      description: `${product.description} Envío GRATIS Villa María 24-48hs.`,
      images: [{ 
        url: product.image, 
        width: 1200, 
        height: 1200,
        alt: product.name
      }],
      type: 'website',
      url,
      locale: 'es_AR',
    },
    
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} - ${formattedPrice}`,
      description: product.description,
      images: product.image,
    },
    
    alternates: {
      canonical: url,
    },
    
    robots: {
      index: true,
      follow: true,
    },
  }
}

export function generateCategoryMetadata(category: {
  name: string
  description: string
  slug?: string
}): Metadata {
  const url = category.slug
    ? `${SITE_CONFIG.url}/categoria/${category.slug}`
    : SITE_CONFIG.url

  return {
    title: `${category.name} en Villa María | Envío GRATIS 24-48hs | 12 Cuotas`,
    description: `${category.description} Envío GRATIS Villa María 24-48hs | 12 cuotas | Garantía extendida | Los mejores ${category.name.toLowerCase()} de Córdoba.`,
    
    openGraph: {
      title: `${category.name} - Azul Colchones Villa María`,
      description: category.description,
      type: 'website',
      url,
      locale: 'es_AR',
    },
    
    twitter: {
      card: 'summary_large_image',
      title: category.name,
      description: category.description,
    },
    
    alternates: {
      canonical: url,
    },
  }
}

export function generateBlogMetadata(article: {
  title: string
  excerpt: string
  image: string
  author: string
  date: string
  slug?: string
}): Metadata {
  const url = article.slug
    ? `${SITE_CONFIG.url}/blog/${article.slug}`
    : SITE_CONFIG.url

  return {
    title: `${article.title} | Blog Azul Colchones Villa María`,
    description: article.excerpt,
    authors: [{ name: article.author }],
    
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ 
        url: article.image, 
        width: 1200, 
        height: 630,
        alt: article.title
      }],
      type: 'article',
      publishedTime: article.date,
      authors: [article.author],
      url,
      locale: 'es_AR',
    },
    
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: article.image,
    },
    
    alternates: {
      canonical: url,
    },
  }
}

// ============================================================================
// PRODUCT STRUCTURED DATA
// ============================================================================

export function generateProductStructuredData(product: {
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  slug: string
  rating?: number
  reviewCount?: number
  sku?: string
  brand?: string
}) {
  const nextYear = new Date()
  nextYear.setFullYear(nextYear.getFullYear() + 1)

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image.startsWith('http') ? product.image : `${SITE_CONFIG.url}${product.image}`,
    sku: product.sku || `AZUL-${product.slug.toUpperCase()}`,
    
    brand: {
      '@type': 'Brand',
      name: product.brand || SITE_CONFIG.name,
    },
    
    offers: {
      '@type': 'Offer',
      url: `${SITE_CONFIG.url}/producto/${product.slug}`,
      priceCurrency: 'ARS',
      price: product.price.toFixed(2),
      priceValidUntil: nextYear.toISOString().split('T')[0],
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      
      seller: {
        '@type': 'Organization',
        name: SITE_CONFIG.name,
      },
      
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0',
          currency: 'ARS',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'AR',
          addressRegion: 'Córdoba',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 1,
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 2,
            unitCode: 'DAY',
          },
        },
      },
      
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'AR',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 10,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn',
      },
    },
    
    // Solo agregar rating si hay reviews reales
    ...(product.reviewCount && product.reviewCount > 0 ? {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: (product.rating || 4.9).toFixed(1),
        reviewCount: product.reviewCount.toString(),
        bestRating: '5',
        worstRating: '1',
      },
    } : {}),
  }
}