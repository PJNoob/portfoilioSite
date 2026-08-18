/**
 * The scrub rail's waveform, drawn from the page's own content.
 *
 * Every bar's amplitude is the length of one real piece of copy on this page —
 * a reel, a deliverable, a process note, a testimonial, a paragraph — measured
 * against the longest and shortest lines on the whole page. So a dense section
 * reads loud and a thin one reads quiet, the same input always draws the same
 * waveform, and it costs no client-side JavaScript.
 *
 * Bars are grouped by the section they belong to. The rail stretches each
 * group to that section's MEASURED scroll band, which is what makes the
 * drawing a map of the page rather than an analogy of it: the bars over the
 * Work section are the Work section's copy, at the height Work actually
 * occupies.
 */
import { profile, showreelClips, services, processSteps, testimonials, copy, enquiry } from './profile';

/** Every string that earns a bar, in the order the page reads it. */
const sections: { href: string; beats: (string | null)[] }[] = [
  {
    href: '#top',
    beats: [
      profile.title,
      ...profile.headline,
      profile.tagline,
      ...profile.heroPanels,
      profile.location,
      profile.email,
    ],
  },
  {
    href: '#work',
    beats: showreelClips.map((clip) => clip.title),
  },
  {
    href: '#services',
    beats: services.flatMap((service) => [
      service.name,
      service.description,
      ...service.includes,
    ]),
  },
  {
    href: '#process',
    beats: processSteps.flatMap((step) => [step.title, step.detail]),
  },
  {
    href: '#words',
    beats: testimonials.flatMap((quote) => [
      quote.quote,
      quote.name,
      quote.channel,
      quote.channelSize,
    ]),
  },
  {
    href: '#about',
    beats: [
      ...profile.about,
      ...profile.highlights.map((highlight) => `${highlight.value} ${highlight.label}`),
    ],
  },
  {
    href: '#contact',
    beats: [copy.contact.lead, ...enquiry.formats, ...enquiry.volumes],
  },
];

/**
 * Optional copy — a reel with no result line, a service with no price — simply
 * contributes no bar, which is the honest reading: there is nothing there to
 * draw.
 */
const lengths = sections.map((section) =>
  section.beats.filter((beat): beat is string => typeof beat === 'string').map((beat) => beat.length)
);

const all = lengths.flat();
const shortest = Math.min(...all);
const longest = Math.max(...all);

/**
 * Amplitudes run 0.22 to 1, on a log scale.
 *
 * Linear would be wrong twice over: it is not how loudness works, and one long
 * paragraph on the page would flatten every tag and label to a hairline. The
 * floor matters too — a bar of almost no width reads as a rendering fault
 * rather than a quiet moment.
 */
const amplitude = (length: number): number => {
  const t =
    longest === shortest
      ? 0.5
      : Math.log1p(length - shortest) / Math.log1p(longest - shortest);
  return 0.22 + 0.78 * t;
};

/**
 * A fixed comb, applied over the envelope so the drawing reads as audio rather
 * than as a smooth ramp between copy lengths. The envelope is the data; this is
 * texture, and it is a constant so the same content still draws the same bars.
 */
const COMB = [1, 0.64, 0.88, 0.52, 0.96, 0.71, 0.8, 0.58];

/**
 * Resample an envelope to `count` bars, linearly interpolated.
 *
 * The count is derived from how much copy the section holds, and the rail then
 * stretches those bars over the section's measured height — so bar pitch ends
 * up encoding copy per pixel. A section that says a lot in a short space draws
 * fine and busy; a short section spread over a tall band draws chunky.
 */
const resample = (amps: number[], count: number): number[] => {
  if (amps.length === 0) return [];
  const out: number[] = [];
  for (let i = 0; i < count; i += 1) {
    const t = count === 1 ? 0 : (i / (count - 1)) * (amps.length - 1);
    const low = Math.floor(t);
    const high = Math.min(amps.length - 1, low + 1);
    const value = amps[low] + (amps[high] - amps[low]) * (t - low);
    out.push(Math.round(Math.max(0.18, value * COMB[i % COMB.length]) * 1000) / 1000);
  }
  return out;
};

export interface WaveformSection {
  /** The id of the section these bars belong to, as an href. */
  href: string;
  /** Bar amplitudes, 0 to 1, top to bottom. */
  amps: number[];
}

export const waveformSections: WaveformSection[] = sections.map((section, i) => {
  const chars = lengths[i].reduce((sum, length) => sum + length, 0);
  const count = Math.min(80, Math.max(16, Math.round(chars / 18)));
  return { href: section.href, amps: resample(lengths[i].map(amplitude), count) };
});

/** One bar plus its gap, in the SVG's own units. */
export const BAR_PITCH = 3;
export const BAR_HEIGHT = 2;
/** The drawing width, since bars are mirrored about the centre line. */
export const WAVE_WIDTH = 100;
