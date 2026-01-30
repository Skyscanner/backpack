---
name: nx-validate-migration
description: Validate NX component migration by checking config files, path mappings, and running build/test/lint. Use after migrating components to verify everything works correctly.
argument-hint: <component-names...>
disable-model-invocation: true
allowed-tools: Read, Bash, Glob, Grep, Task
---

## User Input

```text
$ARGUMENTS
```

## Overview

**Post-migration validation for Phase 2**

This skill validates that components were successfully migrated to NX structure by running comprehensive checks on configuration, build, test, and lint.

## When to Use

✅ **Use this skill after:**
- Running `/nx-migrate-component <name>`
- Running `/nx-migrate-batch <names...>`
- Manually creating NX configuration files
- Fixing migration issues

❌ **Don't use this skill for:**
- Deep test diagnostics (use `nx-test-analyzer` sub-agent instead)
- Planning migrations (use `/nx-plan-migration`)
- Initial infrastructure setup (use `/nx-setup-infrastructure`)

## Arguments

**Accepts one or more component names:**

```bash
# Single component
/nx-validate-migration bpk-component-accordion

# Multiple components
/nx-validate-migration bpk-component-accordion bpk-component-badge

# Short names also work
/nx-validate-migration accordion badge button
```

## Steps

### 1. Parse and Normalize Component Names

```bash
# Parse arguments into array
COMPONENTS=($ARGUMENTS)

# Normalize short names to full names
for i in "${!COMPONENTS[@]}"; do
  comp="${COMPONENTS[$i]}"
  # If doesn't start with "bpk-component-", add it
  if [[ ! "$comp" =~ ^bpk-component- ]]; then
    COMPONENTS[$i]="bpk-component-$comp"
  fi
done

echo "Validating ${#COMPONENTS[@]} component(s)..."
```

### 2. For Each Component, Run Validation Checks

For each component, perform these validations:

#### A. Verify Component Exists

```bash
COMP_DIR="packages/$COMPONENT"

if [ ! -d "$COMP_DIR" ]; then
  echo "❌ Component directory not found: $COMP_DIR"
  FAILED+=("$COMPONENT: Directory not found")
  continue
fi
```

#### B. Check Configuration Files

**Required files:**

```bash
# Check package.json exists and has "nx" field
if [ ! -f "$COMP_DIR/package.json" ]; then
  echo "❌ Missing: package.json"
  ISSUES+=("$COMPONENT: Missing package.json")
elif ! grep -q '"nx"' "$COMP_DIR/package.json"; then
  echo "❌ Missing: NX configuration in package.json"
  ISSUES+=("$COMPONENT: No NX config in package.json")
else
  echo "✅ package.json with NX config"
fi

# Check jest.config.js
if [ ! -f "$COMP_DIR/jest.config.js" ]; then
  echo "❌ Missing: jest.config.js"
  ISSUES+=("$COMPONENT: Missing jest.config.js")
else
  echo "✅ jest.config.js"
fi

# Check tsconfig.json
if [ ! -f "$COMP_DIR/tsconfig.json" ]; then
  echo "❌ Missing: tsconfig.json"
  ISSUES+=("$COMPONENT: Missing tsconfig.json")
else
  echo "✅ tsconfig.json"
fi

# Check .eslintrc.json
if [ ! -f "$COMP_DIR/.eslintrc.json" ]; then
  echo "❌ Missing: .eslintrc.json"
  ISSUES+=("$COMPONENT: Missing .eslintrc.json")
else
  echo "✅ .eslintrc.json"
fi
```

#### C. Verify Path Mapping in tsconfig.base.json

**Extract package name and verify alias:**

```bash
# Get package name from package.json
PKG_NAME=$(node -pe "require('./$COMP_DIR/package.json').name || ''" 2>/dev/null)

if [ -z "$PKG_NAME" ]; then
  echo "⚠️ Could not read package name"
  ISSUES+=("$COMPONENT: Cannot read package name")
else
  echo "Package name: $PKG_NAME"

  # Check if path mapping exists in tsconfig.base.json
  if grep -q "\"$PKG_NAME\"" tsconfig.base.json; then
    echo "✅ Path mapping exists for $PKG_NAME"
  else
    echo "❌ Missing path mapping for $PKG_NAME in tsconfig.base.json"
    ISSUES+=("$COMPONENT: Missing path mapping in tsconfig.base.json")
  fi
fi
```

#### D. Validate Build (Type-Checking)

```bash
echo ""
echo "Running build (type-checking)..."

# Extract short name for NX command
SHORT_NAME=$(echo "$COMPONENT" | sed 's/^bpk-component-//')

# Run build with timeout
if timeout 60s npx nx build @backpack/$SHORT_NAME 2>&1 | tee /tmp/build-$SHORT_NAME.log; then
  echo "✅ Build passed"
  BUILD_PASSED+=("$COMPONENT")
else
  EXIT_CODE=$?
  echo "❌ Build failed (exit code: $EXIT_CODE)"

  # Capture error summary
  ERROR_SUMMARY=$(tail -20 /tmp/build-$SHORT_NAME.log)
  BUILD_FAILED+=("$COMPONENT: Build failed\n$ERROR_SUMMARY")
fi
```

