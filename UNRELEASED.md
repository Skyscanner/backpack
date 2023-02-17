`@skyscanner/backpack-web`:

**Added:**

- `BpkCardWrapper`
  - It is a new component which is used for card wrapper component.

**Changed:**

- Remove unused React imports. This is now handled automatically by the new JSX transform. This should not have any impact on consumers.

**Breaking:**

- `BpkPrice`: New updated API.
  - `title` has been renamed to `price`.
  - `description` has been renamed to `trailingText`.
  - `subtitle` has been renamed to `leadingText`.
  - Added `previousPrice` property for displaying a previous price.
