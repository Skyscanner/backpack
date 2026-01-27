# Backpack Project Structure Mapping

**Version**: 2.0
**Date**: 2026-01-27
**Milestone**: 2 - Project Structure Confirmation
**Branch**: WOODPECKER-4040

## Overview

This document maps all 91 packages in the Backpack repository to their designated locations, including future target paths for Banana monorepo integration.

## Structure Decisions

### Current Structure (Milestone 2)

**Decision**: Flat structure - all packages remain directly under `packages/`

**Rationale**:
1. Minimizes changes to existing structure
2. Complies with Production Standard (`packages/` folder requirement)
3. Preserves consumer import paths unchanged
4. Simplifies migration - focus on Nx setup rather than folder reorganization

### Future Banana Target (Post-Merge)

**Decision**: `libs/shared/universal/backpack/` as single Nx project

**Target Path**: `banana/libs/shared/universal/backpack/`

**Rationale**:
1. Aligns with Banana's shared library structure
2. Sits alongside other universal libraries (ui/components, utils, etc.)
3. Single project preserves current publishing model
4. Compatible with Banana's Nx plugin configuration

## Target Structure

### Current (Backpack Repository)

```
backpack/
├── package.json              # Root manifest with workspaces
├── package-lock.json         # Single lockfile
├── nx.json                   # Nx configuration
├── tsconfig.base.json        # Shared TypeScript options
├── tsconfig.json             # Project references
├── packages/
│   ├── package.json          # Publishing manifest (@skyscanner/backpack-web)
│   ├── bpk-animate-height/
│   ├── bpk-component-*/      # 84 UI components
│   ├── bpk-mixins/
│   ├── bpk-react-utils/
│   ├── bpk-scrim-utils/
│   ├── bpk-stylesheets/
│   └── bpk-theming/
├── examples/                 # Storybook stories (unchanged)
├── .storybook/               # Storybook configuration
└── scripts/                  # Automation helpers
```

### Future (In Banana Repository)

```
banana/libs/shared/universal/backpack/
├── src/
│   ├── bpk-animate-height/
│   ├── bpk-component-*/      # 84 UI components
│   ├── bpk-mixins/
│   ├── bpk-react-utils/
│   ├── bpk-scrim-utils/
│   ├── bpk-stylesheets/
│   ├── bpk-theming/
│   └── index.ts              # Main export
├── project.json              # Nx project definition
├── package.json              # @web-platform/shared-universal-backpack
├── tsconfig.json             # Extends root
├── tsconfig.lib.json         # Build config
├── tsconfig.spec.json        # Test config
├── jest.config.js            # Test configuration
└── .eslintrc.js              # Lint configuration
```

## Package Inventory

### Summary

| Category | Count | Current Location | Banana Target |
|----------|-------|------------------|---------------|
| Components | 84 | `packages/bpk-component-*` | `backpack/src/bpk-component-*` |
| Utilities | 2 | `packages/bpk-*-utils` | `backpack/src/bpk-*-utils` |
| Foundations | 2 | `packages/bpk-mixins`, `bpk-stylesheets` | `backpack/src/bpk-*` |
| Theming | 1 | `packages/bpk-theming` | `backpack/src/bpk-theming` |
| Animation | 1 | `packages/bpk-animate-height` | `backpack/src/bpk-animate-height` |
| Internal | 1 | `packages/bpk-component-boilerplate` | `backpack/src/bpk-component-boilerplate` (marked deprecated) |
| **Total** | **91** | | |

---

### Components (84 packages)

