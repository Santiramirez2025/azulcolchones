// lib/pixel.ts - Meta Pixel PRO para Azul Colchones
// Pixel ID: 521139968588985
// ✅ Optimizado para máximo aprendizaje de Meta Ads

export const FB_PIXEL_ID = '521139968588985'

// Declaración de tipos para fbq
declare global {
  interface Window {
    fbq: (...args: any[]) => void
  }
}

// ============================================================================
// UTILIDAD: Generar Event ID único para deduplicación
// ============================================================================
const generateEventId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`
}

// ============================================================================
// UTILIDAD: Generar Content ID consistente para catálogo
// ============================================================================
const generateContentId = (nombre: string, tamaño: string): string => {
  return `${nombre.toLowerCase().replace(/\s+/g, '-')}-${tamaño.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`
}

// ============================================================================
// PAGEVIEW - Tracking automático de páginas
// ============================================================================
export const pageview = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView')
  }
}

// ============================================================================
// VIEW CONTENT - Cuando ven un producto (IMPORTANTE PARA FUNNEL)
// ============================================================================
export const trackViewContent = (params: {
  producto: string
  tamaño: string
  precio: number
  categoria: string
  precioMercadoLibre?: number
}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    const eventId = generateEventId()
    const contentId = generateContentId(params.producto, params.tamaño)
    
    window.fbq('track', 'ViewContent', {
      content_name: params.producto,
      content_ids: [contentId],
      content_type: 'product',
      content_category: params.categoria,
      value: params.precio,
      currency: 'ARS',
      // Datos extra para análisis
      contents: [{
        id: contentId,
        quantity: 1,
        item_price: params.precio
      }],
      custom_data: {
        product_size: params.tamaño,
        competitor_price: params.precioMercadoLibre || 0,
        savings: params.precioMercadoLibre ? params.precioMercadoLibre - params.precio : 0
      }
    }, { eventID: eventId })
  }
}

// ============================================================================
// 🎯 LEAD - CONVERSIÓN PRINCIPAL (Clic en WhatsApp)
// Optimizado con todos los parámetros para máximo aprendizaje
// ============================================================================
export const trackWhatsAppClick = (params?: {
  producto?: string
  tamaño?: string
  precio?: number
  categoria?: string
  precioMercadoLibre?: number
}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    const eventId = generateEventId()
    const contentId = params?.producto && params?.tamaño 
      ? generateContentId(params.producto, params.tamaño)
      : 'consulta-general'
    
    // =========================================================================
    // EVENTO LEAD - Parámetros optimizados para Meta
    // =========================================================================
    window.fbq('track', 'Lead', {
      // Identificación del producto (CRÍTICO para optimización)
      content_name: params?.producto || 'Consulta General Piero Fábrica',
      content_ids: [contentId],
      content_type: 'product',
      content_category: params?.categoria || 'piero-fabrica',
      
      // VALOR DE CONVERSIÓN (CRÍTICO para ROAS)
      // Meta usa esto para optimizar por valor
      value: params?.precio || 0,
      currency: 'ARS',
      
      // Datos del producto en formato array (mejor para catálogo)
      contents: [{
        id: contentId,
        quantity: 1,
        item_price: params?.precio || 0
      }],
      
      // Datos personalizados para análisis
      product_size: params?.tamaño || 'No especificado',
      lead_source: 'whatsapp',
      page_url: typeof window !== 'undefined' ? window.location.href : '',
      
    }, { eventID: eventId })

    // =========================================================================
    // También disparar InitiateCheckout (señal adicional de intención)
    // =========================================================================
    if (params?.precio && params.precio > 0) {
      window.fbq('track', 'InitiateCheckout', {
        content_name: params.producto,
        content_ids: [contentId],
        content_type: 'product',
        value: params.precio,
        currency: 'ARS',
        num_items: 1
      }, { eventID: `${eventId}-checkout` })
    }

    // Log para debugging (remover en producción si querés)
    console.log('🎯 Meta Pixel Lead:', {
      eventId,
      contentId,
      producto: params?.producto,
      precio: params?.precio,
      categoria: params?.categoria
    })
  }
}

// ============================================================================
// ADD TO CART - Opcional, para productos agregados
// ============================================================================
export const trackAddToCart = (params: {
  producto: string
  tamaño: string
  precio: number
  categoria: string
}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    const eventId = generateEventId()
    const contentId = generateContentId(params.producto, params.tamaño)
    
    window.fbq('track', 'AddToCart', {
      content_name: params.producto,
      content_ids: [contentId],
      content_type: 'product',
      content_category: params.categoria,
      value: params.precio,
      currency: 'ARS',
      contents: [{
        id: contentId,
        quantity: 1,
        item_price: params.precio
      }]
    }, { eventID: eventId })
  }
}

// ============================================================================
// SEARCH - Cuando usan los filtros
// ============================================================================
export const trackSearch = (searchTerm: string, resultsCount: number) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Search', {
      search_string: searchTerm,
      content_category: 'colchones-piero',
      contents_count: resultsCount
    })
  }
}

// ============================================================================
// CUSTOM EVENT - Para eventos específicos
// ============================================================================
export const trackCustomEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.fbq) {
    const eventId = generateEventId()
    window.fbq('trackCustom', eventName, {
      ...params,
      timestamp: new Date().toISOString()
    }, { eventID: eventId })
  }
}

// ============================================================================
// SCROLL DEPTH - Engagement tracking
// ============================================================================
export const trackScrollDepth = (percentage: number) => {
  if (typeof window !== 'undefined' && window.fbq) {
    if (percentage === 25 || percentage === 50 || percentage === 75 || percentage === 100) {
      window.fbq('trackCustom', 'ScrollDepth', {
        scroll_percentage: percentage,
        page_url: window.location.href
      })
    }
  }
}

// ============================================================================
// TIME ON PAGE - Engagement tracking
// ============================================================================
export const trackTimeOnPage = (seconds: number) => {
  if (typeof window !== 'undefined' && window.fbq) {
    // Trackear a los 30s, 60s, 120s, 300s
    if ([30, 60, 120, 300].includes(seconds)) {
      window.fbq('trackCustom', 'TimeOnPage', {
        time_seconds: seconds,
        page_url: window.location.href
      })
    }
  }
}