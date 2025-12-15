import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Guía Definitiva de Higiene del Sueño: 8 Hábitos Científicos para Dormir Mejor',
  description: 'Descubre los 8 hábitos de higiene del sueño respaldados por la ciencia para mejorar tu descanso. Incluye plan de implementación de 4 semanas, consejos sobre luz, cafeína, temperatura y rutinas nocturnas.',
  keywords: [
    'higiene del sueño',
    'cómo dormir mejor',
    'mejorar calidad del sueño',
    'insomnio soluciones',
    'rutina de sueño',
    'hábitos para dormir',
    'ritmo circadiano',
    'melatonina natural',
    'temperatura ideal para dormir',
    'cafeína y sueño',
    'luz azul y sueño',
    'horario de sueño',
    'consejos para dormir',
    'trastornos del sueño',
    'sueño profundo',
    'descanso nocturno',
    'técnicas para dormir',
    'ambiente para dormir',
    'ejercicio y sueño',
    'pantallas antes de dormir'
  ],
  authors: [{ name: 'Azul Colchones' }],
  openGraph: {
    title: 'La Guía Definitiva de Higiene del Sueño | 8 Hábitos Científicos',
    description: 'Transforma tu descanso con 8 hábitos científicamente comprobados. Plan de implementación de 4 semanas incluido.',
    type: 'article',
    publishedTime: '2024-10-15T00:00:00.000Z',
    modifiedTime: new Date().toISOString(),
    authors: ['Azul Colchones'],
    tags: [
      'higiene del sueño',
      'dormir mejor',
      'salud del sueño',
      'insomnio',
      'rutinas nocturnas',
      'descanso',
      'bienestar'
    ],
    images: [
      {
        url: '/og-higiene-sueno.jpg', // Crear esta imagen
        width: 1200,
        height: 630,
        alt: 'Guía de Higiene del Sueño - 8 Hábitos Científicos'
      }
    ],
    locale: 'es_AR',
    siteName: 'Azul Colchones Blog'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guía Definitiva de Higiene del Sueño: 8 Hábitos Científicos',
    description: 'Descubre cómo mejorar tu descanso con hábitos respaldados por la ciencia. Plan de 4 semanas incluido.',
    images: ['/og-higiene-sueno.jpg']
  },
  alternates: {
    canonical: 'https://azulcolchones.com/blog/higiene-sueno'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  other: {
    'article:published_time': '2024-10-15T00:00:00.000Z',
    'article:modified_time': new Date().toISOString(),
    'article:author': 'Azul Colchones',
    'article:section': 'Salud y Bienestar'
  }
}

export default function HigieneSuenoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}