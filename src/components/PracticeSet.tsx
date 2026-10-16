import { useState } from 'react'
import type { Question } from '../content/types'
import { useProgress, type PracticeStatus } from '../store/progress'
import { QuestionCard } from './QuestionCard'

const EMPTY: Record<string, PracticeStatus> = {}

/** Practice questions shown one at a time, with a dot strip showing progress. */
export function PracticeSet({ questions, lessonKey }: { questions: Question[]; lessonKey: string }) {
  const [i, setI] = useState(0)
  const practice = useProgress((s) => s.lessons[lessonKey]?.practice ?? EMPTY)
  const record = useProgress((s) => s.recordPractice)
  const q = questions[i]
  const solved = questions.filter((x) => practice[x.id] === 'correct').length

  return (
    <div className="practice">
      <div className="practice-bar">
        <div className="dots" role="tablist" aria-label="Questions">
          {questions.map((x, j) => (
            <button
              key={x.id}
              role="tab"
              aria-selected={j === i}
              aria-label={`Question ${j + 1}${practice[x.id] === 'correct' ? ', solved' : ''}`}
              className={`dot ${j === i ? 'is-current' : ''} ${practice[x.id] ? `s-${practice[x.id]}` : ''}`}
              onClick={() => setI(j)}
            >
              {j + 1}
            </button>
          ))}
        </div>
        <span className="solved-count tabular">
          {solved} of {questions.length} solved
        </span>
      </div>

      <QuestionCard
        key={q.id}
        q={q}
        number={i + 1}
        mode="practice"
        onResult={({ correct, revealed }) =>
          record(lessonKey, q.id, correct ? 'correct' : revealed ? 'revealed' : 'tried')
        }
      />

      <div className="pager">
        <button className="btn-text" disabled={i === 0} onClick={() => setI(i - 1)}>
          ← Previous
        </button>
        <button className="btn-text" disabled={i === questions.length - 1} onClick={() => setI(i + 1)}>
          Next question →
        </button>
      </div>
    </div>
  )
}
