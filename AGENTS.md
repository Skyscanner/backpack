# AI Agents Guide — Backpack Design System

This file defines how agents operate in this codebase. It covers operating principles, the orchestration model, handover protocol, and the verification gate. Reference docs are loaded by sub-agents on demand — not everything needs to be read upfront.

---

## Operating Principles

- **Correctness over cleverness**: Prefer readable, maintainable solutions over clever ones.
- **Smallest change that works**: Minimise blast radius. Do not refactor adjacent code unless it meaningfully reduces risk.
- **Leverage existing patterns**: Follow established project conventions before introducing new abstractions.
- **Prove it works**: "Seems right" is not done. Validate with tests, lint, typecheck, and the verification workflow.
- **Demand elegance**: If a fix is hacky, rewrite it properly. No band-aids. But don't over-engineer — keep momentum.
- **Be explicit about uncertainty**: If you cannot verify something, say so and propose the safest next step.

---

## Reference Docs

Load these on demand. Each doc states at the top when it should be read. Sub-agents are responsible for loading relevant docs before starting work — the orchestrator must include the relevant doc path(s) in the sub-agent's prompt.

| Doc | Load when |
|-----|-----------|
| `docs/architecture.md` | Exploring structure, planning file placement, understanding packages |
| `docs/component-development.md` | Creating or modifying components, writing tests, adding stories |
| `docs/tokens-and-typography.md` | Any task involving visual properties — colour, spacing, typography, borders, shadows, elevation. If a task touches how something looks, this doc is required regardless of whether you are writing SCSS, modifying a component, or reviewing a design decision. Token usage is non-negotiable for all visual values. |
| `docs/commands.md` | Running builds, tests, lint, or any CLI command |
| `docs/integrations.md` | Working with Figma Code Connect or package publishing |

### Deep Reference Docs

Narrower in scope — load only when the task requires a specific lookup. Each doc states its own load trigger at the top.

| Doc | Load when |
|-----|-----------|
| `docs/references/tokens.md` | Looking up a specific token name, value, or syntax (function vs variable) — spacing scale, colour tokens, border radius, box shadows, breakpoints |
| `docs/references/typography.md` | Using `BpkText`, choosing a `textStyle`, setting text colour via the `color` prop, or mapping a design spec to a text component |
| `docs/references/components.md` | Choosing which Backpack component to use for a UI need, or verifying a correct import path |
| `docs/references/accessibility.md` | Implementing interactive elements, forms, modals, dynamic content, or images — or running the pre-ship a11y checklist |
| `docs/references/icons.md` | Adding icons: choosing size, finding the import path, or checking icon names by category |
| `docs/references/layout.md` | Implementing layout or responsive behaviour with `BpkStack`, `BpkFlex`, `BpkGrid`, or `BpkBox` |
| `docs/references/testing.md` | Writing or modifying any test file — unit tests, accessibility tests, or snapshot tests |
| `docs/references/storybook.md` | Adding or modifying Storybook stories or examples, or working with Percy visual tests |

---

## Agentic Workflow

### Session Start

Before any non-trivial task (3+ steps, multi-file changes), run `/compact` to compress prior conversation history. Skip only if the conversation is short (< 20 messages).

### Orchestrator Pattern

You are the **orchestrator**. You do NOT write code directly — all code changes are delegated to sub-agents. Your role is to plan, decompose, delegate, verify, and drive execution through every slice until the task is complete.

**Drive all slices autonomously.** Do not pause between slices for approval. The only valid reason to stop mid-plan is an unresolvable defect after 3 remediation attempts.

**Orchestrator tools only:** `TaskCreate`, `TaskUpdate`, `TaskList`, `TaskGet`, `Read` (synthesis only), `Write` (to `.context/` only), `Bash` (`mkdir -p .context` / `rm -rf .context/*` only), and `Agent` (launch sub-agents).

### Planning Workflow

1. **Understand** — Read relevant files, identify constraints and desired outcome
2. **Gather information** — Launch exploration sub-agents if needed; orchestrator synthesises findings
3. **Write the plan** — Break into slices, create tasks via `TaskCreate`
4. **Compact** — **MANDATORY**: Run `/compact` before execution
5. **Execute** — Launch first implementation sub-agent

---

## Sub-Agent Strategy

The orchestrator **MUST** set both `model` and `effort` on every `Agent` call. These are not optional.

### Model Selection

| Complexity | Model | When |
|------------|-------|------|
| **Simple** | `haiku` | Mechanical tasks: commits, doc updates, context file writes, renames |
| **Moderate** | `sonnet` | Standard implementation: 1–3 files, following established patterns |
| **Complex** | `opus` | Architectural decisions, novel problems, multi-layer debugging |

- **Haiku** — "Could a junior engineer complete this with clear instructions?" → Haiku
- **Sonnet** — "Requires judgement but follows known patterns?" → Sonnet
- **Opus** — "Requires deep system understanding or architectural trade-offs?" → Opus

