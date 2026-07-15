// app/producto/[slug]/components/CompletaTuDescanso.tsx
// Cross-sell del SOMMIER OFICIAL (ComboSuggestion). Server component.
// Marketing honesto: solo el sommier asociado oficialmente al colchón.
import Link from 'next/link'
import Image from 'next/image'
import { formatARS } from '@/lib/utils/currency'

export interface OfficialSommier {
  name: string
  slug: string
  image: string | null
  price: number // pesos (desde)
  bajoPedido?: boolean
}

export default function CompletaTuDescanso({ sommier }: { sommier: OfficialSommier }) {
  return (
    <section className="max-w-screen-2xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pb-12 sm:pb-16 relative z-10">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 sm:p-6">
        <div className="mb-4">
          <h2 className="text-lg sm:text-xl font-black text-white">Completá tu descanso</h2>
          <p className="text-sm text-zinc-400">
            Sommier oficial recomendado por Piero para este colchón.
          </p>
        </div>

        <Link
          href={`/producto/${sommier.slug}`}
          className="group flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-950/40 p-3 sm:p-4 transition-colors hover:border-blue-500/40 hover:bg-zinc-900"
        >
          <div className="relative h-20 w-20 sm:h-24 sm:w-24 flex-shrink-0 overflow-hidden rounded-lg bg-zinc-800">
            {sommier.image ? (
              <Image
                src={sommier.image}
                alt={sommier.name}
                fill
                sizes="96px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-2xl">📦</div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="truncate font-bold text-white">{sommier.name}</h3>
            <p className="mt-0.5 text-sm text-zinc-400">
              Desde <span className="font-semibold text-white">{formatARS(sommier.price)}</span>
            </p>
            {sommier.bajoPedido && (
              <p className="mt-0.5 text-xs text-amber-400">Bajo pedido · consultá stock</p>
            )}
          </div>

          <span className="flex-shrink-0 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition-colors group-hover:bg-blue-500">
            Ver sommier →
          </span>
        </Link>
      </div>
    </section>
  )
}
