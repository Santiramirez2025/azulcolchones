// app/admin/(panel)/leads/page.tsx — Leads del asesor (para remarketing).
import { prisma } from '@/lib/prisma'
import { MessageCircle } from 'lucide-react'

export const dynamic = 'force-dynamic'

function fmtDate(d: Date) {
  return new Intl.DateTimeFormat('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d)
}

function sourceBadge(source: string) {
  const map: Record<string, string> = {
    asesor: 'bg-blue-500/15 text-blue-400',
    combo: 'bg-violet-500/15 text-violet-400',
    quiz: 'bg-emerald-500/15 text-emerald-400',
  }
  return map[source] ?? 'bg-zinc-700/40 text-zinc-300'
}

function waLink(phone: string) {
  const clean = phone.replace(/[^0-9]/g, '')
  if (!clean) return null
  // Si ya viene con código de país (54...), no lo dupliquemos.
  const withCc = clean.startsWith('54') ? clean : `54${clean}`
  return `https://wa.me/${withCc}`
}

function reco(rec: unknown): string {
  if (!rec || typeof rec !== 'object') return '—'
  const r = rec as Record<string, unknown>
  const modelo = r.modelo ?? r.model
  const medida = r.medida ?? r.medidaDisplay ?? r.size
  if (modelo || medida) return [modelo, medida].filter(Boolean).join(' · ')
  try {
    return JSON.stringify(rec).slice(0, 60)
  } catch {
    return '—'
  }
}

async function getLeads() {
  try {
    return await prisma.lead.findMany({ orderBy: { createdAt: 'desc' }, take: 200 })
  } catch {
    return null
  }
}

export default async function LeadsPage() {
  const leads = await getLeads()

  if (!leads) {
    return <p className="text-zinc-400">No se pudieron cargar los leads (revisá la conexión a la DB).</p>
  }

  return (
    <div>
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-2xl font-black">Leads</h1>
        <p className="text-sm text-zinc-400">{leads.length} en total</p>
      </div>
      <p className="mb-6 text-sm text-zinc-500">
        Consultas del asesor y del armado de combos. Datos para remarketing.
      </p>

      <div className="overflow-x-auto rounded-2xl border border-zinc-800">
        <table className="w-full min-w-[680px] text-sm">
          <thead className="bg-zinc-900 text-left text-zinc-400">
            <tr>
              <th className="px-4 py-3">Fecha</th>
              <th className="px-4 py-3">Origen</th>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Teléfono</th>
              <th className="px-4 py-3">Recomendación</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-zinc-500">
                  Todavía no hay leads.
                </td>
              </tr>
            )}
            {leads.map((l) => {
              const wa = l.phone ? waLink(l.phone) : null
              return (
                <tr key={l.id} className="border-t border-zinc-800">
                  <td className="whitespace-nowrap px-4 py-3 text-zinc-400">{fmtDate(l.createdAt)}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs ${sourceBadge(l.source)}`}>
                      {l.source}
                    </span>
                  </td>
                  <td className="px-4 py-3">{l.name || <span className="text-zinc-600">—</span>}</td>
                  <td className="px-4 py-3">
                    {l.phone ? (
                      wa ? (
                        <a
                          href={wa}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300"
                        >
                          <MessageCircle className="h-4 w-4" />
                          {l.phone}
                        </a>
                      ) : (
                        l.phone
                      )
                    ) : (
                      <span className="text-zinc-600">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-zinc-300">{reco(l.recommendation)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
