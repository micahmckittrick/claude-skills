# Strategy, Goals and Prioritization

Contents: strategy document, writing good goals, time-boxed goal cycles, OKRs, RICE,
jobs to be done, market requirements, positioning and messaging, slide storylines.

## Strategy document skeleton

```markdown
# [Area] Strategy, [period]
1. Summary: where we are, where we're going, the 3-5 priorities, what we need
2. Where we are: market and customer context, our position, key evidence
3. Where we're going: the target state and why it matters
4. Priorities: 3-5 priorities, each with rationale and the evidence behind it
5. What we will not do: explicit trade-offs
6. Bets and signals: for each priority, the leading and lagging indicators
7. Assumptions and risks: what must be true, and how we will test it
8. Resourcing and dependencies
9. Governance: review cadence, owners, what triggers a strategy update
```

A strategy without "what we will not do" is a wish list. Each priority should be something a
reasonable team could argue against.

## Writing good goals

A good goal is:

- **Outcome-based**: describes a change for users or the business, not a task completed.
- **Measurable**: has a metric, a baseline and a target.
- **Falsifiable**: at the end, everyone can agree whether it was met.
- **Time-bound**: has a date or cycle end.
- **Connected**: traces to a named strategic priority.

| Weak | Strong (hypothetical numbers) |
|---|---|
| Improve onboarding. | Raise the share of new workspaces that complete setup within 7 days from 41% to 55% by 2026-06-30. |
| Ship the new search. | Reduce median time-to-first-result for saved searches from 2.4 s to under 1 s for all tenants by end of cycle. |
| Grow enterprise. | Add 5 new customers with more than 1,000 seats each this quarter. |

If the baseline is unknown, the goal's first milestone is to measure it.

## Time-boxed goal cycles

For teams that run in short cycles (for example six weeks):

1. Each cycle gets one or two falsifiable goals tied to a priority.
2. Break each goal into checkpoints (for example every two weeks) with a concrete
   deliverable or measurement at each.
3. Report status with defined meanings:
   - **Green**: on track to meet the goal's criteria.
   - **Amber**: at risk; a mitigation is in place and named.
   - **Red**: will not meet criteria without intervention; the decision needed is named.
4. End with a retrospective: final status, what was learned, and whether the outcome
   (not just the output) was achieved.

Cycle length, checkpoint cadence and team shape are team choices, not rules.

## OKRs

```markdown
Objective: [qualitative, motivating, time-bound]
- KR1: [metric] from [baseline] to [target] by [date]
- KR2: ...
- KR3: ...
```

- 3-5 key results per objective. Each is an outcome with a number, not a task list.
- Initiatives (the work you'll do) live under the KRs, not inside them.
- Agree the scoring approach with the team (for example whether 70% attainment counts as
  success) and say which approach you use.
- Note dependencies on other teams next to the KR they affect.

## RICE prioritization

RICE (popularized by Intercom) scores candidate work:

```
RICE = (Reach x Impact x Confidence) / Effort
```

| Factor | Definition | Scale |
|---|---|---|
| Reach | People or events affected per fixed period (for example per quarter) | A count |
| Impact | Effect on each person reached | 3 massive, 2 high, 1 medium, 0.5 low, 0.25 minimal |
| Confidence | How well the evidence supports the other estimates | 100% high, 80% medium, 50% low |
| Effort | Total person-months across all disciplines | A number |

Present it as a table with the assumption behind each input:

| Initiative | Reach (per qtr) | Impact | Confidence | Effort (pm) | Score | Key assumptions |
|---|---|---|---|---|---|---|

Pitfalls:

- **False precision**: a score of 5,333 vs. 5,120 is a tie. Group results into bands.
- **Confidence must follow evidence**: a guess with no data is 50%, however exciting it is.
- **Same reach window** for every item, or the comparison is meaningless.
- RICE informs a conversation; strategic fit, dependencies and risk still matter. Say when
  you rank something out of RICE order, and why.

## Jobs to be done

- **Job statement**: When [situation], I want to [motivation], so I can [expected outcome].
- **Dimensions**: functional (the task), emotional (how they want to feel), social (how they
  want to be seen).
- **Current solutions**: what people use today, including workarounds, spreadsheets and doing
  nothing ("non-consumption").
- **Underserved needs**: where current solutions are slow, costly, error-prone or anxious.
- **Evidence**: each job and need cites interviews or observations; mark assumptions.
- **Implications**: what the job means for requirements and for go-to-market.

## Market requirements document

```markdown
1. Summary: opportunity, target market, why now
2. Market: size with method and sources (TAM / SAM / SOM), trends, regulation
3. Customers: segments, needs, buying journey
4. Competition: direct, indirect, and non-consumption; where each wins and loses
5. Market requirements: what the market needs (not our solution), with priority
6. Go-to-market considerations: channels, pricing expectations
7. Risks and open questions
```

Market-size numbers always show the method (top-down or bottom-up), the inputs and their
sources. An unsourced TAM is decoration.

## Positioning and messaging

Positioning statement:

```
For [target customer] who [need or problem], [product] is a [category] that [key benefit].
Unlike [main alternative], it [primary differentiator].
```

Message pillars:

| Pillar | Message | Proof point (evidence) |
|---|---|---|

A proof point is evidence: a measured result, a customer quote with consent, a published
benchmark. A claim without proof is a hypothesis to validate, so label it that way.

## Slide storylines

- Write the headline of every slide as a full sentence that states its point
  ("Setup time is the top reason trials stall"), then build the slide to prove it.
- Read the headlines alone in order. They should tell the whole story.
- One message per slide. Move detail to an appendix.
- The first slide states the ask or decision; the last restates it with next steps.
