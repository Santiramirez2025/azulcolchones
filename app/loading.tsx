'use client'

import { useEffect, useState } from 'react'

// ============================================================================
// BRAND ICON - Idéntico al Header/Footer
// ============================================================================

const BrandIcon = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="loadingBrandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="50%" stopColor="#2563EB" />
        <stop offset="100%" stopColor="#1D4ED8" />
      </linearGradient>
      <linearGradient id="loadingMoonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#E0E7FF" />
      </linearGradient>
      <linearGradient id="loadingStarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FCD34D" />
        <stop offset="100%" stopColor="#FBBF24" />
      </linearGradient>
    </defs>
    
    <rect x="2" y="2" width="44" height="44" rx="12" fill="url(#loadingBrandGradient)" />
    
    <path 
      d="M28 12C28 19.732 21.732 26 14 26C12.783 26 11.604 25.847 10.48 25.56C12.63 30.51 17.52 34 23.2 34C30.827 34 37 27.732 37 20C37 14.32 33.51 9.43 28.56 7.28C28.847 8.404 29 9.583 29 10.8C29 11.21 28.98 11.61 28.94 12H28Z" 
      fill="url(#loadingMoonGradient)"
    />
    
    <path 
      d="M33 14L34.09 16.26L36.5 16.64L34.75 18.34L35.18 20.74L33 19.59L30.82 20.74L31.25 18.34L29.5 16.64L31.91 16.26L33 14Z" 
      fill="url(#loadingStarGradient)"
    />
    
    <path 
      d="M38 22L38.6 23.2L39.9 23.4L38.95 24.3L39.2 25.6L38 24.95L36.8 25.6L37.05 24.3L36.1 23.4L37.4 23.2L38 22Z" 
      fill="url(#loadingStarGradient)"
      opacity="0.7"
    />
  </svg>
)

// ============================================================================
// LOADING COMPONENT
// ============================================================================

export default function Loading() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev
        return prev + Math.random() * 15
      })
    }, 150)

    return () => clearInterval(interval)
  }, [])

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950"
      role="status"
      aria-live="polite"
      aria-label="Cargando contenido"
    >
      {/* Background subtle glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center px-4">
        
        {/* Logo con animación */}
        <div className="relative mb-8">
          {/* Glow effect */}
          <div className="absolute inset-0 blur-2xl opacity-40">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-blue-500 rounded-2xl" />
          </div>
          
          {/* Spinning ring */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className="w-24 h-24 md:w-28 md:h-28 border-2 border-blue-500/20 border-t-blue-500 rounded-full"
              style={{ animation: 'spin 1.5s linear infinite' }}
            />
          </div>
          
          {/* Icon */}
          <div className="relative p-2">
            <BrandIcon className="w-16 h-16 md:w-20 md:h-20" />
          </div>
        </div>

        {/* Brand name */}
        <div className="flex items-baseline gap-1 mb-2">
          <span className="text-2xl md:text-3xl font-black text-white">
            AZUL
          </span>
          <span className="text-2xl md:text-3xl font-light text-blue-400">
            colchones
          </span>
        </div>

        {/* Tagline */}
        <p className="text-sm text-zinc-500 mb-8">
          Villa María · Desde 1991
        </p>

        {/* Progress bar */}
        <div className="w-48 md:w-64 mb-4">
          <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Loading text */}
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <span 
              className="w-1.5 h-1.5 bg-blue-500 rounded-full"
              style={{ animation: 'bounce 1s ease-in-out infinite' }}
            />
            <span 
              className="w-1.5 h-1.5 bg-blue-400 rounded-full"
              style={{ animation: 'bounce 1s ease-in-out 0.1s infinite' }}
            />
            <span 
              className="w-1.5 h-1.5 bg-cyan-400 rounded-full"
              style={{ animation: 'bounce 1s ease-in-out 0.2s infinite' }}
            />
          </div>
          <span className="text-xs text-zinc-500">
            Cargando
          </span>
        </div>

        {/* Screen reader */}
        <span className="sr-only">
          Cargando Azul Colchones. Progreso: {Math.round(progress)}%. Por favor espere.
        </span>
      </div>
    </div>
  )
}