# Handoff: Kanakku redesign

## Overview
A visual redesign of the Kanakku Class 10 Maths portal (repo `web2feel/kanakku-10`): warmer, friendlier, less serious. Covers every existing page plus three new ones (Sign in, My progress with a weekly leaderboard, and a restyled Formula sheet drawer). Content, routes and learning logic stay as they are; this is a re-skin plus new account/leaderboard features.

## About the design files
Files in `designs/` are **design references built in HTML**, not production code. Open any `.dc.html` directly in a browser (keep `support.js` beside them). Recreate them in the existing app — React 19 + Vite + Tailwind v4 + react-router (HashRouter) + zustand + KaTeX + Mafs — using its components and patterns. Don't copy the inline-style markup.

## Fidelity
**High fidelity.** Colours, type, spacing, radii, shadows and copy are final. Exceptions:
- Maths in the mocks is plain text with stacked fractions. **Keep KaTeX** (`Rich` / `Tex`) in the app.
- The diagrams are approximations of the existing `Scene` and `widgets/*`. Keep the existing widget logic (and Mafs if used); restyle only strokes, fills, labels and controls to the tokens below.
- Mock data (scores, nicknames, leaderboard) is placeholder.

## How to apply (suggested order)
1. Add `theme.css` (in this folder) and import it after `@import 'tailwindcss'` in `src/index.css`. Self-host the three fonts in `src/fonts.css` (replace Archivo/Inter).
2. Restyle `Shell.tsx`: header, footer and brand mark.
3. Restyle shared pieces: `Meter`, `Blocks` (notes, tables, steps), `QuestionCard`, `ExampleCard`, `PracticeSet`, `QuizRunner`, `FormulaSheet`.
4. Restyle pages: `HomePage`, `UnitPage`, `LessonPage`, `NotFound`.
5. Restyle the widgets' visual layer: `TriangleExplorer`, `ComplementaryProof`, `StandardTable`, `ElevationSimulator`, `RatioPicker`.
6. Add the new features (needs a backend): Google sign-in, nickname, synced progress, weekly leaderboard, a `/me` page and a `/signin` page.
7. Delete the unused old CSS from `src/index.css` (the current file is about 42 KB) and `Atmosphere.tsx` if it only draws the old gradient background.

## Design tokens
All tokens are in `theme.css`. Summary:
- **Fonts:** Bricolage Grotesque 800 for headings (letter-spacing −0.02 to −0.04em). Figtree 400–700 for UI and body. Caveat 600 for handwritten notes only (labels like "tip", "check yourself", side remarks). Never use Caveat for body text.
- **Type scale:** h1 hero `clamp(40px,6vw,68px)` / lh 1. h1 page `clamp(48px,7vw,80px)` / lh .95. h1 lesson `clamp(36px,5vw,56px)`. h2 section 30px (lesson cards) or `clamp(30px,4vw,44px)`. h3 card 22–26px. Body 17px / 1.6 (lesson) or 19px / 1.55 (intro). Small 13–15px. Pills 12–13px / 600–700.
- **Colour:** paper `#FBF6EC`, ink `#1F2A44`, coral CTA `#FF6B4A`, sun `#FFD25A`, mint progress `#1FA97A`. Each pastel has one meaning (see theme.css comments). Dark navy `#2B3758` marks locked or coming-soon items.
- **Geometry colours** (fixed everywhere): opposite `#D2452A`, adjacent `#2F6FD0`, hypotenuse `#1C8F67`. Draggable handles are coral `#FF6B4A` (or blue `#5B9BF0` for a horizontal-only handle), with a 2px ink stroke and an 18px translucent hit halo.
- **Radii:** pills 999px, inputs and buttons 12–16px, cards 22–24px, hero panels 28px.
- **Signature shadow:** a hard offset with no blur, `4px 4px 0 #1F2A44` (3, 5 and 8px variants). Hover lifts `translate(-2px,-2px)` and grows the shadow by 2px, over 120ms. A yellow variant `8px 8px 0 #FFD25A` is used on dark panels.
- **Borders:** 2px solid ink on interactive cards and buttons. 1.5–2px `#EADFC9` on soft containers. 2px dashed `#D3C6AB` on placeholder or "continue without" options.
- **Playful rotation:** used sparingly, −1° to −6° on the brand mark, the hero highlight word, the current unit card, big score numbers and hand notes. It resets to 0 on hover.
- **Layout:** container max-width 1120px (1200px on the lesson page with sidebar), padding 24px. Grids use `repeat(auto-fit,minmax(min(100%,440px),1fr))` and similar, so every page reflows to mobile.

