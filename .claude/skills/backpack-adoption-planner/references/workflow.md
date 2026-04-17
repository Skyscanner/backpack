# Workflow Reference

## Overview

8 stages (+ optional Stage 9 for Jira ticket creation). Each stage has a clear purpose, defined outputs, and a review gate where applicable.
Never auto-advance past a hard review gate. Gate 1 is a soft gate — present and continue.

---

## Stage 1 — Intake and Scope Framing

**Purpose:** Establish a shared planning baseline and build the Backpack component inventory
before touching the repo.

**Inputs:**
- Engineer-provided context (see input-contract.md)
- Repo name / path
- Adoption goal description

**Actions:**
1. Read and acknowledge provided context.
2. Ask for any missing required inputs.
3. Document working assumptions for any gaps.
4. Define the planning objective in one sentence.
5. Draft the scope boundary (what is in scope, what is explicitly out).
6. Draft success criteria (what done looks like).
7. List known unknowns and missing information.
8. **Version check**: Read the target microsite's `package.json`. Find and record the installed
   `@skyscanner/backpack-web` version.
9. **Component inventory**: Scan `packages/bpk-component-*/` in the Backpack repo.
   Identify all available components. Flag V2 / V3 variants and deprecated / superseded components.
   Build component version map: `component → latest recommended → migration path`
   (e.g. BpkCard → BpkCardV2, BpkButton v1 API → BpkButton v2 API).
10. **Cross-reference**: Compare installed version against inventory.
    If a recommended migration target requires a newer Backpack version than what is installed,
    record as a potential blocker.

**Outputs:**
- Planning objective
- Scope boundary (in / out)
- Success criteria
- Working assumptions list
- Missing information list
- Installed Backpack version
- Component inventory map (component → latest → migration path)
- Version gap assessment (blocker if upgrade required)

**Review gate (soft):** Present summary — scope, assumptions, installed version, component
inventory highlights. Continue unless the engineer corrects something. Do not hard-stop.

---

## Stage 2 — Scope Discovery

**Purpose:** Build a factual picture of the repo's current adoption state, including
both non-pure patterns and outdated Backpack component usage.

**Inputs:**
- Repo access (local path or GitHub)
- Validated scope boundary from Stage 1
- Pure Backpack definition (references/pure-backpack-adoption-definition.md)
- Component inventory map from Stage 1

**Actions:**
1. Map pages, routes, and entry points.
2. Map shared layout wrappers, HOCs, and context providers.
3. Identify non-pure patterns per the default definition (and any project overrides):
   raw layout elements, CSS overrides, inline styles, !important, manual token arithmetic.
4. Identify outdated component usage using the component inventory map:
   any component in the map flagged as deprecated / superseded is an adoption target.
   Record its migration target from the map (e.g. BpkCard → BpkCardV2).
5. Classify each finding: non-pure / outdated / borderline / unclear.
6. Note dependencies between components and pages.
7. Identify patterns that appear in multiple places (shared foundations).
8. Draft migration scope: list of items needing adoption work.
9. Draft migration plan hypothesis: proposed sequencing with rationale.

**Finding Record format** — every finding must be recorded with all six fields:

| Field | Description |
|---|---|
| Component / File | Exact name or path |
| Pattern | What non-pure or outdated pattern was found |
| Classification | Non-pure / Outdated / Borderline / Unclear |
| Migration target | Target component or API (e.g. BpkCard → BpkCardV2). Blank if not applicable. |
| Rationale | Why it was classified this way |
| Epic | Assigned epic — back-filled in Stage 5 |

These records are carried into the plan document so that PM, TL, and team reviewers
can trace why each item was included.

**Outputs:**
- Page map (routes / entry points)
- Component structure summary
- Shared layout / wrapper map
- Styling pattern summary
- Candidate adoption findings (with Finding Records)
- Draft migration scope
- Draft migration plan hypothesis

**Review gate — STOP.**
Present the page map, adoption findings (with rationale), and draft migration scope.
Ask the engineer to confirm, correct, or add context before continuing.
See review-gates.md for gate 2 checklist.

---

## Stage 3 — Scope Validation and Refinement

**Purpose:** Stress-test the draft scope. Remove false positives. Surface risks.

