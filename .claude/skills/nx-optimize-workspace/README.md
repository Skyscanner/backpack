# NX Workspace Optimization Skill (Phase 3)

Optimize NX workspace performance after migrating components. Analyzes builds, improves caching, tunes parallelization, and configures task pipelines.

## Usage

```bash
# Full optimization (recommended)
/nx-optimize-workspace

# Skip tests (faster, build-only)
/nx-optimize-workspace --skip-tests

# Quick analysis only (no builds)
/nx-optimize-workspace --quick
```

## What It Does

This skill performs comprehensive workspace optimization:

### 1. Performance Baseline 📊
- Measures current build times
- Measures test execution times
- Establishes performance metrics

### 2. Build Analysis 🔍
- Identifies slowest builds (top 10)
- Finds components taking >5s
- Analyzes build patterns

### 3. Cache Optimization ⚡
- Measures cache hit rate
- Optimizes cache inputs
- Configures production vs default inputs
- Improves cache efficiency

### 4. Dependency Analysis 🕸️
- Generates dependency graph
- Identifies circular dependencies
- Finds high-impact components
- Analyzes import patterns

### 5. Configuration Tuning ⚙️
- Optimizes `targetDefaults` in nx.json
- Configures task pipelines
- Adjusts parallel execution
- Sets specific cache inputs/outputs

### 6. Performance Verification ✅
- Runs optimized builds
- Measures improvements
- Validates cache performance
- Generates before/after report

## When to Use

✅ **Use after:**
- Most components migrated (>80%)
- Phase 2 nearly complete
- Ready for production use

✅ **Use before:**
- Integrating with CI/CD (Phase 4)
- Going to production
- Team-wide rollout

❌ **Don't use:**
- During active migration
- With <50% migration complete
- For individual component issues

## Example Output

```
## NX Workspace Optimization Report

### Performance Improvements

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Build Time | 45s | 28s | -38% |
| Cache Hit Rate | 45% | 78% | +33% |
| Parallel Tasks | 3 | 5 | +2 |

### Slowest Builds

1. @backpack/icon (15.2s)
2. @backpack/spinner (12.8s)
3. @backpack/barchart (8.5s)
...

### Cache Performance

Before: 45% hit rate (18/40 cached)
After: 78% hit rate (31/40 cached)

Optimizations applied:
✅ Specific cache inputs
✅ Exclude test files from production cache
✅ Configure shared globals

### Configuration Changes

Updated nx.json:
- Optimized targetDefaults
- Parallel execution: 3 → 5
- More specific cache inputs

Phase 3 Complete! ✅
```

## Optimizations Applied

### 1. Cache Input Optimization

**Before:**
```json
{
  "build": {
    "inputs": ["default"]
  }
}
```

**After:**
```json
{
  "build": {
    "inputs": [
      "production",
      "^production",
      "{projectRoot}/tsconfig.json"
    ],
    "outputs": ["{projectRoot}/dist"]
  }
}
```

**Benefit**: More specific inputs = better cache hits

### 2. Named Inputs

**Before:**
```json
{
  "production": ["default", "!{projectRoot}/**/*.test.*"]
}
```

**After:**
```json
{
  "production": [
    "default",
    "!{projectRoot}/**/?(*.)+(spec|test).[jt]s?(x)?(.snap)",
    "!{projectRoot}/**/*.stories.[jt]sx?",
    "!{projectRoot}/README.md"
  ]
}
```

**Benefit**: Excludes more non-production files from cache

### 3. Parallel Execution

**Before:**
```json
{
  "parallel": 3
}
```

**After:**
```json
{
  "parallel": 5  // Based on CPU cores
}
```

**Benefit**: Better CPU utilization

### 4. Task Pipelines

**Before:**
```json
{
  "build": {}
}
```

**After:**
```json
{
  "build": {
    "dependsOn": ["^build"]
  },
  "test": {
    "dependsOn": ["build"]
  }
}
```

**Benefit**: Proper task ordering, parallel where possible

## Performance Impact

### Expected Improvements

Based on typical NX workspaces:

**Build Time:**
- Small workspace (<20 components): 20-30% faster
- Medium workspace (20-50 components): 30-40% faster
- Large workspace (>50 components): 40-50% faster

**Cache Hit Rate:**
- Initial run: 0% (cold cache)
- Second run: 70-85% (with optimizations)
- Subsequent runs: 80-95% (with proper cache)

**Test Time:**
- With cache: 50-70% faster
- Parallel execution: 30-40% faster

## Workflow Integration

### Complete Phase 1-3 Workflow

```bash
# PHASE 1: Setup
/nx-setup-infrastructure
# ✅ NX installed and configured

# PHASE 2: Migration
/nx-migrate-batch accordion badge button card ...
# ... migrate 90 more components ...

/nx-plan-migration
# Output: 94/97 migrated (97%)

# PHASE 3: Optimization ← YOU ARE HERE
/nx-optimize-workspace

# Output:
# ✅ 38% faster builds
# ✅ 78% cache hit rate
# ✅ Task pipelines configured

# PHASE 4: CI/CD (Next)
/nx-setup-ci
```

### Re-optimization

You can re-run optimization anytime:

