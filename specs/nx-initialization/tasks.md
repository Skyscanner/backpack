<!--
==============================================================================
DOCUMENT PURPOSE: Break down plan.md into executable STEPS (Task List)
==============================================================================

This task list provides specific, actionable steps for implementing Nx
initialization in the Backpack monorepo. This is an infrastructure/tooling
feature, not a UI component.

FOCUS: STEPS (What to do, in what order)
- Specific actions with file paths
- Commands to run
- Verification steps
- Execution order
==============================================================================
-->

# Tasks: Nx Initialization for Backpack Web

**Input**: Design documents from `/specs/nx-initialization/`
**Prerequisites**: plan.md (required), spec.md (required), research.md

**Context**: Infrastructure/tooling change to initialize Nx workspace for future Backpack-Banana merge.

**PR Strategy**: All changes in a single PR (8 files total, tightly coupled).

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Maps to user story from spec.md (US1-US4)

## User Story Mapping

From spec.md:
- **US1 (P1)**: View Project Dependencies (`nx graph`)
- **US2 (P2)**: Run Affected Commands (`nx affected`)
- **US3 (P2)**: Synchronized TypeScript Project References (`nx sync`)
- **US4 (P3)**: Simplified CI Dependency Installation (npm workspaces)

---

## Phase 1: Setup (TypeScript Configuration)

**Purpose**: Prepare TypeScript configuration for project references (Banana-compatible)

- [x] T001 Create `tsconfig.base.json` at repository root with shared compiler options (see plan.md Phase 3.1)
  - Include `composite: true` and `declaration: true` for Banana compatibility
  - Use `moduleResolution: bundler` to match Banana

- [x] T002 Modify `tsconfig.json` to extend `tsconfig.base.json`
  - Add `"extends": "./tsconfig.base.json"`
  - Keep `"noEmit": true` in compilerOptions
  - Add empty `"references": []` array (will be populated by `nx sync`)

**Verification**:
```bash
npm run typecheck  # Should pass without errors
```

**Checkpoint**: ✅ TypeScript configuration ready for Nx

---

## Phase 2: Foundational (Nx + npm Workspaces)

**Purpose**: Core Nx and npm workspaces configuration that enables all user stories

**⚠️ CRITICAL**: All tasks in this phase MUST be done together - they are interdependent

- [x] T003 [US1,US2,US3] Add Nx dependencies to `package.json` devDependencies
  - Add `"nx": "22.4.0-beta.4"`
  - Add `"@nx/js": "22.4.0-beta.4"`

- [x] T004 [US4] Add `workspaces` field to `package.json`
  - Add `"workspaces": ["packages"]`

- [x] T005 [US4] Remove `postinstall` script from `package.json`
  - Delete line: `"postinstall": "(cd packages && npm install)"`

- [x] T006 [US4] Delete `packages/package-lock.json`
  ```bash
  rm packages/package-lock.json
  ```

- [x] T007 [US1,US2,US3] Create `nx.json` at repository root (see plan.md Phase 2.1)
  - Configure `@nx/js/typescript` plugin
  - Define `namedInputs` for production vs test files
  - Use Nx schema for validation

**Verification**:
```bash
rm -rf node_modules packages/node_modules
npm ci
npx nx --version  # Should show 22.4.0-beta.4
```

**Checkpoint**: ✅ Nx and npm workspaces configured

---

## Phase 3: User Story 1 - View Project Dependencies (Priority: P1) 🎯 MVP

**Goal**: Enable `nx graph` to visualize dependency relationships

**Independent Test**: Run `nx graph` and verify visualization displays

- [x] T008 [US1] Verify `nx graph` command works
  ```bash
  npx nx graph
  ```
  - Should open browser with dependency visualization
  - Should show all 96+ packages in packages/ directory

- [x] T009 [US1] Test dependency graph displays package relationships
  - Click on a package in the graph
  - Verify dependencies and dependents are shown
  - Take screenshot for documentation

**Checkpoint**: ✅ US1 complete - developers can visualize dependencies

---

## Phase 4: User Story 3 - TypeScript Project References (Priority: P2)

**Goal**: Enable `nx sync` to manage TypeScript project references