**Inputs:**
- Draft migration scope from Stage 2
- Engineer corrections from review gate 2
- Pure Backpack definition
- Version gap assessment from Stage 1

**Actions:**
1. Re-evaluate borderline / unclear items using engineer input.
2. Remove false positives (items that are already pure or out of scope).
3. Map dependencies: which items must be done before others.
4. Identify blockers (missing primitives, API gaps, design decisions needed).
5. If Stage 1 version gap assessment identified a Backpack upgrade needed, record it as a
   hard blocker and list the adoption targets that depend on it.
6. Identify risks (scope creep, test coverage, rollout risk).
7. Identify gaps in the draft plan (things discovered during validation).
8. Update finding records where classification changes — record the reason.
9. Finalize the validated migration scope.

**Outputs:**
- Validated findings (clean list, false positives removed, finding records updated)
- Unclear items flagged for engineer decision
- Dependency map
- Gap list
- Blockers and risks
- Validated migration scope
- Assumptions and unknowns log

**Review gate — STOP.**
Present the validated scope, dependency map, blockers, and risks.
Ask engineer to confirm before moving to breakdown.
See review-gates.md for gate 3 checklist.

---

## Stage 4 — Breakdown Strategy Design

**Purpose:** Decide how to slice the work before building epics.

**Inputs:**
- Validated migration scope from Stage 3
- Breakdown rules (references/breakdown-rules.md)
- Engineer context (team size, sprint cadence, delivery timeline)

**Actions:**
1. Classify scope items into: Foundation / Feature/Page / Enabler/Blocker.
2. If a Backpack version upgrade is a blocker, classify it as Enabler/Blocker — do not fold
   it into a feature epic.
3. Propose a sequencing strategy (dependencies first, parallel where safe).
4. Identify foundation work that must ship before feature work can start.
5. Propose epic groupings based on delivery units, not file structure.
6. Explain the strategy to the engineer with rationale.

**Outputs:**
- Breakdown strategy (named, with rationale)
- Sequencing logic
- Foundation work units
- Feature/page work units
- Enabler/blocker work units

**Review gate:** Present strategy and ask engineer to confirm before building epics.

---

## Stage 5 — Epic Planning

**Purpose:** Define epics as delivery units with clear scope and dependencies.

**Inputs:**
- Approved breakdown strategy from Stage 4
- Validated migration scope
- Jira output format (references/jira-output-format.md)

**Actions:**
1. Create one epic per major delivery unit.
2. Write scope definition for each epic (what is in, what is out).
3. Map epic-to-epic dependencies.
4. Flag epics with external dependencies (design, infra, other teams).
5. Back-fill epic mapping into finding records from Stage 2.
6. Review epic quality: is each epic independently deliverable?

**Outputs:**
- Epic list (name + one-line purpose for each)
- Epic scope definitions
- Epic dependencies
- Flagged external dependencies
- Finding records updated with epic assignment

**Review gate — STOP.**
Present the full epic plan. Ask engineer to correct scope, sequence, or groupings
before breaking into stories.

If epic review fails (engineer requests changes): route back to step 1 of Stage 5
with the engineer's corrections (refined groupings, merged/split epics).
Do not proceed to Stage 6 until the epic plan is confirmed.

---

## Stage 6 — Story Breakdown and Estimation

**Purpose:** Break epics into actionable stories. Attach rough sizing.

**Inputs:**
- Approved epic plan from Stage 5
- Estimation guidance (references/estimation-guidance.md)
- Engineer context (velocity, team familiarity with codebase)

**Actions:**
1. Break each epic into stories (aim for 1–5 days per story).
2. Write acceptance criteria for each story.
3. Note story-level dependencies.
4. Assign a rough size to each story (S/M/L).
5. Aggregate rough epic size.
6. Document estimation assumptions and confidence level.

**Outputs:**
- Story list per epic
- Story scope and acceptance criteria
- Story dependencies
- Rough story sizing
- Rough epic sizing
- Estimation assumptions
- Confidence level (high / medium / low with rationale)

**Review gate — STOP.**
Present full epic + story draft with sizing. Invite corrections before delivery.

Apply corrections using the Minor/Major split:

**Minor correction** — apply inline, proceed to Stage 7:
- Wording changes to story titles or descriptions
- Story size adjustments (e.g. S → M)
- Risk or assumption additions/removals
- Confidence level rationale updates

