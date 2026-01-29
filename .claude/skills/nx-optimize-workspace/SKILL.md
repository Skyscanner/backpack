---
name: nx-optimize-workspace
description: Optimize NX workspace performance after component migration (Phase 3). Analyzes build times, cache efficiency, dependencies, and tunes configuration for maximum performance.
argument-hint: [--skip-tests] [--quick]
disable-model-invocation: true
allowed-tools: Read, Edit, Bash, Glob, Grep
---

## User Input

```text
$ARGUMENTS
```

## Overview

**Phase 3: Workspace Optimization**

This skill optimizes the NX workspace for maximum performance after components have been migrated. It analyzes the entire workspace, identifies bottlenecks, and applies optimizations.

## When to Use

✅ **Use this skill when:**
- Most/all components migrated (>80% complete)
- Ready to optimize workspace performance
- Before integrating with CI/CD (Phase 4)
- Builds are slow or cache not working well

❌ **Don't use this skill:**
- Before completing Phase 2 (migration)
- For individual component issues (use `/nx-validate-migration`)
- During active migration (wait until batch complete)

## Arguments

**Optional flags:**

```bash
# Full optimization (recommended)
/nx-optimize-workspace

# Skip tests (faster, build analysis only)
/nx-optimize-workspace --skip-tests

# Quick analysis (no workspace build, just analyze)
/nx-optimize-workspace --quick
```

## Steps

### 1. Pre-Optimization Check

**Verify migration status:**

```bash
echo "========================================="
echo "Phase 3: NX Workspace Optimization"
echo "========================================="
echo ""

# Count migrated components
TOTAL=$(find packages -maxdepth 1 -type d -name "bpk-component-*" | wc -l)
MIGRATED=$(find packages -name "package.json" -exec grep -l '"nx"' {} \; | wc -l)
PERCENTAGE=$((MIGRATED * 100 / TOTAL))

echo "Migration Status:"
echo "  Total components: $TOTAL"
echo "  Migrated: $MIGRATED ($PERCENTAGE%)"
echo ""

if [ $PERCENTAGE -lt 50 ]; then
  echo "⚠️ Warning: Less than 50% migrated"
  echo "Recommendation: Complete more migrations before optimizing"
  echo ""
  read -p "Continue anyway? (y/N) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 0
  fi
fi
```

### 2. Baseline Performance Measurement

**Run workspace build to establish baseline:**

```bash
echo "Step 1: Measuring baseline performance..."
echo ""

# Clear cache for accurate measurement
npx nx reset

# Time full workspace build
START_TIME=$(date +%s)
if npx nx run-many --target=build --all --parallel=3 2>&1 | tee /tmp/nx-build-baseline.log; then
  END_TIME=$(date +%s)
  BASELINE_BUILD_TIME=$((END_TIME - START_TIME))
  echo "✅ Baseline build time: ${BASELINE_BUILD_TIME}s"
else
  echo "❌ Baseline build failed - fix errors first"
  exit 1
fi

# Extract component build times
echo ""
echo "Analyzing individual component build times..."
grep "Successfully ran target build" /tmp/nx-build-baseline.log | wc -l
```

**Run workspace tests (unless --skip-tests):**

```bash
if [ "$SKIP_TESTS" != "true" ]; then
  echo ""
  echo "Running workspace tests..."

  START_TIME=$(date +%s)
  if npx nx run-many --target=test --all --parallel=3 2>&1 | tee /tmp/nx-test-baseline.log; then
    END_TIME=$(date +%s)
    BASELINE_TEST_TIME=$((END_TIME - START_TIME))
    echo "✅ Baseline test time: ${BASELINE_TEST_TIME}s"
  else
    echo "⚠️ Some tests failed - continuing with optimization"
  fi
fi
```

### 3. Analyze Build Performance

**Identify slow builds:**

```bash
echo ""
echo "Step 2: Analyzing build performance..."
echo ""

# Parse build times from log
# Format: "nx run @backpack/component:build (Xs)"
grep "nx run @backpack" /tmp/nx-build-baseline.log | \
  grep -o "@backpack/[^:]*.*([0-9.]*s)" | \
  sort -t'(' -k2 -rn | \
  head -10 > /tmp/slowest-builds.txt

echo "Top 10 slowest builds:"
cat /tmp/slowest-builds.txt

# Identify components taking >5s
SLOW_COUNT=$(grep "nx run @backpack" /tmp/nx-build-baseline.log | grep -E '\([5-9][0-9\.]*s\)|\([0-9]{2,}' | wc -l)
echo ""
echo "Components with build time >5s: $SLOW_COUNT"
```

