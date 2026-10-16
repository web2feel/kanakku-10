import { useState } from 'react'
import { Coordinates, Mafs, MovablePoint, Line, Polygon, Text, Plot, Theme } from 'mafs'
import { Tex } from '../components/Rich'

const DEG = Math.PI / 180

/**
 * The textbook's visual proof (Fig 6.2): a semicircle of radius 1, Q on the circle,
 * P and R the feet of perpendiculars on the x and y axes. OPQR is a rectangle.
 */
export function ComplementaryProof() {
  const [theta, setTheta] = useState(35)
  const t = theta * DEG
  const Q: [number, number] = [Math.cos(t), Math.sin(t)]
  const cos = Math.cos(t)
  const sin = Math.sin(t)

  return (
    <div className="widget complementary">
      <div className="widget-stage mafs-wrap">
        <Mafs
          height={320}
          viewBox={{ x: [-1.25, 1.25], y: [-0.25, 1.25] }}
          preserveAspectRatio="contain"
          pan={false}
          zoom={false}
        >
          <Coordinates.Cartesian xAxis={{ lines: 0.25, labels: false }} yAxis={{ lines: 0.25, labels: false }} />
          <Plot.Parametric
            t={[0, Math.PI]}
            xy={(a) => [Math.cos(a), Math.sin(a)]}
            color="var(--color-muted-3)"
            weight={2}
          />
          <Polygon points={[[0, 0], [Q[0], 0], Q, [0, Q[1]]]} color="var(--color-sun)" fillOpacity={0.3} weight={0} />
          <Line.Segment point1={[0, 0]} point2={Q} color="var(--color-hyp)" weight={3} />
          <Line.Segment point1={[0, 0]} point2={[Q[0], 0]} color="var(--color-adj)" weight={4} />
          <Line.Segment point1={[Q[0], 0]} point2={Q} color="var(--color-opp)" weight={4} />
          <Line.Segment point1={[0, Q[1]]} point2={Q} color="var(--color-opp)" weight={2} style="dashed" />
          <Line.Segment point1={[0, 0]} point2={[0, Q[1]]} color="var(--color-adj)" weight={2} style="dashed" />
          <Text x={-0.06} y={-0.08} size={14} color="var(--color-ink)">
            O
          </Text>
          <Text x={Q[0]} y={-0.1} size={14} color="var(--color-ink)">
            P
          </Text>
          <Text x={Q[0] + 0.07} y={Q[1] + 0.06} size={14} color="var(--color-ink)">
            Q
          </Text>
          <Text x={-0.08} y={Q[1]} size={14} color="var(--color-ink)">
            R
          </Text>
          <Text x={Q[0] / 2 - 0.08} y={Q[1] / 2 + 0.08} size={13} color="var(--color-hyp)">
            1
          </Text>
          <Text x={0.17 * Math.cos(t / 2) + 0.03} y={0.17 * Math.sin(t / 2)} size={13} color="var(--color-ink)">
            θ
          </Text>
          <Text
            x={0.24 * Math.cos((t + Math.PI / 2) / 2)}
            y={0.24 * Math.sin((t + Math.PI / 2) / 2) + 0.03}
            size={12}
            color="var(--color-ink)"
          >
            90°−θ
          </Text>
          <MovablePoint
            point={Q}
            color={Theme.pink}
            constrain={([x, y]) => {
              let a = Math.atan2(y, x)
              a = Math.max(5 * DEG, Math.min(85 * DEG, a))
              return [Math.cos(a), Math.sin(a)]
            }}
            onMove={([x, y]) => setTheta(Math.round((Math.atan2(y, x) / DEG) * 10) / 10)}
          />
        </Mafs>
      </div>
      <div className="widget-panel">
        <div className="readout">
          <span className="readout-label">θ</span>
          <span className="readout-value tabular">{theta.toFixed(1)}°</span>
        </div>
        <div className="readout">
          <span className="readout-label">90° − θ</span>
          <span className="readout-value is-lilac tabular">{(90 - theta).toFixed(1)}°</span>
        </div>
        <ul className="proof-lines tabular">
          <li>
            In △OPQ: <Tex tex={`\\htmlClass{c-adj}{OP} = \\cos\\theta = ${cos.toFixed(3)}`} />
          </li>
          <li>
            In △OPQ: <Tex tex={`\\htmlClass{c-opp}{PQ} = \\sin\\theta = ${sin.toFixed(3)}`} />
          </li>
          <li>
            In △QOR: <Tex tex={`OR = \\cos(90^\\circ-\\theta) = ${sin.toFixed(3)}`} />
          </li>
          <li>
            In △QOR: <Tex tex={`RQ = \\sin(90^\\circ-\\theta) = ${cos.toFixed(3)}`} />
          </li>
        </ul>
        <p className="small">
          OPQR is a rectangle, so <Tex tex="OR = PQ" /> and <Tex tex="RQ = OP" />. That gives
        </p>
        <div className="identity-box">
          <Tex tex="\sin(90^\circ-\theta)=\cos\theta" display />
        </div>
        <div className="identity-box">
          <Tex tex="\cos(90^\circ-\theta)=\sin\theta" display />
        </div>
      </div>
    </div>
  )
}
