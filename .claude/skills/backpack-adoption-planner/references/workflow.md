# Workflow Reference

## Overview

8 stages. Each stage has a clear purpose, defined outputs, and a review gate where applicable.
Never auto-advance past a review gate.

---

## Stage 1 — Intake and Scope Framing

**Purpose:** Establish a shared planning baseline before touching the repo.

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

**Outputs:**
- Planning objective
- Scope boundary (in / out)
- Success criteria
- Working assumptions list
- Missing information list

**Review gate:** None — present summary to engineer and invite corrections before proceeding to Stage 2.

---

## Stage 2 — Scope Discovery

**Purpose:** Build a factual picture of the repo's current adoption state.

**Inputs:**
- Repo access (local path or GitHub)
- Validated scope boundary from Stage 1
- Pure Backpack definition (references/pure-backpack-adoption-definition.md)

**Actions:**
1. Map pages, routes, and entry points.
2. Map shared layout wrappers, HOCs, and context providers.
3. Identify non-pure patterns per the default definition (and any project overrides).
4. Classify each finding: non-pure / borderline / unclear.
5. Note dependencies between components and pages.
6. Identify any patterns that appear in multiple places (shared foundations).
7. Draft migration scope: list of items needing adoption work.
8. Draft migration plan hypothesis: proposed sequencing with rationale.

**Outputs:**
- Page map (routes / entry points)
- Component structure summary
- Shared layout / wrapper map
- Styling pattern summary
- Candidate adoption findings (with classification)
- Draft migration scope
- Draft migration plan hypothesis

**Review gate — STOP.**
Present the page map, adoption findings, and draft migration scope.
Ask the engineer to confirm, correct, or add context before continuing.
See review-gates.md for gate 2 checklist.

---

## Stage 3 — Scope Validation and Refinement

**Purpose:** Stress-test the draft scope. Remove false positives. Surface risks.

**Inputs:**
- Draft migration scope from Stage 2
- Engineer corrections from review gate 2
- Pure Backpack definition

**Actions:**
1. Re-evaluate borderline / unclear items using engineer input.
2. Remove false positives (items that are already pure or out of scope).
3. Map dependencies: which items must be done before others.
4. Identify blockers (missing primitives, API gaps, design decisions needed).
5. Identify risks (scope creep, test coverage, rollout risk).
6. Identify gaps in the draft plan (things discovered during validation).
7. Finalize the validated migration scope.

**Outputs:**
- Validated findings (clean list, false positives removed)
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
2. Propose a sequencing strategy (dependencies first, parallel where safe).
3. Identify foundation work that must ship before feature work can start.
4. Propose epic groupings based on delivery units, not file structure.
5. Explain the strategy to the engineer with rationale.

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
5. Review epic quality: is each epic independently deliverable?

**Outputs:**
- Epic list (name + one-line purpose for each)
- Epic scope definitions
- Epic dependencies
- Review-ready epic plan

**Review gate — STOP.**
Present the full epic plan. Ask engineer to correct scope, sequence, or groupings.

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
4. Assign a rough size to each story (S/M/L or points).
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

---

## Stage 7 — Human Review and Correction

**Purpose:** Final engineer review of the full planning draft before delivery output.

**Inputs:**
- Full planning draft from Stages 1–6
- Engineer corrections from all previous review gates

**Actions:**
1. Present a consolidated planning summary.
2. Ask the engineer for any final corrections.
3. Apply corrections to scope, breakdown, blockers, or estimates.
4. Confirm the engineer is satisfied with the output before generating the delivery pack.

**Outputs:**
- Corrected scope
- Corrected breakdown
- Corrected blockers
- Corrected estimates

---

## Stage 8 — Delivery Output

**Purpose:** Produce the final planning pack for handoff and Jira loading.

**Inputs:**
- All validated and corrected planning artifacts
- Final delivery template (references/final-delivery-template.md)
- Output contract (references/output-contract.md)

**Actions:**
1. Compile all artifacts into the delivery pack structure.
2. Generate Jira-ready epic and story drafts.
3. Write the planning summary.
4. Write the risk/blocker/assumptions register.
5. Write the execution-ready baseline statement.

**Outputs:**
- Planning summary
- Validated migration scope report
- Epic breakdown
- Story breakdown
- Rough estimation summary
- Risks / blockers / assumptions register
- Jira-ready planning draft
- Execution-ready planning baseline

**No review gate** — this is the final output. Share with engineer and close the workflow.
