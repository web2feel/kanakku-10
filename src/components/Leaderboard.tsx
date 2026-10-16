import { useEffect, useState } from 'react'
import { chooseNickname, loadLeaderboard, useAccount } from '../accounts/store'
import { NICKNAME_MAX, nicknameProblem } from '../accounts/nickname'
import { POINTS_PER_QUIZ_ANSWER, POINTS_PER_SOLVED, weekId } from '../accounts/week'
import type { WeeklyEntry } from '../accounts/types'

const PASTELS = [
  'var(--color-peach)',
  'var(--color-lilac)',
  'var(--color-sky)',
  'var(--color-mintwash)',
  'var(--color-butter)',
]
const PODIUM = ['var(--color-sun)', 'var(--color-mintwash)', 'var(--color-peach)']

/** This week's top 10 on Kanakku. Friendly mode: no rank below 10 is ever shown. */
export function Leaderboard() {
  const uid = useAccount((s) => s.uid)
  const profile = useAccount((s) => s.profile)
  const board = useAccount((s) => s.leaderboard)
  const mine = useAccount((s) => s.weekly)
  const failed = useAccount((s) => s.leaderboardError)

  useEffect(() => {
    void loadLeaderboard()
  }, [])
  // refresh when this student's own points change
  useEffect(() => {
    if (mine && board && !board.some((e) => e.uid === mine.uid && e.points === mine.points)) void loadLeaderboard()
  }, [mine, board])

  const nickname = profile?.nickname ?? ''
  const rows = board ?? []
  const inTop = rows.some((e) => e.uid === uid)
  const myPoints = mine?.points ?? 0
  const tenth = rows.length >= 10 ? rows[9].points : 0
  const gap = Math.max(POINTS_PER_QUIZ_ANSWER, tenth - myPoints + POINTS_PER_QUIZ_ANSWER)

  const week = weekId()
  const pastBest = Math.max(
    0,
    ...Object.entries(profile?.weeks ?? {})
      .filter(([w]) => w !== week)
      .map(([, p]) => p),
  )
  const best =
    myPoints > 0
      ? pastBest > 0 && myPoints > pastBest
        ? `${myPoints} points this week, ${myPoints - pastBest} more than your last best week.`
        : pastBest === 0
          ? `${myPoints} points this week, your best week so far.`
          : null
      : null

  return (
    <section className="board" aria-labelledby="board-h">
      <div className="board-head">
        <div className="stack" style={{ gap: 4 }}>
          <span className="hand-note board-note">this week on Kanakku</span>
          <h2 id="board-h">Leaderboard</h2>
        </div>
        <div className="pill-row">
          <span className="pill board-pill">Resets Monday</span>
          <span className="pill board-pill is-lilac">
            {POINTS_PER_SOLVED} pts per practice solved · {POINTS_PER_QUIZ_ANSWER} pts per quiz answer
          </span>
        </div>
      </div>

      <NicknameRow nickname={nickname} />

      {failed && !board ? (
        <p className="feedback f-wrong">
          Could not load the leaderboard.{' '}
          <button className="link-btn" onClick={() => void loadLeaderboard()}>
            Try again
          </button>
        </p>
      ) : !board ? (
        <p className="muted">Loading this week's leaderboard…</p>
      ) : rows.length === 0 ? (
        <div className="board-empty">
          <span className="hand-note">fresh week!</span>
          <p>No points yet this week. Solve a practice question to get on the board first.</p>
        </div>
      ) : (
        <>
          <div className="podium">
            {rows.slice(0, 3).map((e, i) => (
              <div
                key={e.uid}
                className={`podium-card ${i === 0 ? 'is-first' : ''} ${e.uid === uid ? 'is-me' : ''}`}
                style={{ background: PODIUM[i] }}
              >
                <span className="podium-rank">{i + 1}</span>
                <span className="podium-name">{e.uid === uid ? `You · ${e.nickname}` : e.nickname}</span>
                <span className="podium-pts tabular">{e.points} pts</span>
                <span className="podium-detail">{detail(e)}</span>
              </div>
            ))}
          </div>
          {rows.length > 3 && (
            <ol className="board-rows" start={4}>
              {rows.slice(3).map((e, i) => (
                <Row key={e.uid} e={e} rank={i + 4} me={e.uid === uid} avatar={PASTELS[(i + 3) % 5]} />
              ))}
            </ol>
          )}
        </>
      )}

      {board && !inTop && (
        <div className="you-card">
          <span className="board-avatar is-me" aria-hidden="true">
            {(nickname[0] ?? '?').toUpperCase()}
          </span>
          <div className="row-text">
            <span className="row-name">You · {nickname}</span>
            <span className="row-detail">
              {rows.length < 10
                ? myPoints === 0
                  ? 'Solve a practice question to join the board.'
                  : 'You will be on the board as soon as it refreshes.'
                : `${gap} more points gets you into the top 10. ${gap <= 2 * POINTS_PER_SOLVED ? (gap <= POINTS_PER_SOLVED ? 'One practice question would do it.' : 'Two practice questions would do it.') : 'Keep going!'}`}
            </span>
          </div>
          <span className="row-pts tabular">{myPoints} pts</span>
        </div>
      )}

      {best && (
        <div className="best-strip">
          <span className="hand-note">personal best!</span>
          <span>{best}</span>
        </div>
      )}
    </section>
  )
}

