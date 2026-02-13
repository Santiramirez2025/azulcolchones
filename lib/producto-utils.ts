// lib/producto-utils.ts
import { Producto, StockStatus } from '@/data/productos'

// ============================================================================
// TIPOS DE FILTROS
// ============================================================================

export type FiltroTamaño = 
  | 'todos' 
  | 'plaza' 
  | 'plaza-media' 
  | 'dos-plazas'
  | 'queen' 
  | 'king' 
  | 'sommiers'
  | 'almohadas'
  | 'accesorios'

// ============================================================================
// ENRIQUECER PRODUCTOS CON AHORRO
// ============================================================================

export function enrichProductWithSavings(producto: Producto): Producto {
  if (!producto.precioMercadoLibre) {
    return { ...producto, ahorro: undefined, ahorroPorc: undefined }
  }

  const ahorro = producto.precioMercadoLibre - producto.precioPublico
  const ahorroPorc = Math.round((ahorro / producto.precioMercadoLibre) * 100)

  return {
    ...producto,
    ahorro,
    ahorroPorc
  }
}

// ============================================================================
// DETECTAR TAMAÑO DEL PRODUCTO
// ============================================================================

function detectarTamañoProducto(producto: Producto): FiltroTamaño[] {
  const tamaño = producto.tamaño.toLowerCase()
  const tipo = producto.tipo || 'colchon'
  const categorias: FiltroTamaño[] = []

  // Sommiers - tienen prioridad
  if (tipo === 'sommier') {
    categorias.push('sommiers')
    return categorias
  }

  // Almohadas - tienen prioridad
  if (tipo === 'almohada') {
    categorias.push('almohadas')
    return categorias
  }

  // Accesorios generales (protectores, sábanas, cubres)
  if (tipo === 'protector' || tipo === 'sabanas' || tipo === 'cubre') {
    categorias.push('accesorios')
    
    // También clasificar por tamaño para accesorios
    if (tamaño.includes('80')) {
      categorias.push('plaza')
    } else if (tamaño.includes('90') || tamaño.includes('100')) {
      categorias.push('plaza-media')
    } else if (tamaño.includes('130') || tamaño.includes('140')) {
      categorias.push('dos-plazas')
    } else if (tamaño.includes('160')) {
      categorias.push('queen')
    } else if (tamaño.includes('180') || tamaño.includes('200')) {
      categorias.push('king')
    }
    
    return categorias
  }

  // Detectar por tamaño de colchón (usando x para asegurar coincidencia exacta)
  // 1 Plaza: 80cm
  if (tamaño.includes('x80') || tamaño.includes(' 80')) {
    categorias.push('plaza')
  } 
  // 1½ Plaza: 90cm y 100cm
  else if (tamaño.includes('x90') || tamaño.includes(' 90') || 
           tamaño.includes('x100') || tamaño.includes(' 100')) {
    categorias.push('plaza-media')
  } 
  // 2 Plazas: 130cm y 140cm
  else if (tamaño.includes('x130') || tamaño.includes(' 130') || 
           tamaño.includes('x140') || tamaño.includes(' 140')) {
    categorias.push('dos-plazas')
  } 
  // Queen: 160cm
  else if (tamaño.includes('x160') || tamaño.includes(' 160') || 
           tamaño.includes('queen')) {
    categorias.push('queen')
  } 
  // King: 180cm y 200cm
  else if (tamaño.includes('x180') || tamaño.includes(' 180') || 
           tamaño.includes('x200') || tamaño.includes(' 200') ||
           tamaño.includes('king')) {
    categorias.push('king')
  }

  return categorias
}

// ============================================================================
// FILTRAR PRODUCTOS
// ============================================================================

export function filtrarProductos(
  productos: Producto[],
  filtro: FiltroTamaño,
  searchQuery?: string
): Producto[] {
  let resultado = productos

  // Aplicar búsqueda por texto
  if (searchQuery && searchQuery.trim() !== '') {
    const query = searchQuery.toLowerCase().trim()
    resultado = resultado.filter((producto) => {
      const nombre = producto.nombre.toLowerCase()
      const tamaño = producto.tamaño.toLowerCase()
      const tipo = (producto.tipo || '').toLowerCase()
      
      return (
        nombre.includes(query) ||
        tamaño.includes(query) ||
        tipo.includes(query)
      )
    })
  }

  // Aplicar filtro por tamaño
  if (filtro === 'todos') {
    return resultado
  }

  return resultado.filter((producto) => {
    const categorias = detectarTamañoProducto(producto)
    return categorias.includes(filtro)
  })
}

// ============================================================================
// CONTAR PRODUCTOS POR FILTRO
// ============================================================================

export function contarProductosPorFiltro(
  productos: Producto[],
  filtro: FiltroTamaño
): number {
  if (filtro === 'todos') {
    return productos.length
  }

  return productos.filter((producto) => {
    const categorias = detectarTamañoProducto(producto)
    return categorias.includes(filtro)
  }).length
}

// ============================================================================
// GENERAR URL WHATSAPP
// ============================================================================

export function generarURLWhatsApp(producto: Producto): string {
  const telefono = '34640417887'
  const mensaje = `Hola! Me interesa el *${producto.nombre}* tamaño ${producto.tamaño} por *$${producto.precioPublico.toLocaleString('es-AR')}*. ¿Está disponible?`
  
  return `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`
}

// ============================================================================
// SCHEMA AVAILABILITY
// ============================================================================

export function obtenerSchemaAvailability(stock: StockStatus): string {
  const schemaMap: Record<StockStatus, string> = {
    disponible: 'https://schema.org/InStock',
    consultar: 'https://schema.org/LimitedAvailability',
    'bajo-pedido': 'https://schema.org/PreOrder'
  }
  
  return schemaMap[stock]
}