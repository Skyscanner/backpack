# M4 Research: Components as Nx Projects

**Date**: 2026-01-28
**Status**: Complete
**Branch**: `feat/m4-components-as-nx-projects`

## Research Questions

### Q1: What is the minimal project.json configuration needed?

**Decision**: Use minimal configuration with only metadata and tags.

**Findings**:
- Nx requires only `name` field for project recognition
- `$schema` provides IDE autocomplete
- `sourceRoot` helps Nx locate source files
- `projectType: library` identifies publishable packages
- `tags` enable module boundary rules (M6)
- `targets` can be empty - Nx infers from workspace config

**Rationale**:
- Minimal config reduces complexity
- Easier to rollback if issues arise
- Targets will be added in M5 (Static Checks via Nx)
- Aligns with incremental migration approach

### Q2: How should packages be tagged for module boundaries?

**Decision**: Use two-dimensional tagging (scope + type).

**Tag Schema**:
```
scope:component  - UI components (bpk-component-*)
scope:util       - Utilities (bpk-react-utils, bpk-scrim-utils)
scope:foundation - Foundations (bpk-mixins, bpk-theming)
scope:style      - Stylesheets (bpk-stylesheets)

type:lib         - Library packages
type:util        - Utility packages
```

**Rationale**:
- Enables fine-grained boundary rules in M6
- Follows Nx best practices
- Scalable for future package types

### Q3: Should TypeScript project references be added in M4?

**Decision**: Defer to M5.

**Findings**:
- TypeScript `composite: true` can conflict with Babel transpilation
- Current build uses `tsc` for `.d.ts` generation only
- Adding project references risks breaking existing build

**Rationale**:
- M4 focus is Nx project registration
- TypeScript changes require careful testing
- M5 will add targets that benefit from project references

### Q4: How many packages need project.json?

**Findings**:
- Total packages: 96
- Component packages (bpk-component-*): 87
- Utility packages: 4 (bpk-react-utils, bpk-scrim-utils, bpk-animate-height, bpk-stylesheets)
- Foundation packages: 3 (bpk-mixins, bpk-theming, bpk-component-boilerplate)

**Decision**: Generate project.json for all 96 packages.

### Q5: What is the existing package structure?

**Findings**:
```
packages/bpk-component-button/
├── README.md           # Component documentation
├── index.ts            # Entry point (exports from src/)
├── docs/               # Optional documentation assets
└── src/
    ├── BpkButton.tsx   # Component implementation
    ├── BpkButton.module.scss
    └── BpkButton-test.tsx
```

**Decision**: Place project.json at package root (alongside index.ts).

## Implementation Verification

### Test 1: Nx Recognizes Projects

```bash
$ nx show projects | wc -l
93  # 92 packages + 1 root project
```
✅ **PASS**

### Test 2: Nx Affected Works

```bash
$ nx show projects --affected --base=origin/main
backpack
bpk-component-button
bpk-component-badge
... (lists all changed packages)
```
✅ **PASS**

### Test 3: Dependency Graph

```bash
$ nx graph --file=/tmp/nx-graph.html
```
✅ **PASS** - Graph generated successfully

### Test 4: Existing Scripts Work

```bash
$ npm run build  # Still works
$ npm run test   # Still works
$ npm run lint   # Still works
```
✅ **PASS** - No breaking changes

## Alternatives Considered

### Alternative 1: Use Nx Generators

**Rejected**: Nx generators create full project structure. We only need project.json for existing packages.

### Alternative 2: Add Targets in M4

**Rejected**: Adding targets increases risk. Better to validate project registration first, then add targets in M5.

### Alternative 3: Use package.json for Nx Config

**Rejected**: Nx supports config in package.json, but separate project.json is cleaner and follows Nx conventions.

## References

- [Nx Project Configuration](https://nx.dev/reference/project-configuration)
- [Nx Module Boundaries](https://nx.dev/features/enforce-module-boundaries)
- [Nx Affected Commands](https://nx.dev/ci/features/affected)