| # | Package Name | Location | Notes |
|---|--------------|----------|-------|
| 1 | bpk-component-accordion | packages/bpk-component-accordion/ | |
| 2 | bpk-component-aria-live | packages/bpk-component-aria-live/ | |
| 3 | bpk-component-autosuggest | packages/bpk-component-autosuggest/ | |
| 4 | bpk-component-badge | packages/bpk-component-badge/ | |
| 5 | bpk-component-banner-alert | packages/bpk-component-banner-alert/ | |
| 6 | bpk-component-barchart | packages/bpk-component-barchart/ | |
| 7 | bpk-component-blockquote | packages/bpk-component-blockquote/ | |
| 8 | bpk-component-bottom-sheet | packages/bpk-component-bottom-sheet/ | |
| 9 | bpk-component-breadcrumb | packages/bpk-component-breadcrumb/ | |
| 10 | bpk-component-breakpoint | packages/bpk-component-breakpoint/ | |
| 11 | bpk-component-bubble | packages/bpk-component-bubble/ | |
| 12 | bpk-component-button | packages/bpk-component-button/ | |
| 13 | bpk-component-calendar | packages/bpk-component-calendar/ | |
| 14 | bpk-component-card | packages/bpk-component-card/ | |
| 15 | bpk-component-card-button | packages/bpk-component-card-button/ | |
| 16 | bpk-component-card-list | packages/bpk-component-card-list/ | |
| 17 | bpk-component-carousel | packages/bpk-component-carousel/ | |
| 18 | bpk-component-checkbox | packages/bpk-component-checkbox/ | |
| 19 | bpk-component-chip | packages/bpk-component-chip/ | |
| 20 | bpk-component-chip-group | packages/bpk-component-chip-group/ | |
| 21 | bpk-component-close-button | packages/bpk-component-close-button/ | |
| 22 | bpk-component-code | packages/bpk-component-code/ | |
| 23 | bpk-component-content-cards | packages/bpk-component-content-cards/ | |
| 24 | bpk-component-datatable | packages/bpk-component-datatable/ | |
| 25 | bpk-component-datepicker | packages/bpk-component-datepicker/ | |
| 26 | bpk-component-description-list | packages/bpk-component-description-list/ | |
| 27 | bpk-component-dialog | packages/bpk-component-dialog/ | |
| 28 | bpk-component-drawer | packages/bpk-component-drawer/ | |
| 29 | bpk-component-fieldset | packages/bpk-component-fieldset/ | |
| 30 | bpk-component-flare | packages/bpk-component-flare/ | Code generation |
| 31 | bpk-component-floating-notification | packages/bpk-component-floating-notification/ | |
| 32 | bpk-component-form-validation | packages/bpk-component-form-validation/ | |
| 33 | bpk-component-graphic-promotion | packages/bpk-component-graphic-promotion/ | |
| 34 | bpk-component-grid-toggle | packages/bpk-component-grid-toggle/ | |
| 35 | bpk-component-horizontal-nav | packages/bpk-component-horizontal-nav/ | |
| 36 | bpk-component-icon | packages/bpk-component-icon/ | Code generation |
| 37 | bpk-component-image | packages/bpk-component-image/ | |
| 38 | bpk-component-infinite-scroll | packages/bpk-component-infinite-scroll/ | |
| 39 | bpk-component-info-banner | packages/bpk-component-info-banner/ | |
| 40 | bpk-component-input | packages/bpk-component-input/ | |
| 41 | bpk-component-inset-banner | packages/bpk-component-inset-banner/ | |
| 42 | bpk-component-journey-arrow | packages/bpk-component-journey-arrow/ | |
| 43 | bpk-component-label | packages/bpk-component-label/ | |
| 44 | bpk-component-link | packages/bpk-component-link/ | |
| 45 | bpk-component-list | packages/bpk-component-list/ | |
| 46 | bpk-component-loading-button | packages/bpk-component-loading-button/ | |
| 47 | bpk-component-map | packages/bpk-component-map/ | |
| 48 | bpk-component-mobile-scroll-container | packages/bpk-component-mobile-scroll-container/ | |
| 49 | bpk-component-modal | packages/bpk-component-modal/ | |
| 50 | bpk-component-navigation-bar | packages/bpk-component-navigation-bar/ | |
| 51 | bpk-component-navigation-tab-group | packages/bpk-component-navigation-tab-group/ | |
| 52 | bpk-component-nudger | packages/bpk-component-nudger/ | |
| 53 | bpk-component-overlay | packages/bpk-component-overlay/ | |
| 54 | bpk-component-page-indicator | packages/bpk-component-page-indicator/ | |
| 55 | bpk-component-pagination | packages/bpk-component-pagination/ | |
| 56 | bpk-component-panel | packages/bpk-component-panel/ | |
| 57 | bpk-component-phone-input | packages/bpk-component-phone-input/ | |
| 58 | bpk-component-popover | packages/bpk-component-popover/ | |
| 59 | bpk-component-price | packages/bpk-component-price/ | |
| 60 | bpk-component-price-range | packages/bpk-component-price-range/ | |
| 61 | bpk-component-progress | packages/bpk-component-progress/ | |
| 62 | bpk-component-radio | packages/bpk-component-radio/ | |
| 63 | bpk-component-rating | packages/bpk-component-rating/ | |
| 64 | bpk-component-rtl-toggle | packages/bpk-component-rtl-toggle/ | |
| 65 | bpk-component-scrollable-calendar | packages/bpk-component-scrollable-calendar/ | |
| 66 | bpk-component-section-header | packages/bpk-component-section-header/ | |
| 67 | bpk-component-section-list | packages/bpk-component-section-list/ | |
| 68 | bpk-component-segmented-control | packages/bpk-component-segmented-control/ | |
| 69 | bpk-component-select | packages/bpk-component-select/ | |
| 70 | bpk-component-skeleton | packages/bpk-component-skeleton/ | |
| 71 | bpk-component-skip-link | packages/bpk-component-skip-link/ | |
| 72 | bpk-component-slider | packages/bpk-component-slider/ | |
| 73 | bpk-component-snippet | packages/bpk-component-snippet/ | |
| 74 | bpk-component-spinner | packages/bpk-component-spinner/ | Code generation |
| 75 | bpk-component-split-input | packages/bpk-component-split-input/ | |
| 76 | bpk-component-star-rating | packages/bpk-component-star-rating/ | |
| 77 | bpk-component-swap-button | packages/bpk-component-swap-button/ | |
| 78 | bpk-component-switch | packages/bpk-component-switch/ | |
| 79 | bpk-component-table | packages/bpk-component-table/ | |
| 80 | bpk-component-text | packages/bpk-component-text/ | |
| 81 | bpk-component-textarea | packages/bpk-component-textarea/ | |
| 82 | bpk-component-theme-toggle | packages/bpk-component-theme-toggle/ | |
| 83 | bpk-component-ticket | packages/bpk-component-ticket/ | |
| 84 | bpk-component-tooltip | packages/bpk-component-tooltip/ | |

