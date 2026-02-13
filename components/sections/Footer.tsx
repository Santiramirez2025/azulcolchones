'use client'

import Link from 'next/link'
import { Instagram, Facebook, MapPin, Clock } from 'lucide-react'

// ============================================================================
// FOOTER - OPTIMIZADO PROFESIONALMENTE
// ============================================================================

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-zinc-950 border-t border-zinc-800/50">
      
      {/* Background glow sutil */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[600px] h-[600px] bg-blue-600/3 rounded-full blur-[180px] -bottom-32 left-1/4"></div>
      </div>

      <div className="relative">
        {/* Trust Bar Superior */}
        <div className="border-b border-zinc-800/50 bg-zinc-900/30 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-8 md:py-10">
              
              {/* Garantía PIERO */}
              <div className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold text-base mb-1">Garantía PIERO</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">5-10 años oficial</p>
                </div>
              </div>

              {/* Envío Gratis */}
              <div className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold text-base mb-1">Envío Gratis</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">Villa María y zona</p>
                </div>
              </div>

              {/* 12 Cuotas */}
              <div className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold text-base mb-1">12 Cuotas</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">Sin interés</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
            
            {/* Brand Column */}
            <div className="lg:col-span-5">
              {/* Logo & Tagline */}
              <div className="mb-6">
                <Link href="/" className="inline-block group mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-white font-black text-xl tracking-tight">
                        AZUL<span className="text-zinc-400 font-medium">Colchones</span>
                      </div>
                      <div className="text-xs text-zinc-500 font-medium uppercase tracking-wide">
                        Villa María • Desde 1989
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Badge Distribuidor */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-gradient-to-r from-amber-500/10 via-amber-500/15 to-amber-500/10 border border-amber-500/40 rounded-xl mb-6">
                <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <div>
                  <div className="text-amber-300 font-bold text-sm leading-tight">DISTRIBUIDOR OFICIAL</div>
                  <div className="text-amber-400/80 text-xs font-semibold">PIERO • 37+ años</div>
                </div>
              </div>

              {/* Description */}
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                Colchones PIERO directo de fábrica con hasta{' '}
                <strong className="text-zinc-300">49% OFF</strong>. Tu mejor descanso al mejor precio.
              </p>

              {/* WhatsApp Button */}
              <a
                href="https://wa.me/5493534096566?text=Hola!%20Quiero%20consultar%20por%20colchones"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-6 py-3.5 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-bold rounded-xl transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-green-600/30 shadow-lg shadow-green-600/20"
              >
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Consultar por WhatsApp
              </a>
            </div>

            {/* COMPRAR Column */}
            <div className="lg:col-span-2">
              <h3 className="text-white font-black text-sm uppercase tracking-wider mb-5">Comprar</h3>
              <nav className="space-y-3">
                <Link 
                  href="/piero-fabrica"
                  className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm"
                >
                  <span className="text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  <span>Piero Fábrica</span>
                  <span className="text-xs px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-md border border-emerald-500/30 font-semibold">
                    Hasta 49% OFF
                  </span>
                </Link>
              </nav>
            </div>

            {/* AYUDA Column */}
            <div className="lg:col-span-2">
              <h3 className="text-white font-black text-sm uppercase tracking-wider mb-5">Ayuda</h3>
              <nav className="space-y-3">
                <Link 
                  href="/contacto"
                  className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm"
                >
                  <span className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  <span>Contacto</span>
                </Link>
                <a 
                  href="https://wa.me/5493534096566"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm"
                >
                  <span className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  <span>WhatsApp</span>
                </a>
              </nav>
            </div>

            {/* LEGAL Column */}
            <div className="lg:col-span-3">
              <h3 className="text-white font-black text-sm uppercase tracking-wider mb-5">Legal</h3>
              <nav className="space-y-3 mb-6">
                <Link 
                  href="/terminos"
                  className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm"
                >
                  <span className="text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  <span>Términos</span>
                </Link>
                <Link 
                  href="/privacidad"
                  className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm"
                >
                  <span className="text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  <span>Privacidad</span>
                </Link>
                <Link 
                  href="/defensa-consumidor"
                  className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm"
                >
                  <span className="text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  <span>Defensa Consumidor</span>
                </Link>
              </nav>

              {/* Location & Hours */}
              <div className="space-y-3">
                <div className="flex items-start gap-2.5 text-zinc-400 text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-zinc-500" />
                  <span className="leading-relaxed">Balerdi 855, Villa María, Córdoba</span>
                </div>
                <div className="flex items-start gap-2.5 text-zinc-400 text-sm">
                  <Clock className="w-4 h-4 mt-0.5 flex-shrink-0 text-zinc-500" />
                  <div className="leading-relaxed">
                    <div>Lun-Vie 9-19hs</div>
                    <div>Sáb 9-13hs</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              
              {/* Copyright */}
              <div className="text-zinc-500 text-sm text-center sm:text-left">
                © {currentYear} Azul Colchones · Villa María, Córdoba
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com/azulcolchones"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-zinc-800/50 hover:bg-zinc-700 border border-zinc-700/50 hover:border-zinc-600 flex items-center justify-center transition-all hover:scale-105"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4 text-zinc-400" />
                </a>
                <a
                  href="https://www.facebook.com/azulcolchones"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-zinc-800/50 hover:bg-zinc-700 border border-zinc-700/50 hover:border-zinc-600 flex items-center justify-center transition-all hover:scale-105"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4 text-zinc-400" />
                </a>
              </div>

              {/* Badges */}
              <div className="flex items-center gap-2">
                <Link 
                  href="https://www.efectivo.com.ar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-zinc-800/50 hover:bg-zinc-700 border border-zinc-700/50 rounded-md text-xs text-zinc-400 hover:text-zinc-300 font-medium transition-all"
                >
                  Efectivo
                </Link>
                <Link 
                  href="https://www.transferencia.com.ar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-zinc-800/50 hover:bg-zinc-700 border border-zinc-700/50 rounded-md text-xs text-zinc-400 hover:text-zinc-300 font-medium transition-all"
                >
                  Transferencia
                </Link>
                <Link 
                  href="https://www.tarjetas.com.ar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-zinc-800/50 hover:bg-zinc-700 border border-zinc-700/50 rounded-md text-xs text-zinc-400 hover:text-zinc-300 font-medium transition-all"
                >
                  Tarjetas
                </Link>
                <Link 
                  href="https://www.mercadopago.com.ar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-zinc-800/50 hover:bg-zinc-700 border border-zinc-700/50 rounded-md text-xs text-zinc-400 hover:text-zinc-300 font-medium transition-all"
                >
                  MercadoPago
                </Link>
              </div>

            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}