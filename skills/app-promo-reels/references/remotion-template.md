# The Remotion Template

The starter in `assets/remotion-starter/` is a small Remotion 4 project. One component,
`Reel`, renders any reel from data, so a new reel is a data entry, not new code.

## Layout of the project

```text
src/
├── Reel.tsx        the template: background, phone frame, captions, end card
├── Root.tsx        registers every reel as a Remotion composition
├── index.ts        entry point
├── reels.ts        imports each week file and merges them
├── themes.ts       one look per product, plus end-card fields that don't change
└── weeks/
    └── <monday>.ts one file per week of reels
public/
├── footage/        Simulator recordings (not committed)
└── <icon files>    product icons for end cards (PNG or SVG)
render-all.sh       renders one week to out/<monday>/
```

## Data model

```ts
type Segment = {src: string; from: number; to: number; rate?: number};
// src: file in public/footage; from/to: seconds into that file; rate: playback speed.

type Zoom = {scale: number; x: number; y: number};
// Slow punch-in toward x%, y% of the screen, reaching `scale` about a second into the beat.

type Beat = {caption: string; clips: Segment[]; zoom?: Zoom};
// One caption over one or more clips. "*Words*" in the caption render in the accent color.

type ReelProps = {theme: Theme; beats: Beat[]; end: EndCard; endFrames?: number};
// endFrames: end-card length. 54 (1.8 s) is the recommended fast end card.
```

The reel's length is computed from its clips plus `endFrames`, so you never set a duration.

## Add a week

1. Create `src/weeks/<monday>.ts` (copy the example week). Composition IDs, the object keys,
   must be unique across all weeks; include the angle in the name (`LedgerBills`).
2. Import it in `src/reels.ts` and add it to `weeks`.
3. Preview with `npm run studio` if you want to scrub interactively, or render directly.

```ts
export const week: Record<string, ReelProps> = {
  LedgerBills: {
    theme: themes.ledger,
    endFrames: 54,
    beats: [
      {
        caption: 'Bills sneaking *up on you?*',
        clips: [{src: 'w4-ledger-bills.mp4', from: 0.4, to: 2.6}],
        zoom: {scale: 1.25, x: 50, y: 40},
      },
      {caption: 'Add it *once*', clips: [{src: 'w4-ledger-bills.mp4', from: 5.0, to: 7.4}]},
    ],
    end: {...brands.ledger, tagline: 'Every bill, every month, on one calendar.'},
  },
};
```

## Render

```bash
./render-all.sh 2026-03-02            # every reel in that week
./render-all.sh 2026-03-02 LedgerBills # just one
```

Each reel renders to `out/<monday>/<ReelId>.mp4`: 1080x1920, 30 fps, H.264 at CRF 18, with a
silent audio track (some platforms reject files without an audio track).

## Themes and brands

`themes.ts` holds two things per product:

- a `Theme`: background gradient, two glow colors, text, accent and muted colors, font,
  weight, and optional uppercase, letter-spacing and bezel color;
- the fixed end-card fields: icon, name, call to action and footer. Each reel adds its own
  tagline.

Keep one theme per product across weeks, so the feed reads as a series.

## Adapting the template

- **Different device**: set `CAPTURE_W` and `CAPTURE_H` to the recording size. The phone
  frame keeps that aspect ratio.
- **No Dynamic Island** (older devices, Android): set `SHOW_ISLAND = false`.
- **Bigger phone or more caption room**: adjust `SCREEN_H` and `PHONE_TOP`.
- **Fonts**: system fonts work without setup. For a web font, load it with `@remotion/google-fonts`
  or `staticFile` and set it in the theme.

## Notes

- Remotion's bundled ffmpeg is a minimal build, so don't rely on ffmpeg filters such as
  `drawtext` or `tile` from it. Use the contact-sheet script for frame grids.
- Footage files are large. Keep `public/footage/` and `out/` out of version control.
