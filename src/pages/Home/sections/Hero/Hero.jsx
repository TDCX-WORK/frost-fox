import { useRef, useState, useEffect, useCallback } from "react"
import BeamSection from "./BeamSection"
import { motion } from "motion/react"
import styles from "./Hero.module.css"

import foxImg  from "../../../../assets/fox.webp"
import codeImg from "../../../../assets/fox-code.webp"

const WA_URL = `https://wa.me/34641747308?text=${encodeURIComponent("Hola FrostFox, me gustaría obtener más información sobre vuestros servicios.")}`

const DOTS = [
  { x: -15,  y: -205, size: 5, delay: 0.0  },
  { x:  50,  y: -190, size: 4, delay: 0.4  },
  { x: -65,  y: -175, size: 3, delay: 1.1  },
  { x:  105, y: -120, size: 5, delay: 0.7  },
  { x:  125, y:  -30, size: 6, delay: 1.2  },
  { x:  110, y:   60, size: 4, delay: 0.2  },
  { x:   80, y:  130, size: 3, delay: 1.6  },
  { x:   20, y:  175, size: 5, delay: 0.5  },
  { x:  -50, y:  185, size: 4, delay: 1.3  },
  { x:  -90, y:  165, size: 3, delay: 0.8  },
  { x: -115, y: -100, size: 5, delay: 1.0  },
  { x: -120, y:   10, size: 4, delay: 0.3  },
  { x: -100, y:  100, size: 3, delay: 1.7  },
  { x:   20, y:  -80, size: 3, delay: 2.0  },
  { x:  -40, y:  -40, size: 3, delay: 1.4  },
  { x:   50, y:   30, size: 3, delay: 0.6  },
  { x:  -20, y:   70, size: 3, delay: 1.9  },
  { x:  -10, y: -120, size: 3, delay: 2.2  },
  { x:   30, y:  110, size: 3, delay: 1.1  },
  { x:   70, y:  -60, size: 3, delay: 0.9  },
  { x:  -60, y:   50, size: 3, delay: 2.4  },
  { x:   10, y:   10, size: 3, delay: 1.6  },
]

// ─────────────────────────────────────────────────────────────
// SPLIT TEXT — por palabra, color reactivo al divisor
// ─────────────────────────────────────────────────────────────
function SplitText({ text, dividerPct, containerRef, colorLight, colorDark, className, style }) {
  const words = text.split(" ")

  return (
    <span className={className} style={style}>
      {words.map((word, i) => (
        <WordSpan
          key={i}
          word={word}
          isLast={i === words.length - 1}
          dividerPct={dividerPct}
          containerRef={containerRef}
          colorLight={colorLight}
          colorDark={colorDark}
        />
      ))}
    </span>
  )
}

function WordSpan({ word, isLast, dividerPct, containerRef, colorLight, colorDark }) {
  const ref = useRef(null)
  const [color, setColor] = useState(colorDark)

  useEffect(() => {
    const el = ref.current
    const container = containerRef.current
    if (!el || !container) return

    const containerRect = container.getBoundingClientRect()
    const wordRect      = el.getBoundingClientRect()

    // Centro horizontal de la palabra en porcentaje del contenedor
    const wordCenterPct = ((wordRect.left + wordRect.width / 2) - containerRect.left) / containerRect.width * 100

    // Si el divisor ha pasado el centro de esta palabra → lado oscuro → color claro
    setColor(dividerPct > wordCenterPct ? colorLight : colorDark)
  }, [dividerPct, containerRef, colorLight, colorDark])

  return (
    <span
      ref={ref}
      style={{
        color,
        transition: "color 0.06s ease",
        display: "inline",
        whiteSpace: "pre",
      }}
    >
      {word}{isLast ? "" : " "}
    </span>
  )
}

const LEFT_CENTER_DESKTOP  = 25
const RIGHT_CENTER_DESKTOP = 75
const MOBILE_CENTER        = 50

