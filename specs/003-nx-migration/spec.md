<!--
==============================================================================
DOCUMENT PURPOSE: Define WHAT needs to be built and WHY (Requirements)
==============================================================================

This specification describes the Nx migration milestones for Backpack Web.
Each milestone is designed to be independently verifiable and non-breaking
to production, enabling incremental adoption with clear success criteria.

FOCUS: WHAT & WHY
- What needs to be migrated at each milestone
- Why each milestone provides value
- What success looks like at each checkpoint

AUTOMATION:
- `/speckit.plan` reads this spec and auto-generates implementation patterns
- `/speckit.tasks` reads spec + plan and auto-generates task list

VALIDATION:
- Each milestone should be deployable to production
- Each milestone should have clear verification steps
- No milestone should break existing consumer imports
==============================================================================
-->

# Migration Specification: Nx Adoption for Backpack Web

**Package Branch**: `003-nx-migration`
**Created**: 2026-01-27
**Status**: Draft
**Input**: User description: "Nx migration milestones for Backpack Web - validated, non-breaking migration phases based on Confluence one-pager, official Nx docs, and reference implementations"

## Executive Summary

This specification defines the incremental migration milestones for adopting Nx in the Backpack Web repository. The migration aims to:

1. Enable dependency-aware, incremental builds and remote caching
2. Enforce clear module boundaries
3. Reduce multi-version bloat seen in production

**Note**: The existing versioning and release process will be preserved. Migration to `nx release` is out of scope for this phase.

Each milestone is designed to be **independently verifiable** and **non-breaking to production**, allowing safe rollback if issues arise.

## Constitution Check

*GATE: Must pass before implementation begins.*

- [x] **Monorepo Architecture**: Migration maintains existing `packages/` structure
- [x] **Naming Conventions**: Existing component naming preserved
- [x] **License Headers**: No changes to license requirements
- [x] **Modern Sass**: Sass setup remains unchanged during migration
- [x] **Accessibility-First**: Testing infrastructure maintained
- [x] **TypeScript**: TypeScript configuration will be enhanced for Nx project references
- [x] **Test Coverage**: Coverage thresholds remain enforced
- [x] **Documentation**: Migration documentation will be provided
- [x] **Versioning**: Existing release process preserved (no migration to `nx release` in this phase)

## Migration Milestones Overview

| Milestone | Name | Est. Effort | Complexity | Key Outcome |
|-----------|------|-------------|------------|-------------|
| M1 | Nx Initialization | Very Low | Small | Nx workspace created, basic commands work |
| M2 | Project Structure Confirmation | Low | Small | Target hierarchy defined and aligned with PE |
| M3 | Storybook Colocation | Very Low | Small | Stories live alongside components |
| M4 | Components as Nx Projects | Very Low | Small | Each component has project.json |
| M5 | Static Checks via Nx | Low | Small | Lint/test/typecheck run through Nx |
| M6 | Module Boundaries | Low | Small | Dependency rules enforced |
| M7 | Publishing with Nx (Optional) | Medium | Medium | `nx release` replaces `npm publish` |
| M8 | Dependency Management (Optional) | Medium | Medium | Production Standard compliance |
| M9 | Vite Adoption (Optional) | Medium | Medium | Vite replaces Webpack/Babel |
| M10 | Vitest Adoption (Optional) | Low | Small | Vitest replaces Jest |

---

## Milestone 1: Nx Initialization (Priority: P1)

### User Story

As a Backpack maintainer, I want to initialize an Nx workspace in the existing repository so that I can start leveraging Nx's task orchestration, caching, and dependency graph features incrementally.

**Why this priority**: This is the foundational step that enables all subsequent milestones. Without Nx initialization, no other features can be adopted.

**Independent Test**: Can be verified by running `nx graph` and seeing the repository visualized; existing `npm run` commands continue to work.

### Acceptance Scenarios

