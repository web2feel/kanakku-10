import type { Lesson, SceneSpec } from '../types'

/** Several triangles on the same base AB, all with the same vertical angle, sitting on one arc. */
const sameArc: SceneSpec = {
  view: [-0.6, -1.1, 6.6, 6.2],
  maxWidth: 320,
  points: { A: [0, 0], B: [6, 0], O: [3, 1.73], C1: [0.77, 4.39], C2: [3, 5.2], C3: [5.65, 3.96] },
  names: { C1: 'C₁', C2: 'C₂', C3: 'C₃' },
  labelDir: { A: 'sw', B: 'se', O: 'e', C1: 'nw', C2: 'n', C3: 'ne' },
  circles: [{ c: 'O', r: 3.46, color: 'muted', kind: 'dash' }],
  segs: [
    { a: 'A', b: 'B' },
    { a: 'A', b: 'C1', color: 'opp' },
    { a: 'C1', b: 'B', color: 'opp' },
    { a: 'A', b: 'C2', color: 'adj' },
    { a: 'C2', b: 'B', color: 'adj' },
    { a: 'A', b: 'C3', color: 'hyp' },
    { a: 'C3', b: 'B', color: 'hyp' },
  ],
  angles: [
    { at: 'C1', from: 'A', to: 'B', label: '60°', r: 20 },
    { at: 'C2', from: 'A', to: 'B', label: '60°', r: 20 },
    { at: 'C3', from: 'A', to: 'B', label: '60°', r: 20 },
  ],
}

