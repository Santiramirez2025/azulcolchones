// app/terminos/page.tsx - ULTRA OPTIMIZED ⚡ SERVER COMPONENT
import type { Metadata } from 'next'
import { TerminosClient } from './TerminosClient'

// ============================================================================
// METADATA & SEO
// ============================================================================
export const metadata: Metadata = {
  title: 'Términos y Condiciones | Azul Colchones Villa María - Legal Completo',
  description: 'Términos y condiciones de compra en Azul Colchones. Información legal completa sobre envíos, garantías, devoluciones y derechos del consumidor según Ley 24.240. Villa María, Córdoba.',
  keywords: [
    'términos condiciones azul colchones',
    'condiciones compra colchones',
    'garantía legal colchones argentina',
    'derecho arrepentimiento colchones',
    'ley defensa consumidor',
    'términos legales villa maría',
    'condiciones venta colchones',
  ],
  openGraph: {
    title: 'Términos y Condiciones | Azul Colchones',
    description: 'Información legal completa sobre compras, garantías y derechos del consumidor',
    type: 'website',
    locale: 'es_AR',
    siteName: 'Azul Colchones',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://azulcolchones.com.ar/terminos',
  },
}

// ============================================================================
// PERFORMANCE CONFIGURATION
// ============================================================================
export const revalidate = 2592000 // Revalidate once per month (legal pages change rarely)

