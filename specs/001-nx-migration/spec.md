# Migration Specification: Backpack Nx Migration

**Package Branch**: `001-nx-migration`
**Created**: 2026-01-26
**Status**: Draft
**Input**: "Migrate Backpack monorepo to Nx to prepare for integration with banana-based monorepo structure"

## Project Context

This specification outlines the migration of Backpack Design System from its current custom monorepo structure to Nx-powered monorepo. This migration is a prerequisite for future integration with the banana-based monorepo and will establish Nx as the standard monorepo structure across Skyscanner's frontend projects.

**Current State**: Backpack is a 96-package monorepo using custom npm scripts, Gulp, Babel, Webpack, and Storybook for building and managing React components.

**Target State**: Nx-powered monorepo with standardized build orchestration, caching, and task execution while preserving all existing functionality.

**Related Migrations**: This migration builds on lessons learned from banana and falcon migrations to Nx.

## Migration Background & Rationale

### Why Migrate to Nx?

**Business Value**:
- **Standardization**: Align Backpack with banana-based monorepo structure used across Skyscanner
- **Future Integration**: Enable seamless integration with banana monorepo ecosystem
- **Developer Experience**: Provide consistent tooling and workflows across frontend projects
- **Build Performance**: Leverage Nx caching and task orchestration for faster builds
- **Scalability**: Better support for growing number of packages (currently 96+)

### Migration Scope

**In Scope**:
- Nx initialization and configuration
- Build orchestration migration (npm scripts → Nx targets)
- Test execution migration (Jest via Nx)
- Linting migration (ESLint, Stylelint via Nx)
- Storybook integration with Nx
- CI/CD pipeline updates for Nx commands
- Package dependency graph management

**Out of Scope** (for initial migration):
- Build tool replacement (keep existing Webpack, Babel, Gulp)
- Test framework changes (keep Jest, Testing Library)
- Component API changes
- Documentation website migration
- Monorepo structure reorganization (packages remain in `packages/`)

## Current Code Status

### Current Monorepo Structure

```
backpack/
├── packages/               # 96 component packages
│   ├── package.json       # Shared package.json for all packages
│   ├── bpk-animate-height/
│   ├── bpk-component-*/   # ~85 component packages
│   ├── bpk-mixins/        # Sass utilities
│   ├── bpk-react-utils/   # React utilities
│   ├── bpk-stylesheets/   # Base styles
│   └── bpk-theming/       # Theming utilities
├── examples/              # Storybook examples
├── scripts/               # Custom build scripts
├── .storybook/           # Storybook config
├── package.json          # Root workspace config
└── gulpfile.js           # Gulp tasks
```

### Current Build System

**Package Management**: npm workspaces (implicit via `packages/` directory)
**Build Orchestration**: npm scripts + npm-run-all
**Transpilation**: Babel 7 (TypeScript, React, modern JS)
**Bundling**: Webpack 5 (Storybook, production builds)
**Styling**: Sass (sass-embedded) + PostCSS + CSS Modules
**Testing**: Jest 30 + Testing Library
**Linting**: ESLint (Skyscanner config) + Stylelint
**Type Checking**: TypeScript 5.9.2
**CI/CD**: GitHub Actions

### Key Build Scripts

```json
{
  "build": "run-s build:*",
  "test": "npm run lint && npm run check-react-versions && npm run check-bpk-dependencies && npm run jest",
  "lint": "npm run lint:js && npm run lint:scss",
  "storybook": "storybook dev -p 9001",
  "transpile": "npm run build && run-s transpile:*"
}
```

### Critical Dependencies

**Build Tools**:
- Webpack 5 (bundling)
- Babel 7 (transpilation)
- Gulp 5 (asset processing)
- npm-run-all (script orchestration)

**Testing**:
- Jest 30 (test runner)
- jest-axe (accessibility testing)
- Testing Library (component testing)
- Percy (visual regression)

**Development**:
- Storybook 10 (component development)
- Husky 9 (git hooks)
- lint-staged 16 (pre-commit linting)

## User Scenarios & Testing

### User Story 1 - Developer Building Backpack (Priority: P1)

**Why this priority**: Core development workflow - must work for any development to continue

**Independent Test**: Developer can run build command and get successful output with all packages transpiled

**Acceptance Scenarios**:

1. **Given** developer has cloned Backpack repository, **When** developer runs `npm install` and `npm run build`, **Then** all 96 packages build successfully with same output as before migration
2. **Given** developer modifies a single component, **When** developer runs build again, **Then** only affected packages rebuild (via Nx caching)
3. **Given** developer runs build with verbose flag, **When** build executes, **Then** developer sees clear task execution graph and timing information

