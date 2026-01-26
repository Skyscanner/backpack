# Milestone 1: Nx Foundation (PoC/MVP)

**Duration**: 2-3 weeks
**Status**: Not Started
**Dependencies**: None
**Next Milestone**: [Milestone 2: Testing & Linting](./milestone-2-testing-linting.md)

## Overview

### Goal

Initialize Nx workspace and establish basic build orchestration for all 96 Backpack packages while preserving existing build output and developer workflow.

### Success Criteria

- ✅ Nx installed and workspace configured
- ✅ All 96 packages building successfully via `nx build`
- ✅ Build output matches current `npm run build` (byte-identical where possible)
- ✅ Local Nx cache enabled with >50% cache hit rate on repeated builds
- ✅ No breaking changes to package APIs or build artifacts
- ✅ Documentation: Nx setup guide and command reference

### Deliverables

1. **Nx Configuration Files**:
   - `nx.json` - Global Nx configuration
   - `project.json` for each package (96 files)
   - Updated root `package.json` with Nx scripts
   - `.nxignore` file

2. **Build Scripts**:
   - Nx targets wrapping existing build scripts
   - Build validation scripts
   - Cache configuration

3. **Documentation**:
   - `docs/nx-migration/getting-started.md`
   - `docs/nx-migration/milestone-1-report.md`
   - Updated README with Nx commands

4. **Validation Reports**:
   - Build output comparison report
   - Performance baseline measurements
   - Cache effectiveness analysis

## Technical Approach

### Phase 1.1: Spike & Validation (Week 1)

#### Objective
Create experimental branch to validate Nx integration approach and measure baseline performance.

#### Tasks

1. **Create Spike Branch**
   ```bash
   git checkout -b spike/nx-integration-test
   ```

2. **Install Nx**
   ```bash
   npm install -D nx@latest @nx/workspace@latest
   ```

3. **Initialize Nx Workspace**
   ```bash
   npx nx init
   ```
   - Choose "Integrated monorepo" mode
   - Keep existing package.json scripts
   - Enable Nx cache

4. **Test Single Package Integration**
   - Choose simple package (e.g., `bpk-animate-height`)
   - Create `packages/bpk-animate-height/project.json`:
   ```json
   {
     "name": "bpk-animate-height",
     "sourceRoot": "packages/bpk-animate-height/src",
     "projectType": "library",
     "targets": {
       "build": {
         "executor": "nx:run-commands",
         "options": {
           "command": "babel src --out-dir dist --extensions \".ts,.tsx,.js,.jsx\"",
           "cwd": "packages/bpk-animate-height"
         },
         "outputs": ["{projectRoot}/dist"]
       }
     },
     "tags": ["type:package", "scope:backpack"]
   }
   ```

5. **Validate Build**
   ```bash
   # Build with Nx
   nx build bpk-animate-height

   # Build with npm (for comparison)
   cd packages/bpk-animate-height && npm run build

   # Compare outputs
   diff -r dist-nx/ dist-npm/
   ```

6. **Measure Performance Baseline**
   ```bash
   # Current build time
   time npm run build

   # Current test time
   time npm test

   # Current lint time
   time npm run lint

   # Document results in milestone-1-baseline.md
   ```

#### Success Gate
- ✅ Single package builds successfully with Nx
- ✅ Build output is identical
- ✅ Cache works for repeated builds
- ✅ No errors or warnings

### Phase 1.2: Workspace Configuration (Week 1-2)

#### Objective
Configure Nx workspace with proper structure and global settings.

#### Tasks

1. **Update Root package.json**

   Add explicit npm workspaces:
   ```json
   {
     "workspaces": [
       "packages/*"
     ]
   }
   ```

   Add Nx scripts:
   ```json
   {
     "scripts": {
       "nx": "nx",
       "build": "nx run-many --target=build --all",
       "build:affected": "nx affected --target=build",
       "test": "nx run-many --target=test --all",
       "test:affected": "nx affected --target=test",
       "lint": "nx run-many --target=lint --all",
       "lint:affected": "nx affected --target=lint",
       "graph": "nx graph"
     }
   }
   ```

