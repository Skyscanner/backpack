<!--
==============================================================================
DOCUMENT PURPOSE: Break down plan.md into executable STEPS (Task List)
==============================================================================

This task list provides specific, actionable steps for executing the
project structure confirmation milestone. This is an infrastructure task,
not a UI component.

FOCUS: STEPS (What to do, in what order)
- Documentation tasks
- Verification tasks
- Configuration validation
==============================================================================
-->

# Tasks: Project Structure Reorganization for Nx Migration

**Input**: Design documents from `/specs/nx-project-structure/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, structure-mapping.md
**Type**: Infrastructure/Tooling (not UI component)

**Context**: This milestone focuses on documentation and validation, NOT file moves.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4)

## User Story Summary

| Story | Title | Priority | Scope |
|-------|-------|----------|-------|
| US1 | Document Structure Mapping | P1 | Create comprehensive mapping document |
| US2 | Execute Folder Reorganization | P2 | **DEFERRED** - No file moves in this milestone |
| US3 | Update Build and Test Config | P2 | Verify/update configs for Nx compatibility |
| US4 | Preserve Import Compatibility | P1 | Verify consumer imports unchanged |

---

## Phase 1: Setup (Preparation)

**Purpose**: Ensure prerequisites are in place before starting work

- [ ] T001 Verify Nx initialization (WOODPECKER-4039) is complete by running `npx nx --version`
- [ ] T002 [P] Verify branch is `WOODPECKER-4040` with `git branch --show-current`
- [ ] T003 [P] Run `npm ci` to ensure dependencies are up to date
- [ ] T004 [P] Verify `nx graph` command works: `npx nx graph --file=/tmp/graph.json`

**Checkpoint**: Prerequisites verified - can proceed with documentation tasks

---

## Phase 2: User Story 1 - Document Structure Mapping (Priority: P1) 🎯 MVP

**Goal**: Create comprehensive structure mapping document covering all 91 packages with Banana target locations

**Independent Test**: Review mapping document and verify every package has designated current and future locations

### Documentation Tasks

- [x] T005 [US1] Create `specs/nx-project-structure/structure-mapping.md` with document header and version
- [x] T006 [US1] Document current structure decision (flat under `packages/`)
- [x] T007 [US1] Document future Banana target location (`libs/shared/universal/backpack/`)
- [x] T008 [P] [US1] Enumerate all 84 component packages in mapping table
- [x] T009 [P] [US1] Enumerate 2 utility packages (bpk-react-utils, bpk-scrim-utils)
- [x] T010 [P] [US1] Enumerate 2 foundation packages (bpk-mixins, bpk-stylesheets)
- [x] T011 [P] [US1] Enumerate theming, animation, and internal packages
- [x] T012 [US1] Document Nx compatibility status (current and Banana requirements)
- [x] T013 [US1] Document Banana integration plan (pre-merge, during merge, post-merge)
- [x] T014 [US1] Add deferred items table with milestone references

### Verification Tasks

- [ ] T015 [US1] Verify structure-mapping.md covers all 91 packages: `ls packages/ | wc -l`
- [ ] T016 [US1] Verify package count matches inventory: compare document count vs filesystem
- [ ] T017 [US1] Review document against Production Standards requirements

**Checkpoint**: Structure mapping document complete and verified

---

## Phase 3: User Story 3 - Update Build and Test Config (Priority: P2)

**Goal**: Verify and update configurations for Nx compatibility

**Independent Test**: Run full CI suite and verify all jobs pass

### Verification Tasks

- [ ] T018 [US3] Verify `nx.json` configuration is correct: `cat nx.json | head -50`
- [ ] T019 [P] [US3] Verify `tsconfig.json` includes all package paths
- [ ] T020 [P] [US3] Verify Jest config discovers tests: `npm run test -- --listTests | head -20`
- [ ] T021 [P] [US3] Verify Storybook config discovers stories: `cat .storybook/main.ts`

### Build Validation Tasks

- [ ] T022 [US3] Run TypeScript check: `npm run typecheck`
- [ ] T023 [P] [US3] Run lint check: `npm run lint`
- [ ] T024 [P] [US3] Run test suite (sample): `npm run test -- --maxWorkers=2 --testPathPattern="bpk-component-button"`
- [ ] T025 [US3] Verify Storybook builds: `npm run storybook:build` (optional, CI will verify)

**Checkpoint**: Build and test configurations verified working

---

## Phase 4: User Story 4 - Preserve Import Compatibility (Priority: P1)

**Goal**: Verify consumer import paths remain unchanged

**Independent Test**: Create test import file and verify resolution

### Verification Tasks

- [ ] T026 [US4] Document current consumer import pattern in structure-mapping.md
- [ ] T027 [US4] Verify `@skyscanner/backpack-web/bpk-component-button` import path resolves
- [ ] T028 [US4] Verify SCSS mixin import paths work: `@use '@skyscanner/backpack-web/bpk-mixins/tokens'`
- [ ] T029 [US4] Verify no changes to `packages/package.json` exports field

### Documentation Tasks

- [ ] T030 [US4] Add "Consumer Import Paths" section to structure-mapping.md showing unchanged patterns

**Checkpoint**: Consumer import compatibility verified

---

## Phase 5: User Story 2 - Folder Reorganization (Priority: P2) ⏸️ DEFERRED

**Status**: DEFERRED to Banana merge milestone

**Goal**: Execute folder reorganization (NOT in scope for this milestone)

**Rationale**: Per clarification session, core deliverables are "Documentation + validation". Actual file moves will occur during Banana merge.

### Deferred Tasks (for future milestone)

- [ ] T031 [US2] **DEFERRED** Move `packages/*` to `libs/shared/universal/backpack/src/`
- [ ] T032 [US2] **DEFERRED** Create `project.json` for Banana
- [ ] T033 [US2] **DEFERRED** Update all relative import paths
- [ ] T034 [US2] **DEFERRED** Update CI workflows with new paths

**Note**: These tasks will be executed when Backpack is merged into Banana repository.

---

## Phase 6: Documentation & Polish

**Purpose**: Finalize documentation and prepare for PR review

- [ ] T035 [P] Update `specs/nx-project-structure/spec.md` with completion status
- [ ] T036 [P] Update `specs/nx-project-structure/plan.md` with execution notes
- [ ] T037 [P] Update `specs/nx-project-structure/research.md` with final findings
- [ ] T038 Review all documentation for consistency and completeness
- [ ] T039 Run final CI validation: `npm run test && npm run lint && npm run typecheck`
- [ ] T040 Create PR with summary of deliverables

**Checkpoint**: All documentation complete, ready for review

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1: Setup
    ↓
Phase 2: US1 (Structure Mapping) ← MVP
    ↓
Phase 3: US3 (Config Verification) ←─┐
    ↓                                │ Can run in parallel
Phase 4: US4 (Import Compatibility) ←┘
    ↓
Phase 5: US2 (DEFERRED)
    ↓
Phase 6: Documentation & Polish
```

### User Story Dependencies

| Story | Depends On | Status |
|-------|------------|--------|
| US1 (Structure Mapping) | Phase 1 Setup | ✅ Complete |
| US3 (Config Verification) | US1 | Ready |
| US4 (Import Compatibility) | US1 | Ready |
| US2 (Folder Reorganization) | N/A | ⏸️ Deferred |

### Parallel Opportunities

- T002, T003, T004 can run in parallel (Setup)
- T008, T009, T010, T011 can run in parallel (Package enumeration)
- T019, T020, T021 can run in parallel (Config verification)
- T022, T023, T024 can run in parallel (Build validation)
- T035, T036, T037 can run in parallel (Documentation)

---

## Implementation Strategy

### MVP Scope (This Milestone)

1. ✅ Complete Phase 1: Setup
2. ✅ Complete Phase 2: US1 (Structure Mapping) - **PRIMARY DELIVERABLE**
3. Complete Phase 3: US3 (Config Verification)
4. Complete Phase 4: US4 (Import Compatibility)
5. Skip Phase 5: US2 (Deferred to Banana merge)
6. Complete Phase 6: Documentation & Polish

### What Gets Delivered

| Deliverable | Status |
|-------------|--------|
| structure-mapping.md v2.0 | ✅ Created |
| research.md with Banana analysis | ✅ Created |
| plan.md with Banana context | ✅ Created |
| Nx graph verification | Pending |
| Config compatibility verification | Pending |
| Import path verification | Pending |

### What Is Deferred

| Item | Deferred To | Reason |
|------|-------------|--------|
| File moves to Banana structure | Banana merge | Per clarification: "Documentation + validation" only |
| project.json per component | Milestone 4 | "Set up Components as Nx Projects" |
| Story colocation | Milestone 3 | "All Storybook Stories Colocated" |
| Module boundaries | Milestone 6 | "Configure Module Boundaries" |

---

## Task Summary

| Phase | Tasks | Completed | Parallel |
|-------|-------|-----------|----------|
| Phase 1: Setup | 4 | 0 | 3 |
| Phase 2: US1 (Mapping) | 10 | 10 | 4 |
| Phase 3: US3 (Config) | 8 | 0 | 5 |
| Phase 4: US4 (Imports) | 5 | 0 | 0 |
| Phase 5: US2 (DEFERRED) | 4 | - | - |
| Phase 6: Polish | 6 | 0 | 3 |
| **Total Active** | **33** | **10** | **15** |

---

## Notes

- [P] tasks = different files, no dependencies, can run in parallel
- [Story] label maps task to specific user story for traceability
- US2 tasks are deferred to Banana merge - NOT executed in this milestone
- Focus is on documentation and verification, NOT file moves
- All verification tasks should be run to ensure Nx compatibility

## References

- **Spec**: `specs/nx-project-structure/spec.md`
- **Plan**: `specs/nx-project-structure/plan.md`
- **Research**: `specs/nx-project-structure/research.md`
- **Structure Mapping**: `specs/nx-project-structure/structure-mapping.md`
- **Nx Adoption One Pager**: https://skyscanner.atlassian.net/wiki/spaces/Clover/pages/1430062432
- **Production Standards**: https://skyscanner.atlassian.net/wiki/spaces/WEAV/pages/1388484149
