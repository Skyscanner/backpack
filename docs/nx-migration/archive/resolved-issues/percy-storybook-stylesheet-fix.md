# Percy Storybook Stylesheet Generation Issue

**Status**: ✅ Resolved | **Date**: 2026-01-29 | **Commits**: 04f1f2ddb, 76ac4b2ed, 7284d6e4b

## Problem

Percy tests failed with:
```
Error: Can't find stylesheet to import.
@use './normalize';
```

The `normalize.scss` file wasn't generated before Storybook build.

## Root Cause

1. `storybook:build` had no dependency on `styles` task
2. `styles` task was missing `build:gulp` step
3. Nx output paths used relative format (needed `{workspaceRoot}/` prefix)

## Solution

### 1. Add styles dependency to storybook:build

**File**: `project.json` (root)

```json
{
  "storybook:build": {
    "dependsOn": ["styles"]
  }
}
```

### 2. Complete the styles task

**File**: `project.json` (root)

```json
{
  "styles": {
    "options": {
      "commands": [
        "npm run build:copy-normal_css",
        "npm run build:gulp",          // ← Added
        "npm run build:sass",
        "npm run build:stylesheets"
      ]
    },
    "outputs": [
      "{workspaceRoot}/packages/bpk-stylesheets/dist",      // ← Fixed
      "{workspaceRoot}/packages/bpk-stylesheets/normalize.scss"  // ← Fixed
    ]
  }
}
```

## How It Works

```
percy
  → depends on storybook:build
    → depends on styles
      → builds: copy → gulp → sass → stylesheets
        → generates: normalize.scss ✅
      → storybook finds normalize.scss ✅
  → runs visual tests ✅
```

## Impact

- ✅ Percy tests work reliably in CI/CD
- ✅ Storybook has all generated resources
- ✅ Nx caching works correctly
- ✅ No performance impact

## Key Learnings

- Explicit task dependencies are crucial in Nx
- All stylesheet generation steps must be included
- Always use `{workspaceRoot}/` prefix for Nx outputs
- What works locally must work in parallel CI execution
