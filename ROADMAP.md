# Roadmap

Progress of the Class 10 Mathematics tutor (Tamil Nadu State Board, English medium).
Each lesson is built on its own branch (`lesson/<unit>-<lesson>-<name>`) and merged through a pull request.

**Legend:** ✅ done · 🚧 in progress · ⬜ not started

## Platform

| Item | Status | Notes |
|---|---|---|
| App shell, routing, responsive layout (dark theme) | ✅ | Hash routing, works on any static host |
| Lesson template: Learn, Explore, Examples, Practice, Quiz | ✅ | |
| Scene diagrams with step highlighting | ✅ | `src/components/Scene.tsx` |
| Answer checking (decimals, fractions, √, units) | ✅ | `src/lib/answers.ts` |
| Progress saved in the browser | ✅ | Per device |
| Content validation script | ✅ | `npm run check:content` |
| CI (type-check, content check, build) | ✅ | `.github/workflows/ci.yml` |
| Netlify deployment (CLI + GitHub Actions) | ✅ | Needs Netlify secrets, see README |
| Visual design: Astro design system | ✅ | `design/astro.design.md`; tokens and adaptations in `src/index.css` |
| Code-split lessons to speed up first load | ⬜ | Bundle is ~410 KB gzipped |
| Identity checker tool (for Lesson 6.3) | ⬜ | |
| Logins and cross-device progress | ⬜ | Later |
| AI helper ("explain differently") | ⬜ | Later, needs the Claude API |

## Unit 6 · Trigonometry (pages 239–268)

| # | Lesson | Status | Textbook coverage |
|---|---|---|---|
| 6.1 | Trigonometric ratios refresher | ✅ | Recall, complementary angles, standard values, Thinking Corner p.242, Progress Check Q1, Q5–Q8 |
| 6.2 | The three fundamental identities | ⬜ | Section 6.2, Activity 1 |
| 6.3 | Proving identities | ⬜ | Examples 6.1–6.17, Exercise 6.1, Unit Exercise Q1–Q4 |
| 6.4 | Heights and distances: angle of elevation | ✅ | Examples 6.18–6.25, Exercise 6.2, Unit Exercise Q5–Q7 |
| 6.5 | Heights and distances: angle of depression | ⬜ | Examples 6.26–6.30, Exercise 6.3 |
| 6.6 | Elevation and depression together | ⬜ | Examples 6.31–6.33, Exercise 6.4, Unit Exercise Q8–Q9 |
| 6.7 | Chapter review | ⬜ | Exercise 6.5 (15 MCQs), Points to Remember |

## Other units

Textbook PDFs are needed for each unit. The answer key for Units 1–8 is already available.

| Unit | Title | Status |
|---|---|---|
| 1 | Relations and Functions | ⬜ |
| 2 | Numbers and Sequences | ⬜ |
| 3 | Algebra | ⬜ |
| 4 | Geometry | ⬜ |
| 5 | Coordinate Geometry | ⬜ |
| 6 | Trigonometry | 🚧 2 of 7 lessons |
| 7 | Mensuration | ⬜ |
| 8 | Statistics and Probability | ⬜ |

## Changelog

- **2026-10-15** · Restyled with the Astro design system: dark canvas, gradient atmosphere, ghost-pill controls, self-hosted Archivo and Inter.
- **2026-10-15** · Pilot: app shell, Lessons 6.1 and 6.4, Netlify deployment, CI.
