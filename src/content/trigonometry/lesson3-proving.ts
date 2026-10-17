import type { Example, Lesson, Question } from '../types'

/* Common reasons for the statement / reason proofs */
const SQ = 'Square both sides'
const PY = '$\\sin^2\\theta + \\cos^2\\theta = 1$'

const examples: Example[] = [
  {
    id: 'ex-6-1',
    source: 'Example 6.1',
    title: 'Write tan in terms of sin and cos',
    prompt: 'Prove that $\\tan^2\\theta - \\sin^2\\theta = \\tan^2\\theta\\sin^2\\theta$.',
    steps: [
      {
        text: 'Start with the left side. Write $\\sin^2\\theta$ as $\\tan^2\\theta\\cos^2\\theta$, since $\\tan\\theta = \\dfrac{\\sin\\theta}{\\cos\\theta}$:',
        math: '\\tan^2\\theta - \\sin^2\\theta = \\tan^2\\theta - \\frac{\\sin^2\\theta}{\\cos^2\\theta}\\cdot\\cos^2\\theta = \\tan^2\\theta - \\tan^2\\theta\\cos^2\\theta',
      },
      { text: 'Take out the common factor $\\tan^2\\theta$:', math: '= \\tan^2\\theta(1 - \\cos^2\\theta)' },
      { text: 'Use $1 - \\cos^2\\theta = \\sin^2\\theta$:', math: '= \\tan^2\\theta\\sin^2\\theta' },
    ],
    answer: 'The left side has become the right side, so the identity is proved.',
  },
  {
    id: 'ex-6-2',
    source: 'Example 6.2',
    title: 'Multiply by the conjugate',
    prompt: 'Prove that $\\dfrac{\\sin A}{1 + \\cos A} = \\dfrac{1 - \\cos A}{\\sin A}$.',
    steps: [
      {
        text: 'Multiply the numerator and the denominator by $1 - \\cos A$, the **conjugate** of $1 + \\cos A$:',
        math: '\\frac{\\sin A}{1 + \\cos A} = \\frac{\\sin A}{1 + \\cos A} \\times \\frac{1 - \\cos A}{1 - \\cos A} = \\frac{\\sin A(1 - \\cos A)}{1 - \\cos^2 A}',
      },
      {
        text: 'The denominator is now $1 - \\cos^2 A = \\sin^2 A$:',
        math: '= \\frac{\\sin A(1 - \\cos A)}{\\sin^2 A}',
      },
      { text: 'Cancel one $\\sin A$:', math: '= \\frac{1 - \\cos A}{\\sin A}' },
    ],
    answer:
      'Proved. Multiplying by the conjugate turns $1 + \\cos A$ into a difference of squares that an identity can simplify.',
  },
  {
    id: 'ex-6-3',
    source: 'Example 6.3',
    title: 'Factorise a difference of squares',
    prompt: 'Prove that $1 + \\dfrac{\\cot^2\\theta}{1 + \\cosec\\theta} = \\cosec\\theta$.',
    steps: [
      {
        text: 'Replace $\\cot^2\\theta$ by $\\cosec^2\\theta - 1$:',
        math: '1 + \\frac{\\cot^2\\theta}{1 + \\cosec\\theta} = 1 + \\frac{\\cosec^2\\theta - 1}{\\cosec\\theta + 1}',
      },
      {
        text: 'Factorise the numerator as a difference of squares:',
        math: '= 1 + \\frac{(\\cosec\\theta + 1)(\\cosec\\theta - 1)}{\\cosec\\theta + 1}',
      },
      { text: 'Cancel $\\cosec\\theta + 1$:', math: '= 1 + (\\cosec\\theta - 1) = \\cosec\\theta' },
    ],
    answer: 'Proved.',
  },
  {
    id: 'ex-6-4',
    source: 'Example 6.4',
    title: 'Everything in sin and cos',
    prompt: 'Prove that $\\sec\\theta - \\cos\\theta = \\tan\\theta\\sin\\theta$.',
    steps: [
      {
        math: '\\sec\\theta - \\cos\\theta = \\frac{1}{\\cos\\theta} - \\cos\\theta = \\frac{1 - \\cos^2\\theta}{\\cos\\theta}',
      },
      {
        text: 'Use $1 - \\cos^2\\theta = \\sin^2\\theta$:',
        math: '= \\frac{\\sin^2\\theta}{\\cos\\theta} = \\frac{\\sin\\theta}{\\cos\\theta} \\times \\sin\\theta = \\tan\\theta\\sin\\theta',
      },
    ],
    answer: 'Proved.',
  },
  {
    id: 'ex-6-5',
    source: 'Example 6.5',
    title: 'Conjugate, then split the fraction',
    prompt: 'Prove that $\\sqrt{\\dfrac{1 + \\cos\\theta}{1 - \\cos\\theta}} = \\cosec\\theta + \\cot\\theta$.',
    steps: [
      {
        text: 'Inside the root, multiply the numerator and the denominator by $1 + \\cos\\theta$:',
        math: '\\sqrt{\\frac{1 + \\cos\\theta}{1 - \\cos\\theta} \\times \\frac{1 + \\cos\\theta}{1 + \\cos\\theta}} = \\sqrt{\\frac{(1 + \\cos\\theta)^2}{1 - \\cos^2\\theta}}',
      },
      {
        text: 'Now the denominator is $\\sin^2\\theta$, and both parts are perfect squares:',
        math: '= \\sqrt{\\frac{(1 + \\cos\\theta)^2}{\\sin^2\\theta}} = \\frac{1 + \\cos\\theta}{\\sin\\theta}',
      },
      {
        text: 'Split the fraction:',
        math: '= \\frac{1}{\\sin\\theta} + \\frac{\\cos\\theta}{\\sin\\theta} = \\cosec\\theta + \\cot\\theta',
      },
    ],
    answer:
      'Proved. For an acute angle, $1 + \\cos\\theta$ and $\\sin\\theta$ are positive, so the square root is the positive one.',
  },
  {
    id: 'ex-6-6',
    source: 'Example 6.6',
    title: 'A common denominator',
    prompt: 'Prove that $\\dfrac{\\sec\\theta}{\\sin\\theta} - \\dfrac{\\sin\\theta}{\\cos\\theta} = \\cot\\theta$.',
    steps: [
      {
        text: 'Write $\\sec\\theta = \\dfrac{1}{\\cos\\theta}$:',
        math: '\\frac{\\sec\\theta}{\\sin\\theta} - \\frac{\\sin\\theta}{\\cos\\theta} = \\frac{1}{\\sin\\theta\\cos\\theta} - \\frac{\\sin\\theta}{\\cos\\theta}',
      },
      {
        text: 'Use the common denominator $\\sin\\theta\\cos\\theta$:',
        math: '= \\frac{1 - \\sin^2\\theta}{\\sin\\theta\\cos\\theta} = \\frac{\\cos^2\\theta}{\\sin\\theta\\cos\\theta} = \\frac{\\cos\\theta}{\\sin\\theta} = \\cot\\theta',
      },
    ],
    answer: 'Proved.',
  },
  {
    id: 'ex-6-7',
    source: 'Example 6.7',
    title: 'Group the terms',
    prompt: 'Prove that $\\sin^2 A\\cos^2 B + \\cos^2 A\\sin^2 B + \\cos^2 A\\cos^2 B + \\sin^2 A\\sin^2 B = 1$.',
    steps: [
      {
        text: 'Put the two terms with $\\sin^2 A$ together, and the two with $\\cos^2 A$ together:',
        math: '= \\sin^2 A\\cos^2 B + \\sin^2 A\\sin^2 B + \\cos^2 A\\sin^2 B + \\cos^2 A\\cos^2 B',
      },
      { math: '= \\sin^2 A(\\cos^2 B + \\sin^2 B) + \\cos^2 A(\\sin^2 B + \\cos^2 B)' },
      { text: 'Each bracket is 1:', math: '= \\sin^2 A + \\cos^2 A = 1' },
    ],
    answer: 'Proved. The identity works for angle $B$ and then again for angle $A$.',
  },
  {
    id: 'ex-6-8',
    source: 'Example 6.8',
    title: 'Using a given condition',
    prompt:
      'If $\\cos\\theta + \\sin\\theta = \\sqrt2\\cos\\theta$, then prove that $\\cos\\theta - \\sin\\theta = \\sqrt2\\sin\\theta$.',
    steps: [
      {
        text: 'Square the given condition:',
        math: '(\\cos\\theta + \\sin\\theta)^2 = 2\\cos^2\\theta \\;\\Rightarrow\\; \\cos^2\\theta + \\sin^2\\theta + 2\\sin\\theta\\cos\\theta = 2\\cos^2\\theta',
      },
      { text: 'Rearrange:', math: '\\cos^2\\theta - \\sin^2\\theta = 2\\sin\\theta\\cos\\theta' },
      {
        text: 'Factorise the left side:',
        math: '(\\cos\\theta + \\sin\\theta)(\\cos\\theta - \\sin\\theta) = 2\\sin\\theta\\cos\\theta',
      },
      {
        text: 'Divide by $\\cos\\theta + \\sin\\theta$, which is $\\sqrt2\\cos\\theta$ by the condition:',
        math: '\\cos\\theta - \\sin\\theta = \\frac{2\\sin\\theta\\cos\\theta}{\\sqrt2\\cos\\theta} = \\sqrt2\\sin\\theta',
      },
    ],
    answer: 'Proved. Here squaring is fine: we are working from a given equation, not assuming the result.',
  },
  {
    id: 'ex-6-9',
    source: 'Example 6.9',
    title: 'Three brackets',
    prompt:
      'Prove that $(\\cosec\\theta - \\sin\\theta)(\\sec\\theta - \\cos\\theta)(\\tan\\theta + \\cot\\theta) = 1$.',
    steps: [
      {
        math: '= \\left(\\frac{1}{\\sin\\theta} - \\sin\\theta\\right)\\left(\\frac{1}{\\cos\\theta} - \\cos\\theta\\right)\\left(\\frac{\\sin\\theta}{\\cos\\theta} + \\frac{\\cos\\theta}{\\sin\\theta}\\right)',
      },
      {
        text: 'Simplify each bracket to a single fraction:',
        math: '= \\frac{1 - \\sin^2\\theta}{\\sin\\theta} \\times \\frac{1 - \\cos^2\\theta}{\\cos\\theta} \\times \\frac{\\sin^2\\theta + \\cos^2\\theta}{\\sin\\theta\\cos\\theta}',
      },
      {
        math: '= \\frac{\\cos^2\\theta}{\\sin\\theta} \\times \\frac{\\sin^2\\theta}{\\cos\\theta} \\times \\frac{1}{\\sin\\theta\\cos\\theta} = \\frac{\\cos^2\\theta\\sin^2\\theta}{\\sin^2\\theta\\cos^2\\theta} = 1',
      },
    ],
    answer: 'Proved.',
  },
  {
    id: 'ex-6-10',
    source: 'Example 6.10',
    title: 'Adding two fractions',
    prompt: 'Prove that $\\dfrac{\\sin A}{1 + \\cos A} + \\dfrac{\\sin A}{1 - \\cos A} = 2\\cosec A$.',
    steps: [
      { math: '= \\frac{\\sin A(1 - \\cos A) + \\sin A(1 + \\cos A)}{(1 + \\cos A)(1 - \\cos A)}' },
      {
        math: '= \\frac{\\sin A - \\sin A\\cos A + \\sin A + \\sin A\\cos A}{1 - \\cos^2 A} = \\frac{2\\sin A}{\\sin^2 A}',
      },
      { math: '= \\frac{2}{\\sin A} = 2\\cosec A' },
    ],
    answer: 'Proved.',
  },
  {
    id: 'ex-6-11',
    source: 'Example 6.11',
    title: 'The reciprocal partner',
    prompt: 'If $\\cosec\\theta + \\cot\\theta = P$, then prove that $\\cos\\theta = \\dfrac{P^2 - 1}{P^2 + 1}$.',
    steps: [
      {
        text: 'Since $\\cosec^2\\theta - \\cot^2\\theta = 1$, the partner of $\\cosec\\theta + \\cot\\theta$ is its reciprocal:',
        math: '\\cosec\\theta + \\cot\\theta = P \\;\\;(1), \\qquad \\cosec\\theta - \\cot\\theta = \\frac1P \\;\\;(2)',
      },
      { text: 'Add (1) and (2):', math: '2\\cosec\\theta = P + \\frac1P = \\frac{P^2 + 1}{P} \\;\\;(3)' },
      { text: 'Subtract (2) from (1):', math: '2\\cot\\theta = P - \\frac1P = \\frac{P^2 - 1}{P} \\;\\;(4)' },
      {
        text: 'Divide (4) by (3). Since $\\dfrac{\\cot\\theta}{\\cosec\\theta} = \\dfrac{\\cos\\theta / \\sin\\theta}{1 / \\sin\\theta} = \\cos\\theta$:',
        math: '\\cos\\theta = \\frac{P^2 - 1}{P} \\times \\frac{P}{P^2 + 1} = \\frac{P^2 - 1}{P^2 + 1}',
      },
    ],
    answer: 'Proved.',
  },
  {
    id: 'ex-6-12',
    source: 'Example 6.12',
    title: 'Two different angles',
    prompt: 'Prove that $\\tan^2 A - \\tan^2 B = \\dfrac{\\sin^2 A - \\sin^2 B}{\\cos^2 A\\cos^2 B}$.',
    steps: [
      {
        math: '\\tan^2 A - \\tan^2 B = \\frac{\\sin^2 A}{\\cos^2 A} - \\frac{\\sin^2 B}{\\cos^2 B} = \\frac{\\sin^2 A\\cos^2 B - \\sin^2 B\\cos^2 A}{\\cos^2 A\\cos^2 B}',
      },
      {
        text: 'Replace each $\\cos^2$ in the numerator by $1 - \\sin^2$:',
        math: '= \\frac{\\sin^2 A(1 - \\sin^2 B) - \\sin^2 B(1 - \\sin^2 A)}{\\cos^2 A\\cos^2 B}',
      },
      { text: 'The terms $\\sin^2 A\\sin^2 B$ cancel:', math: '= \\frac{\\sin^2 A - \\sin^2 B}{\\cos^2 A\\cos^2 B}' },
    ],
    answer: 'Proved.',
  },
  {
    id: 'ex-6-13',
    source: 'Example 6.13',
    title: 'Sum and difference of cubes',
    prompt:
      'Prove that $\\dfrac{\\cos^3 A - \\sin^3 A}{\\cos A - \\sin A} - \\dfrac{\\cos^3 A + \\sin^3 A}{\\cos A + \\sin A} = 2\\sin A\\cos A$.',
    steps: [
      {
        text: 'Use $a^3 - b^3 = (a - b)(a^2 + b^2 + ab)$ and $a^3 + b^3 = (a + b)(a^2 + b^2 - ab)$:',
        math: '= \\frac{(\\cos A - \\sin A)(\\cos^2 A + \\sin^2 A + \\cos A\\sin A)}{\\cos A - \\sin A} - \\frac{(\\cos A + \\sin A)(\\cos^2 A + \\sin^2 A - \\cos A\\sin A)}{\\cos A + \\sin A}',
      },
      {
        text: 'Cancel, and use $\\cos^2 A + \\sin^2 A = 1$:',
        math: '= (1 + \\cos A\\sin A) - (1 - \\cos A\\sin A) = 2\\cos A\\sin A',
      },
    ],
    answer: 'Proved.',
  },
  {
    id: 'ex-6-14',
    source: 'Example 6.14',
    title: 'A harder one: grouping in the denominator',
    prompt: 'Prove that $\\dfrac{\\sin A}{\\sec A + \\tan A - 1} + \\dfrac{\\cos A}{\\cosec A + \\cot A - 1} = 1$.',
    steps: [
      {
        text: 'Write the denominators in sin and cos:',
        math: '\\sec A + \\tan A - 1 = \\frac{1 + \\sin A - \\cos A}{\\cos A}, \\qquad \\cosec A + \\cot A - 1 = \\frac{1 + \\cos A - \\sin A}{\\sin A}',
      },
      {
        text: 'So the two fractions are',
        math: '\\frac{\\sin A\\cos A}{1 + \\sin A - \\cos A} + \\frac{\\sin A\\cos A}{1 + \\cos A - \\sin A}',
      },
      {
        text: 'Add them. With $x = \\sin A - \\cos A$, the denominators are $1 + x$ and $1 - x$:',
        math: '= \\sin A\\cos A \\cdot \\frac{(1 - x) + (1 + x)}{(1 + x)(1 - x)} = \\frac{2\\sin A\\cos A}{1 - (\\sin A - \\cos A)^2}',
      },
      {
        text: 'Expand $(\\sin A - \\cos A)^2 = 1 - 2\\sin A\\cos A$:',
        math: '= \\frac{2\\sin A\\cos A}{1 - 1 + 2\\sin A\\cos A} = 1',
      },
    ],
    answer:
      'Proved. The book reaches the same line by multiplying out first; grouping $\\sin A - \\cos A$ as one quantity saves work.',
  },
  {
    id: 'ex-6-15',
    source: 'Example 6.15',
    title: 'Simplify both sides to the same thing',
    prompt: 'Show that $\\dfrac{1 + \\tan^2 A}{1 + \\cot^2 A} = \\left(\\dfrac{1 - \\tan A}{1 - \\cot A}\\right)^2$.',
    steps: [
      {
        text: '**Left side.** Write $\\cot A = \\dfrac{1}{\\tan A}$:',
        math: '\\frac{1 + \\tan^2 A}{1 + \\frac{1}{\\tan^2 A}} = \\frac{1 + \\tan^2 A}{\\frac{\\tan^2 A + 1}{\\tan^2 A}} = \\tan^2 A \\;\\;(1)',
      },
      {
        text: '**Right side.** The same substitution:',
        math: '\\left(\\frac{1 - \\tan A}{1 - \\frac{1}{\\tan A}}\\right)^2 = \\left(\\frac{1 - \\tan A}{\\frac{\\tan A - 1}{\\tan A}}\\right)^2 = (-\\tan A)^2 = \\tan^2 A \\;\\;(2)',
      },
      { text: 'From (1) and (2), both sides equal $\\tan^2 A$.' },
    ],
    answer: 'Proved. When neither side is obviously simpler, reduce both to the same expression.',
  },
  {
    id: 'ex-6-16',
    source: 'Example 6.16',
    title: 'Cubes of sec and cosec',
    prompt:
      'Prove that $\\dfrac{(1 + \\cot A + \\tan A)(\\sin A - \\cos A)}{\\sec^3 A - \\cosec^3 A} = \\sin^2 A\\cos^2 A$.',
    steps: [
      {
        text: '**Numerator.** Put the first bracket over $\\sin A\\cos A$:',
        math: '1 + \\frac{\\cos A}{\\sin A} + \\frac{\\sin A}{\\cos A} = \\frac{\\sin A\\cos A + \\cos^2 A + \\sin^2 A}{\\sin A\\cos A} = \\frac{1 + \\sin A\\cos A}{\\sin A\\cos A}',
      },
      {
        text: 'Also $\\sin A - \\cos A = \\sin A\\cos A\\left(\\dfrac{1}{\\cos A} - \\dfrac{1}{\\sin A}\\right) = \\sin A\\cos A(\\sec A - \\cosec A)$. So the numerator is',
        math: '(1 + \\sin A\\cos A)(\\sec A - \\cosec A)',
      },
      {
        text: '**Denominator.** Use $a^3 - b^3 = (a - b)(a^2 + ab + b^2)$:',
        math: '\\sec^3 A - \\cosec^3 A = (\\sec A - \\cosec A)\\left(\\frac{1}{\\cos^2 A} + \\frac{1}{\\sin A\\cos A} + \\frac{1}{\\sin^2 A}\\right) = (\\sec A - \\cosec A)\\frac{1 + \\sin A\\cos A}{\\sin^2 A\\cos^2 A}',
      },
      {
        text: 'Divide:',
        math: '\\frac{(1 + \\sin A\\cos A)(\\sec A - \\cosec A)}{(\\sec A - \\cosec A)(1 + \\sin A\\cos A)} \\times \\sin^2 A\\cos^2 A = \\sin^2 A\\cos^2 A',
      },
    ],
    answer: 'Proved.',
  },
  {
    id: 'ex-6-17',
    source: 'Example 6.17',
    title: 'A condition and the cube of a sum',
    prompt:
      'If $\\dfrac{\\cos^2\\theta}{\\sin\\theta} = p$ and $\\dfrac{\\sin^2\\theta}{\\cos\\theta} = q$, then prove that $p^2q^2(p^2 + q^2 + 3) = 1$.',
    steps: [
      {
        text: 'First, $pq = \\dfrac{\\cos^2\\theta}{\\sin\\theta}\\cdot\\dfrac{\\sin^2\\theta}{\\cos\\theta} = \\sin\\theta\\cos\\theta$, so $p^2q^2 = \\sin^2\\theta\\cos^2\\theta$.',
      },
      {
        text: 'Next, put $p^2 + q^2 + 3$ over the common denominator $\\sin^2\\theta\\cos^2\\theta$:',
        math: 'p^2 + q^2 + 3 = \\frac{\\cos^4\\theta}{\\sin^2\\theta} + \\frac{\\sin^4\\theta}{\\cos^2\\theta} + 3 = \\frac{\\cos^6\\theta + \\sin^6\\theta + 3\\sin^2\\theta\\cos^2\\theta}{\\sin^2\\theta\\cos^2\\theta}',
      },
      {
        text: 'Multiply:',
        math: 'p^2q^2(p^2 + q^2 + 3) = \\cos^6\\theta + \\sin^6\\theta + 3\\sin^2\\theta\\cos^2\\theta',
      },
      {
        text: 'Use $a^3 + b^3 = (a + b)^3 - 3ab(a + b)$ with $a = \\cos^2\\theta$, $b = \\sin^2\\theta$ and $a + b = 1$:',
        math: '= 1 - 3\\cos^2\\theta\\sin^2\\theta + 3\\sin^2\\theta\\cos^2\\theta = 1',
      },
    ],
    answer: 'Proved.',
  },
]

