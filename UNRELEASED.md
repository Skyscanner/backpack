`@skyscanner/backpack-web`:

**Changed:**

- `BpkIcon`:
  - Bump `@skyscanner/bpk-svgs`. The icons are visually the same, but your snapshot tests might break due to small differences in the `svg` paths.

**Added**
  - `BpkBadge`
    - Added new `brand` variant.
  
 **Patched:**

- BpkRating:
  - At large size with no subtitle fixed the component where the title would 'float' above the baseline.
