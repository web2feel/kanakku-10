import { useState } from 'react'
import { Tex } from '../components/Rich'
import { Matrix, Stepper, numTex, readNumber, resizeGrid, transpose, type Grid } from './matrixKit'

interface TypeInfo {
  name: string
  is: boolean
  why: string
}

/** The textbook's types, in its order (Section 3.9.2), each with a reason for yes or no. */
function classify(g: Grid): TypeInfo[] {
  const m = g.length
  const n = g[0].length
  const square = m === n
  const all = g.flat()
  const offDiagZero = g.every((r, i) => r.every((x, j) => i === j || x === 0))
  const diag = square ? g.map((r, i) => r[i]) : []
  const zero = all.every((x) => x === 0)
  const diagonal = square && offDiagZero && !zero
  const scalar = diagonal && diag.every((x) => x === diag[0])
  const identity = scalar && diag[0] === 1
  const below = square && g.every((r, i) => r.every((x, j) => j >= i || x === 0))
  const above = square && g.every((r, i) => r.every((x, j) => j <= i || x === 0))
  const notSquare = `It has ${m} row${m > 1 ? 's' : ''} and ${n} column${n > 1 ? 's' : ''}, so it is not square.`
  return [
    { name: 'Row matrix', is: m === 1, why: m === 1 ? 'It has exactly one row.' : `It has ${m} rows, not 1.` },
    {
      name: 'Column matrix',
      is: n === 1,
      why: n === 1 ? 'It has exactly one column.' : `It has ${n} columns, not 1.`,
    },
    {
      name: 'Square matrix',
      is: square,
      why: square ? `Rows = columns = ${m}.` : `${m} rows but ${n} columns.`,
    },
    {
      name: 'Diagonal matrix',
      is: diagonal,
      why: !square
        ? notSquare
        : zero
          ? 'Every entry is zero. The textbook needs at least one non-zero diagonal entry.'
          : offDiagZero
            ? 'Every entry off the leading diagonal is zero.'
            : 'Some entry off the leading diagonal is not zero.',
    },
    {
      name: 'Scalar matrix',
      is: scalar,
      why: scalar
        ? `Diagonal, with every diagonal entry equal to ${diag[0]}.`
        : diagonal
          ? 'Diagonal, but the diagonal entries are not all equal.'
          : 'It must first be a diagonal matrix.',
    },
    {
      name: 'Identity matrix',
      is: identity,
      why: identity
        ? `Scalar, with 1 on the diagonal: this is $I_${m}$.`
        : scalar
          ? `Scalar, but the diagonal entries are ${diag[0]}, not 1.`
          : 'It needs 1s on the leading diagonal and 0 everywhere else.',
    },
    { name: 'Zero matrix', is: zero, why: zero ? 'Every entry is 0.' : 'At least one entry is not 0.' },
    {
      name: 'Upper triangular',
      is: below,
      why: !square
        ? notSquare
        : below
          ? 'Every entry below the leading diagonal is zero.'
          : 'Some entry below the leading diagonal is not zero.',
    },
    {
      name: 'Lower triangular',
      is: above,
      why: !square
        ? notSquare
        : above
          ? 'Every entry above the leading diagonal is zero.'
          : 'Some entry above the leading diagonal is not zero.',
    },
  ]
}

const PRESETS: { label: string; g: Grid }[] = [
  {
    label: 'Diagonal',
    g: [
      [8, 0, 0],
      [0, -3, 0],
      [0, 0, 11],
    ],
  },
  {
    label: 'Scalar',
    g: [
      [5, 0, 0],
      [0, 5, 0],
      [0, 0, 5],
    ],
  },
  {
    label: 'Identity',
    g: [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ],
  },
  {
    label: 'Upper triangular',
    g: [
      [1, 7, -3],
      [0, 2, 4],
      [0, 0, 7],
    ],
  },
  {
    label: 'Lower triangular',
    g: [
      [8, 0, 0],
      [4, 5, 0],
      [-11, 3, 1],
    ],
  },
  { label: 'Row', g: [[8, 9, 4, 3]] },
  { label: 'Column', g: [[8], [-3], [23], [17]] },
  {
    label: 'Zero',
    g: [
      [0, 0, 0],
      [0, 0, 0],
    ],
  },
]

