# Roadmap

Progress of the Class 10 Mathematics tutor (Tamil Nadu State Board, English medium).
Each lesson is built on its own branch (`lesson/<unit>-<lesson>-<name>`) and merged through a pull request.

**Legend:** ✅ done · 🚧 in progress · ⬜ not started

## Platform

| Item | Status | Notes |
|---|---|---|
| App shell, routing, responsive layout | ✅ | Hash routing, works on any static host |
| Lesson template: Learn, Explore, Examples, Practice, Quiz | ✅ | |
| Scene diagrams with step highlighting | ✅ | `src/components/Scene.tsx` |
| Answer checking (decimals, fractions, √, units) | ✅ | `src/lib/answers.ts` |
| Progress saved in the browser | ✅ | Per device |
| Content validation script | ✅ | `npm run check:content` |
| CI (type-check, content check, build) | ✅ | `.github/workflows/ci.yml` |
| Netlify deployment (CLI + GitHub Actions) | ✅ | Needs Netlify secrets, see README |
| Visual design: Kanakku redesign (Claude Design handoff) | ✅ | `design/handoff/`, tokens in `src/theme.css` |
| Lesson page layout: rail, drawer, spread, examples reader | ✅ | Screenshots in `design/screenshots/lesson-layout/` |
| My progress page (`/me`) | ✅ | Reads progress saved in the browser |
| Google sign-in, nickname, synced progress | ✅ | Firebase; see README for console setup |
| Weekly leaderboard | ✅ | 10 pts per practice solved, 5 per quiz answer; top 10, resets Monday IST |
| Sign-in page (`/signin`) | ✅ | Google sign-in, then nickname |
| Parental consent for under-18 sign-in (DPDP Act) | ⬜ | Needs a decision on the consent method before public launch |
| Server-checked points (anti-cheat) | ⬜ | Rules cap points per write; a Cloud Function would make them tamper-proof |
| Code-split lessons to speed up first load | ⬜ | Bundle is ~530 KB gzipped and growing with each unit |
| Matrix answers (grid input) and alternative answer sets | ✅ | `src/lib/matrix.ts` |
| Proof questions (pick the reason for each step) | ✅ | `ProofQuestion` in `src/content/types.ts` |
| Ruler-and-compass constructions, step by step | ✅ | `src/lib/constructions.ts`; worked from the measurements |
| Answer choices shuffled per question (textbook MCQs keep their order) | ✅ | `src/lib/shuffle.ts` |
| Expression answers (e.g. a GCD or a simplified fraction) | ⬜ | Needed for Lessons 3.2–3.5 and Unit Exercise Q4–Q7 |
| Identity proofs, one line at a time | ✅ | `ChainQuestion`; every line checked at random angles by `src/lib/texEval.ts` |
| Identity checker tool (for Lesson 6.3) | ✅ | `IdentityTester` graphs both sides of a claim |
| AI helper ("explain differently") | ⬜ | Later, needs the Claude API |

## Unit 3 · Algebra (pages 85–159)

| # | Lesson | Status | Textbook coverage |
|---|---|---|---|
| 3.1 | Linear equations in three variables | ⬜ | Examples 3.1–3.9, Exercise 3.1 |
| 3.2 | GCD and LCM of polynomials | ⬜ | Examples 3.10–3.12, Exercises 3.2, 3.3 |
| 3.3 | Rational expressions: simplifying, excluded values | ⬜ | Examples 3.13–3.14, Exercise 3.4 |
| 3.4 | Operations on rational expressions | ⬜ | Examples 3.15–3.18, Exercises 3.5, 3.6 |
| 3.5 | Square root of polynomials | ⬜ | Examples 3.19–3.22, Exercises 3.7, 3.8 |
| 3.6 | Quadratics: zeroes, roots, forming an equation | ⬜ | Examples 3.23–3.25, Exercise 3.9 |
| 3.7 | Solving quadratic equations | ⬜ | Examples 3.26–3.35, Exercises 3.10, 3.11 |
| 3.8 | Word problems with quadratics | ⬜ | Examples 3.36–3.39, Exercise 3.12 |
| 3.9 | Nature of roots; roots and coefficients | ⬜ | Examples 3.40–3.46, Exercises 3.13, 3.14 |
| 3.10 | Graphs of variation | ⬜ | Examples 3.47–3.50, Exercise 3.15 |
| 3.11 | Quadratic graphs | ⬜ | Examples 3.51–3.55, Exercise 3.16 |
| 3.12 | Matrices: order and types | ✅ | Examples 3.56–3.59, Exercise 3.17, Progress Checks p.138, p.142 |
| 3.13 | Matrix operations: add, scale, multiply | ✅ | Examples 3.60–3.73, Exercises 3.18, 3.19 |
| 3.14 | Chapter review | ✅ | Exercise 3.20 (20 MCQs), Unit Exercise Q1–3, 8–20, Points to Remember. Q4–7 wait for expression answers |

