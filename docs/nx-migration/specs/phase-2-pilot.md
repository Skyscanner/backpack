# Phase 2: Pilot Component

**Purpose**: Migrate one simple component to prove the migration pattern works

**Total Specs**: 8
**Prerequisites**: Phase 1 complete
**Risk Level**: Medium (first real migration, but isolated to one component)

---

## Spec 2.1: Select pilot component

**Description for Spec Kit**:

```
Identify and select a simple component with zero dependencies to use as the pilot migration.

Tasks:
1. Review the circular dependency report from Phase 0: docs/nx-migration/circular-deps-baseline.txt
2. List all components in packages/ directory: ls packages/
3. For each component, check:
   - Number of dependencies (prefer 0 or minimal)
   - Whether it appears in circular dependency report (exclude if it does)
   - Size/complexity (prefer small and simple)
   - Test coverage (prefer well-tested)
4. Select a pilot component that meets these criteria:
   - Zero circular dependencies
   - Minimal external dependencies (ideally only depends on bpk-tokens or similar)
   - Small codebase (< 500 lines)
   - Has tests
   - Not deprecated
5. Good pilot candidates might be: bpk-component-badge, bpk-component-chip, bpk-component-text, or similar simple components
6. Document the selection in docs/nx-migration/pilot-selection.md:
   ## Pilot Component: [component-name]

   **Rationale**:
   - Dependencies: [list]
   - Circular dependencies: None
   - Lines of code: [count]
   - Test coverage: [yes/no]
   - Complexity: Low

   **Risks**:
   - [Any potential issues]

   **Success Criteria**:
   - Component builds successfully in libs/
   - Tests pass
   - Storybook stories render
   - Both old and new import paths work
7. Commit with message: "docs: Select [component-name] as pilot for NX migration"

Acceptance Criteria:
- Pilot component is selected and documented
- pilot-selection.md exists with rationale
- Selected component has zero circular dependencies
- Selected component is simple and well-tested
- Changes are committed to git

Context:
The pilot component validates the entire migration pattern. If the pilot succeeds, we can confidently migrate the remaining 150+ components using the same pattern. Choose carefully - a complex pilot can cause unnecessary delays.
```

**Status**: ⬜ Not Started

**Notes**:
- Don't rush this selection - the pilot is critical
- Avoid components that are deprecated or rarely used
- Prefer components that are imported by other components (validates re-export pattern)

---

## Spec 2.2: Create NX lib structure for pilot

**Description for Spec Kit**:

```
Create the NX library structure for the pilot component without moving files yet.

Tasks:
1. Use the pilot component selected in Spec 2.1 (let's call it PILOT_NAME)
2. Run the migration helper script:
   ./tools/scripts/migrate-component.sh PILOT_NAME
3. Manually verify the generated structure:
   - libs/PILOT_NAME/src/ directory exists
   - libs/PILOT_NAME/project.json exists with correct name and tags
   - libs/PILOT_NAME/tsconfig.json exists and extends tsconfig.base.json
4. Enhance the project.json with targets for build and test:
   {
     "name": "PILOT_NAME",
     "sourceRoot": "libs/PILOT_NAME/src",
     "projectType": "library",
     "tags": ["type:ui", "scope:backpack"],
     "targets": {
       "lint": {
         "executor": "@nx/eslint:lint",
         "options": {
           "lintFilePatterns": ["libs/PILOT_NAME/**/*.{ts,tsx,js,jsx}"]
         }
       }
     }
   }
5. Create a README.md in libs/PILOT_NAME/ documenting the component
6. At this point, the structure exists but is empty - files haven't been moved yet
7. Commit with message: "chore: Create NX structure for PILOT_NAME (pilot)"

Acceptance Criteria:
- libs/PILOT_NAME/ directory exists with proper structure
- project.json has correct name, tags, and lint target
- tsconfig.json extends from root tsconfig.base.json
- README.md exists in the library
- No files have been moved yet
- Structure validates with: ./tools/scripts/check-migration.sh PILOT_NAME
- Changes are committed to git

Context:
Creating the structure first allows us to verify the NX configuration is correct before moving actual code. This reduces risk of breaking the component during migration.
```

