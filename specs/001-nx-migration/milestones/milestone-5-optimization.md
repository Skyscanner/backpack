# Milestone 5: Optimization & Documentation

**Duration**: 1 week
**Status**: Not Started
**Dependencies**: Milestone 4 Complete
**Next Milestone**: None (Final Milestone)

## Overview

### Goal
Polish the Nx integration, create comprehensive documentation, train the team, and establish long-term maintenance procedures.

### Success Criteria
- ✅ All documentation complete and reviewed
- ✅ Team training conducted (>90% attendance)
- ✅ Nx generators for new packages available (optional)
- ✅ Performance optimization complete
- ✅ No blocking issues for 2 weeks post-migration
- ✅ Developer satisfaction >80%
- ✅ Maintenance procedures documented

## Technical Approach

### Phase 5.1: Nx Generators (Week 1, Optional)

#### Objective
Create Nx generators to scaffold new Backpack components following constitution standards.

#### Tasks

1. **Install Nx Generator Plugin**

   ```bash
   npm install -D @nx/plugin
   ```

2. **Create Component Generator**

   Create `tools/generators/component/index.ts`:
   ```typescript
   import {
     formatFiles,
     generateFiles,
     Tree,
     names,
   } from '@nx/devkit';
   import * as path from 'path';

   interface ComponentGeneratorSchema {
     name: string;
     description: string;
   }

   export default async function (tree: Tree, options: ComponentGeneratorSchema) {
     const normalizedOptions = normalizeOptions(options);

     // Generate package structure
     generateFiles(
       tree,
       path.join(__dirname, 'files'),
       `packages/bpk-component-${normalizedOptions.fileName}`,
       {
         ...normalizedOptions,
         template: '',
       }
     );

     // Format files
     await formatFiles(tree);
   }

   function normalizeOptions(options: ComponentGeneratorSchema) {
     const fileName = names(options.name).fileName;
     const className = names(options.name).className;
     const propertyName = names(options.name).propertyName;

     return {
       ...options,
       fileName,
       className,
       propertyName,
     };
   }
   ```

3. **Create Generator Templates**

   `tools/generators/component/files/`:
   ```
   ├── README.md.template
   ├── index.ts.template
   ├── project.json.template
   └── src/
       └── Bpk<%= className %>/
           ├── Bpk<%= className %>.tsx.template
           ├── Bpk<%= className %>.module.scss.template
           ├── Bpk<%= className %>-test.tsx.template
           └── accessibility-test.tsx.template
   ```

   Example `Bpk<%= className %>.tsx.template`:
   ```typescript
   /*
    * Backpack - Skyscanner's Design System
    *
    * Copyright 2016 Skyscanner Ltd
    *
    * Licensed under the Apache License, Version 2.0 (the "License");
    * ...
    */

   import type { ReactNode } from 'react';
   import styles from './Bpk<%= className %>.module.scss';

   export type Bpk<%= className %>Props = {
     children?: ReactNode;
     className?: string;
   };

   const Bpk<%= className %> = ({
     children,
     className
   }: Bpk<%= className %>Props) => {
     return (
       <div className={`${styles['bpk-<%= fileName %>']} ${className || ''}`}>
         {children}
       </div>
     );
   };

   export default Bpk<%= className %>;
   ```

4. **Register Generator**

   Add to `tools/generators/generators.json`:
   ```json
   {
     "generators": {
       "component": {
         "factory": "./component/index",
         "schema": "./component/schema.json",
         "description": "Create a new Backpack component"
       }
     }
   }
   ```

5. **Test Generator**

   ```bash
   # Generate test component
   nx generate @nx/workspace:component my-test-component

   # Verify structure
   ls packages/bpk-component-my-test-component/

   # Clean up
   rm -rf packages/bpk-component-my-test-component/
   ```

6. **Document Generator Usage**

   `docs/nx-migration/generators-guide.md`:
   ```markdown
   # Nx Generators for Backpack

   ## Create New Component

   ```bash
   nx generate @nx/workspace:component button-new \
     --description="A new button component"
   ```

   This creates:
   - Package structure in `packages/bpk-component-button-new/`
   - Component with TypeScript, tests, styles
   - Storybook examples
   - README with template
   - Proper license headers
   ```

#### Success Gate
- ✅ Generator creates valid component structure
- ✅ Generated code follows Backpack constitution
- ✅ License headers included
- ✅ Documentation complete

