---
description: Migrate a Backpack component to NX monorepo structure
---

## User Input

```text
$ARGUMENTS
```

## Overview

This skill migrates a Backpack component to NX monorepo structure following Skyscanner production standards by:
1. Configuring NX targets in package.json (NOT project.json)
2. Setting up proper TypeScript path mappings
3. Configuring Jest and ESLint tooling
4. Testing the migration

**Important**:
- Per Skyscanner production standards, NX configuration must be in package.json, not in a separate project.json file.
- Components do NOT build to a dist folder - they reference source files directly.

## Prerequisites

- Component must exist in `packages/` directory
- NX must be installed and configured in the workspace
- Base configuration files must exist (jest.preset.js, .eslintrc.base.js, tsconfig.base.json)

## Steps

### 1. Extract Component Information

Parse the component name from user arguments (e.g., "bpk-component-badge").

### 2. Verify Component Exists

Check that `packages/{component-name}` directory exists.

### 3. Read Existing Configuration

Read the current component structure:
- Check for existing package.json
- Check for existing source files
- Identify the main component file

### 4. Verify or Create index.ts

**Important**: The component should already have an `index.ts` at the package root (NOT in src/). This serves as the public API entry point.

If it doesn't exist, create a barrel export file at `packages/{component-name}/index.ts`:

```typescript
/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Export the main component and types from src/
import component, { BADGE_TYPES, type Props } from './src/{MainComponent}';
import themeAttributes from './src/themeAttributes';

export type {ComponentName}Props = Props;
export default component;
export { BADGE_TYPES, themeAttributes };
```

**Key Points**:
- The `index.ts` lives at the package root, not in `src/`
- It imports from `./src/` and re-exports the public API
- The transpilation process will compile this along with all packages

### 5. Detect Special Build Requirements

**Check if this is a special component** that requires asset generation:
- `bpk-component-icon` - requires `gulp generateIcons` (copies icon SVGs from @skyscanner/bpk-svgs)
- `bpk-component-spinner` - requires `gulp generateSpinners` (generates spinner assets)
- `bpk-component-flare` - requires `gulp generateFlare` (generates flare assets)

These components have gulp tasks defined in `gulpfile.js/{component-name}/` that must run before type-checking.

**To detect**: Check if `gulpfile.js/{component-name}/` directory exists. If it does, this component needs special build configuration (see Exception section in step 6).

### 6. Create or Update package.json with NX Configuration

**Choose the appropriate configuration based on step 5**:
- **Standard components** (most components): Use the standard build configuration below
- **Special components** (icon, spinner, flare): Use the special build configuration in the Exception section

**CRITICAL**: Following Skyscanner production standards for TypeScript monorepos:
- NX configuration MUST be in package.json using the `nx` field (Do NOT create project.json)
- Components reference source files directly (Do NOT build to dist folder)

Ensure package.json has the correct structure with NX configuration:

```json
{
  "name": "@backpack/{short-name}",
  "version": "0.0.1",
  "description": "Backpack {short-name} component",
  "main": "./index.ts",
  "types": "./index.ts",
  "files": ["index.ts", "src"],
  "dependencies": {
    "@backpack/react-utils": "*"
  },
  "peerDependencies": {
    "react": "^17.0.2 || ^18.0.0",
    "react-dom": "^17.0.2 || ^18.0.0"
  },
  "publishConfig": {
    "registry": "https://registry.npmjs.org/",
    "access": "public"
  },
  "license": "Apache-2.0",
  "nx": {
    "tags": ["type:component", "scope:ui"],
    "targets": {
      "build": {
        "executor": "nx:run-commands",
        "options": {
          "command": "tsc --noEmit"
        },
        "dependsOn": ["^build"],
        "inputs": ["production", "^production"],
        "outputs": [],
        "cache": true
      },
      "test": {
        "executor": "@nx/jest:jest",
        "options": {
          "jestConfig": "packages/{component-name}/jest.config.js"
        },
        "inputs": ["default", "^production"],
        "cache": true
      },
      "lint": {
        "executor": "nx:run-commands",
        "options": {
          "command": "eslint src --ext .ts,.tsx && stylelint \"src/**/*.scss\"",
          "cwd": "packages/{component-name}"
        },
        "inputs": ["default"],
        "cache": true
      }
    }
  }
}
```

**Key Points**:
- `main` and `types` point to the barrel export file (`./index.ts`) at the package root
- `files` includes both `index.ts` and the `src` directory
- No `scripts` section - commands are defined directly in NX targets
- `nx.tags`: Metadata for categorizing and filtering projects in the monorepo
- `nx.targets.build`: Configures the build target with dependency ordering and caching
  - `executor: "nx:run-commands"`: Uses NX's command executor
  - `options.command`: The actual command to run (`tsc --noEmit` for type-checking)
  - No `cwd` needed - NX executors run from the project root automatically
  - `dependsOn: ["^build"]`: Ensures dependencies are built first
  - `outputs: []`: Indicates no dist folder is generated (type-checking only)
  - `cache: true`: Enables NX caching for build results
- `nx.targets.test`: Configures the test target
  - `executor: "@nx/jest:jest"`: Uses NX's Jest plugin (preferred over nx:run-commands)
  - `options.jestConfig`: Path to Jest config from workspace root
  - No `cwd` needed - Jest plugin handles directory context automatically
  - `inputs`: Defines which files affect the test cache
  - `cache: true`: Enables NX caching for test results
