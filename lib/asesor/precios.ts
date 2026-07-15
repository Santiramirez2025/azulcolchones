// lib/asesor/precios.ts — Precios reales por (modelo asesor, medida) desde la DB.
import { prisma } from '@/lib/prisma'
import { centavosToARS } from '@/lib/utils/currency'
import {
  ASESOR_TO_DB_SLUG,
  MEDIDA_TO_MEASURE,
  MEDIDA_LABEL,
  type Medida,
  type PreciosAsesor,
  type SlugModelo,
} from '@/components/asesor/logicaRecomendacion'

export async function getPreciosAsesor(): Promise<PreciosAsesor> {
  const dbSlugToAsesor = Object.fromEntries(
    Object.entries(ASESOR_TO_DB_SLUG).map(([asesor, db]) => [db, asesor as SlugModelo]),
  ) as Record<string, SlugModelo>
  const measureToMedida = Object.fromEntries(
    Object.entries(MEDIDA_TO_MEASURE).map(([medida, measure]) => [measure, medida as Medida]),
  ) as Record<string, Medida>

  const variants = await prisma.productVariant.findMany({
    where: {
      isActive: true,
      measure: { in: Object.values(MEDIDA_TO_MEASURE) },
      product: { slug: { in: Object.values(ASESOR_TO_DB_SLUG) } },
    },
    select: {
      price: true,
      priceList: true,
      measure: true,
      product: { select: { slug: true } },
    },
  })

  const precios: PreciosAsesor = {}
  for (const v of variants) {
    const asesorSlug = dbSlugToAsesor[v.product.slug]
    const medida = v.measure ? measureToMedida[v.measure] : undefined
    if (!asesorSlug || !medida) continue
    if (!precios[asesorSlug]) precios[asesorSlug] = {}
    precios[asesorSlug]![medida] = {
      precio: centavosToARS(v.price),
      display: `${v.measure} · ${MEDIDA_LABEL[medida]}`,
      precioLista: v.priceList != null ? centavosToARS(v.priceList) : undefined,
    }
  }
  return precios
}
