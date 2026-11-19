---
name: app-promo-reels
description: Make short vertical promo reels (Instagram Reels, TikTok, YouTube Shorts) for your own iOS apps and websites from real screen recordings, usually as a weekly batch. Covers planning fresh feature angles without repeats, recording the iOS Simulator, cutting 13-17 second retention-first reels in a bundled Remotion template, rendering, checking them, and writing copy-ready captions with a posting schedule. Use it whenever someone asks for reels, shorts, TikToks or social videos that promote an app or site, wants this week's batch of promo videos, or wants a repeatable app-marketing video pipeline, even if they never mention Remotion. It prepares files and never posts anything itself.
---

# App Promo Reels

This skill turns real app footage into short vertical promo videos: one reel per product,
often a batch every week. Real footage of the actual app beats mockups. It shows the product
honestly and it's cheaper to make.

The pipeline:

```
plan angles -> prepare demo data -> record -> cut beats -> render -> check -> captions -> hand off
```

## Before you start: find or set up the project

Look for an existing reels project first (a folder with `src/Reel.tsx`, `src/weeks/` and
`render-all.sh`), plus the user's notes on their products. If there's none:

1. Copy `assets/remotion-starter/` to a folder the user picks, then run `npm install`.
   Remotion has its own license: free for individuals and small companies, paid for larger
   ones. Mention it once when you set things up.
2. Create `PRODUCTS.md` and `ANGLES.md` in that project from `assets/PRODUCTS.template.md`
   and `assets/ANGLES.template.md`. Ask the user for what you can't discover: the product
   list, App Store or site links, how to launch each app with demo data, the posting order,
   and any wording their end cards must include.

`PRODUCTS.md` holds what stays the same each week. `ANGLES.md` holds what was already shown,
so a feature isn't repeated. Read both at the start of every batch, and update `ANGLES.md`
at the end.

## Weekly workflow

### 1. Plan one angle per product

- Pick a feature or outcome that hasn't been shown yet. Prefer the "unused" list in
  `ANGLES.md`, then explore the app for more.
- Shape each reel as a mini story: a pain point or payoff to open, two or three proof beats,
  then the outcome.
- Write a short shot list per reel: the hook line, each beat's caption, and what to record.
  Show the plan to the user in a few lines and continue unless they redirect.

### 2. Prepare demo data

Use the app's demo or sample-data launch option if it has one. Otherwise enter data by
hand. Everything on screen must be made up: no real people, no real businesses, no real
account names. Read `references/on-camera-safety.md` before recording. It lists what to keep
off camera and how to avoid it.

### 3. Record

Record each reel's whole flow in one take on the iOS Simulator, with the status bar set to
9:41. Use `scripts/record.sh` to start and stop. Record websites in Simulator Safari so the
phone frame matches the app reels. Details, commands and pitfalls:
`references/recording-ios-simulator.md`.

After recording, make a contact sheet (`swift scripts/contact_sheet.swift <video> <out.png> 1`)
to find the exact second each moment happens. Clip times come from the sheet, not from
memory.

### 4. Cut the beats

Add a week file, `src/weeks/<monday>.ts`, and register it in `src/reels.ts`. Each reel is a
list of beats, each with a caption, one or more clips (`{src, from, to, rate?}` in seconds)
and an optional punch-in `zoom`. Follow the format rules in
`references/format-and-captions.md`:

- Open on the pain point or payoff, with a punch-in zoom on beat 1.
- The hook must be readable on frame 0, because frame 0 doubles as the cover.
- Cut every 2-3 seconds, for 13-17 seconds in total.
- Use `endFrames: 54`, a fast end card, so the loop restarts quickly.
- Wrap the payoff words of a caption in `*asterisks*` to color them with the accent.

How the template works and how to adapt it: `references/remotion-template.md`.

### 5. Render

Run `./render-all.sh <monday>`, or add reel IDs to render only some. Each reel takes a minute
or two. Output goes to `out/<monday>/<ReelId>.mp4` at 1080x1920, 30 fps, H.264, with a silent
audio track.

### 6. Check every reel before handing off

Make a contact sheet of each rendered file and check:

- [ ] Frame 0 shows the full hook, readable at phone size.
- [ ] The length is 13-17 seconds; no beat runs much past 3 seconds.
- [ ] Every caption matches what's on screen at that moment.
- [ ] Nothing from `references/on-camera-safety.md` appears, including in background lists.
- [ ] No system dialogs, notification banners or debug overlays.
- [ ] The end card's name, call to action and required footer are correct.
- [ ] The angle differs from every earlier reel for this product.

Fix and re-render anything that fails. Don't hand off a reel you haven't looked at.

### 7. Write captions and the schedule

Add the week to `posts.md` (newest week first), with one copy-ready block per reel: a hook
line, a body with keywords, one explicit prompt (comment, save, share or tag), the
availability line, and 3-5 hashtags. Add a schedule table with the day, the reel and the
file. Formula and examples: `references/format-and-captions.md`. Write descriptions only,
not on-screen scripts, unless the user asks.

### 8. Close out

- Update `ANGLES.md` with this week's angles, and add any new unused ideas you spotted.
- Tell the user where the files are, the schedule, and anything to do in the app before
  posting (add a licensed sound, set the cover to frame 0).

## Boundaries

- Never post, schedule or upload to a social platform, and never message anyone. The output
  is files plus copy-ready text.
- Only show products the user owns or is authorized to promote.
- Don't stage fake reviews, fake numbers or features that don't exist. If a claim in a
  caption needs proof (for example "saves 2 hours a week"), cut it or ask for the source.
- The rendered videos have a silent audio track. Music is added in the platform's app from
  its licensed library; don't bundle commercial music.
