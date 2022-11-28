`@skyscanner/backpack-web`:

**Fixed:**

- `BpkSwitch`:
  - Update switch track colour

**Changed:**

  - `BpkOverlay`
    - Added new overlay styles to unify the availability of styles.
      - `OVERLAY_TYPES` - Sets the type of overlay from: `solid`, `top`, `bottom`, `left`, `right`, `vingette`.
      - `OVERLAY_LEVELS` - Sets the level of overlay from: `low`, `medium`, `high`. In the case of `vingette`, you do no need to set this as it's always one style.
    - Deprecated `borderRadiusStyle` as this now inherits from the wrapper.