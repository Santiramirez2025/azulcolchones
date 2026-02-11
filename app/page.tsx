// app/page.tsx - ZERO FRICTION: Asesor como protagonista absoluto
import type { Metadata } from 'next'
import HeroHome from '@/components/home/HeroHome'
import { ScrollProgressBar } from '@/components/ScrollProgressBar'

// ============================================================================
// METADATA
// ============================================================================

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://azulcolchones.com'

export const metadata: Metadata = {
  title: 'Azul Colchones Villa María | Encontrá Tu Colchón Ideal en 30 Segundos',
  description: 'Respondé 3 preguntas y descubrí qué colchón PIERO necesitás. Hasta 22% OFF comprando directo de fábrica. +35 años de experiencia en Villa María.',
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'Azul Colchones',
    title: 'Encontrá Tu Colchón Ideal | Azul Colchones Villa María',
    description: 'Asesor inteligente + Hasta 22% OFF directo de fábrica',
    images: [{
      url: `${siteUrl}/og-home-hero.jpg`,
      width: 1200,
      height: 630,
      alt: 'Azul Colchones - PIERO Fábrica Villa María',
    }],
    locale: 'es_AR',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const revalidate = 43200 // 12 hours

// ============================================================================
// HOME PAGE - ENFOQUE TOTAL EN ASESOR
// ============================================================================

export default function Home() {
  return (
    <>
      <ScrollProgressBar />
      
      {/* Hero con asesor como protagonista */}
      <HeroHome />
      
      {/* SEO Content - Hidden */}
      <section className="sr-only" aria-hidden="true">
        <h2>Colchones PIERO en Villa María</h2>
        <p>
          Azul Colchones: Más de 35 años vendiendo descanso en Villa María. 
          Distribuidores oficiales PIERO. Stock Inmediato o Piero Fábrica directo 
          con hasta 22% OFF. Asesor inteligente para encontrar tu colchón ideal.
        </p>
        <address>
          Balerdi 855, Villa María, Córdoba. 
          WhatsApp: +54 9 3534 09-6566. 
          Lun-Vie 9-19hs, Sáb 9-13hs.
        </address>
      </section>
    </>
  )
}