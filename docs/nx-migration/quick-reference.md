# Nx Quick Reference

Quick command reference for daily Nx usage in Backpack.

## Essential Commands

### Building

```bash
# Build single package
npx nx build bpk-component-button

# Build specific packages
npx nx run-many --target=build --projects=bpk-component-button,bpk-component-card

# Build all packages
npx nx run-many --target=build --all

# Build only changed packages
npx nx affected --target=build

# Build with parallelization (faster)
npx nx run-many --target=build --all --parallel=4

# Force rebuild (skip cache)
npx nx build bpk-component-button --skip-nx-cache
```

### Testing

```bash
# Test single package
npx nx test bpk-component-button

# Lint single package
npx nx lint bpk-component-button
npx nx stylelint bpk-component-button

# Test all types for one package
npx nx run-many --targets=test,lint,stylelint --projects=bpk-component-button

# Test affected packages
npx nx affected --targets=lint,stylelint,test

# Test all packages
npm test  # Traditional way
npx nx run-many --targets=lint,stylelint,test --all --parallel=4  # Nx way
```

### Storybook

```bash
# Start Storybook dev server
npx nx storybook
npm run storybook  # Traditional way

# Build Storybook (with caching)
npx nx storybook:build

# Run Percy visual tests
npx nx percy
```

### Dependency Graph

```bash
# View all projects
npx nx show projects

# Interactive dependency graph
npx nx graph

# See affected projects
npx nx show projects --affected

# Affected projects graph
npx nx affected:graph

# Focus on specific project
npx nx graph --focus=bpk-component-button
```

### Cache Management

```bash
# Clear all Nx cache
npx nx reset

# View cache directory
ls .nx/cache

# Check cache size
du -sh .nx/cache

# Run without using cache (force rebuild)
npx nx build bpk-component-button --skip-nx-cache
```

### Affected Detection

```bash
# See what's affected (default: vs main)
npx nx show projects --affected

# Specify base branch
npx nx affected --target=build --base=main

# Affected vs specific commit
npx nx affected --target=build --base=HEAD~1

# Affected vs tag
npx nx affected --target=build --base=v1.0.0

# Dry run (see what would run)
npx nx affected --target=build --dry-run

# See affected graph visually
npx nx affected:graph
```

### Utilities

```bash
# Nx version
npx nx --version

# Nx report (environment info)
npx nx report

# Daemon status
npx nx daemon

# View project details
npx nx show project bpk-component-button

# View project details (web UI)
npx nx show project bpk-component-button --web

# Run command with verbose logging
npx nx build bpk-component-button --verbose

# Run parallel tasks
npx nx run-many --target=build --all --parallel=4
```

## Common Workflows

### Daily Development

```bash
# 1. Pull latest
git pull origin main

# 2. Install dependencies
npm install

# 3. See your changes
git status

# 4. Build affected
npx nx affected --target=build

# 5. Test affected
npx nx affected --targets=lint,test

# 6. Start Storybook
npx nx storybook
```

### Before Committing

```bash
# Build everything
npx nx run-many --target=build --all

# Run all tests
npm test

# Check what you changed
git status
git diff
```

### Creating a PR

```bash
# 1. Create branch
git checkout -b feature/my-feature

# 2. Make changes

# 3. Test affected
npx nx affected --targets=lint,test

# 4. Commit
git add .
git commit -m "feat: my feature"

# 5. Push
git push origin feature/my-feature

# CI will automatically use nx affected
```

### Debugging

```bash
# 1. Clear cache
npx nx reset

# 2. Check what's affected
npx nx show projects --affected

# 3. View dependency graph
npx nx graph

# 4. Verbose rebuild
npx nx build bpk-component-button --verbose --skip-nx-cache

# 5. Check project config
npx nx show project bpk-component-button --web
```

## CI/CD Commands

### Pull Request

```bash
# Fetch base branch
git fetch origin main:main --depth=1

# Build affected
npx nx affected --target=build --base=origin/main --parallel=4

# Test affected
npx nx affected --targets=lint,stylelint,test --base=origin/main --parallel=4
```

### Main Branch

```bash
# Build all
npx nx run-many --target=build --all --parallel=4

# Test all
npm test
```

### Release

```bash
# Build all packages
npm run build

# Build Storybook
npx nx storybook:build

# Publish
npm publish
```

## Flags Reference

### Common Flags

```bash
--all                  # Run for all projects
--projects=a,b,c      # Run for specific projects
--target=build        # Specify target to run
--targets=lint,test   # Multiple targets
--parallel=4          # Run 4 tasks in parallel
--skip-nx-cache       # Force rebuild (ignore cache)
--verbose             # Show detailed logs
--dry-run             # Show what would run
--base=main           # Base ref for affected
--head=HEAD           # Head ref for affected
```

### Affected-Specific Flags

```bash
--base=main                    # Compare to main branch
--base=origin/main            # Compare to remote main
--base=HEAD~1                 # Compare to previous commit
--base=v1.0.0                 # Compare to tag
--exclude=bpk-component-*     # Exclude projects
--files=packages/button/**    # Based on specific files
```

## Configuration Files

```bash
# Global Nx config
nx.json

# Per-project Nx config
packages/*/project.json

# Nx cache
.nx/cache/

# Nx daemon
.nx/workspace-data/
```

## Performance Tips

```bash
# Use parallel execution (4 is optimal for Backpack)
npx nx run-many --target=build --all --parallel=4

# Use affected for PRs
npx nx affected --target=test

# Let cache work
npx nx build bpk-component-button  # Fast on repeat

# Clear cache only when needed
npx nx reset  # When having issues
```

## Troubleshooting Quick Fixes

```bash
# Nx command not found
npm install

# Build failed
npx nx reset
npx nx build bpk-component-button

# Cache issues
npx nx reset

# All packages affected
git diff main  # Check what changed

# Affected not working
git fetch origin main:main

# Slow performance
npx nx daemon  # Check daemon
```

## Package Scripts Comparison

```bash
# Before (still works)         # After (with Nx)
npm run build                  npx nx run-many --target=build --all
npm test                       npx nx run-many --targets=lint,test --all
npm run storybook              npx nx storybook
npm run storybook:dist         npx nx storybook:build
npm run percy-test             npx nx percy
```

## Aliases (Optional)

Add to your ~/.bashrc or ~/.zshrc:

```bash
alias nxb='npx nx build'
alias nxt='npx nx test'
alias nxl='npx nx lint'
alias nxa='npx nx affected'
alias nxg='npx nx graph'
alias nxr='npx nx reset'
```

Usage:
```bash
nxb bpk-component-button  # Build package
nxa --target=test         # Test affected
nxg                       # View graph
nxr                       # Reset cache
```

## Learning Resources

### Internal Docs
- [User Guide](./user-guide.md) - Complete developer guide
- [CI/CD Guide](./cicd-guide.md) - CI/CD with Nx
- [Troubleshooting](./troubleshooting.md) - Common issues
- [Architecture Decisions](./architecture-decisions.md) - Why we chose Nx

### External Resources
- [Nx Documentation](https://nx.dev)
- [Nx CLI Reference](https://nx.dev/nx-api/nx/documents/cli)
- [Nx Concepts](https://nx.dev/concepts)

## Getting Help

1. Check [Troubleshooting Guide](./troubleshooting.md)
2. Search [GitHub Issues](https://github.com/Skyscanner/backpack/issues)
3. Ask in #backpack Slack
4. Nx office hours (check calendar)

---

**Tip**: Print this page for quick offline reference!

Last updated: 2026-01-27
