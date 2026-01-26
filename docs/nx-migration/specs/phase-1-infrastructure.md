# Phase 1: Silent Infrastructure

**Purpose**: Install NX alongside existing build system without activating it

**Total Specs**: 8
**Prerequisites**: Phase 0 complete
**Risk Level**: Low (NX installed but not activated)

---

## Spec 1.1: Install NX packages silently

**Description for Spec Kit**:

```
Install NX core packages without changing any existing build scripts.

Tasks:
1. Install NX core packages as dev dependencies:
   pnpm add -D nx@latest @nx/workspace@latest
2. Create a minimal nx.json configuration file at the repository root:
   {
     "$schema": "./node_modules/nx/schemas/nx-schema.json",
     "extends": "nx/presets/npm.json",
     "plugins": [],
     "targetDefaults": {}
   }
3. Add .nx directory to .gitignore:
   echo ".nx/" >> .gitignore
   echo "!.nx/workspace-data/" >> .gitignore
4. Verify NX is installed by running: npx nx --version
5. DO NOT modify any package.json scripts yet - existing npm/lerna scripts should continue working
6. Commit with message: "chore: Install NX core packages (silent mode)"

Acceptance Criteria:
- nx and @nx/workspace are in package.json devDependencies
- nx.json exists at repository root with minimal configuration
- .nx/ is added to .gitignore
- Running `npx nx --version` shows the installed NX version
- Existing build/test/lint scripts still work with npm/pnpm
- All CI pipelines continue to pass
- Changes are committed to git

Context:
This "silent installation" allows NX to coexist with the current build system. The existing npm/lerna scripts continue working while we gradually migrate to NX in later phases. The npm preset allows NX to discover existing package.json scripts.
```

**Status**: ⬜ Not Started

**Notes**:
- Use `@latest` to get the most recent NX version
- Verify CI passes before proceeding

---

## Spec 1.2: Create empty directory structure

**Description for Spec Kit**:

```
Create the standard NX monorepo directory structure without moving any existing code.

Tasks:
1. Create the following empty directories at repository root:
   mkdir -p apps
   mkdir -p libs/shared/ui
   mkdir -p libs/shared/utils-universal
   mkdir -p libs/shared/utils-frontend
   mkdir -p libs/shared/types
   mkdir -p libs/shared/constants
   mkdir -p libs/shared/testing
   mkdir -p tools/scripts
2. Create placeholder README files in each directory explaining its purpose:
   - apps/README.md: "Contains runnable applications (future home of Storybook host, etc.)"
   - libs/README.md: "Contains reusable libraries organized by component"
   - libs/shared/README.md: "Contains shared code used across multiple components"
   - tools/README.md: "Contains build scripts, linting plugins, and automation tools"
3. Commit with message: "chore: Create NX directory structure (empty)"

Acceptance Criteria:
- apps/, libs/, tools/ directories exist at repository root
- Subdirectories under libs/shared/ are created
- Each directory has a README.md explaining its purpose
- No existing code has been moved
- Directory structure does not interfere with existing packages/ directory
- Changes are committed to git

Context:
Creating empty directories early establishes the target structure. The existing packages/ directory remains untouched and continues to work. Migration will gradually move code from packages/ to libs/ in later phases.
```

**Status**: ⬜ Not Started

**Notes**:
- This is completely safe - just creating folders
- The structure follows NX best practices from banana repo

---

## Spec 1.3: Create jest.preset.js

**Description for Spec Kit**:

