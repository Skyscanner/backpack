# Unreleased

**Fixed:**
- bpk-component-infinite-scroll:
  - Scroll intersection evaluation changed. Previously, it an intersection of, exactly, 1 (100%) was expected. This change cover the case when the intersection ratio is almost 1 (i.e. 1.001).

- react-native-bpk-component-image:
  - Fixed `source` type to accept the same values as the `Image` component.

