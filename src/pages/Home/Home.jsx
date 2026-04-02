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
  )
}
