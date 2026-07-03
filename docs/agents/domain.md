# Domain Docs

How the engineering skills should consume this repo's domain documentation when exploring the codebase.

## Before exploring, read these

- **`CONTEXT.md`** at the repo root (if it exists)
- **`decisions/`** at the repo root — read any decision files that touch the area you're about to work in

If any of these files don't exist, **proceed silently**. Don't flag their absence; don't suggest creating them upfront. The `/domain-modeling` skill creates them lazily when terms or decisions actually get resolved.

## File structure

Single-context repo — one shared context for the whole monorepo:

```
/
├── CONTEXT.md
├── decisions/
│   ├── versioning-rules.md
│   ├── composable-component-conventions.md
│   └── ...
└── packages/
```

## Use the glossary's vocabulary

When your output names a domain concept (in an issue title, a refactor proposal, a hypothesis, a test name), use the term as defined in `CONTEXT.md`. Don't drift to synonyms the glossary explicitly avoids.

If the concept you need isn't in the glossary yet, that's a signal — either you're inventing language the project doesn't use (reconsider) or there's a real gap (note it for `/domain-modeling`).

## Flag decision conflicts

If your output contradicts an existing file in `decisions/`, surface it explicitly rather than silently overriding:

> _Contradicts decisions/versioning-rules.md — but worth reopening because…_
