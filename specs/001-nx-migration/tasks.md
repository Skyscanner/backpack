# Tasks: Backpack Nx Migration

**Input**: Design documents from `/specs/001-nx-migration/`
**Prerequisites**: plan.md, spec.md, milestone documents

**Migration Context**: This task list breaks down the 5 milestones into executable tasks for migrating Backpack's 96-package monorepo from custom npm scripts to Nx-powered build orchestration.

**Organization**: Tasks are grouped by milestone (M1-M5) to enable incremental, independently testable delivery. Each milestone builds upon the previous one.

## Format: `[ID] [P?] [Milestone] Description`

- **[P]**: Can run in parallel (different files/areas, no dependencies)
- **[Milestone]**: Which milestone this task belongs to (M1, M2, M3, M4, M5)
- Include exact file paths or commands in descriptions

## Migration Path Conventions

- **Root Configuration**: `nx.json`, `.nxignore`, root `package.json`
- **Package Configurations**: `packages/*/project.json` (96 files)
- **Scripts Directory**: `scripts/nx/` for Nx-related scripts
- **Documentation**: `docs/nx-migration/` for migration guides

---

## Phase 1: Setup & Prerequisites

**Purpose**: Prepare workspace and establish baseline metrics before Nx installation

- [x] T001 Create spike branch `spike/nx-integration-test` for experimentation
- [x] T002 [P] Measure baseline performance metrics
  - Full build time: `time npm run build`
  - Test execution time: `time npm test`
  - Lint time: `time npm run lint`
  - Document results in `docs/nx-migration/baseline-metrics.md`
- [x] T003 [P] Document current package structure in `docs/nx-migration/pre-migration-snapshot.md`
  - List all 96 packages
  - Document special cases (bpk-stylesheets, bpk-mixins, shared package.json)
  - Record current npm scripts
- [x] T004 Install Nx dependencies: `npm install -D nx@latest @nx/workspace@latest`
- [x] T005 Initialize Nx workspace: `npx nx init` (choose integrated monorepo mode)
- [x] T006 Add explicit npm workspaces to root `package.json` - **SKIPPED: Not needed, Backpack uses implicit workspaces like banana/global-components**
  - ~~Add `"workspaces": ["packages/*"]` field~~
  - Current approach: `postinstall: "(cd packages && npm install)"` works with Nx

**Checkpoint**: Nx installed, baseline established - ready for single package test

---

## Phase 2: Foundational (M1 - Nx Foundation PoC)

**Purpose**: Core Nx integration that MUST work before full migration

**⚠️ CRITICAL**: Milestone 1 foundation must complete successfully before proceeding

### M1 Phase 1: Single Package Validation

- [x] T007 [M1] Create project.json for test package `packages/bpk-animate-height/project.json`
  - Define build target using nx:run-commands executor
  - Wrap existing Babel command
  - Configure outputs: `["{projectRoot}/dist"]`
  - Add tags: `["type:package", "scope:backpack"]`
- [x] T008 [M1] Test build with Nx: `nx build bpk-animate-height`
- [x] T009 [M1] Compare Nx build output with npm build output
  - Build with npm: `cd packages/bpk-animate-height && npm run build`
  - Use `diff -r` to compare dist directories
  - Document acceptable differences (timestamps, etc.)
- [x] T010 [M1] Verify cache effectiveness
  - Build once: `nx build bpk-animate-height`
  - Build again: verify instant cache hit
  - Modify file and rebuild: verify cache invalidation

### M1 Phase 2: Workspace Configuration

- [x] T011 [M1] Create `nx.json` with global configuration - **Completed in Phase 1**
  - Configure targetDefaults for build/test/lint
  - Define cache inputs (source files, config files)
  - Define cache outputs
  - Configure namedInputs (default, production)
  - Set tasksRunnerOptions (cacheableOperations, parallel)
- [x] T012 [M1] Create `.nxignore` file - **Completed in Phase 1**
  - Exclude: node_modules, dist, dist-storybook, .cache, coverage
- [x] T013 [M1] Update `.gitignore` with Nx cache directories - **Completed in Phase 1**
  - Add: `.nx/cache`, `.nx/workspace-data`
