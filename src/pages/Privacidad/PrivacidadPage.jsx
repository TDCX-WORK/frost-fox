import { motion } from "motion/react"
import { Link } from "react-router-dom"
import styles from "./PrivacidadPage.module.css"

// ─────────────────────────────────────────────────────────────
// DATOS IDENTIFICATIVOS DEL RESPONSABLE — actualiza si cambia
// ─────────────────────────────────────────────────────────────
const EMPRESA   = "FrostFox Labs S.L."        // o nombre autónomo
const CIF       = "XXXXXXXXX"                 // ← Pon tu CIF/NIF real
const DOMICILIO = "España"                    // dirección completa si la tienes
const EMAIL     = "frostfoxlabs@gmail.com"
const PHONE     = "+34 641 74 73 08"
const WEB       = "www.thefrostfox.com"

const LAST_UPDATE = "Abril 2025"

export default function PrivacidadPage() {
  return (
    <div className={styles.page}>

      {/* NAV mínimo */}
      <nav className={styles.nav}>
        <Link to="/" className={styles.navBack}>← Volver a FrostFox</Link>
        <span className={styles.navBadge}>Documento legal · {LAST_UPDATE}</span>
      </nav>

      <main className={styles.main}>
        <motion.div
          className={styles.container}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.header}>
            <span className={styles.pill}>Legal · RGPD</span>
            <h1 className={styles.title}>Política de Privacidad</h1>
            <p className={styles.meta}>Última actualización: {LAST_UPDATE} · {WEB}</p>
          </div>

          <div className={styles.body}>

            {/* 1 */}
            <Section num="1" title="Responsable del Tratamiento">
              <p>En cumplimiento del <strong>Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo (RGPD)</strong> y de la <strong>Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD)</strong>, te informamos de los siguientes extremos:</p>
              <Table rows={[
                ["Denominación social",  EMPRESA],
                ["CIF / NIF",            CIF],
                ["Domicilio",            DOMICILIO],
                ["Correo electrónico",   EMAIL],
                ["Teléfono",             PHONE],
                ["Sitio web",            WEB],
              ]} />
            </Section>

            {/* 2 */}
            <Section num="2" title="Datos que recabamos y finalidad del tratamiento">
              <p>Tratamos los datos personales que nos facilitas a través de los formularios de contacto y comunicaciones directas. En concreto:</p>
              <ul>
                <li><strong>Formulario de contacto:</strong> nombre, empresa (opcional), dirección de correo electrónico, servicio de interés y mensaje. <em>Finalidad:</em> atender tu consulta y remitirte la información o propuesta solicitada.</li>
                <li><strong>WhatsApp / llamada telefónica:</strong> número de teléfono e información que compartas en la conversación. <em>Finalidad:</em> atender la consulta y, si así lo solicitas, enviar presupuesto o información comercial.</li>
                <li><strong>Cookies técnicas y analíticas:</strong> datos de navegación anonimizados para mejorar el funcionamiento del sitio web. Para más información, consulta nuestra <Link to="/cookies" className={styles.inlineLink}>Política de Cookies</Link>.</li>
              </ul>
              <p><strong>No realizamos perfilado automatizado</strong> ni tomamos decisiones automatizadas con efectos jurídicos significativos sobre los interesados.</p>
            </Section>

            {/* 3 */}
            <Section num="3" title="Base jurídica del tratamiento">
              <Table rows={[
                ["Atención de consultas",                    "Art. 6.1.b RGPD — ejecución de medidas precontractuales a petición del interesado"],
                ["Envío de información comercial (si se solicita)", "Art. 6.1.a RGPD — consentimiento del interesado"],
                ["Cumplimiento de obligaciones legales",    "Art. 6.1.c RGPD — obligación legal"],
                ["Mejora del sitio web (analítica)",        "Art. 6.1.f RGPD — interés legítimo del responsable"],
              ]} header={["Actividad", "Base jurídica"]} />
            </Section>

            {/* 4 */}
            <Section num="4" title="Destinatarios y transferencias internacionales">
              <p>Los datos personales <strong>no se ceden ni venden a terceros</strong> salvo obligación legal o las siguientes categorías de encargados del tratamiento:</p>
              <ul>
                <li><strong>Proveedor de servicios de email (EmailJS / Google Workspace):</strong> para el envío y recepción de correos. Se encuentran adheridos al Data Privacy Framework UE–EE. UU. o disponen de cláusulas contractuales tipo aprobadas por la Comisión Europea.</li>
                <li><strong>Proveedor de alojamiento web:</strong> para el mantenimiento de la infraestructura técnica, dentro de la UE/EEE o con garantías equivalentes.</li>
                <li><strong>WhatsApp (Meta Platforms Ireland Ltd.):</strong> cuando inicias una conversación voluntariamente. Consulta la política de privacidad de WhatsApp en <a href="https://www.whatsapp.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>whatsapp.com/legal/privacy-policy</a>.</li>
              </ul>
              <p>No se realizan transferencias internacionales de datos fuera del Espacio Económico Europeo (EEE) más allá de las descritas anteriormente, las cuales cuentan con las garantías adecuadas exigidas por el RGPD.</p>
            </Section>

            {/* 5 */}
            <Section num="5" title="Plazo de conservación de los datos">
              <ul>
                <li><strong>Consultas sin relación contractual:</strong> los datos se conservan el tiempo necesario para atender la solicitud y, como máximo, <strong>12 meses</strong> desde el último contacto, salvo que el interesado solicite su supresión antes.</li>
                <li><strong>Relación contractual:</strong> durante la vigencia del contrato y, posteriormente, durante los plazos establecidos por la legislación mercantil y fiscal española (<strong>6 años</strong> conforme al Código de Comercio; <strong>4 años</strong> conforme a la Ley General Tributaria).</li>
                <li><strong>Datos de cookies analíticas:</strong> máximo <strong>13 meses</strong> desde su obtención.</li>
              </ul>
            </Section>

            {/* 6 */}
            <Section num="6" title="Derechos del interesado">
              <p>Puedes ejercer en cualquier momento los siguientes derechos reconocidos por el RGPD:</p>
              <ul>
                <li><strong>Acceso (art. 15 RGPD):</strong> obtener confirmación sobre si tratamos tus datos y, en su caso, acceder a ellos.</li>
                <li><strong>Rectificación (art. 16 RGPD):</strong> solicitar la corrección de datos inexactos o incompletos.</li>
                <li><strong>Supresión / "derecho al olvido" (art. 17 RGPD):</strong> pedir la eliminación de tus datos cuando, entre otros supuestos, ya no sean necesarios para los fines para los que se recabaron.</li>
                <li><strong>Limitación del tratamiento (art. 18 RGPD):</strong> solicitar que suspendamos temporalmente el tratamiento de tus datos.</li>
                <li><strong>Portabilidad (art. 20 RGPD):</strong> recibir tus datos en formato estructurado y de uso común, o que los transmitamos a otro responsable.</li>
                <li><strong>Oposición (art. 21 RGPD):</strong> oponerte al tratamiento basado en interés legítimo o a recibir comunicaciones comerciales.</li>
                <li><strong>Retirada del consentimiento:</strong> en cualquier momento, sin que ello afecte a la licitud del tratamiento previo.</li>
              </ul>
              <p>Para ejercer estos derechos, envía un correo a <a href={`mailto:${EMAIL}`} className={styles.inlineLink}>{EMAIL}</a> indicando tu solicitud y adjuntando copia de tu DNI u otro documento de identidad válido. Te responderemos en el plazo máximo de <strong>un mes</strong> (prorrogable otros dos meses en casos complejos).</p>
              <p>Si consideras que el tratamiento de tus datos no se ajusta a la normativa vigente, tienes derecho a presentar una reclamación ante la <strong>Agencia Española de Protección de Datos (AEPD)</strong>: <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>www.aepd.es</a>.</p>
            </Section>

            {/* 7 */}
            <Section num="7" title="Medidas de seguridad">
              <p>Hemos adoptado las medidas técnicas y organizativas necesarias para garantizar la seguridad de los datos personales y evitar su alteración, pérdida, tratamiento o acceso no autorizado, teniendo en cuenta el estado de la tecnología, la naturaleza de los datos almacenados y los riesgos a que están expuestos (art. 32 RGPD). Entre otras medidas:</p>
              <ul>
                <li>Comunicaciones cifradas mediante protocolo HTTPS/TLS.</li>
                <li>Acceso a los datos restringido al personal autorizado.</li>
                <li>No almacenamos datos de tarjetas de crédito ni información financiera sensible en nuestros sistemas.</li>
              </ul>
            </Section>

            {/* 8 */}
            <Section num="8" title="Menores de edad">
              <p>Nuestros servicios están dirigidos a empresas y profesionales. No recabamos conscientemente datos personales de menores de 14 años. Si detectamos que hemos obtenido datos de un menor sin el consentimiento de sus progenitores o tutores, procederemos a su eliminación inmediata.</p>
            </Section>

            {/* 9 */}
            <Section num="9" title="Uso del formulario de contacto — consentimiento informado">
              <p>Al marcar la casilla de consentimiento en el formulario de contacto, declaras haber leído y aceptado la presente Política de Privacidad, y prestas tu consentimiento expreso para que <strong>{EMPRESA}</strong> trate tus datos con la finalidad de atender tu consulta. Este consentimiento es revocable en cualquier momento.</p>
            </Section>

            {/* 10 */}
            <Section num="10" title="Cambios en esta política">
              <p>Nos reservamos el derecho a actualizar esta Política de Privacidad en cualquier momento para adaptarla a novedades legislativas, jurisprudenciales o de negocio. La versión actualizada estará siempre disponible en esta misma página con la fecha de última modificación. Te recomendamos consultarla periódicamente.</p>
            </Section>

          </div>

          {/* Footer del documento */}
          <div className={styles.docFooter}>
            <Link to="/" className={styles.backBtn}>← Volver al inicio</Link>
            <span className={styles.docMeta}>{EMPRESA} · {LAST_UPDATE} · {WEB}</span>
          </div>

        </motion.div>
      </main>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────
function Section({ num, title, children }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>
        <span className={styles.sectionNum}>{num}.</span> {title}
      </h2>
      <div className={styles.sectionBody}>{children}</div>
    </section>
  )
}

function Table({ rows, header }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        {header && (
          <thead>
            <tr>
              {header.map((h, i) => <th key={i}>{h}</th>)}
            </tr>
          </thead>
        )}
        <tbody>
          {rows.map(([a, b], i) => (
            <tr key={i}>
              <td><strong>{a}</strong></td>
              <td>{b}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
