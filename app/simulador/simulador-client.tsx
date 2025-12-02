// app/simulador/simulador-client.tsx - CORREGIDO CON COMA
'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { 
  ArrowLeft, ArrowRight, Check, Sparkles, Brain, 
  Shield, Truck, Star, Award, CreditCard, MapPin
} from 'lucide-react'
import { getTopRecommendations } from '@/lib/matching-algorithm'
import { SIMULATOR_STEPS } from './simulator-config'
import { formatARS } from '@/lib/utils/currency'
import { getMejorCuota, calcularTodasLasCuotas } from '@/lib/utils/pricing'

interface SimulatorClientProps {
  products: any[]
}

interface SimulatorData {
  position: string
  weight: string
  firmness: string
  budget: string
  size: string
}

export default function SimuladorClient({ products }: SimulatorClientProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [data, setData] = useState<SimulatorData>({
    position: '',
    weight: '',
    firmness: '',
    budget: '',
    size: '' // ⬅️ COMA AGREGADA EN LÍNEA 35
  })
  const [showResults, setShowResults] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [recommendations, setRecommendations] = useState<any[]>([])
  
  const questionRef = useRef<HTMLDivElement>(null)

  // ✅ FILTRAR COLCHONES PIERO Y NATURAL SOFT (ADULTOS)
  const mattressProducts = useMemo(() => {
    console.log('🔍 [SimuladorClient] Starting product filter')
    console.log('📦 [SimuladorClient] Total products received:', products?.length || 0)
    
    if (!products || !Array.isArray(products)) {
      console.error('❌ [SimuladorClient] Invalid products array')
      return []
    }
    
    const filtered = products.filter(product => {
      const name = (product.name || '').toLowerCase()
      const category = (product.category || '').toLowerCase()
      const slug = (product.slug || '').toLowerCase()
      
      // ❌ EXCLUIR EXPLÍCITAMENTE (accesorios y productos no-colchón)
      const excludeKeywords = [
        'cuna', 'bebe', 'bebé', 'baby', 'infantil', 'niño', 'niña', 'kid', 'mickey',
        'almohada', 'pillow', 'protector', 'sabana', 'sábana', 'sheet', 'cover', 'cubre',
        'topper', 'base', 'sommier', 'box', 'accesorio', 'outlet',
        'funda', 'colcha', 'edredón', 'cobertor', 'respaldo', 'mesa', 'juego'
      ]
      
      const hasExcludedKeyword = excludeKeywords.some(keyword => 
        name.includes(keyword) || category.includes(keyword) || slug.includes(keyword)
      )
      
      if (hasExcludedKeyword) {
        console.log('❌ [SimuladorClient] EXCLUDED (accessory/non-mattress):', product.name)
        return false
      }
      
      // ✅ DEBE SER COLCHÓN (altura > 15cm si está definida)
      const height = product.height || 0
      if (height > 0 && height <= 15) {
        console.log('❌ [SimuladorClient] EXCLUDED (too thin):', product.name, '| Height:', height, 'cm')
        return false
      }
      
      // ✅ DEBE CONTENER PALABRA CLAVE DE COLCHÓN O MODELO CONOCIDO
      const hasCorrectKeyword = 
        name.includes('colchón') || 
        name.includes('colchon') ||
        name.includes('mattress') ||
        name.includes('matress') ||
        // Modelos Piero comunes
        name.includes('sonno') ||
        name.includes('meditare') ||
        name.includes('foam') ||
        name.includes('gravita') ||
        name.includes('nirvana') ||
        name.includes('namaste') ||
        name.includes('montreux') ||
        name.includes('regno') ||
        name.includes('spring') ||
        // Modelos Natural Soft (NS)
        /\bns[a-z]+\d+/.test(name) || // NSCONFORT, NSVIRTUS, NSRELAX
        /\bns\s/.test(name) || // NS seguido de espacio
        slug.includes('-ns') ||
        slug.startsWith('ns') ||
        // Modelos con códigos
        /relax\d+/.test(name) ||
        /virtus\d+/.test(name) ||
        /confort\d+/.test(name) ||
        /confobox/.test(name) ||
        /funcional/.test(name)
      
      if (!hasCorrectKeyword) {
        console.log('❌ [SimuladorClient] EXCLUDED (no mattress keyword):', product.name)
        return false
      }
      
      // ✅ DEBE ESTAR EN STOCK
      if (product.inStock === false) {
        console.log('❌ [SimuladorClient] EXCLUDED (out of stock):', product.name)
        return false
      }
      
      console.log('✅ [SimuladorClient] INCLUDED:', product.name, '| Height:', height, 'cm | Price:', product.price)
      return true
    })
    
    console.log('📊 [SimuladorClient] Filter results:')
    console.log('  - Total input:', products.length)
    console.log('  - Valid mattresses:', filtered.length)
    console.log('  - Product names:', filtered.map(p => p.name))
    
    return filtered
  }, [products])

  // Auto-scroll suave
  useEffect(() => {
    if (questionRef.current && !showResults && !isAnalyzing) {
      setTimeout(() => {
        questionRef.current?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'center'
        })
      }, 100)
    }
  }, [currentStep, showResults, isAnalyzing])

  // Validación de productos
  if (!mattressProducts || mattressProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center shadow-2xl shadow-red-500/50">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
            No hay colchones disponibles
          </h2>
          <p className="text-zinc-400 text-base mb-4">
            No se encontraron colchones en stock para recomendar
          </p>
          <Link
            href="/catalogo"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors"
          >
            Ver catálogo completo
          </Link>
        </div>
      </div>
    )
  }

  const handleSelect = (value: string) => {
    const key = SIMULATOR_STEPS[currentStep].key
    const newData = { ...data, [key]: value }
    setData(newData)

    console.log('✅ [SimuladorClient] Selected:', key, '=', value)
    console.log('📊 [SimuladorClient] Current data:', newData)
    
    if (currentStep < SIMULATOR_STEPS.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 400)
    } else {
      console.log('🎯 [SimuladorClient] Final step - generating recommendations')
      console.log('👤 [SimuladorClient] Profile:', newData)
      console.log('🛏️ [SimuladorClient] Mattresses to analyze:', mattressProducts.length)
      
      setIsAnalyzing(true)
      
      setTimeout(() => {
        try {
          console.log('🔄 [SimuladorClient] Calling getTopRecommendations...')
          const topProducts = getTopRecommendations(mattressProducts, newData, 3)
          
          console.log('✅ [SimuladorClient] Recommendations received:', topProducts.length)
          
          if (!topProducts || topProducts.length === 0) {
            console.warn('⚠️ [SimuladorClient] No recommendations, using fallback')
            const fallbackRecs = mattressProducts.slice(0, 3).map((p, i) => ({
              ...p,
              matchScore: 90 - i * 5,
              matchPercentage: 96 - i * 2,
              matchReasons: [
                'Excelente calidad garantizada',
                'Garantía de 5 años',
                'Alta satisfacción de clientes',
                'Envío gratis Villa María'
              ]
            }))
            setRecommendations(fallbackRecs)
          } else {
            console.log('🎉 [SimuladorClient] Setting recommendations:', topProducts)
            setRecommendations(topProducts)
          }
        } catch (error) {
          console.error('❌ [SimuladorClient] Error generating recommendations:', error)
          const fallbackRecs = mattressProducts.slice(0, 3).map((p, i) => ({
            ...p,
            matchScore: 90 - i * 5,
            matchPercentage: 96 - i * 2,
            matchReasons: [
              'Excelente calidad garantizada',
              'Garantía de 5 años',
              'Alta satisfacción de clientes'
            ]
          }))
          setRecommendations(fallbackRecs)
        }
        
        setIsAnalyzing(false)
        setShowResults(true)
      }, 2500)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setShowResults(false)
    }
  }

  const handleRestart = () => {
    setCurrentStep(0)
    setShowResults(false)
    setIsAnalyzing(false)
    setData({ 
      position: '', 
      weight: '', 
      firmness: '', 
      budget: '',
      size: ''
    })
    setRecommendations([])
    console.log('🔄 [SimuladorClient] Test restarted')
  }

  const progress = ((currentStep + 1) / SIMULATOR_STEPS.length) * 100

  if (isAnalyzing) {
    return <AnalyzingScreen />
  }

  if (showResults && recommendations.length > 0) {
    return (
      <ResultsScreen
        recommendations={recommendations}
        onRestart={handleRestart}
      />
    )
  }

  return (
    <QuestionsScreen
      currentStep={currentStep}
      progress={progress}
      data={data}
      onSelect={handleSelect}
      onBack={handleBack}
      questionRef={questionRef}
    />
  )
}

