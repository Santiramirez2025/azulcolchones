// app/lista-precios/page.tsx — Lista de precios DB-driven (misma fuente que el catálogo).
import type { Metadata } from 'next'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { centavosToARS, formatARS } from '@/lib/utils/currency'
import { getMejorCuota } from '@/lib/utils/pricing'

export const revalidate = 3600

const SITE = 'https://azulcolchones.com'

export const metadata: Metadata = {
  title: 'Lista de precios Piero | Azul Colchones Villa María',
  description:
    'Lista de precios completa de colchones, sommiers, almohadas y protectores Piero. Precio directo de fábrica, 3 cuotas. Distribuidor oficial en Villa María.',
  alternates: { canonical: `${SITE}/lista-precios` },
}

const CATEGORY_ORDER = ['colchones', 'sommiers', 'protectores', 'almohadas'] as const

async function getData() {
  const categories = await prisma.category.findMany({
    orderBy: { order: 'asc' },
    include: {
      products: {
        where: { isActive: true },
        orderBy: [{ isBestSeller: 'desc' }, { price: 'asc' }],
        include: {
          variants: {
            where: { isActive: true },
            orderBy: [{ isDefault: 'desc' }, { price: 'asc' }],
          },
        },
      },
    },
  })
  return categories
    .filter((c) => c.products.length > 0)
    .sort(
      (a, b) =>
        CATEGORY_ORDER.indexOf(a.slug as (typeof CATEGORY_ORDER)[number]) -
        CATEGORY_ORDER.indexOf(b.slug as (typeof CATEGORY_ORDER)[number]),
    )
}

export default async function ListaPreciosPage() {
  const categories = await getData()
  const totalProducts = categories.reduce((s, c) => s + c.products.length, 0)

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-gradient-to-b from-blue-950/40 to-zinc-950 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <span className="inline-block rounded-full bg-blue-500/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue-300">
            Distribuidor oficial Piero
          </span>
          <h1 className="mt-3 text-3xl font-black sm:text-4xl">Lista de precios</h1>
          <p className="mx-auto mt-2 max-w-2xl text-zinc-400">
            Precio directo de fábrica · 3 cuotas · entrega inmediata con stock en Villa
            María y Villa Nueva. {totalProducts} productos.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link
              href="/catalogo"
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-500"
            >
              Ver catálogo con fotos →
            </Link>
            <a
              href="https://wa.me/5493534096566"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-zinc-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800"
            >
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {categories.map((cat) => (
          <section key={cat.id} className="mb-12">
            <div className="mb-4 flex items-center gap-2 border-b border-zinc-800 pb-2">
              <span className="text-2xl">{cat.emoji}</span>
              <h2 className="text-xl font-black sm:text-2xl">{cat.name}</h2>
              <span className="ml-auto text-sm text-zinc-500">{cat.products.length} modelos</span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {cat.products.map((p) => {
                const min = p.variants.length
                  ? Math.min(...p.variants.map((v) => v.price))
                  : p.price
                const cuota = getMejorCuota(centavosToARS(min))
                return (
                  <div
                    key={p.id}
                    className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50"
                  >
                    <div className="flex items-center justify-between gap-2 border-b border-zinc-800 bg-zinc-900 px-4 py-3">
                      <div className="min-w-0">
                        <Link
                          href={`/producto/${p.slug}`}
                          className="truncate font-bold text-white hover:text-blue-400"
                        >
                          {p.name}
                        </Link>
                        {p.subtitle && (
                          <p className="truncate text-xs text-zinc-500">{p.subtitle}</p>
                        )}
                      </div>
                      {p.bajoPedido ? (
                        <span className="shrink-0 rounded-full bg-amber-500/15 px-2 py-0.5 text-[11px] text-amber-400">
                          Bajo pedido
                        </span>
                      ) : p.isBestSeller ? (
                        <span className="shrink-0 rounded-full bg-blue-500/15 px-2 py-0.5 text-[11px] text-blue-400">
                          Más vendido
                        </span>
                      ) : null}
                    </div>

                    <table className="w-full text-sm">
                      <tbody>
                        {p.variants.map((v) => (
                          <tr key={v.id} className="border-t border-zinc-800/60">
                            <td className="px-4 py-2 text-zinc-300">
                              {v.measure ?? v.dimensions}
                              {v.plaza && (
                                <span className="ml-1 text-xs text-zinc-500">· {v.plaza}</span>
                              )}
                            </td>
                            <td className="px-4 py-2 text-right font-semibold text-white">
                              {formatARS(centavosToARS(v.price))}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <p className="border-t border-zinc-800/60 px-4 py-2 text-xs text-zinc-500">
                      Desde {formatARS(cuota.precioCuota)} · 3 cuotas
                    </p>
                  </div>
                )
              })}
            </div>
          </section>
        ))}

        <p className="mt-8 text-center text-xs text-zinc-500">
          Precios de lista Exclusivos Piero. Sujetos a modificación sin previo aviso. Consultá
          disponibilidad por WhatsApp: +54 9 3534 09-6566.
        </p>
      </div>
    </main>
  )
}
