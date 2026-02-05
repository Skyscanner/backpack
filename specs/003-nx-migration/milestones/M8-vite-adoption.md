# M8: Vite Adoption

**Priority**: P4
**Est. Effort**: Medium
**Complexity**: Medium
**Status**: ⚠️ OPTIONAL - Future Stage

> **Note**: This milestone is optional and recommended for a future stage. It provides significant developer experience improvements but requires substantial migration effort from Gulp/Babel.

## Overview

Replace the current Gulp + Babel build toolchain with Vite for faster cold builds, hot reloads, and improved developer experience.

## Why This Milestone?

### Strategic Context

Vite is a modern build tool that offers:

- **Faster cold builds**: Leverages ES modules for faster startup
- **Hot Module Replacement (HMR)**: Near-instant updates during development
- **ESM-native**: Built for modern JavaScript module system
- **Simplified config**: Less configuration than Webpack

This aligns with Skyscanner's Web Foundation stage 2 goals.

### Why We Need Each Step

| Step | Why It's Needed |
|------|-----------------|
| Create `vite.config.ts` | Configures Vite with plugins for React, SCSS, and SVG processing |
| Migrate code generation | Gulp tasks for Icon/Flare/Spinner generation must work with Vite |
| Convert CJS to ESM | Vite is ESM-native; CommonJS modules need conversion |
| Compare build artifacts | Ensures Vite output matches current Babel output |
| Remove Gulp | Eliminates duplicate build systems and reduces maintenance burden |

### What Happens If We Skip This?

Without Vite adoption:
- Build times remain slower
- Developer experience less smooth (no HMR)
- Maintains legacy Gulp + Babel complexity
- Not aligned with Web Foundation direction

### Why It's Optional for This Phase

This milestone is marked optional because:
- Current build works; Nx benefits don't require Vite
- Significant effort (~6 weeks estimated)
- Risk of subtle output differences breaking consumers
- Can be done in parallel with other Nx work or deferred entirely

---

## User Story

As a Backpack developer, I want the build toolchain to use Vite so that I get faster cold builds, hot reloads, and improved developer experience aligned with Web Foundation stage 2 goals.

---

## Acceptance Scenarios

1. **Given** `vite.config.ts` is created, **When** essential plugins are configured, **Then** React, SCSS, and SVG processing work

2. **Given** Gulp tasks for code generation, **When** migrated to Vite plugins or pre-build hooks, **Then** Icon/Flare/Spinner generation works

3. **Given** both build systems exist, **When** artifacts are compared, **Then** outputs are functionally equivalent

4. **Given** parity is verified, **When** Gulp tasks are removed, **Then** all builds use Vite

---

## Verification Criteria

- [ ] `vite.config.ts` exists with required plugins
- [ ] Code generation (SVG -> React) works with Vite
- [ ] CJS modules converted to ESM where needed
- [ ] Artifact comparison shows parity
- [ ] All component builds succeed with Vite
- [ ] Gulp tasks removed
- [ ] Documentation updated

---

## Current Build Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Gulp      │────▶│   Babel     │────▶│   dist/     │
│ (code gen)  │     │ (transpile) │     │ (output)    │
└─────────────┘     └─────────────┘     └─────────────┘
     │
     ▼
  SVG → React
  (icons, spinners)
```

## Target Build Flow

```
┌─────────────┐     ┌─────────────┐
│   Pre-build │────▶│   Vite      │────▶│   dist/     │
│  (code gen) │     │  (bundle)   │     │ (output)    │
└─────────────┘     └─────────────┘
```

---

## Key Migration Challenges

| Challenge | Current Approach | Vite Approach |
|-----------|------------------|---------------|
| SVG → React components | Gulp task scans SVGs, generates `.tsx` | Vite plugin or pre-build script |
| SCSS compilation | `sass` via scripts | `vite-plugin-sass` or `@vitejs/plugin-react` |
| TypeScript | Babel + separate `tsc` for types | Vite's `esbuild` + separate `tsc` |
| CommonJS modules | Babel handles | May need conversion or plugin |

---

## Risks to Monitor

| Risk | Impact | Mitigation |
|------|--------|------------|
| SVG loader gaps | Icons don't build | Evaluate `vite-plugin-svgr` or custom solution |
| Output differences | Consumer builds break | Byte-by-byte artifact comparison |
| Missing Vite plugin | Feature X doesn't work | Research ecosystem before committing |
| ESM conversion complexity | Widespread changes | Gradual, component-by-component |

---

## Rollback Plan

If issues arise:
1. Keep Gulp + Babel as primary build
2. Remove Vite config
3. Revisit in future with more time/resources

---

## Dependencies

- M5: Static Checks via Nx (build infrastructure should be stable)
- Can be done in parallel with M6-M7

## Blocks

- M9: Vitest Adoption (Vitest pairs with Vite)
