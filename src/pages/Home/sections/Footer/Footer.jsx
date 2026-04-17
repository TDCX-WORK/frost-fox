import { motion } from "motion/react"
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern"
import { MessageCircle, Mail, Phone } from "lucide-react"
import styles from "./Footer.module.css"

const PHONE_RAW  = "34641747308"
const PHONE_SHOW = "+34 641 74 73 08"
const EMAIL      = "frostfoxlabs@gmail.com"
const WA_URL     = `https://wa.me/${PHONE_RAW}?text=${encodeURIComponent("Hola FrostFox, me gustaría obtener más información sobre vuestros servicios.")}`

const LINKS = {
  "Servicios": [
    { label: "WebDev",           href: "/#servicios" },
    { label: "Academy",          href: "/academy"    },
    { label: "Talent",           href: "/#talent"    },
    { label: "Consultoría & IA", href: "/#servicios" },
  ],
  "Empresa": [
    { label: "Nosotros",  href: "/#nosotros" },
    { label: "Contacto",  href: "/#contacto" },
    { label: "Blog",      href: "/blog"      },
  ],
  "Legal": [
    { label: "Política de Privacidad", href: "/privacidad"  },
    { label: "Política de Cookies",    href: "/cookies"     },
    { label: "Aviso Legal",            href: "/aviso-legal" },
    { label: "RGPD",                   href: "/privacidad"  },
  ],
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

      <div className={styles.topLine} />

      <div className={styles.inner}>

        {/* Brand + contacto */}
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
          <div className={styles.contactBlock}>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className={styles.contactItem}>
              <MessageCircle size={13} strokeWidth={2} className={styles.iconWa} />
              <span>{PHONE_SHOW} · WhatsApp</span>
            </a>
            <a href={`mailto:${EMAIL}`} className={styles.contactItem}>
              <Mail size={13} strokeWidth={2} className={styles.iconBlue} />
              <span>{EMAIL}</span>
            </a>
            <a href={`tel:+${PHONE_RAW}`} className={styles.contactItem}>
              <Phone size={13} strokeWidth={2} className={styles.iconBlue} />
              <span>{PHONE_SHOW}</span>
            </a>
          </div>
          <p className={styles.sede}>España · Operamos en remoto en toda la UE</p>
        </motion.div>

        {/* Link groups */}
        {Object.entries(LINKS).map(([section, items], si) => (
          <motion.div
            key={section}
            className={styles.linkGroup}
            initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.5, delay: si * 0.08 }}
          >
            <span className={styles.linkGroupTitle}>{section}</span>
            {items.map(item => (
              <a key={item.label} href={item.href} className={styles.link}>{item.label}</a>
            ))}
          </motion.div>
        ))}

      </div>

      {/* RGPD notice */}
      <div className={styles.rgpdBar}>
        <p className={styles.rgpdText}>
          🔒 Tus datos están protegidos conforme al <strong>RGPD (UE) 2016/679</strong> y la{" "}
          <strong>LOPDGDD (Ley Orgánica 3/2018)</strong>. FrostFox trata tus datos únicamente
          para atender consultas y no los cede a terceros.{" "}
          <a href="/privacidad" className={styles.rgpdLink}>Más información →</a>
        </p>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottomBar}>
        <span className={styles.copy}>© {new Date().getFullYear()} FrostFox Labs S.L. Todos los derechos reservados.</span>
        <div className={styles.bottomLinks}>
          <a href="/privacidad"  className={styles.bottomLink}>Privacidad</a>
          <span className={styles.bottomSep}>·</span>
          <a href="/cookies"     className={styles.bottomLink}>Cookies</a>
          <span className={styles.bottomSep}>·</span>
          <a href="/aviso-legal" className={styles.bottomLink}>Aviso Legal</a>
        </div>
        <span className={styles.copy}>Hecho con ♥ en España</span>
      </div>

    </footer>
  )
}
