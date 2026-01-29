# Complete NX Adoption Guide for Backpack

> **Reference Document** - This guide provides a complete roadmap for adopting NX across all phases.
> For executable component migration planning, use `/nx-plan-migration` skill.

## Overview

This guide covers the complete NX adoption journey for the Backpack design system monorepo, from initial infrastructure setup through team onboarding.

**Total Timeline:** 4-5 weeks
**Packages:** 97 total (3 migrated, 94 remaining)
**Phases:** 5 phases from infrastructure to documentation

---

## Phase 0: Infrastructure Assessment (1 hour)

**Objective:** Determine current state and which phase to start from

### Assessment Checklist

Run these checks to assess infrastructure status:

```bash
# Check NX installation
npx nx --version 2>/dev/null || echo "❌ NX not installed"

# Check workspace configuration
test -f nx.json && echo "✅ nx.json" || echo "❌ nx.json missing"

# Check base configurations
test -f jest.preset.js && echo "✅ jest.preset.js" || echo "❌ missing"
test -f .eslintrc.base.js && echo "✅ .eslintrc.base.js" || echo "❌ missing"
test -f tsconfig.base.json && echo "✅ tsconfig.base.json" || echo "❌ missing"

# Check path mappings
grep -q '"paths"' tsconfig.base.json && echo "✅ Path mappings configured" || echo "❌ No path mappings"

# Check component migration status
find packages -name "package.json" -exec grep -l '"nx"' {} \; | wc -l
```

### Decision Tree

Based on assessment results:

- **NX not installed** → Start at Phase 1 (Infrastructure Setup)
- **NX installed, 0 components migrated** → Start at Phase 2 (Component Migration)
- **Some components migrated** → Continue Phase 2 (Component Migration)
- **All components migrated** → Phase 3+ (Validation, CI/CD, Docs)

### Current Backpack Status

- ✅ NX installed and configured
- ✅ Base configuration files present
- 🔄 3 of 97 packages migrated (3%)
- **Current Phase:** Phase 2 - Component Migration

---

## Phase 1: Silent Infrastructure Setup (2-4 hours)

**Objective:** Install NX and create base configuration files without disrupting existing code

**When Needed:** If Phase 0 assessment shows missing infrastructure

### Tasks

#### 1.1 Install NX
```bash
npm install -D nx@latest
npx nx --version  # Verify installation
```

#### 1.2 Create Workspace Configuration

Create `nx.json` at repository root:

```json
{
  "$schema": "./node_modules/nx/schemas/nx-schema.json",
  "targetDefaults": {
    "build": {
      "cache": true,
      "dependsOn": ["^build"]
    },
    "test": {
      "cache": true
    },
    "lint": {
      "cache": true
    }
  },
  "tasksRunnerOptions": {
    "default": {
      "runner": "nx/tasks-runners/default",
      "options": {
        "cacheableOperations": ["build", "test", "lint"]
      }
    }
  }
}
```

#### 1.3 Create Shared Jest Configuration

Create `jest.preset.js` at repository root:

```javascript
module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { rootMode: 'upward' }],
  },
  moduleNameMapper: {
    '^.+\\.scss$': '<rootDir>/scripts/stubs/styleStub.js',
    '^.+\\.(svg|png)$': '<rootDir>/scripts/stubs/fileStub.js',
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.test.{js,jsx,ts,tsx}',
    '!src/**/*-test.{js,jsx,ts,tsx}',
  ],
};
```

#### 1.4 Create Shared ESLint Configuration

Create `.eslintrc.base.js` at repository root:

```javascript
module.exports = {
  extends: [
    'skyscanner',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
    jest: true,
  },
};
```

#### 1.5 Configure TypeScript Path Mappings

