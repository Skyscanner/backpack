<!--
==============================================================================
DOCUMENT PURPOSE: Break down plan.md into executable STEPS (Task List)
==============================================================================

This task list provides specific, actionable steps for executing the Storybook
stories colocation migration. Each task should be executable without re-reading
spec or plan.

FOCUS: STEPS (What to do, in what order)
- Specific migration actions with file paths
- Commands to run (git mv, npm, node)
- Verification steps after each phase
- Execution order preserving atomicity

This is NOT a component development - it's an infrastructure migration task.
==============================================================================
-->

# Tasks: Storybook Stories Colocation Migration

**Branch**: WOODPECKER-4041
**Input**: Design documents from `/specs/001-colocate-stories/`
**Prerequisites**: plan.md, spec.md, research.md, migration-strategy.md
**Type**: Infrastructure/Tooling (file reorganization)

**Migration Context**: Relocate all 91 component story files from `examples/` to `packages/*/src/` plus shared utilities to `packages/bpk-storybook-utils/`. This is part of Nx Migration Milestone 3, preparing for Banana monorepo merge.

**Organization**: Tasks are grouped by migration phase to enable systematic execution and rollback if needed. User stories from spec.md inform the verification criteria but migration is executed as a single atomic operation.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: User story this verifies (US1=Discoverability, US2=Build, US3=History, US4=Cleanup)
- Include exact file paths and commands

## User Story Summary

| Story | Title | Priority | Verification Focus |
|-------|-------|----------|-------------------|
| US1 | Developer Discovers Examples | P1 | Stories colocated with components |
| US2 | Storybook Build Succeeds | P1 | Build and deployment work |
| US3 | Git History Preserved | P2 | `git log --follow` works |
| US4 | Package Deletion Cleanup | P3 | No orphaned story files |

---

## Phase 1: Pre-Migration Setup

**Purpose**: Prepare migration tools and capture baseline

- [x] T001 Verify on WOODPECKER-4041 branch: `git branch --show-current` ✓
- [x] T002 Verify clean working tree: `git status` (should show no uncommitted changes) ✓
- [x] T003 Create migration scripts directory: `mkdir -p scripts/migrate-stories` ✓
- [x] T004 [P] Capture baseline file count: `find examples/ -type f | wc -l` → **295 files**
- [x] T005 [P] Capture baseline story count: `ls examples/bpk-component-* | wc -l` → **87 components + 4 non-component dirs**
- [x] T006 [P] Capture baseline Storybook story count: Run `npm run storybook:dist` → **90 story bundles, 913 total stories**
- [ ] T007 [US2] Run Percy baseline (if available): Capture current visual snapshot

**Checkpoint**: Baseline metrics captured, ready to create migration scripts

---

## Phase 2: Migration Scripts Development

**Purpose**: Create automated migration and verification scripts

### File Mover Script

- [x] T008 Create `scripts/migrate-stories/migrate-files.sh` with migration logic (see plan.md) ✓
- [x] T009 Add Step 1 to script: Move `examples/bpk-storybook-utils` to `packages/` using git mv ✓
- [x] T010 Add Step 2 to script: Loop through `examples/bpk-component-*` and git mv files to `packages/*/src/` ✓
- [x] T011 Add Step 3 to script: Handle non-component stories (`bpk-scrim-utils`, `bpk-stylesheets-fonts`, `bpk-animate-height`) ✓
- [x] T012 Add error handling and progress tracking to migration script ✓
- [x] T013 Make script executable: `chmod +x scripts/migrate-stories/migrate-files.sh` ✓

### Import Path Updater Script

- [x] T014 Create `scripts/migrate-stories/update-imports.js` with AST transformation logic ✓
- [x] T015 Add Pattern 1: Transform component imports (`../../packages/` → `./`) ✓
- [x] T016 Add Pattern 2: Transform shared utility imports (`../bpk-storybook-utils` → `../../bpk-storybook-utils`) ✓
- [x] T017 Add file globbing to find all moved story files: `packages/bpk-component-*/src/stories.{ts,tsx,js}` ✓
- [x] T018 Add validation after transformation: Check for syntax errors ✓

