#!/usr/bin/env python3
"""Flag things in a Markdown draft that deserve a second look.

This is a reviewer's aid, not a quality score. Each flag is a prompt for judgment:
some placeholders are intentional, some long sentences are fine, and a flagged number
may already be well sourced. Use it during the audit and plain-language passes.

Usage:
    python draft_check.py draft.md
    python draft_check.py draft.md --max-words 30
    python draft_check.py draft.md --json
    cat draft.md | python draft_check.py -

Checks:
    placeholders   unresolved [brackets], TBD, TODO, ???, XXX
    long           sentences over --max-words words (default 25)
    filler         vague or inflated words (leverage, robust, seamless, ...)
    passive        possible passive voice ("is retried", "was decided")
    timing         relative or ambiguous timing (next week, soon, EOD, Q3 with no year)
    numbers        quantitative claims (%, currency, multipliers) to confirm against a source
    owners         vague ownership ("someone", "the team will", "TBD owner")

Exit code is always 0 unless the file can't be read; the output is advisory.
"""

import argparse
import json
import re
import sys

FILLER = [
    "leverage", "leverages", "leveraging", "utilize", "utilizes", "utilizing",
    "robust", "seamless", "seamlessly", "world-class", "best-in-class", "cutting-edge",
    "game-changing", "synergy", "synergies", "streamline", "streamlined", "enhanced",
    "optimized", "empower", "empowers", "unlock", "unlocks", "holistic", "scalable solution",
    "in order to", "it should be noted", "at this point in time", "a number of",
    "potentially", "various", "etc.", "and so on", "going forward", "best practices",
    "very", "really", "basically", "simply", "just",
]

TIMING = [
    r"\bnext (?:week|month|quarter|sprint|year)\b", r"\bthis (?:week|month|quarter|sprint)\b",
    r"\b(?:tomorrow|yesterday|today|tonight)\b", r"\bsoon\b", r"\bshortly\b", r"\basap\b",
    r"\beod\b", r"\beow\b", r"\bend of (?:day|week|month|quarter)\b", r"\bin a (?:few|couple of) (?:days|weeks)\b",
    r"\bby (?:monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b",
    r"\bQ[1-4]\b(?!\s*(?:FY)?'?\d{2,4})",
]

OWNERS = [
    r"\bsomeone\b", r"\bsomebody\b", r"\bthe team will\b", r"\bowner:\s*(?:tbd|tba|\?)",
    r"\bwe(?:'ll| will) (?:look into|follow up|circle back)\b",
]

PLACEHOLDER = re.compile(
    r"\[(?![ xX]\])(?!\d+\])([^\]\n]{2,})\](?!\()"  # [text] not a checkbox, footnote or link
    r"|\bTBD\b|\bTBA\b|\bTODO\b|\bXXX\b|\?\?\?",
)
NUMBER = re.compile(
    r"(?:[$€£¥]\s?\d[\d,.]*\s?(?:k|m|bn|b|million|billion)?\b)"
    r"|(?:\b\d[\d,.]*\s?%)"
    r"|(?:\b\d[\d,.]*\s?(?:x|times)\s+(?:faster|slower|more|less|higher|lower|better)\b)"
    r"|(?:\b\d[\d,.]*\s?(?:percentage points|pp|bps)\b)",
    re.IGNORECASE,
)
PASSIVE = re.compile(
    r"\b(?:is|are|was|were|be|been|being)\s+(?:\w+ly\s+)?(\w+(?:ed|en))\b", re.IGNORECASE
)
PASSIVE_EXCEPTIONS = {"open", "seen", "often", "even", "given", "happen", "kitchen", "token", "hidden"}


def strip_markdown(line):
    line = re.sub(r"`[^`]*`", "", line)            # inline code
    line = re.sub(r"!\[[^\]]*\]\([^)]*\)", "", line)  # images
    line = re.sub(r"\[([^\]]*)\]\([^)]*\)", r"\1", line)  # links -> text
    line = re.sub(r"^\s{0,3}(?:#{1,6}|[-*+]|\d+[.)]|>)\s+", "", line)
    return line


def sentences(text):
    parts = re.split(r"(?<=[.!?])\s+(?=[A-Z\"'(\[])", text)
    return [p.strip() for p in parts if p.strip()]


