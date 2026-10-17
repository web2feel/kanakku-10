import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { findLesson, findUnit } from '../content'
import type { Block, Lesson, Unit } from '../content/types'
import { TABS, lessonCompletion, lessonKey, useProgress, type Tab } from '../store/progress'
import { Blocks } from '../components/Blocks'
import { ExamplesReader } from '../components/ExamplesReader'
import { LessonRail, LessonsDrawer } from '../components/LessonNav'
import { useMediaQuery } from '../lib/useMediaQuery'
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
  const [drawer, setDrawer] = useState(false)
  const seen = useProgress((s) => s.lessons[key]?.seen)
  const lp = useProgress((s) => s.lessons[key])
  const markSeen = useProgress((s) => s.markSeen)
  const setLast = useProgress((s) => s.setLast)
  const top = useRef<HTMLDivElement>(null)
  const wide = useMediaQuery('(min-width: 1080px)')

  useEffect(() => {
    setLast(unit.id, lesson.id)
  }, [unit.id, lesson.id, setLast])

  useEffect(() => {
    markSeen(key, tab)
  }, [key, tab, markSeen])

  const idx = TABS.findIndex((t) => t.id === tab)
  const toTop = () => requestAnimationFrame(() => top.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  const go = (t: Tab) => {
    setTab(t)
    toTop()
  }

  const nextLesson = unit.lessons.find((l) => l.number > lesson.number && l.status === 'ready')
  const pct = Math.round(lessonCompletion(lp, lesson) * 100)

  return (
    <div className="lesson-page">
      <header className="container container-xl lesson-hero">
        <div className="lesson-hero-top">
          <button className="btn-outline lessons-btn" onClick={() => setDrawer(true)} aria-haspopup="dialog">
            <span aria-hidden="true">☰</span> Lessons
          </button>
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link to="/">Units</Link>
            <span aria-hidden="true">/</span>
            <Link to={`/unit/${unit.id}`}>
              Unit {unit.number} · {unit.title}
            </Link>
          </nav>
        </div>
        <div className="lesson-hero-main">
          <div className="lesson-hero-title">
            <span className="lesson-kicker tabular">
              Lesson {lesson.number} of {unit.lessons.length} · Pages {lesson.pages}
            </span>
            <h1 className="lesson-h1">{lesson.title}</h1>
            <p className="lesson-summary-line">{lesson.summary}</p>
          </div>
          <div className="lesson-hero-progress">
            <span className="hero-pct tabular">{pct}%</span>
            <span className="hero-pct-label">of this lesson done</span>
            <Meter value={pct / 100} label="Lesson progress" text={null} />
          </div>
        </div>
      </header>

      <div className="tabs-bar" ref={top}>
        <div className="container container-xl tabs-bar-inner">
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
                <span className="tab-num tabular">{seen?.includes(t.id) && tab !== t.id ? '✓' : i + 1}</span>
                {t.label}
              </button>
            ))}
          </div>
          <span className="tabs-hint">{TAB_HINT[tab]}</span>
        </div>
      </div>

      <div className="container container-xl lesson-body">
        <LessonRail unit={unit} current={lesson} onOpenAll={() => setDrawer(true)} />

        <div className="lesson-main">
          <section className={`panel panel-${tab}`} role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
            {tab === 'learn' && <LearnTab lesson={lesson} wide={wide} />}
            {tab === 'explore' && <ExploreTab lesson={lesson} />}
            {tab === 'examples' && <ExamplesReader examples={lesson.examples} onTop={toTop} />}
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

      <LessonsDrawer unit={unit} current={lesson} open={drawer} onClose={() => setDrawer(false)} />
    </div>
  )
}

const TAB_HINT: Record<Tab, string> = {
  learn: 'Read each card, then check yourself.',
  explore: 'Drag, slide and try things out.',
  examples: 'Try first, then reveal one step at a time.',
  practice: 'Check as often as you like. Hints are free.',
  quiz: 'One try each. Your best score is saved.',
}

/** Figures and notes sit in a margin column beside the explanation, like a textbook page. */
const MARGIN_BLOCKS = new Set<Block['t']>(['figure', 'note'])

function LearnTab({ lesson, wide }: { lesson: Lesson; wide: boolean }) {
  return (
    <div className="stack">
      {lesson.learn.map((card, i) => {
        const main = card.blocks.filter((b) => !MARGIN_BLOCKS.has(b.t))
        const margin = card.blocks.filter((b) => MARGIN_BLOCKS.has(b.t))
        const spread = wide && main.length > 0 && margin.length > 0
        return (
          <article key={card.id} className="card lesson-card learn-card">
            <span className="pill tabular">
              {i + 1} of {lesson.learn.length}
            </span>
            <h2>{card.title}</h2>
            {spread ? (
              <div className="spread">
                <div className="spread-main">
                  <Blocks blocks={main} />
                </div>
                <aside className="spread-margin">
                  <Blocks blocks={margin} />
                </aside>
              </div>
            ) : (
              <Blocks blocks={card.blocks} />
            )}
            {card.check && <QuestionCard q={card.check} mode="check" />}
          </article>
        )
      })}
    </div>
  )
}

function ExploreTab({ lesson }: { lesson: Lesson }) {
  return (
    <div className="stack">
      {lesson.explore.map((x, i) => (
        <article key={x.widget} className="card lesson-card explore-card">
          <div className={`explore-head ${x.tryThis ? 'has-try' : ''}`}>
            <div className="explore-intro">
              <span className="pill tabular">
                Tool {i + 1} of {lesson.explore.length}
              </span>
              <h2>{x.title}</h2>
              <p>
                <Rich text={x.intro} />
              </p>
            </div>
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
          </div>
          <Widget name={x.widget} />
        </article>
      ))}
    </div>
  )
}
