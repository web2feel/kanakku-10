/**
 * Ruler-and-compass constructions from the textbook, worked out from their measurements.
 * Each construction is a list of steps; each step adds shapes to the drawing.
 * Units are centimetres, y pointing up.
 */
export type V = [number, number]

export type CStyle = 'main' | 'aux' | 'mark' | 'result'
export type LabelDir = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw'

export type CShape =
  | { t: 'pt'; at: V; label: string; dir?: LabelDir }
  | { t: 'seg'; a: V; b: V; style: CStyle; ends?: 'none' | 'ray' | 'line'; label?: string }
  | { t: 'circle'; c: V; r: number; style: CStyle }
  /** a short compass arc, angles in radians */
  | { t: 'arc'; c: V; r: number; a0: number; a1: number; style?: CStyle }
  | { t: 'angle'; at: V; from: V; to: V; label: string }
  | { t: 'right'; at: V; a: V; b: V }
  | { t: 'fill'; pts: V[] }

export interface CStep {
  text: string
  shapes: CShape[]
}

export interface Construction {
  title: string
  steps: CStep[]
  /** a length the student can measure on their drawing, worked out exactly */
  result?: { label: string; value: number; unit: string }
  /** set when the measurements cannot make the figure */
  error?: string
}

export type ConstructionRef =
  /** a triangle similar to PQR with scale factor num/den */
  | { kind: 'similar'; num: number; den: number; names?: [string, string, string] }
  /** base, vertical angle and median / altitude / the point where the bisector meets the base */
  | {
      kind: 'median' | 'altitude' | 'bisector'
      base: number
      angle: number
      value: number
      /** [first end of the base, second end, vertex]; for 'bisector' the distance is measured from the first end */
      names?: [string, string, string]
      /** for 'median': also draw the altitude and measure it */
      measureAltitude?: boolean
    }
  | { kind: 'tangent-centre'; r: number; names?: [string, string] }
  | { kind: 'tangent-alt'; r: number; names?: [string, string, string, string] }
  | { kind: 'tangent-pair'; r: number; d: number; names?: [string, string] }
  /** a segment of length √n by the semicircle method (Activity 1) */
  | { kind: 'root'; n: number }

/* ---------- vector helpers ---------- */

export const add = (a: V, b: V): V => [a[0] + b[0], a[1] + b[1]]
export const sub = (a: V, b: V): V => [a[0] - b[0], a[1] - b[1]]
export const mul = (a: V, s: number): V => [a[0] * s, a[1] * s]
export const len = (a: V) => Math.hypot(a[0], a[1])
export const dist = (a: V, b: V) => len(sub(a, b))
export const unit = (a: V): V => mul(a, 1 / (len(a) || 1))
export const polar = (r: number, ang: number): V => [r * Math.cos(ang), r * Math.sin(ang)]
export const lerp = (a: V, b: V, t: number): V => add(a, mul(sub(b, a), t))
const perp = (a: V): V => [-a[1], a[0]]
const DEG = Math.PI / 180

/** Points where the line through p in direction d meets the circle (c, r), as parameters t along d (unit). */
function lineCircle(p: V, d: V, c: V, r: number): number[] {
  const u = unit(d)
  const f = sub(p, c)
  const b = f[0] * u[0] + f[1] * u[1]
  const cc = f[0] * f[0] + f[1] * f[1] - r * r
  const disc = b * b - cc
  if (disc < -1e-9) return []
  const s = Math.sqrt(Math.max(0, disc))
  return [-b - s, -b + s]
}

function circleCircle(c1: V, r1: number, c2: V, r2: number): V[] {
  const d = dist(c1, c2)
  if (d > r1 + r2 + 1e-9 || d < Math.abs(r1 - r2) - 1e-9 || d === 0) return []
  const a = (r1 * r1 - r2 * r2 + d * d) / (2 * d)
  const h = Math.sqrt(Math.max(0, r1 * r1 - a * a))
  const e = unit(sub(c2, c1))
  const m = add(c1, mul(e, a))
  return [add(m, mul(perp(e), h)), sub(m, mul(perp(e), h))]
}

/** Compass marks: two small arcs crossing at x, drawn from centres c1 and c2. */
function crossing(c1: V, c2: V, x: V): CShape[] {
  const mk = (c: V): CShape => {
    const a = Math.atan2(x[1] - c[1], x[0] - c[0])
    return { t: 'arc', c, r: dist(c, x), a0: a - 0.14, a1: a + 0.14, style: 'mark' }
  }
  return [mk(c1), mk(c2)]
}

