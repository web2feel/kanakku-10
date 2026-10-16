import { useState } from 'react'
import { Tex } from '../components/Rich'

const ANGLES = ['0^\\circ', '30^\\circ', '45^\\circ', '60^\\circ', '90^\\circ']
const U = '\\text{undefined}'
const TABLE: { fn: string; vals: string[] }[] = [
  { fn: '\\sin\\theta', vals: ['0', '\\tfrac{1}{2}', '\\tfrac{1}{\\sqrt2}', '\\tfrac{\\sqrt3}{2}', '1'] },
  { fn: '\\cos\\theta', vals: ['1', '\\tfrac{\\sqrt3}{2}', '\\tfrac{1}{\\sqrt2}', '\\tfrac{1}{2}', '0'] },
  { fn: '\\tan\\theta', vals: ['0', '\\tfrac{1}{\\sqrt3}', '1', '\\sqrt3', U] },
  { fn: '\\operatorname{cosec}\\theta', vals: [U, '2', '\\sqrt2', '\\tfrac{2}{\\sqrt3}', '1'] },
  { fn: '\\sec\\theta', vals: ['1', '\\tfrac{2}{\\sqrt3}', '\\sqrt2', '2', U] },
  { fn: '\\cot\\theta', vals: [U, '\\sqrt3', '1', '\\tfrac{1}{\\sqrt3}', '0'] },
]

/** The table of standard values, with a self-test mode that hides cells until tapped. */
export function StandardTable() {
  const [test, setTest] = useState(false)
  const [open, setOpen] = useState<Set<string>>(new Set())
  const [pattern, setPattern] = useState(false)

  const total = TABLE.length * ANGLES.length
  const toggle = (k: string) =>
    setOpen((s) => {
      const n = new Set(s)
      if (n.has(k)) n.delete(k)
      else n.add(k)
      return n
    })

  return (
    <div className="widget standard-table">
      <div className="chip-row" role="group" aria-label="Mode">
        <button className={`chip ${!test ? 'is-on' : ''}`} onClick={() => setTest(false)}>
          Study the table
        </button>
        <button
          className={`chip ${test ? 'is-on' : ''}`}
          onClick={() => {
            setTest(true)
            setOpen(new Set())
          }}
        >
          Test myself
        </button>
        <button className={`chip ${pattern ? 'is-on-sky' : ''}`} onClick={() => setPattern((p) => !p)}>
          Show the memory pattern
        </button>
      </div>

      {pattern && (
        <div className="pattern">
          <span className="pattern-label">memory pattern</span>
          <p>
            Write <Tex tex="\sqrt{0},\sqrt{1},\sqrt{2},\sqrt{3},\sqrt{4}" />, then divide each by 2. That is the{' '}
            <strong>sin</strong> row. Read it backwards for the <strong>cos</strong> row. Then{' '}
            <Tex tex="\tan = \sin \div \cos" />, and the last three rows are reciprocals.
          </p>
          <Tex
            display
            tex="\sin:\ \tfrac{\sqrt0}{2},\ \tfrac{\sqrt1}{2},\ \tfrac{\sqrt2}{2},\ \tfrac{\sqrt3}{2},\ \tfrac{\sqrt4}{2}\ =\ 0,\ \tfrac12,\ \tfrac{1}{\sqrt2},\ \tfrac{\sqrt3}{2},\ 1"
          />
        </div>
      )}

      <div className="table-scroll">
        <table className="data-table is-centred std-table">
          <thead>
            <tr>
              <th>
                <Tex tex="\theta" />
              </th>
              {ANGLES.map((a) => (
                <th key={a}>
                  <Tex tex={a} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE.map((row) => (
              <tr key={row.fn}>
                <th scope="row">
                  <Tex tex={row.fn} />
                </th>
                {row.vals.map((v, j) => {
                  const k = `${row.fn}-${j}`
                  const hidden = test && !open.has(k)
                  return (
                    <td key={k}>
                      {test ? (
                        <button
                          className={`cell-btn ${hidden ? 'is-hidden' : ''}`}
                          onClick={() => toggle(k)}
                          aria-label={hidden ? 'Reveal value' : 'Hide value'}
                        >
                          {hidden ? '?' : <Tex tex={v} />}
                        </button>
                      ) : (
                        <Tex tex={v} />
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {test && (
        <p className="muted small tabular">
          Say each value out loud, then tap to check. Revealed {open.size} of {total}.{' '}
          <button className="link-btn" onClick={() => setOpen(new Set())}>
            Hide all again
          </button>
        </p>
      )}
    </div>
  )
}
