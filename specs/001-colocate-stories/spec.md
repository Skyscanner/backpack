<!--
==============================================================================
DOCUMENT PURPOSE: Define WHAT needs to be built and WHY (Requirements)
==============================================================================

This specification describes requirements and constraints for non-technical
stakeholders (designers, product managers, business analysts).

FOCUS: WHAT & WHY
- What needs to be built
- Why it's needed
- What success looks like

✅ INCLUDE in spec.md:
- Functional requirements (FR-XXX): "Component MUST support X"
- Component API declarations: Props list with types and plain descriptions
- Success criteria: Measurable outcomes without implementation details
- User scenarios: Given/When/Then acceptance tests
- Non-functional requirements: Performance, accessibility constraints
- Edge cases: Boundary conditions and error scenarios

❌ EXCLUDE from spec.md (belongs in plan.md):
- TypeScript interface code with `export interface`
- React component implementation code
- Sass/CSS implementation patterns
- File structure and directory organization
- Import statements and code examples
- Build tool configuration

❌ EXCLUDE from spec.md (belongs in tasks.md):
- Step-by-step implementation tasks
- Specific file paths and commands
- Task execution order and dependencies

AUTOMATION:
- `/speckit.plan` reads this spec and auto-generates implementation patterns
- `/speckit.tasks` reads spec + plan and auto-generates task list

VALIDATION:
- Spec should be understandable without technical background
- Requirements should be testable and measurable
- No code blocks with TypeScript/React implementation
==============================================================================
-->

# Feature Specification: Storybook Stories Colocation

**Branch**: `WOODPECKER-4041`
**Created**: 2026-01-27
**Status**: Draft
**Milestone**: Nx Migration - Milestone 3
**Context**: Preparing for Backpack → Banana monorepo merge

## Summary

Relocate all Storybook story files from the centralized `examples/` directory to colocate them with their corresponding component source code. This migration improves discoverability, simplifies the folder structure, and aligns with Banana monorepo patterns where documentation lives alongside implementation.

**Why This Matters**:
- **Better Discoverability**: Developers find examples immediately when viewing component code
- **Reduced Context-Switching**: No need to navigate between `packages/` and `examples/` directories
- **Nx Alignment**: Leverages Nx's implicit project roots by keeping all component assets together
- **Banana Preparation**: Matches the colocated pattern used in Banana monorepo (`libs/shared/universal/*/src/*.stories.tsx`)

**Current State**: 91 component examples in `examples/bpk-component-*/` directories, plus shared utilities in `examples/bpk-storybook-utils/`
**Target State**: Stories colocated in `packages/bpk-component-*/src/` alongside implementation, shared utilities moved to `packages/bpk-storybook-utils/`

## Constitution Check

*GATE: Must pass before implementation begins.*

- [x] **Component-First Architecture**: Maintains component isolation, improves colocation
- [x] **Naming Conventions**: Story filenames remain unchanged (`stories.tsx`, `examples.tsx`)
- [x] **License Headers**: All moved files retain existing Apache 2.0 license headers
- [x] **Modern Sass**: No Sass changes - stories maintain existing style imports
- [x] **Accessibility-First**: Story accessibility preserved, examples still demonstrate a11y patterns
- [x] **TypeScript**: All story files already TypeScript
- [x] **Test Coverage**: No test coverage changes - this is a file reorganization
- [x] **Documentation**: README files remain in component packages, stories become more discoverable
- [x] **Versioning**: PATCH version bump (internal restructure, no consumer API changes)

## User Scenarios & Testing *(mandatory)*

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY TESTABLE - meaning if you implement just ONE of them,
  you should still have a viable MVP (Minimum Viable Product) that delivers value.

  Assign priorities (P1, P2, P3, etc.) to each story, where P1 is the most critical.
  Think of each story as a standalone slice of functionality that can be:
  - Developed independently
  - Tested independently
  - Deployed independently
  - Demonstrated to users independently
-->

### User Story 1 - Developer Discovers Component Examples (Priority: P1)

**User**: Backpack consumer (Skyscanner developer)

**Journey**: When browsing component source code in `packages/bpk-component-button/`, developer immediately sees story files demonstrating usage patterns without navigating to a separate `examples/` directory.

**Why this priority**: Core value proposition - improves developer experience by reducing cognitive overhead and navigation time.

**Independent Test**: After colocation, verify that all component packages contain their story files in the `src/` directory and that Storybook still builds successfully.

