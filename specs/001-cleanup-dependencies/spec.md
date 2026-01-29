<!--
==============================================================================
DOCUMENT PURPOSE: Define WHAT needs to be done and WHY (Requirements)
==============================================================================

This specification describes requirements for cleaning up external dependencies
in preparation for Nx migration (Phase 0.1).

FOCUS: WHAT & WHY
- What dependencies need cleanup
- Why each cleanup is necessary
- What success looks like
==============================================================================
-->

# Specification: Clean Up External Dependencies (Phase 0.1)

**Branch**: `001-cleanup-dependencies`
**Created**: 2026-01-27
**Status**: Draft
**Input**: User description: "Follow steps in docs/implementation-plans/phase-0.1-cleanup-dependencies.md to modify the codebase"

## Constitution Check

*GATE: Must pass before implementation begins.*

- [x] **Component-First Architecture**: N/A - This is a dependency cleanup task, not a component
- [x] **Naming Conventions**: N/A - No new components being created
- [x] **License Headers**: N/A - No new source files being created
- [x] **Modern Sass**: N/A - No style changes
- [x] **Accessibility-First**: N/A - No UI changes
- [x] **TypeScript**: N/A - No new TypeScript code
- [x] **Test Coverage**: Existing tests must continue to pass after changes
- [x] **Documentation**: Migration log will document all changes
- [x] **Versioning**: Changes will follow SemVer (PATCH - dependency cleanup)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Developer Updates Dependencies for Nx Compatibility (Priority: P1)

A developer working on Nx migration needs to ensure all dependencies are clean, modern, and compatible with Nx tooling before proceeding with the migration.

**Why this priority**: This is a prerequisite for Nx migration. Outdated or conflicting dependencies will cause build failures and cache issues with Nx.

**Independent Test**: Run `npm install` and `npm test` after all dependency changes to verify the codebase still builds and tests pass.

**Acceptance Scenarios**:

1. **Given** outdated normalize.css v4.2.0, **When** dependency is upgraded, **Then** Storybook renders styles correctly
2. **Given** object-assign polyfill in dependencies, **When** removed, **Then** all code using Object.assign continues to work with native support
3. **Given** intersection-observer polyfill, **When** removed, **Then** IntersectionObserver functionality works in all supported browsers

---

### User Story 2 - CI Pipeline Validates Clean Dependencies (Priority: P1)

The CI pipeline must validate that all dependencies are properly defined with exact versions where needed, preventing cache invalidation issues.

**Why this priority**: Nx caching depends on accurate dependency hashing. Loose version ranges can cause hidden updates that invalidate caches.

**Independent Test**: CI pipeline completes without dependency-related warnings or errors.

**Acceptance Scenarios**:

1. **Given** @skyscanner/bpk-svgs with caret range, **When** locked to exact version, **Then** npm install produces consistent results
2. **Given** React peer dependency spanning major versions (17.0.2 - 18.3.1), **When** tightened to ^18.0.0, **Then** npm warns consumers using incompatible React versions

---

### User Story 3 - Developer Generates Dependency Audit Report (Priority: P2)

A developer needs visibility into dependency health to identify unused packages and outdated versions for informed decision-making.

**Why this priority**: Audit report provides baseline data before changes and documents current state.

**Independent Test**: Audit report is generated with accurate listings of outdated and unused dependencies.

**Acceptance Scenarios**:

1. **Given** codebase with dependencies, **When** depcheck runs, **Then** unused dependencies are listed
2. **Given** codebase with dependencies, **When** npm outdated runs, **Then** outdated packages are listed with current/wanted/latest versions

---

### Edge Cases

- What happens if a removed polyfill is still needed by a dependent package internally?
- How does the build behave if normalize.css upgrade introduces breaking style changes?
- What happens if the locked @skyscanner/bpk-svgs version has security vulnerabilities discovered later?
- How does CI handle peer dependency warnings after tightening React version?
- What happens if depcheck reports false positives for "unused" dependencies that are actually needed?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Audit MUST identify all outdated dependencies using npm outdated
- **FR-002**: Audit MUST identify unused dependencies using depcheck
- **FR-003**: normalize.css MUST be upgraded from v4.2.0 to v10.x or replaced with modern-normalize
- **FR-004**: object-assign polyfill MUST be removed (ES6 native Object.assign is universally supported)
- **FR-005**: intersection-observer polyfill MUST be removed (>95% native browser support)
- **FR-006**: @skyscanner/bpk-svgs MUST use exact version without caret (^) prefix
- **FR-007**: React peer dependency MUST be tightened to `^18.0.0` or `^17.0.0 || ^18.0.0` if React 17 support is still required
- **FR-008**: All unused dependencies identified by depcheck MUST be evaluated and removed if confirmed unused
- **FR-009**: package-lock.json MUST be regenerated after all dependency changes
- **FR-010**: All existing tests MUST pass after dependency changes

### Dependency Changes Summary

