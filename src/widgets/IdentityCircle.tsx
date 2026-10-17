import { useState } from 'react'
import { Circle, Coordinates, Mafs, MovablePoint, Polygon, Theme } from 'mafs'
import { Tex } from '../components/Rich'
import { AngleArc, Label, RightMark, Seg, SideLabel, centroid, clamp, type P } from './geoKit'

type Mode = 'sc' | 'ts' | 'cc'

const MODES: { id: Mode; tex: string; lo: number; hi: number; x: [number, number]; y: [number, number] }[] = [
  { id: 'sc', tex: '\\sin^2\\theta + \\cos^2\\theta = 1', lo: 5, hi: 85, x: [-0.45, 1.5], y: [-0.4, 1.35] },
  { id: 'ts', tex: '1 + \\tan^2\\theta = \\sec^2\\theta', lo: 5, hi: 62, x: [-0.45, 1.75], y: [-0.4, 2.15] },
  { id: 'cc', tex: '1 + \\cot^2\\theta = \\cosec^2\\theta', lo: 28, hi: 85, x: [-0.45, 2.2], y: [-0.4, 1.6] },
]

const f4 = (n: number) => n.toFixed(4)
/** The circle is drawn with radius R so that the label offsets in geoKit suit it. */
const R = 4

/**
 * The unit circle: one right triangle for each fundamental identity. The sides are the ratios
 * themselves, so Pythagoras on each triangle is the identity.
 */
