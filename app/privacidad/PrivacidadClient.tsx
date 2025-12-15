// app/privacidad/PrivacidadClient.tsx - CLIENT COMPONENT OPTIMIZED ⚡
'use client'

import { Shield, Lock, Eye, FileText, Mail, Phone } from 'lucide-react'
import { memo } from 'react'

// ============================================================================
// TYPES
// ============================================================================
interface Section {
  icon: any
  title: string
  items?: string[]
  content?: string
}

// ============================================================================
// MEMOIZED HEADER
// ============================================================================
const HeaderSection = memo(() => (
  <header className="text-center mb-16">
    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 rounded-2xl mb-6 border border-violet-500/30">
      <Shield className="w-10 h-10 text-violet-400" aria-hidden="true" />
    </div>
    <h1 className="text-4xl md:text-6xl font-black text-white mb-4 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
      Política de Privacidad
    </h1>
    <p className="text-zinc-400">
      Última actualización: <time dateTime="2024-10-01">Octubre 2024</time>
    </p>
  </header>
))
HeaderSection.displayName = 'HeaderSection'

// ============================================================================
// SECTION CARD - Memoized
// ============================================================================
const SectionCard = memo(({ section }: { section: Section }) => (
  <article className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 hover:border-violet-500/30 transition-all">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center">
        <section.icon className="w-6 h-6 text-violet-400" aria-hidden="true" />
      </div>
      <h2 className="text-xl font-bold text-white">{section.title}</h2>
    </div>
    
    {section.items ? (
      <ul className="space-y-2" role="list">
        {section.items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
            <span className="text-violet-400 mt-1" aria-hidden="true">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-sm text-zinc-300 leading-relaxed">
        {section.content}
      </p>
    )}
  </article>
))
SectionCard.displayName = 'SectionCard'

// ============================================================================
// CONTACT SECTION - Memoized
// ============================================================================
const ContactSection = memo(() => (
  <section 
    className="bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 rounded-2xl p-8 text-center"
    aria-labelledby="contact-heading"
  >
    <h2 id="contact-heading" className="text-2xl font-bold text-white mb-4">
      ¿Preguntas sobre privacidad?
    </h2>
    <p className="text-zinc-300 mb-6">
      Contáctanos para cualquier consulta sobre protección de datos
    </p>
    <address className="not-italic flex flex-col sm:flex-row items-center justify-center gap-4">
      <a 
        href="mailto:privacidad@azulcolchones.com.ar"
        className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-all border border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
        aria-label="Enviar email a privacidad"
      >
        <Mail className="w-5 h-5" aria-hidden="true" />
        privacidad@azulcolchones.com.ar
      </a>
      <a 
        href="tel:+5493534017332"
        className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-all border border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
        aria-label="Llamar por teléfono"
      >
        <Phone className="w-5 h-5" aria-hidden="true" />
        +54 9 353 401-7332
      </a>
    </address>
  </section>
))
ContactSection.displayName = 'ContactSection'

// ============================================================================
// FOOTER NOTE - Memoized
// ============================================================================
const FooterNote = memo(() => (
  <footer className="mt-12 text-center">
    <p className="text-sm text-zinc-500">
      Cumplimos con la Ley 25.326 de Protección de Datos Personales de Argentina y protegemos 
      tus datos con los más altos estándares de seguridad
    </p>
  </footer>
))
FooterNote.displayName = 'FooterNote'

// ============================================================================
// MAIN CLIENT COMPONENT
// ============================================================================
export function PrivacidadClient() {
  const sections: Section[] = [
    {
      icon: FileText,
      title: 'Información que Recopilamos',
      items: [
        'Datos personales (nombre, email, teléfono, DNI)',
        'Dirección de envío y facturación completa',
        'Información de pago (procesada de forma segura por Mercado Pago)',
        'Historial de compras y preferencias de productos',
        'Datos de navegación y uso del sitio web'
      ]
    },
    {
      icon: Eye,
      title: 'Uso de la Información',
      items: [
        'Procesar y enviar pedidos de colchones',
        'Coordinar entregas en Villa María y Córdoba',
        'Emitir facturas y gestionar pagos',
        'Mejorar productos y servicios',
        'Enviar comunicaciones relevantes (con tu consentimiento)',
        'Cumplir obligaciones legales y fiscales'
      ]
    },
    {
      icon: Lock,
      title: 'Protección de Datos',
      content: 'Implementamos medidas de seguridad técnicas y organizativas avanzadas para proteger tus datos personales: cifrado SSL/TLS, almacenamiento encriptado, firewalls, monitoreo 24/7, acceso restringido solo a personal autorizado y procesadores de pago certificados PCI-DSS.'
    },
    {
      icon: Shield,
      title: 'Tus Derechos (Ley 25.326)',
      items: [
        'Derecho de acceso a tus datos personales',
        'Derecho de rectificación de datos incorrectos',
        'Derecho de supresión (derecho al olvido)',
        'Derecho de oposición al procesamiento',
        'Derecho de portabilidad de datos',
        'Derecho a retirar el consentimiento'
      ]
    }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-5xl">
        <HeaderSection />

        {/* Sections Grid */}
        <section 
          className="grid md:grid-cols-2 gap-6 mb-12"
          aria-label="Información sobre privacidad"
        >
          {sections.map((section, index) => (
            <SectionCard key={index} section={section} />
          ))}
        </section>

        <ContactSection />
        <FooterNote />
      </div>
    </main>
  )
}