**Independent Test**: Run `nx sync` and verify tsconfig references are updated

- [x] T010 [US3] Run `nx sync` to generate project references
  ```bash
  npx nx sync
  ```
  - Should update `tsconfig.json` `references` array
  - Should not produce errors

- [x] T011 [US3] Verify TypeScript project references work
  ```bash
  npm run typecheck
  ```
  - TypeScript compilation should pass
  - IDE "Go to Definition" should work across packages

**Checkpoint**: ✅ US3 complete - TypeScript references automatically managed

---

## Phase 5: User Story 4 - Simplified CI (Priority: P3)

**Goal**: Remove custom node_modules caching, use npm workspaces in CI

### CI Workflow: main.yml

- [x] T012 [P] [US4] Remove node_modules cache upload in `.github/workflows/main.yml`
  - Delete lines 35-41 (`actions/cache` for node_modules)

- [x] T013 [P] [US4] Remove node_modules cache restore in Create-Build-Cache job (main.yml)
  - Delete lines 61-67 (`actions/cache/restore` for node_modules)

- [x] T014 [P] [US4] Remove node_modules cache restore in StorybookDeploy job (main.yml)
  - Delete lines 106-112 (`actions/cache/restore` for node_modules)

- [x] T015 [P] [US4] Remove node_modules cache restore in SassDocDeploy job (main.yml)
  - Delete lines 145-151 (`actions/cache/restore` for node_modules)

- [x] T016 [US2] Add `nrwl/nx-set-shas@v4` to main.yml after `actions/setup-node`
  ```yaml
  - name: Set SHAs for Nx affected commands
    uses: nrwl/nx-set-shas@v4
  ```

### CI Workflow: pr.yml

- [x] T017 [P] [US4] Remove node_modules cache upload in `.github/workflows/pr.yml`
  - Delete lines 35-41 (`actions/cache` for node_modules)

- [x] T018 [P] [US4] Remove node_modules cache restore in Create-Build-Cache job (pr.yml)
  - Delete lines 61-67 (`actions/cache/restore` for node_modules)

- [x] T019 [P] [US4] Remove node_modules cache restore in StorybookDeploy job (pr.yml)
  - Delete lines 107-113 (`actions/cache/restore` for node_modules)

- [x] T020 [US2] Add `nrwl/nx-set-shas@v4` to pr.yml after `actions/setup-node`

### CI Workflow: _build.yml

- [x] T021 [P] [US4] Remove node_modules cache restore in Build job (`.github/workflows/_build.yml`)
  - Delete lines 36-42 (`actions/cache/restore` for node_modules)

- [x] T022 [P] [US4] Remove node_modules cache restore in Danger job (_build.yml)
  - Delete lines 87-93 (`actions/cache/restore` for node_modules)

- [x] T023 [P] [US4] Remove node_modules cache restore in PercyTests job (_build.yml)
  - Delete lines 136-142 (`actions/cache/restore` for node_modules)

**⚠️ KEEP**: All `dist-storybook` caching - these are build artifacts, not dependencies

**Checkpoint**: ✅ US4 complete - CI simplified with npm workspaces

---

## Phase 6: User Story 2 - Affected Commands (Priority: P2)

**Goal**: Enable `nx affected` commands for efficient CI builds

**Independent Test**: Make a change and verify `nx affected` targets only related packages

**Note**: This story is enabled by T016 and T020 (nx-set-shas), but full validation requires CI run

- [x] T024 [US2] Test affected commands locally
  ```bash
  # Make a small change to one package
  npx nx affected:graph
  ```
  - Should show only affected packages, not entire graph

- [x] T025 [US2] Document affected commands usage in PR description
  - `nx affected -t build` - build only affected packages
  - `nx affected -t test` - test only affected packages
  - `nx affected:graph` - visualize affected packages

**Checkpoint**: ✅ US2 complete - affected commands available

---

## Phase 7: Verification & Polish

**Purpose**: Final verification before PR submission

### Local Verification

- [x] T026 Verify all existing npm scripts work
  ```bash
  npm run build
  npm run test
  npm run lint
  npm run typecheck
  ```

