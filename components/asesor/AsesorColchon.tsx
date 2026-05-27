'use client'

import { useState, useEffect, useRef } from 'react'
import { trackCustomEvent, trackWhatsAppClick } from '@/lib/pixel'
import { 
  calcularRecomendacion, 
  type Respuestas, 
  type Recomendacion 
} from './logicaRecomendacion'

// ============================================================================
// PREGUNTAS - 5 medidas reales
// ============================================================================

const PREGUNTAS = [
  {
    id: 'medida',
    titulo: '¿Qué medida necesitás?',
    subtitulo: 'Elegí según el espacio disponible',
    opciones: [
      { valor: 'plaza', label: '1 plaza', helper: '80 × 190 cm', icono: '📏' },
      { valor: 'plaza-media', label: '1½ plaza', helper: '100 × 190 cm', icono: '📐' },
      { valor: 'dos-plazas', label: '2 plazas', helper: '140 × 190 cm', icono: '🛏️' },
      { valor: 'queen', label: 'Queen', helper: '160 × 200 cm', icono: '👑' },
      { valor: 'king', label: 'King', helper: '180 × 200 · 200 × 200 cm', icono: '🏰' }
    ]
  },
  {
    id: 'postura',
    titulo: '¿Cómo dormís habitualmente?',
    subtitulo: 'Pensá en tu posición más frecuente',
    opciones: [
      { valor: 'lado', label: 'De lado', helper: 'La mayoría de las personas', icono: '🧘' },
      { valor: 'boca-arriba', label: 'Boca arriba', helper: 'Segunda posición más común', icono: '😴' },
      { valor: 'boca-abajo', label: 'Boca abajo', helper: 'Menos frecuente', icono: '🤸' },
      { valor: 'cambia', label: 'Cambio mucho', helper: 'No tengo postura fija', icono: '🔄' }
    ]
  },
  {
    id: 'peso',
    titulo: '¿Cuál es tu peso aproximado?',
    subtitulo: 'Nos ayuda a calcular el soporte necesario',
    opciones: [
      { valor: 'menos-60', label: 'Menos de 60 kg', helper: '', icono: '⚖️' },
      { valor: '60-80', label: 'Entre 60 y 80 kg', helper: '', icono: '⚖️' },
      { valor: '80-100', label: 'Entre 80 y 100 kg', helper: '', icono: '⚖️' },
      { valor: 'mas-100', label: 'Más de 100 kg', helper: '', icono: '⚖️' }
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
  const [cargando, setCargando] = useState(false)

  const preguntaActual = PREGUNTAS[pasoActual]
  const progresoPerc = ((pasoActual + 1) / PREGUNTAS.length) * 100

  useEffect(() => {
    if (activo && !tiempoInicio) {
      setTiempoInicio(Date.now())
      trackCustomEvent('asesor_iniciado', {})
    }
  }, [activo, tiempoInicio])

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
      setCargando(true)
      setTimeout(() => {
        try {
          const recomendacion = calcularRecomendacion(respuestas)
          setResultado(recomendacion)
          setCargando(false)
        } catch (error) {
          console.error('Error al calcular recomendación:', error)
          trackCustomEvent('asesor_error', { error: String(error) })
          setCargando(false)
        }
      }, 800)
    }
  }

  const handleAnterior = () => {
    if (pasoActual > 0) setPasoActual(prev => prev - 1)
  }

  const handleReiniciar = () => {
    setActivo(false)
    setPasoActual(0)
    setRespuestas({ medida: null, postura: null, peso: null })
    setResultado(null)
    setTiempoInicio(null)
    setCargando(false)
    trackCustomEvent('asesor_reiniciado', {})
  }

  // ============================================================================
  // ESTADO: NO INICIADO
  // ============================================================================
  if (!activo && !resultado) {
    return (
      <div className="relative bg-gradient-to-br from-zinc-900/90 to-blue-950/20 backdrop-blur-sm border-2 border-blue-500/20 rounded-2xl p-5 md:p-8 shadow-xl shadow-blue-500/5 hover:shadow-blue-500/10 transition-shadow">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-transparent opacity-50 pointer-events-none"></div>
        
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-shrink-0 mx-auto sm:mx-0 w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-2xl flex items-center justify-center ring-2 ring-blue-500/30">
            <span className="text-3xl md:text-4xl" role="img" aria-label="objetivo">🎯</span>
          </div>
          
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-lg md:text-xl font-bold text-white mb-2">
              👋 HOLA, SOY TU ASESOR PERSONAL DE COLCHONES
            </h3>
            <p className="text-sm md:text-base text-zinc-400 mb-4 leading-relaxed">
              <strong className="text-blue-300">Respondé 3 preguntas</strong> y encontrá tu colchón Piero ideal en <strong className="text-white">30 segundos</strong>
            </p>
            <button
              onClick={() => setActivo(true)}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white text-sm md:text-base font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-950 active:scale-100"
              aria-label="Comenzar asesoría de colchones"
            >
              Comenzar Asesoría →
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ============================================================================
  // ESTADO: RESULTADO
  // ============================================================================
  if (resultado) {
    return (
      <div className="bg-gradient-to-br from-zinc-900/90 to-blue-950/20 backdrop-blur-sm border-2 border-blue-500/20 rounded-2xl p-5 md:p-8 shadow-xl">
        <ResultadoRecomendacion
          principal={resultado.principal}
          alternativa={resultado.alternativa}
          onReiniciar={handleReiniciar}
        />
      </div>
    )
  }

  // ============================================================================
  // ESTADO: RESPONDIENDO
  // ============================================================================
  const valorActual = respuestas[preguntaActual.id as keyof Respuestas]
  const puedeAvanzar = valorActual !== null

  return (
    <div className="bg-gradient-to-br from-zinc-900/90 to-blue-950/20 backdrop-blur-sm border-2 border-blue-500/20 rounded-2xl p-5 md:p-8 shadow-xl">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-4xl md:text-5xl font-black text-blue-400 tabular-nums">
              {pasoActual + 1}
            </span>
            <div>
              <span className="block text-xs font-semibold text-zinc-500 uppercase tracking-wide">
                Paso de {PREGUNTAS.length}
              </span>
              <span className="block text-xs text-zinc-600 mt-0.5">{Math.round(progresoPerc)}% completado</span>
            </div>
          </div>
        </div>
        <div 
          className="h-2 bg-zinc-800 rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={progresoPerc}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-500 ease-out"
            style={{ width: `${progresoPerc}%` }}
          />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">
          {preguntaActual.titulo}
        </h3>
        <p className="text-sm md:text-base text-zinc-500">
          {preguntaActual.subtitulo}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 mb-6">
        {preguntaActual.opciones.map((opcion) => {
          const campo = preguntaActual.id as keyof Respuestas
          const seleccionado = respuestas[campo] === opcion.valor
          
          return (
            <button
              key={opcion.valor}
              onClick={() => handleSeleccion(campo, opcion.valor)}
              className={`
                min-h-[56px] p-4 rounded-xl border-2 text-left transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-950
                ${seleccionado
                  ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20'
                  : 'border-zinc-700/50 bg-zinc-800/40 hover:border-zinc-600 hover:bg-zinc-800/60'
                }
              `}
              aria-pressed={seleccionado}
            >
              <div className="flex items-center gap-3">
                {opcion.icono && (
                  <span className="text-2xl flex-shrink-0" role="img" aria-hidden="true">
                    {opcion.icono}
                  </span>
                )}
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-white text-sm md:text-base">
                      {opcion.label}
                    </span>
                    <div className={`
                      flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
                      ${seleccionado ? 'border-blue-500 bg-blue-500 scale-110' : 'border-zinc-600'}
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
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {preguntaActual.id === 'peso' && (
        <p className="text-xs text-zinc-600 mb-6 flex items-center justify-center gap-1.5 bg-zinc-800/30 rounded-lg p-3">
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          Tus datos no se guardan ni se comparten
        </p>
      )}

      <div className="flex items-center gap-3">
        {pasoActual > 0 && (
          <button
            onClick={handleAnterior}
            className="px-5 py-3 bg-zinc-800/60 hover:bg-zinc-700/60 text-zinc-300 hover:text-white text-sm font-bold rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
          >
            ← Anterior
          </button>
        )}
        <button
          onClick={handleSiguiente}
          disabled={!puedeAvanzar || cargando}
          className="
            flex-1 px-6 py-3 min-h-[48px]
            bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600
            disabled:from-zinc-800 disabled:to-zinc-800 disabled:text-zinc-600
            text-white text-sm md:text-base font-bold rounded-xl
            transition-all disabled:cursor-not-allowed
            shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-950
            flex items-center justify-center gap-2
          "
        >
          {cargando ? (
            <>
              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Calculando...
            </>
          ) : (
            pasoActual === PREGUNTAS.length - 1 ? 'Ver Recomendación' : 'Siguiente →'
          )}
        </button>
      </div>
    </div>
  )
}

// ============================================================================
// RESULTADO
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
    trackWhatsAppClick({
      producto: principal.modelo,
      tamaño: principal.medidaDisplay,
      precio: principal.precio,
      categoria: 'piero',
    })
    
    trackCustomEvent('asesor_consultar_whatsapp', {
      modelo: principal.modelo,
      precio: principal.precio,
      fuente: 'asesor_colchon'
    })
  }

  const valorCuota = Math.round(principal.precio / principal.cuotas)

  return (
    <div 
      ref={resultadoRef} 
      className="space-y-6 animate-[fadeIn_0.5s_ease-out]" 
      id="resultado-asesor"
    >
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-sm font-bold mb-4 animate-[pulse_2s_ease-in-out_infinite]">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Recomendación lista
        </div>
        <h3 className="text-2xl md:text-3xl font-black text-white mb-2">
          Este es tu colchón ideal
        </h3>
      </div>

      <div className="relative bg-gradient-to-br from-blue-950/60 to-blue-900/40 border-2 border-blue-500/40 rounded-2xl p-6 md:p-8 shadow-2xl shadow-blue-500/20">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 to-transparent opacity-50 pointer-events-none"></div>
        
        <div className="relative">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/20 border border-blue-400/40 rounded-full text-blue-300 text-xs font-bold uppercase tracking-wider mb-3">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Línea {principal.linea}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
            <div className="flex-1">
              <h4 className="text-2xl md:text-3xl font-black text-white mb-2 leading-tight">
                {principal.modelo}
              </h4>
              <p className="text-sm md:text-base text-blue-300 font-semibold">
                {principal.medidaDisplay}
              </p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-3xl md:text-4xl font-black text-white tabular-nums">
                ${principal.precio.toLocaleString('es-AR')}
              </p>
              <p className="text-xs text-zinc-400 mt-1 uppercase tracking-wide font-semibold">
                Precio contado
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-900/40 to-amber-800/30 border-2 border-amber-500/50 rounded-xl p-4 md:p-5 mb-5 shadow-lg shadow-amber-500/10">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-amber-500 text-amber-950 rounded-full flex items-center justify-center font-black text-sm">
                  %
                </div>
                <div>
                  <p className="text-amber-300 font-black text-base md:text-lg leading-tight">
                    {principal.cuotas} cuotas sin interés
                  </p>
                  <p className="text-amber-400/70 text-xs md:text-sm mt-0.5">
                    con tarjetas participantes
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-amber-200 text-xs font-semibold uppercase tracking-wide">
                  Cuota de
                </p>
                <p className="text-amber-100 text-xl md:text-2xl font-black tabular-nums">
                  ${valorCuota.toLocaleString('es-AR')}
                </p>
              </div>
            </div>
          </div>

          <p className="text-sm md:text-base text-zinc-300 leading-relaxed mb-5">
            {principal.razonamiento}
          </p>

          <div className="space-y-3 mb-6">
            {principal.caracteristicas.map((caract, i) => (
              <div key={i} className="flex items-start gap-3 text-sm md:text-base text-zinc-400">
                <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="flex-1">{caract}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`/lista-precios${principal.ancla}`}
              onClick={handleVerProducto}
              className="flex-1 px-6 py-4 bg-blue-600 hover:bg-blue-500 text-white text-center text-base font-bold rounded-xl transition-all shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-950 active:scale-100"
            >
              Ver en Lista de Precios
            </a>
            <a
              href={`https://wa.me/5493534096566?text=${encodeURIComponent(`Hola! Me interesa el ${principal.modelo} ${principal.medidaDisplay} ($${principal.precio.toLocaleString('es-AR')} · ${principal.cuotas} cuotas sin interés). Vine del asesor de la web.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleConsultar}
              className="flex-1 px-6 py-4 bg-green-600 hover:bg-green-500 text-white text-center text-base font-bold rounded-xl transition-all shadow-lg shadow-green-600/30 hover:shadow-xl hover:shadow-green-600/40 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-blue-950 active:scale-100 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </div>

      {alternativa && (
        <details className="group">
          <summary className="flex items-center justify-between cursor-pointer list-none px-5 py-4 bg-zinc-800/60 hover:bg-zinc-800 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-950">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-amber-500/20 border border-amber-400/40 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div className="text-left">
                <span className="block text-sm md:text-base font-bold text-zinc-200">
                  Ver alternativa superior
                </span>
                <span className="block text-xs text-zinc-500">
                  Línea {alternativa.linea} · {alternativa.modelo}
                </span>
              </div>
            </div>
            <svg className="w-5 h-5 text-zinc-500 transition-transform group-open:rotate-180 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          
          <div className="mt-3 p-5 bg-zinc-800/40 border border-zinc-700/50 rounded-xl">
            <div className="flex items-start justify-between mb-3 gap-3">
              <div className="flex-1">
                <h5 className="font-bold text-white text-lg mb-1">{alternativa.modelo}</h5>
                <p className="text-sm text-zinc-400">{alternativa.medidaDisplay}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-black text-white tabular-nums">
                  ${alternativa.precio.toLocaleString('es-AR')}
                </p>
                <p className="text-xs text-amber-400 font-bold mt-0.5">
                  {alternativa.cuotas} cuotas sin interés
                </p>
              </div>
            </div>
            <p className="text-sm text-zinc-500 mb-4 leading-relaxed">{alternativa.razonamiento}</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <a
                href={`/lista-precios${alternativa.ancla}`}
                className="flex-1 px-4 py-2.5 bg-zinc-700 hover:bg-zinc-600 text-white text-center text-sm font-bold rounded-lg transition-colors"
              >
                Ver en catálogo
              </a>
              <a
                href={`https://wa.me/5493534096566?text=${encodeURIComponent(`Hola! Me interesa el ${alternativa.modelo} ${alternativa.medidaDisplay}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackWhatsAppClick({
                    producto: alternativa.modelo,
                    tamaño: alternativa.medidaDisplay,
                    precio: alternativa.precio,
                    categoria: 'piero',
                  })
                }}
                className="flex-1 px-4 py-2.5 bg-green-700 hover:bg-green-600 text-white text-center text-sm font-bold rounded-lg transition-colors"
              >
                Consultar
              </a>
            </div>
          </div>
        </details>
      )}

      <button
        onClick={onReiniciar}
        className="w-full px-4 py-3 text-zinc-500 hover:text-white text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-950 flex items-center justify-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Volver a empezar
      </button>
    </div>
  )
}