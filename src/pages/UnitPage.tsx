import { Link, useParams } from 'react-router-dom'
import { findUnit } from '../content'
import { lessonCompletion, lessonKey, useProgress } from '../store/progress'
import { Meter } from '../components/Meter'
import { NotFound } from './NotFound'

export function UnitPage() {
  const { unitId } = useParams()
  const unit = findUnit(unitId)
  const lessons = useProgress((s) => s.lessons)
  if (!unit) return <NotFound />

  return (
    <div className="container unit-page">
      <header className="page-head">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/">Units</Link>
          <span aria-hidden="true">/</span>
          <span>
            Unit {unit.number} · Pages {unit.pages}
          </span>
        </nav>
        <h1 className="page-h1">{unit.title}</h1>
        <p className="intro">{unit.blurb}</p>
      </header>

      <ol className="lesson-list">
        {unit.lessons.map((l) => {
          if (l.status !== 'ready') {
            return (
              <li key={l.id}>
                <div className="lesson-row is-soon">
                  <span className="lesson-n">{l.number}</span>
                  <span className="lesson-text">
                    <span className="lesson-title">{l.title}</span>
                    <span className="lesson-summary">{l.summary}</span>
                    <span className="lesson-pages">Pages {l.pages}</span>
                  </span>
                  <span className="pill pill-soon">Coming soon</span>
                </div>
              </li>
            )
          }
          const pct = Math.round(lessonCompletion(lessons[lessonKey(unit.id, l.id)], l) * 100)
          return (
            <li key={l.id}>
              <Link className="lesson-row is-ready" to={`/unit/${unit.id}/${l.id}`}>
                <span className="lesson-n">{l.number}</span>
                <span className="lesson-text">
                  <span className="lesson-title">{l.title}</span>
                  <span className="lesson-summary">{l.summary}</span>
                  <span className="meta-chips">
                    <span>Pages {l.pages}</span>
                    <span>{l.examples.length} examples</span>
                    <span>{l.practice.length} practice questions</span>
                  </span>
                </span>
                <span className="lesson-progress">
                  <span className="done tabular">{pct}% done</span>
                  <Meter value={pct / 100} label={`${l.title} progress`} text={null} />
                  <span className="go">{pct > 0 ? 'Continue' : 'Start'} →</span>
                </span>
              </Link>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
