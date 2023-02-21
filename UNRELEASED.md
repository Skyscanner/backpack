**Breaking:**

`BpkLink`<br />
`BpkButtonLink`
  - Removed deprecated `white` prop. Use `alternate` instead.

`BpkCalendar` <br />
`BpkScrollableCalendar` <br />
`BpkDatepicker`
  - Removed deprecated
    - `selectedDate`, `selectionStart`, `selectionEnd`, `date`. Use `selectionConfiguration` prop instead.
    - `showWeekendSeparator` - this is no longer supported
 
`BpkImage`<br />
`BpkBackgroundImage`
  - Removed deprecated `width` and `height` props. Use `aspectRatio` instead.

`bpk-component-grid`
  - This component has been removed.

`bpk-component-icon`
  - Removed alias `alignToButton` function, to continue use, rename to `withButtonAlignment`.
  - Removed alias `alignToLargeButton` function, to continue use, rename to `withLargeButtonAlignment`.

`bpk-component-button`
  - Removed `BpkButtonOutline` component. Use `BpkButtonPrimaryOnDark` or `BpkButtonPrimaryOnLight` instead.
  - Removed `outline` prop from `BpkButton`.