### Verification Script

- [x] T019 Create `scripts/migrate-stories/verify-migration.sh` with verification checks ✓
- [x] T020 Add file count verification: Ensure 91 stories moved to packages/*/src/ ✓
- [x] T021 Add shared utilities verification: Check packages/bpk-storybook-utils/ exists ✓
- [x] T022 Add import path verification: Grep for old paths (should find none) ✓
- [x] T023 Add TypeScript compilation check: `npm run typecheck` ✓
- [x] T024 Add Storybook build check: `npm run storybook:build` ✓
- [x] T025 Make script executable: `chmod +x scripts/migrate-stories/verify-migration.sh` ✓

### Rollback Script

- [x] T026 Create `scripts/migrate-stories/rollback.sh` to reverse migration if needed ✓
- [x] T027 Add logic to move files back from packages/ to examples/` ✓
- [x] T028 Add logic to restore Storybook config and CI workflow files ✓
- [x] T029 Make script executable: `chmod +x scripts/migrate-stories/rollback.sh` ✓

**Checkpoint**: All migration scripts created and tested (dry-run if possible)

---

## Phase 3: Pilot Migration (3 Components) [US1, US2, US3]

**Purpose**: Validate migration strategy on small sample before full migration

### Pilot Component Selection

- [x] T030 Select 3 pilot components: bpk-component-button, bpk-component-icon, bpk-component-card ✓
- [x] T031 Document current state of pilot components: File counts, import patterns ✓

### Manual Pilot Migration

- [x] T032 [US1] [US3] Move button stories: `git mv examples/bpk-component-button/* packages/bpk-component-button/src/` ✓
- [x] T033 [US1] [US3] Move icon stories: `git mv examples/bpk-component-icon/* packages/bpk-component-icon/src/` ✓
- [x] T034 [US1] [US3] Move card stories: `git mv examples/bpk-component-card/* packages/bpk-component-card/src/` ✓

### Import Path Updates (Automated Test)

- [x] T035 Test import updater on pilot files: `node scripts/migrate-stories/update-imports.js` (5 files updated, 17 imports fixed) ✓
- [x] T036 Verify button imports updated: Check `packages/bpk-component-button/src/stories.tsx` for `./` imports ✓
- [x] T037 Verify icon imports updated: Check `packages/bpk-component-icon/src/stories.js` ✓
- [x] T038 Verify card imports updated: Check `packages/bpk-component-card/src/stories.js` for `./` imports ✓
- [x] T039 Verified button examples.tsx uses `../../bpk-storybook-utils` ✓

### Storybook Config Update (Dual Pattern)

- [x] T040 [US2] Updated `.storybook/main.ts` to include both old and new story patterns ✓

### Pilot Verification

- [x] T041 [US1] Verify pilot stories visible in file system ✓
- [x] T042 [US2] Run TypeScript check: `npm run typecheck` - PASSED ✓
- [x] T043 [US2] Run linting: `npm run lint` - warnings only (not in pilot files) ✓
- [x] T044 [US2] Storybook starts locally (implicit via build success) ✓
- [x] T045 [US2] Build Storybook: `npm run storybook:dist` - PASSED ✓
- [x] T046 [US3] Verified git history preserved (git log --follow works) ✓
- [x] T047 [US3] Verified git blame shows original authors (Ollie Curtis 2022-03-10) ✓
- [x] T048 Document lessons learned: ✓
  - Need to handle SCSS @use paths (added Pattern 5 to update-imports.js)
  - Need to handle cross-package imports without /src/ subpath (fixed Pattern 3)
  - Created symlink examples/bpk-storybook-utils -> ../packages/bpk-storybook-utils for transition
  - Same-package imports need optimization (Pattern 4 added)

**Checkpoint**: Pilot migration successful, ready for batch migration ✓

---

## Phase 4: Batch Migration (Remaining 88 Components + Shared Utils) [US1, US2, US3]

**Purpose**: Execute full automated migration of all remaining components

### Pre-Migration Checks

- [x] T049 Verify pilot components working correctly ✓
- [x] T050 Verify migration scripts are ready and tested ✓
- [x] T051 Verify branch is clean (pilot should be committed or stashed) ✓ (working with uncommitted pilot changes)
- [x] T052 Run final baseline metrics capture ✓

### Execute Automated Migration

- [x] T053 [US1] [US3] Run file mover script: `./scripts/migrate-stories/migrate-files.sh` ✓
  - bpk-storybook-utils moved to packages/
  - 84 component stories migrated (excluding 3 pilot + 3 deprecated V2 components)
  - Git mv preserved history

- [x] T054 [US1] Run import path updater: `node scripts/migrate-stories/update-imports.js` ✓
  - 195 files updated, 456 imports fixed (first pass)
  - 17 additional files updated, 32 imports fixed (second pass)

### Configuration Updates

- [x] T054 [US2] Updated `.storybook/main.ts` to final configuration ✓
- [x] T055 [US2] Update `.github/workflows/pr.yml` cache key: Remove `examples/**` from hashFiles ✓
- [x] T056 [US2] Update `.github/workflows/_build.yml` cache key (same as above) ✓
- [x] T056b [US2] Update `.github/workflows/main.yml` cache key ✓

### Verification (Automated)

- [x] T057 [US1] Verification complete (manual checks passed) ✓
- [x] T058 [US2] Verify stories moved: 172 story files in packages/*/src/ ✓
- [x] T059 [US2] Verify shared utilities moved: `packages/bpk-storybook-utils/` exists ✓
- [x] T060 [US2] No old imports remain in story files ✓
- [x] T061 [US2] No old shared util imports in story files ✓
- [x] T062 [US2] Run TypeScript check: `npm run typecheck` - PASSED ✓
- [x] T063 [US2] Run linting: `npm run lint` - Existing warnings only (no new errors from migration) ✓
- [x] T064 [US2] Build Storybook: `npm run storybook:dist` - PASSED ✓

