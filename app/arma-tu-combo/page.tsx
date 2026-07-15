// app/arma-tu-combo/page.tsx — "Armá tu combo" (diferencial). Server component DB-driven.
import type { Metadata } from 'next'
import { getComboBuilderData } from '@/lib/catalog/combo'
import ComboBuilder from './ComboBuilder'

export const revalidate = 3600

const SITE = 'https://azulcolchones.com'

export const metadata: Metadata = {
  title: 'Armá tu combo Piero | Azul Colchones Villa María',
  description:
    'Armá tu combo de descanso: colchón + sommier oficial + almohada o protector, con el precio directo de fábrica. Distribuidor oficial Piero en Villa María.',
  alternates: { canonical: `${SITE}/arma-tu-combo` },
  openGraph: {
    title: 'Armá tu combo Piero — Azul Colchones',
    description: 'Colchón + sommier oficial + extras, directo de fábrica.',
    url: `${SITE}/arma-tu-combo`,
    siteName: 'Azul Colchones',
    locale: 'es_AR',
    type: 'website',
  },
}

export default async function ArmaTuComboPage() {
  const data = await getComboBuilderData()

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 text-center sm:text-left">
          <h1 className="text-2xl font-black sm:text-3xl">Armá tu combo</h1>
          <p className="mt-2 max-w-2xl text-zinc-400">
            Combiná tu colchón con su sommier oficial Piero y sumá almohada o protector. El total es
            el precio real directo de fábrica — sin descuentos inventados.
          </p>
        </header>

        <ComboBuilder data={data} />
      </div>
    </main>
  )
}
