---
name: backpack-code-review-checklist
description: Self-improving multi-agent review orchestrator for Backpack component PRs. Runs 6 parallel specialist agents (including a learned-patterns agent that mines past PR comments), then confidence-scores findings. Use for PR review, Constitution compliance checks, and pre-merge validation. Run with "learn" to mine recent PRs and auto-update checklist rules.
---

# Backpack Code Review — Multi-Agent Orchestrator (v3.1.3)

<!-- Changelog
- v3.1.3: Fix Phase 1.5 broken gh command (reviewThreads is not a valid gh pr view JSON field —
  replace with gh api REST calls); remove unconditional Phase 1.5 skip for all-new files —
  new components are highest-risk for anti-patterns, widen mining scope instead;
  Agent 6 now always launches when Phase 1.5 completes (not gated on comment count).
- v3.1.2: Phase 3 scoring agents now explicitly use model: haiku — scoring is a classification
  task with a fixed rubric and no tool calls; Haiku is sufficient and ~12x cheaper than Sonnet.
- v3.1.1: Add formal observations tier — issues with confidence 60–(threshold-1) surface in
  conversation as "Below-threshold observations" (not blocking, never posted to GitHub).
  Removes reliance on model self-initiative for below-threshold findings.
- v3.1.0: Revert to v2.1 self-fetch architecture — agents fetch their own scoped diffs;
  Phase 1.5 uses two-level parallelism (parallel component subagents + parallel PR view calls);
  Agents 1–5 launch immediately after Phase 1 without waiting for Phase 1.5;
  Agent 6 launches separately when Phase 1.5 completes.
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
Phase 1    Metadata + RESOLVED/RAISED_SET  ┐ run in parallel; Phase 1.5
Phase 1.5  Mine learned patterns           ┘ uses parallel tool calls internally, no nested subagents
Phase 2a   Launch Agents 1–5 immediately after Phase 1 (no wait for Phase 1.5)
Phase 2b   Launch Agent 6 when Phase 1.5 completes (if applicable)
Phase 3    Independent confidence scoring — after ALL agents finish
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

### Phase 1: Metadata + Review Thread Collection

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

Always run as a single background subagent using parallel tool calls internally — no nested subagents.
When dispatching, pass the changed file list (newline-separated full paths) from Phase 0.

**Step 1 — parallel `gh pr list` calls (one per component, all in one message):**
Extract component names from changed paths (max 3).
- **Normal case** (≤70% brand-new files): search by component name — finds PRs for the same component:
  ```bash
  gh pr list --repo Skyscanner/backpack --state merged --limit 5 \
    --search "[COMPONENT_NAME]" --json number,title,mergedAt
  ```
- **All-new-files case** (>70% brand-new): widen the query to recent PRs generally, because new component
  authors are the highest-risk group for anti-patterns they haven't seen yet. Search a broader set:
  ```bash
  gh pr list --repo Skyscanner/backpack --state merged --limit 20 \
    --search "bpk-component" --json number,title,mergedAt
  ```

**Step 2 — parallel `gh api` calls (all PRs across all components, all in one message):**
Collect every PR number returned from Step 1 (up to 15 total). For each PR, issue two parallel calls — one for
PR-level comments and one for inline diff comments — all in a single message:
```bash
# PR-level (issue) comments — includes review summaries
gh api repos/Skyscanner/backpack/issues/[N]/comments --paginate \
  --jq '[.[].body]'

# Inline diff comments — line-level review threads
gh api repos/Skyscanner/backpack/pulls/[N]/comments --paginate \
  --jq '[.[].body]'
```
Collect and concatenate all returned body strings into raw comment text.

Pass combined raw comment text to Agent 6 as `[INSERT RAW COMMENT TEXT]`.
Always launch Agent 6 when Phase 1.5 completes, even if few comments were found — Agent 6 handles empty input gracefully.

---

## Phase 2: Launch Agents in Parallel

### Phase 2a — Launch Agents 1–5 immediately after Phase 1

Do not wait for Phase 1.5. Dispatch in a single message as soon as Phase 1 is complete.

