import katex from 'katex'
import { Fragment, useMemo } from 'react'

export function Tex({ tex, display = false, className = '' }: { tex: string; display?: boolean; className?: string }) {
  const html = useMemo(
    () => katex.renderToString(tex, {
        displayMode: display,
        throwOnError: false,
        strict: false,
        trust: (ctx) => ctx.command === '\\htmlClass',
      }),
    [tex, display],
  )
  if (display) {
    return <div className={`tex-display ${className}`} dangerouslySetInnerHTML={{ __html: html }} />
  }
  return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />
}

const TOKEN = /(\$[^$]+\$|\*\*[^*]+\*\*|\*[^*\s][^*]*\*|\{\{(?:opp|adj|hyp|key):[^}]+\}\})/g

/** Renders the small markup used in content files: $math$, **bold**, *italic*, {{opp:text}}. */
export function Rich({ text }: { text: string }) {
  const parts = text.split(TOKEN)
  return (
    <>
      {parts.map((p, i) => {
        if (!p) return null
        if (p.startsWith('$') && p.endsWith('$') && p.length > 1) return <Tex key={i} tex={p.slice(1, -1)} />
        if (p.startsWith('**') && p.endsWith('**') && p.length > 4) return <strong key={i}>{p.slice(2, -2)}</strong>
        if (p.startsWith('*') && p.endsWith('*') && p.length > 2) return <em key={i}>{p.slice(1, -1)}</em>
        const m = p.match(/^\{\{(opp|adj|hyp|key):(.+)\}\}$/)
        if (m) {
          return (
            <span key={i} className={`tag tag-${m[1]}`}>
              <Rich text={m[2]} />
            </span>
          )
        }
        return <Fragment key={i}>{p}</Fragment>
      })}
    </>
  )
}
