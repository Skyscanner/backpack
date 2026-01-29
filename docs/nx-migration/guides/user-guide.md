# Backpack Nx User Guide

Complete guide for developers working with Nx in the Backpack Design System.

## Table of Contents

- [Quick Start](#quick-start)
- [Daily Workflow](#daily-workflow)
- [Common Tasks](#common-tasks)
- [Understanding Nx](#understanding-nx)
- [Performance Tips](#performance-tips)
- [Troubleshooting](#troubleshooting)

## Quick Start

### First Time Setup

If you're new to the Backpack repository:

```bash
# Clone the repository
git clone https://github.com/Skyscanner/backpack.git
cd backpack

# Install dependencies (includes Nx)
npm install

# Verify Nx is working
npx nx --version
```

### What Changed with Nx?

**Before Nx**:
```bash
npm run build          # Build all packages
npm test              # Run all tests
npm run storybook     # Start Storybook
```

**After Nx**:
```bash
npx nx run-many --target=build --all      # Build all packages
npx nx affected --target=test             # Test only changed packages
npx nx storybook                          # Start Storybook (with caching)
```

**Key Benefits**:
- ⚡ **Caching**: Rebuilds skip instantly (99%+ faster)
- 🎯 **Affected**: Only test/build what changed
- 🚀 **Parallel**: Multiple packages build simultaneously
- 📊 **Graph**: Visualize dependencies between packages

## Daily Workflow

### Starting Your Day

```bash
# Pull latest changes
git pull origin main

# Install any new dependencies
npm install

# View what you're working on in the dependency graph
npx nx graph
```

### Making Changes

**1. Create a branch**:
```bash
git checkout -b feature/update-button
```

**2. Make your changes** to package files (e.g., `packages/bpk-component-button/`)

**3. See what's affected**:
```bash
# See affected packages
npx nx show projects --affected

# Visualize affected graph
npx nx affected:graph
```

**4. Build and test affected**:
```bash
# Build only what changed
npx nx affected --target=build

# Run tests only on affected
npx nx affected --targets=lint,test
```

### Before Committing

```bash
# Build everything to ensure nothing broke
npx nx run-many --target=build --all

# Run full test suite
npm test

# Or use Nx for parallel testing
npx nx run-many --targets=lint,test --all --parallel=4
```

### Creating a PR

Once you push your branch, CI will automatically:
- Use `nx affected` to test only changed packages
- Run 40-80% faster for typical changes
- Cache Storybook builds (99%+ faster)

## Common Tasks

### Building Packages

**Build single package**:
```bash
npx nx build bpk-component-button
```

**Build specific packages**:
```bash
npx nx run-many --target=build --projects=bpk-component-button,bpk-component-card
```

**Build all packages**:
```bash
npx nx run-many --target=build --all
```

**Build only changed packages**:
```bash
npx nx affected --target=build
```

**Build with parallel execution (faster)**:
```bash
npx nx run-many --target=build --all --parallel=4
```

### Running Tests

**Test single package**:
```bash
npx nx test bpk-component-button
npx nx lint bpk-component-button
npx nx stylelint bpk-component-button
```

**Test affected packages**:
```bash
# All test types for affected packages
npx nx affected --targets=lint,stylelint,test

# Just unit tests
npx nx affected --target=test
```

**Test all packages**:
```bash
# Traditional way (still works)
npm test

# Or with Nx parallel execution
npx nx run-many --targets=lint,stylelint,test --all --parallel=4
```

### Working with Storybook

**Start Storybook**:
```bash
npx nx storybook

# Or traditional way
npm run storybook
```

**Build Storybook** (with caching):
```bash
npx nx storybook:build

# Cache makes this 99%+ faster on repeat builds
# First time: 60-90s, cached: <1s
```

**Run Percy visual tests**:
```bash
npx nx percy

# This automatically builds Storybook if needed (with caching)
```

### Viewing Dependencies

**See all projects**:
```bash
npx nx show projects
```

**View dependency graph** (interactive):
```bash
npx nx graph
```

**See affected projects**:
```bash
npx nx show projects --affected

# Or with graph
npx nx affected:graph
```

**Find projects that depend on a package**:
```bash
# Not directly supported, but use graph to explore
npx nx graph --focus=bpk-component-button
```

## Understanding Nx

### What is Nx Doing?

Nx is a **build orchestration tool** that:

1. **Tracks dependencies** between packages
2. **Caches build outputs** to skip repeated work
3. **Runs tasks in parallel** for speed
4. **Detects affected packages** based on git changes

### Caching Explained

**How it works**:
```
1. You run: npx nx build bpk-component-button
2. Nx calculates a hash of:
   - Source files
   - Dependencies
   - Build script
   - Configuration
3. If hash matches cache → restore from cache (instant)
4. If hash different → run build, save to cache
```

**What gets cached**:
- Package builds (`dist/` outputs)
- Storybook builds (`dist-storybook/`)
- Test results
- Lint results

**Cache location**:
- Local: `.nx/cache/` directory
- Not committed to git
- Each developer has their own cache

**When cache invalidates**:
- Source code changes
- Dependency updates
- Configuration changes
- Script changes

### Affected Detection

**How it works**:
```
1. Nx compares current branch to base (e.g., main)
2. Identifies changed files
3. Uses dependency graph to find affected packages
4. Only runs tasks on affected packages
```

**Example**:
```bash
# You changed: packages/bpk-component-button/src/BpkButton.tsx

# Nx detects affected:
# - bpk-component-button (directly changed)
# - Any package that imports bpk-component-button

# Runs build/test only for affected packages
npx nx affected --target=build
# → Builds ~3 packages instead of all 96
```

### Project Configuration

Each package has a `project.json` file:

```json
{
  "name": "bpk-component-button",
  "targets": {
    "build": {
      "cache": true,
      "inputs": [
        "default",
        "^default"
      ],
      "outputs": ["{projectRoot}/dist"]
    },
    "test": {
      "cache": true
    }
  }
}
```

**Key fields**:
- `cache`: Enable/disable caching for this target
- `inputs`: What files affect the cache hash
- `outputs`: What files to cache
- `dependsOn`: Task dependencies

## Performance Tips

### 1. Use Affected Commands

**Instead of**:
```bash
npx nx run-many --target=test --all  # Tests all 96 packages
```

**Use**:
```bash
npx nx affected --target=test  # Tests only changed packages
```

**Savings**: 60-80% faster for small changes

### 2. Leverage Caching

**Let Nx cache work**:
```bash
# First run: Full build
npx nx build bpk-component-button  # 30s

# No changes, run again: Cache hit
npx nx build bpk-component-button  # <1s (99%+ faster)
```

**Don't clear cache unnecessarily**:
```bash
# Only clear cache if having issues
npx nx reset
```

### 3. Use Parallel Execution

**Add `--parallel=4`** to run multiple tasks at once:
```bash
npx nx run-many --target=build --all --parallel=4
```

**Note**: CI already uses parallel=4 automatically

### 4. Use Skip Nx Cache Flag Sparingly

**Normally let Nx handle caching**:
```bash
npx nx build bpk-component-button  # Uses cache
```

**Force rebuild (only if needed)**:
```bash
npx nx build bpk-component-button --skip-nx-cache
```

### 5. Keep Dependencies Updated

Outdated dependencies can cause cache invalidation. Use:
```bash
npm outdated
npm update
```

## Troubleshooting

See [troubleshooting.md](../guides/troubleshooting.md) for detailed error solutions.

### Quick Fixes

**Nx command not found**:
```bash
# Install dependencies
npm install

# Verify Nx installed
npx nx --version
```

**Build cached but shouldn't be**:
```bash
# Clear cache and rebuild
npx nx reset
npx nx build bpk-component-button
```

**Affected detection not working**:
```bash
# Ensure you're comparing to correct base
npx nx affected --target=build --base=main

# Check git remotes
git remote -v
```

**Storybook not updating**:
```bash
# Clear Nx cache
npx nx reset

# Rebuild Storybook
npx nx storybook:build
```

**Tests failing in CI but passing locally**:
- CI uses `nx affected` - ensure all dependencies updated
- Check CI logs for which packages were tested
- Run `npx nx affected --target=test` locally

## Learning Resources

### Internal Documentation

- [Quick Reference](quick-reference.md) - Command cheat sheet
- [CI/CD Guide](./cicd-guide.md) - How Nx works in CI
- [Affected Commands](./affected-commands.md) - Detailed affected guide
- [Troubleshooting](../guides/troubleshooting.md) - Common issues and fixes
- [Architecture Decisions](../decisions/architecture-decisions.md) - Why we chose Nx

### External Resources

- [Nx Documentation](https://nx.dev) - Official Nx docs
- [Nx CLI Reference](https://nx.dev/nx-api/nx/documents/cli) - All Nx commands
- [Nx Concepts](https://nx.dev/concepts) - Core Nx concepts

## Getting Help

1. **Check documentation** - Start with this guide and [troubleshooting.md](../guides/troubleshooting.md)
2. **Search issues** - Check GitHub issues for similar problems
3. **Ask in Slack** - Post in #backpack channel
4. **Office hours** - Check team calendar for Nx support sessions

## Feedback

We're continuously improving the Nx setup. Please share:
- What's working well
- What's confusing
- What could be better
- Performance issues
- Documentation gaps

Share feedback in #backpack Slack channel or create a GitHub issue.
