// app/mi-cuenta/page.tsx - ULTRA OPTIMIZED ⚡ SEO 🚀
import type { Metadata } from 'next'
import { MiCuentaClient } from './MiCuentaClient'

// ============================================================================
// METADATA & SEO
// ============================================================================
export const metadata: Metadata = {
  title: 'Mi Cuenta | Azul Colchones - Gestión de Pedidos y Perfil',
  description: 'Gestioná tus pedidos de colchones, actualizá tu perfil, guardá direcciones y accedé a ofertas exclusivas. Seguimiento en tiempo real de tus compras en Azul Colchones.',
  keywords: [
    'mi cuenta azul colchones',
    'gestión de pedidos',
    'seguimiento pedidos',
    'perfil cliente',
    'historial compras',
    'área cliente colchones',
    'mis pedidos',
  ],
  openGraph: {
    title: 'Mi Cuenta | Azul Colchones',
    description: 'Gestioná tus pedidos y perfil en Azul Colchones',
    type: 'website',
    locale: 'es_AR',
    siteName: 'Azul Colchones',
  },
  twitter: {
    card: 'summary',
    title: 'Mi Cuenta | Azul Colchones',
    description: 'Gestioná tus pedidos y perfil',
  },
  robots: {
    index: false, // User account pages shouldn't be indexed
    follow: true,
    noarchive: true,
    nocache: true,
  },
  alternates: {
    canonical: 'https://azulcolchones.com.ar/mi-cuenta',
  },
}

// ============================================================================
// PERFORMANCE CONFIGURATION
// ============================================================================
export const dynamic = 'force-dynamic' // Always fresh for user data
export const revalidate = 0

// ============================================================================
// MAIN PAGE COMPONENT (SERVER)
// ============================================================================
export default function MiCuentaPage() {
  // Structured Data for Account Page
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Mi Cuenta - Azul Colchones',
    description: 'Página de gestión de cuenta y pedidos',
    url: 'https://azulcolchones.com.ar/mi-cuenta',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Azul Colchones',
      url: 'https://azulcolchones.com.ar',
    },
    breadcrumb: {
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
          name: 'Mi Cuenta',
          item: 'https://azulcolchones.com.ar/mi-cuenta',
        },
      ],
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
      <MiCuentaClient />

      {/* Hidden SEO Content */}
      <aside className="sr-only" aria-hidden="true">
        <h1>Mi Cuenta - Azul Colchones Argentina</h1>
        <p>
          Accedé a tu cuenta de Azul Colchones para gestionar tus pedidos de colchones,
          ver el estado de tus envíos, actualizar tu información personal, y mucho más.
        </p>
        
        <h2>Funcionalidades de tu cuenta</h2>
        <ul>
          <li>Ver historial completo de pedidos de colchones</li>
          <li>Seguimiento en tiempo real de envíos</li>
          <li>Gestión de direcciones de entrega</li>
          <li>Lista de productos favoritos</li>
          <li>Configuración de perfil y preferencias</li>
          <li>Acceso a ofertas exclusivas para clientes</li>
          <li>Estado de pedidos: pendiente, procesando, enviado, entregado</li>
        </ul>
        
        <h2>Mis Pedidos</h2>
        <p>
          Visualizá todos tus pedidos de colchones realizados en Azul Colchones.
          Seguí el estado de tu compra desde la confirmación hasta la entrega en tu domicilio.
          Información detallada de cada pedido con número de seguimiento y fecha estimada de llegada.
        </p>
        
        <h2>Gestión de direcciones</h2>
        <p>
          Guardá múltiples direcciones de envío para agilizar futuras compras.
          Actualizá tu información de contacto y dirección de entrega en cualquier momento.
        </p>
        
        <h2>Beneficios de clientes registrados</h2>
        <ul>
          <li>Proceso de compra más rápido</li>
          <li>Ofertas y descuentos exclusivos</li>
          <li>Acceso prioritario a lanzamientos</li>
          <li>Programa de puntos y recompensas</li>
          <li>Soporte prioritario</li>
        </ul>
      </aside>
    </>
  )
}