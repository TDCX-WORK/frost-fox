import { useState } from "react"
import { motion } from "motion/react"
import { Zap, Lock, BadgeEuro } from "lucide-react"
import { Meteors } from "@/components/ui/meteors"
import styles from "./Contacto.module.css"
import personPointing from "../../../../assets/person-pointing.webp"

// ─────────────────────────────────────────────────────────────
// BORDER BEAM WRAPPER — idéntico al de Talent
// ─────────────────────────────────────────────────────────────
function BorderBeamWrapper({ children }) {
  return (
    <div className={styles.beamWrapper}>
      <div className={styles.beamSpin} style={{
        background: "conic-gradient(#116bd9 0deg, #0ea5e9 90deg, #38bdf8 160deg, transparent 200deg, transparent 300deg, #116bd9 360deg)",
        animationDuration: "4s",
      }} />
      <div className={styles.beamSpin} style={{
        background: "conic-gradient(transparent 0deg, transparent 160deg, #0ea5e9 220deg, #38bdf8 280deg, transparent 360deg)",
        animationDuration: "6s",
        animationDirection: "reverse",
        opacity: 0.6,
      }} />
      <div className={styles.beamInner}>{children}</div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// PERSON CARD — estilos exactos de Talent, muñeco señalando
// ─────────────────────────────────────────────────────────────
function PersonCard() {
  return (
    <BorderBeamWrapper>
      {/* Halos SVG — idénticos a Talent */}
      <svg className={styles.halosSvg} viewBox="0 0 400 500" fill="none">
        <defs>
          <radialGradient id="cOuter" cx="50%" cy="62%" r="50%">
            <stop offset="0%"   stopColor="#f97316" stopOpacity="0.2"  />
            <stop offset="45%"  stopColor="#ec4899" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0"    />
          </radialGradient>
          <radialGradient id="cInner" cx="50%" cy="38%" r="44%">
            <stop offset="0%"   stopColor="#06b6d4" stopOpacity="0.26" />
            <stop offset="55%"  stopColor="#3b82f6" stopOpacity="0.1"  />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0"    />
          </radialGradient>
          <linearGradient id="cLV" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#06b6d4" stopOpacity="0.6"  />
            <stop offset="55%"  stopColor="#ec4899" stopOpacity="0.4"  />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0"    />
          </linearGradient>
          <linearGradient id="cLH" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#6366f1" stopOpacity="0"    />
            <stop offset="40%"  stopColor="#0ea5e9" stopOpacity="0.42" />
            <stop offset="62%"  stopColor="#ec4899" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0"    />
          </linearGradient>
          <filter id="cBlur"><feGaussianBlur stdDeviation="20" /></filter>
          <filter id="cGlow">
            <feGaussianBlur stdDeviation="2.5" result="b" />
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <ellipse cx="200" cy="315" rx="185" ry="195" fill="url(#cOuter)" filter="url(#cBlur)" />
        <ellipse cx="200" cy="210" rx="128" ry="152" fill="url(#cInner)" filter="url(#cBlur)" />
        <line x1="200" y1="18"  x2="200" y2="488" stroke="url(#cLV)" strokeWidth="1"   opacity="0.28" filter="url(#cGlow)" />
        <line x1="12"  y1="258" x2="388" y2="258" stroke="url(#cLH)" strokeWidth="0.8" opacity="0.26" filter="url(#cGlow)" />
        <ellipse cx="200" cy="268" rx="142" ry="36" stroke="#0ea5e9" strokeWidth="0.7" strokeOpacity="0.17" fill="none" strokeDasharray="5 12" />
        <ellipse cx="200" cy="268" rx="98"  ry="24" stroke="#ec4899" strokeWidth="0.7" strokeOpacity="0.13" fill="none" strokeDasharray="3 16" />
        <circle cx="75"  cy="178" r="2.4" fill="#06b6d4" fillOpacity="0.55" />
        <circle cx="325" cy="158" r="2"   fill="#f97316" fillOpacity="0.5"  />
        <circle cx="55"  cy="342" r="1.8" fill="#ec4899" fillOpacity="0.5"  />
        <circle cx="345" cy="322" r="2.2" fill="#8b5cf6" fillOpacity="0.5"  />
        <circle cx="148" cy="95"  r="1.5" fill="#38bdf8" fillOpacity="0.4"  />
        <circle cx="262" cy="438" r="2"   fill="#f97316" fillOpacity="0.38" />
        <motion.circle cx="108" cy="196" r="1.5" fill="#0ea5e9" fillOpacity="0.6"
          animate={{ cy:[196,180,196], opacity:[0.6,1,0.6] }}
          transition={{ duration:3.2, repeat:Infinity, ease:"easeInOut" }} />
        <motion.circle cx="292" cy="290" r="1.5" fill="#ec4899" fillOpacity="0.5"
          animate={{ cy:[290,274,290], opacity:[0.5,0.9,0.5] }}
          transition={{ duration:4.1, repeat:Infinity, ease:"easeInOut", delay:1.2 }} />
        <motion.circle cx="170" cy="382" r="1.2" fill="#f97316" fillOpacity="0.5"
          animate={{ cy:[382,370,382], opacity:[0.5,0.85,0.5] }}
          transition={{ duration:3.7, repeat:Infinity, ease:"easeInOut", delay:0.6 }} />
      </svg>

      {/* Muñeco centrado, señalando a la derecha */}
      <img src={personPointing} alt="FrostFox" className={styles.personImg} />

      {/* Badge arriba izquierda */}
      <div className={styles.personBadge}>
        <span className={styles.badgeDot} />
        <span>Disponible ahora</span>
      </div>

      {/* Info glass — puede pisar ligeramente el pie */}
      <div className={styles.personInfo}>
        <div className={styles.infoItem}>
          <Zap size={13} color="#5de4ff" strokeWidth={2} />
          <span>Respuesta en 24h</span>
        </div>
        <div className={styles.infoItem}>
          <Lock size={13} color="#5de4ff" strokeWidth={2} />
          <span>Confidencialidad garantizada</span>
        </div>
        <div className={styles.infoItem}>
          <BadgeEuro size={13} color="#5de4ff" strokeWidth={2} />
          <span>Primera consulta sin coste</span>
        </div>
      </div>
    </BorderBeamWrapper>
  )
}

// ─────────────────────────────────────────────────────────────
// FORM FIELD
// ─────────────────────────────────────────────────────────────
function Field({ label, type = "text", placeholder, name, textarea = false }) {
  const [focused, setFocused] = useState(false)
  const Tag = textarea ? "textarea" : "input"
  return (
    <div className={`${styles.field} ${focused ? styles.fieldFocused : ""}`}>
      <label className={styles.fieldLabel}>{label}</label>
      <Tag
        name={name}
        type={!textarea ? type : undefined}
        placeholder={placeholder}
        className={styles.fieldInput}
        rows={textarea ? 4 : undefined}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <motion.div
        className={styles.fieldLine}
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// CONTACTO
// ─────────────────────────────────────────────────────────────
export default function Contacto() {
  const [sent, setSent] = useState(false)

  return (
    <section className={styles.section} id="contacto">
      <div className={styles.meteorsWrap}>
        <Meteors number={10} />
      </div>
      <div className={styles.bgMesh} />

      <div className={styles.content}>

        {/* HEADER */}
        <div className={styles.header}>
          <motion.span className={styles.pill}
            initial={{ opacity:0, y:10 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.5 }}
          >Contacto</motion.span>
          <motion.h2 className={styles.title}
            initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.65, delay:0.08, ease:[0.16,1,0.3,1] }}
          >
            Hablemos de<br />
            <span className={styles.titleAccent}>tu proyecto.</span>
          </motion.h2>
          <motion.p className={styles.subtitle}
            initial={{ opacity:0 }} whileInView={{ opacity:1 }}
            viewport={{ once:true }} transition={{ duration:0.55, delay:0.16 }}
          >
            Sin formularios eternos. Sin esperas. Cuéntanos qué necesitas
            y en menos de 24h tienes una propuesta real.
          </motion.p>
        </div>

        {/* SPLIT */}
        <div className={styles.split}>

          {/* PERSONA */}
          <motion.div className={styles.personSide}
            initial={{ opacity:0, x:-32 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }} transition={{ duration:0.75, ease:[0.16,1,0.3,1] }}
          >
            <PersonCard />
          </motion.div>

          {/* FORMULARIO */}
          <motion.div className={styles.formSide}
            initial={{ opacity:0, x:32 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }} transition={{ duration:0.75, delay:0.1, ease:[0.16,1,0.3,1] }}
          >
            <div className={styles.formCard}>
              {!sent ? (
                <form className={styles.form} onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
                  <div className={styles.formRow}>
                    <Field label="Nombre"  placeholder="Tu nombre"    name="nombre"  />
                    <Field label="Empresa" placeholder="Tu empresa"   name="empresa" />
                  </div>
                  <Field label="Email" type="email" placeholder="tu@empresa.com" name="email" />
                  <div className={styles.selectWrap}>
                    <label className={styles.fieldLabel}>Servicio</label>
                    <select className={styles.select} name="servicio">
                      <option value="">¿Qué necesitas?</option>
                      <option value="webdev">FrostFox WebDev — Web o App</option>
                      <option value="academy">FrostFox Academy — SaaS B2B</option>
                      <option value="talent">FrostFox Talent — Outsourcing</option>
                      <option value="otro">Otro / No lo sé aún</option>
                    </select>
                  </div>
                  <Field label="Mensaje" placeholder="Cuéntanos tu proyecto, situación o duda..." name="mensaje" textarea />
                  <motion.button type="submit" className={styles.submitBtn}
                    whileHover={{ scale:1.02, boxShadow:"0 0 40px rgba(93,228,255,0.35)" }}
                    whileTap={{ scale:0.97 }}
                  >Enviar mensaje →</motion.button>
                  <p className={styles.formNote}>Sin spam. Sin intermediarios. Solo nosotros.</p>
                </form>
              ) : (
                <motion.div className={styles.successMsg}
                  initial={{ opacity:0, scale:0.92 }} animate={{ opacity:1, scale:1 }}
                  transition={{ duration:0.5, ease:[0.16,1,0.3,1] }}
                >
                  <span className={styles.successIcon}>✓</span>
                  <h3 className={styles.successTitle}>¡Mensaje enviado!</h3>
                  <p className={styles.successBody}>Te contestamos en menos de 24h.</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