// ============================================================================
// MAIN PAGE COMPONENT (SERVER)
// ============================================================================
export default function TerminosPage() {
  // WebPage Schema
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Términos y Condiciones - Azul Colchones',
    description: 'Términos y condiciones de compra, garantías y derechos del consumidor',
    url: 'https://azulcolchones.com.ar/terminos',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Azul Colchones',
      url: 'https://azulcolchones.com.ar',
    },
    about: {
      '@type': 'Thing',
      name: 'Términos y Condiciones de Venta',
    },
    dateModified: '2024-11-01',
    inLanguage: 'es-AR',
  }

  // Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Azul Colchones',
    url: 'https://azulcolchones.com.ar',
    logo: 'https://azulcolchones.com.ar/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+54-353-401-7332',
      contactType: 'customer service',
      email: 'info@azulcolchones.com.ar',
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
      <TerminosClient />

      {/* Hidden SEO Content - Complete Legal Context */}
      <aside className="sr-only" aria-hidden="true">
        <h1>Términos y Condiciones de Venta - Azul Colchones Villa María, Córdoba</h1>
        
        <h2>Términos y Condiciones Completos de Azul Colchones</h2>
        <p>
          Estos términos y condiciones regulan la compra de colchones en Azul Colchones,
          con domicilio en Balerdi 855, Villa María, Córdoba, Argentina. Están elaborados
          en conformidad con la Ley 24.240 de Defensa del Consumidor, Ley 25.326 de
          Protección de Datos Personales y demás normativas vigentes en Argentina.
        </p>

        <h2>Aceptación de los Términos y Condiciones</h2>
        <p>
          Al acceder y utilizar el sitio web azulcolchones.com.ar, o al realizar una compra
          en nuestro local físico en Villa María, aceptás estar sujeto a estos términos y
          condiciones de uso, nuestra política de privacidad y todas las leyes aplicables
          de la República Argentina. Si no estás de acuerdo con estos términos, por favor
          no utilices nuestro sitio ni realices compras.
        </p>

        <h2>Condiciones de Compra de Productos</h2>
        <h3>Requisitos para Comprar</h3>
        <ul>
          <li>Debés ser mayor de 18 años para realizar compras</li>
          <li>Toda la información proporcionada debe ser veraz, exacta y actualizada</li>
          <li>Debés proporcionar un email válido y número de teléfono de contacto</li>
          <li>Aceptás recibir comunicaciones sobre tu pedido por email y WhatsApp</li>
        </ul>

        <h3>Precios y Facturación</h3>
        <p>
          Todos los precios publicados en azulcolchones.com.ar están expresados en pesos
          argentinos (ARS) e incluyen IVA (21%). Los precios están sujetos a cambios sin
          previo aviso, pero el precio aplicable será el vigente al momento de confirmar
          tu pedido. Emitimos factura A o B según tu condición frente a AFIP. Para factura A,
          necesitamos tu CUIT y razón social.
        </p>

        <h3>Confirmación de Pedidos</h3>
        <p>
          Recibirás confirmación de tu pedido por email y/o WhatsApp dentro de las 24 horas
          posteriores a tu compra. La compra se considera finalizada al recibir el pago
          confirmado por nuestros sistemas. Nos reservamos el derecho de cancelar pedidos
          en caso de error en precios, falta de stock o problemas de pago.
        </p>

        <h2>Envíos y Entregas en Villa María y Córdoba</h2>
        <h3>Zonas de Envío Gratis</h3>
        <p>
          Realizamos envíos GRATIS a: Villa María, Villa Nueva, Bell Ville, San Francisco,
          Río Tercero y localidades cercanas dentro de un radio de 100km. Para otras zonas
          de Córdoba y provincias vecinas, consultá costos de envío por WhatsApp al
          353 401 7332.
        </p>

        <h3>Tiempos de Entrega</h3>
        <p>
          El tiempo de entrega es de 3-7 días hábiles según la zona. Los colchones se envían
          enrollados y empaquetados al vacío en cajas para facilitar el transporte y manejo.
          Recibirás un número de seguimiento cuando tu pedido sea despachado.
        </p>

        <h3>Recepción del Producto</h3>
        <p>
          Al recibir tu colchón, es importante verificar el estado del paquete en presencia
          del transportista. Si el paquete presenta daños evidentes, tenés derecho a rechazar
          la entrega. Contactanos inmediatamente si detectás algún problema.
        </p>

        <h2>Derecho de Arrepentimiento (Ley 24.240)</h2>
        <h3>Plazo Legal</h3>
        <p>
          Según el Artículo 34 de la Ley de Defensa del Consumidor N° 24.240, tenés derecho
          a arrepentirte de tu compra dentro de los 10 días corridos desde que recibís el
          producto, sin necesidad de justificación.
        </p>

        <h3>Condiciones para Devolución</h3>
        <ul>
          <li>El colchón debe estar sin usar, en perfectas condiciones</li>
          <li>Debe conservar su embalaje original sin daños</li>
          <li>No debe presentar manchas, roturas ni signos de uso</li>
          <li>Debe incluir todos los accesorios y documentación original</li>
        </ul>

        <h3>Procedimiento de Devolución</h3>
        <p>
          Para ejercer tu derecho de arrepentimiento, contactanos por WhatsApp al 353 401 7332
          o por email a info@azulcolchones.com.ar indicando número de pedido. Los gastos de
          devolución corren por cuenta del comprador. Te reintegraremos el importe total
          (precio del producto) dentro de los 5 días hábiles posteriores a recibir el producto
          en nuestras instalaciones en Villa María.
        </p>

        <h2>Garantía Legal de Productos</h2>
        <h3>Cobertura de Garantía</h3>
        <p>
          Todos nuestros colchones cuentan con 3 años de garantía contra defectos de fabricación,
          según la normativa argentina vigente y las especificaciones de cada fabricante. La
          garantía cubre:
        </p>
        <ul>
          <li>Defectos en materiales de fabricación</li>
          <li>Roturas o desprendimientos de costuras</li>
          <li>Deformaciones superiores a 2 centímetros</li>
          <li>Fallas estructurales del núcleo del colchón</li>
        </ul>

        <h3>Exclusiones de Garantía</h3>
        <p>La garantía NO cubre:</p>
        <ul>
          <li>Desgaste normal por uso habitual</li>
          <li>Manchas, roturas o daños causados por el usuario</li>
          <li>Daños por uso con bases o sommiers inadecuados</li>
          <li>Daños por exposición a líquidos, humedad o fuego</li>
          <li>Hundimientos menores a 2cm (considerados normales)</li>
          <li>Preferencias personales de firmeza o confort</li>
        </ul>

        <h3>Hacer Válida la Garantía</h3>
        <p>
          Para hacer válida la garantía, debés conservar tu factura o comprobante de compra
          original. Contactanos por WhatsApp o email con fotos del defecto y número de pedido.
          Evaluaremos el caso y coordinaremos el retiro, reparación o reemplazo según corresponda.
        </p>

        <h2>Formas de Pago Disponibles</h2>
        <h3>Pagos en Línea</h3>
        <ul>
          <li>Mercado Pago: hasta 12 cuotas sin interés</li>
          <li>Tarjetas de crédito: hasta 12 cuotas sin interés</li>
          <li>Tarjetas de débito: pago en un solo pago</li>
          <li>Transferencia bancaria: CBU/CVU disponible al finalizar compra</li>
        </ul>

        <h3>Pagos Presenciales</h3>
        <ul>
          <li>Efectivo en nuestro local de Villa María</li>
          <li>Tarjetas de crédito y débito en POS</li>
          <li>Transferencia bancaria inmediata</li>
        </ul>

        <h3>Seguridad en Pagos</h3>
        <p>
          Todos los pagos en línea se procesan de forma segura a través de plataformas
          certificadas (Mercado Pago, Stripe) con encriptación SSL. Nunca almacenamos
          información de tarjetas de crédito en nuestros servidores.
        </p>

        <h2>Propiedad Intelectual</h2>
        <p>
          Todo el contenido de azulcolchones.com.ar, incluyendo textos, imágenes, fotografías,
          logos, videos, diseños gráficos, código fuente y elementos multimedia, es propiedad
          exclusiva de Azul Colchones o de sus licenciantes, y está protegido por las leyes
          de propiedad intelectual de la República Argentina (Ley 11.723). Queda estrictamente
          prohibida su reproducción, distribución, modificación o uso comercial sin autorización
          expresa por escrito.
        </p>

        <h2>Protección de Datos Personales (Ley 25.326)</h2>
        <p>
          Tus datos personales serán tratados conforme a la Ley 25.326 de Protección de Datos
          Personales de Argentina. Utilizamos tu información únicamente para: procesar pedidos,
          gestionar envíos, emitir facturas, enviar comunicaciones relacionadas con tu compra,
          y mejorar nuestros servicios. No compartimos ni vendemos tus datos a terceros sin
          tu consentimiento. Para más información, consultá nuestra Política de Privacidad.
        </p>

        <h2>Limitación de Responsabilidad</h2>
        <p>Azul Colchones no se responsabiliza por:</p>
        <ul>
          <li>Demoras en entregas causadas por terceros (empresas de transporte, condiciones climáticas)</li>
          <li>Daños ocasionados durante el transporte (verificá el paquete al recibirlo)</li>
          <li>Información incorrecta proporcionada por el cliente (dirección, teléfono, datos de facturación)</li>
          <li>Uso inadecuado del producto contrario a las instrucciones del fabricante</li>
          <li>Fallas en servicios de terceros (procesadores de pago, proveedores de internet)</li>
        </ul>
        <p>
          Nuestra responsabilidad máxima se limita al valor del producto adquirido, excluyendo
          daños indirectos, lucro cesante o perjuicios especiales.
        </p>

        <h2>Jurisdicción y Ley Aplicable</h2>
        <p>
          Estos términos y condiciones se rigen por las leyes de la República Argentina,
          particularmente la Ley 24.240 de Defensa del Consumidor. Para cualquier controversia,
          reclamo o interpretación de estos términos, las partes se someten voluntariamente a
          la jurisdicción de los Tribunales Ordinarios de la ciudad de Villa María, Provincia
          de Córdoba, con renuncia expresa a cualquier otro fuero o jurisdicción que pudiere
          corresponder.
        </p>

        <h2>Defensa del Consumidor</h2>
        <p>
          Como consumidor argentino, tenés derechos que te protegen. Ante cualquier inconveniente,
          podés contactar a:
        </p>
        <ul>
          <li>Dirección Provincial de Comercio Interior y Defensa del Consumidor de Córdoba</li>
          <li>Dirección Nacional de Defensa del Consumidor: argentina.gob.ar/defensadelconsumidor</li>
          <li>Línea gratuita: 0800-666-1518</li>
        </ul>

        <h2>Modificaciones a los Términos</h2>
        <p>
          Nos reservamos el derecho de modificar estos términos y condiciones en cualquier
          momento. Los cambios entrarán en vigencia inmediatamente después de su publicación
          en azulcolchones.com.ar. Te recomendamos revisar periódicamente esta página. El uso
          continuado del sitio después de cambios constituye tu aceptación de los nuevos términos.
        </p>

        <h2>Información de Contacto</h2>
        <address>
          <p><strong>Azul Colchones</strong></p>
          <p>Dirección: Balerdi 855, Villa María, Córdoba, Argentina CP 5900</p>
          <p>WhatsApp: +54 9 353 401 7332</p>
          <p>Email: info@azulcolchones.com.ar</p>
          <p>Horarios: Lunes a Viernes 9:00-19:00 | Sábados 9:00-13:00</p>
        </address>

        <p>
          <strong>Última actualización:</strong> Noviembre 2024
        </p>
      </aside>
    </>
  )
}