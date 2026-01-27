<!--
==============================================================================
DOCUMENT PURPOSE: Design HOW to implement spec.md requirements (Implementation)
==============================================================================

This plan describes the technical solution for implementing the Storybook
stories colocation migration. This is an infrastructure/tooling task, not a
UI component.

FOCUS: HOW
- How to relocate story files
- What migration scripts and tools to use
- How to update configurations

This is NOT a component - it's a file reorganization task as part of Nx
migration milestone 3.
==============================================================================
-->

# Implementation Plan: Storybook Stories Colocation

**Branch**: `WOODPECKER-4041` | **Date**: 2026-01-27 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-colocate-stories/spec.md`
**Type**: Infrastructure/Tooling (file reorganization)

## Summary

Implement systematic relocation of all 91 Storybook story files from the centralized `examples/` directory to colocate them with their component source code in `packages/*/src/`. Additionally, migrate shared story utilities (`bpk-storybook-utils`) to `packages/` to align with Backpack's package-based structure. This migration uses `git mv` to preserve history, updates import paths automatically, and modifies Storybook configuration to discover stories in their new locations. The implementation follows Banana monorepo patterns where documentation lives alongside code.

**Key Decisions**:
- Use automated migration script to batch-process all components
- Move `bpk-storybook-utils` to `packages/` for better package alignment
- Preserve Git history via `git mv` for all file operations
- Update import paths programmatically using AST transformations
- Update ~10-30 story files that import from `bpk-storybook-utils`
- Single atomic commit to avoid partial migration state
- Verify Storybook build after migration before committing

## Technical Context

**Monorepo**: Backpack Design System (95+ packages)
**Build System**: Nx 22.4.0-beta.4 (from WOODPECKER-4039)
**Package Manager**: npm >=10.7.0 with workspaces
**Node Version**: >=18.20.4
**TypeScript**: 5.9.2
**Storybook**: 7.x with React + Webpack 5
**Target**: 91 component packages in `packages/bpk-component-*/`
**CI/CD**: GitHub Actions (Storybook deployment, Percy visual tests)
**Constraints**: Must preserve Git history, maintain zero visual diff, pass all CI checks

**Current Structure**:
```
backpack/
├── packages/bpk-component-*/src/     # Component implementations
└── examples/
    ├── bpk-component-*/              # Component stories (to be moved)
    │   ├── stories.tsx
    │   ├── examples.tsx
    │   └── *.module.scss
    └── bpk-storybook-utils/          # Shared utilities (to be moved)
        └── index.js, src/
```

**Target Structure** (Banana-aligned):
```
backpack/
└── packages/
    ├── bpk-component-*/src/          # Component + colocated stories
    │   ├── ComponentName/
    │   │   └── *.tsx, *.module.scss
    │   ├── stories.tsx               # ← moved here
    │   ├── examples.tsx              # ← moved here
    │   └── *.module.scss             # ← moved here
    └── bpk-storybook-utils/          # ← moved here
        └── index.js, src/
