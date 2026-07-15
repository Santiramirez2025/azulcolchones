// app/checkout/pendiente/page.tsx — Back URL de pago pendiente
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pago pendiente | Azul Colchones',
  robots: { index: false, follow: false },
}

export default function CheckoutPendingPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/15 text-3xl">
          🕓
        </div>
        <h1 className="text-2xl font-black">Tu pago está pendiente</h1>
        <p className="mt-2 text-zinc-400">
          Algunos medios (efectivo, transferencia) tardan en acreditarse. Apenas se confirme, te
          enviamos el email con el detalle de tu pedido.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/catalogo"
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-500"
          >
            Volver al catálogo
          </Link>
          <a
            href="https://wa.me/5493534096566"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-zinc-700 px-5 py-3 font-semibold text-white hover:bg-zinc-800"
          >
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </main>
  )
}
