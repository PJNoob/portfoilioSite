# Reel covers

Drop a portrait screenshot of each reel's cover frame in this folder, then wire
it up in `src/data/profile.ts`:

```ts
import reelOne from '../assets/work/reel-one.jpg';

export const reels: Reel[] = [
  { /* … */ cover: reelOne },
];
```

Any size works — Astro resizes and converts these at build time, and the cards
crop to 9:16. Until a cover is set the card falls back to a typographic panel,
so the site works without them; it just carries less punch.

These are covers only. No video file goes here: the reels stay on Instagram and
load in an embed when someone presses play.
