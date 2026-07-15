// app/admin/(panel)/productos/[id]/page.tsx — Editar producto (admin).
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { centavosToARS } from '@/lib/utils/currency'
import { ArrowLeft } from 'lucide-react'
import ProductEditForm from './ProductEditForm'

export const dynamic = 'force-dynamic'

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      categoryRel: true,
      variants: { orderBy: [{ isDefault: 'desc' }, { price: 'asc' }] },
    },
  })
  if (!product) notFound()

  const dto = {
    id: product.id,
    name: product.name,
    subtitle: product.subtitle ?? '',
    description: product.description ?? '',
    line: product.line ?? '',
    springType: product.springType ?? '',
    warranty: product.warranty,
    isActive: product.isActive,
    isFeatured: product.isFeatured,
    isBestSeller: product.isBestSeller,
    bajoPedido: product.bajoPedido,
    category: product.categoryRel?.name ?? product.category,
    images: Array.isArray(product.images) ? product.images : [],
    variants: product.variants.map((v) => ({
      id: v.id,
      measure: v.measure ?? v.dimensions,
      plaza: v.plaza ?? v.size,
      priceARS: centavosToARS(v.price),
      priceListARS: v.priceList != null ? centavosToARS(v.priceList) : null,
      stock: v.stock,
      available: v.available,
    })),
  }

  return (
    <div className="mx-auto max-w-4xl">
      <Link
        href="/admin/productos"
        className="mb-4 inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" /> Volver a productos
      </Link>
      <ProductEditForm product={dto} />
    </div>
  )
}