**Status**: ⬜ Not Started

**Notes**:
- Replace PILOT_NAME with the actual component name selected in 2.1
- Build and test targets will be added when plugins are installed in 2.4-2.7

---

## Spec 2.3: Move pilot files with git mv and create re-export

**Description for Spec Kit**:

```
Move the pilot component files to the NX library structure while preserving git history and maintaining backwards compatibility.

Tasks:
1. Add TypeScript path mapping FIRST (before moving files):
   Edit tsconfig.base.json and add to the "paths" object:
   "paths": {
     "@skyscanner/backpack-web/PILOT_NAME": ["libs/PILOT_NAME/src/index.ts"]
   }
2. Move source files using git mv to preserve history:
   git mv packages/PILOT_NAME/src/* libs/PILOT_NAME/src/
3. Check if the component has additional files to move:
   - package.json (review dependencies and copy to libs/PILOT_NAME/)
   - README.md (move to libs/PILOT_NAME/)
   - .stories.tsx files (move to libs/PILOT_NAME/src/)
   - Test files (move to libs/PILOT_NAME/src/)
4. Update imports within the moved files:
   - Change relative imports to use the path mapping if needed
   - Update test imports to use @skyscanner/backpack-web/PILOT_NAME
5. Create a backwards-compatible re-export in packages/PILOT_NAME/src/index.js:
   // Backwards compatibility re-export
   // This allows existing imports to continue working during migration
   export * from '../../../libs/PILOT_NAME/src/index';
6. Copy package.json dependencies to libs/PILOT_NAME/package.json if the component has specific dependencies
7. Verify imports resolve:
   - Check that TypeScript can resolve @skyscanner/backpack-web/PILOT_NAME
   - Check that the old import path still works via re-export
8. Run a basic build check: pnpm build (or component-specific build if available)
9. Commit with message: "refactor: Migrate PILOT_NAME to libs/ (pilot migration)"

Acceptance Criteria:
- Path mapping exists in tsconfig.base.json
- Source files are moved to libs/PILOT_NAME/src/ using git mv
- Re-export exists in packages/PILOT_NAME/src/index.js
- Both import paths work:
  - Old: from 'packages/PILOT_NAME' (via re-export)
  - New: from '@skyscanner/backpack-web/PILOT_NAME' (via path mapping)
- Git history is preserved (verify with git log --follow)
- TypeScript resolves imports without errors
- Changes are committed to git

Context:
This is the critical step - moving the actual code. Using git mv preserves commit history. The re-export ensures existing code continues to work without changes. The path mapping enables new code to use clean imports.

Order is important:
1. Path mapping first (so TypeScript knows where to find the code)
2. Move files with git mv (preserves history)
3. Re-export (maintains backwards compatibility)
4. Validate (catches issues early)
```

**Status**: ⬜ Not Started

