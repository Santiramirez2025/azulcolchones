'use client'

import { useState, useRef, useMemo, useCallback } from 'react'
import { useScroll, useTransform, AnimatePresence, motion, MotionValue } from 'framer-motion'
// Importaciones de tipos y helpers
import { NormalizedProduct, CatalogoClientProps } from './components/types'

// Componentes modulares
import HeroSection from './components/HeroSection' 
import StickyBar from './components/StickyBar'
import ProductCard from './components/ProductCard'
import EmptyState from './components/EmptyState'
import TrustSection from './components/TrustSection'
import CTASection from './components/CTASection'
import FilterDrawer from './components/FilterDrawer'
import CategoryTabs from './components/CategoryTabs'

export default function CatalogoClient({ 
  initialProducts,
  totalProducts = 0 
}: CatalogoClientProps) {
  // ============================================================================
  // DEBUG Y NORMALIZACIÓN DE PRODUCTOS
  // ============================================================================
  console.log('🛍️ CatalogoClient mounted')
  console.log('📦 Initial products received:', initialProducts?.length || 0)
  console.log('📊 Total products:', totalProducts)
  
  const productsToFilter: NormalizedProduct[] = useMemo(() => {
    const products = initialProducts || []
    console.log('🔄 Products to filter:', products.length)
    if (products.length > 0) {
      console.log('✅ First product sample:', {
        id: products[0].id,
        name: products[0].name,
        category: products[0].category,
        price: products[0].price,
        images: products[0].images,
        isActive: products[0].isActive
      })
    }
    return products
  }, [initialProducts])
  
  // ============================================================================
  // ESTADOS
  // ============================================================================
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('featured')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  
  // ✅ Estados de filtrado sincronizados
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [activeCategory, setActiveCategory] = useState('todos')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000000]) // $0 - $2M en centavos
  const [minRating, setMinRating] = useState(0)
  
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
    
    const cats = Array.from(categories).sort()
    console.log('🏷️ Available categories:', cats)
    return cats
  }, [productsToFilter])

  const categoriesWithCount = useMemo(() => {
    const CATEGORY_CONFIG = [
      { id: 'todos', name: 'Todos', icon: '🏠' },
      { id: 'Colchones', name: 'Colchones', icon: '🛏️' },
      { id: 'Sommiers', name: 'Sommiers', icon: '📦' },
      { id: 'Bases', name: 'Bases', icon: '🔲' },
      { id: 'Almohadas', name: 'Almohadas', icon: '🛌' },
      { id: 'Blanquería', name: 'Blanquería', icon: '🧵' },
      { id: 'Cunas', name: 'Cunas', icon: '👶' },
      { id: 'Outlet', name: 'Outlet', icon: '🏷️' },
    ]

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
    console.log('🧹 Clearing all filters')
    setSearchTerm('')
    setSortBy('featured')
    setSelectedCategories([])
    setActiveCategory('todos')
    setPriceRange([0, 200000000])
    setMinRating(0)
  }, [])

  const scrollToProducts = useCallback(() => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  // ✅ Handler para cambio de categoría (sincroniza tabs con drawer)
  const handleCategoryChange = useCallback((categoryId: string) => {
    console.log('🔄 Category changed to:', categoryId)
    setActiveCategory(categoryId)
    
    // Sincronizar con selectedCategories del drawer
    if (categoryId === 'todos') {
      setSelectedCategories([])
    } else {
      setSelectedCategories([categoryId])
    }
  }, [])

  // ✅ Handler para cambio desde drawer (sincroniza drawer con tabs)
  const handleDrawerCategoryChange = useCallback((categories: string[] | ((prev: string[]) => string[])) => {
    const newCategories = typeof categories === 'function' 
      ? categories(selectedCategories)
      : categories
    
    console.log('🔄 Drawer categories changed to:', newCategories)
    setSelectedCategories(newCategories)
    
    // Sincronizar con activeCategory
    if (newCategories.length === 0) {
      setActiveCategory('todos')
    } else if (newCategories.length === 1) {
      setActiveCategory(newCategories[0])
    } else {
      // Multiple categories selected - keep 'todos' active
      setActiveCategory('todos')
    }
  }, [selectedCategories])

  // ============================================================================
  // LÓGICA DE FILTRADO Y ORDENAMIENTO
  // ============================================================================
  const filteredProducts = useMemo(() => {
    console.log('🔍 Filtering products...')
    console.log('  📊 Total products:', productsToFilter.length)
    console.log('  🏷️ Active category:', activeCategory)
    console.log('  🔍 Search term:', searchTerm)
    console.log('  🔢 Sort by:', sortBy)
    console.log('  📁 Selected categories (drawer):', selectedCategories)
    console.log('  💰 Price range (centavos):', priceRange)
    console.log('  ⭐ Min rating:', minRating)
    
    if (!productsToFilter.length) {
      console.log('⚠️ No products to filter!')
      return []
    }
    
    // Convertir precio range de centavos a pesos para comparación
    const minPricePesos = priceRange[0] / 100
    const maxPricePesos = priceRange[1] / 100
    console.log('  💰 Price range in pesos:', minPricePesos, '-', maxPricePesos)
    
    const filtered = productsToFilter.filter(product => {
      // 1. ✅ Verificar que esté activo
      if (product.isActive === false) {
        return false
      }
      
      // 2. ✅ Filtro de categoría (prioridad a tabs)
      let matchesCategory = true
      
      if (activeCategory !== 'todos') {
        matchesCategory = product.category === activeCategory
      } else if (selectedCategories.length > 0) {
        // Si hay categorías seleccionadas en drawer pero tab es 'todos'
        matchesCategory = selectedCategories.includes(product.category || '')
      }
      
      if (!matchesCategory) return false
      
      // 3. ✅ Búsqueda de texto
      if (searchTerm) {
        const search = searchTerm.toLowerCase()
        const matchesSearch = 
          product.name.toLowerCase().includes(search) ||
          product.subtitle?.toLowerCase().includes(search) ||
          product.description?.toLowerCase().includes(search) ||
          product.category?.toLowerCase().includes(search)
        
        if (!matchesSearch) return false
      }
      
      // 4. ✅ Rango de precio (los productos ya vienen en pesos)
      const matchesPrice = product.price >= minPricePesos && product.price <= maxPricePesos
      
      if (!matchesPrice) {
        console.log(`  ❌ ${product.name}: price ${product.price} pesos out of range ${minPricePesos}-${maxPricePesos} pesos`)
        return false
      }
      
      // 5. ✅ Rating mínimo
      if (minRating > 0) {
        const matchesRating = (product.rating || 0) >= minRating
        if (!matchesRating) return false
      }
      
      return true
    })
    
    // ✅ Ordenamiento
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price
        case 'price-desc':
          return b.price - a.price
        case 'rating':
          return (b.rating || 0) - (a.rating || 0)
        case 'newest':
          if (a.isNew && !b.isNew) return -1
          if (!a.isNew && b.isNew) return 1
          return 0
        case 'featured':
        default:
          // Featured: BestSeller > New > Rating
          if (a.isBestSeller && !b.isBestSeller) return -1
          if (!a.isBestSeller && b.isBestSeller) return 1
          if (a.isNew && !b.isNew) return -1
          if (!a.isNew && b.isNew) return 1
          return (b.rating || 0) - (a.rating || 0)
      }
    })
    
    console.log('✅ Filtered products:', sorted.length)
    
    if (sorted.length === 0 && productsToFilter.length > 0) {
      console.log('⚠️ All products filtered out!')
      console.log('  Check filters:')
      console.log('    - Category:', activeCategory)
      console.log('    - Price range (pesos):', minPricePesos, '-', maxPricePesos)
      console.log('    - Rating:', minRating)
      console.log('    - Search:', searchTerm)
    }
    
    return sorted
  }, [productsToFilter, activeCategory, selectedCategories, searchTerm, sortBy, priceRange, minRating])

  // ============================================================================
  // CÁLCULOS DERIVADOS
  // ============================================================================
  const avgPrice = useMemo(() => {
    if (!productsToFilter.length) return 300000
    const activeProducts = productsToFilter.filter(p => p.isActive !== false)
    if (!activeProducts.length) return 300000
    const avg = activeProducts.reduce((acc, p) => acc + p.price, 0) / activeProducts.length
    console.log('📊 Average price:', avg, 'pesos')
    return avg
  }, [productsToFilter])

  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (activeCategory !== 'todos') count++
    if (selectedCategories.length > 0 && activeCategory === 'todos') count += selectedCategories.length
    if (priceRange[0] > 0 || priceRange[1] < 200000000) count++
    if (minRating > 0) count++
    if (searchTerm) count++
    return count
  }, [activeCategory, selectedCategories, priceRange, minRating, searchTerm])

  // ============================================================================
  // EARLY RETURN - NO HAY PRODUCTOS
  // ============================================================================
  if (productsToFilter.length === 0) {
    console.log('❌ No products available - showing empty state')
    return (
      <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center">
        <div className="text-center max-w-lg mx-auto px-4">
          <div className="text-8xl mb-6">🛏️</div>
          <h2 className="text-3xl font-black text-white mb-4">
            No hay productos disponibles
          </h2>
          <p className="text-zinc-400 mb-6">
            La base de datos está vacía. Ejecutá el seed para cargar productos.
          </p>
          <code className="inline-block bg-zinc-800 text-blue-400 px-4 py-2 rounded-lg font-mono text-sm">
            npm run db:seed
          </code>
        </div>
      </div>
    )
  }

  // ============================================================================
  // RENDERIZADO
  // ============================================================================
  console.log('🎨 Rendering catalog with', filteredProducts.length, 'products')
  
  return (
    <div className="min-h-screen bg-white relative">
      {/* Hero Section */}
      <HeroSection 
        heroRef={heroRef} 
        heroY={heroY} 
        heroOpacity={heroOpacity} 
        heroScale={heroScale} 
        scrollToProducts={scrollToProducts}
        avgPrice={avgPrice}
      />
      
      {/* Barra sticky con búsqueda y ordenamiento */}
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

      {/* Category Tabs - Sticky below StickyBar */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-zinc-200 py-4">
        <div className="container mx-auto px-4">
          <CategoryTabs
            categories={categoriesWithCount}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>
      </div>

      {/* ✅ FilterDrawer CORRECTAMENTE CONECTADO */}
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
      />

      {/* Grid de productos */}
      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
        <AnimatePresence mode="wait">
          {filteredProducts.length > 0 ? (
            <motion.div
              key={`${activeCategory}-${selectedCategories.join('-')}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
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

      {/* Secciones adicionales */}
      <TrustSection />
      <CTASection />
    </div>
  )
}