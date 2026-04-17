import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Building2, BookOpen, GraduationCap, CheckCircle } from 'lucide-react'
import styles from './RoleSection.module.css'

const ROLES = [
  {
    id: 'alumno', label: 'Alumno', color: '#0891b2', icon: GraduationCap,
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
    id: 'profesor', label: 'Profesor', color: '#7c3aed', icon: BookOpen,
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
    id: 'director', label: 'Director', color: '#059669', icon: Building2,
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

// Posiciones desktop para cada card según cuál es la activa
function getDesktopStyle(idx, activeIdx) {
  const diff = idx - activeIdx
  // activa: centro, elevada
  if (diff === 0)  return { x: '0%',    y: -20, rotate: 0,  scale: 1,    zIndex: 10, opacity: 1    }
  // izquierda
  if (diff === -1) return { x: '-72%',  y: 20,  rotate: -5, scale: 0.88, zIndex: 5,  opacity: 0.85 }
  // derecha
  if (diff === 1)  return { x: '72%',   y: 20,  rotate: 5,  scale: 0.88, zIndex: 5,  opacity: 0.85 }
  // muy a la izquierda (oculta)
  if (diff <= -2)  return { x: '-120%', y: 40,  rotate: -8, scale: 0.78, zIndex: 2,  opacity: 0    }
  // muy a la derecha (oculta)
  return               { x: '120%',  y: 40,  rotate: 8,  scale: 0.78, zIndex: 2,  opacity: 0    }
}

// Posiciones móvil
function getMobileStyle(idx, activeIdx) {
  const diff = idx - activeIdx
  if (diff === 0)  return { x: 0,   y: 0,  rotate: 0,  scale: 1,    zIndex: 10, opacity: 1    }
  if (diff === -1) return { x: -22, y: 24, rotate: -8, scale: 0.88, zIndex: 6,  opacity: 0.8  }
  if (diff === 1)  return { x: 22,  y: 24, rotate: 8,  scale: 0.88, zIndex: 6,  opacity: 0.8  }
  if (diff === -2) return { x: -36, y: 40, rotate: -13,scale: 0.78, zIndex: 3,  opacity: 0.5  }
  if (diff === 2)  return { x: 36,  y: 40, rotate: 13, scale: 0.78, zIndex: 3,  opacity: 0.5  }
  return               { x: 0,   y: 48, rotate: 0,  scale: 0.7,  zIndex: 1,  opacity: 0    }
}

const SPRING = { type: 'spring', stiffness: 220, damping: 28, mass: 0.8 }

export default function RoleSection() {
  const [activeIdx, setActiveIdx] = useState(0)
  const dragStartX = useRef(0)
  const isDragging = useRef(false)

  const handleTouchStart = (e) => {
    dragStartX.current = e.touches[0].clientX
    isDragging.current = false
  }
  const handleTouchMove = (e) => {
    if (Math.abs(e.touches[0].clientX - dragStartX.current) > 10) isDragging.current = true
  }
  const handleTouchEnd = (e) => {
    if (!isDragging.current) return
    const diff = dragStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) {
      if (diff > 0) setActiveIdx(i => Math.min(i + 1, ROLES.length - 1))
      else setActiveIdx(i => Math.max(i - 1, 0))
    }
  }

  const active = ROLES[activeIdx]

  const CardContent = ({ role, isActive }) => {
    const Icon = role.icon
    return (
      <>
        <div className={styles.cardAccent} style={{ background: `linear-gradient(90deg, transparent, ${role.color}, transparent)` }} />
        {isActive ? (
          <motion.div
            className={styles.cardContent}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.08 }}
          >
            <div className={styles.cardHeader}>
              <div className={styles.cardIconWrap} style={{ background: `${role.color}18`, color: role.color }}>
                <Icon size={20} strokeWidth={1.8} />
              </div>
              <div>
                <div className={styles.cardRoleLabel} style={{ color: role.color }}>{role.label}</div>
                <div className={styles.cardHeadline}>{role.headline}</div>
              </div>
            </div>
            <div className={styles.cardFeatures}>
              {role.features.map((f, i) => (
                <motion.div
                  key={i}
                  className={styles.cardFeature}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: 0.1 + i * 0.04 }}
                >
                  <CheckCircle size={13} strokeWidth={2.5} style={{ color: role.color, flexShrink: 0, marginTop: 2 }} />
                  <span>{f}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <div className={styles.cardPlaceholder}>
            <Icon size={28} strokeWidth={1.3} style={{ color: `${role.color}65` }} />
            <span style={{ color: `${role.color}85`, fontSize: 12, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' }}>{role.label}</span>
          </div>
        )}
      </>
    )
  }

  return (
    <div className={styles.roleWrap}>

      {/* ── TABS ── */}
      <div className={styles.roleTabs}>
        {ROLES.map((r, i) => (
          <button
            key={r.id}
            className={`${styles.roleTab} ${activeIdx === i ? styles.roleTabActive : ''}`}
            style={activeIdx === i ? { color: r.color, borderColor: `${r.color}50`, background: `${r.color}0d` } : {}}
            onClick={() => setActiveIdx(i)}
          >
            <r.icon size={15} strokeWidth={2} />
            {r.label}
          </button>
        ))}
      </div>

      {/* ── DESKTOP — 3 cards apiladas ── */}
      <div className={styles.desktopStack}>
        {[...ROLES].reverse().map((role, ri) => {
          const idx = ROLES.length - 1 - ri
          const isActive = idx === activeIdx
          const s = getDesktopStyle(idx, activeIdx)
          return (
            <motion.div
              key={role.id}
              className={styles.stackCard}
              animate={{ x: s.x, y: s.y, rotate: s.rotate, scale: s.scale, opacity: s.opacity }}
              transition={SPRING}
              style={{
                zIndex: s.zIndex,
                borderColor: `${role.color}40`,
                background: `linear-gradient(150deg, rgba(10,17,30,0.98) 0%, ${role.color}10 100%)`,
                boxShadow: isActive
                  ? `0 32px 80px rgba(0,0,0,0.6), 0 0 48px ${role.color}20`
                  : `0 12px 32px rgba(0,0,0,0.35)`,
                cursor: isActive ? 'default' : 'pointer',
              }}
              onClick={() => !isActive && setActiveIdx(idx)}
            >
              <CardContent role={role} isActive={isActive} />
            </motion.div>
          )
        })}
      </div>

      {/* ── MOBILE — cards apiladas con swipe ── */}
      <div
        className={styles.mobileStack}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className={styles.mobileStackInner}>
          {[...ROLES].reverse().map((role, ri) => {
            const idx = ROLES.length - 1 - ri
            const isActive = idx === activeIdx
            const s = getMobileStyle(idx, activeIdx)
            return (
              <motion.div
                key={role.id}
                className={styles.stackCard}
                animate={{ x: s.x, y: s.y, rotate: s.rotate, scale: s.scale, opacity: s.opacity }}
                transition={SPRING}
                style={{
                  zIndex: s.zIndex,
                  borderColor: `${role.color}40`,
                  background: `linear-gradient(150deg, rgba(8,14,26,0.99) 0%, ${role.color}12 100%)`,
                  boxShadow: isActive
                    ? `0 28px 72px rgba(0,0,0,0.6), 0 0 40px ${role.color}22`
                    : `0 10px 28px rgba(0,0,0,0.4)`,
                  cursor: isActive ? 'default' : 'pointer',
                }}
                onClick={() => !isActive && setActiveIdx(idx)}
              >
                <CardContent role={role} isActive={isActive} />
              </motion.div>
            )
          })}
        </div>

        <p className={styles.swipeHint}>← desliza para cambiar →</p>

        <div className={styles.dots}>
          {ROLES.map((r, i) => (
            <motion.button
              key={r.id}
              className={styles.dot}
              animate={{
                width: i === activeIdx ? 22 : 7,
                background: i === activeIdx ? r.color : 'rgba(255,255,255,0.2)'
              }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={() => setActiveIdx(i)}
              aria-label={r.label}
            />
          ))}
        </div>
      </div>

    </div>
  )
}
