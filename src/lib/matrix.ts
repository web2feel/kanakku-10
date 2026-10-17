import type { MatrixAnswer, MatrixCell } from '../content/types'
import { checkNumeric, parseStudentNumber, type Verdict } from './answers'

/** The numeric value of a book cell ('8/3' → 2.666…). */
export function cellValue(c: MatrixCell): number {
  if (typeof c === 'number') return c
  const v = parseStudentNumber(c)
  if (v === null) throw new Error(`Matrix cell "${c}" could not be read`)
  return v
}

/** KaTeX for a cell: '8/3' → \frac{8}{3}, '-√7' → -\sqrt{7}, '4√2-9' → 4\sqrt{2}-9. */
export function cellTex(c: MatrixCell): string {
  if (typeof c === 'number') return c < 0 ? `-${-c}` : String(c)
  let s = c.replace(/[−–]/g, '-')
  s = s.replace(/√\(([^()]*)\)/g, '\\sqrt{$1}').replace(/√([\d.]+)/g, '\\sqrt{$1}')
  const frac = s.match(/^(-?)(.+)\/(.+)$/)
  if (frac) return `${frac[1]}\\frac{${frac[2]}}{${frac[3]}}`
  return s
}

/** A matrix in round brackets, as the textbook prints it. */
export function matrixTex(cells: MatrixCell[][]): string {
  return `\\begin{pmatrix}${cells.map((r) => r.map(cellTex).join(' & ')).join(' \\\\ ')}\\end{pmatrix}`
}

export function checkMatrix(grid: string[][], ans: MatrixAnswer): Verdict[][] {
  return ans.cells.map((row, i) =>
    row.map((c, j) => {
      const v = cellValue(c)
      return checkNumeric(grid[i]?.[j] ?? '', {
        value: v,
        display: '',
        tol: Math.max(1e-6, Math.abs(v) * 1e-6) + 0.005,
      })
    }),
  )
}

export const emptyGrid = (ans: MatrixAnswer) => ans.cells.map((r) => r.map(() => ''))
