// app/blog/dormitorio-perfecto/layout.tsx - METADATA SEO EXHAUSTIVA
import { Metadata } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://azulcolchones.com'

export const metadata: Metadata = {
  title: 'Dormitorio Perfecto para Dormir Mejor | Guía Completa 2025 | Azul Colchones',
  description: '🛏️ Crea el dormitorio ideal para dormir mejor. ✅ Temperatura óptima ✅ Oscuridad total ✅ Reducción de ruido ✅ Colchón adecuado ✅ Ventilación. Guía científica completa con presupuestos.',
  
  keywords: [
    // === CORE ===
    'dormitorio perfecto',
    'como hacer un dormitorio para dormir',
    'optimizar dormitorio',
    'habitación para dormir mejor',
    
    // === FACTORES ===
    'temperatura ideal dormitorio',
    'oscuridad para dormir',
    'reducción ruido dormitorio',
    'mejor colchón',
    'ventilación habitación',
    
    // === PRODUCTOS ===
    'cortinas blackout',
    'antifaz para dormir',
    'ruido blanco',
    'tapones oídos',
    'colchón quality',
    
    // === PROBLEMAS ===
    'no puedo dormir bien',
    'mejorar calidad sueño',
    'ambiente ideal para dormir',
    'condiciones óptimas sueño',
    
    // === LONG TAIL ===
    'cual es la temperatura ideal para dormir',
    'como oscurecer completamente una habitación',
    'mejor forma de reducir ruido en dormitorio',
    'cada cuanto cambiar colchón',
    'como ventilar habitación para dormir',
  ].join(', '),
  
  openGraph: {
    title: '🛏️ Dormitorio Perfecto para Dormir Mejor | Guía Completa',
    description: 'Temperatura, oscuridad, ruido, colchón y más | Guía científica con presupuestos',
    type: 'article',
    locale: 'es_AR',
    url: `${BASE_URL}/blog/dormitorio-perfecto`,
    siteName: 'Azul Colchones Villa María',
    images: [
      {
        url: `${BASE_URL}/blog/dormitorio-perfecto-og.jpg`,
        width: 1200,
        height: 630,
        alt: 'Guía para crear el dormitorio perfecto'
      }
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: '🛏️ Dormitorio Perfecto para Dormir Mejor',
    description: 'Guía completa: temperatura, oscuridad, ruido, colchón y ventilación',
    images: [`${BASE_URL}/blog/dormitorio-perfecto-og.jpg`],
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  
  alternates: {
    canonical: `${BASE_URL}/blog/dormitorio-perfecto`,
  },
  
  authors: [
    {
      name: 'Azul Colchones',
      url: BASE_URL
    }
  ],
  
  category: 'Home & Garden',
}

export default function DormitorioPerfectoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}