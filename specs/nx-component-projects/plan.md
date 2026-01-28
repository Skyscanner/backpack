<!--
==============================================================================
DOCUMENT PURPOSE: Design HOW to implement spec.md requirements (Implementation)
==============================================================================

This plan describes the technical solution for setting up all Backpack packages
as individual Nx projects. This is an infrastructure/tooling feature.

FOCUS: HOW
- How to generate project configuration files
- What file templates to use
- How to automate for 98 packages

Reference: spec.md, research.md
==============================================================================
-->

# Implementation Plan: Set Up Components as Nx Projects

**Branch**: `WOODPECKER-4042` | **Date**: 2026-01-28 | **Spec**: [spec.md](./spec.md)
**Research**: [research.md](./research.md)

## Summary

Set up all 98 Backpack packages as individual Nx projects by:
1. Creating a generation script to produce project.json and tsconfig files
2. Updating nx.json with targetDefaults for inherited configuration
3. Updating root tsconfig.json with project references
4. Validating with `nx graph` and `nx affected`

## Technical Context

**Build System**: Nx 22.4.0-beta.4 with @nx/js/typescript plugin
**TypeScript**: 5.9.2 (moduleResolution: bundler)
**Package Count**: 98 packages in `packages/`
**Import Style**: Relative paths (../../bpk-react-utils)
**Constraints**: Must not break existing npm scripts or CI pipeline

## Constitution Check

*GATE: Infrastructure changes - standard component gates do not apply*

- [x] **Infrastructure Change**: No source code changes, configuration only
- [x] **License Headers**: N/A - JSON config files do not require headers
- [x] **Backward Compatible**: Existing npm scripts continue to work
- [x] **Automation**: Script-based generation ensures consistency
- [x] **Versioning**: No version change - internal tooling only

## Project Structure

### Files to Generate (per package)

```text
packages/bpk-component-[name]/
├── project.json              # NEW: Nx project configuration
├── tsconfig.json             # NEW: Base TypeScript config
├── tsconfig.lib.json         # NEW: Library build config
└── tsconfig.spec.json        # NEW: Test config
```

### Files to Update (root level)

```text
/
├── nx.json                   # UPDATE: Add targetDefaults
├── tsconfig.json             # UPDATE: Add project references
└── scripts/nx/
    └── generate-project-configs.js  # NEW: Automation script
```

## File Templates

### project.json Template

```json
{
  "$schema": "../../node_modules/nx/schemas/project-schema.json",
  "name": "${PACKAGE_NAME}",
  "projectType": "library",
  "sourceRoot": "packages/${PACKAGE_NAME}/src",
  "tags": ["scope:backpack"]
}
```

**Special case - bpk-mixins** (Sass-only):
```json
{
  "$schema": "../../node_modules/nx/schemas/project-schema.json",
  "name": "bpk-mixins",
  "projectType": "library",
  "sourceRoot": "packages/bpk-mixins",
  "tags": ["scope:backpack"]
}
```

**Special case - bpk-stylesheets** (custom build):
```json
{
  "$schema": "../../node_modules/nx/schemas/project-schema.json",
  "name": "bpk-stylesheets",
  "projectType": "library",
  "sourceRoot": "packages/bpk-stylesheets/src",
  "tags": ["scope:backpack"],
  "targets": {
    "build": {
      "executor": "nx:run-commands",
      "options": {
        "command": "node build.js",
        "cwd": "packages/bpk-stylesheets"
      },
      "outputs": ["{projectRoot}/dist"]
    }
  }
}
```

### tsconfig.json Template (per package)

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src/**/*", "index.ts"],
  "exclude": ["node_modules", "dist"],
  "references": []
}
```

**Note**: Project references will be auto-populated based on import analysis.

### tsconfig.lib.json Template

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "declaration": true,
    "types": ["node"]
  },
  "exclude": [
    "**/*-test.ts",
    "**/*-test.tsx",
    "**/*.test.ts",
    "**/*.test.tsx",
    "**/*.stories.tsx",
    "**/*.figma.tsx"
  ]
}
```

