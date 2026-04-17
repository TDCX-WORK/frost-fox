import { useRef, useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "motion/react"
import styles from "./Services.module.css"
import personImg from "../../../../assets/person-light.webp"
import personMobileImg from "../../../../assets/person-light-up.webp"

const SERVICES = [
  { number: "01", title: "Desarrollo Web & App",         description: "Plataformas digitales a medida que escalan con tu negocio. Desde webs corporativas hasta apps complejas.",   tags: ["React", "Node.js", "Cloud"]       },
  { number: "02", title: "FrostFox Academy",              description: "SaaS B2B de formación corporativa con rutas personalizadas y métricas en tiempo real.",                       tags: ["SaaS", "B2B", "LMS"]             },
  { number: "03", title: "FrostFox Talent",               description: "Outsourcing estratégico para retener el conocimiento invertido en tu talento. Seamless Transition garantizada.", tags: ["Outsourcing", "Talent", "B2B"]   },
  { number: "04", title: "Consultoría Digital",           description: "Transformación digital desde la estrategia hasta la implementación, con foco en resultados medibles.",         tags: ["Estrategia", "Roadmap", "Agile"] },
  { number: "05", title: "Inteligencia Artificial",       description: "Integramos IA en tus procesos — automatización inteligente, modelos predictivos y asistentes a medida.",       tags: ["AI", "ML", "Automatización"]     },
]

const ARC_POINTS = [
  { cx: 350.0, cy:   0.0 },
  { cx: 199.4, cy: 163.5 },
  { cx: 118.6, cy: 370.7 },
  { cx: 118.8, cy: 593.0 },
  { cx: 200.0, cy: 800.0 },
]

export default function Services() {
  const [active, setActive] = useState(0)
  const [dir, setDir] = useState(1)
  const outerRef = useRef(null)
  const prevActive = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const el = outerRef.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      const scrolled = -rect.top
      const sectionHeight = el.offsetHeight - window.innerHeight

      if (sectionHeight <= 0) return

      const progress = Math.max(0, Math.min(1, scrolled / sectionHeight))
      // Divide the scroll range into equal segments for each service
      const newActive = Math.min(
        SERVICES.length - 1,
        Math.floor(progress * SERVICES.length)
      )

      if (newActive !== prevActive.current) {
        setDir(newActive > prevActive.current ? 1 : -1)
        setActive(newActive)
        prevActive.current = newActive
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll() // init
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const goTo = useCallback((i) => {
    const el = outerRef.current
    if (!el) return

    const sectionHeight = el.offsetHeight - window.innerHeight
    const targetScroll = el.offsetTop + (i / SERVICES.length) * sectionHeight

    window.scrollTo({ top: targetScroll, behavior: "smooth" })
  }, [])

  const lineProgress = active / (SERVICES.length - 1)

  return (
    <section ref={outerRef} className={styles.outer} id="servicios">
      <div className={styles.section}>
        <motion.div
          className={styles.left}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.glow} />
          <img src={personImg} alt="Consultor de servicios digitales FrostFox" className={styles.personImg} />
        </motion.div>

        <div className={styles.right}>
          <svg className={styles.arcSvg} viewBox="0 0 400 800" preserveAspectRatio="xMaxYMid meet">
            <defs>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#5de4ff" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#2ab8d4" stopOpacity="0.5" />
              </linearGradient>
            </defs>
            <path d="M 350 0 A 600 600 0 0 0 200 800" fill="none" stroke="rgba(93,228,255,0.1)" strokeWidth="1.5" />
            <motion.path
              d="M 350 0 A 600 600 0 0 0 200 800"
              fill="none" stroke="url(#lineGrad)" strokeWidth="1.5"
              pathLength="1" strokeDasharray="1"
              animate={{ strokeDashoffset: 1 - lineProgress }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
            {ARC_POINTS.map((pt, i) => {
              const isActive = i === active
              const isPassed = i <= active
              return (
                <g key={i} style={{ cursor: "pointer" }} onClick={() => goTo(i)}>
                  {isActive && <circle cx={pt.cx} cy={pt.cy} r={16} fill="rgba(93,228,255,0.08)"
                    style={{ animation: "dotPulse 2s ease-in-out infinite" }} />}
                  <circle
                    cx={pt.cx} cy={pt.cy} r={isActive ? 6 : 3.5}
                    fill={isPassed ? "#5de4ff" : "rgba(93,228,255,0.25)"}
                    style={{ transition: "r 0.3s, fill 0.3s", filter: isActive ? "drop-shadow(0 0 6px #5de4ff)" : "none" }}
                  />
                </g>
              )
            })}
          </svg>

          <div className={styles.contentArea}>
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={active}
                custom={dir}
                variants={{
                  enter:  d => ({ opacity: 0, y: d * 28 }),
                  center:   { opacity: 1, y: 0 },
                  exit:   d => ({ opacity: 0, y: d * -28 }),
                }}
                initial="enter" animate="center" exit="exit"
                transition={{ duration: 0.32, ease: "easeOut" }}
                className={styles.serviceCard}
              >
                <span className={styles.number}>{SERVICES[active].number}</span>
                <h3 className={styles.title}>{SERVICES[active].title}</h3>
                <p className={styles.description}>{SERVICES[active].description}</p>
                <div className={styles.tags}>
                  {SERVICES[active].tags.map((tag, i) => <span key={i} className={styles.tag}>{tag}</span>)}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className={styles.progress}>
              {SERVICES.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.progressDot} ${active === i ? styles.progressDotActive : ""} ${i < active ? styles.progressDotPassed : ""}`}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile-only person image */}
        <div className={styles.mobilePersonWrap}>
          <div className={styles.mobileGlow} />
          <img src={personMobileImg} alt="Servicios digitales FrostFox en dispositivo móvil" className={styles.mobilePersonImg} width="3375" height="4219" />
        </div>
      </div>
    </section>
  )
}
