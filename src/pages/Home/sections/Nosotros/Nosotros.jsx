import { useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"
import styles from "./Nosotros.module.css"
import ffLogo from "../../../../assets/ff-logo-gris.webp"


// ─────────────────────────────────────────────────────────────
// DATOS
// ─────────────────────────────────────────────────────────────
const PILARES = [
  {
    num: "01",
    tag: "WebDev",
    headline: "Presencia digital\nque escala.",
    body: "Webs y apps a medida. Desde corporativas hasta plataformas complejas.",
  },
  {
    num: "02",
    tag: "Academy",
    headline: "Educación técnica\ndigitalizada.",
    body: "SaaS B2B para academias que dan el salto al 100% digital.",
  },
  {
    num: "03",
    tag: "Talent",
    headline: "Conocimiento\nque permanece.",
    body: "Outsourcing estratégico. El profesional cambia de empleador, no de proyecto.",
  },
]

// ─────────────────────────────────────────────────────────────
// PILAR CARD — desktop hover reveal oscuro — pure CSS, zero JS on hover
// ─────────────────────────────────────────────────────────────
function PilarCard({ p, i }) {
  return (
    <div
      className={styles.pilarCard}
      style={{ animationDelay: `${i * 0.12}s` }}
    >
      <div className={styles.pilarBg} />
      <div className={styles.pilarTop}>
        <span className={styles.pilarNum}>{p.num}</span>
        <span className={styles.pilarTag}>{p.tag}</span>
      </div>
      <h3 className={styles.pilarHeadline}>
        {p.headline.split("\n").map((l, j) => <span key={j}>{l}<br /></span>)}
      </h3>
      <p className={styles.pilarBody}>{p.body}</p>
      <div className={styles.pilarLine} />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// PILARES ACCORDION — solo mobile
// ─────────────────────────────────────────────────────────────
function PilaresAccordion() {
  const [open, setOpen] = useState(0)   // primer item abierto por defecto

  return (
    <div className={styles.accordion}>
      {PILARES.map((p, i) => {
        const isOpen = open === i
        return (
          <motion.div
            key={i}
            className={cn(styles.accordionItem, isOpen && styles.accordionItemOpen)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.1 }}
          >
            {/* Trigger */}
            <button
              className={styles.accordionTrigger}
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
            >
              <div className={styles.accordionTriggerLeft}>
                <span className={styles.accordionNum}>{p.num}</span>
                <span className={styles.accordionHeadline}>
                  {p.headline.replace("\n", " ")}
                </span>
              </div>
              <div className={styles.accordionRight}>
                <span className={styles.accordionTag}>{p.tag}</span>
                {/* Icono + / × animado */}
                <motion.span
                  className={styles.accordionIcon}
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  +
                </motion.span>
              </div>
            </button>

            {/* Panel expandible — CSS maxHeight for smooth 60fps */}
            <div
              className={cn(styles.accordionPanel, isOpen && styles.accordionPanelOpen)}
            >
              <div className={styles.accordionBody}>
                <p className={styles.accordionText}>{p.body}</p>
                {/* Línea decorativa animada */}
                <motion.div
                  className={styles.accordionLine}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// NOSOTROS
// ─────────────────────────────────────────────────────────────
export default function Nosotros() {
  return (
    <section className={styles.section} id="nosotros">

      {/* Grid CSS — sin JS, sin canvas, sin RAF */}
      <div className={styles.gridWrap} aria-hidden="true" />

      <div className={styles.content}>

        {/* ══ BLOQUE SUPERIOR: eyebrow + headline grande + logo ══ */}
        <div className={styles.topBlock}>
          <div className={styles.topLeft}>
            <motion.span
              className={styles.eyebrow}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              — Nosotros
            </motion.span>

            <motion.h2
              className={styles.headline}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              El futuro<br />
              <span className={styles.headlineLight}>ya no espera.</span>
            </motion.h2>

            <motion.p
              className={styles.lead}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.18 }}
            >
              FrostFox es un ecosistema tech y educativo con una misión:
              que el talento no se desperdicie y ningún negocio se quede
              atrás por falta de presencia digital.
            </motion.p>
          </div>

          {/* Logo a la derecha — flotando, sin card */}
          <motion.div
            className={styles.logoFloatWrap}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className={styles.logoFloat}
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <img src={ffLogo} alt="FrostFox" className={styles.logoImg} width="2160" height="2700" />
            </motion.div>
            <motion.svg
              className={styles.logoShadowSvg}
              viewBox="0 0 160 18"
              fill="none"
              animate={{ scaleX: [1, 0.65, 1], opacity: [0.25, 0.08, 0.25] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <ellipse cx="80" cy="9" rx="72" ry="7" fill="url(#sg)" />
              <defs>
                <radialGradient id="sg" cx="50%" cy="50%" r="50%">
                  <stop offset="0%"  stopColor="#0f172a" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
                </radialGradient>
              </defs>
            </motion.svg>
          </motion.div>
        </div>

        {/* ══ SEPARADOR CON CIFRAS ══ */}
        <div className={styles.statsStrip}>
          {[
            { val: "3", label: "pilares" },
            { val: "B2B", label: "enfoque" },
            { val: "48h", label: "respuesta" },
            { val: "0€", label: "consulta inicial" },
          ].map((s, i) => (
            <motion.div
              key={i}
              className={styles.stat}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <span className={styles.statVal}>{s.val}</span>
              <span className={styles.statLbl}>{s.label}</span>
            </motion.div>
          ))}
        </div>

        {/* ══ PILARES — grid desktop / acordeón mobile ══ */}
        <div className={styles.pilaresRow}>
          {PILARES.map((p, i) => (
            <PilarCard key={i} p={p} i={i} />
          ))}
        </div>
        <PilaresAccordion />

        {/* ══ CTA — tipografía grande, sin card ══ */}
        <div className={styles.ctaBlock}>
          <motion.p
            className={styles.ctaEyebrow}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            ¿Tienes un proyecto?
          </motion.p>
          <motion.h3
            className={styles.ctaHeadline}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            Hablemos.
          </motion.h3>
          <motion.div
            className={styles.ctaActions}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <motion.button
              className={styles.ctaPrimary}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Contactar →
            </motion.button>
            <motion.button
              className={styles.ctaSecondary}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              Ver soluciones
            </motion.button>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
