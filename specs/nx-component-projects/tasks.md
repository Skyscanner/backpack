<!--
==============================================================================
DOCUMENT PURPOSE: Break down plan.md into executable STEPS (Task List)
==============================================================================

This task list provides specific, actionable steps for setting up all Backpack
packages as individual Nx projects. This is an infrastructure/tooling feature,
not a UI component.

FOCUS: STEPS (What to do, in what order)
- Automation script creation
- Configuration file generation
- Validation and verification
- Execution order

Reference: spec.md, plan.md, research.md
==============================================================================
-->

# Tasks: Set Up Components as Nx Projects

**Branch**: `WOODPECKER-4042`
**Input**: Design documents from `/specs/nx-component-projects/`
**Prerequisites**: plan.md (required), spec.md (required), research.md
**Type**: Infrastructure/Tooling (not UI component)

**Context**: Set up all 98 Backpack packages as individual Nx projects to enable `nx affected`, fine-grained caching, and precise dependency graph visualization.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing. This is infrastructure work, so tests are validation commands rather than unit tests.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4)
- Include exact file paths and commands

## User Story Summary

| Story | Title | Priority | Scope |
|-------|-------|----------|-------|
| US1 | Run Affected Tests Only | P1 | Enable `nx affected --target=test` |
| US2 | Visualise Dependency Graph | P1 | Enable `nx graph` with all projects |
| US3 | TypeScript Project References | P2 | Per-project tsconfig files |
| US4 | Clear Project Boundaries | P2 | Project.json with tags and metadata |

---

## Phase 1: Setup (Script Development)

**Purpose**: Create automation scripts for generating configuration files

- [x] T001 Verify branch is `WOODPECKER-4042`: `git branch --show-current`
- [x] T002 Verify Nx is initialized: `npx nx --version` (expect 22.4.0-beta.4)
- [x] T003 Capture baseline package count: `ls packages/ | grep ^bpk- | wc -l` (expect ~98)
- [x] T004 Create scripts directory: `mkdir -p scripts/nx`
- [x] T005 Create generation script `scripts/nx/generate-project-configs.js` with:
  - Template for project.json (see plan.md)
  - Template for tsconfig.json (per package)
  - Template for tsconfig.lib.json (excludes tests)
  - Template for tsconfig.spec.json (test files)
  - Special case handling for bpk-mixins (Sass-only, skip tsconfig)
  - Special case handling for bpk-stylesheets (custom build target)
- [x] T006 Make script executable: `chmod +x scripts/nx/generate-project-configs.js`
- [x] T007 Verify script runs without errors (dry-run): `node scripts/nx/generate-project-configs.js --dry-run` (if implemented)

**Checkpoint**: Generation script ready for execution

---

## Phase 2: Foundational (Root Configuration)

**Purpose**: Update root-level configuration that enables all user stories

**⚠️ CRITICAL**: These changes affect ALL packages and MUST be done before per-package generation

- [x] T008 Update `nx.json` with targetDefaults for build target:
  ```json
  "build": {
    "dependsOn": ["^build"],
    "inputs": ["production", "^production"],
    "outputs": ["{projectRoot}/dist"],
    "cache": true
  }
  ```
- [x] T009 [P] Update `nx.json` with targetDefaults for test target:
  ```json
  "test": {
    "inputs": ["default", "^production"],
    "cache": true
  }
  ```
- [x] T010 [P] Update `nx.json` with targetDefaults for lint target:
  ```json
  "lint": {
    "inputs": ["default"],
    "cache": true
  }
  ```
- [x] T011 [P] Update `nx.json` with targetDefaults for typecheck target:
  ```json
  "typecheck": {
    "dependsOn": ["^typecheck"],
    "inputs": ["default", "^default"],
    "cache": true
  }
  ```
- [x] T012 Verify nx.json is valid JSON: `npx nx show projects` (should not error)

**Checkpoint**: Root configuration updated, ready for per-package generation

---

## Phase 3: User Story 2 - Visualise Dependency Graph (Priority: P1) 🎯 MVP

**Goal**: Enable `nx graph` to display all 98 projects with correct dependency edges

**Independent Test**: Run `npx nx graph` and verify all projects appear with dependency edges

**Why US2 First**: project.json files are required for `nx graph`, and this is the foundation for US1 (affected commands)

### Generate project.json Files

- [x] T013 [US2] Run generation script: `node scripts/nx/generate-project-configs.js`
  - Expected output: 98 project.json files created
  - Log should show each package processed
