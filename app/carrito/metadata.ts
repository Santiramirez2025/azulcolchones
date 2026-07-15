// app/carrito/metadata.ts - SEO OPTIMIZADO PARA CARRITO 🛒
import { Metadata } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://azulcolchones.com'

export const metadata: Metadata = {
  title: 'Carrito de Compras | Azul Colchones Villa María | Hasta 12 Cuotas',
  description: '🛒 Tu carrito en Azul Colchones. ✅ Envío GRATIS Villa María 24-48hs ✅ Hasta 3 cuotas ✅ Pago 100% seguro ✅ Devolución gratuita 100 noches. Finalizá tu compra ahora.',
  
  keywords: [
    // Core
    'carrito compras colchones',
    'finalizar compra colchones villa maría',
    'checkout colchones',
    
    // Payment
    'pago colchones cuotas',
    'mercado pago colchones',
    '3 cuotas',
    'financiación colchones',
    
    // Shipping
    'envío gratis villa maría',
    'entrega colchones villa maría',
    'envío rápido córdoba',
    
    // Trust
    'compra segura colchones',
    'garantía colchones',
    'devolución gratis 100 noches',
  ].join(', '),
  
  robots: {
    index: false, // ✅ No indexar carritos (contenido dinámico)
    follow: true,
  },
  
  openGraph: {
    title: '🛒 Finalizá tu compra | Azul Colchones',
    description: 'Envío GRATIS 24-48hs | 12 cuotas | Pago seguro',
    url: `${BASE_URL}/carrito`,
    type: 'website',
    locale: 'es_AR',
  },
  
  alternates: {
    canonical: `${BASE_URL}/carrito`,
  },
}