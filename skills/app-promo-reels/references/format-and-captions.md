# Format and Captions

Contents: reel structure, pacing, hooks, end card, layout and safe areas, caption formula,
examples, schedule and hand-off notes.

## Reel structure

A reel is 3-5 beats plus an end card, 13-17 seconds in total.

| Part | Length | Job |
|---|---|---|
| Beat 1 (hook) | 2-2.5 s | State the pain point or show the payoff. Punch-in zoom on the key element. |
| Beats 2-4 (proof) | 2-3 s each | Show the feature doing the work, one step per beat. |
| Last beat (outcome) | 2-3 s | The result the viewer wants, ideally with a punch-in. |
| End card | 1.8 s (`endFrames: 54`) | Icon, name, one-line tagline, call to action, optional footer. |

Why these numbers: short-form feeds reward watch time and replays. A reel that opens on the
payoff, changes every few seconds, and loops quickly back to a strong first frame keeps
people watching. A long end card is where people swipe away.

## Hooks

The first beat's caption is the hook. It is fully visible on frame 0, so it also works as
the cover.

Good hook patterns (fictional examples):

| Pattern | Example |
|---|---|
| Name the pain | "Bills sneaking up on you?" |
| Question with a twist | "Over budget… *or just not tracking?*" |
| Situation + stakes | "Pet emergency at 2am. *Are you ready?*" |
| Payoff first | "Your whole week, *planned in 10 seconds*" |
| Myth-bust | "You don't need a spreadsheet *for this*" |

Rules:
- Six to eight words at most; it must read at phone size in under a second.
- Concrete beats clever. Name the situation the viewer is in.
- Wrap the payoff words in `*asterisks*` so they render in the accent color.
- Never promise what the footage doesn't show.

## Pacing and motion

- Cut every 2-3 seconds. Trim pauses, loading spinners and typing.
- Use `rate: 1.2-1.3` to speed up slow but necessary moments, such as scrolling or typing a
  short value. Above about 1.4 it starts to look fake.
- Use a punch-in `zoom` on the hook and the outcome: `scale` 1.2-1.3 toward the point that
  matters (`x`, `y` in percent of the screen).
- One idea per beat. If a caption needs "and", split the beat.

## Captions on screen

- Three to six words per beat caption, in the same voice as the hook.
- The caption describes what the viewer sees right now, not what comes next.
- Keep wording identical to the app's labels when you name a feature.

## Layout and safe areas

The template puts captions in the top band and the phone below it, which keeps text clear
of the platform's own interface (the caption, buttons and account name along the bottom and
right edge). If you change the layout:

- Keep captions out of the bottom fifth and the right-hand edge of the frame.
- Keep important on-screen app content in the middle of the phone, not at its very bottom.
- Check one rendered reel in the platform's upload preview before scheduling the rest.

## End card

- Icon, product name, a one-line tagline that is specific to this reel's angle, a call to
  action ("Free on the App Store", or the site's address), and an optional footer.
- Use the footer for required lines: pricing honesty ("2 accounts free, optional Pro"),
  disclaimers ("For information only. Always ask your vet."), or non-affiliation notices
  when the product shows another company's game or data.

## Caption formula (the post description)

Every reel gets one copy-ready block:

```text
<Hook line, matching the on-screen hook> <one emoji, optional>

<Body: 1-3 sentences on what the feature does, with the words people search for.>

<One explicit prompt: a comment question, "save this for...", "share with...", or "tag someone who...">

<Availability: price model, platforms, "Link in bio" for Instagram.>

#tag1 #tag2 #tag3 #tag4 #tag5
```

- 3-5 hashtags: one or two broad ones, the rest specific to the angle. No banned or
  unrelated trending tags.
- One prompt only. Questions people can answer in a word or two work best.
- Don't claim results you can't support ("saves hours") or rankings ("#1 app").

Example (fictional product):

```text
Bills sneaking up on you? 📅

Add a bill once in Pocket Ledger and it repeats every month. See what's still due, look
ahead to next month, and spot every due date on the calendar.

Which bill do you always forget? 👇

Free for 2 accounts, optional one-time Pro. iPhone & iPad. Link in bio.

#budgeting #billtracker #personalfinance #moneytips #iphoneapps
```

## posts.md layout

```markdown
# Post descriptions

Copy the block under each reel and paste it as the description. Reels are in `out/<week>/`.

## Week of <Mon date> (`out/<monday>/`)

| Day | Reel | File |
|---|---|---|
| Mon <date> | <Product>: <angle> | `out/<monday>/<ReelId>.mp4` |

### Mon <date>: <ReelId>.mp4

<copy-ready block>
```

Newest week goes first, so the user always finds this week at the top.

## Hand-off notes for the user

Include these each week, briefly:

- The videos have a silent audio track. Add a licensed sound in the platform's app.
- Set the cover to frame 0, which shows the hook.
- Post in the schedule order so each product keeps its weekday slot.