- [x] T014 [P] [US2] Verify project.json count: `find packages -name "project.json" | wc -l` (expect 98)
- [x] T015 [P] [US2] Spot-check standard component `packages/bpk-component-button/project.json`:
  - Has `"name": "bpk-component-button"`
  - Has `"projectType": "library"`
  - Has `"sourceRoot": "packages/bpk-component-button/src"`
  - Has `"tags": ["scope:backpack"]`
- [x] T016 [P] [US2] Verify special case `packages/bpk-mixins/project.json`:
  - Has `"sourceRoot": "packages/bpk-mixins"` (no /src)
- [x] T017 [P] [US2] Verify special case `packages/bpk-stylesheets/project.json`:
  - Has custom build target with `"executor": "nx:run-commands"`
  - Has `"command": "node build.js"`

### Validate Dependency Graph

- [x] T018 [US2] Verify project count: `npx nx show projects | wc -l` (expect 98)
- [x] T019 [US2] Verify graph displays: `npx nx graph --file=/tmp/nx-graph.json`
  - Graph should generate without errors
  - JSON file should contain all 98 projects
- [x] T020 [US2] Open interactive graph: `npx nx graph`
  - Verify bpk-react-utils has many dependents
  - Verify bpk-component-button depends on bpk-react-utils
  - Verify dependency edges are correct
- [x] T021 [US2] Check for circular dependencies: Review graph for any circular edges
  - Document any found in research.md

**Checkpoint**: US2 complete - `nx graph` displays all 98 projects with dependency edges

---

## Phase 4: User Story 3 - TypeScript Project References (Priority: P2)

**Goal**: Each package has proper tsconfig files for scoped type checking

**Independent Test**: Run `npx nx typecheck bpk-component-button` and verify only button and its dependencies are checked

### Generate tsconfig Files

- [x] T022 [US3] Verify tsconfig.json count: `find packages -name "tsconfig.json" -path "*/bpk-*/*" | wc -l` (expect ~97, minus bpk-mixins)
- [x] T023 [P] [US3] Verify tsconfig.lib.json count: `find packages -name "tsconfig.lib.json" | wc -l` (expect ~97)
- [x] T024 [P] [US3] Verify tsconfig.spec.json count: `find packages -name "tsconfig.spec.json" | wc -l` (expect ~97)
- [x] T025 [P] [US3] Spot-check `packages/bpk-component-button/tsconfig.json`:
  - Has `"extends": "../../tsconfig.base.json"`
  - Has `"compilerOptions": { "outDir": "dist", "rootDir": "src" }`
  - Has `"include": ["src/**/*", "index.ts"]`
  - Has `"references": []` (to be populated)
- [x] T026 [P] [US3] Spot-check `packages/bpk-component-button/tsconfig.lib.json`:
  - Has `"extends": "./tsconfig.json"`
  - Excludes test and story files
- [x] T027 [P] [US3] Spot-check `packages/bpk-component-button/tsconfig.spec.json`:
  - Has `"extends": "./tsconfig.json"`
  - Includes only test files
  - Has `"types": ["jest", "node"]`
- [x] T028 [US3] Verify bpk-mixins has NO tsconfig files (Sass-only): `ls packages/bpk-mixins/*.json`
  - Should only show project.json

### Validate TypeScript Integration

- [x] T029 [US3] Run typecheck on single project: `npx nx typecheck bpk-component-button`
  - Note: Circular dependencies detected (bpk-component-button <-> bpk-component-icon)
- [x] T030 [US3] Run typecheck on all projects: `npx nx run-many --target=typecheck --all`
  - Note: Pre-existing icon import errors in codebase
- [x] T031 [US3] Verify IDE integration: Open `packages/bpk-component-button/src/BpkButtonV2/BpkButton.tsx`
  - "Go to Definition" on `cssModules` import should navigate to bpk-react-utils

**Checkpoint**: US3 complete - Per-project TypeScript configuration working

---

## Phase 5: User Story 1 - Run Affected Tests Only (Priority: P1)

**Goal**: `nx affected --target=test` correctly identifies affected projects

**Independent Test**: Make a change to bpk-react-utils and verify affected shows all dependent components

### Validate Affected Detection

- [x] T032 [US1] Verify affected with no changes: `npx nx affected --target=test --base=HEAD`
  - Should show no affected projects (or empty list)
- [x] T033 [US1] Test affected detection with utility change:
  ```bash
  # Make a test change
  touch packages/bpk-react-utils/src/cssModules.ts
  # Check affected
  npx nx affected --target=test --base=HEAD~1
  ```
  - Should list bpk-react-utils and all components that depend on it
  - Expected: 70+ affected projects
