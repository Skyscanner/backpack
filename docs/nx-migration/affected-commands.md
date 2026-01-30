# Affected Commands Guide

Nx's affected commands are one of its most powerful features. They analyze your git changes and only run tasks on projects that are actually affected by those changes, dramatically speeding up CI/CD pipelines and development workflows.

## What are Affected Commands?

Affected commands detect which projects in your monorepo are impacted by your changes and only run tasks (build, test, lint) on those projects.

### How It Works

1. **Compares git commits**: Nx analyzes changes between two git references (default: `main` branch and current HEAD)
2. **Builds dependency graph**: Uses the project dependency graph to determine impact
3. **Runs tasks selectively**: Only executes tasks for affected projects

### Benefits

- **Faster CI/CD**: Skip building/testing unchanged code
- **Faster development**: Only lint/test what you changed
- **Cost savings**: Reduce CI minutes and compute resources
- **Better feedback loops**: Get results faster

## Basic Usage

### Affected Build

```bash
# Build only affected projects
npx nx affected --target=build

# Specify base branch explicitly
npx nx affected --target=build --base=main

# Compare specific commits
npx nx affected --target=build --base=HEAD~1 --head=HEAD
```

### Affected Test

```bash
# Test only affected projects
npx nx affected --target=test

# Test affected with specific base
npx nx affected --target=test --base=origin/main
```

### Affected Lint

```bash
# Lint only affected projects
npx nx affected --target=lint

# Run both ESLint and Stylelint on affected
npx nx affected --targets=lint,stylelint
```

### Multiple Targets

```bash
# Run multiple tasks on affected projects
npx nx affected --targets=build,test,lint

# With specific base branch
npx nx affected --targets=build,test,lint --base=origin/main
```

## Git References

### Base and Head

- **--base**: The starting point for comparison (default: `main`)
- **--head**: The ending point for comparison (default: `HEAD`)

```bash
# Compare against main branch
npx nx affected --target=build --base=main

# Compare last commit
npx nx affected --target=build --base=HEAD~1

# Compare specific commits
npx nx affected --target=build --base=abc123 --head=def456

# Compare against remote branch
npx nx affected --target=build --base=origin/main
```

## Visualization

### Show Affected Graph

```bash
# Open affected dependency graph in browser
npx nx affected:graph

# Show affected graph compared to main
npx nx affected:graph --base=main

# Show affected graph for specific target
npx nx affected:graph --target=build
```

### Print Affected Projects

```bash
# List affected project names
npx nx print-affected --target=build

# Output as JSON
npx nx print-affected --target=build --select=projects
```

## Common Scenarios

### Pre-Push Hook

Run tests only on what changed before pushing:

```bash
# In pre-push hook
npx nx affected --target=test --base=origin/main
```

### CI/CD Pipeline

GitHub Actions example:

```yaml
- name: Build affected projects
  run: npx nx affected --target=build --base=origin/main

- name: Test affected projects
  run: npx nx affected --target=test --base=origin/main

- name: Lint affected projects
  run: npx nx affected --targets=lint,stylelint --base=origin/main
```

## Best Practices

### 1. Always Use Affected in CI

Save compute time and get faster feedback:

```bash
# CI pipeline
npx nx affected --targets=lint,test,build --base=origin/main
```

### 2. Use for Pre-Commit Checks

Only test what you changed locally:

```bash
# Pre-commit
npx nx affected --target=test --base=origin/main
```

### 3. Visualize Before Merging

Check impact before creating PR:

```bash
npx nx affected:graph --base=origin/main
```

## Resources

- **Affected Detection**: [Nx Documentation](https://nx.dev/concepts/affected)
- **Dependency Graph**: `npx nx graph`
- **Getting Started**: `docs/nx-migration/getting-started.md`
- **Commands Reference**: `docs/nx-migration/nx-commands.md`
