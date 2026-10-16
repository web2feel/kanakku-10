import { useState } from 'react'
import type { Question } from '../content/types'
import { useProgress } from '../store/progress'
import { QuestionCard } from './QuestionCard'
import { Meter } from './Meter'

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
      <article className="card quiz-intro">
        <span className="hand-note ready-note">ready when you are</span>
        <h2>Lesson quiz</h2>
        <p>
          {questions.length} questions. One try each, no hints. You'll see the explanation after every answer, and your
          best score is saved.
        </p>
        {best !== undefined && (
          <p className="muted tabular">
            Your best so far: <b>{best}</b> / {questions.length}
          </p>
        )}
        <button className="btn-primary btn-sm" onClick={start}>
          Start the quiz →
        </button>
      </article>
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
      <article className="card quiz-done">
        <div className="score-block tabular" aria-label={`Score ${score} out of ${questions.length}`}>
          <span className="score-big">{score}</span>
          <span className="score-of">/{questions.length}</span>
        </div>
        <p className="score-msg">{message}</p>
        <ol className="review">
          {questions.map((q, j) => (
            <li key={q.id} className={results[j] ? 'r-right' : 'r-wrong'}>
              {results[j] ? '✓' : '✗'} Question {j + 1}
            </li>
          ))}
        </ol>
        <button className="btn-primary btn-sm" onClick={start}>
          Try again
        </button>
      </article>
    )
  }

  const q = questions[i]
  return (
    <div className="quiz">
      <Meter
        className="quiz-meter-row"
        value={(i + (answered ? 1 : 0)) / questions.length}
        label="Quiz progress"
        text={null}
      />
      <div className="quiz-status tabular">
        <span>
          Question {i + 1} of {questions.length}
        </span>
        <span>Score {score}</span>
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
          <button className="btn-primary btn-sm" onClick={next}>
            {i < questions.length - 1 ? 'Next question →' : 'See my score'}
          </button>
        </div>
      )}
    </div>
  )
}
