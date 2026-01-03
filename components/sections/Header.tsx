'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useCallback, useRef } from 'react'
import { useDebounce } from '@/lib/hooks/use-debounce'
import { usePathname } from 'next/navigation'

// Tipo para productos en búsqueda
type SearchProduct = {
  id: string
  name: string
  slug: string
  subtitle?: string | null
  price: number
  originalPrice?: number | null
  images: string[]
  category: { name: string } | null
  rating: number
  isBestSeller?: boolean
  isNew?: boolean
  isEco?: boolean
}

// ✅ Iconos inline SVG optimizados
const Icons = {
  Menu: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  X: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  WhatsApp: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  ),
  User: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  Sparkles: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  Moon: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21.64 13a1 1 0 00-1.05-.14 8.05 8.05 0 01-3.37.73 8.15 8.15 0 01-8.14-8.1 8.59 8.59 0 01.25-2A1 1 0 008 2.36a10.14 10.14 0 1014 11.69 1 1 0 00-.36-1.05z" />
    </svg>
  ),
  Search: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  Loader: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  ),
  Star: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ),
  Fire: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 23a7.5 7.5 0 01-5.138-12.963C8.204 8.774 11.5 6.5 11 1.5c6 4 9 8 3 14 1 0 2.5 0 5-2.47.27.773.5 1.604.5 2.47A7.5 7.5 0 0112 23z" />
    </svg>
  ),
  Truck: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
    </svg>
  ),
  CreditCard: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  ),
  MapPin: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  TrendingUp: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  Tag: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
    </svg>
  ),
  Factory: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
}

// 🇦🇷 Sistema de Campañas Argentina
const getCurrentCampaign = () => {
  const now = new Date()
  const month = now.getMonth() + 1
  const day = now.getDate()
  
  if (month === 5 && day >= 20 && day <= 31) {
    return {
      tagline: 'HOT SALE -40%',
      code: 'HOTSALE40',
      endDate: new Date(now.getFullYear(), 4, 31, 23, 59, 59),
      showCountdown: true,
      theme: 'hotsale'
    }
  }
  
  if (month === 11 && day >= 1 && day <= 10) {
    return {
      tagline: 'CYBER -45%',
      code: 'CYBER45',
      endDate: new Date(now.getFullYear(), 10, 10, 23, 59, 59),
      showCountdown: true,
      theme: 'cyber'
    }
  }
  
  return {
    tagline: '12 CUOTAS SIN INTERÉS',
    code: 'VILLAMARIA',
    endDate: null,
    showCountdown: false,
    theme: 'default'
  }
}

const campaign = getCurrentCampaign()

const SITE_CONFIG = {
  phone: '+5493534017332',
  phoneDisplay: '353 123-4567',
  whatsappNumber: '5493534017332',
  brandName: 'Azul Colchones',
  location: 'Villa María, Córdoba',
  tagline: campaign.tagline,
  promoCode: campaign.code,
  showCountdown: campaign.showCountdown,
  endDate: campaign.endDate,
  theme: campaign.theme,
} as const

const POPULAR_SEARCHES = [
  'Ofertas del mes', 
  'Más vendidos', 
  'Viscoelástico', 
  'Sommier 2 plazas', 
  'Memory foam'
] as const

