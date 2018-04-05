# Unreleased

**Breaking:**
- bpk-tokens:
  - Major upgrade in underlying token library, include:
    - Token output is now sorted alphabetically
    - `".alias"` property has been replaced with an `"originalValue"` property in `*.ios.json`, `*.raw.ios.json` and `*.raw.android.json`.

**Added:**
- react-native-bpk-component-pagination-dots:
  - Introducing the React Native pagination dots component.

**Fixed:**
- bpk-component-input:
  - The uppercase keys in `INPUT_TYPES` are now deprecated use lowercase instead. e.g `INPUT_TYPES.EMAIL` -> `INPUT_TYPES.email`.
