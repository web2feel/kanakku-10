import { useState } from 'react'
import type { Example } from '../content/types'
import { ExampleCard } from './ExampleCard'
import { Rich } from './Rich'

/**
 * Examples as a reader: an index of every example on the left, one example at a time on the right.
 * Revealed steps are remembered per example while the lesson is open.
 */
export function ExamplesReader({ examples, onTop }: { examples: Example[]; onTop: () => void }) {
  const [i, setI] = useState(0)
  const [shown, setShown] = useState<Record<string, number>>({})
  const ex = examples[i]
  const pick = (j: number) => {
    setI(j)
    onTop()
  }

  return (
    <div className="ex-reader">
      <nav className="ex-index" aria-label="Worked examples">
        <span className="ex-index-label">{examples.length} worked examples</span>
        <ol>
          {examples.map((e, j) => {
            const n = shown[e.id] ?? 0
            const done = n >= e.steps.length
            return (
              <li key={e.id}>
                <button
                  className={`ex-index-item ${j === i ? 'is-current' : ''} ${done ? 'is-done' : ''}`}
                  aria-current={j === i ? 'true' : undefined}
                  onClick={() => pick(j)}
                >
                  <span className="ex-index-src">{e.source}</span>
                  <span className="ex-index-title">
                    <Rich text={e.title} />
                  </span>
                  <span className="ex-index-state tabular">
                    {done ? '✓ solved' : n > 0 ? `${n} / ${e.steps.length} steps` : `${e.steps.length} steps`}
                  </span>
                </button>
              </li>
            )
          })}
        </ol>
      </nav>

      <div className="ex-detail">
        <ExampleCard
          key={ex.id}
          ex={ex}
          shown={shown[ex.id] ?? 0}
          onShown={(n) => setShown((s) => ({ ...s, [ex.id]: n }))}
        />
        <div className="pager">
          <button className="btn-text" disabled={i === 0} onClick={() => pick(i - 1)}>
            ← Previous example
          </button>
          <span className="pager-count tabular">
            {i + 1} of {examples.length}
          </span>
          <button className="btn-text" disabled={i === examples.length - 1} onClick={() => pick(i + 1)}>
            Next example →
          </button>
        </div>
      </div>
    </div>
  )
}
