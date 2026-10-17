import { useState } from 'react'
import { Coordinates, Mafs, MovablePoint, Polygon, Theme } from 'mafs'
import { Tex } from '../components/Rich'
import { Label, Seg, area, centroid, clamp, dist, f2, intersect, lerp, type P } from './geoKit'

type Mode = 'ceva' | 'menelaus'

const A: P = [2.2, 5.4]
const B: P = [0, 0]
const C: P = [7, 0]

/** Signed position of x along the line from p to q (0 at p, 1 at q). */
const along = (p: P, q: P, x: P) => {
  const d: P = [q[0] - p[0], q[1] - p[1]]
  return ((x[0] - p[0]) * d[0] + (x[1] - p[1]) * d[1]) / (d[0] * d[0] + d[1] * d[1])
}

/** Ceva: cevians through one point. Menelaus: one straight line across the three sides (extended). */
export function CevaLab() {
  const [mode, setMode] = useState<Mode>('ceva')
  const [o, setO] = useState<P>([3, 1.8])
  const [l1, setL1] = useState<P>([-0.8, 3.6])
  const [l2, setL2] = useState<P>([8.2, 1.2])

  const g = centroid(A, B, C)
  const inside = (x: P) => {
    const s = area(A, B, C)
    return Math.abs(area(x, B, C) + area(A, x, C) + area(A, B, x) - s) < 1e-6
  }

  return (
    <div className="widget ceva-lab">
      <div className="widget-stage mafs-wrap">
        <Mafs
          height={400}
          viewBox={{ x: [-1.5, 9], y: [-1.2, 6.5] }}
          preserveAspectRatio="contain"
          pan={false}
          zoom={false}
        >
          <Coordinates.Cartesian xAxis={{ lines: 1, labels: false }} yAxis={{ lines: 1, labels: false }} />
          <Polygon points={[A, B, C]} color="var(--color-sky)" fillOpacity={0.35} weight={0} />
          <Seg a={A} b={B} />
          <Seg a={B} b={C} />
          <Seg a={C} b={A} />
          <Label at={A} text="A" away={g} />
          <Label at={B} text="B" away={g} />
          <Label at={C} text="C" away={g} />
          {mode === 'ceva' ? <CevaDrawing o={o} /> : <MenelausDrawing l1={l1} l2={l2} />}
          {mode === 'ceva' ? (
            <MovablePoint
              point={o}
              color={Theme.pink}
              onMove={(x) => {
                const c: P = [clamp(x[0], 0.2, 6.8), clamp(x[1], 0.15, 5.2)]
                if (inside(c)) setO(c)
              }}
            />
          ) : (
            <>
              <MovablePoint
                point={l1}
                color={Theme.pink}
                onMove={([x, y]) => setL1([clamp(x, -1.3, 8.8), clamp(y, -1, 6.3)])}
              />
              <MovablePoint
                point={l2}
                color={Theme.pink}
                onMove={([x, y]) => setL2([clamp(x, -1.3, 8.8), clamp(y, -1, 6.3)])}
              />
            </>
          )}
        </Mafs>
      </div>
      <div className="widget-panel">
        <div className="chip-row" role="group" aria-label="Theorem">
          <button className={`chip ${mode === 'ceva' ? 'is-on' : ''}`} onClick={() => setMode('ceva')}>
            Ceva (concurrent cevians)
          </button>
          <button className={`chip ${mode === 'menelaus' ? 'is-on' : ''}`} onClick={() => setMode('menelaus')}>
            Menelaus (collinear points)
          </button>
        </div>
        {mode === 'ceva' ? <CevaPanel o={o} /> : <MenelausPanel l1={l1} l2={l2} />}
      </div>
    </div>
  )
}

function cevians(o: P) {
  return {
    d: intersect(A, o, B, C)!,
    e: intersect(B, o, C, A)!,
    f: intersect(C, o, A, B)!,
  }
}

function CevaDrawing({ o }: { o: P }) {
  const { d, e, f } = cevians(o)
  return (
    <>
      <Seg a={A} b={d} color="var(--color-coral)" weight={2.5} />
      <Seg a={B} b={e} color="var(--color-coral)" weight={2.5} />
      <Seg a={C} b={f} color="var(--color-coral)" weight={2.5} />
      <Label at={d} text="D" away={[d[0], d[1] + 1]} />
      <Label at={e} text="E" away={lerp(B, e, 0.5)} />
      <Label at={f} text="F" away={lerp(C, f, 0.5)} />
    </>
  )
}

