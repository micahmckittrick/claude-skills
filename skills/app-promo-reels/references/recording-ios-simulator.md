# Recording on the iOS Simulator

Contents: device setup, demo data, recording, driving the app, websites, finding clip times,
other platforms, troubleshooting.

## Set up one device and keep it

Pick one Simulator model and use it for every reel, so the phone frame and the capture size
stay the same week to week. Note its UDID in `PRODUCTS.md`.

```bash
xcrun simctl list devices available | grep -i iphone     # find a device and its UDID
xcrun simctl boot <udid>                                  # if it isn't booted
open -a Simulator
```

The template expects the capture size of the chosen device. Record one test clip, check its
size, and set `CAPTURE_W` and `CAPTURE_H` at the top of `src/Reel.tsx` to match (for
example 1206 x 2622 for an iPhone 17).

```bash
mdls -name kMDItemPixelWidth -name kMDItemPixelHeight public/footage/test.mp4
```

### Clean status bar

```bash
xcrun simctl status_bar <udid> override --time "9:41" --batteryState charged \
  --batteryLevel 100 --wifiBars 3 --cellularBars 4
```

`scripts/record.sh` applies this automatically. Clear it with
`xcrun simctl status_bar <udid> clear`.

## Demo data

- Prefer the app's own demo or screenshot mode: a launch argument such as `-seedDemo` or
  `-ScreenshotMode`, passed with `xcrun simctl launch <udid> <bundle-id> <args...>`.
  Record the arguments for each product in `PRODUCTS.md`.
- Check what the seed data contains before recording. Seed data sometimes includes real bank,
  merchant or business names; if so, enter fictional data by hand instead.
- Sample dates are often relative to install day, so items drift into "past due" over time.
  Reinstall or reseed when the timeline matters to the story.
- Keep apps installed with their data between weeks; reinstalling wipes it.

## Record

```bash
scripts/record.sh start public/footage/<week>-<product>-<angle>.mp4 [udid]
# ...perform the whole flow...
scripts/record.sh stop
```

Under the hood this runs `xcrun simctl io <udid> recordVideo --codec=h264 <file>` and stops
it with SIGINT, which finalizes the file. A recording killed any other way may be unplayable.

Tips:
- Record the whole flow for one reel in a single take, with a short pause between steps. It
  is easier to cut pauses than to match separate takes.
- Prefix files with the week (`w4-...`) so a week's footage stays together.
- Move deliberately. Fast scrolling looks smeared at 30 fps.

## Drive the app

- Tap and type in the Simulator window, or use an agent's simulator-control tool if one is
  available.
- Some controls (certain switches, sliders) ignore a plain tap and need a short drag.
- Check state with a direct screenshot, `scripts/shot.sh`. Live preview panels in some tools
  lag the app by a few seconds.
- Avoid flows that trigger permission prompts on camera (notifications, location, photos).
  Grant or deny permissions before recording, or cut before the prompt appears.

## Websites

Open the site in Simulator Safari so web reels get the same phone frame as app reels:

```bash
xcrun simctl openurl <udid> "https://example.com/feature"
```

Close tab bars and banners before recording, and scroll to the start position first.

## Find clip times

```bash
swift scripts/contact_sheet.swift public/footage/<file>.mp4 /tmp/sheet.png 1
```

It writes a grid of frames, one per second (or the step you pass), each labeled with its
time. Read the sheet, then pick `from` and `to` for each clip. Use a 0.5-second step around
fast moments.

## Other platforms

- **Android emulator:** `adb shell screenrecord /sdcard/clip.mp4`, then `adb pull`. Match
  `CAPTURE_W` and `CAPTURE_H` to the emulator's resolution.
- **Desktop browser:** record with the browser's device-emulation mode at a phone size, or
  any screen recorder cropped to the viewport. The phone frame may look slightly different
  from Simulator captures.

## Troubleshooting

| Problem | Fix |
|---|---|
| The file won't play | It wasn't stopped with SIGINT. Re-record and stop with `record.sh stop`. |
| Footage looks squashed in the phone | `CAPTURE_W`/`CAPTURE_H` don't match the device. |
| Status bar shows the real time | The override was cleared by a reboot. Run `record.sh start` again. |
| Remotion can't find the clip | Footage must live in `public/footage/`, and `src` is the file name only. |
