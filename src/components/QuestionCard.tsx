import { useId, useRef, useState } from 'react'
import type { NumericAnswer, Question } from '../content/types'
import { checkNumeric, type Verdict } from '../lib/answers'
import { checkMatrix, emptyGrid, matrixTex } from '../lib/matrix'
import { Rich, Tex } from './Rich'
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

const MATRIX_FEEDBACK: Record<Exclude<Verdict, 'empty'>, string> = {
  correct: 'Correct.',
  close: 'Nearly. The shaded entries are not right yet.',
  wrong: 'Not yet. The shaded entries are not right yet.',
  unreadable: 'Some entries could not be read. Type numbers such as 7, -3, 8/3 or 4√2.',
}

/** Worst verdict across a set of cells or parts. */
function overall(vs: Verdict[]): Verdict {
  if (vs.every((v) => v === 'correct')) return 'correct'
  if (vs.some((v) => v === 'unreadable')) return 'unreadable'
  if (vs.every((v) => v === 'empty')) return 'empty'
  if (vs.every((v) => v === 'correct' || v === 'close')) return 'close'
  return 'wrong'
}

function numericDisplay(parts: { label?: string; answer: NumericAnswer }[]) {
  return parts.map((p) => (p.label ? `${p.label} ${p.answer.display}` : p.answer.display)).join(', ')
}

