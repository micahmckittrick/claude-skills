# Change Impact and Testing

Use this to turn a feature, API, design or code change into a focused set of tests, or to
answer "does this still work with X?", without pretending every combination is understood.

## Method

1. **Name the changed contract.** What changed: an input, a state transition, an output, an
   error, a permission, persistence, or compatibility with another version?
2. **Pick evidence for each claim.** A published, versioned contract says what is promised.
   Implementation and existing tests show what currently happens. When they disagree, record
   the contradiction; don't silently pick one.
3. **List the dimensions that could change the result**: user role and permissions, client
   or SDK version, data shape and size, object state, concurrency, dependency failures,
   upgrade and downgrade paths, region or configuration, accessibility.
4. **Combine only where interactions are plausible.** A full cross-product hides priorities;
   a single happy path hides interactions. Pairwise sampling cuts volume but doesn't prove
   full interaction coverage, so say that if you use it.
5. **Classify each scenario**:

| Classification | Meaning | Treatment |
|---|---|---|
| Supported | Direct evidence that it should work | Expected behavior plus a scoped test |
| Conditional | Works only under stated prerequisites | State them; test both sides |
| Unknown | No evidence either way | Ask for the missing artifact; don't invent support |
| Unsupported | Explicitly not supported | Mark skip/blocked unless a negative test is approved |

6. **Write observable expectations, including negative and recovery cases**: retries,
   idempotency (doing it twice has the same effect as once), partial completion, stale state,
   permission changes mid-operation, rollback, and error messages.
7. **Keep planning separate from execution.** An analysis request doesn't authorize creating
   resources, spending money, writing to production or running destructive tests.
8. **Run only authorized cases, in a suitable environment.** Observe state before and after.
   A successful API response doesn't prove that all dependent state has converged.
9. **Report results honestly**: pass, fail, not run, blocked, inconclusive. A test interrupted
   by teardown or a shared-environment change is inconclusive, not passed.

## Test matrix template

```markdown
## Change
Intent: [what changed and why]
Contract / version / commit: [reference]
Affected interfaces and states: [scope]
Known contradictions in evidence: [list or none]

## Matrix
| ID | Scenario | Dimensions | Class | Preconditions | Expected observation | Risk | Evidence | Status |
|---|---|---|---|---|---|---|---|---|
| T1 | [what happens] | [role x version x state] | Supported | [setup] | [observable result] | H/M/L | [ref] | Not run |

## Execution boundary
Environment and permissions: [where tests may run]
Cost, data and destructive limits: [bounds]
Stop and rollback criteria: [conditions]
Not validated: [paths that remain untested, and why]
```

Order the matrix by risk: highest impact multiplied by highest uncertainty first.

## Test plan and test report

**Plan**: scope, out of scope, environment and fixtures, the matrix, entry and exit criteria,
evidence to capture, roles, schedule, known gaps.

**Report**:

```markdown
# Test report: [change], [date]
Summary: [n] pass, [n] fail, [n] blocked, [n] not run, [n] inconclusive.
Recommendation: [ship / ship with conditions / don't ship], because [reason].

## Method: environment, versions, fixtures, dates
## Results
| ID | Result | Observation | Evidence |
|---|---|---|---|
## Failures and their impact
## Gaps: what wasn't tested and the risk that leaves
## Follow-ups: [action, owner]
```

Untested behavior never becomes a support claim in docs, release notes or sales material.

## Worked example (fictional)

Change: a notes app adds "suggested labels" that users can accept or reject.

| ID | Scenario | Class | Expected observation | Status |
|---|---|---|---|---|
| T1 | User accepts a suggestion on a note nobody else is editing | Supported | Label saved; revision increments by 1 | Pass |
| T2 | User accepts a suggestion after a collaborator edited the note | Supported | Accept is rejected as stale; user sees a refresh prompt; collaborator's edit is preserved | Fail: collaborator's edit was overwritten |
| T3 | User accepts while offline, then reconnects | Unknown | Spec doesn't define offline behavior | Not run: needs spec decision |
| T4 | Viewer-role user tries to accept | Supported | Accept control hidden; API returns permission error | Pass |
| T5 | Accept clicked twice quickly | Supported | One label applied; one revision | Inconclusive: test environment reset mid-run |

Recommendation: don't ship until T2 is fixed. T3 needs a product decision before it can be
tested. Re-run T5 in an isolated environment.