```
Create a Jest preset configuration that can be used by migrated libraries (opt-in for now).

Tasks:
1. Create jest.preset.js at the repository root with the following content:
   const nxPreset = require('@nx/jest/preset').default;

   module.exports = {
     ...nxPreset,
     testEnvironment: 'jsdom',
     transform: {
       '^.+\\.(ts|tsx|js|jsx)$': ['babel-jest', { configFile: './babel.config.js' }]
     },
     moduleNameMapper: {
       '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
       '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/tools/jest/fileMock.js'
     },
     setupFilesAfterEnv: ['<rootDir>/tools/jest/setupTests.js'],
     collectCoverageFrom: [
       '**/*.{js,jsx,ts,tsx}',
       '!**/*.test.{js,jsx,ts,tsx}',
       '!**/*.spec.{js,jsx,ts,tsx}',
       '!**/node_modules/**'
     ]
   };
2. Create tools/jest/fileMock.js:
   module.exports = 'test-file-stub';
3. Create tools/jest/setupTests.js as a placeholder:
   // Global test setup - add custom matchers, polyfills, etc.
4. Install required dependencies:
   pnpm add -D @nx/jest jest-environment-jsdom identity-obj-proxy babel-jest
5. DO NOT change existing Jest configurations in packages/ - those continue to use their own configs
6. Commit with message: "chore: Create Jest preset for NX libraries"

Acceptance Criteria:
- jest.preset.js exists at repository root
- Tools directory has Jest helpers (fileMock.js, setupTests.js)
- Required dependencies are installed
- Existing package tests still work with their current configs
- New NX libraries can opt into this preset
- Changes are committed to git

Context:
This preset will be used by new NX libraries in Phase 2+. Existing packages continue using their own Jest configs until migration. This allows gradual adoption without breaking existing tests.
```

**Status**: ⬜ Not Started

**Notes**:
- Adjust transform and moduleNameMapper based on Backpack's existing Jest setup
- This is opt-in - doesn't affect existing tests

---

## Spec 1.4: Create .eslintrc.base.js

**Description for Spec Kit**:

```
Create a base ESLint configuration that extends the existing config and can be used by NX libraries.

Tasks:
1. Identify the current ESLint configuration:
   - Check if .eslintrc.js or .eslintrc.json exists at repository root
   - Note the current configuration structure
2. Create .eslintrc.base.js at repository root that extends the existing config:
   module.exports = {
     extends: ['./.eslintrc.js'], // or whatever the current config file is
     overrides: [
       {
         files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
         rules: {
           // NX-specific rules will be added in Phase 2
         }
       }
     ]
   };
3. DO NOT modify the existing .eslintrc.js - it continues to work for packages/
4. Verify linting still works: pnpm lint
5. Commit with message: "chore: Create base ESLint config for NX libraries"

Acceptance Criteria:
- .eslintrc.base.js exists and extends the current config
- Existing lint scripts continue to work
- No linting errors are introduced
- Changes are committed to git

Context:
This base config will be extended by individual NX library projects in Phase 2+. The existing ESLint config continues to work for packages/ directory. This allows gradual migration of linting rules.
```

**Status**: ⬜ Not Started

**Notes**:
- Very safe - just wrapping existing config
- NX-specific rules (@nx/enforce-module-boundaries) will be added in Phase 2

---

## Spec 1.5: Create migration helper scripts

**Description for Spec Kit**:

