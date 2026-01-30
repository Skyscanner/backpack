# NX Skills - Usage Order Guide

**Complete workflow from start to finish**

---

## Visual Workflow

```
START
  │
  ▼
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 0: Assessment                                             │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ 1. /nx-plan-migration                                       │ │
│ │    Purpose: Check if NX is installed and ready              │ │
│ │    Output: ✅ READY or ❌ NOT READY                         │ │
│ └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
  │
  ├──❌ NOT READY
  │   │
  │   ▼
  │ ┌─────────────────────────────────────────────────────────────┐
  │ │ PHASE 1: Infrastructure Setup                               │
  │ │ ┌─────────────────────────────────────────────────────────┐ │
  │ │ │ 2. /nx-setup-infrastructure                             │ │
  │ │ │    Purpose: Install NX and create configs               │ │
  │ │ │    Output: ✅ NX installed, configs created             │ │
  │ │ └─────────────────────────────────────────────────────────┘ │
  │ └─────────────────────────────────────────────────────────────┘
  │   │
  │   └──▶ Go back to Phase 0 to verify
  │
  ├──✅ READY
  │
  ▼
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 2: Component Migration (LOOP - repeat for each batch)    │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ 3. /nx-plan-migration                                       │ │
│ │    Purpose: Create migration plan with priorities           │ │
│ │    Output: Priority 1/2/3 lists, recommended batches        │ │
│ └─────────────────────────────────────────────────────────────┘ │
│   │                                                             │
│   ▼                                                             │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ 4a. /nx-migrate-component <name>    (single)                │ │
│ │     OR                                                       │ │
│ │ 4b. /nx-migrate-batch <name1> <name2> ...  (batch)          │ │
│ │     Purpose: Migrate components to NX structure             │ │
│ │     Output: Config files created, imports updated           │ │
│ └─────────────────────────────────────────────────────────────┘ │
│   │                                                             │
│   ▼                                                             │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ 5. /nx-validate-migration <names...>                        │ │
│ │    Purpose: Validate migration (config, build, test, lint) │ │
│ │    Output: ✅ SUCCESS or ❌ FAILED with issues              │ │
│ └─────────────────────────────────────────────────────────────┘ │
│   │                                                             │
│   ├──❌ Tests Failed                                            │
│   │   │                                                         │
│   │   ▼                                                         │
│   │ ┌───────────────────────────────────────────────────────┐ │
│   │ │ 6. Use nx-test-analyzer subagent                       │ │
│   │ │    Purpose: Deep test diagnostics                      │ │
│   │ │    Output: Detailed analysis with fixes                │ │
│   │ └───────────────────────────────────────────────────────┘ │
│   │   │                                                         │
│   │   │ Fix issues manually                                    │
│   │   └──▶ Go back to step 5 (re-validate)                    │
│   │                                                             │
│   ├──✅ SUCCESS                                                 │
│   │   │                                                         │
│   │   │ Commit changes                                         │
│   │   │                                                         │
│   │   └──▶ More components to migrate?                         │
│   │        ├─ YES: Go back to step 4 (next batch)             │
│   │        └─ NO: Continue to Phase 3                          │
│   │                                                             │
│   └─ Note: /update-import-paths is usually automatic          │
│            (called by migrate skills), use manually if needed  │
└─────────────────────────────────────────────────────────────────┘
  │
  ▼
┌─────────────────────────────────────────────────────────────────┐
│ CHECKPOINT: Check migration progress                           │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ 7. /nx-plan-migration                                       │ │
│ │    Purpose: Check progress (e.g., "90/94 migrated")        │ │
│ │    Decision: <80% migrated? Go back to Phase 2             │ │
│ │              >80% migrated? Continue to Phase 3             │ │
│ └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
  │
  ▼
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 3: Workspace Optimization (when >80% migrated)           │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ 8. /nx-optimize-workspace                                   │ │
│ │    Purpose: Optimize cache, parallel execution, pipelines  │ │
│ │    Output: 30-40% faster builds, 70-85% cache hit rate     │ │
│ └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
  │
  ▼
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 4: CI/CD Integration                                     │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ 9. /nx-setup-ci                                             │ │
│ │    Purpose: Configure CI/CD for NX (affected commands)     │ │
│ │    Output: CI workflows created, cache configured          │ │
│ └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
  │
  ▼
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 5: Documentation & Onboarding                            │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ 10. /nx-generate-docs                                       │ │
│ │     Purpose: Generate team documentation                    │ │
│ │     Output: Migration summary, dev guide, onboarding       │ │
│ └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
  │
  ▼
COMPLETE! 🎉
```

---

## Skill Usage Order

### 1. `/nx-plan-migration` (Phase 0)
**First skill to use - checks readiness**

```bash
/nx-plan-migration
```

**Purpose:** Infrastructure assessment
- Check if NX is installed
- Verify configuration files exist
- Determine readiness status

**Output:**
- ✅ **READY** → Skip to step 3
- ❌ **NOT READY** → Continue to step 2

**When:** At the very start

---

### 2. `/nx-setup-infrastructure` (Phase 1)
**Only if Phase 0 shows "NOT READY"**

