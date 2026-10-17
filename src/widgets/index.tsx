import type { WidgetName } from '../content/types'
import { TriangleExplorer } from './TriangleExplorer'
import { ComplementaryProof } from './ComplementaryProof'
import { StandardTable } from './StandardTable'
import { ElevationSimulator } from './ElevationSimulator'
import { RatioPicker } from './RatioPicker'
import { MatrixTypes } from './MatrixTypes'
import { AijBuilder } from './AijBuilder'
import { OrderFinder } from './OrderFinder'
import { MatrixArith } from './MatrixArith'
import { MatrixMultiply } from './MatrixMultiply'

const REGISTRY: Record<WidgetName, () => React.JSX.Element> = {
  'triangle-explorer': TriangleExplorer,
  'complementary-proof': ComplementaryProof,
  'standard-table': StandardTable,
  'elevation-simulator': ElevationSimulator,
  'ratio-picker': RatioPicker,
  'matrix-types': MatrixTypes,
  'aij-builder': AijBuilder,
  'order-finder': OrderFinder,
  'matrix-arith': MatrixArith,
  'matrix-multiply': MatrixMultiply,
}

export function Widget({ name }: { name: WidgetName }) {
  const C = REGISTRY[name]
  return <C />
}
