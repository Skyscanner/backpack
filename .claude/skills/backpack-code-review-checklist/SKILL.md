---
name: backpack-code-review-checklist
description: |
  Multi-agent review orchestrator for Backpack component PRs.
  Runs 5 parallel specialist agents, then confidence-scores findings to reduce false positives.
  Use for PR review, Constitution compliance checks, and pre-merge validation.
author: Claude Code
version: 2.0.0
date: 2026-03-20
changelog: |
  v2.0.0: Rewrote as multi-agent orchestrator with confidence scoring; added History Agent and Bug Scanner; retained detailed Backpack review checks (TS/docs/design/a11y/testing); added orchestrator self-check, deterministic chunking/retry strategy, configurable threshold, autopost guardrails, privacy/access-control guidance, final-only output, clarified Agent 1 scope/autopost no-partial-post behavior, moved History Agent to context-only execution, and surfaced confidence explanations for human-gated findings.
  v1.2.0: Added investigation methods for CSS properties, package imports, and token semantics.
  v1.1.0: Added snapshot currency checks.
  v1.0.0: Initial checklist.
---

# Backpack Code Review — Multi-Agent Orchestrator

## Overview

This skill reviews Backpack component PRs by dispatching **5 parallel specialist agents**,
each focused on a narrow domain. A separate scoring pass filters false positives. The
confidence threshold is configurable and defaults to 75.

## Execution Flow

```
Phase 0  Detect review mode (PR vs local)
Phase 1  Gather context (diff, changed files, history context, chunking)
Phase 2  Launch 5 specialist agents IN PARALLEL
Phase 3  Score each issue independently (parallel scoring agents)
Phase 4  Filter (>= threshold), format, and output
Phase 5  Orchestrator self-check (gates before final/autopost)
```

---

## Phase 0: Detect Review Mode

**Before doing anything else**, determine the review mode:

- **PR mode**: user message contains a `github.com/.../pull/NNN` URL
  - Extract the PR number
  - Run `gh pr view NNN --repo Skyscanner/backpack --json headRefOid,files` to get head commit SHA and changed files
  - Link format (use full 40-character SHA): `https://github.com/Skyscanner/backpack/blob/[HEAD_COMMIT_SHA]/[PATH]#L[START]-L[END]`
  - Autopost guardrail:
    - Default is **no autopost**. Print review to conversation first.
    - Post to PR only if user explicitly asks, or `BACKPACK_REVIEW_AUTOPOST=true`.
    - Findings with confidence 75-90 require human confirmation before posting.
    - If any 75-90 finding exists, block posting of the entire batch (no partial posting).

- **Local mode**: no PR URL
  - Use `git diff main...HEAD` to get changes
  - Output review to conversation only — do NOT post to GitHub
  - Link format: `[path/file.tsx:29](path/file.tsx#L29)`

## Phase 1: Gather Context

Before launching agents, the orchestrator (you) must collect all shared context. Sub-agents
**do NOT fetch the diff themselves** — the orchestrator fetches it once and injects it into
each agent prompt. This ensures sub-agents work even in restricted tool environments.

**Step 1.1** — Get the diff and list of changed files:
```bash
# PR mode
gh pr diff NNN --repo Skyscanner/backpack
gh pr view NNN --repo Skyscanner/backpack --json files,headRefOid,body

# Local mode
git diff main...HEAD
git diff main...HEAD --name-only
```

**Step 1.2** — Read reference documents (skim for relevant sections):
- `.specify/memory/constitution.md` — Core principles I-XIII
- `CODE_REVIEW_GUIDELINES.md` — Quality standards
- `decisions/` — Relevant decision records (modern-sass-api.md, accessibility-tests.md, etc.)

**Step 1.3** — Summarise what this PR does in 2-3 sentences.

**Step 1.4** — For each specialist agent, embed into its prompt:
- The PR summary (Step 1.3)
- Relevant diff chunks (not always full diff)
- The list of changed files

**Step 1.5** — Build history context in the orchestrator (PR mode):
```bash
# Changed-file git history
git log --oneline -10 -- [file]
git log --oneline --all --grep="revert" -- [file]

# Past PR comments touching similar files/components
gh pr list --repo Skyscanner/backpack --state merged --limit 20 --search "[filename]"
gh pr view [PR_NUMBER] --repo Skyscanner/backpack --comments
```
- Summarise recurring review feedback per file/component.
- Summarise git history/blame/revert signals for each changed line range.
- Inject all summaries into the History Agent prompt as `history_context`.

