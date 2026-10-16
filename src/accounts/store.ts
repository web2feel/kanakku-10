import { create } from 'zustand'
import { onPointsEvent, savedProgress, useProgress } from '../store/progress'
import { ACCOUNTS_MODE } from './config'
import { progressForSignIn, sameProgress } from './merge'
import { weekId } from './week'
import type { AccountBackend, AccountUser, PointsEvent, Profile, WeeklyEntry } from './types'

export type AccountStatus = 'off' | 'loading' | 'signed-out' | 'signed-in'
export type SyncState = 'idle' | 'saving' | 'saved' | 'error'

interface AccountState {
  status: AccountStatus
  uid?: string
  profile: Profile | null
  /** true right after a first sign-in, until a nickname is chosen */
  needsNickname: boolean
  sync: SyncState
  signInError?: string
  weekly: WeeklyEntry | null
  leaderboard: WeeklyEntry[] | null
  leaderboardError: boolean
}

export const useAccount = create<AccountState>(() => ({
  status: ACCOUNTS_MODE === 'off' ? 'off' : 'loading',
  profile: null,
  needsNickname: false,
  sync: 'idle',
  weekly: null,
  leaderboard: null,
  leaderboardError: false,
}))

let backend: AccountBackend | null = null
let started = false
/** set while we write merged progress into the local store, so it isn't echoed straight back */
let applyingRemote = false
let saveTimer: ReturnType<typeof setTimeout> | undefined
let pointsQueue: Promise<unknown> = Promise.resolve()
/** the account whose cloud progress has been merged in; saving is only safe after that */
let mergedUid: string | undefined

const SAVE_DELAY_MS = 1500

// Written against import.meta.env directly so the build drops the Firebase code when accounts are off.
const importBackend: (() => Promise<AccountBackend>) | null =
  import.meta.env.VITE_ACCOUNTS === 'off'
    ? null
    : import.meta.env.VITE_ACCOUNTS === 'mock'
      ? () => import('./mockBackend').then((m) => m.createMockBackend())
      : () => import('./firebaseBackend').then((m) => m.createFirebaseBackend())

async function loadBackend(): Promise<AccountBackend> {
  if (backend) return backend
  if (!importBackend) throw new Error('Accounts are turned off in this build.')
  backend = await importBackend()
  return backend
}

/** Start listening for sign-in. Call once at app start. Firebase loads in the background, after first paint. */
export function startAccounts() {
  if (started || ACCOUNTS_MODE === 'off') return
  started = true
  loadBackend()
    .then((b) => {
      b.onAuthChange((u) => void handleUser(u))
      useProgress.subscribe((s, prev) => {
        if (applyingRemote || useAccount.getState().status !== 'signed-in') return
        if (s.lessons === prev.lessons && s.lastLesson === prev.lastLesson) return
        scheduleSave()
      })
      onPointsEvent((e) => queuePoints(e))
      window.addEventListener('pagehide', () => void flushSave())
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') void flushSave()
      })
    })
    .catch(() => {
      // Firebase could not load (offline, blocked). Carry on with browser-only progress.
      useAccount.setState({ status: 'signed-out' })
    })
}

async function handleUser(user: AccountUser | null) {
  const b = backend!
  if (!user) {
    clearTimeout(saveTimer)
    mergedUid = undefined
    // Progress left by an account must not stay on a shared computer after sign-out.
    if (useProgress.getState().ownerUid) {
      applyingRemote = true
      useProgress.getState().replaceAll({ lessons: {} }, undefined)
      applyingRemote = false
    }
    useAccount.setState({
      status: 'signed-out',
      uid: undefined,
      profile: null,
      needsNickname: false,
      sync: 'idle',
      weekly: null,
      leaderboard: null,
    })
    return
  }

  useAccount.setState({ status: 'loading', uid: user.uid, signInError: undefined })
  try {
    const [profile, remote] = await Promise.all([b.getProfile(user.uid), b.getProgress(user.uid)])
    const local = useProgress.getState()
    const merged = progressForSignIn(savedProgress(local), local.ownerUid, user.uid, remote)
    applyingRemote = true
    useProgress.getState().replaceAll(merged, user.uid)
    applyingRemote = false
    mergedUid = user.uid
    useAccount.setState({ status: 'signed-in', profile, needsNickname: !profile, sync: 'saved' })
    if (!sameProgress(merged, remote)) scheduleSave(0)
  } catch {
    // Couldn't reach the database: stay signed in and keep working locally.
    // Nothing is saved until the merge succeeds (retried on the next change), so cloud progress is never overwritten.
    applyingRemote = false
    useAccount.setState({ status: 'signed-in', sync: 'error' })
  }
}

