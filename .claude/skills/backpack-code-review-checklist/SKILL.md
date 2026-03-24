---
name: backpack-code-review-checklist
description: |
  Multi-agent review orchestrator for Backpack component PRs.
  Runs 5 parallel specialist agents, then confidence-scores findings to reduce false positives.
  Use for PR review, Constitution compliance checks, and pre-merge validation.
author: Claude Code
version: 2.1.0
date: 2026-03-20
changelog: |
  - v2.1.0: Architecture overhaul — agents self-fetch data instead of orchestrator injection.
    Removed diff chunking protocol and sandbox restrictions. Agents now have full tool access
    (Bash, Read, Grep, Glob, gh CLI) enabling iterative investigation and true parallelism.
    Added early-exit check for closed/draft/trivial PRs. Simplified Phase 1 to lightweight
    metadata collection only. Retained all Backpack domain knowledge and confidence scoring.
  - v2.0.0: Rewrote as multi-agent orchestrator with confidence scoring; added History Agent
    and Bug Scanner; retained detailed Backpack review checks (TS/docs/design/a11y/testing);
    added orchestrator self-check, configurable threshold, autopost guardrails,
    privacy/access-control guidance, final-only output, clarified Agent 1 scope/autopost
    no-partial-post behavior, and surfaced confidence explanations for human-gated findings.
  - v1.2.0: Added investigation methods for CSS properties, package imports, and token semantics.
  - v1.1.0: Added snapshot currency checks.
  - v1.0.0: Initial checklist.
---

# Backpack Code Review — Multi-Agent Orchestrator

## Overview

This skill reviews Backpack component PRs by dispatching **5 parallel specialist agents**,
each focused on a narrow domain. A separate scoring pass filters false positives. The
confidence threshold is configurable (default 75, override via `/backpack-code-review-checklist threshold=80`).

## Execution Flow

```
Phase 0  Detect review mode + early-exit check
Phase 1  Lightweight metadata (PR number, SHA, file list, reference docs)
Phase 2  Launch 5 specialist agents IN PARALLEL (agents self-fetch data)
Phase 3  Confidence scoring (batch)
Phase 4  Filter (>= threshold), format, and output
Phase 5  Autopost gate (internal)
```

**Key architecture decision:** Agents have full tool access (Bash, Read, Grep, Glob, `gh` CLI).
Each agent fetches its own data (diff, files, history) independently. This enables true
parallelism — all 5 agents start working immediately without waiting for a central data
collection phase. The orchestrator's role is coordination and synthesis, not data fetching.

---

## Phase 0: Detect Review Mode + Early Exit

**Before doing anything else**, determine the review mode and check if review is needed.

**Step 0.1** — Determine review mode:

- **PR mode**: user message contains a `github.com/.../pull/NNN` URL
  - Extract the PR number
  - Run `gh pr view NNN --repo Skyscanner/backpack --json headRefOid,files,state,isDraft,body`
  - Link format (use full 40-character SHA): `https://github.com/Skyscanner/backpack/blob/[HEAD_COMMIT_SHA]/[PATH]#L[START]-L[END]`
  - Autopost guardrail:
    - Default is **no autopost**. Print review to conversation first.
    - Post to PR only if user explicitly asks, or `BACKPACK_REVIEW_AUTOPOST=true`.
    - Findings with confidence `threshold`–90 require human confirmation before posting.

- **Local mode**: no PR URL
  - Use `git diff main...HEAD` to get changes
  - Output review to conversation only — do NOT post to GitHub
  - Link format: `[path/file.tsx:29](path/file.tsx#L29)`

**Step 0.2** — Early exit check (PR mode only). Skip review if:
- PR is closed or merged
- PR is a draft
- PR is trivial/automated (e.g. only changelog, only dependency bumps)
- PR already has a code review comment from Claude

If any condition is met, inform the user and stop.

## Phase 1: Lightweight Metadata Collection

The orchestrator collects only **lightweight metadata** — not the diff itself. Agents will
fetch their own data using their full tool access (Bash, Read, Grep, Glob, `gh` CLI).

**Step 1.1** — Collect PR metadata (already done in Phase 0):
- PR number, head commit SHA, list of changed file paths, PR body/description

