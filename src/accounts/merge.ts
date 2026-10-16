import type { LessonProgress, PracticeStatus, Tab } from '../store/progress'
import type { SavedProgress } from './types'

const RANK: Record<PracticeStatus, number> = { tried: 1, revealed: 2, correct: 3 }
const TAB_ORDER: Tab[] = ['learn', 'explore', 'examples', 'practice', 'quiz']

/** Combine two copies of one lesson's progress, keeping the better result for every item. */
export function mergeLesson(a: LessonProgress | undefined, b: LessonProgress | undefined): LessonProgress {
  if (!a) return clone(b!)
  if (!b) return clone(a)
  const seen = TAB_ORDER.filter((t) => a.seen.includes(t) || b.seen.includes(t))
  const practice: Record<string, PracticeStatus> = { ...a.practice }
  for (const [id, s] of Object.entries(b.practice)) {
    const cur = practice[id]
    if (!cur || RANK[s] > RANK[cur]) practice[id] = s
  }
  const out: LessonProgress = { seen, practice }
  const aBest = a.quizBest ?? -1
  const bBest = b.quizBest ?? -1
  if (aBest >= 0 || bBest >= 0) {
    const winner = aBest >= bBest ? a : b
    out.quizBest = winner.quizBest
    out.quizTotal = winner.quizTotal
  }
  return out
}

/** Merge local (this browser) with remote (the account). Local's "last lesson" wins, since it is the most recent. */
export function mergeProgress(local: SavedProgress, remote: SavedProgress | null): SavedProgress {
  if (!remote) return clone(local)
  const keys = new Set([...Object.keys(local.lessons), ...Object.keys(remote.lessons)])
  const lessons: Record<string, LessonProgress> = {}
  for (const k of keys) lessons[k] = mergeLesson(local.lessons[k], remote.lessons[k])
  const lastLesson = local.lastLesson ?? remote.lastLesson
  return lastLesson ? { lessons, lastLesson: { ...lastLesson } } : { lessons }
}

/**
 * Which progress to keep when someone signs in on this browser.
 * - Progress made while signed out, or by this same account: merge it in.
 * - Progress left by a different account: ignore it and load the account's own.
 */
export function progressForSignIn(
  local: SavedProgress,
  localOwner: string | undefined,
  uid: string,
  remote: SavedProgress | null,
): SavedProgress {
  if (localOwner && localOwner !== uid) return remote ? clone(remote) : { lessons: {} }
  return mergeProgress(local, remote)
}

export function sameProgress(a: SavedProgress | null, b: SavedProgress | null): boolean {
  return JSON.stringify(normalise(a)) === JSON.stringify(normalise(b))
}

/** Firestore rejects `undefined`; strip it and sort keys so comparisons are stable. */
export function normalise(p: SavedProgress | null): SavedProgress | null {
  if (!p) return null
  return JSON.parse(JSON.stringify(p, (_k, v) => (v && typeof v === 'object' && !Array.isArray(v) ? sortKeys(v) : v)))
}

function sortKeys(o: Record<string, unknown>) {
  return Object.fromEntries(
    Object.keys(o)
      .sort()
      .map((k) => [k, o[k]]),
  )
}

function clone<T>(x: T): T {
  return JSON.parse(JSON.stringify(x))
}
