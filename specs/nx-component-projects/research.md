# Research: Set Up Components as Nx Projects

**Branch**: `WOODPECKER-4042`
**Date**: 2026-01-28
**Spec**: [spec.md](./spec.md)

## Current State Analysis

### Nx Configuration

**Current Setup** (minimal):
- Nx version: 22.4.0-beta.4
- Configuration: `nx.json` with `@nx/js/typescript` plugin only
- No project.json files exist
- No path mappings configured

**nx.json**:
```json
{
  "$schema": "./node_modules/nx/schemas/nx-schema.json",
  "plugins": [
    {
      "plugin": "@nx/js/typescript",
      "options": {
        "typecheck": {
          "targetName": "typecheck"
        }
      }
    }
  ],
  "namedInputs": {
    "default": ["{projectRoot}/**/*", "sharedGlobals"],
    "production": [
      "default",
      "!{projectRoot}/**/*.test.tsx",
      "!{projectRoot}/**/*-test.tsx",
      "!{projectRoot}/**/*.stories.tsx",
      "!{projectRoot}/**/*.figma.tsx"
    ],
    "sharedGlobals": []
  },
  "targetDefaults": {}
}
```

### Package Count & Categories

**Total**: 98 packages in `packages/` directory

| Category | Count | Examples |
|----------|-------|----------|
| UI Components | ~80 | bpk-component-button, bpk-component-card, bpk-component-modal |
| Utilities | 4 | bpk-react-utils, bpk-theming, bpk-scrim-utils, bpk-storybook-utils |
| Foundations | 2 | bpk-mixins (Sass-only), bpk-stylesheets (custom build) |
| Animation | 1 | bpk-animate-height |

### Import Patterns

All imports use **relative paths** (no path aliases):

```typescript
// From bpk-component-button/src/BpkButtonV2/BpkButton.tsx
import { cssModules } from '../../../bpk-react-utils';

// From bpk-component-button/src/examples.tsx
import LargeLongArrowRightIcon from '../../bpk-component-icon/lg/long-arrow-right';
```

### TypeScript Configuration

