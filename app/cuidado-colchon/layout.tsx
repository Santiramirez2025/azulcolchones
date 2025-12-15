// app/cuidado-colchon/layout.tsx - METADATA SEO EXHAUSTIVA
import { Metadata } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://azulcolchones.com'

export const metadata: Metadata = {
  title: 'Cuidado del Colchón | Guía Completa de Mantenimiento | Azul Colchones',
  description: '✨ Guía completa de cuidado y mantenimiento de colchones. ✅ Limpieza ✅ Ventilación ✅ Rotación ✅ Protección ✅ Prolongá la vida útil. Tips profesionales para mantener tu colchón como nuevo.',
  
  keywords: [
    // === CORE ===
    'cuidado del colchón',
    'mantenimiento colchón',
    'como cuidar un colchón',
    'mantener colchón',
    
    // === ACCIONES ===
    'limpiar colchón',
    'ventilar colchón',
    'girar colchón',
    'voltear colchón',
    'proteger colchón',
    
    // === PROBLEMAS ===
    'manchas colchón',
    'ácaros colchón',
    'humedad colchón',
    'olor colchón',
    
    // === PRODUCTOS ===
    'protector de colchón',
    'productos limpieza colchón',
    'aspirar colchón',
    
    // === VIDA ÚTIL ===
    'duración colchón',
    'vida útil colchón',
    'cuando cambiar colchón',
    
    // === LONG TAIL ===
    'cada cuanto girar el colchón',
    'como limpiar manchas del colchón',
    'como eliminar ácaros del colchón',
    'mejor protector para colchón',
  ].join(', '),
  
  openGraph: {
    title: '✨ Cuidado del Colchón | Guía Completa de Mantenimiento',
    description: 'Limpieza, ventilación, rotación y protección | Prolongá la vida útil de tu colchón',
    type: 'article',
    locale: 'es_AR',
    url: `${BASE_URL}/cuidado-colchon`,
    siteName: 'Azul Colchones Villa María',
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
    canonical: `${BASE_URL}/cuidado-colchon`,
  },
  
  category: 'Guide',
}

export default function CuidadoColchonLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}