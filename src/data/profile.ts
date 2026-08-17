/**
 * ============================================================================
 * THE ONLY FILE YOU NEED TO EDIT.
 * ============================================================================
 *
 * Every piece of copy on the site is read from this module — no text is
 * hardcoded in any component. Replace the bracketed [PLACEHOLDER] values with
 * your real details and the whole site updates. TypeScript will tell you if
 * you get a shape wrong.
 *
 * Search for "[" to find everything still left to fill in.
 */

import type { ImageMetadata } from 'astro';

/* -------------------------------------------------------------------------- */
/* Types                                                                       */
/* -------------------------------------------------------------------------- */

export interface SocialLink {
  /** Visible label, e.g. "Instagram". */
  label: string;
  /** Full URL. Use a `mailto:` URL for email. */
  href: string;
  /** Short handle shown next to the label, e.g. "@bhumiii_editsss". */
  handle: string;
}

export interface Reel {
  /** Short name for the piece — what it was about, not a file name. */
  title: string;
  /** Whose channel it went out on. */
  client: string;
  /** Audience size at the time, e.g. "20k followers". */
  clientSize: string;
  /** Where it ran and in what shape, e.g. "Instagram Reel". */
  format: string;
  /** Niche / treatment chips shown under the title. */
  tags: string[];
  /**
   * The number that proves it worked — views, saves, follows, watch-through.
   * This is the line a creator actually reads. Set to `null` to hide it.
   */
  result: string | null;
  /** Public permalink, used for the "open on Instagram" link. */
  url: string;
  /**
   * The Instagram shortcode from the permalink — the part after /reel/.
   * The embed is built from this and only loads once someone clicks play.
   */
  embedCode: string;
  /**
   * Cover frame. Drop a portrait screenshot into `src/assets/work/`, import it
   * at the top of this file, and set it here:
   *
   *   import reelOne from '../assets/work/reel-one.jpg';
   *   ...
   *   cover: reelOne,
   *
   * Left as `null`, the card falls back to a typographic panel — the site
   * still works, it just carries less punch.
   */
  cover: ImageMetadata | null;
}

export interface Service {
  name: string;
  /** One sentence on what the client actually gets. */
  description: string;
  /** Concrete deliverables, not adjectives. */
  includes: string[];
}

export interface ProcessStep {
  /** Running order, shown as a numbered marker, e.g. "01". */
  step: string;
  title: string;
  detail: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  /** Their channel or handle. */
  channel: string;
  /** Audience size, e.g. "20k followers". */
  channelSize: string;
}

/* -------------------------------------------------------------------------- */
/* Identity                                                                    */
/* -------------------------------------------------------------------------- */

export const profile = {
  name: 'Bhumi Jaiswal',
  /** Used for the inline SVG avatar. Two letters works best. */
  initials: 'BJ',
  /** Your professional title — shown under the hero headline. */
  title: 'Video editor & content strategist',

  /**
   * The hero headline. Kept deliberately short: this is set very large, and
   * 2–4 words per line is what makes the typography land.
   */
  headline: ['Reels', 'worth the', 'rewatch.'],

  /** One line under the headline that says what makes you different. */
  tagline:
    'I cut daily vlogs, educational and motivational content for creators — and help plan what goes out next.',

  /** Used for <meta name="description"> and Open Graph. Aim for ~155 chars. */
  metaDescription:
    'Bhumi Jaiswal edits reels, vlogs and educational content for creators, and runs the channel marketing around them. Selected work, services and contact.',

  location: 'Delhi NCR, India',
  email: 'bhumijaiswal31aa@gmail.com',

  /** About section — each string renders as its own paragraph. */
  about: [
    'I edit short-form video for creators — daily lifestyle and vlog content, educational explainers, motivational cuts, and whatever the trend cycle is asking for that week.',
    'The editing is half of it. I also work on what goes out and when: reading the niche, watching what the audience actually responds to, and shaping the posting and marketing around it. A well-cut reel that nobody planned a rollout for is a wasted afternoon.',
    'So far that has meant a year of editing and marketing across ten creators, including channels at 20k and 10k. I am taking on new creators now — if you post consistently and want the edit to stop being the bottleneck, send me a reel you wish had done better.',
  ],

  /**
   * The three panels in the hero. These are the kinds of video you actually
   * cut — they double as the first thing a creator checks for a fit.
   */
  heroPanels: ['Vlogs', 'Educational', 'Trends'],

  /** Small stat row under the About text. Keep to three — it reads cleanest. */
  highlights: [
    { value: '10', label: 'Creators worked with' },
    { value: '20K+', label: 'Views delivered' },
    { value: '1 yr', label: 'Editing and marketing' },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* Links                                                                       */
/* -------------------------------------------------------------------------- */

export const socials: SocialLink[] = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/bhumiii_editsss/',
    handle: '@bhumiii_editsss',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/bhumi-jaiswal-609615321/',
    handle: '/in/bhumi-jaiswal',
  },
  { label: 'Email', href: `mailto:${profile.email}`, handle: profile.email },
];

