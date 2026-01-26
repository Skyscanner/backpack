# Phase 4: Cleanup

**Purpose**: Remove backwards-compatibility layer and fully activate NX

**Total Specs**: 2
**Prerequisites**: Phase 3 complete (all or nearly all components migrated)
**Risk Level**: **HIGH** - This phase includes breaking changes

---

## ⚠️ Breaking Change Warning

Phase 4 removes the backwards-compatible re-exports in `packages/`. After this phase:
- All imports must use path mappings: `@skyscanner/backpack-web/[component]`
- Old imports from `packages/[component]` will break
- This is a coordinated, team-wide change

**Coordinate with team before starting Phase 4.**

---

## Spec 4.1: Remove packages/ re-exports (BREAKING CHANGE)

**Description for Spec Kit**:

```
Remove the backwards-compatible re-exports from packages/ directory, completing the migration to libs/.

⚠️ THIS IS A BREAKING CHANGE ⚠️

Pre-requisites:
1. Verify Phase 3 is complete: At least 95% of components are migrated
2. Communicate with team: Send notification about the breaking change
3. Ensure all consumers are ready to update imports
4. Consider creating a feature flag or doing this on a dedicated branch

Tasks:
1. Document the current state in docs/nx-migration/pre-cleanup-snapshot.md:
   - Number of components in libs/: [count]
   - Number of re-exports in packages/: [count]
   - Number of deferred components: [count]
   - Deferred components list: [list]

2. Create a script to update imports across the codebase:
   tools/scripts/update-imports.sh:
   #!/bin/bash
   # Updates all imports from packages/[component] to @skyscanner/backpack-web/[component]

   # Find all JS/TS files excluding node_modules
   find . -type f \\( -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" \\) \\
     -not -path "*/node_modules/*" \\
     -not -path "*/dist/*" \\
     -not -path "*/.nx/*" \\
     -exec sed -i '' \\
     -e "s|from ['\"]packages/\\([^'\"]*\\)['\"]|from '@skyscanner/backpack-web/\\1'|g" \\
     -e "s|require(['\"]packages/\\([^'\"]*\\)['\"])|require('@skyscanner/backpack-web/\\1')|g" \\
     {} +

   echo "Import paths updated!"

3. Make the script executable: chmod +x tools/scripts/update-imports.sh

4. Run the import update script: ./tools/scripts/update-imports.sh

5. Verify the import updates:
   - Run TypeScript check: pnpm tsc --noEmit
   - Run all tests: npx nx run-many -t test
   - Run all linting: npx nx run-many -t lint

6. Remove the packages/ directory (except for deferred components):
   # For each migrated component
   for component in libs/*/; do
     component_name=$(basename "$component")
     if [ -f "packages/$component_name/src/index.js" ]; then
       # Check if it's just the re-export
       if grep -q "export \\* from.*libs" "packages/$component_name/src/index.js"; then
         echo "Removing re-export for $component_name"
         rm -rf "packages/$component_name"
       fi
     fi
   done

7. Keep packages/ directory structure for deferred components (if any remain)

8. Update root package.json:
   - Remove references to packages/ workspaces if using workspaces
   - Or update workspace glob to exclude migrated packages

9. Run full test suite: npx nx run-many -t test,lint

10. Commit with message: "refactor!: Remove backwards-compatible re-exports (BREAKING CHANGE)"

    Use git commit message format with breaking change:
    refactor!: Remove backwards-compatible re-exports

    BREAKING CHANGE: All imports must now use path mappings
    - Old: import { Component } from 'packages/bpk-component-badge'
    - New: import { Component } from '@skyscanner/backpack-web/bpk-component-badge'

    Migration guide: docs/nx-migration/breaking-change-guide.md

Acceptance Criteria:
- All imports are updated to use path mappings
- Re-exports in packages/ are removed for migrated components
- TypeScript compilation succeeds
- All tests pass
- All linting passes
- Breaking change is clearly documented in commit message
- Migration guide exists for external consumers
- Changes are committed to git

Context:
This is the point of no return. After this commit, the codebase is fully migrated to NX structure. The packages/ directory is removed (except for deferred components). All code uses path mappings.

This should be coordinated with the team and possibly done on a dedicated branch with team review before merging to main.
```

