<!--
==============================================================================
DOCUMENT PURPOSE: Define WHAT needs to be built and WHY (Requirements)
==============================================================================

This specification describes requirements and constraints for reorganizing
the Backpack project structure as part of the Nx migration. This is an
infrastructure/tooling feature, not a UI component.

FOCUS: WHAT & WHY
- What structure needs to change
- Why reorganization is needed
- What success looks like

Reference: https://skyscanner.atlassian.net/wiki/spaces/Clover/pages/1430062432
==============================================================================
-->

# Specification: Project Structure Reorganization for Nx Migration

**Branch**: `WOODPECKER-4040`
**Created**: 2026-01-26
**Status**: Draft
**Input**: User description: "Establish a well-defined project hierarchy for Nx migration - produce a project-structure document mapping current folders to new layout, execute folder reorganization, and update CI/Jest/Storybook configs"
**Reference**: [Backpack Web: Nx Adoption One Pager](https://skyscanner.atlassian.net/wiki/spaces/Clover/pages/1430062432)
**Effort**: L (Large) | **Complexity**: S (Small) | **Estimate**: 2 weeks

## Overview

Establish a well-defined project hierarchy as part of the Nx migration for Backpack. This is the linchpin for the entire migration - it unlocks Nx's dependency graph, incremental builds, and caching benefits, prevents ad-hoc folder moves later, and reduces merge-conflict pressure by giving every team a single source of truth for where code should live.

## Clarifications

### Session 2026-01-27

- Q: What directory hierarchy structure should be adopted? → A: Flat structure - all packages remain under `packages/` without subdirectory categorization
- Q: Should Storybook stories be migrated in this reorganization? → A: Keep as-is - Stories remain in `examples/` directory, migrate as a separate task (milestone 3)
- Q: How should deprecated/internal packages be handled? → A: Keep and mark - Retain packages like `bpk-component-boilerplate`, mark as internal/deprecated in README
- Q: Should each component have its own project.json? → A: Defer - Do not add in this phase, rely on Nx auto-inference, handle as milestone 4
- Q: What are the core deliverables for this reorganization? → A: Documentation + validation - Create structure mapping document, verify nx graph works correctly, update necessary configs

## Strategic Context

### Current Repository Structure

Backpack-web is a component-centric repo with ~130 component folders, but organised as NPM packages rather than an Nx workspace:

```
backpack/
├── package.json              # Root-level manifest (devDependencies only)
├── package-lock.json         # Root lockfile
├── packages/
│   ├── package.json          # Shared manifest for all ~130 components
│   │                         # (copied to dist/ during build)
│   ├── bpk-component-*/      # Component folders (~91 packages)
│   ├── bpk-mixins/           # SCSS mixins
│   ├── bpk-react-utils/      # React utilities
│   ├── bpk-theming/          # Theming utilities
│   └── ...
├── examples/                 # ALL Storybook stories (NOT colocated)
├── .storybook/               # Storybook configuration
└── scripts/                  # Automation helpers
```

**Key Current Characteristics**:
- **Two package.json manifests only** - root and `packages/package.json`
- **Individual components do NOT have their own package.json**
- **Stories are NOT colocated** - all live in `examples/` directory
- **Single umbrella package** published as `@skyscanner/backpack-web`

### Why Structure Reorganization is Critical

1. **Unlocks Nx Dependency Graph**: Properly structured projects enable accurate dependency analysis
2. **Enables Incremental Builds**: Nx can target only affected projects
3. **Enables Caching**: Well-defined boundaries improve cache hit rates
4. **Prevents Future Conflicts**: Single source of truth for code location
5. **Aligns with Production Standards**: TypeScript Monorepo standards require structured layouts

### Production Standard Requirements

Per [TypeScript Monorepos Production Standard](https://skyscanner.atlassian.net/wiki/spaces/WEAV/pages/1388484149):
- Public libraries must be placed inside `packages/` folder
- Built artifacts must support clear package boundaries
- Each library should have its own folder structure

## Constitution Check

*GATE: Must pass before implementation begins.*

- [x] **Infrastructure Change**: This is a tooling/build infrastructure change, not a component
- [x] **License Headers**: N/A - primarily configuration files
- [x] **TypeScript**: Existing TypeScript configuration will be preserved
- [x] **Documentation**: Will update README with new structure information
- [x] **Versioning**: PATCH - no breaking changes to existing functionality

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Document Current Structure Mapping (Priority: P1)

As a developer, I want a clear document showing how current packages map to the new structure so that I understand where each package should live.

**Why this priority**: Documentation must come first to establish consensus before any moves occur. This needs close collaboration with PE and other teams driving monorepo efforts.

**Independent Test**: Can be tested by reviewing the mapping document and verifying every current package has a designated target location.

**Acceptance Scenarios**:

1. **Given** the current packages directory, **When** a developer reads the mapping document, **Then** they can identify the target location for any of the ~130 packages
2. **Given** the mapping document exists, **When** reviewed by PE/web-enablement teams, **Then** it aligns with their structural standards
3. **Given** the mapping document, **When** reviewed against Production Standards, **Then** it meets TypeScript Monorepo requirements

---

### User Story 2 - Execute Folder Reorganization (Priority: P2)

As a developer, I want the folder reorganization executed so that the codebase reflects the new structure.

**Why this priority**: Physical structure changes enable Nx to correctly understand project relationships.

**Independent Test**: Can be tested by verifying all packages exist in their new locations and imports resolve correctly.

**Acceptance Scenarios**:

1. **Given** the mapping document is approved, **When** reorganization is executed via `nx workspace:move` or `git mv`, **Then** all packages exist in their target locations
2. **Given** folders are moved, **When** running `npm run build`, **Then** build completes without path-related errors
3. **Given** folders are moved, **When** running `nx graph`, **Then** the dependency visualization shows correct relationships

---

### User Story 3 - Update Build and Test Configuration (Priority: P2)

As a CI/CD maintainer, I want configuration files updated to reflect new paths so that builds and tests continue to work.

**Why this priority**: Without config updates, CI will fail after folder moves.

**Independent Test**: Can be tested by running full CI workflow and verifying all jobs pass.

**Acceptance Scenarios**:

1. **Given** folders are moved, **When** GitHub Actions workflows run, **Then** all steps complete successfully
2. **Given** folders are moved, **When** Jest tests run, **Then** test discovery finds all test files
3. **Given** folders are moved, **When** Storybook builds, **Then** all stories are discovered and rendered
4. **Given** relative imports are updated, **When** TypeScript compiles, **Then** no import resolution errors occur

---

### User Story 4 - Preserve Import Compatibility (Priority: P1)

As a consumer of Backpack, I want my existing imports to continue working after the reorganization so that I don't need to change my code.

**Why this priority**: Breaking consumer imports would be a major version change. Consumers currently rely on unified import paths (`@skyscanner/backpack-web/...`) and generated SCSS mixin imports.

**Independent Test**: Can be tested by verifying the published package structure remains unchanged.

**Acceptance Scenarios**:

1. **Given** the reorganization is complete, **When** a consumer imports from `@skyscanner/backpack-web/bpk-component-button`, **Then** existing imports resolve correctly
2. **Given** internal paths change, **When** npm package is published, **Then** public API surface remains identical
3. **Given** SCSS mixin paths change internally, **When** consumer uses `@use '../../unstable__bpk-mixins/tokens'`, **Then** imports still work (or path-mapping is provided)

---

### Edge Cases

- What happens if a package has circular dependencies during the move?
- How do we handle packages that import from relative paths during transition?
- What happens if git history needs to be preserved for moved files?
- How do we handle deprecated packages (e.g., `bpk-component-boilerplate`)?
- What happens if the move conflicts with Nx's project inference?
- How do code-generated files (Icon/Flare/Spinner) interact with the new structure?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Repository MUST have a documented project structure mapping (current → target)
- **FR-002**: All ~130 packages MUST be categorized into logical groups aligned with PE standards
- **FR-003**: Folder moves MUST use `nx workspace:move` or `git mv` to preserve file history
- **FR-004**: All relative imports within packages MUST be updated to reflect new paths
- **FR-005**: Nx project inference MUST correctly identify all projects after reorganization
- **FR-006**: CI workflows (GitHub Actions) MUST be updated with new path references
- **FR-007**: Jest configuration MUST be updated to find tests in new locations
- **FR-008**: Storybook configuration MUST be updated to discover stories in new locations
- **FR-009**: Package publishing configuration MUST continue to produce correct output to `dist/`
- **FR-010**: Consumer import paths (`@skyscanner/backpack-web/...`) MUST remain unchanged

### Structure Requirements

**Target Structure Decision**: Flat structure - all packages remain directly under `packages/` without additional subdirectory categorization.

```
backpack/
├── package.json
├── nx.json
├── packages/
│   ├── package.json          # Shared manifest (copied to dist/)
│   ├── bpk-component-*/      # All ~91 UI components
│   ├── bpk-mixins/
│   ├── bpk-react-utils/
│   ├── bpk-scrim-utils/
│   ├── bpk-theming/
│   ├── bpk-stylesheets/
│   ├── bpk-animate-height/
│   └── ...
├── examples/                 # Storybook stories
└── .storybook/
```

**Rationale**:
- Minimizes changes to existing structure
- Complies with Production Standard (`packages/` folder requirement)
- Preserves consumer import paths unchanged
- Simplifies migration - focus on Nx setup rather than folder reorganization

**Scope Boundaries** (clarified):
- **In Scope**: Directory structure documentation, config updates (CI/Jest/Storybook), import path verification
- **Out of Scope**: Adding `project.json` to each component (milestone 4), colocating stories (milestone 3)

**Current Package Categories** (~130 packages total):

| Category | Description | Example Packages |
|----------|-------------|------------------|
| Components | UI components | bpk-component-button, bpk-component-card (~91) |
| Utilities | React utilities | bpk-react-utils, bpk-scrim-utils |
| Theming | Theme support | bpk-theming |
| Foundations | SCSS foundations | bpk-mixins, bpk-stylesheets |
| Animation | Animation helpers | bpk-animate-height |
| Internal | Internal/deprecated | bpk-component-boilerplate |

**Structure Decision Required**: Whether to reorganize folder structure inside individual components needs to be determined during planning phase (see Open Questions).

### Non-Functional Requirements

- **NFR-001**: File moves MUST preserve git history (using `git mv` or `nx workspace:move`)
- **NFR-002**: Reorganization MUST be atomic (coordinated commits to prevent broken states)
- **NFR-003**: Existing npm scripts MUST continue to work after reorganization
- **NFR-004**: Build time MUST not increase significantly (< 10% variance)
- **NFR-005**: Local development workflow MUST remain functional
- **NFR-006**: Published package API MUST remain unchanged
- **NFR-007**: SCSS mixin import paths MUST remain compatible or provide migration path

## Success Criteria *(mandatory)*

### Measurable Outcomes

**Core Deliverables** (clarified):
1. Project structure mapping document covering all ~130 packages
2. Verification that `nx graph` displays correct dependency relationships
3. Updated configurations (CI/Jest/Storybook) if needed for Nx compatibility

**Success Criteria**:

- **SC-001**: Project structure mapping document exists and covers all ~130 packages
- **SC-002**: All packages exist in designated locations per the mapping document
- **SC-003**: `nx graph` displays correct dependency relationships for all projects
- **SC-004**: All existing npm scripts (`build`, `test`, `lint`, `storybook`) complete successfully
- **SC-005**: GitHub Actions CI workflow passes with new structure
- **SC-006**: Jest discovers and runs all tests (same test count as before move)
- **SC-007**: Storybook discovers and renders all stories (same story count as before move)
- **SC-008**: `npm run transpile` produces identical publishable output structure
- **SC-009**: Git history is preserved for moved files (verifiable via `git log --follow`)
- **SC-010**: Consumer imports (`@skyscanner/backpack-web/bpk-component-*`) work unchanged
- **SC-011**: PE team approves structure alignment with Production Standards

## Dependencies & Related Systems

**Internal Dependencies**:
- Nx initialization (WOODPECKER-4039) MUST be complete before structure reorganization
- `packages/package.json` must be maintained for npm publishing (copied to `dist/`)
- Build output (`dist/`) structure must remain unchanged for consumers

**External Dependencies**:
- Alignment review with PE (Platform Engineering) team
- Alignment review with web-enablement team
- Reference: [TypeScript Monorepos Production Standard](https://skyscanner.atlassian.net/wiki/spaces/WEAV/pages/1388484149)

**Configuration Files Requiring Updates**:
- `.github/workflows/main.yml`
- `.github/workflows/pr.yml`
- `.github/workflows/_build.yml`
- `jest.config.js`
- `.storybook/main.ts`
- `nx.json` (project patterns)
- `tsconfig.json` (include paths)
- Possibly `gulpfile.js` (code generation paths for Icon/Flare/Spinner)

## Migration Considerations

### What Changes

1. **Directory structure**: Packages organized into aligned hierarchy
2. **Configuration files**: CI, Jest, Storybook updated with new paths
3. **Internal imports**: Relative paths updated within packages
4. **nx.json**: Project patterns updated for new structure

### What Stays the Same

1. **Published API**: `@skyscanner/backpack-web/...` imports unchanged
2. **Package publishing**: Output to `dist/` unchanged
3. **npm scripts**: Commands remain the same
4. **Individual component internal structure**: Files within each component unchanged (unless decided otherwise)

### Risk Mitigation

- **PE Alignment**: Collaborate with PE team before finalizing structure
- **Atomic commits**: Coordinated commits to prevent broken intermediate states
- **CI validation**: Full CI run after each phase
- **Rollback plan**: Document git commands to reverse changes
- **Consumer testing**: Verify imports work before publishing

## Assumptions

1. **PE collaboration available**: PE team can review and approve structure within timeline
2. **No breaking consumer changes**: Published package paths remain stable
3. **Nx inference works**: After moves, Nx correctly infers projects
4. **History preservation**: `git mv` / `nx workspace:move` preserves history
5. **Code generation compatibility**: Icon/Flare/Spinner gulp tasks work with new paths

## Decisions

- **D1**: Structure must align with PE and web-enablement standards (not arbitrary categories)
- **D2**: Consumer import paths (`@skyscanner/backpack-web/...`) must not change
- **D3**: Use `nx workspace:move` or `git mv` for moves to preserve history
- **D4**: Structure update is PATCH version (no public API changes)

## Open Questions

- [x] **Q1**: What is the exact target structure that PE/web-enablement teams require? → **Resolved**: Flat structure under `packages/`
- [x] **Q2**: Should we reorganize the folder structure inside individual components (e.g., colocate stories)? → **Resolved**: No - stories remain in `examples/`, migrate as milestone 3
- [x] **Q3**: How should deprecated packages (e.g., `bpk-component-boilerplate`) be handled? → **Resolved**: Keep and mark as internal/deprecated in README

## Related Milestones (from Nx Adoption Plan)

This milestone is part of a larger Nx adoption plan:

1. ✅ **Nx Initialization** (WOODPECKER-4039) - < 1 week
2. **Project Structure Confirmation and Change** (This spec) - 2 weeks
3. All Storybook Stories Colocated with Components - 1 week
4. Set up Components as Nx Projects - 2 weeks
5. Converting Static Checks and Scripts to Nx - 3 weeks
6. Configure Module Boundaries - 1 week
7. Publishing with Nx - 4 weeks

## References

- **Nx Adoption One Pager**: https://skyscanner.atlassian.net/wiki/spaces/Clover/pages/1430062432
- **Nx Initialization Spec**: `specs/nx-initialization/spec.md`
- **TypeScript Monorepos Standard**: https://skyscanner.atlassian.net/wiki/spaces/WEAV/pages/1388484149
- **Nx Manual Migration**: https://nx.dev/recipes/adopting-nx/adding-to-existing-project
- **Module Boundaries**: https://nx.dev/features/enforce-module-boundaries
- **Backpack Constitution**: `.specify/memory/constitution.md`
