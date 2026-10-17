import { useState } from 'react'
import { Tex } from '../components/Rich'
import { Matrix, multiply, numTex, paren, type Grid } from './matrixKit'

const PRESETS: { label: string; a: Grid; b: Grid }[] = [
  {
    label: 'Example 3.67',
    a: [
      [1, 2, 0],
      [3, 1, 5],
    ],
    b: [
      [8, 3, 1],
      [2, 4, 1],
      [5, 3, 1],
    ],
  },
  {
    label: 'Example 3.68: AB or BA?',
    a: [
      [2, 1],
      [1, 3],
    ],
    b: [
      [2, 0],
      [1, 3],
    ],
  },
  {
    label: 'AB = O, but A ≠ O',
    a: [
      [1, -1],
      [-1, 1],
    ],
    b: [
      [1, 1],
      [1, 1],
    ],
  },
  {
    label: 'Example 3.70 with x = 1, y = 2',
    a: [
      [2, 1],
      [1, 2],
    ],
    b: [[1], [2]],
  },
  {
    label: 'Orders that don’t fit',
    a: [
      [1, 2],
      [3, 4],
      [5, 6],
    ],
    b: [
      [1, 2],
      [3, 4],
      [5, 6],
    ],
  },
]

/** Multiply row by column, one entry at a time, and check whether AB and BA match. */
export function MatrixMultiply() {
  const [preset, setPreset] = useState(0)
  const [swap, setSwap] = useState(false)
  const [done, setDone] = useState(1)
  const [pick, setPick] = useState<[number, number] | null>(null)

  const s = PRESETS[preset]
  const [L, R] = swap ? [s.b, s.a] : [s.a, s.b]
  const [ln, rn] = swap ? ['B', 'A'] : ['A', 'B']
  const prod = multiply(L, R)
  const m = L.length
  const n = L[0].length
  const r = R.length
  const p = R[0].length
  const total = prod ? m * p : 0
  const focus: [number, number] | null =
    pick ?? (prod && done > 0 ? [Math.floor((done - 1) / p), (done - 1) % p] : null)

  function load(k: number, sw = false) {
    setPreset(k)
    setSwap(sw)
    setDone(1)
    setPick(null)
  }

  let work = ''
  if (prod && focus) {
    const [i, j] = focus
    const terms = L[i].map((x, k) => `${paren(x)} \\times ${paren(R[k][j])}`).join(' + ')
    work = `c_{${i + 1}${j + 1}} = ${terms} = ${numTex(prod[i][j])}`
  }

  const other = swap ? multiply(s.a, s.b) : multiply(s.b, s.a)
  const same =
    prod && other && prod.length === other.length && prod.every((row, i) => row.every((x, j) => x === other[i][j]))

  return (
    <div className="widget matrix-multiply">
      <div className="widget-panel">
        <div className="chip-row" role="group" aria-label="Examples">
          {PRESETS.map((x, k) => (
            <button key={k} className={`chip ${preset === k ? 'is-on' : ''}`} onClick={() => load(k)}>
              {x.label}
            </button>
          ))}
        </div>
        <div className={`order-check ${prod ? 'is-ok' : 'is-bad'}`} aria-live="polite">
          <Tex
            tex={`\\underset{${ln}}{(${m} \\times \\htmlClass{c-inner}{${n}})} \\cdot \\underset{${rn}}{(\\htmlClass{c-inner}{${r}} \\times ${p})}`}
          />
          <span>
            {prod ? (
              <>
                The middle numbers match, so <Tex tex={`${ln}${rn}`} /> exists and is <Tex tex={`${m} \\times ${p}`} />.
              </>
            ) : (
              <>
                {ln} has {n} column{n > 1 ? 's' : ''} but {rn} has {r} row{r > 1 ? 's' : ''}, so{' '}
                <Tex tex={`${ln}${rn}`} /> is not defined.
              </>
            )}
          </span>
        </div>
        <div className="mx-pair">
          <Matrix g={L} name={ln} showOrder cellClass={(i) => (focus && prod && i === focus[0] ? 'is-row' : '')} />
          <span className="mx-op" aria-hidden="true">
            ×
          </span>
          <Matrix g={R} name={rn} showOrder cellClass={(_, j) => (focus && prod && j === focus[1] ? 'is-col' : '')} />
        </div>
        <div className="btn-row">
          {prod && (
            <>
              <button
                className="btn-dark"
                disabled={done >= total}
                onClick={() => {
                  setPick(null)
                  setDone((d) => Math.min(total, d + 1))
                }}
              >
                Next entry
              </button>
              <button
                className="btn-link"
                disabled={done >= total}
                onClick={() => {
                  setPick(null)
                  setDone(total)
                }}
              >
                Fill them all
              </button>
            </>
          )}
          <button className="btn-link" onClick={() => load(preset, !swap)}>
            Swap to {rn}
            {ln}
          </button>
        </div>
      </div>

      <div className="widget-panel">
        {prod ? (
          <>
            <div className="mx-pair is-centred">
              <Matrix
                g={prod}
                name={`${ln}${rn}`}
                showOrder
                cellClass={(i, j) => {
                  const k = i * p + j
                  const c = [k < done || (pick && pick[0] === i && pick[1] === j) ? '' : 'is-blank']
                  if (focus && focus[0] === i && focus[1] === j) c.push('is-hit')
                  return c.join(' ')
                }}
                onCellClick={(i, j) => setPick([i, j])}
              />
            </div>
            <div className="mx-work" aria-live="polite">
              <Tex display tex={work} />
              <p className="small muted">
                Row {focus![0] + 1} of {ln} times column {focus![1] + 1} of {rn}: multiply in pairs, then add.
              </p>
            </div>
            {done >= total && (
              <p className={`feedback ${same ? 'f-correct' : 'f-reveal'}`}>
                {!other ? (
                  <>
                    <Tex tex={`${rn}${ln}`} /> is not defined at all, so the order of multiplying matters.
                  </>
                ) : same ? (
                  <>
                    Here <Tex tex="AB = BA" />. That is unusual for matrices.
                  </>
                ) : (
                  <>
                    <Tex tex={`${rn}${ln}`} /> gives a different answer. Use “Swap” to see it: <Tex tex="AB \ne BA" />.
                  </>
                )}
              </p>
            )}
          </>
        ) : (
          <div className="mx-undefined" role="status">
            <strong>Not defined.</strong>
            <p>
              Each entry of a product pairs a row of the first matrix with a column of the second. A row of {ln} has {n}{' '}
              entries but a column of {rn} has {r}, so they cannot be paired up.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
