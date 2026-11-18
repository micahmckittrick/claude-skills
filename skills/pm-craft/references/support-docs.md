# Support and How-To Documentation

Contents: choosing the format, how-to skeleton, troubleshooting skeleton, safety rules,
validating step-by-step guides, review and publishing, keeping docs current.

## Choose the smallest useful format

| Reader need | Format |
|---|---|
| "How do I do X?" | How-to (task) |
| "Something is wrong; what do I do?" | Troubleshooting / symptom guide |
| "How does this work and when should I use it?" | Concept guide |
| "What are the exact options?" | Reference |
| "What changed?" | Announcement or release note |
| "Where do I find things?" | Index or landing page |

Every page states: the reader, the scope, supported versions, prerequisites, and a
last-reviewed date.

## How-to skeleton

```markdown
# [Verb] [object] (for example "Rotate an API key")
[One sentence: what this achieves and when to do it]

## Before you begin
- [permission or role needed]
- [tools and versions]
- [anything that must already exist]

## Steps
1. [Action].
   Expected result: [what the reader sees]
2. ...

## Verify
[How to confirm it worked]

## Clean up or undo
[How to reverse it, or remove anything created for testing]

## Next steps
[One or two links]
```

## Troubleshooting skeleton

```markdown
# [Symptom, in the reader's words]

## What you see
[Exact message or behavior]

## What healthy looks like
[Expected behavior, so readers can tell whether this applies]

## Check
1. [Safe, read-only check]. If [result], go to [cause A]. If [result], go to step 2.
2. ...

## Causes and fixes
### [Cause A] (confirmed)
Fix: [steps]. Verify: [how]. Undo: [how].
### [Cause B] (possible; not yet confirmed)
...

## If none of this works
[When to escalate, and what to include: version, timestamps, the output of the checks]
```

## Safety rules

- Use placeholders for resources, accounts and identities (`<project-id>`, `<user@example.com>`).
- Never include secrets, raw logs, customer records, internal routing or unreleased behavior.
- Put diagnostic steps before changes, and read-only steps before writes.
- Flag destructive steps clearly, with a recovery path.
- Mark a confirmed cause and a hypothesis differently.
- Don't claim that a missing field or log line proves something never happened.

## Validating a step-by-step guide

Don't copy an old runbook and assume it still works. For each step, record:

| Step | Prerequisite and permission | Input / command | Expected result | Actual result | Version / environment | Date | Notes |
|---|---|---|---|---|---|---|---|

- Test every variant you publish (each client, language or tool), including long-running
  completion and failure paths.
- If a live result disagrees with the documented contract, record the mismatch and raise it
  with the owner; one observation doesn't redefine the contract.
- Use disposable resources and bounded cost. Never run mutating steps against customer or
  production environments without specific authorization. Clean up only what you created.
- Cover timeouts, quotas, permissions, unsupported regions or versions, partial completion,
  retry and rollback.
- Any path you didn't execute stays marked "not validated".

## Review and publishing

**Before submitting**
- [ ] Accurate against current, released behavior and versioned contracts
- [ ] Sources are fresh enough; release labels are correct
- [ ] Every command has an expected result; destructive steps have warnings and recovery
- [ ] No secrets, private links, customer data or internal identifiers
- [ ] Accessibility: heading order, alt text for images, table headers, link text that makes
      sense on its own
- [ ] Image rights and consent are cleared
- [ ] Roadmap wording is approved for this audience

**Submitting**: confirm the owning repository or site, file placement, navigation, metadata
and reviewers. Use the destination's real review process. Preparing a draft doesn't authorize
merging or publishing it.

**After publishing**: open the live page and check rendering, links, code blocks, tables and
images. Keep the source canonical and note the snapshot date of any export.

## Keeping docs current

- Revalidate when APIs, commands, prerequisites or supported behavior change.
- Automation can find stale pages by comparing release notes or API changes against existing
  docs. Have it propose small, evidence-backed patches for review, not publish changes
  directly. Deduplicate against updates already in flight and avoid unrelated reformatting.
