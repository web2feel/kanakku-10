import { useId, useMemo, useState } from 'react'
import { build, type CShape, type Construction, type ConstructionRef, type V } from '../lib/constructions'
import { Rich } from './Rich'

const PAD = 34

const OFF: Record<string, [number, number, 'start' | 'middle' | 'end']> = {
  n: [0, -10, 'middle'],
  s: [0, 19, 'middle'],
  e: [9, 5, 'start'],
  w: [-9, 5, 'end'],
  ne: [7, -7, 'start'],
  nw: [-7, -7, 'end'],
  se: [7, 16, 'start'],
  sw: [-7, 16, 'end'],
}

function bounds(c: Construction) {
  let x0 = Infinity
  let y0 = Infinity
  let x1 = -Infinity
  let y1 = -Infinity
  const take = ([x, y]: V, r = 0) => {
    x0 = Math.min(x0, x - r)
    x1 = Math.max(x1, x + r)
    y0 = Math.min(y0, y - r)
    y1 = Math.max(y1, y + r)
  }
  for (const s of c.steps.flatMap((st) => st.shapes)) {
    if (s.t === 'pt') take(s.at)
    else if (s.t === 'seg') (take(s.a), take(s.b))
    else if (s.t === 'circle') take(s.c, s.r)
    else if (s.t === 'fill') s.pts.forEach((p) => take(p))
    else if (s.t === 'arc') {
      for (let i = 0; i <= 8; i++) {
        const a = s.a0 + ((s.a1 - s.a0) * i) / 8
        take([s.c[0] + s.r * Math.cos(a), s.c[1] + s.r * Math.sin(a)])
      }
    }
  }
  if (!Number.isFinite(x0)) return [0, 0, 1, 1]
  return [x0, y0, x1, y1]
}

/** Draws a construction up to `stage` steps; the newest step is drawn in coral. */
export function ConstructionFigure({
  c,
  stage,
  maxWidth = 520,
}: {
  c: Construction
  stage: number
  maxWidth?: number
}) {
  const uid = useId().replace(/:/g, '')
  const [x0, y0, x1, y1] = useMemo(() => bounds(c), [c])
  const W = maxWidth
  const k = (W - 2 * PAD) / Math.max(1e-6, x1 - x0)
  const kk = Math.min(k, (maxWidth * 0.95) / Math.max(1e-6, y1 - y0))
  const H = (y1 - y0) * kk + 2 * PAD
  const Wd = (x1 - x0) * kk + 2 * PAD
  const px = ([x, y]: V): V => [PAD + (x - x0) * kk, PAD + (y1 - y) * kk]

  const shown = c.steps.slice(0, Math.max(0, stage))
  const layers: { s: CShape; isNew: boolean }[] = shown.flatMap((st, i) =>
    st.shapes.map((s) => ({ s, isNew: i === shown.length - 1 && stage < c.steps.length + 1 })),
  )
  const order = (s: CShape) => ({ fill: 0, circle: 1, seg: 2, arc: 3, right: 4, angle: 5, pt: 6 })[s.t]
  layers.sort((a, b) => order(a.s) - order(b.s))

  return (
    <div className="cx-figure" style={{ maxWidth: Wd }}>
      <svg viewBox={`0 0 ${Wd} ${H}`} role="img" aria-label={c.title}>
        <defs>
          <marker
            id={`arr-${uid}`}
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="9"
            markerHeight="9"
            markerUnits="userSpaceOnUse"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" className="cx-arrow" />
          </marker>
        </defs>
        {layers.map(({ s, isNew }, i) => (
          <ShapeView key={i} s={s} isNew={isNew} px={px} k={kk} arrow={`url(#arr-${uid})`} />
        ))}
      </svg>
    </div>
  )
}

