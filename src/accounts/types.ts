import type { LessonProgress } from '../store/progress'

/** Progress as stored in the cloud: the same shape the app keeps in the browser. */
export interface SavedProgress {
  lessons: Record<string, LessonProgress>
  lastLesson?: { unit: string; lesson: string }
}

export interface AccountUser {
  uid: string
}

export interface Profile {
  nickname: string
  /** points per week, e.g. { "2026-W42": 110 }; used for "personal best" */
  weeks: Record<string, number>
}

export interface WeeklyEntry {
  uid: string
  nickname: string
  solved: number
  quizCorrect: number
  points: number
}

/** One thing that earns points this week. */
export type PointsEvent = { kind: 'solved'; questionId: string } | { kind: 'quiz'; lessonKey: string; score: number }

/**
 * Everything the app needs from a backend. Implemented by Firebase in production
 * and by an in-memory stand-in for development and tests (VITE_ACCOUNTS=mock).
 */
export interface AccountBackend {
  onAuthChange(cb: (user: AccountUser | null) => void): () => void
  signInWithGoogle(): Promise<void>
  signOut(): Promise<void>
  getProfile(uid: string): Promise<Profile | null>
  saveNickname(uid: string, nickname: string): Promise<void>
  getProgress(uid: string): Promise<SavedProgress | null>
  saveProgress(uid: string, data: SavedProgress): Promise<void>
  /** Apply one points event to this week's entry. Returns the updated entry. */
  addPoints(uid: string, nickname: string, weekId: string, event: PointsEvent): Promise<WeeklyEntry>
  getWeeklyEntry(uid: string, weekId: string): Promise<WeeklyEntry | null>
  /** Top 10 for the week, highest points first. */
  getLeaderboard(weekId: string): Promise<WeeklyEntry[]>
  /** Keep the nickname on this week's entry in step after a rename. */
  renameWeeklyEntry(uid: string, weekId: string, nickname: string): Promise<void>
  recordWeekPoints(uid: string, weekId: string, points: number): Promise<void>
}
