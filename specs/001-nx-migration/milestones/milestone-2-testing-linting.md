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

**Tasks**:
1. Install @nx/jest plugin: `npm install -D @nx/jest`
2. Configure Jest targets in project.json files:
```json
{
  "targets": {
    "test": {
      "executor": "@nx/jest:jest",
      "options": {
        "jestConfig": "{projectRoot}/jest.config.js",
        "passWithNoTests": true
      },
      "outputs": ["{workspaceRoot}/coverage/{projectRoot}"]
    }
  }
}
```

3. Update root jest.config.js for Nx compatibility
4. Migrate per-package Jest configs
5. Test execution: `nx run-many --target=test --all`
6. Validate all tests pass

**Validation**:
- All unit tests pass
- jest-axe accessibility tests work
- Coverage reports match baseline
- Test caching works (>80% faster on rerun)

### Phase 2.2: ESLint Integration (Week 1-2)

**Tasks**:
1. Install @nx/linter plugin: `npm install -D @nx/linter`
2. Configure lint targets:
```json
{
  "targets": {
    "lint": {
      "executor": "@nx/linter:eslint",
      "options": {
        "lintFilePatterns": ["{projectRoot}/**/*.{ts,tsx,js,jsx}"]
      }
    }
  }
}
```

3. Preserve @skyscanner/eslint-config-skyscanner configuration
4. Test linting: `nx run-many --target=lint --all`
5. Integrate with lint-staged for pre-commit hooks

**Validation**:
- ESLint runs successfully
- Configuration preserved
- Lint caching works
- Pre-commit hooks work

### Phase 2.3: Stylelint Integration (Week 2)

**Tasks**:
1. Add Stylelint target to project.json:
```json
{
  "targets": {
    "stylelint": {
      "executor": "nx:run-commands",
      "options": {
        "command": "stylelint '{projectRoot}/**/*.scss'"
      }
    }
  }
}
```

2. Preserve @skyscanner/stylelint-config-skyscanner
3. Update lint-staged to use Nx commands
4. Test: `nx run-many --target=stylelint --all`

**Validation**:
- Stylelint runs successfully
- Configuration preserved
- Caching works
- Integrated with lint-staged

### Phase 2.4: Percy Integration (Week 2)

**Tasks**:
1. Add Percy target:
```json
{
  "targets": {
    "percy": {
      "executor": "nx:run-commands",
      "options": {
        "command": "percy storybook ./dist-storybook"
      },
      "dependsOn": ["storybook:build"]
    }
  }
}
```

2. Test Percy workflow
3. Update CI/CD to use Nx Percy command

**Validation**:
- Percy tests run successfully
- Visual regression detection works
- Integrated into CI pipeline

### Phase 2.5: Affected Command Testing (Week 2)

**Tasks**:
1. Test affected detection:
```bash
# Make change to single package
echo "// test" >> packages/bpk-animate-height/src/index.ts

# Run affected tests
nx affected:test

# Verify only affected packages tested
```

2. Document affected command usage
3. Update CI to use affected commands

**Validation**:
- Affected detection works correctly
- Only changed packages + dependents tested
- CI optimized with affected commands

## Performance Targets

| Metric | Baseline | Target | Status |
|--------|----------|--------|--------|
| Full Test Time | [From M1] | <110% baseline | ⏳ |
| Cached Test Time | N/A | <5s | ⏳ |
| Affected Test Time | N/A | <20% baseline | ⏳ |
| Lint Time | [From M1] | <110% baseline | ⏳ |

## Documentation

- Update `docs/nx-migration/testing-guide.md`
- Add affected command examples
- Update CI/CD documentation

## Rollback Plan

If critical issues:
1. Revert test/lint targets in project.json
2. Restore original npm test/lint scripts
3. Keep Milestone 1 (build only)
4. Document blockers for future attempts

## Next Steps

Proceed to [Milestone 3: Development Workflow](./milestone-3-dev-workflow.md)