---

### Utilities (2 packages)

| # | Package Name | Location | Notes |
|---|--------------|----------|-------|
| 1 | bpk-react-utils | packages/bpk-react-utils/ | Portal, cssModules, RTL, etc. |
| 2 | bpk-scrim-utils | packages/bpk-scrim-utils/ | Modal scrim utilities |

---

### Foundations (2 packages)

| # | Package Name | Location | Notes |
|---|--------------|----------|-------|
| 1 | bpk-mixins | packages/bpk-mixins/ | SCSS mixins and tokens |
| 2 | bpk-stylesheets | packages/bpk-stylesheets/ | Base stylesheets |

---

### Theming (1 package)

| # | Package Name | Location | Notes |
|---|--------------|----------|-------|
| 1 | bpk-theming | packages/bpk-theming/ | Theme provider and utilities |

---

### Animation (1 package)

| # | Package Name | Location | Notes |
|---|--------------|----------|-------|
| 1 | bpk-animate-height | packages/bpk-animate-height/ | Height animation utility |

---

### Internal (1 package)

| # | Package Name | Location | Notes |
|---|--------------|----------|-------|
| 1 | bpk-component-boilerplate | packages/bpk-component-boilerplate/ | Template for new components (internal use) |

---

## Nx Compatibility

### Current Status

