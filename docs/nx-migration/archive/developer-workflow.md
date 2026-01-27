# Developer Workflow with Nx

Guide to daily development workflows using Nx in Backpack.

## Daily Development

### Starting Development

```bash
# Start Storybook dev server
npm run dev
# or
npx nx storybook

# Runs on http://localhost:9001
```

### Making Changes

1. **Work on a component**
   - Edit files in `packages/bpk-component-*/`
   - Storybook automatically reloads (HMR)

2. **Test your changes**
   ```bash
   # Test the package you changed
   npx nx test bpk-component-button

   # Or test only affected packages
   npx nx affected --target=test
   ```

3. **Lint your changes**
   ```bash
   # Lint affected packages
   npx nx affected --targets=lint,stylelint
   ```

### Pre-Commit Workflow

Backpack uses **lint-staged** which runs automatically on `git commit`:
- ESLint on changed .js/.ts files
- Stylelint on changed .scss files

To manually run affected commands:
```bash
# Test what changed
npx nx affected --target=test

# Lint what changed
npx nx affected --targets=lint,stylelint

# Build what changed
npx nx affected --target=build
```

## Common Tasks

### Adding a New Package

After creating a new package:

```bash
# Generate project.json automatically
node scripts/nx/generate-project-configs.js

# Build the new package
npx nx build bpk-my-new-package

# Test it
npx nx test bpk-my-new-package
```

### Debugging Build Issues

```bash
# Build with verbose output
npx nx build bpk-component-button --verbose

# Skip cache to force fresh build
npx nx build bpk-component-button --skip-nx-cache

# View dependency graph
npx nx graph --focus=bpk-component-button
```

### Debugging Test Issues

```bash
# Run tests without cache
npx nx test bpk-component-button --skip-nx-cache

# Run specific test file (bypass Nx)
TZ=Etc/UTC jest packages/bpk-component-button/src/BpkButton-test.js

# Watch mode (bypass Nx)
npm run jest:watch
```

### Working with Cache

```bash
# Clear cache if you see stale results
npx nx reset

# Check if task was cached
npx nx build bpk-component-button
# Look for: "Nx read the output from the cache"

# Force fresh execution
npx nx build bpk-component-button --skip-nx-cache
```

## Feature Branch Workflow

### Creating a Feature Branch

```bash
# Create branch from main
git checkout main
git pull origin main
git checkout -b feature/my-feature

# Make changes...
```

### Before Committing

```bash
# See what's affected by your changes
npx nx affected:graph

# Test affected packages
npx nx affected --target=test

# Lint affected packages
npx nx affected --targets=lint,stylelint
```

### Before Creating PR

```bash
# Run full suite on affected packages
npx nx affected --targets=lint,stylelint,test,build --base=origin/main

# Verify cache works (run twice)
npx nx affected --target=test --base=origin/main
npx nx affected --target=test --base=origin/main  # Should hit cache
```

### During Code Review

If reviewer requests changes:

```bash
# Make changes...

# Only test what you changed
npx nx affected --target=test --base=origin/main

# Build affected
npx nx affected --target=build --base=origin/main
```

## Team Collaboration

### Understanding Affected Detection

Nx determines affected projects based on:
1. **Git changes**: Files you modified
2. **Dependency graph**: Projects that depend on changed projects
3. **Configuration changes**: Root files affect all projects

### Sharing Cache (Future)

Currently cache is local. Future enhancements:
- Nx Cloud for distributed cache
- Share cache across team
- Faster CI/CD with remote cache

### VS Code Integration

Install **Nx Console** extension:
1. Open VS Code
2. Go to Extensions (Cmd+Shift+X)
3. Search for "Nx Console"
4. Install

Features:
- Visual task runner
- Dependency graph visualization
- Code generation
- Quick commands

Use tasks:
- `Cmd+Shift+P` → "Tasks: Run Task"
- Select from list (Build All, Test Affected, etc.)

## Performance Tips

### 1. Use Affected Commands

Always use `affected` instead of `--all` when possible:

```bash
# Good: Only runs for changed code
npx nx affected --target=test

# Avoid: Runs for everything
npx nx run-many --target=test --all
```

### 2. Leverage Cache

Cache makes repeated runs instant:

```bash
# First run: ~60s
npx nx run-many --target=build --all

# Second run: ~5s (cache hit)
npx nx run-many --target=build --all
```

### 3. Parallel Execution

Nx runs tasks in parallel (default: 4):

```bash
# Custom parallelism
npx nx run-many --target=build --all --parallel=6

# Sequential (slower but safer)
npx nx run-many --target=build --all --parallel=1
```

### 4. Target Specific Packages

Only run tasks for packages you're working on:

```bash
# Instead of testing everything
npx nx run-many --target=test --all

# Test just what you need
npx nx test bpk-component-button
npx nx test bpk-component-card
```

## Troubleshooting

### Cache Issues

**Problem**: Cache returning stale results

**Solution**:
```bash
npx nx reset
```

### All Projects Affected

**Problem**: `nx affected` runs for all projects

**Possible causes**:
- Changed root config files (tsconfig.json, package.json, etc.)
- Git base is wrong

**Solution**:
```bash
# Check what changed
git diff origin/main

# Specify correct base
npx nx affected --target=test --base=origin/main
```

### Performance Degradation

**Problem**: Builds are slow

**Solutions**:
1. Clear cache: `npx nx reset`
2. Use affected: `npx nx affected --target=build`
3. Adjust parallel: `npx nx run-many --target=build --all --parallel=6`

### Dependency Graph Issues

**Problem**: Project dependencies not detected

**Solution**:
```bash
# View graph
npx nx graph

# Check specific project
npx nx graph --focus=bpk-component-button

# Regenerate graph
npx nx reset
npx nx graph
```

## Resources

- **Quick Reference**: `docs/nx-migration/quick-reference.md`
- **Testing Guide**: `docs/nx-migration/testing-guide.md`
- **Affected Commands**: `docs/nx-migration/affected-commands.md`
- **Storybook Integration**: `docs/nx-migration/storybook-integration.md`
- **Nx Documentation**: https://nx.dev/
