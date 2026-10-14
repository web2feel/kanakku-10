import { useState } from 'react'
import type { Question } from '../content/types'
import { useProgress } from '../store/progress'
import { QuestionCard } from './QuestionCard'

type Phase = 'intro' | 'running' | 'done'

/** A short scored quiz: one attempt per question, no hints, explanation after each answer. */
export function QuizRunner({ questions, lessonKey }: { questions: Question[]; lessonKey: string }) {
  const [phase, setPhase] = useState<Phase>('intro')
  const [i, setI] = useState(0)
  const [results, setResults] = useState<(boolean | null)[]>(() => questions.map(() => null))
  const [round, setRound] = useState(0)
  const best = useProgress((s) => s.lessons[lessonKey]?.quizBest)
  const recordQuiz = useProgress((s) => s.recordQuiz)

  const score = results.filter(Boolean).length
  const answered = results[i] !== null

  function start() {
    setResults(questions.map(() => null))
    setI(0)
    setRound((r) => r + 1)
    setPhase('running')
  }

  function next() {
    if (i < questions.length - 1) setI(i + 1)
    else {
      recordQuiz(lessonKey, score, questions.length)
      setPhase('done')
    }
  }

  if (phase === 'intro') {
    return (
      <div className="card quiz-intro">
        <h3>Lesson quiz</h3>
        <p>
          {questions.length} questions. One try each, no hints. You'll see the explanation after every answer, and your
          best score is saved.
        </p>
        {best !== undefined && (
          <p className="muted tabular">
            Your best so far: {best} / {questions.length}
          </p>
        )}
        <div className="btn-row">
          <button className="btn btn-primary" onClick={start}>
            Start the quiz
          </button>
        </div>
      </div>
    )
  }

  if (phase === 'done') {
    const pct = Math.round((score / questions.length) * 100)
    const message =
      pct === 100
        ? 'Full marks. You are ready for the next lesson.'
        : pct >= 70
          ? 'Good work. Look back at the questions you missed, then try again for full marks.'
          : 'Go back over the Learn and Examples tabs, then take the quiz again.'
    return (
      <div className="card quiz-done">
        <div className="score-big tabular">
          {score}
          <span>/{questions.length}</span>
        </div>
        <p>{message}</p>
        <ol className="review">
          {questions.map((q, j) => (
            <li key={q.id} className={results[j] ? 'r-right' : 'r-wrong'}>
              <span>{results[j] ? '✓' : '✗'}</span> Question {j + 1}
            </li>
          ))}
        </ol>
        <div className="btn-row">
          <button className="btn btn-primary" onClick={start}>
            Try again
          </button>
        </div>
      </div>
    )
  }

  const q = questions[i]
  return (
    <div className="quiz">
      <div className="quiz-progress" aria-hidden="true">
        <div className="quiz-progress-fill" style={{ width: `${((i + (answered ? 1 : 0)) / questions.length) * 100}%` }} />
      </div>
      <div className="practice-bar">
        <span className="muted small tabular">
          Question {i + 1} of {questions.length}
        </span>
        <span className="muted small tabular">Score {score}</span>
      </div>
      <QuestionCard
        key={`${round}-${q.id}`}
        q={q}
        mode="quiz"
        number={i + 1}
        onResult={({ correct }) => setResults((r) => r.map((x, j) => (j === i ? correct : x)))}
      />
      {answered && (
        <div className="pager pager-end">
          <button className="btn btn-primary" onClick={next}>
            {i < questions.length - 1 ? 'Next question →' : 'See my score'}
          </button>
        </div>
      )}
    </div>
  )
}