2. **Create nx.json**

   ```json
   {
     "$schema": "./node_modules/nx/schemas/nx-schema.json",
     "defaultProject": "backpack-web",
     "targetDefaults": {
       "build": {
         "cache": true,
         "inputs": [
           "{projectRoot}/**/*",
           "!{projectRoot}/**/*.test.{ts,tsx,js,jsx}",
           "!{projectRoot}/**/*.md",
           "!{projectRoot}/**/.*",
           "{workspaceRoot}/babel.config.js",
           "{workspaceRoot}/tsconfig.json"
         ],
         "outputs": ["{projectRoot}/dist"]
       },
       "test": {
         "cache": true,
         "inputs": [
           "{projectRoot}/**/*",
           "{workspaceRoot}/jest.config.js",
           "{workspaceRoot}/babel.config.js"
         ]
       },
       "lint": {
         "cache": true,
         "inputs": [
           "{projectRoot}/**/*.{ts,tsx,js,jsx}",
           "{workspaceRoot}/.eslintrc.js",
           "{workspaceRoot}/.stylelintrc.json"
         ]
       }
     },
     "namedInputs": {
       "default": ["{projectRoot}/**/*"],
       "production": [
         "!{projectRoot}/**/*.test.{ts,tsx,js,jsx}",
         "!{projectRoot}/**/*.spec.{ts,tsx,js,jsx}",
         "!{projectRoot}/**/jest.config.{js,ts}",
         "!{projectRoot}/**/*.md"
       ]
     },
     "tasksRunnerOptions": {
       "default": {
         "runner": "nx/tasks-runners/default",
         "options": {
           "cacheableOperations": ["build", "test", "lint"],
           "parallel": 3
         }
       }
     }
   }
   ```

3. **Create .nxignore**

   ```
   node_modules
   dist
   dist-storybook
   dist-sassdoc
   .cache
   coverage
   ```

4. **Configure Git Ignore**

   Add to `.gitignore`:
   ```
   .nx/cache
   .nx/workspace-data
   ```

#### Success Gate
- ✅ Nx workspace properly configured
- ✅ Cache directory structure created
- ✅ No configuration errors

### Phase 1.3: Package Integration (Week 2)

#### Objective
Generate `project.json` for all 96 packages.

#### Tasks

1. **Create project.json Generator Script**

   Create `scripts/nx/generate-project-configs.js`:
   ```javascript
   const fs = require('fs');
   const path = require('path');

   const packagesDir = path.join(__dirname, '../../packages');
   const packages = fs.readdirSync(packagesDir)
     .filter(name => {
       const pkgPath = path.join(packagesDir, name);
       return fs.statSync(pkgPath).isDirectory() && name !== 'node_modules';
     });

   packages.forEach(pkgName => {
     const projectJson = {
       name: pkgName,
       sourceRoot: `packages/${pkgName}/src`,
       projectType: 'library',
       targets: {
         build: {
           executor: 'nx:run-commands',
           options: {
             command: 'babel src --out-dir dist --extensions ".ts,.tsx,.js,.jsx"',
             cwd: `packages/${pkgName}`
           },
           outputs: [`{projectRoot}/dist`]
         }
       },
       tags: [`type:package`, `scope:backpack`]
     };

     const outputPath = path.join(packagesDir, pkgName, 'project.json');
     fs.writeFileSync(outputPath, JSON.stringify(projectJson, null, 2));
     console.log(`Generated project.json for ${pkgName}`);
   });
   ```

2. **Generate All project.json Files**

   ```bash
   node scripts/nx/generate-project-configs.js
   ```

3. **Customize Special Cases**

   Some packages may need custom configurations:

   - **bpk-stylesheets**: Has custom build script
   - **bpk-mixins**: Sass-only package (no TypeScript build)
   - **packages/package.json**: Shared package.json (not a project)

   Manually adjust these project.json files.

4. **Validate Project Detection**

   ```bash
   # List all projects
   nx show projects

   # Should show all 96 packages
   # Verify count matches
   nx show projects | wc -l
   ```

#### Success Gate
- ✅ 96 project.json files generated
- ✅ All projects detected by Nx
- ✅ Special cases properly configured

### Phase 1.4: Build Integration (Week 2-3)

#### Objective
Integrate existing build pipeline with Nx targets.

#### Tasks

