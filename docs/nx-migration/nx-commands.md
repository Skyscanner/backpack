# Nx Commands Reference

Complete reference for Nx commands used in Backpack.

## Command Format

All Nx commands can be run in two ways:

```bash
# Via npm script (recommended)
npm run nx -- [command]

# Direct npx (shorter)
npx nx [command]
```

## Build Commands

### Build Single Package

```bash
# Build specific package
npm run nx -- run bpk-component-button:build
npx nx run bpk-component-button:build

# With verbose output
npm run nx -- run bpk-component-button:build --verbose

# Skip cache (force rebuild)
npm run nx -- run bpk-component-button:build --skip-nx-cache
```

### Build Multiple Packages

```bash
# Build all packages
npm run nx -- run-many --target=build --all

# Build specific packages
npm run nx -- run-many --target=build --projects=bpk-component-button,bpk-component-card

# Build with custom parallelism
npm run nx -- run-many --target=build --all --parallel=5

# Build with output streaming
npm run nx -- run-many --target=build --all --output-style=stream
```

### Build Affected Packages

```bash
# Build only packages affected by changes
npm run nx -- affected --target=build

# From specific base branch
npm run nx -- affected --target=build --base=main

# From specific commit
npm run nx -- affected --target=build --base=HEAD~1
```

## Project Information

### List Projects

```bash
# Show all projects
npx nx show projects

# Count projects
npx nx show projects | wc -l

# Save to file
npx nx show projects > /tmp/nx-projects.txt
```

### Show Project Details

```bash
# Show project configuration
npx nx show project bpk-component-button

# Output as JSON
npx nx show project bpk-component-button --json

# Show specific field
npx nx show project bpk-component-button --json | jq '.targets.build'
```

## Dependency Graph

### View Graph

```bash
# Open interactive graph in browser
npm run nx -- graph

# Focus on specific project
npm run nx -- graph --focus=bpk-component-button

# Show affected projects
npm run nx -- affected:graph

# Export to file
npm run nx -- graph --file=/tmp/nx-graph.html
```

### Graph Options

```bash
# Show only specific types
npm run nx -- graph --focus=bpk-component-button --affected

# Group by folder
npm run nx -- graph --groupByFolder

# Watch mode (auto-refresh)
npm run nx -- graph --watch
```

## Affected Commands

### Show Affected

```bash
# Show affected projects
npm run nx -- affected:graph

# Print affected project names
npm run nx -- print-affected --target=build

# Show with base comparison
npm run nx -- affected:graph --base=main --head=HEAD
```

### Run on Affected

```bash
# Build affected
npm run nx -- affected --target=build

# Test affected
npm run nx -- affected --target=test

# Lint affected
npm run nx -- affected --target=lint

# Multiple targets
npm run nx -- affected --targets=build,test,lint
```

### Affected Options

```bash
# Specify base branch
npm run nx -- affected --target=build --base=main

# Specify commit range
npm run nx -- affected --target=build --base=HEAD~3 --head=HEAD

# Exclude specific projects
npm run nx -- affected --target=build --exclude=bpk-stylesheets

# Parallel execution
npm run nx -- affected --target=build --parallel=5
```

## Cache Management

### Reset Cache

```bash
# Clear all cache
npx nx reset

# Clear cache and workspace data
rm -rf .nx/cache .nx/workspace-data
```

### Cache Options

```bash
# Skip cache for single run
npm run nx -- run bpk-component-button:build --skip-nx-cache

# Skip cache for multiple
npm run nx -- run-many --target=build --all --skip-nx-cache
```

## Run-Many Options

### Output Styles

```bash
# Static output (default) - clean summary
npm run nx -- run-many --target=build --all

# Stream output - real-time logs
npm run nx -- run-many --target=build --all --output-style=stream

# Stream with prefixes
npm run nx -- run-many --target=build --all --output-style=stream-with-prefixes
```

### Execution Options

```bash
# Sequential execution (no parallel)
npm run nx -- run-many --target=build --all --parallel=1

# Maximum parallelism
npm run nx -- run-many --target=build --all --parallel=999

# Stop on first failure
npm run nx -- run-many --target=build --all --stop-on-error

# Continue despite failures
npm run nx -- run-many --target=build --all --no-bail
```

### Filtering

```bash
# Include only specific projects
npm run nx -- run-many --target=build --projects=bpk-component-button,bpk-component-card

# Exclude specific projects
npm run nx -- run-many --target=build --all --exclude=bpk-mixins

# Run with pattern matching
npm run nx -- run-many --target=build --projects=bpk-component-*
```

## Configuration Commands

### Show Configuration

```bash
# Show workspace configuration
cat nx.json

# Show project configuration
cat packages/bpk-component-button/project.json

# Validate configuration
npx nx show project bpk-component-button
```

