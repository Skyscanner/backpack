# NX Migration Validation Skill

Comprehensive post-migration validation that verifies components were successfully migrated to NX structure.

## Usage

```bash
# Single component
/nx-validate-migration bpk-component-accordion

# Multiple components
/nx-validate-migration bpk-component-accordion bpk-component-badge bpk-component-button

# Short names work too
/nx-validate-migration accordion badge button
```

## What It Does

This skill performs **5 key validation checks** for each component:

### 1. Configuration Files ✅
Verifies all required files exist:
- `package.json` with NX configuration
- `jest.config.js` for testing
- `tsconfig.json` for type-checking
- `.eslintrc.json` for linting

### 2. Path Mapping ✅
Checks `tsconfig.base.json` has correct alias:
- Verifies `@backpack/component-name` mapping exists
- Ensures paths point to correct source directory

### 3. Build Validation ✅
Runs type-checking:
- `npx nx build @backpack/<component>`
- Verifies no TypeScript errors
- Confirms configuration is valid

### 4. Test Validation ✅
Runs test suite:
- `npx nx test @backpack/<component>`
- Verifies tests are discovered
- Checks tests pass
- Reports test counts

### 5. Lint Validation ✅
Runs linting:
- `npx nx lint @backpack/<component>`
- Checks for new lint errors
- Ensures ESLint configuration works

## When to Use

✅ **Use after migration:**
- After `/nx-migrate-component <name>`
- After `/nx-migrate-batch <names...>`
- After manually fixing migration issues
- Before committing migration changes

❌ **Don't use for:**
- Deep test diagnostics → Use `nx-test-analyzer` sub-agent
- Planning migrations → Use `/nx-plan-migration`
- Infrastructure setup → Use `/nx-setup-infrastructure`

## Example Workflow

### Successful Migration

```bash
# 1. Migrate component
/nx-migrate-component bpk-component-accordion

# 2. Validate migration
/nx-validate-migration bpk-component-accordion

# Output:
## NX Migration Validation Report
**Validated:** 1 component(s)

### Summary
| Check | Passed | Failed | Status |
|-------|--------|--------|--------|
| Config Files | 1 | 0 | ✅ |
| Path Mappings | 1 | 0 | ✅ |
| Build | 1 | 0 | ✅ |
| Tests | 1 | 0 | ✅ |
| Lint | 1 | 0 | ✅ |

**Overall Status:** ✅ SUCCESS

#### bpk-component-accordion
- ✅ Config files: All present
- ✅ Path mapping: @backpack/accordion
- ✅ Build: Type-checking passed
- ✅ Tests: 5 suites, 20 tests passed
- ✅ Lint: No errors

### Next Steps
1. Commit migration changes
2. Create pull request
3. Continue with next batch

# 3. Commit and continue
git add packages/bpk-component-accordion
git commit -m "Migrate accordion to NX structure"
```

### Failed Validation with Fix

```bash
# 1. Migrate component
/nx-migrate-component bpk-component-barchart

# 2. Validate migration
/nx-validate-migration bpk-component-barchart

# Output:
## NX Migration Validation Report
**Validated:** 1 component(s)

### Summary
| Check | Passed | Failed | Status |
|-------|--------|--------|--------|
| Config Files | 1 | 0 | ✅ |
| Path Mappings | 1 | 0 | ✅ |
| Build | 1 | 0 | ✅ |
| Tests | 0 | 1 | ❌ |
| Lint | 1 | 0 | ✅ |

**Overall Status:** ⚠️ PARTIAL SUCCESS

#### bpk-component-barchart
- ✅ Config files: All present
- ✅ Path mapping: @backpack/barchart
- ✅ Build: Type-checking passed
- ❌ Tests: No tests found
- ✅ Lint: No errors

**Issue:** testMatch pattern doesn't match test file extensions

### Recommendations
For detailed test analysis, run:
  Use the nx-test-analyzer subagent to analyze bpk-component-barchart

# 3. Deep dive into test issues
Use the nx-test-analyzer subagent to analyze bpk-component-barchart

# Output: Detailed analysis with specific fix...
# Fix: Update jest.config.js line 8 testMatch pattern

# 4. Re-validate after fix
/nx-validate-migration bpk-component-barchart

# Output: ✅ All checks passed!
```

### Batch Validation

```bash
# 1. Batch migrate
/nx-migrate-batch accordion aria-live badge

# 2. Validate all at once
/nx-validate-migration accordion aria-live badge

# Output:
## NX Migration Validation Report
**Validated:** 3 component(s)

### Summary
✅ **Fully Passing:** 3 components
- bpk-component-accordion
- bpk-component-aria-live
- bpk-component-badge

**Overall Status:** ✅ SUCCESS

All components successfully migrated and validated!
```

## Output Structure

### 1. Summary Table
Quick overview of pass/fail counts for all checks

### 2. Overall Status
- ✅ **SUCCESS** - All checks passed
- ⚠️ **PARTIAL** - Some checks failed, but not critical
- ❌ **FAILED** - Critical failures (missing files, build errors)

### 3. Detailed Results
Per-component breakdown showing:
- Which checks passed/failed
- Specific issues found
- Test/lint counts

### 4. Recommendations
Next steps based on results:
- Use `nx-test-analyzer` for test failures
- Run specific commands for debugging
- Re-validate after fixes

### 5. Verification Commands
Commands to fix and re-test issues

## Integration with Other Tools

### Works With nx-test-analyzer

When tests fail, this skill suggests using the `nx-test-analyzer` sub-agent:

```bash
/nx-validate-migration barchart
# Tests failed ❌

# Suggests:
Use the nx-test-analyzer subagent to analyze bpk-component-barchart
```

The test analyzer provides:
- Deep test configuration analysis
- testMatch pattern validation
- Specific fixes with file:line references

