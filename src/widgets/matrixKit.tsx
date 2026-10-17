import type { ReactNode } from 'react'
import { Tex } from '../components/Rich'
import { parseStudentNumber } from '../lib/answers'

export type Grid = number[][]

export const order = (g: Grid) => [g.length, g[0]?.length ?? 0] as const
export const orderTex = (g: Grid) => `${g.length} \\times ${g[0]?.length ?? 0}`
export const transpose = (g: Grid): Grid => (g[0] ?? []).map((_, j) => g.map((r) => r[j]))
export const zeros = (m: number, n: number): Grid => Array.from({ length: m }, () => Array(n).fill(0))
export const multiply = (a: Grid, b: Grid): Grid | null => {
  if ((a[0]?.length ?? 0) !== b.length) return null
  return a.map((r) => (b[0] ?? []).map((_, j) => r.reduce((s, x, k) => s + x * b[k][j], 0)))
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b)
}

/** A number as KaTeX, showing simple fractions as fractions (8/3 rather than 2.667). */
export function numTex(x: number): string {
  if (Number.isInteger(x)) return x < 0 ? `-${-x}` : String(x)
  for (let q = 2; q <= 12; q++) {
    const p = Math.round(x * q)
    if (Math.abs(p / q - x) < 1e-9) {
      const g = gcd(Math.abs(p), q)
      return `${p < 0 ? '-' : ''}\\tfrac{${Math.abs(p) / g}}{${q / g}}`
    }
  }
  return String(Math.round(x * 1000) / 1000)
}

/** Brackets a value that is negative, for writing products like 2 × (−3). */
export const paren = (x: number) => (x < 0 ? `(${numTex(x)})` : numTex(x))

export function readNumber(s: string): number | null {
  return parseStudentNumber(s)
}

interface MatrixProps {
  g: Grid
  /** extra class for each cell */
  cellClass?: (i: number, j: number) => string
  onCellEnter?: (i: number, j: number) => void
  onCellClick?: (i: number, j: number) => void
  onLeave?: () => void
  /** editable cells: called with the raw text */
  onEdit?: (i: number, j: number, raw: string) => void
  /** raw text of editable cells, so half-typed values like "-" survive */
  raw?: string[][]
  name?: string
  label?: ReactNode
  /** show the order under the matrix */
  showOrder?: boolean
  small?: boolean
}

/** A matrix in round brackets. Cells can be highlighted, hovered, clicked or edited. */
export function Matrix({
  g,
  cellClass,
  onCellEnter,
  onCellClick,
  onLeave,
  onEdit,
  raw,
  name,
  label,
  showOrder,
  small,
}: MatrixProps) {
  const [m, n] = order(g)
  return (
    <figure className={`mx-fig ${small ? 'is-small' : ''}`}>
      {(name || label) && (
        <figcaption className="mx-name">
          {name && <Tex tex={name} />}
          {label}
        </figcaption>
      )}
      <div
        className="mx"
        style={{ gridTemplateColumns: `repeat(${n}, auto)` }}
        onMouseLeave={onLeave}
        role="group"
        aria-label={`${name ? name.replace(/\\[a-z]+|[{}^]/g, '') + ', ' : ''}${m} by ${n} matrix`}
      >
        {g.map((row, i) =>
          row.map((x, j) => {
            const cls = `mx-cell ${cellClass?.(i, j) ?? ''}`
            if (onEdit) {
              return (
                <input
                  key={`${i}-${j}`}
                  className={`${cls} is-edit`}
                  value={raw?.[i]?.[j] ?? String(x)}
                  inputMode="text"
                  aria-label={`Row ${i + 1}, column ${j + 1}`}
                  onFocus={() => onCellEnter?.(i, j)}
                  onMouseEnter={() => onCellEnter?.(i, j)}
                  onChange={(e) => onEdit(i, j, e.target.value)}
                />
              )
            }
            const Tag = onCellClick ? 'button' : 'span'
            return (
              <Tag
                key={`${i}-${j}`}
                className={cls}
                onMouseEnter={() => onCellEnter?.(i, j)}
                onFocus={() => onCellEnter?.(i, j)}
                onClick={onCellClick ? () => onCellClick(i, j) : undefined}
                aria-label={onCellClick ? `Row ${i + 1}, column ${j + 1}` : undefined}
                type={onCellClick ? 'button' : undefined}
              >
                <Tex tex={numTex(x)} />
              </Tag>
            )
          }),
        )}
      </div>
      {showOrder && (
        <span className="mx-order">
          <Tex tex={`${m} \\times ${n}`} />
        </span>
      )}
    </figure>
  )
}

/** A small − n + stepper. */
export function Stepper({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: ReactNode
  value: number
  min: number
  max: number
  onChange: (v: number) => void
}) {
  return (
    <div className="stepper">
      <span className="stepper-label">{label}</span>
      <div className="stepper-ctl">
        <button type="button" aria-label="Decrease" disabled={value <= min} onClick={() => onChange(value - 1)}>
          −
        </button>
        <output aria-live="polite">{value}</output>
        <button type="button" aria-label="Increase" disabled={value >= max} onClick={() => onChange(value + 1)}>
          +
        </button>
      </div>
    </div>
  )
}

/** Keeps a grid and the raw text typed into each cell in step. */
export function resizeGrid(g: Grid, m: number, n: number): Grid {
  return Array.from({ length: m }, (_, i) => Array.from({ length: n }, (_, j) => g[i]?.[j] ?? 0))
}