/** The marks for a perpendicular bisector of ab, and the line itself from y-extent lo to hi along it. */
function perpBisector(a: V, b: V, reach: number): CShape[] {
  const m = lerp(a, b, 0.5)
  const n = unit(perp(sub(b, a)))
  const r = dist(a, b) * 0.75
  const h = Math.sqrt(r * r - (dist(a, b) / 2) ** 2)
  const up = add(m, mul(n, h))
  const down = sub(m, mul(n, h))
  return [
    ...crossing(a, b, up),
    ...crossing(a, b, down),
    { t: 'seg', a: sub(m, mul(n, reach)), b: add(m, mul(n, reach)), style: 'aux' },
  ]
}

const fmt = (n: number) => String(Math.round(n * 100) / 100)
const fmt1 = (n: number) => (Math.round(n * 10) / 10).toFixed(1)

/* ---------- the constructions ---------- */

export function build(ref: ConstructionRef): Construction {
  switch (ref.kind) {
    case 'similar':
      return similar(ref.num, ref.den, ref.names ?? ['P', 'Q', 'R'])
    case 'median':
    case 'altitude':
    case 'bisector':
      return baseAngle(ref)
    case 'tangent-centre':
      return tangentCentre(ref.r, ref.names ?? ['O', 'P'])
    case 'tangent-alt':
      return tangentAlt(ref.r, ref.names ?? ['O', 'L', 'M', 'N'])
    case 'tangent-pair':
      return tangentPair(ref.r, ref.d, ref.names ?? ['O', 'P'])
    case 'root':
      return root(ref.n)
  }
}

function similar(num: number, den: number, [P, Q, R]: [string, string, string]): Construction {
  const k = num / den
  const title = `Triangle similar to Δ${P}${Q}${R}, scale factor ${num}/${den}`
  if (!(num > 0 && den > 0) || num === den) {
    return { title, steps: [], error: 'Choose a scale factor that is not 1, such as 3/5 or 7/4.' }
  }
  const n = Math.max(num, den)
  const q: V = [0, 0]
  const r: V = [5, 0]
  const p: V = [1.7, 3.4]
  const s = Math.min(0.9, 6 / n)
  const dir = polar(1, -32 * DEG)
  const qi = (i: number) => add(q, mul(dir, s * i))
  const r2 = lerp(q, r, k)
  const p2 = lerp(q, p, k)
  const big = k > 1
  const sub_ = (i: number) => `${Q}${toSub(i)}`
  const marks: CShape[] = []
  for (let i = 1; i <= n; i++) {
    const c = qi(i - 1)
    const a = Math.atan2(dir[1], dir[0])
    marks.push({ t: 'arc', c, r: s, a0: a - 0.2, a1: a + 0.2, style: 'mark' })
    marks.push({ t: 'pt', at: qi(i), label: sub_(i), dir: 'sw' })
  }
  return {
    title,
    steps: [
      {
        text: `Draw any triangle $${P}${Q}${R}$.`,
        shapes: [
          { t: 'seg', a: p, b: q, style: 'main' },
          { t: 'seg', a: q, b: r, style: 'main' },
          { t: 'seg', a: r, b: p, style: 'main' },
          { t: 'pt', at: p, label: P, dir: 'n' },
          { t: 'pt', at: q, label: Q, dir: 'w' },
          { t: 'pt', at: r, label: R, dir: 'se' },
        ],
      },
      {
        text: `Draw a ray $${Q}X$ making an acute angle with $${Q}${R}$, on the side opposite to $${P}$.`,
        shapes: [
          { t: 'seg', a: q, b: qi(n + 0.8), style: 'aux', ends: 'ray' },
          { t: 'pt', at: qi(n + 0.8), label: 'X', dir: 'se' },
        ],
      },
      {
        text: `Keep the compass at one width and mark ${n} equal steps $${sub_(1)}, ${sub_(2)}, \\ldots, ${sub_(n)}$ along $${Q}X$ (${n} is the greater of ${num} and ${den}).`,
        shapes: marks,
      },
      {
        text: `Join $${sub_(den)}${R}$. Through $${sub_(num)}$ draw a line parallel to $${sub_(den)}${R}$, meeting ${big ? `$${Q}${R}$ extended` : `$${Q}${R}$`} at $${R}'$.`,
        shapes: [
          { t: 'seg', a: qi(den), b: r, style: 'aux' },
          ...(big ? [{ t: 'seg', a: r, b: add(r2, mul(unit(sub(r, q)), 0.4)), style: 'aux' } as CShape] : []),
          { t: 'seg', a: qi(num), b: r2, style: 'main' },
          { t: 'pt', at: r2, label: `${R}′`, dir: big ? 'ne' : 'n' },
        ],
      },
      {
        text: `Through $${R}'$ draw a line parallel to $${R}${P}$, meeting ${big ? `$${Q}${P}$ extended` : `$${Q}${P}$`} at $${P}'$.`,
        shapes: [
          ...(big ? [{ t: 'seg', a: p, b: add(p2, mul(unit(sub(p, q)), 0.4)), style: 'aux' } as CShape] : []),
          { t: 'seg', a: r2, b: p2, style: 'main' },
          { t: 'pt', at: p2, label: `${P}′`, dir: big ? 'n' : 'nw' },
        ],
      },
      {
        text: `$\\Delta ${P}'${Q}${R}'$ is the required triangle. Each of its sides is $\\tfrac{${num}}{${den}}$ of the matching side of $\\Delta ${P}${Q}${R}$.`,
        shapes: [
          { t: 'fill', pts: [p2, q, r2] },
          { t: 'seg', a: p2, b: q, style: 'result' },
          { t: 'seg', a: q, b: r2, style: 'result' },
          { t: 'seg', a: r2, b: p2, style: 'result' },
        ],
      },
    ],
  }
}

