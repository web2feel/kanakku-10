/**
 * Firebase web config for the Kanakku project. These values identify the project; they are not secrets.
 * Access is controlled by firestore.rules and by the authorised domains list in Firebase Authentication.
 * Any value can be overridden with a VITE_FIREBASE_* environment variable.
 */
const env = import.meta.env

export const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY ?? 'AIzaSyBxCfIrXRLemBm46mnjxEeN0ICKCNI50Lc',
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN ?? 'easylearning-179c5.firebaseapp.com',
  projectId: env.VITE_FIREBASE_PROJECT_ID ?? 'easylearning-179c5',
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET ?? 'easylearning-179c5.firebasestorage.app',
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? '657921920422',
  appId: env.VITE_FIREBASE_APP_ID ?? '1:657921920422:web:38ac2a3adae9ed42e95367',
  // No measurementId: Firebase Analytics is deliberately not used (students are minors).
}

/**
 * firebase: real sign-in and sync (default)
 * mock:     an in-memory stand-in with a sample leaderboard, for development (`npm run dev:mock`)
 * off:      no accounts at all; progress stays in the browser (used for the single-file preview)
 */
export type AccountsMode = 'firebase' | 'mock' | 'off'
const raw = env.VITE_ACCOUNTS
export const ACCOUNTS_MODE: AccountsMode = raw === 'mock' || raw === 'off' ? raw : 'firebase'
export const ACCOUNTS_ENABLED = ACCOUNTS_MODE !== 'off'
