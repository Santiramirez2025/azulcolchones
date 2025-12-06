// app/catalogo/components/CategoryTabs.tsx - ✅ OPTIMIZADO
'use client'

import { motion } from 'framer-motion'
import { useCallback, useMemo } from 'react'

type Category = {
  id: string
  name: string
  icon: string
  count: number
}

interface CategoryTabsProps {
  categories: Category[]
  activeCategory: string
  onCategoryChange: (categoryId: string) => void
}

export default function CategoryTabs({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryTabsProps) {
  
  // 🛡️ Safety check
  const validCategories = useMemo(() => {
    return categories?.filter(cat => cat && cat.id && cat.name) || []
  }, [categories])

  // ⚡ Memoizar handler
  const handleCategoryClick = useCallback((categoryId: string) => {
    onCategoryChange(categoryId)
    
    // 📊 Analytics tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'select_category', {
        category_id: categoryId,
        category_name: categories.find(c => c.id === categoryId)?.name
      })
    }
  }, [onCategoryChange, categories])

  if (validCategories.length === 0) {
    return null
  }

  // 🎨 Componente de Tab reutilizable
  const CategoryTab = ({ 
    category, 
    isActive, 
    isMobile = false 
  }: { 
    category: Category
    isActive: boolean
    isMobile?: boolean
  }) => {
    const tabId = `category-tab-${category.id}`
    const panelId = `category-panel-${category.id}`
    
    return (
      <button
        id={tabId}
        role="tab"
        aria-selected={isActive}
        aria-controls={panelId}
        tabIndex={isActive ? 0 : -1}
        onClick={() => handleCategoryClick(category.id)}
        className={`
          relative ${isMobile ? 'flex-shrink-0' : ''} px-4 ${isMobile ? 'py-2' : 'py-2.5 px-5'} 
          rounded-lg font-semibold ${isMobile ? 'text-sm' : 'text-base'}
          transition-all duration-200 whitespace-nowrap
          focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2
          ${isActive 
            ? 'text-white shadow-lg' 
            : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
          }
          ${!isActive && !isMobile ? 'bg-transparent' : ''}
          ${!isActive && isMobile ? 'bg-zinc-100' : ''}
        `}
        aria-label={`${category.name}, ${category.count} productos`}
      >
        {/* Active background with animation - Solo desktop */}
        {isActive && !isMobile && (
          <motion.div
            layoutId="activeCategoryTab"
            className="absolute inset-0 bg-zinc-900 rounded-lg"
            transition={{ 
              type: "spring", 
              bounce: 0.15, 
              duration: 0.5 
            }}
            aria-hidden="true"
          />
        )}
        
        {/* Active background - Mobile (sin animación para performance) */}
        {isActive && isMobile && (
          <div className="absolute inset-0 bg-zinc-900 rounded-lg" aria-hidden="true" />
        )}
        
        {/* Content */}
        <span className="relative z-10 flex items-center gap-2">
          <span className={isMobile ? 'text-base' : 'text-lg'} role="img" aria-label={category.name}>
            {category.icon}
          </span>
          <span>{category.name}</span>
          <span 
            className={`
              text-xs px-2 py-0.5 rounded-full font-bold
              ${isActive 
                ? 'bg-white/20 text-white' 
                : 'bg-zinc-200 text-zinc-600'
              }
            `}
            aria-label={`${category.count} productos`}
          >
            {category.count}
          </span>
        </span>
      </button>
    )
  }

  return (
    <nav 
      className="w-full" 
      aria-label="Categorías de productos"
      role="tablist"
    >
      {/* Mobile: Horizontal scroll optimizado */}
      <div 
        className="block lg:hidden overflow-x-auto scrollbar-hide -mx-4 px-4"
        role="tablist"
        aria-label="Categorías de productos (móvil)"
      >
        <div className="flex gap-2 pb-2">
          {validCategories.map((category) => (
            <CategoryTab
              key={category.id}
              category={category}
              isActive={activeCategory === category.id}
              isMobile={true}
            />
          ))}
        </div>
      </div>

      {/* Desktop: Centered tabs con animación */}
      <div 
        className="hidden lg:block"
        role="tablist"
        aria-label="Categorías de productos (escritorio)"
      >
        <div className="flex flex-wrap gap-3 justify-center">
          {validCategories.map((category) => (
            <CategoryTab
              key={category.id}
              category={category}
              isActive={activeCategory === category.id}
              isMobile={false}
            />
          ))}
        </div>
      </div>

      {/* Styles optimizados */}
      <style jsx>{`
        /* Ocultar scrollbar pero mantener funcionalidad */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        /* Optimización de scroll en móvil */
        .scrollbar-hide {
          -webkit-overflow-scrolling: touch;
          scroll-behavior: smooth;
        }
        
        /* Prevenir layout shift en animaciones */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </nav>
  )
}