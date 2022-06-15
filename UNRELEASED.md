**Added:**
 - `bpk-component-floating-notification` - `1.0.0`

- bpk-component-price
  - Price is a new component to ensure consistent display of pricing.

**Breaking:**
 - bpk-component-popover:
 - bpk-component-tooltip:
  - Migrated from custom `popper.js` version 1 to upstream version 2.
  - `popperModifiers` now accepts an array of objects instead of an object of options.
    - Modifiers now follow a new format and existing versions will no longer function as expected. See https://popper.js.org/docs/v2/modifiers/ for more information.

**Fixed:**

- `@skyscanner/backpack-web`
  - Added missing dependencies `@skyscanner/bpk-svgs`, `@react-google-maps/api`, `@popperjs/core`

- bpk-component-theme-toggle
  - Removed `Konami` library and logic, so not to require it for the single package. It was added as fun for the documentation site but no longer relevant now. 