**Step 1.2** — Read reference documents (skim for relevant sections):
- `.specify/memory/constitution.md` — Core principles I-XIII
- `CODE_REVIEW_GUIDELINES.md` — Quality standards
- `decisions/` — Relevant decision records (modern-sass-api.md, accessibility-tests.md, etc.)

**Step 1.3** — Summarise what this PR does in 2-3 sentences based on file list and PR body.

That's it. The orchestrator does NOT fetch the diff, does NOT build history context, and
does NOT do any chunking. Each agent fetches exactly what it needs.

## Phase 2: Launch 5 Specialist Agents in Parallel

**Agent pruning:** Based on the file list from Phase 1, determine which agents to launch.
Not all agents are needed for every PR:

| Agent | Launch when | Skip when |
|-------|------------|-----------|
| Agent 1 (Constitution & API) | Always | Never — applies to all PRs |
| Agent 2 (Sass & Token) | Changed files include `.scss` | No `.scss` files in diff |
| Agent 3 (A11y & Testing) | Always | Never — test coverage applies to all PRs |
| Agent 4 (History) | Changed files exist on `main` (i.e. not all-new files) | All files are new (no history to check) |
| Agent 5 (Bug Scanner) | Always | Never — bug scanning applies to all PRs |

Launch the selected agents in a **single message** using multiple Agent tool calls.

Each agent receives from the orchestrator: (a) the PR number (or "local mode"), (b) the
head commit SHA, (c) the list of changed file paths, (d) the PR summary from Phase 1,
and (e) its domain-specific Backpack rules.

**Each agent self-fetches its own data** using Bash, Read, Grep, Glob, and `gh` CLI.
Agents should use **scoped fetches** — e.g. `gh pr diff [N] -- '*.scss'` instead of
fetching the entire diff — to minimise redundant data across agents. Agents can do
iterative investigation — reading additional files, checking mixin sources, examining
package exports — without being limited to pre-injected context.

Phase 2 requirements:
- Dispatch specialist agents in one turn (single message, multiple Agent calls).
- If one agent fails, record the failure and continue with others (see agent status below).
- Aggregate results: sort by file path, then startLine, then source.
- **Deduplication (before Phase 3):** If two issues share the same `file` AND overlapping
  `startLine–endLine` ranges AND similar `title` (semantic match), merge them into one.
  Keep the issue with the more specific `rule_id`; if equal, keep the one from the
  higher-priority source (constitution > sass-tokens > a11y-testing > history > bug-scan).

Each agent MUST return a JSON array of issues:
```json
[
  {
    "title": "Brief issue title (max 10 words)",
    "explanation": "What is wrong, why it matters, what to use instead",
    "file": "packages/bpk-component-foo/src/BpkFoo.tsx",
    "startLine": 42,
    "endLine": 45,
    "source": "constitution|sass-tokens|a11y-testing|history|bug-scan",
    "rule_id": "constitution.xi.classname-restriction",
    "rule": "Constitution XI — className restriction",
    "supporting_lines": [
      { "file": "packages/bpk-component-foo/src/BpkFoo.tsx", "startLine": 42, "endLine": 45 }
    ]
  }
]
```

If an agent finds no issues, it returns `[]`.

---

### Agent 1: Constitution & API Agent

**Scope:** Naming, license, API encapsulation, TypeScript, documentation, and design approval checks.

**Prompt to give this agent:**