function scheduleSave(delay = SAVE_DELAY_MS) {
  clearTimeout(saveTimer)
  useAccount.setState({ sync: 'saving' })
  saveTimer = setTimeout(() => void flushSave(), delay)
}

async function flushSave() {
  const { status, uid, sync } = useAccount.getState()
  if (!backend || status !== 'signed-in' || !uid || sync !== 'saving') return
  clearTimeout(saveTimer)
  if (mergedUid !== uid) {
    await handleUser({ uid })
    return
  }
  try {
    await backend.saveProgress(uid, savedProgress(useProgress.getState()))
    useAccount.setState({ sync: 'saved' })
  } catch {
    useAccount.setState({ sync: 'error' })
  }
}

/** Points are applied one at a time, in order, so concurrent updates never overwrite each other. */
function queuePoints(e: PointsEvent) {
  const { status, uid, profile } = useAccount.getState()
  if (!backend || status !== 'signed-in' || !uid || !profile) return
  const b = backend
  const week = weekId()
  pointsQueue = pointsQueue
    .then(async () => {
      const entry = await b.addPoints(uid, profile.nickname, week, e)
      const best = useAccount.getState().profile?.weeks[week] ?? 0
      if (entry.points > best) {
        await b.recordWeekPoints(uid, week, entry.points)
        const p = useAccount.getState().profile
        if (p) useAccount.setState({ profile: { ...p, weeks: { ...p.weeks, [week]: entry.points } } })
      }
      useAccount.setState({ weekly: entry })
    })
    .catch(() => {
      /* a missed point is not worth interrupting the lesson for */
    })
}

export async function signInWithGoogle() {
  useAccount.setState({ signInError: undefined })
  try {
    const b = await loadBackend()
    await b.signInWithGoogle()
  } catch (e) {
    const code = (e as { code?: string }).code ?? ''
    const msg =
      code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request'
        ? undefined
        : code === 'auth/unauthorized-domain'
          ? 'Sign-in is not set up for this web address yet.'
          : code === 'auth/network-request-failed'
            ? 'Could not reach Google. Check your connection and try again.'
            : 'Sign-in did not work. Please try again.'
    useAccount.setState({ signInError: msg })
  }
}

export async function signOut() {
  await flushSave()
  await backend?.signOut()
}

export async function chooseNickname(nickname: string) {
  const { uid, profile } = useAccount.getState()
  if (!backend || !uid) return
  await backend.saveNickname(uid, nickname)
  useAccount.setState({ profile: { weeks: profile?.weeks ?? {}, nickname }, needsNickname: false })
  await backend.renameWeeklyEntry(uid, weekId(), nickname).catch(() => {})
  const w = useAccount.getState().weekly
  if (w) useAccount.setState({ weekly: { ...w, nickname } })
}

export async function loadLeaderboard() {
  const { uid, status } = useAccount.getState()
  if (!backend || status !== 'signed-in' || !uid) return
  try {
    const week = weekId()
    const [top, mine] = await Promise.all([backend.getLeaderboard(week), backend.getWeeklyEntry(uid, week)])
    useAccount.setState({ leaderboard: top, weekly: mine, leaderboardError: false })
  } catch {
    useAccount.setState({ leaderboardError: true })
  }
}
