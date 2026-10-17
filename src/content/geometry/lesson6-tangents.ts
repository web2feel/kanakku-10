import type { Lesson, SceneSpec } from '../types'

const TR = 'A tangent is perpendicular to the radius at the point of contact'

/** Three lines and a circle: missing it, touching it, cutting it. */
const lineCircle: SceneSpec = {
  view: [-1.9, -2.3, 10.4, 1.9],
  maxWidth: 420,
  points: {
    O1: [0, 0],
    O2: [4.25, 0],
    O3: [8.5, 0],
    A: [4.25, -1.5],
    B: [7.38, -1],
    C: [9.62, -1],
    L1: [-1.8, -2],
    L2: [1.8, -2],
    M1: [2.45, -1.5],
    M2: [6.05, -1.5],
    N1: [6.7, -1],
    N2: [10.3, -1],
  },
  names: { O1: 'O', O2: 'O', O3: 'O' },
  labelDir: {
    O1: 'n',
    O2: 'n',
    O3: 'n',
    A: 's',
    B: 'sw',
    C: 'se',
    L1: 'none',
    L2: 'none',
    M1: 'none',
    M2: 'none',
    N1: 'none',
    N2: 'none',
  },
  circles: [
    { c: 'O1', r: 1.5 },
    { c: 'O2', r: 1.5 },
    { c: 'O3', r: 1.5 },
  ],
  segs: [
    { a: 'L1', b: 'L2', kind: 'line', color: 'muted' },
    { a: 'M1', b: 'M2', kind: 'line', color: 'hyp' },
    { a: 'N1', b: 'N2', kind: 'line', color: 'opp' },
    { a: 'B', b: 'C', color: 'adj' },
  ],
}

const equalTangents: SceneSpec = {
  view: [-2.4, -2.6, 5.8, 2.6],
  maxWidth: 360,
  points: { O: [0, 0], P: [5, 0], A: [0.8, 1.83], B: [0.8, -1.83] },
  labelDir: { O: 'w', P: 'e', A: 'n', B: 's' },
  circles: [{ c: 'O', r: 2 }],
  segs: [
    { a: 'P', b: 'A', color: 'opp', ticks: 1 },
    { a: 'P', b: 'B', color: 'opp', ticks: 1 },
    { a: 'O', b: 'A', kind: 'dash' },
    { a: 'O', b: 'B', kind: 'dash' },
    { a: 'O', b: 'P', kind: 'dash', color: 'muted' },
  ],
  right: [
    { at: 'A', a: 'O', b: 'P' },
    { at: 'B', a: 'O', b: 'P' },
  ],
}

/** Fig 4.61: tangent AB at P, chord PQ, S on the major arc, T on the minor arc, diameter PR. */
const altSeg: SceneSpec = {
  view: [-4.8, -3.8, 4.8, 3.8],
  maxWidth: 340,
  points: {
    O: [0, 0],
    P: [0, -3],
    Q: [2.6, 1.5],
    S: [-2.6, 1.5],
    T: [2.6, -1.5],
    R: [0, 3],
    A: [-4.5, -3],
    B: [4.5, -3],
  },
  labelDir: { O: 'w', P: 's', Q: 'e', S: 'w', T: 'e', R: 'n', A: 's', B: 's' },
  circles: [{ c: 'O', r: 3, color: 'hyp' }],
  segs: [
    { a: 'A', b: 'B', kind: 'line', color: 'adj' },
    { a: 'P', b: 'Q' },
    { id: 'ps', a: 'P', b: 'S', color: 'opp' },
    { id: 'sq', a: 'S', b: 'Q', color: 'opp' },
    { a: 'P', b: 'T', color: 'muted' },
    { a: 'T', b: 'Q', color: 'muted' },
    { a: 'P', b: 'R', kind: 'dash' },
    { a: 'Q', b: 'R', kind: 'dash' },
  ],
  angles: [
    { id: 'qpb', at: 'P', from: 'B', to: 'Q', label: '1', r: 26 },
    { id: 'psq', at: 'S', from: 'P', to: 'Q', label: '1', r: 22 },
  ],
}

