import { useState } from 'react'
import { Coordinates, Mafs, MovablePoint, Polygon, Line, Text, Theme } from 'mafs'
import { Tex } from '../components/Rich'

const fmt = (n: number, d = 2) => n.toFixed(d)
const DEG = 180 / Math.PI

/**
 * Right triangle OMP (right angle at M, θ at O) as in the textbook.
 * Drag P up/down and O left/right; or use the presets and the size slider.
 */
export function TriangleExplorer() {
  // M is at the origin. P on the y-axis, O on the x-axis.
  const [p, setP] = useState(3)
  const [o, setO] = useState(4)
  const [lockAngle, setLockAngle] = useState(false)

  const hyp = Math.hypot(p, o)
  const theta = Math.atan2(p, o) * DEG

  function setAngle(deg: number) {
    const h = 5.5
    setP(h * Math.sin(deg / DEG))
    setO(h * Math.cos(deg / DEG))
  }

  function scaleTo(newHyp: number) {
    const s = newHyp / hyp
    setP(p * s)
    setO(o * s)
  }

  const rows: { name: string; tex: string; sides: string; num: number; den: number }[] = [
    {
      name: 'sin',
      tex: '\\sin\\theta',
      sides: '\\dfrac{\\htmlClass{c-opp}{MP}}{\\htmlClass{c-hyp}{OP}}',
      num: p,
      den: hyp,
    },
    {
      name: 'cos',
      tex: '\\cos\\theta',
      sides: '\\dfrac{\\htmlClass{c-adj}{OM}}{\\htmlClass{c-hyp}{OP}}',
      num: o,
      den: hyp,
    },
    {
      name: 'tan',
      tex: '\\tan\\theta',
      sides: '\\dfrac{\\htmlClass{c-opp}{MP}}{\\htmlClass{c-adj}{OM}}',
      num: p,
      den: o,
    },
    {
      name: 'cosec',
      tex: '\\operatorname{cosec}\\theta',
      sides: '\\dfrac{\\htmlClass{c-hyp}{OP}}{\\htmlClass{c-opp}{MP}}',
      num: hyp,
      den: p,
    },
    {
      name: 'sec',
      tex: '\\sec\\theta',
      sides: '\\dfrac{\\htmlClass{c-hyp}{OP}}{\\htmlClass{c-adj}{OM}}',
      num: hyp,
      den: o,
    },
    {
      name: 'cot',
      tex: '\\cot\\theta',
      sides: '\\dfrac{\\htmlClass{c-adj}{OM}}{\\htmlClass{c-opp}{MP}}',
      num: o,
      den: p,
    },
  ]

  // angle arc at O (O is at (o, 0)); arc from direction (-1,0) towards P
  const arcR = Math.min(1.1, o * 0.35, hyp * 0.3)
  const phi = Math.atan2(p, o) // interior angle
  const arcPts = Array.from({ length: 16 }, (_, i) => {
    const a = Math.PI - (phi * i) / 15
    return [o + arcR * Math.cos(a), arcR * Math.sin(a)] as [number, number]
  })

  return (
    <div className="widget triangle-explorer">
      <div className="widget-stage mafs-wrap">
        <Mafs
          height={340}
          viewBox={{ x: [-1.2, 8.5], y: [-1, 6.5] }}
          preserveAspectRatio="contain"
          pan={false}
          zoom={false}
        >
          <Coordinates.Cartesian xAxis={{ lines: 1, labels: false }} yAxis={{ lines: 1, labels: false }} />
          <Polygon
            points={[
              [0, 0],
              [o, 0],
              [0, p],
            ]}
            color="var(--color-sun)"
            fillOpacity={0.3}
            weight={0}
          />
          <Line.Segment point1={[0, 0]} point2={[0, p]} color="var(--color-opp)" weight={4} />
          <Line.Segment point1={[0, 0]} point2={[o, 0]} color="var(--color-adj)" weight={4} />
          <Line.Segment point1={[o, 0]} point2={[0, p]} color="var(--color-hyp)" weight={4} />
          <Polygon
            points={[
              [0, 0],
              [0.35, 0],
              [0.35, 0.35],
              [0, 0.35],
            ]}
            color="var(--color-muted-3)"
            fillOpacity={0}
            weight={1.5}
          />
          {arcPts.slice(1).map((pt, i) => (
            <Line.Segment key={i} point1={arcPts[i]} point2={pt} color="var(--color-ink)" weight={2} />
          ))}
          <Text x={o - arcR - 0.35} y={0.35} size={16} color="var(--color-ink)">
            θ
          </Text>
          <Text x={-0.3} y={-0.35} size={15} color="var(--color-ink)">
            M
          </Text>
          <Text x={o + 0.25} y={-0.35} size={15} color="var(--color-ink)">
            O
          </Text>
          <Text x={-0.35} y={p + 0.25} size={15} color="var(--color-ink)">
            P
          </Text>
          <Text x={-0.55} y={p / 2} size={13} color="var(--color-opp)">
            {fmt(p, 1)}
          </Text>
          <Text x={o / 2} y={-0.4} size={13} color="var(--color-adj)">
            {fmt(o, 1)}
          </Text>
          <Text x={o / 2 + 0.45} y={p / 2 + 0.3} size={13} color="var(--color-hyp)">
            {fmt(hyp, 1)}
          </Text>
          <MovablePoint
            point={[0, p]}
            color={Theme.pink}
            constrain={([, y]) => [0, clamp(y, 0.6, 6)]}
            onMove={([, y]) => {
              const ny = clamp(y, 0.6, 6)
              if (lockAngle) {
                const s = ny / p
                if (o * s > 8 || o * s < 0.6) return
                setO(o * s)
              }
              setP(ny)
            }}
          />
          <MovablePoint
            point={[o, 0]}
            color={Theme.blue}
            constrain={([x]) => [clamp(x, 0.6, 8), 0]}
            onMove={([x]) => {
              const nx = clamp(x, 0.6, 8)
              if (lockAngle) {
                const s = nx / o
                if (p * s > 6 || p * s < 0.6) return
                setP(p * s)
              }
              setO(nx)
            }}
          />
        </Mafs>
      </div>

      <div className="widget-panel">
        <div className="readout">
          <span className="readout-label">Angle θ</span>
          <span className="readout-value tabular">{fmt(theta, 1)}°</span>
        </div>

        <div className="chip-row" role="group" aria-label="Set the angle">
          {[30, 45, 60].map((a) => (
            <button key={a} className={`chip ${Math.abs(theta - a) < 0.05 ? 'is-on' : ''}`} onClick={() => setAngle(a)}>
              {a}°
            </button>
          ))}
        </div>

        <label className="toggle">
          <input type="checkbox" checked={lockAngle} onChange={(e) => setLockAngle(e.target.checked)} />
          <span>Keep the angle fixed while dragging</span>
        </label>

        <label className="slider">
          <span>Triangle size (hypotenuse {fmt(hyp, 1)})</span>
          <input
            type="range"
            min={2}
            max={Math.min(6 / Math.sin(phi), 8 / Math.cos(phi)).toFixed(2)}
            step={0.01}
            value={hyp}
            onChange={(e) => scaleTo(Number(e.target.value))}
          />
        </label>

        <div className="ratio-box">
          <table className="ratio-table tabular">
            <tbody>
              {rows.map((r) => (
                <tr key={r.name}>
                  <th scope="row">
                    <Tex tex={r.tex} />
                  </th>
                  <td>
                    <Tex tex={`=${r.sides}`} />
                  </td>
                  <td className="ratio-num">
                    <Tex tex={`=\\dfrac{${fmt(r.num)}}{${fmt(r.den)}}`} />
                  </td>
                  <td className="ratio-val">{fmt(r.num / r.den, 3)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v))
}
