import { useState } from 'react'
import { Tex } from '../components/Rich'
import { Matrix, Stepper, numTex } from './matrixKit'

interface Rule {
  tex: string
  f: (i: number, j: number) => number
  /** the working for one entry */
  work: (i: number, j: number) => string
}

const RULES: Rule[] = [
  { tex: 'i + j', f: (i, j) => i + j, work: (i, j) => `${i} + ${j}` },
  { tex: 'i - j', f: (i, j) => i - j, work: (i, j) => `${i} - ${j}` },
  { tex: 'i \\times j', f: (i, j) => i * j, work: (i, j) => `${i} \\times ${j}` },
  { tex: 'i^2 j^2', f: (i, j) => i * i * j * j, work: (i, j) => `${i}^2 \\times ${j}^2 = ${i * i} \\times ${j * j}` },
  { tex: '|i - 2j|', f: (i, j) => Math.abs(i - 2 * j), work: (i, j) => `|${i} - 2 \\times ${j}| = |${i - 2 * j}|` },
  {
    tex: '\\dfrac{(i+j)^3}{3}',
    f: (i, j) => (i + j) ** 3 / 3,
    work: (i, j) => `\\dfrac{(${i}+${j})^3}{3} = \\dfrac{${(i + j) ** 3}}{3}`,
  },
]

/** Pick a rule for a_ij, then fill the matrix one entry at a time, or all at once. */
export function AijBuilder() {
  const [rule, setRule] = useState(3)
  const [m, setM] = useState(3)
  const [n, setN] = useState(3)
  const [filled, setFilled] = useState(0)
  const [pick, setPick] = useState<[number, number] | null>(null)

  const r = RULES[rule]
  const total = m * n
  const g = Array.from({ length: m }, (_, i) => Array.from({ length: n }, (_, j) => r.f(i + 1, j + 1)))
  // the most recently filled entry, or the one the student tapped
  const focus: [number, number] | null = pick ?? (filled > 0 ? [Math.floor((filled - 1) / n), (filled - 1) % n] : null)

  function reset(next: () => void) {
    next()
    setFilled(0)
    setPick(null)
  }

  return (
    <div className="widget aij-builder">
      <div className="widget-panel">
        <span className="panel-label">Rule</span>
        <div className="chip-row" role="group" aria-label="Rule for a i j">
          {RULES.map((x, k) => (
            <button key={k} className={`chip ${rule === k ? 'is-on' : ''}`} onClick={() => reset(() => setRule(k))}>
              <Tex tex={`a_{ij} = ${x.tex}`} />
            </button>
          ))}
        </div>
        <div className="stepper-row">
          <Stepper label="Rows m" value={m} min={1} max={4} onChange={(v) => reset(() => setM(v))} />
          <Stepper label="Columns n" value={n} min={1} max={4} onChange={(v) => reset(() => setN(v))} />
        </div>
        <div className="btn-row">
          <button
            className="btn-dark"
            disabled={filled >= total}
            onClick={() => (setPick(null), setFilled((f) => f + 1))}
          >
            {filled === 0 ? 'Fill the first entry' : 'Fill the next entry'}
          </button>
          <button className="btn-link" disabled={filled >= total} onClick={() => (setPick(null), setFilled(total))}>
            Fill them all
          </button>
          {filled > 0 && (
            <button className="btn-link" onClick={() => reset(() => {})}>
              Start again
            </button>
          )}
        </div>
      </div>

      <div className="widget-panel">
        <div className="mx-pair is-centred">
          <div className="aij-grid-wrap">
            <Matrix
              g={g}
              name="A"
              showOrder
              cellClass={(i, j) => {
                const k = i * n + j
                const c = [k < filled ? '' : 'is-blank']
                if (focus && focus[0] === i && focus[1] === j) c.push('is-hit')
                return c.join(' ')
              }}
              onCellClick={(i, j) => {
                setPick([i, j])
                setFilled((f) => Math.max(f, i * n + j + 1))
              }}
            />
          </div>
        </div>
        <div className="mx-work" aria-live="polite">
          {focus ? (
            <Tex
              display
              tex={`a_{${focus[0] + 1}${focus[1] + 1}} = ${r.work(focus[0] + 1, focus[1] + 1)} = ${numTex(g[focus[0]][focus[1]])}`}
            />
          ) : (
            <p className="small muted">
              Each entry uses its own row number <Tex tex="i" /> and column number <Tex tex="j" />. Fill an entry, or
              tap any box, to see the working.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
