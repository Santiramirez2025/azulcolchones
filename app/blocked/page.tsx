// app/blocked/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Acceso No Disponible | Azul Colchones',
  description: 'Este sitio solo está disponible para visitantes desde Argentina.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function BlockedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* Icon */}
        <div className="mb-6">
          <svg
            className="mx-auto h-16 w-16 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Content */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Acceso No Disponible
        </h1>
        
        <p className="text-gray-600 mb-6">
          Este sitio web solo está disponible para visitantes desde{' '}
          <strong className="text-blue-600">Argentina</strong>.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-gray-700">
          <p className="font-semibold mb-2">¿Estás en Argentina?</p>
          <p className="text-xs">
            Si estás usando VPN, proxy o DNS personalizado, desactivalos e intentá nuevamente.
          </p>
        </div>

        {/* Contact info */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Para consultas:{' '}
            <a 
              href="https://wa.me/5493534096566" 
              className="text-blue-600 hover:text-blue-700 font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}