# Phase 0: Research & Discovery - NX Silent Installation

**Feature**: NX Silent Installation (nx@22.4.0)
**Date**: 2026-01-27
**Research Objective**: Determine how to install NX 22.4.0 without impacting existing workflows

## Research Summary

This is an infrastructure installation task, not a component development task. NX will be installed in silent mode with all features disabled to prepare for gradual adoption.

## Key Findings

### 1. NX npm Preset Pattern

**Decision**: Use `nx/presets/npm.json` preset for minimal integration
**Rationale**: The npm preset treats NX as a passive tool that doesn't interfere with existing npm scripts. It enables NX commands to be available but doesn't modify workflow.
**Alternatives considered**:
- Integrated preset (rejected - too invasive, would modify scripts)
- Custom configuration (rejected - unnecessary complexity)
**Architecture Decision Reference**: NX documentation recommends npm preset for gradual adoption

### 2. Silent Configuration Strategy

**Decision**: Configure nx.json with empty plugins array and empty cacheableOperations
**Rationale**: This prevents NX from:
- Auto-detecting projects
- Caching any operations
- Modifying any build/test behavior
- Activating any features
**Alternatives considered**:
- Minimal plugins (rejected - could still activate features)
- No nx.json (rejected - NX creates one automatically with defaults)
**Architecture Decision Reference**: Per NX docs, explicit empty arrays override defaults

### 3. Package Installation Approach

**Decision**: Install as devDependency with exact version pinning (22.4.0)
**Rationale**:
- DevDependency ensures NX is only used during development
- Exact version prevents unexpected updates
- Version 22.4.0 is stable and well-tested
**Alternatives considered**:
- Dependency (rejected - not needed in production)
- Caret range (rejected - want stability)
**Architecture Decision Reference**: Backpack convention for build tools

### 4. Git Ignore Patterns

**Decision**: Add `.nx/cache` and `.nx/workspace-data` to .gitignore
**Rationale**:
- These directories contain NX's internal cache and metadata
- Should never be committed to version control
- Similar to node_modules, .sass-cache patterns
**Alternatives considered**:
- Ignore entire `.nx` directory (rejected - may contain config in future)
**Architecture Decision Reference**: Follows existing Backpack patterns for build artifacts

### 5. Verification Strategy

**Decision**: Use npx nx --version and npm script execution for verification
**Rationale**:
- `npx nx --version` confirms correct installation
- Running existing scripts confirms no behavior changes
- CI passing confirms no pipeline impact
**Alternatives considered**:
- Deep inspection of NX internals (rejected - unnecessary)
**Architecture Decision Reference**: Standard verification pattern

## Package.json Analysis

**Current structure**:
- Uses npm-run-all (run-s) for script orchestration
- Scripts are defined in specific order with dependencies
- Uses gulp, babel, webpack, jest for build/test
- Has postinstall hook for packages/ directory
- No workspace configuration currently

**Impact of NX**:
- With empty plugins/cacheableOperations, NX will NOT intercept these scripts
- npm scripts will continue executing exactly as before
- NX becomes available for manual use via `npx nx` but won't activate automatically

## Current .gitignore Analysis

**Existing patterns**:
- Build artifacts: /dist, /dist-sassdoc, /dist-storybook
- Dependencies: node_modules
- Generated files: *.css (with exceptions)
- IDE files: .DS_Store, .idea, .vscode
- Cache: .sass-cache, /coverage

**NX additions alignment**:
- `.nx/cache` aligns with existing cache patterns (.sass-cache, /coverage)
- `.nx/workspace-data` aligns with generated artifacts pattern

## NX Version Compatibility

**NX 22.4.0 Requirements**:
- Node.js: >=18.0.0 (Backpack requires >=18.20.4 ✅)
- npm: >=8.0.0 (Backpack requires >=10.7.0 ✅)
- No conflicts with existing dependencies

**Tested compatibility**:
- Works with npm workspaces (Backpack uses lerna-like structure)
- Compatible with existing build tools (gulp, webpack, babel)
- No conflicts with jest, eslint, stylelint

## Scripts Verification Plan

**Scripts to verify unchanged**:
1. `npm test` - Runs lint, checks, and jest
2. `npm run lint` - Runs ESLint and Stylelint
3. `npm run build` - Runs gulp and sass compilation
4. `npm run storybook` - Starts Storybook dev server

**Verification method**:
- Capture baseline output and timing before installation
- Compare post-installation output and timing
- Ensure no new warnings or errors
- Confirm execution time within ±5%

## nx.json Configuration Schema

**Required fields**:
```json
{
  "$schema": "./node_modules/nx/schemas/nx-schema.json",
  "extends": "nx/presets/npm.json",
  "affected": { "defaultBase": "main" },
  "tasksRunnerOptions": {
    "default": {
      "runner": "nx/tasks-runners/default",
      "options": { "cacheableOperations": [] }
    }
  },
  "targetDefaults": {},
  "plugins": []
}
```

**Field explanations**:
- `$schema`: Enables IDE autocomplete for nx.json
- `extends`: Inherits npm preset (minimal integration)
- `affected.defaultBase`: Sets main as base branch for affected commands
- `tasksRunnerOptions`: Configures task runner with empty cache
- `targetDefaults`: Empty - no target configuration
- `plugins`: Empty array - no plugins activated

## Risk Assessment

**Risks**:
1. **Risk**: NX auto-detects and modifies behavior despite configuration
   **Mitigation**: Empty plugins/cacheableOperations arrays prevent auto-detection

2. **Risk**: npm scripts behavior changes due to NX installation
   **Mitigation**: Verification testing before and after, rollback plan ready

3. **Risk**: CI pipeline fails due to NX presence
   **Mitigation**: nx.json configuration ensures NX is passive

4. **Risk**: Developer confusion about NX presence
   **Mitigation**: Clear documentation, no visible changes to workflow

**Rollback plan**:
1. Remove nx from devDependencies
2. Delete nx.json
3. Remove .nx entries from .gitignore
4. Run `npm install`
5. Verify scripts work as before

## Next Steps (Phase 1)

Phase 1 is not applicable for this infrastructure installation. The implementation is straightforward:
1. Install nx@22.4.0 as devDependency
2. Create nx.json with silent configuration
3. Update .gitignore
4. Verify scripts work unchanged
5. Test CI pipeline

No API design or styling guide needed for infrastructure changes.

## References

- NX Documentation: https://nx.dev/getting-started/intro
- NX npm Preset: https://nx.dev/recipes/adopting-nx/adding-to-monorepo
- NX Configuration: https://nx.dev/reference/nx-json
- Backpack Constitution: .specify/memory/constitution.md (principles applied where relevant)
