'use client'

import { useState } from 'react'

// ============================================================================
// FAQ SECTION - REDISEÑO UNIFICADO CON LANDING 🎯
// ============================================================================

export default function FAQOptimizada() {
  const [abierto, setAbierto] = useState<number | null>(0)

  const faqs = [
    {
      q: '¿Por qué es más barato si es el mismo colchón?',
      a: 'Porque comprás directo de fábrica PIERO sin intermediarios. MercadoLibre, tiendas online y locales físicos agregan su margen (30-50%). Nosotros te damos el precio de fábrica + solo nuestro margen mínimo. Por eso ahorrás entre $78.000 y $1.200.000 según el modelo.',
      icon: '💰'
    },
    {
      q: '¿Realmente tengo que esperar 7-10 días?',
      a: 'Sí, pero es prácticamente el mismo tiempo que MercadoLibre (10-15 días). La diferencia es que tu colchón se fabrica cuando lo pedís, por eso el precio es mejor. Es como comprar un auto 0km: esperás unos días pero lo recibís nuevo de fábrica con garantía oficial.',
      icon: '📦'
    },
    {
      q: '¿La garantía es la misma que en otros lados?',
      a: 'Exactamente la misma garantía oficial de fábrica PIERO (5-10 años según modelo). Además tenés nuestro respaldo directo en Villa María para cualquier tema. No hay ninguna diferencia en cobertura.',
      icon: '✅'
    },
    {
      q: '¿Puedo pagar en cuotas?',
      a: 'Sí, aceptamos todas las tarjetas de crédito en hasta 12 cuotas. También MercadoPago, transferencia bancaria y efectivo. En 1 pago o transferencia tenés el mejor precio sin recargo.',
      icon: '💳'
    },
    {
      q: '¿El envío tiene costo adicional?',
      a: 'No, el envío es GRATIS a toda Argentina. En Villa María y alrededores lo recibís en 7-10 días. En el interior del país puede demorar 10-15 días según tu ubicación exacta.',
      icon: '🚚'
    },
    {
      q: '¿Cómo sé que voy a recibir el producto?',
      a: 'Somos un comercio establecido en Villa María con más de 35 años en el rubro. Trabajamos con factura oficial, comprobante de pago, y seguimiento de envío. Además, tenés el respaldo de la garantía oficial PIERO. Podés verificar nuestras referencias en Google y redes sociales.',
      icon: '🛡️'
    }
  ]

  return (
    <section className="relative bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 py-16 md:py-20 overflow-hidden">
      
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[120px] top-0 left-1/4"></div>
        <div className="absolute w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[100px] bottom-0 right-1/4"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4">
        
        {/* Header */}
        <header className="text-center mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-400 text-sm font-bold mb-6">
            <span>❓</span>
            <span>Resolvé tus dudas</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-lg text-zinc-400 max-w-xl mx-auto">
            Todo lo que necesitás saber antes de comprar
          </p>
        </header>

        {/* FAQ Items */}
        <div className="space-y-3 md:space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className={`
                bg-zinc-800/60 backdrop-blur-sm 
                border rounded-xl md:rounded-2xl overflow-hidden 
                transition-all duration-300
                ${abierto === index 
                  ? 'border-blue-500/50 shadow-lg shadow-blue-500/10' 
                  : 'border-zinc-700/50 hover:border-zinc-600/80'
                }
              `}
            >
              <button
                onClick={() => setAbierto(abierto === index ? null : index)}
                className="w-full px-5 md:px-6 py-4 md:py-5 text-left flex items-center justify-between gap-3 md:gap-4 hover:bg-zinc-800/30 transition-colors"
                aria-expanded={abierto === index}
                aria-controls={`faq-answer-${index}`}
              >
                <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                  <span className="text-xl md:text-2xl flex-shrink-0" aria-hidden="true">
                    {faq.icon}
                  </span>
                  <span className="font-bold text-white text-base md:text-lg leading-snug">
                    {faq.q}
                  </span>
                </div>
                <div 
                  className={`
                    w-8 h-8 md:w-10 md:h-10 rounded-full flex-shrink-0
                    flex items-center justify-center
                    transition-all duration-300
                    ${abierto === index 
                      ? 'bg-blue-500/20 rotate-180' 
                      : 'bg-zinc-700/50'
                    }
                  `}
                >
                  <svg 
                    className={`w-5 h-5 transition-colors ${abierto === index ? 'text-blue-400' : 'text-zinc-400'}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              
              <div 
                id={`faq-answer-${index}`}
                className={`
                  grid transition-all duration-300 ease-in-out
                  ${abierto === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}
                `}
              >
                <div className="overflow-hidden">
                  <div className="px-5 md:px-6 pb-5 md:pb-6 pt-2 border-t border-zinc-700/50">
                    <p className="text-zinc-300 text-sm md:text-base leading-relaxed pl-9 md:pl-12">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Adicional */}
        <div className="mt-10 md:mt-12">
          <div className="bg-zinc-800/60 backdrop-blur-sm border border-zinc-700/50 rounded-xl md:rounded-2xl p-6 md:p-8 text-center">
            <p className="text-zinc-300 mb-4 md:mb-6 text-base md:text-lg">
              ¿Tenés otra pregunta? Te respondemos en minutos
            </p>
            <a
              href="https://wa.me/5493534017332?text=Hola!%20Tengo%20una%20consulta%20sobre%20colchones%20PIERO%20Fábrica"
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center justify-center gap-3
                px-8 py-4
                bg-gradient-to-r from-green-600 to-emerald-600
                hover:from-green-500 hover:to-emerald-500
                text-white font-bold text-base
                rounded-xl
                transition-all duration-300
                shadow-xl shadow-green-500/30 hover:shadow-green-500/50
                hover:scale-[1.02] active:scale-[0.98]
                w-full sm:w-auto
              "
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span>Consultanos por WhatsApp</span>
            </a>
            
            {/* Horarios */}
            <p className="mt-4 text-sm text-zinc-500">
              Lun-Vie 9-19hs • Sáb 9-13hs
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}