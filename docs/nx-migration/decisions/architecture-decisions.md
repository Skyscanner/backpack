# Nx Migration Architecture Decisions

This document records key architectural decisions made during the Backpack Nx migration, including rationale, alternatives considered, and trade-offs.

## Decision Log

- [AD-001: Nx Cache Storage Strategy](#ad-001-nx-cache-storage-strategy)
- [AD-002: Package Structure Organization](#ad-002-package-structure-organization)
- [AD-003: Storybook Integration Approach](#ad-003-storybook-integration-approach)
- [AD-004: Nx Workspace Structure](#ad-004-nx-workspace-structure)
- [AD-005: Build Tool Preservation](#ad-005-build-tool-preservation)
- [AD-006: CI/CD Integration Strategy](#ad-006-cicd-integration-strategy)
- [AD-007: Percy Integration Method](#ad-007-percy-integration-method)

---

## AD-001: Nx Cache Storage Strategy

**Status**: ✅ Implemented | **Date**: 2026-01-26 | **Milestone**: M1

### Context

Nx supports two caching strategies:
1. **Local cache**: Stored on developer's machine and CI agents
2. **Nx Cloud**: Distributed remote cache shared across team and CI

### Decision

Use **local cache only** initially, with option to enable Nx Cloud later.

### Rationale

**Why local cache**:
- Zero additional cost
- Simpler setup (no credentials, no cloud configuration)
- Sufficient for 99%+ performance improvement
- Proven by M1-M3 results (81% faster builds, 99%+ Storybook cache hits)
- Aligns with Falcon and Global-Components repositories (neither use Nx Cloud)

**When to reconsider Nx Cloud**:
- Team size grows (>20 developers)
- CI costs become significant
- Remote cache sharing becomes valuable
- Distributed task execution needed

### Alternatives Considered

**Option A**: Nx Cloud from the start
- ❌ Additional cost and complexity
- ❌ Requires Skyscanner enterprise Nx Cloud setup
- ❌ Adds dependency on external service
- ✅ Would provide remote cache sharing
- ✅ Would enable distributed CI execution

**Option B**: Self-hosted Nx Cloud (OSS)
- ❌ Maintenance overhead
- ❌ Infrastructure setup required
- ❌ Limited features vs enterprise
- ✅ No licensing cost

**Option C**: Local cache only (chosen)
- ✅ Zero cost
- ✅ Simple setup
- ✅ Proven effective (99%+ cache hits)
- ✅ Can enable Nx Cloud later if needed
- ❌ No cross-machine cache sharing

### Trade-offs

**Pros**:
- Immediate benefits without infrastructure setup
- Lower migration risk
- Zero ongoing cost
- Simple mental model for team

**Cons**:
- Each developer builds their own cache (no sharing)
- CI cache doesn't benefit local development
- No distributed task execution
- No Nx Cloud analytics dashboard

### Implementation

```json
// nx.json
{
  // Nx Cloud explicitly NOT configured
  // Uses local cache at .nx/cache/
}
```

### References

- [Nx Cloud Guide](./nx-cloud-guide.md)
- [Milestone 1 Report](./milestone-1-report.md)
- Banana (uses Nx Cloud): https://skyscanner.gc.ent.nx.app
- Falcon (local cache only): Similar approach
- Global-Components (local cache only): Similar approach

---

## AD-002: Package Structure Organization

**Status**: ✅ Implemented | **Date**: 2026-01-26 | **Milestone**: M1

### Context

Backpack has 96 packages in a flat `packages/` directory structure. Nx typically recommends organizing by type (apps, libs) or domain.

### Decision

**Preserve current `packages/` directory structure** without reorganization.

### Rationale

**Why preserve structure**:
- Minimizes migration complexity and risk
- Zero breaking changes to import paths
- Maintains compatibility with existing documentation
- Team familiarity with current structure
- Nx supports custom project structures
- Aligns with "no breaking changes" constraint

**Current structure**:
```
packages/
├── bpk-component-button/
├── bpk-component-card/
├── bpk-react-utils/
└── ... (96 total)
```

**Continues to work with Nx** via `project.json` in each package.

### Alternatives Considered

**Option A**: Reorganize by type
```
libs/
├── components/
│   ├── button/
│   └── card/
├── utilities/
│   └── react-utils/
└── tokens/
```
- ❌ Breaks all import paths
- ❌ Requires updating 1000+ import statements
- ❌ Breaking change for consumers
- ❌ High migration risk

**Option B**: Reorganize by domain
```
libs/
├── core/
├── layout/
├── navigation/
└── forms/
```
- ❌ Same issues as Option A
- ❌ Requires domain categorization decisions

**Option C**: Keep current structure (chosen)
- ✅ Zero breaking changes
- ✅ Minimal migration risk
- ✅ Team familiarity
- ✅ Nx fully supports it
- ❌ Less "Nx-like" organization

### Trade-offs

**Pros**:
- No import path updates needed
- Preserves all documentation and tooling
- Lower migration risk
- Faster migration timeline

**Cons**:
- Less consistent with typical Nx repositories
- May be harder for new team members familiar with Nx conventions

### Future Considerations

Can reorganize post-migration if:
- Banana integration requires specific structure
- Team prefers Nx-style organization
- Benefits outweigh migration cost

Would require:
- Major version bump (breaking change)
- Coordinated update with consumers
- Documentation updates

---

## AD-003: Storybook Integration Approach

**Status**: ✅ Implemented | **Date**: 2026-01-26 | **Milestone**: M3

### Context

Storybook 10 is already configured and working. Nx provides `@nx/storybook` plugin for deeper integration.

### Decision

**Use custom integration**: Wrap existing Storybook config as Nx targets, don't use `@nx/storybook` plugin.

### Rationale

**Why custom integration**:
- Storybook 10.1.11 already working perfectly
- @nx/storybook plugin compatibility untested with current setup
- Lower migration risk by preserving working configuration
- Nx can execute Storybook via custom targets
- Achieves 99%+ caching benefit without plugin

**Results from M3**:
- Storybook build: 99%+ faster (60-90s → <1s cached)
- Percy workflow: 75% faster (90-120s → 30s)
- Zero breaking changes to Storybook config

### Alternatives Considered

**Option A**: Use @nx/storybook plugin
- ❌ Untested compatibility with Storybook 10
- ❌ May require config restructuring
- ❌ Higher migration risk
- ✅ More "official" Nx integration
- ✅ Potential for additional optimizations

**Option B**: Custom integration (chosen)
- ✅ Preserves working Storybook config
- ✅ Lower migration risk
- ✅ Still gets 99%+ caching benefit
- ✅ Can evaluate plugin post-migration
- ❌ Less tight Nx integration

### Trade-offs

**Pros**:
- Proven to work (99%+ cache hits achieved)
- No Storybook config changes needed
- Lower risk, faster migration

**Cons**:
- May miss some @nx/storybook features
- Less idiomatic Nx setup

### Implementation

```json
// project.json (root)
{
  "targets": {
    "storybook": {
      "executor": "nx:run-commands",
      "options": {
        "command": "npm run storybook:start"
      }
    },
    "storybook:build": {
      "executor": "nx:run-commands",
      "options": {
        "command": "npm run storybook:dist"
      },
      "cache": true,
      "inputs": [/* all package files */],
      "outputs": ["{projectRoot}/dist-storybook"]
    }
  }
}
```

### References

- [Milestone 3 Report](./milestone-3-report.md)
- [Storybook & Percy Guide](./storybook-percy.md)

---

## AD-004: Nx Workspace Structure

**Status**: ✅ Implemented | **Date**: 2026-01-26 | **Milestone**: M1

### Context

Nx supports different workspace configurations:
1. **Single-root**: One workspace, all projects in subdirectories
2. **Package-based**: Multiple workspaces (rare)

### Decision

**Single-root workspace** with project-based configuration (`project.json` per package).

### Rationale

**Why single-root**:
- Each package in `packages/` becomes an Nx project
- Use `project.json` for per-package configuration
- Root `nx.json` for global settings and defaults
- Enables package-level caching and task orchestration
- Aligns with Backpack's package-per-component architecture
- Standard Nx approach for monorepos

**Structure**:
```
backpack/
├── nx.json                 # Global Nx config
├── package.json           # Root package
├── packages/
│   ├── bpk-component-button/
│   │   ├── project.json   # Nx project config
│   │   ├── package.json   # npm package
│   │   └── src/
│   └── ...
```

### Alternatives Considered

**Option A**: Standalone configuration (nx.json only)
- ❌ Less flexible per-package configuration
- ❌ Harder to customize package-specific settings

**Option B**: Project-based configuration (chosen)
- ✅ Granular control per package
- ✅ Clear separation of concerns
- ✅ Easier to maintain
- ❌ More files to manage (but automated generation)

### Trade-offs

**Pros**:
- Flexible per-package configuration
- Clear project boundaries
- Easy to customize individual packages

**Cons**:
- 96 `project.json` files to maintain
- Slightly more verbose than standalone config

### Mitigation

Created scripts to generate `project.json` files automatically:
```bash
npm run nx-init  # Generates all project.json files
```

---

## AD-005: Build Tool Preservation

**Status**: ✅ Implemented | **Date**: 2026-01-26 | **Milestone**: M1

### Context

Backpack uses various build tools:
- Webpack 5 for bundling
- Babel 7 for transpilation
- Gulp for build tasks
- Sass for styling

Nx provides alternative tools (@nx/webpack, @nx/vite, etc.).

### Decision

**Keep all existing build tools** - Nx acts as orchestration layer only.

### Rationale

**Why preserve tools**:
- Reduces migration scope and risk dramatically
- Tools are proven and working well
- Team has expertise with current tooling
- Allows future tool migrations independently
- Nx is tool-agnostic (works with any build system)

**Nx role**:
- Task orchestration
- Caching outputs
- Dependency graph management
- Parallel execution
- NOT replacing build tools

### Alternatives Considered

**Option A**: Migrate to @nx/webpack
- ❌ Requires significant config migration
- ❌ Higher risk of breaking builds
- ❌ Team relearning required
- ✅ More integrated Nx experience

**Option B**: Preserve existing tools (chosen)
- ✅ Minimal migration risk
- ✅ Proven working configuration
- ✅ Team expertise maintained
- ✅ Can migrate tools independently later
- ❌ Less tight Nx integration

### Trade-offs

**Pros**:
- Lower migration risk
- Faster migration timeline
- Preserves team expertise
- Flexibility for future changes

**Cons**:
- May not leverage all Nx capabilities
- Less idiomatic Nx setup

### Future Considerations

Can migrate to Nx-provided tools later if:
- Build tool migration becomes necessary
- Team wants tighter Nx integration
- Nx tools provide clear benefits

Would be independent migration, not affecting Nx orchestration.

---

## AD-006: CI/CD Integration Strategy

**Status**: ✅ Implemented | **Date**: 2026-01-27 | **Milestone**: M4

### Context

CI/CD needs to balance speed and completeness:
- PRs need fast feedback
- Main branch needs full validation
- Releases need complete builds

### Decision

**Use `nx affected` for PRs, `nx run-many --all` for main/release**.

### Rationale

**PR strategy (affected)**:
- Only build/test changed packages
- Fast feedback (40-80% faster)
- Encourages frequent commits
- Lower CI costs

**Main/release strategy (all)**:
- Full validation after merge
- Ensures complete integration
- Catches any missed issues
- Required for releases

**Implementation**:
```yaml
# PR: Affected only
- if: github.event_name == 'pull_request'
  run: npx nx affected --target=build --base=origin/main

# Main: All packages
- if: github.event_name != 'pull_request'
  run: npx nx run-many --target=build --all
```

### Alternatives Considered

**Option A**: Always use affected
- ❌ Main branch might miss integration issues
- ❌ Release builds might be incomplete

**Option B**: Always run all
- ❌ Slow PR feedback (no performance gain)
- ❌ Higher CI costs
- ❌ Discourages frequent commits

**Option C**: Conditional strategy (chosen)
- ✅ Fast PR feedback
- ✅ Complete main branch validation
- ✅ Optimal for both contexts

### Trade-offs

**Pros**:
- Optimal speed/completeness balance
- Lower CI costs
- Faster developer feedback

**Cons**:
- Slightly more complex workflow logic
- Potential for rare integration issues in PRs

### Mitigation

- Main branch runs full validation
- Pre-release testing catches any issues
- Comprehensive test coverage

### Results

From M4 implementation:
- PR validation (small): 60-80% faster
- PR validation (medium): 40-60% faster
- Main branch: 20-30% faster (parallelization)

### References

- [CI/CD Guide](./cicd-guide.md)
- [Milestone 4 Report](./milestone-4-report.md)

---

## AD-007: Percy Integration Method

**Status**: ✅ Implemented | **Date**: 2026-01-26 | **Milestone**: M3

### Context

Percy visual testing requires Storybook to be built first. Need to decide how to handle this dependency.

### Decision

**Create `percy` Nx target that depends on `storybook:build`**.

### Rationale

**Why explicit dependency**:
- Nx automatically builds Storybook if needed
- Leverages Storybook caching (99%+ faster)
- Single command for Percy tests
- Clear dependency relationship
- Prevents Percy running without Storybook

**Implementation**:
```json
{
  "targets": {
    "percy": {
      "executor": "nx:run-commands",
      "options": {
        "command": "npm run percy-test"
      },
      "dependsOn": ["storybook:build"],
      "cache": true
    }
  }
}
```

### Alternatives Considered

**Option A**: Manual Storybook build in Percy script
- ❌ No caching benefit
- ❌ Always rebuilds Storybook
- ❌ Percy test takes 90-120s every time

**Option B**: Nx dependency (chosen)
- ✅ Automatic Storybook build if needed
- ✅ Leverages caching (99%+ faster)
- ✅ Percy workflow now 75% faster
- ✅ Single command: `npx nx percy`

### Trade-offs

**Pros**:
- Optimal performance (75% faster workflow)
- Simple developer experience
- Automatic dependency management

**Cons**:
- Requires understanding Nx dependencies
- Slightly more complex setup

### Results

From M3 implementation:
- Percy workflow: 75% faster (90-120s → 30s)
- Storybook cache hits: 99%+
- Developer time saved per Percy run: ~60-90s

### References

- [Milestone 3 Report](./milestone-3-report.md)
- [Storybook & Percy Guide](./storybook-percy.md)

---

## Summary of Decisions

| Decision | Status | Milestone | Key Benefit |
|----------|--------|-----------|-------------|
| AD-001: Local cache only | ✅ Implemented | M1 | Zero cost, 99%+ cache hits |
| AD-002: Preserve package structure | ✅ Implemented | M1 | Zero breaking changes |
| AD-003: Custom Storybook integration | ✅ Implemented | M3 | 99%+ caching, low risk |
| AD-004: Project-based workspace | ✅ Implemented | M1 | Flexible configuration |
| AD-005: Preserve build tools | ✅ Implemented | M1 | Low migration risk |
| AD-006: Conditional CI strategy | ✅ Implemented | M4 | 40-80% faster PRs |
| AD-007: Percy depends on Storybook | ✅ Implemented | M3 | 75% faster workflow |

## Decision-Making Principles

Throughout the migration, we followed these principles:

1. **Minimize Risk**: Prefer proven approaches over cutting-edge
2. **Incremental Value**: Each milestone provides immediate benefits
3. **No Breaking Changes**: Preserve all existing APIs and workflows
4. **Team Expertise**: Leverage existing knowledge
5. **Flexibility**: Can revisit decisions based on learnings
6. **Performance First**: Measure and optimize continuously

## Future Decisions

Potential future architectural decisions:

- **Nx Cloud**: Revisit quarterly based on team size and CI costs
- **Build Tool Migration**: Consider @nx/webpack or @nx/vite if benefits are clear
- **Package Reorganization**: If Banana integration requires it
- **Distributed Task Execution**: If CI becomes bottleneck
- **Nx Generators**: For scaffolding new packages/components

## References

- [Implementation Plan](../../specs/001-nx-migration/plan.md)
- [Migration Spec](../../specs/001-nx-migration/spec.md)
- [Milestone Reports](.)
- [CI/CD Guide](./cicd-guide.md)
- [Nx Documentation](https://nx.dev)

## Feedback and Updates

These decisions are living documents. If you have feedback or want to propose changes:

1. Create a GitHub issue with [RFC] prefix
2. Discuss in #backpack Slack channel
3. Propose updates to this document via PR

Last updated: 2026-01-27