Update `tsconfig.base.json` to add `paths` field:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {}
  }
}
```

#### 1.6 Create Supporting Directories

```bash
mkdir -p .claude/skills
mkdir -p .claude/agents
mkdir -p scripts/nx
```

#### 1.7 Add NX Scripts to package.json

Add these scripts to root `package.json`:

```json
{
  "scripts": {
    "nx": "nx",
    "build:all": "nx run-many --target=build --all",
    "test:all": "nx run-many --target=test --all",
    "lint:all": "nx run-many --target=lint --all",
    "affected:build": "nx affected --target=build",
    "affected:test": "nx affected --target=test",
    "affected:lint": "nx affected --target=lint",
    "graph": "nx graph"
  }
}
```

### Deliverables

- ✅ NX installed and functional
- ✅ Base configuration files created
- ✅ Workspace structure established
- ✅ Ready for component migration

**Estimated Time:** 2-4 hours
**Risk:** Low (no component changes, infrastructure only)

---

## Phase 2: Component Migration (3-4 weeks)

**Objective:** Migrate all 97 packages to NX structure with proper configuration

**Current Status:** 3 migrated (badge, chip, chip-group), 94 remaining

### Planning

Use the `/nx-plan-migration` skill to analyze dependencies and create prioritized migration plan:

```bash
/nx-plan-migration
```

This will provide:
- Priority 1: Independent components (no dependencies)
- Priority 2: Components depending only on migrated packages
- Priority 3: Complex components (special builds, high impact)
- Blocked: Components needing resolution

### Migration Approach

#### Batch Migration Strategy

Migrate in batches of 10-15 components:

**Week 1: Quick Wins (20 components)**
- Batch 1: 10 independent components from Priority 1
- Batch 2: 10 more independent components from Priority 1

**Week 2: Building Momentum (20 components)**
- Batch 3: 10 Priority 2 components (dependencies now satisfied)
- Batch 4: 10 high-impact components (button, text, link)

**Week 3: Complex Components (20 components)**
- Batch 5: Special build components (icon, spinner, flare)
- Batch 6: Remaining Priority 2 components

**Week 4: Final Push (34 components)**
- Batch 7: Circular dependency pairs (handle carefully)
- Batch 8-10: Remaining components

### Per-Component Migration

Use the `/nx-migrate-component` skill for individual components:

```bash
/nx-migrate-component bpk-component-example
```

This will:
1. Create NX configuration in package.json
2. Create tsconfig.json, jest.config.js, .eslintrc.json
3. Update tsconfig.base.json path mapping
4. Update import paths across codebase
5. Run validation (build, test, lint)

### Batch Migration

For migrating multiple components at once (when available):

```bash
/nx-migrate-batch component1 component2 component3 ...
```

### Validation After Each Batch

After migrating each batch:

1. **Run validation:** `/nx-validate-migration all` (when available)
2. **Verify builds:** `npx nx run-many --target=build --projects=[batch]`
3. **Run tests:** `npx nx run-many --target=test --projects=[batch]`
4. **Track progress:** Re-run `/nx-plan-migration`

### Special Considerations

**Components with Gulp Tasks:**
- bpk-component-icon
- bpk-component-spinner
- bpk-component-flare

These require special build configuration (see `/nx-migrate-component` skill documentation).

**High-Impact Components:**
Migrate these early to unblock dependents:
- bpk-component-button (imported by 30+ components)
- bpk-component-text (imported by 25+ components)
- bpk-component-link (imported by 20+ components)

**Circular Dependencies:**
If found, migrate together in the same session to avoid breakage.

### Deliverables

- ✅ All 97 packages migrated to NX structure
- ✅ All packages have NX configuration
- ✅ All path mappings configured
- ✅ All imports use NX aliases

**Estimated Time:** 3-4 weeks
**Risk:** Medium (requires careful testing after each batch)

---

## Phase 3: Validation & Optimization (1-2 days)

**Objective:** Verify all migrations succeeded and optimize NX caching

**When:** After all components migrated (Phase 2 complete)

### Validation Tasks

#### 3.1 Full Build Validation

```bash
# Build all 97 packages
npx nx run-many --target=build --all --parallel=5

# Expected: All packages type-check successfully
# Fix any errors before proceeding
```

**Success Criteria:** All builds pass with 0 errors

#### 3.2 Test Suite Validation

```bash
# Run all tests across all packages
npx nx run-many --target=test --all --parallel=5

# Expected: All tests pass
# Update test configs if needed
```

**Success Criteria:** All tests pass

#### 3.3 Lint Validation

```bash
# Lint all packages
npx nx run-many --target=lint --all --parallel=5

# Expected: No linting errors (warnings OK)
# Fix any errors
```

**Success Criteria:** No lint errors

#### 3.4 NX Cache Optimization

Test that caching works correctly:

```bash
# First build (cold cache)
time npx nx run-many --target=build --all

# Second build (should be instant from cache)
time npx nx run-many --target=build --all

# Expected: Second build completes in <5 seconds
```

**Optimization Steps:**
1. Review `nx.json` cache settings
2. Verify inputs/outputs configured correctly in package.json
3. Test affected commands work:
   ```bash
   # Make a change to one component
   npx nx affected:build
   # Expected: Only changed component + dependents rebuild
   ```

#### 3.5 Dependency Graph Verification

```bash
# Generate visual dependency graph
npx nx graph

# Opens browser with interactive graph
# Verify:
# - No unexpected circular dependencies
# - Path aliases resolved correctly
# - Dependency chains make sense
```

#### 3.6 Documentation Validation

Ensure all migration artifacts are documented:
- [ ] README updated with NX section
- [ ] Migration guide created (this document!)
- [ ] Team notified of migration completion

### Deliverables

- ✅ All builds passing
- ✅ All tests passing
- ✅ No lint errors
- ✅ NX caching working correctly (instant rebuilds)
- ✅ Dependency graph verified
- ✅ Documentation updated

**Estimated Time:** 1-2 days
**Risk:** Medium (may discover issues requiring fixes)

---

## Phase 4: CI/CD Integration (1-2 days)

**Objective:** Integrate NX into CI/CD pipelines for faster builds

**When:** After Phase 3 validation complete

### CI/CD Integration Tasks

#### 4.1 Update CI Environment

Add NX to CI environment (example for GitHub Actions):

```yaml
# .github/workflows/ci.yml
name: CI

