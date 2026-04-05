import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import AcademyPage from './pages/Academy/AcademyPage'
import PrivacidadPage from './pages/Privacidad/PrivacidadPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"           element={<Home />} />
        <Route path="/academy"    element={<AcademyPage />} />
        <Route path="/privacidad" element={<PrivacidadPage />} />
        {/* Alias por si acaso */}
        <Route path="/privacy"    element={<PrivacidadPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