#### E. Validate Tests

```bash
echo ""
echo "Running tests..."

# Run tests with timeout
if timeout 120s npx nx test @backpack/$SHORT_NAME --no-cache 2>&1 | tee /tmp/test-$SHORT_NAME.log; then
  # Check if tests actually ran (not 0 tests)
  if grep -q "Test Suites:.*passed" /tmp/test-$SHORT_NAME.log; then
    SUITE_COUNT=$(grep "Test Suites:" /tmp/test-$SHORT_NAME.log | grep -o '[0-9]* passed' | head -1 | cut -d' ' -f1)
    TEST_COUNT=$(grep "Tests:" /tmp/test-$SHORT_NAME.log | grep -o '[0-9]* passed' | head -1 | cut -d' ' -f1)
    echo "✅ Tests passed ($SUITE_COUNT suites, $TEST_COUNT tests)"
    TEST_PASSED+=("$COMPONENT: $SUITE_COUNT suites, $TEST_COUNT tests")
  else
    echo "❌ Tests failed or no tests found"
    ERROR_SUMMARY=$(tail -20 /tmp/test-$SHORT_NAME.log)
    TEST_FAILED+=("$COMPONENT: Tests failed\n$ERROR_SUMMARY")
  fi
else
  EXIT_CODE=$?
  echo "❌ Tests failed (exit code: $EXIT_CODE)"

  # Check for "No tests found" error
  if grep -q "No tests found" /tmp/test-$SHORT_NAME.log; then
    echo "⚠️ Issue: No tests found - likely testMatch pattern problem"
    TEST_FAILED+=("$COMPONENT: No tests found (pattern mismatch)")
  else
    ERROR_SUMMARY=$(tail -20 /tmp/test-$SHORT_NAME.log)
    TEST_FAILED+=("$COMPONENT: Tests failed\n$ERROR_SUMMARY")
  fi
fi
```

#### F. Validate Lint

```bash
echo ""
echo "Running lint..."

# Run lint with timeout
if timeout 60s npx nx lint @backpack/$SHORT_NAME 2>&1 | tee /tmp/lint-$SHORT_NAME.log; then
  echo "✅ Lint passed"
  LINT_PASSED+=("$COMPONENT")
else
  EXIT_CODE=$?
  echo "❌ Lint failed (exit code: $EXIT_CODE)"

  # Count errors
  ERROR_COUNT=$(grep -c "error" /tmp/lint-$SHORT_NAME.log || echo "0")
  LINT_FAILED+=("$COMPONENT: $ERROR_COUNT lint errors")
fi
```

### 3. Generate Validation Report

After checking all components, generate comprehensive report:

```markdown
## NX Migration Validation Report

**Validated:** ${#COMPONENTS[@]} component(s)

---

### Summary

| Check | Passed | Failed | Status |
|-------|--------|--------|--------|
| **Config Files** | X | Y | ✅/❌ |
| **Path Mappings** | X | Y | ✅/❌ |
| **Build** | ${#BUILD_PASSED[@]} | ${#BUILD_FAILED[@]} | ✅/❌ |
| **Tests** | ${#TEST_PASSED[@]} | ${#TEST_FAILED[@]} | ✅/❌ |
| **Lint** | ${#LINT_PASSED[@]} | ${#LINT_FAILED[@]} | ✅/❌ |

**Overall Status:** ✅ SUCCESS / ⚠️ PARTIAL / ❌ FAILED

---

### Components Validated

#### ✅ Fully Passing (X components)
[List components where all checks passed]

#### ⚠️ Partial Success (Y components)
[List components with some failures]

#### ❌ Failed (Z components)
[List components with critical failures]

---

### Issues Found

#### Critical Issues (Must Fix)

**bpk-component-X:**
- ❌ Missing jest.config.js
- ❌ Tests: No tests found (pattern mismatch)

**Recommended action:** [specific fix]

#### Warnings (Should Fix)

**bpk-component-Y:**
- ⚠️ Lint: 3 warnings

---

### Detailed Results

#### bpk-component-accordion
- ✅ Config files: All present
- ✅ Path mapping: @backpack/accordion
- ✅ Build: Type-checking passed
- ✅ Tests: 5 suites, 20 tests passed
- ✅ Lint: No errors

#### bpk-component-barchart
- ✅ Config files: All present
- ✅ Path mapping: @backpack/barchart
- ✅ Build: Type-checking passed
- ❌ Tests: No tests found
- ✅ Lint: No errors

**Issue:** testMatch pattern doesn't match test file extensions

---

### Recommendations

#### If Tests Failed
Run detailed test analysis:
```bash
# Use nx-test-analyzer sub-agent for deep diagnostics
Use the nx-test-analyzer subagent to analyze bpk-component-barchart
```

#### If Build Failed
Check TypeScript errors:
```bash
npx nx build @backpack/barchart --verbose
```

#### If Lint Failed
Run lint with details:
```bash
npx nx lint @backpack/barchart --format=stylish
```

---

### Next Steps

**If all checks passed (✅ SUCCESS):**
1. Commit migration changes
2. Create pull request
3. Continue with next batch

**If some checks failed (⚠️ PARTIAL):**
1. Fix critical issues first (config files, path mappings)
2. Use `nx-test-analyzer` for test issues
3. Re-run validation: `/nx-validate-migration <components>`

**If validation failed (❌ FAILED):**
1. Review error messages above
2. Fix configuration issues
3. Consider using `nx-test-analyzer` for detailed diagnostics
4. Re-run migration if necessary

---

### Verification Commands

```bash
# Re-validate after fixes
/nx-validate-migration bpk-component-accordion bpk-component-barchart

