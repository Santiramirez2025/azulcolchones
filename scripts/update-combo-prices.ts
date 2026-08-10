// One-off: actualiza precios de combos en la DB (centavos). Idempotente.
// Combo Queen (200×160) no cambia (ya está en 1.099.000).
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// pesos → centavos
const ARS = (pesos: number) => Math.round(pesos * 100)

const UPDATES: Array<{ slug: string; pesos: number }> = [
  { slug: 'combo-foam-1-plaza', pesos: 549000 },
  { slug: 'combo-foam-2-plazas', pesos: 749000 },
]

async function main() {
  for (const { slug, pesos } of UPDATES) {
    const cents = ARS(pesos)
    const before = await prisma.product.findUnique({
      where: { slug },
      select: { id: true, name: true, price: true, variants: { select: { id: true, price: true } } },
    })
    if (!before) {
      console.warn(`⚠️  No existe producto: ${slug}`)
      continue
    }
    await prisma.product.update({ where: { slug }, data: { price: cents } })
    await prisma.productVariant.updateMany({ where: { productId: before.id }, data: { price: cents } })

    const after = await prisma.product.findUnique({
      where: { slug },
      select: { name: true, price: true, variants: { select: { price: true } } },
    })
    console.log(
      `✅ ${before.name}: product ${before.price} → ${after!.price} | variantes ${before.variants
        .map((v) => v.price)
        .join(',')} → ${after!.variants.map((v) => v.price).join(',')}`
    )
  }
  console.log('Listo.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
