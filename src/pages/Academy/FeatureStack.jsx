import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Zap, Shield, BarChart2, Clock, Users, Target, TrendingUp, FileText } from 'lucide-react'
import styles from './FeatureStack.module.css'

const FEATURES = [
  { icon: Zap,        title: 'Alta en 48 horas',           desc: 'De contrato firmado a academia operativa con el temario migrado. Nos encargamos de todo — bloques, temas, preguntas y configuración de usuarios.',  color: '#5de4ff' },
  { icon: BarChart2,  title: 'Estadísticas en tiempo real', desc: 'Sesiones, nota media, racha y progreso por bloque para cada alumno. Sin esperar reportes manuales ni exportar Excel.',                             color: '#2563EB' },
  { icon: Target,     title: 'Repetición espaciada',        desc: 'El sistema analiza los fallos de cada alumno y prioriza esas preguntas automáticamente en las siguientes sesiones.',                                color: '#7c3aed' },
  { icon: Users,      title: 'Multi-academia',              desc: 'Gestiona varias academias, asignaturas y convocatorias desde un solo panel. Cada academia ve solo su contenido.',                                   color: '#059669' },
  { icon: Shield,     title: 'Garantía 30 días',            desc: 'Si en 30 días no ves valor demostrable en tu academia, te devolvemos el importe del alta sin preguntas ni letra pequeña.',                         color: '#f59e0b' },
  { icon: TrendingUp, title: 'Rentabilidad real',           desc: 'MRR, ARR y tasa de retención calculados en tiempo real desde los datos de tu academia.',                                                           color: '#ec4899' },
  { icon: FileText,   title: 'Facturas legales',            desc: 'Historial de facturas en PDF con modelo legal español (RD 1619/2012). Listas para contabilidad sin trabajo extra.',                                color: '#0891b2' },
  { icon: Clock,      title: 'Migración incluida',          desc: 'El temario del BOE convertido en 700+ preguntas estructuradas por bloques y temas. Incluido en el alta.',                                          color: '#5de4ff' },
]

const SPRING = { type: 'spring', stiffness: 220, damping: 28, mass: 0.8 }

function getCardStyle(idx, activeIdx, total) {
  const diff = ((idx - activeIdx) % total + total) % total
  if (diff === 0)  return { zIndex: 10, rotate: 0,  scale: 1,    y: 0,  x: 0,   opacity: 1    }
  if (diff === 1)  return { zIndex: 6,  rotate: 5,  scale: 0.92, y: 18, x: 28,  opacity: 0.8  }
  if (diff === 2)  return { zIndex: 4,  rotate: 9,  scale: 0.84, y: 32, x: 48,  opacity: 0.55 }
  if (diff === total - 1) return { zIndex: 6, rotate: -5, scale: 0.92, y: 18, x: -28, opacity: 0.8  }
  if (diff === total - 2) return { zIndex: 4, rotate: -9, scale: 0.84, y: 32, x: -48, opacity: 0.55 }
  return { zIndex: 1, rotate: 0, scale: 0.75, y: 40, x: 0, opacity: 0 }
}