function toSub(i: number) {
  return `_{${i}}`
}

function baseAngle(ref: Extract<ConstructionRef, { kind: 'median' | 'altitude' | 'bisector' }>): Construction {
  const [L, Rn, Vn] = ref.names ?? ['P', 'Q', 'R']
  const { base: b, angle: th } = ref
  const what =
    ref.kind === 'median'
      ? `median $${Vn}G = ${fmt(ref.value)}$ cm`
      : ref.kind === 'altitude'
        ? `altitude ${fmt(ref.value)} cm`
        : `bisector meeting the base at $D$, $${L}D = ${fmt(ref.value)}$ cm`
  const title = `Δ${L}${Rn}${Vn}: base ${fmt(b)} cm, ∠${Vn} = ${fmt(th)}°, ${what.replace(/\$/g, '')}`
  if (!(b > 0 && th > 0 && th < 180 && ref.value > 0)) {
    return { title, steps: [], error: 'Use a positive base, an angle between 0° and 180°, and a positive length.' }
  }
  const pL: V = [0, 0]
  const pR: V = [b, 0]
  const t = th * DEG
  const g: V = [b / 2, 0]
  // centre of the circle whose major arc above the base holds the angle θ
  const o: V = [b / 2, b / 2 / Math.tan(t)]
  const rad = b / (2 * Math.sin(t))
  const e = polar(Math.min(b * 0.55, 3), -t)
  const fDir = polar(1, Math.PI / 2 - t)
  const fLen = dist(pL, o) + Math.max(1.6, rad * 0.45)
  const reach = Math.max(rad + Math.abs(o[1]) + 0.6, 2)

  const common: CStep[] = [
    {
      text: `Draw a line segment $${L}${Rn} = ${fmt(b)}$ cm.`,
      shapes: [
        { t: 'seg', a: pL, b: pR, style: 'main' },
        { t: 'pt', at: pL, label: L, dir: 'sw' },
        { t: 'pt', at: pR, label: Rn, dir: 'se' },
      ],
    },
    {
      text: `At $${L}$, draw $${L}E$ such that $\\angle ${Rn}${L}E = ${fmt(th)}^\\circ$ (below the base).`,
      shapes: [
        { t: 'seg', a: pL, b: e, style: 'aux', ends: 'ray' },
        { t: 'pt', at: e, label: 'E', dir: 's' },
        { t: 'angle', at: pL, from: pR, to: e, label: `${fmt(th)}°` },
      ],
    },
    {
      text: `At $${L}$, draw $${L}F$ such that $\\angle E${L}F = 90^\\circ$.`,
      shapes: [
        { t: 'seg', a: pL, b: add(pL, mul(fDir, fLen)), style: 'aux', ends: 'ray' },
        { t: 'pt', at: add(pL, mul(fDir, fLen)), label: 'F', dir: 'ne' },
        { t: 'right', at: pL, a: e, b: add(pL, fDir) },
      ],
    },
    {
      text: `Draw the perpendicular bisector of $${L}${Rn}$. It meets $${L}F$ at $O$ and $${L}${Rn}$ at $G$.`,
      shapes: [
        ...perpBisector(pL, pR, reach),
        { t: 'pt', at: o, label: 'O', dir: 'w' },
        { t: 'pt', at: g, label: 'G', dir: 's' },
      ],
    },
    {
      text: `With $O$ as centre and $O${L}$ as radius, draw a circle. Every point of the arc above $${L}${Rn}$ sees $${L}${Rn}$ at ${fmt(th)}°.`,
      shapes: [{ t: 'circle', c: o, r: rad, style: 'main' }],
    },
  ]

  const finish = (v: V, extra?: V, extraName?: string): CShape[] => [
    { t: 'fill', pts: [pL, pR, v] },
    { t: 'seg', a: pL, b: v, style: 'result' },
    { t: 'seg', a: v, b: pR, style: 'result' },
    { t: 'seg', a: pL, b: pR, style: 'result' },
    { t: 'angle', at: v, from: pL, to: pR, label: `${fmt(th)}°` },
    ...(extra && extraName ? [{ t: 'pt', at: extra, label: extraName, dir: 'n' } as CShape] : []),
  ]

  if (ref.kind === 'median') {
    const m = ref.value
    const pts = circleCircle(g, m, o, rad).filter((p) => p[1] > 1e-6)
    if (!pts.length) {
      return {
        title,
        steps: common,
        error: `A median of ${fmt(m)} cm is not possible here: the circle of radius ${fmt(m)} cm about $G$ does not reach the arc.`,
      }
    }
    pts.sort((a, c) => a[0] - c[0])
    const v = pts[0]
    const s2 = pts[1]
    const steps: CStep[] = [
      ...common,
      {
        text: `With $G$ as centre and radius ${fmt(m)} cm, mark arcs on the circle at $${Vn}$ and $S$.`,
        shapes: [
          ...pts.map((p) => {
            const a = Math.atan2(p[1] - g[1], p[0] - g[0])
            return { t: 'arc', c: g, r: m, a0: a - 0.15, a1: a + 0.15, style: 'mark' } as CShape
          }),
          { t: 'pt', at: v, label: Vn, dir: 'nw' },
          ...(s2 ? [{ t: 'pt', at: s2, label: 'S', dir: 'ne' } as CShape] : []),
          { t: 'seg', a: g, b: v, style: 'aux' },
        ],
      },
      {
        text: `Join $${L}${Vn}$ and $${Vn}${Rn}$. $\\Delta ${L}${Rn}${Vn}$ is the required triangle${s2 ? ` ($\\Delta ${L}${Rn}S$ also works)` : ''}.`,
        shapes: finish(v),
      },
    ]
    const alt = v[1]
    if (ref.measureAltitude) {
      const foot: V = [v[0], 0]
      steps.push({
        text: `From $${Vn}$ draw $${Vn}M$ perpendicular to the base (extended if needed). The altitude $${Vn}M \\approx ${fmt1(alt)}$ cm.`,
        shapes: [
          ...(foot[0] < 0 ? [{ t: 'seg', a: foot, b: pL, style: 'aux' } as CShape] : []),
          ...(foot[0] > b ? [{ t: 'seg', a: pR, b: foot, style: 'aux' } as CShape] : []),
          { t: 'seg', a: v, b: foot, style: 'main' },
          { t: 'right', at: foot, a: v, b: foot[0] < b / 2 ? pR : pL },
          { t: 'pt', at: foot, label: 'M', dir: 's' },
        ],
      })
    }
    return { title, steps, result: { label: `Altitude from ${Vn}`, value: alt, unit: 'cm' } }
  }

  if (ref.kind === 'altitude') {
    const h = ref.value
    const top = o[1] + rad
    if (h > top + 1e-9) {
      return {
        title,
        steps: common,
        error: `An altitude of ${fmt(h)} cm is too tall: the highest point of the arc is only ${fmt1(top)} cm above the base.`,
      }
    }
    const m: V = [b / 2, h]
    const ts = lineCircle(m, [1, 0], o, rad)
    const v: V = [b / 2 + ts[0], h]
    const s2: V = [b / 2 + ts[1], h]
    const w = rad + 0.6
    return {
      title,
      steps: [
        ...common,
        {
          text: `On the perpendicular bisector, mark $M$ with $GM = ${fmt(h)}$ cm.`,
          shapes: [
            { t: 'arc', c: g, r: h, a0: Math.PI / 2 - 0.15, a1: Math.PI / 2 + 0.15, style: 'mark' },
            { t: 'pt', at: m, label: 'M', dir: 'se' },
          ],
        },
        {
          text: `Through $M$ draw a line parallel to $${L}${Rn}$. It meets the circle at $${Vn}$ and $S$.`,
          shapes: [
            { t: 'seg', a: [b / 2 - w, h], b: [b / 2 + w, h], style: 'aux', ends: 'line' },
            { t: 'pt', at: v, label: Vn, dir: 'nw' },
            { t: 'pt', at: s2, label: 'S', dir: 'ne' },
          ],
        },
        {
          text: `Join $${L}${Vn}$ and $${Rn}${Vn}$. $\\Delta ${L}${Rn}${Vn}$ is the required triangle ($\\Delta ${L}${Rn}S$ also works).`,
          shapes: finish(v),
        },
      ],
    }
  }

  // bisector: D on the base, I the lowest point of the circle
  const d = ref.value
  if (d >= b) {
    return { title, steps: common, error: `$D$ must lie on the base, so $${L}D$ must be less than ${fmt(b)} cm.` }
  }
  const dPt: V = [d, 0]
  const iPt: V = [b / 2, o[1] - rad]
  const dir = sub(dPt, iPt)
  const ts = lineCircle(iPt, dir, o, rad)
  const v = add(iPt, mul(unit(dir), Math.max(...ts)))
  return {
    title,
    steps: [
      ...common,
      {
        text: `From $${L}$, mark $D$ on $${L}${Rn}$ with $${L}D = ${fmt(d)}$ cm.`,
        shapes: [
          { t: 'arc', c: pL, r: d, a0: -0.15, a1: 0.15, style: 'mark' },
          { t: 'pt', at: dPt, label: 'D', dir: 's' },
        ],
      },
      {
        text: `The perpendicular bisector meets the circle again at $I$, below the base. Join $ID$ and extend it to meet the circle at $${Vn}$.`,
        shapes: [
          { t: 'pt', at: iPt, label: 'I', dir: 's' },
          { t: 'seg', a: iPt, b: v, style: 'main' },
          { t: 'pt', at: v, label: Vn, dir: 'n' },
        ],
      },
      {
        text: `Join $${L}${Vn}$ and $${Vn}${Rn}$. $\\Delta ${L}${Rn}${Vn}$ is the required triangle: $${Vn}D$ bisects $\\angle ${Vn}$, because $I$ is the middle of the arc $${L}${Rn}$.`,
        shapes: finish(v),
      },
    ],
  }
}

