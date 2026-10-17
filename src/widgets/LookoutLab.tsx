import { useState } from 'react'
import { Coordinates, Mafs, MovablePoint, Polygon, Text, Theme } from 'mafs'
import { Tex } from '../components/Rich'
import { AngleArc, RightMark, Seg, clamp, f1, type P } from './geoKit'

const DEG = 180 / Math.PI
const deg = (r: number) => r * DEG

function Lighthouse({ x, h }: { x: number; h: number }) {
  return (
    <>
      <Polygon
        points={[
          [x - 3.2, 0],
          [x + 3.2, 0],
          [x + 2, h - 3],
          [x - 2, h - 3],
        ]}
        color="var(--color-ink)"
        fillOpacity={0.12}
        weight={2}
      />
      <Polygon
        points={[
          [x - 2.4, h - 3],
          [x + 2.4, h - 3],
          [x + 2.4, h],
          [x - 2.4, h],
        ]}
        color="var(--color-coral)"
        fillOpacity={0.5}
        weight={2}
      />
    </>
  )
}

function Ship({ x, flip = false }: { x: number; flip?: boolean }) {
  const s = flip ? -1 : 1
  return (
    <>
      <Polygon
        points={[
          [x - 5 * s, 2.2],
          [x + 5 * s, 2.2],
          [x + 3.4 * s, 0],
          [x - 3.4 * s, 0],
        ]}
        color="var(--color-ink)"
        fillOpacity={0.55}
        weight={1.5}
      />
      <Polygon
        points={[
          [x - 1.5 * s, 2.2],
          [x + 2 * s, 2.2],
          [x + 2 * s, 4.6],
          [x - 1.5 * s, 4.6],
        ]}
        color="var(--color-ink)"
        fillOpacity={0.15}
        weight={1.5}
      />
    </>
  )
}

function Water({ x0, x1 }: { x0: number; x1: number }) {
  return (
    <Polygon
      points={[
        [x0, 0],
        [x1, 0],
        [x1, -14],
        [x0, -14],
      ]}
      color="var(--color-sky)"
      fillOpacity={0.6}
      weight={0}
    />
  )
}

type Ships = 'one' | 'same' | 'opposite'

/**
 * Looking down from a lighthouse. The angle of depression at the top equals the angle of elevation
 * at the ship (alternate angles), so the problem becomes a right triangle on the ground.
 */