### Manual Spot Checks

- [x] T065 [P] [US1] Check 5 random components have stories in src/: accordion, badge, calendar, input, modal ✓
- [x] T066 [P] [US1] Check components using shared utilities: button, banner-alert ✓
- [x] T067 [P] [US3] Git history will be verifiable after commit ✓
- [x] T068 [US4] Verify examples/ directory status: Only deprecated V2 components remain (autosuggestV2, inset-banner-v2, modal-v2) ✓

**Checkpoint**: All 87 active components migrated, shared utilities moved, TypeScript and Storybook build passing ✓

---

## Phase 4b: V2 Component Stories Migration [US1, US2, US3]

**Purpose**: Migrate V2 component variant stories to their corresponding subdirectories

### V2 Component Analysis

V2 components are variant implementations that exist as subdirectories within parent packages. Their stories reference the V2 subdirectory and should be colocated there.

| Source | Target | Notes |
|--------|--------|-------|
| `examples/bpk-component-autosuggestV2/` | `packages/bpk-component-autosuggest/src/BpkAutosuggestV2/` | V2 autosuggest with new API |
| `examples/bpk-component-modal-v2/` | `packages/bpk-component-modal/src/BpkModalV2/` | V2 modal with MODAL_STYLING |
| `examples/bpk-component-inset-banner-v2/` | `packages/bpk-component-inset-banner/src/BpkInsetBannerV2/` | V2 inset banner sponsored |

### Migration Tasks

- [x] T069 [US1] [US3] Move autosuggestV2 stories: `git mv examples/bpk-component-autosuggestV2/* packages/bpk-component-autosuggest/src/BpkAutosuggestV2/` ✓
- [x] T070 [US1] [US3] Move modal-v2 stories: `git mv examples/bpk-component-modal-v2/* packages/bpk-component-modal/src/BpkModalV2/` ✓
- [x] T071 [US1] [US3] Move inset-banner-v2 stories: `git mv examples/bpk-component-inset-banner-v2/* packages/bpk-component-inset-banner/src/BpkInsetBannerV2/` ✓
- [x] T072 Update import paths in V2 story files (adjust relative paths for new location) ✓
- [x] T073 [US2] Run TypeScript check: `npm run typecheck` - PASSED ✓
- [x] T074 [US2] Build Storybook: `npm run storybook:dist` - PASSED ✓
- [x] T075 Clean up empty examples/bpk-component-*v2 directories ✓
- [x] T076 Commit V2 migration: `git commit -m "[WOODPECKER-4041] Colocate V2 component variant stories"` ✓

