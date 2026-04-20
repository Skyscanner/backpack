---
name: compare-skill
description: >
  Compare two versions of a skill against the same PR to evaluate whether an update improves
  coverage, precision, or recall. Spawns two isolated agents (one per branch), has them run the
  skill independently, then facilitates a structured debate before synthesising a final verdict.
  Usage: /compare-skill <skill-name> <pr-number> branch-a=<branch> branch-b=<branch>
  Example: /compare-skill backpack-code-review-checklist 4322 branch-a=main branch-b=improve-review
---

# compare-skill — Skill A/B Evaluator

Compares **two branch versions of a skill** against the same PR.
Each branch is checked out in its own isolated git worktree so agents never conflict.
Agents run, debate, and the lead delivers a verdict.

## Invocation Format

```
/compare-skill <skill-name> <pr-number> [branch-a=main] branch-b=<feature-branch>
```

- `skill-name`   — matches a directory under `.claude/skills/`
- `pr-number`    — integer, assumes `Skyscanner/backpack` repo (override with `repo=owner/name`)
- `branch-a`     — defaults to `main` if omitted
- `branch-b`     — **required**; the branch carrying the skill update under test

---

## Execution Flow

```
Phase 0   Parse args + validate skill exists on both branches
Phase 1   Create isolated git worktrees for branch-a and branch-b
Phase 2   Create TeamCreate + spawn Agent A and Agent B in parallel
          Each agent: reads SKILL.md from its worktree, runs the skill against the PR
Phase 3   Exchange + debate
          A → B: findings; B → A: findings
          Each agent identifies what the other missed / over-flagged
Phase 4   TeamDelete + clean up worktrees
Phase 5   Lead synthesises final comparison table + verdict
```

---

## Phase 0: Parse + Validate

Extract from the invocation message:
- `SKILL_NAME`, `PR_NUMBER`, `BRANCH_A` (default `main`), `BRANCH_B`, `REPO` (default `Skyscanner/backpack`)

Validate:
```bash
# Skill exists on branch-a
git show ${BRANCH_A}:.claude/skills/${SKILL_NAME}/SKILL.md > /dev/null 2>&1 \
  || echo "ERROR: skill '${SKILL_NAME}' not found on ${BRANCH_A}"

# Skill exists on branch-b
git show ${BRANCH_B}:.claude/skills/${SKILL_NAME}/SKILL.md > /dev/null 2>&1 \
  || echo "ERROR: skill '${SKILL_NAME}' not found on ${BRANCH_B}"
```

Stop and report if either check fails.

---

## Phase 1: Create Isolated Worktrees

Run both commands in parallel (single message, two Bash calls):

```bash
# Worktree A
WORKTREE_A=$(mktemp -d /tmp/compare-skill-a-XXXX)
git worktree add "$WORKTREE_A" ${BRANCH_A}
echo $WORKTREE_A
```

```bash
# Worktree B
WORKTREE_B=$(mktemp -d /tmp/compare-skill-b-XXXX)
git worktree add "$WORKTREE_B" ${BRANCH_B}
echo $WORKTREE_B
```

Store `WORKTREE_A` and `WORKTREE_B` paths for use in Phase 2 agent prompts and Phase 4 cleanup.

---

## Phase 2: Create Team + Spawn Agents

**Create team:**
```
TeamCreate: { team_name: "compare-skill-run" }
```

**Spawn both agents in the same message (parallel):**

### Agent A prompt template

```
You are Agent A in a skill comparison experiment.

CONTEXT
- Skill under test : ${SKILL_NAME}
- PR under review  : https://github.com/${REPO}/pull/${PR_NUMBER}
- Your branch      : ${BRANCH_A}
- Your worktree    : ${WORKTREE_A}

TASK
1. Read the skill definition:
   cat ${WORKTREE_A}/.claude/skills/${SKILL_NAME}/SKILL.md
   (If the skill has additional files in an agents/ subdirectory, read those too.)

2. Execute the skill against the PR exactly as the skill instructs. Use the real
   `gh` CLI, read real files — do not simulate or hallucinate output.

3. Collect your findings as a structured list:
   - Each finding: severity (critical/major/minor/observation), file:line, description, confidence 0–100

4. When done, send your findings as a plain-text message to agent-b.
   Format: numbered list, one finding per line with severity and confidence inline.
   Then stop and wait.

PROGRESS REPORTING (required — send to team-lead after each step):
- After step 1: "Phase 1 complete: read skill definition (vX.X)"
- After collecting PR metadata: "Phase 1 complete: PR #N — N files changed. [2-sentence summary of what the PR does]"
- If the skill spawns sub-agents (Phase 2): send one message per sub-agent as it returns:
  "Sub-agent [name] returned: N findings — [brief titles or 'none']"
- After confidence scoring: "Phase 3 complete: N issues scored, N passed threshold"
- When sending final findings to agent-b: "Phase complete: sent N findings to agent-b"

These check-ins let the team-lead monitor progress without polling. Send them as plain
text messages to team-lead — do not wait until everything is done.
```

### Agent B prompt template

