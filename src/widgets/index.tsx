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
import { SimilarityLab } from './SimilarityLab'
import { ProportionLab } from './ProportionLab'
import { PythagorasLab } from './PythagorasLab'
import { TangentLab } from './TangentLab'
import { CevaLab } from './CevaLab'
import { ConstructionLab } from './ConstructionLab'
import { IdentityCircle } from './IdentityCircle'
import { IdentityTester } from './IdentityTester'
import { DepressionLab, LookoutLab } from './LookoutLab'

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
  'similarity-lab': SimilarityLab,
  'proportion-lab': ProportionLab,
  'pythagoras-lab': PythagorasLab,
  'tangent-lab': TangentLab,
  'ceva-lab': CevaLab,
  'construction-lab': () => <ConstructionLab />,
  'construction-similar': () => <ConstructionLab only={['similar', 'root']} />,
  'construction-triangle': () => <ConstructionLab only={['median', 'altitude', 'bisector']} />,
  'construction-tangent': () => <ConstructionLab only={['tangent-centre', 'tangent-alt', 'tangent-pair']} />,
  'identity-circle': IdentityCircle,
  'identity-tester': IdentityTester,
  'depression-lab': DepressionLab,
  'lookout-lab': LookoutLab,
}

export function Widget({ name }: { name: WidgetName }) {
  const C = REGISTRY[name]
  return <C />
}
