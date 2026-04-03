# Jira Output Format

## Principle

The output is a **Jira-ready draft**, not automatic truth. The engineer loads it into Jira,
reviews it, and edits before using it for sprint planning. Do not frame it as final.

---

## Epic template

```
Epic: [Short descriptive title — max 60 chars]

Goal:
[One paragraph. What will be true when this epic is done? Why does it matter for adoption coverage?]

Scope — IN:
- [Specific components, pages, or patterns included]
- ...

Scope — OUT:
- [Explicit exclusions to prevent scope creep]
- ...

Definition of done:
- [ ] All in-scope components meet Pure Backpack criteria
- [ ] [Any epic-specific acceptance condition]
- [ ] No regressions in visual tests / E2E tests

Dependencies:
- Blocked by: [Epic name or external dependency, if any]
- Enables: [Epic name(s) that can start after this ships, if any]

Rough estimate: [L / XL / 2-sprint / 3-sprint — use estimation-guidance.md for sizing]
Confidence: [High / Medium / Low]
```

---

## Story template

```
Story: [Action-oriented title — "Replace X with Y in Z context"]

Context:
[One or two sentences. Where does this pattern appear? Why is it non-pure?]

Acceptance criteria:
- [ ] [Component / page] uses [Backpack primitive] instead of [non-pure pattern]
- [ ] No CSS overrides remain for this component in scope
- [ ] [Any other specific, verifiable condition]

Out of scope:
- [Anything explicitly not covered — avoids scope creep at story level]

Depends on: [Story or epic, if any]
Rough size: [S = ~1 day / M = 2–3 days / L = 4–5 days]
```

---

## Recommended Jira fields

| Field | Guidance |
|---|---|
| **Title** | Action-oriented. "Replace X with Y" not "X migration" |
| **Description** | Goal + scope in/out + definition of done |
| **Epic link** | Assign each story to its parent epic |
| **Labels** | `backpack-adoption`, `pure-backpack` (add project-specific labels as needed) |
| **Story points** | Use team's own scale. If not established, use S/M/L and convert later |
| **Priority** | Default to Medium unless a blocker warrants High |
| **Component** | Add the Jira project component if available |

---

## Example epic output

```
Epic: Migrate homepage layout to Backpack primitives

Goal:
Replace all custom flex/grid layout patterns on the homepage with BpkStack, BpkBox,
and BpkSectionLayout. This removes 6 CSS override patterns and brings the homepage
to Pure Backpack coverage.

Scope — IN:
- HeroSection layout wrapper
- FeatureGrid layout (custom CSS grid → BpkGrid)
- ContentRow pattern (3 instances on homepage)

Scope — OUT:
- Hero image loading (no layout change needed)
- Footer (handled in separate epic)

Definition of done:
- [ ] All 3 layout patterns replaced with Backpack primitives
- [ ] No custom flex/grid CSS remains in homepage stylesheets
- [ ] Visual regression tests pass

Dependencies:
- Blocked by: Epic 0 — Backpack version upgrade to ≥43.x (BpkSectionLayout requires v43)
- Enables: Epic 3 — PDP layout migration

Rough estimate: L (2 sprints)
Confidence: Medium — BpkSectionLayout API needs final review
```

---

## Example story output

```
Story: Replace HeroSection flex layout with BpkStack

Context:
HeroSection uses a custom div with inline flex styles to stack hero text and CTA.
No Backpack layout primitive is used. Classified as non-pure (raw layout + inline styles).

Acceptance criteria:
- [ ] HeroSection uses BpkStack with gap prop instead of inline flex div
- [ ] inline style={{ display: 'flex' }} removed from HeroSection
- [ ] Visual appearance unchanged at all breakpoints

Out of scope:
- Hero image component (separate story)
- Hero animation (no layout change needed)

Depends on: None (standalone)
Rough size: S (~1 day)
```

---

## Formatting notes

- Write epics and stories as markdown blocks — easy to paste into Jira description fields.
- Keep titles concise. Long titles get truncated in backlog views.
- Use checkboxes for acceptance criteria — engineers can tick them off during review.
- Do not auto-assign to sprints — let the engineer do that during sprint planning.
