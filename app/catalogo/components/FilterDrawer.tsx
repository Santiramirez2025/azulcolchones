// app/catalogo/components/FilterDrawer.tsx - ✅ OPTIMIZADO
'use client'

import { Dispatch, SetStateAction, useEffect, useCallback, useMemo, useRef } from 'react'
import { X, Filter, Check, Star } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { formatARS } from '@/lib/utils/currency'

export interface FilterDrawerProps {
  isOpen: boolean
  onClose: () => void
  selectedCategories: string[]
  onCategoryChange: Dispatch<SetStateAction<string[]>>
  priceRange: [number, number]
  onPriceRangeChange: Dispatch<SetStateAction<[number, number]>>
  minRating: number
  onMinRatingChange: Dispatch<SetStateAction<number>>
  availableCategories: string[]
  onClearFilters: () => void
}

const ratingOptions = [
  { label: 'Todas', value: 0, description: 'Mostrar todos los productos' },
  { label: '4+ Estrellas', value: 4, description: 'Muy buena calidad' },
  { label: '4.5+ Estrellas', value: 4.5, description: 'Excelente calidad' },
  { label: '4.7+ Estrellas', value: 4.7, description: 'Calidad premium' },
  { label: '4.9+ Estrellas', value: 4.9, description: 'Lo mejor del catálogo' }
]

// Configuración de precios para Argentina
const PRICE_CONFIG = {
  MIN: 0,
  MAX: 10000000, // $100,000 en centavos
  STEP: 500000,  // $5,000 en centavos
  DEFAULT: [0, 10000000] as [number, number]
}