### Works With Migration Skills

**After single component migration:**
```bash
/nx-migrate-component accordion
/nx-validate-migration accordion
```

**After batch migration:**
```bash
/nx-migrate-batch accordion badge button
/nx-validate-migration accordion badge button
```

## Validation Criteria

### ✅ SUCCESS
All of these pass:
- Config files exist
- Path mapping configured
- Build passes (no TS errors)
- Tests pass (≥1 suite runs)
- Lint passes (no new errors)

### ⚠️ PARTIAL
Config files exist, but:
- Tests have warnings
- Lint has warnings
- Some non-critical issues

### ❌ FAILED
Any of these fail:
- Missing config files
- Missing path mapping
- Build fails (TS errors)
- Tests: 0 tests found
- Critical errors

## Troubleshooting

### Issue: "Component not found"

**Cause:** Component doesn't exist or wrong name

**Fix:**
```bash
# Check available components
ls -d packages/bpk-component-*

# Use correct full name
/nx-validate-migration bpk-component-accordion
```

### Issue: "No tests found"

**Cause:** testMatch pattern doesn't match test file extensions

**Fix:**
```bash
# Use test analyzer for details
Use the nx-test-analyzer subagent to analyze [component]

# Common fix: Update jest.config.js testMatch pattern
testMatch: [
  '<rootDir>/src/**/*-test.js',
  '<rootDir>/src/**/*-test.jsx',
  '<rootDir>/src/**/*-test.ts',
  '<rootDir>/src/**/*-test.tsx',
]
```

### Issue: "Build failed"

**Cause:** TypeScript errors in component

**Fix:**
```bash
# Run build with verbose output
npx nx build @backpack/component --verbose

# Fix TypeScript errors
# Re-validate
/nx-validate-migration component
```

### Issue: "Missing path mapping"

**Cause:** tsconfig.base.json not updated

**Fix:**
```bash
# Check if mapping exists
grep "@backpack/component" tsconfig.base.json

# Add mapping manually or re-run migration
# Re-validate
/nx-validate-migration component
```

## Performance

- **Fast validation**: Each component takes ~10-30 seconds
- **Parallel-friendly**: Can validate multiple components
- **Timeout protection**: Commands timeout after 60-120s
- **Cached results**: NX cache speeds up subsequent runs

## Best Practices

### 1. Validate Immediately After Migration
```bash
/nx-migrate-component accordion && /nx-validate-migration accordion
```

### 2. Validate Before Committing
```bash
/nx-validate-migration accordion badge
# If all pass → commit
git add packages/bpk-component-{accordion,badge}
git commit -m "Migrate accordion and badge to NX"
```

### 3. Use Test Analyzer for Failures
```bash
/nx-validate-migration barchart
# If tests fail → analyze
Use the nx-test-analyzer subagent to analyze bpk-component-barchart
```

### 4. Batch Validate After Batch Migration
```bash
/nx-migrate-batch accordion badge button card
/nx-validate-migration accordion badge button card
```

## Related Skills

| Skill | Purpose | When to Use |
|-------|---------|-------------|
| `/nx-migrate-component` | Migrate single component | Before validation |
| `/nx-migrate-batch` | Batch migrate components | Before validation |
| `/nx-validate-migration` | Validate migration | **After migration** ← YOU ARE HERE |
| `nx-test-analyzer` (sub-agent) | Deep test diagnostics | When tests fail |
| `/nx-plan-migration` | Plan migrations | Before migration |

## Complete Workflow

```
Phase 2: Component Migration Workflow

1. Plan
   └─> /nx-plan-migration
       └─> Identifies components to migrate

2. Migrate
   └─> /nx-migrate-component accordion
       └─> Creates config files, updates imports

3. Validate ← YOU ARE HERE
   └─> /nx-validate-migration accordion
       └─> Checks build, test, lint
           ├─> ✅ Success → Commit
           └─> ❌ Failed → Fix & re-validate

4. (Optional) Deep Analysis
   └─> Use nx-test-analyzer subagent
       └─> Detailed diagnostics for failures

5. Commit
   └─> git add & commit
```

## Success Criteria

Validation succeeds when:

✅ All 4 config files present
✅ Path mapping exists in tsconfig.base.json
✅ Build passes (tsc --noEmit)
✅ Tests pass (at least 1 suite)
✅ Lint passes (no new errors)

If any fail → Provides specific fixes

## Architecture Notes

### Why This Skill?

**Fast health check** after migration:
- Verifies infrastructure is correct
- Confirms everything runs
- Quick pass/fail decision

### Why Not Just Run Commands?

This skill:
- Validates **all** aspects at once
- Provides **structured** pass/fail report
- Suggests **specific fixes** for failures
- **Integrates** with test analyzer
- **Tracks** what passed/failed

### Complementary Tools

```
nx-validate-migration (this skill)
├─> Quick validation (10-30s per component)
├─> Breadth: Checks everything
└─> Depth: Surface level

nx-test-analyzer (sub-agent)
├─> Deep analysis (1-2 min per component)
├─> Breadth: Tests only
└─> Depth: Comprehensive diagnostics
```

Use **both** for best results:
1. Run `nx-validate-migration` first (fast check)
2. If tests fail → Use `nx-test-analyzer` (deep dive)

## Next Steps

After validation:

### If ✅ All Passed
1. Commit changes
2. Create PR
3. Continue with next batch

### If ⚠️ Partial Success
1. Use `nx-test-analyzer` for test issues
2. Fix warnings
3. Re-validate
4. Commit when clean

### If ❌ Failed
1. Review error messages
2. Fix critical issues first
3. Use `nx-test-analyzer` for diagnostics
4. Re-validate
5. May need to re-run migration
