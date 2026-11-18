# Launch and Customer Communication

Contents: launch stages, readiness checklist, GTM plan, announcements and release notes,
preview documentation, migration guides, breaking-change notices, incident notices,
newsletters, technical blog posts, outreach emails, customer-facing review checklist.

## Launch stages

| Stage | Who gets it | Main purpose |
|---|---|---|
| Private preview | Selected customers | Learn and iterate with close feedback |
| Public preview | Anyone who opts in | Broader validation, scale, docs |
| General availability | Everyone eligible | Full production use |
| Update | Existing users | Improve or change an existing feature |

Stage names don't define guarantees. Support terms, service levels and pricing come from the
published terms for that product; link them instead of describing them from memory.

## Launch readiness checklist

**Before launch**
- [ ] Feature complete and tested against acceptance criteria
- [ ] Baseline measured; telemetry, dashboards and alerts in place
- [ ] Documentation drafted and reviewed
- [ ] Support briefed, with FAQ and escalation path
- [ ] Rollback plan written and rehearsed
- [ ] Announcement drafted and approved

**Launch day**
- [ ] Feature enabled for the intended audience
- [ ] Docs and announcement published by their owners
- [ ] Monitoring watched; on-call aware

**After launch**
- [ ] First metrics reviewed against the baseline
- [ ] Feedback collected and triaged
- [ ] Critical issues fixed or communicated
- [ ] Outcome reviews scheduled (see "Success: shipped vs. worked" in requirements-docs.md)

## Go-to-market plan skeleton

```markdown
1. Summary: product, target segment, launch stage, objectives, key dates
2. Target segments: who, their problem, how they buy (each with evidence)
3. Value proposition and positioning statement
4. Messaging: primary message, pillars, proof points
5. Pricing and packaging (if applicable)
6. Channels and sales motion: self-serve, sales-led, partner
7. Launch plan: before, during, after, with owners
8. Enablement: sales, support, partners, docs
9. Success metrics: awareness, adoption, outcome, business
10. Budget and resources
11. Risks and mitigations
```

## Announcements and release notes

| Type | Reader | Tone | Typical length |
|---|---|---|---|
| Release note | Existing users | Factual | 1-3 sentences per item |
| Feature announcement | Customers | Clear, benefit-led | 400-800 words |
| Internal announcement | Colleagues | Informal | 200-400 words |
| Technical post | Developers | Detailed | 1,000-2,000 words |

Feature announcement structure:

```markdown
# [Benefit-led headline]
[One paragraph: what's new, who it's for, what it lets them do]

## The problem
[The situation readers recognize, in their words]

## What's new
[What it does, with the 2-4 key capabilities]

## Get started
[Prerequisites, first step, link to docs]

## Availability
[Stage, regions or plans, pricing link, published terms link]

## Learn more
[Docs, tutorial, feedback channel]
```

Short release notice: what is available, who benefits, one next step.

Rules: lead with the reader's benefit, not the feature name. Use concrete outcomes only when
measured. One call to action. No internal codenames or jargon. No promises about future
features unless approved for this audience.

## Preview documentation

```markdown
# [Feature] (Preview)
> Preview notice: [link to the preview terms]. Behavior may change. Not for [stated limits].

## Overview: what it does and who should try it
## Enable or sign up: steps, eligibility, approval time
## Scenarios: 2-3 concrete use cases
## How to: numbered steps, each with expected result
## Known limitations
## Cost: [pricing during preview, or link]
## Troubleshooting
## Feedback and support during preview: channel and expectations
## What's next: how preview ends and what happens to preview resources
```

## Migration guide skeleton

```markdown
# Migrate from [source] to [destination]
## Overview: what changes, why migrate, effort, downtime, reversibility
## Choose a path
| Path | Type | Downtime | Effort | Best for |
|---|---|---|---|---|
## Before you start (checklist)
- [ ] Inventory current configuration and dependencies
- [ ] Record a performance baseline
- [ ] Back up data and confirm you can restore it
- [ ] Rehearse in a test environment
- [ ] Write the rollback plan
- [ ] Notify stakeholders
## Steps
### Step N: [name]
Objective / Prerequisites / Actions / Validation / Expected time / Rollback
## Verify after migration
## Troubleshooting: symptom, cause, fix
## FAQ
```