**Notes**:
- DO NOT skip the path mapping step - add it before moving files
- Test that both old and new import paths work
- If the component has circular dependencies (shouldn't happen for pilot), defer it

---

## Spec 2.4: Install @nx/jest plugin for pilot

**Description for Spec Kit**:

```
Install the NX Jest plugin and configure it for the pilot component.

Tasks:
1. Install @nx/jest plugin:
   pnpm add -D @nx/jest
2. Create a jest.config.js for the pilot component at libs/PILOT_NAME/jest.config.js:
   module.exports = {
     displayName: 'PILOT_NAME',
     preset: '../../jest.preset.js',
     testEnvironment: 'jsdom',
     transform: {
       '^.+\\.[tj]sx?$': ['babel-jest', { cwd: __dirname }]
     },
     moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
     coverageDirectory: '../../coverage/libs/PILOT_NAME'
   };
3. Add a test target to libs/PILOT_NAME/project.json:
   "targets": {
     "test": {
       "executor": "@nx/jest:jest",
       "outputs": ["{workspaceRoot}/coverage/libs/PILOT_NAME"],
       "options": {
         "jestConfig": "libs/PILOT_NAME/jest.config.js",
         "passWithNoTests": true
       }
     }
   }
4. Run tests using NX: npx nx test PILOT_NAME
5. Verify tests pass with the same results as the old test command
6. Keep the old test command in packages/ working (don't remove it yet)
7. Commit with message: "chore: Add Jest plugin and configure tests for PILOT_NAME"

Acceptance Criteria:
- @nx/jest is installed in package.json
- jest.config.js exists in libs/PILOT_NAME/
- Test target exists in project.json
- Running `npx nx test PILOT_NAME` passes all tests
- Old test command still works in packages/
- Test coverage is generated in coverage/libs/PILOT_NAME/
- Changes are committed to git

Context:
NX's Jest executor provides caching and affected detection. The pilot component validates that tests work in the new structure. Both old and new test commands should work during the dual-mode period.
```

**Status**: ⬜ Not Started

**Notes**:
- Adjust jest.config.js based on Backpack's existing Jest setup
- If tests fail, check for missing dependencies or incorrect module resolution

---

## Spec 2.5: Install @nx/eslint plugin for pilot

**Description for Spec Kit**:

```
Install the NX ESLint plugin and configure linting for the pilot component.

Tasks:
1. Install @nx/eslint plugin:
   pnpm add -D @nx/eslint-plugin eslint-plugin-import
2. Create .eslintrc.json for the pilot component at libs/PILOT_NAME/.eslintrc.json:
   {
     "extends": ["../../.eslintrc.base.js"],
     "ignorePatterns": ["!**/*"],
     "overrides": [
       {
         "files": ["*.ts", "*.tsx", "*.js", "*.jsx"],
         "rules": {}
       }
     ]
   }
3. Update the lint target in libs/PILOT_NAME/project.json:
   "targets": {
     "lint": {
       "executor": "@nx/eslint:lint",
       "outputs": ["{options.outputFile}"],
       "options": {
         "lintFilePatterns": ["libs/PILOT_NAME/**/*.{ts,tsx,js,jsx}"]
       }
     }
   }
4. Add NX module boundary rules to the root .eslintrc.js:
   {
     "plugins": ["@nx"],
     "rules": {
       "@nx/enforce-module-boundaries": [
         "error",
         {
           "allow": [],
           "depConstraints": [
             {
               "sourceTag": "type:ui",
               "onlyDependOnLibsWithTags": ["type:ui", "type:utils", "type:types", "type:constants"]
             }
           ]
         }
       ]
     }
   }
5. Run linting using NX: npx nx lint PILOT_NAME
6. Fix any linting errors that arise
7. Verify the old lint command still works in packages/
8. Commit with message: "chore: Add ESLint plugin and configure linting for PILOT_NAME"

Acceptance Criteria:
- @nx/eslint-plugin is installed
- .eslintrc.json exists in libs/PILOT_NAME/
- Lint target exists in project.json
- Running `npx nx lint PILOT_NAME` passes
- @nx/enforce-module-boundaries rule is configured
- Old lint command still works
- Changes are committed to git

Context:
NX's ESLint plugin enforces module boundaries based on tags (type:ui, scope:backpack). This prevents violations like UI components importing from data-access layers. The pilot validates the linting configuration.
```

**Status**: ⬜ Not Started

**Notes**:
- Module boundary rules will be refined as more libraries are added
- Fix linting errors immediately - don't let them accumulate

---

## Spec 2.6: Install nx-stylelint plugin for pilot

**Description for Spec Kit**:

```
Install the nx-stylelint plugin and configure style linting for the pilot component.

Tasks:
1. Install nx-stylelint plugin:
   pnpm add -D nx-stylelint stylelint
2. Check if the pilot component has styles (CSS, SCSS, styled-components, etc.)
3. If styles exist, create .stylelintrc.json for the pilot at libs/PILOT_NAME/.stylelintrc.json:
   {
     "extends": ["../../.stylelintrc.json"]
   }
4. Add a stylelint target to libs/PILOT_NAME/project.json:
   "targets": {
     "stylelint": {
       "executor": "nx-stylelint:lint",
       "outputs": ["{options.outputFile}"],
       "options": {
         "lintFilePatterns": ["libs/PILOT_NAME/**/*.css", "libs/PILOT_NAME/**/*.scss"]
       }
     }
   }
5. Run style linting: npx nx stylelint PILOT_NAME
6. Fix any style linting errors
7. If the component has no styles, skip the stylelint target but still install the plugin
8. Commit with message: "chore: Add Stylelint plugin and configure for PILOT_NAME"

Acceptance Criteria:
- nx-stylelint is installed
- .stylelintrc.json exists in libs/PILOT_NAME/ (if component has styles)
- Stylelint target exists in project.json (if component has styles)
- Running `npx nx stylelint PILOT_NAME` passes
- Changes are committed to git

Context:
Backpack components likely have CSS/SCSS styles. The nx-stylelint plugin provides caching for style linting. Not all components may need this, but the pilot should test it if styles are present.
```

**Status**: ⬜ Not Started

**Notes**:
- Check if Backpack uses styled-components, CSS modules, or plain CSS
- Stylelint configuration should match existing Backpack style rules

---

## Spec 2.7: Install @nx/storybook plugin for pilot

**Description for Spec Kit**:

```
Install the NX Storybook plugin and configure stories for the pilot component.

Tasks:
1. Install @nx/storybook plugin and related dependencies:
   pnpm add -D @nx/storybook @storybook/react storybook
2. Check if the pilot component has .stories.tsx or .stories.jsx files
3. If stories exist, ensure they were moved to libs/PILOT_NAME/src/ in Spec 2.3
4. Create a storybook configuration for the library at libs/PILOT_NAME/.storybook/main.js:
   const config = {
     stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
     addons: ['@storybook/addon-essentials'],
     framework: {
       name: '@storybook/react-webpack5',
       options: {}
     }
   };
   export default config;
5. Add a storybook target to libs/PILOT_NAME/project.json:
   "targets": {
     "storybook": {
       "executor": "@nx/storybook:storybook",
       "options": {
         "port": 6006,
         "configDir": "libs/PILOT_NAME/.storybook"
       }
     },
     "build-storybook": {
       "executor": "@nx/storybook:build",
       "outputs": ["{options.outputDir}"],
       "options": {
         "outputDir": "dist/storybook/PILOT_NAME",
         "configDir": "libs/PILOT_NAME/.storybook"
       }
     }
   }
6. Test that Storybook runs: npx nx storybook PILOT_NAME
7. Verify the stories render correctly in Storybook
8. If the component has no stories, create a basic story to validate the setup
9. Commit with message: "chore: Add Storybook plugin and configure for PILOT_NAME"

Acceptance Criteria:
- @nx/storybook is installed
- .storybook/main.js exists in libs/PILOT_NAME/
- Storybook targets exist in project.json
- Running `npx nx storybook PILOT_NAME` launches Storybook successfully
- Stories render correctly in the browser
- Changes are committed to git

Context:
Backpack components likely have Storybook stories for visual documentation. The NX Storybook plugin allows running stories per library. The pilot validates that stories work in the new structure.
```

**Status**: ⬜ Not Started

**Notes**:
- Adjust Storybook config to match Backpack's existing Storybook setup
- May need to adjust webpack configuration for Backpack's specific needs

---

## Spec 2.8: Validate pilot success

**Description for Spec Kit**:

```
Comprehensively validate that the pilot component migration is successful before proceeding to Phase 3.

Tasks:
1. Run all NX commands for the pilot component and verify they pass:
   - npx nx test PILOT_NAME
   - npx nx lint PILOT_NAME
   - npx nx stylelint PILOT_NAME (if component has styles)
   - npx nx build-storybook PILOT_NAME
2. Verify both import paths work by creating a test file:
   - Create a temporary file that imports using old path: from 'packages/PILOT_NAME'
   - Create another temporary file that imports using new path: from '@skyscanner/backpack-web/PILOT_NAME'
   - Verify both resolve correctly in TypeScript
   - Delete the temporary files
3. Run existing package commands to ensure they still work:
   - Run tests from packages/PILOT_NAME/
   - Run linting from packages/PILOT_NAME/
4. Check git history is preserved:
   - git log --follow libs/PILOT_NAME/src/index.ts (should show original commits)
5. Verify NX affected detection works:
   - Make a small change to the pilot component
   - Run: npx nx affected:test
   - Verify it detects the pilot component as affected
6. Document success metrics in docs/nx-migration/pilot-success.md:
   ## Pilot Migration Success Report

   **Component**: PILOT_NAME
   **Date**: [DATE]

   ### Tests Passed
   - [x] npx nx test PILOT_NAME
   - [x] npx nx lint PILOT_NAME
   - [x] npx nx stylelint PILOT_NAME
   - [x] npx nx build-storybook PILOT_NAME

   ### Import Paths Validated
   - [x] Old path: packages/PILOT_NAME
   - [x] New path: @skyscanner/backpack-web/PILOT_NAME

   ### Git History Preserved
   - [x] git log shows original commits

   ### Backwards Compatibility
   - [x] Old test commands work
   - [x] Old lint commands work

   ### NX Features Working
   - [x] Affected detection works
   - [x] Caching works (second run faster)

   ### Blockers/Issues
   - [List any issues encountered]

   ### Lessons Learned
   - [Document any corrections made]

   ### Recommendation
   [PROCEED TO PHASE 3 / HOLD AND INVESTIGATE / etc.]

7. If ANY validation fails, DO NOT proceed to Phase 3 - fix the pilot first
8. Commit with message: "docs: Validate pilot migration success"

Acceptance Criteria:
- All NX commands pass for pilot component
- Both import paths (old and new) work correctly
- Git history is preserved
- Backwards compatibility is maintained
- NX affected detection works
- pilot-success.md documents all validations
- Clear recommendation to proceed or investigate
- Changes are committed to git

Context:
The pilot validation is the gate to Phase 3. If the pilot has issues, those issues will be multiplied across 150+ components. Take time to ensure everything works perfectly. Document any corrections so they can be applied proactively in Phase 3.

This is the MOST CRITICAL checkpoint in the entire migration.
```

**Status**: ⬜ Not Started

**Notes**:
- Do not rush this validation
- If anything fails, update the learnings.md with the fix
- Consider running the pilot validation multiple times over a few days
- Get team review before proceeding to Phase 3

---

## Phase 2 Complete Checklist

Before moving to Phase 3, ensure:

- [ ] Pilot component is selected and documented
- [ ] NX lib structure exists for pilot
- [ ] Files are moved with git mv and history is preserved
- [ ] Re-export exists and both import paths work
- [ ] Jest plugin is installed and tests pass
- [ ] ESLint plugin is installed and linting passes
- [ ] Stylelint plugin is installed (if component has styles)
- [ ] Storybook plugin is installed and stories render
- [ ] Comprehensive validation passes all checks
- [ ] pilot-success.md documents success
- [ ] All changes are committed to git
- [ ] Team has reviewed and approved pilot

**Critical Decision Point**: If pilot validation found issues, update Phase 3 specs with corrections before proceeding.

**Next Phase**: [Phase 3: Batch Migration](./phase-3-batch-migration.md)
