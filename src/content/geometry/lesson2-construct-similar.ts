import type { Lesson } from '../types'

const selfCheck = 'Draw it in your notebook, then step through the construction here to compare.'

export const lesson2: Lesson = {
  id: 'construct-similar',
  number: 2,
  title: 'Constructing similar triangles',
  summary: 'Draw a triangle whose sides are a given fraction of another triangle’s sides, smaller or larger.',
  pages: '168–171',
  status: 'ready',

  learn: [
    {
      id: 'scale-factor',
      title: 'Scale factor',
      blocks: [
        {
          t: 'p',
          text: 'The **scale factor** is the ratio of each side of the new triangle to the matching side of the given one. If the scale factor is $\\tfrac35$, every side of the new triangle is $\\tfrac35$ of its partner.',
        },
        {
          t: 'list',
          items: [
            'Scale factor **less than 1** (like $\\tfrac35$): the new triangle is smaller.',
            'Scale factor **more than 1** (like $\\tfrac74$): the new triangle is larger.',
          ],
        },
        {
          t: 'p',
          text: 'In both cases the new triangle shares the vertex $Q$ with $\\Delta PQR$ and lies along the same two sides, so we only need to find the new positions of $R$ and $P$.',
        },
      ],
      check: {
        id: 'geo2-c-scale',
        type: 'numeric',
        prompt:
          "A triangle is built on $\\Delta PQR$ with scale factor $\\tfrac35$. If $QR = 10$ cm, how long is $QR'$?",
        parts: [{ answer: { value: 6, unit: 'cm', display: '6 cm' } }],
        solution: [{ math: "QR' = \\tfrac35 \\times 10 = 6 \\text{ cm}" }],
      },
    },
    {
      id: 'why',
      title: 'Why the method works',
      blocks: [
        {
          t: 'p',
          text: 'We cannot measure $\\tfrac35$ of a side directly with a ruler and compasses. Instead we mark 5 equal steps along a spare ray $QX$, and use parallel lines to copy the ratio across:',
        },
        {
          t: 'list',
          ordered: true,
          items: [
            "Join $Q_5R$. The line through $Q_3$ parallel to $Q_5R$ meets $QR$ at $R'$. By the Basic Proportionality Theorem (Lesson 4.3), $\\tfrac{QR'}{QR} = \\tfrac{QQ_3}{QQ_5} = \\tfrac35$.",
            "The line through $R'$ parallel to $RP$ meets $QP$ at $P'$. Parallel lines make equal corresponding angles, so $\\Delta P'QR' \\sim \\Delta PQR$ by AA, with ratio $\\tfrac35$.",
          ],
        },
        {
          t: 'note',
          tone: 'tip',
          text: 'Draw parallel lines by copying an angle with your compasses, or by sliding a set square along a ruler.',
        },
      ],
      check: {
        id: 'geo2-c-why',
        type: 'mcq',
        prompt: "Why is $\\Delta P'QR'$ similar to $\\Delta PQR$?",
        options: [
          "$R'P' \\parallel RP$, so the corresponding angles are equal (AA)",
          'All the sides were measured with a ruler',
          'The points on $QX$ are equally spaced (SSS)',
          'Both triangles have a right angle',
        ],
        correct: 0,
        solution: [
          {
            text: "$\\angle Q$ is common, and $\\angle QR'P' = \\angle QRP$ because $R'P' \\parallel RP$. Two equal angles: AA.",
          },
        ],
      },
    },
    {
      id: 'smaller',
      title: 'Scale factor less than 1',
      blocks: [
        { t: 'p', text: 'For scale factor $\\tfrac{m}{n}$ with $m < n$ (say $\\tfrac35$):' },
        {
          t: 'list',
          ordered: true,
          items: [
            'Draw any $\\Delta PQR$.',
            'Draw a ray $QX$ making an acute angle with $QR$, on the side away from $P$.',
            'Mark $n$ equal steps $Q_1, Q_2, \\ldots, Q_n$ on $QX$ ($n$ = the larger number, 5).',
            "Join $Q_nR$. Through $Q_m$ ($m$ = the smaller number, 3) draw a line parallel to $Q_nR$, meeting $QR$ at $R'$.",
            "Through $R'$ draw a line parallel to $RP$, meeting $QP$ at $P'$. $\\Delta P'QR'$ is the required triangle.",
          ],
        },
      ],
      check: {
        id: 'geo2-c-small',
        type: 'mcq',
        prompt:
          'For scale factor $\\tfrac47$, which segment do you join, and through which point do you draw the parallel?',
        options: [
          'Join $Q_7R$; draw the parallel through $Q_4$',
          'Join $Q_4R$; draw the parallel through $Q_7$',
          'Join $Q_3R$; draw the parallel through $Q_4$',
          'Join $Q_7P$; draw the parallel through $Q_4$',
        ],
        correct: 0,
        solution: [
          {
            text: 'Mark 7 points (the larger number). Join the last one, $Q_7$, to $R$, and draw the parallel through $Q_4$.',
          },
        ],
      },
    },
    {
      id: 'larger',
      title: 'Scale factor more than 1',
      blocks: [
        {
          t: 'p',
          text: 'For $\\tfrac{m}{n}$ with $m > n$ (say $\\tfrac74$), the steps are the same, but the new points land beyond the old triangle:',
        },
        {
          t: 'list',
          ordered: true,
          items: [
            'Mark 7 equal steps on $QX$ (7 is the larger number).',
            "Join $Q_4R$ (4, the smaller number). Through $Q_7$ draw a line parallel to $Q_4R$, meeting $QR$ **extended** at $R'$.",
            "Through $R'$ draw a line parallel to $RP$, meeting $QP$ **extended** at $P'$.",
          ],
        },
        {
          t: 'note',
          tone: 'tip',
          text: 'In both cases: join the point numbered by the **denominator** to $R$, and draw the parallel through the point numbered by the **numerator**.',
        },
      ],
      check: {
        id: 'geo2-c-large',
        type: 'mcq',
        prompt: "For scale factor $\\tfrac65$, where does $R'$ lie?",
        options: ['$QR$ extended beyond $R$', 'Between $Q$ and $R$', 'On $QX$', 'On $QP$'],
        correct: 0,
        solution: [
          { text: "The scale factor is more than 1, so $QR' = \\tfrac65 QR$ is longer than $QR$: $R'$ is beyond $R$." },
        ],
      },
    },
  ],

  explore: [
    {
      widget: 'construction-similar',
      title: 'Construction player',
      intro:
        'Choose a scale factor and step through the construction. The newest lines are drawn in coral. Try a factor less than 1 and one more than 1.',
      tryThis: [
        "Use 3 and 5, then 7 and 4: compare where $R'$ lands.",
        'Use 1 and 2. Which point on $QR$ do you get?',
        'Pick "√n by a semicircle" and make $\\sqrt3$ and $\\sqrt5$ (Activity 1).',
      ],
    },
  ],

  examples: [
    {
      id: 'geo2-ex10',
      source: 'Example 4.10',
      title: 'Scale factor 3/5 (smaller)',
      prompt:
        'Construct a triangle similar to a given triangle $PQR$ with its sides equal to $\\tfrac35$ of the corresponding sides of $\\Delta PQR$.',
      construction: { kind: 'similar', num: 3, den: 5 },
      steps: [],
      answer: "$\\Delta P'QR'$, with each side $\\tfrac35$ of the matching side of $\\Delta PQR$.",
    },
    {
      id: 'geo2-ex11',
      source: 'Example 4.11',
      title: 'Scale factor 7/4 (larger)',
      prompt:
        'Construct a triangle similar to a given triangle $PQR$ with its sides equal to $\\tfrac74$ of the corresponding sides of $\\Delta PQR$.',
      construction: { kind: 'similar', num: 7, den: 4 },
      steps: [],
      answer: "$\\Delta P'QR'$, with each side $\\tfrac74$ of the matching side of $\\Delta PQR$.",
    },
    {
      id: 'geo2-act1',
      source: 'Activity 1',
      title: 'A segment of length √2',
      prompt: 'Construct a line segment of length $\\sqrt2$ units.',
      construction: { kind: 'root', n: 2 },
      steps: [],
      answer: '$CP = \\sqrt2$ units. Taking $AC = 3, 5, 8$ instead gives $\\sqrt3$, $\\sqrt5$, $\\sqrt8$.',
    },
  ],

  practice: [
    {
      id: 'geo2-p10',
      source: 'Exercise 4.1 · Q10',
      type: 'construct',
      prompt:
        'Construct a triangle similar to a given triangle $PQR$ with its sides equal to $\\tfrac23$ of the corresponding sides (scale factor $\\tfrac23 < 1$).',
      construction: { kind: 'similar', num: 2, den: 3 },
      hints: ['Mark 3 points on $QX$. Join $Q_3R$; draw the parallel through $Q_2$.'],
      solution: [],
    },
    {
      id: 'geo2-p11',
      source: 'Exercise 4.1 · Q11',
      type: 'construct',
      prompt:
        'Construct a triangle similar to a given triangle $LMN$ with its sides equal to $\\tfrac45$ of the corresponding sides (scale factor $\\tfrac45 < 1$).',
      construction: { kind: 'similar', num: 4, den: 5, names: ['L', 'M', 'N'] },
      hints: ['Here the shared vertex is $M$. Mark 5 points on $MX$; join $M_5N$; draw the parallel through $M_4$.'],
      solution: [],
    },
    {
      id: 'geo2-p12',
      source: 'Exercise 4.1 · Q12',
      type: 'construct',
      prompt:
        'Construct a triangle similar to a given triangle $ABC$ with its sides equal to $\\tfrac65$ of the corresponding sides (scale factor $\\tfrac65 > 1$).',
      construction: { kind: 'similar', num: 6, den: 5, names: ['A', 'B', 'C'] },
      hints: ['Mark 6 points on $BX$. Join $B_5C$; through $B_6$ draw the parallel, meeting $BC$ extended.'],
      solution: [],
    },
    {
      id: 'geo2-p13',
      source: 'Exercise 4.1 · Q13',
      type: 'construct',
      prompt:
        'Construct a triangle similar to a given triangle $PQR$ with its sides equal to $\\tfrac73$ of the corresponding sides (scale factor $\\tfrac73 > 1$).',
      construction: { kind: 'similar', num: 7, den: 3 },
      hints: ['Mark 7 points. Join $Q_3R$; through $Q_7$ draw the parallel, meeting $QR$ extended.'],
      solution: [],
    },
    {
      id: 'geo2-p-sides',
      source: 'Practice',
      type: 'numeric',
      prompt:
        "$\\Delta PQR$ has $PQ = 6$ cm, $QR = 7.5$ cm, $RP = 4.5$ cm. You construct $\\Delta P'QR'$ with scale factor $\\tfrac23$. Find its sides.",
      parts: [
        { label: "$P'Q =$", answer: { value: 4, unit: 'cm', display: '4 cm' } },
        { label: "$QR' =$", answer: { value: 5, unit: 'cm', display: '5 cm' } },
        { label: "$R'P' =$", answer: { value: 3, unit: 'cm', display: '3 cm' } },
      ],
      solution: [{ text: 'Multiply each side by $\\tfrac23$: $6 \\to 4$, $7.5 \\to 5$, $4.5 \\to 3$.' }],
    },
    {
      id: 'geo2-p-area',
      source: 'Practice',
      type: 'numeric',
      prompt:
        'A triangle of area 16 cm² is enlarged with scale factor $\\tfrac32$. What is the area of the new triangle?',
      parts: [{ answer: { value: 36, unit: 'cm²', display: '36 cm²' } }],
      hints: ['Areas scale by the square of the scale factor.'],
      solution: [{ math: '16 \\times \\left(\\tfrac32\\right)^2 = 16 \\times \\tfrac94 = 36' }],
    },
    {
      id: 'geo2-p-root3',
      source: 'Activity 1',
      type: 'construct',
      prompt: 'Construct a line segment of length $\\sqrt3$ units. ' + selfCheck,
      construction: { kind: 'root', n: 3 },
      measure: [
        { label: 'Measure $CP$:', answer: { value: Math.sqrt(3), unit: 'units', display: '≈ 1.73 units', tol: 0.08 } },
      ],
      hints: ['Take $AC = 3$ and $CB = 1$, so $AB = 4$.'],
      solution: [],
    },
  ],

  quiz: [
    {
      id: 'geo2-q1',
      type: 'mcq',
      prompt: 'For scale factor $\\tfrac58$, how many equal points do you mark on the ray $QX$?',
      options: ['8', '5', '3', '13'],
      correct: 0,
      solution: [{ text: 'Mark as many points as the larger of the two numbers: 8.' }],
    },
    {
      id: 'geo2-q2',
      type: 'mcq',
      prompt: 'For scale factor $\\tfrac58$, through which point do you draw the line parallel to $Q_8R$?',
      options: ['$Q_5$', '$Q_8$', '$Q_3$', '$Q_1$'],
      correct: 0,
      solution: [{ text: 'Through the point numbered by the numerator, $Q_5$.' }],
    },
    {
      id: 'geo2-q3',
      type: 'mcq',
      prompt: 'With a scale factor of $\\tfrac94$, the new triangle is',
      options: [
        'larger than the given triangle',
        'smaller than the given triangle',
        'congruent to it',
        'not similar to it',
      ],
      correct: 0,
      solution: [{ text: '$\\tfrac94 > 1$, so every side is longer.' }],
    },
    {
      id: 'geo2-q4',
      type: 'numeric',
      prompt:
        'The given triangle has perimeter 24 cm. What is the perimeter of a similar triangle constructed with scale factor $\\tfrac34$?',
      parts: [{ answer: { value: 18, unit: 'cm', display: '18 cm' } }],
      solution: [{ math: '24 \\times \\tfrac34 = 18' }],
    },
    {
      id: 'geo2-q5',
      type: 'numeric',
      prompt:
        'To construct $\\sqrt5$ by the semicircle method, you take $AC = 5$ and $CB = 1$. How long is the diameter $AB$?',
      parts: [{ answer: { value: 6, unit: 'units', display: '6 units' } }],
      solution: [
        { text: '$AB = AC + CB = 6$. The perpendicular at $C$ then has length $\\sqrt{5 \\times 1} = \\sqrt5$.' },
      ],
    },
    {
      id: 'geo2-q6',
      type: 'mcq',
      prompt: "Which theorem guarantees that $\\tfrac{QR'}{QR} = \\tfrac{QQ_3}{QQ_5}$ in the construction?",
      options: ['Basic Proportionality Theorem', 'Pythagoras theorem', 'Alternate segment theorem', 'Ceva’s theorem'],
      correct: 0,
      solution: [
        {
          text: "$Q_3R' \\parallel Q_5R$, so in $\\Delta QQ_5R$ the parallel line divides the two sides in the same ratio (BPT).",
        },
      ],
    },
  ],
}
