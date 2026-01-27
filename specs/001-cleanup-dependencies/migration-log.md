# Migration Log: Dependency Cleanup (Phase 0.1)

**Branch**: `001-cleanup-dependencies`
**Started**: 2026-01-27
**Completed**: 2026-01-27

## Execution Summary

| Step | Timestamp | Status | Notes |
|------|-----------|--------|-------|
| 1. Audit baseline | 2026-01-27 | ✅ Complete | depcheck & npm audit completed |
| 2. Upgrade normalize.css | 2026-01-27 | ✅ Complete | Upgraded 4.2.0 → 8.0.1 |
| 3. Remove object-assign | 2026-01-27 | ✅ Complete | Removed polyfill, using native Object.assign |
| 4. Remove intersection-observer | 2026-01-27 | ✅ Complete | Removed polyfill, using native API |
| 5. Lock bpk-svgs version | 2026-01-27 | ✅ Complete | Locked to exact version 20.11.0 |
| 6. Tighten React peer dep | 2026-01-27 | ✅ Complete | Changed 17.0.2-18.3.1 → ^18.0.0 |
| 7. Remove unused deps | 2026-01-27 | ✅ Complete | No additional unused deps in packages/package.json |
| 8. Regenerate lock file | 2026-01-27 | ✅ Complete | packages/package-lock.json regenerated |
| 9. Final validation | 2026-01-27 | ✅ Complete | All tests pass, build succeeds |

**Status Legend**: ⬜ Pending | 🔄 In Progress | ✅ Complete | ❌ Failed | ⏭️ Skipped

---

## Detailed Log

### Step 1: Dependency Audit (Baseline)

- **Timestamp**:
- **Status**:
- **npm outdated findings**:
  - [List key outdated packages]
- **depcheck findings**:
  - [List unused dependencies]
- **npm audit findings**:
  - [List security issues]
- **Notes**:

---

### Step 2: Upgrade normalize.css

- **Timestamp**: 2026-01-27
- **Status**: ✅ Complete
- **Before**: normalize.css 4.2.0
- **After**: normalize.css ^8.0.1 (latest stable)
- **Files changed**:
  - `packages/package.json`
- **Test results**: All Jest tests pass (328 passed, 1 skipped)
- **Storybook verification**: Has pre-existing icon import issues (unrelated to normalize.css)
- **Notes**: Version 10.0.0 does not exist; latest stable is 8.0.1

---

### Step 3: Remove object-assign

- **Timestamp**: 2026-01-27
- **Status**: ✅ Complete
- **Before**: object-assign ^4.1.1 (2 usage sites)
- **After**: Removed (using native Object.assign)
- **Files changed**:
  - `packages/package.json`
  - `packages/bpk-react-utils/src/TransitionInitialMount.tsx`
  - `packages/bpk-react-utils/src/Portal.tsx`
- **Test results**: TypeScript passes, all Jest tests pass (328 passed, 1 skipped)
- **Notes**: Native Object.assign is supported in all target browsers (Chrome 45+)

---

### Step 4: Remove intersection-observer

- **Timestamp**: 2026-01-27
- **Status**: ✅ Complete
- **Before**: intersection-observer ^0.12.2
- **After**: Removed (native browser support)
- **Files changed**:
  - `packages/package.json`
  - `packages/bpk-component-infinite-scroll/src/intersection-observer.js`
  - `scripts/jest/setup.js` (added mock for jsdom test environment)
- **Test results**: All Jest tests pass (328 passed, 1 skipped), including 37 infinite-scroll tests
- **Notes**: Added IntersectionObserver mock to Jest setup for jsdom compatibility; SSR stub retained

---

### Step 5: Lock @skyscanner/bpk-svgs Version

- **Timestamp**: 2026-01-27
- **Status**: ✅ Complete
- **Before**: @skyscanner/bpk-svgs ^20.11.0
- **After**: @skyscanner/bpk-svgs 20.11.0 (exact)
- **Files changed**:
  - `packages/package.json`
