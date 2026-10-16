import type { Lesson, SceneSpec } from '../types'

/** Triangle OMP from Fig 6.1: right angle at M, θ at O, P above M. */
const omp = (mp = 3, om = 4, labels = true): SceneSpec => ({
  view: [-0.6, -0.4, om + 0.6, mp + 0.5],
  maxWidth: 360,
  points: { M: [0, 0], O: [om, 0], P: [0, mp] },
  labelDir: { M: 'sw', O: 'se', P: 'n' },
  segs: [
    { id: 'mp', a: 'M', b: 'P', color: 'opp', label: labels ? 'opposite' : undefined, labelSide: 1 },
    { id: 'om', a: 'M', b: 'O', color: 'adj', label: labels ? 'adjacent' : undefined, labelSide: -1 },
    { id: 'op', a: 'O', b: 'P', color: 'hyp', label: labels ? 'hypotenuse' : undefined, labelSide: 1 },
  ],
  right: [{ at: 'M', a: 'O', b: 'P' }],
  angles: [{ id: 'th', at: 'O', from: 'M', to: 'P', label: 'θ' }],
})

const withLengths = (mp: number, om: number, op: number): SceneSpec => {
  const s = omp((mp / Math.max(mp, om)) * 3, (om / Math.max(mp, om)) * 4, false)
  s.segs = s.segs!.map((g) => ({
    ...g,
    label: g.id === 'mp' ? String(mp) : g.id === 'om' ? String(om) : String(op),
  }))
  return s
}

