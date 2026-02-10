// components/TikTokPixel.tsx
'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

declare global {
  interface Window {
    ttq?: {
      load: (pixelId: string) => void
      page: () => void
      track: (event: string, data?: Record<string, unknown>) => void
    }
  }
}

export default function TikTokPixel() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const pixelId = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID

  useEffect(() => {
    if (!pixelId) return

    // Initialize TikTok Pixel
    if (typeof window !== 'undefined' && !window.ttq) {
      ;(function(w: Window, d: Document, t: string) {
        w.ttq = w.ttq || {
          load: function(pixelId: string) {
            const script = d.createElement('script')
            script.type = 'text/javascript'
            script.async = true
            script.src = 'https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=' + pixelId + '&lib=' + t
            const firstScript = d.getElementsByTagName('script')[0]
            firstScript.parentNode?.insertBefore(script, firstScript)
          },
          page: function() {},
          track: function() {}
        }
        w.ttq.load(pixelId)
        w.ttq.page()
      })(window, document, 'ttq')
    }
  }, [pixelId])

  useEffect(() => {
    if (!pixelId || typeof window === 'undefined' || !window.ttq) return

    // Track page views on route change
    window.ttq.page()
  }, [pathname, searchParams, pixelId])

  return null
}