---

### User Story 2 - Developer Running Tests (Priority: P1)

**Why this priority**: Testing is critical for quality assurance and PR validation

**Independent Test**: Developer can run all tests and get same pass/fail results as before migration

**Acceptance Scenarios**:

1. **Given** developer has made changes to a component, **When** developer runs `npm test`, **Then** all tests (unit, accessibility, lint) execute successfully
2. **Given** developer wants to run tests for one package, **When** developer runs test command with package filter, **Then** only that package's tests execute
3. **Given** developer runs tests multiple times without changes, **When** tests execute, **Then** Nx cache provides instant results for unchanged packages

---

### User Story 3 - Developer Using Storybook (Priority: P2)

**Why this priority**: Essential for component development and documentation but not blocking for other work

**Independent Test**: Developer can start Storybook and see all component examples working

**Acceptance Scenarios**:

1. **Given** developer starts Storybook, **When** Storybook loads, **Then** all component stories display correctly as before migration
2. **Given** developer makes changes to component, **When** Storybook hot-reloads, **Then** changes reflect immediately
3. **Given** developer builds Storybook for production, **When** build completes, **Then** static site works identically to current version

---

### User Story 4 - CI/CD Pipeline Execution (Priority: P1)

**Why this priority**: CI/CD must work for PR validation and releases to continue

**Independent Test**: GitHub Actions workflow completes successfully with Nx commands

**Acceptance Scenarios**:

1. **Given** PR is opened with component changes, **When** CI runs, **Then** all checks (lint, test, build, Percy) pass or fail same as before
2. **Given** multiple PRs run simultaneously, **When** CI executes, **Then** Nx distributed caching reduces redundant work
3. **Given** release workflow runs, **When** packages are published, **Then** npm packages publish identically to current process

---

### User Story 5 - Developer Adding New Package (Priority: P3)

**Why this priority**: Less frequent activity but important for extending Backpack

**Independent Test**: Developer can create new package and integrate it with Nx

**Acceptance Scenarios**:

1. **Given** developer creates new package following Backpack structure, **When** developer runs build, **Then** new package integrates seamlessly with Nx
2. **Given** new package has dependencies on other packages, **When** dependency graph is generated, **Then** Nx correctly identifies and orders build tasks
3. **Given** developer wants to generate new package, **When** developer runs Nx generator (if available), **Then** package scaffolding follows Backpack conventions

---

### Edge Cases

- What happens when Nx cache is corrupted or stale?
- How does migration handle packages with custom build scripts?
- What happens if Nx version conflicts with other tooling?
- How does migration preserve Git history and blame information?
- What happens when developer switches between pre-migration and post-migration branches?
- How are Nx cloud credentials managed across team?
- What happens when npm workspaces behavior differs from Nx?
- How are monorepo-wide operations (like version bumping) handled?

## Requirements

### Functional Requirements

#### Build System Migration

- **FR-001**: Migration MUST preserve exact build output for all packages (byte-identical where possible)
- **FR-002**: Migration MUST support all existing npm scripts as Nx targets
- **FR-003**: Migration MUST maintain current transpilation pipeline (Babel → TypeScript → dist)
- **FR-004**: Migration MUST preserve Webpack bundling for Storybook and production builds
- **FR-005**: Migration MUST maintain Gulp tasks for asset processing (SVG minification, CSS copying)
- **FR-006**: Migration MUST support parallel execution of independent package builds
- **FR-007**: Migration MUST enable Nx caching for build, test, and lint tasks
- **FR-008**: Migration MUST maintain current package interdependency resolution

#### Testing Migration

- **FR-009**: Migration MUST preserve all Jest configurations (coverage thresholds, module mappers, test patterns)
- **FR-010**: Migration MUST maintain jest-axe accessibility testing integration
- **FR-011**: Migration MUST support selective test execution (single package, changed packages only)
- **FR-012**: Migration MUST preserve Percy visual regression testing workflow
- **FR-013**: Migration MUST maintain test result reporting format for CI

#### Linting Migration

- **FR-014**: Migration MUST preserve ESLint configuration (@skyscanner/eslint-config-skyscanner)
- **FR-015**: Migration MUST preserve Stylelint configuration (@skyscanner/stylelint-config-skyscanner)
- **FR-016**: Migration MUST maintain lint-staged pre-commit hook behavior
- **FR-017**: Migration MUST support selective linting (changed files only)

#### Development Workflow

