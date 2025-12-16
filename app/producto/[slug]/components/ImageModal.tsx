// app/producto/[slug]/components/ImageModal.tsx - ✅ FIX: SIN DOBLE CLICK
'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Maximize2, Grid3x3 } from 'lucide-react'
import Image from 'next/image'

interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  images: string[]
  currentIndex: number
  productName: string
}

export default function ImageModal({ 
  isOpen, 
  onClose, 
  images, 
  currentIndex, 
  productName 
}: ImageModalProps) {
  const [currentSlide, setCurrentSlide] = useState(currentIndex)
  const [showThumbnails, setShowThumbnails] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)
  
  // ✅ SWIPE STATE
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [touchStartY, setTouchStartY] = useState(0)
  const [touchEndY, setTouchEndY] = useState(0)

  const currentImage = images[currentSlide] || ''
  const totalImages = images.length

  // ============================================================================
  // ✅ CALLBACKS DE NAVEGACIÓN
  // ============================================================================
  const goToNext = useCallback(() => {
    if (currentSlide < totalImages - 1) {
      setCurrentSlide(prev => prev + 1)
      setIsZoomed(false)
    }
  }, [currentSlide, totalImages])

  const goToPrev = useCallback(() => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1)
      setIsZoomed(false)
    }
  }, [currentSlide])

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index)
    setShowThumbnails(false)
    setIsZoomed(false)
  }, [])

  // ============================================================================
  // ✅ SWIPE HANDLERS
  // ============================================================================
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
    setTouchStartY(e.targetTouches[0].clientY)
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
    setTouchEndY(e.targetTouches[0].clientY)
  }, [])

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return

    const distanceX = touchStart - touchEnd
    const distanceY = touchStartY - touchEndY
    const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY)
    
    // ✅ SWIPE HORIZONTAL (cambiar imagen)
    if (isHorizontalSwipe) {
      const isLeftSwipe = distanceX > 50
      const isRightSwipe = distanceX < -50

      if (isLeftSwipe && currentSlide < totalImages - 1) {
        goToNext()
      }
      if (isRightSwipe && currentSlide > 0) {
        goToPrev()
      }
    } 
    // ✅ SWIPE DOWN (cerrar modal)
    else {
      const isDownSwipe = distanceY < -100
      if (isDownSwipe) {
        onClose()
      }
    }

    setTouchStart(0)
    setTouchEnd(0)
    setTouchStartY(0)
    setTouchEndY(0)
  }, [touchStart, touchEnd, touchStartY, touchEndY, currentSlide, totalImages, goToNext, goToPrev, onClose])

  // ============================================================================
  // ✅ SINCRONIZAR con index externo cuando abre
  // ============================================================================
  useEffect(() => {
    if (isOpen) {
      setCurrentSlide(currentIndex)
      setIsZoomed(false)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen, currentIndex])

  // ============================================================================
  // ✅ KEYBOARD NAVIGATION
  // ============================================================================
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') goToNext()
      if (e.key === 'ArrowLeft') goToPrev()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, goToNext, goToPrev])

  // ============================================================================
  // ✅ FIX: HANDLER DE CIERRE CON STOP PROPAGATION
  // ============================================================================
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    // Solo cerrar si el click es exactamente en el backdrop
    if (e.target === e.currentTarget) {
      e.stopPropagation() // ✅ CRÍTICO: Detener propagación
      onClose()
    }
  }, [onClose])

  const handleCloseButton = useCallback((e: React.MouseEvent) => {
    e.stopPropagation() // ✅ CRÍTICO: Detener propagación
    onClose()
  }, [onClose])

  // ✅ EARLY RETURN después de todos los hooks
  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Galería de imágenes del producto"
          onClick={handleBackdropClick} // ✅ Click en el contenedor principal
        >
          {/* ✅ BACKDROP con blur - SIN onClick (delegado al padre) */}
          <motion.div 
            initial={{ backdropFilter: 'blur(0px)' }}
            animate={{ backdropFilter: 'blur(20px)' }}
            exit={{ backdropFilter: 'blur(0px)' }}
            className="absolute inset-0 bg-black/95 pointer-events-none" // ✅ pointer-events-none
            aria-hidden="true"
          />

          {/* ✅ CONTENEDOR PRINCIPAL - stopPropagation para evitar que cierre */}
          <div 
            className="relative w-full h-full max-w-7xl mx-auto p-4 md:p-6 lg:p-10 flex flex-col"
            onClick={(e) => e.stopPropagation()} // ✅ CRÍTICO: Detener clicks internos
          >
            
            {/* ✅ HEADER COMPACTO con controles */}
            <motion.header 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="relative z-20 flex items-center justify-between mb-4 md:mb-6"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-xl rounded-lg sm:rounded-xl border border-white/20">
                  <p className="text-white font-bold text-xs sm:text-sm md:text-base">
                    {currentSlide + 1} <span className="text-zinc-400 font-normal">/ {totalImages}</span>
                  </p>
                </div>
                
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="hidden md:block px-4 py-2 bg-violet-500/20 backdrop-blur-xl rounded-xl border border-violet-500/30"
                >
                  <p className="text-violet-300 font-semibold text-sm">
                    {productName}
                  </p>
                </motion.div>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2">
                {/* Botón de thumbnails */}
                {totalImages > 1 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation() // ✅ Detener propagación
                      setShowThumbnails(!showThumbnails)
                    }}
                    className={`p-2 sm:p-3 rounded-lg sm:rounded-xl backdrop-blur-xl border transition-all ${
                      showThumbnails 
                        ? 'bg-violet-500/30 border-violet-500/50' 
                        : 'bg-white/10 border-white/20 hover:bg-white/20'
                    }`}
                    aria-label={showThumbnails ? 'Ocultar miniaturas' : 'Mostrar miniaturas'}
                  >
                    <Grid3x3 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </motion.button>
                )}

                {/* Botón de cerrar */}
                <motion.button
                  whileHover={{ scale: 1.05, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCloseButton} // ✅ Handler con stopPropagation
                  className="p-2 sm:p-3 bg-red-500/20 hover:bg-red-500/30 rounded-lg sm:rounded-xl backdrop-blur-xl border border-red-500/30 transition-all"
                  aria-label="Cerrar galería"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                </motion.button>
              </div>
            </motion.header>

            {/* ✅ ÁREA PRINCIPAL DE IMAGEN con swipe */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="relative flex-1 bg-zinc-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="w-full h-full relative"
                >
                  <Image
                    src={currentImage}
                    alt={`${productName} - Vista ${currentSlide + 1} de ${totalImages}`}
                    fill
                    className="object-contain pointer-events-none" // ✅ pointer-events-none
                    sizes="100vw"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* ✅ CONTROLES DE NAVEGACIÓN flotantes */}
              {totalImages > 1 && (
                <>
                  <motion.button
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: currentSlide > 0 ? 1 : 0.3 }}
                    transition={{ delay: 0.2 }}
                    whileHover={currentSlide > 0 ? { scale: 1.1, x: -5 } : {}}
                    whileTap={currentSlide > 0 ? { scale: 0.9 } : {}}
                    onClick={(e) => {
                      e.stopPropagation() // ✅ Detener propagación
                      goToPrev()
                    }}
                    disabled={currentSlide === 0}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 md:p-4 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-xl border border-white/20 transition-all group z-10 disabled:cursor-not-allowed"
                    aria-label="Imagen anterior"
                  >
                    <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-violet-400 transition-colors" />
                  </motion.button>

                  <motion.button
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: currentSlide < totalImages - 1 ? 1 : 0.3 }}
                    transition={{ delay: 0.2 }}
                    whileHover={currentSlide < totalImages - 1 ? { scale: 1.1, x: 5 } : {}}
                    whileTap={currentSlide < totalImages - 1 ? { scale: 0.9 } : {}}
                    onClick={(e) => {
                      e.stopPropagation() // ✅ Detener propagación
                      goToNext()
                    }}
                    disabled={currentSlide === totalImages - 1}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 md:p-4 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-xl border border-white/20 transition-all group z-10 disabled:cursor-not-allowed"
                    aria-label="Siguiente imagen"
                  >
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-violet-400 transition-colors" />
                  </motion.button>
                </>
              )}

              {/* ✅ HINT DE NAVEGACIÓN */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 sm:px-4 py-1.5 sm:py-2 bg-black/50 backdrop-blur-xl rounded-full border border-white/10 pointer-events-none" // ✅ pointer-events-none
              >
                <p className="text-zinc-400 text-[10px] sm:text-xs font-medium text-center">
                  <span className="hidden sm:inline">← → para navegar • ESC para cerrar</span>
                  <span className="sm:hidden">👆 Deslizá → ← • ↓ para cerrar</span>
                </p>
              </motion.div>
            </motion.div>

            {/* ✅ PANEL DE THUMBNAILS expandible */}
            <AnimatePresence>
              {showThumbnails && totalImages > 1 && (
                <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 100, opacity: 0 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  className="relative z-20 mt-3 sm:mt-4 p-3 sm:p-4 bg-zinc-900/80 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/10"
                >
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-violet-400" />
                    <p className="text-white font-bold text-xs sm:text-sm">Todas las imágenes</p>
                  </div>
                  
                  <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 md:gap-3 max-h-32 overflow-y-auto custom-scrollbar">
                    {images.map((img, index) => (
                      <motion.button
                        key={`thumbnail-${index}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation() // ✅ Detener propagación
                          goToSlide(index)
                        }}
                        className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                          currentSlide === index
                            ? 'border-violet-500 ring-2 ring-violet-500/50'
                            : 'border-white/20 hover:border-white/40'
                        }`}
                        aria-label={`Ver imagen ${index + 1}`}
                        aria-current={currentSlide === index ? 'true' : 'false'}
                      >
                        <Image
                          src={img}
                          alt={`Miniatura ${index + 1}`}
                          fill
                          className="object-cover pointer-events-none" // ✅ pointer-events-none
                          sizes="80px"
                        />
                        {currentSlide === index && (
                          <motion.div
                            layoutId="thumbnail-highlight"
                            className="absolute inset-0 bg-violet-500/20 pointer-events-none" // ✅ pointer-events-none
                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                          />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ✅ ESTILOS para scrollbar personalizado */}
          <style jsx global>{`
            .custom-scrollbar::-webkit-scrollbar {
              width: 6px;
              height: 6px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: rgba(255, 255, 255, 0.05);
              border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: rgba(139, 92, 246, 0.5);
              border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: rgba(139, 92, 246, 0.7);
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  )
}