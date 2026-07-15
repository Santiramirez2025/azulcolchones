// app/guia-compra/layout.tsx - METADATA SEO EXHAUSTIVA
import { Metadata } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://azulcolchones.com'

export const metadata: Metadata = {
  title: 'Guía de Compra de Colchones | Cómo Comprar Online Paso a Paso | Azul Colchones',
  description: '📋 Guía completa paso a paso para comprar tu colchón online. ✅ 6 pasos simples ✅ Consejos útiles ✅ FAQs ✅ Envío gratis ✅ 30 días prueba ✅ 3 años garantía. Aprende a elegir el colchón perfecto.',
  
  keywords: [
    // === CORE ===
    'guía compra colchones',
    'como comprar colchón online',
    'comprar colchón internet',
    'pasos comprar colchón',
    
    // === PROCESO ===
    'elegir colchón',
    'seleccionar medida colchón',
    'catalogo colchones',
    'checkout colchones',
    
    // === CARACTERÍSTICAS ===
    'medidas colchones',
    'tipos colchones',
    'firmeza colchón',
    'grosor colchón',
    
    // === SERVICIOS ===
    'envío colchones',
    'entrega colchones',
    'garantía colchones',
    'devolución colchones',
    'prueba colchones',
    
    // === PAGO ===
    'cuotas',
    'mercado pago colchones',
    'financiación colchones',
    'formas pago colchones',
    
    // === LONG TAIL ===
    'como elegir medida de colchón',
    'que tener en cuenta al comprar colchón',
    'como comprar colchón por internet',
    'cuanto demora envío colchón',
    'puedo devolver colchón online',
  ].join(', '),
  
  openGraph: {
    title: '📋 Guía de Compra de Colchones | Paso a Paso',
    description: '6 pasos simples para comprar tu colchón ideal. Envío gratis, 30 días prueba, 3 años garantía',
    type: 'website',
    locale: 'es_AR',
    url: `${BASE_URL}/guia-compra`,
    siteName: 'Azul Colchones Villa María',
  },
  
  twitter: {
    card: 'summary',
    title: '📋 Guía de Compra de Colchones',
    description: '6 pasos para comprar tu colchón online. Envío gratis, 30 días prueba.',
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
    canonical: `${BASE_URL}/guia-compra`,
  },
  
  category: 'Shopping Guide',
}

export default function GuiaCompraLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}