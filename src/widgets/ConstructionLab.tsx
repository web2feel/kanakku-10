import { useMemo, useState } from 'react'
import { ConstructionPlayer } from '../components/ConstructionView'
import { build, type ConstructionRef } from '../lib/constructions'
import { readNumber } from './matrixKit'

type Kind = ConstructionRef['kind']

interface Field {
  key: string
  label: string
  def: string
}

const KINDS: { kind: Kind; label: string; fields: Field[] }[] = [
  {
    kind: 'similar',
    label: 'Similar triangle',
    fields: [
      { key: 'num', label: 'Scale factor: top', def: '3' },
      { key: 'den', label: 'bottom', def: '5' },
    ],
  },
  {
    kind: 'median',
    label: 'Base, angle, median',
    fields: [
      { key: 'base', label: 'Base PQ (cm)', def: '8' },
      { key: 'angle', label: 'Angle R (°)', def: '60' },
      { key: 'value', label: 'Median RG (cm)', def: '5.8' },
    ],
  },
  {
    kind: 'altitude',
    label: 'Base, angle, altitude',
    fields: [
      { key: 'base', label: 'Base QR (cm)', def: '5' },
      { key: 'angle', label: 'Angle P (°)', def: '30' },
      { key: 'value', label: 'Altitude (cm)', def: '4.2' },
    ],
  },
  {
    kind: 'bisector',
    label: 'Base, angle, bisector point',
    fields: [
      { key: 'base', label: 'Base BC (cm)', def: '8' },
      { key: 'angle', label: 'Angle A (°)', def: '60' },
      { key: 'value', label: 'BD (cm)', def: '6' },
    ],
  },
  {
    kind: 'tangent-centre',
    label: 'Tangent (using the centre)',
    fields: [{ key: 'r', label: 'Radius (cm)', def: '3' }],
  },
  { kind: 'tangent-alt', label: 'Tangent (alternate segment)', fields: [{ key: 'r', label: 'Radius (cm)', def: '4' }] },
  {
    kind: 'tangent-pair',
    label: 'Pair of tangents',
    fields: [
      { key: 'r', label: 'Radius (cm)', def: '3' },
      { key: 'd', label: 'Distance OP (cm)', def: '8' },
    ],
  },
  { kind: 'root', label: '√n by a semicircle', fields: [{ key: 'n', label: 'n', def: '2' }] },
]

const NAMES: Partial<Record<Kind, [string, string, string]>> = {
  median: ['P', 'Q', 'R'],
  altitude: ['Q', 'R', 'P'],
  bisector: ['B', 'C', 'A'],
}

function makeRef(kind: Kind, v: Record<string, number>): ConstructionRef {
  switch (kind) {
    case 'similar':
      return { kind, num: v.num, den: v.den }
    case 'median':
      return { kind, base: v.base, angle: v.angle, value: v.value, names: NAMES.median, measureAltitude: true }
    case 'altitude':
    case 'bisector':
      return { kind, base: v.base, angle: v.angle, value: v.value, names: NAMES[kind] }
    case 'tangent-centre':
    case 'tangent-alt':
      return { kind, r: v.r }
    case 'tangent-pair':
      return { kind, r: v.r, d: v.d }
    case 'root':
      return { kind, n: v.n }
  }
}

/** Every construction in the chapter, with measurements the student chooses. */
export function ConstructionLab({ only }: { only?: Kind[] }) {
  const kinds = only ? KINDS.filter((k) => only.includes(k.kind)) : KINDS
  const [kind, setKind] = useState<Kind>(kinds[0].kind)
  const spec = KINDS.find((k) => k.kind === kind)!
  const [raw, setRaw] = useState<Record<string, string>>(() =>
    Object.fromEntries(KINDS.flatMap((k) => k.fields.map((f) => [`${k.kind}.${f.key}`, f.def]))),
  )
  const values = Object.fromEntries(spec.fields.map((f) => [f.key, readNumber(raw[`${kind}.${f.key}`] ?? '') ?? NaN]))
  const valid = Object.values(values).every((x) => Number.isFinite(x))
  const ref = useMemo(() => (valid ? makeRef(kind, values) : null), [kind, valid, JSON.stringify(values)]) // eslint-disable-line react-hooks/exhaustive-deps
  const result = ref ? build(ref).result : undefined

  return (
    <div className="widget construction-lab">
      <div className="widget-panel">
        <div className="chip-row" role="group" aria-label="Construction">
          {kinds.map((k) => (
            <button key={k.kind} className={`chip ${kind === k.kind ? 'is-on' : ''}`} onClick={() => setKind(k.kind)}>
              {k.label}
            </button>
          ))}
        </div>
        <div className="cx-fields">
          {spec.fields.map((f) => (
            <label key={f.key} className="cx-field">
              <span>{f.label}</span>
              <input
                inputMode="decimal"
                value={raw[`${kind}.${f.key}`] ?? ''}
                onChange={(e) => setRaw((r) => ({ ...r, [`${kind}.${f.key}`]: e.target.value }))}
              />
            </label>
          ))}
        </div>
        {result && (
          <p className="small">
            {result.label}: about <strong>{(Math.round(result.value * 10) / 10).toFixed(1)}</strong> {result.unit}.
            Measure yours and compare.
          </p>
        )}
      </div>
      {ref ? (
        <ConstructionPlayer key={JSON.stringify(ref)} cref={ref} />
      ) : (
        <p className="feedback f-wrong">Type a number in each box.</p>
      )}
    </div>
  )
}