- [ ] T027 Verify transpile workflow (publishing)
  ```bash
  npm run transpile
  ```

- [x] T028 Verify Storybook works
  ```bash
  npm run storybook
  ```

### Success Criteria Validation

- [x] T029 Validate all success criteria from spec.md
  | Criterion | Command |
  |-----------|---------|
  | SC-001: nx.json exists | `test -f nx.json` |
  | SC-002: Nx installed | `npx nx --version` |
  | SC-003: nx graph works | `npx nx graph` |
  | SC-004: nx sync works | `npx nx sync` |
  | SC-005: tsconfig.base.json exists | `test -f tsconfig.base.json` |
  | SC-006: npm scripts work | `npm run build && npm run test` |
  | SC-010: workspaces configured | `npm pkg get workspaces` |

### Cleanup

- [x] T030 Remove any debug or temporary files

- [x] T031 Verify no unintended files are staged
  ```bash
  git status
  ```

**Checkpoint**: ✅ Ready for PR submission

---

## Phase 8: PR Submission

**Purpose**: Create PR for review

- [x] T032 Create PR with all changes
  - Title: `[WOODPECKER-4039] Initialize Nx workspace for Backpack`
  - Description: Include summary of changes, verification steps, rollback plan

- [ ] T033 Verify CI passes
  - All GitHub Actions jobs should be green
  - SC-007: CI workflow completes successfully
  - SC-008: No node_modules caching in CI
  - SC-009: nx-set-shas configured

- [ ] T034 Address any review feedback

- [ ] T035 Merge PR

**Checkpoint**: Nx initialization complete! 🎉

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (TypeScript)
      ↓
Phase 2 (Nx + Workspaces) ← CRITICAL GATE
      ↓
   ┌──┴──┬──────┬──────┐
   ↓     ↓      ↓      ↓
 US1   US3    US4    US2
(P1)   (P2)   (P3)   (P2)
   ↓     ↓      ↓      ↓
   └──┬──┴──────┴──────┘
      ↓
Phase 7 (Verification)
      ↓
Phase 8 (PR)
```

### Parallel Opportunities

**Within Phase 5 (CI Workflows)**:
- T012, T013, T014, T015 can run in parallel (main.yml changes)
- T017, T018, T019 can run in parallel (pr.yml changes)
- T021, T022, T023 can run in parallel (_build.yml changes)

**After Phase 2**:
- US1 (T008-T009), US3 (T010-T011), and US4 (T012-T023) can proceed in parallel
- US2 (T024-T025) depends on T016/T020 being complete

---

## Task Summary

| Phase | Tasks | Files Changed |
|-------|-------|---------------|
| Phase 1: TypeScript | T001-T002 | `tsconfig.base.json`, `tsconfig.json` |
| Phase 2: Nx + Workspaces | T003-T007 | `package.json`, `nx.json`, delete `packages/package-lock.json` |
| Phase 3: US1 Graph | T008-T009 | (verification only) |
| Phase 4: US3 Sync | T010-T011 | (verification only) |
| Phase 5: US4 CI | T012-T023 | `main.yml`, `pr.yml`, `_build.yml` |
| Phase 6: US2 Affected | T024-T025 | (verification only) |
| Phase 7: Verification | T026-T031 | (verification only) |
| Phase 8: PR | T032-T035 | (git operations) |

**Total**: 35 tasks
**Files changed**: 8 files (as planned)

---

## Rollback Plan

If issues occur after merge:

1. `git revert <commit-sha>`
2. Restore `packages/package-lock.json` from git history
3. Remove `nx.json` and `tsconfig.base.json`
4. Restore `postinstall` script in `package.json`
5. Remove `workspaces` field from `package.json`
6. Run `npm ci` to restore dual install behavior

---

## References

- [Spec: Nx Initialization](./spec.md)
- [Plan: Implementation Details](./plan.md)
- [Research: CI and TypeScript Analysis](./research.md)
- [Banana Repository](https://github.com/Skyscanner/banana) (merge target)
- [Phase 1 Initialization Guide](https://skyscanner.atlassian.net/wiki/spaces/WEAV/pages/1365838884)
