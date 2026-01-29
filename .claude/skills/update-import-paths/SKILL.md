---
name: update-import-paths
description: Update all relative imports to use NX path aliases across the codebase. Use when fixing imports after component migration, package rename, or refactoring.
argument-hint: <component-name> <package-alias>
disable-model-invocation: true
allowed-tools: Bash
---

## User Input

```text
$ARGUMENTS
```

## Overview

Updates all relative imports to a component to use the NX path alias instead. This ensures:
- NX can track dependencies correctly
- Caching works properly
- All imports use consistent aliases

## Usage

```bash
/update-import-paths bpk-component-badge @backpack/badge
```

Or with variables:
- Component name: `$0` or `$ARGUMENTS[0]`
- Package alias: `$1` or `$ARGUMENTS[1]`

## Task

Run the import path update script:

```bash
node scripts/nx/update-import-paths.js $0 $1
```

The script will:
1. Search all JS/TS files in the codebase (excluding node_modules, dist, coverage)
2. Find relative imports like `'../../packages/bpk-component-badge'`
3. Replace them with the NX alias `'@backpack/badge'`
4. Update both `import` and `require` statements
5. Report the number of files and imports updated

## Example Output

```
Updating imports from 'packages/bpk-component-badge' to '@backpack/badge'...
✓ Updated 3 import(s) in: examples/bpk-component-badge/stories.ts
✓ Updated 1 import(s) in: packages/bpk-component-card/src/Card.tsx

Complete! Updated 4 import(s) across 2 file(s).
```

## When to Use

- After running `/nx-migrate-component` (already included in that workflow)
- After manually renaming a package
- After refactoring component locations
- When cleaning up inconsistent import styles
- When fixing imports that bypass the path alias
