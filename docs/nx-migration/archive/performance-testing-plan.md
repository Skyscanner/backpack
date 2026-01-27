# M4 Performance Testing Plan

Testing plan for measuring CI/CD performance improvements with Nx.

## Baseline Metrics (Before Nx CI Integration)

Record these metrics from recent PRs before M4 implementation:

### Pull Request Validation
- **Small change (1-3 packages)**: ___ minutes
- **Medium change (5-10 packages)**: ___ minutes
- **Large change (20+ packages)**: ___ minutes
- **Infrastructure change (affects all)**: ___ minutes

### Main Branch Build
- **Full build + test**: ___ minutes

### Storybook + Percy
- **Storybook build**: ___ minutes
- **Percy test**: ___ minutes
- **Total**: ___ minutes

## Test Scenarios (After Nx CI Integration)

### Scenario 1: Small Change (1-3 packages)
**Example**: Update single component (bpk-component-button)

**Expected behavior**:
- `nx affected` should detect 1-3 affected packages
- Build only affected packages
- Test only affected packages

**Expected time**: 1-2 minutes (60-80% faster)

**Actual results** (fill after PR):
- Affected packages detected: ___
- Build time: ___ minutes
- Test time: ___ minutes
- Total time: ___ minutes
- Improvement: ___%

### Scenario 2: Medium Change (5-10 packages)
**Example**: Update shared utility (bpk-react-utils) or theming

**Expected behavior**:
- `nx affected` should detect 5-10 affected packages
- Build only affected packages
- Test only affected packages

**Expected time**: 2-4 minutes (40-60% faster)

**Actual results** (fill after PR):
- Affected packages detected: ___
- Build time: ___ minutes
- Test time: ___ minutes
- Total time: ___ minutes
- Improvement: ___%

### Scenario 3: Large Change (20+ packages)
**Example**: Update major dependency or styling system

**Expected behavior**:
- `nx affected` should detect 20+ affected packages
- Build affected packages (most of them)
- Test affected packages

**Expected time**: Similar or slightly faster

**Actual results** (fill after PR):
- Affected packages detected: ___
- Build time: ___ minutes
- Test time: ___ minutes
- Total time: ___ minutes
- Improvement: ___%

### Scenario 4: Infrastructure Change (affects all)
**Example**: Update tsconfig.json, package.json, or root config

**Expected behavior**:
- `nx affected` should detect all packages affected
- Build all packages
- Test all packages
- Same as `run-many --all` but with better parallelization

**Expected time**: Similar (with parallel=4 optimization)

**Actual results** (fill after PR):
- Affected packages detected: ___
- Build time: ___ minutes
- Test time: ___ minutes
- Total time: ___ minutes
- Improvement: ___%

### Scenario 5: Main Branch Build
**Example**: Merge to main branch

**Expected behavior**:
- Uses `run-many --all` (not affected)
- Full build and test
- Benefits from parallel=4

**Expected time**: 20-30% faster than before

**Actual results** (fill after merge to main):
- Build time: ___ minutes
- Test time: ___ minutes
- Total time: ___ minutes
- Improvement: ___%

## Cache Effectiveness Monitoring

### Local Cache (per PR run)
- **Cache hit rate**: Track in Nx output
- **Cache storage**: Monitor `.nx/cache` size
- **Cache invalidation**: Verify correctness

### Expected Behavior
- First commit in PR: Cache miss (builds from scratch)
- Second commit (small change): Partial cache hit
- Re-run without changes: Full cache hit

**Monitoring commands**:
```bash
# Check cache size
du -sh .nx/cache

# View cache statistics (in CI logs)
# Look for: "Nx read the output from the cache"
```

## Performance Targets

| Metric | Target | Status |
|--------|--------|--------|
| PR validation (small change) | 60-80% faster | ⏳ Testing |
| PR validation (medium change) | 40-60% faster | ⏳ Testing |
| PR validation (large change) | 0-20% faster | ⏳ Testing |
| Main branch build | 20-30% faster | ⏳ Testing |
| Storybook build (cached) | 99%+ faster | ✅ Verified in M3 |
| Percy workflow | 75% faster | ✅ Verified in M3 |

## Test Process

### Step 1: Baseline Collection (Before M4)
1. Find 3-5 recent PRs of different sizes
2. Record CI execution times from GitHub Actions
3. Document as baseline metrics

### Step 2: Initial M4 PR Test
1. This PR itself will test the new CI workflows
2. Record actual execution times
3. Compare with baseline

### Step 3: Follow-up PR Tests
1. Create test PRs with controlled changes:
   - Small: 1 component update
   - Medium: 1 utility update
   - Large: Major dependency update
2. Record metrics for each
3. Validate affected detection accuracy

### Step 4: Main Branch Validation
1. After M4 PR merges to main
2. Record main branch CI time
3. Compare with historical main branch times

### Step 5: Ongoing Monitoring
1. Monitor CI times for 1-2 weeks
2. Collect data from various PRs
3. Calculate average improvements
4. Document in milestone-4-report.md

## Validation Checklist

- [ ] Baseline metrics collected
- [ ] M4 PR CI run successful
- [ ] Small change scenario tested
- [ ] Medium change scenario tested
- [ ] Large change scenario tested
- [ ] Infrastructure change scenario tested
- [ ] Main branch build tested
- [ ] Cache effectiveness verified
- [ ] Affected detection accuracy verified
- [ ] Performance targets achieved
- [ ] Results documented in milestone-4-report.md

## Troubleshooting

### If Performance Worse Than Expected

**Affected detection not working**:
- Check git fetch in workflows
- Verify base/head refs correct
- Check Nx logs for affected calculation

**Parallel execution issues**:
- Check if parallel=4 is applied
- Monitor CPU/memory usage
- Try different parallel values

**Cache not effective**:
- Check cache inputs configuration
- Verify cache outputs defined
- Check for cache invalidation issues

### If CI Fails

**Rollback procedure**:
1. Revert workflow changes
2. Use old npm commands
3. Document issue
4. Fix and re-test

## Success Criteria

✅ **Minimum targets**:
- PR validation: >20% faster on average
- Main branch: >15% faster
- No CI failures
- Affected detection accurate

🎯 **Stretch goals**:
- PR validation: >50% faster (small changes)
- Main branch: >25% faster
- Zero false negatives in affected detection

## Reporting

After collecting data, update:
1. `docs/nx-migration/milestone-4-report.md` with actual metrics
2. Create comparison charts/tables
3. Share results with team
4. Announce in Slack/email

## Next Steps After Testing

1. Monitor for 1-2 weeks
2. Collect feedback from team
3. Fine-tune if needed
4. Consider Nx Cloud if local cache insufficient
