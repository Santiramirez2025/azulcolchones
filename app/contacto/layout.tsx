// app/contacto/layout.tsx - METADATA SEO EXHAUSTIVA
import { Metadata } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://azulcolchones.com'

export const metadata: Metadata = {
  title: 'Contacto | Azul Colchones Villa María | Showroom y Atención al Cliente',
  description: '📞 Contactá con Azul Colchones en Villa María. ✅ Showroom en Balerdi 855 ✅ WhatsApp +54 9 3534 09-6566 ✅ Atención personalizada ✅ 35+ años de experiencia ✅ Lun-Vie 9-18hs. ¡Te asesoramos!',
  
  keywords: [
    // === CORE ===
    'contacto azul colchones',
    'contacto colchones villa maría',
    'showroom colchones villa maría',
    'teléfono azul colchones',
    
    // === LOCAL ===
    'tienda colchones villa maría',
    'local colchones balerdi 855',
    'colchonería villa maría córdoba',
    'donde comprar colchones villa maría',
    
    // === SERVICIOS ===
    'asesoramiento colchones',
    'atención cliente colchones',
    'consulta colchones villa maría',
    'horario tienda colchones',
    
    // === LONG TAIL ===
    'como llegar azul colchones',
    'dirección tienda colchones villa maría',
    'teléfono colchonería villa maría',
    'contactar azul colchones',
    'visitar showroom colchones',
  ].join(', '),
  
  openGraph: {
    title: '📞 Contacto | Azul Colchones Villa María',
    description: 'Showroom en Balerdi 855 | WhatsApp | Atención personalizada',
    type: 'website',
    locale: 'es_AR',
    url: `${BASE_URL}/contacto`,
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
    canonical: `${BASE_URL}/contacto`,
  },
  
  other: {
    'geo.region': 'AR-X',
    'geo.placename': 'Villa María',
    'geo.position': '-32.4115;-63.2407',
  },
}

export default function ContactoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}