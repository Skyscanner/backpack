**Added:**
- bpk-react-utils
  - Added new functions `isIphone`, `isIpad` and `isIos`, to enable detection if device is iOS to allow platform specific implementations.

**Fixed:**
- bpk-component-modal
  - Fixed an RTL bug where the close button had additional spacing on the left.
- bpk-mixins
  - Fixed docs for `bpk-margin-leading` and `bpk-margin-trailing` mixins - where the default value for `$resetOppositeMargin` was stated as `false` instead of `true`.