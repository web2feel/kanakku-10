import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { FormulaSheet } from './FormulaSheet'

export function Shell({ children }: { children: ReactNode }) {
  const [sheet, setSheet] = useState(false)

  useEffect(() => {
    if (!sheet) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSheet(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [sheet])

  return (
    <div className="shell">
      <header className="topbar">
        <div className="container topbar-inner">
          <Link to="/" className="brand">
            <svg viewBox="0 0 32 32" aria-hidden="true" className="brand-mark">
              <defs>
                <linearGradient id="brand-gradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#b845ed" />
                  <stop offset="0.5" stopColor="#f041ff" />
                  <stop offset="1" stopColor="#3245ff" />
                </linearGradient>
              </defs>
              <path d="M5 27 L27 27 L5 7 Z" className="brand-tri" />
              <path d="M5 23 h4 v4" className="brand-right" />
              <path d="M27 27 A 9 9 0 0 0 20.5 20.6" className="brand-arc" />
            </svg>
            <span className="brand-text">
              <span className="brand-name">Kanakku</span>
              <span className="brand-sub">Class 10 Maths</span>
            </span>
          </Link>
          <button className="btn-sheet" onClick={() => setSheet(true)} aria-haspopup="dialog">
            <span aria-hidden="true">∑</span> Formula sheet
          </button>
        </div>
      </header>
      <main className="main">{children}</main>
      <footer className="footer">
        <div className="container">
          Based on the Tamil Nadu State Board Class 10 Mathematics textbook. Explanations, diagrams and tools are
          original.
        </div>
      </footer>
      <FormulaSheet open={sheet} onClose={() => setSheet(false)} />
    </div>
  )
}
