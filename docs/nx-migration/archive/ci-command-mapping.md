# CI/CD Command Mapping

Mapping of npm commands to Nx equivalents for CI/CD workflows.

## Current CI Workflow Analysis

### pr.yml (Pull Request Validation)
**Current workflow**:
1. Create-NPM-Cache: Install dependencies
2. Create-Build-Cache: `npm run build` + `npm run storybook:dist`
3. Build job (calls _build.yml):
   - `npm run build`
   - `npm run typecheck`
   - `npm run test`
4. StorybookDeploy: Deploy dist-storybook to GitHub Pages
5. PercyTests: `npm run percy-test`

**Optimization opportunities with Nx**:
- Use `nx affected` for PR validation (only build/test changed packages)
- Use `nx storybook:build` for cached Storybook builds
- Use `nx percy` for Percy with automatic storybook:build

### _build.yml (Reusable Build Workflow)
**Current commands**:
```yaml
npm run build        # Build all packages
npm run typecheck    # TypeScript check
npm run test         # Run all tests (lint + jest)
```

**Nx equivalents**:
```yaml
npx nx affected --target=build --base=origin/main    # Build only affected
npx nx run-many --target=build --all                 # Build all (for main)
npx nx run backpack-workspace:typecheck              # TypeScript check
npx nx affected --targets=lint,stylelint,test --base=origin/main  # Test affected
```

### main.yml (Main Branch)
- Similar to pr.yml but for main branch
- Should use `run-many --all` instead of `affected`

### release.yml (Release Process)
**Current commands**:
```yaml
npm run build        # Full build
npm publish          # Publish packages
```

**Nx approach**:
- Keep `npx nx run-many --target=build --all` for releases
- No changes to npm publish (Nx doesn't handle publishing)

## Command Mapping Table

| Current npm Command | Nx Equivalent (PR) | Nx Equivalent (Main/Release) | Notes |
|---------------------|-------------------|----------------------------|-------|
| `npm run build` | `npx nx affected --target=build --base=origin/main` | `npx nx run-many --target=build --all` | Use affected for PRs, all for releases |
| `npm test` | `npx nx affected --targets=lint,stylelint,test --base=origin/main` | `npx nx run-many --targets=lint,stylelint,test --all` | Includes lint + test |
| `npm run typecheck` | `npx nx run backpack-workspace:typecheck` | `npx nx run backpack-workspace:typecheck` | Workspace-level target |
| `npm run storybook:dist` | `npx nx storybook:build` | `npx nx storybook:build` | With caching enabled |
| `npm run percy-test` | `npx nx percy` | `npx nx percy` | Depends on storybook:build |

## Affected Commands Strategy

### For Pull Requests

**Build affected packages**:
```yaml
- name: Build affected packages
  run: npx nx affected --target=build --base=origin/main --parallel=4
```

**Test affected packages**:
```yaml
- name: Test affected packages
  run: npx nx affected --targets=lint,stylelint,test --base=origin/main --parallel=4
```

**Why affected for PRs**:
- Faster CI (only run for changed code)
- Earlier feedback
- Lower CI costs
- Typical: 85-95% faster than full build

### For Main Branch / Release

**Build all packages**:
```yaml
- name: Build all packages
  run: npx nx run-many --target=build --all --parallel=4
```

**Test all packages**:
```yaml
- name: Test all packages
  run: npx nx run-many --targets=lint,stylelint,test --all --parallel=4
```

**Why all for main/release**:
- Ensure full integration
- Catch issues missed by affected
- Releases need complete validation

## Git Base/Head Configuration

### Pull Request Context
```yaml
env:
  NX_BASE: origin/main
  NX_HEAD: HEAD

- name: Fetch base branch
  run: git fetch origin main:main --depth=1

- name: Build affected
  run: npx nx affected --target=build --base=${{ env.NX_BASE }} --head=${{ env.NX_HEAD }}
```

### Why fetch origin/main**:
- PRs need base branch for comparison
- Shallow fetch (--depth=1) is sufficient
- Nx compares current HEAD against main

## Nx Cache in CI

### Leveraging Nx Cache

**Without Nx Cloud** (current approach):
- Each CI run builds from scratch
- Nx cache not shared between runs
- Still benefits from parallel execution

**Future with Nx Cloud** (optional):
- Cache shared across CI runs
- Developers can use CI cache locally
- Distributed task execution possible

### Current Strategy
```yaml
# No additional configuration needed
# Nx cache works locally within each CI run
# Provides parallelization benefits
```

## Storybook Build Optimization

### Before Nx
```yaml
- name: Build Storybook
  run: npm run storybook:dist
# Always takes 60-90s
```

### After Nx
```yaml
- name: Build Storybook (cached)
  run: npx nx storybook:build
# First run: 60-90s, subsequent: <1s (cached)
```

**Note**: Cache is per-branch in CI without Nx Cloud

## Percy Integration

### Before Nx
```yaml
- name: Build Storybook
  run: npm run storybook:dist

- name: Percy Test
  run: npm run percy-test
```

### After Nx
```yaml
# Percy automatically builds Storybook if needed
- name: Percy Test (with auto-build)
  run: npx nx percy
# Nx handles storybook:build dependency automatically
```

## Workflow Update Checklist

- [ ] Update pr.yml to use `nx affected` for builds/tests
- [ ] Update _build.yml with Nx commands
- [ ] Update main.yml to use `nx run-many --all`
- [ ] Update release.yml to use Nx for builds
- [ ] Add git fetch for base branch in PR workflows
- [ ] Update Storybook build to use `nx storybook:build`
- [ ] Update Percy to use `nx percy`
- [ ] Test in actual PR
- [ ] Measure performance improvements
- [ ] Document results

## Expected Performance Improvements

### Pull Request Validation

**Scenario: Small change (1-3 packages)**
- Before: ~5-10 minutes (full build/test)
- After: ~1-2 minutes (affected only)
- Improvement: 60-80%

**Scenario: Medium change (5-10 packages)**
- Before: ~5-10 minutes
- After: ~2-4 minutes
- Improvement: 40-60%

**Scenario: Infrastructure change (all packages)**
- Before: ~5-10 minutes
- After: ~5-10 minutes (same, but with parallel optimization)
- Improvement: Minimal (but better parallelization)

### Main Branch / Release

**Full build/test**:
- Before: ~10-15 minutes
- After: ~8-12 minutes (better parallelization)
- Improvement: 20-30%

## Rollback Strategy

If issues arise with Nx CI integration:

1. **Keep old workflows**: Rename current workflows to `.old` extension
2. **Quick revert**: Rename back if needed
3. **Gradual migration**: Can test Nx workflow alongside old workflow
4. **No breaking changes**: Nx commands wrap existing npm scripts

## Resources

- **Nx CI Guide**: https://nx.dev/ci/intro/ci-with-nx
- **Affected Commands**: `docs/nx-migration/affected-commands.md`
- **Quick Reference**: `docs/nx-migration/quick-reference.md`
- **Testing Guide**: `docs/nx-migration/testing-guide.md`