> You are reviewing a Backpack design system PR. Your ONLY job is to check Constitution
> compliance for naming, licensing, and API design. Return issues as JSON.
> This agent intentionally covers API/TS/docs/design checks. Sass/token checks are handled
> by Agent 2, and accessibility/testing checks are handled by Agent 3.
>
> **PR number:** [NUMBER] (repo: Skyscanner/backpack) — or "local mode" with `git diff main...HEAD`
> **Head commit SHA:** [SHA]
> **Changed files:** [INSERT LIST]
> **PR summary:** [INSERT]
>
> **Step 1: Fetch the diff and read changed files.**
> Use `gh pr diff [NUMBER] --repo Skyscanner/backpack` or `git diff main...HEAD`.
> Focus on `.ts`, `.tsx`, `README.md`, and `examples/` files relevant to your scope.
> Read changed files directly with the Read tool for deeper inspection.
>
> **Step 2: Check each changed file against these rules:**
>
> **Naming & File Conventions (Constitution II)**
> - Component files: PascalCase (`BpkFoo.tsx`)
> - Style files: `.module.scss` matching component name
> - Test files: `*-test.tsx` and `accessibility-test.tsx`
> - Package names: `bpk-component-[name]` (kebab-case)
> - CSS classes: BEM with `bpk-` prefix (`bpk-foo__element`)
>
> **License Headers (NON-NEGOTIABLE)**
> - ALL `.ts`, `.tsx`, `.scss`, `.js` files must have Apache 2.0 header
> - Must contain "Copyright 2016 Skyscanner Ltd"
> - Check with: `grep -L "Copyright 2016 Skyscanner" [files]`
>
> **API Encapsulation (Constitution XI — CRITICAL)**
> - NEW components MUST NOT accept `className` or `style` props
> - Correct pattern: `Omit<ComponentPropsWithoutRef<'div'>, 'children' | 'className' | 'style'>`
> - Wrong pattern: bare `ComponentPropsWithoutRef<'div'>` which leaks className
> - Existing components may grandfather className. Determine if file is new:
>   `git show main:[filepath]` — exit code 0 = existing (grandfathered), exit code 128 = new file (must enforce restriction)
> - Accessibility props (e.g. `accessibilityLabel`) must be REQUIRED, not optional
>
> **TypeScript (Constitution V)**
> - All new code in TypeScript
> - Proper prop type interfaces
> - JSDoc/TSDoc comments for public APIs
> - `@deprecated` tags for deprecated APIs
>
> **Documentation (Constitution IX)**
> - README.md with usage examples
> - Storybook stories in `examples/`
> - British English for prose
> - Public props documented with JSDoc/TSDoc
>
> **Design Approval (Constitution X — CONDITIONAL)**
> - Only required when PR includes **visual changes**: `.scss` files, `.stories.tsx` files,
>   new component directories, or Figma references in the description.
> - Skip for: pure bug fixes, dependency bumps, snapshot-only updates, docs-only PRs,
>   test-only changes, and refactors with no visual impact.
> - When required: check PR description for design approval evidence.
>   Missing design approval on a visual-change PR = blocking issue.
>
> Only flag issues in **changed files**. Ignore pre-existing violations.
> Return JSON array of issues. If none found, return `[]`.

---

### Agent 2: Sass & Token Agent

**Scope:** Modern Sass API, token usage, mixin investigation, private token detection.

**Prompt to give this agent:**

