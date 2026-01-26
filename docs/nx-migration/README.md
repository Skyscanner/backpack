# NX Migration Documentation

This directory contains specifications and tracking for migrating Backpack to NX monorepo architecture.

## Directory Structure

```
docs/nx-migration/
├── README.md                    # This file
├── tracker.md                   # Track execution progress
├── learnings.md                 # Document corrections and insights
└── specs/
    ├── phase-0-prep.md          # 3 specs: Preparation
    ├── phase-1-infrastructure.md # 8 specs: Silent Infrastructure
    ├── phase-2-pilot.md         # 8 specs: Pilot Component
    ├── phase-3-batch-migration.md # 31 specs: Batch Migration
    ├── phase-4-cleanup.md       # 2 specs: Cleanup
    ├── phase-5-typescript.md    # 1+ specs: TypeScript
    └── phase-6-polish.md        # 3 specs: Final Polish
```

## How to Use This System

### 1. Read the Specs

Each phase file contains detailed specifications. Open the relevant phase file:

```bash
code docs/nx-migration/specs/phase-0-prep.md
```

### 2. Run a Spec with Spec Kit

Copy the spec description and run it:

```
/speckit.specify <paste description from spec file>
/speckit.plan
/speckit.tasks
/speckit.implement
```

### 3. Track Progress

Update `tracker.md` after each spec completes:

```markdown
- [x] Spec 2.3: Move files ✅ (passed on attempt 2)
```

### 4. Handle Failures

If a spec fails:

1. **Analyze the error** - Read the Spec Kit output
2. **Ask Claude for correction** - "Spec 2.3 failed with error: [paste]. How to correct?"
3. **Update the spec file** - Edit the phase file with corrected description
4. **Document in learnings.md** - Record what was learned
5. **Retry** - Run the corrected spec

### 5. Document Learnings

After corrections, update `learnings.md`:

```markdown
## Spec 2.3: Move Files (Attempt 2)

**Issue**: Missing bpk-tokens dependency
**Solution**: Added explicit dependency copying step
**Pattern**: All component migrations need dependency check
```

## Execution Order

```
Phase 0 → Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5 → Phase 6
                                  ↓
                    (31 specs can run in parallel)
```

**Critical Path**:
- Phase 2 must succeed before Phase 3 (pilot validates pattern)
- Phase 4 is a breaking change (coordinate with team)
- Phase 5 may require 2-5 attempts (expected)

## Quick Reference

### Running a Batch

```bash
# View specs for a phase
cat docs/nx-migration/specs/phase-3-batch-migration.md

# Run each spec in sequence
# Copy Spec 3.1 description → /speckit.specify
# Mark in tracker.md: [x] Spec 3.1 ✅
# Copy Spec 3.2 description → /speckit.specify
# Mark in tracker.md: [x] Spec 3.2 ✅
# ... repeat
```

### Deferring a Spec

If a spec is blocked (e.g., circular dependency):

1. Add to "Deferred Specs" section in tracker.md
2. Continue with next spec
3. Create a fix spec later

### Batch Corrections

If one pattern fails multiple times:

1. Document the correction in learnings.md
2. Update ALL similar specs in the phase file
3. Commit the correction: `git commit -m "Fix: Add dependency handling to all migration specs"`

## Git Workflow

```bash
# Commit spec corrections
git add docs/nx-migration/
git commit -m "Spec 2.3: Correct dependency handling"

# Commit progress tracking
git add docs/nx-migration/tracker.md
git commit -m "Track: Phase 2 complete"
```

## Tips

- **Read ahead**: Review the next 3-5 specs to understand dependencies
- **Batch similar specs**: Run multiple similar specs in one session
- **Document failures immediately**: Don't lose context
- **Version your specs**: Keep v1, v2 in the file to show evolution
- **Celebrate progress**: Update tracker after each success ✅
