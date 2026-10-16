import type { Lesson, Unit } from './types'
import { lesson1 } from './trigonometry/lesson1-ratios'
import { lesson4 } from './trigonometry/lesson4-elevation'

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
  lessons: [
    lesson1,
    soon(
      2,
      'identities',
      'The three fundamental identities',
      'Where sin²θ + cos²θ = 1 comes from, and its two partners.',
      '242–244',
    ),
    soon(3, 'proving', 'Proving identities', 'Techniques for Examples 6.1–6.17 and Exercise 6.1.', '244–250'),
    lesson4,
    soon(
      5,
      'depression',
      'Heights and distances: angle of depression',
      'Looking down from towers, lighthouses and aeroplanes.',
      '258–261',
    ),
    soon(6, 'both', 'Elevation and depression together', 'Problems that use both angles from one point.', '262–265'),
    soon(
      7,
      'review',
      'Chapter review',
      'Formula sheet, 15 multiple-choice questions and the Unit Exercise.',
      '265–268',
    ),
  ],
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
  comingUnit(3, 'algebra', 'Algebra', 'Linear equations in three variables, polynomials, quadratics and matrices.'),
  comingUnit(4, 'geometry', 'Geometry', 'Similar triangles, Thales theorem, Pythagoras theorem and circles.'),
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
