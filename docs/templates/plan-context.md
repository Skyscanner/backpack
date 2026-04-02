# Plan Context Template (`docs/templates/plan-context.md`)

> **Orchestrator:** Copy this file to `.context/plan-<N>.md`, fill in every section, then pass the path
> to the implementation sub-agent as part of its launch prompt (see AGENTS.md — Context Handoff Protocol).
>
> **Implementation sub-agent:** Your prompt will include the path to `.context/plan-<N>.md`.
> **Read that file first before doing anything else.** It is your complete brief.

---

## Required Reading Gate

**Sub-agent: before writing a single line of code, work through this checklist.**
For each row, read the doc if the condition is true. Confirm each one in your result file.

| Condition | Doc to read |
|-----------|-------------|
| Creating or modifying any component | `docs/component-development.md` |
| Any visual property is in scope (colour, spacing, typography, borders, shadows, elevation) | `docs/tokens-and-typography.md` |
| Looking up a specific token name, value, or SCSS syntax | `docs/references/tokens.md` |
| Using `BpkText`, setting text colour, or choosing a `textStyle` | `docs/references/typography.md` |
| Choosing which Backpack component to use, or checking an import path | `docs/references/components.md` |
| Implementing layout, spacing between elements, or responsive behaviour | `docs/references/layout.md` |
| Adding icons | `docs/references/icons.md` |
| Writing or modifying tests | `docs/references/testing.md` |
| Adding or modifying Storybook stories | `docs/references/storybook.md` |
| Implementing interactive elements, forms, modals, or images | `docs/references/accessibility.md` |
| Running builds, tests, lint, or any CLI command | `docs/commands.md` |

Skipping a required doc is not permitted. If a doc is not applicable, explicitly note "N/A — [reason]" in your result. The orchestrator will verify this list against the result file.

---

## Slice N — [Short title]

### Objective

[One or two sentences describing exactly what this slice must achieve. Be specific about the outcome, not the steps.]

### Scope

**Files to change:**
- `path/to/file.tsx` — [what changes and why]
- `path/to/file.module.scss` — [what changes and why]

**Files to read (context only, do not modify):**
- `path/to/reference.tsx` — [why it is relevant]

**Out of scope — do NOT touch:**
- [List anything adjacent that might look related but must not be changed]

### Constraints

- [Constraint 1 — e.g. "Do not change the public API of BpkFoo"]
- [Constraint 2 — e.g. "New SCSS must use tokens only, no hardcoded values"]
- [Constraint 3 — e.g. "Tests must use React Testing Library, not Enzyme"]

### Prior Work (Dependencies)

[If this slice depends on a previous slice, reference the result file here.]

- Result from slice N-1: `.context/task-<N-1>-result.md`
- Key finding to carry forward: [brief summary]

### Acceptance Criteria

The slice is complete when ALL of the following are true:

- [ ] [Criterion 1 — observable, testable]
- [ ] [Criterion 2]
- [ ] [Criterion 3]
- [ ] All new/modified code has corresponding test coverage
- [ ] No TypeScript errors introduced
- [ ] No lint errors introduced

### Expected Deliverable

Write your result to `.context/task-<N>-result.md` using the template at `docs/templates/task.md`.

The result file must include:
- Files changed (with line counts)
- Summary of what was done
- Any decisions made and why
- Any follow-ups or concerns for the orchestrator
- Explicit confirmation that tests were written/updated
