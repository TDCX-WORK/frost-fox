import { useRef, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "motion/react"
import { Link } from "react-router-dom"
import styles from "./Navbar.module.css"

const NAV_ITEMS = [
  { label: "Inicio", href: "/" },
  { label: "Soluciones", href: "/soluciones" },
  { label: "Academy", href: "/academy" },
  { label: "Talent", href: "/#talent" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Contacto", href: "/contacto" },
]

function DockItem({ label, href, mouseX }) {
  const ref = useRef(null)
  const [hovered, setHovered] = useState(false)

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  const widthT = useTransform(distance, [-120, 0, 120], [80, 130, 80])
  const yT     = useTransform(distance, [-120, 0, 120], [0, -10, 0])
  const fsT    = useTransform(distance, [-120, 0, 120], [13, 15.5, 13])
  const opT    = useTransform(distance, [-120, 0, 120], [0.55, 1, 0.55])

  const width   = useSpring(widthT, { mass: 0.1, stiffness: 180, damping: 14 })
  const y       = useSpring(yT,     { mass: 0.1, stiffness: 180, damping: 14 })
  const fs      = useSpring(fsT,    { mass: 0.1, stiffness: 180, damping: 14 })
  const opacity = useSpring(opT,    { mass: 0.1, stiffness: 180, damping: 14 })

  return (
    <motion.div
      ref={ref}
      style={{ width, y, fontSize: fs, opacity }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={styles.dockItem}
    >
      <Link to={href} className={styles.dockLink}>
        <motion.span
          animate={{ letterSpacing: hovered ? "0.06em" : "0.02em" }}
          transition={{ duration: 0.2 }}
          className={styles.dockLabel}
        >
          {label}
        </motion.span>
        <motion.div
          className={styles.dockDot}
          animate={{ opacity: hovered ? 1 : 0, scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
      </Link>
    </motion.div>
  )
}

export default function Navbar() {
  const mouseX = useMotionValue(Infinity)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className={styles.navWrapper}>
      <Link to="/" className={styles.logo}>
        <div className={styles.logoMark}>FF</div>
        <span className={styles.logoText}>
          frost<span className={styles.logoAccent}>fox</span>
        </span>
      </Link>

      {/* ── Desktop dock (unchanged) ── */}
      <motion.div
        className={styles.dockOuter}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
      >
        <div className={styles.dockBg}>
          {NAV_ITEMS.map((item) => (
            <DockItem key={item.label} mouseX={mouseX} {...item} />
          ))}
          <div className={styles.sep} />
          <motion.button
            className={styles.ctaBtn}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            Empezar →
          </motion.button>
        </div>
      </motion.div>

      {/* ── Mobile hamburger ── */}
      <button
        className={styles.burger}
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Menu"
      >
        <span className={`${styles.burgerLine} ${mobileOpen ? styles.burgerLineOpen1 : ""}`} />
        <span className={`${styles.burgerLine} ${mobileOpen ? styles.burgerLineOpen2 : ""}`} />
        <span className={`${styles.burgerLine} ${mobileOpen ? styles.burgerLineOpen3 : ""}`} />
      </button>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
              >
                <Link
                  to={item.href}
                  className={styles.mobileLink}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
            <motion.button
              className={styles.mobileCta}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              onClick={() => setMobileOpen(false)}
            >
              Empezar →
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
