// ─────────────────────────────────────────────────────────────
// src/data/blog.js
// Para añadir un artículo nuevo: copia el objeto, cambia el slug
// y rellena el contenido. Luego haz deploy.
// ─────────────────────────────────────────────────────────────

export const POSTS = [
  {
    slug: 'cuanto-cuesta-digitalizar-una-academia-de-oposiciones',
    title: 'Cuánto cuesta digitalizar una academia de oposiciones en 2025',
    description: 'Desglose real de costes: software, migración, formación y mantenimiento. Lo que nadie te cuenta antes de firmar.',
    category: 'Intención de compra',
    categoryColor: '#5de4ff',
    date: '2026-04-08',
    readTime: '7 min',
    keywords: ['precio software academia', 'coste digitalizar academia', 'software academia oposiciones'],
    content: [
      {
        type: 'intro',
        text: 'Digitalizar una academia de oposiciones es una de las mejores decisiones que puedes tomar para escalar tu negocio. Pero antes de firmar con cualquier plataforma, conviene saber exactamente qué vas a pagar — y qué no te van a contar en la demo.',
      },
      {
        type: 'h2',
        text: 'Los tres bloques de coste que toda academia debe conocer',
      },
      {
        type: 'p',
        text: 'El precio de digitalizar una academia no es solo la cuota mensual del software. Hay tres bloques que debes considerar: el coste de la plataforma, el coste de la migración del temario y el coste de adaptación del equipo.',
      },
      {
        type: 'h2',
        text: '1. El software: cuota mensual y alta inicial',
      },
      {
        type: 'p',
        text: 'La mayoría de plataformas SaaS para academias cobran una cuota mensual según el número de alumnos. El rango habitual en España está entre 50 € y 300 €/mes dependiendo de funcionalidades y capacidad.',
      },
      {
        type: 'p',
        text: 'Además de la cuota mensual, muchas plataformas cobran un alta inicial que cubre la configuración y migración. Este importe suele estar entre 149 € y 500 €. En FrostFox Academy el alta es de 149 € e incluye la migración completa del temario, la configuración de usuarios y la sesión de onboarding.',
      },
      {
        type: 'table',
        headers: ['Plan', 'Alumnos', 'Cuota mensual', 'Alta única'],
        rows: [
          ['Starter', 'Hasta 30', '69 €/mes', '149 €'],
          ['Growth', 'Hasta 60', '109 €/mes', '149 €'],
          ['Academy', 'Hasta 100', '169 €/mes', '149 €'],
          ['Pro', 'Ilimitados', '249 €/mes', '149 €'],
        ],
        note: 'Precios sin IVA. FrostFox Academy — actualizado abril 2026.',
      },
      {
        type: 'h2',
        text: '2. La migración del temario: el coste que más sorprende',
      },
      {
        type: 'p',
        text: 'Si llevas años preparando oposiciones, tienes un temario propio — PDFs, apuntes escaneados, preguntas sueltas en Word. Convertir eso en un banco de preguntas estructurado es trabajo real.',
      },
      {
        type: 'p',
        text: 'Algunas plataformas te dan las herramientas y tú lo haces. Eso implica entre 20 y 80 horas de trabajo interno dependiendo del volumen. Si lo externalizas, el coste puede ir de 300 € a 1.500 €.',
      },
      {
        type: 'p',
        text: 'En FrostFox Academy la migración está incluida en el alta: te pasas el programa oficial y nosotros lo convertimos en bloques, temas y más de 700 preguntas estructuradas con respuestas y explicaciones. Sin coste adicional, en 48 horas.',
      },
      {
        type: 'h2',
        text: '3. La formación del equipo: el coste invisible',
      },
      {
        type: 'p',
        text: 'Cualquier herramienta nueva tiene una curva de aprendizaje. Profesores que no saben usar el banco de preguntas, directores que no entienden el panel de datos, alumnos que se pierden. Cada hora perdida en formación es una hora que no se dedica a enseñar.',
      },
      {
        type: 'p',
        text: 'La mejor forma de minimizar este coste es elegir una plataforma diseñada para no tener curva de aprendizaje — y exigir que el onboarding esté incluido en el precio, no como servicio aparte.',
      },
      {
        type: 'h2',
        text: 'Resumen: cuánto cuesta realmente digitalizar tu academia',
      },
      {
        type: 'p',
        text: 'Para una academia mediana de oposiciones en España, el coste real del primer año está entre 1.000 € y 3.500 € dependiendo de la plataforma elegida, el volumen del temario y si la migración está incluida o no.',
      },
      {
        type: 'p',
        text: 'Con FrostFox Academy el primer año sale a menos de 1.100 € en el plan Starter (149 € de alta + 69 €/mes × 12) con migración, onboarding y soporte incluidos. Y con garantía de 30 días: si no ves valor demostrable, te devolvemos el alta.',
      },
      {
        type: 'cta',
        text: '¿Quieres saber cuánto costaría para tu academia en concreto?',
        label: 'Solicitar demo gratuita',
        href: 'https://wa.me/34641747308?text=Hola%20FrostFox%2C%20me%20gustar%C3%ADa%20solicitar%20una%20demo%20gratuita%20de%20FrostFox%20Academy.',
      },
    ],
  },
]

// Helper para buscar un post por slug
export function getPostBySlug(slug) {
  return POSTS.find(p => p.slug === slug) || null
}

// Helper para formatear fecha en español
export function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
}
