import type { Lesson, SceneSpec } from '../types'

const BPT = 'Basic Proportionality Theorem'
const CONV = 'Converse of the Basic Proportionality Theorem'
const ABT = 'Angle Bisector Theorem'
const AA = 'AA similarity'
const CORR = 'Corresponding angles, as the lines are parallel'
const ALT = 'Alternate angles, as the lines are parallel'

const bptFig: SceneSpec = {
  view: [-0.5, -0.6, 6.6, 4.9],
  maxWidth: 340,
  points: { A: [2.2, 4.4], B: [0, 0], C: [6, 0], D: [1.32, 2.64], E: [3.76, 2.64] },
  labelDir: { A: 'n', D: 'w', E: 'e', B: 'sw', C: 'se' },
  fills: [{ pts: ['A', 'D', 'E'], tone: 'sun' }],
  segs: [
    { id: 'ad', a: 'A', b: 'D', color: 'opp' },
    { id: 'db', a: 'D', b: 'B', color: 'adj' },
    { id: 'ae', a: 'A', b: 'E', color: 'opp' },
    { id: 'ec', a: 'E', b: 'C', color: 'adj' },
    { a: 'B', b: 'C', parallel: true },
    { id: 'de', a: 'D', b: 'E', color: 'accent', parallel: true },
  ],
}

const abtFig: SceneSpec = {
  view: [-0.6, -0.7, 7.6, 5],
  maxWidth: 340,
  points: { A: [1.6, 4.4], B: [0, 0], C: [7, 0], D: [2.81, 0] },
  labelDir: { A: 'n', B: 'sw', C: 'se', D: 's' },
  segs: [
    { a: 'A', b: 'B', color: 'opp' },
    { a: 'A', b: 'C', color: 'adj' },
    { id: 'bd', a: 'B', b: 'D', color: 'opp' },
    { id: 'dc', a: 'D', b: 'C', color: 'adj' },
    { id: 'ad', a: 'A', b: 'D', color: 'accent' },
  ],
  angles: [
    { at: 'A', from: 'B', to: 'D', label: '1', r: 26 },
    { at: 'A', from: 'D', to: 'C', label: '2', r: 34 },
  ],
}

