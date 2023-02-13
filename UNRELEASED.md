**Breaking:**

- `BpkPrice`: New updated API.
  - `title` has been renamed to `price`.
  - `description` has been renamed to `trailingText`.
  - `subtitle` has been renamed to `leadingText`.
  - Added `previousPrice` property for displaying a previous price.

**Fixed:**

- `BpkCard`:
    - Make atomic cards accessible to keyboard users

- `BpkDataTable`:
    - Fixed warnings about props not being recognised.

**Changed:**
  - `BpkInput`
    - Update placeholder state color.

  - `BpkTextarea`
    - Update placeholder state color.

  - `BpkDividedCard`
    - Add prop `isElevated` to toggle the card shadow so that it wouldn't overlap with the shadow of the card wrapper.
