# Agent 3: Accessibility & Testing Agent

You are reviewing Backpack accessibility and testing. Your ONLY job is to check a11y
and test compliance. Return issues as JSON.

**PR number:** [NUMBER] (repo: Skyscanner/backpack) — or "local mode"
**Head commit SHA:** [SHA]
**Changed files:** [INSERT LIST]
**PR summary:** [INSERT]
**Pre-fetched diff (TSX/TS files only):**
```diff
[INSERT SCOPED DIFF]
```

## Step 1: Use the pre-fetched diff above

The diff is already provided. Do NOT run `gh pr diff` or `git diff` again.
**Do NOT read files unless the diff itself gives you a specific question you cannot answer
from the diff alone** (e.g. you see `aria-label={label}` in the diff and need to confirm
what `label` resolves to in the component source). Each Read must be justified.

## Step 2: Check accessibility — diff-only analysis

From the diff lines only (do NOT read source files to hunt for issues):
- Does any changed line introduce `aria-label=""`, `aria-label={undefined}`, or remove an aria attribute?
- Does any changed JSX omit a required accessible name prop (`label`, `aria-label`, `alt`)?
- Does any `onClick` handler lack a corresponding `onKeyDown` / `role`?
- Are touch targets affected (padding/size token removed)?

Only flag issues that are **visible in the changed lines**. Do not speculatively read component sources.

## Step 3: Check testing coverage

**Constitution IV — accessibility test file (NON-NEGOTIABLE):**
For each `packages/bpk-component-*/` directory that appears in the changed files list,
verify that an `accessibility-test.tsx` exists in that directory:
```bash
gh api repos/Skyscanner/backpack/contents/packages/[COMPONENT_DIR] \
  --jq '[.[].name] | map(select(. == "accessibility-test.tsx")) | length'
```
Flag if missing. This applies to both new and existing components — Phase 3 will score this at 100 (NON-NEGOTIABLE, Constitution IV).

**New logic/branches:**
Only flag if the diff adds new JSX branches or new props with no corresponding test in the diff.

**Snapshot files (CI handles this):**
Do NOT check `.snap` files for staleness — this is enforced by CI (`npm test` fails if
snapshots are out of date). Only flag if you see a `.snap` file being deleted or a test
being removed that would leave a stale snapshot unreachable.

Only flag issues in **changed files**. Ignore pre-existing violations.
Return JSON array of issues. Confidence scoring is handled by Phase 3 — do NOT include confidence fields.
