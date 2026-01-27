# Research: Project Structure for Nx Migration

**Date**: 2026-01-27
**Branch**: WOODPECKER-4040
**Spec**: [spec.md](./spec.md)
**Plan**: [plan.md](./plan.md)

## Summary

This document consolidates research findings for project structure confirmation (milestone 2) of the Nx migration, including forward planning for Banana monorepo integration. The key finding is that the current flat structure under `packages/` is fully compatible with Nx and Banana's expected patterns.

---

## 1. Nx Graph Verification

### Test Results

```bash
$ npx nx graph --file=output.json
NX   JSON output created
```

**Result**: Nx detects `packages/` as a single project `@skyscanner/backpack-web`.

### Current Detection

| Item | Status | Details |
|------|--------|---------|
| `nx graph` runs | ✅ Pass | Executes without errors |
| Project detected | ✅ Pass | `@skyscanner/backpack-web` (type: app) |
| Project root | ✅ Correct | `packages` |
| Package version | ✅ Correct | 21.0.1 |
| Workspace detection | ✅ Pass | `isInPackageManagerWorkspaces: true` |

### Why Single Project Detection is Expected

The current Nx setup detects `packages/` as one project because:
1. `packages/package.json` exists with `@skyscanner/backpack-web` name
2. Individual component folders don't have their own `package.json`
3. Per milestone 4 ("Set up Components as Nx Projects"), adding `project.json` per component is deferred

**Conclusion**: This is correct behavior for milestone 2. Component-level project detection is milestone 4 scope.

---

## 2. Package Inventory

### Count by Category

| Category | Count | Packages |
|----------|-------|----------|
| **Components** | 84 | bpk-component-* (excluding boilerplate) |
| **Utilities** | 2 | bpk-react-utils, bpk-scrim-utils |
| **Foundations** | 2 | bpk-mixins, bpk-stylesheets |
| **Theming** | 1 | bpk-theming |
| **Animation** | 1 | bpk-animate-height |
| **Internal** | 1 | bpk-component-boilerplate |
| **Total** | **91** | All folders in packages/ |

### Full Package List

<details>
<summary>Click to expand full package list (91 packages)</summary>

**Components (84)**:
- bpk-component-accordion
- bpk-component-aria-live
- bpk-component-autosuggest
- bpk-component-badge
- bpk-component-banner-alert
- bpk-component-barchart
- bpk-component-blockquote
- bpk-component-bottom-sheet
- bpk-component-breadcrumb
- bpk-component-breakpoint
- bpk-component-bubble
- bpk-component-button
- bpk-component-calendar
- bpk-component-card
- bpk-component-card-button
- bpk-component-card-list
- bpk-component-carousel
- bpk-component-checkbox
- bpk-component-chip
- bpk-component-chip-group
- bpk-component-close-button
- bpk-component-code
- bpk-component-content-cards
- bpk-component-datatable
- bpk-component-datepicker
- bpk-component-description-list
- bpk-component-dialog
- bpk-component-drawer
- bpk-component-fieldset
- bpk-component-flare
- bpk-component-floating-notification
- bpk-component-form-validation
- bpk-component-graphic-promotion
- bpk-component-grid-toggle
- bpk-component-horizontal-nav
- bpk-component-icon
- bpk-component-image
- bpk-component-infinite-scroll
- bpk-component-info-banner
- bpk-component-input
- bpk-component-inset-banner
- bpk-component-journey-arrow
- bpk-component-label
- bpk-component-link
- bpk-component-list
- bpk-component-loading-button
- bpk-component-map
- bpk-component-mobile-scroll-container
- bpk-component-modal
- bpk-component-navigation-bar
- bpk-component-navigation-tab-group
- bpk-component-nudger
- bpk-component-overlay
- bpk-component-page-indicator
- bpk-component-pagination
- bpk-component-panel
- bpk-component-phone-input
- bpk-component-popover
- bpk-component-price
- bpk-component-price-range
- bpk-component-progress
- bpk-component-radio
- bpk-component-rating
- bpk-component-rtl-toggle
- bpk-component-scrollable-calendar
- bpk-component-section-header
- bpk-component-section-list
- bpk-component-segmented-control
- bpk-component-select
- bpk-component-skeleton
- bpk-component-skip-link
- bpk-component-slider
- bpk-component-snippet
- bpk-component-spinner
- bpk-component-split-input
- bpk-component-star-rating
- bpk-component-swap-button
- bpk-component-switch
- bpk-component-table
- bpk-component-text
- bpk-component-textarea
- bpk-component-theme-toggle
- bpk-component-ticket
- bpk-component-tooltip

**Utilities (2)**:
- bpk-react-utils
- bpk-scrim-utils

**Foundations (2)**:
- bpk-mixins
- bpk-stylesheets

**Theming (1)**:
- bpk-theming

**Animation (1)**:
- bpk-animate-height

**Internal (1)**:
- bpk-component-boilerplate

</details>

---

## 3. Configuration Status

### nx.json

**Status**: ✅ Correct (configured in milestone 1)

Current configuration includes:
- `@nx/js/typescript` plugin for project references
- Named inputs for default and production
- Release publish target

### tsconfig.json

**Status**: ✅ Correct

```json
{
  "include": ["packages", "@types", "examples"],
  "exclude": ["**/**/*.figma.tsx"]
}
```

