import type { NumericAnswer } from '../content/types'
import {
  create,
  evaluateDependencies,
  addDependencies,
  subtractDependencies,
  multiplyDependencies,
  divideDependencies,
  powDependencies,
  sqrtDependencies,
  unaryMinusDependencies,
  piDependencies,
} from 'mathjs'

// A small math.js instance: arithmetic, powers, square roots and pi are all students need to type.
const { evaluate } = create({
  evaluateDependencies,
  addDependencies,
  subtractDependencies,
  multiplyDependencies,
  divideDependencies,
  powDependencies,
  sqrtDependencies,
  unaryMinusDependencies,
  piDependencies,
})

const DEG = Math.PI / 180

/** Functions students may type. Trig functions take degrees, as in the textbook. */
const scope = {
  sin: (d: number) => Math.sin(d * DEG),
  cos: (d: number) => Math.cos(d * DEG),
  tan: (d: number) => Math.tan(d * DEG),
  cot: (d: number) => 1 / Math.tan(d * DEG),
  sec: (d: number) => 1 / Math.cos(d * DEG),
  cosec: (d: number) => 1 / Math.sin(d * DEG),
  csc: (d: number) => 1 / Math.sin(d * DEG),
}

/**
 * Turn what a student types into a number.
 * Accepts: 16.39, 16√3, 50*sqrt(3), (√3+1)/2, 3/4, 45°, "24 m", 2,078.4
 */
export function parseStudentNumber(raw: string): number | null {
  let s = raw.trim()
  if (!s) return null
  s = s
    .replace(/[−–]/g, '-')
    .replace(/[×·]/g, '*')
    .replace(/÷/g, '/')
    .replace(/°/g, '')
    .replace(/(\d),(\d{3})/g, '$1$2') // thousands separators
    .replace(/\b(km\/hr|km\/h|m\/s|ft\/min|feet\/min|km|cm|mm|m|feet|ft|seconds|second|sec|s|deg|degrees)\s*$/i, '')
    .trim()
  // √3, √(3), 2√3  →  sqrt(3), 2*sqrt(3)
  s = s.replace(/(\d|\))\s*√/g, '$1*√')
  s = s.replace(/√\s*\(([^()]*)\)/g, 'sqrt($1)')
  s = s.replace(/√\s*([\d.]+)/g, 'sqrt($1)')
  // implicit multiplication like 2sqrt(3) or 2pi
  s = s.replace(/(\d)\s*(sqrt|pi|sin|cos|tan|cot|sec|cosec)/g, '$1*$2')
  if (!/^[\d\s.+\-*/^()a-z]*$/i.test(s)) return null
  try {
    const v = evaluate(s, { ...scope })
    const n = typeof v === 'number' ? v : Number(v)
    return Number.isFinite(n) ? n : null
  } catch {
    return null
  }
}

/** Default tolerance: generous enough for √3 ≈ 1.732 and 2-decimal rounding. */
export function toleranceFor(ans: NumericAnswer): number {
  if (ans.tol !== undefined) return ans.tol
  return Math.max(0.011, Math.abs(ans.value) * 0.006)
}

export type Verdict = 'empty' | 'unreadable' | 'correct' | 'close' | 'wrong'

export function checkNumeric(raw: string, ans: NumericAnswer): Verdict {
  if (!raw.trim()) return 'empty'
  const n = parseStudentNumber(raw)
  if (n === null) return 'unreadable'
  const diff = Math.abs(n - ans.value)
  const tol = toleranceFor(ans)
  if (diff <= tol) return 'correct'
  if (diff <= tol * 4) return 'close'
  return 'wrong'
}