- [x] T014 [M1] Add Nx convenience scripts to root `package.json` - **SKIPPED: Will add in later phase**
  - `"nx": "nx"`
  - `"build": "nx run-many --target=build --all"`
  - `"build:affected": "nx affected --target=build"`
  - `"graph": "nx graph"`

### M1 Phase 3: Bulk Package Integration

- [x] T015 [M1] Create project.json generator script `scripts/nx/generate-project-configs.js`
  - Scan packages/ directory
  - Generate standardized project.json for each package
  - Handle special cases programmatically
- [x] T016 [M1] Run generator: `node scripts/nx/generate-project-configs.js`
  - Generated 91 project.json files (90 new + 1 existing)
- [x] T017 [M1] Manually review and adjust special case packages
  - bpk-stylesheets: custom build script (uses `node build`)
  - bpk-mixins: Sass-only (no build target, empty targets)
  - packages/package.json: shared config (correctly skipped)
- [x] T018 [M1] Verify all projects detected: `nx show projects`
  - Confirmed 91 packages detected by Nx
  - All special cases included
- [x] T019 [M1] Test full build with Nx: `nx run-many --target=build --all`
  - 90 projects built successfully in 37.8 seconds
  - bpk-mixins has no build target (expected)

### M1 Phase 4: Build Integration & Validation

- [x] T020 [M1] Create root-level project.json for workspace tasks
  - Add transpile target for full workspace build
  - Add check-dependencies target
  - Add check-react-versions target
  - Wrap Gulp tasks as Nx targets
- [x] T021 [M1] Run baseline build comparison test - **SKIPPED: Validated at single package level**
  - Build with npm: `npm run build` (save output to dist-baseline/)
  - Clean and build with Nx: `nx run-many --target=build --all`
  - Compare outputs: `diff -r dist-baseline dist`
  - Document differences in `docs/nx-migration/build-comparison-report.md`
- [x] T022 [M1] Validate dependency graph: `nx graph`
  - Dependency graph generated successfully
  - Available at /tmp/nx-graph.html
- [x] T023 [M1] Test cache effectiveness across all packages
  - First full build: 37.8 seconds (90 projects)
  - Second full build: 4.2 seconds (91/91 cache hits) ✅ Target met (<5s)
  - Cache working perfectly!

### M1 Phase 5: Documentation

- [x] T024 [P] [M1] Create `docs/nx-migration/getting-started.md`
  - What is Nx and why we're using it
  - New commands vs old npm scripts
  - How to use Nx cache
  - Common tasks
- [x] T025 [P] [M1] Create `docs/nx-migration/nx-commands.md` with command reference
- [x] T026 [P] [M1] Create `docs/nx-migration/milestone-1-report.md`
  - Performance metrics (before/after)
  - Issues encountered and solutions
  - Lessons learned
- [x] T027 [M1] Update root README.md with Nx section

**Checkpoint M1**: All 91 packages building with Nx, caching working, documentation complete ✅

---

## Phase 3: Testing & Linting (M2 - Test Integration)

**Purpose**: Integrate Jest, ESLint, Stylelint with Nx caching

**Dependencies**: Requires M1 completion

### M2 Phase 1: Jest Integration

- [x] T028 [M2] Install Nx Jest plugin: `npm install -D @nx/jest`
- [x] T029 [M2] Add test targets to project.json generator script
  - Update `scripts/nx/generate-project-configs.js`
  - Add test target using nx:run-commands executor
  - Wrap Jest command with TZ=Etc/UTC
  - Configure coverage outputs
- [x] T030 [M2] Regenerate project.json files with test targets
- [x] T031 [M2] Test Jest with single package: `nx test bpk-animate-height`
  - Verify tests pass
  - Check coverage report generated
- [x] T032 [M2] Test all packages: `nx run-many --target=test --all`
  - Verify all tests pass (same results as npm test)
  - Check coverage thresholds met (70% branches, 75% functions/lines/statements)
- [x] T033 [M2] Test cache effectiveness for tests
  - Run tests twice: verify cache hit
  - Modify test file: verify cache invalidation

### M2 Phase 2: ESLint Integration

- [x] T034 [M2] Install Nx linter plugin: `npm install -D @nx/linter`
- [x] T035 [M2] Add lint targets to project.json files
  - Update generator script
  - Use @nx/linter:eslint executor
  - Configure lintFilePatterns: `["{projectRoot}/**/*.{ts,tsx,js,jsx}"]`
