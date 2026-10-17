import { useState } from 'react'
import type { ChainQuestion } from '../content/types'
import { order } from '../lib/shuffle'
import type { QuestionMode } from './QuestionCard'
import { Rich, Tex } from './Rich'

interface Props {
  q: ChainQuestion
  mode: QuestionMode
  /** show every line (solution revealed) */
  revealed: boolean
  /** a wrong line was picked (in a quiz, each slip is recorded as a missed line) */
  onMiss: () => void
  /** the last line is in place; `misses` counts the steps that needed a second go */
  onDone: (misses: number) => void
}

/** The first step at or after `from` that the student has to choose, or the number of steps if none is left. */
function nextOpen(q: ChainQuestion, from: number) {
  let i = from
  while (i < q.steps.length && !q.steps[i].wrong?.length) i++
  return i
}

/**
 * An identity proof built one line at a time. Each open line offers the right next step and a few
 * plausible slips; picking the right one fills it in and moves on.
 */
export function ChainProof({ q, mode, revealed, onMiss, onDone }: Props) {
  const [at, setAt] = useState(() => nextOpen(q, 0))
  const [rejected, setRejected] = useState<Record<number, number[]>>({})
  const [missed, setMissed] = useState<number[]>([])
  const [slip, setSlip] = useState(false)

  const done = at >= q.steps.length
  const shown = revealed || done ? q.steps.length : at

  function pick(i: number, k: number) {
    if (k === 0) {
      setSlip(false)
      const next = nextOpen(q, i + 1)
      setAt(next)
      if (next >= q.steps.length) onDone(missed.length)
      return
    }
    onMiss()
    if (mode === 'quiz') {
      // one go per line in a quiz: the right line is filled in and the proof carries on
      const m = [...missed, i]
      setMissed(m)
      setSlip(true)
      const next = nextOpen(q, i + 1)
      setAt(next)
      if (next >= q.steps.length) onDone(m.length)
      return
    }
    setSlip(true)
    setRejected((r) => ({ ...r, [i]: [...(r[i] ?? []), k] }))
  }

  const open = !done && !revealed ? q.steps[at] : null
  const choices = open ? [open.tex, ...open.wrong!] : []

  return (
    <div className="chain">
      <dl className="proof-meta">
        {q.given && (
          <>
            <dt>Given</dt>
            <dd>
              <Rich text={q.given} />
            </dd>
          </>
        )}
        <dt>To prove</dt>
        <dd>
          <Tex tex={q.toProve} />
        </dd>
      </dl>
      <ol className="chain-lines">
        <li className="chain-line is-start">
          <span className="chain-eq" aria-hidden="true" />
          <span className="chain-expr">
            <Tex tex={`\\displaystyle ${q.start}`} />
          </span>
        </li>
        {q.steps.slice(0, shown).map((s, i) => (
          <li
            key={i}
            className={`chain-line ${missed.includes(i) ? 'is-missed' : s.wrong?.length && i < at ? 'is-chosen' : ''}`}
          >
            <span className="chain-eq">=</span>
            <span className="chain-expr">
              <Tex tex={`\\displaystyle ${s.tex}`} />
            </span>
            {s.why && (
              <span className="chain-why">
                <Rich text={s.why} />
              </span>
            )}
          </li>
        ))}
        {open && (
          <li className="chain-line is-open">
            <span className="chain-eq">=</span>
            <div className="chain-choices" role="group" aria-label={`Choose line ${at + 2}`}>
              {order(choices.length, `${q.id}:${at}`).map((k) => {
                const no = rejected[at]?.includes(k)
                return (
                  <button
                    key={k}
                    type="button"
                    className={`chain-choice ${no ? 'is-wrong' : ''}`}
                    disabled={no}
                    onClick={() => pick(at, k)}
                  >
                    <Tex tex={`\\displaystyle ${choices[k]}`} />
                  </button>
                )
              })}
            </div>
          </li>
        )}
      </ol>
      {!revealed && slip && !done && mode !== 'quiz' && (
        <p className="feedback f-wrong" role="status">
          That line does not follow from the one above. Try another.
        </p>
      )}
      {!done && !revealed && slip && mode === 'quiz' && (
        <p className="feedback f-wrong" role="status">
          Not that one. The right line is filled in, shaded.
        </p>
      )}
      {done && missed.length === 0 && (
        <p className="feedback f-correct" role="status">
          Proved. You have reached the other side.
        </p>
      )}
      {done && missed.length > 0 && (
        <p className="feedback f-wrong" role="status">
          Not quite. The shaded {missed.length === 1 ? 'line was the step' : 'lines were the steps'} you missed.
        </p>
      )}
    </div>
  )
}
