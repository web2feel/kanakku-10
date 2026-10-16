/** Weeks run Monday 00:00 to Sunday 23:59 India time (IST, UTC+5:30), named by ISO week: "2026-W42". */
const IST_OFFSET_MS = (5 * 60 + 30) * 60 * 1000

export function weekId(now: Date = new Date()): string {
  // Shift to IST, then use the UTC calendar fields as IST wall-clock fields.
  const d = new Date(now.getTime() + IST_OFFSET_MS)
  const day = d.getUTCDay() || 7 // Monday = 1 … Sunday = 7
  // ISO week: the week containing the Thursday of this week
  const thursday = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + 4 - day))
  const yearStart = Date.UTC(thursday.getUTCFullYear(), 0, 1)
  const week = Math.ceil(((thursday.getTime() - yearStart) / 86400000 + 1) / 7)
  return `${thursday.getUTCFullYear()}-W${String(week).padStart(2, '0')}`
}

export const WEEK_ID_PATTERN = /^\d{4}-W\d{2}$/

export const POINTS_PER_SOLVED = 10
export const POINTS_PER_QUIZ_ANSWER = 5

export function pointsFor(solved: number, quizCorrect: number): number {
  return solved * POINTS_PER_SOLVED + quizCorrect * POINTS_PER_QUIZ_ANSWER
}
