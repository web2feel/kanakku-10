import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { UNITS, findLesson, findUnit } from '../content'
import { unitCompletion, useProgress } from '../store/progress'
import { Meter } from '../components/Meter'

const STEPS = [
  { name: 'Learn', text: 'Short explanation cards, each ending with a quick check.', bg: 'bg-peach' },
  { name: 'Explore', text: 'Drag, slide and test ideas with interactive tools.', bg: 'bg-butter' },
  { name: 'Examples', text: 'Worked solutions revealed one step at a time.', bg: 'bg-mintwash' },
  { name: 'Practice', text: 'Textbook questions with hints and instant checking.', bg: 'bg-sky' },
  { name: 'Quiz', text: 'A short scored test. Your best score is saved.', bg: 'bg-lilac' },
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
      <section className="container hero">
        <div className="hero-copy">
          <div className="pill-row">
            <span className="pill pill-butter">TN State Board · Class 10</span>
            {firstOpen && (
              <Link className="pill pill-mint" to={`/unit/${firstOpen.id}`}>
                <span className="dot-live" aria-hidden="true" />
                {firstOpen.title} is open →
              </Link>
            )}
          </div>
          <h1>
            Learn maths one lesson at a time, with tools you can <span className="highlight">touch.</span>
          </h1>
          <p className="intro">
            Short explanations, interactive diagrams, worked examples you reveal step by step, and practice that checks
            your answers as you go.
          </p>
          <div className="hero-cta">
            {lastUnit && lastLesson ? (
              <Link className="btn-primary" to={`/unit/${lastUnit.id}/${lastLesson.id}`}>
                Continue learning →
              </Link>
            ) : (
              firstOpen && (
                <Link className="btn-primary" to={`/unit/${firstOpen.id}`}>
                  Start with {firstOpen.title} →
                </Link>
              )
            )}
            <button
              className="sun-underline"
              onClick={() => unitsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            >
              See all units
            </button>
          </div>
          {lastUnit && lastLesson && (
            <Link className="resume-card" to={`/unit/${lastUnit.id}/${lastLesson.id}`}>
              <span className="resume-num" aria-hidden="true">
                {lastUnit.number}
              </span>
              <span className="resume-text">
                <span className="resume-label">Pick up where you left off</span>
                <span className="resume-title">
                  Lesson {lastLesson.number} · {lastLesson.title}
                </span>
              </span>
            </Link>
          )}
        </div>
        <ElevationDemo />
      </section>

      <section className="steps-band" aria-labelledby="steps-h">
        <div className="container steps-inner">
          <h2 id="steps-h" className="section-h2">
            Every lesson moves through the same five steps.
          </h2>
          <p className="hand-note steps-note">
            Read a little, play with the idea, watch it solved, then try it yourself.
          </p>
          <ol className="step-cards">
            {STEPS.map((s, i) => (
              <li key={s.name} className={`step-card ${s.bg}`}>
                <span className="step-card-n">{i + 1}</span>
                <h3>{s.name}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container units" aria-labelledby="units-h" ref={unitsRef}>
        <h2 id="units-h" className="section-h2">
          The book, unit by unit
        </h2>
        <ol className="unit-grid">
          {UNITS.map((u) => {
            const ready = u.lessons.filter((l) => l.status === 'ready').length
            const num = `Unit ${String(u.number).padStart(2, '0')}`
            if (ready === 0) {
              return (
                <li key={u.id}>
                  <div className="unit-card is-soon">
                    <div className="unit-top">
                      <span className="unit-num">{num}</span>
                      <span className="pill pill-soon">Coming soon</span>
                    </div>
                    <h3>{u.title}</h3>
                    <p>{u.blurb}</p>
                  </div>
                </li>
              )
            }
            const pct = Math.round(unitCompletion(lessons, u) * 100)
            return (
              <li key={u.id}>
                <Link className="unit-card is-open" to={`/unit/${u.id}`}>
                  <div className="unit-top">
                    <span className="unit-num">{num}</span>
                    <span className="pill pill-ink">
                      {ready} of {u.lessons.length} lessons ready
                    </span>
                  </div>
                  <h3>{u.title}</h3>
                  <p>{u.blurb}</p>
                  <div className="unit-foot meter-on-sun">
                    <Meter value={pct / 100} label={`${u.title} progress`} text={`${pct}%`} />
                  </div>
                </Link>
              </li>
            )
          })}
        </ol>
      </section>
    </div>
  )
}

/** The hero's "try it" panel: tilt your head and watch the height of the star change. h = 50 · tan θ. */
function ElevationDemo() {
  const [angle, setAngle] = useState(30)
  const r = (angle * Math.PI) / 180
  const hPx = 240 * Math.tan(r)
  const topY = 250 - hPx
  const height = (50 * Math.tan(r)).toFixed(1)
  const arc = `M100 250 A40 40 0 0 0 ${(60 + 40 * Math.cos(r)).toFixed(1)} ${(250 - 40 * Math.sin(r)).toFixed(1)}`

  return (
    <div className="demo-panel">
      <div className="demo-head">
        <span>Try it · angle of elevation</span>
        <span className="demo-dots" aria-hidden="true">
          <span style={{ background: 'var(--color-coral)' }} />
          <span style={{ background: 'var(--color-sun)' }} />
          <span style={{ background: '#7ED9B5' }} />
        </span>
      </div>
      <svg
        viewBox="0 0 400 290"
        role="img"
        aria-label={`Looking up at ${angle} degrees from 50 metres away, the star is ${height} metres high.`}
      >
        {[
          [70, 40, 1.6],
          [160, 70, 1.2],
          [230, 30, 1.8],
          [370, 90, 1.3],
          [120, 140, 1.1],
        ].map(([x, y, rr], i) => (
          <circle key={i} cx={x} cy={y} r={rr} fill="#8D97B3" />
        ))}
        <line x1="20" y1="250" x2="390" y2="250" stroke="#5B6684" strokeWidth="2" strokeLinecap="round" />
        <line x1="300" y1="250" x2="300" y2={topY} stroke="#7ED9B5" strokeWidth="3" strokeLinecap="round" />
        <path d="M288 250 V238 H300" fill="none" stroke="#7ED9B5" strokeWidth="1.5" />
        <line
          x1="60"
          y1="250"
          x2="300"
          y2={topY}
          stroke="#FFD25A"
          strokeWidth="2.5"
          strokeDasharray="6 6"
          strokeLinecap="round"
        />
        <path d={arc} fill="none" stroke="#FF6B4A" strokeWidth="3" strokeLinecap="round" />
        <circle cx="60" cy="250" r="7" fill="#FF6B4A" stroke="#1F2A44" strokeWidth="2" />
        <text x="300" y={topY + 4} fontSize="26" fill="#FFD25A" textAnchor="middle">
          ★
        </text>
        <text x="118" y="244" fontFamily="Caveat" fontSize="22" fill="#FF8C72">
          θ = {angle}°
        </text>
        <text x="312" y={250 - hPx / 2} fontFamily="Caveat" fontSize="22" fill="#7ED9B5">
          h = {height} m
        </text>
        <text x="180" y="276" fontFamily="Caveat" fontSize="22" fill="#C9D1E6" textAnchor="middle">
          d = 50 m
        </text>
        <text x="44" y="276" fontFamily="Caveat" fontSize="20" fill="#C9D1E6">
          you
        </text>
      </svg>
      <label className="demo-slider">
        <span>Tilt your head</span>
        <input
          type="range"
          min={10}
          max={45}
          value={angle}
          onChange={(e) => setAngle(Number(e.target.value))}
          aria-label="Angle of elevation in degrees"
        />
      </label>
      <div className="demo-readout tabular">
        <span className="formula">tan θ = h ÷ d</span>
        <span>
          tan {angle}° × 50 = <b>{height} m</b>
        </span>
      </div>
    </div>
  )
}
