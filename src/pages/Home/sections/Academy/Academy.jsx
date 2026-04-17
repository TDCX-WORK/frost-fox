import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Link } from "react-router-dom"
import { Building2, UserCog, BookOpen, FileText, GraduationCap, Trophy } from "lucide-react"
import styles from "./Academy.module.css"

const WA_URL = `https://wa.me/34641747308?text=${encodeURIComponent("Hola FrostFox, me gustaría solicitar una demo de FrostFox Academy.")}`

// ─────────────────────────────────────────────────────────────
// PARTICLES (sin dependencia externa — CSS + canvas puro)
// Optimizaciones de rendimiento:
//  · IntersectionObserver → RAF pausado cuando la sección no es visible
//  · dist² en lugar de Math.sqrt para el O(n²) de conexiones
//  · Batched strokes por opacidad (un path por grupo)
//  · Menos dots en móvil (40 vs 50)
// ─────────────────────────────────────────────────────────────
function Particles() {
  const canvasRef    = useRef(null)
  const isVisibleRef = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    let raf
    let dots = []

    const isMobile = () => window.innerWidth <= 768
    const DOT_COUNT = () => isMobile() ? 40 : 50
    const CONNECT_DIST  = 55          // px
    const CONNECT_DIST2 = CONNECT_DIST * CONNECT_DIST  // evita sqrt

    const start = () => {
      const section = canvas.closest("section")
      const W = section ? section.offsetWidth  : window.innerWidth
      const H = section ? section.offsetHeight : window.innerHeight
      canvas.width  = W
      canvas.height = H

      dots = Array.from({ length: DOT_COUNT() }, () => ({
        x:  Math.random() * W,
        y:  Math.random() * H,
        r:  Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        o:  Math.random() * 0.3 + 0.6,
      }))

      cancelAnimationFrame(raf)
      if (isVisibleRef.current) loop()
    }

    const loop = () => {
      if (!isVisibleRef.current) { raf = requestAnimationFrame(loop); return }

      const W = canvas.width, H = canvas.height
      if (W === 0 || H === 0) { raf = requestAnimationFrame(loop); return }
      ctx.clearRect(0, 0, W, H)

      // ── Dots ──
      ctx.fillStyle = "rgba(3,78,120,0.8)"
      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy
        if (d.x < 0 || d.x > W) d.vx *= -1
        if (d.y < 0 || d.y > H) d.vy *= -1
        ctx.globalAlpha = d.o
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.globalAlpha = 1

      // ── Conexiones: dist² evita Math.sqrt (O(n²) sigue, pero más barato) ──
      ctx.lineWidth = 1
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx   = dots[i].x - dots[j].x
          const dy   = dots[i].y - dots[j].y
          const dist2 = dx * dx + dy * dy
          if (dist2 < CONNECT_DIST2) {
            const alpha = (1 - Math.sqrt(dist2) / CONNECT_DIST) * 0.55
            ctx.globalAlpha = alpha
            ctx.strokeStyle = "rgb(3,78,120)"
            ctx.beginPath()
            ctx.moveTo(dots[i].x, dots[i].y)
            ctx.lineTo(dots[j].x, dots[j].y)
            ctx.stroke()
          }
        }
      }
      ctx.globalAlpha = 1

      raf = requestAnimationFrame(loop)
    }

    const t = setTimeout(start, 500)
    window.addEventListener("resize", start)

    // ── Pausa automática cuando la sección sale de pantalla ──
    const io = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting
        if (entry.isIntersecting && !raf) loop()
      },
      { threshold: 0 }
    )
    io.observe(canvas)

    return () => {
      clearTimeout(t)
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", start)
      io.disconnect()
    }
  }, [])

  return <canvas ref={canvasRef} className={styles.particles} />
}

// ─────────────────────────────────────────────────────────────
// SHINE BORDER WRAPPER (siempre activo — overflow:hidden trick)
// ─────────────────────────────────────────────────────────────

// Convierte hex a rgba con alpha
function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

