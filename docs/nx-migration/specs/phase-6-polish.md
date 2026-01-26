# Phase 6: Final Polish

**Purpose**: Optimize CI/CD and complete documentation

**Total Specs**: 3
**Prerequisites**: Phase 4 complete (Phase 5 optional)
**Risk Level**: Low (mostly documentation and optimization)

---

## Spec 6.1: Update CI to use nx affected exclusively

**Description for Spec Kit**:

```
Optimize CI/CD pipelines to use NX's affected detection exclusively, dramatically reducing CI time.

Tasks:
1. Review current CI/CD configuration:
   - Identify all workflows in .github/workflows/ or equivalent
   - Note which workflows run tests, linting, builds

2. Update the test workflow to use nx affected:
   # .github/workflows/test.yml (example)
   name: Test

   on:
     pull_request:
       branches: [main]
     push:
       branches: [main]

   jobs:
     test:
       runs-on: ubuntu-latest
       env:
         NX_PLUGIN_NO_TIMEOUTS: true
         NX_SKIP_PROVENANCE_CHECK: true

       steps:
         - uses: actions/checkout@v4
           with:
             fetch-depth: 0  # Required for nx affected

         - name: Set up Node
           uses: actions/setup-node@v4
           with:
             node-version: '18'  # or your version

         - name: Install pnpm
           uses: pnpm/action-setup@v2
           with:
             version: 8  # or your version

         - name: Install dependencies
           run: pnpm install

         - name: Set NX SHAs
           uses: nrwl/nx-set-shas@v4

         - name: Run affected tests
           run: pnpm test:affected

         - name: Run affected linting
           run: pnpm lint:affected

3. Update the build workflow (if exists):
   - name: Build affected projects
     run: npx nx affected -t build

4. Add a workflow to run nx graph on main branch:
   # .github/workflows/publish-graph.yml
   name: Publish NX Graph

   on:
     push:
       branches: [main]

   jobs:
     publish-graph:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
         - run: pnpm install
         - name: Generate graph
           run: npx nx graph --file=project-graph.html
         - name: Upload graph
           # Upload to S3, GitHub Pages, or similar
           # This is optional but useful for visualization

5. Remove old CI workflows that are no longer needed:
   - Delete or archive workflows that ran all tests/linting
   - Keep only affected-based workflows

6. Test the CI changes:
   - Create a test branch
   - Make a small change to one component
   - Push and verify CI only runs tests for affected projects
   - Check CI logs to confirm: "NX Successfully ran target test for affected projects"

7. Document CI optimization results in docs/nx-migration/ci-optimization.md:
   ## CI Optimization Results

   **Before NX** (from baseline metrics):
   - Average CI time: [X minutes]
   - Full test suite: [Y minutes]
   - Full lint suite: [Z minutes]

   **After NX**:
   - Average CI time: [A minutes] (reduced by X%)
   - Affected tests only: [B minutes]
   - Affected linting only: [C minutes]

   **Example**: On a PR changing 1 component:
   - Old: Ran all 150 component tests (~X min)
   - New: Ran only 3 affected component tests (~Y min)
   - Speedup: Z%

8. Commit with message: "ci: Optimize pipelines to use nx affected detection"

Acceptance Criteria:
- All CI workflows use nx affected commands
- fetch-depth: 0 is set for checkout
- nrwl/nx-set-shas action is used
- NX environment variables are set
- Old non-affected workflows are removed
- Test PR shows reduced CI time
- CI optimization results are documented
- Changes are committed to git

Context:
This is where NX's value really shines. Instead of running all tests on every PR, NX only runs tests for code that actually changed. On large monorepos, this can reduce CI time by 70-90%.

The nx-set-shas action tells NX which commits to compare (base vs HEAD) to determine what's affected.
```

**Status**: ⬜ Not Started

**Notes**:
- This optimization can dramatically reduce CI costs
- Test thoroughly - affected detection must be reliable
- Keep full test workflow for main branch merges

---

## Spec 6.2: Create developer documentation

**Description for Spec Kit**:

