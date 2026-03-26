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
Use the Read tool only when you need to inspect a specific test or component file in full depth.

## Step 2: Check accessibility (Constitution IV — NON-NEGOTIABLE)
- `accessibility-test.tsx` file must exist for any component
- Must use `jest-axe` for automated checks
- Tests must exercise the public interface
- Check for: keyboard navigation, ARIA labels, touch targets >= 44x44px
- Verify colour contrast considerations in SCSS

## Step 3: Check testing coverage (Constitution VIII)
- Unit tests (Jest + Testing Library) exist for all new code
- Coverage thresholds: branches >= 70%, functions/lines/statements >= 75%
- Storybook stories exist in `examples/` directory

## Step 4: Snapshot currency (commonly missed)

After ANY change to rendered output, snapshots MUST be regenerated.
1. Read the `.snap` file for this component
2. Verify it matches the current component output
3. Look for stale attributes or class names

Only flag issues in **changed files**. Ignore pre-existing violations.
Return JSON array of issues. Each issue must include `"confidence"` (0–100) and
`"confidence_explanation"` fields. If none found, return `[]`.
