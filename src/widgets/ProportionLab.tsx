import { useState } from 'react'
import { Coordinates, Mafs, MovablePoint, Polygon, Theme } from 'mafs'
import { Tex } from '../components/Rich'
import { AngleArc, Label, Seg, angleAt, centroid, clamp, dist, f1, f2, lerp, type P } from './geoKit'

type Mode = 'bpt' | 'converse' | 'bisector'

/**
 * BPT: a line DE parallel to BC cuts AB and AC in the same ratio.
 * Converse: move D and E separately; DE is parallel to BC exactly when the ratios match.
 * Angle bisector: the bisector of ∠A cuts BC in the ratio AB : AC.
 */
export function ProportionLab() {
  const [mode, setMode] = useState<Mode>('bpt')
  const [a, setA] = useState<P>([2.2, 5.2])
  const [b, setB] = useState<P>([0, 0])
  const [c, setC] = useState<P>([7, 0])
  const [t, setT] = useState(0.4)
  const [u, setU] = useState(0.55)

  const g = centroid(a, b, c)
  const d = lerp(a, b, t)
  const e = lerp(a, c, mode === 'converse' ? u : t)
  const ab = dist(a, b)
  const ac = dist(a, c)
  // angle bisector foot: BD/DC = AB/AC
  const foot = lerp(b, c, ab / (ab + ac))

  const r1 = dist(a, d) / dist(d, b)
  const r2 = dist(a, e) / dist(e, c)
  const parallel = Math.abs(r1 - r2) < 0.02

  return (
    <div className="widget proportion-lab">
      <div className="widget-stage mafs-wrap">
        <Mafs
          height={400}
          viewBox={{ x: [-1, 8.5], y: [-1, 6.5] }}
          preserveAspectRatio="contain"
          pan={false}
          zoom={false}
        >
          <Coordinates.Cartesian xAxis={{ lines: 1, labels: false }} yAxis={{ lines: 1, labels: false }} />
          <Polygon points={[a, b, c]} color="var(--color-sun)" fillOpacity={0.18} weight={0} />
          <Seg a={a} b={b} />
          <Seg a={b} b={c} color="var(--color-adj)" />
          <Seg a={c} b={a} />
          {mode !== 'bisector' ? (
            <>
              <Seg a={d} b={e} color={parallel ? 'var(--color-hyp)' : 'var(--color-opp)'} weight={4} />
              <Label at={d} text="D" away={[d[0] + 1, d[1]]} />
              <Label at={e} text="E" away={[e[0] - 1, e[1]]} />
            </>
          ) : (
            <>
              <Seg a={a} b={foot} color="var(--color-hyp)" weight={4} />
              <AngleArc at={a} a={b} b={foot} r={0.7} color="var(--color-coral)" />
              <AngleArc at={a} a={foot} b={c} r={0.9} color="var(--color-coral)" />
              <Label at={foot} text="D" away={[foot[0], foot[1] + 1]} />
            </>
          )}
          <Label at={a} text="A" away={g} />
          <Label at={b} text="B" away={g} />
          <Label at={c} text="C" away={g} />
          <MovablePoint
            point={a}
            color={Theme.pink}
            onMove={([x, y]) => setA([clamp(x, 0.5, 6.5), clamp(y, 2.5, 6)])}
          />
          <MovablePoint
            point={b}
            color={Theme.blue}
            onMove={([x, y]) => setB([clamp(x, -0.5, 2), clamp(y, -0.5, 1)])}
          />
          <MovablePoint point={c} color={Theme.blue} onMove={([x, y]) => setC([clamp(x, 5, 8), clamp(y, -0.5, 1)])} />
        </Mafs>
      </div>

      <div className="widget-panel">
        <div className="chip-row" role="group" aria-label="What to explore">
          {(
            [
              ['bpt', 'Parallel line (BPT)'],
              ['converse', 'Converse of BPT'],
              ['bisector', 'Angle bisector'],
            ] as [Mode, string][]
          ).map(([m, l]) => (
            <button key={m} className={`chip ${mode === m ? 'is-on' : ''}`} onClick={() => setMode(m)}>
              {l}
            </button>
          ))}
        </div>

        {mode !== 'bisector' && (
          <label className="slider">
            <span>
              Position of <Tex tex="D" /> on <Tex tex="AB" />
              {mode === 'bpt' && (
                <>
                  {' '}
                  (and <Tex tex="E" /> keeps <Tex tex="DE \parallel BC" />)
                </>
              )}
            </span>
            <input
              type="range"
              min={0.1}
              max={0.9}
              step={0.01}
              value={t}
              onChange={(ev) => setT(Number(ev.target.value))}
            />
          </label>
        )}
        {mode === 'converse' && (
          <label className="slider">
            <span>
              Position of <Tex tex="E" /> on <Tex tex="AC" />
            </span>
            <input
              type="range"
              min={0.1}
              max={0.9}
              step={0.01}
              value={u}
              onChange={(ev) => setU(Number(ev.target.value))}
            />
          </label>
        )}

        {mode !== 'bisector' ? (
          <>
            <div className="ratio-box">
              <table className="ratio-table tabular">
                <tbody>
                  <tr>
                    <th scope="row">
                      <Tex tex="\dfrac{AD}{DB}" />
                    </th>
                    <td>
                      <Tex tex={`\\dfrac{${f1(dist(a, d))}}{${f1(dist(d, b))}}`} />
                    </td>
                    <td className="ratio-val">{f2(r1)}</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <Tex tex="\dfrac{AE}{EC}" />
                    </th>
                    <td>
                      <Tex tex={`\\dfrac{${f1(dist(a, e))}}{${f1(dist(e, c))}}`} />
                    </td>
                    <td className="ratio-val">{f2(r2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className={`feedback ${parallel ? 'f-correct' : 'f-wrong'}`} aria-live="polite">
              {mode === 'bpt'
                ? 'DE is parallel to BC, and the two ratios are always equal.'
                : parallel
                  ? 'The ratios are equal, so DE is parallel to BC.'
                  : 'The ratios differ, so DE is not parallel to BC. Make them equal.'}
            </p>
          </>
        ) : (
          <>
            <div className="ratio-box">
              <table className="ratio-table tabular">
                <tbody>
                  <tr>
                    <th scope="row">
                      <Tex tex="\dfrac{AB}{AC}" />
                    </th>
                    <td>
                      <Tex tex={`\\dfrac{${f1(ab)}}{${f1(ac)}}`} />
                    </td>
                    <td className="ratio-val">{f2(ab / ac)}</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <Tex tex="\dfrac{BD}{DC}" />
                    </th>
                    <td>
                      <Tex tex={`\\dfrac{${f1(dist(b, foot))}}{${f1(dist(foot, c))}}`} />
                    </td>
                    <td className="ratio-val">{f2(dist(b, foot) / dist(foot, c))}</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <Tex tex="\angle BAD,\ \angle DAC" />
                    </th>
                    <td>
                      {f1(angleAt(a, b, foot))}°, {f1(angleAt(a, foot, c))}°
                    </td>
                    <td className="ratio-val">equal</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="feedback f-correct" aria-live="polite">
              The bisector of <Tex tex="\angle A" /> always cuts <Tex tex="BC" /> in the ratio <Tex tex="AB : AC" />.
              Drag <Tex tex="A" /> to make <Tex tex="AB = AC" />: where does <Tex tex="D" /> land?
            </p>
          </>
        )}
      </div>
    </div>
  )
}
