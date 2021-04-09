**Added:**
- bpk-react-utils
  - Extracted out and added new functions `isDeviceIphone`, `isDeviceIpad` and `isDeviceIos`, to enable detection if device is iOS to apply platform specific behaviour.

**Fixed:**
- bpk-component-modal
  - Changed default property `isIphone` to use the `bpk-react-utils` function.
- bpk-scrim-utils
  - Changed default properties `isIphone` and `isIpad` to use the `bpk-react-utils` function.

**Fixed:**
- bpk-component-modal
  - Fixed an RTL bug where the close button had additional spacing on the left.
- bpk-mixins
  - Fixed docs for `bpk-margin-leading` and `bpk-margin-trailing` mixins - where the default value for `$resetOppositeMargin` was stated as `false` instead of `true`.