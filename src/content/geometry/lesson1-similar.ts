import type { Lesson, SceneSpec } from '../types'

const AA = 'AA similarity'
const SAS = 'SAS similarity'
const SSS = 'SSS similarity'
const CPST = 'Corresponding sides of similar triangles are proportional'

/** Two similar triangles side by side, for the opening cards. */
const pair: SceneSpec = {
  view: [-0.5, -0.6, 11, 4.4],
  maxWidth: 440,
  points: { A: [1.2, 3.6], B: [0, 0], C: [4, 0], P: [7.4, 2.4], Q: [6.6, 0], R: [9.27, 0] },
  fills: [
    { pts: ['A', 'B', 'C'], tone: 'sun' },
    { pts: ['P', 'Q', 'R'], tone: 'sky' },
  ],
  segs: [
    { a: 'A', b: 'B', ticks: 1 },
    { a: 'B', b: 'C', ticks: 2 },
    { a: 'C', b: 'A', ticks: 3 },
    { a: 'P', b: 'Q', ticks: 1 },
    { a: 'Q', b: 'R', ticks: 2 },
    { a: 'R', b: 'P', ticks: 3 },
  ],
  angles: [
    { at: 'A', from: 'B', to: 'C', label: '1', r: 18 },
    { at: 'B', from: 'C', to: 'A', label: '2', r: 18 },
    { at: 'P', from: 'Q', to: 'R', label: '1', r: 14 },
    { at: 'Q', from: 'R', to: 'P', label: '2', r: 14 },
  ],
}

/** Right triangle ABC (right angle at B) with the altitude BD to the hypotenuse. */
const altitude: SceneSpec = {
  view: [-0.5, -0.7, 8.5, 3.6],
  maxWidth: 400,
  points: { A: [0, 0], C: [8, 0], B: [5.6, 2.94], D: [5.6, 0] },
  labelDir: { B: 'n', D: 's', A: 'sw', C: 'se' },
  fills: [
    { pts: ['A', 'B', 'D'], tone: 'sun' },
    { pts: ['D', 'B', 'C'], tone: 'peach' },
  ],
  segs: [
    { a: 'A', b: 'B' },
    { a: 'B', b: 'C' },
    { a: 'A', b: 'C' },
    { a: 'B', b: 'D', color: 'accent' },
  ],
  right: [
    { at: 'B', a: 'A', b: 'C' },
    { at: 'D', a: 'C', b: 'B' },
  ],
}

