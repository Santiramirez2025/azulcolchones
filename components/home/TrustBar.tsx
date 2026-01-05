'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Truck, Shield, CreditCard } from 'lucide-react'
import Link from 'next/link'

/**
 * TrustBar Component - MINIMAL & COHERENT
 * 
 * Barra de confianza ultra-simple:
 * - Solo 3 beneficios principales
 * - Coherente con Header minimalista
 * - Sin animaciones complejas
 * - Mobile-first responsive
 */

// ============================================================================
// CONFIG - COHERENTE CON HEADER/HERO
// ============================================================================

const TRUST_ITEMS = [
  {
    icon: Truck,
    text: 'Envío Gratis',
    highlight: 'Villa María',
  },
  {
    icon: CreditCard,
    text: '12 Cuotas',
    highlight: 'Sin Interés',
  },
  {
    icon: Shield,
    text: 'Garantía',
    highlight: '5 años',
  },
] as const

// ============================================================================
// COMPONENT
// ============================================================================

export function TrustBar() {
  const [isVisible, setIsVisible] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const lastScrollRef = useRef(0)
  const ticking = useRef(false)

  // Detectar mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Scroll handler optimizado - hide on scroll down
  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(() => {
        const currentScroll = window.scrollY
        const lastScroll = lastScrollRef.current

        // Show when scrolling up or near top
        if (currentScroll < lastScroll || currentScroll < 100) {
          setIsVisible(true)
        } 
        // Hide when scrolling down past threshold
        else if (currentScroll > lastScroll && currentScroll > 100) {
          setIsVisible(false)
        }

        lastScrollRef.current = currentScroll
        ticking.current = false
      })

      ticking.current = true
    }
  }, [])

  useEffect(() => {
    // Solo aplicar hide/show en desktop
    if (isMobile) {
      setIsVisible(true)
      return
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll, isMobile])

  return (
    <>
      {/* SEO - Schema.org LocalBusiness */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'Azul Colchones Villa María',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Balerdi 855',
              addressLocality: 'Villa María',
              addressRegion: 'Córdoba',
              postalCode: '5900',
              addressCountry: 'AR'
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              reviewCount: '850',
              bestRating: '5'
            },
            priceRange: '$$',
            url: 'https://azulcolchones.com',
          })
        }}
      />

      {/* Trust Bar */}
      <aside
        className={`fixed bottom-0 left-0 right-0 z-40 transition-all duration-300 ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
        role="complementary"
        aria-label="Beneficios de compra"
      >
        {/* Background - COHERENTE CON HEADER (emerald) */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-2xl">
          
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-14 md:h-16 gap-3">
              
              {/* Trust Items - MINIMALISTA */}
              <div className="flex items-center gap-4 md:gap-8 flex-1 justify-center md:justify-start">
                {TRUST_ITEMS.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <div 
                      key={index}
                      className="flex items-center gap-2"
                    >
                      <Icon className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0 text-cyan-100" aria-hidden="true" />
                      <div className="flex flex-col leading-tight">
                        <span className="text-xs md:text-sm font-bold">
                          {item.text}
                        </span>
                        <span className="text-[10px] md:text-xs text-cyan-100 font-medium hidden sm:block">
                          {item.highlight}
                        </span>
                      </div>
                      
                      {/* Divider - Desktop only */}
                      {index < TRUST_ITEMS.length - 1 && (
                        <div className="hidden md:block h-8 w-px bg-white/20 ml-4" aria-hidden="true" />
                      )}
                    </div>
                  )
                })}
              </div>

              {/* CTA - COHERENTE CON HEADER */}
              <Link 
                href="/catalogo"
                className="hidden md:flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg font-bold text-sm transition-all border border-white/20 hover:border-white/30"
              >
                <span>Ver Stock</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Shadow superior - Sutil */}
        <div 
          className="absolute inset-x-0 bottom-full h-4 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"
          aria-hidden="true"
        />
      </aside>
    </>
  )
}