| Dependency             | Current State      | Action  | Target State                    |
|------------------------|--------------------|---------|---------------------------------|
| normalize.css          | 4.2.0              | Upgrade | 10.x or modern-normalize        |
| object-assign          | present            | Remove  | N/A (use native Object.assign)  |
| intersection-observer  | present            | Remove  | N/A (native browser support)    |
| @skyscanner/bpk-svgs   | ^x.x.x (caret)     | Lock    | x.x.x (exact version)           |
| react (peer)           | 17.0.2 - 18.3.1    | Tighten | ^18.0.0                         |
| unused dependencies    | varies             | Remove  | N/A                             |

### Non-Functional Requirements

- **NFR-001**: All existing unit tests MUST pass after dependency changes
- **NFR-002**: All existing accessibility tests MUST pass after dependency changes
- **NFR-003**: Storybook MUST build and display correctly after style dependency changes
- **NFR-004**: npm install MUST complete without errors in clean environment
- **NFR-005**: npm audit MUST not introduce new high or critical severity vulnerabilities

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: normalize.css upgraded to version 10.x or replaced with modern-normalize
- **SC-002**: object-assign package absent from package.json and package-lock.json
- **SC-003**: intersection-observer package absent from package.json and package-lock.json
- **SC-004**: @skyscanner/bpk-svgs version in packages/package.json has no caret (^) or tilde (~) prefix
- **SC-005**: React peer dependency in packages/package.json uses semver-compliant range (^18.0.0)
- **SC-006**: depcheck reports no unused dependencies or false positives are documented
- **SC-007**: `npm install` completes without errors
- **SC-008**: `npm test` passes all unit and accessibility tests
- **SC-009**: `npm run storybook:dist` builds successfully without style regressions
- **SC-010**: Dependency audit report generated documenting before/after state
- **SC-011**: Migration log documents all changes with rationale

## Dependencies & Related Components

**Internal Dependencies Being Modified**:

- packages/package.json - Main component dependency definitions
- Root package.json - Development dependencies
- package-lock.json - Dependency lock file

**Components Potentially Affected**:

- Any components importing normalize.css (style baseline)
- bpk-component-infinite-scroll (uses IntersectionObserver)
- Any components using object-assign directly

**External Dependencies Being Modified**:

- normalize.css → upgrade to 10.x or modern-normalize
- object-assign → remove
- intersection-observer → remove
- @skyscanner/bpk-svgs → version lock
- react peer dependency → version tightening

## Testing Strategy

### Validation Tests

- Run full test suite (`npm test`) after each major dependency change
- Build Storybook (`npm run storybook:dist`) to verify style changes from normalize.css upgrade
- Run `npm audit` to check for security regressions
- Manual visual inspection of Storybook for unexpected style changes

### Regression Prevention

- Compare Storybook output before and after normalize.css upgrade
- Verify IntersectionObserver-dependent components work without polyfill
- Confirm no runtime errors in components that previously used object-assign

### Rollback Plan

If tests fail after a dependency change:

1. Revert the specific change in package.json
2. Regenerate package-lock.json
3. Document the failure reason in migration log
4. Investigate root cause before retrying

## Documentation Requirements

### Dependency Audit Report

- List of all outdated dependencies with current/wanted/latest versions
- List of unused dependencies identified by depcheck
- Risk assessment for each identified issue
- Recommendations for each dependency

### Migration Log

- Timestamp of each change
- Package name, old version, new version (or "removed")
- Rationale for change (reference to implementation plan)
- Test results after each change
- Any issues encountered and resolutions

## Migration & Versioning

**Version Type**: PATCH

**Rationale**: Dependency cleanup does not change the public API of any Backpack components. These are internal implementation changes that do not affect consumers directly, which qualifies as PATCH per `decisions/versioning-rules.md`.

**Breaking Changes**: None expected. All changes are internal dependency management.

**Deprecations**: None.

## Implementation Notes

**Order of Operations** (per implementation plan):

1. Generate dependency audit report (establish baseline)
2. Upgrade normalize.css (v4.2.0 → 10.x)
3. Remove object-assign polyfill
4. Remove intersection-observer polyfill
5. Lock @skyscanner/bpk-svgs to exact version
6. Tighten React peer dependency
7. Remove unused dependencies identified by depcheck
8. Regenerate package-lock.json
9. Run full test suite
10. Document all changes in migration log

**Key Files**:

- `packages/package.json` - Component dependencies and peer dependencies
- `package.json` - Root development dependencies
- `package-lock.json` - Lock file to regenerate

**Optional/Deferred Step**:

- react-table upgrade to @tanstack/react-table v8 is marked as optional in the implementation plan and can be tracked as separate technical debt

## Open Questions

- [x] Q1: Should react-table be upgraded in this phase? **Decision: No, marked as optional in implementation plan - track as separate tech debt**

## References

- **Implementation Plan**: `docs/implementation-plans/phase-0.1-cleanup-dependencies.md`
- **Backpack Constitution**: `.specify/memory/constitution.md`
- **Versioning Rules**: `decisions/versioning-rules.md`
- **Browser Support**: browserslist in package.json (Chrome 109+, Edge 129+, Firefox 131+, Safari 15+, Samsung 26+)
