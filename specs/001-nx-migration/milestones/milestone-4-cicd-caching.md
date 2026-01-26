# Milestone 4: CI/CD & Distributed Caching

**Duration**: 2 weeks
**Status**: Not Started
**Dependencies**: Milestone 3 Complete
**Next Milestone**: [Milestone 5: Optimization](./milestone-5-optimization.md)

## Overview

### Goal
Update GitHub Actions CI/CD pipelines to use Nx commands and optionally enable Nx Cloud for distributed caching across team and CI.

### Success Criteria
- ✅ All GitHub Actions workflows updated to use Nx
- ✅ CI checks pass with Nx commands
- ✅ CI execution time reduced by >20%
- ✅ Nx Cloud integrated (if approved)
- ✅ Distributed cache hit rate >80% (if Nx Cloud enabled)
- ✅ PR validation workflow identical for developers
- ✅ Release workflow works correctly

## Technical Approach

### Phase 4.1: CI/CD Analysis (Week 1)

#### Objective
Analyze current GitHub Actions workflows and plan Nx integration.

#### Tasks

1. **Audit Current Workflows**

   Identify all workflows in `.github/workflows/`:
   - `ci.yml` - Main CI pipeline
   - `release.yml` - Release and publish
   - `percy.yml` - Visual regression
   - `danger.yml` - PR automation
   - Others...

2. **Map npm Scripts to Nx Commands**

   Create mapping document:
   ```markdown
   | Current Command | Nx Equivalent | Notes |
   |-----------------|---------------|-------|
   | npm run build | nx run-many --target=build --all | Full build |
   | npm test | nx run-many --target=test --all | All tests |
   | npm run lint | nx run-many --target=lint --all | All linting |
   | npm run storybook:dist | nx storybook:build | Build Storybook |
   ```

3. **Identify Affected Command Opportunities**

   For PR validation, use affected commands:
   ```yaml
   - nx affected:build --base=origin/main --head=HEAD
   - nx affected:test --base=origin/main --head=HEAD
   - nx affected:lint --base=origin/main --head=HEAD
   ```

4. **Plan Nx Cloud Integration**

   Evaluate options:
   - **Option A**: Local cache only (no cost, slower CI)
   - **Option B**: Nx Cloud with distributed caching (faster, requires setup)
   - **Recommendation**: Start without Nx Cloud, add if performance insufficient

#### Success Gate
- ✅ All workflows documented
- ✅ Nx command mapping complete
- ✅ Nx Cloud decision made

### Phase 4.2: Update CI Workflows (Week 1)

#### Objective
Update GitHub Actions workflows to use Nx commands.

#### Tasks

1. **Update Main CI Workflow** (`.github/workflows/ci.yml`)

   **Before**:
   ```yaml
   - name: Build
     run: npm run build

   - name: Test
     run: npm test

   - name: Lint
     run: npm run lint
   ```

   **After**:
   ```yaml
   - name: Setup Nx
     run: npx nx-cloud start-ci-run --distribute-on="5 linux-medium-js"
     if: env.NX_CLOUD_ACCESS_TOKEN != ''

   - name: Build affected
     run: nx affected:build --base=origin/main --head=HEAD

   - name: Test affected
     run: nx affected:test --base=origin/main --head=HEAD --coverage

   - name: Lint affected
     run: nx affected:lint --base=origin/main --head=HEAD

   - name: Stop Nx Cloud
     run: npx nx-cloud stop-all-agents
     if: always() && env.NX_CLOUD_ACCESS_TOKEN != ''
   ```

2. **Update Release Workflow** (`.github/workflows/release.yml`)

   Preserve full builds for releases:
   ```yaml
   - name: Build all packages
     run: nx run-many --target=build --all

   - name: Run all tests
     run: nx run-many --target=test --all

   - name: Publish to npm
     run: npm run transpile && npm publish ./dist
   ```