const sub = (i: number, j: number) => `a_{${i + 1}${j + 1}}`

/** Edit a matrix and see which types it belongs to, with its transpose alongside. */
export function MatrixTypes() {
  const [g, setG] = useState<Grid>([
    [5, 3, -1],
    [2, 8, 9],
    [-4, 7, 5],
  ])
  const [raw, setRaw] = useState<string[][]>(() => g.map((r) => r.map(String)))
  const [hover, setHover] = useState<[number, number] | null>(null)
  const [diag, setDiag] = useState(true)

  const m = g.length
  const n = g[0].length
  const types = classify(g)
  const t = transpose(g)

  function load(next: Grid) {
    setG(next)
    setRaw(next.map((r) => r.map(String)))
    setHover(null)
  }
  function resize(mm: number, nn: number) {
    load(resizeGrid(g, mm, nn))
  }

  const cls = (i: number, j: number, flip = false) => {
    const [a, b] = flip ? [j, i] : [i, j]
    const c: string[] = []
    if (hover && hover[0] === a && hover[1] === b) c.push('is-hit')
    if (diag && i === j && m === n) c.push('is-diag')
    return c.join(' ')
  }

  return (
    <div className="widget matrix-types">
      <div className="widget-panel">
        <div className="chip-row" role="group" aria-label="Start from an example">
          {PRESETS.map((p) => (
            <button key={p.label} className="chip" onClick={() => load(p.g)}>
              {p.label}
            </button>
          ))}
        </div>
        <div className="stepper-row">
          <Stepper label="Rows" value={m} min={1} max={4} onChange={(v) => resize(v, n)} />
          <Stepper label="Columns" value={n} min={1} max={4} onChange={(v) => resize(m, v)} />
          <label className="toggle">
            <input type="checkbox" checked={diag} onChange={(e) => setDiag(e.target.checked)} />
            Shade the leading diagonal
          </label>
        </div>
        <div className="mx-pair">
          <Matrix
            g={g}
            raw={raw}
            name="A"
            showOrder
            cellClass={(i, j) => cls(i, j)}
            onCellEnter={(i, j) => setHover([i, j])}
            onEdit={(i, j, s) => {
              setRaw((r) => r.map((row, a) => row.map((x, b) => (a === i && b === j ? s : x))))
              const v = readNumber(s)
              if (v !== null) setG((gg) => gg.map((row, a) => row.map((x, b) => (a === i && b === j ? v : x))))
            }}
          />
          <Matrix
            g={t}
            name="A^T"
            showOrder
            cellClass={(i, j) => cls(i, j, true)}
            onCellEnter={(i, j) => setHover([j, i])}
            onLeave={() => setHover(null)}
          />
        </div>
        <p className="mx-readout" aria-live="polite">
          {hover ? (
            <>
              <Tex tex={`${sub(hover[0], hover[1])} = ${numTex(g[hover[0]][hover[1]])}`} />: row {hover[0] + 1}, column{' '}
              {hover[1] + 1}. In <Tex tex="A^T" /> it moves to row {hover[1] + 1}, column {hover[0] + 1}.
            </>
          ) : (
            <>Point at an entry to see its name. Type in the boxes to change the matrix.</>
          )}
        </p>
      </div>

      <ul className="type-list" aria-label="Matrix types">
        {types.map((ty) => (
          <li key={ty.name} className={ty.is ? 'is-yes' : ''}>
            <span className="type-mark" aria-hidden="true">
              {ty.is ? '✓' : '·'}
            </span>
            <span>
              <strong>{ty.name}</strong>
              <span className="sr-only">{ty.is ? ': yes.' : ': no.'}</span>
              <small>
                <RichLite text={ty.why} />
              </small>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Only $…$ is needed here; avoids pulling Rich's other markup into a list item. */
function RichLite({ text }: { text: string }) {
  const parts = text.split(/(\$[^$]+\$)/)
  return (
    <>{parts.map((p, i) => (p.startsWith('$') ? <Tex key={i} tex={p.slice(1, -1)} /> : <span key={i}>{p}</span>))}</>
  )
}
