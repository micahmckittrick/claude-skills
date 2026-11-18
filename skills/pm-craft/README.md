# pm-craft

A Claude skill for product-management writing and engineering operating methods. It helps
Claude draft, review, simplify and fact-check PM documents, and design work like test plans
and automations, without inventing the facts that make those documents trustworthy.

## What it covers

**PM writing**
- Choosing the right document for a reader and a decision
- PRDs (lean and full), feature specs, technical specs, PoC plans, decision records
- Strategy docs, OKRs, goal cycles, RICE prioritization, jobs to be done, market requirements,
  positioning
- Go-to-market plans, announcements, release notes, preview docs, migration guides,
  breaking-change and incident notices, newsletters, technical posts, outreach emails
- Status reports, usage and analytics reports, support-trend analysis, claim and citation audits
- Meeting summaries and action registers, research interviews, engagement records, handoffs,
  work items
- How-tos, troubleshooting guides, guide validation, docs review and publishing

**Operating methods**
- Change-impact analysis and test matrices
- Reliable automation design (scheduled jobs, syncs, bots)
- Agent delegation briefs
- Browser and UI automation plans
- AI working agreements
- Knowledge-base entries, runbooks and retrospectives

## The five rules

Every task runs through the same rules, set out in [SKILL.md](SKILL.md):

1. **Don't invent. Mark the gap.** Missing metrics, owners, dates and quotes become labeled
   placeholders and open questions. Recommendations are welcome, labeled as proposals.
2. **Label each claim's kind**: sourced, estimate, inference or unknown.
3. **Keep states separate**: current vs. proposed, shipped vs. worked, planned vs. executed,
   said vs. agreed.
4. **Write plainly**: lead with the point, one idea per sentence, concrete behavior.
5. **Drafting is not acting**: a draft never authorizes sending, publishing or filing.

## What's inside

| Path | Purpose |
|---|---|
| `SKILL.md` | The rules, the workflow, and a router to the right guide |
| `references/` | 11 guides, loaded only when a task needs them |
| `scripts/draft_check.py` | Flags leftover placeholders, long sentences, filler, vague timing, unowned actions and numbers to verify. Advisory only; no dependencies. |
| `evals/` | Three test cases with pass/fail checks |

## Try it

Prompts that trigger it:

- "Here are my notes from the planning sync. Turn them into a PRD for eng and design review."
- "Summarize this meeting transcript with action items for the team channel."
- "Write a design doc for a nightly job that syncs Zendesk bug tickets into Jira."
- "Fact-check the numbers in this strategy doc before it goes to leadership."
- "Which document should I write to get a decision on deprecating the v1 API?"

## Testing

Three test cases live in [`evals/`](evals): a PRD from messy notes, a meeting summary with
tricky action items, and an automation design doc. On the first run (Claude Opus 5.5, one
run per configuration), the skill passed 27 of 27 checks and the same model without the
skill passed 26 of 27. The difference was retry safety in the automation design. With the
skill, outputs also used consistent structure: testable acceptance criteria, separate
"shipped" and "worked" success criteria, and a source for each claim.

To re-run them with Claude Code (real, billed model runs):

```bash
cd skills/pm-craft
claude plugin eval . --allow-tools Write,Edit,Bash --scaffold
```

## Credits

Built from methods I've collected over years of PM and engineering work, rewritten for
general use. Public frameworks are credited where they appear: RICE (popularized by
Intercom), jobs to be done, OKRs, and the plain-writing rules, which are inspired by
ASD-STE100 Simplified Technical English. All examples and test data are fictional.

## Version history

- **1.0.0**: first release.