function tangentCentre(r: number, [O, P]: [string, string]): Construction {
  const title = `Tangent at a point of a circle of radius ${fmt(r)} cm (using the centre)`
  if (!(r > 0)) return { title, steps: [], error: 'Use a positive radius.' }
  const o: V = [0, 0]
  const a = -40 * DEG
  const p = polar(r, a)
  const u = unit(p)
  const nrm = perp(u)
  const s = Math.min(1.2, r * 0.5)
  const m1 = sub(p, mul(u, s))
  const m2 = add(p, mul(u, s))
  const t = add(p, mul(nrm, s * 1.4))
  const w = r * 1.1
  return {
    title,
    steps: [
      {
        text: `With $${O}$ as centre, draw a circle of radius ${fmt(r)} cm.`,
        shapes: [
          { t: 'circle', c: o, r, style: 'main' },
          { t: 'pt', at: o, label: O, dir: 'nw' },
        ],
      },
      {
        text: `Take a point $${P}$ on the circle and join $${O}${P}$. Extend it beyond $${P}$.`,
        shapes: [
          { t: 'seg', a: o, b: p, style: 'main' },
          { t: 'seg', a: p, b: add(p, mul(u, s * 1.6)), style: 'aux' },
          { t: 'pt', at: p, label: P, dir: 'sw' },
        ],
      },
      {
        text: `Draw the line through $${P}$ perpendicular to $${O}${P}$: with $${P}$ as centre mark equal arcs on the line on both sides, then from those two points draw arcs that cross.`,
        shapes: [
          { t: 'arc', c: p, r: s, a0: a - 0.2, a1: a + 0.2, style: 'mark' },
          { t: 'arc', c: p, r: s, a0: a + Math.PI - 0.2, a1: a + Math.PI + 0.2, style: 'mark' },
          ...crossing(m1, m2, t),
        ],
      },
      {
        text: `Draw $TT'$ through $${P}$ and the crossing point. $TT'$ is the required tangent: it is perpendicular to the radius $${O}${P}$.`,
        shapes: [
          { t: 'seg', a: sub(p, mul(nrm, w)), b: add(p, mul(nrm, w)), style: 'result', ends: 'line' },
          { t: 'pt', at: add(p, mul(nrm, w)), label: 'T', dir: 'ne' },
          { t: 'pt', at: sub(p, mul(nrm, w)), label: 'T′', dir: 'sw' },
          { t: 'right', at: p, a: o, b: add(p, nrm) },
        ],
      },
    ],
  }
}

