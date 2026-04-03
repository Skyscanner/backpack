---
name: backpack-code-review-checklist
description: Self-improving multi-agent review orchestrator for Backpack component PRs. Runs 6 parallel specialist agents (including a learned-patterns agent that mines past PR comments), then confidence-scores findings. Use for PR review, Constitution compliance checks, and pre-merge validation. Run with "learn" to mine recent PRs and auto-update checklist rules.
---

# Backpack Code Review — Multi-Agent Orchestrator (v3.0.4)

<!-- Changelog
- v3.0.5: Restore independent Phase 3 scoring (removes agent self-scoring bias);
  Agent 5 now receives full diff to catch cross-file-type bugs (SCSS+TSX specificity conflicts);
  restore accessibility-test.tsx check for existing components (Constitution IV);
  fix .line null fallback to original_line in RESOLVED_SET/RAISED_SET matching.
- v3.0.4: Revert autopost default to OFF (opt-in via "post" / BACKPACK_REVIEW_AUTOPOST=true);
  remove early-exit on "PR already has Claude review" to allow re-review after author pushes fixes.
- v3.0.3: Fix blind spot — Phase 1 now fetches current PR's own inline review comments
  and builds a RESOLVED_SET/RAISED_SET; Phase 4 drops/annotates matches.
- v3.0.2: Performance — orchestrator pre-fetches diff once, agents self-score, Phase 1.5 parallel.
- v3.0.1: Learned 9 rules from 40 recent PRs.
- v3.0.0: Multi-file layout, agents/*.md, learn-mode.md, Agent 6 (Learned Patterns).
- v2.1.0: Agents self-fetch data, full tool access, early-exit check.
- v2.0.0: Multi-agent orchestrator with confidence scoring.
- v1.0.0: Initial checklist.
-->

Dispatches **6 parallel specialist agents**, each with its own prompt file in `agents/`.
A confidence-scoring pass filters false positives.
Threshold: default 75, override via `/backpack-code-review-checklist threshold=80`.

## Execution Flow

```
Phase 0    Detect run mode — learn vs review; early-exit check (review only)
Phase 1    Metadata + diff pre-fetch + slice per agent  ┐ run in
Phase 1.5  Mine learned patterns (feeds Agent 6)        ┘ parallel
Phase 2    Launch agents IN PARALLEL (agents use pre-fetched diff)
Phase 3    Independent confidence scoring (parallel scoring agents or orchestrator batch)
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
  - **Autopost: OFF by default in PR mode.** Output to conversation only unless user explicitly says "post" / "post to GitHub" / `BACKPACK_REVIEW_AUTOPOST=true`.
    When autopost is enabled, uses the GitHub Reviews API to place **inline comments on diff lines**.
    Issues with confidence 75–90 require human confirmation before posting.

- **Local mode**: no PR URL
  - Use `git diff main...HEAD`; output to conversation only, no GitHub posting
  - Link format: `[path/file.tsx:29](path/file.tsx#L29)`

**Step 0.2 — Early exit** (PR mode only). Skip review if:
- PR is closed, merged, or draft
- PR is trivial/automated (only changelog or dependency bumps)

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

**Inline review comment fetch (PR mode only — skip in local mode):**
Fetch the current PR's own inline review comments (line-level diff threads):
```bash
gh api repos/Skyscanner/backpack/pulls/[NUMBER]/comments --paginate \
  --jq '[.[] | {id:.id, path:.path, line:(.line // .original_line), body:.body, in_reply_to_id:.in_reply_to_id}]'
```
Note: `.line` is `null` for outdated comments (position became stale after a subsequent push).
Fall back to `.original_line` so these threads are still captured in RESOLVED_SET/RAISED_SET.

Group comments into threads by `in_reply_to_id` (top-level = no `in_reply_to_id`; replies share the root's `id`).

Classify each thread into one of two sets:
- **RESOLVED_SET**: thread has at least one reply containing a resolution signal — a commit URL
  (`github.com/Skyscanner/backpack/pull/NNN/commits/` or `github.com/Skyscanner/backpack/commit/`),
  or the words "Done", "Fixed", "Fixed in", "updated in", "addressed in", "resolved"
  (case-insensitive). Record `{path, line, summary}` for each thread.
  If `line` is still `null` after the fallback, record with `line: null` and match by `path` only
  (skip line-range check) — still suppresses the false positive.
- **RAISED_SET**: thread has a top-level comment but NO resolution signal in any reply.
  Record `{path, line, summary}` for each thread.

Store both sets for use in Phase 4.

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
| Agent 5 | `agents/agent5-bugs.md` | Full diff |
| Agent 6 | `agents/agent6-learned.md` | Full diff + Phase 1.5 comments |

**Template variables to fill in for every agent:** `[NUMBER]`, `[SHA]`, `[INSERT LIST]`, `[INSERT]` (PR summary), `[INSERT SCOPED DIFF]`.

**Agents use the pre-fetched diff embedded in their prompt.** They may still use the Read
tool to inspect specific files for deeper context, but must NOT re-fetch the full diff via
`gh pr diff` or `git diff`.

**Each agent returns a JSON array of issues (no confidence score — Phase 3 scores independently):**
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
    "supporting_lines": [{ "file": "...", "startLine": 42, "endLine": 45 }]
  }
]
```

**After aggregation — deduplication:** If two issues share the same `file` AND overlapping
`startLine–endLine` AND similar `title`, merge into one. Keep the more specific `rule_id`;
priority order: constitution > sass-tokens > a11y-testing > history > bug-scan > learned-patterns.

---

## Phase 3: Confidence Scoring

After all agents return and deduplication is done, collect every issue into a single list.

**Scoring dispatch policy:**
- If `len(issues) <= 15`: launch **parallel scoring agents** — one per issue, all in one message.
- If `len(issues) > 15`: score all issues directly in a single pass (no sub-agents).

**Each scoring agent (or the orchestrator in batch mode) receives:**
- The issue title + explanation
- The relevant code snippet from the diff
- The relevant Constitution/decision rule text (if applicable)
- The issue metadata (`rule_id`, `supporting_lines`)

**Scoring prompt:**

> Score this issue 0–100 for confidence that it is a real, actionable issue in this PR:
>
> **Issue:** [TITLE + EXPLANATION]
> **Code:** [RELEVANT SNIPPET]
> **Rule reference:** [CONSTITUTION/DECISION SECTION, if any]
> **Metadata:** [RULE_ID + SUPPORTING_LINES]
>
> Rubric:
> - **0**: False positive, or pre-existing issue not introduced by this PR
> - **25**: Might be real; stylistic, not explicitly required by Constitution/decisions
> - **50**: Real but minor nitpick; unlikely to matter in practice
> - **75**: Verified — Constitution/decisions explicitly requires this; PR contradicts it
> - **100**: Certain — NON-NEGOTIABLE violation (license header, className leak, missing a11y test)
>
> For Constitution issues: verify the rule **verbatim**. If you cannot find it, score 0.
> If the rule exists but violation requires interpretation, score ≤ 50.
> Score ≥ 75 only after reading the exact rule text AND confirming the changed code contradicts it.
>
> For bug issues: verify the bug can actually occur given the surrounding code context.
> For history issues: verify the past feedback is relevant to the current change.
>
> Return ONLY: `{"score": NUMBER, "confidence_explanation": "brief explanation", "rule_id": "string", "supporting_lines": [{"file":"...","startLine":1,"endLine":2}]}`

**False positive patterns — always score 0:**
- Pre-existing issues not introduced in this PR
- Something that looks like a bug but isn't, given context
- Pedantic nitpicks a senior engineer wouldn't flag
- Issues a linter/typechecker would catch

**After scoring**, attach `confidence` and `confidence_explanation` to each issue.

---

## Phase 4: Filter, Format, and Output

**Filter — step 1, confidence:** remove issues with `confidence < threshold`.
Issues with `threshold <= confidence < 90` are human-gated — include them in output with
a "Gate rationale" line showing `confidence_explanation`, and require explicit user
confirmation before posting to GitHub.

**Filter — step 2, RESOLVED_SET (PR mode only):** For each remaining issue, check whether
it matches a RESOLVED_SET thread — same `file` (`path`) AND (thread `line` falls within
`startLine–endLine` of the issue, OR thread `line` is `null` — match by `path` only).
If it matches, **drop the issue entirely** (already caught and fixed by human reviewers in-PR).
Do not report it.

**Filter — step 3, RAISED_SET annotation (PR mode only):** For each remaining issue,
check whether it matches a RAISED_SET thread — same `file`, AND (overlapping line range OR
thread `line` is `null`). If it matches, **keep the issue** but prepend the label:
`⚠️ Already raised in PR discussion — still open.`

**Output differs by mode:**

---

### Local mode output

Print the `### Code review` block to the conversation. No GitHub posting.

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

   [path/file.tsx:42](path/file.tsx#L42)
   [if human-gated] Gate rationale: [confidence_explanation]

🤖 Generated with [Claude Code](https://claude.ai/code)
```

---

### PR mode output

**Conversation:** Print the same `### Code review` block as local mode (for human review),
but links use full SHA permalinks:
`https://github.com/Skyscanner/backpack/blob/[SHA]/[PATH]#L[START]-L[END]`

**Autopost: OFF by default in PR mode.** Post only when user explicitly says "post" / "post to GitHub" / `BACKPACK_REVIEW_AUTOPOST=true`.

Post a single GitHub PR review using the Reviews API (NOT a plain PR comment).
This places each issue as an **inline comment on the relevant diff line**, grouped under one review.

```bash
# Build the payload as a JSON file (required — --field cannot accept JSON arrays)
cat > /tmp/bpk_review_[NUMBER].json << 'ENDJSON'
{
  "commit_id": "[SHA]",
  "event": "COMMENT",
  "body": "### Code review\n\nFound N issues (reviewed by M/6 agents).\n\n🤖 Generated with [Claude Code](https://claude.ai/code)",
  "comments": [
    {
      "path": "packages/bpk-component-foo/src/BpkFoo.tsx",
      "line": 45,
      "start_line": 42,
      "side": "RIGHT",
      "body": "**[Title]** *(recurring pattern)*\n\n[explanation: what, why, fix]\n\n[if human-gated] Gate rationale: [confidence_explanation]"
    }
  ]
}
ENDJSON

gh api repos/Skyscanner/backpack/pulls/[NUMBER]/reviews \
  --method POST \
  --input /tmp/bpk_review_[NUMBER].json \
  --jq '{id: .id, state: .state, html_url: .html_url}'
```

**Inline comment body format** (per issue):
```
**[Title]** [*(recurring pattern)*]

[explanation: (a) what is wrong, (b) why, (c) what to use instead]

[if human-gated] ⚠️ Gate rationale: [confidence_explanation]
[if RAISED_SET match] ⚠️ Already raised in PR discussion — still open.
```

**Line mapping rules:**
- Single-line issue (`startLine == endLine`): set `"line": startLine`, omit `start_line`
- Multi-line issue: set `"start_line": startLine, "line": endLine, "side": "RIGHT"`
- If a line falls outside the PR diff (not a changed line), fall back to the nearest
  changed line in the same file, or skip the inline comment and include that issue only
  in the review body summary instead.

**Human gate:** Issues with `threshold <= confidence < 90` require explicit user confirmation
before the review is posted. Show the full preview (inline comments + review body) and ask
"Post this review? (y/n)". Do not post any part of it until confirmed.

**No partial posting:** Either post all issues as one review, or don't post at all.

---

**Shared output rules (both modes):**
- `*(recurring pattern)*` label for `source: learned-patterns` issues
- Explanation always covers: (a) what is wrong, (b) why, (c) what to use instead
- No strengths section, compliance table, or required-actions checklist

---

## Phase 5: Orchestrator Self-Check (Internal — do not print)

- Check `className`/`style` leakage for new components
- Verify design approval evidence is present and substantive
- Check private token misuse and token semantic-name correctness
- Check license headers on changed source files
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