### Repair Configuration

```bash
# Repair workspace (fixes common issues)
npx nx repair

# Show repair recommendations
npx nx repair --dry-run
```

## Workspace Analysis

### Show Dependencies

```bash
# Show what project depends on
npx nx graph --focus=bpk-component-button

# Show reverse dependencies (what depends on this)
npx nx graph --focus=bpk-react-utils --affected
```

### Run Report

```bash
# Generate workspace report
npx nx report

# Output:
# - Node version
# - Package manager
# - Nx version
# - OS details
```

## Workspace Targets

Workspace-level targets defined in root `project.json`:

### Transpile

```bash
# Run full workspace transpile
npm run nx -- run backpack-workspace:transpile
```

### Check Dependencies

```bash
# Verify Backpack internal dependencies
npm run nx -- run backpack-workspace:check-dependencies
```

### Check React Versions

```bash
# Verify React version consistency
npm run nx -- run backpack-workspace:check-react-versions
```

### Gulp Tasks

```bash
# Run Gulp tasks via Nx
npm run nx -- run backpack-workspace:gulp
```

### Build All

```bash
# Full workspace build (includes all steps)
npm run nx -- run backpack-workspace:build-all
```

## Environment Variables

### Nx Verbosity

```bash
# Enable verbose output
NX_VERBOSE_LOGGING=true npm run nx -- run bpk-component-button:build

# Debug mode
NX_VERBOSE_LOGGING=true NX_DAEMON=false npm run nx -- run bpk-component-button:build
```

### Nx Daemon

```bash
# Disable Nx daemon (for debugging)
NX_DAEMON=false npm run nx -- run-many --target=build --all

# Stop daemon
npx nx daemon --stop
```

### Nx Cloud (if enabled in future)

```bash
# Skip remote cache
NX_SKIP_NX_CACHE=true npm run nx -- run-many --target=build --all
```

## CI/CD Commands

### GitHub Actions

```bash
# Build only affected (for PRs)
npx nx affected --target=build --base=origin/main

# Test only affected
npx nx affected --target=test --base=origin/main

# Run all affected tasks
npx nx affected --targets=build,test,lint --base=origin/main
```

### Performance Optimization

```bash
# Set max parallel workers for CI
npx nx run-many --target=build --all --parallel=4

# Use stream output for better CI logs
npx nx run-many --target=build --all --output-style=stream
```

## Common Workflows

### Development Workflow

```bash
# 1. Make changes to a package
cd packages/bpk-component-button

# 2. Build just that package (fast with cache)
npm run nx -- run bpk-component-button:build

# 3. Test the package
npm test

# 4. Before commit: test what's affected
npm run nx -- affected --target=test
```

### Full Build Workflow

```bash
# 1. Clean build (cold start)
npx nx reset
npm run nx -- run-many --target=build --all

# 2. Verify cache (should be fast)
npm run nx -- run-many --target=build --all

# 3. Change one file and rebuild
npm run nx -- run-many --target=build --all
# Only changed package rebuilds!
```

### PR Review Workflow

```bash
# 1. Checkout PR branch
git checkout pr-branch

# 2. Show what's affected
npm run nx -- affected:graph --base=main

# 3. Build affected only
npm run nx -- affected --target=build --base=main

# 4. Test affected only
npm run nx -- affected --target=test --base=main
```

## Debugging

### Verbose Output

```bash
# Maximum verbosity
NX_VERBOSE_LOGGING=true npm run nx -- run bpk-component-button:build --verbose
```

### Dry Run

```bash
# Show what would run (no execution)
npm run nx -- run-many --target=build --all --dry-run
```

### Show Task Configuration

```bash
# See resolved task config
npx nx show project bpk-component-button --json | jq '.targets.build'
```

## Quick Reference

| Task | Command |
|------|---------|
| Build one package | `npm run nx -- run <package>:build` |
| Build all packages | `npm run nx -- run-many --target=build --all` |
| Build affected | `npm run nx -- affected --target=build` |
| List projects | `npx nx show projects` |
| Show graph | `npm run nx -- graph` |
| Clear cache | `npx nx reset` |
| Project details | `npx nx show project <package>` |
| Skip cache | `npm run nx -- run <package>:build --skip-nx-cache` |
| Verbose output | `npm run nx -- run <package>:build --verbose` |

## Getting Help

```bash
# General help
npx nx --help

# Command-specific help
npx nx run --help
npx nx affected --help
npx nx graph --help
```

## Resources

- **Nx Documentation**: https://nx.dev/getting-started/intro
- **Nx Run Commands**: https://nx.dev/nx-api/nx/executors/run-commands
- **Getting Started**: `docs/nx-migration/getting-started.md`
- **Milestone 1 Report**: `docs/nx-migration/milestone-1-report.md`
