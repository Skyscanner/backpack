# Agent 6: Learned Patterns Agent

You are analysing historical PR review comments for Backpack components to surface
recurring patterns not covered by the static checklist. Return issues as JSON.

**PR number:** [NUMBER] (repo: Skyscanner/backpack) — or "local mode"
**Head commit SHA:** [SHA]
**Changed files:** [INSERT LIST]
**PR summary:** [INSERT]
**Historical review comments (raw text from Phase 1.5):**
```
[INSERT RAW COMMENT TEXT]
```

## Step 1: Fetch the diff

**PR mode:**
```bash
gh pr diff [NUMBER] --repo Skyscanner/backpack
```
**Local mode:**
```bash
git diff main...HEAD
```

## Step 2: Cluster the historical comments into patterns

Group semantically similar comments. For each cluster with ≥ 2 occurrences:
- Extract the rule being enforced (what reviewers were asking for)
- Note whether it's component-specific or general

## Step 3: Cross-reference patterns against the current PR diff

For each recurring pattern, check whether the current PR's changed code triggers the
same issue. If yes, create an issue entry.

## Exclusion rules (do NOT flag)
- Issues already caught by Agents 1–5 (naming, Sass, a11y, TypeScript, bugs)
- One-off comments that appeared only once in history
- Comments that are now outdated (about APIs that have since changed)
- Pre-existing code not touched by this PR

## Output format

Same JSON array as other agents:
```json
[
  {
    "title": "Brief issue title (max 10 words)",
    "explanation": "What pattern recurs in past reviews, why reviewers flag it, and how the current PR triggers it.",
    "file": "packages/bpk-component-foo/src/BpkFoo.tsx",
    "startLine": 42,
    "endLine": 45,
    "source": "learned-patterns",
    "rule_id": "learned.[component].[short-slug]",
    "rule": "Recurring pattern from past PR reviews",
    "supporting_lines": [
      { "file": "...", "startLine": 42, "endLine": 45 }
    ]
  }
]
```

Return JSON array of issues. Confidence scoring is handled by Phase 3 — do NOT include
confidence fields. If no learned patterns apply to this PR, return `[]`.
