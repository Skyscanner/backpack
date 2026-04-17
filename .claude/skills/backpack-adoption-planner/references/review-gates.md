# Review Gates

## Principle

Hard review gates require explicit engineer confirmation before continuing.
Do not auto-advance. Do not summarise a gate and proceed in the same message.

Gate 1 is a **soft gate** — present the summary and continue unless the engineer corrects
something. It does not require an explicit "yes, continue" from the engineer.

---

## Gate 1 — After Stage 1 (Intake) — SOFT

**Type:** Soft gate — present and continue.

**When:** After completing scope framing and building the Backpack component inventory.

**What to present:**
- Planning objective (one sentence)
- Scope boundary (in / out)
- Success criteria
- Working assumptions
- Installed Backpack version
- Component inventory highlights (key deprecated components found, version gap if any)
- Missing information list

**What to say:**
```
Here is my understanding of the planning objective, scope, and Backpack inventory:

[Present Stage 1 outputs]

I'll proceed with scope discovery unless you want to correct anything above.
```

**Continue if:** Engineer does not respond, or confirms with no corrections.
**Pause if:** Engineer provides a correction — apply it and re-present before continuing.

---

## Gate 2 — After Stage 2 (Scope Discovery) — HARD STOP

**When:** After generating the page map, adoption findings, and draft migration scope.

**What to present:**
- Page map (routes / entry points)
- Candidate adoption findings with Finding Records (classification + rationale)
- Draft migration scope
- Draft migration plan hypothesis

**What to ask:**
```
Here is what I found in the repo:

[Present Stage 2 outputs]

Before I validate this scope:
1. Are there any findings you'd remove (false positives)?
2. Are there areas I missed that should be in scope?
3. Do the borderline or outdated items look right, or should any be reclassified?
4. Does the proposed sequencing make sense given your context?

Reply with corrections, and I'll validate and refine the scope.
```

**Engineer confirms:** Findings are accurate, draft scope is reasonable.
**Engineer corrects:** False positives, missed areas, wrong classifications, sequencing issues.

---

## Gate 3 — After Stage 3 (Scope Validation) — HARD STOP

**When:** After validating the draft scope, mapping dependencies, and identifying blockers.

**What to present:**
- Validated migration scope (clean list)
- Unclear items needing engineer decision
- Dependency map
- Blockers (hard stops — including any Backpack version upgrade requirement)
- Risks (soft concerns)

**What to ask:**
```
Here is the validated migration scope:

[Present Stage 3 outputs]

Before I design the breakdown strategy:
1. Are there any unclear items you can now classify?
2. Are the blockers correctly identified?
3. Any missing dependencies I should know about?
4. Is this the scope you want to commit to for planning?

Confirm or correct, and I'll propose a breakdown strategy.
```

**Engineer confirms:** Validated scope, dependency map, blockers.
**Engineer corrects:** Misidentified blockers, missing dependencies, scope adjustments.

---

## Gate 4 — After Stage 4 (Breakdown Strategy) — HARD STOP

**When:** After proposing the breakdown strategy and work classification.

**What to present:**
- Named breakdown strategy with rationale
- Foundation / feature / enabler work units

**What to ask:**
```
Here is the proposed breakdown strategy:

[Present Stage 4 outputs]

Before I build the epics:
1. Does this strategy fit how your team works?
2. Does the proposed sequencing match your delivery constraints?
   Are there items that should start earlier, later, or run in parallel?
3. Any enabler/blocker work I missed?

Confirm or correct, and I'll build the epic plan.
```

---

## Gate 5 — After Stage 5 (Epic Planning) — HARD STOP with intra-stage loop

**When:** After drafting epics with scope and dependencies.

**What to present:**
- Full epic list
- Epic scope definitions
- Epic dependencies

**What to ask:**
```
Here is the proposed epic plan:

[Present Stage 5 outputs]

Before I break these into stories and estimate:
1. Are the epic groupings right?
2. Any epics that are too large or should be merged?
3. Any scope issues — things in the wrong epic?
4. Do the epic dependencies look correct?

Confirm or correct, and I'll build stories and estimate.
```

**If the engineer requests changes:** Route back to Stage 5 step 1 with corrections
(refined groupings, merged/split epics). Do not proceed to Stage 6 until the plan is confirmed.

---

## Gate 6 — After Stage 6 (Story Breakdown and Estimation) — HARD STOP with typed rollback

**When:** After drafting stories, sizing, and confidence level.

**What to present:**
- Full epic + story plan
- Story sizing
- Epic-level estimates
- Confidence level and assumptions

**What to ask:**
```
Here is the full planning draft with stories and estimates:

[Present Stage 6 outputs]

Final review before I produce the plan document:
1. Any stories that seem too large or too small?
2. Anything missing from the breakdown?
3. Confidence level and assumptions — do these reflect your context?
4. Any corrections before I generate the plan document?

Reply with any corrections.
```

**Applying corrections — Minor/Major split:**

**Minor correction** — apply inline, proceed to Stage 7:
- Wording changes to story titles or descriptions
- Story size adjustments (e.g. S → M)
- Risk or assumption additions/removals
- Confidence level rationale updates

**Major correction** — route back to the appropriate stage:

| Correction type | Rollback target |
|---|---|
| Scope gap or misclassification found | Stage 3 |
| Epic needs to be merged, split, or regrouped | Stage 5 (step 1) |
| Breakdown strategy needs to change | Stage 4 |
| Significant discovery area missed in the repo | Stage 2 |

---

## Gate 7 — After Stage 8 (Plan Document) — DECISION GATE

**Type:** Decision gate — not an approval gate.

**When:** After the plan document has been delivered.

**What to ask:**
```
The plan document is ready.

Do you want to create Jira tickets now, or review the plan with your team first?

- "create now" — I'll collect Jira metadata and create tickets.
- "review first" — I'll close the session. You can return to create tickets after your review.
```

**If "create now":** Proceed to Stage 9.
**If "review first":** End the session. Inform the engineer that Stage 9 can be triggered
in a new session by providing the plan document (or Confluence page URL) and requesting
Jira ticket creation.

---

## How to handle silence or vague confirmation

If the engineer replies with a vague "looks good" or "continue":
- Accept it and proceed.
- Note "Engineer confirmed [gate name] with no corrections" in the output.

If the engineer does not respond to a specific question within a hard gate:
- Do not proceed until they respond to at least the scope/boundary question.
- Clarifying questions about optional details (e.g. Jira project key) can be skipped if not answered.