All package directories are covered by `packages` include.

### jest.config.js

**Status**: ✅ Correct

Jest discovers tests via patterns that work with current structure.

### .storybook/main.ts

**Status**: ✅ Correct

Storybook discovers stories from `examples/` directory.

---

## 4. Build Validation

### Test Results

| Command | Status | Notes |
|---------|--------|-------|
| `npm run typecheck` | ✅ Pass | TypeScript compiles without errors |
| `npm run lint` | ✅ Pass | 0 errors, 30 warnings (all CSS browser support warnings) |

### Warnings Analysis

All 30 warnings are `plugin/no-unsupported-browser-features` for CSS features like:
- `css-focus-visible` (Safari 15.x)

These are existing warnings, not introduced by Nx migration.

---

## 5. Code Generation Compatibility

### Packages with Code Generation

| Package | Generation Method | Status |
|---------|-------------------|--------|
| bpk-component-icon | Gulp task | ✅ Compatible |
| bpk-component-flare | Gulp task | ✅ Compatible |
| bpk-component-spinner | Gulp task | ✅ Compatible |

Code generation paths remain unchanged since structure is not changing.

---

## 6. Consumer Import Compatibility

### Import Path Format

```javascript
// Component import
import BpkButton from '@skyscanner/backpack-web/bpk-component-button';

// SCSS mixin import
@use '@skyscanner/backpack-web/bpk-mixins/tokens';
```

**Status**: ✅ Unchanged - no migration needed

---

## 7. Key Findings

### What Works

1. ✅ Nx graph detects the monorepo correctly
2. ✅ TypeScript compilation passes
3. ✅ Linting passes (no errors)
4. ✅ Current structure complies with Production Standards
5. ✅ No configuration changes needed for milestone 2
6. ✅ Nx plugins align with Banana requirements

### What's Deferred

| Item | Milestone | Reason |
|------|-----------|--------|
| Individual project.json files | 4 | "Set up Components as Nx Projects" |
| Story colocation | 3 | "All Storybook Stories Colocated" |
| Module boundaries | 6 | "Configure Module Boundaries" |
| Banana merge | Future | Separate milestone after Nx adoption |

### Recommendations

1. **No structural changes needed** - flat structure works
2. **Proceed with documentation** - create structure mapping document with Banana target
3. **Verify full CI pipeline** - run GitHub Actions before merge

---

## 8. Banana Repository Analysis

### Structure Overview

Banana monorepo uses `libs/shared/` for shared libraries:

```
banana/libs/shared/
├── universal/           # Platform-agnostic libraries
│   ├── ui/components/   # Shared UI components
│   ├── ui/error-boundary/
│   ├── utils-universal/
│   ├── data-access-frontend/
│   └── backpack/        # ← Target location for Backpack
├── banana/              # Banana-specific libraries
└── acorn/               # Acorn-specific libraries
```

### Nx Plugins in Banana

| Plugin | Target | Compatible with Backpack |
|--------|--------|-------------------------|
| @nx/storybook/plugin | storybook_nx, build-storybook | ✅ Yes |
| @nx/eslint/plugin | lint_nx | ✅ Yes |
| @nx/cypress/plugin | e2e, open-cypress | ✅ Yes |
| nx-stylelint/plugin | stylelint | ✅ Yes |
| @nx/js/typescript | typecheck_nx | ✅ Yes |
| @nx/jest/plugin | test_nx | ✅ Yes |

### Banana Project Patterns

Each library in Banana follows this structure:

```
lib-name/
├── src/                    # Source code
├── project.json            # Nx project metadata
├── package.json            # Package definition
├── tsconfig.json           # TypeScript config
├── tsconfig.lib.json       # Build config
├── tsconfig.spec.json      # Test config
├── jest.config.js          # Jest config
├── babel.config.json       # Babel config
└── .eslintrc.js            # ESLint config
```

### Naming Convention

```
@web-platform/shared-universal-{category}-{name}
```

Example: `@web-platform/shared-universal-backpack`

### Tags System

```json
{
  "tags": ["type:design-system", "env:universal", "scope:universal"]
}
```

### Integration Readiness

| Aspect | Status | Notes |
|--------|--------|-------|
| Plugin compatibility | ✅ Ready | All 6 plugins match |
| Naming convention | ✅ Defined | `@web-platform/shared-universal-backpack` |
| Tags | ✅ Defined | `type:design-system`, `env:universal`, `scope:universal` |
| Structure alignment | ✅ Compatible | Single project model works |
| Config inheritance | ⚠️ Needs setup | Will extend Banana root configs during merge |

---

## 9. Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Nx graph issues | Low | Medium | Already verified working |
| Build failures | Low | High | Typecheck passed |
| Consumer import breaks | None | Critical | No changes to paths |
| CI workflow failures | Low | Medium | Test in PR before merge |
| Banana merge conflicts | Medium | High | Document structure mapping now |
| Plugin version mismatch | Low | Medium | Both use same Nx version |

---

## References

- [Nx Initialization Research](../nx-initialization/research.md)
- [Nx Graph Documentation](https://nx.dev/features/explore-graph)
- [Production Standards](https://skyscanner.atlassian.net/wiki/spaces/WEAV/pages/1388484149)
- [Banana Repository](file:///Users/viktoryang/skyscanner/banana)
