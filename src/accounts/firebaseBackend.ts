import { initializeApp } from 'firebase/app'
import {
  GoogleAuthProvider,
  browserLocalPersistence,
  getAuth,
  onAuthStateChanged,
  setPersistence,
  signInWithPopup,
  signInWithRedirect,
  signOut as fbSignOut,
} from 'firebase/auth'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import { firebaseConfig } from './config'
import { normalise } from './merge'
import { pointsFor } from './week'
import type { AccountBackend, PointsEvent, Profile, SavedProgress, WeeklyEntry } from './types'

/*
  Data layout (see firestore.rules):
    users/{uid}                          { nickname, createdAt, weeks: { "2026-W42": 110 } }
    progress/{uid}                       { lessons, lastLesson?, updatedAt }
    weeklyPoints/{weekId}/entries/{uid}  { nickname, solved, quizCorrect, points, solvedIds, quizBest, updatedAt }
  Names and email addresses are never written to the database.
*/

export function createFirebaseBackend(): AccountBackend {
  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  const db = getFirestore(app)
  const provider = new GoogleAuthProvider()
  provider.setCustomParameters({ prompt: 'select_account' })
  void setPersistence(auth, browserLocalPersistence)

  const entryRef = (weekId: string, uid: string) => doc(db, 'weeklyPoints', weekId, 'entries', uid)
  const toEntry = (uid: string, d: Record<string, unknown>): WeeklyEntry => ({
    uid,
    nickname: String(d.nickname ?? ''),
    solved: Number(d.solved ?? 0),
    quizCorrect: Number(d.quizCorrect ?? 0),
    points: Number(d.points ?? 0),
  })

  return {
    onAuthChange(cb) {
      return onAuthStateChanged(auth, (u) => cb(u ? { uid: u.uid } : null))
    },

    async signInWithGoogle() {
      try {
        await signInWithPopup(auth, provider)
      } catch (e) {
        const code = (e as { code?: string }).code
        // Some phones and in-app browsers block pop-ups; fall back to a full-page redirect.
        if (code === 'auth/popup-blocked' || code === 'auth/operation-not-supported-in-this-environment') {
          await signInWithRedirect(auth, provider)
          return
        }
        throw e
      }
    },

    async signOut() {
      await fbSignOut(auth)
    },

    async getProfile(uid) {
      const snap = await getDoc(doc(db, 'users', uid))
      if (!snap.exists()) return null
      const d = snap.data()
      return { nickname: String(d.nickname ?? ''), weeks: (d.weeks as Profile['weeks']) ?? {} }
    },

    async saveNickname(uid, nickname) {
      const ref = doc(db, 'users', uid)
      const snap = await getDoc(ref)
      if (snap.exists()) await updateDoc(ref, { nickname })
      else await setDoc(ref, { nickname, createdAt: serverTimestamp(), weeks: {} })
    },

    async getProgress(uid) {
      const snap = await getDoc(doc(db, 'progress', uid))
      if (!snap.exists()) return null
      const d = snap.data()
      return normalise({ lessons: d.lessons ?? {}, ...(d.lastLesson ? { lastLesson: d.lastLesson } : {}) })
    },

    async saveProgress(uid, data: SavedProgress) {
      await setDoc(doc(db, 'progress', uid), { ...normalise(data), updatedAt: serverTimestamp() })
    },

    async addPoints(uid, nickname, weekId, event: PointsEvent) {
      const ref = entryRef(weekId, uid)
      return runTransaction(db, async (tx) => {
        const snap = await tx.get(ref)
        const d = snap.exists() ? snap.data() : {}
        const solvedIds: Record<string, true> = { ...((d.solvedIds as Record<string, true>) ?? {}) }
        const quizBest: Record<string, number> = { ...((d.quizBest as Record<string, number>) ?? {}) }
        if (event.kind === 'solved') solvedIds[event.questionId] = true
        else quizBest[quizKey(event.lessonKey)] = Math.max(quizBest[quizKey(event.lessonKey)] ?? 0, event.score)
        const solved = Object.keys(solvedIds).length
        const quizCorrect = Object.values(quizBest).reduce((a, b) => a + b, 0)
        const next = { nickname, solved, quizCorrect, points: pointsFor(solved, quizCorrect), solvedIds, quizBest }
        tx.set(ref, { ...next, updatedAt: serverTimestamp() })
        return { uid, nickname, solved, quizCorrect, points: next.points }
      })
    },

    async getWeeklyEntry(uid, weekId) {
      const snap = await getDoc(entryRef(weekId, uid))
      return snap.exists() ? toEntry(uid, snap.data()) : null
    },

    async getLeaderboard(weekId) {
      const q = query(collection(db, 'weeklyPoints', weekId, 'entries'), orderBy('points', 'desc'), limit(10))
      const snap = await getDocs(q)
      return snap.docs.map((s) => toEntry(s.id, s.data()))
    },

    async renameWeeklyEntry(uid, weekId, nickname) {
      const ref = entryRef(weekId, uid)
      const snap = await getDoc(ref)
      if (snap.exists()) await updateDoc(ref, { nickname, updatedAt: serverTimestamp() })
    },

    async recordWeekPoints(uid, weekId, points) {
      await updateDoc(doc(db, 'users', uid), { [`weeks.${weekId}`]: points })
    },
  }
}

/** Firestore map keys can't contain "/" in field paths; lesson keys look like "trigonometry/ratios". */
function quizKey(lessonKey: string) {
  return lessonKey.replace(/\//g, '__')
}
