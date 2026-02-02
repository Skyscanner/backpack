# Implementation Plan: Backpack Nx Migration

**Package Branch**: `001-nx-migration` | **Date**: 2026-01-26 | **Spec**: [spec.md](./spec.md)

**Input**: Migration specification from `/specs/001-nx-migration/spec.md`

## Summary

This implementation plan outlines the technical approach for migrating Backpack Design System's 96-package monorepo from custom npm scripts to Nx-powered build orchestration. The migration is divided into 5 incremental milestones, each independently deployable and providing immediate value.

**Primary Objective**: Establish Nx as the build orchestration layer while preserving all existing tooling (Webpack, Babel, Gulp, Jest, Storybook).

**Approach**: Incremental, non-breaking migration with comprehensive testing at each milestone.

## Technical Context

**Current Stack**:
- **Package Manager**: npm >=10.7.0 with implicit workspaces
- **Build Orchestration**: npm scripts + npm-run-all
- **Transpilation**: Babel 7 (TypeScript 5.9.2, React 18.3.1)
- **Bundling**: Webpack 5
- **Styling**: Sass (sass-embedded 1.90.0) + PostCSS + CSS Modules
- **Testing**: Jest 30 + Testing Library + jest-axe + Percy
- **Linting**: ESLint (@skyscanner/eslint-config-skyscanner 22.6.0) + Stylelint (@skyscanner/stylelint-config-skyscanner 14.2.0)
- **Development**: Storybook 10.1.11
- **CI/CD**: GitHub Actions
- **Git Hooks**: Husky 9.1.3 + lint-staged 16.2.7

**Target Stack** (additions only):
- **Nx**: Latest LTS version (will be determined during Milestone 1)
- **Nx Plugins**: @nx/workspace, @nx/js, @nx/jest, @nx/webpack (optional)
- **Caching**: Local Nx cache (Milestone 1-3), Nx Cloud (Milestone 4 - optional)

**Constraints**:
- Node.js >=18.20.4
- Must maintain exact build output (byte-identical where possible)
- Zero breaking changes to component APIs
- All 96 packages must continue to work
- CI/CD must remain functional throughout migration

## Architecture Decisions

### Resolved Clarifications

The following architectural decisions have been made based on incremental migration principles and minimal disruption approach:

#### AD-001: Nx Cache Storage Strategy
**Decision**: Hybrid approach (Local cache → Nx Cloud)
**Rationale**:
- Start with local Nx cache (Milestone 1-3) for simplicity and zero infrastructure dependencies
- Add Nx Cloud (Milestone 4) after core migration is stable and proven
- Allows team to experience benefits gradually without upfront complexity
- Reduces migration risk by adding distributed caching as an enhancement, not a requirement

#### AD-002: Package Structure Organization
**Decision**: Preserve current `packages/` directory structure
**Rationale**:
- Minimizes migration complexity and risk
- Preserves all import paths across 96 packages
- Maintains compatibility with existing documentation and tooling
- Nx supports custom project structures via `nx.json` configuration
- Aligns with "no breaking changes" constraint
- Can be reconsidered post-migration if banana integration requires it

#### AD-003: Storybook Integration Approach
**Decision**: Custom integration (wrap existing config as Nx targets)
**Rationale**:
- Storybook 10 is already configured and working
- @nx/storybook plugin compatibility untested with current setup
- Lower migration risk by preserving working configuration
- Nx can execute Storybook via custom targets
- Reduces dependencies on Nx ecosystem plugins
- Allows evaluation of @nx/storybook plugin post-migration if beneficial

#### AD-004: Nx Workspace Structure
**Decision**: Single-root workspace with project-based configuration
**Rationale**:
- Each package in `packages/` becomes an Nx project
- Use `project.json` files for per-package Nx configuration
- Root `nx.json` for global Nx settings and defaults
- Enables package-level caching and task orchestration
- Aligns with Backpack's existing package-per-component architecture

#### AD-005: Build Tool Preservation
**Decision**: Keep all existing build tools (Webpack, Babel, Gulp)
**Rationale**:
- Nx acts as orchestration layer, not replacement
- Reduces migration scope and risk
- Allows future tool migrations independently
- Proven tools with established configurations
- Team expertise with current tooling

## Migration Milestones Overview

The migration is structured into 5 milestones, each building on the previous:

### Milestone 1: Nx Foundation (PoC/MVP) - 估计2-3周
**Goal**: Initialize Nx and establish basic build orchestration
**Deliverables**:
- Nx installed and configured
- All packages building via Nx
- Basic caching enabled
- Build output validation (byte-identical verification)

**Success Criteria**:
- `nx build` successfully builds all 96 packages
- Build output matches current `npm run build` output
- Local cache provides >50% cache hit rate on repeated builds
- Documentation: Nx setup guide

