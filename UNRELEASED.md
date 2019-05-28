# Unreleased

> Place your changes below this line.

**Added:**

- bpk-component-icon:
- bpk-svgs:
- bpk-mixins:
  - Updated `family` icon
  - Added `filter` icon
  - Added `world--amer` icon
  - Added `world--apac` icon
  - Added `world--emea` icon

**Fixed:**

- bpk-animate-height:
- bpk-component-accordion:
- bpk-component-autosuggest:
- bpk-component-badge:
- bpk-component-banner-alert:
- bpk-component-barchart:
- bpk-component-blockquote:
- bpk-component-breadcrumb:
- bpk-component-breakpoint:
- bpk-component-button:
- bpk-component-calendar:
- bpk-component-card:
- bpk-component-checkbox:
- bpk-component-chip:
- bpk-component-close-button:
- bpk-component-code:
- bpk-component-content-container:
- bpk-component-datatable:
- bpk-component-datepicker:
- bpk-component-description-list:
- bpk-component-dialog:
- bpk-component-drawer:
- bpk-component-fieldset:
- bpk-component-form-validation:
- bpk-component-grid-toggle:
- bpk-component-grid:
- bpk-component-heading:
- bpk-component-horizontal-nav:
- bpk-component-icon:
- bpk-component-image:
- bpk-component-input:
- bpk-component-label:
- bpk-component-link:
- bpk-component-list:
- bpk-component-loading-button:
- bpk-component-map:
- bpk-component-mobile-scroll-container:
- bpk-component-modal:
- bpk-component-navigation-bar:
- bpk-component-navigation-stack:
- bpk-component-nudger:
- bpk-component-pagination:
- bpk-component-panel:
- bpk-component-paragraph:
- bpk-component-phone-input:
- bpk-component-popover:
- bpk-component-progress:
- bpk-component-radio:
- bpk-component-router-link:
- bpk-component-rtl-toggle:
- bpk-component-scrollable-calendar:
- bpk-component-section-list:
- bpk-component-select:
- bpk-component-slider:
- bpk-component-spinner:
- bpk-component-star-rating:
- bpk-component-table:
- bpk-component-text:
- bpk-component-textarea:
- bpk-component-theme-toggle:
- bpk-component-ticket:
- bpk-component-tooltip:
- bpk-react-utils:
- bpk-scrim-utils:
- bpk-theming:
- bpk-tokens:
  - Added `"sideEffects: false,` Webpack hint to each component's `package.json`. This improves tree-shaking, see https://webpack.js.org/guides/tree-shaking/#mark-the-file-as-side-effect-free.

- bpk-component-infinite-scroll:
  - Marked `./src/intersection-observer.js` as having side effects.

## How to write a good changelog entry

1. Add 'Breaking', 'Added' or 'Fixed' in bold depending on if the change will be major, minor or patch according to [semver](semver.org).
2. Add the package name.
3. Detail the changes. Write with the consumer in mind, what do they need to know. If it's patch, tell them what's changed. If it's minor, tell them what you've added and what it does for them. If it's breaking, tell them what they need to change. Link to examples on the [Backpack docs site](backpack.github.io) where possible.

Don't worry about adding the specific version number or the date. This will be done by a Backpack squad member as part of the release process.

## Example of a good changelog entry

See [`CHANGELOG.md`](CHANGELOG.md) for real-world examples of good changelog entries.

**Breaking:**

- `bpk-svgs`:
  - Replaced `charmeleon` icon with new `charizard` icon. To upgrade, replace your references to `charmeleon` with `charizard`.
  - Upgraded `fire` dependency to `3.0.0`.

**Added:**

- `bpk-component-infinity-gauntlet`:
  - New `timeStone` prop for controlling time. See &lt;link to docs site&gt;.

**Fixed:**

- `bpk-component-horcrux`:
  - Fixed issue where `BpkHorcrux` would occasionally possess the living.