> You are reviewing Backpack SCSS changes. Your ONLY job is to check Sass API and token
> compliance. Return issues as JSON.
>
> **PR number:** [NUMBER] (repo: Skyscanner/backpack) — or "local mode"
> **Head commit SHA:** [SHA]
> **Changed files:** [INSERT LIST]
> **PR summary:** [INSERT]
>
> **Step 1: Fetch the diff and read changed SCSS files.**
> Use `gh pr diff [NUMBER]` or `git diff main...HEAD`. Focus on `.scss` files relevant
> to your scope. Read the full content of each changed SCSS file with the Read tool.
>
> **Step 2: Check each changed SCSS file against these rules:**
>
> **Modern Sass API (Constitution III — NON-NEGOTIABLE)**
> - Must use `@use` syntax, NEVER `@import`
> - Granular imports: `@use '../../bpk-mixins/tokens'`, `@use '../../bpk-mixins/utils'`
> - Namespace prefixes: `tokens.bpk-spacing-md()`, `tokens.$bpk-core-primary-day`
> - CSS Modules (`.module.scss`)
> - All sizing in `rem`, not `px` or `em`
>
> **Step 3: Mixin investigation (CRITICAL — use your tools):**
> For these **known high-risk CSS patterns** (not every CSS property):
> `:hover`, `transition`, `z-index`, `::before`/`::after` pseudo-elements
> 1. Grep `packages/bpk-mixins/` for an existing mixin that abstracts this pattern
> 2. Read 2-3 similar existing components to see how they handle the same pattern
> 3. If a mixin exists and the new code bypasses it, flag it as a violation
>
> Known mixin mappings (not exhaustive — always search):
> - `:hover` -> `@include utils.bpk-hover { }` (gates behind `.bpk-no-touch-support`)
> - `transition: ... 0.2s` -> `tokens.$bpk-duration-sm` token
> - `::before` touch-target -> `@include utils.bpk-touch-tappable`
>
> **Token Usage (Constitution III)**
> - All visual params must use design tokens (no magic numbers)
> - Do NOT use `$bpk-private-*` tokens from other components
> - Verify token SEMANTIC meaning matches usage context, not just colour value:
>   - `$bpk-text-disabled-*` = disabled/non-interactive elements only
>   - `$bpk-text-secondary-*` = active but de-emphasised interactive elements
>   - `$bpk-surface-hero-*` = hero/prominent background areas
>   - `$bpk-status-danger-*` = error/destructive states
>   - `$bpk-core-accent-*` = selected/primary action states
>
> **Step 4: Package import investigation:**
> For each `import X from '../../bpk-component-Y'`:
> 1. Read `packages/bpk-component-Y/index.tsx` to see full export list
> 2. Look for size/variant suffixes (Large, Small, OnDark, V2)
> 3. Verify the imported variant matches context
>
> Only flag issues in **changed lines**. Ignore pre-existing violations.
> Return JSON array of issues. If none found, return `[]`.

---

### Agent 3: Accessibility & Testing Agent

**Scope:** Accessibility compliance, test coverage, snapshot currency.

**Prompt to give this agent:**

> You are reviewing Backpack accessibility and testing. Your ONLY job is to check a11y
> and test compliance. Return issues as JSON.
>
> **PR number:** [NUMBER] (repo: Skyscanner/backpack) — or "local mode"
> **Head commit SHA:** [SHA]
> **Changed files:** [INSERT LIST]
> **PR summary:** [INSERT]
>
> **Step 1: Fetch the diff and read changed component + test files.**
> Use `gh pr diff` or `git diff main...HEAD`. Read the full content of changed TSX and
> test files. Also read related test files that may not be in the diff.
>
> **Step 2: Check accessibility (Constitution IV — NON-NEGOTIABLE):**
> - `accessibility-test.tsx` file must exist for any component
> - Must use `jest-axe` for automated checks
> - Tests must exercise the public interface
> - Check for: keyboard navigation, ARIA labels, touch targets >= 44x44px
> - Verify colour contrast considerations in SCSS
>
> **Step 3: Check testing coverage (Constitution VIII):**
> - Unit tests (Jest + Testing Library) exist for all new code
> - Coverage thresholds: branches >= 70%, functions/lines/statements >= 75%
> - Storybook stories exist in `examples/` directory
>
> **Step 4: Snapshot currency (commonly missed):**
> After ANY change to rendered output, snapshots MUST be regenerated.
> 1. Read the `.snap` file for this component
> 2. Verify it matches the current component output
> 3. Look for stale attributes or class names
>
> Only flag issues in **changed files**. Ignore pre-existing violations.
> Return JSON array of issues. If none found, return `[]`.

---

### Agent 4: History Agent

**Scope:** Git blame, past PR comments, recurring patterns.

**Prompt to give this agent:**

> You are analysing the git history of files changed in a Backpack PR to find context-based
> issues. Return issues as JSON.
>
> **PR number:** [NUMBER] (repo: Skyscanner/backpack) — or "local mode"
> **Head commit SHA:** [SHA]
> **Changed files:** [INSERT LIST]
> **PR summary:** [INSERT]
>
> **Step 1: Fetch the diff.**
> Use `gh pr diff` or `git diff main...HEAD`.
>
> **Step 2: For each changed file, investigate history using your tools:**
> ```bash
> git log --oneline -10 -- [file]
> git log --oneline --all --grep="revert" -- [file]
> gh pr list --repo Skyscanner/backpack --state merged --limit 10 --search "[filename]"
> ```
>
> **Step 3: For the most relevant past PRs, check their review comments:**
> ```bash
> gh pr view [PAST_PR_NUMBER] --repo Skyscanner/backpack --comments
> ```
>
> **Step 4: Analyse patterns:**
> - Check if recently reverted code is being reintroduced
> - Identify hotspot files (frequent recent changes = higher scrutiny)
> - Check if past review comments flagged the same patterns now being introduced
>
> Only report issues **directly relevant to the current PR's changes**.
> Do not flag pre-existing issues unrelated to this PR.
> Return JSON array of issues. If none found, return `[]`.

