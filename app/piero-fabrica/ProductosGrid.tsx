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
        <p className="text-zinc-400 text-lg">No se encontraron productos con ese filtro</p>
      </div>
    )
  }

  return (
    <>
      <div className="text-center mb-8">
        <p className="text-sm text-zinc-500">
          Mostrando <strong className="text-white">{productos.length}</strong> productos
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