// app/catalogo/components/StickyBar.tsx - ✅ OPTIMIZADO
'use client'

import { Search, SlidersHorizontal, X } from 'lucide-react'
import React, { useCallback, useRef, useEffect } from 'react'
import { useDebouncedCallback } from 'use-debounce'

interface StickyBarProps {
  productsRef: React.RefObject<HTMLDivElement>
  searchTerm: string
  setSearchTerm: (term: string) => void
  sortBy: string
  setSortBy: (sort: string) => void
  activeFiltersCount: number
  clearFilters: () => void
  setIsFilterOpen: (isOpen: boolean) => void
  filteredProductsLength: number
}

export default function StickyBar({
  productsRef,
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  activeFiltersCount,
  clearFilters,
  setIsFilterOpen,
  filteredProductsLength,
}: StickyBarProps) {
  
  const searchInputRef = useRef<HTMLInputElement>(null)
  
  // ⚡ Performance: Debounce search
  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearchTerm(value)
  }, 300)
  
  // 🎯 Accesibilidad: Focus en búsqueda con Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        searchInputRef.current?.focus()
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])
  
  // 📊 Analytics: Track search
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    debouncedSearch(value)
    
    // 📊 Google Analytics
    if (value.length > 2) {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'search', {
          search_term: value
        })
      }
    }
  }, [debouncedSearch])
  
  // 📊 Analytics: Track sort
  const handleSortChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setSortBy(value)
    
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'sort_products', {
        sort_type: value
      })
    }
  }, [setSortBy])
  
  return (
    <div 
      ref={productsRef}
      className="sticky top-0 z-40 bg-white/95 backdrop-blur-lg border-b border-gray-200/50 shadow-sm"
      role="search"
      aria-label="Búsqueda y filtros de productos"
    >
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center gap-3">
          {/* Mobile: Botón Filtrar */}
          <button
            onClick={() => setIsFilterOpen(true)}
            className="lg:hidden flex-shrink-0 relative px-4 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-bold transition-all flex items-center gap-2 shadow-md active:scale-95"
            aria-label={`Abrir filtros${activeFiltersCount > 0 ? ` (${activeFiltersCount} activos)` : ''}`}
            aria-expanded="false"
          >
            <SlidersHorizontal className="w-5 h-5" aria-hidden="true" />
            <span>Filtrar</span>
            {activeFiltersCount > 0 && (
              <span 
                className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-indigo-600 text-white text-xs font-black rounded-full flex items-center justify-center"
                aria-label={`${activeFiltersCount} filtros activos`}
              >
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Barra de búsqueda optimizada */}
          <div className="relative flex-1">
            <label htmlFor="product-search" className="sr-only">
              Buscar productos
            </label>
            <Search 
              className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-gray-400 pointer-events-none" 
              aria-hidden="true"
            />
            <input
              ref={searchInputRef}
              id="product-search"
              type="search"
              name="q"
              role="searchbox"
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck="false"
              defaultValue={searchTerm}
              onChange={handleSearchChange}
              placeholder="Buscar colchones..."
              aria-label="Buscar productos"
              aria-describedby="search-results-count"
              className="w-full pl-9 md:pl-12 pr-3 md:pr-4 py-2.5 md:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all text-sm md:text-base text-gray-900 placeholder:text-gray-400 font-medium"
            />
            
            {/* Hint de keyboard shortcut */}
            <kbd className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs text-gray-500 font-mono items-center gap-1">
              <span className="text-[10px]">⌘</span>K
            </kbd>
          </div>

          {/* Desktop: Ordenar inline */}
          <label htmlFor="sort-select" className="sr-only">
            Ordenar productos
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={handleSortChange}
            className="hidden lg:block px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 text-sm text-gray-700 bg-white cursor-pointer font-medium hover:border-gray-300 transition-colors"
            aria-label="Ordenar productos"
          >
            <option value="featured">Destacados</option>
            <option value="price-asc">Precio: Menor a Mayor</option>
            <option value="price-desc">Precio: Mayor a Menor</option>
            <option value="rating">Mejor Valorados</option>
            <option value="newest">Más Nuevos</option>
          </select>
        </div>

        {/* Contador de resultados con ARIA live */}
        <div className="flex items-center justify-between mt-3 text-sm">
          <span 
            id="search-results-count"
            className="text-gray-600"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            <span className="font-bold text-gray-900">{filteredProductsLength}</span>{' '}
            {filteredProductsLength === 1 ? 'producto encontrado' : 'productos encontrados'}
          </span>
          
          {activeFiltersCount > 0 && (
            <button
              onClick={clearFilters}
              className="text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-1 active:scale-95 transition-all"
              aria-label={`Limpiar ${activeFiltersCount} filtros activos`}
            >
              <X className="w-4 h-4" aria-hidden="true" />
              <span>Limpiar filtros</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}