1. **Given** the Backpack repository, **When** `npx nx@latest init` is run, **Then** an `nx.json` configuration file is created at the root
2. **Given** Nx is initialized, **When** `nx graph` is executed, **Then** a dependency visualization is displayed
3. **Given** Nx is initialized, **When** existing `npm run build` is executed, **Then** the build completes successfully as before
4. **Given** Nx is initialized, **When** CI workflows run, **Then** all existing tests and checks pass without modification

### Verification Criteria

- [ ] `nx.json` exists at repository root
- [ ] `nx graph` command produces output
- [ ] All existing `npm run` scripts work unchanged
- [ ] CI pipeline passes (no breaking changes)
- [ ] No changes to consumer import paths

### Risks to Monitor

- External dependency conflicts with Nx plugins (peer dependency mismatches)
- TypeScript `composite: true` conflicts with Babel-based transpilation

---

## Milestone 2: Project Structure Confirmation (Priority: P1)

### User Story

As a Backpack architect, I want to define and align on a target project hierarchy so that the migration has a clear destination structure that integrates well with Platform Engineering standards and enables proper dependency graph analysis.

**Why this priority**: The project structure determines all subsequent folder moves, configuration, and boundary definitions. Getting this wrong would require re-work of all later milestones.

**Independent Test**: Can be verified by reviewing the approved structure document; no code changes required for this milestone.

### Acceptance Scenarios

1. **Given** the current Backpack structure, **When** a draft structure document is created, **Then** it maps all ~92 component folders to their target locations
2. **Given** the draft structure, **When** reviewed by PE and web-enablement teams, **Then** alignment is confirmed
3. **Given** alignment is confirmed, **When** folder reorganization begins, **Then** the changes follow the approved structure exactly
4. **Given** folders are moved, **When** GitHub Actions, Jest config, and Storybook entries are updated, **Then** all automation works with new paths

### Verification Criteria

- [ ] Draft project structure document exists and is approved
- [ ] Structure aligns with TypeScript Monorepo Production Standard
- [ ] All component folders mapped to target locations
- [ ] CI pipeline passes after folder moves
- [ ] Storybook builds successfully with new structure
- [ ] No changes to consumer import paths (`@skyscanner/backpack-web/...`)

### Deliverables

- Project structure mapping document
- Configuration file updates (Jest, Storybook, GitHub Actions)
- Updated path references in repository

---

## Milestone 3: Storybook Colocation (Priority: P2)

### User Story

As a Backpack developer, I want Storybook stories to live alongside their components so that documentation and examples are easier to find and maintain.

**Why this priority**: Colocation improves developer experience and simplifies the component structure, making it easier for Nx to analyze project dependencies.

**Independent Test**: Can be verified by building Storybook and confirming all stories render; component folders contain their own `.stories.tsx` files.

### Acceptance Scenarios

1. **Given** stories in `examples/bpk-component-*/`, **When** stories are moved, **Then** they live in `packages/bpk-component-*/src/`
2. **Given** stories are colocated, **When** Storybook config is updated, **Then** `main.ts` loads stories from new locations
3. **Given** stories are colocated, **When** `npm run storybook` is executed, **Then** all stories render correctly
4. **Given** the migration is complete, **When** the `examples/` folder is evaluated, **Then** it can be removed or repurposed

### Verification Criteria

- [ ] All stories moved to component directories
- [ ] Storybook configuration updated
- [ ] `npm run storybook` builds without errors
- [ ] All stories visible and functional in Storybook UI
- [ ] CI Storybook deployment works

---

## Milestone 4: Components as Nx Projects (Priority: P2)

### User Story

As a Backpack maintainer, I want each component to be recognized as an Nx project so that I can use `nx affected` to only run tasks on changed projects, improving CI performance.

**Why this priority**: Converting components to Nx projects enables computation caching, precise dependency graphs, and the `affected` command that dramatically reduces CI time.

**Independent Test**: Can be verified by running `nx show projects` and seeing all ~92 components listed; `nx affected` correctly identifies changed projects.

### Acceptance Scenarios

1. **Given** the component folders, **When** `project.json` files are created, **Then** each component is registered as an Nx project
2. **Given** projects are registered, **When** `nx show projects` is run, **Then** all ~92 components are listed
3. **Given** a component is modified, **When** `nx affected --target=test` is run, **Then** only that component and its dependents are tested
4. **Given** projects have tsconfig files, **When** TypeScript is compiled, **Then** project references work correctly

