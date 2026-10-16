import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import type { Lesson, Unit } from '../content/types'
import { lessonCompletion, lessonKey, useProgress } from '../store/progress'

/** The slim rail of lesson numbers beside the lesson. Hover or focus a number to see its title. */
export function LessonRail({ unit, current, onOpenAll }: { unit: Unit; current: Lesson; onOpenAll: () => void }) {
  const lessons = useProgress((s) => s.lessons)
  return (
    <nav className="lesson-rail" aria-label={`Lessons in ${unit.title}`}>
      <button className="rail-all" onClick={onOpenAll} aria-haspopup="dialog" title="All lessons">
        <span aria-hidden="true">☰</span>
        <span className="rail-tip">All lessons</span>
      </button>
      <ol>
        {unit.lessons.map((l) => {
          const ready = l.status === 'ready'
          const pct = Math.round(lessonCompletion(lessons[lessonKey(unit.id, l.id)], l) * 100)
          const isCurrent = l.id === current.id
          const ring = ready && !isCurrent ? { '--pct': `${pct * 3.6}deg` } : undefined
          const tip = (
            <span className="rail-tip">
              <b>{l.title}</b>
              <span>{ready ? `${pct}% done` : 'Coming soon'}</span>
            </span>
          )
          return (
            <li key={l.id}>
              {ready ? (
                <Link
                  to={`/unit/${unit.id}/${l.id}`}
                  className={`rail-dot ${isCurrent ? 'is-current' : ''} ${pct > 0 ? 'is-started' : ''}`}
                  style={ring as React.CSSProperties}
                  aria-current={isCurrent ? 'page' : undefined}
                  aria-label={`Lesson ${l.number}: ${l.title}, ${pct}% done`}
                >
                  <span className="rail-num tabular">{l.number}</span>
                  {tip}
                </Link>
              ) : (
                <span className="rail-dot is-soon" aria-label={`Lesson ${l.number}: ${l.title}, coming soon`}>
                  <span className="rail-num tabular">{l.number}</span>
                  {tip}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

/** Full lesson list in a drawer from the left: used from the rail and on tablets and phones. */
export function LessonsDrawer({
  unit,
  current,
  open,
  onClose,
}: {
  unit: Unit
  current: Lesson
  open: boolean
  onClose: () => void
}) {
  const lessons = useProgress((s) => s.lessons)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="sheet-backdrop"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.aside
            className="lessons-drawer"
            role="dialog"
            aria-modal="true"
            aria-label={`Lessons in ${unit.title}`}
            initial={reduce ? { opacity: 0 } : { x: '-100%' }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: '-100%' }}
            transition={{ type: 'tween', duration: 0.22 }}
          >
            <div className="drawer-head">
              <Link to={`/unit/${unit.id}`} className="side-unit" onClick={onClose}>
                <span className="side-unit-label">Unit {unit.number}</span>
                <span className="side-unit-title">{unit.title}</span>
              </Link>
              <button className="btn-outline sheet-close" onClick={onClose} autoFocus>
                Close
              </button>
            </div>
            <ol className="side-list drawer-list">
              {unit.lessons.map((l) => {
                const ready = l.status === 'ready'
                const cls = `side-item ${l.id === current.id ? 'is-current' : ''} ${ready ? '' : 'is-soon'}`
                const pct = Math.round(lessonCompletion(lessons[lessonKey(unit.id, l.id)], l) * 100)
                return (
                  <li key={l.id}>
                    {ready ? (
                      <Link
                        className={cls}
                        to={`/unit/${unit.id}/${l.id}`}
                        onClick={onClose}
                        aria-current={l.id === current.id ? 'page' : undefined}
                      >
                        <span className="side-num tabular">{l.number}</span>
                        <span className="side-title">{l.title}</span>
                        <span className="side-pct tabular">{pct}%</span>
                      </Link>
                    ) : (
                      <span className={cls}>
                        <span className="side-num tabular">{l.number}</span>
                        <span className="side-title">{l.title}</span>
                        <span className="side-pct">soon</span>
                      </span>
                    )}
                  </li>
                )
              })}
            </ol>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