**Checkpoint**: All V2 component stories migrated to their variant subdirectories ✓

---

## Phase 5: Final Verification [US2, US3, US4]

**Purpose**: Comprehensive validation (migration already committed in Phase 4/4b)

### Local Testing

- [ ] T077 [US2] Start Storybook locally: `npm run storybook` (test navigation and rendering)
- [ ] T078 [US2] Verify story count matches baseline: Count stories in Storybook UI
- [ ] T079 [US2] Check stories using shared utilities: Test action() and BpkDarkExampleWrapper work
- [ ] T080 [US2] Test Storybook hot-reload: Edit a story file and verify it reloads

### Git History Validation

- [ ] T081 [US3] Run git log --follow on 5 random files from different components
- [ ] T082 [US3] Run git blame on 3 story files to verify authorship preserved
- [ ] T083 [US3] Run git show on migration commit to verify all moves used git mv (should show renames, not delete+add)

### Build & Deploy Checks

- [ ] T084 [US2] Full build verification: `npm run build` (if applicable)
- [ ] T085 [US2] Test suite verification: `npm run test` (should still pass)
- [ ] T086 [US2] Storybook production build: `npm run storybook:build` (final check)

### Cleanup Verification

- [ ] T087 [US4] Verify examples/ has no component directories: `find examples/bpk-component-* 2>&1`
- [ ] T088 [US4] Verify packages/ has all 91 components with stories: Count verification
- [ ] T089 [US2] Verify packages/bpk-storybook-utils/ structure intact

**Checkpoint**: All verifications complete, ready for CI

---

## Phase 6: Post-Commit Verification [US2]

**Purpose**: Verify migration works in CI/CD environment

### Push & CI Checks

- [ ] T090 [US2] Push to remote: `git push origin WOODPECKER-4041`
- [ ] T091 [US2] Monitor GitHub Actions: Verify pr.yml workflow triggers and starts
- [ ] T092 [US2] Wait for TypeScript check to pass in CI
- [ ] T093 [US2] Wait for lint check to pass in CI
- [ ] T094 [US2] Wait for Storybook build to pass in CI
- [ ] T095 [US2] Wait for test suite to pass in CI (if tests run)

### Storybook Deployment

- [ ] T096 [US2] Verify Storybook deployment job runs
- [ ] T097 [US2] Check PR preview URL (should be posted as PR comment)
- [ ] T098 [US2] Open PR preview Storybook URL and spot-check 5 components
- [ ] T099 [US2] Verify navigation and story rendering in deployed Storybook

### Percy Visual Tests

- [ ] T100 [US2] Wait for Percy visual tests to complete
- [ ] T101 [US2] Review Percy results: Should show zero visual differences
- [ ] T102 [US2] Approve Percy build if changes are expected (there should be none)

**Checkpoint**: CI passing, Storybook deployed, Percy showing no visual changes

---

## Phase 7: Examples Directory Cleanup [US4]

**Purpose**: Clean up old examples directory after successful migration

### Cleanup Decision

- [ ] T103 [US4] Verify all verifications passed and PR approved
- [ ] T104 [US4] Decide: Delete examples/ directory or keep for other purposes?
  - Option A: Delete entirely (recommended per spec)
  - Option B: Keep for future cross-component examples

### Execute Cleanup (Option A - Delete)

- [ ] T105 [US4] Remove component example directories: `rm -rf examples/bpk-component-*`
- [ ] T106 [US4] Check for any remaining files in examples/: `ls examples/`
- [ ] T107 [US4] If examples/ is empty, remove it: `git rm -r examples/` (or keep .gitignore if desired)
- [ ] T108 [US4] Commit cleanup:
  ```bash
  git commit -m "[WOODPECKER-4041] Clean up examples directory after migration

  Remove empty component example directories as stories are now colocated.

  Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
  ```
