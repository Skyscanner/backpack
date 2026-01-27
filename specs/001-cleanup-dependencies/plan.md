<!--
==============================================================================
DOCUMENT PURPOSE: Design HOW to implement spec.md requirements (Implementation)
==============================================================================

This plan describes the technical approach for cleaning up external dependencies
in preparation for Nx migration (Phase 0.1).

FOCUS: HOW
- How to identify and audit dependencies
- How to safely remove/upgrade each dependency
- How to validate changes don't break functionality
==============================================================================
-->

# Implementation Plan: Clean Up External Dependencies (Phase 0.1)

**Branch**: `001-cleanup-dependencies` | **Date**: 2026-01-27 | **Spec**: [spec.md](./spec.md)
**Input**: Implementation plan from `docs/implementation-plans/phase-0.1-cleanup-dependencies.md`

## Summary

Clean up outdated and unnecessary external dependencies to prepare for Nx migration. This includes removing obsolete polyfills (object-assign, intersection-observer), upgrading outdated packages (normalize.css), tightening version ranges (@skyscanner/bpk-svgs, React peer dependency), and removing unused dependencies.

## Technical Context

**Framework**: React 18.3.1 with TypeScript 5.9.2
**Package Manager**: npm >=10.7.0
**Node Version**: >=18.20.4
**Target Browsers**: Chrome 109+, Edge 129+, Firefox 131+, Safari 15+, Samsung 26+
**Scope**: Dependency cleanup in `packages/package.json` and related code files
**Risk Level**: Low - internal changes with comprehensive test coverage

## Constitution Check

*GATE: All applicable checks pass for dependency cleanup task.*

### Applicable Principles

- [x] **Test Coverage**: All existing tests must continue to pass
- [x] **SemVer**: PATCH version bump (internal dependency changes)
- [x] **Documentation**: Migration log will document all changes
- [x] **TypeScript**: Code changes will maintain type safety

### Not Applicable (Dependency Cleanup)

- N/A: Component-First Architecture (no new components)
- N/A: Naming Conventions (no new files with naming requirements)
- N/A: License Headers (no new source files)
- N/A: Modern Sass (no style changes)
- N/A: Accessibility-First (no UI changes)

**No constitution violations. Task follows all applicable Backpack standards.**

## Project Structure

### Files to Modify

```text
packages/
├── package.json                          # Main dependency definitions
├── package-lock.json                     # Lock file (regenerate)
├── bpk-react-utils/src/
│   ├── TransitionInitialMount.tsx        # Remove object-assign import
│   └── Portal.tsx                        # Remove object-assign import
├── bpk-component-infinite-scroll/src/
│   ├── intersection-observer.js          # Remove polyfill import
│   └── withInfiniteScroll.js             # Verify still works
└── bpk-stylesheets/
    └── base.css                          # May need rebuild after normalize upgrade
```

### Deliverables

```text
specs/001-cleanup-dependencies/
├── spec.md              # Requirements specification ✓
├── plan.md              # This file ✓
├── research.md          # Research findings ✓
└── tasks.md             # Implementation tasks (via /speckit.tasks)
```

## Phase 0: Research & Discovery

**Status**: ✅ Complete (see [research.md](./research.md))

### Key Findings

1. **normalize.css**: v4.2.0 bundled in bpk-stylesheets, upgrade to 10.x
2. **object-assign**: Used in 2 files (Portal.tsx, TransitionInitialMount.tsx), replace with native
3. **intersection-observer**: Used in bpk-component-infinite-scroll, remove polyfill
4. **@skyscanner/bpk-svgs**: Version ^20.11.0, lock to exact 20.11.0
5. **React peer dep**: Range 17.0.2-18.3.1, tighten to ^18.0.0

## Phase 1: Implementation Details

### Step 1: Dependency Audit

**Purpose**: Establish baseline and identify all issues

**Commands**:
```bash
# From packages/ directory
npm outdated > ../specs/001-cleanup-dependencies/audit-outdated.txt
npx depcheck > ../specs/001-cleanup-dependencies/audit-unused.txt
npm audit > ../specs/001-cleanup-dependencies/audit-security.txt
```

**Output**: Dependency audit report files in specs directory

---

### Step 2: Upgrade normalize.css

**Current**: `"normalize.css": "4.2.0"`
**Target**: `"normalize.css": "^10.0.0"` (or `"modern-normalize": "^3.0.0"`)

**package.json Change**:
```diff
- "normalize.css": "4.2.0",
+ "normalize.css": "^10.0.0",
```

