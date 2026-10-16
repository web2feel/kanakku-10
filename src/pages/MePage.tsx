import { useState } from 'react'
import { Link } from 'react-router-dom'
import { UNITS, findLesson, findUnit } from '../content'
import { TABS, lessonCompletion, lessonKey, unitCompletion, useProgress } from '../store/progress'
import { Meter } from '../components/Meter'

/**
 * My progress. Reads the progress saved in this browser.
 * The weekly leaderboard and nickname need sign-in and a backend; until then a placeholder card says so.
 */
export function MePage() {
  const lessons = useProgress((s) => s.lessons)
  const last = useProgress((s) => s.lastLesson)
  const reset = useProgress((s) => s.reset)
  const [confirming, setConfirming] = useState(false)
  const [cleared, setCleared] = useState(false)

  const unit = UNITS.find((u) => u.lessons.some((l) => l.status === 'ready'))
  const lastUnit = findUnit(last?.unit)
  const lastLesson = findLesson(lastUnit, last?.lesson)

  const started = UNITS.flatMap((u) =>
    u.lessons
      .filter((l) => l.status === 'ready' && lessons[lessonKey(u.id, l.id)])
      .map((l) => ({ unit: u, lesson: l, lp: lessons[lessonKey(u.id, l.id)]! })),
  )

  const pct = unit ? Math.round(unitCompletion(lessons, unit) * 100) : 0
  const startedInUnit = unit ? started.filter((s) => s.unit.id === unit.id).length : 0

  return (
    <div className="container me-page">
      <header className="page-head">
        <h1 className="me-h1">Your progress</h1>
        <p className="intro">Saved in this browser, on this device.</p>
      </header>

      <div className="me-top">
        {unit && (
          <div className="overall-card">
            <div
              className="ring"
              style={{ background: `conic-gradient(var(--color-mint) ${pct * 3.6}deg, #fff 0)` }}
              role="img"
              aria-label={`${pct}% of ${unit.title} complete`}
            >
              <div className="ring-inner tabular">{pct}%</div>
            </div>
            <div className="overall-text">
              <span className="unit-num">Unit {unit.number}</span>
              <h2>{unit.title}</h2>
              <p>
                {startedInUnit} of {unit.lessons.length} lessons started
              </p>
            </div>
          </div>
        )}
        {lastUnit && lastLesson ? (
          <div className="pickup-card">
            <span className="hand-note">pick up where you left off</span>
            <span className="title">
              Lesson {lastLesson.number} · {lastLesson.title}
            </span>
            <Link className="go" to={`/unit/${lastUnit.id}/${lastLesson.id}`}>
              Continue →
            </Link>
          </div>
        ) : (
          unit && (
            <div className="pickup-card">
              <span className="hand-note">start here</span>
              <span className="title">{unit.lessons[0].title}</span>
              <Link className="go" to={`/unit/${unit.id}/${unit.lessons[0].id}`}>
                Open lesson 1 →
              </Link>
            </div>
          )
        )}
      </div>

      <section className="soon-card" aria-labelledby="lb-h">
        <span className="hand-note">coming soon</span>
        <h2 id="lb-h">Weekly leaderboard</h2>
        <p>
          Sign in with Google to keep your progress on every device and see where you stand this week. Points: 10 for
          each practice question solved, 5 for each correct quiz answer.
        </p>
      </section>

      <section className="me-section" aria-labelledby="lbl-h">
        <div className="me-section-head">
          <h2 id="lbl-h">Lesson by lesson</h2>
          <span>Reading counts 20%, practice 40%, quiz 40%.</span>
        </div>
        {started.length === 0 ? (
          <div className="empty-card">
            <p>
              {cleared ? 'Progress cleared. ' : ''}No lessons started yet. Open a lesson and your progress shows up
              here.
            </p>
            {unit && (
              <Link className="btn-primary btn-sm" to={`/unit/${unit.id}`}>
                Go to {unit.title} →
              </Link>
            )}
          </div>
        ) : (
          started.map(({ unit: u, lesson: l, lp }) => {
            const lpct = Math.round(lessonCompletion(lp, l) * 100)
            const solved = l.practice.filter((q) => lp.practice[q.id] === 'correct').length
            return (
              <article key={`${u.id}/${l.id}`} className="lesson-stat-card">
                <div className="lesson-stat-head">
                  <Link className="lesson-stat-title" to={`/unit/${u.id}/${l.id}`}>
                    <span className="lesson-n">{l.number}</span>
                    <h3>{l.title}</h3>
                  </Link>
                  <Meter value={lpct / 100} label={`${l.title} progress`} text={`${lpct}%`} />
                </div>
                <div className="stat-tiles">
                  <div className="stat-tile">
                    <span className="stat-label">Tabs opened</span>
                    <div className="tab-chips">
                      {TABS.map((t) => {
                        const on = lp.seen.includes(t.id)
                        return (
                          <span key={t.id} className={on ? 'is-seen' : ''}>
                            {on ? '✓ ' : ''}
                            {t.label}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                  <div className="stat-tile">
                    <span className="stat-label">Practice solved</span>
                    <span className="stat-value tabular">
                      {solved} of {l.practice.length}
                    </span>
                  </div>
                  <div className="stat-tile">
                    <span className="stat-label">Best quiz score</span>
                    <span className="stat-value tabular">
                      {lp.quizBest !== undefined && lp.quizTotal ? `${lp.quizBest} / ${lp.quizTotal}` : 'Not taken yet'}
                    </span>
                  </div>
                </div>
              </article>
            )
          })
        )}
      </section>

      <section className="reset-box" aria-labelledby="reset-h">
        <div className="stack" style={{ gap: 4 }}>
          <h2 id="reset-h">Start over</h2>
          <p>Clears every lesson's progress and quiz scores saved in this browser. This cannot be undone.</p>
        </div>
        {!confirming ? (
          <button className="btn-plain" onClick={() => setConfirming(true)}>
            Reset progress
          </button>
        ) : (
          <div className="btn-row">
            <button className="btn-text" onClick={() => setConfirming(false)}>
              Cancel
            </button>
            <button
              className="btn-danger"
              onClick={() => {
                reset()
                setConfirming(false)
                setCleared(true)
              }}
            >
              Yes, clear everything
            </button>
          </div>
        )}
      </section>
    </div>
  )
}