### Phase 5.2: Performance Optimization (Week 1)

#### Objective
Fine-tune Nx configuration for optimal performance based on real usage data.

#### Tasks

1. **Analyze Performance Metrics**

   Collect data from Milestones 1-4:
   ```
   Build Performance:
   - Full build: [___] sec (baseline: [___] sec)
   - Cached build: [___] sec
   - Affected build (avg): [___] sec

   Test Performance:
   - Full test: [___] sec (baseline: [___] sec)
   - Cached test: [___] sec
   - Affected test (avg): [___] sec

   Cache Metrics:
   - Local hit rate: [___]%
   - Cloud hit rate: [___]% (if enabled)
   - Cache size: [___] GB
   ```

2. **Optimize Cache Configuration**

   Tune `nx.json` based on analysis:
   ```json
   {
     "targetDefaults": {
       "build": {
         "cache": true,
         "inputs": [
           // Remove unnecessary inputs
           "{projectRoot}/src/**/*",
           "{workspaceRoot}/babel.config.js",
           "{workspaceRoot}/tsconfig.json"
           // Removed: "!{projectRoot}/**/*.md" (too broad)
         ],
         "outputs": ["{projectRoot}/dist"]
       }
     },
     "tasksRunnerOptions": {
       "default": {
         "options": {
           "parallel": 5,  // Optimized based on CI capacity
           "cacheDirectory": ".nx/cache"
         }
       }
     }
   }
   ```

3. **Optimize Project Dependencies**

   Use Nx graph to identify optimization opportunities:
   ```bash
   # View dependency graph
   nx graph

   # Find circular dependencies
   nx graph --focus=bpk-component-button

   # Analyze affected scope
   nx affected:graph --base=main
   ```

   Document any circular dependencies or optimization opportunities.

4. **Configure Task Pipelines**

   Set up task dependencies in `nx.json`:
   ```json
   {
     "targetDefaults": {
       "build": {
         "dependsOn": ["^build"]  // Build dependencies first
       },
       "test": {
         "dependsOn": ["build"]   // Build before test
       }
     }
   }
   ```

5. **Benchmark Final Performance**

   ```bash
   # Full clean build
   nx reset && time nx run-many --target=build --all

   # Cached build
   time nx run-many --target=build --all

   # Affected build (simulate typical PR)
   git checkout -b test/performance
   echo "// test" >> packages/bpk-animate-height/src/index.ts
   time nx affected:build --base=main
   ```

   Document final performance numbers.

#### Success Gate
- ✅ Build time <110% baseline
- ✅ Cache hit rate >80%
- ✅ No performance regressions
- ✅ Optimization recommendations documented

### Phase 5.3: Comprehensive Documentation (Week 1)

#### Objective
Create complete, user-friendly documentation for all Nx migration aspects.

#### Tasks

1. **Create Migration Documentation Hub**

   `docs/nx-migration/README.md`:
   ```markdown
   # Nx Migration Documentation

   Complete guide to Backpack's Nx migration.

   ## Quick Start
   - [Getting Started](./getting-started.md)
   - [Command Reference](./nx-commands.md)
   - [FAQ](./faq.md)

   ## For Developers
   - [Developer Workflow](./developer-workflow.md)
   - [Testing Guide](./testing-guide.md)
   - [Storybook Integration](./storybook-integration.md)
   - [Troubleshooting](./troubleshooting.md)

   ## For Team Leads
   - [Migration Timeline](./timeline.md)
   - [Performance Report](./performance-report.md)
   - [CI/CD Guide](./cicd-guide.md)
   - [Maintenance Guide](./maintenance-guide.md)

   ## Advanced
   - [Nx Generators](./generators-guide.md)
   - [Nx Cloud Guide](./nx-cloud-guide.md) (if enabled)
   - [Custom Executors](./custom-executors.md)
   ```

2. **Complete All Documentation Files**

   Ensure all referenced docs exist and are complete:
   - ✅ `getting-started.md`
   - ✅ `nx-commands.md`
   - ✅ `developer-workflow.md`
   - ✅ `testing-guide.md`
   - ✅ `storybook-integration.md`
   - ✅ `troubleshooting.md`
   - ✅ `cicd-guide.md`
   - ✅ `performance-report.md`
   - ✅ `maintenance-guide.md`
   - ✅ `faq.md`

