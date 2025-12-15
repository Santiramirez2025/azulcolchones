// app/blog/metadata.ts - SEO EXHAUSTIVO PARA BLOG 📚
import { Metadata } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://azulcolchones.com'

export const metadata: Metadata = {
  title: 'Blog del Descanso | Guías sobre Sueño y Colchones | Azul Colchones Villa María',
  description: '📚 Guía completa del descanso perfecto. ✅ Técnicas científicas para dormir mejor ✅ Higiene del sueño ✅ Cómo elegir colchón ✅ Consejos de expertos. 35+ años de experiencia en Villa María.',
  
  keywords: [
    // === CORE BLOG ===
    'blog descanso',
    'blog sueño',
    'guía del sueño',
    'consejos para dormir mejor',
    
    // === TÉCNICAS ===
    'cómo dormir rápido',
    'técnicas para dormir',
    'respiración 4-7-8',
    'higiene del sueño',
    'ritual del sueño',
    
    // === PROBLEMAS ===
    'problemas para dormir',
    'insomnio soluciones',
    'no puedo dormir',
    'dificultad para dormir',
    
    // === COLCHONES (Local) ===
    'cómo elegir colchón villa maría',
    'mejor colchón para dormir',
    'colchón dolor de espalda',
    'temperatura ideal dormir',
    'dormitorio perfecto',
    
    // === LONG TAIL ===
    'cómo crear rutina de sueño',
    'técnicas relajación antes de dormir',
    'mejorar calidad del sueño',
    'consejos científicos para dormir',
    'guía completa higiene del sueño',
    
    // === LOCAL ===
    'blog colchones villa maría',
    'consejos descanso villa maría',
  ].join(', '),
  
  openGraph: {
    title: '📚 Blog del Descanso | Azul Colchones Villa María',
    description: 'Guías científicas para dormir mejor | Técnicas probadas | Consejos de expertos',
    type: 'website',
    locale: 'es_AR',
    url: `${BASE_URL}/blog`,
    siteName: 'Azul Colchones Villa María',
    images: [
      {
        url: `${BASE_URL}/og-blog.jpg`,
        width: 1200,
        height: 630,
        alt: 'Blog del Descanso - Azul Colchones Villa María',
      }
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: '📚 Blog del Descanso - Azul Colchones',
    description: 'Guías científicas para dormir mejor',
    images: [`${BASE_URL}/twitter-blog.jpg`],
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  alternates: {
    canonical: `${BASE_URL}/blog`,
  },
  
  other: {
    'article:author': 'Azul Colchones',
    'article:publisher': 'Azul Colchones Villa María',
  },
}