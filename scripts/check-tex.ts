/**
 * Renders every formula in the lesson content with KaTeX and reports any that fail.
 * Run with `npm run check:tex`.
 */
import katex from 'katex'
import { UNITS } from '../src/content'
import { build, type ConstructionRef } from '../src/lib/constructions'
import { MACROS } from '../src/lib/katexMacros'

let failures = 0
let count = 0

function render(tex: string, where: string) {
  count++
  try {
    katex.renderToString(tex, { throwOnError: true, strict: 'ignore', trust: true, macros: { ...MACROS } })
  } catch (e) {
    failures++
    console.error(`  ✗ ${where}: ${(e as Error).message.split('\n')[0]}\n      ${tex.slice(0, 140)}`)
  }
}

/** Walks any content value; strings are scanned for $…$, fields named tex/math are formulas. */
function walk(v: unknown, where: string, key = '') {
  if (typeof v === 'string') {
    if (['tex', 'math', 'start', 'toProve', 'wrong'].includes(key) && !v.includes('$')) render(v, where)
    else for (const m of v.matchAll(/\$([^$]+)\$/g)) render(m[1], where)
  } else if (Array.isArray(v)) v.forEach((x, i) => walk(x, `${where}[${i}]`, key))
  else if (v && typeof v === 'object') {
    for (const [k, x] of Object.entries(v)) {
      if (k === 'figure' || k === 'scene') continue
      if (k === 'construction' && x && typeof x === 'object' && 'kind' in x) {
        const c = build(x as ConstructionRef)
        walk(
          c.steps.map((s) => s.text),
          `${where}.construction`,
        )
        if (c.error) walk(c.error, `${where}.construction.error`)
        continue
      }
      walk(x, `${where}.${k}`, k)
    }
  }
}

for (const unit of UNITS) for (const lesson of unit.lessons) walk(lesson, `${unit.id}/${lesson.id}`)

console.log(`Rendered ${count} formulas.`)
if (failures) {
  console.error(`${failures} formula(s) failed.`)
  process.exit(1)
}
console.log('All good.')
