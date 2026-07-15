// app/privacidad/page.tsx - ULTRA OPTIMIZED ⚡ SEO 🚀
import type { Metadata } from 'next'
import { PrivacidadClient } from './PrivacidadClient'

// ============================================================================
// METADATA & SEO
// ============================================================================
export const metadata: Metadata = {
  title: 'Política de Privacidad | Azul Colchones - Protección de Datos Personales',
  description: 'Política de privacidad de Azul Colchones. Conocé cómo protegemos tus datos personales según la Ley 25.326 de Protección de Datos de Argentina. Información transparente sobre recopilación, uso y seguridad.',
  keywords: [
    'política privacidad azul colchones',
    'protección datos personales',
    'privacidad datos argentina',
    'ley 25.326 datos personales',
    'seguridad información cliente',
    'protección consumidor',
  ],
  openGraph: {
    title: 'Política de Privacidad | Azul Colchones',
    description: 'Protegemos tus datos personales con los más altos estándares de seguridad',
    type: 'website',
    locale: 'es_AR',
    siteName: 'Azul Colchones',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://azulcolchones.com/privacidad',
  },
}

// ============================================================================
// PERFORMANCE CONFIGURATION
// ============================================================================
export const revalidate = 2592000 // Revalidate once per month (legal pages change rarely)