**Step 1.6** — Diff chunking protocol (deterministic):
- Split diff by file, then by hunks, then into chunks of at most 200 added/removed lines.
- Cap context per agent with `MAX_CHUNKS_PER_AGENT` (default 40). If exceeded, prioritise:
  1) hunks with code changes over docs/changelog, 2) larger hunks, 3) high-risk file types.
- Route chunks by agent scope:
  - Constitution/API: `.ts`, `.tsx`, `README.md`, `examples/**`
  - Sass/Token: `.scss`
  - A11y/Testing: `*-test.*`, `accessibility-test.*`, snapshots, stories/examples
  - History: changed file list + changed line ranges + `history_context` (no direct GH calls)
  - Bug Scanner: highest-risk code hunks across `.ts`, `.tsx`, `.js`
- If truncation occurs, include `truncation_notice` listing omitted files/chunks in final output.

> **Why:** Sub-agents launched via the Agent tool run in a sandboxed context where Bash/GitHub
> tool permissions may be restricted. The orchestrator must be the single point that fetches
> external data; agents should only read local files or analyse context passed to them.

## Phase 2: Launch 5 Specialist Agents in Parallel

Launch all 5 agents in a **single message** using multiple Agent tool calls. Each agent
receives: (a) the PR summary, (b) the list of changed files, (c) its domain-specific rules.

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

### Phase 2A: Parallel Failure Strategy (Deterministic)

- Retry each failed sub-agent call up to 2 times with exponential backoff (1s, then 2s).
- If still failing, continue with partial results and emit a diagnostic record:
  - `{"source":"orchestrator","title":"Agent failure","agent":"NAME","error":"...","retries":2}`
- Preserve deterministic ordering in aggregation:
  1) sort by file path, 2) startLine, 3) source, 4) title.
- Always include which agents were executed, retried, failed, and succeeded.

---

### Agent 1: Constitution & API Agent

**Scope:** Naming, license, API encapsulation, TypeScript, documentation, and design approval checks.

**Prompt to give this agent:**

