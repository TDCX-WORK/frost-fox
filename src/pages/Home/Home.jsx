import { Helmet } from 'react-helmet-async'
import Navbar from "../../components/Navbar/Navbar"
import Hero from "./sections/Hero/Hero"
import Clients from "./sections/Clients/Clients"
import Services from "./sections/Services/Services"
import Academy from "./sections/Academy/Academy"
import Talent from "./sections/Talent/Talent"
import Nosotros from "./sections/Nosotros/Nosotros"
import Contacto from "./sections/Contacto/Contacto"
import Footer  from "./sections/Footer/Footer"

export default function Home() {
  return (
    <>
      <Helmet>
        <title>FrostFox · Soluciones digitales B2B para empresas</title>
        <meta name="description" content="FrostFox construye soluciones digitales modernas para empresas. Software a medida, plataformas SaaS y webs profesionales. Tecnología que impulsa resultados reales." />
        <link rel="canonical" href="https://thefrostfox.com/" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="FrostFox · Soluciones digitales B2B para empresas" />
        <meta property="og:description" content="FrostFox construye soluciones digitales modernas para empresas. Software a medida, plataformas SaaS y webs profesionales." />
        <meta property="og:url" content="https://thefrostfox.com/" />
        <meta property="og:image" content="https://thefrostfox.com/og-image.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FrostFox · Soluciones digitales B2B para empresas" />
        <meta name="twitter:description" content="FrostFox construye soluciones digitales modernas para empresas. Software a medida, plataformas SaaS y webs profesionales." />
        <meta name="twitter:image" content="https://thefrostfox.com/og-image.png" />
      </Helmet>

      <main>
        <Navbar />
        <Hero />
        <Clients />
        <Services />
        <Academy />
        <Talent />
        <Nosotros />
        <Contacto />
        <Footer />
      </main>
    </>
  )
}
