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
      // Display face — hero and headings only.
      provider: fontProviders.local(),
      name: 'Instrument Serif',
      cssVariable: '--font-display',
      fallbacks: ['Georgia', 'Times New Roman', 'serif'],
      // Generates fallback @font-face rules with matching metrics, so swapping
      // from the fallback to the real font doesn't shift the layout.
      optimizedFallbacks: true,
      options: {
        variants: [
          {
            weight: 400,
            style: 'normal',
            src: ['./src/assets/fonts/instrument-serif-latin-400-normal.woff2'],
          },
          {
            weight: 400,
            style: 'italic',
            src: ['./src/assets/fonts/instrument-serif-latin-400-italic.woff2'],
          },
        ],
      },
    },
    {
      // Body face — all reading text, UI labels and navigation.
      provider: fontProviders.local(),
      name: 'Inter',
      cssVariable: '--font-body',
      fallbacks: ['system-ui', 'Segoe UI', 'Helvetica Neue', 'sans-serif'],
      optimizedFallbacks: true,
      options: {
        variants: [
          {
            weight: 400,
            style: 'normal',
            src: ['./src/assets/fonts/inter-latin-400-normal.woff2'],
          },
          {
            weight: 500,
            style: 'normal',
            src: ['./src/assets/fonts/inter-latin-500-normal.woff2'],
          },
          {
            weight: 600,
            style: 'normal',
            src: ['./src/assets/fonts/inter-latin-600-normal.woff2'],
          },
        ],
      },
    },
  ],
});
