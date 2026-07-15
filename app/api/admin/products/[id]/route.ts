// app/api/admin/products/[id]/route.ts — Actualiza un producto (admin). Protegido por middleware.
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { arsToCentavos } from '@/lib/utils/currency'

export const runtime = 'nodejs'

const Schema = z.object({
  name: z.string().min(1).max(120),
  subtitle: z.string().max(200).optional().default(''),
  description: z.string().max(4000).optional().default(''),
  line: z.string().max(30).nullable().optional(),
  springType: z.string().max(30).nullable().optional(),
  warranty: z.number().int().min(0).max(20),
  isActive: z.boolean(),
  isFeatured: z.boolean(),
  isBestSeller: z.boolean(),
  bajoPedido: z.boolean(),
  images: z.array(z.string().max(600)).max(12),
  variants: z
    .array(
      z.object({
        id: z.string(),
        priceARS: z.number().min(0).max(50_000_000),
        priceListARS: z.number().min(0).max(80_000_000).nullable().optional(),
        stock: z.number().int().min(0).max(9999),
        available: z.boolean(),
      }),
    )
    .max(20),
})

export async function PATCH(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params

  let data: z.infer<typeof Schema>
  try {
    data = Schema.parse(await req.json())
  } catch (e) {
    return NextResponse.json({ error: 'Datos inválidos', detail: String(e) }, { status: 400 })
  }

  const existing = await prisma.product.findUnique({ where: { id }, include: { variants: true } })
  if (!existing) return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 })

  const validIds = new Set(existing.variants.map((v) => v.id))
  const variants = data.variants.filter((v) => validIds.has(v.id))

  const priceCents = variants.map((v) => arsToCentavos(v.priceARS))
  const minPrice = priceCents.length ? Math.min(...priceCents) : existing.price
  const minList = variants.length
    ? Math.min(
        ...variants.map((v) =>
          v.priceListARS ? arsToCentavos(v.priceListARS) : arsToCentavos(v.priceARS),
        ),
      )
    : existing.originalPrice ?? minPrice
  const discount =
    minList > minPrice ? Math.round((1 - minPrice / minList) * 100) : 0

  try {
    await prisma.$transaction([
      prisma.product.update({
        where: { id },
        data: {
          name: data.name,
          subtitle: data.subtitle,
          description: data.description,
          line: data.line || null,
          springType: data.springType || null,
          warranty: data.warranty,
          isActive: data.isActive,
          isFeatured: data.isFeatured,
          isBestSeller: data.isBestSeller,
          bajoPedido: data.bajoPedido,
          images: data.images,
          image: data.images[0] ?? null,
          price: minPrice,
          originalPrice: minList,
          discount,
          inStock: !data.bajoPedido,
        },
      }),
      ...variants.map((v) =>
        prisma.productVariant.update({
          where: { id: v.id },
          data: {
            price: arsToCentavos(v.priceARS),
            priceList: v.priceListARS ? arsToCentavos(v.priceListARS) : arsToCentavos(v.priceARS),
            originalPrice: v.priceListARS
              ? arsToCentavos(v.priceListARS)
              : arsToCentavos(v.priceARS),
            stock: v.stock,
            available: v.available,
            inStock: v.available && v.stock > 0,
          },
        }),
      ),
    ])
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: 'No se pudo guardar', detail: String(e) }, { status: 500 })
  }
}
