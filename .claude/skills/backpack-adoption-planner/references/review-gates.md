# Review Gates

## Principle

The skill must stop at each review gate and wait for explicit engineer confirmation before continuing.
Do not auto-advance. Do not summarise a gate and proceed in the same message.

---

## Gate 1 — After Stage 1 (Intake)

**When:** After completing scope framing.

**What to present:**
- Planning objective (one sentence)
- Scope boundary (in / out)
- Success criteria
- Working assumptions
- Missing information list

**What to ask:**
```
Here is my understanding of the planning objective and scope:

[Present Stage 1 outputs]

Before I start analysing the repo:
1. Is the scope boundary correct? Anything to add or remove?
2. Are the success criteria right?
3. Any assumptions I should correct?
4. Anything critical I should know before I start?

Reply to confirm or correct, and I'll begin scope discovery.
```

**Engineer confirms:** Scope boundary, success criteria, assumptions.
**Engineer corrects:** Anything misunderstood about goals, scope, or constraints.

---

## Gate 2 — After Stage 2 (Scope Discovery)

**When:** After generating the page map, adoption findings, and draft migration scope.

**What to present:**
- Page map (routes / entry points)
- Candidate adoption findings with classification
- Draft migration scope
- Draft migration plan hypothesis

**What to ask:**
```
Here is what I found in the repo:

[Present Stage 2 outputs]

Before I validate this scope:
1. Are there any findings you'd remove (false positives)?
2. Are there areas I missed that should be in scope?
3. Do the borderline items look right, or should any be reclassified?
4. Does the proposed sequencing make sense given your context?

Reply with corrections, and I'll validate and refine the scope.
```

**Engineer confirms:** Findings are accurate, draft scope is reasonable.
**Engineer corrects:** False positives, missed areas, wrong classifications, sequencing issues.

---

## Gate 3 — After Stage 3 (Scope Validation)

**When:** After validating the draft scope, mapping dependencies, and identifying blockers.

**What to present:**
- Validated migration scope (clean list)
- Unclear items needing engineer decision
- Dependency map
- Blockers (hard stops)
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

## Gate 4 — After Stage 4 (Breakdown Strategy)

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
2. Is the foundation-first sequencing correct, or should anything start in parallel?
3. Any enabler/blocker work I missed?

Confirm or correct, and I'll build the epic plan.
```

---

## Gate 5 — After Stage 5 (Epic Planning)

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
4. Epic dependencies look correct?

Confirm or correct, and I'll build stories and estimate.
```

---

## Gate 6 — After Stage 6 (Story Breakdown and Estimation)

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

Final review before I produce the delivery pack:
1. Any stories that seem too large or too small?
2. Anything missing from the breakdown?
3. Confidence level and assumptions — do these reflect your context?
4. Any corrections before I generate the final output?

Reply with any final corrections, and I'll produce the delivery pack.
```

---

## How to handle silence or vague confirmation

If the engineer replies with a vague "looks good" or "continue":
- Accept it and proceed.
- Note "Engineer confirmed [gate name] with no corrections" in the output.

If the engineer does not respond to a specific question within the gate:
- Do not proceed until they respond to at least the scope/boundary question.
- Clarifying questions about optional details (e.g. Jira project key) can be skipped if not answered.