on: [push, pull_request]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0  # Important for nx affected

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build affected projects
        run: npx nx affected --target=build --base=origin/main

      - name: Test affected projects
        run: npx nx affected --target=test --base=origin/main

      - name: Lint affected projects
        run: npx nx affected --target=lint --base=origin/main
```

#### 4.2 Configure NX Cloud (Optional)

For distributed caching across CI runs:

```bash
npx nx connect-to-nx-cloud
```

Benefits:
- ✅ Faster CI builds (cache shared across machines)
- ✅ Build insights and analytics
- ✅ Distributed task execution

#### 4.3 Update PR Checks

Configure PR checks to run only affected projects:

```yaml
# Only in PR workflow
- name: Run affected checks
  if: github.event_name == 'pull_request'
  run: |
    npx nx affected --target=build --base=origin/${{ github.base_ref }}
    npx nx affected --target=test --base=origin/${{ github.base_ref }}
    npx nx affected --target=lint --base=origin/${{ github.base_ref }}
```

#### 4.4 Add Dependency Graph Check

Optional: Fail PR if circular dependencies introduced:

```yaml
- name: Check dependency graph
  run: npx nx graph --file=graph.json
```

#### 4.5 Update Documentation

Update CI/CD documentation:
- [ ] Document new NX commands used in CI
- [ ] Explain how to run affected checks locally
- [ ] Add troubleshooting section

### Deliverables

- ✅ CI uses NX for builds/tests
- ✅ Only affected packages tested in PRs
- ✅ Faster CI pipeline (affected commands)
- ✅ NX Cloud configured (optional)
- ✅ Documentation updated

**Estimated Time:** 1-2 days
**Risk:** Low (no code changes, configuration only)

---

## Phase 5: Documentation & Team Onboarding (2-3 days)

**Objective:** Enable the team to work effectively with NX

**When:** After CI/CD integration

### Documentation Tasks

#### 5.1 Create NX Commands Cheat Sheet

Create `docs/nx-cheat-sheet.md`:

```markdown
# NX Commands Cheat Sheet

## Build Commands
npx nx build @backpack/component-name    # Build single package
npx nx run-many --target=build --all     # Build all packages
npx nx affected:build                    # Build only affected

## Test Commands
npx nx test @backpack/component-name     # Test single package
npx nx run-many --target=test --all      # Test all packages
npx nx affected:test                     # Test only affected

## Lint Commands
npx nx lint @backpack/component-name     # Lint single package
npx nx run-many --target=lint --all      # Lint all packages
npx nx affected:lint                     # Lint only affected

## Utility Commands
npx nx graph                             # View dependency graph
npx nx list                              # List all projects
npx nx show project @backpack/badge      # Show project details
```

#### 5.2 Create "Adding New Packages" Guide

Document how to add new components to the monorepo:

1. Create package directory: `packages/bpk-component-new/`
2. Run `/nx-migrate-component bpk-component-new`
3. Verify build/test/lint work
4. Update documentation

#### 5.3 Create Troubleshooting Guide

Common issues and solutions:
- Cache issues → `npx nx reset`
- Import resolution → Check `tsconfig.base.json` paths
- Test failures → Verify jest.config.js module mappings

#### 5.4 Update Main README

Add NX section to repository README:

```markdown
## Development with NX

This monorepo uses NX for build orchestration and caching.

### Quick Start
- Build all: `npm run build:all`
- Test all: `npm run test:all`
- Build affected: `npm run affected:build`

### Documentation
- [NX Commands Cheat Sheet](./docs/nx-cheat-sheet.md)
- [NX Adoption Guide](./docs/nx-adoption-guide.md)
- [Adding New Packages](./docs/adding-packages.md)

