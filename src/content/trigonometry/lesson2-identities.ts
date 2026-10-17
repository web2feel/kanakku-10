import type { Lesson, SceneSpec } from '../types'

/** Triangle OMP of Fig 6.3: right angle at M, θ at O, P above M. */
const omp = (hl: string[] = []): SceneSpec => ({
  view: [-0.7, -0.6, 4.7, 3.5],
  maxWidth: 340,
  points: { M: [0, 0], O: [4, 0], P: [0, 3] },
  labelDir: { M: 'sw', O: 'se', P: 'n' },
  segs: [
    { id: 'mp', a: 'M', b: 'P', color: 'opp', label: 'MP', labelSide: 1 },
    { id: 'om', a: 'M', b: 'O', color: 'adj', label: 'OM', labelSide: -1 },
    { id: 'op', a: 'O', b: 'P', color: 'hyp', label: 'OP', labelSide: 1 },
  ],
  right: [{ at: 'M', a: 'O', b: 'P' }],
  angles: [{ id: 'th', at: 'O', from: 'M', to: 'P', label: 'θ' }],
  highlight: hl,
})

export const lesson2: Lesson = {
  id: 'identities',
  number: 2,
  title: 'The three fundamental identities',
  summary: 'Where sin²θ + cos²θ = 1 comes from, its two partners, and using them to find one ratio from another.',
  pages: '242–244',
  status: 'ready',

  learn: [
    {
      id: 'what',
      title: 'Equation or identity?',
      blocks: [
        {
          t: 'p',
          text: 'The equation $2x + 3 = 7$ is true only when $x = 2$. But $(a + b)^2 = a^2 + 2ab + b^2$ is true for **every** value of $a$ and $b$. A statement that is true for every value of its letters is called an **identity**.',
        },
        {
          t: 'p',
          text: 'A **trigonometric identity** is an equation in trigonometric ratios that is true for every angle (wherever both sides are defined). You already know one: $\\tan\\theta = \\dfrac{\\sin\\theta}{\\cos\\theta}$.',
        },
        {
          t: 'table',
          head: ['Statement', 'True for', 'So it is'],
          rows: [
            ['$\\sin\\theta = \\cos\\theta$', 'only $\\theta = 45^\\circ$', 'an equation'],
            ['$\\tan\\theta = 1$', 'only $\\theta = 45^\\circ$', 'an equation'],
            ['$\\tan\\theta = \\dfrac{\\sin\\theta}{\\cos\\theta}$', 'every angle', 'an identity'],
            ['$\\cosec\\theta = \\dfrac{1}{\\sin\\theta}$', 'every angle', 'an identity'],
          ],
        },
      ],
      check: {
        id: 'l2-c-what',
        type: 'mcq',
        prompt: 'Which of these is an identity, true for every angle $\\theta$?',
        options: [
          '$\\sin\\theta + \\cos\\theta = 1$',
          '$\\sin\\theta = \\cos\\theta$',
          '$\\sin^2\\theta + \\cos^2\\theta = 1$',
          '$\\tan\\theta = 1$',
        ],
        correct: 2,
        solution: [
          {
            text: 'Try $\\theta = 30^\\circ$: $\\sin 30^\\circ + \\cos 30^\\circ = \\tfrac12 + \\tfrac{\\sqrt3}{2} \\neq 1$, so the first one fails. The second and fourth hold only at $45^\\circ$. Only $\\sin^2\\theta + \\cos^2\\theta = 1$ holds at every angle, as the next card shows.',
          },
        ],
      },
    },
    {
      id: 'first',
      title: 'The first identity: sin²θ + cos²θ = 1',
      blocks: [
        {
          t: 'note',
          tone: 'tip',
          title: 'Notation',
          text: '$\\sin^2\\theta$ means $(\\sin\\theta)^2$, the square of the sine. It does **not** mean $\\sin(\\theta^2)$. The same goes for $\\cos^2\\theta$, $\\tan^2\\theta$ and the rest.',
        },
        { t: 'figure', scene: omp(['mp', 'om', 'op']), caption: 'Right triangle OMP (textbook Fig 6.3)' },
        {
          t: 'p',
          text: 'In the right triangle OMP, $\\dfrac{OM}{OP} = \\cos\\theta$ and $\\dfrac{PM}{OP} = \\sin\\theta$. By Pythagoras theorem,',
        },
        { t: 'math', tex: 'MP^2 + OM^2 = OP^2' },
        { t: 'p', text: 'Divide every term by $OP^2$ (allowed, since $OP \\neq 0$):' },
        {
          t: 'math',
          tex: '\\left(\\frac{MP}{OP}\\right)^2 + \\left(\\frac{OM}{OP}\\right)^2 = \\left(\\frac{OP}{OP}\\right)^2 \\;\\Rightarrow\\; (\\sin\\theta)^2 + (\\cos\\theta)^2 = 1^2',
        },
        { t: 'math', tex: '\\boxed{\\sin^2\\theta + \\cos^2\\theta = 1}' },
        {
          t: 'p',
          text: 'Nothing here depended on the size of the triangle or of $\\theta$: it is Pythagoras theorem, divided through by the hypotenuse squared.',
        },
      ],
      check: {
        id: 'l2-c-first',
        type: 'numeric',
        prompt: 'For an angle $\\theta$, $\\sin\\theta = 0.6$. What is $\\cos^2\\theta$?',
        parts: [{ answer: { value: 0.64, display: '0.64' } }],
        hints: ['$\\cos^2\\theta = 1 - \\sin^2\\theta$.'],
        solution: [{ math: '\\cos^2\\theta = 1 - \\sin^2\\theta = 1 - 0.36 = 0.64' }],
      },
    },
    {
      id: 'second',
      title: 'The second identity: 1 + tan²θ = sec²θ',
      blocks: [
        {
          t: 'p',
          text: 'Start again from $MP^2 + OM^2 = OP^2$, but this time divide by $OM^2$, the {{adj:adjacent}} side squared ($OM \\neq 0$):',
        },
        {
          t: 'math',
          tex: '\\left(\\frac{MP}{OM}\\right)^2 + \\left(\\frac{OM}{OM}\\right)^2 = \\left(\\frac{OP}{OM}\\right)^2',
        },
        {
          t: 'p',
          text: 'Now $\\dfrac{MP}{OM} = \\tan\\theta$ and $\\dfrac{OP}{OM} = \\sec\\theta$, so $(\\tan\\theta)^2 + 1^2 = (\\sec\\theta)^2$:',
        },
        { t: 'math', tex: '\\boxed{1 + \\tan^2\\theta = \\sec^2\\theta}' },
      ],
      check: {
        id: 'l2-c-second',
        type: 'numeric',
        prompt: 'If $\\tan\\theta = \\dfrac34$ and $\\theta$ is acute, find $\\sec\\theta$.',
        parts: [{ answer: { value: 1.25, display: '5/4' } }],
        hints: ['$\\sec^2\\theta = 1 + \\tan^2\\theta$. Then take the positive square root.'],
        solution: [
          { math: '\\sec^2\\theta = 1 + \\frac{9}{16} = \\frac{25}{16} \\;\\Rightarrow\\; \\sec\\theta = \\frac54' },
          { text: 'For an acute angle every ratio is positive, so take the positive root.' },
        ],
      },
    },
    {
      id: 'third',
      title: 'The third identity: 1 + cot²θ = cosec²θ',
      blocks: [
        { t: 'p', text: 'Divide $MP^2 + OM^2 = OP^2$ by $MP^2$, the {{opp:opposite}} side squared ($MP \\neq 0$):' },
        {
          t: 'math',
          tex: '\\left(\\frac{MP}{MP}\\right)^2 + \\left(\\frac{OM}{MP}\\right)^2 = \\left(\\frac{OP}{MP}\\right)^2 \\;\\Rightarrow\\; 1^2 + (\\cot\\theta)^2 = (\\cosec\\theta)^2',
        },
        { t: 'math', tex: '\\boxed{1 + \\cot^2\\theta = \\cosec^2\\theta}' },
        {
          t: 'note',
          tone: 'think',
          text: 'One picture, one theorem, three identities. Each comes from dividing Pythagoras by a different side squared: the hypotenuse, the adjacent side, or the opposite side.',
        },
      ],
      check: {
        id: 'l2-c-third',
        type: 'numeric',
        prompt: 'If $\\cot\\theta = \\dfrac{12}{5}$ and $\\theta$ is acute, find $\\cosec\\theta$.',
        parts: [{ answer: { value: 13 / 5, display: '13/5' } }],
        solution: [
          {
            math: '\\cosec^2\\theta = 1 + \\frac{144}{25} = \\frac{169}{25} \\;\\Rightarrow\\; \\cosec\\theta = \\frac{13}{5}',
          },
        ],
      },
    },
    {
      id: 'forms',
      title: 'The same identities, rearranged',
      blocks: [
        { t: 'p', text: 'You will use these identities in every form. Learn to recognise each one at a glance:' },
        {
          t: 'table',
          head: ['Identity', 'Equal forms'],
          firstColHead: true,
          rows: [
            [
              '$\\sin^2\\theta + \\cos^2\\theta = 1$',
              '$\\sin^2\\theta = 1 - \\cos^2\\theta$ \u00a0 or \u00a0 $\\cos^2\\theta = 1 - \\sin^2\\theta$',
            ],
            [
              '$1 + \\tan^2\\theta = \\sec^2\\theta$',
              '$\\tan^2\\theta = \\sec^2\\theta - 1$ \u00a0 or \u00a0 $\\sec^2\\theta - \\tan^2\\theta = 1$',
            ],
            [
              '$1 + \\cot^2\\theta = \\cosec^2\\theta$',
              '$\\cot^2\\theta = \\cosec^2\\theta - 1$ \u00a0 or \u00a0 $\\cosec^2\\theta - \\cot^2\\theta = 1$',
            ],
          ],
        },
        {
          t: 'note',
          tone: 'tip',
          text: 'When you see $1 - \\cos^2\\theta$, think $\\sin^2\\theta$. When you see $\\sec^2\\theta - 1$, think $\\tan^2\\theta$. Spotting these is half the work of proving identities in the next lesson.',
        },
        {
          t: 'note',
          text: 'The identities are true for every angle, but in this chapter we use the ratios only for $0^\\circ < \\theta < 90^\\circ$, where all six are defined and positive.',
        },
      ],
      check: {
        id: 'l2-c-forms',
        type: 'mcq',
        prompt: '$\\cosec^2\\theta - 1$ is equal to',
        options: ['$\\cot^2\\theta$', '$\\tan^2\\theta$', '$\\sec^2\\theta$', '$1$'],
        correct: 0,
        solution: [{ text: 'From $1 + \\cot^2\\theta = \\cosec^2\\theta$, subtract 1 from both sides.' }],
      },
    },
    {
      id: 'find',
      title: 'From one ratio to all the others',
      blocks: [
        {
          t: 'p',
          text: 'Know one ratio of an acute angle, and the identities give you the rest. Say $\\sin\\theta = \\dfrac35$:',
        },
        {
          t: 'list',
          ordered: true,
          items: [
            '$\\cos^2\\theta = 1 - \\sin^2\\theta = 1 - \\dfrac{9}{25} = \\dfrac{16}{25}$, so $\\cos\\theta = \\dfrac45$ (positive, as $\\theta$ is acute).',
            '$\\tan\\theta = \\dfrac{\\sin\\theta}{\\cos\\theta} = \\dfrac{3/5}{4/5} = \\dfrac34$.',
            'Then the reciprocals: $\\cosec\\theta = \\dfrac53$, $\\sec\\theta = \\dfrac54$, $\\cot\\theta = \\dfrac43$.',
          ],
        },
        {
          t: 'note',
          tone: 'think',
          text: 'You could also draw a right triangle with opposite side 3 and hypotenuse 5, and find the third side, 4, by Pythagoras. The identity is the same calculation without the picture.',
        },
      ],
      check: {
        id: 'l2-c-find',
        type: 'numeric',
        prompt: 'If $\\cos\\theta = \\dfrac{5}{13}$ and $\\theta$ is acute, find $\\tan\\theta$.',
        parts: [{ answer: { value: 12 / 5, display: '12/5' } }],
        hints: ['First find $\\sin\\theta$ from $\\sin^2\\theta = 1 - \\cos^2\\theta$.'],
        solution: [
          {
            math: '\\sin^2\\theta = 1 - \\frac{25}{169} = \\frac{144}{169} \\;\\Rightarrow\\; \\sin\\theta = \\frac{12}{13}',
          },
          { math: '\\tan\\theta = \\frac{12/13}{5/13} = \\frac{12}{5}' },
        ],
      },
    },
    {
      id: 'pairs',
      title: 'A useful trick: the partner of sec θ + tan θ',
      blocks: [
        { t: 'p', text: 'The form $\\sec^2\\theta - \\tan^2\\theta = 1$ is a difference of two squares:' },
        { t: 'math', tex: '(\\sec\\theta + \\tan\\theta)(\\sec\\theta - \\tan\\theta) = 1' },
        {
          t: 'p',
          text: 'So $\\sec\\theta + \\tan\\theta$ and $\\sec\\theta - \\tan\\theta$ are **reciprocals**. If one is $p$, the other is $\\dfrac1p$. The same is true of $\\cosec\\theta + \\cot\\theta$ and $\\cosec\\theta - \\cot\\theta$.',
        },
        {
          t: 'p',
          text: 'Adding and subtracting the two then gives each ratio on its own. Example 6.11 in the next lesson uses exactly this.',
        },
      ],
      check: {
        id: 'l2-c-pairs',
        type: 'numeric',
        prompt: 'If $\\sec\\theta + \\tan\\theta = 3$, find $\\sec\\theta - \\tan\\theta$.',
        parts: [{ answer: { value: 1 / 3, display: '1/3' } }],
        solution: [
          { math: '(\\sec\\theta + \\tan\\theta)(\\sec\\theta - \\tan\\theta) = \\sec^2\\theta - \\tan^2\\theta = 1' },
          { math: '\\sec\\theta - \\tan\\theta = \\frac13' },
        ],
      },
    },
  ],

  explore: [
    {
      widget: 'identity-circle',
      title: 'Three triangles on the unit circle',
      intro:
        'On a circle of radius 1, the sides of the right triangles are the trigonometric ratios themselves. Pythagoras on each triangle is one of the three identities.',
      tryThis: [
        'Drag P and watch $\\sin^2\\theta + \\cos^2\\theta$. Can you make it anything other than 1?',
        'Switch to $1 + \\tan^2\\theta = \\sec^2\\theta$. What happens to $\\tan\\theta$ as $\\theta$ gets close to $90^\\circ$?',
        'At $45^\\circ$, which sides of the first triangle are equal? What does that say about $\\sin 45^\\circ$ and $\\cos 45^\\circ$?',
      ],
    },
  ],

  examples: [
    {
      id: 'l2-ex-first',
      source: 'Section 6.2',
      title: 'Proving sin²θ + cos²θ = 1',
      prompt:
        'In the right triangle OMP with $\\angle OMP = 90^\\circ$ and $\\angle MOP = \\theta$, prove that $\\sin^2\\theta + \\cos^2\\theta = 1$.',
      figure: omp(),
      steps: [
        {
          text: 'Write the two ratios from the triangle.',
          math: '\\frac{OM}{OP} = \\cos\\theta, \\quad \\frac{PM}{OP} = \\sin\\theta',
          highlight: ['om', 'mp', 'op'],
        },
        { text: 'Pythagoras theorem in triangle OMP:', math: 'MP^2 + OM^2 = OP^2' },
        {
          text: 'Divide each term by $OP^2$, which is not zero:',
          math: '\\left(\\frac{MP}{OP}\\right)^2 + \\left(\\frac{OM}{OP}\\right)^2 = 1',
        },
        {
          text: 'Substitute the ratios.',
          math: '(\\sin\\theta)^2 + (\\cos\\theta)^2 = 1 \\;\\Rightarrow\\; \\sin^2\\theta + \\cos^2\\theta = 1',
        },
      ],
      answer: '$\\sin^2\\theta + \\cos^2\\theta = 1$ for every angle $\\theta$.',
    },
    {
      id: 'l2-ex-second',
      source: 'Section 6.2',
      title: 'Proving 1 + tan²θ = sec²θ',
      prompt: 'Using the same triangle, prove that $1 + \\tan^2\\theta = \\sec^2\\theta$.',
      figure: omp(),
      steps: [
        { math: '\\frac{MP}{OM} = \\tan\\theta, \\quad \\frac{OP}{OM} = \\sec\\theta', highlight: ['mp', 'om', 'op'] },
        {
          text: 'Divide $MP^2 + OM^2 = OP^2$ by $OM^2$, which is not zero:',
          math: '\\left(\\frac{MP}{OM}\\right)^2 + 1 = \\left(\\frac{OP}{OM}\\right)^2',
          highlight: ['om'],
        },
        { math: '\\tan^2\\theta + 1 = \\sec^2\\theta' },
      ],
      answer: '$1 + \\tan^2\\theta = \\sec^2\\theta$.',
    },
    {
      id: 'l2-ex-third',
      source: 'Section 6.2',
      title: 'Proving 1 + cot²θ = cosec²θ',
      prompt: 'Using the same triangle, prove that $1 + \\cot^2\\theta = \\cosec^2\\theta$.',
      figure: omp(),
      steps: [
        {
          math: '\\frac{OM}{MP} = \\cot\\theta, \\quad \\frac{OP}{MP} = \\cosec\\theta',
          highlight: ['mp', 'om', 'op'],
        },
        {
          text: 'Divide $MP^2 + OM^2 = OP^2$ by $MP^2$, which is not zero:',
          math: '1 + \\left(\\frac{OM}{MP}\\right)^2 = \\left(\\frac{OP}{MP}\\right)^2',
          highlight: ['mp'],
        },
        { math: '1 + \\cot^2\\theta = \\cosec^2\\theta' },
      ],
      answer: '$1 + \\cot^2\\theta = \\cosec^2\\theta$.',
    },
    {
      id: 'l2-ex-activity',
      source: 'Activity 1',
      title: 'Measuring the ratios with a ruler',
      prompt:
        'Draw perpendicular lines OX and OY. Draw OA with $\\angle AOX = 30^\\circ$, and drop a perpendicular from A to OX, meeting it at B. Measure AB, OB and OA, and find $\\dfrac{AB}{OA}$, $\\dfrac{OB}{OA}$ and $\\dfrac{AB}{OB}$. Repeat for $45^\\circ$ and $60^\\circ$.',
      figure: {
        view: [-0.8, -0.8, 9.6, 5.6],
        maxWidth: 380,
        points: { O: [0, 0], X: [9.3, 0], Y: [0, 5.4], A: [8.66, 5], B: [8.66, 0] },
        labelDir: { O: 'sw', X: 'e', Y: 'n', A: 'ne', B: 's' },
        segs: [
          { a: 'O', b: 'X', kind: 'line', color: 'muted' },
          { a: 'O', b: 'Y', kind: 'line', color: 'muted' },
          { id: 'oa', a: 'O', b: 'A', color: 'hyp', label: '10 cm', labelSide: 1 },
          { id: 'ab', a: 'B', b: 'A', color: 'opp', label: '5 cm', labelSide: 1 },
          { id: 'ob', a: 'O', b: 'B', color: 'adj', label: '8.66 cm', labelSide: -1 },
        ],
        right: [{ at: 'B', a: 'O', b: 'A' }],
        angles: [{ at: 'O', from: 'B', to: 'A', label: '30°', r: 40 }],
      },
      steps: [
        {
          text: 'With $OA = 10$ cm at $30^\\circ$, careful measuring gives $AB \\approx 5$ cm and $OB \\approx 8.66$ cm.',
          highlight: ['oa', 'ab', 'ob'],
        },
        {
          math: '\\frac{AB}{OA} = 0.5 = \\sin 30^\\circ, \\quad \\frac{OB}{OA} = 0.866 = \\cos 30^\\circ, \\quad \\frac{AB}{OB} = 0.577 = \\tan 30^\\circ',
        },
        {
          text: 'At $45^\\circ$: $AB = OB \\approx 7.07$ cm, so the first two ratios are both about 0.707 and the third is 1. At $60^\\circ$ the first two values swap: $0.866$ and $0.5$, and the third is $1.732$.',
        },
        {
          text: 'Check the first identity with the measurements:',
          math: '\\sin^2 30^\\circ + \\cos^2 30^\\circ = 0.25 + 0.75 = 1',
        },
      ],
      answer:
        'The measured ratios match the table values, whatever length you choose for OA. The ratios depend only on the angle.',
    },
    {
      id: 'l2-ex-find',
      source: 'Worked example',
      title: 'All six ratios from one',
      prompt: 'If $\\sec\\theta = \\dfrac{17}{8}$ and $\\theta$ is acute, find the other five trigonometric ratios.',
      steps: [
        { text: 'The reciprocal first:', math: '\\cos\\theta = \\frac{8}{17}' },
        {
          text: 'Use $1 + \\tan^2\\theta = \\sec^2\\theta$:',
          math: '\\tan^2\\theta = \\frac{289}{64} - 1 = \\frac{225}{64} \\;\\Rightarrow\\; \\tan\\theta = \\frac{15}{8}',
        },
        { math: '\\cot\\theta = \\frac{8}{15}' },
        {
          text: '$\\sin\\theta = \\tan\\theta \\times \\cos\\theta$:',
          math: '\\sin\\theta = \\frac{15}{8} \\times \\frac{8}{17} = \\frac{15}{17}, \\quad \\cosec\\theta = \\frac{17}{15}',
        },
        { text: 'Check:', math: '\\sin^2\\theta + \\cos^2\\theta = \\frac{225 + 64}{289} = 1' },
      ],
      answer:
        '$\\sin\\theta = \\frac{15}{17}$, $\\cos\\theta = \\frac{8}{17}$, $\\tan\\theta = \\frac{15}{8}$, $\\cosec\\theta = \\frac{17}{15}$, $\\cot\\theta = \\frac{8}{15}$.',
    },
  ],

  practice: [
    {
      id: 'l2-p-pc2',
      source: 'Progress Check · p.249 Q2',
      type: 'mcq',
      prompt: '$1 - \\cos^2\\theta$ is',
      options: ['$\\sin^2\\theta$', '$\\tan^2\\theta$', '$1 - \\sin^2\\theta$', '$\\sec^2\\theta$'],
      correct: 0,
      solution: [{ text: 'From $\\sin^2\\theta + \\cos^2\\theta = 1$, subtract $\\cos^2\\theta$ from both sides.' }],
    },
    {
      id: 'l2-p-pc3',
      source: 'Progress Check · p.249 Q3',
      type: 'numeric',
      prompt: 'Find the value of $(\\sec\\theta + \\tan\\theta)(\\sec\\theta - \\tan\\theta)$.',
      parts: [{ answer: { value: 1, display: '1' } }],
      hints: ['Multiply out: it is a difference of two squares.'],
      solution: [
        { math: '(\\sec\\theta + \\tan\\theta)(\\sec\\theta - \\tan\\theta) = \\sec^2\\theta - \\tan^2\\theta = 1' },
      ],
    },
    {
      id: 'l2-p-pc4',
      source: 'Progress Check · p.249 Q4',
      type: 'numeric',
      prompt: 'Find the value of $(\\cot\\theta + \\cosec\\theta)(\\cot\\theta - \\cosec\\theta)$.',
      parts: [{ answer: { value: -1, display: '−1' } }],
      hints: ['It is $\\cot^2\\theta - \\cosec^2\\theta$. Compare with $\\cosec^2\\theta - \\cot^2\\theta = 1$.'],
      solution: [
        { math: '(\\cot\\theta + \\cosec\\theta)(\\cot\\theta - \\cosec\\theta) = \\cot^2\\theta - \\cosec^2\\theta' },
        { text: 'This is the negative of $\\cosec^2\\theta - \\cot^2\\theta = 1$.', math: '= -1' },
      ],
    },
    {
      id: 'l2-p-sec',
      source: 'Practice',
      type: 'numeric',
      prompt: 'If $\\sec\\theta = \\dfrac{13}{12}$ and $\\theta$ is acute, find $\\tan\\theta$.',
      parts: [{ answer: { value: 5 / 12, display: '5/12' } }],
      solution: [
        {
          math: '\\tan^2\\theta = \\sec^2\\theta - 1 = \\frac{169}{144} - 1 = \\frac{25}{144} \\;\\Rightarrow\\; \\tan\\theta = \\frac{5}{12}',
        },
      ],
    },
    {
      id: 'l2-p-cot',
      source: 'Practice',
      type: 'numeric',
      prompt: 'If $\\cot\\theta = \\dfrac{7}{24}$ and $\\theta$ is acute, find $\\cosec\\theta$.',
      parts: [{ answer: { value: 25 / 24, display: '25/24' } }],
      solution: [
        {
          math: '\\cosec^2\\theta = 1 + \\frac{49}{576} = \\frac{625}{576} \\;\\Rightarrow\\; \\cosec\\theta = \\frac{25}{24}',
        },
      ],
    },
    {
      id: 'l2-p-cos',
      source: 'Practice',
      type: 'numeric',
      prompt: 'If $\\cos\\theta = 0.8$ and $\\theta$ is acute, find $\\sin\\theta$ and $\\tan\\theta$.',
      parts: [
        { label: '$\\sin\\theta$', answer: { value: 0.6, display: '0.6' } },
        { label: '$\\tan\\theta$', answer: { value: 0.75, display: '0.75' } },
      ],
      solution: [
        { math: '\\sin\\theta = \\sqrt{1 - 0.64} = \\sqrt{0.36} = 0.6' },
        { math: '\\tan\\theta = \\frac{0.6}{0.8} = 0.75' },
      ],
    },
    {
      id: 'l2-p-comp',
      source: 'Practice',
      type: 'numeric',
      prompt: 'Evaluate $\\sin^2 63^\\circ + \\sin^2 27^\\circ$.',
      parts: [{ answer: { value: 1, display: '1' } }],
      hints: ['$27^\\circ = 90^\\circ - 63^\\circ$, so $\\sin 27^\\circ = \\cos 63^\\circ$ (Lesson 6.1).'],
      solution: [
        { math: '\\sin 27^\\circ = \\sin(90^\\circ - 63^\\circ) = \\cos 63^\\circ' },
        { math: '\\sin^2 63^\\circ + \\sin^2 27^\\circ = \\sin^2 63^\\circ + \\cos^2 63^\\circ = 1' },
      ],
    },
    {
      id: 'l2-p-nine',
      source: 'Practice',
      type: 'numeric',
      prompt: 'Evaluate $9\\sec^2 A - 9\\tan^2 A$.',
      parts: [{ answer: { value: 9, display: '9' } }],
      solution: [{ math: '9\\sec^2 A - 9\\tan^2 A = 9(\\sec^2 A - \\tan^2 A) = 9 \\times 1 = 9' }],
    },
    {
      id: 'l2-p-simplify',
      source: 'Practice',
      type: 'numeric',
      prompt: 'Simplify $(1 + \\tan^2\\theta)(1 - \\sin\\theta)(1 + \\sin\\theta)$.',
      parts: [{ answer: { value: 1, display: '1' } }],
      hints: ['Two pieces each become one ratio: $1 + \\tan^2\\theta$ and $(1 - \\sin\\theta)(1 + \\sin\\theta)$.'],
      solution: [{ math: '(1 + \\tan^2\\theta)(1 - \\sin^2\\theta) = \\sec^2\\theta \\cdot \\cos^2\\theta = 1' }],
    },
    {
      id: 'l2-p-root7',
      source: 'Practice',
      type: 'numeric',
      prompt:
        'If $\\tan\\theta = \\dfrac{1}{\\sqrt7}$, find $\\dfrac{\\cosec^2\\theta - \\sec^2\\theta}{\\cosec^2\\theta + \\sec^2\\theta}$.',
      parts: [{ answer: { value: 0.75, display: '3/4' } }],
      hints: [
        'Find $\\cot^2\\theta$ first. Then $\\cosec^2\\theta = 1 + \\cot^2\\theta$ and $\\sec^2\\theta = 1 + \\tan^2\\theta$.',
      ],
      solution: [
        { math: '\\tan^2\\theta = \\frac17, \\quad \\cot^2\\theta = 7' },
        { math: '\\cosec^2\\theta = 1 + 7 = 8, \\quad \\sec^2\\theta = 1 + \\frac17 = \\frac87' },
        { math: '\\frac{8 - \\frac87}{8 + \\frac87} = \\frac{48/7}{64/7} = \\frac{48}{64} = \\frac34' },
      ],
    },
    {
      id: 'l2-p-pair',
      source: 'Practice',
      type: 'numeric',
      prompt: 'If $\\cosec\\theta - \\cot\\theta = \\dfrac15$, find $\\cosec\\theta$ and $\\cot\\theta$.',
      parts: [
        { label: '$\\cosec\\theta$', answer: { value: 2.6, display: '13/5' } },
        { label: '$\\cot\\theta$', answer: { value: 2.4, display: '12/5' } },
      ],
      hints: [
        '$(\\cosec\\theta + \\cot\\theta)(\\cosec\\theta - \\cot\\theta) = 1$, so $\\cosec\\theta + \\cot\\theta = 5$.',
        'Now add and subtract the two equations.',
      ],
      solution: [
        { math: '\\cosec\\theta + \\cot\\theta = 5, \\quad \\cosec\\theta - \\cot\\theta = \\frac15' },
        { text: 'Add:', math: '2\\cosec\\theta = \\frac{26}{5} \\;\\Rightarrow\\; \\cosec\\theta = \\frac{13}{5}' },
        { text: 'Subtract:', math: '2\\cot\\theta = \\frac{24}{5} \\;\\Rightarrow\\; \\cot\\theta = \\frac{12}{5}' },
      ],
    },
    {
      id: 'l2-p-not',
      source: 'Practice',
      type: 'mcq',
      prompt: 'Which one of these is **not** an identity?',
      options: [
        '$\\sec^2\\theta - \\tan^2\\theta = 1$',
        '$\\cos^2\\theta = 1 - \\sin^2\\theta$',
        '$\\cot^2\\theta = \\cosec^2\\theta - 1$',
        '$\\sec\\theta - \\tan\\theta = 1$',
      ],
      correct: 3,
      solution: [
        {
          text: 'Try $\\theta = 60^\\circ$: $\\sec 60^\\circ - \\tan 60^\\circ = 2 - \\sqrt3 \\approx 0.27$, not 1. The identity is about the **squares**: $\\sec^2\\theta - \\tan^2\\theta = 1$.',
        },
      ],
    },
  ],

  quiz: [
    {
      id: 'l2-q1',
      type: 'mcq',
      prompt: '$\\sin^2\\theta$ means',
      options: ['$(\\sin\\theta)^2$', '$\\sin(\\theta^2)$', '$2\\sin\\theta$', '$\\sin(2\\theta)$'],
      correct: 0,
      solution: [{ text: '$\\sin^2\\theta$ is shorthand for $(\\sin\\theta)^2$.' }],
    },
    {
      id: 'l2-q2',
      type: 'numeric',
      prompt: 'If $\\sin\\theta = \\dfrac{8}{17}$ and $\\theta$ is acute, find $\\cos\\theta$.',
      parts: [{ answer: { value: 15 / 17, display: '15/17' } }],
      solution: [{ math: '\\cos\\theta = \\sqrt{1 - \\frac{64}{289}} = \\sqrt{\\frac{225}{289}} = \\frac{15}{17}' }],
    },
    {
      id: 'l2-q3',
      type: 'mcq',
      prompt:
        'In right triangle OMP (right angle at M, $\\theta$ at O), which division of $MP^2 + OM^2 = OP^2$ gives $1 + \\cot^2\\theta = \\cosec^2\\theta$?',
      options: ['Divide by $OP^2$', 'Divide by $OM^2$', 'Divide by $MP^2$', 'Divide by $OM \\cdot MP$'],
      correct: 2,
      solution: [
        {
          text: 'Dividing by $MP^2$ gives $1 + \\left(\\frac{OM}{MP}\\right)^2 = \\left(\\frac{OP}{MP}\\right)^2$, and $\\frac{OM}{MP} = \\cot\\theta$, $\\frac{OP}{MP} = \\cosec\\theta$.',
        },
      ],
    },
    {
      id: 'l2-q4',
      type: 'numeric',
      prompt: 'Simplify $(1 - \\sin^2\\theta)\\sec^2\\theta$.',
      parts: [{ answer: { value: 1, display: '1' } }],
      solution: [{ math: '(1 - \\sin^2\\theta)\\sec^2\\theta = \\cos^2\\theta \\cdot \\frac{1}{\\cos^2\\theta} = 1' }],
    },
    {
      id: 'l2-q5',
      type: 'numeric',
      prompt: 'If $\\tan\\theta = 2.4$ and $\\theta$ is acute, find $\\sec\\theta$.',
      parts: [{ answer: { value: 2.6, display: '2.6' } }],
      solution: [{ math: '\\sec^2\\theta = 1 + 5.76 = 6.76 \\;\\Rightarrow\\; \\sec\\theta = 2.6' }],
    },
    {
      id: 'l2-q6',
      type: 'mcq',
      prompt: '$\\sec^2\\theta - 1$ is equal to',
      options: ['$\\tan^2\\theta$', '$\\cot^2\\theta$', '$\\cos^2\\theta$', '$\\sin^2\\theta$'],
      correct: 0,
      solution: [{ text: 'From $1 + \\tan^2\\theta = \\sec^2\\theta$.' }],
    },
  ],
}
