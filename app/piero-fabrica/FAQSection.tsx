// components/productos/FAQSection.tsx
export default function FAQSection() {
  const preguntas = [
    {
      q: '¿Es el mismo colchón que en MercadoLibre?',
      a: 'Sí. Mismo producto, misma fábrica PIERO, misma garantía oficial. La diferencia de precio es porque eliminamos intermediarios y comisiones de plataforma.'
    },
    {
      q: '¿Cuánto demora la entrega?',
      a: '7 a 10 días hábiles desde Villa María hasta tu domicilio. Te enviamos el tracking con cada paso.'
    },
    {
      q: '¿Cuáles son los métodos de pago?',
      a: 'Efectivo, transferencia bancaria, y todas las tarjetas de crédito y débito. También podés pagar en cuotas (consultar recargos vigentes).'
    },
    {
      q: '¿Qué pasa si no me conviene el colchón?',
      a: 'Garantía de satisfacción. Si tenés algún inconveniente, nos comunicamos y lo resolvemos. Además, cada modelo tiene garantía oficial PIERO de 5 a 10 años.'
    },
    {
      q: '¿Por qué los packs tienen descuento extra?',
      a: 'Al comprar combo reducimos costos de logística y preparación. Ese ahorro te lo trasladamos directamente. Además, te asegurás de tener todo lo necesario para estrenar tu colchón.'
    }
  ]

  return (
    <section className="bg-zinc-950 py-12 md:py-16 border-t border-zinc-800">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-xl font-bold text-white mb-6 text-center">
          Preguntas frecuentes
        </h2>
        <div className="space-y-3">
          {preguntas.map((item, i) => (
            <details key={i} className="group">
              <summary className="flex items-center justify-between cursor-pointer list-none p-4 rounded-xl bg-zinc-900 hover:bg-zinc-900/80 transition-colors">
                <span className="text-sm font-semibold text-zinc-200 pr-4">
                  {item.q}
                </span>
                <svg
                  className="w-4 h-4 text-zinc-500 flex-shrink-0 transition-transform duration-200 group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <div className="px-4 pt-2 pb-4 text-sm text-zinc-500 leading-relaxed">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}