- **FR-018**: Migration MUST maintain Storybook development server functionality
- **FR-019**: Migration MUST preserve hot module reloading (HMR) for Storybook
- **FR-020**: Migration MUST maintain TypeScript type checking workflow
- **FR-021**: Migration MUST preserve Husky git hooks (pre-commit, pre-push)
- **FR-022**: Migration MUST support developer ability to run tasks from any directory in monorepo

#### Package Management

- **FR-023**: Migration MUST maintain npm as package manager (not switching to pnpm/yarn)
- **FR-024**: Migration MUST preserve package.json structure for published package (@skyscanner/backpack-web)
- **FR-025**: Migration MUST maintain dependency hoisting behavior
- **FR-026**: Migration MUST support custom npm scripts (check-bpk-dependencies, upgrade-foundations)

#### CI/CD Integration

- **FR-027**: Migration MUST update GitHub Actions workflows to use Nx commands
- **FR-028**: Migration MUST maintain PR validation workflow (lint, test, build, visual regression)
- **FR-029**: Migration MUST preserve release workflow and npm publishing process
- **FR-030**: Migration MUST maintain Danger.js integration for PR automation
- **FR-031**: Migration MUST support distributed caching via Nx Cloud (optional enhancement)

#### Documentation & Developer Experience

- **FR-032**: Migration MUST provide migration guide for team members
- **FR-033**: Migration MUST document new Nx commands equivalent to existing npm scripts
- **FR-034**: Migration MUST preserve existing documentation (README, CONTRIBUTING, CODE_REVIEW_GUIDELINES)
- **FR-035**: Migration MUST maintain compatibility with VS Code workspace settings
- **FR-036**: Migration MUST provide troubleshooting guide for common Nx issues

### Non-Functional Requirements

#### Performance

- **NFR-001**: Build time for full monorepo MUST NOT increase by more than 10% from current baseline
- **NFR-002**: Test execution time MUST NOT increase by more than 10% from current baseline
- **NFR-003**: Nx cache hit rate SHOULD achieve >80% for repeated builds on same commit
- **NFR-004**: CI pipeline execution time SHOULD decrease by at least 20% with Nx caching

#### Reliability

- **NFR-005**: Migration MUST maintain 100% test pass rate (all existing tests pass)
- **NFR-006**: Migration MUST maintain current code coverage thresholds (70% branches, 75% functions/lines/statements)
- **NFR-007**: Migration MUST NOT introduce breaking changes to component APIs
- **NFR-008**: Migration MUST maintain stable CI builds (no flaky tests introduced)

#### Maintainability

- **NFR-009**: Nx configuration MUST follow Nx best practices and conventions
- **NFR-010**: Migration MUST minimize custom Nx executors (prefer built-in or community plugins)
- **NFR-011**: Migration MUST document all Nx configuration decisions in docs/nx-migration/
- **NFR-012**: Migration MUST be reversible (ability to rollback if critical issues found)

#### Compatibility

- **NFR-013**: Migration MUST maintain Node.js >=18.20.4 requirement
- **NFR-014**: Migration MUST maintain npm >=10.7.0 requirement
- **NFR-015**: Migration MUST work on macOS, Linux, and Windows (WSL)
- **NFR-016**: Migration MUST maintain compatibility with current developer tooling (VS Code, IDEs)

#### Scalability

- **NFR-017**: Nx configuration MUST support future addition of packages without manual updates
- **NFR-018**: Nx task graph MUST correctly handle up to 200 packages (2x current)
- **NFR-019**: Migration MUST support potential future integration with banana monorepo

## Success Criteria

### Measurable Outcomes

- **SC-001**: All 96 packages build successfully with Nx commands
- **SC-002**: All existing tests pass with same results as pre-migration (0 new failures)
- **SC-003**: Code coverage meets established thresholds (70% branches, 75% functions/lines/statements)
- **SC-004**: Storybook development server starts and hot-reloads correctly
- **SC-005**: CI/CD pipeline completes successfully on pull requests
- **SC-006**: npm package publishes successfully with identical contents to pre-migration
- **SC-007**: Developer documentation includes complete Nx command reference and migration guide
- **SC-008**: Nx dependency graph visualization accurately reflects package relationships
- **SC-009**: Build cache hit rate exceeds 80% for unchanged code
- **SC-010**: Team members can complete migration training and use Nx commands effectively
- **SC-011**: No blocking issues reported in first 2 weeks post-migration
- **SC-012**: All GitHub Actions workflows pass with Nx commands

### Quality Gates

**Pre-Milestone Completion**:
- All requirements (FR and NFR) implemented and verified
- All tests passing with no regressions
- Documentation complete and reviewed
- Team training conducted
- Rollback plan documented and tested