**Rebuild Required**:
```bash
# Rebuild stylesheets to incorporate updated normalize
npm run build:stylesheets
```

**Validation**:
```bash
npm run storybook:dist  # Visual check for style regressions
npm test                # Ensure all tests pass
```

---

### Step 3: Remove object-assign

**Current Usage** (2 files):

**File 1: `packages/bpk-react-utils/src/TransitionInitialMount.tsx`**

```diff
- // @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
- import assign from 'object-assign';
- import CSSTransition from 'react-transition-group/CSSTransition';
-
- // Object.assign() is used unpolyfilled in react-transition-group.
- // It will use the native implementation if it's present and isn't buggy.
- Object.assign = assign;
+ import CSSTransition from 'react-transition-group/CSSTransition';
```

**File 2: `packages/bpk-react-utils/src/Portal.tsx`**

```diff
- // @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
- import assign from 'object-assign';
+ // Native Object.assign used (supported in all target browsers)
```

And line 257:
```diff
-     if (this.props.style) {
-       assign(portalElement.style, this.props.style);
-     }
+     if (this.props.style) {
+       Object.assign(portalElement.style, this.props.style);
+     }
```

**package.json Change**:
```diff
- "object-assign": "^4.1.1",
```

**Validation**:
```bash
npm run typecheck       # TypeScript compiles
npm test                # All tests pass
```

---

### Step 4: Remove intersection-observer

**File: `packages/bpk-component-infinite-scroll/src/intersection-observer.js`**

```diff
  if (typeof window === 'undefined') {
    global.IntersectionObserver = class {
      observe() {}
      unobserve() {}
    };
- } else {
-   require('intersection-observer'); /* eslint-disable-line global-require */
  }
+ // IntersectionObserver is natively supported in all target browsers:
+ // Chrome 109+, Edge 129+, Firefox 131+, Safari 15+, Samsung 26+
```

**Alternative (simpler)**:
```javascript
/*
 * Backpack - Skyscanner's Design System
 * ...license header...
 */

// SSR stub - IntersectionObserver doesn't exist on server
if (typeof window === 'undefined') {
  global.IntersectionObserver = class {
    observe() {}
    unobserve() {}
  };
}
// Browser: IntersectionObserver is natively supported in all target browsers
```

**package.json Change**:
```diff
- "intersection-observer": "^0.12.2",
```

**Validation**:
```bash
npm test -- --testPathPattern=infinite-scroll  # Test infinite scroll
npm run storybook:dist                          # Visual verification
```

---

### Step 5: Lock @skyscanner/bpk-svgs Version

**Current**: `"@skyscanner/bpk-svgs": "^20.11.0"`
**Target**: `"@skyscanner/bpk-svgs": "20.11.0"` (exact)

**package.json Change**:
```diff
- "@skyscanner/bpk-svgs": "^20.11.0",
+ "@skyscanner/bpk-svgs": "20.11.0",
```

**Rationale**: Exact version ensures Nx cache accuracy - SVG content changes won't be missed.

---

### Step 6: Tighten React Peer Dependency

**Current**: `"react": "17.0.2 - 18.3.1"`
**Target**: `"react": "^18.0.0"`

**package.json Change**:
```diff
  "peerDependencies": {
    "date-fns": "3.3.1 - 4",
-   "react": "17.0.2 - 18.3.1",
-   "react-dom": "17.0.2 - 18.3.1",
+   "react": "^18.0.0",
+   "react-dom": "^18.0.0",
    "react-transition-group": "^4.4.5",
    "sass": "^1",
    "sass-embedded": "^1"
  },
```

**Rationale**:
- Semver-compliant range (single major version)
- React 18 has been stable for 2+ years
- Backpack development targets React 18.3.1

---

### Step 7: Remove Unused Dependencies

**Method**: Run depcheck and analyze output

```bash
cd packages
npx depcheck --ignores="@types/*,prop-types"
```

**Expected Candidates** (to verify):
- Dependencies used only transitively
- Dev dependencies incorrectly in dependencies
- Packages replaced by native features

**Process**:
1. List all reported unused dependencies
2. Verify each is truly unused (not dynamic imports, not type-only)
3. Remove confirmed unused packages
4. Run tests after each removal

---

### Step 8: Regenerate Lock File

**Commands**:
```bash
cd packages
rm package-lock.json
npm install
```

**Validation**:
```bash
npm ci             # Verify clean install works
npm test           # All tests pass
npm run build      # Build succeeds
npm audit          # No new high/critical vulnerabilities
```

---

## Testing Strategy

### After Each Change

