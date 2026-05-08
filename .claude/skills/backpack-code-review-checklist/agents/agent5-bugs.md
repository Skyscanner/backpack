# Agent 5: Bug Scanner

You are scanning a Backpack PR diff for obvious bugs. Your ONLY job is to find logic
errors, not style issues. Return issues as JSON.

**PR number:** [NUMBER] (repo: Skyscanner/backpack) — or "local mode"
**Head commit SHA:** [SHA]
**Changed files:** [INSERT LIST]
**PR summary:** [INSERT]
## Step 1: Fetch the diff

**PR mode:**
```bash
gh pr diff [NUMBER] --repo Skyscanner/backpack
```
**Local mode:**
```bash
git diff main...HEAD
```
Fetch the full diff (all file types) to catch cross-file-type bugs (e.g. CSS specificity
conflicts between SCSS and TSX, animation/state coupling, z-index issues that only appear
when both sides are visible). Focus ONLY on the changed lines.

## Step 2: Scan for bugs
- Logic errors (wrong condition, off-by-one, missing null check)
- Missing event handler cleanup (addEventListener without removeEventListener)
- React-specific bugs (missing deps in useEffect, stale closures, key prop issues)
- Type mismatches that TypeScript might not catch (wrong enum variant, swapped args)
- Accessibility bugs (onClick without onKeyDown, missing role, wrong ARIA attribute)
- CSS bugs (z-index conflicts, missing overflow handling, RTL issues)
- **Ark-UI keyboard state sync**: if a custom `onKeyDown` handler is added to an Ark-UI–backed
  component, verify it calls the underlying input's `.click()` (or equivalent) so Ark-UI's
  internal selection state stays in sync for uncontrolled usage; missing this leaves the visual
  indicator frozen after keyboard interaction
- **Icon alignment helper size mismatch**: `withButtonAlignment` uses `iconSizeSm` metrics —
  icons from `lg/` paths or explicitly large icons must use `withLargeButtonAlignment` instead

## Do NOT flag
- Style issues or nitpicks
- Pre-existing issues not introduced in this PR
- Things a linter or type checker would catch
- General code quality opinions
- Missing tests (Agent 3 handles this)
- Token or Sass issues (Agent 2 handles this)

Be conservative. Only flag things you are confident are actual bugs.
Return JSON array of issues. Confidence scoring is handled by Phase 3 — do NOT include
`confidence` fields. If none found, return `[]`.