**Post-Milestone Monitoring** (first 4 weeks):
- CI/CD success rate maintains >95%
- No critical bugs related to Nx migration
- Developer satisfaction survey shows >80% positive feedback
- Build performance meets or exceeds targets

## Migration Scope & Phases

This migration will be split into 3-5 meaningful milestones, each independently deployable and providing value. Detailed milestone breakdown and tasks will be documented separately in milestone-specific documents.

### Proposed Milestone Structure

**Milestone 1: Nx Foundation & Core Build** (MVP)
- Nx initialization with minimal configuration
- Basic build orchestration for all packages
- Preserve existing build scripts as Nx targets
- Validate build output matches pre-migration

**Milestone 2: Testing & Linting Integration**
- Jest integration with Nx
- ESLint and Stylelint integration
- Test execution via Nx with caching
- Selective test/lint execution

**Milestone 3: Development Workflow & Storybook**
- Storybook integration with Nx
- Hot module reloading preservation
- Developer experience enhancements
- Local caching optimization

**Milestone 4: CI/CD Pipeline Migration**
- GitHub Actions workflow updates
- Nx Cloud integration (optional)
- Distributed caching configuration
- Performance monitoring

**Milestone 5: Advanced Features & Optimization** (Optional)
- Nx generators for new packages
- Custom Nx executors (if needed)
- Advanced caching strategies
- Documentation and training materials

## Known Challenges & Blockers

### Identified Blockers

1. **Custom Build Scripts**: Backpack has custom scripts (check-bpk-dependencies, upgrade-foundations) that need Nx integration
   - **Impact**: Medium - affects package validation
   - **Mitigation**: Wrap custom scripts as Nx targets

2. **Gulp Tasks**: Gulp is used for asset processing (SVG minification)
   - **Impact**: Medium - affects build pipeline
   - **Mitigation**: Keep Gulp tasks, execute via Nx targets

3. **Monorepo Package Structure**: packages/ directory has shared package.json
   - **Impact**: High - may conflict with Nx expectations
   - **Mitigation**: [NEEDS CLARIFICATION: Package structure reorganization]

4. **npm Workspaces Implicit**: Currently using directory structure, not explicit workspaces config
   - **Impact**: Medium - Nx may expect formal workspace declaration
   - **Mitigation**: Add workspaces field to root package.json if needed

5. **Percy Integration**: Visual regression testing may need Nx-specific configuration
   - **Impact**: Low - affects visual testing only
   - **Mitigation**: Run Percy as separate Nx target

### Items Requiring Investigation

These areas require deeper investigation before finalizing migration approach:

1. **[NEEDS CLARIFICATION: Nx cache storage strategy]**
   - Should we use local cache only, Nx Cloud, or hybrid approach?
   - **Impact**: Affects CI/CD performance and team experience
   - **Investigation needed**: Evaluate banana and falcon's cache strategies

2. **[NEEDS CLARIFICATION: Package structure reorganization]**
   - Should packages remain in flat `packages/` directory or move to Nx-recommended structure?
   - **Impact**: Major - affects import paths, documentation, and migration complexity
   - **Investigation needed**: Review Nx best practices vs. Backpack conventions

3. **[NEEDS CLARIFICATION: Storybook Nx plugin vs. custom integration]**
   - Should we use @nx/storybook plugin or maintain custom Storybook config?
   - **Impact**: Affects development workflow and Storybook functionality
   - **Investigation needed**: Test @nx/storybook compatibility with Backpack setup

### Pre-Alignment & Preparation

Before starting implementation, the following must be aligned:

1. **Team Availability**: Confirm team has bandwidth for migration and can dedicate time for testing
2. **Migration Timeline**: Establish target dates for each milestone
3. **Feature Freeze**: Determine if feature freeze needed during critical migration phases
4. **Stakeholder Communication**: Notify consuming teams about potential changes
5. **Rollback Strategy**: Define criteria and process for rolling back if issues occur
6. **Success Metrics**: Agree on quantitative metrics for measuring migration success

## Migration Dependencies

### Internal Dependencies

