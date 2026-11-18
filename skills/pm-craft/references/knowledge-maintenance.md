# Maintaining Reusable Knowledge

Use after a repeated workflow, an investigation, a failure, or a useful improvement, when the
question is "should we write this down, and how?" Also use when cleaning up a wiki or
retiring stale guidance.

A knowledge base becomes dangerous when an old observation reads like a timeless guarantee,
or when general advice quietly carries restricted evidence.

## Is it worth capturing?

| Candidate | Decision |
|---|---|
| A general method with repeat value | Write a bounded, reusable entry |
| Temporary status, or something obvious | Skip it |
| Private product behavior or customer evidence | Keep it in restricted storage; don't turn it into general advice |
| An equivalent entry already exists | Improve that entry instead of adding a competitor |
| An unsupported workaround | Mark it experimental, or reject it |
| An outdated procedure | Supersede or retire it, with a pointer to the replacement |

Capture it when it is durable, actionable, safe to share with the entry's readers, and
expensive to rediscover.

## Method

1. Separate the reusable method from one-off context: specific customers, personal details,
   confidential evidence and temporary workarounds.
2. Search for existing guidance first. Keep one canonical entry per method.
3. Write it with the template below: when it applies, prerequisites, steps, how to verify,
   limits, stop conditions and an owner.
4. Label maturity honestly:
   - **Proposed**: an idea, not yet tried.
   - **Trialed**: worked in a stated context, once or a few times.
   - **Established**: reliable within a declared scope.
   - **Retired**: no longer recommended; points to the replacement.
   One success is "trialed", not a universal rule.
5. Add a small synthetic example and one failure case. No production identifiers, screenshots
   of real data, logs, internal endpoints or incident narratives.
6. Have an appropriate owner review changes. Being able to find a procedure doesn't mean
   everyone may run it.
7. Set review triggers: dependency, interface, permission or evidence changes. Track "last
   reviewed" separately from "last edited".
8. Retire stale entries explicitly: mark them, link the replacement, and remove misleading
   navigation. Follow the actual retention policy for historical material.

## Entry template

```markdown
# [One reusable method, named as a task]
Status: proposed / trialed / established / retired
Applies to: [scope, versions, environments]
Owner: [role] | Last reviewed: [date] | Review when: [triggers]

## Problem
[The repeatable need this solves]

## Before you start
[Prerequisites and permissions]

## Steps
1. ...

## Verify
[Observable success]

## Stop if
[Conditions that mean this method doesn't apply or something is wrong]

## Limits
[What the evidence does not establish]

## Example (synthetic)
[Small invented example, plus one failure case]

## Evidence
[References, with their access level]

Supersedes / replaced by: [links]
```

## Runbook skeleton

For operational procedures that someone will run under pressure:

```markdown
# [Procedure]
When to use: [entry conditions] | When not to use: [exclusions]
Owner: [role] | Last tested: [date]

## Before you start: [access, tools, communication to send first]
## Steps: [numbered; each with expected result and a check]
## Stop conditions: [what means stop and escalate]
## Recovery / rollback: [how to undo]
## Verify: [how to confirm the system is healthy]
## Afterward: [notes to record, people to inform]
```

## Lessons learned and retrospectives

```markdown
# Retrospective: [project or launch], [date]
## Goal and outcome: what we intended, and what happened (with evidence)
## What worked: [keep doing]
## What didn't: [facts first, then contributing factors; no blame]
## What we learned: [insights that change future behavior]
## Actions: [action, owner, date]
## Knowledge updates: [which entries to create, update or retire]
```

Write setbacks as concrete learning, not as blame or as inflated success.