```
Create utility scripts to help with component migration in Phase 3.

Tasks:
1. Create tools/scripts/migrate-component.sh:
   #!/bin/bash
   # Usage: ./tools/scripts/migrate-component.sh <component-name>
   # Example: ./tools/scripts/migrate-component.sh bpk-component-badge

   COMPONENT=$1

   if [ -z "$COMPONENT" ]; then
     echo "Usage: ./tools/scripts/migrate-component.sh <component-name>"
     exit 1
   fi

   echo "Migrating $COMPONENT to NX structure..."

   # Create lib structure
   mkdir -p "libs/$COMPONENT/src"

   # Create project.json
   cat > "libs/$COMPONENT/project.json" <<EOF
   {
     "name": "$COMPONENT",
     "sourceRoot": "libs/$COMPONENT/src",
     "projectType": "library",
     "tags": ["type:ui", "scope:backpack"]
   }
   EOF

   # Create tsconfig.json
   cat > "libs/$COMPONENT/tsconfig.json" <<EOF
   {
     "extends": "../../tsconfig.base.json",
     "compilerOptions": {
       "outDir": "../../dist/out-tsc"
     },
     "include": ["src/**/*"]
   }
   EOF

   echo "Structure created for $COMPONENT"
   echo "Next steps:"
   echo "1. Move files from packages/$COMPONENT to libs/$COMPONENT/src"
   echo "2. Create re-export in packages/$COMPONENT"
   echo "3. Add path mapping to tsconfig.base.json"
   echo "4. Run tests to validate"

2. Make the script executable: chmod +x tools/scripts/migrate-component.sh
3. Create tools/scripts/check-migration.sh:
   #!/bin/bash
   # Verifies a component migration is complete

   COMPONENT=$1

   echo "Checking migration of $COMPONENT..."

   # Check lib exists
   if [ ! -d "libs/$COMPONENT" ]; then
     echo "❌ libs/$COMPONENT does not exist"
     exit 1
   fi

   # Check project.json exists
   if [ ! -f "libs/$COMPONENT/project.json" ]; then
     echo "❌ project.json missing"
     exit 1
   fi

   # Check re-export exists
   if [ ! -f "packages/$COMPONENT/src/index.js" ]; then
     echo "❌ Re-export in packages/ missing"
     exit 1
   fi

   echo "✅ Migration structure looks good"

4. Make check script executable: chmod +x tools/scripts/check-migration.sh
5. Create tools/scripts/README.md documenting how to use these scripts
6. Commit with message: "chore: Add migration helper scripts"

Acceptance Criteria:
- migrate-component.sh script exists and is executable
- check-migration.sh script exists and is executable
- Scripts are documented in tools/scripts/README.md
- Running the scripts with test input works correctly
- Changes are committed to git

Context:
These helper scripts will streamline the 150+ component migrations in Phase 3. They ensure consistent structure and reduce manual work. The scripts can be improved iteratively as patterns emerge.
```

**Status**: ⬜ Not Started

**Notes**:
- These scripts will be refined during Phase 2 pilot
- Consider adding more validation checks as needed

---

## Spec 1.6: Configure workspace (npm/pnpm)

**Description for Spec Kit**:

```
Configure NX to work with the existing package manager (npm or pnpm).

Tasks:
1. Identify which package manager is being used:
   - Check for pnpm-lock.yaml (pnpm)
   - Check for package-lock.json (npm)
   - Check for yarn.lock (yarn)
2. If using pnpm, update nx.json to specify the package manager:
   {
     "$schema": "./node_modules/nx/schemas/nx-schema.json",
     "extends": "nx/presets/npm.json",
     "plugins": [],
     "targetDefaults": {},
     "cli": {
       "packageManager": "pnpm"
     }
   }
3. If using npm, update nx.json with:
   {
     "cli": {
       "packageManager": "npm"
     }
   }
4. Add NX caching configuration to nx.json:
   "tasksRunnerOptions": {
     "default": {
       "runner": "nx/tasks-runners/default",
       "options": {
         "cacheableOperations": ["build", "test", "lint"]
       }
     }
   }
5. Test that NX respects the package manager by running: npx nx report
6. Commit with message: "chore: Configure NX workspace with package manager"

Acceptance Criteria:
- nx.json specifies the correct package manager
- Caching configuration is added
- Running `npx nx report` shows correct package manager
- Existing install/build commands continue to work
- Changes are committed to git

Context:
NX needs to know which package manager to use for running tasks. This configuration ensures NX uses the same package manager as the rest of the project (likely pnpm for Skyscanner projects).
```

**Status**: ⬜ Not Started

**Notes**:
- Backpack likely uses pnpm based on Skyscanner standards
- Caching will only activate after tasks are run through NX (Phase 4+)

---

## Spec 1.7: Update CI for dual-mode

**Description for Spec Kit**:

