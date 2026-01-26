# Phase 3: Batch Migration

**Purpose**: Scale the proven migration pattern to all 150+ components

**Total Specs**: 31 (1 script + 30 batches)
**Prerequisites**: Phase 2 pilot validated successfully
**Risk Level**: Low (pattern is proven, specs can run in parallel)

---

## Overview

Phase 3 migrates the remaining ~150 components using the pattern validated in Phase 2. Components are migrated in batches of 5 to make specs manageable and allow parallelization.

**Important**: These specs can be run in any order or in parallel. If a component is blocked by circular dependencies, defer it and continue with others.

---

## Spec 3.0: Create batch migration script

**Description for Spec Kit**:

```
Create an automated script to migrate a batch of components using the proven pilot pattern.

Tasks:
1. Create tools/scripts/migrate-batch.sh:
   #!/bin/bash
   # Usage: ./tools/scripts/migrate-batch.sh component1 component2 component3 ...

   set -e  # Exit on error

   COMPONENTS=("$@")

   if [ ${#COMPONENTS[@]} -eq 0 ]; then
     echo "Usage: ./tools/scripts/migrate-batch.sh component1 component2 ..."
     exit 1
   fi

   echo "Migrating batch of ${#COMPONENTS[@]} components..."

   for COMPONENT in "${COMPONENTS[@]}"; do
     echo ""
     echo "=== Migrating $COMPONENT ==="

     # Check for circular dependencies first
     if grep -q "$COMPONENT" docs/nx-migration/circular-deps-baseline.txt; then
       echo "⚠️  WARNING: $COMPONENT appears in circular dependency report"
       echo "Consider deferring this component"
       read -p "Continue anyway? (y/n) " -n 1 -r
       echo
       if [[ ! $REPLY =~ ^[Yy]$ ]]; then
         echo "Skipping $COMPONENT"
         continue
       fi
     fi

     # 1. Create lib structure
     echo "Creating lib structure..."
     ./tools/scripts/migrate-component.sh "$COMPONENT"

     # 2. Add path mapping FIRST
     echo "Adding path mapping..."
     # Use jq or sed to add path mapping to tsconfig.base.json
     # This is a placeholder - actual implementation will depend on your system
     node -e "
       const fs = require('fs');
       const tsconfig = JSON.parse(fs.readFileSync('tsconfig.base.json', 'utf8'));
       if (!tsconfig.compilerOptions.paths) tsconfig.compilerOptions.paths = {};
       tsconfig.compilerOptions.paths['@skyscanner/backpack-web/$COMPONENT'] = ['libs/$COMPONENT/src/index.ts'];
       fs.writeFileSync('tsconfig.base.json', JSON.stringify(tsconfig, null, 2));
     "

     # 3. Move files with git mv
     echo "Moving files..."
     if [ -d "packages/$COMPONENT/src" ]; then
       git mv packages/$COMPONENT/src/* libs/$COMPONENT/src/ 2>/dev/null || true
     fi

     # 4. Create re-export
     echo "Creating re-export..."
     mkdir -p "packages/$COMPONENT/src"
     cat > "packages/$COMPONENT/src/index.js" <<EOF
// Backwards compatibility re-export
// This allows existing imports to continue working during migration
export * from '../../../libs/$COMPONENT/src/index';
EOF

     # 5. Copy jest, eslint, stylelint configs
     echo "Copying configs..."
     if [ -f "packages/$COMPONENT/jest.config.js" ]; then
       cp packages/$COMPONENT/jest.config.js libs/$COMPONENT/
     fi

     # 6. Update project.json with targets (basic version)
     echo "Updating project.json..."
     cat > "libs/$COMPONENT/project.json" <<EOF
{
  "name": "$COMPONENT",
  "sourceRoot": "libs/$COMPONENT/src",
  "projectType": "library",
  "tags": ["type:ui", "scope:backpack"],
  "targets": {
    "test": {
      "executor": "@nx/jest:jest",
      "options": {
        "jestConfig": "libs/$COMPONENT/jest.config.js",
        "passWithNoTests": true
      }
    },
    "lint": {
      "executor": "@nx/eslint:lint",
      "options": {
        "lintFilePatterns": ["libs/$COMPONENT/**/*.{ts,tsx,js,jsx}"]
      }
    }
  }
}
EOF

     # 7. Test the migration
     echo "Testing migration..."
     if npx nx test "$COMPONENT"; then
       echo "✅ $COMPONENT migrated successfully"
     else
       echo "❌ $COMPONENT migration failed"
       echo "Please investigate and fix manually"
     fi

     echo ""
   done

   echo "Batch migration complete!"
   echo "Review the changes, fix any issues, then commit."

2. Make the script executable: chmod +x tools/scripts/migrate-batch.sh
3. Test the script with a single non-critical component
4. Document usage in tools/scripts/README.md
5. Commit with message: "chore: Create batch migration script"

Acceptance Criteria:
- migrate-batch.sh exists and is executable
- Script can migrate multiple components in one run
- Script adds path mappings automatically
- Script creates re-exports automatically
- Script tests each component after migration
- Script warns about circular dependencies
- Usage is documented
- Changes are committed to git

Context:
This script automates the repetitive steps from the pilot migration. It reduces manual work and ensures consistency across all 150+ components. The script can be improved iteratively as patterns emerge.
```

**Status**: ⬜ Not Started

**Notes**:
- Test thoroughly with non-critical components first
- The script may need adjustments based on your system

---

## Batch Migration Specs (3.1 - 3.30)

Each spec below migrates 5 components. The components are placeholders - you'll need to list actual component names from your `packages/` directory.

**General pattern for each batch spec**:

