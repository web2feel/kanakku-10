import type { Lesson, SceneSpec } from '../types'

const CEVA = 'Ceva’s theorem'
const MEN = 'Menelaus’ theorem'
const ABT = 'Angle Bisector Theorem'

const cevaFig: SceneSpec = {
  view: [-0.6, -0.7, 7.6, 5.9],
  maxWidth: 320,
  points: { A: [2.2, 5.4], B: [0, 0], C: [7, 0], O: [3, 1.8], D: [3.4, 0], E: [4.57, 2.74], F: [1.09, 2.66] },
  labelDir: { A: 'n', B: 'sw', C: 'se', O: 'e', D: 's', E: 'ne', F: 'nw' },
  fills: [{ pts: ['A', 'B', 'C'], tone: 'sky' }],
  segs: [
    { a: 'A', b: 'B' },
    { a: 'B', b: 'C' },
    { a: 'C', b: 'A' },
    { a: 'A', b: 'D', color: 'accent' },
    { a: 'B', b: 'E', color: 'accent' },
    { a: 'C', b: 'F', color: 'accent' },
  ],
}

export const lesson8: Lesson = {
  id: 'concurrency',
  number: 8,
  title: 'Ceva and Menelaus',
  summary:
    'Cevians, when three of them meet at a point (Ceva), and when three points on the sides lie on a line (Menelaus).',
  pages: '195–198',
  status: 'ready',

  learn: [
    {
      id: 'cevian',
      title: 'Cevians',
      blocks: [
        {
          t: 'p',
          text: 'A **cevian** is a line segment from a vertex of a triangle to the opposite side (or that side extended). Three cevians you already know:',
        },
        {
          t: 'list',
          items: [
            'A **median** goes to the midpoint of the opposite side.',
            'An **altitude** is perpendicular to the opposite side.',
            'An **angle bisector** cuts the angle at the vertex into two equal parts.',
          ],
        },
        {
          t: 'note',
          tone: 'history',
          text: 'The name comes from Giovanni Ceva (1647–1734), an Italian engineer and mathematician at the University of Mantua, who published his theorem about cevians in 1678.',
        },
      ],
      check: {
        id: 'geo8-c-cevian',
        type: 'mcq',
        prompt: 'A cevian that divides the angle at a vertex into two equal halves is',
        options: ['an angle bisector', 'a median', 'an altitude', 'a tangent'],
        correct: 0,
        solution: [{ text: 'That is the definition of the angle bisector.' }],
      },
    },
    {
      id: 'ceva',
      title: 'Ceva’s theorem',
      blocks: [
        { t: 'figure', scene: cevaFig, caption: 'AD, BE, CF meet at one point O' },
        {
          t: 'p',
          text: 'Let $D$, $E$, $F$ be points on the lines $BC$, $CA$, $AB$. The cevians $AD$, $BE$, $CF$ are **concurrent** (meet at one point) if and only if',
        },
        { t: 'math', tex: '\\frac{BD}{DC} \\times \\frac{CE}{EA} \\times \\frac{AF}{FB} = 1' },
        {
          t: 'note',
          tone: 'tip',
          text: 'Read the ratios by walking around the triangle: $B \\to D \\to C \\to E \\to A \\to F \\to B$. Each ratio is "from a vertex to the point, over from the point to the next vertex".',
        },
        {
          t: 'p',
          text: 'The textbook states it without proof. Because it works both ways, it can prove that three lines meet (multiply the ratios and get 1), or find a missing length (if you know they meet).',
        },
      ],
      check: {
        id: 'geo8-c-ceva',
        type: 'numeric',
        prompt:
          'Three cevians of $\\Delta ABC$ are concurrent. If $\\dfrac{BD}{DC} = 2$ and $\\dfrac{CE}{EA} = 3$, find $\\dfrac{AF}{FB}$.',
        parts: [{ answer: { value: 1 / 6, display: '1/6' } }],
        solution: [{ math: '2 \\times 3 \\times \\frac{AF}{FB} = 1 \\;\\Rightarrow\\; \\frac{AF}{FB} = \\frac16' }],
      },
    },
    {
      id: 'menelaus',
      title: 'Menelaus’ theorem',
      blocks: [
        {
          t: 'p',
          text: 'Points $P$, $Q$, $R$ on the lines $BC$, $CA$, $AB$ (extended where needed) lie on one straight line if and only if',
        },
        { t: 'math', tex: '\\frac{BP}{PC} \\times \\frac{CQ}{QA} \\times \\frac{AR}{RB} = -1' },
        {
          t: 'p',
          text: 'The $-1$ comes from **directed** segments: a length counts as negative when it points the other way along its line. A straight line can cross only two sides of a triangle internally, so at least one of the points is outside its side, and the signs multiply to $-1$. With plain lengths, the product is 1.',
        },
        {
          t: 'note',
          tone: 'history',
          text: 'Menelaus of Alexandria lived in the 1st century CE. The theorem appears in his book *Sphaerica*, about triangles drawn on a sphere, and was later used by Ptolemy in the *Almagest*.',
        },
      ],
      check: {
        id: 'geo8-c-menelaus',
        type: 'mcq',
        prompt: 'Menelaus’ theorem tells you when three points on the sides of a triangle are',
        options: ['collinear', 'concurrent', 'equidistant from a vertex', 'on a circle'],
        correct: 0,
        solution: [
          {
            text: 'Menelaus is about three points on one line (collinear); Ceva is about three lines through one point (concurrent).',
          },
        ],
      },
    },
    {
      id: 'concurrent',
      title: 'Using Ceva to prove lines meet',
      blocks: [
        {
          t: 'p',
          text: 'To show three cevians are concurrent, work out the three ratios and multiply. For medians, each ratio is 1 (each point is a midpoint), so the medians meet at a point, the **centroid**.',
        },
        {
          t: 'p',
          text: 'For angle bisectors, the Angle Bisector Theorem gives each ratio as a ratio of sides, and the sides cancel when you multiply. So the angle bisectors meet too, at the **incentre**.',
        },
      ],
      check: {
        id: 'geo8-c-conc',
        type: 'mcq',
        prompt: 'The point where the medians of a triangle meet is called the',
        options: ['centroid', 'incentre', 'circumcentre', 'orthocentre'],
        correct: 0,
        solution: [{ text: 'The medians meet at the centroid.' }],
      },
    },
  ],

  explore: [
    {
      widget: 'ceva-lab',
      title: 'Ceva and Menelaus lab',
      intro:
        'In "Ceva", drag the point inside the triangle: three cevians pass through it. In "Menelaus", drag the two handles to swing a line across the triangle.',
      tryThis: [
        'Find the point where all three ratios equal 1. Which point is it?',
        'In "Menelaus", make the line cross two sides. How many points lie outside their sides?',
        'Can you place the line so that it crosses all three sides outside the triangle?',
      ],
    },
  ],

  examples: [
    {
      id: 'geo8-ex32',
      source: 'Example 4.32',
      title: 'The medians are concurrent',
      prompt: 'Show that the medians of a triangle are concurrent.',
      steps: [
        {
          text: 'The medians are the cevians $AD$, $BE$, $CF$ where $D$, $E$, $F$ are the midpoints of $BC$, $CA$, $AB$.',
        },
        {
          math: 'BD = DC,\\ CE = EA,\\ AF = FB \\;\\Rightarrow\\; \\frac{BD}{DC} = \\frac{CE}{EA} = \\frac{AF}{FB} = 1',
        },
        { math: '\\frac{BD}{DC} \\times \\frac{CE}{EA} \\times \\frac{AF}{FB} = 1 \\times 1 \\times 1 = 1' },
        { text: 'Ceva’s condition holds, so the medians are concurrent.' },
      ],
      answer: 'The medians meet at one point, the centroid.',
    },
    {
      id: 'geo8-ex33',
      source: 'Example 4.33',
      title: 'A missing length from Ceva',
      prompt:
        'In $\\Delta ABC$, $D$, $E$, $F$ lie on $BC$, $CA$, $AB$, and $AD$, $BE$, $CF$ are concurrent. $AB = 13$, $AC = 14$, $BC = 15$, $\\dfrac{AF}{FB} = \\dfrac25$ and $\\dfrac{CE}{EA} = \\dfrac58$. Find $BD$ and $DC$.',
      steps: [
        { text: 'Let $BD = x$ and $DC = y$. By Ceva’s theorem:' },
        {
          math: '\\frac{x}{y} \\times \\frac58 \\times \\frac25 = 1 \\;\\Rightarrow\\; \\frac{x}{y} \\times \\frac14 = 1 \\;\\Rightarrow\\; x = 4y',
        },
        { math: 'x + y = BC = 15 \\;\\Rightarrow\\; 5y = 15 \\;\\Rightarrow\\; y = 3,\\ x = 12' },
      ],
      answer: '$BD = 12$, $DC = 3$',
    },
    {
      id: 'geo8-ex34',
      source: 'Example 4.34',
      title: 'Are the three trees in a line?',
      prompt:
        'In a garden, trees $P$, $Q$, $R$ lie on $BC$, $AC$ and $AB$ (extended), with $BP = 2$ m, $CQ = 3$ m, $RA = 10$ m, $PC = 6$ m, $QA = 5$ m and $RB = 2$ m. Do $P$, $Q$, $R$ lie on one straight line?',
      steps: [
        {
          text: 'By Menelaus’ theorem (using lengths), $P$, $Q$, $R$ are collinear if $\\dfrac{BP}{PC} \\times \\dfrac{CQ}{QA} \\times \\dfrac{RA}{RB} = 1$.',
        },
        { math: '\\frac26 \\times \\frac35 \\times \\frac{10}{2} = \\frac{60}{60} = 1' },
      ],
      answer: 'Yes: the product is 1, so the trees are in a straight line.',
    },
  ],

  practice: [
    {
      id: 'geo8-p9',
      source: 'Exercise 4.4 · Q9',
      type: 'proof',
      prompt: 'Show that the angle bisectors of a triangle are concurrent.',
      given:
        'In $\\Delta ABC$, $AD$, $BE$, $CF$ bisect $\\angle A$, $\\angle B$, $\\angle C$, meeting $BC$, $CA$, $AB$ at $D$, $E$, $F$.',
      toProve: '$AD$, $BE$, $CF$ are concurrent.',
      steps: [
        {
          statement:
            '$\\dfrac{BD}{DC} = \\dfrac{AB}{AC}$, $\\dfrac{CE}{EA} = \\dfrac{BC}{BA}$, $\\dfrac{AF}{FB} = \\dfrac{CA}{CB}$',
          reason: ABT + ', for each bisector',
          choices: [ABT + ', for each bisector', 'Basic Proportionality Theorem', MEN],
        },
        {
          statement:
            '$\\dfrac{BD}{DC} \\times \\dfrac{CE}{EA} \\times \\dfrac{AF}{FB} = \\dfrac{AB}{AC} \\times \\dfrac{BC}{BA} \\times \\dfrac{CA}{CB} = 1$',
          reason: 'Multiplying: every side appears once on top and once below',
          choices: [
            'Multiplying: every side appears once on top and once below',
            'Adding the three ratios',
            'Pythagoras theorem',
          ],
        },
        { statement: '$AD$, $BE$, $CF$ are concurrent', reason: CEVA, choices: [CEVA, MEN, 'Converse of BPT'] },
      ],
      solution: [],
    },
    {
      id: 'geo8-p10',
      source: 'Exercise 4.4 · Q10',
      type: 'numeric',
      prompt:
        'An artist’s triangular stained-glass window $ABC$ has three strips meeting at one point: from $A$ to $D$ on $BC$, from $B$ to $E$ on $CA$, and from $C$ to $F$ on $AB$. $AF = 5$ cm, $BD = 3$ cm, $DC = 10$ cm, $CE = 4$ cm and $EA = 3$ cm. How long is the missing piece $FB$?',
      parts: [{ label: '$FB =$', answer: { value: 2, unit: 'cm', display: '2 cm' } }],
      hints: [
        'The strips meet at one point, so use Ceva: $\\tfrac{BD}{DC} \\times \\tfrac{CE}{EA} \\times \\tfrac{AF}{FB} = 1$.',
      ],
      solution: [
        {
          math: '\\frac{3}{10} \\times \\frac43 \\times \\frac{5}{FB} = 1 \\;\\Rightarrow\\; \\frac{2}{FB} = 1 \\;\\Rightarrow\\; FB = 2',
        },
      ],
    },
    {
      id: 'geo8-p-c1',
      source: 'Practice',
      type: 'numeric',
      prompt:
        'In $\\Delta ABC$, cevians $AD$, $BE$, $CF$ are concurrent. $BD = 4$, $DC = 6$, $CE = 5$, $EA = 2$ and $AB = 8$. Find $AF$ and $FB$.',
      parts: [
        { label: '$AF =$', answer: { value: 3, display: '3' } },
        { label: '$FB =$', answer: { value: 5, display: '5' } },
      ],
      hints: ['First find $\\tfrac{AF}{FB}$ from Ceva, then split $AB = 8$ in that ratio.'],
      solution: [
        {
          math: '\\frac46 \\times \\frac52 \\times \\frac{AF}{FB} = 1 \\;\\Rightarrow\\; \\frac53 \\times \\frac{AF}{FB} = 1 \\;\\Rightarrow\\; \\frac{AF}{FB} = \\frac35',
        },
        { math: 'AF = 8 \\times \\frac38 = 3, \\qquad FB = 8 \\times \\frac58 = 5' },
      ],
    },
    {
      id: 'geo8-p-m1',
      source: 'Practice',
      type: 'mcq',
      prompt:
        'Points $P$, $Q$, $R$ lie on $BC$, $CA$ and $AB$ extended, with $BP = 3$, $PC = 2$, $CQ = 4$, $QA = 6$, $AR = 5$ and $RB = 4$. Are $P$, $Q$, $R$ collinear?',
      options: [
        'No: the product is $\\tfrac54$, not 1',
        'Yes: the product is 1',
        'Yes, because $R$ is outside the side',
        'Cannot be decided',
      ],
      correct: 0,
      solution: [{ math: '\\frac32 \\times \\frac46 \\times \\frac54 = \\frac{60}{48} = \\frac54 \\ne 1' }],
    },
    {
      id: 'geo8-p-pc',
      source: 'Progress Check · page 197',
      type: 'mcq',
      prompt: 'Which statement about cevians is true?',
      options: [
        'A cevian may lie outside the triangle, meeting the opposite side extended',
        'A cevian always passes through the centroid',
        'Every cevian is perpendicular to the opposite side',
        'A triangle has exactly three cevians',
      ],
      correct: 0,
      solution: [
        {
          text: 'The textbook notes that cevians need not lie within the triangle. Each vertex has infinitely many cevians.',
        },
      ],
    },
  ],

  quiz: [
    {
      id: 'geo8-q1',
      type: 'mcq',
      prompt: 'Ceva’s theorem gives a condition for three cevians to be',
      options: ['concurrent', 'parallel', 'collinear', 'equal'],
      correct: 0,
      solution: [{ text: 'Ceva: three lines through one point. Menelaus: three points on one line.' }],
    },
    {
      id: 'geo8-q2',
      type: 'numeric',
      prompt:
        'Concurrent cevians give $\\dfrac{BD}{DC} = \\dfrac32$ and $\\dfrac{AF}{FB} = \\dfrac43$. Find $\\dfrac{CE}{EA}$.',
      parts: [{ answer: { value: 0.5, display: '1/2' } }],
      solution: [
        {
          math: '\\frac32 \\times \\frac{CE}{EA} \\times \\frac43 = 1 \\;\\Rightarrow\\; 2 \\times \\frac{CE}{EA} = 1 \\;\\Rightarrow\\; \\frac{CE}{EA} = \\frac12',
        },
      ],
    },
    {
      id: 'geo8-q3',
      type: 'mcq',
      prompt: 'With directed segments, the product in Menelaus’ theorem is',
      options: ['$-1$', '1', '0', '2'],
      correct: 0,
      solution: [
        { text: 'At least one of the three points lies outside its side, which makes the directed product $-1$.' },
      ],
    },
    {
      id: 'geo8-q4',
      type: 'numeric',
      prompt:
        'In $\\Delta ABC$ with $BC = 12$, concurrent cevians give $\\dfrac{CE}{EA} = 2$ and $\\dfrac{AF}{FB} = \\dfrac14$. Find $BD$.',
      parts: [{ answer: { value: 8, display: '8' } }],
      hints: ['First $\\tfrac{BD}{DC}$, then split 12 in that ratio.'],
      solution: [
        { math: '\\frac{BD}{DC} \\times 2 \\times \\frac14 = 1 \\;\\Rightarrow\\; \\frac{BD}{DC} = 2' },
        { math: 'BD = 12 \\times \\frac23 = 8' },
      ],
    },
    {
      id: 'geo8-q5',
      type: 'mcq',
      prompt: 'Which cevian is perpendicular to the opposite side?',
      options: ['An altitude', 'A median', 'An angle bisector', 'Every cevian'],
      correct: 0,
      solution: [{ text: 'An altitude meets the opposite side at a right angle.' }],
    },
    {
      id: 'geo8-q6',
      type: 'mcq',
      prompt: 'Why are the medians of a triangle concurrent?',
      options: [
        'Each Ceva ratio is 1, so their product is 1',
        'Medians are always perpendicular to the sides',
        'Medians bisect the angles',
        'By Menelaus’ theorem',
      ],
      correct: 0,
      solution: [
        { text: 'Each median ends at a midpoint, so each ratio is 1, and Ceva’s condition holds (Example 4.32).' },
      ],
    },
  ],
}
