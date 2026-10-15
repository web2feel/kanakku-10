import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { UNITS, findLesson, findUnit } from '../content'
import { lessonCompletion, lessonKey, useProgress } from '../store/progress'
import { Meter } from '../components/Meter'
import { Atmosphere } from '../components/Atmosphere'

const HOW = [
  { name: 'Learn', text: 'Short explanation cards, each ending with a quick check.' },
  { name: 'Explore', text: 'Drag, slide and test ideas with interactive tools.' },
  { name: 'Examples', text: 'Worked solutions revealed one step at a time.' },
  { name: 'Practice', text: 'Textbook questions with hints and instant checking.' },
  { name: 'Quiz', text: 'A short scored test. Your best score is saved.' },
]

export function HomePage() {
  const lessons = useProgress((s) => s.lessons)
  const last = useProgress((s) => s.lastLesson)
  const lastUnit = findUnit(last?.unit)
  const lastLesson = findLesson(lastUnit, last?.lesson)
  const firstOpen = UNITS.find((u) => u.lessons.some((l) => l.status === 'ready'))
  const unitsRef = useRef<HTMLElement>(null)

  return (
    <div className="home">
      <section className="hero">
        <Atmosphere />
        <SkySighting />
        <div className="container hero-inner">
          <div className="badge-row">
            <span className="badge badge-mono">TN STATE BOARD · CLASS 10</span>
            {firstOpen && (
              <Link className="badge" to={`/unit/${firstOpen.id}`}>
                {firstOpen.title} is open <span aria-hidden="true">→</span>
              </Link>
            )}
          </div>
          <h1>Learn maths one lesson at a time, with tools you can touch.</h1>
          <p className="hero-lede">
            Short explanations, interactive diagrams, worked examples you reveal step by step, and practice that checks
            your answers as you go.
          </p>
          <div className="hero-cta">
            <div className="btn-row">
              {lastUnit && lastLesson ? (
                <Link className="btn btn-primary" to={`/unit/${lastUnit.id}/${lastLesson.id}`}>
                  Continue learning <span aria-hidden="true">→</span>
                </Link>
              ) : (
                firstOpen && (
                  <Link className="btn btn-primary" to={`/unit/${firstOpen.id}`}>
                    Start with {firstOpen.title} <span aria-hidden="true">→</span>
                  </Link>
                )
              )}
              <button
                className="btn btn-ghost"
                onClick={() => unitsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              >
                See all units
              </button>
            </div>
            {lastUnit && lastLesson && (
              <p className="hero-cta-note">
                Unit {lastUnit.number} · Lesson {lastLesson.number}: {lastLesson.title}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="band" aria-labelledby="how-h">
        <div className="container band-inner">
          <div className="stack">
            <h2 id="how-h">Every lesson moves through the same five steps.</h2>
            <p>Read a little, play with the idea, watch it solved, then try it yourself.</p>
          </div>
          <ol className="how">
            {HOW.map((h, i) => (
              <li key={h.name}>
                <span className="how-num tabular">{String(i + 1).padStart(2, '0')}</span>
                <span className="how-name">{h.name}</span>
                <span className="how-text">{h.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container units" aria-labelledby="units-h" ref={unitsRef}>
        <h2 id="units-h" className="section-heading">
          The book, unit by unit
        </h2>
        <ol className="unit-grid">
          {UNITS.map((u) => {
            const ready = u.lessons.filter((l) => l.status === 'ready')
            const available = ready.length > 0
            const completion =
              u.lessons.length > 0
                ? u.lessons.reduce((s, l) => s + lessonCompletion(lessons[lessonKey(u.id, l.id)], l), 0) /
                  u.lessons.length
                : 0
            const body = (
              <>
                <div className="unit-top">
                  <span className="unit-num tabular">UNIT {String(u.number).padStart(2, '0')}</span>
                  <span className="status-pill">
                    {available ? `${ready.length} of ${u.lessons.length} lessons ready` : 'Coming soon'}
                  </span>
                </div>
                <h3>{u.title}</h3>
                <p>{u.blurb}</p>
                {available && (
                  <div className="unit-foot">
                    <Meter value={completion} label={`${u.title} progress`} />
                  </div>
                )}
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

/**
 * Hipparchus measured the heavens with triangles. A star is sighted from the ground:
 * line of sight, horizontal, the drop to the horizon, and the angle of elevation θ.
 */
function SkySighting() {
  const O = [40, 300]
  const F = [440, 300]
  const S = [440, 70]
  return (
    <svg className="hero-sky" viewBox="0 0 500 340" aria-hidden="true">
      {[
        [90, 60],
        [210, 34],
        [300, 120],
        [372, 28],
        [486, 150],
        [150, 160],
        [260, 210],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={1.4} className="sky-dot" />
      ))}
      <line x1={0} y1={F[1]} x2={500} y2={F[1]} className="sky-line" />
      <line x1={F[0]} y1={F[1]} x2={S[0]} y2={S[1]} className="sky-line" />
      <line x1={O[0]} y1={O[1]} x2={S[0]} y2={S[1]} className="sky-sight" />
      <path d={`M ${F[0] - 12} ${F[1]} v -12 h 12`} className="sky-line" />
      <path
        d={`M ${O[0] + 64} ${O[1]} A 64 64 0 0 0 ${O[0] + 64 * Math.cos(0.5214)} ${O[1] - 64 * Math.sin(0.5214)}`}
        className="sky-line"
      />
      <text x={O[0] + 74} y={O[1] - 14}>
        θ
      </text>
      <path
        d={`M ${S[0]} ${S[1] - 9} L ${S[0] + 2.2} ${S[1] - 2.2} L ${S[0] + 9} ${S[1]} L ${S[0] + 2.2} ${S[1] + 2.2} L ${S[0]} ${S[1] + 9} L ${S[0] - 2.2} ${S[1] + 2.2} L ${S[0] - 9} ${S[1]} L ${S[0] - 2.2} ${S[1] - 2.2} Z`}
        className="sky-star"
      />
      <circle cx={O[0]} cy={O[1]} r={3} className="sky-star" />
      <text x={O[0] - 6} y={O[1] + 22}>
        observer
      </text>
      <text x={S[0] - 14} y={S[1] - 18} textAnchor="end">
        star
      </text>
      <text x={F[0] - 8} y={(F[1] + S[1]) / 2} textAnchor="end">
        h
      </text>
      <text x={(O[0] + F[0]) / 2} y={F[1] + 22} textAnchor="middle">
        d
      </text>
      <text x={(O[0] + S[0]) / 2 - 18} y={(O[1] + S[1]) / 2 - 10} textAnchor="end">
        tan θ = h / d
      </text>
    </svg>
  )
}
