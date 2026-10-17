import { useState } from 'react'
import { Coordinates, Mafs, MovablePoint, Polygon, Theme } from 'mafs'
import { Tex } from '../components/Rich'
import { Label, SideLabel, Seg, angleAt, area, centroid, clamp, dist, f1, f2, type P } from './geoKit'

/**
 * Drag the vertices of ΔABC. ΔPQR starts as an exact scaled copy; nudge one of its sides to break the
 * similarity and watch which test fails.
 */
export function SimilarityLab() {
  const [a, setA] = useState<P>([1.3, 3.6])
  const [b, setB] = useState<P>([0, 0])
  const [c, setC] = useState<P>([4, 0])
  const [k, setK] = useState(1.5)
  const [nudge, setNudge] = useState(0)

  const q: P = [7, 0]
  const map = (v: P): P => [q[0] + (v[0] - b[0]) * k, q[1] + (v[1] - b[1]) * k]
  const p = map(a)
  const r0 = map(c)
  const r: P = [r0[0] + nudge, r0[1]]

  const sides = [
    { n: 'AB', m: 'PQ', x: dist(a, b), y: dist(p, q) },
    { n: 'BC', m: 'QR', x: dist(b, c), y: dist(q, r) },
    { n: 'CA', m: 'RP', x: dist(c, a), y: dist(r, p) },
  ]
  const ratios = sides.map((s) => s.y / s.x)
  const angles = [
    { n: 'A', m: 'P', x: angleAt(a, b, c), y: angleAt(p, q, r) },
    { n: 'B', m: 'Q', x: angleAt(b, a, c), y: angleAt(q, p, r) },
    { n: 'C', m: 'R', x: angleAt(c, a, b), y: angleAt(r, p, q) },
  ]
  const sss = Math.max(...ratios) - Math.min(...ratios) < 0.01
  const aa = angles.every((x) => Math.abs(x.x - x.y) < 0.3)
  const ga = centroid(a, b, c)
  const gp = centroid(p, q, r)
  const areaRatio = area(p, q, r) / area(a, b, c)

  return (
    <div className="widget similarity-lab">
      <div className="widget-stage mafs-wrap">
        <Mafs
          height={400}
          viewBox={{ x: [-0.8, 15.5], y: [-1, 8] }}
          preserveAspectRatio="contain"
          pan={false}
          zoom={false}
        >
          <Coordinates.Cartesian xAxis={{ lines: 1, labels: false }} yAxis={{ lines: 1, labels: false }} />
          <Polygon points={[a, b, c]} color="var(--color-adj)" fillOpacity={0.15} weight={0} />
          <Polygon
            points={[p, q, r]}
            color={sss ? 'var(--color-hyp)' : 'var(--color-opp)'}
            fillOpacity={0.15}
            weight={0}
          />
          <Seg a={a} b={b} />
          <Seg a={b} b={c} />
          <Seg a={c} b={a} />
          <Seg a={p} b={q} />
          <Seg a={q} b={r} color={nudge ? 'var(--color-opp)' : 'var(--color-ink)'} />
          <Seg a={r} b={p} color={nudge ? 'var(--color-opp)' : 'var(--color-ink)'} />
          {[
            [a, 'A'],
            [b, 'B'],
            [c, 'C'],
          ].map(([pt, n]) => (
            <Label key={n as string} at={pt as P} text={n as string} away={ga} />
          ))}
          {[
            [p, 'P'],
            [q, 'Q'],
            [r, 'R'],
          ].map(([pt, n]) => (
            <Label key={n as string} at={pt as P} text={n as string} away={gp} />
          ))}
          <SideLabel a={a} b={b} text={f1(sides[0].x)} away={ga} />
          <SideLabel a={b} b={c} text={f1(sides[1].x)} away={ga} />
          <SideLabel a={c} b={a} text={f1(sides[2].x)} away={ga} />
          <SideLabel a={p} b={q} text={f1(sides[0].y)} away={gp} />
          <SideLabel a={q} b={r} text={f1(sides[1].y)} away={gp} />
          <SideLabel a={r} b={p} text={f1(sides[2].y)} away={gp} />
          <MovablePoint
            point={a}
            color={Theme.pink}
            onMove={([x, y]) => setA([clamp(x, -0.5, 5.5), clamp(y, 0.6, 5)])}
          />
          <MovablePoint
            point={b}
            color={Theme.blue}
            onMove={([x, y]) => setB([clamp(x, -0.5, 2), clamp(y, -0.5, 1.5)])}
          />
          <MovablePoint
            point={c}
            color={Theme.blue}
            onMove={([x, y]) => setC([clamp(x, 2.5, 5.5), clamp(y, -0.5, 1.5)])}
          />
        </Mafs>
      </div>

      <div className="widget-panel">
        <label className="slider">
          <span>
            Scale factor for <Tex tex="\Delta PQR" />: <strong className="tabular">{f2(k)}</strong>
          </span>
          <input
            type="range"
            min={0.5}
            max={1.8}
            step={0.05}
            value={k}
            onChange={(e) => setK(Number(e.target.value))}
          />
        </label>
        <label className="slider">
          <span>
            Move <Tex tex="R" /> sideways (breaks the copy): <strong className="tabular">{f1(nudge)}</strong>
          </span>
          <input
            type="range"
            min={-1.5}
            max={1.5}
            step={0.1}
            value={nudge}
            onChange={(e) => setNudge(Number(e.target.value))}
          />
        </label>

        <div className="ratio-box">
          <table className="ratio-table tabular">
            <tbody>
              {sides.map((s, i) => (
                <tr key={s.n}>
                  <th scope="row">
                    <Tex tex={`\\dfrac{${s.m}}{${s.n}}`} />
                  </th>
                  <td>
                    <Tex tex={`\\dfrac{${f1(s.y)}}{${f1(s.x)}}`} />
                  </td>
                  <td className="ratio-val">{f2(ratios[i])}</td>
                </tr>
              ))}
              {angles.map((x) => (
                <tr key={x.n}>
                  <th scope="row">
                    <Tex tex={`\\angle ${x.n},\\ \\angle ${x.m}`} />
                  </th>
                  <td>
                    {Math.round(x.x)}°, {Math.round(x.y)}°
                  </td>
                  <td className="ratio-val">{Math.abs(x.x - x.y) < 0.3 ? 'equal' : 'differ'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className={`feedback ${sss && aa ? 'f-correct' : 'f-wrong'}`} aria-live="polite">
          {sss && aa ? (
            <>
              <Tex tex="\Delta ABC \sim \Delta PQR" />: all three side ratios are {f2(ratios[0])} and the angles match.
              The area ratio is {f2(areaRatio)}, which is {f2(ratios[0])}².
            </>
          ) : (
            <>
              Not similar: the side ratios differ{aa ? '' : ' and so do the angles'}. One wrong side is enough to break
              the SSS test.
            </>
          )}
        </p>
      </div>
    </div>
  )
}
