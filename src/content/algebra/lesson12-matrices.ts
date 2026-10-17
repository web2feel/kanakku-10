import type { Lesson } from '../types'
import { matrixTex as M } from '../../lib/matrix'

const ex317 = [
  [8, 9, 4, 3],
  [-1, '√7', '√3/2', 5],
  [1, 4, 3, 0],
  [6, 8, -11, 1],
]

export const lesson12: Lesson = {
  id: 'matrices',
  number: 12,
  title: 'Matrices: order and types',
  summary: 'What a matrix is, its order, naming its entries, and the special kinds of matrix.',
  pages: '137–144',
  status: 'ready',

  learn: [
    {
      id: 'what',
      title: 'A table without the labels',
      blocks: [
        {
          t: 'p',
          text: 'Four friends list what is in their school bags. Written as a table, each person gets a row and each item gets a column:',
        },
        {
          t: 'table',
          head: ['', 'Story books', 'Notebooks', 'Pencils'],
          firstColHead: true,
          rows: [
            ['Vanitha', '12', '20', '4'],
            ['Radha', '27', '17', '6'],
            ['Gokul', '7', '11', '4'],
            ['Geetha', '10', '12', '5'],
          ],
        },
        {
          t: 'p',
          text: 'Drop the labels, keep the numbers in their places, and put brackets around them. That is a **matrix**:',
        },
        {
          t: 'math',
          tex: M([
            [12, 20, 4],
            [27, 17, 6],
            [7, 11, 4],
            [10, 12, 5],
          ]),
        },
        {
          t: 'p',
          text: 'A matrix is a rectangular arrangement of numbers (or expressions). The horizontal lines are **rows** and the vertical lines are **columns**. Matrices are named with capital letters such as $A$, $B$, $X$, and their entries, also called **elements**, with small letters.',
        },
        {
          t: 'note',
          tone: 'note',
          text: 'Matrices are everywhere in computing: a phone photo is a matrix of pixel values, 3D games use matrices to turn a scene onto a flat screen, and secret codes can be scrambled and unscrambled with matrix multiplication.',
        },
      ],
      check: {
        id: 'alg12-c-what',
        type: 'mcq',
        prompt: `How many columns does $${M([
          [4, 8, 0],
          [1, 9, -2],
        ])}$ have?`,
        options: ['2', '3', '6', '1'],
        correct: 1,
        solution: [{ text: 'Columns run up and down. There are three: 4 over 1, 8 over 9, and 0 over −2.' }],
      },
    },
    {
      id: 'order',
      title: 'The order of a matrix',
      blocks: [
        {
          t: 'p',
          text: 'A matrix with $m$ rows and $n$ columns has **order** $m \\times n$, read "$m$ by $n$". Rows always come first.',
        },
        {
          t: 'math',
          tex: `\\underbrace{${M([
            [4, 8, 0],
            [1, 9, -2],
          ])}}_{2 \\text{ rows},\\ 3 \\text{ columns}} \\quad\\text{has order } 2 \\times 3`,
        },
        {
          t: 'note',
          tone: 'tip',
          text: 'The $\\times$ in $2 \\times 3$ is not "times". The order is the pair (2 rows, 3 columns), and a $2 \\times 3$ matrix is a different shape from a $3 \\times 2$ one. But multiplying the two numbers does tell you how many elements there are: a $2 \\times 3$ matrix has 6.',
        },
        {
          t: 'p',
          text: 'The bag matrix above has 4 rows and 3 columns, so its order is $4 \\times 3$ and it holds 12 numbers.',
        },
      ],
      check: {
        id: 'alg12-c-order',
        type: 'mcq',
        prompt: `What is the order of $${M([['\\sin\\theta'], ['\\cos\\theta'], ['\\tan\\theta']])}$?`,
        options: ['$3 \\times 1$', '$1 \\times 3$', '$3 \\times 3$', '$1 \\times 1$'],
        correct: 0,
        solution: [{ text: 'It has 3 rows and 1 column. Rows first, so the order is $3 \\times 1$.' }],
      },
    },
    {
      id: 'naming',
      title: 'Naming an element: $a_{ij}$',
      blocks: [
        {
          t: 'p',
          text: 'Every element has an address. In matrix $A$, the element in row $i$ and column $j$ is called $a_{ij}$. So $a_{23}$ is in row 2, column 3. Again, the row comes first.',
        },
        {
          t: 'math',
          tex: 'A = \\begin{pmatrix} a_{11} & a_{12} & \\cdots & a_{1n} \\\\ a_{21} & a_{22} & \\cdots & a_{2n} \\\\ \\vdots & \\vdots & & \\vdots \\\\ a_{m1} & a_{m2} & \\cdots & a_{mn} \\end{pmatrix} = (a_{ij})_{m \\times n}',
        },
        {
          t: 'table',
          head: ['Matrix', 'Elements', 'Order'],
          rows: [
            [
              `$${M([
                ['\\sin\\theta', '-\\cos\\theta'],
                ['\\cos\\theta', '\\sin\\theta'],
              ])}$`,
              '$a_{11} = \\sin\\theta,\\ a_{12} = -\\cos\\theta,$ $a_{21} = \\cos\\theta,\\ a_{22} = \\sin\\theta$',
              '$2 \\times 2$',
            ],
            [
              `$${M([
                [1, 3],
                ['√2', 5],
                ['1/2', -4],
              ])}$`,
              '$a_{11} = 1,\\ a_{12} = 3,\\ a_{21} = \\sqrt2,$ $a_{22} = 5,\\ a_{31} = \\tfrac12,\\ a_{32} = -4$',
              '$3 \\times 2$',
            ],
          ],
        },
        {
          t: 'note',
          tone: 'tip',
          text: 'Read $a_{32}$ as "a three two", not "a thirty-two". The two small numbers are separate: row 3, column 2.',
        },
      ],
      check: {
        id: 'alg12-c-naming',
        type: 'numeric',
        prompt: `In $A = ${M([
          [1, -2, 3],
          [2, 1, 5],
        ])}$, what is $a_{23}$?`,
        parts: [{ answer: { value: 5, display: '5' } }],
        hints: ['Go to row 2, then along to column 3.'],
        solution: [{ text: 'Row 2 is $2,\\ 1,\\ 5$. Its third entry is 5, so $a_{23} = 5$.' }],
      },
    },
    {
      id: 'possible-orders',
      title: 'How many shapes can a matrix take?',
      blocks: [
        {
          t: 'p',
          text: 'An $m \\times n$ matrix holds $mn$ elements. So if you know the number of elements, every pair of whole numbers that multiplies to it gives a possible order.',
        },
        {
          t: 'p',
          text: 'For 16 elements: $1 \\times 16$, $16 \\times 1$, $2 \\times 8$, $8 \\times 2$ and $4 \\times 4$. That is 5 orders.',
        },
        {
          t: 'note',
          tone: 'think',
          title: 'Activity 5',
          text: 'The number of possible orders is the number of factors of the element count. Factors pair up ($2$ with $8$), so the count is even, except for a perfect square, where one factor pairs with itself ($4 \\times 4$) and the count is odd. A prime number has exactly 2 orders.',
        },
      ],
      check: {
        id: 'alg12-c-orders',
        type: 'numeric',
        prompt: 'A matrix has 20 elements. How many different orders can it have?',
        parts: [{ answer: { value: 6, display: '6' } }],
        hints: ['List the factor pairs of 20, and count each pair both ways round.'],
        solution: [
          { text: 'Factor pairs of 20: $1 \\times 20$, $2 \\times 10$, $4 \\times 5$.' },
          {
            text: 'Each gives two orders: $1 \\times 20$, $20 \\times 1$, $2 \\times 10$, $10 \\times 2$, $4 \\times 5$, $5 \\times 4$. That is 6.',
          },
        ],
      },
    },
    {
      id: 'rule',
      title: 'Building a matrix from a rule',
      blocks: [
        {
          t: 'p',
          text: "Sometimes a matrix is described by a formula for $a_{ij}$ instead of a list of numbers. To build it, put each element's own row number $i$ and column number $j$ into the formula.",
        },
        {
          t: 'p',
          text: 'For a $2 \\times 2$ matrix with $a_{ij} = i + j$:',
        },
        {
          t: 'math',
          tex: 'a_{11} = 1+1 = 2,\\quad a_{12} = 1+2 = 3,\\quad a_{21} = 2+1 = 3,\\quad a_{22} = 2+2 = 4 \\;\\Rightarrow\\; A = \\begin{pmatrix} 2 & 3 \\\\ 3 & 4 \\end{pmatrix}',
        },
        {
          t: 'note',
          tone: 'tip',
          text: 'Work row by row and write each small calculation down. Most mistakes come from swapping $i$ and $j$.',
        },
      ],
      check: {
        id: 'alg12-c-rule',
        type: 'numeric',
        prompt: 'A $3 \\times 3$ matrix has $a_{ij} = 2i - j$. What is $a_{32}$?',
        parts: [{ answer: { value: 4, display: '4' } }],
        hints: ['In $a_{32}$, $i = 3$ and $j = 2$.'],
        solution: [{ math: 'a_{32} = 2(3) - 2 = 4' }],
      },
    },
    {
      id: 'shapes',
      title: 'Row, column and square matrices',
      blocks: [
        {
          t: 'table',
          head: ['Type', 'What it means', 'Example'],
          rows: [
            [
              '**Row matrix** (row vector)',
              'Only one row: order $1 \\times n$',
              `$${M([[8, 9, 4, 3]])}$ is $1 \\times 4$`,
            ],
            [
              '**Column matrix** (column vector)',
              'Only one column: order $m \\times 1$',
              `$${M([['√5'], [7]])}$ is $2 \\times 1$`,
            ],
            [
              '**Square matrix**',
              'As many rows as columns: order $n \\times n$',
              `$${M([
                [1, 3],
                [4, 5],
              ])}$ is $2 \\times 2$`,
            ],
          ],
        },
        {
          t: 'p',
          text: 'In a square matrix, the elements $a_{11}, a_{22}, a_{33}, \\ldots$ run from the top left to the bottom right. They form the **leading diagonal**. In $\\begin{pmatrix} 1 & 3 \\\\ 4 & 5 \\end{pmatrix}$ the leading diagonal is 1 and 5.',
        },
        {
          t: 'note',
          tone: 'tip',
          text: 'A matrix that is not square is sometimes called a **rectangular** matrix.',
        },
      ],
      check: {
        id: 'alg12-c-shapes',
        type: 'mcq',
        prompt: 'Can a square matrix have exactly 32 elements?',
        options: [
          'Yes, a $4 \\times 8$ matrix',
          'Yes, a $16 \\times 16$ matrix',
          'No, because 32 is not a perfect square',
          'No, because 32 is even',
        ],
        correct: 2,
        solution: [
          {
            text: 'A square matrix of order $n \\times n$ has $n^2$ elements. $5^2 = 25$ and $6^2 = 36$, so no whole number squares to 32. ($4 \\times 8$ has 32 elements, but it is not square.)',
          },
        ],
      },
    },
    {
      id: 'diagonal',
      title: 'Diagonal, scalar, identity, zero and triangular',
      blocks: [
        {
          t: 'p',
          text: 'These types are all about where the zeros are. Except for the zero matrix, each is a **square** matrix.',
        },
        {
          t: 'table',
          head: ['Type', 'Rule', 'Example'],
          rows: [
            [
              '**Diagonal**',
              'Every element off the leading diagonal is 0 (the diagonal itself is not all 0)',
              `$${M([
                [8, 0, 0],
                [0, -3, 0],
                [0, 0, 11],
              ])}$`,
            ],
            [
              '**Scalar**',
              'Diagonal, with every diagonal element the same',
              `$${M([
                [5, 0, 0],
                [0, 5, 0],
                [0, 0, 5],
              ])}$`,
            ],
            [
              '**Identity** (unit), $I_n$',
              'Scalar, with every diagonal element equal to 1',
              `$I_2 = ${M([
                [1, 0],
                [0, 1],
              ])}$`,
            ],
            [
              '**Zero** (null), $O$',
              'Every element is 0. It can be any order.',
              `$${M([
                [0, 0, 0],
                [0, 0, 0],
              ])}$`,
            ],
            [
              '**Upper triangular**',
              'Every element **below** the leading diagonal is 0',
              `$${M([
                [1, 7, -3],
                [0, 2, 4],
                [0, 0, 7],
              ])}$`,
            ],
            [
              '**Lower triangular**',
              'Every element **above** the leading diagonal is 0',
              `$${M([
                [8, 0, 0],
                [4, 5, 0],
                [-11, 3, 1],
              ])}$`,
            ],
          ],
        },
        {
          t: 'note',
          tone: 'think',
          text: 'The types nest inside each other: every identity matrix is a scalar matrix, and every scalar matrix is a diagonal matrix. A diagonal matrix is upper and lower triangular at the same time.',
        },
      ],
      check: {
        id: 'alg12-c-diagonal',
        type: 'mcq',
        prompt: 'Which of these is a scalar matrix?',
        options: [
          `$${M([
            [3, 0],
            [0, 3],
          ])}$`,
          `$${M([
            [3, 0],
            [0, 1],
          ])}$`,
          `$${M([
            [3, 3],
            [0, 3],
          ])}$`,
          `$${M([[3, 3]])}$`,
        ],
        correct: 0,
        solution: [
          {
            text: 'A scalar matrix is diagonal (zeros off the diagonal) with equal diagonal elements. Only the first one has both. The second is diagonal but its diagonal elements differ; the third has a non-zero element off the diagonal; the fourth is not square.',
          },
        ],
      },
    },
    {
      id: 'transpose',
      title: 'Transpose, equal and negative matrices',
      blocks: [
        {
          t: 'p',
          text: 'The **transpose** of $A$, written $A^T$, swaps rows and columns: row 1 of $A$ becomes column 1 of $A^T$, and so on. The element $a_{ij}$ moves to position $(j, i)$.',
        },
        {
          t: 'math',
          tex: `B = ${M([
            [1, 5],
            [8, 9],
            [4, 3],
          ])}_{3 \\times 2} \\quad\\Rightarrow\\quad B^T = ${M([
            [1, 8, 4],
            [5, 9, 3],
          ])}_{2 \\times 3}`,
        },
        {
          t: 'p',
          text: 'If $A$ is $m \\times n$, then $A^T$ is $n \\times m$. Transposing twice gets you back where you started: $(A^T)^T = A$.',
        },
        {
          t: 'p',
          text: 'Two matrices are **equal** when they have the same order and every pair of elements in the same place is equal ($a_{ij} = b_{ij}$ for all $i, j$). The **negative** $-A$ changes the sign of every element of $A$.',
        },
        {
          t: 'note',
          tone: 'tip',
          text: 'Equal matrices are a quick source of equations: if two matrices are equal, you can write one equation for each position. Examples 3.59 and Exercise 3.17 Q7 use exactly this.',
        },
      ],
      check: {
        id: 'alg12-c-transpose',
        type: 'mcq',
        prompt: 'If $A$ is a $2 \\times 5$ matrix, what is the order of $A^T$?',
        options: ['$2 \\times 5$', '$5 \\times 2$', '$5 \\times 5$', '$2 \\times 2$'],
        correct: 1,
        solution: [{ text: 'Transposing swaps rows and columns, so $2 \\times 5$ becomes $5 \\times 2$.' }],
      },
    },
  ],

  explore: [
    {
      widget: 'matrix-types',
      title: 'Matrix type detector',
      intro:
        'Change the size and the numbers and watch which types the matrix belongs to. Its transpose is drawn beside it. Point at an entry to see where it lands in $A^T$.',
      tryThis: [
        'Press "Identity". How many types does it belong to? Now change one 1 into a 2.',
        'Make a $3 \\times 3$ matrix that is upper triangular but not diagonal.',
        'Make $A$ equal to its own transpose. Which entries have to match?',
      ],
    },
    {
      widget: 'aij-builder',
      title: 'Build a matrix from a rule',
      intro:
        'Choose a formula for $a_{ij}$ and fill the matrix one entry at a time. The working for each entry appears below it, just as you would write it in your notebook.',
      tryThis: [
        'Use $a_{ij} = i^2 j^2$ on a $3 \\times 3$ matrix and compare with Example 3.58.',
        'Which rules give a matrix that equals its own transpose? Why?',
        'With $a_{ij} = i - j$, what do you notice about the leading diagonal?',
      ],
    },
    {
      widget: 'order-finder',
      title: 'Possible orders',
      intro:
        'Slide to choose how many elements a matrix has. Every way of arranging the dots in a rectangle is a possible order.',
      tryThis: [
        'Find a number of elements with exactly 2 possible orders. What kind of number is it?',
        'Which numbers up to 36 give an odd number of orders?',
        'Which number up to 36 has the most possible orders?',
      ],
    },
  ],

  examples: [
    {
      id: 'alg12-ex56',
      source: 'Example 3.56',
      title: 'Factory workers as a matrix',
      prompt:
        'Three factories employ men and women as follows. Factory I: 23 men, 18 women. Factory II: 47 men, 36 women. Factory III: 15 men, 16 women. Write this as a matrix. What does the entry in the second row and first column mean?',
      steps: [
        { text: 'Give each factory a row and each group of workers a column: men first, then women.' },
        {
          math: `A = ${M([
            [23, 18],
            [47, 36],
            [15, 16],
          ])}`,
        },
        { text: 'There are 3 rows and 2 columns, so $A$ is a $3 \\times 2$ matrix.' },
        { text: 'Row 2 is Factory II and column 1 is men, so $a_{21} = 47$ is the number of men in Factory II.' },
      ],
      answer: '$A$ is $3 \\times 2$, and $a_{21} = 47$ means Factory II has 47 men workers.',
    },
    {
      id: 'alg12-ex57',
      source: 'Example 3.57',
      title: 'Possible orders for 16 elements',
      prompt: 'A matrix has 16 elements. What are its possible orders?',
      steps: [
        { text: 'An $m \\times n$ matrix has $mn$ elements, so we need pairs of natural numbers with $mn = 16$.' },
        { text: 'The pairs are $(1, 16)$, $(16, 1)$, $(2, 8)$, $(8, 2)$ and $(4, 4)$.' },
      ],
      answer: '$1 \\times 16$, $16 \\times 1$, $2 \\times 8$, $8 \\times 2$ and $4 \\times 4$.',
    },
    {
      id: 'alg12-ex58',
      source: 'Example 3.58',
      title: 'A matrix from the rule $a_{ij} = i^2 j^2$',
      prompt: 'Construct a $3 \\times 3$ matrix whose elements are $a_{ij} = i^2 j^2$.',
      steps: [
        { text: 'Row 1 ($i = 1$):' },
        {
          math: 'a_{11} = 1^2 \\times 1^2 = 1,\\quad a_{12} = 1^2 \\times 2^2 = 4,\\quad a_{13} = 1^2 \\times 3^2 = 9',
        },
        { text: 'Row 2 ($i = 2$):' },
        {
          math: 'a_{21} = 2^2 \\times 1^2 = 4,\\quad a_{22} = 2^2 \\times 2^2 = 16,\\quad a_{23} = 2^2 \\times 3^2 = 36',
        },
        { text: 'Row 3 ($i = 3$):' },
        {
          math: 'a_{31} = 3^2 \\times 1^2 = 9,\\quad a_{32} = 3^2 \\times 2^2 = 36,\\quad a_{33} = 3^2 \\times 3^2 = 81',
        },
      ],
      answer: `$A = ${M([
        [1, 4, 9],
        [4, 16, 36],
        [9, 36, 81],
      ])}$`,
    },
    {
      id: 'alg12-ex59',
      source: 'Example 3.59',
      title: 'Unknowns from equal matrices',
      prompt: `Find $a$, $b$, $c$ and $d$ if $${M([
        ['a-b', '2a+c'],
        ['2a-b', '3c+d'],
      ])} = ${M([
        [1, 5],
        [0, 2],
      ])}$.`,
      steps: [
        { text: 'Equal matrices have equal elements in every position. That gives four equations:' },
        { math: 'a - b = 1 \\;(1) \\qquad 2a + c = 5 \\;(2) \\qquad 2a - b = 0 \\;(3) \\qquad 3c + d = 2 \\;(4)' },
        { text: 'From (3), $b = 2a$. Put this into (1): $a - 2a = 1$, so $a = -1$.' },
        { text: 'Then $b = 2a = -2$.' },
        { text: 'From (2): $2(-1) + c = 5$, so $c = 7$.' },
        { text: 'From (4): $3(7) + d = 2$, so $d = -19$.' },
      ],
      answer: '$a = -1,\\ b = -2,\\ c = 7,\\ d = -19$',
    },
    {
      id: 'alg12-equal',
      source: 'Section 3.9.2',
      title: 'Matrices that look different but are equal',
      prompt: `Are $A = ${M([
        [5, 1],
        [0, 3],
      ])}$ and $B = \\begin{pmatrix} 1^2 + 2^2 & \\sin^2\\theta + \\cos^2\\theta \\\\ 1 + \\frac32 - \\frac52 & 2 + \\sec^2\\theta - \\tan^2\\theta \\end{pmatrix}$ equal?`,
      steps: [
        { text: 'Both are $2 \\times 2$, so they have the same order. Now work out each element of $B$.' },
        { math: '1^2 + 2^2 = 5 \\qquad \\sin^2\\theta + \\cos^2\\theta = 1' },
        { math: '1 + \\tfrac32 - \\tfrac52 = 0 \\qquad 2 + (\\sec^2\\theta - \\tan^2\\theta) = 2 + 1 = 3' },
        { text: 'Every element of $B$ matches the element of $A$ in the same place.' },
      ],
      answer: 'Yes. Same order and $a_{ij} = b_{ij}$ for every $i, j$, so $A = B$.',
    },
  ],

  practice: [
    {
      id: 'alg12-p1',
      source: 'Exercise 3.17 · Q1 (i), (ii)',
      type: 'numeric',
      prompt: `For $A = ${M(ex317)}$, find the number of elements and the order of $A$.`,
      parts: [
        { label: 'Number of elements:', answer: { value: 16, display: '16' } },
        { label: 'Number of rows:', answer: { value: 4, display: '4' } },
        { label: 'Number of columns:', answer: { value: 4, display: '4' } },
      ],
      hints: ['Count the rows and the columns. The number of elements is rows × columns.'],
      solution: [
        { text: '$A$ has 4 rows and 4 columns, so its order is $4 \\times 4$.' },
        { text: 'It has $4 \\times 4 = 16$ elements.' },
      ],
    },
    {
      id: 'alg12-p2',
      source: 'Exercise 3.17 · Q1 (iii)',
      type: 'numeric',
      prompt: `For $A = ${M(ex317)}$, write the elements $a_{22}$, $a_{23}$, $a_{24}$, $a_{34}$, $a_{43}$, $a_{44}$.`,
      parts: [
        { label: '$a_{22}$', answer: { value: Math.sqrt(7), display: '√7', tol: 0.005 } },
        { label: '$a_{23}$', answer: { value: Math.sqrt(3) / 2, display: '√3/2', tol: 0.005 } },
        { label: '$a_{24}$', answer: { value: 5, display: '5' } },
        { label: '$a_{34}$', answer: { value: 0, display: '0' } },
        { label: '$a_{43}$', answer: { value: -11, display: '-11' } },
        { label: '$a_{44}$', answer: { value: 1, display: '1' } },
      ],
      hints: [
        'The first small number is the row, the second is the column.',
        'Row 2 is $-1,\\ \\sqrt7,\\ \\tfrac{\\sqrt3}{2},\\ 5$.',
      ],
      solution: [
        {
          text: 'Row 2 is $-1,\\ \\sqrt7,\\ \\tfrac{\\sqrt3}{2},\\ 5$, so $a_{22} = \\sqrt7$, $a_{23} = \\tfrac{\\sqrt3}{2}$, $a_{24} = 5$.',
        },
        { text: 'Row 3 is $1,\\ 4,\\ 3,\\ 0$, so $a_{34} = 0$.' },
        { text: 'Row 4 is $6,\\ 8,\\ -11,\\ 1$, so $a_{43} = -11$ and $a_{44} = 1$.' },
      ],
    },
    {
      id: 'alg12-p3',
      source: 'Exercise 3.17 · Q2',
      type: 'numeric',
      prompt: 'If a matrix has 18 elements, how many possible orders can it have? How many if it has 6 elements?',
      parts: [
        { label: 'With 18 elements:', answer: { value: 6, display: '6' } },
        { label: 'With 6 elements:', answer: { value: 4, display: '4' } },
      ],
      hints: [
        'Find every pair of whole numbers that multiplies to 18. Count $2 \\times 9$ and $9 \\times 2$ separately.',
      ],
      solution: [
        { text: '$18 = 1 \\times 18 = 2 \\times 9 = 3 \\times 6$.' },
        {
          text: 'Orders: $1 \\times 18$, $18 \\times 1$, $2 \\times 9$, $9 \\times 2$, $3 \\times 6$, $6 \\times 3$. That is 6.',
        },
        {
          text: '$6 = 1 \\times 6 = 2 \\times 3$, giving $1 \\times 6$, $6 \\times 1$, $2 \\times 3$, $3 \\times 2$. That is 4.',
        },
      ],
    },
    {
      id: 'alg12-p4',
      source: 'Exercise 3.17 · Q3 (i)',
      type: 'matrix',
      prompt: 'Construct a $3 \\times 3$ matrix whose elements are $a_{ij} = |i - 2j|$.',
      parts: [
        {
          answer: {
            cells: [
              [1, 3, 5],
              [0, 2, 4],
              [1, 1, 3],
            ],
          },
        },
      ],
      hints: ['$a_{11} = |1 - 2(1)| = |-1| = 1$. The bars make every answer positive.'],
      solution: [
        { math: 'a_{11} = |1-2| = 1,\\quad a_{12} = |1-4| = 3,\\quad a_{13} = |1-6| = 5' },
        { math: 'a_{21} = |2-2| = 0,\\quad a_{22} = |2-4| = 2,\\quad a_{23} = |2-6| = 4' },
        { math: 'a_{31} = |3-2| = 1,\\quad a_{32} = |3-4| = 1,\\quad a_{33} = |3-6| = 3' },
      ],
    },
    {
      id: 'alg12-p5',
      source: 'Exercise 3.17 · Q3 (ii)',
      type: 'matrix',
      prompt: 'Construct a $3 \\times 3$ matrix whose elements are $a_{ij} = \\dfrac{(i + j)^3}{3}$.',
      parts: [
        {
          answer: {
            cells: [
              ['8/3', 9, '64/3'],
              [9, '64/3', '125/3'],
              ['64/3', '125/3', 72],
            ],
          },
        },
      ],
      hints: [
        'Only $i + j$ matters, and it is 2, 3, 4, 5 or 6. Work out $\\tfrac{2^3}{3}$, $\\tfrac{3^3}{3}$, … once each.',
        'Type fractions with a slash, such as 8/3.',
      ],
      solution: [
        { math: 'i+j = 2: \\tfrac{8}{3} \\qquad i+j = 3: \\tfrac{27}{3} = 9 \\qquad i+j = 4: \\tfrac{64}{3}' },
        { math: 'i+j = 5: \\tfrac{125}{3} \\qquad i+j = 6: \\tfrac{216}{3} = 72' },
        { text: 'Place each value where $i + j$ has that sum. Entries along each anti-diagonal are equal.' },
      ],
    },
    {
      id: 'alg12-p6',
      source: 'Exercise 3.17 · Q4',
      type: 'matrix',
      prompt: `If $A = ${M([
        [5, 4, 3],
        [1, -7, 9],
        [3, 8, 2],
      ])}$, find the transpose of $A$.`,
      parts: [
        {
          label: '$A^T =$',
          answer: {
            cells: [
              [5, 1, 3],
              [4, -7, 8],
              [3, 9, 2],
            ],
          },
        },
      ],
      hints: ['Write row 1 of $A$ as column 1 of $A^T$, and so on.'],
      solution: [
        {
          text: 'Row 1 of $A$ ($5, 4, 3$) becomes column 1, row 2 ($1, -7, 9$) becomes column 2, row 3 ($3, 8, 2$) becomes column 3.',
        },
        {
          math: `A^T = ${M([
            [5, 1, 3],
            [4, -7, 8],
            [3, 9, 2],
          ])}`,
        },
      ],
    },
    {
      id: 'alg12-p7',
      source: 'Exercise 3.17 · Q5',
      type: 'matrix',
      prompt: `If $A = ${M([
        ['√7', -3],
        ['-√5', 2],
        ['√3', -5],
      ])}$, find the transpose of $-A$.`,
      parts: [
        {
          label: '$(-A)^T =$',
          answer: {
            cells: [
              ['-√7', '√5', '-√3'],
              [3, -2, 5],
            ],
          },
        },
      ],
      hints: [
        'First change the sign of every element to get $-A$. Then turn its rows into columns.',
        'The answer is $2 \\times 3$. Type roots like -√7 using the √ key or sqrt(7).',
      ],
      solution: [
        {
          math: `-A = ${M([
            ['-√7', 3],
            ['√5', -2],
            ['-√3', 5],
          ])}`,
        },
        {
          math: `(-A)^T = ${M([
            ['-√7', '√5', '-√3'],
            [3, -2, 5],
          ])}`,
        },
      ],
    },
    {
      id: 'alg12-p8',
      source: 'Exercise 3.17 · Q6',
      type: 'matrix',
      prompt: `If $A = ${M([
        [5, 2, 2],
        ['-√17', 0.7, '5/2'],
        [8, 3, 1],
      ])}$, write $A^T$. Then check that $(A^T)^T = A$.`,
      parts: [
        {
          label: '$A^T =$',
          answer: {
            cells: [
              [5, '-√17', 8],
              [2, 0.7, 3],
              [2, '5/2', 1],
            ],
          },
        },
      ],
      hints: ['Columns of $A$ become rows of $A^T$: the first row of $A^T$ is $5, -\\sqrt{17}, 8$.'],
      solution: [
        {
          math: `A^T = ${M([
            [5, '-√17', 8],
            [2, 0.7, 3],
            [2, '5/2', 1],
          ])}`,
        },
        {
          text: 'Transpose again: the rows of $A^T$ become columns, which puts every element back where it started. So $(A^T)^T = A$.',
        },
      ],
    },
    {
      id: 'alg12-p9',
      source: 'Exercise 3.17 · Q7 (i)',
      type: 'numeric',
      prompt: `Find $x$, $y$ and $z$ if $${M([
        [12, 3],
        ['x', 5],
      ])} = ${M([
        ['y', 'z'],
        [3, 5],
      ])}$.`,
      parts: [
        { label: '$x =$', answer: { value: 3, display: '3' } },
        { label: '$y =$', answer: { value: 12, display: '12' } },
        { label: '$z =$', answer: { value: 3, display: '3' } },
      ],
      hints: ['Match each position: top left with top left, and so on.'],
      solution: [{ text: 'Equal matrices have equal elements in each position: $12 = y$, $3 = z$, $x = 3$, $5 = 5$.' }],
    },
    {
      id: 'alg12-p10',
      source: 'Exercise 3.17 · Q7 (ii)',
      type: 'numeric',
      prompt: `Find $x$, $y$ and $z$ if $${M([
        ['x+y', 2],
        ['5+z', 'xy'],
      ])} = ${M([
        [6, 2],
        [5, 8],
      ])}$.`,
      parts: [
        { label: '$x =$', answer: { value: 4, display: '4' } },
        { label: '$y =$', answer: { value: 2, display: '2' } },
        { label: '$z =$', answer: { value: 0, display: '0' } },
      ],
      alternatives: [
        [
          { value: 2, display: '2' },
          { value: 4, display: '4' },
          { value: 0, display: '0' },
        ],
      ],
      hints: [
        'You get $x + y = 6$ and $xy = 8$. Which two numbers add to 6 and multiply to 8?',
        'There are two answers. Either one is accepted.',
      ],
      solution: [
        { text: 'Matching positions: $x + y = 6$, $5 + z = 5$ and $xy = 8$.' },
        { text: 'So $z = 0$.' },
        { text: 'Two numbers with sum 6 and product 8 are 4 and 2. So $x = 4, y = 2$ or $x = 2, y = 4$.' },
      ],
    },
    {
      id: 'alg12-p11',
      source: 'Exercise 3.17 · Q7 (iii)',
      type: 'numeric',
      prompt: `Find $x$, $y$ and $z$ if $${M([['x+y+z'], ['x+z'], ['y+z']])} = ${M([[9], [5], [7]])}$.`,
      parts: [
        { label: '$x =$', answer: { value: 2, display: '2' } },
        { label: '$y =$', answer: { value: 4, display: '4' } },
        { label: '$z =$', answer: { value: 3, display: '3' } },
      ],
      hints: ['Subtract the second equation from the first to get $y$ straight away.'],
      solution: [
        { text: 'The equations are $x + y + z = 9$, $x + z = 5$, $y + z = 7$.' },
        { text: 'First minus second: $y = 9 - 5 = 4$.' },
        { text: 'Then $z = 7 - y = 3$ and $x = 5 - z = 2$.' },
      ],
    },
    {
      id: 'alg12-p12',
      source: 'Progress Check · page 138',
      type: 'numeric',
      prompt: `Write $a_{11}$, $a_{22}$, $a_{33}$ and $a_{44}$ for $${M([
        [2, 1, 3, 4],
        [5, 9, -4, '√7'],
        [3, '5/2', 8, 9],
        [7, 0, 1, 4],
      ])}$.`,
      parts: [
        { label: '$a_{11}$', answer: { value: 2, display: '2' } },
        { label: '$a_{22}$', answer: { value: 9, display: '9' } },
        { label: '$a_{33}$', answer: { value: 8, display: '8' } },
        { label: '$a_{44}$', answer: { value: 4, display: '4' } },
      ],
      hints: ['These four elements make up the leading diagonal, from top left to bottom right.'],
      solution: [{ text: 'Read down the leading diagonal: $a_{11} = 2$, $a_{22} = 9$, $a_{33} = 8$, $a_{44} = 4$.' }],
    },
    {
      id: 'alg12-p13',
      source: 'Progress Check · page 142',
      type: 'mcq',
      prompt: 'The non-diagonal elements in any unit matrix are',
      options: ['0', '1', 'equal to the diagonal elements', 'any numbers'],
      correct: 0,
      solution: [{ text: 'A unit (identity) matrix has 1 on the leading diagonal and 0 everywhere else.' }],
    },
  ],

  quiz: [
    {
      id: 'alg12-q1',
      type: 'mcq',
      prompt: `What is the order of $${M([
        [1, 0, -2, 5],
        [3, 7, 1, 0],
      ])}$?`,
      options: ['$2 \\times 4$', '$4 \\times 2$', '$8$', '$2 \\times 2$'],
      correct: 0,
      solution: [{ text: '2 rows and 4 columns, rows first: $2 \\times 4$.' }],
    },
    {
      id: 'alg12-q2',
      type: 'numeric',
      prompt: 'A $3 \\times 3$ matrix has $a_{ij} = i \\times j$. What is the sum of its leading diagonal elements?',
      parts: [{ answer: { value: 14, display: '14' } }],
      solution: [
        { text: 'The leading diagonal is $a_{11}, a_{22}, a_{33}$.' },
        { math: '1 \\times 1 + 2 \\times 2 + 3 \\times 3 = 1 + 4 + 9 = 14' },
      ],
    },
    {
      id: 'alg12-q3',
      type: 'mcq',
      prompt: 'Which of these is an upper triangular matrix?',
      options: [
        `$${M([
          [2, 0],
          [5, 3],
        ])}$`,
        `$${M([
          [2, 5],
          [0, 3],
        ])}$`,
        `$${M([
          [0, 5],
          [2, 3],
        ])}$`,
        `$${M([[2, 5, 3]])}$`,
      ],
      correct: 1,
      solution: [
        {
          text: 'Upper triangular means every element **below** the leading diagonal is 0. Only $\\begin{pmatrix} 2 & 5 \\\\ 0 & 3 \\end{pmatrix}$ has a 0 below the diagonal. The first is lower triangular.',
        },
      ],
    },
    {
      id: 'alg12-q4',
      type: 'numeric',
      prompt: 'How many possible orders can a matrix with 24 elements have?',
      parts: [{ answer: { value: 8, display: '8' } }],
      solution: [
        { text: '$24 = 1 \\times 24 = 2 \\times 12 = 3 \\times 8 = 4 \\times 6$.' },
        { text: 'Each pair gives two orders, so there are $4 \\times 2 = 8$.' },
      ],
    },
    {
      id: 'alg12-q5',
      type: 'mcq',
      prompt: 'The transpose of the row matrix $\\begin{pmatrix} 2 & -1 & 5 \\end{pmatrix}$ is',
      options: ['a row matrix', 'a column matrix', 'a square matrix', 'a zero matrix'],
      correct: 1,
      solution: [{ text: 'Its one row becomes one column, so the transpose is the $3 \\times 1$ column matrix.' }],
    },
    {
      id: 'alg12-q6',
      type: 'numeric',
      prompt: `Find $x$ and $y$ if $${M([
        ['x+y', 4],
        [3, 'x-y'],
      ])} = ${M([
        [9, 4],
        [3, 1],
      ])}$.`,
      parts: [
        { label: '$x =$', answer: { value: 5, display: '5' } },
        { label: '$y =$', answer: { value: 4, display: '4' } },
      ],
      solution: [
        { text: 'Matching positions: $x + y = 9$ and $x - y = 1$.' },
        { text: 'Adding: $2x = 10$, so $x = 5$ and $y = 4$.' },
      ],
    },
    {
      id: 'alg12-q7',
      type: 'mcq',
      prompt: 'Every identity matrix is also',
      options: ['a scalar matrix', 'a zero matrix', 'a row matrix', 'a non-square matrix'],
      correct: 0,
      solution: [
        {
          text: 'An identity matrix is diagonal with every diagonal element equal (to 1), which is exactly a scalar matrix.',
        },
      ],
    },
    {
      id: 'alg12-q8',
      type: 'matrix',
      prompt: 'Construct the $2 \\times 3$ matrix with $a_{ij} = i + 2j$.',
      parts: [
        {
          answer: {
            cells: [
              [3, 5, 7],
              [4, 6, 8],
            ],
          },
        },
      ],
      solution: [
        { math: 'a_{11} = 1 + 2 = 3,\\quad a_{12} = 1 + 4 = 5,\\quad a_{13} = 1 + 6 = 7' },
        { math: 'a_{21} = 2 + 2 = 4,\\quad a_{22} = 2 + 4 = 6,\\quad a_{23} = 2 + 6 = 8' },
      ],
    },
  ],
}
