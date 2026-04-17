import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'motion/react'

import {
  Building2, UserCog, BookOpen, FileText, GraduationCap, Trophy,
  CheckCircle, ArrowRight, Zap, Shield, BarChart2, Clock,
  Users, Target, TrendingUp, Star,
  FolderX, MessageSquareX, UserX, LayoutDashboard, TimerOff, BadgeDollarSign,
  ShieldCheck
} from 'lucide-react'
import RoleSection from './RoleSection'
import FeatureStack from './FeatureStack'
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
  const canvasRef    = useRef(null)
  const isVisibleRef = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf

    const CONNECT_DIST  = 80
    const CONNECT_DIST2 = CONNECT_DIST * CONNECT_DIST

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
      if (!isVisibleRef.current) { raf = requestAnimationFrame(loop); return }
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = 'rgba(93,228,255,0.35)'
      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy
        if (d.x < 0 || d.x > canvas.width)  d.vx *= -1
        if (d.y < 0 || d.y > canvas.height) d.vy *= -1
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.strokeStyle = 'rgb(93,228,255)'
      ctx.lineWidth = 0.7
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx    = dots[i].x - dots[j].x
          const dy    = dots[i].y - dots[j].y
          const dist2 = dx * dx + dy * dy
          if (dist2 < CONNECT_DIST2) {
            ctx.globalAlpha = 0.12 * (1 - Math.sqrt(dist2) / CONNECT_DIST)
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

    const t = setTimeout(loop, 300)
    window.addEventListener('resize', resize)
    const io = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting },
      { threshold: 0 }
    )
    io.observe(canvas)

    return () => {
      clearTimeout(t)
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      io.disconnect()
    }
  }, [])

  return <canvas ref={canvasRef} className={styles.bentoParticles} />
}

// ── FAQ ───────────────────────────────────────────────────────
const FAQS = [
  {
    q: '¿Cuánto cuesta FrostFox Academy?',
    a: 'Los planes van desde 69 €/mes (Starter, hasta 30 alumnos) hasta 249 €/mes (Pro, alumnos ilimitados). Todos incluyen una alta única de 149 € que cubre la migración del temario completo y la sesión de onboarding. Precios sin IVA.',
  },
  {
    q: '¿Qué incluye el precio mensual?',
    a: 'Acceso completo a la plataforma para todos tus alumnos, profesores y el director. Incluye tests autocorregidos, temario estructurado, estadísticas en tiempo real, tablón de avisos, panel de rentabilidad y soporte prioritario. Sin costes adicionales por funcionalidades.',
  },
  {
    q: '¿Hay permanencia o puedo darme de baja cuando quiera?',
    a: 'No hay permanencia. Puedes darte de baja en cualquier momento sin penalización. Facturamos mes a mes y no retenemos tu dinero si decides cancelar.',
  },
  {
    q: '¿En qué consiste la garantía de 30 días?',
    a: 'Si en los primeros 30 días no ves valor demostrable en tu academia, te devolvemos el importe del alta (149 €) sin preguntas. Solo tienes que comunicárnoslo.',
  },
  {
    q: '¿Cuánto tarda el alta de mi academia?',
    a: 'El proceso completo, desde que firmas hasta que tu academia está operativa con el temario migrado, es de 48 horas. Nos encargamos de todo: estructuración del temario, creación de preguntas, configuración de usuarios y sesión de onboarding.',
  },
  {
    q: '¿Tengo que preparar yo el temario o lo hacéis vosotros?',
    a: 'Solo tienes que mandarnos el programa oficial de la convocatoria (el BOE o el documento de la oposición). Nosotros lo convertimos en bloques, temas y más de 700 preguntas estructuradas con respuestas y explicaciones.',
  },
  {
    q: '¿Qué pasa si mi convocatoria cambia o sale una nueva?',
    a: 'Las actualizaciones de temario se gestionan directamente con nuestro equipo. Si hay cambios legislativos o sale una nueva convocatoria, coordinamos la migración del contenido actualizado.',
  },
  {
    q: '¿Necesito conocimientos técnicos para usar la plataforma?',
    a: 'No. FrostFox Academy está diseñada para directores, profesores y alumnos sin perfil técnico. La sesión de onboarding de 30 minutos incluida en el alta es suficiente para que tu equipo domine la plataforma desde el primer día.',
  },
  {
    q: '¿Cuántos alumnos puedo tener en cada plan?',
    a: 'El plan Starter admite hasta 30 alumnos, Growth hasta 60, Academy hasta 100 y Pro es ilimitado. Si en algún momento superas el límite de tu plan, puedes cambiar de plan en cualquier momento sin penalización.',
  },
  {
    q: '¿Puedo gestionar varias asignaturas u oposiciones a la vez?',
    a: 'Sí. Desde el plan Growth puedes gestionar varias asignaturas simultáneamente, cada una con su propio temario, banco de preguntas y profesores asignados. El plan Pro no tiene límite de asignaturas.',
  },
  {
    q: '¿Los alumnos pueden estudiar desde el móvil?',
    a: 'Sí. FrostFox Academy es una plataforma web totalmente responsive. Los alumnos pueden acceder desde cualquier dispositivo — móvil, tablet o escritorio — sin necesidad de instalar ninguna aplicación.',
  },
  {
    q: '¿Cómo funciona la repetición espaciada en FrostFox Academy?',
    a: 'El sistema analiza automáticamente los fallos de cada alumno en los tests y prioriza esas preguntas en las siguientes sesiones de estudio. El alumno no tiene que configurar nada — el algoritmo se encarga de que repase lo que más necesita en el momento adecuado.',
  },
  {
    q: '¿Puedo exportar informes de mis alumnos en PDF?',
    a: 'Sí. Tanto el profesor como el director pueden exportar informes completos en PDF con el progreso de cada alumno: sesiones, nota media, racha de estudio, fallos por bloque y evolución temporal. Listos para compartir o archivar.',
  },
  {
    q: '¿Puedo ver una demo antes de contratar?',
    a: 'Por supuesto. Ofrecemos una demo gratuita de 30 minutos donde te mostramos la plataforma en funcionamiento real, adaptada a tu tipo de academia y convocatoria. Sin compromiso.',
  },
]