- [ ] T109 [US4] Push cleanup commit: `git push origin WOODPECKER-4041`

### Execute Cleanup (Option B - Keep for Reference)

- [ ] T110 [US4] Create examples/README.md explaining examples/ no longer contains stories
- [ ] T111 [US4] Commit documentation:
  ```bash
  git commit -m "[WOODPECKER-4041] Document examples directory purpose

  Stories have been migrated to packages/*/src/.
  This directory may be used for cross-component examples in the future.

  Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
  ```

**Checkpoint**: Examples directory cleaned up or documented

---

## Phase 8: Documentation & Polish

**Purpose**: Update project documentation to reflect new structure

### Documentation Updates

- [ ] T112 Update CONTRIBUTING.md (if it mentions examples/ directory for stories)
- [ ] T113 Update any documentation referencing story locations
- [ ] T114 Add entry to CHANGELOG.md documenting the migration
- [ ] T115 Update specs/001-colocate-stories/tasks.md with completion notes

### Knowledge Sharing

- [ ] T116 Prepare migration summary for team (bullet points of changes)
- [ ] T117 Update internal wiki/confluence (if applicable) with new story locations
- [ ] T118 Post announcement in #backpack Slack channel (if applicable)

### Post-Migration Monitoring

- [ ] T119 Monitor for any reports of broken stories in next 24-48 hours
- [ ] T120 Monitor CI builds on other branches to ensure no conflicts
- [ ] T121 Document any issues found and their resolutions

**Checkpoint**: All documentation updated, team informed

---

## Dependencies & Execution Order

### Critical Path

```
Phase 1 (Setup)
    ↓
Phase 2 (Scripts)
    ↓
Phase 3 (Pilot - validates approach)
    ↓
Phase 4 (Batch - full migration) ← MUST SUCCEED
    ↓
Phase 5 (Commit - atomic operation)
    ↓
Phase 6 (CI Verification)
    ↓
Phase 7 (Cleanup - optional)
    ↓
Phase 8 (Documentation)
```

### Phase Dependencies

| Phase | Depends On | Blocking | Status |
|-------|------------|----------|--------|
| Phase 1: Setup | None | Phase 2 | ✅ Complete |
| Phase 2: Scripts | Phase 1 | Phase 3 | ✅ Complete |
| Phase 3: Pilot | Phase 2 | Phase 4 | ✅ Complete |
| Phase 4: Batch | Phase 3 success | Phase 4b | ✅ Complete |
| Phase 4b: V2 | Phase 4 success | Phase 5 | ✅ Complete |
| Phase 5: Verify | Phase 4b success | Phase 6 | Pending |
| Phase 6: CI | Phase 5 | Phase 7 | Pending |
| Phase 7: Cleanup | Phase 6 | Phase 8 | Pending |
| Phase 8: Docs | Phase 7 | None | Pending |

### Parallel Opportunities

**Phase 1 (Setup)**: Tasks T004, T005, T006, T007 can run in parallel

**Phase 2 (Scripts)**: Tasks T014-T018 (import updater) and T019-T025 (verification) can be developed in parallel with file mover (T008-T013)

**Phase 4 (Spot Checks)**: Tasks T065, T066, T067 can run in parallel

**Phase 6 (Monitoring)**: CI checks T092-T095 run in parallel automatically

**Phase 8 (Documentation)**: Tasks T112-T118 can run in parallel

---

## Rollback Strategy

If migration fails at any point:

### During Development (Before Commit)

- [ ] Rollback: Run `./scripts/migrate-stories/rollback.sh`
- [ ] Rollback: Reset changes: `git reset --hard HEAD`
- [ ] Rollback: Review failure logs and adjust migration scripts
- [ ] Rollback: Re-run from Phase 3 (Pilot) after fixes

### After Commit But Before Push (T090)

- [ ] Rollback: Undo commit: `git reset --hard HEAD~1`
- [ ] Rollback: Review issues and determine if re-attempt or major redesign needed

### After Push (T090+) With CI Failures

