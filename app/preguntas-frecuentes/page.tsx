// app/preguntas-frecuentes/page.tsx - ULTRA OPTIMIZED ⚡ SEO 🚀
import type { Metadata } from 'next'
import { PreguntasFrecuentesClient } from './PreguntasFrecuentesClient'

// ============================================================================
// METADATA & SEO
// ============================================================================
export const metadata: Metadata = {
  title: 'Preguntas Frecuentes | Azul Colchones - Guía Completa sobre Colchones',
  description: 'Resolvé todas tus dudas sobre colchones: medidas, cuidado, garantía, envíos en Villa María. 21+ preguntas frecuentes respondidas por expertos con 35 años de experiencia. Envío gratis y 3 años de garantía.',
  keywords: [
    'preguntas frecuentes colchones',
    'FAQ colchones villa maría',
    'dudas sobre colchones',
    'medidas colchones argentina',
    'cuidado colchones',
    'garantía colchones',
    'envío colchones córdoba',
    'cómo elegir colchón',
    'duración colchones',
    'preguntas colchones',
  ],
  openGraph: {
    title: 'Preguntas Frecuentes | Azul Colchones',
    description: 'Todas tus dudas sobre colchones respondidas: medidas, cuidado, garantía y envíos en Villa María',
    type: 'website',
    locale: 'es_AR',
    siteName: 'Azul Colchones',
  },
  twitter: {
    card: 'summary',
    title: 'Preguntas Frecuentes | Azul Colchones',
    description: 'Guía completa sobre colchones - Respondemos todas tus dudas',
  },
  alternates: {
    canonical: 'https://azulcolchones.com.ar/preguntas-frecuentes',
  },
}

// ============================================================================
// PERFORMANCE CONFIGURATION
// ============================================================================
export const revalidate = 604800 // Revalidate once per week (FAQs change rarely)

