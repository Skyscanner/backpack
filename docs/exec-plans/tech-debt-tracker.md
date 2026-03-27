# Tech Debt Tracker

Track known technical debt items. Review quarterly alongside major releases.

---

## High Priority

### Legacy JavaScript Files
Some older components may still have `.js`/`.jsx` files not yet migrated to TypeScript. The `ts-migrate` tool (v0.1.35) is available in devDependencies to assist.

**Impact**: Reduced type safety, inconsistent developer experience.
**Action**: Migrate remaining JS files to TypeScript during component touch-ups.

### Flow Type Remnants
Historical decisions around Flow types (`decisions/ignoring.md`, `decisions/imports-ts-suppressions.md`, `decisions/inexact-rest.md`) suggest legacy Flow patterns may still exist in some form.

**Impact**: Confusing type annotations, unnecessary suppressions.
**Action**: Audit for remaining Flow-era patterns and clean up.

---

## Medium Priority

### Storybook Story Colocation
Stories live in `examples/` directory, separate from component source in `packages/`. This creates navigation friction.

**Impact**: Developers must jump between directories when working on components.
**Action**: Evaluate colocating stories with component source (see industry trend toward colocation).

### Test File Naming Inconsistency
Some tests use `Component-test.tsx`, others use `Component.test.tsx` (dash vs dot).

**Impact**: Inconsistent file discovery patterns.
**Action**: Standardize on one convention and update.

---

## Low Priority

### Deprecated Component Cleanup
Components with `V2`/`V3` versioned alternatives (e.g., `BpkCardV2`, `BpkModalV3`, `BpkCheckboxV2`) indicate older versions that may be past their deprecation window.

**Impact**: Larger bundle, maintenance overhead.
**Action**: Check deprecation dates against 3-month window policy and remove expired APIs in next major.

### SassDoc Generation
`npm run build:sassdoc` exists but generated docs may not be actively maintained or published.

**Impact**: Incomplete mixin documentation for consumers.
**Action**: Evaluate if SassDoc output is used; if not, remove the build step.

---

## Tracking

| Item | Priority | Owner | Target Release |
|------|----------|-------|----------------|
| Legacy JS migration | High | - | Ongoing |
| Flow type cleanup | High | - | Next major |
| Story colocation | Medium | - | TBD |
| Test naming | Medium | - | TBD |
| Deprecated cleanup | Low | - | Next major |
| SassDoc review | Low | - | TBD |