function Row({ e, rank, me, avatar }: { e: WeeklyEntry; rank: number; me: boolean; avatar: string }) {
  return (
    <li className={`board-row ${me ? 'is-me' : ''}`}>
      <span className="row-rank tabular">{rank}</span>
      <span className="board-avatar" style={{ background: me ? 'var(--color-sun)' : avatar }} aria-hidden="true">
        {e.nickname[0]?.toUpperCase()}
      </span>
      <div className="row-text">
        <span className="row-name">{me ? `You · ${e.nickname}` : e.nickname}</span>
        <span className="row-detail">{detail(e)}</span>
      </div>
      <span className="row-pts tabular">{e.points} pts</span>
    </li>
  )
}

function detail(e: WeeklyEntry) {
  return `${e.solved} solved · ${e.quizCorrect} quiz answers`
}

function NicknameRow({ nickname }: { nickname: string }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(nickname)
  const [saving, setSaving] = useState(false)
  const [failed, setFailed] = useState(false)
  const problem = editing && draft !== nickname ? nicknameProblem(draft) : null

  return (
    <div className="nick-row">
      <span className="board-avatar is-me" aria-hidden="true">
        {(nickname[0] ?? '?').toUpperCase()}
      </span>
      {!editing ? (
        <>
          <span>
            Other students see you as <b>{nickname}</b>
          </span>
          <button
            className="link-btn"
            onClick={() => {
              setDraft(nickname)
              setEditing(true)
            }}
          >
            Change nickname
          </button>
        </>
      ) : (
        <form
          className="nick-edit"
          onSubmit={async (ev) => {
            ev.preventDefault()
            if (nicknameProblem(draft)) return
            setSaving(true)
            setFailed(false)
            try {
              await chooseNickname(draft.trim())
              setEditing(false)
            } catch {
              setFailed(true)
            }
            setSaving(false)
          }}
        >
          <input
            id="nickname-edit"
            value={draft}
            onChange={(ev) => setDraft(ev.target.value.slice(0, NICKNAME_MAX))}
            maxLength={NICKNAME_MAX}
            aria-label="New nickname"
            autoComplete="off"
            spellCheck={false}
            autoFocus
          />
          <button className="btn-dark btn-small" type="submit" disabled={saving || !!nicknameProblem(draft)}>
            {saving ? 'Saving…' : 'Save'}
          </button>
          <button className="link-btn" type="button" onClick={() => setEditing(false)}>
            Cancel
          </button>
          <span className="nick-help">
            {problem ?? (failed ? 'Could not save. Try again.' : `Up to ${NICKNAME_MAX} characters. Keep it kind.`)}
          </span>
        </form>
      )}
    </div>
  )
}