3. **Create FAQ Document**

   `docs/nx-migration/faq.md`:
   ```markdown
   # Nx Migration FAQ

   ## General

   **Q: Why did we migrate to Nx?**
   A: To standardize with Skyscanner's monorepo approach, enable caching, and prepare for banana integration.

   **Q: Do I need to learn new commands?**
   A: Common npm scripts still work. Nx adds new capabilities but doesn't replace familiar workflows.

   **Q: What if I have issues?**
   A: Check [Troubleshooting Guide](./troubleshooting.md) or ask in #backpack Slack.

   ## Building

   **Q: How do I build a single package?**
   ```bash
   nx build bpk-component-button
   ```

   **Q: How do I build all packages?**
   ```bash
   npm run build
   # or
   nx run-many --target=build --all
   ```

   **Q: Why is my build cached?**
   A: Nx caches builds that haven't changed. Run `nx reset` to clear cache.

   ## Testing

   [Additional FAQ items...]
   ```

4. **Create Maintenance Guide**

   `docs/nx-migration/maintenance-guide.md`:
   ```markdown
   # Nx Maintenance Guide

   ## Upgrading Nx

   ```bash
   # Check for updates
   nx migrate latest

   # Review migrations
   cat migrations.json

   # Run migrations
   nx migrate --run-migrations

   # Test after upgrade
   npm run build && npm test
   ```

   ## Cache Management

   - **Clear local cache**: `nx reset`
   - **Check cache size**: `du -sh .nx/cache`
   - **Cache location**: `.nx/cache` (gitignored)

   ## Troubleshooting Common Issues

   ### Build not caching
   1. Check nx.json inputs/outputs
   2. Verify no random values in output
   3. Run with `--verbose` to see cache keys

   ### Affected detection wrong
   1. Ensure proper base branch: `nx affected --base=origin/main`
   2. Check project dependencies in nx.json
   3. Verify project.json configurations

   ## Monthly Maintenance Tasks

   - [ ] Review cache hit rates
   - [ ] Check for Nx updates
   - [ ] Review affected detection accuracy
   - [ ] Update documentation if needed
   ```

5. **Create Performance Report**

   `docs/nx-migration/performance-report.md`:
   ```markdown
   # Nx Migration Performance Report

   ## Executive Summary

   Backpack successfully migrated to Nx, achieving:
   - [___]% reduction in CI time
   - [___]% cache hit rate
   - [___] hours saved per week (estimated)
   - Zero breaking changes

   ## Baseline vs. Post-Migration

   | Metric | Before | After | Improvement |
   |--------|--------|-------|-------------|
   | Full Build | [___]s | [___]s | [___]% |
   | Cached Build | N/A | [___]s | N/A |
   | Full Test | [___]s | [___]s | [___]% |
   | Cached Test | N/A | [___]s | N/A |
   | CI (PR) | [___]m | [___]m | [___]% |
   | CI (Full) | [___]m | [___]m | [___]% |

   ## Cache Effectiveness

   - **Local Cache Hit Rate**: [___]%
   - **Cloud Cache Hit Rate**: [___]% (if enabled)
   - **Cache Size**: [___] GB
   - **Time Saved per Day**: [___] hours

   ## Developer Feedback

   Survey results (n=[___]):
   - Satisfaction: [___]% positive
   - Ease of use: [___]/5
   - Performance: [___]/5
   - Documentation: [___]/5

   ## Recommendations

   [Based on data, recommend future optimizations]
   ```

6. **Update Root Documentation**

   Update `README.md`, `CONTRIBUTING.md`, `CODE_REVIEW_GUIDELINES.md` with Nx references.

#### Success Gate
- ✅ All documentation complete
- ✅ Cross-links verified
- ✅ Examples tested
- ✅ Documentation reviewed by team

### Phase 5.4: Team Training (Week 1)

#### Objective
Ensure all team members can effectively use Nx.

#### Tasks

1. **Prepare Training Materials**

   - Slide deck: "Nx for Backpack Developers"
   - Hands-on exercises
   - Cheat sheet (printable/digital)
   - Video recordings (optional)

2. **Conduct Training Sessions**

   **Session 1: Nx Basics** (1 hour)
   - What is Nx and why we use it
   - Basic commands (build, test, lint)
   - Caching concepts
   - Viewing dependency graph
   - Q&A

   **Session 2: Advanced Nx** (30 min)
   - Affected commands
   - Generators (if available)
   - Troubleshooting
   - CI/CD changes
   - Q&A

   **Session 3: Hands-on Workshop** (1 hour)
   - Exercise 1: Build and cache
   - Exercise 2: Run affected tests
   - Exercise 3: Create component with generator
   - Exercise 4: Debug cache issues

