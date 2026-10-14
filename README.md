# Kanakku: Class 10 Maths tutor (TN State Board)

A lesson-by-lesson tutor for Tamil Nadu State Board Class 10 Mathematics (English medium).
Each lesson has five sections: **Learn**, **Explore** (interactive tools), **Examples** (step-by-step
solutions with diagrams that highlight each step), **Practice** (auto-checked, with hints and
solutions) and **Quiz** (scored, best score saved).

Pilot content: Unit 6 Trigonometry, Lesson 1 (trig ratios refresher) and Lesson 4 (angle of elevation).

## Run it

```bash
npm install
npm run dev            # http://localhost:5173
npm run build          # static site in dist/
npm run check:content  # validates every question and the answer parser
```

`npm run build:single` produces one self-contained HTML file in `dist-single/` (used for previews).

## Deploy (Netlify)

The Netlify CLI is a dev dependency and `netlify.toml` holds the build settings
(`npm run build` → `dist/`). The site uses hash routing (`#/unit/...`), so no redirect rules are needed.

### From your machine

```bash
npm run netlify:login    # once: opens the browser to sign in to Netlify
npm run netlify:init     # once: create a new Netlify site and link this folder
                         # (or `npm run netlify:link` to link an existing site)
npm run deploy:preview   # content check + build + draft deploy, prints a preview URL
npm run deploy:prod      # content check + build + deploy to the live site
npm run dev:netlify      # local dev server through Netlify (optional)
```

### Automatically from GitHub

`.github/workflows/ci.yml` runs on every push and pull request:

- **check**: type-check, content check and build. Always on.
- **deploy**: production deploy on pushes to `main`; a preview deploy on each pull request, with
  the link posted as a PR comment. Off until you turn it on:
  1. Netlify → User settings → Applications → **New access token**. Save it as the GitHub
     repository secret `NETLIFY_AUTH_TOKEN`.
  2. Netlify → your site → Site configuration → **Site ID**. Save it as the secret `NETLIFY_SITE_ID`.
     (After `netlify:init`, it is also in `.netlify/state.json`.)
  3. GitHub → Settings → Secrets and variables → Actions → **Variables**: add `NETLIFY_ENABLED` = `true`.

If you connect the repository in Netlify's own dashboard instead, leave `NETLIFY_ENABLED` unset so
the site is not deployed twice.

Any other static host also works: build with `npm run build` and publish `dist/`.

## Project layout

```
src/
  content/
    types.ts                 content model (lessons, questions, scene diagrams)
    index.ts                 list of units and lessons
    trigonometry/            one file per lesson
  components/                lesson UI: Scene (diagrams), QuestionCard, ExampleCard, PracticeSet, QuizRunner…
  widgets/                   interactive tools (TriangleExplorer, ElevationSimulator, …)
  lib/answers.ts             answer parsing and checking
  store/progress.ts          progress saved in the browser (zustand + localStorage)
  pages/                     Home, Unit, Lesson
scripts/check-content.ts     content validation
```

## Adding a lesson

1. Create `src/content/<unit>/lessonN-name.ts` exporting a `Lesson` (see `types.ts`; the two
   existing lessons are full examples).
2. Add it to the unit's `lessons` array in `src/content/index.ts` (replacing its `soon(...)` entry).
3. Run `npm run check:content`.

### Text markup in content files

- `$...$` inline maths (KaTeX). Use `\\` for backslashes inside TypeScript strings.
- `**bold**`, `*italic*`
- `{{opp:text}}`, `{{adj:text}}`, `{{hyp:text}}` colour text as opposite / adjacent / hypotenuse.

### Diagrams

`SceneSpec` diagrams use real-world units (metres) with y pointing up. Give segments and angles an
`id`, then list those ids in a step's `highlight` to light them up while that step is shown.

### Answers

Numeric answers accept decimals, fractions, `16√3`, `50*sqrt(3)`, `(√3+1)/2`, `45°` and trailing
units. The default tolerance is 0.6% (or 0.011), enough for `√3 = 1.732` and 2-decimal rounding.
Set `tol` on an answer to override it.

## Notes

- Progress is stored per browser. Moving between devices needs logins, which a later version can add.
- Explanations, diagrams and tools are original; question wording follows the textbook, with
  exercise numbers kept so students can match them to the book.