3. **Update Percy Workflow** (`.github/workflows/percy.yml`)

   ```yaml
   - name: Build Storybook
     run: nx storybook:build

   - name: Run Percy
     run: npx percy storybook ./dist-storybook
     env:
       PERCY_TOKEN: ${{ secrets.PERCY_TOKEN }}
   ```

4. **Update Danger Workflow** (`.github/workflows/danger.yml`)

   Keep as-is, Danger.js doesn't need Nx changes:
   ```yaml
   - name: Run Danger
     run: npm run danger
   ```

5. **Add Nx Cloud Workflow** (`.github/workflows/nx-cloud.yml` - optional)

   If using Nx Cloud:
   ```yaml
   name: Nx Cloud CI
   on: [pull_request]

   jobs:
     main:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
           with:
             fetch-depth: 0

         - uses: actions/setup-node@v4
           with:
             node-version: '18'
             cache: 'npm'

         - name: Install dependencies
           run: npm ci

         - name: Start Nx Cloud agents
           run: npx nx-cloud start-ci-run --distribute-on="5 linux-medium-js"
           env:
             NX_CLOUD_ACCESS_TOKEN: ${{ secrets.NX_CLOUD_ACCESS_TOKEN }}

         - name: Run affected
           run: |
             nx affected:build --base=origin/main
             nx affected:test --base=origin/main
             nx affected:lint --base=origin/main

         - name: Stop agents
           run: npx nx-cloud stop-all-agents
           if: always()
           env:
             NX_CLOUD_ACCESS_TOKEN: ${{ secrets.NX_CLOUD_ACCESS_TOKEN }}
   ```

#### Success Gate
- ✅ All workflows updated
- ✅ Nx commands correct
- ✅ Affected commands used in PR validation
- ✅ Full builds used in releases

### Phase 4.3: Nx Cloud Setup (Week 1-2, Optional)

#### Objective
Set up Nx Cloud for distributed caching if approved.

#### Tasks

1. **Create Nx Cloud Account**

   - Sign up at https://cloud.nx.app/
   - Create organization for Skyscanner/Backpack
   - Get access token

2. **Configure Nx Cloud**

   Add to `nx.json`:
   ```json
   {
     "nxCloudAccessToken": "PLACEHOLDER",
     "tasksRunnerOptions": {
       "default": {
         "runner": "nx-cloud",
         "options": {
           "accessToken": "PLACEHOLDER",
           "cacheableOperations": ["build", "test", "lint"],
           "parallel": 3
         }
       }
     }
   }
   ```

   **Important**: Use environment variable in CI:
   ```bash
   export NX_CLOUD_ACCESS_TOKEN=${{ secrets.NX_CLOUD_ACCESS_TOKEN }}
   ```

3. **Add GitHub Secrets**

   Add to repository secrets:
   - `NX_CLOUD_ACCESS_TOKEN` - Nx Cloud access token

4. **Test Nx Cloud Locally**

   ```bash
   # Set token
   export NX_CLOUD_ACCESS_TOKEN=your-token-here

   # Build and cache remotely
   nx run-many --target=build --all

   # Clean local cache
   nx reset

   # Rebuild (should pull from cloud)
   nx run-many --target=build --all
   ```

5. **Test Nx Cloud in CI**

   - Create test PR
   - Run CI with Nx Cloud
   - Verify cache hit from cloud
   - Check Nx Cloud dashboard

6. **Configure DTE (Distributed Task Execution)** - Optional

   For parallel CI execution:
   ```yaml
   - name: Start agents
     run: npx nx-cloud start-ci-run --distribute-on="5 linux-medium-js"

   - name: Run tasks
     run: nx affected:build --parallel=5
   ```

#### Success Gate (If Nx Cloud Enabled)
- ✅ Nx Cloud account created
- ✅ Access token configured
- ✅ Remote caching works
- ✅ CI cache hit rate >80%
- ✅ DTE works (if configured)

### Phase 4.4: CI Performance Testing (Week 2)

