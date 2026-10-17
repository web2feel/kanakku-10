import type { Lesson, SceneSpec } from '../types'

const AA = 'AA similarity'
const PYTH = 'Pythagoras theorem'

/** Right angle at A, altitude AD to the hypotenuse BC (Fig 4.46). */
const proofFig: SceneSpec = {
  view: [-0.5, -0.7, 8.5, 4.3],
  maxWidth: 360,
  points: { B: [0, 0], C: [8, 0], A: [2.4, 3.67], D: [2.4, 0] },
  labelDir: { A: 'n', B: 'sw', C: 'se', D: 's' },
  fills: [
    { pts: ['A', 'B', 'D'], tone: 'peach' },
    { pts: ['A', 'D', 'C'], tone: 'sun' },
  ],
  segs: [
    { a: 'A', b: 'B', color: 'opp' },
    { a: 'A', b: 'C', color: 'adj' },
    { a: 'B', b: 'C', color: 'hyp' },
    { a: 'A', b: 'D', kind: 'dash' },
  ],
  right: [
    { at: 'A', a: 'B', b: 'C' },
    { at: 'D', a: 'C', b: 'A' },
  ],
}

export const lesson5: Lesson = {
  id: 'pythagoras',
  number: 5,
  title: 'Pythagoras theorem',
  summary:
    'Why the square on the hypotenuse equals the sum of the squares on the other two sides, its converse, and triplets.',
  pages: '183–188',
  status: 'ready',

  learn: [
    {
      id: 'triplets',
      title: 'Pythagorean triplets',
      blocks: [
        {
          t: 'p',
          text: 'Three natural numbers $(a, b, c)$ form a **Pythagorean triplet** if they can be the sides of a right-angled triangle, that is, if $c^2 = a^2 + b^2$. The smallest is $(3, 4, 5)$: $9 + 16 = 25$.',
        },
        {
          t: 'p',
          text: 'Multiplying a triplet by any number gives another: $(6, 8, 10)$, $(9, 12, 15)$, $(12, 16, 20)$. Others are genuinely new, like $(5, 12, 13)$ and $(8, 15, 17)$.',
        },
        {
          t: 'note',
          tone: 'think',
          title: 'Activity 4',
          text: 'Cut out right triangles with sides $9, 12, 15$ and $12, 16, 20$ (3 and 4 times the 3-4-5 triangle). Put them together along their common side 12: they make one big right triangle with sides $15, 20, 25$. Its hypotenuse $25 = 9 + 16$ shows $15^2 + 20^2 = 25^2$.',
        },
        {
          t: 'note',
          tone: 'history',
          text: 'There are more than 350 known proofs of this theorem; Elisha Loomis’s book *The Pythagorean Proposition* collects 367 of them, including one by US President James Garfield. In India it is also called the **Baudhayana theorem**, after the Sulba Sutras, which state it centuries before Pythagoras.',
        },
      ],
      check: {
        id: 'geo5-c-triplet',
        type: 'mcq',
        prompt: 'Which of these is a Pythagorean triplet?',
        options: ['$(8, 15, 17)$', '$(6, 9, 11)$', '$(4, 5, 6)$', '$(5, 10, 12)$'],
        correct: 0,
        solution: [{ text: '$8^2 + 15^2 = 64 + 225 = 289 = 17^2$. The others fail.' }],
      },
    },
    {
      id: 'theorem',
      title: 'The theorem and a proof by similarity',
      blocks: [
        {
          t: 'p',
          text: '**Theorem 5.** In a right-angled triangle, the square of the hypotenuse is equal to the sum of the squares of the other two sides.',
        },
        { t: 'figure', scene: proofFig, caption: '∠A = 90°, AD ⟂ BC' },
        { t: 'math', tex: '\\angle A = 90^\\circ \\;\\Rightarrow\\; AB^2 + AC^2 = BC^2' },
        {
          t: 'p',
          text: '**Proof idea:** draw $AD \\perp BC$. The two small triangles are each similar to the big one (Lesson 4.1).',
        },
        {
          t: 'list',
          items: [
            '$\\Delta ABC \\sim \\Delta DBA$, so $\\dfrac{AB}{BD} = \\dfrac{BC}{AB}$, giving $AB^2 = BC \\times BD$.',
            '$\\Delta ABC \\sim \\Delta DAC$, so $\\dfrac{BC}{AC} = \\dfrac{AC}{DC}$, giving $AC^2 = BC \\times DC$.',
            'Add: $AB^2 + AC^2 = BC(BD + DC) = BC \\times BC = BC^2$.',
          ],
        },
        {
          t: 'note',
          tone: 'tip',
          text: 'The hypotenuse is the side opposite the right angle, and it is always the longest side. The other two sides are called the **legs**.',
        },
      ],
      check: {
        id: 'geo5-c-theorem',
        type: 'numeric',
        prompt: 'The legs of a right triangle are 9 cm and 12 cm. Find the hypotenuse.',
        parts: [{ answer: { value: 15, unit: 'cm', display: '15 cm' } }],
        solution: [{ math: '\\sqrt{81 + 144} = \\sqrt{225} = 15' }],
      },
    },
    {
      id: 'converse',
      title: 'The converse',
      blocks: [
        {
          t: 'p',
          text: 'If the square of the longest side of a triangle equals the sum of the squares of the other two sides, then the triangle is right-angled (with the right angle opposite the longest side).',
        },
        {
          t: 'p',
          text: 'This is how you **check** for a right angle without measuring it: square the three sides and compare. If the longest side squared is bigger than the sum, the angle opposite it is obtuse; if smaller, acute.',
        },
      ],
      check: {
        id: 'geo5-c-converse',
        type: 'mcq',
        prompt: 'A triangle has sides 7 cm, 24 cm and 25 cm. What kind of triangle is it?',
        options: ['Right-angled', 'Acute-angled', 'Obtuse-angled', 'It cannot exist'],
        correct: 0,
        solution: [{ text: '$7^2 + 24^2 = 49 + 576 = 625 = 25^2$, so by the converse it is right-angled.' }],
      },
    },
    {
      id: 'generate',
      title: 'Making new triplets',
      blocks: [
        {
          t: 'note',
          tone: 'think',
          title: 'Activity 5',
          text: 'Take two consecutive odd numbers, add their reciprocals to get $\\tfrac{p}{q}$, and look at $p$, $q$, $q + 2$. With 3 and 5: $\\tfrac13 + \\tfrac15 = \\tfrac{8}{15}$, giving $(8, 15, 17)$, a triplet.',
        },
        {
          t: 'p',
          text: 'Can all three sides of a right triangle be odd? No: odd² + odd² is even, and an even number cannot be the square of an odd number.',
        },
      ],
      check: {
        id: 'geo5-c-generate',
        type: 'numeric',
        prompt: 'Use Activity 5 with the odd numbers 5 and 7. You get a triplet $(p, q, q + 2)$. What is $q + 2$?',
        parts: [{ answer: { value: 37, display: '37' } }],
        hints: ['$\\tfrac15 + \\tfrac17 = \\tfrac{12}{35}$'],
        solution: [
          { text: '$\\tfrac15 + \\tfrac17 = \\tfrac{12}{35}$, so the triplet is $(12, 35, 37)$.' },
          { math: '12^2 + 35^2 = 144 + 1225 = 1369 = 37^2' },
        ],
      },
    },
  ],

  explore: [
    {
      widget: 'pythagoras-lab',
      title: 'Squares on the sides',
      intro:
        'Drag $A$ and $B$ to change the two sides. Each square’s area is shown inside it. Then change the angle at $C$ and watch the converse at work.',
      tryThis: [
        'Press each triplet button. Do the two small areas always add up to the big one?',
        'Make the angle at $C$ obtuse. Which is bigger now: $AB^2$ or $CA^2 + CB^2$?',
        'Make a right triangle with sides 3.5 and 6. Is the hypotenuse a whole number?',
      ],
    },
  ],

  examples: [
    {
      id: 'geo5-ex20',
      source: 'Example 4.20',
      title: 'The insect and the lamp post',
      prompt:
        'An insect 8 m from the foot of a 6 m lamp post crawls towards it. When its distance from the top of the lamp post equals the distance it has moved, how far is it from the foot of the lamp post?',
      figure: {
        view: [-0.6, -0.8, 8.8, 6.8],
        ground: true,
        maxWidth: 340,
        objects: [{ type: 'pole', at: [0, 0], h: 6 }],
        points: { A: [0, 6], B: [0, 0], C: [1.75, 0], D: [8, 0] },
        labelDir: { A: 'ne', B: 'sw', C: 's', D: 's' },
        segs: [
          { a: 'A', b: 'B', label: '6 m', labelSide: 1 },
          { id: 'ac', a: 'A', b: 'C', label: 'x', labelSide: -1, color: 'hyp' },
          { id: 'bc', a: 'B', b: 'C', label: '8 − x', labelSide: -1, color: 'adj' },
          { id: 'cd', a: 'C', b: 'D', label: 'x', labelSide: -1, kind: 'dash' },
        ],
        right: [{ at: 'B', a: 'A', b: 'D' }],
      },
      steps: [
        { text: 'Let the insect move $x$ m to $C$. Then $AC = CD = x$ and $BC = 8 - x$.', highlight: ['ac', 'cd'] },
        { text: 'In right triangle $ABC$ (right angle at $B$):', highlight: ['ac', 'bc'] },
        { math: 'x^2 = 6^2 + (8 - x)^2 = 36 + 64 - 16x + x^2' },
        { math: '16x = 100 \\;\\Rightarrow\\; x = 6.25' },
        { math: 'BC = 8 - 6.25 = 1.75' },
      ],
      answer: 'The insect is 1.75 m from the foot of the lamp post.',
    },
    {
      id: 'geo5-ex21',
      source: 'Example 4.21',
      title: 'Midpoints and a neat identity',
      prompt:
        '$P$ and $Q$ are the midpoints of sides $CA$ and $CB$ of $\\Delta ABC$, right-angled at $C$. Prove that $4(AQ^2 + BP^2) = 5AB^2$.',
      figure: {
        view: [-0.6, -0.7, 6.8, 6.6],
        maxWidth: 260,
        points: { C: [6, 0], B: [0, 0], A: [6, 6], P: [6, 3], Q: [3, 0] },
        labelDir: { C: 'se', B: 'sw', A: 'n', P: 'e', Q: 's' },
        segs: [
          { a: 'A', b: 'B' },
          { a: 'B', b: 'C' },
          { a: 'C', b: 'A' },
          { a: 'A', b: 'Q', kind: 'dash', color: 'opp' },
          { a: 'B', b: 'P', color: 'adj' },
        ],
        right: [{ at: 'C', a: 'B', b: 'A' }],
      },
      steps: [
        { text: 'Three right triangles share the right angle at $C$:' },
        { math: 'AQ^2 = AC^2 + QC^2 \\;(1), \\quad BP^2 = BC^2 + CP^2 \\;(2), \\quad AB^2 = AC^2 + BC^2 \\;(3)' },
        { math: '4(AQ^2 + BP^2) = 4AC^2 + 4QC^2 + 4BC^2 + 4CP^2' },
        { text: '$Q$ and $P$ are midpoints, so $2QC = BC$ and $2CP = AC$, giving $4QC^2 = BC^2$ and $4CP^2 = AC^2$.' },
        { math: '= 4AC^2 + BC^2 + 4BC^2 + AC^2 = 5(AC^2 + BC^2) = 5AB^2' },
      ],
      answer: '$4(AQ^2 + BP^2) = 5AB^2$',
    },
    {
      id: 'geo5-ex22',
      source: 'Example 4.22',
      title: 'How long a ladder?',
      prompt:
        'What length of ladder is needed to reach 7 ft up a wall when its base is 4 ft from the wall? Round up to the next tenth.',
      steps: [
        { math: 'x^2 = 7^2 + 4^2 = 49 + 16 = 65 \\;\\Rightarrow\\; x = \\sqrt{65}' },
        { text: '$\\sqrt{65}$ is between 8 and 8.1, because $8^2 = 64 < 65 < 65.61 = 8.1^2$.' },
      ],
      answer: 'About 8.1 ft.',
    },
    {
      id: 'geo5-ex23',
      source: 'Example 4.23',
      title: 'Two aeroplanes',
      prompt:
        'An aeroplane takes off and flies due north at 1000 km/h. At the same time another takes off from the same airport and flies due west at 1200 km/h. How far apart are they after $1\\tfrac12$ hours?',
      steps: [
        {
          text: 'Distances after 1.5 hours: north $OA = 1000 \\times 1.5 = 1500$ km; west $OB = 1200 \\times 1.5 = 1800$ km.',
        },
        { text: 'North and west are at right angles, so $AB$ is the hypotenuse.' },
        { math: 'AB^2 = 1500^2 + 1800^2 = 100^2(15^2 + 18^2) = 100^2 \\times 549 = 100^2 \\times 9 \\times 61' },
        { math: 'AB = 100 \\times 3 \\times \\sqrt{61} = 300\\sqrt{61}' },
      ],
      answer: '$300\\sqrt{61}$ km, about 2343 km.',
    },
  ],

  practice: [
    {
      id: 'geo5-p-thm5',
      source: 'Theorem 5',
      type: 'proof',
      prompt: 'Prove Pythagoras theorem.',
      figure: proofFig,
      given: 'In $\\Delta ABC$, $\\angle A = 90^\\circ$.',
      toProve: '$AB^2 + AC^2 = BC^2$',
      construction: 'Draw $AD \\perp BC$.',
      steps: [
        {
          statement:
            'In $\\Delta ABC$ and $\\Delta DBA$: $\\angle B$ is common and $\\angle BAC = \\angle BDA = 90^\\circ$',
          reason: 'Given, and by construction',
          choices: ['Given, and by construction', 'Vertically opposite angles', 'Angles in the same segment'],
        },
        { statement: '$\\Delta ABC \\sim \\Delta DBA$', reason: AA, choices: [AA, 'SAS similarity', 'SSS similarity'] },
        {
          statement: '$\\dfrac{AB}{BD} = \\dfrac{BC}{AB}$, so $AB^2 = BC \\times BD$ … (1)',
          reason: 'Corresponding sides of similar triangles are proportional',
          choices: [
            'Corresponding sides of similar triangles are proportional',
            'Basic Proportionality Theorem',
            'Tangents from a point are equal',
          ],
        },
        { statement: '$\\Delta ABC \\sim \\Delta DAC$ ($\\angle C$ common, right angles at $A$ and $D$)', reason: AA },
        {
          statement: '$\\dfrac{BC}{AC} = \\dfrac{AC}{DC}$, so $AC^2 = BC \\times DC$ … (2)',
          reason: 'Corresponding sides of similar triangles are proportional',
        },
        {
          statement: '$AB^2 + AC^2 = BC(BD + DC) = BC \\times BC = BC^2$',
          reason: 'Adding (1) and (2); $BD + DC = BC$',
          choices: ['Adding (1) and (2); $BD + DC = BC$', 'Multiplying (1) and (2)', 'Converse of Pythagoras theorem'],
        },
      ],
      solution: [],
    },
    {
      id: 'geo5-p1',
      source: 'Exercise 4.3 · Q1',
      type: 'numeric',
      prompt: 'A man goes 18 m due east and then 24 m due north. How far is he from his starting point?',
      parts: [{ answer: { value: 30, unit: 'm', display: '30 m' } }],
      solution: [{ math: '\\sqrt{18^2 + 24^2} = \\sqrt{324 + 576} = \\sqrt{900} = 30' }],
    },
    {
      id: 'geo5-p2',
      source: 'Exercise 4.3 · Q2',
      type: 'numeric',
      prompt:
        'From Sarah’s house to James’ house, one way is to take B street (1.5 miles) and then A street (2 miles), which meet at a right angle. The other way is the direct C street. How much shorter is C street?',
      parts: [{ answer: { value: 1, unit: 'mile', display: '1 mile' } }],
      hints: ['C street is the hypotenuse of a right triangle with legs 1.5 and 2.'],
      solution: [
        { math: 'C = \\sqrt{1.5^2 + 2^2} = \\sqrt{2.25 + 4} = \\sqrt{6.25} = 2.5' },
        { text: 'B and A streets together are $1.5 + 2 = 3.5$ miles. C street saves $3.5 - 2.5 = 1$ mile.' },
      ],
    },
    {
      id: 'geo5-p3',
      source: 'Exercise 4.3 · Q3',
      type: 'numeric',
      prompt:
        'To get from point $A$ to point $B$ you must walk around a pond: 34 m south and then 41 m east. How many metres would be saved if you could walk straight through the pond?',
      parts: [{ answer: { value: 21.74, unit: 'm', display: '21.74 m (about 22 m)', tol: 0.3 } }],
      solution: [
        { math: 'AB = \\sqrt{34^2 + 41^2} = \\sqrt{1156 + 1681} = \\sqrt{2837} \\approx 53.26' },
        { text: 'Saving: $75 - 53.26 \\approx 21.74$ m, about 22 m to the nearest metre.' },
      ],
    },
    {
      id: 'geo5-p4',
      source: 'Exercise 4.3 · Q4',
      type: 'numeric',
      prompt:
        'In rectangle $WXYZ$, $XY + YZ = 17$ cm and $XZ + YW = 26$ cm. Find the length and breadth of the rectangle.',
      parts: [
        { label: 'Length:', answer: { value: 12, unit: 'cm', display: '12 cm' } },
        { label: 'Breadth:', answer: { value: 5, unit: 'cm', display: '5 cm' } },
      ],
      hints: [
        'The diagonals of a rectangle are equal, so each is 13 cm.',
        'If the sides are $l$ and $b$: $l + b = 17$ and $l^2 + b^2 = 169$.',
      ],
      solution: [
        { text: 'Each diagonal is $26 \\div 2 = 13$ cm. With sides $l$ and $b$: $l + b = 17$, $l^2 + b^2 = 169$.' },
        { math: '2lb = (l + b)^2 - (l^2 + b^2) = 289 - 169 = 120 \\;\\Rightarrow\\; lb = 60' },
        { text: 'Two numbers with sum 17 and product 60: 12 and 5.' },
      ],
    },
    {
      id: 'geo5-p5',
      source: 'Exercise 4.3 · Q5',
      type: 'numeric',
      prompt:
        'The hypotenuse of a right triangle is 6 m more than twice the shortest side. The third side is 2 m less than the hypotenuse. Find the sides.',
      parts: [
        { label: 'Shortest side:', answer: { value: 10, unit: 'm', display: '10 m' } },
        { label: 'Third side:', answer: { value: 24, unit: 'm', display: '24 m' } },
        { label: 'Hypotenuse:', answer: { value: 26, unit: 'm', display: '26 m' } },
      ],
      hints: ['Shortest side $x$, hypotenuse $2x + 6$, third side $2x + 4$.'],
      solution: [
        { math: 'x^2 + (2x + 4)^2 = (2x + 6)^2 \\;\\Rightarrow\\; x^2 + 4x^2 + 16x + 16 = 4x^2 + 24x + 36' },
        { math: 'x^2 - 8x - 20 = 0 \\;\\Rightarrow\\; (x - 10)(x + 2) = 0 \\;\\Rightarrow\\; x = 10' },
        { text: 'Sides: 10 m, 24 m, 26 m.' },
      ],
    },
    {
      id: 'geo5-p6',
      source: 'Exercise 4.3 · Q6',
      type: 'numeric',
      prompt:
        'A 5 m ladder leans against a vertical wall and reaches 4 m up. If its foot is moved 1.6 m towards the wall, how far up the wall does the top slide?',
      parts: [{ answer: { value: 0.8, unit: 'm', display: '0.8 m' } }],
      hints: ['At first the foot is $\\sqrt{25 - 16} = 3$ m from the wall. After moving, it is 1.4 m away.'],
      solution: [
        { text: 'Foot to wall at first: $\\sqrt{5^2 - 4^2} = 3$ m. After moving: $3 - 1.6 = 1.4$ m.' },
        { math: '\\text{new height} = \\sqrt{25 - 1.96} = \\sqrt{23.04} = 4.8' },
        { text: 'The top slides up $4.8 - 4 = 0.8$ m.' },
      ],
    },
    {
      id: 'geo5-p7',
      source: 'Exercise 4.3 · Q7',
      type: 'proof',
      prompt:
        'The perpendicular $PS$ on the base $QR$ of $\\Delta PQR$ meets $QR$ at $S$, with $QS = 3\\,SR$. Prove that $2PQ^2 = 2PR^2 + QR^2$.',
      toProve: '$2PQ^2 = 2PR^2 + QR^2$',
      steps: [
        {
          statement: '$PQ^2 = PS^2 + QS^2$ and $PR^2 = PS^2 + SR^2$',
          reason: PYTH + ' in $\\Delta PSQ$ and $\\Delta PSR$',
          choices: [PYTH + ' in $\\Delta PSQ$ and $\\Delta PSR$', 'AA similarity', 'Basic Proportionality Theorem'],
        },
        {
          statement: '$PQ^2 - PR^2 = QS^2 - SR^2 = 9SR^2 - SR^2 = 8SR^2$',
          reason: 'Subtracting, and $QS = 3SR$',
          choices: ['Subtracting, and $QS = 3SR$', 'Adding the two equations', 'Converse of Pythagoras theorem'],
        },
        { statement: '$QR = QS + SR = 4SR$, so $QR^2 = 16SR^2$', reason: '$S$ lies on $QR$' },
        {
          statement: '$PQ^2 - PR^2 = \\tfrac12 QR^2$, so $2PQ^2 = 2PR^2 + QR^2$',
          reason: '$8SR^2$ is half of $16SR^2$',
          choices: ['$8SR^2$ is half of $16SR^2$', 'Cross-multiplying', 'Angle bisector theorem'],
        },
      ],
      solution: [],
    },
    {
      id: 'geo5-p8',
      source: 'Exercise 4.3 · Q8',
      type: 'proof',
      prompt: '$ABC$ is right-angled at $B$, and points $D$, $E$ trisect $BC$. Prove that $8AE^2 = 3AC^2 + 5AD^2$.',
      figure: {
        view: [-0.6, -0.7, 6.6, 6.6],
        maxWidth: 260,
        points: { A: [0, 6], B: [0, 0], D: [2, 0], E: [4, 0], C: [6, 0] },
        labelDir: { A: 'nw', B: 'sw', D: 's', E: 's', C: 'se' },
        segs: [
          { a: 'A', b: 'B' },
          { a: 'B', b: 'D', ticks: 1 },
          { a: 'D', b: 'E', ticks: 1 },
          { a: 'E', b: 'C', ticks: 1 },
          { a: 'A', b: 'C', color: 'hyp' },
          { a: 'A', b: 'D', color: 'opp' },
          { a: 'A', b: 'E', color: 'adj' },
        ],
        right: [{ at: 'B', a: 'C', b: 'A' }],
      },
      toProve: '$8AE^2 = 3AC^2 + 5AD^2$',
      steps: [
        { statement: 'Let $BD = DE = EC = k$, so $BE = 2k$ and $BC = 3k$', reason: '$D$ and $E$ trisect $BC$' },
        {
          statement: '$AD^2 = AB^2 + k^2$, $AE^2 = AB^2 + 4k^2$, $AC^2 = AB^2 + 9k^2$',
          reason: PYTH + ' in the right triangles at $B$',
          choices: [PYTH + ' in the right triangles at $B$', 'AA similarity', 'Angle bisector theorem'],
        },
        {
          statement: '$3AC^2 + 5AD^2 = 3AB^2 + 27k^2 + 5AB^2 + 5k^2 = 8AB^2 + 32k^2$',
          reason: 'Substituting and adding',
        },
        {
          statement: '$8AB^2 + 32k^2 = 8(AB^2 + 4k^2) = 8AE^2$',
          reason: 'Taking out 8, and using $AE^2 = AB^2 + 4k^2$',
          choices: [
            'Taking out 8, and using $AE^2 = AB^2 + 4k^2$',
            'Converse of Pythagoras theorem',
            'Cross-multiplying',
          ],
        },
      ],
      solution: [],
    },
    {
      id: 'geo5-p-pc',
      source: 'Progress Check · page 187',
      type: 'mcq',
      prompt: 'True or false: Pythagoras theorem applies to all triangles.',
      options: [
        'False: it applies only to right-angled triangles',
        'True',
        'True, if the triangle is isosceles',
        'False: it applies only to equilateral triangles',
      ],
      correct: 0,
      solution: [
        {
          text: 'For acute or obtuse triangles the square of the longest side is less or more than the sum of the other two squares.',
        },
      ],
    },
  ],

  quiz: [
    {
      id: 'geo5-q1',
      type: 'numeric',
      prompt: 'The hypotenuse of a right triangle is 13 cm and one leg is 5 cm. Find the other leg.',
      parts: [{ answer: { value: 12, unit: 'cm', display: '12 cm' } }],
      solution: [{ math: '\\sqrt{169 - 25} = \\sqrt{144} = 12' }],
    },
    {
      id: 'geo5-q2',
      type: 'mcq',
      prompt: 'Sides 6 cm, 8 cm and 11 cm form a triangle that is',
      options: ['obtuse-angled', 'right-angled', 'acute-angled', 'impossible'],
      correct: 0,
      solution: [
        {
          text: '$6^2 + 8^2 = 100 < 121 = 11^2$: the longest side is too long for a right angle, so the angle opposite it is obtuse.',
        },
      ],
    },
    {
      id: 'geo5-q3',
      type: 'numeric',
      prompt: 'A square has a diagonal of $10\\sqrt2$ cm. Find its side.',
      parts: [{ answer: { value: 10, unit: 'cm', display: '10 cm' } }],
      solution: [{ math: 's^2 + s^2 = (10\\sqrt2)^2 = 200 \\;\\Rightarrow\\; s = 10' }],
    },
    {
      id: 'geo5-q4',
      type: 'mcq',
      prompt: 'In a right triangle, the two acute angles add up to',
      options: ['$90^\\circ$', '$180^\\circ$', '$60^\\circ$', 'it depends on the triangle'],
      correct: 0,
      solution: [{ text: 'The three angles add to $180^\\circ$ and one is $90^\\circ$.' }],
    },
    {
      id: 'geo5-q5',
      type: 'numeric',
      prompt: 'A 10 m ladder reaches a window 8 m above the ground. How far is the foot of the ladder from the wall?',
      parts: [{ answer: { value: 6, unit: 'm', display: '6 m' } }],
      solution: [{ math: '\\sqrt{100 - 64} = 6' }],
    },
    {
      id: 'geo5-q6',
      type: 'mcq',
      prompt: 'Which is **not** a Pythagorean triplet?',
      options: ['$(7, 23, 25)$', '$(20, 21, 29)$', '$(9, 40, 41)$', '$(12, 35, 37)$'],
      correct: 0,
      solution: [{ text: '$7^2 + 23^2 = 49 + 529 = 578 \\ne 625$. The other three work.' }],
    },
    {
      id: 'geo5-q7',
      type: 'numeric',
      prompt: 'A rectangle is 15 cm long and 8 cm wide. How long is its diagonal?',
      parts: [{ answer: { value: 17, unit: 'cm', display: '17 cm' } }],
      solution: [{ math: '\\sqrt{225 + 64} = \\sqrt{289} = 17' }],
    },
    {
      id: 'geo5-q8',
      type: 'mcq',
      prompt: 'In the similarity proof of Pythagoras theorem, the line drawn from the right-angle vertex is',
      options: [
        'perpendicular to the hypotenuse',
        'the median to the hypotenuse',
        'parallel to a leg',
        'the bisector of the right angle',
      ],
      correct: 0,
      solution: [{ text: '$AD \\perp BC$ splits the triangle into two triangles similar to the original.' }],
    },
  ],
}
