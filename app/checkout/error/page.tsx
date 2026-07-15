// app/checkout/error/page.tsx — Back URL de pago rechazado/fallido
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'No se pudo procesar el pago | Azul Colchones',
  robots: { index: false, follow: false },
}

export default function CheckoutErrorPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/15 text-3xl">
          ⚠️
        </div>
        <h1 className="text-2xl font-black">No pudimos procesar el pago</h1>
        <p className="mt-2 text-zinc-400">
          No se realizó ningún cobro. Podés intentar de nuevo con otro medio de pago, o escribirnos
          y coordinamos la compra por WhatsApp.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/carrito"
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-500"
          >
            Volver al carrito
          </Link>
          <a
            href="https://wa.me/5493534096566"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-zinc-700 px-5 py-3 font-semibold text-white hover:bg-zinc-800"
          >
            Comprar por WhatsApp
          </a>
        </div>
      </div>
    </main>
  )
}