# Test individual component
npx nx test @backpack/accordion --verbose

# Deep test analysis
Use the nx-test-analyzer subagent to analyze [component-name]

# View dependency graph
npx nx graph
```
```

### 4. Suggest Deep Analysis for Failed Tests

If any tests failed, suggest using the nx-test-analyzer sub-agent:

```bash
if [ ${#TEST_FAILED[@]} -gt 0 ]; then
  echo ""
  echo "================================================"
  echo "⚠️ Some tests failed"
  echo "================================================"
  echo ""
  echo "For detailed test configuration analysis, use:"
  echo ""
  for comp in "${TEST_FAILED[@]}"; do
    comp_name=$(echo "$comp" | cut -d: -f1)
    echo "  Use the nx-test-analyzer subagent to analyze $comp_name"
  done
  echo ""
  echo "The test analyzer will:"
  echo "  - Analyze Jest configuration"
  echo "  - Check testMatch patterns"
  echo "  - Identify test file mismatches"
  echo "  - Provide specific fixes"
fi
```

## Output Format

The validation report should be structured with:

1. **Summary Table** - Quick overview of pass/fail counts
2. **Overall Status** - SUCCESS / PARTIAL / FAILED
3. **Issues Found** - Grouped by severity (critical, warnings)
4. **Detailed Results** - Per-component breakdown
5. **Recommendations** - Next steps based on results
6. **Verification Commands** - How to fix and re-validate

## Error Handling

### Component Not Found

```bash
if [ ! -d "packages/$COMPONENT" ]; then
  echo "❌ Error: Component not found: packages/$COMPONENT"
  echo ""
  echo "Available components:"
  ls -d packages/bpk-component-* | head -10
  continue
fi
```

### NX Command Timeout

```bash
# Use timeout to prevent hanging
timeout 60s npx nx build @backpack/$SHORT_NAME

if [ $? -eq 124 ]; then
  echo "❌ Build timed out after 60s"
  echo "This may indicate an infinite loop or hanging process"
fi
```

### Invalid Package.json

```bash
PKG_NAME=$(node -pe "require('./package.json').name" 2>/dev/null)
if [ $? -ne 0 ]; then
  echo "❌ Error: Invalid package.json - cannot parse"
fi
```

## Integration with Other Tools

### With nx-test-analyzer Sub-agent

If tests fail, automatically suggest using the sub-agent:

```
Tests failed for bpk-component-barchart

For detailed analysis, run:
  Use the nx-test-analyzer subagent to analyze bpk-component-barchart
```

### With nx-migrate-component

After migration completes:

```bash
/nx-migrate-component bpk-component-accordion
# Migration complete!

/nx-validate-migration bpk-component-accordion
# ✅ All checks passed!
```

### With nx-migrate-batch

After batch migration:

```bash
/nx-migrate-batch accordion badge button
# Batch complete: 3/3 successful

/nx-validate-migration accordion badge button
# Validating 3 components...
# ✅ 3/3 passed all checks
```

## Success Criteria

Validation is **successful** when:

✅ All config files exist (package.json, jest.config.js, tsconfig.json, .eslintrc.json)
✅ Path mapping exists in tsconfig.base.json
✅ Build passes (no TypeScript errors)
✅ Tests pass (at least 1 test suite runs)
✅ Lint passes (no new errors)

Validation is **partial** when:

⚠️ Config files exist but some checks fail
⚠️ Tests or lint have warnings but no critical errors

Validation **fails** when:

❌ Missing required config files
❌ Missing path mapping
❌ Build fails with TypeScript errors
❌ Tests: 0 tests found or critical failures

## Notes

- **Fast validation**: Focuses on quick checks, not deep analysis
- **Actionable**: Always provides specific next steps
- **Complementary**: Works with nx-test-analyzer for deep diagnostics
- **Batch-friendly**: Can validate multiple components at once
- **Integration-ready**: Designed to work in migration workflow

## Related Skills

- `/nx-migrate-component` - Migrate single component (run before this)
- `/nx-migrate-batch` - Batch migration (run before this)
- `nx-test-analyzer` (sub-agent) - Deep test diagnostics (use after if tests fail)
- `/nx-plan-migration` - Planning and readiness check