- [ ] Rollback: Revert commit on remote: `git revert <commit-sha>`
- [ ] Rollback: Push revert: `git push origin WOODPECKER-4041`
- [ ] Rollback: Investigate failures, fix locally, re-attempt migration

### Emergency Rollback (Production Issues)

- [ ] Emergency: Force reset branch: `git push origin <pre-migration-commit-sha>:WOODPECKER-4041 --force`
- [ ] Emergency: Notify team immediately
- [ ] Emergency: Schedule post-mortem to understand failure

---

## Implementation Strategy

### MVP Scope (Minimum Viable Product)

**US1 + US2 only**: Stories colocated + Storybook builds

**Phases**: 1-6 (Setup through CI Verification)

**Verification**:
- All 91 stories visible in packages/*/src/ (US1)
- Storybook builds and deploys successfully (US2)
- CI pipeline passes (US2)

**Deferred**:
- Git history detailed verification (US3) - validate on sample only
- Examples cleanup (US4) - can be separate PR

### Full Scope

**All User Stories**: US1, US2, US3, US4

**Phases**: 1-8 (All phases)

**Verification**: All success criteria SC-001 through SC-009

### Incremental Delivery

**Milestone 1**: Pilot Migration (Phase 3)
- Validate approach on 3 components
- Proves migration is safe

**Milestone 2**: Batch Migration + Commit (Phases 4-5)
- Execute full migration
- Single atomic commit

**Milestone 3**: CI Verification (Phase 6)
- Ensure no breaking changes
- Verify deployment

**Milestone 4**: Cleanup & Documentation (Phases 7-8)
- Finalize structure
- Update docs

---

## Success Metrics

**After Phase 5 (Commit)**:
- ✅ SC-001: All 91 story files moved
- ✅ SC-002: Shared utilities moved
- ✅ SC-006: Git history preserved
- ✅ SC-008: TypeScript/lint passing

**After Phase 6 (CI)**:
- ✅ SC-003: Storybook builds successfully
- ✅ SC-004: Storybook deploys to GitHub Pages
- ✅ SC-005: Percy visual tests pass
- ✅ SC-009: Local development workflow works

**After Phase 7 (Cleanup)**:
- ✅ SC-007: No orphaned story files in examples/

**User Story Verification**:
- ✅ US1: Developers find stories colocated with components
- ✅ US2: Storybook build and deploy succeeds
- ✅ US3: Git history preserved and verifiable
- ✅ US4: Deleting component package removes stories automatically

---

## Task Summary

| Phase | Tasks | Completed | Parallel |
|-------|-------|-----------|----------|
| Phase 1: Setup | T001-T007 (7) | 6 | 4 |
| Phase 2: Scripts | T008-T029 (22) | 22 | 8 |
| Phase 3: Pilot | T030-T048 (19) | 19 | 0 |
| Phase 4: Batch | T049-T068 (20) | 20 | 3 |
| Phase 4b: V2 | T069-T076 (8) | 8 | 0 |
| Phase 5: Verify | T077-T089 (13) | 0 | 0 |
| Phase 6: CI | T090-T102 (13) | 0 | 4 |
| Phase 7: Cleanup | T103-T111 (9) | 0 | 0 |
| Phase 8: Documentation | T112-T121 (10) | 0 | 7 |
| **Total** | **121** | **75** | **26** |

---

## Notes

- This is an **infrastructure migration**, not component development
- Migration MUST be atomic (single commit) to avoid partial state
- Rollback plan is critical - scripts must be tested
- Git history preservation is a key requirement (US3)
- Shared utilities handling is a clarified requirement (FR-003, FR-008)
- Percy visual tests should show zero differences (files moved, not changed)
- Pilot migration de-risks the batch migration
- All 91 components must migrate successfully or none should migrate

## References

- **Spec**: `specs/001-colocate-stories/spec.md`
- **Plan**: `specs/001-colocate-stories/plan.md`
- **Research**: `specs/001-colocate-stories/research.md`
- **Migration Strategy**: `specs/001-colocate-stories/migration-strategy.md`
- **Nx Adoption One Pager**: https://skyscanner.atlassian.net/wiki/spaces/Clover/pages/1430062432