3. **Record Sessions**

   Record training for:
   - New team members
   - Those who missed live sessions
   - Future reference

4. **Create Cheat Sheet**

   `docs/nx-migration/cheat-sheet.md`:
   ```markdown
   # Nx Cheat Sheet

   ## Common Commands

   | Task | Command |
   |------|---------|
   | Build all | `npm run build` or `nx run-many --target=build --all` |
   | Build one | `nx build bpk-component-button` |
   | Build affected | `nx affected:build` |
   | Test all | `npm test` or `nx run-many --target=test --all` |
   | Test one | `nx test bpk-component-button` |
   | Test affected | `nx affected:test` |
   | Lint all | `npm run lint` |
   | Clear cache | `nx reset` |
   | Dependency graph | `nx graph` |

   ## Tips

   - Use `--verbose` for detailed output
   - Use `--skip-nx-cache` to bypass cache
   - Use `--base=main` for affected commands
   ```

5. **Collect Feedback**

   Post-training survey:
   - Content clarity (1-5)
   - Pace (too fast/just right/too slow)
   - Documentation helpfulness (1-5)
   - Confidence using Nx (1-5)
   - What else needed?

#### Success Gate
- ✅ >90% team trained
- ✅ Materials available for reference
- ✅ Average satisfaction >4/5
- ✅ All questions answered

### Phase 5.5: Final Validation (Week 1)

#### Objective
Comprehensive final validation before declaring migration complete.

#### Tasks

1. **Full System Test**

   ```bash
   # Clean environment
   rm -rf node_modules dist .nx
   npm install

   # Full build
   nx run-many --target=build --all

   # Full test
   nx run-many --target=test --all

   # Lint
   nx run-many --target=lint --all

   # Storybook
   nx storybook:build

   # Verify outputs
   ls dist/
   ls dist-storybook/
   ```

2. **Regression Testing**

   Compare outputs:
   - Build artifacts
   - Test results
   - Published package
   - Storybook build

3. **Performance Validation**

   Final benchmarks:
   - Build time
   - Test time
   - Cache effectiveness
   - CI performance

4. **Developer Workflow Test**

   Simulate common workflows:
   - Clone repo → install → build → test
   - Make change → build affected → test affected
   - Create PR → CI validates
   - Merge PR → release

5. **Issue Tracking**

   Review issues:
   - Open issues from milestones
   - Resolve or document
   - Prioritize future work
   - Close migration project

#### Success Gate
- ✅ All tests pass
- ✅ No regressions found
- ✅ Performance targets met
- ✅ No blocking issues

### Phase 5.6: Migration Completion (Week 1)

#### Objective
Officially complete the migration and transition to normal operations.

#### Tasks

1. **Create Final Migration Report**

   `docs/nx-migration/final-report.md`:
   ```markdown
   # Nx Migration Final Report

   ## Project Overview

   - **Start Date**: [___]
   - **End Date**: [___]
   - **Duration**: [___] weeks
   - **Team Size**: [___]

   ## Milestones Completed

   - ✅ M1: Nx Foundation (2-3 weeks)
   - ✅ M2: Testing & Linting (2 weeks)
   - ✅ M3: Development Workflow (1-2 weeks)
   - ✅ M4: CI/CD & Caching (2 weeks)
   - ✅ M5: Optimization (1 week)

   ## Success Metrics

   | Metric | Target | Achieved | Status |
   |--------|--------|----------|--------|
   | Build Time | <110% | [___]% | ✅/❌ |
   | Cache Hit Rate | >80% | [___]% | ✅/❌ |
   | CI Time Reduction | >20% | [___]% | ✅/❌ |
   | Test Pass Rate | 100% | [___]% | ✅/❌ |
   | Developer Satisfaction | >80% | [___]% | ✅/❌ |

   ## Achievements

   - [List key achievements]

   ## Challenges Overcome

   - [List major challenges and solutions]

   ## Lessons Learned

   - [Key lessons for future migrations]

   ## Future Recommendations

   - [Suggested improvements]

   ## Acknowledgments

   - [Thank contributors]
   ```

2. **Team Announcement**

   Announce completion:
   - Slack #backpack channel
   - Team email
   - Confluence page
   - Celebrate success! 🎉

