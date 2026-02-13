'use client'

import { useState, useCallback, useMemo } from 'react'
import { trackSearch } from '@/lib/pixel'
import { PRODUCTOS } from '@/data/productos'
import { 
  filtrarProductos, 
  enrichProductWithSavings, 
  contarProductosPorFiltro,
  type FiltroTamaño 
} from '@/lib/producto-utils'
import ProductFilters from './ProductFilters'
import ProductGrid from './ProductosGrid'

export default function ProductosPage() {
  const [filtroActivo, setFiltroActivo] = useState<FiltroTamaño>('todos')
  const [searchQuery, setSearchQuery] = useState('')

  // ========== ENRIQUECER PRODUCTOS CON AHORRO ==========
  const productosEnriquecidos = useMemo(() => {
    return PRODUCTOS.map(enrichProductWithSavings)
  }, [])

  // ========== FILTRAR PRODUCTOS ==========
  const productosFiltrados = useMemo(() => {
    return filtrarProductos(productosEnriquecidos, filtroActivo, searchQuery)
  }, [productosEnriquecidos, filtroActivo, searchQuery])

  // ========== HANDLER DE FILTROS ==========
  const handleFiltroChange = useCallback(
    (nuevoFiltro: FiltroTamaño) => {
      setFiltroActivo(nuevoFiltro)

      const filterLabels: Record<FiltroTamaño, string> = {
        todos: 'Todos los productos',
        plaza: '1 Plaza',
        'plaza-media': '1½ Plaza',
        'dos-plazas': '2 Plazas',
        queen: 'Queen',
        king: 'King',
        sommiers: 'Sommiers',
        almohadas: 'Almohadas',
        accesorios: 'Accesorios'
      }

      trackSearch(filterLabels[nuevoFiltro], productosFiltrados.length)
    },
    [productosFiltrados.length]
  )

  // ========== HANDLER DE BÚSQUEDA ==========
  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query)
    
    if (query.trim() !== '') {
      trackSearch(query, productosFiltrados.length)
    }
  }, [productosFiltrados.length])

  // ========== CONFIGURACIÓN DE FILTROS ==========
  const filtros = useMemo(
    () => [
      { 
        id: 'todos' as FiltroTamaño, 
        label: 'Todos', 
        count: productosEnriquecidos.length 
      },
      { 
        id: 'plaza' as FiltroTamaño, 
        label: '1 Plaza', 
        count: contarProductosPorFiltro(productosEnriquecidos, 'plaza')
      },
      { 
        id: 'plaza-media' as FiltroTamaño, 
        label: '1½ Plaza', 
        count: contarProductosPorFiltro(productosEnriquecidos, 'plaza-media')
      },
      { 
        id: 'dos-plazas' as FiltroTamaño, 
        label: '2 Plazas', 
        count: contarProductosPorFiltro(productosEnriquecidos, 'dos-plazas')
      },
      { 
        id: 'queen' as FiltroTamaño, 
        label: 'Queen', 
        count: contarProductosPorFiltro(productosEnriquecidos, 'queen')
      },
      { 
        id: 'king' as FiltroTamaño, 
        label: 'King', 
        count: contarProductosPorFiltro(productosEnriquecidos, 'king')
      },
      { 
        id: 'sommiers' as FiltroTamaño, 
        label: 'Sommiers',
        emoji: '📦',
        count: contarProductosPorFiltro(productosEnriquecidos, 'sommiers')
      },
      { 
        id: 'almohadas' as FiltroTamaño, 
        label: 'Almohadas',
        emoji: '💤',
        count: contarProductosPorFiltro(productosEnriquecidos, 'almohadas')
      },
      { 
        id: 'accesorios' as FiltroTamaño, 
        label: 'Accesorios',
        emoji: '✨',
        count: contarProductosPorFiltro(productosEnriquecidos, 'accesorios')
      }
    ],
    [productosEnriquecidos]
  )

  return (
    <section
      id="productos"
      className="relative bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-950 py-16 md:py-20"
      aria-labelledby="productos-heading"
    >
      {/* Background Effects mejorados */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[600px] h-[600px] bg-blue-600/8 rounded-full blur-[180px] -top-48 right-0 animate-pulse-slow"></div>
        <div className="absolute w-[500px] h-[500px] bg-purple-500/6 rounded-full blur-[160px] bottom-0 -left-24"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header mejorado */}
        <header className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2.5 px-5 py-3 bg-gradient-to-r from-blue-500/10 via-blue-500/15 to-blue-500/10 border border-blue-500/40 rounded-full text-blue-300 text-sm md:text-base font-bold shadow-lg shadow-blue-500/10 backdrop-blur-sm mb-6">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-400 shadow-sm shadow-blue-400"></span>
            </span>
            Catálogo Completo PIERO
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-4 leading-tight tracking-tight">
            Encontrá tu colchón ideal
          </h2>
          <p className="text-base md:text-lg text-zinc-400 max-w-2xl mx-auto">
            Todos los modelos PIERO con{' '}
            <strong className="text-zinc-300">hasta 49% OFF</strong> vs MercadoLibre
          </p>
        </header>

        {/* Filtros y Buscador */}
        <ProductFilters
          filtros={filtros}
          filtroActivo={filtroActivo}
          onFiltroChange={handleFiltroChange}
          onSearchChange={handleSearchChange}
          searchQuery={searchQuery}
          totalProductos={productosFiltrados.length}
        />

        {/* Grid de Productos */}
        <ProductGrid productos={productosFiltrados} />
      </div>
    </section>
  )
}