// ============================================================================
// MAIN PAGE COMPONENT (SERVER)
// ============================================================================
export default function PreguntasFrecuentesPage() {
  // FAQPage Schema with ALL questions (CRITICAL for Google Featured Snippets)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      // PRODUCTO
      {
        '@type': 'Question',
        name: '¿Qué partes tiene un colchón?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Un colchón se compone de: núcleo (la parte interna que da soporte), acolchado (capas de confort sobre el núcleo), funda exterior (tejido que recubre el colchón) y, en algunos casos, refuerzos perimetrales para mayor durabilidad en los bordes.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué es un acolchado en un colchón?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El acolchado son las capas superiores del colchón que proporcionan confort y suavidad inicial. Puede incluir materiales como viscoelástica, fibras, gel o espumas que mejoran la adaptabilidad y sensación de acogida del colchón.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cómo diferenciar la cara de verano de la cara de invierno del colchón?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Los colchones con dos caras suelen indicarlo en la etiqueta. La cara de verano tiene tejidos más frescos y transpirables, mientras que la de invierno incorpora materiales más acogedores. Si tu colchón no especifica caras estacionales, es de una sola cara de uso.',
        },
      },
      {
        '@type': 'Question',
        name: 'Tengo sobrepeso, ¿puedo comprar cualquier colchón?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Para personas con sobrepeso recomendamos colchones de firmeza media-alta o alta, con mayor densidad en el núcleo y mejor soporte. Es importante verificar el peso máximo recomendado por el fabricante. Contactanos por WhatsApp para asesoramiento personalizado sin cargo.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cuál debe ser la medida de mi colchón?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El colchón debe medir exactamente lo mismo que tu sommier o base. Las medidas estándar en Argentina son: 1 plaza (80x190cm o 90x190cm), 1½ plaza (100x190cm), 2 plazas (140x190cm o 150x190cm), y Queen/King (160x200cm o 180x200cm).',
        },
      },
      // ENVÍO
      {
        '@type': 'Question',
        name: '¿Cómo se envían los colchones?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Los colchones se envían enrollados y comprimidos al vacío en cajas, lo que facilita el transporte y la entrega. Este método no afecta la calidad del colchón. Una vez desembalado, recupera su forma original en pocas horas.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cuánto tiempo puede estar enrollado mi colchón?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Recomendamos desenrollar el colchón dentro de las 2-3 semanas posteriores a recibirlo, aunque puede permanecer enrollado hasta 2 meses sin problema. Cuanto antes lo desempaques, antes podrás disfrutarlo.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Hacen envíos a Villa María y la zona?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí, hacemos envíos GRATIS a toda Villa María, Bell Ville, San Francisco y localidades cercanas. Para el resto de Córdoba y otras provincias, consultanos por WhatsApp. Entregamos en 3-7 días hábiles según la zona.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Me retiran el colchón viejo?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'La retira del colchón antiguo no está incluida en nuestro servicio estándar. Podés gestionarla a través del servicio de recolección de residuos voluminosos de la Municipalidad de Villa María o contratar un servicio privado.',
        },
      },
      // USO Y CUIDADO
      {
        '@type': 'Question',
        name: '¿Cómo tengo que desenrollar mi colchón?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Colocá la caja sobre la base o sommier, abrí con cuidado, retirá el plástico protector y dejá que el colchón se expanda naturalmente. No uses objetos punzantes cerca del colchón. La expansión completa tarda 24-48 horas.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cuánto tiempo debo esperar antes de su primer uso?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Podés usarlo tras 2-4 horas de expansión, aunque es ideal esperar 24 horas para que recupere completamente su forma y se airee. Durante las primeras noches puede tener un ligero olor a nuevo que desaparece con ventilación.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Se puede poner funda a los colchones?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí, es muy recomendable usar un protector o funda transpirable. Esto protege el colchón de manchas, ácaros y sudor, prolongando su vida útil. Asegurate de que sea transpirable para no afectar la ventilación.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cómo debo cuidar mi colchón?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Usá protector de colchón, ventilá la habitación diariamente, aspirá la superficie mensualmente, giralo 180° cada 3 meses (si es de doble cara), no saltes sobre él y evitá doblarlo o exponerlo al sol directo. Limpiá manchas inmediatamente con paño húmedo.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Puedo dar la vuelta a mi colchón?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Solo si es de doble cara. Los colchones modernos suelen ser de una sola cara de uso. Verificá la etiqueta: si indica "No voltear" o tiene acolchado solo superior, no debés darle vuelta. Sí podés girarlo 180° cada 3 meses.',
        },
      },
      // GARANTÍA
      {
        '@type': 'Question',
        name: '¿Cada cuánto tengo que cambiar mi colchón?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Se recomienda cambiar el colchón cada 8-10 años, aunque depende del uso y calidad. Señales para cambiarlo: deformaciones visibles, falta de soporte, despertarte con dolores, o si notás que descansás peor que antes.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué garantía tienen los colchones?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Todos nuestros colchones tienen garantía de 3 años contra defectos de fabricación. La garantía cubre deformaciones, roturas de costuras o fallas en materiales. No cubre desgaste normal, manchas o daños por mal uso.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Puedo devolver el colchón si no me gusta?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Según la Ley de Defensa del Consumidor argentina, tenés derecho a arrepentirte dentro de los 10 días corridos desde que recibís el producto, siempre que esté sin usar y en su embalaje original.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué formas de pago aceptan?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Aceptamos efectivo, transferencia bancaria, Mercado Pago y todas las tarjetas de crédito con hasta 12 cuotas sin interés. También tarjeta de débito. Para compras en el local, aceptamos todos los medios de pago habituales en Villa María.',
        },
      },
    ],
  }

  // Breadcrumbs Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: 'https://azulcolchones.com.ar',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Preguntas Frecuentes',
        item: 'https://azulcolchones.com.ar/preguntas-frecuentes',
      },
    ],
  }

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Main Content */}
      <PreguntasFrecuentesClient />

      {/* Hidden SEO Content - Comprehensive FAQ Context */}
      <aside className="sr-only" aria-hidden="true">
        <h1>Preguntas Frecuentes sobre Colchones - Azul Colchones Villa María</h1>
        
        <h2>Guía Completa de Preguntas Frecuentes sobre Colchones en Argentina</h2>
        <p>
          Encontrá respuestas a todas tus dudas sobre colchones: medidas estándar en Argentina,
          cuidado y mantenimiento, garantías, envíos en Villa María y Córdoba, formas de pago,
          y mucho más. Más de 35 años de experiencia familiar respondiendo a nuestros clientes.
        </p>

        <h2>Preguntas sobre Producto y Características</h2>
        
        <h3>¿Qué partes tiene un colchón?</h3>
        <p>
          Un colchón profesional se compone de varias partes esenciales: el núcleo (parte interna
          que proporciona el soporte principal), el acolchado (capas superiores de confort), la
          funda exterior (tejido que recubre y protege), y refuerzos perimetrales en modelos
          premium para mayor durabilidad en los bordes.
        </p>

        <h3>¿Qué es un acolchado en un colchón?</h3>
        <p>
          El acolchado son las capas superiores del colchón que proporcionan confort inmediato.
          Puede incluir materiales como viscoelástica, memory foam, fibras naturales, gel
          refrigerante o espumas de alta densidad que mejoran la adaptabilidad y la sensación
          inicial de acogida del colchón.
        </p>

        <h3>¿Cómo diferenciar cara de verano de cara de invierno?</h3>
        <p>
          Los colchones de doble cara suelen indicarlo en la etiqueta. La cara de verano
          utiliza tejidos más frescos y transpirables (ideal para el calor de Córdoba en verano),
          mientras que la cara de invierno incorpora materiales más acogedores y aislantes.
          Si tu colchón no especifica caras estacionales, es de una sola cara de uso.
        </p>

        <h3>¿Cuáles son las medidas estándar de colchones en Argentina?</h3>
        <p>
          Las medidas estándar de colchones en Argentina son: 1 plaza (80x190cm o 90x190cm),
          1½ plaza (100x190cm), 2 plazas o matrimonial (140x190cm o 150x190cm), Queen Size
          (160x200cm), y King Size (180x200cm o 200x200cm). Es fundamental medir tu sommier
          o base antes de comprar.
        </p>

        <h2>Preguntas sobre Envíos y Entrega en Villa María</h2>
        
        <h3>¿Hacen envíos gratis en Villa María?</h3>
        <p>
          Sí, realizamos envíos GRATIS a toda Villa María, Bell Ville, San Francisco y
          localidades cercanas en la provincia de Córdoba. Para el resto de Córdoba y otras
          provincias, consultanos por WhatsApp para coordinar el envío. El tiempo de entrega
          es de 3-7 días hábiles según la zona.
        </p>

        <h3>¿Cómo se envían los colchones? ¿Vienen enrollados?</h3>
        <p>
          Los colchones modernos se envían enrollados y comprimidos al vacío en cajas,
          facilitando el transporte y la entrega. Este método de empaque no afecta la calidad
          ni la vida útil del colchón. Una vez desembalado, el colchón recupera su forma
          original en 24-48 horas.
        </p>

        <h3>¿Cuánto tiempo puede estar enrollado un colchón sin dañarse?</h3>
        <p>
          Recomendamos desenrollar el colchón dentro de las 2-3 semanas posteriores a recibirlo,
          aunque puede permanecer enrollado hasta 2 meses sin problema. El empaque al vacío
          está diseñado para proteger el colchón durante el transporte y almacenamiento temporal.
        </p>

        <h3>¿Retiran el colchón viejo cuando entregan el nuevo?</h3>
        <p>
          La retira del colchón antiguo no está incluida en nuestro servicio estándar de entrega.
          Podés gestionarla a través del servicio de recolección de residuos voluminosos de la
          Municipalidad de Villa María o contratar un servicio privado de retiro de enseres.
        </p>

        <h2>Preguntas sobre Uso y Cuidado del Colchón</h2>
        
        <h3>¿Cómo desenrollar correctamente un colchón?</h3>
        <p>
          Para desenrollar tu colchón: 1) Colocá la caja sobre la base o sommier, 2) Abrí con
          cuidado usando tijeras solo en el cartón, 3) Retirá el plástico protector con precaución,
          4) Dejá que el colchón se expanda naturalmente. No uses objetos punzantes cerca del
          colchón. La expansión completa tarda 24-48 horas, aunque podés usarlo antes.
        </p>

        <h3>¿Cuánto tiempo esperar antes del primer uso?</h3>
        <p>
          Podés usar el colchón tras 2-4 horas de expansión mínima, aunque lo ideal es esperar
          24 horas completas para que recupere totalmente su forma y se airee. Durante las
          primeras noches puede tener un ligero olor a nuevo que desaparece rápidamente con
          buena ventilación de la habitación.
        </p>

        <h3>¿Cómo cuidar y mantener mi colchón para que dure más?</h3>
        <p>
          Cuidados esenciales: 1) Usar protector de colchón transpirable, 2) Ventilar la
          habitación diariamente, 3) Aspirar la superficie mensualmente, 4) Girar 180° cada
          3 meses si es de doble cara, 5) No saltar sobre el colchón, 6) Evitar doblarlo o
          exponerlo al sol directo, 7) Limpiar manchas inmediatamente con paño húmedo.
        </p>

        <h3>¿Se puede poner funda o protector a los colchones?</h3>
        <p>
          Sí, es muy recomendable usar un protector o funda transpirable. Los protectores
          de colchón protegen contra manchas, ácaros, sudor y derrames, prolongando
          significativamente la vida útil. Es fundamental que sea transpirable para no afectar
          la ventilación natural del colchón.
        </p>

        <h3>¿Puedo dar vuelta mi colchón?</h3>
        <p>
          Solo si es de doble cara. Los colchones modernos suelen ser de una sola cara de uso.
          Verificá la etiqueta: si indica "No voltear" o "One side" o tiene acolchado solo en
          la parte superior, NO debés darle vuelta. Sí podés girarlo 180° (rotación cabeza-pies)
          cada 3 meses para distribuir el desgaste.
        </p>

        <h2>Preguntas sobre Garantía y Devoluciones</h2>
        
        <h3>¿Qué garantía tienen los colchones de Azul Colchones?</h3>
        <p>
          Todos nuestros colchones tienen garantía de 3 años contra defectos de fabricación.
          La garantía cubre: deformaciones superiores a 2cm, roturas de costuras, fallas en
          materiales o construcción. No cubre: desgaste normal por uso, manchas, rasgaduras,
          daños por mal uso o falta de soporte adecuado. Conservá tu factura como comprobante.
        </p>

        <h3>¿Cada cuánto tiempo debo cambiar mi colchón?</h3>
        <p>
          Se recomienda cambiar el colchón cada 8-10 años en promedio, aunque depende del uso,
          calidad y cuidado. Señales de que necesitás un colchón nuevo: deformaciones visibles,
          falta de soporte, despertarte con dolores corporales, bultos o hundimientos, o si
          notás que descansás peor que antes.
        </p>

        <h3>¿Puedo devolver el colchón si no me gusta?</h3>
        <p>
          Según la Ley de Defensa del Consumidor argentina (Ley 24.240), tenés derecho a
          arrepentirte de la compra dentro de los 10 días corridos desde que recibís el producto,
          siempre que esté sin usar y en su embalaje original. Consultanos las condiciones
          específicas de devolución.
        </p>

        <h2>Preguntas sobre Pagos y Financiación</h2>
        
        <h3>¿Qué formas de pago aceptan?</h3>
        <p>
          Aceptamos múltiples formas de pago: efectivo, transferencia bancaria, Mercado Pago,
          todas las tarjetas de crédito con hasta 12 cuotas sin interés, tarjetas de débito.
          Para compras presenciales en nuestro showroom de Villa María, aceptamos todos los
          medios de pago habituales incluyendo QR y billeteras virtuales.
        </p>

        <h3>¿Tienen financiación en cuotas?</h3>
        <p>
          Sí, ofrecemos hasta 12 cuotas sin interés con todas las tarjetas de crédito a través
          de Mercado Pago y terminales propias. Esta promoción está disponible tanto para compras
          online como en nuestro showroom de Balerdi 855, Villa María.
        </p>

        <h2>Información sobre Medidas y Especificaciones</h2>
        
        <h3>¿Cómo medir la altura de un colchón?</h3>
        <p>
          La altura del colchón se mide desde la base hasta el punto más alto, incluyendo todo
          el acolchado. Esta medida es importante para verificar compatibilidad con sommier,
          canapé o ropa de cama. La mayoría de colchones tienen entre 18-30cm de altura.
          Los colchones premium pueden tener alturas superiores.
        </p>

        <h2>Consejos para Personas con Necesidades Específicas</h2>
        
        <h3>¿Qué colchón recomiendan para personas con sobrepeso?</h3>
        <p>
          Para personas con sobrepeso recomendamos colchones de firmeza media-alta o alta,
          con mayor densidad en el núcleo (mínimo 30kg/m³), mejor sistema de soporte (resortes
          ensacados o espuma de alta densidad), y verificar el peso máximo recomendado por el
          fabricante. Contactanos por WhatsApp para asesoramiento personalizado gratuito según
          tu peso y necesidades específicas.
        </p>

        <h2>Zona de Cobertura y Atención al Cliente</h2>
        <p>
          Azul Colchones atiende en Villa María y realiza envíos a: Bell Ville, San Francisco,
          Río Tercero, Villa Nueva, Arroyito, Córdoba Capital y toda la provincia de Córdoba.
          Showroom ubicado en Balerdi 855, Villa María. Atención personalizada por WhatsApp
          y presencial de lunes a viernes 9:00-19:00 y sábados 9:00-13:00.
        </p>

        <h2>Contacto y Asesoramiento</h2>
        <address>
          <p>Showroom: Balerdi 855, Villa María, Córdoba, Argentina</p>
          <p>WhatsApp: +54 9 353 401-7332</p>
          <p>Email: ventas@azulcolchones.com.ar</p>
          <p>Horarios: Lunes a Viernes 9:00-19:00 | Sábados 9:00-13:00</p>
        </address>
      </aside>
    </>
  )
}