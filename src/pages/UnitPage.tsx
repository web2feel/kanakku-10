import { Link, useParams } from 'react-router-dom'
import { findUnit } from '../content'
import { lessonCompletion, lessonKey, useProgress } from '../store/progress'
import { ProgressRing } from '../components/ProgressRing'
import { NotFound } from './NotFound'

export function UnitPage() {
  const { unitId } = useParams()
  const unit = findUnit(unitId)
  const lessons = useProgress((s) => s.lessons)
  if (!unit) return <NotFound />

  return (
    <div className="page unit">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/">Units</Link> <span aria-hidden="true">/</span> <span>Unit {unit.number}</span>
      </nav>
      <header className="unit-head">
        <p className="eyebrow">
          Unit {unit.number} · Textbook pages {unit.pages}
        </p>
        <h1>{unit.title}</h1>
        <p className="lede">{unit.blurb}</p>
      </header>

      <ol className="lesson-list">
        {unit.lessons.map((l) => {
          const ready = l.status === 'ready'
          const body = (
            <>
              <span className="lesson-num tabular">{l.number}</span>
              <span className="lesson-text">
                <span className="lesson-title">{l.title}</span>
                <span className="lesson-summary">{l.summary}</span>
                <span className="lesson-meta">
                  Pages {l.pages}
                  {ready
                    ? ` · ${l.examples.length} examples · ${l.practice.length} practice questions`
                    : ' · Coming soon'}
                </span>
              </span>
              {ready && <ProgressRing value={lessonCompletion(lessons[lessonKey(unit.id, l.id)], l)} />}
            </>
          )
          return (
            <li key={l.id}>
              {ready ? (
                <Link className="lesson-row" to={`/unit/${unit.id}/${l.id}`}>
                  {body}
                </Link>
              ) : (
                <div className="lesson-row is-soon">{body}</div>
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
