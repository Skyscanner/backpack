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
    - Added styles to support range logic.
    - Updated calendar to Figma styles.
    - `showWeekendSeparator` prop has now been deprecated as its no longer part of the calendar design so can be removed.

**Fixed:**

- bpk-component-scrollable-calendar:
  - Fixed a reintroduced functionality of auto scrolling the calendar when a date is clicked, when the library was changed from `react-window` to `react-virtualized`
