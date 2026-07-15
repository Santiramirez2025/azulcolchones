// components/home/FeaturedGrid.tsx — "Más vendidos" en la home. Reusa la card del catálogo.
import Link from 'next/link'
import ProductCard from '@/app/catalogo/components/ProductCard'
import type { NormalizedProduct } from '@/app/catalogo/components/types'

export default function FeaturedGrid({
  products,
  avgPrice,
}: {
  products: NormalizedProduct[]
  avgPrice: number
}) {
  if (products.length === 0) return null

  return (
    <section className="bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-black text-gray-900 sm:text-3xl">Los más elegidos</h2>
            <p className="mt-1 text-gray-500">
              Colchones Piero directo de fábrica, con precio y ahorro real.
            </p>
          </div>
          <Link
            href="/catalogo"
            className="shrink-0 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-blue-500"
          >
            Ver todo el catálogo →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} avgPrice={avgPrice} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/catalogo"
            className="inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white"
          >
            Ver todo el catálogo →
          </Link>
        </div>
      </div>
    </section>
  )
}