```

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Core Principles Compliance

- [x] **Component-First Architecture**: Improves colocation within component packages
- [x] **Naming Conventions**: Story filenames unchanged (`stories.tsx`, `examples.tsx`)
- [x] **License Headers**: All files retain existing Apache 2.0 headers
- [x] **Modern Sass**: No Sass changes - stories maintain existing imports
- [x] **Accessibility-First**: Story accessibility unchanged
- [x] **TypeScript**: All story files already TypeScript
- [x] **SemVer**: PATCH bump (internal restructure only)
- [x] **Deprecation Management**: N/A - no API deprecations
- [x] **Test Coverage**: No test changes - file reorganization only
- [x] **Documentation**: Stories become more discoverable

### Technology Compliance

- [x] **Git History**: Using `git mv` for all file moves
- [x] **Import Paths**: Will update from `../../packages/` to `./` relative paths
- [x] **Storybook Config**: Update `.storybook/main.ts` glob patterns
- [x] **CI Compatibility**: Verify workflows continue to work
- [x] **Nx Compatibility**: Aligns with Nx implicit project roots

### Migration Safety

- [x] **Atomic Migration**: Single commit for entire migration
- [x] **Rollback Plan**: Can revert commit if issues discovered
- [x] **Zero Downtime**: No consumer impact (stories not in published package)
- [x] **Visual Regression**: Percy tests verify zero visual changes
- [x] **Build Verification**: Storybook build must succeed before commit

**No constitution violations. Migration follows all Backpack standards.**

## Project Structure

### Documentation (this feature)

```text
specs/001-colocate-stories/
├── spec.md                  # Feature specification
├── plan.md                  # This file
├── research.md              # Phase 0: Research findings
├── migration-strategy.md    # Phase 1: Migration design
└── tasks.md                 # Phase 2: Implementation tasks (/speckit.tasks)
```

### Migration Artifacts (temporary)

```text
scripts/migrate-stories/
├── migrate.sh               # Main migration script
├── update-imports.js        # TypeScript import path updater
├── verify-migration.sh      # Post-migration verification
└── rollback.sh              # Emergency rollback script
```

## Phase 0: Research & Discovery

**Objective**: Understand current structure, identify edge cases, survey Banana patterns

### Research Tasks

1. **Audit Current Examples Directory**:
   - Count total directories in `examples/`: Expected 91 components + shared utilities
   - Identify story file patterns: `stories.tsx`, `examples.tsx`
   - Find associated style files: `*.module.scss`, `*.module.css`
   - **Audit shared utilities**: `bpk-storybook-utils/` structure and dependencies
   - **Count components using shared utilities**: Identify all story files importing from `bpk-storybook-utils`
   - Document any non-standard examples (e.g., `bpk-scrim-utils`, `bpk-stylesheets-fonts`, `bpk-animate-height`)

2. **Analyze Import Patterns**:
   - Survey import paths in story files
   - Identify common patterns: `../../packages/bpk-component-*/src/`
   - **Find imports to shared utilities**: Pattern `../bpk-storybook-utils`
   - **Count affected files**: Stories using `action`, `BpkDarkExampleWrapper`, etc.
   - Document external dependencies (Storybook addons, React, etc.)

3. **Review Banana Colocation Pattern**:
   - Study Banana repository structure: `/Users/viktoryang/skyscanner/banana`
   - Identify story file locations: `libs/shared/universal/*/src/*.stories.tsx`
   - Document naming conventions and import patterns
   - Check Banana's Storybook configuration

4. **Storybook Configuration Review**:
   - Read `.storybook/main.ts` current config
   - Understand story discovery glob patterns
   - Check for any custom resolvers or plugins
   - Document addon configurations (a11y, docs, etc.)

5. **CI Workflow Analysis**:
   - Review `.github/workflows/pr.yml` Storybook build step
   - Check Percy visual test configuration
   - Identify any hardcoded `examples/` paths
   - Document deployment workflow to GitHub Pages

6. **Git History Preservation Test**:
   - Test `git mv` on a single story file
   - Verify `git log --follow` works correctly
   - Confirm `git blame` preserves authorship
   - Validate rename detection in diffs

**Deliverable**: `research.md` with:
- Complete inventory of files to move (count per component)
- **Shared utilities analysis**: `bpk-storybook-utils/` structure, usage count, affected files
- Import path transformation rules (both component and shared utility imports)
- Edge cases and exceptions identified
- **Non-component stories**: Handling of `bpk-scrim-utils`, `bpk-stylesheets-fonts`, `bpk-animate-height`
- Migration script requirements
- Rollback strategy

## Phase 1: Migration Design & Strategy

**Objective**: Design automated migration approach and verify strategy

### Migration Strategy Design

**Deliverable**: `migration-strategy.md` containing:

1. **File Move Strategy**:
   ```bash
   # Step 1: Move shared utilities first
   git mv examples/bpk-storybook-utils packages/

   # Step 2: Move component stories
   for dir in examples/bpk-component-*; do
     component=$(basename "$dir")
     target="packages/${component}/src/"

     # Move story files using git mv
     git mv "${dir}/stories.tsx" "${target}/"
     git mv "${dir}/examples.tsx" "${target}/" 2>/dev/null || true

     # Move style files
     git mv "${dir}"/*.module.scss "${target}/" 2>/dev/null || true
     git mv "${dir}"/*.module.css "${target}/" 2>/dev/null || true
   done

   # Step 3: Handle non-component stories (bpk-scrim-utils, etc.)
   # Decision: Move to corresponding packages/ if they exist, or handle separately
   ```

2. **Import Path Transformation**:
   ```javascript
   // Pattern 1: Component imports
   // Before: import BpkButton from '../../packages/bpk-component-button/src/BpkButton';
   // After:  import BpkButton from './BpkButton';

   // Pattern 2: Shared utilities imports (CRITICAL)
   // Before: import { action } from '../bpk-storybook-utils';
   // After:  import { action } from '../../bpk-storybook-utils';

   // Transformation rules:
   // - Component imports: Remove ../../packages/bpk-component-{name}/src/ → ./
   // - Shared utility imports: Update ../bpk-storybook-utils → ../../bpk-storybook-utils
   // - Keep submodule imports (e.g., ./BpkButton/types)
   ```

3. **Storybook Config Update**:
   ```typescript
   // .storybook/main.ts
   const config: StorybookConfig = {
     stories: [
       // OLD: '../examples/**/stories.@(ts|tsx|js|jsx)',
       // NEW:
       '../packages/**/src/stories.@(ts|tsx|js|jsx)',
       '../packages/**/src/examples.@(ts|tsx|js|jsx)',
     ],
     // ... rest of config unchanged
   };
   ```

4. **Edge Case Handling**:
   - Components with no examples directory → Skip
   - Style files with different naming → Pattern match `*.module.*`
   - **Shared utilities**: Move `bpk-storybook-utils/` to `packages/` (as decided in clarification)
   - **Import updates**: Update ~10-30 story files that import from shared utilities
   - **Non-component stories**: `bpk-scrim-utils`, `bpk-stylesheets-fonts`, `bpk-animate-height` → Handle separately
   - Non-story files (README, assets) → Leave in examples/ or move to docs/

5. **Verification Checks**:
   ```bash
   # Post-migration verification
   - File count: 91 components × ~3 files = ~273 files moved
   - Import syntax: No ../../packages/ paths remain
   - Storybook build: npm run storybook:build (must succeed)
   - Story count: Match pre-migration count
   - Git history: git log --follow on 5 random files
   - Visual diff: Percy reports zero changes
   ```

### Migration Script Design

**Script Structure**:
```bash
#!/bin/bash
# scripts/migrate-stories/migrate.sh

