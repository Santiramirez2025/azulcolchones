// app/sobre-nosotros/page.tsx - ULTRA OPTIMIZED ⚡ SEO 🚀
import type { Metadata } from 'next'
import { SobreNosotrosClient } from './SobreNosotrosClient'

// ============================================================================
// METADATA & SEO
// ============================================================================
export const metadata: Metadata = {
  title: 'Sobre Nosotros | Azul Colchones - 35 Años de Tradición Familiar en Villa María',
  description: 'Conocé la historia de Azul Colchones: más de 35 años de experiencia familiar en Villa María, Córdoba. Tres generaciones dedicadas al descanso de calidad. Visitá nuestro showroom en Balerdi 855.',
  keywords: [
    'azul colchones villa maría',
    'tienda colchones villa maría',
    'colchones córdoba',
    'comercio familiar colchones',
    'showroom colchones villa maría',
    'historia azul colchones',
    'balerdi 855 villa maría',
    'colchonería villa maría',
    'venta colchones córdoba',
    'tradición familiar colchones',
  ],
  openGraph: {
    title: 'Sobre Nosotros | Azul Colchones - 35 Años en Villa María',
    description: 'Más de 35 años de tradición familiar vendiendo colchones de calidad en Villa María, Córdoba. Tres generaciones a tu servicio.',
    type: 'website',
    locale: 'es_AR',
    siteName: 'Azul Colchones',
    images: [
      {
        url: '/og-sobre-nosotros.jpg',
        width: 1200,
        height: 630,
        alt: 'Azul Colchones - Showroom en Villa María',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sobre Nosotros | Azul Colchones',
    description: '35 años de tradición familiar en Villa María, Córdoba',
    images: ['/og-sobre-nosotros.jpg'],
  },
  alternates: {
    canonical: 'https://azulcolchones.com.ar/sobre-nosotros',
  },
}

// ============================================================================
// PERFORMANCE CONFIGURATION
// ============================================================================
export const revalidate = 86400 // Revalidate once per day (24 hours)

// ============================================================================
// MAIN PAGE COMPONENT (SERVER)
// ============================================================================
export default function SobreNosotrosPage() {
  // Structured Data - LocalBusiness Schema
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://azulcolchones.com.ar',
    name: 'Azul Colchones',
    description: 'Tienda familiar de colchones con más de 35 años de experiencia en Villa María, Córdoba',
    image: 'https://azulcolchones.com.ar/logo-azul-colchones.jpg',
    url: 'https://azulcolchones.com.ar',
    telephone: '+54-353-123-4567',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Balerdi 855',
      addressLocality: 'Villa María',
      addressRegion: 'Córdoba',
      postalCode: '5900',
      addressCountry: 'AR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -32.4117,
      longitude: -63.2402,
    },
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
    foundingDate: '1989',
    slogan: 'Más de 35 años cuidando tu descanso',
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: -32.4117,
        longitude: -63.2402,
      },
      geoRadius: '100000', // 100km radius
    },
  }

  // AboutPage Schema
  const aboutPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'Sobre Nosotros - Azul Colchones',
    description: 'Historia y valores de Azul Colchones, tienda familiar con 35 años de experiencia',
    url: 'https://azulcolchones.com.ar/sobre-nosotros',
    mainEntity: {
      '@type': 'Organization',
      '@id': 'https://azulcolchones.com.ar',
      name: 'Azul Colchones',
      foundingDate: '1989',
      founders: [
        {
          '@type': 'Person',
          name: 'Familia Azul',
        },
      ],
      numberOfEmployees: {
        '@type': 'QuantitativeValue',
        value: '5-10',
      },
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Inicio',
          item: 'https://azulcolchones.com.ar',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Sobre Nosotros',
          item: 'https://azulcolchones.com.ar/sobre-nosotros',
        },
      ],
    },
  }

  // FAQPage Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Cuántos años de experiencia tiene Azul Colchones?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Azul Colchones tiene más de 35 años de experiencia en la venta de colchones en Villa María, Córdoba. Somos un negocio familiar de tercera generación.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Dónde está ubicado el showroom de Azul Colchones?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Nuestro showroom está ubicado en Balerdi 855, Villa María, Córdoba. Abrimos de lunes a viernes de 9:00 a 19:00 y sábados de 9:00 a 13:00.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué garantía ofrecen en los colchones?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ofrecemos garantía de 3 años en todos nuestros colchones, respaldada por nuestra experiencia de más de 35 años en el rubro.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Por qué elegir Azul Colchones?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Somos un comercio familiar con 35 años de trayectoria, ofrecemos atención personalizada, garantía de 3 años, entrega e instalación, y precios justos. Podés probar los colchones en nuestro showroom de Villa María.',
        },
      },
    ],
  }

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Main Content */}
      <SobreNosotrosClient />

      {/* Hidden SEO Content - Rich Context for Search Engines */}
      <aside className="sr-only" aria-hidden="true">
        <h1>Azul Colchones - Sobre Nosotros - Villa María, Córdoba</h1>
        
        <h2>Historia de Azul Colchones</h2>
        <p>
          Azul Colchones es una tienda familiar de colchones ubicada en Villa María, Córdoba, Argentina.
          Con más de 35 años de experiencia en el mercado, somos especialistas en la venta de colchones
          de calidad premium para toda la familia. Desde 1989 hasta la actualidad, tres generaciones
          de la familia han dedicado su vida a brindar el mejor servicio y los mejores productos
          para el descanso de los hogares de Villa María y toda la región de Córdoba.
        </p>

        <h2>Nuestra Ubicación en Villa María</h2>
        <address>
          <p><strong>Dirección del Showroom:</strong> Balerdi 855, Villa María, Córdoba, Argentina, CP 5900</p>
          <p><strong>Teléfono:</strong> +54 353 123-4567</p>
          <p><strong>Horarios de atención:</strong></p>
          <ul>
            <li>Lunes a Viernes: 9:00 AM a 7:00 PM</li>
            <li>Sábados: 9:00 AM a 1:00 PM</li>
            <li>Domingos: Cerrado</li>
          </ul>
        </address>

        <h2>Nuestros Valores y Filosofía</h2>
        <ul>
          <li><strong>Tradición Familiar:</strong> Más de 35 años de experiencia familiar, tres generaciones dedicadas al descanso</li>
          <li><strong>Calidad Garantizada:</strong> Selección cuidadosa de colchones con los más altos estándares de calidad</li>
          <li><strong>Atención Personalizada:</strong> Asesoramiento profesional y personalizado sin presiones de venta</li>
          <li><strong>Compromiso Local:</strong> Somos de Villa María para Villa María, apoyamos el comercio local</li>
        </ul>

        <h2>Cronología e Hitos Importantes</h2>
        <ul>
          <li><strong>1989:</strong> Fundación de Azul Colchones en Villa María, Córdoba</li>
          <li><strong>2000:</strong> Expansión del showroom y ampliación del catálogo con marcas premium</li>
          <li><strong>2015:</strong> Segunda generación se suma al negocio familiar</li>
          <li><strong>2024:</strong> Lanzamiento de tienda online para mayor alcance regional</li>
        </ul>

        <h2>Estadísticas y Logros</h2>
        <ul>
          <li>Más de 35 años de trayectoria ininterrumpida</li>
          <li>3 generaciones al servicio de la comunidad</li>
          <li>100% atención familiar personalizada</li>
          <li>Más de 10.000 clientes satisfechos en Villa María y región</li>
          <li>Garantía de 3 años en todos los productos</li>
        </ul>

        <h2>¿Por Qué Elegir Azul Colchones?</h2>
        <ul>
          <li>Más de 35 años de experiencia en venta de colchones</li>
          <li>Comercio familiar de tercera generación en Villa María</li>
          <li>Showroom físico donde podés probar todos los productos</li>
          <li>Asesoramiento personalizado y profesional</li>
          <li>Garantía extendida de 3 años en todos los colchones</li>
          <li>Servicio de entrega e instalación en toda la región de Córdoba</li>
          <li>Precios justos y promociones frecuentes</li>
          <li>Atención cercana, cálida y profesional</li>
        </ul>

        <h2>Marcas y Productos que Ofrecemos</h2>
        <p>
          En Azul Colchones encontrarás las mejores marcas de colchones: colchones matrimoniales,
          colchones de 2 plazas, colchones queen size, colchones king size, colchones de resortes,
          colchones de espuma, colchones memory foam, colchones ortopédicos, sommiers, box springs,
          almohadas premium, y accesorios para el descanso.
        </p>

        <h2>Zona de Cobertura</h2>
        <p>
          Realizamos envíos y entregas en: Villa María, Villa Nueva, Bell Ville, Río Tercero, 
          San Francisco, Arroyito, y toda la zona de Córdoba en un radio de 100 kilómetros.
        </p>

        <h2>Compromiso con la Comunidad</h2>
        <p>
          Como negocio familiar arraigado en Villa María, nos enorgullece ser parte de la comunidad
          local. Apoyamos iniciativas locales, generamos empleo en la región, y contribuimos al
          desarrollo económico de nuestra ciudad. Creemos firmemente en el valor del comercio de
          cercanía y en mantener viva la tradición del trato personalizado y honesto.
        </p>

        <h2>Contacto y Cómo Llegar</h2>
        <p>
          Visitanos en Balerdi 855, Villa María, Córdoba. Estamos ubicados en el centro de la ciudad,
          con fácil acceso y estacionamiento disponible. Nuestro equipo te espera para asesorarte
          personalmente y ayudarte a encontrar el colchón perfecto para tu descanso.
        </p>

        <h2>Preguntas Frecuentes sobre Azul Colchones</h2>
        <dl>
          <dt>¿Desde cuándo existe Azul Colchones?</dt>
          <dd>Azul Colchones fue fundada en 1989 en Villa María, Córdoba, y cuenta con más de 35 años de trayectoria.</dd>
          
          <dt>¿Es un negocio familiar?</dt>
          <dd>Sí, somos un comercio 100% familiar de tercera generación, dedicado al rubro de colchones.</dd>
          
          <dt>¿Dónde puedo ver los colchones?</dt>
          <dd>En nuestro showroom de Balerdi 855, Villa María, Córdoba. Podés probar todos los modelos.</dd>
          
          <dt>¿Qué horarios tienen?</dt>
          <dd>Lunes a Viernes de 9:00 a 19:00 horas, y Sábados de 9:00 a 13:00 horas.</dd>
          
          <dt>¿Dan garantía?</dt>
          <dd>Sí, ofrecemos garantía de 3 años en todos nuestros colchones.</dd>
          
          <dt>¿Hacen envíos?</dt>
          <dd>Sí, realizamos entrega e instalación en toda la región de Córdoba.</dd>
        </dl>
      </aside>
    </>
  )
}