function tangentAlt(r: number, [O, L, Mn, N]: [string, string, string, string]): Construction {
  const title = `Tangent at a point of a circle of radius ${fmt(r)} cm (alternate segment)`
  if (!(r > 0)) return { title, steps: [], error: 'Use a positive radius.' }
  const o: V = [0, 0]
  const l = polar(r, -70 * DEG)
  const m = polar(r, 55 * DEG)
  const n = polar(r, 175 * DEG)
  // tangent direction at L, on the side of LM away from N
  const tan = unit(perp(l))
  const side = (x: V) => Math.sign((m[0] - l[0]) * (x[1] - l[1]) - (m[1] - l[1]) * (x[0] - l[0]))
  const tDir = side(add(l, tan)) === side(n) ? mul(tan, -1) : tan
  const w = r * 1.1
  const tPt = add(l, mul(tDir, w))
  const tPt2 = sub(l, mul(tDir, w))
  const angN = Math.acos((sub(m, n)[0] * sub(l, n)[0] + sub(m, n)[1] * sub(l, n)[1]) / (dist(m, n) * dist(l, n)))
  const label = `${Math.round(angN / DEG)}°`
  return {
    title,
    steps: [
      {
        text: `With $${O}$ as centre, draw a circle of radius ${fmt(r)} cm.`,
        shapes: [
          { t: 'circle', c: o, r, style: 'main' },
          { t: 'pt', at: o, label: O, dir: 'ne' },
        ],
      },
      {
        text: `Take a point $${L}$ on the circle. Through $${L}$ draw any chord $${L}${Mn}$.`,
        shapes: [
          { t: 'seg', a: l, b: m, style: 'main' },
          { t: 'pt', at: l, label: L, dir: 's' },
          { t: 'pt', at: m, label: Mn, dir: 'ne' },
        ],
      },
      {
        text: `Take a point $${N}$ on the circle so that $${L}$, $${Mn}$, $${N}$ go anticlockwise. Join $${L}${N}$ and $${N}${Mn}$.`,
        shapes: [
          { t: 'seg', a: l, b: n, style: 'main' },
          { t: 'seg', a: n, b: m, style: 'main' },
          { t: 'pt', at: n, label: N, dir: 'w' },
          { t: 'angle', at: n, from: m, to: l, label },
        ],
      },
      {
        text: `At $${L}$, copy the angle: draw $TT'$ so that $\\angle T${L}${Mn} = \\angle ${Mn}${N}${L}$. By the alternate segment theorem, $TT'$ is the required tangent.`,
        shapes: [
          { t: 'seg', a: tPt2, b: tPt, style: 'result', ends: 'line' },
          { t: 'pt', at: tPt, label: 'T', dir: 'e' },
          { t: 'pt', at: tPt2, label: 'T′', dir: 'w' },
          { t: 'angle', at: l, from: tPt, to: m, label },
        ],
      },
    ],
  }
}