> You are reviewing a Backpack design system PR. Your ONLY job is to check Constitution
> compliance for naming, licensing, and API design. Return issues as JSON.
> This agent intentionally covers API/TS/docs/design checks. Sass/token checks are handled
> by Agent 2, and accessibility/testing checks are handled by Agent 3.
>
> **PR summary:** [INSERT]
> **Changed files:** [INSERT LIST]
> **Diff:** [INSERT FULL DIFF OR RELEVANT SECTIONS]
>
> Read each changed file, then check:
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
> - For changed shell scripts, verify comment style is `#` comments after shebang
> - Check with: `grep -L "Copyright 2016 Skyscanner" [files]`
>
> **API Encapsulation (Constitution XI — CRITICAL)**
> - NEW components MUST NOT accept `className` or `style` props
> - Correct pattern: `Omit<ComponentPropsWithoutRef<'div'>, 'children' | 'className' | 'style'>`
> - Wrong pattern: bare `ComponentPropsWithoutRef<'div'>` which leaks className
> - Existing components may grandfather className — check git log to determine if component is new
> - Accessibility props (e.g. `accessibilityLabel`) must be REQUIRED, not optional
>
> **TypeScript (Constitution V)**
> - All new code in TypeScript
> - Proper prop type interfaces
> - JSDoc/TSDoc comments for public APIs
> - `@deprecated` tags for deprecated APIs
> - Console warning path exists for deprecated prop usage where applicable
>
> **Documentation (Constitution IX)**
> - README.md with usage examples
> - Storybook stories in `examples/`
> - British English for prose
> - Public props documented with JSDoc/TSDoc
> - Accessibility guidance included where relevant
> - Docs style checks: sentence case titles, singular titles, concise descriptions (< 100 words)
>
> **Design Approval (Constitution X — BLOCKING)**
> - Check PR description and commits for design approval evidence
> - Validate evidence includes design review OR Backpack designer approval
> - Verify Figma coverage for all core states (default/hover/focus/active/disabled/loading/error)
> - Verify responsive behaviour is specified (mobile/tablet/desktop)
> - Verify accessibility annotations exist in design artefacts
> - Missing design approval = blocking issue
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
> **PR summary:** [INSERT]
> **Changed files:** [INSERT LIST — only .scss files relevant]
> **Diff (SCSS files only):** [INSERT RELEVANT DIFF SECTIONS]
>
> Read each changed SCSS file, then check:
>
> **Modern Sass API (Constitution III — NON-NEGOTIABLE)**
> - Must use `@use` syntax, NEVER `@import`
> - Granular imports: `@use '../../bpk-mixins/tokens'`, `@use '../../bpk-mixins/utils'`
> - Namespace prefixes: `tokens.bpk-spacing-md()`, `tokens.$bpk-core-primary-day`
> - CSS Modules (`.module.scss`)
> - All sizing in `rem`, not `px` or `em`
>
> **Mixin investigation (CRITICAL):**
> For EVERY CSS property written directly (`:hover`, `transition:`, `border-radius:`,
> `z-index:`, `::before`, etc.):
> 1. Search `packages/bpk-mixins/` for an existing mixin that abstracts this pattern
> 2. Check 2-3 similar existing components to see how they handle the same pattern
> 3. If a mixin exists and the new code bypasses it, flag it as a violation
>
> Known mixin mappings:
> - `:hover` -> `@include utils.bpk-hover { }` (gates behind `.bpk-no-touch-support`)
> - `transition: ... 0.2s` -> `tokens.$bpk-duration-sm` token
> - `::before` touch-target -> `@include utils.bpk-touch-tappable`
>
> **Token Usage (Constitution III)**
> - All visual params must use design tokens (no magic numbers)
> - Do NOT use `$bpk-private-*` tokens from other components
> - Token additions/changes must be done in a separate backpack-foundations PR
> - Verify token SEMANTIC meaning matches usage context, not just colour value:
>   - `$bpk-text-disabled-*` = disabled/non-interactive elements only
>   - `$bpk-text-secondary-*` = active but de-emphasised interactive elements
>   - `$bpk-surface-hero-*` = hero/prominent background areas
>   - `$bpk-status-danger-*` = error/destructive states
>   - `$bpk-core-accent-*` = selected/primary action states
>
> **Package import investigation:**
> For each `import X from '../../bpk-component-Y'`:
> 1. Open `packages/bpk-component-Y/index.tsx` to see full export list
> 2. Look for size/variant suffixes (Large, Small, OnDark, V2)
> 3. Verify the imported variant matches context (icon size, button size, etc.)
> - Known trap: `withButtonAlignment` (sm/ icons) vs `withLargeButtonAlignment` (lg/ icons)
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
> **PR summary:** [INSERT]
> **Changed files:** [INSERT LIST]
> **Diff (TSX/test files):** [INSERT RELEVANT DIFF SECTIONS]
>
> Read the changed files and related test files, then check:
>
> **Accessibility (Constitution IV — NON-NEGOTIABLE)**
> - `accessibility-test.tsx` file must exist for any component
> - Must use `jest-axe` for automated checks
> - Tests must exercise the public interface
> - Check for: keyboard navigation, ARIA labels, touch targets >= 44x44px
> - Verify colour contrast considerations in SCSS
> - Verify evidence for screen reader compatibility and keyboard-only usage
> - Verify evidence for 200% text magnification support
> - Verify evidence for 400% zoom without horizontal scrolling
>
> **Testing Coverage (Constitution VIII)**
> - Unit tests (Jest + Testing Library) exist for all new code
> - Coverage thresholds: branches >= 70%, functions/lines/statements >= 75%
> - Accessibility tests exist
> - Storybook stories exist in `examples/` directory
> - Visual regression coverage exists (Percy/Storybook snapshots where applicable)
> - Snapshot tests exist where component output is snapshot-tested
>
> **Snapshot Currency (commonly missed):**
> After ANY change to rendered output (prop added/removed, attribute changed, HTML structure
> changed), snapshots MUST be regenerated. Check:
> 1. Read the `.snap` file for this component
> 2. Verify it matches the current component output
> 3. Look for stale attributes (e.g. `title="..."` after `aria-label` was added)
> 4. Look for class names that were renamed but not updated in snapshot
>
> When tooling is available, run targeted tests (`npm run jest -- accessibility-test` and
> component test suites). If tests cannot be run, call this out explicitly as verification risk.
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
> **PR summary:** [INSERT]
> **Changed files:** [INSERT LIST]
> **Diff:** [INSERT FULL DIFF]
> **History context from orchestrator:** [INSERT history_context]
>
> For each changed file:
>
> **1. Git history analysis (from `history_context`):**
> - Understand the evolution of the modified code
> - Check if recently reverted code is being reintroduced
> - Identify hotspot files (frequent recent changes = higher scrutiny needed)
>
> **2. Past PR review comments (from orchestrator context):**
> - Look for recurring review feedback on the same files
> - Check if past review comments flagged the same patterns now being introduced
> - If a past reviewer asked for a specific change, check if this PR follows that guidance
> - Do NOT call GitHub CLI directly in this agent; rely on injected `history_context`
>
> **3. Revert detection (from `history_context`):**
> - If this area of code was recently reverted, flag for extra caution
>
> Only report issues that are **directly relevant to the current PR's changes**.
> Do not flag pre-existing issues that are unrelated to this PR.
> Do NOT execute Bash/GitHub commands in this agent.
> Return JSON array of issues. If none found, return `[]`.