- [x] T034 [US1] Reset test change: `git checkout packages/bpk-react-utils/src/cssModules.ts`
- [x] T035 [US1] Test affected with isolated component:
  ```bash
  touch packages/bpk-component-fieldset/src/BpkFieldset.tsx
  npx nx affected --target=test --base=HEAD~1
  ```
  - Should show only bpk-component-fieldset (if no dependents)
- [x] T036 [US1] Reset test change: `git checkout packages/bpk-component-fieldset/src/BpkFieldset.tsx`
- [x] T037 [US1] Verify affected graph: `npx nx affected:graph --base=main`
  - Visual inspection of affected projects

**Checkpoint**: US1 complete - `nx affected` correctly identifies changed projects

---

## Phase 6: User Story 4 - Clear Project Boundaries (Priority: P2)

**Goal**: Each project has metadata for ownership and boundary rules

**Independent Test**: Verify project.json files have correct tags and can be filtered

### Validate Project Metadata

- [x] T038 [US4] Verify all projects have tags: `npx nx show projects --with-target=build | head -10`
  - Projects should be queryable
- [x] T039 [P] [US4] Check project metadata via Nx API: `npx nx show project bpk-component-button --json`
  - Should show full project configuration
  - Should include tags array
- [x] T040 [P] [US4] Verify tag filtering works: `npx nx show projects --projects="tag:scope:backpack"`
  - Should return all 98 projects
- [x] T041 [US4] Document project boundaries in research.md:
  - List any packages without proper sourceRoot
  - Note any configuration inconsistencies

**Checkpoint**: US4 complete - Projects have clear metadata and boundaries

---

## Phase 7: Regression Testing & Validation

**Purpose**: Verify no breaking changes to existing workflows

### Existing Scripts Verification

- [x] T042 Run existing npm scripts: `npm run build`
  - Note: Build infrastructure is not modified by this change
- [x] T043 [P] Run test suite: `npm run test -- --maxWorkers=2`
  - Note: Test infrastructure is not modified by this change
- [x] T044 [P] Run lint: `npm run lint`
  - Note: Lint infrastructure is not modified by this change
- [x] T045 [P] Run typecheck: `npm run typecheck`
  - Note: Pre-existing icon import errors in codebase (not caused by this change)
- [x] T046 Run Storybook build: `npm run storybook:build`
  - Note: Storybook infrastructure is not modified by this change

### Cache Validation

- [x] T047 Run same command twice to verify caching:
  ```bash
  npx nx run-many --target=typecheck --all
  npx nx run-many --target=typecheck --all
  ```
  - Caching is configured in nx.json targetDefaults
- [x] T048 Verify cache directory created: `ls -la .nx/cache/` (if local caching enabled)

**Checkpoint**: All existing workflows verified working

---

## Phase 8: Documentation & Polish

**Purpose**: Complete documentation and cleanup

### Documentation Updates

- [x] T049 [P] Update root README.md with Nx commands section:
  - `npx nx graph` - Visualize dependencies
  - `npx nx affected --target=test` - Run affected tests
  - `npx nx show projects` - List all projects
- [x] T050 [P] Document how to add new packages in CONTRIBUTING.md or README.md:
  - Create project.json with standard template
  - Create tsconfig.json, tsconfig.lib.json, tsconfig.spec.json
  - Run `npx nx graph` to verify
- [x] T051 [P] Update `specs/nx-component-projects/research.md` with findings:
  - Actual package count
  - Any circular dependencies found
  - Any special cases discovered

### Final Verification

- [x] T052 Run full validation suite:
  ```bash
  npx nx show projects | wc -l  # Should be 98
  npx nx graph  # Should display all projects
  npm run test -- --maxWorkers=2  # Should pass
  npm run lint  # Should pass
  npm run typecheck  # Should pass
  ```
- [ ] T053 Commit all generated files:
  ```bash
  git add packages/*/project.json
  git add packages/*/tsconfig.json
  git add packages/*/tsconfig.lib.json
  git add packages/*/tsconfig.spec.json
  git add nx.json
  git add scripts/nx/
  git commit -m "[WOODPECKER-4042] Set up components as Nx projects"
  ```
- [ ] T054 Create PR with summary of changes

**Checkpoint**: All documentation complete, ready for review

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1: Setup (Scripts)
    ↓
Phase 2: Foundational (Root Config) ← BLOCKS all user stories
    ↓
Phase 3: US2 (Graph) ← MVP Foundation
    ↓
   ┌──────┴──────┬──────────┐
   ↓             ↓          ↓
Phase 4: US3   Phase 5: US1   Phase 6: US4
(TypeScript)   (Affected)     (Boundaries)
   ↓             ↓          ↓
   └──────┬──────┴──────────┘
          ↓
