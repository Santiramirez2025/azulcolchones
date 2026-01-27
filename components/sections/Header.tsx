'use client'

import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'

// ============================================================================
// ICONOS SVG
// ============================================================================

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
  Moon: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M21.64 13a1 1 0 00-1.05-.14 8.05 8.05 0 01-3.37.73 8.15 8.15 0 01-8.14-8.1 8.59 8.59 0 01.25-2A1 1 0 008 2.36a10.14 10.14 0 1014 11.69 1 1 0 00-.36-1.05z" />
    </svg>
  ),
  ChevronRight: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  ),
}

// ============================================================================
// CONFIG
// ============================================================================

const CONFIG = {
  whatsapp: '5493534096566',
  whatsappMessage: 'Hola! Quiero consultar por colchones',
  brand: 'Azul Colchones',
  location: 'Villa María',
} as const

// ============================================================================
// NAV ITEMS
// ============================================================================

const navItems = [
  { 
    href: '/catalogo', 
    label: 'Stock Inmediato',
    sublabel: 'Entrega hoy',
    highlight: true,
  },
  { 
    href: '/piero-fabrica', 
    label: 'Piero Fábrica',
    sublabel: 'Hasta 22% OFF',
    highlight: false,
  },
]

// ============================================================================
// HEADER COMPONENT
// ============================================================================

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

  // Clases condicionales
  const headerClass = scrolled 
    ? 'sticky top-0 z-50 transition-all duration-300 bg-zinc-950/98 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-zinc-800/50' 
    : 'sticky top-0 z-50 transition-all duration-300 bg-zinc-950 border-b border-zinc-800/30'

  return (
    <>
      {/* HEADER */}
      <header className={headerClass}>
        <nav className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-18">
            
            {/* LOGO */}
            <Link href="/" className="flex-shrink-0 group">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-shadow">
                  <Icons.Moon className="w-5 h-5 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-base lg:text-lg font-black leading-none text-white">
                    Azul<span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">Colchones</span>
                  </span>
                  <span className="text-[9px] font-semibold text-zinc-500 uppercase tracking-wider">
                    {CONFIG.location}
                  </span>
                </div>
              </div>
            </Link>

            {/* DESKTOP NAV */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                const linkClass = isActive 
                  ? 'relative px-4 py-2 rounded-lg font-medium text-sm transition-all text-white bg-zinc-800' 
                  : 'relative px-4 py-2 rounded-lg font-medium text-sm transition-all text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                const sublabelClass = item.highlight ? 'ml-1.5 text-xs font-semibold text-blue-400' : 'ml-1.5 text-xs font-semibold text-green-400'
                
                return (
                  <Link key={item.href} href={item.href} className={linkClass}>
                    <span>{item.label}</span>
                    {item.sublabel && (
                      <span className={sublabelClass}>{item.sublabel}</span>
                    )}
                  </Link>
                )
              })}
            </div>

            {/* DESKTOP CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-500 text-white font-bold text-sm rounded-xl transition-all duration-200 shadow-lg shadow-green-500/25 hover:shadow-green-500/40 hover:scale-105 active:scale-95"
              >
                <Icons.WhatsApp className="w-4 h-4" />
                <span>Consultar</span>
              </a>
            </div>

            {/* MOBILE: CTA + MENU */}
            <div className="flex lg:hidden items-center gap-2">
              
              {/* WhatsApp Mini */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-green-600 hover:bg-green-500 rounded-xl transition-all shadow-lg shadow-green-500/25 active:scale-95"
                aria-label="Consultar por WhatsApp"
              >
                <Icons.WhatsApp className="w-5 h-5 text-white" />
              </a>

              {/* Menu Button */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-zinc-800 border border-zinc-700 active:scale-95 transition-transform"
                aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? (
                  <Icons.X className="w-5 h-5 text-white" />
                ) : (
                  <Icons.Menu className="w-5 h-5 text-white" />
                )}
              </button>
            </div>

          </div>
        </nav>
      </header>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <>
          {/* Overlay */}
          <div 
            onClick={() => setIsMenuOpen(false)} 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm lg:hidden z-[60] animate-fadeIn"
          />

          {/* Menu Panel */}
          <div className="fixed inset-x-0 top-16 lg:hidden z-[70] bg-zinc-950 border-b border-zinc-800 shadow-xl animate-slideDown">
            <div className="max-w-7xl mx-auto px-4 py-4">
              
              {/* Nav Links */}
              <div className="space-y-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href
                  const linkClass = isActive 
                    ? 'flex items-center justify-between px-4 py-4 rounded-xl transition-all active:scale-[0.98] bg-zinc-800 text-white' 
                    : 'flex items-center justify-between px-4 py-4 rounded-xl transition-all active:scale-[0.98] bg-zinc-900/50 text-zinc-300 hover:bg-zinc-800/50'
                  const sublabelClass = item.highlight ? 'block text-sm font-medium mt-0.5 text-blue-400' : 'block text-sm font-medium mt-0.5 text-green-400'
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={linkClass}
                    >
                      <div>
                        <span className="font-bold text-base">{item.label}</span>
                        {item.sublabel && (
                          <span className={sublabelClass}>{item.sublabel}</span>
                        )}
                      </div>
                      <Icons.ChevronRight className="w-5 h-5 text-zinc-500" />
                    </Link>
                  )
                })}
              </div>

              {/* Divider */}
              <div className="border-t border-zinc-800 my-4" />

              {/* Info rápida */}
              <div className="flex items-center justify-center gap-4 text-xs text-zinc-500 py-2">
                <span>📍 Villa María</span>
                <span>•</span>
                <span>🚚 Envío gratis</span>
                <span>•</span>
                <span>💳 12 cuotas</span>
              </div>

            </div>
          </div>
        </>
      )}

      {/* ANIMATIONS */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
        .animate-slideDown { animation: slideDown 0.25s ease-out; }
        
        @media (prefers-reduced-motion: reduce) {
          .animate-fadeIn, .animate-slideDown { animation: none !important; }
        }
      `}</style>
    </>
  )
}