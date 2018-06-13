# Unreleased

**Breaking:**
- bpk-component-map:
  - Removed all exports except for `BpkMap`, `BpkOverlayView` and `withGoogleMapsScript`.
  - Introduced `BpkOverlayView` component to replace `OverlayView`.
  - Introduced `withGoogleMapsScript` HOC to replace `withScriptjs`.
  - Simplified `BpkMap`'s props by removing unused ones and renaming others.
