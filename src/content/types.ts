/**
 * Content model for the tutor.
 *
 * Text fields ("Rich" strings) support a small markup:
 *   $...$            inline maths (KaTeX)
 *   **bold**         emphasis
 *   {{opp:text}}     colour-coded text: opp | adj | hyp | key
 */
export type Rich = string

export type WidgetName =
  | 'triangle-explorer'
  | 'complementary-proof'
  | 'standard-table'
  | 'elevation-simulator'
  | 'ratio-picker'
  | 'matrix-types'
  | 'aij-builder'
  | 'order-finder'
  | 'matrix-arith'
  | 'matrix-multiply'

/* ---------- Scene diagrams (heights and distances, triangles) ---------- */

export type Vec = [number, number]
export type SegColor = 'opp' | 'adj' | 'hyp' | 'ink' | 'muted' | 'accent'

export interface SceneSeg {
  id?: string
  a: string
  b: string
  /** solid (default), dash (construction / horizontal), sight (line of sight) */
  kind?: 'solid' | 'dash' | 'sight'
  color?: SegColor
  label?: Rich
  /** which side of the segment the label sits on: 1 = left of a→b, -1 = right */
  labelSide?: 1 | -1
}

export interface SceneAngle {
  id?: string
  at: string
  from: string
  to: string
  label: string
  r?: number
}

export interface SceneObject {
  type: 'tower' | 'building' | 'tree' | 'person' | 'kite' | 'ship' | 'lighthouse' | 'pole' | 'dome' | 'bird' | 'plane'
  /** base point (world units) */
  at: Vec
  /** height in world units (or radius for dome) */
  h: number
  w?: number
}

export interface SceneSpec {
  /** world window: [xmin, ymin, xmax, ymax] */
  view: [number, number, number, number]
  ground?: boolean
  water?: boolean
  north?: Vec
  objects?: SceneObject[]
  points: Record<string, Vec>
  /** display names when two points share a letter (e.g. two triangles both with a "B") */
  names?: Record<string, string>
  /** compass direction for each point label; points not listed get 'auto' */
  labelDir?: Record<string, 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw' | 'none'>
  segs?: SceneSeg[]
  angles?: SceneAngle[]
  right?: { at: string; a: string; b: string }[]
  /** ids that are highlighted when no step is active */
  highlight?: string[]
  /** maximum rendered width in px */
  maxWidth?: number
}

/* ---------- Learning blocks ---------- */

export type Block =
  | { t: 'p'; text: Rich }
  | { t: 'math'; tex: string }
  | { t: 'list'; items: Rich[]; ordered?: boolean }
  | { t: 'note'; tone?: 'note' | 'tip' | 'think' | 'history'; title?: string; text: Rich }
  | { t: 'table'; head: Rich[]; rows: Rich[][]; caption?: string; firstColHead?: boolean }
  | { t: 'figure'; scene: SceneSpec; caption?: string }
  | { t: 'widget'; name: WidgetName }

export interface Step {
  text?: Rich
  math?: string
  /** scene ids (segment / angle ids) to highlight while this step is shown */
  highlight?: string[]
}

/* ---------- Questions ---------- */

export interface NumericAnswer {
  value: number
  unit?: string
  /** what the textbook prints, e.g. "16.39 m" or "16√3 m" */
  display: string
  /** absolute tolerance (defaults from lib/answers) */
  tol?: number
}

interface QuestionBase {
  id: string
  /** where it comes from, e.g. "Exercise 6.2 · Q3" or "Practice" */
  source?: string
  prompt: Rich
  figure?: SceneSpec
  hints?: Rich[]
  solution: Step[]
}

export interface McqQuestion extends QuestionBase {
  type: 'mcq'
  options: Rich[]
  correct: number
}

export interface NumericQuestion extends QuestionBase {
  type: 'numeric'
  parts: { label?: Rich; answer: NumericAnswer }[]
  /** other complete answer sets that are also right, e.g. x, y = 4, 2 or 2, 4 */
  alternatives?: NumericAnswer[][]
}

/**
 * One matrix cell of a book answer: a number, or an exact form the answer parser reads,
 * such as '8/3', '-√7' or '4√2-9'.
 */
export type MatrixCell = number | string

export interface MatrixAnswer {
  cells: MatrixCell[][]
}

/** The student fills in a grid of the answer's size. */
export interface MatrixQuestion extends QuestionBase {
  type: 'matrix'
  parts: { label?: Rich; answer: MatrixAnswer }[]
}

export type Question = McqQuestion | NumericQuestion | MatrixQuestion

/* ---------- Lessons ---------- */

export interface LearnCard {
  id: string
  title: string
  blocks: Block[]
  check?: Question
}

export interface Example {
  id: string
  source: string
  title: string
  prompt: Rich
  figure?: SceneSpec
  steps: Step[]
  answer: Rich
}

export interface ExploreItem {
  widget: WidgetName
  title: string
  intro: Rich
  tryThis?: Rich[]
}

export interface Lesson {
  id: string
  number: number
  title: string
  summary: string
  pages: string
  status: 'ready' | 'soon'
  learn: LearnCard[]
  explore: ExploreItem[]
  examples: Example[]
  practice: Question[]
  quiz: Question[]
}

export interface Unit {
  id: string
  number: number
  title: string
  blurb: string
  pages: string
  lessons: Lesson[]
}