```
You are Agent B in a skill comparison experiment.

CONTEXT
- Skill under test : ${SKILL_NAME}
- PR under review  : https://github.com/${REPO}/pull/${PR_NUMBER}
- Your branch      : ${BRANCH_B}
- Your worktree    : ${WORKTREE_B}

TASK — Part 1 (run immediately, do not wait for Agent A):
1. Read the skill definition:
   cat ${WORKTREE_B}/.claude/skills/${SKILL_NAME}/SKILL.md
   (If the skill has additional files in an agents/ subdirectory, read those too.)

2. Execute the skill against the PR exactly as the skill instructs. Use the real
   `gh` CLI, read real files — do not simulate or hallucinate output.

3. Collect your findings as a structured list:
   - Each finding: severity (critical/major/minor/observation), file:line, description, confidence 0–100

TASK — Part 2 (after receiving Agent A's message):
4. Compare Agent A's findings with yours. For each finding:
   - In A only: did you miss it? If so, is it valid? Why did your version miss it?
   - In B only: did A miss it? Why might the other approach have missed it?
   - In both: do confidence scores differ significantly? Why?

5. Send a structured message to team-lead with:
   A) Your own findings list
   B) Findings A raised that B missed — with your assessment (valid / false positive)
   C) Findings B raised that A missed — with your assessment (valid / false positive)
   D) Findings where both agreed — list briefly

PROGRESS REPORTING (required — send to team-lead after each step):
- After step 1: "Phase 1 complete: read skill definition (vX.X)"
- After collecting PR metadata: "Phase 1 complete: PR #N — N files changed. [2-sentence summary of what the PR does]"
- If the skill spawns sub-agents (Phase 2): send one message per sub-agent as it returns:
  "Sub-agent [name] returned: N findings — [brief titles or 'none']"
- After confidence scoring: "Phase 3 complete: N issues scored, N passed threshold"
- When Part 1 is done: "Part 1 complete: N findings collected — waiting for agent-a"
- When comparison is done: send final report to team-lead

These check-ins let the team-lead monitor progress without polling. Send them as plain
text messages to team-lead — do not wait until everything is done.
```

---

## Phase 3: Monitor Progress + Receive Reports

Both agents send check-in messages throughout execution. The lead should expect:

**From Agent A and Agent B (interleaved as work progresses):**
- Phase 1 complete: skill version read
- Phase 1 complete: PR metadata + summary
- Sub-agent [name] returned: N findings (one per specialist agent, as each completes)
- Phase 3 complete: N issues scored
- Final: "sent N findings to agent-b" (Agent A) / "Part 1 complete" (Agent B)

**The lead does not need to respond to check-ins** — they are informational only.
Acknowledge progress to the user when check-ins arrive (e.g. "Agent A: Phase 2 in progress — Constitution agent returned 2 findings").

**Final report** arrives from `agent-b` after it completes the cross-comparison.
No further orchestration needed — Agent B handles the full debate internally in Part 2.

---

## Phase 4: Cleanup

Run both in parallel after receiving Agent B's final message:

```bash
git worktree remove --force ${WORKTREE_A}
```

```bash
git worktree remove --force ${WORKTREE_B}
```

Then:
```
TeamDelete
```

---

## Phase 5: Synthesise — Final Comparison Table

Present the output in this format:

---

### Skill Comparison: `${SKILL_NAME}`
**Branch A (`${BRANCH_A}`) vs Branch B (`${BRANCH_B}`)** — PR #${PR_NUMBER}

#### Finding Comparison

| # | Issue | Branch A | Branch B | Verdict |
|---|-------|----------|----------|---------|
| 1 | _description_ | ✅ found (conf N) | ❌ missed | Valid — A wins |
| 2 | _description_ | ❌ missed | ✅ found (conf N) | Valid — B wins |
| 3 | _description_ | ✅ found (conf N) | ✅ found (conf N) | Both correct |
| 4 | _description_ | ✅ found (conf N) | ✅ found (conf N, higher/lower) | Confidence delta |
| 5 | _description_ | ⚠️ false positive | ❌ not raised | A over-flagged |

#### Summary Metrics

| Metric | Branch A (`${BRANCH_A}`) | Branch B (`${BRANCH_B}`) |
|--------|--------------------------|--------------------------|
| Total findings | N | N |
| Unique findings (not in other) | N | N |
| False positives identified | N | N |
| Average confidence | N | N |

#### Verdict

**Winner**: `${BRANCH_A}` / `${BRANCH_B}` / **Tie**

Reasoning: _2–3 sentences on which version performed better and why. Call out if the update
introduced regressions (more false positives) even if it also added new valid findings._

#### Recommendation

- [ ] Merge `${BRANCH_B}` — improvement is clear
- [ ] Revise `${BRANCH_B}` — good signal, but false positives need addressing
- [ ] Do not merge — `${BRANCH_B}` regresses vs `${BRANCH_A}`

---

## Notes for the Lead

- If Agent A or B times out or errors, report what was received and note the failure clearly.
- Do not fabricate findings. If an agent returned no output, say so.
- The worktrees are temporary — if cleanup fails, remind the user to run
  `git worktree list` and `git worktree remove --force <path>` manually.
- The "debate" is asymmetric: Agent B does the cross-comparison. This is intentional —
  it avoids an infinite message loop while still producing a structured diff of approaches.
