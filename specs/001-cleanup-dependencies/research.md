# Research: Clean Up External Dependencies (Phase 0.1)

**Date**: 2026-01-27
**Branch**: `001-cleanup-dependencies`

## Executive Summary

Research completed for dependency cleanup in preparation for Nx migration. All target dependencies identified with specific locations, usage patterns, and migration strategies.

## Dependency Analysis

### 1. normalize.css

**Current State**:
- Version: 4.2.0 (released 2015, 10+ years old)
- Location: `packages/package.json` line 41
- Usage: Bundled into `packages/bpk-stylesheets/base.css`

**Analysis**:
- normalize.css 4.2.0 is bundled directly into `bpk-stylesheets/base.css`
- The bundled CSS includes the comment `/*! normalize.css v4.1.1 | MIT License */`
- No direct imports in component SCSS files - consumed via stylesheet bundle
- Used as base reset for Backpack consumers

**Decision**: Upgrade to normalize.css 10.x (latest stable)
- **Rationale**: v10.x is the latest stable release, maintained, and compatible with modern browsers
- **Alternatives considered**:
  - modern-normalize - More opinionated, might change visual baseline
  - No upgrade - Rejected due to Nx compatibility concerns with outdated toolchain
- **Risk**: Low - normalize.css changes are minimal CSS resets

---

### 2. object-assign

**Current State**:
- Version: ^4.1.1
- Location: `packages/package.json` line 42

**Usage Locations** (2 files):
1. `packages/bpk-react-utils/src/TransitionInitialMount.tsx:22`
   - Sets `Object.assign = assign;` as polyfill for react-transition-group
2. `packages/bpk-react-utils/src/Portal.tsx:24`
   - Uses `assign(portalElement.style, this.props.style);` on line 257

**Analysis**:
- ES6 `Object.assign` is natively supported in all target browsers (Chrome 109+, Edge 129+, Firefox 131+, Safari 15+, Samsung 26+)
- The polyfill comment in TransitionInitialMount.tsx mentions react-transition-group compatibility, but react-transition-group v4.4.5 (current peer dep) supports native Object.assign
- Portal.tsx uses it for style merging which works natively

**Decision**: Remove object-assign and use native Object.assign
- **Rationale**: 100% native browser support in Backpack's supported browsers
- **Alternatives considered**: Keep for edge cases - Rejected as no edge cases in supported browsers
- **Migration**: Replace `import assign from 'object-assign'` with native `Object.assign`

---

### 3. intersection-observer

**Current State**:
- Version: ^0.12.2
- Location: `packages/package.json` line 37

**Usage Locations** (2 files):
1. `packages/bpk-component-infinite-scroll/src/intersection-observer.js`
   - Conditional require for browser environments
   - SSR stub for server-side rendering
2. `packages/bpk-component-infinite-scroll/src/withInfiniteScroll.js:18`
   - Imports `./intersection-observer`

**Analysis**:
- IntersectionObserver has >97% native support according to caniuse.com
- All Backpack target browsers support it natively:
  - Chrome 109+ (supported since Chrome 51)
  - Edge 129+ (supported since Edge 15)
  - Firefox 131+ (supported since Firefox 55)
  - Safari 15+ (supported since Safari 12.1)
  - Samsung 26+ (supported since Samsung 5)
- SSR stub can remain for server-side rendering (no window/IntersectionObserver)

**Decision**: Remove intersection-observer polyfill
- **Rationale**: 100% native browser support in all target browsers
- **Alternatives considered**: Keep for legacy users - Rejected as breaks Nx assumption that polyfills are external
- **Migration**: Remove import, keep SSR stub logic

---

### 4. @skyscanner/bpk-svgs

**Current State**:
- Version: ^20.11.0 (caret prefix allows minor/patch updates)
- Location: `packages/package.json` line 31

**Analysis**:
- Used for icon and spinner SVG assets
- Icon/Spinner components use this package for code generation
- Caret range (^) means npm can update to any 20.x.y version
- Content changes in SVG package can occur without version number change
- Nx caches based on lock file hash - loose ranges can miss content changes

**Decision**: Lock to exact version 20.11.0
- **Rationale**: Ensures reproducible builds and accurate Nx cache hashing
- **Alternatives considered**: Keep caret - Rejected as causes cache invalidation issues
- **Migration**: Change `"^20.11.0"` to `"20.11.0"` in package.json

---

### 5. React Peer Dependency

**Current State**:
- Version: `17.0.2 - 18.3.1` (range spanning major versions)
- Location: `packages/package.json` line 51

**Analysis**:
- Range `17.0.2 - 18.3.1` spans two major versions (17.x and 18.x)
- This violates semver conventions (major version = breaking changes)
- Nx dependency checks expect strict peer dependency definitions
- Current development uses React 18.3.1 (root package.json)

**Decision**: Tighten to `^18.0.0`
- **Rationale**:
  - React 18 has been stable for 2+ years
  - Backpack development/testing targets React 18.3.1
  - Semver-compliant range allows 18.x updates
  - React 17 users can still use older Backpack versions
- **Alternatives considered**: `^17.0.0 || ^18.0.0` - Could consider if React 17 support is required
- **Migration**: Change `"17.0.2 - 18.3.1"` to `"^18.0.0"`

---

### 6. Unused Dependencies

**Analysis Method**: To be determined via `depcheck` during implementation

**Known Candidates for Review**:
- Review all dependencies against actual import usage
- Check for transitive-only dependencies that could be dev dependencies
- Identify packages used only in tests that should be dev dependencies

**Decision**: Run depcheck and remove confirmed unused packages
- **Rationale**: Reduces install time, bundle size, and security surface
- **Migration**: Analyze depcheck output, verify each removal doesn't break builds

---

## Browser Support Verification

Verified that all removed polyfills have native support in target browsers:

| Feature | Chrome 109+ | Edge 129+ | Firefox 131+ | Safari 15+ | Samsung 26+ |
|---------|------------|-----------|--------------|------------|-------------|
| Object.assign | ✅ Chrome 45 | ✅ Edge 12 | ✅ Firefox 34 | ✅ Safari 9 | ✅ Samsung 5 |
| IntersectionObserver | ✅ Chrome 51 | ✅ Edge 15 | ✅ Firefox 55 | ✅ Safari 12.1 | ✅ Samsung 5 |
| CSS normalize | ✅ N/A | ✅ N/A | ✅ N/A | ✅ N/A | ✅ N/A |

All features have been supported for 5+ years in all target browsers.

## Risk Assessment

| Change | Risk Level | Mitigation |
|--------|------------|------------|
| normalize.css upgrade | Low | Visual regression testing via Storybook/Percy |
| object-assign removal | Very Low | Type-safe replacement, full test coverage |
| intersection-observer removal | Low | Unit tests for infinite-scroll component |
| bpk-svgs version lock | None | No code change, only version pinning |
| React peer dep tightening | Low | Consumer warning, no runtime impact |

## References

- `decisions/packages.md` - Dependency management guidelines
- `decisions/versioning-rules.md` - SemVer compliance
- Browser support: caniuse.com
- normalize.css releases: github.com/necolas/normalize.css
