import { useState } from 'react'
import { Circle, Coordinates, Mafs, MovablePoint, Theme } from 'mafs'
import { Tex } from '../components/Rich'
import { AngleArc, Label, RightMark, Seg, add, angleAt, clamp, f1, mul, sub, unit, type P } from './geoKit'

type Mode = 'pair' | 'alternate'

const onCircle = (p: P, r: number): P => mul(unit(p), r)

/** Tangents from an outside point, and the alternate segment theorem. */
export function TangentLab() {
  const [mode, setMode] = useState<Mode>('pair')
  const [r, setR] = useState(2.5)
  const [p, setP] = useState<P>([6, 1])
  const [q, setQ] = useState<P>(onCircle([2, 1.5], 3))
  const [s, setS] = useState<P>(onCircle([-2.5, 1.5], 3))

  const o: P = [0, 0]

  return (
    <div className="widget tangent-lab">
      <div className="widget-stage mafs-wrap">
        <Mafs height={400} viewBox={{ x: [-5, 9], y: [-5, 5] }} preserveAspectRatio="contain" pan={false} zoom={false}>
          <Coordinates.Cartesian xAxis={{ lines: 1, labels: false }} yAxis={{ lines: 1, labels: false }} />
          {mode === 'pair' ? <Pair o={o} r={r} p={p} /> : <Alternate o={o} q={q} s={s} />}
          {mode === 'pair' ? (
            <MovablePoint
              point={p}
              color={Theme.pink}
              onMove={([x, y]) => setP([clamp(x, -4.5, 8.5), clamp(y, -4.5, 4.5)])}
            />
          ) : (
            <>
              <MovablePoint
                point={q}
                color={Theme.blue}
                constrain={(x) => onCircle(x, 3)}
                onMove={(x) => setQ(onCircle(x, 3))}
              />
              <MovablePoint
                point={s}
                color={Theme.pink}
                constrain={(x) => onCircle(x, 3)}
                onMove={(x) => setS(onCircle(x, 3))}
              />
            </>
          )}
        </Mafs>
      </div>

      <div className="widget-panel">
        <div className="chip-row" role="group" aria-label="What to explore">
          <button className={`chip ${mode === 'pair' ? 'is-on' : ''}`} onClick={() => setMode('pair')}>
            Tangents from a point
          </button>
          <button className={`chip ${mode === 'alternate' ? 'is-on' : ''}`} onClick={() => setMode('alternate')}>
            Alternate segment
          </button>
        </div>
        {mode === 'pair' ? <PairPanel r={r} setR={setR} p={p} /> : <AlternatePanel q={q} s={s} />}
      </div>
    </div>
  )
}

function tangentPoints(o: P, r: number, p: P): [P, P] | null {
  const d = Math.hypot(p[0] - o[0], p[1] - o[1])
  if (d <= r + 1e-6) return null
  const th = Math.atan2(p[1] - o[1], p[0] - o[0])
  const ph = Math.acos(r / d)
  return [
    add(o, [r * Math.cos(th + ph), r * Math.sin(th + ph)]),
    add(o, [r * Math.cos(th - ph), r * Math.sin(th - ph)]),
  ]
}

function Pair({ o, r, p }: { o: P; r: number; p: P }) {
  const t = tangentPoints(o, r, p)
  return (
    <>
      <Circle center={o} radius={r} color="var(--color-hyp)" fillOpacity={0.08} weight={2.5} />
      <Seg a={o} b={p} color="var(--color-muted-3)" weight={1.5} dashed />
      {t && (
        <>
          {t.map((x, i) => (
            <g key={i}>
              <Seg a={p} b={add(x, mul(unit(sub(x, p)), 1.2))} color="var(--color-coral)" weight={3} />
              <Seg a={o} b={x} color="var(--color-adj)" weight={2} dashed />
              <RightMark at={x} a={o} b={p} s={0.28} />
            </g>
          ))}
          <Label at={t[0]} text="A" away={o} />
          <Label at={t[1]} text="B" away={o} />
        </>
      )}
      <Label at={o} text="O" away={[o[0] - 1, o[1] + 1]} />
      <Label at={p} text="P" away={o} />
    </>
  )
}