### Milestone 2: Testing & Linting Integration - 估计2周
**Goal**: Integrate Jest and linting tools with Nx
**Deliverables**:
- Jest running via Nx with caching
- ESLint and Stylelint integrated
- Accessibility tests (jest-axe) working
- Percy visual regression tests configured
- Selective testing (affected packages only)

**Success Criteria**:
- All tests pass with same results as pre-migration
- Test coverage maintained (70% branches, 75% functions/lines/statements)
- `nx affected:test` correctly identifies changed packages
- Linting works with caching

### Milestone 3: Development Workflow & Storybook - 估计1-2周
**Goal**: Integrate Storybook and optimize developer experience
**Deliverables**:
- Storybook dev server via Nx
- Hot module reloading preserved
- Storybook build via Nx
- Developer workflow documentation
- Performance optimizations

**Success Criteria**:
- Storybook loads all component stories
- HMR works correctly
- Storybook build produces identical output
- Developer satisfaction >80%

### Milestone 4: CI/CD & Distributed Caching - 估计2周
**Goal**: Update CI/CD pipelines and enable distributed caching
**Deliverables**:
- GitHub Actions workflows updated
- Nx Cloud integration (optional)
- Distributed caching configured
- Performance monitoring
- CI/CD documentation

**Success Criteria**:
- All CI checks pass with Nx commands
- CI execution time reduced by >20%
- Nx Cloud cache hit rate >80% (if enabled)
- PR validation workflow unchanged for developers

### Milestone 5: Optimization & Documentation - 估计1周
**Goal**: Polish, optimize, and complete documentation
**Deliverables**:
- Nx generators for new packages (optional)
- Advanced caching strategies
- Complete migration documentation
- Team training materials
- Rollback procedures documented

**Success Criteria**:
- All documentation complete
- Team trained on Nx commands
- No blocking issues reported
- Performance targets met

## Phase 0: Research & Analysis

### Research Completed

Based on spec analysis and Backpack codebase review:

#### Current Build System Analysis
- **96 packages** in `packages/` directory
- **Shared package.json** at `packages/package.json` for published package
- **Custom scripts**: `check-bpk-dependencies`, `upgrade-foundations`, `check-react-versions`
- **Build pipeline**: Gulp → Babel → TypeScript → dist
- **Monorepo structure**: Implicit npm workspaces (no explicit workspaces field)

#### Nx Compatibility Assessment
✅ **Compatible**:
- Nx supports npm as package manager
- Nx can preserve existing directory structures
- Nx executors can wrap existing build scripts
- Nx caching works with any CLI tool (Gulp, Babel, Webpack)

⚠️ **Requires Configuration**:
- Need explicit npm workspaces declaration in root package.json
- Each package needs project.json for Nx project configuration
- Custom scripts need wrapping as Nx targets
- Percy integration needs Nx target definition

❌ **Not Compatible**:
- None identified - all Backpack tooling can integrate with Nx

#### Similar Component Research
**Reference Projects** (mentioned in spec but not accessible):
- banana: Nx migration completed
- falcon: Nx migration completed
- Backpack Nx investigation doc

**Backpack Patterns to Preserve**:
- Component-first architecture (packages/bpk-component-*)
- Monorepo package structure
- Build output format (@skyscanner/backpack-web)
- Testing patterns (Jest + jest-axe)
- Linting configurations

### Technical Dependencies

**Nx Ecosystem Packages** (to be added):
```json
{
  "devDependencies": {
    "nx": "^18.0.0",
    "@nx/workspace": "^18.0.0",
    "@nx/js": "^18.0.0",
    "@nx/jest": "^18.0.0",
    "@nx/webpack": "^18.0.0"
  }
}
```

**Potential Conflicts** (to be monitored):
- Jest 30 compatibility with @nx/jest
- Webpack 5 compatibility with @nx/webpack
- ESLint and Stylelint with Nx caching

## Detailed Milestone Plans

Detailed implementation plans for each milestone are in separate documents:

- [Milestone 1: Nx Foundation](./milestones/milestone-1-nx-foundation.md)
- [Milestone 2: Testing & Linting](./milestones/milestone-2-testing-linting.md)
- [Milestone 3: Development Workflow](./milestones/milestone-3-dev-workflow.md)
- [Milestone 4: CI/CD & Caching](./milestones/milestone-4-cicd-caching.md)
- [Milestone 5: Optimization](./milestones/milestone-5-optimization.md)

## Risk Mitigation

### High-Risk Areas

1. **Build Output Divergence**
   - **Risk**: Nx introduces changes to build output
   - **Mitigation**: Byte-level comparison testing, incremental rollout
   - **Rollback**: Git revert + documented rollback procedure

2. **Package Structure Conflicts**
   - **Risk**: Shared packages/package.json conflicts with Nx expectations
   - **Mitigation**: Explicit workspace configuration, test in spike branch
   - **Rollback**: Revert to pre-migration package.json