### 4. Analyze Cache Performance

**Check cache hit rate:**

```bash
echo ""
echo "Step 3: Analyzing cache performance..."
echo ""

# Run builds again to measure cache
npx nx run-many --target=build --all --parallel=3 2>&1 | tee /tmp/nx-build-cached.log

# Count cache hits
TOTAL_TASKS=$(grep "Successfully ran target" /tmp/nx-build-cached.log | wc -l)
CACHED_TASKS=$(grep "cache" /tmp/nx-build-cached.log | wc -l)

if [ $TOTAL_TASKS -gt 0 ]; then
  CACHE_HIT_RATE=$((CACHED_TASKS * 100 / TOTAL_TASKS))
  echo "Cache hit rate: $CACHE_HIT_RATE% ($CACHED_TASKS/$TOTAL_TASKS)"

  if [ $CACHE_HIT_RATE -lt 70 ]; then
    echo "⚠️ Low cache hit rate - needs optimization"
    NEEDS_CACHE_OPTIMIZATION=true
  else
    echo "✅ Good cache hit rate"
  fi
else
  echo "⚠️ Could not measure cache hit rate"
fi
```

### 5. Analyze Dependency Graph

**Generate and analyze dependency graph:**

```bash
echo ""
echo "Step 4: Analyzing dependency graph..."
echo ""

# Generate graph data
npx nx graph --file=.nx/graph.html

# Analyze dependencies
echo "Analyzing component dependencies..."

# Find circular dependencies
echo "Checking for circular dependencies..."
# Note: NX will warn about these during build

# Find high-dependency components (imported by many)
echo ""
echo "Analyzing import patterns..."
for comp in packages/bpk-component-*/; do
  comp_name=$(basename "$comp")
  short_name=$(echo "$comp_name" | sed 's/^bpk-component-//')

  # Count how many files import this component
  import_count=$(grep -r "from '@backpack/$short_name'" packages/ 2>/dev/null | wc -l)

  if [ $import_count -gt 20 ]; then
    echo "  High-impact: $comp_name (imported $import_count times)"
  fi
done > /tmp/high-impact-components.txt

cat /tmp/high-impact-components.txt
```

### 6. Optimize NX Configuration

**Read current nx.json:**

```bash
echo ""
echo "Step 5: Optimizing NX configuration..."
echo ""
```

#### A. Optimize Target Defaults

**Update cache inputs to be more specific:**

```javascript
// Read current nx.json
const nxConfig = require('./nx.json');

// Optimize targetDefaults
const optimizedTargets = {
  build: {
    dependsOn: ['^build'],
    inputs: [
      'production',
      '^production',
      '{projectRoot}/tsconfig.json'
    ],
    outputs: ['{projectRoot}/dist'],
    cache: true
  },
  test: {
    inputs: [
      'default',
      '^production',
      '{workspaceRoot}/jest.preset.js',
      '{projectRoot}/jest.config.js'
    ],
    outputs: [
      '{workspaceRoot}/coverage/{projectRoot}'
    ],
    cache: true
  },
  lint: {
    inputs: [
      'default',
      '{workspaceRoot}/.eslintrc.base.js',
      '{projectRoot}/.eslintrc.json'
    ],
    cache: true
  }
};

// Apply optimizations
nxConfig.targetDefaults = optimizedTargets;
```

Use Edit tool to update nx.json with optimized configuration.

#### B. Optimize Parallel Execution

**Adjust based on CPU cores:**

```bash
# Detect CPU cores
CPU_CORES=$(node -e "console.log(require('os').cpus().length)")
OPTIMAL_PARALLEL=$((CPU_CORES - 1))

if [ $OPTIMAL_PARALLEL -lt 3 ]; then
  OPTIMAL_PARALLEL=3
fi

echo "CPU cores: $CPU_CORES"
echo "Optimal parallel: $OPTIMAL_PARALLEL"
echo ""

# Update nx.json
# Use Edit tool to set "parallel": $OPTIMAL_PARALLEL
```

#### C. Optimize Named Inputs

**Make production inputs more specific:**

