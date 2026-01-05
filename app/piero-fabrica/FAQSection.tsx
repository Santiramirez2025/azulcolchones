'use client'

import { useState } from 'react'

export default function FAQOptimizada() {
  const [abierto, setAbierto] = useState<number | null>(0) // Primera pregunta abierta por defecto

  const faqs = [
    {
      q: '¿Por qué es más barato si es el mismo colchón?',
      a: 'Porque comprás directo de fábrica PIERO sin intermediarios. MercadoLibre, tiendas online y locales físicos agregan su margen (30-50%). Nosotros te damos el precio de fábrica + solo nuestro margen mínimo. Por eso ahorrás entre $78.000 y $400.000 según el modelo.'
    },
    {
      q: '¿Realmente tengo que esperar 7-10 días?',
      a: 'Sí, pero es prácticamente el mismo tiempo que MercadoLibre (10-15 días). La diferencia es que tu colchón se fabrica cuando lo pedís, por eso el precio es mejor. Es como comprar un auto 0km: esperás unos días pero lo recibís nuevo de fábrica con garantía oficial.'
    },
    {
      q: '¿La garantía es la misma que en otros lados?',
      a: 'Exactamente la misma garantía oficial de fábrica PIERO (5-10 años según modelo). Además tenés nuestro respaldo directo en Villa María para cualquier tema. No hay ninguna diferencia en cobertura.'
    },
    {
      q: '¿Puedo pagar en cuotas?',
      a: 'Sí aceptamos MercadoPago, transferencia bancaria y efectivo.'
    },
    {
      q: '¿El envío tiene costo adicional?',
      a: 'No, el envío es GRATIS a toda Argentina. En Villa María y alrededores lo recibís en 7-10 días. En el interior del país puede demorar 10-15 días según tu ubicación exacta.'
    },
    {
      q: '¿Cómo sé que voy a recibir el producto?',
      a: 'Somos un comercio establecido en Villa María con más de 8 años en el rubro. Trabajamos con factura oficial, comprobante de pago, y seguimiento de envío. Además, tenés el respaldo de la garantía oficial PIERO. Podés verificar nuestras referencias en Google y redes sociales.'
    }
  ]

  return (
    <section className="bg-zinc-900/50 border-y border-zinc-800/30">
      <div className="max-w-screen-2xl mx-auto px-4 py-16 md:py-24">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-lg text-zinc-400">
            Todo lo que necesitás saber antes de comprar
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-zinc-800/50 border border-zinc-700/50 rounded-xl overflow-hidden hover:border-blue-500/30 transition-all"
            >
              <button
                onClick={() => setAbierto(abierto === index ? null : index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-zinc-800/30 transition-colors"
              >
                <span className="font-bold text-white text-lg pr-4">
                  {faq.q}
                </span>
                <svg 
                  className={`w-6 h-6 text-blue-400 flex-shrink-0 transition-transform duration-300 ${abierto === index ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div 
                className={`
                  overflow-hidden transition-all duration-300
                  ${abierto === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                `}
              >
                <div className="px-6 pb-5 text-zinc-300 leading-relaxed border-t border-zinc-700/30 pt-4">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Adicional */}
        <div className="mt-12 text-center">
          <p className="text-zinc-400 mb-4">
            ¿Tenés otra pregunta?
          </p>
          <a
            href="https://wa.me/5493534096566?text=Hola!%20Tengo%20una%20consulta%20sobre%20Piero%20Fábrica"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-200"
          >
            <span>💬</span>
            <span>Consultanos por WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  )
}