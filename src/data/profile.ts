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

/* -------------------------------------------------------------------------- */
/* Types                                                                       */
/* -------------------------------------------------------------------------- */

export interface SocialLink {
  /** Visible label, e.g. "GitHub". */
  label: string;
  /** Full URL. Use a `mailto:` URL for email. */
  href: string;
  /** Short handle shown next to the label, e.g. "@octocat". */
  handle: string;
}

export interface Project {
  name: string;
  /** One sentence: what it is and what you did. */
  summary: string;
  /**
   * The outcome that proves it mattered — users, latency, adoption, revenue.
   * This is the line recruiters actually read, so make it concrete.
   */
  impact: string;
  /** Technologies used, rendered as chips. */
  tech: string[];
  /** Live demo URL. Set to `null` to hide the button. */
  liveUrl: string | null;
  /** Source repository URL. Set to `null` to hide the button. */
  repoUrl: string | null;
  /** Mark one or two as featured to give them a wider grid cell. */
  featured?: boolean;
}

export interface Role {
  title: string;
  company: string;
  location: string;
  /** Machine-readable start date (YYYY-MM) for the <time> element. */
  startDate: string;
  /** Machine-readable end date (YYYY-MM), or null if this is your current role. */
  endDate: string | null;
  /** Human-readable range, e.g. "Jan 2024 — Present". */
  dateLabel: string;
  /** Achievements phrased as outcomes, not duties. Aim for 2–3. */
  highlights: string[];
  tech: string[];
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  dateLabel: string;
  /** GPA, classification or percentage. Set to null to omit. */
  grade: string | null;
  /** Coursework, societies, positions of responsibility. */
  activities: string[];
}

export interface SkillGroup {
  /** Category name, e.g. "Languages". */
  name: string;
  items: string[];
}

/* -------------------------------------------------------------------------- */
/* Identity                                                                    */
/* -------------------------------------------------------------------------- */

export const profile = {
  name: '[YOUR NAME]',
  /** Used for the inline SVG avatar. Two letters works best. */
  initials: '[]',
  /** Your professional title — shown under the hero headline. */
  title: '[Your Professional Title]',

  /**
   * The hero headline. Kept deliberately short: this is set very large, and
   * 2–4 words per line is what makes the typography land.
   */
  headline: ['Software', 'Engineer.'],

  /** One line under the headline that says what makes you different. */
  tagline:
    '[One sentence on what you build and why it matters — the line that makes someone keep reading.]',

  /** Used for <meta name="description"> and Open Graph. Aim for ~155 chars. */
  metaDescription:
    '[Your Name] is a [your title] who [what you do]. Portfolio, work history and contact details.',

  location: '[City, Country]',
  email: '[you@example.com]',
  /** Path or URL to your CV. Drop a PDF in `public/` and point here. */
  resumeUrl: '/resume.pdf',

  /** About section — each string renders as its own paragraph. */
  about: [
    "[Open with what you actually do and who you do it for. Two sentences. Avoid 'passionate about technology' — say what you build instead.]",
    '[Second paragraph: the thread running through your work. What kinds of problems pull you in, and what have you learned from solving them?]',
    '[Third paragraph, optional: what you are looking for now, plus a touch of personality so you read as a person rather than a résumé.]',
  ],

  /** Small stat row under the About text. Keep to three — it reads cleanest. */
  highlights: [
    { value: '[N]+', label: 'Years building software' },
    { value: '[N]+', label: 'Projects shipped' },
    { value: '[N]+', label: 'Open source contributions' },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* Links                                                                       */
/* -------------------------------------------------------------------------- */

export const socials: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/[username]', handle: '@[username]' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/[username]', handle: '/in/[username]' },
  { label: 'Email', href: `mailto:${profile.email}`, handle: profile.email },
];

/* -------------------------------------------------------------------------- */
/* Projects — the section hiring managers scan first                           */
/* -------------------------------------------------------------------------- */

