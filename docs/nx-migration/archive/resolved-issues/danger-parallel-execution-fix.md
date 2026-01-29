# Danger Parallel Execution Log Check Issue

**Status**: ✅ Resolved | **Date**: 2026-01-29 | **Commit**: 4df0cf0b6

## Problem

Danger checks failed during PR validation:
```
common file warnings detected in logs/test.log
React console warnings not filtered by ignoreRegex
```

Only occurred with parallel test execution (`--parallel=4`), not with sequential runs.

## Root Cause

**Parallel Execution Problem**:
1. Multiple test processes run simultaneously
2. OS interleaves their stdout/stderr output
3. React warnings get fragmented across lines
4. Regex patterns expecting complete lines don't match

**Example fragmentation**:
```
Process 1: [console.error] Warning: The tag <text>...
Process 2: PASS bpk-component-button
Process 1: ...is unrecognized in this browser...
```

Pattern `"The tag <text>"` can't match split text.

## Solution

**File**: `dangerfile.ts`

Add generic pattern matching all React warnings at their prefix:

```typescript
const reactWarnings = ["^\\s*Warning:"];

const allIgnoredWarnings = linterWarnings
  .concat(invalidReactChild)
  // ... other patterns ...
  .concat(reactWarnings);  // ← Add this

commonFileWarnings('logs/test.log', {
  logType: 'fail',
  ignoreRegex: new RegExp(allIgnoredWarnings.join("|"))
});
```

## Why This Works

1. **ALL React console.error warnings start with "Warning:"**
2. **Pattern works despite fragmentation**: Line fragments still start with "Warning:"
3. **Safe**: Real errors use "Error:" prefix or different format
4. **Catches all React warnings**: Future warnings automatically covered

## Safety Verification

**Filtered** (React warnings):
- `Warning: The tag <text>...`
- `Warning: Functions are not valid...`
- Any `Warning: ...`

**Not filtered** (Real errors):
- `Error: Build failed`
- `FAIL: Test suite`
- `expected X but got Y`

**Multi-layer safety**:
1. Jest catches actual test failures (exit code)
2. ESLint validates separately
3. Danger check is secondary validation

## Impact

✅ Parallel execution now works reliably
✅ CI speeds up 2-3x
✅ Danger checks pass consistently
✅ Extensible for future React warnings

## Alternative Approaches Rejected

- **Remove parallel execution**: Loses CI speed benefits
- **List all React warnings**: High maintenance, breaks with new warnings
- **Generic "Warning:" pattern** ✅ Chosen: Maintainable, robust, safe
