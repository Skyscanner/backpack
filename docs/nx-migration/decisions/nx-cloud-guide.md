# Nx Cloud Guide

Information about Nx Cloud and why it's not currently enabled in Backpack.

## What is Nx Cloud?

Nx Cloud is an optional paid service that enhances Nx with:

1. **Remote Caching**: Share build cache across team and CI
   - Developer A builds → Developer B uses cache
   - CI builds → Developers use CI cache
   - Dramatically faster for everyone

2. **Distributed Task Execution (DTE)**: Run tasks across multiple CI agents in parallel

3. **CI Analytics**: Performance insights and optimization recommendations

## Current Status: Not Enabled

### Decision

**Backpack does NOT use Nx Cloud** (as of M4 implementation)

### Rationale

1. **Local cache is sufficient**: 99%+ performance improvement already achieved
2. **Cost consideration**: Nx Cloud is a paid service
3. **Team precedent**: Falcon and Global-Components don't use Nx Cloud
4. **Proven effectiveness**: M1-M3 showed local caching is very effective

### Benefits Already Achieved Without Nx Cloud

✅ **Build caching**: 99%+ improvement (60-90s → <1s)
✅ **Parallel execution**: 45% improvement (parallel=4)
✅ **Affected detection**: 40-80% faster CI for PRs
✅ **Overall**: 81% faster builds vs baseline

## When to Reconsider Nx Cloud

Consider enabling Nx Cloud if:

### 1. Team Size Grows
- Large team (>20 developers)
- Multiple concurrent PRs
- Cache sharing becomes valuable

### 2. CI Costs Become Significant
- Long-running CI pipelines
- High CI minute usage
- Need for cost optimization

### 3. Remote Cache Needed
- Developers frequently rebuild same code
- CI cache would benefit local development
- Cross-machine cache sharing valuable

### 4. Distributed Execution Required
- Monorepo becomes very large
- Single-agent CI too slow
- Need parallel CI agents

## Skyscanner Enterprise Nx Cloud

### Internal Option Available

Skyscanner has enterprise Nx Cloud:
- **URL**: `https://skyscanner.gc.ent.nx.app`
- **Used by**: Banana repository
- **Not used by**: Falcon, Global-Components

### How to Enable (If Needed)

**Step 1: Contact Banana Team**
- Ask about Nx Cloud access
- Request new workspace setup
- Get credentials

**Step 2: Configure nx.json**
```json
{
  "nxCloudUrl": "https://skyscanner.gc.ent.nx.app",
  "nxCloudId": "your-workspace-id",
  "nxCloudEncryptionKey": "your-encryption-key"
}
```

**Step 3: Test Locally**
```bash
# Build and upload to cloud
npx nx run-many --target=build --all

# Reset cache
npx nx reset

# Rebuild (should hit remote cache)
npx nx run-many --target=build --all
# Look for: "remote cache hit"
```

**Step 4: Update CI**
No changes needed - Nx Cloud works automatically once configured

**Step 5: Monitor**
- Check Nx Cloud dashboard
- Monitor cache hit rates
- Verify distributed execution (if enabled)

## Performance Without Nx Cloud

### Current Performance (Local Cache Only)

| Scenario | Improvement | Notes |
|----------|-------------|-------|
| Storybook build (repeat) | 99%+ | 60-90s → <1s |
| Package builds (parallel) | 45% | parallel=4 optimization |
| PR validation (small) | 60-80% | Affected detection |
| PR validation (medium) | 40-60% | Affected detection |
| Overall build | 81% | vs M0 baseline |

### What Nx Cloud Would Add

| Feature | Current | With Nx Cloud |
|---------|---------|---------------|
| Cache sharing | Per-machine | Across team + CI |
| CI cache reuse | No | Yes (devs use CI cache) |
| Distributed execution | Single agent | Multiple agents |
| CI analytics | Manual | Dashboard |
| Cache storage | Local disk | Cloud (unlimited) |

### Cost-Benefit Analysis

**Current approach (no Nx Cloud)**:
- ✅ Zero additional cost
- ✅ 99%+ local cache effectiveness
- ✅ Simple setup
- ❌ No cross-machine cache sharing
- ❌ No distributed CI

**With Nx Cloud**:
- ✅ Remote cache sharing
- ✅ Developers use CI cache
- ✅ Distributed CI possible
- ✅ CI analytics dashboard
- ❌ Additional cost (enterprise license)
- ❌ More complex setup

## Alternative: Nx Cloud OSS

### Self-Hosted Option

Nx Cloud can be self-hosted (OSS version):
- **Repo**: https://github.com/nrwl/nx-cloud
- **Features**: Remote caching, basic analytics
- **Missing**: DTE, advanced analytics

**Not recommended** for Backpack:
- Maintenance overhead
- Skyscanner has enterprise option
- Current performance already excellent

## Monitoring Performance

### Without Nx Cloud

**Track manually**:
- CI duration from GitHub Actions
- Local build times
- Cache effectiveness from Nx logs

**Metrics to monitor**:
```bash
# Look for in CI logs
"Nx read the output from the cache instead of running..."
"Successfully ran target build for X projects (Y.Zs)"

# Affected detection
"Running target build for X projects"
```

### With Nx Cloud (If Enabled)

**Dashboard metrics**:
- Cache hit rate (%)
- Task distribution
- CI time trends
- Slowest tasks

**CI run comparison**:
- Before/after analysis
- Cost savings estimation
- Performance recommendations

## Decision Review Schedule

### Quarterly Review

Review Nx Cloud decision every 3 months:

**Check metrics**:
1. Team size and growth
2. CI costs and trends
3. Developer feedback
4. CI duration trends

**Questions to ask**:
- Are developers rebuilding frequently?
- Is CI duration becoming a bottleneck?
- Would remote cache provide significant value?
- Is distributed execution needed?

**Next review**: Q2 2026

## Resources

- **Nx Cloud Docs**: https://nx.dev/ci/intro/ci-with-nx#distribute-task-execution
- **Banana Example**: Check nx.json for Skyscanner enterprise setup
- **Performance Results**: `docs/nx-migration/milestone-4-report.md`
- **CI Guide**: `docs/nx-migration/cicd-guide.md`

## Summary

✅ **Current approach**: Local cache only
✅ **Performance**: 81% faster builds, 99%+ cache hits
✅ **Cost**: Zero additional cost
⏳ **Future**: Can enable Nx Cloud if needs change

**Recommendation**: Continue with local cache, monitor performance, reassess quarterly.