function PairPanel({ r, setR, p }: { r: number; setR: (n: number) => void; p: P }) {
  const d = Math.hypot(...p)
  const inside = d < r - 1e-6
  const on = Math.abs(d - r) < 1e-6
  const tl = Math.sqrt(Math.max(0, d * d - r * r))
  return (
    <>
      <label className="slider">
        <span>
          Radius: <strong className="tabular">{f1(r)}</strong>
        </span>
        <input type="range" min={1} max={4} step={0.1} value={r} onChange={(e) => setR(Number(e.target.value))} />
      </label>
      <div className="readout">
        <span className="readout-label">
          <Tex tex="OP" />
        </span>
        <span className="readout-value is-lilac tabular">{f1(d)}</span>
      </div>
      <div className="readout">
        <span className="readout-label">
          <Tex tex="PA = PB" />
        </span>
        <span className="readout-value tabular">{inside || on ? '–' : f1(tl)}</span>
      </div>
      <p className={`feedback ${inside ? 'f-wrong' : 'f-correct'}`} aria-live="polite">
        {inside ? (
          <>P is inside the circle: no tangent can be drawn from an interior point.</>
        ) : (
          <>
            Each radius meets its tangent at 90°, so <Tex tex="PA^2 = OP^2 - r^2" />:{' '}
            <Tex tex={`\\sqrt{${f1(d)}^2 - ${f1(r)}^2} \\approx ${f1(tl)}`} />. The two tangents are always equal.
          </>
        )}
      </p>
      <p className="small muted">Drag P. Try putting it inside the circle.</p>
    </>
  )
}

/** P is the point of contact at the bottom; the tangent is horizontal. T is on the side of PQ away from S. */
function altGeometry(q: P, s: P) {
  const p: P = [0, -3]
  const side = (x: P) => Math.sign((q[0] - p[0]) * (x[1] - p[1]) - (q[1] - p[1]) * (x[0] - p[0]))
  const right: P = [5, -3]
  const left: P = [-5, -3]
  const t = side(right) === side(s) ? left : right
  return { p, t, chordAngle: angleAt(p, t, q), segAngle: angleAt(s, p, q) }
}

function Alternate({ o, q, s }: { o: P; q: P; s: P }) {
  const { p, t, chordAngle } = altGeometry(q, s)
  return (
    <>
      <Circle center={o} radius={3} color="var(--color-hyp)" fillOpacity={0.08} weight={2.5} />
      <Seg a={[-5.5, -3]} b={[7, -3]} color="var(--color-adj)" weight={3} />
      <Seg a={p} b={q} color="var(--color-ink)" weight={3} />
      <Seg a={s} b={p} color="var(--color-coral)" weight={2.5} />
      <Seg a={s} b={q} color="var(--color-coral)" weight={2.5} />
      {chordAngle > 2 && <AngleArc at={p} a={t} b={q} r={0.8} color="var(--color-coral)" />}
      <AngleArc at={s} a={p} b={q} r={0.7} color="var(--color-coral)" />
      <Label at={p} text="P" away={[0, 0]} />
      <Label at={q} text="Q" away={[0, 0]} />
      <Label at={s} text="S" away={[0, 0]} />
      <Label at={t} text="T" away={[t[0], 0]} />
      <Label at={o} text="O" away={[1, 1]} />
    </>
  )
}

function AlternatePanel({ q, s }: { q: P; s: P }) {
  const { chordAngle, segAngle } = altGeometry(q, s)
  return (
    <>
      <div className="readout">
        <span className="readout-label">
          <Tex tex="\angle QPT" /> (tangent and chord)
        </span>
        <span className="readout-value tabular">{f1(chordAngle)}°</span>
      </div>
      <div className="readout">
        <span className="readout-label">
          <Tex tex="\angle PSQ" /> (in the alternate segment)
        </span>
        <span className="readout-value is-lilac tabular">{f1(segAngle)}°</span>
      </div>
      <p className="feedback f-correct" aria-live="polite">
        The angle between the tangent and the chord <Tex tex="PQ" /> equals the angle at <Tex tex="S" />, in the segment
        on the other side of the chord. Move <Tex tex="S" /> anywhere on that arc: the angle stays the same.
      </p>
      <p className="small muted">Drag Q and S around the circle.</p>
    </>
  )
}