set -e  # Exit on error

# 1. Pre-migration checks
echo "Running pre-migration checks..."
- Verify on WOODPECKER-4041 branch
- Verify clean working tree
- Count files in examples/
- Capture baseline: npm run storybook:build

# 2. Execute migration
echo "Migrating story files..."
- **Step 1**: Move bpk-storybook-utils to packages/ first
- **Step 2**: Loop through all examples/bpk-component-*/ directories
- For each: git mv files to packages/*/src/
- Track progress and errors

# 3. Update import paths
echo "Updating import paths..."
- Run TypeScript AST transformation script
- **Pattern 1**: Update component imports (../../packages/ → ./)
- **Pattern 2**: Update shared utility imports (../bpk-storybook-utils → ../../bpk-storybook-utils)
- Validate syntax after transformation

# 4. Update Storybook config
echo "Updating Storybook configuration..."
- Edit .storybook/main.ts stories glob patterns
- Add new patterns for colocated stories

# 5. Verification
echo "Verifying migration..."
- npm run typecheck (must pass)
- npm run lint (must pass)
- npm run storybook:build (must pass)
- Count stories in Storybook (must match baseline)
- Check examples/ is empty (or only _shared/ remains)

# 6. Report
echo "Migration complete. Ready for commit."
```

**Import Path Updater** (TypeScript AST):
```javascript
// scripts/migrate-stories/update-imports.js
const ts = require('typescript');
const fs = require('fs');
const path = require('path');

function transformImports(filePath) {
  const source = fs.readFileSync(filePath, 'utf-8');
  const sourceFile = ts.createSourceFile(filePath, source, ts.ScriptTarget.Latest);

  // Transform import declarations
  const transformer = (context) => (rootNode) => {
    function visit(node) {
      if (ts.isImportDeclaration(node)) {
        const moduleSpecifier = node.moduleSpecifier.text;

        // Pattern 1: Component imports
        // Match: ../../packages/bpk-component-xxx/src/YYY
        if (moduleSpecifier.match(/^\.\.\/\.\.\/packages\/bpk-component-[^/]+\/src\//)) {
          const newPath = moduleSpecifier.replace(/^\.\.\/\.\.\/packages\/bpk-component-[^/]+\/src\//, './');
          return ts.factory.updateImportDeclaration(
            node,
            node.modifiers,
            node.importClause,
            ts.factory.createStringLiteral(newPath),
            node.attributes
          );
        }

        // Pattern 2: Shared utilities imports (CRITICAL)
        // Match: ../bpk-storybook-utils
        if (moduleSpecifier.match(/^\.\.\/bpk-storybook-utils/)) {
          const newPath = moduleSpecifier.replace(/^\.\.\/bpk-storybook-utils/, '../../bpk-storybook-utils');
          return ts.factory.updateImportDeclaration(
            node,
            node.modifiers,
            node.importClause,
            ts.factory.createStringLiteral(newPath),
            node.attributes
          );
        }
      }
      return ts.visitEachChild(node, visit, context);
    }
    return ts.visitNode(rootNode, visit);
  };

  const result = ts.transform(sourceFile, [transformer]);
  const printer = ts.createPrinter();
  const newSource = printer.printFile(result.transformed[0]);

  fs.writeFileSync(filePath, newSource, 'utf-8');
}

// Process all story files
const storyFiles = glob.sync('packages/bpk-component-*/src/{stories,examples}.tsx');
storyFiles.forEach(transformImports);
```

## Phase 2: Implementation Tasks

**Note**: Detailed task breakdown will be generated by `/speckit.tasks` command.

**High-Level Task Sequence**:

1. **Setup Phase**:
   - Create migration scripts directory
   - Write main migration script
   - Write import path updater
   - Write verification script

2. **Pre-Migration Phase**:
   - Run pre-migration checks
   - Capture baseline metrics (file count, story count)
   - Run baseline Percy snapshot
   - Document current state

3. **Migration Execution**:
   - Execute file moves with `git mv`
   - Run import path transformation
   - Update Storybook configuration
   - Update any CI workflow paths (if needed)

4. **Verification Phase**:
   - Run TypeScript compilation
   - Run linting
   - Build Storybook locally
   - Count stories and compare to baseline
   - Run Percy visual tests
   - Verify Git history preservation

5. **Commit & Deploy**:
   - Commit migration with comprehensive message
   - Push to remote branch
   - Open PR with migration summary
   - Verify CI passes
   - Merge after approval

## Testing Strategy

### Pre-Migration Baseline

**Capture Before Starting**:
1. File count: `find examples/ -type f | wc -l`
2. Story count: Parse Storybook build output
3. Percy snapshot: Run visual tests
4. Git state: Commit hash and clean working tree

### Migration Verification

**Automated Checks**:
1. **File Count Verification**:
   ```bash
   # Verify all files moved
   examples_count=$(find examples/ -type f -name "*.tsx" | wc -l)
   packages_count=$(find packages/*/src/ -name "stories.tsx" -o -name "examples.tsx" | wc -l)

   if [ "$packages_count" -ne 91 ]; then
     echo "ERROR: Expected 91 components, found $packages_count"
     exit 1
   fi
   ```

2. **Import Path Verification**:
   ```bash
   # Check for any remaining old import paths
   old_imports=$(grep -r "../../packages/" packages/*/src/{stories,examples}.tsx || true)

   if [ -n "$old_imports" ]; then
     echo "ERROR: Old import paths found:"
     echo "$old_imports"
     exit 1
   fi
   ```

3. **Storybook Build Verification**:
   ```bash
   npm run storybook:build
   # Must exit 0 (success)
   # Check dist-storybook/ for expected story count
   ```

4. **Git History Verification**:
   ```bash
   # Test 5 random story files
   for file in $(find packages/*/src/stories.tsx | shuf -n 5); do
     git log --follow --oneline "$file" | head -5
     # Should show history from examples/ location
   done
   ```

### CI/CD Verification

**GitHub Actions Checks**:
1. TypeScript compilation: `npm run typecheck`
2. Linting: `npm run lint`
3. Storybook build: CI workflow step
4. Percy visual tests: Must show zero visual changes
5. Storybook deployment: PR preview must work

### Rollback Strategy

**If Migration Fails**:
```bash
# Option 1: Revert commit
git reset --hard HEAD~1

# Option 2: Revert merge
git revert <commit-sha>

# Option 3: Use rollback script
./scripts/migrate-stories/rollback.sh
```

**Rollback Script**:
```bash
#!/bin/bash
# scripts/migrate-stories/rollback.sh

# Move files back to examples/
for component in packages/bpk-component-*/; do
  name=$(basename "$component")
  examples_dir="examples/${name}"

  mkdir -p "$examples_dir"
  git mv "${component}/src/stories.tsx" "$examples_dir/" 2>/dev/null || true
  git mv "${component}/src/examples.tsx" "$examples_dir/" 2>/dev/null || true
  git mv "${component}/src/"*.module.scss "$examples_dir/" 2>/dev/null || true
done

# Restore Storybook config
git checkout HEAD .storybook/main.ts

echo "Rollback complete. Run: npm run storybook:build"
```

## Dependencies

### Internal Dependencies

**Repository Files**:
- `.storybook/main.ts` - Storybook configuration
- `.storybook/preview.tsx` - Preview configuration (unchanged)
- `examples/` - Current story locations (source)
- `packages/bpk-component-*/` - Target locations (destination)
- `.github/workflows/pr.yml` - CI workflow (may need path updates)

**Tools & Scripts**:
- `git` - For `git mv` and history preservation
- `node` - For running TypeScript transformation script
- `npm` - For running Storybook build and checks
- `typescript` - For AST-based import transformation

### External Dependencies

**Already Installed**:
- Storybook 7.x - Story discovery and build
- Nx 22.4.0-beta.4 - Monorepo tooling
- Percy - Visual regression testing
- GitHub Actions - CI/CD

**No New Dependencies Required** - All tools already in project

## Migration & Versioning

### Version Determination

**This migration is**: **PATCH** version bump

**Rationale**:
- Internal restructure only
- No changes to component exports or behavior
- Consumers don't import story files
- Published `@skyscanner/backpack-web` package unchanged
- Storybook deployment updated but stories remain accessible

**No Breaking Changes**: Story files are not part of the public API

### Deployment Impact

**What Changes**:
- Story file locations (internal only)
- Storybook configuration glob patterns
- Contributor workflow (find stories in `packages/*/src/` instead of `examples/`)

**What Stays the Same**:
- Published npm package (stories not included)
- Consumer imports (no impact)
- Storybook URL and navigation
- Story content and functionality
- CI/CD workflows (after config update)

**Timeline**:
1. Migration PR merged → Branch: WOODPECKER-4041
2. CI passes → Storybook deployed to PR preview
3. Review approved → Merge to main
4. No package publish required (internal change only)

## Implementation Notes

### Migration Sequence

**Step 1: Pre-Flight Checks**
```bash
# Verify branch and state
git branch --show-current  # Should be WOODPECKER-4041
git status                  # Should be clean

# Count files to move
find examples/ -name "*.tsx" | wc -l
find examples/ -name "*.scss" | wc -l

# Capture baseline
npm run storybook:build > baseline-build.log
```

**Step 2: Execute Migration**
```bash
# Run migration script
./scripts/migrate-stories/migrate.sh

# Should output:
# - Pre-migration checks: ✓
# - Moving 91 components... ✓
# - Updating import paths... ✓
# - Updating Storybook config... ✓
# - Running verification... ✓
# - Migration complete!
```

**Step 3: Manual Verification**
```bash
# Check a sample component
ls -la packages/bpk-component-button/src/
# Should see: stories.tsx, examples.tsx, *.module.scss

# Verify imports updated
head -20 packages/bpk-component-button/src/stories.tsx
# Should see: import BpkButton from './BpkButton';

# Test Storybook
npm run storybook
# Open http://localhost:9001 and verify all stories load
```

**Step 4: Commit & Push**
```bash
# Single atomic commit
git add -A
git commit -m "[WOODPECKER-4041] Colocate Storybook stories with components

Relocate all 91 Storybook story files from examples/ directory to
colocate them with component source code in packages/*/src/.

Changes:
- Move stories.tsx, examples.tsx, and style files using git mv
- Update import paths from ../../packages/ to relative ./
- Update .storybook/main.ts glob patterns for discovery
- Preserve Git history for all moved files

Benefits:
- Improved discoverability: examples alongside implementation
- Reduced context-switching between directories
- Aligns with Nx implicit project roots pattern
- Matches Banana monorepo colocated structure

Verification:
- Storybook builds successfully with all 91 components
- Percy visual tests show zero visual changes
- Git history preserved (verified with git log --follow)
- TypeScript compilation passes
- Linting passes

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

# Push to remote
git push origin WOODPECKER-4041
```

### Banana Alignment

**Current Banana Pattern**:
```
banana/libs/shared/universal/features/components/src/
├── PriceAlertSuccessModal/
│   ├── PriceAlertSuccessModal.tsx
│   ├── PriceAlertSuccessModal.module.scss
│   └── PriceAlertSuccessModal.stories.tsx    # ← Colocated
└── EcoTicketWrapper/
    ├── EcoTicketWrapper.tsx
    └── EcoTicketWrapper.stories.tsx           # ← Colocated
```

**Backpack After Migration**:
```
backpack/packages/bpk-component-button/src/
├── BpkButton/
│   ├── BpkButton.tsx
│   └── BpkButton.module.scss
├── stories.tsx                                 # ← Colocated
├── examples.tsx                                # ← Colocated
└── BpkButtonStory.module.scss                 # ← Colocated
```

**Alignment Achieved**: Stories now colocated with implementation, matching Banana's pattern

### Future Banana Merge

**When Backpack Merges into Banana**:
1. Move `packages/bpk-component-*` to `banana/libs/shared/universal/backpack/src/`
2. Stories already colocated → No additional story restructure needed
3. Update Banana's Storybook config to include backpack stories
4. No import path changes needed within backpack components

## Risk Analysis

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Git history lost | High | Low | Use `git mv`, verify with `git log --follow` |
| Import paths break | High | Medium | Automated transformation + TypeScript check |
| Storybook build fails | High | Low | Pre-flight verification, rollback script ready |
| Percy shows visual changes | Medium | Low | Should be zero diff - file location doesn't affect rendering |
| CI workflows break | Medium | Low | Review workflows for hardcoded paths before migration |
| Missing edge case files | Low | Medium | Comprehensive audit in Phase 0 |
| Partial migration state | High | Low | Single atomic commit prevents partial state |

**Mitigation Strategy**: Automated scripts + comprehensive verification + rollback plan

## References

- **Spec**: `specs/001-colocate-stories/spec.md`
- **Nx Project Structure**: `specs/nx-project-structure/`
- **Banana Repository**: `/Users/viktoryang/skyscanner/banana`
- **Storybook Documentation**: https://storybook.js.org/docs/react/configure/overview
- **Git mv Documentation**: `man git-mv`
- **TypeScript Compiler API**: https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API