```bash
npm run typecheck          # TypeScript compilation
npm run lint               # ESLint + Stylelint
npm test                   # Full test suite
```

### Final Validation

```bash
npm run build              # Full build
npm run storybook:dist     # Storybook build
npm audit                  # Security check
```

### Visual Regression

After normalize.css upgrade:
- Build Storybook locally
- Compare appearance of base components (buttons, inputs, text)
- Check for unexpected spacing/font changes

## Rollback Plan

If any step fails:

1. **Git revert** the specific change:
   ```bash
   git checkout -- packages/package.json packages/path/to/modified/file
   ```

2. **Regenerate lock file**:
   ```bash
   cd packages && rm package-lock.json && npm install
   ```

3. **Document failure** in migration log with:
   - What was attempted
   - Error message/test failure
   - Root cause (if known)

## Migration Log Template

Create `specs/001-cleanup-dependencies/migration-log.md`:

```markdown
# Migration Log: Dependency Cleanup (Phase 0.1)

## Execution Summary

| Step | Timestamp | Status | Notes |
|------|-----------|--------|-------|
| 1. Audit | | | |
| 2. normalize.css | | | |
| 3. object-assign | | | |
| 4. intersection-observer | | | |
| 5. bpk-svgs lock | | | |
| 6. React peer dep | | | |
| 7. Unused deps | | | |
| 8. Lock file | | | |

## Detailed Log

### Step 1: Dependency Audit
- **Timestamp**:
- **Status**:
- **Findings**:

[Continue for each step...]
```

## Dependencies

### Packages Being Modified

| Package | Current | Action | Target |
|---------|---------|--------|--------|
| normalize.css | 4.2.0 | Upgrade | ^10.0.0 |
| object-assign | ^4.1.1 | Remove | N/A |
| intersection-observer | ^0.12.2 | Remove | N/A |
| @skyscanner/bpk-svgs | ^20.11.0 | Lock | 20.11.0 |
| react (peer) | 17.0.2 - 18.3.1 | Tighten | ^18.0.0 |
| react-dom (peer) | 17.0.2 - 18.3.1 | Tighten | ^18.0.0 |

### Code Files to Modify

| File | Change |
|------|--------|
| packages/package.json | All dependency changes |
| packages/bpk-react-utils/src/TransitionInitialMount.tsx | Remove object-assign import |
| packages/bpk-react-utils/src/Portal.tsx | Replace object-assign with native |
| packages/bpk-component-infinite-scroll/src/intersection-observer.js | Remove polyfill require |

## Migration & Versioning

**Version Type**: PATCH

**Rationale**:
- No public API changes
- Internal dependency management
- No breaking changes for consumers
- Per `decisions/versioning-rules.md`: "Bug fixes, dependency updates, code quality improvements"

**Changelog Entry**:
```markdown
### Changed
- Upgraded normalize.css from 4.2.0 to 10.x
- Tightened React peer dependency to ^18.0.0 (from 17.0.2 - 18.3.1)
- Locked @skyscanner/bpk-svgs to exact version for build reproducibility

### Removed
- Removed object-assign polyfill (native Object.assign used)
- Removed intersection-observer polyfill (native browser support)
```

## Release Checklist

Before completing this task:

- [ ] Dependency audit report generated
- [ ] All dependency changes applied
- [ ] TypeScript compiles without errors
- [ ] ESLint and Stylelint pass
- [ ] All unit tests pass
- [ ] All accessibility tests pass
- [ ] Storybook builds successfully
- [ ] No visual regressions detected
- [ ] npm audit shows no new high/critical issues
- [ ] Migration log completed
- [ ] PR ready for review

## Notes

### Key Patterns

1. **Change one dependency at a time** - Run tests after each change to isolate issues
2. **Preserve SSR compatibility** - Keep server-side stubs even when removing browser polyfills
3. **Document everything** - Migration log captures decisions and issues for future reference

### Common Pitfalls to Avoid

1. ❌ Removing all polyfill code at once → ✅ Remove incrementally with tests
2. ❌ Forgetting SSR stubs → ✅ Keep window-undefined checks
3. ❌ Updating lock file mid-changes → ✅ Regenerate only after all changes
4. ❌ Skipping visual regression check → ✅ Build and inspect Storybook

## References

- **Implementation Plan**: `docs/implementation-plans/phase-0.1-cleanup-dependencies.md`
- **Research**: `specs/001-cleanup-dependencies/research.md`
- **Backpack Constitution**: `.specify/memory/constitution.md`
- **Versioning Rules**: `decisions/versioning-rules.md`
- **Browser Support**: browserslist in package.json
