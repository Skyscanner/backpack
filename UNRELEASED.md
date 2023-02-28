**Changed:**

`bpk-component-button`: Cleaned up the onClick functionality to remove a wrapper that is no longer necessary

**Breaking:**

`BpkCalendarGrid`

- Updated to remove a hidden component that was causing visual testing issues.
- Removed `daysOfWeek` and `formatMonth` from the props, since they are no
  longer needed.
