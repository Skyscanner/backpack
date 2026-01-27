# Nx Troubleshooting Guide

Common issues and solutions when working with Nx in Backpack.

## Table of Contents

- [Installation Issues](#installation-issues)
- [Build Issues](#build-issues)
- [Cache Issues](#cache-issues)
- [Affected Detection Issues](#affected-detection-issues)
- [CI/CD Issues](#cicd-issues)
- [Storybook Issues](#storybook-issues)
- [Percy Issues](#percy-issues)
- [Performance Issues](#performance-issues)

---

## Installation Issues

### Nx command not found

**Symptom**:
```bash
npx nx --version
# bash: nx: command not found
```

**Cause**: Nx not installed or node_modules missing

**Solution**:
```bash
# Install dependencies
npm install

# Verify Nx installed
npx nx --version
# Should show: 19.x.x or similar
```

### Nx version mismatch

**Symptom**:
```
Error: Nx version X.Y.Z does not match expected version A.B.C
```

**Cause**: Multiple Nx versions or outdated dependencies

**Solution**:
```bash
# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Verify version
npx nx --version
```

---

## Build Issues

### Build fails but worked before

**Symptom**:
```bash
npx nx build bpk-component-button
# Error: Build failed
```

**Common Causes**:
1. Stale cache
2. Dependency changes
3. Source file corruption

**Solution**:
```bash
# 1. Clear Nx cache
npx nx reset

# 2. Rebuild
npx nx build bpk-component-button

# 3. If still failing, check source files
git status
git diff
```

### Build succeeds but output missing

**Symptom**:
```bash
npx nx build bpk-component-button
# No errors, but packages/bpk-component-button/dist/ is empty
```

**Cause**: Cache returned empty result or wrong outputs configured

**Solution**:
```bash
# 1. Check if cache issue
npx nx build bpk-component-button --skip-nx-cache

# 2. If builds correctly, clear cache
npx nx reset

# 3. Rebuild with cache
npx nx build bpk-component-button
```

### "Cannot find module" errors

**Symptom**:
```
Error: Cannot find module 'some-package'
```

**Cause**: Missing dependencies or stale cache

**Solution**:
```bash
# 1. Install dependencies
npm install

# 2. Check package.json has the dependency
cat packages/bpk-component-button/package.json | grep some-package

# 3. If missing, add it
cd packages/bpk-component-button
npm install some-package
```

---

## Cache Issues

### Cache not working (always rebuilding)

**Symptom**:
```bash
npx nx build bpk-component-button  # Takes full time
npx nx build bpk-component-button  # Takes full time again
# Expected: Second build should be instant
```

**Cause**: Cache inputs changing or cache disabled

**Solution**:
```bash
# 1. Check if caching enabled
cat packages/bpk-component-button/project.json | grep cache
# Should show: "cache": true

# 2. Check what's changing
npx nx show project bpk-component-button --web
# Look at "implicitDependencies" and "inputs"

# 3. Check for file changes
git status
# Files like .env, timestamps, etc. can invalidate cache
```

### Cache hit but output still incorrect

**Symptom**:
Build shows cache hit, but dist/ contains old files

**Cause**: Cache stored incorrect output

**Solution**:
```bash
# 1. Clear cache
npx nx reset

# 2. Force rebuild
npx nx build bpk-component-button --skip-nx-cache

# 3. Verify output
ls -la packages/bpk-component-button/dist/

# 4. Future builds will use correct cache
npx nx build bpk-component-button
```

### Where is the cache stored?

**Location**: `.nx/cache/` directory in repository root

**Check cache**:
```bash
# View cache size
du -sh .nx/cache

# View cache entries
ls .nx/cache | head -10

# Clear cache
npx nx reset
rm -rf .nx/cache
```

**Note**: Cache is not committed to git (in .gitignore)

---

## Affected Detection Issues

### All packages detected as affected

**Symptom**:
```bash
npx nx affected --target=build
# Shows all 96 packages affected (expected: only a few)
```

**Common Causes**:
1. Root config file changed (tsconfig.json, package.json)
2. Git base ref incorrect
3. Git history issues

**Solution**:
```bash
# 1. Check what changed
git diff main

# 2. If root file changed, this is correct behavior
# Root config affects all packages

# 3. If not, check base ref
git branch -a | grep main

# 4. Specify base explicitly
npx nx affected --target=build --base=main
```

### No packages detected as affected

**Symptom**:
```bash
# Changed files but affected shows nothing
npx nx affected --target=build
# No packages affected
```

**Cause**: Files changed are not inputs to any project

**Solution**:
```bash
# 1. Check what files changed
git status

# 2. If changed files are docs/tests/etc, this might be correct

# 3. Force specific package
npx nx build bpk-component-button

# 4. Or build all
npx nx run-many --target=build --all
```

### Affected detection not working in CI

**Symptom**:
CI affected command fails or detects all packages

**Cause**: Base branch not fetched

**Solution** (in CI workflow):
```yaml
# Add fetch step before affected commands
- name: Fetch base branch
  run: git fetch origin main:main --depth=1

- name: Run affected
  run: npx nx affected --target=build --base=origin/main
```

---

## CI/CD Issues

### CI fails but works locally

**Common Causes**:
1. Different node versions
2. Missing environment variables
3. CI cache issues
4. Dependency issues

**Solution**:
```bash
# 1. Check node version matches
node --version
# Compare with .nvmrc

# 2. Check CI logs for specific error

# 3. Reproduce CI environment locally
docker run -it node:18 bash
git clone ...
npm install
npx nx build ...
```

### CI affected command shows errors

**Symptom**:
```
Error: Cannot find ref 'main'
```

**Cause**: Base branch not available in CI

**Solution** (in workflow):
```yaml
- name: Fetch base branch
  if: github.event_name == 'pull_request'
  env:
    BASE_REF: ${{ github.base_ref }}
  run: git fetch origin "$BASE_REF:$BASE_REF" --depth=1
```

### CI takes too long

**Symptom**:
CI runs for 10+ minutes on small changes

**Check**:
1. Is affected detection working?
2. Is parallel execution enabled?
3. Are there bottlenecks?

**Solution**:
```yaml
# Use affected for PRs
- run: npx nx affected --target=build --base=origin/main --parallel=4

# Check CI logs for:
# "Running target build for X projects" (X should be small)
```

---

## Storybook Issues

### Storybook not starting

**Symptom**:
```bash
npx nx storybook
# Fails or hangs
```

**Solution**:
```bash
# 1. Try traditional command
npm run storybook

# 2. If that works, Nx wrapper has issue
# Check project.json storybook target

# 3. Clear cache
npx nx reset
npx nx storybook
```

### Storybook not updating with changes

**Symptom**:
Made code changes, but Storybook shows old version

**Solution**:
```bash
# 1. Stop Storybook (Ctrl+C)

# 2. Clear cache
npx nx reset

# 3. Restart Storybook
npx nx storybook
```

### Storybook build cached but shouldn't be

**Symptom**:
```bash
npx nx storybook:build
# Shows cache hit, but code changed
```

**Solution**:
```bash
# 1. Clear cache
npx nx reset

# 2. Force rebuild
npx nx storybook:build --skip-nx-cache

# 3. Check dist-storybook/ has latest
ls -lt dist-storybook/
```

---

## Percy Issues

### Percy takes too long

**Symptom**:
```bash
npx nx percy
# Takes 90+ seconds (expected: ~30s)
```

**Cause**: Storybook not cached, rebuilding every time

**Solution**:
```bash
# 1. Check if Storybook cached
npx nx storybook:build
# Should be <1s if cached

# 2. If not cached, clear and rebuild
npx nx reset
npx nx storybook:build

# 3. Run Percy (should use cache)
npx nx percy  # Now ~30s
```

### Percy fails with missing Storybook

**Symptom**:
```
Error: dist-storybook/ not found
```

**Cause**: Percy dependency not triggered

**Solution**:
```bash
# Build Storybook first
npx nx storybook:build

# Then run Percy
npx nx percy

# Or Percy should auto-build via dependsOn
# Check project.json:
cat project.json | grep -A3 percy
```

---

## Performance Issues

### Nx commands slow

**Symptom**:
All Nx commands take 5-10 seconds to start

**Cause**: Nx daemon not started or slow project graph calculation

**Solution**:
```bash
# 1. Check daemon status
npx nx daemon

# 2. Restart daemon
npx nx reset

# 3. If still slow, check project graph
npx nx graph
# Does it load quickly?
```

### Cache not speeding up builds

**Symptom**:
Even with cache hits, builds take long time

**Cause**: Output restoration is slow or cache not actually hitting

**Solution**:
```bash
# 1. Check cache effectiveness
npx nx build bpk-component-button --skip-nx-cache  # Note time
npx nx build bpk-component-button  # Should be much faster

# 2. If not faster, check cache config
cat packages/bpk-component-button/project.json

# 3. Ensure outputs correctly configured
# outputs: ["{projectRoot}/dist"]
```

### Parallel execution not working

**Symptom**:
```bash
npx nx run-many --target=build --all --parallel=4
# Seems to run sequentially
```

**Cause**: Dependencies prevent parallelization or only one task

**Solution**:
```bash
# 1. Check dependency graph
npx nx graph

# 2. Nx respects dependencies
# If package B depends on A, A builds first

# 3. Independent packages build in parallel
# Check CI logs for "Running target ... in parallel"
```

---

## General Debugging Tips

### Enable verbose logging

```bash
# Add --verbose to see detailed logs
npx nx build bpk-component-button --verbose

# Or --dry-run to see what would happen
npx nx affected --target=build --dry-run
```

### Check project configuration

```bash
# View project details
npx nx show project bpk-component-button --web

# View all projects
npx nx show projects

# View dependency graph
npx nx graph
```

### Check Nx version

```bash
# Current version
npx nx --version

# Report (includes all info)
npx nx report
```

### Reset everything

```bash
# Nuclear option: Clear everything and rebuild
npx nx reset
rm -rf node_modules package-lock.json
npm install
npx nx run-many --target=build --all
```

---

## Getting Help

1. **Check this guide** - Most common issues covered
2. **Check documentation** - [User Guide](user-guide.md), [CI/CD Guide](cicd-guide.md)
3. **Search GitHub issues** - Similar issues might be reported
4. **Check Nx documentation** - https://nx.dev
5. **Ask in Slack** - #backpack channel
6. **Office hours** - Check team calendar

## Reporting Issues

When reporting an issue, include:

1. **What you tried**:
   ```bash
   npx nx build bpk-component-button
   ```

2. **What happened**:
   ```
   Error: Build failed with exit code 1
   ```

3. **What you expected**:
   Build should succeed

4. **Environment**:
   ```bash
   npx nx report
   node --version
   npm --version
   ```

5. **Steps to reproduce**

6. **Relevant logs** (use --verbose)

---

## Quick Fixes Checklist

When something goes wrong, try these in order:

- [ ] Clear Nx cache: `npx nx reset`
- [ ] Reinstall dependencies: `rm -rf node_modules && npm install`
- [ ] Check git status: `git status` (unexpected changes?)
- [ ] Try without cache: `npx nx build ... --skip-nx-cache`
- [ ] Check Nx version: `npx nx --version`
- [ ] Check node version: `node --version` (matches .nvmrc?)
- [ ] Read error message carefully (usually hints at issue)
- [ ] Check this guide for similar issue
- [ ] Search GitHub issues
- [ ] Ask for help

---

Last updated: 2026-01-27
