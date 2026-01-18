// components/MetaPixel.tsx - Meta Pixel PRO para Azul Colchones
// ✅ Con tracking de engagement para mejor optimización
'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { FB_PIXEL_ID, pageview, trackScrollDepth, trackTimeOnPage } from '@/lib/pixel'

export default function MetaPixel() {
  const pathname = usePathname()
  const timeOnPageRef = useRef<number>(0)
  const maxScrollRef = useRef<number>(0)

  // Track pageview en cada cambio de ruta
  useEffect(() => {
    pageview()
    
    // Reset tracking on route change
    timeOnPageRef.current = 0
    maxScrollRef.current = 0
  }, [pathname])

  // =========================================================================
  // ENGAGEMENT TRACKING - Time on Page
  // =========================================================================
  useEffect(() => {
    const interval = setInterval(() => {
      timeOnPageRef.current += 1
      
      // Trackear milestones de tiempo
      if ([30, 60, 120, 300].includes(timeOnPageRef.current)) {
        trackTimeOnPage(timeOnPageRef.current)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [pathname])

  // =========================================================================
  // ENGAGEMENT TRACKING - Scroll Depth
  // =========================================================================
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = Math.round((scrollTop / docHeight) * 100)
      
      // Solo trackear nuevos milestones
      const milestones = [25, 50, 75, 100]
      milestones.forEach(milestone => {
        if (scrollPercent >= milestone && maxScrollRef.current < milestone) {
          maxScrollRef.current = milestone
          trackScrollDepth(milestone)
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  return (
    <>
      {/* Meta Pixel Base Code - Optimizado */}
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            
            // Init con Advanced Matching habilitado
            fbq('init', '${FB_PIXEL_ID}', {}, {
              agent: 'azulcolchones-nextjs'
            });
            
            // PageView inicial
            fbq('track', 'PageView');
            
            // Marcar como landing de Piero Fábrica si aplica
            if (window.location.pathname.includes('piero-fabrica')) {
              fbq('trackCustom', 'LandingView', {
                landing_type: 'piero-fabrica',
                timestamp: new Date().toISOString()
              });
            }
          `,
        }}
      />
      
      {/* Fallback noscript */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  )
}