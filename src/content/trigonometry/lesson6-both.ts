import type { Lesson } from '../types'

const R3 = Math.sqrt(3)

export const lesson6: Lesson = {
  id: 'both',
  number: 6,
  title: 'Elevation and depression together',
  summary: 'Looking up and down from one point: towers across a street, hills from a ship, and clouds over a lake.',
  pages: '262–265',
  status: 'ready',

  learn: [
    {
      id: 'both',
      title: 'Up and down from the same point',
      blocks: [
        {
          t: 'figure',
          scene: {
            view: [-14, -12, 130, 96],
            maxWidth: 480,
            water: true,
            objects: [
              { type: 'lighthouse', at: [0, 0], h: 40, w: 8 },
              { type: 'plane', at: [100, 82], h: 0 },
              { type: 'ship', at: [92, 0], h: 0 },
            ],
            points: { E: [0, 40], H: [120, 40], P: [100, 82], S: [92, 0] },
            names: { E: 'Eye', H: '', P: 'Plane', S: 'Ship' },
            labelDir: { E: 'nw', H: 'none', P: 'n', S: 's' },
            segs: [
              { a: 'E', b: 'H', kind: 'dash', color: 'adj', label: 'horizontal', labelSide: -1 },
              { a: 'E', b: 'P', kind: 'sight', color: 'hyp' },
              { a: 'E', b: 'S', kind: 'sight', color: 'hyp' },
            ],
            angles: [
              { at: 'E', from: 'H', to: 'P', label: 'x° elevation', r: 46 },
              { at: 'E', from: 'H', to: 'S', label: 'y° depression', r: 34 },
            ],
          },
          caption: 'From the top of a lighthouse: up to a plane, down to a ship (textbook Fig 6.26)',
        },
        {
          t: 'p',
          text: 'From one point you can look **up** at one thing and **down** at another. Both angles are measured from the same horizontal line through the eye: the angle of elevation above it, the angle of depression below it.',
        },
      ],
      check: {
        id: 'l6-c-both',
        source: 'Progress Check · p.264 Q3',
        type: 'mcq',
        prompt: 'When the line of sight is above the horizontal level, the angle formed is the',
        options: ['angle of depression', 'angle of elevation', 'right angle', 'straight angle'],
        correct: 1,
        solution: [{ text: 'Above the horizontal: the **angle of elevation**.' }],
      },
    },
    {
      id: 'split',
      title: 'The horizontal line splits the problem in two',
      blocks: [
        {
          t: 'figure',
          scene: {
            view: [-14, -6, 40, 34],
            maxWidth: 360,
            ground: true,
            objects: [
              { type: 'building', at: [-4, 0], h: 10, w: 8 },
              { type: 'tower', at: [17.32, 0], h: 27.32, w: 2.6 },
            ],
            points: { R: [0, 0], W: [0, 10], Q: [17.32, 0], A: [17.32, 10], P: [17.32, 27.32] },
            labelDir: { R: 's', W: 'nw', Q: 's', A: 'e', P: 'ne' },
            segs: [
              { id: 'wa', a: 'W', b: 'A', kind: 'dash', color: 'adj', label: 'd', labelSide: 1 },
              { id: 'ap', a: 'A', b: 'P', color: 'opp', label: 'd tan α', labelSide: -1 },
              { id: 'aq', a: 'Q', b: 'A', color: 'accent', label: 'h', labelSide: -1 },
              { id: 'rw', a: 'R', b: 'W', color: 'ink', label: 'h', labelSide: 1 },
              { a: 'W', b: 'P', kind: 'sight', color: 'hyp' },
              { a: 'W', b: 'Q', kind: 'sight', color: 'hyp' },
            ],
            right: [{ at: 'A', a: 'W', b: 'P' }],
            angles: [
              { at: 'W', from: 'A', to: 'P', label: 'α', r: 34 },
              { at: 'W', from: 'A', to: 'Q', label: 'β', r: 26 },
            ],
          },
          caption: 'From a window W at height h: elevation α to the top P, depression β to the foot Q',
        },
        {
          t: 'p',
          text: 'Draw the horizontal from the eye $W$ to the other building, meeting it at $A$. It cuts the building into two parts, and the picture into two right triangles that **share the side $WA = d$**:',
        },
        {
          t: 'list',
          items: [
            'Below the horizontal: $AQ = h$, the height of the eye. From the angle of depression, $\\tan\\beta = \\dfrac{h}{d}$.',
            'Above the horizontal: from the angle of elevation, $AP = d\\tan\\alpha$.',
            'The whole height: $PQ = h + d\\tan\\alpha$.',
          ],
        },
        {
          t: 'note',
          tone: 'tip',
          text: 'Usually you know $h$ and $\\beta$. So find $d$ from the lower triangle first, then use it in the upper one.',
        },
      ],
      check: {
        id: 'l6-c-split',
        type: 'numeric',
        prompt:
          'From a window 10 m above the ground, the angle of depression of the foot of a tower is $45^\\circ$ and the angle of elevation of its top is $60^\\circ$. Find the height of the tower. ($\\sqrt3 = 1.732$)',
        parts: [{ answer: { value: 10 + 10 * R3, unit: 'm', display: '27.32 m' } }],
        hints: ['First find $d$ from the $45^\\circ$ triangle.'],
        solution: [
          { math: '\\tan 45^\\circ = \\frac{10}{d} \\;\\Rightarrow\\; d = 10' },
          { math: 'AP = 10\\tan 60^\\circ = 10\\sqrt3 = 17.32 \\;\\Rightarrow\\; PQ = 10 + 17.32 = 27.32 \\text{ m}' },
        ],
      },
    },
    {
      id: 'reflection',
      title: 'Clouds and their reflections',
      blocks: [
        {
          t: 'p',
          text: 'A still lake acts like a mirror. The reflection of a cloud appears **as far below the water as the cloud is above it**. If the cloud is at height $H$ and you stand $h$ above the lake:',
        },
        {
          t: 'list',
          items: [
            'the cloud is $H - h$ above your eye: $\\tan\\alpha = \\dfrac{H - h}{d}$ (elevation);',
            'its reflection is $H + h$ below your eye: $\\tan\\beta = \\dfrac{H + h}{d}$ (depression).',
          ],
        },
        {
          t: 'p',
          text: 'Divide one by the other to get rid of $d$, or solve the two equations together. This is Exercise 6.4 Q3 and Exercise 6.5 Q15.',
        },
      ],
      check: {
        id: 'l6-c-reflect',
        type: 'numeric',
        prompt:
          'From a point 20 m above a lake, the angle of elevation of a cloud is $30^\\circ$ and the angle of depression of its reflection is $60^\\circ$. How high is the cloud above the lake?',
        parts: [{ answer: { value: 40, unit: 'm', display: '40 m' } }],
        hints: ['$\\dfrac{\\tan 60^\\circ}{\\tan 30^\\circ} = \\dfrac{H + 20}{H - 20}$.'],
        solution: [
          {
            math: '\\frac{H + 20}{H - 20} = \\frac{\\sqrt3}{1/\\sqrt3} = 3 \\;\\Rightarrow\\; H + 20 = 3H - 60 \\;\\Rightarrow\\; H = 40 \\text{ m}',
          },
        ],
      },
    },
    {
      id: 'checks',
      title: 'Before you calculate',
      blocks: [
        {
          t: 'list',
          ordered: true,
          items: [
            '**Mark the eye.** Every angle is measured at the observer’s eye, from the horizontal through it.',
            '**Draw the horizontal across** to the other object. It is the side both triangles share.',
            '**Start with the triangle you can solve.** It has one known length and one known angle.',
            '**Add the parts.** The other object is the part above the horizontal plus the part below it.',
            '**Sanity check.** The object you look up at must be taller than your eye; a steeper angle means a bigger height for the same distance.',
          ],
        },
      ],
    },
  ],

  explore: [
    {
      widget: 'lookout-lab',
      title: 'Look up, look down',
      intro:
        'Change the height of the eye, the distance and the height of the tower. The horizontal from the eye splits the tower into two parts, one for each angle.',
      tryThis: [
        'Make the tower exactly twice as tall as the eye. What do you notice about $\\alpha$ and $\\beta$?',
        'Keep the tower the same and walk the distance up. Which angle changes faster?',
        'Switch to **Cloud and its reflection**. Why is $\\beta$ always bigger than $\\alpha$?',
      ],
    },
  ],

  examples: [
    {
      id: 'ex-6-31',
      source: 'Example 6.31',
      title: 'A cable tower from a building',
      prompt:
        'From the top of a 12 m high building, the angle of elevation of the top of a cable tower is $60^\\circ$ and the angle of depression of its foot is $30^\\circ$. Determine the height of the tower.',
      figure: {
        view: [-8, -5, 28, 51],
        maxWidth: 300,
        ground: true,
        objects: [{ type: 'building', at: [-3, 0], h: 12, w: 6 }],
        points: { A: [0, 0], O: [0, 12], P2: [20.78, 0], M: [20.78, 12], P: [20.78, 48] },
        names: { P2: 'P′' },
        labelDir: { A: 's', O: 'nw', P2: 's', M: 'e', P: 'ne' },
        segs: [
          { id: 'om', a: 'O', b: 'M', kind: 'dash', color: 'adj', labelSide: 1 },
          { id: 'mp', a: 'M', b: 'P', color: 'opp', label: 'h − 12', labelSide: -1 },
          { id: 'mp2', a: 'P2', b: 'M', color: 'accent', label: '12 m', labelSide: -1 },
          { id: 'oa', a: 'A', b: 'O', color: 'ink', label: '12 m', labelSide: 1 },
          { id: 'op', a: 'O', b: 'P', kind: 'sight', color: 'hyp' },
          { id: 'op2', a: 'O', b: 'P2', kind: 'sight', color: 'hyp' },
        ],
        right: [{ at: 'M', a: 'O', b: 'P' }],
        angles: [
          { id: 'e', at: 'O', from: 'M', to: 'P', label: '60°', r: 30 },
          { id: 'd', at: 'O', from: 'M', to: 'P2', label: '30°', r: 40 },
        ],
      },
      steps: [
        {
          text: 'Let the tower be $PP′ = h$. Draw $OM$ perpendicular to it. Then $MP′ = OA = 12$ m and $MP = h - 12$.',
          highlight: ['om', 'mp', 'mp2'],
        },
        {
          text: 'Lower triangle $OMP′$, angle of depression $30^\\circ$:',
          math: '\\tan 30^\\circ = \\frac{12}{OM} \\;\\Rightarrow\\; OM = 12\\sqrt3',
          highlight: ['mp2', 'om', 'd'],
        },
        {
          text: 'Upper triangle $OMP$, angle of elevation $60^\\circ$:',
          math: '\\tan 60^\\circ = \\frac{h - 12}{OM} \\;\\Rightarrow\\; h - 12 = 12\\sqrt3 \\times \\sqrt3 = 36',
          highlight: ['mp', 'om', 'e'],
        },
        { math: 'h = 36 + 12 = 48' },
      ],
      answer: 'The cable tower is 48 m high.',
    },
    {
      id: 'ex-6-32',
      source: 'Example 6.32',
      title: 'A pole on a tower',
      prompt:
        'A pole 5 m high is fixed on the top of a tower. The angle of elevation of the top of the pole observed from a point A on the ground is $60^\\circ$ and the angle of depression to the point A from the top of the tower is $45^\\circ$. Find the height of the tower. ($\\sqrt3 = 1.732$)',
      figure: {
        view: [-2.4, -1.6, 10.4, 13],
        maxWidth: 300,
        ground: true,
        objects: [{ type: 'tower', at: [6.83, 0], h: 6.83, w: 1.2 }],
        points: { A: [0, 0], B: [6.83, 0], C: [6.83, 6.83], D: [6.83, 11.83], X: [1.2, 6.83] },
        labelDir: { A: 's', B: 's', C: 'e', D: 'ne', X: 'w' },
        segs: [
          { id: 'cx', a: 'C', b: 'X', kind: 'dash', color: 'muted' },
          { id: 'ab', a: 'A', b: 'B', color: 'adj', label: 'y', labelSide: -1 },
          { id: 'bc', a: 'B', b: 'C', color: 'opp', label: 'x', labelSide: -1 },
          { id: 'cd', a: 'C', b: 'D', color: 'accent', label: '5 m', labelSide: -1 },
          { id: 'ac', a: 'A', b: 'C', kind: 'sight', color: 'hyp' },
          { id: 'ad', a: 'A', b: 'D', kind: 'sight', color: 'hyp' },
        ],
        right: [{ at: 'B', a: 'A', b: 'D' }],
        angles: [
          { id: 'top', at: 'C', from: 'X', to: 'A', label: '45°', r: 22 },
          { id: 'a45', at: 'A', from: 'B', to: 'C', label: '45°', r: 34 },
          { id: 'a60', at: 'A', from: 'C', to: 'D', label: '', r: 22 },
        ],
      },
      steps: [
        {
          text: 'Let the tower be $BC = x$ and $AB = y$. The depression $\\angle XCA = 45^\\circ$ equals $\\angle BAC$.',
          highlight: ['top', 'a45'],
        },
        {
          text: 'In triangle $ABC$:',
          math: '\\tan 45^\\circ = \\frac{x}{y} \\;\\Rightarrow\\; x = y',
          highlight: ['ab', 'bc'],
        },
        {
          text: 'In triangle $ABD$, with $BD = x + 5$:',
          math: '\\tan 60^\\circ = \\frac{x + 5}{y} \\;\\Rightarrow\\; \\sqrt3\\,x = x + 5',
          highlight: ['ab', 'bc', 'cd', 'a60'],
        },
        { math: 'x = \\frac{5}{\\sqrt3 - 1} = \\frac{5(\\sqrt3 + 1)}{2} = \\frac{5 \\times 2.732}{2} = 6.83' },
      ],
      answer: 'The tower is 6.83 m high.',
    },
    {
      id: 'ex-6-33',
      source: 'Example 6.33',
      title: 'A house across the street',
      prompt:
        'From a window ($h$ metres high above the ground) of a house in a street, the angles of elevation and depression of the top and the foot of another house on the opposite side of the street are $\\theta_1$ and $\\theta_2$ respectively. Show that the height of the opposite house is $h\\left(1 + \\dfrac{\\cot\\theta_2}{\\cot\\theta_1}\\right)$.',
      figure: {
        view: [-4.6, -2, 14, 17],
        maxWidth: 320,
        ground: true,
        objects: [{ type: 'building', at: [-1.6, 0], h: 6, w: 3.2 }],
        points: { R: [0, 0], W: [0, 6], Q: [10.39, 0], A: [10.39, 6], P: [10.39, 14.72] },
        labelDir: { R: 's', W: 'nw', Q: 's', A: 'e', P: 'ne' },
        segs: [
          { id: 'wa', a: 'W', b: 'A', kind: 'dash', color: 'adj', label: 'AW', labelSide: 1 },
          { id: 'ap', a: 'A', b: 'P', color: 'opp', label: 'x', labelSide: -1 },
          { id: 'aq', a: 'Q', b: 'A', color: 'accent', label: 'h', labelSide: -1 },
          { id: 'rw', a: 'R', b: 'W', color: 'ink', label: 'h', labelSide: 1 },
          { id: 'wp', a: 'W', b: 'P', kind: 'sight', color: 'hyp' },
          { id: 'wq', a: 'W', b: 'Q', kind: 'sight', color: 'hyp' },
        ],
        right: [{ at: 'A', a: 'W', b: 'P' }],
        angles: [
          { id: 't1', at: 'W', from: 'A', to: 'P', label: 'θ₁', r: 30 },
          { id: 't2', at: 'W', from: 'A', to: 'Q', label: 'θ₂', r: 24 },
        ],
      },
      steps: [
        {
          text: 'Let $PQ$ be the opposite house and $PA = x$. Then $AQ = h$, the height of the window.',
          highlight: ['ap', 'aq'],
        },
        {
          text: 'Upper triangle $PAW$:',
          math: '\\tan\\theta_1 = \\frac{x}{AW} \\;\\Rightarrow\\; AW = x\\cot\\theta_1 \\;\\;(1)',
          highlight: ['ap', 'wa', 't1'],
        },
        {
          text: 'Lower triangle $QAW$:',
          math: '\\tan\\theta_2 = \\frac{h}{AW} \\;\\Rightarrow\\; AW = h\\cot\\theta_2 \\;\\;(2)',
          highlight: ['aq', 'wa', 't2'],
        },
        {
          text: 'From (1) and (2):',
          math: 'x\\cot\\theta_1 = h\\cot\\theta_2 \\;\\Rightarrow\\; x = \\frac{h\\cot\\theta_2}{\\cot\\theta_1}',
        },
        { math: 'PQ = x + h = h\\left(1 + \\frac{\\cot\\theta_2}{\\cot\\theta_1}\\right)' },
      ],
      answer: 'Proved. The street width $AW$ links the two triangles.',
    },
  ],

  practice: [
    {
      id: 'ex64-1',
      source: 'Exercise 6.4 · Q1',
      type: 'numeric',
      prompt:
        'From the top of a tree of height 13 m, the angles of elevation and depression of the top and bottom of another tree are $45^\\circ$ and $30^\\circ$ respectively. Find the height of the second tree. ($\\sqrt3 = 1.732$)',
      figure: {
        view: [-6, -4, 28, 39],
        maxWidth: 280,
        ground: true,
        objects: [
          { type: 'tree', at: [0, 0], h: 13 },
          { type: 'tree', at: [22.52, 0], h: 35.52 },
        ],
        points: { B: [0, 0], A: [0, 13], D: [22.52, 0], M: [22.52, 13], C: [22.52, 35.52] },
        labelDir: { B: 's', A: 'nw', D: 's', M: 'e', C: 'ne' },
        segs: [
          { a: 'A', b: 'M', kind: 'dash', color: 'adj', label: 'd', labelSide: 1 },
          { a: 'M', b: 'C', color: 'opp', labelSide: -1 },
          { a: 'D', b: 'M', color: 'accent', label: '13 m', labelSide: -1 },
          { a: 'A', b: 'C', kind: 'sight', color: 'hyp' },
          { a: 'A', b: 'D', kind: 'sight', color: 'hyp' },
        ],
        angles: [
          { at: 'A', from: 'M', to: 'C', label: '45°', r: 22 },
          { at: 'A', from: 'M', to: 'D', label: '30°', r: 32 },
        ],
      },
      parts: [{ answer: { value: 13 + 13 * R3, unit: 'm', display: '35.52 m' } }],
      hints: [
        'From the $30^\\circ$ depression, $d = \\dfrac{13}{\\tan 30^\\circ}$.',
        'With $45^\\circ$, the part above the horizontal equals $d$.',
      ],
      solution: [
        { math: 'd = \\frac{13}{\\tan 30^\\circ} = 13\\sqrt3 = 22.52 \\text{ m}' },
        { math: '\\text{above eye level: } d\\tan 45^\\circ = 22.52 \\text{ m}' },
        { math: '\\text{second tree} = 13 + 22.52 = 35.52 \\text{ m}' },
      ],
    },
    {
      id: 'ex64-2',
      source: 'Exercise 6.4 · Q2',
      type: 'numeric',
      prompt:
        'A man is standing on the deck of a ship, which is 40 m above water level. He observes the angle of elevation of the top of a hill as $60^\\circ$ and the angle of depression of the base of the hill as $30^\\circ$. Calculate the distance of the hill from the ship and the height of the hill. ($\\sqrt3 = 1.732$)',
      parts: [
        { label: 'Distance of the hill', answer: { value: 40 * R3, unit: 'm', display: '69.28 m' } },
        { label: 'Height of the hill', answer: { value: 160, unit: 'm', display: '160 m' } },
      ],
      hints: ['The depression gives the distance: $d = \\dfrac{40}{\\tan 30^\\circ}$.'],
      solution: [
        { math: 'd = \\frac{40}{\\tan 30^\\circ} = 40\\sqrt3 = 69.28 \\text{ m}' },
        { math: '\\text{above the deck: } d\\tan 60^\\circ = 40\\sqrt3 \\times \\sqrt3 = 120 \\text{ m}' },
        { math: '\\text{height of the hill} = 40 + 120 = 160 \\text{ m}' },
      ],
    },
    {
      id: 'ex64-3',
      source: 'Exercise 6.4 · Q3',
      type: 'proof',
      prompt:
        'The angle of elevation of a cloud from a point $h$ metres above a lake is $\\theta_1$, and the angle of depression of its reflection in the lake is $\\theta_2$. Let the cloud be $H$ m above the lake, and $d$ the horizontal distance to it. Choose the reason for each step.',
      toProve: '$H = \\dfrac{h(\\tan\\theta_1 + \\tan\\theta_2)}{\\tan\\theta_2 - \\tan\\theta_1}$',
      steps: [
        {
          statement: 'The cloud is $H - h$ above the eye, and its reflection is $H + h$ below it',
          reason: 'The reflection is as far below the lake as the cloud is above it',
          choices: [
            'The reflection is as far below the lake as the cloud is above it',
            'The reflection is at the level of the lake',
            'The angles of elevation and depression are equal',
          ],
        },
        {
          statement: '$\\tan\\theta_1 = \\dfrac{H - h}{d}$ and $\\tan\\theta_2 = \\dfrac{H + h}{d}$',
          reason: 'tan = opposite ÷ adjacent in each right triangle',
          choices: [
            'tan = opposite ÷ adjacent in each right triangle',
            'sin = opposite ÷ hypotenuse in each right triangle',
            'Alternate angles',
          ],
        },
        { statement: '$d\\tan\\theta_1 = H - h$ and $d\\tan\\theta_2 = H + h$', reason: 'Multiply both sides by $d$' },
        {
          statement: '$d(\\tan\\theta_2 - \\tan\\theta_1) = 2h$ and $d(\\tan\\theta_1 + \\tan\\theta_2) = 2H$',
          reason: 'Subtract the two equations, and add them',
          choices: ['Subtract the two equations, and add them', 'Multiply the two equations', 'Square both equations'],
        },
        {
          statement:
            '$\\dfrac{H}{h} = \\dfrac{\\tan\\theta_1 + \\tan\\theta_2}{\\tan\\theta_2 - \\tan\\theta_1}$, so $H = \\dfrac{h(\\tan\\theta_1 + \\tan\\theta_2)}{\\tan\\theta_2 - \\tan\\theta_1}$',
          reason: 'Divide the second equation by the first; $d$ cancels',
          choices: [
            'Divide the second equation by the first; $d$ cancels',
            'Add the two equations',
            '$\\tan\\theta_1 = \\tan\\theta_2$',
          ],
        },
      ],
      hints: ['Draw it: the eye, the cloud above, and the reflection below the water, all on one vertical line.'],
      solution: [],
    },
    {
      id: 'ex64-4',
      source: 'Exercise 6.4 · Q4',
      type: 'numeric',
      prompt:
        'The angle of elevation of the top of a cell phone tower from the foot of a high apartment is $60^\\circ$, and the angle of depression of the foot of the tower from the top of the apartment is $30^\\circ$. If the apartment is 50 m high, find the height of the tower. The minimum height allowed by radiation norms is 120 m: does the tower meet it?',
      figure: {
        view: [-14, -10, 100, 160],
        maxWidth: 260,
        ground: true,
        objects: [
          { type: 'building', at: [-6, 0], h: 50, w: 12 },
          { type: 'tower', at: [86.6, 0], h: 150, w: 6 },
        ],
        points: { F: [0, 0], A: [0, 50], B: [86.6, 0], T: [86.6, 150] },
        labelDir: { F: 's', A: 'nw', B: 's', T: 'ne' },
        segs: [
          { a: 'F', b: 'A', color: 'ink', label: '50 m', labelSide: 1 },
          { a: 'F', b: 'B', color: 'adj', label: 'd', labelSide: -1 },
          { a: 'B', b: 'T', color: 'opp', labelSide: -1 },
          { a: 'F', b: 'T', kind: 'sight', color: 'hyp' },
          { a: 'A', b: 'B', kind: 'sight', color: 'hyp' },
        ],
        angles: [
          { at: 'F', from: 'B', to: 'T', label: '60°', r: 18 },
          { at: 'B', from: 'F', to: 'A', label: '30°', r: 26 },
        ],
      },
      parts: [{ label: 'Height of the tower', answer: { value: 150, unit: 'm', display: '150 m' } }],
      hints: [
        'Both angles here are measured from the ground or the roof of the apartment, not from one eye. The depression from the top of the apartment gives $d$.',
        'Then the elevation from the **foot** of the apartment gives the tower: $d\\tan 60^\\circ$.',
      ],
      solution: [
        { math: '\\tan 30^\\circ = \\frac{50}{d} \\;\\Rightarrow\\; d = 50\\sqrt3' },
        { math: '\\text{tower} = d\\tan 60^\\circ = 50\\sqrt3 \\times \\sqrt3 = 150 \\text{ m}' },
        { text: '150 m is more than 120 m, so **yes**, the tower meets the norms.' },
      ],
    },
    {
      id: 'ex64-5',
      source: 'Exercise 6.4 · Q5',
      type: 'numeric',
      prompt:
        'The angles of elevation and depression of the top and bottom of a lamp post from the top of a 66 m high apartment are $60^\\circ$ and $30^\\circ$ respectively. Find (i) the height of the lamp post, (ii) the difference between the height of the lamp post and the apartment, and (iii) the distance between the lamp post and the apartment. ($\\sqrt3 = 1.732$)',
      parts: [
        { label: '(i) Height of the lamp post', answer: { value: 264, unit: 'm', display: '264 m' } },
        { label: '(ii) Difference in height', answer: { value: 198, unit: 'm', display: '198 m' } },
        { label: '(iii) Distance between them', answer: { value: 66 * R3, unit: 'm', display: '114.31 m' } },
      ],
      hints: ['Start with (iii): the depression of the bottom gives the distance.'],
      solution: [
        { math: 'd = \\frac{66}{\\tan 30^\\circ} = 66\\sqrt3 = 114.31 \\text{ m}' },
        { math: '\\text{above the roof: } d\\tan 60^\\circ = 66\\sqrt3 \\times \\sqrt3 = 198 \\text{ m}' },
        { math: '\\text{lamp post} = 66 + 198 = 264 \\text{ m}, \\qquad \\text{difference} = 198 \\text{ m}' },
      ],
    },
    {
      id: 'ex64-6',
      source: 'Exercise 6.4 · Q6',
      type: 'numeric',
      prompt:
        'Three villagers A, B and C can see each other across a valley. The horizontal distance between A and B is 8 km and between B and C is 12 km. The angle of depression of B from A is $20^\\circ$ and the angle of elevation of C from B is $30^\\circ$. Calculate (i) the vertical height between A and B, (ii) the vertical height between B and C. ($\\tan 20^\\circ = 0.3640$, $\\sqrt3 = 1.732$)',
      figure: {
        view: [-2, -1.2, 21.5, 8.6],
        maxWidth: 480,
        points: { A: [0, 2.91], A1: [8, 2.91], B: [8, 0], C1: [20, 0], C: [20, 6.93] },
        names: { A1: '', C1: '' },
        labelDir: { A: 'nw', A1: 'none', B: 's', C1: 'none', C: 'ne' },
        segs: [
          { a: 'A', b: 'A1', kind: 'dash', color: 'adj', label: '8 km', labelSide: 1 },
          { a: 'A1', b: 'B', color: 'opp', label: '(i)', labelSide: -1 },
          { a: 'B', b: 'C1', kind: 'dash', color: 'adj', label: '12 km', labelSide: -1 },
          { a: 'C1', b: 'C', color: 'opp', label: '(ii)', labelSide: -1 },
          { a: 'A', b: 'B', kind: 'sight', color: 'hyp' },
          { a: 'B', b: 'C', kind: 'sight', color: 'hyp' },
        ],
        angles: [
          { at: 'A', from: 'A1', to: 'B', label: '20°', r: 40 },
          { at: 'B', from: 'C1', to: 'C', label: '30°', r: 36 },
        ],
      },
      parts: [
        { label: '(i) A above B', answer: { value: 8 * 0.364, unit: 'km', display: '2.91 km' } },
        { label: '(ii) C above B', answer: { value: 12 / R3, unit: 'km', display: '6.93 km' } },
      ],
      solution: [
        { math: '\\text{(i) } 8\\tan 20^\\circ = 8 \\times 0.3640 = 2.91 \\text{ km}' },
        { math: '\\text{(ii) } 12\\tan 30^\\circ = \\frac{12}{\\sqrt3} = 4\\sqrt3 = 6.93 \\text{ km}' },
      ],
    },
    {
      id: 'u6-9',
      source: 'Unit Exercise 6 · Q9',
      type: 'numeric',
      prompt:
        'A building and a statue are on opposite sides of a street, 35 m apart. From a point on the roof of the building, the angle of elevation of the top of the statue is $24^\\circ$ and the angle of depression of the base of the statue is $34^\\circ$. Find the height of the statue. ($\\tan 24^\\circ = 0.4452$, $\\tan 34^\\circ = 0.6745$)',
      parts: [{ answer: { value: 35 * (0.4452 + 0.6745), unit: 'm', display: '39.19 m' } }],
      hints: ['The building is $35\\tan 34^\\circ$ high. The statue rises $35\\tan 24^\\circ$ above the roof.'],
      solution: [
        { math: '\\text{below the roof: } 35 \\times 0.6745 = 23.61 \\text{ m}' },
        { math: '\\text{above the roof: } 35 \\times 0.4452 = 15.58 \\text{ m}' },
        { math: '\\text{statue} = 23.61 + 15.58 = 39.19 \\text{ m}' },
      ],
    },
    {
      id: 'l6-p-window',
      source: 'Practice',
      type: 'numeric',
      prompt:
        'From a window 15 m above the ground, the angle of elevation of the top of a building across the road is $30^\\circ$ and the angle of depression of its foot is $45^\\circ$. Find the height of the building. ($\\sqrt3 = 1.732$)',
      parts: [{ answer: { value: 15 + 15 / R3, unit: 'm', display: '23.66 m' } }],
      solution: [
        { math: 'd = \\frac{15}{\\tan 45^\\circ} = 15 \\text{ m}' },
        { math: '\\text{height} = 15 + 15\\tan 30^\\circ = 15 + 8.66 = 23.66 \\text{ m}' },
      ],
    },
  ],

  quiz: [
    {
      id: 'l6-q1',
      type: 'numeric',
      prompt:
        'From the top of a 15 m building, the angle of elevation of the top of a tower is $45^\\circ$ and the angle of depression of its foot is $30^\\circ$. Find the height of the tower. ($\\sqrt3 = 1.732$)',
      parts: [{ answer: { value: 15 + 15 * R3, unit: 'm', display: '40.98 m' } }],
      solution: [
        { math: 'd = \\frac{15}{\\tan 30^\\circ} = 15\\sqrt3 = 25.98' },
        { math: '\\text{tower} = 15 + 25.98 \\tan 45^\\circ = 40.98 \\text{ m}' },
      ],
    },
    {
      id: 'l6-q2',
      source: 'Exercise 6.5 · Q11',
      type: 'mcq',
      prompt:
        'An electric pole subtends an angle of $30^\\circ$ at a point on the same level as its foot. At a second point $b$ metres above the first, the depression of the foot of the pole is $60^\\circ$. The height of the pole (in metres) is',
      options: ['$\\sqrt3\\,b$', '$\\dfrac{b}{3}$', '$\\dfrac{b}{2}$', '$\\dfrac{b}{\\sqrt3}$'],
      correct: 1,
      keepOrder: true,
      solution: [
        { math: '\\tan 60^\\circ = \\frac{b}{d} \\;\\Rightarrow\\; d = \\frac{b}{\\sqrt3}' },
        { math: 'H = d\\tan 30^\\circ = \\frac{b}{\\sqrt3} \\times \\frac{1}{\\sqrt3} = \\frac{b}{3}' },
      ],
    },
    {
      id: 'l6-q3',
      source: 'Exercise 6.5 · Q15',
      type: 'mcq',
      prompt:
        'The angle of elevation of a cloud from a point $h$ metres above a lake is $\\beta$. The angle of depression of its reflection in the lake is $45^\\circ$. The height of the cloud above the lake is',
      options: [
        '$\\dfrac{h(1 + \\tan\\beta)}{1 - \\tan\\beta}$',
        '$\\dfrac{h(1 - \\tan\\beta)}{1 + \\tan\\beta}$',
        '$h\\tan(45^\\circ - \\beta)$',
        'none of these',
      ],
      correct: 0,
      keepOrder: true,
      solution: [
        { math: '\\tan\\beta = \\frac{H - h}{d}, \\qquad \\tan 45^\\circ = 1 = \\frac{H + h}{d}' },
        {
          math: '\\tan\\beta = \\frac{H - h}{H + h} \\;\\Rightarrow\\; H = \\frac{h(1 + \\tan\\beta)}{1 - \\tan\\beta}',
        },
      ],
    },
    {
      id: 'l6-q4',
      type: 'numeric',
      prompt:
        'From a window 8 m above the street, the angle of depression of the foot of the house opposite is $45^\\circ$ and the angle of elevation of its top is $60^\\circ$. How tall is the house? ($\\sqrt3 = 1.732$)',
      parts: [{ answer: { value: 8 + 8 * R3, unit: 'm', display: '21.86 m' } }],
      solution: [{ math: 'd = 8, \\qquad \\text{height} = 8 + 8\\sqrt3 = 8 + 13.86 = 21.86 \\text{ m}' }],
    },
    {
      id: 'l6-q5',
      type: 'mcq',
      prompt:
        'You look up at the top of a tower and down at its foot from a window. Which length is shared by the two right triangles?',
      options: [
        'The horizontal distance from the window to the tower',
        'The height of the window',
        'The height of the tower',
        'The line of sight to the top',
      ],
      correct: 0,
      solution: [
        {
          text: 'The horizontal from the window to the tower is a side of both triangles, the one above it and the one below it.',
        },
      ],
    },
  ],
}
