import { forwardRef, useRef } from "react"
import { AnimatedBeam } from "@/components/ui/animated-beam"
import { cn } from "@/lib/utils"
import styles from "./BeamSection.module.css"

const Node = forwardRef(({ className, children, label }, ref) => (
  <div className={styles.nodeWrap}>
    <div ref={ref} className={cn(styles.node, className)}>
      {children}
    </div>
    {label && <span className={styles.nodeLabel}>{label}</span>}
  </div>
))
Node.displayName = "Node"

export default function BeamSection() {
  const containerRef = useRef(null)
  const techRef      = useRef(null)
  const talentRef    = useRef(null)
  const ffRef        = useRef(null)
  const clientRef    = useRef(null)

  return (
    <div className={styles.wrapper} ref={containerRef}>

      {/* Columna izquierda */}
      <div className={styles.colLeft}>
        <Node ref={techRef} label="Nueva Tecnología">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2ab8d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6"/>
            <polyline points="8 6 2 12 8 18"/>
          </svg>
        </Node>
        <Node ref={talentRef} label="Nuevo Talento">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2ab8d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        </Node>
      </div>

      {/* Centro — FF */}
      <div className={styles.colCenter}>
        <Node ref={ffRef} className={styles.nodeFrostfox}>
          <span className={styles.logoFF}>FF</span>
        </Node>
      </div>

      {/* Derecha — Tu empresa */}
      <div className={styles.colRight}>
        <Node ref={clientRef} label="Tu empresa">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2ab8d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2"/>
            <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
          </svg>
        </Node>
      </div>

      {/* Beams rectos: izq → FF */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={techRef}
        toRef={ffRef}
        curvature={0}
        duration={3}
        gradientStartColor="#5de4ff"
        gradientStopColor="#2ab8d4"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={talentRef}
        toRef={ffRef}
        curvature={0}
        duration={3.5}
        gradientStartColor="#5de4ff"
        gradientStopColor="#2ab8d4"
      />

      {/* Beam recto: FF → cliente */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={ffRef}
        toRef={clientRef}
        curvature={0}
        duration={3}
        gradientStartColor="#2ab8d4"
        gradientStopColor="#5de4ff"
      />
    </div>
  )
}