function FaqSection() {
  const [open, setOpen] = useState(0)
  const [expanded, setExpanded] = useState(false)

  const visibleFaqs = expanded ? FAQS : FAQS.slice(0, 4)

  return (
    <div className={styles.faqWrap}>
      <div className={styles.faqList}>
        {visibleFaqs.map((faq, i) => (
          <motion.div
            key={i}
            className={`${styles.faqItem} ${open === i ? styles.faqItemOpen : ''}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.03 }}
          >
            <button
              className={styles.faqQuestion}
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
            >
              <span>{faq.q}</span>
              <motion.span
                className={styles.faqIcon}
                animate={{ rotate: open === i ? 45 : 0 }}
                transition={{ duration: 0.2 }}
              >
                +
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  className={styles.faqAnswer}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                >
                  <p>{faq.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {!expanded && (
        <div className={styles.faqFade}>
          <motion.button
            className={styles.faqExpandBtn}
            onClick={() => setExpanded(true)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Ver todas las preguntas
            <span className={styles.faqExpandArrow}>↓</span>
          </motion.button>
        </div>
      )}
    </div>
  )
}

// ── PÁGINA PRINCIPAL ───────────────────────────────────────────
export default function AcademyPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  const schemaFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  }

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "FrostFox Academy",
    "url": "https://thefrostfox.com/academy",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "description": "Plataforma SaaS para academias de oposiciones en España. Tests autocorregidos, panel de profesor, estadísticas en tiempo real y visión de negocio para el director.",
    "offers": [
      {
        "@type": "Offer",
        "name": "Starter",
        "price": "69",
        "priceCurrency": "EUR",
        "priceSpecification": { "@type": "UnitPriceSpecification", "billingDuration": "P1M" }
      },
      {
        "@type": "Offer",
        "name": "Growth",
        "price": "109",
        "priceCurrency": "EUR",
        "priceSpecification": { "@type": "UnitPriceSpecification", "billingDuration": "P1M" }
      },
      {
        "@type": "Offer",
        "name": "Academy",
        "price": "169",
        "priceCurrency": "EUR",
        "priceSpecification": { "@type": "UnitPriceSpecification", "billingDuration": "P1M" }
      },
      {
        "@type": "Offer",
        "name": "Pro",
        "price": "249",
        "priceCurrency": "EUR",
        "priceSpecification": { "@type": "UnitPriceSpecification", "billingDuration": "P1M" }
      }
    ],
    "provider": {
      "@type": "Organization",
      "name": "FrostFox",
      "url": "https://thefrostfox.com"
    }
  }

  return (
    <div className={styles.page}>

      <Helmet>
        <title>FrostFox Academy · Plataforma para academias de oposiciones</title>
        <meta name="description" content="Software de gestión para academias de oposiciones en España. Tests autocorregidos, seguimiento de alumnos, panel del profesor y visión de negocio real. Alta en 48h." />
        <link rel="canonical" href="https://thefrostfox.com/academy" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="FrostFox Academy · Plataforma para academias de oposiciones" />
        <meta property="og:description" content="Software de gestión para academias de oposiciones en España. Tests autocorregidos, seguimiento de alumnos y visión de negocio real. Alta en 48h." />
        <meta property="og:url" content="https://thefrostfox.com/academy" />
        <meta property="og:image" content="https://thefrostfox.com/og-image.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FrostFox Academy · Plataforma para academias de oposiciones" />
        <meta name="twitter:description" content="Software de gestión para academias de oposiciones en España. Tests autocorregidos, seguimiento de alumnos y visión de negocio real." />
        <meta name="twitter:image" content="https://thefrostfox.com/og-image.png" />

        {/* Schema.org FAQPage */}
        <script type="application/ld+json">
          {JSON.stringify(schemaFaq)}
        </script>

        {/* Schema.org SoftwareApplication */}
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      {/* ── NAVBAR MINI ── */}
      <nav className={styles.nav}>
        <Link to="/" className={styles.navLogo}>
          <img src={ffLogo} alt="Logo FrostFox Academy" className={styles.navLogoImg} />
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
        <div className={styles.halosWrap}>
          <Halo size={700} opacity={0.07} duration={22} color="#5de4ff" />
          <Halo size={520} opacity={0.12} duration={16} reverse color="#2563EB" />
          <Halo size={340} opacity={0.20} duration={10} color="#5de4ff" />
          <Halo size={180} opacity={0.30} duration={7}  reverse color="#5de4ff" dotTop={false} />
          <div className={styles.orbCenter} />
        </div>

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
            La plataforma de gestión para <span className={styles.accentGlow}>academias de oposiciones.</span>
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
              Software completo:<br />
              <span className={styles.accent}>alumno, profesor y director.</span>
            </h2>
            <p className={styles.sectionSubtitle}>
              Cada rol tiene exactamente lo que necesita, sin sobrecarga de información.
            </p>
          </motion.div>
          <RoleSection />
        </div>
      </section>

      {/* ── FEATURES BENTO ── */}
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
        Todo lo que necesita<br />
        <span className={styles.accent}>tu academia de oposiciones.</span>
      </h2>
    </motion.div>
    <FeatureStack />
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
            <Step num="01" title="Nos mandas el programa oficial"    desc="El BOE o la convocatoria de tu oposición. No necesitamos nada más." who="Tú" delay={0.1} />
            <Step num="02" title="Migramos el temario completo"      desc="Bloques, temas y 700+ preguntas clasificadas con respuestas y explicaciones." who="Nosotros" delay={0.2} />
            <Step num="03" title="Configuramos tu academia"          desc="Director, profesores y códigos de acceso para tus alumnos." who="Nosotros" delay={0.3} />
            <Step num="04" title="Sesión de onboarding (30 min)"     desc="Tu equipo domina la plataforma desde el primer día. Incluida en el alta." who="Juntos" delay={0.4} />
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
            <Metric value="710+" label="Preguntas por temario migradas"       color="#5de4ff" delay={0.0} />
            <Metric value="48h"  label="De contrato a academia operativa"     color="#059669" delay={0.1} />
            <Metric value="30d"  label="Garantía de devolución"               color="#f59e0b" delay={0.2} />
            <Metric value="3"    label="Paneles: alumno, profesor y director"  color="#7c3aed" delay={0.3} />
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

      {/* ── FAQ ── */}
      <section className={styles.faqSection}>
        <div className={styles.container}>
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className={styles.pill}>Preguntas frecuentes</span>
            <h2 className={styles.sectionTitle}>
              Todo lo que necesitas<br />
              <span className={styles.accent}>saber antes de empezar.</span>
            </h2>
          </motion.div>
          <FaqSection />
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
            alt="Logo FrostFox Academy — plataforma para academias de oposiciones"
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
            Tu academia de oposiciones digital,<br />
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
