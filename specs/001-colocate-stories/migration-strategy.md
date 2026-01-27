# Migration Strategy: Storybook Stories Colocation

**Date**: 2026-01-27
**Status**: Design Phase
**Based on**: research.md findings

## Executive Summary

Implement automated migration of 91 component story files from `examples/` to `packages/*/src/` using a phased approach with comprehensive verification. The migration will use `git mv` for history preservation, automated import path transformation, and systematic validation at each step.

## Migration Scope

### Files to Migrate (Per Component)

Based on research findings:
- **Story files**: `stories.{ts,tsx,js}` (91 files - mixed formats)
- **Example implementations**: `examples.{tsx,js}` (86 files)
- **CSS Modules**: `*.module.{scss,css}` (88 files - 44 component pairs)
- **Shared utilities**: `bpk-storybook-utils/` directory (entire package)
- **Total**: ~265 component files + 1 shared utility package

### Files NOT to Migrate

- `examples/.gitignore` → Configuration file
- Any snapshot files → Component-specific tests
- Non-component stories (e.g., `bpk-scrim-utils`, `bpk-stylesheets-fonts`, `bpk-animate-height`) → Handle separately based on whether corresponding packages exist

## Phased Migration Approach

### Phase 1: Pilot Migration (3 components)

**Purpose**: Validate strategy and tools on small sample

**Selected Components**:
1. `bpk-component-button` - Standard component with all file types
2. `bpk-component-icon` - Simple component, fewer files
3. `bpk-component-card` - Complex component with multiple stories

**Steps**:
```bash
# 1. Manual migration of pilot components
for component in button icon card; do
  git mv examples/bpk-component-${component}/* packages/bpk-component-${component}/src/
done

# 2. Update import paths in moved files
# 3. Update Storybook config to include both old and new patterns temporarily
# 4. Verify:
#    - Storybook builds
#    - Stories render correctly
#    - Git history preserved
# 5. Document lessons learned
```

**Success Criteria**:
- All 3 components' stories work in new location
- Import paths updated correctly
- Git history verifiable with `git log --follow`
- Storybook build time unchanged

### Phase 2: Automated Migration Tool Development

**Tool Requirements**:

1. **File Mover** (`migrate-files.sh`):
   ```bash
   #!/bin/bash
   # For each component directory in examples/

   # Step 1: Move shared utilities FIRST
   echo "Moving shared utilities..."
   git mv examples/bpk-storybook-utils packages/

   # Step 2: Move component stories
   echo "Moving component stories..."
   for dir in examples/bpk-component-*; do
     component=$(basename "$dir")

     # Skip if pilot already migrated
     if [[ "$component" =~ button|icon|card ]]; then
       continue
     fi

     target="packages/${component}/src/"

     # Move TypeScript/JavaScript story files
     [ -f "${dir}/stories.ts" ] && git mv "${dir}/stories.ts" "${target}/"
     [ -f "${dir}/stories.tsx" ] && git mv "${dir}/stories.tsx" "${target}/"
     [ -f "${dir}/stories.js" ] && git mv "${dir}/stories.js" "${target}/"

     # Move example implementation files
     [ -f "${dir}/examples.tsx" ] && git mv "${dir}/examples.tsx" "${target}/"
     [ -f "${dir}/examples.js" ] && git mv "${dir}/examples.js" "${target}/"

     # Move CSS Modules (both .scss and .css)
     find "${dir}" -name "*.module.scss" -exec git mv {} "${target}/" \;
     find "${dir}" -name "*.module.css" -exec git mv {} "${target}/" \;
   done
   ```

