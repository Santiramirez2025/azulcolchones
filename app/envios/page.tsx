// app/envios/page.tsx - ULTRA OPTIMIZED ⚡
import { Metadata } from 'next'
import { Truck, MapPin, Clock, Package, CheckCircle, AlertTriangle, Plane, Calendar, DollarSign } from 'lucide-react'

// ============================================================================
// METADATA - SEO EXHAUSTIVO 🎯
// ============================================================================

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://azulcolchones.com'

export const metadata: Metadata = {
  title: 'Envíos y Entregas | Envío Gratis Villa María | Azul Colchones',
  description: '🚚 Envío GRATIS en Villa María 24-48hs. ✅ Cotización inmediata para Córdoba y CABA ✅ Seguimiento incluido ✅ Entrega a domicilio ✅ Fabricación bajo pedido.',
  
  keywords: [
    // === CORE ===
    'envíos colchones',
    'entrega colchones',
    'envío gratis colchones',
    'entrega domicilio colchones',
    
    // === LOCAL ===
    'envío gratis villa maría',
    'entrega colchones villa maría',
    'envío córdoba',
    'envío córdoba capital',
    'envío CABA',
    'entrega rápida villa maría',
    
    // === ZONAS ===
    'envío colchones córdoba provincia',
    'envío colchones buenos aires',
    'cotización envío colchones',
    
    // === TIEMPO ===
    'entrega 24 horas',
    'envío rápido colchones',
    'días entrega colchones',
    'plazos envío',
    
    // === SERVICIOS ===
    'seguimiento pedido',
    'número tracking',
    'entrega asegurada',
    'fabricación bajo pedido',
    
    // === LONG TAIL ===
    'cuanto tarda envío colchón',
    'como rastrear mi pedido',
    'donde entregan colchones',
    'gastos envío colchones',
  ].join(', '),
  
  openGraph: {
    title: '🚚 Envíos y Entregas | Envío Gratis Villa María',
    description: 'Envío GRATIS 24-48hs en Villa María | Cotización inmediata | Entrega a domicilio',
    type: 'website',
    locale: 'es_AR',
    url: `${BASE_URL}/envios`,
    siteName: 'Azul Colchones Villa María',
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  
  alternates: {
    canonical: `${BASE_URL}/envios`,
  },
}

// ============================================================================
// STRUCTURED DATA 🎯
// ============================================================================

const shippingStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Envíos y Entregas - Azul Colchones Villa María',
  description: 'Información sobre envíos, entregas y zonas de cobertura',
  url: `${BASE_URL}/envios`,
  inLanguage: 'es-AR',
  isPartOf: {
    '@type': 'WebSite',
    name: 'Azul Colchones',
    url: BASE_URL
  },
  about: {
    '@type': 'Service',
    name: 'Servicio de Envío',
    description: 'Envío gratis en Villa María y cotización inmediata para otras zonas'
  },
  provider: {
    '@type': 'LocalBusiness',
    name: 'Azul Colchones',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Balerdi 855',
      addressLocality: 'Villa María',
      addressRegion: 'Córdoba',
      postalCode: '5900',
      addressCountry: 'AR'
    },
    telephone: '+54 9 3534 09-6566',
    areaServed: [
      {
        '@type': 'City',
        name: 'Villa María'
      },
      {
        '@type': 'State',
        name: 'Córdoba'
      }
    ]
  }
}

// ============================================================================
// CONSTANTS (memoized)
// ============================================================================

interface ShippingZone {
  zone: string
  icon: any
  price: string
  days: string
  color: string
  highlight?: boolean
  note?: string
  badge?: string
}

const SHIPPING_ZONES: ShippingZone[] = [
  {
    zone: 'Villa María',
    icon: MapPin,
    price: 'GRATIS',
    days: '24-48 horas',
    color: 'emerald',
    highlight: true,
    badge: 'Envío Gratis'
  },
  {
    zone: 'Córdoba Provincia',
    icon: MapPin,
    price: 'Cotizamos',
    days: 'Respuesta inmediata',
    color: 'blue',
    note: 'Te cotizamos en el día'
  },
  {
    zone: 'Córdoba Capital',
    icon: MapPin,
    price: 'Cotizamos',
    days: 'Respuesta inmediata',
    color: 'cyan',
    note: 'Te cotizamos en el día'
  },
  {
    zone: 'CABA',
    icon: Plane,
    price: 'Cotizamos',
    days: 'Respuesta inmediata',
    note: 'Te cotizamos en el día',
    color: 'violet'
  }
]

interface DeliveryStep {
  icon: any
  title: string
  description: string
}

const DELIVERY_STEPS: DeliveryStep[] = [
  {
    icon: Package,
    title: 'Fabricación bajo pedido',
    description: 'Tu colchón se fabrica específicamente para ti para garantizar máxima frescura y calidad'
  },
  {
    icon: Truck,
    title: 'Envasado al vacío',
    description: 'Lo enrollamos y envasamos justo antes del envío para conservar todas sus propiedades'
  },
  {
    icon: Clock,
    title: 'Envío rápido',
    description: 'Entrega en 24-48hs en Villa María (medidas especiales +1-2 días)'
  },
  {
    icon: CheckCircle,
    title: 'Entrega en domicilio',
    description: 'Directamente en la puerta de tu casa si las condiciones del edificio lo permiten'
  }
]

