// components/home/Combos5en1.tsx — Sección destacada de Combos 5 en 1 para la home.
import Link from 'next/link'
import Image from 'next/image'
import { formatARS } from '@/lib/utils/currency'
import { getMejorCuota } from '@/lib/utils/pricing'
import type { NormalizedProduct } from '@/app/catalogo/components/types'

const INCLUYE = ['Colchón', 'Sommier', 'Almohada', 'Respaldo', 'Protector']
const WHATSAPP = '5493534096566'

export default function Combos5en1({ combos }: { combos: NormalizedProduct[] }) {
  if (combos.length === 0) return null

  return (
    <section className="bg-gradient-to-b from-blue-950/30 to-zinc-950 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 text-center">
          <span className="inline-block rounded-full bg-blue-600 px-4 py-1 text-sm font-black uppercase tracking-wide text-white">
            🎁 Combos 5 en 1
          </span>
          <h2 className="mt-3 text-2xl font-black text-white sm:text-3xl md:text-4xl">
            5 productos, 1 solo precio
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-zinc-300">
            Colchón + sommier + almohada + respaldo + protector. Tu descanso completo, listo y al
            mejor precio.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {combos.map((c) => {
            const image = Array.isArray(c.images) ? c.images[0] : c.images
            const cuota = getMejorCuota(c.price)
            const wa = encodeURIComponent(
              `¡Hola! Me interesa el ${c.name} (${formatARS(c.price)}). ¿Me pasás info?`,
            )
            return (
              <div
                key={c.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-blue-500/25 bg-zinc-900/60"
              >
                <div className="relative aspect-[4/3] bg-zinc-800">
                  {image ? (
                    <Image
                      src={image}
                      alt={c.name}
                      fill
                      sizes="(max-width:640px) 100vw, 33vw"
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-5xl">🎁</div>
                  )}
                  <span className="absolute left-3 top-3 rounded-full bg-blue-600 px-2.5 py-1 text-xs font-black text-white shadow">
                    5 EN 1
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <h3 className="text-lg font-black text-white">{c.name}</h3>
                  {c.subtitle && <p className="text-xs text-zinc-500">{c.subtitle}</p>}

                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {INCLUYE.map((it) => (
                      <li
                        key={it}
                        className="rounded-full bg-zinc-800 px-2 py-0.5 text-[11px] text-zinc-300"
                      >
                        {it}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4">
                    <p className="text-2xl font-black text-white">{formatARS(c.price)}</p>
                    <p className="text-xs text-emerald-400">
                      3 cuotas de {formatARS(cuota.precioCuota)}
                    </p>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Link
                      href={`/producto/${c.slug}`}
                      className="flex-1 rounded-xl bg-blue-600 px-3 py-2.5 text-center text-sm font-bold text-white hover:bg-blue-500"
                    >
                      Ver combo
                    </Link>
                    <a
                      href={`https://wa.me/${WHATSAPP}?text=${wa}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl border border-zinc-700 px-3 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/catalogo?category=Combos"
            className="inline-block rounded-xl border border-blue-500/40 px-6 py-3 font-semibold text-blue-300 hover:bg-blue-500/10"
          >
            Ver todos los combos →
          </Link>
        </div>
      </div>
    </section>
  )
}
