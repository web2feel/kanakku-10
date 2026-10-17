import type { Lesson } from '../types'

const R3 = Math.sqrt(3)
const ALT = 'Alternate angles: the angle of depression equals the angle of elevation'

export const lesson5: Lesson = {
  id: 'depression',
  number: 5,
  title: 'Heights and distances: angle of depression',
  summary:
    'Looking down from towers, lighthouses and aeroplanes, and why it becomes the same right triangle as before.',
  pages: '258–261',
  status: 'ready',

  learn: [
    {
      id: 'words',
      title: 'Looking down: the angle of depression',
      blocks: [
        {
          t: 'figure',
          scene: {
            view: [-12, -12, 118, 74],
            maxWidth: 480,
            water: true,
            objects: [
              { type: 'lighthouse', at: [0, 0], h: 60, w: 9 },
              { type: 'ship', at: [96, 0], h: 0 },
            ],
            points: { E: [0, 60], H: [112, 60], S: [96, 0] },
            names: { E: 'Eye', H: '', S: 'Ship' },
            labelDir: { E: 'nw', H: 'none', S: 's' },
            segs: [
              { a: 'E', b: 'H', kind: 'dash', color: 'adj', label: 'horizontal line', labelSide: 1 },
              { a: 'E', b: 'S', kind: 'sight', color: 'hyp', label: 'line of sight', labelSide: -1 },
            ],
            angles: [{ at: 'E', from: 'H', to: 'S', label: 'angle of depression', r: 46 }],
          },
          caption: 'Looking down at a ship from the top of a lighthouse',
        },
        {
          t: 'p',
          text: 'The **angle of depression** is the angle between the line of sight and the horizontal when the object is **below** eye level. You lower your head to look at it.',
        },
        {
          t: 'note',
          tone: 'tip',
          text: 'The angle of depression is measured **down from the horizontal**, never from the vertical tower. If a question gives $30^\\circ$ of depression, the line of sight makes $60^\\circ$ with the tower.',
        },
      ],
      check: {
        id: 'l5-c-words',
        source: 'Progress Check · p.264 Q5',
        type: 'mcq',
        prompt: 'When the line of sight is below the horizontal level, the angle formed is the',
        options: ['angle of elevation', 'angle of depression', 'right angle', 'line of sight'],
        correct: 1,
        solution: [{ text: 'Below the horizontal: the **angle of depression**.' }],
      },
    },
    {
      id: 'equal',
      title: 'The key fact: depression equals elevation',
      blocks: [
        {
          t: 'figure',
          scene: {
            view: [-14, -10, 110, 70],
            maxWidth: 460,
            ground: true,
            objects: [{ type: 'tower', at: [0, 0], h: 56 }],
            points: { X: [100, 56], C: [0, 56], B: [0, 0], A: [80, 0], F: [104, 0] },
            names: { X: 'X', F: '' },
            labelDir: { X: 'e', C: 'nw', B: 'sw', A: 's', F: 'none' },
            segs: [
              { id: 'cx', a: 'C', b: 'X', kind: 'dash', color: 'muted', parallel: true },
              { id: 'bf', a: 'B', b: 'F', color: 'muted', parallel: true },
              { id: 'ca', a: 'C', b: 'A', kind: 'sight', color: 'hyp' },
              { a: 'B', b: 'C', color: 'opp' },
            ],
            right: [{ at: 'B', a: 'A', b: 'C' }],
            angles: [
              { id: 'top', at: 'C', from: 'X', to: 'A', label: 'θ', r: 34 },
              { id: 'bot', at: 'A', from: 'B', to: 'C', label: 'θ', r: 30 },
            ],
            highlight: ['top', 'bot'],
          },
          caption: 'The horizontal CX is parallel to the ground BA, so the two marked angles are alternate angles',
        },
        {
          t: 'p',
          text: 'The horizontal line through the eye is **parallel** to the level ground. The line of sight $CA$ cuts both, so $\\angle XCA$ and $\\angle CAB$ are **alternate angles**, and they are equal.',
        },
        {
          t: 'p',
          text: 'So the angle of depression from the top is the same as the angle of elevation from the bottom. Copy it down to the ground and you have exactly the right triangle of the last lesson: $\\tan\\theta = \\dfrac{BC}{AB}$.',
        },
      ],
      check: {
        id: 'l5-c-equal',
        type: 'numeric',
        prompt:
          'From the top of a 40 m cliff, the angle of depression of a boat is $45^\\circ$. How far is the boat from the foot of the cliff?',
        parts: [{ answer: { value: 40, unit: 'm', display: '40 m' } }],
        solution: [
          { text: 'The angle of elevation of the cliff top from the boat is also $45^\\circ$.' },
          { math: '\\tan 45^\\circ = \\frac{40}{d} \\;\\Rightarrow\\; d = 40 \\text{ m}' },
        ],
      },
    },
    {
      id: 'setups',
      title: 'Four set-ups you will meet',
      blocks: [
        {
          t: 'table',
          head: ['Situation', 'What to do'],
          rows: [
            ['One object below a tower', 'One triangle: $\\text{distance} = \\dfrac{\\text{height}}{\\tan\\theta}$.'],
            [
              'Two objects in a line, **same side**',
              'Find each distance from the foot, then **subtract** (Example 6.29).',
            ],
            ['Two objects on **opposite sides**', 'Find each distance from the foot, then **add** (Exercise 6.3 Q5).'],
            [
              'An object with its own height (a tree, a lamp post, a building)',
              'Draw a horizontal from its top to the tower. Work with the part of the tower above it (Example 6.28).',
            ],
          ],
        },
        {
          t: 'note',
          tone: 'think',
          text: 'As a ship sails away, its angle of depression **decreases**. A bigger angle means the object is closer to the foot of the tower.',
        },
      ],
      check: {
        id: 'l5-c-setups',
        type: 'mcq',
        prompt:
          'From the top of a tower, the angle of depression of a car is $30^\\circ$. What angle does the line of sight make with the tower itself?',
        options: ['$30^\\circ$', '$60^\\circ$', '$90^\\circ$', '$120^\\circ$'],
        correct: 1,
        solution: [
          {
            text: 'The tower is vertical, at $90^\\circ$ to the horizontal. The line of sight is $30^\\circ$ below the horizontal, so it is $90^\\circ - 30^\\circ = 60^\\circ$ from the tower.',
          },
        ],
      },
    },
    {
      id: 'speed',
      title: 'Moving objects and speed',
      blocks: [
        {
          t: 'p',
          text: 'When a boat or a lift moves and the angle changes, find the position at each moment, subtract to get the distance moved, and divide by the time taken.',
        },
        {
          t: 'math',
          tex: '\\text{speed} = \\frac{\\text{distance}}{\\text{time}}, \\qquad 1 \\text{ m/s} = \\frac{3600}{1000} \\text{ km/h} = 3.6 \\text{ km/h}',
        },
      ],
      check: {
        id: 'l5-c-speed',
        type: 'numeric',
        prompt: 'A boat covers 150 m in 10 seconds. What is its speed in km/h?',
        parts: [{ answer: { value: 54, unit: 'km/h', display: '54 km/h' } }],
        solution: [{ math: '\\frac{150}{10} = 15 \\text{ m/s} = 15 \\times 3.6 = 54 \\text{ km/h}' }],
      },
    },
  ],

  explore: [
    {
      widget: 'depression-lab',
      title: 'Lighthouse and ships',
      intro:
        'Drag a ship across the water. The angle of depression at the top and the angle of elevation at the ship are drawn in the same colour: they are always equal.',
      tryThis: [
        'Sail the pink ship away from the lighthouse. Does the angle of depression grow or shrink?',
        'Find the position where the angle is exactly $45^\\circ$. How far is the ship from the foot?',
        'Choose **Two ships, same side**. Put them at $45^\\circ$ and $30^\\circ$. Check the gap: $h(\\sqrt3 - 1)$.',
        'Choose **Opposite sides** and compare: now the two distances add up.',
      ],
    },
  ],

  examples: [
    {
      id: 'ex-6-26',
      source: 'Example 6.26',
      title: 'A ball seen from a tower',
      prompt:
        'A player sitting on the top of a tower of height 20 m observes the angle of depression of a ball lying on the ground as $60^\\circ$. Find the distance between the foot of the tower and the ball. ($\\sqrt3 = 1.732$)',
      figure: {
        view: [-3.5, -3, 16, 23.5],
        maxWidth: 320,
        ground: true,
        objects: [{ type: 'tower', at: [11.55, 0], h: 20, w: 2.2 }],
        points: { A: [0, 0], B: [11.55, 0], C: [11.55, 20], X: [-1.5, 20] },
        labelDir: { A: 's', B: 'se', C: 'ne', X: 'w' },
        segs: [
          { id: 'cx', a: 'C', b: 'X', kind: 'dash', color: 'muted' },
          { id: 'bc', a: 'B', b: 'C', color: 'opp', label: '20 m', labelSide: -1 },
          { id: 'ab', a: 'A', b: 'B', color: 'adj', label: 'x', labelSide: -1 },
          { id: 'ac', a: 'C', b: 'A', kind: 'sight', color: 'hyp' },
        ],
        right: [{ at: 'B', a: 'A', b: 'C' }],
        angles: [
          { id: 'top', at: 'C', from: 'X', to: 'A', label: '60°', r: 30 },
          { id: 'bot', at: 'A', from: 'B', to: 'C', label: '60°', r: 26 },
        ],
      },
      steps: [
        {
          text: 'Let $BC = 20$ m be the tower and $A$ the ball. The angle of depression $\\angle XCA = 60^\\circ$ equals $\\angle CAB$ (alternate angles).',
          highlight: ['top', 'bot'],
        },
        {
          text: 'In right triangle $ABC$:',
          math: '\\tan 60^\\circ = \\frac{BC}{AB} \\;\\Rightarrow\\; \\sqrt3 = \\frac{20}{x}',
          highlight: ['bc', 'ab', 'bot'],
        },
        { math: 'x = \\frac{20}{\\sqrt3} = \\frac{20\\sqrt3}{3} = \\frac{20 \\times 1.732}{3} = 11.55' },
      ],
      answer: 'The ball is 11.55 m from the foot of the tower.',
    },
    {
      id: 'ex-6-27',
      source: 'Example 6.27',
      title: 'Height of the taller building',
      prompt:
        'The horizontal distance between two buildings is 140 m. The angle of depression of the top of the first building when seen from the top of the second building is $30^\\circ$. If the height of the first building is 60 m, find the height of the second building. ($\\sqrt3 = 1.732$)',
      figure: {
        view: [-22, -18, 166, 160],
        maxWidth: 420,
        ground: true,
        objects: [
          { type: 'building', at: [-7, 0], h: 60, w: 14 },
          { type: 'building', at: [147, 0], h: 140.83, w: 14 },
        ],
        points: { B: [0, 0], A: [0, 60], D: [140, 0], M: [140, 60], C: [140, 140.83], X: [96, 140.83] },
        labelDir: { B: 's', A: 'nw', D: 's', M: 'e', C: 'ne', X: 'w' },
        segs: [
          { id: 'cx', a: 'C', b: 'X', kind: 'dash', color: 'muted' },
          { id: 'am', a: 'A', b: 'M', kind: 'dash', color: 'adj', label: '140 m', labelSide: -1 },
          { id: 'bd', a: 'B', b: 'D', color: 'muted', label: '140 m', labelSide: -1 },
          { id: 'ab', a: 'B', b: 'A', color: 'ink', label: '60 m', labelSide: 1 },
          { id: 'md', a: 'D', b: 'M', color: 'ink', label: '60 m', labelSide: 1 },
          { id: 'cm', a: 'M', b: 'C', color: 'opp', label: 'CM', labelSide: 1 },
          { id: 'ac', a: 'C', b: 'A', kind: 'sight', color: 'hyp' },
        ],
        right: [{ at: 'M', a: 'A', b: 'C' }],
        angles: [
          { id: 'top', at: 'C', from: 'X', to: 'A', label: '30°', r: 32 },
          { id: 'bot', at: 'A', from: 'M', to: 'C', label: '30°', r: 34 },
        ],
      },
      steps: [
        {
          text: 'Draw $AM$ parallel to the ground. Then $AM = BD = 140$ m and $MD = AB = 60$ m. The angle $\\angle CAM = \\angle XCA = 30^\\circ$.',
          highlight: ['am', 'md', 'top', 'bot'],
        },
        {
          text: 'In right triangle $AMC$:',
          math: '\\tan 30^\\circ = \\frac{CM}{AM} \\;\\Rightarrow\\; \\frac{1}{\\sqrt3} = \\frac{CM}{140}',
          highlight: ['cm', 'am', 'bot'],
        },
        { math: 'CM = \\frac{140}{\\sqrt3} = \\frac{140\\sqrt3}{3} = \\frac{140 \\times 1.732}{3} = 80.83' },
        { text: 'Add the part below $M$:', math: 'CD = CM + MD = 80.83 + 60 = 140.83', highlight: ['cm', 'md'] },
      ],
      answer: 'The second building is 140.83 m high.',
    },
    {
      id: 'ex-6-28',
      source: 'Example 6.28',
      title: 'Height of a tree from a tower',
      prompt:
        'From the top of a tower 50 m high, the angles of depression of the top and bottom of a tree are observed to be $30^\\circ$ and $45^\\circ$ respectively. Find the height of the tree. ($\\sqrt3 = 1.732$)',
      figure: {
        view: [-9, -7, 62, 57],
        maxWidth: 400,
        ground: true,
        objects: [
          { type: 'tower', at: [50, 0], h: 50, w: 4 },
          { type: 'tree', at: [0, 0], h: 21.13 },
        ],
        points: { D: [0, 0], C: [0, 21.13], B: [50, 0], A: [50, 50], M: [50, 21.13], X: [8, 50] },
        labelDir: { D: 's', C: 'nw', B: 's', A: 'ne', M: 'e', X: 'w' },
        segs: [
          { id: 'ax', a: 'A', b: 'X', kind: 'dash', color: 'muted' },
          { id: 'ab', a: 'B', b: 'A', color: 'opp', label: '50 m', labelSide: -1 },
          { id: 'db', a: 'D', b: 'B', color: 'adj', label: 'x', labelSide: -1 },
          { id: 'cm', a: 'C', b: 'M', kind: 'dash', color: 'adj', label: 'x', labelSide: 1 },
          { id: 'am', a: 'M', b: 'A', color: 'accent', label: 'AM', labelSide: -1 },
          { id: 'ad', a: 'A', b: 'D', kind: 'sight', color: 'hyp' },
          { id: 'ac', a: 'A', b: 'C', kind: 'sight', color: 'hyp' },
        ],
        right: [{ at: 'B', a: 'D', b: 'A' }],
        angles: [
          { id: 'a30', at: 'A', from: 'X', to: 'C', label: '30°', r: 46 },
          { id: 'a45', at: 'A', from: 'X', to: 'D', label: '', r: 30 },
          { id: 'c30', at: 'C', from: 'M', to: 'A', label: '30°', r: 34 },
          { id: 'd45', at: 'D', from: 'B', to: 'A', label: '45°', r: 26 },
        ],
      },
      steps: [
        {
          text: 'Let the tree be $CD$ and $BD = x$. Draw $CM$ parallel to the ground; then $CM = BD = x$ and $MB = CD$.',
          highlight: ['cm', 'db'],
        },
        {
          text: 'The angle of depression of the bottom is $45^\\circ$. In triangle $ABD$:',
          math: '\\tan 45^\\circ = \\frac{AB}{BD} \\;\\Rightarrow\\; 1 = \\frac{50}{x} \\;\\Rightarrow\\; x = 50',
          highlight: ['ab', 'db', 'd45'],
        },
        {
          text: 'The angle of depression of the top is $30^\\circ$. In triangle $AMC$:',
          math: '\\tan 30^\\circ = \\frac{AM}{CM} \\;\\Rightarrow\\; \\frac{1}{\\sqrt3} = \\frac{AM}{50} \\;\\Rightarrow\\; AM = \\frac{50}{\\sqrt3} = 28.87',
          highlight: ['am', 'cm', 'c30'],
        },
        { text: 'The tree is the part of the tower below $M$:', math: 'CD = MB = AB - AM = 50 - 28.87 = 21.13' },
      ],
      answer: 'The tree is 21.13 m high.',
    },
    {
      id: 'ex-6-29',
      source: 'Example 6.29',
      title: 'Two ships in a line',
      prompt:
        'As observed from the top of a 60 m high lighthouse from the sea level, the angles of depression of two ships are $28^\\circ$ and $45^\\circ$. If one ship is exactly behind the other on the same side of the lighthouse, find the distance between the two ships. ($\\tan 28^\\circ = 0.5317$)',
      figure: {
        view: [-14, -14, 128, 74],
        maxWidth: 480,
        water: true,
        objects: [
          { type: 'lighthouse', at: [0, 0], h: 60, w: 9 },
          { type: 'ship', at: [60, 0], h: 0 },
          { type: 'ship', at: [112.85, 0], h: 0 },
        ],
        points: { C: [0, 0], D: [0, 60], B: [60, 0], A: [112.85, 0], X: [124, 60] },
        labelDir: { C: 's', D: 'nw', B: 's', A: 's', X: 'e' },
        segs: [
          { id: 'dx', a: 'D', b: 'X', kind: 'dash', color: 'muted' },
          { id: 'cd', a: 'C', b: 'D', color: 'opp', label: '60 m', labelSide: 1 },
          { id: 'cb', a: 'C', b: 'B', color: 'adj', labelSide: -1 },
          { id: 'ba', a: 'B', b: 'A', color: 'accent', label: 'AB', labelSide: -1 },
          { id: 'db', a: 'D', b: 'B', kind: 'sight', color: 'hyp' },
          { id: 'da', a: 'D', b: 'A', kind: 'sight', color: 'hyp' },
        ],
        right: [{ at: 'C', a: 'A', b: 'D' }],
        angles: [
          { id: 'b45', at: 'B', from: 'C', to: 'D', label: '45°', r: 24 },
          { id: 'a28', at: 'A', from: 'C', to: 'D', label: '28°', r: 34 },
        ],
      },
      steps: [
        {
          text: 'The angles of depression from $D$ equal the angles of elevation at the ships: $\\angle DBC = 45^\\circ$ and $\\angle DAC = 28^\\circ$.',
          highlight: ['b45', 'a28'],
        },
        {
          text: 'Nearer ship, in triangle $DCB$:',
          math: '\\tan 45^\\circ = \\frac{60}{BC} \\;\\Rightarrow\\; BC = 60',
          highlight: ['cd', 'cb', 'b45'],
        },
        {
          text: 'Farther ship, in triangle $DCA$:',
          math: '0.5317 = \\frac{60}{AC} \\;\\Rightarrow\\; AC = \\frac{60}{0.5317} = 112.85',
          highlight: ['cd', 'a28'],
        },
        { text: 'Same side, so subtract:', math: 'AB = AC - BC = 112.85 - 60 = 52.85', highlight: ['ba'] },
      ],
      answer: 'The ships are 52.85 m apart.',
    },
    {
      id: 'ex-6-30',
      source: 'Example 6.30',
      title: 'Speed of a boat',
      prompt:
        'A man is watching a boat speeding away from the top of a tower. The boat makes an angle of depression of $60^\\circ$ with the man’s eye when at a distance of 200 m from the tower. After 10 seconds, the angle of depression becomes $45^\\circ$. What is the approximate speed of the boat (in km/h), assuming that it is sailing in still water? ($\\sqrt3 = 1.732$)',
      figure: {
        view: [-46, -46, 400, 386],
        maxWidth: 420,
        water: true,
        objects: [
          { type: 'tower', at: [0, 0], h: 346.4, w: 22 },
          { type: 'ship', at: [200, 0], h: 0 },
          { type: 'ship', at: [346.4, 0], h: 0 },
        ],
        points: { B: [0, 0], A: [0, 346.4], C: [200, 0], D: [346.4, 0], X: [390, 346.4] },
        labelDir: { B: 's', A: 'nw', C: 's', D: 's', X: 'e' },
        segs: [
          { id: 'ax', a: 'A', b: 'X', kind: 'dash', color: 'muted' },
          { id: 'ab', a: 'B', b: 'A', color: 'opp', label: 'AB', labelSide: 1 },
          { id: 'bc', a: 'B', b: 'C', color: 'adj', label: '200 m', labelSide: -1 },
          { id: 'cd', a: 'C', b: 'D', color: 'accent', label: 'CD', labelSide: -1 },
          { id: 'ac', a: 'A', b: 'C', kind: 'sight', color: 'hyp' },
          { id: 'ad', a: 'A', b: 'D', kind: 'sight', color: 'hyp' },
        ],
        right: [{ at: 'B', a: 'C', b: 'A' }],
        angles: [
          { id: 'c60', at: 'C', from: 'B', to: 'A', label: '60°', r: 30 },
          { id: 'd45', at: 'D', from: 'B', to: 'A', label: '45°', r: 36 },
        ],
      },
      steps: [
        {
          text: 'First position $C$, 200 m from the tower. In triangle $ABC$:',
          math: '\\tan 60^\\circ = \\frac{AB}{200} \\;\\Rightarrow\\; AB = 200\\sqrt3',
          highlight: ['ab', 'bc', 'c60'],
        },
        {
          text: 'Second position $D$. In triangle $ABD$:',
          math: '\\tan 45^\\circ = \\frac{AB}{BD} \\;\\Rightarrow\\; BD = AB = 200\\sqrt3',
          highlight: ['ab', 'd45'],
        },
        {
          text: 'Distance sailed:',
          math: 'CD = BD - BC = 200\\sqrt3 - 200 = 200(\\sqrt3 - 1) = 146.4 \\text{ m}',
          highlight: ['cd'],
        },
        {
          text: 'It took 10 seconds:',
          math: '\\frac{146.4}{10} = 14.64 \\text{ m/s} = 14.64 \\times \\frac{3600}{1000} = 52.704 \\text{ km/h}',
        },
      ],
      answer: 'The boat sails at about 52.7 km/h.',
    },
  ],

  practice: [
    {
      id: 'ex63-1',
      source: 'Exercise 6.3 · Q1',
      type: 'numeric',
      prompt:
        'From the top of a rock $50\\sqrt3$ m high, the angle of depression of a car on the ground is observed to be $30^\\circ$. Find the distance of the car from the rock.',
      figure: {
        view: [-14, -12, 168, 100],
        maxWidth: 420,
        ground: true,
        objects: [{ type: 'tower', at: [0, 0], h: 86.6, w: 16 }],
        points: { B: [0, 0], A: [0, 86.6], C: [150, 0], X: [60, 86.6] },
        labelDir: { B: 's', A: 'nw', C: 's', X: 'e' },
        segs: [
          { a: 'A', b: 'X', kind: 'dash', color: 'muted' },
          { a: 'B', b: 'A', color: 'opp', label: '50√3 m', labelSide: 1 },
          { a: 'B', b: 'C', color: 'adj', label: 'd', labelSide: -1 },
          { a: 'A', b: 'C', kind: 'sight', color: 'hyp' },
        ],
        angles: [{ at: 'A', from: 'X', to: 'C', label: '30°', r: 34 }],
        right: [{ at: 'B', a: 'C', b: 'A' }],
      },
      parts: [{ answer: { value: 150, unit: 'm', display: '150 m' } }],
      hints: ['The angle of elevation of the top of the rock from the car is also $30^\\circ$.'],
      solution: [
        { math: '\\tan 30^\\circ = \\frac{50\\sqrt3}{d} \\;\\Rightarrow\\; d = 50\\sqrt3 \\times \\sqrt3 = 150' },
      ],
    },
    {
      id: 'ex63-2',
      source: 'Exercise 6.3 · Q2',
      type: 'numeric',
      prompt:
        'The horizontal distance between two buildings is 70 m. The angle of depression of the top of the first building when seen from the top of the second building is $45^\\circ$. If the height of the second building is 120 m, find the height of the first building.',
      figure: {
        view: [-16, -14, 94, 132],
        maxWidth: 300,
        ground: true,
        objects: [
          { type: 'building', at: [-6, 0], h: 50, w: 12 },
          { type: 'building', at: [76, 0], h: 120, w: 12 },
        ],
        points: { B: [0, 0], A: [0, 50], D: [70, 0], M: [70, 50], C: [70, 120], X: [40, 120] },
        labelDir: { B: 's', A: 'nw', D: 's', M: 'e', C: 'ne', X: 'w' },
        segs: [
          { a: 'C', b: 'X', kind: 'dash', color: 'muted' },
          { a: 'A', b: 'M', kind: 'dash', color: 'adj', label: '70 m', labelSide: -1 },
          { a: 'M', b: 'C', color: 'opp', labelSide: 1 },
          { a: 'D', b: 'C', color: 'ink', label: '120 m', labelSide: -1 },
          { a: 'C', b: 'A', kind: 'sight', color: 'hyp' },
        ],
        angles: [{ at: 'C', from: 'X', to: 'A', label: '45°', r: 22 }],
      },
      parts: [{ answer: { value: 50, unit: 'm', display: '50 m' } }],
      hints: [
        'Draw a horizontal from the top of the first building to the second. The part of the second building above it is $70\\tan 45^\\circ$.',
      ],
      solution: [
        {
          text: 'Above the top of the first building, the second building rises',
          math: '70\\tan 45^\\circ = 70 \\text{ m}',
        },
        { math: '\\text{height of the first} = 120 - 70 = 50 \\text{ m}' },
      ],
    },
    {
      id: 'ex63-3',
      source: 'Exercise 6.3 · Q3',
      type: 'numeric',
      prompt:
        'From the top of a tower 60 m high, the angles of depression of the top and bottom of a vertical lamp post are observed to be $38^\\circ$ and $60^\\circ$ respectively. Find the height of the lamp post. ($\\tan 38^\\circ = 0.7813$, $\\sqrt3 = 1.732$)',
      figure: {
        view: [-8, -6, 44, 66],
        maxWidth: 300,
        ground: true,
        objects: [{ type: 'tower', at: [34.64, 0], h: 60, w: 4 }],
        points: { D: [0, 0], C: [0, 32.94], B: [34.64, 0], A: [34.64, 60], M: [34.64, 32.94], X: [4, 60] },
        labelDir: { D: 's', C: 'nw', B: 's', A: 'ne', M: 'e', X: 'w' },
        segs: [
          { a: 'A', b: 'X', kind: 'dash', color: 'muted' },
          { a: 'D', b: 'C', color: 'accent', label: 'h', labelSide: 1 },
          { a: 'B', b: 'A', color: 'opp', label: '60 m', labelSide: -1 },
          { a: 'D', b: 'B', color: 'adj', label: 'd', labelSide: -1 },
          { a: 'C', b: 'M', kind: 'dash', color: 'adj' },
          { a: 'A', b: 'D', kind: 'sight', color: 'hyp' },
          { a: 'A', b: 'C', kind: 'sight', color: 'hyp' },
        ],
        angles: [
          { at: 'D', from: 'B', to: 'A', label: '60°', r: 18 },
          { at: 'C', from: 'M', to: 'A', label: '38°', r: 22 },
        ],
      },
      parts: [{ answer: { value: 60 - (60 / R3) * 0.7813, unit: 'm', display: '32.93 m', tol: 0.03 } }],
      hints: [
        'Use the $60^\\circ$ angle to find the distance $d$ between the tower and the lamp post.',
        'The part of the tower above the top of the lamp post is $d\\tan 38^\\circ$.',
      ],
      solution: [
        { math: '\\tan 60^\\circ = \\frac{60}{d} \\;\\Rightarrow\\; d = \\frac{60}{\\sqrt3} = 34.64 \\text{ m}' },
        { math: '\\text{above the lamp post: } 34.64 \\times 0.7813 = 27.07 \\text{ m}' },
        { math: 'h = 60 - 27.07 = 32.93 \\text{ m}' },
      ],
    },
    {
      id: 'ex63-4',
      source: 'Exercise 6.3 · Q4',
      type: 'numeric',
      prompt:
        'An aeroplane at an altitude of 1800 m finds that two boats are sailing towards it in the same direction. The angles of depression of the boats as observed from the aeroplane are $60^\\circ$ and $30^\\circ$ respectively. Find the distance between the two boats. ($\\sqrt3 = 1.732$)',
      figure: {
        view: [-300, -500, 3500, 2300],
        maxWidth: 480,
        water: true,
        objects: [
          { type: 'plane', at: [0, 1800], h: 0 },
          { type: 'ship', at: [1039.2, 0], h: 0 },
          { type: 'ship', at: [3117.7, 0], h: 0 },
        ],
        points: { P: [0, 1800], F: [0, 0], B1: [1039.2, 0], B2: [3117.7, 0], X: [3400, 1800] },
        names: { B1: 'C', B2: 'D' },
        labelDir: { P: 'nw', F: 's', B1: 's', B2: 's', X: 'e' },
        segs: [
          { a: 'P', b: 'X', kind: 'dash', color: 'muted' },
          { a: 'F', b: 'P', color: 'opp', label: '1800 m', labelSide: 1, kind: 'dash' },
          { a: 'F', b: 'B1', color: 'adj', labelSide: -1 },
          { a: 'B1', b: 'B2', color: 'accent', label: 'CD', labelSide: -1 },
          { a: 'P', b: 'B1', kind: 'sight', color: 'hyp' },
          { a: 'P', b: 'B2', kind: 'sight', color: 'hyp' },
        ],
        angles: [
          { at: 'B1', from: 'F', to: 'P', label: '60°', r: 30 },
          { at: 'B2', from: 'F', to: 'P', label: '30°', r: 40 },
        ],
      },
      parts: [{ answer: { value: 2078.4, unit: 'm', display: '2078.4 m', tol: 0.5 } }],
      hints: ['Find the horizontal distance from the point below the plane to each boat, then subtract.'],
      solution: [
        {
          math: 'FC = \\frac{1800}{\\tan 60^\\circ} = \\frac{1800}{\\sqrt3} = 600\\sqrt3, \\qquad FD = \\frac{1800}{\\tan 30^\\circ} = 1800\\sqrt3',
        },
        { math: 'CD = 1800\\sqrt3 - 600\\sqrt3 = 1200\\sqrt3 = 1200 \\times 1.732 = 2078.4 \\text{ m}' },
      ],
    },
    {
      id: 'ex63-5',
      source: 'Exercise 6.3 · Q5',
      type: 'proof',
      prompt:
        'From the top of a lighthouse of height $h$ m, the angles of depression of two ships on opposite sides of it are $30^\\circ$ and $60^\\circ$. The line joining the ships passes through the foot of the lighthouse. Choose the reason for each step.',
      figure: {
        view: [-200, -40, 70, 115],
        maxWidth: 420,
        water: true,
        objects: [
          { type: 'lighthouse', at: [0, 0], h: 100, w: 12 },
          { type: 'ship', at: [-173.2, 0], h: 0 },
          { type: 'ship', at: [57.7, 0], h: 0 },
        ],
        points: { B: [0, 0], A: [0, 100], C: [-173.2, 0], D: [57.7, 0] },
        labelDir: { B: 's', A: 'n', C: 's', D: 's' },
        segs: [
          { a: 'B', b: 'A', color: 'opp', label: 'h', labelSide: 1 },
          { a: 'C', b: 'B', color: 'adj', labelSide: -1 },
          { a: 'B', b: 'D', color: 'adj', labelSide: -1 },
          { a: 'A', b: 'C', kind: 'sight', color: 'hyp' },
          { a: 'A', b: 'D', kind: 'sight', color: 'hyp' },
        ],
        angles: [
          { at: 'C', from: 'B', to: 'A', label: '30°', r: 40 },
          { at: 'D', from: 'B', to: 'A', label: '60°', r: 22 },
        ],
      },
      given: 'Lighthouse $AB = h$; ships $C$ and $D$ on opposite sides; depressions $30^\\circ$ and $60^\\circ$',
      toProve: 'The distance between the ships is $\\dfrac{4h}{\\sqrt3}$ m',
      steps: [
        {
          statement: '$\\angle ACB = 30^\\circ$ and $\\angle ADB = 60^\\circ$',
          reason: ALT,
          choices: [ALT, 'Vertically opposite angles', 'The angles of a triangle add up to $180^\\circ$'],
        },
        {
          statement: '$BC = \\dfrac{h}{\\tan 30^\\circ} = h\\sqrt3$',
          reason: 'In right $\\Delta ABC$, $\\tan 30^\\circ = \\dfrac{AB}{BC}$',
          choices: [
            'In right $\\Delta ABC$, $\\tan 30^\\circ = \\dfrac{AB}{BC}$',
            'In right $\\Delta ABC$, $\\sin 30^\\circ = \\dfrac{AB}{BC}$',
            'In right $\\Delta ABC$, $\\tan 30^\\circ = \\dfrac{BC}{AB}$',
          ],
        },
        {
          statement: '$BD = \\dfrac{h}{\\tan 60^\\circ} = \\dfrac{h}{\\sqrt3}$',
          reason: 'In right $\\Delta ABD$, $\\tan 60^\\circ = \\dfrac{AB}{BD}$',
        },
        {
          statement: '$CD = BC + BD = h\\sqrt3 + \\dfrac{h}{\\sqrt3}$',
          reason: 'The ships are on opposite sides of the foot, so add',
          choices: [
            'The ships are on opposite sides of the foot, so add',
            'The ships are on the same side, so subtract',
            'Pythagoras theorem',
          ],
        },
        {
          statement: '$CD = \\dfrac{3h + h}{\\sqrt3} = \\dfrac{4h}{\\sqrt3}$',
          reason: 'Common denominator $\\sqrt3$',
          choices: ['Common denominator $\\sqrt3$', 'Rationalise the denominator', '$\\sqrt3 \\times \\sqrt3 = 9$'],
        },
      ],
      solution: [],
    },
    {
      id: 'ex63-6',
      source: 'Exercise 6.3 · Q6',
      type: 'numeric',
      prompt:
        'A lift in a building of height 90 feet with transparent glass walls is descending from the top of the building. At the top, the angle of depression to a fountain in the garden is $60^\\circ$. Two minutes later, the angle of depression reduces to $30^\\circ$. If the fountain is $30\\sqrt3$ feet from the entrance of the lift, find the speed at which the lift is descending.',
      figure: {
        view: [-12, -10, 66, 100],
        maxWidth: 280,
        ground: true,
        objects: [{ type: 'building', at: [-5, 0], h: 90, w: 10 }],
        points: { E: [0, 0], T: [0, 90], L: [0, 30], F: [51.96, 0] },
        names: { E: 'E', T: 'T', L: 'L', F: 'F' },
        labelDir: { E: 's', T: 'nw', L: 'w', F: 's' },
        segs: [
          { a: 'E', b: 'L', color: 'opp', label: '30 ft', labelSide: -1 },
          { a: 'L', b: 'T', color: 'accent', label: '60 ft', labelSide: -1 },
          { a: 'E', b: 'F', color: 'adj', label: '30√3 ft', labelSide: -1 },
          { a: 'T', b: 'F', kind: 'sight', color: 'hyp' },
          { a: 'L', b: 'F', kind: 'sight', color: 'hyp' },
        ],
        angles: [
          { at: 'F', from: 'E', to: 'T', label: '60°', r: 18 },
          { at: 'F', from: 'E', to: 'L', label: '30°', r: 30 },
        ],
      },
      parts: [{ answer: { value: 30, unit: 'feet/min', display: '30 feet per minute' } }],
      hints: [
        'The fountain stays still. After two minutes, the lift is at height $30\\sqrt3 \\tan 30^\\circ$.',
        'How far did the lift come down in those two minutes?',
      ],
      solution: [
        {
          text: 'Check the start: from the top, $\\tan 60^\\circ = \\dfrac{90}{EF}$ gives $EF = 30\\sqrt3$, as stated.',
        },
        {
          text: 'After two minutes, with an angle of $30^\\circ$:',
          math: 'EL = 30\\sqrt3 \\times \\tan 30^\\circ = 30\\sqrt3 \\times \\frac{1}{\\sqrt3} = 30 \\text{ ft}',
        },
        { math: 'TL = 90 - 30 = 60 \\text{ ft in 2 minutes} \\;\\Rightarrow\\; \\text{speed} = 30 \\text{ ft/min}' },
      ],
    },
    {
      id: 'u6-8',
      source: 'Unit Exercise 6 · Q8',
      type: 'numeric',
      prompt:
        'Two ships are sailing in the sea on either side of a lighthouse. The angles of depression of the two ships as observed from the top of the lighthouse are $60^\\circ$ and $45^\\circ$. If the distance between the ships is $200\\left(\\dfrac{\\sqrt3 + 1}{\\sqrt3}\\right)$ m, find the height of the lighthouse.',
      parts: [{ answer: { value: 200, unit: 'm', display: '200 m' } }],
      hints: [
        'With height $h$, the ships are $h\\cot 60^\\circ$ and $h\\cot 45^\\circ$ from the foot, on opposite sides.',
      ],
      solution: [
        { math: '\\frac{h}{\\sqrt3} + h = h\\left(\\frac{1 + \\sqrt3}{\\sqrt3}\\right)' },
        {
          math: 'h\\left(\\frac{\\sqrt3 + 1}{\\sqrt3}\\right) = 200\\left(\\frac{\\sqrt3 + 1}{\\sqrt3}\\right) \\;\\Rightarrow\\; h = 200 \\text{ m}',
        },
      ],
    },
    {
      id: 'l5-p-cliff',
      source: 'Practice',
      type: 'numeric',
      prompt:
        'From the top of a 75 m cliff, the angles of depression of two boats on the same side, in a line with the foot, are $45^\\circ$ and $30^\\circ$. How far apart are the boats? ($\\sqrt3 = 1.732$)',
      parts: [{ answer: { value: 75 * (R3 - 1), unit: 'm', display: '54.9 m' } }],
      solution: [
        {
          math: '\\text{nearer: } \\frac{75}{\\tan 45^\\circ} = 75, \\qquad \\text{farther: } \\frac{75}{\\tan 30^\\circ} = 75\\sqrt3',
        },
        { math: '75\\sqrt3 - 75 = 75(\\sqrt3 - 1) = 75 \\times 0.732 = 54.9 \\text{ m}' },
      ],
    },
  ],

  quiz: [
    {
      id: 'l5-q1',
      type: 'mcq',
      prompt:
        'Why is the angle of depression of a boat from the top of a cliff equal to the angle of elevation of the top of the cliff from the boat?',
      options: [
        'They are alternate angles between two parallel horizontal lines',
        'They are vertically opposite angles',
        'They are complementary angles',
        'The cliff is vertical',
      ],
      correct: 0,
      solution: [
        {
          text: 'The horizontal through the eye is parallel to the sea, and the line of sight crosses both: alternate angles are equal.',
        },
      ],
    },
    {
      id: 'l5-q2',
      type: 'numeric',
      prompt:
        'From the top of a 30 m tower, the angle of depression of a point on the ground is $60^\\circ$. How far is the point from the foot of the tower?',
      parts: [{ answer: { value: 10 * R3, unit: 'm', display: '10√3 m (17.32 m)' } }],
      solution: [
        { math: 'd = \\frac{30}{\\tan 60^\\circ} = \\frac{30}{\\sqrt3} = 10\\sqrt3 \\approx 17.32 \\text{ m}' },
      ],
    },
    {
      id: 'l5-q3',
      type: 'mcq',
      prompt:
        'A ship sails straight away from a lighthouse. The angle of depression of the ship from the top of the lighthouse',
      options: ['increases', 'decreases', 'stays the same', 'becomes $90^\\circ$'],
      correct: 1,
      solution: [{ text: 'The farther the ship, the flatter the line of sight, so the angle **decreases**.' }],
    },
    {
      id: 'l5-q4',
      type: 'numeric',
      prompt:
        'From the top of a 100 m cliff, the angle of depression of a boat changes from $60^\\circ$ to $30^\\circ$ in 20 seconds as it sails directly away. Find its speed in m/s. ($\\sqrt3 = 1.732$)',
      parts: [{ answer: { value: 200 / R3 / 20, unit: 'm/s', display: '5.77 m/s' } }],
      solution: [
        {
          math: '\\text{distance moved} = \\frac{100}{\\tan 30^\\circ} - \\frac{100}{\\tan 60^\\circ} = 100\\sqrt3 - \\frac{100}{\\sqrt3} = \\frac{200}{\\sqrt3} = 115.47 \\text{ m}',
        },
        { math: '\\text{speed} = \\frac{115.47}{20} = 5.77 \\text{ m/s}' },
      ],
    },
    {
      id: 'l5-q5',
      source: 'Exercise 6.5 · Q13',
      type: 'mcq',
      prompt:
        'The angles of depression of the top and bottom of a 20 m tall building from the top of a multistoried building are $30^\\circ$ and $60^\\circ$ respectively. The height of the multistoried building and the distance between the two buildings (in metres) are',
      options: ['$20,\\ 10\\sqrt3$', '$30,\\ 5\\sqrt3$', '$20,\\ 10$', '$30,\\ 10\\sqrt3$'],
      correct: 3,
      keepOrder: true,
      solution: [
        { math: 'H = d\\tan 60^\\circ = \\sqrt3\\,d, \\qquad H - 20 = d\\tan 30^\\circ = \\frac{d}{\\sqrt3}' },
        {
          math: '\\sqrt3\\,d - \\frac{d}{\\sqrt3} = 20 \\;\\Rightarrow\\; \\frac{2d}{\\sqrt3} = 20 \\;\\Rightarrow\\; d = 10\\sqrt3, \\quad H = 30',
        },
      ],
    },
  ],
}