```bash
# After adding more components
/nx-optimize-workspace

# After noticing slow builds
/nx-optimize-workspace

# To re-tune after hardware upgrade
/nx-optimize-workspace
```

## Troubleshooting

### Issue: Build fails during optimization

**Cause:** Some components have build errors

**Fix:**
```bash
# Find failing component
npx nx run-many --target=build --all --verbose

# Fix the component
npx nx build @backpack/failing-component --verbose

# Re-run optimization
/nx-optimize-workspace
```

### Issue: Low cache hit rate after optimization

**Cause:** Cache inputs too broad or changing frequently

**Fix:**
1. Check what's invalidating cache:
   ```bash
   npx nx show project <component>
   ```
2. Review `namedInputs` in nx.json
3. Exclude more non-production files

### Issue: Builds slower after optimization

**Cause:** Too many parallel tasks overwhelming system

**Fix:**
```bash
# Edit nx.json, reduce parallel value
# From: "parallel": 8
# To: "parallel": 4

# Test again
npx nx run-many --target=build --all
```

### Issue: Circular dependency warnings

**Cause:** Components importing each other

**Fix:**
1. Review dependency graph:
   ```bash
   npx nx graph
   ```
2. Refactor to break circular dependency
3. Consider extracting shared logic

## Best Practices

### 1. Optimize After Batch Completion

```bash
# ✅ Good: After batch
/nx-migrate-batch comp1 comp2 comp3 comp4 comp5
/nx-optimize-workspace

# ❌ Bad: After each component
/nx-migrate-component comp1
/nx-optimize-workspace  # Too early
```

### 2. Backup Configuration

```bash
# Backup before optimization
cp nx.json nx.json.backup

# Run optimization
/nx-optimize-workspace

# If issues, restore
cp nx.json.backup nx.json
```

### 3. Monitor Cache Performance

```bash
# First run (cold cache)
time npx nx run-many --target=build --all

# Second run (should be cached)
time npx nx run-many --target=build --all
# Should be 80%+ faster
```

### 4. Test Affected Commands

```bash
# Create test branch
git checkout -b test-optimization

# Make small change
echo "// test" >> packages/bpk-component-badge/src/index.ts

# Test affected (should only build badge + dependents)
npx nx affected:build
npx nx affected:test
```

## Architecture Notes

### Why These Optimizations?

**Cache Inputs:**
- More specific inputs = better cache invalidation
- Excludes test files = fewer cache misses
- Includes shared configs = catches global changes

**Parallel Execution:**
- Based on CPU cores = optimal resource usage
- Not too high = avoids overwhelming system
- Not too low = faster builds

**Task Pipelines:**
- `dependsOn` = correct build order
- Parallel where possible = speed
- Sequential where needed = correctness

### How Cache Works

```
Change file → Hash inputs → Check cache
                              ├─ Hit → Use cached result
                              └─ Miss → Run task → Store in cache
```

**Optimization goal:** Maximize cache hits by:
- Making inputs specific
- Excluding irrelevant files
- Proper cache key configuration

## Metrics to Track

### Before Optimization

Record these metrics:
- ✅ Full workspace build time
- ✅ Cache hit rate
- ✅ Slowest builds
- ✅ Number of parallel tasks

### After Optimization

Compare improvements:
- 📊 Build time reduction (target: 30-40%)
- 📊 Cache hit rate increase (target: >70%)
- 📊 Parallel execution tuned
- 📊 Configuration optimized

## Related Skills

| Skill | Phase | Purpose |
|-------|-------|---------|
| `/nx-plan-migration` | Phase 0+2 | Check migration status |
| `/nx-migrate-batch` | Phase 2 | Complete migrations |
| `/nx-validate-migration` | Phase 2 | Validate components |
| **`/nx-optimize-workspace`** | **Phase 3** | **Optimize performance** ← YOU ARE HERE |
| `/nx-setup-ci` | Phase 4 | Configure CI/CD |
| `/nx-generate-docs` | Phase 5 | Generate docs |

## Advanced Usage

### Custom Optimization

Edit nx.json manually for specific needs:

```json
{
  "targetDefaults": {
    "build": {
      // Add custom inputs
      "inputs": [
        "production",
        "^production",
        "{projectRoot}/custom-config.json"
      ]
    }
  }
}
```

### Environment-Specific Settings

```json
{
  // CI: More parallel tasks
  "parallel": 8,

  // Local dev: Fewer parallel tasks
  "parallel": 3
}
```

Use environment variable in CI:
```bash
export NX_PARALLEL=8
```

### Cache Location

```json
{
  "cacheDirectory": "/tmp/nx-cache"  // Faster SSD
}
```

## Success Criteria

Optimization succeeds when:

✅ Build time reduced by >20%
✅ Cache hit rate >70%
✅ No build failures
✅ Task pipelines configured
✅ Parallel execution optimized

## Next Steps

After optimization:

### Phase 4: CI/CD Integration
```bash
/nx-setup-ci
```

Configure CI to use:
- `nx affected` commands
- NX cache
- Optimized settings

### Phase 5: Documentation
```bash
/nx-generate-docs
```

Document:
- NX workspace structure
- Developer workflows
- Performance metrics

### Ongoing

- Monitor cache performance
- Re-optimize as needed
- Track build times
- Adjust parallel execution
