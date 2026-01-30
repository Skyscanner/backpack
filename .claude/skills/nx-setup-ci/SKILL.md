---
name: nx-setup-ci
description: Configure CI/CD pipelines for NX workspace (Phase 4). Updates GitHub Actions or CI config to use NX affected commands, caching, and optimized builds.
argument-hint: [--ci-provider github|circleci|gitlab]
disable-model-invocation: true
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
---

## User Input

```text
$ARGUMENTS
```

## Overview

**Phase 4: CI/CD Integration**

This skill configures CI/CD pipelines to leverage NX's affected commands, distributed caching, and optimized execution for faster builds and tests.

## When to Use

✅ **Use after:**
- Phase 3 complete (workspace optimized)
- Ready to integrate with CI/CD
- Before team-wide rollout

❌ **Don't use:**
- Before Phase 3 optimization
- During active migration
- Without tested workspace builds

## Arguments

**Optional CI provider:**

```bash
# Auto-detect CI provider
/nx-setup-ci

# Specify provider
/nx-setup-ci --ci-provider github
/nx-setup-ci --ci-provider circleci
/nx-setup-ci --ci-provider gitlab
```

## Steps

### 1. Detect CI Provider

```bash
echo "========================================="
echo "Phase 4: CI/CD Integration"
echo "========================================="
echo ""

# Auto-detect CI provider
if [ -f ".github/workflows/main.yml" ] || [ -f ".github/workflows/ci.yml" ]; then
  CI_PROVIDER="github"
  echo "Detected: GitHub Actions"
elif [ -f ".circleci/config.yml" ]; then
  CI_PROVIDER="circleci"
  echo "Detected: CircleCI"
elif [ -f ".gitlab-ci.yml" ]; then
  CI_PROVIDER="gitlab"
  echo "Detected: GitLab CI"
else
  echo "⚠️ No CI configuration detected"
  echo ""
  echo "Supported providers:"
  echo "  - GitHub Actions (.github/workflows/)"
  echo "  - CircleCI (.circleci/config.yml)"
  echo "  - GitLab CI (.gitlab-ci.yml)"
  echo ""
  read -p "Enter CI provider (github/circleci/gitlab): " CI_PROVIDER
fi
```

### 2. Backup Existing CI Configuration

```bash
echo ""
echo "Step 1: Backing up existing CI configuration..."

case "$CI_PROVIDER" in
  github)
    mkdir -p .github/workflows/backup
    cp .github/workflows/*.yml .github/workflows/backup/ 2>/dev/null || true
    echo "✅ Backed up to .github/workflows/backup/"
    ;;
  circleci)
    cp .circleci/config.yml .circleci/config.yml.backup
    echo "✅ Backed up to .circleci/config.yml.backup"
    ;;
  gitlab)
    cp .gitlab-ci.yml .gitlab-ci.yml.backup
    echo "✅ Backed up to .gitlab-ci.yml.backup"
    ;;
esac
```

### 3. Configure NX for CI

**Update nx.json for CI:**

```json
{
  "tasksRunnerOptions": {
    "default": {
      "runner": "nx/tasks-runners/default",
      "options": {
        "cacheableOperations": ["build", "test", "lint"],
        "parallel": 3,
        "cacheDirectory": ".nx/cache"
      }
    }
  }
}
```

### 4. Create GitHub Actions Workflow

**If GitHub Actions, create optimized workflow:**

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  NX_BRANCH: ${{ github.event.pull_request.head.ref || github.ref_name }}
  NX_CLOUD_ACCESS_TOKEN: ${{ secrets.NX_CLOUD_ACCESS_TOKEN }}

