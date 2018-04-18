# Unreleased

**Breaking:**

- react-native-bpk-component-navigation-bar:
  - `BpkNavigationBarTextButtonIOS`, `BpkNavigationBarIconButtonIOS`, and `BpkNavigationBarButtonAndroid` can now be disabled with the `disabled` prop.
  - Introduces a new theme attribute `disabledTintColor`. This new attribute has to be supplied to define a valid theme, without it theming is disabled.

**Added:**
- react-native-bpk-component-pagination-dots:
  - Introducing the React Native pagination dots component.
- bpk-component-code:
  - `BpkCode` and `BpkCodeBlock` now supports an alternate style more suitable for non-white backgrounds with the `alternate` prop.
  - `BpkCode` and `BpkCodeBlock` can now take a custom `className`.
  - `BpkCode` and `BpkCodeBlock` now spreads additional props down.
- bpk-component-table:
  - `BpkTableHeadCell` and `BpkTable` now supports an alternate style more suitable for non-white backgrounds with the `alternate` prop.
- bpk-component-content-container:
  - `BpkConentContainer` now supports an alternate style more suitable for non-white backgrounds with the `alternate` prop.

