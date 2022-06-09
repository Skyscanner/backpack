**Fixed:**

`bpk-component-barchart`: </br>
`bpk-component-rating`: </br>
`bpk-component-star-rating`: </br>
  - Added accessibility roles to components.


`bpk-component-calendar`: </br>
`bpk-component-scrollable-calendar`: </br>
  - Fixed bug in calendar components where the wrong `selectionType` property (and hence style) is set in a date component when `selectionConfiguration.type` is `single`.


**Breaking:**

 `bpk-component-popover`: </br>
 `bpk-component-tooltip`: </br>
  - Migrated from custom `popper.js` version 1 to upstream version 2.
  - `popperModifiers` now accepts an array of objects instead of an object of options.
    - Modifiers now follow a new format and existing versions will no longer function as expected. See https://popper.js.org/docs/v2/modifiers/ for more information.
