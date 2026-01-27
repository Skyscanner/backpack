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

- [ ] T001 Verify on WOODPECKER-4041 branch: `git branch --show-current`
- [ ] T002 Verify clean working tree: `git status` (should show no uncommitted changes)
- [ ] T003 Create migration scripts directory: `mkdir -p scripts/migrate-stories`
- [ ] T004 [P] Capture baseline file count: `find examples/ -type f | wc -l` (expected: ~295)
- [ ] T005 [P] Capture baseline story count: `ls examples/bpk-component-* | wc -l` (expected: 91)
- [ ] T006 [P] Capture baseline Storybook story count: Run `npm run storybook:build` and note story count from output
- [ ] T007 [US2] Run Percy baseline (if available): Capture current visual snapshot

**Checkpoint**: Baseline metrics captured, ready to create migration scripts

---

## Phase 2: Migration Scripts Development

**Purpose**: Create automated migration and verification scripts

### File Mover Script

- [ ] T008 Create `scripts/migrate-stories/migrate-files.sh` with migration logic (see plan.md)
- [ ] T009 Add Step 1 to script: Move `examples/bpk-storybook-utils` to `packages/` using git mv
- [ ] T010 Add Step 2 to script: Loop through `examples/bpk-component-*` and git mv files to `packages/*/src/`
- [ ] T011 Add Step 3 to script: Handle non-component stories (`bpk-scrim-utils`, `bpk-stylesheets-fonts`, `bpk-animate-height`)
- [ ] T012 Add error handling and progress tracking to migration script
- [ ] T013 Make script executable: `chmod +x scripts/migrate-stories/migrate-files.sh`

### Import Path Updater Script

- [ ] T014 Create `scripts/migrate-stories/update-imports.js` with AST transformation logic
- [ ] T015 Add Pattern 1: Transform component imports (`../../packages/` → `./`)
- [ ] T016 Add Pattern 2: Transform shared utility imports (`../bpk-storybook-utils` → `../../bpk-storybook-utils`)
- [ ] T017 Add file globbing to find all moved story files: `packages/bpk-component-*/src/stories.{ts,tsx,js}`
- [ ] T018 Add validation after transformation: Check for syntax errors

### Verification Script

