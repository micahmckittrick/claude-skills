#!/bin/zsh
# Record the iOS Simulator for a promo reel, with a clean 9:41 status bar.
#
# usage:
#   record.sh start <out.mp4> [udid]   start recording (udid defaults to the booted device)
#   record.sh stop                     stop and finalize the file
#
# Stopping sends SIGINT, which is what makes simctl write a playable file.
set -u
state="${TMPDIR:-/tmp}/app-promo-reels-record"

case "${1:-}" in
  start)
    out="${2:?usage: record.sh start <out.mp4> [udid]}"
    dev="${3:-booted}"
    if [[ -f "$state.pid" ]] && kill -0 "$(cat "$state.pid")" 2>/dev/null; then
      echo "A recording is already running (pid $(cat "$state.pid")). Run: record.sh stop" >&2
      exit 1
    fi
    mkdir -p "$(dirname "$out")"
    xcrun simctl status_bar "$dev" override --time "9:41" --batteryState charged \
      --batteryLevel 100 --wifiBars 3 --cellularBars 4 || exit 1
    xcrun simctl io "$dev" recordVideo --codec=h264 --force "$out" >"$state.log" 2>&1 &
    echo $! >"$state.pid"
    echo "$out" >"$state.out"
    sleep 1
    if ! kill -0 "$(cat "$state.pid")" 2>/dev/null; then
      echo "Recording failed to start:" >&2; cat "$state.log" >&2; exit 1
    fi
    echo "recording -> $out (stop with: record.sh stop)"
    ;;
  stop)
    [[ -f "$state.pid" ]] || { echo "No recording is running." >&2; exit 1; }
    pid="$(cat "$state.pid")"
    kill -INT "$pid" 2>/dev/null
    for _ in {1..50}; do kill -0 "$pid" 2>/dev/null || break; sleep 0.2; done
    out="$(cat "$state.out" 2>/dev/null)"
    rm -f "$state.pid" "$state.out"
    [[ -s "$out" ]] && echo "saved $out" || { echo "Recording file is missing or empty: $out" >&2; exit 1; }
    ;;
  *)
    sed -n '2,8p' "$0"; exit 1 ;;
esac