### Verification Criteria

- [ ] Every component has a `project.json`
- [ ] Every project has `tsconfig.json`, `tsconfig.lib.json`, and `tsconfig.spec.json`
- [ ] `nx show projects` lists all components
- [ ] `nx affected` correctly identifies changed projects
- [ ] TypeScript project references in sync

### Technical Considerations

- May need to resolve `composite: true` conflicts with Babel transpilation
- Project references must not break existing `.d.ts` generation

---

## Milestone 5: Static Checks via Nx (Priority: P2)

### User Story

As a Backpack maintainer, I want all static checks (linting, testing, type checking) to run through Nx so that I can leverage incremental execution and caching for faster CI feedback.

**Why this priority**: This milestone unlocks the primary productivity benefits of Nx - cached builds and incremental execution reduce CI times significantly.

**Independent Test**: Can be verified by running `nx affected:lint`, `nx affected:test`, and confirming only changed projects are processed.

### Acceptance Scenarios

1. **Given** Nx projects exist, **When** `nx run-many --target=lint` is executed, **Then** ESLint runs for all projects
2. **Given** Nx projects exist, **When** `nx run-many --target=test` is executed, **Then** Jest runs for all projects
3. **Given** Nx projects exist, **When** `nx run-many --target=typecheck` is executed, **Then** TypeScript type checking runs
4. **Given** CI workflow is updated, **When** `nx affected` replaces `npm run`, **Then** only changed projects are processed
5. **Given** caching is enabled, **When** the same task runs twice, **Then** the second run uses cached results

### Verification Criteria

- [ ] `nx run-many --target=lint` works for all projects
- [ ] `nx run-many --target=test` works for all projects
- [ ] `nx run-many --target=typecheck` works for all projects
- [ ] `nx run-many --target=storybook` works
- [ ] GitHub Actions updated to use `nx affected` or `nx run-many`
- [ ] Caching produces identical artifacts
- [ ] README updated with new commands

---

## Milestone 6: Module Boundaries Configuration (Priority: P3)

### User Story

As a Backpack architect, I want to enforce module boundaries so that components cannot incorrectly depend on each other, maintaining clean architecture and enabling accurate dependency analysis.

**Why this priority**: Module boundaries prevent architectural drift and ensure the dependency graph remains accurate. This is important but not blocking for other functionality.

**Independent Test**: Can be verified by creating an invalid import in a component and confirming ESLint fails with boundary violation error.

### Acceptance Scenarios

1. **Given** Nx projects with tags, **When** ESLint `@nx/enforce-module-boundaries` rule is configured, **Then** invalid imports are flagged as errors
2. **Given** boundary rules exist, **When** a component imports from a forbidden domain, **Then** lint fails with clear error message
3. **Given** boundary rules exist, **When** all current imports are valid, **Then** lint passes without violations

### Verification Criteria

- [ ] All projects have appropriate tags in `project.json`
- [ ] `.eslintrc` includes `@nx/enforce-module-boundaries` rule
- [ ] Invalid imports produce lint errors
- [ ] Current codebase passes boundary checks
- [ ] Documentation explains boundary rules

---

## Milestone 7: Publishing with Nx (Priority: P3, Optional)

### User Story

As a Backpack maintainer, I want releases to be managed by `nx release` so that versioning, changelog generation, and publishing align with the Production Standard requirements.

**Why this priority**: The Production Standard mandates Nx-managed releases. This milestone ensures compliance and enables automated, auditable release processes. However, it can be deferred as the existing release process works.

**Independent Test**: Can be verified by running `nx release --dry-run` and confirming correct version bump, changelog, and tag creation without actual publication.

### Acceptance Scenarios