## Screens

### 1. Shell (all pages) — `Shell.tsx`
- **Header:** brand on the left, actions on the right, padding 20px 24px, no bottom border.
  - Brand mark: a 38px coral rounded square (radius 12) with a white "K" (Bricolage 800, 20px), rotated −6°. Then "Kanakku" (Bricolage 800, 22px) and a pill "Class 10 Maths" (13px/600, `#5B6478` on `#F1E8D6`). This replaces the gradient SVG triangle.
  - Right side: a "My progress" pill (`btn-outline`) with an inline percentage badge (mint fill, white-space nowrap), and a "∑ Formula sheet" pill (`btn-outline`) that opens the drawer. When signed out, show "Sign in" instead of "My progress".
- **Footer:** ink background, `#C9D1E6` text, 2px ink top border, 14px. Left: the existing attribution copy. Right: "made with chalk & curiosity" in Caveat 20px `#FFD25A`.

### 2. Home — `HomePage.tsx` → `designs/Kanakku Home.dc.html`
- **Hero:** a two-column grid.
  - Left column: two pills ("TN State Board · Class 10" butter; "● Trigonometry is open →" mint, linking to the unit), then the h1 "Learn maths one lesson at a time, with tools you can *touch.*" The last word sits in a sun highlight block (radius 14, rotated −2°). Then the intro paragraph, the CTA row ("Continue learning →" as `btn-primary`, plus "See all units" underlined with a 4px sun underline), and a "Pick up where you left off" card driven by `lastLesson`.
  - Right column: a dark interactive panel (ink background, radius 28, `shadow-sun`, rotated 1°). It's a mini angle-of-elevation demo: an SVG plus a slider from 10° to 45°, computing h = 50·tan θ, with a "tan θ = h ÷ d" readout.
- **"Every lesson moves through the same five steps":** a white band with ink top and bottom borders. Five cards, one pastel each (peach, butter, mint, sky, lilac), 2px ink border, radius 22, number in a white circle.
- **Units grid** (`auto-fill minmax(240px,1fr)`):
  - Open unit: a sun card, 2px ink border, `shadow-hard-md`, rotated −1°, with a "N of 7 lessons ready" badge (ink pill) and a progress meter.
  - Coming-soon units: navy `#2B3758` cards with white title, `#C9D1E6` description and an outlined "Coming soon" pill. No pastels here; pastels are reserved for the five steps.

### 3. Unit — `UnitPage.tsx` → `designs/Kanakku Trigonometry.dc.html`
- **Header:** a muted breadcrumb line ("Units / Unit 6 · Pages 239–268"), the h1 "Trigonometry", and a one-line description. Nothing else; the user found extra pills and stat boxes too busy.
- **Lesson list** (`ol`, gap 14):
  - Ready lessons: white cards, 2px ink border, `shadow-hard-md`, laid out in three columns (`auto | 1fr | auto`): a 48px sun number circle; the title (22px), description and meta chips (pages, example and question counts, on `#F4EDDF`); and on the right a 140px column with "% done", a meter and "Continue →" in coral-ink.
  - Coming-soon lessons: navy cards with an outlined number circle and a "Coming soon" pill.

### 4. Lesson — `LessonPage.tsx` → `designs/Kanakku Lesson.dc.html`
- **Layout:** a sticky left sidebar (220–260px) and main content (max 820px). They wrap on small screens.
- **Sidebar:** the unit name, then the lesson list. The current lesson is a sun fill with an ink border. Ready lessons are plain, with a white background on hover. Coming-soon lessons are grey, marked "soon".
- **Header:** breadcrumb, h1, and a progress meter (max-width 320px) with "N% done".
- **Tab bar:** sticky at top 12px, a white pill container with a 2px ink border and `shadow-hard-sm`. Each tab shows its number (55% opacity) and label. The active tab has a sun fill. Use `lessonCompletion` and `markSeen` as now.
- **Learn tab:** each section is a white card (2px ink, radius 24, padding 28) with a "1 of 5" pill.
  - Note blocks (`Blocks.tsx` notes): no border, radius 18, padding 16–20, a Caveat label and a coloured background by tone. history = peach, label `#B23A20`, "a little history". tip = butter, label `#8A6200`. note = sky, label `#1D4F96`. think = lilac, label `#4B3A9C`.
  - "Check yourself" boxes: lilac background, 2px ink border, radius 20.
  - Tables: 2px `#EADFC9` border, radius 16, head row `#F4EDDF` (13px/700, `#5B6478`), row dividers `#F1E8D6`.
  - Figures: a `#FBF6EC` inset (radius 18), with a caption at 13px/600 `#7A8296`.
