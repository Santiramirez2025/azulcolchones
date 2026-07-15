// app/catalogo/page.tsx — DB-DRIVEN (Neon/Prisma) · Server Component
// Reemplaza el catálogo estático. Fuente única: base de datos.
import type { Metadata } from 'next'
import { getCatalogProducts } from '@/lib/api/products'
import { normalizeProduct } from '@/lib/catalog/normalize'
import CatalogoClient from './catalogo-client'

// ISR: el catálogo se revalida cada hora.
export const revalidate = 3600

const SITE = 'https://azulcolchones.com'

export const metadata: Metadata = {
  title: 'Catálogo de colchones y sommiers Piero | Azul Colchones Villa María',
  description:
    'Catálogo completo de colchones, sommiers, almohadas y accesorios Piero. Distribuidor oficial exclusivo en Villa María, Córdoba. Precio directo de fábrica, 35 años de trayectoria.',
  alternates: { canonical: `${SITE}/catalogo` },
  openGraph: {
    title: 'Catálogo Piero — Azul Colchones',
    description:
      'Colchones, sommiers y accesorios Piero directo de fábrica. Distribuidor oficial en Villa María.',
    url: `${SITE}/catalogo`,
    siteName: 'Azul Colchones',
    locale: 'es_AR',
    type: 'website',
  },
}

// ============================================================================
// PAGE
// ============================================================================
export default async function CatalogoPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const productsRaw = await getCatalogProducts()
  const products = productsRaw.map(normalizeProduct)

  return (
    <CatalogoClient
      initialProducts={products}
      totalProducts={products.length}
      initialCategory={category || 'todos'}
    />
  )
}