### Badges
![Build Status](https://img.shields.io/github/workflow/status/Skyscanner/backpack/CI)
```

### Team Training Tasks

#### 5.5 Conduct Team Training Session

**Agenda (1 hour):**
1. Why NX? (5 min)
   - Faster builds with caching
   - Affected commands save time
   - Better dependency management

2. Demo NX Commands (15 min)
   - Building packages
   - Running tests
   - Using affected commands
   - Viewing dependency graph

3. Workflow Changes (15 min)
   - How to add new packages
   - How to migrate existing packages
   - How to debug issues

4. CI/CD Changes (10 min)
   - What changed in pipelines
   - How PRs are tested
   - Reading CI logs

5. Q&A (15 min)

#### 5.6 Create Video Walkthrough

Record 10-minute video covering:
- Basic NX commands
- Affected commands demo
- Dependency graph walkthrough
- Common troubleshooting

### Cleanup Tasks

#### 5.7 Remove Old Build Scripts

If any old build scripts are no longer needed:
- Review root package.json scripts
- Remove deprecated scripts
- Update any scripts that reference old patterns

#### 5.8 Archive Migration Tools

Decide what to keep:
- ✅ Keep skills for future component migrations
- ✅ Keep documentation as reference
- 📦 Archive migration scripts if no longer needed

#### 5.9 Celebrate! 🎉

- Send announcement to team
- Update status page / internal docs
- Share metrics (build time improvements, etc.)

### Deliverables

- ✅ NX commands cheat sheet created
- ✅ Adding packages guide created
- ✅ Troubleshooting guide created
- ✅ Main README updated
- ✅ Team training session conducted
- ✅ Video walkthrough recorded
- ✅ Old scripts cleaned up
- ✅ Migration tools archived
- ✅ NX adoption officially complete!

**Estimated Time:** 2-3 days
**Risk:** Low

---

## Overall Timeline Summary

| Phase | Duration | Effort | Risk | Status |
|-------|----------|--------|------|--------|
| **Phase 0:** Assessment | 1 hour | Low | Low | ✅ Complete |
| **Phase 1:** Infrastructure | 2-4 hours | Low | Low | ✅ Complete |
| **Phase 2:** Component Migration | 3-4 weeks | High | Medium | 🔄 3% (3/97) |
| **Phase 3:** Validation | 1-2 days | Medium | Medium | ⏳ Pending |
| **Phase 4:** CI/CD Integration | 1-2 days | Low | Low | ⏳ Pending |
| **Phase 5:** Documentation | 2-3 days | Medium | Low | ⏳ Pending |

**Total Estimated Time:** 4-5 weeks
**Current Phase:** Phase 2 (Component Migration)
**Progress:** 3% complete

---

## Success Metrics

Track these metrics throughout adoption:

### Build Performance
- **Before NX:** Full build time = ?
- **Target with NX:**
  - Cold build: Similar to before
  - Cached rebuild: <5 seconds
  - Affected build: 50-80% faster

### Developer Experience
- Faster local development (cached builds)
- Better dependency understanding (nx graph)
- Clearer project structure

### CI/CD Performance
- PR builds only test affected packages
- Faster feedback loop for developers
- Reduced CI costs (fewer unnecessary builds)

---

## Getting Help

### For Component Migration
Use Claude skills:
- `/nx-plan-migration` - Create migration plan
- `/nx-migrate-component <name>` - Migrate single component
- `/update-import-paths <name> <alias>` - Fix imports

### For NX Issues
- [NX Documentation](https://nx.dev)
- [Backpack NX Cheat Sheet](./nx-cheat-sheet.md)
- Internal Slack: #backpack-dev

### For Team Questions
- See [Troubleshooting Guide](./nx-troubleshooting.md)
- Ask in team standup
- Reach out to migration champions

---

## Appendix

### A. Component Categories

**Standard Components (83):**
Most components follow standard pattern - no special build requirements.

**Special Build Components (3):**
- `bpk-component-icon` - Requires gulp generateIcons
- `bpk-component-spinner` - Requires gulp generateSpinners
- `bpk-component-flare` - Requires gulp generateFlare

**Utility Packages (11):**
- bpk-react-utils
- bpk-stylesheets
- bpk-mixins
- etc.

### B. Migration Checklist Template

Per-component migration checklist:

- [ ] Component exists and is accessible
- [ ] Run `/nx-migrate-component <name>`
- [ ] Verify builds: `npx nx build @backpack/<name>`
- [ ] Verify tests: `npx nx test @backpack/<name>`
- [ ] Verify lint: `npx nx lint @backpack/<name>`
- [ ] Check imports updated across codebase
- [ ] Commit changes
- [ ] Mark complete in tracking sheet

### C. Risk Mitigation Strategies

**Risk: Test Failures After Migration**
- Mitigation: Validate after each batch, not at the end
- Mitigation: Keep batches small (10-15 components)

**Risk: Breaking Changes**
- Mitigation: Test locally before committing
- Mitigation: Use feature branches for large batches

**Risk: Circular Dependencies**
- Mitigation: Identify early with dependency analysis
- Mitigation: Migrate circular deps together

**Risk: Team Confusion**
- Mitigation: Comprehensive documentation
- Mitigation: Training sessions and Q&A
- Mitigation: Migration champions available for help

---

**Last Updated:** 2026-01-29
**Maintained By:** Backpack Team
**Related:** `/nx-plan-migration` skill, `/nx-migrate-component` skill
