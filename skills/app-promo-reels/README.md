# app-promo-reels

A Claude skill for making short vertical promo reels (Instagram Reels, TikTok, YouTube
Shorts) for your own iOS apps and websites, from real screen recordings, as a repeatable
weekly batch.

It's the pipeline I use to post one reel per product per day: real Simulator footage, a
data-driven Remotion template, retention-first format rules, and copy-ready captions.

## What it does

1. **Plans** one fresh angle per product, using a log of past angles so features don't repeat.
2. **Prepares** fictional demo data and keeps real people, dialogs and sensitive content off camera.
3. **Records** the iOS Simulator with a clean 9:41 status bar, including websites in Simulator Safari.
4. **Cuts** each reel as a few short beats in a Remotion template: hook readable on frame 0,
   a cut every 2-3 seconds, 13-17 seconds in total, and a fast end card for clean loops.
5. **Renders** 1080x1920 H.264 files and checks each one with a contact sheet.
6. **Writes** copy-ready captions (hook, body, one prompt, availability, 3-5 hashtags) and a
   posting schedule.

It never posts, schedules or uploads anything. You post the files yourself.

## What's inside

| Path | Purpose |
|---|---|
| `SKILL.md` | The weekly workflow and the checks before hand-off |
| `references/format-and-captions.md` | Hooks, pacing, layout, end card, caption formula |
| `references/recording-ios-simulator.md` | Device setup, demo data, recording, websites, clip timing |
| `references/on-camera-safety.md` | What to keep off camera, claims and rights |
| `references/remotion-template.md` | How the template works and how to adapt it |
| `scripts/record.sh` | Start and stop a Simulator recording with a clean status bar |
| `scripts/shot.sh` | Direct Simulator screenshot for checking state |
| `scripts/contact_sheet.swift` | Frame grid with timestamps, for finding clip times and reviewing renders |
| `assets/remotion-starter/` | A ready-to-use Remotion project with an example week |
| `assets/PRODUCTS.template.md`, `assets/ANGLES.template.md` | Per-project notes Claude reads each week |

## Requirements

- macOS with Xcode and the iOS Simulator (for recording and the scripts)
- Node.js 18 or later (for Remotion)
- [Remotion](https://www.remotion.dev) 4, installed by `npm install` in the starter.
  Remotion has its own license: free for individuals and small companies, with a paid
  license for larger companies. Check [remotion.dev/license](https://www.remotion.dev/license).

## Try it

- "Make this week's reels for my apps."
- "Set up a reels pipeline for my iOS app and make the first two."
- "Record a 15-second TikTok showing the new export feature in my app."
- "Write the captions and posting schedule for the reels in out/2026-03-02."

The first time, Claude copies the starter into a folder you choose and asks for your product
details to fill in `PRODUCTS.md`.

## Version history

- **1.0.0**: first release.