function tangentPair(r: number, d: number, [O, P]: [string, string]): Construction {
  const title = `Tangents from a point ${fmt(d)} cm from the centre of a circle of radius ${fmt(r)} cm`
  if (!(r > 0 && d > 0)) return { title, steps: [], error: 'Use a positive radius and distance.' }
  if (d <= r) {
    return {
      title,
      steps: [],
      error: `The point must be outside the circle: ${fmt(d)} cm is not more than the radius ${fmt(r)} cm.`,
    }
  }
  const o: V = [0, 0]
  const p: V = [d, 0]
  const mPt: V = [d / 2, 0]
  const [a, b] = circleCircle(mPt, d / 2, o, r)
  const tl = Math.sqrt(d * d - r * r)
  return {
    title,
    steps: [
      {
        text: `With $${O}$ as centre, draw a circle of radius ${fmt(r)} cm.`,
        shapes: [
          { t: 'circle', c: o, r, style: 'main' },
          { t: 'pt', at: o, label: O, dir: 'w' },
        ],
      },
      {
        text: `Draw $${O}${P} = ${fmt(d)}$ cm.`,
        shapes: [
          { t: 'seg', a: o, b: p, style: 'main' },
          { t: 'pt', at: p, label: P, dir: 'e' },
        ],
      },
      {
        text: `Draw the perpendicular bisector of $${O}${P}$. It cuts $${O}${P}$ at $M$.`,
        shapes: [...perpBisector(o, p, d * 0.62), { t: 'pt', at: mPt, label: 'M', dir: 'se' }],
      },
      {
        text: `With $M$ as centre and $M${O}$ as radius, draw a circle. It cuts the first circle at $A$ and $B$.`,
        shapes: [
          { t: 'circle', c: mPt, r: d / 2, style: 'aux' },
          { t: 'pt', at: a, label: 'A', dir: 'n' },
          { t: 'pt', at: b, label: 'B', dir: 's' },
        ],
      },
      {
        text: `Join $${P}A$ and $${P}B$. These are the tangents. $\\angle ${O}A${P} = 90^\\circ$ (angle in a semicircle), so $${P}A = ${P}B = \\sqrt{${fmt(d)}^2 - ${fmt(r)}^2} \\approx ${fmt1(tl)}$ cm.`,
        shapes: [
          { t: 'seg', a: p, b: add(a, mul(unit(sub(a, p)), 0.8)), style: 'result', ends: 'ray' },
          { t: 'seg', a: p, b: add(b, mul(unit(sub(b, p)), 0.8)), style: 'result', ends: 'ray' },
          { t: 'seg', a: o, b: a, style: 'aux' },
          { t: 'seg', a: o, b: b, style: 'aux' },
          { t: 'right', at: a, a: o, b: p },
          { t: 'right', at: b, a: o, b: p },
        ],
      },
    ],
    result: { label: 'Length of each tangent', value: tl, unit: 'cm' },
  }
}

