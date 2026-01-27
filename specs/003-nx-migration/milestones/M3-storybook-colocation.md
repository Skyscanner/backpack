# M3: Storybook Colocation

**Priority**: P2
**Est. Effort**: Very Low
**Complexity**: Small
**Status**: Required

## Overview

Move Storybook stories from the separate `examples/` directory to live alongside their respective components in `packages/`.

## Why This Milestone?

### Strategic Context

Currently, Backpack stories live in a separate `examples/` directory, disconnected from the components they document. This creates several problems:

- **Discoverability**: Developers must look in two places to understand a component
- **Maintenance**: Stories can become outdated without developers noticing
- **Nx Analysis**: Nx cannot accurately track story dependencies when they're in a separate tree

### Why We Need Each Step

| Step | Why It's Needed |
|------|-----------------|
| Move `.stories.tsx` files | Places documentation next to implementation, following modern Storybook best practices |
| Update Storybook config | `main.ts` must be told where to find stories - currently looks in `examples/`, must look in `packages/` |
| Verify all stories render | Ensures no stories are lost or broken during the move |
| Evaluate `examples/` folder | Once empty, the folder can be removed to avoid confusion |

### What Happens If We Skip This?

Without colocation:
- Nx's project dependency analysis will be less accurate
- Stories may be forgotten when components are updated
- Developer experience remains fragmented
- Future Storybook-related Nx features (like story-level caching) won't work optimally

### Industry Standard

Colocation is the recommended pattern in:
- [Storybook Component Story Format (CSF)](https://storybook.js.org/docs/react/api/csf)
- [Nx React Tutorial](https://nx.dev/react-tutorial)
- Most modern React component libraries

---

## User Story

As a Backpack developer, I want Storybook stories to live alongside their components so that documentation and examples are easier to find and maintain.

---

## Acceptance Scenarios

1. **Given** stories in `examples/bpk-component-*/`, **When** stories are moved, **Then** they live in `packages/bpk-component-*/src/`

2. **Given** stories are colocated, **When** Storybook config is updated, **Then** `main.ts` loads stories from new locations

3. **Given** stories are colocated, **When** `npm run storybook` is executed, **Then** all stories render correctly

4. **Given** the migration is complete, **When** the `examples/` folder is evaluated, **Then** it can be removed or repurposed

---

## Verification Criteria

- [ ] All stories moved to component directories
- [ ] Storybook configuration updated
- [ ] `npm run storybook` builds without errors
- [ ] All stories visible and functional in Storybook UI
- [ ] CI Storybook deployment works

---

## Migration Pattern

**Before**:
```
examples/
└── bpk-component-button/
    ├── stories.tsx
    └── examples.tsx
packages/
└── bpk-component-button/
    └── src/
        └── BpkButton/
            └── BpkButton.tsx
```

**After**:
```
packages/
└── bpk-component-button/
    └── src/
        ├── BpkButton/
        │   └── BpkButton.tsx
        ├── stories.tsx      ← moved here
        └── examples.tsx     ← moved here
```

---

## Storybook Config Changes

**Current** (`.storybook/main.ts`):
```ts
stories: ['../examples/**/stories.@(ts|tsx|js|jsx)']
```

**After**:
```ts
stories: ['../packages/**/src/**/*.stories.@(ts|tsx|js|jsx)']
```

---

## Risks to Monitor

| Risk | Impact | Mitigation |
|------|--------|------------|
| Story import paths break | Stories fail to render | Update relative imports during move |
| Missing stories | Documentation gaps | Compare story count before/after move |
| Storybook build fails | CI deployment broken | Test locally before merging |

---

## Rollback Plan

If issues arise:
1. Revert file moves
2. Restore original Storybook config
3. Stories return to `examples/`

---

## Dependencies

- M1: Nx Initialization
- M2: Project Structure Confirmation (target locations must be known)

## Blocks

- M4: Components as Nx Projects (stories should be colocated before project.json is added)
