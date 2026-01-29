# NX Batch Migration Skill

Migrate multiple components to NX structure sequentially, with progress tracking and comprehensive error handling.

## Usage

```bash
/nx-migrate-batch bpk-component-accordion bpk-component-aria-live bpk-component-badge ...
```

## What It Does

Automates batch component migration by:
1. Validating all components exist and aren't already migrated
2. Migrating each component sequentially using the same process as `/nx-migrate-component`
3. Tracking success/failure/partial for each component
4. Continuing on errors (doesn't stop if one fails)
5. Providing comprehensive summary report
6. Suggesting next steps (fixes, validation, commits)

## When to Use

**Use this skill when:**
- ✅ Migrating 5-15 components from your migration plan
- ✅ You have a Priority 1 list from `/nx-plan-migration`
- ✅ You want automated batch processing with error handling
- ✅ You want to migrate multiple components in one session

**Use `/nx-migrate-component` instead for:**
- Single component migration
- First-time migration (to understand the process)
- Complex components needing manual intervention

## Example Workflow

### 1. Get Migration Plan
```bash
/nx-plan-migration
# Output: Priority 1 has 25 components ready
```

### 2. Start Batch Migration
```bash
/nx-migrate-batch bpk-component-accordion bpk-component-aria-live bpk-component-blockquote bpk-component-banner-alert bpk-component-barchart bpk-component-bottom-sheet bpk-component-breadcrumb bpk-component-breakpoint bpk-component-bubble bpk-component-calendar
```

### 3. Review Results
```
Batch complete!
✅ Successful: 8/10 (80%)
⚠️ Partial: 1/10 (tests failed)
❌ Failed: 1/10 (missing index.ts)
```

### 4. Fix Issues
```bash
# Fix partial migrations
npx nx test @backpack/barchart  # Fix failing tests

# Retry failed
/nx-migrate-component bpk-component-autosuggest  # After creating index.ts
```

### 5. Validate Batch
```bash
npx nx run-many --target=build --projects=@backpack/accordion,@backpack/aria-live,...
```

### 6. Track Progress
```bash
/nx-plan-migration
# Output: "11 migrated (12%), 82 remaining"
```

## Output Structure

Real-time progress for each component:

```markdown
### [1/10] bpk-component-accordion
✅ Configuration files created
✅ Import paths updated (2 files)
✅ Build validated
✅ Migration complete

### [2/10] bpk-component-aria-live
✅ Migration complete

### [3/10] bpk-component-autosuggest
❌ Failed: Missing index.ts

...

## Summary
✅ Successful: 7
⚠️ Partial: 2
❌ Failed: 1

## Next Steps
[Exact commands to fix issues]
```

## Migration Results

### ✅ Successful Migration
- All config files created
- Import paths updated
- Build passes
- Component fully migrated

### ⚠️ Partial Success
- Config files created ✅
- Import paths updated ✅
- Build passes ✅
- BUT: Tests or lint failed ❌

**Action:** Fix tests/lint issues manually

### ❌ Failed Migration
- Migration could not complete
- Common reasons:
  - Missing index.ts
  - Component directory doesn't exist
  - Critical error during config creation

**Action:** Fix issue and retry

## Features

### Continue on Errors
If one component fails, the batch continues:
```
[1/10] ✅ accordion - success
[2/10] ❌ autosuggest - failed (missing index.ts)
[3/10] ✅ banner-alert - success (continued after failure)
...
```

### Progress Tracking
Real-time display:
```
[5/10] Migrating bpk-component-barchart...
⏳ Creating configuration...
✅ Files created
⏳ Validating build...
```

### Comprehensive Summary
Final report includes:
- Success count and list
- Partial success with reasons
- Failed with reasons
- Next steps with exact commands

### Smart Validation
For each component:
- ✅ Build validation (always)
- Test validation (optional, can skip for speed)
- Lint validation (optional, can skip for speed)

## Configuration

**Tools Used:**
- Read, Write, Edit (create config files)
- Bash (run validation commands)
- Glob, Grep (analyze components)

**Permission Mode:**
- Manual invocation only (`disable-model-invocation: true`)
- You control when batches run

## Recommended Batch Sizes

| Batch Size | Use Case | Time Estimate |
|------------|----------|---------------|
| **5 components** | First batch, testing process | 1-1.5 hours |
| **10 components** | Standard batch | 2-3 hours |
| **15 components** | Large batch, confident process | 3-4 hours |
| **20+ components** | Not recommended (hard to track) | Too long |

## Best Practices

### Before Batch
1. ✅ Run `/nx-plan-migration` to identify candidates
2. ✅ Choose components from Priority 1 (independent)
3. ✅ Start with smaller batch (5-10) first time
4. ✅ Ensure infrastructure is ready (Phase 0 complete)

### During Batch
1. ✅ Monitor progress output
2. ✅ Note any warnings or errors
3. ✅ Let it complete (don't interrupt)

### After Batch
1. ✅ Review summary report
2. ✅ Fix partial migrations immediately
3. ✅ Run batch validation
4. ✅ Commit successful migrations
5. ✅ Re-run `/nx-plan-migration` to track progress
6. ✅ Plan next batch

## Comparison with Single Migration

| Aspect | `/nx-migrate-component` | `/nx-migrate-batch` |
|--------|-------------------------|---------------------|
| **Components** | 1 at a time | 5-15 at once |
| **Progress** | Detailed per-step | Summary per-component |
| **Error handling** | Stops on error | Continues on error |
| **Use case** | Learning, complex | Production, volume |
| **Time** | ~15 min/component | ~2-3 hours/batch |
| **Output** | Detailed logs | Summary + next steps |

## Integration with Other Skills

**Planning:**
- [`/nx-plan-migration`](../nx-plan-migration/README.md) - Get component list for batch

**Single Migration:**
- [`/nx-migrate-component`](../nx-migrate-component/README.md) - Retry failed components

**Validation:**
- `/nx-validate-migration all` - Validate after batch (when available)

**Import Fixes:**
- [`/update-import-paths`](../update-import-paths/SKILL.md) - Fix import issues

**Reference:**
- [`docs/nx-adoption-guide.md`](../../../docs/nx-adoption-guide.md) - Complete adoption guide

## Troubleshooting

### "Component already has NX config"
**Cause:** Component was already migrated
**Solution:** Remove from batch list, or re-run `/nx-plan-migration` for updated list

### "Missing index.ts"
**Cause:** Component doesn't have barrel export file
**Solution:** Create index.ts before retry, or remove from batch

### "Build failed"
**Cause:** TypeScript errors in component
**Solution:** Fix TypeScript errors, then retry component

### "Test failed" (Partial Success)
**Cause:** Test configuration issues or failing tests
**Solution:** Investigate with `npx nx test @backpack/<component>`, fix and rerun

### Batch taking too long
**Cause:** Too many components in batch
**Solution:** Use smaller batches (5-10 components)

## File Size

**SKILL.md:** ~390 lines
- Includes full migration logic
- Comprehensive error handling
- Detailed output format

## Related

- [NX Migration Planning](../nx-plan-migration/README.md) - Get batch list
- [Single Component Migration](../nx-migrate-component/README.md) - Individual migrations
- [Complete NX Adoption Guide](../../../docs/nx-adoption-guide.md) - Full roadmap