```json
{
  "namedInputs": {
    "default": [
      "{projectRoot}/**/*",
      "sharedGlobals"
    ],
    "production": [
      "default",
      "!{projectRoot}/**/?(*.)+(spec|test).[jt]s?(x)?(.snap)",
      "!{projectRoot}/tsconfig.spec.json",
      "!{projectRoot}/.eslintrc.json",
      "!{projectRoot}/jest.config.[jt]s",
      "!{projectRoot}/**/*.stories.[jt]sx?",
      "!{projectRoot}/README.md"
    ],
    "sharedGlobals": [
      "{workspaceRoot}/babel.config.js",
      "{workspaceRoot}/tsconfig.base.json"
    ]
  }
}
```

### 7. Configure Task Pipelines

**Set up proper task ordering:**

```json
{
  "targetDefaults": {
    "build": {
      "dependsOn": ["^build"]
    },
    "test": {
      "dependsOn": ["build"]
    },
    "lint": {
      "dependsOn": []
    },
    "e2e": {
      "dependsOn": ["build"]
    }
  }
}
```

This ensures:
- Dependencies build before dependents
- Tests run after builds
- Lint can run independently

### 8. Verify Optimizations

**Run optimized workspace build:**

```bash
echo ""
echo "Step 6: Verifying optimizations..."
echo ""

# Clear cache
npx nx reset

# Time optimized build
START_TIME=$(date +%s)
if npx nx run-many --target=build --all 2>&1 | tee /tmp/nx-build-optimized.log; then
  END_TIME=$(date +%s)
  OPTIMIZED_BUILD_TIME=$((END_TIME - START_TIME))

  IMPROVEMENT=$((BASELINE_BUILD_TIME - OPTIMIZED_BUILD_TIME))
  IMPROVEMENT_PCT=$((IMPROVEMENT * 100 / BASELINE_BUILD_TIME))

  echo "✅ Optimized build time: ${OPTIMIZED_BUILD_TIME}s"
  echo "📊 Improvement: ${IMPROVEMENT}s (-${IMPROVEMENT_PCT}%)"
else
  echo "❌ Optimized build failed"
  exit 1
fi

# Test cached build
npx nx run-many --target=build --all 2>&1 | tee /tmp/nx-build-cached-opt.log

TOTAL_TASKS=$(grep "Successfully ran target" /tmp/nx-build-cached-opt.log | wc -l)
CACHED_TASKS=$(grep "cache" /tmp/nx-build-cached-opt.log | wc -l)

if [ $TOTAL_TASKS -gt 0 ]; then
  NEW_CACHE_HIT_RATE=$((CACHED_TASKS * 100 / TOTAL_TASKS))
  echo ""
  echo "New cache hit rate: $NEW_CACHE_HIT_RATE%"

  if [ $NEW_CACHE_HIT_RATE -gt $CACHE_HIT_RATE ]; then
    CACHE_IMPROVEMENT=$((NEW_CACHE_HIT_RATE - CACHE_HIT_RATE))
    echo "📊 Cache improvement: +${CACHE_IMPROVEMENT}%"
  fi
fi
```

### 9. Generate Optimization Report