/* -------------------------------------------------------------------------- */
/* Work — the section creators scan first                                      */
/* -------------------------------------------------------------------------- */

/**
 * Nothing here loads a video until someone clicks play. Four Instagram embeds
 * left to load on their own weigh about 2.4MB, which is most of a creator's
 * patience spent before they have seen a single frame.
 */
export const reels: Reel[] = [
  {
    title: '[What this one was about]',
    client: '[CLIENT CHANNEL]',
    clientSize: '[00k followers]',
    format: 'Instagram Reel',
    tags: ['[Niche]', '[Treatment]'],
    result: '[The number — e.g. "42k views, 1.8k saves in 5 days"]',
    url: 'https://www.instagram.com/reel/DcGbqknMind/',
    embedCode: 'DcGbqknMind',
    cover: null,
  },
  {
    title: '[What this one was about]',
    client: '[CLIENT CHANNEL]',
    clientSize: '[00k followers]',
    format: 'Instagram Reel',
    tags: ['[Niche]', '[Treatment]'],
    result: '[The number that proves it worked]',
    url: 'https://www.instagram.com/reel/DcHYONgPhL-/',
    embedCode: 'DcHYONgPhL-',
    cover: null,
  },
  {
    title: '[What this one was about]',
    client: '[CLIENT CHANNEL]',
    clientSize: '[00k followers]',
    format: 'Instagram Reel',
    tags: ['[Niche]', '[Treatment]'],
    result: '[The number that proves it worked]',
    url: 'https://www.instagram.com/reel/Dbb0nSaEfUx/',
    embedCode: 'Dbb0nSaEfUx',
    cover: null,
  },
  {
    title: '[What this one was about]',
    client: '[CLIENT CHANNEL]',
    clientSize: '[00k followers]',
    format: 'Instagram Reel',
    tags: ['[Niche]', '[Treatment]'],
    result: '[The number that proves it worked]',
    url: 'https://www.instagram.com/reel/DbtdCeBxTWP/',
    embedCode: 'DbtdCeBxTWP',
    cover: null,
  },
];

/* -------------------------------------------------------------------------- */
/* Services                                                                    */
/* -------------------------------------------------------------------------- */

export const services: Service[] = [
  {
    name: 'Video editing',
    description:
      'The cut itself — vlogs, educational explainers, motivational pieces and trend-led reels, delivered ready to post.',
    includes: ['Full edit and pacing', 'Captions and text', 'Sound design and music', 'Colour pass'],
  },
  {
    name: 'Content strategy',
    description:
      'What to make next and why. Formats, hooks and a posting rhythm your audience will actually keep up with.',
    includes: ['Content calendar', 'Hook and format direction', 'Series planning'],
  },
  {
    name: 'Channel marketing',
    description:
      'The rollout around the video — where it goes, when it goes, and what happens in the comments afterwards.',
    includes: ['Campaign planning', 'Cross-platform scheduling', 'Engagement and community'],
  },
  {
    name: 'Niche and audience research',
    description:
      'Reading the niche properly: who is watching, what is already working in it, and where the gap is for you.',
    includes: ['Audience breakdown', 'Competitor teardown', 'Positioning notes'],
  },
];

/* -------------------------------------------------------------------------- */
/* Process — the section that answers "will you miss my upload date?"          */
/* -------------------------------------------------------------------------- */

export const processSteps: ProcessStep[] = [
  {
    step: '01',
    title: 'Send the footage',
    detail:
      'Raw files, the reference you like, and what the video is meant to do. A Drive link is fine.',
  },
  {
    step: '02',
    title: 'First cut',
    detail:
      'A full edit with captions, sound and pacing — not a rough draft you have to imagine finished.',
  },
  {
    step: '03',
    title: 'Your notes',
    detail: 'One round of changes, all in one place, so nothing gets lost across three apps.',
  },
  {
    step: '04',
    title: 'Ready to post',
    detail: 'Final files in the right ratio, plus a caption and a posting slot that makes sense.',
  },
];

