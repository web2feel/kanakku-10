import { useState } from 'react'
import { Coordinates, Mafs, MovablePoint, Polygon, Text, Theme } from 'mafs'
import { Tex } from '../components/Rich'
import { Label, RightMark, Seg, add, centroid, clamp, dist, f1, lerp, mul, sub, unit, type P } from './geoKit'

const TRIPLETS: [number, number][] = [
  [3, 4],
  [4.5, 6],
  [2.5, 6],
  [4, 7.5],
]

/** The square drawn outward on side pq, away from point `inside`. */
function square(p: P, q: P, inside: P): P[] {
  const d = sub(q, p)
  let n: P = [-d[1], d[0]]
  const m = lerp(p, q, 0.5)
  if ((inside[0] - m[0]) * n[0] + (inside[1] - m[1]) * n[1] > 0) n = mul(n, -1)
  return [p, q, add(q, n), add(p, n)]
}

/** Squares on the sides of a triangle. With the right angle, the two small areas add up to the big one. */
export function PythagorasLab() {
  const [a, setA] = useState(4.5)
  const [b, setB] = useState(6)
  const [gamma, setGamma] = useState(90)

  const g = (gamma * Math.PI) / 180
  const c0: P = [0, 0]
  const bp: P = [b, 0]
  const ap: P = [a * Math.cos(g), a * Math.sin(g)]
  const mid = centroid(c0, bp, ap)
  const sa = square(c0, ap, mid)
  const sb = square(c0, bp, mid)
  const sc = square(ap, bp, mid)
  const hyp = dist(ap, bp)
  const A2 = a * a
  const B2 = b * b
  const C2 = hyp * hyp
  const right = Math.abs(gamma - 90) < 0.5
  const centre = (s: P[]) => centroid(...s)

  const verdict = right ? 'right' : C2 > A2 + B2 ? 'obtuse' : 'acute'

  return (
    <div className="widget pythagoras-lab">
      <div className="widget-stage mafs-wrap">
        <Mafs
          height={420}
          viewBox={{ x: [-8.5, 15], y: [-8.5, 15] }}
          preserveAspectRatio="contain"
          pan={false}
          zoom={false}
        >
          <Coordinates.Cartesian xAxis={{ lines: 1, labels: false }} yAxis={{ lines: 1, labels: false }} />
          <Polygon points={sa} color="var(--color-opp)" fillOpacity={0.2} weight={1.5} />
          <Polygon points={sb} color="var(--color-adj)" fillOpacity={0.2} weight={1.5} />
          <Polygon points={sc} color="var(--color-hyp)" fillOpacity={0.2} weight={1.5} />
          <Polygon points={[c0, bp, ap]} color="var(--color-sun)" fillOpacity={0.6} weight={0} />
          <Seg a={c0} b={ap} color="var(--color-opp)" />
          <Seg a={c0} b={bp} color="var(--color-adj)" />
          <Seg a={ap} b={bp} color="var(--color-hyp)" />
          {right && <RightMark at={c0} a={bp} b={ap} s={0.5} />}
          <Text x={centre(sa)[0]} y={centre(sa)[1]} size={15} color="var(--color-opp)">
            {f1(A2)}
          </Text>
          <Text x={centre(sb)[0]} y={centre(sb)[1]} size={15} color="var(--color-adj)">
            {f1(B2)}
          </Text>
          <Text x={centre(sc)[0]} y={centre(sc)[1]} size={15} color="var(--color-hyp)">
            {f1(C2)}
          </Text>
          <Label at={c0} text="C" away={mid} />
          <Label at={ap} text="A" away={mid} />
          <Label at={bp} text="B" away={mid} />
          <MovablePoint
            point={bp}
            color={Theme.blue}
            constrain={([x]) => [clamp(Math.round(x * 2) / 2, 1, 7.5), 0]}
            onMove={([x]) => setB(clamp(Math.round(x * 2) / 2, 1, 7.5))}
          />
          <MovablePoint
            point={ap}
            color={Theme.pink}
            constrain={(p) => {
              const r = clamp(Math.round(Math.hypot(...p) * 2) / 2, 1, 7.5)
              return mul(unit([Math.cos(g), Math.sin(g)]), r)
            }}
            onMove={(p) => setA(clamp(Math.round(Math.hypot(...p) * 2) / 2, 1, 7.5))}
          />
        </Mafs>
      </div>

      <div className="widget-panel">
        <div className="chip-row" role="group" aria-label="Pythagorean triplets">
          {TRIPLETS.map(([x, y]) => (
            <button
              key={`${x}-${y}`}
              className={`chip ${a === x && b === y && right ? 'is-on' : ''}`}
              onClick={() => {
                setA(x)
                setB(y)
                setGamma(90)
              }}
            >
              {x}, {y}, {Math.hypot(x, y)}
            </button>
          ))}
        </div>
        <label className="slider">
          <span>
            Angle at <Tex tex="C" />: <strong className="tabular">{gamma}°</strong>
          </span>
          <input
            type="range"
            min={40}
            max={140}
            step={1}
            value={gamma}
            onChange={(e) => setGamma(Number(e.target.value))}
          />
        </label>

        <div className="readout">
          <span className="readout-label">
            <Tex tex="CA^2 + CB^2" />
          </span>
          <span className="readout-value tabular">{f1(A2 + B2)}</span>
        </div>
        <div className="readout">
          <span className="readout-label">
            <Tex tex="AB^2" />
          </span>
          <span className="readout-value is-lilac tabular">{f1(C2)}</span>
        </div>

        <p className={`feedback ${verdict === 'right' ? 'f-correct' : 'f-reveal'}`} aria-live="polite">
          {verdict === 'right' ? (
            <>
              Right angle at <Tex tex="C" />: the red and blue squares together exactly fill the green one.{' '}
              <Tex tex={`${f1(A2)} + ${f1(B2)} = ${f1(C2)}`} />.
            </>
          ) : verdict === 'obtuse' ? (
            <>
              <Tex tex="\angle C > 90^\circ" />: <Tex tex="AB^2" /> is more than <Tex tex="CA^2 + CB^2" />. The converse
              says only a right angle makes them equal.
            </>
          ) : (
            <>
              <Tex tex="\angle C < 90^\circ" />: <Tex tex="AB^2" /> is less than <Tex tex="CA^2 + CB^2" />.
            </>
          )}
        </p>
        <p className="small muted">Drag A and B to change the two sides (in steps of 0.5).</p>
      </div>
    </div>
  )
}