export const lesson3: Lesson = {
  id: 'thales',
  number: 3,
  title: 'Proportionality and angle bisector theorems',
  summary:
    'A line parallel to one side divides the other two in the same ratio; an angle bisector divides the opposite side in the ratio of the sides.',
  pages: '171–178',
  status: 'ready',

  learn: [
    {
      id: 'thales',
      title: 'Thales and the pyramid',
      blocks: [
        {
          t: 'p',
          text: 'Thales (about 640–540 BCE) was a Greek mathematician, often called the first of the Seven Sages. He was the first to insist that a claim in mathematics must be *proved*, and the first theorem credited to him is the one in this lesson.',
        },
        {
          t: 'note',
          tone: 'history',
          text: 'In Egypt, Thales was challenged to find the height of a pyramid. He compared its shadow with the shadow of a stick: the two right triangles are similar, so $\\tfrac{H_1}{X_1} = \\tfrac{H_0}{X_0}$.',
        },
        {
          t: 'note',
          tone: 'think',
          title: 'Activity 2',
          text: 'Draw a triangle on ruled paper with its base on one line. Each ruled line crossing it cuts $AB$ at $P$ and $AC$ at $Q$. Measure $AP$, $PB$, $AQ$, $QC$ and compare $\\tfrac{AP}{PB}$ with $\\tfrac{AQ}{QC}$. Try several lines.',
        },
      ],
      check: {
        id: 'geo3-c-thales',
        type: 'mcq',
        prompt: 'The Basic Proportionality Theorem is also known as',
        options: ['Thales theorem', 'Pythagoras theorem', 'Ceva’s theorem', 'the alternate segment theorem'],
        correct: 0,
        solution: [{ text: 'It is named after Thales, who is credited with its first proof.' }],
      },
    },
    {
      id: 'bpt',
      title: 'The Basic Proportionality Theorem',
      blocks: [
        {
          t: 'p',
          text: '**Theorem 1.** A straight line drawn parallel to one side of a triangle, cutting the other two sides, divides them in the same ratio.',
        },
        { t: 'figure', scene: bptFig, caption: 'DE ∥ BC' },
        { t: 'math', tex: 'DE \\parallel BC \\;\\Rightarrow\\; \\frac{AD}{DB} = \\frac{AE}{EC}' },
        {
          t: 'p',
          text: '**Why:** $DE \\parallel BC$ makes $\\angle ADE = \\angle ABC$ and $\\angle AED = \\angle ACB$ (corresponding angles), so $\\Delta ADE \\sim \\Delta ABC$. Then $\\tfrac{AB}{AD} = \\tfrac{AC}{AE}$, that is $1 + \\tfrac{DB}{AD} = 1 + \\tfrac{EC}{AE}$. Cancel the 1s and flip both sides.',
        },
        {
          t: 'p',
          text: '**Corollary.** In the same figure, $\\dfrac{AB}{AD} = \\dfrac{AC}{AE}$ and $\\dfrac{AB}{DB} = \\dfrac{AC}{EC}$: you can compare a part with the whole side, as long as you do the same on both sides.',
        },
      ],
      check: {
        id: 'geo3-c-bpt',
        type: 'numeric',
        prompt:
          'In $\\Delta ABC$, $DE \\parallel BC$ with $D$ on $AB$ and $E$ on $AC$. If $AD = 3$ cm, $DB = 2$ cm and $AE = 4.5$ cm, find $EC$.',
        parts: [{ answer: { value: 3, unit: 'cm', display: '3 cm' } }],
        solution: [{ math: '\\frac{3}{2} = \\frac{4.5}{EC} \\;\\Rightarrow\\; EC = 3' }],
      },
    },
    {
      id: 'converse',
      title: 'The converse: equal ratios mean parallel',
      blocks: [
        {
          t: 'p',
          text: '**Theorem 2.** If a straight line divides two sides of a triangle in the same ratio, then it is parallel to the third side.',
        },
        { t: 'math', tex: '\\frac{AD}{DB} = \\frac{AE}{EC} \\;\\Rightarrow\\; DE \\parallel BC' },
        {
          t: 'p',
          text: '**Why (by contradiction):** suppose $DE$ is not parallel to $BC$. Draw $DF \\parallel BC$ with $F$ on $AC$. By Theorem 1, $\\tfrac{AD}{DB} = \\tfrac{AF}{FC}$, so $\\tfrac{AE}{EC} = \\tfrac{AF}{FC}$. Adding 1 to both sides gives $\\tfrac{AC}{EC} = \\tfrac{AC}{FC}$, so $EC = FC$ and $E = F$ after all.',
        },
        {
          t: 'note',
          tone: 'tip',
          text: 'Use Theorem 1 when you **know** lines are parallel and want lengths. Use Theorem 2 when you know lengths and want to **prove** lines are parallel.',
        },
      ],
      check: {
        id: 'geo3-c-converse',
        type: 'mcq',
        prompt:
          'In $\\Delta ABC$, $AD = 2$, $DB = 3$, $AE = 4$, $EC = 6$ ($D$ on $AB$, $E$ on $AC$). Is $DE \\parallel BC$?',
        options: [
          'Yes, because $\\tfrac{AD}{DB} = \\tfrac{AE}{EC} = \\tfrac23$',
          'No, because $AD \\ne AE$',
          'No, because $DB \\ne EC$',
          'We cannot tell without measuring angles',
        ],
        correct: 0,
        solution: [{ text: '$\\tfrac{2}{3} = \\tfrac{4}{6}$, so by the converse of BPT, $DE \\parallel BC$.' }],
      },
    },
    {
      id: 'abt',
      title: 'The Angle Bisector Theorem',
      blocks: [
        {
          t: 'p',
          text: '**Theorem 3.** The internal bisector of an angle of a triangle divides the opposite side internally in the ratio of the sides containing the angle.',
        },
        { t: 'figure', scene: abtFig, caption: 'AD bisects ∠A' },
        { t: 'math', tex: '\\angle 1 = \\angle 2 \\;\\Rightarrow\\; \\frac{AB}{AC} = \\frac{BD}{DC}' },
        {
          t: 'p',
          text: '**Why:** draw a line through $C$ parallel to $AB$, and extend $AD$ to meet it at $E$. Alternate angles make $\\angle CEA = \\angle BAE = \\angle CAE$, so $\\Delta ACE$ is isosceles and $AC = CE$. Also $\\Delta ABD \\sim \\Delta ECD$ (AA), so $\\tfrac{AB}{CE} = \\tfrac{BD}{CD}$. Replace $CE$ by $AC$.',
        },
        {
          t: 'note',
          tone: 'tip',
          text: 'The longer side gets the longer piece: if $AB$ is twice $AC$, then $BD$ is twice $DC$.',
        },
      ],
      check: {
        id: 'geo3-c-abt',
        type: 'numeric',
        prompt:
          'In $\\Delta ABC$, $AB = 6$ cm, $AC = 9$ cm and $BC = 10$ cm. The bisector of $\\angle A$ meets $BC$ at $D$. Find $BD$.',
        parts: [{ answer: { value: 4, unit: 'cm', display: '4 cm' } }],
        hints: ['$BD : DC = 6 : 9 = 2 : 3$, and $BD + DC = 10$.'],
        solution: [{ math: 'BD = 10 \\times \\frac{2}{2 + 3} = 4' }],
      },
    },
    {
      id: 'abt-converse',
      title: 'The converse of the Angle Bisector Theorem',
      blocks: [
        {
          t: 'p',
          text: '**Theorem 4.** If a line through one vertex divides the opposite side in the ratio of the other two sides, then it bisects the angle at that vertex.',
        },
        { t: 'math', tex: '\\frac{AB}{AC} = \\frac{BD}{DC} \\;\\Rightarrow\\; AD \\text{ bisects } \\angle A' },
        {
          t: 'p',
          text: '**Why:** draw $CE \\parallel DA$, meeting $BA$ extended at $E$. By Thales in $\\Delta BCE$, $\\tfrac{BA}{AE} = \\tfrac{BD}{DC} = \\tfrac{AB}{AC}$, so $AE = AC$. Then $\\Delta ACE$ is isosceles, and the parallel lines carry its equal base angles back to the two halves of $\\angle A$.',
        },
        {
          t: 'note',
          tone: 'think',
          title: 'Activity 3',
          text: 'Cut out a triangle and fold it so that two sides meet: the crease is an angle bisector. Measure $AB$, $AC$, $BD$, $DC$ and compare $\\tfrac{AB}{AC}$ with $\\tfrac{BD}{DC}$.',
        },
      ],
      check: {
        id: 'geo3-c-abt-conv',
        type: 'mcq',
        prompt:
          'In $\\Delta ABC$, $AB = 4$ cm, $AC = 6$ cm, $BD = 1.6$ cm and $DC = 2.4$ cm. Is $AD$ the bisector of $\\angle A$?',
        options: [
          'Yes: $\\tfrac{AB}{AC} = \\tfrac{BD}{DC} = \\tfrac23$',
          'No: $AB \\ne AC$',
          'No: $BD \\ne DC$',
          'Only if $\\angle A = 90^\\circ$',
        ],
        correct: 0,
        solution: [
          {
            text: '$\\tfrac46 = \\tfrac23$ and $\\tfrac{1.6}{2.4} = \\tfrac23$. The ratios match, so $AD$ bisects $\\angle A$ (Exercise 4.2 Q8 (ii)).',
          },
        ],
      },
    },
  ],

  explore: [
    {
      widget: 'proportion-lab',
      title: 'Proportion lab',
      intro:
        'Three tools in one. Slide a parallel line through the triangle; move $D$ and $E$ separately to test the converse; or watch where the angle bisector lands. Drag the corners too.',
      tryThis: [
        'In "Parallel line", drag $A$ around. Do the two ratios ever differ?',
        'In "Converse", make the ratios equal. What happens to the colour of $DE$?',
        'In "Angle bisector", make $AB$ twice $AC$. Where is $D$?',
      ],
    },
  ],

  examples: [
    {
      id: 'geo3-ex12',
      source: 'Example 4.12',
      title: 'Thales with algebra',
      prompt:
        'In $\\Delta ABC$, $DE \\parallel BC$, $AD = x$, $DB = x - 2$, $AE = x + 2$ and $EC = x - 1$. Find the lengths of $AB$ and $AC$.',
      figure: {
        view: [-0.5, -0.6, 6.6, 4.9],
        maxWidth: 320,
        points: { A: [2.2, 4.4], B: [0, 0], C: [6, 0], D: [1.32, 2.64], E: [3.47, 2.93] },
        labelDir: { A: 'n', D: 'w', E: 'e', B: 'sw', C: 'se' },
        segs: [
          { a: 'A', b: 'D', label: 'x', labelSide: 1 },
          { a: 'D', b: 'B', label: 'x − 2', labelSide: 1 },
          { a: 'A', b: 'E', label: 'x + 2', labelSide: -1 },
          { a: 'E', b: 'C', label: 'x − 1', labelSide: -1 },
          { a: 'B', b: 'C', parallel: true },
          { a: 'D', b: 'E', color: 'accent', parallel: true },
        ],
      },
      steps: [
        { text: '$DE \\parallel BC$, so by Thales theorem $\\dfrac{AD}{DB} = \\dfrac{AE}{EC}$.' },
        { math: '\\frac{x}{x - 2} = \\frac{x + 2}{x - 1} \\;\\Rightarrow\\; x(x - 1) = (x - 2)(x + 2)' },
        { math: 'x^2 - x = x^2 - 4 \\;\\Rightarrow\\; x = 4' },
        { text: 'So $AD = 4$, $DB = 2$, $AE = 6$, $EC = 3$.' },
        { math: 'AB = 4 + 2 = 6, \\qquad AC = 6 + 3 = 9' },
      ],
      answer: '$AB = 6$, $AC = 9$',
    },
    {
      id: 'geo3-ex13',
      source: 'Example 4.13',
      title: 'Proving lines parallel',
      prompt:
        '$D$ and $E$ are points on $AB$ and $AC$ of $\\Delta ABC$, with $AB = 5.6$ cm, $AD = 1.4$ cm, $AC = 7.2$ cm and $AE = 1.8$ cm. Show that $DE \\parallel BC$.',
      steps: [
        { math: 'BD = 5.6 - 1.4 = 4.2, \\qquad EC = 7.2 - 1.8 = 5.4' },
        { math: '\\frac{AD}{DB} = \\frac{1.4}{4.2} = \\frac13, \\qquad \\frac{AE}{EC} = \\frac{1.8}{5.4} = \\frac13' },
        { text: 'The ratios are equal, so by the converse of the Basic Proportionality Theorem, $DE \\parallel BC$.' },
      ],
      answer: '$\\tfrac{AD}{DB} = \\tfrac{AE}{EC} = \\tfrac13$, so $DE \\parallel BC$.',
    },
    {
      id: 'geo3-ex14',
      source: 'Example 4.14',
      title: 'Thales twice',
      prompt:
        'In the figure, $DE \\parallel AC$ and $DC \\parallel AP$. Prove that $\\dfrac{BE}{EC} = \\dfrac{BC}{CP}$.',
      figure: {
        view: [-0.5, -0.6, 10.6, 4.6],
        maxWidth: 400,
        points: { B: [0, 0], E: [3.6, 0], C: [6, 0], P: [10, 0], A: [6.67, 4], D: [4, 2.4] },
        labelDir: { B: 'sw', E: 's', C: 's', P: 'se', A: 'n', D: 'nw' },
        segs: [
          { a: 'B', b: 'P' },
          { a: 'B', b: 'A' },
          { id: 'ap', a: 'A', b: 'P', color: 'adj' },
          { id: 'dc', a: 'D', b: 'C', color: 'adj' },
          { id: 'ac', a: 'A', b: 'C', color: 'opp' },
          { id: 'de', a: 'D', b: 'E', color: 'opp' },
        ],
      },
      steps: [
        {
          text: 'In $\\Delta BPA$, $DC \\parallel AP$. By the Basic Proportionality Theorem:',
          highlight: ['ap', 'dc'],
        },
        { math: '\\frac{BC}{CP} = \\frac{BD}{DA} \\quad (1)' },
        { text: 'In $\\Delta BCA$, $DE \\parallel AC$. Again by BPT:', highlight: ['ac', 'de'] },
        { math: '\\frac{BE}{EC} = \\frac{BD}{DA} \\quad (2)' },
        { text: '(1) and (2) have the same right side.' },
      ],
      answer: '$\\dfrac{BE}{EC} = \\dfrac{BC}{CP}$',
    },
    {
      id: 'geo3-ex15',
      source: 'Example 4.15',
      title: 'Angle bisector: finding a side',
      prompt:
        '$AD$ is the bisector of $\\angle A$ in $\\Delta ABC$. If $BD = 4$ cm, $DC = 3$ cm and $AB = 6$ cm, find $AC$.',
      steps: [
        { text: 'By the Angle Bisector Theorem, $\\dfrac{BD}{DC} = \\dfrac{AB}{AC}$.' },
        { math: '\\frac43 = \\frac{6}{AC} \\;\\Rightarrow\\; 4\\,AC = 18 \\;\\Rightarrow\\; AC = 4.5' },
      ],
      answer: '$AC = 4.5$ cm',
    },
    {
      id: 'geo3-ex16',
      source: 'Example 4.16',
      title: 'Angle bisector: splitting the base',
      prompt:
        '$AD$ is the bisector of $\\angle BAC$. If $AB = 10$ cm, $AC = 14$ cm and $BC = 6$ cm, find $BD$ and $DC$.',
      steps: [
        { text: 'Let $BD = x$, so $DC = 6 - x$.' },
        {
          math: '\\frac{AB}{AC} = \\frac{BD}{DC} \\;\\Rightarrow\\; \\frac{10}{14} = \\frac{x}{6 - x} \\;\\Rightarrow\\; \\frac57 = \\frac{x}{6 - x}',
        },
        { math: '5(6 - x) = 7x \\;\\Rightarrow\\; 30 = 12x \\;\\Rightarrow\\; x = 2.5' },
      ],
      answer: '$BD = 2.5$ cm, $DC = 3.5$ cm',
    },
  ],

  practice: [
    {
      id: 'geo3-p-thm1',
      source: 'Theorem 1',
      type: 'proof',
      prompt: 'Prove the Basic Proportionality Theorem.',
      figure: bptFig,
      given: 'In $\\Delta ABC$, $D$ is on $AB$, $E$ is on $AC$, and $DE \\parallel BC$.',
      toProve: '$\\dfrac{AD}{DB} = \\dfrac{AE}{EC}$',
      steps: [
        {
          statement: '$\\angle ABC = \\angle ADE$',
          reason: CORR,
          choices: [CORR, 'Vertically opposite angles', 'Angles in the same segment'],
        },
        { statement: '$\\angle ACB = \\angle AED$', reason: CORR },
        {
          statement: '$\\angle DAE = \\angle BAC$',
          reason: 'Common angle',
          choices: ['Common angle', 'Alternate angles', 'Given'],
        },
        { statement: '$\\Delta ABC \\sim \\Delta ADE$', reason: AA, choices: [AA, 'SAS similarity', 'SSS similarity'] },
        {
          statement: '$\\dfrac{AB}{AD} = \\dfrac{AC}{AE}$',
          reason: 'Corresponding sides of similar triangles are proportional',
        },
        {
          statement: '$1 + \\dfrac{DB}{AD} = 1 + \\dfrac{EC}{AE}$',
          reason: 'Write $AB = AD + DB$ and $AC = AE + EC$, then split each fraction',
        },
        {
          statement: '$\\dfrac{DB}{AD} = \\dfrac{EC}{AE}$, so $\\dfrac{AD}{DB} = \\dfrac{AE}{EC}$',
          reason: 'Cancel 1 on both sides and take reciprocals',
          choices: ['Cancel 1 on both sides and take reciprocals', 'Cross-multiplying', 'Pythagoras theorem'],
        },
      ],
      solution: [],
    },
    {
      id: 'geo3-p-thm3',
      source: 'Theorem 3',
      type: 'proof',
      prompt: 'Prove the Angle Bisector Theorem.',
      figure: {
        view: [-0.6, -0.8, 7.6, 4.6],
        maxWidth: 380,
        points: { A: [0, 0], B: [6, 0], C: [2.4, 3.6], D: [3.91, 2.09], E: [6.73, 3.6] },
        labelDir: { A: 'sw', B: 'se', C: 'nw', D: 'ne', E: 'ne' },
        segs: [
          { a: 'A', b: 'B', parallel: true },
          { a: 'A', b: 'C' },
          { a: 'B', b: 'C' },
          { a: 'A', b: 'D', color: 'accent' },
          { a: 'D', b: 'E', kind: 'dash' },
          { a: 'C', b: 'E', kind: 'dash', parallel: true },
        ],
        angles: [
          { at: 'A', from: 'B', to: 'D', label: '1', r: 26 },
          { at: 'A', from: 'D', to: 'C', label: '1', r: 34 },
          { at: 'E', from: 'C', to: 'A', label: '1', r: 22 },
        ],
      },
      given: 'In $\\Delta ABC$, $AD$ is the internal bisector of $\\angle A$.',
      toProve: '$\\dfrac{AB}{AC} = \\dfrac{BD}{CD}$',
      construction: 'Draw a line through $C$ parallel to $AB$, and extend $AD$ to meet it at $E$.',
      steps: [
        {
          statement: '$\\angle AEC = \\angle BAE = \\angle 1$ and $\\angle ABD = \\angle ECD$',
          reason: ALT,
          choices: [ALT, CORR, 'Angles in the same segment'],
        },
        {
          statement: '$\\angle CAE = \\angle CEA$, so $\\Delta ACE$ is isosceles and $AC = CE$ … (1)',
          reason: '$AD$ bisects $\\angle A$, so $\\angle CAE = \\angle 1 = \\angle CEA$',
          choices: [
            '$AD$ bisects $\\angle A$, so $\\angle CAE = \\angle 1 = \\angle CEA$',
            'Tangents from a point are equal',
            'Opposite sides of a parallelogram',
          ],
        },
        { statement: '$\\Delta ABD \\sim \\Delta ECD$', reason: AA, choices: [AA, 'SSS similarity', 'Congruence'] },
        {
          statement: '$\\dfrac{AB}{CE} = \\dfrac{BD}{CD}$',
          reason: 'Corresponding sides of similar triangles are proportional',
        },
        {
          statement: '$\\dfrac{AB}{AC} = \\dfrac{BD}{CD}$',
          reason: 'Replace $CE$ by $AC$, from (1)',
          choices: ['Replace $CE$ by $AC$, from (1)', BPT, 'Cross-multiplying'],
        },
      ],
      solution: [],
    },
    {
      id: 'geo3-p1a',
      source: 'Exercise 4.2 · Q1 (i)',
      type: 'numeric',
      prompt:
        'In $\\Delta ABC$, $D$ and $E$ are on $AB$ and $AC$ with $DE \\parallel BC$. If $\\dfrac{AD}{DB} = \\dfrac34$ and $AC = 15$ cm, find $AE$.',
      parts: [{ label: '$AE =$', answer: { value: 45 / 7, unit: 'cm', display: '6.43 cm (45/7)' } }],
      hints: ['$\\tfrac{AE}{EC} = \\tfrac34$, so $AE$ is $\\tfrac{3}{3+4}$ of $AC$.'],
      solution: [{ math: 'AE = 15 \\times \\frac{3}{7} = \\frac{45}{7} \\approx 6.43' }],
    },
    {
      id: 'geo3-p1b',
      source: 'Exercise 4.2 · Q1 (ii)',
      type: 'numeric',
      prompt:
        'In $\\Delta ABC$, $DE \\parallel BC$, with $AD = 8x - 7$, $DB = 5x - 3$, $AE = 4x - 3$ and $EC = 3x - 1$. Find $x$.',
      parts: [{ label: '$x =$', answer: { value: 1, display: '1' } }],
      hints: [
        'Cross-multiply $\\tfrac{8x - 7}{5x - 3} = \\tfrac{4x - 3}{3x - 1}$. You get a quadratic: reject the root that makes a length negative.',
      ],
      solution: [
        { math: '(8x - 7)(3x - 1) = (4x - 3)(5x - 3)' },
        {
          math: '24x^2 - 29x + 7 = 20x^2 - 27x + 9 \\;\\Rightarrow\\; 2x^2 - x - 1 = 0 \\;\\Rightarrow\\; (2x + 1)(x - 1) = 0',
        },
        { text: '$x = -\\tfrac12$ makes $AD = -11$, which is impossible. So $x = 1$.' },
      ],
    },
    {
      id: 'geo3-p2',
      source: 'Exercise 4.2 · Q2',
      type: 'numeric',
      prompt:
        '$ABCD$ is a trapezium with $AB \\parallel DC$. $P$ and $Q$ are on $AD$ and $BC$ with $PQ \\parallel DC$. If $PD = 18$ cm, $BQ = 35$ cm and $QC = 15$ cm, find $AD$.',
      parts: [{ label: '$AD =$', answer: { value: 60, unit: 'cm', display: '60 cm' } }],
      hints: [
        'Lines parallel to the parallel sides cut the other two sides in the same ratio: $\\tfrac{AP}{PD} = \\tfrac{BQ}{QC}$.',
      ],
      solution: [
        { text: 'Join $AC$ and use Thales in $\\Delta ADC$ and $\\Delta CAB$: $\\tfrac{AP}{PD} = \\tfrac{BQ}{QC}$.' },
        { math: '\\frac{AP}{18} = \\frac{35}{15} \\;\\Rightarrow\\; AP = 42 \\;\\Rightarrow\\; AD = 42 + 18 = 60' },
      ],
    },
    {
      id: 'geo3-p3',
      source: 'Exercise 4.2 · Q3',
      type: 'mcq',
      prompt:
        'In $\\Delta ABC$, $AB = 12$ cm, $AD = 8$ cm, $AE = 12$ cm and $AC = 18$ cm ($D$ on $AB$, $E$ on $AC$). Why is $DE \\parallel BC$?',
      options: [
        '$\\tfrac{AD}{AB} = \\tfrac{AE}{AC} = \\tfrac23$, so by the converse of BPT',
        '$AE = AB$',
        '$\\tfrac{AD}{AE} = \\tfrac{AB}{AC}$ always holds',
        'It is not parallel',
      ],
      correct: 0,
      solution: [
        {
          text: '$\\tfrac{8}{12} = \\tfrac23$ and $\\tfrac{12}{18} = \\tfrac23$. Then $\\tfrac{AD}{DB} = \\tfrac{8}{4} = 2 = \\tfrac{12}{6} = \\tfrac{AE}{EC}$, and the converse of BPT gives $DE \\parallel BC$.',
        },
      ],
    },
    {
      id: 'geo3-p4',
      source: 'Exercise 4.2 · Q4',
      type: 'proof',
      prompt:
        'In quadrilateral $ABCD$ with diagonal $AC$, $P$ is on $AC$, $Q$ on $AB$ and $R$ on $AD$, with $PQ \\parallel BC$ and $PR \\parallel CD$. Prove that (i) $\\dfrac{AR}{AD} = \\dfrac{AQ}{AB}$ (ii) $\\dfrac{QB}{AQ} = \\dfrac{DR}{AR}$.',
      figure: {
        view: [-0.6, -3.3, 9.6, 3.3],
        maxWidth: 380,
        points: { A: [0, 0], B: [4.5, 2.8], C: [9, 0], D: [4.5, -2.8], P: [3.6, 0], Q: [1.8, 1.12], R: [1.8, -1.12] },
        labelDir: { A: 'w', B: 'n', C: 'e', D: 's', P: 'n', Q: 'nw', R: 'sw' },
        segs: [
          { a: 'A', b: 'B' },
          { a: 'B', b: 'C', parallel: true },
          { a: 'C', b: 'D', parallel: true },
          { a: 'D', b: 'A' },
          { a: 'A', b: 'C' },
          { a: 'P', b: 'Q', color: 'accent', parallel: true },
          { a: 'P', b: 'R', color: 'accent', parallel: true },
        ],
      },
      toProve: '(i) $\\dfrac{AR}{AD} = \\dfrac{AQ}{AB}$ (ii) $\\dfrac{QB}{AQ} = \\dfrac{DR}{AR}$',
      steps: [
        {
          statement: 'In $\\Delta ABC$, $PQ \\parallel BC$, so $\\dfrac{AQ}{AB} = \\dfrac{AP}{AC}$ … (1)',
          reason: 'Corollary of the Basic Proportionality Theorem',
          choices: ['Corollary of the Basic Proportionality Theorem', ABT, 'Pythagoras theorem'],
        },
        {
          statement: 'In $\\Delta ACD$, $PR \\parallel CD$, so $\\dfrac{AR}{AD} = \\dfrac{AP}{AC}$ … (2)',
          reason: 'Corollary of the Basic Proportionality Theorem',
        },
        {
          statement: '$\\dfrac{AR}{AD} = \\dfrac{AQ}{AB}$, which is (i)',
          reason: 'From (1) and (2)',
          choices: ['From (1) and (2)', 'AA similarity', 'Converse of BPT'],
        },
        {
          statement: '$\\dfrac{AB}{AQ} = \\dfrac{AD}{AR}$, so $\\dfrac{AB}{AQ} - 1 = \\dfrac{AD}{AR} - 1$',
          reason: 'Take reciprocals of (i), then subtract 1 from both sides',
          choices: [
            'Take reciprocals of (i), then subtract 1 from both sides',
            'Add (1) and (2)',
            'Cross-multiply (i)',
          ],
        },
        {
          statement: '$\\dfrac{QB}{AQ} = \\dfrac{DR}{AR}$, which is (ii)',
          reason: '$AB - AQ = QB$ and $AD - AR = DR$',
        },
      ],
      solution: [],
    },
    {
      id: 'geo3-p5',
      source: 'Exercise 4.2 · Q5',
      type: 'numeric',
      prompt:
        'Rhombus $PQRB$ is inscribed in $\\Delta ABC$ with $\\angle B$ as one of its angles; $P$, $Q$, $R$ lie on $AB$, $AC$, $BC$. If $AB = 12$ cm and $BC = 6$ cm, find the sides $PQ$ and $RB$ of the rhombus.',
      parts: [
        { label: '$PQ =$', answer: { value: 4, unit: 'cm', display: '4 cm' } },
        { label: '$RB =$', answer: { value: 4, unit: 'cm', display: '4 cm' } },
      ],
      hints: [
        'Let each side be $s$. $PQ \\parallel BC$, so $\\Delta APQ \\sim \\Delta ABC$: $\\tfrac{AP}{AB} = \\tfrac{PQ}{BC}$, with $AP = 12 - s$.',
      ],
      solution: [
        { math: '\\frac{12 - s}{12} = \\frac{s}{6} \\;\\Rightarrow\\; 72 - 6s = 12s \\;\\Rightarrow\\; s = 4' },
        { text: 'All sides of a rhombus are equal, so $PQ = RB = 4$ cm.' },
      ],
    },
    {
      id: 'geo3-p6',
      source: 'Exercise 4.2 · Q6',
      type: 'proof',
      prompt:
        'In trapezium $ABCD$, $AB \\parallel DC$. $E$ and $F$ are on the non-parallel sides $AD$ and $BC$, with $EF \\parallel AB$. Show that $\\dfrac{AE}{ED} = \\dfrac{BF}{FC}$.',
      toProve: '$\\dfrac{AE}{ED} = \\dfrac{BF}{FC}$',
      construction: 'Join $AC$, meeting $EF$ at $G$.',
      steps: [
        {
          statement: '$EF \\parallel AB$ and $AB \\parallel DC$, so $EG \\parallel DC$ and $GF \\parallel AB$',
          reason: 'Lines parallel to the same line are parallel',
          choices: ['Lines parallel to the same line are parallel', 'Given', 'Alternate angles'],
        },
        {
          statement: 'In $\\Delta ADC$: $\\dfrac{AE}{ED} = \\dfrac{AG}{GC}$ … (1)',
          reason: BPT,
          choices: [BPT, ABT, CONV],
        },
        {
          statement:
            'In $\\Delta CAB$: $\\dfrac{CG}{GA} = \\dfrac{CF}{FB}$, so $\\dfrac{AG}{GC} = \\dfrac{BF}{FC}$ … (2)',
          reason: 'Basic Proportionality Theorem, then reciprocals',
        },
        {
          statement: '$\\dfrac{AE}{ED} = \\dfrac{BF}{FC}$',
          reason: 'From (1) and (2)',
          choices: ['From (1) and (2)', AA, 'Converse of BPT'],
        },
      ],
      solution: [],
    },
    {
      id: 'geo3-p7',
      source: 'Exercise 4.2 · Q7',
      type: 'proof',
      prompt: 'In the figure, $DE \\parallel BC$ and $CD \\parallel EF$. Prove that $AD^2 = AB \\times AF$.',
      figure: {
        view: [-0.6, -0.6, 7.6, 5.6],
        maxWidth: 300,
        points: { A: [4.2, 5], B: [0, 0], C: [7, 0], D: [2.1, 2.5], E: [5.6, 2.5], F: [3.15, 3.75] },
        labelDir: { A: 'n', B: 'sw', C: 'se', D: 'w', E: 'e', F: 'nw' },
        segs: [
          { a: 'A', b: 'B' },
          { a: 'B', b: 'C', parallel: true },
          { a: 'C', b: 'A' },
          { a: 'D', b: 'E', color: 'accent', parallel: true },
          { a: 'D', b: 'C', color: 'adj' },
          { a: 'F', b: 'E', color: 'adj' },
        ],
      },
      toProve: '$AD^2 = AB \\times AF$',
      steps: [
        {
          statement: 'In $\\Delta ABC$, $DE \\parallel BC$: $\\dfrac{AD}{AB} = \\dfrac{AE}{AC}$ … (1)',
          reason: 'Corollary of the Basic Proportionality Theorem',
          choices: ['Corollary of the Basic Proportionality Theorem', ABT, 'Pythagoras theorem'],
        },
        {
          statement: 'In $\\Delta ADC$, $FE \\parallel DC$: $\\dfrac{AF}{AD} = \\dfrac{AE}{AC}$ … (2)',
          reason: 'Corollary of the Basic Proportionality Theorem',
        },
        {
          statement: '$\\dfrac{AD}{AB} = \\dfrac{AF}{AD}$',
          reason: 'From (1) and (2)',
          choices: ['From (1) and (2)', 'AA similarity', CONV],
        },
        { statement: '$AD^2 = AB \\times AF$', reason: 'Cross-multiplying' },
      ],
      solution: [],
    },
    {
      id: 'geo3-p8a',
      source: 'Exercise 4.2 · Q8 (i)',
      type: 'mcq',
      prompt:
        'In $\\Delta ABC$, $AB = 5$ cm, $AC = 10$ cm, $BD = 1.5$ cm and $CD = 3.5$ cm. Is $AD$ the bisector of $\\angle A$?',
      options: [
        'No: $\\tfrac{AB}{AC} = \\tfrac12$ but $\\tfrac{BD}{CD} = \\tfrac37$',
        'Yes: the ratios are equal',
        'Yes: $D$ is between $B$ and $C$',
        'Cannot be decided',
      ],
      correct: 0,
      solution: [
        {
          text: 'By the converse of the Angle Bisector Theorem, $AD$ is a bisector only if $\\tfrac{AB}{AC} = \\tfrac{BD}{CD}$. Here $\\tfrac12 \\ne \\tfrac37$.',
        },
      ],
    },
    {
      id: 'geo3-p9',
      source: 'Exercise 4.2 · Q9',
      type: 'proof',
      prompt:
        '$\\angle QPR = 90^\\circ$ and $PS$ is its bisector, with $S$ on $QR$. If $ST \\perp PR$, prove that $ST \\times (PQ + PR) = PQ \\times PR$.',
      figure: {
        view: [-0.6, -0.7, 8.6, 5],
        maxWidth: 340,
        points: { P: [0, 0], Q: [0, 4], R: [8, 0], S: [2.67, 2.67], T: [2.67, 0] },
        labelDir: { P: 'sw', Q: 'nw', R: 'se', S: 'ne', T: 's' },
        segs: [
          { a: 'P', b: 'Q' },
          { a: 'P', b: 'R' },
          { a: 'Q', b: 'R' },
          { a: 'P', b: 'S', color: 'accent' },
          { a: 'S', b: 'T', color: 'adj' },
        ],
        right: [
          { at: 'P', a: 'R', b: 'Q' },
          { at: 'T', a: 'R', b: 'S' },
        ],
      },
      toProve: '$ST \\times (PQ + PR) = PQ \\times PR$',
      steps: [
        { statement: '$\\dfrac{QS}{SR} = \\dfrac{PQ}{PR}$', reason: ABT, choices: [ABT, BPT, 'Pythagoras theorem'] },
        {
          statement:
            '$\\dfrac{QS + SR}{SR} = \\dfrac{PQ + PR}{PR}$, that is $\\dfrac{QR}{SR} = \\dfrac{PQ + PR}{PR}$ … (1)',
          reason: 'Adding 1 to both sides',
        },
        {
          statement: '$ST \\parallel PQ$',
          reason: 'Both are perpendicular to $PR$',
          choices: ['Both are perpendicular to $PR$', 'Converse of BPT', 'Given'],
        },
        {
          statement: '$\\Delta RST \\sim \\Delta RQP$, so $\\dfrac{ST}{PQ} = \\dfrac{SR}{QR}$ … (2)',
          reason: 'AA similarity ($\\angle R$ common, right angles at $T$ and $P$)',
        },
        {
          statement: '$\\dfrac{ST}{PQ} = \\dfrac{PR}{PQ + PR}$',
          reason: 'From (1) and (2)',
          choices: ['From (1) and (2)', ABT, 'Cross-multiplying (1)'],
        },
        { statement: '$ST \\times (PQ + PR) = PQ \\times PR$', reason: 'Cross-multiplying' },
      ],
      solution: [],
    },
    {
      id: 'geo3-p10',
      source: 'Exercise 4.2 · Q10',
      type: 'proof',
      prompt:
        '$ABCD$ is a quadrilateral with $AB = AD$. The bisectors of $\\angle BAC$ and $\\angle CAD$ meet $BC$ and $CD$ at $E$ and $F$. Prove that $EF \\parallel BD$.',
      toProve: '$EF \\parallel BD$',
      steps: [
        {
          statement: 'In $\\Delta ABC$: $\\dfrac{BE}{EC} = \\dfrac{AB}{AC}$ … (1)',
          reason: ABT,
          choices: [ABT, BPT, 'Ceva’s theorem'],
        },
        { statement: 'In $\\Delta ADC$: $\\dfrac{DF}{FC} = \\dfrac{AD}{AC}$ … (2)', reason: ABT },
        {
          statement: '$\\dfrac{BE}{EC} = \\dfrac{DF}{FC}$',
          reason: '$AB = AD$, so the right sides of (1) and (2) are equal',
          choices: ['$AB = AD$, so the right sides of (1) and (2) are equal', 'AA similarity', 'Given'],
        },
        {
          statement: '$EF \\parallel BD$',
          reason: 'Converse of BPT in $\\Delta CBD$',
          choices: ['Converse of BPT in $\\Delta CBD$', 'Basic Proportionality Theorem', 'Alternate angles'],
        },
      ],
      solution: [],
    },
    {
      id: 'geo3-p-pc',
      source: 'Progress Check · page 178',
      type: 'mcq',
      prompt:
        'In $\\Delta ABC$, the median $AD$ to $BC$ is also the bisector of $\\angle A$. Then $\\dfrac{AB}{AC}$ is',
      options: ['1', '2', '$\\tfrac12$', 'cannot be found'],
      correct: 0,
      solution: [
        {
          text: '$D$ is the midpoint, so $\\tfrac{BD}{DC} = 1$. By the Angle Bisector Theorem $\\tfrac{AB}{AC} = \\tfrac{BD}{DC} = 1$: the triangle is isosceles.',
        },
      ],
    },
  ],

  quiz: [
    {
      id: 'geo3-q1',
      type: 'numeric',
      prompt:
        'In $\\Delta PQR$, $ST \\parallel QR$ with $S$ on $PQ$ and $T$ on $PR$. $PS = 4$, $SQ = 6$, $PT = 5$. Find $TR$.',
      parts: [{ answer: { value: 7.5, display: '7.5' } }],
      solution: [{ math: '\\frac{4}{6} = \\frac{5}{TR} \\;\\Rightarrow\\; TR = 7.5' }],
    },
    {
      id: 'geo3-q2',
      type: 'mcq',
      prompt: 'If $\\dfrac{AD}{DB} = \\dfrac{AE}{EC}$ in $\\Delta ABC$, then',
      options: ['$DE \\parallel BC$', '$DE = BC$', '$AD = AE$', '$\\Delta ADE \\cong \\Delta ABC$'],
      correct: 0,
      solution: [{ text: 'This is the converse of the Basic Proportionality Theorem.' }],
    },
    {
      id: 'geo3-q3',
      type: 'numeric',
      prompt: 'In $\\Delta ABC$, $AD$ bisects $\\angle A$. $AB = 8$ cm, $AC = 12$ cm, $BD = 4$ cm. Find $DC$.',
      parts: [{ answer: { value: 6, unit: 'cm', display: '6 cm' } }],
      solution: [{ math: '\\frac{8}{12} = \\frac{4}{DC} \\;\\Rightarrow\\; DC = 6' }],
    },
    {
      id: 'geo3-q4',
      type: 'numeric',
      prompt: 'In $\\Delta ABC$, $DE \\parallel BC$, $AD = 2$ cm and $AB = 5$ cm. If $AC = 10$ cm, find $AE$.',
      parts: [{ answer: { value: 4, unit: 'cm', display: '4 cm' } }],
      solution: [
        {
          math: '\\frac{AD}{AB} = \\frac{AE}{AC} \\;\\Rightarrow\\; \\frac25 = \\frac{AE}{10} \\;\\Rightarrow\\; AE = 4',
        },
      ],
    },
    {
      id: 'geo3-q5',
      type: 'mcq',
      prompt: 'In an equilateral triangle $ABC$, $AD$ bisects $\\angle A$. Then $\\dfrac{BD}{DC}$ is',
      options: ['1', '2', '$\\tfrac12$', '$\\sqrt3$'],
      correct: 0,
      solution: [{ text: '$\\tfrac{BD}{DC} = \\tfrac{AB}{AC} = 1$ because the sides are equal.' }],
    },
    {
      id: 'geo3-q6',
      type: 'numeric',
      prompt:
        'In $\\Delta ABC$, the bisector of $\\angle A$ meets $BC$ at $D$. $AB = 9$, $AC = 6$ and $BC = 10$. Find $BD$.',
      parts: [{ answer: { value: 6, display: '6' } }],
      solution: [{ math: 'BD = 10 \\times \\frac{9}{9 + 6} = 6' }],
    },
    {
      id: 'geo3-q7',
      type: 'mcq',
      prompt: 'In the proof of the Angle Bisector Theorem, why is $\\Delta ACE$ isosceles?',
      options: [
        'Its base angles at $A$ and $E$ are both equal to half of $\\angle A$',
        'It has a right angle',
        'Two of its sides are radii',
        'It is similar to $\\Delta ABD$',
      ],
      correct: 0,
      solution: [
        {
          text: '$\\angle CAE$ is half of $\\angle A$, and $\\angle CEA$ equals the other half (alternate angles). Equal base angles mean equal sides: $AC = CE$.',
        },
      ],
    },
    {
      id: 'geo3-q8',
      type: 'numeric',
      prompt: 'In $\\Delta ABC$, $DE \\parallel BC$, $AD = x$, $DB = x + 1$, $AE = x + 3$, $EC = x + 5$. Find $x$.',
      parts: [{ answer: { value: 3, display: '3' } }],
      hints: ['$x(x + 5) = (x + 1)(x + 3)$'],
      solution: [{ math: 'x^2 + 5x = x^2 + 4x + 3 \\;\\Rightarrow\\; x = 3' }],
    },
  ],
}
