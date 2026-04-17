import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'motion/react'
import { Clock, ArrowRight, BookOpen } from 'lucide-react'
import { POSTS, formatDate } from '../../data/blog'
import styles from './BlogPage.module.css'

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title>Blog · FrostFox — Recursos para academias de oposiciones</title>
        <meta name="description" content="Guías, comparativas y recursos para directores y profesores de academias de oposiciones. Todo lo que necesitas saber para digitalizar y gestionar mejor tu academia." />
        <link rel="canonical" href="https://thefrostfox.com/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Blog · FrostFox — Recursos para academias de oposiciones" />
        <meta property="og:description" content="Guías, comparativas y recursos para directores y profesores de academias de oposiciones." />
        <meta property="og:url" content="https://thefrostfox.com/blog" />
        <meta property="og:image" content="https://thefrostfox.com/og-image.png" />
      </Helmet>

      <div className={styles.page}>

        {/* ── Nav mínimo ── */}
        <nav className={styles.nav}>
          <Link to="/" className={styles.navLogo}>
            frost<span className={styles.navAccent}>fox</span>
          </Link>
          <Link to="/academy" className={styles.navLink}>Academy →</Link>
        </nav>

        {/* ── Header ── */}
        <header className={styles.header}>
          <div className={styles.headerGlow} />
          <motion.div
            className={styles.headerInner}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.headerBadge}>
              <BookOpen size={13} strokeWidth={2} />
              <span>Blog FrostFox</span>
            </div>
            <h1 className={styles.headerTitle}>
              Recursos para academias<br />
              <span className={styles.headerAccent}>de oposiciones</span>
            </h1>
            <p className={styles.headerSub}>
              Guías prácticas, comparativas y estrategias para directores y profesores que quieren gestionar mejor su academia.
            </p>
          </motion.div>
        </header>

        {/* ── Grid de artículos ── */}
        <main className={styles.main}>
          <div className={styles.grid}>
            {POSTS.map((post, i) => (
              <motion.article
                key={post.slug}
                className={styles.card}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className={styles.cardGlow} style={{ background: post.categoryColor }} />
                <div className={styles.cardInner}>
                  <div className={styles.cardMeta}>
                    <span className={styles.cardCategory} style={{ color: post.categoryColor, borderColor: `${post.categoryColor}40`, background: `${post.categoryColor}10` }}>
                      {post.category}
                    </span>
                    <span className={styles.cardDate}>{formatDate(post.date)}</span>
                  </div>
                  <h2 className={styles.cardTitle}>{post.title}</h2>
                  <p className={styles.cardDesc}>{post.description}</p>
                  <div className={styles.cardFooter}>
                    <span className={styles.cardRead}>
                      <Clock size={12} strokeWidth={2} />
                      {post.readTime} de lectura
                    </span>
                    <Link to={`/blog/${post.slug}`} className={styles.cardLink} style={{ color: post.categoryColor }}>
                      Leer artículo <ArrowRight size={14} strokeWidth={2} />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Próximamente si solo hay 1 artículo */}
          {POSTS.length < 3 && (
            <motion.div
              className={styles.coming}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className={styles.comingDots}>
                <span /><span /><span />
              </div>
              <p className={styles.comingText}>Nuevos artículos cada mes</p>
            </motion.div>
          )}
        </main>

        {/* ── Footer mínimo ── */}
        <footer className={styles.footer}>
          <Link to="/" className={styles.footerLink}>← Volver a thefrostfox.com</Link>
          <span className={styles.footerCopy}>© {new Date().getFullYear()} FrostFox Labs S.L.</span>
        </footer>

      </div>
    </>
  )
}
