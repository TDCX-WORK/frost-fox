import { useState, useRef } from "react"
import { motion } from "motion/react"
import { Zap, Lock, BadgeEuro, MessageCircle, Mail, Phone } from "lucide-react"
import { Meteors } from "@/components/ui/meteors"
import styles from "./Contacto.module.css"
import personPointing from "../../../../assets/person-pointing.webp"

// ─────────────────────────────────────────────────────────────
// DATOS DE CONTACTO — editar aquí
// ─────────────────────────────────────────────────────────────
const PHONE_RAW   = "34641747308"           // sin + ni espacios
const PHONE_SHOW  = "+34 641 74 73 08"
const EMAIL       = "frostfoxlabs@gmail.com"
const WA_DEFAULT  = `https://wa.me/${PHONE_RAW}?text=${encodeURIComponent("Hola FrostFox, me gustaría obtener más información sobre vuestros servicios.")}`

// ─────────────────────────────────────────────────────────────
// EMAILJS CONFIG — crea cuenta gratis en emailjs.com
//   1. Crea un servicio Gmail y copia el Service ID
//   2. Crea una plantilla con variables: {{nombre}}, {{empresa}},
//      {{email}}, {{servicio}}, {{mensaje}}
//   3. Copia el Template ID y el Public Key
// ─────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = "service_jhx4fzs"    // ej: "service_abc123"
const EMAILJS_TEMPLATE_ID = "template_tglseyw"   // ej: "template_xyz789"
const EMAILJS_PUBLIC_KEY  = "1kHO__QQ6RtHzyLwZ"    // ej: "aBcDeFgHiJkLmNoP"