**Acceptance Scenarios**:

1. **Given** a developer opens `packages/bpk-component-button/src/`, **When** they browse the directory, **Then** they see `stories.tsx` and `examples.tsx` alongside the component implementation
2. **Given** a developer is viewing component code in their IDE, **When** they use "find in folder" for stories, **Then** stories appear in search results within the same package
3. **Given** all stories are colocated, **When** developer runs `npm run storybook`, **Then** all component stories load without errors

---

### User Story 2 - Storybook Build and Deploy Succeeds (Priority: P1)

**User**: Backpack maintainer / CI system

**Journey**: After colocation, Storybook configuration automatically discovers all story files in their new locations and builds successfully for both local development and deployed environments.

**Why this priority**: Must work for continuous integration - broken Storybook blocks PR merges and deployments.

**Independent Test**: Run `npm run storybook:build` and verify successful build with all 91 components' stories included.

**Acceptance Scenarios**:

1. **Given** stories are colocated in `packages/*/src/`, **When** Storybook build runs, **Then** all story files are discovered via updated glob patterns
2. **Given** Storybook is deployed to GitHub Pages, **When** users browse the deployed site, **Then** all component stories render correctly
3. **Given** Percy visual tests run in CI, **When** comparing screenshots, **Then** visual regression tests pass with no unexpected differences
4. **Given** a PR is opened, **When** CI runs Storybook build step, **Then** build completes without errors

---

### User Story 3 - Git History Preserved for Story Files (Priority: P2)

**User**: Backpack maintainer reviewing file history

**Journey**: After colocation, developers can still view the complete commit history for each story file using `git log --follow`.

**Why this priority**: Important for maintenance and debugging but not blocking core functionality.

**Independent Test**: Run `git log --follow packages/bpk-component-button/src/stories.tsx` and verify history shows commits from the original `examples/` location.

**Acceptance Scenarios**:

1. **Given** story files are moved using `git mv`, **When** developer runs `git log --follow` on a story file, **Then** full commit history is preserved
2. **Given** a bug is discovered in a story, **When** developer uses `git blame` on the story file, **Then** original authorship is preserved
3. **Given** multiple developers contribute to stories, **When** viewing file history, **Then** all contributors are properly attributed

---

### User Story 4 - Component Package Deletion Cleans Up Stories (Priority: P3)

**User**: Backpack maintainer removing deprecated component

**Journey**: When deleting a component package, all associated stories are automatically removed as they're colocated in the same directory structure.

**Why this priority**: Nice-to-have improvement for maintenance, but not critical for initial migration.

**Independent Test**: Delete a component package directory and verify no orphaned story files remain in `examples/`.

**Acceptance Scenarios**:

1. **Given** a component package is marked deprecated, **When** maintainer deletes `packages/bpk-component-deprecated/`, **Then** all associated stories are deleted in the same operation
2. **Given** examples directory is cleaned up, **When** checking for orphaned files, **Then** no story files exist without corresponding component implementation
3. **Given** component and stories are colocated, **When** running directory audits, **Then** no mismatches exist between components and their stories

---

### Edge Cases

- **What happens when a story file references styles from the examples directory?**
  Story style files (`*.module.scss`) must also be moved and import paths updated to maintain correct references.

- **How does Storybook handle stories in nested directory structures?**
  Storybook's glob patterns must be updated from `examples/**/stories.tsx` to `packages/**/src/**/*.stories.tsx` to discover colocated files.

- **What happens if a story file has local dependencies in the examples directory?**
  Shared story utilities (`examples/bpk-storybook-utils/`) will be moved to `packages/bpk-storybook-utils/` to align with Backpack's package structure. Import paths in stories must be updated accordingly (e.g., from `../bpk-storybook-utils` to `../../bpk-storybook-utils`).

- **How are custom decorators and story wrappers affected?**
  Storybook preview configuration (`preview.tsx`) remains in `.storybook/` directory and continues to work with colocated stories.

- **What happens to screenshot assets referenced in stories?**
  Screenshot assets in `docs/` directories remain in their current locations - only story source files move.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: All story files MUST be relocated from `examples/bpk-component-*/{stories.tsx,examples.tsx}` to `packages/bpk-component-*/src/{stories.tsx,examples.tsx}`