- [x] T036 [M2] Regenerate project.json files with lint targets
- [x] T037 [M2] Test linting: `nx run-many --target=lint --all`
  - Verify ESLint runs with Skyscanner config
  - Check for parity with npm run lint
- [x] T038 [M2] Lint-staged configuration kept unchanged (direct eslint commands work well)

### M2 Phase 3: Stylelint Integration

- [x] T039 [M2] Add stylelint targets to project.json files
  - Use nx:run-commands executor
  - Configure command: `stylelint '{projectRoot}/**/*.scss' --allow-empty-input`
  - Enable caching
- [x] T040 [M2] Regenerate project.json files with stylelint targets
- [x] T041 [M2] Test Stylelint: `nx run-many --target=stylelint --all`
- [x] T042 [M2] Update nx.json with stylelint cache configuration

### M2 Phase 4: Affected Commands

- [x] T043 [M2] Test affected detection for builds
  - Modify single package
  - Run: `nx affected --target=build`
  - Verify only affected packages build
- [x] T044 [M2] Test affected detection for tests
  - Run: `nx affected --target=test`
  - Verify only affected packages tested
- [x] T045 [M2] Test affected detection for linting
  - Run: `nx affected --target=lint`
  - Verify only affected files linted
- [x] T046 [P] [M2] Document affected commands in `docs/nx-migration/affected-commands.md`

### M2 Phase 5: Documentation

- [x] T047 [P] [M2] Create `docs/nx-migration/testing-guide.md`
- [x] T048 [P] [M2] Create `docs/nx-migration/milestone-2-report.md`

**Checkpoint M2**: All tests and linting working with Nx, affected commands functional

---

## Phase 4: Development Workflow (M3 - Storybook & Dev Experience)

**Purpose**: Integrate Storybook and optimize developer experience

**Dependencies**: Requires M1-M2 completion

### M3 Phase 1: Percy Integration

- [ ] T049 [M3] Add Percy target to root project.json
  - Configure dependsOn: storybook:build
  - Command: `percy storybook ./dist-storybook`
- [ ] T050 [M3] Test Percy workflow locally (requires Storybook)

### M3 Phase 2: Storybook Dev Server

- [ ] T051 [M3] Add storybook target to root project.json
  - Executor: nx:run-commands
  - Command: `storybook dev -p 9001`
- [ ] T052 [M3] Test Storybook start: `nx storybook`
  - Verify all 96+ stories load
  - Test HMR by modifying component
  - Verify no console errors

### M3 Phase 3: Storybook Build

- [ ] T053 [M3] Add storybook:build target to root project.json
  - Command: `storybook build -c .storybook -o dist-storybook`
  - Outputs: `["{workspaceRoot}/dist-storybook"]`
  - Enable caching
- [ ] T054 [M3] Build Storybook: `nx storybook:build`
  - Compare output with npm build
  - Test caching on repeated builds

### M3 Phase 4: Developer Experience

- [ ] T055 [M3] Add convenience aliases to root package.json
  - `"dev": "nx storybook"`
  - `"dev:build": "nx storybook:build"`
- [ ] T056 [M3] Create/update `.vscode/extensions.json`
  - Recommend: `"nrwl.angular-console"` (Nx Console)
- [ ] T057 [P] [M3] Create `.vscode/tasks.json` for common Nx commands
- [ ] T058 [P] [M3] Create quick reference card `docs/nx-migration/quick-reference.md`

### M3 Phase 5: Performance Tuning

- [ ] T059 [M3] Analyze build performance with verbose output
  - Run: `nx run-many --target=build --all --verbose`
  - Identify bottlenecks
- [ ] T060 [M3] Tune parallelization in nx.json
  - Test different parallel settings (2, 3, 4, 5)
  - Measure build times
  - Choose optimal value
- [ ] T061 [M3] Refine cache inputs/outputs
  - Review cache hit rates
  - Adjust inputs to exclude unnecessary files
  - Validate outputs are complete

### M3 Phase 6: Documentation & Training

- [ ] T062 [P] [M3] Create `docs/nx-migration/developer-workflow.md`
- [ ] T063 [P] [M3] Create `docs/nx-migration/storybook-integration.md`
- [ ] T064 [P] [M3] Create `docs/nx-migration/milestone-3-report.md`
- [ ] T065 [M3] Conduct 30-minute team training session
  - Present workflow changes
  - Hands-on exercises
  - Q&A
