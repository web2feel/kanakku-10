# Kanakku: Class 10 Maths tutor (TN State Board)

A lesson-by-lesson tutor for Tamil Nadu State Board Class 10 Mathematics (English medium).
Each lesson has five sections: **Learn**, **Explore** (interactive tools), **Examples** (step-by-step
solutions with diagrams that highlight each step), **Practice** (auto-checked, with hints and
solutions) and **Quiz** (scored, best score saved).

Content so far: Unit 3 Algebra, Lessons 12–14; Unit 4 Geometry, all nine lessons; Unit 6 Trigonometry, Lessons 1 and 4.

## Run it

```bash
npm install
npm run dev            # http://localhost:5173
npm run build          # static site in dist/
npm run check:content  # validates every question and the answer parser
npm run check:tex      # renders every formula in the content with KaTeX
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

## Accounts and the weekly leaderboard (Firebase)

Signing in is optional. Signed out, progress stays in the browser as before. Signed in with Google:

- **Progress** is saved to the account, merged with anything done on this device before signing in
  (the better result wins; a correct answer is never downgraded), and follows the student to any device.
- **Sign out** removes the account's progress from the browser, so shared computers stay private.
- **Weekly leaderboard:** 10 points for each practice question solved for the first time, 5 for each correct
  quiz answer (best attempt per quiz). Weeks reset Monday 00:00 IST. Only the top 10 are shown.
- **Stored:** account ID, nickname, progress and weekly points. Names and email addresses are never written
  to the database. Firebase Analytics is not used.

Code: `src/accounts/` (store, merge, weeks, nicknames, Firebase and mock backends), `src/pages/SignInPage.tsx`,
`src/components/Leaderboard.tsx`. Security rules: `firestore.rules`.

### One-time setup in the Firebase console (project `easylearning-179c5`)

1. **Authentication → Sign-in method:** enable **Google**.
2. **Firestore Database:** create the database in **production mode**, location **asia-south1 (Mumbai)**.
   The location cannot be changed later.
3. **Authentication → Settings → Authorised domains:** add the site's domain, e.g. `your-site.netlify.app`
   (and any custom domain). `localhost` is there already. Firebase does not accept wildcards, so Netlify
   pull-request previews can't sign in unless their domain is added.
4. **Deploy the security rules** from your machine:
   ```bash
   npm run firebase:login     # once
   npm run deploy:rules
   ```
   Until the rules are deployed, production-mode Firestore refuses every request: sign-in works but
   nothing saves (the app keeps working from the browser copy).
5. Optional: **Project settings → Integrations → Google Analytics:** leave it off. In Google Cloud console,
   restrict the API key to your site's domains.

The web config lives in `src/accounts/config.ts`. It identifies the project and is not secret;
access is controlled by the rules and the authorised domains.

### Developing without Firebase

```bash
npm run dev:mock        # sign-in, nickname and leaderboard with a fake backend and sample students
npm run test:accounts   # merge, week and nickname logic
npm run test:rules      # security rules against the Firestore emulator (needs Java; runs in CI)
```

`VITE_ACCOUNTS=off` turns accounts off entirely (used for the single-file preview build).

## Design

The visual design comes from the Claude Design handoff in `design/handoff/` (open any `.dc.html` there in a
browser, with `support.js` beside it). Tokens live in `src/theme.css` (copied from the handoff); the app's
component styles are in `src/index.css`. Fonts are self-hosted from `src/assets/fonts`: Bricolage Grotesque
(headings), Figtree (body and UI), Caveat (handwritten notes only), plus Inter's Greek subset for θ, α, β.

Fixed colour meanings: opposite `#D2452A`, adjacent `#2F6FD0`, hypotenuse `#1C8F67` in every diagram;
peach = history / wrong, butter = tip / hint, mint wash = correct, sky = note, lilac = check yourself.

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
  pages/                     Home, Unit, Lesson, My progress (/me), Sign in (/signin), Not found
  accounts/                  sign-in, progress sync, weekly points (Firebase, with a mock for development)
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

`SceneSpec` diagrams use real-world units (metres) with y pointing up. They can also hold `circles`, shaded `fills`,
equal-length `ticks` and `parallel` arrows on segments. Give segments and angles an
`id`, then list those ids in a step's `highlight` to light them up while that step is shown.

### Answers

Numeric answers accept decimals, fractions, `16√3`, `50*sqrt(3)`, `(√3+1)/2`, `45°` and trailing
units. The default tolerance is 0.6% (or 0.011), enough for `√3 = 1.732` and 2-decimal rounding.
Set `tol` on an answer to override it.

When a question has more than one right answer set (say $x, y = 4, 2$ or $2, 4$), list the others in
`alternatives`.

Proofs use `type: 'proof'`: a two-column proof (`statement`, `reason`). Steps with `choices` ask the student to pick
the reason; `reason` must be one of the choices.

Constructions use `type: 'construct'` with a `construction` reference such as
`{ kind: 'median', base: 8, angle: 60, value: 5.8 }` (see `src/lib/constructions.ts`). The figure and its steps are
worked out from the measurements. Add `measure` to ask for a length read off the drawing. A worked example with a
`construction` and empty `steps` uses the construction's own steps.

MCQ options are shown in a fixed shuffled order per question. Set `keepOrder: true` for textbook MCQs whose A–D letters
should match the book.

Matrix answers use `type: 'matrix'`: the student fills a grid the size of `cells`. Cells are numbers or exact
forms the parser reads, such as `'8/3'`, `'-√7'` or `'4√2-9'`. In content text, `matrixTex(cells)` from
`src/lib/matrix.ts` prints a matrix in round brackets, as the textbook does.

## Notes

- Progress is stored per browser. Moving between devices needs logins, which a later version can add.
- Explanations, diagrams and tools are original; question wording follows the textbook, with
  exercise numbers kept so students can match them to the book.
