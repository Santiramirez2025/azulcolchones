// app/layout.tsx - ULTRA OPTIMIZED ⚡ DUAL STRATEGY - Azul Colchones
// SEO Level: SENIOR | Performance: A+ | Strategy: Outlet + Fábrica

import type { Metadata, Viewport } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { Suspense } from 'react'
import './globals.css'
import Header from '../components/sections/Header'
import Footer from '../components/sections/Footer'
import WhatsAppButton from '../components/WhatsAppButton'
import { AuthProvider } from '@/lib/context/AuthContext'
import { Analytics } from '@/components/analytics'

// ============================================================================
// FONTS - ULTRA OPTIMIZED ⚡
// ============================================================================

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  weight: ['400', '500', '600', '700'],
  fallback: ['system-ui', 'sans-serif'],
  adjustFontFallback: true,
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  preload: true,
  weight: ['600', '700', '800'],
  fallback: ['system-ui', 'sans-serif'],
  adjustFontFallback: true,
})

// ============================================================================
// VIEWPORT - MOBILE FIRST ✅
// ============================================================================

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#18181b' },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' }
  ],
  colorScheme: 'dark light',
}

// ============================================================================
// METADATA - SEO DUAL STRATEGY 🎯 (ULTRA OPTIMIZADO)
// ============================================================================

export const metadata: Metadata = {
  metadataBase: new URL('https://azulcolchones.com'),
  
  // ✅ TITLE DUAL STRATEGY (Outlet + Fábrica)
  title: {
    default: 'Azul Colchones Villa María | Outlet 60% + Piero Fábrica 40% | Envío Gratis',
    template: '%s | Azul Colchones Villa María'
  },
  
  // ✅ DESCRIPTION OPTIMIZADA (Dual Strategy + Local)
  description: 'Colchones Piero en Villa María: Outlet (60% OFF, hoy) o Piero Fábrica (40% OFF, 7-10 días). Envío gratis, 12 cuotas. 35+ años experiencia. Showroom Balerdi 855.',
  
  applicationName: 'Azul Colchones',
  
  authors: [{ name: 'Azul Colchones', url: 'https://azulcolchones.com' }],
  creator: 'Azul Colchones Villa María',
  publisher: 'Azul Colchones',
  
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  
  // ✅ OPEN GRAPH DUAL STRATEGY
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://azulcolchones.com',
    siteName: 'Azul Colchones Villa María',
    title: 'Azul Colchones | Outlet 60% + Piero Fábrica 40% | Villa María',
    description: 'Outlet con entrega HOY (60% OFF) o Piero Fábrica directo (40% OFF, 7-10 días). Envío gratis, 12 cuotas. ¡Vos elegís!',
    images: [
      {
        url: '/og-image-home.jpg',
        width: 1200,
        height: 630,
        alt: 'Azul Colchones - Outlet y Piero Fábrica Villa María',
        type: 'image/jpeg',
      },
      {
        url: '/og-image-square.jpg',
        width: 1080,
        height: 1080,
        alt: 'Azul Colchones Villa María - 35 años de experiencia',
        type: 'image/jpeg',
      }
    ],
  },
  
  // ✅ TWITTER CARD
  twitter: {
    card: 'summary_large_image',
    site: '@azulcolchones',
    creator: '@azulcolchones',
    title: 'Azul Colchones | Outlet 60% + Fábrica 40% | Villa María',
    description: '35+ años | Outlet (hoy) o Fábrica (7-10 días) | Envío gratis | 12 cuotas',
    images: {
      url: '/twitter-image.jpg',
      alt: 'Azul Colchones Villa María',
    },
  },
  
  // ✅ ROBOTS - INDEXACIÓN AGRESIVA
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // ✅ VERIFICACIÓN - ENV VARIABLES
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'ACTUALIZAR_CON_TU_CODIGO',
    other: {
      'facebook-domain-verification': process.env.NEXT_PUBLIC_FACEBOOK_VERIFICATION || 'ACTUALIZAR_CON_TU_CODIGO',
    },
  },
  
  // ✅ CANONICAL + ALTERNATES
  alternates: {
    canonical: 'https://azulcolchones.com',
    languages: {
      'es-AR': 'https://azulcolchones.com',
      'es': 'https://azulcolchones.com',
    },
  },
  
  // ✅ ICONS COMPLETOS
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
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
  
  manifest: '/manifest.json',
  category: 'shopping',
  
  // ✅ ADDITIONAL META TAGS
  other: {
    'geo.region': 'AR-X',
    'geo.placename': 'Villa María',
    'geo.position': '-32.4115;-63.2407',
    'ICBM': '-32.4115, -63.2407',
    'contact': 'info@azulcolchones.com',
    'distribution': 'global',
    'language': 'Spanish',
    'audience': 'all',
    'coverage': 'Argentina',
    'price': '$$',
    'availability': 'in stock',
    'currency': 'ARS',
    'og:phone_number': '+54-9-353-4017332',
    'og:email': 'info@azulcolchones.com',
    'og:latitude': '-32.4115',
    'og:longitude': '-63.2407',
    'og:street-address': 'Balerdi 855',
    'og:locality': 'Villa María',
    'og:region': 'Córdoba',
    'og:postal-code': '5900',
    'og:country-name': 'Argentina',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'Azul Colchones',
    'mobile-web-app-capable': 'yes',
    'format-detection': 'telephone=yes',
    'msapplication-TileColor': '#3b82f6',
    'msapplication-config': '/browserconfig.xml',
    'referrer': 'origin-when-cross-origin',
  },
}

