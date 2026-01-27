# M2: Project Structure Confirmation

**Priority**: P1 (Critical Path)
**Est. Effort**: Low
**Complexity**: Small
**Status**: Required

## Overview

Define and align on a target project hierarchy that integrates well with Platform Engineering standards and enables proper dependency graph analysis.

## Why This Milestone?

### Strategic Context

Before moving any code, we need a clear destination structure. This milestone is primarily **planning and alignment**, not implementation. The decisions made here affect every subsequent milestone.

### Why We Need Each Step

| Step | Why It's Needed |
|------|-----------------|
| Create draft structure document | Documents the mapping from current ~92 component folders to target locations; serves as the source of truth for migration |
| Align with PE and web-enablement | Ensures the structure complies with TypeScript Monorepo Production Standard and won't need to be re-done later |
| Consider internal reorganization | Decides whether components' internal folder structure (e.g., V2 subdirectories) should also change |
| Update configurations | Jest, Storybook, GitHub Actions all reference file paths - they must be updated together to avoid broken builds |

### What Happens If We Skip This?

Without structure confirmation:
- Teams may disagree on where files should live, causing rework
- Structure may not comply with Production Standard, requiring future refactoring
- Dependency graph analysis may be inaccurate
- Other milestones will lack a clear target state

### Current vs Target Structure

**Current**:
```
packages/
├── bpk-component-button/
├── bpk-component-card/
├── bpk-mixins/
├── bpk-stylesheets/
└── ... (~92 packages)
examples/
├── bpk-component-button/
│   └── stories.tsx
└── ...
```

**Target** (to be confirmed):
```
packages/
├── bpk-component-button/
│   ├── src/
│   │   ├── BpkButton/
│   │   └── stories.tsx  (colocated)
│   ├── project.json     (Nx project config)
│   └── tsconfig.*.json  (TypeScript configs)
└── ...
```

---

## User Story

As a Backpack architect, I want to define and align on a target project hierarchy so that the migration has a clear destination structure that integrates well with Platform Engineering standards and enables proper dependency graph analysis.

---

## Acceptance Scenarios

1. **Given** the current Backpack structure, **When** a draft structure document is created, **Then** it maps all ~92 component folders to their target locations

2. **Given** the draft structure, **When** reviewed by PE and web-enablement teams, **Then** alignment is confirmed

3. **Given** alignment is confirmed, **When** folder reorganization begins, **Then** the changes follow the approved structure exactly

4. **Given** folders are moved, **When** GitHub Actions, Jest config, and Storybook entries are updated, **Then** all automation works with new paths

---

## Verification Criteria

- [ ] Draft project structure document exists and is approved
- [ ] Structure aligns with TypeScript Monorepo Production Standard
- [ ] All component folders mapped to target locations
- [ ] CI pipeline passes after folder moves
- [ ] Storybook builds successfully with new structure
- [ ] No changes to consumer import paths (`@skyscanner/backpack-web/...`)

---

## Deliverables

1. **Project Structure Document**: A detailed mapping of current → target locations
2. **Configuration Updates**: Changes to Jest, Storybook, GitHub Actions
3. **Migration Script** (optional): Automated tooling to move files consistently

---

## Key Decisions Required

| Decision | Options | Recommendation |
|----------|---------|----------------|
| Keep `packages/` as root? | Yes / Move to `libs/` | Keep `packages/` to minimize consumer impact |
| Internal component structure? | Keep as-is / Standardize | Defer to M3/M4 |
| Handle `bpk-mixins` differently? | Same as components / Special case | Special case (shared utilities) |

---

## Risks to Monitor

| Risk | Impact | Mitigation |
|------|--------|------------|
| Disagreement on structure | Delays all subsequent milestones | Schedule alignment meeting early; document decisions |
| Consumer import path changes | **Breaking change** | Verify import paths are preserved via build output |
| Configuration drift | Some tools work, others fail | Test all configurations together in single PR |

---

## Rollback Plan

If structure is approved but implementation fails:
1. Revert file moves via `git revert`
2. Revert configuration changes
3. Revisit structure document with lessons learned

---

## Dependencies

- M1: Nx Initialization (Nx must be installed to use `nx workspace:move`)

## Blocks

- M3: Storybook Colocation (needs target locations defined)
- M4: Components as Nx Projects (needs final structure)
