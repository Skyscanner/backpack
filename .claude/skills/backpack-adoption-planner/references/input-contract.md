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
| Current Backpack version in use | Which version of `@skyscanner/backpack-web` is installed | Discover from target microsite's `package.json` in Stage 1 |
| Known blockers | Missing Backpack primitives, design gaps | Assume none until discovery |
| Project-specific adoption rules | Engineer-defined overrides to the default Pure Backpack definition | Use default definition |
| Previous adoption attempts | Prior work, removed patterns, or known dead ends | Ask the engineer directly — do not assume none. If prior attempts exist, read them before Stage 2 to avoid repeating known dead ends. |
| Hard deadline or target quarter | Delivery constraint | Assume no deadline |
| Jira project key | For generating Jira-ready output in Stage 9 | Ask at Decision Gate 7 (before Stage 9 begins) |

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
ASSUMPTION: No hard deadline. Sequencing prioritises foundation work first.
ASSUMPTION: Using default Pure Backpack definition — no project-specific overrides provided.
ASSUMPTION: No previous adoption attempts reported. If any exist, they were not provided.
```

---

## Inputs discovered automatically in Stage 1

The following optional inputs are discovered automatically and do not need to be asked:

| Input | How discovered |
|---|---|
| Installed Backpack version | Read from target microsite's `package.json` |
| Component inventory (deprecated / V2 components) | Scanned from Backpack repo `packages/bpk-component-*/` |
| Version gap (upgrade needed) | Cross-reference of installed version vs component inventory |

---

## Partial input handling

The skill can start with partial inputs and refine as discovery proceeds. Some inputs
become available naturally during Stage 1 and Stage 2. When an optional input is discovered
during the workflow, update the working assumptions and note the discovery in the stage output.

---

## Project-specific adoption rule override

If the engineer provides project-specific rules:
1. Read them fully before Stage 2.
2. Compare against `references/pure-backpack-adoption-definition.md`.
3. If any rule conflicts with the default definition, flag the conflict explicitly
   before classifying any components.
4. Get engineer confirmation on which rule takes precedence.
5. Record all overrides in the planning output's assumptions section.

---

## Jira metadata (Stage 9)

Collected at Step 9.0 before any Jira ticket is created.
Do not ask for these earlier — they are not needed until the plan document is ready.

| Field | Required | Default if skipped |
|---|---|---|
| Project key | Yes | Must be provided — no default |
| Labels | No | backpack-adoption |
| Team | No | Omitted from ticket |
| Component | No | Omitted from ticket |
| Priority | No | Medium |
| Fix version | No | Omitted from ticket |
