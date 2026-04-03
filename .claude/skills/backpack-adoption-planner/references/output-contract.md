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

**What good looks like:** The engineer can read Stage 1 output and immediately correct any misunderstanding about scope before any repo analysis begins.

---

### Stage 2 — Scope Discovery

| Output | Required | Description |
|---|---|---|
| Page map | Yes | Routes, entry points, key pages |
| Component structure summary | Yes | Top-level components, shared wrappers, layout patterns |
| Shared layout / wrapper map | Yes | Components used across multiple pages |
| Styling pattern summary | Yes | Types of non-pure patterns found (override types, frequency) |
| Candidate adoption findings | Yes | Per-item list: file/component, pattern, classification (non-pure / borderline / unclear) |
| Draft migration scope | Yes | Proposed list of items to migrate |
| Draft migration plan hypothesis | Yes | Proposed sequencing with brief rationale |

**What good looks like:** A reader unfamiliar with the repo can understand what exists, what needs to change, and why the draft plan is sequenced the way it is.

---

### Stage 3 — Scope Validation and Refinement

| Output | Required | Description |
|---|---|---|
| Validated findings | Yes | Cleaned adoption findings, false positives removed |
| Unclear items for engineer review | Yes | Items that cannot be classified without engineer decision |
| Dependency map | Yes | Which items depend on which |
| Gap list | Yes | Things found during validation not in the draft scope |
| Blockers | Yes | Hard blockers (missing primitives, design decisions, API gaps) |
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
| Enabler/blocker work units | If any | Items that unblock other work |

---

### Stage 5 — Epic Planning

| Output | Required | Description |
|---|---|---|
| Epic list | Yes | Name and one-line purpose for each epic |
| Epic scope definitions | Yes | What is in and out of each epic |
| Epic dependencies | Yes | Which epics depend on which |
| Flagged external dependencies | If any | Design, infra, or cross-team dependencies |

---

### Stage 6 — Story Breakdown and Estimation

| Output | Required | Description |
|---|---|---|
| Story list per epic | Yes | Name and acceptance criteria for each story |
| Story dependencies | If any | Which stories block which |
| Rough story sizing | Yes | S/M/L or point estimate per story |
| Rough epic sizing | Yes | Aggregate estimate per epic |
| Estimation assumptions | Yes | What was assumed to arrive at estimates |
| Confidence level | Yes | High / medium / low with reason |

---

### Stage 8 — Delivery Output (Final Pack)

Required sections — see `references/final-delivery-template.md` for the template.

| Section | Required |
|---|---|
| Planning summary (executive) | Yes |
| Validated migration scope report | Yes |
| Epic breakdown | Yes |
| Story breakdown | Yes |
| Rough estimation summary | Yes |
| Risks / blockers / assumptions register | Yes |
| Jira-ready planning draft | Yes |
| Execution-ready planning baseline | Yes |

---

## What "good output" looks like across all stages

- **Specific**: references actual file names, component names, and patterns from the repo — not generic descriptions.
- **Classified**: every finding has a classification (non-pure / borderline / unclear / pure).
- **Annotated with assumptions**: every assumption is named, not buried in prose.
- **Dependency-aware**: blockers and sequencing constraints are explicit.
- **Actionable**: an engineer can read it and know what to pick up next.
- **Jira-ready**: epics and stories use the format in `references/jira-output-format.md` — not free-form notes.

---

## What to avoid in outputs

- Vague scope statements ("migrate the layout components")
- File-location-based breakdown ("migrate `src/components/`")
- Estimates without stated assumptions
- Findings with no classification
- Blockers described as "might be an issue" — name them precisely