#### Objective
Validate CI performance improvements and optimize configuration.

#### Tasks

1. **Baseline CI Performance**

   Record current CI times:
   ```
   PR Validation:
   - Lint: [___] min
   - Test: [___] min
   - Build: [___] min
   - Percy: [___] min
   - Total: [___] min

   Full CI (main branch):
   - Full build: [___] min
   - Full test: [___] min
   - Total: [___] min
   ```

2. **Measure Nx CI Performance**

   Run same tests with Nx:
   ```
   PR Validation (with affected):
   - Lint: [___] min
   - Test: [___] min
   - Build: [___] min
   - Percy: [___] min
   - Total: [___] min
   - Improvement: [___]%

   Full CI:
   - Full build: [___] min
   - Full test: [___] min
   - Total: [___] min
   - Improvement: [___]%
   ```

3. **Optimize Based on Results**

   Adjust parallel settings:
   ```json
   {
     "tasksRunnerOptions": {
       "default": {
         "options": {
           "parallel": 5  // Increase if CI has capacity
         }
       }
     }
   }
   ```

4. **Test Multiple PR Scenarios**

   - Small change (1 component)
   - Medium change (5-10 components)
   - Large change (20+ components)
   - Infrastructure change (affects all)

   Verify affected detection works correctly.

5. **Monitor Cache Effectiveness**

   Track metrics:
   - Cache hit rate
   - Time saved per PR
   - Cache storage used

#### Success Gate
- ✅ CI execution time reduced >20%
- ✅ Affected detection works correctly
- ✅ No flaky tests introduced
- ✅ Performance metrics documented

### Phase 4.5: Documentation & Team Communication (Week 2)

#### Objective
Document CI/CD changes and communicate to team.

#### Tasks

1. **Create CI/CD Documentation**

   `docs/nx-migration/cicd-guide.md`:
   ```markdown
   # CI/CD with Nx

   ## Overview
   All CI/CD pipelines now use Nx for build orchestration.

   ## PR Validation
   - Uses `nx affected` to run only changed packages
   - Typically 50-80% faster than full CI
   - Same validation quality as before

   ## Main Branch CI
   - Runs full build/test/lint for all packages
   - Ensures main branch always passes
   - Used for releases

   ## Nx Cloud (if enabled)
   - Distributed caching across team and CI
   - Cache hit rate typically >80%
   - Speeds up CI significantly

   ## Troubleshooting
   [Common CI issues and solutions]
   ```

