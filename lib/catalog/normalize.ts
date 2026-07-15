// lib/catalog/normalize.ts — Normaliza productos Prisma (centavos) → NormalizedProduct (pesos).
// Reusado por el catálogo y por la home (más vendidos).
import { centavosToARS } from '@/lib/utils/currency'
import type { getCatalogProducts } from '@/lib/api/products'
import type { NormalizedProduct } from '@/app/catalogo/components/types'

export type CatalogProduct = Awaited<ReturnType<typeof getCatalogProducts>>[number]

export function normalizeProduct(p: CatalogProduct): NormalizedProduct {
  const variants = (p.variants ?? []).map((v) => ({
    id: v.id,
    productId: v.productId,
    size: v.measure ?? v.dimensions,
    dimensions: v.measure ?? v.dimensions,
    plaza: v.plaza,
    measure: v.measure,
    price: centavosToARS(v.price),
    originalPrice: v.priceList != null ? centavosToARS(v.priceList) : null,
    stock: v.stock,
    sku: v.sku,
    isActive: v.isActive,
  }))

  const minPrice = variants.length
    ? Math.min(...variants.map((v) => v.price))
    : centavosToARS(p.price)

  const plazas = Array.from(
    new Set(variants.map((v) => v.plaza).filter((x): x is string => Boolean(x))),
  )

  const images =
    Array.isArray(p.images) && p.images.length > 0 ? p.images : p.image ? [p.image] : []

  return {
    id: p.id,
    name: p.name,
    subtitle: p.subtitle ?? '',
    slug: p.slug,
    description: p.description ?? '',
    price: minPrice,
    originalPrice: p.originalPrice != null ? centavosToARS(p.originalPrice) : null,
    discount: p.discount ?? 0,
    rating: p.rating,
    reviewCount: p.reviewCount,
    firmness: p.firmness ?? '',
    badge: p.badge,
    story: p.story ?? '',
    isNew: p.isNew,
    isBestSeller: p.isBestSeller,
    isPremium: p.isPremium,
    images,
    image: p.image,
    features: '',
    techFeatures: '',
    certifications: '',
    highlights: Array.isArray(p.highlights) ? p.highlights.join('\n') : '',
    isActive: p.isActive,
    category: p.categoryRel?.name ?? p.category,
    line: p.line,
    springType: p.springType,
    bajoPedido: p.bajoPedido,
    mainColor: p.mainColor,
    plazas,
    variants,
  }
}
