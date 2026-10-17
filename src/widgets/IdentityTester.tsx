import { useMemo, useState } from 'react'
import { Coordinates, Line, Mafs, Plot } from 'mafs'
import { Tex } from '../components/Rich'
import { compile } from '../lib/texEval'

/** Claims to test. Some are identities; the others only hold at a few angles, or never. */
const CLAIMS: { l: string; r: string }[] = [
  { l: '\\sin^2\\theta + \\cos^2\\theta', r: '1' },
  { l: '\\sin\\theta + \\cos\\theta', r: '1' },
  { l: '(\\sin\\theta + \\cos\\theta)^2', r: '1 + 2\\sin\\theta\\cos\\theta' },
  { l: '(\\sin\\theta + \\cos\\theta)^2', r: '1' },
  { l: '\\sec\\theta - \\cos\\theta', r: '\\tan\\theta\\sin\\theta' },
  { l: '\\tan\\theta + \\cot\\theta', r: '\\sec\\theta\\cosec\\theta' },
  { l: '\\sec^2\\theta - \\tan^2\\theta', r: '1' },
  { l: '\\sec\\theta - \\tan\\theta', r: '1' },
  { l: '\\dfrac{1 - \\cos\\theta}{\\sin\\theta}', r: '\\dfrac{\\sin\\theta}{1 + \\cos\\theta}' },
  { l: '\\tan\\theta', r: '\\sqrt3\\cos\\theta' },
]

const Y0 = -1
const Y1 = 3.5

/** Degrees in, value out; NaN outside the window so the curve breaks instead of shooting off. */
function asPlot(tex: string) {
  const { f } = compile(tex)
  return (deg: number) => {
    const v = f({ theta: (deg * Math.PI) / 180 })
    return Number.isFinite(v) ? v : NaN
  }
}

/**
 * Plot both sides of a claim for θ from 0° to 90°. An identity gives one curve on top of the other;
 * an equation that is not an identity gives curves that meet only at a few points.
 */
export function IdentityTester() {
  const [k, setK] = useState(0)
  const [deg, setDeg] = useState(30)
  const claim = CLAIMS[k]
  const { L, R, verdict, meets } = useMemo(() => {
    const L = asPlot(claim.l)
    const R = asPlot(claim.r)
    let worst = 0
    const meets: number[] = []
    let prev = NaN
    for (let d = 1; d <= 89; d += 0.25) {
      const diff = L(d) - R(d)
      worst = Math.max(worst, Math.abs(diff))
      if (Number.isFinite(prev) && Math.sign(prev) !== Math.sign(diff) && Math.abs(diff) < 0.5) meets.push(d)
      prev = diff
    }
    return { L, R, verdict: worst < 1e-9, meets }
  }, [claim])

  const lv = L(deg)
  const rv = R(deg)
  const fmt = (v: number) => (Number.isFinite(v) ? v.toFixed(4) : 'undefined')

  return (
    <div className="widget identity-tester">
      <div className="widget-stage mafs-wrap">
        <Mafs height={360} viewBox={{ x: [-4, 94], y: [Y0, Y1] }} preserveAspectRatio={false} pan={false} zoom={false}>
          <Coordinates.Cartesian
            xAxis={{ lines: 15, labels: (x) => (x >= 0 && x <= 90 ? `${x}°` : '') }}
            yAxis={{ lines: 0.5, labels: (y) => (Number.isInteger(y) ? String(y) : '') }}
          />
          <Plot.OfX y={R} domain={[0.5, 89.5]} color="var(--color-adj)" weight={7} opacity={0.55} />
          <Plot.OfX y={L} domain={[0.5, 89.5]} color="var(--color-coral)" weight={2.5} />
          <Line.Segment
            point1={[deg, Y0]}
            point2={[deg, Y1]}
            color="var(--color-muted-3)"
            weight={1.5}
            style="dashed"
          />
        </Mafs>
      </div>

      <div className="widget-panel">
        <div className="chip-row claim-chips" role="group" aria-label="Claim to test">
          {CLAIMS.map((c, i) => (
            <button key={i} className={`chip ${k === i ? 'is-on' : ''}`} onClick={() => setK(i)}>
              <Tex tex={`${c.l} = ${c.r}`} />
            </button>
          ))}
        </div>
        <Tex display tex={`\\htmlClass{c-coral}{${claim.l}} \\overset{?}{=} \\htmlClass{c-adj}{${claim.r}}`} />
        <label className="slider">
          <span>
            <Tex tex="\theta" /> = <strong className="tabular">{deg}°</strong>
          </span>
          <input type="range" min={1} max={89} value={deg} onChange={(e) => setDeg(Number(e.target.value))} />
        </label>
        <div className="ratio-box">
          <table className="ratio-table tabular">
            <tbody>
              <tr>
                <th scope="row">Left side</th>
                <td className="ratio-val">{fmt(lv)}</td>
              </tr>
              <tr>
                <th scope="row">Right side</th>
                <td className="ratio-val">{fmt(rv)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className={`feedback ${verdict ? 'f-correct' : 'f-wrong'}`} aria-live="polite">
          {verdict ? (
            <>An identity: the two curves lie exactly on top of each other for every angle.</>
          ) : meets.length ? (
            <>
              Not an identity. The sides are equal only where the curves cross (near{' '}
              {meets.map((d) => `${Math.round(d)}°`).join(', ')}), so this is an equation, true for some angles only.
            </>
          ) : (
            <>Not an identity. Between 0° and 90° the two sides are never equal.</>
          )}
        </p>
        <p className="small muted">
          The thick blue curve is the right side; the thin red one is the left side. A graph can show that a claim is
          false, but only a proof shows that it is true for every angle.
        </p>
      </div>
    </div>
  )
}