export default function FilterDrawer({
  isOpen,
  onClose,
  selectedCategories,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  minRating,
  onMinRatingChange,
  availableCategories,
  onClearFilters
}: FilterDrawerProps) {
  
  const drawerRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  
  // 🎯 Focus trap: Capturar foco al abrir
  useEffect(() => {
    if (isOpen) {
      // Guardar elemento activo antes de abrir
      const previouslyFocused = document.activeElement as HTMLElement
      
      // Focus en el botón de cerrar
      closeButtonRef.current?.focus()
      
      // Restaurar foco al cerrar
      return () => {
        previouslyFocused?.focus()
      }
    }
  }, [isOpen])
  
  // ⌨️ Cerrar con ESC
  useEffect(() => {
    if (!isOpen) return
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])
  
  // 🔒 Prevenir scroll del body cuando está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])
  
  // 📊 Memoizar conteo de filtros activos
  const activeFiltersCount = useMemo(() => {
    let count = selectedCategories.length
    
    // Verificar si el rango de precio cambió del default
    if (priceRange[0] !== PRICE_CONFIG.DEFAULT[0] || priceRange[1] !== PRICE_CONFIG.DEFAULT[1]) {
      count++
    }
    
    if (minRating > 0) {
      count++
    }
    
    return count
  }, [selectedCategories.length, priceRange, minRating])
  
  // 🎯 Toggle category con useCallback
  const toggleCategory = useCallback((category: string) => {
    onCategoryChange(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }, [onCategoryChange])
  
  // 💰 Handlers de precio
  const handleMinPriceChange = useCallback((value: number) => {
    const newMin = Math.min(value, priceRange[1])
    onPriceRangeChange([newMin, priceRange[1]])
  }, [priceRange, onPriceRangeChange])
  
  const handleMaxPriceChange = useCallback((value: number) => {
    const newMax = Math.max(value, priceRange[0])
    onPriceRangeChange([priceRange[0], newMax])
  }, [priceRange, onPriceRangeChange])
  
  // ⭐ Handler de rating
  const handleRatingChange = useCallback((value: number) => {
    onMinRatingChange(value)
    
    // Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'filter_rating', {
        rating_value: value
      })
    }
  }, [onMinRatingChange])
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop con mejor accesibilidad */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            aria-hidden="true"
          />

          {/* Drawer Panel con ARIA */}
          <motion.div
            ref={drawerRef}
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="filter-drawer-title"
            aria-describedby="filter-drawer-description"
            className="fixed left-0 top-0 h-full w-full sm:w-96 bg-zinc-900 shadow-2xl z-[101] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-zinc-900 border-b border-zinc-800 p-6 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center">
                  <Filter className="w-5 h-5 text-white" aria-hidden="true" />
                </div>
                <div>
                  <h2 id="filter-drawer-title" className="text-xl font-black text-white">
                    Filtros
                  </h2>
                  {activeFiltersCount > 0 && (
                    <p id="filter-drawer-description" className="text-xs text-zinc-400">
                      {activeFiltersCount} filtro{activeFiltersCount !== 1 ? 's' : ''} activo{activeFiltersCount !== 1 ? 's' : ''}
                    </p>
                  )}
                </div>
              </div>
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="w-10 h-10 rounded-xl bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500"
                aria-label="Cerrar filtros"
              >
                <X className="w-5 h-5 text-white" aria-hidden="true" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-8">
              
              {/* Categorías con checkboxes reales */}
              {availableCategories.length > 0 && (
                <fieldset className="space-y-4">
                  <legend className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                    <span role="img" aria-label="Etiquetas">🏷️</span>
                    Categorías
                  </legend>
                  <div className="space-y-2" role="group" aria-label="Filtrar por categoría">
                    {availableCategories.map((category) => {
                      const isSelected = selectedCategories.includes(category)
                      const checkboxId = `category-${category.toLowerCase().replace(/\s+/g, '-')}`
                      
                      return (
                        <div key={category} className="relative">
                          <input
                            type="checkbox"
                            id={checkboxId}
                            checked={isSelected}
                            onChange={() => toggleCategory(category)}
                            className="sr-only peer"
                            aria-checked={isSelected}
                          />
                          <label
                            htmlFor={checkboxId}
                            className={`
                              block w-full px-4 py-3 rounded-xl text-sm font-medium
                              transition-all duration-200 cursor-pointer
                              flex items-center justify-between
                              ${isSelected
                                ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg'
                                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                              }
                              focus-within:ring-2 focus-within:ring-violet-500
                            `}
                          >
                            <span>{category}</span>
                            {isSelected && (
                              <Check className="w-4 h-4" aria-hidden="true" />
                            )}
                          </label>
                        </div>
                      )
                    })}
                  </div>
                </fieldset>
              )}

              {/* Rango de Precio mejorado */}
              <fieldset className="space-y-4">
                <legend className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                  <span role="img" aria-label="Dinero">💰</span>
                  Precio
                </legend>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <label htmlFor="price-min" className="block text-xs text-zinc-400 mb-2">
                        Mínimo
                      </label>
                      <input
                        id="price-min"
                        type="number"
                        value={priceRange[0] / 100} // Convertir a pesos
                        onChange={(e) => handleMinPriceChange(Number(e.target.value) * 100)}
                        className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
                        min={PRICE_CONFIG.MIN}
                        max={priceRange[1] / 100}
                        step={PRICE_CONFIG.STEP / 100}
                        aria-label="Precio mínimo en pesos"
                      />
                    </div>
                    <div className="flex-1">
                      <label htmlFor="price-max" className="block text-xs text-zinc-400 mb-2">
                        Máximo
                      </label>
                      <input
                        id="price-max"
                        type="number"
                        value={priceRange[1] / 100} // Convertir a pesos
                        onChange={(e) => handleMaxPriceChange(Number(e.target.value) * 100)}
                        className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
                        min={priceRange[0] / 100}
                        max={PRICE_CONFIG.MAX / 100}
                        step={PRICE_CONFIG.STEP / 100}
                        aria-label="Precio máximo en pesos"
                      />
                    </div>
                  </div>
                  
                  {/* Range Sliders con mejor accesibilidad */}
                  <div className="space-y-2">
                    <label htmlFor="price-range-min" className="sr-only">
                      Deslizador de precio mínimo
                    </label>
                    <input
                      id="price-range-min"
                      type="range"
                      min={PRICE_CONFIG.MIN}
                      max={PRICE_CONFIG.MAX}
                      step={PRICE_CONFIG.STEP}
                      value={priceRange[0]}
                      onChange={(e) => handleMinPriceChange(Number(e.target.value))}
                      className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-violet-600 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-violet-600 [&::-moz-range-thumb]:border-0"
                      aria-valuemin={PRICE_CONFIG.MIN}
                      aria-valuemax={PRICE_CONFIG.MAX}
                      aria-valuenow={priceRange[0]}
                      aria-valuetext={formatARS(priceRange[0] / 100)}
                    />
                    
                    <label htmlFor="price-range-max" className="sr-only">
                      Deslizador de precio máximo
                    </label>
                    <input
                      id="price-range-max"
                      type="range"
                      min={PRICE_CONFIG.MIN}
                      max={PRICE_CONFIG.MAX}
                      step={PRICE_CONFIG.STEP}
                      value={priceRange[1]}
                      onChange={(e) => handleMaxPriceChange(Number(e.target.value))}
                      className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-fuchsia-600 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-fuchsia-600 [&::-moz-range-thumb]:border-0"
                      aria-valuemin={PRICE_CONFIG.MIN}
                      aria-valuemax={PRICE_CONFIG.MAX}
                      aria-valuenow={priceRange[1]}
                      aria-valuetext={formatARS(priceRange[1] / 100)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-zinc-400" aria-live="polite">
                    <span>{formatARS(priceRange[0] / 100)}</span>
                    <span>{formatARS(priceRange[1] / 100)}</span>
                  </div>
                </div>
              </fieldset>

              {/* Valoración con radio buttons */}
              <fieldset className="space-y-4">
                <legend className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                  <span role="img" aria-label="Estrella">⭐</span>
                  Valoración Mínima
                </legend>
                <div className="space-y-2" role="radiogroup" aria-label="Seleccionar valoración mínima">
                  {ratingOptions.map((option) => {
                    const isSelected = minRating === option.value
                    const radioId = `rating-${option.value}`
                    
                    return (
                      <div key={option.value} className="relative">
                        <input
                          type="radio"
                          id={radioId}
                          name="rating"
                          value={option.value}
                          checked={isSelected}
                          onChange={() => handleRatingChange(option.value)}
                          className="sr-only peer"
                        />
                        <label
                          htmlFor={radioId}
                          className={`
                            block w-full px-4 py-3 rounded-xl text-sm font-medium
                            transition-all duration-200 cursor-pointer
                            flex items-center justify-between
                            ${isSelected
                              ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg'
                              : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                            }
                            focus-within:ring-2 focus-within:ring-violet-500
                          `}
                        >
                          <span className="flex items-center gap-2">
                            {option.label}
                            {option.value > 0 && (
                              <span className="flex" aria-label={`${option.value} estrellas`}>
                                {[...Array(Math.floor(option.value))].map((_, i) => (
                                  <Star key={i} className="w-3 h-3 fill-current" aria-hidden="true" />
                                ))}
                              </span>
                            )}
                          </span>
                          {isSelected && (
                            <Check className="w-4 h-4" aria-hidden="true" />
                          )}
                        </label>
                        {/* Descripción para screen readers */}
                        <span className="sr-only">{option.description}</span>
                      </div>
                    )
                  })}
                </div>
              </fieldset>
            </div>

            {/* Footer con acciones */}
            <div className="sticky bottom-0 bg-zinc-900 border-t border-zinc-800 p-6 space-y-3">
              {activeFiltersCount > 0 && (
                <button
                  onClick={onClearFilters}
                  className="w-full py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500"
                  aria-label={`Limpiar ${activeFiltersCount} filtros activos`}
                >
                  Limpiar Filtros
                </button>
              )}
              <button
                onClick={onClose}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-black shadow-lg hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-violet-500"
                aria-label="Aplicar filtros y cerrar"
              >
                Aplicar Filtros
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}