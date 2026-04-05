import { forwardRef, useRef, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { AnimatedBeam } from "@/components/ui/animated-beam"
import { cn } from "@/lib/utils"
import {
  Building2, User, Palette, BarChart2,
  Rocket, Zap as ZapIcon,
  Users, Briefcase, Shield, Zap, TrendingUp, CheckCircle
} from "lucide-react"
import styles from "./Talent.module.css"

import personTalent from "../../../../assets/person-talent.webp"
import ffLogo       from "../../../../assets/ff-logo-azul.webp"

const WA_URL = `https://wa.me/34641747308?text=${encodeURIComponent("Hola FrostFox, me gustaría hablar sobre FrostFox Talent y la Seamless Transition.")}`

// ─────────────────────────────────────────────────────────────
// BORDER BEAM WRAPPER — conic-gradient rotatorio (mismo patrón
// que ShineCard de Academy: overflow:hidden + padding:1.5px)
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
// BEAM NODE
// ─────────────────────────────────────────────────────────────
const BeamNode = forwardRef(({ className, children, label, sublabel }, ref) => (
  <div className={styles.nodeWrap}>
    <div ref={ref} className={cn(styles.node, className)}>
      {children}
    </div>
    {label && (
      <div className={styles.nodeMeta}>
        <span className={styles.nodeLabel}>{label}</span>
        {sublabel && <span className={styles.nodeSublabel}>{sublabel}</span>}
      </div>
    )}
  </div>
))
BeamNode.displayName = "BeamNode"

// ─────────────────────────────────────────────────────────────
// BENTO: BEAM CARD — textos arriba, diagram abajo sin overflow
// ─────────────────────────────────────────────────────────────
function BeamCard() {
  const containerRef = useRef(null)
  const empresaRef   = useRef(null)
  const becario1Ref  = useRef(null)
  const becario2Ref  = useRef(null)
  const becario3Ref  = useRef(null)
  const ffRef        = useRef(null)
  const proyecto1Ref = useRef(null)
  const proyecto2Ref = useRef(null)

  return (
    <div className={cn(styles.bentoCard, styles.bentoBeam)}>
      {/* Header fijo */}
      <div className={styles.cardLabel}>
        <span className={styles.cardPill}>El flujo</span>
        <h3 className={styles.cardTitle}>Seamless Transition</h3>
        <p className={styles.cardDesc}>El talento cambia de empleador, no de proyecto.</p>
      </div>

      {/* Diagram: ocupa el espacio restante, overflow visible hacia adentro */}
      <div className={cn(styles.beamContainer, styles.beamContainerInner)} ref={containerRef}>

        {/* Col 1 — empresa origen */}
        <div className={styles.beamCol}>
          <BeamNode ref={empresaRef} label="TechCorp" sublabel="Empresa cliente">
            <Building2 size={20} color="#60a5fa" strokeWidth={1.8} />
          </BeamNode>
        </div>

        {/* Col 2 — talento */}
        <div className={cn(styles.beamCol, styles.beamColTalent)}>
          <BeamNode ref={becario1Ref} label="Dev Sénior" sublabel="Proyecto A">
            <User size={18} color="#60a5fa" strokeWidth={1.8} />
          </BeamNode>
          <BeamNode ref={becario2Ref} label="UX Designer" sublabel="Proyecto A">
            <Palette size={18} color="#60a5fa" strokeWidth={1.8} />
          </BeamNode>
          <BeamNode ref={becario3Ref} label="Data Eng." sublabel="Proyecto A">
            <BarChart2 size={18} color="#60a5fa" strokeWidth={1.8} />
          </BeamNode>
        </div>

        {/* Col 3 — FF logo */}
        <div className={cn(styles.beamCol, styles.beamColCenter)}>
          <BeamNode ref={ffRef} className={styles.nodeFrostFox} label="FrostFox" sublabel="Nexo estratégico">
            <img src={ffLogo} alt="FF" className={styles.ffLogoImg} />
          </BeamNode>
        </div>

        {/* Col 4 — proyectos destino */}
        <div className={styles.beamCol}>
          <BeamNode ref={proyecto1Ref} label="Proyecto A" sublabel="Continúa">
            <Rocket size={18} color="#60a5fa" strokeWidth={1.8} />
          </BeamNode>
          <BeamNode ref={proyecto2Ref} label="Proyecto B" sublabel="Nuevo">
            <ZapIcon size={18} color="#60a5fa" strokeWidth={1.8} />
          </BeamNode>
        </div>

        {/* Beams */}
        <AnimatedBeam containerRef={containerRef} fromRef={empresaRef}  toRef={ffRef} curvature={0}   duration={6}   gradientStartColor="#116bd9" gradientStopColor="#0ea5e9" pathColor="rgba(17,107,217,0.15)" pathWidth={1.5} />
        <AnimatedBeam containerRef={containerRef} fromRef={becario1Ref} toRef={ffRef} curvature={22}  duration={6.5} gradientStartColor="#0ea5e9" gradientStopColor="#38bdf8" pathColor="rgba(14,165,233,0.12)" pathWidth={1.5} />
        <AnimatedBeam containerRef={containerRef} fromRef={becario2Ref} toRef={ffRef} curvature={0}   duration={5.8} gradientStartColor="#0ea5e9" gradientStopColor="#38bdf8" pathColor="rgba(14,165,233,0.12)" pathWidth={1.5} />
        <AnimatedBeam containerRef={containerRef} fromRef={becario3Ref} toRef={ffRef} curvature={-22} duration={7} gradientStartColor="#0ea5e9" gradientStopColor="#38bdf8" pathColor="rgba(14,165,233,0.12)" pathWidth={1.5} />
        <AnimatedBeam containerRef={containerRef} fromRef={ffRef} toRef={proyecto1Ref} curvature={18}  duration={6}   gradientStartColor="#38bdf8" gradientStopColor="#116bd9" pathColor="rgba(17,107,217,0.15)" pathWidth={1.5} reverse />
        <AnimatedBeam containerRef={containerRef} fromRef={ffRef} toRef={proyecto2Ref} curvature={-18} duration={7.2} gradientStartColor="#38bdf8" gradientStopColor="#116bd9" pathColor="rgba(17,107,217,0.15)" pathWidth={1.5} reverse />
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// BENTO: PERSON CARD — halos SVG + BorderBeam
// ─────────────────────────────────────────────────────────────
function PersonCard() {
  return (
    <BorderBeamWrapper>
      {/* Halos SVG sutiles */}
      <svg className={styles.halosSvg} viewBox="0 0 400 500" fill="none">
        <defs>
          <radialGradient id="hOuter" cx="50%" cy="62%" r="50%">
            <stop offset="0%"   stopColor="#f97316" stopOpacity="0.2"  />
            <stop offset="45%"  stopColor="#ec4899" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0"    />
          </radialGradient>
          <radialGradient id="hInner" cx="50%" cy="38%" r="44%">
            <stop offset="0%"   stopColor="#06b6d4" stopOpacity="0.26" />
            <stop offset="55%"  stopColor="#3b82f6" stopOpacity="0.1"  />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0"    />
          </radialGradient>
          <linearGradient id="lV" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#06b6d4" stopOpacity="0.6"  />
            <stop offset="55%"  stopColor="#ec4899" stopOpacity="0.4"  />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0"    />
          </linearGradient>
          <linearGradient id="lH" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#6366f1" stopOpacity="0"    />
            <stop offset="40%"  stopColor="#0ea5e9" stopOpacity="0.42" />
            <stop offset="62%"  stopColor="#ec4899" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0"    />
          </linearGradient>
          <filter id="sBlur"><feGaussianBlur stdDeviation="20" /></filter>
          <filter id="gLine">
            <feGaussianBlur stdDeviation="2.5" result="b" />
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <ellipse cx="200" cy="315" rx="185" ry="195" fill="url(#hOuter)" filter="url(#sBlur)" />
        <ellipse cx="200" cy="210" rx="128" ry="152" fill="url(#hInner)" filter="url(#sBlur)" />
        <line x1="200" y1="18"  x2="200" y2="488" stroke="url(#lV)" strokeWidth="1"   opacity="0.28" filter="url(#gLine)" />
        <line x1="12"  y1="258" x2="388" y2="258" stroke="url(#lH)" strokeWidth="0.8" opacity="0.26" filter="url(#gLine)" />
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

      <img src={personTalent} alt="FrostFox Talent" className={styles.personImg} />

      <div className={styles.personBadge}>
        <span className={styles.personBadgeDot} />
        <span>Talento activo</span>
      </div>
    </BorderBeamWrapper>
  )
}

// ─────────────────────────────────────────────────────────────
// BENTO: METRICS
// ─────────────────────────────────────────────────────────────
function MetricsCard() {
  const metrics = [
    { value: "0d",   label: "Curva de aprendizaje",    color: "#0ea5e9" },
    { value: "100%", label: "Continuidad del proyecto", color: "#38bdf8" },
    { value: "−70%", label: "Coste de onboarding",     color: "#116bd9" },
    { value: "3×",   label: "ROI en retención",        color: "#0284c7" },
  ]
  return (
    <div className={cn(styles.bentoCard, styles.bentoMetrics)}>
      <span className={styles.cardPill}>Impacto</span>
      <h3 className={styles.cardTitle}>Números que importan</h3>
      <div className={styles.metricsGrid}>
        {metrics.map((m, i) => (
          <motion.div key={i} className={styles.metric}
            initial={{ opacity:0, y:14 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.4, delay:i*0.1 }}
          >
            <span className={styles.metricVal} style={{ color:m.color }}>{m.value}</span>
            <span className={styles.metricLbl}>{m.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// BENTO: WIN-WIN-WIN
// ─────────────────────────────────────────────────────────────
function WinCard() {
  const [active, setActive] = useState(0)
  const wins = [
    { who:"La Empresa", icon:<Building2 size={13} />, color:"#1d4ed8", headline:"Knowledge Retention", body:"El conocimiento no se va con el becario. Tu inversión en formación permanece activa en el proyecto." },
    { who:"El Talento",  icon:<User      size={13} />, color:"#0ea5e9", headline:"Primer empleo real",  body:"Contrato estable, proyecto conocido, equipo de confianza. La Seamless Transition que merece el talento joven." },
    { who:"FrostFox",    icon:<img src={ffLogo} style={{width:13,height:13,objectFit:"contain"}} />, color:"#0284c7", headline:"Red de élite", body:"Cada integración fortalece nuestra red de profesionales técnicos validados en proyectos reales." },
  ]
  const w = wins[active]
  return (
    <div className={cn(styles.bentoCard, styles.bentoWin)}>
      <span className={styles.cardPill}>Win-Win-Win</span>
      <h3 className={styles.cardTitle}>Tres victorias, un acuerdo</h3>
      <div className={styles.winTabs}>
        {wins.map((ww, i) => (
          <button key={i}
            className={cn(styles.winTab, active===i && styles.winTabActive)}
            style={active===i ? { borderColor:ww.color, color:ww.color, background:`${ww.color}10` } : {}}
            onClick={() => setActive(i)}
          >
            <span className={styles.winTabIcon}>{ww.icon}</span>
            {ww.who}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={active} className={styles.winBody}
          initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-10 }}
          transition={{ duration:0.22 }}
        >
          <span className={styles.winHeadline} style={{ color:w.color }}>{w.headline}</span>
          <p className={styles.winText}>{w.body}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// BENTO: PROBLEM → SOLUTION — con scroll interno
// ─────────────────────────────────────────────────────────────
function ProblemCard() {
  const steps = [
    { phase:"Problema",  color:"#ef4444", Icon:Shield,      text:"Formas un becario. Aprende tu stack, cultura y proyecto. No puedes contratarlo por falta de headcount." },
    { phase:"Solución",  color:"#0ea5e9", Icon:null,        text:"FrostFox contrata al talento. Cambia la camiseta, no el equipo. El profesional sigue en tu proyecto.", isFox:true },
    { phase:"Resultado", color:"#22c55e", Icon:CheckCircle, text:"Cero días de onboarding. Knowledge Retention al 100%. Flexibilidad total para escalar." },
  ]
  return (
    <div className={cn(styles.bentoCard, styles.bentoProblem)}>
      <div className={styles.problemHeader}>
        <span className={styles.cardPill}>El modelo</span>
        <h3 className={styles.cardTitle}>Del problema al resultado</h3>
      </div>
      {/* Scroll interno */}
      <div className={styles.timelineScroll}>
        <div className={styles.timeline}>
          {steps.map((s, i) => (
            <motion.div key={i} className={styles.tlStep}
              initial={{ opacity:0, x:-16 }} whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true }} transition={{ duration:0.4, delay:i*0.12 }}
            >
              <div className={styles.tlDotWrap}>
                <div className={styles.tlDot} style={{ background:s.color, boxShadow:`0 0 10px ${s.color}60` }} />
                {i < steps.length - 1 && (
                  <div className={styles.tlLine} style={{ background:`linear-gradient(to bottom, ${s.color}40, ${steps[i+1].color}20)` }} />
                )}
              </div>
              <div className={styles.tlContent}>
                <span className={styles.tlPhase} style={{ color:s.color }}>
                  {s.isFox
                    ? <img src={ffLogo} className={styles.tlFoxIcon} alt="FF" />
                    : s.Icon && <s.Icon size={11} style={{ flexShrink:0 }} />
                  }
                  {s.phase}
                </span>
                <p className={styles.tlText}>{s.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
        {/* Fade mask abajo para indicar scroll */}
        <div className={styles.scrollFade} />
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// BENTO: BENEFITS
// ─────────────────────────────────────────────────────────────
function BenefitsCard() {
  const benefits = [
    { Icon:Zap,         color:"#0ea5e9", title:"Zero onboarding",    desc:"Productividad desde el día 1." },
    { Icon:Shield,      color:"#1d4ed8", title:"Sin carga legal",     desc:"FrostFox gestiona contratos y nóminas." },
    { Icon:TrendingUp,  color:"#0284c7", title:"Escala sin fricción", desc:"Ajusta el equipo por fases." },
    { Icon:Users,       color:"#0ea5e9", title:"Élite técnica",       desc:"Red de profesionales validados." },
    { Icon:Briefcase,   color:"#3b82f6", title:"Continuidad",         desc:"El conocimiento permanece activo." },
    { Icon:CheckCircle, color:"#0284c7", title:"Flexibilidad total",  desc:"Por proyecto o indefinido." },
  ]
  return (
    <div className={cn(styles.bentoCard, styles.bentoBenefits)}>
      <span className={styles.cardPill}>Ventajas</span>
      <h3 className={styles.cardTitle}>¿Por qué FrostFox Talent?</h3>
      <div className={styles.benefitsGrid}>
        {benefits.map((b, i) => (
          <motion.div key={i} className={styles.benefit}
            initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.35, delay:i*0.07 }}
          >
            <div className={styles.benefitIcon} style={{ background:`${b.color}12`, color:b.color }}>
              <b.Icon size={16} strokeWidth={2} />
            </div>
            <div>
              <span className={styles.benefitTitle}>{b.title}</span>
              <span className={styles.benefitDesc}>{b.desc}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// BENTO: CTA
// ─────────────────────────────────────────────────────────────
function CtaCard() {
  return (
    <div className={cn(styles.bentoCard, styles.bentoCta)}>
      <div className={styles.ctaGlow} />
      <div className={styles.ctaBadge}><span className={styles.ctaDot} />Disponible ahora · Sin permanencia</div>
      <h3 className={styles.ctaTitle}>¿Tienes talento que no puedes retener?</h3>
      <p className={styles.ctaBody}>Habla con nuestro equipo. En 48h diseñamos la estructura de transición adaptada a tu situación.</p>
      <div className={styles.ctaRow}>
        <motion.button className={styles.ctaPrimary}
          whileHover={{ scale:1.04, boxShadow:"0 0 40px rgba(17,107,217,0.55)" }}
          whileTap={{ scale:0.97 }}
          onClick={() => window.open(WA_URL, "_blank")}
        >Hablar con un experto →</motion.button>
        <motion.button className={styles.ctaSecondary}
          whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }}
          onClick={() => { const el = document.getElementById("contacto"); if(el) el.scrollIntoView({ behavior: "smooth" }) }}
        >Ver casos de éxito</motion.button>
      </div>
      <p className={styles.ctaNote}>Sin compromiso · Respuesta en menos de 24h · Confidencialidad garantizada</p>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// TALENT PRINCIPAL
// ─────────────────────────────────────────────────────────────
export default function Talent() {
  return (
    <section className={styles.section} id="talent">
      <div className={styles.bgMesh} />
      <div className={styles.content}>
        <div className={styles.header}>
          <motion.span className={styles.pill}
            initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.5 }}
          >Servicio</motion.span>
          <motion.h2 className={styles.title}
            initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.6, delay:0.08 }}
          >FrostFox <span className={styles.titleAccent}>Talent</span></motion.h2>
          <motion.p className={styles.subtitle}
            initial={{ opacity:0 }} whileInView={{ opacity:1 }}
            viewport={{ once:true }} transition={{ duration:0.55, delay:0.15 }}
          >
            Outsourcing estratégico para empresas tech que no pueden permitirse
            perder el conocimiento que ya han creado.
          </motion.p>
        </div>

        <div className={styles.bentoGrid}>
          <motion.div className={styles.bentoAreaBeam}
            initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.6 }}
          ><BeamCard /></motion.div>

          <motion.div className={styles.bentoAreaPerson}
            initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.6, delay:0.1 }}
          ><PersonCard /></motion.div>

          <motion.div className={styles.bentoAreaMetrics}
            initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.6, delay:0.05 }}
          ><MetricsCard /></motion.div>

          <motion.div className={styles.bentoAreaWin}
            initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.6, delay:0.1 }}
          ><WinCard /></motion.div>

          <motion.div className={styles.bentoAreaProblem}
            initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.6, delay:0.15 }}
          ><ProblemCard /></motion.div>

          <motion.div className={styles.bentoAreaBenefits}
            initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.6, delay:0.08 }}
          ><BenefitsCard /></motion.div>

          <motion.div className={styles.bentoAreaCta}
            initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.6, delay:0.14 }}
          ><CtaCard /></motion.div>
        </div>
      </div>
    </section>
  )
}