export default function Header() {
  const pathname = usePathname()
  
  // Estados
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchResults, setSearchResults] = useState<SearchProduct[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [countdown, setCountdown] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)
  const searchContainerRef = useRef<HTMLDivElement>(null)

  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  // Countdown effect
  useEffect(() => {
    if (!SITE_CONFIG.showCountdown || !SITE_CONFIG.endDate) return
    
    const calculateCountdown = () => {
      const now = new Date()
      const endDate = SITE_CONFIG.endDate as Date
      const diff = endDate.getTime() - now.getTime()
      
      if (diff <= 0) {
        setCountdown('00:00:00')
        return
      }
      
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)
      
      setCountdown(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`)
    }

    calculateCountdown()
    const interval = setInterval(calculateCountdown, 1000)
    return () => clearInterval(interval)
  }, [])

  // Scroll handler
  const handleScroll = useCallback(() => {
    const isScrolled = window.scrollY > 20
    if (isScrolled !== scrolled) setScrolled(isScrolled)
  }, [scrolled])

  // Menu handlers
  const toggleMenu = useCallback(() => setIsMenuOpen(prev => !prev), [])
  const closeMenu = useCallback(() => setIsMenuOpen(false), [])

  // Search effect
  useEffect(() => {
    const performSearch = async () => {
      const trimmedQuery = debouncedSearchQuery.trim()
      
      if (trimmedQuery.length === 0) {
        setSearchResults([])
        setIsSearching(false)
        return
      }

      if (trimmedQuery.length < 2) {
        setIsSearching(false)
        return
      }

      try {
        setIsSearching(true)
        const response = await fetch(`/api/products/search?q=${encodeURIComponent(trimmedQuery)}&limit=10`)
        if (!response.ok) throw new Error('Search failed')
        
        const results = await response.json()
        setSearchResults(results)
      } catch (error) {
        console.error('Error en búsqueda:', error)
        setSearchResults([])
      } finally {
        setIsSearching(false)
      }
    }

    performSearch()
  }, [debouncedSearchQuery])

  // Click outside search
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false)
      }
    }
    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isSearchOpen])

  // Focus search input
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isSearchOpen])

  // Scroll listener
  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [handleScroll])

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [isMenuOpen])

  // Nav links - ✅ CONSTANTE ESTÁTICA (evita hydration errors)
  const navLinks = [
    { href: '/catalogo', label: 'Entrega Inmediata', icon: 'catalog', featured: true },
    { href: '/piero-fabrica', label: 'Entrega 7 días', icon: 'factory', factory: true },
    { href: '/simulador', label: 'Test IA', icon: 'ai', special: true },
    { href: '/blog', label: 'Guía de Sueño', icon: 'blog' },
  ] as const

  // Search handlers
  const handleSearchClick = (slug: string) => {
    window.location.href = `/producto/${slug}`
    setIsSearchOpen(false)
    setSearchQuery('')
  }

  const handlePopularSearch = (term: string) => {
    setSearchQuery(term)
    setIsSearchOpen(true)
  }

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  // Product badges
  const renderProductBadges = (product: SearchProduct) => {
    const badges = []
    
    if (product.isBestSeller) {
      badges.push(
        <span key="bestseller" className="px-1.5 py-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-[9px] font-black rounded uppercase flex-shrink-0">
          Hot
        </span>
      )
    }
    if (product.isNew) {
      badges.push(
        <span key="new" className="px-1.5 py-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-[9px] font-black rounded uppercase flex-shrink-0">
          Oferta
        </span>
      )
    }
    if (product.isEco) {
      badges.push(
        <span key="eco" className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-300 text-[9px] font-black rounded uppercase flex-shrink-0">
          Eco
        </span>
      )
    }
    
    return badges
  }

  // Early return para admin
  if (pathname?.startsWith('/admin')) {
    return null
  }

  return (
    <>
      {/* TOP BAR - ARGENTINA 🇦🇷 - MOBILE OPTIMIZED */}
      <div className="relative bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.15)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] animate-shimmer" aria-hidden="true" />
        </div>
        
        <div className="container mx-auto px-3 sm:px-4 relative z-10">
          <div className="flex items-center justify-between py-1.5 sm:py-2 gap-2">
            {/* Left side - COMPACTO MOBILE */}
            <div className="flex items-center gap-1.5 sm:gap-3 overflow-hidden">
              {SITE_CONFIG.showCountdown && countdown ? (
                <div className="flex items-center gap-1 sm:gap-2 bg-black/30 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full flex-shrink-0">
                  <Icons.Fire className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-300 animate-pulse" />
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] sm:text-xs font-black text-yellow-300 uppercase hidden xs:inline">Termina</span>
                    <span className="text-xs sm:text-sm font-black text-white tabular-nums">{countdown}</span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-1 sm:gap-2 bg-black/30 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full flex-shrink-0">
                  <Icons.CreditCard className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-200" />
                  <span className="text-[10px] sm:text-sm font-black text-white truncate">📍 Balerdi 855</span>
                </div>
              )}
              
              <div className="hidden md:flex items-center gap-1.5 sm:gap-2 bg-black/20 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full flex-shrink-0">
                <Icons.MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-200" />
                <span className="text-[10px] sm:text-xs font-bold text-white">
                  <span className="text-cyan-200">{SITE_CONFIG.location}</span>
                </span>
              </div>
            </div>

            {/* Right side - COMPACTO MOBILE */}
            <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
              <div className="hidden xs:flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs font-bold text-white">
                <Icons.Truck className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-200" />
                <span className="hidden sm:inline">Envío <span className="text-cyan-200">GRATIS</span></span>
                <span className="sm:hidden text-cyan-200">Gratis</span>
              </div>
              
              <a 
                href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent('¡Hola! Me interesa conocer más sobre los colchones')}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contactar por WhatsApp"
                className="flex items-center gap-1 sm:gap-1.5 bg-emerald-500/90 hover:bg-emerald-500 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold text-white transition-all shadow-lg"
              >
                <Icons.WhatsApp className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                <span className="hidden xs:inline">WhatsApp</span>
                <span className="xs:hidden">WA</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* HEADER PRINCIPAL - MOBILE OPTIMIZED */}
      <header className={`sticky top-0 z-50 backdrop-blur-xl transition-all duration-300 ${
        scrolled 
          ? 'bg-zinc-950/95 border-b border-blue-500/20 shadow-2xl shadow-blue-500/10' 
          : 'bg-zinc-950/90 border-b border-blue-500/10'
      }`}>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" aria-hidden="true" />

        <nav className="container mx-auto px-3 sm:px-4 relative z-10" role="navigation" aria-label="Principal">
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-20 gap-2">
            {/* LOGO - COMPACTO MOBILE */}
            <Link href="/" className="group relative flex-shrink-0 z-50" aria-label="Ir a inicio">
              <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 transition-transform group-hover:scale-[1.02]">
                <div className="relative">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-11 md:h-11 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/50">
                    <Icons.Moon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-blue-400/30 blur-md -z-10 animate-pulse-glow" aria-hidden="true" />
                </div>
                
                <div className="flex flex-col">
                  <div className="text-base sm:text-lg md:text-xl font-black leading-none tracking-tight">
                    <span className="text-white">Azul</span>
                    <span className="text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300 bg-clip-text">Colchones</span>
                  </div>
                  <div className="text-[8px] sm:text-[9px] md:text-[10px] font-black tracking-wider uppercase mt-0.5">
                    <span className="text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text">
                      {SITE_CONFIG.location}
                    </span>
                  </div>
                </div>
              </div>
            </Link>

            {/* BUSCADOR CENTRAL - DESKTOP ONLY */}
            <div ref={searchContainerRef} className="hidden lg:flex flex-1 max-w-2xl mx-8 relative">
              <div className="relative w-full">
                <div className="relative">
                  <Icons.Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400 pointer-events-none" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchOpen(true)}
                    placeholder="🔥 Buscá colchones, sommiers y ofertas..."
                    aria-label="Buscar productos"
                    className="w-full pl-12 pr-12 py-3 bg-white/5 border border-blue-500/20 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                  />
                  {isSearching && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <Icons.Loader className="w-5 h-5 text-blue-400 animate-spin" />
                    </div>
                  )}
                  {searchQuery && !isSearching && (
                    <button
                      onClick={() => { setSearchQuery(''); setSearchResults([]) }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
                      aria-label="Limpiar búsqueda"
                    >
                      <Icons.X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Search Results Dropdown - DESKTOP */}
                {isSearchOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-900/98 backdrop-blur-xl border border-blue-500/20 rounded-xl shadow-2xl shadow-black/50 max-h-[500px] overflow-y-auto animate-slide-down">
                    {searchQuery.trim().length === 0 ? (
                      <div className="p-4">
                        <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider mb-3">
                          <Icons.TrendingUp className="w-3.5 h-3.5" />
                          <span>Búsquedas Populares</span>
                        </div>
                        <div className="space-y-1">
                          {POPULAR_SEARCHES.map((term, idx) => (
                            <button
                              key={idx}
                              onClick={() => handlePopularSearch(term)}
                              className="w-full text-left px-3 py-2.5 text-sm text-zinc-300 hover:text-white hover:bg-blue-500/10 rounded-lg transition-all flex items-center gap-2 group"
                            >
                              <Icons.Search className="w-4 h-4 text-zinc-600 group-hover:text-blue-400 transition-colors" />
                              <span className="font-medium">{term}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : searchResults.length > 0 ? (
                      <div className="p-2">
                        <div className="text-xs font-bold text-blue-400 uppercase tracking-wider px-3 py-2">
                          {searchResults.length} resultado{searchResults.length !== 1 ? 's' : ''}
                        </div>
                        {searchResults.map((product) => (
                          <button
                            key={product.id}
                            onClick={() => handleSearchClick(product.slug)}
                            className="w-full text-left p-3 hover:bg-blue-500/10 rounded-lg transition-all group"
                          >
                            <div className="flex items-start gap-3">
                              {product.images && product.images.length > 0 && (
                                <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-white/5">
                                  <Image
                                    src={product.images[0]}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                    sizes="64px"
                                  />
                                </div>
                              )}
                              
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-3 mb-1">
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-white group-hover:text-blue-300 transition-colors line-clamp-1">
                                      {product.name}
                                    </h4>
                                    {product.subtitle && (
                                      <p className="text-xs text-zinc-500 line-clamp-1 mt-0.5">
                                        {product.subtitle}
                                      </p>
                                    )}
                                  </div>
                                  <div className="flex-shrink-0 text-right">
                                    <div className="text-lg font-bold text-blue-400">
                                      {formatPrice(product.price)}
                                    </div>
                                    {product.originalPrice && product.originalPrice > product.price && (
                                      <div className="text-xs text-zinc-500 line-through">
                                        {formatPrice(product.originalPrice)}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-2 flex-wrap">
                                  {product.category && (
                                    <span className="text-xs text-zinc-500 font-medium">
                                      {product.category.name}
                                    </span>
                                  )}
                                  {product.rating > 0 && (
                                    <>
                                      <span className="text-zinc-700">•</span>
                                      <div className="flex items-center gap-1">
                                        <Icons.Star className="w-3 h-3 text-amber-400" />
                                        <span className="text-xs text-zinc-400 font-medium">
                                          {product.rating.toFixed(1)}
                                        </span>
                                      </div>
                                    </>
                                  )}
                                  {renderProductBadges(product)}
                                </div>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : isSearching ? (
                      <div className="p-8 text-center">
                        <Icons.Loader className="w-8 h-8 mx-auto mb-4 text-blue-400 animate-spin" />
                        <p className="text-zinc-400 font-medium">Buscando ofertas...</p>
                      </div>
                    ) : (
                      <div className="p-8 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                          <Icons.Search className="w-8 h-8 text-zinc-600" />
                        </div>
                        <p className="text-zinc-400 font-medium mb-1">No encontramos resultados</p>
                        <p className="text-sm text-zinc-600">
                          Probá con otras palabras
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* DESKTOP NAV */}
            <ul className="hidden lg:flex items-center gap-1" role="menubar">
              {navLinks.map((link) => {
                const isFeatured = 'featured' in link && link.featured
                const isFactory = 'factory' in link && link.factory
                const isSpecial = 'special' in link && link.special
                
                return (
                  <li key={link.href} role="none">
                    <Link 
                      href={link.href}
                      role="menuitem"
                      className={`relative group px-4 py-2.5 rounded-lg transition-all ${
                        isFeatured
                          ? 'bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30' 
                          : isFactory
                          ? 'bg-gradient-to-r from-orange-600/10 to-red-600/10 border border-orange-500/20'
                          : isSpecial 
                          ? 'bg-gradient-to-r from-violet-600/10 to-fuchsia-600/10 border border-violet-500/20' 
                          : 'hover:bg-white/5'
                      }`}
                    >
                      <span className={`font-semibold text-sm transition-colors ${
                        isFeatured
                          ? 'text-blue-300 group-hover:text-blue-200'
                          : isFactory
                          ? 'text-orange-300 group-hover:text-orange-200'
                          : isSpecial 
                          ? 'text-violet-300 group-hover:text-violet-200' 
                          : 'text-zinc-300 group-hover:text-white'
                      }`}>
                        {link.label}
                      </span>
                      {isFeatured && (
                        <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-[8px] font-black rounded uppercase tracking-wider shadow-lg animate-pulse">
                          HOT
                        </span>
                      )}
                      {isFactory && (
                        <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[8px] font-black rounded uppercase tracking-wider shadow-lg">
                          -40%
                        </span>
                      )}
                      {isSpecial && (
                        <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-[8px] font-black rounded uppercase tracking-wider shadow-lg">
                          IA
                        </span>
                      )}
                      <span className={`absolute bottom-0 left-0 w-0 h-0.5 rounded-full transition-all duration-300 group-hover:w-full ${
                        isFeatured 
                          ? 'bg-gradient-to-r from-blue-400 to-cyan-400' 
                          : isFactory
                          ? 'bg-gradient-to-r from-orange-400 to-red-400'
                          : 'bg-gradient-to-r from-violet-400 to-fuchsia-400'
                      }`} aria-hidden="true" />
                    </Link>
                  </li>
                )
              })}
            </ul>

            {/* ACTIONS - MOBILE OPTIMIZED */}
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              {/* Search button mobile */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="lg:hidden flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white/5 hover:bg-white/10 border border-blue-500/20 transition-all"
                aria-label="Buscar"
              >
                <Icons.Search className="w-4 h-4 sm:w-5 sm:h-5 text-blue-300" />
              </button>

              {/* User - HIDDEN ON SMALL MOBILE */}
              <Link 
                href="/mi-cuenta" 
                className="hidden sm:flex items-center justify-center w-9 h-9 md:w-11 md:h-11 rounded-lg md:rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group"
                aria-label="Mi cuenta"
              >
                <Icons.User className="w-4 h-4 md:w-5 md:h-5 text-zinc-300 group-hover:text-white transition-colors" />
              </Link>

              {/* CTA Desktop */}
              <Link 
                href="/catalogo" 
                className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-500/30 transition-all hover:scale-105 active:scale-95"
              >
                <Icons.Sparkles className="w-4 h-4" />
                <span>Ver Ofertas</span>
              </Link>

              {/* Menu button mobile */}
              <button 
                onClick={toggleMenu} 
                className="lg:hidden flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 transition-all relative z-[60] hover:bg-white/10" 
                aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? (
                  <Icons.X className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-300" />
                ) : (
                  <Icons.Menu className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-300" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* BUSCADOR MÓVIL - FULLSCREEN - OPTIMIZADO */}
      {isSearchOpen && (
        <div className="lg:hidden fixed inset-0 z-[100] bg-zinc-950/98 backdrop-blur-xl animate-fade-in">
          <div className="container mx-auto px-4 py-4 h-full flex flex-col">
            <div className="flex items-center gap-2 sm:gap-3 mb-4">
              <div className="relative flex-1">
                <Icons.Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-blue-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="🔥 Buscá colchones y ofertas..."
                  autoFocus
                  aria-label="Buscar productos"
                  className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-3.5 bg-white/5 border border-blue-500/20 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-sm sm:text-base"
                />
                {isSearching && (
                  <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2">
                    <Icons.Loader className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 animate-spin" />
                  </div>
                )}
                {searchQuery && !isSearching && (
                  <button
                    onClick={() => { setSearchQuery(''); setSearchResults([]) }}
                    className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
                    aria-label="Limpiar búsqueda"
                  >
                    <Icons.X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                )}
              </div>
              <button
                onClick={() => { setIsSearchOpen(false); setSearchQuery(''); setSearchResults([]) }}
                className="flex-shrink-0 px-3 sm:px-4 py-3 sm:py-3.5 text-zinc-300 hover:text-white font-semibold text-sm transition-colors"
              >
                Cancelar
              </button>
            </div>

            <div className="flex-1 overflow-y-auto -mx-4 px-4">
              {searchQuery.trim().length === 0 ? (
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider mb-4">
                    <Icons.TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span>Búsquedas Populares</span>
                  </div>
                  <div className="space-y-2">
                    {POPULAR_SEARCHES.map((term, idx) => (
                      <button
                        key={idx}
                        onClick={() => handlePopularSearch(term)}
                        className="w-full text-left px-3 sm:px-4 py-3 sm:py-3.5 bg-white/5 hover:bg-blue-500/10 rounded-xl transition-all flex items-center gap-2 sm:gap-3 group border border-blue-500/20"
                      >
                        <Icons.Search className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-600 group-hover:text-blue-400 transition-colors flex-shrink-0" />
                        <span className="font-semibold text-sm sm:text-base text-zinc-300 group-hover:text-white transition-colors">{term}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : searchResults.length > 0 ? (
                <div>
                  <div className="text-xs sm:text-sm font-bold text-blue-400 uppercase tracking-wider mb-4">
                    {searchResults.length} resultado{searchResults.length !== 1 ? 's' : ''}
                  </div>
                  <div className="space-y-3">
                    {searchResults.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => handleSearchClick(product.slug)}
                        className="w-full text-left p-3 sm:p-4 bg-white/5 hover:bg-blue-500/10 rounded-xl transition-all border border-blue-500/20"
                      >
                        <div className="flex items-start gap-3">
                          {product.images && product.images.length > 0 && (
                            <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-lg overflow-hidden bg-white/5">
                              <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                className="object-cover"
                                sizes="80px"
                              />
                            </div>
                          )}
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 sm:gap-3 mb-2">
                              <h4 className="font-bold text-white text-sm sm:text-base line-clamp-2">
                                {product.name}
                              </h4>
                              <div className="flex-shrink-0 text-right">
                                <div className="text-lg sm:text-xl font-black text-blue-400">
                                  {formatPrice(product.price)}
                                </div>
                                {product.originalPrice && product.originalPrice > product.price && (
                                  <div className="text-xs text-zinc-500 line-through">
                                    {formatPrice(product.originalPrice)}
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-1.5 flex-wrap">
                              {renderProductBadges(product)}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : isSearching ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <Icons.Loader className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-6 text-blue-400 animate-spin" />
                  <p className="text-base sm:text-lg text-zinc-300 font-bold">Buscando ofertas...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
                    <Icons.Search className="w-8 h-8 sm:w-10 sm:h-10 text-zinc-600" />
                  </div>
                  <p className="text-base sm:text-lg text-zinc-300 font-bold mb-2">No encontramos resultados</p>
                  <p className="text-sm text-zinc-600">Probá con otras palabras</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MOBILE MENU - ARGENTINA - ✅ CON PIERO FÁBRICA */}
      {isMenuOpen && (
        <>
          <div 
            onClick={closeMenu} 
            className="fixed inset-0 bg-black/90 backdrop-blur-sm lg:hidden animate-fade-in"
            style={{ zIndex: 9998 }}
            aria-hidden="true"
          />

          <div 
            className="fixed inset-0 lg:hidden flex flex-col animate-slide-up"
            style={{ zIndex: 9999 }}
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
          >
            {/* Menu Header */}
            <div className="flex-shrink-0 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.15)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer" aria-hidden="true" />
              <div className="container mx-auto px-4 relative z-10">
                <div className="flex items-center justify-between h-14 sm:h-16">
                  <div className="flex items-center gap-2 sm:gap-2.5">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                      {SITE_CONFIG.showCountdown ? (
                        <Icons.Fire className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300" />
                      ) : (
                        <Icons.CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-200" />
                      )}
                    </div>
                    <div>
                      <div className="text-sm sm:text-base font-black text-white">{SITE_CONFIG.tagline}</div>
                      {SITE_CONFIG.showCountdown && countdown && (
                        <div className="text-[9px] text-cyan-100 uppercase tracking-wider font-bold">Termina en {countdown}</div>
                      )}
                    </div>
                  </div>
                  <button 
                    onClick={closeMenu} 
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition"
                    aria-label="Cerrar menú"
                  >
                    <Icons.X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Menu Content */}
            <div className="flex-1 overflow-y-auto bg-gradient-to-b from-zinc-950 to-zinc-900">
              <div className="container mx-auto px-4 py-4 sm:py-6 pb-safe">
                {/* Quick Actions - GRID 2 COLUMNAS CON PIERO FÁBRICA */}
                <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <Link 
                    href="/catalogo" 
                    onClick={closeMenu} 
                    className="relative overflow-hidden rounded-xl sm:rounded-2xl active:scale-95 transition-transform shadow-xl"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500" />
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.15)_50%,transparent_75%)] bg-[length:200%_200%] animate-shimmer" aria-hidden="true" />
                    <div className="relative flex flex-col items-center justify-center p-4 sm:p-6 text-white">
                      <Icons.Fire className="w-7 h-7 sm:w-8 sm:h-8 mb-2 drop-shadow-lg animate-pulse" />
                      <span className="text-sm sm:text-base font-black mb-1">Ver Ofertas</span>
                      <span className="text-[10px] sm:text-xs text-cyan-100 font-bold">
                        {SITE_CONFIG.showCountdown ? 'Hasta -45%' : 'Mejores precios'}
                      </span>
                    </div>
                  </Link>
                  
                  <Link 
                    href="/piero-fabrica" 
                    onClick={closeMenu} 
                    className="relative overflow-hidden rounded-xl sm:rounded-2xl active:scale-95 transition-transform shadow-xl"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-orange-500 to-red-500" />
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.15)_50%,transparent_75%)] bg-[length:200%_200%] animate-shimmer" aria-hidden="true" />
                    <div className="relative flex flex-col items-center justify-center p-4 sm:p-6 text-white">
                      <Icons.Factory className="w-7 h-7 sm:w-8 sm:h-8 mb-2 drop-shadow-lg" />
                      <span className="text-sm sm:text-base font-black mb-1">Piero Fábrica</span>
                      <span className="text-[10px] sm:text-xs text-orange-100 font-bold">-30% a -40%</span>
                    </div>
                  </Link>
                </div>

                {/* Promo Code */}
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20 rounded-xl sm:rounded-2xl border-2 border-blue-500/30 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.05)_50%,transparent_75%)] bg-[length:200%_200%] animate-shimmer" aria-hidden="true" />
                  <div className="relative flex items-center justify-between">
                    <div>
                      <div className="text-[10px] sm:text-xs font-bold text-cyan-300 uppercase mb-0.5 sm:mb-1">Código exclusivo</div>
                      <div className="text-xl sm:text-2xl font-black text-white tracking-wider">{SITE_CONFIG.promoCode}</div>
                      <div className="text-[10px] sm:text-xs text-zinc-400 mt-1">
                        {SITE_CONFIG.showCountdown ? 'Descuento adicional' : 'Beneficio especial'}
                      </div>
                    </div>
                    <Icons.Tag className="w-10 h-10 sm:w-12 sm:h-12 text-cyan-400/30" />
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mb-4 sm:mb-6 p-3 sm:p-4 bg-gradient-to-br from-blue-950/30 to-cyan-950/30 rounded-xl sm:rounded-2xl border border-blue-500/20">
                  <div className="flex flex-col items-center text-center">
                    <Icons.Truck className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 mb-1.5 sm:mb-2" />
                    <div className="text-[10px] sm:text-xs font-bold text-white">Envío</div>
                    <div className="text-[9px] sm:text-[10px] text-blue-400 mt-0.5">Gratis VM</div>
                  </div>
                  <div className="flex flex-col items-center text-center border-x border-blue-500/20">
                    <Icons.CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 mb-1.5 sm:mb-2" />
                    <div className="text-[10px] sm:text-xs font-bold text-white">12 cuotas</div>
                    <div className="text-[9px] sm:text-[10px] text-cyan-400 mt-0.5">Sin interés</div>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <Icons.Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 mb-1.5 sm:mb-2" />
                    <div className="text-[10px] sm:text-xs font-bold text-white">Premium</div>
                    <div className="text-[9px] sm:text-[10px] text-cyan-400 mt-0.5">Calidad</div>
                  </div>
                </div>

                {/* Navigation Links */}
                <nav className="mb-4 sm:mb-6">
                  <div className="text-[10px] sm:text-xs font-bold text-blue-400 uppercase tracking-wider mb-2 sm:mb-3 px-1">Navegación</div>
                  <ul className="space-y-2" role="menu">
                    {navLinks.map((link) => {
                      const isFeatured = 'featured' in link && link.featured
                      const isFactory = 'factory' in link && link.factory
                      const isSpecial = 'special' in link && link.special
                      
                      return (
                        <li key={link.href} role="none">
                          <Link 
                            href={link.href} 
                            onClick={closeMenu}
                            role="menuitem"
                            className={`flex items-center justify-between p-3 sm:p-4 rounded-xl font-bold text-sm sm:text-base transition-all active:scale-98 ${
                              isFeatured
                                ? 'bg-gradient-to-r from-blue-600/20 to-cyan-600/20 text-white border border-blue-500/30 shadow-lg' 
                                : isFactory
                                ? 'bg-gradient-to-r from-orange-600/20 to-red-600/20 text-white border border-orange-500/30 shadow-lg'
                                : isSpecial 
                                ? 'bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 text-white border border-violet-500/30' 
                                : 'text-zinc-300 bg-white/5 border border-white/10 hover:bg-white/10'
                            }`}
                          >
                            <span>{link.label}</span>
                            {isFeatured && (
                              <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-[8px] sm:text-[9px] font-black rounded-full uppercase shadow-lg animate-pulse">
                                Hot
                              </span>
                            )}
                            {isFactory && (
                              <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[8px] sm:text-[9px] font-black rounded-full uppercase shadow-lg">
                                -40%
                              </span>
                            )}
                            {isSpecial && (
                              <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-[8px] sm:text-[9px] font-black rounded-full uppercase shadow-lg">
                                IA
                              </span>
                            )}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </nav>

                {/* User Account */}
                <div className="border-t border-blue-500/20 pt-4 sm:pt-6">
                  <div className="text-[10px] sm:text-xs font-bold text-blue-400 uppercase tracking-wider mb-2 sm:mb-3 px-1">Mi cuenta</div>
                  <Link 
                    href="/mi-cuenta" 
                    onClick={closeMenu} 
                    className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 text-zinc-300 bg-white/5 border border-blue-500/20 rounded-xl transition-all active:scale-98 hover:bg-blue-500/10"
                  >
                    <Icons.User className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    <span className="font-semibold text-sm sm:text-base">Acceder a mi cuenta</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        @keyframes scale-in {
          from { transform: scale(0); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(100%); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
        .animate-scale-in { animation: scale-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .animate-fade-in { animation: fade-in 0.2s ease-out; }
        .animate-slide-up { animation: slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-slide-down { animation: slide-down 0.2s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-shimmer { animation: shimmer 3s linear infinite; }
        
        .active\\:scale-98:active { transform: scale(0.98); }
        .active\\:scale-95:active { transform: scale(0.95); }
        
        .pb-safe { padding-bottom: max(1.5rem, env(safe-area-inset-bottom)); }

        @media (min-width: 375px) {
          .xs\\:inline { display: inline; }
          .xs\\:flex { display: flex; }
          .xs\\:hidden { display: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-pulse-glow,
          .animate-scale-in,
          .animate-fade-in,
          .animate-slide-up,
          .animate-slide-down,
          .animate-shimmer,
          .animate-pulse { animation: none !important; }
        }

        @supports (scrollbar-width: thin) {
          * {
            scrollbar-width: thin;
            scrollbar-color: rgba(59, 130, 246, 0.3) transparent;
          }
        }
      `}</style>
    </>
  )
}