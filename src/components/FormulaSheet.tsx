import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Tex } from './Rich'

const SECTIONS: { title: string; swatch: string; items: string[] }[] = [
  {
    title: 'The six ratios',
    swatch: 'var(--color-peach)',
    items: [
      '\\sin\\theta = \\frac{\\text{opp}}{\\text{hyp}}\\quad \\cos\\theta = \\frac{\\text{adj}}{\\text{hyp}}\\quad \\tan\\theta = \\frac{\\text{opp}}{\\text{adj}}',
      '\\operatorname{cosec}\\theta = \\frac{1}{\\sin\\theta}\\quad \\sec\\theta = \\frac{1}{\\cos\\theta}\\quad \\cot\\theta = \\frac{1}{\\tan\\theta}',
      '\\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta}\\quad \\cot\\theta = \\frac{\\cos\\theta}{\\sin\\theta}',
    ],
  },
  {
    title: 'Complementary angles',
    swatch: 'var(--color-mintwash)',
    items: [
      '\\sin(90^\\circ-\\theta)=\\cos\\theta\\quad \\cos(90^\\circ-\\theta)=\\sin\\theta',
      '\\tan(90^\\circ-\\theta)=\\cot\\theta\\quad \\cot(90^\\circ-\\theta)=\\tan\\theta',
      '\\sec(90^\\circ-\\theta)=\\operatorname{cosec}\\theta\\quad \\operatorname{cosec}(90^\\circ-\\theta)=\\sec\\theta',
    ],
  },
  {
    title: 'Fundamental identities',
    swatch: 'var(--color-lilac)',
    items: [
      '\\sin^2\\theta + \\cos^2\\theta = 1',
      '1 + \\tan^2\\theta = \\sec^2\\theta',
      '1 + \\cot^2\\theta = \\operatorname{cosec}^2\\theta',
    ],
  },
  {
    title: 'Heights and distances',
    swatch: 'var(--color-sky)',
    items: [
      '\\tan\\theta = \\frac{\\text{height}}{\\text{horizontal distance}}',
      '\\sin\\theta = \\frac{\\text{height}}{\\text{line of sight}}\\quad \\cos\\theta = \\frac{\\text{distance}}{\\text{line of sight}}',
      '\\sqrt3 \\approx 1.732 \\qquad \\sqrt2 \\approx 1.414',
    ],
  },
]

const TABLE = [
  ['\\sin', '0', '\\tfrac12', '\\tfrac{1}{\\sqrt2}', '\\tfrac{\\sqrt3}{2}', '1'],
  ['\\cos', '1', '\\tfrac{\\sqrt3}{2}', '\\tfrac{1}{\\sqrt2}', '\\tfrac12', '0'],
  ['\\tan', '0', '\\tfrac{1}{\\sqrt3}', '1', '\\sqrt3', '\\infty'],
]

export function FormulaSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const reduce = useReducedMotion()
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="sheet-backdrop"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.aside
            className="sheet"
            role="dialog"
            aria-modal="true"
            aria-label="Formula sheet"
            initial={reduce ? { opacity: 0 } : { x: '100%' }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: '100%' }}
            transition={{ type: 'tween', duration: 0.22 }}
          >
            <div className="sheet-head">
              <div className="sheet-head-text">
                <span className="hand-note sheet-note">keep it handy</span>
                <h2>Formula sheet</h2>
              </div>
              <button className="btn-outline sheet-close" onClick={onClose} autoFocus>
                Close
              </button>
            </div>
            <div className="sheet-body">
              <section>
                <h3>Standard values</h3>
                <div className="table-scroll">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th />
                        {['0^\\circ', '30^\\circ', '45^\\circ', '60^\\circ', '90^\\circ'].map((a) => (
                          <th key={a}>
                            <Tex tex={a} />
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {TABLE.map((r) => (
                        <tr key={r[0]}>
                          {r.map((c, i) =>
                            i === 0 ? (
                              <th key={i} scope="row">
                                <Tex tex={c} />
                              </th>
                            ) : (
                              <td key={i}>
                                {c === '\\infty' ? <span className="small muted">undef.</span> : <Tex tex={c} />}
                              </td>
                            ),
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
              {SECTIONS.map((s) => (
                <section key={s.title}>
                  <h3>
                    <span className="sheet-swatch" style={{ background: s.swatch }} aria-hidden="true" />
                    {s.title}
                  </h3>
                  {s.items.map((t) => (
                    <div key={t} className="formula-card">
                      <Tex tex={t} display />
                    </div>
                  ))}
                </section>
              ))}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
