`@skyscanner/backpack-web`:

**Breaking:**

- `BpkIcon`:
  - Update small icons to `16px` to align with apps. Please check this does not break your UI.

`BpkBannerAlert` </br>
`BpkBreadcrumb` </br>
`BpkButton` </br>
`BpkCloseButton` </br>
`BpkFormValidation` </br>
`BpkStarRating` </br>
  - Update components to use new icon size.

**Added:**

- `BpkDividedCard`
  - It is a new component which is used for the inventory card. It just is a layout structure.
 
**Changed:**

  - `BpkOverlay`
    - Added new overlay styles to unify the availability of styles.
      - `OVERLAY_TYPES` - Sets the type of overlay from: `solid`, `top`, `bottom`, `left`, `right`, `vingette`.
      - `OVERLAY_LEVELS` - Sets the level of overlay from: `low`, `medium`, `high`. In the case of `vingette`, you do no need to set this as it's always one style.
    - Deprecated `borderRadiusStyle` as this now inherits from the wrapper.
