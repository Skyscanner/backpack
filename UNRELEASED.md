# Unreleased

**Added**

- bpk-component-calendar
  - Add `cellClassName` for adding styles to the table cells in the grid.
  - Add `selectionStart` and `selectionEnd` properties so that the Week object can know to re-render itself if the user is selecting a range and changes the week's selected status.

**Fixed:**

- bpk-tokens
  - Changed `spacingNone` from `0rem` to `0`. This won't affect any usage in CSS as they're equivalent.