---

### Agent 5: Bug Scanner

**Scope:** Shallow scan of the diff only, looking for obvious logic bugs.

**Prompt to give this agent:**

> You are scanning a Backpack PR diff for obvious bugs. Your ONLY job is to find logic
> errors, not style issues. Return issues as JSON.
>
> **PR number:** [NUMBER] (repo: Skyscanner/backpack) — or "local mode"
> **Head commit SHA:** [SHA]
> **Changed files:** [INSERT LIST]
> **PR summary:** [INSERT]
>
> **Step 1: Fetch the diff.**
> Use `gh pr diff` or `git diff main...HEAD`. Focus ONLY on the changed lines.
>
> **Step 2: Scan for bugs:**
> - Logic errors (wrong condition, off-by-one, missing null check)
> - Missing event handler cleanup (addEventListener without removeEventListener)
> - React-specific bugs (missing deps in useEffect, stale closures, key prop issues)
> - Type mismatches that TypeScript might not catch (wrong enum variant, swapped args)
> - Accessibility bugs (onClick without onKeyDown, missing role, wrong ARIA attribute)
> - CSS bugs (z-index conflicts, missing overflow handling, RTL issues)
>
> **Do NOT flag:**
> - Style issues or nitpicks
> - Pre-existing issues not introduced in this PR
> - Things a linter or type checker would catch
> - General code quality opinions
> - Missing tests (Agent 3 handles this)
> - Token or Sass issues (Agent 2 handles this)
>
> Be conservative. Only flag things you are confident are actual bugs.
> Return JSON array of issues. If none found, return `[]`.

---

## Phase 3: Confidence Scoring

After all 5 agents return, collect every issue into a single list.

**Scoring dispatch policy:**
- If `len(issues) <= 15`: launch **parallel scoring agents** — one per issue, all in one turn.
- If `len(issues) > 15`: the orchestrator scores all issues directly in a single pass
  (no sub-agents). Use the same scoring rubric below but process as a batch.

Phase 3 requirements:
- Preserve issue index so each score maps back to one issue deterministically.

Each scoring agent receives:
- The issue description
- The relevant code snippet from the PR
- The relevant Constitution/decision rule (if applicable)
- The issue metadata (`rule_id`, `supporting_lines`)

Confidence threshold:
- Default: `75`
- Override via inline argument: `/backpack-code-review-checklist threshold=80`
- The orchestrator parses the user's invocation message for `threshold=N` and uses that value throughout.

**Scoring prompt for each issue:**

> Score this issue on a scale from 0-100 for confidence that it is a real, actionable issue:
>
> **Issue:** [TITLE + EXPLANATION]
> **Code:** [RELEVANT SNIPPET]
> **Rule reference:** [CONSTITUTION/DECISION SECTION, if any]
> **Issue metadata:** [RULE_ID + SUPPORTING_LINES]
>
> Scoring rubric:
> - **0**: False positive. Does not stand up to scrutiny, or is a pre-existing issue.
> - **25**: Might be real but could be a false positive. If stylistic, not explicitly
>   required by Constitution or decisions/.
> - **50**: Real issue but minor. A nitpick or unlikely to matter in practice.
> - **75**: Verified real issue. Constitution or decisions/ explicitly requires this.
>   The PR's approach is insufficient. Will impact functionality or consistency.
> - **100**: Certain. NON-NEGOTIABLE violation (license header, className leak in new
>   component, missing accessibility test). Verified by reading the actual code.
>
> For Constitution/decision issues: verify the rule ACTUALLY says what the issue claims.
> - If you cannot find the rule **verbatim**, score 0.
> - If the rule exists but the violation requires interpretation (not explicitly stated), score 50 max.
> - Score >= 75 **only** if you have read the exact rule text AND confirmed the changed code contradicts it.
>
> For bug issues: verify the bug can actually occur given the surrounding code context.
>
> For history issues: verify the past feedback is relevant to the current change.
>
> Return ONLY a JSON object:
> `{"score": NUMBER, "confidence_explanation": "brief explanation", "rule_id": "string", "supporting_lines": [{"file":"...","startLine":1,"endLine":2}]}`