**Status**: ⬜ Not Started

**Notes**:
- **DO NOT run this spec until Phase 3 is complete**
- Coordinate with team before starting
- Consider doing this on a feature branch
- Create a detailed migration guide for external consumers
- May want to do this in steps if the codebase is large

---

## Spec 4.2: Update package.json scripts to use NX

**Description for Spec Kit**:

```
Update all build/test/lint scripts in package.json to use NX commands exclusively.

Tasks:
1. Identify all existing scripts in root package.json:
   - Build scripts
   - Test scripts
   - Lint scripts
   - Other scripts that reference packages/

2. Update scripts to use NX:
   "scripts": {
     "build": "nx run-many -t build",
     "test": "nx run-many -t test",
     "test:watch": "nx run-many -t test --watch",
     "test:affected": "nx affected -t test",
     "lint": "nx run-many -t lint",
     "lint:fix": "nx run-many -t lint --fix",
     "lint:affected": "nx affected -t lint",
     "typecheck": "nx run-many -t typecheck",
     "storybook": "nx storybook [your-storybook-host-app]",
     "build-storybook": "nx build-storybook [your-storybook-host-app]"
   }

3. Remove old scripts that referenced packages/ or lerna

4. Add useful NX commands:
   "scripts": {
     "nx:graph": "nx graph",
     "nx:affected:graph": "nx affected:graph",
     "nx:reset": "nx reset"
   }

5. Update any scripts in individual package.json files if they still exist

6. Test each script:
   - pnpm build
   - pnpm test
   - pnpm lint
   - pnpm nx:graph

7. Update documentation:
   - Update README.md with new commands
   - Update CONTRIBUTING.md if it exists
   - Update any developer onboarding docs

8. Update CI/CD configuration to use new scripts:
   # .github/workflows/test.yml (example)
   - name: Run tests
     run: pnpm test:affected

   - name: Run linting
     run: pnpm lint:affected

9. Test CI/CD by pushing changes and verifying pipelines pass

10. Commit with message: "chore: Update scripts to use NX commands"

Acceptance Criteria:
- All package.json scripts use NX commands
- Old lerna/workspace scripts are removed
- New scripts work correctly (tested locally)
- Documentation is updated
- CI/CD configuration uses new scripts
- CI/CD pipelines pass
- Changes are committed to git

Context:
After Phase 4.1, the codebase is fully migrated to NX structure. Now we fully activate NX by using it for all build/test/lint operations. This unlocks NX's caching and affected detection benefits.

The scripts should use "nx run-many" for all targets and "nx affected" for CI/CD to only run tasks for changed code.
```

**Status**: ⬜ Not Started

**Notes**:
- Keep old scripts commented out temporarily for reference
- Test thoroughly in CI before removing old scripts entirely
- Update team on new commands

---

## Phase 4 Complete Checklist

Before moving to Phase 5, ensure:

- [ ] All imports use path mappings (no more packages/ imports)
- [ ] Re-exports in packages/ are removed
- [ ] packages/ directory is removed (or only contains deferred components)
- [ ] All package.json scripts use NX commands
- [ ] Documentation is updated
- [ ] CI/CD uses new NX commands
- [ ] All tests pass: pnpm test
- [ ] All linting passes: pnpm lint
- [ ] CI/CD pipelines pass
- [ ] Team is trained on new commands
- [ ] External consumers have migration guide
- [ ] Changes are committed and merged to main

**Migration Complete**: At this point, the NX migration is functionally complete. Phase 5 (TypeScript) and Phase 6 (Polish) are optimizations.

**Next Phase**: [Phase 5: TypeScript](./phase-5-typescript.md)