// ============================================================================
// MAIN PAGE COMPONENT (SERVER)
// ============================================================================
export default function PrivacidadPage() {
  // WebPage Schema for legal page
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Política de Privacidad - Azul Colchones',
    description: 'Política de privacidad y protección de datos personales',
    url: 'https://azulcolchones.com/privacidad',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Azul Colchones',
      url: 'https://azulcolchones.com',
    },
    about: {
      '@type': 'Thing',
      name: 'Protección de Datos Personales',
    },
    dateModified: '2024-10-01',
    inLanguage: 'es-AR',
  }

  // Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Azul Colchones',
    url: 'https://azulcolchones.com',
    logo: 'https://azulcolchones.com/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+54 9 3534 09-6566',
      contactType: 'customer service',
      email: 'privacidad@azulcolchones.com.ar',
      areaServed: 'AR',
      availableLanguage: 'Spanish',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Balerdi 855',
      addressLocality: 'Villa María',
      addressRegion: 'Córdoba',
      postalCode: '5900',
      addressCountry: 'AR',
    },
  }

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {/* Main Content */}
      <PrivacidadClient />

      {/* Hidden SEO Content - Complete Legal Context */}
      <aside className="sr-only" aria-hidden="true">
        <h1>Política de Privacidad y Protección de Datos Personales - Azul Colchones</h1>
        
        <h2>Política de Privacidad de Azul Colchones Villa María, Córdoba, Argentina</h2>
        <p>
          En Azul Colchones, ubicados en Balerdi 855, Villa María, Córdoba, Argentina,
          nos comprometemos a proteger tu privacidad y datos personales de acuerdo con
          la Ley 25.326 de Protección de Datos Personales de Argentina. Esta política
          explica cómo recopilamos, usamos, almacenamos y protegemos tu información
          personal cuando comprás colchones en nuestra tienda física o tienda online.
        </p>

        <h2>Responsable del Tratamiento de Datos</h2>
        <p>
          <strong>Razón Social:</strong> Azul Colchones<br />
          <strong>Domicilio:</strong> Balerdi 855, Villa María, Córdoba, Argentina CP 5900<br />
          <strong>Email:</strong> privacidad@azulcolchones.com.ar<br />
          <strong>Teléfono:</strong> +54 9 3534 09-6566
        </p>

        <h2>Información que Recopilamos</h2>
        
        <h3>Datos Personales de Identificación</h3>
        <p>
          Cuando realizás una compra de colchones en Azul Colchones, recopilamos:
        </p>
        <ul>
          <li>Nombre completo y apellido</li>
          <li>Documento Nacional de Identidad (DNI)</li>
          <li>Dirección de correo electrónico</li>
          <li>Número de teléfono celular y/o fijo</li>
          <li>Fecha de nacimiento (cuando sea necesario)</li>
        </ul>

        <h3>Datos de Facturación y Envío</h3>
        <ul>
          <li>Dirección postal completa de entrega (calle, número, piso, departamento, ciudad, provincia, código postal)</li>
          <li>Dirección de facturación (si es diferente a la de entrega)</li>
          <li>CUIT/CUIL (para emisión de facturas)</li>
          <li>Condición tributaria (consumidor final, responsable inscripto, monotributista)</li>
        </ul>

        <h3>Información de Pago</h3>
        <p>
          Para procesar pagos de colchones, recopilamos:
        </p>
        <ul>
          <li>Información de tarjeta de crédito/débito (procesada de forma segura por Mercado Pago, Stripe u otros procesadores certificados PCI-DSS)</li>
          <li>Datos de transferencia bancaria (CBU/CVU cuando corresponda)</li>
          <li>Historial de transacciones y pagos</li>
        </ul>

        <h3>Información de Navegación y Uso del Sitio Web</h3>
        <ul>
          <li>Dirección IP</li>
          <li>Tipo de navegador y dispositivo</li>
          <li>Páginas visitadas en azulcolchones.com.ar</li>
          <li>Tiempo de permanencia en el sitio</li>
          <li>Cookies y tecnologías similares (ver nuestra Política de Cookies)</li>
        </ul>

        <h3>Historial de Compras y Preferencias</h3>
        <ul>
          <li>Productos adquiridos (tipos de colchones, medidas, modelos)</li>
          <li>Fechas de compra</li>
          <li>Montos de transacciones</li>
          <li>Preferencias de productos</li>
          <li>Consultas y comunicaciones con servicio al cliente</li>
        </ul>

        <h2>Cómo Utilizamos tu Información</h2>
        
        <h3>Procesamiento y Gestión de Pedidos</h3>
        <p>
          Utilizamos tus datos personales para:
        </p>
        <ul>
          <li>Procesar y confirmar tu pedido de colchones</li>
          <li>Coordinar la entrega en Villa María, Bell Ville, San Francisco y otras localidades de Córdoba</li>
          <li>Emitir facturas y comprobantes fiscales</li>
          <li>Procesar pagos y reembolsos cuando corresponda</li>
          <li>Gestionar garantías de 3 años en colchones</li>
          <li>Administrar devoluciones según Ley de Defensa del Consumidor</li>
        </ul>

        <h3>Comunicaciones y Servicio al Cliente</h3>
        <ul>
          <li>Enviar confirmaciones de pedido por email y WhatsApp</li>
          <li>Proporcionar actualizaciones de estado de envío</li>
          <li>Responder consultas sobre productos, envíos o garantías</li>
          <li>Solicitar feedback sobre tu experiencia de compra</li>
          <li>Enviar información sobre cuidado y mantenimiento de colchones</li>
        </ul>

        <h3>Marketing y Comunicaciones Promocionales (con consentimiento)</h3>
        <ul>
          <li>Enviar ofertas especiales y promociones de colchones</li>
          <li>Informar sobre nuevos productos y lanzamientos</li>
          <li>Compartir contenido educativo sobre descanso y colchones</li>
          <li>Invitaciones a eventos en nuestro showroom de Villa María</li>
        </ul>
        <p>
          <strong>Podés darte de baja en cualquier momento</strong> haciendo clic en "Desuscribir"
          en nuestros emails o contactándonos directamente.
        </p>

        <h3>Mejora de Productos y Servicios</h3>
        <ul>
          <li>Analizar tendencias de compra para mejorar nuestro catálogo</li>
          <li>Personalizar recomendaciones de productos</li>
          <li>Mejorar la experiencia de usuario en azulcolchones.com.ar</li>
          <li>Desarrollar nuevos productos según necesidades del mercado</li>
        </ul>

        <h3>Cumplimiento Legal y Obligaciones Fiscales</h3>
        <ul>
          <li>Cumplir con obligaciones fiscales ante AFIP</li>
          <li>Responder a requerimientos judiciales o de autoridades competentes</li>
          <li>Prevenir fraude y actividades ilícitas</li>
          <li>Cumplir con la Ley de Defensa del Consumidor (Ley 24.240)</li>
        </ul>

        <h2>Protección y Seguridad de Datos</h2>
        
        <h3>Medidas de Seguridad Técnicas</h3>
        <p>
          Implementamos múltiples capas de seguridad para proteger tus datos:
        </p>
        <ul>
          <li>Cifrado SSL/TLS en todas las comunicaciones del sitio web</li>
          <li>Almacenamiento encriptado de datos sensibles</li>
          <li>Firewalls y sistemas de prevención de intrusiones</li>
          <li>Monitoreo continuo de seguridad 24/7</li>
          <li>Copias de seguridad automáticas y regulares</li>
          <li>Procesadores de pago certificados PCI-DSS (Mercado Pago, Stripe)</li>
        </ul>

        <h3>Medidas de Seguridad Organizativas</h3>
        <ul>
          <li>Acceso restringido a datos personales (solo personal autorizado)</li>
          <li>Capacitación regular del personal en protección de datos</li>
          <li>Políticas internas de confidencialidad</li>
          <li>Acuerdos de confidencialidad con terceros que procesan datos</li>
          <li>Procedimientos de respuesta ante incidentes de seguridad</li>
        </ul>

        <h2>Compartir Información con Terceros</h2>
        
        <h3>Proveedores de Servicios Esenciales</h3>
        <p>
          Compartimos datos personales únicamente con terceros necesarios para operar nuestro negocio:
        </p>
        <ul>
          <li><strong>Procesadores de Pago:</strong> Mercado Pago, Stripe (para procesar transacciones)</li>
          <li><strong>Servicios de Envío:</strong> Empresas de transporte para entregar colchones en Córdoba</li>
          <li><strong>Servicios de Email:</strong> Para enviar comunicaciones transaccionales y marketing</li>
          <li><strong>Hosting y Almacenamiento:</strong> Servidores seguros para almacenar datos</li>
          <li><strong>Analytics:</strong> Google Analytics (datos anonimizados) para mejorar el sitio</li>
        </ul>
        <p>
          Todos estos terceros están obligados contractualmente a proteger tus datos y no pueden
          usarlos para otros fines.
        </p>

        <h3>Cumplimiento Legal</h3>
        <p>
          Podemos divulgar información personal cuando sea requerido por ley o autoridades competentes,
          incluyendo AFIP, juzgados, o en casos de investigación de fraude.
        </p>

        <h2>Tus Derechos según la Ley 25.326 de Argentina</h2>
        
        <h3>Derecho de Acceso</h3>
        <p>
          Tenés derecho a saber qué datos personales tenemos sobre vos y cómo los usamos.
          Podés solicitarnos una copia de tu información personal en cualquier momento.
        </p>

        <h3>Derecho de Rectificación</h3>
        <p>
          Si tus datos son incorrectos o están desactualizados, podés solicitar su corrección.
          Podés actualizar tu información en tu cuenta de usuario o contactándonos directamente.
        </p>

        <h3>Derecho de Supresión (Derecho al Olvido)</h3>
        <p>
          Podés solicitar la eliminación de tus datos personales cuando:
        </p>
        <ul>
          <li>Ya no sean necesarios para los fines para los que fueron recopilados</li>
          <li>Retires tu consentimiento para el tratamiento</li>
          <li>Los datos hayan sido tratados ilícitamente</li>
        </ul>
        <p>
          Nota: Podemos retener ciertos datos si existe una obligación legal (ej: registros contables
          por 10 años según legislación fiscal argentina).
        </p>

        <h3>Derecho de Oposición</h3>
        <p>
          Podés oponerte al procesamiento de tus datos personales para:
        </p>
        <ul>
          <li>Fines de marketing directo (desuscribirte de emails promocionales)</li>
          <li>Procesamiento basado en intereses legítimos</li>
        </ul>

        <h3>Derecho a Retirar el Consentimiento</h3>
        <p>
          Si el tratamiento se basa en tu consentimiento, podés retirarlo en cualquier momento
          sin que esto afecte la legalidad del tratamiento anterior.
        </p>

        <h3>Derecho de Portabilidad</h3>
        <p>
          Podés solicitar recibir tus datos personales en formato estructurado, de uso común
          y lectura mecánica (por ejemplo, CSV o JSON).
        </p>

        <h3>Cómo Ejercer tus Derechos</h3>
        <p>
          Para ejercer cualquiera de estos derechos, contactanos:
        </p>
        <ul>
          <li>Email: privacidad@azulcolchones.com.ar</li>
          <li>WhatsApp: +54 9 3534 09-6566</li>
          <li>Presencialmente: Balerdi 855, Villa María, Córdoba</li>
        </ul>
        <p>
          Responderemos a tu solicitud dentro de los 10 días hábiles según lo establecido
          por la Dirección Nacional de Protección de Datos Personales.
        </p>

        <h2>Cookies y Tecnologías de Seguimiento</h2>
        <p>
          Utilizamos cookies y tecnologías similares para mejorar tu experiencia en azulcolchones.com.ar:
        </p>
        <ul>
          <li><strong>Cookies Esenciales:</strong> Necesarias para el funcionamiento del sitio (carrito de compras, sesión)</li>
          <li><strong>Cookies de Rendimiento:</strong> Google Analytics para entender cómo usás el sitio</li>
          <li><strong>Cookies de Marketing:</strong> Para mostrarte anuncios relevantes (si das consentimiento)</li>
        </ul>
        <p>
          Podés configurar tu navegador para rechazar cookies, aunque esto puede afectar
          la funcionalidad del sitio. Ver nuestra Política de Cookies completa.
        </p>

        <h2>Retención de Datos</h2>
        <p>
          Conservamos tus datos personales durante:
        </p>
        <ul>
          <li><strong>Datos de clientes activos:</strong> Mientras mantengas una cuenta activa o relación comercial</li>
          <li><strong>Datos fiscales y contables:</strong> 10 años según legislación argentina</li>
          <li><strong>Datos de marketing:</strong> Hasta que te des de baja o solicites eliminación</li>
          <li><strong>Datos de garantías:</strong> 3 años desde la fecha de compra (duración de garantía)</li>
        </ul>

        <h2>Transferencias Internacionales de Datos</h2>
        <p>
          En general, tus datos personales se almacenan en servidores ubicados en Argentina
          o países con nivel adecuado de protección de datos. Si necesitamos transferir datos
          fuera de Argentina, lo haremos con garantías apropiadas (cláusulas contractuales estándar,
          certificaciones de privacidad).
        </p>

        <h2>Privacidad de Menores</h2>
        <p>
          Nuestros servicios están dirigidos a personas mayores de 18 años. No recopilamos
          intencionalmente información de menores de edad. Si tenés menos de 18 años, necesitás
          el consentimiento de tus padres o tutores para realizar compras.
        </p>

        <h2>Cambios a esta Política de Privacidad</h2>
        <p>
          Podemos actualizar esta política periódicamente. Te notificaremos sobre cambios
          significativos por email o mediante aviso destacado en azulcolchones.com.ar.
          La fecha de "Última actualización" al inicio indica cuándo se realizó la última modificación.
        </p>

        <h2>Legislación Aplicable</h2>
        <p>
          Esta política se rige por:
        </p>
        <ul>
          <li>Ley 25.326 de Protección de Datos Personales de Argentina</li>
          <li>Decreto 1558/2001 reglamentario de la Ley 25.326</li>
          <li>Disposiciones de la Dirección Nacional de Protección de Datos Personales</li>
          <li>Ley 24.240 de Defensa del Consumidor</li>
        </ul>

        <h2>Autoridad de Control</h2>
        <p>
          Dirección Nacional de Protección de Datos Personales<br />
          Ministerio de Justicia y Derechos Humanos de Argentina<br />
          Sarmiento 1118, Piso 5°, Ciudad Autónoma de Buenos Aires<br />
          Tel: 0800-222-3425<br />
          Web: www.argentina.gob.ar/aaip
        </p>

        <h2>Contacto para Consultas sobre Privacidad</h2>
        <address>
          <p><strong>Azul Colchones - Departamento de Privacidad</strong></p>
          <p>Email: privacidad@azulcolchones.com.ar</p>
          <p>WhatsApp: +54 9 3534 09-6566</p>
          <p>Dirección: Balerdi 855, Villa María, Córdoba, Argentina CP 5900</p>
          <p>Horario: Lunes a Viernes 9:00-19:00 | Sábados 9:00-13:00</p>
        </address>

        <p>
          <strong>Última actualización:</strong> Octubre 2024
        </p>
      </aside>
    </>
  )
}