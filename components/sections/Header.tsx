'use client'

import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'

// ============================================================================
// ICONOS SVG INLINE - SOLO LOS ESENCIALES
// ============================================================================

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
  Instagram: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  ),
  Zap: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" />
    </svg>
  ),
  Clock: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Moon: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21.64 13a1 1 0 00-1.05-.14 8.05 8.05 0 01-3.37.73 8.15 8.15 0 01-8.14-8.1 8.59 8.59 0 01.25-2A1 1 0 008 2.36a10.14 10.14 0 1014 11.69 1 1 0 00-.36-1.05z" />
    </svg>
  ),
}

// ============================================================================
// CONFIG
// ============================================================================

const SITE_CONFIG = {
  whatsappNumber: '5493534096566',
  brandName: 'Azul Colchones',
  location: 'Villa María',
} as const

// ============================================================================
// HEADER COMPONENT - ULTRA MINIMALISTA
// ============================================================================

export default function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Scroll handler optimizado
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

  // Body scroll lock para menú móvil
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [isMenuOpen])

  // Early return para admin
  if (pathname?.startsWith('/admin')) return null

  return (
    <>
      {/* ================================================================ */}
      {/* TOP BAR - SIMPLE - WHATSAPP + INSTAGRAM */}
      {/* ================================================================ */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-500">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-6 py-2">
            <a 
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hola! Quiero consultar por colchones')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white font-semibold text-sm hover:text-emerald-50 transition-colors"
            >
              <Icons.WhatsApp className="w-4 h-4" />
              <span className="hidden xs:inline">Consultá por WhatsApp</span>
              <span className="xs:hidden">WhatsApp</span>
            </a>
            
            <div className="w-px h-4 bg-emerald-400/30" aria-hidden="true" />
            
            <a 
              href="https://www.instagram.com/azulcolchones1991/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white font-semibold text-sm hover:text-emerald-50 transition-colors"
            >
              <Icons.Instagram className="w-4 h-4" />
              <span className="hidden sm:inline">Seguinos en Instagram</span>
              <span className="sm:hidden">Instagram</span>
            </a>
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* HEADER PRINCIPAL - MINIMALISTA */}
      {/* ================================================================ */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-zinc-950/98 backdrop-blur-xl shadow-xl border-b border-zinc-800' 
          : 'bg-zinc-950 border-b border-zinc-900'
      }`}>
        <nav className="container mx-auto px-4" aria-label="Principal">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* ========== LOGO ========== */}
            <Link href="/" className="flex-shrink-0 group" aria-label="Ir a inicio">
              <div className="flex items-center gap-2.5">
                {/* Icon */}
                <div className="relative">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all">
                    <Icons.Moon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                  </div>
                </div>
                
                {/* Text */}
                <div className="flex flex-col">
                  <div className="text-lg lg:text-xl font-black leading-none">
                    <span className="text-white">Azul</span>
                    <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">Colchones</span>
                  </div>
                  <div className="text-[9px] lg:text-[10px] font-bold text-zinc-500 uppercase tracking-wider mt-0.5">
                    {SITE_CONFIG.location}
                  </div>
                </div>
              </div>
            </Link>

            {/* ========== DESKTOP NAV - 2 BOTONES PRINCIPALES ========== */}
            <div className="hidden lg:flex items-center gap-4">
              
              {/* Opción 1: Entrega Inmediata */}
              <Link 
                href="/catalogo"
                className="group relative px-6 py-3.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-xl font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:scale-105 active:scale-95"
              >
                <div className="flex items-center gap-2.5">
                  <Icons.Zap className="w-5 h-5" />
                  <div className="flex flex-col items-start">
                    <span className="text-sm leading-none">Entrega Inmediata</span>
                    <span className="text-xs text-blue-100 font-normal mt-0.5">Hasta 20% OFF</span>
                  </div>
                </div>
                
                {/* Badge HOT */}
                <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-[9px] font-black rounded-full uppercase shadow-lg animate-pulse">
                  HOT
                </span>
              </Link>

              {/* Opción 2: Entrega 7 días */}
              <Link 
                href="/piero-fabrica"
                className="group px-6 py-3.5 bg-zinc-800/80 hover:bg-zinc-700 border-2 border-zinc-700 hover:border-zinc-600 rounded-xl font-bold text-white transition-all hover:scale-105 active:scale-95"
              >
                <div className="flex items-center gap-2.5">
                  <Icons.Clock className="w-5 h-5 text-orange-400" />
                  <div className="flex flex-col items-start">
                    <span className="text-sm leading-none">Entrega 7 días</span>
                    <span className="text-xs text-zinc-400 font-normal mt-0.5">Mejor precio</span>
                  </div>
                </div>
              </Link>
            </div>

            {/* ========== MOBILE MENU BUTTON ========== */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-zinc-800/80 border border-zinc-700 active:scale-95 transition-transform" 
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
        </nav>
      </header>

      {/* ================================================================ */}
      {/* MOBILE MENU - ULTRA SIMPLE */}
      {/* ================================================================ */}
      {isMenuOpen && (
        <>
          {/* Overlay */}
          <div 
            onClick={() => setIsMenuOpen(false)} 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm lg:hidden z-[60] animate-fade-in"
            aria-hidden="true"
          />

          {/* Menu Panel */}
          <div className="fixed inset-x-0 top-[120px] bottom-0 lg:hidden z-[70] bg-zinc-950 animate-slide-up overflow-y-auto">
            <div className="container mx-auto px-4 py-6 space-y-4">
              
              {/* Título */}
              <div className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-4">
                Elegí tu opción
              </div>

              {/* Opción 1: Entrega Inmediata */}
              <Link 
                href="/catalogo"
                onClick={() => setIsMenuOpen(false)}
                className="group block relative p-5 bg-gradient-to-br from-blue-600 to-blue-500 rounded-2xl shadow-xl active:scale-98 transition-transform"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <Icons.Zap className="w-6 h-6 text-white" />
                  </div>
                  <span className="px-2.5 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-[10px] font-black rounded-full uppercase shadow-lg">
                    HOT
                  </span>
                </div>
                
                <h3 className="text-xl font-black text-white mb-1">
                  Entrega Inmediata
                </h3>
                <p className="text-sm text-blue-100 font-medium mb-3">
                  Stock disponible • Te lo llevás hoy
                </p>
                
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-white">Hasta 20% OFF</span>
                </div>
              </Link>

              {/* Opción 2: Entrega 7 días */}
              <Link 
                href="/piero-fabrica"
                onClick={() => setIsMenuOpen(false)}
                className="group block p-5 bg-zinc-900 border-2 border-zinc-800 rounded-2xl active:scale-98 transition-transform"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                    <Icons.Clock className="w-6 h-6 text-orange-400" />
                  </div>
                </div>
                
                <h3 className="text-xl font-black text-white mb-1">
                  Entrega 7 días
                </h3>
                <p className="text-sm text-zinc-400 font-medium mb-3">
                  Directo de fábrica • Mejor precio
                </p>
                
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-orange-400">30-40% OFF</span>
                </div>
              </Link>

              {/* Divider */}
              <div className="border-t border-zinc-800 my-6" />

              {/* WhatsApp CTA */}
              <a 
                href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hola! Quiero consultar por colchones')}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-4 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-bold text-white shadow-lg active:scale-98 transition-all"
              >
                <Icons.WhatsApp className="w-5 h-5" />
                <span>Consultar por WhatsApp</span>
              </a>

              {/* Instagram CTA */}
              <a 
                href="https://www.instagram.com/azulcolchones1991/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 rounded-xl font-bold text-white shadow-lg active:scale-98 transition-all"
              >
                <Icons.Instagram className="w-5 h-5" />
                <span>Seguinos en Instagram</span>
              </a>

              {/* Info adicional */}
              <div className="text-center pt-4">
                <p className="text-xs text-zinc-500">
                  Envío gratis • 12 cuotas sin interés
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ================================================================ */}
      {/* STYLES */}
      {/* ================================================================ */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in { animation: fade-in 0.2s ease-out; }
        .animate-slide-up { animation: slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
        
        .active\\:scale-98:active { transform: scale(0.98); }
        .active\\:scale-95:active { transform: scale(0.95); }

        @media (min-width: 375px) {
          .xs\\:inline { display: inline; }
          .xs\\:hidden { display: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in,
          .animate-slide-up,
          .animate-pulse { animation: none !important; }
        }
      `}</style>
    </>
  )
}