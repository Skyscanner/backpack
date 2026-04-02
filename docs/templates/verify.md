# Verification Template (`docs/templates/verify.md`)

> **Orchestrator:** Write verification instructions to `.context/verify-<N>.md` (using the INSTRUCTIONS
> section below), then pass the path to the verification sub-agent in its launch prompt.
>
> **Verification sub-agent:** Your prompt will include the path to `.context/verify-<N>.md`.
> **Read that file first before running anything.** Write your result to `.context/verify-<N>-result.md`
> using the RESULT TEMPLATE section below.

---

## Verification Instructions — Slice N

### Context

You are a verification sub-agent. Your only job is to run the checks below and report the result.
Do NOT fix anything. Do NOT make code changes. Report exactly what passes and what fails.

Read the implementation result file for context on what changed: `.context/task-<N>-result.md`

### Files Changed

[List every file the implementation sub-agent touched — copy from task result]

- `path/to/file.tsx`
- `path/to/file.module.scss`
- `path/to/file-test.tsx`

### Checks to Run

Run all checks in this exact order. Stop at the first failure and record the full error output.

```bash
# 1. Lint
npm run lint

# 2. React version compatibility
npm run check-react-versions

# 3. Backpack dependency rules
npm run check-bpk-dependencies

# 4. Full test suite
npm run jest

# 5. Component-scoped tests (replace <component-name> with the relevant component)
npm run jest -- --testPathPattern=<component-name>
```

### Expected Outcome

[Describe what a passing state looks like — e.g. "BpkFoo renders correctly in all 3 size variants, no snapshot mismatches, no lint errors."]

### Write Your Result

Write your result to `.context/verify-<N>-result.md` using the result section below.

---

## Verification Result — Slice N

### Verdict

**`PASS`** | **`FAIL`**

> PASS requires every single check to pass with zero errors or warnings that were not pre-existing.
> FAIL means at least one check produced an error. Treat warnings-as-errors as failures.

### Checks Run

| Check | Command | Result | Notes |
|-------|---------|--------|-------|
| Lint | `npm run lint` | PASS / FAIL | |
| React versions | `npm run check-react-versions` | PASS / FAIL | |
| BPK dependencies | `npm run check-bpk-dependencies` | PASS / FAIL | |
| Jest (full suite) | `npm run jest` | PASS / FAIL | |
| Jest (component) | `npm run jest -- --testPathPattern=...` | PASS / FAIL | |

### Failure Details

> Complete this section only on FAIL. Include the full error output — do not summarise or truncate.

**Failing check:** [Check name]

**Full error output:**
```
[Paste exact error output here]
```

**Failure summary (3 lines max for the orchestrator):**
- [What failed]
- [Why it likely failed]
- [Suggested remediation approach]

### Pre-existing Issues (if any)

[If any failures were pre-existing and not introduced by this slice, document them here with evidence (e.g. they also fail on main branch). The orchestrator decides whether to treat them as blockers.]