const practice: Question[] = [
  {
    id: 'ex61-1i',
    source: 'Exercise 6.1 · Q1(i)',
    type: 'chain',
    prompt: 'Prove the identity, one line at a time.',
    toProve: '\\cot\\theta + \\tan\\theta = \\sec\\theta\\cosec\\theta',
    start: '\\cot\\theta + \\tan\\theta',
    steps: [
      {
        tex: '\\frac{\\cos\\theta}{\\sin\\theta} + \\frac{\\sin\\theta}{\\cos\\theta}',
        why: 'Write cot and tan in sin and cos.',
        wrong: [
          '\\frac{\\sin\\theta}{\\cos\\theta} + \\frac{\\sin\\theta}{\\cos\\theta}',
          '\\frac{\\cos\\theta}{\\sin\\theta} - \\frac{\\sin\\theta}{\\cos\\theta}',
        ],
      },
      {
        tex: '\\frac{\\cos^2\\theta + \\sin^2\\theta}{\\sin\\theta\\cos\\theta}',
        why: 'One fraction, over $\\sin\\theta\\cos\\theta$.',
        wrong: [
          '\\frac{\\cos\\theta + \\sin\\theta}{\\sin\\theta\\cos\\theta}',
          '\\frac{\\cos^2\\theta + \\sin^2\\theta}{\\sin\\theta + \\cos\\theta}',
        ],
      },
      {
        tex: '\\frac{1}{\\sin\\theta\\cos\\theta}',
        why: '$\\sin^2\\theta + \\cos^2\\theta = 1$.',
        wrong: ['\\frac{2}{\\sin\\theta\\cos\\theta}', '\\frac{\\sin\\theta\\cos\\theta}{1}'],
      },
      { tex: '\\frac{1}{\\cos\\theta}\\cdot\\frac{1}{\\sin\\theta}' },
      { tex: '\\sec\\theta\\cosec\\theta' },
    ],
    hints: ['Write everything in terms of $\\sin\\theta$ and $\\cos\\theta$, then add the fractions.'],
    solution: [],
  },
  {
    id: 'ex61-1ii',
    source: 'Exercise 6.1 · Q1(ii)',
    type: 'chain',
    prompt: 'Prove the identity, one line at a time.',
    toProve: '\\tan^4\\theta + \\tan^2\\theta = \\sec^4\\theta - \\sec^2\\theta',
    start: '\\tan^4\\theta + \\tan^2\\theta',
    steps: [
      {
        tex: '\\tan^2\\theta(\\tan^2\\theta + 1)',
        why: 'Take out the common factor $\\tan^2\\theta$.',
        wrong: ['\\tan^2\\theta(\\tan^2\\theta + \\tan\\theta)', '\\tan^2\\theta \\cdot \\tan^2\\theta'],
      },
      {
        tex: '(\\sec^2\\theta - 1)\\sec^2\\theta',
        why: '$\\tan^2\\theta = \\sec^2\\theta - 1$ and $\\tan^2\\theta + 1 = \\sec^2\\theta$.',
        wrong: ['(\\sec^2\\theta + 1)\\sec^2\\theta', '(1 - \\sec^2\\theta)\\sec^2\\theta'],
      },
      { tex: '\\sec^4\\theta - \\sec^2\\theta', why: 'Multiply out.' },
    ],
    hints: ['Factorise the left side first.'],
    solution: [],
  },
  {
    id: 'ex61-2i',
    source: 'Exercise 6.1 · Q2(i)',
    type: 'chain',
    prompt: 'Prove the identity, one line at a time.',
    toProve: '\\frac{1 - \\tan^2\\theta}{\\cot^2\\theta - 1} = \\tan^2\\theta',
    start: '\\frac{1 - \\tan^2\\theta}{\\cot^2\\theta - 1}',
    steps: [
      {
        tex: '\\frac{1 - \\tan^2\\theta}{\\frac{1}{\\tan^2\\theta} - 1}',
        why: '$\\cot\\theta = \\dfrac{1}{\\tan\\theta}$.',
        wrong: [
          '\\frac{1 - \\tan^2\\theta}{\\tan^2\\theta - 1}',
          '\\frac{1 - \\tan^2\\theta}{\\frac{1}{\\tan\\theta} - 1}',
        ],
      },
      {
        tex: '\\frac{1 - \\tan^2\\theta}{\\frac{1 - \\tan^2\\theta}{\\tan^2\\theta}}',
        why: 'Write the denominator as one fraction.',
        wrong: [
          '\\frac{1 - \\tan^2\\theta}{\\frac{\\tan^2\\theta - 1}{\\tan^2\\theta}}',
          '\\frac{1 - \\tan^2\\theta}{\\frac{1 - \\tan^2\\theta}{\\tan\\theta}}',
        ],
      },
      {
        tex: '\\tan^2\\theta',
        why: 'Cancel $1 - \\tan^2\\theta$; dividing by $\\frac{1}{\\tan^2\\theta}$ multiplies by $\\tan^2\\theta$.',
      },
    ],
    solution: [],
  },
  {
    id: 'ex61-2ii',
    source: 'Exercise 6.1 · Q2(ii)',
    type: 'chain',
    prompt: 'Prove the identity, one line at a time.',
    toProve: '\\frac{\\cos\\theta}{1 + \\sin\\theta} = \\sec\\theta - \\tan\\theta',
    start: '\\frac{\\cos\\theta}{1 + \\sin\\theta}',
    steps: [
      {
        tex: '\\frac{\\cos\\theta(1 - \\sin\\theta)}{(1 + \\sin\\theta)(1 - \\sin\\theta)}',
        why: 'Multiply the numerator and the denominator by the conjugate $1 - \\sin\\theta$.',
        wrong: [
          '\\frac{\\cos\\theta(1 + \\sin\\theta)}{(1 + \\sin\\theta)(1 - \\sin\\theta)}',
          '\\frac{\\cos\\theta(1 - \\sin\\theta)}{1 + \\sin\\theta}',
        ],
      },
      { tex: '\\frac{\\cos\\theta(1 - \\sin\\theta)}{1 - \\sin^2\\theta}' },
      {
        tex: '\\frac{\\cos\\theta(1 - \\sin\\theta)}{\\cos^2\\theta}',
        why: '$1 - \\sin^2\\theta = \\cos^2\\theta$.',
        wrong: ['\\frac{\\cos\\theta(1 - \\sin\\theta)}{\\sin^2\\theta}', '\\cos\\theta(1 - \\sin\\theta)'],
      },
      { tex: '\\frac{1 - \\sin\\theta}{\\cos\\theta}' },
      {
        tex: '\\frac{1}{\\cos\\theta} - \\frac{\\sin\\theta}{\\cos\\theta}',
        why: 'Split the fraction.',
        wrong: ['\\frac{1}{\\cos\\theta} - \\sin\\theta', '1 - \\frac{\\sin\\theta}{\\cos\\theta}'],
      },
      { tex: '\\sec\\theta - \\tan\\theta' },
    ],
    hints: ['The denominator $1 + \\sin\\theta$ has a conjugate, $1 - \\sin\\theta$.'],
    solution: [],
  },
  {
    id: 'ex61-3i',
    source: 'Exercise 6.1 · Q3(i)',
    type: 'chain',
    prompt: 'Prove the identity, one line at a time.',
    toProve: '\\sqrt{\\frac{1 + \\sin\\theta}{1 - \\sin\\theta}} = \\sec\\theta + \\tan\\theta',
    start: '\\sqrt{\\frac{1 + \\sin\\theta}{1 - \\sin\\theta}}',
    steps: [
      {
        tex: '\\sqrt{\\frac{(1 + \\sin\\theta)^2}{(1 - \\sin\\theta)(1 + \\sin\\theta)}}',
        why: 'Inside the root, multiply the numerator and the denominator by $1 + \\sin\\theta$.',
        wrong: [
          '\\sqrt{\\frac{(1 + \\sin\\theta)^2}{(1 - \\sin\\theta)^2}}',
          '\\sqrt{\\frac{1 + \\sin\\theta}{(1 - \\sin\\theta)(1 + \\sin\\theta)}}',
        ],
      },
      {
        tex: '\\sqrt{\\frac{(1 + \\sin\\theta)^2}{\\cos^2\\theta}}',
        why: '$(1 - \\sin\\theta)(1 + \\sin\\theta) = 1 - \\sin^2\\theta = \\cos^2\\theta$.',
        wrong: ['\\sqrt{\\frac{(1 + \\sin\\theta)^2}{\\sin^2\\theta}}', '\\sqrt{(1 + \\sin\\theta)^2}'],
      },
      {
        tex: '\\frac{1 + \\sin\\theta}{\\cos\\theta}',
        why: 'Both are positive for an acute angle, so take the positive root.',
        wrong: ['\\frac{(1 + \\sin\\theta)^2}{\\cos\\theta}', '\\frac{1 + \\sin\\theta}{\\cos^2\\theta}'],
      },
      { tex: '\\frac{1}{\\cos\\theta} + \\frac{\\sin\\theta}{\\cos\\theta}' },
      { tex: '\\sec\\theta + \\tan\\theta' },
    ],
    hints: ['Make the inside of the root a perfect square over a perfect square.'],
    solution: [],
  },
  {
    id: 'ex61-3ii',
    source: 'Exercise 6.1 · Q3(ii)',
    type: 'chain',
    prompt: 'Prove the identity, one line at a time.',
    toProve:
      '\\sqrt{\\frac{1 + \\sin\\theta}{1 - \\sin\\theta}} + \\sqrt{\\frac{1 - \\sin\\theta}{1 + \\sin\\theta}} = 2\\sec\\theta',
    start: '\\sqrt{\\frac{1 + \\sin\\theta}{1 - \\sin\\theta}} + \\sqrt{\\frac{1 - \\sin\\theta}{1 + \\sin\\theta}}',
    steps: [
      {
        tex: '\\frac{1 + \\sin\\theta}{\\cos\\theta} + \\frac{1 - \\sin\\theta}{\\cos\\theta}',
        why: 'As in (i): multiply inside each root by its own numerator, and use $1 - \\sin^2\\theta = \\cos^2\\theta$.',
        wrong: [
          '\\frac{1 + \\sin\\theta}{\\cos\\theta} + \\frac{\\cos\\theta}{1 - \\sin\\theta}',
          '\\frac{1 + \\sin\\theta}{\\cos^2\\theta} + \\frac{1 - \\sin\\theta}{\\cos^2\\theta}',
        ],
      },
      {
        tex: '\\frac{2}{\\cos\\theta}',
        why: 'Add: the $\\sin\\theta$ terms cancel.',
        wrong: ['\\frac{2\\sin\\theta}{\\cos\\theta}', '\\frac{2}{\\cos^2\\theta}'],
      },
      { tex: '2\\sec\\theta' },
    ],
    solution: [],
  },
  {
    id: 'ex61-4i',
    source: 'Exercise 6.1 · Q4(i)',
    type: 'chain',
    prompt: 'Prove the identity, one line at a time.',
    toProve: '\\sec^6\\theta = \\tan^6\\theta + 3\\tan^2\\theta\\sec^2\\theta + 1',
    start: '\\sec^6\\theta',
    steps: [
      { tex: '(\\sec^2\\theta)^3' },
      {
        tex: '(1 + \\tan^2\\theta)^3',
        why: '$\\sec^2\\theta = 1 + \\tan^2\\theta$.',
        wrong: ['(1 - \\tan^2\\theta)^3', '(\\tan^2\\theta - 1)^3'],
      },
      {
        tex: '1 + 3\\tan^2\\theta + 3\\tan^4\\theta + \\tan^6\\theta',
        why: '$(a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3$.',
        wrong: ['1 + \\tan^6\\theta', '1 + 3\\tan^2\\theta + \\tan^6\\theta'],
      },
      {
        tex: '1 + 3\\tan^2\\theta(1 + \\tan^2\\theta) + \\tan^6\\theta',
        why: 'Take out $3\\tan^2\\theta$ from the middle terms.',
        wrong: [
          '1 + 3\\tan^2\\theta(1 + \\tan\\theta) + \\tan^6\\theta',
          '1 + 3\\tan^2\\theta(1 + 3\\tan^2\\theta) + \\tan^6\\theta',
        ],
      },
      {
        tex: '1 + 3\\tan^2\\theta\\sec^2\\theta + \\tan^6\\theta',
        why: '$1 + \\tan^2\\theta = \\sec^2\\theta$ again.',
        wrong: ['1 + 3\\tan^2\\theta\\cos^2\\theta + \\tan^6\\theta', '1 + 3\\sec^2\\theta + \\tan^6\\theta'],
      },
      { tex: '\\tan^6\\theta + 3\\tan^2\\theta\\sec^2\\theta + 1' },
    ],
    hints: ['Write $\\sec^6\\theta$ as $(\\sec^2\\theta)^3$ and replace $\\sec^2\\theta$.'],
    solution: [],
  },
  {
    id: 'ex61-4ii',
    source: 'Exercise 6.1 · Q4(ii)',
    type: 'chain',
    prompt: 'Prove the identity, one line at a time.',
    toProve:
      '(\\sin\\theta + \\sec\\theta)^2 + (\\cos\\theta + \\cosec\\theta)^2 = 1 + (\\sec\\theta + \\cosec\\theta)^2',
    start: '(\\sin\\theta + \\sec\\theta)^2 + (\\cos\\theta + \\cosec\\theta)^2',
    steps: [
      {
        tex: '\\sin^2\\theta + 2\\sin\\theta\\sec\\theta + \\sec^2\\theta + \\cos^2\\theta + 2\\cos\\theta\\cosec\\theta + \\cosec^2\\theta',
        why: 'Expand both squares.',
        wrong: [
          '\\sin^2\\theta + \\sec^2\\theta + \\cos^2\\theta + \\cosec^2\\theta',
          '\\sin^2\\theta + 2 + \\sec^2\\theta + \\cos^2\\theta + 2 + \\cosec^2\\theta',
        ],
      },
      {
        tex: '1 + 2\\tan\\theta + 2\\cot\\theta + \\sec^2\\theta + \\cosec^2\\theta',
        why: '$\\sin^2\\theta + \\cos^2\\theta = 1$, $\\sin\\theta\\sec\\theta = \\tan\\theta$ and $\\cos\\theta\\cosec\\theta = \\cot\\theta$.',
        wrong: [
          '1 + 2\\sin\\theta + 2\\cos\\theta + \\sec^2\\theta + \\cosec^2\\theta',
          '1 + 4 + \\sec^2\\theta + \\cosec^2\\theta',
        ],
      },
      {
        tex: '1 + 2\\sec\\theta\\cosec\\theta + \\sec^2\\theta + \\cosec^2\\theta',
        why: '$\\tan\\theta + \\cot\\theta = \\sec\\theta\\cosec\\theta$, from Q1(i).',
        wrong: [
          '1 + 2 + \\sec^2\\theta + \\cosec^2\\theta',
          '1 + 2\\sin\\theta\\cos\\theta + \\sec^2\\theta + \\cosec^2\\theta',
        ],
      },
      {
        tex: '1 + (\\sec\\theta + \\cosec\\theta)^2',
        why: 'The last three terms make a perfect square.',
        wrong: ['1 + (\\sec\\theta - \\cosec\\theta)^2', '(1 + \\sec\\theta + \\cosec\\theta)^2'],
      },
    ],
    hints: ['Expand, then look for $\\tan\\theta + \\cot\\theta$. You proved what it equals in Q1(i).'],
    solution: [],
  },
  {
    id: 'ex61-5i',
    source: 'Exercise 6.1 · Q5(i)',
    type: 'chain',
    prompt: 'Prove the identity, one line at a time.',
    toProve: '\\sec^4\\theta(1 - \\sin^4\\theta) - 2\\tan^2\\theta = 1',
    start: '\\sec^4\\theta(1 - \\sin^4\\theta) - 2\\tan^2\\theta',
    steps: [
      {
        tex: '\\sec^4\\theta(1 - \\sin^2\\theta)(1 + \\sin^2\\theta) - 2\\tan^2\\theta',
        why: '$1 - \\sin^4\\theta$ is a difference of squares.',
        wrong: [
          '\\sec^4\\theta(1 - \\sin^2\\theta)^2 - 2\\tan^2\\theta',
          '\\sec^4\\theta(1 + \\sin^2\\theta)^2 - 2\\tan^2\\theta',
        ],
      },
      {
        tex: '\\sec^4\\theta\\cos^2\\theta(1 + \\sin^2\\theta) - 2\\tan^2\\theta',
        why: '$1 - \\sin^2\\theta = \\cos^2\\theta$.',
        wrong: ['\\sec^4\\theta\\sin^2\\theta(1 + \\sin^2\\theta) - 2\\tan^2\\theta'],
      },
      {
        tex: '\\sec^2\\theta(1 + \\sin^2\\theta) - 2\\tan^2\\theta',
        why: '$\\sec^4\\theta\\cos^2\\theta = \\sec^2\\theta$.',
      },
      {
        tex: '\\sec^2\\theta + \\tan^2\\theta - 2\\tan^2\\theta',
        why: 'Multiply out: $\\sec^2\\theta\\sin^2\\theta = \\dfrac{\\sin^2\\theta}{\\cos^2\\theta} = \\tan^2\\theta$.',
        wrong: [
          '\\sec^2\\theta + \\sin^2\\theta - 2\\tan^2\\theta',
          '\\sec^2\\theta + \\sec^2\\theta\\tan^2\\theta - 2\\tan^2\\theta',
        ],
      },
      { tex: '\\sec^2\\theta - \\tan^2\\theta' },
      { tex: '1', why: '$\\sec^2\\theta - \\tan^2\\theta = 1$.' },
    ],
    solution: [],
  },
  {
    id: 'ex61-5ii',
    source: 'Exercise 6.1 · Q5(ii)',
    type: 'chain',
    prompt: 'Prove the identity, one line at a time.',
    toProve:
      '\\frac{\\cot\\theta - \\cos\\theta}{\\cot\\theta + \\cos\\theta} = \\frac{\\cosec\\theta - 1}{\\cosec\\theta + 1}',
    start: '\\frac{\\cot\\theta - \\cos\\theta}{\\cot\\theta + \\cos\\theta}',
    steps: [
      {
        tex: '\\frac{\\frac{\\cos\\theta}{\\sin\\theta} - \\cos\\theta}{\\frac{\\cos\\theta}{\\sin\\theta} + \\cos\\theta}',
      },
      {
        tex: '\\frac{\\cos\\theta\\left(\\frac{1}{\\sin\\theta} - 1\\right)}{\\cos\\theta\\left(\\frac{1}{\\sin\\theta} + 1\\right)}',
        why: 'Take out $\\cos\\theta$ from the top and the bottom.',
        wrong: [
          '\\frac{\\cos\\theta\\left(\\frac{1}{\\sin\\theta} - \\cos\\theta\\right)}{\\cos\\theta\\left(\\frac{1}{\\sin\\theta} + \\cos\\theta\\right)}',
          '\\frac{\\cos\\theta(\\sin\\theta - 1)}{\\cos\\theta(\\sin\\theta + 1)}',
        ],
      },
      {
        tex: '\\frac{\\cosec\\theta - 1}{\\cosec\\theta + 1}',
        why: 'Cancel $\\cos\\theta$ and write $\\dfrac{1}{\\sin\\theta} = \\cosec\\theta$.',
        wrong: ['\\frac{\\sin\\theta - 1}{\\sin\\theta + 1}', '\\frac{\\sec\\theta - 1}{\\sec\\theta + 1}'],
      },
    ],
    solution: [],
  },
  {
    id: 'ex61-6i',
    source: 'Exercise 6.1 · Q6(i)',
    type: 'chain',
    prompt: 'Prove the identity, one line at a time.',
    toProve: '\\frac{\\sin A - \\sin B}{\\cos A + \\cos B} + \\frac{\\cos A - \\cos B}{\\sin A + \\sin B} = 0',
    start: '\\frac{\\sin A - \\sin B}{\\cos A + \\cos B} + \\frac{\\cos A - \\cos B}{\\sin A + \\sin B}',
    steps: [
      {
        tex: '\\frac{(\\sin A - \\sin B)(\\sin A + \\sin B) + (\\cos A - \\cos B)(\\cos A + \\cos B)}{(\\cos A + \\cos B)(\\sin A + \\sin B)}',
        why: 'Use the common denominator.',
        wrong: [
          '\\frac{(\\sin A - \\sin B) + (\\cos A - \\cos B)}{(\\cos A + \\cos B)(\\sin A + \\sin B)}',
          '\\frac{(\\sin A - \\sin B)(\\cos A + \\cos B) + (\\cos A - \\cos B)(\\sin A + \\sin B)}{(\\cos A + \\cos B)(\\sin A + \\sin B)}',
        ],
      },
      { tex: '\\frac{\\sin^2 A - \\sin^2 B + \\cos^2 A - \\cos^2 B}{(\\cos A + \\cos B)(\\sin A + \\sin B)}' },
      {
        tex: '\\frac{(\\sin^2 A + \\cos^2 A) - (\\sin^2 B + \\cos^2 B)}{(\\cos A + \\cos B)(\\sin A + \\sin B)}',
        why: 'Regroup by angle.',
      },
      {
        tex: '\\frac{1 - 1}{(\\cos A + \\cos B)(\\sin A + \\sin B)}',
        why: 'The identity, once for $A$ and once for $B$.',
        wrong: [
          '\\frac{1 + 1}{(\\cos A + \\cos B)(\\sin A + \\sin B)}',
          '\\frac{1}{(\\cos A + \\cos B)(\\sin A + \\sin B)}',
        ],
      },
      { tex: '0' },
    ],
    solution: [],
  },
  {
    id: 'ex61-6ii',
    source: 'Exercise 6.1 · Q6(ii)',
    type: 'chain',
    prompt: 'Prove the identity, one line at a time.',
    toProve: '\\frac{\\sin^3 A + \\cos^3 A}{\\sin A + \\cos A} + \\frac{\\sin^3 A - \\cos^3 A}{\\sin A - \\cos A} = 2',
    start: '\\frac{\\sin^3 A + \\cos^3 A}{\\sin A + \\cos A} + \\frac{\\sin^3 A - \\cos^3 A}{\\sin A - \\cos A}',
    steps: [
      {
        tex: '\\frac{(\\sin A + \\cos A)(\\sin^2 A - \\sin A\\cos A + \\cos^2 A)}{\\sin A + \\cos A} + \\frac{(\\sin A - \\cos A)(\\sin^2 A + \\sin A\\cos A + \\cos^2 A)}{\\sin A - \\cos A}',
        why: '$a^3 + b^3 = (a + b)(a^2 - ab + b^2)$ and $a^3 - b^3 = (a - b)(a^2 + ab + b^2)$.',
        wrong: [
          '\\frac{(\\sin A + \\cos A)(\\sin^2 A + \\sin A\\cos A + \\cos^2 A)}{\\sin A + \\cos A} + \\frac{(\\sin A - \\cos A)(\\sin^2 A + \\sin A\\cos A + \\cos^2 A)}{\\sin A - \\cos A}',
        ],
      },
      {
        tex: '(1 - \\sin A\\cos A) + (1 + \\sin A\\cos A)',
        why: 'Cancel, and use $\\sin^2 A + \\cos^2 A = 1$.',
        wrong: ['(1 - \\sin A\\cos A) - (1 + \\sin A\\cos A)', '(1 + \\sin A\\cos A) + (1 + \\sin A\\cos A)'],
      },
      { tex: '2' },
    ],
    hints: ['Factorise the sum and the difference of cubes.'],
    solution: [],
  },
  {
    id: 'ex61-7i',
    source: 'Exercise 6.1 · Q7(i)',
    type: 'chain',
    prompt: 'Prove the result, one line at a time.',
    given: '$\\sin\\theta + \\cos\\theta = \\sqrt3$',
    toProve: '\\tan\\theta + \\cot\\theta = 1',
    start: '\\tan\\theta + \\cot\\theta',
    steps: [
      { tex: '\\frac{\\sin\\theta}{\\cos\\theta} + \\frac{\\cos\\theta}{\\sin\\theta}' },
      {
        tex: '\\frac{\\sin^2\\theta + \\cos^2\\theta}{\\sin\\theta\\cos\\theta}',
        why: 'One fraction.',
        wrong: [
          '\\frac{\\sin\\theta + \\cos\\theta}{\\sin\\theta\\cos\\theta}',
          '\\frac{\\sin^2\\theta + \\cos^2\\theta}{\\sin\\theta + \\cos\\theta}',
        ],
      },
      { tex: '\\frac{1}{\\sin\\theta\\cos\\theta}' },
      {
        tex: '\\frac{1}{1}',
        why: 'Square the given: $1 + 2\\sin\\theta\\cos\\theta = 3$, so $\\sin\\theta\\cos\\theta = 1$.',
        wrong: ['\\frac{1}{2}', '\\frac{1}{\\sqrt3}'],
        byGiven: true,
      },
      { tex: '1' },
    ],
    hints: ['Square the given condition to find $\\sin\\theta\\cos\\theta$.'],
    solution: [
      {
        text: 'A side note: $\\sin\\theta + \\cos\\theta$ is never more than $\\sqrt2 \\approx 1.41$, so no real angle meets this condition. The question still shows the method: use what you are given to replace part of the expression.',
      },
    ],
  },
  {
    id: 'ex61-7ii',
    source: 'Exercise 6.1 · Q7(ii)',
    type: 'numeric',
    prompt:
      'The book asks: if $\\sqrt3\\sin\\theta - \\cos\\theta = 0$, show that $\\tan 3\\theta = \\dfrac{3\\tan\\theta - \\tan^3\\theta}{1 - 3\\tan^2\\theta}$. First find $\\theta$ (in degrees, $0^\\circ < \\theta < 90^\\circ$).',
    parts: [{ answer: { value: 30, unit: '°', display: '30°' } }],
    hints: ['Divide the condition by $\\cos\\theta$ to find $\\tan\\theta$.'],
    solution: [
      {
        math: '\\sqrt3\\sin\\theta = \\cos\\theta \\;\\Rightarrow\\; \\tan\\theta = \\frac{1}{\\sqrt3} \\;\\Rightarrow\\; \\theta = 30^\\circ',
      },
      {
        text: 'Now look at the result to be shown. On the left, $\\tan 3\\theta = \\tan 90^\\circ$, which is not defined. On the right, $1 - 3\\tan^2\\theta = 1 - 3 \\times \\tfrac13 = 0$, so the denominator is zero.',
      },
      {
        text: 'Both sides are undefined at this angle, so there is nothing to show here. (The formula for $\\tan 3\\theta$ is a true identity in general, but it is beyond Class 10.) Ask your teacher how they want this question answered.',
      },
    ],
  },
  {
    id: 'ex61-8i',
    source: 'Exercise 6.1 · Q8(i)',
    type: 'chain',
    prompt: 'Prove the result, one line at a time.',
    given: '$\\dfrac{\\cos\\alpha}{\\cos\\beta} = m$ and $\\dfrac{\\cos\\alpha}{\\sin\\beta} = n$',
    toProve: '(m^2 + n^2)\\cos^2\\beta = n^2',
    start: '(m^2 + n^2)\\cos^2\\beta',
    steps: [
      {
        tex: '\\left(\\frac{\\cos^2\\alpha}{\\cos^2\\beta} + \\frac{\\cos^2\\alpha}{\\sin^2\\beta}\\right)\\cos^2\\beta',
        why: 'Substitute $m$ and $n$ from the given.',
        wrong: ['\\left(\\frac{\\cos\\alpha}{\\cos\\beta} + \\frac{\\cos\\alpha}{\\sin\\beta}\\right)\\cos^2\\beta'],
        byGiven: true,
      },
      {
        tex: '\\cos^2\\alpha + \\frac{\\cos^2\\alpha\\cos^2\\beta}{\\sin^2\\beta}',
        why: 'Multiply each term by $\\cos^2\\beta$.',
        wrong: [
          '\\cos^2\\alpha + \\frac{\\cos^2\\alpha}{\\sin^2\\beta}',
          '\\cos^2\\alpha\\cos^2\\beta + \\frac{\\cos^2\\alpha}{\\sin^2\\beta}',
        ],
      },
      {
        tex: '\\frac{\\cos^2\\alpha(\\sin^2\\beta + \\cos^2\\beta)}{\\sin^2\\beta}',
        why: 'One fraction, over $\\sin^2\\beta$.',
      },
      {
        tex: '\\frac{\\cos^2\\alpha}{\\sin^2\\beta}',
        why: '$\\sin^2\\beta + \\cos^2\\beta = 1$.',
        wrong: ['\\frac{\\cos^2\\alpha}{\\cos^2\\beta}', '\\frac{2\\cos^2\\alpha}{\\sin^2\\beta}'],
      },
      { tex: 'n^2', why: 'This is $\\left(\\dfrac{\\cos\\alpha}{\\sin\\beta}\\right)^2$.', byGiven: true },
    ],
    solution: [],
  },
  {
    id: 'ex61-8ii',
    source: 'Exercise 6.1 · Q8(ii)',
    type: 'chain',
    prompt: 'Prove the result, one line at a time.',
    given: '$\\cot\\theta + \\tan\\theta = x$ and $\\sec\\theta - \\cos\\theta = y$',
    toProve: '(x^2y)^{\\frac23} - (xy^2)^{\\frac23} = 1',
    start: '(x^2y)^{\\frac23} - (xy^2)^{\\frac23}',
    steps: [
      {
        tex: '\\left(\\frac{1}{\\cos^3\\theta}\\right)^{\\frac23} - \\left(\\frac{\\sin^3\\theta}{\\cos^3\\theta}\\right)^{\\frac23}',
        why: 'From the given, $x = \\dfrac{1}{\\sin\\theta\\cos\\theta}$ (as in Q1(i)) and $y = \\dfrac{1 - \\cos^2\\theta}{\\cos\\theta} = \\dfrac{\\sin^2\\theta}{\\cos\\theta}$. So $x^2y = \\dfrac{1}{\\cos^3\\theta}$ and $xy^2 = \\dfrac{\\sin^3\\theta}{\\cos^3\\theta}$.',
        wrong: [
          '\\left(\\frac{1}{\\sin^3\\theta}\\right)^{\\frac23} - \\left(\\frac{\\cos^3\\theta}{\\sin^3\\theta}\\right)^{\\frac23}',
        ],
        byGiven: true,
      },
      {
        tex: '\\frac{1}{\\cos^2\\theta} - \\frac{\\sin^2\\theta}{\\cos^2\\theta}',
        why: '$(a^3)^{\\frac23} = a^2$.',
        wrong: [
          '\\frac{1}{\\cos\\theta} - \\frac{\\sin\\theta}{\\cos\\theta}',
          '\\frac{1}{\\cos^3\\theta} - \\frac{\\sin^3\\theta}{\\cos^3\\theta}',
        ],
      },
      { tex: '\\frac{1 - \\sin^2\\theta}{\\cos^2\\theta}' },
      {
        tex: '\\frac{\\cos^2\\theta}{\\cos^2\\theta}',
        why: '$1 - \\sin^2\\theta = \\cos^2\\theta$.',
        wrong: ['\\frac{\\sin^2\\theta}{\\cos^2\\theta}'],
      },
      { tex: '1' },
    ],
    hints: ['Simplify $x$ and $y$ first, each in sin and cos. Then work out $x^2y$ and $xy^2$.'],
    solution: [
      {
        math: 'x = \\frac{\\cos\\theta}{\\sin\\theta} + \\frac{\\sin\\theta}{\\cos\\theta} = \\frac{1}{\\sin\\theta\\cos\\theta}, \\qquad y = \\frac{1}{\\cos\\theta} - \\cos\\theta = \\frac{\\sin^2\\theta}{\\cos\\theta}',
      },
      {
        math: 'x^2y = \\frac{1}{\\sin^2\\theta\\cos^2\\theta}\\cdot\\frac{\\sin^2\\theta}{\\cos\\theta} = \\frac{1}{\\cos^3\\theta}, \\qquad xy^2 = \\frac{1}{\\sin\\theta\\cos\\theta}\\cdot\\frac{\\sin^4\\theta}{\\cos^2\\theta} = \\frac{\\sin^3\\theta}{\\cos^3\\theta}',
      },
    ],
  },
  {
    id: 'ex61-9i',
    source: 'Exercise 6.1 · Q9(i)',
    type: 'chain',
    prompt: 'Prove the result, one line at a time.',
    given: '$\\sin\\theta + \\cos\\theta = p$ and $\\sec\\theta + \\cosec\\theta = q$',
    toProve: 'q(p^2 - 1) = 2p',
    start: 'q(p^2 - 1)',
    steps: [
      {
        tex: '\\left(\\frac{1}{\\cos\\theta} + \\frac{1}{\\sin\\theta}\\right)\\left((\\sin\\theta + \\cos\\theta)^2 - 1\\right)',
        why: 'Substitute from the given.',
        byGiven: true,
      },
      {
        tex: '\\frac{\\sin\\theta + \\cos\\theta}{\\sin\\theta\\cos\\theta}\\left(\\sin^2\\theta + \\cos^2\\theta + 2\\sin\\theta\\cos\\theta - 1\\right)',
        why: 'Add the fractions in the first bracket; expand the square in the second.',
        wrong: [
          '\\frac{\\sin\\theta + \\cos\\theta}{\\sin\\theta\\cos\\theta}\\left(\\sin^2\\theta + \\cos^2\\theta - 1\\right)',
          '\\frac{1}{\\sin\\theta + \\cos\\theta}\\left(\\sin^2\\theta + \\cos^2\\theta + 2\\sin\\theta\\cos\\theta - 1\\right)',
        ],
      },
      {
        tex: '\\frac{\\sin\\theta + \\cos\\theta}{\\sin\\theta\\cos\\theta}\\cdot 2\\sin\\theta\\cos\\theta',
        why: '$\\sin^2\\theta + \\cos^2\\theta - 1 = 0$.',
      },
      {
        tex: '2(\\sin\\theta + \\cos\\theta)',
        why: 'Cancel $\\sin\\theta\\cos\\theta$.',
        wrong: ['2\\sin\\theta\\cos\\theta(\\sin\\theta + \\cos\\theta)', '\\sin\\theta + \\cos\\theta'],
      },
      { tex: '2p', byGiven: true, why: '$\\sin\\theta + \\cos\\theta = p$.' },
    ],
    solution: [],
  },
  {
    id: 'ex61-9ii',
    source: 'Exercise 6.1 · Q9(ii)',
    type: 'proof',
    prompt: 'This one works from the given equation towards the result. Choose the reason for each step.',
    given: '$\\sin\\theta(1 + \\sin^2\\theta) = \\cos^2\\theta$',
    toProve: '$\\cos^6\\theta - 4\\cos^4\\theta + 8\\cos^2\\theta = 4$',
    steps: [
      { statement: '$\\sin\\theta(1 + \\sin^2\\theta) = \\cos^2\\theta$', reason: 'Given' },
      {
        statement: '$\\sin\\theta(2 - \\cos^2\\theta) = \\cos^2\\theta$',
        reason: '$\\sin^2\\theta = 1 - \\cos^2\\theta$',
        choices: [
          '$\\sin^2\\theta = 1 - \\cos^2\\theta$',
          '$\\sin\\theta = 1 - \\cos\\theta$',
          'Divide both sides by $\\sin\\theta$',
        ],
      },
      {
        statement: '$\\sin^2\\theta(2 - \\cos^2\\theta)^2 = \\cos^4\\theta$',
        reason: SQ,
        choices: [SQ, 'Take the square root of both sides', 'Multiply both sides by $\\sin\\theta$'],
      },
      {
        statement: '$(1 - \\cos^2\\theta)(4 - 4\\cos^2\\theta + \\cos^4\\theta) = \\cos^4\\theta$',
        reason: '$\\sin^2\\theta = 1 - \\cos^2\\theta$, and expand $(2 - \\cos^2\\theta)^2$',
        choices: [
          '$\\sin^2\\theta = 1 - \\cos^2\\theta$, and expand $(2 - \\cos^2\\theta)^2$',
          '$\\sin^2\\theta = \\cos^2\\theta - 1$, and expand $(2 - \\cos^2\\theta)^2$',
          '$(2 - \\cos^2\\theta)^2 = 4 - \\cos^4\\theta$',
        ],
      },
      {
        statement: '$4 - 8\\cos^2\\theta + 5\\cos^4\\theta - \\cos^6\\theta = \\cos^4\\theta$',
        reason: 'Multiply out the left side',
      },
      {
        statement: '$\\cos^6\\theta - 4\\cos^4\\theta + 8\\cos^2\\theta = 4$',
        reason: 'Move every term to one side and rearrange',
        choices: ['Move every term to one side and rearrange', 'Divide both sides by $\\cos^2\\theta$', PY],
      },
    ],
    hints: [
      'To get only $\\cos\\theta$ in the answer, first replace $\\sin^2\\theta$; then square to get rid of the lone $\\sin\\theta$.',
    ],
    solution: [],
  },
  {
    id: 'ex61-10',
    source: 'Exercise 6.1 · Q10',
    type: 'chain',
    prompt: 'Prove the result, one line at a time.',
    given: '$\\dfrac{\\cos\\theta}{1 + \\sin\\theta} = \\dfrac1a$',
    toProve: '\\frac{a^2 - 1}{a^2 + 1} = \\sin\\theta',
    start: '\\frac{a^2 - 1}{a^2 + 1}',
    steps: [
      {
        tex: '\\frac{\\frac{1 + \\sin\\theta}{1 - \\sin\\theta} - 1}{\\frac{1 + \\sin\\theta}{1 - \\sin\\theta} + 1}',
        why: 'From the given, $a = \\dfrac{1 + \\sin\\theta}{\\cos\\theta}$, so $a^2 = \\dfrac{(1 + \\sin\\theta)^2}{1 - \\sin^2\\theta} = \\dfrac{1 + \\sin\\theta}{1 - \\sin\\theta}$.',
        wrong: [
          '\\frac{\\frac{1 - \\sin\\theta}{1 + \\sin\\theta} - 1}{\\frac{1 - \\sin\\theta}{1 + \\sin\\theta} + 1}',
        ],
        byGiven: true,
      },
      {
        tex: '\\frac{(1 + \\sin\\theta) - (1 - \\sin\\theta)}{(1 + \\sin\\theta) + (1 - \\sin\\theta)}',
        why: 'Multiply the top and the bottom by $1 - \\sin\\theta$.',
        wrong: [
          '\\frac{(1 + \\sin\\theta) - 1}{(1 + \\sin\\theta) + 1}',
          '\\frac{(1 + \\sin\\theta) + (1 - \\sin\\theta)}{(1 + \\sin\\theta) - (1 - \\sin\\theta)}',
        ],
      },
      { tex: '\\frac{2\\sin\\theta}{2}' },
      { tex: '\\sin\\theta' },
    ],
    hints: ['Find $a^2$ from the given. A conjugate makes it simpler.'],
    solution: [],
  },
  {
    id: 'u6-1i',
    source: 'Unit Exercise 6 · Q1(i)',
    type: 'chain',
    prompt: 'Prove the identity, one line at a time.',
    toProve:
      '\\cot^2 A\\left(\\frac{\\sec A - 1}{1 + \\sin A}\\right) + \\sec^2 A\\left(\\frac{\\sin A - 1}{1 + \\sec A}\\right) = 0',
    start:
      '\\cot^2 A\\left(\\frac{\\sec A - 1}{1 + \\sin A}\\right) + \\sec^2 A\\left(\\frac{\\sin A - 1}{1 + \\sec A}\\right)',
    steps: [
      {
        tex: '\\frac{\\cos A(1 - \\cos A)}{\\sin^2 A(1 + \\sin A)} + \\frac{\\sin A - 1}{\\cos A(1 + \\cos A)}',
        why: 'Write each term in sin and cos: $\\cot^2 A(\\sec A - 1) = \\dfrac{\\cos^2 A}{\\sin^2 A}\\cdot\\dfrac{1 - \\cos A}{\\cos A}$, and $\\dfrac{\\sec^2 A}{1 + \\sec A} = \\dfrac{1}{\\cos A(\\cos A + 1)}$.',
        wrong: [
          '\\frac{\\cos A(1 - \\cos A)}{\\sin^2 A(1 + \\sin A)} + \\frac{\\sin A - 1}{\\cos^2 A(1 + \\cos A)}',
          '\\frac{1 - \\cos A}{\\sin^2 A(1 + \\sin A)} + \\frac{\\sin A - 1}{\\cos A(1 + \\cos A)}',
        ],
      },
      {
        tex: '\\frac{\\cos A(1 - \\cos A)}{(1 - \\cos A)(1 + \\cos A)(1 + \\sin A)} + \\frac{\\sin A - 1}{\\cos A(1 + \\cos A)}',
        why: '$\\sin^2 A = 1 - \\cos^2 A = (1 - \\cos A)(1 + \\cos A)$.',
        wrong: [
          '\\frac{\\cos A(1 - \\cos A)}{(1 - \\cos A)^2(1 + \\sin A)} + \\frac{\\sin A - 1}{\\cos A(1 + \\cos A)}',
        ],
      },
      {
        tex: '\\frac{\\cos A}{(1 + \\cos A)(1 + \\sin A)} + \\frac{\\sin A - 1}{\\cos A(1 + \\cos A)}',
        why: 'Cancel $1 - \\cos A$.',
      },
      {
        tex: '\\frac{\\cos^2 A + (\\sin A - 1)(1 + \\sin A)}{\\cos A(1 + \\cos A)(1 + \\sin A)}',
        why: 'Common denominator $\\cos A(1 + \\cos A)(1 + \\sin A)$.',
        wrong: [
          '\\frac{\\cos A + (\\sin A - 1)}{\\cos A(1 + \\cos A)(1 + \\sin A)}',
          '\\frac{\\cos^2 A + (\\sin A - 1)}{\\cos A(1 + \\cos A)(1 + \\sin A)}',
        ],
      },
      {
        tex: '\\frac{\\cos^2 A + \\sin^2 A - 1}{\\cos A(1 + \\cos A)(1 + \\sin A)}',
        why: '$(\\sin A - 1)(\\sin A + 1) = \\sin^2 A - 1$.',
        wrong: [
          '\\frac{\\cos^2 A - \\sin^2 A - 1}{\\cos A(1 + \\cos A)(1 + \\sin A)}',
          '\\frac{\\cos^2 A + \\sin^2 A + 1}{\\cos A(1 + \\cos A)(1 + \\sin A)}',
        ],
      },
      { tex: '\\frac{0}{\\cos A(1 + \\cos A)(1 + \\sin A)}' },
      { tex: '0' },
    ],
    hints: ['Change cot and sec into sin and cos, and simplify each term separately before adding.'],
    solution: [],
  },
  {
    id: 'u6-1ii',
    source: 'Unit Exercise 6 · Q1(ii)',
    type: 'chain',
    prompt: 'Prove the identity, one line at a time.',
    toProve: '\\frac{\\tan^2\\theta - 1}{\\tan^2\\theta + 1} = 1 - 2\\cos^2\\theta',
    start: '\\frac{\\tan^2\\theta - 1}{\\tan^2\\theta + 1}',
    steps: [
      {
        tex: '\\frac{\\tan^2\\theta - 1}{\\sec^2\\theta}',
        why: '$\\tan^2\\theta + 1 = \\sec^2\\theta$.',
        wrong: ['\\frac{\\tan^2\\theta - 1}{\\cosec^2\\theta}', '\\frac{\\sec^2\\theta}{\\tan^2\\theta + 1}'],
      },
      { tex: '(\\tan^2\\theta - 1)\\cos^2\\theta' },
      {
        tex: '\\sin^2\\theta - \\cos^2\\theta',
        why: 'Multiply out: $\\tan^2\\theta\\cos^2\\theta = \\sin^2\\theta$.',
        wrong: ['\\sin^2\\theta - 1', '\\sin^2\\theta - \\cos\\theta'],
      },
      {
        tex: '(1 - \\cos^2\\theta) - \\cos^2\\theta',
        why: '$\\sin^2\\theta = 1 - \\cos^2\\theta$, to have only cosines.',
        wrong: ['(1 - \\sin^2\\theta) - \\cos^2\\theta', '(\\cos^2\\theta - 1) - \\cos^2\\theta'],
      },
      { tex: '1 - 2\\cos^2\\theta' },
    ],
    solution: [],
  },
  {
    id: 'u6-2',
    source: 'Unit Exercise 6 · Q2',
    type: 'chain',
    prompt: 'Prove the identity, one line at a time.',
    toProve:
      '\\left(\\frac{1 + \\sin\\theta - \\cos\\theta}{1 + \\sin\\theta + \\cos\\theta}\\right)^2 = \\frac{1 - \\cos\\theta}{1 + \\cos\\theta}',
    start: '\\left(\\frac{1 + \\sin\\theta - \\cos\\theta}{1 + \\sin\\theta + \\cos\\theta}\\right)^2',
    steps: [
      {
        tex: '\\frac{1 + \\sin^2\\theta + \\cos^2\\theta + 2\\sin\\theta - 2\\cos\\theta - 2\\sin\\theta\\cos\\theta}{1 + \\sin^2\\theta + \\cos^2\\theta + 2\\sin\\theta + 2\\cos\\theta + 2\\sin\\theta\\cos\\theta}',
        why: 'Square the numerator and the denominator: $(a + b + c)^2 = a^2 + b^2 + c^2 + 2ab + 2bc + 2ca$.',
        wrong: [
          '\\frac{1 + \\sin^2\\theta - \\cos^2\\theta}{1 + \\sin^2\\theta + \\cos^2\\theta}',
          '\\frac{1 + \\sin^2\\theta + \\cos^2\\theta - 2\\sin\\theta\\cos\\theta}{1 + \\sin^2\\theta + \\cos^2\\theta + 2\\sin\\theta\\cos\\theta}',
        ],
      },
      {
        tex: '\\frac{2 + 2\\sin\\theta - 2\\cos\\theta - 2\\sin\\theta\\cos\\theta}{2 + 2\\sin\\theta + 2\\cos\\theta + 2\\sin\\theta\\cos\\theta}',
        why: '$\\sin^2\\theta + \\cos^2\\theta = 1$.',
      },
      {
        tex: '\\frac{2(1 + \\sin\\theta) - 2\\cos\\theta(1 + \\sin\\theta)}{2(1 + \\sin\\theta) + 2\\cos\\theta(1 + \\sin\\theta)}',
        why: 'Group the terms in pairs.',
        wrong: [
          '\\frac{2(1 + \\sin\\theta) - 2\\cos\\theta(1 - \\sin\\theta)}{2(1 + \\sin\\theta) + 2\\cos\\theta(1 - \\sin\\theta)}',
        ],
      },
      { tex: '\\frac{2(1 + \\sin\\theta)(1 - \\cos\\theta)}{2(1 + \\sin\\theta)(1 + \\cos\\theta)}' },
      {
        tex: '\\frac{1 - \\cos\\theta}{1 + \\cos\\theta}',
        why: 'Cancel $2(1 + \\sin\\theta)$.',
        wrong: ['\\frac{1 + \\cos\\theta}{1 - \\cos\\theta}', '\\frac{1 - \\sin\\theta}{1 + \\sin\\theta}'],
      },
    ],
    hints: ['Expand both squares. After using the identity, every term has a factor you can take out in pairs.'],
    solution: [],
  },
  {
    id: 'u6-3',
    source: 'Unit Exercise 6 · Q3',
    type: 'proof',
    prompt: 'Choose the reason for each step.',
    given: '$x\\sin^3\\theta + y\\cos^3\\theta = \\sin\\theta\\cos\\theta$ and $x\\sin\\theta = y\\cos\\theta$',
    toProve: '$x^2 + y^2 = 1$',
    steps: [
      {
        statement: '$x\\sin\\theta\\cdot\\sin^2\\theta + y\\cos\\theta\\cdot\\cos^2\\theta = \\sin\\theta\\cos\\theta$',
        reason: 'The first condition, written differently',
      },
      {
        statement: '$x\\sin\\theta\\cdot\\sin^2\\theta + x\\sin\\theta\\cdot\\cos^2\\theta = \\sin\\theta\\cos\\theta$',
        reason: 'Replace $y\\cos\\theta$ by $x\\sin\\theta$ (second condition)',
        choices: [
          'Replace $y\\cos\\theta$ by $x\\sin\\theta$ (second condition)',
          'Replace $\\cos^2\\theta$ by $1 - \\sin^2\\theta$',
          SQ,
        ],
      },
      {
        statement: '$x\\sin\\theta(\\sin^2\\theta + \\cos^2\\theta) = \\sin\\theta\\cos\\theta$',
        reason: 'Take out the common factor $x\\sin\\theta$',
      },
      {
        statement: '$x\\sin\\theta = \\sin\\theta\\cos\\theta$, so $x = \\cos\\theta$',
        reason: `${PY}, then divide by $\\sin\\theta$`,
        choices: [
          `${PY}, then divide by $\\sin\\theta$`,
          'Second condition',
          '$\\tan\\theta = \\dfrac{\\sin\\theta}{\\cos\\theta}$',
        ],
      },
      {
        statement: '$y\\cos\\theta = \\cos\\theta\\sin\\theta$, so $y = \\sin\\theta$',
        reason: 'Second condition with $x = \\cos\\theta$, then divide by $\\cos\\theta$',
        choices: ['Second condition with $x = \\cos\\theta$, then divide by $\\cos\\theta$', 'First condition', PY],
      },
      {
        statement: '$x^2 + y^2 = \\cos^2\\theta + \\sin^2\\theta = 1$',
        reason: PY,
        choices: [PY, '$1 + \\tan^2\\theta = \\sec^2\\theta$', 'Second condition'],
      },
    ],
    hints: ['Use the second condition to replace $y\\cos\\theta$ inside the first one.'],
    solution: [],
  },
  {
    id: 'u6-4',
    source: 'Unit Exercise 6 · Q4',
    type: 'proof',
    prompt: 'Choose the reason for each step.',
    given: '$a\\cos\\theta - b\\sin\\theta = c$',
    toProve: '$a\\sin\\theta + b\\cos\\theta = \\pm\\sqrt{a^2 + b^2 - c^2}$',
    steps: [
      {
        statement:
          '$(a\\cos\\theta - b\\sin\\theta)^2 + (a\\sin\\theta + b\\cos\\theta)^2$ $= a^2\\cos^2\\theta + b^2\\sin^2\\theta + a^2\\sin^2\\theta + b^2\\cos^2\\theta$',
        reason: 'Expand both squares; the $2ab\\sin\\theta\\cos\\theta$ terms cancel',
        choices: [
          'Expand both squares; the $2ab\\sin\\theta\\cos\\theta$ terms cancel',
          'Expand both squares; the $2ab\\sin\\theta\\cos\\theta$ terms add up',
          '$(x - y)^2 = x^2 - y^2$',
        ],
      },
      {
        statement: '$= a^2(\\sin^2\\theta + \\cos^2\\theta) + b^2(\\sin^2\\theta + \\cos^2\\theta) = a^2 + b^2$',
        reason: PY,
        choices: [PY, '$1 + \\tan^2\\theta = \\sec^2\\theta$', 'Given'],
      },
      {
        statement: '$c^2 + (a\\sin\\theta + b\\cos\\theta)^2 = a^2 + b^2$',
        reason: 'Given: the first bracket is $c$',
        choices: ['Given: the first bracket is $c$', PY, SQ],
      },
      { statement: '$(a\\sin\\theta + b\\cos\\theta)^2 = a^2 + b^2 - c^2$', reason: 'Subtract $c^2$ from both sides' },
      {
        statement: '$a\\sin\\theta + b\\cos\\theta = \\pm\\sqrt{a^2 + b^2 - c^2}$',
        reason: 'Take the square root; it can be positive or negative',
        choices: ['Take the square root; it can be positive or negative', SQ, 'Divide both sides by $\\cos\\theta$'],
      },
    ],
    hints: ['Add the squares of $a\\cos\\theta - b\\sin\\theta$ and $a\\sin\\theta + b\\cos\\theta$. What do you get?'],
    solution: [],
  },
]

