// app/layout.tsx - ULTRA OPTIMIZED ⚡ DUAL STRATEGY - Azul Colchones
// SEO Level: SENIOR | Performance: A+ | Strategy: Outlet + Fábrica
// ✅ META PIXEL INTEGRADO - ID: 521139968588985
// ✅ VERCEL ANALYTICS INTEGRADO
// ✅ GOOGLE ANALYTICS 4 INTEGRADO - ID: G-FTXRWHED3X
// ✅ BACKGROUND MUSIC INTEGRADO

import type { Metadata, Viewport } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import Header from '../components/sections/Header'
import Footer from '../components/sections/Footer'
import { Analytics } from "@vercel/analytics/next"
import { GoogleAnalytics } from '@next/third-parties/google'
import MetaPixel from '@/components/MetaPixel'

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
  
  title: {
    default: 'Azul Colchones Villa María | Distribuidor Oficial Piero | Envío Gratis',
    template: '%s | Azul Colchones Villa María'
  },

  description: 'Colchones y sommiers Piero directo de fábrica en Villa María. Distribuidor oficial exclusivo, 35+ años. Envío gratis, entrega inmediata con stock, 3 cuotas. Showroom Balerdi 855.',
  
  applicationName: 'Azul Colchones',
  
  authors: [{ name: 'Azul Colchones', url: 'https://azulcolchones.com' }],
  creator: 'Azul Colchones Villa María',
  publisher: 'Azul Colchones',
  
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://azulcolchones.com',
    siteName: 'Azul Colchones Villa María',
    title: 'Azul Colchones | Distribuidor Oficial Piero | Villa María',
    description: 'Colchones y sommiers Piero directo de fábrica. Distribuidor oficial exclusivo en Villa María. Envío gratis, entrega inmediata con stock, 3 cuotas.',
    images: [
      {
        url: '/og-image-home.jpg',
        width: 1200,
        height: 630,
        alt: 'Azul Colchones - Distribuidor oficial Piero en Villa María',
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
  
  twitter: {
    card: 'summary_large_image',
    site: '@azulcolchones',
    creator: '@azulcolchones',
    title: 'Azul Colchones | Distribuidor Oficial Piero | Villa María',
    description: '35+ años · Distribuidor oficial Piero · directo de fábrica · envío gratis · 3 cuotas',
    images: {
      url: '/twitter-image.jpg',
      alt: 'Azul Colchones Villa María',
    },
  },
  
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
  
  verification: {
    // Solo se emite si hay código real en la env var (sin placeholder falso).
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
      : {}),
    other: {
      'facebook-domain-verification': '5nuiyy6kxib0j2xvithgxjish0uger',
    },
  },

  // NOTA: sin canonical global. Cada página define su canonical propia
  // (antes esto forzaba TODAS las páginas a canonizar a la home — bug SEO).
  
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
    'og:phone_number': '+54 9 3534 09-6566',
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
      
      description: 'Distribuidor oficial exclusivo de Piero en Villa María. Colchones y sommiers directo de fábrica, con entrega inmediata con stock (Villa María y Villa Nueva) o 24-72 hs. 35+ años de experiencia.',
      
      telephone: '+54 9 3534 09-6566',
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
        'https://www.facebook.com/azulcolchoneria',
        'https://www.instagram.com/azulcolchones1991/',
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
          telephone: '+54 9 3534 09-6566',
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
      
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Colchones y sommiers Piero',
        itemListElement: [
          {
            '@type': 'Offer',
            name: 'Colchones Piero directo de fábrica',
            description: 'Distribuidor oficial Piero. Precio directo de fábrica. Entrega inmediata con stock en Villa María y Villa Nueva; sin stock, 24-72 hs.',
            itemOffered: {
              '@type': 'Product',
              name: 'Colchones Piero',
              description: 'Colchones y sommiers Piero, distribuidor oficial exclusivo en Villa María.'
            },
            availability: 'https://schema.org/InStock',
            url: 'https://azulcolchones.com/catalogo'
          }
        ]
      },
      
      makesOffer: {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: 'Colchones Piero Premium',
          description: 'Colchones y sommiers Piero directo de fábrica — distribuidor oficial en Villa María'
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
      description: 'Colchones y sommiers Piero directo de fábrica. Distribuidor oficial en Villa María. Envío gratis, 3 cuotas.',
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
      name: 'Azul Colchones | Distribuidor Oficial Piero | Villa María',
      isPartOf: { '@id': 'https://azulcolchones.com/#website' },
      about: { '@id': 'https://azulcolchones.com/#organization' },
      primaryImageOfPage: { '@id': 'https://azulcolchones.com/#logo' },
      description: 'Colchones y sommiers Piero directo de fábrica en Villa María. Distribuidor oficial. Envío gratis, 3 cuotas.',
      inLanguage: 'es-AR',
      
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', '.hero-description']
      }
    },
  ]
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Cuánto tarda la entrega?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Con stock, la entrega es inmediata en Villa María y Villa Nueva. Si el producto no está en stock, el pedido demora entre 24 y 72 horas. Coordinamos día y horario por WhatsApp: +54 9 3534 09-6566.'
      }
    },
    {
      '@type': 'Question',
      name: '¿Por qué comprar en Azul Colchones?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Somos distribuidor oficial exclusivo de Piero en Villa María y zona, con más de 35 años de trayectoria. Comprás directo de fábrica, con asesoramiento personalizado y garantía oficial Piero.'
      }
    },
    {
      '@type': 'Question',
      name: '¿El envío es gratis?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí, el envío es gratis en Villa María y Villa Nueva con delivery propio. Para otras zonas coordinamos el envío por WhatsApp: +54 9 3534 09-6566.'
      }
    },
    {
      '@type': 'Question',
      name: '¿Puedo pagar en 3 cuotas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Ofrecemos 3 cuotas y hasta 12 cuotas con tarjeta a través de Mercado Pago. También podés pagar con débito, transferencia o efectivo en el showroom.'
      }
    },
    {
      '@type': 'Question',
      name: '¿Qué garantía tienen los colchones?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Todos los colchones Piero tienen garantía oficial de fábrica de 5 años, que cubre defectos de fabricación. Cumplimos con la Ley de Defensa del Consumidor de Argentina.'
      }
    },
    {
      '@type': 'Question',
      name: '¿Puedo ver y probar los colchones en el showroom?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí, visitá nuestro showroom en Balerdi 855, Villa María, para ver y probar los colchones Piero. Atendemos lunes a viernes 9-19hs y sábados 9-13hs. WhatsApp: +54 9 3534 09-6566.'
      }
    },
    {
      '@type': 'Question',
      name: '¿Cómo sé si hay stock del colchón que quiero?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Consultanos por WhatsApp (+54 9 3534 09-6566) y verificamos la disponibilidad al instante. Con stock, la entrega es inmediata en Villa María y Villa Nueva; sin stock, el pedido llega en 24-72 hs.'
      }
    },
  ]
}

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
      className={`bg-zinc-950 ${inter.variable} ${plusJakarta.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />

        <link 
          rel="preload" 
          href="/images/hero-colchon.webp" 
          as="image" 
          type="image/webp"
          fetchPriority="high"
          media="(min-width: 768px)"
        />
        
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  let currentIcon = 0;
  const icons = [
    { emoji: '🔵', title: 'Azul Colchones Villa María' },
    { emoji: '🛏️', title: 'Distribuidor Oficial Piero | Azul Colchones' },
    { emoji: '🏭', title: 'Directo de Fábrica | Azul Colchones' },
    { emoji: '💙', title: 'Envío Gratis Villa María | Azul Colchones' }
  ];
  
  function updateFavicon() {
    const icon = icons[currentIcon];
    
    document.title = icon.title;
    
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    
    ctx.clearRect(0, 0, 64, 64);
    
    ctx.font = '52px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(icon.emoji, 32, 34);
    
    let link = document.querySelector("link[rel*='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = canvas.toDataURL('image/png');
    
    currentIcon = (currentIcon + 1) % icons.length;
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateFavicon);
  } else {
    updateFavicon();
  }
  
  setInterval(updateFavicon, 3000);
  
  document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
      currentIcon = 0;
      updateFavicon();
    }
  });
})();
            `
          }}
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
        className={`${inter.className} font-sans antialiased bg-zinc-950 text-white min-h-screen flex flex-col [overflow-x:clip]`}
        style={{ 
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          textRendering: 'optimizeLegibility'
        }}
      >
        <MetaPixel />
        
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-blue-600 focus:text-white focus:rounded-xl focus:font-semibold focus:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-zinc-950 transition-all duration-200"
        >
          Saltar al contenido principal
        </a>

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

        <Analytics />
        <GoogleAnalytics gaId="G-BTPV00LG0N" />
        
        {/* Audio de fondo oculto - Música ambiental */}
        <iframe
          style={{ display: 'none' }}
          src="https://www.youtube.com/embed/qz8YE61BoXM?autoplay=1&loop=1&playlist=qz8YE61BoXM&controls=0"
          allow="autoplay"
          title="Background ambient music"
          aria-hidden="true"
        />
      </body>
    </html>
  )
}