---

### Agent 5: Bug Scanner

**Scope:** Shallow scan of the diff only, looking for obvious logic bugs.

**Prompt to give this agent:**

> You are scanning a Backpack PR diff for obvious bugs. Your ONLY job is to find logic
> errors, not style issues. Return issues as JSON.
>
> **PR summary:** [INSERT]
> **Changed files:** [INSERT LIST]
> **Diff:** [INSERT FULL DIFF]
>
> Read the diff of each changed file. Focus ONLY on the changed lines. Look for:
>
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

After all 5 agents return, collect every issue into a single list. Then launch **parallel
scoring agents** — one per issue (or batch small groups if there are many).

Each scoring agent receives:
- The issue description
- The relevant code snippet from the PR
- The relevant Constitution/decision rule (if applicable)
- The issue metadata (`rule_id`, `supporting_lines`)

Use confidence threshold:
- `BACKPACK_REVIEW_CONFIDENCE_THRESHOLD` (default `75`)

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
> If you cannot find the rule, score 0.
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
- Let `threshold = BACKPACK_REVIEW_CONFIDENCE_THRESHOLD` (default 75)
- Remove all issues with `score < threshold`
- Mark all issues with `threshold <= score < 90` as `requires_human_gate=true`

**Visibility mode:**
- Output **only** final `### Code review` block.
- Do not display Phase-by-Phase diagnostics (raw issue tables, scoring tables, self-check details).

**If no issues remain:**

```markdown
### Code review

No issues found. Checked for Constitution compliance, Sass/token usage, accessibility,
bugs, and historical patterns across 5 independent review agents.

🤖 Generated with [Claude Code](https://claude.ai/code)
```

**If issues remain, format as flat numbered list:**

```markdown
### Code review

Found N issues (reviewed by 5 independent agents, filtered by confidence scoring):

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
- Checked license headers on changed source files and changed shell scripts
- Reviewed snapshot currency when rendered output changed
- Ran targeted tests or explicitly documented why test execution was not possible
- Performed mixin investigation for direct CSS properties
- Performed package-export investigation for imported Backpack helpers
- Verified token colour match AND semantic meaning
- Included `truncation_notice` if any diff chunks were omitted
- Included diagnostics for any failed/retried agents
- Enforced autopost guardrails (`BACKPACK_REVIEW_AUTOPOST`, human gate for 75-90)

---

## Privacy, Security, and Access Control

- External model use:
  - Sub-agent/scoring prompts are sent to the LLM endpoint configured by the runtime.
  - Send only scoped context: PR summary, routed diff chunks, changed file list, and history summary.
- Sensitive data handling:
  - Never include secrets/tokens/credentials in prompts.
  - Prefer changed-line snippets over full-file dumps.
  - In sensitive repos, set `BACKPACK_REVIEW_LOCAL_ONLY=true` and skip external history fetching/autopost.
- GitHub token scopes (minimum):
  - Read review context: repository read access for PR diff/comments.
  - Post review comments: pull request write permission (only when autopost is enabled).
- Sandbox boundary:
  - Only the orchestrator may call network/GitHub tools.
  - Sub-agents must analyse injected context and local files only.

---

## Reference: Domain Knowledge

The following sections provide reference material for agents. They are NOT executed
sequentially — they are embedded into agent prompts as needed.

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

### SemVer Impact Classification

- **MAJOR**: Breaking API changes, visual changes, token changes, removal, new mandatory functionality
- **MINOR**: New optional features, new components, deprecations
- **PATCH**: Bug fixes, dependency updates, code quality

Err on the side of classifying changes as more breaking rather than less.

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
