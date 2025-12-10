// app/carrito/layout.tsx - ✅ METADATA SEO OPTIMIZADA + MOBILE
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Carrito de Compras | Azul Colchones Villa María',
  description: 'Finalizá tu compra de colchones premium con envío gratis a Villa María, hasta 12 cuotas sin interés y garantía de 100 noches de prueba.',
  robots: {
    index: false, // ✅ CRÍTICO: No indexar carritos
    follow: false,
  },
  openGraph: {
    title: 'Carrito de Compras | Azul Colchones Villa María',
    description: 'Finalizá tu compra con envío gratis a Villa María',
    type: 'website',
    locale: 'es_AR',
  },
  other: {
    'theme-color': '#3b82f6',
  }
}

export default function CarritoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}