import { useEffect, useId, useRef, useState, type CSSProperties } from 'react'
import type { SceneSpec, SceneObject, Vec } from '../content/types'

const PAD = 30

type Dir = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw' | 'none'

const DIR_OFFSET: Record<Exclude<Dir, 'none'>, [number, number, 'start' | 'middle' | 'end']> = {
  n: [0, -10, 'middle'],
  s: [0, 18, 'middle'],
  e: [9, 5, 'start'],
  w: [-9, 5, 'end'],
  ne: [7, -7, 'start'],
  nw: [-7, -7, 'end'],
  se: [7, 16, 'start'],
  sw: [-7, 16, 'end'],
}

/**
 * Draws a heights-and-distances (or plain triangle) diagram from a SceneSpec.
 * World units have y pointing up; everything is converted to SVG pixels here.
 */
export function Scene({ spec, highlight }: { spec: SceneSpec; highlight?: string[] }) {
  const uid = useId().replace(/:/g, '')
  const [xmin, ymin, xmax, ymax] = spec.view
  const W = spec.maxWidth ?? 460
  // Keep labels readable when the diagram is drawn smaller than its natural width.
  const wrap = useRef<HTMLDivElement>(null)
  const [renderW, setRenderW] = useState(W)
  useEffect(() => {
    const el = wrap.current
    if (!el || typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(([e]) => setRenderW(e.contentRect.width || W))
    ro.observe(el)
    return () => ro.disconnect()
  }, [W])
  const textScale = Math.min(1.9, Math.max(1, W / Math.max(1, renderW)))
  const k = (W - 2 * PAD) / (xmax - xmin)
  const H = (ymax - ymin) * k + 2 * PAD
  const px = ([x, y]: Vec): Vec => [PAD + (x - xmin) * k, PAD + (ymax - y) * k]

  const pts: Record<string, Vec> = {}
  for (const [name, v] of Object.entries(spec.points)) pts[name] = px(v)

  const active = new Set(highlight ?? spec.highlight ?? [])
  const dimOthers = active.size > 0

  // centroid for automatic label placement
  const names = Object.keys(pts)
  const cx = names.reduce((s, n) => s + pts[n][0], 0) / Math.max(1, names.length)
  const cy = names.reduce((s, n) => s + pts[n][1], 0) / Math.max(1, names.length)

  const groundY = px([0, 0])[1]

  return (
    <div className="scene" ref={wrap} style={{ maxWidth: W, '--s': textScale } as CSSProperties}>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Diagram">
        <defs>
          <pattern id={`hatch-${uid}`} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="8" className="scene-hatch" />
          </pattern>
        </defs>

        {spec.water && (
          <g className="scene-water">
            <rect x={0} y={groundY} width={W} height={Math.max(0, H - groundY)} />
            {[10, 22, 34].map((d) => (
              <path
                key={d}
                d={`M 0 ${groundY + d} ` + Array.from({ length: Math.ceil(W / 24) }, () => `q 6 -4 12 0 t 12 0`).join(' ')}
                className="scene-wave"
              />
            ))}
          </g>
        )}
        {spec.ground && (
          <g>
            <rect x={0} y={groundY} width={W} height={Math.min(14, H - groundY)} fill={`url(#hatch-${uid})`} />
            <line x1={0} y1={groundY} x2={W} y2={groundY} className="scene-ground" />
          </g>
        )}

        {spec.objects?.map((o, i) => <SceneObj key={i} o={o} px={px} k={k} />)}

        {spec.north && <NorthArrow at={px(spec.north)} />}

        {spec.segs?.map((s, i) => {
          const a = pts[s.a]
          const b = pts[s.b]
          if (!a || !b) return null
          const on = s.id ? active.has(s.id) : false
          const cls = [
            'seg',
            `seg-${s.color ?? 'ink'}`,
            s.kind === 'dash' ? 'seg-dash' : '',
            s.kind === 'sight' ? 'seg-sight' : '',
            on ? 'seg-on' : dimOthers ? 'seg-dim' : '',
          ].join(' ')
          return <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} className={cls} />
        })}

        {spec.right?.map((r, i) => {
          const at = pts[r.at]
          const ua = unit(sub(pts[r.a], at))
          const ub = unit(sub(pts[r.b], at))
          const s = 11
          const p1 = add(at, mul(ua, s))
          const p2 = add(p1, mul(ub, s))
          const p3 = add(at, mul(ub, s))
          return <path key={i} d={`M ${p1[0]} ${p1[1]} L ${p2[0]} ${p2[1]} L ${p3[0]} ${p3[1]}`} className="scene-right" />
        })}

        {spec.angles?.map((an, i) => {
          const at = pts[an.at]
          const u = sub(pts[an.from], at)
          const v = sub(pts[an.to], at)
          const a1 = Math.atan2(u[1], u[0])
          let d = Math.atan2(v[1], v[0]) - a1
          while (d > Math.PI) d -= 2 * Math.PI
          while (d <= -Math.PI) d += 2 * Math.PI
          const r = an.r ?? 30
          const start = add(at, [r * Math.cos(a1), r * Math.sin(a1)])
          const end = add(at, [r * Math.cos(a1 + d), r * Math.sin(a1 + d)])
          const mid = a1 + d / 2
          const lr = r + (Math.abs(d) < 0.5 ? 26 : 15)
          const lp = add(at, [lr * Math.cos(mid), lr * Math.sin(mid)])
          const on = an.id ? active.has(an.id) : false
          return (
            <g key={i} className={`angle ${on ? 'angle-on' : dimOthers ? 'angle-dim' : ''}`}>
              <path d={`M ${start[0]} ${start[1]} A ${r} ${r} 0 0 ${d > 0 ? 1 : 0} ${end[0]} ${end[1]}`} />
              <text x={lp[0]} y={lp[1] + 4} textAnchor="middle" className="angle-label">
                {an.label}
              </text>
            </g>
          )
        })}

        {spec.segs?.map((s, i) => {
          if (!s.label) return null
          const a = pts[s.a]
          const b = pts[s.b]
          if (!a || !b) return null
          const m: Vec = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]
          const d = unit(sub(b, a))
          const side = s.labelSide ?? 1
          const n: Vec = [d[1] * side, -d[0] * side]
          const off = 13
          const p = add(m, mul(n, off))
          const anchor = Math.abs(n[0]) < 0.35 ? 'middle' : n[0] > 0 ? 'start' : 'end'
          const on = s.id ? active.has(s.id) : false
          return (
            <text
              key={`l${i}`}
              x={p[0]}
              y={p[1] + 4}
              textAnchor={anchor}
              className={`seg-label seg-label-${s.color ?? 'ink'} ${on ? 'seg-label-on' : ''}`}
            >
              {s.label}
            </text>
          )
        })}

        {names.map((n) => {
          const dir: Dir = spec.labelDir?.[n] ?? autoDir(pts[n], [cx, cy])
          if (dir === 'none') return null
          const [dx, dy, anchor] = DIR_OFFSET[dir]
          return (
            <g key={n}>
              <circle cx={pts[n][0]} cy={pts[n][1]} r={2.6} className="scene-dot" />
              <text x={pts[n][0] + dx} y={pts[n][1] + dy} textAnchor={anchor} className="point-label">
                {spec.names?.[n] ?? n}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

function autoDir(p: Vec, c: Vec): Dir {
  const dx = p[0] - c[0]
  const dy = p[1] - c[1]
  const ang = Math.atan2(-dy, dx) // math orientation
  const sector = Math.round(ang / (Math.PI / 4))
  const map: Record<string, Dir> = { '0': 'e', '1': 'ne', '2': 'n', '3': 'nw', '4': 'w', '-4': 'w', '-3': 'sw', '-2': 's', '-1': 'se' }
  return map[String(sector)] ?? 'n'
}

function NorthArrow({ at }: { at: Vec }) {
  return (
    <g className="scene-north">
      <line x1={at[0]} y1={at[1]} x2={at[0]} y2={at[1] - 34} />
      <path d={`M ${at[0] - 5} ${at[1] - 26} L ${at[0]} ${at[1] - 36} L ${at[0] + 5} ${at[1] - 26}`} />
      <text x={at[0]} y={at[1] - 42} textAnchor="middle">
        N
      </text>
    </g>
  )
}

function SceneObj({ o, px, k }: { o: SceneObject; px: (v: Vec) => Vec; k: number }) {
  const [bx, by] = px(o.at)
  const hp = o.h * k
  switch (o.type) {
    case 'tower': {
      const w = Math.max(12, (o.w ?? o.h * 0.12) * k)
      const top = by - hp
      const bands = Math.max(2, Math.round(hp / 26))
      return (
        <g className="obj">
          <path d={`M ${bx - w / 2} ${by} L ${bx - w / 4} ${top} L ${bx + w / 4} ${top} L ${bx + w / 2} ${by} Z`} />
          {Array.from({ length: bands }, (_, i) => {
            const y = by - ((i + 1) * hp) / (bands + 1)
            const t = (by - y) / hp
            const half = w / 2 - (w / 4) * t
            return <line key={i} x1={bx - half} y1={y} x2={bx + half} y2={y} className="obj-line" />
          })}
        </g>
      )
    }
    case 'lighthouse': {
      const w = Math.max(14, (o.w ?? o.h * 0.14) * k)
      const top = by - hp
      return (
        <g className="obj">
          <path d={`M ${bx - w / 2} ${by} L ${bx - w / 3} ${top + 10} L ${bx + w / 3} ${top + 10} L ${bx + w / 2} ${by} Z`} />
          {[0.25, 0.55].map((t) => {
            const y = by - hp * t
            const half = w / 2 - (w / 6) * t
            return <rect key={t} x={bx - half} y={y - 8} width={half * 2} height={8} className="obj-accent" />
          })}
          <rect x={bx - w / 3 - 2} y={top} width={(w * 2) / 3 + 4} height={10} className="obj-accent" />
        </g>
      )
    }
    case 'building': {
      const w = (o.w ?? o.h * 0.55) * k
      const cols = Math.max(1, Math.floor(w / 16))
      const rows = Math.max(1, Math.floor(hp / 18))
      return (
        <g className="obj">
          <rect x={bx - w / 2} y={by - hp} width={w} height={hp} />
          {Array.from({ length: rows * cols }, (_, i) => {
            const r = Math.floor(i / cols)
            const c = i % cols
            const cw = w / cols
            const rh = hp / rows
            return (
              <rect
                key={i}
                x={bx - w / 2 + c * cw + cw * 0.3}
                y={by - hp + r * rh + rh * 0.3}
                width={cw * 0.4}
                height={rh * 0.35}
                className="obj-window"
              />
            )
          })}
        </g>
      )
    }
    case 'tree': {
      const trunkH = hp * 0.4
      const cr = Math.max(8, Math.min(hp * 0.3, 34))
      return (
        <g className="obj-tree">
          <rect x={bx - 2.5} y={by - trunkH} width={5} height={trunkH} className="obj-trunk" />
          <ellipse cx={bx} cy={by - hp + cr * 1.05} rx={cr * 0.62} ry={cr * 1.05} className="obj-leaf" />
        </g>
      )
    }
    case 'pole': {
      return (
        <g className="obj">
          <line x1={bx} y1={by} x2={bx} y2={by - hp} className="obj-pole" />
        </g>
      )
    }
    case 'person': {
      const h = Math.max(22, hp)
      const head = h * 0.13
      return (
        <g className="obj-person">
          <circle cx={bx} cy={by - h + head} r={head} />
          <line x1={bx} y1={by - h + head * 2} x2={bx} y2={by - h * 0.42} />
          <line x1={bx} y1={by - h * 0.42} x2={bx - h * 0.14} y2={by} />
          <line x1={bx} y1={by - h * 0.42} x2={bx + h * 0.14} y2={by} />
          <line x1={bx - h * 0.16} y1={by - h * 0.68} x2={bx + h * 0.16} y2={by - h * 0.62} />
        </g>
      )
    }
    case 'kite': {
      const s = 11
      return (
        <g className="obj-kite">
          <path d={`M ${bx} ${by - s} L ${bx + s * 0.8} ${by} L ${bx} ${by + s * 1.4} L ${bx - s * 0.8} ${by} Z`} />
          <path d={`M ${bx} ${by + s * 1.4} q -6 8 0 14 t 0 14`} className="obj-tail" />
        </g>
      )
    }
    case 'ship': {
      const w = 36
      return (
        <g className="obj">
          <path d={`M ${bx - w / 2} ${by - 9} L ${bx + w / 2} ${by - 9} L ${bx + w / 2 - 6} ${by} L ${bx - w / 2 + 6} ${by} Z`} />
          <rect x={bx - 8} y={by - 17} width={14} height={8} className="obj-accent" />
        </g>
      )
    }
    case 'dome': {
      const r = hp
      return (
        <g className="obj">
          <path d={`M ${bx - r} ${by} A ${r} ${r} 0 0 1 ${bx + r} ${by} Z`} />
        </g>
      )
    }
    case 'bird': {
      return (
        <path
          d={`M ${bx - 9} ${by - 3} q 4.5 -6 9 0 q 4.5 -6 9 0`}
          className="obj-bird"
        />
      )
    }
    case 'plane': {
      return (
        <g className="obj-plane">
          <path d={`M ${bx - 16} ${by} L ${bx + 14} ${by} L ${bx + 18} ${by - 3} L ${bx - 12} ${by - 3} Z`} />
          <path d={`M ${bx - 2} ${by - 2} L ${bx - 8} ${by - 12} L ${bx - 4} ${by - 12} L ${bx + 6} ${by - 2} Z`} />
          <path d={`M ${bx - 14} ${by - 2} L ${bx - 17} ${by - 9} L ${bx - 14} ${by - 9} L ${bx - 9} ${by - 2} Z`} />
        </g>
      )
    }
  }
}

function sub(a: Vec, b: Vec): Vec {
  return [a[0] - b[0], a[1] - b[1]]
}
function add(a: Vec, b: Vec): Vec {
  return [a[0] + b[0], a[1] + b[1]]
}
function mul(a: Vec, s: number): Vec {
  return [a[0] * s, a[1] * s]
}
function unit(a: Vec): Vec {
  const l = Math.hypot(a[0], a[1]) || 1
  return [a[0] / l, a[1] / l]
}