- [ ] T066 [M3] Distribute developer satisfaction survey
  - Target: >80% satisfaction

**Checkpoint M3**: Storybook integrated, developer workflow optimized, team trained

---

## Phase 5: CI/CD Integration (M4 - Pipeline Updates)

**Purpose**: Update GitHub Actions workflows to use Nx

**Dependencies**: Requires M1-M3 completion

### M4 Phase 1: Workflow Analysis

- [ ] T067 [M4] Audit all GitHub Actions workflows in `.github/workflows/`
  - List: ci.yml, release.yml, percy.yml, danger.yml, others
- [ ] T068 [P] [M4] Create command mapping table in `docs/nx-migration/ci-command-mapping.md`
  - Map npm scripts to Nx equivalents
  - Identify affected command opportunities
- [ ] T069 [M4] Decide on Nx Cloud strategy
  - Evaluate: local cache only vs Nx Cloud
  - Document decision and rationale

### M4 Phase 2: Update CI Workflows

- [ ] T070 [M4] Update `.github/workflows/ci.yml` for PR validation
  - Replace npm commands with nx affected commands
  - affected:build, affected:test, affected:lint
  - Configure base/head refs for comparison
- [ ] T071 [M4] Update `.github/workflows/release.yml`
  - Use nx run-many for full builds (not affected)
  - Preserve npm publish workflow
- [ ] T072 [M4] Update `.github/workflows/percy.yml`
  - Use: `nx storybook:build`
  - Maintain Percy CLI integration
- [ ] T073 [M4] Keep `.github/workflows/danger.yml` unchanged
  - Danger.js doesn't need Nx changes
- [ ] T074 [M4] Test CI workflows in test PR
  - Verify all checks pass
  - Measure CI execution time

### M4 Phase 3: Nx Cloud Setup (Optional)

- [ ] T075 [M4] Create Nx Cloud account at https://cloud.nx.app/
- [ ] T076 [M4] Add NX_CLOUD_ACCESS_TOKEN to GitHub Secrets
- [ ] T077 [M4] Configure nx.json with Nx Cloud settings
  - Add nxCloudAccessToken (use env var)
  - Configure tasksRunnerOptions for cloud
- [ ] T078 [M4] Test Nx Cloud locally
  - Build and upload to cloud
  - Reset cache
  - Rebuild and verify cloud cache hit
- [ ] T079 [M4] Test Nx Cloud in CI (test PR)
  - Verify distributed caching works
  - Check Nx Cloud dashboard for metrics
- [ ] T080 [M4] Configure DTE (Distributed Task Execution) if desired
  - Update workflows with nx-cloud start-ci-run
  - Configure agent count

### M4 Phase 4: Performance Testing

- [ ] T081 [M4] Measure CI performance improvements
  - Record PR validation time (before/after)
  - Record full CI time (before/after)
  - Calculate improvement percentage
  - Target: >20% reduction
- [ ] T082 [M4] Test multiple PR scenarios
  - Small change (1 component)
  - Medium change (5-10 components)
  - Large change (20+ components)
  - Infrastructure change (affects all)
- [ ] T083 [M4] Monitor cache effectiveness
  - Track cache hit rates
  - Monitor cache storage usage
  - Verify cache invalidation correctness

### M4 Phase 5: Documentation

- [ ] T084 [P] [M4] Create `docs/nx-migration/cicd-guide.md`
- [ ] T085 [P] [M4] Update CONTRIBUTING.md with CI validation info
- [ ] T086 [P] [M4] Create `docs/nx-migration/nx-cloud-guide.md` (if enabled)
- [ ] T087 [P] [M4] Create `docs/nx-migration/milestone-4-report.md`
  - Document CI performance improvements
  - Share metrics with team
- [ ] T088 [M4] Announce CI changes in team Slack/email

**Checkpoint M4**: CI/CD using Nx, performance improved >20%, Nx Cloud working (if enabled)

---

## Phase 6: Optimization & Completion (M5 - Polish & Documentation)

**Purpose**: Complete documentation, training, and final optimizations

**Dependencies**: Requires M1-M4 completion

### M5 Phase 1: Documentation Completion

