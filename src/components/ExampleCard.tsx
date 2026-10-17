import { useMemo, useState } from 'react'
import type { Example, Step } from '../content/types'
import { build } from '../lib/constructions'
import { ConstructionFigure } from './ConstructionView'
import { Rich } from './Rich'
import { Scene } from './Scene'
import { StepView } from './Blocks'

/** The example's steps; a construction example without written steps uses the construction's own. */
export function exampleSteps(ex: Example): Step[] {
  if (ex.steps.length || !ex.construction) return ex.steps
  return build(ex.construction).steps.map((s) => ({ text: s.text }))
}

/**
 * A worked example whose solution is revealed one step at a time.
 * Pass `shown` and `onShown` to control the step count from outside (the examples reader keeps it per example).
 */
export function ExampleCard({
  ex,
  shown: shownProp,
  onShown,
}: {
  ex: Example
  shown?: number
  onShown?: (n: number) => void
}) {
  const [own, setOwn] = useState(0)
  const shown = shownProp ?? own
  const setShown = (next: number | ((n: number) => number)) => {
    const v = typeof next === 'function' ? next(shown) : next
    setOwn(v)
    onShown?.(v)
  }
  const steps = useMemo(() => exampleSteps(ex), [ex])
  const cons = useMemo(() => (ex.construction ? build(ex.construction) : null), [ex.construction])
  const done = shown >= steps.length
  const current = shown > 0 ? steps[shown - 1] : undefined

  return (
    <article className="card lesson-card example" id={ex.id}>
      <span className="pill">{ex.source}</span>
      <h3 className="card-h3">{ex.title}</h3>
      <div className={ex.figure || cons ? 'example-grid' : ''}>
        <div className="example-main">
          <p className="prompt">
            <Rich text={ex.prompt} />
          </p>
          {shown === 0 && (
            <p className="hand-note try-first">Try it yourself first, then reveal the solution one step at a time.</p>
          )}
          {shown > 0 && (
            <ol className="steps">
              {steps.slice(0, shown).map((s, i) => (
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
                <button className="btn-link" onClick={() => setShown(steps.length)}>
                  Show full solution
                </button>
              </>
            ) : (
              <button className="btn-link" onClick={() => setShown(0)}>
                Hide solution
              </button>
            )}
            <span className="step-count tabular">
              {Math.min(shown, steps.length)} / {steps.length} steps
            </span>
          </div>
        </div>
        {cons && (
          <div className="example-figure">
            <ConstructionFigure c={cons} stage={Math.max(1, shown)} maxWidth={460} />
          </div>
        )}
        {ex.figure && (
          <div className="example-figure">
            <Scene spec={ex.figure} highlight={current?.highlight} />
          </div>
        )}
      </div>
    </article>
  )
}