// ============================================================================
// STRUCTURED DATA - DUAL STRATEGY 🎯
// ============================================================================

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'FurnitureStore', 'LocalBusiness'],
      '@id': 'https://azulcolchones.com/#organization',
      name: 'Azul Colchones',
      legalName: 'Azul Colchones',
      alternateName: 'Azul Colchones Villa María',
      url: 'https://azulcolchones.com',
      
      logo: {
        '@type': 'ImageObject',
        '@id': 'https://azulcolchones.com/#logo',
        url: 'https://azulcolchones.com/logo.png',
        contentUrl: 'https://azulcolchones.com/logo.png',
        width: 512,
        height: 512,
        caption: 'Azul Colchones Logo',
      },
      
      image: [
        { '@id': 'https://azulcolchones.com/#logo' },
        'https://azulcolchones.com/store-front.jpg',
        'https://azulcolchones.com/showroom-interior.jpg',
      ],
      
      description: 'Colchones Piero en Villa María con dos modalidades: Outlet (60% OFF, entrega inmediata) y Piero Fábrica (30-40% OFF, directo de fábrica en 7-10 días). 35+ años de experiencia.',
      
      telephone: '+54-9-353-4017332',
      email: 'info@azulcolchones.com',
      
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Balerdi 855',
        addressLocality: 'Villa María',
        addressRegion: 'Córdoba',
        postalCode: '5900',
        addressCountry: 'AR'
      },
      
      geo: {
        '@type': 'GeoCoordinates',
        latitude: -32.4115,
        longitude: -63.2407
      },
      
      areaServed: [
        { '@type': 'City', name: 'Villa María', '@id': 'https://www.wikidata.org/wiki/Q992221' },
        { '@type': 'City', name: 'Villa Nueva' },
        { '@type': 'City', name: 'San Francisco' },
        { '@type': 'City', name: 'Bell Ville' },
        { '@type': 'State', name: 'Córdoba', '@id': 'https://www.wikidata.org/wiki/Q44762' },
        { '@type': 'Country', name: 'Argentina' }
      ],
      
      sameAs: [
        'https://www.facebook.com/azulcolchones',
        'https://www.instagram.com/azulcolchones',
      ],
      
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '47',
        bestRating: '5',
        worstRating: '1'
      },
      
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+54-9-353-4017332',
          contactType: 'Ventas',
          areaServed: 'AR',
          availableLanguage: ['Spanish', 'es'],
          hoursAvailable: [
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
      ],
      
      openingHoursSpecification: [
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
      ],
      
      foundingDate: '1989',
      priceRange: '$$',
      paymentAccepted: ['Cash', 'Credit Card', 'Debit Card', 'Mercado Pago', 'Bank Transfer'],
      currenciesAccepted: 'ARS',
      slogan: 'El descanso que merecés',
      
      hasMap: 'https://www.google.com/maps/place/Balerdi+855,+Villa+Mar%C3%ADa,+Córdoba',
      
      // DUAL STRATEGY: Outlet + Fábrica
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Colchones Piero - Outlet y Fábrica',
        itemListElement: [
          {
            '@type': 'Offer',
            name: 'Outlet Colchones Premium',
            description: 'Stock limitado con hasta 60% de descuento y entrega inmediata',
            itemOffered: {
              '@type': 'Product',
              name: 'Colchones Premium Outlet',
              description: 'Colchones Piero en stock con entrega HOY'
            },
            availability: 'https://schema.org/LimitedAvailability',
            url: 'https://azulcolchones.com/catalogo'
          },
          {
            '@type': 'Offer',
            name: 'Piero Fábrica Directo',
            description: 'Colchones directos de fábrica con 30-40% OFF, entrega en 7-10 días',
            itemOffered: {
              '@type': 'Product',
              name: 'Colchones Piero Fábrica',
              description: 'Pedidos directos de fábrica sin intermediarios'
            },
            availability: 'https://schema.org/PreOrder',
            url: 'https://azulcolchones.com/piero-fabrica'
          }
        ]
      },
      
      makesOffer: {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: 'Colchones Piero Premium',
          description: 'Colchones premium Piero con dos modalidades de compra: Outlet o Fábrica'
        },
        availability: 'https://schema.org/InStock',
        price: '220000',
        priceCurrency: 'ARS',
        priceValidUntil: '2025-12-31',
        url: 'https://azulcolchones.com',
        
        shippingDetails: {
          '@type': 'OfferShippingDetails',
          shippingRate: {
            '@type': 'MonetaryAmount',
            value: '0',
            currency: 'ARS'
          },
          shippingDestination: {
            '@type': 'DefinedRegion',
            addressCountry: 'AR',
            addressRegion: 'Córdoba'
          },
          deliveryTime: {
            '@type': 'ShippingDeliveryTime',
            handlingTime: {
              '@type': 'QuantitativeValue',
              minValue: 0,
              maxValue: 1,
              unitCode: 'DAY'
            },
            transitTime: {
              '@type': 'QuantitativeValue',
              minValue: 1,
              maxValue: 2,
              unitCode: 'DAY'
            }
          }
        },
        
        hasMerchantReturnPolicy: {
          '@type': 'MerchantReturnPolicy',
          applicableCountry: 'AR',
          returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
          merchantReturnDays: 10,
          returnMethod: 'https://schema.org/ReturnByMail',
          returnFees: 'https://schema.org/FreeReturn'
        }
      }
    },
    
    {
      '@type': 'WebSite',
      '@id': 'https://azulcolchones.com/#website',
      url: 'https://azulcolchones.com',
      name: 'Azul Colchones Villa María',
      description: 'Colchones Piero: Outlet (60% OFF) o Fábrica (40% OFF). Envío gratis, 12 cuotas.',
      publisher: { '@id': 'https://azulcolchones.com/#organization' },
      inLanguage: 'es-AR',
      
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://azulcolchones.com/catalogo?q={search_term_string}'
        },
        'query-input': 'required name=search_term_string'
      },
    },
    
    {
      '@type': 'WebPage',
      '@id': 'https://azulcolchones.com/#webpage',
      url: 'https://azulcolchones.com',
      name: 'Azul Colchones | Outlet 60% + Piero Fábrica 40% | Villa María',
      isPartOf: { '@id': 'https://azulcolchones.com/#website' },
      about: { '@id': 'https://azulcolchones.com/#organization' },
      primaryImageOfPage: { '@id': 'https://azulcolchones.com/#logo' },
      description: 'Colchones Piero en Villa María: Outlet (hoy, 60% OFF) o Fábrica (7-10 días, 40% OFF). Envío gratis, 12 cuotas.',
      inLanguage: 'es-AR',
      
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', '.hero-description']
      }
    },
  ]
}

