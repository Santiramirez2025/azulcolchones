'use client'

import { useState, useEffect, useRef } from 'react'
import { trackCustomEvent, trackWhatsAppClick } from '@/lib/pixel'
import { 
  calcularRecomendacion, 
  type Respuestas, 
  type Recomendacion 
} from './logicaRecomendacion'

// ============================================================================
// DATOS ESTÁTICOS - PREGUNTAS
// ============================================================================

const PREGUNTAS = [
  {
    id: 'medida',
    titulo: '¿Qué medida necesitás?',
    subtitulo: 'Elegí según el espacio disponible',
    opciones: [
      { valor: 'plaza', label: '1 plaza', helper: '80-100 cm' },
      { valor: 'plaza-media', label: '1½ - 2 plazas', helper: '130-140 cm' },
      { valor: 'queen', label: 'Queen', helper: '160-180 cm' },
      { valor: 'king', label: 'King', helper: '200 cm' }
    ]
  },
  {
    id: 'postura',
    titulo: '¿Cómo dormís habitualmente?',
    subtitulo: 'Pensá en tu posición más frecuente',
    opciones: [
      { valor: 'lado', label: 'De lado', helper: 'La mayoría de las personas' },
      { valor: 'boca-arriba', label: 'Boca arriba', helper: 'Segunda posición más común' },
      { valor: 'boca-abajo', label: 'Boca abajo', helper: 'Menos frecuente' },
      { valor: 'cambia', label: 'Cambio mucho', helper: 'No tengo postura fija' }
    ]
  },
  {
    id: 'peso',
    titulo: '¿Cuál es tu peso aproximado?',
    subtitulo: 'Nos ayuda a calcular el soporte necesario',
    opciones: [
      { valor: 'menos-60', label: 'Menos de 60 kg', helper: '' },
      { valor: '60-80', label: 'Entre 60 y 80 kg', helper: '' },
      { valor: '80-100', label: 'Entre 80 y 100 kg', helper: '' },
      { valor: 'mas-100', label: 'Más de 100 kg', helper: '' }
    ]
  }
] as const

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export default function AsesorColchon() {
  const [activo, setActivo] = useState(false)
  const [pasoActual, setPasoActual] = useState(0)
  const [respuestas, setRespuestas] = useState<Respuestas>({
    medida: null,
    postura: null,
    peso: null
  })
  const [resultado, setResultado] = useState<ReturnType<typeof calcularRecomendacion> | null>(null)
  const [tiempoInicio, setTiempoInicio] = useState<number | null>(null)

  const preguntaActual = PREGUNTAS[pasoActual]
  const progresoPerc = ((pasoActual + 1) / PREGUNTAS.length) * 100

  // Analytics: Inicio
  useEffect(() => {
    if (activo && !tiempoInicio) {
      setTiempoInicio(Date.now())
      trackCustomEvent('asesor_iniciado', {})
    }
  }, [activo, tiempoInicio])

  // Analytics: Finalización
  useEffect(() => {
    if (resultado && tiempoInicio) {
      const tiempoTotal = Math.round((Date.now() - tiempoInicio) / 1000)
      trackCustomEvent('asesor_completado', {
        modelo_recomendado: resultado.principal.modelo,
        tiempo_segundos: tiempoTotal,
        medida: respuestas.medida,
        postura: respuestas.postura,
        peso: respuestas.peso
      })
    }
  }, [resultado, tiempoInicio, respuestas])

  const handleSeleccion = (campo: keyof Respuestas, valor: any) => {
    setRespuestas(prev => ({ ...prev, [campo]: valor }))
    
    trackCustomEvent('asesor_respuesta', {
      pregunta: campo,
      respuesta: valor,
      paso: pasoActual + 1
    })
  }

  const handleSiguiente = () => {
    if (pasoActual < PREGUNTAS.length - 1) {
      setPasoActual(prev => prev + 1)
    } else {
      // Calcular resultado
      try {
        const recomendacion = calcularRecomendacion(respuestas)
        setResultado(recomendacion)
      } catch (error) {
        console.error('Error al calcular recomendación:', error)
        trackCustomEvent('asesor_error', { error: String(error) })
      }
    }
  }

  const handleAnterior = () => {
    if (pasoActual > 0) {
      setPasoActual(prev => prev - 1)
    }
  }

  const handleReiniciar = () => {
    setActivo(false)
    setPasoActual(0)
    setRespuestas({ medida: null, postura: null, peso: null })
    setResultado(null)
    setTiempoInicio(null)
    
    trackCustomEvent('asesor_reiniciado', {})
  }

  // Estado: No iniciado
  if (!activo && !resultado) {
    return (
      <div className="bg-zinc-900/60 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-6 md:p-8">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
            <span className="text-2xl" role="img" aria-label="colchón">🛏️</span>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white mb-2">
              ¿No sabés qué colchón elegir?
            </h3>
            <p className="text-sm text-zinc-400 mb-4">
              Respondé 3 preguntas simples y te recomendamos según tu forma de dormir
            </p>
            <button
              onClick={() => setActivo(true)}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
              aria-label="Comenzar asesoría de colchones"
            >
              Comenzar Asesoría →
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Estado: Mostrando resultado
  if (resultado) {
    return (
      <div className="bg-zinc-900/60 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-6 md:p-8">
        <ResultadoRecomendacion
          principal={resultado.principal}
          alternativa={resultado.alternativa}
          onReiniciar={handleReiniciar}
        />
      </div>
    )
  }

  // Estado: Respondiendo preguntas
  const valorActual = respuestas[preguntaActual.id as keyof Respuestas]
  const puedeAvanzar = valorActual !== null

  return (
    <div className="bg-zinc-900/60 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-6 md:p-8">
      {/* Barra de progreso */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">
            Paso {pasoActual + 1} de {PREGUNTAS.length}
          </span>
          <span className="text-xs text-zinc-600">{Math.round(progresoPerc)}%</span>
        </div>
        <div 
          className="h-1.5 bg-zinc-800 rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={progresoPerc}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-blue-500 transition-all duration-500"
            style={{ width: `${progresoPerc}%` }}
          />
        </div>
      </div>

      {/* Pregunta actual */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white mb-1">
          {preguntaActual.titulo}
        </h3>
        <p className="text-sm text-zinc-500">
          {preguntaActual.subtitulo}
        </p>
      </div>

      {/* Opciones */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {preguntaActual.opciones.map((opcion) => {
          const campo = preguntaActual.id as keyof Respuestas
          const seleccionado = respuestas[campo] === opcion.valor
          
          return (
            <button
              key={opcion.valor}
              onClick={() => handleSeleccion(campo, opcion.valor)}
              className={`
                p-4 rounded-xl border-2 text-left transition-all
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-950
                ${seleccionado
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-zinc-700/50 bg-zinc-800/40 hover:border-zinc-600'
                }
              `}
              aria-pressed={seleccionado}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-white text-sm">
                  {opcion.label}
                </span>
                <div className={`
                  w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors
                  ${seleccionado ? 'border-blue-500 bg-blue-500' : 'border-zinc-600'}
                `}>
                  {seleccionado && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>
              {opcion.helper && (
                <p className="text-xs text-zinc-500">{opcion.helper}</p>
              )}
            </button>
          )
        })}
      </div>

      {/* Nota de privacidad (solo en paso de peso) */}
      {preguntaActual.id === 'peso' && (
        <p className="text-xs text-zinc-600 mb-6 flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          Tus datos no se guardan ni se comparten
        </p>
      )}

      {/* Botones de navegación */}
      <div className="flex items-center gap-3">
        {pasoActual > 0 && (
          <button
            onClick={handleAnterior}
            className="px-4 py-2.5 bg-zinc-800/60 hover:bg-zinc-700/60 text-zinc-300 text-sm font-bold rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
          >
            ← Anterior
          </button>
        )}
        <button
          onClick={handleSiguiente}
          disabled={!puedeAvanzar}
          className="
            flex-1 px-6 py-2.5
            bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 disabled:text-zinc-600
            text-white text-sm font-bold rounded-xl
            transition-colors disabled:cursor-not-allowed
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-950
          "
        >
          {pasoActual === PREGUNTAS.length - 1 ? 'Ver Recomendación' : 'Siguiente →'}
        </button>
      </div>
    </div>
  )
}

// ============================================================================
// COMPONENTE DE RESULTADO
// ============================================================================

function ResultadoRecomendacion({ 
  principal, 
  alternativa, 
  onReiniciar 
}: {
  principal: Recomendacion
  alternativa: Recomendacion | null
  onReiniciar: () => void
}) {
  const resultadoRef = useRef<HTMLDivElement>(null)

  // Scroll suave al resultado
  useEffect(() => {
    if (resultadoRef.current) {
      resultadoRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'nearest'
      })
    }
  }, [])

  const handleVerProducto = () => {
    trackCustomEvent('asesor_ver_producto', {
      modelo: principal.modelo,
      precio: principal.precio
    })
  }

  const handleConsultar = () => {
    // Usar trackWhatsAppClick con todos los parámetros para optimización de Meta
    trackWhatsAppClick({
      producto: principal.modelo,
      tamaño: principal.medidaDisplay,
      precio: principal.precio,
      categoria: 'piero-fabrica',
      precioMercadoLibre: principal.precioML
    })
    
    trackCustomEvent('asesor_consultar_whatsapp', {
      modelo: principal.modelo,
      precio: principal.precio,
      fuente: 'asesor_colchon'
    })
  }

  const ahorro = principal.precioML ? principal.precioML - principal.precio : 0
  const ahorroPorc = principal.precioML ? Math.round((ahorro / principal.precioML) * 100) : 0

  return (
    <div ref={resultadoRef} className="space-y-6" id="resultado-asesor">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-sm font-bold mb-4">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Recomendación lista
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">
          Este es tu colchón
        </h3>
      </div>

      {/* Recomendación principal */}
      <div className="bg-gradient-to-br from-blue-950/50 to-blue-900/30 border border-blue-500/30 rounded-xl p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h4 className="text-xl font-bold text-white mb-1">
              {principal.modelo}
            </h4>
            <p className="text-sm text-blue-300">
              {principal.medidaDisplay}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-black text-white tabular-nums">
              ${principal.precio.toLocaleString('es-AR')}
            </p>
            {principal.precioML && (
              <p className="text-xs text-zinc-500 line-through">
                ${principal.precioML.toLocaleString('es-AR')} ML
              </p>
            )}
          </div>
        </div>

        {ahorro > 0 && (
          <div className="bg-green-950/40 border border-green-500/30 rounded-lg p-3 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-green-400 uppercase tracking-wide">Ahorrás:</span>
              <div className="text-right">
                <div className="text-xl font-black text-green-400 tabular-nums">
                  ${ahorro.toLocaleString('es-AR')}
                </div>
                <div className="text-xs font-bold text-green-500">
                  {ahorroPorc}% OFF vs ML
                </div>
              </div>
            </div>
          </div>
        )}

        <p className="text-sm text-zinc-300 leading-relaxed mb-4">
          {principal.razonamiento}
        </p>

        <div className="space-y-2 mb-6">
          {principal.caracteristicas.map((caract, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-zinc-400">
              <svg className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>{caract}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <a
            href={principal.ancla || '#productos'}
            onClick={handleVerProducto}
            className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white text-center text-sm font-bold rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-950"
          >
            Ver colchón
          </a>
          <a
            href={`https://wa.me/5493534017332?text=${encodeURIComponent(`Hola! Me interesa el ${principal.modelo} ${principal.medidaDisplay} (recomendado por el asesor)`)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleConsultar}
            className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-500 text-white text-center text-sm font-bold rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-blue-950"
          >
            Consultar
          </a>
        </div>
      </div>

      {/* Alternativa */}
      {alternativa && (
        <details className="group">
          <summary className="flex items-center justify-between cursor-pointer list-none px-4 py-3 bg-zinc-800/60 hover:bg-zinc-800 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-950">
            <span className="text-sm font-bold text-zinc-300">
              Ver alternativa premium
            </span>
            <svg className="w-5 h-5 text-zinc-500 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          
          <div className="mt-3 p-4 bg-zinc-800/40 border border-zinc-700/50 rounded-xl">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h5 className="font-bold text-white mb-1">{alternativa.modelo}</h5>
                <p className="text-xs text-zinc-400">{alternativa.medidaDisplay}</p>
              </div>
              <p className="text-lg font-black text-white tabular-nums">
                ${alternativa.precio.toLocaleString('es-AR')}
              </p>
            </div>
            <p className="text-sm text-zinc-500 mb-3">{alternativa.razonamiento}</p>
            <a
              href={`https://wa.me/5493534017332?text=${encodeURIComponent(`Hola! Me interesa el ${alternativa.modelo} ${alternativa.medidaDisplay}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackWhatsAppClick({
                  producto: alternativa.modelo,
                  tamaño: alternativa.medidaDisplay,
                  precio: alternativa.precio,
                  categoria: 'piero-fabrica',
                  precioMercadoLibre: alternativa.precioML
                })
              }}
              className="inline-block px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white text-xs font-bold rounded-lg transition-colors"
            >
              Consultar alternativa
            </a>
          </div>
        </details>
      )}

      {/* Reiniciar */}
      <button
        onClick={onReiniciar}
        className="w-full px-4 py-2.5 text-zinc-500 hover:text-white text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
      >
        ← Volver a empezar
      </button>
    </div>
  )
}