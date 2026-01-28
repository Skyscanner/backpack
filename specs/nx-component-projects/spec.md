<!--
==============================================================================
DOCUMENT PURPOSE: Define WHAT needs to be built and WHY (Requirements)
==============================================================================

This specification describes requirements for setting up all Backpack components
as individual Nx projects. This is an infrastructure/tooling feature to enable
fine-grained dependency tracking, computation caching, and incremental builds.

FOCUS: WHAT & WHY
- What configuration changes are needed
- Why individual projects matter for Nx benefits
- What success looks like

Reference: https://skyscanner.atlassian.net/wiki/spaces/Clover/pages/1430062432
==============================================================================
-->

# Specification: Set Up Components as Individual Nx Projects

**Branch**: `WOODPECKER-4042`
**Created**: 2026-01-28
**Status**: Draft
**Input**: User description: "Set up all components as individual Nx projects to enable nx affected, fine-grained caching, precise dependency graph, and clearer ownership"
**Reference**: [Backpack Web: Nx Adoption One Pager](https://skyscanner.atlassian.net/wiki/spaces/Clover/pages/1430062432)
**Milestone**: 4 of 7 (Nx Adoption Plan)

## Overview

Set up all Backpack components (~93 packages in `packages/`) as individual Nx projects. This enables Nx to analyse the file system to detect projects, allowing use of `nx affected` to focus only on changed projects rather than the entire repository.

### Why This Matters

1. **Finer-grained projects improve computation caching**: Each project can have its own cache entry, so unchanged projects don't need rebuilding
2. **Precise dependency graph**: Nx can track exactly which components depend on which, enabling accurate impact analysis
3. **Clearer ownership**: Each project has explicit boundaries and can have designated owners
4. **Incremental builds**: Only affected projects are built, tested, or linted
5. **Faster CI pipelines**: `nx affected` reduces unnecessary work in pull requests

## Constitution Check

*GATE: Must pass before implementation begins.*

- [x] **Infrastructure Change**: This is a tooling/build infrastructure change, not a component
- [x] **License Headers**: N/A - configuration files (project.json, tsconfig.json) do not require license headers
- [x] **TypeScript**: Will add proper tsconfig files to each project
- [x] **Documentation**: Will update README with Nx project information
- [x] **Versioning**: No version change - internal tooling only

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Run Affected Tests Only (Priority: P1)

As a developer, I want to run only the tests for components affected by my changes so that I can get faster feedback during development.

**Why this priority**: This is the primary benefit that enables faster development cycles and CI pipelines.

**Independent Test**: Can be tested by making a change to one component and verifying `nx affected --target=test` only runs tests for that component and its dependents.

**Acceptance Scenarios**:

1. **Given** a change to `bpk-component-button`, **When** running `nx affected --target=test`, **Then** only tests for button and components that depend on it are executed
2. **Given** no changes to any component, **When** running `nx affected --target=test`, **Then** no tests are executed (cache hit)
3. **Given** a change to `bpk-react-utils`, **When** running `nx affected --target=test`, **Then** tests for all components depending on bpk-react-utils are executed

---

### User Story 2 - Visualise Dependency Graph (Priority: P1)

As a developer, I want to see the dependency relationships between all Backpack components so that I can understand the impact of changes.

**Why this priority**: Understanding dependencies is fundamental to making informed changes and code reviews.

**Independent Test**: Can be tested by running `nx graph` and verifying all ~93 projects appear with correct dependency edges.

**Acceptance Scenarios**:

1. **Given** all components have project.json, **When** running `nx graph`, **Then** all ~93 projects are displayed
2. **Given** bpk-component-button imports from bpk-react-utils, **When** viewing the graph, **Then** an edge connects button to react-utils
3. **Given** a circular dependency exists, **When** running `nx graph`, **Then** the circular dependency is visible and identifiable

---

### User Story 3 - TypeScript Project References (Priority: P2)

As a developer, I want each component to have proper TypeScript configuration so that type checking is scoped to the component and its dependencies.

**Why this priority**: Proper TypeScript configuration enables faster type checking and better IDE support.

**Independent Test**: Can be tested by running `nx typecheck` on a single project and verifying only relevant files are checked.

**Acceptance Scenarios**:

1. **Given** each component has tsconfig.json, tsconfig.lib.json, and tsconfig.spec.json, **When** running `nx typecheck bpk-component-button`, **Then** type checking completes for button and its dependencies
2. **Given** all project references are in sync, **When** opening a component in IDE, **Then** go-to-definition works across component boundaries
3. **Given** tsconfig.json in root, **When** adding a new component, **Then** project references auto-update or are easily maintained

---

### User Story 4 - Clear Project Boundaries (Priority: P2)

As a team lead, I want each component to be a clearly defined project so that ownership and responsibility are explicit.

**Why this priority**: Clear boundaries enable module boundary rules and team ownership.

**Independent Test**: Can be tested by verifying each project.json has correct metadata and tags.

**Acceptance Scenarios**:

1. **Given** each component has project.json, **When** reviewing the project, **Then** tags indicate component type (e.g., "component", "utility", "foundation")
2. **Given** projects have defined boundaries, **When** configuring module boundary rules, **Then** rules can be applied at project level
3. **Given** a component is marked as deprecated, **When** another component imports from it, **Then** linting can warn about deprecated usage

---

### Edge Cases

- What happens when a component has no dependencies on other Backpack components?
- How are code-generated components (Icon, Flare, Spinner) handled?
- What happens when a new component is added to the repository?
- How are shared type definitions handled across components?
- What happens if project.json is missing or malformed?
- How are circular dependencies between components detected and reported?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Every package in `packages/` directory MUST have a `project.json` file
- **FR-002**: Every project MUST have `tsconfig.json` that extends the base configuration
- **FR-003**: Every project MUST have `tsconfig.lib.json` for library builds (excluding tests)
- **FR-004**: Every project MUST have `tsconfig.spec.json` for test files
- **FR-005**: All project references MUST be kept in sync between tsconfig files
- **FR-006**: Project.json MUST define appropriate targets (build, test, lint, typecheck)
- **FR-007**: Project.json MUST include tags for categorisation (minimal: `scope:backpack`)
- **FR-008**: `nx affected` MUST correctly identify projects changed by file modifications
- **FR-009**: `nx graph` MUST display all projects with accurate dependency edges
- **FR-010**: Existing npm scripts MUST continue to work after project setup

### Project.json Structure

Each project.json MUST include:

- **name**: Package name (e.g., `bpk-component-button`)
- **projectType**: "library" for all packages
- **sourceRoot**: Path to source files
- **tags**: Array of categorisation tags
- **targets**: Build, test, lint, and typecheck targets (or inherit from nx.json defaults)

### TypeScript Configuration Structure

**tsconfig.json** (per project):
- Extends root tsconfig.base.json
- Includes project references to dependencies
- Configures paths for the project

**tsconfig.lib.json** (per project):
- Extends project tsconfig.json
- Excludes test files and stories
- Used for library builds

**tsconfig.spec.json** (per project):
- Extends project tsconfig.json
- Includes test files
- Used for test compilation

### Non-Functional Requirements

- **NFR-001**: Adding project configuration MUST not break existing builds
- **NFR-002**: Project setup MUST be scriptable/automatable for ~93 packages
- **NFR-003**: Configuration MUST follow Nx best practices
- **NFR-004**: Project detection MUST work with Nx TypeScript plugin
- **NFR-005**: Configuration changes MUST be atomic (all or nothing per package)
- **NFR-006**: IDE performance MUST not degrade with 93 tsconfig files

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All ~93 packages have project.json files
- **SC-002**: All packages have tsconfig.json, tsconfig.lib.json, and tsconfig.spec.json
- **SC-003**: `nx graph` displays all projects (count matches package count)
- **SC-004**: `nx affected --target=test` correctly identifies affected projects
- **SC-005**: `nx run-many --target=typecheck --all` completes without errors
- **SC-006**: All existing npm scripts (`build`, `test`, `lint`) continue to work
- **SC-007**: CI pipeline time decreases when using `nx affected` (target: 30%+ reduction for partial changes)
- **SC-008**: No circular dependencies exist between projects (or are documented exceptions)
- **SC-009**: Project references in tsconfig files match actual import dependencies
- **SC-010**: TypeScript compilation works with project references enabled

## Dependencies & Related Systems

**Prerequisites**:
- Nx Initialization (WOODPECKER-4039) - MUST be complete
- Project Structure Reorganization (WOODPECKER-4040) - Should be complete or in progress

**Related Milestones** (from Nx Adoption Plan):
1. Nx Initialization - Complete
2. Project Structure Confirmation - Complete or In Progress
3. Storybook Stories Colocated - Separate milestone
4. **Set up Components as Nx Projects** (This spec)
5. Converting Static Checks to Nx - Depends on this
6. Configure Module Boundaries - Depends on this
7. Publishing with Nx - Depends on this

**Configuration Dependencies**:
- `nx.json` - May need plugin configuration updates
- Root `tsconfig.json` - Needs project references
- Root `tsconfig.base.json` - Shared compiler options

## Testing Strategy

### Validation Tests

- Run `nx show projects` and verify count matches expected packages
- Run `nx graph` and visually inspect dependency accuracy
- Make test change to one component, verify `nx affected` output
- Run `nx run-many --target=typecheck --all` and verify success
- Run existing `npm test` and verify no regressions

### Regression Tests

- All existing CI checks must pass
- Build output must be identical
- Published package must work for consumers

## Assumptions

1. **Nx TypeScript plugin** works with project detection via tsconfig files
2. **Project.json** can coexist with existing package structure
3. **~93 packages** is the correct count (may vary slightly)
4. **No changes** needed to source code, only configuration
5. **Scripts can be created** to automate repetitive project.json generation
6. **IDE support** for 93 tsconfig files is acceptable performance

## Decisions

- **D1**: Use project.json approach (explicit) rather than package.json inference
- **D2**: Each component gets its own tsconfig files (not shared)
- **D3**: Project tags will use minimal taxonomy (`scope:backpack` only, no type categorisation)
- **D4**: Targets will inherit from nx.json defaults; per-project overrides only for special cases (e.g., bpk-stylesheets custom build)

## Clarifications

### Session 2026-01-28

- Q: Should code-generated components (Icon, Flare, Spinner) have special configuration? → A: Standard config - use the same project.json and tsconfig configuration as other components
- Q: What tags taxonomy should be used for project categorisation? → A: Minimal - use only `scope:backpack` unified tag, no further categorisation
- Q: Should targets be defined per-project or rely entirely on nx.json defaults? → A: nx.json defaults + overrides - global defaults with per-project overrides only for special cases

## Open Questions

- [x] **Q1**: Should code-generated components (Icon, Flare, Spinner) have special configuration? → **Resolved**: Standard config (same as other components)
- [x] **Q2**: What tags taxonomy should be used for project categorisation? → **Resolved**: Minimal (`scope:backpack` only)
- [x] **Q3**: Should targets be defined per-project or rely entirely on nx.json defaults? → **Resolved**: nx.json defaults + overrides for special cases

## References

- **Nx Adoption One Pager**: https://skyscanner.atlassian.net/wiki/spaces/Clover/pages/1430062432
- **Nx Project Configuration**: https://nx.dev/concepts/inferred-tasks
- **TypeScript Project References**: https://www.typescriptlang.org/docs/handbook/project-references.html
- **Backpack Constitution**: `.specify/memory/constitution.md`
- **Related Specs**:
  - `specs/nx-initialization/spec.md`
  - `specs/nx-project-structure/spec.md`
