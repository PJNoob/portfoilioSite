# Bhumi Jaiswal — video editor & content strategist

A static personal site built with [Astro](https://astro.build). Compiles to
plain HTML, CSS and a few KB of JavaScript — no server runtime, no framework
shipped to the browser, deployable to any static host.

- **Click-to-load reel embeds** — nothing from Instagram loads until a visitor
  presses play, which keeps ~600KB per reel off the initial page
- Light/dark theme with an explicit toggle that respects the OS preference
- Self-hosted fonts, so the site makes **zero external network requests**
- Scroll-reveal motion that fully honours `prefers-reduced-motion`
- Semantic HTML, JSON-LD `Person` schema, Open Graph tags
- Readable and navigable with JavaScript disabled

## Quick start

```bash
pnpm install
pnpm dev        # http://localhost:4321
```

| Command | What it does |
| --- | --- |
| `pnpm dev` | Dev server with hot reload |
| `pnpm build` | Production build into `dist/` |
| `pnpm preview` | Serve the built `dist/` locally |
| `pnpm check` | Type-check `.astro` and `.ts` files |

> `pnpm check` needs TypeScript 6.x. TypeScript 7's native compiler does not yet
> expose the API `@astrojs/check` relies on, so it is pinned in `devDependencies`.

---

## Customization checklist

Work through this list and the site is yours.

### 1. Your content — `src/data/profile.ts`

**This is the only file you need to edit for content.** Every component reads
from it, so nothing is hardcoded in markup. Replace each `[PLACEHOLDER]` with
your real details.

```bash
# Find everything still left to fill in:
grep -n '\[' src/data/profile.ts
```

What lives there:

| Export | What it drives |
| --- | --- |
| `profile` | Name, title, hero headline, tagline, about paragraphs, stats, email, location |
| `socials` | Instagram / LinkedIn / email links |
| `reels` | Work cards — client, format, result, Instagram link, cover image |
| `services` | What you can be hired for, with starting prices |
| `processSteps` | Brief-to-posted steps and their turnarounds |
| `testimonials` | Quotes with name, channel and channel size |
| `enquiry` | The dropdown options in the contact form |
| `copy` | Section headings, timecodes, button labels, form labels and errors |
| `navLinks` | Nav items and their timecodes |
| `FORM_ENDPOINT` | Set this to post the form somewhere real (see below) |

Three things worth getting right:

- **`result` on each reel** is the line creators actually read. A number beats an
  adjective: "42k views, 1.8k saves in 5 days" beats "performed really well."
- **`headline`** is an array, one entry per line. It renders very large, so keep
  it to two or three short words per line.
- **Leave a `[BRACKET]` in place rather than guessing.** A visible placeholder
  costs you nothing; an invented client name or view count is the kind of thing
  a creator checks.

### 2. Site URL — `astro.config.mjs`

Set `site` to your real deployed URL. It powers canonical links and Open Graph
tags.

```js
site: 'https://yourdomain.com',
```

### 3. Favicon and reel covers

- `public/favicon.svg` — swap the letter for your own initial.
- Reel covers go in `src/assets/work/` — see the README in that folder. Until a
  cover is set, the card falls back to a typographic panel, so the site works
  without them.

### 4. Colours — `src/styles/global.css`

The accent is defined once per theme. Change these two and the whole site
follows:

```css
:root                      { --accent: #cc3a63; }  /* light */
:root[data-theme='dark']   { --accent: #ee7f99; }  /* dark  */
```

The current palette is cream `#fff7eb` and sand `#f9f0e0` grounds, olive-black
ink `#1f2416`, a raspberry accent `#cc3a63` and a sage panel colour `#a2ab73`.

Also update the matching value in the `@media (prefers-color-scheme: dark)`
block — the dark palette is deliberately declared twice so that the OS
preference and the explicit toggle both resolve correctly. If you only change
one, the toggle will disagree with the system theme.

**Two rules this palette depends on**, both measured rather than guessed:

- `--accent` is a **fill**, not small text. `#cc3a63` reads 4.54:1 on the cream
  ground, too close to the line for body copy. Accent-coloured text uses
  `--accent-ink` (`#a32749`, 6.71:1) instead, and `--accent` only ever carries
  white text.
- `--sage` is a **panel ground that takes ink text only** (`--sage-ink`, 6.51:1).
  Muted (3.41:1) and subtle (2.80:1) text both fail against it.

**Check contrast after changing.** Body text needs 4.5:1, large display type
3:1, in both themes.

---

## Contact form

There is no backend. Submitting validates client-side and then opens the
visitor's email client with the message prefilled.

To use a real form service instead, set one constant in `src/data/profile.ts`:

```ts
export const FORM_ENDPOINT: string | null = 'https://formspree.io/f/YOUR_ID';
```

The form then posts there instead, and the note under the submit button updates
itself. Client-side validation runs either way. Netlify Forms works the same way
with `netlify` and `name` attributes on the `<form>`.

---

## Fonts

Archivo Black (display) and Space Grotesk (body) are vendored as `latin`-subset
`.woff2` files in `src/assets/fonts/` and served through Astro's local font
provider. Nothing is fetched from Google at build time or at runtime.

Space Grotesk is a single variable file covering weights 400–700, so weight
changes cost no extra download. Archivo Black ships one weight and is already
black — there is nothing lighter to add.

This is deliberate: builds stay reproducible and work offline or in a locked-down
CI, and visitors are never exposed to a third-party font CDN. The tradeoff is
that adding a weight means adding a file.

To add one, drop the `.woff2` into `src/assets/fonts/` and add a variant in
`astro.config.mjs`:

```js
{ weight: 700, style: 'normal', src: ['./src/assets/fonts/your-font-700.woff2'] }
```

Files came from the [Fontsource](https://fontsource.org) CDN. Both families are
licensed under the SIL Open Font License.

> Do not move these into `public/` — Astro copies them into the build output
> from `src/`, so keeping them in `public/` would duplicate every file.

---

## Deployment

Built for a root domain. `pnpm build` outputs a fully static `dist/`.

| Host | Build command | Publish directory |
| --- | --- | --- |
| Netlify | `pnpm build` | `dist` |
| Vercel | `pnpm build` | `dist` |
| Cloudflare Pages | `pnpm build` | `dist` |

### GitHub Pages

Project pages are served from a subpath, so asset URLs break without a `base`.
In `astro.config.mjs`:

```js
site: 'https://<username>.github.io',
base: '/portfolioSite',
```

Deploy with the official
[`withastro/action`](https://github.com/withastro/action).

---

## Structure

```
astro.config.mjs          site URL + font config
src/
  data/profile.ts         ← all content
  styles/global.css       design tokens, both themes, reveal + reduced-motion
  layouts/BaseLayout.astro  meta, JSON-LD, theme bootstrap, scroll observers
  components/             one file per section
  assets/fonts/           self-hosted woff2
  assets/work/            reel cover images
  pages/index.astro       composes the sections
public/                   favicon, robots.txt
```

### Two implementation details worth knowing

**The theme bootstrap must stay inline.** `BaseLayout.astro` has a small
`is:inline` script in `<head>` that applies the saved theme before first paint.
Without `is:inline`, Astro bundles and defers it, and every page load flashes
the wrong theme.

**Reel embeds are built on click, never on load.** `Work.astro` renders a cover
(or a typographic panel) plus a real `<button>`; the `<iframe>` is constructed in
JavaScript only when that button is pressed. Four Instagram embeds left to load
on their own weigh roughly 2.4MB, which is most of a visitor's patience spent
before they have seen a single frame. Check `dist/index.html` after a build — it
should contain zero `<iframe>` elements.

**Scroll reveal degrades safely.** `.reveal` elements start at `opacity: 0` and
JavaScript adds `.is-visible`. If JS never runs, the `html.no-js` rule in
`global.css` keeps everything visible — the `no-js` class is removed by that
same inline script. Under `prefers-reduced-motion`, elements are shown
immediately with no observer at all.

---

## Accessibility

Skip link, visible `:focus-visible` rings, 44px minimum tap targets, labelled
form fields with `aria-describedby` errors, `aria-current` on the active nav
link, and full keyboard operation of the nav and form. Colour contrast meets
WCAG AA in both themes.

Please re-check contrast if you change the accent colours.
