# Input Contract

## Required inputs

These must be collected before Stage 2 (Scope Discovery) begins.
If missing, ask the engineer directly. Do not proceed without them.

| Input | Description | How to collect |
|---|---|---|
| Repo identifier | Name or local path of the target repo | Ask the engineer |
| Adoption goal | What the engineer wants to achieve (e.g. "migrate all layout patterns", "reach 80% pure coverage on homepage") | Ask the engineer |

---

## Optional inputs (helpful but not blocking)

These improve plan quality if available. If not provided, proceed with documented assumptions.

| Input | Description | Default assumption if missing |
|---|---|---|
| Specific pages or routes in scope | Which pages or sections to include | Assume full repo scope |
| Current Backpack version in use | Which version of `@skyscanner/backpack-web` is installed | Discover from `package.json` |
| Team size | Number of engineers working on adoption | Assume 1–2 engineers |
| Sprint cadence | Sprint length in weeks | Assume 2-week sprints |
| Existing component inventory | Known list of custom components | Discover from repo scan |
| Known blockers | Missing Backpack primitives, design gaps | Assume none until discovery |
| Project-specific adoption rules | Engineer-defined overrides to the default Pure Backpack definition | Use default definition |
| Previous adoption attempts | Prior work, removed patterns, or known dead ends | Assume none |
| Hard deadline or target quarter | Delivery constraint | Assume no deadline |
| Jira project key | For generating Jira-ready output | Ask before Stage 8 |

---

## What to do when inputs are missing

### For required inputs
Ask the engineer directly. Use clear, closed questions:

```
I need two things to start:
1. What is the name or path of the target repo?
2. What is the adoption goal? (e.g. migrate all layout patterns on the homepage,
   reach 80% pure Backpack coverage, specific pages only)
```

Do not make up required inputs or infer them from context alone.

### For optional inputs
Document the assumption, proceed, and make the assumption visible in outputs.

Example assumption statement:
```
ASSUMPTION: Team size assumed to be 1–2 engineers. If larger, estimates may compress.
ASSUMPTION: No hard deadline. Sequencing prioritises foundation work first.
ASSUMPTION: Using default Pure Backpack definition — no project-specific overrides provided.
```

---

## Partial input handling

The skill can start with partial inputs and refine as discovery proceeds. Some inputs
become available naturally during Stage 2 (e.g. current Backpack version from `package.json`).

When an optional input is discovered during the workflow, update the working assumptions
and note the discovery in the stage output.

---

## Project-specific adoption rule override

If the engineer provides project-specific rules:
1. Read them fully before Stage 2.
2. Compare against `references/pure-backpack-adoption-definition.md`.
3. If any rule conflicts with the default definition, flag the conflict explicitly
   before classifying any components.
4. Get engineer confirmation on which rule takes precedence.
5. Record all overrides in the planning output's assumptions section.
