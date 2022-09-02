**Changed:**

- bpk-component-navigation-bar:
    - Update component to semantic colours.
- bpk-component-horizontal-nav:
  - Migrated component to semantic colour tokens.

**Breaking:**

- bpk-component-floating-notification:
    - Remove `type` prop and `TYPE` object
    - Change component to use semantic colour tokens

**Fixed:**

- bpk-component-aria-live<br />
- bpk-component-content-cards<br />
- bpk-component-graphic-promotion
  - Disabled recent Typescript changes due to incompatibility for non Typescript projects

**Changed:**

- bpk-component-switch:
  - Added new `small` variant using a `boolean` to enable the small size.
  - Deprecated `type` property as we no longer use/support `event` type switch and only have one style.