const IMPORTANT_NOTES: string[] = [
  'Las entregas se realizan solo de Lunes a Viernes',
  'Sábados, domingos y festivos NO son días laborables',
  'Recibirás email y WhatsApp con número de seguimiento',
  'Si no recibes tu pedido en el plazo indicado, contáctanos',
  'La ausencia en la entrega alargará el plazo'
]

// ============================================================================
// COMPONENT
// ============================================================================

export default function EnviosPage() {
  return (
    <>
      {/* ✅ STRUCTURED DATA - SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(shippingStructuredData)
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <header className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl mb-6 border border-blue-500/30">
              <Truck className="w-10 h-10 text-blue-400" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              Envíos y Entregas
            </h1>
            <p className="text-zinc-400 text-lg">Envío gratis en Villa María • Cotización inmediata para otras zonas</p>
          </header>

          {/* Important Alert */}
          <div className="mb-12 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white mb-2">⚠️ Revisa tu colchón al recibirlo</h2>
                <p className="text-zinc-300 leading-relaxed text-sm">
                  <strong className="text-white">Revisa el embalaje en el momento de la entrega.</strong> Si hay roturas o daños visibles, <strong className="text-white">rechaza la entrega</strong> y te lo enviaremos de nuevo sin coste. No se aceptan reclamaciones después de firmar el albarán.
                </p>
              </div>
            </div>
          </div>

          {/* Shipping Zones */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Zonas de Envío</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {SHIPPING_ZONES.map((zone, index) => (
                <article
                  key={index}
                  className={`bg-gradient-to-br from-zinc-900 to-zinc-950 border ${
                    zone.highlight 
                      ? 'border-emerald-500/30 ring-2 ring-emerald-500/20' 
                      : 'border-white/10'
                  } rounded-2xl p-6 hover:border-${zone.color}-500/30 transition-all text-center relative`}
                >
                  {zone.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {zone.badge}
                    </div>
                  )}
                  
                  <div className={`w-14 h-14 bg-${zone.color}-500/10 rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <zone.icon className={`w-7 h-7 text-${zone.color}-400`} />
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-2">{zone.zone}</h3>
                  
                  <div className={`text-3xl font-black mb-2 ${
                    zone.price === 'GRATIS' ? 'text-emerald-400' : 'text-white'
                  }`}>
                    {zone.price}
                  </div>
                  
                  <p className="text-sm text-zinc-400 mb-2">{zone.days}</p>
                  
                  {zone.note && (
                    <p className="text-xs text-zinc-500 mt-3 border-t border-white/10 pt-3">
                      {zone.note}
                    </p>
                  )}
                </article>
              ))}
            </div>

            {/* Cotización Info */}
            <div className="mt-8 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Cotización de Envíos</h3>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    Para Córdoba Provincia, Córdoba Capital y CABA, <strong className="text-white">te cotizamos el envío el mismo día</strong> que nos consultes. Envianos tu dirección exacta por WhatsApp o email y recibirás el presupuesto de envío de inmediato.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Delivery Process */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Proceso de Entrega</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {DELIVERY_STEPS.map((step, index) => (
                <article
                  key={index}
                  className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-all relative"
                >
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
                    <step.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{step.description}</p>
                </article>
              ))}
            </div>
          </section>

          {/* Important Information */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Delivery Days */}
            <article className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-violet-400" />
                </div>
                <h2 className="text-xl font-bold text-white">Días de Entrega</h2>
              </div>
              
              <ul className="space-y-2">
                {IMPORTANT_NOTES.map((note, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                    <CheckCircle className="w-4 h-4 text-violet-400 flex-shrink-0 mt-0.5" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </article>

            {/* Special Measures */}
            <article className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center">
                  <Package className="w-6 h-6 text-cyan-400" />
                </div>
                <h2 className="text-xl font-bold text-white">Medidas Especiales</h2>
              </div>
              
              <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                Los colchones con largos y anchos especiales (medidas menos frecuentes) pueden tardar <strong className="text-white">1-2 días adicionales</strong> de lo previsto debido a su fabricación personalizada.
              </p>
              
              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3">
                <p className="text-xs text-cyan-400 font-semibold">
                  💡 Fabricamos cada colchón bajo pedido para garantizar máxima calidad
                </p>
              </div>
            </article>
          </div>

          {/* Change Address Warning */}
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-amber-500/20 rounded-2xl p-6 mb-12">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white mb-2">Cambio de Dirección</h2>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  Los cambios de dirección tras el envío pueden generar <strong className="text-white">gastos adicionales</strong> que deberá asumir el comprador. Estos gastos no serán reembolsados aunque se ejerza el derecho de devolución.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <section className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">¿Necesitas cotizar tu envío?</h2>
            <p className="text-zinc-300 mb-6">
              Contáctanos y te respondemos en el día con el costo exacto de envío a tu zona
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="mailto:hola@azulcolchones.com"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-all border border-white/10"
              >
                <Package className="w-5 h-5" />
                hola@azulcolchones.com
              </a>
              <a 
                href="tel:+5493534096566"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg"
              >
                <Truck className="w-5 h-5" />
                +54 9 3534 09-6566
              </a>
            </div>
          </section>

          {/* Footer Note */}
          <footer className="mt-12 text-center">
            <p className="text-sm text-zinc-500">
              Todos los colchones incluyen número de seguimiento · Entrega asegurada
            </p>
          </footer>
        </div>
      </div>
    </>
  )
}