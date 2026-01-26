# Phase 0: Preparation

**Purpose**: Establish baseline and create tracking infrastructure before making any changes

**Total Specs**: 3
**Prerequisites**: None
**Risk Level**: Zero (no production changes)

---

## Spec 0.1: Install madge for circular dependency detection

**Description for Spec Kit**:

```
Install madge tool for detecting circular dependencies in the Backpack codebase.

Tasks:
1. Install madge as a dev dependency: pnpm add -D madge
2. Create a script in package.json to run circular dependency detection:
   "scripts": {
     "check-circular-deps": "madge --circular --extensions js,jsx,ts,tsx packages/"
   }
3. Run the script to generate a baseline report of existing circular dependencies
4. Save the output to a file: pnpm check-circular-deps > docs/nx-migration/circular-deps-baseline.txt
5. Commit the changes with message: "chore: Add madge for circular dependency detection"

Acceptance Criteria:
- madge is installed in package.json devDependencies
- check-circular-deps script exists in package.json
- Baseline report file exists at docs/nx-migration/circular-deps-baseline.txt
- Script can be run successfully with: pnpm check-circular-deps
- Changes are committed to git

Context:
Circular dependencies are the #1 blocker in NX migrations based on banana and global-components experience. Identifying them early allows planning migration order to avoid blocked specs.
```

**Status**: ⬜ Not Started

**Notes**:
- This is a completely safe operation - only adds tooling
- The baseline report will guide Phase 3 batch ordering

---

## Spec 0.2: Document baseline metrics

**Description for Spec Kit**:

```
Document current build and test performance metrics to measure NX adoption success.

Tasks:
1. Create a new file: docs/nx-migration/baseline-metrics.md
2. Measure and document the following metrics:
   - Full build time: Time `pnpm build` and record the duration
   - Full test time: Time `pnpm test` and record the duration
   - Linting time: Time `pnpm lint` and record the duration
   - CI pipeline duration: Check recent CI runs and record average time
   - Repository size: Run `du -sh .` and record the size
   - Node modules size: Run `du -sh node_modules` and record the size
   - Number of packages: Count directories in `packages/` directory
3. Document the current tooling:
   - Build tool: [lerna/npm workspaces/other]
   - Test runner: [jest/other]
   - Package manager: [npm/pnpm/yarn]
4. Format the metrics file with sections:
   ## Baseline Metrics (Date: YYYY-MM-DD)
   ### Build Performance
   ### Test Performance
   ### Repository Stats
   ### Current Tooling
5. Commit with message: "docs: Document baseline metrics for NX migration"

Acceptance Criteria:
- baseline-metrics.md file exists with all metrics documented
- All timing measurements are recorded in seconds/minutes
- Current tooling is documented
- File is committed to git

Context:
These baseline metrics will be compared against post-migration metrics in Phase 6 to quantify the benefits of NX adoption (faster builds, better caching, improved CI times).
```

**Status**: ⬜ Not Started

**Notes**:
- Run measurements during off-peak hours for consistency
- Record the git commit SHA when measurements were taken
- This provides the "before" snapshot for success validation

---

## Spec 0.3: Create migration tracking infrastructure

**Description for Spec Kit**:

```
Set up the documentation structure for tracking NX migration progress.

Tasks:
1. The migration docs already exist at docs/nx-migration/ with:
   - README.md (usage guide)
   - tracker.md (progress tracking)
   - learnings.md (corrections and insights)
   - specs/ directory (phase specifications)
2. Review the existing structure and ensure all files are present
3. Initialize tracker.md by:
   - Adding today's date as the start date
   - Setting "Current Phase" to "Phase 0"
   - Ensuring all checkboxes are unchecked
4. Add a note to learnings.md with initial observations:
   ## Pre-Migration Observations
   - Repository structure: [describe current packages/ structure]
   - Existing build system: [lerna/npm workspaces/other]
   - Number of packages to migrate: [count from package.json]
5. Commit with message: "docs: Initialize NX migration tracking infrastructure"

Acceptance Criteria:
- All documentation files exist and are properly initialized
- tracker.md has current date and Phase 0 status
- learnings.md has pre-migration observations section
- Changes are committed to git

Context:
This tracking infrastructure will be used throughout all phases to document progress, corrections, and learnings. It provides a single source of truth for migration status.
```

**Status**: ⬜ Not Started

**Notes**:
- The docs structure is already created, this spec just initializes it
- Review README.md to understand the workflow before starting Phase 1

---

## Phase 0 Complete Checklist

Before moving to Phase 1, ensure:

- [ ] madge is installed and working
- [ ] Circular dependency baseline report exists
- [ ] Baseline metrics are documented
- [ ] Migration tracking infrastructure is initialized
- [ ] All changes are committed to git
- [ ] Team is aware migration is starting

**Next Phase**: [Phase 1: Silent Infrastructure](./phase-1-infrastructure.md)
