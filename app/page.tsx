// app/page.tsx - HOME PAGE SIMPLIFICADO (Solo Hero)
import type { Metadata } from 'next'
import HeroHome from '@/components/home/HeroHome'
import { ScrollProgressBar } from '@/components/ScrollProgressBar'
import QuickAccess from '@/components/home/QuickAccess'
import FeaturedGrid from '@/components/home/FeaturedGrid'
import ComboPromo from '@/components/home/ComboPromo'
import Combos5en1 from '@/components/home/Combos5en1'
import { getCatalogProducts } from '@/lib/api/products'
import { normalizeProduct } from '@/lib/catalog/normalize'

// ============================================================================
// METADATA SEO OPTIMIZADO
// ============================================================================

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://azulcolchones.com'

export const metadata: Metadata = {
  title: 'Azul Colchones Villa María | Encontrá Tu Colchón Ideal en 30 Segundos',
  description: 'Colchones y sommiers Piero directo de fábrica en Villa María. Distribuidor oficial, 35+ años. Catálogo online, asesor inteligente, envío gratis y 3 cuotas.',
  
  keywords: [
    'colchones Villa María',
    'PIERO colchones',
    'colchones Córdoba',
    'colchones fábrica',
    'asesor colchones',
    'Azul Colchones',
  ],
  
  authors: [{ name: 'Azul Colchones' }],
  
  alternates: {
    canonical: siteUrl,
  },
  
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'Azul Colchones',
    title: 'Encontrá Tu Colchón Ideal | Azul Colchones Villa María',
    description: 'Catálogo Piero directo de fábrica + asesor inteligente. Distribuidor oficial en Villa María.',
    images: [
      {
        url: `${siteUrl}/og-home-hero.jpg`,
        width: 1200,
        height: 630,
        alt: 'Azul Colchones - PIERO Fábrica Villa María',
      },
    ],
    locale: 'es_AR',
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Encontrá Tu Colchón Ideal | Azul Colchones',
    description: 'Catálogo Piero directo de fábrica + asesor inteligente en Villa María',
    images: [`${siteUrl}/og-home-hero.jpg`],
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  verification: {
    // Agregar tus códigos de verificación aquí
    // google: 'tu-código-de-verificación',
  },
}

export const revalidate = 43200 // 12 hours

// ============================================================================
// HOME PAGE COMPONENT
//
// Flujo simplificado: Solo Hero → máxima conversión sin fricción
// Los productos y packs se acceden desde /lista-precios
// ============================================================================

export default async function Home() {
  // Destacados para la home: colchones (best sellers / featured primero), máx 6.
  const productsRaw = await getCatalogProducts()
  const allNorm = productsRaw.map(normalizeProduct)
  const combos = allNorm.filter((p) => p.category === 'Combos')
  const featured = allNorm.filter((p) => p.category === 'Colchones').slice(0, 6)
  const avgPrice =
    featured.length > 0 ? featured.reduce((s, p) => s + p.price, 0) / featured.length : 300000

  return (
    <>
      <ScrollProgressBar />

      {/* Hero — Asesor como protagonista */}
      <HeroHome />

      {/* Combos 5 en 1 — PROTAGONISTA, apenas debajo del hero */}
      <Combos5en1 combos={combos} />

      {/* Accesos rápidos: menos fricción para llegar a catálogo / combo / asesor */}
      <QuickAccess />

      {/* Más elegidos — productos reales con tachado + ahorro */}
      <FeaturedGrid products={featured} avgPrice={avgPrice} />

      {/* Banner Armá tu combo */}
      <ComboPromo />

      {/* Structured Data JSON-LD para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Store',
            name: 'Azul Colchones',
            description: 'Distribuidores oficiales PIERO en Villa María. Más de 35 años vendiendo descanso.',
            image: `${siteUrl}/logo.png`,
            '@id': siteUrl,
            url: siteUrl,
            telephone: '+54-3534-09-6566',
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
              latitude: -32.4103,
              longitude: -63.2401,
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
            sameAs: [
              // 'https://www.facebook.com/azulcolchoneria',
              // 'https://www.instagram.com/azulcolchones1991/',
            ],
            priceRange: '$$',
            paymentAccepted: 'Cash, Credit Card, Debit Card, Bank Transfer',
            currenciesAccepted: 'ARS',
          }),
        }}
      />

      {/* SEO Content — oculto visualmente pero indexable por Google */}
      <section className="sr-only" aria-hidden="true">
        <h2>Colchones PIERO en Villa María - Distribuidores Oficiales</h2>
        <p>
          Azul Colchones: Más de 35 años vendiendo descanso de calidad en Villa María, Córdoba.
          Somos distribuidores oficiales de colchones PIERO, la marca líder en Argentina.
        </p>
        <h3>Lista de Precios PIERO Fábrica</h3>
        <p>
          Consultá nuestra lista de precios completa con todos los colchones PIERO disponibles
          directo de fábrica, con precio directo de fábrica. Precios actualizados, sin intermediarios.
        </p>
        <h3>Asesor Inteligente de Colchones</h3>
        <p>
          Nuestro asesor inteligente te ayuda a encontrar el colchón perfecto para tus necesidades
          en solo 30 segundos. Respondé 3 preguntas simples y descubrí cuál es tu colchón ideal.
        </p>
        <h3>Contacto y Horarios</h3>
        <address>
          <strong>Dirección:</strong> Balerdi 855, Villa María, Córdoba (5900)<br />
          <strong>Teléfono:</strong> <a href="tel:+5493534096566">+54 9 3534 09-6566</a><br />
          <strong>WhatsApp:</strong> <a href="https://wa.me/5493534096566">Consultar por WhatsApp</a><br />
          <strong>Horarios:</strong> Lunes a Viernes 9:00-19:00hs • Sábados 9:00-13:00hs
        </address>
        <h3>Garantía y Servicio Post-Venta</h3>
        <p>
          Todos nuestros colchones PIERO incluyen garantía oficial de fábrica.
          Asesoramiento personalizado antes y después de tu compra.
        </p>
      </section>
    </>
  )
}