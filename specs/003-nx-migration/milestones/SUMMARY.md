# Nx Migration Summary

**Project**: Backpack Web Nx Adoption
**Branch**: `003-nx-migration`
**Last Updated**: 2026-01-27

---

## Executive Summary

This migration adopts Nx in the Backpack Web repository to enable:

1. **Incremental builds** - Only rebuild what changed
2. **Computation caching** - Skip work that's already been done
3. **Affected commands** - Run tasks only on changed projects
4. **Module boundaries** - Enforce architectural rules

**Total Milestones**: 10 (6 required + 4 optional)
**Estimated Effort**: 8-10 weeks (core) + 10-14 weeks (optional)

---

## Milestone Overview

| # | Name | Priority | Status | Effort | Complexity |
|---|------|----------|--------|--------|------------|
| M1 | [Nx Initialization](./M1-nx-initialization.md) | P1 | Required | Very Low | Small |
| M2 | [Project Structure](./M2-project-structure.md) | P1 | Required | Low | Small |
| M3 | [Storybook Colocation](./M3-storybook-colocation.md) | P2 | Required | Very Low | Small |
| M4 | [Components as Projects](./M4-components-as-projects.md) | P2 | Required | Very Low | Small |
| M5 | [Static Checks via Nx](./M5-static-checks.md) | P2 | Required | Low | Small |
| M6 | [Module Boundaries](./M6-module-boundaries.md) | P3 | Required | Low | Small |
| M7 | [Publishing with Nx](./M7-nx-release.md) | P3 | ⚠️ Optional | Medium | Medium |
| M8 | [Dependency Management](./M8-dependency-management.md) | P3 | ⚠️ Optional | Medium | Medium |
| M9 | [Vite Adoption](./M9-vite-adoption.md) | P4 | ⚠️ Optional | Medium | Medium |
| M10 | [Vitest Adoption](./M10-vitest-adoption.md) | P4 | ⚠️ Optional | Low | Small |

---

## Dependency Graph

### Visual Diagram

```
                              ┌─────────────────────────────────────────────────────┐
                              │                                                     │
                              ▼                                                     │
┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐               │
│       M1         │───▶│       M2         │───▶│       M3         │               │
│ Nx Initialization│    │ Project Structure│    │ Storybook Coloc. │               │
│     (P1)         │    │     (P1)         │    │     (P2)         │               │
└──────────────────┘    └──────────────────┘    └──────────────────┘               │
        │                                               │                           │
        │                                               ▼                           │
        │                                      ┌──────────────────┐                 │
        └─────────────────────────────────────▶│       M4         │◀────────────────┘
                                               │ Components as    │
                                               │   Projects (P2)  │
                                               └──────────────────┘
                                                       │
                                                       ▼
                                               ┌──────────────────┐
                                               │       M5         │
                                               │ Static Checks    │
                                               │     (P2)         │
                                               └──────────────────┘
                                                       │
                         ┌─────────────┬───────────────┼───────────────┬─────────────┐
                         ▼             ▼               ▼               ▼             │
                  ┌──────────┐  ┌──────────┐    ┌──────────┐    ┌──────────┐         │
                  │    M6    │  │    M7    │    │    M8    │    │    M9    │         │
                  │ Boundar. │  │nx release│    │ Dep Mgmt │    │   Vite   │         │
                  │   (P3)   │  │(P3, Opt) │    │(P3, Opt) │    │(P4, Opt) │         │
                  └──────────┘  └──────────┘    └──────────┘    └──────────┘         │
                                                                      │              │
                                                                      ▼              │
                                                               ┌──────────┐          │
                                                               │   M10    │          │
                                                               │  Vitest  │          │
                                                               │(P4, Opt) │          │
                                                               └──────────┘          │
```

### Dependency Matrix

| Milestone | Depends On | Blocks | Can Run After |
|-----------|------------|--------|---------------|
| **M1** | - | M2, M3, M4, M5, M6, M7, M8, M9, M10 | - |
| **M2** | M1 | M3, M4 | M1 |
| **M3** | M1, M2 | M4 (recommended) | M2 |
| **M4** | M1, M3 (recommended) | M5, M6, M7, M8, M9, M10 | M3 |
| **M5** | M1, M4 | M6, M7, M8, M9 | M4 |
| **M6** | M4, M5 | - | M5 |
| **M7** | M1, M5 (recommended) | - | M5 |
| **M8** | M4, M5 | - | M5 |
| **M9** | M5 | M10 | M5 |
| **M10** | M9 | - | M9 |

