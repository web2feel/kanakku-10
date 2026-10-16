import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { findLesson, findUnit } from '../content'
import type { Lesson, Unit } from '../content/types'
import { TABS, lessonCompletion, lessonKey, useProgress, type Tab } from '../store/progress'
import { Blocks } from '../components/Blocks'
import { ExampleCard } from '../components/ExampleCard'
import { PracticeSet } from '../components/PracticeSet'
import { QuizRunner } from '../components/QuizRunner'
import { QuestionCard } from '../components/QuestionCard'
import { Meter } from '../components/Meter'
import { Rich } from '../components/Rich'
import { Widget } from '../widgets'
import { NotFound } from './NotFound'

export function LessonPage() {
  const { unitId, lessonId } = useParams()
  const unit = findUnit(unitId)
  const lesson = findLesson(unit, lessonId)
  if (!unit || !lesson || lesson.status !== 'ready') return <NotFound />
  return <LessonView key={lesson.id} unit={unit} lesson={lesson} />
}

function LessonView({ unit, lesson }: { unit: Unit; lesson: Lesson }) {
  const key = lessonKey(unit.id, lesson.id)
  const [tab, setTab] = useState<Tab>('learn')
  const seen = useProgress((s) => s.lessons[key]?.seen)
  const lp = useProgress((s) => s.lessons[key])
  const lessons = useProgress((s) => s.lessons)
  const markSeen = useProgress((s) => s.markSeen)
  const setLast = useProgress((s) => s.setLast)
  const top = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setLast(unit.id, lesson.id)
  }, [unit.id, lesson.id, setLast])

  useEffect(() => {
    markSeen(key, tab)
  }, [key, tab, markSeen])

  const idx = TABS.findIndex((t) => t.id === tab)
  const go = (t: Tab) => {
    setTab(t)
    requestAnimationFrame(() => top.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  const readyLessons = unit.lessons
  const nextLesson = unit.lessons.find((l) => l.number > lesson.number && l.status === 'ready')

  return (
    <div className="container container-wide lesson-layout">
      <aside className="lesson-side" aria-label="Lessons in this unit">
        <Link to={`/unit/${unit.id}`} className="side-unit">
          <span className="side-unit-label">Unit {unit.number}</span>
          <span className="side-unit-title">{unit.title}</span>
        </Link>
        <ol className="side-list">
          {readyLessons.map((l) => {
            const ready = l.status === 'ready'
            const cls = `side-item ${l.id === lesson.id ? 'is-current' : ''} ${ready ? '' : 'is-soon'}`
            const pct = Math.round(lessonCompletion(lessons[lessonKey(unit.id, l.id)], l) * 100)
            return (
              <li key={l.id}>
                {ready ? (
                  <Link
                    className={cls}
                    to={`/unit/${unit.id}/${l.id}`}
                    aria-current={l.id === lesson.id ? 'page' : undefined}
                  >
                    <span className="side-num tabular">{l.number}</span>
                    <span className="side-title">{l.title}</span>
                    <span className="side-pct tabular">{pct}%</span>
                  </Link>
                ) : (
                  <span className={cls}>
                    <span className="side-num tabular">{l.number}</span>
                    <span className="side-title">{l.title}</span>
                    <span className="side-pct">soon</span>
                  </span>
                )}
              </li>
            )
          })}
        </ol>
      </aside>

      <div className="lesson-main" ref={top}>
        <header className="lesson-head">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link to="/">Units</Link>
            <span aria-hidden="true">/</span>
            <Link to={`/unit/${unit.id}`}>Unit {unit.number}</Link>
            <span aria-hidden="true">/</span>
            <span>
              Lesson {lesson.number} · Pages {lesson.pages}
            </span>
          </nav>
          <h1 className="lesson-h1">{lesson.title}</h1>
          <Meter value={lessonCompletion(lp, lesson)} label="Lesson progress" />
        </header>

        <div className="tabs" role="tablist" aria-label="Lesson sections">
          {TABS.map((t, i) => (
            <button
              key={t.id}
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={tab === t.id}
              aria-controls={`panel-${t.id}`}
              className={`tab ${tab === t.id ? 'is-active' : ''} ${seen?.includes(t.id) ? 'is-seen' : ''}`}
              onClick={() => go(t.id)}
            >
              <span className="tab-num tabular">{i + 1}</span>
              {t.label}
            </button>
          ))}
        </div>

        <section className="panel" role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
          {tab === 'learn' && <LearnTab lesson={lesson} />}
          {tab === 'explore' && <ExploreTab lesson={lesson} />}
          {tab === 'examples' && (
            <div className="stack">
              {lesson.examples.map((ex) => (
                <ExampleCard key={ex.id} ex={ex} />
              ))}
            </div>
          )}
          {tab === 'practice' && <PracticeSet questions={lesson.practice} lessonKey={key} />}
          {tab === 'quiz' && <QuizRunner questions={lesson.quiz} lessonKey={key} />}
        </section>

        <nav className="tab-nav" aria-label="Next and previous section">
          {idx > 0 ? (
            <button className="btn-text" onClick={() => go(TABS[idx - 1].id)}>
              ← {TABS[idx - 1].label}
            </button>
          ) : (
            <span />
          )}
          {idx < TABS.length - 1 ? (
            <button className="btn-primary" onClick={() => go(TABS[idx + 1].id)}>
              Next: {TABS[idx + 1].label} →
            </button>
          ) : nextLesson ? (
            <Link className="btn-primary" to={`/unit/${unit.id}/${nextLesson.id}`}>
              Next lesson: {nextLesson.title} →
            </Link>
          ) : (
            <Link className="btn-primary" to={`/unit/${unit.id}`}>
              Back to the unit →
            </Link>
          )}
        </nav>
      </div>
    </div>
  )
}

function LearnTab({ lesson }: { lesson: Lesson }) {
  return (
    <div className="stack">
      {lesson.learn.map((card, i) => (
        <article key={card.id} className="card lesson-card">
          <span className="pill tabular">
            {i + 1} of {lesson.learn.length}
          </span>
          <h2>{card.title}</h2>
          <Blocks blocks={card.blocks} />
          {card.check && <QuestionCard q={card.check} mode="check" />}
        </article>
      ))}
    </div>
  )
}

function ExploreTab({ lesson }: { lesson: Lesson }) {
  return (
    <div className="stack">
      {lesson.explore.map((x, i) => (
        <article key={x.widget} className="card lesson-card explore-card">
          <span className="pill tabular">
            Tool {i + 1} of {lesson.explore.length}
          </span>
          <h2>{x.title}</h2>
          <p>
            <Rich text={x.intro} />
          </p>
          <Widget name={x.widget} />
          {x.tryThis && (
            <div className="try">
              <span className="try-label">try this</span>
              <ul>
                {x.tryThis.map((t, i) => (
                  <li key={i}>
                    <Rich text={t} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </article>
      ))}
    </div>
  )
}