- **FR-002**: Story style files (`*.module.scss`, `*.module.css`) MUST be colocated with their story files in the component's `src/` directory
- **FR-003**: Shared story utilities (`examples/bpk-storybook-utils/`) MUST be moved to `packages/bpk-storybook-utils/` to align with Backpack's package-based structure
- **FR-004**: Storybook configuration MUST be updated to discover stories using new glob pattern matching colocated locations
- **FR-005**: All 91 components MUST have their stories successfully migrated and discoverable in Storybook UI
- **FR-006**: File moves MUST use `git mv` command to preserve Git history
- **FR-007**: Import paths within story files MUST be updated to reference component code using relative paths (e.g., `./BpkButton` instead of `../../packages/bpk-component-button/src/BpkButton`)
- **FR-008**: Import paths to shared utilities MUST be updated (e.g., from `../bpk-storybook-utils` to `../../bpk-storybook-utils`)
- **FR-009**: All Percy visual regression tests MUST continue to pass with colocated stories
- **FR-010**: CI Storybook build and deployment workflows MUST succeed without modifications (or with minimal configuration updates)

### Non-Functional Requirements

- **NFR-001**: Migration MUST NOT break any existing consumer imports (consumers don't import story files)
- **NFR-002**: Migration MUST complete as a single atomic commit to avoid partial state
- **NFR-003**: Local development Storybook server (`npm run storybook`) MUST start successfully after migration
- **NFR-004**: Storybook build time MUST NOT increase significantly (< 5% regression acceptable)
- **NFR-005**: All story files MUST retain their original Apache 2.0 license headers
- **NFR-006**: No story files MUST remain in the `examples/` directory after migration completion

### Storybook Configuration Requirements

- **SB-001**: Storybook `stories` glob pattern MUST be updated in `.storybook/main.ts` to match new locations
- **SB-002**: Story file naming convention (`stories.tsx`) MUST remain unchanged for consistency
- **SB-003**: Storybook navigation hierarchy MUST remain unchanged (components grouped by category)
- **SB-004**: Storybook addons (a11y, docs) MUST continue to function with colocated stories

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All 91 component story files are successfully moved from `examples/` to `packages/*/src/`
- **SC-002**: Shared utilities (`bpk-storybook-utils`) are successfully moved to `packages/bpk-storybook-utils/`
- **SC-003**: Storybook builds successfully with `npm run storybook:build` (zero errors)
- **SC-004**: Storybook deploys successfully to GitHub Pages (PR preview builds work)
- **SC-005**: All Percy visual regression tests pass (no unexpected visual changes)
- **SC-006**: Git history is preserved for all moved files (verifiable with `git log --follow`)
- **SC-007**: No orphaned story files remain in `examples/` directory (directory can be safely deleted or repurposed)
- **SC-008**: CI build passes all checks (lint, typecheck, storybook build, tests)
- **SC-009**: Local development workflow (`npm run storybook`) works without additional configuration changes

## Dependencies & Related Components

**Internal Dependencies**:
- `.storybook/main.ts` - Storybook configuration defining story file discovery patterns
- `.storybook/preview.tsx` - Storybook global decorators and parameters
- All 91 component packages in `packages/bpk-component-*/`
- Examples directory structure in `examples/bpk-component-*/`

**External Dependencies**:
- Storybook 7.x with React support
- Nx (for monorepo file organization patterns)
- Percy (visual regression testing via Storybook)
- GitHub Actions workflows (Storybook deployment)

**Banana Monorepo Context**:
- Banana uses colocated stories pattern: `libs/shared/universal/*/src/*.stories.tsx`
- This migration aligns Backpack structure with Banana's approach
- Simplifies future merge of Backpack into Banana repository

## Testing Strategy

### Migration Validation

**Pre-Migration Baseline**:
- Document count of story files in `examples/` (should be 91 directories)
- Capture Storybook story count from current build
- Run Percy baseline snapshot

**Post-Migration Verification**:
- Verify all 91 packages contain story files in `src/` directory
- Verify Storybook story count matches baseline
- Compare Percy snapshots (should show zero visual differences)
- Verify `examples/` directory is empty (or deleted)

### Build Verification

**Local Development**:
- `npm run storybook` starts without errors
- All components visible in Storybook navigation
- Stories render correctly with proper styling
- Storybook hot-reload works for story file changes

**CI/CD Verification**:
- GitHub Actions Storybook build job passes
- Storybook artifacts are deployable to GitHub Pages
- Percy visual tests pass
- No linting or TypeScript errors

### Git History Verification

**Git Operations**:
- Run `git log --follow` on 5 random story files
- Verify full commit history is preserved across file moves
- Verify `git blame` shows original authors correctly
- Verify all file moves appear as renames (not deletes + adds)

## Migration & Versioning

**Version Type**: **PATCH**

**Rationale**: This is an internal restructure that does not affect the public API:
- No changes to component exports or behavior
- Consumers do not import story files (they import from `@skyscanner/backpack-web`)
- Story file locations are an internal concern
- No breaking changes to consumer code

**Breaking Changes**: None

**Deprecations**: None

**Migration Path for Backpack Contributors**:
- After migration, contributors will find story files in `packages/*/src/` instead of `examples/`
- No action required for consumers - they don't import story files

**Deployment Impact**:
- Published npm package (`@skyscanner/backpack-web`) is unchanged - stories are not included in published package
- Storybook deployment process may require minimal configuration updates
- No consumer downtime or migration required

## Implementation Notes

**File Structure Before**:
```
backpack/
├── packages/
│   └── bpk-component-button/
│       └── src/
│           └── BpkButton/
│               ├── BpkButton.tsx
│               └── BpkButton.module.scss
└── examples/
    └── bpk-component-button/
        ├── stories.tsx
        ├── examples.tsx
        └── BpkButtonStory.module.scss
```

**File Structure After**:
```
backpack/
└── packages/
    └── bpk-component-button/
        └── src/
            ├── BpkButton/
            │   ├── BpkButton.tsx
            │   └── BpkButton.module.scss
            ├── stories.tsx                 # ← moved here
            ├── examples.tsx                # ← moved here
            └── BpkButtonStory.module.scss  # ← moved here
```

**Key Implementation Principles**:
1. Use `git mv` for all file moves to preserve history
2. Update import paths in moved story files to use relative paths
3. Update `.storybook/main.ts` glob patterns to discover colocated stories
4. Verify Storybook build after each batch of component migrations
5. Run Percy visual tests to ensure no unexpected visual regressions
6. Delete empty `examples/` directory after all stories are moved

**Storybook Configuration Change**:
- **Before**: `stories: ['../examples/**/stories.@(ts|tsx|js|jsx)']`
- **After**: `stories: ['../packages/**/src/**/*.stories.@(ts|tsx|js|jsx)']`

**Banana Alignment**:
- Matches Banana pattern: `libs/shared/universal/*/src/*.stories.tsx`
- When Backpack merges into Banana, stories will already be colocated
- No additional story restructure needed during Banana merge

## Open Questions

- [ ] Q1: Should story style files (`*.module.scss`) be moved to component `src/` root or nested in a `stories/` subdirectory?
  - **Recommendation**: Move to `src/` root for simplicity (matches Banana pattern)
- [ ] Q2: Should the empty `examples/` directory be deleted or repurposed after migration?
  - **Recommendation**: Delete to avoid confusion - examples are now colocated
- [x] Q3: How should shared story utilities (`examples/bpk-storybook-utils/`) be handled?
  - **Decision**: Move to `packages/bpk-storybook-utils/` to align with package structure (Session 2026-01-27)

## References

- **Nx Project Structure Spec**: `specs/nx-project-structure/spec.md`
- **Nx Adoption One Pager**: https://skyscanner.atlassian.net/wiki/spaces/Clover/pages/1430062432
- **Banana Repository**: `/Users/viktoryang/skyscanner/banana`
- **Backpack Constitution**: `.specify/memory/constitution.md`
- **Storybook Documentation**: https://storybook.js.org/docs/react/configure/overview
- **Git History Preservation**: `man git-mv` and `git log --follow`

## Clarification Sessions

### Session 2026-01-27 (Initial Specification)

**Context**: This feature is part of Nx Migration Milestone 3. The goal is to prepare Backpack for eventual merge into the Banana monorepo by adopting the colocated story pattern already used in Banana.

**Key Decisions**:
- Use Banana's colocated pattern as reference implementation
- Preserve Git history using `git mv` for all file moves
- Keep story filenames unchanged (`stories.tsx`, `examples.tsx`)
- Target PATCH version bump (internal change, no consumer impact)

### Session 2026-01-27 (Shared Utilities Handling)

- Q: How should `examples/bpk-storybook-utils/` shared utilities directory be handled during migration? → A: Move to `packages/bpk-storybook-utils/` to align with Backpack's package-based structure, updating import paths in affected stories from `../bpk-storybook-utils` to `../../bpk-storybook-utils`
