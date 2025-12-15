// app/blog/dormir-rapido/layout.tsx - METADATA SEO EXHAUSTIVA
import { Metadata } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://azulcolchones.com'

export const metadata: Metadata = {
  title: 'Cómo Dormirse en 10 Minutos | 4 Técnicas Científicas | Azul Colchones',
  description: '😴 Técnicas comprobadas para dormir rápido. ✅ Método 4-7-8 ✅ Relajación muscular ✅ Visualización ✅ Escaneo corporal. Guía científica paso a paso para conciliar el sueño en minutos.',
  
  keywords: [
    // === CORE ===
    'como dormirse rápido',
    'técnicas para dormir',
    'conciliar el sueño',
    'dormirse en 10 minutos',
    
    // === TÉCNICAS ===
    'método 4-7-8',
    'respiración para dormir',
    'relajación muscular progresiva',
    'visualización guiada',
    'escaneo corporal',
    'mindfulness para dormir',
    
    // === PROBLEMAS ===
    'insomnio',
    'no puedo dormir',
    'dificultad para dormir',
    'ansiedad nocturna',
    
    // === BENEFICIOS ===
    'dormir mejor',
    'técnicas de relajación',
    'ejercicios para dormir',
    'remedios para el insomnio',
    
    // === LONG TAIL ===
    'como dormirse rápido en la noche',
    'técnicas científicas para dormir',
    'ejercicios de respiración para dormir',
    'como relajarse antes de dormir',
    'trucos para conciliar el sueño',
    'qué hacer cuando no puedo dormir',
  ].join(', '),
  
  openGraph: {
    title: '😴 Cómo Dormirse en 10 Minutos | 4 Técnicas Científicas',
    description: 'Método 4-7-8, relajación muscular, visualización y más | Guía paso a paso respaldada por la ciencia',
    type: 'article',
    locale: 'es_AR',
    url: `${BASE_URL}/blog/dormir-rapido`,
    siteName: 'Azul Colchones Villa María',
    images: [
      {
        url: `${BASE_URL}/blog/dormir-rapido-og.jpg`,
        width: 1200,
        height: 630,
        alt: 'Técnicas para dormirse rápido'
      }
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: '😴 Cómo Dormirse en 10 Minutos',
    description: 'Técnicas científicas paso a paso para conciliar el sueño',
    images: [`${BASE_URL}/blog/dormir-rapido-og.jpg`],
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
    canonical: `${BASE_URL}/blog/dormir-rapido`,
  },
  
  authors: [
    {
      name: 'Azul Colchones',
      url: BASE_URL
    }
  ],
  
  category: 'Health & Wellness',
}

export default function DormirRapidoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}