export default function Hero({ onDividerChange }) {
  const containerRef = useRef(null)
  const dragging     = useRef(false)

  const [dividerX, setDividerX]           = useState(0)
  const [isDragging, setIsDragging]       = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [ready, setReady]                 = useState(false)
  const [isMobile, setIsMobile]           = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  const applyDivider = useCallback((v) => {
    const el = containerRef.current
    if (el) {
      el.style.setProperty("--dx", `${v}%`)
      el.style.setProperty("--clip-right", `${100 - v}%`)
    }
    setDividerX(v)
    onDividerChange?.(v)
  }, [onDividerChange])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setReady(true)
      const duration = 1400
      const startTime = performance.now()
      const tick = (now) => {
        const elapsed = now - startTime
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 4)
        applyDivider(50 * eased)
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, 500)
    return () => clearTimeout(timeout)
  }, [applyDivider])

  const updateFromPointer = useCallback((clientX) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const v = Math.min(Math.max(((clientX - rect.left) / rect.width) * 100, 1), 99)
    applyDivider(v)
    if (!hasInteracted) setHasInteracted(true)
  }, [applyDivider, hasInteracted])

  useEffect(() => {
    const onMove = (e) => {
      if (!dragging.current) return
      const x = e.touches ? e.touches[0].clientX : e.clientX
      updateFromPointer(x)
    }
    const onUp = () => {
      dragging.current = false
      setIsDragging(false)
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    window.addEventListener("touchmove", onMove, { passive: true })
    window.addEventListener("mouseup", onUp)
    window.addEventListener("touchend", onUp)
    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("touchmove", onMove)
      window.removeEventListener("mouseup", onUp)
      window.removeEventListener("touchend", onUp)
    }
  }, [updateFromPointer])

  const onPointerDown = (e) => {
    e.preventDefault()
    dragging.current = true
    setIsDragging(true)
  }

  // Colores según lado
  const leftThreshold  = isMobile ? MOBILE_CENTER : LEFT_CENTER_DESKTOP
  const rightThreshold = isMobile ? MOBILE_CENTER : RIGHT_CENTER_DESKTOP

  // Headline izquierdo: está en zona oscura cuando dividerX > threshold
  const headlineLightColor = "#f0f8ff"
  const headlineDarkColor  = "#1a2540"

  // Taglines derechos: están en zona blanca cuando dividerX < threshold
  const taglineLightColor = "#f0f8ff"
  const taglineDarkColor  = "#1a2540"

  return (
    <section
      ref={containerRef}
      className={styles.hero} id="inicio"
      style={{ "--dx": "0%", "--clip-right": "100%" }}
    >
      {/* ── CAPA BASE: fondo blanco + zorro limpio ── */}
      <div className={styles.layerBase}>
        <div className={styles.bgWhite} />
        <img src={foxImg} alt="Frost Fox" className={styles.foxImg} />
      </div>

      {/* ── CAPA OSCURA: fondo oscuro + zorro con código ── */}
      <div className={styles.layerDark}>
        <div className={styles.bgDark} />
        <img src={codeImg} alt="Fox código" className={styles.foxImg} />
      </div>

      {/* ── PUNTOS NEON ── */}
      <div className={styles.dotsWrapper}>
        {DOTS.map((d, i) => (
          <div
            key={i}
            className={styles.glowDot}
            style={{
              width:          `${d.size}px`,
              height:         `${d.size}px`,
              top:            `calc(50% + ${d.y}px)`,
              left:           `calc(50% + ${d.x}px)`,
              animationDelay: `${d.delay}s`,
            }}
          />
        ))}
      </div>

      {/* ── TEXTO IZQUIERDA ── */}
      <div className={styles.textLeft} style={{ opacity: ready ? 1 : 0 }}>
        <motion.div
          className={styles.badge}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 16 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <span className={styles.badgeDot} />
          Soluciones digitales B2B
        </motion.div>

        <motion.h1
          className={styles.headline}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 32 }}
          transition={{ delay: 1.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <SplitText
            text="El futuro"
            dividerPct={dividerX}
            containerRef={containerRef}
            colorLight={headlineLightColor}
            colorDark={headlineDarkColor}
          />
          <br />
          <SplitText
            text="ya no espera."
            dividerPct={dividerX}
            containerRef={containerRef}
            colorLight={headlineLightColor}
            colorDark={headlineDarkColor}
            className={styles.headlineAccentLine}
          />
        </motion.h1>

        <motion.button
          className={styles.cta}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 16 }}
          transition={{ delay: 1.8, duration: 0.5 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => window.open(WA_URL, "_blank")}
        >
          Empieza ahora →
        </motion.button>
      </div>

      {/* ── TEXTO + MÉTRICAS DERECHA ── */}
      <div className={styles.textRight} style={{ opacity: ready ? 1 : 0 }}>
        <motion.p
          className={styles.tagline}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 28 }}
          transition={{ delay: 1.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <SplitText
            text="Construimos soluciones modernas para tu empresa."
            dividerPct={dividerX}
            containerRef={containerRef}
            colorLight={taglineLightColor}
            colorDark={taglineDarkColor}
          />
        </motion.p>

        <motion.p
          className={styles.taglineSecond}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 28 }}
          transition={{ delay: 1.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <SplitText
            text="Innovación que impulsa resultados reales."
            dividerPct={dividerX}
            containerRef={containerRef}
            colorLight="#7dd4e8"
            colorDark="#0e7490"
          />
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 20 }}
          transition={{ delay: 1.8, duration: 0.7 }}
        >
          <BeamSection />
        </motion.div>

        <motion.button
          className={styles.ctaMobile}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 16 }}
          transition={{ delay: 2.4, duration: 0.5 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => window.open(WA_URL, "_blank")}
        >
          Empieza ahora →
        </motion.button>
      </div>

      {/* ── DIVISOR ── */}
      <div
        className={styles.divider}
        onMouseDown={onPointerDown}
        onTouchStart={onPointerDown}
      >
        <div className={styles.dividerLine} />
        <motion.div
          className={styles.dividerHandle}
          animate={{ scale: isDragging ? 1.2 : 1 }}
          transition={{ duration: 0.15 }}
        >
          <span className={styles.handleArrows}>⟨ ⟩</span>
        </motion.div>
        <div className={styles.dot} style={{ top: "18%" }} />
        <div className={styles.dot} style={{ top: "78%" }} />
      </div>

      {!hasInteracted && ready && (
        <motion.div
          className={styles.hint}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
        >
          ← arrastra →
        </motion.div>
      )}
    </section>
  )
}
