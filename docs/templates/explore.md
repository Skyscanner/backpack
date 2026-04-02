# Exploration Template (`docs/templates/explore.md`)

> **Orchestrator:** Copy this file to `.context/explore-<N>.md`, fill in the questions and scope,
> then pass the path to the exploration sub-agent in its launch prompt.
>
> **Exploration sub-agent:** Your prompt will include the path to `.context/explore-<N>.md`.
> **Read that file first before searching anything.** Write your findings to `.context/explore-<N>-result.md`
> using the RESULT section below. This is a read-only task — make no code changes.

---

## Exploration N — [Short title]

### Purpose

[Why this exploration is needed. What decision or plan depends on the findings.]

### Questions to Answer

[List the specific questions the orchestrator needs answered. Be precise — vague questions produce vague findings.]

1. [Question 1]
2. [Question 2]
3. [Question 3]

### Scope

**Look in:**
- `packages/bpk-component-<name>/` — [what to look for]
- `packages/bpk-mixins/` — [what to look for]
- [other paths]

**Do NOT read or change:**
- [anything out of scope]

### Output Format

Write your findings to `.context/explore-<N>-result.md` using the result section below.
Do NOT make any code changes. This is a read-only task.

---

## Exploration Result — Slice N

### Findings

[Answer each question from the instructions. Use file paths and line numbers as evidence.]

#### Question 1: [Restate the question]

**Answer:** [Direct answer]

**Evidence:**
- `path/to/file.tsx:42` — [what you found and why it is relevant]
- `path/to/other.tsx:17` — [what you found]

#### Question 2: [Restate the question]

**Answer:** [Direct answer]

**Evidence:**
- `path/to/file.tsx:88` — [what you found]

### Patterns Observed

[Summarise any patterns found that should inform implementation — naming conventions, existing abstractions, established approaches the orchestrator should follow.]

- [Pattern 1]
- [Pattern 2]

### Constraints Discovered

[Any constraints found during exploration that were not known before — e.g. a shared utility that must not be modified, a circular dependency risk, a component that is used in 40 places.]

- [Constraint 1]
- [Constraint 2]

### Recommended Approach

[Optional: if the exploration reveals a clear implementation path, summarise it here for the orchestrator. Keep it to 3–5 bullet points.]

- [Step 1]
- [Step 2]
- [Step 3]
