import type { Lesson, McqQuestion } from '../types'

const R3 = Math.sqrt(3)

/** Exercise 6.5, in the book's order; the A–D letters match the book. */
const mcq = (
  n: number,
  prompt: string,
  options: string[],
  correct: number,
  solution: McqQuestion['solution'],
): McqQuestion => ({
  id: `l7-q${n}`,
  source: `Exercise 6.5 · Q${n}`,
  type: 'mcq',
  prompt,
  options,
  correct,
  keepOrder: true,
  solution,
})

export const lesson7: Lesson = {
  id: 'review',
  number: 7,
  title: 'Chapter review',
  summary: 'Points to Remember, a few mixed problems, and the 15 multiple-choice questions of Exercise 6.5.',
  pages: '265–268',
  status: 'ready',

  learn: [
    {
      id: 'identities',
      title: 'Identities',
      blocks: [
        {
          t: 'list',
          items: [
            'A **trigonometric identity** is an equation in trigonometric ratios that is true for every value of the angle.',
            'The three fundamental identities: $\\sin^2\\theta + \\cos^2\\theta = 1$, $\\;1 + \\tan^2\\theta = \\sec^2\\theta$, $\\;1 + \\cot^2\\theta = \\cosec^2\\theta$.',
            'Rearranged: $1 - \\cos^2\\theta = \\sin^2\\theta$, $\\;\\sec^2\\theta - 1 = \\tan^2\\theta$, $\\;\\cosec^2\\theta - \\cot^2\\theta = 1$, and so on.',
            'To prove an identity, start from one side and transform it into the other. The usual tools: write in sin and cos, swap in an identity, multiply by the conjugate, combine fractions, use algebraic identities.',
          ],
        },
      ],
      check: {
        id: 'l7-c-id',
        type: 'numeric',
        prompt: 'Evaluate $\\dfrac{\\sec^2 40^\\circ - \\tan^2 40^\\circ}{\\cosec^2 50^\\circ - \\cot^2 50^\\circ}$.',
        parts: [{ answer: { value: 1, display: '1' } }],
        solution: [{ text: 'The numerator is 1 and the denominator is 1, by the second and third identities.' }],
      },
    },
    {
      id: 'heights',
      title: 'Heights and distances',
      blocks: [
        {
          t: 'list',
          items: [
            'The **line of sight** is the line from the eye of the observer to the point being viewed.',
            'The **angle of elevation** is the angle between the line of sight and the horizontal when the object is above eye level.',
            'The **angle of depression** is the angle between the line of sight and the horizontal when the object is below eye level. It equals the angle of elevation from the object (alternate angles).',
            'Heights, lengths and distances that cannot be measured directly can be found from one measured length and one measured angle, using the trigonometric ratios.',
          ],
        },
      ],
      check: {
        id: 'l7-c-heights',
        source: 'Thinking Corner · p.264',
        type: 'mcq',
        prompt: 'What is the least number of measurements you need to find the height of a tower from the ground?',
        options: [
          'Two: for example, one distance and one angle',
          'One: the angle of elevation',
          'Three: two angles and a distance',
          'Four: all the sides and angles',
        ],
        correct: 0,
        solution: [
          {
            text: 'A right triangle is fixed by one side and one acute angle (or by two sides). So two measurements are enough, such as the distance to the foot and the angle of elevation.',
          },
        ],
      },
    },
    {
      id: 'mcq-tip',
      title: 'A trick for identity MCQs',
      blocks: [
        {
          t: 'p',
          text: 'In a multiple-choice question, the correct option must work for **every** angle. So put in a convenient angle, work out the value, and keep only the options that give the same value.',
        },
        {
          t: 'p',
          text: 'Exercise 6.5 Q2 asks for $\\tan\\theta\\cosec^2\\theta - \\tan\\theta$. At $\\theta = 30^\\circ$: $\\tfrac{1}{\\sqrt3} \\times 4 - \\tfrac{1}{\\sqrt3} = \\tfrac{3}{\\sqrt3} = \\sqrt3$. Of the options, only $\\cot 30^\\circ = \\sqrt3$ matches.',
        },
        {
          t: 'note',
          tone: 'tip',
          text: 'Avoid $45^\\circ$ for this check: many ratios are equal there, so several options may match. If two options survive, test a second angle. In a written exam, you still need the proof.',
        },
      ],
    },
  ],

  explore: [
    {
      widget: 'identity-tester',
      title: 'Identity or not?',
      intro: 'Test any claim from the chapter by graphing both sides.',
    },
    {
      widget: 'lookout-lab',
      title: 'Look up, look down',
      intro: 'One last look at the two-triangle problems of Exercise 6.4 and Exercise 6.5 Q13 and Q15.',
    },
  ],

  examples: [
    {
      id: 'l7-ex-q3',
      source: 'Exercise 6.5 · Q3',
      title: 'Finding k',
      prompt:
        'If $(\\sin\\alpha + \\cosec\\alpha)^2 + (\\cos\\alpha + \\sec\\alpha)^2 = k + \\tan^2\\alpha + \\cot^2\\alpha$, find $k$.',
      steps: [
        {
          text: 'Expand. Note $\\sin\\alpha\\cosec\\alpha = 1$ and $\\cos\\alpha\\sec\\alpha = 1$:',
          math: '\\sin^2\\alpha + 2 + \\cosec^2\\alpha + \\cos^2\\alpha + 2 + \\sec^2\\alpha',
        },
        { math: '= 1 + 4 + \\cosec^2\\alpha + \\sec^2\\alpha' },
        {
          text: 'Write $\\cosec^2\\alpha = 1 + \\cot^2\\alpha$ and $\\sec^2\\alpha = 1 + \\tan^2\\alpha$:',
          math: '= 7 + \\tan^2\\alpha + \\cot^2\\alpha',
        },
      ],
      answer: '$k = 7$, option (B).',
    },
    {
      id: 'l7-ex-q8',
      source: 'Exercise 6.5 · Q8',
      title: 'A product of two brackets',
      prompt: 'Find the value of $(1 + \\tan\\theta + \\sec\\theta)(1 + \\cot\\theta - \\cosec\\theta)$.',
      steps: [
        {
          text: 'Write each bracket as one fraction:',
          math: '\\left(\\frac{\\cos\\theta + \\sin\\theta + 1}{\\cos\\theta}\\right)\\left(\\frac{\\sin\\theta + \\cos\\theta - 1}{\\sin\\theta}\\right)',
        },
        {
          text: 'The numerators are $(a + 1)(a - 1)$ with $a = \\sin\\theta + \\cos\\theta$:',
          math: '= \\frac{(\\sin\\theta + \\cos\\theta)^2 - 1}{\\sin\\theta\\cos\\theta} = \\frac{1 + 2\\sin\\theta\\cos\\theta - 1}{\\sin\\theta\\cos\\theta} = 2',
        },
      ],
      answer: 'The value is 2, option (C).',
    },
    {
      id: 'l7-ex-q9',
      source: 'Exercise 6.5 · Q9',
      title: 'Squaring two conditions',
      prompt: 'If $a\\cot\\theta + b\\cosec\\theta = p$ and $b\\cot\\theta + a\\cosec\\theta = q$, find $p^2 - q^2$.',
      steps: [
        { math: 'p^2 = a^2\\cot^2\\theta + 2ab\\cot\\theta\\cosec\\theta + b^2\\cosec^2\\theta' },
        { math: 'q^2 = b^2\\cot^2\\theta + 2ab\\cot\\theta\\cosec\\theta + a^2\\cosec^2\\theta' },
        {
          text: 'Subtract; the middle terms cancel:',
          math: 'p^2 - q^2 = (a^2 - b^2)\\cot^2\\theta - (a^2 - b^2)\\cosec^2\\theta = (a^2 - b^2)(\\cot^2\\theta - \\cosec^2\\theta)',
        },
        { text: 'Since $\\cot^2\\theta - \\cosec^2\\theta = -1$:', math: 'p^2 - q^2 = b^2 - a^2' },
      ],
      answer: '$p^2 - q^2 = b^2 - a^2$, option (B).',
    },
    {
      id: 'l7-ex-q14',
      source: 'Exercise 6.5 · Q14',
      title: 'Complementary angles of elevation',
      prompt:
        'Two persons are standing $x$ metres apart, and the first is twice as tall as the other. From the midpoint of the line joining their feet, an observer finds the angles of elevation of their tops to be complementary. Find the height of the shorter person.',
      figure: {
        view: [-1.2, -0.9, 11.2, 7.6],
        maxWidth: 380,
        ground: true,
        points: { A: [0, 0], B: [0, 3.54], M: [5, 0], C: [10, 0], D: [10, 7.07] },
        labelDir: { A: 's', B: 'nw', M: 's', C: 's', D: 'ne' },
        segs: [
          { a: 'A', b: 'B', color: 'opp', label: 'h', labelSide: 1 },
          { a: 'C', b: 'D', color: 'opp', label: '2h', labelSide: -1 },
          { a: 'A', b: 'M', color: 'adj', label: 'x/2', labelSide: -1 },
          { a: 'M', b: 'C', color: 'adj', label: 'x/2', labelSide: -1 },
          { a: 'M', b: 'B', kind: 'sight', color: 'hyp' },
          { a: 'M', b: 'D', kind: 'sight', color: 'hyp' },
        ],
        angles: [
          { at: 'M', from: 'A', to: 'B', label: '90° − α', r: 34 },
          { at: 'M', from: 'C', to: 'D', label: 'α', r: 26 },
        ],
      },
      steps: [
        {
          text: 'Let the heights be $h$ and $2h$, and the angle at the taller person be $\\alpha$, so the other is $90^\\circ - \\alpha$.',
        },
        {
          math: '\\tan\\alpha = \\frac{2h}{x/2} = \\frac{4h}{x}, \\qquad \\tan(90^\\circ - \\alpha) = \\cot\\alpha = \\frac{h}{x/2} = \\frac{2h}{x}',
        },
        {
          text: 'Since $\\tan\\alpha \\cdot \\cot\\alpha = 1$:',
          math: '\\frac{4h}{x} \\cdot \\frac{2h}{x} = 1 \\;\\Rightarrow\\; 8h^2 = x^2 \\;\\Rightarrow\\; h = \\frac{x}{2\\sqrt2}',
        },
      ],
      answer: 'The shorter person is $\\dfrac{x}{2\\sqrt2}$ m tall, option (B).',
    },
  ],

  practice: [
    {
      id: 'l7-p-chain1',
      source: 'Chapter review',
      type: 'chain',
      prompt: 'Prove the identity, one line at a time.',
      toProve: '(1 + \\tan\\theta)^2 + (1 - \\tan\\theta)^2 = 2\\sec^2\\theta',
      start: '(1 + \\tan\\theta)^2 + (1 - \\tan\\theta)^2',
      steps: [
        {
          tex: '1 + 2\\tan\\theta + \\tan^2\\theta + 1 - 2\\tan\\theta + \\tan^2\\theta',
          why: 'Expand both squares.',
          wrong: [
            '1 + \\tan^2\\theta + 1 - \\tan^2\\theta',
            '1 + 2\\tan\\theta + \\tan^2\\theta + 1 + 2\\tan\\theta + \\tan^2\\theta',
          ],
        },
        { tex: '2 + 2\\tan^2\\theta' },
        {
          tex: '2(1 + \\tan^2\\theta)',
          wrong: ['2(1 + \\tan\\theta)^2'],
        },
        { tex: '2\\sec^2\\theta', why: '$1 + \\tan^2\\theta = \\sec^2\\theta$.' },
      ],
      solution: [],
    },
    {
      id: 'l7-p-chain2',
      source: 'Chapter review',
      type: 'chain',
      prompt: 'Prove the identity, one line at a time.',
      toProve:
        '\\frac{\\cos\\theta}{1 - \\tan\\theta} + \\frac{\\sin\\theta}{1 - \\cot\\theta} = \\sin\\theta + \\cos\\theta',
      start: '\\frac{\\cos\\theta}{1 - \\tan\\theta} + \\frac{\\sin\\theta}{1 - \\cot\\theta}',
      steps: [
        {
          tex: '\\frac{\\cos\\theta}{1 - \\frac{\\sin\\theta}{\\cos\\theta}} + \\frac{\\sin\\theta}{1 - \\frac{\\cos\\theta}{\\sin\\theta}}',
        },
        {
          tex: '\\frac{\\cos^2\\theta}{\\cos\\theta - \\sin\\theta} + \\frac{\\sin^2\\theta}{\\sin\\theta - \\cos\\theta}',
          why: 'Multiply the top and the bottom of each fraction by its own small denominator.',
          wrong: [
            '\\frac{\\cos^2\\theta}{\\cos\\theta - \\sin\\theta} + \\frac{\\sin^2\\theta}{\\cos\\theta - \\sin\\theta}',
            '\\frac{\\cos\\theta}{\\cos\\theta - \\sin\\theta} + \\frac{\\sin\\theta}{\\sin\\theta - \\cos\\theta}',
          ],
        },
        {
          tex: '\\frac{\\cos^2\\theta - \\sin^2\\theta}{\\cos\\theta - \\sin\\theta}',
          why: 'The second denominator is the negative of the first.',
          wrong: ['\\frac{\\cos^2\\theta + \\sin^2\\theta}{\\cos\\theta - \\sin\\theta}'],
        },
        {
          tex: '\\frac{(\\cos\\theta - \\sin\\theta)(\\cos\\theta + \\sin\\theta)}{\\cos\\theta - \\sin\\theta}',
          wrong: ['\\frac{(\\cos\\theta - \\sin\\theta)^2}{\\cos\\theta - \\sin\\theta}'],
        },
        { tex: '\\cos\\theta + \\sin\\theta' },
        { tex: '\\sin\\theta + \\cos\\theta' },
      ],
      solution: [],
    },
    {
      id: 'l7-p-ratio',
      source: 'Chapter review',
      type: 'numeric',
      prompt: 'If $\\sin\\theta = \\dfrac{5}{13}$ and $\\theta$ is acute, find $\\sec\\theta + \\tan\\theta$.',
      parts: [{ answer: { value: 1.5, display: '3/2' } }],
      solution: [
        {
          math: '\\cos\\theta = \\frac{12}{13}, \\quad \\sec\\theta = \\frac{13}{12}, \\quad \\tan\\theta = \\frac{5}{12}',
        },
        { math: '\\sec\\theta + \\tan\\theta = \\frac{18}{12} = \\frac32' },
      ],
    },
    {
      id: 'l7-p-walk',
      source: 'Chapter review',
      type: 'numeric',
      prompt:
        'A 1.5 m tall boy stands some distance from a 30 m building. As he walks towards it, the angle of elevation of its top from his eyes changes from $30^\\circ$ to $60^\\circ$. How far did he walk? ($\\sqrt3 = 1.732$)',
      parts: [{ answer: { value: 19 * R3, unit: 'm', display: '19√3 m (32.91 m)' } }],
      hints: ['Work with the height above his eyes: $30 - 1.5 = 28.5$ m.'],
      solution: [
        {
          math: '\\text{before: } \\frac{28.5}{\\tan 30^\\circ} = 28.5\\sqrt3, \\qquad \\text{after: } \\frac{28.5}{\\tan 60^\\circ} = \\frac{28.5}{\\sqrt3}',
        },
        { math: '28.5\\sqrt3 - \\frac{28.5}{\\sqrt3} = \\frac{57}{\\sqrt3} = 19\\sqrt3 = 32.91 \\text{ m}' },
      ],
    },
    {
      id: 'l7-p-ship',
      source: 'Chapter review',
      type: 'numeric',
      prompt:
        'From the top of a 100 m lighthouse, the angle of depression of a ship sailing towards it changes from $30^\\circ$ to $45^\\circ$. How far did the ship sail? ($\\sqrt3 = 1.732$)',
      parts: [{ answer: { value: 100 * (R3 - 1), unit: 'm', display: '73.2 m' } }],
      solution: [{ math: '100\\sqrt3 - 100 = 100(\\sqrt3 - 1) = 100 \\times 0.732 = 73.2 \\text{ m}' }],
    },
  ],

  quiz: [
    mcq(
      1,
      'The value of $\\sin^2\\theta + \\dfrac{1}{1 + \\tan^2\\theta}$ is equal to',
      ['$\\tan^2\\theta$', '$1$', '$\\cot^2\\theta$', '$0$'],
      1,
      [
        {
          math: '\\frac{1}{1 + \\tan^2\\theta} = \\frac{1}{\\sec^2\\theta} = \\cos^2\\theta, \\quad \\sin^2\\theta + \\cos^2\\theta = 1',
        },
      ],
    ),
    mcq(
      2,
      '$\\tan\\theta\\cosec^2\\theta - \\tan\\theta$ is equal to',
      ['$\\sec\\theta$', '$\\cot^2\\theta$', '$\\sin\\theta$', '$\\cot\\theta$'],
      3,
      [{ math: '\\tan\\theta(\\cosec^2\\theta - 1) = \\tan\\theta\\cot^2\\theta = \\cot\\theta' }],
    ),
    mcq(
      3,
      'If $(\\sin\\alpha + \\cosec\\alpha)^2 + (\\cos\\alpha + \\sec\\alpha)^2 = k + \\tan^2\\alpha + \\cot^2\\alpha$, then the value of $k$ is equal to',
      ['$9$', '$7$', '$5$', '$3$'],
      1,
      [{ math: '1 + 4 + \\cosec^2\\alpha + \\sec^2\\alpha = 7 + \\cot^2\\alpha + \\tan^2\\alpha' }],
    ),
    mcq(
      4,
      'If $\\sin\\theta + \\cos\\theta = a$ and $\\sec\\theta + \\cosec\\theta = b$, then the value of $b(a^2 - 1)$ is equal to',
      ['$2a$', '$3a$', '$0$', '$2ab$'],
      0,
      [
        {
          math: 'a^2 - 1 = 2\\sin\\theta\\cos\\theta, \\quad b = \\frac{\\sin\\theta + \\cos\\theta}{\\sin\\theta\\cos\\theta} \\;\\Rightarrow\\; b(a^2 - 1) = 2a',
        },
      ],
    ),
    mcq(
      5,
      'If $5x = \\sec\\theta$ and $\\dfrac{5}{y} = \\tan\\theta$, then $x^2 - \\dfrac{1}{y^2}$ is equal to',
      ['$25$', '$\\dfrac{1}{25}$', '$5$', '$1$'],
      1,
      [
        {
          math: '\\sec^2\\theta - \\tan^2\\theta = 1 \\;\\Rightarrow\\; 25x^2 - \\frac{25}{y^2} = 1 \\;\\Rightarrow\\; x^2 - \\frac{1}{y^2} = \\frac{1}{25}',
        },
      ],
    ),
    mcq(
      6,
      'If $\\sin\\theta = \\cos\\theta$, then $2\\tan^2\\theta + \\sin^2\\theta - 1$ is equal to',
      ['$\\dfrac{-3}{2}$', '$\\dfrac32$', '$\\dfrac23$', '$\\dfrac{-2}{3}$'],
      1,
      [{ math: '\\theta = 45^\\circ: \\quad 2(1) + \\frac12 - 1 = \\frac32' }],
    ),
    mcq(
      7,
      'If $x = a\\tan\\theta$ and $y = b\\sec\\theta$, then',
      [
        '$\\dfrac{y^2}{b^2} - \\dfrac{x^2}{a^2} = 1$',
        '$\\dfrac{x^2}{a^2} - \\dfrac{y^2}{b^2} = 1$',
        '$\\dfrac{x^2}{a^2} + \\dfrac{y^2}{b^2} = 1$',
        '$\\dfrac{x^2}{a^2} - \\dfrac{y^2}{b^2} = 0$',
      ],
      0,
      [{ math: '\\frac{y^2}{b^2} - \\frac{x^2}{a^2} = \\sec^2\\theta - \\tan^2\\theta = 1' }],
    ),
    mcq(
      8,
      '$(1 + \\tan\\theta + \\sec\\theta)(1 + \\cot\\theta - \\cosec\\theta)$ is equal to',
      ['$0$', '$1$', '$2$', '$-1$'],
      2,
      [
        { text: 'See the worked example in the Examples tab.' },
        { math: '\\frac{(\\sin\\theta + \\cos\\theta)^2 - 1}{\\sin\\theta\\cos\\theta} = 2' },
      ],
    ),
    mcq(
      9,
      '$a\\cot\\theta + b\\cosec\\theta = p$ and $b\\cot\\theta + a\\cosec\\theta = q$, then $p^2 - q^2$ is equal to',
      ['$a^2 - b^2$', '$b^2 - a^2$', '$a^2 + b^2$', '$b - a$'],
      1,
      [{ math: 'p^2 - q^2 = (a^2 - b^2)(\\cot^2\\theta - \\cosec^2\\theta) = b^2 - a^2' }],
    ),
    mcq(
      10,
      'If the ratio of the height of a tower and the length of its shadow is $\\sqrt3 : 1$, then the angle of elevation of the sun has measure',
      ['$45^\\circ$', '$30^\\circ$', '$90^\\circ$', '$60^\\circ$'],
      3,
      [{ math: '\\tan\\theta = \\sqrt3 \\;\\Rightarrow\\; \\theta = 60^\\circ' }],
    ),
    mcq(
      11,
      'The electric pole subtends an angle of $30^\\circ$ at a point on the same level as its foot. At a second point $b$ metres above the first, the depression of the foot of the pole is $60^\\circ$. The height of the pole (in metres) is equal to',
      ['$\\sqrt3\\,b$', '$\\dfrac{b}{3}$', '$\\dfrac{b}{2}$', '$\\dfrac{b}{\\sqrt3}$'],
      1,
      [{ math: 'd = \\frac{b}{\\sqrt3}, \\quad H = d\\tan 30^\\circ = \\frac{b}{3}' }],
    ),
    mcq(
      12,
      'A tower is 60 m high. Its shadow reduces by $x$ metres when the angle of elevation of the sun increases from $30^\\circ$ to $45^\\circ$. Then $x$ is equal to',
      ['41.92 m', '43.92 m', '43 m', '45.6 m'],
      1,
      [{ math: 'x = 60\\sqrt3 - 60 = 60(\\sqrt3 - 1) = 60 \\times 0.732 = 43.92' }],
    ),
    mcq(
      13,
      'The angles of depression of the top and bottom of a 20 m tall building from the top of a multistoried building are $30^\\circ$ and $60^\\circ$ respectively. The height of the multistoried building and the distance between the two buildings (in metres) is',
      ['$20,\\ 10\\sqrt3$', '$30,\\ 5\\sqrt3$', '$20,\\ 10$', '$30,\\ 10\\sqrt3$'],
      3,
      [{ math: '\\sqrt3\\,d - \\frac{d}{\\sqrt3} = 20 \\;\\Rightarrow\\; d = 10\\sqrt3, \\quad H = \\sqrt3\\,d = 30' }],
    ),
    mcq(
      14,
      'Two persons are standing $x$ metres apart and the height of the first person is double that of the other. If from the middle point of the line joining their feet an observer finds the angular elevations of their tops to be complementary, then the height of the shorter person (in metres) is',
      ['$\\sqrt2\\,x$', '$\\dfrac{x}{2\\sqrt2}$', '$\\dfrac{x}{\\sqrt2}$', '$2x$'],
      1,
      [{ math: '\\frac{4h}{x} \\cdot \\frac{2h}{x} = 1 \\;\\Rightarrow\\; h = \\frac{x}{2\\sqrt2}' }],
    ),
    mcq(
      15,
      'The angle of elevation of a cloud from a point $h$ metres above a lake is $\\beta$. The angle of depression of its reflection in the lake is $45^\\circ$. The height of location of the cloud from the lake is',
      [
        '$\\dfrac{h(1 + \\tan\\beta)}{1 - \\tan\\beta}$',
        '$\\dfrac{h(1 - \\tan\\beta)}{1 + \\tan\\beta}$',
        '$h\\tan(45^\\circ - \\beta)$',
        'none of these',
      ],
      0,
      [
        {
          math: '\\tan\\beta = \\frac{H - h}{H + h} \\;\\Rightarrow\\; H = \\frac{h(1 + \\tan\\beta)}{1 - \\tan\\beta}',
        },
      ],
    ),
  ],
}