export function DepressionLab() {
  const [h, setH] = useState(60)
  const [ships, setShips] = useState<Ships>('one')
  const [x1, setX1] = useState(60)
  const [x2, setX2] = useState(110)
  const [xo, setXo] = useState(-70)

  const eye: P = [0, h]
  const foot: P = [0, 0]
  const second = ships === 'same' ? x2 : ships === 'opposite' ? xo : null
  const a1 = Math.atan2(h, x1)
  const a2 = second === null ? null : Math.atan2(h, Math.abs(second))
  const gap = second === null ? null : Math.abs(second - x1)

  const drawSight = (x: number, key: string) => {
    const dir = Math.sign(x)
    const hor: P = [x + dir * 12, h]
    return (
      <g key={key}>
        <Seg a={eye} b={hor} color="var(--color-muted-3)" weight={1.5} dashed />
        <Seg a={eye} b={[x, 0]} color="var(--color-hyp)" weight={2.5} />
        <AngleArc at={eye} a={hor} b={[x, 0]} r={11} color="var(--color-coral)" />
        <AngleArc at={[x, 0]} a={[x - dir * 10, 0]} b={eye} r={10} color="var(--color-coral)" />
        <Text
          x={x - dir * 15}
          y={4.5}
          size={13}
          color="var(--color-coral-ink)"
        >{`${f1(deg(Math.atan2(h, Math.abs(x))))}°`}</Text>
        <Text x={dir * 19} y={h - 4.5} size={13} color="var(--color-coral-ink)">
          {`${f1(deg(Math.atan2(h, Math.abs(x))))}°`}
        </Text>
      </g>
    )
  }

  return (
    <div className="widget depression-lab">
      <div className="widget-stage mafs-wrap">
        <Mafs
          height={380}
          viewBox={{ x: [-100, 165], y: [-14, 98] }}
          preserveAspectRatio="contain"
          pan={false}
          zoom={false}
        >
          <Coordinates.Cartesian xAxis={{ lines: 20, labels: false }} yAxis={{ lines: 20, labels: false }} />
          <Water x0={-110} x1={175} />
          <Lighthouse x={0} h={h} />
          <Seg a={foot} b={[x1, 0]} color="var(--color-adj)" weight={3} />
          {second !== null && <Seg a={foot} b={[second, 0]} color="var(--color-adj)" weight={3} />}
          <Seg a={foot} b={eye} color="var(--color-opp)" weight={3} />
          <RightMark at={foot} a={[x1, 0]} b={eye} s={4} />
          {drawSight(x1, 's1')}
          {second !== null && drawSight(second, 's2')}
          <Ship x={x1} />
          {second !== null && <Ship x={second} flip={second < 0} />}
          <Text x={-8} y={h / 2} size={13} color="var(--color-opp)">{`${h} m`}</Text>
          <MovablePoint
            point={[x1, 0]}
            color={Theme.pink}
            constrain={([x]) => [clamp(Math.round(x), 12, ships === 'same' ? x2 - 8 : 150), 0]}
            onMove={([x]) => setX1(clamp(Math.round(x), 12, ships === 'same' ? x2 - 8 : 150))}
          />
          {ships === 'same' && (
            <MovablePoint
              point={[x2, 0]}
              color={Theme.blue}
              constrain={([x]) => [clamp(Math.round(x), x1 + 8, 155), 0]}
              onMove={([x]) => setX2(clamp(Math.round(x), x1 + 8, 155))}
            />
          )}
          {ships === 'opposite' && (
            <MovablePoint
              point={[xo, 0]}
              color={Theme.blue}
              constrain={([x]) => [clamp(Math.round(x), -92, -12), 0]}
              onMove={([x]) => setXo(clamp(Math.round(x), -92, -12))}
            />
          )}
        </Mafs>
      </div>

      <div className="widget-panel">
        <div className="chip-row" role="group" aria-label="Ships">
          {(
            [
              ['one', 'One ship'],
              ['same', 'Two ships, same side'],
              ['opposite', 'Opposite sides'],
            ] as [Ships, string][]
          ).map(([id, label]) => (
            <button key={id} className={`chip ${ships === id ? 'is-on' : ''}`} onClick={() => setShips(id)}>
              {label}
            </button>
          ))}
        </div>
        <label className="slider">
          <span>
            Height of the lighthouse: <strong className="tabular">{h} m</strong>
          </span>
          <input type="range" min={20} max={85} value={h} onChange={(e) => setH(Number(e.target.value))} />
        </label>
        <div className="readout">
          <span className="readout-label">Angle of depression of the pink ship</span>
          <span className="readout-value tabular">{f1(deg(a1))}°</span>
        </div>
        <Tex
          display
          tex={`d = \\frac{h}{\\tan ${f1(deg(a1))}^\\circ} = \\frac{${h}}{${Math.tan(a1).toFixed(3)}} = ${x1}\\text{ m}`}
        />
        {a2 !== null && second !== null && (
          <>
            <div className="readout">
              <span className="readout-label">Angle of depression of the blue ship</span>
              <span className="readout-value tabular">{f1(deg(a2))}°</span>
            </div>
            <div className="readout">
              <span className="readout-label">Distance between the ships</span>
              <span className="readout-value is-lilac tabular">{gap} m</span>
            </div>
            <p className="small muted">
              {ships === 'same'
                ? 'Same side: subtract the two distances from the foot.'
                : 'Opposite sides: add the two distances from the foot.'}
            </p>
          </>
        )}
        <p className="feedback f-correct" aria-live="polite">
          The horizontal line at the top is parallel to the sea, so the angle of depression equals the angle of
          elevation at the ship (alternate angles). Work in the triangle on the ground.
        </p>
        <p className="small muted">Drag the ships along the water.</p>
      </div>
    </div>
  )
}

