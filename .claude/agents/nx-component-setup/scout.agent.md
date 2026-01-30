---
name: nx-setup-scout
description: Analyze repository structure to identify packages and prepare migration plan for Nx project setup
---

# Scout Agent: Nx Component Setup

Analyze a monorepo to identify all packages that need to be set up as Nx projects.

## Purpose

Explore the repository structure and produce a comprehensive analysis that the Migrator agent will use to generate scripts.

## Inputs

- Repository root path
- Packages directory (default: `packages/`)

## Outputs

Generate `analysis.json` in the output directory with:

```json
{
  "summary": {
    "totalPackages": 98,
    "withTypeScript": 97,
    "sassOnly": 1,
    "customBuild": 1
  },
  "packages": [
    {
      "name": "bpk-component-button",
      "path": "packages/bpk-component-button",
      "hasTypeScript": true,
      "hasSrc": true,
      "hasTests": true,
      "category": "component",
      "specialCase": null
    }
  ],
  "specialCases": [
    {
      "name": "bpk-mixins",
      "reason": "sass-only",
      "handling": "skipTsConfig"
    },
    {
      "name": "bpk-stylesheets",
      "reason": "custom-build",
      "handling": "customBuildTarget"
    }
  ],
  "dependencies": {
    "bpk-react-utils": ["bpk-component-button", "bpk-component-card", "..."]
  }
}
```

## Analysis Steps

1. **Discover Packages**
   - List all directories in packages/
   - Filter for valid package directories (have package.json)

2. **Analyze Each Package**
   - Check for `src/` directory
   - Check for TypeScript files (*.ts, *.tsx)
   - Check for test files (*-test.tsx, *.test.tsx)
   - Check for special build scripts (build.js)
   - Determine category (component, utility, foundation)

3. **Identify Special Cases**
   - Sass-only packages (no TypeScript)
   - Custom build packages (have build.js)
   - Code-generated packages (icon, flare, spinner)

4. **Map Dependencies**
   - Parse import statements
   - Build dependency graph
   - Identify circular dependencies

## Detection Rules

### Package Categories

```
component:   name starts with "bpk-component-"
utility:     bpk-react-utils, bpk-theming, bpk-scrim-utils, bpk-storybook-utils
foundation:  bpk-mixins, bpk-stylesheets
animation:   bpk-animate-height
```

### Special Case Detection

```
sass-only:     no *.ts or *.tsx files in package
custom-build:  has build.js in package root
code-gen:      has gulp task for generation
```

## Commands to Run

```bash
# Count packages
ls -d packages/bpk-* | wc -l

# Find packages with TypeScript
find packages -name "*.tsx" -o -name "*.ts" | cut -d/ -f2 | sort -u | wc -l

# Find packages without src/
for d in packages/bpk-*; do [ ! -d "$d/src" ] && echo "$d"; done

# Find custom build scripts
find packages -name "build.js" -maxdepth 2

# Analyze imports
grep -r "from '.*bpk-" packages/*/src --include="*.ts" --include="*.tsx" | head -50
```

## Validation

Before completing, verify:

- [ ] All packages discovered
- [ ] Special cases identified
- [ ] Categories assigned
- [ ] Dependencies mapped
- [ ] Output JSON is valid
