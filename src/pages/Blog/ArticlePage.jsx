import { useParams, Link, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'motion/react'
import { Clock, ArrowLeft, ArrowRight } from 'lucide-react'
import { getPostBySlug, formatDate } from '../../data/blog'
import styles from './ArticlePage.module.css'

// ── Renderiza cada bloque de contenido ──────────────────────
function Block({ block }) {
  switch (block.type) {
    case 'intro':
      return <p className={styles.intro}>{block.text}</p>

    case 'h2':
      return <h2 className={styles.h2}>{block.text}</h2>

    case 'h3':
      return <h3 className={styles.h3}>{block.text}</h3>

    case 'p':
      return <p className={styles.p}>{block.text}</p>

    case 'ul':
      return (
        <ul className={styles.ul}>
          {block.items.map((item, i) => (
            <li key={i} className={styles.li}>{item}</li>
          ))}
        </ul>
      )

    case 'table':
      return (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                {block.headers.map((h, i) => (
                  <th key={i} className={styles.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className={styles.tr}>
                  {row.map((cell, j) => (
                    <td key={j} className={styles.td}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {block.note && <p className={styles.tableNote}>{block.note}</p>}
        </div>
      )

    case 'cta':
      return (
        <div className={styles.ctaBlock}>
          <p className={styles.ctaText}>{block.text}</p>
          <a href={block.href} target="_blank" rel="noopener noreferrer" className={styles.ctaBtn}>
            {block.label} <ArrowRight size={15} strokeWidth={2} />
          </a>
        </div>
      )

    default:
      return null
  }
}

export default function ArticlePage() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)

  if (!post) return <Navigate to="/blog" replace />

  const schemaArticle = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: 'FrostFox',
      url: 'https://thefrostfox.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'FrostFox',
      url: 'https://thefrostfox.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://thefrostfox.com/og-image.png',
      },
    },
    mainEntityOfPage: `https://thefrostfox.com/blog/${post.slug}`,
  }

  return (
    <>
      <Helmet>
        <title>{post.title} · FrostFox Blog</title>
        <meta name="description" content={post.description} />
        <meta name="keywords" content={post.keywords.join(', ')} />
        <link rel="canonical" href={`https://thefrostfox.com/blog/${post.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:url" content={`https://thefrostfox.com/blog/${post.slug}`} />
        <meta property="og:image" content="https://thefrostfox.com/og-image.png" />
        <meta property="article:published_time" content={post.date} />
        <script type="application/ld+json">{JSON.stringify(schemaArticle)}</script>
      </Helmet>

      <div className={styles.page}>

        {/* ── Nav ── */}
        <nav className={styles.nav}>
          <Link to="/" className={styles.navLogo}>
            frost<span className={styles.navAccent}>fox</span>
          </Link>
          <Link to="/blog" className={styles.navBack}>
            <ArrowLeft size={14} strokeWidth={2} /> Blog
          </Link>
        </nav>

        {/* ── Article ── */}
        <main className={styles.main}>
          <motion.article
            className={styles.article}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header del artículo */}
            <header className={styles.articleHeader}>
              <div className={styles.articleMeta}>
                <span
                  className={styles.articleCategory}
                  style={{ color: post.categoryColor, borderColor: `${post.categoryColor}40`, background: `${post.categoryColor}10` }}
                >
                  {post.category}
                </span>
                <span className={styles.articleDate}>{formatDate(post.date)}</span>
                <span className={styles.articleRead}>
                  <Clock size={12} strokeWidth={2} />
                  {post.readTime}
                </span>
              </div>

              <h1 className={styles.articleTitle}>{post.title}</h1>
              <p className={styles.articleDesc}>{post.description}</p>

              <div className={styles.articleDivider} style={{ background: `linear-gradient(90deg, ${post.categoryColor}, transparent)` }} />
            </header>

            {/* Contenido */}
            <div className={styles.content}>
              {post.content.map((block, i) => (
                <Block key={i} block={block} />
              ))}
            </div>

          </motion.article>

          {/* ── Volver al blog ── */}
          <div className={styles.backWrap}>
            <Link to="/blog" className={styles.backLink}>
              <ArrowLeft size={15} strokeWidth={2} /> Volver al blog
            </Link>
          </div>
        </main>

        {/* ── Footer mínimo ── */}
        <footer className={styles.footer}>
          <Link to="/" className={styles.footerLink}>← thefrostfox.com</Link>
          <span className={styles.footerCopy}>© {new Date().getFullYear()} FrostFox Labs S.L.</span>
        </footer>

      </div>
    </>
  )
}
