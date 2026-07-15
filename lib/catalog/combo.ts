// lib/catalog/combo.ts — Datos para "Armá tu combo" (colchón + sommier oficial + accesorios)
import { prisma } from '@/lib/prisma'
import { centavosToARS } from '@/lib/utils/currency'

export interface ComboVariant {
  id: string
  sku: string
  plaza: string | null
  measure: string
  price: number // pesos
  priceList: number | null // PVP sugerido (tachado), pesos
  available: boolean
}

export interface ComboProduct {
  id: string
  name: string
  slug: string
  image: string | null
  bajoPedido: boolean
  variants: ComboVariant[]
}

export interface ComboMattress extends ComboProduct {
  // sommier oficial recomendado (ComboSuggestion); null si no tiene combo
  sommier: ComboProduct | null
}

export interface ComboBuilderData {
  mattresses: ComboMattress[]
  pillows: ComboProduct[]
  protectors: ComboProduct[]
}

function toComboProduct(p: any): ComboProduct {
  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    image: p.image || p.images?.[0] || null,
    bajoPedido: p.bajoPedido,
    variants: (p.variants ?? []).map((v: any) => ({
      id: v.id,
      sku: v.sku,
      plaza: v.plaza,
      measure: v.measure ?? v.dimensions,
      price: centavosToARS(v.price),
      priceList: v.priceList != null ? centavosToARS(v.priceList) : null,
      available: v.available,
    })),
  }
}

export async function getComboBuilderData(): Promise<ComboBuilderData> {
  const [mattressesRaw, pillowsRaw, protectorsRaw] = await Promise.all([
    prisma.product.findMany({
      where: { isActive: true, categoryRel: { slug: 'colchones' } },
      orderBy: [{ isBestSeller: 'desc' }, { price: 'asc' }],
      include: {
        variants: { where: { isActive: true }, orderBy: [{ price: 'asc' }] },
        comboAsMattress: {
          include: {
            sommier: {
              include: {
                variants: { where: { isActive: true }, orderBy: [{ price: 'asc' }] },
              },
            },
          },
        },
      },
    }),
    prisma.product.findMany({
      where: { isActive: true, categoryRel: { slug: 'almohadas' } },
      orderBy: { price: 'asc' },
      include: { variants: { where: { isActive: true }, orderBy: [{ price: 'asc' }] } },
    }),
    prisma.product.findMany({
      where: { isActive: true, categoryRel: { slug: 'protectores' } },
      orderBy: { price: 'asc' },
      include: { variants: { where: { isActive: true }, orderBy: [{ price: 'asc' }] } },
    }),
  ])

  const mattresses: ComboMattress[] = mattressesRaw.map((m) => {
    const sommierProduct = m.comboAsMattress[0]?.sommier ?? null
    return {
      ...toComboProduct(m),
      sommier: sommierProduct ? toComboProduct(sommierProduct) : null,
    }
  })

  return {
    mattresses,
    pillows: pillowsRaw.map(toComboProduct),
    protectors: protectorsRaw.map(toComboProduct),
  }
}