export const lesson6: Lesson = {
  id: 'tangents',
  number: 6,
  title: 'Circles and tangents',
  summary:
    'Tangents meet the radius at right angles, tangents from a point are equal, and the alternate segment theorem.',
  pages: '188–193',
  status: 'ready',

  learn: [
    {
      id: 'line-circle',
      title: 'A line and a circle',
      blocks: [
        { t: 'p', text: 'A straight line and a circle can meet in three ways:' },
        {
          t: 'figure',
          scene: lineCircle,
          caption: 'No common point · one common point (tangent) · two common points (secant)',
        },
        {
          t: 'list',
          items: [
            '**No common point**: the line misses the circle.',
            '**One common point**: the line is a **tangent**, and the point is the **point of contact**.',
            '**Two common points**: the line is a **secant**. The part of a secant inside the circle is a **chord**.',
          ],
        },
        {
          t: 'note',
          tone: 'history',
          text: 'The word *tangent* comes from the Latin *tangere*, "to touch". The Danish mathematician Thomas Fincke introduced it in 1583.',
        },
        {
          t: 'note',
          tone: 'note',
          text: 'A cycle wheel touches the road at one point: the road is a tangent to the wheel. Let go of a stone whirled on a string and it flies off along the tangent.',
        },
      ],
      check: {
        id: 'geo6-c-line',
        type: 'mcq',
        prompt: 'A chord of a circle is part of a',
        options: ['secant', 'tangent', 'radius', 'line that misses the circle'],
        correct: 0,
        solution: [{ text: 'A secant cuts the circle at two points; the segment between them is a chord.' }],
      },
    },
    {
      id: 'tangent-radius',
      title: 'Tangent and radius',
      blocks: [
        {
          t: 'p',
          text: '**A tangent at any point of a circle is perpendicular to the radius through that point.** This is the key fact behind almost every tangent problem: it gives you a right angle, and so Pythagoras.',
        },
        {
          t: 'table',
          head: ['Where the point is', 'Tangents through it'],
          rows: [
            ['Inside the circle', 'None'],
            ['On the circle', 'Exactly one'],
            ['Outside the circle', 'Exactly two'],
          ],
        },
        {
          t: 'note',
          tone: 'think',
          text: 'Can two tangents to a circle be parallel? Yes: the tangents at the two ends of a diameter. Can two tangents be perpendicular? Yes: at the ends of two radii at right angles.',
        },
      ],
      check: {
        id: 'geo6-c-radius',
        type: 'mcq',
        prompt: 'How many tangents can be drawn to a circle from a point outside it?',
        options: ['Two', 'One', 'None', 'Infinitely many'],
        correct: 0,
        solution: [{ text: 'Exactly two tangents can be drawn from an exterior point.' }],
      },
    },
    {
      id: 'equal-tangents',
      title: 'Tangents from an outside point are equal',
      blocks: [
        { t: 'figure', scene: equalTangents, caption: 'PA = PB' },
        {
          t: 'p',
          text: 'Let the tangents from $P$ touch the circle at $A$ and $B$. Then $OA \\perp PA$ and $OB \\perp PB$, $OA = OB$ (radii) and $OP$ is common. So $\\Delta OAP \\cong \\Delta OBP$ (RHS) and $PA = PB$.',
        },
        {
          t: 'p',
          text: 'And by Pythagoras in $\\Delta OAP$: $PA^2 = OP^2 - r^2$. That formula answers most "length of the tangent" questions.',
        },
      ],
      check: {
        id: 'geo6-c-equal',
        type: 'numeric',
        prompt: 'A point is 13 cm from the centre of a circle of radius 5 cm. How long is the tangent from it?',
        parts: [{ answer: { value: 12, unit: 'cm', display: '12 cm' } }],
        solution: [{ math: '\\sqrt{13^2 - 5^2} = \\sqrt{144} = 12' }],
      },
    },
    {
      id: 'touching',
      title: 'Circles that touch',
      blocks: [
        {
          t: 'list',
          items: [
            'Two circles that **touch externally**: the distance between their centres is the **sum** of the radii, $r_1 + r_2$.',
            'Two circles that **touch internally**: the distance between their centres is the **difference** of the radii, $r_1 - r_2$.',
            'The two **direct common tangents** to two circles are equal in length: from their meeting point $P$, $PA = PC$ and $PB = PD$, so $AB = PA - PB = PC - PD = CD$.',
          ],
        },
      ],
      check: {
        id: 'geo6-c-touch',
        type: 'numeric',
        prompt: 'Circles of radii 5 cm and 3 cm touch internally. How far apart are their centres?',
        parts: [{ answer: { value: 2, unit: 'cm', display: '2 cm' } }],
        solution: [{ math: 'r_1 - r_2 = 5 - 3 = 2' }],
      },
    },
    {
      id: 'alternate',
      title: 'The alternate segment theorem',
      blocks: [
        {
          t: 'p',
          text: 'A chord $PQ$ splits the circle into two segments. For the angle $\\angle QPB$ between the tangent and the chord, the **alternate segment** is the one on the other side of the chord.',
        },
        { t: 'figure', scene: altSeg, caption: '∠QPB = ∠PSQ (both marked 1)' },
        {
          t: 'p',
          text: '**Theorem 6.** If a line touches a circle and a chord is drawn from the point of contact, the angles between the tangent and the chord equal the angles in the corresponding alternate segments: $\\angle QPB = \\angle PSQ$ and $\\angle QPA = \\angle PTQ$.',
        },
        {
          t: 'p',
          text: '**Proof idea:** draw the diameter $PR$. $\\angle RPB = 90^\\circ$ (tangent ⟂ radius) and $\\angle PQR = 90^\\circ$ (angle in a semicircle). Both $\\angle QPB$ and $\\angle QRP$ are $90^\\circ - \\angle RPQ$, so they are equal; and $\\angle QRP = \\angle PSQ$ (same segment).',
        },
      ],
      check: {
        id: 'geo6-c-alt',
        type: 'numeric',
        prompt:
          'A tangent at $P$ makes an angle of $65^\\circ$ with the chord $PQ$. What is the angle subtended by $PQ$ at a point $S$ in the alternate segment?',
        parts: [{ answer: { value: 65, unit: '°', display: '65°' } }],
        solution: [
          { text: 'By the alternate segment theorem, $\\angle PSQ$ equals the tangent–chord angle: $65^\\circ$.' },
        ],
      },
    },
  ],

  explore: [
    {
      widget: 'tangent-lab',
      title: 'Tangent lab',
      intro:
        'Drag $P$ to see the two tangents and their lengths. Then switch to "Alternate segment" and move $Q$ and $S$ around the circle.',
      tryThis: [
        'Move $P$ closer to the circle. What happens to the tangent length? What about when $P$ is inside?',
        'Make $OP$ = 5 with radius 3. Is the tangent length what Pythagoras predicts?',
        'In "Alternate segment", move $S$ along its arc. Does $\\angle PSQ$ change?',
      ],
    },
  ],

  examples: [
    {
      id: 'geo6-ex24',
      source: 'Example 4.24',
      title: 'Length of a tangent',
      prompt: 'Find the length of the tangent drawn from a point 5 cm from the centre of a circle of radius 3 cm.',
      figure: {
        view: [-3.6, -3.5, 5.8, 3.5],
        maxWidth: 320,
        points: { O: [0, 0], P: [5, 0], T: [1.8, 2.4] },
        labelDir: { O: 'w', P: 'e', T: 'n' },
        circles: [{ c: 'O', r: 3, color: 'adj' }],
        segs: [
          { id: 'ot', a: 'O', b: 'T', label: '3 cm', labelSide: 1 },
          { id: 'op', a: 'O', b: 'P', label: '5 cm', labelSide: -1 },
          { id: 'pt', a: 'P', b: 'T', color: 'opp' },
        ],
        right: [{ at: 'T', a: 'O', b: 'P' }],
      },
      steps: [
        {
          text: 'The radius $OT$ is perpendicular to the tangent $PT$, so $\\Delta OTP$ is right-angled at $T$.',
          highlight: ['ot', 'pt'],
        },
        { math: 'OP^2 = OT^2 + PT^2 \\;\\Rightarrow\\; 25 = 9 + PT^2 \\;\\Rightarrow\\; PT^2 = 16', highlight: ['op'] },
      ],
      answer: 'The tangent is 4 cm long.',
    },
    {
      id: 'geo6-ex25',
      source: 'Example 4.25',
      title: 'Tangents at the ends of a chord',
      prompt:
        '$PQ$ is a chord of length 8 cm in a circle of radius 5 cm. The tangents at $P$ and $Q$ meet at $T$. Find $TP$.',
      figure: {
        view: [-5.6, -5.6, 9.2, 5.6],
        maxWidth: 380,
        points: { O: [0, 0], P: [3, 4], Q: [3, -4], R: [3, 0], T: [8.33, 0] },
        labelDir: { O: 'w', P: 'n', Q: 's', R: 'sw', T: 'e' },
        circles: [{ c: 'O', r: 5, color: 'hyp' }],
        segs: [
          { a: 'O', b: 'P', kind: 'dash', label: '5', labelSide: 1 },
          { a: 'O', b: 'Q', kind: 'dash' },
          { a: 'P', b: 'Q', label: '8', labelSide: -1 },
          { a: 'O', b: 'T' },
          { id: 'tp', a: 'T', b: 'P', color: 'opp' },
          { a: 'T', b: 'Q', color: 'opp' },
          { id: 'rt', a: 'R', b: 'T', label: 'y', labelSide: -1, color: 'accent' },
        ],
        right: [
          { at: 'P', a: 'O', b: 'T' },
          { at: 'R', a: 'T', b: 'P' },
        ],
      },
      steps: [
        { text: '$OT$ is the perpendicular bisector of $PQ$, so $PR = QR = 4$ cm.' },
        { math: 'OR^2 = OP^2 - PR^2 = 25 - 16 = 9 \\;\\Rightarrow\\; OR = 3' },
        { text: 'Let $TR = y$, so $OT = 3 + y$.', highlight: ['rt'] },
        {
          text: 'In $\\Delta PRT$: $TP^2 = y^2 + 16$. In $\\Delta OPT$ (right-angled at $P$): $OT^2 = TP^2 + OP^2$.',
          highlight: ['tp'],
        },
        { math: '(3 + y)^2 = y^2 + 16 + 25 \\;\\Rightarrow\\; 9 + 6y = 41 \\;\\Rightarrow\\; y = \\tfrac{16}{3}' },
        {
          math: 'TP^2 = \\left(\\tfrac{16}{3}\\right)^2 + 4^2 = \\tfrac{256}{9} + 16 = \\tfrac{400}{9} \\;\\Rightarrow\\; TP = \\tfrac{20}{3}',
        },
      ],
      answer: '$TP = \\tfrac{20}{3}$ cm',
    },
    {
      id: 'geo6-ex26',
      source: 'Example 4.26',
      title: 'Angle at the centre from a tangent',
      prompt:
        '$O$ is the centre of a circle. The tangent $PR$ at $P$ makes an angle of $50^\\circ$ with the chord $PQ$. Find $\\angle POQ$.',
      figure: {
        view: [-3.6, -3.6, 4.4, 3.8],
        maxWidth: 300,
        points: { O: [0, 0], P: [0, 3], Q: [2.95, -0.52], R: [4, 3] },
        labelDir: { O: 'w', P: 'n', Q: 'e', R: 'n' },
        circles: [{ c: 'O', r: 3, color: 'hyp' }],
        segs: [
          { a: 'P', b: 'R', color: 'adj' },
          { a: 'P', b: 'Q' },
          { a: 'O', b: 'P' },
          { a: 'O', b: 'Q' },
        ],
        angles: [
          { at: 'P', from: 'R', to: 'Q', label: '50°', r: 26 },
          { id: 'pog', at: 'O', from: 'P', to: 'Q', label: '?', r: 22 },
        ],
      },
      steps: [
        { math: '\\angle OPQ = 90^\\circ - 50^\\circ = 40^\\circ \\quad (\\text{radius} \\perp \\text{tangent})' },
        { text: '$OP = OQ$ (radii), so $\\Delta OPQ$ is isosceles and $\\angle OQP = 40^\\circ$.' },
        { math: '\\angle POQ = 180^\\circ - 40^\\circ - 40^\\circ = 100^\\circ', highlight: ['pog'] },
      ],
      answer: '$\\angle POQ = 100^\\circ$',
    },
    {
      id: 'geo6-ex27',
      source: 'Example 4.27',
      title: 'A triangle around a circle',
      prompt:
        '$\\Delta ABC$ circumscribes a circle, which touches $AB$ at $N$, $BC$ at $L$ and $AC$ at $M$. If $AN = 3$ cm, $NB = 4$ cm and $AC = 9$ cm, find $BC$.',
      steps: [
        { text: 'Tangents from the same external point are equal.' },
        { text: '$AM = AN = 3$ cm and $BL = BN = 4$ cm.' },
        { text: '$CL = CM = AC - AM = 9 - 3 = 6$ cm.' },
        { math: 'BC = BL + CL = 4 + 6 = 10' },
      ],
      answer: '$BC = 10$ cm',
    },
    {
      id: 'geo6-ex28',
      source: 'Example 4.28',
      title: 'Concentric circles',
      prompt:
        'Two concentric circles have radii 4 cm and 5 cm. Find the length of a chord of the larger circle that touches the smaller circle.',
      figure: {
        view: [-5.6, -5.6, 5.6, 5.6],
        maxWidth: 280,
        points: { O: [0, 0], A: [0, -4], B: [-3, -4], C: [3, -4] },
        labelDir: { O: 'n', A: 's', B: 'sw', C: 'se' },
        circles: [
          { c: 'O', r: 4, color: 'adj' },
          { c: 'O', r: 5, color: 'hyp' },
        ],
        segs: [
          { a: 'B', b: 'C', color: 'opp' },
          { a: 'O', b: 'A', label: '4', labelSide: -1 },
          { a: 'O', b: 'B', label: '5', labelSide: 1 },
        ],
        right: [{ at: 'A', a: 'O', b: 'C' }],
      },
      steps: [
        { text: 'The chord $BC$ touches the small circle at $A$, so $OA \\perp BC$ and $A$ is the midpoint of $BC$.' },
        { math: 'OB^2 = OA^2 + AB^2 \\;\\Rightarrow\\; 25 = 16 + AB^2 \\;\\Rightarrow\\; AB = 3' },
        { math: 'BC = 2 \\times AB = 6' },
      ],
      answer: '6 cm',
    },
  ],

  practice: [
    {
      id: 'geo6-p-thm6',
      source: 'Theorem 6',
      type: 'proof',
      prompt: 'Prove the first part of the alternate segment theorem.',
      figure: altSeg,
      given:
        'A circle with centre $O$; the tangent $AB$ touches it at $P$; $PQ$ is a chord; $S$ is a point on the circle on the other side of $PQ$ from $B$.',
      toProve: '$\\angle QPB = \\angle PSQ$',
      construction: 'Draw the diameter $POR$. Join $QR$, $QS$ and $PS$.',
      steps: [
        {
          statement: '$\\angle RPB = 90^\\circ$, so $\\angle RPQ + \\angle QPB = 90^\\circ$ … (1)',
          reason: 'The diameter $RP$ is perpendicular to the tangent $AB$',
          choices: [
            'The diameter $RP$ is perpendicular to the tangent $AB$',
            'Angle in a semicircle',
            'Linear pair of angles',
          ],
        },
        {
          statement: 'In $\\Delta RPQ$, $\\angle PQR = 90^\\circ$ … (2)',
          reason: 'The angle in a semicircle is $90^\\circ$',
          choices: ['The angle in a semicircle is $90^\\circ$', TR, 'Opposite angles of a cyclic quadrilateral'],
        },
        {
          statement: '$\\angle QRP + \\angle RPQ = 90^\\circ$ … (3)',
          reason: 'The acute angles of a right triangle add up to $90^\\circ$',
        },
        {
          statement: '$\\angle QPB = \\angle QRP$ … (4)',
          reason: 'From (1) and (3)',
          choices: ['From (1) and (3)', 'Vertically opposite angles', 'AA similarity'],
        },
        {
          statement: '$\\angle QRP = \\angle PSQ$ … (5)',
          reason: 'Angles in the same segment are equal',
          choices: ['Angles in the same segment are equal', 'Alternate angles', 'Base angles of an isosceles triangle'],
        },
        { statement: '$\\angle QPB = \\angle PSQ$', reason: 'From (4) and (5)' },
      ],
      solution: [],
    },
    {
      id: 'geo6-p1',
      source: 'Exercise 4.4 · Q1',
      type: 'numeric',
      prompt: 'The tangent to a circle from a point 25 cm from the centre is 24 cm long. What is the radius?',
      parts: [{ answer: { value: 7, unit: 'cm', display: '7 cm' } }],
      solution: [{ math: 'r = \\sqrt{25^2 - 24^2} = \\sqrt{49} = 7' }],
    },
    {
      id: 'geo6-p2',
      source: 'Exercise 4.4 · Q2',
      type: 'numeric',
      prompt:
        '$\\Delta LMN$ is right-angled at $L$, with $LM = 6$ cm and $LN = 8$ cm. A circle is inscribed in it. Find the radius.',
      parts: [{ answer: { value: 2, unit: 'cm', display: '2 cm' } }],
      hints: [
        '$MN = 10$. The incircle touches the two legs at points $r$ from $L$ (a square forms at the right angle).',
        'Equal tangents: $(6 - r) + (8 - r) = 10$.',
      ],
      solution: [
        {
          text: '$MN = \\sqrt{36 + 64} = 10$. The incircle and the right angle make a square of side $r$ at $L$, so the tangents from $M$ and $N$ are $6 - r$ and $8 - r$.',
        },
        { math: '(6 - r) + (8 - r) = 10 \\;\\Rightarrow\\; r = 2' },
      ],
    },
    {
      id: 'geo6-p3',
      source: 'Exercise 4.4 · Q3',
      type: 'numeric',
      prompt:
        'A circle is inscribed in $\\Delta ABC$ with $AB = 12$ cm, $BC = 8$ cm and $CA = 10$ cm. It touches $AB$ at $D$, $BC$ at $E$ and $CA$ at $F$. Find $AD$, $BE$ and $CF$.',
      parts: [
        { label: '$AD =$', answer: { value: 7, unit: 'cm', display: '7 cm' } },
        { label: '$BE =$', answer: { value: 5, unit: 'cm', display: '5 cm' } },
        { label: '$CF =$', answer: { value: 3, unit: 'cm', display: '3 cm' } },
      ],
      hints: ['Let $AD = AF = x$, $BD = BE = y$, $CE = CF = z$. Then $x + y = 12$, $y + z = 8$, $z + x = 10$.'],
      solution: [
        { text: 'Adding the three equations: $2(x + y + z) = 30$, so $x + y + z = 15$.' },
        { text: '$x = 15 - 8 = 7$, $y = 15 - 10 = 5$, $z = 15 - 12 = 3$.' },
      ],
    },
    {
      id: 'geo6-p4',
      source: 'Exercise 4.4 · Q4',
      type: 'numeric',
      prompt:
        '$PQ$ is a tangent from $P$ to a circle with centre $O$, and $QOR$ is a diameter with $\\angle POR = 120^\\circ$. Find $\\angle OPQ$.',
      parts: [{ answer: { value: 30, unit: '°', display: '30°' } }],
      hints: ['$\\angle POQ = 180^\\circ - 120^\\circ$, and $\\angle OQP = 90^\\circ$.'],
      solution: [
        { text: '$\\angle POQ = 180^\\circ - 120^\\circ = 60^\\circ$ (straight line $QOR$).' },
        { math: '\\angle OPQ = 180^\\circ - 90^\\circ - 60^\\circ = 30^\\circ' },
      ],
    },
    {
      id: 'geo6-p5',
      source: 'Exercise 4.4 · Q5',
      type: 'numeric',
      prompt:
        'A tangent $ST$ touches a circle at $B$. $AB$ is a chord with $\\angle ABT = 65^\\circ$. Find $\\angle AOB$, where $O$ is the centre.',
      parts: [{ answer: { value: 130, unit: '°', display: '130°' } }],
      hints: ['$\\angle OBA = 90^\\circ - 65^\\circ$, and $\\Delta OAB$ is isosceles.'],
      solution: [
        { math: '\\angle OBA = 90^\\circ - 65^\\circ = 25^\\circ = \\angle OAB' },
        { math: '\\angle AOB = 180^\\circ - 2 \\times 25^\\circ = 130^\\circ' },
      ],
    },
    {
      id: 'geo6-p6',
      source: 'Exercise 4.4 · Q6',
      type: 'numeric',
      prompt:
        '$O$ is the centre of a circle of radius 5 cm and $OT = 13$ cm. $TP$ and $TQ$ are tangents, and $OT$ meets the circle at $E$. $AB$ is the tangent at $E$, with $A$ on $TP$ and $B$ on $TQ$. Find $AB$.',
      figure: {
        view: [-5.6, -5.6, 13.8, 5.6],
        maxWidth: 420,
        points: { O: [0, 0], T: [13, 0], E: [5, 0], P: [1.92, 4.62], Q: [1.92, -4.62], A: [5, 3.33], B: [5, -3.33] },
        labelDir: { O: 'w', T: 'e', E: 'sw', P: 'n', Q: 's', A: 'ne', B: 'se' },
        circles: [{ c: 'O', r: 5, color: 'hyp' }],
        segs: [
          { a: 'O', b: 'T', label: '13', labelSide: -1 },
          { a: 'O', b: 'P', label: '5', labelSide: 1, kind: 'dash' },
          { a: 'T', b: 'P' },
          { a: 'T', b: 'Q' },
          { a: 'A', b: 'B', color: 'opp' },
        ],
        right: [{ at: 'E', a: 'T', b: 'A' }],
      },
      parts: [{ label: '$AB =$', answer: { value: 20 / 3, unit: 'cm', display: '20/3 cm' } }],
      hints: [
        '$TP = 12$ and $TE = 13 - 5 = 8$.',
        'Let $AE = AP = t$ (equal tangents from $A$). In right triangle $TEA$: $(12 - t)^2 = t^2 + 8^2$.',
      ],
      solution: [
        { text: '$TP = \\sqrt{169 - 25} = 12$, $TE = 8$. Let $AP = AE = t$, so $TA = 12 - t$.' },
        { math: '(12 - t)^2 = t^2 + 64 \\;\\Rightarrow\\; 144 - 24t = 64 \\;\\Rightarrow\\; t = \\tfrac{10}{3}' },
        { text: 'By symmetry $BE = \\tfrac{10}{3}$ too, so $AB = \\tfrac{20}{3}$ cm.' },
      ],
    },
    {
      id: 'geo6-p7',
      source: 'Exercise 4.4 · Q7',
      type: 'numeric',
      prompt:
        'In two concentric circles, a chord of length 16 cm of the larger circle touches the smaller circle, whose radius is 6 cm. Find the radius of the larger circle.',
      parts: [{ answer: { value: 10, unit: 'cm', display: '10 cm' } }],
      solution: [{ math: 'R = \\sqrt{6^2 + 8^2} = 10' }],
    },
    {
      id: 'geo6-p8',
      source: 'Exercise 4.4 · Q8',
      type: 'numeric',
      prompt:
        "Two circles with centres $O$ and $O'$ and radii 3 cm and 4 cm meet at $P$ and $Q$, so that $OP$ and $O'P$ are tangents to the two circles. Find the length of the common chord $PQ$.",
      parts: [{ answer: { value: 4.8, unit: 'cm', display: '4.8 cm' } }],
      hints: [
        "$OP$ is a tangent to the other circle, so $OP \\perp O'P$ and $OO' = 5$.",
        "$PQ$ is twice the altitude from $P$ in the right triangle $OPO'$: altitude $= \\tfrac{3 \\times 4}{5}$.",
      ],
      solution: [
        { text: "$\\angle OPO' = 90^\\circ$, so $OO' = \\sqrt{9 + 16} = 5$." },
        {
          text: "The common chord is perpendicular to $OO'$ and bisected by it. Half of it is the altitude of $\\Delta OPO'$:",
        },
        { math: '\\frac{3 \\times 4}{5} = 2.4 \\;\\Rightarrow\\; PQ = 4.8' },
      ],
    },
    {
      id: 'geo6-p-pc',
      source: 'Progress Check · page 197',
      type: 'mcq',
      prompt: 'No tangent can be drawn to a circle from',
      options: [
        'a point inside the circle',
        'a point on the circle',
        'a point outside the circle',
        'the end of a diameter',
      ],
      correct: 0,
      solution: [
        { text: 'Any line through an interior point cuts the circle twice, so it is a secant, never a tangent.' },
      ],
    },
  ],

  quiz: [
    {
      id: 'geo6-q1',
      type: 'mcq',
      prompt: 'A tangent to a circle is perpendicular to the radius at',
      options: ['the point of contact', 'the centre', 'any point of the circle', 'the end of a chord'],
      correct: 0,
      solution: [{ text: 'The radius drawn to the point of contact is perpendicular to the tangent.' }],
    },
    {
      id: 'geo6-q2',
      type: 'numeric',
      prompt: 'From a point 10 cm from the centre of a circle, the tangent is 8 cm long. Find the radius.',
      parts: [{ answer: { value: 6, unit: 'cm', display: '6 cm' } }],
      solution: [{ math: '\\sqrt{100 - 64} = 6' }],
    },
    {
      id: 'geo6-q3',
      type: 'numeric',
      prompt: 'Tangents $PA$ and $PB$ are drawn from $P$, and $\\angle APB = 80^\\circ$. Find $\\angle AOB$.',
      parts: [{ answer: { value: 100, unit: '°', display: '100°' } }],
      solution: [
        {
          text: '$OAPB$ has right angles at $A$ and $B$, so $\\angle AOB = 360^\\circ - 90^\\circ - 90^\\circ - 80^\\circ = 100^\\circ$.',
        },
      ],
    },
    {
      id: 'geo6-q4',
      type: 'numeric',
      prompt: 'Two circles of radii 6 cm and 4 cm touch externally. Find the distance between their centres.',
      parts: [{ answer: { value: 10, unit: 'cm', display: '10 cm' } }],
      solution: [{ text: '$6 + 4 = 10$ cm.' }],
    },
    {
      id: 'geo6-q5',
      type: 'numeric',
      prompt: 'The tangent at $P$ makes $70^\\circ$ with the chord $PQ$. Find $\\angle POQ$, where $O$ is the centre.',
      parts: [{ answer: { value: 140, unit: '°', display: '140°' } }],
      solution: [
        { text: '$\\angle OPQ = 20^\\circ = \\angle OQP$, so $\\angle POQ = 180^\\circ - 40^\\circ = 140^\\circ$.' },
      ],
    },
    {
      id: 'geo6-q6',
      type: 'mcq',
      prompt: 'The two tangents from an external point to a circle are',
      options: ['equal in length', 'perpendicular to each other', 'parallel', 'equal to the radius'],
      correct: 0,
      solution: [{ text: 'Tangents from the same external point are equal.' }],
    },
    {
      id: 'geo6-q7',
      type: 'numeric',
      prompt: 'A circle touches all four sides of quadrilateral $ABCD$. If $AB = 6$, $BC = 7$ and $CD = 4$, find $AD$.',
      parts: [{ answer: { value: 3, display: '3' } }],
      hints: ['With equal tangents from each vertex, $AB + CD = BC + AD$.'],
      solution: [{ math: 'AB + CD = BC + AD \\;\\Rightarrow\\; 6 + 4 = 7 + AD \\;\\Rightarrow\\; AD = 3' }],
    },
    {
      id: 'geo6-q8',
      type: 'mcq',
      prompt: 'In the alternate segment theorem, the angle between a tangent and a chord equals',
      options: [
        'the angle the chord subtends in the alternate segment',
        'the angle the chord subtends at the centre',
        'a right angle',
        'half the angle between the two tangents',
      ],
      correct: 0,
      solution: [{ text: 'That is exactly the statement of Theorem 6.' }],
    },
  ],
}