```bash
/nx-setup-infrastructure
```

**Purpose:** Install and configure NX
- Install NX packages
- Create base configuration files
- Set up workspace

**Output:** ✅ NX installed and configured

**When:** Only if NX not installed

**After this:** Re-run step 1 to verify readiness

---

### 3. `/nx-plan-migration` (Phase 2 Planning)
**Second use - create migration plan**

```bash
/nx-plan-migration
```

**Purpose:** Create prioritized migration plan
- Count unmigrated components
- Analyze dependencies
- Create Priority 1/2/3 lists
- Recommend batches

**Output:**
- Priority 1: 23 components (ready now)
- Priority 2: 18 components (waiting on dependencies)
- Priority 3: 53 components (complex)

**When:** After infrastructure is ready

---

### 4a. `/nx-migrate-component` (Phase 2 Migration - Single)
**For individual component migration**

```bash
/nx-migrate-component bpk-component-name
```

**Purpose:** Migrate single component
- Create config files
- Update tsconfig.base.json
- Update import paths
- Run validation

**When:** For careful, one-by-one migration

**OR**

### 4b. `/nx-migrate-batch` (Phase 2 Migration - Batch)
**For batch migration (recommended)**

```bash
/nx-migrate-batch component1 component2 component3 ...
```

**Purpose:** Migrate multiple components at once
- Sequential migration
- Progress tracking
- Batch summary

**When:** For faster migration of similar components

**After this:** Continue to step 5

---

### 5. `/nx-validate-migration` (Phase 2 Validation)
**After every migration (required)**

```bash
/nx-validate-migration component1 component2 ...
```

**Purpose:** Comprehensive post-migration validation
- Check config files
- Verify path mappings
- Run build
- Run tests
- Run lint

**Output:**
- ✅ **SUCCESS** → Commit and continue
- ⚠️ **PARTIAL** → Fix warnings, then continue
- ❌ **FAILED** → Continue to step 6

**When:** After EVERY migration (step 4)

---

### 6. `nx-test-analyzer` (Phase 2 Diagnostics)
**Only if tests fail in step 5**

```bash
Use the nx-test-analyzer subagent to analyze component-name
```

**Purpose:** Deep test configuration diagnostics
- Analyze Jest configuration
- Check testMatch patterns
- Identify specific issues
- Provide fixes with file:line

**When:** Only when tests fail validation

**After this:** Fix issues → Go back to step 5

**Note:** This is a sub-agent, invoked via Task tool

---

### 7. LOOP BACK (Phase 2 Repeat)
**Repeat steps 4-6 for all components**

**Decision point:**
- More components to migrate? → Go back to step 4
- Most components migrated (>80%)? → Continue to step 8
- Need to check progress? → Re-run `/nx-plan-migration`

---

### 8. `/nx-optimize-workspace` (Phase 3)
**After >80% components migrated**

```bash
/nx-optimize-workspace
```

**Purpose:** Workspace-wide optimization
- Analyze build performance
- Optimize cache configuration
- Tune parallel execution
- Configure task pipelines

**Output:** 30-40% faster builds, 70-85% cache hit rate

**When:** After most components migrated

---

### 9. `/nx-setup-ci` (Phase 4)
**After optimization complete**

```bash
/nx-setup-ci [--ci-provider github]
```

**Purpose:** Configure CI/CD pipelines
- Create CI workflows
- Set up affected commands
- Configure cache in CI
- Optional: NX Cloud

**When:** After Phase 3 optimization

---

### 10. `/nx-generate-docs` (Phase 5)
**Final step - before team rollout**

```bash
/nx-generate-docs
```

**Purpose:** Generate documentation
- Migration summary
- Developer guide
- Onboarding checklist
- Quick reference

**When:** After everything complete, ready for team

---

## Helper Skill: `/update-import-paths`

**Usually automatic** - called internally by migration skills

```bash
/update-import-paths component-name @backpack/alias
```

**Purpose:** Update import paths from relative to aliases

**When to use manually:**
- If automatic update missed some files
- After manually creating NX config
- When fixing import issues

**Most users won't need this** - it's automatic in `/nx-migrate-component` and `/nx-migrate-batch`

---

## Common Workflows

### Workflow 1: Fresh Start (No NX)

```bash
# 1. Check readiness
/nx-plan-migration
# Output: ❌ NOT READY

# 2. Install NX
/nx-setup-infrastructure
# Output: ✅ Installed

# 3. Verify ready
/nx-plan-migration
# Output: ✅ READY, 94 components

# 4. Migrate first batch
/nx-migrate-batch accordion badge button card
# Output: ✅ 4 components migrated

# 5. Validate
/nx-validate-migration accordion badge button card
# Output: ✅ All passed

# 6. Commit
git add packages/bpk-component-{accordion,badge,button,card}
git commit -m "Migrate first batch"

# 7. Continue with more batches...
# (repeat steps 4-6)

# 8. After 80+ components migrated
/nx-optimize-workspace
# Output: ✅ 38% faster

# 9. Set up CI
/nx-setup-ci
# Output: ✅ CI configured

# 10. Generate docs
/nx-generate-docs
# Output: ✅ Docs created
```

