#!/bin/zsh
# Renders one week's reels to out/<week>/<name>.mp4: 1080x1920, 30 fps, H.264, silent AAC track.
# usage: ./render-all.sh [week] [name...]   (week defaults to the newest file in src/weeks)
cd "$(dirname "$0")"
week=${1:-$(ls src/weeks | sort | tail -1 | sed 's/\.ts$//')}
shift 2>/dev/null
ids=("$@")
if (( ! $#ids )); then
  # Composition IDs are the top-level keys of the week's `week` object (two-space indent).
  ids=(${(f)"$(grep -oE '^  [A-Za-z0-9]+: \{' src/weeks/$week.ts | sed -E 's/^  ([A-Za-z0-9]+).*/\1/')"})
fi
mkdir -p out/$week
for id in $ids; do
  npx remotion render src/index.ts $id out/$week/$id.mp4 --codec=h264 --crf=18 --enforce-audio-track --log=error || exit 1
  echo "rendered $week/$id"
done
