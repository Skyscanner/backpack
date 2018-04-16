# Unreleased

**Added:**
- react-native-bpk-component-pagination-dots:
  - Introducing the React Native pagination dots component.
- bpk-component-content-container:
  - `BpkContentContainer` now accepts a `className`.

**Fixed:**
- bpk-component-dialog:
- bpk-component-drawer:
- bpk-component-modal:
- bpk-component-popover:
- bpk-component-tooltip:
  - Context is now preserved in components passed to `children`.

- react-native-bpk-component-horizontal-navs
  - Fixed measurements of native horizontal nav component

- bpk-react-utils:
  - The `Portal` component now preserves context in it's `children` prop

- bpk-stylesheets:
  - Prevent globals (`.hidden`, `.clearfix`) from being scoped by css modules
