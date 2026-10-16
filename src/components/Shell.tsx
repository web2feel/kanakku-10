import { useEffect, useState, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { UNITS } from '../content'
import { overallCompletion, useProgress } from '../store/progress'
import { FormulaSheet } from './FormulaSheet'

export function Shell({ children }: { children: ReactNode }) {
  const [sheet, setSheet] = useState(false)
  const lessons = useProgress((s) => s.lessons)
  const { pathname } = useLocation()
  const pct = Math.round(overallCompletion(lessons, UNITS) * 100)

  useEffect(() => {
    if (!sheet) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSheet(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [sheet])

  return (
    <div className="shell">
      <header className="container site-header">
        <Link to="/" className="brand" aria-label="Kanakku home">
          <span className="brand-k" aria-hidden="true">
            K
          </span>
          <span className="brand-name">Kanakku</span>
          <span className="brand-pill">Class 10 Maths</span>
        </Link>
        <div className="header-actions">
          <Link to="/me" className={`btn-outline ${pathname === '/me' ? 'is-active' : ''}`}>
            <span className="pct-badge tabular">{pct}%</span>
            My progress
          </Link>
          <button className="btn-outline" onClick={() => setSheet(true)} aria-haspopup="dialog">
            <span aria-hidden="true">∑</span> Formula sheet
          </button>
        </div>
      </header>
      <main className="main">{children}</main>
      <footer className="site-footer">
        <div className="container footer-inner">
          <p>
            Based on the Tamil Nadu State Board Class 10 Mathematics textbook. Explanations, diagrams and tools are
            original.
          </p>
          <span className="hand-note footer-note">made with chalk &amp; curiosity</span>
        </div>
      </footer>
      <FormulaSheet open={sheet} onClose={() => setSheet(false)} />
    </div>
  )
}
