import { useState } from 'react'
import { Tex } from '../components/Rich'

const orders = (k: number) => {
  const out: [number, number][] = []
  for (let m = 1; m <= k; m++) if (k % m === 0) out.push([m, k / m])
  return out
}

function note(k: number, count: number) {
  if (k === 1) return 'Only one order: a single entry is a 1 × 1 matrix.'
  if (count === 2) return `${k} is prime, so the only orders are one long row and one long column.`
  if (Number.isInteger(Math.sqrt(k)))
    return `${k} is a perfect square, so one order is square (${Math.sqrt(k)} × ${Math.sqrt(k)}) and the count is odd.`
  return 'Orders come in pairs: m × n and n × m. So the count is even.'
}

/** How many ways can k elements be arranged as a matrix? One for each factor pair of k. */
export function OrderFinder() {
  const [k, setK] = useState(12)
  const list = orders(k)
  const [sel, setSel] = useState(0)
  const pickIdx = Math.min(sel, list.length - 1)
  const [m, n] = list[pickIdx]

  return (
    <div className="widget order-finder">
      <div className="widget-panel">
        <label className="slider">
          <span>
            Number of elements: <strong className="tabular">{k}</strong>
          </span>
          <input
            type="range"
            min={1}
            max={36}
            value={k}
            onChange={(e) => {
              setK(Number(e.target.value))
              setSel(0)
            }}
          />
        </label>
        <div className="readout">
          <span className="readout-label">Possible orders</span>
          <span className="readout-value tabular">{list.length}</span>
        </div>
        <div className="chip-row" role="group" aria-label="Possible orders">
          {list.map(([a, b], i) => (
            <button key={i} className={`chip ${i === pickIdx ? 'is-on' : ''}`} onClick={() => setSel(i)}>
              {a} × {b}
            </button>
          ))}
        </div>
        <p className="small">{note(k, list.length)}</p>
      </div>
      <div className="widget-panel">
        <div className="dot-matrix-wrap">
          <div
            className="dot-matrix"
            style={{ gridTemplateColumns: `repeat(${n}, 14px)` }}
            role="img"
            aria-label={`${k} dots in ${m} rows and ${n} columns`}
          >
            {Array.from({ length: k }, (_, i) => (
              <span key={i} />
            ))}
          </div>
        </div>
        <p className="small muted centred">
          <Tex
            tex={`${m} \\text{ row${m > 1 ? 's' : ''}} \\times ${n} \\text{ column${n > 1 ? 's' : ''}} = ${k} \\text{ element${k > 1 ? 's' : ''}}`}
          />
        </p>
      </div>
    </div>
  )
}