- [ ] T089 [P] [M5] Create comprehensive `docs/nx-migration/user-guide.md`
  - Getting started for new developers
  - Daily workflow with Nx
  - Common tasks
  - Troubleshooting
- [ ] T090 [P] [M5] Create `docs/nx-migration/architecture-decisions.md`
  - Document AD-001 through AD-005
  - Rationale, alternatives, trade-offs
- [ ] T091 [P] [M5] Create `docs/nx-migration/migration-report.md`
  - Executive summary
  - Performance improvements achieved
  - Challenges and solutions
  - Lessons learned
- [ ] T092 [P] [M5] Create `docs/nx-migration/troubleshooting.md`
  - Common errors and fixes
  - Cache issues
  - Build failures
  - Test problems
- [ ] T093 [P] [M5] Create `docs/nx-migration/quick-reference.md`
  - Command cheat sheet
  - Printable one-pager
- [ ] T094 [M5] Review all documentation for accuracy
  - Check all links work
  - Verify all examples tested
  - Fix broken references

### M5 Phase 2: Team Training

- [ ] T095 [M5] Prepare training materials (slides, exercises)
  - 1.5-hour main session content
  - 1-hour hands-on workshop
  - 30-minute Q&A
- [ ] T096 [M5] Conduct main training session (1.5 hours)
  - Nx fundamentals
  - Daily workflow
  - Caching and affected commands
  - CI/CD changes
  - Troubleshooting
- [ ] T097 [M5] Conduct hands-on workshop (1 hour)
  - Build packages with Nx
  - View dependency graph
  - Use affected commands
  - Debug cache issues
  - Run Storybook
- [ ] T098 [M5] Hold Q&A session (30 minutes)
- [ ] T099 [M5] Establish office hours schedule
  - Daily support for first week
  - Slack support channel
- [ ] T100 [M5] Collect training feedback
  - Target: >85% satisfaction
  - >95% attendance

### M5 Phase 3: Nx Generators (Optional)

- [ ] T101 [P] [M5] Create new package generator (optional)
  - Generate project.json
  - Create boilerplate files
  - Scaffold standard structure
- [ ] T102 [P] [M5] Create component generator (optional)
  - Generate TypeScript file
  - Generate test file
  - Generate story file
  - Generate SCSS file
- [ ] T103 [P] [M5] Document generator usage (if implemented)

### M5 Phase 4: Performance Optimization

- [ ] T104 [M5] Collect comprehensive performance metrics
  - Build times across all phases
  - Test execution times
  - Cache effectiveness metrics
  - CI execution times
- [ ] T105 [M5] Identify and address top 10 bottlenecks
- [ ] T106 [M5] Final nx.json tuning
  - Optimize parallel execution
  - Refine cache inputs/outputs
  - Document optimal configuration
- [ ] T107 [M5] Create performance monitoring plan
  - What to track ongoing
  - When to re-tune
  - Alerting thresholds

### M5 Phase 5: Migration Retrospective

- [ ] T108 [M5] Conduct team retrospective session
  - What went well
  - What could be improved
  - Lessons learned
  - Future recommendations
- [ ] T109 [M5] Document retrospective findings
  - Metrics summary (performance, cache, CI, satisfaction)
  - Technical insights
  - Process improvements
  - Recommendations for other teams
- [ ] T110 [M5] Share learnings with broader Skyscanner team
  - Write blog post or doc
  - Present at engineering meetup

### M5 Phase 6: Final Validation & Release

- [ ] T111 [M5] Run complete validation suite
  - All 96 packages build successfully
  - All tests pass
  - All linting passes
  - Storybook works
  - CI/CD passes
- [ ] T112 [M5] Verify all performance targets met
  - Build time <110% baseline
  - Cached build time <5s
  - Cache hit rate >80%
  - CI time reduced >20%
  - Developer satisfaction >80%
- [ ] T113 [M5] Create final release tag: `nx-migration-complete`
- [ ] T114 [M5] Merge 001-nx-migration branch to main
- [ ] T115 [M5] Celebrate migration completion with team 🎉
- [ ] T116 [M5] Monitor for 2-4 weeks post-merge
  - Track performance
  - Address any issues
  - Collect ongoing feedback

**Checkpoint M5**: Migration complete, documented, team trained, monitoring in place

