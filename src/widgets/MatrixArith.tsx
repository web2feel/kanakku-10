import { useState } from 'react'
import { Tex } from '../components/Rich'
import { Matrix, Stepper, numTex, paren, readNumber, type Grid } from './matrixKit'

const PRESETS: { label: string; a: Grid; b: Grid; p: number; q: number }[] = [
  {
    label: 'Example 3.60: A + B',
    a: [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    b: [
      [1, 7, 0],
      [1, 3, 1],
      [2, 4, 0],
    ],
    p: 1,
    q: 1,
  },
  {
    label: 'Example 3.63: 2A + B',
    a: [
      [7, 8, 6],
      [1, 3, 9],
      [-4, 3, -1],
    ],
    b: [
      [4, 11, -3],
      [-1, 2, 4],
      [7, 5, 0],
    ],
    p: 2,
    q: 1,
  },
  {
    label: 'A − B',
    a: [
      [5, 7],
      [3, 3],
    ],
    b: [
      [1, 9],
      [3, 4],
    ],
    p: 1,
    q: -1,
  },
  {
    label: 'Example 3.62: different orders',
    a: [
      [1, 3, -2],
      [5, -4, 6],
      [-3, 2, 9],
    ],
    b: [
      [1, 8],
      [3, 4],
      [9, 6],
    ],
    p: 1,
    q: 1,
  },
]

const coef = (k: number, name: string) => (k === 1 ? name : k === -1 ? `-${name}` : `${k}${name}`)

function exprTex(p: number, q: number) {
  if (p === 0 && q === 0) return 'O'
  if (q === 0) return coef(p, 'A')
  if (p === 0) return coef(q, 'B')
  return `${coef(p, 'A')} ${q < 0 ? '-' : '+'} ${coef(Math.abs(q), 'B')}`
}

/** Work out pA + qB entry by entry. Covers A + B, A − B, kA and combinations like 2A + B. */
export function MatrixArith() {
  const [preset, setPreset] = useState(0)
  const [a, setA] = useState<Grid>(PRESETS[0].a)
  const [b, setB] = useState<Grid>(PRESETS[0].b)
  const [rawA, setRawA] = useState<string[][]>(PRESETS[0].a.map((r) => r.map(String)))
  const [rawB, setRawB] = useState<string[][]>(PRESETS[0].b.map((r) => r.map(String)))
  const [p, setP] = useState(1)
  const [q, setQ] = useState(1)
  const [hit, setHit] = useState<[number, number] | null>([0, 0])

  const sameOrder = a.length === b.length && a[0].length === b[0].length
  const needsB = q !== 0
  const defined = sameOrder || !needsB
  const c = defined ? a.map((r, i) => r.map((x, j) => p * x + (needsB ? q * b[i][j] : 0))) : null

  function load(k: number) {
    const s = PRESETS[k]
    setPreset(k)
    setA(s.a)
    setB(s.b)
    setRawA(s.a.map((r) => r.map(String)))
    setRawB(s.b.map((r) => r.map(String)))
    setP(s.p)
    setQ(s.q)
    setHit([0, 0])
  }

  const edit = (which: 'a' | 'b') => (i: number, j: number, s: string) => {
    const setRaw = which === 'a' ? setRawA : setRawB
    const setG = which === 'a' ? setA : setB
    setRaw((r) => r.map((row, x) => row.map((v, y) => (x === i && y === j ? s : v))))
    const v = readNumber(s)
    if (v !== null) setG((g) => g.map((row, x) => row.map((w, y) => (x === i && y === j ? v : w))))
  }

  const on = (i: number, j: number) => (hit && hit[0] === i && hit[1] === j ? 'is-hit' : '')
  const name = exprTex(p, q)

  let work = ''
  if (c && hit && hit[0] < c.length && hit[1] < c[0].length) {
    const [i, j] = hit
    const termA = p === 0 ? '' : p === 1 ? paren(a[i][j]) : `${p} \\times ${paren(a[i][j])}`
    const termB = !needsB ? '' : q === 1 ? paren(b[i][j]) : `${q} \\times ${paren(b[i][j])}`
    const sum = [termA, termB].filter(Boolean).join(' + ') || '0'
    work = `c_{${i + 1}${j + 1}} = ${sum} = ${numTex(c[i][j])}`
  }

  return (
    <div className="widget matrix-arith">
      <div className="widget-panel">
        <div className="chip-row" role="group" aria-label="Examples">
          {PRESETS.map((s, k) => (
            <button key={k} className={`chip ${preset === k ? 'is-on' : ''}`} onClick={() => load(k)}>
              {s.label}
            </button>
          ))}
        </div>
        <div className="stepper-row">
          <Stepper label={<Tex tex="p" />} value={p} min={-3} max={3} onChange={setP} />
          <Stepper label={<Tex tex="q" />} value={q} min={-3} max={3} onChange={setQ} />
          <span className="op-formula">
            <Tex tex={`pA + qB = ${name}`} />
          </span>
        </div>
        <div className="mx-pair">
          <Matrix
            g={a}
            raw={rawA}
            name="A"
            showOrder
            cellClass={on}
            onEdit={edit('a')}
            onCellEnter={(i, j) => setHit([i, j])}
          />
          <Matrix
            g={b}
            raw={rawB}
            name="B"
            showOrder
            cellClass={(i, j) => (needsB ? on(i, j) : 'is-blank-soft')}
            onEdit={edit('b')}
            onCellEnter={(i, j) => setHit([i, j])}
          />
        </div>
      </div>
      <div className="widget-panel">
        {c ? (
          <>
            <div className="mx-pair is-centred">
              <Matrix
                g={c}
                name={name}
                showOrder
                cellClass={on}
                onCellEnter={(i, j) => setHit([i, j])}
                onCellClick={(i, j) => setHit([i, j])}
              />
            </div>
            <div className="mx-work" aria-live="polite">
              {work ? <Tex display tex={work} /> : null}
              <p className="small muted">Point at any entry: each one uses only the entries in the same place.</p>
            </div>
          </>
        ) : (
          <div className="mx-undefined" role="status">
            <strong>Not defined.</strong>
            <p>
              <Tex tex="A" /> is <Tex tex={`${a.length}\\times${a[0].length}`} /> and <Tex tex="B" /> is{' '}
              <Tex tex={`${b.length}\\times${b[0].length}`} />. Matrices can be added or subtracted only when they have
              the same order, because every entry needs a partner in the same place.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
