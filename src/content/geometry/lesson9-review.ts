import type { Lesson } from '../types'

const ABT = 'Angle Bisector Theorem'

export const lesson9: Lesson = {
  id: 'review',
  number: 9,
  title: 'Chapter review',
  summary: 'Points to Remember, worked Unit Exercise problems, and the 15 multiple-choice questions of Exercise 4.5.',
  pages: '198–202',
  status: 'ready',

  learn: [
    {
      id: 'similar',
      title: 'Similar triangles',
      blocks: [
        {
          t: 'list',
          items: [
            'Two triangles are similar if their corresponding angles are equal, or equivalently if their corresponding sides are proportional.',
            'Congruent triangles are similar, but similar triangles need not be congruent.',
            '**AA** (the same as AAA), **SAS** (an angle and the two sides around it in proportion) and **SSS** each prove similarity.',
            'In similar triangles, perimeters, altitudes and medians are in the same ratio as the sides; **areas** are in the ratio of the **squares** of the sides.',
          ],
        },
      ],
      check: {
        id: 'geo9-c-similar',
        type: 'numeric',
        prompt:
          'Two similar triangles have areas 25 cm² and 64 cm². A side of the smaller is 10 cm. Find the matching side of the larger.',
        parts: [{ answer: { value: 16, unit: 'cm', display: '16 cm' } }],
        solution: [{ math: '\\frac{10}{x} = \\sqrt{\\frac{25}{64}} = \\frac58 \\;\\Rightarrow\\; x = 16' }],
      },
    },
    {
      id: 'proportion',
      title: 'Thales and the angle bisector',
      blocks: [
        {
          t: 'list',
          items: [
            '**BPT:** a line parallel to one side divides the other two sides in the same ratio, $\\tfrac{AD}{DB} = \\tfrac{AE}{EC}$. **Converse:** equal ratios mean the line is parallel.',
            '**Angle Bisector Theorem:** the bisector of $\\angle A$ divides $BC$ so that $\\tfrac{BD}{DC} = \\tfrac{AB}{AC}$. **Converse:** a line from $A$ that divides $BC$ in that ratio bisects $\\angle A$.',
          ],
        },
      ],
      check: {
        id: 'geo9-c-prop',
        type: 'numeric',
        prompt: 'In $\\Delta ABC$, $DE \\parallel BC$, $AD = 6$, $DB = 4$ and $AC = 15$. Find $AE$.',
        parts: [{ answer: { value: 9, display: '9' } }],
        solution: [{ math: '\\frac{AE}{AC} = \\frac{AD}{AB} = \\frac{6}{10} \\;\\Rightarrow\\; AE = 9' }],
      },
    },
    {
      id: 'pythagoras',
      title: 'Pythagoras theorem',
      blocks: [
        {
          t: 'list',
          items: [
            'In a right triangle, (hypotenuse)² = (one leg)² + (other leg)².',
            '**Converse:** if the longest side squared equals the sum of the squares of the other two, the triangle is right-angled.',
            'Triplets such as $(3, 4, 5)$, $(5, 12, 13)$, $(8, 15, 17)$, $(7, 24, 25)$ and their multiples are worth knowing by heart.',
          ],
        },
      ],
      check: {
        id: 'geo9-c-pyth',
        type: 'numeric',
        prompt: 'Two poles 6 m and 11 m tall stand 12 m apart. How far apart are their tops?',
        parts: [{ answer: { value: 13, unit: 'm', display: '13 m' } }],
        solution: [{ math: '\\sqrt{12^2 + (11 - 6)^2} = \\sqrt{144 + 25} = 13' }],
      },
    },
    {
      id: 'tangents',
      title: 'Tangents',
      blocks: [
        {
          t: 'list',
          items: [
            'A tangent is perpendicular to the radius at the point of contact.',
            'From a point outside a circle there are exactly two tangents, and they are equal in length: $PA = PB = \\sqrt{OP^2 - r^2}$.',
            'Circles touching externally: centres $r_1 + r_2$ apart; internally: $r_1 - r_2$ apart. Two direct common tangents are equal.',
            '**Alternate segment theorem:** the angle between a tangent and a chord equals the angle in the alternate segment.',
          ],
        },
      ],
      check: {
        id: 'geo9-c-tan',
        type: 'numeric',
        prompt: 'Tangents $PA$ and $PB$ from $P$ make $\\angle APB = 70^\\circ$. Find $\\angle AOB$.',
        parts: [{ answer: { value: 110, unit: '°', display: '110°' } }],
        solution: [{ math: '\\angle AOB = 180^\\circ - 70^\\circ = 110^\\circ' }],
      },
    },
    {
      id: 'concurrency',
      title: 'Ceva and Menelaus',
      blocks: [
        {
          t: 'list',
          items: [
            '**Ceva:** cevians $AD$, $BE$, $CF$ are concurrent exactly when $\\tfrac{BD}{DC} \\cdot \\tfrac{CE}{EA} \\cdot \\tfrac{AF}{FB} = 1$.',
            '**Menelaus:** points $P$, $Q$, $R$ on $BC$, $CA$, $AB$ (extended) are collinear exactly when $\\tfrac{BP}{PC} \\cdot \\tfrac{CQ}{QA} \\cdot \\tfrac{AR}{RB} = -1$ with directed segments (1 with plain lengths).',
          ],
        },
      ],
      check: {
        id: 'geo9-c-ceva',
        type: 'mcq',
        prompt: 'Which theorem shows that the medians of a triangle meet at a point?',
        options: ['Ceva’s theorem', 'Menelaus’ theorem', 'Pythagoras theorem', 'The alternate segment theorem'],
        correct: 0,
        solution: [{ text: 'Each ratio is 1 for medians, so Ceva’s product is 1 and they are concurrent.' }],
      },
    },
    {
      id: 'constructions',
      title: 'Constructions',
      blocks: [
        {
          t: 'list',
          items: [
            '**Similar triangle, scale factor $\\tfrac{m}{n}$:** mark equal steps on a ray, join the $n$th point to $R$, draw the parallel through the $m$th point, then a second parallel.',
            '**Triangle from base, vertical angle and a third part:** draw the arc that holds the angle (tangent at the base end, perpendicular bisector, centre $O$), then use the median (arc from the midpoint), the altitude (parallel line) or the bisector point (line from the arc’s midpoint $I$).',
            '**Tangents:** perpendicular to the radius; or copy the alternate-segment angle; or, from outside, the circle on $OP$ as diameter.',
          ],
        },
      ],
      check: {
        id: 'geo9-c-cons',
        type: 'mcq',
        prompt: 'To draw tangents from an outside point $P$ to a circle with centre $O$, you draw a circle',
        options: [
          'with $OP$ as diameter',
          'with centre $P$ and radius $OP$',
          'with the same radius about $P$',
          'through $O$ with centre on the tangent',
        ],
        correct: 0,
        solution: [{ text: 'The circle on $OP$ as diameter meets the first circle where $\\angle OAP = 90^\\circ$.' }],
      },
    },
  ],

  explore: [
    {
      widget: 'construction-lab',
      title: 'Every construction in the chapter',
      intro:
        'All the constructions from Lessons 4.2, 4.4 and 4.7 in one place. Choose one, type your measurements, and step through it.',
      tryThis: [
        'Rebuild each worked example from memory, then check it here.',
        'Try measurements that make a construction impossible. What tells you?',
      ],
    },
    {
      widget: 'tangent-lab',
      title: 'Tangent lab',
      intro: 'A last look at tangents from a point and the alternate segment theorem, both in Exercise 4.5.',
      tryThis: ['Recreate Exercise 4.5 Q13: make the angle between the tangents 70°. What is $\\angle AOB$?'],
    },
  ],

  examples: [
    {
      id: 'geo9-ux1',
      source: 'Unit Exercise 4 · Q1',
      title: 'Two altitudes, two similar triangles',
      prompt:
        'In $\\Delta ABC$, $BD \\perp AC$ and $CE \\perp AB$. Prove that (i) $\\Delta AEC \\sim \\Delta ADB$ (ii) $\\dfrac{CA}{AB} = \\dfrac{CE}{DB}$.',
      figure: {
        view: [-0.6, -0.8, 8.6, 6.6],
        maxWidth: 320,
        points: { A: [0, 0], B: [8, 0], C: [5, 6], E: [5, 0], D: [3.28, 3.93] },
        labelDir: { A: 'sw', B: 'se', C: 'n', E: 's', D: 'nw' },
        segs: [
          { a: 'A', b: 'B' },
          { a: 'A', b: 'C' },
          { a: 'B', b: 'C' },
          { a: 'B', b: 'D', color: 'adj' },
          { a: 'C', b: 'E', color: 'opp' },
        ],
        right: [
          { at: 'D', a: 'A', b: 'B' },
          { at: 'E', a: 'A', b: 'C' },
        ],
      },
      steps: [
        {
          text: '(i) In $\\Delta AEC$ and $\\Delta ADB$: $\\angle AEC = \\angle ADB = 90^\\circ$ (given), and $\\angle A$ is common.',
        },
        {
          text: 'So $\\Delta AEC \\sim \\Delta ADB$ by AA similarity, with $A \\leftrightarrow A$, $E \\leftrightarrow D$, $C \\leftrightarrow B$.',
        },
        { math: '\\text{(ii)}\\quad \\frac{AE}{AD} = \\frac{EC}{DB} = \\frac{CA}{BA}' },
        { text: 'The last two give $\\dfrac{CA}{AB} = \\dfrac{CE}{DB}$.' },
      ],
      answer: 'Both results follow from $\\Delta AEC \\sim \\Delta ADB$ (AA).',
    },
    {
      id: 'geo9-ux4',
      source: 'Unit Exercise 4 · Q4',
      title: 'Four points on a circle',
      prompt:
        'In $\\Delta ABC$, $AB = AC$. Points $D$ and $E$ on $AB$ and $AC$ satisfy $AD = AE$. Show that $B$, $C$, $E$, $D$ lie on one circle.',
      steps: [
        { text: '$AB = AC$ and $AD = AE$, so $DB = EC$. Then $\\dfrac{AD}{DB} = \\dfrac{AE}{EC}$.' },
        { text: 'By the converse of BPT, $DE \\parallel BC$. So $\\angle ADE = \\angle ABC$ (corresponding angles).' },
        { text: '$\\angle ABC = \\angle ACB$ (base angles of the isosceles triangle).' },
        {
          math: '\\angle BDE = 180^\\circ - \\angle ADE = 180^\\circ - \\angle ACB \\;\\Rightarrow\\; \\angle BDE + \\angle ECB = 180^\\circ',
        },
        { text: 'A pair of opposite angles of quadrilateral $BCED$ adds to $180^\\circ$, so it is cyclic.' },
      ],
      answer: '$B$, $C$, $E$, $D$ are concyclic.',
    },
    {
      id: 'geo9-ux6',
      source: 'Unit Exercise 4 · Q6',
      title: 'The median and Apollonius',
      prompt:
        '$D$ is the midpoint of side $BC$ and $AE \\perp BC$. If $BC = a$, $AC = b$, $AB = c$, $ED = x$, $AD = p$ and $AE = h$, prove that (i) $b^2 = p^2 + ax + \\tfrac{a^2}{4}$ (ii) $c^2 = p^2 - ax + \\tfrac{a^2}{4}$ (iii) $b^2 + c^2 = 2p^2 + \\tfrac{a^2}{2}$.',
      steps: [
        {
          text: 'Take $E$ between $B$ and $D$ (as in the textbook’s figure), so $EC = ED + DC = x + \\tfrac a2$ and $BE = BD - ED = \\tfrac a2 - x$.',
        },
        { text: 'In right triangle $AED$: $h^2 = p^2 - x^2$.' },
        {
          math: '\\text{(i)}\\; b^2 = h^2 + EC^2 = p^2 - x^2 + \\left(x + \\tfrac a2\\right)^2 = p^2 + ax + \\tfrac{a^2}{4}',
        },
        {
          math: '\\text{(ii)}\\; c^2 = h^2 + BE^2 = p^2 - x^2 + \\left(\\tfrac a2 - x\\right)^2 = p^2 - ax + \\tfrac{a^2}{4}',
        },
        { text: '(iii) Add (i) and (ii): the $ax$ terms cancel.' },
        { math: 'b^2 + c^2 = 2p^2 + \\tfrac{a^2}{2}' },
      ],
      answer: 'All three results hold. Part (iii) is Apollonius’ theorem about medians.',
    },
    {
      id: 'geo9-ux9',
      source: 'Unit Exercise 4 · Q9',
      title: 'Two circles and a tangent',
      prompt:
        'Two circles meet at $A$ and $B$. From a point $P$ on one circle, lines $PAC$ and $PBD$ meet the second circle at $C$ and $D$. Prove that $CD$ is parallel to the tangent at $P$.',
      steps: [
        { text: "Let $TPT'$ be the tangent at $P$ to the first circle, with $T$ on the same side of $PA$ as $B$." },
        { text: 'In the first circle, by the alternate segment theorem, $\\angle TPA = \\angle PBA$.' },
        {
          text: 'In the second circle, $ABDC$ is a cyclic quadrilateral. Its exterior angle at $B$ equals the interior opposite angle: $\\angle PBA = \\angle ACD$.',
        },
        {
          text: "So $\\angle TPA = \\angle ACD$, that is $\\angle TPC = \\angle PCD$. These are alternate angles for the lines $TT'$ and $CD$ cut by $PC$.",
        },
      ],
      answer: "$CD \\parallel TT'$, the tangent at $P$.",
    },
  ],

  practice: [
    {
      id: 'geo9-p2',
      source: 'Unit Exercise 4 · Q2',
      type: 'numeric',
      prompt:
        '$AB \\parallel CD \\parallel EF$ are vertical, with $A$, $C$, $E$ on a horizontal line. $AB = 6$ cm, $EF = 4$ cm and $CD = x$ cm. The lines $BE$ and $AF$ cross at $D$, with $BD = 5$ cm and $DE = y$ cm. Find $x$ and $y$.',
      figure: {
        view: [-0.6, -0.8, 6.6, 6.8],
        maxWidth: 300,
        points: { A: [0, 0], B: [0, 6], C: [3.47, 0], D: [3.47, 2.4], E: [5.78, 0], F: [5.78, 4] },
        labelDir: { A: 'sw', B: 'nw', C: 's', D: 'ne', E: 'se', F: 'ne' },
        segs: [
          { a: 'A', b: 'B', label: '6', labelSide: 1 },
          { a: 'E', b: 'F', label: '4', labelSide: -1 },
          { a: 'C', b: 'D', label: 'x', labelSide: 1, color: 'accent' },
          { a: 'A', b: 'E' },
          { a: 'B', b: 'D', label: '5', labelSide: 1 },
          { a: 'D', b: 'E', label: 'y', labelSide: 1 },
          { a: 'A', b: 'F' },
        ],
      },
      parts: [
        { label: '$x =$', answer: { value: 2.4, unit: 'cm', display: '12/5 cm' } },
        { label: '$y =$', answer: { value: 10 / 3, unit: 'cm', display: '10/3 cm' } },
      ],
      hints: [
        'Use Example 4.9: $x = \\tfrac{6 \\times 4}{6 + 4}$.',
        '$\\Delta DAB \\sim \\Delta DFE$, so $\\tfrac{BD}{DE} = \\tfrac{AB}{EF} = \\tfrac64$.',
      ],
      solution: [
        { math: 'x = \\frac{AB \\cdot EF}{AB + EF} = \\frac{24}{10} = \\frac{12}{5}' },
        { text: '$\\Delta ABD \\sim \\Delta FED$ ($AB \\parallel EF$, vertically opposite angles at $D$):' },
        {
          math: '\\frac{BD}{DE} = \\frac{AB}{FE} \\;\\Rightarrow\\; \\frac{5}{y} = \\frac64 \\;\\Rightarrow\\; y = \\frac{10}{3}',
        },
      ],
    },
    {
      id: 'geo9-p3',
      source: 'Unit Exercise 4 · Q3',
      type: 'proof',
      prompt:
        '$O$ is any point inside $\\Delta ABC$. The bisectors of $\\angle AOB$, $\\angle BOC$ and $\\angle COA$ meet $AB$, $BC$ and $CA$ at $D$, $E$ and $F$. Show that $AD \\times BE \\times CF = DB \\times EC \\times FA$.',
      toProve: '$AD \\times BE \\times CF = DB \\times EC \\times FA$',
      steps: [
        {
          statement: 'In $\\Delta AOB$: $\\dfrac{AD}{DB} = \\dfrac{OA}{OB}$',
          reason: ABT,
          choices: [ABT, 'Basic Proportionality Theorem', 'Ceva’s theorem'],
        },
        {
          statement:
            'In $\\Delta BOC$: $\\dfrac{BE}{EC} = \\dfrac{OB}{OC}$; in $\\Delta COA$: $\\dfrac{CF}{FA} = \\dfrac{OC}{OA}$',
          reason: ABT,
        },
        {
          statement:
            '$\\dfrac{AD}{DB} \\times \\dfrac{BE}{EC} \\times \\dfrac{CF}{FA} = \\dfrac{OA}{OB} \\times \\dfrac{OB}{OC} \\times \\dfrac{OC}{OA} = 1$',
          reason: 'Multiplying the three results; $OA$, $OB$, $OC$ cancel',
          choices: [
            'Multiplying the three results; $OA$, $OB$, $OC$ cancel',
            'Adding the three results',
            'Menelaus’ theorem',
          ],
        },
        { statement: '$AD \\times BE \\times CF = DB \\times EC \\times FA$', reason: 'Cross-multiplying' },
      ],
      solution: [],
    },
    {
      id: 'geo9-p5',
      source: 'Unit Exercise 4 · Q5',
      type: 'numeric',
      prompt:
        'Two trains leave a station at the same time. One travels due west at 20 km/h, the other due north at 30 km/h. How far apart are they after 2 hours?',
      parts: [{ answer: { value: 20 * Math.sqrt(13), unit: 'km', display: '20√13 km' } }],
      solution: [{ math: '\\sqrt{40^2 + 60^2} = \\sqrt{5200} = 20\\sqrt{13} \\approx 72.1' }],
    },
    {
      id: 'geo9-p7',
      source: 'Unit Exercise 4 · Q7',
      type: 'numeric',
      prompt:
        'A man whose eye level is 2 m above the ground wants to find the height of a tree. He places a mirror on the ground 20 m from the tree and stands 4 m from the mirror, where he sees the top of the tree reflected. How tall is the tree?',
      parts: [{ answer: { value: 10, unit: 'm', display: '10 m' } }],
      solution: [{ math: '\\frac{h}{20} = \\frac{2}{4} \\;\\Rightarrow\\; h = 10' }],
    },
    {
      id: 'geo9-p8',
      source: 'Unit Exercise 4 · Q8',
      type: 'mcq',
      prompt:
        'An emu 8 feet tall stands at the foot of a pillar 30 feet high, with a light on top, and walks away. Its shadow falls beyond it. How is the length of the shadow related to the emu’s distance from the pillar?',
      options: [
        'shadow $= \\tfrac{4}{11} \\times$ distance',
        'shadow $= \\tfrac{4}{15} \\times$ distance',
        'shadow $= \\tfrac{11}{4} \\times$ distance',
        'shadow $=$ distance',
      ],
      correct: 0,
      hints: ['With shadow $s$ and distance $d$: $\\tfrac{8}{s} = \\tfrac{30}{s + d}$.'],
      solution: [
        {
          math: '\\frac{8}{s} = \\frac{30}{s + d} \\;\\Rightarrow\\; 8s + 8d = 30s \\;\\Rightarrow\\; s = \\frac{8d}{22} = \\frac{4}{11}d',
        },
      ],
    },
    {
      id: 'geo9-p10',
      source: 'Unit Exercise 4 · Q10',
      type: 'numeric',
      prompt:
        '$D$, $E$, $F$ are points on $AB$, $BC$ and $AC$ of $\\Delta ABC$, and $CD$, $AE$, $BF$ are concurrent. $AD : DB = 5 : 3$, $BE : EC = 3 : 2$ and $AC = 21$. Find $CF$.',
      parts: [{ label: '$CF =$', answer: { value: 6, display: '6' } }],
      hints: ['Ceva, walking round: $\\tfrac{AD}{DB} \\times \\tfrac{BE}{EC} \\times \\tfrac{CF}{FA} = 1$.'],
      solution: [
        { math: '\\frac53 \\times \\frac32 \\times \\frac{CF}{FA} = 1 \\;\\Rightarrow\\; \\frac{CF}{FA} = \\frac25' },
        { math: 'CF = 21 \\times \\frac27 = 6' },
      ],
    },
  ],

  quiz: [
    {
      id: 'geo9-q1',
      source: 'Exercise 4.5 · Q1',
      type: 'mcq',
      keepOrder: true,
      prompt: 'In triangles $ABC$ and $EDF$, $\\dfrac{AB}{DE} = \\dfrac{BC}{FD}$. They will be similar when',
      options: [
        '$\\angle B = \\angle E$',
        '$\\angle A = \\angle D$',
        '$\\angle B = \\angle D$',
        '$\\angle A = \\angle F$',
      ],
      correct: 2,
      solution: [
        {
          text: 'The sides $AB, BC$ meet at $B$; their partners $DE, FD$ meet at $D$. SAS needs the included angles equal: $\\angle B = \\angle D$.',
        },
      ],
    },
    {
      id: 'geo9-q2',
      source: 'Exercise 4.5 · Q2',
      type: 'mcq',
      keepOrder: true,
      prompt:
        'In $\\Delta LMN$, $\\angle L = 60^\\circ$ and $\\angle M = 50^\\circ$. If $\\Delta LMN \\sim \\Delta PQR$, then $\\angle R$ is',
      options: ['$40^\\circ$', '$70^\\circ$', '$30^\\circ$', '$110^\\circ$'],
      correct: 1,
      solution: [{ text: '$\\angle R = \\angle N = 180^\\circ - 60^\\circ - 50^\\circ = 70^\\circ$.' }],
    },
    {
      id: 'geo9-q3',
      source: 'Exercise 4.5 · Q3',
      type: 'mcq',
      keepOrder: true,
      prompt: '$\\Delta ABC$ is isosceles with $\\angle C = 90^\\circ$ and $AC = 5$ cm. Then $AB$ is',
      options: ['2.5 cm', '5 cm', '10 cm', '$5\\sqrt2$ cm'],
      correct: 3,
      solution: [{ math: 'AB = \\sqrt{5^2 + 5^2} = 5\\sqrt2' }],
    },
    {
      id: 'geo9-q4',
      source: 'Exercise 4.5 · Q4',
      type: 'mcq',
      keepOrder: true,
      prompt:
        'In $\\Delta PQR$, $ST \\parallel QR$ with $S$ on $PQ$ and $T$ on $PR$, $PS = 2$ cm and $SQ = 3$ cm. The ratio of the area of $\\Delta PQR$ to the area of $\\Delta PST$ is',
      options: ['25 : 4', '25 : 7', '25 : 11', '25 : 13'],
      correct: 0,
      solution: [
        {
          text: '$\\Delta PQR \\sim \\Delta PST$ with $\\tfrac{PQ}{PS} = \\tfrac52$, so the areas are in the ratio $25 : 4$.',
        },
      ],
    },
    {
      id: 'geo9-q5',
      source: 'Exercise 4.5 · Q5',
      type: 'mcq',
      keepOrder: true,
      prompt: 'The perimeters of similar triangles $ABC$ and $PQR$ are 36 cm and 24 cm. If $PQ = 10$ cm, then $AB$ is',
      options: ['$6\\tfrac23$ cm', '$\\tfrac{10\\sqrt6}{3}$ cm', '$66\\tfrac23$ cm', '15 cm'],
      correct: 3,
      solution: [{ math: 'AB = 10 \\times \\frac{36}{24} = 15' }],
    },
    {
      id: 'geo9-q6',
      source: 'Exercise 4.5 · Q6',
      type: 'mcq',
      keepOrder: true,
      prompt: 'In $\\Delta ABC$, $DE \\parallel BC$, $AB = 3.6$ cm, $AC = 2.4$ cm and $AD = 2.1$ cm. Then $AE$ is',
      options: ['1.4 cm', '1.8 cm', '1.2 cm', '1.05 cm'],
      correct: 0,
      solution: [{ math: 'AE = \\frac{AD \\times AC}{AB} = \\frac{2.1 \\times 2.4}{3.6} = 1.4' }],
    },
    {
      id: 'geo9-q7',
      source: 'Exercise 4.5 · Q7',
      type: 'mcq',
      keepOrder: true,
      prompt: 'In $\\Delta ABC$, $AD$ bisects $\\angle BAC$. If $AB = 8$ cm, $BD = 6$ cm and $DC = 3$ cm, then $AC$ is',
      options: ['6 cm', '4 cm', '3 cm', '8 cm'],
      correct: 1,
      solution: [
        { math: '\\frac{AB}{AC} = \\frac{BD}{DC} \\;\\Rightarrow\\; \\frac{8}{AC} = 2 \\;\\Rightarrow\\; AC = 4' },
      ],
    },
    {
      id: 'geo9-q8',
      source: 'Exercise 4.5 · Q8',
      type: 'mcq',
      keepOrder: true,
      prompt: 'In $\\Delta ABC$, $\\angle BAC = 90^\\circ$ and $AD \\perp BC$. Then',
      options: ['$BD \\cdot CD = BC^2$', '$AB \\cdot AC = BC^2$', '$BD \\cdot CD = AD^2$', '$AB \\cdot AC = AD^2$'],
      correct: 2,
      solution: [
        { text: '$\\Delta ADB \\sim \\Delta CDA$, so $\\tfrac{BD}{AD} = \\tfrac{AD}{CD}$ and $AD^2 = BD \\cdot CD$.' },
      ],
    },
    {
      id: 'geo9-q9',
      source: 'Exercise 4.5 · Q9',
      type: 'mcq',
      keepOrder: true,
      prompt:
        'Two poles 6 m and 11 m high stand on level ground with their feet 12 m apart. The distance between their tops is',
      options: ['13 m', '14 m', '15 m', '12.8 m'],
      correct: 0,
      solution: [{ math: '\\sqrt{12^2 + 5^2} = 13' }],
    },
    {
      id: 'geo9-q10',
      source: 'Exercise 4.5 · Q10',
      type: 'mcq',
      keepOrder: true,
      prompt:
        'In the figure, $PR = 26$ cm, $QR = 24$ cm, $\\angle PAQ = 90^\\circ$, $PA = 6$ cm and $QA = 8$ cm. Find $\\angle PQR$.',
      options: ['$80^\\circ$', '$85^\\circ$', '$75^\\circ$', '$90^\\circ$'],
      correct: 3,
      solution: [
        { text: '$PQ = \\sqrt{6^2 + 8^2} = 10$.' },
        { text: '$10^2 + 24^2 = 676 = 26^2$, so by the converse of Pythagoras, $\\angle PQR = 90^\\circ$.' },
      ],
    },
    {
      id: 'geo9-q11',
      source: 'Exercise 4.5 · Q11',
      type: 'mcq',
      keepOrder: true,
      prompt: 'A tangent is perpendicular to the radius at the',
      options: ['centre', 'point of contact', 'infinity', 'chord'],
      correct: 1,
      solution: [{ text: 'At the point of contact.' }],
    },
    {
      id: 'geo9-q12',
      source: 'Exercise 4.5 · Q12',
      type: 'mcq',
      keepOrder: true,
      prompt: 'How many tangents can be drawn to a circle from an exterior point?',
      options: ['one', 'two', 'infinite', 'zero'],
      correct: 1,
      solution: [{ text: 'Exactly two.' }],
    },
    {
      id: 'geo9-q13',
      source: 'Exercise 4.5 · Q13',
      type: 'mcq',
      keepOrder: true,
      prompt:
        'The two tangents from an external point $P$ to a circle with centre $O$ are $PA$ and $PB$. If $\\angle APB = 70^\\circ$, then $\\angle AOB$ is',
      options: ['$100^\\circ$', '$110^\\circ$', '$120^\\circ$', '$130^\\circ$'],
      correct: 1,
      solution: [
        {
          text: 'In quadrilateral $OAPB$ the angles at $A$ and $B$ are $90^\\circ$, so $\\angle AOB = 360^\\circ - 180^\\circ - 70^\\circ = 110^\\circ$.',
        },
      ],
    },
    {
      id: 'geo9-q14',
      source: 'Exercise 4.5 · Q14',
      type: 'mcq',
      keepOrder: true,
      prompt:
        '$CP$ and $CQ$ are tangents to a circle with centre $O$. $ARB$ is another tangent, touching the circle at $R$, with $A$ on $CP$ and $B$ on $CQ$. If $CP = 11$ cm and $BC = 7$ cm, then $BR$ is',
      options: ['6 cm', '5 cm', '8 cm', '4 cm'],
      correct: 3,
      solution: [{ text: '$CQ = CP = 11$, so $BQ = 11 - 7 = 4$. Tangents from $B$ are equal: $BR = BQ = 4$ cm.' }],
    },
    {
      id: 'geo9-q15',
      source: 'Exercise 4.5 · Q15',
      type: 'mcq',
      keepOrder: true,
      prompt:
        '$PR$ is a tangent to a circle at $P$, $O$ is the centre, and the chord $PQ$ makes $\\angle RPQ = 60^\\circ$. Then $\\angle POQ$ is',
      options: ['$120^\\circ$', '$100^\\circ$', '$110^\\circ$', '$90^\\circ$'],
      correct: 0,
      solution: [
        {
          text: '$\\angle OPQ = 90^\\circ - 60^\\circ = 30^\\circ = \\angle OQP$, so $\\angle POQ = 180^\\circ - 60^\\circ = 120^\\circ$.',
        },
      ],
    },
  ],
}