**Required Knowledge**:
- banana Nx migration documentation (https://skyscanner.atlassian.net/wiki/spaces/UP1/pages/1353404332)
- falcon Nx migration documentation (https://skyscanner.atlassian.net/wiki/spaces/WOM/pages/1418986155)
- Backpack Nx investigation doc (https://skyscanner.atlassian.net/wiki/x/YAU9VQ)

**Required Access**:
- Backpack repository write access
- GitHub Actions secrets (Nx Cloud tokens if using)
- npm publishing credentials
- Confluence documentation space

**Required Tools**:
- Node.js >=18.20.4
- npm >=10.7.0
- Nx CLI (will be installed as devDependency)

### External Dependencies

**Nx Ecosystem**:
- @nx/workspace (core Nx functionality)
- @nx/js (JavaScript/TypeScript projects)
- @nx/webpack (Webpack integration)
- @nx/jest (Jest integration)
- @nx/storybook (Storybook integration, if used)

**Potential Conflicts**:
- Nx version compatibility with current tooling (Jest 30, Webpack 5, TypeScript 5.9.2)
- npm workspaces vs. Nx workspace detection
- ESLint and Stylelint integration with Nx

## Assumptions

The following assumptions are made for this migration:

1. **Build Tool Continuity**: We will keep existing build tools (Webpack, Babel, Gulp) and not replace them with Nx alternatives
2. **Package Manager**: npm remains the package manager (not migrating to pnpm or yarn)
3. **Monorepo Structure**: packages/ directory structure will remain (not reorganizing to apps/ and libs/)
4. **Incremental Migration**: Migration will be done incrementally in milestones, not big-bang approach
5. **No Breaking Changes**: Component APIs and exported interfaces will not change
6. **CI/CD Infrastructure**: GitHub Actions will remain as CI/CD platform
7. **Team Training**: Team will receive training on Nx commands and workflows
8. **Rollback Safety**: Ability to rollback to pre-migration state if critical issues found
9. **banana Integration**: Future integration with banana monorepo is planned but not part of initial migration
10. **AI Implementation**: Implementation will be attempted using AI assistance where feasible

## Out of Scope

The following are explicitly out of scope for this migration:

### Not Changing

- Component APIs or interfaces
- Build tool replacement (keeping Webpack, Babel, Gulp)
- Test framework changes (keeping Jest, Testing Library)
- Package structure reorganization (packages remain in packages/)
- npm package publishing process
- Backpack constitution or architecture decisions
- Component visual design or functionality
- Documentation website infrastructure
- Monorepo-wide version management approach

### Future Enhancements

These may be considered in future phases after successful migration:

- Integration with banana monorepo
- Migration from Webpack to Vite/esbuild
- Advanced Nx features (affected commands for CI optimization)
- Nx generators for new component scaffolding
- Distributed task execution
- Nx Cloud remote caching

## References

- **Nx Documentation**: https://nx.dev/getting-started/intro
- **banana Nx Migration**: https://skyscanner.atlassian.net/wiki/spaces/UP1/pages/1353404332
- **banana Nx Follow-up**: https://skyscanner.atlassian.net/wiki/spaces/UP1/pages/1362971958
- **falcon Nx Migration**: https://skyscanner.atlassian.net/wiki/spaces/WOM/pages/1418986155
- **Backpack Nx Investigation**: https://skyscanner.atlassian.net/wiki/x/YAU9VQ
- **Backpack Constitution**: `.specify/memory/constitution.md`
- **Backpack Repository**: https://github.com/Skyscanner/backpack
- **Skyscanner GitHub**: https://github.com/Skyscanner

## Open Questions

The following questions require clarification before proceeding to implementation planning:

1. **Q1**: Which Nx caching strategy should we adopt? (See [NEEDS CLARIFICATION: Nx cache storage strategy] in Known Challenges)
2. **Q2**: Should we maintain current package structure or adopt Nx conventions? (See [NEEDS CLARIFICATION: Package structure reorganization])
3. **Q3**: Should we use @nx/storybook plugin or custom integration? (See [NEEDS CLARIFICATION: Storybook Nx plugin vs. custom integration])
4. **Q4**: What is the migration timeline and are there any feature freeze requirements?
5. **Q5**: Are there specific performance benchmarks from banana/falcon migrations we should target?
6. **Q6**: Should we integrate Nx Cloud from the start or add it later?
7. **Q7**: How do we handle the unique packages/package.json shared package structure?
8. **Q8**: What access to banana and falcon repositories is available for reference implementation?

## Next Steps

After this specification is approved:

1. **Clarify Open Questions**: Get answers to questions above through discussion with stakeholders
2. **Create Milestone Plans**: Generate detailed plan.md for each milestone
3. **Establish Baseline Metrics**: Measure current build/test performance for comparison
4. **Set Up Spike Branch**: Create experimental branch to validate Nx integration approach
5. **Review banana/falcon PRs**: Study actual migration commits from referenced projects
6. **Update Specification**: Refine spec based on spike learnings and clarifications