3. **Tag Final Release**

   ```bash
   git tag -a nx-migration-complete -m "Nx Migration Complete"
   git push origin nx-migration-complete
   ```

4. **Update Project Status**

   - Close migration project in project management tool
   - Archive migration documentation
   - Transition to maintenance mode

5. **Schedule Follow-up**

   Schedule 1-month and 3-month reviews:
   - Performance still meeting targets?
   - Any issues emerged?
   - Further optimizations needed?
   - Team feedback?

#### Success Gate
- ✅ Final report complete
- ✅ Team notified
- ✅ Release tagged
- ✅ Follow-ups scheduled

## Validation & Testing

### Documentation Quality Checklist

- [ ] All documents exist and are complete
- [ ] Cross-links verified and working
- [ ] Code examples tested
- [ ] Screenshots/diagrams included where helpful
- [ ] Reviewed by at least 2 team members
- [ ] Spell-checked and grammar-checked

### Training Effectiveness Checklist

- [ ] >90% team attendance
- [ ] All training materials prepared
- [ ] Hands-on exercises completed
- [ ] Q&A sessions conducted
- [ ] Feedback collected
- [ ] Average satisfaction >4/5

### Performance Validation Checklist

- [ ] All metrics meet or exceed targets
- [ ] No performance regressions
- [ ] Cache effectiveness validated
- [ ] CI/CD performance improved
- [ ] Developer workflow faster

## Rollback Plan

At this stage, full rollback unlikely but possible:

### Trigger Conditions

Rollback entire migration if:
- Critical unfixable bug
- Performance <90% baseline
- Team productivity drops >20%
- Stakeholder decision to abort

### Rollback Procedure

1. **Full Revert**
   ```bash
   git checkout main
   git branch -D 001-nx-migration
   rm -rf .nx node_modules
   git checkout -- .
   npm install
   npm run build && npm test
   ```

2. **Communication**
   - Notify team immediately
   - Explain reason
   - Document lessons learned
   - Plan future attempt

3. **Post-Mortem**
   - What went wrong?
   - What could we have done differently?
   - When can we try again?

## Performance Targets

| Metric | Baseline | Target | Actual | Status |
|--------|----------|--------|--------|--------|
| Full Build | [From M1] | <110% | [TBD] | ⏳ |
| Cached Build | N/A | <5s | [TBD] | ⏳ |
| Cache Hit Rate | 0% | >80% | [TBD] | ⏳ |
| Developer Satisfaction | N/A | >80% | [TBD] | ⏳ |
| CI Time Reduction | [From M4] | >20% | [TBD] | ⏳ |

## Documentation Deliverables

All documentation complete:

- ✅ Getting Started Guide
- ✅ Command Reference
- ✅ Developer Workflow Guide
- ✅ Testing Guide
- ✅ Storybook Integration Guide
- ✅ CI/CD Guide
- ✅ Troubleshooting Guide
- ✅ FAQ
- ✅ Maintenance Guide
- ✅ Performance Report
- ✅ Final Report
- ✅ Cheat Sheet
- ✅ Generators Guide (if applicable)
- ✅ Nx Cloud Guide (if applicable)

## Issues & Resolutions

### Known Issues

*To be filled during implementation*

### Resolved Issues

*To be filled during implementation*

## Next Steps

After Milestone 5 completion:

1. **Migration Complete** 🎉
   - Nx fully integrated
   - Team trained
   - Documentation complete
   - Performance validated

2. **Transition to Maintenance**
   - Monthly Nx updates
   - Cache optimization reviews
   - Documentation updates
   - Team support

3. **Future Enhancements**
   - Evaluate Nx Cloud (if not already enabled)
   - Explore advanced Nx features
   - Consider banana integration
   - Investigate build tool upgrades (Vite/esbuild)

## References

- **Nx Documentation**: https://nx.dev/
- **Nx Generators**: https://nx.dev/plugin-features/use-code-generators
- **Migration Spec**: [../spec.md](../spec.md)
- **Implementation Plan**: [../plan.md](../plan.md)
- **All Milestones**:
  - [M1: Foundation](./milestone-1-nx-foundation.md)
  - [M2: Testing](./milestone-2-testing-linting.md)
  - [M3: Workflow](./milestone-3-dev-workflow.md)
  - [M4: CI/CD](./milestone-4-cicd-caching.md)
  - [M5: Optimization](./milestone-5-optimization.md) (this document)