### tsconfig.spec.json Template

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "types": ["jest", "node"]
  },
  "include": [
    "**/*-test.ts",
    "**/*-test.tsx",
    "**/*.test.ts",
    "**/*.test.tsx"
  ]
}
```

## nx.json Updates

### targetDefaults to Add

```json
{
  "targetDefaults": {
    "build": {
      "dependsOn": ["^build"],
      "inputs": ["production", "^production"],
      "outputs": ["{projectRoot}/dist"],
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

## Automation Script Design

### scripts/nx/generate-project-configs.js

```javascript
#!/usr/bin/env node
/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
 * Licensed under the Apache License, Version 2.0
 */

const fs = require('fs');
const path = require('path');

const PACKAGES_DIR = path.join(__dirname, '../../packages');

// Special cases that need custom configuration
const SPECIAL_CASES = {
  'bpk-mixins': {
    sourceRoot: 'packages/bpk-mixins', // No /src subdirectory
    skipTsConfig: true // Sass-only package
  },
  'bpk-stylesheets': {
    targets: {
      build: {
        executor: 'nx:run-commands',
        options: {
          command: 'node build.js',
          cwd: 'packages/bpk-stylesheets'
        },
        outputs: ['{projectRoot}/dist']
      }
    }
  }
};

function generateProjectJson(packageName) {
  const special = SPECIAL_CASES[packageName] || {};

  const config = {
    $schema: '../../node_modules/nx/schemas/project-schema.json',
    name: packageName,
    projectType: 'library',
    sourceRoot: special.sourceRoot || `packages/${packageName}/src`,
    tags: ['scope:backpack']
  };

  if (special.targets) {
    config.targets = special.targets;
  }

  return config;
}

function generateTsConfig(packageName) {
  return {
    extends: '../../tsconfig.base.json',
    compilerOptions: {
      outDir: 'dist',
      rootDir: 'src'
    },
    include: ['src/**/*', 'index.ts'],
    exclude: ['node_modules', 'dist'],
    references: []
  };
}

function generateTsConfigLib() {
  return {
    extends: './tsconfig.json',
    compilerOptions: {
      declaration: true,
      types: ['node']
    },
    exclude: [
      '**/*-test.ts',
      '**/*-test.tsx',
      '**/*.test.ts',
      '**/*.test.tsx',
      '**/*.stories.tsx',
      '**/*.figma.tsx'
    ]
  };
}

function generateTsConfigSpec() {
  return {
    extends: './tsconfig.json',
    compilerOptions: {
      types: ['jest', 'node']
    },
    include: [
      '**/*-test.ts',
      '**/*-test.tsx',
      '**/*.test.ts',
      '**/*.test.tsx'
    ]
  };
}

function main() {
  const packages = fs.readdirSync(PACKAGES_DIR)
    .filter(name => {
      const stat = fs.statSync(path.join(PACKAGES_DIR, name));
      return stat.isDirectory() && name.startsWith('bpk-');
    });

  console.log(`Found ${packages.length} packages to configure`);

  let created = 0;
  let skipped = 0;

  for (const pkg of packages) {
    const pkgDir = path.join(PACKAGES_DIR, pkg);
    const special = SPECIAL_CASES[pkg] || {};

    // Generate project.json
    const projectJsonPath = path.join(pkgDir, 'project.json');
    const projectJson = generateProjectJson(pkg);
    fs.writeFileSync(projectJsonPath, JSON.stringify(projectJson, null, 2) + '\n');

    // Generate tsconfig files (unless Sass-only)
    if (!special.skipTsConfig) {
      fs.writeFileSync(
        path.join(pkgDir, 'tsconfig.json'),
        JSON.stringify(generateTsConfig(pkg), null, 2) + '\n'
      );
      fs.writeFileSync(
        path.join(pkgDir, 'tsconfig.lib.json'),
        JSON.stringify(generateTsConfigLib(), null, 2) + '\n'
      );
      fs.writeFileSync(
        path.join(pkgDir, 'tsconfig.spec.json'),
        JSON.stringify(generateTsConfigSpec(), null, 2) + '\n'
      );
      created++;
    } else {
      skipped++;
    }

    console.log(`✓ ${pkg}`);
  }

  console.log(`\nGenerated configs for ${created} packages`);
  console.log(`Skipped tsconfig for ${skipped} packages (Sass-only)`);
  console.log('\nNext steps:');
  console.log('1. Run: npx nx graph');
  console.log('2. Run: npx nx show projects');
  console.log('3. Verify: npm test');
}

main();
```

## Implementation Phases

### Phase 1: Setup Script

1. Create `scripts/nx/` directory
2. Create `generate-project-configs.js` with templates
3. Test script locally on a few packages

### Phase 2: Generate Configuration Files

1. Run generation script: `node scripts/nx/generate-project-configs.js`
2. Expected output: 98 project.json files, ~291 tsconfig files (3 per package, minus Sass-only)
3. Review generated files for correctness

### Phase 3: Update Root Configuration

1. Update `nx.json` with targetDefaults
2. Update root `tsconfig.json` with project references (optional, may be auto-inferred)

### Phase 4: Validation

1. Run `nx show projects` - expect 98 projects
2. Run `nx graph` - verify dependency edges
3. Run `nx affected --target=test --base=main` - verify affected detection
4. Run `npm test` - verify no regressions
5. Run CI pipeline - verify all checks pass

### Phase 5: Documentation

1. Update root README.md with Nx commands
2. Document how to add new packages

## Dependency Analysis

### Packages with Most Dependents

Based on import patterns:

| Package | Approximate Dependents |
|---------|----------------------|
| bpk-react-utils | ~70+ components |
| bpk-component-icon | ~40+ components |
| bpk-theming | ~30+ components |
| bpk-mixins | All components (Sass) |

### Expected `nx graph` Structure

```
                    ┌──────────────────┐
                    │  bpk-react-utils │
                    └────────┬─────────┘
                             │
         ┌───────────────────┼───────────────────┐
         ▼                   ▼                   ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ bpk-component-  │ │ bpk-component-  │ │ bpk-component-  │
│     button      │ │      card       │ │     modal       │
└─────────────────┘ └─────────────────┘ └─────────────────┘
         │                   │
         ▼                   ▼
┌─────────────────┐ ┌─────────────────┐
│ bpk-component-  │ │ bpk-component-  │
│      icon       │ │    theming      │
└─────────────────┘ └─────────────────┘
```

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Breaking existing builds | Run full CI before merging |
| Circular dependencies detected | Document as known issues, fix in follow-up |
| IDE performance degradation | Monitor memory usage, optimize if needed |
| Script misses edge cases | Manual review of generated files |

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Project count | 98 | `nx show projects \| wc -l` |
| Graph accuracy | All edges correct | Manual review of `nx graph` |
| Cache hit rate | >80% on unchanged | CI pipeline logs |
| CI time reduction | 30%+ for partial changes | Compare before/after |
| No regressions | All tests pass | `npm test` |

## Testing Plan

### Validation Commands

```bash
# Verify project count
npx nx show projects | wc -l  # Expected: 98

# Verify graph
npx nx graph  # Visual inspection

# Verify affected detection
touch packages/bpk-react-utils/src/cssModules.ts
npx nx affected --target=test --base=HEAD~1
# Should show bpk-react-utils and all dependents

# Verify typecheck
npx nx run-many --target=typecheck --all

# Verify no regressions
npm test
npm run lint
npm run build
```

### Edge Case Tests

1. **Empty package change**: Touch README.md only, verify no tests run
2. **Utility change**: Touch bpk-react-utils, verify cascade
3. **Isolated component**: Touch component with no dependents
4. **Build cache**: Run same command twice, verify cache hit

## Next Steps After Implementation

1. **Milestone 5**: Converting Static Checks to Nx (lint, format)
2. **Milestone 6**: Configure Module Boundaries
3. **Milestone 7**: Publishing with Nx

## References

- [spec.md](./spec.md) - Requirements specification
- [research.md](./research.md) - Research findings
- [Nx Project Configuration](https://nx.dev/concepts/inferred-tasks)
- [TypeScript Project References](https://www.typescriptlang.org/docs/handbook/project-references.html)