- `nx.targets.lint`: Configures the lint target
  - `executor: "nx:run-commands"`: Uses NX's command executor
  - `options.command`: Combined ESLint and Stylelint command
  - `options.cwd`: Set to the package directory to ensure commands run with correct working directory
  - `inputs`: Defines which files affect the lint cache
  - `cache: true`: Enables NX caching for lint results

**Note on Build Scripts**: The root `package.json` has build scripts like `build:sass`, `build:gulp`, etc. These are for **monorepo-wide publishing/distribution** and should NOT be added to individual component build targets:
- `build:sass` - Compiles all SCSS to CSS globally (runs before publishing)
- `build:gulp` - Runs all gulp tasks for special components (flare, icon, spinner)
- `build:copy-normal_css` - Only for bpk-stylesheets package
- Individual component builds are for **validation only** (type-checking during development/CI)

**EXCEPTION - Special Components with Asset Generation**:
For the 3 components that require gulp tasks (icon, spinner, flare), their build target should run the gulp task BEFORE type-checking:

```json
"build": {
  "executor": "nx:run-commands",
  "options": {
    "commands": [
      "gulp generate{Icons|Spinners|Flare}",
      "cd packages/{component-name} && tsc --noEmit"
    ],
    "parallel": false
  },
  "dependsOn": ["^build"],
  "inputs": ["production", "^production"],
  "outputs": ["packages/{component-name}/sm", "packages/{component-name}/lg"],
  "cache": true
}
```

**Key differences for special components**:
- `options.commands` is an array with gulp task first, then type-checking
- `parallel: false` ensures gulp runs before tsc
- `outputs` lists the generated asset directories (sm/, lg/ for icons)
- The gulp command runs from the root (where gulpfile.js/ is located)
- Type-checking uses `cd` to run in the package directory

### 7. Create or Update tsconfig.json

Components do not emit build output - TypeScript is used for type checking only.

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "composite": false,
    "noEmit": true
  },
  "include": ["src/**/*", "../../@types/**/*"],
  "exclude": [
    "src/**/*-test.tsx",
    "src/**/*.test.tsx",
    "src/**/*.figma.tsx",
    "src/**/__snapshots__",
    "node_modules"
  ]
}
```

**Key Points**:
- `noEmit: true` - No build output is generated
- No `outDir`, `declaration`, `declarationMap`, or `sourceMap` settings
- Components are consumed directly from source

### 8. Create or Update jest.config.js

```javascript
const baseConfig = require('../../jest.preset.js');

const { testRegex, ...configWithoutTestRegex } = baseConfig;

module.exports = {
  ...configWithoutTestRegex,
  displayName: '{component-name}',
  testMatch: ['<rootDir>/src/**/*-test.tsx'],
  coverageDirectory: '../../coverage/packages/{component-name}',

  // Use root babel config
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { rootMode: 'upward' }],
  },

  // Override paths from preset to be relative to component root
  moduleNameMapper: {
    '^.+\\.scss$': '<rootDir>/../../scripts/stubs/styleStub.js',
    '^.+\\.(svg|png)$': '<rootDir>/../../scripts/stubs/fileStub.js',
    'react-transition-group/CSSTransition': '<rootDir>/../../scripts/stubs/cssTransitionStub.js',
    '@skyscanner/bpk-svgs/dist/svgs/^.+\\.svg$': '<rootDir>/../../scripts/stubs/fileStub.js',
    '^react($|/.+)': '<rootDir>/../../node_modules/react$1',
  },

  setupFilesAfterEnv: ['<rootDir>/../../scripts/jest/setup.js'],
};
```

### 9. Create or Update .eslintrc.json

```json
{
  "extends": ["../../.eslintrc.base.js"],
  "ignorePatterns": ["!**/*", "node_modules"]
}
```

### 10. Update tsconfig.base.json Path Mapping

Add the component to the paths in the root tsconfig.base.json:

```json
"paths": {
  "@backpack/{short-name}": ["packages/{component-name}/index.ts"]
}
```

### 11. Update Import Paths Across Codebase

**CRITICAL**: Run the import path update script to replace all relative imports with the new NX path alias across the entire codebase:

```bash
node scripts/nx/update-import-paths.js {component-name} @backpack/{short-name}
```

Example:
```bash
node scripts/nx/update-import-paths.js bpk-component-badge @backpack/badge
```

This script will:
- Search all JS/TS files in the codebase (excluding node_modules, dist, coverage)
- Replace relative imports like `'../../packages/bpk-component-badge'` with `'@backpack/badge'`
- Replace both `import` and `require` statements
- Report the number of files and imports updated

**Why this is important**:
- Other packages/examples may be importing this component using relative paths
- These need to be updated to use the new NX path alias
- This ensures consistency across the monorepo
- Enables proper NX dependency tracking and caching

### 12. Test the Migration

Run the following commands to verify (use the package name from package.json):

```bash
npx nx build @backpack/{short-name}
npx nx test @backpack/{short-name}
npx nx lint @backpack/{short-name}
```

**Note**: When NX configuration is in package.json, you must use the package name (e.g., `@backpack/badge`) rather than the directory name (e.g., `bpk-component-badge`). The build command performs type-checking only and does not generate a dist folder.

### 13. Report Results

Report success or any errors encountered during migration.

## Error Handling

- If component doesn't exist, error and ask user to provide valid component name
- If NX commands fail, report the error and suggest fixes
- If files already exist, warn user before overwriting

## Output

Report:
- Files created/updated
- Import paths updated (number of files and imports modified)
- NX commands tested
- Any warnings or issues
- Next steps (if any)
