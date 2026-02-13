'use client'

import { Producto } from '@/data/productos'
import ProductCard from './ProductCard'

interface ProductGridProps {
  productos: Producto[]
}

export default function ProductGrid({ productos }: ProductGridProps) {
  if (productos.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-block p-8 bg-zinc-800/40 backdrop-blur-sm rounded-2xl border border-zinc-700/50">
          <svg
            className="w-16 h-16 text-zinc-600 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-zinc-400 text-lg font-medium">
            No se encontraron productos
          </p>
          <p className="text-zinc-500 text-sm mt-2">
            Intentá con otro término de búsqueda o filtro
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="text-center mb-8">
        <p className="text-sm text-zinc-500">
          Mostrando <strong className="text-white">{productos.length}</strong>{' '}
          {productos.length === 1 ? 'producto' : 'productos'}
        </p>
      </div>

      <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-16" role="list">
        {productos.map((producto) => (
          <div key={producto.id} role="listitem">
            <ProductCard producto={producto} />
          </div>
        ))}
      </div>
    </>
  )
}