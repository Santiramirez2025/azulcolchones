// lib/hooks/useProductFilters.ts - ✅ HOOK COMPLETO DE FILTROS
'use client'

import { useState, useCallback, useMemo } from 'react'

export interface FilterState {
  categories: string[]
  priceRange: [number, number]
  minRating: number
  sortBy: 'price-asc' | 'price-desc' | 'rating' | 'newest' | 'popular'
}

export const DEFAULT_FILTERS: FilterState = {
  categories: [],
  priceRange: [0, 10000000], // $0 - $100,000 en centavos
  minRating: 0,
  sortBy: 'popular'
}

export function useProductFilters(products: any[]) {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS)

  // ✅ APLICAR TODOS LOS FILTROS
  const filteredProducts = useMemo(() => {
    let result = [...products]

    // 1. Filtrar por categorías
    if (filters.categories.length > 0) {
      result = result.filter(product => 
        filters.categories.includes(product.category || '')
      )
    }

    // 2. Filtrar por precio (productos ya vienen en pesos)
    result = result.filter(product => {
      const priceInPesos = product.price
      const minInPesos = filters.priceRange[0] / 100
      const maxInPesos = filters.priceRange[1] / 100
      return priceInPesos >= minInPesos && priceInPesos <= maxInPesos
    })

    // 3. Filtrar por rating
    if (filters.minRating > 0) {
      result = result.filter(product => 
        (product.rating || 0) >= filters.minRating
      )
    }

    // 4. Ordenar
    switch (filters.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      case 'newest':
        result.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
          return dateB - dateA
        })
        break
      case 'popular':
      default:
        result.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0))
        break
    }

    return result
  }, [products, filters])

  // ✅ HANDLERS
  const setCategories = useCallback((categoriesOrUpdater: string[] | ((prev: string[]) => string[])) => {
    setFilters(prev => ({
      ...prev,
      categories: typeof categoriesOrUpdater === 'function' 
        ? categoriesOrUpdater(prev.categories)
        : categoriesOrUpdater
    }))
    
    // Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      let categories: string[] = []
      if (typeof categoriesOrUpdater === 'function') {
        categories = categoriesOrUpdater(filters.categories)
      } else {
        categories = categoriesOrUpdater
      }
      
      (window as any).gtag('event', 'filter_category', {
        categories: categories.join(','),
        count: categories.length
      })
    }
  }, [filters.categories])

  const setPriceRange = useCallback((rangeOrUpdater: [number, number] | ((prev: [number, number]) => [number, number])) => {
    setFilters(prev => ({
      ...prev,
      priceRange: typeof rangeOrUpdater === 'function' 
        ? rangeOrUpdater(prev.priceRange)
        : rangeOrUpdater
    }))
    
    // Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      let range: [number, number] = [0, 0]
      if (typeof rangeOrUpdater === 'function') {
        range = rangeOrUpdater(filters.priceRange)
      } else {
        range = rangeOrUpdater
      }
      
      (window as any).gtag('event', 'filter_price', {
        min: range[0] / 100,
        max: range[1] / 100
      })
    }
  }, [filters.priceRange])

  const setMinRating = useCallback((ratingOrUpdater: number | ((prev: number) => number)) => {
    setFilters(prev => ({
      ...prev,
      minRating: typeof ratingOrUpdater === 'function' 
        ? ratingOrUpdater(prev.minRating)
        : ratingOrUpdater
    }))
    
    // Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      let rating: number = 0
      if (typeof ratingOrUpdater === 'function') {
        rating = ratingOrUpdater(filters.minRating)
      } else {
        rating = ratingOrUpdater
      }
      
      (window as any).gtag('event', 'filter_rating', {
        min_rating: rating
      })
    }
  }, [filters.minRating])

  const setSortBy = useCallback((sortBy: FilterState['sortBy']) => {
    setFilters(prev => ({ ...prev, sortBy }))
    
    // Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'sort_products', {
        sort_by: sortBy
      })
    }
  }, [])

  const clearFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS)
    
    // Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'clear_filters')
    }
  }, [])

  // ✅ CATEGORÍAS DISPONIBLES (extraídas de los productos)
  const availableCategories = useMemo(() => {
    const categories = new Set<string>()
    products.forEach(product => {
      if (product.category) {
        categories.add(product.category)
      }
    })
    return Array.from(categories).sort()
  }, [products])

  // ✅ ESTADÍSTICAS
  const stats = useMemo(() => ({
    total: products.length,
    filtered: filteredProducts.length,
    hidden: products.length - filteredProducts.length
  }), [products.length, filteredProducts.length])

  return {
    // State
    filters,
    
    // Productos filtrados
    filteredProducts,
    
    // Setters
    setCategories,
    setPriceRange,
    setMinRating,
    setSortBy,
    clearFilters,
    
    // Datos computados
    availableCategories,
    stats,
    
    // Helpers
    hasActiveFilters: filters.categories.length > 0 || 
                     filters.minRating > 0 || 
                     filters.priceRange[0] !== DEFAULT_FILTERS.priceRange[0] ||
                     filters.priceRange[1] !== DEFAULT_FILTERS.priceRange[1],
    
    activeFiltersCount: filters.categories.length + 
                       (filters.minRating > 0 ? 1 : 0) +
                       ((filters.priceRange[0] !== DEFAULT_FILTERS.priceRange[0] ||
                         filters.priceRange[1] !== DEFAULT_FILTERS.priceRange[1]) ? 1 : 0)
  }
}