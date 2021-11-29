**Fixed:**

- bpk-component-calendar:
- bpk-component-scrollable-calendar:
  - Fixed white spaces selection in calendar component. 

**Breaking:**

- bpk-component-badge:
    - Updated badge component to use the new spacing grid. This component will now appear larger in height so should be checked this does not alter layout.

**Added:**
  - bpk-component-datepicker:
    - Added new (OPTIONAL) `inputComponent` property to allow for custom and multiple input fields to be provided for the calendar component when using ranges.
      - The previous input will continue to work as expected if you do not supply your own input. 

- bpk-component-datepicker
- bpk-component-scrollable-calendar
  - Export `CALENDAR_SELECTION_TYPE` so it can be imported from `bpk-component-datepicker` and `bpk-component-scrollable-calendar` instead of `bpk-component-calendar`