**tsconfig.base.json** (current):
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "module": "esnext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "isolatedModules": true
    // Note: No baseUrl or paths configured
  }
}
```

**tsconfig.json** (root):
```json
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": { "noEmit": true },
  "include": ["packages", "@types", "examples"],
  "exclude": ["**/**/*.figma.tsx"],
  "references": []
}
```

### Special Case Packages

| Package | Special Handling |
|---------|------------------|
| `bpk-mixins` | Sass-only (no TypeScript, no build) |
| `bpk-stylesheets` | Custom webpack build (`build.js`) |
| `bpk-component-icon` | Code-generated (Gulp scripts) |
| `bpk-component-flare` | Code-generated (Gulp scripts) |
| `bpk-component-spinner` | Code-generated (Gulp scripts) |

### Dependency Graph (Key Relationships)

```
bpk-react-utils ←── (most components)
bpk-theming ←── (themeable components)
bpk-component-icon ←── (components with icons)
@skyscanner/bpk-foundations-web ←── (all components via bpk-mixins)
```

## Decisions Made

### D1: project.json Structure

**Decision**: Use explicit project.json files with minimal configuration

**Rationale**:
- Provides clear project boundaries
- Enables `nx affected` and `nx graph`
- Works with existing Babel/Webpack build system
- Aligns with clarification Q3 (nx.json defaults + overrides)

**Template**:
```json
{
  "$schema": "../../node_modules/nx/schemas/project-schema.json",
  "name": "bpk-component-button",
  "projectType": "library",
  "sourceRoot": "packages/bpk-component-button/src",
  "tags": ["scope:backpack"]
}
```

### D2: tsconfig Structure

**Decision**: Each package gets 3 tsconfig files

**Rationale**:
- Enables scoped type checking (FR-002, FR-003, FR-004)
- Supports IDE go-to-definition across packages
- Allows test files to be excluded from library builds

**Files per package**:
1. `tsconfig.json` - Base config with project references
2. `tsconfig.lib.json` - Library build (excludes tests/stories)
3. `tsconfig.spec.json` - Test files only

### D3: Tags Taxonomy

**Decision**: Minimal taxonomy (`scope:backpack` only)

**Rationale**:
- Per clarification Q2
- Simplifies initial setup
- Can be extended later if needed for module boundaries

### D4: Target Inheritance

**Decision**: Define targets in nx.json, override only for special cases

**Rationale**:
- Per clarification Q3
- Reduces duplication across 98 project.json files
- Only bpk-stylesheets needs custom build target

**nx.json targetDefaults**:
```json
{
  "targetDefaults": {
    "build": {
      "dependsOn": ["^build"],
      "inputs": ["production", "^production"],
      "cache": true
    },
    "test": {
      "inputs": ["default", "^production"],
      "cache": true
    },
    "lint": {
      "inputs": ["default"],
      "cache": true
    },
    "typecheck": {
      "dependsOn": ["^typecheck"],
      "inputs": ["default", "^default"],
      "cache": true
    }
  }
}
```

### D5: Automation Script

**Decision**: Create generation script for 98 packages

**Rationale**:
- Manual creation is error-prone and time-consuming
- Script ensures consistency
- Easy to re-run if template changes

**Script location**: `scripts/nx/generate-project-configs.js`

## Alternatives Considered

### Import Paths

| Option | Pros | Cons | Decision |
|--------|------|------|----------|
| Keep relative paths | No breaking changes, works now | Deep paths (`../../../`) | **Selected** |
| Add tsconfig paths | Cleaner imports | Breaking change, babel config changes | Deferred |

### Project Detection

| Option | Pros | Cons | Decision |
|--------|------|------|----------|
| Explicit project.json | Clear, predictable | More files | **Selected** |
| package.json inference | Fewer files | Requires changes to publish flow | Rejected |

### TypeScript Plugin

| Option | Pros | Cons | Decision |
|--------|------|------|----------|
| @nx/js/typescript | Already configured | Requires tsconfig per project | **Selected** |
| Custom executor | Full control | More maintenance | Rejected |

## Architecture Decision References

- `decisions/versioning-rules.md` - No version change (internal tooling)
- `decisions/packages.md` - Package structure patterns
- Nx Documentation: [Inferred Tasks](https://nx.dev/concepts/inferred-tasks)
- TypeScript: [Project References](https://www.typescriptlang.org/docs/handbook/project-references.html)

## Implementation Notes

### Automation Strategy

1. **Generate project.json** for all 98 packages
2. **Generate tsconfig files** (3 per package = 294 files)
3. **Update nx.json** with targetDefaults
4. **Update root tsconfig.json** with project references
5. **Verify** with `nx graph` and `nx affected`

### Special Case Handling

```javascript
// scripts/nx/generate-project-configs.js
const specialCases = {
  'bpk-mixins': {
    // Sass-only, no targets needed
    targets: {}
  },
  'bpk-stylesheets': {
    // Custom build process
    targets: {
      build: {
        executor: 'nx:run-commands',
        options: {
          command: 'node build.js',
          cwd: 'packages/bpk-stylesheets'
        }
      }
    }
  }
};
```

### Validation Checklist

- [x] `nx show projects` returns 93 projects (92 packages + 1 root)
- [x] `nx graph` displays all projects with edges
- [x] `nx affected --target=test` works correctly
- [x] `nx run-many --target=typecheck --all` - Note: Pre-existing icon import errors
- [ ] Existing `npm test` still works
- [ ] CI pipeline passes

## Implementation Results (2026-01-30)

### Actual Package Count

**Total packages**: 92 (not 98 as initially estimated)
**Nx detected projects**: 93 (92 packages + 1 root project)

### Files Generated

| File Type | Count |
|-----------|-------|
| project.json | 92 |
| tsconfig.json | 91 (bpk-mixins excluded) |
| tsconfig.lib.json | 91 |
| tsconfig.spec.json | 91 |
| **Total** | 365 files |

### Circular Dependencies Found

The Nx graph revealed **41 circular dependency chains** in the existing codebase. Key cycles:

1. `bpk-component-button` ↔ `bpk-component-icon`
2. `bpk-component-banner-alert` → `bpk-component-aria-live` → `bpk-component-fieldset` → `bpk-component-input` → `bpk-component-banner-alert`
3. Multiple cycles involving `bpk-component-autosuggest`, `bpk-component-input`, `bpk-component-fieldset`

**Impact**: `npx nx typecheck` with `dependsOn: ["^typecheck"]` fails due to circular task graph. Removed `dependsOn` from typecheck target.

### Pre-existing TypeScript Errors

The codebase has existing TypeScript errors related to `bpk-component-icon` imports:

```
Cannot find module '../../../bpk-component-icon/lg/view' or its corresponding type declarations.
```

These errors exist in ~20+ files and are **not caused by this implementation**. They relate to the code-generated icon package structure.

### Special Cases Handled

| Package | Configuration |
|---------|--------------|
| `bpk-mixins` | Sass-only: project.json only, no tsconfig files |
| `bpk-stylesheets` | Custom build target: `nx:run-commands` with `node build.js` |

### Recommendations for Future Work

1. **Fix circular dependencies**: Refactor component imports to break dependency cycles
2. **Fix icon TypeScript definitions**: Ensure bpk-component-icon generates proper .d.ts files
3. **Enable typecheck dependsOn**: Once cycles are fixed, re-add `dependsOn: ["^typecheck"]`
4. **Add module boundary rules**: Use Nx's `@nx/enforce-module-boundaries` lint rule
