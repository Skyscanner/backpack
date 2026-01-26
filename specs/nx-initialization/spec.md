<!--
==============================================================================
DOCUMENT PURPOSE: Define WHAT needs to be built and WHY (Requirements)
==============================================================================

This specification describes requirements and constraints for initializing
Nx workspace in the Backpack monorepo. This is an infrastructure/tooling
feature, not a UI component.

FOCUS: WHAT & WHY
- What needs to be configured
- Why Nx is needed
- What success looks like
==============================================================================
-->

# Specification: Nx Initialization for Backpack Web

**Branch**: `WOODPECKER-4039`
**Created**: 2026-01-26
**Status**: Draft
**Input**: User description: "Nx Initialization for Backpack Web - Kickstarts the migration by creating an Nx workspace that unlocks affected commands, dependency graphs, and caching."

## Overview

Initialize Nx workspace in the Backpack monorepo to enable modern build tooling features including dependency graphs, affected commands, and build caching. This follows Skyscanner's Phase 1 Initialization guide and aligns with Web Foundations initiative.

## Constitution Check

*GATE: Must pass before implementation begins.*

- [x] **Infrastructure Change**: This is a tooling/build infrastructure change, not a component
- [x] **License Headers**: N/A - primarily configuration files
- [x] **TypeScript**: Will set up TypeScript project references
- [x] **Documentation**: Will update README with Nx usage instructions
- [x] **Versioning**: PATCH - no breaking changes to existing functionality

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Project Dependencies (Priority: P1)

As a developer, I want to visualize the dependency graph of the Backpack monorepo so that I can understand how packages relate to each other.

**Why this priority**: Understanding dependencies is fundamental to monorepo management and helps developers make informed decisions about changes.

**Independent Test**: Can be fully tested by running `nx graph` after setup and verifying the visualization displays package relationships.

**Acceptance Scenarios**:

1. **Given** Nx is configured in the repo, **When** a developer runs `nx graph`, **Then** a visual dependency graph opens showing all packages and their relationships
2. **Given** the dependency graph is displayed, **When** a developer clicks on a package, **Then** they see its direct dependencies and dependents

---

### User Story 2 - Run Affected Commands (Priority: P2)

As a developer, I want to run commands only on packages affected by my changes so that CI builds are faster and more efficient.

**Why this priority**: Affected commands reduce CI time by only testing/building what changed, enabling faster feedback loops.

**Independent Test**: Can be tested by making a change to one package and verifying `nx affected` commands only target related packages.

**Acceptance Scenarios**:

1. **Given** Nx is configured with nrwl/nx-set-shas in CI, **When** a PR modifies a single package, **Then** only that package and its dependents are affected
2. **Given** a developer makes changes locally, **When** they run `nx affected:graph`, **Then** they see only the affected portion of the dependency graph

---

### User Story 3 - Synchronized TypeScript Project References (Priority: P2)

As a developer, I want TypeScript project references to be automatically managed so that IDE navigation and type checking work correctly across packages.

**Why this priority**: Proper TypeScript configuration enables efficient IDE features like "Go to Definition" and faster incremental compilation.

**Independent Test**: Can be tested by running `nx sync` and verifying tsconfig.json files are updated with correct references.

**Acceptance Scenarios**:

1. **Given** Nx is configured, **When** a developer runs `nx sync`, **Then** all tsconfig.json files are updated with correct project references
2. **Given** TypeScript references are configured, **When** a developer opens a file importing from another package, **Then** IDE "Go to Definition" navigates to the source file

---

### User Story 4 - Simplified CI Dependency Installation (Priority: P3)

As a CI/CD maintainer, I want npm dependencies installed only once at the root level so that CI workflows are faster and more reliable.

**Why this priority**: Removing custom node_modules caching and using npm workspaces simplifies CI configuration and reduces cache-related issues.

**Independent Test**: Can be tested by running CI workflow and verifying npm ci runs only once at root level.

**Acceptance Scenarios**:

1. **Given** npm workspaces are configured, **When** CI runs `npm ci` at root, **Then** all package dependencies are installed correctly
2. **Given** custom node_modules caching is removed, **When** CI workflow runs, **Then** only `actions/setup-node` default caching is used

---

### Edge Cases

- What happens when `nx sync` is run with uncommitted changes?
- How does the system handle circular dependencies between packages?
- What happens if a package tsconfig.json has syntax errors?
- How does Nx handle packages with no dependencies?
- What happens when running nx commands in a package subdirectory?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Repository MUST have an `nx.json` configuration file at the root
- **FR-002**: Repository MUST have `nx` installed as a dev dependency
- **FR-003**: Root `package.json` MUST include a `workspaces` field pointing to package locations
- **FR-004**: Each project MUST have its own `tsconfig.json` inheriting from root configuration
- **FR-005**: TypeScript hierarchy MUST follow: `tsconfig.base.json` -> `tsconfig.json` -> project-level configs
- **FR-006**: CI workflows MUST use `nrwl/nx-set-shas` GitHub Action after `actions/setup-node`
- **FR-007**: CI workflows MUST NOT use `actions/cache` or `actions/cache/restore` for `node_modules`
- **FR-008**: CI workflows MUST use only `actions/setup-node` with cache dependency path for npm caching
- **FR-009**: Project references MUST be synchronizable via `nx sync` command
- **FR-010**: Dependency graph MUST be viewable via `nx graph` command

