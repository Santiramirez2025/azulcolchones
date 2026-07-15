'use client'

import { useState, useRef, useMemo, useCallback } from 'react'
import { useScroll, useTransform, AnimatePresence, motion, MotionValue } from 'framer-motion'
import { NormalizedProduct, CatalogoClientProps } from './components/types'

// Componentes modulares
import HeroSection from './components/HeroSection' 
import StickyBar from './components/StickyBar'
import ProductCard from './components/ProductCard'
import EmptyState from './components/EmptyState'
import CTASection from './components/CTASection'
import FilterDrawer from './components/FilterDrawer'
import CategoryTabs from './components/CategoryTabs'

// ============================================================================
// CONSTANTES
// ============================================================================

const PRICE_RANGE_MAX = 200000000 // $2M en centavos
const PRICE_RANGE_MIN = 0

const CATEGORY_CONFIG = [
  { id: 'todos', name: 'Todos', icon: '🏠' },
  { id: 'Combos', name: 'Combos 5 en 1', icon: '🎁' },
  { id: 'Colchones', name: 'Colchones', icon: '🛏️' },
  { id: 'Sommiers', name: 'Sommiers', icon: '📦' },
  { id: 'Protectores', name: 'Protectores', icon: '🛡️' },
  { id: 'Almohadas', name: 'Almohadas', icon: '🛌' },
  { id: 'Sábanas', name: 'Sábanas', icon: '✨' },
] as const

// Opciones de filtros reales (alineadas al catálogo Piero)
const TIPO_OPTIONS = [
  { id: 'espuma', name: 'Espuma' },
  { id: 'resorte-continuo', name: 'Resorte continuo' },
  { id: 'pocket', name: 'Pocket' },
] as const

const LINEA_OPTIONS = [
  { id: 'entrada', name: 'Entrada' },
  { id: 'media', name: 'Media' },
  { id: 'premium', name: 'Premium' },
  { id: 'ultra', name: 'Ultra premium' },
] as const

const PLAZA_OPTIONS = ['1pl', '1½', '2pl', 'Queen', 'Queen XL', 'King'] as const

// ============================================================================
// ✅ FUNCIÓN DE ORDENAMIENTO INTELIGENTE - MEJORES PRODUCTOS PRIMERO
// ============================================================================

function sortProducts(products: NormalizedProduct[], sortBy: string): NormalizedProduct[] {
  return [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc': 
        return a.price - b.price
      
      case 'price-desc': 
        return b.price - a.price
      
      case 'rating': 
        return (b.rating || 0) - (a.rating || 0)
      
      case 'newest':
        // Nuevos primero
        if (a.isNew && !b.isNew) return -1
        if (!a.isNew && b.isNew) return 1
        return 0
      
      case 'discount':
        // ✅ NUEVO: Ordenar por descuento
        const discountAsc = a.discount || 0
        const discountDesc = b.discount || 0
        if (discountDesc !== discountAsc) return discountDesc - discountAsc
        // Si tienen mismo descuento, ordenar por rating
        return (b.rating || 0) - (a.rating || 0)
      
      case 'featured':
      default:
        // ✅ ALGORITMO MEJORADO: MEJORES PRODUCTOS PRIMERO
        
        // 1. Best Sellers siempre primero
        if (a.isBestSeller && !b.isBestSeller) return -1
        if (!a.isBestSeller && b.isBestSeller) return 1
        
        // 2. Productos Nuevos segundo
        if (a.isNew && !b.isNew) return -1
        if (!a.isNew && b.isNew) return 1
        
        // 3. Por rating (productos mejor calificados)
        const ratingDiff = (b.rating || 0) - (a.rating || 0)
        if (Math.abs(ratingDiff) > 0.1) return ratingDiff
        
        // 4. Por número de reviews (más reviews = más confiables)
        const reviewDiff = (b.reviewCount || 0) - (a.reviewCount || 0)
        if (reviewDiff !== 0) return reviewDiff
        
        // 5. Por descuento (mayor descuento)
        const featDiscountA = a.discount || 0
        const featDiscountB = b.discount || 0
        if (featDiscountB !== featDiscountA) return featDiscountB - featDiscountA
        
        // 6. Finalmente por precio (más caros primero, asumiendo mejor calidad)
        return b.price - a.price
    }
  })
}

// ============================================================================
// MAIN COMPONENT - ✅ OPTIMIZADO MOBILE-FIRST
// ============================================================================