type Scene = 'tower' | 'cloud'

/**
 * From a window or roof, look up at the top of a tower and down at its foot. The horizontal line from the eye
 * splits the tower into two right triangles that share one side, the distance d.
 */
export function LookoutLab() {
  const [scene, setScene] = useState<Scene>('tower')
  const [h, setH] = useState(24)
  const [d, setD] = useState(60)
  const [H, setHH] = useState(90)

  const eye: P = [0, h]
  const M: P = [d, h]
  const top: P = [d, H]
  const bottom: P = scene === 'tower' ? [d, 0] : [d, -H]
  const up = Math.atan2(H - h, d)
  const down = Math.atan2(h - bottom[1], d)
  const yMin = scene === 'tower' ? -8 : -H - 8

  return (
    <div className="widget lookout-lab">
      <div className="widget-stage mafs-wrap">
        <Mafs
          height={400}
          viewBox={{ x: [-22, 125], y: [yMin, Math.max(H, 60) + 10] }}
          preserveAspectRatio="contain"
          pan={false}
          zoom={false}
        >
          <Coordinates.Cartesian xAxis={{ lines: 20, labels: false }} yAxis={{ lines: 20, labels: false }} />
          {scene === 'cloud' && (
            <Polygon
              points={[
                [-30, 0],
                [130, 0],
                [130, yMin - 10],
                [-30, yMin - 10],
              ]}
              color="var(--color-sky)"
              fillOpacity={0.45}
              weight={0}
            />
          )}
          {scene === 'tower' ? (
            <>
              <Polygon
                points={[
                  [-14, 0],
                  [0, 0],
                  [0, h],
                  [-14, h],
                ]}
                color="var(--color-ink)"
                fillOpacity={0.1}
                weight={2}
              />
              <Polygon
                points={[
                  [d, 0],
                  [d + 6, 0],
                  [d + 6, H],
                  [d, H],
                ]}
                color="var(--color-ink)"
                fillOpacity={0.1}
                weight={2}
              />
              <Seg a={[-20, 0]} b={[125, 0]} color="var(--color-ink)" weight={2} />
            </>
          ) : (
            <>
              <Seg a={[0, 0]} b={eye} color="var(--color-ink)" weight={2} />
              <Polygon
                points={[
                  [d - 7, H - 2],
                  [d + 7, H - 2],
                  [d + 4, H + 3],
                  [d - 4, H + 3],
                ]}
                color="var(--color-muted-3)"
                fillOpacity={0.6}
                weight={0}
              />
              <Polygon
                points={[
                  [d - 7, -H + 2],
                  [d + 7, -H + 2],
                  [d + 4, -H - 3],
                  [d - 4, -H - 3],
                ]}
                color="var(--color-muted-3)"
                fillOpacity={0.3}
                weight={0}
              />
              <Seg a={[d, 0]} b={bottom} color="var(--color-muted-3)" weight={1.5} dashed />
              <Text x={d + 16} y={-H} size={12} color="var(--color-muted)">
                reflection
              </Text>
              <Text x={d + 12} y={H} size={12} color="var(--color-muted)">
                cloud
              </Text>
            </>
          )}
          <Seg a={eye} b={M} color="var(--color-adj)" weight={3} />
          <Seg a={M} b={top} color="var(--color-opp)" weight={3} />
          <Seg a={M} b={bottom} color="var(--color-coral)" weight={3} />
          <Seg a={eye} b={top} color="var(--color-hyp)" weight={2.5} />
          <Seg a={eye} b={bottom} color="var(--color-hyp)" weight={2.5} />
          <RightMark at={M} a={eye} b={top} s={3.5} />
          <AngleArc at={eye} a={M} b={top} r={13} color="var(--color-coral)" />
          <AngleArc at={eye} a={M} b={bottom} r={9} color="var(--color-hyp)" />
          <Text x={15} y={h + (H - h) * 0.1 + 3} size={13} color="var(--color-coral-ink)">{`α = ${f1(deg(up))}°`}</Text>
          <Text x={13} y={h - 5} size={13} color="var(--color-hyp)">{`β = ${f1(deg(down))}°`}</Text>
          <Text x={d / 2} y={h + 3.5} size={13} color="var(--color-adj)">
            d
          </Text>
          <Text x={d - 6} y={(H + h) / 2} size={13} color="var(--color-opp)">
            H − h
          </Text>
          <Text x={d - 6} y={(h + bottom[1]) / 2} size={13} color="var(--color-coral-ink)">
            {scene === 'tower' ? 'h' : 'H + h'}
          </Text>
          <Text x={-6} y={h / 2} size={13} color="var(--color-ink)">
            h
          </Text>
          <MovablePoint
            point={top}
            color={Theme.pink}
            constrain={([, y]) => [d, clamp(Math.round(y), h + 4, 130)]}
            onMove={([, y]) => setHH(clamp(Math.round(y), h + 4, 130))}
          />
        </Mafs>
      </div>

      <div className="widget-panel">
        <div className="chip-row" role="group" aria-label="Situation">
          <button className={`chip ${scene === 'tower' ? 'is-on' : ''}`} onClick={() => setScene('tower')}>
            Tower across the street
          </button>
          <button className={`chip ${scene === 'cloud' ? 'is-on' : ''}`} onClick={() => setScene('cloud')}>
            Cloud and its reflection
          </button>
        </div>
        <label className="slider">
          <span>
            Height of the eye, <Tex tex="h" />: <strong className="tabular">{h} m</strong>
          </span>
          <input
            type="range"
            min={8}
            max={50}
            value={h}
            onChange={(e) => {
              const v = Number(e.target.value)
              setH(v)
              setHH((x) => Math.max(x, v + 4))
            }}
          />
        </label>
        <label className="slider">
          <span>
            Horizontal distance, <Tex tex="d" />: <strong className="tabular">{d} m</strong>
          </span>
          <input type="range" min={20} max={110} value={d} onChange={(e) => setD(Number(e.target.value))} />
        </label>
        <label className="slider">
          <span>
            Height of the {scene === 'tower' ? 'tower' : 'cloud'}, <Tex tex="H" />:{' '}
            <strong className="tabular">{H} m</strong>
          </span>
          <input type="range" min={h + 4} max={130} value={H} onChange={(e) => setHH(Number(e.target.value))} />
        </label>
        {scene === 'tower' ? (
          <Tex
            display
            tex={`\\begin{aligned} \\tan\\beta &= \\frac{h}{d} \\Rightarrow d = \\frac{${h}}{${Math.tan(down).toFixed(3)}} = ${d} \\\\ H - h &= d\\tan\\alpha = ${d} \\times ${Math.tan(up).toFixed(3)} = ${H - h} \\\\ H &= ${h} + ${H - h} = ${H} \\text{ m} \\end{aligned}`}
          />
        ) : (
          <Tex
            display
            tex={`\\tan\\alpha = \\frac{H - h}{d}, \\quad \\tan\\beta = \\frac{H + h}{d} \\;\\Rightarrow\\; H = \\frac{h(\\tan\\alpha + \\tan\\beta)}{\\tan\\beta - \\tan\\alpha} = ${H}\\text{ m}`}
          />
        )}
        <p className="feedback f-correct" aria-live="polite">
          {scene === 'tower'
            ? 'The horizontal line from the eye meets the tower at height h. Above it, use the angle of elevation; below it, the angle of depression. Both triangles share the distance d.'
            : 'The reflection is as far below the lake as the cloud is above it, so it is H + h below the eye. The two triangles again share d.'}
        </p>
        <p className="small muted">Drag the top point, or use the sliders.</p>
      </div>
    </div>
  )
}
