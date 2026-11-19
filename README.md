# Claude Skills

Skills for [Claude](https://claude.ai) that package methods I use day to day: product
management, engineering operations, and marketing my own apps. Each skill lives in its own
folder under [`skills/`](skills).

| Skill | What it does |
|---|---|
| [pm-craft](skills/pm-craft) | PM writing and operating craft: PRDs, specs, strategy and prioritization, launch and customer communication, status and analytics reports, meeting actions, and how-to docs, plus change-impact testing, reliable automation design and agent delegation. It keeps every metric, owner, date and quote traceable instead of invented. |
| [app-promo-reels](skills/app-promo-reels) | Weekly vertical promo reels (Instagram, TikTok, Shorts) for your own iOS apps and websites from real Simulator footage: fresh angles without repeats, a Remotion template with retention-first format rules, on-camera safety checks, and copy-ready captions with a posting schedule. Never posts for you. |

## Install a skill

### Claude apps (claude.ai and the desktop app)

1. Download the skill's `.skill` file from the
   [Releases page](https://github.com/micahmckittrick/claude-skills/releases)
   (for example `pm-craft.skill`).
2. In Claude, open **Settings**, find **Skills** (under Capabilities), and upload the file.
   On Team and Enterprise plans, an admin may need to allow custom skills first.

### Claude Code

Add this repo as a plugin marketplace, then install the skill you want:

```text
/plugin marketplace add micahmckittrick/claude-skills
/plugin install pm-craft@micahmckittrick-skills
```

Or copy a skill folder into your personal skills directory:

```bash
git clone https://github.com/micahmckittrick/claude-skills.git
cp -R claude-skills/skills/pm-craft ~/.claude/skills/
```

## Repo layout

```text
claude-skills/
├── .claude-plugin/marketplace.json   Claude Code marketplace listing
├── skills/
│   └── pm-craft/                     one folder per skill
│       ├── SKILL.md                  instructions Claude loads when the skill triggers
│       ├── references/               guides Claude reads only when a task needs them
│       ├── scripts/                  helper scripts
│       └── evals/                    test prompts and pass/fail checks
└── LICENSE
```

Releases are tagged per skill (`<skill>-v<version>`) and carry that skill's `.skill` file.

## Feedback

Found a problem or have an idea? [Open an issue](https://github.com/micahmckittrick/claude-skills/issues).

## License

[MIT](LICENSE). All example data in these skills is fictional.