export default function CatalogoClient({
  initialProducts,
  totalProducts = 0,
  initialCategory = 'todos',
}: CatalogoClientProps) {
  
  // ============================================================================
  // NORMALIZACIÓN DE PRODUCTOS
  // ============================================================================
  
  const productsToFilter: NormalizedProduct[] = useMemo(() => {
    const products = initialProducts || []
    
    if (process.env.NODE_ENV === 'development') {
      console.log('🛍️ CatalogoClient mounted')
      console.log('📦 Products:', products.length)
    }
    
    return products
  }, [initialProducts])
  
  // ============================================================================
  // ESTADOS
  // ============================================================================
  
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('featured') // ✅ Por defecto: mejores productos
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory !== 'todos' ? [initialCategory] : [],
  )
  const [activeCategory, setActiveCategory] = useState(initialCategory)
  const [priceRange, setPriceRange] = useState<[number, number]>([PRICE_RANGE_MIN, PRICE_RANGE_MAX])
  const [minRating, setMinRating] = useState(0)
  const [selectedTipos, setSelectedTipos] = useState<string[]>([])
  const [selectedLineas, setSelectedLineas] = useState<string[]>([])
  const [selectedPlazas, setSelectedPlazas] = useState<string[]>([])
  
  // ============================================================================
  // REFS Y FRAMER MOTION
  // ============================================================================
  
  const heroRef = useRef<HTMLDivElement>(null)
  const productsRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']) as MotionValue<string>
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]) as MotionValue<number>
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]) as MotionValue<number>

  // ============================================================================
  // CATEGORÍAS DISPONIBLES
  // ============================================================================
  
  const availableCategories = useMemo(() => {
    const categories = new Set<string>()
    productsToFilter.forEach(p => {
      if (p.category && typeof p.category === 'string') {
        categories.add(p.category.trim())
      }
    })
    return Array.from(categories).sort()
  }, [productsToFilter])

  const categoriesWithCount = useMemo(() => {
    return CATEGORY_CONFIG.map(cat => ({
      ...cat,
      count: cat.id === 'todos' 
        ? productsToFilter.filter(p => p.isActive !== false).length
        : productsToFilter.filter(p => p.category === cat.id && p.isActive !== false).length
    })).filter(cat => cat.count > 0)
  }, [productsToFilter])

  // ============================================================================
  // HANDLERS
  // ============================================================================
  
  const clearFilters = useCallback(() => {
    setSearchTerm('')
    setSortBy('featured')
    setSelectedCategories([])
    setActiveCategory('todos')
    setPriceRange([PRICE_RANGE_MIN, PRICE_RANGE_MAX])
    setMinRating(0)
    setSelectedTipos([])
    setSelectedLineas([])
    setSelectedPlazas([])
  }, [])

  const scrollToProducts = useCallback(() => {
    productsRef.current?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    })
  }, [])

  const handleCategoryChange = useCallback((categoryId: string) => {
    setActiveCategory(categoryId)
    if (categoryId === 'todos') {
      setSelectedCategories([])
    } else {
      setSelectedCategories([categoryId])
    }
  }, [])

  const handleDrawerCategoryChange = useCallback((categories: string[] | ((prev: string[]) => string[])) => {
    const newCategories = typeof categories === 'function' 
      ? categories(selectedCategories)
      : categories
    
    setSelectedCategories(newCategories)
    
    if (newCategories.length === 0) {
      setActiveCategory('todos')
    } else if (newCategories.length === 1) {
      setActiveCategory(newCategories[0])
    } else {
      setActiveCategory('todos')
    }
  }, [selectedCategories])

  // ============================================================================
  // ✅ LÓGICA DE FILTRADO Y ORDENAMIENTO MEJORADA
  // ============================================================================
  
  const filteredProducts = useMemo(() => {
    if (!productsToFilter.length) return []
    
    const minPricePesos = priceRange[0] / 100
    const maxPricePesos = priceRange[1] / 100
    
    // PASO 1: FILTRAR
    const filtered = productsToFilter.filter(product => {
      if (product.isActive === false) return false
      
      // Categoría
      let matchesCategory = true
      if (activeCategory !== 'todos') {
        matchesCategory = product.category === activeCategory
      } else if (selectedCategories.length > 0) {
        matchesCategory = selectedCategories.includes(product.category || '')
      }
      if (!matchesCategory) return false
      
      // Búsqueda
      if (searchTerm) {
        const search = searchTerm.toLowerCase()
        const matchesSearch = 
          product.name.toLowerCase().includes(search) ||
          product.subtitle?.toLowerCase().includes(search) ||
          product.description?.toLowerCase().includes(search) ||
          product.category?.toLowerCase().includes(search)
        if (!matchesSearch) return false
      }
      
      // Precio
      const matchesPrice = product.price >= minPricePesos && product.price <= maxPricePesos
      if (!matchesPrice) return false
      
      // Rating
      if (minRating > 0) {
        const matchesRating = (product.rating || 0) >= minRating
        if (!matchesRating) return false
      }

      // Tipo (espuma / resorte continuo / pocket)
      if (selectedTipos.length > 0) {
        if (!product.springType || !selectedTipos.includes(product.springType)) return false
      }

      // Línea (entrada / media / premium / ultra)
      if (selectedLineas.length > 0) {
        if (!product.line || !selectedLineas.includes(product.line)) return false
      }

      // Plaza (alguna variante disponible en la plaza elegida)
      if (selectedPlazas.length > 0) {
        const plazas = product.plazas || []
        if (!selectedPlazas.some((pl) => plazas.includes(pl))) return false
      }

      return true
    })

    // PASO 2: ORDENAR CON ALGORITMO MEJORADO
    return sortProducts(filtered, sortBy)

  }, [productsToFilter, activeCategory, selectedCategories, searchTerm, sortBy, priceRange, minRating, selectedTipos, selectedLineas, selectedPlazas])

  // ============================================================================
  // CÁLCULOS DERIVADOS
  // ============================================================================
  
  const avgPrice = useMemo(() => {
    if (!productsToFilter.length) return 300000
    const activeProducts = productsToFilter.filter(p => p.isActive !== false)
    if (!activeProducts.length) return 300000
    return activeProducts.reduce((acc, p) => acc + p.price, 0) / activeProducts.length
  }, [productsToFilter])

  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (activeCategory !== 'todos') count++
    if (selectedCategories.length > 0 && activeCategory === 'todos') count += selectedCategories.length
    if (priceRange[0] > PRICE_RANGE_MIN || priceRange[1] < PRICE_RANGE_MAX) count++
    if (minRating > 0) count++
    if (searchTerm) count++
    count += selectedTipos.length + selectedLineas.length + selectedPlazas.length
    return count
  }, [activeCategory, selectedCategories, priceRange, minRating, searchTerm, selectedTipos, selectedLineas, selectedPlazas])

  // ============================================================================
  // EARLY RETURN - NO HAY PRODUCTOS
  // ============================================================================
  
  if (productsToFilter.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center overflow-x-hidden">
        <div className="text-center max-w-lg mx-auto px-4 py-12">
          <div className="text-6xl sm:text-7xl md:text-8xl mb-6">🛏️</div>
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">
            No hay productos disponibles
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mb-6">
            La base de datos está vacía. Ejecutá el seed para cargar productos.
          </p>
          <code className="inline-block bg-zinc-800 text-blue-400 px-4 py-2 rounded-lg font-mono text-xs sm:text-sm">
            npm run db:seed
          </code>
        </div>
      </div>
    )
  }

  // ============================================================================
  // RENDERIZADO - ✅ SIN SCROLL HORIZONTAL
  // ============================================================================
  
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section - MOBILE OPTIMIZADO */}
      <HeroSection 
        heroRef={heroRef} 
        heroY={heroY} 
        heroOpacity={heroOpacity} 
        heroScale={heroScale} 
        scrollToProducts={scrollToProducts}
        avgPrice={avgPrice}
      />
      
      {/* ✅ STICKY COMBINADO - Una sola barra pegajosa */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-lg shadow-sm">
        {/* StickyBar con búsqueda */}
        <div className="border-b border-gray-200">
          <StickyBar
            productsRef={productsRef}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sortBy={sortBy}
            setSortBy={setSortBy}
            activeFiltersCount={activeFiltersCount}
            clearFilters={clearFilters}
            setIsFilterOpen={setIsFilterOpen}
            filteredProductsLength={filteredProducts.length}
          />
        </div>
        
        {/* CategoryTabs integrados */}
        <div className="border-b border-gray-100 py-3 sm:py-4">
          <div className="container mx-auto px-4 sm:px-6">
            <CategoryTabs
              categories={categoriesWithCount}
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
            />
          </div>
        </div>
      </div>

      {/* FilterDrawer mejorado */}
      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        selectedCategories={selectedCategories}
        onCategoryChange={handleDrawerCategoryChange}
        priceRange={priceRange}
        onPriceRangeChange={setPriceRange}
        minRating={minRating}
        onMinRatingChange={setMinRating}
        availableCategories={availableCategories}
        onClearFilters={clearFilters}
        tipoOptions={TIPO_OPTIONS}
        selectedTipos={selectedTipos}
        onTiposChange={setSelectedTipos}
        lineaOptions={LINEA_OPTIONS}
        selectedLineas={selectedLineas}
        onLineasChange={setSelectedLineas}
        plazaOptions={PLAZA_OPTIONS}
        selectedPlazas={selectedPlazas}
        onPlazasChange={setSelectedPlazas}
      />

      {/* Grid de productos - MOBILE OPTIMIZADO */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        <AnimatePresence mode="wait">
          {filteredProducts.length > 0 ? (
            <motion.div
              key={`${activeCategory}-${selectedCategories.join('-')}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              layout
              className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
            >
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  avgPrice={avgPrice}
                />
              ))}
            </motion.div>
          ) : (
            <EmptyState onClearFilters={clearFilters} />
          )}
        </AnimatePresence>
      </div>

      {/* CTA Section optimizado */}
      <CTASection />
    </div>
  )
}