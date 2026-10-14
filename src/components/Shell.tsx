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
        <div className="topbar-inner">
          <Link to="/" className="brand">
            <svg viewBox="0 0 32 32" aria-hidden="true" className="brand-mark">
              <path d="M5 27 L27 27 L5 7 Z" />
              <path d="M5 23 h4 v4" className="brand-right" />
              <path d="M27 27 A 9 9 0 0 0 20.5 20.6" className="brand-arc" />
            </svg>
            <span className="brand-text">
              <span className="brand-name">Kanakku</span>
              <span className="brand-sub">Class 10 Maths · TN State Board</span>
            </span>
          </Link>
          <button className="btn btn-sheet" onClick={() => setSheet(true)} aria-haspopup="dialog">
            <span aria-hidden="true">∑</span> Formula sheet
          </button>
        </div>
      </header>
      <main className="main">{children}</main>
      <footer className="footer">
        Based on the Tamil Nadu State Board Class 10 Mathematics textbook. Explanations, diagrams and tools are original.
      </footer>
      <FormulaSheet open={sheet} onClose={() => setSheet(false)} />
    </div>
  )
}
