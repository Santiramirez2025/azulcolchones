// components/home/FAQSection.tsx
'use client'
import { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

const faqs = [
  {
    question: '¿Hacen envíos a Villa María?',
    answer: 'Sí, realizamos envíos GRATIS en Villa María en 24-48 horas hábiles. También enviamos a toda Córdoba con costos preferenciales.'
  },
  {
    question: '¿Puedo pagar en cuotas?',
    answer: 'Sí, aceptamos hasta 12 cuotas sin interés con Mercado Pago y tarjetas habilitadas. También transferencia con 10% OFF.'
  },
  {
    question: '¿Qué garantía tienen los colchones?',
    answer: 'Todos nuestros colchones incluyen garantía extendida del fabricante contra defectos de fabricación. Además cumplimos con la Ley de Defensa del Consumidor Argentina (24.240).'
  },
  {
    question: '¿Tienen showroom físico?',
    answer: 'Sí, tenemos showroom en Balerdi 855, Villa María. Atendemos de lunes a viernes de 9 a 19hs y sábados de 9 a 13hs.'
  },
  {
    question: '¿Cómo sé qué colchón elegir?',
    answer: 'Contamos con un simulador interactivo que te ayuda a encontrar el colchón perfecto según tu peso, postura al dormir y preferencias. También podés consultarnos por WhatsApp para asesoramiento personalizado.'
  },
  {
    question: '¿Cuánto tarda el envío?',
    answer: 'El envío a Villa María es GRATIS y llega en 24-48 horas hábiles. Para otras zonas de Córdoba el tiempo puede variar entre 2-5 días.'
  },
  {
    question: '¿Retiran el colchón viejo?',
    answer: 'Sí, ofrecemos retiro del colchón viejo sin cargo en compras superiores a $400.000 en Villa María. Coordinamos el retiro junto con la entrega del colchón nuevo.'
  },
  {
    question: '¿Cuál es el mejor colchón para dolor de espalda?',
    answer: 'Para dolor de espalda recomendamos colchones de firmeza media-alta que mantengan la alineación de la columna. Los colchones de resortes pocket o viscoelásticos son ideales. Te asesoramos sin cargo según tu caso específico.'
  },
]

// ✅ DEFAULT EXPORT (en lugar de named export)
export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <h2 id="faq-heading" className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
        Preguntas Frecuentes
      </h2>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index}
            className="bg-zinc-900/50 rounded-xl border border-zinc-800/50 overflow-hidden"
            itemScope
            itemType="https://schema.org/Question"
          >
            <button
              className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-zinc-800/30 transition-colors"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              aria-expanded={openIndex === index}
            >
              <span className="font-semibold text-white text-lg" itemProp="name">
                {faq.question}
              </span>
              <ChevronDownIcon 
                className={`w-5 h-5 text-zinc-400 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
              />
            </button>
            
            {openIndex === index && (
              <div 
                className="px-6 pb-5 text-zinc-400 leading-relaxed"
                itemProp="acceptedAnswer"
                itemScope
                itemType="https://schema.org/Answer"
              >
                <div itemProp="text">{faq.answer}</div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="text-center mt-12">
        <p className="text-zinc-400 mb-4">
          ¿No encontraste lo que buscabas?
        </p>
        <a 
          href="https://wa.me/5493534096566"
          className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          Consultá por WhatsApp
        </a>
      </div>
    </div>
  )
}