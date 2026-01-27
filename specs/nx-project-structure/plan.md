<!--
==============================================================================
DOCUMENT PURPOSE: Design HOW to implement spec.md requirements (Implementation)
==============================================================================

This plan describes the technical solution for implementing project structure
reorganization as part of the Nx migration. This is an infrastructure/tooling
feature, not a UI component.

FOCUS: HOW
- How to document the structure mapping
- How to verify Nx compatibility
- How to update configurations
==============================================================================
-->

# Implementation Plan: Project Structure Reorganization

**Branch**: `WOODPECKER-4040` | **Date**: 2026-01-27 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/nx-project-structure/spec.md`
**Type**: Infrastructure/Tooling (not UI component)

## Summary

Implement project structure confirmation and documentation for Nx migration milestone 2, with forward planning for future Banana monorepo integration. The core deliverables are: (1) a structure mapping document covering all 91 packages with future Banana target locations, (2) verification that `nx graph` works correctly with current structure, and (3) configuration updates if needed for Nx compatibility.

**Key Decisions**:
- Current structure: Flat - packages remain under `packages/` (no immediate changes)
- Future Banana target: `libs/shared/universal/backpack/` - as a sub-library under universal
- Organization: Single Nx project, preserving internal `bpk-*` folder structure

## Banana Merge Context

This milestone prepares Backpack for future integration into the Banana monorepo.

### Target Location in Banana

```
banana/
├── libs/
│   └── shared/
│       ├── universal/
│       │   ├── ui/components/         # Existing universal components
│       │   ├── ui/error-boundary/     # Existing error boundary
│       │   ├── backpack/              # ← Backpack target location
│       │   │   ├── src/
│       │   │   │   ├── bpk-component-*/
│       │   │   │   ├── bpk-mixins/
│       │   │   │   ├── bpk-react-utils/
│       │   │   │   └── ...
│       │   │   ├── project.json
│       │   │   ├── package.json
│       │   │   └── tsconfig.json
│       │   └── ...
│       ├── banana/
│       └── acorn/
```

### Banana Integration Requirements

Based on Banana repository analysis:

| Requirement | Banana Pattern | Backpack Alignment |
|-------------|----------------|-------------------|
| Package naming | `@web-platform/shared-universal-{name}` | `@web-platform/shared-universal-backpack` |
| Tags | `type:ui`, `env:universal`, `scope:universal` | `type:design-system`, `env:universal`, `scope:universal` |
| Project structure | `project.json` + `package.json` + tsconfigs | Single project wrapping all components |
| Nx plugins | @nx/jest, @nx/eslint, @nx/storybook, @nx/js/typescript | Compatible (same plugins) |

### What This Milestone Prepares

1. **Documentation**: Structure mapping showing current → Banana target paths
2. **Nx Compatibility**: Verify current Nx setup aligns with Banana patterns
3. **No Immediate Changes**: Packages stay in `packages/` until actual merge

## Technical Context

**Build System**: Nx 22.4.0-beta.4 (installed in milestone 1)
**Package Manager**: npm >=10.7.0 with workspaces
**Node Version**: >=18.20.4
**Nx Plugins**: @nx/js/typescript (for project references)
**Prerequisite**: WOODPECKER-4039 (Nx Initialization) complete

**Scope Boundaries**:
- **In Scope**: Structure documentation with Banana target mapping, Nx graph verification, config updates
- **Out of Scope**: Adding project.json per component (milestone 4), colocating stories (milestone 3), actual Banana merge (separate milestone)

## Constitution Check

*GATE: Infrastructure changes must align with Backpack standards.*

### Infrastructure Compliance

- [x] **No Breaking Changes**: Consumer imports remain unchanged (PATCH version)
- [x] **Git History Preserved**: Using `git mv` for any file moves
- [x] **CI Compatibility**: All existing workflows must pass
- [x] **Documentation**: Structure mapping document will be created
- [x] **Backwards Compatible**: Published package structure unchanged

### Technology Compliance

- [x] **Nx Version**: Using 22.4.0-beta.4 (aligned with Banana)
- [x] **npm Workspaces**: Already configured in milestone 1
- [x] **TypeScript**: Project references managed by Nx

**No constitution violations. Infrastructure follows all Backpack standards.**

## Project Structure

### Documentation (this feature)

```text
specs/nx-project-structure/
├── spec.md                   # Feature specification
├── plan.md                   # This file
├── research.md               # Phase 0 research findings
├── structure-mapping.md      # Core deliverable: package mapping document
├── checklists/
│   ├── requirements.md       # Spec quality checklist
│   └── structure-migration.md # Structure requirements checklist
└── tasks.md                  # Phase 2 output (/speckit.tasks)
```

### Current Repository Structure (unchanged)

```text
backpack/
├── package.json              # Root manifest with workspaces
├── package-lock.json         # Single lockfile
├── nx.json                   # Nx configuration (from milestone 1)
├── tsconfig.base.json        # Shared TypeScript options
├── tsconfig.json             # Extends base, has project references
├── packages/
│   ├── package.json          # Publishing manifest (copied to dist/)
│   ├── bpk-component-*/      # ~91 UI components
│   ├── bpk-mixins/           # SCSS mixins
│   ├── bpk-react-utils/      # React utilities
│   ├── bpk-scrim-utils/      # Scrim utilities
│   ├── bpk-theming/          # Theming support
│   ├── bpk-stylesheets/      # Stylesheets
│   ├── bpk-animate-height/   # Animation helper
│   └── ...
├── examples/                 # Storybook stories
├── .storybook/               # Storybook configuration
└── scripts/                  # Automation helpers
```

## Phase 0: Research & Discovery

**Objective**: Verify Nx compatibility with current structure and identify any configuration needs.

### Research Tasks

1. **Verify Nx Graph Works**:
   - Run `nx graph` and confirm all ~130 packages are detected
   - Document any packages not correctly inferred
   - Identify configuration changes needed

2. **Review Package Categories**:
   - Enumerate all packages in `packages/` directory
   - Categorize by type (Components, Utilities, Foundations, etc.)
   - Document package count per category

3. **Check Configuration Files**:
   - Review `nx.json` project patterns
   - Verify `tsconfig.json` include paths
   - Check if Jest/Storybook configs need updates

4. **Validate Build Pipeline**:
   - Run `npm run build` and verify success
   - Run `npm run test` and verify all tests pass
   - Run `npm run storybook` and verify stories load

5. **Test Consumer Import Paths**:
   - Verify `@skyscanner/backpack-web/bpk-component-*` imports work
   - Check SCSS mixin import paths

**Deliverable**: `research.md` with findings and recommendations

### Research Findings Template

```markdown
# Research: Project Structure for Nx Migration