```
Create comprehensive documentation for developers working in the NX monorepo.

Tasks:
1. Create docs/nx-migration/developer-guide.md with the following sections:

   # Backpack NX Developer Guide

   ## Quick Start

   ### Running Commands
   ```bash
   # Run tests for a specific component
   pnpm nx test bpk-component-badge

   # Run tests for all components
   pnpm test

   # Run tests only for changed components
   pnpm test:affected

   # Run linting for a component
   pnpm nx lint bpk-component-badge

   # Run all linting
   pnpm lint

   # Run linting only for changed components
   pnpm lint:affected

   # Start Storybook
   pnpm storybook

   # Generate project graph
   pnpm nx:graph
   ```

   ### Adding a New Component

   ```bash
   # Generate a new component library
   npx nx g @nx/react:library my-new-component --directory=libs/bpk-component-my-new-component

   # Or manually:
   ./tools/scripts/migrate-component.sh bpk-component-my-new-component
   ```

   ### Importing Components

   ```typescript
   // Use path mappings
   import { Badge } from '@skyscanner/backpack-web/bpk-component-badge';

   // Never use relative paths from libs/
   // ❌ Wrong: import { Badge } from '../../libs/bpk-component-badge';
   // ✅ Right: import { Badge } from '@skyscanner/backpack-web/bpk-component-badge';
   ```

   ### Project Structure

   ```
   backpack/
   ├── apps/           # Runnable applications
   ├── libs/           # Reusable component libraries
   │   ├── bpk-component-badge/
   │   │   ├── src/
   │   │   ├── project.json    # NX configuration
   │   │   ├── tsconfig.json   # TypeScript config
   │   │   └── jest.config.js  # Test config
   ├── tools/          # Build scripts and utilities
   ├── nx.json         # NX workspace configuration
   └── tsconfig.base.json  # Root TypeScript config with path mappings
   ```

   ### Understanding NX

   - **Project**: Each component is an NX project with its own project.json
   - **Target**: Commands like test, lint, build are called targets
   - **Affected**: NX analyzes git changes to determine what to test/build
   - **Caching**: NX caches task results for faster subsequent runs

   ### Troubleshooting

   #### NX daemon issues
   ```bash
   # Reset NX cache and daemon
   pnpm nx:reset
   ```

   #### Tests timing out locally
   ```bash
   # Reduce parallel tasks
   pnpm nx affected -t test --parallel=2
   ```

   #### Path mappings not resolving
   ```bash
   # Check tsconfig.base.json has the path mapping
   # Restart your IDE/editor
   ```

   ### Useful Commands

   ```bash
   # Show project graph
   pnpm nx:graph

   # Show what's affected by your changes
   pnpm nx affected:graph

   # Run all tasks for all projects
   pnpm nx run-many -t test,lint

   # Show NX info
   npx nx report

   # Clear cache
   pnpm nx:reset
   ```

   ### CI/CD

   - Pull requests only run tests for affected projects
   - Main branch runs full test suite
   - NX caching speeds up repeated builds

   ### Migration Context

   This repository was migrated from packages/ to libs/ structure in [DATE].
   See [docs/nx-migration/README.md](./README.md) for full migration history.

2. Update the root README.md to reference the developer guide:
   - Add a section "Working with NX"
   - Link to docs/nx-migration/developer-guide.md

3. Create a one-page quick reference: docs/nx-migration/quick-reference.md
   - Common commands
   - How to add a component
   - How to import a component
   - Troubleshooting tips

4. Update CONTRIBUTING.md (if it exists):
   - Update build/test commands to use NX
   - Add NX-specific guidelines
   - Update code organization section

5. Create a migration FAQ: docs/nx-migration/faq.md
   - Why did we migrate to NX?
   - What changed for developers?
   - Where did packages/ go?
   - How do I import components now?
   - What if I find a bug in the migration?

6. Commit with message: "docs: Add NX developer documentation"

Acceptance Criteria:
- developer-guide.md exists with all sections
- quick-reference.md provides one-page commands
- Root README.md links to NX docs
- CONTRIBUTING.md is updated
- FAQ addresses common questions
- All documentation is clear and tested
- Changes are committed to git

Context:
Good documentation prevents confusion and speeds up onboarding. Developers need to know how to work in the new NX structure. The docs should be practical with lots of examples.
```

**Status**: ⬜ Not Started

**Notes**:
- Test the documentation by having a team member follow it
- Keep it practical - focus on daily tasks
- Update as patterns emerge

---

## Spec 6.3: Measure and document success metrics

**Description for Spec Kit**:

