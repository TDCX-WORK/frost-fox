import { motion } from "motion/react"
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern"
import styles from "./Footer.module.css"

const LINKS = {
  "Servicios": ["WebDev", "Academy", "Talent"],
  "Empresa":   ["Nosotros", "Contacto", "Blog"],
  "Legal":     ["Privacidad", "Cookies", "Términos"],
}

export default function Footer() {
  return (
    <footer className={styles.footer}>

      <AnimatedGridPattern
        numSquares={28}
        maxOpacity={0.1}
        duration={4}
        repeatDelay={1}
        className={styles.grid}
      />

      {/* Línea top */}
      <div className={styles.topLine} />

      <div className={styles.inner}>

        {/* Brand */}
        <motion.div
          className={styles.brand}
          initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:0.6 }}
        >
          <div className={styles.logoMark}>FF</div>
          <span className={styles.logoText}>
            frost<span className={styles.logoAccent}>fox</span>
          </span>
          <p className={styles.brandTag}>
            Digitalizar negocios.<br />Potenciar talento.
          </p>
        </motion.div>

        {/* Links */}
        {Object.entries(LINKS).map(([section, items], si) => (
          <motion.div
            key={section}
            className={styles.linkGroup}
            initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.5, delay: si * 0.08 }}
          >
            <span className={styles.linkGroupTitle}>{section}</span>
            {items.map(item => (
              <a key={item} href="#" className={styles.link}>{item}</a>
            ))}
          </motion.div>
        ))}

      </div>

      {/* Bottom bar */}
      <div className={styles.bottomBar}>
        <span className={styles.copy}>© {new Date().getFullYear()} FrostFox. Todos los derechos reservados.</span>
        <span className={styles.copy}>Hecho con ♥ en España</span>
      </div>

    </footer>
  )
}
