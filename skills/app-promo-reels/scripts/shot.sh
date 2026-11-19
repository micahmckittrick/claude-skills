#!/bin/zsh
# Half-size PNG of a Simulator's screen, for checking app state while recording.
# A direct simctl screenshot is current; some live preview panels lag by seconds.
# usage: shot.sh [out.png] [udid]
out=${1:-${TMPDIR:-/tmp}/sim-shot.png}
dev=${2:-booted}
xcrun simctl io "$dev" screenshot "$out.full.png" >/dev/null 2>&1 || { echo "screenshot failed" >&2; exit 1; }
sips -Z 900 "$out.full.png" --out "$out" >/dev/null 2>&1 && rm -f "$out.full.png"
echo "$out"