```
Migrate the next batch of 5 components using the batch migration script and pattern validated in Phase 2.

Tasks:
1. Select the next 5 components from packages/ that:
   - Have not been migrated yet
   - Are not in the deferred list
   - Preferably have minimal circular dependencies
2. Run: ./tools/scripts/migrate-batch.sh component1 component2 component3 component4 component5
3. For each component, verify:
   - Files moved to libs/[component]/src/
   - Re-export exists in packages/[component]/src/index.js
   - Path mapping added to tsconfig.base.json
   - Tests pass: npx nx test [component]
4. If a component fails:
   - Document the failure in docs/nx-migration/learnings.md
   - Add to deferred list in tracker.md if it's a blocker
   - Continue with the other 4 components
5. Update tracker.md to mark this batch as complete
6. Commit with message: "refactor: Migrate components [list names] to libs/"

Acceptance Criteria:
- 5 components (or fewer if some deferred) are migrated
- Tests pass for all successfully migrated components
- Both import paths work (old and new)
- Failures are documented
- tracker.md is updated
- Changes are committed to git
```

---

## Spec 3.1: Migrate components batch 1 (components 1-5)

**Description for Spec Kit**:

```
Migrate batch 1: The next 5 components after the pilot.

Components to migrate (replace with actual names):
1. [COMPONENT_1]
2. [COMPONENT_2]
3. [COMPONENT_3]
4. [COMPONENT_4]
5. [COMPONENT_5]

Tasks:
1. Run: ./tools/scripts/migrate-batch.sh [COMPONENT_1] [COMPONENT_2] [COMPONENT_3] [COMPONENT_4] [COMPONENT_5]
2. For each component, verify:
   - Files moved to libs/
   - Re-export exists in packages/
   - Path mapping added to tsconfig.base.json
   - Tests pass: npx nx test [component]
3. If a component fails, document in learnings.md and add to deferred list
4. Update tracker.md to mark Spec 3.1 as complete
5. Commit with message: "refactor: Migrate batch 1 ([list actual names]) to libs/"

Acceptance Criteria:
- Up to 5 components migrated successfully
- Tests pass for each
- Both import paths work
- Failures documented
- tracker.md updated
- Committed to git

Context:
This is the first batch after the pilot. Go slow, validate thoroughly, and document any issues that weren't caught in the pilot.
```

**Status**: ⬜ Not Started

---

## Specs 3.2 through 3.30

*[Following the exact same pattern as 3.1, just with different component lists]*

For brevity, here's the template. Create 29 more specs (3.2 through 3.30) following this exact pattern:

---

### Spec 3.X: Migrate components batch X (components Y-Z)

**Description for Spec Kit**:

```
Migrate batch X: The next 5 components.

Components to migrate:
1. [COMPONENT_N]
2. [COMPONENT_N+1]
3. [COMPONENT_N+2]
4. [COMPONENT_N+3]
5. [COMPONENT_N+4]

[Same tasks and acceptance criteria as 3.1]

Commit message: "refactor: Migrate batch X ([list actual names]) to libs/"
```

**Status**: ⬜ Not Started

---

## Component Selection Strategy

When selecting components for each batch:

1. **Check circular dependencies first**: Use docs/nx-migration/circular-deps-baseline.txt
2. **Group related components**: Migrate components that depend on each other together
3. **Start with leaf nodes**: Migrate components with zero dependencies first
4. **Defer problematic components**: If a component has complex circular deps, add to deferred list
5. **Parallelize**: Multiple team members can run different batches in parallel

## Handling Failures

### If a component migration fails:

1. **Diagnose the issue**:
   - Circular dependency? → Add to deferred list
   - Missing dependency? → Update spec to include dependency
   - Test failure? → Fix the test or the migration

2. **Document in learnings.md**:
   ```markdown
   ### Spec 3.X: Component [NAME] failed
   **Issue**: [describe]
   **Solution**: [how fixed]
   **Pattern**: [will this affect other components?]
   ```

3. **Decide: Skip or Fix**:
   - If fixable quickly (< 30 min) → Fix and retry
   - If complex (circular dep) → Defer and continue with batch
   - If systemic → Pause and update batch script

4. **Update tracker.md**:
   ```markdown
   ## Deferred Specs
   - Spec 3.X: bpk-component-[name] (circular dep with component-[other])
   ```

## Progress Tracking

Update tracker.md after each batch:

```markdown
## Phase 3: Batch Migration (X/31 complete)

**Batch 1**: (1/1) ✅
- [x] **Spec 3.1**: Migrate components 1-5 ✅

**Batches 2-31**: (X/30)
- [x] **Spec 3.2**: Migrate components 6-10 ✅
- [x] **Spec 3.3**: Migrate components 11-15 ✅ (1 deferred)
- [ ] **Spec 3.4**: Migrate components 16-20
...
```

## Performance Tips

1. **Run batches in parallel**: Different branches, different developers
2. **Use NX caching**: Second migration of similar component is faster
3. **Batch commits**: Commit each batch separately for easier review
4. **Test immediately**: Don't accumulate failures

## Phase 3 Complete Checklist

Before moving to Phase 4, ensure:

- [ ] 150+ components are migrated (or on deferred list with plan)
- [ ] Less than 10% of components are deferred
- [ ] All non-deferred components pass: npx nx run-many -t test
- [ ] All non-deferred components pass: npx nx run-many -t lint
- [ ] Path mappings exist for all migrated components
- [ ] Re-exports exist for all migrated components
- [ ] Deferred components have documented reasons and plans
- [ ] learnings.md documents all patterns and corrections
- [ ] tracker.md is up to date
- [ ] Team has reviewed batch migrations

**Critical**: Do not proceed to Phase 4 until the vast majority of components are migrated. Phase 4 is a breaking change.

**Next Phase**: [Phase 4: Cleanup](./phase-4-cleanup.md)
