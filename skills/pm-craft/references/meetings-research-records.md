# Meetings, Research and Records

Contents: meeting summaries, extracting actions, action registers, research interviews,
customer engagement records, handoffs and return-from-absence digests, work items, client
feature requests.

## Meeting summaries

Read the whole transcript or notes before drafting. Context later in a meeting often changes
the meaning of something said earlier.

```markdown
# [Meeting topic], [date] [timezone]
Source: [transcript / notes / recording], coverage: [full / partial: what's missing]
Attendees: [names or roles exactly as given]

## Purpose
## Key points by topic
### [Topic]
- [point]; mark who said it when attribution matters
## Decisions
- [decision], decided by [who], [conditions if any]
## Action items
| # | Action | Owner | Due (original phrase) | Status | Source |
|---|---|---|---|---|---|
## Not assigned yet
- [suggestions and open asks with no owner]
## Open questions
```

Rules:

- Don't infer roles, intent or commitments that weren't stated.
- Keep disagreement visible. Keep conditional statements conditional ("if legal approves...").
- Separate what a customer said from your interpretation of it.
- Copy quantities and dates exactly as stated; flag any you had to interpret.

## Extracting actions

| What was said | How to record it |
|---|---|
| "I'll send the draft after the review." | Action; owner is the speaker; due "after the review" |
| "Can you check the quota limits?" + "Sure." | Action; owner is the person who agreed |
| "Can you check the quota limits?" (no reply) | Request; owner unconfirmed |
| "Someone should look at the pricing page." | Not assigned; list under "Not assigned yet" |
| "Maybe we revisit this next month." | Tentative timing, not a deadline |
| "We decided to drop offline mode from v1." | Decision; record it, plus any implied follow-up |
| "The draft went out yesterday." | Completion evidence for the matching action |
| Nothing said later about an action | Keep its prior status; silence is not completion |

More rules:

- **Owner**: the name or role as given, or `unknown`. Never assign the most likely person.
- **Due date**: convert relative timing to a date only when the meeting date and timezone are
  known, and keep the original phrase beside it. Mark business-day ambiguity
  ("end of week" for a team spread across timezones).
- **Deduplicate by intent**, not by similar wording, and keep each source.
- **Coverage gaps**: a calendar entry is not a transcript. List meetings or sections you
  couldn't read.
- Drafting the register doesn't authorize sending the summary, creating tasks in another
  system, or messaging owners.

## Action register (across meetings)

```markdown
## Coverage
Period and timezone: [ ] | Sources reviewed: [ ] | Missing sources: [ ]

| ID | Action | Owner | Due / timing cue | Status | Source | Change or completion evidence |
|---|---|---|---|---|---|---|

## Not assignments
[suggestions, unowned asks, open questions]

## Clarifications needed
[specific questions to resolve ownership or timing]
```

## Research interviews

**Preparation**
- State the purpose, how notes are stored, who will read them, and retention. Get separate
  consent for notes, recording, and sharing summaries.
- Ask about a recent, real instance of the workflow: what happened, the decisions made, the
  constraints, the consequences, and the workarounds. Avoid pitching or leading questions.

| Leading (avoid) | Neutral (use) |
|---|---|
| "Would a dashboard help you?" | "Walk me through the last time you checked on this. What did you do first?" |
| "Isn't setup painful?" | "How long did setup take last time? What took the most time?" |

**Notes**, kept in separate sections: firsthand facts, verbatim quotes (attributed), paraphrases,
your observations, and your hypotheses. Include date, topic, consent state, open questions,
and any actions the participant actually agreed to.

**Synthesis**: a finding has three parts: the facts, a testable hypothesis, and links to the
supporting notes. A pattern across customers needs independent evidence from each. A
conversation with an account manager about a customer is context, not an interview with that
customer. A usage drop is not evidence of migration; a usage rise is not evidence of value.

## Customer engagement record

One record per customer, kept separate from every other customer's data.

- **Reconciled fields** (kept current): overview, goals, requirements, pain points, gaps,
  open items, status. Record what the customer needs whether or not the product supports it;
  only unmet needs become product asks.
- **Append-only history**: dated log of interactions and observations. Correct mistakes with
  a traceable note rather than deleting history. Deduplicate by source and date.
- **Provenance**: tag each statement as sourced, author observation, or inference, and keep a
  register of sources with date and access level.
- When processing a new meeting, update the record; don't rebuild it from scratch.

## Handoffs and return-from-absence digests

```markdown
# Handoff: [scope], [date]
## Scope and sources: [period, what was reviewed]
## Current state: [what is actually done; where the canonical artifacts are]
## Decisions and changes: [approved changes, separate from proposals]
## Open actions and blockers
| Action | Owner | Due | Evidence |
|---|---|---|---|
## Uncertainty: [unvalidated behavior, missing evidence, open decisions]
## Next safe action: [the smallest useful next step]
```

For a return-from-absence digest, cover the period away: decisions made, changed plans,
actions assigned to the person, unresolved blockers and time-sensitive requests, each with
its source. Keep proposals separate from decisions. Don't claim validation that didn't happen,
and keep credentials and machine-specific paths out.

## Work items and tickets

1. Check whether an equivalent item already exists.
2. Draft: title, problem, evidence, user impact, scope, non-goals, acceptance criteria,
   dependencies, open questions.
3. Separate the reported symptom from the suspected root cause.
4. Use the destination's real item types and fields; don't guess an owner, parent or area.
5. Keep private customer details out of titles and descriptions that many people can see.
6. Show the full draft and the intended destination, and get approval before creating or
   changing anything. After an approved write, read the item back and verify its fields,
   links and hierarchy.

## Client feature requests (CLI, SDK, automation tooling)

When proposing a new command, parameter or SDK method:

- Start from the approved API contract. Trace required fields, enums, defaults, pagination,
  long-running operations and errors. Never invent an endpoint, field or flag.
- State: the user scenario, the current gap, the proposed interface (names, types, defaults,
  validation), placeholder examples, compatibility, acceptance criteria and references.
- Distinguish a thin wrapper over a REST call from a released native command.
- Follow the target project's public contribution guide. Draft the issue; filing it is the
  user's call.
