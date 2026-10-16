/**
 * Firestore security rules tests. Needs the Firestore emulator (Java), so it runs in CI:
 *   npm run test:rules
 * which wraps this script in `firebase emulators:exec`.
 */
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { assertFails, assertSucceeds, initializeTestEnvironment } from '@firebase/rules-unit-testing'
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore'

const WEEK = '2026-W42'

async function main() {
  const env = await initializeTestEnvironment({
    projectId: 'demo-kanakku',
    firestore: { rules: readFileSync('firestore.rules', 'utf8') },
  })
  const asUser = (uid: string) => env.authenticatedContext(uid).firestore()
  const anon = env.unauthenticatedContext().firestore()

  const entry = (o: Partial<Record<string, unknown>> = {}) => ({
    nickname: 'chalk_ninja',
    solved: 1,
    quizCorrect: 0,
    points: 10,
    solvedIds: { 'l1-p1': true },
    quizBest: {},
    updatedAt: serverTimestamp(),
    ...o,
  })

  let n = 0
  const test = async (name: string, fn: () => Promise<unknown>) => {
    await env.clearFirestore()
    await fn()
    n++
    console.log('  ✓ ' + name)
  }

  console.log('profiles')
  await test('a student can create and read their own profile', async () => {
    const db = asUser('alice')
    await assertSucceeds(
      setDoc(doc(db, 'users/alice'), { nickname: 'chalk_ninja', createdAt: serverTimestamp(), weeks: {} }),
    )
    await assertSucceeds(getDoc(doc(db, 'users/alice')))
  })
  await test('nobody can read someone else’s profile', async () => {
    await env.withSecurityRulesDisabled((c) =>
      setDoc(doc(c.firestore(), 'users/alice'), { nickname: 'chalk_ninja', weeks: {} }),
    )
    await assertFails(getDoc(doc(asUser('bob'), 'users/alice')))
    await assertFails(getDoc(doc(anon, 'users/alice')))
  })
  await test('nicknames must be 2–16 letters, digits or _', async () => {
    const db = asUser('alice')
    for (const bad of ['a', 'x'.repeat(17), 'has space', '<script>']) {
      await assertFails(setDoc(doc(db, 'users/alice'), { nickname: bad, createdAt: serverTimestamp(), weeks: {} }))
    }
  })
  await test('no extra fields such as email can be stored', async () => {
    await assertFails(
      setDoc(doc(asUser('alice'), 'users/alice'), {
        nickname: 'chalk_ninja',
        createdAt: serverTimestamp(),
        weeks: {},
        email: 'a@b.c',
      }),
    )
  })
  await test('a student can rename and record a week’s points', async () => {
    const db = asUser('alice')
    await setDoc(doc(db, 'users/alice'), { nickname: 'chalk_ninja', createdAt: serverTimestamp(), weeks: {} })
    await assertSucceeds(updateDoc(doc(db, 'users/alice'), { nickname: 'pi_pirate' }))
    await assertSucceeds(updateDoc(doc(db, 'users/alice'), { [`weeks.${WEEK}`]: 110 }))
  })

  console.log('progress')
  await test('a student can save and read their own progress', async () => {
    const db = asUser('alice')
    const data = {
      lessons: { 'trigonometry/ratios': { seen: ['learn'], practice: { 'l1-p1': 'correct' } } },
      updatedAt: serverTimestamp(),
    }
    await assertSucceeds(setDoc(doc(db, 'progress/alice'), data))
    await assertSucceeds(getDoc(doc(db, 'progress/alice')))
  })
  await test('nobody can read or write someone else’s progress', async () => {
    await env.withSecurityRulesDisabled((c) => setDoc(doc(c.firestore(), 'progress/alice'), { lessons: {} }))
    await assertFails(getDoc(doc(asUser('bob'), 'progress/alice')))
    await assertFails(setDoc(doc(asUser('bob'), 'progress/alice'), { lessons: {}, updatedAt: serverTimestamp() }))
    await assertFails(getDoc(doc(anon, 'progress/alice')))
  })

  console.log('weekly leaderboard')
  await test('signed-in students can read the board; signed-out visitors cannot', async () => {
    await env.withSecurityRulesDisabled((c) =>
      setDoc(doc(c.firestore(), `weeklyPoints/${WEEK}/entries/bob`), { nickname: 'pi_pirate', points: 50 }),
    )
    const q = query(collection(asUser('alice'), 'weeklyPoints', WEEK, 'entries'), orderBy('points', 'desc'), limit(10))
    const snap = await assertSucceeds(getDocs(q))
    assert.equal(snap.size, 1)
    await assertFails(getDocs(query(collection(anon, 'weeklyPoints', WEEK, 'entries'), limit(10))))
  })
  await test('a first solve creates an entry worth 10 points', async () => {
    await assertSucceeds(setDoc(doc(asUser('alice'), `weeklyPoints/${WEEK}/entries/alice`), entry()))
  })
  await test('points must match solved × 10 + quiz answers × 5', async () => {
    await assertFails(setDoc(doc(asUser('alice'), `weeklyPoints/${WEEK}/entries/alice`), entry({ points: 500 })))
  })
  await test('solved must match the list of solved questions', async () => {
    await assertFails(setDoc(doc(asUser('alice'), `weeklyPoints/${WEEK}/entries/alice`), entry({ solvedIds: {} })))
  })
  await test('only one new question per update', async () => {
    const db = asUser('alice')
    await setDoc(doc(db, `weeklyPoints/${WEEK}/entries/alice`), entry())
    await assertSucceeds(
      setDoc(
        doc(db, `weeklyPoints/${WEEK}/entries/alice`),
        entry({ solved: 2, points: 20, solvedIds: { 'l1-p1': true, 'l1-p2': true } }),
      ),
    )
    await assertFails(
      setDoc(
        doc(db, `weeklyPoints/${WEEK}/entries/alice`),
        entry({ solved: 4, points: 40, solvedIds: { 'l1-p1': true, 'l1-p2': true, a: true, b: true } }),
      ),
    )
  })
  await test('a quiz adds at most 10 answers, tied to a quiz', async () => {
    const db = asUser('alice')
    await setDoc(doc(db, `weeklyPoints/${WEEK}/entries/alice`), entry())
    await assertSucceeds(
      setDoc(
        doc(db, `weeklyPoints/${WEEK}/entries/alice`),
        entry({ quizCorrect: 7, points: 45, quizBest: { trigonometry__ratios: 7 } }),
      ),
    )
    await assertFails(
      setDoc(doc(db, `weeklyPoints/${WEEK}/entries/alice`), entry({ quizCorrect: 7, points: 45, quizBest: {} })),
    )
  })
  await test('points never go down, and entries cannot be deleted', async () => {
    const db = asUser('alice')
    await setDoc(doc(db, `weeklyPoints/${WEEK}/entries/alice`), entry())
    await assertFails(
      setDoc(doc(db, `weeklyPoints/${WEEK}/entries/alice`), entry({ solved: 0, points: 0, solvedIds: {} })),
    )
    await assertFails(deleteDoc(doc(db, `weeklyPoints/${WEEK}/entries/alice`)))
  })
  await test('nobody can write another student’s entry', async () => {
    await assertFails(setDoc(doc(asUser('bob'), `weeklyPoints/${WEEK}/entries/alice`), entry()))
  })
  await test('week ids must look like 2026-W42', async () => {
    await assertFails(setDoc(doc(asUser('alice'), 'weeklyPoints/forever/entries/alice'), entry()))
  })

  await env.cleanup()
  console.log(`${n} rules tests passed.`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
