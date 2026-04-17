import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Home from './pages/Home/Home'
import AcademyPage from './pages/Academy/AcademyPage'
import PrivacidadPage from './pages/Privacidad/PrivacidadPage'
import BlogPage from './pages/Blog/BlogPage'
import ArticlePage from './pages/Blog/ArticlePage'

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/"            element={<Home />} />
          <Route path="/academy"     element={<AcademyPage />} />
          <Route path="/privacidad"  element={<PrivacidadPage />} />
          <Route path="/privacy"     element={<PrivacidadPage />} />
          <Route path="/blog"        element={<BlogPage />} />
          <Route path="/blog/:slug"  element={<ArticlePage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
