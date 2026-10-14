import type { WidgetName } from '../content/types'
import { TriangleExplorer } from './TriangleExplorer'
import { ComplementaryProof } from './ComplementaryProof'
import { StandardTable } from './StandardTable'
import { ElevationSimulator } from './ElevationSimulator'
import { RatioPicker } from './RatioPicker'

const REGISTRY: Record<WidgetName, () => React.JSX.Element> = {
  'triangle-explorer': TriangleExplorer,
  'complementary-proof': ComplementaryProof,
  'standard-table': StandardTable,
  'elevation-simulator': ElevationSimulator,
  'ratio-picker': RatioPicker,
}

export function Widget({ name }: { name: WidgetName }) {
  const C = REGISTRY[name]
  return <C />
}
