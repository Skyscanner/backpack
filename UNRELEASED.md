**Breaking:**
 - bpk-component-popover:
 - bpk-component-tooltip:
  - Migrated from custom `popper.js` version 1 to upstream version 2.
  - `popperModifiers` now accepts an array of objects instead of an object of options.
    - Modifiers now follow a new format and existing versions will no longer function as expected. See https://popper.js.org/docs/v2/modifiers/ for more information.