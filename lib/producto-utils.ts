import { Producto } from '@/data/productos'

// ============================================================================
// HELPERS DE CÁLCULO
// ============================================================================

export function calcularAhorro(precioML: number, precioFabrica: number): {
  ahorro: number
  ahorroPorc: number
} {
  const ahorro = precioML - precioFabrica
  const ahorroPorc = Math.round((ahorro / precioML) * 100)
  return { ahorro, ahorroPorc }
}

export function enrichProductWithSavings(producto: Producto): Producto {
  if (producto.precioMercadoLibre) {
    const { ahorro, ahorroPorc } = calcularAhorro(
      producto.precioMercadoLibre,
      producto.precioPublico
    )
    return { ...producto, ahorro, ahorroPorc }
  }
  return producto
}

// ============================================================================
// HELPERS DE FILTRADO
// ============================================================================

export type FiltroTamaño = 'todos' | 'plaza' | 'plaza-media' | 'queen' | 'king' | 'accesorios'

export function filtrarProductos(productos: Producto[], filtro: FiltroTamaño): Producto[] {
  if (filtro === 'todos') return productos

  return productos.filter((producto) => {
    switch (filtro) {
      case 'plaza':
        return producto.tamaño.includes('1 plaza') && !producto.tamaño.includes('1½')
      
      case 'plaza-media':
        return (
          producto.tamaño.includes('1½ plaza') ||
          (producto.tamaño.includes('140') && producto.tipo === 'colchon')
        )
      
      case 'queen':
        return (
          producto.tamaño.includes('Queen') ||
          (producto.tamaño.includes('160') && producto.tipo === 'colchon') ||
          (producto.tamaño.includes('180') && producto.tipo === 'colchon')
        )
      
      case 'king':
        return (
          producto.tamaño.includes('King') ||
          (producto.tamaño.includes('200x200') && producto.tipo === 'colchon')
        )
      
      case 'accesorios':
        return producto.categoria === 'accesorio'
      
      default:
        return true
    }
  })
}

// ============================================================================
// HELPERS DE URL
// ============================================================================

export function generarURLWhatsApp(producto: Producto): string {
  const mensaje = `Hola! Consulto por ${producto.nombre} ${producto.tamaño} a $${producto.precioPublico.toLocaleString('es-AR')}`
  return `https://wa.me/5493534017332?text=${encodeURIComponent(mensaje)}`
}

// ============================================================================
// HELPERS DE FORMATO
// ============================================================================

export function formatearPrecio(precio: number): string {
  return `$${precio.toLocaleString('es-AR')}`
}

export function obtenerSchemaAvailability(stock: Producto['stock']): string {
  const schemaMap = {
    disponible: 'https://schema.org/InStock',
    consultar: 'https://schema.org/PreOrder',
    'bajo-pedido': 'https://schema.org/PreSale'
  }
  return schemaMap[stock]
}