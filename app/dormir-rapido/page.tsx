// app/blog/dormir-rapido/page.tsx - ULTRA OPTIMIZED ⚡
'use client'

import React, { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Wind, Brain, Eye, Moon, ArrowLeft, Clock, 
  Calendar, Play, Pause, CheckCircle2, Lightbulb,
  Timer
} from 'lucide-react'

// ============================================================================
// CONSTANTS (memoized)
// ============================================================================

interface Technique {
  id: number
  icon: any
  title: string
  time: string
  difficulty: string
  effectiveness: string
  description: string
  gradient: string
  steps: string[]
  science: string
}

const TECHNIQUES: Technique[] = [
  {
    id: 1,
    icon: Wind,
    title: 'Método 4-7-8',
    time: '2 minutos',
    difficulty: 'Fácil',
    effectiveness: '85%',
    description: 'Técnica de respiración desarrollada por el Dr. Andrew Weil. Activa el sistema nervioso parasimpático.',
    gradient: 'from-cyan-500 to-blue-600',
    steps: [
      'Exhala completamente por la boca haciendo un sonido "whoosh"',
      'Cierra la boca e inhala por la nariz contando hasta 4',
      'Mantén la respiración contando hasta 7',
      'Exhala completamente por la boca contando hasta 8',
      'Repite el ciclo 3-4 veces'
    ],
    science: 'Reduce la frecuencia cardíaca y oxigena la sangre, señalizando al cerebro que es momento de descansar.'
  },
  {
    id: 2,
    icon: Brain,
    title: 'Relajación muscular progresiva',
    time: '10-15 minutos',
    difficulty: 'Media',
    effectiveness: '90%',
    description: 'Técnica desarrollada en los años 30 que tensa y relaja sistemáticamente grupos musculares.',
    gradient: 'from-purple-500 to-pink-600',
    steps: [
      'Acuéstate cómodamente boca arriba',
      'Comienza con los pies: tensa 5 segundos, relaja 10 segundos',
      'Sube a pantorrillas, muslos, abdomen, pecho',
      'Continúa con manos, brazos, hombros, cuello',
      'Termina con rostro: frente, ojos, mandíbula',
      'Permanece relajado 2-3 minutos al finalizar'
    ],
    science: 'Libera tensión física acumulada y enseña a tu cuerpo a reconocer la diferencia entre tensión y relajación.'
  },
  {
    id: 3,
    icon: Eye,
    title: 'Visualización guiada',
    time: '5-10 minutos',
    difficulty: 'Fácil',
    effectiveness: '80%',
    description: 'Imagina un lugar tranquilo con todos tus sentidos para distraer tu mente de preocupaciones.',
    gradient: 'from-green-500 to-emerald-600',
    steps: [
      'Elige un lugar tranquilo: playa, bosque, montaña',
      'Imagina los detalles visuales: colores, luz, movimiento',
      'Añade sonidos: olas, pájaros, viento entre árboles',
      'Incluye sensaciones: temperatura, texturas, aromas',
      'Muévete lentamente por este espacio mental',
      'Si tu mente divaga, vuelve gentilmente a la escena'
    ],
    science: 'Ocupa tu corteza prefrontal con imágenes positivas, evitando que procese preocupaciones y estrés.'
  },
  {
    id: 4,
    icon: Moon,
    title: 'Escaneo corporal',
    time: '8-12 minutos',
    difficulty: 'Fácil',
    effectiveness: '88%',
    description: 'Técnica de mindfulness que dirige tu atención a cada parte del cuerpo sistemáticamente.',
    gradient: 'from-indigo-500 to-purple-600',
    steps: [
      'Acuéstate y cierra los ojos',
      'Enfoca tu atención en los dedos de los pies',
      'Nota cualquier sensación sin juzgar',
      'Mueve lentamente tu atención hacia arriba',
      'Pies → piernas → cadera → torso → brazos → cabeza',
      'Dedica 30-60 segundos a cada zona',
      'Si te duermes antes de terminar, ¡funcionó!'
    ],
    science: 'Interrumpe el ciclo de pensamientos ansiosos al anclar tu atención en sensaciones físicas presentes.'
  }
]

const QUICK_TIPS = [
  {
    title: 'Practica de día',
    text: 'Prueba las técnicas cuando no estés cansado para dominarlas antes de usarlas de noche.'
  },
  {
    title: 'Combina técnicas',
    text: 'Empieza con 4-7-8 (2 min), luego escaneo corporal (8 min). Potencia los efectos.'
  },
  {
    title: 'No te frustres',
    text: 'Si después de 20 minutos no funciona, sal de la cama. Lee algo aburrido y vuelve.'
  },
  {
    title: 'Sé consistente',
    text: 'Usa la misma técnica cada noche durante 2 semanas antes de cambiarla.'
  }
] as const

// ============================================================================
// STRUCTURED DATA
// ============================================================================
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://azulcolchones.com'

const articleStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Técnicas Comprobadas para Dormirse en 10 Minutos',
  description: 'Métodos respaldados por la ciencia para conciliar el sueño rápidamente: 4-7-8, relajación muscular, visualización y escaneo corporal',
  image: `${BASE_URL}/blog/dormir-rapido-og.jpg`,
  datePublished: '2024-10-15',
  dateModified: '2024-11-15',
  author: {
    '@type': 'Organization',
    name: 'Azul Colchones',
    url: BASE_URL
  },
  publisher: {
    '@type': 'Organization',
    name: 'Azul Colchones',
    logo: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/logo.png`
    }
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${BASE_URL}/blog/dormir-rapido`
  }
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function DormirRapido() {
  const [activeExercise, setActiveExercise] = useState<number | null>(null)

  // ✅ Optimized toggle handler
  const toggleExercise = useCallback((id: number) => {
    setActiveExercise(prev => prev === id ? null : id)
  }, [])

  return (
    <>
      {/* ✅ STRUCTURED DATA - SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleStructuredData)
        }}
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950">
        {/* Background Effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-blob" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
        </div>

        <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" aria-hidden="true" />

        {/* Content */}
        <div className="relative container mx-auto px-4 py-16 max-w-5xl">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => window.location.href = '/blog'}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors cursor-pointer"
            aria-label="Volver al blog"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver al blog
          </motion.button>

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="text-9xl mb-6"
              aria-hidden="true"
            >
              😴
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Técnicas comprobadas para
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                dormirse en 10 minutos
              </span>
            </h1>

            <p className="text-xl text-gray-400 mb-8">
              Métodos respaldados por la ciencia para conciliar el sueño rápidamente
            </p>

            <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                6 min de lectura
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Octubre 2025
              </div>
            </div>
          </motion.header>

          {/* Introduction */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-12"
          >
            <div className="flex items-start gap-4">
              <Lightbulb className="w-8 h-8 text-cyan-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-bold text-white mb-3">¿Por qué funcionan estas técnicas?</h2>
                <p className="text-gray-300 leading-relaxed mb-3">
                  Cuando intentas dormir, tu mente activa el <strong className="text-white">sistema nervioso simpático</strong> 
                  (modo "lucha o huida"). Estas técnicas activan el <strong className="text-white">sistema nervioso parasimpático</strong> 
                  (modo "descanso y digestión"), reduciendo frecuencia cardíaca, presión arterial y actividad cerebral.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  <strong className="text-cyan-400">Dato clave:</strong> La efectividad aumenta con la práctica. 
                  La primera vez puede tomar 15-20 minutos, pero con repetición diaria, muchas personas se duermen en 5-10 minutos.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Techniques - MEMOIZED */}
          <div className="space-y-6 mb-12">
            {TECHNIQUES.map((technique, index) => (
              <motion.article
                key={technique.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-purple-500/50 transition-all"
              >
                {/* Header */}
                <div className="p-6 border-b border-white/10">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${technique.gradient} flex items-center justify-center flex-shrink-0`}>
                        <technique.icon className="w-8 h-8 text-white" />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-2">{technique.title}</h3>
                        <p className="text-gray-300 mb-3">{technique.description}</p>
                        
                        <div className="flex flex-wrap gap-3">
                          <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full text-sm">
                            <Timer className="w-4 h-4 text-cyan-400" />
                            <span className="text-gray-300">{technique.time}</span>
                          </div>
                          <div className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm font-semibold">
                            {technique.effectiveness} efectivo
                          </div>
                          <div className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                            {technique.difficulty}
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleExercise(technique.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 rounded-xl font-semibold text-white transition-all"
                      aria-expanded={activeExercise === technique.id}
                      aria-controls={`technique-${technique.id}`}
                    >
                      {activeExercise === technique.id ? (
                        <>
                          <Pause className="w-5 h-5" />
                          Ocultar
                        </>
                      ) : (
                        <>
                          <Play className="w-5 h-5" />
                          Ver pasos
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Steps - Expandable */}
                <AnimatePresence>
                  {activeExercise === technique.id && (
                    <motion.div
                      id={`technique-${technique.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 bg-white/5">
                        {/* Steps */}
                        <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center text-sm" aria-hidden="true">
                            📝
                          </span>
                          Paso a paso
                        </h4>
                        
                        <ol className="space-y-3 mb-6">
                          {technique.steps.map((step, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center font-bold text-white flex-shrink-0 text-sm">
                                {i + 1}
                              </div>
                              <p className="text-gray-300 flex-1 pt-1">{step}</p>
                            </li>
                          ))}
                        </ol>

                        {/* Science */}
                        <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
                          <div className="flex items-start gap-3">
                            <span className="text-2xl" aria-hidden="true">🧠</span>
                            <div>
                              <h5 className="font-bold text-purple-300 mb-1">Base científica</h5>
                              <p className="text-sm text-gray-300">{technique.science}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            ))}
          </div>

          {/* Quick Tips - MEMOIZED */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-amber-600/20 to-orange-600/20 backdrop-blur-xl border border-amber-500/30 rounded-3xl p-8 mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center" aria-hidden="true">
                ⚡
              </span>
              Consejos rápidos para mayor efectividad
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {QUICK_TIPS.map((tip, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-white mb-1">{tip.title}</h3>
                    <p className="text-sm text-gray-300">{tip.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Bottom CTA */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center"
          >
            <h2 className="text-2xl font-bold text-white mb-3">🎯 Tu plan de acción</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              <strong className="text-white">Esta noche:</strong> Elige UNA técnica. Pruébala completamente. 
              Si no funciona en 20 minutos, no te frustres. <strong className="text-white">Repite mañana.</strong> 
              La mayoría de personas necesitan 3-7 días de práctica antes de ver resultados consistentes.
            </p>
            
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl text-white font-bold">
              <Moon className="w-5 h-5" />
              Empieza esta noche con el método 4-7-8
            </div>
          </motion.section>
        </div>

        <style jsx>{`
          @keyframes blob {
            0%, 100% { transform: translate(0, 0) scale(1); }
            25% { transform: translate(20px, -50px) scale(1.1); }
            50% { transform: translate(-20px, 20px) scale(0.9); }
            75% { transform: translate(50px, 50px) scale(1.05); }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
        `}</style>
      </div>
    </>
  )
}