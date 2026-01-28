# Nx Migration Milestones

This folder contains detailed specifications for each migration milestone.

## Milestone Overview

| # | Milestone | Priority | Status | Est. Effort |
|---|-----------|----------|--------|-------------|
| [M1](./M1-nx-initialization.md) | Nx Initialization | P1 | Required | Very Low |
| [M2](./M2-project-structure.md) | Project Structure Confirmation | P1 | Required | Low |
| [M3](./M3-storybook-colocation.md) | Storybook Colocation | P2 | Required | Very Low |
| [M4](./M4-components-as-projects.md) | Components as Nx Projects | P2 | Required | Very Low |
| [M5](./M5-static-checks.md) | Static Checks via Nx | P2 | Required | Low |
| [M6](./M6-module-boundaries.md) | Module Boundaries | P3 | Required | Low |
| [M7](./M7-nx-release.md) | Publishing with Nx | P3 | ⚠️ Optional | Medium |
| [M8](./M8-dependency-management.md) | Dependency Management | P3 | ⚠️ Optional | Medium |
| [M9](./M9-vite-adoption.md) | Vite Adoption | P4 | ⚠️ Optional (Future) | Medium |
| [M10](./M10-vitest-adoption.md) | Vitest Adoption | P4 | ⚠️ Optional (Future) | Low |

## Dependency Graph

```
M1: Nx Initialization
    │
    ├──▶ M2: Project Structure Confirmation
    │        │
    │        └──▶ M3: Storybook Colocation
    │                  │
    └─────────────────▶│
                       ▼
               M4: Components as Nx Projects
                       │
                       ▼
               M5: Static Checks via Nx
                       │
                       ├──▶ M6: Module Boundaries
                       │
                       ├──▶ M7: Publishing with Nx (Optional)
                       │
                       ├──▶ M8: Dependency Management (Optional)
                       │
                       └──▶ M9: Vite Adoption (Optional)
                                  │
                                  └──▶ M10: Vitest Adoption (Optional)
```

## Milestone Categories

### 🎯 Core Migration (M1-M6)

These milestones deliver the primary value of Nx adoption:
- Incremental builds and caching
- Affected command for faster CI
- Module boundary enforcement

**Estimated effort**: 8-10 weeks

### ⚡ Optional Enhancements (M7-M10)

These milestones provide additional benefits but can be deferred:
- `nx release` for automated versioning/publishing (M7)
- Production Standard compliance for dependencies (M8)
- Vite/Vitest for improved DX (M9-M10)

**Estimated effort**: 10-14 additional weeks

## Quick Reference

### Required Milestones (M1-M6)

| Milestone | Key Question | Verification |
|-----------|--------------|--------------|
| M1 | Is Nx installed? | `nx graph` works |
| M2 | Is structure approved? | Document signed off |
| M3 | Are stories colocated? | `npm run storybook` works |
| M4 | Are components projects? | `nx show projects` lists all |
| M5 | Do tasks run via Nx? | `nx affected --target=test` works |
| M6 | Are boundaries enforced? | Invalid import fails lint |

### Optional Milestones (M7-M10)

| Milestone | Key Question | When to Do |
|-----------|--------------|------------|
| M7 | Want automated releases? | Production Standard requires it |
| M8 | Need per-package deps? | Production Standard audit requires it |
| M9 | Want faster builds? | Developer feedback requests it |
| M10 | Want faster tests? | After M9 is complete |

## Reading Each Milestone

Each milestone file contains:

1. **Overview**: What the milestone achieves
2. **Why This Milestone**: Strategic context and step-by-step rationale
3. **User Story**: From whose perspective and why
4. **Acceptance Scenarios**: Given/When/Then format
5. **Verification Criteria**: Checklist to confirm completion
6. **Risks**: What could go wrong and how to mitigate
7. **Rollback Plan**: How to undo if needed
8. **Dependencies/Blocks**: Relationship to other milestones