function root(n: number): Construction {
  const title = `A segment of length √${fmt(n)}`
  if (!(n > 0)) return { title, steps: [], error: 'Use a positive number.' }
  const a: V = [0, 0]
  const c: V = [n, 0]
  const b: V = [n + 1, 0]
  const mid: V = [(n + 1) / 2, 0]
  const h = Math.sqrt(n)
  const p: V = [n, h]
  return {
    title,
    steps: [
      {
        text: `Draw $AB = ${fmt(n + 1)}$ units and mark $C$ on it with $AC = ${fmt(n)}$ and $CB = 1$.`,
        shapes: [
          { t: 'seg', a, b, style: 'main' },
          { t: 'pt', at: a, label: 'A', dir: 'sw' },
          { t: 'pt', at: b, label: 'B', dir: 'se' },
          { t: 'pt', at: c, label: 'C', dir: 's' },
        ],
      },
      {
        text: `Draw a semicircle with $AB$ as diameter.`,
        shapes: [{ t: 'arc', c: mid, r: (n + 1) / 2, a0: 0, a1: Math.PI, style: 'main' }],
      },
      {
        text: `At $C$ draw a perpendicular to $AB$, meeting the semicircle at $P$.`,
        shapes: [
          { t: 'seg', a: c, b: p, style: 'main' },
          { t: 'right', at: c, a: b, b: p },
          { t: 'pt', at: p, label: 'P', dir: 'n' },
        ],
      },
      {
        text: `Join $PA$ and $PB$. $\\Delta ACP \\sim \\Delta PCB$, so $\\dfrac{AC}{CP} = \\dfrac{CP}{CB}$, giving $CP^2 = ${fmt(n)} \\times 1$ and $CP = \\sqrt{${fmt(n)}}$.`,
        shapes: [
          { t: 'fill', pts: [a, p, b] },
          { t: 'seg', a, b: p, style: 'aux' },
          { t: 'seg', a: p, b, style: 'aux' },
          { t: 'seg', a: c, b: p, style: 'result' },
        ],
      },
    ],
    result: { label: 'CP', value: h, unit: 'units' },
  }
}
