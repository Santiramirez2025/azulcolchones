// app/site-access/page.tsx - ULTRA OPTIMIZED ⚡ SERVER COMPONENT
import type { Metadata } from 'next'
import { SiteAccessClient } from './SiteAccessClient'

// ============================================================================
// METADATA & SEO
// ============================================================================
export const metadata: Metadata = {
  title: 'Acceso al Sitio | Azul Colchones Villa María',
  description: 'Acceso protegido al sitio web de Azul Colchones. Ingresá con tus credenciales para continuar.',
  robots: {
    index: false, // CRITICAL: Don't index login/protected pages
    follow: false,
    noarchive: true,
    nocache: true,
  },
}

// ============================================================================
// PERFORMANCE CONFIGURATION
// ============================================================================
export const dynamic = 'force-dynamic' // Always fresh for auth
export const revalidate = 0 // No caching for security

// ============================================================================
// MAIN PAGE COMPONENT (SERVER)
// ============================================================================
export default function SiteAccessPage() {
  // WebPage Schema
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Acceso al Sitio',
    description: 'Página de acceso protegido',
    url: 'https://azulcolchones.com.ar/site-access',
  }

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />

      {/* Main Content */}
      <SiteAccessClient />

      {/* Hidden SEO Content (minimal for protected page) */}
      <aside className="sr-only" aria-hidden="true">
        <h1>Acceso Protegido al Sitio - Azul Colchones Villa María</h1>
        <p>
          Página de acceso seguro al sitio web de Azul Colchones. Requiere credenciales
          de usuario válidas para continuar. Conexión cifrada y segura.
        </p>
      </aside>
    </>
  )
}