export default function FeatureStack() {
  const [activeIdx, setActiveIdx] = useState(0)
  const dragStartX = useRef(0)
  const isDragging = useRef(false)
  const total = FEATURES.length
  const active = FEATURES[activeIdx]

  const next = () => setActiveIdx(i => (i + 1) % total)
  const prev = () => setActiveIdx(i => (i - 1 + total) % total)

  const handleTouchStart = (e) => {
    dragStartX.current = e.touches[0].clientX
    isDragging.current = false
  }
  const handleTouchMove = (e) => {
    if (Math.abs(e.touches[0].clientX - dragStartX.current) > 8) isDragging.current = true
  }
  const handleTouchEnd = (e) => {
    if (!isDragging.current) return
    const diff = dragStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev()
  }

  return (
    <div className={styles.outer}>
      {/* Desktop — panel estilo RoleSection */}
      <div className={styles.desktopPanel}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            className={styles.panel}
            style={{ borderColor: `${active.color}30` }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
          >
            <div className={styles.panelGlow} style={{ background: active.color }} />
            <div className={styles.panelHeader}>
              <div className={styles.panelIcon} style={{ background: `${active.color}15`, color: active.color }}>
                <active.icon size={22} strokeWidth={1.8} />
              </div>
              <div>
                <div className={styles.panelLabel} style={{ color: active.color }}>{active.title}</div>
                <div className={styles.panelDesc}>{active.desc}</div>
              </div>
            </div>
            {/* Nav arrows */}
            <div className={styles.panelNav}>
              <button className={styles.navBtn} onClick={prev} style={{ color: active.color }} aria-label="Anterior">←</button>
              <div className={styles.panelDots}>
                {FEATURES.map((f, i) => (
                  <motion.button
                    key={i}
                    className={styles.dot}
                    animate={{ width: i === activeIdx ? 20 : 7, background: i === activeIdx ? active.color : 'rgba(255,255,255,0.2)' }}
                    transition={{ duration: 0.25 }}
                    onClick={() => setActiveIdx(i)}
                    aria-label={FEATURES[i].title}
                  />
                ))}
              </div>
              <button className={styles.navBtn} onClick={next} style={{ color: active.color }} aria-label="Siguiente">→</button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile — cards apiladas con swipe */}
      <div
        className={styles.mobileStack}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className={styles.stackInner}>
          {[...FEATURES].reverse().map((feat, ri) => {
            const idx = total - 1 - ri
            const s = getCardStyle(idx, activeIdx, total)
            const isActive = idx === activeIdx
            const Icon = feat.icon
            return (
              <motion.div
                key={feat.title}
                className={styles.stackCard}
                animate={{ rotate: s.rotate, scale: s.scale, y: s.y, x: s.x, opacity: s.opacity }}
                transition={SPRING}
                style={{
                  zIndex: s.zIndex,
                  borderColor: `${feat.color}${isActive ? '55' : '25'}`,
                  background: `linear-gradient(150deg, rgba(8,13,24,0.99) 0%, ${feat.color}10 100%)`,
                  boxShadow: isActive ? `0 24px 60px rgba(0,0,0,0.55), 0 0 36px ${feat.color}20` : '0 8px 24px rgba(0,0,0,0.3)',
                  cursor: isActive ? 'default' : 'pointer',
                }}
                onClick={() => !isActive && setActiveIdx(idx)}
              >
                <div className={styles.cardAccent} style={{ background: `linear-gradient(90deg, transparent, ${feat.color}${isActive ? 'aa' : '30'}, transparent)` }} />
                {isActive ? (
                  <motion.div className={styles.cardContent} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25, delay: 0.06 }}>
                    <div className={styles.cardHeader}>
                      <div className={styles.cardIcon} style={{ background: `${feat.color}15`, color: feat.color }}>
                        <Icon size={20} strokeWidth={1.8} />
                      </div>
                      <div className={styles.cardLabel} style={{ color: feat.color }}>{feat.title}</div>
                    </div>
                    <p className={styles.cardDesc}>{feat.desc}</p>
                  </motion.div>
                ) : (
                  <div className={styles.cardPlaceholder}>
                    <Icon size={22} strokeWidth={1.4} style={{ color: `${feat.color}70` }} />
                    <span style={{ color: `${feat.color}90`, fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{feat.title}</span>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

        <p className={styles.swipeHint}>← desliza →</p>
        <div className={styles.dots}>
          {FEATURES.map((f, i) => (
            <motion.button key={i} className={styles.dot}
              animate={{ width: i === activeIdx ? 20 : 7, background: i === activeIdx ? active.color : 'rgba(255,255,255,0.2)' }}
              transition={{ duration: 0.25 }}
              onClick={() => setActiveIdx(i)}
              aria-label={FEATURES[i].title}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