- **Notes**: Ensures reproducible builds and accurate Nx cache hashing

---

### Step 6: Tighten React Peer Dependency

- **Timestamp**: 2026-01-27
- **Status**: ✅ Complete
- **Before**: react 17.0.2 - 18.3.1
- **After**: react ^18.0.0
- **Files changed**:
  - `packages/package.json`
- **Test results**: All Jest tests pass (328 passed, 1 skipped)
- **Notes**: React 18 has been stable for 2+ years; semver-compliant range allows 18.x updates

---

### Step 7: Remove Unused Dependencies

- **Timestamp**: 2026-01-27
- **Status**: ✅ Complete
- **Dependencies removed**:
  - `object-assign` (removed in Step 3)
  - `intersection-observer` (removed in Step 4)
- **False positives (kept)**:
  - depcheck reported unused devDependencies in root package.json (babel, storybook, jest, etc.) - these are configuration-file imports, not direct code imports
  - "Missing dependencies" in SCSS templates are placeholders, not real missing deps
- **Files changed**:
  - `packages/package.json` (already updated in Steps 3 and 4)
- **Test results after each removal**: All tests pass
- **Notes**: Scope was limited to packages/package.json; no additional unused dependencies found

---

### Step 8: Regenerate Lock File

- **Timestamp**: 2026-01-27
- **Status**: ✅ Complete
- **Files changed**:
  - `packages/package-lock.json`
- **npm ci verification**: Clean install completes successfully
- **Notes**: Lock file regenerated with 2 fewer dependencies (object-assign, intersection-observer removed)

---

### Step 9: Final Validation

- **Timestamp**: 2026-01-27
- **Status**: ✅ Complete
- **npm test**: Jest tests pass (328 suites, 1626 tests)
- **npm run build**: Build completes successfully (gulp, sass, stylesheets)
- **npm audit**: 24 vulnerabilities (pre-existing, no new issues introduced)
- **Storybook build**: Pre-existing icon import issues (unrelated to dependency changes)
- **Notes**: All primary validation criteria passed

---

## Summary

### Dependencies Changed

| Package | Before | After | Action |
|---------|--------|-------|--------|
| normalize.css | 4.2.0 | ^8.0.1 | Upgrade |
| object-assign | ^4.1.1 | N/A | Removed |
| intersection-observer | ^0.12.2 | N/A | Removed |
| @skyscanner/bpk-svgs | ^20.11.0 | 20.11.0 | Locked |
| react (peer) | 17.0.2 - 18.3.1 | ^18.0.0 | Tightened |
| react-dom (peer) | 17.0.2 - 18.3.1 | ^18.0.0 | Tightened |

### Files Modified

- `packages/package.json`
- `packages/package-lock.json`
- `packages/bpk-react-utils/src/TransitionInitialMount.tsx`
- `packages/bpk-react-utils/src/Portal.tsx`
- `packages/bpk-component-infinite-scroll/src/intersection-observer.js`
- `scripts/jest/setup.js` (added IntersectionObserver mock)

### Test Results

- **Unit tests**: 328 suites passed, 1626 tests passed
- **Accessibility tests**: Included in unit tests, all pass
- **Lint**: Pre-existing issues unrelated to dependency changes
- **TypeScript**: Passes
- **Build**: Completes successfully

### Issues Encountered

1. **normalize.css version 10.x does not exist** - Used 8.0.1 instead (latest stable)
2. **jsdom lacks IntersectionObserver** - Added mock in Jest setup file
3. **Pre-existing icon import issues** - Storybook/lint have unrelated icon path issues

### Lessons Learned

1. Always verify package versions exist before specifying them in tasks
2. When removing browser polyfills, remember to add mocks for test environments (jsdom)
3. SSR stubs should be retained even when removing browser polyfills
