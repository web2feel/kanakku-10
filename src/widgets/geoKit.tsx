import { Line, Polygon, Text } from 'mafs'

export type P = [number, number]

export const sub = (a: P, b: P): P => [a[0] - b[0], a[1] - b[1]]
export const add = (a: P, b: P): P => [a[0] + b[0], a[1] + b[1]]
export const mul = (a: P, s: number): P => [a[0] * s, a[1] * s]
export const dist = (a: P, b: P) => Math.hypot(a[0] - b[0], a[1] - b[1])
export const lerp = (a: P, b: P, t: number): P => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]
export const unit = (a: P): P => mul(a, 1 / (Math.hypot(a[0], a[1]) || 1))
export const DEG = 180 / Math.PI

/** Interior angle at `at` between rays to a and b, in degrees. */
export function angleAt(at: P, a: P, b: P) {
  const u = sub(a, at)
  const v = sub(b, at)
  const c = (u[0] * v[0] + u[1] * v[1]) / ((Math.hypot(...u) || 1) * (Math.hypot(...v) || 1))
  return Math.acos(Math.max(-1, Math.min(1, c))) * DEG
}

/** Where lines p1p2 and p3p4 meet (null if parallel). */
export function intersect(p1: P, p2: P, p3: P, p4: P): P | null {
  const d = (p1[0] - p2[0]) * (p3[1] - p4[1]) - (p1[1] - p2[1]) * (p3[0] - p4[0])
  if (Math.abs(d) < 1e-9) return null
  const a = p1[0] * p2[1] - p1[1] * p2[0]
  const b = p3[0] * p4[1] - p3[1] * p4[0]
  return [(a * (p3[0] - p4[0]) - (p1[0] - p2[0]) * b) / d, (a * (p3[1] - p4[1]) - (p1[1] - p2[1]) * b) / d]
}

export const area = (a: P, b: P, c: P) => Math.abs((b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1])) / 2

export const f1 = (n: number) => (Math.round(n * 10) / 10).toFixed(1)
export const f2 = (n: number) => (Math.round(n * 100) / 100).toFixed(2)

/** A point label placed away from `away` (usually the centroid). */
export function Label({
  at,
  text,
  away,
  size = 15,
  color = 'var(--color-ink)',
}: {
  at: P
  text: string
  away?: P
  size?: number
  color?: string
}) {
  const d = away ? unit(sub(at, away)) : ([0, 1] as P)
  const p = add(at, mul(d, 0.42))
  return (
    <Text x={p[0]} y={p[1]} size={size} color={color}>
      {text}
    </Text>
  )
}

/** A length written next to the middle of a segment, on the side away from `away`. */
export function SideLabel({
  a,
  b,
  text,
  away,
  color = 'var(--color-ink)',
}: {
  a: P
  b: P
  text: string
  away: P
  color?: string
}) {
  const m = lerp(a, b, 0.5)
  const n: P = [-(b[1] - a[1]), b[0] - a[0]]
  const u = unit(n)
  const side = Math.sign((away[0] - m[0]) * u[0] + (away[1] - m[1]) * u[1]) || 1
  const p = add(m, mul(u, -side * 0.38))
  return (
    <Text x={p[0]} y={p[1]} size={13} color={color}>
      {text}
    </Text>
  )
}

/** The small square marking a right angle at `at`. */
export function RightMark({ at, a, b, s = 0.3 }: { at: P; a: P; b: P; s?: number }) {
  const u = mul(unit(sub(a, at)), s)
  const v = mul(unit(sub(b, at)), s)
  return (
    <Polygon
      points={[at, add(at, u), add(add(at, u), v), add(at, v)]}
      color="var(--color-muted-3)"
      fillOpacity={0}
      weight={1.5}
    />
  )
}

/** An arc marking the angle at `at` from ray a to ray b (the smaller angle). */
export function AngleArc({
  at,
  a,
  b,
  r = 0.6,
  color = 'var(--color-ink)',
}: {
  at: P
  a: P
  b: P
  r?: number
  color?: string
}) {
  const a0 = Math.atan2(a[1] - at[1], a[0] - at[0])
  let d = Math.atan2(b[1] - at[1], b[0] - at[0]) - a0
  while (d > Math.PI) d -= 2 * Math.PI
  while (d <= -Math.PI) d += 2 * Math.PI
  const pts: P[] = Array.from({ length: 14 }, (_, i) => {
    const t = a0 + (d * i) / 13
    return [at[0] + r * Math.cos(t), at[1] + r * Math.sin(t)]
  })
  return (
    <>
      {pts.slice(1).map((p, i) => (
        <Line.Segment key={i} point1={pts[i]} point2={p} color={color} weight={2} />
      ))}
    </>
  )
}

export function Seg({
  a,
  b,
  color = 'var(--color-ink)',
  weight = 3,
  dashed,
}: {
  a: P
  b: P
  color?: string
  weight?: number
  dashed?: boolean
}) {
  return <Line.Segment point1={a} point2={b} color={color} weight={weight} style={dashed ? 'dashed' : 'solid'} />
}

export const centroid = (...ps: P[]): P => [
  ps.reduce((s, p) => s + p[0], 0) / ps.length,
  ps.reduce((s, p) => s + p[1], 0) / ps.length,
]

export function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v))
}
