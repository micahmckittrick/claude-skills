# Plain Writing

A clarity checklist inspired by controlled languages such as ASD-STE100 (Simplified
Technical English). Full controlled English is built for translated maintenance manuals and is
overkill for everyday documents. Aim for most of its discipline without its rigidity: clear,
unambiguous and easy to scan, while keeping real technical terms.

## Rules

1. **Lead with the point.** The first sentence of a document or section states the decision,
   finding or ask. Background comes after.
2. **One idea per sentence.** Aim for 25 words or fewer. If a sentence needs "and", "which" or a
   semicolon to hold two ideas, split it.
3. **Name the actor.** Active voice: "The scheduler retries the job", not "The job is retried".
4. **One term per concept.** Pick a word and keep it. Don't alternate "workspace", "project"
   and "tenant" for variety. Define unfamiliar terms the first time you use them.
5. **Concrete over abstract.** Describe observable behavior, not qualities.
6. **Short noun stacks.** Break up stacks of more than three nouns: "the retry policy of the
   upload service", not "upload service retry policy configuration".
7. **Full sentences.** Keep articles and verbs. Clarity, not telegraphic shorthand.
8. **Structure what has structure.** Numbered lists for sequences, bullets for sets of three
   or more, tables for comparisons.
9. **Modal verbs mean different things.** "Must" is a requirement, "should" a
   recommendation, "can" a capability. "Will" is a commitment, so use it only for one.
10. **State uncertainty directly.** "We haven't measured this yet" beats "this may
    potentially be impacted". Simplifying must never turn a hypothesis into a promise.
11. **Short paragraphs.** Two to four sentences.

## Swaps

| Instead of | Write |
|---|---|
| utilize, leverage | use |
| in order to | to |
| facilitate | help, let, make possible |
| at this point in time | now |
| prior to | before |
| a number of | some, several, or the actual number |
| is able to | can |
| robust, seamless, world-class, best-in-class | the specific property (for example "retries 3 times", "no restart needed") |
| enhanced, optimized, streamlined | what changed, by how much |
| impact (as a verb) | affect, increase, reduce |
| going forward | from [date] |
| it should be noted that | (delete) |

## Before and after (fictional)

**Before**: "The solution will potentially provide enhanced outcomes for users through a
streamlined and scalable workflow experience."
**After**: "The editor suggests a label. The author accepts or rejects it. The editor saves the
decision."

**Before**: "Configuration of the upload service retry policy is to be performed by the
operations team prior to the go-live date in order to ensure robustness."
**After**: "Before launch on 2026-04-01, the operations team sets the upload service to retry
failed uploads 3 times."

**Before**: "There may be some impact to a number of customers."
**After**: "About 120 customers on the legacy plan will see the change. We have not yet
confirmed whether other plans are affected."

## Final pass

- Check every heading, list item, table cell, diagram label and error message, not just
  paragraphs.
- Confirm the shorter version still carries the scope, owners, prerequisites, targets and
  failure behavior.
- Read the headings alone: do they tell the story?
- Search for "TBD", "etc.", "and so on", "various": each usually hides a missing fact.

## Choosing a format for explanations

Pick the cheapest format that makes the idea easy to absorb:

1. **Plain text**: enough for most questions.
2. **A table or diagram**: add one without being asked whenever the topic has shape: a
   sequence, a flow, a decision tree, a before/after, an architecture, or "how A talks to B".
   Mermaid works well inline. Label every node, and prefer several small diagrams to one dense
   one.
3. **A standalone interactive page or longer guide**: offer it, rather than producing it
   unasked, when the topic is big enough to revisit or explore section by section.

A tight paragraph plus a small diagram is often the best answer of all.
