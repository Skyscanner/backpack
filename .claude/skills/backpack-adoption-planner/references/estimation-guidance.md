# Estimation Guidance

## Principle

Estimates are rough signals, not commitments. Always state the assumptions behind every estimate.
Unexplained estimates are worse than no estimates.

---

## Story sizing scale

| Size | Typical effort | Use when |
|---|---|---|
| S (Small) | ~1 day | Single component, clear pattern, no dependencies |
| M (Medium) | 2–3 days | Multiple instances of same pattern, or one component with complexity |
| L (Large) | 4–5 days | Multi-component migration, shared wrapper, or unfamiliar codebase area |
| XL | >1 week | Should be split further. Only use if genuinely unsplittable |

Stories larger than L should be reviewed for a natural split before committing.

---

## Epic sizing

Aggregate story estimates within an epic. Express epic size as sprint-equivalent:

| Epic size | Typical effort |
|---|---|
| 1 sprint | 5–10 story days (1–2 engineers, 1 sprint) |
| 2 sprints | 10–20 story days |
| 3 sprints | 20–30 story days |

If an epic exceeds 3 sprints, consider splitting it.

---

## What to state with every estimate

For each story:
```
Size: M
Assumption: Engineer has prior exposure to this component area.
Assumption: No missing Backpack primitives — BpkStack v43 is available.
```

For each epic:
```
Estimate: 2 sprints (team of 2)
Confidence: Medium
Assumptions:
- Sprint capacity: ~8 story points per engineer per sprint
- No major regressions requiring extra debug time
- BpkSectionLayout API is stable before work starts
Risks:
- If BpkSectionLayout API changes mid-epic, L2 may need re-scoping
```

---

## Confidence levels

Use three levels. State the reason.

| Level | Meaning |
|---|---|
| High | Scope is fully understood, no blockers, team has prior familiarity |
| Medium | Scope is mostly clear, one or two open questions, some risk of scope creep |
| Low | Scope depends on decisions not yet made, or codebase area is unknown |

Example:
```
Confidence: Medium — HeroSection is well-understood but FeatureGrid uses
a custom layout library that may require investigation before migrating.
```

---

## Adjusting for unknowns

When a story or epic has significant unknowns, add an investigation story first:

```
Story: Investigate FeatureGrid layout dependencies (spike)
Size: S (~1 day)
Goal: Understand what replacing FeatureGrid would require.
Output: Notes on dependencies, effort estimate for actual migration story.
```

A spike story reduces uncertainty before committing to a migration estimate.

---

## Common estimation traps

| Trap | Guidance |
|---|---|
| Estimating without reading the component | Always scan the file before sizing. A "simple" component may have hidden dependencies. |
| Ignoring test coverage cost | Adoption changes often require updating tests. Add 20–30% for test updates when coverage is low. |
| Assuming parallel work is always safe | Check the dependency map. Parallel work on shared wrappers causes conflicts. |
| Giving a point estimate without a range | Prefer "M (2–3 days)" over "2 days". Ranges communicate uncertainty honestly. |
| Treating L stories as acceptable | L stories are a warning sign. Look for a split before accepting them. |

---

## When estimates should not be given

Do not estimate a story or epic if:
- The scope is not yet validated (do validation first)
- There is a known blocker that prevents the work from starting
- A required design decision has not been made

Instead, write:
```
Estimate: BLOCKED — pending [decision / primitive / design input]
```

---

## When repo file access is unavailable

If the target repo cannot be scanned directly (e.g. remote repo, access restrictions,
or codebase not available locally):

1. Do not produce story-level estimates from memory or inference.
2. Add a scope discovery spike to Epic 0:

```
Story: Scope discovery spike
Size: S–M (~1–2 days)
Goal: Scan the target repo, identify non-pure patterns, and produce revised story estimates.
Output: Updated scope findings and story estimates for remaining work.
```

3. Mark all epic estimates as Low confidence until the spike is complete.
4. Record this in the estimation assumptions:

```
ASSUMPTION: Repo not directly scanned. All estimates are Low confidence
until the scope discovery spike completes. Estimates may change significantly.
```

Story S/M/L sizing without file access is unreliable — treat any pre-spike estimates
as placeholders only.
