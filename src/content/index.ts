import type { Lesson, Unit } from './types'
import { lesson1 } from './trigonometry/lesson1-ratios'
import { lesson2 } from './trigonometry/lesson2-identities'
import { lesson3 } from './trigonometry/lesson3-proving'
import { lesson4 } from './trigonometry/lesson4-elevation'
import { lesson5 } from './trigonometry/lesson5-depression'
import { lesson6 } from './trigonometry/lesson6-both'
import { lesson7 } from './trigonometry/lesson7-review'
import { lesson12 } from './algebra/lesson12-matrices'
import { lesson13 } from './algebra/lesson13-operations'
import { lesson14 } from './algebra/lesson14-review'
import { lesson1 as geo1 } from './geometry/lesson1-similar'
import { lesson2 as geo2 } from './geometry/lesson2-construct-similar'
import { lesson3 as geo3 } from './geometry/lesson3-thales'
import { lesson4 as geo4 } from './geometry/lesson4-construct-triangles'
import { lesson5 as geo5 } from './geometry/lesson5-pythagoras'
import { lesson6 as geo6 } from './geometry/lesson6-tangents'
import { lesson7 as geo7 } from './geometry/lesson7-construct-tangents'
import { lesson8 as geo8 } from './geometry/lesson8-concurrency'
import { lesson9 as geo9 } from './geometry/lesson9-review'

const soon = (number: number, id: string, title: string, summary: string, pages: string): Lesson => ({
  id,
  number,
  title,
  summary,
  pages,
  status: 'soon',
  learn: [],
  explore: [],
  examples: [],
  practice: [],
  quiz: [],
})

const trigonometry: Unit = {
  id: 'trigonometry',
  number: 6,
  title: 'Trigonometry',
  blurb: 'Ratios, identities, and finding heights and distances you cannot measure directly.',
  pages: '239–268',
  lessons: [lesson1, lesson2, lesson3, lesson4, lesson5, lesson6, lesson7],
}

const algebra: Unit = {
  id: 'algebra',
  number: 3,
  title: 'Algebra',
  blurb: 'Linear equations in three variables, polynomials, quadratics and matrices.',
  pages: '85–159',
  lessons: [
    soon(
      1,
      'three-variables',
      'Linear equations in three variables',
      'Solving three equations by elimination.',
      '85–92',
    ),
    soon(2, 'gcd-lcm', 'GCD and LCM of polynomials', 'Common factors and multiples of polynomials.', '93–97'),
    soon(3, 'rational', 'Rational expressions', 'Reducing to lowest form and excluded values.', '98–99'),
    soon(
      4,
      'rational-operations',
      'Operations on rational expressions',
      'Multiplying, dividing, adding and subtracting.',
      '100–103',
    ),
    soon(5, 'square-root', 'Square root of polynomials', 'By factorising and by long division.', '103–106'),
    soon(6, 'quadratics', 'Quadratic equations', 'Zeroes, roots and forming an equation from its roots.', '106–109'),
    soon(
      7,
      'solving-quadratics',
      'Solving quadratic equations',
      'Factorising, completing the square and the formula.',
      '109–114',
    ),
    soon(8, 'quadratic-problems', 'Word problems with quadratics', 'Setting up and solving real problems.', '115–116'),
    soon(
      9,
      'nature-of-roots',
      'Nature of roots; roots and coefficients',
      'The discriminant, and the sum and product of roots.',
      '117–122',
    ),
    soon(10, 'variation', 'Graphs of variation', 'Direct and inverse variation on a graph.', '123–129'),
    soon(11, 'quadratic-graphs', 'Quadratic graphs', 'Drawing parabolas and solving equations with them.', '130–137'),
    lesson12,
    lesson13,
    lesson14,
  ],
}

const geometry: Unit = {
  id: 'geometry',
  number: 4,
  title: 'Geometry',
  blurb: 'Similar triangles, Thales theorem, Pythagoras theorem, tangents to circles and concurrency.',
  pages: '161–202',
  lessons: [geo1, geo2, geo3, geo4, geo5, geo6, geo7, geo8, geo9],
}

const comingUnit = (number: number, id: string, title: string, blurb: string): Unit => ({
  id,
  number,
  title,
  blurb,
  pages: '',
  lessons: [],
})

export const UNITS: Unit[] = [
  comingUnit(
    1,
    'relations-functions',
    'Relations and Functions',
    'Cartesian products, relations, and the different kinds of functions.',
  ),
  comingUnit(
    2,
    'numbers-sequences',
    'Numbers and Sequences',
    "Euclid's division lemma, modular arithmetic, AP, GP and series.",
  ),
  algebra,
  geometry,
  comingUnit(
    5,
    'coordinate-geometry',
    'Coordinate Geometry',
    'Area of a triangle, slope, and equations of straight lines.',
  ),
  trigonometry,
  comingUnit(7, 'mensuration', 'Mensuration', 'Surface area and volume of solids and combined solids.'),
  comingUnit(
    8,
    'statistics-probability',
    'Statistics and Probability',
    'Measures of dispersion and the algebra of events.',
  ),
]

export const findUnit = (id?: string) => UNITS.find((u) => u.id === id)
export const findLesson = (unit?: Unit, id?: string) => unit?.lessons.find((l) => l.id === id)