### Configuration Requirements

**nx.json** structure:
- Version: Nx v21+ compatible
- Enable TypeScript project references
- Configure default project settings

**tsconfig.base.json** (new file):
- Contains shared compiler options
- Acts as base for all other tsconfig files

**tsconfig.json** (modified):
- Extends `tsconfig.base.json`
- Contains workspace-wide settings
- Includes project references array

**Project-level tsconfig files**:
- `tsconfig.json` - main config extending root
- `tsconfig.lib.json` or `tsconfig.app.json` - production build config
- `tsconfig.spec.json` - test configuration

### Non-Functional Requirements

- **NFR-001**: `nx graph` command MUST complete and display visualization
- **NFR-002**: `nx sync` command MUST update all project references correctly
- **NFR-003**: Existing build scripts (`npm run build`) MUST continue to work
- **NFR-004**: Existing test scripts (`npm run test`) MUST continue to work
- **NFR-005**: CI workflow MUST complete successfully after changes
- **NFR-006**: Local development workflow MUST remain functional

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: `nx.json` file exists in repository root with valid configuration
- **SC-002**: `nx` package is installed as dev dependency at correct version (v21+)
- **SC-003**: `nx graph` command executes successfully and displays dependency visualization
- **SC-004**: `nx sync` command updates TypeScript project references without errors
- **SC-005**: `tsconfig.base.json` exists with shared compiler options
- **SC-006**: All existing npm scripts continue to function (build, test, lint)
- **SC-007**: CI workflow completes successfully with new configuration
- **SC-008**: No custom `node_modules` caching remains in CI workflows
- **SC-009**: `nrwl/nx-set-shas` is configured in CI jobs that may run Nx commands
- **SC-010**: npm workspaces are configured in root `package.json`

## Dependencies & Related Systems

**Internal Dependencies**:
- Current npm scripts must remain functional
- packages/package.json must be maintained for npm publishing
- Build output (dist/) structure must remain unchanged

**External Dependencies**:
- `nx` package (v21+)
- `nrwl/nx-set-shas` GitHub Action
- `actions/setup-node` with cache support

**CI Workflow Dependencies**:
- `.github/workflows/main.yml` - requires modification
- `.github/workflows/pr.yml` - requires modification
- `.github/workflows/_build.yml` - requires modification

## Migration Considerations

### What Changes

1. **Root package.json**: Add `workspaces` field
2. **New files**: `nx.json`, `tsconfig.base.json`
3. **Modified files**: `tsconfig.json`, CI workflows
4. **Removed**: Custom `actions/cache` for `node_modules`
5. **Deleted**: `packages/package-lock.json` (dependencies managed by root)

### What Stays the Same

1. Existing npm scripts functionality
2. Package publishing process
3. Storybook build and deployment
4. Test execution
5. Linting configuration

### Risk Mitigation

- Run full CI suite after changes to verify nothing is broken
- Keep build cache mechanism for dist-storybook (not node_modules)
- Ensure postinstall script compatibility with npm workspaces

## Decisions

- **D1**: packages/package-lock.json will be **deleted** (not kept empty). Root package-lock.json will manage all dependencies via npm workspaces.
- **D2**: Use **Nx 22.4.0-beta.4** to align with Banana repository (target merge destination)
- **D3**: No Backpack-specific Nx plugins required for Phase 1 initialization

### Banana Alignment Notes

Backpack will eventually be merged into Banana. Key differences to consider:

| Aspect | Backpack (Current) | Banana (Target) |
| ------ | ------------------ | --------------- |
| Package Manager | npm | pnpm |
| Nx Version | (none) | 22.4.0-beta.4 |
| Nx Plugins | (none) | @nx/eslint, @nx/jest, @nx/storybook, @nx/cypress, nx-stylelint, @nx/js/typescript |
| Nx Cloud | (none) | Configured (skyscanner.gc.ent.nx.app) |

For Phase 1 initialization, we will:
- Use same Nx version as Banana (22.4.0-beta.4)
- Keep npm as package manager (pnpm migration is separate scope)
- Start with minimal Nx configuration (no plugins yet)
- Not configure Nx Cloud (can be added later)

## References

- **Phase 1 Initialization Guide**: https://skyscanner.atlassian.net/wiki/spaces/WEAV/pages/1365838884
- **Nx Manual Migration**: https://nx.dev/recipes/adopting-nx/manual
- **TypeScript Project References**: https://nx.dev/concepts/typescript-project-linking
- **nrwl/nx-set-shas Action**: https://github.com/nrwl/nx-set-shas