Every command needs an expected result. Every destructive step needs a warning and a way back.
Examples use placeholders (`<resource-group>`, `<region>`), never real identifiers.

## Breaking-change notice

```markdown
Subject: Action required by [date]: [what is changing]

**What's changing**: [the change, in one or two sentences]
**Who is affected**: [how readers can tell if this applies to them]
**Why**: [the benefit or reason, from the reader's point of view]
**What you need to do**:
1. [action]
2. [action]
**Timeline**:
- [date]: [announcement / tool available / deadline / old behavior removed]
**Resources**: [migration guide, FAQ]
**Questions**: [how to get help]
```

## Incident notices: internal first, then customer

Build the internal record first, then derive the customer notice from it. Writing the
customer notice first invites guesses about cause and timing.

**Step 1: internal record**
- Timeline: detected, confirmed, mitigated, resolved (with times and timezone).
- Impact: who and what was affected, and how you know.
- Cause: state whether it is **suspected** or **confirmed**.
- Mitigation and fix: what was done, status, owner.
- Affected resources: how the list was produced.

**Step 2: customer notice**, derived from step 1
- Remove internal system names, ticket and PR numbers, internal links and people's names.
- Describe customer-visible symptoms, not internal mechanics.
- Lead with any action the customer must take.
- State the current status honestly. Don't call it fixed before verification, and don't
  state a cause before it is confirmed.
- Promise a next-update time only if someone has committed to it.

```markdown
Subject: [Action required / Update]: [service] [symptom]

[One or two sentences: what is happening, who is affected, current status]

**What you need to do**: [action, or "No action is required."]
**What happened**: [customer-visible description]
**Impact**: [what readers experienced, and the time window]
**Current status**: [investigating / mitigated / resolved, with what is verified]
**Next update**: [time, if committed]
```

**Step 3: support FAQ**: "Do I need to do anything?", "Was my data affected?",
"When will it be fixed?", "How can I check whether I'm affected?"

## Newsletters

| | Internal | External |
|---|---|---|
| Tone | Informal, celebratory | Helpful, professional |
| Content | Wins, changes, people (with consent), asks | Product updates, tips, events |
| Measure | Reads, replies | Opens, clicks, actions taken |

Structure: three to five TL;DR bullets, the top story, short updates, one practical tip,
upcoming dates, links. One clear call to action. Credit contributors only with their consent.

## Technical blog post

1. **Hook**: a problem the reader recognizes, in two or three sentences.
2. **Approach**: what you did, at a high level.
3. **How it works**: steps with tested, copy-paste-ready code and a diagram.
4. **Results**: measured outcomes with method, or say none are measured yet.
5. **Limits and alternatives**: what it doesn't do, and when to use something else.
6. **Get started**: prerequisites and first steps.
7. **Resources**.

## Outreach emails

- Confirm the purpose, your relationship to the recipient, and the channel.
- Short, specific subject. Say who you are, why you're writing, and make one ask.
- Don't infer someone's workload, urgency, frustration or buying intent from usage data, and
  don't reveal their usage details or anything about other customers.
- When asking an account contact for an introduction, ask for the introduction; don't write
  as if the contact is the practitioner.
- Draft only. Sending, adding recipients or booking meetings needs the user's go-ahead.

Example (fictional):

> Subject: Quick question about how your team handles release approvals
>
> Hi [name], I'm a product manager on [product]. We're learning how teams handle release
> approvals today. Would you be open to a 30-minute conversation in the next few weeks? This is
> research, not a sales call, and there's no commitment either way. Thanks, [sender]

## Customer-facing review checklist

- [ ] Every capability claim matches released, documented behavior.
- [ ] No internal names, codenames, ticket numbers, private links, or other customers' details.
- [ ] Release stage and terms are linked, not paraphrased.
- [ ] No roadmap promise that isn't approved for this audience.
- [ ] Commands have expected results; destructive steps have warnings and rollback.
- [ ] Images have alt text; headings and tables are accessible.
- [ ] One clear next step.