function CevaPanel({ o }: { o: P }) {
  const { d, e, f } = cevians(o)
  const r1 = dist(B, d) / dist(d, C)
  const r2 = dist(C, e) / dist(e, A)
  const r3 = dist(A, f) / dist(f, B)
  return (
    <>
      <div className="ratio-box">
        <table className="ratio-table tabular">
          <tbody>
            {(
              [
                ['\\dfrac{BD}{DC}', r1],
                ['\\dfrac{CE}{EA}', r2],
                ['\\dfrac{AF}{FB}', r3],
              ] as [string, number][]
            ).map(([t, v]) => (
              <tr key={t}>
                <th scope="row">
                  <Tex tex={t} />
                </th>
                <td className="ratio-val">{f2(v)}</td>
              </tr>
            ))}
            <tr>
              <th scope="row">Product</th>
              <td className="ratio-val">{f2(r1 * r2 * r3)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="feedback f-correct" aria-live="polite">
        The three cevians meet at one point, so the product is 1 (Ceva&apos;s theorem). Drag the point and watch each
        ratio change while the product stays 1.
      </p>
    </>
  )
}

function crossings(l1: P, l2: P) {
  return {
    p: intersect(l1, l2, B, C),
    q: intersect(l1, l2, C, A),
    r: intersect(l1, l2, A, B),
  }
}

function MenelausDrawing({ l1, l2 }: { l1: P; l2: P }) {
  const { p, q, r } = crossings(l1, l2)
  const pts = [p, q, r].filter(Boolean) as P[]
  // extend the sides as dashed lines to wherever the transversal crosses them
  const ext = (a: P, b: P, x: P | null) => {
    if (!x) return null
    const t = along(a, b, x)
    if (t >= 0 && t <= 1) return null
    return <Seg a={t < 0 ? a : b} b={x} color="var(--color-muted-3)" weight={1.5} dashed />
  }
  const far = pts.length ? pts : [l1, l2]
  const xs = far.map((x) => x[0])
  const lo = Math.min(...xs, l1[0], l2[0])
  const hi = Math.max(...xs, l1[0], l2[0])
  const dir: P = [l2[0] - l1[0], l2[1] - l1[1]]
  const at = (x: number): P => (Math.abs(dir[0]) < 1e-9 ? [l1[0], x] : [x, l1[1] + ((x - l1[0]) * dir[1]) / dir[0]])
  return (
    <>
      {ext(B, C, p)}
      {ext(C, A, q)}
      {ext(A, B, r)}
      <Seg a={at(lo - 0.4)} b={at(hi + 0.4)} color="var(--color-coral)" weight={2.5} />
      {p && <Label at={p} text="P" away={[p[0], p[1] + 1]} />}
      {q && <Label at={q} text="Q" away={g0} />}
      {r && <Label at={r} text="R" away={g0} />}
    </>
  )
}
const g0 = centroid(A, B, C)

function MenelausPanel({ l1, l2 }: { l1: P; l2: P }) {
  const { p, q, r } = crossings(l1, l2)
  if (!p || !q || !r) {
    return (
      <p className="feedback f-wrong">The line is parallel to a side, so it never meets that side. Tilt it a little.</p>
    )
  }
  const r1 = dist(B, p) / dist(p, C)
  const r2 = dist(C, q) / dist(q, A)
  const r3 = dist(A, r) / dist(r, B)
  // directed: a point outside its side makes that ratio negative
  const sign = [along(B, C, p), along(C, A, q), along(A, B, r)].reduce((s, t) => s * (t > 0 && t < 1 ? 1 : -1), 1)
  return (
    <>
      <div className="ratio-box">
        <table className="ratio-table tabular">
          <tbody>
            {(
              [
                ['\\dfrac{BP}{PC}', r1],
                ['\\dfrac{CQ}{QA}', r2],
                ['\\dfrac{AR}{RB}', r3],
              ] as [string, number][]
            ).map(([t, v]) => (
              <tr key={t}>
                <th scope="row">
                  <Tex tex={t} />
                </th>
                <td className="ratio-val">{f2(v)}</td>
              </tr>
            ))}
            <tr>
              <th scope="row">Product of lengths</th>
              <td className="ratio-val">{f2(r1 * r2 * r3)}</td>
            </tr>
            <tr>
              <th scope="row">With directions</th>
              <td className="ratio-val">{f2(sign * r1 * r2 * r3)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="feedback f-correct" aria-live="polite">
        P, Q, R lie on one straight line, so the product of the lengths is 1. Counting directions, at least one point is
        always outside its side, and the product is −1 (Menelaus&apos;s theorem).
      </p>
    </>
  )
}