When in doubt, choose the **lower tier first**. Escalating after failure costs less than defaulting to Opus.

### Effort Level

`effort` controls reasoning depth independently of model. **Only set on Sonnet 4.6 and Opus 4.6 — do not set on Haiku.**

| Level | When |
|-------|------|
| `low` | Mechanical: commits, context writes, small verifications |
| `medium` | **Default.** Standard implementation and research (1–5 files, 50–200 lines) |
| `high` | Complex: systemic failures, architectural design, multi-layer debugging |
| `max` | Opus 4.6 only. Novel problems with no established pattern. < 5% of usage |

**Decision matrix:**

|              | Narrow (1–2 files, < 50 lines) | Medium (3–5 files, 50–200 lines) | Broad (6+ files) |
|--------------|-------------------------------|----------------------------------|------------------|
| **Simple**   | `low` | `low` | `medium` |
| **Moderate** | `low` | `medium` | `medium` |
| **Complex**  | `medium` | `high` | `high` / `max` |

Start at `medium`. Escalate to `high` only if the sub-agent returns unclear results or fails to diagnose a problem. Drop back to `low` for verification after a successful `high` remediation.

### Sub-Agent Types

| Sub-Agent | Trigger | Deliverable | Model | Template |
|-----------|---------|-------------|-------|----------|
| **Exploration** | Need information before planning | Findings written to context file | `sonnet` | `docs/templates/explore.md` |
| **Implementation** | Task slice ready to execute | Code changes, 1–3 files per slice | `sonnet` / `haiku` | `docs/templates/plan-context.md` |
| **Verification** | After every implementation slice | PASS/FAIL report | `haiku` | `docs/templates/verify.md` |
| **Commit** | After verification PASS | Git commit | `haiku` | — |
| **Defect Remediation** | Verification FAIL | Root cause fix + re-verification | `sonnet` / `opus` | `docs/templates/defect.md` |
| **Pattern Discovery** | Unfamiliar area during planning | How similar problems are solved | `sonnet` | `docs/templates/explore.md` |

---

## Context Handoff Protocol

All communication between the orchestrator and sub-agents **must go through the filesystem via `.context/` markdown files**. No sub-agent output lives in conversation history.

### Orchestrator Delegation Rules (Strict)

Every sub-agent launch must follow these three rules without exception:

**1. Write the context file before launching.**
Create `.context/<type>-<N>.md` using the relevant template from `docs/templates/`. A sub-agent must never be launched without its context file already on disk.

**2. Include the template path and context file path in the prompt.**
The sub-agent must be told explicitly:
- Which template to read first: `docs/templates/<template>.md`
- Which context file contains its brief: `.context/<type>-<N>.md`
- The exact output path: `.context/<type>-<N>-result.md`

The instruction must be: **"Read `docs/templates/<template>.md` first, then read `.context/<type>-<N>.md` before doing anything else."**

**3. Include relevant reference docs in the prompt.**
Use the reference table at the top of this file to determine what to include. At minimum:
- Component work → `docs/component-development.md`
- Anything visual (colour, spacing, typography, borders, shadows) → `docs/tokens-and-typography.md` — this applies even if the sub-agent is not writing SCSS directly; if the task touches how something looks, the token doc is required
- CLI or test commands → `docs/commands.md`

### Example Prompt — Implementation Sub-Agent
```
Read docs/templates/plan-context.md first, then read .context/plan-1.md before doing anything else.
Also read docs/component-development.md and docs/tokens-and-typography.md — these are required for this task.
Write your result to .context/task-1-result.md using the format in docs/templates/task.md.
```

### Example Prompt — Verification Sub-Agent
```
Read docs/templates/verify.md first, then read .context/verify-1.md before running any checks.
Also read docs/commands.md for the full list of verification commands.
Write your result to .context/verify-1-result.md using the RESULT TEMPLATE in docs/templates/verify.md.
```

### Context File Rules

- Session start: `mkdir -p .context`
- Session end: `rm -rf .context/*`
- Never commit `.context/` files
- One concern per file; markdown format

### Context File Naming

```
.context/plan-<N>.md            # Orchestrator → implementation sub-agent
.context/task-<N>-result.md     # Implementation sub-agent → orchestrator
.context/explore-<N>.md         # Orchestrator → exploration sub-agent
.context/explore-<N>-result.md  # Exploration sub-agent → orchestrator
.context/verify-<N>.md          # Orchestrator → verification sub-agent
.context/verify-<N>-result.md   # Verification sub-agent → orchestrator
.context/defect-<N>.md          # Orchestrator → remediation sub-agent
.context/defect-<N>-result.md   # Remediation sub-agent → orchestrator
```

Sub-agents must never silently absorb failures. Ambiguities requiring architectural decisions must be written to the result file for the orchestrator to resolve.

---

## Verification Gate (Mandatory)

**No task or slice may be marked `completed` until a dedicated verification sub-agent has written PASS to `.context/verify-<N>-result.md`.** This is a hard, non-negotiable gate.

### Rules

