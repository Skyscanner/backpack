- `@skyscanner/backpack-web`:

**Fixed:**

- `BpkCard`:
    - Make atomic cards accessible to keyboard users

- `BpkDataTable`:
    - Fixed warnings about props not being recognised.

**Changed:**

  - Remove unused React imports. This is now handled automatically by the new JSX transform. This should not have any impact on consumers.
  
  - `BpkInput`
    - Update placeholder state color.

  - `BpkTextarea`
    - Update placeholder state color.

  - `BpkDividedCard`
    - Add prop `isElevated` to toggle the card shadow so that it wouldn't overlap with the shadow of the card wrapper.