## 1. Nx Graph Verification
- [ ] `nx graph` runs successfully
- [ ] All packages detected: [count]/[expected]
- [ ] Missing packages (if any): [list]

## 2. Package Inventory
| Category | Count | Examples |
|----------|-------|----------|
| Components | X | bpk-component-button, ... |
| Utilities | X | bpk-react-utils, ... |
| ... | ... | ... |

## 3. Configuration Status
- [ ] nx.json patterns correct
- [ ] tsconfig.json paths correct
- [ ] Jest config compatible
- [ ] Storybook config compatible

## 4. Build Validation
- [ ] `npm run build` passes
- [ ] `npm run test` passes
- [ ] `npm run storybook` works

## 5. Recommendations
[Any changes needed]
```

## Phase 1: Structure Mapping Document

**Objective**: Create the structure mapping document (FR-001)

### Structure Mapping Document

**Deliverable**: `structure-mapping.md`

```markdown
# Backpack Project Structure Mapping

**Version**: 1.0
**Date**: [DATE]
**Milestone**: 2 - Project Structure Confirmation

## Overview

This document maps all ~130 packages in the Backpack repository to their
designated locations. Per clarification decisions, the structure remains
flat under `packages/` without subdirectory categorization.

## Package Inventory

### Components (~91 packages)

| Package Name | Location | Category | Notes |
|--------------|----------|----------|-------|
| bpk-component-accordion | packages/bpk-component-accordion/ | Component | |
| bpk-component-aria-live | packages/bpk-component-aria-live/ | Component | |
| ... | ... | ... | ... |

### Utilities (X packages)

| Package Name | Location | Category | Notes |
|--------------|----------|----------|-------|
| bpk-react-utils | packages/bpk-react-utils/ | Utility | |
| bpk-scrim-utils | packages/bpk-scrim-utils/ | Utility | |

### Foundations (X packages)

| Package Name | Location | Category | Notes |
|--------------|----------|----------|-------|
| bpk-mixins | packages/bpk-mixins/ | Foundation | SCSS mixins |
| bpk-stylesheets | packages/bpk-stylesheets/ | Foundation | |

### Theming (X packages)

| Package Name | Location | Category | Notes |
|--------------|----------|----------|-------|
| bpk-theming | packages/bpk-theming/ | Theming | |

### Animation (X packages)

| Package Name | Location | Category | Notes |
|--------------|----------|----------|-------|
| bpk-animate-height | packages/bpk-animate-height/ | Animation | |

### Internal/Deprecated (X packages)

| Package Name | Location | Category | Notes |
|--------------|----------|----------|-------|
| bpk-component-boilerplate | packages/bpk-component-boilerplate/ | Internal | Template for new components |

## Structure Decision

**Decision**: Flat structure - all packages remain directly under `packages/`

**Rationale**:
1. Minimizes changes to existing structure
2. Complies with Production Standard (`packages/` folder requirement)
3. Preserves consumer import paths unchanged
4. Simplifies migration - focus on Nx setup rather than folder reorganization

## Nx Compatibility

- **Project Detection**: Nx auto-infers projects from folder structure
- **Dependency Graph**: `nx graph` displays all package relationships
- **No Configuration Needed**: Current structure is Nx-compatible

## Deferred Items

| Item | Milestone | Reference |
|------|-----------|-----------|
| Add project.json per component | Milestone 4 | Set up Components as Nx Projects |
| Colocate Storybook stories | Milestone 3 | All Storybook Stories Colocated |

## Approval