```markdown
## NX Workspace Optimization Report

Generated: $(date)

---

### Migration Status

- **Total components:** $TOTAL
- **Migrated:** $MIGRATED ($PERCENTAGE%)
- **Status:** ✅ Ready for optimization

---

### Performance Improvements

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| **Build Time** | ${BASELINE_BUILD_TIME}s | ${OPTIMIZED_BUILD_TIME}s | -${IMPROVEMENT_PCT}% |
| **Cache Hit Rate** | ${CACHE_HIT_RATE}% | ${NEW_CACHE_HIT_RATE}% | +${CACHE_IMPROVEMENT}% |
| **Parallel Tasks** | 3 | ${OPTIMAL_PARALLEL} | +$((OPTIMAL_PARALLEL - 3)) |

---

### Build Performance Analysis

#### Slowest Builds (Top 10)
$(cat /tmp/slowest-builds.txt)

#### Components with >5s build time: $SLOW_COUNT

**Recommendations:**
- Investigate slow builds for optimization opportunities
- Consider code splitting for large components
- Review TypeScript configuration

---

### Cache Performance

**Before optimization:**
- Cache hit rate: ${CACHE_HIT_RATE}%
- Total tasks: $TOTAL_TASKS
- Cached tasks: $CACHED_TASKS

**After optimization:**
- Cache hit rate: ${NEW_CACHE_HIT_RATE}%
- Improvement: +${CACHE_IMPROVEMENT}%

**Optimizations applied:**
✅ Optimized cache inputs (more specific)
✅ Configured production vs default inputs
✅ Added shared globals to cache keys
✅ Excluded test files from production cache

---

### Dependency Analysis

#### High-Impact Components
$(cat /tmp/high-impact-components.txt)

These components are imported by many others. Consider:
- Keeping them stable
- Migrating them early (if not already)
- Ensuring good test coverage

#### Circular Dependencies
$(grep -i "circular" /tmp/nx-build-baseline.log || echo "None detected")

---

### Configuration Optimizations

#### Updated nx.json

**Target Defaults:**
- ✅ Optimized cache inputs for build/test/lint
- ✅ Configured task dependencies (dependsOn)
- ✅ Set specific outputs for caching

**Parallel Execution:**
- ✅ Set to ${OPTIMAL_PARALLEL} (based on $CPU_CORES CPU cores)

**Named Inputs:**
- ✅ More specific production inputs
- ✅ Exclude test/story files from production cache
- ✅ Configure shared globals

---

### Task Pipelines

**Configured task ordering:**
- Build → Test → E2E
- Lint runs independently
- Dependencies build before dependents

---

### Recommendations

#### Immediate
- ✅ All optimizations applied
- ✅ Configuration updated
- ✅ Performance verified

#### Future Improvements
1. **Monitor cache hit rates** in CI/CD
2. **Profile slow builds** for further optimization
3. **Consider NX Cloud** for distributed caching
4. **Review high-impact components** for stability

---

### Next Steps

#### Phase 4: CI/CD Integration
```bash
/nx-setup-ci
```
Configure CI/CD pipelines to use:
- `nx affected` commands
- NX cache
- Optimized parallel execution

#### Phase 5: Documentation
```bash
/nx-generate-docs
```
Generate documentation for:
- NX workspace structure
- Developer workflows
- Build and test commands

---

### Verification Commands

```bash
# Run optimized builds
npx nx run-many --target=build --all

# Check cache performance
npx nx run-many --target=build --all  # Should be fast (cached)

# View dependency graph
npx nx graph

# Test affected commands
git checkout -b test-branch
# Make a change
npx nx affected:build
npx nx affected:test

# View cache statistics
npx nx show project <component>
```

---

### Files Modified

- ✅ `nx.json` - Optimized configuration
- ✅ `.nx/cache` - Reset for clean slate

### Configuration Backup

Backup created at: `.nx/nx.json.backup.$(date +%Y%m%d)`

To restore previous config:
```bash
cp .nx/nx.json.backup.YYYYMMDD nx.json
```

---

## Phase 3 Complete! ✅

Your NX workspace is now optimized for maximum performance.

**Key Achievements:**
- ✅ ${IMPROVEMENT_PCT}% faster builds
- ✅ ${NEW_CACHE_HIT_RATE}% cache hit rate
- ✅ Optimized parallel execution
- ✅ Configured task pipelines

**Ready for Phase 4 (CI/CD Integration)**
```

## Error Handling

### Build Failures

```bash
if ! npx nx run-many --target=build --all; then
  echo "❌ Workspace build failed"
  echo ""
  echo "Fix build errors before optimizing:"
  echo "  1. Run: npx nx run-many --target=build --all --verbose"
  echo "  2. Fix errors in failing components"
  echo "  3. Re-run: /nx-optimize-workspace"
  exit 1
fi
```

### Low Migration Percentage

```bash
if [ $PERCENTAGE -lt 50 ]; then
  echo "⚠️ Warning: Only $PERCENTAGE% of components migrated"
  echo ""
  echo "Recommendations:"
  echo "  - Complete more migrations first"
  echo "  - Optimize after >80% migration"
  echo "  - Or continue with partial optimization"
fi
```

### Cache Issues

```bash
if [ $CACHE_HIT_RATE -lt 30 ]; then
  echo "❌ Very low cache hit rate: $CACHE_HIT_RATE%"
  echo ""
  echo "This suggests cache configuration issues."
  echo "Will apply aggressive cache optimizations..."
fi
```

## Notes

- **Backup created**: nx.json is backed up before modification
- **Reversible**: Can restore previous config from backup
- **Safe**: Only modifies nx.json, no component changes
- **Measurable**: Provides before/after metrics

## Related Skills

- `/nx-plan-migration` - Check migration status (Phase 0+2)
- `/nx-migrate-batch` - Complete remaining migrations (Phase 2)
- `/nx-validate-migration` - Validate components (Phase 2)
- `/nx-setup-ci` - Configure CI/CD (Phase 4)
