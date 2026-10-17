/**
 * Evaluates the small part of TeX used in trigonometry proofs, so the content check can test
 * every step of an identity at random angles. It is not used in the app itself.
 *
 * Understands: numbers, single-letter variables (and \theta, \alpha, \beta with _1 / _2 subscripts),
 * + − × ÷ (\cdot, \times), implicit multiplication, ^ powers (including \sin^2\theta), \frac, \dfrac,
 * \tfrac, \sqrt, ( ), \left( \right), N^\circ, and \sin \cos \tan \cot \sec \csc \cosec.
 * Angles in variables are in radians; N^\circ is converted.
 */

export type Env = Record<string, number>
type Fn = (env: Env) => number

type Tok = { k: 'num'; v: number } | { k: 'var'; v: string } | { k: 'cmd'; v: string } | { k: 'sym'; v: string }

const SKIP = new Set(['\\left', '\\right', '\\,', '\\;', '\\!', '\\ ', '\\:', '\\displaystyle', '\\big', '\\Big'])
const GREEK = new Set(['\\theta', '\\alpha', '\\beta', '\\phi', '\\pi'])
const TRIG: Record<string, (x: number) => number> = {
  '\\sin': Math.sin,
  '\\cos': Math.cos,
  '\\tan': Math.tan,
  '\\cot': (x) => 1 / Math.tan(x),
  '\\sec': (x) => 1 / Math.cos(x),
  '\\csc': (x) => 1 / Math.sin(x),
  '\\cosec': (x) => 1 / Math.sin(x),
}

function tokenize(src: string): Tok[] {
  const s = src.replace(/\\operatorname\{cosec\}/g, '\\cosec')
  const out: Tok[] = []
  let i = 0
  while (i < s.length) {
    const c = s[i]
    if (/\s/.test(c)) {
      i++
    } else if (/[0-9.]/.test(c)) {
      let j = i
      while (j < s.length && /[0-9.]/.test(s[j])) j++
      out.push({ k: 'num', v: Number(s.slice(i, j)) })
      i = j
    } else if (c === '\\') {
      let j = i + 1
      if (/[a-zA-Z]/.test(s[j])) while (j < s.length && /[a-zA-Z]/.test(s[j])) j++
      else j++
      const cmd = s.slice(i, j)
      i = j
      if (SKIP.has(cmd)) continue
      if (cmd === '\\cdot' || cmd === '\\times') out.push({ k: 'sym', v: '*' })
      else if (cmd === '\\div') out.push({ k: 'sym', v: '/' })
      else if (cmd === '\\{' || cmd === '\\}') out.push({ k: 'sym', v: cmd === '\\{' ? '(' : ')' })
      else if (GREEK.has(cmd)) out.push({ k: 'var', v: cmd.slice(1) })
      else out.push({ k: 'cmd', v: cmd })
    } else if (/[a-zA-Z]/.test(c)) {
      out.push({ k: 'var', v: c })
      i++
    } else {
      out.push({ k: 'sym', v: c === '[' ? '(' : c === ']' ? ')' : c })
      i++
    }
  }
  // fold subscripts into variable names: \theta_1 → theta_1
  const folded: Tok[] = []
  for (let k = 0; k < out.length; k++) {
    const t = out[k]
    if (t.k === 'sym' && t.v === '_' && folded.length && folded[folded.length - 1].k === 'var') {
      const prev = folded[folded.length - 1] as { k: 'var'; v: string }
      let sub = ''
      if (out[k + 1]?.k === 'sym' && (out[k + 1] as { v: string }).v === '{') {
        let m = k + 2
        while (m < out.length && !(out[m].k === 'sym' && (out[m] as { v: string }).v === '}')) {
          sub += String((out[m] as { v: string | number }).v)
          m++
        }
        k = m
      } else {
        sub = String((out[k + 1] as { v: string | number }).v)
        k++
      }
      prev.v += '_' + sub
      continue
    }
    folded.push(t)
  }
  return folded
}

class Parser {
  private i = 0
  readonly vars = new Set<string>()
  private toks: Tok[]
  constructor(toks: Tok[]) {
    this.toks = toks
  }

  private peek() {
    return this.toks[this.i]
  }
  private isSym(v: string) {
    const t = this.peek()
    return t?.k === 'sym' && t.v === v
  }
  private eat(v: string) {
    if (!this.isSym(v)) throw new Error(`expected "${v}" at token ${this.i}`)
    this.i++
  }

  parseAll(): Fn {
    const f = this.expr()
    if (this.i < this.toks.length) throw new Error(`unexpected token at ${this.i}: ${JSON.stringify(this.peek())}`)
    return f
  }

  private expr(): Fn {
    let f = this.term()
    while (this.isSym('+') || this.isSym('-')) {
      const op = (this.peek() as { v: string }).v
      this.i++
      const g = this.term()
      const a = f
      f = op === '+' ? (e) => a(e) + g(e) : (e) => a(e) - g(e)
    }
    return f
  }

  private startsAtom() {
    const t = this.peek()
    if (!t) return false
    if (t.k === 'num' || t.k === 'var') return true
    if (t.k === 'cmd') return t.v in TRIG || ['\\frac', '\\dfrac', '\\tfrac', '\\sqrt'].includes(t.v)
    return t.v === '(' || t.v === '{'
  }