- **Explore tab:** one card per widget ("Tool N of 3"). Diagram on the left in a `#FBF6EC` box with a faint 20px grid (`#EADFC9`), controls and readouts on the right.
  - Big values (angle) appear in a sun chip, Bricolage 36px, rotated −2°.
  - Presets are pill buttons with a 2px ink border; the active one has a sun fill.
  - The ratio table uses tabular numbers, with the result in mint-ink.
  - Each card ends with a "try this" butter list.
  - Table trainer: hidden cells are 38×34 lilac buttons showing "?". It has Study, Test and memory-pattern toggles.
- **Examples tab** (`ExampleCard`): the prompt, then the hand note "Try it yourself first…" (Caveat, coral-ink) until the first step is shown.
  - Steps are numbered with 30px sun circles. Maths sits in a `#F4EDDF` box (radius 12).
  - Buttons: "Show first step" / "Next step" (`btn-dark`), "Show full solution" (link), and "Hide solution" when done. A "k / n steps" counter sits on the right.
  - The answer box is mint with a 2px ink border and an "answer" label.
  - The figure shows next to the steps and highlights the sides named in the current step (`step.highlight`) with a 14px translucent sun glow under the stroke, plus a thicker stroke.
- **Practice tab** (`PracticeSet` / `QuestionCard`): a row of 36px numbered circles at the top. Fill shows status: correct = `#7ED9B5`, revealed = sun, tried = peach, none = white. The current one gets `shadow-hard-sm`. "N of M solved" sits on the right.
  - Multiple-choice options: rows with a 28px letter circle, background `#FBF6EC`, border `#EADFC9`. Selected: white with an ink border. After checking: mint (correct) or peach (wrong).
  - Numeric answers: a white input with a 2px ink border and the unit suffix in grey.
  - Hints reveal one at a time ("Show a hint" → "Another hint") in butter boxes labelled "hint 1", "hint 2". The solution sits in a white box with a 2px dashed `#C9BDA5` border, labelled "solution".
  - Feedback strips: mint `#CDEFE0` with `#0F5640` text, or peach `#FFE1D6` with `#8A2A16` text, 15px/700, radius 12.
  - Previous and next text buttons sit below the card.
- **Quiz tab** (`QuizRunner`):
  - Intro card: Caveat "ready when you are", h2 "Lesson quiz", the rules, the best score if any, and "Start the quiz →".
  - While running: a 14px meter, "Question i of n" and "Score s". One try each with no hints. After answering, the correct option is highlighted mint and the solution is shown. Then "Next question →" or "See my score".
  - Done card: the score in a sun block (72px number, then /n at 32px grey), rotated −2°, with `shadow-hard`. A message chosen by percentage (100% / ≥70% / below), ✓/✗ pills per question, and "Try again".
- **Bottom of each tab:** "← Previous tab" text button and "Next: X →" `btn-primary`.

### 5. Formula sheet — `FormulaSheet.tsx` → `designs/Formula Sheet.dc.html`
- A drawer that keeps the current open/close and Esc behaviour. It's styled like the cards: paper background, ink border, Caveat "keep it handy" above the h2 "Formula sheet", and a close button styled `btn-outline` with radius 12. Formula groups go in white cards; maths stays in KaTeX.

