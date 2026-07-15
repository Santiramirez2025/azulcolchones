// components/home/QuickAccess.tsx — Accesos rápidos en la home (menos fricción).
import Link from 'next/link'

const ITEMS = [
  {
    href: '/catalogo',
    emoji: '🛏️',
    title: 'Ver catálogo',
    desc: 'Colchones, sommiers y más, con filtros por plaza, tipo y precio.',
    cta: 'Explorar catálogo',
  },
  {
    href: '/arma-tu-combo',
    emoji: '🧩',
    title: 'Armá tu combo',
    desc: 'Colchón + sommier oficial + extras. Precio directo de fábrica.',
    cta: 'Armar mi combo',
  },
  {
    href: '/asesor',
    emoji: '🧭',
    title: 'Asesor de descanso',
    desc: 'Respondé 3 preguntas y te recomendamos tu colchón ideal.',
    cta: 'Usar el asesor',
  },
]

export default function QuickAccess() {
  return (
    <section className="bg-zinc-950 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-6 text-center text-2xl font-black text-white sm:text-3xl">
          ¿Por dónde arrancás?
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {ITEMS.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className="group flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 transition-all hover:-translate-y-0.5 hover:border-blue-500/50 hover:bg-zinc-900"
            >
              <span className="text-3xl">{it.emoji}</span>
              <h3 className="mt-3 text-lg font-bold text-white">{it.title}</h3>
              <p className="mt-1 flex-1 text-sm text-zinc-400">{it.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 font-semibold text-blue-400 group-hover:text-blue-300">
                {it.cta}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
