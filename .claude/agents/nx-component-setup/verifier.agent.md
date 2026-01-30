---
name: nx-setup-verifier
description: Verify Nx project setup by running validation commands and generating reports
---

# Verifier Agent: Nx Component Setup

Run validation commands to verify the Nx project setup is correct and complete.

## Purpose

After migration scripts have been executed, verify that all configurations are correct and the setup works as expected.

## Inputs

- `analysis.json` from Scout (expected counts)
- Executed migration (project.json and tsconfig files exist)

## Outputs

Generate `verification-report.md`:

```markdown
# Nx Setup Verification Report

**Date**: 2026-01-30
**Status**: PASS / FAIL

## Summary

| Check | Expected | Actual | Status |
|-------|----------|--------|--------|
| Project count | 98 | 98 | ✅ |
| tsconfig.json | 97 | 97 | ✅ |
| nx graph | loads | loads | ✅ |
| nx affected | works | works | ✅ |
| npm test | pass | pass | ✅ |

## Details

### Project Detection
...

### Dependency Graph
...

### Affected Detection
...

### Regression Tests
...

## Issues Found
- None / List of issues

## Recommendations
- Next steps
```

## Verification Checks

### 1. Project Count

```bash
# Expected: matches analysis.json totalPackages
npx nx show projects | wc -l
```

### 2. Configuration Files

```bash
# project.json count
find packages -name "project.json" | wc -l

# tsconfig.json count (exclude sass-only)
find packages -name "tsconfig.json" -path "*/bpk-*" | wc -l

# tsconfig.lib.json count
find packages -name "tsconfig.lib.json" | wc -l

# tsconfig.spec.json count
find packages -name "tsconfig.spec.json" | wc -l
```

### 3. Nx Graph

```bash
# Should complete without error
npx nx graph --file=graph.json

# Check for circular dependencies
grep -c '"circular"' graph.json || echo "0"
```

### 4. Affected Detection

```bash
# Test 1: Touch utility, verify cascade
touch packages/bpk-react-utils/src/cssModules.ts
npx nx affected --target=build --base=HEAD~1
# Should list bpk-react-utils + dependents

# Test 2: Touch leaf component, verify isolation
git checkout packages/bpk-react-utils/src/cssModules.ts
touch packages/bpk-component-badge/src/BpkBadge.tsx
npx nx affected --target=build --base=HEAD~1
# Should list only bpk-component-badge

# Cleanup
git checkout .
```

### 5. Regression Tests

```bash
# All must pass
npm run build
npm test
npm run lint
npm run typecheck
```

### 6. Special Case Validation

```bash
# bpk-mixins: no tsconfig files
ls packages/bpk-mixins/tsconfig*.json 2>/dev/null && echo "FAIL" || echo "PASS"

# bpk-stylesheets: has custom build target
grep -q '"build"' packages/bpk-stylesheets/project.json && echo "PASS" || echo "FAIL"
```

## Validation Matrix

| Package Type | project.json | tsconfig.json | tsconfig.lib.json | tsconfig.spec.json |
|--------------|--------------|---------------|-------------------|-------------------|
| component | ✅ | ✅ | ✅ | ✅ |
| utility | ✅ | ✅ | ✅ | ✅ |
| sass-only | ✅ | ❌ | ❌ | ❌ |
| custom-build | ✅ (custom) | ✅ | ✅ | ✅ |

## Error Handling

If verification fails:

1. **Project count mismatch**
   - Re-run Scout to update analysis.json
   - Re-run Migrator to regenerate scripts

2. **nx graph fails**
   - Check for malformed project.json
   - Verify JSON syntax: `node -e "require('./packages/PKG/project.json')"`

3. **Affected detection wrong**
   - Check dependency analysis
   - Verify import statements are being parsed

4. **Regression test fails**
   - Restore from backup: `cp nx-setup-output/nx.json.backup nx.json`
   - Remove generated files: `find packages -name "project.json" -delete`

## Exit Criteria

All checks must pass:

- [ ] Project count matches expected
- [ ] All config files exist
- [ ] nx graph loads successfully
- [ ] nx affected works correctly
- [ ] All npm scripts pass
- [ ] No circular dependencies (or documented)
- [ ] Special cases handled correctly