3. **Custom Script Integration**
   - **Risk**: check-bpk-dependencies and other custom scripts don't work with Nx
   - **Mitigation**: Wrap as Nx executors with proper dependency tracking
   - **Rollback**: Keep original npm scripts as fallback

4. **CI/CD Disruption**
   - **Risk**: GitHub Actions fail after Nx migration
   - **Mitigation**: Parallel CI workflows during transition, thorough testing
   - **Rollback**: Feature flag to switch between npm and Nx commands

### Rollback Strategy

**Per-Milestone Rollback**:
- Each milestone has a git tag for easy revert
- Rollback procedures documented in milestone plans
- CI/CD can switch between npm and Nx via environment variable
- Team training includes rollback procedures

**Criteria for Rollback**:
- >10% performance regression
- >5 critical bugs in production
- Team productivity drops >20%
- Blocker issues with no fix within 1 week

## Testing Strategy

### Validation Levels

**Level 1: Unit Testing** (Each Milestone)
- All existing tests pass
- No new test failures
- Coverage maintained (70% branches, 75% functions/lines)
- Test execution via Nx produces same results

**Level 2: Integration Testing** (Milestones 2-3)
- Full build pipeline works
- Storybook builds correctly
- Published package (@skyscanner/backpack-web) identical
- Developer workflows unchanged

**Level 3: Performance Testing** (Milestone 4)
- Build time <10% increase
- Test time <10% increase
- Cache hit rate >80%
- CI execution time >20% decrease

**Level 4: User Acceptance** (Milestone 5)
- Team can use Nx commands effectively
- Developer satisfaction >80%
- No blocking issues in 2 weeks post-migration
- Documentation complete

### Automated Validation

**Build Output Comparison**:
```bash
# Before migration
npm run build
tar -czf build-before.tar.gz dist/

# After migration
nx run-many --target=build --all
tar -czf build-after.tar.gz dist/

# Compare
diff -r dist-before/ dist-after/
```

**Test Result Comparison**:
```bash
# Compare test output
npm test > test-before.txt 2>&1
nx run-many --target=test --all > test-after.txt 2>&1
diff test-before.txt test-after.txt
```

## Success Metrics

### Quantitative Targets

| Metric | Baseline | Target | Measurement |
|--------|----------|---------|-------------|
| Build Time (full) | [TBD - measure] | <110% baseline | `time nx run-many --target=build --all` |
| Build Time (cached) | N/A | <5s | `time nx run-many --target=build --all` (2nd run) |
| Test Time (full) | [TBD - measure] | <110% baseline | `time nx run-many --target=test --all` |
| CI Execution Time | [TBD - measure] | <80% baseline | GitHub Actions duration |
| Cache Hit Rate | 0% | >80% | Nx cache statistics |
| Developer Onboarding | N/A | <1 hour | Training time tracking |

### Qualitative Targets

- Team understands Nx commands (survey)
- Nx integrated into daily workflow (adoption rate >90%)
- Documentation rated as "helpful" or better (satisfaction survey)
- No major blockers after 2 weeks (issue tracking)

## Documentation Deliverables

### For Developers

1. **Migration Guide** (`docs/nx-migration/migration-guide.md`)
   - What changed and why
   - New Nx commands equivalent to npm scripts
   - How to use Nx cache effectively
   - Troubleshooting common issues

2. **Nx Command Reference** (`docs/nx-migration/nx-commands.md`)
   - Build commands
   - Test commands
   - Lint commands
   - Development commands
   - CI/CD commands

3. **Troubleshooting Guide** (`docs/nx-migration/troubleshooting.md`)
   - Cache issues
   - Build failures
   - Test issues
   - Common errors and solutions

### For Team Leads

4. **Migration Timeline** (`docs/nx-migration/timeline.md`)
   - Milestone schedule
   - Team capacity requirements
   - Risk mitigation plans
   - Communication plan

5. **Performance Report** (`docs/nx-migration/performance.md`)
   - Baseline vs. post-migration metrics
   - Cache effectiveness analysis
   - CI/CD improvements
   - Recommendations for further optimization

## Next Steps

1. **Milestone 1 Spike** (1 week)
   - Create experimental branch
   - Install Nx and test basic integration
   - Validate architecture decisions
   - Measure baseline performance

2. **Milestone 1 Implementation** (2 weeks)
   - Full Nx initialization
   - All packages configured
   - Build orchestration working
   - Documentation started

3. **Subsequent Milestones** (6-8 weeks total)
   - Follow detailed milestone plans
   - Weekly progress reviews
   - Continuous testing and validation
   - Team training sessions

## References

- **Specification**: [spec.md](./spec.md)
- **Nx Documentation**: https://nx.dev/
- **Backpack Constitution**: `../../.specify/memory/constitution.md`
- **GitHub Actions Workflows**: `.github/workflows/`
- **Current Build Scripts**: `package.json`, `gulpfile.js`, `scripts/`