| Agent | Prompt file | Launch when | Self-fetched scope |
|-------|-------------|-------------|--------------------|
| Agent 1 | `agents/agent1-constitution.md` | Always | TSX/TS |
| Agent 2 | `agents/agent2-sass.md` | `.scss` files in changed list | SCSS |
| Agent 3 | `agents/agent3-a11y.md` | Always | TSX/TS |
| Agent 4 | `agents/agent4-history.md` | Files exist on `main` | Full diff |
| Agent 5 | `agents/agent5-bugs.md` | Always | Full diff |

### Phase 2b — Launch Agent 6 when Phase 1.5 completes

| Agent | Prompt file | Launch when | Self-fetched scope |
|-------|-------------|-------------|--------------------|
| Agent 6 | `agents/agent6-learned.md` | Always (after Phase 1.5) | Full diff |

Always launch Agent 6 after Phase 1.5 completes. Agent 6 handles the case where no historical comments were found by returning `[]`.

---

**Template variables to fill in for every agent:** `[NUMBER]`, `[SHA]`, `[INSERT LIST]`, `[INSERT]` (PR summary).
Agent 6 additionally receives `[INSERT RAW COMMENT TEXT]` from Phase 1.5.

**Each agent self-fetches its own scoped diff** using the commands documented in its prompt.
Agents may also use the Read tool for deeper file inspection.

**Wait for all running agents (1–5, and 6 if launched) to complete before starting Phase 3.**

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
- If `len(issues) <= 15`: launch **parallel scoring agents** — one per issue, all in one message, using `model: haiku`. Scoring is a classification task with an explicit rubric; it does not require tool calls or complex reasoning.
- If `len(issues) > 15`: score all issues directly in a single orchestrator pass (no sub-agents).
  Use the same scoring prompt below, but wrap all issues in one request:
  > Score each issue 0–100 using the rubric below. Return a JSON array:
  > `[{"index": 0, "score": N, "confidence_explanation": "...", "rule_id": "...", "supporting_lines": [...]}]`
  > Issues: [LIST ALL ISSUES WITH TITLE, EXPLANATION, CODE SNIPPET, RULE REFERENCE]

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

**Filter — step 1, confidence:** split issues into three buckets:
- `confidence >= threshold` → **blocking issues** — go through steps 2–3 and into output
- `60 <= confidence < threshold` → **observations** — skip steps 2–3; conversation-only, never posted to GitHub
- `confidence < 60` → **drop** — false positive or noise

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

**If no issues and no observations:**
```markdown
### Code review

No issues found. Checked by N/6 agents (Constitution, Sass, A11y, History, Bug Scanner, Learned Patterns).
[Note any failed agents]

🤖 Generated with [Claude Code](https://claude.ai/code)
```

**If issues found (with optional observations appended):**
```markdown
### Code review

Found N issues (reviewed by M/6 agents, filtered by confidence scoring):
[Note any failed agents]

1. [Title] *(recurring pattern)* — [explanation: what, why, fix. Link to codebase precedent if one exists.]

   [path/file.tsx:42](path/file.tsx#L42)
   [if human-gated] Gate rationale: [confidence_explanation]

[if observations exist]
Below-threshold observations (confidence 60–(threshold-1), not blocking):

- **[Title]** (score: N) — [one-line explanation: what, why]
  [path/file.tsx:42](path/file.tsx#L42)

🤖 Generated with [Claude Code](https://claude.ai/code)
```

**If no issues but observations exist:**
```markdown
### Code review

No issues met the threshold. Checked by N/6 agents (Constitution, Sass, A11y, History, Bug Scanner, Learned Patterns).
[Note any failed agents]

Below-threshold observations (confidence 60–(threshold-1), not blocking):

- **[Title]** (score: N) — [one-line explanation: what, why]
  [path/file.tsx:42](path/file.tsx#L42)

🤖 Generated with [Claude Code](https://claude.ai/code)
```

---

### PR mode output

**Conversation:** Print the same `### Code review` block as local mode (for human review),
but links use full SHA permalinks:
`https://github.com/Skyscanner/backpack/blob/[SHA]/[PATH]#L[START]-L[END]`

Observations (if any) appear in the conversation block only — they are **never included in the GitHub payload**.

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