```
Measure post-migration metrics and document the success of the NX migration.

Tasks:
1. Create docs/nx-migration/success-metrics.md

2. Re-run all baseline measurements from Phase 0:
   - Full build time: Time `pnpm build`
   - Full test time: Time `pnpm test`
   - Linting time: Time `pnpm lint`
   - CI pipeline duration: Check recent CI runs
   - Repository size: Run `du -sh .`
   - Node modules size: Run `du -sh node_modules`

3. Measure new NX-specific metrics:
   - Affected test time: Make small change, time `pnpm test:affected`
   - Affected lint time: Make small change, time `pnpm lint:affected`
   - Cache hit rate: Run tests twice, measure speedup
   - Project graph generation time: Time `pnpm nx:graph`

4. Document the comparison:
   ## NX Migration Success Metrics

   **Migration Completed**: [DATE]
   **Migration Duration**: [X weeks/months]
   **Specs Completed**: [N specs]
   **Specs Deferred**: [N specs]
   **Team Size**: [N developers]

   ### Performance Improvements

   | Metric | Before NX | After NX | Improvement |
   |--------|-----------|----------|-------------|
   | Full build | X min | Y min | Z% faster |
   | Full tests | X min | Y min | Z% faster |
   | Full lint | X min | Y min | Z% faster |
   | CI time (avg) | X min | Y min | Z% faster |
   | CI time (small PR) | X min | Y min | Z% faster |

   ### NX Features Unlocked

   - ✅ Affected detection (only test/lint changed code)
   - ✅ Computation caching (reuse test/build results)
   - ✅ Project graph visualization
   - ✅ Module boundary enforcement
   - ✅ Distributed task execution (future)
   - ⏳ TypeScript project references (deferred - if applicable)

   ### Code Organization

   | Metric | Before | After |
   |--------|--------|-------|
   | Number of packages | 152 | 150+ |
   | Circular dependencies | X | Y |
   | Lines of code | X | X |
   | Test coverage | X% | X% |

   ### Developer Experience

   **Positive Changes**:
   - Clear project boundaries with module boundary rules
   - Faster local development with caching
   - Visual project graph for understanding dependencies
   - Consistent structure across all components
   - Faster CI with affected detection

   **Challenges Encountered**:
   - [List challenges from learnings.md]
   - [List any remaining pain points]

   ### Lessons Learned

   [Reference docs/nx-migration/learnings.md for detailed lessons]

   Key insights:
   - [Top 3-5 learnings]

   ### ROI Analysis

   **Time Investment**:
   - Migration effort: [X developer-weeks]
   - Tooling setup: [X days]
   - Documentation: [X days]

   **Time Savings** (estimated annual):
   - Faster CI: [X hours/week] × 52 weeks = [Y hours/year]
   - Faster local dev: [X min/day] × 250 days = [Y hours/year]
   - Total: [Z hours/year]

   **Payback Period**: [X months]

   ### Recommendations for Other Teams

   [Advice for other teams considering NX migration]

   ### Future Improvements

   - [ ] Enable distributed task execution (Nx Cloud)
   - [ ] Complete TypeScript project references (if deferred)
   - [ ] Add more granular module boundary rules
   - [ ] Optimize caching configuration
   - [ ] Add custom generators for new components

5. Create a migration retrospective: docs/nx-migration/retrospective.md
   - What went well?
   - What could have been better?
   - What would we do differently?
   - Advice for future migrations

6. Compare against original goals:
   - Review the rationale for NX adoption
   - Verify each goal was achieved
   - Document any unmet goals and why

7. Create a presentation or demo:
   - Show before/after metrics
   - Demo nx affected in action
   - Show project graph
   - Share with leadership/team

8. Commit with message: "docs: Document NX migration success metrics"

Acceptance Criteria:
- All metrics are measured and documented
- Comparison table shows before/after
- ROI analysis is complete
- Lessons learned are documented
- Retrospective captures team feedback
- Presentation/demo is prepared
- Changes are committed to git

Context:
This is the victory lap! Document the hard work and success. These metrics justify the migration effort and provide a template for other teams. They also help the team understand the value of the work they completed.
```

**Status**: ⬜ Not Started

**Notes**:
- Be honest about challenges and limitations
- Celebrate the wins
- Share learnings with the wider organization

---

## Phase 6 Complete Checklist

Before declaring the migration complete, ensure:

- [ ] CI uses nx affected exclusively
- [ ] CI time is significantly reduced
- [ ] Developer guide is complete and tested
- [ ] Quick reference is available
- [ ] CONTRIBUTING.md is updated
- [ ] Success metrics are documented
- [ ] Retrospective is complete
- [ ] Team is trained on NX
- [ ] Presentation/demo is shared with leadership
- [ ] All documentation is committed to git

---

## 🎉 Migration Complete! 🎉

Congratulations! The NX migration is complete.

**What's been achieved**:
- ✅ 150+ components migrated to NX structure
- ✅ Full NX infrastructure in place
- ✅ CI optimized with affected detection
- ✅ Comprehensive documentation
- ✅ Team trained on NX workflow
- ✅ Success metrics documented

**What's next**:
- Monitor CI performance over time
- Gather team feedback on developer experience
- Consider Nx Cloud for distributed task execution
- Share learnings with other teams
- Celebrate! 🎉

**Thank you for your hard work on this migration!**

---

## Post-Migration Maintenance

### Ongoing Tasks

1. **Monitor NX performance**:
   - Track CI times weekly
   - Monitor cache hit rates
   - Adjust configuration as needed

2. **Update documentation**:
   - Keep developer guide current
   - Document new patterns as they emerge
   - Update quick reference

3. **NX upgrades**:
   - Follow [docs on NX updates](../../banana/docs/03-how-to-guides/nx-debug.md#updating-nx)
   - Update all @nx/* packages together using `nx migrate`
   - Never update individual @nx/* packages via Dependabot

4. **Refine module boundaries**:
   - Add more specific tags as architecture evolves
   - Tighten dependency rules
   - Document architectural decisions

5. **Address deferred components** (if any):
   - Fix circular dependencies
   - Migrate remaining components
   - Remove packages/ directory completely

### Future Enhancements

Consider these improvements:

- **Nx Cloud**: Distributed task execution and remote caching
- **Custom generators**: Templates for creating new components
- **Advanced caching**: More granular cache configuration
- **Module federation**: Share components across applications
- **Visual testing**: Integrate visual regression testing

### Resources

- [NX Documentation](https://nx.dev)
- [Banana NX Docs](file://../../banana/docs/)
- [Global Components AGENTS.md](file://../../global-components/AGENTS.md)
- Internal migration docs: docs/nx-migration/
