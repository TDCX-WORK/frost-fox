import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import {
  Building2, UserCog, BookOpen, FileText, GraduationCap, Trophy,
  CheckCircle, ArrowRight, Zap, Shield, BarChart2, Clock,
  Users, Target, TrendingUp, Star,
  FolderX, MessageSquareX, UserX, LayoutDashboard, TimerOff, BadgeDollarSign,
  ShieldCheck
} from 'lucide-react'
import ffLogo from '../../assets/ff-logo-azul.webp'
import styles from './AcademyPage.module.css'

const WA_DEMO = `https://wa.me/34641747308?text=${encodeURIComponent("Hola FrostFox, me gustaría solicitar una demo gratuita de FrostFox Academy.")}`
const WA_PLAN = (plan) => `https://wa.me/34641747308?text=${encodeURIComponent(`Hola FrostFox, me interesa el plan ${plan} de FrostFox Academy.`)}`

// ── Halo con punto de luz ──────────────────────────────────────
function Halo({ size, opacity, duration, reverse = false, color = '#5de4ff', dotTop = true }) {
  return (
    <div
      className={styles.halo}
      style={{
        width: size, height: size,
        opacity,
        borderColor: color,
        animationDuration: `${duration}s`,
        animationDirection: reverse ? 'reverse' : 'normal',
        boxShadow: `0 0 ${size * 0.06}px ${color}20`,
      }}
    >
      {dotTop && (
        <div className={styles.haloDot} style={{
          background: color,
          boxShadow: `0 0 16px ${color}, 0 0 32px ${color}99, 0 0 48px ${color}40`,
        }} />
      )}
    </div>
  )
}

// ── Punto de dolor ─────────────────────────────────────────────
function PainPoint({ icon: Icon, text, delay }) {
  return (
    <motion.div
      className={styles.painCard}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* shimmer border spin */}
      <div className={styles.painShineSpin} />
      <div className={styles.painCardInner}>
        <div className={styles.painIconWrap}>
          <Icon size={17} strokeWidth={1.8} />
        </div>
        <span className={styles.painText}>{text}</span>
      </div>
    </motion.div>
  )
}