### Detailed Dependencies

#### M1: Nx Initialization
- **Depends on**: Nothing (this is the foundation)
- **Blocks**: Everything else
- **Why**: Nx must be installed before any Nx features can be used

#### M2: Project Structure Confirmation
- **Depends on**: M1 (Nx init)
- **Blocks**: M3, M4
- **Why**: Must know target locations before moving files

#### M3: Storybook Colocation
- **Depends on**: M1, M2
- **Blocks**: M4 (recommended)
- **Why**: Stories should be colocated before creating project.json files

#### M4: Components as Nx Projects
- **Depends on**: M1, M3 (recommended)
- **Blocks**: M5, M6, M7, M8, M9, M10
- **Why**: Projects must be registered before tasks can be defined

#### M5: Static Checks via Nx
- **Depends on**: M1, M4
- **Blocks**: M6, M7, M8, M9
- **Why**: Lint/test targets need registered projects

#### M6: Module Boundaries
- **Depends on**: M4, M5
- **Blocks**: Nothing
- **Why**: Needs projects with tags and working lint infrastructure

#### M7: Publishing with Nx (Optional)
- **Depends on**: M1, M5 (recommended)
- **Blocks**: Nothing
- **Why**: `nx release` requires Nx; works better after static checks

#### M8: Dependency Management (Optional)
- **Depends on**: M4, M5
- **Blocks**: Nothing
- **Why**: Needs project structure and lint infrastructure

#### M9: Vite Adoption (Optional)
- **Depends on**: M5
- **Blocks**: M10
- **Why**: Build infrastructure should be stable first

#### M10: Vitest Adoption (Optional)
- **Depends on**: M9
- **Blocks**: Nothing
- **Why**: Vitest shares configuration with Vite

---

## Critical Path

### Minimum Path for Core Benefits

```
M1 → M2 → M3 → M4 → M5 → M6
```

**What you get**:
- ✅ `nx affected` for incremental CI
- ✅ Computation caching
- ✅ Module boundary enforcement
- ✅ Dependency graph visualization

**Estimated time**: 8-10 weeks

### Full Path (All Optional Milestones)

```
M1 → M2 → M3 → M4 → M5 → M6 + M7 + M8 + M9 → M10
```

**Additional benefits**:
- ✅ Automated versioning with `nx release`
- ✅ Production Standard compliance
- ✅ Vite for faster builds
- ✅ Vitest for faster tests

**Estimated time**: 18-24 weeks

---

## Parallel Execution Opportunities

After completing M5, these milestones can be worked on **in parallel**:

| Track | Milestones | Focus |
|-------|------------|-------|
| Architecture | M6 | Module boundaries |
| Release | M7 | Automated publishing |
| Dependencies | M8 | Production Standard |
| Build Tooling | M9 → M10 | Vite + Vitest |

---

## Quick Decision Guide

### "I want faster CI"
→ Complete M1 → M4 → M5 (affected + caching)

### "I want module boundary enforcement"
→ Complete M1 → M4 → M5 → M6

### "I want automated releases"
→ Complete M1 → M5 → M7

### "I want Production Standard compliance"
→ Complete M1 → M4 → M5 → M7 + M8

### "I want modern build tooling"
→ Complete M1 → M5 → M9 → M10

---

## Risk Summary

| Milestone | Key Risk | Mitigation |
|-----------|----------|------------|
| M1 | Peer dependency conflicts | Test in isolated branch |
| M2 | Structure disagreement | Get approval before implementation |
| M3 | Broken story imports | Test Storybook locally first |
| M4 | TypeScript composite issues | Start with composite disabled |
| M5 | Cache invalidation problems | Verify cache inputs thoroughly |
| M6 | Existing violations | Audit imports before enabling rules |
| M7 | Broken releases | Use `--dry-run` extensively |
| M8 | Missing dependencies | Thorough import auditing |
| M9 | Output differences | Artifact comparison testing |
| M10 | Test failures | Gradual migration, keep Jest as fallback |

---

## References

- [Main Specification](../spec.md)
- [Confluence One-Pager](https://skyscanner.atlassian.net/wiki/spaces/Clover/pages/1430062432)
- [Nx Documentation](https://nx.dev/docs/getting-started/start-with-existing-project)
- [JPD Link](https://skyscanner.atlassian.net/browse/UP-341)