**Major correction** — route back to the appropriate stage:
| Correction type | Rollback target |
|---|---|
| Scope gap or misclassification found | Stage 3 |
| Epic regrouping needed | Stage 5 (step 1) |
| Breakdown strategy needs to change | Stage 4 |
| Significant discovery area missed | Stage 2 |

---

## Stage 7 — Aggregation

**Purpose:** Consolidate all planning artifacts into a single draft before document production.

**Inputs:**
- All validated and corrected planning artifacts from Stages 1–6

**Actions:**
1. Collect: Epic plan + Story breakdown + Estimation draft + Risks/Blockers/Assumptions
   + Scope findings with rationale (finding records from Stage 2/3).
2. Verify all finding records have their epic field back-filled.
3. Verify no required output section is missing.

**Outputs:**
- Consolidated planning draft (all artifacts assembled)
- Finding records completeness check (all epic fields back-filled, no required section missing)

**No review gate** — assembly step only. Proceed directly to Stage 8.

---

## Stage 8 — Plan Document Delivery

**Purpose:** Produce and deliver the plan document. Jira output is handled in Stage 9.

**Inputs:**
- Consolidated planning draft from Stage 7
- Final delivery template (references/final-delivery-template.md)
- Output contract (references/output-contract.md)

**Actions:**
1. Ask the engineer: "Where should I deliver the plan document?"
   - **Mode A**: Output inline in the conversation.
   - **Mode B**: Engineer provides a Confluence space key or parent page URL.
     Use MCP (`confluence_create_page`) to create the document.
     Prepend TL;DR section at the top.
2. Compile all artifacts into the delivery pack structure.
3. Write the planning summary, validated migration scope report (include finding records),
   dependency map, epic breakdown, story breakdown, estimation summary,
   risks/blockers/assumptions register, and execution-ready baseline.

**Outputs:**
- Plan document (Mode A: inline; Mode B: Confluence page)
- [TL;DR section at top — Mode B only]

**Decision gate** — after delivering the plan document, ask:
"Do you want to create Jira tickets now, or review the plan with your team first?"
- If now: proceed to Stage 9.
- If review first: end session. Stage 9 can be triggered in a new session by providing
  the plan document.

---

## Stage 9 — Jira Ticket Creation (Optional)

**Purpose:** Create Jira tickets from the plan document via MCP or as formatted tables.

**Inputs:**
- Approved plan document from Stage 8 (current session or provided in a new session)

**Actions:**

**Step 9.0 — Collect Jira ticket metadata**
Ask the engineer for the following before creating any ticket:

| Field | Required | Default if skipped |
|---|---|---|
| Project key | Yes | Must be provided — no default |
| Labels | No | backpack-adoption |
| Team | No | Omitted from ticket |
| Component | No | Omitted from ticket |
| Priority | No | Medium |
| Fix version | No | Omitted from ticket |

Apply collected metadata consistently to all tickets created in this session.
If the engineer wants different values on specific tickets, they should update those in Jira
after creation.

**Step 9.1 — Ticket scope selection**
Ask: "What scope of tickets do you want to create?"
- Mode 1: Epics only.
- Mode 2: Epics + Stories.

**Step 9.2 — Creation method**
- MCP available (`mcp__mcp-atlassian__jira_create_issue` accessible):
  Create tickets directly via MCP. Create epics first, then stories (Mode 2 only).
  Report each created ticket (key + title) as it is created.
- MCP unavailable:
  Output tickets as formatted tables.
  Epics table: Title | Goal | Scope IN | Scope OUT | Labels | Estimate | Confidence
  Stories table (Mode 2 only): Title | Epic | Context | Acceptance Criteria | Labels | Size

**Outputs:**
- Created Jira tickets (MCP path): list of ticket keys and titles
- Formatted tables (fallback path): epics table + stories table (Mode 2)

**No review gate** — this is the final output. Close the workflow.

---

## Stage 9 session resume pattern

Stage 9 can run independently in a new session. When resuming:
1. Engineer provides the Stage 8 plan document (or Confluence page URL).
2. Start directly at Step 9.0 — no need to re-run Stages 1–8.
3. Collect metadata, select scope, create tickets.
