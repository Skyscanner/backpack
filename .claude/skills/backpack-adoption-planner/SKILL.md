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
version: 2.0.0
date: 2026-04-17
---

# Backpack Adoption Planner

## Purpose

Guide an engineer through planning a Backpack adoption effort in a microsite or product repo,
from an empty starting point to a plan document and optional Jira tickets, with validated scope,
epic breakdown, story sizing, and risk register.

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

## How to start (for engineers)

### Invoke the skill

Type `/backpack-adoption-planner` in Claude Code to start. Claude will ask for the two required inputs:
1. The repo name or local path of the target microsite
2. Your adoption goal

**Minimal starting prompt:**
```
/backpack-adoption-planner
```

Claude will ask for what it needs. You do not need to prepare anything in advance.

**Or, include the context upfront to skip the questions:**
```
/backpack-adoption-planner

Repo: carhire-homepage
Goal: Migrate all layout patterns on the homepage and results page to Backpack primitives.
       Reach full Pure Backpack coverage on those two pages.
```

**If you have a specific page scope or known constraints, add them:**
```
/backpack-adoption-planner

Repo: flights-web (local path: ~/workspace/flights-web)
Goal: Reach 80% Pure Backpack coverage on the search results page.
Pages in scope: /results only — not the homepage or booking flow.
Known blocker: BpkCardV2 requires @skyscanner/backpack-web v44, currently on v43.
```

### What happens after you start

1. Claude reads your repo and builds a Backpack component inventory.
2. It presents a scope summary — correct anything that looks wrong.
3. It scans the repo and shows all findings. You review and confirm.
4. It validates scope, proposes a breakdown strategy, and builds epics and stories.
5. After your final review, it delivers a plan document (inline or to Confluence).
6. Optional: create Jira tickets from the plan.

The whole workflow is gated — Claude stops at each key decision point and waits for your input before continuing.

---

## How to run (Claude execution reference)

### Step 1 — Collect inputs and build Backpack inventory

Read [references/input-contract.md](references/input-contract.md).

Ask the engineer for **required inputs** first. Accept partial inputs and proceed with documented
assumptions for anything missing. Never block on optional inputs.

Minimum to start:
- Repo name or path
- Adoption goal (full coverage, specific pages, specific component types)

Then, as part of Stage 1 intake:
1. Read the target microsite's `package.json` to find the installed `@skyscanner/backpack-web` version.
2. Scan `packages/bpk-component-*/` in the Backpack repo to build a component inventory map
   (component → latest recommended version → migration path).
3. Cross-reference installed version against the inventory to surface any version gap blockers.

**Soft gate** — present the scope summary and inventory highlights to the engineer.
Continue unless the engineer corrects something. Do not hard-stop.

### Step 2 — Scope discovery

Analyze the repo using the component inventory map from Step 1:
- Map pages, routes, entry points
- Identify layout patterns, CSS override patterns, raw HTML elements (non-pure)
- Identify outdated Backpack component usage (e.g. BpkCard where BpkCardV2 is the current API)
- Find non-pure Backpack usage per [references/pure-backpack-adoption-definition.md](references/pure-backpack-adoption-definition.md)

Record every finding using the Finding Record format (component, pattern, classification,
migration target, rationale, epic). These findings travel into the plan document so reviewers
can trace the reasoning.

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
- If a version upgrade is required, record it as a hard blocker

Produce a validated migration scope.

**Review gate** — stop. Present validated scope. Ask engineer to confirm before breakdown.

### Step 4 — Breakdown strategy

Read [references/breakdown-rules.md](references/breakdown-rules.md).

Propose a breakdown strategy. Classify work as:
- Foundation (shared primitives, layout wrappers, tokens)
- Feature/page (specific pages or user-facing components)
- Enabler/blocker (tooling, infra, team dependencies, version upgrades)

If a Backpack version upgrade is a blocker, it must appear as an Enabler/Blocker epic —
never folded into a feature epic.

Ask the engineer to confirm the strategy before building epics.

### Step 5 — Epic planning

Build epics per breakdown strategy. Write scope in/out and dependencies for each epic.
Back-fill the epic mapping into the finding records from Step 2.

Follow [references/jira-output-format.md](references/jira-output-format.md) for formatting.

**Review gate** — stop. Present epic plan. Ask engineer to confirm groupings and scope
before breaking into stories.
See [references/review-gates.md](references/review-gates.md) for what to ask.

### Step 6 — Story breakdown and estimation

Break each confirmed epic into stories. Estimate rough story size. Aggregate to rough epic size.

Follow [references/estimation-guidance.md](references/estimation-guidance.md) for sizing.

**Review gate** — stop. Present full epic/story draft with sizing. Invite final corrections.
Apply minor corrections inline. For major corrections, route back to the appropriate stage.
See [references/review-gates.md](references/review-gates.md) for the Minor/Major correction split.

### Step 7 — Deliver plan document

Ask the engineer where to deliver the plan document:
- **Mode A**: Output inline in the conversation
- **Mode B**: Provide a Confluence space key or parent page URL — create via MCP
  (`confluence_create_page`). Prepend a TL;DR section when using Mode B.

Produce the plan document using [references/final-delivery-template.md](references/final-delivery-template.md).
See [references/output-contract.md](references/output-contract.md) for required sections.

Then ask: generate Jira tickets now, or review the plan with the team first?

### Step 8 — Jira ticket creation (optional)

If the engineer wants to create tickets now:
1. Collect Jira ticket metadata — project key (required); labels, team, component, priority,
   fix version (optional, see [references/jira-output-format.md](references/jira-output-format.md)).
2. Ask ticket scope: epics only, or epics + stories?
3. Create tickets via MCP (`mcp__mcp-atlassian__jira_create_issue`) if available.
   If MCP is unavailable, output as formatted tables.

If the engineer wants to review first: end the session. Step 8 can be triggered in a new
session by providing the plan document and requesting Jira output.

## Key behaviors

- **Never auto-continue** across a hard review gate without engineer confirmation.
- **Gate 1 is soft** — present Stage 1 output and continue. Only pause if the engineer corrects.
- **Always generate a draft first**, then validate — do not treat the first draft as final.
- **Record all findings** — every scope item must have a classification, migration target, and
  rationale. These appear in the plan document for reviewer traceability.
- **Flag overrides**: if the engineer's project-specific rules differ from the default
  adoption definition, call out the difference explicitly.
- **Document assumptions**: every assumption must be named and recorded in the output.
- **Prioritize delivery orientation**: structure work around deliverable units, not file locations.
- **Correction tiers**: at the final review gate, distinguish minor corrections (apply inline,
  proceed to plan document) from major corrections (route back to the appropriate stage).
- **This skill is repo-agnostic** — do not hardcode assumptions about any specific repo.