1. **Given** `nx.json` is configured with release settings, **When** `nx release` is run, **Then** version is bumped based on conventional commits
2. **Given** commits follow conventional format, **When** `nx release` generates changelog, **Then** changes are correctly categorized (feat, fix, breaking)
3. **Given** a release is triggered, **When** `nx release` completes, **Then** git tags are created and package is published to npm
4. **Given** shadow release workflow exists, **When** run on non-critical branch, **Then** release process validates without actual publication

### Verification Criteria

- [ ] `nx.json` includes release configuration
- [ ] Conventional commits enforced (commitizen/husky or CI checks)
- [ ] `nx release --dry-run` produces expected output
- [ ] Shadow release workflow validates on test branch
- [ ] Production workflow updated to use `nx release`
- [ ] Changelogs generated correctly
- [ ] Git tags created on release
- [ ] npm publication successful

### Risks to Monitor

- Misconfiguration causing missed tags or broken changelogs
- Version drift between git tags and package.json

---

## Milestone 8: Dependency Management (Priority: P3, Optional)

### User Story

As a Backpack maintainer, I want dependencies to comply with the TypeScript Monorepo Production Standard so that each library declares its actual dependencies and CI can verify correctness.

**Why this priority**: Production Standard compliance is required but this milestone involves significant refactoring of how dependencies are declared. Can be deferred if time-constrained.

**Independent Test**: Can be verified by running `@nx/dependency-checks` ESLint rule and confirming no missing or extraneous dependencies.

### Acceptance Scenarios

1. **Given** current `packages/package.json`, **When** dependencies are audited, **Then** each component's actual imports are identified
2. **Given** audit results, **When** dependencies are restructured, **Then** shared deps are in root `package.json` and component-specific deps in component `package.json`
3. **Given** restructured dependencies, **When** `@nx/dependency-checks` runs, **Then** no violations are reported
4. **Given** Dependabot is configured, **When** updates are proposed, **Then** they target root `package.json`

### Verification Criteria

- [ ] Dependency audit completed
- [ ] Root `package.json` contains shared production dependencies
- [ ] `@nx/dependency-checks` ESLint rule enabled
- [ ] No dependency violations in CI
- [ ] Dependabot configured for root only
- [ ] `npm ci` succeeds
- [ ] `nx dep-graph` shows accurate dependencies

---

## Milestone 9: Vite Adoption (Priority: P4, Optional - Future Stage)

### User Story

As a Backpack developer, I want the build toolchain to use Vite so that I get faster cold builds, hot reloads, and improved developer experience aligned with Web Foundation stage 2 goals.

**Why this priority**: This is an optimization milestone that can be deferred. It provides significant DX improvements but requires substantial effort to migrate from Gulp/Babel.

**Independent Test**: Can be verified by running both `gulp build` and `vite build` and comparing artifacts for parity.

### Acceptance Scenarios

1. **Given** `vite.config.ts` is created, **When** essential plugins are configured, **Then** React, SCSS, and SVG processing work
2. **Given** Gulp tasks for code generation, **When** migrated to Vite plugins or pre-build hooks, **Then** Icon/Flare/Spinner generation works
3. **Given** both build systems exist, **When** artifacts are compared, **Then** outputs are functionally equivalent
4. **Given** parity is verified, **When** Gulp tasks are removed, **Then** all builds use Vite

### Verification Criteria

- [ ] `vite.config.ts` exists with required plugins
- [ ] Code generation (SVG -> React) works with Vite
- [ ] CJS modules converted to ESM where needed
- [ ] Artifact comparison shows parity
- [ ] All component builds succeed with Vite
- [ ] Gulp tasks removed
- [ ] Documentation updated

### Risks to Monitor

- SVG-to-JS loader gaps requiring custom plugin work
- Subtle output differences breaking consumers

---

## Milestone 10: Vitest Adoption (Priority: P4, Optional - Future Stage)

### User Story

As a Backpack developer, I want tests to run with Vitest so that I get faster test execution with zero-config Jest compatibility.

**Why this priority**: Vitest naturally pairs with Vite and provides significantly faster test execution. Should be done after Vite adoption (M9).

**Independent Test**: Can be verified by running `vitest run` and confirming all tests pass with correct coverage calculation.

### Acceptance Scenarios

