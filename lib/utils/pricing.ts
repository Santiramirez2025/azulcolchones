// lib/utils/pricing.ts - Sistema de Precios con Cuotas Argentina
import { formatARS } from './currency'

/**
 * Configuración de recargos por cuotas
 * Estos porcentajes se pueden cambiar fácilmente
 */
export const CUOTAS_CONFIG = {
  3: { recargo: 0.18, label: '3 cuotas' },   // +18% sobre el contado
  6: { recargo: 0.27, label: '6 cuotas' },   // +27%
  9: { recargo: 0.38, label: '9 cuotas' },   // +38%
  12: { recargo: 0.52, label: '12 cuotas' }, // +52%
} as const

export type CuotasOption = keyof typeof CUOTAS_CONFIG

/**
 * Interfaz para resultado de cálculo de cuotas
 */
export interface CuotaCalculation {
  cuotas: number
  precioTotal: number
  precioCuota: number
  recargo: number
  recargoPercentage: string // ✅ CAMBIADO a string (ya formateado como "20%")
  label: string
  formatted: {
    precioTotal: string
    precioCuota: string
    recargo: string
  }
}

/**
 * Calcula el precio con recargo para N cuotas
 */
export function calcularPrecioCuotas(
  precioBase: number,
  cuotas: CuotasOption
): CuotaCalculation {
  const config = CUOTAS_CONFIG[cuotas]
  const recargo = precioBase * config.recargo
  const precioTotal = precioBase + recargo
  const precioCuota = precioTotal / cuotas
  
  // ✅ Formatear porcentaje como string
  const recargoPercentageNumber = config.recargo * 100
  const recargoPercentageFormatted = recargoPercentageNumber === 0 
    ? '0%' 
    : `${recargoPercentageNumber.toFixed(1)}%`

  return {
    cuotas,
    precioTotal,
    precioCuota,
    recargo,
    recargoPercentage: recargoPercentageFormatted, // ✅ Ya viene como string "20%"
    label: config.label,
    formatted: {
      precioTotal: formatARS(precioTotal),
      precioCuota: formatARS(precioCuota),
      recargo: formatARS(recargo),
    }
  }
}

/**
 * Calcula todas las opciones de cuotas disponibles
 */
export function calcularTodasLasCuotas(precioBase: number): CuotaCalculation[] {
  return Object.keys(CUOTAS_CONFIG).map(cuotas => 
    calcularPrecioCuotas(precioBase, Number(cuotas) as CuotasOption)
  )
}

/**
 * Opción a destacar: 3 cuotas (con 18% de recargo sobre el contado).
 */
export function getMejorCuota(precioBase: number): CuotaCalculation {
  return calcularPrecioCuotas(precioBase, 3)
}

/**
 * Formatea el precio de contado (el precio base, de cuotas).
 */
export function formatPrecioContado(precio: number): string {
  return formatARS(precio)
}

/**
 * Texto promocional. El monto ya incluye el recargo de las 3 cuotas.
 */
export function getTextoPromocional(precioBase: number): string {
  const mejor = getMejorCuota(precioBase)
  return `3 cuotas de ${mejor.formatted.precioCuota}`
}