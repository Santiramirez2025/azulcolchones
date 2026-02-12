'use client'

import { FiltroTamaño } from '@/lib/producto-utils'

interface Filtro {
  id: FiltroTamaño
  label: string
  count?: number | null
}

interface ProductFiltersProps {
  filtros: Filtro[]
  filtroActivo: FiltroTamaño
  onFiltroChange: (filtro: FiltroTamaño) => void
}

export default function ProductFilters({
  filtros,
  filtroActivo,
  onFiltroChange
}: ProductFiltersProps) {
  return (
    <div className="mb-10 md:mb-12 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4">
      <div className="flex gap-2 md:gap-3 min-w-max justify-start md:justify-center">
        {filtros.map((filtro) => (
          <button
            key={filtro.id}
            onClick={() => onFiltroChange(filtro.id)}
            className={`
              px-4 md:px-6 py-2.5 md:py-3 rounded-xl font-bold text-sm transition-all duration-300
              ${
                filtroActivo === filtro.id
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30 scale-105'
                  : 'bg-zinc-800/60 text-zinc-400 border border-zinc-700/50 hover:border-blue-500/50 hover:text-white hover:bg-zinc-800'
              }
            `}
          >
            {filtro.label} {filtro.count != null && `(${filtro.count})`}
          </button>
        ))}
      </div>
    </div>
  )
}