1. **Given** `vitest.config.ts` is created, **When** Vitest dependencies are installed, **Then** test runner is configured
2. **Given** Vitest is configured, **When** `vitest run` is executed, **Then** all existing tests pass
3. **Given** tests pass, **When** coverage is calculated, **Then** thresholds are met (70% branches, 75% functions/lines/statements)
4. **Given** Vitest is working, **When** Jest is removed, **Then** all CI tests use Vitest

### Verification Criteria

- [ ] `vitest.config.ts` exists
- [ ] All tests pass with Vitest
- [ ] Coverage thresholds met
- [ ] Jest configuration removed
- [ ] CI updated to use `vitest run`
- [ ] Documentation updated

---

## Edge Cases

- What happens if Nx plugin introduces a peer dependency conflict with existing packages?
- How do we handle if a milestone causes CI to fail - rollback procedure?
- What happens if `nx affected` misses a changed project due to incorrect dependency graph?
- How does caching behave when SVG assets change (code generation)?
- What happens if external dependencies are abandoned during migration?

## Requirements Summary

### Functional Requirements

- **FR-001**: Migration MUST NOT break existing consumer import paths (`@skyscanner/backpack-web/...`)
- **FR-002**: Each milestone MUST be independently deployable to production
- **FR-003**: Each milestone MUST have clear rollback capability
- **FR-004**: Existing `npm run` commands MUST continue working until explicitly deprecated
- **FR-005**: CI pipeline MUST pass at each milestone checkpoint
- **FR-006**: Code generation for Icons/Flare/Spinners MUST work with Nx caching
- **FR-007**: Existing release process MUST be preserved (no migration to `nx release`)

### Non-Functional Requirements

- **NFR-001**: CI time SHOULD decrease after milestone 5 (affected builds)
- **NFR-002**: Local development experience MUST NOT degrade during migration
- **NFR-003**: Documentation MUST be updated at each milestone
- **NFR-004**: Migration SHOULD complete within 14-26 engineering weeks (1 engineer)

## Success Criteria

### Measurable Outcomes

- **SC-001**: All existing tests pass at each milestone
- **SC-002**: Consumer import paths remain unchanged
- **SC-003**: CI pipeline succeeds without manual intervention
- **SC-004**: `nx affected` correctly identifies changed projects
- **SC-005**: Caching produces identical artifacts to non-cached runs
- **SC-006**: Existing release workflow continues to work unchanged
- **SC-007**: Module boundary violations are caught by linting
- **SC-008**: Storybook builds and deploys successfully

## Dependencies & Blockers

### Blockers Requiring Investigation

1. **Import Path Compatibility**: Verify TS/SCSS/icon mixin import paths work after structure changes
2. **Code Generation Caching**: Ensure Nx cache invalidates when SVG assets change
3. **External Dependencies**: Audit for stale/abandoned libs causing conflicts
4. **TypeScript Composite Mode**: Resolve `.d.ts` generation issues with `composite: true`

### Internal Dependencies

- Platform Engineering alignment on project structure
- Web Enablement team review of production standards compliance

### External Dependencies

- Nx plugins and their peer dependencies
- Production Standard requirements from Web Platform

## References

- **Confluence One-Pager**: [Backpack Web: Nx Adoption One Pager](https://skyscanner.atlassian.net/wiki/spaces/Clover/pages/1430062432)
- **Nx Documentation**: [Adding Nx to Existing Project](https://nx.dev/docs/getting-started/start-with-existing-project)
- **Production Standard**: [TypeScript Monorepos](https://skyscanner.atlassian.net/wiki/spaces/WEAV/pages/1388484149)
- **Module Boundaries**: [Nx Enforce Module Boundaries](https://nx.dev/features/enforce-module-boundaries)
- **JPD Link**: [UP-341](https://skyscanner.atlassian.net/browse/UP-341)

## Open Questions

- [ ] Q1: What is the target Nx version to adopt?
- [ ] Q2: Should Global Components be migrated into the same workspace simultaneously or as a follow-up?
- [ ] Q3: What is the timeline commitment for each milestone from stakeholders?