/* -------------------------------------------------------------------------- */
/* Testimonials                                                                */
/* -------------------------------------------------------------------------- */

export const testimonials: Testimonial[] = [
  {
    quote:
      '[What did this creator actually say? One or two sentences in their own words beats a polished paragraph — ask them what changed after you started editing.]',
    name: '[Their name]',
    channel: '[@their_channel]',
    channelSize: '[20k followers]',
  },
  {
    quote:
      '[Second quote. If you only have one real testimonial, delete this entry rather than filling it in — one true line is worth more than two invented ones.]',
    name: '[Their name]',
    channel: '[@their_channel]',
    channelSize: '[10k followers]',
  },
];

/* -------------------------------------------------------------------------- */
/* Navigation                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * The running order of the page. `href` doubles as the id of the section the
 * scrub rail measures, so no position on the rail is ever written by hand.
 */
export const navLinks = [
  { href: '#work', label: 'Work' },
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Process' },
  { href: '#words', label: 'Words' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
] as const;

/* -------------------------------------------------------------------------- */
/* Enquiry form                                                                */
/* -------------------------------------------------------------------------- */

/**
 * The form asks only what is needed to quote. Every extra field is a reason
 * for someone to close the tab, so if you cannot price differently based on an
 * answer, do not ask for it.
 *
 * There is no backend: submitting composes a prefilled mailto: link. To post
 * to a real endpoint instead, set FORM_ENDPOINT to your Formspree, Basin or
 * Netlify Forms URL and the form will submit there.
 */
export const FORM_ENDPOINT: string | null = null;

export const enquiry = {
  formats: [
    'Reels / short-form',
    'Long-form vlogs',
    'Educational / explainer',
    'Not sure yet',
  ],
  volumes: [
    '1–4 videos a month',
    '5–12 videos a month',
    '12+ videos a month',
    'One-off project',
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* Section copy                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Headings, buttons and labels. These live here for the same reason the rest
 * of the copy does: changing what the site says should never mean opening a
 * component and hunting for a string between the markup and the CSS.
 */
export const copy = {
  hero: {
    primaryCta: 'See the work',
    secondaryCta: 'Start a project',
    stripLabel: 'Formats I cut',
  },
  work: {
    eyebrow: 'The work',
    title: 'Stuff I cut',
    openLink: 'Open on Instagram',
    ctaText: 'Want your channel cut like this?',
    ctaButton: 'Start a project',
  },
  services: {
    eyebrow: 'What I do',
    title: 'Hire me for',
  },
  process: {
    eyebrow: 'How it runs',
    title: 'Brief to posted',
  },
  testimonials: {
    eyebrow: 'Receipts',
    title: 'Bragging rights',
  },
  about: {
    eyebrow: 'The person',
    title: "Who you're hiring",
  },
  contact: {
    eyebrow: 'Say hi',
    title: "Let's talk",
    lead: "Send me a reel you wish had done better, or just say what you're making. I reply to everything that isn't a bulk pitch.",
    copyButton: 'Copy',
    copiedButton: 'Copied',
    submit: 'Send it',
    labels: {
      name: 'Name',
      email: 'Email',
      channel: 'Channel link',
      channelPlaceholder: 'https://instagram.com/…',
      format: 'What you make',
      volume: 'How much',
      message: 'What do you need?',
    },
    errors: {
      name: 'Please enter your name.',
      email: 'Please enter your email address.',
      emailInvalid: 'Please enter a valid email address.',
      channelInvalid: 'Please enter a full link, starting with https://',
      message: 'Please say what you need.',
    },
    notes: {
      mailto:
        'This opens your email app with the message ready to send — nothing is stored on a server.',
      endpoint: 'Your message goes straight to my inbox.',
      sending: 'Opening your email app…',
      copyFailed: 'Copying failed — please copy manually',
    },
  },
  footer: {
    availability: 'Taking on new creators.',
    cta: 'Say hi',
    builtWith: 'Built with Astro.',
    backToTop: 'Back to top',
  },
  skipLink: 'Skip to content',
  /**
   * The scrub rail down the right-hand side. `intro` names the hero, which the
   * header nav leaves out because the wordmark already covers "back to top" —
   * but the rail draws the whole reel, so it needs a first stop.
   */
  rail: {
    label: 'Timeline',
    intro: 'Intro',
  },
} as const;
