'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

// ============================================================================
// ICONS - Coherentes con Header
// ============================================================================

const Icons = {
  Shield: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
  Truck: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>
  ),
  CreditCard: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
    </svg>
  ),
  WhatsApp: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  ),
  Moon: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M21.64 13a1 1 0 00-1.05-.14 8.05 8.05 0 01-3.37.73 8.15 8.15 0 01-8.14-8.1 8.59 8.59 0 01.25-2A1 1 0 008 2.36a10.14 10.14 0 1014 11.69 1 1 0 00-.36-1.05z" />
    </svg>
  ),
  MapPin: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  ),
  Clock: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Instagram: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  ),
  Facebook: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
}

// ============================================================================
// CONFIG - COHERENTE CON HEADER
// ============================================================================

const CONFIG = {
  whatsapp: '5493534096566',
  whatsappMessage: 'Hola! Quiero consultar por colchones PIERO',
  phone: '+54 9 3534 09-6566',
  email: 'info@azulcolchones.com',
  address: 'Balerdi 855',
  location: 'Villa María, Córdoba',
  schedule: 'Lun-Vie 9-19hs · Sáb 9-13hs',
  years: '35+',
  instagram: 'https://instagram.com/azulcolchones1991',
  facebook: 'https://facebook.com/azulcolchones',
} as const

// ============================================================================
// SCHEMA SEO - SIN DATOS FALSOS
// ============================================================================

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Azul Colchones",
  "description": "Colchones PIERO en Villa María. Stock inmediato y directo de fábrica hasta 22% OFF.",
  "url": "https://azulcolchones.com",
  "telephone": CONFIG.phone,
  "email": CONFIG.email,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": CONFIG.address,
    "addressLocality": "Villa María",
    "addressRegion": "Córdoba",
    "addressCountry": "AR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -32.4115,
    "longitude": -63.2407
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "19:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "09:00",
      "closes": "13:00"
    }
  ],
  "sameAs": [
    CONFIG.instagram,
    CONFIG.facebook
  ]
}

// ============================================================================
// FOOTER COMPONENT - LIMPIO Y COHERENTE
// ============================================================================

export default function Footer() {
  const pathname = usePathname()

  if (pathname?.startsWith('/admin')) return null

  const whatsappUrl = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <footer className="bg-zinc-950 border-t border-zinc-800">
        
        {/* ============================================================ */}
        {/* TRUST BADGES - COMPACTO                                      */}
        {/* ============================================================ */}
        <div className="border-b border-zinc-800/50">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <Icons.Shield className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Garantía PIERO</p>
                  <p className="text-xs text-zinc-500">5-10 años oficial</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <Icons.Truck className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Envío Gratis</p>
                  <p className="text-xs text-zinc-500">Villa María y zona</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <Icons.CreditCard className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">12 Cuotas</p>
                  <p className="text-xs text-zinc-500">Sin interés</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* MAIN CONTENT                                                 */}
        {/* ============================================================ */}
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* COL 1: Logo + Info (5 cols) */}
            <div className="md:col-span-5">
              
              {/* Logo - COHERENTE CON HEADER */}
              <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/25">
                  <Icons.Moon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-lg font-black text-white">
                    Azul<span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">Colchones</span>
                  </span>
                  <span className="block text-[9px] font-semibold text-zinc-500 uppercase tracking-wider">
                    {CONFIG.years} años en {CONFIG.location}
                  </span>
                </div>
              </Link>

              <p className="text-sm text-zinc-500 mb-5 max-w-sm">
                Colchones PIERO con stock inmediato o directo de fábrica hasta 22% OFF. 
                Tu mejor descanso al mejor precio.
              </p>

              {/* WhatsApp CTA - COHERENTE */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-green-600 hover:bg-green-500 text-white font-bold text-sm rounded-xl transition-all hover:scale-105 shadow-lg shadow-green-500/25 mb-5"
              >
                <Icons.WhatsApp className="w-5 h-5" />
                <span>Consultar por WhatsApp</span>
              </a>

              {/* Info */}
              <div className="space-y-2 text-sm text-zinc-500">
                <div className="flex items-center gap-2">
                  <Icons.MapPin className="w-4 h-4 text-zinc-600" />
                  <span>{CONFIG.address}, {CONFIG.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icons.Clock className="w-4 h-4 text-zinc-600" />
                  <span>{CONFIG.schedule}</span>
                </div>
              </div>

              {/* Social */}
              <div className="flex items-center gap-2 mt-4">
                <a
                  href={CONFIG.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white hover:border-zinc-700 transition-all"
                  aria-label="Instagram"
                >
                  <Icons.Instagram className="w-4 h-4" />
                </a>
                <a
                  href={CONFIG.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white hover:border-zinc-700 transition-all"
                  aria-label="Facebook"
                >
                  <Icons.Facebook className="w-4 h-4" />
                </a>
              </div>

            </div>

            {/* COL 2: Comprar - COHERENTE CON HEADER (3 cols) */}
            <div className="md:col-span-3">
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4">
                Comprar
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/catalogo" className="text-sm text-zinc-500 hover:text-white transition-colors">
                    Stock Inmediato
                    <span className="block text-xs text-blue-400">Entrega hoy</span>
                  </Link>
                </li>
                <li>
                  <Link href="/piero-fabrica" className="text-sm text-zinc-500 hover:text-white transition-colors">
                    Piero Fábrica
                    <span className="block text-xs text-green-400">Hasta 22% OFF</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* COL 3: Ayuda (2 cols) */}
            <div className="md:col-span-2">
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4">
                Ayuda
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/contacto" className="text-sm text-zinc-500 hover:text-white transition-colors">
                    Contacto
                  </Link>
                </li>
                <li>
                  <a 
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-zinc-500 hover:text-white transition-colors"
                  >
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>

            {/* COL 4: Legal (2 cols) */}
            <div className="md:col-span-2">
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4">
                Legal
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/terminos" className="text-sm text-zinc-500 hover:text-white transition-colors">
                    Términos
                  </Link>
                </li>
                <li>
                  <Link href="/privacidad" className="text-sm text-zinc-500 hover:text-white transition-colors">
                    Privacidad
                  </Link>
                </li>
                <li>
                  <a 
                    href="https://www.argentina.gob.ar/produccion/defensadelconsumidor"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-zinc-500 hover:text-white transition-colors"
                  >
                    Defensa Consumidor
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* ============================================================ */}
        {/* BOTTOM BAR                                                   */}
        {/* ============================================================ */}
        <div className="border-t border-zinc-800/50">
          <div className="max-w-6xl mx-auto px-4 py-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              
              {/* Copyright */}
              <p className="text-xs text-zinc-600">
                © {new Date().getFullYear()} Azul Colchones · {CONFIG.location}
              </p>

              {/* Métodos de pago */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-zinc-600 mr-1">Pagos:</span>
                {['Efectivo', 'Transferencia', 'Tarjetas', 'MercadoPago'].map((method) => (
                  <span
                    key={method}
                    className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded text-[10px] text-zinc-500 font-medium"
                  >
                    {method}
                  </span>
                ))}
              </div>

            </div>
          </div>
        </div>

      </footer>
    </>
  )
}