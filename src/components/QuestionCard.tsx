import { useId, useRef, useState } from 'react'
import type { Question } from '../content/types'
import { checkNumeric, type Verdict } from '../lib/answers'
import { Rich } from './Rich'
import { Scene } from './Scene'
import { StepView } from './Blocks'

export type QuestionMode = 'practice' | 'quiz' | 'check'

interface Props {
  q: Question
  mode: QuestionMode
  /** practice/check: called on every attempt; quiz: called once */
  onResult?: (r: { correct: boolean; revealed?: boolean }) => void
  number?: number
}

const FEEDBACK: Record<Exclude<Verdict, 'empty'>, string> = {
  correct: 'Correct.',
  close: 'Close. Check your rounding, or the value of √3 you used.',
  wrong: 'Not yet. Check your working and try again.',
  unreadable: 'That answer could not be read. Type a number such as 16.39, 16√3 or 50*sqrt(3).',
}

export function QuestionCard({ q, mode, onResult, number }: Props) {
  const id = useId()
  const [choice, setChoice] = useState<number | null>(null)
  const [values, setValues] = useState<string[]>(() => (q.type === 'numeric' ? q.parts.map(() => '') : []))
  const [verdicts, setVerdicts] = useState<(Verdict | null)[]>(() => (q.type === 'numeric' ? q.parts.map(() => null) : []))
  const [mcqResult, setMcqResult] = useState<boolean | null>(null)
  const [hints, setHints] = useState(0)
  const [showSolution, setShowSolution] = useState(false)
  const [locked, setLocked] = useState(false)
  const inputs = useRef<(HTMLInputElement | null)[]>([])

  const allCorrect =
    q.type === 'mcq' ? mcqResult === true : verdicts.length > 0 && verdicts.every((v) => v === 'correct')

  function check() {
    if (locked) return
    if (q.type === 'mcq') {
      if (choice === null) return
      const ok = choice === q.correct
      setMcqResult(ok)
      if (mode === 'quiz') {
        setLocked(true)
        setShowSolution(true)
      }
      if (ok && mode !== 'quiz') setLocked(true)
      onResult?.({ correct: ok })
      return
    }
    const v = q.parts.map((p, i) => checkNumeric(values[i], p.answer))
    if (v.every((x) => x === 'empty')) return
    setVerdicts(v)
    const ok = v.every((x) => x === 'correct')
    if (mode === 'quiz') {
      setLocked(true)
      setShowSolution(true)
    }
    if (ok && mode !== 'quiz') setLocked(true)
    onResult?.({ correct: ok })
  }

  function reveal() {
    setShowSolution(true)
    onResult?.({ correct: false, revealed: true })
  }

  function insertRoot(i: number) {
    const el = inputs.current[i]
    const val = values[i]
    const pos = el?.selectionStart ?? val.length
    const next = val.slice(0, pos) + '√' + val.slice(pos)
    setValues((vs) => vs.map((x, j) => (j === i ? next : x)))
    requestAnimationFrame(() => {
      el?.focus()
      el?.setSelectionRange(pos + 1, pos + 1)
    })
  }

  const canHint = mode !== 'quiz' && (q.hints?.length ?? 0) > hints && !locked

  return (
    <article className={`card question ${allCorrect ? 'is-correct' : ''}`}>
      <header className="card-head">
        <span className="eyebrow">
          {number !== undefined && <>Question {number} · </>}
          {q.source ?? (mode === 'check' ? 'Check yourself' : 'Practice')}
        </span>
      </header>
      <div className={q.figure ? 'question-grid' : ''}>
        <div className="question-main">
          <p className="prompt">
            <Rich text={q.prompt} />
          </p>

          {q.type === 'mcq' && (
            <div className="options" role="radiogroup" aria-label="Answer options">
              {q.options.map((o, i) => {
                const picked = choice === i
                const state =
                  mcqResult === null || !picked
                    ? (locked || (mode === 'quiz' && mcqResult !== null)) && i === q.correct
                      ? 'is-answer'
                      : ''
                    : mcqResult
                      ? 'is-right'
                      : 'is-wrong'
                return (
                  <button
                    key={i}
                    role="radio"
                    aria-checked={picked}
                    className={`option ${picked ? 'is-picked' : ''} ${state}`}
                    disabled={locked}
                    onClick={() => {
                      setChoice(i)
                      setMcqResult(null)
                    }}
                  >
                    <span className="option-key">{String.fromCharCode(65 + i)}</span>
                    <span>
                      <Rich text={o} />
                    </span>
                  </button>
                )
              })}
            </div>
          )}

          {q.type === 'numeric' && (
            <div className="parts">
              {q.parts.map((p, i) => {
                const v = verdicts[i]
                const inputId = `${id}-p${i}`
                return (
                  <div key={i} className="part">
                    {p.label && (
                      <label htmlFor={inputId} className="part-label">
                        <Rich text={p.label} />
                      </label>
                    )}
                    <div className={`answer-input ${v ? `v-${v}` : ''}`}>
                      <input
                        id={inputId}
                        ref={(el) => {
                          inputs.current[i] = el
                        }}
                        type="text"
                        inputMode="text"
                        autoComplete="off"
                        spellCheck={false}
                        placeholder="Your answer"
                        value={values[i]}
                        disabled={locked}
                        aria-label={p.label ? undefined : 'Your answer'}
                        onChange={(e) => {
                          const val = e.target.value
                          setValues((vs) => vs.map((x, j) => (j === i ? val : x)))
                          setVerdicts((vs) => vs.map((x, j) => (j === i ? null : x)))
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') check()
                        }}
                      />
                      {p.answer.unit && <span className="unit">{p.answer.unit}</span>}
                      <button
                        type="button"
                        className="root-btn"
                        disabled={locked}
                        onClick={() => insertRoot(i)}
                        aria-label="Insert square root sign"
                      >
                        √
                      </button>
                    </div>
                    {v && v !== 'empty' && (
                      <p className={`feedback f-${v}`} role="status">
                        {FEEDBACK[v]}
                        {v === 'correct' && <> Book answer: {p.answer.display}</>}
                      </p>
                    )}
                    {mode === 'quiz' && locked && v !== 'correct' && (
                      <p className="feedback f-reveal">Answer: {p.answer.display}</p>
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {q.type === 'mcq' && mcqResult !== null && (
            <p className={`feedback ${mcqResult ? 'f-correct' : 'f-wrong'}`} role="status">
              {mcqResult ? 'Correct.' : mode === 'quiz' ? 'Not quite. The right answer is marked.' : 'Not quite. Try another option.'}
            </p>
          )}

          {hints > 0 && (
            <div className="hints">
              {q.hints!.slice(0, hints).map((h, i) => (
                <p key={i} className="hint">
                  <span className="hint-label">Hint {i + 1}</span> <Rich text={h} />
                </p>
              ))}
            </div>
          )}

          {!locked && (
            <div className="btn-row">
              <button
                className="btn btn-primary"
                onClick={check}
                disabled={q.type === 'mcq' ? choice === null : values.every((v) => !v.trim())}
              >
                {mode === 'quiz' ? 'Submit' : 'Check'}
              </button>
              {canHint && (
                <button className="btn btn-ghost" onClick={() => setHints((h) => h + 1)}>
                  {hints === 0 ? 'Show a hint' : 'Another hint'}
                </button>
              )}
              {mode !== 'quiz' && !showSolution && (
                <button className="btn btn-ghost" onClick={reveal}>
                  Show solution
                </button>
              )}
            </div>
          )}
          {locked && mode !== 'quiz' && !showSolution && (
            <div className="btn-row">
              <button className="btn btn-ghost" onClick={() => setShowSolution(true)}>
                See the worked solution
              </button>
            </div>
          )}
          {q.type === 'numeric' && !locked && (
            <p className="muted small input-help">
              You can type a decimal, a fraction, or an exact form like 16√3 or 50*sqrt(3).
            </p>
          )}

          {showSolution && (
            <div className="solution">
              <div className="solution-label">Solution</div>
              <ol className="steps">
                {q.solution.map((s, i) => (
                  <StepView key={i} step={s} index={i} />
                ))}
              </ol>
              {q.type === 'numeric' && (
                <p className="book-answer">
                  Book answer:{' '}
                  {q.parts.map((p, i) => (
                    <span key={i}>
                      {i > 0 && ', '}
                      {p.label ? <Rich text={`${p.label} ${p.answer.display}`} /> : p.answer.display}
                    </span>
                  ))}
                </p>
              )}
            </div>
          )}
        </div>
        {q.figure && (
          <div className="question-figure">
            <Scene spec={q.figure} />
          </div>
        )}
      </div>
    </article>
  )
}
