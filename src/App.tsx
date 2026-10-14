import { useEffect } from 'react'
import { HashRouter, MemoryRouter, Route, Routes, useLocation } from 'react-router-dom'
import { Shell } from './components/Shell'
import { HomePage } from './pages/HomePage'
import { UnitPage } from './pages/UnitPage'
import { LessonPage } from './pages/LessonPage'
import { NotFound } from './pages/NotFound'

/**
 * Hash routing works on any static host (GitHub Pages, Netlify, a USB stick) with no server config.
 * The single-file preview build uses in-memory routing instead.
 */
const Router = import.meta.env.VITE_ROUTER === 'memory' ? MemoryRouter : HashRouter

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Shell>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/unit/:unitId" element={<UnitPage />} />
          <Route path="/unit/:unitId/:lessonId" element={<LessonPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Shell>
    </Router>
  )
}
