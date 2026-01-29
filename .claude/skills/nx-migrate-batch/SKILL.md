---
name: nx-migrate-batch
description: Migrate multiple components to NX structure in sequence. Use when migrating batches of 5-15 components from a migration plan.
argument-hint: <component1> <component2> <component3> ...
disable-model-invocation: true
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
---

## User Input

```text
$ARGUMENTS
```

## Overview

Migrate multiple components to NX structure sequentially, tracking success/failure for each component. This skill automates batch migrations by calling `/nx-migrate-component` for each component in the list.

**Best for:** Batches of 5-15 components from Priority 1 or Priority 2 in your migration plan.

## Steps

### 1. Parse Component List

Extract component names from arguments:

```
$ARGUMENTS = "bpk-component-accordion bpk-component-aria-live bpk-component-badge"
```

Split into array and validate each:
- Component directory must exist in `packages/`
- Component must not already be migrated (no NX config in package.json)

### 2. Pre-Migration Validation

Before starting, verify:

**Check all components exist:**
```bash
for component in $ARGUMENTS; do
  if [ ! -d "packages/$component" ]; then
    echo "❌ ERROR: packages/$component does not exist"
    exit 1
  fi
done
```

**Check which are already migrated:**
```bash
for component in $ARGUMENTS; do
  if [ -f "packages/$component/package.json" ] && grep -q '"nx"' "packages/$component/package.json"; then
    echo "⚠️ WARNING: $component already migrated (has NX config)"
  fi
done
```

**Count and confirm:**
```
Total components to migrate: X
Already migrated: Y (will skip)
Will migrate: Z
```

### 3. Sequential Migration

For each component in the list:

1. **Start migration**
   - Display: `[1/10] Migrating bpk-component-accordion...`
   - Run the migration process (same steps as `/nx-migrate-component`)

2. **Track result**
   - ✅ Success: Migration completed, tests passed
   - ⚠️ Partial: Migration completed, but tests/lint failed
   - ❌ Failed: Migration could not complete

3. **Continue on errors**
   - Don't stop if one component fails
   - Log the error and continue to next component
   - Allow user to fix failures after batch completes

### 4. Per-Component Migration Process

For each component, execute these steps (from `/nx-migrate-component`):

**A. Verify/Create index.ts**
- Check if index.ts exists at package root
- If missing, create it (or skip and mark as failed)

**B. Detect Special Build Requirements**
- Check if `gulpfile.js/{component-name}/` exists
- Use special build config if needed (icon, spinner, flare)

**C. Create package.json with NX config**
- Standard or special build configuration
- Write to `packages/{component-name}/package.json`

**D. Create tsconfig.json**
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

**E. Create jest.config.js**
```javascript
const baseConfig = require('../../jest.preset.js');
const { testRegex, ...configWithoutTestRegex } = baseConfig;

module.exports = {
  ...configWithoutTestRegex,
  displayName: '{component-name}',
  testMatch: ['<rootDir>/src/**/*-test.tsx'],
  coverageDirectory: '../../coverage/packages/{component-name}',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { rootMode: 'upward' }],
  },
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

**F. Create .eslintrc.json**
```json
{
  "extends": ["../../.eslintrc.base.js"],
  "ignorePatterns": ["!**/*", "node_modules"]
}
```

**G. Update tsconfig.base.json**
- Extract short name from component name
- Add path mapping: `"@backpack/{short-name}": ["packages/{component-name}/index.ts"]`

**H. Update Import Paths**
- Run: `node scripts/nx/update-import-paths.js {component-name} @backpack/{short-name}`

**I. Validate**
- Build: `npx nx build @backpack/{short-name}`
- Test: `npx nx test @backpack/{short-name}` (optional, may skip if time-consuming)
- Lint: `npx nx lint @backpack/{short-name}` (optional)

### 5. Progress Tracking

Display real-time progress:

```
=== Batch Migration Progress ===
[1/10] ✅ bpk-component-accordion (build: pass, test: pass)
[2/10] ✅ bpk-component-aria-live (build: pass, test: pass)
[3/10] ❌ bpk-component-autosuggest (missing index.ts)
[4/10] ✅ bpk-component-banner-alert (build: pass, test: pass)
[5/10] ⚠️  bpk-component-barchart (build: pass, test: FAIL)
...
```

### 6. Generate Summary Report

After all components processed:

```markdown
# Batch Migration Summary

## Results
- **Total:** 10 components
- **✅ Successful:** 7 (70%)
- **⚠️ Partial:** 2 (20%) - migrated but tests/lint failed
- **❌ Failed:** 1 (10%)

## Successful Migrations
1. ✅ bpk-component-accordion
2. ✅ bpk-component-aria-live
3. ✅ bpk-component-banner-alert
4. ✅ bpk-component-blockquote
5. ✅ bpk-component-bottom-sheet
6. ✅ bpk-component-breadcrumb
7. ✅ bpk-component-breakpoint

## Partial Success (Need Fixes)
1. ⚠️ bpk-component-barchart
   - Build: ✅ Pass
   - Test: ❌ 2 failing tests
   - Action: Fix tests manually

2. ⚠️ bpk-component-bubble
   - Build: ✅ Pass
   - Lint: ⚠️ 3 warnings
   - Action: Fix lint warnings

## Failed Migrations
1. ❌ bpk-component-autosuggest
   - Reason: Missing index.ts
   - Action: Create index.ts and retry