export function QuestionCard({ q, mode, onResult, number }: Props) {
  const id = useId()
  const [choice, setChoice] = useState<number | null>(null)
  const [values, setValues] = useState<string[]>(() => (q.type === 'numeric' ? q.parts.map(() => '') : []))
  const [verdicts, setVerdicts] = useState<(Verdict | null)[]>(() =>
    q.type === 'numeric' ? q.parts.map(() => null) : [],
  )
  const [grids, setGrids] = useState<string[][][]>(() =>
    q.type === 'matrix' ? q.parts.map((p) => emptyGrid(p.answer)) : [],
  )
  const [cellVerdicts, setCellVerdicts] = useState<(Verdict[][] | null)[]>(() =>
    q.type === 'matrix' ? q.parts.map(() => null) : [],
  )
  const [mcqResult, setMcqResult] = useState<boolean | null>(null)
  /** which alternative answer set the student matched, if not the main one */
  const [altHit, setAltHit] = useState<number | null>(null)
  const [hints, setHints] = useState(0)
  const [showSolution, setShowSolution] = useState(false)
  const [locked, setLocked] = useState(false)
  const inputs = useRef<(HTMLInputElement | null)[]>([])

  const allCorrect =
    q.type === 'mcq'
      ? mcqResult === true
      : q.type === 'numeric'
        ? verdicts.length > 0 && verdicts.every((v) => v === 'correct')
        : cellVerdicts.length > 0 && cellVerdicts.every((g) => g !== null && overall(g.flat()) === 'correct')

  const nothingTyped =
    q.type === 'numeric'
      ? values.every((v) => !v.trim())
      : q.type === 'matrix'
        ? grids.every((g) => g.flat().every((v) => !v.trim()))
        : choice === null

  function finish(ok: boolean) {
    if (mode === 'quiz') {
      setLocked(true)
      setShowSolution(true)
    }
    if (ok && mode !== 'quiz') setLocked(true)
    onResult?.({ correct: ok })
  }

  function check() {
    if (locked || nothingTyped) return
    if (q.type === 'mcq') {
      const ok = choice === q.correct
      setMcqResult(ok)
      finish(ok)
      return
    }
    if (q.type === 'matrix') {
      const v = q.parts.map((p, i) => checkMatrix(grids[i], p.answer))
      setCellVerdicts(v)
      finish(v.every((g) => overall(g.flat()) === 'correct'))
      return
    }
    let v = q.parts.map((p, i) => checkNumeric(values[i], p.answer))
    let hit: number | null = null
    if (!v.every((x) => x === 'correct')) {
      // another complete answer set may match, e.g. x, y = 2, 4 instead of 4, 2
      ;(q.alternatives ?? []).forEach((alt, k) => {
        const av = alt.map((a, i) => checkNumeric(values[i], a))
        if (hit === null && av.every((x) => x === 'correct')) {
          v = av
          hit = k
        }
      })
    }
    setAltHit(hit)
    setVerdicts(v)
    finish(v.every((x) => x === 'correct'))
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
    <article
      className={`qcard ${mode === 'check' ? 'check-box' : 'card'} ${allCorrect ? 'is-correct' : ''}`}
      aria-label={mode === 'check' ? 'Check yourself' : number !== undefined ? `Question ${number}` : undefined}
    >
      {mode === 'check' ? (
        <span className="check-label">check yourself</span>
      ) : (
        <header className="qcard-head">
          <span className="pill">{q.source ?? (mode === 'quiz' ? 'Quiz' : 'Practice')}</span>
          {number !== undefined && <span className="qcard-num">Question {number}</span>}
        </header>
      )}
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
                        {v === 'correct' && (
                          <> Book answer: {altHit !== null ? q.alternatives![altHit][i].display : p.answer.display}</>
                        )}
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

          {q.type === 'matrix' && (
            <div className="parts">
              {q.parts.map((p, pi) => {
                const cv = cellVerdicts[pi]
                const v = cv ? overall(cv.flat()) : null
                const cols = p.answer.cells[0].length
                const rows = p.answer.cells.length
                return (
                  <div key={pi} className="part">
                    {p.label && (
                      <span className="part-label">
                        <Rich text={p.label} />
                      </span>
                    )}
                    <div
                      className="matrix-input"
                      role="group"
                      aria-label={`${rows} by ${cols} matrix`}
                      style={{ gridTemplateColumns: `repeat(${cols}, minmax(52px, 76px))` }}
                    >
                      {p.answer.cells.map((row, i) =>
                        row.map((_, j) => {
                          const cvij = cv?.[i][j]
                          return (
                            <input
                              key={`${i}-${j}`}
                              className={`matrix-cell ${cvij && cvij !== 'empty' ? `v-${cvij === 'close' ? 'wrong' : cvij}` : ''}`}
                              type="text"
                              inputMode="text"
                              autoComplete="off"
                              spellCheck={false}
                              aria-label={`Row ${i + 1}, column ${j + 1}`}
                              value={grids[pi][i][j]}
                              disabled={locked}
                              onChange={(e) => {
                                const val = e.target.value
                                setGrids((gs) =>
                                  gs.map((g, k) =>
                                    k === pi ? g.map((r, a) => r.map((x, b) => (a === i && b === j ? val : x))) : g,
                                  ),
                                )
                                setCellVerdicts((vs) => vs.map((x, k) => (k === pi ? null : x)))
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') check()
                              }}
                            />
                          )
                        }),
                      )}
                    </div>
                    {v && v !== 'empty' && (
                      <p className={`feedback f-${v}`} role="status">
                        {MATRIX_FEEDBACK[v]}
                      </p>
                    )}
                    {mode === 'quiz' && locked && v !== 'correct' && (
                      <p className="feedback f-reveal">
                        Answer: <Tex tex={matrixTex(p.answer.cells)} />
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {q.type === 'mcq' && mcqResult !== null && (
            <p className={`feedback ${mcqResult ? 'f-correct' : 'f-wrong'}`} role="status">
              {mcqResult
                ? 'Correct.'
                : mode === 'quiz'
                  ? 'Not quite. The right answer is marked.'
                  : 'Not quite. Try another option.'}
            </p>
          )}

          {hints > 0 && (
            <div className="hints">
              {q.hints!.slice(0, hints).map((h, i) => (
                <div key={i} className="hint">
                  <span className="hint-label">hint {i + 1}</span>
                  <p>
                    <Rich text={h} />
                  </p>
                </div>
              ))}
            </div>
          )}

          {!locked && (
            <div className="btn-row">
              <button className="btn-dark" onClick={check} disabled={nothingTyped}>
                Check
              </button>
              {canHint && (
                <button className="btn-link" onClick={() => setHints((h) => h + 1)}>
                  {hints === 0 ? 'Show a hint' : 'Another hint'}
                </button>
              )}
              {mode !== 'quiz' && !showSolution && (
                <button className="btn-link" onClick={reveal}>
                  Show solution
                </button>
              )}
            </div>
          )}
          {locked && mode !== 'quiz' && !showSolution && (
            <div className="btn-row">
              <button className="btn-link" onClick={() => setShowSolution(true)}>
                See the worked solution
              </button>
            </div>
          )}
          {q.type === 'numeric' && !locked && (
            <p className="input-help">You can type a decimal, a fraction, or an exact form like 16√3 or 50*sqrt(3).</p>
          )}
          {q.type === 'matrix' && !locked && (
            <p className="input-help">One number in each box. Fractions and roots are fine: 8/3, -3/2, 4√2.</p>
          )}

          {showSolution && (
            <div className="solution">
              <span className="solution-label">solution</span>
              <ol className="steps">
                {q.solution.map((s, i) => (
                  <StepView key={i} step={s} index={i} />
                ))}
              </ol>
              {q.type === 'numeric' && (
                <p className="book-answer">
                  Book answer: <Rich text={numericDisplay(q.parts)} />
                  {q.alternatives?.map((alt, k) => (
                    <span key={k}>
                      {' '}
                      or <Rich text={numericDisplay(alt.map((answer, i) => ({ label: q.parts[i].label, answer })))} />
                    </span>
                  ))}
                </p>
              )}
              {q.type === 'matrix' && (
                <p className="book-answer">
                  Book answer:{' '}
                  {q.parts.map((p, i) => (
                    <span key={i}>
                      {i > 0 && ', '}
                      {p.label && <Rich text={`${p.label} `} />}
                      <Tex tex={matrixTex(p.answer.cells)} />
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
