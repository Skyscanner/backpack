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
- ✅ All 96 packages building successfully via Nx
- ✅ Build output matches current npm build (byte-identical where possible)
- ✅ Local Nx cache enabled with >50% cache hit rate on repeated builds
- ✅ No breaking changes to package APIs or build artifacts
- ✅ Documentation: Nx setup guide and command reference

### Deliverables

1. **Nx Configuration Files**
   - Global Nx configuration (nx.json)
   - Project configuration for each package (96 project.json files)
   - Updated root package.json with Nx scripts
   - Nx ignore patterns

2. **Build Integration**
   - Nx targets wrapping existing build scripts
   - Build validation scripts
   - Cache configuration

3. **Documentation**
   - Getting started guide
   - Milestone 1 completion report
   - Updated README with Nx commands

4. **Validation Reports**
   - Build output comparison
   - Performance baseline measurements
   - Cache effectiveness analysis

## Technical Approach

### Phase 1.1: Spike & Validation (Week 1)

#### Objective
Create experimental branch to validate Nx integration approach and measure baseline performance.

#### Strategy
- **Spike Branch Creation**: Create isolated experimental branch for validation
- **Nx Installation**: Install Nx and workspace packages as dev dependencies
- **Workspace Initialization**: Run Nx init to create initial workspace configuration
- **Single Package Test**: Choose a simple package (e.g., bpk-animate-height) for initial integration test
- **Build Validation**: Compare Nx build output with existing npm build output
- **Performance Baseline**: Measure and document current build, test, and lint times

#### Key Tasks
1. Install Nx core packages (@nx/workspace, nx)
2. Initialize Nx workspace in integrated monorepo mode
3. Create project.json for one test package with build target
4. Use nx:run-commands executor to wrap existing Babel build script
5. Build package with Nx and compare output with npm build
6. Document any differences (timestamps, file ordering, etc.)
7. Measure baseline performance metrics for comparison

#### Success Gate
- ✅ Single package builds successfully with Nx
- ✅ Build output is identical or differences are acceptable/documented
- ✅ Cache works for repeated builds
- ✅ No errors or warnings

### Phase 1.2: Workspace Configuration (Week 1-2)

#### Objective
Configure Nx workspace with proper structure and global settings.

#### Strategy
- **Workspace Structure**: Explicitly configure npm workspaces in root package.json
- **Nx Scripts**: Add convenience scripts for common Nx commands
- **Global Configuration**: Create nx.json with cache settings and target defaults
- **Cache Inputs**: Define what files affect each build target (source files, config files)
- **Cache Outputs**: Define what artifacts are produced by builds
- **Ignore Patterns**: Configure .nxignore and .gitignore for Nx-specific files

#### Key Tasks
1. Update root package.json with explicit workspaces configuration
2. Add Nx command shortcuts (build, build:affected, test, lint, graph)
3. Create nx.json with target defaults for build/test/lint
4. Define namedInputs for production vs. all files
5. Configure tasksRunnerOptions with caching and parallelization
6. Set up .nxignore to exclude unnecessary directories
7. Update .gitignore to exclude Nx cache directories

#### Success Gate
- ✅ Nx workspace properly configured
- ✅ Cache directory structure created
- ✅ No configuration errors

### Phase 1.3: Package Integration (Week 2)

#### Objective
Generate project.json configuration for all 96 packages.

#### Strategy
- **Automated Generation**: Create Node.js script to generate project.json for all packages
- **Consistent Structure**: Use standardized project.json template with build target
- **Special Cases**: Manually handle packages with unique build requirements
- **Project Detection**: Validate Nx can detect all packages correctly
- **Tagging Strategy**: Apply consistent tags (type:package, scope:backpack) for organization

#### Key Tasks
1. Write generator script to create project.json files programmatically
2. Scan packages/ directory and identify all valid packages
3. Generate project.json with name, sourceRoot, projectType, and build target
4. Use nx:run-commands executor to wrap existing Babel commands
5. Handle special cases:
   - bpk-stylesheets (custom build)
   - bpk-mixins (Sass-only, no TypeScript)
   - packages/package.json (shared config, not a project)
6. Run generator and create 96 project.json files
7. Validate project detection with `nx show projects`

#### Success Gate
- ✅ 96 project.json files generated
- ✅ All projects detected by Nx
- ✅ Special cases properly configured