// ============================================================================
// FAQ SCHEMA - DUAL STRATEGY 🎯
// ============================================================================

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    // DUAL STRATEGY
    {
      '@type': 'Question',
      name: '¿Cuál es la diferencia entre Outlet y Piero Fábrica?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Outlet son colchones Piero en stock con hasta 60% de descuento y entrega inmediata (hoy mismo en Villa María). Piero Fábrica son pedidos directos de fábrica con 30-40% de descuento pero entregas en 7-10 días. Ambas opciones incluyen envío gratis en Villa María y 12 cuotas sin interés. Vos elegís según tu urgencia y presupuesto.'
      }
    },
    {
      '@type': 'Question',
      name: '¿Vale la pena esperar 7-10 días por Piero Fábrica?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí, si podés esperar 7-10 días, Piero Fábrica te ahorra entre $100.000 y $400.000 comparado con los precios de mercado. Es el mismo colchón Piero, con la misma garantía oficial, pero comprás directo de fábrica sin intermediarios. Ideal si estás planificando con tiempo y querés el mejor precio posible.'
      }
    },
    // ENVÍOS
    {
      '@type': 'Question',
      name: '¿El envío es gratis en ambas modalidades (Outlet y Fábrica)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí, el envío es GRATIS en Villa María tanto para compras en Outlet (entrega en 24-48hs) como en Piero Fábrica (entrega en 7-10 días). Para otras ciudades de Córdoba y Argentina también tenemos envío sin cargo adicional. Coordinamos día y horario por WhatsApp: +54 9 353 4017332.'
      }
    },
    // FINANCIACIÓN
    {
      '@type': 'Question',
      name: '¿Puedo pagar en 12 cuotas sin interés?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí, ofrecemos hasta 12 cuotas sin interés tanto en Outlet como en Piero Fábrica, con Mercado Pago y tarjetas de crédito habilitadas. También aceptamos transferencia bancaria con 10% de descuento adicional, efectivo en showroom con 15% de descuento, y todas las tarjetas de débito.'
      }
    },
    // GARANTÍAS
    {
      '@type': 'Question',
      name: '¿La garantía es la misma en Outlet y Piero Fábrica?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí, todos los colchones Piero tienen la misma garantía oficial de fábrica (5-10 años según modelo), ya sea que los compres en Outlet o por Piero Fábrica. La garantía cubre defectos de fabricación, deformaciones y roturas de resortes. Además cumplimos con la Ley de Defensa del Consumidor Argentina.'
      }
    },
    // SHOWROOM
    {
      '@type': 'Question',
      name: '¿Puedo ver los colchones del Outlet en el showroom?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí, visitá nuestro showroom en Balerdi 855, Villa María para ver y probar los colchones disponibles en Outlet. También te mostramos catálogos de todos los modelos Piero que podés pedir directo de Fábrica. Atendemos lunes a viernes 9-19hs, sábados 9-13hs. WhatsApp: +54 9 353 4017332.'
      }
    },
    // STOCK
    {
      '@type': 'Question',
      name: '¿Cómo sé si hay stock en Outlet del colchón que quiero?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nuestro stock de Outlet se actualiza en tiempo real en la web (azulcolchones.com/catalogo). También podés consultarnos por WhatsApp (+54 9 353 4017332) para verificar disponibilidad inmediata. Si el modelo que querés no está en Outlet, te ofrecemos comprarlo por Piero Fábrica con mejor precio y entrega en 7-10 días.'
      }
    },
  ]
}

