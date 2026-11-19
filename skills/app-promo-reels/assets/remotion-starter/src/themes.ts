import type {EndCard, Theme} from './Reel';

const SYSTEM = 'system-ui, -apple-system, "Helvetica Neue", sans-serif';
const SERIF = 'ui-serif, "New York", "Hoefler Text", Georgia, serif';

// A dark look with white text: background gradient, two drifting glows, accent color.
const dark = (bg: [string, string], glow: [string, string], accent: string, font = SYSTEM): Theme => ({
  bg,
  glow,
  accent,
  text: '#ffffff',
  muted: 'rgba(255,255,255,0.72)',
  font,
  weight: 800,
});

// One look per product, shared by every week's reels so the feed reads as a series.
// These two are examples; replace them with your products.
export const themes = {
  ledger: dark(['#0a1a3a', '#030816'], ['#1d4ed8', '#0e7a4a'], '#4ade80'),
  trailNotes: {
    bg: ['#f6f2e9', '#e7e0cf'],
    glow: ['#9ccfb7', '#e9c98f'],
    text: '#173f33',
    accent: '#1f7a5a',
    muted: 'rgba(23,63,51,0.75)',
    font: SERIF,
    weight: 800,
  },
} satisfies Record<string, Theme>;

// End-card fields that don't change week to week; each reel adds its own tagline.
// Icons live in public/ (PNG or SVG).
export const brands = {
  ledger: {
    icon: 'icon-example.svg',
    name: 'Pocket Ledger',
    cta: 'Free on the App Store',
    footer: '2 accounts free · optional one-time Pro',
  },
  trailNotes: {
    icon: 'icon-example.svg',
    name: 'Trail Notes',
    cta: 'trailnotes.example',
    footer: 'Plan, hike, remember',
  },
} satisfies Record<string, Omit<EndCard, 'tagline'>>;