export const projects: Project[] = [
  {
    name: '[Project One]',
    summary:
      '[What it is in one sentence, and specifically what you built. If it was a team project, say which parts were yours.]',
    impact: '[The measurable result — e.g. "Serving 12k monthly users at p99 under 200ms."]',
    tech: ['TypeScript', 'React', 'PostgreSQL'],
    liveUrl: 'https://example.com',
    repoUrl: 'https://github.com/[username]/[repo]',
    featured: true,
  },
  {
    name: '[Project Two]',
    summary: '[What problem it solves and the interesting technical decision you made.]',
    impact: '[e.g. "Cut build times from 9 minutes to 90 seconds across 40 engineers."]',
    tech: ['Go', 'Redis', 'Docker'],
    liveUrl: null,
    repoUrl: 'https://github.com/[username]/[repo]',
  },
  {
    name: '[Project Three]',
    summary: '[What it does and why you built it.]',
    impact: '[e.g. "300+ GitHub stars; adopted by three teams internally."]',
    tech: ['Python', 'FastAPI', 'AWS'],
    liveUrl: 'https://example.com',
    repoUrl: 'https://github.com/[username]/[repo]',
  },
  {
    name: '[Project Four]',
    summary: '[What it does and the hardest part of building it.]',
    impact: '[The outcome, with a number if you have one.]',
    tech: ['Rust', 'WebAssembly'],
    liveUrl: null,
    repoUrl: 'https://github.com/[username]/[repo]',
  },
];

/* -------------------------------------------------------------------------- */
/* Experience — most recent first                                              */
/* -------------------------------------------------------------------------- */

export const experience: Role[] = [
  {
    title: '[Job Title]',
    company: '[Company Name]',
    location: '[City, Country]',
    startDate: '2024-01',
    endDate: null,
    dateLabel: '[Jan 2024] — Present',
    highlights: [
      '[Led or built X, which produced Y. Lead with the outcome, not the task.]',
      '[Improved a number: latency, cost, conversion, error rate. Say by how much.]',
      '[Something showing scope — mentoring, cross-team work, or a design you owned.]',
    ],
    tech: ['TypeScript', 'React', 'Node.js', 'AWS'],
  },
  {
    title: '[Job Title]',
    company: '[Company Name]',
    location: '[City, Country]',
    startDate: '2022-06',
    endDate: '2023-12',
    dateLabel: '[Jun 2022] — [Dec 2023]',
    highlights: [
      '[Shipped X to N users, resulting in Y.]',
      '[Fixed or refactored something meaningful, and what it unlocked.]',
    ],
    tech: ['Python', 'Django', 'PostgreSQL'],
  },
  {
    title: '[Internship Title]',
    company: '[Company Name]',
    location: '[City, Country]',
    startDate: '2021-05',
    endDate: '2021-08',
    dateLabel: '[May 2021] — [Aug 2021]',
    highlights: [
      '[What you built during the internship and whether it shipped to production.]',
    ],
    tech: ['Java', 'Spring Boot'],
  },
];

/* -------------------------------------------------------------------------- */
/* Education                                                                   */
/* -------------------------------------------------------------------------- */

export const education: Education[] = [
  {
    degree: '[B.E. / B.Tech in Your Major]',
    institution: '[University Name]',
    location: '[City, Country]',
    dateLabel: '[2021] — [2025]',
    grade: '[GPA / percentage]',
    activities: [
      '[Relevant coursework: e.g. Distributed Systems, Compilers, Machine Learning]',
      '[Society, club or position of responsibility]',
    ],
  },
  {
    degree: '[Higher Secondary / Diploma]',
    institution: '[School Name]',
    location: '[City, Country]',
    dateLabel: '[2019] — [2021]',
    grade: '[Percentage]',
    activities: ['[Any notable achievement, olympiad or award]'],
  },
];

/* -------------------------------------------------------------------------- */
/* Skills                                                                      */
/* -------------------------------------------------------------------------- */

/**
 * Deliberately no percentage bars: "React 85%" isn't verifiable and tends to
 * read as naive to engineers. Grouped tags communicate range honestly. List
 * these roughly strongest-first within each group.
 */
export const skillGroups: SkillGroup[] = [
  {
    name: 'Languages',
    items: ['TypeScript', 'Python', 'Go', 'Java', 'SQL'],
  },
  {
    name: 'Frameworks & Libraries',
    items: ['React', 'Next.js', 'Astro', 'Node.js', 'FastAPI', 'PostgreSQL'],
  },
  {
    name: 'Tools & Platforms',
    items: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Git', 'CI/CD'],
  },
];

/* -------------------------------------------------------------------------- */
/* Navigation                                                                  */
/* -------------------------------------------------------------------------- */

export const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#education', label: 'Education' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
] as const;
