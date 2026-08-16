# Portfolio Site

A static personal portfolio built with [Astro](https://astro.build). Compiles to
plain HTML, CSS and a few KB of JavaScript — no server runtime, no framework
shipped to the browser, deployable to any static host.

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
| `socials` | GitHub / LinkedIn / email links |
| `projects` | Project cards — summary, impact, tech, live and repo links |
| `experience` | Work history timeline |
| `education` | Degrees, institutions, grades, activities |
| `skillGroups` | Grouped skill tags |
| `navLinks` | Nav items (only change if you add or remove sections) |

Two things worth getting right:

- **`impact` on each project and `highlights` on each role** should be outcomes,
  not duties. "Cut p99 latency 40%" beats "worked on performance." These are the
  lines people actually read.
- **`headline`** is an array, one entry per line. It renders very large, so keep
  it to two or three short words per line.

### 2. Site URL — `astro.config.mjs`

Set `site` to your real deployed URL. It powers canonical links and Open Graph
tags.

```js
site: 'https://yourdomain.com',
```

### 3. Favicon and résumé

- `public/favicon.svg` — swap the letter for your own initial.
- Drop your CV at `public/resume.pdf`, or change `profile.resumeUrl`.

### 4. Colours — `src/styles/global.css`

The accent is defined once per theme. Change these two and the whole site
follows:

```css
:root                      { --accent: #c2410c; }  /* light */
:root[data-theme='dark']   { --accent: #ff7a45; }  /* dark  */
```

Also update the matching value in the `@media (prefers-color-scheme: dark)`
block — the dark palette is deliberately declared twice so that the OS
preference and the explicit toggle both resolve correctly. If you only change
one, the toggle will disagree with the system theme.

**Check contrast after changing.** Accent-on-background must stay at or above
4.5:1 in both themes.

---

## Contact form

There is no backend. Submitting validates client-side and then opens the
visitor's email client with the message prefilled.

To use a real form service instead, add an `action` to the `<form>` in
`src/components/Contact.astro` and delete the `submit` handler at the bottom of
that file:

```astro
<form action="https://formspree.io/f/YOUR_ID" method="POST">
```

Netlify Forms works the same way with `netlify` and `name` attributes.

---

## Fonts

Instrument Serif (display) and Inter (body) are vendored as `latin`-subset
`.woff2` files in `src/assets/fonts/` and served through Astro's local font
provider. Nothing is fetched from Google at build time or at runtime.

This is deliberate: builds stay reproducible and work offline or in a locked-down
CI, and visitors are never exposed to a third-party font CDN. The tradeoff is
that adding a weight means adding a file.

To add one, drop the `.woff2` into `src/assets/fonts/` and add a variant in
`astro.config.mjs`:

```js
{ weight: 700, style: 'normal', src: ['./src/assets/fonts/inter-latin-700-normal.woff2'] }
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
  pages/index.astro       composes the sections
public/                   favicon, robots.txt
```

### Two implementation details worth knowing

**The theme bootstrap must stay inline.** `BaseLayout.astro` has a small
`is:inline` script in `<head>` that applies the saved theme before first paint.
Without `is:inline`, Astro bundles and defers it, and every page load flashes
the wrong theme.

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
