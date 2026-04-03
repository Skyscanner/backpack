# Breakdown Rules

## Choosing a breakdown strategy

Pick the strategy that maps to the repo's structure and team's delivery constraints.

### Strategy A — Foundation-first

**Use when:** Multiple pages share layout wrappers or a custom design system layer that must
be replaced before per-page work can start.

**Structure:**
1. Epic: Foundation (shared layout primitives, wrapper replacement, token alignment)
2. Epic per page or feature group (after foundation is stable)
3. Epic: Cleanup / coverage verification

**Rationale:** Prevents re-doing page-level work when the foundation changes under it.

---

### Strategy B — Page-by-page

**Use when:** Pages are largely independent with minimal shared infrastructure.
Foundation work can be folded into the first page epic.

**Structure:**
1. Epic per page or user journey
2. Epic: Shared cleanup (residual patterns found across pages)

**Rationale:** Delivers visible, testable progress one page at a time.

---

### Strategy C — Pattern-by-pattern

**Use when:** The same non-pure pattern (e.g. a custom layout grid) appears across every page.
More efficient to migrate the pattern once than to repeat it page by page.

**Structure:**
1. Epic per non-pure pattern type (e.g. "Replace custom grid", "Remove !important overrides")
2. Epic: Page-level verification

**Rationale:** Reduces duplication. Works well when patterns are consistent and well-bounded.

---

### Mixing strategies

Strategies can be combined. For example: Foundation-first for shared wrappers (Strategy A),
then page-by-page for per-page patterns (Strategy B). Name the hybrid explicitly.

---

## Work classification

Classify every scope item before building epics.

### Foundation work

- Shared layout wrappers used across 3+ pages
- Design token setup / alignment
- Backpack provider setup or upgrade
- Shared utility components (e.g. custom spacing helpers being replaced by Backpack primitives)

Foundation work **must ship before** dependent feature/page work begins.

### Feature / page work

- Per-page layout migration
- Per-component override removal
- Page-specific inline style or className override cleanup

Feature/page work **can run in parallel** once foundations are stable.

### Enabler / blocker work

- Missing Backpack primitive (requires contribution to Backpack before adoption can proceed)
- Design decision needed (no Backpack equivalent decided yet)
- Infrastructure change needed (e.g. update Backpack version)
- Cross-team dependency (e.g. another team owns the shared layout wrapper)

Enabler/blocker work **must be tracked explicitly**. It may unblock multiple epics.
Flag it separately — do not fold it silently into a feature epic.

---

## Epic sizing guidance

- Aim for epics that are independently releasable.
- Prefer epics that a small team (1–2 engineers) can deliver in 1–3 sprints.
- If an epic would take longer than 3 sprints, look for a natural split.
- If an epic depends on a blocker, consider splitting the pre-blocker and post-blocker work.

---

## Story sizing guidance

- Each story should be completable by one engineer in 1–5 days.
- A story must have a clear acceptance criterion that is independently verifiable.
- Do not create stories that are just sub-tasks of a single component change.
  Group related small changes into one story.

---

## Anti-patterns to avoid

### Mechanical file-based splitting

Bad: "Story: Migrate `src/components/Hero.tsx`" — this is a file location, not a delivery unit.
Better: "Story: Replace custom flex layout in Hero section with `BpkStack`" — this is a deliverable change.

### One epic per component

Avoid creating one epic per component when multiple components belong to the same delivery context.
Group by page, feature, or pattern — not by file count.

### Ignoring dependencies in sequencing

Do not sequence work that requires a shared foundation to be done first as if it can run in parallel.
Always check the dependency map before assigning stories to epics.

### Mixing foundation and feature work in one epic

Foundation changes have a different risk profile from feature changes.
Keep them separate so they can be reviewed, shipped, and rolled back independently.

### Treating blockers as risks

Blockers are hard stops — work cannot start without them resolved.
Risks are uncertainties that may or may not materialise.
Track them separately.