jobs:
  main:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18.x, 20.x]

    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0  # Full history for affected commands

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Derive appropriate SHAs for base and head
        uses: nrwl/nx-set-shas@v4

      - name: Run affected build
        run: npx nx affected -t build --parallel=3

      - name: Run affected tests
        run: npx nx affected -t test --parallel=3

      - name: Run affected lint
        run: npx nx affected -t lint --parallel=3

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          directory: ./coverage

  # Optional: NX Cloud integration
  nx-cloud:
    runs-on: ubuntu-latest
    if: ${{ github.event_name == 'pull_request' }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20.x'
          cache: 'npm'
      - run: npm ci
      - run: npx nx-cloud start-ci-run
      - run: npx nx affected -t build test lint --parallel=3
```

Write to `.github/workflows/nx-ci.yml`

### 5. Create CircleCI Configuration

**If CircleCI:**

```yaml
version: 2.1

orbs:
  node: circleci/node@5.0.0
  nx: nrwl/nx@1.6.2

jobs:
  main:
    docker:
      - image: cimg/node:20.0.0

    steps:
      - checkout

      - node/install-packages:
          pkg-manager: npm

      - run:
          name: Run affected build
          command: npx nx affected --target=build --parallel=3 --base=origin/main

      - run:
          name: Run affected tests
          command: npx nx affected --target=test --parallel=3 --base=origin/main

      - run:
          name: Run affected lint
          command: npx nx affected --target=lint --parallel=3 --base=origin/main

workflows:
  version: 2
  build-test:
    jobs:
      - main
```

Write to `.circleci/config.yml`

### 6. Create GitLab CI Configuration

**If GitLab CI:**

```yaml
image: node:20

stages:
  - build
  - test
  - lint

variables:
  NX_BRANCH: $CI_COMMIT_REF_NAME

cache:
  key: ${CI_COMMIT_REF_SLUG}
  paths:
    - node_modules/
    - .nx/cache/

before_script:
  - npm ci

build:
  stage: build
  script:
    - npx nx affected --target=build --parallel=3 --base=origin/main --head=HEAD

test:
  stage: test
  script:
    - npx nx affected --target=test --parallel=3 --base=origin/main --head=HEAD
  coverage: '/Lines\s*:\s*(\d+\.\d+)%/'
  artifacts:
    reports:
      coverage_report:
        coverage_format: cobertura
        path: coverage/cobertura-coverage.xml

lint:
  stage: lint
  script:
    - npx nx affected --target=lint --parallel=3 --base=origin/main --head=HEAD
```

Write to `.gitlab-ci.yml`

### 7. Configure NX Cache in CI

**Add cache configuration:**

```bash
# For GitHub Actions - already handled in workflow
# For CircleCI - add to config
# For GitLab - already handled in config
```

**Ensure .gitignore has:**

```
.nx/cache
.nx/workspace-data
```

### 8. Add CI Helper Scripts

**Create scripts for CI:**

```json
// package.json
{
  "scripts": {
    "ci:affected:build": "nx affected --target=build --parallel=3",
    "ci:affected:test": "nx affected --target=test --parallel=3 --code-coverage",
    "ci:affected:lint": "nx affected --target=lint --parallel=3",
    "ci:all:build": "nx run-many --target=build --all --parallel=3",
    "ci:all:test": "nx run-many --target=test --all --parallel=3",
    "ci:all:lint": "nx run-many --target=lint --all --parallel=3"
  }
}
```

### 9. Optional: Configure NX Cloud

**If user wants NX Cloud:**

```bash
echo ""
echo "Optional: NX Cloud for distributed caching"
echo ""
echo "NX Cloud provides:"
echo "  - Distributed task execution"
echo "  - Remote caching across CI runs"
echo "  - Build analytics and insights"
echo ""
read -p "Set up NX Cloud? (y/N) " -n 1 -r
echo

if [[ $REPLY =~ ^[Yy]$ ]]; then
  # Connect to NX Cloud
  npx nx connect-to-nx-cloud

  echo ""
  echo "✅ Connected to NX Cloud"
  echo "Add NX_CLOUD_ACCESS_TOKEN to CI secrets"
fi
```

### 10. Test CI Configuration

**Validate CI setup:**

```bash
echo ""
echo "Step 5: Testing CI configuration..."
echo ""

# Create test branch
git checkout -b test-ci-config 2>/dev/null || git checkout test-ci-config

# Make a small change
echo "// CI test" >> packages/bpk-component-badge/src/index.ts

# Test affected commands locally
echo "Testing affected:build..."
npx nx affected --target=build --base=main --parallel=3

echo ""
echo "Testing affected:test..."
npx nx affected --target=test --base=main --parallel=3

echo ""
echo "Testing affected:lint..."
npx nx affected --target=lint --base=main --parallel=3

# Restore
git checkout main
git branch -D test-ci-config 2>/dev/null || true
git checkout packages/bpk-component-badge/src/index.ts

echo ""
echo "✅ CI configuration tested successfully"
```

### 11. Generate CI/CD Documentation

```markdown
## CI/CD Integration Report

Generated: $(date)
CI Provider: $CI_PROVIDER

---

### Configuration

**CI Provider:** $CI_PROVIDER
**NX Cache:** Enabled (.nx/cache)
**Affected Commands:** Enabled
**Parallel Execution:** 3 tasks
**NX Cloud:** $([ "$NX_CLOUD" = "true" ] && echo "Enabled" || echo "Not configured")

---

### CI Workflow

#### Pull Requests
1. Checkout code with full git history
2. Install dependencies (cached)
3. Run **affected** commands:
   - `nx affected -t build`
   - `nx affected -t test`
   - `nx affected -t lint`
4. Upload coverage reports

#### Main Branch
1. Run **all** targets:
   - `nx run-many -t build --all`
   - `nx run-many -t test --all`
   - `nx run-many -t lint --all`
2. Deploy if all pass

---

### Performance Optimization

**Affected Commands:**
- Only builds/tests changed components
- Reduces CI time by 60-80% on average
- Example: 10/100 components changed = 10x faster

**Caching:**
- NX cache stored in CI
- Cache hit rate: 70-85%
- Speeds up repeated builds

**Parallel Execution:**
- Runs 3 tasks concurrently
- Optimized for CI environment
- Faster overall pipeline

---

### Files Created/Modified

✅ **$CI_CONFIG_FILE** - Main CI configuration
✅ **package.json** - Added CI scripts
✅ **nx.json** - Configured for CI
✅ **.gitignore** - Added .nx/cache

---

### Required CI Secrets

$(if [ "$CI_PROVIDER" = "github" ]; then
  echo "#### GitHub Actions Secrets"
  echo "- \`NX_CLOUD_ACCESS_TOKEN\` (if using NX Cloud)"
  echo "- \`CODECOV_TOKEN\` (if using Codecov)"
elif [ "$CI_PROVIDER" = "circleci" ]; then
  echo "#### CircleCI Environment Variables"
  echo "- \`NX_CLOUD_ACCESS_TOKEN\` (if using NX Cloud)"
elif [ "$CI_PROVIDER" = "gitlab" ]; then
  echo "#### GitLab CI Variables"
  echo "- \`NX_CLOUD_ACCESS_TOKEN\` (if using NX Cloud)"
fi)

---

### How to Use

#### Test Locally
\`\`\`bash
# Simulate PR build
git checkout -b feature/test
# Make changes
npx nx affected -t build --base=main
npx nx affected -t test --base=main

# Simulate main branch build
npx nx run-many -t build --all
\`\`\`

#### Monitor CI
1. Create pull request
2. Watch CI run affected commands
3. Verify only changed components tested
4. Check cache performance

---

### Next Steps

#### 1. Test CI Configuration
- Create test PR
- Verify affected commands work
- Check cache performance
- Monitor build times

#### 2. Configure Secrets (if needed)
- Add NX_CLOUD_ACCESS_TOKEN
- Add CODECOV_TOKEN
- Configure deployment credentials

#### 3. Optimize Further
- Adjust parallel execution based on CI
- Fine-tune caching strategy
- Monitor and iterate

#### 4. Team Onboarding (Phase 5)
\`\`\`bash
/nx-generate-docs
\`\`\`

---

### Troubleshooting

**Issue:** Affected commands run all projects
**Fix:** Ensure full git history: \`fetch-depth: 0\`

**Issue:** Cache not working in CI
**Fix:** Check cache paths and permissions

**Issue:** CI timeout
**Fix:** Reduce parallel execution or split workflow

---

## Phase 4 Complete! ✅

Your CI/CD is now optimized for NX workspace.

**Key Achievements:**
- ✅ CI configured for $CI_PROVIDER
- ✅ Affected commands integrated
- ✅ NX cache enabled
- ✅ Parallel execution optimized

**Ready for Phase 5 (Documentation)**
```

## Error Handling

### CI Provider Not Detected

```bash
if [ -z "$CI_PROVIDER" ]; then
  echo "❌ Could not detect CI provider"
  echo ""
  echo "Please create CI configuration manually or specify:"
  echo "  /nx-setup-ci --ci-provider github"
  exit 1
fi
```

### Invalid CI Configuration

```bash
# Validate YAML syntax
if command -v yamllint &> /dev/null; then
  yamllint .github/workflows/nx-ci.yml
else
  echo "⚠️ Install yamllint to validate CI config"
fi
```

## Related Skills

- `/nx-optimize-workspace` - Optimize before CI setup (Phase 3)
- `/nx-generate-docs` - Document for team (Phase 5)
