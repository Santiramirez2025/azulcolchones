// app/checkout/success/page.tsx - ULTRA OPTIMIZED ⚡ SERVER COMPONENT
import type { Metadata } from 'next'
import { Suspense } from 'react'
import { CheckoutSuccessClient } from './CheckoutSuccessClient'
import { Loader2 } from 'lucide-react'

// ============================================================================
// METADATA & SEO
// ============================================================================
export const metadata: Metadata = {
  title: 'Pedido Confirmado ✓ | Azul Colchones Villa María',
  description: 'Tu pedido fue confirmado exitosamente. Gracias por tu compra en Azul Colchones. Envío gratis a Villa María en 2-3 días hábiles. Seguimiento en tiempo real.',
  robots: {
    index: false, // Don't index success pages (duplicate content + privacy)
    follow: false,
    noarchive: true,
  },
}

// ============================================================================
// PERFORMANCE CONFIGURATION
// ============================================================================
export const dynamic = 'force-dynamic' // Always fresh for order confirmation
export const revalidate = 0 // No caching for privacy

// ============================================================================
// LOADING FALLBACK - MOBILE OPTIMIZED
// ============================================================================
function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-16 h-16 text-blue-500 animate-spin mx-auto mb-4" aria-hidden="true" />
        <p className="text-white text-lg font-semibold">Verificando tu pedido...</p>
        <p className="text-zinc-400 text-sm mt-2">Esto solo tomará un momento</p>
        <span className="sr-only">Cargando confirmación de pedido</span>
      </div>
    </div>
  )
}

// ============================================================================
// JSON-LD SCHEMAS
// ============================================================================
function generateSuccessSchemas() {
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Pedido Confirmado',
    description: 'Confirmación de pedido exitoso',
    url: 'https://azulcolchones.com.ar/checkout/success',
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: 'https://azulcolchones.com.ar',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Checkout',
        item: 'https://azulcolchones.com.ar/checkout',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Confirmación',
        item: 'https://azulcolchones.com.ar/checkout/success',
      },
    ],
  }

  return { webPageSchema, breadcrumbSchema }
}

// ============================================================================
// MAIN PAGE COMPONENT (SERVER)
// ============================================================================
export default function CheckoutSuccessPage() {
  const { webPageSchema, breadcrumbSchema } = generateSuccessSchemas()

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
        key="webpage-schema"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        key="breadcrumb-schema"
      />

      {/* Main Content */}
      <Suspense fallback={<LoadingFallback />}>
        <CheckoutSuccessClient />
      </Suspense>

      {/* Hidden SEO Content (minimal for success page) */}
      <aside className="sr-only" aria-hidden="true">
        <h1>Pedido Confirmado - Compra Exitosa en Azul Colchones Villa María</h1>
        <p>
          Tu pedido fue procesado correctamente. Recibirás un email de confirmación
          con todos los detalles. Envío gratis a Villa María, Córdoba en 2-3 días hábiles.
          Garantía de 5 años incluida.
        </p>
        <h2>Próximos Pasos</h2>
        <ul>
          <li>Recibirás email de confirmación con detalles del pedido</li>
          <li>Te enviaremos número de seguimiento cuando se despache</li>
          <li>Podés hacer seguimiento desde tu cuenta</li>
          <li>Contactanos por WhatsApp: 353 401 7332</li>
        </ul>
        <h2>Información de Contacto</h2>
        <p>
          WhatsApp: 353 401 7332<br />
          Email: hola@azulcolchones.com.ar<br />
          Ubicación: Villa María, Córdoba, Argentina
        </p>
      </aside>
    </>
  )
}