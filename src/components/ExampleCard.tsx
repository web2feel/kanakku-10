import { useState } from 'react'
import type { Example } from '../content/types'
import { Rich } from './Rich'
import { Scene } from './Scene'
import { StepView } from './Blocks'

/** A worked example whose solution is revealed one step at a time. */
export function ExampleCard({ ex }: { ex: Example }) {
  const [shown, setShown] = useState(0)
  const done = shown >= ex.steps.length
  const current = shown > 0 ? ex.steps[shown - 1] : undefined

  return (
    <article className="card lesson-card example" id={ex.id}>
      <span className="pill">{ex.source}</span>
      <h3 className="card-h3">{ex.title}</h3>
      <div className={ex.figure ? 'example-grid' : ''}>
        <div className="example-main">
          <p className="prompt">
            <Rich text={ex.prompt} />
          </p>
          {shown === 0 && (
            <p className="hand-note try-first">Try it yourself first, then reveal the solution one step at a time.</p>
          )}
          {shown > 0 && (
            <ol className="steps">
              {ex.steps.slice(0, shown).map((s, i) => (
                <StepView key={i} step={s} index={i} />
              ))}
            </ol>
          )}
          {done && (
            <div className="answer-box">
              <span className="answer-label">answer</span>
              <span>
                <Rich text={ex.answer} />
              </span>
            </div>
          )}
          <div className="btn-row">
            {!done ? (
              <>
                <button className="btn-dark" onClick={() => setShown((n) => n + 1)}>
                  {shown === 0 ? 'Show first step' : 'Next step'}
                </button>
                <button className="btn-link" onClick={() => setShown(ex.steps.length)}>
                  Show full solution
                </button>
              </>
            ) : (
              <button className="btn-link" onClick={() => setShown(0)}>
                Hide solution
              </button>
            )}
            <span className="step-count tabular">
              {Math.min(shown, ex.steps.length)} / {ex.steps.length} steps
            </span>
          </div>
        </div>
        {ex.figure && (
          <div className="example-figure">
            <Scene spec={ex.figure} highlight={current?.highlight} />
          </div>
        )}
      </div>
    </article>
  )
}
