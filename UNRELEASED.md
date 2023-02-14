- `@skyscanner/backpack-web`:

**Fixed:**

- `BpkCard`:
    - Make atomic cards accessible to keyboard users

- `BpkDataTable`:
    - Fixed warnings about props not being recognised.

- `BpkImage`:
  - Fixed an issue where if the image didn't fit the full size of the container and dark background was shown behind the image.

**Changed:**
  - `BpkInput`
    - Update placeholder state color.

  - `BpkTextarea`
    - Update placeholder state color.

  - `BpkDividedCard`
    - Add prop `isElevated` to toggle the card shadow so that it wouldn't overlap with the shadow of the card wrapper.
