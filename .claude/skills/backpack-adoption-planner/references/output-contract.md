# Output Contract

## Standard outputs per stage

### Stage 1 — Intake and Scope Framing

| Output | Required | Description |
|---|---|---|
| Planning objective | Yes | One-sentence statement of what the plan is trying to achieve |
| Scope boundary | Yes | Explicit in/out list — what is covered, what is excluded |
| Success criteria | Yes | Observable conditions that define "done" |
| Working assumptions | Yes | All assumptions made due to missing input |
| Missing information list | Yes | Items that need engineer input before discovery |
| Installed Backpack version | Yes | Version found in target microsite's package.json |
| Component inventory map | Yes | component → latest recommended → migration path |
| Version gap assessment | If applicable | Blocker recorded if upgrade is needed before certain migrations |

**What good looks like:** The engineer can read Stage 1 output and immediately correct any
misunderstanding about scope, and can see which Backpack components will be migration targets
before any repo analysis begins.

---

### Stage 2 — Scope Discovery

| Output | Required | Description |
|---|---|---|
| Page map | Yes | Routes, entry points, key pages |
| Component structure summary | Yes | Top-level components, shared wrappers, layout patterns |
| Shared layout / wrapper map | Yes | Components used across multiple pages |
| Styling pattern summary | Yes | Types of non-pure patterns found (override types, frequency) |
| Candidate adoption findings | Yes | Finding Records for every item (see Finding Record format below) |
| Draft migration scope | Yes | Proposed list of items to migrate |
| Draft migration plan hypothesis | Yes | Proposed sequencing with brief rationale |

**Finding Record format** — every finding must include:

| Field | Required |
|---|---|
| Component / File | Yes |
| Pattern | Yes |
| Classification (Non-pure / Outdated / Borderline / Unclear) | Yes |
| Migration target (e.g. BpkCard → BpkCardV2) | If applicable |
| Rationale | Yes |
| Epic | Back-filled in Stage 5 |

**What good looks like:** A reader unfamiliar with the repo can understand what exists,
what needs to change, why each item is classified the way it is, and what it should migrate to.

---

### Stage 3 — Scope Validation and Refinement

| Output | Required | Description |
|---|---|---|
| Validated findings | Yes | Cleaned adoption findings, false positives removed, records updated |
| Unclear items for engineer review | Yes | Items that cannot be classified without engineer decision |
| Dependency map | Yes | Which items depend on which |
| Gap list | Yes | Things found during validation not in the draft scope |
| Blockers | Yes | Hard blockers (missing primitives, version upgrade required, design decisions) |
| Risks | Yes | Soft risks (scope creep, regressions, timeline pressure) |
| Validated migration scope | Yes | Final, agreed scope to use for breakdown |
| Assumptions / unknowns log | Yes | Updated log of all assumptions made so far |

---

### Stage 4 — Breakdown Strategy Design

| Output | Required | Description |
|---|---|---|
| Named breakdown strategy | Yes | Name + rationale (e.g. "Foundation-first: migrate shared layout primitives before per-page work") |
| Sequencing logic | Yes | Why the order was chosen |
| Foundation work units | Yes | List of foundation items with description |
| Feature/page work units | Yes | List of feature/page items with description |
| Enabler/blocker work units | If any | Items that unblock other work — version upgrades listed here if applicable |

---

### Stage 5 — Epic Planning

| Output | Required | Description |
|---|---|---|
| Epic list | Yes | Name and one-line purpose for each epic |
| Epic scope definitions | Yes | What is in and out of each epic |
| Epic dependencies | Yes | Which epics depend on which |
| Flagged external dependencies | If any | Design, infra, or cross-team dependencies |
| Finding records updated | Yes | Epic field back-filled for all findings |

---

### Stage 6 — Story Breakdown and Estimation

| Output | Required | Description |
|---|---|---|
| Story list per epic | Yes | Name and acceptance criteria for each story |
| Story dependencies | If any | Which stories block which |
| Rough story sizing | Yes | S/M/L per story |
| Rough epic sizing | Yes | Aggregate estimate per epic (in sprints) |
| Estimation assumptions | Yes | What was assumed to arrive at estimates |
| Confidence level | Yes | High / medium / low with reason |

---

### Stage 7 — Aggregation

| Output | Required | Description |
|---|---|---|
| Consolidated planning draft | Yes | All stage outputs assembled: epics, stories, estimates, findings, risks, assumptions |
| Finding records completeness check | Yes | Confirm all finding records have epic field back-filled |

---

### Stage 8 — Plan Document Delivery

| Output | Required | Description |
|---|---|---|
| Plan document | Yes | Full planning pack (see final-delivery-template.md for structure) |
| TL;DR section | Mode B only | Prepended to document when created in Confluence via MCP |

**Plan document required sections:**

| Section | Required |
|---|---|
| Planning summary (executive) | Yes |
| Validated migration scope report (with finding records) | Yes |
| Dependency map | Yes |
| Epic breakdown | Yes |
| Story breakdown | Yes |
| Rough estimation summary | Yes |
| Risks / blockers / assumptions register | Yes |
| Execution-ready baseline | Yes |

---

### Stage 9 — Jira Ticket Creation (Optional)

| Output | Required | Description |
|---|---|---|
| Created ticket list | MCP path | Key + title for every ticket created |
| Epics table | Fallback path | Title, Goal, Scope IN/OUT, Labels, Estimate, Confidence |
| Stories table | Fallback path, Mode 2 | Title, Epic, Context, Acceptance Criteria, Labels, Size |

---

## What "good output" looks like across all stages

- **Specific**: references actual file names, component names, and patterns from the repo — not generic descriptions.
- **Classified**: every finding has a classification (non-pure / outdated / borderline / unclear / pure).
- **Migration target recorded**: every outdated finding names the target component or API.
- **Annotated with assumptions**: every assumption is named, not buried in prose.
- **Dependency-aware**: blockers and sequencing constraints are explicit.
- **Actionable**: an engineer can read it and know what to pick up next.
- **Reviewer-traceable**: finding records carry rationale so PM and TL can understand the plan.

---

## What to avoid in outputs

- Vague scope statements ("migrate the layout components")
- File-location-based breakdown ("migrate `src/components/`")
- Estimates without stated assumptions
- Findings with no classification
- Outdated component findings with no migration target
- Blockers described as "might be an issue" — name them precisely
