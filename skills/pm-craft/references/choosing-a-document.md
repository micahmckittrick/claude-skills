# Choosing and Organizing Documents

## Start from the reader's question

Choose a document by the question it answers for a specific reader, not by habit or by the
folder a template lives in.

| The reader's question | Document | Usual readers |
|---|---|---|
| Should we build this, and what does success look like? | PRD (lean or full) | Product, engineering, design, leadership |
| Exactly how should it behave, including edge cases? | Feature spec | Engineering, test, documentation |
| How will we build it? | Technical spec / design doc | Engineering |
| Will this approach work at all? | PoC plan, then PoC report | Engineering and the decision owner |
| What did we decide, and why? | Decision record | Future team members, reviewers |
| Where are we going, and why? | Strategy document | Leadership, the wider team |
| What will we achieve this period? | OKRs or goal cycle plan | Team and leadership |
| What should we do first? | Prioritization (for example RICE) | Product leadership |
| What job are customers hiring a product to do? | JTBD analysis | Product, design, marketing |
| Is there a market, and what does it need? | Market requirements document | Product leadership |
| How will we bring it to market? | Go-to-market plan | Product, marketing, sales, support |
| What is new, and why should I care? | Announcement or release note | Customers, users |
| What must I do, and by when? | Breaking-change notice, migration guide | Affected customers |
| What happened, and what should I do now? | Incident notice | Affected customers |
| How are we tracking? | Status report | Stakeholders |
| What does the data show? | Analytical or usage report | Decision makers |
| What did we hear and agree? | Meeting summary with action register | Attendees and their teams |
| How do I do this, or fix that? | How-to, troubleshooting guide | Users, support |
| Who picks this up, and where is everything? | Handoff | The successor |

If two very different readers need two different things (for example, executives need the
decision and engineers need the behavior), write two documents and link them. One document
that tries to serve everyone usually serves no one.

## Sizing

- **Lean PRD**: one team, a contained feature, few external commitments.
- **Full PRD**: several teams, a new product or surface, external commitments, or a
  significant risk profile.
- **Decision record instead of a PRD**: when the open question is a single choice between
  options, not a whole product definition.
- Length follows the decision. Word counts and section counts are not quality measures.

## Common sequences

- **New feature**: JTBD or research notes, then PRD, then feature spec and technical spec,
  then GTM plan and announcement, then outcome review after launch.
- **Strategy cycle**: strategy document, then OKRs or goal cycles, then prioritization of the
  candidate work.
- **Customer-impacting change**: decision record, then breaking-change notice, then migration
  guide, then support FAQ.
- **Incident**: internal incident record first, then the customer notice derived from it,
  then the support FAQ.

## Anti-patterns

- **Template overload**: using every section because it exists. Delete what doesn't serve
  the reader.
- **Wrong audience**: an internal template sent externally, or the reverse.
- **Executing before deciding**: drafting the announcement before the problem and success
  criteria are agreed.
- **Solution first**: a PRD that starts from the feature and back-fills a problem.
- **Duplicated truth**: the same requirement maintained in three documents that drift apart.

## Keep a document set healthy

### One canonical home per document

Each durable document has one canonical location, organized by a stable theme or product
area. Link adjacent layers (research, design, tests, tracker items) instead of copying them.
A slide export or PDF names its canonical source and its snapshot date.

| Artifact | What it holds | Where it belongs |
|---|---|---|
| Strategy, PRD, product spec | Direction, requirements, promised behavior | Product document area |
| Decision record | What was decided and why | Decision history |
| Technical design | Implementation | The owning engineering repository |
| Meeting notes | What was heard or agreed | Interaction records with the right access |
| Test evidence | What was tested and observed | A test workspace with the right access |
| Delivery state | Who does what, when | The tracker |

A customer request does not automatically become its own product document; it becomes
evidence linked from the document it informs.

### Metadata block

Put this at the top of durable documents:

```markdown
| Field | Value |
|---|---|
| Type | [PRD / spec / strategy / decision record / ...] |
| Owner | [name or role] |
| Contributors | [names or roles] |
| Maturity | [draft / in review / approved / superseded / archived] |
| Related | [links] |
| Supersedes / superseded by | [links or none] |
| Last reviewed | [date] |
| Review by | [date or trigger] |
| Evidence as of | [date, for any point-in-time numbers] |
```

Document maturity is not release stage. An approved spec for v1 can sit beside a draft
proposal for v2.

### Review and change

- Ask for a specific decision when requesting review ("Approve the scope in section 4" beats
  "Please take a look").
- Review product documents whenever the behavior changes; review strategy when its
  assumptions or ownership change.
- Don't silently rewrite an approved decision. Write a new one that supersedes it, and link
  both directions.
- Move or reclassify existing documents one at a time with the owner; a folder move is not a
  review.