### Phase 1.4: Build Integration (Week 2-3)

#### Objective
Integrate existing build pipeline with Nx targets.

#### Strategy
- **Build Wrapping**: Wrap existing build commands as Nx targets without changing logic
- **Gulp Preservation**: Maintain Gulp tasks for asset processing and Sass compilation
- **Custom Scripts**: Convert custom npm scripts to Nx targets
- **Dependency Orchestration**: Let Nx manage build order based on package dependencies
- **Output Validation**: Ensure Nx builds produce identical artifacts to npm builds

#### Key Tasks
1. Configure build targets to use existing Babel/Webpack/Gulp scripts
2. Preserve complex build pipelines (transpile, copy assets, generate types)
3. Add root-level project for workspace-wide tasks (Gulp, custom scripts)
4. Wrap utility scripts (check-dependencies, check-react-versions) as Nx targets
5. Test build execution with run-many for all packages
6. Validate build outputs match npm build outputs
7. Document any acceptable differences (timestamps, file ordering)
8. Use Nx graph to visualize package dependencies

#### Success Gate
- ✅ All 96 packages build successfully with Nx
- ✅ Build output matches baseline (acceptable differences documented)
- ✅ Custom scripts work as Nx targets
- ✅ Gulp tasks execute correctly

### Phase 1.5: Caching Validation (Week 3)

#### Objective
Validate Nx caching works correctly and provides performance benefits.

#### Strategy
- **Cache Effectiveness**: Measure build time with cold vs. warm cache
- **Cache Invalidation**: Verify changing files correctly invalidates cache
- **Selective Rebuild**: Ensure only affected packages rebuild on file changes
- **Configuration Tuning**: Adjust cache inputs/outputs based on test results
- **Documentation**: Explain caching behavior and troubleshooting

#### Key Tasks
1. Reset cache and measure full build time (cold cache)
2. Re-run build and measure time with warm cache (should be <5s)
3. Modify single package and verify only it rebuilds
4. Check that dependents of modified package also rebuild
5. Tune nx.json cache inputs to improve hit rate
6. Adjust parallel execution count for optimal performance
7. Create caching guide documentation

#### Success Gate
- ✅ Cache hit rate >50% on repeated builds
- ✅ Cache invalidation works correctly
- ✅ Only affected packages rebuild
- ✅ Documentation complete

### Phase 1.6: Documentation & Training (Week 3)

#### Objective
Document Milestone 1 changes and train team on basic Nx usage.

#### Strategy
- **Getting Started Guide**: Explain what Nx is and how to use it for common tasks
- **Command Reference**: Provide quick reference for Nx commands vs. npm scripts
- **README Update**: Add Nx section to main README
- **Migration Report**: Document what was accomplished and lessons learned
- **Team Training**: Conduct hands-on training session

#### Key Tasks
1. Create getting-started.md with Nx introduction and basic usage
2. Create nx-commands.md with command reference
3. Update root README with Nx build section
4. Write milestone-1-report.md with metrics and learnings
5. Conduct 1-hour team training session
6. Include hands-on exercises (build, cache, graph)

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

- [ ] Cache directory created (.nx/cache)
- [ ] Cache hit rate >50% on repeated builds
- [ ] Cache invalidation works (changing file rebuilds only affected packages)
- [ ] Cache clears properly
- [ ] Cache persists across terminal sessions

### Integration Validation Checklist

- [ ] npm run build works (calls Nx)
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

1. **Revert Branch**: Checkout main branch and delete migration branch
2. **Restore Dependencies**: Run npm install to restore original node_modules
3. **Verify Rollback**: Test that npm run build/test/lint work as before
4. **Document Issues**:
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

1. **Tag Release**: Create git tag for milestone completion
2. **Team Retrospective**: Review what went well and what to improve
3. **Proceed to Milestone 2**: [Testing & Linting Integration](./milestone-2-testing-linting.md)

## References

- **Nx Documentation**: https://nx.dev/getting-started/intro
- **Nx Integrated Monorepo**: https://nx.dev/concepts/integrated-vs-package-based
- **Nx Caching**: https://nx.dev/features/cache-task-results
- **Migration Spec**: [../spec.md](../spec.md)
- **Implementation Plan**: [../plan.md](../plan.md)