export const lesson3: Lesson = {
  id: 'proving',
  number: 3,
  title: 'Proving identities',
  summary: 'Five techniques that cover Examples 6.1–6.17, then every proof in Exercise 6.1, one line at a time.',
  pages: '244–250',
  status: 'ready',

  learn: [
    {
      id: 'rules',
      title: 'How a proof of an identity works',
      blocks: [
        {
          t: 'p',
          text: 'To prove an identity, **start with one side** (usually the more complicated one) and rewrite it, one equal expression at a time, until it becomes **the other side**.',
        },
        {
          t: 'list',
          items: [
            'Each new line must equal the line before it, using an identity, a definition such as $\\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta}$, or ordinary algebra.',
            'Do **not** treat the identity as an equation to solve: no moving terms across the "=", no squaring both sides. That would assume the very thing you are proving.',
            'If neither side is obviously simpler, simplify both to the same expression (Example 6.15).',
          ],
        },
        {
          t: 'note',
          tone: 'tip',
          text: 'Before you start, look at the side you are aiming for. If it has only sines and cosines, write everything in sin and cos. If it has $\\sec\\theta$ and $\\tan\\theta$, try to stay with those.',
        },
      ],
      check: {
        id: 'l3-c-rules',
        type: 'chain',
        prompt: 'Your first proof. Choose each next line.',
        toProve: '\\tan\\theta\\cos\\theta = \\sin\\theta',
        start: '\\tan\\theta\\cos\\theta',
        steps: [
          {
            tex: '\\frac{\\sin\\theta}{\\cos\\theta}\\cdot\\cos\\theta',
            why: '$\\tan\\theta = \\dfrac{\\sin\\theta}{\\cos\\theta}$.',
            wrong: [
              '\\frac{\\cos\\theta}{\\sin\\theta}\\cdot\\cos\\theta',
              '\\frac{1}{\\cos\\theta}\\cdot\\cos\\theta',
            ],
          },
          { tex: '\\sin\\theta', why: 'Cancel $\\cos\\theta$.' },
        ],
        solution: [],
      },
    },
    {
      id: 'sincos',
      title: 'Technique 1: write everything in sin and cos',
      blocks: [
        {
          t: 'p',
          text: 'When an expression mixes several ratios, replace each by sin and cos. The expression becomes fractions you already know how to handle. Example 6.4:',
        },
        {
          t: 'math',
          tex: '\\sec\\theta - \\cos\\theta = \\frac{1}{\\cos\\theta} - \\cos\\theta = \\frac{1 - \\cos^2\\theta}{\\cos\\theta} = \\frac{\\sin^2\\theta}{\\cos\\theta} = \\tan\\theta\\sin\\theta',
        },
        { t: 'p', text: 'Examples 6.1, 6.6 and 6.9 use the same idea.' },
      ],
      check: {
        id: 'l3-c-sincos',
        type: 'chain',
        prompt: 'Choose each next line.',
        toProve: '\\cosec\\theta\\tan\\theta = \\sec\\theta',
        start: '\\cosec\\theta\\tan\\theta',
        steps: [
          {
            tex: '\\frac{1}{\\sin\\theta}\\cdot\\frac{\\sin\\theta}{\\cos\\theta}',
            why: 'Write each ratio in sin and cos.',
            wrong: [
              '\\frac{1}{\\cos\\theta}\\cdot\\frac{\\sin\\theta}{\\cos\\theta}',
              '\\sin\\theta\\cdot\\frac{\\sin\\theta}{\\cos\\theta}',
            ],
          },
          {
            tex: '\\frac{1}{\\cos\\theta}',
            why: 'Cancel $\\sin\\theta$.',
            wrong: ['\\frac{1}{\\sin\\theta}', '\\frac{\\sin^2\\theta}{\\cos\\theta}'],
          },
          { tex: '\\sec\\theta' },
        ],
        solution: [],
      },
    },
    {
      id: 'swap',
      title: 'Technique 2: swap in an identity, and factorise',
      blocks: [
        {
          t: 'p',
          text: 'Spot the rearranged forms: $1 - \\cos^2\\theta$ is $\\sin^2\\theta$, $\\sec^2\\theta - 1$ is $\\tan^2\\theta$, $\\cosec^2\\theta - 1$ is $\\cot^2\\theta$. The swap can go either way.',
        },
        {
          t: 'p',
          text: 'Sometimes it helps to swap a square **into** a difference of squares, so that it factorises and cancels. Example 6.3:',
        },
        {
          t: 'math',
          tex: '1 + \\frac{\\cot^2\\theta}{1 + \\cosec\\theta} = 1 + \\frac{(\\cosec\\theta + 1)(\\cosec\\theta - 1)}{\\cosec\\theta + 1} = 1 + \\cosec\\theta - 1 = \\cosec\\theta',
        },
      ],
      check: {
        id: 'l3-c-swap',
        type: 'chain',
        prompt: 'Choose each next line.',
        toProve: '(1 - \\cos^2\\theta)\\cosec^2\\theta = 1',
        start: '(1 - \\cos^2\\theta)\\cosec^2\\theta',
        steps: [
          {
            tex: '\\sin^2\\theta\\cosec^2\\theta',
            why: '$1 - \\cos^2\\theta = \\sin^2\\theta$.',
            wrong: ['\\cos^2\\theta\\cosec^2\\theta', '\\tan^2\\theta\\cosec^2\\theta'],
          },
          {
            tex: '\\sin^2\\theta\\cdot\\frac{1}{\\sin^2\\theta}',
            wrong: ['\\sin^2\\theta\\cdot\\frac{1}{\\cos^2\\theta}'],
          },
          { tex: '1' },
        ],
        solution: [],
      },
    },
    {
      id: 'conjugate',
      title: 'Technique 3: multiply by the conjugate',
      blocks: [
        {
          t: 'p',
          text: 'The **conjugate** of $1 + \\cos A$ is $1 - \\cos A$. Their product is $1 - \\cos^2 A = \\sin^2 A$, a single term. Multiplying the numerator and the denominator by the conjugate clears a sum out of the denominator.',
        },
        {
          t: 'table',
          head: ['Expression', 'Conjugate', 'Product'],
          rows: [
            ['$1 + \\cos\\theta$', '$1 - \\cos\\theta$', '$\\sin^2\\theta$'],
            ['$1 - \\sin\\theta$', '$1 + \\sin\\theta$', '$\\cos^2\\theta$'],
            ['$\\sec\\theta - \\tan\\theta$', '$\\sec\\theta + \\tan\\theta$', '$1$'],
            ['$\\cosec\\theta + \\cot\\theta$', '$\\cosec\\theta - \\cot\\theta$', '$1$'],
          ],
        },
        { t: 'p', text: 'Examples 6.2 and 6.5 use this. Inside a square root, it makes both parts perfect squares.' },
      ],
      check: {
        id: 'l3-c-conj',
        type: 'chain',
        prompt: 'Choose each next line.',
        toProve: '\\frac{1}{\\sec\\theta - \\tan\\theta} = \\sec\\theta + \\tan\\theta',
        start: '\\frac{1}{\\sec\\theta - \\tan\\theta}',
        steps: [
          {
            tex: '\\frac{\\sec\\theta + \\tan\\theta}{(\\sec\\theta - \\tan\\theta)(\\sec\\theta + \\tan\\theta)}',
            why: 'Multiply the top and the bottom by the conjugate.',
            wrong: [
              '\\frac{\\sec\\theta - \\tan\\theta}{(\\sec\\theta - \\tan\\theta)(\\sec\\theta + \\tan\\theta)}',
              '\\frac{\\sec\\theta + \\tan\\theta}{\\sec\\theta - \\tan\\theta}',
            ],
          },
          {
            tex: '\\frac{\\sec\\theta + \\tan\\theta}{\\sec^2\\theta - \\tan^2\\theta}',
            wrong: ['\\frac{\\sec\\theta + \\tan\\theta}{\\sec^2\\theta + \\tan^2\\theta}'],
          },
          { tex: '\\frac{\\sec\\theta + \\tan\\theta}{1}', why: '$\\sec^2\\theta - \\tan^2\\theta = 1$.' },
          { tex: '\\sec\\theta + \\tan\\theta' },
        ],
        solution: [],
      },
    },
    {
      id: 'fractions',
      title: 'Technique 4: combine fractions',
      blocks: [
        {
          t: 'p',
          text: 'Two fractions with different denominators? Put them over a common denominator, then simplify the top. In Example 6.10, the denominators $1 + \\cos A$ and $1 - \\cos A$ multiply to $\\sin^2 A$:',
        },
        {
          t: 'math',
          tex: '\\frac{\\sin A}{1 + \\cos A} + \\frac{\\sin A}{1 - \\cos A} = \\frac{\\sin A(1 - \\cos A) + \\sin A(1 + \\cos A)}{1 - \\cos^2 A} = \\frac{2\\sin A}{\\sin^2 A} = 2\\cosec A',
        },
      ],
      check: {
        id: 'l3-c-frac',
        type: 'chain',
        prompt: 'Choose each next line.',
        toProve: '\\frac{1}{1 + \\sin\\theta} + \\frac{1}{1 - \\sin\\theta} = 2\\sec^2\\theta',
        start: '\\frac{1}{1 + \\sin\\theta} + \\frac{1}{1 - \\sin\\theta}',
        steps: [
          {
            tex: '\\frac{(1 - \\sin\\theta) + (1 + \\sin\\theta)}{(1 + \\sin\\theta)(1 - \\sin\\theta)}',
            why: 'Common denominator.',
            wrong: [
              '\\frac{2}{(1 + \\sin\\theta) + (1 - \\sin\\theta)}',
              '\\frac{(1 + \\sin\\theta) + (1 - \\sin\\theta)}{(1 + \\sin\\theta) + (1 - \\sin\\theta)}',
            ],
          },
          {
            tex: '\\frac{2}{1 - \\sin^2\\theta}',
            wrong: ['\\frac{2\\sin\\theta}{1 - \\sin^2\\theta}', '\\frac{2}{1 + \\sin^2\\theta}'],
          },
          {
            tex: '\\frac{2}{\\cos^2\\theta}',
            wrong: ['\\frac{2}{\\sin^2\\theta}'],
          },
          { tex: '2\\sec^2\\theta' },
        ],
        solution: [],
      },
    },
    {
      id: 'algebra',
      title: 'Technique 5: algebraic identities',
      blocks: [
        {
          t: 'p',
          text: 'Treat $\\sin A$ and $\\cos A$ like the letters $a$ and $b$, and the identities from algebra apply:',
        },
        {
          t: 'table',
          head: ['Algebra', 'Used in'],
          rows: [
            ['$(a + b)^2 = a^2 + 2ab + b^2$', 'Example 6.8, Exercise 6.1 Q4(ii)'],
            ['$a^2 - b^2 = (a + b)(a - b)$', 'Example 6.3, Exercise 6.1 Q5(i)'],
            ['$a^3 - b^3 = (a - b)(a^2 + ab + b^2)$', 'Example 6.13, Exercise 6.1 Q6(ii)'],
            ['$a^3 + b^3 = (a + b)(a^2 - ab + b^2)$', 'Example 6.13'],
            ['$(a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3$', 'Example 6.17, Exercise 6.1 Q4(i)'],
          ],
        },
        {
          t: 'note',
          tone: 'think',
          text: 'With $a = \\sin\\theta$ and $b = \\cos\\theta$, the term $a^2 + b^2$ is 1. That is what makes these factorisations collapse so neatly.',
        },
      ],
      check: {
        id: 'l3-c-alg',
        type: 'chain',
        prompt: 'Choose each next line.',
        toProve: '\\sin^4\\theta - \\cos^4\\theta = \\sin^2\\theta - \\cos^2\\theta',
        start: '\\sin^4\\theta - \\cos^4\\theta',
        steps: [
          {
            tex: '(\\sin^2\\theta + \\cos^2\\theta)(\\sin^2\\theta - \\cos^2\\theta)',
            why: 'A difference of squares, with $a = \\sin^2\\theta$ and $b = \\cos^2\\theta$.',
            wrong: ['(\\sin^2\\theta - \\cos^2\\theta)^2', '(\\sin\\theta - \\cos\\theta)^4'],
          },
          {
            tex: '1\\cdot(\\sin^2\\theta - \\cos^2\\theta)',
            wrong: ['0\\cdot(\\sin^2\\theta - \\cos^2\\theta)', '2\\cdot(\\sin^2\\theta - \\cos^2\\theta)'],
          },
          { tex: '\\sin^2\\theta - \\cos^2\\theta' },
        ],
        solution: [],
      },
    },
    {
      id: 'given',
      title: 'When the question gives a condition',
      blocks: [
        {
          t: 'p',
          text: 'Questions that begin "If $\\dots$, prove that $\\dots$" are not identities: the result holds only when the condition does. Use the condition to replace part of the expression. Three moves come up again and again:',
        },
        {
          t: 'list',
          items: [
            '**Square it.** From $\\sin\\theta + \\cos\\theta = p$ you get $1 + 2\\sin\\theta\\cos\\theta = p^2$, so $\\sin\\theta\\cos\\theta = \\frac{p^2 - 1}{2}$.',
            '**Use the partner.** From $\\cosec\\theta + \\cot\\theta = P$ you get $\\cosec\\theta - \\cot\\theta = \\frac1P$ (Example 6.11).',
            '**Substitute and simplify.** Replace $m$, $n$, $p$, $q$ by what they stand for, and simplify (Example 6.17).',
          ],
        },
        {
          t: 'note',
          text: 'Squaring is allowed here: you are working from an equation you have been given, not from the result you want.',
        },
      ],
      check: {
        id: 'l3-c-given',
        type: 'numeric',
        prompt: 'If $\\sin\\theta + \\cos\\theta = 1.2$, find $\\sin\\theta\\cos\\theta$.',
        parts: [{ answer: { value: 0.22, display: '0.22' } }],
        hints: ['Square both sides of the condition.'],
        solution: [
          {
            math: '1 + 2\\sin\\theta\\cos\\theta = 1.44 \\;\\Rightarrow\\; \\sin\\theta\\cos\\theta = \\frac{0.44}{2} = 0.22',
          },
        ],
      },
    },
    {
      id: 'test',
      title: 'Test with a number before you prove',
      blocks: [
        {
          t: 'p',
          text: 'Not sure a claim is true? Put in an angle such as $30^\\circ$. If the two sides differ, the claim is false and there is nothing to prove. If they agree, the claim **might** be an identity: a few angles can never prove it for all angles, so you still need the proof.',
        },
        {
          t: 'p',
          text: 'The same trick checks your own working: if a line of your proof gives a different value at $30^\\circ$ from the line before it, you have made a slip in between.',
        },
      ],
      check: {
        id: 'l3-c-test',
        type: 'mcq',
        prompt: 'You test a claimed identity at $\\theta = 30^\\circ$ and both sides come to 2. What can you conclude?',
        options: [
          'It is an identity.',
          'It might be an identity; it still needs a proof.',
          'It is not an identity.',
          'It is true only at $30^\\circ$.',
        ],
        correct: 1,
        solution: [
          {
            text: 'One angle (or several) can show a claim is false, but not that it is true for every angle. For example, $\\sin\\theta = \\cos\\theta$ holds at $45^\\circ$ and nowhere else in $0^\\circ$–$90^\\circ$.',
          },
        ],
      },
    },
  ],

  explore: [
    {
      widget: 'identity-tester',
      title: 'Identity or not?',
      intro:
        'Pick a claim. Both sides are drawn as graphs for $\\theta$ from $0^\\circ$ to $90^\\circ$. For an identity, the two curves lie exactly on top of each other.',
      tryThis: [
        'Compare $(\\sin\\theta + \\cos\\theta)^2 = 1$ with $(\\sin\\theta + \\cos\\theta)^2 = 1 + 2\\sin\\theta\\cos\\theta$. Which term does the first one forget?',
        'Find a claim that is true at exactly one angle. Which angle?',
        'Before you open a claim, guess whether it is an identity. Then check.',
      ],
    },
  ],

  examples,
  practice,

  quiz: [
    {
      id: 'l3-q1',
      type: 'chain',
      prompt: 'Choose each next line.',
      toProve: '\\frac{\\sin\\theta}{\\cosec\\theta} + \\frac{\\cos\\theta}{\\sec\\theta} = 1',
      start: '\\frac{\\sin\\theta}{\\cosec\\theta} + \\frac{\\cos\\theta}{\\sec\\theta}',
      steps: [
        {
          tex: '\\sin^2\\theta + \\cos^2\\theta',
          why: 'Dividing by $\\cosec\\theta$ is multiplying by $\\sin\\theta$.',
          wrong: [
            '\\sin\\theta\\cosec\\theta + \\cos\\theta\\sec\\theta',
            '\\frac{\\sin\\theta}{\\cos\\theta} + \\frac{\\cos\\theta}{\\sin\\theta}',
          ],
        },
        { tex: '1' },
      ],
      solution: [],
    },
    {
      id: 'l3-q2',
      type: 'mcq',
      prompt: 'To prove $\\dfrac{\\sin A}{1 - \\cos A} = \\cosec A + \\cot A$, a good first step is to',
      options: [
        'multiply the numerator and the denominator by $1 + \\cos A$',
        'square both sides',
        'move $\\cot A$ to the left side',
        'replace $\\sin A$ by $1 - \\cos A$',
      ],
      correct: 0,
      solution: [
        {
          math: '\\frac{\\sin A(1 + \\cos A)}{1 - \\cos^2 A} = \\frac{\\sin A(1 + \\cos A)}{\\sin^2 A} = \\frac{1 + \\cos A}{\\sin A} = \\cosec A + \\cot A',
        },
      ],
    },
    {
      id: 'l3-q3',
      type: 'chain',
      prompt: 'Choose each next line.',
      toProve: '(1 + \\cot^2\\theta)(1 - \\cos^2\\theta) = 1',
      start: '(1 + \\cot^2\\theta)(1 - \\cos^2\\theta)',
      steps: [
        {
          tex: '\\cosec^2\\theta\\sin^2\\theta',
          why: 'One identity for each bracket.',
          wrong: ['\\sec^2\\theta\\sin^2\\theta', '\\cosec^2\\theta\\cos^2\\theta'],
        },
        { tex: '1' },
      ],
      solution: [],
    },
    {
      id: 'l3-q4',
      type: 'mcq',
      prompt: 'Simplify $\\cos\\theta\\sqrt{\\sec^2\\theta - 1}$ for an acute angle $\\theta$.',
      options: ['$\\sin\\theta$', '$\\cos\\theta$', '$\\tan\\theta$', '$1$'],
      correct: 0,
      solution: [{ math: '\\cos\\theta\\sqrt{\\tan^2\\theta} = \\cos\\theta\\tan\\theta = \\sin\\theta' }],
    },
    {
      id: 'l3-q5',
      type: 'chain',
      prompt: 'Choose each next line.',
      toProve: '\\frac{\\tan\\theta}{\\sec\\theta - 1} = \\frac{\\sec\\theta + 1}{\\tan\\theta}',
      start: '\\frac{\\tan\\theta}{\\sec\\theta - 1}',
      steps: [
        {
          tex: '\\frac{\\tan\\theta(\\sec\\theta + 1)}{\\sec^2\\theta - 1}',
          why: 'Multiply the top and the bottom by $\\sec\\theta + 1$.',
          wrong: [
            '\\frac{\\tan\\theta(\\sec\\theta + 1)}{\\sec^2\\theta + 1}',
            '\\frac{\\tan\\theta(\\sec\\theta - 1)}{\\sec^2\\theta - 1}',
          ],
        },
        {
          tex: '\\frac{\\tan\\theta(\\sec\\theta + 1)}{\\tan^2\\theta}',
          wrong: ['\\frac{\\tan\\theta(\\sec\\theta + 1)}{\\cot^2\\theta}'],
        },
        { tex: '\\frac{\\sec\\theta + 1}{\\tan\\theta}' },
      ],
      solution: [],
    },
    {
      id: 'l3-q6',
      type: 'mcq',
      prompt: 'Which step is **not** allowed when you prove an identity?',
      options: [
        'Squaring both sides of the identity you are proving',
        'Writing $\\tan\\theta$ as $\\dfrac{\\sin\\theta}{\\cos\\theta}$',
        'Multiplying the numerator and the denominator by the same expression',
        'Replacing $1 - \\sin^2\\theta$ by $\\cos^2\\theta$',
      ],
      correct: 0,
      solution: [
        {
          text: 'Squaring both sides treats the identity as an equation that is already true. It can also turn a false statement into a true one: $-1 \\ne 1$, but $(-1)^2 = 1^2$.',
        },
      ],
    },
    {
      id: 'l3-q7',
      type: 'numeric',
      prompt: 'If $\\sin\\theta + \\cos\\theta = \\sqrt2$, find $\\sin\\theta\\cos\\theta$.',
      parts: [{ answer: { value: 0.5, display: '1/2' } }],
      solution: [{ math: '1 + 2\\sin\\theta\\cos\\theta = 2 \\;\\Rightarrow\\; \\sin\\theta\\cos\\theta = \\frac12' }],
    },
  ],
}
