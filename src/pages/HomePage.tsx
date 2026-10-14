import { Link } from 'react-router-dom'
import { UNITS, findLesson, findUnit } from '../content'
import { lessonCompletion, lessonKey, useProgress } from '../store/progress'
import { ProgressRing } from '../components/ProgressRing'

export function HomePage() {
  const lessons = useProgress((s) => s.lessons)
  const last = useProgress((s) => s.lastLesson)
  const lastUnit = findUnit(last?.unit)
  const lastLesson = findLesson(lastUnit, last?.lesson)

  return (
    <div className="page home">
      <section className="hero">
        <p className="eyebrow">Class 10 · Mathematics · English medium</p>
        <h1>Learn one lesson at a time, with tools you can touch.</h1>
        <p className="lede">
          Short explanations, interactive diagrams, worked examples you reveal step by step, and practice that checks your
          answers as you go.
        </p>
        {lastUnit && lastLesson && (
          <Link className="continue" to={`/unit/${lastUnit.id}/${lastLesson.id}`}>
            <span className="continue-label">Continue where you left off</span>
            <span className="continue-title">
              Unit {lastUnit.number} · Lesson {lastLesson.number}: {lastLesson.title}
            </span>
          </Link>
        )}
      </section>

      <section aria-labelledby="units-h">
        <h2 id="units-h" className="section-title">
          Units
        </h2>
        <ol className="unit-grid">
          {UNITS.map((u) => {
            const ready = u.lessons.filter((l) => l.status === 'ready')
            const available = ready.length > 0
            const completion =
              u.lessons.length > 0
                ? u.lessons.reduce((s, l) => s + lessonCompletion(lessons[lessonKey(u.id, l.id)], l), 0) / u.lessons.length
                : 0
            const body = (
              <>
                <div className="unit-num tabular">{String(u.number).padStart(2, '0')}</div>
                <div className="unit-body">
                  <h3>{u.title}</h3>
                  <p>{u.blurb}</p>
                  <p className="unit-meta">
                    {available ? `${ready.length} of ${u.lessons.length} lessons ready` : 'Coming soon'}
                  </p>
                </div>
                {available && <ProgressRing value={completion} />}
              </>
            )
            return (
              <li key={u.id}>
                {available ? (
                  <Link className="unit-card" to={`/unit/${u.id}`}>
                    {body}
                  </Link>
                ) : (
                  <div className="unit-card is-soon" aria-disabled="true">
                    {body}
                  </div>
                )}
              </li>
            )
          })}
        </ol>
      </section>
    </div>
  )
}
