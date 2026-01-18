// lib/pixel.ts - Meta Pixel para Azul Colchones
// Pixel ID: 521139968588985

export const FB_PIXEL_ID = '521139968588985'

// Declaración de tipos para fbq
declare global {
  interface Window {
    fbq: (...args: any[]) => void
  }
}

// ============================================================================
// EVENTOS DE TRACKING
// ============================================================================

/**
 * Track PageView - Se dispara automáticamente en el layout
 */
export const pageview = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView')
  }
}

/**
 * Track Lead - Cuando hacen clic en WhatsApp (EVENTO PRINCIPAL DE CONVERSIÓN)
 */
export const trackWhatsAppClick = (params?: {
  producto?: string
  tamaño?: string
  precio?: number
  categoria?: string
}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead', {
      content_name: params?.producto || 'Consulta General',
      content_category: params?.categoria || 'Piero Fábrica',
      content_type: 'product',
      value: params?.precio || 0,
      currency: 'ARS',
      product_size: params?.tamaño || 'No especificado',
    })
  }
}

/**
 * Track ViewContent - Cuando ven detalles de un producto
 */
export const trackViewProduct = (params: {
  producto: string
  precio: number
  categoria?: string
}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'ViewContent', {
      content_name: params.producto,
      content_type: 'product',
      content_category: params.categoria || 'Colchones',
      value: params.precio,
      currency: 'ARS',
    })
  }
}

/**
 * Track evento personalizado
 */
export const trackCustomEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', eventName, params)
  }
}