// ============================================================================
// ANALYZING SCREEN
// ============================================================================
function AnalyzingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center px-4 py-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 md:left-20 w-64 md:w-96 h-64 md:h-96 bg-blue-500 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-10 md:right-20 w-64 md:w-96 h-64 md:h-96 bg-cyan-500 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center z-10 max-w-lg mx-auto"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 md:mb-8"
        >
          <Brain className="w-full h-full text-cyan-400 drop-shadow-2xl" />
        </motion.div>
        
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 md:mb-8 leading-tight">
          Analizando con IA
        </h2>
        
        <div className="space-y-3 md:space-y-4 mb-8">
          {[
            { text: 'Procesando tu perfil de sueño', delay: 0.3 },
            { text: 'Calculando compatibilidad', delay: 0.8 },
            { text: 'Seleccionando tu match perfecto', delay: 1.3 }
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: step.delay }}
              className="flex items-center justify-center gap-3 text-cyan-300 text-base md:text-lg"
            >
              <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <span>{step.text}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          className="h-2 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-400 rounded-full max-w-md mx-auto shadow-lg shadow-blue-500/50"
        />
      </motion.div>
    </div>
  )
}

// ============================================================================
// RESULTS SCREEN
// ============================================================================
function ResultsScreen({ recommendations, onRestart }: any) {
  const topMatch = recommendations[0]
  
  const mejorCuota = useMemo(() => getMejorCuota(topMatch.price), [topMatch.price])
  const todasLasCuotas = useMemo(() => calcularTodasLasCuotas(topMatch.price), [topMatch.price])

  const getDisplayFeatures = (product: any): string[] => {
    if (product.matchReasons?.length > 0) {
      return product.matchReasons.slice(0, 4)
    }
    if (product.features?.length > 0) {
      return product.features.slice(0, 4)
    }
    if (product.highlights?.length > 0) {
      return product.highlights.slice(0, 4)
    }
    
    const fallback = []
    if (product.warranty >= 5) fallback.push(`${product.warranty} años de garantía`)
    if (product.cooling) fallback.push('Sistema de refrigeración avanzado')
    if (product.hypoallergenic) fallback.push('Materiales hipoalergénicos certificados')
    if (product.isEco) fallback.push('Certificación ecológica')
    
    return fallback.length > 0 ? fallback : [
      'Excelente relación calidad-precio',
      'Materiales premium certificados',
      'Soporte ergonómico óptimo',
      'Diseñado para tu máximo confort'
    ]
  }

  const getProductImage = (product: any): string => {
    if (Array.isArray(product.images) && product.images[0]) return product.images[0]
    return '/placeholder-mattress.jpg'
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 py-8 md:py-12 px-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-72 md:w-96 h-72 md:h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-72 md:w-96 h-72 md:h-96 bg-cyan-500 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl md:rounded-3xl mb-4 md:mb-6 shadow-2xl shadow-emerald-500/50"
          >
            <Check className="w-8 h-8 md:w-10 md:h-10 text-white" />
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-3 md:mb-4 leading-tight px-4">
            ¡Tu match perfecto!
          </h2>
          <p className="text-lg md:text-xl text-zinc-300">
            Compatibilidad del{' '}
            <span className="text-cyan-400 font-black text-2xl md:text-3xl">
              {topMatch.matchPercentage || 95}%
            </span>
            {' '}basado en IA
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-zinc-900 to-zinc-950 backdrop-blur-xl border border-blue-500/20 rounded-2xl md:rounded-3xl p-6 md:p-10 mb-6 md:mb-8 relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl" />
          
          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold mb-4 md:mb-6 shadow-lg">
              <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
              MEJOR MATCH
            </div>

            <div className="relative w-full aspect-[4/3] md:aspect-[16/9] rounded-xl md:rounded-2xl overflow-hidden mb-6 bg-white/5 border border-blue-500/20">
              <Image
                src={getProductImage(topMatch)}
                alt={topMatch.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              
              <div className="absolute top-3 left-3">
                <div className="bg-emerald-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs md:text-sm font-bold flex items-center gap-1 shadow-lg">
                  <CreditCard className="w-3 h-3 md:w-4 md:h-4" />
                  Hasta 12 cuotas
                </div>
              </div>
            </div>

            <div className="space-y-4 md:space-y-6">
              <div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 md:mb-4 leading-tight">
                  {topMatch.name}
                </h3>
                
                <div className="flex items-center gap-2 md:gap-3 mb-4">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="w-4 h-4 md:w-5 md:h-5 fill-amber-400 text-amber-400" 
                      />
                    ))}
                  </div>
                  <span className="text-white font-bold text-base md:text-lg">
                    {(topMatch.rating || 4.8).toFixed(1)}
                  </span>
                  <span className="text-zinc-400 text-sm md:text-base">
                    ({topMatch.reviewCount || 0} opiniones)
                  </span>
                </div>

                <div className="inline-block bg-blue-500/20 border border-blue-500/30 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-blue-300 font-semibold text-sm md:text-base mb-4 md:mb-6">
                  Firmeza: {topMatch.firmness || 'Media'}
                </div>

                <div className="space-y-3 mb-6 md:mb-8">
                  <div className="flex items-baseline gap-2 md:gap-3 flex-wrap">
                    <span className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      {formatARS(topMatch.price)}
                    </span>
                    {topMatch.originalPrice && topMatch.originalPrice > topMatch.price && (
                      <>
                        <span className="text-xl md:text-2xl text-zinc-500 line-through">
                          {formatARS(topMatch.originalPrice)}
                        </span>
                        <span className="px-2 py-1 md:px-3 md:py-1 bg-emerald-500 text-white rounded-full text-xs md:text-sm font-bold">
                          -{Math.round((1 - topMatch.price / topMatch.originalPrice) * 100)}%
                        </span>
                      </>
                    )}
                  </div>
                  
                  <div className="inline-block bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 px-4 py-2 rounded-xl font-bold text-sm md:text-base">
                    {mejorCuota.cuotas}x {mejorCuota.formatted.precioCuota} sin recargo
                  </div>
                  
                  <div className="flex flex-wrap gap-2 text-xs md:text-sm text-zinc-400">
                    {todasLasCuotas.slice(1, 4).map((cuota) => (
                      <span key={cuota.cuotas}>
                        {cuota.cuotas}x {cuota.formatted.precioCuota} <span className="text-orange-400">({cuota.recargoPercentage})</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2.5 md:space-y-3">
                {getDisplayFeatures(topMatch).map((feature: string, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-start gap-3 bg-white/5 border border-blue-500/20 rounded-xl md:rounded-2xl p-3 md:p-4"
                  >
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </div>
                    <span className="text-white font-medium text-sm md:text-base leading-relaxed">
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 mb-6 md:mb-8">
          {[
            { icon: Shield, title: '5 Años Garantía', desc: 'Piero Argentina' },
            { icon: Truck, title: 'Envío Gratis', desc: 'Villa María' },
            { icon: Award, title: '100 Noches', desc: 'Prueba en casa' }
          ].map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              className="bg-gradient-to-br from-zinc-900 to-zinc-950 backdrop-blur-xl border border-blue-500/20 rounded-xl md:rounded-2xl p-4 md:p-6 text-center hover:bg-blue-500/5 transition-all"
            >
              <div className="w-10 h-10 md:w-14 md:h-14 mx-auto mb-2 md:mb-4 rounded-lg md:rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <benefit.icon className="w-5 h-5 md:w-7 md:h-7 text-white" />
              </div>
              <h4 className="text-white font-bold text-sm md:text-lg mb-1">
                {benefit.title}
              </h4>
              <p className="text-zinc-400 text-xs md:text-sm">
                {benefit.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col gap-3 md:gap-4"
        >
          <Link
            href={`/producto/${topMatch.slug}`}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white px-6 md:px-8 py-4 md:py-5 rounded-xl md:rounded-2xl font-bold text-base md:text-lg shadow-2xl shadow-blue-500/30 transition-all hover:scale-105 active:scale-95"
          >
            Ver {topMatch.name}
            <ArrowRight className="w-5 h-5" />
          </Link>

          <button
            onClick={onRestart}
            className="flex items-center justify-center gap-2 bg-white/5 border-2 border-white/20 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-semibold text-base md:text-lg hover:bg-white/10 transition-all active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" />
            Hacer otro test
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center mt-6"
        >
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 px-4 py-2 rounded-full text-sm text-zinc-400">
            <MapPin className="w-4 h-4 text-blue-400" />
            <span>Villa María, Córdoba • <span className="text-white font-semibold">Envío gratis</span></span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// ============================================================================
// QUESTIONS SCREEN
// ============================================================================
function QuestionsScreen({ currentStep, progress, data, onSelect, onBack, questionRef }: any) {
  const currentStepData = SIMULATOR_STEPS[currentStep]

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 py-8 md:py-12 px-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-10 md:top-20 left-10 md:left-20 w-64 md:w-96 h-64 md:h-96 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute bottom-10 md:bottom-20 right-10 md:right-20 w-64 md:w-96 h-64 md:h-96 bg-cyan-500 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-xl border border-blue-500/20 px-4 py-2 md:px-5 md:py-3 rounded-full mb-4 md:mb-6 shadow-lg shadow-blue-500/20">
            <Brain className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" />
            <span className="text-white font-semibold text-sm md:text-base">
              Test IA Personalizado • Villa María
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-black text-white mb-3 md:mb-4 leading-tight px-4">
            Encontrá tu colchón ideal
          </h1>
          <p className="text-base md:text-xl text-zinc-300">
            {SIMULATOR_STEPS.length} preguntas • 2 minutos • Precisión del 96%
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6 md:mb-8 bg-gradient-to-br from-zinc-900 to-zinc-950 backdrop-blur-xl border border-blue-500/20 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-xl"
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-white font-semibold text-sm md:text-base">
              Pregunta {currentStep + 1} de {SIMULATOR_STEPS.length}
            </span>
            <span className="text-cyan-400 font-bold text-base md:text-lg">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-2.5 md:h-3 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-400 rounded-full shadow-lg shadow-blue-500/50"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            ref={questionRef}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-gradient-to-br from-zinc-900 to-zinc-950 backdrop-blur-xl border border-blue-500/20 rounded-2xl md:rounded-3xl p-6 md:p-10 mb-6 shadow-2xl scroll-mt-24"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-2 md:mb-3 text-center leading-tight">
              {currentStepData.title}
            </h2>
            <p className="text-zinc-300 text-center mb-6 md:mb-10 text-sm md:text-lg leading-relaxed">
              {currentStepData.subtitle}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              {currentStepData.options.map((option, index) => {
                const isSelected = data[currentStepData.key] === option.value

                return (
                  <motion.button
                    key={option.value}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                    onClick={() => onSelect(option.value)}
                    className={`group relative bg-white/5 hover:bg-white/10 border-2 rounded-xl md:rounded-2xl p-4 md:p-6 transition-all duration-300 hover:scale-105 active:scale-95 ${
                      isSelected 
                        ? 'border-cyan-400 bg-cyan-500/10 shadow-lg shadow-cyan-500/30' 
                        : 'border-blue-500/20 hover:border-blue-500/40'
                    }`}
                  >
                    <div className={`w-12 h-12 md:w-14 md:h-14 mx-auto mb-3 md:mb-4 rounded-xl bg-gradient-to-br ${option.gradient} flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                      <option.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                    </div>
                    
                    <div className="font-bold text-lg md:text-xl text-white mb-1.5 md:mb-2">
                      {option.label}
                    </div>
                    
                    <div className="text-xs md:text-sm text-zinc-400 leading-relaxed">
                      {option.desc}
                    </div>

                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-2 right-2 w-6 h-6 bg-cyan-400 rounded-full flex items-center justify-center shadow-lg"
                      >
                        <Check className="w-4 h-4 text-white" />
                      </motion.div>
                    )}
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {currentStep > 0 && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={onBack}
            className="flex items-center gap-2 text-zinc-400 hover:text-white mx-auto transition-colors text-sm md:text-base active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
            Volver atrás
          </motion.button>
        )}
      </div>
    </div>
  )
}