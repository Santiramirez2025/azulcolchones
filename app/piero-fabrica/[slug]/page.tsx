// app/piero-fabrica/[slug]/page.tsx
// ============================================================================
// PRODUCT PAGE DINÁMICA — SEO + CONVERSIÓN
// ============================================================================

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PRODUCTOS } from '@/data/productos'
import {
  agruparProductosPorModelo,
  generarSlug,
  formatPrecio,
} from '../product-helpers'
import ProductDetailPage from '../ProductDetailPage'

// ── Helpers ──────────────────────────────────────────────

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://azulcolchones.com'

function getProductosPorSlug() {
  const grupos = agruparProductosPorModelo(PRODUCTOS)
  const mapa = new Map<string, (typeof grupos)[number]>()

  for (const grupo of grupos) {
    const slug = generarSlug(grupo.modelo)
    mapa.set(slug, grupo)
  }

  return mapa
}

// ── Generate Static Params ───────────────────────────────

export async function generateStaticParams() {
  const mapa = getProductosPorSlug()
  return Array.from(mapa.keys()).map((slug) => ({ slug }))
}

// ── Metadata SEO ─────────────────────────────────────────

type PageProps = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const mapa = getProductosPorSlug()
  const grupo = mapa.get(slug)

  if (!grupo) {
    return { title: 'Producto no encontrado | Azul Colchones' }
  }

  const { modelo, variantes } = grupo

  const precios = variantes.map((v) => v.precioPublico)
  const minPrecio = Math.min(...precios)
  const maxPrecio = Math.max(...precios)
  const precioRango =
    minPrecio === maxPrecio
      ? `$${formatPrecio(minPrecio)}`
      : `Desde $${formatPrecio(minPrecio)}`

  const ahorros = variantes
    .filter((v) => v.precioMercadoLibre)
    .map((v) => Math.round(((v.precioMercadoLibre! - v.precioPublico) / v.precioMercadoLibre!) * 100))
  const maxAhorro = ahorros.length > 0 ? Math.max(...ahorros) : 0

  const title = `Colchón Piero ${modelo} | ${precioRango} | Azul Colchones`
  const description = `Colchón Piero ${modelo}. Precio fábrica ${precioRango}${maxAhorro > 0 ? ` (ahorrás hasta ${maxAhorro}% vs MercadoLibre)` : ''}. Garantía oficial PIERO. Entrega 7-10 días. Villa María, Córdoba.`

  return {
    title,
    description,
    keywords: [
      `colchón Piero ${modelo}`,
      `Piero ${modelo} precio`,
      `colchón ${modelo} fábrica`,
      'colchones PIERO Villa María',
      'colchones Córdoba descuento',
    ],
    alternates: {
      canonical: `${siteUrl}/piero-fabrica/${slug}`,
    },
    openGraph: {
      type: 'website',
      url: `${siteUrl}/piero-fabrica/${slug}`,
      siteName: 'Azul Colchones',
      title: `Piero ${modelo} — ${precioRango} | Azul Colchones`,
      description,
      images: [
        {
          url: grupo.imagen
            ? `${siteUrl}${grupo.imagen}`
            : `${siteUrl}/og-piero-fabrica.jpg`,
          width: 1200,
          height: 630,
          alt: `Colchón Piero ${modelo} - Azul Colchones`,
        },
      ],
      locale: 'es_AR',
    },
    robots: 'index, follow',
  }
}

// ── Revalidation ─────────────────────────────────────────

export const revalidate = 43200

// ── Page Component ───────────────────────────────────────

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params
  const mapa = getProductosPorSlug()
  const grupo = mapa.get(slug)

  if (!grupo) {
    notFound()
  }

  const { modelo, variantes } = grupo

  const precios = variantes.map((v) => v.precioPublico)
  const minPrecio = Math.min(...precios)
  const maxPrecio = Math.max(...precios)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `Colchón Piero ${modelo}`,
    description: `Colchón Piero ${modelo}. Directo de fábrica con garantía oficial. Distribuidor oficial en Villa María, Córdoba.`,
    brand: { '@type': 'Brand', name: 'PIERO' },
    image: grupo.imagen ? `${siteUrl}${grupo.imagen}` : undefined,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'ARS',
      lowPrice: minPrecio,
      highPrice: maxPrecio,
      offerCount: variantes.length,
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: 'Azul Colchones', url: siteUrl },
    },
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Catálogo PIERO Fábrica', item: `${siteUrl}/piero-fabrica` },
      { '@type': 'ListItem', position: 3, name: `Piero ${modelo}`, item: `${siteUrl}/piero-fabrica/${slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <ProductDetailPage modelo={modelo} variantes={variantes} />
    </>
  )
}