---

### Workflow 2: Already Have NX

```bash
# 1. Check readiness
/nx-plan-migration
# Output: ✅ READY, 94 components, 3 already migrated

# 2. Skip infrastructure setup (already done)

# 3. Start migrating (step 4 onwards)
/nx-migrate-batch ...
```

---

### Workflow 3: Migration with Test Failures

```bash
# 1-3. Setup complete

# 4. Migrate
/nx-migrate-component barchart

# 5. Validate
/nx-validate-migration barchart
# Output: ❌ Tests: 0 tests found

# 6. Deep analysis
Use the nx-test-analyzer subagent to analyze bpk-component-barchart
# Output: testMatch pattern mismatch - fix jest.config.js line 8

# 7. Fix manually
# Edit jest.config.js

# 8. Re-validate
/nx-validate-migration barchart
# Output: ✅ All passed

# 9. Continue...
```

---

## Decision Tree

```
START
  │
  ├─ Do I have NX installed?
  │   ├─ No → /nx-setup-infrastructure (step 2)
  │   └─ Yes → /nx-plan-migration (step 3)
  │
  ├─ Ready to migrate?
  │   ├─ Yes → /nx-migrate-batch or /nx-migrate-component (step 4)
  │   └─ No → Fix prerequisites first
  │
  ├─ Migrated a component?
  │   └─ Yes → /nx-validate-migration (step 5) ALWAYS
  │
  ├─ Tests failed validation?
  │   ├─ Yes → Use nx-test-analyzer (step 6)
  │   └─ No → Commit and continue
  │
  ├─ More components to migrate?
  │   ├─ Yes → Go back to step 4
  │   └─ No → Check progress
  │
  ├─ >80% components migrated?
  │   ├─ No → Continue migrating (step 4)
  │   └─ Yes → /nx-optimize-workspace (step 8)
  │
  ├─ Optimization complete?
  │   └─ Yes → /nx-setup-ci (step 9)
  │
  ├─ CI configured?
  │   └─ Yes → /nx-generate-docs (step 10)
  │
  └─ DONE! 🎉
```

---

## Frequency of Use

| Skill | Times Used | Pattern |
|-------|------------|---------|
| `/nx-plan-migration` | 3-5 times | Start, checkpoints, progress tracking |
| `/nx-setup-infrastructure` | 1 time | Once at beginning (if needed) |
| `/nx-migrate-component` | 10-20 times | Individual migrations |
| `/nx-migrate-batch` | 5-10 times | Batch migrations (preferred) |
| `/nx-validate-migration` | 15-30 times | After EVERY migration |
| `nx-test-analyzer` | 5-10 times | When tests fail |
| `/update-import-paths` | 0-2 times | Usually automatic |
| `/nx-optimize-workspace` | 1-2 times | Near end, maybe re-optimize |
| `/nx-setup-ci` | 1 time | Once after optimization |
| `/nx-generate-docs` | 1 time | Final step |

---

## Critical Rules

### ✅ DO

1. **Always validate after migration**
   ```bash
   /nx-migrate-batch components...
   /nx-validate-migration components...  # REQUIRED
   ```

2. **Use test analyzer when tests fail**
   ```bash
   # If validation shows tests failed
   Use nx-test-analyzer subagent  # Get detailed diagnostics
   ```

3. **Check progress periodically**
   ```bash
   /nx-plan-migration  # See how many left
   ```

4. **Optimize after >80% migrated**
   ```bash
   # Don't optimize too early
   # Wait until most components done
   ```

### ❌ DON'T

1. **Don't skip validation**
   ```bash
   /nx-migrate-component accordion
   # ❌ BAD: Commit without validating
   git commit ...

   # ✅ GOOD: Validate first
   /nx-validate-migration accordion
   # Then commit
   ```

2. **Don't optimize too early**
   ```bash
   # ❌ BAD: Only 20% migrated
   /nx-optimize-workspace

   # ✅ GOOD: Wait for >80%
   ```

3. **Don't skip phases**
   ```bash
   # ❌ BAD: Jump to CI without optimization
   /nx-migrate-batch ...
   /nx-setup-ci  # Skip Phase 3

   # ✅ GOOD: Follow order
   /nx-migrate-batch ...
   /nx-optimize-workspace  # Phase 3
   /nx-setup-ci           # Phase 4
   ```

---

## Summary

**Correct Order:**

1. `/nx-plan-migration` (assess)
2. `/nx-setup-infrastructure` (if needed)
3. `/nx-plan-migration` (plan)
4. `/nx-migrate-batch` or `/nx-migrate-component` (migrate)
5. `/nx-validate-migration` (validate - REQUIRED)
6. `nx-test-analyzer` (if tests fail)
7. **LOOP** steps 4-6 until >80% migrated
8. `/nx-optimize-workspace` (optimize)
9. `/nx-setup-ci` (CI/CD)
10. `/nx-generate-docs` (docs)

**Key Principle:** Follow the phases in order, don't skip validation, use the test analyzer when tests fail.
