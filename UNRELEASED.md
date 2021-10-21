**Fixed:**

- bpk-component-drawer:
  - Updated the drawer component to use the new spacing grid.

**Breaking:**

- bpk-component-calendar:
- bpk-component-datepicker:
- bpk-component-scrollable-calendar:
  - Added range support to BpkCalendar
    - Added new `selectionConfiguration` property to Backpack calendar to allow for range support.
    - `selectedDate` has been deprecated in favour of `selectionConfiguration`. instead of passing `selectedDate` you would now provide the following
      ```js
        selectedConfiguration: {
          type: CALENDAR_SELECTION_TYPE.single,
          date: new Date() // or the value you passed to `selectedDate`.
        }
      ```
    - `selectionStart` and `selectionEnd` has been deprecated in favour of `selectionConfiguration`. instead of passing `selectionStart` and `selectionEnd` you would now provide the following
      ```js
        selectedConfiguration: {
          type: CALENDAR_SELECTION_TYPE.range,
          startDate: new Date() // or the value you passed to `selectionStart`.
          endDate: new Date() // or the value you passed to `selectionEnd`.
        }
      ```