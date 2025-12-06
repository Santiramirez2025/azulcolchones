// app/carrito/layout.tsx - ✅ METADATA SEO OPTIMIZADA
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Carrito de Compras | Azul Colchones Villa María',
  description: 'Finalizá tu compra de colchones premium con envío gratis, hasta 12 cuotas sin interés y garantía de 100 noches de prueba.',
  robots: {
    index: false, // ✅ CRÍTICO: No indexar carritos
    follow: false,
    nocache: true,
  },
  openGraph: {
    title: 'Carrito | Azul Colchones',
    description: 'Finalizá tu compra con envío gratis',
    type: 'website',
  }
}

export default function CarritoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}