## Unit 4 · Geometry (pages 161–202)

| # | Lesson | Status | Textbook coverage |
|---|---|---|---|
| 4.1 | Similar triangles | ✅ | Examples 4.1–4.9, Exercise 4.1 Q1–9, Progress Check p.168 |
| 4.2 | Constructing similar triangles | ✅ | Examples 4.10–4.11, Activity 1, Exercise 4.1 Q10–13 |
| 4.3 | Proportionality and angle bisector theorems | ✅ | Theorems 1–4, Examples 4.12–4.16, Exercise 4.2 Q1–10 |
| 4.4 | Constructing triangles | ✅ | Examples 4.17–4.19, Exercise 4.2 Q11–16 |
| 4.5 | Pythagoras theorem | ✅ | Theorem 5, Examples 4.20–4.23, Exercise 4.3 |
| 4.6 | Circles and tangents | ✅ | Theorem 6, Examples 4.24–4.28, Exercise 4.4 Q1–8 |
| 4.7 | Constructing tangents | ✅ | Examples 4.29–4.31, Exercise 4.4 Q11–16 |
| 4.8 | Ceva and Menelaus | ✅ | Examples 4.32–4.34, Exercise 4.4 Q9–10 |
| 4.9 | Chapter review | ✅ | Exercise 4.5 (15 MCQs), Unit Exercise 4, Points to Remember |

## Unit 6 · Trigonometry (pages 239–268)

| # | Lesson | Status | Textbook coverage |
|---|---|---|---|
| 6.1 | Trigonometric ratios refresher | ✅ | Recall, complementary angles, standard values, Thinking Corner p.242, Progress Check Q1, Q5–Q8 |
| 6.2 | The three fundamental identities | ✅ | Section 6.2, Activity 1, Progress Check p.249 Q2–Q4 |
| 6.3 | Proving identities | ✅ | Examples 6.1–6.17, Exercise 6.1, Unit Exercise Q1–Q4. Q7(ii) is set as "find θ", since both sides of the book's result are undefined at θ = 30° |
| 6.4 | Heights and distances: angle of elevation | ✅ | Examples 6.18–6.25, Exercise 6.2, Unit Exercise Q5–Q7 |
| 6.5 | Heights and distances: angle of depression | ✅ | Examples 6.26–6.30, Exercise 6.3, Unit Exercise Q8, Progress Check p.264 Q5 |
| 6.6 | Elevation and depression together | ✅ | Examples 6.31–6.33, Exercise 6.4, Unit Exercise Q9, Progress Check p.264 Q3 |
| 6.7 | Chapter review | ✅ | Exercise 6.5 (15 MCQs), Points to Remember, Thinking Corner p.264 |

## Other units

Textbook PDFs are needed for each unit. The answer key for Units 1–8 is already available.

| Unit | Title | Status |
|---|---|---|
| 1 | Relations and Functions | ⬜ |
| 2 | Numbers and Sequences | ⬜ |
| 3 | Algebra | 🚧 3 of 14 lessons |
| 4 | Geometry | ✅ 9 of 9 lessons |
| 5 | Coordinate Geometry | ⬜ |
| 6 | Trigonometry | ✅ 7 of 7 lessons |
| 7 | Mensuration | ⬜ |
| 8 | Statistics and Probability | ⬜ |

## Changelog

- **2026-10-17** · Unit 6 Trigonometry, Lessons 6.2, 6.3, 6.5, 6.6 and 6.7: identity proofs chosen one line at a time (checked at random angles), four new tools (unit-circle identities, identity grapher, lighthouse and ships, look up and down).
- **2026-10-17** · Unit 4 Geometry, all 9 lessons: proof questions, step-by-step constructions, five geometry tools, circles in diagrams; answer choices shuffled.
- **2026-10-17** · Unit 3 Algebra: Lessons 3.12 (matrices), 3.13 (matrix operations) and 3.14 (chapter review); five matrix tools; matrix answer grid; formula check in CI.
- **2026-10-16** · Lesson page layout: wider page (up to 1440 px), lesson rail and All lessons drawer, sticky tab bar, Learn as a spread with margin notes, Examples as a reader (index + one example at a time), larger Explore tools.
- **2026-10-16** · Accounts: Google sign-in, nickname, progress synced to Firebase, weekly leaderboard, security rules with tests.

- **2026-10-16** · Kanakku redesign from the Claude Design handoff: warm paper, ink outlines, hard shadows; new My progress page.
- **2026-10-15** · Restyled with the Astro design system: dark canvas, gradient atmosphere, ghost-pill controls, self-hosted Archivo and Inter.
- **2026-10-15** · Pilot: app shell, Lessons 6.1 and 6.4, Netlify deployment, CI.