2. **Import Path Updater** (`update-imports.js`):
   ```javascript
   const fs = require('fs');
   const path = require('path');
   const glob = require('glob');

   // Find all moved story files
   const storyFiles = glob.sync('packages/bpk-component-*/src/stories.{ts,tsx,js}');

   storyFiles.forEach(filePath => {
     let content = fs.readFileSync(filePath, 'utf-8');

     // Pattern 1: Transform component import paths
     // From: ../../packages/bpk-component-button/src/BpkButton
     // To:   ./BpkButton
     content = content.replace(
       /from ['"]\.\.\/\.\.\/packages\/bpk-component-([^/]+)\/src\/([^'"]+)['"]/g,
       (match, component, subpath) => {
         return `from './${subpath}'`;
       }
     );

     // Pattern 2: Transform shared utility imports (CRITICAL)
     // From: ../bpk-storybook-utils
     // To:   ../../bpk-storybook-utils
     content = content.replace(
       /from ['"]\.\.\/bpk-storybook-utils([^'"]*)['"]/g,
       (match, subpath) => {
         return `from '../../bpk-storybook-utils${subpath}'`;
       }
     );

     // Transform require statements if any
     content = content.replace(
       /require\(['"]\.\.\/\.\.\/packages\/bpk-component-([^/]+)\/src\/([^'"]+)['"]\)/g,
       (match, component, subpath) => {
         return `require('./${subpath}')`;
       }
     );

     content = content.replace(
       /require\(['"]\.\.\/bpk-storybook-utils([^'"]*)['"]\)/g,
       (match, subpath) => {
         return `require('../../bpk-storybook-utils${subpath}')`;
       }
     );

     fs.writeFileSync(filePath, content, 'utf-8');
   });

   console.log(`Updated ${storyFiles.length} story files`);
   ```

3. **Verification Script** (`verify-migration.sh`):
   ```bash
   #!/bin/bash
   set -e

   echo "=== Migration Verification ==="

   # 1. File count verification
   echo "Checking file counts..."
   moved_stories=$(find packages/bpk-component-*/src/ -name "stories.*" | wc -l)
   moved_examples=$(find packages/bpk-component-*/src/ -name "examples.*" | wc -l)

   echo "Stories moved: $moved_stories / 91 expected"
   echo "Examples moved: $moved_examples / 86 expected"

   # 2. Import path verification
   echo "Checking for old import paths..."
   old_imports=$(grep -r "\.\.\/\.\.\/packages\/" packages/*/src/stories.* || true)

   if [ -n "$old_imports" ]; then
     echo "❌ ERROR: Old import paths found!"
     echo "$old_imports"
     exit 1
   fi
   echo "✓ No old import paths found"

   # 3. TypeScript compilation
   echo "Running TypeScript check..."
   npm run typecheck

   # 4. Storybook build
   echo "Building Storybook..."
   npm run storybook:build

   # 5. Story count verification
   echo "Counting stories in build..."
   # Parse dist-storybook/ to count stories
   # Compare with baseline

   echo "=== Verification Complete ==="
   ```

### Phase 3: Batch Migration (Remaining 88 components)

**Execution Plan**:

```bash
# Pre-migration checklist
- [ ] Pilot migration successful
- [ ] Tools tested and verified
- [ ] Baseline metrics captured
- [ ] Clean git working tree
- [ ] On WOODPECKER-4041 branch

# Migration steps
1. Run migrate-files.sh (moves all files including bpk-storybook-utils)
2. Run update-imports.js (fixes both component and shared utility import paths)
3. Update .storybook/main.ts configuration
4. Update CI workflow cache keys
5. Run verify-migration.sh
6. Manual spot-checks (5-10 components including ones using shared utilities)
7. Commit with comprehensive message

# Post-migration
- [ ] Open PR
- [ ] CI passes
- [ ] Percy shows zero visual diff
- [ ] Team review
- [ ] Merge to main
```

**Estimated Duration**: 30-45 minutes
- File moves: ~5 minutes
- Import path updates: ~10 minutes
- Storybook rebuild: ~10 minutes
- Verification: ~10 minutes
- Commit/push: ~5 minutes

### Phase 4: Cleanup

**After Migration Merged**:

1. **Remove examples/ directory** (except shared utils):
   ```bash
   # Keep shared utils, remove component directories
   rm -rf examples/bpk-component-*
   # Optionally move bpk-storybook-utils to a better location
   ```

2. **Update documentation**:
   - Update CONTRIBUTING.md with new story locations
   - Update storybook documentation
   - Add migration notes to CHANGELOG

3. **Monitor for issues**:
   - Watch for CI failures
   - Check Percy for unexpected visual changes
   - Review contributor feedback

