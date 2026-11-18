# Requirements Documents

Contents: lean PRD skeleton, full PRD additions, testable requirements, users and stories,
success criteria (shipped vs. worked), feature spec, technical spec, PoC, decision record,
plain-language editing, review checklist.

## Lean PRD skeleton

Use this for most features. Add sections from "Full PRD additions" only when the reader needs
them.

```markdown
# [Feature name]: Product Requirements

[Metadata block: type, owner, maturity, related docs, last reviewed, evidence as of]

## 1. Summary
- **Problem**: [one or two sentences, from the user's point of view]
- **Proposal**: [one or two sentences]
- **Why now**: [the trigger: evidence, deadline, dependency]
- **Decision needed**: [what you want reviewers to approve, and by when]

## 2. Problem and evidence
[Current behavior and its cost to users. Each claim sourced or marked unknown.]

## 3. Users and scenarios
- **Primary users**: [who, and the job they are doing]
- **Secondary users**: [who else is affected]
- **Scenarios**: [3-5 concrete situations, as user stories or job statements]

## 4. Goals and non-goals
- **Goals**: [outcomes, not features]
- **Non-goals**: [explicitly out of scope for this release, and why]

## 5. Requirements
| ID | Requirement | Priority | Acceptance criteria |
|---|---|---|---|
| R1 | [one observable behavior] | Must / Should / Could | Given..., when..., then... |

## 6. Quality requirements
[Only those that matter here: performance, reliability, security and privacy,
accessibility, compliance, cost. Each with a measurable target or "unknown".]

## 7. Success criteria
- **Shipped when**: [availability, docs, support readiness]
- **Worked when**: [the user or business outcome, with baseline, target and window]
- **Measurement plan**: [what is instrumented, where, by whom, before launch]

## 8. Dependencies and risks
| Item | Type | Owner | Status | Impact if it slips | Mitigation |
|---|---|---|---|---|---|

## 9. Rollout and outcome review
[Stages, gates, rollback, and when you will review outcomes and decide what's next]

## 10. Open questions and evidence needed
- [ ] [question, who can answer, by when]
```

## Full PRD additions

Add these when several teams, external commitments or significant risk are involved:

- **Background and market context**: competitive alternatives, market trends, research
  summary, each sourced.
- **Experience by surface**: UI, command line, API, SDK, automation templates. Describe
  each surface the feature ships on, and say which surfaces are out of scope.
- **Technical considerations**: architecture sketch, integration points, data
  (what is stored, volume, retention), migration.
- **Go-to-market summary**: segment, positioning, launch stage. Link the GTM plan rather than
  duplicating it.
- **Timeline and milestones**: phases with deliverables and go/no-go criteria per phase.
- **Post-launch resourcing**: who is reserved for stabilization, measurement, accessibility
  fixes and iteration after launch, and for how long.
- **Decision log**: date, decision, rationale, decided by.
- **FAQ**: the questions reviewers will ask, answered.

## Writing testable requirements

A requirement is testable when two people would agree whether it passed.

- One observable behavior per requirement.
- Use Given / When / Then: **Given** [state], **when** [action], **then** [observable result].
- Cover the unhappy paths that matter: validation errors, timeouts, permission failures,
  concurrent edits, retries, partial completion, rollback, offline or degraded dependencies.
- Give every quantitative target a unit, population, time window, measurement method and
  owner. "Fast" is not a target; "p95 under 300 ms for list requests, measured at the API
  gateway over 7 days" is.
- Separate current behavior, required behavior and non-goals. Don't imply support for
  anything that is out of scope.

| Weak | Testable |
|---|---|
| The export should be fast and reliable. | Given a workspace with up to 10,000 records, when a user exports to CSV, then the file downloads within 30 seconds at p95. |
| Users can undo changes. | Given a user applied a bulk edit in the last 10 minutes, when they select Undo, then every record in that edit returns to its prior value and an audit entry records the undo. |
| Handle errors gracefully. | Given the payment provider times out, when checkout is submitted, then the order stays in "pending", the user sees a retry option, and no second charge is created on retry. |

(These examples are hypothetical.)

## Users, stories and jobs

- **User story**: As a [specific user], I want to [action], so that [benefit]. Name a real
  role, not "a user". Keep the solution out of the "I want" clause where possible.
- **Job statement**: When [situation], I want to [motivation], so I can [outcome]. Useful
  when the solution is still open.