export const lesson4: Lesson = {
  id: 'construct-triangles',
  number: 4,
  title: 'Constructing triangles',
  summary:
    'Build a triangle from its base, its vertical angle, and a median, an altitude or the foot of the angle bisector.',
  pages: '178–183',
  status: 'ready',

  learn: [
    {
      id: 'vertical-angle',
      title: 'The vertical angle',
      blocks: [
        {
          t: 'p',
          text: 'In a triangle drawn on a base $AB$, the angle at the third vertex $C$ (opposite the base) is called the **vertical angle**.',
        },
        {
          t: 'p',
          text: 'Knowing only the base and the vertical angle is not enough to fix the triangle. There are infinitely many such triangles, and their vertices all lie on one arc of a circle through $A$ and $B$: angles in the same segment of a circle are equal.',
        },
        { t: 'figure', scene: sameArc, caption: 'Same base, same vertical angle: the vertices lie on one arc' },
        {
          t: 'p',
          text: 'So the plan for every construction in this lesson is: (1) draw the arc that holds the vertical angle, then (2) use the third measurement to pick the right point on it.',
        },
      ],
      check: {
        id: 'geo4-c-vertical',
        type: 'mcq',
        prompt:
          'Triangles $ABC_1$, $ABC_2$, $ABC_3$ have the same base $AB$ and the same vertical angle. Where do $C_1$, $C_2$, $C_3$ lie?',
        options: [
          'On one arc of a circle through $A$ and $B$',
          'On a line parallel to $AB$',
          'On the perpendicular bisector of $AB$',
          'Anywhere above $AB$',
        ],
        correct: 0,
        solution: [
          {
            text: 'Angles in the same segment of a circle are equal, so all the vertices lie on one arc through $A$ and $B$.',
          },
        ],
      },
    },
    {
      id: 'segment',
      title: 'Drawing the arc that holds an angle θ',
      blocks: [
        { t: 'p', text: 'To draw, on a segment $AB$, the arc on which every point sees $AB$ at an angle $\\theta$:' },
        {
          t: 'list',
          ordered: true,
          items: [
            'Draw $AB$.',
            'At $A$, draw $AE$ with $\\angle BAE = \\theta$, on the opposite side of $AB$ from where the triangle will be.',
            'At $A$, draw $AF \\perp AE$.',
            'Draw the perpendicular bisector of $AB$, meeting $AF$ at $O$ (and $AB$ at $G$).',
            'With centre $O$ and radius $OA$, draw the circle. The arc on the far side of $AB$ from $E$ is the one you want.',
          ],
        },
        {
          t: 'p',
          text: '**Why it works:** $O$ is on the perpendicular bisector, so $OA = OB$ and the circle passes through $B$. $OA \\perp AE$, so $AE$ is a **tangent** at $A$. By the alternate segment theorem (Lesson 4.6), the angle between the tangent $AE$ and the chord $AB$, which is $\\theta$, equals the angle in the alternate segment.',
        },
      ],
      check: {
        id: 'geo4-c-segment',
        type: 'mcq',
        prompt: 'Why do we draw $AF$ perpendicular to $AE$?',
        options: [
          'So that the centre $O$ lies on $AF$, making $AE$ a tangent at $A$',
          'So that the triangle has a right angle',
          'To find the midpoint of $AB$',
          'To mark the median',
        ],
        correct: 0,
        solution: [
          {
            text: 'A tangent is perpendicular to the radius at the point of contact. With $O$ on $AF \\perp AE$, the radius $OA$ is perpendicular to $AE$, so $AE$ touches the circle at $A$.',
          },
        ],
      },
    },
    {
      id: 'median',
      title: 'Given the median',
      blocks: [
        {
          t: 'p',
          text: 'The median from the vertex goes to $G$, the midpoint of the base. And $G$ is exactly where the perpendicular bisector crosses the base. So: with centre $G$ and radius equal to the median, mark arcs on the circle. Either point works.',
        },
        {
          t: 'p',
          text: 'You get two vertices, $R$ and $S$, mirror images across the perpendicular bisector. They give two congruent triangles, so either is "the" answer.',
        },
        {
          t: 'note',
          tone: 'tip',
          text: 'To find the altitude afterwards, drop a perpendicular from the vertex to the base, extending the base if necessary, and measure it.',
        },
      ],
      check: {
        id: 'geo4-c-median',
        type: 'mcq',
        prompt: 'In the median construction, why do we draw the arc with centre $G$?',
        options: [
          '$G$ is the midpoint of the base, where the median ends',
          '$G$ is the centre of the circle',
          '$G$ is where the angle $\\theta$ is drawn',
          '$G$ is the foot of the altitude',
        ],
        correct: 0,
        solution: [
          {
            text: 'The perpendicular bisector cuts the base at its midpoint $G$. The median joins the vertex to $G$, so the vertex is at distance (median) from $G$.',
          },
        ],
      },
    },
    {
      id: 'altitude',
      title: 'Given the altitude',
      blocks: [
        {
          t: 'p',
          text: 'Every point at height $h$ above the base lies on the line parallel to the base at distance $h$. Mark $M$ on the perpendicular bisector with $GM = h$, draw the line through $M$ parallel to the base, and see where it meets the arc.',
        },
        {
          t: 'note',
          tone: 'think',
          text: 'If $h$ is larger than the highest point of the arc, the parallel line misses the circle: no triangle has that base, vertical angle and altitude. Try it in the **Explore** tab.',
        },
      ],
      check: {
        id: 'geo4-c-altitude',
        type: 'mcq',
        prompt: 'The line through $M$ parallel to the base does not meet the circle. What does this mean?',
        options: [
          'No triangle has these measurements',
          'The triangle is right-angled',
          'You must use the median instead',
          'The triangle is isosceles',
        ],
        correct: 0,
        solution: [
          {
            text: 'Every possible vertex lies on the arc, and none of the arc is that high. So the altitude is impossible for this base and angle.',
          },
        ],
      },
    },
    {
      id: 'bisector',
      title: 'Given where the bisector meets the base',
      blocks: [
        {
          t: 'p',
          text: 'The perpendicular bisector of the base meets the circle again at $I$, on the far side of the base. $I$ is the middle of the arc $AB$, so for **any** vertex $C$ on the other arc, $CI$ bisects $\\angle ACB$ (equal arcs give equal angles).',
        },
        {
          t: 'p',
          text: 'So: mark $D$ on the base at the given distance, join $ID$, and extend it to meet the circle. That point is the vertex.',
        },
      ],
      check: {
        id: 'geo4-c-bisector',
        type: 'mcq',
        prompt: 'Why does the line from $I$ through $D$ reach the correct vertex?',
        options: [
          'Every line from the vertex to $I$ bisects the vertical angle, so the bisector must pass through both $D$ and $I$',
          '$I$ is the centre of the circle',
          '$ID$ is perpendicular to the base',
          '$ID$ is a median',
        ],
        correct: 0,
        solution: [
          {
            text: '$I$ is the midpoint of the arc, so $CI$ is the bisector of $\\angle C$ for every vertex $C$. The bisector we want also passes through $D$, so the vertex is where line $ID$ meets the circle.',
          },
        ],
      },
    },
  ],

  explore: [
    {
      widget: 'construction-triangle',
      title: 'Construction player',
      intro:
        'Pick the kind of construction, type a base, a vertical angle and the third measurement, and step through it. The measurements start at Examples 4.17, 4.18 and 4.19.',
      tryThis: [
        'In "Base, angle, altitude", raise the altitude until the construction becomes impossible.',
        'In "Base, angle, median", what is the smallest median that works for base 8 and 60°?',
        'Use 90° as the angle. What kind of arc do you get?',
      ],
    },
  ],

  examples: [
    {
      id: 'geo4-ex17',
      source: 'Example 4.17',
      title: 'Base, vertical angle and median',
      prompt:
        'Construct $\\Delta PQR$ in which $PQ = 8$ cm, $\\angle R = 60^\\circ$ and the median $RG$ from $R$ to $PQ$ is 5.8 cm. Find the length of the altitude from $R$ to $PQ$.',
      construction: { kind: 'median', base: 8, angle: 60, value: 5.8, names: ['P', 'Q', 'R'], measureAltitude: true },
      steps: [],
      answer: '$\\Delta PQR$ as constructed; the altitude $RM \\approx 3.8$ cm.',
    },
    {
      id: 'geo4-ex18',
      source: 'Example 4.18',
      title: 'Base, vertical angle and altitude',
      prompt:
        'Construct $\\Delta PQR$ such that $QR = 5$ cm, $\\angle P = 30^\\circ$ and the altitude from $P$ to $QR$ is 4.2 cm.',
      construction: { kind: 'altitude', base: 5, angle: 30, value: 4.2, names: ['Q', 'R', 'P'] },
      steps: [],
      answer: '$\\Delta PQR$ as constructed ($\\Delta SQR$ is another answer).',
    },
    {
      id: 'geo4-ex19',
      source: 'Example 4.19',
      title: 'Base, vertical angle and the bisector',
      prompt:
        'Draw $\\Delta ABC$ with base $BC = 8$ cm, $\\angle A = 60^\\circ$, where the bisector of $\\angle A$ meets $BC$ at $D$ with $BD = 6$ cm.',
      construction: { kind: 'bisector', base: 8, angle: 60, value: 6, names: ['B', 'C', 'A'] },
      steps: [],
      answer: '$\\Delta ABC$ as constructed.',
    },
  ],

  practice: [
    {
      id: 'geo4-p11',
      source: 'Exercise 4.2 · Q11',
      type: 'construct',
      prompt:
        'Construct $\\Delta PQR$ in which the base $PQ = 4.5$ cm, $\\angle R = 35^\\circ$ and the median $RG$ from $R$ to $PQ$ is 6 cm.',
      construction: { kind: 'median', base: 4.5, angle: 35, value: 6, names: ['P', 'Q', 'R'] },
      solution: [],
    },
    {
      id: 'geo4-p12',
      source: 'Exercise 4.2 · Q12',
      type: 'construct',
      prompt:
        'Construct $\\Delta PQR$ in which $QR = 5$ cm, $\\angle P = 40^\\circ$ and the median $PG$ from $P$ to $QR$ is 4.4 cm. Find the length of the altitude from $P$ to $QR$.',
      construction: { kind: 'median', base: 5, angle: 40, value: 4.4, names: ['Q', 'R', 'P'], measureAltitude: true },
      measure: [
        {
          label: 'Altitude from $P$ (measured):',
          answer: { value: 2.2, unit: 'cm', display: '2.1 cm in the book; 2.2 cm by calculation', tol: 0.15 },
        },
      ],
      hints: ['After drawing the triangle, drop a perpendicular from $P$ to $QR$ extended, and measure it.'],
      solution: [],
    },
    {
      id: 'geo4-p13',
      source: 'Exercise 4.2 · Q13',
      type: 'construct',
      prompt:
        'Construct $\\Delta PQR$ such that $QR = 6.5$ cm, $\\angle P = 60^\\circ$ and the altitude from $P$ to $QR$ is 4.5 cm.',
      construction: { kind: 'altitude', base: 6.5, angle: 60, value: 4.5, names: ['Q', 'R', 'P'] },
      solution: [],
    },
    {
      id: 'geo4-p14',
      source: 'Exercise 4.2 · Q14',
      type: 'construct',
      prompt:
        'Construct $\\Delta ABC$ such that $AB = 5.5$ cm, $\\angle C = 25^\\circ$ and the altitude from $C$ to $AB$ is 4 cm.',
      construction: { kind: 'altitude', base: 5.5, angle: 25, value: 4, names: ['A', 'B', 'C'] },
      solution: [],
    },
    {
      id: 'geo4-p15',
      source: 'Exercise 4.2 · Q15',
      type: 'construct',
      prompt:
        'Draw $\\Delta ABC$ with base $BC = 5.6$ cm, $\\angle A = 40^\\circ$, where the bisector of $\\angle A$ meets $BC$ at $D$ with $CD = 4$ cm.',
      construction: { kind: 'bisector', base: 5.6, angle: 40, value: 4, names: ['C', 'B', 'A'] },
      hints: ['$CD$ is given, so start the base from $C$: mark $D$ 4 cm from $C$.'],
      solution: [],
    },
    {
      id: 'geo4-p16',
      source: 'Exercise 4.2 · Q16',
      type: 'construct',
      prompt:
        'Draw $\\Delta PQR$ such that $PQ = 6.8$ cm, the vertical angle is $50^\\circ$, and the bisector of the vertical angle meets the base at $D$ with $PD = 5.2$ cm.',
      construction: { kind: 'bisector', base: 6.8, angle: 50, value: 5.2, names: ['P', 'Q', 'R'] },
      solution: [],
    },
  ],

  quiz: [
    {
      id: 'geo4-q1',
      type: 'mcq',
      prompt: 'In $\\Delta PQR$ with base $QR$, which angle is the vertical angle?',
      options: ['$\\angle P$', '$\\angle Q$', '$\\angle R$', 'The angle between the base and the altitude'],
      correct: 0,
      solution: [{ text: 'The vertical angle is opposite the base, at the third vertex $P$.' }],
    },
    {
      id: 'geo4-q2',
      type: 'mcq',
      prompt:
        'In the arc construction, at $A$ we draw $\\angle BAE = \\theta$ and then $AF \\perp AE$. The centre $O$ is where $AF$ meets',
      options: ['the perpendicular bisector of $AB$', 'the line $AB$', 'the circle', 'the median'],
      correct: 0,
      solution: [
        { text: '$O$ must be equidistant from $A$ and $B$, so it lies on the perpendicular bisector of $AB$.' },
      ],
    },
    {
      id: 'geo4-q3',
      type: 'mcq',
      prompt: 'Which theorem explains why every point on the arc sees the base at angle $\\theta$?',
      options: [
        'The alternate segment theorem',
        'Pythagoras theorem',
        'The Basic Proportionality Theorem',
        'Menelaus’ theorem',
      ],
      correct: 0,
      solution: [
        {
          text: '$AE$ is a tangent at $A$ and $AB$ a chord, so the angle in the alternate segment equals $\\angle BAE = \\theta$.',
        },
      ],
    },
    {
      id: 'geo4-q4',
      type: 'mcq',
      prompt:
        'Given a base, a vertical angle and a median, how many vertices does the arc construction give above the base?',
      options: ['Two, which are mirror images', 'Exactly one', 'Infinitely many', 'None'],
      correct: 0,
      solution: [
        {
          text: 'The circle about $G$ meets the arc at two points, $R$ and $S$, symmetric about the perpendicular bisector. The two triangles are congruent.',
        },
      ],
    },
    {
      id: 'geo4-q5',
      type: 'mcq',
      prompt: 'In the bisector construction, the point $I$ is',
      options: [
        'the midpoint of the arc on the other side of the base',
        'the centre of the circle',
        'the midpoint of the base',
        'the foot of the altitude',
      ],
      correct: 0,
      solution: [
        { text: '$I$ is where the perpendicular bisector meets the circle below the base: the middle of that arc.' },
      ],
    },
  ],
}
