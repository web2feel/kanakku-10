import type { Lesson } from '../types'

export const lesson7: Lesson = {
  id: 'construct-tangents',
  number: 7,
  title: 'Constructing tangents',
  summary:
    'Draw a tangent at a point using the centre or the alternate segment, and a pair of tangents from an outside point.',
  pages: '193–195',
  status: 'ready',

  learn: [
    {
      id: 'using-centre',
      title: 'Tangent at a point, using the centre',
      blocks: [
        {
          t: 'p',
          text: 'A tangent is perpendicular to the radius at the point of contact. So to draw the tangent at $P$, join $OP$ and draw the line through $P$ perpendicular to $OP$.',
        },
        {
          t: 'list',
          ordered: true,
          items: [
            'Draw the circle with centre $O$.',
            'Take a point $P$ on it and join $OP$.',
            'Draw the perpendicular to $OP$ at $P$ (extend $OP$ and bisect the straight angle at $P$ with compass arcs).',
            "This line $TT'$ is the tangent.",
          ],
        },
      ],
      check: {
        id: 'geo7-c-centre',
        type: 'mcq',
        prompt: 'Why is the line through $P$ perpendicular to $OP$ a tangent?',
        options: [
          'A tangent is perpendicular to the radius at the point of contact',
          'It passes through the centre',
          'It is parallel to a diameter',
          'It bisects the radius',
        ],
        correct: 0,
        solution: [
          {
            text: 'That is the tangent–radius property, used the other way round: the line perpendicular to the radius at its end touches the circle there.',
          },
        ],
      },
    },
    {
      id: 'alt-segment',
      title: 'Tangent at a point, using the alternate segment',
      blocks: [
        {
          t: 'p',
          text: 'You do not even need the centre. Through $L$ draw any chord $LM$, pick a point $N$ on the circle, and copy the angle $\\angle MNL$ at $L$:',
        },
        {
          t: 'list',
          ordered: true,
          items: [
            'Draw the circle and take a point $L$ on it.',
            'Draw any chord $LM$.',
            'Take $N$ on the circle so that $L$, $M$, $N$ run anticlockwise. Join $LN$ and $NM$.',
            "At $L$, draw $TT'$ so that $\\angle TLM = \\angle MNL$. It is the tangent.",
          ],
        },
        {
          t: 'p',
          text: 'This is the alternate segment theorem in reverse: the line that makes the same angle with the chord as the angle in the alternate segment must be the tangent.',
        },
      ],
      check: {
        id: 'geo7-c-alt',
        type: 'mcq',
        prompt: 'In the alternate segment method, $\\angle TLM$ is made equal to',
        options: ['$\\angle MNL$', '$\\angle LMN$', '$90^\\circ$', '$\\angle LOM$'],
        correct: 0,
        solution: [
          { text: 'The tangent–chord angle at $L$ must equal the angle in the alternate segment, $\\angle MNL$.' },
        ],
      },
    },
    {
      id: 'pair',
      title: 'Two tangents from an outside point',
      blocks: [
        {
          t: 'list',
          ordered: true,
          items: [
            'Draw the circle with centre $O$, and mark $P$ outside it.',
            'Draw the perpendicular bisector of $OP$; it cuts $OP$ at its midpoint $M$.',
            'With centre $M$ and radius $MO$, draw a circle. It cuts the first circle at $A$ and $B$.',
            'Join $PA$ and $PB$: these are the tangents.',
          ],
        },
        {
          t: 'p',
          text: '**Why:** $A$ lies on the circle with diameter $OP$, so $\\angle OAP = 90^\\circ$ (angle in a semicircle). A line perpendicular to the radius $OA$ at $A$ is a tangent.',
        },
        {
          t: 'note',
          tone: 'tip',
          text: 'Check your drawing by calculation: $PA = PB = \\sqrt{OP^2 - r^2}$. Measure $PA$ with your ruler and compare.',
        },
      ],
      check: {
        id: 'geo7-c-pair',
        type: 'numeric',
        prompt:
          'You draw tangents from a point 8 cm from the centre of a circle of radius 3 cm. About how long should each tangent measure? (one decimal place)',
        parts: [{ answer: { value: Math.sqrt(55), unit: 'cm', display: '7.4 cm', tol: 0.06 } }],
        solution: [{ math: '\\sqrt{8^2 - 3^2} = \\sqrt{55} \\approx 7.4' }],
      },
    },
  ],

  explore: [
    {
      widget: 'construction-tangent',
      title: 'Construction player',
      intro:
        'Choose a method, set the radius (and the distance of the outside point), and step through the construction.',
      tryThis: [
        'In "Pair of tangents", put the point just outside the circle. What happens to the tangents?',
        'Set the distance equal to the radius. Why does the construction refuse?',
        'Compare the tangent length with $\\sqrt{OP^2 - r^2}$ for a few distances.',
      ],
    },
  ],

  examples: [
    {
      id: 'geo7-ex29',
      source: 'Example 4.29',
      title: 'Tangent using the centre',
      prompt: 'Draw a circle of radius 3 cm. Take a point $P$ on it and draw the tangent at $P$.',
      construction: { kind: 'tangent-centre', r: 3 },
      steps: [],
      answer: "$TT'$ is the tangent at $P$.",
    },
    {
      id: 'geo7-ex30',
      source: 'Example 4.30',
      title: 'Tangent using the alternate segment',
      prompt: 'Draw a circle of radius 4 cm. At a point $L$ on it, draw a tangent using the alternate segment theorem.',
      construction: { kind: 'tangent-alt', r: 4 },
      steps: [],
      answer: "$TT'$ is the tangent at $L$.",
    },
    {
      id: 'geo7-ex31',
      source: 'Example 4.31',
      title: 'A pair of tangents',
      prompt:
        'Draw a circle of diameter 6 cm. From a point $P$ 8 cm from its centre, draw the two tangents $PA$ and $PB$ and measure their lengths.',
      construction: { kind: 'tangent-pair', r: 3, d: 8 },
      steps: [],
      answer: '$PA = PB \\approx 7.4$ cm. Check: $\\sqrt{8^2 - 3^2} = \\sqrt{55} \\approx 7.4$.',
    },
  ],

  practice: [
    {
      id: 'geo7-p11',
      source: 'Exercise 4.4 · Q11',
      type: 'construct',
      prompt: 'Draw a tangent at any point $R$ on the circle of radius 3.4 cm and centre $P$.',
      construction: { kind: 'tangent-centre', r: 3.4, names: ['P', 'R'] },
      solution: [],
    },
    {
      id: 'geo7-p12',
      source: 'Exercise 4.4 · Q12',
      type: 'construct',
      prompt:
        'Draw a circle of radius 4.5 cm. Take a point on it and draw the tangent at that point using the alternate segment theorem.',
      construction: { kind: 'tangent-alt', r: 4.5 },
      solution: [],
    },
    {
      id: 'geo7-p13',
      source: 'Exercise 4.4 · Q13',
      type: 'construct',
      prompt:
        'Draw the two tangents from a point 10 cm from the centre of a circle of radius 5 cm. Measure the lengths of the tangents.',
      construction: { kind: 'tangent-pair', r: 5, d: 10 },
      measure: [
        { label: 'Length of each tangent:', answer: { value: 8.66, unit: 'cm', display: '8.7 cm', tol: 0.15 } },
      ],
      solution: [],
    },
    {
      id: 'geo7-p14',
      source: 'Exercise 4.4 · Q14',
      type: 'construct',
      prompt:
        'Take a point 11 cm from the centre of a circle of radius 4 cm and draw the two tangents to the circle from that point.',
      construction: { kind: 'tangent-pair', r: 4, d: 11 },
      measure: [
        { label: 'Length of each tangent:', answer: { value: 10.25, unit: 'cm', display: '10.3 cm', tol: 0.15 } },
      ],
      solution: [],
    },
    {
      id: 'geo7-p15',
      source: 'Exercise 4.4 · Q15',
      type: 'construct',
      prompt:
        'Draw the two tangents from a point 5 cm from the centre of a circle of diameter 6 cm. Measure the lengths of the tangents.',
      construction: { kind: 'tangent-pair', r: 3, d: 5 },
      measure: [{ label: 'Length of each tangent:', answer: { value: 4, unit: 'cm', display: '4 cm', tol: 0.15 } }],
      hints: ['Diameter 6 cm means radius 3 cm.'],
      solution: [],
    },
    {
      id: 'geo7-p16',
      source: 'Exercise 4.4 · Q16',
      type: 'construct',
      prompt: 'Draw a tangent to a circle of radius 3.6 cm and centre $O$ from a point $P$ 7.2 cm from the centre.',
      construction: { kind: 'tangent-pair', r: 3.6, d: 7.2 },
      measure: [
        {
          label: 'Length of the tangent:',
          answer: { value: 6.24, unit: 'cm', display: '6.3 cm in the book; 6.2 cm by calculation', tol: 0.15 },
        },
      ],
      solution: [],
    },
  ],

  quiz: [
    {
      id: 'geo7-q1',
      type: 'mcq',
      prompt: 'To draw tangents from an outside point $P$, you draw a circle on $OP$ as diameter. Why?',
      options: [
        'The angle in a semicircle is $90^\\circ$, so $OA \\perp PA$',
        'It has the same radius as the first circle',
        'It passes through the centre of the first circle',
        'It bisects the angle at $P$',
      ],
      correct: 0,
      solution: [
        { text: '$\\angle OAP$ is an angle in a semicircle, so it is $90^\\circ$, which makes $PA$ a tangent.' },
      ],
    },
    {
      id: 'geo7-q2',
      type: 'numeric',
      prompt: 'Tangents are drawn from a point 13 cm from the centre of a circle of radius 5 cm. How long is each?',
      parts: [{ answer: { value: 12, unit: 'cm', display: '12 cm' } }],
      solution: [{ math: '\\sqrt{169 - 25} = 12' }],
    },
    {
      id: 'geo7-q3',
      type: 'mcq',
      prompt: 'To draw the tangent at a point $P$ using the centre, the tangent is drawn',
      options: ['perpendicular to $OP$ at $P$', 'parallel to $OP$', 'through $O$', 'at $45^\\circ$ to $OP$'],
      correct: 0,
      solution: [{ text: 'The tangent at $P$ is perpendicular to the radius $OP$.' }],
    },
    {
      id: 'geo7-q4',
      type: 'mcq',
      prompt: 'How many tangents can you construct from a point that is exactly on the circle?',
      options: ['One', 'Two', 'None', 'Infinitely many'],
      correct: 0,
      solution: [{ text: 'Exactly one tangent passes through a point on the circle.' }],
    },
    {
      id: 'geo7-q5',
      type: 'numeric',
      prompt:
        'The perpendicular bisector of $OP$ cuts it at $M$. If $OP = 9$ cm, what radius do you use for the circle with centre $M$?',
      parts: [{ answer: { value: 4.5, unit: 'cm', display: '4.5 cm' } }],
      solution: [{ text: 'The radius is $MO = \\tfrac{OP}{2} = 4.5$ cm.' }],
    },
  ],
}
