# Task Result Template (`docs/templates/task.md`)

> **Orchestrator:** Pass the path to this template in the implementation sub-agent's launch prompt.
> The sub-agent must write its output to `.context/task-<N>-result.md` using this format.
>
> **Implementation sub-agent:** Your prompt will reference this template file.
> **Read this template first**, then write your result to `.context/task-<N>-result.md` once complete.

---

## Task N Result — [Short title]

### Status

`COMPLETE` | `BLOCKED` | `PARTIAL`

> Use BLOCKED if you could not complete the task due to an unresolvable ambiguity or missing information.
> Use PARTIAL only if explicitly agreed with the orchestrator — partial work should never be the default.

### Files Changed

| File | Lines added | Lines removed | Summary of change |
|------|-------------|---------------|-------------------|
| `path/to/file.tsx` | +N | -N | [What changed] |
| `path/to/file.module.scss` | +N | -N | [What changed] |
| `path/to/file-test.tsx` | +N | -N | [What changed] |

### What Was Done

[2–5 bullet points describing the implementation. Focus on decisions and non-obvious choices, not a line-by-line walkthrough.]

- [Key change 1]
- [Key change 2]
- [Decision made and rationale]

### Tests

[Describe what tests were added or updated. List test file paths.]

- `path/to/file-test.tsx` — [what is covered]
- [Any test cases that deliberately were NOT written, and why]

### Decisions Made

[Any choices made that the orchestrator should know about — API surface decisions, pattern choices, trade-offs accepted.]

| Decision | Chosen approach | Alternative considered | Reason |
|----------|----------------|------------------------|--------|
| [Topic] | [Choice] | [Alternative] | [Why] |

### Blockers / Concerns

[If status is BLOCKED, describe exactly what is missing and what the recommended resolution is.]

[If COMPLETE, list any concerns or follow-up items the orchestrator should track as new tasks.]

- [Concern or follow-up 1]
- [Concern or follow-up 2]

### Ready for Verification

- [ ] All acceptance criteria from `.context/plan-<N>.md` are met
- [ ] Tests written or updated
- [ ] No TypeScript errors (`npm run typecheck` clean on changed files)
- [ ] No obvious lint issues
