import { create } from 'zustand'
import { persist, createJSONStorage, type StateStorage } from 'zustand/middleware'
import type { Lesson, Unit } from '../content/types'
import type { PointsEvent, SavedProgress } from '../accounts/types'

export type Tab = 'learn' | 'explore' | 'examples' | 'practice' | 'quiz'
export const TABS: { id: Tab; label: string }[] = [
  { id: 'learn', label: 'Learn' },
  { id: 'explore', label: 'Explore' },
  { id: 'examples', label: 'Examples' },
  { id: 'practice', label: 'Practice' },
  { id: 'quiz', label: 'Quiz' },
]

export type PracticeStatus = 'correct' | 'revealed' | 'tried'

export interface LessonProgress {
  seen: Tab[]
  practice: Record<string, PracticeStatus>
  quizBest?: number
  quizTotal?: number
}

interface ProgressState {
  lessons: Record<string, LessonProgress>
  lastLesson?: { unit: string; lesson: string }
  /** account that this browser's progress belongs to; undefined while signed out */
  ownerUid?: string
  markSeen: (key: string, tab: Tab) => void
  recordPractice: (key: string, qid: string, status: PracticeStatus) => void
  recordQuiz: (key: string, score: number, total: number) => void
  setLast: (unit: string, lesson: string) => void
  reset: () => void
  /** Replace everything, e.g. after merging with the signed-in account. */
  replaceAll: (data: SavedProgress, ownerUid: string | undefined) => void
}

/** Listeners for moments that earn leaderboard points (used by the account sync). */
type PointsListener = (e: PointsEvent) => void
const pointsListeners = new Set<PointsListener>()
export function onPointsEvent(fn: PointsListener): () => void {
  pointsListeners.add(fn)
  return () => pointsListeners.delete(fn)
}
function emit(e: PointsEvent) {
  for (const fn of pointsListeners) fn(e)
}

/** localStorage can be missing or throw (private windows, embedded previews). */
const safeStorage: StateStorage = {
  getItem: (k) => {
    try {
      return window.localStorage.getItem(k)
    } catch {
      return null
    }
  },
  setItem: (k, v) => {
    try {
      window.localStorage.setItem(k, v)
    } catch {
      /* ignore */
    }
  },
  removeItem: (k) => {
    try {
      window.localStorage.removeItem(k)
    } catch {
      /* ignore */
    }
  },
}

const empty = (): LessonProgress => ({ seen: [], practice: {} })

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      lessons: {},
      markSeen: (key, tab) =>
        set((s) => {
          const lp = s.lessons[key] ?? empty()
          if (lp.seen.includes(tab)) return s
          return { lessons: { ...s.lessons, [key]: { ...lp, seen: [...lp.seen, tab] } } }
        }),
      recordPractice: (key, qid, status) => {
        const prev = get().lessons[key]?.practice[qid]
        set((s) => {
          const lp = s.lessons[key] ?? empty()
          // never downgrade a correct answer
          if (prev === 'correct') return s
          if (prev === 'revealed' && status === 'tried') return s
          return { lessons: { ...s.lessons, [key]: { ...lp, practice: { ...lp.practice, [qid]: status } } } }
        })
        // points only for a first correct answer
        if (status === 'correct' && prev !== 'correct') emit({ kind: 'solved', questionId: qid })
      },
      recordQuiz: (key, score, total) => {
        set((s) => {
          const lp = s.lessons[key] ?? empty()
          const best = Math.max(lp.quizBest ?? 0, score)
          return { lessons: { ...s.lessons, [key]: { ...lp, quizBest: best, quizTotal: total } } }
        })
        emit({ kind: 'quiz', lessonKey: key, score })
      },
      setLast: (unit, lesson) => set({ lastLesson: { unit, lesson } }),
      reset: () => set({ lessons: {}, lastLesson: undefined }),
      replaceAll: (data, ownerUid) => set({ lessons: data.lessons, lastLesson: data.lastLesson, ownerUid }),
    }),
    { name: 'tn-maths-tutor-progress', version: 1, storage: createJSONStorage(() => safeStorage) },
  ),
)

/** The part of the state that is saved to the account. */
export function savedProgress(s: Pick<ProgressState, 'lessons' | 'lastLesson'>): SavedProgress {
  return s.lastLesson ? { lessons: s.lessons, lastLesson: s.lastLesson } : { lessons: s.lessons }
}

export const lessonKey = (unitId: string, lessonId: string) => `${unitId}/${lessonId}`

/** 0..1 completion: reading 20%, practice 40%, quiz 40%. */
export function lessonCompletion(lp: LessonProgress | undefined, lesson: Lesson): number {
  if (!lp || lesson.status !== 'ready') return 0
  const read = lp.seen.includes('learn') ? 1 : 0
  const total = lesson.practice.length || 1
  const solved = lesson.practice.filter((q) => lp.practice[q.id] === 'correct').length
  const quiz = lp.quizBest && lp.quizTotal ? lp.quizBest / lp.quizTotal : 0
  return 0.2 * read + 0.4 * (solved / total) + 0.4 * quiz
}

/** Average completion across every lesson in a unit, including ones not yet written (0..1). */
export function unitCompletion(lessons: Record<string, LessonProgress | undefined>, unit: Unit): number {
  if (unit.lessons.length === 0) return 0
  return (
    unit.lessons.reduce((s, l) => s + lessonCompletion(lessons[lessonKey(unit.id, l.id)], l), 0) / unit.lessons.length
  )
}

/** Completion across all units that have at least one lesson ready (0..1). */
export function overallCompletion(lessons: Record<string, LessonProgress | undefined>, units: Unit[]): number {
  const open = units.filter((u) => u.lessons.some((l) => l.status === 'ready'))
  if (open.length === 0) return 0
  return open.reduce((s, u) => s + unitCompletion(lessons, u), 0) / open.length
}
