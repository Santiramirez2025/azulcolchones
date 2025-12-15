// app/checkout/success/layout.tsx - METADATA SEO
import { Metadata } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://azulcolchones.com'

export const metadata: Metadata = {
  title: 'Compra Exitosa ✅ | Azul Colchones Villa María | Pedido Confirmado',
  description: '🎉 ¡Tu compra fue exitosa! Pedido confirmado. Envío gratis a Villa María en 24-48hs. Seguí tu pedido y recibí tu colchón en casa.',
  
  keywords: [
    'compra exitosa',
    'pedido confirmado',
    'checkout exitoso',
    'orden confirmada',
  ].join(', '),
  
  robots: {
    index: false, // ✅ No indexar página de transacción
    follow: false,
  },
  
  openGraph: {
    title: '✅ Compra Exitosa - Azul Colchones',
    description: 'Pedido confirmado | Envío gratis en 24-48hs',
    type: 'website',
    locale: 'es_AR',
    url: `${BASE_URL}/checkout/success`,
  },
}

export default function CheckoutSuccessLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}