```
Update CI configuration to support both old and new build systems during migration.

Tasks:
1. Identify the CI configuration files:
   - Check .github/workflows/ for GitHub Actions
   - Check .gitlab-ci.yml for GitLab CI
   - Check other CI system configs
2. Add environment variables to CI configuration to handle NX:
   env:
     NX_PLUGIN_NO_TIMEOUTS: true
     NX_SKIP_PROVENANCE_CHECK: true
3. Update git checkout configuration to fetch full history (needed for nx affected):
   - For GitHub Actions, update actions/checkout:
     - uses: actions/checkout@v4
       with:
         fetch-depth: 0
4. If using GitHub Actions, add the nx-set-shas action before running tests:
   - name: Set NX SHAs
     uses: nrwl/nx-set-shas@v4
5. DO NOT change the actual test/build commands yet - they should continue using existing scripts
6. Add a comment in the CI file explaining:
   # NX Migration: Dual-mode support
   # - NX_PLUGIN_NO_TIMEOUTS prevents plugin timeouts
   # - fetch-depth: 0 allows nx affected to work
   # - Build scripts still use existing commands
7. Test CI by pushing the changes and verifying the pipeline passes
8. Commit with message: "ci: Configure for NX dual-mode operation"

Acceptance Criteria:
- NX environment variables are added to CI
- Git checkout fetches full history (fetch-depth: 0)
- nx-set-shas action is added (if using GitHub Actions)
- CI pipeline still passes with existing commands
- Comments explain the NX-related changes
- Changes are committed to git

Context:
These CI changes are required to prevent NX plugin timeouts (documented in banana repo) and to enable nx affected commands to work properly by having full git history. The changes are safe because we're not changing the actual build/test commands yet.

References:
- banana docs/03-how-to-guides/nx-debug.md for timeout issue
- NX documentation on CI setup
```

**Status**: ⬜ Not Started

**Notes**:
- Critical for preventing CI timeouts in Phase 2+
- fetch-depth: 0 is needed for `nx affected` to compare commits

---

## Spec 1.8: Split tsconfig.json to tsconfig.base.json

**Description for Spec Kit**:

```
Split the repository's TypeScript configuration to prepare for NX path mappings.

Tasks:
1. Read the current tsconfig.json at the repository root
2. Create a new tsconfig.base.json with the compiler options:
   {
     "compilerOptions": {
       // Copy all compilerOptions from existing tsconfig.json
       // Add baseUrl and paths for future NX libraries:
       "baseUrl": ".",
       "paths": {
         // Will be populated in Phase 2+
       }
     },
     "exclude": ["node_modules", "dist", "build", ".nx"]
   }
3. Update the existing tsconfig.json to extend from tsconfig.base.json:
   {
     "extends": "./tsconfig.base.json",
     "compilerOptions": {
       // Keep any app-specific compiler options here
     },
     "include": ["packages/**/*"],
     "exclude": ["node_modules"]
   }
4. Verify TypeScript still compiles: pnpm tsc --noEmit
5. Verify tests still pass: pnpm test (or a subset of tests)
6. Commit with message: "chore: Split tsconfig.json to prepare for NX path mappings"

Acceptance Criteria:
- tsconfig.base.json exists with all compiler options
- tsconfig.json extends from tsconfig.base.json
- paths object exists in tsconfig.base.json (empty for now)
- TypeScript compilation still works
- Tests still pass
- No errors in IDE/editor
- Changes are committed to git

Context:
NX uses tsconfig.base.json as the root configuration for all projects. Path mappings (like @skyscanner/backpack-web/*) will be added here in Phase 2. Splitting the config now allows gradual addition of path mappings without disrupting existing code.
```

**Status**: ⬜ Not Started

**Notes**:
- This change enables TypeScript path mappings in Phase 2
- Test thoroughly - TypeScript config changes can break IDE support

---

## Phase 1 Complete Checklist

Before moving to Phase 2, ensure:

- [ ] NX is installed and `npx nx --version` works
- [ ] Empty directory structure (apps/, libs/, tools/) exists
- [ ] Jest preset is created for future libraries
- [ ] Base ESLint config is created
- [ ] Migration helper scripts are executable
- [ ] Package manager is configured in nx.json
- [ ] CI is updated with NX environment variables and fetch-depth: 0
- [ ] tsconfig.base.json is created with empty paths object
- [ ] All existing build/test/lint scripts still work
- [ ] CI pipeline passes
- [ ] All changes are committed to git

**Critical**: Everything must still work exactly as before. NX is installed but not activated.

**Next Phase**: [Phase 2: Pilot Component](./phase-2-pilot.md)