| Aspect | Status | Details |
|--------|--------|---------|
| Nx graph | ✅ Working | Detects `@skyscanner/backpack-web` as project |
| TypeScript | ✅ Compatible | Project references configured |
| npm workspaces | ✅ Configured | Single install, hoisted dependencies |
| Build pipeline | ✅ Working | All scripts functional |

### Project Detection

Currently, Nx detects `packages/` as a single project because:
- `packages/package.json` defines `@skyscanner/backpack-web`
- Individual components don't have their own `package.json`

This is correct for milestone 2. Per milestone 4, each component will get `project.json` for individual project detection.

### Banana Nx Compatibility

| Banana Requirement | Backpack Status | Action Needed |
|-------------------|-----------------|---------------|
| @nx/jest plugin | ✅ Compatible | None - Jest already configured |
| @nx/eslint plugin | ✅ Compatible | None - ESLint already configured |
| @nx/storybook plugin | ✅ Compatible | None - Storybook already configured |
| @nx/js/typescript | ✅ Compatible | None - TypeScript configured |
| nx-stylelint plugin | ✅ Compatible | None - Stylelint already configured |
| project.json | ⚠️ Deferred | Add during Banana merge |
| Tags system | ⚠️ Deferred | Add `type:design-system`, `env:universal`, `scope:universal` |

---

## Banana Integration Plan

### Pre-Merge Preparation (This Milestone)

1. ✅ Document current structure mapping
2. ✅ Verify Nx graph works correctly
3. ✅ Document Banana target structure
4. ⬜ Ensure all Nx plugins are compatible

### During Merge (Future Milestone)

1. Move `packages/*` contents to `libs/shared/universal/backpack/src/`
2. Create `project.json` with Banana naming convention
3. Create `package.json` as `@web-platform/shared-universal-backpack`
4. Update import paths in consuming applications
5. Configure tags for module boundaries

### Post-Merge Tasks

1. Update Storybook configuration
2. Migrate stories (milestone 3 dependency)
3. Set up component-level projects (milestone 4 dependency)

---

## Consumer Import Paths

### Unchanged Import Patterns

```javascript
// Component import
import BpkButton from '@skyscanner/backpack-web/bpk-component-button';

// Multiple component import
import BpkButton from '@skyscanner/backpack-web/bpk-component-button';
import BpkInput from '@skyscanner/backpack-web/bpk-component-input';

// SCSS mixin import
@use '@skyscanner/backpack-web/bpk-mixins/tokens';
@use '@skyscanner/backpack-web/bpk-mixins/typography';
```

**No changes to consumer imports required.**

---

## Deferred Items

| Item | Deferred To | Description |
|------|-------------|-------------|
| project.json per component | Milestone 4 | "Set up Components as Nx Projects" |
| Story colocation | Milestone 3 | "All Storybook Stories Colocated" |
| Module boundaries | Milestone 6 | "Configure Module Boundaries" |
| Nx targets per component | Milestone 5 | "Converting Static Checks and Scripts to Nx" |
| Actual Banana merge | Future | Move files to `libs/shared/universal/backpack/` |

---

## Approval

- [ ] Author review complete
- [ ] PE team alignment verified
- [ ] Production Standards compliance confirmed

---

## References

- [Spec](./spec.md) - Feature specification
- [Plan](./plan.md) - Implementation plan
- [Research](./research.md) - Research findings
- [Nx Adoption One Pager](https://skyscanner.atlassian.net/wiki/spaces/Clover/pages/1430062432)
- [Production Standards](https://skyscanner.atlassian.net/wiki/spaces/WEAV/pages/1388484149)
