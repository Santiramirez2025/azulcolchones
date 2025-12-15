// app/login/page.tsx - ULTRA OPTIMIZED ⚡ SEO 🚀
import type { Metadata } from 'next'
import { LoginClient } from './LoginClient'

// ============================================================================
// METADATA & SEO
// ============================================================================
export const metadata: Metadata = {
  title: 'Iniciar Sesión | Azul Colchones - Tu Cuenta',
  description: 'Iniciá sesión en Azul Colchones para gestionar tus pedidos, ver tu historial de compras y acceder a ofertas exclusivas. Envío gratis y 12 cuotas sin interés.',
  keywords: [
    'login azul colchones',
    'mi cuenta',
    'iniciar sesión',
    'registro colchones',
    'crear cuenta',
    'área de cliente',
    'gestión de pedidos',
  ],
  openGraph: {
    title: 'Iniciar Sesión | Azul Colchones',
    description: 'Accedé a tu cuenta para gestionar pedidos y acceder a beneficios exclusivos',
    type: 'website',
    locale: 'es_AR',
    siteName: 'Azul Colchones',
  },
  twitter: {
    card: 'summary',
    title: 'Iniciar Sesión | Azul Colchones',
    description: 'Accedé a tu cuenta para gestionar pedidos y beneficios exclusivos',
  },
  robots: {
    index: false, // Login pages shouldn't be indexed
    follow: true,
    nocache: true,
  },
  alternates: {
    canonical: 'https://azulcolchones.com.ar/login',
  },
}

// ============================================================================
// PERFORMANCE CONFIGURATION
// ============================================================================
export const dynamic = 'force-dynamic' // Always fresh for auth
export const revalidate = 0

// ============================================================================
// MAIN PAGE COMPONENT (SERVER)
// ============================================================================
export default function LoginPage() {
  // Structured Data for Login Page
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Iniciar Sesión - Azul Colchones',
    description: 'Página de inicio de sesión y registro',
    url: 'https://azulcolchones.com.ar/login',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Azul Colchones',
      url: 'https://azulcolchones.com.ar',
    },
    potentialAction: {
      '@type': 'LoginAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://azulcolchones.com.ar/login',
      },
    },
  }

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Main Content */}
      <LoginClient />

      {/* Hidden SEO Content */}
      <aside className="sr-only" aria-hidden="true">
        <h1>Iniciar Sesión en Azul Colchones</h1>
        <p>
          Accedé a tu cuenta de Azul Colchones para gestionar tus pedidos de colchones,
          ver tu historial de compras, y acceder a ofertas exclusivas para clientes registrados.
        </p>
        <h2>Beneficios de tener cuenta</h2>
        <ul>
          <li>Seguimiento de pedidos en tiempo real</li>
          <li>Historial completo de compras</li>
          <li>Ofertas y descuentos exclusivos</li>
          <li>Proceso de compra más rápido</li>
          <li>Guardá tus direcciones de envío</li>
          <li>Acceso prioritario a nuevos productos</li>
        </ul>
        <h2>Métodos de inicio de sesión</h2>
        <ul>
          <li>Email y contraseña</li>
          <li>Inicio de sesión con Google</li>
          <li>Recuperación de contraseña disponible</li>
        </ul>
      </aside>
    </>
  )
}