function ShineCard({ children, color = "#2ab8d4", speed = 3, className = "" }) {
  return (
    <div className={`${styles.shineWrapper} ${className}`}>
      <div
        className={styles.shineSpin}
        style={{
          background: `conic-gradient(${color} 0deg, transparent 60deg, transparent 300deg, ${color} 360deg)`,
          animationDuration: `${speed}s`,
        }}
      />
      <div
        className={styles.shineInner}
        style={{
          "--card-overlay-0":  hexToRgba(color, 0.18),
          "--card-overlay-50": hexToRgba(color, 0.07),
        }}
      >{children}</div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// MINI UIs — Alumno
// ─────────────────────────────────────────────────────────────

function UILogin() {
  return (
    <div className={styles.ui}>
      <div className={styles.loginWrap}>
        <div className={styles.loginLogo}>
          <span className={styles.loginLogoText}>FF</span>
          <span className={styles.loginLogoSub}>Academy</span>
        </div>
        <div className={styles.loginForm}>
          <div className={styles.loginField}>
            <div className={styles.loginFieldLabel}>Email</div>
            <div className={styles.loginFieldInput}>alumno@academia.es</div>
          </div>
          <div className={styles.loginField}>
            <div className={styles.loginFieldLabel}>Contraseña</div>
            <div className={styles.loginFieldInput}>••••••••</div>
          </div>
          <div className={styles.loginBtn}>Acceder →</div>
        </div>
        <div className={styles.loginFooter}>FrostFox Academy · Oposiciones</div>
      </div>
    </div>
  )
}

function UIDashboard() {
  return (
    <div className={styles.ui}>
      <div className={styles.uiHeader}>
        <span className={styles.uiTitle}>Buenos días, Ana 👋</span>
        <span className={styles.uiSub}>AGE 2025</span>
      </div>
      <div className={styles.uiStats}>
        {[
          { label: "Sesiones", value: "47", color: "#0891b2" },
          { label: "Aciertos", value: "82%", color: "#059669" },
          { label: "Racha",    value: "12🔥", color: "#d97706" },
        ].map((s, i) => (
          <div key={i} className={styles.uiStatCard} style={{ "--c": s.color }}>
            <span className={styles.uiStatVal}>{s.value}</span>
            <span className={styles.uiStatLabel}>{s.label}</span>
          </div>
        ))}
      </div>
      <div className={styles.uiSection}>
        <span className={styles.uiSectionLabel}>Progreso bloques</span>
        {[
          { name: "Constitución Española", pct: 72, color: "#0891b2" },
          { name: "Administración UNED",    pct: 45, color: "#7c3aed" },
          { name: "Legislación vigente",    pct: 30, color: "#059669" },
        ].map((b, i) => (
          <div key={i} className={styles.uiBlock}>
            <div className={styles.uiBlockTop}>
              <span className={styles.uiBlockName}>{b.name}</span>
              <span className={styles.uiBlockPct}>{b.pct}%</span>
            </div>
            <div className={styles.uiBar}>
              <motion.div
                className={styles.uiBarFill}
                style={{ background: b.color }}
                initial={{ width: 0 }}
                whileInView={{ width: `${b.pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function UITemario() {
  return (
    <div className={styles.ui}>
      <div className={styles.uiHeader}>
        <span className={styles.uiTitle}>Tema 3 · Constitución</span>
        <span className={styles.uiChip}>12 min lectura</span>
      </div>
      <div className={styles.temarioContent}>
        <div className={styles.temarioH1}>Los derechos fundamentales</div>
        <p className={styles.temarioP}>
          El Título I de la CE recoge los derechos y deberes fundamentales, organizados en
          cinco capítulos. El Capítulo II diferencia entre derechos fundamentales (art. 14-29)
          y derechos y deberes de los ciudadanos (art. 30-38).
        </p>
        <div className={styles.temarioCallout}>
          <span className={styles.temarioCalloutIcon}>💡</span>
          <span>Artículos 14-29 son los de mayor relevancia en el examen.</span>
        </div>
        <div className={styles.temarioH2}>Art. 14 — Igualdad ante la ley</div>
        <p className={styles.temarioP}>
          Los españoles son iguales ante la ley, sin discriminación por nacimiento, raza, sexo,
          religión, opinión o cualquier condición.
        </p>
      </div>
    </div>
  )
}

function UIBloques() {
  const [selected, setSelected] = useState(0)
  const bloques = ["Bloque 1 · Constitución", "Bloque 2 · Administración", "Bloque 3 · Legislación"]
  const temas = [
    ["T1 · Fundamentos", "T2 · Título I", "T3 · Derechos", "T4 · Título VIII"],
    ["T1 · AGE", "T2 · UNED", "T3 · Procedimiento"],
    ["T1 · Ley 39/2015", "T2 · Ley 40/2015"],
  ]
  return (
    <div className={styles.ui}>
      <div className={styles.uiHeader}>
        <span className={styles.uiTitle}>Selecciona un bloque</span>
      </div>
      <div className={styles.bloqueList}>
        {bloques.map((b, i) => (
          <button
            key={i}
            className={`${styles.bloqueBtn} ${selected === i ? styles.bloqueBtnActive : ""}`}
            onClick={() => setSelected(i)}
          >
            {b}
          </button>
        ))}
      </div>
      <div className={styles.temaList}>
        <span className={styles.uiSectionLabel}>Temas disponibles</span>
        {temas[selected].map((t, i) => (
          <div key={i} className={styles.temaRow}>
            <span className={styles.temaDot} />
            <span className={styles.temaName}>{t}</span>
            <span className={styles.temaArrow}>→</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function UITest() {
  const [selected, setSelected] = useState(null)
  const options = ["El artículo 1 de la CE", "El artículo 2 de la CE", "El Preámbulo de la CE", "El artículo 9 de la CE"]
  const correct = 0
  return (
    <div className={styles.ui}>
      <div className={styles.uiHeader}>
        <span className={styles.uiTitle}>Test · Bloque 1</span>
        <span className={styles.uiChip}>12 / 20</span>
      </div>
      <p className={styles.uiQuestion}>
        ¿Dónde se establece que España es un Estado social y democrático de Derecho?
      </p>
      <div className={styles.uiOptions}>
        {options.map((opt, i) => (
          <button
            key={i}
            className={`${styles.uiOption} ${selected === i ? (i === correct ? styles.uiCorrect : styles.uiWrong) : ""} ${selected !== null && i === correct ? styles.uiCorrect : ""}`}
            onClick={() => selected === null && setSelected(i)}
          >
            <span className={styles.uiLetter}>{["A","B","C","D"][i]}</span>
            <span>{opt}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function UIError() {
  return (
    <div className={styles.ui}>
      <div className={styles.uiFeedbackWrong}>
        <div className={styles.uiFeedbackIcon}>✗</div>
        <div>
          <p className={styles.uiFeedbackTitle}>Respuesta incorrecta</p>
          <p className={styles.uiFeedbackSub}>Marcaste: <strong>B. El artículo 2</strong></p>
        </div>
      </div>
      <div className={styles.uiCorrectCallout}>
        <span className={styles.uiCorrectLabel}>✓ Respuesta correcta</span>
        <p className={styles.uiCorrectText}><strong>A.</strong> El artículo 1 de la CE</p>
      </div>
      <div className={styles.uiExplBox}>
        <div className={styles.uiExplLabel}>📖 ¿Por qué? <span className={styles.uiAiTag}>IA</span></div>
        <p className={styles.uiExplText}>
          El art. 1.1 establece los valores superiores del ordenamiento jurídico. Es el primer artículo
          del Título Preliminar y define el modelo de Estado español.
        </p>
      </div>
    </div>
  )
}

function UISupuesto() {
  return (
    <div className={styles.ui}>
      <div className={styles.uiHeader}>
        <span className={styles.uiTitle}>Supuesto práctico</span>
        <span className={styles.uiChip} style={{ background: "#fef3c7", color: "#d97706" }}>60 min</span>
      </div>
      <div className={styles.supuestoEnunciado}>
        <div className={styles.supuestoLabel}>Enunciado</div>
        <p className={styles.supuestoText}>
          Un funcionario presenta una solicitud de revisión de su expediente. El órgano competente
          lleva 4 meses sin resolver. ¿Qué recurso procede y en qué plazo?
        </p>
      </div>
      <div className={styles.supuestoPistas}>
        <div className={styles.supuestoPistaLabel}>Pistas disponibles</div>
        {["Ley 39/2015 · Art. 24", "Silencio administrativo negativo", "Recurso de alzada: 1 mes"].map((p, i) => (
          <div key={i} className={styles.supuestoPista}>
            <span>💡</span><span>{p}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function UIStats() {
  return (
    <div className={styles.ui}>
      <div className={styles.uiHeader}>
        <span className={styles.uiTitle}>Mis estadísticas</span>
        <span className={styles.uiSub}>Últimos 30 días</span>
      </div>
      <div className={styles.uiDonutRow}>
        {[
          { pct: 82, color: "#059669", label: "Aciertos" },
          { pct: 65, color: "#0891b2", label: "Progreso" },
          { pct: 90, color: "#7c3aed", label: "Constancia" },
        ].map((d, i) => (
          <div key={i} className={styles.uiDonut}>
            <svg width="64" height="64" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="24" fill="none" stroke="#f1f5f9" strokeWidth="8" />
              <motion.circle
                cx="32" cy="32" r="24" fill="none" stroke={d.color} strokeWidth="8"
                strokeDasharray={`${d.pct/100 * 2*Math.PI*24} ${2*Math.PI*24}`}
                strokeLinecap="round" transform="rotate(-90 32 32)"
                initial={{ strokeDasharray: `0 ${2*Math.PI*24}` }}
                whileInView={{ strokeDasharray: `${d.pct/100 * 2*Math.PI*24} ${2*Math.PI*24}` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.2 }}
              />
            </svg>
            <span className={styles.uiDonutNum} style={{ color: d.color }}>{d.pct}%</span>
            <p className={styles.uiDonutLabel}>{d.label}</p>
          </div>
        ))}
      </div>
      <div className={styles.statsBottom}>
        <div className={styles.statsMiniChart}>
          {[40,55,48,70,65,82,75,88,80,92,85,100].map((h,i) => (
            <motion.div key={i} className={styles.statsBar}
              style={{ background: i >= 9 ? "#0891b2" : "#e2e8f0" }}
              initial={{ height: 0 }}
              whileInView={{ height: `${h}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
            />
          ))}
        </div>
        <p className={styles.statsChartLabel}>Sesiones · últimas 12 semanas</p>
        <div className={styles.statsExtra}>
          {[
            { label: "Tiempo total",   value: "48h 20m" },
            { label: "Mejor racha",    value: "18 días" },
            { label: "Tests completados", value: "234" },
          ].map((s, i) => (
            <div key={i} className={styles.statsExtraItem}>
              <span className={styles.statsExtraVal}>{s.value}</span>
              <span className={styles.statsExtraLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// MINI UIs — Profesor
// ─────────────────────────────────────────────────────────────
function UIProfesorClase() {
  return (
    <div className={styles.ui}>
      <div className={styles.uiHeader}>
        <span className={styles.uiTitle}>Mi clase</span>
        <span className={styles.uiChip}>4 alumnos</span>
      </div>
      <div className={styles.uiStats}>
        {[
          { label: "Media", value: "66%", color: "#0891b2" },
          { label: "Activos", value: "2", color: "#059669" },
          { label: "En riesgo", value: "1", color: "#dc2626" },
        ].map((s, i) => (
          <div key={i} className={styles.uiStatCard} style={{ "--c": s.color }}>
            <span className={styles.uiStatVal}>{s.value}</span>
            <span className={styles.uiStatLabel}>{s.label}</span>
          </div>
        ))}
      </div>
      <div className={styles.uiTable}>
        {[
          { name: "Ana García", dias: "Hoy", score: 88 },
          { name: "Luis M.", dias: "Ayer", score: 62 },
          { name: "Sara López", dias: "5 días", score: 41 },
          { name: "Pedro R.", dias: "Hoy", score: 75 },
        ].map((a, i) => (
          <div key={i} className={styles.uiTableRow}>
            <div className={styles.uiAvatar}>{a.name[0]}</div>
            <div className={styles.uiTableName}>{a.name}</div>
            <div className={styles.uiTableDias}>{a.dias}</div>
            <div className={styles.uiTableScore} style={{ color: a.score >= 65 ? "#059669" : "#dc2626" }}>{a.score}%</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function UIProfesorAlumno() {
  return (
    <div className={styles.ui}>
      <div className={styles.uiHeader}>
        <span className={styles.uiTitle}>Ana García</span>
        <span className={styles.uiChip} style={{ background: "#ecfdf5", color: "#059669" }}>Activa</span>
      </div>
      <div className={styles.uiStats}>
        {[
          { label: "Media",    value: "88%", color: "#059669" },
          { label: "Sesiones", value: "23",  color: "#0891b2" },
          { label: "Racha",    value: "8🔥", color: "#d97706" },
        ].map((s, i) => (
          <div key={i} className={styles.uiStatCard} style={{ "--c": s.color }}>
            <span className={styles.uiStatVal}>{s.value}</span>
            <span className={styles.uiStatLabel}>{s.label}</span>
          </div>
        ))}
      </div>
      <div className={styles.uiSection}>
        <span className={styles.uiSectionLabel}>Fallos frecuentes</span>
        {["Constitución · Art. 14-29", "Régimen disciplinario", "Recursos administrativos"].map((f, i) => (
          <div key={i} className={styles.uiFalloRow}>
            <span className={styles.uiFalloDot} />
            <span className={styles.uiFalloText}>{f}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// MINI UIs — Director
// ─────────────────────────────────────────────────────────────
function UIDirectorGlobal() {
  return (
    <div className={styles.ui}>
      <div className={styles.uiHeader}>
        <span className={styles.uiTitle}>Panel director</span>
        <span className={styles.uiSub}>Academia FrostFox</span>
      </div>
      <div className={styles.uiStats}>
        {[
          { label: "Alumnos",     value: "124", color: "#0891b2" },
          { label: "Profesores",  value: "8",   color: "#7c3aed" },
          { label: "Asignaturas", value: "5",   color: "#059669" },
        ].map((s, i) => (
          <div key={i} className={styles.uiStatCard} style={{ "--c": s.color }}>
            <span className={styles.uiStatVal}>{s.value}</span>
            <span className={styles.uiStatLabel}>{s.label}</span>
          </div>
        ))}
      </div>
      <div className={styles.uiSection}>
        <span className={styles.uiSectionLabel}>Asignaturas activas</span>
        {[
          { name: "AGE – Administración", alumnos: 48, media: 71 },
          { name: "OPE – Sanidad",        alumnos: 32, media: 64 },
          { name: "Policía Local",         alumnos: 28, media: 58 },
        ].map((s, i) => (
          <div key={i} className={styles.uiTableRow}>
            <div className={styles.uiTableName}>{s.name}</div>
            <div className={styles.uiTableDias}>{s.alumnos} al.</div>
            <div className={styles.uiTableScore} style={{ color: s.media >= 65 ? "#059669" : "#d97706" }}>{s.media}%</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function UIDirectorMetricas() {
  return (
    <div className={styles.ui}>
      <div className={styles.uiHeader}>
        <span className={styles.uiTitle}>Métricas globales</span>
        <span className={styles.uiSub}>30 días</span>
      </div>
      <div className={styles.uiStats}>
        {[
          { label: "Sesiones",  value: "1.2k", color: "#0891b2" },
          { label: "Media",     value: "69%",  color: "#059669" },
          { label: "Retención", value: "87%",  color: "#7c3aed" },
        ].map((s, i) => (
          <div key={i} className={styles.uiStatCard} style={{ "--c": s.color }}>
            <span className={styles.uiStatVal}>{s.value}</span>
            <span className={styles.uiStatLabel}>{s.label}</span>
          </div>
        ))}
      </div>
      <div className={styles.statsMiniChart} style={{ marginTop: 8 }}>
        {[30,50,45,70,65,85,75,90,80,95,88,100].map((h,i) => (
          <motion.div key={i} className={styles.statsBar}
            style={{ background: i >= 8 ? "#0891b2" : "#e2e8f0" }}
            initial={{ height: 0 }}
            whileInView={{ height: `${h}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
          />
        ))}
      </div>
      <p className={styles.statsChartLabel}>Sesiones semanales</p>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// DATOS
// ─────────────────────────────────────────────────────────────
const ROLES = [
  {
    id: "alumno", label: "Alumno", color: "#0891b2",
    cards: [
      { label: "Login",        ui: <UILogin /> },
      { label: "Dashboard",    ui: <UIDashboard /> },
      { label: "Temario",      ui: <UITemario /> },
      { label: "Por bloques",  ui: <UIBloques /> },
      { label: "Test",         ui: <UITest /> },
      { label: "Error + IA",   ui: <UIError /> },
      { label: "Supuesto",     ui: <UISupuesto /> },
      { label: "Estadísticas", ui: <UIStats /> },
    ],
  },
  {
    id: "profesor", label: "Profesor", color: "#7c3aed",
    cards: [
      { label: "Vista clase",      ui: <UIProfesorClase /> },
      { label: "Detalle alumno",   ui: <UIProfesorAlumno /> },
    ],
  },
  {
    id: "director", label: "Director", color: "#059669",
    cards: [
      { label: "Panel global", ui: <UIDirectorGlobal /> },
      { label: "Métricas",     ui: <UIDirectorMetricas /> },
    ],
  },
]

// ─────────────────────────────────────────────────────────────
// ROL SECTION
// ─────────────────────────────────────────────────────────────
function RoleSection({ role, index }) {
  const [current, setCurrent] = useState(0)
  const prev = () => setCurrent(c => (c - 1 + role.cards.length) % role.cards.length)
  const next = () => setCurrent(c => (c + 1) % role.cards.length)

  return (
    <motion.div
      className={styles.roleSection}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Header */}
      <div className={styles.roleHeader}>
        <div className={styles.roleLabel} style={{ color: role.color, borderColor: `${role.color}30`, background: `${role.color}0d` }}>
          {role.label}
        </div>
        <div className={styles.roleNav}>
          <button className={styles.navBtn} onClick={prev}>‹</button>
          <span className={styles.navCounter}>{current + 1} / {role.cards.length}</span>
          <button className={styles.navBtn} onClick={next}>›</button>
        </div>
      </div>

      {/* Shine card con preview */}
      <ShineCard color={role.color} speed={4 + index}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            {role.cards[current].ui}
          </motion.div>
        </AnimatePresence>
      </ShineCard>

      {/* Tabs debajo de la card */}
      <div className={styles.roleTabs}>
        {role.cards.map((c, i) => (
          <button
            key={i}
            className={`${styles.roleTab} ${current === i ? styles.roleTabActive : ""}`}
            style={current === i ? { color: role.color, borderColor: `${role.color}60`, background: `${role.color}0d` } : {}}
            onClick={() => setCurrent(i)}
          >
            {c.label}
          </button>
        ))}
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────
// PIPELINE — circular progress steps with Lucide icons
// ─────────────────────────────────────────────────────────────
const PIPELINE = [
  { label: "Alta en 48h",    Icon: Building2,     pct: 48,  unit: "h",  color: "#0891b2", desc: "De contrato a academia operativa" },
  { label: "Temario propio",  Icon: FileText,     pct: 700, unit: "+",  color: "#7c3aed", desc: "De la academia o del BOE" },
  { label: "3 paneles",      Icon: UserCog,       pct: 3,   unit: "",   color: "#0369a1", desc: "Alumno · Profesor · Director" },
  { label: "Tests adaptativos", Icon: BookOpen,   pct: 500, unit: "+",  color: "#059669", desc: "Por asignatura y nivel" },
  { label: "Retención",      Icon: GraduationCap, pct: 100, unit: "%",  color: "#d97706", desc: "De alumnos en la plataforma" },
  { label: "Aprobados",      Icon: Trophy,        pct: 96,  unit: "%",  color: "#dc2626", desc: "Tasa de éxito con la plataforma" },
]

function PipelineStep({ step, index, total }) {
  const r = 38
  const circ = 2 * Math.PI * r
  // For display: normalize visual fill (caps at ~90% visually so it looks proportional)
  const visualPct = step.unit === "h" ? 60 : step.unit === "+" ? 95 : step.unit === "" ? 55 : step.pct
  return (
    <motion.div
      className={styles.pipeStep}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className={styles.pipeCircle}>
        {/* Glow ring behind */}
        <div className={styles.pipeGlow} style={{ boxShadow: `0 0 22px ${step.color}40, 0 0 44px ${step.color}18` }} />
        <svg width="96" height="96" viewBox="0 0 96 96">
          <circle cx="48" cy="48" r={r} fill="none" stroke={`${step.color}18`} strokeWidth="5" />
          <motion.circle
            cx="48" cy="48" r={r} fill="none"
            stroke={step.color} strokeWidth="5" strokeLinecap="round"
            strokeDasharray={`${visualPct / 100 * circ} ${circ}`}
            transform="rotate(-90 48 48)"
            initial={{ strokeDasharray: `0 ${circ}` }}
            whileInView={{ strokeDasharray: `${visualPct / 100 * circ} ${circ}` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: index * 0.12 }}
            style={{ filter: `drop-shadow(0 0 4px ${step.color}99)` }}
          />
        </svg>
        <div className={styles.pipeIconWrap} style={{ background: `${step.color}14`, color: step.color }}>
          <step.Icon size={22} strokeWidth={1.8} />
        </div>
      </div>
      <span className={styles.pipePct} style={{ color: step.color }}>
        {step.pct}{step.unit}
      </span>
      <span className={styles.pipeLabel}>{step.label}</span>
      <span className={styles.pipeDesc}>{step.desc}</span>
      {index < total - 1 && <div className={styles.pipeLine} />}
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────
// SUCCESS GRAPH DATA
// ─────────────────────────────────────────────────────────────
// (graph uses inline SVG path, no data array needed)

// ─────────────────────────────────────────────────────────────
// ACADEMY PRINCIPAL
// ─────────────────────────────────────────────────────────────
export default function Academy() {
  return (
    <section className={styles.section} id="academy">
      <Particles />

      <div className={styles.content}>
        <div className={styles.header}>
          <motion.span className={styles.pill}
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
          >Producto</motion.span>
          <motion.h2 className={styles.title}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.08 }}
          >
            FrostFox <span className={styles.titleAccent}>Academy</span>
            <span className={styles.titleSub}> · Software para academias de oposiciones</span>
          </motion.h2>
          <motion.p className={styles.subtitle}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.15 }}
          >
            La plataforma SaaS B2B para academias de oposiciones. Tres paneles personalizados,
            una sola plataforma.
          </motion.p>
        </div>

        <div className={styles.rolesGrid}>
          {ROLES.map((role, i) => (
            <RoleSection key={role.id} role={role} index={i} />
          ))}
        </div>

        {/* ── Pipeline de progreso ── */}
        <motion.div className={styles.pipelineSection}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          <h3 className={styles.pipelineTitle}>Gestión completa de tu academia de oposiciones</h3>
          <p className={styles.pipelineSubtitle}>De la academia al éxito del alumno — todo conectado.</p>
          <div className={styles.pipelineRow}>
            {/* Mobile vertical glow line */}
            <div className={styles.pipeVertLine} />
            {PIPELINE.map((step, i) => (
              <PipelineStep key={step.label} step={step} index={i} total={PIPELINE.length} />
            ))}
          </div>
        </motion.div>

        {/* ── Tasas de éxito — smooth line chart ── */}
        <motion.div className={styles.successSection}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          <h3 className={styles.successTitle}>Aumenta la tasa de éxito de tu academia</h3>

          <div className={styles.chartWrap}>
            {/*
              iOS Safari fixes:
              1. preserveAspectRatio="none" — "meet" colapsa el SVG en WebKit con height CSS fijo
              2. Sin filter en motion.path — iOS Safari no composita filtros SVG + pathLength animation
              3. drop-shadow en los círculos via CSS class, no inline style
              Path con picos realistas: arranque lento → meseta → corrección → aceleración → sprint
            */}
            <svg className={styles.chartSvg} viewBox="0 0 600 200" preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="lineGradAcad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%"   stopColor="#0891b2" />
                  <stop offset="45%"  stopColor="#5de4ff" />
                  <stop offset="100%" stopColor="#22d3a5" />
                </linearGradient>
                <linearGradient id="areaGradAcad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="#5de4ff" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#5de4ff" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Grid lines */}
              {[30, 75, 120, 165].map(y => (
                <line key={y} x1="20" y1={y} x2="580" y2={y}
                  stroke="rgba(100,116,139,0.1)" strokeWidth="1" strokeDasharray="4 6" />
              ))}

              {/* Área bajo la línea — sin animación pathLength, solo opacity */}
              <motion.path
                d="M30,182 C55,180 75,174 100,168 C118,163 128,165 148,158 C170,150 185,140 210,125 C228,114 238,118 258,110 C278,102 290,95 315,78 C335,64 342,70 362,58 C385,44 400,38 430,28 C452,20 468,24 492,16 C510,10 535,8 570,6 L570,195 L30,195 Z"
                fill="url(#areaGradAcad)"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />

              {/* Línea principal — SIN filter (iOS Safari killer con pathLength) */}
              <motion.path
                d="M30,182 C55,180 75,174 100,168 C118,163 128,165 148,158 C170,150 185,140 210,125 C228,114 238,118 258,110 C278,102 290,95 315,78 C335,64 342,70 362,58 C385,44 400,38 430,28 C452,20 468,24 492,16 C510,10 535,8 570,6"
                fill="none"
                stroke="url(#lineGradAcad)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* Puntos clave — sin filter inline (iOS Safari), glow via CSS */}
              {[
                { x: 30,  y: 182, val: "5%",  anchor: "middle" },
                { x: 148, y: 158, val: "18%", anchor: "middle" },
                { x: 258, y: 110, val: "42%", anchor: "middle" },
                { x: 362, y: 58,  val: "71%", anchor: "middle" },
                { x: 570, y: 6,   val: "96%", anchor: "end"    },
              ].map((pt, i) => (
                <motion.g key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9 + i * 0.22, duration: 0.3 }}
                >
                  <circle cx={pt.x} cy={pt.y} r="5" fill="#0a1628" stroke="#5de4ff" strokeWidth="2" />
                  <text x={pt.x} y={pt.y - 11} textAnchor={pt.anchor}
                    fill="#5de4ff" fontSize="11" fontFamily="Syne,sans-serif" fontWeight="700">
                    {pt.val}
                  </text>
                </motion.g>
              ))}
            </svg>
          </div>
        </motion.div>

        <motion.div className={styles.ctaRow}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.2 }}
        >
          <button className={styles.ctaPrimary} onClick={() => window.open(WA_URL, "_blank")}>Solicitar demo →</button>
          <Link to="/academy" className={styles.ctaSecondary}>Ver precios</Link>
        </motion.div>
      </div>
    </section>
  )
}