// ── Feature card ───────────────────────────────────────────────
function FeatureCard({ icon: Icon, title, desc, color, delay, size = 'normal' }) {
  return (
    <motion.div
      className={`${styles.featureWrapper} ${size === 'wide' ? styles.featureWide : ''}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ '--card-color': color }}
    >
      <div className={styles.featShineSpin} style={{ background: `conic-gradient(${color} 0deg, transparent 60deg, transparent 300deg, ${color} 360deg)` }} />
      <div className={styles.featureCard}>
        <div className={styles.featureIcon} style={{ background: `${color}15`, color }}>
          <Icon size={20} strokeWidth={1.8} />
        </div>
        <div className={styles.featureBody}>
          <div className={styles.featureTitle}>{title}</div>
          <div className={styles.featureDesc}>{desc}</div>
        </div>
        <div className={styles.featureGlow} style={{ background: color }} />
      </div>
    </motion.div>
  )
}

// ── Métrica ────────────────────────────────────────────────────
function Metric({ value, label, color, delay }) {
  return (
    <motion.div
      className={styles.metric}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className={styles.metricVal} style={{ color }}>{value}</div>
      <div className={styles.metricLabel}>{label}</div>
    </motion.div>
  )
}

// ── Step del proceso ───────────────────────────────────────────
function Step({ num, title, desc, who, delay }) {
  return (
    <motion.div
      className={styles.step}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className={styles.stepNum}>{num}</div>
      <div className={styles.stepBody}>
        <div className={styles.stepTitle}>{title}</div>
        <div className={styles.stepDesc}>{desc}</div>
      </div>
      <div className={styles.stepWho}>{who}</div>
    </motion.div>
  )
}

// ── Role tab ───────────────────────────────────────────────────
const ROLES = [
  {
    id: 'alumno', label: 'Alumno', color: '#0891b2',
    icon: GraduationCap,
    headline: 'El alumno estudia mejor, más rápido y con datos reales.',
    features: [
      'Tests autocorregidos con 3 modos: principiante, avanzado y examen',
      'Repetición espaciada automática de fallos',
      'Temario interactivo con subrayados y apuntes propios',
      'Estadísticas detalladas: sesiones, nota media, racha y progreso',
      'Sistema de XP, misiones y gamificación para mantener la constancia',
      'Supuestos prácticos con pistas y corrección inmediata',
    ],
  },
  {
    id: 'profesor', label: 'Profesor', color: '#7c3aed',
    icon: BookOpen,
    headline: 'El profesor sabe exactamente quién estudia y quién necesita ayuda.',
    features: [
      'Panel con todos los alumnos: nota, sesiones, racha y estado',
      'Alertas automáticas de alumnos en riesgo de abandono',
      'Banco de preguntas filtrable por bloque y búsqueda',
      'Tablón de avisos para comunicar novedades a la clase',
      'Plan semanal de estudio por bloques temáticos',
      'Exportar informe PDF completo de la clase',
    ],
  },
  {
    id: 'director', label: 'Director', color: '#059669',
    icon: Building2,
    headline: 'El director tiene visión de negocio real en tiempo real.',
    features: [
      'KPIs globales: alumnos activos, nota media, en riesgo, retención',
      'Rentabilidad por alumno y MRR calculado automáticamente',
      'Gestión de profesores, asignaturas y códigos de acceso',
      'Historial de facturas de FrostFox con descarga legal en PDF',
      'Informes PDF técnicos exportables',
      'Narrativa inteligente del estado de tu academia',
    ],
  },
]

function RoleSection() {
  const [active, setActive] = useState('alumno')
  const role = ROLES.find(r => r.id === active)
  const Icon = role.icon

  return (
    <div className={styles.roleWrap}>
      {/* Tabs */}
      <div className={styles.roleTabs}>
        {ROLES.map(r => (
          <button
            key={r.id}
            className={`${styles.roleTab} ${active === r.id ? styles.roleTabActive : ''}`}
            style={active === r.id ? { color: r.color, borderColor: `${r.color}50`, background: `${r.color}0d` } : {}}
            onClick={() => setActive(r.id)}
          >
            <r.icon size={15} strokeWidth={2} />
            {r.label}
          </button>
        ))}
      </div>

      {/* Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          className={styles.rolePanel}
          style={{ borderColor: `${role.color}25` }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.22 }}
        >
          {/* Glow top */}
          <div className={styles.rolePanelGlow} style={{ background: role.color }} />

          <div className={styles.roleHeader}>
            <div className={styles.roleIconWrap} style={{ background: `${role.color}15`, color: role.color }}>
              <Icon size={22} strokeWidth={1.8} />
            </div>
            <div>
              <div className={styles.roleLabel} style={{ color: role.color }}>{role.label}</div>
              <div className={styles.roleHeadline}>{role.headline}</div>
            </div>
          </div>

          <div className={styles.roleFeatures}>
            {role.features.map((f, i) => (
              <motion.div
                key={i}
                className={styles.roleFeature}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <CheckCircle size={14} strokeWidth={2.5} style={{ color: role.color, flexShrink: 0, marginTop: 2 }} />
                <span>{f}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// ── Animated grid pattern para precios ────────────────────────
function PlansGridPattern() {
  return (
    <div className={styles.plansGridBg} aria-hidden="true">
      <svg className={styles.plansGridSvg} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="pgrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(93,228,255,0.07)" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#pgrid)" />
      </svg>
      <div className={styles.plansGridGlow1} />
      <div className={styles.plansGridGlow2} />
    </div>
  )
}

// ── Canvas particles para bento ───────────────────────────────
function BentoParticles() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf
    const resize = () => {
      const s = canvas.closest('section')
      canvas.width  = s ? s.offsetWidth  : window.innerWidth
      canvas.height = s ? s.offsetHeight : window.innerHeight
    }
    resize()
    const dots = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.6,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
    }))
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy
        if (d.x < 0 || d.x > canvas.width)  d.vx *= -1
        if (d.y < 0 || d.y > canvas.height) d.vy *= -1
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(93,228,255,0.35)'
        ctx.fill()
      })
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x, dy = dots[i].y - dots[j].y
          const dist = Math.sqrt(dx*dx + dy*dy)
          if (dist < 80) {
            ctx.beginPath()
            ctx.moveTo(dots[i].x, dots[i].y)
            ctx.lineTo(dots[j].x, dots[j].y)
            ctx.strokeStyle = `rgba(93,228,255,${0.12 * (1 - dist/80)})`
            ctx.lineWidth = 0.7
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(loop)
    }
    const t = setTimeout(loop, 300)
    window.addEventListener('resize', resize)
    return () => { clearTimeout(t); cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} className={styles.bentoParticles} />
}

// ── PÁGINA PRINCIPAL ───────────────────────────────────────────
export default function AcademyPage() {
  // Scroll al top al montar
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className={styles.page}>

      {/* ── NAVBAR MINI ── */}
      <nav className={styles.nav}>
        <Link to="/" className={styles.navLogo}>
          <img src={ffLogo} alt="FrostFox" className={styles.navLogoImg} />
          <span className={styles.navLogoText}>FrostFox <span className={styles.accent}>Academy</span></span>
        </Link>
        <div className={styles.navActions}>
          <a href="https://www.thefrostfox.com/#contacto" className={styles.navContact}>Contactar ventas</a>
          <a href="https://www.frostfoxacademy.com" target="_blank" rel="noopener noreferrer" className={styles.navAcceder}>
            Acceder <ArrowRight size={14} strokeWidth={2.5} />
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        {/* Halos animados */}
        <div className={styles.halosWrap}>
          <Halo size={700} opacity={0.07} duration={22} color="#5de4ff" />
          <Halo size={520} opacity={0.12} duration={16} reverse color="#2563EB" />
          <Halo size={340} opacity={0.20} duration={10} color="#5de4ff" />
          <Halo size={180} opacity={0.30} duration={7}  reverse color="#5de4ff" dotTop={false} />
          {/* Orb central */}
          <div className={styles.orbCenter} />
        </div>

        {/* Contenido */}
        <div className={styles.heroContent}>
          <motion.div
            className={styles.heroBadge}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.badgeDot} />
            <span>SaaS B2B · Academias de oposiciones · España</span>
          </motion.div>

          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            La plataforma que necesita<br />
            <span className={styles.accentGlow}>tu academia.</span>
          </motion.h1>

          <div className={styles.dividerLine} />

          <motion.p
            className={styles.heroSubtitle}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Tests autocorregidos, temario estructurado, panel del profesor
            y visión de negocio real para el director. Todo en 48 horas.
          </motion.p>

          <motion.div
            className={styles.heroCtas}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
          >
            <a href={WA_DEMO} target="_blank" rel="noopener noreferrer" className={styles.ctaPrimary}>
              Solicitar demo gratuita →
            </a>
            <a href="https://www.frostfoxacademy.com" target="_blank" rel="noopener noreferrer" className={styles.ctaSecondary}>
              Ya soy usuario · Acceder
            </a>
          </motion.div>

          <motion.div
            className={styles.heroMeta}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <span>✓ Alta en 48h</span>
            <span>✓ Migración del temario incluida</span>
            <span>✓ Garantía 30 días</span>
          </motion.div>
        </div>
      </section>

      {/* ── EL PROBLEMA ── */}
      <section className={styles.section}>
        <div className={styles.container}>
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className={styles.pill} style={{ color: '#ef4444', borderColor: '#ef444430', background: '#ef44440d' }}>
              El problema
            </span>
            <h2 className={styles.sectionTitle}>
              ¿Te suena alguna<br />de estas situaciones?
            </h2>
          </motion.div>

          <div className={styles.painGrid}>
            <PainPoint icon={FolderX}          text="El temario está en PDFs que nadie sabe si leen o no." delay={0.1} />
            <PainPoint icon={MessageSquareX}    text="Las dudas y avisos se pierden en grupos de WhatsApp." delay={0.18} />
            <PainPoint icon={UserX}             text="No sabes qué alumnos estudian y cuáles van a abandonar." delay={0.26} />
            <PainPoint icon={LayoutDashboard}   text="No tienes datos reales para tomar decisiones sobre tu academia." delay={0.34} />
            <PainPoint icon={TimerOff}          text="Preparar, corregir y hacer seguimiento te consume demasiado tiempo." delay={0.42} />
            <PainPoint icon={BadgeDollarSign}   text="Tus alumnos pagan y no sabes si aprovechan el servicio." delay={0.50} />
          </div>

          <motion.div
            className={styles.painSolution}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={styles.painSolutionLine} />
            <span className={styles.painSolutionText}>
              FrostFox Academy resuelve todo esto. <span className={styles.accent}>Sin complicaciones técnicas.</span>
            </span>
            <div className={styles.painSolutionLine} />
          </motion.div>
        </div>
      </section>

      {/* ── CÓMO FUNCIONA — por rol ── */}
      <section className={styles.section}>
        <div className={styles.container}>
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className={styles.pill}>Cómo funciona</span>
            <h2 className={styles.sectionTitle}>
              Tres paneles.<br />
              <span className={styles.accent}>Un solo sistema.</span>
            </h2>
            <p className={styles.sectionSubtitle}>
              Cada rol tiene exactamente lo que necesita, sin sobrecarga de información.
            </p>
          </motion.div>

          <RoleSection />
        </div>
      </section>

      {/* ── FEATURES BENTO ── */}
      <section className={styles.bentoSection}>
        <BentoParticles />
        <div className={styles.container} style={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className={styles.pill}>Funcionalidades</span>
            <h2 className={styles.sectionTitle}>
              Todo lo que necesitas,<br />
              <span className={styles.accent}>desde el primer día.</span>
            </h2>
          </motion.div>

          <div className={styles.bentoGrid}>
            <FeatureCard icon={Zap} title="Alta en 48 horas" desc="De contrato firmado a academia operativa con el temario migrado. Nos encargamos de todo." color="#5de4ff" delay={0.05} size="wide" />
            <FeatureCard icon={BarChart2} title="Estadísticas en tiempo real" desc="Sesiones, nota media, racha, progreso por bloque. Sin esperar reportes manuales." color="#2563EB" delay={0.10} />
            <FeatureCard icon={Target} title="Repetición espaciada" desc="El sistema prioriza los fallos de cada alumno automáticamente." color="#7c3aed" delay={0.15} />
            <FeatureCard icon={Users} title="Multi-academia" desc="Gestiona varias academias, asignaturas y convocatorias desde un mismo panel." color="#059669" delay={0.20} />
            <FeatureCard icon={Shield} title="Garantía 30 días" desc="Si en 30 días no ves valor demostrable, te devolvemos el alta sin preguntas." color="#f59e0b" delay={0.25} />
            <FeatureCard icon={TrendingUp} title="Rentabilidad real" desc="MRR, ARR y retención calculados en tiempo real desde los datos de tu academia." color="#ec4899" delay={0.30} />
            <FeatureCard icon={FileText} title="Facturas legales" desc="Historial de facturas descargables en PDF con modelo legal español (RD 1619/2012)." color="#0891b2" delay={0.35} />
            <FeatureCard icon={Clock} title="Migración incluida" desc="El temario del BOE o convocatoria, convertido a 700+ preguntas estructuradas." color="#5de4ff" delay={0.40} />
          </div>
        </div>
      </section>

      {/* ── PROCESO DE ALTA ── */}
      <section className={styles.section}>
        <div className={styles.container}>
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className={styles.pill} style={{ color: '#059669', borderColor: '#05996930', background: '#0599690d' }}>
              Proceso de alta
            </span>
            <h2 className={styles.sectionTitle}>
              Tu academia, operativa<br />
              <span className={styles.accent}>en 48 horas.</span>
            </h2>
            <p className={styles.sectionSubtitle}>
              Tú solo nos mandas el programa oficial. Nosotros hacemos el resto.
            </p>
          </motion.div>

          <div className={styles.steps}>
            <Step num="01" title="Nos mandas el programa oficial" desc="El BOE o la convocatoria de tu oposición. No necesitamos nada más." who="Tú" delay={0.1} />
            <Step num="02" title="Migramos el temario completo" desc="Bloques, temas y 700+ preguntas clasificadas con respuestas y explicaciones." who="Nosotros" delay={0.2} />
            <Step num="03" title="Configuramos tu academia" desc="Director, profesores y códigos de acceso para tus alumnos." who="Nosotros" delay={0.3} />
            <Step num="04" title="Sesión de onboarding (30 min)" desc="Tu equipo domina la plataforma desde el primer día. Incluida en el alta." who="Juntos" delay={0.4} />
          </div>

          <motion.div
            className={styles.guarantee}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className={styles.guaranteeIcon}><ShieldCheck size={28} strokeWidth={1.8} /></span>
            <div>
              <div className={styles.guaranteeTitle}>Garantía de devolución 30 días</div>
              <div className={styles.guaranteeDesc}>Si en 30 días no ves valor demostrable, te devolvemos el alta sin preguntas.</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── MÉTRICAS ── */}
      <section className={styles.metricsSection}>
        <div className={styles.container}>
          <div className={styles.metricsGrid}>
            <Metric value="710+" label="Preguntas por temario migradas" color="#5de4ff" delay={0.0} />
            <Metric value="48h" label="De contrato a academia operativa" color="#059669" delay={0.1} />
            <Metric value="30d" label="Garantía de devolución" color="#f59e0b" delay={0.2} />
            <Metric value="3" label="Paneles: alumno, profesor y director" color="#7c3aed" delay={0.3} />
          </div>
        </div>
      </section>

      {/* ── PRECIOS ── */}
      <section className={styles.plansSection}>
        <PlansGridPattern />
        <div className={styles.container} style={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className={styles.pill}>Precios</span>
            <h2 className={styles.sectionTitle}>
              Sin sorpresas.<br />
              <span className={styles.accent}>Sin letra pequeña.</span>
            </h2>
            <p className={styles.sectionSubtitle}>Precios sin IVA · Alta única desde 149 €</p>
          </motion.div>

          <div className={styles.plansGrid}>
            {[
              { name: 'Starter', price: '69',  alumnos: '30',  profesores: '1', asignaturas: '1', alta: '149' },
              { name: 'Growth',  price: '109', alumnos: '60',  profesores: '3', asignaturas: '3', alta: '149', popular: true },
              { name: 'Academy', price: '169', alumnos: '100', profesores: '5', asignaturas: '5', alta: '149' },
              { name: 'Pro',     price: '249', alumnos: '∞',   profesores: '∞', asignaturas: '∞', alta: '149' },
            ].map((plan, i) => (
              <motion.div
                key={plan.name}
                className={`${styles.planCard} ${plan.popular ? styles.planPopular : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                {plan.popular && <div className={styles.planBadge}>Más popular</div>}
                <div className={styles.planName}>{plan.name}</div>
                <div className={styles.planPrice}>
                  <span className={styles.planEur}>€</span>
                  <span className={styles.planAmount}>{plan.price}</span>
                  <span className={styles.planPeriod}>/mes</span>
                </div>
                <p className={styles.planSubtitle}>+ Alta única {plan.alta} € (una sola vez)</p>
                <div className={styles.planDivider} />
                <div className={styles.planLimits}>
                  <div className={styles.planLimit}>
                    <span className={styles.planLimitVal}>{plan.alumnos}</span>
                    <span className={styles.planLimitLabel}>alumnos</span>
                  </div>
                  <div className={styles.planLimit}>
                    <span className={styles.planLimitVal}>{plan.profesores}</span>
                    <span className={styles.planLimitLabel}>{plan.profesores === '1' ? 'profesor' : 'profesores'}</span>
                  </div>
                  <div className={styles.planLimit}>
                    <span className={styles.planLimitVal}>{plan.asignaturas}</span>
                    <span className={styles.planLimitLabel}>{plan.asignaturas === '1' ? 'asignatura' : 'asignaturas'}</span>
                  </div>
                </div>
                <div className={styles.planDivider} />
                <div className={styles.planFeatures}>
                  {[
                    'Migración del temario incluida',
                    'Soporte prioritario incluido',
                    'Panel alumno, profesor y director',
                    'Tests autocorregidos con IA',
                    'Garantía 30 días',
                  ].map((f, j) => (
                    <div key={j} className={styles.planFeature}>
                      <CheckCircle size={14} strokeWidth={2.5} style={{ color: plan.popular ? '#5de4ff' : '#059669', flexShrink: 0 }} />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
                <a href={WA_PLAN(plan.name)} target="_blank" rel="noopener noreferrer" className={`${styles.planCta} ${plan.popular ? styles.planCtaPopular : ''}`}>
                  Solicitar demo →
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className={styles.ctaSection}>
        <div className={styles.halosWrap} style={{ opacity: 0.6 }}>
          <Halo size={600} opacity={0.08} duration={20} color="#5de4ff" />
          <Halo size={420} opacity={0.14} duration={14} reverse color="#2563EB" />
          <Halo size={260} opacity={0.22} duration={9} color="#5de4ff" dotTop={false} />
          <div className={styles.orbCenter} />
        </div>
        <div className={styles.ctaContent}>
          <motion.img
            src={ffLogo}
            alt="FrostFox Academy"
            className={styles.ctaLogo}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          />
          <motion.h2
            className={styles.ctaTitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Tu academia digital,<br />
            <span className={styles.accentGlow}>empieza hoy.</span>
          </motion.h2>
          <motion.p
            className={styles.ctaSubtitle}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Alta en 48 horas · Migración incluida · Garantía 30 días
          </motion.p>
          <motion.div
            className={styles.heroCtas}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a href={WA_DEMO} target="_blank" rel="noopener noreferrer" className={styles.ctaPrimary}>
              Solicitar demo gratuita →
            </a>
            <a href="https://www.frostfoxacademy.com" target="_blank" rel="noopener noreferrer" className={styles.ctaSecondary}>
              Ya soy usuario · Acceder
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER MINI ── */}
      <footer className={styles.footer}>
        <Link to="/" className={styles.footerBack}>← Volver a FrostFox</Link>
        <span className={styles.footerText}>FrostFox Academy · © {new Date().getFullYear()}</span>
        <a href="https://www.frostfoxacademy.com" target="_blank" rel="noopener noreferrer" className={styles.footerAcceder}>Acceder a la plataforma</a>
      </footer>
    </div>
  )
}
