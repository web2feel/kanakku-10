/**
 * Tests for the account helpers: run with `npm run test:accounts`.
 * (Firestore security rules have their own tests in scripts/test-rules.ts, run against the emulator in CI.)
 */
import assert from 'node:assert/strict'
import { mergeLesson, mergeProgress, progressForSignIn, sameProgress } from '../src/accounts/merge'
import { weekId, pointsFor } from '../src/accounts/week'
import { nicknameProblem, suggestNicknames, NICKNAME_POOL } from '../src/accounts/nickname'
import type { SavedProgress } from '../src/accounts/types'

let n = 0
const test = (name: string, fn: () => void) => {
  fn()
  n++
  console.log('  ✓ ' + name)
}

console.log('merge')
test('keeps the better practice result and never downgrades correct', () => {
  const m = mergeLesson(
    { seen: ['learn'], practice: { a: 'correct', b: 'tried', c: 'revealed' } },
    { seen: ['quiz', 'learn'], practice: { a: 'tried', b: 'revealed', d: 'correct' } },
  )
  assert.deepEqual(m.practice, { a: 'correct', b: 'revealed', c: 'revealed', d: 'correct' })
  assert.deepEqual(m.seen, ['learn', 'quiz'])
})
test('takes the higher quiz best with its total', () => {
  assert.deepEqual(
    mergeLesson(
      { seen: [], practice: {}, quizBest: 5, quizTotal: 8 },
      { seen: [], practice: {}, quizBest: 7, quizTotal: 8 },
    ),
    { seen: [], practice: {}, quizBest: 7, quizTotal: 8 },
  )
  assert.equal(mergeLesson({ seen: [], practice: {} }, { seen: [], practice: {} }).quizBest, undefined)
})
test('unions lessons and prefers the local last lesson', () => {
  const local: SavedProgress = {
    lessons: { x: { seen: ['learn'], practice: {} } },
    lastLesson: { unit: 'u', lesson: 'x' },
  }
  const remote: SavedProgress = {
    lessons: { y: { seen: ['quiz'], practice: {} } },
    lastLesson: { unit: 'u', lesson: 'y' },
  }
  const m = mergeProgress(local, remote)
  assert.deepEqual(Object.keys(m.lessons).sort(), ['x', 'y'])
  assert.equal(m.lastLesson?.lesson, 'x')
  assert.equal(mergeProgress({ lessons: {} }, remote).lastLesson?.lesson, 'y')
})
test('signing in merges anonymous or same-account progress', () => {
  const local: SavedProgress = { lessons: { x: { seen: ['learn'], practice: { q: 'correct' } } } }
  const remote: SavedProgress = { lessons: { y: { seen: ['learn'], practice: {} } } }
  assert.deepEqual(Object.keys(progressForSignIn(local, undefined, 'me', remote).lessons).sort(), ['x', 'y'])
  assert.deepEqual(Object.keys(progressForSignIn(local, 'me', 'me', remote).lessons).sort(), ['x', 'y'])
  assert.deepEqual(Object.keys(progressForSignIn(local, undefined, 'me', null).lessons), ['x'])
})
test('signing in ignores progress left by a different account', () => {
  const local: SavedProgress = { lessons: { x: { seen: ['learn'], practice: { q: 'correct' } } } }
  const remote: SavedProgress = { lessons: { y: { seen: ['learn'], practice: {} } } }
  assert.deepEqual(Object.keys(progressForSignIn(local, 'someone-else', 'me', remote).lessons), ['y'])
  assert.deepEqual(progressForSignIn(local, 'someone-else', 'me', null), { lessons: {} })
})
test('sameProgress ignores key order and undefined fields', () => {
  assert.ok(
    sameProgress(
      { lessons: { a: { seen: [], practice: { p: 'tried', q: 'correct' }, quizBest: undefined } } },
      { lessons: { a: { practice: { q: 'correct', p: 'tried' }, seen: [] } } },
    ),
  )
  assert.ok(!sameProgress({ lessons: {} }, null))
})

console.log('weeks (IST, Monday start)')
test('Monday 00:00 IST starts a new week', () => {
  // 2026-10-18 is a Sunday; Monday 2026-10-19 00:00 IST is 2026-10-18 18:30 UTC
  assert.equal(weekId(new Date('2026-10-18T18:29:59Z')), weekId(new Date('2026-10-12T00:00:00+05:30')))
  assert.notEqual(weekId(new Date('2026-10-18T18:30:00Z')), weekId(new Date('2026-10-18T18:29:59Z')))
  assert.equal(weekId(new Date('2026-10-19T00:00:00+05:30')), '2026-W43')
})
test('ISO week numbers across the new year', () => {
  assert.equal(weekId(new Date('2026-01-01T12:00:00+05:30')), '2026-W01')
  assert.equal(weekId(new Date('2027-01-01T12:00:00+05:30')), '2026-W53')
  assert.equal(weekId(new Date('2027-01-04T12:00:00+05:30')), '2027-W01')
})
test('points: 10 per solved, 5 per quiz answer', () => {
  assert.equal(pointsFor(8, 6), 110)
})

console.log('nicknames')
test('accepts letters, digits and underscores, 2 to 16 characters', () => {
  assert.equal(nicknameProblem('chalk_ninja'), null)
  assert.equal(nicknameProblem('RightAngleRavi'), null)
  assert.ok(nicknameProblem('a'))
  assert.ok(nicknameProblem('x'.repeat(17)))
  assert.ok(nicknameProblem('has space'))
  assert.ok(nicknameProblem('emoji🙂'))
})
test('every suggestion is valid, and suggestions vary', () => {
  for (const nick of NICKNAME_POOL) assert.equal(nicknameProblem(nick), null, nick)
  assert.equal(new Set(suggestNicknames(1)).size, 5)
  assert.notDeepEqual(suggestNicknames(1), suggestNicknames(2))
})

console.log(`${n} tests passed.`)
