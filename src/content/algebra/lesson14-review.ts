import type { Lesson } from '../types'
import { matrixTex as M } from '../../lib/matrix'

export const lesson14: Lesson = {
  id: 'review',
  number: 14,
  title: 'Chapter review',
  summary: 'Points to Remember, worked Unit Exercise problems, and the 20 multiple-choice questions of Exercise 3.20.',
  pages: '154–159',
  status: 'ready',

  learn: [
    {
      id: 'linear',
      title: 'Linear equations in three variables',
      blocks: [
        {
          t: 'p',
          text: 'Each equation $ax + by + cz = d$ is a plane in space. Three planes can meet in a single point, along a whole line (or coincide), or have no point in common. So a system of three such equations has:',
        },
        {
          t: 'list',
          items: [
            '**a unique solution**, when the planes meet in one point;',
            '**infinitely many solutions**, when they share a line or a plane;',
            '**no solution** (the system is *inconsistent*), when the three planes have no common point.',
          ],
        },
        {
          t: 'p',
          text: 'To solve by **elimination**: use two pairs of equations to remove the same variable, which leaves two equations in two variables. Solve those, then substitute back for the third.',
        },
      ],
      check: {
        id: 'alg14-c-linear',
        type: 'numeric',
        prompt: 'Solve $x + y + z = 6$, $y + z = 5$, $z = 3$.',
        parts: [
          { label: '$x =$', answer: { value: 1, display: '1' } },
          { label: '$y =$', answer: { value: 2, display: '2' } },
          { label: '$z =$', answer: { value: 3, display: '3' } },
        ],
        hints: ['Start from the last equation and work upwards.'],
        solution: [{ text: '$z = 3$. Then $y = 5 - 3 = 2$. Then $x = 6 - 2 - 3 = 1$.' }],
      },
    },
    {
      id: 'gcd-lcm',
      title: 'GCD and LCM of polynomials',
      blocks: [
        {
          t: 'p',
          text: 'Factorise each polynomial completely. The **GCD** is the product of the factors common to all of them, each with its smallest power. The **LCM** uses every factor that appears, each with its highest power: it is the polynomial of lowest degree that each of them divides exactly.',
        },
        {
          t: 'p',
          text: 'For two polynomials $f(x)$ and $g(x)$:',
        },
        { t: 'math', tex: 'f(x) \\times g(x) = \\text{GCD} \\times \\text{LCM}' },
        {
          t: 'note',
          tone: 'tip',
          text: "When factorising is hard, the **division algorithm** (repeated division, like Euclid's method for numbers) finds the GCD instead.",
        },
      ],
      check: {
        id: 'alg14-c-gcd',
        type: 'mcq',
        prompt: 'What is the GCD of $x^2 - 9$ and $x^2 + x - 6$?',
        options: ['$x + 3$', '$x - 3$', '$x - 2$', '$(x + 3)(x - 3)(x - 2)$'],
        correct: 0,
        solution: [
          { text: '$x^2 - 9 = (x + 3)(x - 3)$ and $x^2 + x - 6 = (x + 3)(x - 2)$. The common factor is $x + 3$.' },
        ],
      },
    },
    {
      id: 'rational',
      title: 'Rational expressions',
      blocks: [
        {
          t: 'p',
          text: 'A **rational expression** is one polynomial divided by another, $\\dfrac{p(x)}{q(x)}$ with $q(x) \\ne 0$. Values of $x$ that make the denominator zero are **excluded values**.',
        },
        {
          t: 'list',
          items: [
            '**Reduce** to lowest form by factorising and cancelling common factors.',
            '**Multiply:** numerator times numerator, denominator times denominator, then reduce.',
            '**Divide:** multiply by the reciprocal of the second expression.',
            '**Add or subtract:** rewrite over a common denominator (the LCM of the denominators).',
          ],
        },
      ],
      check: {
        id: 'alg14-c-rational',
        type: 'mcq',
        prompt: 'What are the excluded values of $\\dfrac{x + 5}{x^2 - 4}$?',
        options: ['$2$ and $-2$', '$-5$', '$4$', '$-5$, $2$ and $-2$'],
        correct: 0,
        solution: [
          {
            text: 'The denominator $x^2 - 4 = (x - 2)(x + 2)$ is zero when $x = 2$ or $x = -2$. The numerator does not matter.',
          },
        ],
      },
    },
    {
      id: 'sqrt',
      title: 'Square root of a polynomial',
      blocks: [
        {
          t: 'p',
          text: 'If a polynomial is a perfect square, $p(x) = [g(x)]^2$, then its square root is $|g(x)|$. The bars are there because a square root is never negative.',
        },
        {
          t: 'list',
          items: [
            '**By factorising:** write the polynomial as a product of squares, as in $4x^2 - 12x + 9 = (2x - 3)^2$.',
            "**By long division:** for bigger polynomials, the textbook's division method builds the root one term at a time (worked out in Unit Exercise Q9 below).",
          ],
        },
      ],
      check: {
        id: 'alg14-c-sqrt',
        type: 'mcq',
        prompt: 'The square root of $4x^2 - 12x + 9$ is',
        options: ['$|2x - 3|$', '$|2x + 3|$', '$|4x - 3|$', '$2x - 9$'],
        correct: 0,
        solution: [
          { text: '$4x^2 - 12x + 9 = (2x)^2 - 2(2x)(3) + 3^2 = (2x - 3)^2$, so the square root is $|2x - 3|$.' },
        ],
      },
    },
    {
      id: 'quadratics',
      title: 'Quadratic equations',
      blocks: [
        {
          t: 'p',
          text: 'A quadratic polynomial $ax^2 + bx + c$ ($a \\ne 0$) has at most two zeroes. The roots of $ax^2 + bx + c = 0$ are',
        },
        { t: 'math', tex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}' },
        {
          t: 'p',
          text: 'If the roots are $\\alpha$ and $\\beta$:',
        },
        {
          t: 'math',
          tex: '\\alpha + \\beta = -\\frac{b}{a} = \\frac{-\\text{coefficient of } x}{\\text{coefficient of } x^2} \\qquad \\alpha\\beta = \\frac{c}{a} = \\frac{\\text{constant term}}{\\text{coefficient of } x^2}',
        },
        { t: 'p', text: 'And a quadratic equation with roots $\\alpha$ and $\\beta$ is' },
        { t: 'math', tex: 'x^2 - (\\alpha + \\beta)x + \\alpha\\beta = 0' },
      ],
      check: {
        id: 'alg14-c-quad',
        type: 'numeric',
        prompt: 'For $2x^2 - 7x + 3 = 0$, find the sum and the product of the roots.',
        parts: [
          { label: 'Sum:', answer: { value: 3.5, display: '7/2' } },
          { label: 'Product:', answer: { value: 1.5, display: '3/2' } },
        ],
        solution: [
          { text: 'Here $a = 2$, $b = -7$, $c = 3$.' },
          {
            math: '\\alpha + \\beta = -\\frac{b}{a} = \\frac{7}{2} \\qquad \\alpha\\beta = \\frac{c}{a} = \\frac{3}{2}',
          },
        ],
      },
    },
    {
      id: 'discriminant',
      title: 'Nature of roots and quadratic graphs',
      blocks: [
        {
          t: 'p',
          text: 'The **discriminant** $\\Delta = b^2 - 4ac$ is the part under the square root. It decides the nature of the roots, and how the graph of $y = ax^2 + bx + c$ meets the $x$-axis:',
        },
        {
          t: 'table',
          head: ['Discriminant', 'Roots', 'Graph meets the $x$-axis'],
          rows: [
            ['$\\Delta > 0$', 'real and unequal', 'at two points'],
            ['$\\Delta = 0$', 'real and equal', 'at one point (it just touches)'],
            ['$\\Delta < 0$', 'no real roots', 'not at all'],
          ],
        },
        {
          t: 'p',
          text: 'To solve a quadratic **graphically**, draw the parabola and read off the $x$-coordinates where it crosses the $x$-axis, or where it meets a straight line drawn on the same axes.',
        },
      ],
      check: {
        id: 'alg14-c-disc',
        type: 'mcq',
        prompt: 'The equation $x^2 + 2x + 5 = 0$ has',
        options: ['no real roots', 'real and equal roots', 'real and unequal roots', 'exactly one root, $x = -5$'],
        correct: 0,
        solution: [
          { math: '\\Delta = 2^2 - 4(1)(5) = 4 - 20 = -16 < 0' },
          { text: 'A negative discriminant means no real roots.' },
        ],
      },
    },
    {
      id: 'matrices',
      title: 'Matrices in one card',
      blocks: [
        {
          t: 'list',
          items: [
            'An $m \\times n$ matrix has $m$ rows and $n$ columns (rows first), and $mn$ elements. $a_{ij}$ sits in row $i$, column $j$.',
            '**Types:** row ($1 \\times n$), column ($m \\times 1$), square ($n \\times n$), diagonal, scalar, identity $I$, zero $O$, upper and lower triangular.',
            '**Transpose** $A^T$ swaps rows and columns: an $m \\times n$ matrix becomes $n \\times m$, and $(A^T)^T = A$.',
            '**Equal** matrices have the same order and equal elements in every position.',
            '**Add and subtract** only matrices of the same order, element by element. **Scalar** multiplication multiplies every element.',
            '**Multiply** $AB$ only when columns of $A$ = rows of $B$; $(m \\times n)(n \\times p)$ gives $m \\times p$. In general $AB \\ne BA$, and $(AB)^T = B^T A^T$.',
          ],
        },
      ],
      check: {
        id: 'alg14-c-matrices',
        type: 'mcq',
        prompt: 'If $A$ is $3 \\times 2$, which product is defined?',
        options: ['$A^T A$', '$AA$', '$A I_3$', '$A^T I_3$ and $A A$'],
        correct: 0,
        solution: [
          {
            text: '$A^T$ is $2 \\times 3$ and $A$ is $3 \\times 2$, so $A^T A$ is $(2 \\times 3)(3 \\times 2) = 2 \\times 2$.',
          },
          {
            text: '$AA$ would be $(3 \\times 2)(3 \\times 2)$ and $AI_3$ would be $(3 \\times 2)(3 \\times 3)$: neither has matching middle numbers.',
          },
        ],
      },
    },
  ],

  explore: [
    {
      widget: 'matrix-multiply',
      title: 'Row times column',
      intro: 'A last check that the multiplication rule is second nature. Fill each product, then swap the order.',
      tryThis: ['Predict each element before you press Next.', 'Find a preset where $AB$ exists but $BA$ does not.'],
    },
    {
      widget: 'matrix-types',
      title: 'Matrix type detector',
      intro: 'Exercise 3.20 asks about rectangular matrices and transposes. Test your answers here.',
      tryThis: [
        'Make a column matrix. What type is its transpose? (Exercise 3.20 Q17)',
        'Make a $3 \\times 4$ matrix. What is the order of its transpose? (Exercise 3.20 Q14)',
      ],
    },
  ],

  examples: [
    {
      id: 'alg14-ux1',
      source: 'Unit Exercise 3 · Q1',
      title: 'Four expressions, all equal',
      prompt: 'Solve $\\tfrac13(x + y - 5) = y - z = 2x - 11 = 9 - (x + 2z)$.',
      steps: [
        { text: 'Turn the chain into three equations by taking neighbouring pairs.' },
        {
          math: '\\tfrac13(x + y - 5) = y - z \\;\\Rightarrow\\; x + y - 5 = 3y - 3z \\;\\Rightarrow\\; x - 2y + 3z = 5 \\quad (1)',
        },
        { math: 'y - z = 2x - 11 \\;\\Rightarrow\\; 2x - y + z = 11 \\quad (2)' },
        { math: '2x - 11 = 9 - x - 2z \\;\\Rightarrow\\; 3x + 2z = 20 \\quad (3)' },
        { text: 'From (2), $y = 2x + z - 11$. Put this into (1):' },
        { math: 'x - 2(2x + z - 11) + 3z = 5 \\;\\Rightarrow\\; -3x + z = -17 \\;\\Rightarrow\\; z = 3x - 17' },
        { text: 'Put $z = 3x - 17$ into (3): $3x + 6x - 34 = 20$, so $9x = 54$ and $x = 6$.' },
        { text: 'Then $z = 18 - 17 = 1$ and $y = 12 + 1 - 11 = 2$. Check: every expression equals 1. ✓' },
      ],
      answer: '$x = 6,\\ y = 2,\\ z = 1$',
    },
    {
      id: 'alg14-ux3',
      source: 'Unit Exercise 3 · Q3',
      title: 'The three-digit number',
      prompt:
        'In a three-digit number, when the tens and hundreds digits are interchanged, the new number is 54 more than three times the original number. If 198 is added to the number, the digits are reversed. The tens digit exceeds the hundreds digit by twice as much as the tens digit exceeds the units digit. Find the original number.',
      steps: [
        { text: 'Let the hundreds, tens and units digits be $h$, $t$, $u$. The number is $100h + 10t + u$.' },
        { text: 'Adding 198 reverses the digits:' },
        {
          math: '100h + 10t + u + 198 = 100u + 10t + h \\;\\Rightarrow\\; 99(u - h) = 198 \\;\\Rightarrow\\; u = h + 2',
        },
        { text: 'Tens exceeds hundreds by twice what tens exceeds units:' },
        { math: 't - h = 2(t - u) \\;\\Rightarrow\\; t = 2u - h = h + 4' },
        { text: 'Swapping the tens and hundreds digits:' },
        { math: '100t + 10h + u = 3(100h + 10t + u) + 54 \\;\\Rightarrow\\; 70t - 290h - 2u = 54' },
        { text: 'Substitute $t = h + 4$ and $u = h + 2$:' },
        { math: '70(h + 4) - 290h - 2(h + 2) = 54 \\;\\Rightarrow\\; -222h + 276 = 54 \\;\\Rightarrow\\; h = 1' },
        { text: 'So $t = 5$ and $u = 3$. Check: $513 = 3 \\times 153 + 54$ ✓ and $153 + 198 = 351$ ✓.' },
      ],
      answer: 'The number is 153.',
    },
    {
      id: 'alg14-ux9',
      source: 'Unit Exercise 3 · Q9',
      title: 'Square root by the division method',
      prompt: 'Find the square root of $289x^4 - 612x^3 + 970x^2 - 684x + 361$.',
      steps: [
        {
          text: 'The polynomial is already in descending powers of $x$. The first term of the root is $\\sqrt{289x^4} = 17x^2$.',
        },
        { text: 'Subtract $(17x^2)^2 = 289x^4$. What is left starts with $-612x^3 + 970x^2$.' },
        {
          text: 'Double the root so far: $34x^2$. Divide: $-612x^3 \\div 34x^2 = -18x$. That is the next term of the root.',
        },
        {
          math: '(34x^2 - 18x)(-18x) = -612x^3 + 324x^2 \\;\\Rightarrow\\; \\text{remainder } 646x^2 - 684x + 361',
        },
        {
          text: 'Double the root so far: $2(17x^2 - 18x) = 34x^2 - 36x$. Divide: $646x^2 \\div 34x^2 = 19$, the next term.',
        },
        { math: '(34x^2 - 36x + 19)(19) = 646x^2 - 684x + 361 \\;\\Rightarrow\\; \\text{remainder } 0' },
        {
          text: 'The remainder is zero, so the polynomial is a perfect square. Check: $(17x^2 - 18x + 19)^2$ expands back to it.',
        },
      ],
      answer: '$\\sqrt{289x^4 - 612x^3 + 970x^2 - 684x + 361} = |17x^2 - 18x + 19|$',
    },
    {
      id: 'alg14-ux11',
      source: 'Unit Exercise 3 · Q11',
      title: 'The boat and the current',
      prompt:
        'A boat takes 1.6 hours longer to go 36 km up a river than down the river. If the speed of the water current is 4 km per hour, what is the speed of the boat in still water?',
      steps: [
        { text: 'Let the speed in still water be $x$ km/hr. Upstream speed is $x - 4$, downstream is $x + 4$.' },
        { math: '\\frac{36}{x - 4} - \\frac{36}{x + 4} = 1.6' },
        { math: '\\frac{36(x + 4) - 36(x - 4)}{x^2 - 16} = 1.6 \\;\\Rightarrow\\; \\frac{288}{x^2 - 16} = 1.6' },
        {
          math: 'x^2 - 16 = 180 \\;\\Rightarrow\\; x^2 = 196 \\;\\Rightarrow\\; x = 14 \\ (\\text{a speed is positive})',
        },
        {
          text: 'Check: upstream takes $36 \\div 10 = 3.6$ h, downstream $36 \\div 18 = 2$ h. The difference is 1.6 h. ✓',
        },
      ],
      answer: '14 km/hr',
    },
    {
      id: 'alg14-ux16',
      source: 'Unit Exercise 3 · Q16',
      title: 'A root, then equal roots',
      prompt:
        'If $-4$ is a root of $x^2 + px - 4 = 0$, and the equation $x^2 + px + q = 0$ has equal roots, find $p$ and $q$.',
      steps: [
        { text: 'A root satisfies the equation. Put $x = -4$:' },
        { math: '16 - 4p - 4 = 0 \\;\\Rightarrow\\; p = 3' },
        { text: 'Now $x^2 + 3x + q = 0$ has equal roots, so its discriminant is zero:' },
        { math: '3^2 - 4(1)(q) = 0 \\;\\Rightarrow\\; q = \\frac94' },
      ],
      answer: '$p = 3,\\ q = \\tfrac94$',
    },
    {
      id: 'alg14-ux20',
      source: 'Unit Exercise 3 · Q20',
      title: 'Finding the matrix D',
      prompt: `$A = ${M([
        [3, 0],
        [4, 5],
      ])}$, $B = ${M([
        [6, 3],
        [8, 5],
      ])}$, $C = ${M([
        [3, 6],
        [1, 1],
      ])}$. Find the matrix $D$ such that $CD - AB = O$.`,
      steps: [
        { text: 'The condition means $CD = AB$. First work out $AB$.' },
        {
          math: `AB = ${M([
            ['18+0', '9+0'],
            ['24+40', '12+25'],
          ])} = ${M([
            [18, 9],
            [64, 37],
          ])}`,
        },
        {
          text: 'For $CD$ to be $2 \\times 2$, $D$ must be $2 \\times 2$. Let $D = \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$.',
        },
        {
          math: `CD = ${M([
            ['3a+6c', '3b+6d'],
            ['a+c', 'b+d'],
          ])} = ${M([
            [18, 9],
            [64, 37],
          ])}`,
        },
        { text: 'Column 1: $3a + 6c = 18$ (so $a + 2c = 6$) and $a + c = 64$. Subtracting: $c = -58$, so $a = 122$.' },
        { text: 'Column 2: $3b + 6d = 9$ (so $b + 2d = 3$) and $b + d = 37$. Subtracting: $d = -34$, so $b = 71$.' },
      ],
      answer: `$D = ${M([
        [122, 71],
        [-58, -34],
      ])}$`,
    },
  ],

  practice: [
    {
      id: 'alg14-p2',
      source: 'Unit Exercise 3 · Q2',
      type: 'numeric',
      prompt:
        'One hundred and fifty students are admitted to a school and distributed over three sections $A$, $B$ and $C$. If 6 students are shifted from section $A$ to section $C$, sections $A$ and $C$ will have equal numbers. If 4 times the number of students of section $C$ exceeds the number in section $A$ by the number in section $B$, find the number of students in the three sections.',
      parts: [
        { label: 'Section $A$:', answer: { value: 42, display: '42' } },
        { label: 'Section $B$:', answer: { value: 78, display: '78' } },
        { label: 'Section $C$:', answer: { value: 30, display: '30' } },
      ],
      hints: [
        'Write three equations: $x + y + z = 150$, $x - 6 = z + 6$, and $4z - x = y$.',
        'Add the first and third equations to remove $y$.',
      ],
      solution: [
        { text: 'Let the sections have $x$, $y$, $z$ students.' },
        { math: 'x + y + z = 150 \\;(1) \\qquad x - z = 12 \\;(2) \\qquad 4z - x = y \\;(3)' },
        { text: 'Put (3) into (1): $x + 4z - x + z = 150$, so $5z = 150$ and $z = 30$.' },
        { text: 'From (2), $x = 42$. From (3), $y = 120 - 42 = 78$.' },
      ],
    },
    {
      id: 'alg14-p8',
      source: 'Unit Exercise 3 · Q8',
      type: 'numeric',
      prompt:
        'Arul, Madan and Ram working together can clean a store in 6 hours. Working alone, Madan takes twice as long as Arul, and Ram takes three times as long as Arul. How long would each take working alone?',
      parts: [
        { label: 'Arul:', answer: { value: 11, unit: 'hours', display: '11 hours' } },
        { label: 'Madan:', answer: { value: 22, unit: 'hours', display: '22 hours' } },
        { label: 'Ram:', answer: { value: 33, unit: 'hours', display: '33 hours' } },
      ],
      hints: [
        'If Arul takes $x$ hours, he does $\\tfrac1x$ of the store each hour. Together they do $\\tfrac16$ each hour.',
      ],
      solution: [
        { text: 'Let Arul take $x$ hours. Madan takes $2x$, Ram $3x$.' },
        {
          math: '\\frac1x + \\frac{1}{2x} + \\frac{1}{3x} = \\frac16 \\;\\Rightarrow\\; \\frac{6 + 3 + 2}{6x} = \\frac16 \\;\\Rightarrow\\; x = 11',
        },
        { text: 'Arul 11 hours, Madan 22 hours, Ram 33 hours.' },
      ],
    },
    {
      id: 'alg14-p10',
      source: 'Unit Exercise 3 · Q10',
      type: 'numeric',
      prompt: 'Solve $\\sqrt{y + 1} + \\sqrt{2y - 5} = 3$.',
      parts: [{ label: '$y =$', answer: { value: 3, display: '3' } }],
      hints: [
        'Square both sides, keep the remaining root alone on one side, and square again.',
        'Check every answer in the original equation: squaring can add a false one.',
      ],
      solution: [
        { math: 'y + 1 + 2y - 5 + 2\\sqrt{(y+1)(2y-5)} = 9 \\;\\Rightarrow\\; 2\\sqrt{(y+1)(2y-5)} = 13 - 3y' },
        {
          math: '4(2y^2 - 3y - 5) = 169 - 78y + 9y^2 \\;\\Rightarrow\\; y^2 - 66y + 189 = 0 \\;\\Rightarrow\\; (y - 3)(y - 63) = 0',
        },
        { text: 'Check $y = 3$: $\\sqrt4 + \\sqrt1 = 3$ ✓. Check $y = 63$: $\\sqrt{64} + \\sqrt{121} = 19$ ✗.' },
        { text: 'So $y = 3$ is the only solution.' },
      ],
    },
    {
      id: 'alg14-p12',
      source: 'Unit Exercise 3 · Q12',
      type: 'numeric',
      prompt:
        'Is it possible to design a rectangular park of perimeter 320 m and area 4800 m²? If so, find its length and breadth.',
      parts: [
        { label: 'Length:', answer: { value: 120, unit: 'm', display: '120 m' } },
        { label: 'Breadth:', answer: { value: 40, unit: 'm', display: '40 m' } },
      ],
      hints: ['Length + breadth = 160. If the length is $l$, then $l(160 - l) = 4800$.'],
      solution: [
        { math: 'l(160 - l) = 4800 \\;\\Rightarrow\\; l^2 - 160l + 4800 = 0 \\;\\Rightarrow\\; (l - 120)(l - 40) = 0' },
        { text: 'Yes, it is possible: the park is 120 m long and 40 m wide.' },
      ],
    },
    {
      id: 'alg14-p13',
      source: 'Unit Exercise 3 · Q13',
      type: 'numeric',
      prompt:
        'At $t$ minutes past 2 pm, the time needed to reach 3 pm is 3 minutes less than $\\dfrac{t^2}{4}$. Find $t$.',
      parts: [{ label: '$t =$', answer: { value: 14, unit: 'minutes', display: '14 minutes' } }],
      hints: ['The time left until 3 pm is $60 - t$ minutes.'],
      solution: [
        {
          math: '60 - t = \\frac{t^2}{4} - 3 \\;\\Rightarrow\\; t^2 + 4t - 252 = 0 \\;\\Rightarrow\\; (t + 18)(t - 14) = 0',
        },
        { text: 'Time cannot be negative, so $t = 14$ minutes.' },
      ],
    },
    {
      id: 'alg14-p14',
      source: 'Unit Exercise 3 · Q14',
      type: 'numeric',
      prompt:
        'The number of seats in a row equals the number of rows in a hall. The total number of seats increases by 375 if the number of rows is doubled and the number of seats in each row is reduced by 5. Find the number of rows at the beginning.',
      parts: [{ label: 'Rows:', answer: { value: 25, display: '25' } }],
      hints: ['With $x$ rows of $x$ seats there are $x^2$ seats. After the change: $2x$ rows of $x - 5$ seats.'],
      solution: [
        {
          math: '2x(x - 5) = x^2 + 375 \\;\\Rightarrow\\; x^2 - 10x - 375 = 0 \\;\\Rightarrow\\; (x - 25)(x + 15) = 0',
        },
        { text: 'The number of rows is positive, so $x = 25$.' },
      ],
    },
    {
      id: 'alg14-p15a',
      source: 'Unit Exercise 3 · Q15 (i)',
      type: 'numeric',
      prompt:
        '$\\alpha$ and $\\beta$ are the roots of $x^2 - 2x + 3$. Find the polynomial whose roots are $\\alpha + 2$ and $\\beta + 2$, in the form $x^2 + bx + c$.',
      parts: [
        { label: '$b =$', answer: { value: -6, display: '-6' } },
        { label: '$c =$', answer: { value: 11, display: '11' } },
      ],
      hints: ['$\\alpha + \\beta = 2$ and $\\alpha\\beta = 3$. Find the sum and product of the new roots.'],
      solution: [
        { text: 'Sum of new roots: $\\alpha + \\beta + 4 = 6$.' },
        { text: 'Product: $(\\alpha + 2)(\\beta + 2) = \\alpha\\beta + 2(\\alpha + \\beta) + 4 = 3 + 4 + 4 = 11$.' },
        { text: 'So the polynomial is $x^2 - 6x + 11$.' },
      ],
    },
    {
      id: 'alg14-p15b',
      source: 'Unit Exercise 3 · Q15 (ii)',
      type: 'numeric',
      prompt:
        '$\\alpha$ and $\\beta$ are the roots of $x^2 - 2x + 3$. Find the equation whose roots are $\\dfrac{\\alpha - 1}{\\alpha + 1}$ and $\\dfrac{\\beta - 1}{\\beta + 1}$, in the form $3x^2 + bx + c = 0$.',
      parts: [
        { label: '$b =$', answer: { value: -2, display: '-2' } },
        { label: '$c =$', answer: { value: 1, display: '1' } },
      ],
      hints: [
        'Put both roots over the common denominator $(\\alpha + 1)(\\beta + 1) = \\alpha\\beta + \\alpha + \\beta + 1 = 6$.',
      ],
      solution: [
        {
          math: '\\text{Sum} = \\frac{(\\alpha - 1)(\\beta + 1) + (\\beta - 1)(\\alpha + 1)}{(\\alpha + 1)(\\beta + 1)} = \\frac{2\\alpha\\beta - 2}{6} = \\frac{4}{6} = \\frac23',
        },
        { math: '\\text{Product} = \\frac{\\alpha\\beta - (\\alpha + \\beta) + 1}{6} = \\frac{2}{6} = \\frac13' },
        { text: 'The equation is $x^2 - \\tfrac23 x + \\tfrac13 = 0$, that is $3x^2 - 2x + 1 = 0$.' },
      ],
    },
    {
      id: 'alg14-p17',
      source: 'Unit Exercise 3 · Q17',
      type: 'matrix',
      prompt: `Thilagan and Kausigan sell rice, wheat and ragi. Their April sales (in ₹) are $A = ${M([
        [500, 1000, 1500],
        [2500, 1500, 500],
      ])}$ (one row per farmer). The May sales are exactly twice the April sales. (i) Find the average of the April and May sales. (ii) If sales keep doubling each month, find the sales in August.`,
      parts: [
        {
          label: '(i) Average of April and May:',
          answer: {
            cells: [
              [750, 1500, 2250],
              [3750, 2250, 750],
            ],
          },
        },
        {
          label: '(ii) August:',
          answer: {
            cells: [
              [8000, 16000, 24000],
              [40000, 24000, 8000],
            ],
          },
        },
      ],
      hints: [
        'May is $2A$, so the average is $\\tfrac12(A + 2A) = \\tfrac32 A$.',
        'June is $4A$, July $8A$, August $16A$.',
      ],
      solution: [
        { text: '(i) Average $= \\tfrac12(A + 2A) = \\tfrac32 A$: multiply every entry by 1.5.' },
        { text: '(ii) Doubling each month: May $2A$, June $4A$, July $8A$, August $16A$.' },
      ],
    },
    {
      id: 'alg14-p18',
      source: 'Unit Exercise 3 · Q18',
      type: 'mcq',
      prompt: `If $\\cos\\theta ${M([
        ['\\cos\\theta', '\\sin\\theta'],
        ['-\\sin\\theta', '\\cos\\theta'],
      ])} + \\sin\\theta ${M([
        ['x', '-\\cos\\theta'],
        ['\\cos\\theta', 'x'],
      ])} = I_2$, find $x$.`,
      options: ['$\\sin\\theta$', '$\\cos\\theta$', '$1$', '$\\tan\\theta$'],
      correct: 0,
      hints: ['Look only at the top left element: $\\cos^2\\theta + x\\sin\\theta = 1$.'],
      solution: [
        { text: 'Top left: $\\cos^2\\theta + x\\sin\\theta = 1$.' },
        { text: 'So $x\\sin\\theta = 1 - \\cos^2\\theta = \\sin^2\\theta$, and $x = \\sin\\theta$.' },
        {
          text: 'The off-diagonal elements are $\\cos\\theta\\sin\\theta - \\sin\\theta\\cos\\theta = 0$, as they should be.',
        },
      ],
    },
    {
      id: 'alg14-p19',
      source: 'Unit Exercise 3 · Q19',
      type: 'numeric',
      prompt: `Given $A = ${M([
        ['p', 0],
        [0, 2],
      ])}$, $B = ${M([
        [0, '-q'],
        [1, 0],
      ])}$, $C = ${M([
        [2, -2],
        [2, 2],
      ])}$, and $BA = C^2$, find $p$ and $q$.`,
      parts: [
        { label: '$p =$', answer: { value: 8, display: '8' } },
        { label: '$q =$', answer: { value: 4, display: '4' } },
      ],
      hints: ['Work out both sides as $2 \\times 2$ matrices, then compare elements.'],
      solution: [
        {
          math: `BA = ${M([
            [0, '-2q'],
            ['p', 0],
          ])},\\quad C^2 = ${M([
            ['4-4', '-4-4'],
            ['4+4', '-4+4'],
          ])} = ${M([
            [0, -8],
            [8, 0],
          ])}`,
        },
        { text: 'Comparing: $-2q = -8$ and $p = 8$. So $p = 8$, $q = 4$.' },
      ],
    },
  ],

  quiz: [
    {
      id: 'alg14-q1',
      source: 'Exercise 3.20 · Q1',
      type: 'mcq',
      prompt: 'A system of three linear equations in three variables is inconsistent if their planes',
      options: ['intersect only at a point', 'intersect in a line', 'coincide with each other', 'do not intersect'],
      correct: 3,
      solution: [{ text: 'Inconsistent means no solution: there is no point common to all three planes.' }],
    },
    {
      id: 'alg14-q2',
      source: 'Exercise 3.20 · Q2',
      type: 'mcq',
      prompt: 'The solution of the system $x + y - 3z = -6$, $-7y + 7z = 7$, $3z = 9$ is',
      options: ['$x = 1, y = 2, z = 3$', '$x = -1, y = 2, z = 3$', '$x = -1, y = -2, z = 3$', '$x = 1, y = -2, z = 3$'],
      correct: 0,
      solution: [{ text: '$z = 3$. Then $-7y + 21 = 7$, so $y = 2$. Then $x + 2 - 9 = -6$, so $x = 1$.' }],
    },
    {
      id: 'alg14-q3',
      source: 'Exercise 3.20 · Q3',
      type: 'mcq',
      prompt: 'If $(x - 6)$ is the HCF of $x^2 - 2x - 24$ and $x^2 - kx - 6$, then the value of $k$ is',
      options: ['3', '5', '6', '8'],
      correct: 1,
      solution: [
        { text: '$x - 6$ is a factor of $x^2 - kx - 6$, so $x = 6$ makes it zero.' },
        { math: '36 - 6k - 6 = 0 \\;\\Rightarrow\\; k = 5' },
      ],
    },
    {
      id: 'alg14-q4',
      source: 'Exercise 3.20 · Q4',
      type: 'mcq',
      prompt: '$\\dfrac{3y - 3}{y} \\div \\dfrac{7y - 7}{3y^2}$ is',
      options: [
        '$\\dfrac{9y}{7}$',
        '$\\dfrac{9y^3}{21y - 21}$',
        '$\\dfrac{21y^2 - 42y + 21}{3y^3}$',
        '$\\dfrac{7(y^2 - 2y + 1)}{y^2}$',
      ],
      correct: 0,
      solution: [{ math: '\\frac{3(y - 1)}{y} \\times \\frac{3y^2}{7(y - 1)} = \\frac{9y^2}{7y} = \\frac{9y}{7}' }],
    },
    {
      id: 'alg14-q5',
      source: 'Exercise 3.20 · Q5',
      type: 'mcq',
      prompt: '$y^2 + \\dfrac{1}{y^2}$ is **not** equal to',
      options: [
        '$\\dfrac{y^4 + 1}{y^2}$',
        '$\\left(y + \\dfrac1y\\right)^2$',
        '$\\left(y - \\dfrac1y\\right)^2 + 2$',
        '$\\left(y + \\dfrac1y\\right)^2 - 2$',
      ],
      correct: 1,
      solution: [
        { math: '\\left(y + \\tfrac1y\\right)^2 = y^2 + 2 + \\tfrac{1}{y^2}' },
        {
          text: 'That is 2 more than $y^2 + \\tfrac{1}{y^2}$. The other three all simplify to $y^2 + \\tfrac{1}{y^2}$.',
        },
      ],
    },
    {
      id: 'alg14-q6',
      source: 'Exercise 3.20 · Q6',
      type: 'mcq',
      prompt: '$\\dfrac{x}{x^2 - 25} - \\dfrac{8}{x^2 + 6x + 5}$ gives',
      options: [
        '$\\dfrac{x^2 - 7x + 40}{(x - 5)(x + 5)}$',
        '$\\dfrac{x^2 + 7x + 40}{(x - 5)(x + 5)(x + 1)}$',
        '$\\dfrac{x^2 - 7x + 40}{(x^2 - 25)(x + 1)}$',
        '$\\dfrac{x^2 + 10}{(x^2 - 25)(x + 1)}$',
      ],
      correct: 2,
      solution: [
        {
          text: '$x^2 - 25 = (x - 5)(x + 5)$ and $x^2 + 6x + 5 = (x + 5)(x + 1)$. The common denominator is $(x - 5)(x + 5)(x + 1)$.',
        },
        { math: '\\frac{x(x + 1) - 8(x - 5)}{(x^2 - 25)(x + 1)} = \\frac{x^2 - 7x + 40}{(x^2 - 25)(x + 1)}' },
      ],
    },
    {
      id: 'alg14-q7',
      source: 'Exercise 3.20 · Q7',
      type: 'mcq',
      prompt: 'The square root of $\\dfrac{256x^8y^4z^{10}}{25x^6y^6z^6}$ is equal to',
      options: [
        '$\\dfrac{16}{5}\\left|\\dfrac{x^2z^4}{y^2}\\right|$',
        '$16\\left|\\dfrac{y^2}{x^2z^4}\\right|$',
        '$\\dfrac{16}{5}\\left|\\dfrac{y}{xz^2}\\right|$',
        '$\\dfrac{16}{5}\\left|\\dfrac{xz^2}{y}\\right|$',
      ],
      correct: 3,
      solution: [
        { text: 'Simplify first: $\\dfrac{256x^2z^4}{25y^2}$.' },
        { math: '\\sqrt{\\frac{256x^2z^4}{25y^2}} = \\frac{16}{5}\\left|\\frac{xz^2}{y}\\right|' },
      ],
    },
    {
      id: 'alg14-q8',
      source: 'Exercise 3.20 · Q8',
      type: 'mcq',
      prompt: 'Which of the following should be added to make $x^4 + 64$ a perfect square?',
      options: ['$4x^2$', '$16x^2$', '$8x^2$', '$-8x^2$'],
      correct: 1,
      solution: [{ math: '(x^2 + 8)^2 = x^4 + 16x^2 + 64' }, { text: 'So $16x^2$ is the missing middle term.' }],
    },
    {
      id: 'alg14-q9',
      source: 'Exercise 3.20 · Q9',
      type: 'mcq',
      prompt: 'The solution of $(2x - 1)^2 = 9$ is equal to',
      options: ['$-1$', '$2$', '$-1, 2$', 'None of these'],
      correct: 2,
      solution: [{ text: '$2x - 1 = 3$ or $2x - 1 = -3$, so $x = 2$ or $x = -1$. Both are solutions.' }],
    },
    {
      id: 'alg14-q10',
      source: 'Exercise 3.20 · Q10',
      type: 'mcq',
      prompt: 'The values of $a$ and $b$ if $4x^4 - 24x^3 + 76x^2 + ax + b$ is a perfect square are',
      options: ['100, 120', '10, 12', '−120, 100', '12, 10'],
      correct: 2,
      solution: [
        { text: 'The square root must start $2x^2 - 6x + c$. Expand:' },
        { math: '(2x^2 - 6x + c)^2 = 4x^4 - 24x^3 + (36 + 4c)x^2 - 12cx + c^2' },
        { text: '$36 + 4c = 76$ gives $c = 10$. Then $a = -12c = -120$ and $b = c^2 = 100$.' },
      ],
    },
    {
      id: 'alg14-q11',
      source: 'Exercise 3.20 · Q11',
      type: 'mcq',
      prompt:
        'If the roots of $q^2x^2 + p^2x + r^2 = 0$ are the squares of the roots of $qx^2 + px + r = 0$, then $q$, $p$, $r$ are in',
      options: ['A.P.', 'G.P.', 'both A.P. and G.P.', 'none of these'],
      correct: 1,
      solution: [
        {
          text: 'Let the roots of $qx^2 + px + r = 0$ be $\\alpha, \\beta$: $\\alpha + \\beta = -\\tfrac{p}{q}$, $\\alpha\\beta = \\tfrac{r}{q}$.',
        },
        { text: 'The other equation has roots $\\alpha^2, \\beta^2$, so their sum is $-\\tfrac{p^2}{q^2}$.' },
        {
          math: '\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 - 2\\alpha\\beta = \\frac{p^2}{q^2} - \\frac{2r}{q} = -\\frac{p^2}{q^2}',
        },
        { text: 'So $\\tfrac{2p^2}{q^2} = \\tfrac{2r}{q}$, which gives $p^2 = qr$: $q, p, r$ are in G.P.' },
      ],
    },
    {
      id: 'alg14-q12',
      source: 'Exercise 3.20 · Q12',
      type: 'mcq',
      prompt: 'Graph of a linear equation is a',
      options: ['straight line', 'circle', 'parabola', 'hyperbola'],
      correct: 0,
      solution: [{ text: 'A linear (first-degree) equation in $x$ and $y$ always graphs as a straight line.' }],
    },
    {
      id: 'alg14-q13',
      source: 'Exercise 3.20 · Q13',
      type: 'mcq',
      prompt: 'The number of points of intersection of the quadratic polynomial $x^2 + 4x + 4$ with the $X$ axis is',
      options: ['0', '1', '0 or 1', '2'],
      correct: 1,
      solution: [
        {
          text: '$\\Delta = 16 - 16 = 0$: real and equal roots. $x^2 + 4x + 4 = (x + 2)^2$ just touches the axis at $x = -2$.',
        },
      ],
    },
    {
      id: 'alg14-q14',
      source: 'Exercise 3.20 · Q14',
      type: 'mcq',
      prompt: `For the matrix $A = ${M([
        [1, 3, 5, 7],
        [2, 4, 6, 8],
        [9, 11, 13, 15],
      ])}$, the order of $A^T$ is`,
      options: ['$2 \\times 3$', '$3 \\times 2$', '$3 \\times 4$', '$4 \\times 3$'],
      correct: 3,
      solution: [{ text: '$A$ is $3 \\times 4$. Transposing swaps rows and columns: $4 \\times 3$.' }],
    },
    {
      id: 'alg14-q15',
      source: 'Exercise 3.20 · Q15',
      type: 'mcq',
      prompt: 'If $A$ is a $2 \\times 3$ matrix and $B$ is a $3 \\times 4$ matrix, how many columns does $AB$ have?',
      options: ['3', '4', '2', '5'],
      correct: 1,
      solution: [{ text: '$(2 \\times 3)(3 \\times 4)$ gives $2 \\times 4$: 4 columns.' }],
    },
    {
      id: 'alg14-q16',
      source: 'Exercise 3.20 · Q16',
      type: 'mcq',
      prompt: 'If the numbers of columns and rows are not equal in a matrix, then it is said to be a',
      options: ['diagonal matrix', 'rectangular matrix', 'square matrix', 'identity matrix'],
      correct: 1,
      solution: [
        { text: 'Diagonal, square and identity matrices are all square. A non-square matrix is called rectangular.' },
      ],
    },
    {
      id: 'alg14-q17',
      source: 'Exercise 3.20 · Q17',
      type: 'mcq',
      prompt: 'The transpose of a column matrix is',
      options: ['unit matrix', 'diagonal matrix', 'column matrix', 'row matrix'],
      correct: 3,
      solution: [{ text: 'An $m \\times 1$ matrix transposes to $1 \\times m$: one row.' }],
    },
    {
      id: 'alg14-q18',
      source: 'Exercise 3.20 · Q18',
      type: 'mcq',
      prompt: `Find the matrix $X$ if $2X + ${M([
        [1, 3],
        [5, 7],
      ])} = ${M([
        [5, 7],
        [9, 5],
      ])}$.`,
      options: [
        `$${M([
          [-2, -2],
          [2, -1],
        ])}$`,
        `$${M([
          [2, 2],
          [2, -1],
        ])}$`,
        `$${M([
          [1, 2],
          [2, 2],
        ])}$`,
        `$${M([
          [2, 1],
          [2, 2],
        ])}$`,
      ],
      correct: 1,
      solution: [
        {
          math: `2X = ${M([
            ['5-1', '7-3'],
            ['9-5', '5-7'],
          ])} = ${M([
            [4, 4],
            [4, -2],
          ])} \\;\\Rightarrow\\; X = ${M([
            [2, 2],
            [2, -1],
          ])}`,
        },
      ],
    },
    {
      id: 'alg14-q19',
      source: 'Exercise 3.20 · Q19',
      type: 'mcq',
      prompt: `Which of the following can be calculated from $A = ${M([
        [1, 2],
        [3, 4],
        [5, 6],
      ])}$ and $B = ${M([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ])}$? (i) $A^2$ (ii) $B^2$ (iii) $AB$ (iv) $BA$`,
      options: ['(i) and (ii) only', '(ii) and (iii) only', '(ii) and (iv) only', 'all of these'],
      correct: 2,
      solution: [
        { text: '$A$ is $3 \\times 2$, $B$ is $3 \\times 3$.' },
        {
          text: '$A^2$: $(3 \\times 2)(3 \\times 2)$ ✗. $B^2$: $(3 \\times 3)(3 \\times 3)$ ✓. $AB$: $(3 \\times 2)(3 \\times 3)$ ✗. $BA$: $(3 \\times 3)(3 \\times 2)$ ✓.',
        },
      ],
    },
    {
      id: 'alg14-q20',
      source: 'Exercise 3.20 · Q20',
      type: 'mcq',
      prompt: `If $A = ${M([
        [1, 2, 3],
        [3, 2, 1],
      ])}$, $B = ${M([
        [1, 0],
        [2, -1],
        [0, 2],
      ])}$ and $C = ${M([
        [0, 1],
        [-2, 5],
      ])}$, which statements are correct? (i) $AB + C = ${M([
        [5, 5],
        [5, 5],
      ])}$ (ii) $BC = ${M([
        [0, 1],
        [2, -3],
        [-4, 10],
      ])}$ (iii) $BA + C = ${M([
        [2, 5],
        [3, 0],
      ])}$ (iv) $(AB)C = ${M([
        [-8, 20],
        [-8, 13],
      ])}$`,
      options: ['(i) and (ii) only', '(ii) and (iii) only', '(iii) and (iv) only', 'all of these'],
      correct: 0,
      solution: [
        {
          math: `AB = ${M([
            [5, 4],
            [7, 0],
          ])} \\;\\Rightarrow\\; AB + C = ${M([
            [5, 5],
            [5, 5],
          ])} \\checkmark`,
        },
        { text: '(ii) Working out $BC$ row by row gives exactly the matrix shown. ✓' },
        { text: '(iii) $BA$ is $3 \\times 3$ and $C$ is $2 \\times 2$, so $BA + C$ is not defined. ✗' },
        {
          math: `(AB)C = ${M([
            [5, 4],
            [7, 0],
          ])}${M([
            [0, 1],
            [-2, 5],
          ])} = ${M([
            [-8, 25],
            [0, 7],
          ])}`,
        },
        { text: '(iv) That is not the matrix given, so (iv) is false. ✗ Only (i) and (ii) are correct.' },
      ],
    },
  ],
}