- [ ] Author review complete
- [ ] PE team alignment verified
- [ ] Production Standards compliance confirmed
```

## Phase 2: Configuration Verification

**Objective**: Verify and update configurations for Nx compatibility

### Configuration Files to Review

1. **nx.json** - Verify project patterns
2. **tsconfig.json** - Verify include paths cover all packages
3. **jest.config.js** - Verify test discovery patterns
4. **.storybook/main.ts** - Verify story discovery patterns

### nx.json Verification

Current configuration (from milestone 1) should work. Verify:

```json
{
  "namedInputs": {
    "default": ["{projectRoot}/**/*"],
    "production": [
      "default",
      "!{projectRoot}/**/*.test.tsx",
      "!{projectRoot}/**/*-test.tsx",
      "!{projectRoot}/**/*.stories.tsx"
    ]
  }
}
```

### tsconfig.json Verification

Include paths should cover:
- `packages/` - all component packages
- `@types/` - type definitions
- `examples/` - Storybook examples

### Rollback Plan

If any issues are found during migration:

```bash
# Revert to previous commit
git reset --hard HEAD~1

# Or revert specific commit
git revert <commit-sha>

# Force reinstall dependencies
rm -rf node_modules
npm ci
```

## Testing Strategy

### Verification Steps

1. **Nx Graph Verification**:
   ```bash
   nx graph
   # Verify all ~130 packages are displayed
   # Verify dependency relationships are correct
   ```

2. **Build Verification**:
   ```bash
   npm run build
   # Verify build completes without errors
   ```

3. **Test Verification**:
   ```bash
   npm run test
   # Verify all tests pass
   # Record test count for comparison
   ```

4. **Storybook Verification**:
   ```bash
   npm run storybook
   # Verify all stories load
   # Record story count for comparison
   ```

5. **Consumer Import Verification**:
   ```bash
   # Create test file importing from @skyscanner/backpack-web
   # Verify imports resolve correctly
   ```

### Success Criteria Validation

| Criterion | Validation Method |
|-----------|-------------------|
| SC-001 | structure-mapping.md exists with ~130 packages |
| SC-003 | `nx graph` displays correct relationships |
| SC-004 | `npm run build/test/lint/storybook` pass |
| SC-006 | Test count unchanged from baseline |
| SC-007 | Story count unchanged from baseline |
| SC-009 | `git log --follow` works for any file |
| SC-010 | Consumer imports resolve correctly |

## Dependencies

### Internal Dependencies (from Milestone 1)

- `nx` package (22.4.0-beta.4) - installed
- `@nx/js` package - installed
- npm workspaces - configured
- TypeScript project references - configured

### External Dependencies

- PE team review - for Production Standards alignment
- CI validation - GitHub Actions must pass

## Migration & Versioning

### Version Determination

**This change is**: **PATCH** version bump

**Rationale**:
- No API changes to consumer-facing code
- No breaking changes to import paths
- Internal infrastructure change only

### What Changes

1. **Documentation**: New structure-mapping.md file
2. **Possibly configs**: Minor updates to nx.json/tsconfig if needed

### What Stays the Same

1. **All package locations**: packages/ structure unchanged
2. **Consumer imports**: `@skyscanner/backpack-web/*` unchanged
3. **Build output**: dist/ structure unchanged
4. **CI workflows**: Existing workflows continue to work

## Checklist Deferred Items

The following items from the structure-migration checklist are addressed in this plan:

| Checklist ID | Topic | How Addressed |
|--------------|-------|---------------|
| CHK010 | Migration step sequence | Defined in Phase 0 → Phase 1 → Phase 2 |
| CHK011 | Rollback plan | Added in Phase 2: Configuration Verification |
| CHK025 | Circular dependencies | Will verify with `nx graph` |
| CHK026 | Relative import updates | N/A - no file moves planned |
| CHK027 | Code-generated files | Verified in Phase 0 research |
| CHK029 | Nx inference conflicts | Verified in Phase 0 research |
| CHK033 | Nx inference verification | Added to Phase 0 research tasks |
| CHK034 | Code gen compatibility | Added to Phase 0 research tasks |

## Notes

### Key Insights from Milestone 1 Research

1. **Flat structure is optimal**: Matches current setup, minimizes migration risk
2. **Nx auto-inference works**: No need for explicit project.json files yet
3. **Consumer compatibility preserved**: Import paths unchanged
4. **CI already updated**: node_modules caching removed in milestone 1

### Risks and Mitigations

| Risk | Mitigation |
|------|------------|
| Nx graph doesn't detect all packages | Verify in Phase 0, fix nx.json patterns |
| Build/test failures | Run full CI locally before committing |
| PE team misalignment | Get approval before Phase 2 completion |

## References

- **Milestone 1 Research**: `specs/nx-initialization/research.md`
- **Nx Adoption One Pager**: https://skyscanner.atlassian.net/wiki/spaces/Clover/pages/1430062432
- **TypeScript Monorepos Standard**: https://skyscanner.atlassian.net/wiki/spaces/WEAV/pages/1388484149
- **Nx Graph Documentation**: https://nx.dev/features/explore-graph
