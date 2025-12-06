// lib/hooks/useAnalytics.ts
// Hook centralizado de analytics con soporte para múltiples plataformas
'use client'

import { useCallback, useEffect } from 'react'

interface AnalyticsEvent {
  event: string
  category?: string
  label?: string
  value?: number
  [key: string]: any
}

interface EcommerceItem {
  item_id: string
  item_name: string
  item_variant?: string
  item_category?: string
  price: number
  quantity: number
  discount?: number
}

interface EcommerceData {
  currency: string
  value: number
  items: EcommerceItem[]
  coupon?: string
  shipping?: number
  tax?: number
  transaction_id?: string
}

export function useAnalytics() {
  /**
   * Track evento genérico
   */
  const trackEvent = useCallback((eventName: string, params?: Record<string, any>) => {
    try {
      const timestamp = new Date().toISOString()
      
      // Google Analytics 4
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', eventName, {
          timestamp,
          ...params
        })
      }
      
      // Meta Pixel
      if (typeof window !== 'undefined' && (window as any).fbq) {
        const fbEventMap: { [key: string]: string } = {
          'view_item': 'ViewContent',
          'add_to_cart': 'AddToCart',
          'begin_checkout': 'InitiateCheckout',
          'add_payment_info': 'AddPaymentInfo',
          'purchase': 'Purchase',
          'search': 'Search',
          'view_item_list': 'ViewContent'
        }
        
        let fbEventName: string = eventName
        const mappedEvent = fbEventMap[eventName]
        if (mappedEvent !== undefined) {
          fbEventName = mappedEvent
        }
        
        (window as any).fbq('track', fbEventName, params)
      }
      
      // Datadog RUM
      if (typeof window !== 'undefined' && (window as any).DD_RUM) {
        (window as any).DD_RUM.addAction(eventName, {
          timestamp,
          ...params
        })
      }
      
      // Console log en desarrollo
      if (process.env.NODE_ENV === 'development') {
        console.log('[Analytics]', eventName, params)
      }
    } catch (error) {
      console.error('[Analytics] Error tracking event:', error)
    }
  }, [])

  /**
   * Track view de producto
   */
  const trackProductView = useCallback((product: {
    id: string
    name: string
    category?: string
    price: number
    variant?: string
  }) => {
    trackEvent('view_item', {
      currency: 'ARS',
      value: product.price,
      items: [{
        item_id: product.id,
        item_name: product.name,
        item_category: product.category,
        item_variant: product.variant,
        price: product.price,
        quantity: 1
      }]
    })
  }, [trackEvent])

  /**
   * Track añadir al carrito
   */
  const trackAddToCart = useCallback((data: EcommerceData) => {
    trackEvent('add_to_cart', data)
  }, [trackEvent])

  /**
   * Track remover del carrito
   */
  const trackRemoveFromCart = useCallback((data: EcommerceData) => {
    trackEvent('remove_from_cart', data)
  }, [trackEvent])

  /**
   * Track inicio de checkout
   */
  const trackBeginCheckout = useCallback((data: EcommerceData) => {
    trackEvent('begin_checkout', data)
  }, [trackEvent])

  /**
   * Track información de pago
   */
  const trackAddPaymentInfo = useCallback((paymentType: string, data: EcommerceData) => {
    trackEvent('add_payment_info', {
      ...data,
      payment_type: paymentType
    })
  }, [trackEvent])

  /**
   * Track compra completada
   */
  const trackPurchase = useCallback((data: EcommerceData & { transaction_id: string }) => {
    trackEvent('purchase', data)
  }, [trackEvent])

  /**
   * Track búsqueda
   */
  const trackSearch = useCallback((searchTerm: string, results?: number) => {
    trackEvent('search', {
      search_term: searchTerm,
      search_results: results
    })
  }, [trackEvent])

  /**
   * Track aplicación de cupón
   */
  const trackApplyCoupon = useCallback((couponCode: string, discount: number) => {
    trackEvent('coupon_applied', {
      coupon_code: couponCode,
      discount_amount: discount
    })
  }, [trackEvent])

  /**
   * Track selección de método de pago
   */
  const trackSelectPaymentMethod = useCallback((method: string, data?: Record<string, any>) => {
    trackEvent('select_promotion', {
      promotion_name: method,
      creative_name: 'payment_method_selector',
      ...data
    })
  }, [trackEvent])

  /**
   * Track share en redes sociales
   */
  const trackShare = useCallback((method: string, content_type: string, item_id: string) => {
    trackEvent('share', {
      method,
      content_type,
      item_id
    })
  }, [trackEvent])

  /**
   * Track sign up
   */
  const trackSignUp = useCallback((method: string) => {
    trackEvent('sign_up', {
      method
    })
  }, [trackEvent])

  /**
   * Track login
   */
  const trackLogin = useCallback((method: string) => {
    trackEvent('login', {
      method
    })
  }, [trackEvent])

  /**
   * Track error
   */
  const trackError = useCallback((error: {
    type: string
    message: string
    fatal?: boolean
  }) => {
    trackEvent('error', {
      error_type: error.type,
      error_message: error.message,
      error_fatal: error.fatal || false
    })
  }, [trackEvent])

  /**
   * Track tiempo en página
   */
  const trackTimeOnPage = useCallback((page: string, seconds: number) => {
    trackEvent('time_on_page', {
      page,
      duration_seconds: seconds
    })
  }, [trackEvent])

  return {
    trackEvent,
    trackProductView,
    trackAddToCart,
    trackRemoveFromCart,
    trackBeginCheckout,
    trackAddPaymentInfo,
    trackPurchase,
    trackSearch,
    trackApplyCoupon,
    trackSelectPaymentMethod,
    trackShare,
    trackSignUp,
    trackLogin,
    trackError,
    trackTimeOnPage
  }
}

/**
 * Hook para tracking de página view automático
 */
export function usePageTracking(pageName: string) {
  const { trackEvent, trackTimeOnPage } = useAnalytics()
  
  useEffect(() => {
    // Track page view
    trackEvent('page_view', {
      page_title: pageName,
      page_location: window.location.href,
      page_path: window.location.pathname
    })
    
    // Track time on page
    const startTime = Date.now()
    
    return () => {
      const seconds = Math.round((Date.now() - startTime) / 1000)
      trackTimeOnPage(pageName, seconds)
    }
  }, [pageName, trackEvent, trackTimeOnPage])
}

/**
 * Hook para tracking de scroll depth
 */
export function useScrollTracking(threshold: number = 75) {
  const { trackEvent } = useAnalytics()
  
  useEffect(() => {
    let maxScroll = 0
    let tracked = false
    
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY
      
      const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100
      
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent
      }
      
      if (scrollPercent >= threshold && !tracked) {
        trackEvent('scroll_depth', {
          percent: threshold,
          page: window.location.pathname
        })
        tracked = true
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      
      // Track final scroll depth
      if (maxScroll > 0) {
        trackEvent('final_scroll_depth', {
          percent: Math.round(maxScroll),
          page: window.location.pathname
        })
      }
    }
  }, [threshold, trackEvent])
}