- Mark which scenarios come from research and which are assumptions to validate.

## Success: shipped vs. worked

Define two finish lines before building:

- **Shipped**: the feature is available, documented, and support is ready.
- **Worked**: users achieved the intended outcome and the original problem shrank.

Rules:

- Capture a **baseline** before launch. Without one, "worked" can't be shown.
- Instrument before launch: product telemetry, feedback channel, support tagging, a
  dashboard, alert thresholds.
- Schedule outcome reviews (for example around 30, 60 and 90 days; pick what fits the
  product's usage cycle). At each, decide: **continue**, **extend** (promising, needs time),
  **pivot**, or **retire**.
- If no target was agreed, propose one labeled "Proposed" with its reasoning (for example,
  "halve the 40 tickets a month within 60 days, because..."), or leave `[not set]` when
  there is no basis for a number. Never present a proposed target as agreed.
- Low adoption is a signal to investigate, not proof of a cause.
- Record what you learned even when the hypothesis fails.

Metric table:

| Metric | Type | Baseline | Target | Window | Source | Owner |
|---|---|---|---|---|---|---|
| [name] | Adoption / engagement / outcome / quality / business | [value or unknown] | [value] | [period] | [where measured] | [role] |

## Feature spec skeleton

```markdown
# [Feature]: Specification
1. Overview: purpose, link to PRD, success criteria
2. User scenarios and flows (diagram if there are branches)
3. States and transitions: every state an object can be in, and what moves it
4. Functional behavior and business rules
5. Validation rules and limits
6. Errors and edge cases: what the user sees, what the system records
7. API and data: requests, responses, schema changes, compatibility
8. Integration and dependencies
9. Security, privacy and audit
10. Accessibility and localization
11. Testing and acceptance criteria
12. Rollout: feature flags, staged exposure, rollback, monitoring
13. Documentation needed
14. Open questions
```

## Technical spec skeleton

```markdown
# [System or change]: Technical Design
1. Context, goals and non-goals
2. Architecture overview (diagram)
3. Detailed design: components, interfaces, data model
4. Alternatives considered, and why not
5. Security design and threat considerations
6. Performance and scale: expected load, limits, capacity plan
7. Failure modes and resilience: retries, idempotency, degradation
8. Observability: metrics, logs, alerts, dashboards
9. Testing strategy
10. Deployment, migration and rollback
11. Operations and ownership
12. Risks and open questions
```

## Proof of concept

**Plan**: the one question the PoC answers; the hypothesis; success and stop criteria written
**before** starting; scope and permitted shortcuts; validation method; timebox and people;
and which result leads to which decision.

**Report**: what was tested; results as pass, fail, not run or inconclusive; limitations
(what the PoC does not prove, such as scale or security); recommendation; next decision.

## Decision record

```markdown
# [Decision title]
Status: proposed / accepted / superseded | Owner: [role] | Date: [date]
Supersedes / superseded by: [link]

## Context
[The problem, constraints, and the evidence with its limits]

## Options
| Option | Benefits | Costs and risks | Evidence |
|---|---|---|---|

## Decision
[The choice, who made it, and why]

## Consequences
[What changes: behavior, ownership, compatibility, follow-up work, when to revisit]
```

## Plain-language editing of an existing PRD

- Preserve intent, scope, ownership, dependencies and acceptance criteria.
- Cut filler, repetition and abstract phrasing that adds no meaning.
- Prefer short, direct sentences with concrete verbs: who does what, with what result.
- Keep real technical terms that name a system, interface or constraint.
- Use direct headings: "Problem", "Users", "Requirements", "Success", "Risks".
- Rewrite table rows and bullets too; one requirement, owner or criterion per row.
- Keep measurable targets, failure conditions and release gates explicit. Simplify the words
  around them, never the criteria.
- When asked to edit in place, keep the document's structure and formatting.

## Review checklist

- [ ] The summary stands alone and states the decision needed.
- [ ] The problem comes before the solution and is supported by evidence.
- [ ] Goals are outcomes; non-goals are explicit.
- [ ] Every requirement is testable, including the important failure paths.
- [ ] Success has both "shipped" and "worked" criteria, with a baseline plan.
- [ ] Every number has unit, population, period and source, or is marked unknown.
- [ ] Risks have owners and mitigations; dependencies have status.
- [ ] No placeholder or "TBD" is left unexplained; open questions are listed with owners.
- [ ] Terms are consistent from start to finish.
