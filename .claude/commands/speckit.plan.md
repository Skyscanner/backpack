---
description: Execute the implementation planning workflow using the plan template to generate design artifacts.
handoffs: 
  - label: Create Tasks
    agent: speckit.tasks
    prompt: Break the plan into tasks
    send: true
  - label: Create Checklist
    agent: speckit.checklist
    prompt: Create a checklist for the following domain...
---

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Outline

1. **Setup**: Run `.specify/scripts/bash/setup-plan.sh --json` from repo root and parse JSON for FEATURE_SPEC, IMPL_PLAN, SPECS_DIR, BRANCH. For single quotes in args like "I'm Groot", use escape syntax: e.g 'I'\''m Groot' (or double-quote if possible: "I'm Groot").

2. **Load context**: Read FEATURE_SPEC and `.specify/memory/constitution.md` (Backpack Design System constitution with 9 core principles). Load IMPL_PLAN template (already copied).

3. **Execute plan workflow for Backpack components**: Follow the structure in IMPL_PLAN template to:
   - Fill Technical Context (React 18.3.1, TypeScript 5.9.2, Jest 30, Webpack 5 - pre-filled for Backpack)
   - Fill Constitution Check section from constitution (includes Modern Sass, Accessibility-First, etc.)
   - Evaluate gates - ERROR if violations unjustified (e.g., using `@import` instead of `@use`, using `px` instead of `rem`)
   - Phase 0: Generate research.md (survey existing Backpack components, review Sass mixins, study testing patterns, review Figma designs, check `decisions/` directory)
   - Phase 1: Generate api-design.md (component props interface, TypeScript types), styling-guide.md (BEM classes, Sass imports, design token mapping, RTL support), examples/ (basic usage, variants, edge cases)
   - Phase 1: Update agent context by running the agent script
   - Re-evaluate Constitution Check post-design

4. **Stop and report**: Command ends after Phase 2 planning. Report branch, IMPL_PLAN path, and generated artifacts.

## Phases

### Phase 0: Outline & Research for Backpack Components

1. **Extract unknowns from Technical Context** above:
   - For each NEEDS CLARIFICATION → research task
   - For each dependency → check if Backpack has built-in solution
   - For each integration → review existing Backpack patterns

2. **Generate and dispatch research agents** (specific to Backpack):

   ```text
   For each unknown in Technical Context:
     Task: "Research {unknown} in existing Backpack components"
   For similar components:
     Task: "Review {similar component} in packages/ for patterns"
   For styling approach:
     Task: "Review Sass mixins in packages/bpk-mixins/"
   For testing patterns:
     Task: "Review test files in similar components"
   For accessibility:
     Task: "Review accessibility-test.tsx patterns"
   For architecture decisions:
     Task: "Check decisions/ directory for {relevant topic}.md"
   ```

3. **Consolidate findings** in `research.md` using format:
   - Decision: [what was chosen]
   - Rationale: [why chosen - must align with Backpack constitution]
   - Alternatives considered: [what else evaluated]
   - Architecture Decision Reference: [link to relevant decisions/*.md file]

**Output**: research.md with all NEEDS CLARIFICATION resolved and aligned with Backpack standards

### Phase 1: Design & Contracts for Backpack Components

**Prerequisites:** `research.md` complete

1. **Component API Design** from component spec → `api-design.md`:
   - Component props interface (TypeScript)
   - Prop types, defaults, descriptions
   - Event handlers (onClick, onChange, etc.)
   - Sub-component composition (if applicable)
   - Theme attributes (if themeable)

2. **Styling Design** → `styling-guide.md`:
   - BEM class structure with `bpk-` prefix
   - Sass imports (granular from `bpk-mixins`)
   - Design token mapping (spacing, colors, typography)
   - Responsive behavior
   - RTL support strategy

3. **Code Examples** → `examples/` directory:
   - basic-usage.tsx
   - variants.tsx
   - edge-cases.tsx
   - interactive-states.tsx
   - accessibility.tsx

4. **Agent context update**:
   - Run `.specify/scripts/bash/update-agent-context.sh claude`
   - These scripts detect which AI agent is in use
   - Update the appropriate agent-specific context file
   - Add only new technology from current plan
   - Preserve manual additions between markers

**Output**: api-design.md, styling-guide.md, examples/, agent-specific file

## Key rules

- Use absolute paths
- ERROR on gate failures or unresolved clarifications