## Next Steps
1. Fix partial migrations (barchart, bubble)
2. Retry failed migrations after fixes
3. Run full validation: `npx nx run-many --target=build --projects=@backpack/accordion,@backpack/aria-live,...`
4. Track progress: `/nx-plan-migration`
```

### 7. Post-Batch Actions

After batch completes:

**A. Run Batch Validation (Optional)**
```bash
# Build all successfully migrated components
npx nx run-many --target=build --projects=@backpack/component1,@backpack/component2,...

# Test all successfully migrated components
npx nx run-many --target=test --projects=@backpack/component1,@backpack/component2,...
```

**B. Update Progress**
Suggest re-running planning:
```bash
/nx-plan-migration  # See updated status
```

**C. Commit Changes**
Suggest committing successful migrations:
```bash
git add packages/bpk-component-accordion packages/bpk-component-aria-live tsconfig.base.json
git commit -m "feat: migrate 7 components to NX structure

Migrated components:
- bpk-component-accordion
- bpk-component-aria-live
- bpk-component-banner-alert
- bpk-component-blockquote
- bpk-component-bottom-sheet
- bpk-component-breadcrumb
- bpk-component-breakpoint

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

## Output Format

Provide real-time updates and final summary:

```markdown
# NX Batch Migration

## Starting batch migration of 10 components...

---

### [1/10] bpk-component-accordion
⏳ Creating NX configuration...
✅ package.json created
✅ tsconfig.json created
✅ jest.config.js created
✅ .eslintrc.json created
✅ tsconfig.base.json updated
✅ Import paths updated (2 files changed)
⏳ Validating build...
✅ Build passed (tsc --noEmit)
✅ **Migration complete**

### [2/10] bpk-component-aria-live
⏳ Creating NX configuration...
✅ package.json created
✅ tsconfig.json created
✅ jest.config.js created
✅ .eslintrc.json created
✅ tsconfig.base.json updated
✅ Import paths updated (0 files changed)
⏳ Validating build...
✅ Build passed
✅ **Migration complete**

### [3/10] bpk-component-autosuggest
❌ **Migration failed**
Reason: Missing index.ts at package root
Action: Create index.ts before retrying

### [4/10] bpk-component-banner-alert
⏳ Creating NX configuration...
✅ All configs created
✅ Import paths updated (1 file changed)
✅ Build passed
✅ **Migration complete**

... (continue for remaining components)

---

## 📊 Batch Migration Summary

**Completed:** 10/10 components processed

### ✅ Successful: 7 components (70%)
- bpk-component-accordion
- bpk-component-aria-live
- bpk-component-banner-alert
- bpk-component-blockquote
- bpk-component-bottom-sheet
- bpk-component-breadcrumb
- bpk-component-breakpoint

### ⚠️ Partial: 2 components (20%)
- bpk-component-barchart (tests failed)
- bpk-component-bubble (lint warnings)

### ❌ Failed: 1 component (10%)
- bpk-component-autosuggest (missing index.ts)

---

## 🎯 Next Steps

### 1. Fix Partial Migrations
```bash
# Fix barchart tests
npx nx test @backpack/barchart
# Address failing tests

# Fix bubble lint warnings
npx nx lint @backpack/bubble
```

### 2. Retry Failed Migrations
```bash
# Create index.ts for autosuggest, then:
/nx-migrate-component bpk-component-autosuggest
```

### 3. Validate Batch
```bash
npx nx run-many --target=build --projects=@backpack/accordion,@backpack/aria-live,@backpack/banner-alert,@backpack/blockquote,@backpack/bottom-sheet,@backpack/breadcrumb,@backpack/breakpoint
```

### 4. Track Progress
```bash
/nx-plan-migration
# Expected: "10 migrated, 83 remaining"
```

### 5. Commit Changes
```bash
git add .
git commit -m "feat: migrate batch of 7 components to NX

Successful migrations:
- accordion, aria-live, banner-alert
- blockquote, bottom-sheet, breadcrumb, breakpoint

Partial migrations (need fixes):
- barchart (tests), bubble (lint)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## 💡 Tips

- **Batch size:** 5-15 components is optimal
- **Continue on errors:** Script continues even if some fail
- **Validate frequently:** Run batch validation after each batch
- **Commit successful:** Commit working migrations, fix partials separately
- **Track progress:** Re-run `/nx-plan-migration` after each batch
```

## Notes

- **Sequential execution:** Components migrated one at a time (not parallel)
- **Continue on errors:** Failures don't stop the batch
- **Partial success:** Some components may migrate but fail tests/lint
- **Summary report:** Clear accounting of success/failure/partial
- **Actionable:** Provides exact commands to fix issues

## Error Handling

**Missing component directory:**
- Stop immediately, don't proceed with batch
- Error message: "Component X does not exist in packages/"

**Already migrated:**
- Skip and continue
- Warning message: "Component X already has NX config, skipping"

**Migration failure:**
- Log error and reason
- Continue to next component
- Include in failed list in summary

**Build/test failure:**
- Mark as "partial success"
- Migration files created but validation failed
- User can fix manually later

## Tips

- **Start small:** First batch should be 5-10 components to validate process
- **Independent components:** Use Priority 1 components from migration plan
- **Validate after batch:** Run `nx run-many` to verify all succeeded
- **Fix partial/failed:** Address issues before next batch
- **Commit frequently:** Commit successful batches before starting next
