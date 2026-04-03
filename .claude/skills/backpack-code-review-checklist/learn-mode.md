# Learn Mode

Triggered by: `/backpack-code-review-checklist learn [--limit N] [--component COMP]`

Defaults: `--limit 40`, all components. This mode does NOT perform a PR review.
It mines recent merged PRs, identifies recurring review patterns not yet in the agent
prompt files, and proposes edits. All writes require explicit user confirmation.

## Step A — Fetch Recent Merged PRs

```bash
gh pr list \
  --repo Skyscanner/backpack \
  --state merged \
  --limit [N] \
  --json number,title,mergedAt,files
```

If `--component COMP` is specified, filter to PRs touching `packages/bpk-component-[COMP]/`.

For each PR, fetch review comments:
```bash
gh pr view [NUMBER] \
  --repo Skyscanner/backpack \
  --json reviews,comments,reviewThreads
```

Collect text from `reviews[].body`, `comments[].body`, and inline diff-thread comments
(`reviewThreads[].comments[].body`).

## Step B — Cluster Recurring Comments

Launch a single analysis agent with all collected comment text:

> You are analysing Backpack PR review comments to extract recurring rules.
>
> **Raw comments from [N] merged PRs:**
> [INSERT ALL COMMENT TEXT]
>
> **Task:**
> 1. Group semantically similar review comments together.
> 2. For each group with ≥ 3 occurrences, extract:
>    - A concise rule (what the reviewer was enforcing)
>    - Which agent domain it belongs to (constitution/sass-tokens/a11y-testing/history/bug-scan/new)
>    - 2-3 representative verbatim quotes
>    - Confidence that it's a real, stable rule (vs. reviewer opinion): HIGH/MEDIUM/LOW
> 3. Ignore: one-off comments, personal opinions, merge conflicts, CI noise.
>
> Output as JSON:
> ```json
> [
>   {
>     "rule": "One-sentence rule statement",
>     "domain": "constitution|sass-tokens|a11y-testing|history|bug-scan|new",
>     "occurrences": 5,
>     "examples": ["verbatim quote 1", "verbatim quote 2"],
>     "confidence": "HIGH|MEDIUM|LOW"
>   }
> ]
> ```

## Step C — Diff Against Current Agent Files

Read each file in the `agents/` directory. For each extracted rule (confidence = HIGH or MEDIUM):
- Check whether the rule is already covered in the relevant agent file.
- If covered: discard.
- If NOT covered: mark as a candidate addition.

## Step D — Output Proposed Additions

Present candidates as a markdown diff grouped by agent file:

```
## Proposed rule additions (based on [N] merged PRs, [DATE])

### agents/agent1-constitution.md
+ - **[Rule title]**: [Rule description]. (Seen in [X] PRs — e.g. "quote")

### agents/agent2-sass.md
+ - **[Rule title]**: [Rule description]. (Seen in [X] PRs)

### New rules (consider adding to agents/agent5-bugs.md or a new agent file)
+ - **[Rule title]**: [Rule description]. (Seen in [X] PRs)
```

LOW confidence candidates are listed separately under `## Low-confidence candidates (review manually)`.

## Step E — Write Patch on Confirmation

Ask the user:
> Apply these additions? Reply: `yes` (all HIGH+MEDIUM), `no`, or `select N,M` (specific items only).

On confirmation, use the Edit tool to insert the approved rules into the relevant
files in `agents/`.

Also update `SKILL.md`: increment the version number in the heading line
(`# Backpack Code Review — Multi-Agent Orchestrator (vX.Y.Z)`) and prepend
to the changelog comment block:
```
- v[NEW]: Learned [X] rules from [N] recent PRs (learn mode, [DATE]).
```
