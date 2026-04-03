---
name: backpack-adoption-planner
description: |
  Interactive planning workflow for Backpack design system adoption in a microsite or product repo.
  Use when: (1) Starting Backpack adoption work in a repo with no existing migration plan,
  (2) Discovering scope of non-pure Backpack patterns across a codebase,
  (3) Building an epic/story breakdown for adoption work,
  (4) Producing a Jira-ready planning pack for a Backpack adoption sprint or quarter.
  NOT a one-shot generator — runs as a guided, review-gated workflow.
author: Claude Code
version: 1.0.0
date: 2026-04-03
---

# Backpack Adoption Planner

## Purpose

Guide an engineer through planning a Backpack adoption effort in a microsite or product repo,
from an empty starting point to a Jira-ready planning pack with validated scope, epic breakdown,
story sizing, and risk register.

The skill generates a draft plan first, then validates and refines it — it does not assume the
first draft is correct.

## When to invoke

- Starting adoption work in a repo with no existing migration plan
- Scoping a Backpack adoption quarter or sprint
- Producing delivery-oriented work breakdown for adoption coverage

## Reference files

| Topic | File |
|---|---|
| What counts as Pure Backpack | [references/pure-backpack-adoption-definition.md](references/pure-backpack-adoption-definition.md) |
| Stage-by-stage workflow | [references/workflow.md](references/workflow.md) |
| Required and optional inputs | [references/input-contract.md](references/input-contract.md) |
| Expected outputs per stage | [references/output-contract.md](references/output-contract.md) |
| How to break down work | [references/breakdown-rules.md](references/breakdown-rules.md) |
| Where to pause for review | [references/review-gates.md](references/review-gates.md) |
| Jira epic/story format | [references/jira-output-format.md](references/jira-output-format.md) |
| How to estimate and express confidence | [references/estimation-guidance.md](references/estimation-guidance.md) |
| Final delivery pack template | [references/final-delivery-template.md](references/final-delivery-template.md) |

## How to run

### Step 1 — Collect inputs

Read [references/input-contract.md](references/input-contract.md).

Ask the engineer for **required inputs** first. Accept partial inputs and proceed with documented
assumptions for anything missing. Never block on optional inputs.

Minimum to start:
- Repo name or path
- Adoption goal (full coverage, specific pages, specific component types)

### Step 2 — Scope discovery

Analyze the repo:
- Map pages, routes, entry points
- Identify layout patterns, CSS override patterns, raw HTML elements
- Find non-pure Backpack usage per [references/pure-backpack-adoption-definition.md](references/pure-backpack-adoption-definition.md)

If the engineer has provided project-specific adoption rules, read them and note any
conflicts with the default definition. Flag all conflicts explicitly before continuing.

Produce a draft migration scope and draft migration plan hypothesis.

**Review gate** — stop here. Present findings and draft scope to the engineer.
See [references/review-gates.md](references/review-gates.md) for what to ask.

### Step 3 — Validate and refine scope

After the engineer confirms or corrects the draft scope:
- Remove false positives
- Clarify borderline items
- Map dependencies between components and pages
- Identify blockers and risks

Produce a validated migration scope.

**Review gate** — stop. Present validated scope. Ask engineer to confirm before breakdown.

### Step 4 — Breakdown strategy

Read [references/breakdown-rules.md](references/breakdown-rules.md).

Propose a breakdown strategy. Classify work as:
- Foundation (shared primitives, layout wrappers, tokens)
- Feature/page (specific pages or user-facing components)
- Enabler/blocker (tooling, infra, team dependencies)

Ask the engineer to confirm the strategy before building epics.

### Step 5 — Epic and story planning

Build epics per breakdown strategy. For each epic, break into stories.
Estimate rough story size. Aggregate to rough epic size.

Follow [references/jira-output-format.md](references/jira-output-format.md) for formatting.
Follow [references/estimation-guidance.md](references/estimation-guidance.md) for sizing.

**Review gate** — stop. Present full epic/story draft. Invite corrections.

### Step 6 — Deliver planning pack

Incorporate engineer corrections. Produce the final planning pack using
[references/final-delivery-template.md](references/final-delivery-template.md).

See [references/output-contract.md](references/output-contract.md) for required sections.

## Key behaviors

- **Never auto-continue** across a review gate without engineer confirmation.
- **Always generate a draft first**, then validate — do not treat the first draft as final.
- **Flag overrides**: if the engineer's project-specific rules differ from the default
  adoption definition, call out the difference explicitly.
- **Document assumptions**: every assumption must be named and recorded in the output.
- **Prioritize delivery orientation**: structure work around deliverable units, not file locations.
- **This skill is repo-agnostic** — do not hardcode assumptions about any specific repo.