  private term(): Fn {
    let f: Fn
    if (this.isSym('-')) {
      this.i++
      const g = this.factor()
      f = (e) => -g(e)
    } else if (this.isSym('+')) {
      this.i++
      f = this.factor()
    } else f = this.factor()
    for (;;) {
      if (this.isSym('*') || this.isSym('/')) {
        const op = (this.peek() as { v: string }).v
        this.i++
        const g = this.factor()
        const a = f
        f = op === '*' ? (e) => a(e) * g(e) : (e) => a(e) / g(e)
      } else if (this.startsAtom()) {
        const g = this.factor()
        const a = f
        f = (e) => a(e) * g(e)
      } else return f
    }
  }

  /** after ^: a braced expression, a single digit, or \circ */
  private power(): Fn | 'deg' {
    const t = this.peek()
    if (t?.k === 'cmd' && t.v === '\\circ') {
      this.i++
      return 'deg'
    }
    if (this.isSym('{')) {
      this.i++
      if (this.peek()?.k === 'cmd' && (this.peek() as { v: string }).v === '\\circ') {
        this.i++
        this.eat('}')
        return 'deg'
      }
      const f = this.expr()
      this.eat('}')
      return f
    }
    if (t?.k === 'num') {
      // a bare exponent is a single digit: x^23 means x^2 · 3
      const s = String(t.v)
      this.i++
      if (s.length > 1) {
        this.toks.splice(this.i, 0, { k: 'num', v: Number(s.slice(1)) })
        const d = Number(s[0])
        return () => d
      }
      return () => t.v
    }
    if (t?.k === 'var') {
      this.i++
      const v = t.v
      this.vars.add(v)
      return (e) => e[v]
    }
    throw new Error(`bad exponent at ${this.i}`)
  }

  private factor(): Fn {
    let f = this.atom()
    while (this.isSym('^')) {
      this.i++
      const p = this.power()
      const a = f
      f = p === 'deg' ? (e) => (a(e) * Math.PI) / 180 : (e) => Math.pow(a(e), p(e))
    }
    return f
  }

  /** \\frac's argument: {…}, or a single digit or letter as in \\frac23 */
  private fracArg(): Fn {
    if (this.isSym('{')) return this.group()
    const t = this.peek()
    if (t?.k === 'num') {
      const s = String(t.v)
      this.i++
      if (s.length > 1) this.toks.splice(this.i, 0, { k: 'num', v: Number(s.slice(1)) })
      const d = Number(s[0])
      return () => d
    }
    return this.atom()
  }

  private group(): Fn {
    this.eat('{')
    const f = this.expr()
    this.eat('}')
    return f
  }

  private atom(): Fn {
    const t = this.peek()
    if (!t) throw new Error('unexpected end')
    if (t.k === 'num') {
      this.i++
      return () => t.v
    }
    if (t.k === 'var') {
      this.i++
      if (t.v === 'pi') return () => Math.PI
      this.vars.add(t.v)
      return (e) => {
        if (!(t.v in e)) throw new Error(`no value for ${t.v}`)
        return e[t.v]
      }
    }
    if (t.k === 'sym' && (t.v === '(' || t.v === '{')) {
      this.i++
      const f = this.expr()
      this.eat(t.v === '(' ? ')' : '}')
      return f
    }
    if (t.k === 'cmd') {
      this.i++
      if (t.v === '\\frac' || t.v === '\\dfrac' || t.v === '\\tfrac') {
        const a = this.fracArg()
        const b = this.fracArg()
        return (e) => a(e) / b(e)
      }
      if (t.v === '\\sqrt') {
        const a = this.fracArg()
        return (e) => Math.sqrt(a(e))
      }
      const fn = TRIG[t.v]
      if (fn) {
        let pow: Fn | null = null
        if (this.isSym('^')) {
          this.i++
          const p = this.power()
          if (p === 'deg') throw new Error('degree sign on a function name')
          pow = p
        }
        // the argument: one atom, with an optional degree sign
        let arg = this.atom()
        if (
          this.isSym('^') &&
          this.toks[this.i + 1]?.k === 'cmd' &&
          (this.toks[this.i + 1] as { v: string }).v === '\\circ'
        ) {
          this.i += 2
          const a = arg
          arg = (e) => (a(e) * Math.PI) / 180
        }
        const a = arg
        return pow ? (e) => Math.pow(fn(a(e)), pow!(e)) : (e) => fn(a(e))
      }
      throw new Error(`unknown command ${t.v}`)
    }
    throw new Error(`unexpected ${JSON.stringify(t)} at ${this.i}`)
  }
}

/** Compiles one TeX expression (no "=") into a function of its variables. */
export function compile(tex: string): { f: Fn; vars: string[] } {
  const p = new Parser(tokenize(tex))
  const f = p.parseAll()
  return { f, vars: [...p.vars] }
}

/** Splits "A = B" at its top-level "=" signs. */
export function sides(tex: string): string[] {
  return tex.split('=').map((s) => s.trim())
}

/** A few random environments, with every variable between 0.15 and 1.4 (radians, inside 0°–90°). */
export function samples(vars: string[], n = 6, seed = 7): Env[] {
  let x = seed
  const rnd = () => {
    x = (x * 16807) % 2147483647
    return x / 2147483647
  }
  return Array.from({ length: n }, () => Object.fromEntries(vars.map((v) => [v, 0.15 + rnd() * 1.25])))
}

/** Do two expressions agree at every sample point? */
export function agree(a: string, b: string): boolean {
  const A = compile(a)
  const B = compile(b)
  const vars = [...new Set([...A.vars, ...B.vars])]
  return samples(vars).every((e) => {
    const x = A.f(e)
    const y = B.f(e)
    return Math.abs(x - y) <= 1e-7 * Math.max(1, Math.abs(x), Math.abs(y))
  })
}
