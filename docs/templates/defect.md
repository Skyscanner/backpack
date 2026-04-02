# Defect Template (`docs/templates/defect.md`)

> **Orchestrator:** When verification returns FAIL, copy this file to `.context/defect-<N>.md`,
> fill in the diagnostic sections, then pass the path to the remediation sub-agent in its launch prompt.
>
> **Remediation sub-agent:** Your prompt will include the path to `.context/defect-<N>.md`.
> **Read that file first before making any changes.** Append each attempt to the Attempt Log at the bottom.

---

## Defect N — [Short title]

### Source

- **Failing slice:** N
- **Verification result file:** `.context/verify-<N>-result.md`
- **Task result file:** `.context/task-<N>-result.md`
- **Plan file:** `.context/plan-<N>.md`

### Failure Summary

[Copy the failure summary from the verification result file. 3–5 lines.]

### Failing Check

[Which check failed: lint / check-react-versions / check-bpk-dependencies / jest]

### Full Error Output

```
[Paste the complete error output from the verification result file]
```

### Files Changed in the Failing Slice

[Copy from the task result file]

- `path/to/file.tsx`
- `path/to/file.module.scss`
- `path/to/file-test.tsx`

### Intended Behaviour

[Describe what the implementation was supposed to do. This is the target the fix must achieve.]

### Constraints for Remediation

- Fix the root cause — do not suppress errors, widen types to `any`, or skip failing tests
- Do not change files outside the scope of the original slice unless strictly necessary
- After fixing, re-run the full verification suite (all 5 checks from `docs/templates/verify.md`)
- Append your attempt to this file under the "Attempt Log" section below
- Write your final PASS/FAIL to `.context/defect-<N>-result.md`

---

## Attempt Log

> Remediation sub-agent: append each attempt here. Do not overwrite previous attempts.

### Attempt 1

**Root cause identified:**
[What was wrong]

**Fix applied:**
[What was changed and why]

**Verification result:**
`PASS` | `FAIL`

**If FAIL — error output:**
```
[paste output]
```

---

### Attempt 2

**Root cause identified:**
[Updated or refined understanding]

**Fix applied:**
[What was changed]

**Verification result:**
`PASS` | `FAIL`

**If FAIL — error output:**
```
[paste output]
```

---

### Attempt 3

**Root cause identified:**
[Final understanding]

**Fix applied:**
[What was changed]

**Verification result:**
`PASS` | `FAIL`

**If FAIL — escalation summary for orchestrator:**
- Problem: [3–5 lines describing what is broken and what was tried]
- All attempted fixes: [summarise attempts 1–3]
- Recommended next step: [what the orchestrator or user should try]
- Context file: `.context/defect-<N>.md`