2. **Update CONTRIBUTING.md**

   Add CI/CD section:
   ```markdown
   ## CI/CD

   PRs automatically run Nx affected commands to validate changes:
   - Build affected packages
   - Test affected packages
   - Lint affected packages
   - Run Percy visual regression (if applicable)

   To run same checks locally:
   ```bash
   nx affected:build --base=main
   nx affected:test --base=main
   nx affected:lint --base=main
   ```

3. **Create Nx Cloud Usage Guide** (if enabled)

   `docs/nx-migration/nx-cloud-guide.md`:
   - How Nx Cloud works
   - How to view cache dashboard
   - Understanding cache hit rates
   - Troubleshooting cloud issues

4. **Announce CI Changes**

   Team communication:
   - Slack announcement in #backpack
   - Email to team
   - Update team wiki
   - Include before/after performance metrics

5. **Create Milestone 4 Report**

   `docs/nx-migration/milestone-4-report.md`:
   - CI/CD changes summary
   - Performance improvements
   - Nx Cloud benefits (if enabled)
   - Issues and resolutions
   - Lessons learned

#### Success Gate
- ✅ All documentation complete
- ✅ Team notified
- ✅ No confusion about new CI process

## Validation & Testing

### CI Workflow Validation Checklist

- [ ] All workflows updated with Nx commands
- [ ] PR validation uses affected commands
- [ ] Release workflow uses full builds
- [ ] Percy integration works
- [ ] Danger.js continues to work
- [ ] No workflow failures

### Performance Validation Checklist

- [ ] CI execution time reduced >20%
- [ ] Affected detection accurate
- [ ] Cache hit rate >50% locally
- [ ] Cache hit rate >80% with Nx Cloud (if enabled)
- [ ] No performance regression

### Nx Cloud Validation Checklist (If Enabled)

- [ ] Remote caching works
- [ ] Cache invalidation correct
- [ ] Access token secure (in secrets)
- [ ] DTE works (if configured)
- [ ] Dashboard accessible
- [ ] Cache storage within limits

## Rollback Plan

### Trigger Conditions

Rollback Milestone 4 if:
- CI fails consistently (>20% failure rate)
- CI execution time increases >10%
- Affected detection produces incorrect results
- Nx Cloud causes issues (if enabled)
- Team productivity impacted

### Rollback Procedure

1. **Revert Workflow Files**
   ```bash
   git checkout main -- .github/workflows/*.yml
   git commit -m "Rollback to npm scripts in CI"
   git push
   ```

2. **Disable Nx Cloud** (if enabled)
   ```bash
   # Remove from nx.json
   git diff nx.json
   git checkout main -- nx.json
   ```

3. **Keep Milestones 1-3**
   - Local development still uses Nx
   - Only CI reverts to npm scripts
   - Team can continue using Nx locally

4. **Document Issues**
   - What went wrong
   - Root cause analysis
   - Mitigation plan
   - When to retry

### Partial Rollback Options

- **Option A**: Keep affected commands, disable Nx Cloud
- **Option B**: Use full builds instead of affected
- **Option C**: Revert to npm scripts completely

## Performance Targets

| Metric | Baseline | Target | Actual | Status |
|--------|----------|--------|--------|--------|
| PR CI Time (affected) | [From M3] | <50% baseline | [TBD] | ⏳ |
| Full CI Time | [From M3] | <110% baseline | [TBD] | ⏳ |
| Cache Hit Rate (local) | [From M3] | >50% | [TBD] | ⏳ |
| Cache Hit Rate (cloud) | N/A | >80% | [TBD] | ⏳ |
| CI Failure Rate | <5% | <5% | [TBD] | ⏳ |

## Nx Cloud Cost Analysis (If Enabled)

### Pricing Considerations

Nx Cloud pricing tiers:
- **Free**: Limited cache storage, good for small teams
- **Team**: $49/month per seat - suitable for Backpack team
- **Enterprise**: Custom pricing - if scaling beyond team

### ROI Calculation

Estimated time savings:
```
Developer count: [X]
Average PRs per day: [Y]
Time saved per PR: [Z] minutes

Monthly savings = X * Y * Z * 20 working days
= [___] developer-hours saved

Cost: $49 * X = [___]
ROI: [___] hours at $[hourly rate] = $[___]
Net benefit: $[___] per month
```

### Recommendation

[To be filled based on actual metrics and team size]

## Issues & Resolutions

### Known Issues

*To be filled during implementation*

### Resolved Issues

*To be filled during implementation*

## Next Steps

Upon Milestone 4 completion:

1. **Tag Release**
   ```bash
   git tag -a nx-milestone-4 -m "Milestone 4: CI/CD & Caching Complete"
   git push origin nx-milestone-4
   ```

2. **Team Retrospective**
   - CI/CD improvements review
   - Nx Cloud effectiveness (if enabled)
   - Developer feedback
   - Action items for Milestone 5

3. **Proceed to Milestone 5**
   - [Milestone 5: Optimization & Documentation](./milestone-5-optimization.md)

## References

- **Nx CI Documentation**: https://nx.dev/recipes/ci
- **Nx Cloud**: https://nx.app/
- **GitHub Actions**: https://docs.github.com/actions
- **Migration Spec**: [../spec.md](../spec.md)
- **Implementation Plan**: [../plan.md](../plan.md)
- **Milestone 3**: [./milestone-3-dev-workflow.md](./milestone-3-dev-workflow.md)