// ============================================================================
// BREADCRUMB SCHEMA
// ============================================================================

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Inicio',
      item: 'https://azulcolchones.com'
    }
  ]
}

// ============================================================================
// ROOT LAYOUT
// ============================================================================

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html 
      lang="es-AR" 
      className={`scroll-smooth bg-zinc-950 ${inter.variable} ${plusJakarta.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://www.mercadopago.com" />
        
        <link 
          rel="preload" 
          href="/images/hero-colchon.webp" 
          as="image" 
          type="image/webp"
          fetchPriority="high"
          media="(min-width: 768px)"
        />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          key="jsonld-main"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          key="jsonld-faq"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
          key="jsonld-breadcrumb"
        />
      </head>
      
      <body 
        className={`${inter.className} font-sans antialiased bg-zinc-950 text-white min-h-screen flex flex-col overflow-x-hidden`}
        style={{ 
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          textRendering: 'optimizeLegibility'
        }}
      >
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-blue-600 focus:text-white focus:rounded-xl focus:font-semibold focus:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-zinc-950 transition-all duration-200"
        >
          Saltar al contenido principal
        </a>

        <AuthProvider>
          <Header />
          
          <main 
            id="main-content" 
            className="flex-1 w-full bg-zinc-950 scroll-mt-20"
            role="main"
            aria-label="Contenido principal"
          >
            {children}
          </main>
          
          <Footer />

          <WhatsAppButton 
            phoneNumber="5493534017332"
            message="¡Hola! Me interesa consultar por colchones Piero. ¿Podrían asesorarme sobre Outlet vs Piero Fábrica?"
            position="right"
            showTooltip={true}
          />
        </AuthProvider>

        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}