import type {ReelProps} from '../Reel';
import {brands, themes} from '../themes';

// Example week (fictional products). Copy this file for each new week, named by its Monday.
// Retention-first cut: open on the pain point or payoff with a punch-in, cut every 2-3 s,
// about 15 s total, and a short end card so the loop restarts quickly.
// Clip times are seconds into the recordings in public/footage.
const END = 54;

export const week: Record<string, ReelProps> = {
  LedgerBills: {
    theme: themes.ledger,
    endFrames: END,
    beats: [
      {
        caption: 'Bills sneaking *up on you?*',
        clips: [{src: 'example-ledger.mp4', from: 0.3, to: 2.8}],
        zoom: {scale: 1.25, x: 50, y: 42},
      },
      {caption: 'Add a bill *once*', clips: [{src: 'example-ledger.mp4', from: 3.0, to: 5.8}]},
      {
        caption: 'It repeats *every month*',
        clips: [
          {src: 'example-ledger.mp4', from: 6.0, to: 7.4},
          {src: 'example-ledger.mp4', from: 8.0, to: 9.8, rate: 1.2},
        ],
      },
      {caption: 'Turn on *Auto Pay*', clips: [{src: 'example-ledger.mp4', from: 11.0, to: 13.6}]},
      {
        caption: 'See what’s *still due*',
        clips: [{src: 'example-ledger.mp4', from: 14.0, to: 16.8}],
        zoom: {scale: 1.3, x: 50, y: 58},
      },
    ],
    end: {...brands.ledger, tagline: 'Every bill, every month, on one calendar.'},
  },

  TrailNotesPlan: {
    theme: themes.trailNotes,
    endFrames: END,
    beats: [
      {
        caption: 'Weekend hike, *planned in 10 seconds*',
        clips: [{src: 'example-trail.mp4', from: 0.2, to: 2.6}],
        zoom: {scale: 1.2, x: 50, y: 40},
      },
      {caption: 'Pick a *trail*', clips: [{src: 'example-trail.mp4', from: 3.0, to: 5.6}]},
      {caption: 'Check the *conditions*', clips: [{src: 'example-trail.mp4', from: 6.0, to: 8.8}]},
      {caption: 'Choose a *start time*', clips: [{src: 'example-trail.mp4', from: 9.0, to: 11.6}]},
      {
        caption: 'Saved for *offline*',
        clips: [{src: 'example-trail.mp4', from: 12.0, to: 14.8}],
        zoom: {scale: 1.25, x: 50, y: 80},
      },
    ],
    end: {...brands.trailNotes, tagline: 'Trail plans that work without signal.'},
  },
};