export const lesson1: Lesson = {
  id: 'ratios',
  number: 1,
  title: 'Trigonometric ratios refresher',
  summary: 'The six ratios, complementary angles and the standard-angle table.',
  pages: '239–242',
  status: 'ready',

  learn: [
    {
      id: 'why',
      title: 'Why trigonometry?',
      blocks: [
        {
          t: 'p',
          text: 'Surveyors, sailors and astronomers often need a distance they cannot measure with a tape: the height of a hill, the width of a river, the distance to a ship. Trigonometry solves this with triangles. Measure one length and one angle, and the rest can be calculated.',
        },
        {
          t: 'note',
          tone: 'history',
          text: 'Around 200 BCE, Hipparchus of Rhodes built a table of chord lengths, which is why he is called the father of trigonometry. In the 5th century CE, Indian mathematicians such as Aryabhata worked with **half-chords**, called *jya*. Arabic scholars wrote it as *jiba*, Latin translators turned that into *sinus*, and we still call it **sine** today.',
        },
        {
          t: 'p',
          text: 'This lesson recalls what you learnt in Class 9: the six ratios, how they relate, and their values at special angles. Everything else in this chapter is built on it.',
        },
      ],
    },
    {
      id: 'six',
      title: 'The six ratios',
      blocks: [
        {
          t: 'p',
          text: 'Take a right triangle OMP with the right angle at M and an acute angle $\\theta$ at O. Name each side by where it sits relative to $\\theta$: the {{opp:opposite side}} MP faces the angle, the {{adj:adjacent side}} OM touches it, and the {{hyp:hypotenuse}} OP is the longest side, facing the right angle.',
        },
        { t: 'figure', scene: omp(), caption: 'Triangle OMP (textbook Fig 6.1)' },
        {
          t: 'math',
          tex: '\\sin\\theta = \\frac{\\text{opposite}}{\\text{hypotenuse}} = \\frac{MP}{OP} \\qquad \\cos\\theta = \\frac{\\text{adjacent}}{\\text{hypotenuse}} = \\frac{OM}{OP}',
        },
        { t: 'p', text: 'The other four ratios come from these two:' },
        {
          t: 'table',
          head: ['Ratio', 'In terms of sin and cos', 'In terms of sides'],
          firstColHead: true,
          rows: [
            ['$\\tan\\theta$', '$\\dfrac{\\sin\\theta}{\\cos\\theta}$', '$\\dfrac{MP}{OM}$'],
            ['$\\cot\\theta$', '$\\dfrac{\\cos\\theta}{\\sin\\theta}$', '$\\dfrac{OM}{MP}$'],
            ['$\\operatorname{cosec}\\theta$', '$\\dfrac{1}{\\sin\\theta}$', '$\\dfrac{OP}{MP}$'],
            ['$\\sec\\theta$', '$\\dfrac{1}{\\cos\\theta}$', '$\\dfrac{OP}{OM}$'],
          ],
        },
        {
          t: 'note',
          tone: 'tip',
          text: 'The ratios come in reciprocal pairs: **sin ↔ cosec**, **cos ↔ sec**, **tan ↔ cot**. If you know one of a pair, flip it to get the other.',
        },
      ],
      check: {
        id: 'l1-c-six',
        type: 'mcq',
        prompt: 'In triangle OMP, $MP = 5$, $OM = 12$ and $OP = 13$. What is $\\tan\\theta$?',
        figure: withLengths(5, 12, 13),
        options: ['$\\dfrac{5}{12}$', '$\\dfrac{12}{5}$', '$\\dfrac{5}{13}$', '$\\dfrac{12}{13}$'],
        correct: 0,
        solution: [
          { text: '$\\tan\\theta = \\dfrac{\\text{opposite}}{\\text{adjacent}} = \\dfrac{MP}{OM} = \\dfrac{5}{12}$.' },
        ],
      },
    },
    {
      id: 'size',
      title: 'The size of the triangle does not matter',
      blocks: [
        {
          t: 'p',
          text: 'All right triangles that contain the same angle $\\theta$ are **similar**: one is just a scaled copy of the other. Scaling multiplies every side by the same number, so every ratio of two sides stays the same.',
        },
        {
          t: 'p',
          text: 'So $\\sin 30^\\circ$ is $\\tfrac12$ whether the triangle is drawn on a notebook or measured across a river. That is what makes the ratios useful.',
        },
        {
          t: 'note',
          tone: 'tip',
          text: 'Try it in the **Explore** tab: tick "Keep the angle fixed", drag the triangle bigger and smaller, and watch the ratio column stay the same.',
        },
      ],
      check: {
        id: 'l1-c-size',
        type: 'numeric',
        prompt:
          'A small right triangle has opposite side 3 cm and hypotenuse 5 cm for an angle $\\theta$. A bigger triangle has the same angle $\\theta$ and a hypotenuse of 20 cm. How long is its opposite side?',
        parts: [{ answer: { value: 12, unit: 'cm', display: '12 cm' } }],
        hints: ['$\\sin\\theta$ is the same in both triangles: $\\dfrac{3}{5} = \\dfrac{x}{20}$.'],
        solution: [
          { text: 'Both triangles have the same $\\sin\\theta = \\dfrac{3}{5}$.' },
          { math: '\\frac{x}{20} = \\frac{3}{5} \\;\\Rightarrow\\; x = 20 \\times \\frac35 = 12' },
          { text: 'The opposite side is 12 cm.' },
        ],
      },
    },
    {
      id: 'complementary',
      title: 'Complementary angles',
      blocks: [
        {
          t: 'p',
          text: 'In triangle OMP the two acute angles add up to $90^\\circ$, so the angle at P is $90^\\circ - \\theta$. The side **opposite** $\\theta$ is the side **adjacent** to $90^\\circ - \\theta$, and the other way round. Swapping the roles swaps sin with cos, tan with cot, and sec with cosec:',
        },
        {
          t: 'table',
          head: ['', '', ''],
          rows: [
            [
              '$\\sin(90^\\circ-\\theta)=\\cos\\theta$',
              '$\\cos(90^\\circ-\\theta)=\\sin\\theta$',
              '$\\tan(90^\\circ-\\theta)=\\cot\\theta$',
            ],
            [
              '$\\operatorname{cosec}(90^\\circ-\\theta)=\\sec\\theta$',
              '$\\sec(90^\\circ-\\theta)=\\operatorname{cosec}\\theta$',
              '$\\cot(90^\\circ-\\theta)=\\tan\\theta$',
            ],
          ],
          caption: 'Trigonometric ratios of complementary angles',
        },
        {
          t: 'note',
          tone: 'tip',
          text: 'Whenever two angles in a question add up to $90^\\circ$ (such as $35^\\circ$ and $55^\\circ$), think "complementary". The Explore tab has the textbook\'s semicircle proof as an interactive diagram.',
        },
      ],
      check: {
        id: 'l1-c-comp',
        type: 'numeric',
        prompt: 'Find the value of $\\dfrac{\\sin 50^\\circ}{\\cos 40^\\circ}$.',
        parts: [{ answer: { value: 1, display: '1' } }],
        hints: ['$50^\\circ + 40^\\circ = 90^\\circ$. Write $\\sin 50^\\circ$ as $\\cos(90^\\circ - 50^\\circ)$.'],
        solution: [
          { math: '\\sin 50^\\circ = \\sin(90^\\circ - 40^\\circ) = \\cos 40^\\circ' },
          { math: '\\frac{\\sin 50^\\circ}{\\cos 40^\\circ} = \\frac{\\cos 40^\\circ}{\\cos 40^\\circ} = 1' },
        ],
      },
    },
    {
      id: 'standard',
      title: 'Values at standard angles',
      blocks: [
        {
          t: 'p',
          text: 'These values appear in almost every problem in this chapter. Learn them until you can write the table from memory.',
        },
        {
          t: 'table',
          head: ['$\\theta$', '$0^\\circ$', '$30^\\circ$', '$45^\\circ$', '$60^\\circ$', '$90^\\circ$'],
          firstColHead: true,
          rows: [
            ['$\\sin\\theta$', '0', '$\\tfrac12$', '$\\tfrac{1}{\\sqrt2}$', '$\\tfrac{\\sqrt3}{2}$', '1'],
            ['$\\cos\\theta$', '1', '$\\tfrac{\\sqrt3}{2}$', '$\\tfrac{1}{\\sqrt2}$', '$\\tfrac12$', '0'],
            ['$\\tan\\theta$', '0', '$\\tfrac{1}{\\sqrt3}$', '1', '$\\sqrt3$', 'undefined'],
            ['$\\operatorname{cosec}\\theta$', 'undefined', '2', '$\\sqrt2$', '$\\tfrac{2}{\\sqrt3}$', '1'],
            ['$\\sec\\theta$', '1', '$\\tfrac{2}{\\sqrt3}$', '$\\sqrt2$', '2', 'undefined'],
            ['$\\cot\\theta$', 'undefined', '$\\sqrt3$', '1', '$\\tfrac{1}{\\sqrt3}$', '0'],
          ],
        },
        {
          t: 'p',
          text: 'Some values are **undefined** because they would mean dividing by zero: $\\tan 90^\\circ = \\tfrac{1}{0}$, $\\sec 90^\\circ = \\tfrac{1}{0}$, $\\operatorname{cosec} 0^\\circ = \\tfrac{1}{0}$ and $\\cot 0^\\circ = \\tfrac{1}{0}$.',
        },
        {
          t: 'note',
          text: 'We write $(\\sin\\theta)^2$ as $\\sin^2\\theta$, and the same for the other ratios. So $\\sin^2 30^\\circ = \\left(\\tfrac12\\right)^2 = \\tfrac14$.',
        },
      ],
      check: {
        id: 'l1-c-std',
        type: 'numeric',
        prompt: 'What is $\\tan 60^\\circ$? You can type the exact value or a decimal.',
        parts: [{ answer: { value: Math.sqrt(3), display: '√3 ≈ 1.732' } }],
        hints: ['$\\tan 60^\\circ = \\dfrac{\\sin 60^\\circ}{\\cos 60^\\circ}$.'],
        solution: [{ math: '\\tan 60^\\circ = \\frac{\\sqrt3/2}{1/2} = \\sqrt3 \\approx 1.732' }],
      },
    },
  ],

  explore: [
    {
      widget: 'triangle-explorer',
      title: 'Triangle explorer',
      intro:
        'Drag the coral point P up and down and the blue point O left and right. The six ratios update as the triangle changes.',
      tryThis: [
        'Press 30°, 45° and 60°. Compare the values with the standard-angle table.',
        'Tick "Keep the angle fixed" and drag. The sides change, the ratios do not.',
        'Make $\\theta$ very small, then very close to $90^\\circ$. Which ratios grow very large?',
      ],
    },
    {
      widget: 'complementary-proof',
      title: 'Complementary angles on a semicircle',
      intro:
        "This is the textbook's visual proof (Fig 6.2). Q moves on a semicircle of radius 1. Drag Q and check that $\\sin(90^\\circ-\\theta)$ always equals $\\cos\\theta$.",
      tryThis: ['Set $\\theta$ close to $45^\\circ$. What happens to the rectangle OPQR, and why?'],
    },
    {
      widget: 'standard-table',
      title: 'Standard-angle table trainer',
      intro: 'Study the table, then switch to "Test myself". Every cell is hidden: say the value, tap to check.',
    },
  ],

  examples: [
    {
      id: 'l1-e1',
      source: 'Worked example 1',
      title: 'All six ratios from two sides',
      prompt:
        'In right triangle OMP (right angle at M), $MP = 7$ and $OM = 24$. Find all six trigonometric ratios of $\\theta = \\angle MOP$.',
      figure: withLengths(7, 24, 25),
      steps: [
        {
          text: 'Find the hypotenuse with Pythagoras theorem.',
          math: 'OP = \\sqrt{MP^2 + OM^2} = \\sqrt{49 + 576} = \\sqrt{625} = 25',
          highlight: ['op'],
        },
        { text: 'Opposite = 7, adjacent = 24, hypotenuse = 25.', highlight: ['mp', 'om', 'op', 'th'] },
        {
          math: '\\sin\\theta = \\tfrac{7}{25}, \\quad \\cos\\theta = \\tfrac{24}{25}, \\quad \\tan\\theta = \\tfrac{7}{24}',
        },
        {
          text: 'Flip each one for its reciprocal.',
          math: '\\operatorname{cosec}\\theta = \\tfrac{25}{7}, \\quad \\sec\\theta = \\tfrac{25}{24}, \\quad \\cot\\theta = \\tfrac{24}{7}',
        },
      ],
      answer:
        '$\\sin\\theta = \\tfrac{7}{25}$, $\\cos\\theta = \\tfrac{24}{25}$, $\\tan\\theta = \\tfrac{7}{24}$, $\\operatorname{cosec}\\theta = \\tfrac{25}{7}$, $\\sec\\theta = \\tfrac{25}{24}$, $\\cot\\theta = \\tfrac{24}{7}$',
    },
    {
      id: 'l1-e2',
      source: 'Worked example 2',
      title: 'From one ratio to the others',
      prompt: 'If $\\sin\\theta = \\dfrac{3}{5}$ and $\\theta$ is acute, find $\\cos\\theta$ and $\\tan\\theta$.',
      figure: withLengths(3, 4, 5),
      steps: [
        {
          text: 'Draw a right triangle with opposite side 3 and hypotenuse 5, so that $\\sin\\theta = \\tfrac35$.',
          highlight: ['mp', 'op'],
        },
        { text: 'Find the adjacent side.', math: 'OM = \\sqrt{5^2 - 3^2} = \\sqrt{16} = 4', highlight: ['om'] },
        { math: '\\cos\\theta = \\frac{4}{5}, \\qquad \\tan\\theta = \\frac{3}{4}' },
      ],
      answer: '$\\cos\\theta = \\tfrac45$, $\\tan\\theta = \\tfrac34$',
    },
    {
      id: 'l1-e3',
      source: 'Progress Check 6.2 · Q5',
      title: 'Evaluating with standard values',
      prompt: 'Find the value of $\\cos 60^\\circ \\sin 30^\\circ + \\cos 30^\\circ \\sin 60^\\circ$.',
      steps: [
        {
          text: 'Substitute values from the table.',
          math: '= \\frac12 \\cdot \\frac12 + \\frac{\\sqrt3}{2} \\cdot \\frac{\\sqrt3}{2}',
        },
        { math: '= \\frac14 + \\frac34 = 1' },
      ],
      answer: '1',
    },
    {
      id: 'l1-e4',
      source: 'Progress Check 6.2 · Q6',
      title: 'Mixing tan, cot, sin and cos',
      prompt: 'Find the value of $\\tan 60^\\circ \\cos 60^\\circ + \\cot 60^\\circ \\sin 60^\\circ$.',
      steps: [
        { math: '= \\sqrt3 \\cdot \\frac12 + \\frac{1}{\\sqrt3} \\cdot \\frac{\\sqrt3}{2}' },
        { math: '= \\frac{\\sqrt3}{2} + \\frac12 = \\frac{\\sqrt3 + 1}{2}' },
        { text: 'As a decimal, using $\\sqrt3 \\approx 1.732$:', math: '\\frac{2.732}{2} = 1.366' },
      ],
      answer: '$\\dfrac{\\sqrt3+1}{2} \\approx 1.366$',
    },
    {
      id: 'l1-e5',
      source: 'Worked example 3',
      title: 'Spotting complementary angles',
      prompt: 'Find the value of $\\dfrac{\\sin 35^\\circ}{\\cos 55^\\circ} + \\tan 20^\\circ \\tan 70^\\circ$.',
      steps: [
        {
          text: '$35^\\circ + 55^\\circ = 90^\\circ$, so $\\cos 55^\\circ = \\sin 35^\\circ$.',
          math: '\\frac{\\sin 35^\\circ}{\\cos 55^\\circ} = 1',
        },
        {
          text: '$20^\\circ + 70^\\circ = 90^\\circ$, so $\\tan 70^\\circ = \\cot 20^\\circ$.',
          math: '\\tan 20^\\circ \\tan 70^\\circ = \\tan 20^\\circ \\cot 20^\\circ = 1',
        },
        { math: '1 + 1 = 2' },
      ],
      answer: '2',
    },
    {
      id: 'l1-e6',
      source: 'Thinking Corner · p.242 Q1',
      title: 'When are sin θ and cos θ equal?',
      prompt: 'For which acute angle $\\theta$ is $\\sin\\theta = \\cos\\theta$?',
      figure: omp(3, 3, false),
      steps: [
        {
          text: 'Divide both sides by $\\cos\\theta$.',
          math: '\\frac{\\sin\\theta}{\\cos\\theta} = 1 \\;\\Rightarrow\\; \\tan\\theta = 1',
        },
        {
          text: 'From the table, $\\tan 45^\\circ = 1$. The triangle is isosceles: opposite and adjacent sides are equal.',
          highlight: ['mp', 'om'],
        },
      ],
      answer: '$\\theta = 45^\\circ$',
    },
  ],

  practice: [
    {
      id: 'l1-p1',
      source: 'Progress Check 6.2 · Q1',
      type: 'numeric',
      prompt: 'How many trigonometric ratios are there?',
      parts: [{ answer: { value: 6, display: '6' } }],
      hints: ['sin, cos, tan … and their reciprocals.'],
      solution: [{ text: 'sin, cos, tan, cosec, sec and cot: **6** ratios.' }],
    },
    {
      id: 'l1-p2',
      source: 'Thinking Corner · p.242 Q4',
      type: 'mcq',
      prompt: 'Is it possible to have eight trigonometric ratios?',
      options: [
        'Yes, there are two more ratios for obtuse angles',
        'No. A triangle has 3 sides, and there are only $3 \\times 2 = 6$ ways to divide one side by another',
        'Yes, if the triangle is isosceles',
        'No, because the angles of a triangle add up to $180^\\circ$',
      ],
      correct: 1,
      hints: ['Count the ways to pick an ordered pair of sides: a top side and a different bottom side.'],
      solution: [
        {
          text: 'A ratio is one side divided by another side. With 3 sides, the top can be any of 3 and the bottom any of the other 2.',
        },
        { math: '3 \\times 2 = 6' },
        { text: 'So there are exactly 6 ratios, not 8.' },
      ],
    },
    {
      id: 'l1-p3',
      source: 'Progress Check 6.2 · Q7',
      type: 'numeric',
      prompt:
        'Find the value of $(\\tan 45^\\circ + \\cot 45^\\circ) + (\\sec 45^\\circ \\operatorname{cosec} 45^\\circ)$.',
      parts: [{ answer: { value: 4, display: '4' } }],
      hints: [
        '$\\tan 45^\\circ = \\cot 45^\\circ = 1$ and $\\sec 45^\\circ = \\operatorname{cosec} 45^\\circ = \\sqrt2$.',
      ],
      solution: [{ math: '(1 + 1) + (\\sqrt2 \\times \\sqrt2) = 2 + 2 = 4' }],
    },
    {
      id: 'l1-p4',
      source: 'Progress Check 6.2 · Q8(i)',
      type: 'numeric',
      prompt: '$\\sec\\theta = \\operatorname{cosec}\\theta$ when $\\theta$ is how many degrees?',
      parts: [{ answer: { value: 45, unit: '°', display: '45°' } }],
      hints: ['Write both as reciprocals: $\\dfrac{1}{\\cos\\theta} = \\dfrac{1}{\\sin\\theta}$.'],
      solution: [
        {
          math: '\\frac{1}{\\cos\\theta} = \\frac{1}{\\sin\\theta} \\;\\Rightarrow\\; \\sin\\theta = \\cos\\theta \\;\\Rightarrow\\; \\tan\\theta = 1',
        },
        { text: 'So $\\theta = 45^\\circ$.' },
      ],
    },
    {
      id: 'l1-p5',
      source: 'Progress Check 6.2 · Q8(ii)',
      type: 'numeric',
      prompt: '$\\cot\\theta = \\tan\\theta$ when $\\theta$ is how many degrees?',
      parts: [{ answer: { value: 45, unit: '°', display: '45°' } }],
      hints: ['$\\cot\\theta = \\dfrac{1}{\\tan\\theta}$, so $\\tan^2\\theta = 1$.'],
      solution: [
        {
          math: '\\frac{1}{\\tan\\theta} = \\tan\\theta \\;\\Rightarrow\\; \\tan^2\\theta = 1 \\;\\Rightarrow\\; \\tan\\theta = 1',
        },
        { text: 'For an acute angle, $\\theta = 45^\\circ$.' },
      ],
    },
    {
      id: 'l1-p6',
      source: 'Thinking Corner · p.242 Q2',
      type: 'mcq',
      prompt: 'For what value of $\\theta$ is $\\sin\\theta = 2$?',
      options: ['$30^\\circ$', '$60^\\circ$', '$90^\\circ$', 'There is no such angle'],
      correct: 3,
      hints: [
        '$\\sin\\theta = \\dfrac{\\text{opposite}}{\\text{hypotenuse}}$. Can the opposite side be longer than the hypotenuse?',
      ],
      solution: [
        {
          text: 'The hypotenuse is the longest side of a right triangle, so the opposite side is never longer than it.',
        },
        { text: 'That means $\\sin\\theta$ can never be more than 1. There is no angle with $\\sin\\theta = 2$.' },
      ],
    },
    {
      id: 'l1-p7',
      source: 'Thinking Corner · p.242 Q3',
      type: 'mcq',
      prompt: 'As $\\theta$ increases from $0^\\circ$ to $90^\\circ$, which ratios have undefined values?',
      options: [
        '$\\sin$ and $\\cos$ at $90^\\circ$',
        '$\\tan$ and $\\sec$ at $90^\\circ$; $\\cot$ and $\\operatorname{cosec}$ at $0^\\circ$',
        'Only $\\tan$ at $90^\\circ$',
        'All six at $0^\\circ$',
      ],
      correct: 1,
      hints: [
        'A ratio is undefined when its denominator is 0. Which ratios divide by $\\cos\\theta$? Which divide by $\\sin\\theta$?',
      ],
      solution: [
        {
          text: '$\\cos 90^\\circ = 0$, so $\\tan 90^\\circ = \\dfrac{\\sin 90^\\circ}{\\cos 90^\\circ}$ and $\\sec 90^\\circ = \\dfrac{1}{\\cos 90^\\circ}$ are undefined.',
        },
        { text: '$\\sin 0^\\circ = 0$, so $\\cot 0^\\circ$ and $\\operatorname{cosec} 0^\\circ$ are undefined.' },
      ],
    },
    {
      id: 'l1-p8',
      source: 'Thinking Corner · p.242 Q5(i)',
      type: 'mcq',
      prompt:
        'Let $0^\\circ \\le \\theta \\le 90^\\circ$. For which values of $\\theta$ is $\\sin\\theta > \\cos\\theta$?',
      options: [
        '$0^\\circ \\le \\theta < 45^\\circ$',
        'Only $\\theta = 45^\\circ$',
        '$45^\\circ < \\theta \\le 90^\\circ$',
        'Never',
      ],
      correct: 2,
      hints: [
        'They are equal at $45^\\circ$. Above $45^\\circ$, which side of the triangle is longer, the opposite or the adjacent?',
      ],
      solution: [
        {
          text: 'At $45^\\circ$ they are equal. As $\\theta$ grows, the opposite side grows and the adjacent side shrinks.',
        },
        {
          text: 'So $\\sin\\theta > \\cos\\theta$ for $45^\\circ < \\theta \\le 90^\\circ$. (Part (ii), $\\cos\\theta > \\sin\\theta$, is the other range: $0^\\circ \\le \\theta < 45^\\circ$.)',
        },
      ],
    },
    {
      id: 'l1-p9',
      source: 'Thinking Corner · p.242 Q5(iii)',
      type: 'numeric',
      prompt:
        'Let $0^\\circ \\le \\theta \\le 90^\\circ$. For what value of $\\theta$ is $\\sec\\theta = 2\\tan\\theta$?',
      parts: [{ answer: { value: 30, unit: '°', display: '30°' } }],
      hints: ['Write both sides using sin and cos, then multiply by $\\cos\\theta$.'],
      solution: [
        {
          math: '\\frac{1}{\\cos\\theta} = \\frac{2\\sin\\theta}{\\cos\\theta} \\;\\Rightarrow\\; 1 = 2\\sin\\theta \\;\\Rightarrow\\; \\sin\\theta = \\frac12',
        },
        { text: 'So $\\theta = 30^\\circ$.' },
      ],
    },
    {
      id: 'l1-p10',
      source: 'Thinking Corner · p.242 Q5(iv)',
      type: 'numeric',
      prompt:
        'Let $0^\\circ \\le \\theta \\le 90^\\circ$. For what value of $\\theta$ is $\\operatorname{cosec}\\theta = 2\\cot\\theta$?',
      parts: [{ answer: { value: 60, unit: '°', display: '60°' } }],
      hints: ['Write both sides using sin and cos, then multiply by $\\sin\\theta$.'],
      solution: [
        {
          math: '\\frac{1}{\\sin\\theta} = \\frac{2\\cos\\theta}{\\sin\\theta} \\;\\Rightarrow\\; 1 = 2\\cos\\theta \\;\\Rightarrow\\; \\cos\\theta = \\frac12',
        },
        { text: 'So $\\theta = 60^\\circ$.' },
      ],
    },
    {
      id: 'l1-p11',
      source: 'Practice',
      type: 'numeric',
      prompt: 'In a right triangle, $\\cos\\theta = \\dfrac{12}{13}$. Find $\\tan\\theta$.',
      parts: [{ answer: { value: 5 / 12, display: '5/12' } }],
      hints: ['Adjacent = 12, hypotenuse = 13. Find the opposite side with Pythagoras theorem.'],
      solution: [
        { math: '\\text{opposite} = \\sqrt{13^2 - 12^2} = \\sqrt{25} = 5' },
        { math: '\\tan\\theta = \\frac{5}{12}' },
      ],
    },
    {
      id: 'l1-p12',
      source: 'Practice',
      type: 'numeric',
      prompt: 'Find the value of $\\dfrac{\\cos 62^\\circ}{\\sin 28^\\circ} + \\sin^2 30^\\circ$.',
      parts: [{ answer: { value: 1.25, display: '5/4' } }],
      hints: ['$62^\\circ + 28^\\circ = 90^\\circ$.', '$\\sin^2 30^\\circ = \\left(\\tfrac12\\right)^2$.'],
      solution: [
        { math: '\\cos 62^\\circ = \\sin 28^\\circ \\;\\Rightarrow\\; \\frac{\\cos 62^\\circ}{\\sin 28^\\circ} = 1' },
        { math: '1 + \\left(\\tfrac12\\right)^2 = 1 + \\tfrac14 = \\tfrac54' },
      ],
    },
  ],

  quiz: [
    {
      id: 'l1-q1',
      type: 'mcq',
      prompt: '$\\sin 30^\\circ$ is equal to',
      options: ['$\\tfrac{\\sqrt3}{2}$', '$\\tfrac12$', '$\\tfrac{1}{\\sqrt2}$', '1'],
      correct: 1,
      solution: [{ text: 'From the table, $\\sin 30^\\circ = \\tfrac12$.' }],
    },
    {
      id: 'l1-q2',
      type: 'mcq',
      prompt: '$\\tan(90^\\circ - \\theta)$ is equal to',
      options: ['$\\tan\\theta$', '$\\sec\\theta$', '$\\cot\\theta$', '$\\cos\\theta$'],
      correct: 2,
      solution: [{ text: 'Complementary angles swap tan and cot: $\\tan(90^\\circ-\\theta) = \\cot\\theta$.' }],
    },
    {
      id: 'l1-q3',
      type: 'numeric',
      prompt: 'Find the value of $\\cos 60^\\circ + \\sin 30^\\circ$.',
      parts: [{ answer: { value: 1, display: '1' } }],
      solution: [{ math: '\\tfrac12 + \\tfrac12 = 1' }],
    },
    {
      id: 'l1-q4',
      type: 'mcq',
      prompt: 'Which of these is undefined?',
      options: ['$\\sin 0^\\circ$', '$\\cos 90^\\circ$', '$\\operatorname{cosec} 0^\\circ$', '$\\cot 90^\\circ$'],
      correct: 2,
      solution: [
        {
          text: '$\\operatorname{cosec} 0^\\circ = \\dfrac{1}{\\sin 0^\\circ} = \\dfrac{1}{0}$, which is undefined. The others are 0.',
        },
      ],
    },
    {
      id: 'l1-q5',
      type: 'numeric',
      prompt:
        'In a right triangle, the side opposite $\\theta$ is 8 and the side adjacent to $\\theta$ is 6. Find $\\sin\\theta$.',
      parts: [{ answer: { value: 0.8, display: '4/5 = 0.8' } }],
      solution: [
        { math: '\\text{hypotenuse} = \\sqrt{8^2 + 6^2} = 10' },
        { math: '\\sin\\theta = \\frac{8}{10} = \\frac45' },
      ],
    },
    {
      id: 'l1-q6',
      type: 'numeric',
      prompt: 'Find $\\sec 60^\\circ$.',
      parts: [{ answer: { value: 2, display: '2' } }],
      solution: [{ math: '\\sec 60^\\circ = \\frac{1}{\\cos 60^\\circ} = \\frac{1}{1/2} = 2' }],
    },
    {
      id: 'l1-q7',
      type: 'numeric',
      prompt: 'Find the value of $\\sin^2 30^\\circ + \\cos^2 30^\\circ$.',
      parts: [{ answer: { value: 1, display: '1' } }],
      solution: [
        { math: '\\left(\\tfrac12\\right)^2 + \\left(\\tfrac{\\sqrt3}{2}\\right)^2 = \\tfrac14 + \\tfrac34 = 1' },
        { text: 'This is true for every angle. You will meet it in the next lesson as an identity.' },
      ],
    },
    {
      id: 'l1-q8',
      type: 'mcq',
      prompt: 'If $\\tan\\theta = 1$ for an acute angle $\\theta$, then $\\theta$ is',
      options: ['$30^\\circ$', '$45^\\circ$', '$60^\\circ$', '$90^\\circ$'],
      correct: 1,
      solution: [{ text: '$\\tan 45^\\circ = 1$.' }],
    },
  ],
}