function ShapeView({
  s,
  isNew,
  px,
  k,
  arrow,
}: {
  s: CShape
  isNew: boolean
  px: (v: V) => V
  k: number
  arrow: string
}) {
  const cls = (base: string) => `${base} ${isNew ? 'is-new' : ''}`
  switch (s.t) {
    case 'fill': {
      const d = s.pts.map((p, i) => `${i ? 'L' : 'M'} ${px(p).join(' ')}`).join(' ') + ' Z'
      return <path d={d} className={cls('cx-fill')} />
    }
    case 'circle': {
      const [cx, cy] = px(s.c)
      return <circle cx={cx} cy={cy} r={s.r * k} className={cls(`cx-line cx-${s.style}`)} />
    }
    case 'seg': {
      const [ax, ay] = px(s.a)
      const [bx, by] = px(s.b)
      return (
        <line
          x1={ax}
          y1={ay}
          x2={bx}
          y2={by}
          className={cls(`cx-line cx-${s.style}`)}
          markerEnd={s.ends === 'ray' || s.ends === 'line' ? arrow : undefined}
          markerStart={s.ends === 'line' ? arrow : undefined}
        />
      )
    }
    case 'arc': {
      const steps = 16
      const pts = Array.from({ length: steps + 1 }, (_, i) => {
        const a = s.a0 + ((s.a1 - s.a0) * i) / steps
        return px([s.c[0] + s.r * Math.cos(a), s.c[1] + s.r * Math.sin(a)])
      })
      const d = pts.map((p, i) => `${i ? 'L' : 'M'} ${p[0]} ${p[1]}`).join(' ')
      return <path d={d} className={cls(`cx-line cx-${s.style ?? 'mark'}`)} />
    }
    case 'right': {
      const at = px(s.at)
      const u = dir(px(s.a), at)
      const v = dir(px(s.b), at)
      const z = 10
      const p1: V = [at[0] + u[0] * z, at[1] + u[1] * z]
      const p2: V = [p1[0] + v[0] * z, p1[1] + v[1] * z]
      const p3: V = [at[0] + v[0] * z, at[1] + v[1] * z]
      return <path d={`M ${p1.join(' ')} L ${p2.join(' ')} L ${p3.join(' ')}`} className={cls('cx-right')} />
    }
    case 'angle': {
      const at = px(s.at)
      const u = px(s.from)
      const v = px(s.to)
      const a1 = Math.atan2(u[1] - at[1], u[0] - at[0])
      let d = Math.atan2(v[1] - at[1], v[0] - at[0]) - a1
      while (d > Math.PI) d -= 2 * Math.PI
      while (d <= -Math.PI) d += 2 * Math.PI
      const r = 24
      const st: V = [at[0] + r * Math.cos(a1), at[1] + r * Math.sin(a1)]
      const en: V = [at[0] + r * Math.cos(a1 + d), at[1] + r * Math.sin(a1 + d)]
      const mid = a1 + d / 2
      const lr = r + 16
      return (
        <g className={cls('cx-angle')}>
          <path d={`M ${st.join(' ')} A ${r} ${r} 0 0 ${d > 0 ? 1 : 0} ${en.join(' ')}`} />
          <text x={at[0] + lr * Math.cos(mid)} y={at[1] + lr * Math.sin(mid) + 4} textAnchor="middle">
            {s.label}
          </text>
        </g>
      )
    }
    case 'pt': {
      const [x, y] = px(s.at)
      const [dx, dy, anchor] = OFF[s.dir ?? 'n']
      return (
        <g className={cls('cx-pt')}>
          <circle cx={x} cy={y} r={3} />
          <text x={x + dx} y={y + dy} textAnchor={anchor}>
            {s.label}
          </text>
        </g>
      )
    }
  }
}

function dir(a: V, b: V): V {
  const l = Math.hypot(a[0] - b[0], a[1] - b[1]) || 1
  return [(a[0] - b[0]) / l, (a[1] - b[1]) / l]
}

/** A construction with its steps: Back / Next, or everything at once. */
export function ConstructionPlayer({ cref, startAtEnd = false }: { cref: ConstructionRef; startAtEnd?: boolean }) {
  const c = useMemo(() => build(cref), [cref])
  const n = c.steps.length
  const [stage, setStage] = useState(startAtEnd ? n : 1)
  const s = Math.min(stage, n)
  return (
    <div className="cx-player">
      {c.error && (
        <p className="feedback f-wrong" role="status">
          <Rich text={c.error} />
        </p>
      )}
      {n > 0 && (
        <>
          <ConstructionFigure c={c} stage={s} />
          <div className="cx-step" aria-live="polite">
            <span className="cx-step-num">
              Step {s} of {n}
            </span>
            <p>
              <Rich text={c.steps[s - 1].text} />
            </p>
          </div>
          <div className="btn-row">
            <button className="btn-dark" disabled={s >= n} onClick={() => setStage(s + 1)}>
              Next step
            </button>
            <button className="btn-link" disabled={s <= 1} onClick={() => setStage(s - 1)}>
              Back
            </button>
            <button className="btn-link" disabled={s >= n} onClick={() => setStage(n)}>
              Show all steps
            </button>
            {s > 1 && (
              <button className="btn-link" onClick={() => setStage(1)}>
                Start again
              </button>
            )}
          </div>
        </>
      )}
    </div>
  )
}