export function IdentityCircle() {
  const [mode, setMode] = useState<Mode>('sc')
  const [deg, setDeg] = useState(35)
  const m = MODES.find((x) => x.id === mode)!
  const th = (deg * Math.PI) / 180
  const s = Math.sin(th)
  const c = Math.cos(th)
  const t = s / c
  const ct = c / s

  const O: P = [0, 0]
  const onCircle: P = [R * c, R * s]
  let tri: [P, P, P]
  let names: [string, string, string]
  let legs: { a: P; b: P; text: string; color: string }[]
  if (mode === 'sc') {
    const M: P = [R * c, 0]
    tri = [O, M, onCircle]
    names = ['O', 'M', 'P']
    legs = [
      { a: O, b: M, text: 'cos θ', color: 'var(--color-adj)' },
      { a: M, b: onCircle, text: 'sin θ', color: 'var(--color-opp)' },
      { a: onCircle, b: O, text: '1', color: 'var(--color-hyp)' },
    ]
  } else if (mode === 'ts') {
    const A: P = [R, 0]
    const T: P = [R, R * t]
    tri = [O, A, T]
    names = ['O', 'A', 'T']
    legs = [
      { a: O, b: A, text: '1', color: 'var(--color-adj)' },
      { a: A, b: T, text: 'tan θ', color: 'var(--color-opp)' },
      { a: T, b: O, text: 'sec θ', color: 'var(--color-hyp)' },
    ]
  } else {
    const B: P = [0, R]
    const C: P = [R * ct, R]
    tri = [O, B, C]
    names = ['O', 'B', 'C']
    legs = [
      { a: O, b: B, text: '1', color: 'var(--color-adj)' },
      { a: B, b: C, text: 'cot θ', color: 'var(--color-opp)' },
      { a: C, b: O, text: 'cosec θ', color: 'var(--color-hyp)' },
    ]
  }
  const g = centroid(...tri)

  const rows: [string, number][] =
    mode === 'sc'
      ? [
          ['\\sin^2\\theta', s * s],
          ['\\cos^2\\theta', c * c],
          ['\\sin^2\\theta + \\cos^2\\theta', s * s + c * c],
        ]
      : mode === 'ts'
        ? [
            ['1 + \\tan^2\\theta', 1 + t * t],
            ['\\sec^2\\theta', 1 / (c * c)],
          ]
        : [
            ['1 + \\cot^2\\theta', 1 + ct * ct],
            ['\\cosec^2\\theta', 1 / (s * s)],
          ]

  function move([x, y]: P) {
    const d = Math.round((Math.atan2(Math.max(y, 0.001), Math.max(x, 0.001)) * 180) / Math.PI)
    setDeg(clamp(d, m.lo, m.hi))
  }

  return (
    <div className="widget identity-circle">
      <div className="widget-stage mafs-wrap">
        <Mafs
          key={mode}
          height={400}
          viewBox={{ x: [m.x[0] * R, m.x[1] * R], y: [m.y[0] * R, m.y[1] * R], padding: 0 }}
          preserveAspectRatio="contain"
          pan={false}
          zoom={false}
        >
          <Coordinates.Cartesian xAxis={{ lines: 1, labels: false }} yAxis={{ lines: 1, labels: false }} />
          <Circle center={O} radius={R} color="var(--color-muted-3)" fillOpacity={0} weight={1.5} />
          {mode === 'ts' && (
            <Seg a={[R, -0.3 * R]} b={[R, 2.15 * R]} color="var(--color-muted-3)" weight={1.5} dashed />
          )}
          {mode === 'cc' && <Seg a={[-0.4 * R, R]} b={[2.2 * R, R]} color="var(--color-muted-3)" weight={1.5} dashed />}
          <Polygon points={tri} color="var(--color-sun)" fillOpacity={0.45} weight={0} />
          {legs.map((l) => (
            <Seg key={l.text} a={l.a} b={l.b} color={l.color} weight={3.5} />
          ))}
          {mode !== 'sc' && <Seg a={O} b={onCircle} color="var(--color-ink)" weight={2} />}
          <RightMark at={tri[1]} a={tri[0]} b={tri[2]} s={0.35} />
          <AngleArc at={O} a={[R, 0]} b={onCircle} r={0.9} color="var(--color-coral)" />
          {legs.map((l) => (
            <SideLabel key={l.text} a={l.a} b={l.b} text={l.text} away={g} color={l.color} />
          ))}
          {tri.map((p, i) => (
            <Label key={names[i]} at={p} text={names[i]} away={g} size={14} />
          ))}
          <MovablePoint point={onCircle} color={Theme.pink} onMove={move} />
        </Mafs>
      </div>

      <div className="widget-panel">
        <div className="chip-row" role="group" aria-label="Identity">
          {MODES.map((x) => (
            <button
              key={x.id}
              className={`chip ${mode === x.id ? 'is-on' : ''}`}
              onClick={() => {
                setMode(x.id)
                setDeg((d) => clamp(d, x.lo, x.hi))
              }}
            >
              <Tex tex={x.tex} />
            </button>
          ))}
        </div>
        <label className="slider">
          <span>
            <Tex tex="\theta" /> = <strong className="tabular">{deg}°</strong>
          </span>
          <input type="range" min={m.lo} max={m.hi} value={deg} onChange={(e) => setDeg(Number(e.target.value))} />
        </label>
        <div className="ratio-box">
          <table className="ratio-table tabular">
            <tbody>
              {rows.map(([k, v]) => (
                <tr key={k}>
                  <th scope="row">
                    <Tex tex={k} />
                  </th>
                  <td className="ratio-val">{f4(v)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="feedback f-correct" aria-live="polite">
          {mode === 'sc' && (
            <>
              The hypotenuse is the radius, 1. The legs are <Tex tex="\cos\theta" /> and <Tex tex="\sin\theta" />, so
              Pythagoras gives <Tex tex="\sin^2\theta + \cos^2\theta = 1" /> at every angle.
            </>
          )}
          {mode === 'ts' && (
            <>
              Stretch the triangle until its base is 1, on the tangent at A. Now the height is <Tex tex="\tan\theta" />{' '}
              and the slanted side is <Tex tex="\sec\theta" />: Pythagoras gives{' '}
              <Tex tex="1 + \tan^2\theta = \sec^2\theta" />.
            </>
          )}
          {mode === 'cc' && (
            <>
              Stretch it the other way, until its height is 1. The base is <Tex tex="\cot\theta" /> and the slanted side
              is <Tex tex="\cosec\theta" />: <Tex tex="1 + \cot^2\theta = \cosec^2\theta" />.
            </>
          )}
        </p>
        <p className="small muted">Drag P around the circle, or use the slider.</p>
      </div>
    </div>
  )
}