- [ ] T019 Create `scripts/migrate-stories/verify-migration.sh` with verification checks
- [ ] T020 Add file count verification: Ensure 91 stories moved to packages/*/src/
- [ ] T021 Add shared utilities verification: Check packages/bpk-storybook-utils/ exists
- [ ] T022 Add import path verification: Grep for old paths (should find none)
- [ ] T023 Add TypeScript compilation check: `npm run typecheck`
- [ ] T024 Add Storybook build check: `npm run storybook:build`
- [ ] T025 Make script executable: `chmod +x scripts/migrate-stories/verify-migration.sh`

### Rollback Script

- [ ] T026 Create `scripts/migrate-stories/rollback.sh` to reverse migration if needed
- [ ] T027 Add logic to move files back from packages/ to examples/
- [ ] T028 Add logic to restore Storybook config and CI workflow files
- [ ] T029 Make script executable: `chmod +x scripts/migrate-stories/rollback.sh`

**Checkpoint**: All migration scripts created and tested (dry-run if possible)

---

## Phase 3: Pilot Migration (3 Components) [US1, US2, US3]

**Purpose**: Validate migration strategy on small sample before full migration

### Pilot Component Selection

- [ ] T030 Select 3 pilot components: bpk-component-button, bpk-component-icon, bpk-component-card
- [ ] T031 Document current state of pilot components: File counts, import patterns

### Manual Pilot Migration

- [ ] T032 [US1] [US3] Move button stories: `git mv examples/bpk-component-button/* packages/bpk-component-button/src/`
- [ ] T033 [US1] [US3] Move icon stories: `git mv examples/bpk-component-icon/* packages/bpk-component-icon/src/`
- [ ] T034 [US1] [US3] Move card stories: `git mv examples/bpk-component-card/* packages/bpk-component-card/src/`

### Import Path Updates (Automated Test)

- [ ] T035 Test import updater on pilot files: `node scripts/migrate-stories/update-imports.js` (should transform 3 pilot components)
- [ ] T036 Verify button imports updated: Check `packages/bpk-component-button/src/stories.tsx` for `./` imports
- [ ] T037 Verify icon imports updated: Check `packages/bpk-component-icon/src/stories.tsx` for `./` imports
- [ ] T038 Verify card imports updated: Check `packages/bpk-component-card/src/stories.tsx` for `./` imports
- [ ] T039 If any pilot uses bpk-storybook-utils, verify those imports updated to `../../bpk-storybook-utils`

### Storybook Config Update (Dual Pattern)

- [ ] T040 [US2] Update `.storybook/main.ts` to include both old and new story patterns temporarily:
  ```typescript
  stories: [
    '../examples/**/stories.@(ts|tsx|js|jsx)',  // Old (for remaining 88)
    '../packages/**/src/stories.@(ts|tsx|js|jsx)',  // New (for pilot 3)
  ]
  ```

### Pilot Verification

- [ ] T041 [US1] Verify pilot stories visible in file system: `ls packages/bpk-component-button/src/stories.tsx`
- [ ] T042 [US2] Run TypeScript check: `npm run typecheck` (must pass)
- [ ] T043 [US2] Run linting: `npm run lint` (must pass)
- [ ] T044 [US2] Start Storybook locally: `npm run storybook` (verify pilot stories load)
- [ ] T045 [US2] Build Storybook: `npm run storybook:build` (must succeed)
- [ ] T046 [US3] Verify git history: `git log --follow packages/bpk-component-button/src/stories.tsx` (should show examples/ history)
- [ ] T047 [US3] Verify git blame: `git blame packages/bpk-component-button/src/stories.tsx` (should show original authors)
- [ ] T048 Document lessons learned from pilot: Note any issues or adjustments needed to scripts

**Checkpoint**: Pilot migration successful, ready for batch migration

---

## Phase 4: Batch Migration (Remaining 88 Components + Shared Utils) [US1, US2, US3]

**Purpose**: Execute full automated migration of all remaining components

### Pre-Migration Checks

- [ ] T049 Verify pilot components working correctly
- [ ] T050 Verify migration scripts are ready and tested
- [ ] T051 Verify branch is clean (pilot should be committed or stashed)
- [ ] T052 Run final baseline metrics capture

### Execute Automated Migration

- [ ] T053 [US1] [US3] Run file mover script: `./scripts/migrate-stories/migrate-files.sh`
  - This moves bpk-storybook-utils first
  - Then moves all remaining 88 component stories
  - Uses git mv to preserve history

- [ ] T054 [US1] Run import path updater: `node scripts/migrate-stories/update-imports.js`
  - Transforms component imports (Pattern 1)
  - Transforms shared utility imports (Pattern 2)

### Configuration Updates

- [ ] T054 [US2] Update `.storybook/main.ts` to final configuration (remove old pattern):
  ```typescript
  stories: [
    '../packages/**/src/stories.@(ts|tsx|js|jsx)',
    '../packages/**/src/examples.@(ts|tsx|js|jsx)',
  ]
  ```

- [ ] T055 [US2] Update `.github/workflows/pr.yml` cache key: Remove `examples/**` from hashFiles
- [ ] T056 [US2] Update `.github/workflows/_build.yml` cache key (same as above)

### Verification (Automated)

- [ ] T057 [US1] Run verification script: `./scripts/migrate-stories/verify-migration.sh`
- [ ] T058 [US2] Verify all 91 stories moved: `find packages/bpk-component-*/src/ -name "stories.*" | wc -l` (should be 91)
- [ ] T059 [US2] Verify shared utilities moved: `ls packages/bpk-storybook-utils/` (should exist)
- [ ] T060 [US2] Verify no old imports remain: `grep -r "../../packages/" packages/*/src/stories.* || echo "None found (good)"`
- [ ] T061 [US2] Verify no old shared util imports: `grep -r "../bpk-storybook-utils" packages/*/src/stories.* || echo "None found (good)"`
- [ ] T062 [US2] Run TypeScript check: `npm run typecheck` (must pass)
- [ ] T063 [US2] Run linting: `npm run lint` (must pass)
- [ ] T064 [US2] Build Storybook: `npm run storybook:build` (must succeed)

### Manual Spot Checks

- [ ] T065 [P] [US1] Check 5 random components have stories in src/: Sample bpk-component-{accordion,badge,calendar,input,modal}
- [ ] T066 [P] [US1] Check at least 2 components using shared utilities still work
- [ ] T067 [P] [US3] Run git log --follow on 3 random story files to verify history
- [ ] T068 [US4] Verify examples/ directory is now empty (except .gitignore): `ls examples/bpk-component-* 2>&1 | grep "No such file"`

**Checkpoint**: All 91 components migrated, shared utilities moved, all verifications passing

---

## Phase 5: Final Verification & Commit [US2, US3, US4]

**Purpose**: Comprehensive validation before committing migration

### Local Testing

- [ ] T069 [US2] Start Storybook locally: `npm run storybook` (test navigation and rendering)
- [ ] T070 [US2] Verify story count matches baseline: Count stories in Storybook UI
- [ ] T071 [US2] Check stories using shared utilities: Test action() and BpkDarkExampleWrapper work
- [ ] T072 [US2] Test Storybook hot-reload: Edit a story file and verify it reloads

### Git History Validation

- [ ] T073 [US3] Run git log --follow on 5 random files from different components
- [ ] T074 [US3] Run git blame on 3 story files to verify authorship preserved
- [ ] T075 [US3] Run git show on migration commit to verify all moves used git mv (should show renames, not delete+add)

### Build & Deploy Checks

- [ ] T076 [US2] Full build verification: `npm run build` (if applicable)
- [ ] T077 [US2] Test suite verification: `npm run test` (should still pass)
- [ ] T078 [US2] Storybook production build: `npm run storybook:build` (final check)

### Cleanup Verification

- [ ] T079 [US4] Verify examples/ has no component directories: `find examples/bpk-component-* 2>&1`
- [ ] T080 [US4] Verify packages/ has all 91 components with stories: Count verification
- [ ] T081 [US2] Verify packages/bpk-storybook-utils/ structure intact

### Commit Migration

- [ ] T082 Stage all changes: `git add -A`
- [ ] T083 Review staged changes: `git status` and `git diff --staged --stat`
- [ ] T084 Commit with comprehensive message (see migration-strategy.md for template):
  ```bash
  git commit -m "[WOODPECKER-4041] Colocate Storybook stories with components

  Relocate all 91 Storybook story files from examples/ to packages/*/src/.
  Move bpk-storybook-utils to packages/ for package structure alignment.

  Changes:
  - Move stories.tsx, examples.tsx, style files using git mv
  - Move examples/bpk-storybook-utils to packages/
  - Update component import paths: ../../packages/ → ./
  - Update shared utility imports: ../bpk-storybook-utils → ../../bpk-storybook-utils
  - Update .storybook/main.ts glob patterns
  - Update CI workflow cache keys

  Verification:
  - All 91 components migrated (SC-001)
  - Shared utilities moved (SC-002)
  - Storybook builds successfully (SC-003)
  - Git history preserved via git mv (SC-006)
  - TypeScript/lint passing (SC-008)

  Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
  ```

**Checkpoint**: Migration committed as single atomic change

---

## Phase 6: Post-Commit Verification [US2]

**Purpose**: Verify migration works in CI/CD environment

### Push & CI Checks

- [ ] T085 [US2] Push to remote: `git push origin WOODPECKER-4041`
- [ ] T086 [US2] Monitor GitHub Actions: Verify pr.yml workflow triggers and starts
- [ ] T087 [US2] Wait for TypeScript check to pass in CI
- [ ] T088 [US2] Wait for lint check to pass in CI
- [ ] T089 [US2] Wait for Storybook build to pass in CI
- [ ] T090 [US2] Wait for test suite to pass in CI (if tests run)

### Storybook Deployment

- [ ] T091 [US2] Verify Storybook deployment job runs
- [ ] T092 [US2] Check PR preview URL (should be posted as PR comment)
- [ ] T093 [US2] Open PR preview Storybook URL and spot-check 5 components
- [ ] T094 [US2] Verify navigation and story rendering in deployed Storybook

### Percy Visual Tests

- [ ] T095 [US2] Wait for Percy visual tests to complete
- [ ] T096 [US2] Review Percy results: Should show zero visual differences
- [ ] T097 [US2] Approve Percy build if changes are expected (there should be none)

**Checkpoint**: CI passing, Storybook deployed, Percy showing no visual changes

---

## Phase 7: Examples Directory Cleanup [US4]

**Purpose**: Clean up old examples directory after successful migration

### Cleanup Decision

- [ ] T098 [US4] Verify all verifications passed and PR approved
- [ ] T099 [US4] Decide: Delete examples/ directory or keep for other purposes?
  - Option A: Delete entirely (recommended per spec)
  - Option B: Keep for future cross-component examples

### Execute Cleanup (Option A - Delete)

- [ ] T100 [US4] Remove component example directories: `rm -rf examples/bpk-component-*`
- [ ] T101 [US4] Check for any remaining files in examples/: `ls examples/`
- [ ] T102 [US4] If examples/ is empty, remove it: `git rm -r examples/` (or keep .gitignore if desired)
- [ ] T103 [US4] Commit cleanup:
  ```bash
  git commit -m "[WOODPECKER-4041] Clean up examples directory after migration

  Remove empty component example directories as stories are now colocated.

  Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
  ```
- [ ] T104 [US4] Push cleanup commit: `git push origin WOODPECKER-4041`

### Execute Cleanup (Option B - Keep for Reference)

- [ ] T105 [US4] Create examples/README.md explaining examples/ no longer contains stories
- [ ] T106 [US4] Commit documentation:
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

- [ ] T107 Update CONTRIBUTING.md (if it mentions examples/ directory for stories)
- [ ] T108 Update any documentation referencing story locations
- [ ] T109 Add entry to CHANGELOG.md documenting the migration
- [ ] T110 Update specs/001-colocate-stories/tasks.md with completion notes

### Knowledge Sharing

- [ ] T111 Prepare migration summary for team (bullet points of changes)
- [ ] T112 Update internal wiki/confluence (if applicable) with new story locations
- [ ] T113 Post announcement in #backpack Slack channel (if applicable)

### Post-Migration Monitoring

- [ ] T114 Monitor for any reports of broken stories in next 24-48 hours
- [ ] T115 Monitor CI builds on other branches to ensure no conflicts
- [ ] T116 Document any issues found and their resolutions

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
| Phase 1: Setup | None | Phase 2 | Pending |
| Phase 2: Scripts | Phase 1 | Phase 3 | Pending |
| Phase 3: Pilot | Phase 2 | Phase 4 | Pending |
| Phase 4: Batch | Phase 3 success | Phase 5 | Pending |
| Phase 5: Commit | Phase 4 success | Phase 6 | Pending |
| Phase 6: CI | Phase 5 | Phase 7 | Pending |
| Phase 7: Cleanup | Phase 6 | Phase 8 | Pending |
| Phase 8: Docs | Phase 7 | None | Pending |

### Parallel Opportunities

**Phase 1 (Setup)**: Tasks T004, T005, T006, T007 can run in parallel

**Phase 2 (Scripts)**: Tasks T014-T018 (import updater) and T019-T025 (verification) can be developed in parallel with file mover (T008-T013)

**Phase 4 (Spot Checks)**: Tasks T065, T066, T067 can run in parallel

**Phase 6 (Monitoring)**: CI checks T087-T090 run in parallel automatically

**Phase 8 (Documentation)**: Tasks T107-T113 can run in parallel

---

## Rollback Strategy

If migration fails at any point:

### During Development (Before T084 Commit)

- [ ] Rollback: Run `./scripts/migrate-stories/rollback.sh`
- [ ] Rollback: Reset changes: `git reset --hard HEAD`
- [ ] Rollback: Review failure logs and adjust migration scripts
- [ ] Rollback: Re-run from Phase 3 (Pilot) after fixes

### After Commit (T084+) But Before Push (T085)

- [ ] Rollback: Undo commit: `git reset --hard HEAD~1`
- [ ] Rollback: Review issues and determine if re-attempt or major redesign needed

### After Push (T085+) With CI Failures

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
| Phase 1: Setup | 7 | 0 | 4 |
| Phase 2: Scripts | 22 | 0 | 8 |
| Phase 3: Pilot | 18 | 0 | 0 |
| Phase 4: Batch | 33 | 0 | 3 |
| Phase 5: Commit | 11 | 0 | 0 |
| Phase 6: CI | 13 | 0 | 4 |
| Phase 7: Cleanup | 9 | 0 | 0 |
| Phase 8: Documentation | 10 | 0 | 7 |
| **Total** | **123** | **0** | **26** |

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
