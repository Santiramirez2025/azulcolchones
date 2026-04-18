import type { Metadata } from 'next'
import Link from 'next/link'
import AsesorColchon from '@/app/piero-fabrica/AsesorColchon'

export const metadata: Metadata = {
  title: 'Asesor Personal de Colchones — Azul Colchones Villa María',
  description: 'Encontrá tu colchón Piero ideal en 30 segundos. Respondé 3 preguntas y te recomendamos el modelo perfecto según tu peso, postura y medida. Cuotas sin interés.',
  openGraph: {
    title: 'Asesor Personal de Colchones — Azul Colchones',
    description: 'Encontrá tu colchón Piero ideal en 30 segundos. 3 preguntas, recomendación personalizada.',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function AsesorPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-950 via-blue-950/30 to-zinc-950">
      {/* Decoración de fondo */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 py-8 md:py-16">
        
        {/* Header con marca */}
        <header className="text-center mb-8 md:mb-12">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-300 text-sm mb-8 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al inicio
          </Link>

          {/* Logo / Marca */}
          <div className="inline-block mb-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-full">
              <span className="text-amber-400 text-xs font-black uppercase tracking-widest">
                Distribuidor Oficial Piero
              </span>
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white mb-3 leading-tight">
            Encontrá tu <span className="text-blue-400">colchón ideal</span>
          </h1>
          <p className="text-base md:text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Respondé 3 preguntas simples y te recomendamos el modelo Piero perfecto para vos. Sin vueltas.
          </p>

          {/* Badges de confianza */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900/60 border border-zinc-700/50 rounded-full text-xs text-zinc-400">
              <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">30 segundos</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900/60 border border-zinc-700/50 rounded-full text-xs text-zinc-400">
              <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" />
              </svg>
              <span className="font-semibold">100% gratis</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900/60 border border-zinc-700/50 rounded-full text-xs text-zinc-400">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">Sin compromiso</span>
            </div>
          </div>
        </header>

        {/* Asesor */}
        <AsesorColchon />

        {/* Footer info */}
        <footer className="mt-12 md:mt-16 text-center">
          <div className="inline-block px-6 py-4 bg-zinc-900/40 border border-zinc-800 rounded-xl">
            <p className="text-xs md:text-sm text-zinc-500 mb-2">
              ¿Necesitás ayuda personalizada?
            </p>
            <a
              href="https://wa.me/5493534017332?text=Hola!%20Quiero%20asesoramiento%20personalizado%20para%20elegir%20un%20colch%C3%B3n"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 text-sm font-bold transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Escribinos por WhatsApp
            </a>
          </div>

          <p className="mt-6 text-xs text-zinc-600">
            Azul Colchones · Distribuidor Oficial Exclusivo Piero · Villa María, Córdoba
          </p>
        </footer>

      </div>
    </main>
  )
}