**False positive patterns to score 0:**
- Pre-existing issues not introduced in this PR
- Something that looks like a bug but isn't given context
- Pedantic nitpicks a senior engineer wouldn't flag
- Issues a linter/typechecker/compiler would catch
- General quality opinions not backed by Constitution/decisions
- Issues silenced by lint-ignore comments
- Intentional functionality changes directly related to the PR's purpose
- Grandfathered patterns in existing components (e.g. className in old components)

## Phase 4: Filter, Format, and Output

**Filter:**
- Let `threshold` = value from inline argument, or `75` if not specified
- Remove all issues with `score < threshold`
- Mark all issues with `threshold <= score < 90` as `requires_human_gate=true`

**Visibility mode:**
- Output **only** final `### Code review` block.
- Do not display Phase-by-Phase diagnostics (raw issue tables, scoring tables, self-check details).

**Agent status (always include):**

After aggregation, record which agents returned successfully and which failed:
- Successful: agent returned `[]` or a valid JSON array of issues.
- Failed: agent threw an error, timed out, or returned malformed output.

**If no issues remain:**

```markdown
### Code review

No issues found. Checked by N/5 agents (Constitution, Sass, A11y, History, Bug Scanner).
[If any agent failed: "Note: Agent N ([name]) failed — [brief reason]. Remaining agents completed successfully."]

🤖 Generated with [Claude Code](https://claude.ai/code)
```

**If issues remain, format as flat numbered list:**

```markdown
### Code review

Found N issues (reviewed by M/5 agents, filtered by confidence scoring):
[If any agent failed: "Note: Agent N ([name]) failed — [brief reason]."]

1. [Concise title] — [explanation: what is wrong, why it matters, what to use instead.
   Reference correct pattern from codebase if one exists.]

   [link to offending lines — format depends on PR vs local mode]
   [if human-gated] Gate rationale: [confidence_explanation]

2. [Next issue] — [explanation]

   [link]
   [if human-gated] Gate rationale: [confidence_explanation]

🤖 Generated with [Claude Code](https://claude.ai/code)
```

Internal metadata (`source`, `confidence`, `rule_id`, `human_gate`, `confidence_explanation`)
may be used by the orchestrator for gating decisions, but should not be printed in final output.

**Link format rules:**

- **PR mode** — GitHub permalink with full SHA:
  ```
  https://github.com/Skyscanner/backpack/blob/[HEAD_COMMIT_SHA]/[FILE_PATH]#L[START]-L[END]
  ```
  Autopost policy:
  - Default: do not post automatically.
  - Post only when user explicitly requests, or `BACKPACK_REVIEW_AUTOPOST=true`.
  - If any issue has `requires_human_gate=true`, require explicit confirmation before posting.
  - Partial posting is not allowed when any issue is human-gated.
  - After confirmation, post the full filtered result set (not a subset).

  After passing guardrails, post to PR:
  ```bash
  gh pr review NNN --comment --body "$(cat <<'EOF'
  [review body]
  EOF
  )"
  ```

- **Local mode** — VSCode-clickable link:
  ```markdown
  [packages/bpk-component-foo/src/BpkFoo.tsx:42](packages/bpk-component-foo/src/BpkFoo.tsx#L42)
  ```

**Output rules:**
- Count real issues only — do not pad with nits
- Each title max ~10 words; dash separates from explanation
- Explanation must include: (a) what is wrong, (b) why, (c) what to use instead
- Link to a correct precedent in the repo when one exists
- For `requires_human_gate=true` issues, include `Gate rationale: [confidence_explanation]`
- Default output must be user-facing and authoritative: focus on issues and fixes, not review process internals
- Do NOT include strengths section, compliance score table, or required-actions checklist
- Do NOT print `Phase 0-5` headings or internal tables

