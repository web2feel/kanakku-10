import type { Lesson } from '../types'

const R3 = Math.sqrt(3)

export const lesson4: Lesson = {
  id: 'elevation',
  number: 4,
  title: 'Heights and distances: angle of elevation',
  summary: 'Line of sight, angle of elevation, choosing the right ratio, and one- and two-triangle problems.',
  pages: '250–257',
  status: 'ready',

  learn: [
    {
      id: 'idea',
      title: 'Measuring without climbing',
      blocks: [
        {
          t: 'p',
          text: 'How tall is the temple gopuram? How wide is the river? You cannot run a tape up a tower or across water, but you can stand on the ground, measure one distance, and measure one angle. A right triangle does the rest.',
        },
        {
          t: 'p',
          text: 'This is the most practical use of trigonometry. Surveyors, engineers and navigators do exactly this every day, and it is what this part of the chapter is about.',
        },
      ],
    },
    {
      id: 'words',
      title: 'The words you need',
      blocks: [
        {
          t: 'figure',
          scene: {
            view: [-1.5, -0.8, 15, 9.2],
            maxWidth: 480,
            ground: true,
            objects: [
              { type: 'person', at: [0, 0], h: 1.7 },
              { type: 'tree', at: [12, 0], h: 8 },
            ],
            points: { E: [0, 1.7], T: [12, 8], H: [12, 1.7] },
            names: { E: 'Eye', T: 'Top', H: '' },
            labelDir: { E: 'w', T: 'ne', H: 'none' },
            segs: [
              { a: 'E', b: 'T', kind: 'sight', color: 'hyp', label: 'line of sight', labelSide: 1 },
              { a: 'E', b: 'H', kind: 'dash', color: 'adj', label: 'horizontal line', labelSide: -1 },
            ],
            angles: [{ at: 'E', from: 'H', to: 'T', label: 'angle of elevation', r: 42 }],
          },
          caption: 'Looking up at the top of a tree',
        },
        {
          t: 'list',
          items: [
            "**Line of sight**: the line from the observer's eye to the point being looked at.",
            "**Horizontal line**: the level line through the observer's eye.",
            '**Angle of elevation**: the angle between the line of sight and the horizontal when the object is **above** eye level. You raise your head to look at it.',
          ],
        },
        {
          t: 'note',
          text: 'Angles are measured with instruments. A **theodolite** has a telescope and two graduated wheels at right angles, for horizontal and vertical angles. A **clinometer** is a simpler device for angles of elevation and depression. You can make one with a protractor, a straw and a thread.',
        },
      ],
      check: {
        id: 'l4-c-words',
        type: 'mcq',
        prompt:
          'You look up at a kite in the sky. The angle between your line of sight and the horizontal is called the',
        options: ['angle of depression', 'angle of elevation', 'line of sight', 'right angle'],
        correct: 1,
        solution: [{ text: 'The kite is above eye level, so it is an **angle of elevation**.' }],
      },
    },
    {
      id: 'rules',
      title: 'Two facts worth remembering',
      blocks: [
        {
          t: 'list',
          ordered: true,
          items: [
            'From the same point, a **taller** object has a **bigger** angle of elevation. If $h_1 > h_2$ then $\\alpha > \\beta$.',
            'As you walk **towards** the foot of a tower, the angle of elevation of its top **increases**. If $d_2 < d_1$ then $\\beta > \\alpha$.',
          ],
        },
        {
          t: 'figure',
          scene: {
            view: [-1, -1.2, 11.5, 7],
            maxWidth: 420,
            ground: true,
            objects: [{ type: 'tower', at: [10, 0], h: 6 }],
            points: { C: [0, 0], D: [6, 0], B: [10, 0], A: [10, 6] },
            labelDir: { C: 's', D: 's', B: 'se', A: 'ne' },
            segs: [
              { a: 'C', b: 'A', kind: 'sight', color: 'hyp' },
              { a: 'D', b: 'A', kind: 'sight', color: 'accent' },
              { a: 'C', b: 'B', color: 'adj' },
              { a: 'B', b: 'A', color: 'opp' },
            ],
            angles: [
              { at: 'C', from: 'B', to: 'A', label: 'α', r: 34 },
              { at: 'D', from: 'B', to: 'A', label: 'β', r: 28 },
            ],
          },
          caption: 'Walking from C to D, closer to the tower, the angle grows from α to β',
        },
        {
          t: 'note',
          tone: 'tip',
          text: 'Use these facts to sanity-check answers. If you walk closer and your answer says the angle got smaller, something has gone wrong.',
        },
      ],
      check: {
        id: 'l4-c-rules',
        type: 'mcq',
        prompt:
          'Ravi is 40 m from a tower and Meena is 25 m from the same tower, on the same side. Who sees the top at a larger angle of elevation?',
        options: ['Ravi', 'Meena', 'Both see the same angle', 'It depends on the height of the tower'],
        correct: 1,
        solution: [
          {
            text: 'Meena is closer to the foot of the tower, so her angle of elevation is larger, whatever the height of the tower.',
          },
        ],
      },
    },
    {
      id: 'which',
      title: 'Which ratio should I use?',
      blocks: [
        {
          t: 'p',
          text: 'Every problem gives you an angle and one length, and asks for another length. Look at which two sides are involved, the one you know and the one you want:',
        },
        {
          t: 'table',
          head: ['You know / want', 'Sides', 'Use'],
          rows: [
            [
              'height and horizontal distance',
              '{{opp:opposite}} and {{adj:adjacent}}',
              '$\\tan\\theta = \\dfrac{\\text{height}}{\\text{distance}}$',
            ],
            [
              'height and line of sight (a string, ladder or wire)',
              '{{opp:opposite}} and {{hyp:hypotenuse}}',
              '$\\sin\\theta = \\dfrac{\\text{height}}{\\text{line of sight}}$',
            ],
            [
              'horizontal distance and line of sight',
              '{{adj:adjacent}} and {{hyp:hypotenuse}}',
              '$\\cos\\theta = \\dfrac{\\text{distance}}{\\text{line of sight}}$',
            ],
          ],
        },
        {
          t: 'note',
          tone: 'think',
          text: 'Most height-and-distance problems use **tan**, because towers and buildings come with a height and a distance along the ground. Reach for sin or cos when a string, ladder or rope (the hypotenuse) is involved.',
        },
      ],
      check: {
        id: 'l4-c-which',
        type: 'mcq',
        prompt:
          'A kite string is 60 m long and makes an angle of $30^\\circ$ with the ground. To find the height of the kite, which ratio do you use?',
        options: ['$\\tan 30^\\circ$', '$\\sin 30^\\circ$', '$\\cos 30^\\circ$', '$\\sec 30^\\circ$'],
        correct: 1,
        solution: [
          { text: 'You know the string (hypotenuse) and want the height (opposite), so use sin.' },
          { math: '\\sin 30^\\circ = \\frac{h}{60} \\Rightarrow h = 60 \\times \\tfrac12 = 30\\text{ m}' },
        ],
      },
    },
    {
      id: 'method',
      title: 'A method that works every time',
      blocks: [
        {
          t: 'list',
          ordered: true,
          items: [
            '**Draw the figure.** A vertical line for the tower, a horizontal line for the ground, and the line of sight. Mark the right angle.',
            '**Label** the known lengths and angles. Call the unknown $h$ or $x$.',
            '**Pick the ratio** that connects the known side and the unknown side for the given angle.',
            '**Solve** and write the unit. If the question says $\\sqrt3 = 1.732$, use it at the end.',
          ],
        },
        {
          t: 'p',
          text: '**Two-triangle problems.** When a question gives two angles, there are two right triangles that share a side, usually the height. Write one equation for each triangle, then connect them through the shared side. Examples 6.21 and 6.22 show this.',
        },
        {
          t: 'note',
          tone: 'tip',
          text: 'Keep $\\sqrt3$ as it is until the last line. $h = 16\\sqrt3$ is exact; $27.71$ is rounded. The book usually accepts either, but rounding early can push the final answer off.',
        },
      ],
    },
    {
      id: 'bearings',
      title: 'Bearings (for Example 6.24)',
      blocks: [
        {
          t: 'p',
          text: 'A **bearing** gives a direction as an angle measured **clockwise from North**. A bearing of $24^\\circ$ means: face North, then turn $24^\\circ$ towards East.',
        },
        {
          t: 'p',
          text: 'To split a journey into "how far North" and "how far East", draw a right triangle with a North line and an East line. Then cos gives the side next to the angle and sin gives the side opposite it.',
        },
      ],
    },
  ],

  explore: [
    {
      widget: 'elevation-simulator',
      title: 'Elevation simulator',
      intro:
        'Drag the observer along the ground, or use the sliders. The angle of elevation and $\\tan\\theta$ update as you move.',
      tryThis: [
        'Walk towards the tower. Does the angle increase or decrease?',
        'Find a position where the angle is exactly $45^\\circ$. What do you notice about the height and the distance?',
        'Set the tower to 30 m and find where the angle is about $30^\\circ$. Check it: $30 \\div \\tan 30^\\circ = 30\\sqrt3 \\approx 52$ m.',
        'Tick "Show the angle of depression". Why are the two angles always equal? (You will use this in the next lesson.)',
      ],
    },
    {
      widget: 'ratio-picker',
      title: 'Which ratio?',
      intro: 'Choose the side you know and the side you want. The tool shows which ratio links them.',
    },
  ],

  examples: [
    {
      id: 'ex-6-18',
      source: 'Example 6.18',
      title: 'Finding an angle from two sides',
      prompt:
        'Calculate $\\angle BAC$ in the given triangles: (i) $BC = 4$ cm, $AB = 5$ cm; (ii) $BC = 8$ cm, $AB = 3$ cm. (Use $\\tan 38.7^\\circ = 0.8011$ and $\\tan 69.4^\\circ = 2.6604$.)',
      figure: {
        view: [-0.8, -0.9, 11.5, 8.6],
        maxWidth: 420,
        points: { B: [0, 0], A: [5, 0], C: [0, 4], B2: [8, 0], A2: [11, 0], C2: [8, 8] },
        names: { B2: 'B', A2: 'A', C2: 'C' },
        labelDir: { B: 'sw', A: 'se', C: 'nw', B2: 'sw', A2: 'se', C2: 'nw' },
        segs: [
          { id: 'bc', a: 'B', b: 'C', color: 'opp', label: '4 cm', labelSide: 1 },
          { id: 'ab', a: 'B', b: 'A', color: 'adj', label: '5 cm', labelSide: -1 },
          { a: 'A', b: 'C', color: 'hyp' },
          { id: 'bc2', a: 'B2', b: 'C2', color: 'opp', label: '8 cm', labelSide: 1 },
          { id: 'ab2', a: 'B2', b: 'A2', color: 'adj', label: '3 cm', labelSide: -1 },
          { a: 'A2', b: 'C2', color: 'hyp' },
        ],
        right: [
          { at: 'B', a: 'A', b: 'C' },
          { at: 'B2', a: 'A2', b: 'C2' },
        ],
        angles: [
          { id: 'a1', at: 'A', from: 'B', to: 'C', label: 'θ', r: 26 },
          { id: 'a2', at: 'A2', from: 'B2', to: 'C2', label: 'θ', r: 22 },
        ],
      },
      steps: [
        {
          text: '(i) The sides opposite and adjacent to $\\theta$ are known, so use tan.',
          math: '\\tan\\theta = \\frac{BC}{AB} = \\frac{4}{5} = 0.8',
          highlight: ['bc', 'ab', 'a1'],
        },
        { text: '$\\tan 38.7^\\circ = 0.8011 \\approx 0.8$, so $\\angle BAC = 38.7^\\circ$.', highlight: ['a1'] },
        {
          text: '(ii) Again opposite and adjacent are known.',
          math: '\\tan\\theta = \\frac{8}{3} \\approx 2.66',
          highlight: ['bc2', 'ab2', 'a2'],
        },
        { text: '$\\tan 69.4^\\circ = 2.6604 \\approx 2.66$, so $\\angle BAC = 69.4^\\circ$.', highlight: ['a2'] },
      ],
      answer: '(i) $38.7^\\circ$  (ii) $69.4^\\circ$',
    },
    {
      id: 'ex-6-19',
      source: 'Example 6.19',
      title: 'Height of a tower',
      prompt:
        'A tower stands vertically on the ground. From a point on the ground 48 m away from the foot of the tower, the angle of elevation of the top of the tower is $30^\\circ$. Find the height of the tower.',
      figure: {
        view: [-4, -4, 54, 32],
        maxWidth: 520,
        ground: true,
        objects: [{ type: 'tower', at: [48, 0], h: 27.7 }],
        points: { R: [0, 0], Q: [48, 0], P: [48, 27.71] },
        labelDir: { R: 'sw', Q: 'se', P: 'ne' },
        segs: [
          { id: 'rq', a: 'R', b: 'Q', color: 'adj', label: '48 m', labelSide: -1 },
          { id: 'qp', a: 'Q', b: 'P', color: 'opp', label: 'h', labelSide: -1 },
          { id: 'rp', a: 'R', b: 'P', kind: 'sight', color: 'hyp' },
        ],
        right: [{ at: 'Q', a: 'R', b: 'P' }],
        angles: [{ id: 'r', at: 'R', from: 'Q', to: 'P', label: '30°', r: 40 }],
      },
      steps: [
        {
          text: 'Let $PQ = h$ be the tower and $R$ the observer. In right triangle $PQR$, $\\angle PRQ = 30^\\circ$ and $QR = 48$ m.',
          highlight: ['rq', 'r'],
        },
        {
          text: 'We know the adjacent side and want the opposite side, so use tan.',
          math: '\\tan 30^\\circ = \\frac{PQ}{QR} = \\frac{h}{48}',
          highlight: ['qp', 'rq'],
        },
        {
          math: '\\frac{1}{\\sqrt3} = \\frac{h}{48} \\;\\Rightarrow\\; h = \\frac{48}{\\sqrt3} = \\frac{48\\sqrt3}{3} = 16\\sqrt3',
          highlight: ['qp'],
        },
      ],
      answer: 'The tower is $16\\sqrt3$ m high (about 27.71 m).',
    },
    {
      id: 'ex-6-20',
      source: 'Example 6.20',
      title: 'Length of a kite string',
      prompt:
        'A kite is flying at a height of 75 m above the ground. The string is tied to a point on the ground and makes an angle of $60^\\circ$ with the ground. Find the length of the string, assuming there is no slack.',
      figure: {
        view: [-14, -6, 54, 84],
        maxWidth: 300,
        ground: true,
        objects: [{ type: 'kite', at: [0, 75], h: 0 }],
        points: { B: [0, 0], C: [43.3, 0], A: [0, 75] },
        labelDir: { B: 'sw', C: 'se', A: 'w' },
        segs: [
          { id: 'ab', a: 'B', b: 'A', color: 'opp', label: '75 m', labelSide: -1, kind: 'dash' },
          { id: 'bc', a: 'B', b: 'C', color: 'adj' },
          { id: 'ac', a: 'C', b: 'A', color: 'hyp', label: 'string', labelSide: -1 },
        ],
        right: [{ at: 'B', a: 'C', b: 'A' }],
        angles: [{ id: 'c', at: 'C', from: 'B', to: 'A', label: '60°', r: 30 }],
      },
      steps: [
        {
          text: 'Let $AB = 75$ m be the height of the kite and $AC$ the string. $\\angle ACB = 60^\\circ$.',
          highlight: ['ab', 'c'],
        },
        {
          text: 'We know the opposite side and want the hypotenuse, so use sin.',
          math: '\\sin 60^\\circ = \\frac{AB}{AC} = \\frac{75}{AC}',
          highlight: ['ab', 'ac'],
        },
        {
          math: '\\frac{\\sqrt3}{2} = \\frac{75}{AC} \\;\\Rightarrow\\; AC = \\frac{150}{\\sqrt3} = \\frac{150\\sqrt3}{3} = 50\\sqrt3',
          highlight: ['ac'],
        },
      ],
      answer: 'The string is $50\\sqrt3$ m long (about 86.6 m).',
    },
    {
      id: 'ex-6-21',
      source: 'Example 6.21',
      title: 'Two ships on either side of a lighthouse',
      prompt:
        'Two ships are sailing on either side of a lighthouse. The angles of elevation of the top of the lighthouse from the ships are $30^\\circ$ and $45^\\circ$. If the lighthouse is 200 m high, find the distance between the two ships. ($\\sqrt3 = 1.732$)',
      figure: {
        view: [-375, -40, 225, 235],
        maxWidth: 560,
        water: true,
        objects: [
          { type: 'lighthouse', at: [0, 0], h: 200, w: 26 },
          { type: 'ship', at: [-346.4, 0], h: 0 },
          { type: 'ship', at: [200, 0], h: 0 },
        ],
        points: { C: [-346.4, 0], A: [0, 0], D: [200, 0], B: [0, 200] },
        labelDir: { C: 's', A: 's', D: 's', B: 'n' },
        segs: [
          { id: 'ab', a: 'A', b: 'B', color: 'opp', label: '200 m', labelSide: 1 },
          { id: 'ac', a: 'C', b: 'A', color: 'adj', labelSide: -1 },
          { id: 'ad', a: 'A', b: 'D', color: 'adj', labelSide: -1 },
          { id: 'cb', a: 'C', b: 'B', kind: 'sight', color: 'hyp' },
          { id: 'db', a: 'D', b: 'B', kind: 'sight', color: 'hyp' },
        ],
        right: [{ at: 'A', a: 'D', b: 'B' }],
        angles: [
          { id: 'c', at: 'C', from: 'A', to: 'B', label: '30°', r: 46 },
          { id: 'd', at: 'D', from: 'A', to: 'B', label: '45°', r: 34 },
        ],
      },
      steps: [
        {
          text: 'Let $AB = 200$ m be the lighthouse and $C$, $D$ the ships. There are two right triangles, $BAC$ and $BAD$, sharing the side $AB$.',
          highlight: ['ab'],
        },
        {
          text: 'In $\\triangle BAC$:',
          math: '\\tan 30^\\circ = \\frac{AB}{AC} \\;\\Rightarrow\\; \\frac{1}{\\sqrt3} = \\frac{200}{AC} \\;\\Rightarrow\\; AC = 200\\sqrt3',
          highlight: ['ab', 'ac', 'c'],
        },
        {
          text: 'In $\\triangle BAD$:',
          math: '\\tan 45^\\circ = \\frac{AB}{AD} \\;\\Rightarrow\\; 1 = \\frac{200}{AD} \\;\\Rightarrow\\; AD = 200',
          highlight: ['ab', 'ad', 'd'],
        },
        {
          text: 'The ships are on opposite sides, so add the two distances.',
          math: 'CD = AC + AD = 200\\sqrt3 + 200 = 200(\\sqrt3 + 1)',
          highlight: ['ac', 'ad'],
        },
        { math: '= 200 \\times 2.732 = 546.4' },
      ],
      answer: 'The ships are 546.4 m apart.',
    },
    {
      id: 'ex-6-22',
      source: 'Example 6.22',
      title: 'A tower on top of a building',
      prompt:
        'From a point on the ground, the angles of elevation of the bottom and top of a tower fixed on top of a 30 m high building are $45^\\circ$ and $60^\\circ$. Find the height of the tower. ($\\sqrt3 = 1.732$)',
      figure: {
        view: [-14, -4, 38, 56],
        maxWidth: 380,
        ground: true,
        objects: [
          { type: 'building', at: [-5, 0], h: 30, w: 10 },
          { type: 'tower', at: [0, 30], h: 21.96, w: 3 },
        ],
        points: { B: [0, 0], A: [0, 30], C: [0, 51.96], P: [30, 0] },
        labelDir: { B: 's', A: 'e', C: 'n', P: 'se' },
        segs: [
          { id: 'ab', a: 'B', b: 'A', color: 'opp', label: '30 m', labelSide: -1 },
          { id: 'ac', a: 'A', b: 'C', color: 'accent', label: 'h', labelSide: -1 },
          { id: 'bp', a: 'B', b: 'P', color: 'adj' },
          { id: 'pa', a: 'P', b: 'A', kind: 'sight', color: 'hyp' },
          { id: 'pc', a: 'P', b: 'C', kind: 'sight', color: 'hyp' },
        ],
        right: [{ at: 'B', a: 'P', b: 'A' }],
        angles: [
          { id: 'p45', at: 'P', from: 'B', to: 'A', label: '45°', r: 30 },
          { id: 'p60', at: 'P', from: 'A', to: 'C', label: '', r: 52 },
        ],
      },
      steps: [
        {
          text: 'Let $AB = 30$ m be the building, $AC = h$ the tower and $P$ the observer. Then $BC = 30 + h$.',
          highlight: ['ab', 'ac'],
        },
        {
          text: 'The bottom of the tower is the top of the building. In $\\triangle ABP$, $\\angle APB = 45^\\circ$:',
          math: '\\tan 45^\\circ = \\frac{AB}{BP} \\;\\Rightarrow\\; 1 = \\frac{30}{BP} \\;\\Rightarrow\\; BP = 30',
          highlight: ['ab', 'bp', 'p45'],
        },
        {
          text: 'In $\\triangle CBP$, $\\angle CPB = 60^\\circ$:',
          math: '\\tan 60^\\circ = \\frac{BC}{BP} \\;\\Rightarrow\\; \\sqrt3 = \\frac{30 + h}{30}',
          highlight: ['ab', 'ac', 'bp', 'p60'],
        },
        {
          math: '30 + h = 30\\sqrt3 \\;\\Rightarrow\\; h = 30(\\sqrt3 - 1) = 30 \\times 0.732 = 21.96',
          highlight: ['ac'],
        },
      ],
      answer: 'The tower is 21.96 m high.',
    },
    {
      id: 'ex-6-23',
      source: 'Example 6.23',
      title: 'Height of a tower and width of a canal',
      prompt:
        'A TV tower stands on one bank of a canal. From a point on the other bank directly opposite, the angle of elevation of the top is $58^\\circ$. From another point 20 m further away on the same line, the angle of elevation is $30^\\circ$. Find the height of the tower and the width of the canal. ($\\tan 58^\\circ = 1.6003$)',
      figure: {
        view: [-4, -4, 35, 22],
        maxWidth: 520,
        ground: true,
        objects: [{ type: 'tower', at: [0, 0], h: 18.07, w: 2.4 }],
        points: { B: [0, 0], A: [0, 18.07], C: [11.29, 0], D: [31.29, 0] },
        labelDir: { B: 'sw', A: 'nw', C: 's', D: 's' },
        segs: [
          { id: 'ab', a: 'B', b: 'A', color: 'opp', label: 'h', labelSide: -1 },
          { id: 'bc', a: 'B', b: 'C', color: 'adj', label: 'width', labelSide: -1 },
          { id: 'cd', a: 'C', b: 'D', color: 'accent', label: '20 m', labelSide: -1 },
          { id: 'ca', a: 'C', b: 'A', kind: 'sight', color: 'hyp' },
          { id: 'da', a: 'D', b: 'A', kind: 'sight', color: 'hyp' },
        ],
        right: [{ at: 'B', a: 'C', b: 'A' }],
        angles: [
          { id: 'c', at: 'C', from: 'B', to: 'A', label: '58°', r: 26 },
          { id: 'd', at: 'D', from: 'C', to: 'A', label: '30°', r: 40 },
        ],
      },
      steps: [
        { text: 'Let $AB$ be the tower and $BC$ the width of the canal. $CD = 20$ m.', highlight: ['ab', 'bc', 'cd'] },
        {
          text: 'In $\\triangle ABC$:',
          math: '\\tan 58^\\circ = \\frac{AB}{BC} \\;\\Rightarrow\\; AB = 1.6003\\,BC \\quad (1)',
          highlight: ['ab', 'bc', 'c'],
        },
        {
          text: 'In $\\triangle ABD$, $BD = BC + 20$:',
          math: '\\tan 30^\\circ = \\frac{AB}{BC + 20} \\;\\Rightarrow\\; AB = \\frac{BC + 20}{\\sqrt3} \\quad (2)',
          highlight: ['ab', 'bc', 'cd', 'd'],
        },
        {
          text: 'Both expressions equal $AB$, so set them equal.',
          math: '1.6003\\sqrt3\\,BC = BC + 20 \\;\\Rightarrow\\; 2.7717\\,BC - BC = 20',
        },
        { math: 'BC = \\frac{20}{1.7717} = 11.29 \\text{ m}', highlight: ['bc'] },
        { text: 'Substitute in (1).', math: 'AB = 1.6003 \\times 11.29 = 18.07 \\text{ m}', highlight: ['ab'] },
      ],
      answer: 'The tower is 18.07 m high and the canal is 11.29 m wide.',
    },
    {
      id: 'ex-6-24',
      source: 'Example 6.24',
      title: 'An aeroplane journey on bearings',
      prompt:
        'An aeroplane sets off from G on a bearing of $24^\\circ$ towards H, 250 km away. At H it turns a further $55^\\circ$ and flies 180 km to J. (i) How far is H north of G? (ii) How far is H east of G? (iii) How far is J north of H? (iv) How far is J east of H? ($\\sin 24^\\circ = 0.4067$, $\\cos 24^\\circ = 0.9135$, $\\sin 11^\\circ = 0.1908$, $\\cos 11^\\circ = 0.9816$)',
      figure: {
        view: [-70, -20, 300, 305],
        maxWidth: 440,
        north: [-45, 0],
        points: {
          G: [0, 0],
          O: [0, 228.38],
          H: [101.68, 228.38],
          I: [278.37, 228.38],
          J: [278.37, 262.72],
          X: [130.15, 292.3],
        },
        labelDir: { G: 'sw', O: 'nw', H: 's', I: 'se', J: 'ne', X: 'none' },
        segs: [
          { id: 'go', a: 'G', b: 'O', kind: 'dash', color: 'adj', label: 'North', labelSide: 1 },
          { id: 'oh', a: 'O', b: 'H', kind: 'dash', color: 'opp', labelSide: 1 },
          { id: 'gh', a: 'G', b: 'H', color: 'hyp', label: '250 km', labelSide: -1 },
          { a: 'H', b: 'X', kind: 'dash', color: 'muted' },
          { id: 'hj', a: 'H', b: 'J', color: 'hyp', label: '180 km', labelSide: 1 },
          { id: 'hi', a: 'H', b: 'I', kind: 'dash', color: 'adj', label: 'East', labelSide: -1 },
          { id: 'ij', a: 'I', b: 'J', kind: 'dash', color: 'opp' },
        ],
        right: [
          { at: 'O', a: 'G', b: 'H' },
          { at: 'I', a: 'H', b: 'J' },
        ],
        angles: [
          { id: 'g', at: 'G', from: 'O', to: 'H', label: '24°', r: 40 },
          { id: 'h55', at: 'H', from: 'X', to: 'J', label: '55°', r: 30 },
          { id: 'h11', at: 'H', from: 'I', to: 'J', label: '11°', r: 58 },
        ],
      },
      steps: [
        {
          text: 'Draw North from G and East from H to make right triangle $GOH$ with $\\angle OGH = 24^\\circ$ and $GH = 250$ km.',
          highlight: ['go', 'oh', 'gh', 'g'],
        },
        {
          text: '(i) North distance is the side next to the $24^\\circ$ angle.',
          math: 'OG = 250\\cos 24^\\circ = 250 \\times 0.9135 = 228.38 \\text{ km}',
          highlight: ['go', 'g'],
        },
        {
          text: '(ii) East distance is the side opposite the angle.',
          math: 'OH = 250\\sin 24^\\circ = 250 \\times 0.4067 = 101.68 \\text{ km}',
          highlight: ['oh', 'g'],
        },
        {
          text: 'At H the plane turns $55^\\circ$ more, so its new bearing is $24^\\circ + 55^\\circ = 79^\\circ$. Measured from East, that is $90^\\circ - 79^\\circ = 11^\\circ$.',
          highlight: ['h55', 'h11'],
        },
        {
          text: '(iii) In $\\triangle HIJ$, North distance is opposite the $11^\\circ$ angle.',
          math: 'IJ = 180\\sin 11^\\circ = 180 \\times 0.1908 = 34.34 \\text{ km}',
          highlight: ['ij', 'h11'],
        },
        {
          text: '(iv) East distance is next to the $11^\\circ$ angle.',
          math: 'HI = 180\\cos 11^\\circ = 180 \\times 0.9816 = 176.69 \\text{ km}',
          highlight: ['hi', 'h11'],
        },
      ],
      answer: '(i) 228.38 km  (ii) 101.68 km  (iii) 34.34 km  (iv) 176.69 km',
    },
    {
      id: 'ex-6-25',
      source: 'Example 6.25',
      title: 'Two trees in a line',
      prompt:
        'Two trees stand on flat ground. From a point X on the ground, the angle of elevation of the tops of both trees is $40^\\circ$. X is 8 m from the smaller tree, and the distance between the tops of the two trees is 20 m. Find (i) the distance from X to the top of the smaller tree, and (ii) the horizontal distance between the trees. ($\\cos 40^\\circ = 0.7660$)',
      figure: {
        view: [-4, -3, 27, 22],
        maxWidth: 460,
        ground: true,
        objects: [
          { type: 'tree', at: [0, 0], h: 19.57 },
          { type: 'tree', at: [15.32, 0], h: 6.71 },
        ],
        points: { A: [0, 0], C: [15.32, 0], X: [23.32, 0], D: [15.32, 6.71], B: [0, 19.57] },
        labelDir: { A: 's', C: 's', X: 'se', D: 'ne', B: 'ne' },
        segs: [
          { id: 'ac', a: 'A', b: 'C', color: 'adj', label: '?', labelSide: -1 },
          { id: 'cx', a: 'C', b: 'X', color: 'adj', label: '8 m', labelSide: -1 },
          { id: 'cd', a: 'C', b: 'D', kind: 'dash', color: 'opp' },
          { id: 'ab', a: 'A', b: 'B', kind: 'dash', color: 'opp' },
          { id: 'bd', a: 'B', b: 'D', kind: 'sight', color: 'hyp', label: '20 m', labelSide: 1 },
          { id: 'dx', a: 'D', b: 'X', kind: 'sight', color: 'accent' },
        ],
        angles: [{ id: 'x', at: 'X', from: 'C', to: 'D', label: '40°', r: 34 }],
      },
      steps: [
        {
          text: 'The tops B and D both lie on the same line of sight from X, because the angle is the same.',
          highlight: ['bd', 'dx'],
        },
        {
          text: '(i) In $\\triangle XCD$, we know the adjacent side $CX = 8$ m and want the hypotenuse $XD$, so use cos.',
          math: '\\cos 40^\\circ = \\frac{CX}{XD} \\;\\Rightarrow\\; XD = \\frac{8}{0.7660} = 10.44 \\text{ m}',
          highlight: ['cx', 'dx', 'x'],
        },
        {
          text: '(ii) In $\\triangle XAB$, the hypotenuse is $BX = BD + DX = 20 + 10.44 = 30.44$ m.',
          highlight: ['bd', 'dx'],
        },
        { math: 'AX = BX\\cos 40^\\circ = 30.44 \\times 0.7660 = 23.32 \\text{ m}', highlight: ['ac', 'cx'] },
        { math: 'AC = AX - CX = 23.32 - 8 = 15.32 \\text{ m}', highlight: ['ac'] },
      ],
      answer: '(i) 10.44 m  (ii) 15.32 m',
    },
  ],

  practice: [
    {
      id: 'ex62-1',
      source: 'Exercise 6.2 · Q1',
      type: 'numeric',
      prompt:
        'Find the angle of elevation of the top of a tower from a point on the ground 30 m from the foot of the tower, if the tower is $10\\sqrt3$ m high.',
      figure: {
        view: [-3, -3, 34, 20],
        maxWidth: 400,
        ground: true,
        objects: [{ type: 'tower', at: [30, 0], h: 17.32 }],
        points: { R: [0, 0], Q: [30, 0], P: [30, 17.32] },
        labelDir: { R: 'sw', Q: 'se', P: 'ne' },
        segs: [
          { a: 'R', b: 'Q', color: 'adj', label: '30 m', labelSide: -1 },
          { a: 'Q', b: 'P', color: 'opp', label: '10√3 m', labelSide: -1 },
          { a: 'R', b: 'P', kind: 'sight', color: 'hyp' },
        ],
        right: [{ at: 'Q', a: 'R', b: 'P' }],
        angles: [{ at: 'R', from: 'Q', to: 'P', label: 'θ', r: 40 }],
      },
      parts: [{ answer: { value: 30, unit: '°', display: '30°' } }],
      hints: [
        'You know the height (opposite) and the distance (adjacent). Which ratio links them?',
        '$\\tan\\theta = \\dfrac{10\\sqrt3}{30}$. Simplify, then look it up in the table.',
      ],
      solution: [
        { math: '\\tan\\theta = \\frac{10\\sqrt3}{30} = \\frac{\\sqrt3}{3} = \\frac{1}{\\sqrt3}' },
        { text: '$\\tan 30^\\circ = \\dfrac{1}{\\sqrt3}$, so $\\theta = 30^\\circ$.' },
      ],
    },
    {
      id: 'ex62-2',
      source: 'Exercise 6.2 · Q2',
      type: 'numeric',
      prompt:
        'A road has a continuous row of houses $4\\sqrt3$ m high on each side, with no gaps. A pedestrian stands on the median (the middle) of the road, facing a row of houses. The angle of elevation of the top of the houses is $30^\\circ$. Find the width of the road.',
      figure: {
        view: [-17, -2.5, 17, 9.5],
        maxWidth: 460,
        ground: true,
        objects: [
          { type: 'building', at: [-14, 0], h: 6.93, w: 4 },
          { type: 'building', at: [14, 0], h: 6.93, w: 4 },
          { type: 'person', at: [0, 0], h: 1.7 },
        ],
        points: { M: [0, 0], B: [12, 0], T: [12, 6.93], L: [-12, 0] },
        labelDir: { M: 's', B: 's', T: 'ne', L: 's' },
        segs: [
          { a: 'M', b: 'B', color: 'adj', label: 'half the road', labelSide: -1 },
          { a: 'L', b: 'M', color: 'muted', kind: 'dash' },
          { a: 'B', b: 'T', color: 'opp', label: '4√3 m', labelSide: 1 },
          { a: 'M', b: 'T', kind: 'sight', color: 'hyp' },
        ],
        right: [{ at: 'B', a: 'M', b: 'T' }],
        angles: [{ at: 'M', from: 'B', to: 'T', label: '30°', r: 40 }],
      },
      parts: [{ answer: { value: 24, unit: 'm', display: '24 m' } }],
      hints: [
        'First find the distance from the pedestrian to one row of houses using tan.',
        'The pedestrian is in the middle, so the road is twice that distance.',
      ],
      solution: [
        {
          text: 'Let $d$ be the distance from the pedestrian to the houses.',
          math: '\\tan 30^\\circ = \\frac{4\\sqrt3}{d} \\;\\Rightarrow\\; \\frac{1}{\\sqrt3} = \\frac{4\\sqrt3}{d}',
        },
        { math: 'd = 4\\sqrt3 \\times \\sqrt3 = 12 \\text{ m}' },
        { text: 'The pedestrian is on the median, so the road is $2d$ wide.', math: '2 \\times 12 = 24 \\text{ m}' },
      ],
    },
    {
      id: 'ex62-3',
      source: 'Exercise 6.2 · Q3',
      type: 'numeric',
      prompt:
        'A man standing outside his house sees the top and bottom of a window at angles of elevation of $60^\\circ$ and $45^\\circ$. The man is 180 cm tall and stands 5 m from the wall. What is the height of the window? ($\\sqrt3 = 1.732$)',
      figure: {
        view: [-2.2, -1, 9, 12],
        maxWidth: 340,
        ground: true,
        objects: [
          { type: 'person', at: [0, 0], h: 1.8 },
          { type: 'building', at: [6.6, 0], h: 11.5, w: 3.2 },
        ],
        points: { E: [0, 1.8], W: [5, 1.8], B: [5, 6.8], T: [5, 10.46] },
        labelDir: { E: 'w', W: 'e', B: 'e', T: 'e' },
        segs: [
          { a: 'E', b: 'W', kind: 'dash', color: 'adj', label: '5 m', labelSide: -1 },
          { a: 'W', b: 'B', color: 'opp', labelSide: 1 },
          { a: 'B', b: 'T', color: 'accent', label: 'window', labelSide: 1 },
          { a: 'E', b: 'B', kind: 'sight', color: 'hyp' },
          { a: 'E', b: 'T', kind: 'sight', color: 'hyp' },
        ],
        angles: [
          { at: 'E', from: 'W', to: 'B', label: '45°', r: 26 },
          { at: 'E', from: 'B', to: 'T', label: '', r: 44 },
        ],
      },
      parts: [{ answer: { value: 5 * R3 - 5, unit: 'm', display: '3.66 m' } }],
      hints: [
        "Both angles are measured from the man's eye, so work with heights **above his eye level**. Does his height matter?",
        'Height of the top above eye level $= 5\\tan 60^\\circ$; height of the bottom $= 5\\tan 45^\\circ$.',
      ],
      solution: [
        {
          text: "Both lines of sight start at the man's eye. Measure heights above eye level, so his own height is not needed.",
        },
        { text: 'Top of the window:', math: '5\\tan 60^\\circ = 5\\sqrt3 = 5 \\times 1.732 = 8.66 \\text{ m}' },
        { text: 'Bottom of the window:', math: '5\\tan 45^\\circ = 5 \\text{ m}' },
        { text: 'Height of the window:', math: '8.66 - 5 = 3.66 \\text{ m}' },
      ],
    },
    {
      id: 'ex62-4',
      source: 'Exercise 6.2 · Q4',
      type: 'numeric',
      prompt:
        'A statue 1.6 m tall stands on top of a pedestal. From a point on the ground, the angle of elevation of the top of the statue is $60^\\circ$ and the angle of elevation of the top of the pedestal is $40^\\circ$. Find the height of the pedestal. ($\\tan 40^\\circ = 0.8391$, $\\sqrt3 = 1.732$)',
      figure: {
        view: [-0.4, -0.3, 2.7, 3.4],
        maxWidth: 300,
        ground: true,
        points: { O: [0, 0], F: [1.79, 0], P: [1.79, 1.5], S: [1.79, 3.1] },
        labelDir: { O: 'sw', F: 'se', P: 'e', S: 'ne' },
        segs: [
          { a: 'O', b: 'F', color: 'adj', label: 'd', labelSide: -1 },
          { a: 'F', b: 'P', color: 'opp', label: 'h', labelSide: -1 },
          { a: 'P', b: 'S', color: 'accent', label: '1.6 m', labelSide: -1 },
          { a: 'O', b: 'P', kind: 'sight', color: 'hyp' },
          { a: 'O', b: 'S', kind: 'sight', color: 'hyp' },
        ],
        right: [{ at: 'F', a: 'O', b: 'S' }],
        angles: [
          { at: 'O', from: 'F', to: 'P', label: '40°', r: 30 },
          { at: 'O', from: 'P', to: 'S', label: '', r: 50 },
        ],
      },
      parts: [{ answer: { value: 1.5035, unit: 'm', display: '1.5 m', tol: 0.02 } }],
      hints: [
        'Let the pedestal be $h$ and the distance be $d$. Write $\\tan 40^\\circ$ and $\\tan 60^\\circ$ in terms of $h$ and $d$.',
        'From the first, $d = \\dfrac{h}{0.8391}$. Substitute into $\\sqrt3 = \\dfrac{h + 1.6}{d}$.',
      ],
      solution: [
        { math: '\\tan 40^\\circ = \\frac{h}{d} \\;\\Rightarrow\\; d = \\frac{h}{0.8391}' },
        { math: '\\tan 60^\\circ = \\frac{h + 1.6}{d} \\;\\Rightarrow\\; \\sqrt3\\,d = h + 1.6' },
        {
          text: 'Substitute $d$:',
          math: '\\frac{1.732\\,h}{0.8391} = h + 1.6 \\;\\Rightarrow\\; 2.0641\\,h = h + 1.6',
        },
        { math: '1.0641\\,h = 1.6 \\;\\Rightarrow\\; h = 1.50 \\text{ m}' },
      ],
    },
    {
      id: 'ex62-5',
      source: 'Exercise 6.2 · Q5',
      type: 'numeric',
      prompt:
        'A flag pole $h$ m high stands on top of a hemispherical dome of radius $r$ m. A man standing 7 m from the dome sees the top of the pole at an angle of $45^\\circ$. He moves 5 m further away and sees the bottom of the pole at $30^\\circ$. Find (i) the height of the pole and (ii) the radius of the dome. ($\\sqrt3 = 1.732$)',
      figure: {
        view: [-18, -3, 38, 26],
        maxWidth: 480,
        ground: true,
        objects: [
          { type: 'dome', at: [0, 0], h: 16.39 },
          { type: 'pole', at: [0, 16.39], h: 7 },
        ],
        points: { O: [0, 0], T: [0, 16.39], F: [0, 23.39], M: [23.39, 0], N: [35.39, 0] },
        labelDir: { O: 's', T: 'nw', F: 'n', M: 's', N: 's' },
        segs: [
          { a: 'O', b: 'T', kind: 'dash', color: 'opp', label: 'r', labelSide: 1 },
          { a: 'T', b: 'F', color: 'accent', label: 'h', labelSide: 1 },
          { a: 'M', b: 'F', kind: 'sight', color: 'hyp' },
          { a: 'N', b: 'T', kind: 'sight', color: 'hyp' },
          { a: 'O', b: 'N', color: 'adj' },
        ],
        angles: [
          { at: 'M', from: 'O', to: 'F', label: '45°', r: 26 },
          { at: 'N', from: 'O', to: 'T', label: '30°', r: 40 },
        ],
      },
      parts: [
        { label: '(i) Height of the pole', answer: { value: 7, unit: 'm', display: '7 m' } },
        { label: '(ii) Radius of the dome', answer: { value: 12 / (R3 - 1), unit: 'm', display: '16.39 m' } },
      ],
      hints: [
        'Measure distances from the **centre** O of the dome. The man is $r + 7$ from O, and later $r + 12$.',
        'The top of the pole is $r + h$ high. With $45^\\circ$, height = distance.',
        'For the bottom of the pole (height $r$): $\\tan 30^\\circ = \\dfrac{r}{r + 12}$.',
      ],
      solution: [
        {
          text: "Take O as the centre of the dome, directly below the pole. The pole's bottom is at height $r$ and its top at $r + h$.",
        },
        {
          text: 'From 7 m away, his distance from O is $r + 7$.',
          math: '\\tan 45^\\circ = \\frac{r + h}{r + 7} = 1 \\;\\Rightarrow\\; r + h = r + 7 \\;\\Rightarrow\\; h = 7',
        },
        {
          text: 'From 12 m away, his distance from O is $r + 12$.',
          math: '\\tan 30^\\circ = \\frac{r}{r + 12} \\;\\Rightarrow\\; \\sqrt3\\,r = r + 12',
        },
        { math: 'r = \\frac{12}{\\sqrt3 - 1} = \\frac{12}{0.732} = 16.39 \\text{ m}' },
      ],
    },
    {
      id: 'ex62-6',
      source: 'Exercise 6.2 · Q6',
      type: 'numeric',
      prompt:
        'The top of a 15 m high tower makes an angle of elevation of $60^\\circ$ with the bottom of an electric pole and $30^\\circ$ with the top of the pole. What is the height of the electric pole?',
      figure: {
        view: [-3, -2, 12.5, 17],
        maxWidth: 340,
        ground: true,
        objects: [
          { type: 'tower', at: [0, 0], h: 15, w: 1.6 },
          { type: 'pole', at: [8.66, 0], h: 10 },
        ],
        points: { A: [0, 0], B: [0, 15], C: [8.66, 0], D: [8.66, 10], E: [0, 10] },
        labelDir: { A: 'sw', B: 'nw', C: 'se', D: 'ne', E: 'w' },
        segs: [
          { a: 'A', b: 'C', color: 'adj' },
          { a: 'C', b: 'B', kind: 'sight', color: 'hyp' },
          { a: 'D', b: 'B', kind: 'sight', color: 'hyp' },
          { a: 'D', b: 'E', kind: 'dash', color: 'adj' },
          { a: 'A', b: 'B', color: 'opp', label: '15 m', labelSide: 1 },
          { a: 'C', b: 'D', color: 'accent', label: 'pole', labelSide: -1 },
        ],
        angles: [
          { at: 'C', from: 'A', to: 'B', label: '60°', r: 22 },
          { at: 'D', from: 'E', to: 'B', label: '30°', r: 26 },
        ],
      },
      parts: [{ answer: { value: 10, unit: 'm', display: '10 m' } }],
      hints: [
        'Read it as: from the bottom of the pole, the top of the tower is at $60^\\circ$; from the top of the pole, it is at $30^\\circ$.',
        'From the bottom: $\\tan 60^\\circ = \\dfrac{15}{d}$ gives the distance $d$ between them.',
        'From the top of the pole (height $x$): $\\tan 30^\\circ = \\dfrac{15 - x}{d}$.',
      ],
      solution: [
        {
          text: 'Let the pole be $x$ m high and $d$ m from the tower. From the bottom of the pole:',
          math: '\\tan 60^\\circ = \\frac{15}{d} \\;\\Rightarrow\\; d = \\frac{15}{\\sqrt3} = 5\\sqrt3',
        },
        {
          text: 'From the top of the pole, the top of the tower is $15 - x$ higher:',
          math: '\\tan 30^\\circ = \\frac{15 - x}{5\\sqrt3} \\;\\Rightarrow\\; 15 - x = \\frac{5\\sqrt3}{\\sqrt3} = 5',
        },
        { math: 'x = 10 \\text{ m}' },
      ],
    },
    {
      id: 'ue6-5',
      source: 'Unit Exercise 6 · Q5 (challenge)',
      type: 'numeric',
      prompt:
        'A bird sits on top of an 80 m high tree. From a point on the ground, the angle of elevation of the bird is $45^\\circ$. The bird flies away horizontally at a constant height. After 2 seconds, the angle of elevation from the same point is $30^\\circ$. Find the speed of the bird. ($\\sqrt3 = 1.732$)',
      figure: {
        view: [-8, -5, 150, 92],
        maxWidth: 520,
        ground: true,
        objects: [
          { type: 'tree', at: [80, 0], h: 80 },
          { type: 'bird', at: [80, 80], h: 0 },
          { type: 'bird', at: [138.56, 80], h: 0 },
        ],
        points: { P: [0, 0], Q: [80, 0], A: [80, 80], R: [138.56, 0], B: [138.56, 80] },
        labelDir: { P: 'sw', Q: 's', A: 'nw', R: 's', B: 'ne' },
        segs: [
          { a: 'P', b: 'A', kind: 'sight', color: 'hyp' },
          { a: 'P', b: 'B', kind: 'sight', color: 'hyp' },
          { a: 'A', b: 'B', kind: 'dash', color: 'accent', label: 'flight in 2 s', labelSide: 1 },
          { a: 'R', b: 'B', kind: 'dash', color: 'opp', label: '80 m', labelSide: 1 },
          { a: 'P', b: 'R', color: 'adj' },
        ],
        angles: [
          { at: 'P', from: 'Q', to: 'A', label: '45°', r: 40 },
          { at: 'P', from: 'R', to: 'B', label: '30°', r: 66 },
        ],
      },
      parts: [{ answer: { value: (80 * R3 - 80) / 2, unit: 'm/s', display: '29.28 m/s' } }],
      hints: [
        'Find the horizontal distance to the bird at the start ($45^\\circ$) and after 2 s ($30^\\circ$).',
        'Speed = distance flown ÷ 2 seconds.',
      ],
      solution: [
        { text: 'At first: $\\tan 45^\\circ = \\dfrac{80}{PQ}$, so $PQ = 80$ m.' },
        { text: 'After 2 s: $\\tan 30^\\circ = \\dfrac{80}{PR}$, so $PR = 80\\sqrt3 = 138.56$ m.' },
        { text: 'Distance flown:', math: 'QR = 138.56 - 80 = 58.56 \\text{ m}' },
        { math: '\\text{speed} = \\frac{58.56}{2} = 29.28 \\text{ m/s}' },
      ],
    },
    {
      id: 'ue6-6',
      source: 'Unit Exercise 6 · Q6 (challenge)',
      type: 'numeric',
      prompt:
        'An aeroplane flies parallel to the ground at 175 m/s at a height of 600 m. From a point on the ground, its angle of elevation is $37^\\circ$. After how long does the angle of elevation increase to $53^\\circ$? ($\\tan 53^\\circ = 1.3270$, $\\tan 37^\\circ = 0.7536$)',
      figure: {
        view: [-40, -50, 860, 690],
        maxWidth: 480,
        ground: true,
        objects: [
          { type: 'plane', at: [796.2, 600], h: 0 },
          { type: 'plane', at: [452.1, 600], h: 0 },
        ],
        points: { P: [0, 0], A: [796.2, 600], B: [452.1, 600], C: [796.2, 0], D: [452.1, 0] },
        labelDir: { P: 'sw', A: 'ne', B: 'nw', C: 's', D: 's' },
        segs: [
          { a: 'P', b: 'A', kind: 'sight', color: 'hyp' },
          { a: 'P', b: 'B', kind: 'sight', color: 'hyp' },
          { a: 'A', b: 'B', kind: 'dash', color: 'accent', label: 'distance flown', labelSide: -1 },
          { a: 'C', b: 'A', kind: 'dash', color: 'opp', label: '600 m', labelSide: -1 },
          { a: 'D', b: 'B', kind: 'dash', color: 'opp' },
          { a: 'P', b: 'C', color: 'adj' },
        ],
        angles: [
          { at: 'P', from: 'C', to: 'A', label: '37°', r: 70 },
          { at: 'P', from: 'A', to: 'B', label: '', r: 44 },
        ],
      },
      parts: [{ answer: { value: 1.9659, unit: 's', display: '1.97 seconds (approx)', tol: 0.02 } }],
      hints: [
        'Horizontal distance at $37^\\circ$: $600 \\div \\tan 37^\\circ$. At $53^\\circ$: $600 \\div \\tan 53^\\circ$.',
        'Time = distance flown ÷ 175.',
      ],
      solution: [
        { math: 'PC = \\frac{600}{\\tan 37^\\circ} = \\frac{600}{0.7536} = 796.18 \\text{ m}' },
        { math: 'PD = \\frac{600}{\\tan 53^\\circ} = \\frac{600}{1.3270} = 452.15 \\text{ m}' },
        {
          text: 'The angle increases, so the plane is flying towards the observer.',
          math: '\\text{distance flown} = 796.18 - 452.15 = 344.03 \\text{ m}',
        },
        { math: '\\text{time} = \\frac{344.03}{175} \\approx 1.97 \\text{ s}' },
      ],
    },
    {
      id: 'ue6-7',
      source: 'Unit Exercise 6 · Q7 (challenge)',
      type: 'numeric',
      prompt:
        'A bird flies from A towards B, 30 km away, at an angle of $35^\\circ$ west of North. At B it changes course and flies towards C on a bearing of $48^\\circ$, a distance of 32 km. Find: (i) how far B is north of A, (ii) how far B is west of A, (iii) how far C is north of B, (iv) how far C is east of B. ($\\sin 55^\\circ = 0.8192$, $\\cos 55^\\circ = 0.5736$, $\\sin 42^\\circ = 0.6691$, $\\cos 42^\\circ = 0.7431$)',
      figure: {
        view: [-32, -4, 22, 50],
        maxWidth: 340,
        points: { A: [0, 0], NA: [0, 26], B: [-17.21, 24.58], NB: [-17.21, 44], C: [6.57, 45.99] },
        names: { NA: 'N', NB: 'N' },
        labelDir: { A: 's', NA: 'n', B: 'w', NB: 'n', C: 'ne' },
        segs: [
          { a: 'A', b: 'NA', kind: 'dash', color: 'muted' },
          { a: 'B', b: 'NB', kind: 'dash', color: 'muted' },
          { a: 'A', b: 'B', color: 'hyp', label: '30 km', labelSide: -1 },
          { a: 'B', b: 'C', color: 'hyp', label: '32 km', labelSide: 1 },
        ],
        angles: [
          { at: 'A', from: 'NA', to: 'B', label: '35°', r: 30 },
          { at: 'B', from: 'NB', to: 'C', label: '48°', r: 26 },
        ],
      },
      parts: [
        { label: '(i) B north of A', answer: { value: 24.576, unit: 'km', display: '24.58 km' } },
        { label: '(ii) B west of A', answer: { value: 17.208, unit: 'km', display: '17.21 km' } },
        { label: '(iii) C north of B', answer: { value: 21.411, unit: 'km', display: '21.41 km' } },
        { label: '(iv) C east of B', answer: { value: 23.779, unit: 'km', display: '23.78 km' } },
      ],
      hints: [
        'The angle between AB and the North line is $35^\\circ$, so the angle between AB and the West line is $55^\\circ$.',
        'North distance $= 30\\sin 55^\\circ$; west distance $= 30\\cos 55^\\circ$.',
        'A bearing of $48^\\circ$ makes $42^\\circ$ with East, so use $\\sin 42^\\circ$ and $\\cos 42^\\circ$ for the second leg.',
      ],
      solution: [
        { text: 'First leg: AB makes $90^\\circ - 35^\\circ = 55^\\circ$ with the West line.' },
        { math: '\\text{north} = 30\\sin 55^\\circ = 30 \\times 0.8192 = 24.58 \\text{ km}' },
        { math: '\\text{west} = 30\\cos 55^\\circ = 30 \\times 0.5736 = 17.21 \\text{ km}' },
        { text: 'Second leg: a bearing of $48^\\circ$ makes $90^\\circ - 48^\\circ = 42^\\circ$ with the East line.' },
        { math: '\\text{north} = 32\\sin 42^\\circ = 32 \\times 0.6691 = 21.41 \\text{ km}' },
        { math: '\\text{east} = 32\\cos 42^\\circ = 32 \\times 0.7431 = 23.78 \\text{ km}' },
      ],
    },
  ],

  quiz: [
    {
      id: 'l4-q1',
      source: 'Progress Check · p.264 Q1',
      type: 'mcq',
      prompt: 'The line drawn from the eye of an observer to the point on the object being viewed is the',
      options: ['horizontal line', 'line of sight', 'angle of elevation', 'vertical line'],
      correct: 1,
      solution: [{ text: 'That is the definition of the **line of sight**.' }],
    },
    {
      id: 'l4-q2',
      source: 'Progress Check · p.264 Q2',
      type: 'mcq',
      prompt: 'Which instrument measures the angle between an object and the eye of the observer?',
      options: ['Compass', 'Theodolite', 'Thermometer', 'Odometer'],
      correct: 1,
      solution: [
        {
          text: 'A **theodolite** measures horizontal and vertical angles. A clinometer is a simpler instrument for angles of elevation and depression.',
        },
      ],
    },
    {
      id: 'l4-q3',
      source: 'Progress Check · p.264 Q4',
      type: 'mcq',
      prompt: 'As we move towards the foot of a vertical tower, the angle of elevation of its top',
      options: ['decreases', 'stays the same', 'increases', 'becomes zero'],
      correct: 2,
      solution: [{ text: 'Moving closer makes the line of sight steeper, so the angle **increases**.' }],
    },
    {
      id: 'l4-q4',
      source: 'Exercise 6.5 · Q10',
      type: 'mcq',
      prompt:
        'If the ratio of the height of a tower to the length of its shadow is $\\sqrt3 : 1$, the angle of elevation of the sun is',
      options: ['$45^\\circ$', '$30^\\circ$', '$90^\\circ$', '$60^\\circ$'],
      correct: 3,
      solution: [
        {
          math: '\\tan\\theta = \\frac{\\text{height}}{\\text{shadow}} = \\frac{\\sqrt3}{1} = \\sqrt3 \\;\\Rightarrow\\; \\theta = 60^\\circ',
        },
      ],
    },
    {
      id: 'l4-q5',
      source: 'Exercise 6.5 · Q12',
      type: 'mcq',
      prompt:
        'A tower is 60 m high. Its shadow becomes $x$ m shorter when the angle of elevation of the sun increases from $30^\\circ$ to $45^\\circ$. Then $x$ is',
      options: ['41.92 m', '43.92 m', '43 m', '45.6 m'],
      correct: 1,
      solution: [
        { text: 'At $30^\\circ$ the shadow is $60\\sqrt3 = 103.92$ m. At $45^\\circ$ it is $60$ m.' },
        { math: 'x = 60\\sqrt3 - 60 = 103.92 - 60 = 43.92 \\text{ m}' },
      ],
    },
    {
      id: 'l4-q6',
      type: 'numeric',
      prompt: "A tree casts a shadow 20 m long when the sun's angle of elevation is $45^\\circ$. How tall is the tree?",
      parts: [{ answer: { value: 20, unit: 'm', display: '20 m' } }],
      solution: [{ math: '\\tan 45^\\circ = \\frac{h}{20} \\;\\Rightarrow\\; h = 20 \\text{ m}' }],
    },
    {
      id: 'l4-q7',
      type: 'numeric',
      prompt:
        'A 10 m ladder leans against a wall and makes an angle of $60^\\circ$ with the ground. How high up the wall does it reach? (Give your answer to 2 decimal places.)',
      parts: [{ answer: { value: 5 * R3, unit: 'm', display: '5√3 ≈ 8.66 m' } }],
      solution: [
        { text: 'The ladder is the hypotenuse and the height is opposite the angle, so use sin.' },
        { math: 'h = 10\\sin 60^\\circ = 10 \\times \\frac{\\sqrt3}{2} = 5\\sqrt3 \\approx 8.66 \\text{ m}' },
      ],
    },
    {
      id: 'l4-q8',
      type: 'mcq',
      prompt:
        'You know the height of a building and your horizontal distance from it. Which ratio gives the angle of elevation directly?',
      options: ['$\\sin$', '$\\cos$', '$\\tan$', '$\\sec$'],
      correct: 2,
      solution: [
        {
          text: 'Height is opposite and distance is adjacent: $\\tan\\theta = \\dfrac{\\text{height}}{\\text{distance}}$.',
        },
      ],
    },
  ],
}
