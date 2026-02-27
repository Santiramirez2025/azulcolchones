// app/piero-fabrica/product-helpers.ts
// ============================================================================
// HELPERS COMPARTIDOS — Server + Client compatible
// Sin 'use client' para que funcione en generateStaticParams y generateMetadata
// ============================================================================

import type { Producto } from '@/data/productos'

// ============================================================================
// TYPES
// ============================================================================

export interface ProductoAgrupado {
  modelo: string
  variantes: Producto[]
  categoria: Producto['categoria']
  tipo: Producto['tipo']
  imagen?: string
}

// ============================================================================
// HELPERS
// ============================================================================

export function extraerModelo(nombre: string): string {
  return nombre
    .replace(/^Colchón Piero\s+/i, '')
    .replace(/^Sommier Piero\s+/i, '')
    .replace(/^Almohada Piero\s+/i, '')
    .replace(/^Cubre Colchon\s+/i, 'Cubre Colchón ')
    .replace(/^Sábanas Piero\s+/i, 'Sábanas ')
    .trim()
}

export function generarSlug(modelo: string): string {
  return modelo
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function formatPrecio(precio: number): string {
  return precio.toLocaleString('es-AR')
}

export function extraerMedidaCorta(tamaño: string): string {
  const match = tamaño.match(/(\d+)x(\d+)\s*\((.+?)\)/)
  if (match) return `${match[2]} · ${match[3]}`
  return tamaño.replace(' cm', '')
}

// ============================================================================
// AGRUPAR PRODUCTOS POR MODELO
// ============================================================================

export function agruparProductosPorModelo(productos: Producto[]): ProductoAgrupado[] {
  const grupos = new Map<string, ProductoAgrupado>()

  for (const p of productos) {
    // Solo agrupar colchones (tipo puede ser undefined en tu data)
    if (p.tipo && p.tipo !== 'colchon') continue
    if (!p.tipo && !p.nombre.toLowerCase().startsWith('colchón')) continue

    const modelo = extraerModelo(p.nombre)
    const existing = grupos.get(modelo)

    if (existing) {
      existing.variantes.push(p)
    } else {
      grupos.set(modelo, {
        modelo,
        variantes: [p],
        categoria: p.categoria,
        tipo: p.tipo,
        imagen: p.imagen,
      })
    }
  }

  return Array.from(grupos.values())
}