// ─────────────────────────────────────────────────────────────
// BORDER BEAM WRAPPER
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
// PERSON CARD
// ─────────────────────────────────────────────────────────────
function PersonCard() {
  return (
    <BorderBeamWrapper>
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

      <img src={personPointing} alt="FrostFox — agencia de soluciones digitales B2B" className={styles.personImg} />

      <div className={styles.personBadge}>
        <span className={styles.badgeDot} />
        <span>Disponible ahora</span>
      </div>

      {/* Info */}
      <div className={styles.personInfo}>
        <div className={styles.infoItem}>
          <Zap size={13} color="#5de4ff" strokeWidth={2} />
          <span>Respuesta en menos de 24h</span>
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
// FIELD
// ─────────────────────────────────────────────────────────────
function Field({ label, type = "text", placeholder, name, textarea = false, value, onChange, required }) {
  const [focused, setFocused] = useState(false)
  const Tag = textarea ? "textarea" : "input"
  return (
    <div className={`${styles.field} ${focused ? styles.fieldFocused : ""}`}>
      <label className={styles.fieldLabel}>{label}{required && <span style={{ color: "#5de4ff" }}> *</span>}</label>
      <Tag
        name={name}
        type={!textarea ? type : undefined}
        placeholder={placeholder}
        className={styles.fieldInput}
        rows={textarea ? 4 : undefined}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
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
// CONTACTO PRINCIPAL
// ─────────────────────────────────────────────────────────────
export default function Contacto() {
  const [sent, setSent]       = useState(false)
  const [error, setError]     = useState(false)
  const [loading, setLoading] = useState(false)
  const [privacy, setPrivacy] = useState(false)
  const [form, setForm]       = useState({
    nombre: "", empresa: "", email: "", servicio: "", mensaje: ""
  })

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!privacy) return
    setLoading(true)
    setError(false)

    try {
      const templateParams = {
        nombre:   form.nombre,
        empresa:  form.empresa || "No indicada",
        email:    form.email,
        servicio: form.servicio || "No especificado",
        mensaje:  form.mensaje,
      }

      // 1 — Notificación interna a FrostFox
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          service_id:      EMAILJS_SERVICE_ID,
          template_id:     EMAILJS_TEMPLATE_ID,
          user_id:         EMAILJS_PUBLIC_KEY,
          template_params: templateParams,
        }),
      })

      if (!res.ok) throw new Error("EmailJS error")

      // 2 — Auto-reply al cliente
      await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          service_id:      EMAILJS_SERVICE_ID,
          template_id:     "template_wkns0iv",
          user_id:         EMAILJS_PUBLIC_KEY,
          template_params: templateParams,
        }),
      })

      setSent(true)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

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

          {/* Accesos rápidos */}
          <motion.div className={styles.quickAccess}
            initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.5, delay:0.24 }}
          >
            <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" className={styles.quickWa}>
              <MessageCircle size={16} strokeWidth={2} />
              WhatsApp directo
            </a>
            <a href={`tel:+${PHONE_RAW}`} className={styles.quickPhone}>
              <Phone size={16} strokeWidth={2} />
              {PHONE_SHOW}
            </a>
            <a href={`mailto:${EMAIL}`} className={styles.quickEmail}>
              <Mail size={16} strokeWidth={2} />
              {EMAIL}
            </a>
          </motion.div>
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
              {sent ? (
                <motion.div className={styles.successMsg}
                  initial={{ opacity:0, scale:0.92 }} animate={{ opacity:1, scale:1 }}
                  transition={{ duration:0.5, ease:[0.16,1,0.3,1] }}
                >
                  <div className={styles.successIcon}>✓</div>
                  <h3 className={styles.successTitle}>¡Mensaje enviado!</h3>
                  <p className={styles.successBody}>
                    Te contestamos en menos de 24h en el correo <strong>{form.email}</strong>.<br />
                    También puedes escribirnos directamente por WhatsApp.
                  </p>
                  <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" className={styles.successWa}>
                    <MessageCircle size={15} />
                    Escribir por WhatsApp
                  </a>
                </motion.div>
              ) : (
                <form className={styles.form} onSubmit={handleSubmit}>
                  <div className={styles.formRow}>
                    <Field label="Nombre"  placeholder="Tu nombre"   name="nombre"  value={form.nombre}  onChange={handleChange} required />
                    <Field label="Empresa" placeholder="Tu empresa"  name="empresa" value={form.empresa} onChange={handleChange} />
                  </div>
                  <Field label="Email" type="email" placeholder="tu@empresa.com" name="email" value={form.email} onChange={handleChange} required />
                  <div className={styles.selectWrap}>
                    <label className={styles.fieldLabel} htmlFor="servicio">Servicio</label>
                    <select className={styles.select} id="servicio" name="servicio" value={form.servicio} onChange={handleChange}>
                      <option value="">¿Qué necesitas?</option>
                      <option value="webdev">FrostFox WebDev — Web o App</option>
                      <option value="academy">FrostFox Academy — SaaS B2B</option>
                      <option value="talent">FrostFox Talent — Outsourcing</option>
                      <option value="otro">Otro / No lo sé aún</option>
                    </select>
                  </div>
                  <Field label="Mensaje" placeholder="Cuéntanos tu proyecto, situación o duda..." name="mensaje" value={form.mensaje} onChange={handleChange} textarea required />

                  {/* Checkbox RGPD — obligatorio */}
                  <div className={styles.privacyWrap}>
                    <button
                      type="button"
                      className={`${styles.privacyBox} ${privacy ? styles.privacyBoxChecked : ""}`}
                      onClick={() => setPrivacy(p => !p)}
                      aria-label="Aceptar política de privacidad"
                    >
                      {privacy && <span className={styles.privacyCheck}>✓</span>}
                    </button>
                    <p className={styles.privacyText}>
                      He leído y acepto la{" "}
                      <a href="/privacidad" target="_blank" rel="noopener noreferrer" className={styles.privacyLink}>
                        Política de Privacidad
                      </a>
                      {" "}y el tratamiento de mis datos conforme al{" "}
                      <a href="/privacidad" target="_blank" rel="noopener noreferrer" className={styles.privacyLink}>
                        RGPD (UE) 2016/679
                      </a>
                      . <span className={styles.privacyReq}>*</span>
                    </p>
                  </div>

                  {error && (
                    <div className={styles.errorMsg}>
                      ⚠️ Error al enviar. Escríbenos directamente a{" "}
                      <a href={`mailto:${EMAIL}`} className={styles.privacyLink}>{EMAIL}</a>
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={loading || !privacy}
                    style={{ opacity: (!privacy || loading) ? 0.5 : 1 }}
                    whileHover={privacy && !loading ? { scale:1.02, boxShadow:"0 0 40px rgba(93,228,255,0.35)" } : {}}
                    whileTap={privacy && !loading ? { scale:0.97 } : {}}
                  >
                    {loading ? "Enviando…" : "Enviar mensaje →"}
                  </motion.button>

                  <p className={styles.formNote}>
                    Tus datos no se comparten con terceros · Respuesta garantizada en 24h
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
