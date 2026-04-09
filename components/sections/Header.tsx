'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useCallback, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'

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
  Info: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  PriceList: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  ),
}

const CONFIG = {
  whatsapp: '5493534096566',
  whatsappMessage: 'Hola! Quiero consultar por colchones',
  location: 'Villa María',
  foundedYear: 1991,
} as const

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
  const size = isDesktop ? 56 : 48

  return (
    <Link href="/" className="flex-shrink-0 group" aria-label="Azul Colchones — Inicio">
      <div className="flex items-center gap-3.5">
        <div className="relative flex-shrink-0">
          <div
            className="relative rounded-full overflow-hidden
                        shadow-[0_0_0_2px_rgba(255,255,255,0.08)]
                        group-hover:shadow-[0_0_0_2px_rgba(96,165,250,0.35)]
                        transition-shadow duration-300"
            style={{ width: size, height: size }}
          >
            <Image
              src="/logo-azul-colchones.png"
              alt="Azul Colchones"
              width={size * 2}
              height={size * 2}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <div
            className="absolute inset-0 rounded-full pointer-events-none
                        bg-blue-400/0 blur-lg group-hover:bg-blue-400/20
                        transition-all duration-500 scale-125"
          />
        </div>
        <div className="flex flex-col leading-none">
          <span
            className={`font-black text-white tracking-tight ${
              isDesktop ? 'text-[20px]' : 'text-[17px]'
            }`}
          >
            Azul Colchones
          </span>
          <div className="flex items-center gap-1.5 mt-[5px]">
            <span className="text-[9px] font-semibold text-zinc-500 uppercase tracking-[0.12em]">
              {CONFIG.location}
            </span>
            <span className="w-[3px] h-[3px] rounded-full bg-zinc-700 flex-shrink-0" />
            <span className="text-[9px] font-semibold text-zinc-500 uppercase tracking-[0.12em]">
              Desde {CONFIG.foundedYear}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

const OfficialBadge = ({ variant = 'desktop' }: { variant?: 'desktop' | 'mobile' | 'menu' }) => {
  if (variant === 'desktop') {
    return (
      <div className="hidden lg:flex items-center pl-5 ml-5 border-l border-zinc-700/50">
        <div className="flex items-center gap-2 px-3.5 py-2 bg-gradient-to-r from-amber-950/40 to-orange-950/40 border border-amber-500/30 rounded-xl shadow-lg shadow-amber-500/5">
          <Icons.Verified className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <div className="flex flex-col">
            <span className="text-[9px] font-semibold text-amber-200/60 uppercase tracking-widest leading-none">
              Distribuidor Oficial
            </span>
            <span className="text-[13px] font-black text-white leading-none mt-0.5 tracking-wide">
              PIERO
            </span>
          </div>
        </div>
      </div>
    )
  }
  if (variant === 'mobile') {
    return (
      <div className="flex lg:hidden items-center gap-1 px-2 py-1.5 bg-amber-950/40 border border-amber-500/30 rounded-lg">
        <Icons.Verified className="w-3 h-3 text-amber-400" />
        <span className="text-[9px] font-black text-amber-100 uppercase tracking-wide">PIERO</span>
      </div>
    )
  }
  return (
    <div className="flex items-center gap-3 px-4 py-3.5 bg-gradient-to-r from-amber-950/50 via-orange-950/50 to-amber-950/50 border border-amber-500/30 rounded-xl">
      <Icons.Verified className="w-6 h-6 text-amber-400 flex-shrink-0" />
      <div className="flex flex-col">
        <span className="text-[9px] font-semibold text-amber-200/60 uppercase tracking-widest">
          Distribuidor Oficial
        </span>
        <span className="text-base font-black text-white tracking-wide">PIERO</span>
      </div>
      <div className="ml-auto flex items-center px-2.5 py-1 bg-amber-500/20 rounded-lg">
        <span className="text-[10px] font-bold text-amber-300">{yearsOfExperience}+ años</span>
      </div>
    </div>
  )
}

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
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all
                   text-zinc-400 hover:text-white hover:bg-zinc-800/60"
      >
        <Icons.Info className="w-4 h-4" />
        <span>Información</span>
        <Icons.ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl shadow-black/50 py-2 z-50">
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
                    : 'text-zinc-400 hover:bg-zinc-800/60 hover:text-white'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

const PriceListButton = ({ variant = 'desktop', onNavigate }: { variant?: 'desktop' | 'mobile'; onNavigate?: () => void }) => {
  if (variant === 'desktop') {
    return (
      <Link
        href="/lista-precios"
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all
                   text-zinc-300 hover:text-white hover:bg-zinc-800/60"
        title="Ver lista completa de precios"
      >
        <Icons.PriceList className="w-4 h-4" />
        <span>Lista de Precios</span>
      </Link>
    )
  }

  return (
    <Link
      href="/lista-precios"
      onClick={onNavigate}
      className="flex items-center justify-between px-4 py-4 rounded-xl transition-all active:scale-[0.98]
                 bg-zinc-900/60 text-zinc-300 hover:bg-zinc-800/60"
    >
      <div className="flex items-center gap-3">
        <Icons.PriceList className="w-5 h-5" />
        <div>
          <span className="font-bold text-base block">Lista de Precios</span>
          <span className="text-sm font-medium text-zinc-500 mt-0.5 block">
            Todos los productos y medidas
          </span>
        </div>
      </div>
      <Icons.ChevronRight className="w-5 h-5 text-zinc-500" />
    </Link>
  )
}

export default function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const closeMenu = useCallback(() => setIsMenuOpen(false), [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 10)
  }, [])

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => { handleScroll(); ticking = false })
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

  const headerClass = scrolled
    ? 'sticky top-0 z-50 transition-all duration-300 bg-zinc-950/95 backdrop-blur-xl shadow-lg shadow-black/30 border-b border-zinc-800/60'
    : 'sticky top-0 z-50 transition-all duration-300 bg-zinc-950 border-b border-zinc-800/30'

  return (
    <>
      <header className={headerClass}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-[72px] lg:h-[80px]">

            {/* LOGO */}
            <div className="flex items-center">
              <BrandLogo variant={isMobile ? 'mobile' : 'desktop'} />
              <OfficialBadge variant="desktop" />
            </div>

            {/* DESKTOP NAV */}
            <div className="hidden lg:flex items-center gap-0.5">
              <PriceListButton variant="desktop" />
              <DesktopInfoDropdown />
            </div>

            {/* DESKTOP CTA */}
            <div className="hidden lg:flex items-center">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-5 py-2.5
                           bg-gradient-to-r from-green-600 to-green-500
                           hover:from-green-500 hover:to-green-400
                           text-white font-bold text-sm rounded-xl
                           transition-all duration-200
                           shadow-lg shadow-green-500/20
                           hover:shadow-green-500/35 hover:scale-[1.03] active:scale-95"
              >
                <Icons.WhatsApp className="w-[18px] h-[18px]" />
                <span>Consultar ahora</span>
              </a>
            </div>

            {/* MOBILE ACTIONS */}
            <div className="flex lg:hidden items-center gap-2">
              <OfficialBadge variant="mobile" />
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center
                           bg-gradient-to-br from-green-600 to-green-500
                           rounded-xl shadow-md shadow-green-500/20 active:scale-95 transition-transform"
                aria-label="Consultar por WhatsApp"
              >
                <Icons.WhatsApp className="w-5 h-5 text-white" />
              </a>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-10 h-10 flex items-center justify-center rounded-xl
                           bg-zinc-800/80 border border-zinc-700/50
                           active:scale-95 transition-transform"
                aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen
                  ? <Icons.X className="w-5 h-5 text-white" />
                  : <Icons.Menu className="w-5 h-5 text-white" />
                }
              </button>
            </div>

          </div>
        </nav>
      </header>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <>
          <div
            onClick={closeMenu}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm lg:hidden z-[60]"
          />
          <div className="fixed inset-x-0 top-[72px] bottom-0 lg:hidden z-[70] bg-zinc-950 overflow-y-auto">
            <div className="px-4 py-5 space-y-3">

              <OfficialBadge variant="menu" />

              <PriceListButton variant="mobile" onNavigate={closeMenu} />

              <div className="border-t border-zinc-800/80" />

              <div className="space-y-1">
                {NAVIGATION_ITEMS.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMenu}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all active:scale-[0.98] ${
                        isActive
                          ? 'bg-zinc-800 text-white'
                          : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white'
                      }`}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span className="font-medium text-sm">{item.label}</span>
                      <Icons.ChevronRight className="w-4 h-4 ml-auto text-zinc-600" />
                    </Link>
                  )
                })}
              </div>

              <div className="border-t border-zinc-800/80" />

              <div className="grid grid-cols-3 gap-2">
                {[
                  { icon: '📍', label: 'Villa María' },
                  { icon: '🚚', label: 'Envío Gratis' },
                  { icon: '💳', label: '12 Cuotas' },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col items-center gap-1.5 py-3 bg-zinc-900/50 rounded-xl">
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-[10px] font-medium text-zinc-400 text-center">{item.label}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </>
      )}
    </>
  )
}