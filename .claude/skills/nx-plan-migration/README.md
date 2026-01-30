# NX Component Migration Planning Skill

**Focused planning skill** for Phase 0 (Infrastructure Assessment) and Phase 2 (Component Migration). For the complete 5-phase NX adoption roadmap, see [`docs/nx-adoption-guide.md`](../../../docs/nx-adoption-guide.md).

## What This Skill Does

**Executable analysis and planning for component migration:**

### Phase 0: Infrastructure Assessment
- Checks if NX is installed and configured
- Verifies base config files exist
- Determines if ready for component migration

### Phase 2: Component Migration Planning
- Counts migrated vs unmigrated components
- Analyzes dependencies between packages
- Categorizes components by complexity
- Creates prioritized migration plan (Priority 1, 2, 3)
- Recommends specific batches with timelines
- Identifies blocked components

**Returns:** Actionable component migration plan with exact commands to run

## What This Skill Does NOT Do

- ❌ Phase 1 setup (see adoption guide)
- ❌ Phase 3-5 guidance (see adoption guide)
- ❌ Actual component migration (use `/nx-migrate-component`)
- ❌ Batch migration execution (use `/nx-migrate-batch` when available)

## Usage

```bash
/nx-plan-migration
```

## Output Structure

```markdown
# NX Component Migration Plan

## Infrastructure Status
✅ READY or ❌ NOT READY

## Migration Progress
Total: 97, Migrated: 3 (3%), Remaining: 94

## Priority 1: Independent Components (23)
[List of components ready to migrate now]

## Priority 2: Depends on Migrated Only (18)
[List of components waiting on Priority 1]

## Priority 3: Complex Components
- Special builds (icon, spinner, flare)
- High-impact (button, text, link)

## Blocked Components
- Circular dependencies
- Missing files

## Recommended Migration Schedule
Week 1-4 batches with specific component lists

## Next Steps
Exact commands to run
```

## Scope: Focused on Planning

This skill is **focused on analysis and planning** (Phase 0 + Phase 2):

| Phase | Covered Here | Where to Find |
|-------|--------------|---------------|
| Phase 0: Assessment | ✅ Yes | This skill |
| Phase 1: Infrastructure | ❌ No | [`docs/nx-adoption-guide.md`](../../../docs/nx-adoption-guide.md) |
| Phase 2: Component Planning | ✅ Yes | This skill |
| Phase 3: Validation | ❌ No | Adoption guide |
| Phase 4: CI/CD | ❌ No | Adoption guide |
| Phase 5: Documentation | ❌ No | Adoption guide |

## When to Use

**Use this skill when:**
- ✅ Starting NX component migration
- ✅ Checking if infrastructure is ready
- ✅ Creating migration priorities
- ✅ Tracking migration progress (re-run after batches)
- ✅ Identifying what components to migrate next

**See adoption guide for:**
- Setting up NX infrastructure (Phase 1)
- Post-migration validation (Phase 3)
- CI/CD integration (Phase 4)
- Team onboarding (Phase 5)

## Example Workflow

```bash
# 1. Check readiness and create plan
/nx-plan-migration
# Output: "✅ Ready! 23 components in Priority 1"

# 2. Start migrating (use separate skill)
/nx-migrate-component bpk-component-accordion
/nx-migrate-component bpk-component-aria-live
# ... migrate 10 components

# 3. Track progress
/nx-plan-migration
# Output: "13 migrated, 84 remaining. Priority 1 now has 13 components"

# 4. Continue with next batch
# Repeat steps 2-3 until all migrated

# 5. After all components migrated
# See docs/nx-adoption-guide.md for Phase 3-5
```

## Integration with Other Tools

Works with:
- **[`/nx-migrate-component`](../nx-migrate-component/README.md)** - Migrate single components
- **`/nx-migrate-batch`** - Migrate batches (when available)
- **[`/update-import-paths`](../update-import-paths/SKILL.md)** - Fix import paths
- **[`docs/nx-adoption-guide.md`](../../../docs/nx-adoption-guide.md)** - Complete adoption roadmap

## File Size

- **SKILL.md:** ~380 lines (focused on executable planning)
- **Adoption Guide:** ~800 lines (complete reference for all 5 phases)

Kept skill under 400 lines by moving reference material to documentation.

## Related

- [Complete NX Adoption Guide](../../../docs/nx-adoption-guide.md) - All 5 phases
- [NX Migration Skill](../nx-migrate-component/README.md) - Single component migration
- [Update Import Paths](../update-import-paths/SKILL.md) - Import path fixer
