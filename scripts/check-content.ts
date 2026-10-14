/**
 * Content checks: run with `npm run check:content`.
 * - every question id is unique
 * - every MCQ has a valid correct option
 * - every numeric answer's printed "book answer" agrees with its stored value
 * - the answer parser accepts the usual ways students type answers
 */
import { UNITS } from '../src/content'
import { checkNumeric, parseStudentNumber } from '../src/lib/answers'
import type { Question } from '../src/content/types'

let failures = 0
const fail = (msg: string) => {
  failures++
  console.error('  ✗ ' + msg)
}

const ids = new Set<string>()
let count = 0
for (const unit of UNITS) {
  for (const lesson of unit.lessons) {
    if (lesson.status !== 'ready') continue
    const qs: Question[] = [
      ...lesson.practice,
      ...lesson.quiz,
      ...lesson.learn.flatMap((c) => (c.check ? [c.check] : [])),
    ]
    for (const q of qs) {
      count++
      if (ids.has(q.id)) fail(`duplicate id ${q.id}`)
      ids.add(q.id)
      if (q.type === 'mcq') {
        if (q.correct < 0 || q.correct >= q.options.length) fail(`${q.id}: correct index out of range`)
      } else {
        for (const p of q.parts) {
          // take the first number-like chunk of the display text, e.g. "16.39 m" → 16.39, "5/12" → 5/12
          const m = p.answer.display.match(/^[\d.,/√()+\-* ]+/)
          if (!m) continue
          const v = checkNumeric(m[0].trim(), p.answer)
          if (v !== 'correct') fail(`${q.id}: display "${p.answer.display}" gives ${v} against value ${p.answer.value}`)
        }
      }
    }
    for (const ex of lesson.examples) {
      if (ids.has(ex.id)) fail(`duplicate id ${ex.id}`)
      ids.add(ex.id)
    }
  }
}

const parserCases: [string, number][] = [
  ['16√3', 16 * Math.sqrt(3)],
  ['16 √3 m', 16 * Math.sqrt(3)],
  ['50*sqrt(3)', 50 * Math.sqrt(3)],
  ['(√3+1)/2', (Math.sqrt(3) + 1) / 2],
  ['√(3)', Math.sqrt(3)],
  ['45°', 45],
  ['24 m', 24],
  ['2,078.4', 2078.4],
  ['5/12', 5 / 12],
  ['tan(60)', Math.sqrt(3)],
  ['29.28 m/s', 29.28],
  ['−5', -5],
]
for (const [input, want] of parserCases) {
  const got = parseStudentNumber(input)
  if (got === null || Math.abs(got - want) > 1e-9) fail(`parser: "${input}" gave ${got}, expected ${want}`)
}
if (parseStudentNumber('hello') !== null) fail('parser accepted "hello"')

console.log(`Checked ${count} questions and ${parserCases.length} parser cases.`)
if (failures) {
  console.error(`${failures} problem(s) found.`)
  process.exit(1)
}
console.log('All good.')