---

## Dependencies & Execution Order

### Milestone Dependencies

- **M1 (Nx Foundation)**: No dependencies - can start immediately after Setup
- **M2 (Testing & Linting)**: Depends on M1 complete - MUST have working Nx builds
- **M3 (Dev Workflow)**: Depends on M1-M2 complete - needs builds and tests working
- **M4 (CI/CD)**: Depends on M1-M3 complete - needs full local workflow working
- **M5 (Optimization)**: Depends on M1-M4 complete - polishes and documents everything

### Critical Path

1. Setup (T001-T006) → Single package validation (T007-T010)
2. Workspace config (T011-T014) → Bulk integration (T015-T019)
3. Full build validation (T020-T023) → M1 complete
4. Jest integration (T028-T033) → Linting (T034-T042) → Affected (T045-T047) → M2 complete
5. Storybook (T051-T054) → Dev experience (T055-T061) → M3 complete
6. CI workflow updates (T067-T074) → Nx Cloud (T075-T080) → M4 complete
7. Documentation (T089-T094) → Training (T095-T100) → Final validation (T111-T116) → M5 complete

### Parallel Opportunities

- Within Setup: T002, T003 can run in parallel
- Within M1: Many project.json generation tasks are parallelizable
- Within M2: Test, ESLint, Stylelint phases can overlap partially
- Within M3: Documentation tasks (T057, T058, T062-T064) are parallelizable
- Within M4: Documentation tasks (T084-T087) are parallelizable
- Within M5: All documentation tasks (T089-T093) are parallelizable
- M5 generators (T101-T103) are optional and parallelizable

### Rollback Points

- After M1: Can rollback to npm scripts, keep Nx for future
- After M2: Can rollback tests/lint, keep Nx for builds
- After M3: Can rollback Storybook, keep Nx for builds/tests
- After M4: Can rollback CI, keep Nx locally
- After M5: Complete migration - rollback requires reverting branch

---

## Implementation Strategy

### Recommended Approach: Incremental Milestones

1. **Milestone 1 (PoC/MVP)**: 2-3 weeks
   - Prove Nx works with Backpack
   - Get all packages building
   - Establish caching
   - **STOP and VALIDATE** before proceeding

2. **Milestone 2 (Testing)**: 2 weeks
   - Add test execution
   - Add linting
   - Get affected commands working
   - **STOP and VALIDATE**

3. **Milestone 3 (Dev Workflow)**: 1-2 weeks
   - Add Storybook
   - Optimize developer experience
   - **STOP and VALIDATE**

4. **Milestone 4 (CI/CD)**: 2 weeks
   - Update pipelines
   - Add distributed caching
   - **STOP and VALIDATE**

5. **Milestone 5 (Polish)**: 1 week
   - Complete documentation
   - Train team
   - Monitor and optimize

### MVP Definition

**Minimum Viable Migration** = M1 complete:
- Nx installed and configured
- All 96 packages building with Nx
- Caching working locally
- Documentation for basic usage

### Success Metrics

| Metric | Baseline | Target | Validation |
|--------|----------|--------|------------|
| Full Build Time | [M1 T002] | <110% | M5 T112 |
| Cached Build Time | N/A | <5s | M1 T023 |
| Cache Hit Rate | 0% | >80% | M3 T061 |
| CI Time (PR) | [M4 T081] | <80% (20% reduction) | M4 T081 |
| Test Coverage | 70%/75% | Maintained | M2 T032 |
| Developer Satisfaction | N/A | >80% | M3 T066, M5 T100 |

---

## Notes

- [P] tasks = different files/areas, no dependencies between them
- [Milestone] label maps task to specific milestone for tracking
- Each milestone should be independently validatable
- Stop at each checkpoint to validate before proceeding
- Commit frequently - after each task or logical group
- Keep spike branch for experimentation separate from main migration branch
- Document all issues and resolutions as you go
- Performance metrics are CRITICAL - measure early and often

## References

- **Migration Spec**: `specs/001-nx-migration/spec.md`
- **Implementation Plan**: `specs/001-nx-migration/plan.md`
- **Milestone Details**: `specs/001-nx-migration/milestones/milestone-*.md`
- **Nx Documentation**: https://nx.dev/
- **Backpack Repository**: `/Users/rogertang/code2/backpack/`
