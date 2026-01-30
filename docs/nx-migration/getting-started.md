# Getting Started with Nx in Backpack

## What is Nx?

Nx is a smart, extensible build framework that helps manage monorepos. It provides:

- **Intelligent Caching**: Only rebuild what changed
- **Dependency Analysis**: Understand project relationships
- **Parallel Execution**: Run tasks across multiple projects efficiently
- **Affected Detection**: Only test/build what's impacted by changes

## Why Nx for Backpack?

Backpack migrated to Nx to address several challenges:

1. **Build Performance**: 91 packages taking too long to build individually
2. **Developer Experience**: Slow feedback loops during development
3. **CI Efficiency**: Long CI pipeline times
4. **Dependency Management**: Better understanding of package relationships

### Performance Improvements

After Nx migration (Milestone 1):

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Full build (warm) | N/A | 4.2s | ✅ <5s target |
| Cache hit rate | 0% | 100% | ✅ Excellent |
| Projects managed | 91 | 91 | ✅ Complete |

## Installation

Nx is already installed and configured in Backpack. No additional setup needed!

## How Nx Caching Works

Nx caches task outputs based on:
- Input files (source code, configs)
- Command configuration
- Environment variables (if specified)

When you run a task:
1. Nx computes a hash of all inputs
2. Checks if this hash exists in cache
3. If yes: restores outputs instantly
4. If no: runs the task and caches the result

### Cache Location

- Local cache: `.nx/cache/` (gitignored)
- Workspace data: `.nx/workspace-data/` (gitignored)

### Clearing Cache

```bash
# Clear all cache
npx nx reset

# Or manually delete
rm -rf .nx/cache
```

## New Commands vs Old npm Scripts

### Building Packages

**Old way (npm):**
```bash
cd packages/bpk-component-button
npm run build
```

**New way (Nx):**
```bash
# Build specific package
npm run nx -- run bpk-component-button:build

# Or using npx directly
npx nx run bpk-component-button:build
```

### Building All Packages

**Old way:**
```bash
npm run build
```

**New way:**
```bash
# Build all packages
npm run nx -- run-many --target=build --all

# Build all packages in parallel (default: 3 concurrent)
npm run nx -- run-many --target=build --all --parallel=5
```

### Building Multiple Specific Packages

```bash
# Build specific packages
npm run nx -- run-many --target=build --projects=bpk-component-button,bpk-component-card
```

### Affected Commands

Only build/test packages affected by your changes:

```bash
# Build only affected packages
npm run nx -- affected --target=build

# Test only affected packages
npm run nx -- affected --target=test

# Show what's affected
npm run nx -- affected:graph
```

## Common Tasks

### View Dependency Graph

```bash
# Open interactive dependency graph in browser
npm run nx -- graph

# Export to file
npm run nx -- graph --file=/tmp/nx-graph.html
```

### List All Projects

```bash
# Show all projects detected by Nx
npx nx show projects

# Count projects
npx nx show projects | wc -l
```

### Show Project Details

```bash
# Show project configuration
npx nx show project bpk-component-button

# Show as JSON
npx nx show project bpk-component-button --json
```

### Run with Verbose Output

```bash
# See detailed execution logs
npm run nx -- run bpk-component-button:build --verbose
```

### Skip Cache

```bash
# Force rebuild, ignore cache
npm run nx -- run bpk-component-button:build --skip-nx-cache
```

## Workspace Structure

```
backpack/
├── nx.json                    # Global Nx configuration
├── project.json              # Root workspace targets
├── .nx/                      # Nx cache and data (gitignored)
├── packages/
│   ├── bpk-component-button/
│   │   ├── project.json     # Package-specific Nx config
│   │   ├── src/
│   │   └── dist/            # Build output (gitignored)
│   └── .../
└── scripts/
    └── nx/
        └── generate-project-configs.js  # Generator script
```

## Configuration Files

### nx.json

Global Nx workspace configuration:
- Cache settings
- Task defaults (inputs/outputs)
- Parallel execution limits

### project.json

Package-specific configuration:
- Build targets
- Custom commands
- Cache outputs
- Dependencies

## Tips & Best Practices

### 1. Use Cache Effectively

- Cache is automatically enabled for build targets
- First build will be slow, subsequent builds are fast
- Modifying source files invalidates cache for that package only

### 2. Leverage Affected Commands

```bash
# Before pushing, test only what changed
npm run nx -- affected --target=test

# Save CI time by building only affected packages
npm run nx -- affected --target=build
```

### 3. Understand Dependencies

```bash
# See what depends on a package
npm run nx -- graph --focus=bpk-component-button
```

### 4. Debug Build Issues

```bash
# Run with verbose output
npm run nx -- run bpk-component-button:build --verbose

# Skip cache to force fresh build
npm run nx -- run bpk-component-button:build --skip-nx-cache
```

### 5. Parallel Execution

```bash
# Increase parallelism for faster builds (default: 3)
npm run nx -- run-many --target=build --all --parallel=8

# Be mindful of system resources
```

## Troubleshooting

### Cache Not Working?

1. Check if `.nx/cache` directory exists
2. Verify inputs in `nx.json` target defaults
3. Try clearing cache: `npx nx reset`

### Build Fails with Nx but Works with npm?

1. Check `project.json` command matches npm script
2. Verify `cwd` (current working directory) is correct
3. Ensure all file paths are relative to `cwd`

### Project Not Detected?

1. Verify `project.json` exists in package directory
2. Check file is valid JSON
3. Run `npx nx show projects` to list detected projects

### Slow Build After Changes?

This is expected! Cache is invalidated when source files change. The package needs to rebuild once, then subsequent runs will be fast again.

## Getting Help

- **Nx Documentation**: https://nx.dev
- **Backpack Migration Plan**: `specs/001-nx-migration/plan.md`
- **Command Reference**: `docs/nx-migration/nx-commands.md`
- **GitHub Issues**: Report issues with `nx-migration` label

## Next Steps

- Read the [Nx Commands Reference](./nx-commands.md)
- Review the [Milestone 1 Report](./milestone-1-report.md)
- Explore the dependency graph: `npm run nx -- graph`
- Try building a package: `npm run nx -- run bpk-component-button:build`
