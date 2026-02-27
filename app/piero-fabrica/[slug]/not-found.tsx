// app/piero-fabrica/[slug]/not-found.tsx

import Link from 'next/link'

export default function ProductoNoEncontrado() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">🛏️</div>
        <h1 className="text-2xl font-black text-white mb-3">
          Producto no encontrado
        </h1>
        <p className="text-zinc-400 mb-8">
          Este colchón no está disponible o la dirección es incorrecta. 
          Explorá nuestro catálogo completo de PIERO.
        </p>
        <Link
          href="/piero-fabrica"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Ver catálogo PIERO
        </Link>
      </div>
    </div>
  )
}