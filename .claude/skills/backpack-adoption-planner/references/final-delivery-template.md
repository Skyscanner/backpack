# Final Delivery Template

Use this template to produce the Stage 8 delivery pack.
Replace all `[PLACEHOLDER]` values with actual content.
Remove sections that are not applicable — do not leave blank sections.

---

<!-- TL;DR section — include when creating in Confluence (Mode B). Remove for inline delivery (Mode A). -->

## TL;DR

**What this is:** Backpack adoption plan for [Repo name]

**Scope:**
- [Key page or area 1]
- [Key page or area 2]
- [Shared layout / wrappers if applicable]

**Total effort:** [N sprints] | **Confidence:** [High / Medium / Low]

**Top risk:** [One sentence — e.g. "BpkSectionLayout requires v43 which is not yet installed"]

**First action:** [What to start with — e.g. "Epic 0: Backpack version upgrade"]

---

# Backpack Adoption Planning Pack
## [Repo name] — [Date]

---

## 1. Planning Summary

**Objective:** [One sentence — what this plan is trying to achieve]

**Scope:** [High-level description of what is in scope — pages, components, patterns]

**Out of scope:** [Explicit exclusions]

**Success criteria:**
- [ ] [Condition 1 — observable, specific]
- [ ] [Condition 2]

**Breakdown strategy:** [Strategy name + one-line rationale]

**Rough total effort:** [e.g. 4–6 sprints for a team of 2]
**Confidence:** [High / Medium / Low — with reason]

---

## 2. Validated Migration Scope

### Finding records

| Component / File | Pattern | Classification | Migration Target | Rationale | Epic |
|---|---|---|---|---|---|
| [file or component name] | [e.g. inline flex layout] | Non-pure | BpkStack | Raw layout — no Backpack primitive used | Epic 1 |
| [file or component name] | [e.g. className override on BpkCard] | Non-pure | — | Bypasses component contract | Epic 2 |
| [file or component name] | [e.g. BpkCard usage] | Outdated | BpkCardV2 | BpkCardV2 is the recommended API | Epic 2 |
| [file or component name] | [e.g. semantic wrapper — no layout impact] | Borderline / Accepted | — | Engineer confirmed no layout influence | — |

### Borderline items and decisions

| Item | Pattern | Decision | Rationale |
|---|---|---|---|
| [component] | [pattern] | [Accepted as pure / Treat as non-pure] | [Why] |

### False positives removed

| Item | Reason removed |
|---|---|
| [component] | [e.g. already uses BpkStack, was misclassified in draft] |

---

## 3. Dependency Map

| Epic | Blocked by | Enables |
|---|---|---|
| Epic 0 — Foundation | — | Epic 1, Epic 2 |
| Epic 1 — [Title] | Epic 0 | Epic 3 |
| Epic 2 — [Title] | Epic 0 | — |
| Epic 3 — [Title] | Epic 1 | — |

**External dependencies:**

| Dependency | Affects | Status |
|---|---|---|
| [e.g. BpkSectionLayout v43 release] | Epic 1 | [Open / Resolved] |

---

## 4. Epic Breakdown

### Epic 0 — [Title]

**Goal:** [What this epic delivers]
**Type:** Foundation / Feature / Enabler
**Depends on:** [None / Epic name / External dependency]
**Rough estimate:** [Sprint count]
**Confidence:** [High / Medium / Low]

Stories:
| Story | Size | Depends on |
|---|---|---|
| [Story title] | S/M/L | — |
| [Story title] | M | Story 1 |

---

### Epic 1 — [Title]

[Repeat for each epic]

---

## 5. Story Breakdown

### Epic 0 — [Title]

#### Story 0.1 — [Story title]

**Context:** [Why this needs to change. What pattern is being replaced.]
**Acceptance criteria:**
- [ ] [Specific, verifiable condition]
- [ ] [Specific, verifiable condition]
**Out of scope:** [Anything explicitly excluded]
**Rough size:** S/M/L
**Depends on:** [None / Story name]

---

[Repeat for each story in each epic]

---

## 6. Rough Estimation Summary

| Epic | Stories | Rough effort | Confidence |
|---|---|---|---|
| Epic 0 — Foundation | [N stories] | [1 sprint] | High |
| Epic 1 — [Title] | [N stories] | [2 sprints] | Medium |
| **Total** | | **[N sprints]** | **[Overall]** |

**Estimation assumptions:**
- [Assumption 1]
- [Assumption 2]

**Conditions that would change estimates:**
- [If X, estimates may increase by Y]

---

## 7. Risks, Blockers, and Assumptions

### Blockers

| Blocker | Affects | Status |
|---|---|---|
| [e.g. BpkSectionLayout not available in v42] | Epic 1 | Open — target v43 |

### Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| [e.g. FeatureGrid has undocumented dependencies] | Medium | Estimate slip on Epic 2 | Spike story added |

### Assumptions

| Assumption | If wrong |
|---|---|
| Sprint capacity: 8 story points per engineer per sprint | Estimates compress/expand proportionally |
| No hard deadline | May need prioritisation if deadline emerges |
| Default Pure Backpack definition used (no project overrides) | Re-validate if project rules differ |

---

## 8. Execution-Ready Baseline

**Start with:** [Epic 0 / Story 0.1 — why this first]

**Can run in parallel once foundation is stable:**
- [Epic 1]
- [Epic 2]

**Do not start until blockers resolved:**
- [Epic 1] — blocked by [BpkSectionLayout v43]

**Open decisions needed before work begins:**
- [ ] [Decision 1 — owner / deadline]
- [ ] [Decision 2]

**Recommended first sprint focus:** [Epic 0, Stories 0.1–0.3]