1. **Wrap Build Scripts**

   For packages with complex builds, create Nx executors:

   Example for main transpilation:
   ```json
   {
     "targets": {
       "transpile": {
         "executor": "nx:run-commands",
         "options": {
           "commands": [
             "npm run transpile:clean",
             "npm run transpile:js",
             "npm run transpile:dts",
             "npm run transpile:imports",
             "npm run transpile:copy-css",
             "npm run transpile:copy-utils"
           ],
           "parallel": false
         },
         "outputs": ["{workspaceRoot}/dist"]
       }
     }
   }
   ```

2. **Preserve Gulp Tasks**

   Add Gulp target to root-level project:
   ```json
   {
     "name": "backpack-root",
     "targets": {
       "gulp": {
         "executor": "nx:run-commands",
         "options": {
           "command": "gulp"
         },
         "outputs": []
       }
     }
   }
   ```

3. **Custom Script Integration**

   Wrap custom scripts as Nx targets:
   ```json
   {
     "targets": {
       "check-dependencies": {
         "executor": "nx:run-commands",
         "options": {
           "command": "node scripts/npm/check-bpk-dependencies.js"
         }
       },
       "check-react-versions": {
         "executor": "nx:run-commands",
         "options": {
           "command": "node scripts/npm/check-react-versions.js"
         }
       }
     }
   }
   ```

4. **Test Build Execution**

   ```bash
   # Build all packages
   nx run-many --target=build --all

   # Build specific package
   nx build bpk-component-button

   # Build with verbose output
   nx build bpk-component-button --verbose

   # View dependency graph
   nx graph
   ```

5. **Build Output Validation**

   ```bash
   # Build with npm (baseline)
   npm run build
   cp -r dist dist-baseline

   # Build with Nx
   npm run clean
   nx run-many --target=build --all
   cp -r dist dist-nx

   # Compare
   diff -r dist-baseline dist-nx > build-diff-report.txt

   # Analyze differences
   # Document any acceptable differences
   # Fix any unacceptable differences
   ```

#### Success Gate
- ✅ All 96 packages build successfully with Nx
- ✅ Build output matches baseline (acceptable differences documented)
- ✅ Custom scripts work as Nx targets
- ✅ Gulp tasks execute correctly

### Phase 1.5: Caching Validation (Week 3)

#### Objective
Validate Nx caching works correctly and provides performance benefits.

#### Tasks

1. **Cache Effectiveness Test**

   ```bash
   # Clean cache
   nx reset

   # First build (cold cache)
   time nx run-many --target=build --all
   # Record time: [___] seconds

   # Second build (warm cache)
   time nx run-many --target=build --all
   # Record time: [___] seconds
   # Should be <5 seconds

   # Calculate cache hit rate
   nx show cache
   ```

2. **Cache Invalidation Test**

   ```bash
   # Build all
   nx run-many --target=build --all

   # Modify single package
   echo "// cache test" >> packages/bpk-animate-height/src/index.ts

   # Rebuild
   time nx run-many --target=build --all
   # Only bpk-animate-height should rebuild
   # Dependents should also rebuild

   # Verify via Nx output
   nx build bpk-animate-height --verbose
   ```

3. **Cache Configuration Tuning**

   Adjust `nx.json` based on test results:
   - Add/remove inputs for better cache hit rate
   - Configure parallel execution count
   - Set cache directory location if needed

4. **Cache Documentation**

   Create `docs/nx-migration/caching-guide.md`:
   - How Nx caching works
   - When cache is invalidated
   - How to clear cache
   - Troubleshooting cache issues

#### Success Gate
- ✅ Cache hit rate >50% on repeated builds
- ✅ Cache invalidation works correctly
- ✅ Only affected packages rebuild
- ✅ Documentation complete

### Phase 1.6: Documentation & Training (Week 3)

#### Objective
Document Milestone 1 changes and train team on basic Nx usage.

#### Tasks

1. **Create Getting Started Guide**

   `docs/nx-migration/getting-started.md`:
   - What is Nx and why we're using it
   - New Nx commands vs. old npm scripts
   - How to use Nx cache
   - Common tasks (build, clean cache, view graph)
   - Troubleshooting basics

