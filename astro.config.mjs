// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // CUSTOMIZE: set this to your real deployed URL. It powers canonical links
  // and Open Graph tags. Deploying to a root domain (Netlify / Vercel /
  // Cloudflare) needs no `base`; see README.md for GitHub Pages.
  site: 'https://example.com',

  // Fonts are vendored into src/assets/fonts/ and served from the local
  // provider rather than fetched from Google at build time. That keeps builds
  // reproducible and offline-capable, and means the site makes zero external
  // network requests at runtime.
  //
  // The files are the `latin` subsets from Fontsource (SIL Open Font License).
  // To add a weight, drop the .woff2 in and add a variant below.
  fonts: [
    {
      // Display face — the poster headline voice. Archivo Black ships a single
      // weight; it is already black, so nothing lighter is needed or wanted.
      provider: fontProviders.local(),
      name: 'Archivo Black',
      cssVariable: '--font-display',
      fallbacks: ['Impact', 'Haettenschweiler', 'sans-serif'],
      // Generates fallback @font-face rules with matching metrics, so swapping
      // from the fallback to the real font doesn't shift the layout.
      optimizedFallbacks: true,
      options: {
        variants: [
          {
            weight: 400,
            style: 'normal',
            src: ['./src/assets/fonts/archivo-black-latin-400-normal.woff2'],
          },
        ],
      },
    },
    {
      // Body face — all reading text, UI labels and navigation. One variable
      // file covers 400–700, so weight changes cost no extra download.
      provider: fontProviders.local(),
      name: 'Space Grotesk',
      cssVariable: '--font-body',
      fallbacks: ['ui-sans-serif', 'system-ui', 'Segoe UI', 'sans-serif'],
      optimizedFallbacks: true,
      options: {
        variants: [
          {
            weight: '400 700',
            style: 'normal',
            src: ['./src/assets/fonts/space-grotesk-latin-wght-normal.woff2'],
          },
        ],
      },
    },
  ],
});