## Configuration Changes

### Storybook Configuration (.storybook/main.ts)

**Before**:
```typescript
const config: StorybookConfig = {
  stories: [
    '../examples/**/stories.@(ts|tsx|js|jsx)',
  ],
  // ...
};
```

**After**:
```typescript
const config: StorybookConfig = {
  stories: [
    '../packages/**/src/stories.@(ts|tsx|js|jsx)',
    '../packages/**/src/examples.@(ts|tsx|js|jsx)',  // Include examples too
  ],
  // ...
};
```

### CI Workflow Updates

**Files to Update**:

1. `.github/workflows/pr.yml`:
   ```yaml
   # Before
   key: ${{ env.BUILD_CACHE_NAME }}-${{ hashFiles('packages/**', 'examples/**') }}

   # After
   key: ${{ env.BUILD_CACHE_NAME }}-${{ hashFiles('packages/**') }}
   ```

2. `.github/workflows/_build.yml`:
   ```yaml
   # Same cache key update as above
   ```

## Shared Utilities Strategy

### bpk-storybook-utils Handling

**Current Usage**: 10-30 components import from `../bpk-storybook-utils`

**Decided Approach** (from Clarification Session 2026-01-27): **Move to packages/**

**Rationale**:
- Aligns with Backpack's package-based structure
- Better package organization and version management
- Clearer dependencies and import paths
- Enables future independent versioning if needed

**Implementation**:
```bash
# Step 1: Move the entire directory
git mv examples/bpk-storybook-utils packages/

# Step 2: Update import paths in affected stories
# Before: import { action } from '../bpk-storybook-utils';
# After:  import { action } from '../../bpk-storybook-utils';

# This is handled automatically by update-imports.js script
```

**Impact**:
- **Affected files**: 10-30 story files need import path updates
- **Git history**: Preserved via `git mv`
- **Build impact**: None - just import path changes
- **Testing**: Verify stories using `action` and `BpkDarkExampleWrapper` still work

## Import Path Transformation Rules

### TypeScript/JavaScript Imports

```typescript
// Pattern 1: Component imports
// Before: import BpkButton from '../../packages/bpk-component-button/src/BpkButton';
// After:  import BpkButton from './BpkButton';

// Pattern 2: Sub-module imports
// Before: import { BUTTON_TYPES } from '../../packages/bpk-component-button/src/BpkButton/common-types';
// After:  import { BUTTON_TYPES } from './BpkButton/common-types';

// Pattern 3: Utilities imports
// Before: import { cssModules } from '../../packages/bpk-react-utils/';
// After:  import { cssModules } from '../../bpk-react-utils/';  // ← Unchanged (different package)

// Pattern 4: Shared story utils
// Before: import { action, BpkDarkExampleWrapper } from '../bpk-storybook-utils';
// After:  import { action, BpkDarkExampleWrapper } from '../../examples/bpk-storybook-utils';
```

### CSS Module Imports

```typescript
// Pattern 1: Local styles
// Before: import STYLES from './stories.module.scss';
// After:  import STYLES from './stories.module.scss';  // ← Unchanged (already relative)

// Pattern 2: Component styles
// Before: import STYLES from '../../packages/bpk-component-button/src/BpkButton/BpkButton.module.scss';
// After:  import STYLES from './BpkButton/BpkButton.module.scss';
```

## Verification Checklist

### Pre-Migration Baseline

```bash
# Capture before starting
- [ ] File count: find examples/ -type f | wc -l  # Expected: ~295
- [ ] Story count: Parse Storybook build output    # Expected: ~91 components
- [ ] Git clean: git status                        # Should be clean
- [ ] Branch: git branch --show-current            # Should be WOODPECKER-4041
```

### Post-Migration Verification

```bash
# Automated checks
- [ ] All 91 stories.* files moved to packages/*/src/
- [ ] All examples.* files moved (86 files)
- [ ] All CSS Modules moved (88 files)
- [ ] No old import paths remain (grep check)
- [ ] TypeScript compiles: npm run typecheck
- [ ] Linting passes: npm run lint
- [ ] Storybook builds: npm run storybook:build
- [ ] Story count matches baseline