2. **Create Command Reference**

   `docs/nx-migration/nx-commands.md`:
   - Build commands
   - Cache management
   - Dependency graph
   - Affected commands (preview for Milestone 2)

3. **Update Root README**

   Add Nx section:
   ```markdown
   ## Building with Nx

   Backpack now uses Nx for build orchestration.

   ```bash
   # Build all packages
   npm run build
   # or
   nx run-many --target=build --all

   # Build single package
   nx build bpk-component-button

   # View dependency graph
   nx graph
   ```

   See [Nx Migration Guide](docs/nx-migration/getting-started.md) for details.
   ```

4. **Create Milestone 1 Report**

   `docs/nx-migration/milestone-1-report.md`:
   - What was accomplished
   - Performance metrics (baseline vs. Nx)
   - Issues encountered and resolutions
   - Lessons learned
   - Next steps (Milestone 2)

5. **Team Training Session**

   - 1-hour presentation covering:
     - Nx basics
     - New build workflow
     - Cache usage
     - Q&A
   - Hands-on exercises:
     - Build packages with Nx
     - View dependency graph
     - Understand cache behavior

#### Success Gate
- ✅ All documentation complete
- ✅ Team trained (>90% attendance)
- ✅ No blocking questions

## Validation & Testing

### Build Validation Checklist

- [ ] All 96 packages build successfully
- [ ] Build output matches baseline (byte-for-byte where possible)
- [ ] Documented acceptable differences (e.g., timestamps)
- [ ] No new errors or warnings
- [ ] Build time within 10% of baseline

### Cache Validation Checklist

- [ ] Cache directory created (`.nx/cache`)
- [ ] Cache hit rate >50% on repeated builds
- [ ] Cache invalidation works (changing file rebuilds only affected packages)
- [ ] Cache clears properly with `nx reset`
- [ ] Cache persists across terminal sessions

### Integration Validation Checklist

- [ ] `npm run build` works (calls Nx)
- [ ] Custom scripts work (check-bpk-dependencies, etc.)
- [ ] Gulp tasks execute correctly
- [ ] Package interdependencies respected
- [ ] No breaking changes to existing workflow

## Rollback Plan

### Trigger Conditions

Rollback Milestone 1 if:
- Build output differs significantly from baseline (>1% of files)
- Build time increases >20%
- Critical build failures that cannot be fixed within 2 days
- Team productivity drops >15%

### Rollback Procedure

1. **Revert Nx Installation**
   ```bash
   git checkout main
   git branch -D 001-nx-migration
   npm install
   ```

2. **Restore Original Scripts**
   ```bash
   git checkout main -- package.json
   npm install
   ```

3. **Verify Rollback**
   ```bash
   npm run build
   npm test
   # Verify all works as before
   ```

4. **Document Issues**
   - Document what went wrong
   - Identify root cause
   - Plan mitigation strategy
   - Reassess before next attempt

## Performance Targets

| Metric | Baseline | Target | Actual | Status |
|--------|----------|---------|--------|--------|
| Full Build Time | [TBD] | <110% baseline | [TBD] | ⏳ |
| Cached Build Time | N/A | <5s | [TBD] | ⏳ |
| Cache Hit Rate | 0% | >50% | [TBD] | ⏳ |
| Memory Usage | [TBD] | <120% baseline | [TBD] | ⏳ |

## Issues & Resolutions

### Known Issues

*To be filled during implementation*

### Resolved Issues

*To be filled during implementation*

## Next Steps

Upon Milestone 1 completion:

1. **Tag Release**
   ```bash
   git tag -a nx-milestone-1 -m "Milestone 1: Nx Foundation Complete"
   git push origin nx-milestone-1
   ```

2. **Team Retrospective**
   - What went well
   - What could be improved
   - Action items for Milestone 2

3. **Proceed to Milestone 2**
   - [Milestone 2: Testing & Linting Integration](./milestone-2-testing-linting.md)

## References

- **Nx Documentation**: https://nx.dev/getting-started/intro
- **Nx Integrated Monorepo**: https://nx.dev/concepts/integrated-vs-package-based
- **Nx Caching**: https://nx.dev/features/cache-task-results
- **Migration Spec**: [../spec.md](../spec.md)
- **Implementation Plan**: [../plan.md](../plan.md)
