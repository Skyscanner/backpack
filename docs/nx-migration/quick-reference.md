# Nx Quick Reference

Quick reference for common Nx commands in Backpack.

## Build Commands

```bash
# Build single package
npx nx build bpk-component-button

# Build all packages
npx nx run-many --target=build --all

# Build only affected packages
npx nx affected --target=build

# Build with parallel execution
npx nx run-many --target=build --all --parallel=4
```

## Test Commands

```bash
# Test single package
npx nx test bpk-component-button

# Test all packages
npx nx run-many --target=test --all

# Test only affected packages
npx nx affected --target=test

# Skip cache
npx nx test bpk-component-button --skip-nx-cache
```

## Lint Commands

```bash
# Lint single package (ESLint)
npx nx lint bpk-component-button

# Stylelint single package
npx nx stylelint bpk-component-button

# Lint all packages (ESLint + Stylelint)
npx nx run-many --targets=lint,stylelint --all

# Lint only affected
npx nx affected --targets=lint,stylelint
```

## Storybook Commands

```bash
# Start Storybook dev server
npx nx storybook
# or
npm run dev

# Build Storybook
npx nx storybook:build
# or
npm run dev:build

# Run Percy visual tests
npx nx percy
```

## Affected Commands

```bash
# Show what's affected
npx nx print-affected

# Run multiple targets on affected
npx nx affected --targets=lint,test,build

# Specify base branch
npx nx affected --target=test --base=origin/main

# View affected dependency graph
npx nx affected:graph
```

## Cache Management

```bash
# Clear all cache
npx nx reset

# Skip cache for specific run
npx nx build bpk-component-button --skip-nx-cache

# View cache statistics
npx nx show project bpk-component-button
```

## Dependency Graph

```bash
# View full dependency graph
npx nx graph

# Focus on specific package
npx nx graph --focus=bpk-component-button

# View affected graph
npx nx affected:graph
```

## Parallel Execution

```bash
# Control parallelism (default: 3)
npx nx run-many --target=build --all --parallel=5

# Sequential execution
npx nx run-many --target=build --all --parallel=1
```

## Output Styles

```bash
# Default (static summary)
npx nx run-many --target=test --all

# Stream output in real-time
npx nx run-many --target=test --all --output-style=stream

# Stream with project prefixes
npx nx run-many --target=test --all --output-style=stream-with-prefixes
```

## Common Workflows

### Daily Development

```bash
# Start development
npm run dev                              # Storybook dev server

# Test what you changed
npx nx affected --target=test            # Only affected tests

# Lint before commit
npx nx affected --targets=lint,stylelint # Only affected linting
```

### Before Creating PR

```bash
# See what's affected
npx nx affected:graph --base=origin/main

# Run full suite on affected
npx nx affected --targets=lint,stylelint,test,build --base=origin/main

# Verify cache works
npx nx affected --target=test --base=origin/main  # Should hit cache on 2nd run
```

### CI/CD

```bash
# GitHub Actions example
npx nx affected --target=lint --base=origin/main --parallel=3
npx nx affected --target=test --base=origin/main --parallel=3
npx nx affected --target=build --base=origin/main --parallel=3
```

## VSCode Integration

### Recommended Extensions

For the best Nx development experience in VSCode, install these extensions:

```json
{
  "recommendations": [
    "nrwl.angular-console",       // Nx Console - visual task runner
    "dbaeumer.vscode-eslint",     // ESLint integration
    "stylelint.vscode-stylelint", // Stylelint integration
    "esbenp.prettier-vscode"      // Prettier formatting
  ]
}
```

To install:
1. Open VS Code
2. Go to Extensions (Cmd+Shift+X)
3. Search for each extension and install

### VSCode Tasks (Optional)

You can optionally create `.vscode/tasks.json` in your workspace for quick access to Nx commands:

<details>
<summary>Example tasks.json configuration</summary>

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Nx: Build All",
      "type": "shell",
      "command": "npx nx run-many --target=build --all",
      "group": "build"
    },
    {
      "label": "Nx: Test Affected",
      "type": "shell",
      "command": "npx nx affected --target=test",
      "group": "test"
    },
    {
      "label": "Nx: Storybook Dev",
      "type": "shell",
      "command": "npx nx storybook",
      "isBackground": true
    }
  ]
}
```

</details>

Use tasks:
- `CMD+Shift+P` → "Tasks: Run Task" → Select Nx task

## Troubleshooting

```bash
# Cache issues
npx nx reset                             # Clear cache

# Dependency graph issues
npx nx graph                             # Verify connections

# Verbose output
npx nx build bpk-component-button --verbose

# Check project configuration
npx nx show project bpk-component-button
```

## Resources

- **Full Documentation**: `docs/nx-migration/`
- **Getting Started**: `docs/nx-migration/getting-started.md`
- **Testing Guide**: `docs/nx-migration/testing-guide.md`
- **Affected Commands**: `docs/nx-migration/affected-commands.md`
- **Nx Documentation**: https://nx.dev/
