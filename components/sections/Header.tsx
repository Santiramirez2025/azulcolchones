'use client'

import Link from 'next/link'
import { useState, useEffect, useCallback, useRef } from 'react'
import { usePathname } from 'next/navigation'

const Icons = {
  Menu: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  X: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  WhatsApp: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  ),
  ChevronRight: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  ),
  ChevronDown: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  ),
  Verified: ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  ),
  Tag: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
    </svg>
  ),
  Info: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
}

const BrandIcon = ({ className = "w-10 h-10", id = "" }: { className?: string; id?: string }) => {
  const uniqueId = id || Math.random().toString(36).substr(2, 9)
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`brandGradient-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="50%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
        <linearGradient id={`moonGradient-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E0E7FF" />
        </linearGradient>
        <linearGradient id={`starGradient-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="100%" stopColor="#FBBF24" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="44" height="44" rx="12" fill={`url(#brandGradient-${uniqueId})`} />
      <rect x="2" y="2" width="44" height="44" rx="12" fill={`url(#brandGradient-${uniqueId})`} opacity="0.8" />
      <path d="M28 12C28 19.732 21.732 26 14 26C12.783 26 11.604 25.847 10.48 25.56C12.63 30.51 17.52 34 23.2 34C30.827 34 37 27.732 37 20C37 14.32 33.51 9.43 28.56 7.28C28.847 8.404 29 9.583 29 10.8C29 11.21 28.98 11.61 28.94 12H28Z" fill={`url(#moonGradient-${uniqueId})`} />
      <path d="M33 14L34.09 16.26L36.5 16.64L34.75 18.34L35.18 20.74L33 19.59L30.82 20.74L31.25 18.34L29.5 16.64L31.91 16.26L33 14Z" fill={`url(#starGradient-${uniqueId})`} />
      <path d="M38 22L38.6 23.2L39.9 23.4L38.95 24.3L39.2 25.6L38 24.95L36.8 25.6L37.05 24.3L36.1 23.4L37.4 23.2L38 22Z" fill={`url(#starGradient-${uniqueId})`} opacity="0.7" />
    </svg>
  )
}

const CONFIG = {
  whatsapp: '5493534096566',
  whatsappMessage: 'Hola! Quiero consultar por colchones',
  brand: 'Azul Colchones',
  location: 'Villa María',
  foundedYear: 1991,
} as const

// Navegación adicional
const NAVIGATION_ITEMS = [
  { href: '/nosotros', label: 'Nosotros', icon: '👥' },
  { href: '/preguntas-frecuentes', label: 'Preguntas Frecuentes', icon: '❓' },
  { href: '/envios', label: 'Envíos', icon: '🚚' },
  { href: '/dormitorio-perfecto', label: 'Dormitorio Perfecto', icon: '🛏️' },
  { href: '/dormir-rapido', label: 'Dormir Rápido', icon: '😴' },
  { href: '/cuidado-colchon', label: 'Cuidado del Colchón', icon: '🧼' },
  { href: '/contacto', label: 'Contacto', icon: '📞' },
]

const yearsOfExperience = new Date().getFullYear() - CONFIG.foundedYear

const BrandLogo = ({ variant = 'desktop' }: { variant?: 'desktop' | 'mobile' }) => {
  const isDesktop = variant === 'desktop'
  return (
    <Link href="/" className="flex-shrink-0 group">
      <div className="flex items-center gap-3">
        <div className="relative">
          <BrandIcon className={isDesktop ? "w-11 h-11" : "w-10 h-10"} id={variant} />
          <div className="absolute inset-0 rounded-xl bg-blue-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="flex flex-col">
          <div className="flex items-baseline gap-0.5">
            <span className={`font-black leading-none text-white ${isDesktop ? 'text-xl' : 'text-lg'}`}>AZUL</span>
            <span className={`font-light leading-none text-blue-400 ${isDesktop ? 'text-xl' : 'text-lg'}`}>Colchones</span>
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-wide">{CONFIG.location}</span>
            <span className="w-1 h-1 rounded-full bg-zinc-600" />
            <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wide">Desde {CONFIG.foundedYear}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

const OfficialBadge = ({ variant = 'desktop' }: { variant?: 'desktop' | 'mobile' | 'menu' }) => {
  if (variant === 'desktop') {
    return (
      <div className="hidden lg:flex items-center gap-3 pl-5 ml-5 border-l border-zinc-700/50">
        <div className="flex items-center gap-2 px-3.5 py-2 bg-gradient-to-r from-amber-950/40 to-orange-950/40 border border-amber-500/30 rounded-xl shadow-lg shadow-amber-500/5">
          <Icons.Verified className="w-4 h-4 text-amber-400" />
          <div className="flex flex-col">
            <span className="text-[10px] font-medium text-amber-200/70 uppercase tracking-wider leading-none">Distribuidor Oficial</span>
            <span className="text-sm font-bold text-white leading-none mt-0.5">PIERO</span>
          </div>
        </div>
      </div>
    )
  }
  if (variant === 'mobile') {
    return (
      <div className="flex lg:hidden items-center gap-1 px-2 py-1.5 bg-amber-950/40 border border-amber-500/30 rounded-lg">
        <Icons.Verified className="w-3 h-3 text-amber-400" />
        <span className="text-[9px] font-bold text-amber-100 uppercase tracking-wide">PIERO</span>
      </div>
    )
  }
  return (
    <div className="flex items-center justify-center gap-3 px-4 py-3.5 bg-gradient-to-r from-amber-950/50 via-orange-950/50 to-amber-950/50 border border-amber-500/30 rounded-xl">
      <Icons.Verified className="w-6 h-6 text-amber-400" />
      <div className="flex flex-col">
        <span className="text-[10px] font-medium text-amber-200/70 uppercase tracking-wider">Distribuidor Oficial</span>
        <span className="text-base font-bold text-white tracking-wide">PIERO</span>
      </div>
      <div className="ml-auto flex items-center gap-1.5 px-2 py-1 bg-amber-500/20 rounded-md">
        <span className="text-[10px] font-bold text-amber-300">{yearsOfExperience}+ años</span>
      </div>
    </div>
  )
}

// Desktop Dropdown Component
const DesktopInfoDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all text-zinc-300 hover:text-white hover:bg-zinc-800/70"
      >
        <Icons.Info className="w-4 h-4" />
        <span>Información</span>
        <Icons.ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl shadow-black/40 py-2 z-50">
          {NAVIGATION_ITEMS.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 transition-colors ${
                  isActive 
                    ? 'bg-blue-600/20 text-white' 
                    : 'text-zinc-300 hover:bg-zinc-800/50 hover:text-white'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 10)
  }, [])

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

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [isMenuOpen])

  if (pathname?.startsWith('/admin')) return null

  const whatsappUrl = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`
  const headerClass = scrolled ? 'sticky top-0 z-50 transition-all duration-300 bg-zinc-950/98 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-zinc-800/50' : 'sticky top-0 z-50 transition-all duration-300 bg-zinc-950 border-b border-zinc-800/30'
  const isActivePieroFabrica = pathname === '/piero-fabrica'

  return (
    <>
      <header className={headerClass}>
        <nav className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            <div className="flex items-center">
              <div className="hidden lg:block">
                <BrandLogo variant="desktop" />
              </div>
              <div className="lg:hidden">
                <BrandLogo variant="mobile" />
              </div>
              <OfficialBadge variant="desktop" />
            </div>

            {/* DESKTOP NAV */}
            <div className="hidden lg:flex items-center gap-1">
              <Link href="/piero-fabrica" className={`relative px-5 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 ${isActivePieroFabrica ? 'text-white bg-gradient-to-r from-blue-600/90 to-blue-500/90 shadow-lg shadow-blue-500/20' : 'text-zinc-300 hover:text-white hover:bg-zinc-800/70'}`}>
                <Icons.Tag className="w-4 h-4" />
                <span>Piero Fábrica</span>
                <span className="text-[11px] font-bold text-emerald-300">Hasta 22% OFF</span>
              </Link>
              
              <DesktopInfoDropdown />
            </div>

            {/* DESKTOP CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-bold text-sm rounded-xl transition-all duration-200 shadow-lg shadow-green-500/25 hover:shadow-green-500/40 hover:scale-105 active:scale-95">
                <Icons.WhatsApp className="w-4 h-4" />
                <span>Consultar</span>
              </a>
            </div>

            {/* MOBILE: Badge + CTA + MENU */}
            <div className="flex lg:hidden items-center gap-2">
              <OfficialBadge variant="mobile" />
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-green-600 to-green-500 rounded-xl transition-all shadow-lg shadow-green-500/25 active:scale-95" aria-label="Consultar por WhatsApp">
                <Icons.WhatsApp className="w-5 h-5 text-white" />
              </a>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-zinc-800/80 border border-zinc-700/50 active:scale-95 transition-transform" aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"} aria-expanded={isMenuOpen}>
                {isMenuOpen ? <Icons.X className="w-5 h-5 text-white" /> : <Icons.Menu className="w-5 h-5 text-white" />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <>
          <div onClick={() => setIsMenuOpen(false)} className="fixed inset-0 bg-black/70 backdrop-blur-sm lg:hidden z-[60] animate-[fadeIn_0.2s_ease-out]" />
          <div className="fixed inset-x-0 top-16 bottom-0 lg:hidden z-[70] bg-zinc-950 shadow-xl animate-[slideDown_0.25s_ease-out] overflow-y-auto">
            <div className="max-w-7xl mx-auto px-4 py-4">
              
              <div className="mb-4">
                <OfficialBadge variant="menu" />
              </div>

              {/* Link Principal - Piero Fábrica */}
              <Link href="/piero-fabrica" onClick={() => setIsMenuOpen(false)} className={`flex items-center justify-between px-4 py-4 rounded-xl transition-all active:scale-[0.98] mb-3 ${isActivePieroFabrica ? 'bg-gradient-to-r from-blue-600/90 to-blue-500/90 text-white shadow-lg' : 'bg-zinc-900/50 text-zinc-300 hover:bg-zinc-800/50'}`}>
                <div className="flex items-center gap-3">
                  <Icons.Tag className="w-5 h-5" />
                  <div>
                    <span className="font-bold text-base block">Piero Fábrica</span>
                    <span className="block text-sm font-medium mt-0.5 text-emerald-400">Hasta 22% OFF</span>
                  </div>
                </div>
                <Icons.ChevronRight className="w-5 h-5 text-zinc-500" />
              </Link>

              <div className="border-t border-zinc-800 my-4" />

              {/* Navegación adicional */}
              <div className="space-y-1">
                {NAVIGATION_ITEMS.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all active:scale-[0.98] ${
                        isActive 
                          ? 'bg-zinc-800/80 text-white' 
                          : 'bg-zinc-900/30 text-zinc-300 hover:bg-zinc-800/50'
                      }`}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span className="font-medium text-sm">{item.label}</span>
                      <Icons.ChevronRight className="w-4 h-4 ml-auto text-zinc-500" />
                    </Link>
                  )
                })}
              </div>

              <div className="border-t border-zinc-800 my-4" />

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="px-2 py-2.5 bg-zinc-900/50 rounded-lg">
                  <span className="block text-base">📍</span>
                  <span className="text-[10px] font-medium text-zinc-400">Villa María</span>
                </div>
                <div className="px-2 py-2.5 bg-zinc-900/50 rounded-lg">
                  <span className="block text-base">🚚</span>
                  <span className="text-[10px] font-medium text-zinc-400">Envío Gratis</span>
                </div>
                <div className="px-2 py-2.5 bg-zinc-900/50 rounded-lg">
                  <span className="block text-base">💳</span>
                  <span className="text-[10px] font-medium text-zinc-400">12 Cuotas</span>
                </div>
              </div>

            </div>
          </div>
        </>
      )}
    </>
  )
}