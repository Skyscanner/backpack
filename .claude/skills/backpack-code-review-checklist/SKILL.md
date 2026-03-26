---
name: backpack-code-review-checklist
description: Self-improving multi-agent review orchestrator for Backpack component PRs. Runs 6 parallel specialist agents (including a learned-patterns agent that mines past PR comments), then confidence-scores findings. Use for PR review, Constitution compliance checks, and pre-merge validation. Run with "learn" to mine recent PRs and auto-update checklist rules.
version: 3.0.2
changelog: |
  - v3.0.2: Performance optimisation — orchestrator pre-fetches diff once and slices per
    agent (eliminates 6× redundant gh pr diff calls); agents self-score (confidence field
    in JSON output, eliminating separate Phase 3 pass); Phase 1.5 runs parallel with
    Phase 1; Phase 1.5 skipped when >70% files are brand-new.
  - v3.0.1: Learned 9 rules from 40 recent PRs (learn mode, 2026-03-26). Added to agent1:
    semver label accuracy, versioned sub-component naming, variants via type prop, no build
    artifacts, Ark-UI internal usage, unversioned src/ layout. Added to agent2: semantic
    spacing token for icon-to-text. Added to agent5: Ark-UI keyboard state sync, icon
    alignment helper size mismatch.
  - v3.0.0: Restructured into multi-file layout. Agent prompts moved to agents/*.md,
    Learn Mode to learn-mode.md, domain knowledge to domain-knowledge.md.
    Added Phase 1.5 (PR comment mining) and Agent 6 (Learned Patterns).
  - v2.1.0: Architecture overhaul — agents self-fetch data, full tool access, early-exit check.
  - v2.0.0: Multi-agent orchestrator with confidence scoring, History Agent, Bug Scanner.
  - v1.0.0: Initial checklist.
---

# Backpack Code Review — Multi-Agent Orchestrator

Dispatches **6 parallel specialist agents**, each with its own prompt file in `agents/`.
A confidence-scoring pass filters false positives.
Threshold: default 75, override via `/backpack-code-review-checklist threshold=80`.

## Execution Flow

```
Phase 0    Detect run mode — learn vs review; early-exit check (review only)
Phase 1    Metadata + diff pre-fetch + slice per agent  ┐ run in
Phase 1.5  Mine learned patterns (feeds Agent 6)        ┘ parallel
Phase 2    Launch agents IN PARALLEL (agents use pre-fetched diff; self-score)
Phase 3    [eliminated — agents self-score inline]
Phase 4    Filter, format, and output
Phase 5    Orchestrator self-check (internal)
```

---

## Phase 0: Detect Run Mode + Early Exit

**Step 0.0 — Detect Learn Mode:**
If the invocation contains `learn`, read and follow `learn-mode.md`. Stop here.

**Step 0.1 — Determine review mode:**

- **PR mode**: message contains a `github.com/.../pull/NNN` URL
  - Extract PR number; run `gh pr view NNN --repo Skyscanner/backpack --json headRefOid,files,state,isDraft,body`
  - Link format: `https://github.com/Skyscanner/backpack/blob/[HEAD_COMMIT_SHA]/[PATH]#L[START]-L[END]`
  - Autopost: default off. Post only when user explicitly asks or `BACKPACK_REVIEW_AUTOPOST=true`.
    Issues with confidence 75–90 require human confirmation before posting.

- **Local mode**: no PR URL
  - Use `git diff main...HEAD`; output to conversation only, no GitHub posting
  - Link format: `[path/file.tsx:29](path/file.tsx#L29)`

**Step 0.2 — Early exit** (PR mode only). Skip review if:
- PR is closed, merged, or draft
- PR is trivial/automated (only changelog or dependency bumps)
- PR already has a code review comment from Claude

---

## Phase 1 + Phase 1.5: Run in Parallel

**Launch both steps at the same time** — Phase 1 runs directly in the orchestrator (bash commands); Phase 1.5 is dispatched as a background subagent. They are independent and must not block each other.

### Phase 1: Metadata + Diff Pre-fetch

- PR number, head commit SHA, changed file paths, PR body (already done in Phase 0)
- **Read the full PR description** to extract motivation, design decisions, known trade-offs,
  and any reviewer notes. In local mode, first check for an open PR on the current branch:
  ```bash
  gh pr list --repo Skyscanner/backpack --head $(git branch --show-current) --json number,body,state
  ```
  If a PR exists, read its description. If not, fall back to commit messages:
  `git log main...HEAD --format='%s%n%b'`
- Skim: `.specify/memory/constitution.md`, `CODE_REVIEW_GUIDELINES.md`, relevant `decisions/`
- Summarise the PR in 2-3 sentences; pass as `[INSERT]` to all agents

**Diff pre-fetch (critical for performance):** Fetch the full diff once:
```bash
gh pr diff [NUMBER] --repo Skyscanner/backpack   # PR mode
git diff main...HEAD                              # local mode
```
Slice the fetched diff in memory — do NOT issue additional `gh pr diff` calls:
- **SCSS slice** → Agent 2: filter to lines belonging to `*.scss` files
- **TSX/TS slice** → Agents 1, 3, 5: filter to lines belonging to `*.ts`/`*.tsx` files
- **Full diff** → Agents 4, 6

Pass each slice as `[INSERT SCOPED DIFF]` in the agent's prompt. **Agents must not re-fetch the diff.**

### Phase 1.5: Mine Learned Patterns

**Skip entirely** if >70% of changed files are brand-new (new files have no history to mine).

Otherwise:
1. Extract component names from changed paths (e.g. `packages/bpk-component-modal/` → `bpk-component-modal`)
2. For each component (max 3), find its 5 most recently merged PRs:
   ```bash
   gh pr list --repo Skyscanner/backpack --state merged --limit 50 \
     --search "[COMPONENT_NAME]" --json number,title,mergedAt | head -5
   ```
3. For each PR, fetch comments:
   ```bash
   gh pr view [N] --repo Skyscanner/backpack --json reviews,comments,reviewThreads
   ```
4. Collect raw text from `reviews[].body`, `comments[].body`, and inline diff-thread comments
   (`reviewThreads[].comments[].body`). Pass to Agent 6 as-is.
   If no comments found, omit Agent 6.

---

## Phase 2: Launch Agents in Parallel

**Agent pruning:**

| Agent | Launch when | Skip when |
|-------|------------|-----------|
| Agent 1 (Constitution & API) | Always | Never |
| Agent 2 (Sass & Token) | `.scss` files in diff | No `.scss` files |
| Agent 3 (A11y & Testing) | Always | Never |
| Agent 4 (History) | Files exist on `main` | >70% of changed files are brand-new |
| Agent 5 (Bug Scanner) | Always | Never |
| Agent 6 (Learned Patterns) | Phase 1.5 found comments | No historical comments |

**Dispatch all selected agents in a single message** using multiple Agent tool calls.

For each agent, **read its prompt file** from `agents/` and fill in the template variables
before dispatching:

| Agent | Prompt file | Scoped diff to embed |
|-------|-------------|----------------------|
| Agent 1 | `agents/agent1-constitution.md` | TSX/TS slice |
| Agent 2 | `agents/agent2-sass.md` | SCSS slice |
| Agent 3 | `agents/agent3-a11y.md` | TSX/TS slice |
| Agent 4 | `agents/agent4-history.md` | Full diff |
| Agent 5 | `agents/agent5-bugs.md` | TSX/TS slice |
| Agent 6 | `agents/agent6-learned.md` | Full diff + Phase 1.5 comments |

**Template variables to fill in for every agent:** `[NUMBER]`, `[SHA]`, `[INSERT LIST]`, `[INSERT]` (PR summary), `[INSERT SCOPED DIFF]`.

**Agents use the pre-fetched diff embedded in their prompt.** They may still use the Read
tool to inspect specific files for deeper context, but must NOT re-fetch the full diff via
`gh pr diff` or `git diff`.

**Each agent returns a JSON array with inline confidence scores (no separate Phase 3):**
```json
[
  {
    "title": "Brief issue title (max 10 words)",
    "explanation": "What is wrong, why it matters, what to use instead",
    "file": "packages/bpk-component-foo/src/BpkFoo.tsx",
    "startLine": 42,
    "endLine": 45,
    "source": "constitution|sass-tokens|a11y-testing|history|bug-scan|learned-patterns",
    "rule_id": "constitution.xi.classname-restriction",
    "rule": "Constitution XI — className restriction",
    "confidence": 85,
    "confidence_explanation": "Constitution XI explicitly requires Omit<…,'className'|'style'>; new file confirmed via git show",
    "supporting_lines": [{ "file": "...", "startLine": 42, "endLine": 45 }]
  }
]
```

**Confidence scoring rubric (agents must apply this when setting `confidence`):**
- **0**: False positive or pre-existing issue
- **25**: Might be real; stylistic, not explicitly required by Constitution/decisions
- **50**: Real but minor nitpick
- **75**: Verified — Constitution/decisions explicitly requires this, PR contradicts it
- **100**: Certain — NON-NEGOTIABLE violation (license, className leak, missing a11y test)

Score 0 for: pre-existing violations, context-dependent non-bugs, pedantic nitpicks,
linter-catchable issues, quality opinions without rule backing, grandfathered className.

**After aggregation — deduplication:** If two issues share the same `file` AND overlapping
`startLine–endLine` AND similar `title`, merge into one. Keep the more specific `rule_id`;
priority order: constitution > sass-tokens > a11y-testing > history > bug-scan > learned-patterns.

---

## Phase 3: [Eliminated]

Confidence scoring is now inline — agents report `confidence` and `confidence_explanation`
in their JSON output (see Phase 2). No separate pass needed.

---

## Phase 4: Filter, Format, and Output

**Filter:** use each issue's `confidence` field; remove issues with `confidence < threshold`.
Issues with `threshold <= confidence < 90` are human-gated — include them in output with
a "Gate rationale" line showing `confidence_explanation`, and require explicit user
confirmation before posting to GitHub.

**Output only** the final `### Code review` block — no phase diagnostics, no tables.

**If no issues:**
```markdown
### Code review

No issues found. Checked by N/6 agents (Constitution, Sass, A11y, History, Bug Scanner, Learned Patterns).
[Note any failed agents]

🤖 Generated with [Claude Code](https://claude.ai/code)
```

**If issues found:**
```markdown
### Code review

Found N issues (reviewed by M/6 agents, filtered by confidence scoring):
[Note any failed agents]

1. [Title] *(recurring pattern)* — [explanation: what, why, fix. Link to codebase precedent if one exists.]

   [link]
   [if human-gated] Gate rationale: [confidence_explanation]

🤖 Generated with [Claude Code](https://claude.ai/code)
```

**Output rules:**
- `*(recurring pattern)*` suffix for `source: learned-patterns` issues
- Explanation: (a) what is wrong, (b) why, (c) what to use instead
- Links: PR mode = full SHA permalink; local mode = VSCode-clickable `[file:line](file#Lline)`
- No strengths section, compliance table, or required-actions checklist
- Autopost: default off; human gate issues require explicit confirmation; no partial posting

---

## Phase 5: Orchestrator Self-Check (Internal — do not print)

- Check `className`/`style` leakage for new components
- Verify design approval evidence is present and substantive
- Check private token misuse and token semantic-name correctness
- Check license headers on changed source files
- Review snapshot currency when rendered output changed
- Perform mixin investigation for direct CSS properties
- Perform package-export investigation for imported Backpack helpers
- Verify token colour match AND semantic meaning
- Include diagnostics for any failed agents
- Enforce autopost guardrails

---

## Privacy and Access Control

- Never include secrets/tokens/credentials in agent prompts or output
- Agents use only local repo files and `gh` CLI — no external services beyond GitHub
- GitHub token scopes: read (diff/comments/history); write (PR comments, autopost only)

---

## References

- [Backpack Constitution](/.specify/memory/constitution.md)
- [Code Review Guidelines](/CODE_REVIEW_GUIDELINES.md)
- [decisions/](/decisions/) — Sass API, accessibility tests, versioning, deprecated API
- [domain-knowledge.md](domain-knowledge.md) — Token hierarchy, colour matching, common traps
- [learn-mode.md](learn-mode.md) — Self-improvement workflow
- [agents/](agents/) — Individual agent prompts