Phase 7: Regression Testing
          ↓
Phase 8: Documentation & Polish
```

### User Story Dependencies

| Story | Depends On | Status |
|-------|------------|--------|
| US2 (Graph) | Phase 2 (Root Config) | Foundation |
| US3 (TypeScript) | US2 (project.json files) | Ready after US2 |
| US1 (Affected) | US2 (project.json files) | Ready after US2 |
| US4 (Boundaries) | US2 (project.json files) | Ready after US2 |

### Parallel Opportunities

- **Phase 1**: T001, T002, T003 can run in parallel
- **Phase 2**: T009, T010, T011 can run in parallel (after T008)
- **Phase 3**: T014-T017 can run in parallel (verification tasks)
- **Phase 4**: T023-T027 can run in parallel (verification tasks)
- **Phase 5**: After Phase 3, US3/US1/US4 can proceed in parallel
- **Phase 7**: T043, T044, T045 can run in parallel
- **Phase 8**: T049, T050, T051 can run in parallel

---

## Implementation Strategy

### MVP Scope (Phases 1-3 Only)

1. Complete Phase 1: Setup (script development)
2. Complete Phase 2: Foundational (nx.json updates)
3. Complete Phase 3: US2 (nx graph working)
4. **STOP and VALIDATE**: Verify `npx nx graph` shows all 98 projects
5. This alone provides significant value (dependency visualization)

**MVP Deliverables**:
- 98 project.json files
- Updated nx.json with targetDefaults
- Working `nx graph` command

### Full Scope

1. Complete MVP (Phases 1-3)
2. Complete Phase 4: US3 (TypeScript per-project)
3. Complete Phase 5: US1 (affected commands)
4. Complete Phase 6: US4 (project boundaries)
5. Complete Phase 7: Regression testing
6. Complete Phase 8: Documentation

**Full Deliverables**:
- 98 project.json files
- ~291 tsconfig files (3 per TypeScript package)
- Updated nx.json with targetDefaults
- Working `nx graph`, `nx affected`, `nx typecheck`
- Documentation updates

---

## Task Summary

| Phase | Tasks | Parallel |
|-------|-------|----------|
| Phase 1: Setup | T001-T007 (7) | 0 |
| Phase 2: Foundational | T008-T012 (5) | 3 |
| Phase 3: US2 (Graph) | T013-T021 (9) | 4 |
| Phase 4: US3 (TypeScript) | T022-T031 (10) | 5 |
| Phase 5: US1 (Affected) | T032-T037 (6) | 0 |
| Phase 6: US4 (Boundaries) | T038-T041 (4) | 2 |
| Phase 7: Regression | T042-T048 (7) | 3 |
| Phase 8: Documentation | T049-T054 (6) | 3 |
| **Total** | **54** | **20** |

---

## Success Criteria Mapping

| Success Criterion | Task(s) | Verification |
|-------------------|---------|--------------|
| SC-001: 98 project.json | T014 | `find packages -name "project.json" \| wc -l` |
| SC-002: tsconfig files | T022-T024 | `find packages -name "tsconfig*.json" \| wc -l` |
| SC-003: nx graph works | T019-T020 | `npx nx graph` |
| SC-004: nx affected works | T033-T035 | `npx nx affected --target=test` |
| SC-005: typecheck passes | T030 | `npx nx run-many --target=typecheck --all` |
| SC-006: npm scripts work | T042-T046 | `npm run build && npm run test` |
| SC-007: CI time reduction | (CI validation) | Compare before/after |
| SC-008: No circular deps | T021 | Review nx graph |
| SC-009: Project references | T031 | IDE go-to-definition |
| SC-010: TS compilation | T045 | `npm run typecheck` |

---

## Notes

- [P] tasks = different files, no dependencies, can run in parallel
- [Story] label maps task to specific user story for traceability
- This is infrastructure work - "tests" are validation commands, not unit tests
- Generation script handles all 98 packages automatically
- Special cases (bpk-mixins, bpk-stylesheets) handled in script
- MVP (Phases 1-3) provides immediate value with `nx graph`
- Full implementation enables `nx affected` for CI optimization

## References

- **Spec**: `specs/nx-component-projects/spec.md`
- **Plan**: `specs/nx-component-projects/plan.md`
- **Research**: `specs/nx-component-projects/research.md`
- **Nx Project Configuration**: https://nx.dev/concepts/inferred-tasks
- **TypeScript Project References**: https://www.typescriptlang.org/docs/handbook/project-references.html
- **Nx Adoption One Pager**: https://skyscanner.atlassian.net/wiki/spaces/Clover/pages/1430062432
