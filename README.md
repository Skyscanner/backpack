# Backpack Design System

> Backpack is a collection of design resources, reusable components and guidelines for creating Skyscanner's products.

[![npm version](https://badge.fury.io/js/@skyscanner%2Fbackpack-web.svg)](https://badge.fury.io/js/@skyscanner%2Fbackpack-web)
[![Build Status](https://github.com/Skyscanner/backpack/workflows/Backpack%20CI/badge.svg)](https://github.com/Skyscanner/backpack/actions)

## Quick links

- [Documentation](https://www.skyscanner.design/)
- [Changelog](https://github.com/Skyscanner/backpack/releases)

## Usage

### Installation

```sh
npm install --save @skyscanner/backpack-web
```

## Building with Nx

Backpack uses [Nx](https://nx.dev) to orchestrate builds, tests, and other tasks across all 91 packages in this monorepo. Nx provides intelligent caching and dependency management, significantly improving build performance.

### Quick Start

```sh
# Build all packages
npm run nx -- run-many --target=build --all

# Build a specific package
npm run nx -- run bpk-component-button:build

# Build only packages affected by your changes
npm run nx -- affected --target=build

# View dependency graph
npm run nx -- graph
```

### Performance Benefits

- **89% faster warm builds**: 4.2s vs 37.8s (with cache)
- **100% cache hit rate**: Only rebuild what changed
- **Intelligent parallelization**: Build independent packages concurrently
- **Affected detection**: Test/build only what's impacted by changes

### Documentation

- **[Getting Started with Nx](./docs/nx-migration/getting-started.md)** - Introduction and common workflows
- **[Nx Commands Reference](./docs/nx-migration/nx-commands.md)** - Complete command documentation
- **[Migration Plan](./specs/001-nx-migration/plan.md)** - Full Nx migration strategy
- **[Milestone 1 Report](./docs/nx-migration/milestone-1-report.md)** - Implementation results

### Legacy npm Commands

Traditional npm commands still work and will continue to be supported:

```sh
npm run build      # Build all packages
npm test           # Run all tests
npm run lint       # Lint all packages
```

## Contributing

To contribute please see [contributing.md](CONTRIBUTING.md).

## List of packages

[`bpk-animate-height`](/packages/bpk-animate-height)
[`bpk-component-accordion`](/packages/bpk-component-accordion)
[`bpk-component-autosuggest`](/packages/bpk-component-autosuggest)
[`bpk-component-badge`](/packages/bpk-component-badge)
[`bpk-component-banner-alert`](/packages/bpk-component-banner-alert)
[`bpk-component-barchart`](/packages/bpk-component-barchart)
[`bpk-component-blockquote`](/packages/bpk-component-blockquote)
[`bpk-component-bottom-sheet`](/packages/bpk-component-bottom-sheet)
[`bpk-component-breadcrumb`](/packages/bpk-component-breadcrumb)
[`bpk-component-breakpoint`](/packages/bpk-component-breakpoint)
[`bpk-component-button`](/packages/bpk-component-button)
[`bpk-component-calendar`](/packages/bpk-component-calendar)
[`bpk-component-card`](/packages/bpk-component-card)
[`bpk-component-checkbox`](/packages/bpk-component-checkbox)
[`bpk-component-chip`](/packages/bpk-component-chip)
[`bpk-component-chip-group`](/packages/bpk-component-chip-group)
[`bpk-component-close-button`](/packages/bpk-component-close-button)
[`bpk-component-code`](/packages/bpk-component-code)
[`bpk-component-datatable`](/packages/bpk-component-datatable)
[`bpk-component-datepicker`](/packages/bpk-component-datepicker)
[`bpk-component-description-list`](/packages/bpk-component-description-list)
[`bpk-component-dialog`](/packages/bpk-component-dialog)
[`bpk-component-drawer`](/packages/bpk-component-drawer)
[`bpk-component-fieldset`](/packages/bpk-component-fieldset)
[`bpk-component-form-validation`](/packages/bpk-component-form-validation)
[`bpk-component-graphic-promotion`](/packages/bpk-component-graphic-promotion)
[`bpk-component-grid-toggle`](/packages/bpk-component-grid-toggle)
[`bpk-component-horizontal-nav`](/packages/bpk-component-horizontal-nav)
[`bpk-component-icon`](/packages/bpk-component-icon)
[`bpk-component-image`](/packages/bpk-component-image)
[`bpk-component-infinite-scroll`](/packages/bpk-component-infinite-scroll)
[`bpk-component-input`](/packages/bpk-component-input)
[`bpk-component-label`](/packages/bpk-component-label)
[`bpk-component-link`](/packages/bpk-component-link)
[`bpk-component-list`](/packages/bpk-component-list)
[`bpk-component-loading-button`](/packages/bpk-component-loading-button)
[`bpk-component-mobile-scroll-container`](/packages/bpk-component-mobile-scroll-container)
[`bpk-component-modal`](/packages/bpk-component-modal)
[`bpk-component-navigation-bar`](/packages/bpk-component-navigation-bar)
[`bpk-component-navigation-tab-group`](packages/bpk-component-navigation-tab-group)
[`bpk-component-nudger`](/packages/bpk-component-nudger)
[`bpk-component-page-indicator`](/packages/bpk-component-page-indicator)
[`bpk-component-pagination`](/packages/bpk-component-pagination)
[`bpk-component-panel`](/packages/bpk-component-panel)
[`bpk-component-phone-input`](/packages/bpk-component-phone-input)
[`bpk-component-popover`](/packages/bpk-component-popover)
[`bpk-component-price-range`](/packages/bpk-component-price-range)
[`bpk-component-progress`](/packages/bpk-component-progress)
[`bpk-component-radio`](/packages/bpk-component-radio)
[`bpk-component-rtl-toggle`](/packages/bpk-component-rtl-toggle)
[`bpk-component-card-button`](/packages/bpk-component-card-button)
[`bpk-component-section-header`](/packages/bpk-component-section-header)
[`bpk-component-section-list`](/packages/bpk-component-section-list)
[`bpk-component-select`](/packages/bpk-component-select)
[`bpk-component-skeleton`](/packages/bpk-component-skeleton)
[`bpk-component-slider`](/packages/bpk-component-slider)
[`bpk-component-spinner`](/packages/bpk-component-spinner)
[`bpk-component-star-rating`](/packages/bpk-component-star-rating)
[`bpk-component-switch`](/packages/bpk-component-switch)
[`bpk-component-table`](/packages/bpk-component-table)
[`bpk-component-text`](/packages/bpk-component-text)
[`bpk-component-textarea`](/packages/bpk-component-textarea)
[`bpk-theming`](/packages/bpk-theming)
[`bpk-component-ticket`](/packages/bpk-component-ticket)
[`bpk-component-tooltip`](/packages/bpk-component-tooltip)
[`bpk-react-utils`](/packages/bpk-react-utils)
[`bpk-mixins`](/packages/bpk-mixins)
[`bpk-stylesheets`](/packages/bpk-stylesheets)

## List of external packages

These components are part of Backpack and are utilised by the components but live in the Foundations repository.

These are installed separately and installation information can be found in the [`Backpack Foundations repo`](https://github.com/Skyscanner/backpack-foundations)

| Component                                                                                                                      | Version                                                                                                                                          |
| ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`@skyscanner/bpk-svgs`](https://github.com/Skyscanner/backpack-foundations/tree/main/packages/bpk-svgs)                       | [![npm version](https://badge.fury.io/js/%40skyscanner%2Fbpk-svgs.svg)](https://badge.fury.io/js/%40skyscanner%2Fbpk-svgs)                       |
| [`@skyscanner/bpk-foundations-web`](https://github.com/Skyscanner/backpack-foundations/tree/main/packages/bpk-foundations-web) | [![npm version](https://badge.fury.io/js/%40skyscanner%2Fbpk-foundations-web.svg)](https://badge.fury.io/js/%40skyscanner%2Fbpk-foundations-web) |

