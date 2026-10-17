import type { Lesson } from '../types'
import { matrixTex as M } from '../../lib/matrix'

const I2 = [
  [1, 0],
  [0, 1],
]

export const lesson13: Lesson = {
  id: 'matrix-operations',
  number: 13,
  title: 'Matrix operations: add, scale, multiply',
  summary: 'Adding and subtracting matrices, multiplying by a number, and the row-by-column rule.',
  pages: '145–154',
  status: 'ready',

  learn: [
    {
      id: 'add',
      title: 'Adding and subtracting',
      blocks: [
        {
          t: 'p',
          text: 'To add two matrices, add the elements that sit in the same place. To subtract, subtract them in the same way.',
        },
        {
          t: 'math',
          tex: '\\begin{pmatrix} a & b & c \\\\ d & e & f \\end{pmatrix} + \\begin{pmatrix} g & h & i \\\\ j & k & l \\end{pmatrix} = \\begin{pmatrix} a+g & b+h & c+i \\\\ d+j & e+k & f+l \\end{pmatrix}',
        },
        {
          t: 'p',
          text: 'In symbols: if $C = A + B$, then $c_{ij} = a_{ij} + b_{ij}$ for every $i$ and $j$.',
        },
        {
          t: 'note',
          tone: 'tip',
          text: 'This only works when $A$ and $B$ have the **same order**. A $3 \\times 3$ matrix and a $3 \\times 2$ matrix cannot be added: some elements would have no partner.',
        },
      ],
      check: {
        id: 'alg13-c-add',
        type: 'numeric',
        prompt: `$A = ${M([
          [2, -1],
          [4, 3],
        ])}$ and $B = ${M([
          [5, 2],
          [-3, 1],
        ])}$. What is the element in row 2, column 1 of $A - B$?`,
        parts: [{ answer: { value: 7, display: '7' } }],
        hints: ['Take $a_{21}$ and subtract $b_{21}$. Watch the minus sign.'],
        solution: [{ math: 'a_{21} - b_{21} = 4 - (-3) = 7' }],
      },
    },
    {
      id: 'scalar',
      title: 'Multiplying by a number',
      blocks: [
        {
          t: 'p',
          text: 'To multiply a matrix by a number $k$ (a **scalar**), multiply every element by $k$. If $A = (a_{ij})$, then $kA = (k\\,a_{ij})$.',
        },
        {
          t: 'math',
          tex: `2 ${M([
            [7, 8, 6],
            [1, 3, 9],
          ])} = ${M([
            [14, 16, 12],
            [2, 6, 18],
          ])}`,
        },
        {
          t: 'p',
          text: 'Combinations like $2A + B$ or $3A - 2B + C$ are worked out in the same order as with numbers: do the scalar multiplications first, then add and subtract.',
        },
        {
          t: 'note',
          tone: 'tip',
          text: 'With fractions, take the fraction out first: $\\tfrac12 A - \\tfrac32 B = \\tfrac12 (A - 3B)$. Then there is only one division at the end (see Example 3.66).',
        },
      ],
      check: {
        id: 'alg13-c-scalar',
        type: 'matrix',
        prompt: `Find $3A$ when $A = ${M([
          [2, -1],
          [0, 4],
        ])}$.`,
        parts: [
          {
            label: '$3A =$',
            answer: {
              cells: [
                [6, -3],
                [0, 12],
              ],
            },
          },
        ],
        solution: [
          {
            text: 'Multiply every element by 3: $3 \\times 2 = 6$, $3 \\times (-1) = -3$, $3 \\times 0 = 0$, $3 \\times 4 = 12$.',
          },
        ],
      },
    },
    {
      id: 'add-properties',
      title: 'Rules for adding and scaling',
      blocks: [
        { t: 'p', text: 'For matrices $A$, $B$, $C$ of the same order and numbers $p$, $q$:' },
        {
          t: 'table',
          head: ['Rule', 'Name'],
          rows: [
            ['$A + B = B + A$', 'Addition is commutative'],
            ['$A + (B + C) = (A + B) + C$', 'Addition is associative'],
            ['$(pq)A = p(qA)$', 'Scalar multiplication is associative'],
            ['$p(A + B) = pA + pB$', 'A scalar distributes over a sum of matrices'],
            ['$(p + q)A = pA + qA$', 'A matrix distributes over a sum of scalars'],
          ],
        },
        {
          t: 'p',
          text: 'The **zero matrix** $O$ plays the part of 0: $A + O = O + A = A$. It is the **additive identity**. And $-A$ is the **additive inverse** of $A$, because $A + (-A) = O$.',
        },
        {
          t: 'note',
          tone: 'think',
          text: 'All these rules hold because matrix addition happens one position at a time, and each position is just ordinary arithmetic with numbers.',
        },
      ],
      check: {
        id: 'alg13-c-props',
        type: 'mcq',
        prompt: 'If $A$ is a $2 \\times 3$ matrix, then $A + (-A)$ is',
        options: ['the $2 \\times 3$ zero matrix', 'the identity matrix $I_2$', 'the identity matrix $I_3$', '$2A$'],
        correct: 0,
        solution: [
          {
            text: 'Each element plus its negative is 0, and the order stays $2 \\times 3$. So the result is the $2 \\times 3$ zero matrix.',
          },
        ],
      },
    },
    {
      id: 'when-multiply',
      title: 'When can two matrices be multiplied?',
      blocks: [
        {
          t: 'p',
          text: 'Matrix multiplication pairs each **row** of the first matrix with each **column** of the second. A row and a column can only be paired if they have the same length. So:',
        },
        {
          t: 'math',
          tex: '\\underset{A}{(m \\times \\htmlClass{c-inner}{n})} \\cdot \\underset{B}{(\\htmlClass{c-inner}{n} \\times p)} \\;\\to\\; \\underset{AB}{(m \\times p)}',
        },
        {
          t: 'p',
          text: '$AB$ exists only when the number of columns of $A$ equals the number of rows of $B$ (the two middle numbers). The outer numbers give the order of the answer.',
        },
        {
          t: 'note',
          tone: 'tip',
          text: 'Write the orders side by side before you start: $(3 \\times 3)(3 \\times 2)$. If the middle numbers match, cross them out; what is left, $3 \\times 2$, is the order of the product.',
        },
      ],
      check: {
        id: 'alg13-c-when',
        type: 'mcq',
        prompt: '$A$ is $3 \\times 2$ and $B$ is $2 \\times 4$. What is the order of $AB$?',
        options: ['$3 \\times 4$', '$2 \\times 2$', '$4 \\times 3$', '$AB$ is not defined'],
        correct: 0,
        solution: [
          { text: '$(3 \\times 2)(2 \\times 4)$: the middle numbers match, and the outer numbers give $3 \\times 4$.' },
        ],
      },
    },
    {
      id: 'row-col',
      title: 'The row-by-column rule',
      blocks: [
        {
          t: 'p',
          text: 'The element in row $i$, column $j$ of $AB$ comes from **row $i$ of $A$** and **column $j$ of $B$**: multiply them in pairs, first with first, second with second, and so on, then add.',
        },
        {
          t: 'math',
          tex: '\\begin{pmatrix} a & b \\\\ c & d \\\\ e & f \\end{pmatrix} \\begin{pmatrix} g & h & i \\\\ k & l & m \\end{pmatrix} = \\begin{pmatrix} ag + bk & ah + bl & ai + bm \\\\ cg + dk & ch + dl & ci + dm \\\\ eg + fk & eh + fl & ei + fm \\end{pmatrix}',
        },
        {
          t: 'p',
          text: 'For example, the top left element $ag + bk$ is row 1 $(a,\\ b)$ times column 1 $(g,\\ k)$.',
        },
        {
          t: 'note',
          tone: 'tip',
          text: 'Run your left finger along the row and your right finger down the column. In the **Explore** tab the row and column light up for each element.',
        },
      ],
      check: {
        id: 'alg13-c-rowcol',
        type: 'numeric',
        prompt: `$A = ${M([
          [1, 2, 0],
          [3, 1, 5],
        ])}$ and $B = ${M([
          [8, 3, 1],
          [2, 4, 1],
          [5, 3, 1],
        ])}$. What is the element in row 2, column 1 of $AB$?`,
        parts: [{ answer: { value: 51, display: '51' } }],
        hints: ['Row 2 of $A$ is $(3, 1, 5)$. Column 1 of $B$ is $(8, 2, 5)$.'],
        solution: [{ math: '3 \\times 8 + 1 \\times 2 + 5 \\times 5 = 24 + 2 + 25 = 51' }],
      },
    },
    {
      id: 'mult-properties',
      title: 'Rules for multiplying',
      blocks: [
        {
          t: 'list',
          items: [
            '**Not commutative.** In general $AB \\ne BA$. Sometimes $BA$ is not even defined, and even when both exist they are usually different (Example 3.68).',
            '**Distributive.** $A(B + C) = AB + AC$ and $(A + B)C = AC + BC$, whenever the orders fit.',
            '**Associative.** $(AB)C = A(BC)$: you can multiply three matrices starting from either end, as long as you keep their order.',
            '**Identity.** For a square matrix $A$ of order $n$, $AI = IA = A$, where $I$ is the identity matrix of order $n$.',
          ],
        },
        {
          t: 'note',
          tone: 'think',
          text: 'Because the order matters, "multiply by $B$" is ambiguous for matrices. Always say which side: $AB$ (multiply on the right) or $BA$ (on the left).',
        },
      ],
      check: {
        id: 'alg13-c-mprops',
        type: 'mcq',
        prompt: 'For two $2 \\times 2$ matrices $A$ and $B$, which statement is always true?',
        options: ['$AB = BA$', '$A(BI) = AB$', '$AB = O$ only if $A = O$ or $B = O$', '$(A + B)^2 = A^2 + 2AB + B^2$'],
        correct: 1,
        solution: [
          {
            text: '$BI = B$ because $I$ is the identity, so $A(BI) = AB$. The other three can fail. The next card shows why.',
          },
        ],
      },
    },
    {
      id: 'cautions',
      title: 'Where matrices behave differently from numbers',
      blocks: [
        {
          t: 'p',
          text: 'For numbers, if $xy = 0$ then $x = 0$ or $y = 0$. For matrices this is false:',
        },
        {
          t: 'math',
          tex: `${M([
            [1, -1],
            [-1, 1],
          ])}${M([
            [1, 1],
            [1, 1],
          ])} = ${M([
            ['1-1', '1-1'],
            ['-1+1', '-1+1'],
          ])} = ${M([
            [0, 0],
            [0, 0],
          ])}`,
        },
        {
          t: 'p',
          text: 'Neither matrix is zero, yet the product is the zero matrix. So $AB = O$ does **not** mean $A = O$ or $B = O$.',
        },
        {
          t: 'p',
          text: 'And since $AB$ and $BA$ can differ, $(A + B)^2 = A^2 + AB + BA + B^2$, which is $A^2 + 2AB + B^2$ only when $AB = BA$.',
        },
        {
          t: 'p',
          text: 'One more rule, about the transpose of a product. The order reverses:',
        },
        { t: 'math', tex: '(AB)^T = B^T A^T' },
      ],
      check: {
        id: 'alg13-c-cautions',
        type: 'mcq',
        prompt: 'Which of these equals $(AB)^T$?',
        options: ['$A^T B^T$', '$B^T A^T$', '$BA$', '$AB$'],
        correct: 1,
        solution: [
          {
            text: 'The transpose of a product is the product of the transposes in the **reverse** order: $(AB)^T = B^T A^T$ (Example 3.73).',
          },
        ],
      },
    },
    {
      id: 'equations',
      title: 'Solving matrix equations',
      blocks: [
        {
          t: 'p',
          text: 'Many questions hide ordinary equations inside a matrix equation. The method is always the same:',
        },
        {
          t: 'list',
          ordered: true,
          items: [
            'Simplify each side into a single matrix (add, scale or multiply).',
            'The two sides are equal matrices, so set the elements in each position equal.',
            'Solve the equations you get, one at a time if you can.',
          ],
        },
        {
          t: 'math',
          tex: `${M([
            [2, 1],
            [1, 2],
          ])}${M([['x'], ['y']])} = ${M([[4], [5]])} \\;\\Rightarrow\\; ${M([['2x+y'], ['x+2y']])} = ${M([[4], [5]])} \\;\\Rightarrow\\; \\begin{cases} 2x + y = 4 \\\\ x + 2y = 5 \\end{cases}`,
        },
        { t: 'p', text: 'Solving gives $x = 1$, $y = 2$ (Example 3.70).' },
      ],
      check: {
        id: 'alg13-c-eq',
        type: 'numeric',
        prompt: `Solve $${M([
          [1, 1],
          [1, -1],
        ])}${M([['x'], ['y']])} = ${M([[7], [1]])}$.`,
        parts: [
          { label: '$x =$', answer: { value: 4, display: '4' } },
          { label: '$y =$', answer: { value: 3, display: '3' } },
        ],
        hints: ['Multiply out the left side: you get $x + y = 7$ and $x - y = 1$.'],
        solution: [
          { text: 'Multiplying out: $x + y = 7$ and $x - y = 1$.' },
          { text: 'Adding them: $2x = 8$, so $x = 4$, and then $y = 3$.' },
        ],
      },
    },
  ],

  explore: [
    {
      widget: 'matrix-arith',
      title: 'Add, subtract and scale',
      intro:
        'Set $p$ and $q$ to build $pA + qB$: $p = q = 1$ is $A + B$, $q = -1$ is $A - B$, and $q = 0$ is $pA$. Point at any element of the answer to see how it was made. You can type new numbers into $A$ and $B$.',
      tryThis: [
        'Load Example 3.63 and check each element of $2A + B$ against the book.',
        'Set $p = 1, q = -1$, then $p = -1, q = 1$. How are $A - B$ and $B - A$ related?',
        'Load "different orders". Why does the tool refuse? What happens if you set $q = 0$?',
      ],
    },
    {
      widget: 'matrix-multiply',
      title: 'Row times column',
      intro:
        'Step through a product one element at a time. The row of the first matrix and the column of the second light up, and the working is written out underneath.',
      tryThis: [
        'In Example 3.68, fill all of $AB$, then press Swap. Are $AB$ and $BA$ the same?',
        'Load "AB = O, but A ≠ O". Neither matrix is zero. What does the product come out as?',
        'Load "Orders that don’t fit". Swap them: does that help? Why not?',
      ],
    },
  ],

  examples: [
    {
      id: 'alg13-ex60',
      source: 'Example 3.60',
      title: 'Adding two 3 × 3 matrices',
      prompt: `If $A = ${M([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ])}$ and $B = ${M([
        [1, 7, 0],
        [1, 3, 1],
        [2, 4, 0],
      ])}$, find $A + B$.`,
      steps: [
        { text: 'Both are $3 \\times 3$, so $A + B$ is defined. Add the elements in the same places.' },
        {
          math: `A + B = ${M([
            ['1+1', '2+7', '3+0'],
            ['4+1', '5+3', '6+1'],
            ['7+2', '8+4', '9+0'],
          ])} = ${M([
            [2, 9, 3],
            [5, 8, 7],
            [9, 12, 9],
          ])}`,
        },
      ],
      answer: `$A + B = ${M([
        [2, 9, 3],
        [5, 8, 7],
        [9, 12, 9],
      ])}$`,
    },
    {
      id: 'alg13-ex61',
      source: 'Example 3.61',
      title: 'Total marks from two examinations',
      prompt:
        'Average marks of three groups in Tamil, English, Science and Mathematics are given for two examinations. Exam 1: Group 1: 22, 15, 14, 23; Group 2: 50, 62, 21, 30; Group 3: 53, 80, 32, 40. Exam 2: Group 1: 20, 38, 15, 40; Group 2: 18, 12, 17, 80; Group 3: 81, 47, 52, 18. Find the total marks of both examinations for each group.',
      steps: [
        { text: 'Write each exam as a $3 \\times 4$ matrix: one row per group, one column per subject.' },
        {
          math: `A = ${M([
            [22, 15, 14, 23],
            [50, 62, 21, 30],
            [53, 80, 32, 40],
          ])},\\quad B = ${M([
            [20, 38, 15, 40],
            [18, 12, 17, 80],
            [81, 47, 52, 18],
          ])}`,
        },
        { text: 'The totals are the sum $A + B$, element by element.' },
        {
          math: `A + B = ${M([
            ['22+20', '15+38', '14+15', '23+40'],
            ['50+18', '62+12', '21+17', '30+80'],
            ['53+81', '80+47', '32+52', '40+18'],
          ])}`,
        },
      ],
      answer: `$${M([
        [42, 53, 29, 63],
        [68, 74, 38, 110],
        [134, 127, 84, 58],
      ])}$. For example, Group 3 scored 134 in Tamil over both exams.`,
    },
    {
      id: 'alg13-ex62',
      source: 'Example 3.62',
      title: 'When addition is not possible',
      prompt: `If $A = ${M([
        [1, 3, -2],
        [5, -4, 6],
        [-3, 2, 9],
      ])}$ and $B = ${M([
        [1, 8],
        [3, 4],
        [9, 6],
      ])}$, find $A + B$.`,
      steps: [
        { text: '$A$ is $3 \\times 3$ but $B$ is $3 \\times 2$.' },
        {
          text: 'Matrices can be added only when they have the same order. The third column of $A$ has nothing to add to.',
        },
      ],
      answer: '$A + B$ cannot be found, because $A$ and $B$ have different orders.',
    },
    {
      id: 'alg13-ex63',
      source: 'Example 3.63',
      title: 'Finding 2A + B',
      prompt: `If $A = ${M([
        [7, 8, 6],
        [1, 3, 9],
        [-4, 3, -1],
      ])}$ and $B = ${M([
        [4, 11, -3],
        [-1, 2, 4],
        [7, 5, 0],
      ])}$, find $2A + B$.`,
      steps: [
        { text: 'Both are $3 \\times 3$, so $2A + B$ is defined. First double every element of $A$.' },
        {
          math: `2A = ${M([
            [14, 16, 12],
            [2, 6, 18],
            [-8, 6, -2],
          ])}`,
        },
        { text: 'Then add $B$ element by element.' },
        {
          math: `2A + B = ${M([
            ['14+4', '16+11', '12-3'],
            ['2-1', '6+2', '18+4'],
            ['-8+7', '6+5', '-2+0'],
          ])} = ${M([
            [18, 27, 9],
            [1, 8, 22],
            [-1, 11, -2],
          ])}`,
        },
      ],
      answer: `$2A + B = ${M([
        [18, 27, 9],
        [1, 8, 22],
        [-1, 11, -2],
      ])}$`,
    },
    {
      id: 'alg13-ex64',
      source: 'Example 3.64',
      title: '4A − 3B with fractions and a root',
      prompt: `If $A = ${M([
        [5, 4, -2],
        ['1/2', '3/4', '√2'],
        [1, 9, 4],
      ])}$ and $B = ${M([
        [-7, 4, -3],
        ['1/4', '7/2', 3],
        [5, -6, 9],
      ])}$, find $4A - 3B$.`,
      steps: [
        { text: 'Both are $3 \\times 3$, so $4A - 3B$ is defined.' },
        {
          math: `4A = ${M([
            [20, 16, -8],
            [2, 3, '4√2'],
            [4, 36, 16],
          ])},\\qquad -3B = ${M([
            [21, -12, 9],
            ['-3/4', '-21/2', -9],
            [-15, 18, -27],
          ])}`,
        },
        {
          text: 'Add these. In row 2: $2 - \\tfrac34 = \\tfrac54$ and $3 - \\tfrac{21}{2} = -\\tfrac{15}{2}$. The root cannot be combined with $-9$.',
        },
      ],
      answer: `$4A - 3B = ${M([
        [41, 4, 1],
        ['5/4', '-15/2', '4√2-9'],
        [-11, 54, -11],
      ])}$`,
    },
    {
      id: 'alg13-ex65',
      source: 'Example 3.65',
      title: 'Unknowns in a matrix sum',
      prompt: `Find $a$, $b$, $c$, $d$ from $${M([
        ['d', 8],
        ['3b', 'a'],
      ])} + ${M([
        [3, 'a'],
        [-2, -4],
      ])} = ${M([
        [2, '2a'],
        ['b', '4c'],
      ])} + ${M([
        [0, 1],
        [-5, 0],
      ])}$.`,
      steps: [
        { text: 'Add the matrices on each side first.' },
        {
          math: `${M([
            ['d+3', '8+a'],
            ['3b-2', 'a-4'],
          ])} = ${M([
            [2, '2a+1'],
            ['b-5', '4c'],
          ])}`,
        },
        { text: 'Set each pair of elements equal.' },
        { math: 'd + 3 = 2 \\Rightarrow d = -1 \\qquad 8 + a = 2a + 1 \\Rightarrow a = 7' },
        { math: '3b - 2 = b - 5 \\Rightarrow 2b = -3 \\Rightarrow b = -\\tfrac32' },
        { math: 'a - 4 = 4c \\Rightarrow 3 = 4c \\Rightarrow c = \\tfrac34' },
      ],
      answer: '$a = 7,\\ b = -\\tfrac32,\\ c = \\tfrac34,\\ d = -1$',
    },
    {
      id: 'alg13-ex66',
      source: 'Example 3.66',
      title: 'Combinations: 3A + 2B − C and ½A − 3⁄2B',
      prompt: `If $A = ${M([
        [1, 8, 3],
        [3, 5, 0],
        [8, 7, 6],
      ])}$, $B = ${M([
        [8, -6, -4],
        [2, 11, -3],
        [0, 1, 5],
      ])}$ and $C = ${M([
        [5, 3, 0],
        [-1, -7, 2],
        [1, 4, 3],
      ])}$, find (i) $3A + 2B - C$ and (ii) $\\tfrac12 A - \\tfrac32 B$.`,
      steps: [
        { text: '(i) Scale first, then add. Subtracting $C$ is the same as adding $-C$.' },
        {
          math: `${M([
            [3, 24, 9],
            [9, 15, 0],
            [24, 21, 18],
          ])} + ${M([
            [16, -12, -8],
            [4, 22, -6],
            [0, 2, 10],
          ])} + ${M([
            [-5, -3, 0],
            [1, 7, -2],
            [-1, -4, -3],
          ])} = ${M([
            [14, 9, 1],
            [14, 44, -8],
            [23, 19, 25],
          ])}`,
        },
        { text: '(ii) Take out the half: $\\tfrac12 A - \\tfrac32 B = \\tfrac12 (A - 3B)$.' },
        {
          math: `A - 3B = ${M([
            [1, 8, 3],
            [3, 5, 0],
            [8, 7, 6],
          ])} + ${M([
            [-24, 18, 12],
            [-6, -33, 9],
            [0, -3, -15],
          ])} = ${M([
            [-23, 26, 15],
            [-3, -28, 9],
            [8, 4, -9],
          ])}`,
        },
        { text: 'Now halve every element.' },
      ],
      answer: `(i) $${M([
        [14, 9, 1],
        [14, 44, -8],
        [23, 19, 25],
      ])}$ (ii) $${M([
        ['-23/2', 13, '15/2'],
        ['-3/2', -14, '9/2'],
        [4, 2, '-9/2'],
      ])}$`,
    },
    {
      id: 'alg13-ex67',
      source: 'Example 3.67',
      title: 'A 2 × 3 times a 3 × 3',
      prompt: `If $A = ${M([
        [1, 2, 0],
        [3, 1, 5],
      ])}$ and $B = ${M([
        [8, 3, 1],
        [2, 4, 1],
        [5, 3, 1],
      ])}$, find $AB$.`,
      steps: [
        {
          text: '$A$ is $2 \\times 3$ and $B$ is $3 \\times 3$. The middle numbers match, so $AB$ exists and is $2 \\times 3$.',
        },
        { text: 'Row 1 of $A$ is $(1, 2, 0)$. Multiply it by each column of $B$:' },
        { math: '1(8) + 2(2) + 0(5) = 12,\\quad 1(3) + 2(4) + 0(3) = 11,\\quad 1(1) + 2(1) + 0(1) = 3' },
        { text: 'Row 2 of $A$ is $(3, 1, 5)$:' },
        { math: '3(8) + 1(2) + 5(5) = 51,\\quad 3(3) + 1(4) + 5(3) = 28,\\quad 3(1) + 1(1) + 5(1) = 9' },
      ],
      answer: `$AB = ${M([
        [12, 11, 3],
        [51, 28, 9],
      ])}$`,
    },
    {
      id: 'alg13-ex68',
      source: 'Example 3.68',
      title: 'AB and BA are different',
      prompt: `If $A = ${M([
        [2, 1],
        [1, 3],
      ])}$ and $B = ${M([
        [2, 0],
        [1, 3],
      ])}$, find $AB$ and $BA$. Is $AB = BA$?`,
      steps: [
        { text: 'Both are $2 \\times 2$, so both products exist and are $2 \\times 2$.' },
        {
          math: `AB = ${M([
            ['4+1', '0+3'],
            ['2+3', '0+9'],
          ])} = ${M([
            [5, 3],
            [5, 9],
          ])}`,
        },
        {
          math: `BA = ${M([
            ['4+0', '2+0'],
            ['2+3', '1+9'],
          ])} = ${M([
            [4, 2],
            [5, 10],
          ])}`,
        },
      ],
      answer: '$AB \\ne BA$. Changing the order of multiplication changed the answer.',
    },
    {
      id: 'alg13-ex69',
      source: 'Example 3.69',
      title: 'A pair that does commute',
      prompt: `Show that $A = ${M([
        [2, '-2√2'],
        ['√2', 2],
      ])}$ and $B = ${M([
        [2, '2√2'],
        ['-√2', 2],
      ])}$ satisfy $AB = BA$.`,
      steps: [
        {
          math: `AB = ${M([
            ['4+4', '4√2-4√2'],
            ['2√2-2√2', '4+4'],
          ])} = ${M([
            [8, 0],
            [0, 8],
          ])}`,
        },
        {
          math: `BA = ${M([
            ['4+4', '-4√2+4√2'],
            ['-2√2+2√2', '4+4'],
          ])} = ${M([
            [8, 0],
            [0, 8],
          ])}`,
        },
        { text: 'For example, the top left of $AB$ is $2(2) + (-2\\sqrt2)(-\\sqrt2) = 4 + 4 = 8$.' },
      ],
      answer: 'Both products equal $\\begin{pmatrix} 8 & 0 \\\\ 0 & 8 \\end{pmatrix}$, so $AB = BA$ for this pair.',
    },
    {
      id: 'alg13-ex70',
      source: 'Example 3.70',
      title: 'Solving a matrix equation',
      prompt: `Solve $${M([
        [2, 1],
        [1, 2],
      ])}${M([['x'], ['y']])} = ${M([[4], [5]])}$.`,
      steps: [
        { text: 'A $2 \\times 2$ times a $2 \\times 1$ gives a $2 \\times 1$. Multiply out the left side.' },
        { math: `${M([['2x+y'], ['x+2y']])} = ${M([[4], [5]])}` },
        { text: 'Equal matrices give $2x + y = 4$ (1) and $x + 2y = 5$ (2).' },
        { text: '(1) $- 2 \\times$ (2): $2x + y - 2x - 4y = 4 - 10$, so $-3y = -6$ and $y = 2$.' },
        { text: 'Put $y = 2$ in (1): $2x + 2 = 4$, so $x = 1$.' },
      ],
      answer: '$x = 1,\\ y = 2$',
    },
    {
      id: 'alg13-ex71',
      source: 'Example 3.71',
      title: 'Checking (AB)C = A(BC)',
      prompt: `If $A = ${M([[1, -1, 2]])}$, $B = ${M([
        [1, -1],
        [2, 1],
        [1, 3],
      ])}$ and $C = ${M([
        [1, 2],
        [2, -1],
      ])}$, show that $(AB)C = A(BC)$.`,
      steps: [
        { text: 'Left side. $A$ is $1 \\times 3$ and $B$ is $3 \\times 2$, so $AB$ is $1 \\times 2$:' },
        { math: 'AB = (1 - 2 + 2 \\quad -1 - 1 + 6) = (1 \\quad 4)' },
        { math: '(AB)C = (1 + 8 \\quad 2 - 4) = (9 \\quad -2)' },
        { text: 'Right side. $B$ is $3 \\times 2$ and $C$ is $2 \\times 2$, so $BC$ is $3 \\times 2$:' },
        {
          math: `BC = ${M([
            ['1-2', '2+1'],
            ['2+2', '4-1'],
            ['1+6', '2-3'],
          ])} = ${M([
            [-1, 3],
            [4, 3],
            [7, -1],
          ])}`,
        },
        { math: 'A(BC) = (-1 - 4 + 14 \\quad 3 - 3 - 2) = (9 \\quad -2)' },
      ],
      answer: 'Both sides equal $(9 \\quad -2)$, so $(AB)C = A(BC)$.',
    },
    {
      id: 'alg13-ex72',
      source: 'Example 3.72',
      title: 'Checking A(B + C) = AB + AC',
      prompt: `If $A = ${M([
        [1, 1],
        [-1, 3],
      ])}$, $B = ${M([
        [1, 2],
        [-4, 2],
      ])}$ and $C = ${M([
        [-7, 6],
        [3, 2],
      ])}$, verify that $A(B + C) = AB + AC$.`,
      steps: [
        {
          math: `B + C = ${M([
            [-6, 8],
            [-1, 4],
          ])},\\quad A(B + C) = ${M([
            ['-6-1', '8+4'],
            ['6-3', '-8+12'],
          ])} = ${M([
            [-7, 12],
            [3, 4],
          ])}`,
        },
        {
          math: `AB = ${M([
            [-3, 4],
            [-13, 4],
          ])},\\quad AC = ${M([
            [-4, 8],
            [16, 0],
          ])}`,
        },
        {
          math: `AB + AC = ${M([
            [-7, 12],
            [3, 4],
          ])}`,
        },
      ],
      answer: 'Both sides equal $\\begin{pmatrix} -7 & 12 \\\\ 3 & 4 \\end{pmatrix}$.',
    },
    {
      id: 'alg13-ex73',
      source: 'Example 3.73',
      title: 'Checking (AB)ᵀ = BᵀAᵀ',
      prompt: `If $A = ${M([
        [1, 2, 1],
        [2, -1, 1],
      ])}$ and $B = ${M([
        [2, -1],
        [-1, 4],
        [0, 2],
      ])}$, show that $(AB)^T = B^T A^T$.`,
      steps: [
        {
          math: `AB = ${M([
            ['2-2+0', '-1+8+2'],
            ['4+1+0', '-2-4+2'],
          ])} = ${M([
            [0, 9],
            [5, -4],
          ])} \\;\\Rightarrow\\; (AB)^T = ${M([
            [0, 5],
            [9, -4],
          ])}`,
        },
        {
          math: `B^T = ${M([
            [2, -1, 0],
            [-1, 4, 2],
          ])},\\quad A^T = ${M([
            [1, 2],
            [2, -1],
            [1, 1],
          ])}`,
        },
        {
          math: `B^T A^T = ${M([
            ['2-2+0', '4+1+0'],
            ['-1+8+2', '-2-4+2'],
          ])} = ${M([
            [0, 5],
            [9, -4],
          ])}`,
        },
      ],
      answer: 'Both equal $\\begin{pmatrix} 0 & 5 \\\\ 9 & -4 \\end{pmatrix}$, so $(AB)^T = B^T A^T$.',
    },
  ],

  practice: [
    {
      id: 'alg13-p1',
      source: 'Exercise 3.18 · Q1',
      type: 'matrix',
      prompt: `If $A = ${M([
        [1, 9],
        [3, 4],
        [8, -3],
      ])}$ and $B = ${M([
        [5, 7],
        [3, 3],
        [1, 0],
      ])}$, find $A + B$ and $B + A$, and check that (i) $A + B = B + A$.`,
      parts: [
        {
          label: '$A + B =$',
          answer: {
            cells: [
              [6, 16],
              [6, 7],
              [9, -3],
            ],
          },
        },
        {
          label: '$B + A =$',
          answer: {
            cells: [
              [6, 16],
              [6, 7],
              [9, -3],
            ],
          },
        },
      ],
      solution: [
        {
          math: `A + B = ${M([
            ['1+5', '9+7'],
            ['3+3', '4+3'],
            ['8+1', '-3+0'],
          ])} = ${M([
            [6, 16],
            [6, 7],
            [9, -3],
          ])}`,
        },
        { text: '$B + A$ adds the same pairs in the other order, which gives the same numbers. So $A + B = B + A$.' },
        {
          text: '(ii) $-A$ has every sign changed, so each element of $A + (-A)$ is a number plus its negative: the $3 \\times 2$ zero matrix. The same is true of $(-A) + A$.',
        },
      ],
    },
    {
      id: 'alg13-p2',
      source: 'Exercise 3.18 · Q2',
      type: 'matrix',
      prompt: `If $A = ${M([
        [4, 3, 1],
        [2, 3, -8],
        [1, 0, -4],
      ])}$, $B = ${M([
        [2, 3, 4],
        [1, 9, 2],
        [-7, 1, -1],
      ])}$ and $C = ${M([
        [8, 3, 4],
        [1, -2, 3],
        [2, 4, -1],
      ])}$, find $A + (B + C)$ and $(A + B) + C$.`,
      parts: [
        {
          label: '$A + (B + C) =$',
          answer: {
            cells: [
              [14, 9, 9],
              [4, 10, -3],
              [-4, 5, -6],
            ],
          },
        },
        {
          label: '$(A + B) + C =$',
          answer: {
            cells: [
              [14, 9, 9],
              [4, 10, -3],
              [-4, 5, -6],
            ],
          },
        },
      ],
      hints: [
        '$B + C$ comes first on the left: $\\begin{pmatrix} 10 & 6 & 8 \\\\ 2 & 7 & 5 \\\\ -5 & 5 & -2 \\end{pmatrix}$.',
      ],
      solution: [
        {
          math: `B + C = ${M([
            [10, 6, 8],
            [2, 7, 5],
            [-5, 5, -2],
          ])},\\quad A + (B + C) = ${M([
            [14, 9, 9],
            [4, 10, -3],
            [-4, 5, -6],
          ])}`,
        },
        {
          math: `A + B = ${M([
            [6, 6, 5],
            [3, 12, -6],
            [-6, 1, -5],
          ])},\\quad (A + B) + C = ${M([
            [14, 9, 9],
            [4, 10, -3],
            [-4, 5, -6],
          ])}`,
        },
        { text: 'The two results are equal: matrix addition is associative.' },
      ],
    },
    {
      id: 'alg13-p3',
      source: 'Exercise 3.18 · Q3',
      type: 'matrix',
      prompt: `Find $X$ and $Y$ if $X + Y = ${M([
        [7, 0],
        [3, 5],
      ])}$ and $X - Y = ${M([
        [3, 0],
        [0, 4],
      ])}$.`,
      parts: [
        {
          label: '$X =$',
          answer: {
            cells: [
              [5, 0],
              ['3/2', '9/2'],
            ],
          },
        },
        {
          label: '$Y =$',
          answer: {
            cells: [
              [2, 0],
              ['3/2', '1/2'],
            ],
          },
        },
      ],
      hints: ['Add the two equations: $2X = (X + Y) + (X - Y)$.'],
      solution: [
        {
          math: `2X = ${M([
            [10, 0],
            [3, 9],
          ])} \\Rightarrow X = ${M([
            [5, 0],
            ['3/2', '9/2'],
          ])}`,
        },
        {
          math: `2Y = (X + Y) - (X - Y) = ${M([
            [4, 0],
            [3, 1],
          ])} \\Rightarrow Y = ${M([
            [2, 0],
            ['3/2', '1/2'],
          ])}`,
        },
      ],
    },
    {
      id: 'alg13-p4',
      source: 'Exercise 3.18 · Q4',
      type: 'matrix',
      prompt: `If $A = ${M([
        [0, 4, 9],
        [8, 3, 7],
      ])}$ and $B = ${M([
        [7, 3, 8],
        [1, 4, 9],
      ])}$, find (i) $B - 5A$ and (ii) $3A - 9B$.`,
      parts: [
        {
          label: '(i) $B - 5A =$',
          answer: {
            cells: [
              [7, -17, -37],
              [-39, -11, -26],
            ],
          },
        },
        {
          label: '(ii) $3A - 9B =$',
          answer: {
            cells: [
              [-63, -15, -45],
              [15, -27, -60],
            ],
          },
        },
      ],
      solution: [
        {
          math: `5A = ${M([
            [0, 20, 45],
            [40, 15, 35],
          ])},\\quad B - 5A = ${M([
            [7, -17, -37],
            [-39, -11, -26],
          ])}`,
        },
        {
          math: `3A = ${M([
            [0, 12, 27],
            [24, 9, 21],
          ])},\\quad 9B = ${M([
            [63, 27, 72],
            [9, 36, 81],
          ])},\\quad 3A - 9B = ${M([
            [-63, -15, -45],
            [15, -27, -60],
          ])}`,
        },
      ],
    },
    {
      id: 'alg13-p5',
      source: 'Exercise 3.18 · Q5 (i)',
      type: 'numeric',
      prompt: `Find $x$, $y$, $z$ if $${M([
        ['x-3', '3x-z'],
        ['x+y+7', 'x+y+z'],
      ])} = ${M([
        [1, 0],
        [1, 6],
      ])}$.`,
      parts: [
        { label: '$x =$', answer: { value: 4, display: '4' } },
        { label: '$y =$', answer: { value: -10, display: '-10' } },
        { label: '$z =$', answer: { value: 12, display: '12' } },
      ],
      hints: ['The top left gives $x$ straight away. Use it in the top right to get $z$.'],
      solution: [
        { text: '$x - 3 = 1$, so $x = 4$.' },
        { text: '$3x - z = 0$, so $z = 12$.' },
        { text: '$x + y + 7 = 1$, so $y = -10$. Check: $x + y + z = 4 - 10 + 12 = 6$. ✓' },
      ],
    },
    {
      id: 'alg13-p6',
      source: 'Exercise 3.18 · Q5 (ii)',
      type: 'numeric',
      prompt: 'Find $x$, $y$, $z$ if $(x \\quad y - z \\quad z + 3) + (y \\quad 4 \\quad 3) = (4 \\quad 8 \\quad 16)$.',
      parts: [
        { label: '$x =$', answer: { value: -10, display: '-10' } },
        { label: '$y =$', answer: { value: 14, display: '14' } },
        { label: '$z =$', answer: { value: 10, display: '10' } },
      ],
      hints: ['Add the row matrices, then start from the last position: $z + 3 + 3 = 16$.'],
      solution: [
        { text: 'Adding: $(x + y \\quad y - z + 4 \\quad z + 6) = (4 \\quad 8 \\quad 16)$.' },
        { text: '$z + 6 = 16$, so $z = 10$.' },
        { text: '$y - z + 4 = 8$, so $y = 14$.' },
        { text: '$x + y = 4$, so $x = -10$.' },
      ],
    },
    {
      id: 'alg13-p7',
      source: 'Exercise 3.18 · Q6',
      type: 'numeric',
      prompt: `Find $x$ and $y$ if $x${M([[4], [-3]])} + y${M([[-2], [3]])} = ${M([[4], [6]])}$.`,
      parts: [
        { label: '$x =$', answer: { value: 4, display: '4' } },
        { label: '$y =$', answer: { value: 6, display: '6' } },
      ],
      hints: ['You get $4x - 2y = 4$ and $-3x + 3y = 6$.'],
      solution: [
        { text: 'Matching rows: $4x - 2y = 4$ and $-3x + 3y = 6$, that is $2x - y = 2$ and $-x + y = 2$.' },
        { text: 'Adding these: $x = 4$. Then $y = 2 + x = 6$.' },
      ],
    },
    {
      id: 'alg13-p8',
      source: 'Exercise 3.18 · Q7',
      type: 'numeric',
      prompt: `Find the non-zero value of $x$ satisfying $x${M([
        ['2x', 2],
        [3, 'x'],
      ])} + 2${M([
        [8, '5x'],
        [4, '4x'],
      ])} = 2${M([
        ['x^2+8', 24],
        [10, '6x'],
      ])}$.`,
      parts: [{ label: '$x =$', answer: { value: 4, display: '4' } }],
      hints: ['Compare the top right elements: $2x + 10x = 48$.'],
      solution: [
        {
          math: `${M([
            ['2x^2+16', '2x+10x'],
            ['3x+8', 'x^2+8x'],
          ])} = ${M([
            ['2x^2+16', 48],
            [20, '12x'],
          ])}`,
        },
        { text: 'Top right: $12x = 48$, so $x = 4$.' },
        { text: 'Check the others: $3(4) + 8 = 20$ ✓ and $x^2 + 8x = 12x$ gives $x^2 = 4x$, so $x = 4$ ✓.' },
      ],
    },
    {
      id: 'alg13-p9',
      source: 'Exercise 3.18 · Q8',
      type: 'numeric',
      prompt: `Solve for $x$ and $y$: $${M([['x^2'], ['y^2']])} + 2${M([['-2x'], ['-y']])} = ${M([[5], [8]])}$.`,
      parts: [
        { label: 'Smaller value of $x$:', answer: { value: -1, display: '-1' } },
        { label: 'Larger value of $x$:', answer: { value: 5, display: '5' } },
        { label: 'Smaller value of $y$:', answer: { value: -2, display: '-2' } },
        { label: 'Larger value of $y$:', answer: { value: 4, display: '4' } },
      ],
      hints: ['You get two quadratics: $x^2 - 4x - 5 = 0$ and $y^2 - 2y - 8 = 0$.'],
      solution: [
        { text: 'Top row: $x^2 - 4x = 5$, so $x^2 - 4x - 5 = 0$, $(x - 5)(x + 1) = 0$, $x = 5$ or $-1$.' },
        { text: 'Bottom row: $y^2 - 2y = 8$, so $y^2 - 2y - 8 = 0$, $(y - 4)(y + 2) = 0$, $y = 4$ or $-2$.' },
      ],
    },
    {
      id: 'alg13-p10',
      source: 'Exercise 3.19 · Q1',
      type: 'mcq',
      prompt:
        'Find the order of $AB$ in each case. (i) $A$: $3 \\times 3$, $B$: $3 \\times 3$ (ii) $4 \\times 3$, $3 \\times 2$ (iii) $4 \\times 2$, $2 \\times 2$ (iv) $4 \\times 5$, $5 \\times 1$ (v) $1 \\times 1$, $1 \\times 3$',
      options: [
        '$3 \\times 3$, $4 \\times 2$, $4 \\times 2$, $4 \\times 1$, $1 \\times 3$',
        '$3 \\times 3$, $3 \\times 2$, $2 \\times 2$, $5 \\times 1$, $1 \\times 3$',
        '$3 \\times 3$, $4 \\times 3$, $4 \\times 2$, $4 \\times 5$, $1 \\times 1$',
        '$9$, $8$, $8$, $4$, $3$',
      ],
      correct: 0,
      solution: [
        {
          text: 'In each case the middle numbers match and the outer numbers give the order: $3 \\times 3$, $4 \\times 2$, $4 \\times 2$, $4 \\times 1$, $1 \\times 3$.',
        },
      ],
    },
    {
      id: 'alg13-p11',
      source: 'Exercise 3.19 · Q2',
      type: 'mcq',
      prompt:
        'If $A$ is of order $p \\times q$ and $B$ is of order $q \\times r$, what are the orders of $AB$ and $BA$?',
      options: [
        '$AB$ is $p \\times r$; $BA$ is not defined (unless $r = p$)',
        '$AB$ is $q \\times q$; $BA$ is $p \\times r$',
        'Both are $p \\times r$',
        '$AB$ is not defined; $BA$ is $q \\times q$',
      ],
      correct: 0,
      solution: [
        { text: '$AB$: $(p \\times q)(q \\times r)$, middle numbers match, so $AB$ is $p \\times r$.' },
        {
          text: '$BA$: $(q \\times r)(p \\times q)$ needs $r = p$. In general that is not true, so $BA$ is not defined.',
        },
      ],
    },
    {
      id: 'alg13-p12',
      source: 'Exercise 3.19 · Q3',
      type: 'numeric',
      prompt:
        '$A$ has $a$ rows and $a + 3$ columns. $B$ has $b$ rows and $17 - b$ columns. If both $AB$ and $BA$ exist, find $a$ and $b$.',
      parts: [
        { label: '$a =$', answer: { value: 7, display: '7' } },
        { label: '$b =$', answer: { value: 10, display: '10' } },
      ],
      hints: [
        '$AB$ exists when columns of $A$ = rows of $B$: $a + 3 = b$.',
        '$BA$ exists when columns of $B$ = rows of $A$: $17 - b = a$.',
      ],
      solution: [
        { text: '$AB$ exists, so $a + 3 = b$. $BA$ exists, so $17 - b = a$.' },
        { text: 'Substitute: $17 - (a + 3) = a$, so $14 = 2a$, $a = 7$ and $b = 10$.' },
      ],
    },
    {
      id: 'alg13-p13',
      source: 'Exercise 3.19 · Q4',
      type: 'matrix',
      prompt: `If $A = ${M([
        [2, 5],
        [4, 3],
      ])}$ and $B = ${M([
        [1, -3],
        [2, 5],
      ])}$, find $AB$ and $BA$. Is $AB = BA$?`,
      parts: [
        {
          label: '$AB =$',
          answer: {
            cells: [
              [12, 19],
              [10, 3],
            ],
          },
        },
        {
          label: '$BA =$',
          answer: {
            cells: [
              [-10, -4],
              [24, 25],
            ],
          },
        },
      ],
      hints: ['Top left of $AB$: row 1 of $A$ times column 1 of $B$ = $2(1) + 5(2)$.'],
      solution: [
        {
          math: `AB = ${M([
            ['2+10', '-6+25'],
            ['4+6', '-12+15'],
          ])} = ${M([
            [12, 19],
            [10, 3],
          ])}`,
        },
        {
          math: `BA = ${M([
            ['2-12', '5-9'],
            ['4+20', '10+15'],
          ])} = ${M([
            [-10, -4],
            [24, 25],
          ])}`,
        },
        { text: 'So $AB \\ne BA$.' },
      ],
    },
    {
      id: 'alg13-p14',
      source: 'Exercise 3.19 · Q5',
      type: 'matrix',
      prompt: `Given $A = ${M([
        [1, 3],
        [5, -1],
      ])}$, $B = ${M([
        [1, -1, 2],
        [3, 5, 2],
      ])}$, $C = ${M([
        [1, 3, 2],
        [-4, 1, 3],
      ])}$, find $A(B + C)$ and $AB + AC$.`,
      parts: [
        {
          label: '$A(B + C) =$',
          answer: {
            cells: [
              [-1, 20, 19],
              [11, 4, 15],
            ],
          },
        },
        {
          label: '$AB + AC =$',
          answer: {
            cells: [
              [-1, 20, 19],
              [11, 4, 15],
            ],
          },
        },
      ],
      solution: [
        {
          math: `B + C = ${M([
            [2, 2, 4],
            [-1, 6, 5],
          ])},\\quad A(B + C) = ${M([
            [-1, 20, 19],
            [11, 4, 15],
          ])}`,
        },
        {
          math: `AB = ${M([
            [10, 14, 8],
            [2, -10, 8],
          ])},\\quad AC = ${M([
            [-11, 6, 11],
            [9, 14, 7],
          ])}`,
        },
        { text: 'Adding $AB + AC$ gives the same matrix, so $A(B + C) = AB + AC$.' },
      ],
    },
    {
      id: 'alg13-p15',
      source: 'Exercise 3.19 · Q6',
      type: 'matrix',
      prompt: `Show that $A = ${M([
        [1, 2],
        [3, 1],
      ])}$ and $B = ${M([
        [1, -2],
        [-3, 1],
      ])}$ satisfy $AB = BA$. Find both products.`,
      parts: [
        {
          label: '$AB =$',
          answer: {
            cells: [
              [-5, 0],
              [0, -5],
            ],
          },
        },
        {
          label: '$BA =$',
          answer: {
            cells: [
              [-5, 0],
              [0, -5],
            ],
          },
        },
      ],
      solution: [
        {
          math: `AB = ${M([
            ['1-6', '-2+2'],
            ['3-3', '-6+1'],
          ])} = ${M([
            [-5, 0],
            [0, -5],
          ])}`,
        },
        {
          math: `BA = ${M([
            ['1-6', '2-2'],
            ['-3+3', '-6+1'],
          ])} = ${M([
            [-5, 0],
            [0, -5],
          ])}`,
        },
      ],
    },
    {
      id: 'alg13-p16',
      source: 'Exercise 3.19 · Q7 (i)',
      type: 'matrix',
      prompt: `Let $A = ${M([
        [1, 2],
        [1, 3],
      ])}$, $B = ${M([
        [4, 0],
        [1, 5],
      ])}$, $C = ${M([
        [2, 0],
        [1, 2],
      ])}$. Find $A(BC)$ and $(AB)C$.`,
      parts: [
        {
          label: '$A(BC) =$',
          answer: {
            cells: [
              [22, 20],
              [29, 30],
            ],
          },
        },
        {
          label: '$(AB)C =$',
          answer: {
            cells: [
              [22, 20],
              [29, 30],
            ],
          },
        },
      ],
      solution: [
        {
          math: `BC = ${M([
            [8, 0],
            [7, 10],
          ])},\\quad A(BC) = ${M([
            ['8+14', '0+20'],
            ['8+21', '0+30'],
          ])} = ${M([
            [22, 20],
            [29, 30],
          ])}`,
        },
        {
          math: `AB = ${M([
            [6, 10],
            [7, 15],
          ])},\\quad (AB)C = ${M([
            ['12+10', '0+20'],
            ['14+15', '0+30'],
          ])} = ${M([
            [22, 20],
            [29, 30],
          ])}`,
        },
      ],
    },
    {
      id: 'alg13-p17',
      source: 'Exercise 3.19 · Q7 (ii)',
      type: 'matrix',
      prompt: `With the same $A = ${M([
        [1, 2],
        [1, 3],
      ])}$, $B = ${M([
        [4, 0],
        [1, 5],
      ])}$, $C = ${M([
        [2, 0],
        [1, 2],
      ])}$, find $(A - B)C$ and $AC - BC$.`,
      parts: [
        {
          label: '$(A - B)C =$',
          answer: {
            cells: [
              [-4, 4],
              [-2, -4],
            ],
          },
        },
        {
          label: '$AC - BC =$',
          answer: {
            cells: [
              [-4, 4],
              [-2, -4],
            ],
          },
        },
      ],
      solution: [
        {
          math: `A - B = ${M([
            [-3, 2],
            [0, -2],
          ])},\\quad (A - B)C = ${M([
            ['-6+2', '0+4'],
            ['0-2', '0-4'],
          ])} = ${M([
            [-4, 4],
            [-2, -4],
          ])}`,
        },
        {
          math: `AC = ${M([
            [4, 4],
            [5, 6],
          ])},\\quad BC = ${M([
            [8, 0],
            [7, 10],
          ])},\\quad AC - BC = ${M([
            [-4, 4],
            [-2, -4],
          ])}`,
        },
      ],
    },
    {
      id: 'alg13-p18',
      source: 'Exercise 3.19 · Q7 (iii)',
      type: 'matrix',
      prompt: `With $A = ${M([
        [1, 2],
        [1, 3],
      ])}$ and $B = ${M([
        [4, 0],
        [1, 5],
      ])}$, find $(A - B)^T$ and $A^T - B^T$.`,
      parts: [
        {
          label: '$(A - B)^T =$',
          answer: {
            cells: [
              [-3, 0],
              [2, -2],
            ],
          },
        },
        {
          label: '$A^T - B^T =$',
          answer: {
            cells: [
              [-3, 0],
              [2, -2],
            ],
          },
        },
      ],
      solution: [
        {
          math: `A - B = ${M([
            [-3, 2],
            [0, -2],
          ])} \\Rightarrow (A - B)^T = ${M([
            [-3, 0],
            [2, -2],
          ])}`,
        },
        {
          math: `A^T - B^T = ${M([
            [1, 1],
            [2, 3],
          ])} - ${M([
            [4, 1],
            [0, 5],
          ])} = ${M([
            [-3, 0],
            [2, -2],
          ])}`,
        },
      ],
    },
    {
      id: 'alg13-p19',
      source: 'Exercise 3.19 · Q8',
      type: 'mcq',
      prompt: `If $A = ${M([
        ['\\cos\\theta', 0],
        [0, '\\cos\\theta'],
      ])}$ and $B = ${M([
        ['\\sin\\theta', 0],
        [0, '\\sin\\theta'],
      ])}$, then $A^2 + B^2$ equals`,
      options: ['$I$', '$O$', '$2I$', '$(\\cos\\theta + \\sin\\theta) I$'],
      correct: 0,
      solution: [
        {
          math: `A^2 = ${M([
            ['\\cos^2\\theta', 0],
            [0, '\\cos^2\\theta'],
          ])},\\quad B^2 = ${M([
            ['\\sin^2\\theta', 0],
            [0, '\\sin^2\\theta'],
          ])}`,
        },
        { text: 'Adding, each diagonal element is $\\cos^2\\theta + \\sin^2\\theta = 1$, so $A^2 + B^2 = I$.' },
      ],
    },
    {
      id: 'alg13-p20',
      source: 'Exercise 3.19 · Q9',
      type: 'matrix',
      prompt: `If $A = ${M([
        ['\\cos\\theta', '\\sin\\theta'],
        ['-\\sin\\theta', '\\cos\\theta'],
      ])}$, work out $AA^T$. (Each element simplifies to a number.)`,
      parts: [{ label: '$AA^T =$', answer: { cells: I2 } }],
      hints: [
        '$A^T = \\begin{pmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{pmatrix}$. Use $\\sin^2\\theta + \\cos^2\\theta = 1$.',
      ],
      solution: [
        {
          math: `AA^T = ${M([
            ['\\cos^2\\theta+\\sin^2\\theta', '-\\cos\\theta\\sin\\theta+\\sin\\theta\\cos\\theta'],
            ['-\\sin\\theta\\cos\\theta+\\cos\\theta\\sin\\theta', '\\sin^2\\theta+\\cos^2\\theta'],
          ])}`,
        },
        { text: 'The diagonal elements are 1 and the others cancel to 0, so $AA^T = I$.' },
      ],
    },
    {
      id: 'alg13-p21',
      source: 'Exercise 3.19 · Q10',
      type: 'matrix',
      prompt: `Find $A^2$ when $A = ${M([
        [5, -4],
        [6, -5],
      ])}$, and check that $A^2 = I$.`,
      parts: [{ label: '$A^2 =$', answer: { cells: I2 } }],
      solution: [
        {
          math: `A^2 = ${M([
            ['25-24', '-20+20'],
            ['30-30', '-24+25'],
          ])} = ${M(I2)} = I`,
        },
      ],
    },
    {
      id: 'alg13-p22',
      source: 'Exercise 3.19 · Q11',
      type: 'mcq',
      prompt: `If $A = ${M([
        ['a', 'b'],
        ['c', 'd'],
      ])}$ and $I$ is the $2 \\times 2$ identity, then $A^2 - (a + d)A$ equals`,
      options: ['$(bc - ad)I$', '$(ad - bc)I$', '$O$', '$(a + d)I$'],
      correct: 0,
      hints: ['Work out $A^2$, then subtract $(a + d)A$ one element at a time.'],
      solution: [
        {
          math: `A^2 = ${M([
            ['a^2+bc', 'ab+bd'],
            ['ac+cd', 'bc+d^2'],
          ])},\\quad (a+d)A = ${M([
            ['a^2+ad', 'ab+bd'],
            ['ac+cd', 'ad+d^2'],
          ])}`,
        },
        {
          math: `A^2 - (a+d)A = ${M([
            ['bc-ad', 0],
            [0, 'bc-ad'],
          ])} = (bc - ad) I_2`,
        },
      ],
    },
    {
      id: 'alg13-p23',
      source: 'Exercise 3.19 · Q12',
      type: 'matrix',
      prompt: `If $A = ${M([
        [5, 2, 9],
        [1, 2, 8],
      ])}$ and $B = ${M([
        [1, 7],
        [1, 2],
        [5, -1],
      ])}$, find $(AB)^T$ and $B^T A^T$.`,
      parts: [
        {
          label: '$(AB)^T =$',
          answer: {
            cells: [
              [52, 43],
              [30, 3],
            ],
          },
        },
        {
          label: '$B^T A^T =$',
          answer: {
            cells: [
              [52, 43],
              [30, 3],
            ],
          },
        },
      ],
      hints: ['First find $AB$, a $2 \\times 2$ matrix. Its top left is $5 + 2 + 45$.'],
      solution: [
        {
          math: `AB = ${M([
            ['5+2+45', '35+4-9'],
            ['1+2+40', '7+4-8'],
          ])} = ${M([
            [52, 30],
            [43, 3],
          ])} \\Rightarrow (AB)^T = ${M([
            [52, 43],
            [30, 3],
          ])}`,
        },
        {
          math: `B^T A^T = ${M([
            [1, 1, 5],
            [7, 2, -1],
          ])}${M([
            [5, 1],
            [2, 2],
            [9, 8],
          ])} = ${M([
            [52, 43],
            [30, 3],
          ])}`,
        },
      ],
    },
    {
      id: 'alg13-p24',
      source: 'Exercise 3.19 · Q13',
      type: 'matrix',
      prompt: `If $A = ${M([
        [3, 1],
        [-1, 2],
      ])}$, find $A^2$ and then $A^2 - 5A + 7I_2$.`,
      parts: [
        {
          label: '$A^2 =$',
          answer: {
            cells: [
              [8, 5],
              [-5, 3],
            ],
          },
        },
        {
          label: '$A^2 - 5A + 7I_2 =$',
          answer: {
            cells: [
              [0, 0],
              [0, 0],
            ],
          },
        },
      ],
      solution: [
        {
          math: `A^2 = ${M([
            ['9-1', '3+2'],
            ['-3-2', '-1+4'],
          ])} = ${M([
            [8, 5],
            [-5, 3],
          ])}`,
        },
        {
          math: `A^2 - 5A + 7I = ${M([
            ['8-15+7', '5-5+0'],
            ['-5+5+0', '3-10+7'],
          ])} = ${M([
            [0, 0],
            [0, 0],
          ])}`,
        },
      ],
    },
  ],

  quiz: [
    {
      id: 'alg13-q1',
      type: 'mcq',
      prompt: 'Two matrices can be added when',
      options: [
        'they have the same order',
        'they are both square',
        'the columns of the first equal the rows of the second',
        'they have the same number of rows',
      ],
      correct: 0,
      solution: [{ text: 'Addition pairs up elements in the same place, so the matrices must have the same order.' }],
    },
    {
      id: 'alg13-q2',
      type: 'matrix',
      prompt: `Find $${M([
        [3, -1],
        [2, 0],
      ])} + ${M([
        [-1, 4],
        [5, 2],
      ])}$.`,
      parts: [
        {
          answer: {
            cells: [
              [2, 3],
              [7, 2],
            ],
          },
        },
      ],
      solution: [
        {
          math: `${M([
            ['3-1', '-1+4'],
            ['2+5', '0+2'],
          ])} = ${M([
            [2, 3],
            [7, 2],
          ])}`,
        },
      ],
    },
    {
      id: 'alg13-q3',
      type: 'matrix',
      prompt: `If $A = ${M([
        [1, 2],
        [3, 4],
      ])}$ and $B = ${M([
        [0, 5],
        [-1, 2],
      ])}$, find $2A - B$.`,
      parts: [
        {
          answer: {
            cells: [
              [2, -1],
              [7, 6],
            ],
          },
        },
      ],
      solution: [
        {
          math: `2A - B = ${M([
            ['2-0', '4-5'],
            ['6+1', '8-2'],
          ])} = ${M([
            [2, -1],
            [7, 6],
          ])}`,
        },
      ],
    },
    {
      id: 'alg13-q4',
      type: 'mcq',
      prompt: '$A$ is $2 \\times 3$ and $B$ is $3 \\times 2$. What is the order of $BA$?',
      options: ['$3 \\times 3$', '$2 \\times 2$', '$3 \\times 2$', '$BA$ is not defined'],
      correct: 0,
      solution: [
        { text: '$BA$ is $(3 \\times 2)(2 \\times 3)$: the middle numbers match, the outer ones give $3 \\times 3$.' },
      ],
    },
    {
      id: 'alg13-q5',
      type: 'numeric',
      prompt: 'Find the single element of $(2 \\quad -1 \\quad 3)\\begin{pmatrix} 4 \\\\ 5 \\\\ 1 \\end{pmatrix}$.',
      parts: [{ answer: { value: 6, display: '6' } }],
      solution: [
        { text: 'A $1 \\times 3$ times a $3 \\times 1$ is $1 \\times 1$: one row times one column.' },
        { math: '2(4) + (-1)(5) + 3(1) = 8 - 5 + 3 = 6' },
      ],
    },
    {
      id: 'alg13-q6',
      type: 'matrix',
      prompt: `Find $${M([
        [1, 2],
        [0, 1],
      ])}${M([
        [3, 0],
        [1, 2],
      ])}$.`,
      parts: [
        {
          answer: {
            cells: [
              [5, 4],
              [1, 2],
            ],
          },
        },
      ],
      solution: [
        {
          math: `${M([
            ['3+2', '0+4'],
            ['0+1', '0+2'],
          ])} = ${M([
            [5, 4],
            [1, 2],
          ])}`,
        },
      ],
    },
    {
      id: 'alg13-q7',
      type: 'mcq',
      prompt: 'For matrices $A$ and $B$ where the products exist, which is always true?',
      options: ['$(AB)^T = B^T A^T$', '$AB = BA$', '$(AB)^T = A^T B^T$', '$AB = O$ means $A = O$ or $B = O$'],
      correct: 0,
      solution: [
        { text: 'The transpose of a product reverses the order. The other statements fail for many matrices.' },
      ],
    },
    {
      id: 'alg13-q8',
      type: 'numeric',
      prompt: `Solve $${M([
        [2, 1],
        [1, 3],
      ])}${M([['x'], ['y']])} = ${M([[5], [10]])}$.`,
      parts: [
        { label: '$x =$', answer: { value: 1, display: '1' } },
        { label: '$y =$', answer: { value: 3, display: '3' } },
      ],
      solution: [
        { text: 'Multiplying out: $2x + y = 5$ and $x + 3y = 10$.' },
        { text: 'From the first, $y = 5 - 2x$. Then $x + 15 - 6x = 10$, so $x = 1$ and $y = 3$.' },
      ],
    },
  ],
}
