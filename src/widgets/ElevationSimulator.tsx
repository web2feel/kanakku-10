import { useRef, useState } from 'react'
import { Tex } from '../components/Rich'

const W = 600
const PAD = 26
const X0 = -4 // world x range (metres)
const X1 = 96
const YMAX = 64
const K = (W - 2 * PAD) / (X1 - X0)
const H = YMAX * K + PAD * 2
const TOWER_X = 88

const sx = (x: number) => PAD + (x - X0) * K
const sy = (y: number) => PAD + (YMAX - y) * K

/**
 * An observer on level ground looking at the top of a tower.
 * Drag the observer or use the sliders; the angle of elevation and tan θ update live.
 */
export function ElevationSimulator() {
  const [h, setH] = useState(30)
  const [d, setD] = useState(52)
  const [showDep, setShowDep] = useState(false)
  const svgRef = useRef<SVGSVGElement>(null)
  const dragging = useRef(false)

  const theta = (Math.atan2(h, d) * 180) / Math.PI
  const sight = Math.hypot(h, d)
  const ox = TOWER_X - d

  function onPointer(e: React.PointerEvent) {
    if (!dragging.current || !svgRef.current) return
    const r = svgRef.current.getBoundingClientRect()
    const px = ((e.clientX - r.left) / r.width) * W
    const wx = (px - PAD) / K + X0
    setD(Math.round(Math.max(5, Math.min(84, TOWER_X - wx))))
  }

  // angle arc at observer
  const arcR = 46
  const a = (theta * Math.PI) / 180
  const O = [sx(ox), sy(0)]
  const T = [sx(TOWER_X), sy(h)]
  const arcEnd = [O[0] + arcR * Math.cos(-a), O[1] + arcR * Math.sin(-a)]
  // depression arc at top
  const depEnd = [T[0] - arcR * Math.cos(a), T[1] + arcR * Math.sin(a)]

  return (
    <div className="widget elevation">
      <div className="widget-stage">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className="sim-svg"
          onPointerMove={onPointer}
          onPointerUp={() => (dragging.current = false)}
          onPointerLeave={() => (dragging.current = false)}
          role="img"
          aria-label={`Observer ${d} metres from a ${h} metre tower. Angle of elevation ${theta.toFixed(1)} degrees.`}
        >
          {/* grid every 10 m */}
          {Array.from({ length: 10 }, (_, i) => (
            <line key={`gx${i}`} x1={sx(i * 10)} y1={sy(0)} x2={sx(i * 10)} y2={sy(YMAX)} className="grid-line" />
          ))}
          {Array.from({ length: 7 }, (_, i) => (
            <line key={`gy${i}`} x1={sx(X0)} y1={sy(i * 10)} x2={sx(X1)} y2={sy(i * 10)} className="grid-line" />
          ))}
          <line x1={0} y1={sy(0)} x2={W} y2={sy(0)} className="scene-ground" />

          {/* tower */}
          <g className="obj">
            <path
              d={`M ${sx(TOWER_X - 3.5)} ${sy(0)} L ${sx(TOWER_X - 1.6)} ${sy(h)} L ${sx(TOWER_X + 1.6)} ${sy(h)} L ${sx(TOWER_X + 3.5)} ${sy(0)} Z`}
            />
          </g>

          {/* triangle sides */}
          <line x1={O[0]} y1={O[1]} x2={sx(TOWER_X)} y2={sy(0)} className="seg seg-adj" />
          <line x1={sx(TOWER_X)} y1={sy(0)} x2={T[0]} y2={T[1]} className="seg seg-opp" />
          <line x1={O[0]} y1={O[1]} x2={T[0]} y2={T[1]} className="seg seg-hyp seg-sight" />
          <path
            d={`M ${sx(TOWER_X) - 10} ${sy(0)} L ${sx(TOWER_X) - 10} ${sy(0) - 10} L ${sx(TOWER_X)} ${sy(0) - 10}`}
            className="scene-right"
          />

          <g className="angle angle-on">
            <path d={`M ${O[0] + arcR} ${O[1]} A ${arcR} ${arcR} 0 0 0 ${arcEnd[0]} ${arcEnd[1]}`} />
          </g>
          <text x={O[0] + arcR + 8} y={O[1] - 8} className="angle-label">
            θ = {theta.toFixed(1)}°
          </text>

          {showDep && (
            <g>
              <line x1={T[0]} y1={T[1]} x2={O[0] - 10} y2={T[1]} className="seg seg-muted seg-dash" />
              <g className="angle angle-on">
                <path d={`M ${T[0] - arcR} ${T[1]} A ${arcR} ${arcR} 0 0 0 ${depEnd[0]} ${depEnd[1]}`} />
              </g>
              <text x={T[0] - arcR - 10} y={T[1] + 18} textAnchor="end" className="angle-label">
                depression {theta.toFixed(1)}°
              </text>
            </g>
          )}

          <text x={(O[0] + sx(TOWER_X)) / 2} y={sy(0) + 18} textAnchor="middle" className="seg-label seg-label-adj">
            distance {d} m
          </text>
          <text x={sx(TOWER_X) - 8} y={(sy(0) + T[1]) / 2} textAnchor="end" className="seg-label seg-label-opp">
            height {h} m
          </text>

          {/* draggable observer */}
          <g
            className="observer"
            transform={`translate(${O[0]} ${O[1]})`}
            onPointerDown={(e) => {
              dragging.current = true
              ;(e.currentTarget.ownerSVGElement as SVGSVGElement).setPointerCapture(e.pointerId)
            }}
            tabIndex={0}
            role="slider"
            aria-label="Observer position"
            aria-valuenow={d}
            aria-valuemin={5}
            aria-valuemax={84}
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft') setD((v) => Math.min(84, v + 1))
              if (e.key === 'ArrowRight') setD((v) => Math.max(5, v - 1))
            }}
          >
            <circle r={18} className="observer-hit" />
            <g className="obj-person">
              <circle cx={0} cy={-26} r={4} />
              <line x1={0} y1={-22} x2={0} y2={-10} />
              <line x1={0} y1={-10} x2={-4} y2={0} />
              <line x1={0} y1={-10} x2={4} y2={0} />
            </g>
            <path d="M -12 8 L -6 4 L -6 12 Z M 12 8 L 6 4 L 6 12 Z" className="observer-arrows" />
          </g>
        </svg>
      </div>

      <div className="widget-panel">
        <div className="readout">
          <span className="readout-label">Angle of elevation</span>
          <span className="readout-value tabular">{theta.toFixed(1)}°</span>
        </div>
        <Tex
          display
          tex={`\\tan\\theta = \\frac{\\htmlClass{c-opp}{\\text{height}}}{\\htmlClass{c-adj}{\\text{distance}}} = \\frac{${h}}{${d}} = ${(h / d).toFixed(3)}`}
        />
        <p className="small muted tabular">Line of sight: {sight.toFixed(1)} m</p>

        <label className="slider">
          <span>Tower height: {h} m</span>
          <input type="range" min={10} max={60} value={h} onChange={(e) => setH(Number(e.target.value))} />
        </label>
        <label className="slider">
          <span>Distance from the tower: {d} m</span>
          <input type="range" min={5} max={84} value={d} onChange={(e) => setD(Number(e.target.value))} />
        </label>
        <label className="toggle">
          <input type="checkbox" checked={showDep} onChange={(e) => setShowDep(e.target.checked)} />
          <span>Show the angle of depression from the top</span>
        </label>
      </div>
    </div>
  )
}
