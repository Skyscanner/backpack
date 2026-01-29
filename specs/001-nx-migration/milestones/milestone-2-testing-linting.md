# Milestone 2: Testing & Linting Integration

**Duration**: 2 weeks
**Status**: Not Started
**Dependencies**: Milestone 1 Complete
**Next Milestone**: [Milestone 3: Development Workflow](./milestone-3-dev-workflow.md)

## Overview

### Goal

Integrate Jest, ESLint, Stylelint, and Percy with Nx, enabling cached test execution and selective testing for affected packages.

### Success Criteria

- ✅ All tests pass with same results as pre-migration
- ✅ Test coverage maintained (70% branches, 75% functions/lines/statements)
- ✅ ESLint and Stylelint working with caching
- ✅ Percy visual regression tests configured
- ✅ `nx affected:test` correctly identifies changed packages
- ✅ Test execution 0-10% slower than baseline, >80% faster on cache hit

## Technical Approach

### Phase 2.1: Jest Integration (Week 1)

#### Objective
Integrate Jest testing framework with Nx caching and affected commands.

#### Strategy
- **Nx Jest Plugin**: Install @nx/jest for native Jest integration
- **Test Targets**: Configure test targets in project.json files for all packages
- **Config Preservation**: Keep existing Jest configs (root and per-package)
- **Coverage Integration**: Maintain code coverage reporting and thresholds
- **Cache Configuration**: Enable caching for test results based on source and test files

#### Key Tasks
1. Install @nx/jest plugin as dev dependency
2. Add test targets to project.json files using @nx/jest:jest executor
3. Point to existing jest.config.js files in each package
4. Configure cache outputs for coverage directories
5. Test execution with run-many for all packages
6. Validate all tests pass and coverage matches baseline
7. Verify cache effectiveness on repeated test runs

#### Success Gate
- ✅ All unit tests pass
- ✅ jest-axe accessibility tests work
- ✅ Coverage reports match baseline
- ✅ Test caching works (>80% faster on rerun)

### Phase 2.2: ESLint Integration (Week 1-2)

#### Objective
Integrate ESLint with Nx caching while preserving Skyscanner ESLint configuration.

#### Strategy
- **Nx Linter Plugin**: Install @nx/linter for ESLint integration
- **Config Preservation**: Keep @skyscanner/eslint-config-skyscanner
- **Lint Targets**: Add lint targets to all project.json files
- **File Patterns**: Configure appropriate file patterns per package
- **Pre-commit Hooks**: Update lint-staged to use Nx commands

#### Key Tasks
1. Install @nx/linter plugin
2. Add lint targets using @nx/linter:eslint executor
3. Configure lintFilePatterns for TypeScript and JavaScript files
4. Preserve root .eslintrc.js configuration
5. Test linting with run-many for all packages
6. Update lint-staged configuration to use Nx
7. Verify pre-commit hooks work correctly

#### Success Gate
- ✅ ESLint runs successfully
- ✅ Configuration preserved
- ✅ Lint caching works
- ✅ Pre-commit hooks work

### Phase 2.3: Stylelint Integration (Week 2)

#### Objective
Integrate Stylelint for SCSS linting with Nx caching.

#### Strategy
- **Custom Integration**: Use nx:run-commands to wrap Stylelint (no official plugin)
- **Config Preservation**: Keep @skyscanner/stylelint-config-skyscanner
- **SCSS Patterns**: Target all SCSS files in package directories
- **Lint-staged Update**: Include Stylelint in pre-commit workflow

#### Key Tasks
1. Add stylelint targets to project.json files
2. Use nx:run-commands executor to run Stylelint CLI
3. Configure file patterns for SCSS files
4. Enable caching for Stylelint results
5. Test with run-many for all packages
6. Update lint-staged configuration
7. Verify pre-commit integration

#### Success Gate
- ✅ Stylelint runs successfully
- ✅ Configuration preserved
- ✅ Caching works
- ✅ Integrated with lint-staged

### Phase 2.4: Percy Integration (Week 2)

#### Objective
Integrate Percy visual regression testing with Nx workflow.

#### Strategy
- **Storybook Dependency**: Percy requires Storybook build (defer to Milestone 3)
- **Percy Target**: Create Nx target that runs Percy after Storybook builds
- **CI Integration**: Prepare Percy workflow for CI/CD (full integration in Milestone 4)
- **Cache Consideration**: Percy snapshots not cached (cloud-based comparison)

#### Key Tasks
1. Add percy target to root project configuration
2. Configure dependsOn to ensure Storybook builds first
3. Use nx:run-commands to execute Percy CLI
4. Test Percy workflow locally
5. Document Percy usage with Nx
6. Prepare for CI integration in Milestone 4

#### Success Gate
- ✅ Percy tests run successfully
- ✅ Visual regression detection works
- ✅ Ready for CI pipeline integration

### Phase 2.5: Affected Command Testing (Week 2)

#### Objective
Validate Nx affected detection works correctly for tests and linting.

#### Strategy
- **Git-based Detection**: Nx uses git diff to identify changed files
- **Dependency Graph**: Affected includes changed packages and their dependents
- **Base Comparison**: Configure appropriate base branch for comparison
- **CI Optimization**: Document affected commands for CI usage

#### Key Tasks
1. Test affected detection by modifying single package
2. Verify affected:test only runs tests for changed packages
3. Verify affected:lint only lints changed packages
4. Test with multiple change scenarios (1 package, 5 packages, core change)
5. Validate dependents are correctly included
6. Document affected command patterns for CI
7. Update developer documentation with affected usage

#### Success Gate
- ✅ Affected detection works correctly
- ✅ Only changed packages + dependents tested
- ✅ CI optimized with affected commands

## Validation & Testing

### Test Validation Checklist

- [ ] All tests pass with Nx
- [ ] Test results identical to npm test
- [ ] Coverage reports match baseline
- [ ] jest-axe accessibility tests work
- [ ] Test caching effective (>80% faster)

### Lint Validation Checklist

- [ ] ESLint passes with Nx
- [ ] Stylelint passes with Nx
- [ ] Lint results identical to npm run lint
- [ ] Pre-commit hooks work
- [ ] Lint caching effective

### Affected Command Validation

- [ ] affected:test runs only changed packages
- [ ] affected:lint runs only changed packages
- [ ] Dependents correctly included
- [ ] Works with various change sizes

## Performance Targets

| Metric | Baseline | Target | Status |
|--------|----------|--------|--------|
| Full Test Time | [From M1] | <110% baseline | ⏳ |
| Cached Test Time | N/A | <5s | ⏳ |
| Affected Test Time | N/A | <20% baseline | ⏳ |
| Lint Time | [From M1] | <110% baseline | ⏳ |

## Rollback Plan

### Trigger Conditions

Rollback if:
- Tests fail inconsistently
- Coverage drops significantly
- Test/lint time increases >20%
- Affected detection incorrect

### Rollback Procedure

1. **Revert Test/Lint Targets**: Remove test/lint targets from project.json
2. **Restore npm Scripts**: Use original npm test/lint scripts
3. **Keep Milestone 1**: Preserve Nx for build only
4. **Document Blockers**: Identify issues for future resolution

## Next Steps

Proceed to [Milestone 3: Development Workflow](./milestone-3-dev-workflow.md)

## References

- **Nx Jest Plugin**: https://nx.dev/packages/jest
- **Nx Linter Plugin**: https://nx.dev/packages/linter
- **Affected Commands**: https://nx.dev/concepts/affected
- **Migration Spec**: [../spec.md](../spec.md)