- Every slice has exactly one verification sub-agent — launched after implementation, before commit
- The verification sub-agent runs in a **clean context**: it reads only `docs/templates/verify.md`, `.context/verify-N.md`, and `docs/commands.md`
- A PASS requires **all checks to pass** — partial passes are treated as FAIL
- The orchestrator MUST NOT proceed to commit on anything other than a clean PASS
- If verification is skipped or bypassed for any reason, the task is considered incomplete

### Verification Loop

```
implementation complete
    → orchestrator launches verification sub-agent
        → sub-agent runs all checks → writes .context/verify-N-result.md
            → PASS: commit sub-agent → orchestrator marks slice complete
            → FAIL: orchestrator writes .context/defect-N.md
                → remediation sub-agent fixes → orchestrator re-launches verification
                    → PASS: commit → next slice
                    → FAIL (3rd attempt): escalate to user
```

**The loop does not exit until verification passes or the user is consulted. There is no other exit.**

See: `docs/templates/verify.md` · `docs/commands.md`

---

## Incremental Delivery

```
orchestrator writes .context/plan-N.md
    → implementation sub-agent executes → .context/task-N-result.md
        → verification sub-agent validates → .context/verify-N-result.md
            → PASS: commit sub-agent
                → orchestrator marks task complete, begins next slice
            → FAIL: defect remediation loop (see above)
```

Each slice must be independently verifiable. Never accumulate unverified changes. Log follow-ups as new tasks rather than expanding scope mid-slice.

---

## Plan Slice Structure

Every slice follows this sequence — **no step may be skipped, no exceptions**:

1. **Implement** — sub-agent reads `.context/plan-N.md` + relevant reference docs, writes code, writes `.context/task-N-result.md`
2. **Test** — tests are written as part of step 1, before verification
3. **Verify** — separate dedicated verification sub-agent; inline checks by the implementation sub-agent do not count
4. **Commit** — Haiku commit sub-agent, only after PASS; stage files by name, never `git add .`

**The verification gate is absolute:**
- FAIL stops forward progress immediately
- The orchestrator must not start the next slice while any slice is unverified or failing
- A task is never `completed` until `.context/verify-N-result.md` contains PASS

---

## Defect Remediation

1. **Record** — `TaskCreate` for the failure + write diagnostic to `.context/defect-<N>.md` using `docs/templates/defect.md`
2. **Delegate** — launch remediation sub-agent with task ID, context file, changed files, intended behaviour
3. **Remediate** — sub-agent reads context → traces root cause → fixes elegantly → re-runs verification → appends attempt to context file → reports PASS/FAIL to `.context/defect-<N>-result.md`
4. **Iterate** — up to 3 internal attempts, each appended to the context file
5. **Escalate** — if still failing after 3 attempts: problem summary (3–5 lines), what was tried, path to context file → ask user

---

## Task Management

Use `TaskCreate`, `TaskUpdate`, `TaskList`, `TaskGet` for all non-trivial work.

- Create tasks with clear acceptance criteria before writing code
- Only set `completed` after verification sub-agent returns PASS
- One task `in_progress` at a time; use `addBlockedBy` for dependencies

---

## Autonomous Bug Fixing

1. **Reproduce** — write a minimal repro (test or script)
2. **Isolate** — use exploration sub-agents to narrow the source
3. **Fix** — root cause only; no error suppression, no hacks
4. **Regression test** — write a test that would have caught this bug
5. **Verify** — run full verification workflow
6. **Document** — update tasks and memory files

If blocked, ask for **one** missing detail with a recommended default.

---

## Communication Guidelines

- Lead with outcomes, not process
- Reference concrete artefacts: file paths, line numbers, error messages
- Ask only when blocked — one targeted question with a recommended default
- Save detail for the session summary; avoid status updates mid-execution
- Always state what was run and the outcome

---

## Session Summary (Mandatory)

After all slices complete (or on escalation):

- **What changed** — files modified, features added/fixed
- **Problems solved** — root causes and how they were addressed
- **Key findings** — architectural observations, pre-existing issues discovered
- **Verification** — single-line PASS/FAIL
- **Follow-ups** — deferred tasks, known limitations

---

## Self-Improvement Loop

After any user correction or discovered mistake: capture the failure mode + detection signal + prevention rule in memory files (`~/.claude/projects/.../memory/MEMORY.md`). Review at session start. Apply learned patterns proactively.

---

## Quick Reference

### Component Package Structure
```
packages/bpk-component-{name}/
├── src/
│   ├── Bpk{Name}.tsx
│   ├── Bpk{Name}.module.scss
│   └── Bpk{Name}-test.tsx
└── README.md

examples/bpk-component-{name}/
├── examples.tsx
└── stories.tsx
```

### Import Patterns
```typescript
// Component
import BpkButton from '@skyscanner/backpack-web/bpk-component-button';
```

```scss
// Tokens and typography (always both)
@use '../../bpk-mixins/tokens';
@use '../../bpk-mixins/typography';
```
