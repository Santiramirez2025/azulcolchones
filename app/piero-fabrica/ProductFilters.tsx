'use client'

import { useState } from 'react'
import { FiltroTamaño } from '@/lib/producto-utils'

interface Filtro {
  id: FiltroTamaño
  label: string
  emoji?: string
  count: number
}

interface ProductFiltersProps {
  filtros: Filtro[]
  filtroActivo: FiltroTamaño
  onFiltroChange: (filtro: FiltroTamaño) => void
  onSearchChange: (query: string) => void
  searchQuery: string
  totalProductos: number
}

export default function ProductFilters({
  filtros,
  filtroActivo,
  onFiltroChange,
  onSearchChange,
  searchQuery,
  totalProductos
}: ProductFiltersProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  return (
    <div className="mb-10 md:mb-12 space-y-6">
      {/* Buscador */}
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg
              className={`w-5 h-5 transition-colors ${
                isSearchFocused ? 'text-blue-400' : 'text-zinc-500'
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            placeholder="Buscar por nombre, tamaño o modelo..."
            className="
              w-full pl-12 pr-4 py-3.5 
              bg-zinc-800/60 backdrop-blur-sm
              border border-zinc-700/50
              rounded-xl
              text-white placeholder-zinc-500
              focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50
              transition-all duration-300
            "
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-500 hover:text-white transition-colors"
              aria-label="Limpiar búsqueda"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Filtros por tamaño */}
      <div className="overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4">
        <div className="flex gap-2 md:gap-3 min-w-max justify-start md:justify-center">
          {filtros.map((filtro) => (
            <button
              key={filtro.id}
              onClick={() => onFiltroChange(filtro.id)}
              className={`
                px-4 md:px-6 py-2.5 md:py-3 rounded-xl font-bold text-sm transition-all duration-300
                whitespace-nowrap
                ${
                  filtroActivo === filtro.id
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30 scale-105'
                    : 'bg-zinc-800/60 text-zinc-400 border border-zinc-700/50 hover:border-blue-500/50 hover:text-white hover:bg-zinc-800'
                }
              `}
            >
              {filtro.emoji && <span className="mr-2">{filtro.emoji}</span>}
              {filtro.label}
              {filtro.count > 0 && (
                <span
                  className={`ml-2 ${
                    filtroActivo === filtro.id ? 'text-blue-200' : 'text-zinc-500'
                  }`}
                >
                  ({filtro.count})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Contador de resultados */}
      {searchQuery && (
        <div className="text-center">
          <p className="text-sm text-zinc-400">
            {totalProductos > 0 ? (
              <>
                Se encontraron <strong className="text-white">{totalProductos}</strong>{' '}
                {totalProductos === 1 ? 'producto' : 'productos'} para "{searchQuery}"
              </>
            ) : (
              <>
                No se encontraron productos para "
                <strong className="text-white">{searchQuery}</strong>"
              </>
            )}
          </p>
        </div>
      )}
    </div>
  )
}