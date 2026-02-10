// app/mi-cuenta/pedidos/page.tsx - SERVER COMPONENT ✅
import { Suspense } from 'react'
import type { Metadata } from 'next'
import PedidosClient from './pedidos-client'

export const metadata: Metadata = {
  title: 'Mis Pedidos | Azul Colchones',
  description: 'Historial de pedidos y seguimiento de envíos',
}

// Loading skeleton
function PedidosLoading() {
  return (
    <div className="min-h-screen bg-zinc-950 py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-8 animate-pulse">
          <div className="h-6 bg-zinc-800/50 rounded w-24 mb-4"></div>
          <div className="h-10 bg-zinc-800/50 rounded w-64 mb-2"></div>
          <div className="h-5 bg-zinc-800/30 rounded w-48"></div>
        </div>
        
        <div className="flex gap-2 mb-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-10 bg-zinc-800/30 rounded-xl w-24"></div>
          ))}
        </div>

        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-2xl animate-pulse">
              <div className="flex justify-between mb-4">
                <div>
                  <div className="h-6 bg-zinc-800/50 rounded w-32 mb-2"></div>
                  <div className="h-4 bg-zinc-800/30 rounded w-48"></div>
                </div>
                <div className="h-8 bg-zinc-800/30 rounded-full w-24"></div>
              </div>
              <div className="flex justify-between">
                <div className="h-8 bg-zinc-800/50 rounded w-20"></div>
                <div className="h-4 bg-zinc-800/30 rounded w-24"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function PedidosPage() {
  return (
    <Suspense fallback={<PedidosLoading />}>
      <PedidosClient />
    </Suspense>
  )
}