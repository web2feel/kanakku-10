import { pointsFor } from './week'
import type { AccountBackend, AccountUser, Profile, SavedProgress, WeeklyEntry } from './types'

/**
 * In-memory stand-in for Firebase, for development and screenshots (VITE_ACCOUNTS=mock).
 * "Sign in with Google" signs in a fixed test student instantly. The leaderboard has sample classmates.
 * Data lives in sessionStorage so a reload keeps it.
 */
const KEY = 'kanakku-mock-backend'
const SAMPLE: [string, number, number][] = [
  ['pi_pirate', 14, 15],
  ['sinCosTan', 13, 12],
  ['MathsMagpie', 12, 11],
  ['hypotenuse_hero', 11, 8],
  ['kolam_queen', 10, 8],
  ['theta_tiger', 9, 7],
  ['CaptainCosine', 9, 4],
  ['angle_annie', 7, 6],
  ['RightAngleRavi', 6, 7],
  ['decimal_dosa', 5, 6],
  ['radian_rocket', 4, 3],
]

interface MockData {
  signedIn: boolean
  profiles: Record<string, Profile>
  progress: Record<string, SavedProgress>
  entries: Record<string, Record<string, WeeklyEntry & { solvedIds: string[]; quizBest: Record<string, number> }>>
}

function load(): MockData {
  try {
    const raw = sessionStorage.getItem(KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    /* ignore */
  }
  return { signedIn: false, profiles: {}, progress: {}, entries: {} }
}

export function createMockBackend(): AccountBackend {
  const data = load()
  const save = () => {
    try {
      sessionStorage.setItem(KEY, JSON.stringify(data))
    } catch {
      /* ignore */
    }
  }
  const listeners = new Set<(u: AccountUser | null) => void>()
  const user = (): AccountUser | null => (data.signedIn ? { uid: 'mock-student' } : null)
  const notify = () => listeners.forEach((l) => l(user()))
  const wait = () => new Promise((r) => setTimeout(r, 120))
  const week = (weekId: string) => {
    if (!data.entries[weekId]) {
      data.entries[weekId] = {}
      SAMPLE.forEach(([nickname, solved, quizCorrect], i) => {
        const uid = `sample-${i}`
        data.entries[weekId][uid] = {
          uid,
          nickname,
          solved,
          quizCorrect,
          points: pointsFor(solved, quizCorrect),
          solvedIds: [],
          quizBest: {},
        }
      })
    }
    return data.entries[weekId]
  }
  const plain = ({ uid, nickname, solved, quizCorrect, points }: WeeklyEntry): WeeklyEntry => ({
    uid,
    nickname,
    solved,
    quizCorrect,
    points,
  })

  return {
    onAuthChange(cb) {
      listeners.add(cb)
      setTimeout(() => cb(user()), 0)
      return () => listeners.delete(cb)
    },
    async signInWithGoogle() {
      await wait()
      data.signedIn = true
      save()
      notify()
    },
    async signOut() {
      data.signedIn = false
      save()
      notify()
    },
    async getProfile(uid) {
      await wait()
      return data.profiles[uid] ?? null
    },
    async saveNickname(uid, nickname) {
      data.profiles[uid] = { ...(data.profiles[uid] ?? { weeks: {} }), nickname }
      save()
    },
    async getProgress(uid) {
      await wait()
      return data.progress[uid] ? JSON.parse(JSON.stringify(data.progress[uid])) : null
    },
    async saveProgress(uid, p) {
      data.progress[uid] = JSON.parse(JSON.stringify(p))
      save()
    },
    async addPoints(uid, nickname, weekId, event) {
      const w = week(weekId)
      const e = w[uid] ?? { uid, nickname, solved: 0, quizCorrect: 0, points: 0, solvedIds: [], quizBest: {} }
      if (event.kind === 'solved' && !e.solvedIds.includes(event.questionId)) e.solvedIds.push(event.questionId)
      if (event.kind === 'quiz') e.quizBest[event.lessonKey] = Math.max(e.quizBest[event.lessonKey] ?? 0, event.score)
      e.nickname = nickname
      e.solved = e.solvedIds.length
      e.quizCorrect = Object.values(e.quizBest).reduce((a, b) => a + b, 0)
      e.points = pointsFor(e.solved, e.quizCorrect)
      w[uid] = e
      save()
      return plain(e)
    },
    async getWeeklyEntry(uid, weekId) {
      const e = week(weekId)[uid]
      return e ? plain(e) : null
    },
    async getLeaderboard(weekId) {
      await wait()
      return Object.values(week(weekId))
        .sort((a, b) => b.points - a.points)
        .slice(0, 10)
        .map(plain)
    },
    async renameWeeklyEntry(uid, weekId, nickname) {
      const e = week(weekId)[uid]
      if (e) e.nickname = nickname
      save()
    },
    async recordWeekPoints(uid, weekId, points) {
      const p = data.profiles[uid]
      if (p) p.weeks = { ...p.weeks, [weekId]: points }
      save()
    },
  }
}