### 6. My progress + Leaderboard — NEW route `/me` → `designs/Kanakku Profile.dc.html`
- **Progress:** a big conic ring with the overall %, "N of 7 lessons started", and one card per started lesson. Each card has % done, practice "x of y", quiz best, and tab chips (seen = mint with a ✓, unseen = outlined grey).
- **Leaderboard:** Caveat label "this week" with the h2 "Leaderboard".
  - **Scope:** students sign in with Google only and there are no class codes, so the board ranks everyone on Kanakku. Retitle it "this week on Kanakku" (the mock still says "in Class 10 B"; confirm with the product owner).
  - **Points:** 10 per practice question solved correctly + 5 per correct quiz answer (best attempt per quiz), counted for the current week. The week resets Monday 00:00 IST.
  - **Podium:** the top 3 as cards. #1 sun with `shadow-hard`, #2 mint, #3 peach.
  - **Ranks 4–10:** rows with a pastel avatar initial, nickname, "x solved · y quiz answers" and points. The current user's row is butter with an ink border.
  - **Friendly mode:** only the top 10 are listed, and no rank below 10 is ever shown. If the user is outside the top 10, show a "you" card instead, with "N more points gets you into the top 10…" and their personal-best message.
  - **Nickname:** shown with an inline Edit (max 16 characters). Classmates see nicknames only.
- **Reset progress:** a link with a confirm step; the copy is in the mock.

### 7. Sign in — NEW route `/signin` → `designs/Kanakku Sign In.dc.html`
- Two-column layout. Left: the h1 "Your maths, your class, *one place.*", the intro and a 2-step list. Right: a white card with `shadow-hard-lg` and a 2-segment step indicator.
- **Step 1:** Caveat "vanakkam!", h2 "Sign in to Kanakku", and one "Continue with Google" button. Use Google's official button or "G" mark in production; the mock uses a letter placeholder. Below that, a dashed "Continue without signing in" option (local-only progress, no leaderboard) and a privacy note.
- **Step 2** (first sign-in only): "Pick a nickname". Avatar initial preview, a 16-character input, five suggestion chips with "↻ More", and the "Start learning →" CTA. Suggestion pool: pi_pirate, theta_tiger, chalk_ninja, CaptainCosine, kolam_queen, tan_tan_tan, angle_annie, sqrt_sparrow, RightAngleRavi, hypotenuse_hero, MathsMagpie, sinCosTan, protractor_pal, decimal_dosa, radian_rocket.

### 8. Not found — `NotFound.tsx` → `designs/Kanakku Not Found.dc.html`
- A centred layout with a small illustration, the Caveat line "we measured the angle, but this page isn't there", the h1 "Page not found", the line "That lesson does not exist yet." and a "Back to all units" `btn-primary`.

## State and data
- Keep `useProgress` (zustand) as the single source of truth for the UI, and keep `lessonCompletion` (20% read, 40% practice, 40% quiz).
- **New: auth plus sync.** Use Firebase Auth (Google) with Firestore, or Supabase; either works on Netlify with no server.
  - `users/{uid}`: `{ nickname, createdAt }`
  - `progress/{uid}`: the same shape as the persisted zustand state. On sign-in, merge local into remote (keep the max per item; never downgrade "correct").
  - `weeklyPoints/{weekId}/entries/{uid}`: `{ nickname, solved, quizCorrect, points }`. Update it whenever `recordPractice` (status "correct", first time only) or `recordQuiz` (an improved best) fires. Compute points as `solved*10 + quizCorrect*5`.
  - Leaderboard query: the top 10 by points for the current `weekId` (ISO week, IST), plus the current user's own entry.
- **Signed-out mode:** keep today's localStorage-only behaviour and hide the leaderboard.
- **Routes to add:** `/signin` and `/me`. Header buttons depend on the auth state.

## Interactions
- Hover on raised elements: `translate(-1..-2px)` and a shadow 1–2px larger, over 120ms. No other animation is required. framer-motion is available for tab or step reveals (fade and 8px rise, 200ms) if wanted.
- Sticky elements: the lesson tab bar (top 12px) and the lesson sidebar (top 20px).
- Focus: the inputs in the mocks have no outline. In production, add a visible focus ring, e.g. `outline: 3px solid #FFD25A; outline-offset: 2px`.
- Keep minimum hit targets of 36–44px on mobile.

## Assets
No image assets. The fonts are Google Fonts (all OFL). There are no icons apart from text glyphs: ∑, →, ✓, ✗, ★, ↻.

## Files
- `theme.css`: Tailwind v4 `@theme` tokens plus base and component classes, ready to import.
- `designs/*.dc.html`: open in a browser for reference (needs `designs/support.js`).
  - Kanakku Home, Kanakku Trigonometry (unit), Kanakku Lesson (all 5 tabs, built from `lesson1-ratios.ts`), Formula Sheet, Kanakku Profile (progress and leaderboard), Kanakku Sign In, Kanakku Not Found.
