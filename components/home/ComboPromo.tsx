// components/home/ComboPromo.tsx — Banner de "Armá tu combo" en la home.
import Link from 'next/link'

export default function ComboPromo() {
  return (
    <section className="bg-zinc-950 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl border border-blue-500/30 bg-gradient-to-br from-blue-600/20 via-zinc-900 to-zinc-900 p-6 sm:p-10">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl" />
          <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <span className="inline-block rounded-full bg-blue-500/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue-300">
                Diferencial
              </span>
              <h2 className="mt-3 text-2xl font-black text-white sm:text-3xl">
                Armá tu combo en 1 minuto
              </h2>
              <p className="mt-2 text-zinc-300">
                Colchón + su sommier oficial Piero + almohada o protector. Ves el total y el ahorro
                real al instante, y lo agregás al carrito de una.
              </p>
            </div>
            <Link
              href="/arma-tu-combo"
              className="shrink-0 rounded-2xl bg-blue-600 px-7 py-4 text-lg font-black text-white shadow-lg shadow-blue-600/25 transition-colors hover:bg-blue-500"
            >
              Armar mi combo →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