def scan(text, max_words):
    findings = []
    in_code = False
    paragraph = []  # (line_no, text) for prose sentence-length checks

    def add(kind, line_no, detail, excerpt):
        findings.append({"check": kind, "line": line_no, "detail": detail, "excerpt": excerpt.strip()[:160]})

    def flush_paragraph():
        if not paragraph:
            return
        start = paragraph[0][0]
        joined = " ".join(t for _, t in paragraph)
        for s in sentences(joined):
            words = len(re.findall(r"[A-Za-z0-9][\w'-]*", s))
            if words > max_words:
                add("long", start, f"{words} words", s)
        paragraph.clear()

    for i, raw in enumerate(text.splitlines(), start=1):
        if raw.strip().startswith(("```", "~~~")):
            in_code = not in_code
            flush_paragraph()
            continue
        if in_code:
            continue
        is_table = raw.strip().startswith("|")
        if is_table and re.fullmatch(r"\s*\|?[\s:|-]+\|?\s*", raw):
            continue  # table separator row
        line = strip_markdown(raw)
        lower = line.lower()

        for m in PLACEHOLDER.finditer(raw):
            add("placeholders", i, "unresolved placeholder", m.group(0))
        for w in FILLER:
            if re.search(r"(?<![\w-])" + re.escape(w) + r"(?![\w-])", lower):
                add("filler", i, f'"{w}"', line)
        for pat in TIMING:
            m = re.search(pat, line, re.IGNORECASE)
            if m:
                add("timing", i, f'"{m.group(0)}" - give an absolute date or keep the phrase and mark it ambiguous', line)
        for pat in OWNERS:
            m = re.search(pat, line, re.IGNORECASE)
            if m:
                add("owners", i, f'"{m.group(0)}" - name an owner or mark it unassigned', line)
        for m in NUMBER.finditer(line):
            add("numbers", i, f'"{m.group(0).strip()}" - confirm unit, population, period, source', line)
        for m in PASSIVE.finditer(line):
            if m.group(1).lower() not in PASSIVE_EXCEPTIONS:
                add("passive", i, f'"{m.group(0)}" - name the actor if it matters', line)

        if is_table or not line.strip():
            flush_paragraph()
        else:
            paragraph.append((i, line.strip()))
    flush_paragraph()
    return findings


def main():
    ap = argparse.ArgumentParser(description="Flag draft issues worth a second look (advisory).")
    ap.add_argument("path", help="Markdown file, or - for stdin")
    ap.add_argument("--max-words", type=int, default=25, help="sentence length threshold (default 25)")
    ap.add_argument("--json", action="store_true", help="emit JSON instead of text")
    args = ap.parse_args()

    try:
        text = sys.stdin.read() if args.path == "-" else open(args.path, encoding="utf-8").read()
    except OSError as e:
        print(f"Cannot read {args.path}: {e}", file=sys.stderr)
        return 2

    findings = scan(text, args.max_words)
    order = ["placeholders", "numbers", "owners", "timing", "long", "filler", "passive"]
    if args.json:
        counts = {k: sum(1 for f in findings if f["check"] == k) for k in order}
        print(json.dumps({"counts": counts, "findings": findings}, indent=2))
        return 0

    if not findings:
        print("No flags. Still read it once more for claims, states and audience.")
        return 0
    titles = {
        "placeholders": "Unresolved placeholders (fill, or list under open questions)",
        "numbers": "Quantitative claims to verify (unit, population, period, source, as-of date)",
        "owners": "Vague ownership",
        "timing": "Relative or ambiguous timing",
        "long": f"Sentences over {args.max_words} words",
        "filler": "Filler or inflated wording",
        "passive": "Possible passive voice",
    }
    for kind in order:
        items = [f for f in findings if f["check"] == kind]
        if not items:
            continue
        print(f"\n## {titles[kind]} ({len(items)})")
        for f in items:
            print(f"  line {f['line']}: {f['detail']}")
            if kind in ("long", "filler", "passive", "timing", "owners", "numbers"):
                print(f"    > {f['excerpt']}")
    print("\nThese are prompts for judgment, not errors. Intentional placeholders are fine if listed as open questions.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
