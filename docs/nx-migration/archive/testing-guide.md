# Testing Guide with Nx

Complete guide to running tests in Backpack using Nx.

## Overview

Backpack uses Jest for testing, integrated with Nx for caching and intelligent execution. This guide covers how to run tests efficiently using Nx commands.

## Quick Start

```bash
# Test single package
npx nx test bpk-component-button

# Test all packages
npx nx run-many --target=test --all

# Test only affected packages
npx nx affected --target=test
```

## Test Configuration

### Jest Setup

Tests are configured in `package.json`:

```json
{
  "jest": {
    "testEnvironment": "jsdom",
    "coverageThreshold": {
      "global": {
        "branches": 70,
        "functions": 75,
        "lines": 75,
        "statements": 75
      }
    }
  }
}
```

### Test Target Configuration

Each package has a test target in `project.json`:

```json
{
  "test": {
    "executor": "nx:run-commands",
    "options": {
      "command": "TZ=Etc/UTC jest --coverage --testPathPatterns='packages/{packageName}'",
      "cwd": "{workspaceRoot}"
    },
    "outputs": ["{workspaceRoot}/coverage"]
  }
}
```

## Running Tests

### Single Package

```bash
# Run tests for one package
npx nx test bpk-component-button

# With verbose output
npx nx test bpk-component-button --verbose

# Skip cache (force fresh run)
npx nx test bpk-component-button --skip-nx-cache
```

### Multiple Packages

```bash
# Test specific packages
npx nx run-many --target=test --projects=bpk-component-button,bpk-component-card

# Test all packages
npx nx run-many --target=test --all

# Test with parallel execution
npx nx run-many --target=test --all --parallel=5
```

### Affected Tests

```bash
# Test only affected packages
npx nx affected --target=test

# Test affected since main branch
npx nx affected --target=test --base=main

# Test affected with specific commit
npx nx affected --target=test --base=HEAD~1
```

## Test Caching

### How Cache Works

Nx caches test results based on:
- Source code files
- Test files
- Jest configuration
- Package dependencies

**Cache hit**: Tests don't re-run, results are instant
**Cache miss**: Tests execute, results are cached

### Cache Examples

```bash
# First run (cold)
npx nx test bpk-react-utils
# Output: Tests execute (~3 seconds)

# Second run (warm)
npx nx test bpk-react-utils
# Output: "Nx read the output from the cache" (<100ms)

# After code change
# Modify packages/bpk-react-utils/src/Portal.js
npx nx test bpk-react-utils
# Output: Tests execute again (cache invalidated)
```

### Managing Cache

```bash
# Clear all cache
npx nx reset

# Skip cache for specific run
npx nx test bpk-component-button --skip-nx-cache

# Check cache effectiveness
npx nx test bpk-component-button  # First run
npx nx test bpk-component-button  # Second run - should hit cache
```

## Coverage Reports

### Generating Coverage

```bash
# Test with coverage (default)
npx nx test bpk-component-button

# Coverage reports saved to ./coverage
```

### Coverage Output

After running tests, coverage reports are saved to:
- `coverage/` - Directory with coverage reports
- Console output shows coverage summary

Example output:
```
File                  | % Stmts | % Branch | % Funcs | % Lines |
----------------------|---------|----------|---------|---------|
BpkButton.js          |   95.2  |   88.5   |  100    |   94.8  |
```

### Coverage Thresholds

Tests fail if coverage drops below:
- **Branches**: 70%
- **Functions**: 75%
- **Lines**: 75%
- **Statements**: 75%

## Resources

- **Nx Documentation**: https://nx.dev/recipes/running-tasks
- **Jest Documentation**: https://jestjs.io/docs/getting-started
- **Getting Started**: `docs/nx-migration/getting-started.md`
- **Commands Reference**: `docs/nx-migration/nx-commands.md`
- **Affected Commands**: `docs/nx-migration/affected-commands.md`
