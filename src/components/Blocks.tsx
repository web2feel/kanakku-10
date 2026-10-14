import type { Block, Step } from '../content/types'
import { Rich, Tex } from './Rich'
import { Scene } from './Scene'
import { Widget } from '../widgets'

const NOTE_LABEL = { note: 'Note', tip: 'Tip', think: 'Think about it', history: 'A little history' } as const

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="blocks">
      {blocks.map((b, i) => (
        <BlockView key={i} b={b} />
      ))}
    </div>
  )
}

function BlockView({ b }: { b: Block }) {
  switch (b.t) {
    case 'p':
      return (
        <p className="prose-p">
          <Rich text={b.text} />
        </p>
      )
    case 'math':
      return <Tex tex={b.tex} display />
    case 'list': {
      const L = b.ordered ? 'ol' : 'ul'
      return (
        <L className={b.ordered ? 'prose-ol' : 'prose-ul'}>
          {b.items.map((it, i) => (
            <li key={i}>
              <Rich text={it} />
            </li>
          ))}
        </L>
      )
    }
    case 'note': {
      const tone = b.tone ?? 'note'
      return (
        <aside className={`note note-${tone}`}>
          <div className="note-label">{b.title ?? NOTE_LABEL[tone]}</div>
          <div>
            <Rich text={b.text} />
          </div>
        </aside>
      )
    }
    case 'table':
      return (
        <figure className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                {b.head.map((h, i) => (
                  <th key={i}>
                    <Rich text={h} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((r, i) => (
                <tr key={i}>
                  {r.map((c, j) =>
                    j === 0 && b.firstColHead ? (
                      <th key={j} scope="row">
                        <Rich text={c} />
                      </th>
                    ) : (
                      <td key={j}>
                        <Rich text={c} />
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          {b.caption && <figcaption>{b.caption}</figcaption>}
        </figure>
      )
    case 'figure':
      return (
        <figure className="figure">
          <Scene spec={b.scene} />
          {b.caption && <figcaption>{b.caption}</figcaption>}
        </figure>
      )
    case 'widget':
      return <Widget name={b.name} />
  }
}

export function StepView({ step, index }: { step: Step; index?: number }) {
  return (
    <li className="step">
      {index !== undefined && <span className="step-num">{index + 1}</span>}
      <div className="step-body">
        {step.text && (
          <p>
            <Rich text={step.text} />
          </p>
        )}
        {step.math && <Tex tex={step.math} display />}
      </div>
    </li>
  )
}
