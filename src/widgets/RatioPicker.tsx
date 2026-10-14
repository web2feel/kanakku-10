import { useState } from 'react'
import { Tex } from '../components/Rich'

type Side = 'height' | 'distance' | 'sight'

const SIDES: { id: Side; label: string; role: string; cls: string }[] = [
  { id: 'height', label: 'Height', role: 'opposite side', cls: 'opp' },
  { id: 'distance', label: 'Horizontal distance', role: 'adjacent side', cls: 'adj' },
  { id: 'sight', label: 'Line of sight (string, ladder, wire)', role: 'hypotenuse', cls: 'hyp' },
]

const RESULT: Record<string, { tex: string; say: string }> = {
  'distance-height': {
    tex: '\\tan\\theta = \\dfrac{\\htmlClass{c-opp}{\\text{height}}}{\\htmlClass{c-adj}{\\text{distance}}}',
    say: 'Height and distance are opposite and adjacent, so use tan. This is the most common case.',
  },
  'height-sight': {
    tex: '\\sin\\theta = \\dfrac{\\htmlClass{c-opp}{\\text{height}}}{\\htmlClass{c-hyp}{\\text{line of sight}}}',
    say: 'Height and line of sight are opposite and hypotenuse, so use sin.',
  },
  'distance-sight': {
    tex: '\\cos\\theta = \\dfrac{\\htmlClass{c-adj}{\\text{distance}}}{\\htmlClass{c-hyp}{\\text{line of sight}}}',
    say: 'Distance and line of sight are adjacent and hypotenuse, so use cos.',
  },
}

/** Choose the two sides involved (one known, one wanted) and see which ratio links them. */
export function RatioPicker() {
  const [known, setKnown] = useState<Side>('distance')
  const [want, setWant] = useState<Side>('height')
  const pairKey = [known, want].sort().join('-')
  const res = known !== want ? RESULT[pairKey] : undefined

  return (
    <div className="widget ratio-picker">
      <div className="picker-cols">
        <fieldset>
          <legend>I know the angle and the…</legend>
          {SIDES.map((s) => (
            <label key={s.id} className={`pick pick-${s.cls}`}>
              <input type="radio" name="known" checked={known === s.id} onChange={() => setKnown(s.id)} />
              <span>
                {s.label}
                <small>{s.role}</small>
              </span>
            </label>
          ))}
        </fieldset>
        <fieldset>
          <legend>I want to find the…</legend>
          {SIDES.map((s) => (
            <label key={s.id} className={`pick pick-${s.cls}`}>
              <input type="radio" name="want" checked={want === s.id} onChange={() => setWant(s.id)} />
              <span>
                {s.label}
                <small>{s.role}</small>
              </span>
            </label>
          ))}
        </fieldset>
      </div>
      <div className="picker-result" aria-live="polite">
        {res ? (
          <>
            <Tex tex={res.tex} display />
            <p className="small">{res.say}</p>
          </>
        ) : (
          <p className="small muted">Pick two different sides: the one you know and the one you want.</p>
        )}
      </div>
    </div>
  )
}