# Manual spot-checks (sample 5-10 components)
- [ ] stories.tsx imports resolve correctly
- [ ] CSS Modules load properly
- [ ] Stories render in Storybook UI
- [ ] Git history: git log --follow packages/bpk-component-button/src/stories.tsx

# CI/CD checks
- [ ] Percy: Zero visual differences
- [ ] GitHub Actions: All checks pass
- [ ] Storybook deployment: PR preview works
```

## Rollback Strategy

### If Migration Fails

**Option 1: Revert Commit**:
```bash
git reset --hard HEAD~1
npm run storybook:build  # Verify rollback successful
```

**Option 2: Automated Rollback Script**:
```bash
#!/bin/bash
# rollback-migration.sh

# Move files back to examples/
for component in packages/bpk-component-*; do
  name=$(basename "$component")
  examples_dir="examples/${name}"

  mkdir -p "$examples_dir"

  # Move story files back
  [ -f "${component}/src/stories.ts" ] && git mv "${component}/src/stories.ts" "$examples_dir/"
  [ -f "${component}/src/stories.tsx" ] && git mv "${component}/src/stories.tsx" "$examples_dir/"
  [ -f "${component}/src/stories.js" ] && git mv "${component}/src/stories.js" "$examples_dir/"

  # Move example files back
  [ -f "${component}/src/examples.tsx" ] && git mv "${component}/src/examples.tsx" "$examples_dir/"
  [ -f "${component}/src/examples.js" ] && git mv "${component}/src/examples.js" "$examples_dir/"

  # Move CSS Modules back
  find "${component}/src/" -name "*.module.scss" -path "*/src/*" -exec git mv {} "$examples_dir/" \;
  find "${component}/src/" -name "*.module.css" -path "*/src/*" -exec git mv {} "$examples_dir/" \;
done

# Restore Storybook config
git checkout HEAD~1 .storybook/main.ts

# Restore CI workflows
git checkout HEAD~1 .github/workflows/pr.yml
git checkout HEAD~1 .github/workflows/_build.yml

echo "Rollback complete. Run: npm run storybook:build"
```

## Risk Mitigation

| Risk | Mitigation Strategy |
|------|---------------------|
| Import path errors | Automated transformation + TypeScript verification |
| Git history loss | Use `git mv`, verify with `git log --follow` |
| Storybook build failure | Pre-flight checks, rollback script ready |
| Percy visual changes | Should be zero - file location doesn't affect rendering |
| CI cache invalidation | Update cache keys in workflows before migration |
| Shared utils breakage | Test bpk-storybook-utils imports in pilot phase |
| File format inconsistency | Document as known issue, standardize in follow-up |

## Success Metrics

- ✅ All 91 components migrated successfully
- ✅ Zero Storybook build errors
- ✅ Zero Percy visual differences
- ✅ Zero TypeScript/linting errors
- ✅ Git history preserved for all files
- ✅ CI/CD pipeline passes all checks
- ✅ Storybook deployment successful
- ✅ No regression in story count

## Timeline

| Phase | Duration | Status |
|-------|----------|--------|
| Phase 1: Pilot | 2-3 hours | Pending |
| Phase 2: Tool Development | 1-2 hours | Pending |
| Phase 3: Batch Migration | 1 hour | Pending |
| Phase 4: Cleanup | 30 minutes | Pending |
| **Total** | **5-7 hours** | **Not Started** |

## Next Steps

1. ✅ Research complete (research.md)
2. ✅ Strategy designed (this document)
3. ⏳ Execute Phase 1: Pilot Migration (3 components)
4. ⏳ Validate pilot and refine tools
5. ⏳ Execute Phase 3: Batch Migration
6. ⏳ Verification and PR submission
7. ⏳ Phase 4: Cleanup after merge

## References

- **Research Findings**: `research.md`
- **Specification**: `spec.md`
- **Implementation Plan**: `plan.md`
- **Banana Pattern**: `/Users/viktoryang/skyscanner/banana/libs/shared/universal/*/src/*.stories.tsx`