export const lesson1: Lesson = {
  id: 'similar-triangles',
  number: 1,
  title: 'Similar triangles',
  summary: 'Same shape, different size: the AA, SAS and SSS tests, and what similarity tells you.',
  pages: '161–168',
  status: 'ready',

  learn: [
    {
      id: 'similar',
      title: 'Same shape, not the same size',
      blocks: [
        {
          t: 'p',
          text: 'A photo and its enlargement, a house and its model, two clocks of different sizes: each pair has the **same shape** but not the same size. In geometry such figures are called **similar**.',
        },
        {
          t: 'p',
          text: 'You already know **congruent** triangles: same shape *and* same size. Similar triangles have equal angles too, but their sides are only **proportional**: every side of one is the same multiple of the matching side of the other.',
        },
        { t: 'figure', scene: pair, caption: 'ΔABC ~ ΔPQR: equal angles, sides in the same ratio' },
        {
          t: 'table',
          head: ['', 'Congruent ($\\cong$)', 'Similar ($\\sim$)'],
          firstColHead: true,
          rows: [
            ['Angles', 'equal', 'equal'],
            [
              'Sides',
              'equal: $\\tfrac{AB}{PQ} = \\tfrac{BC}{QR} = \\tfrac{CA}{RP} = 1$',
              'proportional: the three ratios are equal',
            ],
            ['Size', 'same', 'can differ'],
          ],
        },
        {
          t: 'note',
          tone: 'tip',
          text: 'Congruence is a special case of similarity, with ratio 1. So every pair of congruent triangles is similar, but similar triangles need not be congruent.',
        },
        {
          t: 'note',
          tone: 'history',
          text: 'Eratosthenes used similar figures to estimate the circumference of the Earth, more than 2,000 years ago. Surveyors still use similarity to find the width of rivers and the heights of trees.',
        },
      ],
      check: {
        id: 'geo1-c-similar',
        type: 'mcq',
        prompt: 'All circles are',
        options: ['similar', 'congruent', 'neither similar nor congruent', 'similar only if they have the same centre'],
        correct: 0,
        solution: [
          {
            text: 'Every circle is an enlargement of every other circle, so all circles are similar. They are congruent only when the radii are equal.',
          },
        ],
      },
    },
    {
      id: 'correspondence',
      title: 'Writing a similarity in the right order',
      blocks: [
        {
          t: 'p',
          text: 'When we write $\\Delta ABC \\sim \\Delta PQR$, the order of the letters tells you which vertices match: $A \\leftrightarrow P$, $B \\leftrightarrow Q$, $C \\leftrightarrow R$. So',
        },
        {
          t: 'math',
          tex: '\\angle A = \\angle P,\\ \\angle B = \\angle Q,\\ \\angle C = \\angle R \\quad\\text{and}\\quad \\frac{AB}{PQ} = \\frac{BC}{QR} = \\frac{CA}{RP}',
        },
        {
          t: 'p',
          text: 'Two triangles are similar exactly when they are **equiangular** (corresponding angles equal), and exactly when their corresponding sides are proportional. Either one gives you the other.',
        },
        {
          t: 'note',
          tone: 'tip',
          text: 'Before writing ratios, match the vertices by their equal angles. A ratio such as $\\tfrac{AB}{QR}$ compares sides that do not correspond, and gives a wrong answer.',
        },
      ],
      check: {
        id: 'geo1-c-order',
        type: 'mcq',
        prompt: 'If $\\Delta XYZ \\sim \\Delta LMN$, which ratio equals $\\dfrac{XY}{LM}$?',
        options: ['$\\dfrac{YZ}{MN}$', '$\\dfrac{YZ}{LN}$', '$\\dfrac{XZ}{MN}$', '$\\dfrac{XY}{MN}$'],
        correct: 0,
        solution: [
          {
            text: 'X ↔ L, Y ↔ M, Z ↔ N. So YZ corresponds to MN, and $\\tfrac{XY}{LM} = \\tfrac{YZ}{MN} = \\tfrac{XZ}{LN}$.',
          },
        ],
      },
    },
    {
      id: 'criteria',
      title: 'Three tests for similarity',
      blocks: [
        { t: 'p', text: 'You do not need to check all six parts. Any one of these is enough:' },
        {
          t: 'table',
          head: ['Test', 'What you need', 'Example'],
          rows: [
            [
              '**AA**',
              'Two angles of one triangle equal two angles of the other. (The third angles are then equal too, so AA is the same as AAA.)',
              '$\\angle A = \\angle P$ and $\\angle B = \\angle Q$',
            ],
            [
              '**SAS**',
              'One angle equal, and the two sides **including** that angle proportional.',
              '$\\angle A = \\angle P$ and $\\tfrac{AB}{PQ} = \\tfrac{AC}{PR}$',
            ],
            [
              '**SSS**',
              'All three pairs of sides proportional.',
              '$\\tfrac{AB}{PQ} = \\tfrac{BC}{QR} = \\tfrac{CA}{RP}$',
            ],
          ],
        },
        {
          t: 'note',
          tone: 'think',
          text: 'Are any two right-angled triangles similar? Not always: they share the 90° angle, but AA needs a **second** equal angle. A 30-60-90 triangle and a 45-45-90 triangle are both right-angled and not similar.',
        },
      ],
      check: {
        id: 'geo1-c-criteria',
        type: 'mcq',
        prompt:
          'In $\\Delta ABC$ and $\\Delta PQR$, $\\angle A = \\angle P$ and $\\dfrac{AB}{PQ} = \\dfrac{AC}{PR}$. Which test shows they are similar?',
        options: ['SAS', 'AA', 'SSS', 'None: they need not be similar'],
        correct: 0,
        solution: [{ text: 'One equal angle, with the two sides that include it in proportion: that is SAS.' }],
      },
    },
    {
      id: 'results',
      title: 'What similarity tells you',
      blocks: [
        {
          t: 'p',
          text: 'If $\\Delta ABC \\sim \\Delta PQR$ with ratio $k$ (each side of $PQR$ is $k$ times its partner in $ABC$):',
        },
        {
          t: 'list',
          items: [
            '**Altitudes, medians, perimeters** are in the same ratio $k$: $\\dfrac{AB}{PQ} = \\dfrac{\\text{altitude of } ABC}{\\text{altitude of } PQR} = \\dfrac{\\text{perimeter of } ABC}{\\text{perimeter of } PQR}$.',
            '**Areas** are in the ratio $k^2$: $\\dfrac{\\text{area}(\\Delta ABC)}{\\text{area}(\\Delta PQR)} = \\dfrac{AB^2}{PQ^2} = \\dfrac{BC^2}{QR^2} = \\dfrac{CA^2}{RP^2}$.',
            'Two triangles with a common vertex and bases on one line have areas in the ratio of their bases (their heights are equal).',
          ],
        },
        {
          t: 'note',
          tone: 'tip',
          text: 'Doubling every side multiplies the area by 4, not 2: the triangle gets twice as wide *and* twice as tall.',
        },
      ],
      check: {
        id: 'geo1-c-area',
        type: 'numeric',
        prompt:
          'Two similar triangles have corresponding sides 2 cm and 3 cm. The smaller has area 20 cm². What is the area of the larger?',
        parts: [{ answer: { value: 45, unit: 'cm²', display: '45 cm²' } }],
        hints: ['Areas are in the ratio of the squares of the sides: $\\tfrac{20}{x} = \\tfrac{2^2}{3^2}$.'],
        solution: [
          { math: '\\frac{20}{x} = \\frac{4}{9} \\;\\Rightarrow\\; x = \\frac{20 \\times 9}{4} = 45 \\text{ cm}^2' },
        ],
      },
    },
    {
      id: 'right-altitude',
      title: 'The altitude to the hypotenuse',
      blocks: [
        {
          t: 'p',
          text: 'In a right-angled triangle, the perpendicular from the right angle to the hypotenuse splits it into two smaller triangles. All three triangles are similar to each other.',
        },
        { t: 'figure', scene: altitude, caption: 'Right angle at B, BD ⟂ AC' },
        {
          t: 'math',
          tex: '\\Delta ADB \\sim \\Delta BDC, \\qquad \\Delta ABC \\sim \\Delta ADB, \\qquad \\Delta ABC \\sim \\Delta BDC',
        },
        {
          t: 'p',
          text: 'Each small triangle shares an angle with the big one and has a right angle, so AA applies. From $\\Delta ADB \\sim \\Delta BDC$ you get a useful result: $BD^2 = AD \\times DC$.',
        },
        {
          t: 'note',
          tone: 'think',
          title: 'Activity 1',
          text: 'Use this to draw $\\sqrt2$: take $AC = 2$, $CB = 1$ on a line, draw a semicircle on $AB$, and draw the perpendicular at $C$ up to the semicircle. Its length $h$ satisfies $h^2 = 2 \\times 1$. Lesson 4.2 shows it step by step.',
        },
      ],
      check: {
        id: 'geo1-c-altitude',
        type: 'numeric',
        prompt:
          'In right triangle $ABC$ with the right angle at $B$, $BD \\perp AC$, $AD = 4$ cm and $DC = 9$ cm. Find $BD$.',
        parts: [{ answer: { value: 6, unit: 'cm', display: '6 cm' } }],
        hints: ['$BD^2 = AD \\times DC$.'],
        solution: [{ math: 'BD^2 = AD \\times DC = 4 \\times 9 = 36 \\;\\Rightarrow\\; BD = 6 \\text{ cm}' }],
      },
    },
    {
      id: 'shadows',
      title: 'Heights from shadows',
      blocks: [
        {
          t: 'p',
          text: "At any one moment, the sun's rays hit everything at the same angle. So a vertical stick and its shadow form a triangle similar to a tower and *its* shadow (AA: both have a right angle and the same angle of the sun).",
        },
        {
          t: 'math',
          tex: '\\frac{\\text{height of tower}}{\\text{shadow of tower}} = \\frac{\\text{height of stick}}{\\text{shadow of stick}}',
        },
        {
          t: 'note',
          tone: 'history',
          text: 'Thales is said to have measured the height of an Egyptian pyramid this way, around 600 BCE, by comparing its shadow with the shadow of a stick.',
        },
      ],
      check: {
        id: 'geo1-c-shadow',
        type: 'numeric',
        prompt: 'A 2 m stick casts a 3 m shadow. At the same time a tree casts a 12 m shadow. How tall is the tree?',
        parts: [{ answer: { value: 8, unit: 'm', display: '8 m' } }],
        solution: [{ math: '\\frac{h}{12} = \\frac{2}{3} \\;\\Rightarrow\\; h = 8 \\text{ m}' }],
      },
    },
  ],

  explore: [
    {
      widget: 'similarity-lab',
      title: 'Similarity lab',
      intro:
        'Drag the corners of $\\Delta ABC$. $\\Delta PQR$ is a scaled copy: change the scale factor and watch the ratios and the angles. Then nudge $R$ to break the copy.',
      tryThis: [
        'Set the scale factor to 1. What kind of similar triangles are these?',
        'Nudge $R$ a little. Which ratios change? Do the angles still match?',
        'Compare the area ratio with the side ratio. What is the link?',
      ],
    },
  ],

  examples: [
    {
      id: 'geo1-ex1',
      source: 'Example 4.1',
      title: 'A small triangle inside a big one',
      prompt:
        'Show that $\\Delta PST \\sim \\Delta PQR$: (i) when $PS = 2$, $SQ = 1$, $PT = 4$, $TR = 2$ (as in the figure); (ii) when $PS = 2$, $SQ = 3$, $PT = 2$, $TR = 3$.',
      figure: {
        view: [-0.5, -0.6, 6.6, 3.6],
        maxWidth: 380,
        points: { P: [0.2, 3], Q: [0.6, 0], R: [6, 0.3], S: [0.47, 1], T: [4.07, 1.2] },
        labelDir: { P: 'nw', S: 'w', T: 'n' },
        segs: [
          { id: 'ps', a: 'P', b: 'S', label: '2', labelSide: 1 },
          { id: 'sq', a: 'S', b: 'Q', label: '1', labelSide: 1 },
          { id: 'pt', a: 'P', b: 'T', label: '4', labelSide: -1 },
          { id: 'tr', a: 'T', b: 'R', label: '2', labelSide: -1 },
          { a: 'Q', b: 'R' },
          { id: 'st', a: 'S', b: 'T', color: 'accent' },
        ],
        angles: [{ id: 'p', at: 'P', from: 'S', to: 'T', label: '' }],
      },
      steps: [
        { text: '(i) Compare the sides that include the common angle $P$.', highlight: ['p'] },
        {
          math: '\\frac{PS}{PQ} = \\frac{2}{2+1} = \\frac23, \\qquad \\frac{PT}{PR} = \\frac{4}{4+2} = \\frac23',
          highlight: ['ps', 'sq', 'pt', 'tr'],
        },
        {
          text: 'The ratios are equal and $\\angle P$ is common, so $\\Delta PST \\sim \\Delta PQR$ by SAS similarity.',
          highlight: ['p', 'st'],
        },
        {
          text: '(ii) The same check: $\\tfrac{PS}{PQ} = \\tfrac{2}{5}$ and $\\tfrac{PT}{PR} = \\tfrac{2}{5}$. Equal, with $\\angle P$ common: SAS again.',
        },
      ],
      answer: 'In both cases $\\Delta PST \\sim \\Delta PQR$ by SAS.',
    },
    {
      id: 'geo1-ex2',
      source: 'Example 4.2',
      title: 'Two right triangles that are not similar',
      prompt:
        'In right triangles $ABC$ (right angle at $B$) and $PQR$ (right angle at $Q$), $AB = 6$, $BC = 10$, $PQ = 3$, $QR = 4$. Is $\\Delta ABC \\sim \\Delta PQR$?',
      figure: {
        view: [-0.8, -0.8, 17, 6.6],
        maxWidth: 420,
        points: { A: [0, 6], B: [0, 0], C: [10, 0], P: [12, 3], Q: [12, 0], R: [16, 0] },
        fills: [
          { pts: ['A', 'B', 'C'], tone: 'sun' },
          { pts: ['P', 'Q', 'R'], tone: 'sky' },
        ],
        segs: [
          { id: 'ab', a: 'A', b: 'B', label: '6', labelSide: -1 },
          { id: 'bc', a: 'B', b: 'C', label: '10', labelSide: -1 },
          { a: 'C', b: 'A' },
          { id: 'pq', a: 'P', b: 'Q', label: '3', labelSide: -1 },
          { id: 'qr', a: 'Q', b: 'R', label: '4', labelSide: -1 },
          { a: 'R', b: 'P' },
        ],
        right: [
          { at: 'B', a: 'A', b: 'C' },
          { at: 'Q', a: 'P', b: 'R' },
        ],
      },
      steps: [
        { text: 'The right angles match, so check the sides that include them.', highlight: ['ab', 'bc', 'pq', 'qr'] },
        { math: '\\frac{PQ}{AB} = \\frac{3}{6} = \\frac12, \\qquad \\frac{QR}{BC} = \\frac{4}{10} = \\frac25' },
        { text: '$\\tfrac12 \\ne \\tfrac25$: the sides are not proportional.' },
        { text: 'Changing just one of the four lengths (say $QR$ to 5) would make them similar.' },
      ],
      answer: 'No. $\\tfrac{PQ}{AB} \\ne \\tfrac{QR}{BC}$, so $\\Delta ABC$ is not similar to $\\Delta PQR$.',
    },
    {
      id: 'geo1-ex3',
      source: 'Example 4.3',
      title: 'An angle from SSS similarity',
      prompt:
        'In $\\Delta BAC$, $AB = 3$ cm, $BC = 6$ cm, $CA = 3\\sqrt3$ cm and $\\angle B = 60^\\circ$, $\\angle A = 90^\\circ$. In $\\Delta PRQ$, $RQ = 6$ cm, $QP = 12$ cm, $PR = 6\\sqrt3$ cm. Find $\\angle P$.',
      figure: {
        view: [-0.6, -1, 20.6, 6],
        maxWidth: 440,
        points: { B: [0, 0], C: [6, 0], A: [1.5, 2.6], P: [8, 0], Q: [20, 0], R: [17, 5.2] },
        fills: [
          { pts: ['A', 'B', 'C'], tone: 'sun' },
          { pts: ['P', 'Q', 'R'], tone: 'sky' },
        ],
        segs: [
          { a: 'A', b: 'B', label: '3', labelSide: 1 },
          { a: 'B', b: 'C', label: '6', labelSide: -1 },
          { a: 'C', b: 'A', label: '3√3', labelSide: 1 },
          { a: 'P', b: 'Q', label: '12', labelSide: -1 },
          { a: 'Q', b: 'R', label: '6', labelSide: 1 },
          { a: 'R', b: 'P', label: '6√3', labelSide: 1 },
        ],
        right: [
          { at: 'A', a: 'B', b: 'C' },
          { at: 'R', a: 'P', b: 'Q' },
        ],
        angles: [
          { at: 'B', from: 'C', to: 'A', label: '60°', r: 22 },
          { id: 'p', at: 'P', from: 'Q', to: 'R', label: '?', r: 30 },
        ],
      },
      steps: [
        { text: 'Pair the sides by length: shortest with shortest, and so on.' },
        {
          math: '\\frac{AB}{RQ} = \\frac36 = \\frac12, \\quad \\frac{BC}{QP} = \\frac{6}{12} = \\frac12, \\quad \\frac{CA}{PR} = \\frac{3\\sqrt3}{6\\sqrt3} = \\frac12',
        },
        {
          text: 'All three ratios are equal, so $\\Delta BAC \\sim \\Delta QRP$ (SSS). So $\\angle P$ corresponds to $\\angle C$.',
        },
        { math: '\\angle P = \\angle C = 180^\\circ - (90^\\circ + 60^\\circ) = 30^\\circ', highlight: ['p'] },
      ],
      answer: '$\\angle P = 30^\\circ$',
    },
    {
      id: 'geo1-ex4',
      source: 'Example 4.4',
      title: 'The lengthening shadow',
      prompt:
        'A boy 90 cm tall walks away from the base of a lamp post at 1.2 m/s. The lamp is 3.6 m above the ground. How long is his shadow after 4 seconds?',
      figure: {
        view: [-0.4, -0.5, 6.9, 4],
        ground: true,
        maxWidth: 420,
        objects: [
          { type: 'pole', at: [0, 0], h: 3.6 },
          { type: 'person', at: [4.8, 0], h: 0.9 },
        ],
        points: { A: [0, 3.6], B: [0, 0], C: [4.8, 0.9], D: [4.8, 0], E: [6.4, 0] },
        labelDir: { A: 'ne', B: 'sw', C: 'ne', D: 's', E: 's' },
        segs: [
          { a: 'A', b: 'E', kind: 'sight', color: 'accent' },
          { id: 'bd', a: 'B', b: 'D', label: '4.8 m', labelSide: -1, kind: 'dash' },
          { id: 'de', a: 'D', b: 'E', label: 'x', labelSide: -1, color: 'opp' },
          { a: 'A', b: 'B', label: '3.6 m', labelSide: 1 },
          { a: 'C', b: 'D', label: '0.9 m', labelSide: 1 },
        ],
      },
      steps: [
        {
          text: 'In 4 seconds he walks $1.2 \\times 4 = 4.8$ m, so $BD = 4.8$ m. Let the shadow be $DE = x$.',
          highlight: ['bd'],
        },
        { text: '$\\Delta ABE \\sim \\Delta CDE$: both have a right angle, and $\\angle E$ is common (AA).' },
        {
          math: '\\frac{BE}{DE} = \\frac{AB}{CD} \\;\\Rightarrow\\; \\frac{4.8 + x}{x} = \\frac{3.6}{0.9} = 4',
          highlight: ['de'],
        },
        { math: '4.8 + x = 4x \\;\\Rightarrow\\; 3x = 4.8 \\;\\Rightarrow\\; x = 1.6' },
      ],
      answer: 'His shadow is 1.6 m long.',
    },
    {
      id: 'geo1-ex5',
      source: 'Example 4.5',
      title: 'Proving similarity, then finding x',
      prompt: 'In the figure, $\\angle A = \\angle CED$. Prove that $\\Delta CAB \\sim \\Delta CED$, and find $x$.',
      figure: {
        view: [-0.6, -0.8, 10.6, 12.6],
        maxWidth: 300,
        points: { A: [0, 0], B: [9, 0], C: [9, 12], D: [4.2, 5.6], E: [9, 2] },
        labelDir: { A: 'sw', B: 'se', C: 'ne', D: 'nw', E: 'e' },
        segs: [
          { a: 'A', b: 'B', label: '9 cm', labelSide: -1 },
          { a: 'A', b: 'D', label: '7 cm', labelSide: 1 },
          { a: 'D', b: 'C', label: '8 cm', labelSide: 1 },
          { a: 'C', b: 'E', label: '10 cm', labelSide: -1 },
          { a: 'E', b: 'B', label: '2 cm', labelSide: -1 },
          { id: 'de', a: 'D', b: 'E', label: 'x', labelSide: 1, color: 'accent' },
        ],
        angles: [
          { id: 'a', at: 'A', from: 'B', to: 'D', label: '' },
          { id: 'e', at: 'E', from: 'C', to: 'D', label: '' },
        ],
      },
      steps: [
        {
          text: 'In $\\Delta CAB$ and $\\Delta CED$: $\\angle C$ is common and $\\angle A = \\angle CED$ (given).',
          highlight: ['a', 'e'],
        },
        {
          text: 'So $\\Delta CAB \\sim \\Delta CED$ by AA similarity, with $C \\leftrightarrow C$, $A \\leftrightarrow E$, $B \\leftrightarrow D$.',
        },
        { math: '\\frac{CA}{CE} = \\frac{AB}{ED} = \\frac{CB}{CD}' },
        {
          math: '\\frac{AB}{DE} = \\frac{CB}{CD} \\;\\Rightarrow\\; \\frac{9}{x} = \\frac{10 + 2}{8} \\;\\Rightarrow\\; x = \\frac{8 \\times 9}{12} = 6',
          highlight: ['de'],
        },
      ],
      answer: '$\\Delta CAB \\sim \\Delta CED$ (AA), and $x = 6$ cm.',
    },
    {
      id: 'geo1-ex6',
      source: 'Example 4.6',
      title: 'Vertically opposite angles',
      prompt: '$QA$ and $PB$ are perpendicular to $AB$. If $AO = 10$ cm, $BO = 6$ cm and $PB = 9$ cm, find $AQ$.',
      figure: {
        view: [-11.5, -10.5, 7.5, 16.5],
        maxWidth: 280,
        points: { A: [-10, 0], O: [0, 0], B: [6, 0], Q: [-10, 15], P: [6, -9] },
        labelDir: { A: 'w', B: 'e', O: 'n', Q: 'n', P: 's' },
        segs: [
          { a: 'A', b: 'O', label: '10', labelSide: -1 },
          { a: 'O', b: 'B', label: '6', labelSide: 1 },
          { id: 'aq', a: 'A', b: 'Q', label: '?', labelSide: 1, color: 'accent' },
          { a: 'B', b: 'P', label: '9', labelSide: 1 },
          { a: 'Q', b: 'P' },
        ],
        right: [
          { at: 'A', a: 'O', b: 'Q' },
          { at: 'B', a: 'O', b: 'P' },
        ],
        angles: [
          { id: 'o1', at: 'O', from: 'A', to: 'Q', label: '' },
          { id: 'o2', at: 'O', from: 'B', to: 'P', label: '' },
        ],
      },
      steps: [
        {
          text: 'In $\\Delta AOQ$ and $\\Delta BOP$: $\\angle OAQ = \\angle OBP = 90^\\circ$, and $\\angle AOQ = \\angle BOP$ (vertically opposite angles).',
          highlight: ['o1', 'o2'],
        },
        { text: 'So $\\Delta AOQ \\sim \\Delta BOP$ (AA).' },
        {
          math: '\\frac{AO}{BO} = \\frac{AQ}{BP} \\;\\Rightarrow\\; \\frac{10}{6} = \\frac{AQ}{9} \\;\\Rightarrow\\; AQ = \\frac{10 \\times 9}{6} = 15',
          highlight: ['aq'],
        },
      ],
      answer: '$AQ = 15$ cm',
    },
    {
      id: 'geo1-ex7',
      source: 'Example 4.7',
      title: 'Using perimeters',
      prompt:
        'The perimeters of two similar triangles $ABC$ and $PQR$ are 36 cm and 24 cm. If $PQ = 10$ cm, find $AB$.',
      steps: [
        { text: 'The ratio of corresponding sides equals the ratio of the perimeters.' },
        { math: '\\frac{AB}{PQ} = \\frac{36}{24} \\;\\Rightarrow\\; AB = \\frac{36 \\times 10}{24} = 15' },
      ],
      answer: '$AB = 15$ cm',
    },
    {
      id: 'geo1-ex8',
      source: 'Example 4.8',
      title: 'Using areas',
      prompt:
        '$\\Delta ABC \\sim \\Delta DEF$ with $BC = 3$ cm and $EF = 4$ cm. The area of $\\Delta ABC$ is 54 cm². Find the area of $\\Delta DEF$.',
      steps: [
        { text: 'Areas of similar triangles are in the ratio of the squares of corresponding sides.' },
        {
          math: '\\frac{\\text{area}(\\Delta ABC)}{\\text{area}(\\Delta DEF)} = \\frac{BC^2}{EF^2} \\;\\Rightarrow\\; \\frac{54}{\\text{area}(\\Delta DEF)} = \\frac{9}{16}',
        },
        { math: '\\text{area}(\\Delta DEF) = \\frac{16 \\times 54}{9} = 96' },
      ],
      answer: '96 cm²',
    },
    {
      id: 'geo1-ex9',
      source: 'Example 4.9',
      title: 'Where the wires cross',
      prompt:
        'Two poles of heights $a$ m and $b$ m are $p$ m apart. Prove that the lines joining the top of each pole to the foot of the other meet at a height of $\\dfrac{ab}{a+b}$ m.',
      figure: {
        view: [-0.6, -0.8, 8.8, 6.6],
        maxWidth: 360,
        points: { C: [0, 0], D: [0, 6], A: [8, 0], B: [8, 3], O: [5.333, 2], L: [5.333, 0] },
        labelDir: { C: 'sw', D: 'nw', A: 'se', B: 'ne', O: 'n', L: 's' },
        segs: [
          { a: 'C', b: 'D', label: 'b', labelSide: 1 },
          { a: 'A', b: 'B', label: 'a', labelSide: -1 },
          { a: 'C', b: 'A' },
          { id: 'ad', a: 'A', b: 'D', color: 'adj' },
          { id: 'cb', a: 'C', b: 'B', color: 'opp' },
          { id: 'ol', a: 'O', b: 'L', label: 'h', labelSide: 1, color: 'accent' },
          { id: 'cl', a: 'C', b: 'L', label: 'x', labelSide: -1, kind: 'dash' },
          { id: 'la', a: 'L', b: 'A', label: 'y', labelSide: -1, kind: 'dash' },
        ],
        right: [{ at: 'L', a: 'A', b: 'O' }],
      },
      steps: [
        {
          text: 'Let $AB = a$, $CD = b$, $AC = p$. Let the lines meet at $O$, with $OL = h$ perpendicular to $AC$. Let $CL = x$ and $LA = y$, so $x + y = p$.',
        },
        {
          text: '$\\Delta CAB \\sim \\Delta CLO$: right angles at $A$ and $L$, $\\angle C$ common (AA).',
          highlight: ['cb', 'ol', 'cl'],
        },
        {
          math: '\\frac{CA}{CL} = \\frac{AB}{LO} \\;\\Rightarrow\\; \\frac{p}{x} = \\frac{a}{h} \\;\\Rightarrow\\; x = \\frac{ph}{a}',
        },
        {
          text: '$\\Delta ALO \\sim \\Delta ACD$: right angles at $L$ and $C$, $\\angle A$ common (AA).',
          highlight: ['ad', 'ol', 'la'],
        },
        {
          math: '\\frac{AL}{AC} = \\frac{OL}{DC} \\;\\Rightarrow\\; \\frac{y}{p} = \\frac{h}{b} \\;\\Rightarrow\\; y = \\frac{ph}{b}',
        },
        {
          math: 'p = x + y = ph\\left(\\frac1a + \\frac1b\\right) \\;\\Rightarrow\\; 1 = h \\cdot \\frac{a + b}{ab} \\;\\Rightarrow\\; h = \\frac{ab}{a+b}',
        },
      ],
      answer: 'The height is $\\dfrac{ab}{a+b}$ m. Surprisingly, it does not depend on the distance $p$.',
    },
  ],

  practice: [
    {
      id: 'geo1-p1',
      source: 'Exercise 4.1 · Q1 (i)',
      type: 'mcq',
      prompt:
        'In $\\Delta ABC$, $E$ is on $AC$ and $D$ on $AB$ with $AE = 2$, $EC = 3.5$, $AD = 3$, $DB = 5$. Is $\\Delta AED$ similar to $\\Delta ABC$?',
      figure: {
        view: [-0.5, -0.7, 8.6, 4.8],
        maxWidth: 360,
        points: { A: [0, 0], D: [3, 0], B: [8, 0], E: [1.29, 1.53], C: [3.54, 4.21] },
        labelDir: { A: 'sw', D: 's', B: 'se', E: 'nw', C: 'n' },
        segs: [
          { a: 'A', b: 'D', label: '3', labelSide: -1 },
          { a: 'D', b: 'B', label: '5', labelSide: -1 },
          { a: 'A', b: 'E', label: '2', labelSide: 1 },
          { a: 'E', b: 'C', label: '3½', labelSide: 1 },
          { a: 'C', b: 'B' },
          { a: 'E', b: 'D', color: 'accent' },
        ],
      },
      options: [
        'No: $\\tfrac{AE}{AB} = \\tfrac14$ but $\\tfrac{AD}{AC} = \\tfrac{6}{11}$',
        'Yes, by SAS',
        'Yes, by AA',
        'Yes, because $\\angle A$ is common',
      ],
      correct: 0,
      hints: [
        '$\\angle A$ is common. For SAS, the sides around $\\angle A$ must be in proportion. Try both ways of pairing them.',
      ],
      solution: [
        {
          text: 'Pairing $AE$ with $AC$ and $AD$ with $AB$: $\\tfrac{2}{5.5} = \\tfrac{4}{11}$ and $\\tfrac{3}{8}$. Not equal.',
        },
        {
          text: 'Pairing $AE$ with $AB$ and $AD$ with $AC$: $\\tfrac{2}{8} = \\tfrac14$ and $\\tfrac{3}{5.5} = \\tfrac{6}{11}$. Not equal either.',
        },
        { text: 'A common angle alone is not enough, so the triangles are not similar.' },
      ],
    },
    {
      id: 'geo1-p2',
      source: 'Exercise 4.1 · Q1 (ii)',
      type: 'numeric',
      prompt:
        'In $\\Delta ABC$, $AB = 5$, $\\angle B = 70^\\circ$, $BQ = QC = 3$ and $\\angle PQB = 110^\\circ$, where $P$ is on $AC$. Find $x = PQ$.',
      figure: {
        view: [-0.6, -0.7, 6.8, 5.4],
        maxWidth: 320,
        points: { B: [0, 0], Q: [3, 0], C: [6, 0], A: [1.71, 4.7], P: [3.86, 2.35] },
        labelDir: { B: 'sw', Q: 's', C: 'se', A: 'n', P: 'ne' },
        segs: [
          { a: 'A', b: 'B', label: '5', labelSide: 1 },
          { a: 'B', b: 'Q', label: '3', labelSide: -1 },
          { a: 'Q', b: 'C', label: '3', labelSide: -1 },
          { a: 'C', b: 'A' },
          { a: 'Q', b: 'P', label: 'x', labelSide: -1, color: 'accent' },
        ],
        angles: [
          { at: 'B', from: 'Q', to: 'A', label: '70°', r: 24 },
          { at: 'Q', from: 'P', to: 'B', label: '110°', r: 18 },
        ],
      },
      parts: [{ label: '$x =$', answer: { value: 2.5, display: '2.5' } }],
      hints: [
        '$\\angle PQC = 180^\\circ - 110^\\circ = 70^\\circ = \\angle B$. What does that tell you about $PQ$ and $AB$?',
        '$\\Delta CQP \\sim \\Delta CBA$, so $\\tfrac{x}{5} = \\tfrac{CQ}{CB}$.',
      ],
      solution: [
        {
          text: '$\\angle PQC = 70^\\circ = \\angle ABC$ and $\\angle C$ is common, so $\\Delta CQP \\sim \\Delta CBA$ (AA). (So $PQ \\parallel AB$.)',
        },
        {
          math: '\\frac{PQ}{AB} = \\frac{CQ}{CB} \\;\\Rightarrow\\; \\frac{x}{5} = \\frac{3}{6} \\;\\Rightarrow\\; x = 2.5',
        },
      ],
    },
    {
      id: 'geo1-p3',
      source: 'Exercise 4.1 · Q2',
      type: 'numeric',
      prompt:
        'A girl sees the reflection of the top of a lamp post in a mirror on the ground, 6.6 m from the foot of the lamp post. She is 1.25 m tall and stands 2.5 m from the mirror. The girl, mirror and lamp post are in a straight line. Find the height of the lamp post.',
      parts: [{ answer: { value: 3.3, unit: 'm', display: '3.3 m' } }],
      hints: [
        'A mirror reflects at equal angles, so the two right triangles (girl–mirror and lamp post–mirror) are similar.',
      ],
      solution: [
        {
          text: 'The angles of incidence and reflection are equal, and both triangles have a right angle, so they are similar (AA).',
        },
        { math: '\\frac{h}{6.6} = \\frac{1.25}{2.5} \\;\\Rightarrow\\; h = 3.3' },
      ],
    },
    {
      id: 'geo1-p4',
      source: 'Exercise 4.1 · Q3',
      type: 'numeric',
      prompt:
        'A vertical stick 6 m long casts a shadow 400 cm long. At the same time, a tower casts a shadow 28 m long. Find the height of the tower.',
      parts: [{ answer: { value: 42, unit: 'm', display: '42 m' } }],
      hints: ['Write both shadows in metres first: 400 cm = 4 m.'],
      solution: [{ math: '\\frac{h}{28} = \\frac{6}{4} \\;\\Rightarrow\\; h = 42' }],
    },
    {
      id: 'geo1-p5',
      source: 'Exercise 4.1 · Q4',
      type: 'proof',
      prompt:
        'Triangles $QPR$ and $QSR$, right-angled at $P$ and $S$, are drawn on the same base $QR$ and on the same side of it. $PR$ and $SQ$ meet at $T$. Prove that $PT \\times TR = ST \\times TQ$.',
      toProve: '$PT \\times TR = ST \\times TQ$',
      steps: [
        {
          statement: 'In $\\Delta PTQ$ and $\\Delta STR$: $\\angle QPT = \\angle RST = 90^\\circ$',
          reason: 'Given: the triangles are right-angled at $P$ and $S$',
          choices: [
            'Given: the triangles are right-angled at $P$ and $S$',
            'Angles in the same segment',
            'Alternate angles',
          ],
        },
        {
          statement: '$\\angle PTQ = \\angle STR$',
          reason: 'Vertically opposite angles',
          choices: ['Corresponding angles', 'Vertically opposite angles', 'Base angles of an isosceles triangle'],
        },
        { statement: '$\\Delta PTQ \\sim \\Delta STR$', reason: AA, choices: [SAS, AA, SSS] },
        {
          statement: '$\\dfrac{PT}{ST} = \\dfrac{TQ}{TR}$',
          reason: CPST,
          choices: [CPST, 'Basic Proportionality Theorem', 'Angle bisector theorem'],
        },
        { statement: '$PT \\times TR = ST \\times TQ$', reason: 'Cross-multiplying' },
      ],
      solution: [],
    },
    {
      id: 'geo1-p6',
      source: 'Exercise 4.1 · Q5',
      type: 'numeric',
      prompt:
        '$\\Delta ABC$ is right-angled at $C$, and $DE \\perp AB$ with $D$ on $AC$ and $E$ on $AB$. $AD = 3$, $DC = 2$, $BC = 12$. Prove that $\\Delta ABC \\sim \\Delta ADE$, and find $AE$ and $DE$.',
      figure: {
        view: [-12.8, -0.8, 1.2, 5.8],
        maxWidth: 380,
        points: { B: [-12, 0], C: [0, 0], A: [0, 5], D: [0, 2], E: [-1.07, 4.56] },
        labelDir: { B: 'sw', C: 'se', A: 'ne', D: 'e', E: 'n' },
        segs: [
          { a: 'B', b: 'C', label: '12', labelSide: -1 },
          { a: 'C', b: 'D', label: '2', labelSide: -1 },
          { a: 'D', b: 'A', label: '3', labelSide: -1 },
          { a: 'A', b: 'B' },
          { a: 'D', b: 'E', color: 'accent' },
        ],
        right: [
          { at: 'C', a: 'B', b: 'A' },
          { at: 'E', a: 'A', b: 'D' },
        ],
      },
      parts: [
        { label: '$AE =$', answer: { value: 15 / 13, unit: 'cm', display: '15/13 cm' } },
        { label: '$DE =$', answer: { value: 36 / 13, unit: 'cm', display: '36/13 cm' } },
      ],
      hints: [
        '$AC = 5$, so $AB = \\sqrt{5^2 + 12^2} = 13$.',
        '$\\Delta ABC \\sim \\Delta ADE$ (right angles at $C$ and $E$, $\\angle A$ common): $\\tfrac{AE}{AC} = \\tfrac{AD}{AB} = \\tfrac{DE}{BC}$.',
      ],
      solution: [
        {
          text: '$\\angle ACB = \\angle AED = 90^\\circ$ and $\\angle A$ is common, so $\\Delta ABC \\sim \\Delta ADE$ (AA).',
        },
        { text: '$AC = 3 + 2 = 5$, $AB = \\sqrt{25 + 144} = 13$.' },
        {
          math: '\\frac{AE}{AC} = \\frac{AD}{AB} = \\frac{DE}{BC} \\;\\Rightarrow\\; \\frac{AE}{5} = \\frac{3}{13} = \\frac{DE}{12}',
        },
        { math: 'AE = \\frac{15}{13}, \\qquad DE = \\frac{36}{13}' },
      ],
    },
    {
      id: 'geo1-p7',
      source: 'Exercise 4.1 · Q6',
      type: 'numeric',
      prompt:
        '$\\Delta ACB \\sim \\Delta APQ$. If $BC = 8$ cm, $PQ = 4$ cm, $BA = 6.5$ cm and $AP = 2.8$ cm, find $CA$ and $AQ$.',
      parts: [
        { label: '$CA =$', answer: { value: 5.6, unit: 'cm', display: '5.6 cm' } },
        { label: '$AQ =$', answer: { value: 3.25, unit: 'cm', display: '3.25 cm' } },
      ],
      hints: [
        'From the order of letters: $A \\leftrightarrow A$, $C \\leftrightarrow P$, $B \\leftrightarrow Q$. So $\\tfrac{AC}{AP} = \\tfrac{CB}{PQ} = \\tfrac{AB}{AQ}$.',
      ],
      solution: [
        { math: '\\frac{AC}{AP} = \\frac{CB}{PQ} = \\frac{AB}{AQ} = \\frac{8}{4} = 2' },
        { text: '$CA = 2 \\times 2.8 = 5.6$ cm and $AQ = 6.5 \\div 2 = 3.25$ cm.' },
      ],
    },
    {
      id: 'geo1-p8',
      source: 'Exercise 4.1 · Q7 (iii), (iv)',
      type: 'proof',
      prompt:
        'Square $OPRQ$ sits inside right triangle $LMN$ ($\\angle L = 90^\\circ$) with $O$ on $LM$, $P$ on $LN$, and $Q$, $R$ on $MN$. Prove that $\\Delta QMO \\sim \\Delta RPN$ and $QR^2 = MQ \\times RN$.',
      figure: {
        view: [-0.6, -0.8, 9.9, 5.3],
        maxWidth: 380,
        points: { M: [0, 0], N: [9.25, 0], L: [3.33, 4.44], Q: [2.25, 0], R: [5.25, 0], O: [2.25, 3], P: [5.25, 3] },
        labelDir: { M: 'sw', N: 'se', L: 'n', Q: 's', R: 's', O: 'nw', P: 'ne' },
        segs: [
          { a: 'M', b: 'N' },
          { a: 'M', b: 'L' },
          { a: 'L', b: 'N' },
          { a: 'O', b: 'P', color: 'accent' },
          { a: 'O', b: 'Q', color: 'accent' },
          { a: 'P', b: 'R', color: 'accent' },
        ],
        right: [
          { at: 'L', a: 'M', b: 'N' },
          { at: 'Q', a: 'M', b: 'O' },
          { at: 'R', a: 'N', b: 'P' },
        ],
      },
      toProve: '$\\Delta QMO \\sim \\Delta RPN$ and $QR^2 = MQ \\times RN$',
      steps: [
        {
          statement: '$\\angle OQM = \\angle PRN = 90^\\circ$',
          reason: 'Angles of the square $OPRQ$',
          choices: ['Angles of the square $OPRQ$', 'Angle in a semicircle', 'Given $\\angle L = 90^\\circ$'],
        },
        {
          statement: '$\\angle QMO = \\angle RPN$',
          reason: 'Each equals $90^\\circ - \\angle N$, since $\\angle M + \\angle N = 90^\\circ$',
          choices: [
            'Each equals $90^\\circ - \\angle N$, since $\\angle M + \\angle N = 90^\\circ$',
            'Vertically opposite angles',
            'Alternate angles, as $OQ \\parallel PR$',
          ],
        },
        { statement: '$\\Delta QMO \\sim \\Delta RPN$', reason: AA, choices: [AA, SAS, SSS] },
        {
          statement: '$\\dfrac{MQ}{PR} = \\dfrac{QO}{RN}$',
          reason: CPST,
          choices: [CPST, 'Basic Proportionality Theorem', 'Pythagoras theorem'],
        },
        { statement: '$MQ \\times RN = QO \\times PR$', reason: 'Cross-multiplying' },
        {
          statement: '$QR^2 = MQ \\times RN$',
          reason: '$QO = PR = QR$, sides of the square',
          choices: ['$QO = PR = QR$, sides of the square', 'Pythagoras theorem', 'Tangents from a point are equal'],
        },
      ],
      solution: [],
    },
    {
      id: 'geo1-p9',
      source: 'Exercise 4.1 · Q8',
      type: 'numeric',
      prompt:
        '$\\Delta ABC \\sim \\Delta DEF$. The area of $\\Delta ABC$ is 9 cm², the area of $\\Delta DEF$ is 16 cm², and $BC = 2.1$ cm. Find $EF$.',
      parts: [{ label: '$EF =$', answer: { value: 2.8, unit: 'cm', display: '2.8 cm' } }],
      hints: ['$\\tfrac{9}{16} = \\tfrac{BC^2}{EF^2}$, so $\\tfrac{BC}{EF} = \\tfrac34$.'],
      solution: [
        {
          math: '\\frac{BC}{EF} = \\sqrt{\\frac{9}{16}} = \\frac34 \\;\\Rightarrow\\; EF = \\frac{4 \\times 2.1}{3} = 2.8',
        },
      ],
    },
    {
      id: 'geo1-p10',
      source: 'Exercise 4.1 · Q9',
      type: 'numeric',
      prompt:
        'Two vertical poles of heights 6 m and 3 m stand on level ground. The lines from the top of each pole to the foot of the other cross at height $y$. Find $y$.',
      parts: [{ label: '$y =$', answer: { value: 2, unit: 'm', display: '2 m' } }],
      hints: ['Use Example 4.9: $h = \\dfrac{ab}{a+b}$.'],
      solution: [{ math: 'y = \\frac{6 \\times 3}{6 + 3} = \\frac{18}{9} = 2' }],
    },
    {
      id: 'geo1-p11',
      source: 'Progress Check · page 168',
      type: 'mcq',
      prompt: 'Which statement is true?',
      options: [
        'All congruent triangles are similar',
        'All similar triangles are congruent',
        'All rectangles are similar',
        'All isosceles triangles are similar',
      ],
      correct: 0,
      solution: [
        {
          text: 'Congruent triangles are similar with ratio 1. Similar triangles can differ in size. Rectangles can have different shapes (long and thin, or square). Isosceles triangles can have different angles.',
        },
      ],
    },
  ],

  quiz: [
    {
      id: 'geo1-q1',
      type: 'mcq',
      prompt:
        'One triangle has angles $50^\\circ$ and $60^\\circ$. Another has angles $50^\\circ$ and $70^\\circ$. Are they similar?',
      options: [
        'Yes, by AA',
        'No, the second angles differ',
        'Only if their sides are equal',
        'There is not enough information',
      ],
      correct: 0,
      solution: [
        {
          text: 'The third angles are $70^\\circ$ and $60^\\circ$. So both triangles have angles $50^\\circ, 60^\\circ, 70^\\circ$: similar by AA.',
        },
      ],
    },
    {
      id: 'geo1-q2',
      type: 'numeric',
      prompt: '$\\Delta ABC \\sim \\Delta PQR$ with $AB = 4$ cm, $PQ = 6$ cm and $BC = 5$ cm. Find $QR$.',
      parts: [{ answer: { value: 7.5, unit: 'cm', display: '7.5 cm' } }],
      solution: [{ math: '\\frac{QR}{BC} = \\frac{PQ}{AB} = \\frac64 \\;\\Rightarrow\\; QR = 7.5' }],
    },
    {
      id: 'geo1-q3',
      type: 'numeric',
      prompt:
        'Corresponding sides of two similar triangles are in the ratio 3 : 5. The smaller triangle has area 27 cm². Find the area of the larger.',
      parts: [{ answer: { value: 75, unit: 'cm²', display: '75 cm²' } }],
      solution: [{ math: '\\frac{27}{x} = \\frac{9}{25} \\;\\Rightarrow\\; x = 75' }],
    },
    {
      id: 'geo1-q4',
      type: 'mcq',
      prompt: 'The SAS similarity test needs',
      options: [
        'one equal angle, and the two sides including it in proportion',
        'one equal angle and any two sides in proportion',
        'two equal angles and one pair of equal sides',
        'two pairs of sides in proportion',
      ],
      correct: 0,
      solution: [{ text: 'The angle must be the one **between** the two proportional sides.' }],
    },
    {
      id: 'geo1-q5',
      type: 'numeric',
      prompt:
        'A man 1.5 m tall casts a shadow 2 m long. At the same time a building casts a shadow 24 m long. How tall is the building?',
      parts: [{ answer: { value: 18, unit: 'm', display: '18 m' } }],
      solution: [{ math: '\\frac{h}{24} = \\frac{1.5}{2} \\;\\Rightarrow\\; h = 18' }],
    },
    {
      id: 'geo1-q6',
      type: 'numeric',
      prompt:
        'Two similar triangles have perimeters 30 cm and 45 cm. A side of the smaller one is 8 cm. Find the corresponding side of the larger.',
      parts: [{ answer: { value: 12, unit: 'cm', display: '12 cm' } }],
      solution: [{ math: '\\frac{x}{8} = \\frac{45}{30} \\;\\Rightarrow\\; x = 12' }],
    },
    {
      id: 'geo1-q7',
      type: 'numeric',
      prompt:
        'In right triangle $ABC$, right-angled at $B$, $BD \\perp AC$. If $AD = 2$ cm and $DC = 8$ cm, find $BD$.',
      parts: [{ answer: { value: 4, unit: 'cm', display: '4 cm' } }],
      solution: [{ math: 'BD^2 = AD \\times DC = 16 \\;\\Rightarrow\\; BD = 4' }],
    },
    {
      id: 'geo1-q8',
      type: 'mcq',
      prompt: 'Which pair of figures is **always** similar?',
      options: ['Two squares', 'Two rhombuses', 'Two rectangles', 'Two right-angled triangles'],
      correct: 0,
      solution: [
        {
          text: 'All squares have $90^\\circ$ angles and four equal sides, so any two are in proportion. Rhombuses can have different angles; rectangles and right triangles can have different shapes.',
        },
      ],
    },
  ],
}
