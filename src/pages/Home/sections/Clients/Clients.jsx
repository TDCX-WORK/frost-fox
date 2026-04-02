import { motion } from "motion/react"
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern"
import styles from "./Clients.module.css"

const CLIENTS = [
  { name: "Accenture",   sector: "Consultoría" },
  { name: "Deloitte",    sector: "Auditoría" },
  { name: "Iberdrola",   sector: "Energía" },
  { name: "Santander",   sector: "Banca" },
  { name: "Telefónica",  sector: "Telecomunicaciones" },
  { name: "BBVA",        sector: "Banca" },
  { name: "Mapfre",      sector: "Seguros" },
  { name: "Repsol",      sector: "Energía" },
]

export default function Clients() {
  return (
    <section className={styles.section}>

      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.12}
        duration={3}
        repeatDelay={1}
        className={styles.gridPattern}
      />

      <div className={styles.inner}>

        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.pill}>Clientes</span>
          <h2 className={styles.title}>
            Empresas que ya<br />
            <span className={styles.titleAccent}>confían en nosotros</span>
          </h2>
          <p className={styles.subtitle}>
            Trabajamos con empresas de todos los sectores para transformar
            sus procesos y acelerar su crecimiento digital.
          </p>
        </motion.div>

        {/* Marquee — sin motion.div para evitar conflictos con clones */}
        <div className={styles.marqueeWrapper}>
          <div className={styles.marqueeTrack}>
            {[...CLIENTS, ...CLIENTS].map((client, i) => (
              <div key={i} style={{ position: "relative", borderRadius: "16px", flexShrink: 0, overflow: "hidden", padding: "1.5px", background: "#fff" }}>
                <div className={styles.shineBorder} />
                <div className={styles.card}>
                  <span className={styles.cardInitial}>{client.name.charAt(0)}</span>
                  <div className={styles.cardInfo}>
                    <span className={styles.cardName}>{client.name}</span>
                    <span className={styles.cardSector}>{client.sector}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
