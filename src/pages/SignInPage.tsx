import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { chooseNickname, signInWithGoogle, useAccount } from '../accounts/store'
import { NICKNAME_MAX, nicknameProblem, suggestNicknames } from '../accounts/nickname'
import { ACCOUNTS_ENABLED } from '../accounts/config'

/** Two steps: sign in with Google, then (first time only) pick a nickname for the leaderboard. */
export function SignInPage() {
  const status = useAccount((s) => s.status)
  const needsNickname = useAccount((s) => s.needsNickname)
  const error = useAccount((s) => s.signInError)
  const navigate = useNavigate()
  const [busy, setBusy] = useState(false)

  const step = status === 'signed-in' && needsNickname ? 2 : 1

  // Returning students skip the nickname step.
  useEffect(() => {
    if (status === 'signed-in' && !needsNickname) navigate('/me', { replace: true })
  }, [status, needsNickname, navigate])

  if (!ACCOUNTS_ENABLED) {
    return (
      <div className="container signin-page">
        <div className="signin-card">
          <h2>Sign-in is not available here</h2>
          <p className="muted">Your progress is saved in this browser.</p>
          <Link className="btn-primary btn-sm" to="/">
            Back to all units →
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container signin-page">
      <div className="signin-intro">
        <h1 className="signin-h1">
          Your maths, your progress, <span className="highlight">one place.</span>
        </h1>
        <p className="intro">
          Sign in to save your progress across devices and see where you stand on this week's leaderboard.
        </p>
        <ol className="signin-steps">
          <li>
            <span className="bg-peach">1</span>Sign in with Google
          </li>
          <li>
            <span className="bg-lilac">2</span>Pick a nickname for the leaderboard
          </li>
        </ol>
      </div>

      <div className="signin-card">
        <div className="step-dots" aria-label={`Step ${step} of 2`}>
          <span className={step >= 1 ? 'is-done' : ''} />
          <span className={step >= 2 ? 'is-done' : ''} />
        </div>

        {step === 1 ? (
          <>
            <div className="signin-head">
              <span className="hand-note signin-note">vanakkam!</span>
              <h2>Sign in to Kanakku</h2>
            </div>
            <button
              className="provider-btn"
              disabled={busy || status === 'loading'}
              onClick={async () => {
                setBusy(true)
                await signInWithGoogle()
                setBusy(false)
              }}
            >
              <GoogleMark />
              <span className="provider-label">
                {busy || status === 'loading' ? 'Signing in…' : 'Continue with Google'}
              </span>
              <span className="provider-arrow" aria-hidden="true">
                →
              </span>
            </button>
            {error && (
              <p className="feedback f-wrong" role="alert">
                {error}
              </p>
            )}
            <div className="or-line">
              <span />
              or
              <span />
            </div>
            <Link className="skip-option" to="/">
              <span className="skip-title">Continue without signing in</span>
              <span className="skip-text">Progress stays on this device and you won't appear on the leaderboard.</span>
            </Link>
            <p className="privacy-note">
              We only use your account to save progress. Other students see your nickname, never your name or email. If
              you are under 18, ask a parent or guardian before signing in.
            </p>
          </>
        ) : (
          <NicknameStep onDone={() => navigate('/me', { replace: true })} />
        )}
      </div>
    </div>
  )
}

function NicknameStep({ onDone }: { onDone: () => void }) {
  const [seed, setSeed] = useState(() => Math.floor(Math.random() * 1000))
  const ideas = suggestNicknames(seed)
  const [nick, setNick] = useState('')
  const [saving, setSaving] = useState(false)
  const [failed, setFailed] = useState(false)
  const problem = nick ? nicknameProblem(nick) : null

  async function save() {
    if (nicknameProblem(nick)) return
    setSaving(true)
    setFailed(false)
    try {
      await chooseNickname(nick.trim())
      onDone()
    } catch {
      setFailed(true)
      setSaving(false)
    }
  }

  return (
    <form
      className="nickname-step"
      onSubmit={(e) => {
        e.preventDefault()
        void save()
      }}
    >
      <div className="signin-head">
        <span className="hand-note signin-note">almost there</span>
        <h2>Pick a nickname</h2>
        <p className="muted">This is what other students see on the leaderboard. You can change it later.</p>
      </div>
      <label className="nick-field">
        <span className="nick-avatar" aria-hidden="true">
          {(nick.trim()[0] ?? '?').toUpperCase()}
        </span>
        <input
          id="nickname"
          value={nick}
          onChange={(e) => setNick(e.target.value.slice(0, NICKNAME_MAX))}
          placeholder="Your nickname"
          maxLength={NICKNAME_MAX}
          autoComplete="off"
          spellCheck={false}
          aria-label="Nickname"
          aria-invalid={!!problem}
          autoFocus
        />
      </label>
      {problem && <p className="field-error">{problem}</p>}
      <div className="ideas">
        <span className="ideas-label">Need an idea?</span>
        <div className="chip-row">
          {ideas.map((i) => (
            <button
              key={i}
              type="button"
              className={`idea-chip ${nick === i ? 'is-on' : ''}`}
              onClick={() => setNick(i)}
            >
              {i}
            </button>
          ))}
          <button type="button" className="idea-chip is-more" onClick={() => setSeed((s) => s + 1)}>
            ↻ More
          </button>
        </div>
      </div>
      <span className="nick-help">Up to {NICKNAME_MAX} characters: letters, numbers and _. Keep it kind.</span>
      {failed && (
        <p className="feedback f-wrong" role="alert">
          Could not save your nickname. Check your connection and try again.
        </p>
      )}
      <button className="btn-primary" type="submit" disabled={saving || !nick || !!problem}>
        {saving ? 'Saving…' : 'Start learning →'}
      </button>
    </form>
  )
}

/** Google's "G" mark, as Google asks sign-in buttons to show it. */
function GoogleMark() {
  return (
    <span className="provider-mark" aria-hidden="true">
      <svg viewBox="0 0 48 48" width="20" height="20">
        <path
          fill="#FFC107"
          d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"
        />
        <path
          fill="#FF3D00"
          d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
        />
        <path
          fill="#4CAF50"
          d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"
        />
        <path
          fill="#1976D2"
          d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"
        />
      </svg>
    </span>
  )
}
