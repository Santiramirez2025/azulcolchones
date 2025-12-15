// app/cookies/layout.tsx - METADATA SEO
import { Metadata } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://azulcolchones.com'

export const metadata: Metadata = {
  title: 'Política de Cookies | Azul Colchones Villa María | Privacidad y Transparencia',
  description: '🍪 Política de cookies de Azul Colchones. ✅ Transparente y simple ✅ Gestión de preferencias ✅ Cumplimiento Ley 25.326 ✅ Cookies esenciales y analíticas. Controlá tu privacidad.',
  
  keywords: [
    // === CORE ===
    'política de cookies',
    'cookies azul colchones',
    'privacidad cookies',
    'gestión cookies',
    
    // === PRIVACY ===
    'control cookies',
    'preferencias cookies',
    'cookies navegador',
    'deshabilitar cookies',
    
    // === LEGAL ===
    'ley 25326',
    'protección datos personales',
    'privacidad argentina',
    
    // === TYPES ===
    'cookies esenciales',
    'cookies analíticas',
    'tipos de cookies',
  ].join(', '),
  
  openGraph: {
    title: '🍪 Política de Cookies | Azul Colchones',
    description: 'Gestión transparente de cookies | Controlá tu privacidad',
    type: 'website',
    locale: 'es_AR',
    url: `${BASE_URL}/cookies`,
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
    canonical: `${BASE_URL}/cookies`,
  },
}

export default function CookiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}