---

## Phase 5: Orchestrator Self-Check (Internal)

This phase is internal by default. Do not print it in normal output mode.

Before finalising output, confirm all of the following:
- Checked `className`/`style` leakage for new components
- Verified design approval evidence is present and substantive
- Checked private token misuse and token semantic-name correctness
- Checked license headers on changed source files
- Reviewed snapshot currency when rendered output changed
- Performed mixin investigation for direct CSS properties
- Performed package-export investigation for imported Backpack helpers
- Verified token colour match AND semantic meaning
- Included diagnostics for any failed agents
- Enforced autopost guardrails (`BACKPACK_REVIEW_AUTOPOST`, human gate for 75-90)

---

## Privacy and Access Control

- Sensitive data handling:
  - Never include secrets/tokens/credentials in agent prompts or output.
  - Agents read files from the local repo and call `gh` CLI — no external services beyond GitHub.
- GitHub token scopes (minimum):
  - Read: repository read access for PR diff/comments/history.
  - Write: pull request comment permission (only when autopost is enabled).

---

## Reference: Domain Knowledge

The following sections provide reference material. Agent prompts include the key rules
inline; these sections provide additional detail for edge cases.

### API Design: New vs Existing Components

**New components (after Constitution ratification):**
- MUST NOT accept `className` or `style` props
- Correct: `Omit<ComponentPropsWithoutRef<'div'>, 'children' | 'className' | 'style'>`

**Existing components (grandfathered):**
- MAY keep `className`/`style` for backward compatibility
- Discourage use in documentation

### Token Hierarchy

**Token Reference**: [backpack-foundations/base.common.js](https://github.com/Skyscanner/backpack-foundations/blob/main/packages/bpk-foundations-web/tokens/base.common.js)

| Category | Pattern | Example |
|----------|---------|---------|
| Core | `$bpk-core-*` | `$bpk-core-primary-day` |
| Surface | `$bpk-surface-*` | `$bpk-surface-default-day` |
| Text | `$bpk-text-*` | `$bpk-text-primary-day` |
| Status | `$bpk-status-*` | `$bpk-status-danger-spot-day` |
| Line | `$bpk-line-*` | `$bpk-line-day` |
| Spacing | functions | `tokens.bpk-spacing-base()` |
| Private | `$bpk-private-[component]-*` | DO NOT use cross-component |

### Color Value Matching

Backpack tokens use RGB notation (`rgb(239, 243, 248)`). When matching Figma/design colours:
1. Convert HEX to RGB
2. Search in backpack-foundations `base.common.js`
3. Use the matching token, not the raw value
4. If no semantic token exists, flag need for a new foundations token rather than raw colour fallback

### Design Approval Workflow

1. Design review completed before implementation, or explicit Backpack designer approval
2. Figma design artefacts cover all component states
3. Responsive behaviour and accessibility notes are documented
4. PR description links or references the approval evidence

### Common Traps

- Assuming existing component patterns are correct (they may be grandfathered)
- Copying private tokens from other components
- Using px because "it's just one value"
- Making `accessibilityLabel` optional "to be flexible"
- Leaving snapshot files stale after changing rendered output
- Accepting CSS values without checking if `bpk-mixins/` abstracts them
- Accepting imports without checking the full package API for a better variant
- Accepting token colour match without verifying the token name fits the UI state

## References

- [Backpack Constitution](/.specify/memory/constitution.md)
- [Modern Sass API Decision](/decisions/modern-sass-api.md)
- [Accessibility Tests Decision](/decisions/accessibility-tests.md)
- [Component SCSS Filenames Decision](/decisions/component-scss-filenames.md)
- [Versioning Rules](/decisions/versioning-rules.md)
- [Deprecated API](/decisions/deprecated-api.md)
- [Code Review Guidelines](/CODE_REVIEW_GUIDELINES.md)
- [Backpack Documentation](https://www.skyscanner.design/)
- [Anthropic Code Review Plugin](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/code-review) — Architecture inspiration
