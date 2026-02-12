'use client'

import { useState, useCallback, useMemo } from 'react'
import { trackSearch } from '@/lib/pixel'
import { PRODUCTOS } from '@/data/productos'
import { filtrarProductos, enrichProductWithSavings, type FiltroTamaño } from '@/lib/producto-utils'
import ProductFilters from './ProductFilters'
import ProductGrid from './ProductosGrid'

export default function ProductosPage() {
  const [filtroActivo, setFiltroActivo] = useState<FiltroTamaño>('todos')

  // ========== ENRIQUECER PRODUCTOS CON AHORRO ==========
  const productosEnriquecidos = useMemo(() => {
    return PRODUCTOS.map(enrichProductWithSavings)
  }, [])

  // ========== FILTRAR PRODUCTOS ==========
  const productosFiltrados = useMemo(() => {
    return filtrarProductos(productosEnriquecidos, filtroActivo)
  }, [productosEnriquecidos, filtroActivo])

  // ========== HANDLER DE FILTROS ==========
  const handleFiltroChange = useCallback(
    (nuevoFiltro: FiltroTamaño) => {
      setFiltroActivo(nuevoFiltro)

      const filterLabels: Record<FiltroTamaño, string> = {
        todos: 'Todos los productos',
        plaza: '1 Plaza',
        'plaza-media': '1½ Plaza / 2 Plazas',
        queen: 'Queen',
        king: 'King',
        accesorios: 'Accesorios'
      }

      trackSearch(filterLabels[nuevoFiltro], productosFiltrados.length)
    },
    [productosFiltrados.length]
  )

  // ========== CONFIGURACIÓN DE FILTROS ==========
  const filtros = useMemo(
    () => [
      { id: 'todos' as FiltroTamaño, label: 'Todos', count: productosEnriquecidos.length },
      { id: 'plaza' as FiltroTamaño, label: '1 Plaza', count: null },
      { id: 'plaza-media' as FiltroTamaño, label: '1½ Plaza', count: null },
      { id: 'queen' as FiltroTamaño, label: 'Queen', count: null },
      { id: 'king' as FiltroTamaño, label: 'King', count: null },
      { id: 'accesorios' as FiltroTamaño, label: '💎 Accesorios', count: null }
    ],
    [productosEnriquecidos.length]
  )

  return (
    <section
      id="productos"
      className="relative bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-950 py-16 md:py-20"
      aria-labelledby="productos-heading"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] -top-48 right-0"></div>
        <div className="absolute w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px] bottom-0 -left-24"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Header */}
        <header className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm font-bold mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Catálogo Completo PIERO
          </div>

          <h2
            id="productos-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 md:mb-6 leading-tight"
          >
            Elegí Tu Colchón
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500">
              Directo de Fábrica
            </span>
          </h2>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto">
            Todos los modelos con{' '}
            <strong className="text-white">hasta 49% de descuento</strong> vs. Mercado Libre
          </p>
        </header>

        {/* Filtros */}
        <ProductFilters
          filtros={filtros}
          filtroActivo={filtroActivo}
          onFiltroChange={handleFiltroChange}
        />

        {/* Grid de Productos */}
        <ProductGrid productos={productosFiltrados} />
      </div>
    </section>
  )
}