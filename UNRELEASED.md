**Breaking:**

`BpkLink`<br />
`BpkButtonLink`
  - Removed deprecated `white` prop. Use `alternate` instead.

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

`BpkSwitch`
  - Removed `type` prop.

`BpkOverlay`
  - Removed `borderRadiusStyle` prop.
  - Removed `BORDER_RADIUS_STYLES` object.

`BpkTable`
  - Removed `alternate` prop.

`BpkInput`
  - Removed uppercase keys in `INPUT_TYPES`, use lower case instead. e.g `INPUT_TYPES.EMAIL` -> `INPUT_TYPES.email`.

`BpkBannerAlert`
  - Removed `event` variant and associated styles.

`BpkCalendar` <br />
`BpkScrollableCalendar` <br />
`BpkDatepicker`
  - Removed deprecated
    - `selectedDate`, `selectionStart`, `selectionEnd`, `date`. Use `selectionConfiguration` prop instead.
    - `showWeekendSeparator` - this is no longer supported

**Changed:**
- `BpkDataTable`
  - `height`, `width`, `headerHeight`, and `rowHeight` props can now be either a string or a number
