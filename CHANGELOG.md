# Backpack changelog

[Unreleased changes](./UNRELEASED.md).

# 2020-10-27

**Breaking:**

 - bpk-tokens: 35.0.2 => 36.0.0
   - `borderRadiusSm` and `cornerRadiusSm` for iOS have changed from `4` to `8`.

# 2020-10-26

**Fixed:**

 - bpk-component-datatable: 2.0.44 => 2.0.45
   - When `BpkDataTable` doesn't have `onRowClick` set, the hover state won't apply to rows. Previously, the hover state would apply regardless of whether rows were selectable or not.

# 2020-10-22

**Fixed:**

 - bpk-component-image: 4.0.45 => 4.0.46
   - Added flow types for `withLoadingBehavior`.

 - bpk-tokens: 35.0.0 => 35.0.1
   - Reverted the removal of iOS `borderSize` and `borderRadius` tokens as these should still exist for use in React Native.

# 2020-10-20

**Breaking:**

 - bpk-tokens: 34.2.0 => 35.0.0
   - `borderRadiusSm` for Android has changed from `4` to `8`.

# 2020-10-13 - New overlay component

**Added:**

 - bpk-component-overlay: 1.0.0
   - New `BpkOverlay` component, used for adding tints to backgrounds. See https://backpack.github.io/components/overlay?platform=web for more.

# 2020-10-12 - New radius changes

**Added:**

- bpk-tokens: 34.1.0 => 34.2.0
  - Added new radius tokens for iOS and Android as part of the new guidelines.
    - For now we are going to keep SM the same value until we have time to fully adopt in our apps - in case anything urgent arises that requires fixing.

**Fixed:**

- bpk-component-button: 3.2.62 => 3.2.63
  - `BpkButton` has been updated to use `border-radius-sm` instead of `border-radius-xs` as per the new guidelines.

# 2020-10-07 - New flare variant of `BpkDialog`

**Added:**
  - bpk-component-dialog: 2.1.1 => 2.2.0
    - Added new `flare` and `flareClassName` props to allow flare variant of dialog.

# 2020-10-05 - `BpkCard` border radius update and `BpkSelect` a11y fix.

**Added:**
  - bpk-tokens: 34.0.0 => 34.1.0
    - New `bpk-border-radius-md` token for use on cards
  - bpk-mixins: 20.0.11 => 20.1.0
    - New `bpk-border-radius-md` mixin to apply the token to `border-radius`

**Fixed:**
  - bpk-component-card: 2.1.11 => 2.1.12
  - bpk-component-panel: 2.0.82 => 2.0.83
    - Have been updated to use `border-radius-md` instead of `border-radius-sm` as per the new guidelines.
  - bpk-component-select: 3.0.82 => 3.0.83
    - Images passed to `BpkSelect` now have `aria-hidden` set, preventing them from interfering with screen readers.

# 2020-10-05 - New icon variant of `BpkDialog`.

**Added:**
  - bpk-component-dialog: 2.0.86 => 2.1.0
    - Added new `headerIcon` and `headerIconType` props to allow icon variant of dialog.

**Fixed:**
  - bpk-svgs: 12.1.10 => 12.1.11
      - The media icon was previously flipping in RTL. This has now been fixed.


# 2020-09-30 - Flow type fix for horizontal nav

**Fixed:**
  - bpk-component-horizontal-nav:
    - Fixed flow types for scroller ref by removing needless `$FlowIgnore`s.

# 2020-09-29 - README clarification on `BpkChip`

**Fixed:**
  - bpk-component-chip: 4.0.10 => 4.0.11
    - Updated docs on usage of component.

# 2020-09-25 - New `onOpenChange` prop for calendar.

**Added:**
 - bpk-component-datepicker: 11.2.40 => 11.3.0
   - New `onOpenChange` prop which is a callback method that will be called when the date picker open state changes
   - The isOpen state can be updated through the isOpen prop

# 2020-09-21 - Fixed incorrect flow typing.

**Fixed:**
  - bpk-component-breakpoint: 2.0.81 => 2.0.82
    - Fixed incorrect flow type for `children` prop.
  - bpk-component-checkbox: 2.2.10 => 2.2.11
    - Fixed incorrect flow type for `label` prop.

# 2020-09-14 - New `BpkAccordion` prop and updating input placeholder styles

**Breaking:**
  - bpk-tokens: 33.0.1 => 34.0.0
    - Removed `$bpk-input-placeholder-font-style` token as this is no longer required or used in the input component.
      - NOTE - This is not breaking if you are not using this token directly.

**Added:**
  - bpk-component-accordion: 3.1.83 => 3.2.0
    - Added new `weight` prop to allow titles to support `bold` and `heavy` font weight.

**Fixed:**
    - bpk-component-input: 5.0.81 => 5.0.82
    - bpk-component-textarea: 2.0.80 => 2.0.81
      - Removed setting placeholder `font-style` to italic.

# 2020-09-11 - Map Marker update and `BpkHorizontalNav` a11y fixes

**Breaking**:
- bpk-component-map: 3.2.1 => 4.0.0
  - `BpkMapMarker` has been replaced with `BpkIconMarker`. See the [migration guide](https://github.com/Skyscanner/backpack/blob/master/packages/bpk-component-map/docs/migrating-from-v3-to-v4.md) for more information.

**Fixed**:
  - bpk-component-horizontal-nav: `3.2.20`
      - Fixed accessibility issues on the `BpkHorizontalNav` that prevented the component to be functional when using a screen reader to navigate.

# 2020-09-03 - Removing old non-UIKit tokens

**Breaking**
  - bpk-tokens: 32.1.0 => 33.0.0
      - Removed non-UIKit aligned iOS tokens

# 2020-09-03 - New `BpkPriceMarker` and drop support for React 15

**Breaking**
  - All packages:
      - Packages no longer support a peer-dependency of React 15

**Added:**
  - bpk-component-map: 3.1.70 => 3.2.0
    - Added `BpkPriceMarker` to display pricing markers on the map.

# 2020-08-31 - Flow upgrades.

**Added:**
  - bpk-component-barchart: 3.0.78 => 3.1.0
    - Added Flow.

**Fixed:**
  - Upgraded Flow to `0.132.0` and changed syntax for `FlowFixMe` suppressions in components.

# 2020-08-28 - New iOS tokens and Flow support.

**Added:**
  - bpk-tokens: 32.0.5 => 32.1.0
    - Added new `UIKit` aligned token aliases for corner radii and border width values.

  - bpk-component-close-button: 2.0.76 => 2.0.77
  - bpk-component-drawer: 3.0.33 => 3.0.34
  - bpk-component-list: 3.0.75 => 3.0.76
  - bpk-component-progress: 2.0.76 => 2.0.77
    - Added Flow.

**Fixed:**
  - bpk-component-banner-alert: 4.2.24 => 4.2.25
  - bpk-component-modal: 2.1.75 => 2.1.76
    - Flow type fix.

# 2020-08-24 - Icon fixes.

**Fixed:**
  - bpk-svgs: 12.1.5 => 12.1.6
    - Fixed an issue that causes the `translate` icon's dots to disappear sometimes.
    - Reverted the `eco-leaf` icon to the previous design to align better with existing campaigns.

# 2020-08-07 - Added Flow support.

**Added**:
  - bpk-component-accordion: 2.1.77
  - bpk-component-breakpoint: 2.00.74
  - bpk-component-paragraph: 2.0.74
  - bpk-component-radio: 2.0.74
  - bpk-component-star-rating: 2.1.72
  - bpk-component-table: 2.0.74
  - bpk-component-textarea: 2.0.74
    - Added Flow.

# 2020-08-06 - `filter` icon fix.

**Fixed:**
  - bpk-svgs: 12.1.3 => 12.1.4
    - Fixed an issue with the `filter` icon that caused it to render incorrectly when used via the `BpkIcon` font.

# 2020-08-05 - Added Flow support.

**Added:**
  - bpk-component-autosuggest: 4.0.74 => 4.1.0
  - bpk-component-card: 2.0.71 => 2.1.0
  - bpk-component-checkbox: 2.1.23 => 2.2.0
  - bpk-component-heading: 3.0.71 => 3.1.0
  - bpk-component-link: 2.0.71 => 2.1.0
  - bpk-component-loading-button: 3.1.24 => 3.2.0
  - bpk-component-spinner: 3.0.71 => 3.1.0
    - Added Flow.

# 2020-08-03 - New chip component

**Breaking:**
- bpk-component-chip: 4.0.0
  - The chip component has been completely rewritten to have a new look, a more modern API and support more use cases easily. See the [migration guide](https://github.com/Skyscanner/backpack/blob/master/packages/bpk-component-chip/docs/migrating-from-v3-to-v4.md) for more information.
- bpk-mixins: 20.0.0
  - The `bpk-chip__label` mixin has been removed, as it's no longer used in the new chip implementation.

  **Fixed**:
  - bpk-component-dialog 2.0.75
  - bpk-component-modal: 2.1.70
    - The onClose prop now defaults to a function as required by Portal within.



# 2020-07-29 - Reinstated native icons removed by accident

**Added:**
- bpk-svgs: 12.1.0 => 12.1.1
  - Reinstating large native icons which were accidentally deleted.
  - Updated small native icons to reflect the new style.

# 2020-07-29 - Rating redesign and `BpkChip` disabled fix

**Added:**
- bpk-component-rating: 2.0.69 => 2.1.0
  - Rating has been redesigned to have a fresh look.
  - Fixed A11y contrast issues with `high` and `medium` ratings.
  - Added new `pill` style rating which is set with the `RATING_TYPES` property.

**Fixed:**
- bpk-component-chip: 3.3.0 => 3.3.1
  - Fixed an issue where `disabled` chips could still be pressed and looked wrong.


# 2020-07-28 - Chip redesign

**Added:**

- bpk-component-chip: 3.3.0
  - Chips have been redesigned to have a fresh new look.
  - Added two new chip types — `success` and `light`.
  - Added a new `disabled` prop.

# 2020-07-27 - `xl` icons for native

**Added:**

 - bpk-svgs: 12.0.2 => 12.1.0
   - Added `xl` star-rating icons for use on mobile native platforms.

# 2020-07-22 - Badge design tweaks and scrollable calendar changes

**Changed:**
  - bpk-component-badge: 2.0.67 => 2.0.68
    - Tweaked design of badges.

  - bpk-component-scrollable-calendar: 2.0.69 => 2.0.70
    - Remove resize event listeners when the component is unmounted.

# 2020-07-14 - Updated `BpkText` API

**Added:**
  - bpk-component-text: 3.0.32 => 3.1.0
    - Added `weight` prop to set the `bold` and `black` font on text components.
    - Deprecated `bold` prop in favour of `weight`.

# 2020-07-13

**Changed:**
- bpk-component-icon: 8.2.2 => 8.2.3
- bpk-svgs: 12.0.1 => 12.0.2
  - All icons have been optimised, reducing their file size slightly.

# 2020-07-10

**Changed**:
  - bpk-svgs: 12.0.0 => 12.0.1
  - bpk-component-spinner: 3.0.63 => 3.0.64
    - The spinner has a fresh new design.

# 2020-07-09 - Refreshed Radio and Checkbox styles

**Breaking:**
- bpk-svgs: 11.2.0 => 12.0.0
  - Removed the radio SVGs that were being used in the radio component as the component no longer uses them. This change is breaking only if you are using `bpk-radio--invalid` and `bpk-radio__input` mixins directly, otherwise if using `BpkRadio` component this major does not affect you.
  - Removed the checkbox SVGs that were being used in the checkbox component as the component no longer uses them. This change is breaking only if you are using `bpk-checkbox--invalid` and `bpk-checkbox__input` mixins directly, otherwise if using `BpkCheckbox` component this major does not affect you.

**Fixed:**
- bpk-mixins: 19.1.30 => 19.1.31
- bpk-component-radio: 2.0.61 => 2.0.62
  - `BpkRadio` has a refreshed, modern appearance.
- bpk-component-checkbox: 2.1.13 => 2.1.14
  - `BpkCheckbox` has a refreshed modern appearance.

# 2020-07-07

**Added:**
- bpk-component-icon: `8.2.0`
- bpk-svgs: `11.2.0`
  - Redesigned the `cars-flexible` icon.
  - `cars-flexible`, `flight-flexible` and `hotel-flexible` are now available in the small icon set.

**Added:**
  - bpk-component-horizontal-nav: `3.2.0`
    - Added a `type` prop. Set it to `light` to get an all-white appearance for when displaying over a dark background or an image.

# 2020-07-03

As of this update, all icons that were accidentally removed in `bpk-svgs 9.0.0` and `bpk-component-icon 6.0.0` have been reinstated.

**Changed:**
  - bpk-svgs: `11.1.2`
  - bpk-component-icon: `8.1.2`
   - Reinstated `single-booking` icon.

# 2020-07-03

**Changed:**
  - bpk-svgs: `11.1.1`
  - bpk-component-icon: `8.1.1`
   - Reinstated some icons that were accidentally removed in `bpk-svgs 9.0.0` and `bpk-component-icon 6.0.0`:
      - `document-csv`
      - `document-pdf`
      - `grid-layout`
      - `multiple-bookings`
      - `print`
      - `speaker`
      - `swap--vertical`
      - `ticket-flexible`
      - `wallet`

# 2020-07-02

**Added:**
- bpk-component-icon: `8.1.0`
- bpk-svgs: `11.1.0`
  - Reinstated small version of `fast-track` icon, which was accidentally removed in `bpk-svgs 9.0.0` and `bpk-component-icon 6.0.0`.
  - Added `clean-policy`, `cleaning-medical`, `ppe` and `social-distancing` icons.


# 2020-07-01 - More icon changes

In `bpk-svgs 9.0.0` and `bpk-component-icon 6.0.0`, the new icon set was released. Some icons were inadvertently removed in this update. This update reinstates some of the missing ones — the remaining missing ones will be coming in the next update — and renamed some of the new icons to better fit our naming convention. It also introduces new star icons and updates the star rating component to use them.

A detailed changelog is below:

**Breaking:**
  - bpk-svgs:
  - bpk-component-icon:
    - Renamed some icons:
      - `face-blank` is now `face--blank`.
      - `face-happy` is now `face--happy`.
      - `face-sad` is now `face--sad`.
      - `un-mute` is now `unmute`.
      - `weather-clear` is now `weather--clear`.
      - `weather-cloudy` is now `weather--cloudy`.
      - `weather-fog` is now `weather--fog`.
      - `weather-partly-cloudy` is now `weather--partly-cloudy`.
      - `weather-rain` is now `weather--rain`.
      - `weather-snow` is now `weather--snow`.
      - `weather-thunderstorm` is now `weather--thunderstorm`.
      - `weather-tornado` is now `weather--tornado`.
      - `weather-wind` is now `weather--wind`.

  **Changed:**
  - bpk-svgs:
  - bpk-component-icon:
   - Reinstated some icons that were accidentally removed in the previous releases:
      - `swap--horizontal`
      - `transmission-automatic`
      - `transmission-manual`
      - `social-like`
    - Redesigned some icons:
      - `star`, `star-outline` and `star-half` icon have a new design.
  - bpk-component-star-rating:
    - Updated component to use new star icons.


# 2020-06-30

**Breaking:**
  - bpk-component-icon: `7.0.0`
  - bpk-svgs: `10.0.0`
    - Fixed an issue with the large `minus` icon not rendering correctly.
    - Fixed an issue where some of the large `gears--` icons were named incorrectly.

**Added**:
  - bpk-component-accordion: `2.1.58`
    - Added new `icon` prop to allow icons to be displayed in the accordion title.

# 2020-06-30 - New icon set

**Breaking**:

Note: There are no breaking code changes here — your existing code should work fine. This change is breaking because the icons have changed visually. When performing this upgrade, please take a close look at your screens and confirm everything looks alright. If you run into any problems adopting the new icons, contact #backpack.

  - bpk-svgs: `9.0.0`
  - bpk-component-icon: `6.0.0`
      - Backpack's icon set has been refreshed with a fresh new look. Small icons are now more legible too. See https://backpack.github.io/components/icon?platform=design to see them in play.
      - Icon fonts now contain separate glyphs for small icons.

# 2020-06-22 - `showUnderline` prop for `BpkHorizontalNav`

**Added:**:
  - bpk-component-horizontal-nav:
    - Added `showUnderline` prop for controlling whether the underline under the component is displayed.

# 2020-06-22 - Better accessibility for `BpkHorizontalNav`

**Fixed:**
  - bpk-component-horizontal-nav:
    - Added `tablist` role to `BpkHorizontalNav` component for accessibility.

**Changed:**
  - All components
    - Flow `0.127` is now supported.

# 2020-06-18 - New icon

**Added:**
  - bpk-svgs: 8.4.1 => 8.5.0
  - bpk-component-icon: 5.2.2 => 5.3.0
    - Added new `logout` icon.

# 2020-06-11 - Fixed checkbox alignment

**Fixed:**
  - bpk-component-checkbox: 2.1.3 => 2.1.4
    - Fixed alignment issue for checkbox.

# 2020-05-26 - New `event` style for Banner Alert and Switch. Component fixes

**Added:**
  - bpk-component-banner-alert: 4.1.1 => 4.2.0
    - Added new `event` style to alert types.
  - bpk-component-switch: 1.0.1 => 1.1.0
    - Added new `event` style to switch types.

**Fixed:**
  - bpk-mixins: 19.1.19 => 19.1.20
  - bpk-component-close-button: 2.0.51 => 2.0.52
    - Fixed an issue that caused the focus indicator on the close button to appear very small.
  - bpk-component-loading-button: 3.1.3 => 3.1.4
    - Fixed `Each child in an array or iterator should have a unique "key" prop` warning.

# 2020-05-07 - New icons and switch fix

**Added:**
  - bpk-svgs: 8.3.1 => 8.4.0
  - bpk-component-icon: 5.1.1 => 5.2.0
    - Added new `ticket-flexible` and `hotel-flexible` icons.

**Fixed:**
  - bpk-component-switch: 1.0.0 => 1.0.1
    - Fixed an issue that causes `aria-labels` to not be present.

# 2020-05-07

**Added:**
  - bpk-component-switch: 1.0.0
    - New switch component.

  - bpk-component-banner-alert: 4.0.5 => 4.1.0
    - Added new `primary` style to alert types.

  - bpk-tokens: 32.0.3 => 32.0.4
    - Added new `primary` banner alert.

# 2020-05-06 - Additions and Fixes

**Added:**
  - bpk-component-icon: 5.0.48 => 5.1.0
  - bpk-svgs: 8.2.36 => 8.3.0
    - Added new `account--name` icon to the icon grid.

  - bpk-component-checkbox: 2.0.50 => 2.1.0
    - Added `indeterminate` visual state support
    - Updated Checkboxes to new designs

**Fixed:**
  - bpk-tokens: 32.0.2 => 32.0.3
    - Fixed a bug where passing `0` to `setOpacity` threw an error.
  - bpk-component-autosuggest: 4.0.50 => 4.0.51
    - Upgraded `react-autosuggest` to `10.0.2`.

# 2020-05-01

**Fixed:**
  - bpk-component-checkbox: `2.0.49 => 2.0.50`
  - bpk-component-label: `4.0.47 => 4.0.48`
    - `disabled` now takes precedence over `invalid`, to prevent users seeing invalid labels they cannot edit.


# 2020-04-30

**Added:**

  - bpk-component-loading-button: 3.0.49 => 3.1.0
    - Added a `iconPosition` prop which allows consumers to control whether the icon is shown on the leading or trailing side of the button.

**Fixed:**

  - bpk-component-flare: 1.0.47 => 1.0.48
    - Fixed an issue that caused the flare to disappear in RTL.

# 2020-04-20 - RTL fixes

**Fixed:**

  - bpk-component-rating: 2.0.45 => 2.0.46
    - Fixed a couple of minor layout issues in RTL.

  - bpk-component-star-rating: 2.1.43 => 2.1.44
    - Fixed a bug that caused a strange animation when selecting a star rating in RTL mode.

# 2020-03-09 - New `primary` chip type.

**Added:**
  - bpk-component-chip: 3.1.28 => 3.2.0
    - Added new `primary` style chip that can be created using `type` prop.

# 2020-03-08

**Fixed:**
  - All components should now work with Flow 0.122. Previously errors appeared when using components that make use of `...rest`. See `decisions/flowfixme.md` for more context.


# 2020-03-06

**Added:**
  - bpk-component-tooltip: 4.0.43 => 4.1.0
    - New `type` prop for creating dark tooltips. See https://backpack.github.io/components/tooltip?platform=web for an example.

# 2020-04-03

**Breaking:**

The following changes are only breaking if you are on a version of React lower than 16.3.

**If you're on React 16.3 or higher, these changes are not breaking.**

  - bpk-animate-height: 2.0.43 => 3.0.0
  - bpk-component-banner-alert: 3.0.44 => 4.0.0
  - bpk-component-calendar: 6.3.3 => 7.0.0
  - bpk-component-datatable: 1.0.43 => 2.0.0
  - bpk-component-drawer: 2.0.44 => 3.0.0
  - bpk-component-image: 3.0.43 => 4.0.0
  - bpk-react-utils: 2.9.4 => 3.0.0
    - Renamed `componentWillReceiveProps` to `UNSAFE_componentWillReceiveProps`.

  **Added:**
  - bpk-component-datepicker: 11.1.21 => 11.2.0
    - Add `valid` prop to `BpkDatepicker`.

# 2020-03-30

**Fixed:**
  - bpk-component-icon: 5.0.42 => 5.0.43
  - bpk-svgs: 8.2.34 => 8.2.35
  - bpk-mixins: 19.1.10 => 19.1.11
      - Aligned new hotels icon to the icon grid.

# 2020-03-24 - Fix for flare component

**Fixed:**

 - bpk-component-flare: 1.0.38 => 1.0.39
   - Fixed an issue that causes the flare pointer left margin to be displayed incorrectly.


# 2020-03-20 - Coloured calendar date support and `BpkNavigationBar` now has sticky support

**Added:**
  - bpk-component-calendar: 6.2.8 => 6.3.0
  - Added the ability to use coloured calendar. Added a new `cellType` prop to allow default colour styling to the dates.
    - Added new `style` prop to custom styles of default `BpkCalendarDate` component.

  - bpk-component-navigation-bar: 2.1.36 => 2.2.0
    - Added `sticky` prop to `BpkNavigationBar` so it stays at the top when scrolling up.

# 2020-03-18

**Fixed:**

  - bpk-component-icon: 5.0.38 => 5.0.39
  - bpk-svgs: 8.2.30 => 8.2.31
  - bpk-mixins: 19.1.6 => 19.1.7
    - Reduced the size of the new hotel icon to align it to other icons.

# 2020-03-18

**Fixed:**

  - bpk-component-badge: 2.0.27 => 2.0.38
    - The `success` badge has been lightened to provide better contrast, and align to our mobile implementations.

  - bpk-component-icon: 5.0.37 => 5.0.38
  - bpk-svgs: 8.2.29 => 8.2.30
  - bpk-mixins: 19.1.5 => 19.1.6
    - Updated `hotel` icon.

# 2020-02-25 - Supporting building schema markup in Breadcrumbs

**Added:**

- bpk-component-breadcrumb: 2.0.35 => 2.1.0
  - Added support for building schema markup to the component

# 2020-02-12 - Added flow to RN tokens.

**Breaking:**

 - bpk-tokens: 31.0.2 => 32.0.0
   - Added flow typing to RN tokens.
   - Removed wrong `secondaryColor` and `secondaryDarkColor` from RN tokens.

# 2020-02-11 - Removed Relative font rendering by default.

**Breaking:**
  - bpk-stylesheets: 5.0.1 => 6.0.0
    - Removed Relative font rendering by default for consumer lightweight use.

# 2020-02-03 - New web type scale updates.

**Breaking:**
  - bpk-tokens: 30.1.3 => 31.0.0
    - Changed type scale values to align to native platforms.
      - `SM` --> `XS`
      - `LG` --> `XL`
      - `XL` --> `XXL`
    - Added new font sizes `$bpk-font-size-xxxl`, `$bpk-font-size-xxxxl`, `$bpk-font-size-xxxxl`
    - Added new line height sizes `$bpk-line-height-xxxl`, `$bpk-line-height-size-xxxxl`, `$bpk-line-height-size-xxxxl`

  - bpk-stylesheets: 4.1.11 => 5.0.0
    - Default line height is now set to `1.3rem` which is the baseline height of the Relative font family.

  - bpk-component-text: 2.0.31 => 3.0.0
    -  Text sizes will now be different according to the token changes, which will require usage updates
      - `SM` --> `XS`
      - `LG` --> `XL`
      - `XL` --> `XXL`

**Added:**
  - bpk-mixins: 19.0.30 => 19.1.0
    - Added new text mixins to support new font sizes

  - bpk-component-text: 2.0.31 => 3.0.0
    - Added support for new larger font sizes.

# 2020-01-21 - Add new week day format option to calendar

**Added:**
  - bpk-component-calendar: 6.1.13 => 6.2.0
    - Added support for `weekDayKey` in order to have different formats of week days.

# 2020-01-21 - New iOS elevation tokens

**Added:**

 - bpk-tokens: 30.0.0 => 30.1.0
   - Added new elevation tokens for iOS and React Native iOS


# 2020-01-21 - Renamed elevation tokens for Android

**Breaking:**

 - bpk-tokens: 29.6.1 => 30.0.0
   - renamed android elevation tokens


# 2020-01-20 - New dark mode colour palette

**Fixed:**

 - bpk-tokens: 29.6.0 => 29.6.1
   - `blackTint03` has been renamed `blackTint05`.
   - `blackTint04`, `blackTint05` and `blackTint06` have been added.
   - `lineColor` now uses `blackTint04` in dark mode.
   - `textSecondary` now uses `blackTint06` in dark mode.
   - `backgroundElevation01`, `backgroundElevation02` and `backgroundElevation03` values have been added for Android only.


# 2020-01-17 - New dynamic background tokens for iOS and Android

**Added:**

 - bpk-tokens: 29.5.2 => 29.6.0
   - Added alternative background primary and secondary colours for iOS and Android.


# 2020-01-17 - New flow typing and IE11 fixes

**Added:**
- bpk-react-utils: 2.8.4 => 2.9.0
  - Added Flow types to `withDefaultProps` and `cssModules`.

**Fixed:**
- bpk-stylesheets: 4.1.3 => 4.1.4
  - Fixed `bpk-stylesheets/base` to work with all supported browsers.
- bpk-component-input: 5.0.23 => 5.0.24
  - Fixed tab for clearable input.

# 2020-01-10 - Fix for datepicker `isOpen` prop

**Fixed:**
  - bpk-component-datepicker: 11.1.0 => 11.1.1
    - Fixed popover with isOpen overridden from datepicker's props.


# 2020-01-09 - Carousel swipe functionality and datepicker prop

**Added:**
  - bpk-component-carousel: 0.1.0 => 0.2.0
    - Added swipe support. Users of touchscreens can now swipe the carousel to scroll it.
  - bpk-component-datepicker: 11.0.5 => 11.1.0
    - New `isOpen` prop for controlling whether the date picker should be open on its first render.

# 2019-12-18 - Fixed width in `BpkAutoSuggest` component

- bpk-component-autosuggest: 4.0.23 => 4.0.24
  - Fixed an issue where a `BpkAutosuggest` paired to a wide input field did not fill the width of its container.


# 2019-12-10 - Updated nudger to import only the necessary button types.

**Added**:

- bpk-component-button
  - Top level export for theme attributes. e.g `import themeAttributes from 'bpk-component-button/themeAttributes`.

**Fixed**:

- bpk-component-nudger: 20.0.37 => 2.0.38
  - Import only the required theme attributes and buttons from bpk-component-button. This reduces the amount of unused CSS and JS.


# 2019-12-06 - Removed `borderRadius` button theming attribute and updated `textEmphasizedFontWeight`

**Fixed:**
  - bpk-component-button: 3.1.11 => 3.1.12
  - bpk-component-theme-toggle: 2.0.23 => 2.0.24
  - bpk-mixins: 19.0.20 => 19.0.21
    - Removed `borderRadius` theming attribute from `BpkButton`.

  - bpk-tokens: 29.5.0 => 29.5.1
    - Changed `textEmphasizedFontWeight` from `600` to `700`.

# 2019-12-04 - Added Skyscanner Relative to Backpack

**Added:**
  - bpk-tokens: 29.4.0 => 29.5.0
  - bpk-stylesheets: 4.0.18 => 4.1.0
    - Added 'Skyscanner Relative' to the base font family.

# 2019-11-29 - Fixes for infinite scroll and autosuggest

**Fixed:**

- bpk-component-autosuggest: 4.0.19 => 4.0.20
  - Expand suggestions to fit content when the content is wider than the input field.
- bpk-component-accordion: 2.1.17 => 2.1.18
  - Added missing prop to README
- bpk-component-infinite-scroll: 3.0.18 => 3.0.19
  - avoid redundant call to work out if data-source is exhausted

# 2019-11-27 - New **BETA** `BpkCarousel` component

**Added**:

  - bpk-component-carousel: 0.1.0
    - Added new Carousel component.

# 2019-11-21 - New `dismissible` prop for `BpkChip`

**Added:**

 - bpk-component-chip: 3.0.18 => 3.1.0
   - New `dismissible` prop that hides the close button when `false`.


# 2019-11-19 - Added new `calendarComponent` prop to datepicker

**Added:**

- bpk-component-calendar: 6.0.18 => 6.1.0
  - Added export for `BpkCalendarGridWithTransition`

**Breaking:**

- bpk-component-datepicker: 10.0.20 => 11.0.0
  - Removed invalid `DateComponent` prop.
  - Added new `calendarComponent` prop

# 2019-11-18 - Added dynamic line colour

**Fixed:**

 - bpk-mixins: 19.0.17 => 19.0.18
   - Upgraded `node-sass` to `4.12.0`

**Added:**

 - bpk-tokens: 29.3.0 => 29.4.0
   - Added `lineColor` dynamic color for iOS and Android


# 2019-11-06 -

**Added:**

 - bpk-component-phone-input: 4.0.17 => 4.1.0
   - New `dialingCodeMask` prop, which will mean that the dialing code is displayed in the phone number text input.


# 2019-11-05 - Fixed missing documented prop

**Fixed:**

 - bpk-component-datepicker: 10.0.18 => 10.0.19
   - Fixed missing documented prop `DateComponent`.


# 2019-11-04 - Add RN semantic tokens

**Added:**

- bpk-tokens: 29.2.6 => 29.3.0
  - Added new semantic tokens for RN.

# 2019-10-29 - Upgrade dependencies

**Fixed:**

 - bpk-component-slider: 2.0.13 => 2.0.14
   - Bumped `react-slider` dependency to latest version.


# 2019-10-23 - Expose more underlying library props

**Added:**

 - bpk-component-map: 3.0.10 => 3.1.0
   - New `onTilesLoaded` prop to access callback function from underlying library.


# 2019-10-23 -

**Added:**

 - bpk-tokens: 29.1.1 => 29.2.0
   - Added background color variants for iOS.


# 2019-10-22 - Add individual exports for buttons

**Added:**

  - bpk-component-button
    - Added sub-components for each button type to reduce the amount of unused CSS and JS included.
    - Buttons can be used in the same way, or the sub-components can be imported directly, e.g. `import BpkButtonFeatured from 'bpk-component-button/BpkButtonFeatured';`

# 2019-10-22

**Fixed:**

 - bpk-tokens: 29.1.0 => 29.1.1
   - Fixed an issue that caused the dynamic tokens to be exported incorrectly.


# 2019-10-21

**Added:**

 - bpk-tokens: 29.0.4 => 29.1.0
   - New background and text color tokens for iOS and Android.


# 2019-10-21

**Fixed:**

 - bpk-svgs: 8.2.1 => 8.2.2
   - Updated the 3 verticals icons (`cars`, `flight`, `hotels`).


# 2019-10-16 - Horizontal nav scroll improvements

**Fixed:**

 - bpk-component-horizontal-nav: 3.0.4 => 3.0.5
   - When a new item is selected, it will now be scrolled into view if `autoScrollToSelected` is true.


# 2019-10-14 - Accessibility improvements to the Accordion

**Fixed:**

 - bpk-component-accordion: 2.1.0 => 2.1.1
   - Fixed a11y errors for `BpkAccordionItem` component.


# 2019-10-11 - Added accessory view options to Modal

**Added:**

 - bpk-component-accordion: 2.0.4 => 2.1.0
   - Added Support for setting `tagName` to `BpkAccordionItem`

 - bpk-component-modal: 2.0.4 => 2.1.0
   - Added new prop `accessoryView` to allow support for left hand side interaction.

 - bpk-component-navigation-bar: 2.0.4 => 2.1.0
   - Modified `BpkNavigationBarButtonLink` to accept and render children.


# 2019-10-10 - Add new icons

**Added:**

 - bpk-svgs: 8.1.0 => 8.2.0
   - Added `document-csv`, `document-pdf`, and `print` icons


# 2019-10-08 - Added new 'rounding' prop to BpkStarRating

**Added:**

 - bpk-component-star-rating: 2.0.3 => 2.1.0
   - Added `rounding` prop to control rounding behaviour.


# 2019-10-03 - Add wallet icon

**Added:**

 - bpk-svgs: 8.0.2 => 8.1.0
   - Added new `wallet` icon.


# 2019-10-01

**Added:**
  - bpk-component-flare: 1.0.0
    - New `BpkFlareBar` and `BpkContentBubble` components.

# 2019-09-30 - Removed the old brand

**Breaking:**

 - bpk-animate-height: 1.2.2 => 2.0.0
   - Removed the old brand

 - bpk-component-accordion: 1.3.2 => 2.0.0
   - Removed the old brand

 - bpk-component-autosuggest: 3.1.2 => 4.0.0
   - Removed the old brand

 - bpk-component-badge: 1.3.2 => 2.0.0
   - Removed the old brand

 - bpk-component-banner-alert: 2.3.2 => 3.0.0
   - Removed the old brand

 - bpk-component-barchart: 2.5.2 => 3.0.0
   - Removed the old brand

 - bpk-component-blockquote: 1.2.2 => 2.0.0
   - Removed the old brand

 - bpk-component-breadcrumb: 1.1.2 => 2.0.0
   - Removed the old brand

 - bpk-component-breakpoint: 1.2.2 => 2.0.0
   - Removed the old brand

 - bpk-component-button: 2.6.2 => 3.0.0
   - Removed the old brand

 - bpk-component-calendar: 5.1.2 => 6.0.0
   - Removed the old brand

 - bpk-component-card: 1.2.2 => 2.0.0
   - Removed the old brand

 - bpk-component-checkbox: 1.6.2 => 2.0.0
   - Removed the old brand

 - bpk-component-chip: 2.1.2 => 3.0.0
   - Removed the old brand

 - bpk-component-close-button: 1.1.2 => 2.0.0
   - Removed the old brand

 - bpk-component-code: 1.2.2 => 2.0.0
   - Removed the old brand

 - bpk-component-content-container: 1.4.2 => 2.0.0
   - Removed the old brand

 - bpk-component-datatable: 0.2.2 => 1.0.0
   - Removed the old brand

 - bpk-component-datepicker: 9.1.2 => 10.0.0
   - Removed the old brand

 - bpk-component-description-list: 1.1.2 => 2.0.0
   - Removed the old brand

 - bpk-component-dialog: 1.2.2 => 2.0.0
   - Removed the old brand

 - bpk-component-drawer: 1.3.2 => 2.0.0
   - Removed the old brand

 - bpk-component-fieldset: 1.3.2 => 2.0.0
   - Removed the old brand

 - bpk-component-form-validation: 2.2.2 => 3.0.0
   - Removed the old brand

 - bpk-component-grid-toggle: 1.2.2 => 2.0.0
   - Removed the old brand

 - bpk-component-grid: 1.2.2 => 2.0.0
   - Removed the old brand

 - bpk-component-heading: 2.2.2 => 3.0.0
   - Removed the old brand

 - bpk-component-horizontal-nav: 2.5.2 => 3.0.0
   - Removed the old brand

 - bpk-component-icon: 4.2.2 => 5.0.0
   - Removed the old brand

 - bpk-component-image: 2.4.2 => 3.0.0
   - Removed the old brand

 - bpk-component-infinite-scroll: 2.3.2 => 3.0.0
   - Removed the old brand

 - bpk-component-input: 4.3.2 => 5.0.0
   - Removed the old brand

 - bpk-component-label: 3.4.2 => 4.0.0
   - Removed the old brand

 - bpk-component-link: 1.3.2 => 2.0.0
   - Removed the old brand

 - bpk-component-list: 1.2.2 => 2.0.0
   - Removed the old brand

 - bpk-component-loading-button: 2.1.2 => 3.0.0
   - Removed the old brand

 - bpk-component-map: 2.6.2 => 3.0.0
   - Removed the old brand

 - bpk-component-mobile-scroll-container: 1.2.2 => 2.0.0
   - Removed the old brand

 - bpk-component-modal: 1.9.2 => 2.0.0
   - Removed the old brand

 - bpk-component-navigation-bar: 1.3.2 => 2.0.0
   - Removed the old brand

 - bpk-component-navigation-stack: 1.1.2 => 2.0.0
   - Removed the old brand

 - bpk-component-nudger: 1.3.2 => 2.0.0
   - Removed the old brand

 - bpk-component-pagination: 1.1.2 => 2.0.0
   - Removed the old brand

 - bpk-component-panel: 1.1.2 => 2.0.0
   - Removed the old brand

 - bpk-component-paragraph: 1.1.2 => 2.0.0
   - Removed the old brand

 - bpk-component-phone-input: 3.2.2 => 4.0.0
   - Removed the old brand

 - bpk-component-popover: 2.3.2 => 3.0.0
   - Removed the old brand

 - bpk-component-progress: 1.1.2 => 2.0.0
   - Removed the old brand

 - bpk-component-radio: 1.5.2 => 2.0.0
   - Removed the old brand

 - bpk-component-rating: 1.4.2 => 2.0.0
   - Removed the old brand

 - bpk-component-router-link: 2.1.2 => 3.0.0
   - Removed the old brand

 - bpk-component-rtl-toggle: 1.2.2 => 2.0.0
   - Removed the old brand

 - bpk-component-scrollable-calendar: 1.1.2 => 2.0.0
   - Removed the old brand

 - bpk-component-section-list: 1.1.2 => 2.0.0
   - Removed the old brand

 - bpk-component-select: 2.5.2 => 3.0.0
   - Removed the old brand

 - bpk-component-slider: 1.2.2 => 2.0.0
   - Removed the old brand

 - bpk-component-spinner: 2.3.2 => 3.0.0
   - Removed the old brand

 - bpk-component-star-rating: 1.2.2 => 2.0.0
   - Removed the old brand

 - bpk-component-table: 1.2.2 => 2.0.0
   - Removed the old brand

 - bpk-component-text: 1.2.2 => 2.0.0
   - Removed the old brand

 - bpk-component-textarea: 1.3.2 => 2.0.0
   - Removed the old brand

 - bpk-component-theme-toggle: 1.3.2 => 2.0.0
   - Removed the old brand

 - bpk-component-ticket: 2.1.2 => 3.0.0
   - Removed the old brand

 - bpk-component-tooltip: 3.2.2 => 4.0.0
   - Removed the old brand

 - bpk-mixins: 18.2.2 => 19.0.0
   - Removed the old brand

 - bpk-scrim-utils: 3.3.2 => 4.0.0
   - Removed the old brand

 - bpk-stylesheets: 3.4.2 => 4.0.0
   - Removed the old brand

 - bpk-svgs: 7.3.2 => 8.0.0
   - Removed the old brand

 - bpk-theming: 1.3.2 => 2.0.0
   - Removed the old brand

 - bpk-tokens: 28.0.1 => 29.0.0
   - Removed the old brand


# 2019-09-27 - Fixed pagination issue

**Fixed:**

 - bpk-component-pagination: 1.1.1 => 1.1.2
   - Fixed issue where pagination buttons were not circular


# 2019-09-26 - Fixed spelling of colour token

**Breaking:**

 - bpk-tokens: 27.12.0 => 28.0.0
   - Renamed `segano` to `sagano`.


# 2019-09-26 - New brand colours

**Added:**

 - bpk-animate-height: 1.1.136 => 1.2.0
   - Added new brand colours

 - bpk-component-accordion: 1.2.125 => 1.3.0
   - Added new brand colours

 - bpk-component-autosuggest: 3.0.194 => 3.1.0
   - Added new brand colours

 - bpk-component-badge: 1.2.6 => 1.3.0
   - Added new brand colours

 - bpk-component-banner-alert: 2.2.6 => 2.3.0
   - Added new brand colours

 - bpk-component-barchart: 2.4.28 => 2.5.0
   - Added new brand colours

 - bpk-component-blockquote: 1.1.155 => 1.2.0
   - Added new brand colours

 - bpk-component-breadcrumb: 1.0.105 => 1.1.0
   - Added new brand colours

 - bpk-component-breakpoint: 1.1.97 => 1.2.0
   - Added new brand colours

 - bpk-component-button: 2.5.15 => 2.6.0
   - Added new brand colours

 - bpk-component-calendar: 5.0.50 => 5.1.0
   - Added new brand colours

 - bpk-component-card: 1.1.112 => 1.2.0
   - Added new brand colours

 - bpk-component-checkbox: 1.5.8 => 1.6.0
   - Added new brand colours

 - bpk-component-chip: 2.0.117 => 2.1.0
   - Added new brand colours

 - bpk-component-close-button: 1.0.164 => 1.1.0
   - Added new brand colours

 - bpk-component-code: 1.1.102 => 1.2.0
   - Added new brand colours

 - bpk-component-content-container: 1.3.103 => 1.4.0
   - Added new brand colours

 - bpk-component-datatable: 0.1.118 => 0.2.0
   - Added new brand colours

 - bpk-component-datepicker: 9.0.53 => 9.1.0
   - Added new brand colours

 - bpk-component-description-list: 1.0.124 => 1.1.0
   - Added new brand colours

 - bpk-component-dialog: 1.1.97 => 1.2.0
   - Added new brand colours

 - bpk-component-drawer: 1.2.124 => 1.3.0
   - Added new brand colours

 - bpk-component-fieldset: 1.2.6 => 1.3.0
   - Added new brand colours

 - bpk-component-form-validation: 2.1.6 => 2.2.0
   - Added new brand colours

 - bpk-component-grid-toggle: 1.1.117 => 1.2.0
   - Added new brand colours

 - bpk-component-grid: 1.1.168 => 1.2.0
   - Added new brand colours

 - bpk-component-heading: 2.1.168 => 2.2.0
   - Added new brand colours

 - bpk-component-horizontal-nav: 2.4.57 => 2.5.0
   - Added new brand colours

 - bpk-component-icon: 4.1.7 => 4.2.0
   - Added new brand colours

 - bpk-component-image: 2.3.19 => 2.4.0
   - Added new brand colours

 - bpk-component-infinite-scroll: 2.2.65 => 2.3.0
   - Added new brand colours

 - bpk-component-input: 4.2.6 => 4.3.0
   - Added new brand colours

 - bpk-component-label: 3.3.3 => 3.4.0
   - Added new brand colours

 - bpk-component-link: 1.2.98 => 1.3.0
   - Added new brand colours

 - bpk-component-list: 1.1.138 => 1.2.0
   - Added new brand colours

 - bpk-component-loading-button: 2.0.124 => 2.1.0
   - Added new brand colours

 - bpk-component-map: 2.5.43 => 2.6.0
   - Added new brand colours

 - bpk-component-mobile-scroll-container: 1.1.106 => 1.2.0
   - Added new brand colours

 - bpk-component-modal: 1.8.97 => 1.9.0
   - Added new brand colours

 - bpk-component-navigation-bar: 1.2.105 => 1.3.0
   - Added new brand colours

 - bpk-component-navigation-stack: 1.0.110 => 1.1.0
   - Added new brand colours

 - bpk-component-nudger: 1.2.20 => 1.3.0
   - Added new brand colours

 - bpk-component-pagination: 1.0.133 => 1.1.0
   - Added new brand colours

 - bpk-component-panel: 1.0.161 => 1.1.0
   - Added new brand colours

 - bpk-component-paragraph: 1.0.161 => 1.1.0
   - Added new brand colours

 - bpk-component-phone-input: 3.1.38 => 3.2.0
   - Added new brand colours

 - bpk-component-popover: 2.2.73 => 2.3.0
   - Added new brand colours

 - bpk-component-progress: 1.0.169 => 1.1.0
   - Added new brand colours

 - bpk-component-radio: 1.4.8 => 1.5.0
   - Added new brand colours

 - bpk-component-rating: 1.3.3 => 1.4.0
   - Added new brand colours

 - bpk-component-router-link: 2.0.83 => 2.1.0
   - Added new brand colours

 - bpk-component-rtl-toggle: 1.1.117 => 1.2.0
   - Added new brand colours

 - bpk-component-scrollable-calendar: 1.0.50 => 1.1.0
   - Added new brand colours

 - bpk-component-section-list: 1.0.104 => 1.1.0
   - Added new brand colours

 - bpk-component-select: 2.4.6 => 2.5.0
   - Added new brand colours

 - bpk-component-slider: 1.1.131 => 1.2.0
   - Added new brand colours

 - bpk-component-spinner: 2.2.129 => 2.3.0
   - Added new brand colours

 - bpk-component-star-rating: 1.1.10 => 1.2.0
   - Added new brand colours

 - bpk-component-table: 1.1.103 => 1.2.0
   - Added new brand colours

 - bpk-component-text: 1.1.29 => 1.2.0
   - Added new brand colours

 - bpk-component-textarea: 1.2.6 => 1.3.0
   - Added new brand colours

 - bpk-component-theme-toggle: 1.2.6 => 1.3.0
   - Added new brand colours

 - bpk-component-ticket: 2.0.22 => 2.1.0
   - Added new brand colours

 - bpk-component-tooltip: 3.1.116 => 3.2.0
   - Added new brand colours

 - bpk-mixins: 18.1.6 => 18.2.0
   - Added new brand colours

 - bpk-scrim-utils: 3.2.98 => 3.3.0
   - Added new brand colours

 - bpk-stylesheets: 3.3.17 => 3.4.0
   - Added new brand colours

 - bpk-svgs: 7.2.4 => 7.3.0
   - Added new brand colours

 - bpk-theming: 1.2.23 => 1.3.0
   - Added new brand colours

 - bpk-tokens: 27.11.0 => 27.12.0
   - Added new brand colours
   - Deprecated all the old brand colours


# 2019-09-24 - New brand colours

**Added:**

 - bpk-tokens: 27.10.1 => 27.11.0
   - NEW BRAND COLOURS ADDED 🎉


# 2019-09-19 - Border Radius XS value uses `4px`

**Fixed:**

 - bpk-tokens: 27.10.0 => 27.10.1
   - `$bpk-border-radius-xs` value now `4px` to be consistent across platforms.


# 2019-09-18 - Fix blurred popovers and include button border radii in mixins

**Fixed:**

 - bpk-component-button: 2.5.12 => 2.5.13
 - bpk-mixins: 18.1.3 => 18.1.4
   - Moved `icon-only` border radius `scss` to mixins to always apply when using mixins directly.

 - bpk-component-popover: 2.2.70 => 2.2.71
 - bpk-component-tooltip: 3.1.113 => 3.1.114
   - Fixed issue that sometimes causes blurry rendering in Safari and Chrome.


# 2019-09-13 - BpkRating title-only support

**Added:**

 - bpk-component-rating: 1.2.1 => 1.3.0
   - Made `subtitle` prop optional to support title-only variant of rating component.


# 2019-09-13 - Fixed BpkRating vertical spacing

**Fixed:**

 - bpk-component-rating: 1.2.0 => 1.2.1
   - Fixed spacing issue with vertical variant.


# 2019-09-13 - BpkRating vertical layout support

**Added:**

 - bpk-component-rating: 1.1.3 => 1.2.0
   - Added new `vertical` prop to allow support for vertical orientation.


# 2019-09-11 - Fixed scroll container bug in RTL

**Added:**

 - bpk-component-label: 3.2.163 => 3.3.0
   - New `valid` prop to help render the label for an invalid field.

**Fixed:**

 - bpk-component-mobile-scroll-container: 1.1.102 => 1.1.103
   - Fixed an issue that caused the left/right indicators to be shown incorrectly in RTL.

**Added:**

 - bpk-react-utils: 2.7.10 => 2.8.0
   - Added a new `isRTL` helper method.


# 2019-09-10 - Deprecated gray theming mixins and removed gray theming from components

**Fixed:**

 - bpk-mixins: 18.1.1 => 18.1.2
   - Deprecated gray theming mixins due to gray colours being fixed.
   - Components that utilised the gray theming mixins will now directly use the gray colours.


# 2019-09-09 - Fix for missing export

**Fixed:**

 - bpk-component-rating: 1.1.0 => 1.1.1
   - Fixed issue where `RATING_SIZES` was not being exported.


# 2019-09-09 - New `size` prop to support `large` and `small` rating components

**Added:**

 - bpk-component-rating: 1.0.10 => 1.1.0
   - Added new `size` prop to support multiple rating component sizes.

 - bpk-tokens: 27.9.5 => 27.10.0
   - Added new tokens for `BpkRating` component


# 2019-09-04 - Theming support for `BpkBadge`, `BpkBannerAlert` and form fields.

**Added:**
  - bpk-component-badge: 1.1.106 => 1.2.0
    - Added new theming props `badgeBackgroundColor`, `badgeSuccessBackgroundColor`, `badgeDestructiveBackgroundColor` to support theming.
  - bpk-component-banner-alert: 2.1.24 => 2.2.0
    - Added new theming props `bannerAlertSuccessColor`, `bannerAlertWarnColor`, `bannerAlertErrorColor` to support theming.
  - bpk-component-fieldset: 1.1.130 => 1.2.0
  - bpk-component-form-validation: 2.0.43 => 2.1.0
  - bpk-component-input: 4.1.43 => 4.2.0
  - bpk-component-select: 2.3.23 => 2.4.0
  - bpk-component-textarea: 1.1.37 => 1.2.0
  - bpk-component-theme-toggle: 1.1.9 => 1.2.0
  - bpk-mixins: 18.0.11 => 18.1.0
    - Added theming support for invalid state for inputs

# 2019-09-03 - New icon

**Added:**
 - bpk-svgs:
   - Added `single-booking` icon.

# 2019-09-03 - Invalid states for more input types

**Added:**
 - bpk-svgs:
   - Adding `radio-invalid.svg` for a red outline radio button.
   - Adding `checkbox-invalid.svg` for a red outline checkbox.

 - bpk-mixins:
   - Updating invalid mixins for input, select and textarea input mixins to have white background.
   - Adding `bpk-checkbox--invalid` and `bpk-radio--invalid` to use their respective invalid SVGs

 - bpk-component-checkbox:
   - Added valid property to support invalid state of checkboxes.

 - bpk-component-fieldset:
   - Adding styling to the form label when invalid.

 - bpk-component-radio:
   - Added valid property to support invalid state of radio buttons.

# 2019-09-03 - `BpkPagination` buttons are always circular

**Fixed:**
- bpk-component-pagination: 1.0.123 => 1.0.124
  - Pagination buttons are now always circular regardless of theming.

# 2019-08-29 - Theming support for `BpkStarRating` component.

**Added:**
  - bpk-component-star-rating: 1.0.152 => 1.1.0
    - Added new theming prop `starRatingFilledColor` to allow the star colour to be changed.

# 2019-08-27 - Remove unreleased deprecated tokens

**Fixed:**
- bpk-tokens: 27.9.2 => 27.9.3
  - Removed unreleased deprecated tokens

# 2019-08-26 - Fix token changes

**Fixed:**
- bpk-tokens: 27.9.0 => 27.9.2
  - Correct name for semantic text color names, previously published names have been deprecated.

# 2019-08-23 - Text token changes

**Added:**

- bpk-tokens: 27.8.0 => 27.9.0
  - Added new tokens for text primary and secondary color in light mode UIs.
  - Added new token for font weight black (equivalent to 900).

# 2019-08-23 - Enable font-size theming in button

**Added:**

 - bpk-component-button: 2.4.9 => 2.5.0
   - New optional `buttonFontSize` theme attribute.


# 2019-08-19 - Rating component added.

**Added:**
  - bpk-component-rating: 1.0.0
    - Introducing the rating component.
  - bpk-tokens: 27.7.0 => 27.8.0
    - Tokens for supporting rating component.
  - bpk-component-theme-toggle: 1.0.123 => 1.1.0
    - Theme attributes to support rating component.

# 2019-08-16 - Updated `gray` colours

**Changed**:
  - bpk-stylesheets: 3.2.188 => 3.3.0
    - Updated `color` on `body` to reflect the updated gray color.
  - bpk-svgs: 7.0.0 => 7.1.0
    - Updated `svg borders` to utilise updated gray color.
  - bpk-tokens: 27.6.6 => 27.7.0
    - Updated gray colours `gray50`, `gray100`, `gray200`, `gray300`, `gray400`, `gray500`, `gray700`, `gray900`
    - Deprecated `gray600` and `gray800` please update as these will be removed in the future.
      - For these tokens please use either one token above or below your current value to suit your needs.

# 2019-08-12 - Added vertical swap icon

**Breaking:**

 - bpk-component-icon: 3.31.8 => 4.0.0
 - bpk-mixins: 17.24.8 => 18.0.0
 - bpk-svgs: 6.9.6 => 7.0.0
   - `swap` icon renamed `swap--horizontal`.
   - New `swap--vertical` icon.


# 2019-08-08 - New `borderRadiusStyle` prop for `BpkImage`

**Added:**

 - bpk-component-image: 2.2.12 => 2.3.0
   - New `borderRadiusStyle` prop for adding rounded corners to images.


# 2019-08-07 - Input bug fix

**Fixed:**

 - bpk-component-input: 4.1.30 => 4.1.31
   - Fixed clear button in `whileEditing` so that it cannot be clicked when not visible.


# 2019-08-06 - Updated form element border colours

**Fixed:**
  - bpk-tokens: 27.6.5 => 27.6.6
    - Changed `$bpk-input-border` and `$bpk-select-border` to use `gray300` from `gray100`
  - bpk-svgs: 6.9.5 => 6.9.6
    - Changed border colours of `radio` and `checkbox` `svgs` to use `gray300` from `gray100`

# 2019-07-30 - New flexible nudger variant

**Added:**

 - bpk-component-nudger: 1.1.3 => 1.2.0
   - Added `BpkConfigurableNudger`, which is more flexible than the existing `BpkNudger` and works with any data.


# 2019-07-26 - Update ticket line appearance

**Breaking:**

 - bpk-component-ticket: 1.2.73 => 2.0.0
   - The dashed line has been replaced with a solid line of the same colour and weight. This is a visually breaking change only.


# 2019-07-25 - Fix button when disabled and href supplied.

**Fixed:**
  - bpk-component-button: 2.4.2 => 2.4.3
    - Fixed issue where `BpkButton` would ignore disabled prop when href prop is provided.

# 2019-07-24 - Ability to change nudger button type.

**Added:**
 - bpk-component-nudger: 1.0.145 => 1.1.0
    - New `buttonType` prop for changing the button type used in the nudger.

# 2019-07-23 - New trips icon

**Fixed:**

 - bpk-svgs: 6.9.1 => 6.9.2
   - Replaced the `trips` icon.


# 2019-07-23 - New outline button type

**Added:**

 - bpk-component-button: 2.3.15 => 2.4.0
   - New `outline` prop for creating outline buttons. See https://backpack.github.io/components/button?platform=web#outline


# 2019-07-12 - New `flight-landing`, `flight-takeoff` and `aircraft` icons.

**Added:**

 - bpk-svgs: 6.8.1 => 6.9.0
   - New `flight-landing`, `flight-takeoff` and `aircraft` icons.


# 2019-07-10 - New `yAxisDomain` prop

**Added:**

 - bpk-component-barchart: 2.3.81 => 2.4.0
   - New `yAxisDomain` prop to set a custom y axis domain.


# 2019-07-08 - Fix infinite scroll update with empty lists

**Fixed::**

- bpk-component-infinite-scroll:
  - Updating data to an empty array will now refresh the list

# 2019-07-08 - Fix for phone input clicks not being registered

**Fixed:**

 - bpk-component-phone-input: 3.1.8 => 3.1.9
   - Fixed issue which meant clicking on an image inside a `BpkSelect` would not open the select menu.

 - bpk-component-select: 2.3.3 => 2.3.4
   - Fixed issue which meant clicking on an image inside a `BpkSelect` would not open the select menu.


# 2019-07-02 - `iconOnly` buttons always circular

**Fixed:**

 - bpk-component-button: 2.3.13 => 2.3.14
   - `iconOnly` buttons no longer apply `borderRadius` from theming and are always circular.


2019-06-28 - Bug fix for mobile modal and dialog scrims

**Fixed:**

 - bpk-component-dialog: 1.1.68 => 1.1.69
   - Fixed an issue that caused the scrim to initially be shown at full opacity when initially rendered.

 - bpk-component-modal: 1.8.68 => 1.8.69
   - Fixed an issue that caused the scrim to initially be shown at full opacity when initially rendered.


# 2019-06-25 New icons

**Added:**
- bpk-component-icon:
- bpk-mixins:
- bpk-svgs:
  - New `paid`, `star-outline` icons added.

**Updated:**
- bpk-component-icon:
- bpk-mixins:
- bpk-svgs:
  - Updated `meal`, `bar`, `star`, `star-half` `media` icons.

# 2019-06-19 - Added `ariaLabel` prop to `BpkRadio` component

**Added:**
- bpk-component-radio: 1.2.99 => 1.3.0
  - New `ariaLabel` prop for manually setting the `aria-label`. Defaults to `props.label`.


# 2019-06-18 - Added optional hydration warning suppression to lazy loaded images

**Added:**
- bpk-component-image: 2.1.43 => 2.2.0
  - New prop `suppressHydrationWarning` on `BpkImage` which can be used to suppress hydration warnings for lazy loaded images.

# 2019-06-17 - Added new `tagName` to `BpkText` component

**Changed:**
- bpk-component-text: 1.0.130 => 1.0.131
  - Added new supported tagName option `text` to support text elements.

# 2019-06-13 - `BpkPhoneInput` removed flag only and input code display

**Fixed:**
- bpk-component-phone-input: 3.1.0 => 3.1.1
- bpk-component-select: 2.3.0 => 2.3.1
  - Rollback the changes made for the phone input and removed new props

# 2019-06-11 - `BpkPhoneInput` flag only and input code display

**Changed:**
- bpk-component-phone-input: 3.0.0 => 3.1.0
  - Added new optional props `flagOnly` and `countryCodeMask` to change how the field can be displayed.
- bpk-component-select: 2.2.71 => 2.3.0
  - Updated the component to add new optional prop `imageOnly` to allow only images to be displayed in the select field.

# 2019-06-10 - Fixed `BpkPhoneInput` to allow field to dynamically resize.

**Changed:**
- bpk-component-phone-input: 2.0.24 => 3.0.0
  - Updated the component to resize based on select input.

# 2019-06-06 Allow any `BpkIcon` to be shown in banner alerts, and fix for infinite-scroll

**Fixed:**

- bpk-component-infinite-scroll:
  - Fixed updating data when array data source is initialised empty.

**Added:**

- bpk-component-banner-alert:
  - New `icon` prop for showing a custom banner icon.

# 2019-06-05 Fixed stroke width of icons

**Added**
- bpk-component-icon: 3.30.3 => 3.30.4
- bpk-mixins: 17.23.3 => 17.23.4
- bpk-svgs: 6.7.3 => 6.7.4
  - Fixed stroke width of `heart`, `heart--outline`, `world--emea`, `world--apac` and `world--amer`.

# 2019-06-05 New smiley face icons

**Added**
- bpk-component-icon: 3.30.2 => 3.30.3
- bpk-mixins: 17.23.2 => 17.23.3
- bpk-svgs: 6.7.2 => 6.7.3
  - Added new smiley icons `face--blank`, `face--happy`, `face--sad`.

# 2019-06-04 Fix thickness of heart outline icon

**Fixed:**
- bpk-component-icon: 3.30.1 => 3.30.2
- bpk-mixins: 17.23.1 => 17.23.2
- bpk-svgs: 6.7.1 => 6.7.2
  - Fixed border of `heart--outline` icon.

# 2019-06-03 Changed date-picker input to be `readOnly`

**Fixed:**

- bpk-component-datepicker: 9.0.9 => 9.0.10
  - Add `readOnly` to input field by default.

# 2019-05-31 Added trend icons

**Added:**

- bpk-component-icon: 3.29.1 => 3.30.0
- bpk-svgs: 6.6.1 => 6.7.0
- bpk-mixins: 17.22.1 => 17.23.0
  - Added `trend--steady`, `trend--down` and `trend--will-rise` icons

# 2019-05-30 Radio button improvements for screen readers

**Fixed:**

- bpk-component-radio:
  - Fixed an issue that caused screen readers to select and read the label twice.

# 2019-05-29 Checkbox improvements for screen readers

**Fixed:**

- bpk-component-checkbox: 1.4.93 => 1.4.94
  - Fixed issue that caused screen-readers to read and select checkbox labels twice.

# 2019-05-28 Reverted code-splitting changes across components

**Fixed:**
  - bpk-animate-height: 1.1.98 => 1.1.99
  - bpk-component-accordion: 1.2.85 => 1.2.86
  - bpk-component-autosuggest: 3.0.153 => 3.0.154
  - bpk-component-badge: 1.1.76 => 1.1.77
  - bpk-component-banner-alert: 2.0.89 => 2.0.90
  - bpk-component-barchart: 2.3.67 => 2.3.68
  - bpk-component-blockquote: 1.1.119 => 1.1.120
  - bpk-component-boilerplate: 0.0.19 => 0.0.20 (private)
  - bpk-component-breadcrumb: 1.0.66 => 1.0.67
  - bpk-component-breakpoint: 1.1.61 => 1.1.62
  - bpk-component-button: 2.3.3 => 2.3.4
  - bpk-component-calendar: 5.0.6 => 5.0.7
  - bpk-component-card: 1.1.76 => 1.1.77
  - bpk-component-checkbox: 1.4.92 => 1.4.93
  - bpk-component-chip: 2.0.81 => 2.0.82
  - bpk-component-close-button: 1.0.128 => 1.0.129
  - bpk-component-code: 1.1.66 => 1.1.67
  - bpk-component-content-container: 1.3.67 => 1.3.68
  - bpk-component-datatable: 0.1.82 => 0.1.83
  - bpk-component-datepicker: 9.0.7 => 9.0.8
  - bpk-component-description-list: 1.0.88 => 1.0.89
  - bpk-component-dialog: 1.1.55 => 1.1.56
  - bpk-component-drawer: 1.2.82 => 1.2.83
  - bpk-component-fieldset: 1.1.90 => 1.1.91
  - bpk-component-form-validation: 2.0.12 => 2.0.13
  - bpk-component-grid-toggle: 1.1.81 => 1.1.82
  - bpk-component-grid: 1.1.132 => 1.1.133
  - bpk-component-heading: 2.1.132 => 2.1.133
  - bpk-component-horizontal-nav: 2.4.18 => 2.4.19
  - bpk-component-icon: 3.29.0 => 3.29.1
  - bpk-component-image: 2.1.34 => 2.1.35
  - bpk-component-infinite-scroll: 2.2.26 => 2.2.27
  - bpk-component-input: 4.1.10 => 4.1.11
  - bpk-component-label: 3.2.131 => 3.2.132
  - bpk-component-link: 1.2.62 => 1.2.63
  - bpk-component-list: 1.1.102 => 1.1.103
  - bpk-component-loading-button: 2.0.86 => 2.0.87
  - bpk-component-map: 2.5.4 => 2.5.5
  - bpk-component-mobile-scroll-container: 1.1.67 => 1.1.68
  - bpk-component-modal: 1.8.55 => 1.8.56
  - bpk-component-navigation-bar: 1.2.66 => 1.2.67
  - bpk-component-navigation-stack: 1.0.69 => 1.0.70
  - bpk-component-nudger: 1.0.131 => 1.0.132
  - bpk-component-pagination: 1.0.95 => 1.0.96
  - bpk-component-panel: 1.0.125 => 1.0.126
  - bpk-component-paragraph: 1.0.125 => 1.0.126
  - bpk-component-phone-input: 2.0.16 => 2.0.17
  - bpk-component-popover: 2.2.32 => 2.2.33
  - bpk-component-progress: 1.0.131 => 1.0.132
  - bpk-component-radio: 1.2.90 => 1.2.91
  - bpk-component-router-link: 2.0.47 => 2.0.48
  - bpk-component-rtl-toggle: 1.1.81 => 1.1.82
  - bpk-component-scrollable-calendar: 1.0.6 => 1.0.7
  - bpk-component-section-list: 1.0.65 => 1.0.66
  - bpk-component-select: 2.2.63 => 2.2.64
  - bpk-component-slider: 1.1.94 => 1.1.95
  - bpk-component-spinner: 2.2.93 => 2.2.94
  - bpk-component-star-rating: 1.0.127 => 1.0.128
  - bpk-component-table: 1.1.67 => 1.1.68
  - bpk-component-text: 1.0.122 => 1.0.123
  - bpk-component-textarea: 1.1.8 => 1.1.9
  - bpk-component-theme-toggle: 1.0.101 => 1.0.102
  - bpk-component-ticket: 1.2.57 => 1.2.58
  - bpk-component-tile: 0.0.132 => 0.0.133 (private)
  - bpk-component-tooltip: 3.1.77 => 3.1.78
  - bpk-mixins: 17.22.0 => 17.22.1
  - bpk-react-utils: 2.7.7 => 2.7.8
  - bpk-scrim-utils: 3.2.60 => 3.2.61
  - bpk-stylesheets: 3.2.169 => 3.2.170
  - bpk-svgs: 6.6.0 => 6.6.1
  - bpk-theming: 1.2.7 => 1.2.8
  - bpk-tokens: 27.6.1 => 27.6.2
    - Reverted `"sideEffects: false,` changes.

# 2019-05-28 Improved code-splitting across all components plus some new icons (filter, family and word)

**Added:**

- bpk-component-icon: 3.28.1 => 3.29.0
- bpk-mixins: 17.21.0 => 17.22.0
- bpk-svgs: 6.5.1 => 6.6.0
  - Updated `family` icon
  - Added `filter` icon
  - Added `world--amer` icon
  - Added `world--apac` icon
  - Added `world--emea` icon

**Fixed:**

- bpk-animate-height: 1.1.97 => 1.1.98
- bpk-component-accordion: 1.2.84 => 1.2.85
- bpk-component-autosuggest: 3.0.152 => 3.0.153
- bpk-component-badge: 1.1.75 => 1.1.76
- bpk-component-banner-alert: 2.0.88 => 2.0.89
- bpk-component-barchart: 2.3.66 => 2.3.67
- bpk-component-blockquote: 1.1.118 => 1.1.119
- bpk-component-breadcrumb: 1.0.65 => 1.0.66
- bpk-component-breakpoint: 1.1.60 => 1.1.61
- bpk-component-button: 2.3.2 => 2.3.3
- bpk-component-calendar: 5.0.5 => 5.0.6
- bpk-component-card: 1.1.75 => 1.1.76
- bpk-component-checkbox: 1.4.91 => 1.4.92
- bpk-component-chip: 2.0.80 => 2.0.81
- bpk-component-close-button: 1.0.127 => 1.0.128
- bpk-component-code: 1.1.65 => 1.1.66
- bpk-component-content-container: 1.3.66 => 1.3.67
- bpk-component-datatable: 0.1.81 => 0.1.82
- bpk-component-datepicker: 9.0.6 => 9.0.7
- bpk-component-description-list: 1.0.87 => 1.0.88
- bpk-component-dialog: 1.1.54 => 1.1.55
- bpk-component-drawer: 1.2.81 => 1.2.82
- bpk-component-fieldset: 1.1.89 => 1.1.90
- bpk-component-form-validation: 2.0.11 => 2.0.12
- bpk-component-grid-toggle: 1.1.80 => 1.1.81
- bpk-component-grid: 1.1.131 => 1.1.132
- bpk-component-heading: 2.1.131 => 2.1.132
- bpk-component-horizontal-nav: 2.4.17 => 2.4.18
- bpk-component-icon: 3.28.1 => 3.29.0
- bpk-component-image: 2.1.33 => 2.1.34
- bpk-component-input: 4.1.9 => 4.1.10
- bpk-component-label: 3.2.130 => 3.2.131
- bpk-component-link: 1.2.61 => 1.2.62
- bpk-component-list: 1.1.101 => 1.1.102
- bpk-component-loading-button: 2.0.85 => 2.0.86
- bpk-component-map: 2.5.3 => 2.5.4
- bpk-component-mobile-scroll-container: 1.1.66 => 1.1.67
- bpk-component-modal: 1.8.54 => 1.8.55
- bpk-component-navigation-bar: 1.2.65 => 1.2.66
- bpk-component-navigation-stack: 1.0.68 => 1.0.69
- bpk-component-nudger: 1.0.130 => 1.0.131
- bpk-component-pagination: 1.0.94 => 1.0.95
- bpk-component-panel: 1.0.124 => 1.0.125
- bpk-component-paragraph: 1.0.124 => 1.0.125
- bpk-component-phone-input: 2.0.15 => 2.0.16
- bpk-component-popover: 2.2.31 => 2.2.32
- bpk-component-progress: 1.0.130 => 1.0.131
- bpk-component-radio: 1.2.89 => 1.2.90
- bpk-component-router-link: 2.0.46 => 2.0.47
- bpk-component-rtl-toggle: 1.1.80 => 1.1.81
- bpk-component-scrollable-calendar: 1.0.5 => 1.0.6
- bpk-component-section-list: 1.0.64 => 1.0.65
- bpk-component-select: 2.2.62 => 2.2.63
- bpk-component-slider: 1.1.93 => 1.1.94
- bpk-component-spinner: 2.2.92 => 2.2.93
- bpk-component-star-rating: 1.0.126 => 1.0.127
- bpk-component-table: 1.1.66 => 1.1.67
- bpk-component-text: 1.0.121 => 1.0.122
- bpk-component-textarea: 1.1.7 => 1.1.8
- bpk-component-theme-toggle: 1.0.100 => 1.0.101
- bpk-component-ticket: 1.2.56 => 1.2.57
- bpk-component-tooltip: 3.1.76 => 3.1.77
- bpk-mixins: 17.21.0 => 17.22.0
- bpk-react-utils: 2.7.6 => 2.7.7
- bpk-scrim-utils: 3.2.59 => 3.2.60
- bpk-stylesheets: 3.2.168 => 3.2.169
- bpk-svgs: 6.5.1 => 6.6.0
- bpk-theming: 1.2.6 => 1.2.7
- bpk-tokens: 27.6.0 => 27.6.1
  - Added `"sideEffects: false,` Webpack hint to each component's `package.json`. This improves tree-shaking, see https://webpack.js.org/guides/tree-shaking/#mark-the-file-as-side-effect-free.

- bpk-component-infinite-scroll: 2.2.25 => 2.2.26
  - Marked `./src/intersection-observer.js` as having side effects.

# 2019-05-16 - Map marker brought forward when selected

**Changed:**
- bpk-component-map: 2.5.2 => 2.5.3
  - Selected map markers now have `z-index: 1`.

# 2019-05-16 - Gray theming utility

**Added:**
- bpk-mixins: 17.20.0 => 17.21.0
  - New mixins to apply gray theming to gray colours via the theme props `colorGray50`, `colorGray100`, `colorGray300`, `colorGray500`, `colorGray700`, `colorGray900`.

# 2019-05-15 - New heart icon style.

**Added:**

- bpk-component-icon: 3.27.13 => 3.28.0
- bpk-svgs: 6.4.6 => 6.4.7
- bpk-mixins: 17.19.1 => 17.20.0
  - New `heart--outline` icon.
  - `heart` icon update to be aligned to the new style.

# 2019-05-09 - New theme props for buttons and a new map prop

**Added:**
- `bpk-component-button`: 2.2.0 => 2.3.0
  - Added new theming prop for `border-radius` on buttons.

- `bpk-component-map`: 2.4.0 => 2.5.0
  - New `greedyGestureHandling` prop for enforcing one-finger pan and zoom on touch devices.

# 2019-05-06 - New map marker type

**Added:**
- `bpk-component-map`: 2.3.1 => 2.4.0
  - Added `plain` to `MARKER_TYPES` for use with `BpkMapMarker` component.

# 2019-05-06 Theming support for Featured and Destructive buttons, and Flow updates for Text

**Added:**
- `bpk-tokens`: 27.5.0 => 27.6.0
  - Added new tokens for destructive and featured buttons to allow theming.
- `bpk-component-theme-toggle`: 1.0.96 => 1.0.97
  - Added theming properties to apply theme.
- `bpk-component-button`: 2.1.58 => 2.2.0
  - Added theme attributes for destructive and featured buttons.
- `bpk-component-text`: 1.0.117 => 1.0.118
  - Added flow types for `BpkText` props.

**Changed:**
- `bpk-tokens`: 27.5.0 => 27.6.0
  - Deprecated `BUTTON_FEATURED_BACKGROUND_IMAGE` to allow theming as no longer required.
- `bpk-mixins`: 17.18.3 => 17.19.0
  - Changed destructive and featured button mixins to allow for theming to be applied.

# 2019-05-01 Bug fixes

**Fixed:**

- bpk-component-datepicker: 9.0.1 => 9.0.2
- bpk-component-popover: 2.2.26 => 2.2.27
  - Fixed target and renderTarget types to support being passed references created via `createRef`.

# 2019-04-30 Bug fixes, and a new selected state for map markers

**Added:**

- bpk-component-map: 2.2.8 => 2.3.0
  - Added `selected` prop for when markers are selected or highlighted. See https://backpack.github.io/components/map?platform=web#map-markers.

**Fixed:**

- bpk-component-autosuggest: 3.0.147 => 3.0.148
- bpk-component-datepicker: 9.0.0 => 9.0.1
- bpk-component-popover: 2.2.25 => 2.2.26
- bpk-react-utils: 2.7.5 => 2.7.6
  - Fixed issue that caused tests to error if a portal's render target is removed from the DOM before the portal is unmounted

# 2019-04-25 Breaking changes for Calendar and flow fixes for Infinite Scroll

**Breaking:**
- bpk-component-calendar: 4.5.18 => 5.0.0
- bpk-component-datepicker: 8.1.54 => 9.0.0
- bpk-component-scrollable-calendar: 0.1.41 => 1.0.0
  - `weekStartsOn` is now required, to assist with localisation.

**Fixed:**

- bpk-component-infinite-scroll: 2.2.19 => 2.2.20
  - Fixed flow definition.


# 2019-04-23 Added strict Flow typing

**Updated:**
- For all packages that utilise `Flow` the `strict` annotation has been added.

# 2019-04-19 Fixed small input styling bugs

**Fixed:**

- bpk-component-fieldset:
- bpk-component-input:
- bpk-component-select:
- bpk-component-textarea:
- bpk-mixins:
  - Fixed bug that caused wrong background color when `valid` and `disabled` prop were used together

 - bpk-mixins:
 - bpk-component-textarea:
   - Set `max-width` property to provide a more predictable experience when a user resizes the component in their browser.

# 2019-04-17 Added new validation to textarea component

**Added:**
- bpk-component-textarea: 1.0.116 => 1.1.0
  - Added `valid` prop to textarea component for handling incorrect input.

- bpk-mixins: 17.17.1 => 17.18.0
  - Added `bpk-textarea--invalid` mixin.

# 2019-04-11

**Added:**
- bpk-component-input: 4.0.3 => 4.1.0
  - When calling `onClear`, provide input `name` in the event.

# 2019-04-10 New icon for price alerts

**Changed**
- bpk-component-icon: 3.27.5 => 3.27.6
- bpk-mixins: 17.17.0 => 17.17.1
- bpk-svgs: 6.4.3 => 6.4.4
  - Updated `alert--active`, `alert--add`, `alert--expired`, `alert--remove`, `price-alerts` icons

# 2019-04-10 New design for invalid select

**Added**:
- bpk-mixins: 17.16.4 => 17.17.0
  - Added `bpk-select--invalid` mixin.

**Changed**:
- bpk-component-select: 2.2.51 => 2.2.52
  - Invalid `BpkSelect`s now have a red border and background to match the style of invalid `BpkInput`s.

**Note**: The API hasn't changed, it's only breaking because it's a major visual change.

# 2019-04-08 New design for validation messages

**Breaking**
- bpk-component-form-validation: 1.0.118 => 2.0.0
  - Refreshed the design of invalid inputs. See https://backpack.github.io/components/form?platform=web#validation
- bpk-tokens: 27.4.10 => 27.5.0
  - Updated `FORM_VALIDATION_COLOR` to red 500
  - Deprecated `FORM_VALIDATION_MARGIN`, `FORM_VALIDATION_PADDING_Y`, `FORM_VALIDATION_PADDING_X`, `FORM_VALIDATION_BACKGROUND_COLOR`, `FORM_VALIDATION_ARROW_SIZE`, `FORM_VALIDATION_CHECKBOX_ARROW_LEFT` on web

**Note**: The API hasn't changed, it's only breaking because it's a major visual change.

# 2019-04-04 New design for invalid input

**Breaking:**
- bpk-component-input: 3.3.69 => 4.0.0
  - `_forms.scss`:
      - Added `border-color` to `bpk-input--invalid` mixin for input fields to highlight red when there is an error on the input.
      - Updated `background` to `bpk-input--invalid` mixin for fields to change the color from white to red.

**Note**: The API hasn't changed, it's only breaking because it's a major visual change.

**Added:**
- bpk-component-tooltip: 3.1.64 => 3.1.65
  - Added the prop `renderTarget` to `BpkTooltipPortal` to allow rendering it inside any DOM element.

**Fixed:**
- bpk-component-badge: 1.1.62 => 1.1.63
  - Added a default font colour to badges to prevent the badge colour changing due to cascading styles.

# 2019-03-27 New `buttonProps` on map component

**Added:**
- bpk-component-map: 2.1.3 => 2.2.0
  - Added the prop `buttonProps` to `BpkMapMarker` to allow sending arbitrary props to the button element.

**Fixed:**
- bpk-stylesheets: 3.2.155 => 3.2.156
  - Changed inner class of global class to be global itself.

# 2019-03-14 Replace phone input placeholder with labels

**Breaking:**

- bpk-component-phone-input: 1.0.58 => 2.0.0
  - Add labels for dialling code and telephone number as they are preferred over placeholders per UX guidelines.

# 2019-03-11 Fix for style spreading in BpkThemeProvider

**Fixed:**
- bpk-theming: 1.2.1 => 1.2.2
  - Fix bug introduced in previous release. Styles are now spread correctly.

# 2019-03-11 BpkThemeProvider now accepts `style` prop

**Fixed:**
- bpk-theming: 1.2.0 => 1.2.1
  - `style` prop is now correctly applied in `BpkThemeProvider` e.g:
    ```
    <BpkThemeProvider
      theme={{ color: colorWhite }}
      themeAttributes={['color']}
      style={{ /* user defined style goes here */ }}
    >
      <p>Lorem Ipsum</p>
    </BpkThemeProvider>,
    ```

# 2019-03-08 New prop for BpkThemeProvider

**Added:**
- bpk-theming: 1.1.28 => 1.2.0
  - Added `component` prop to allow defining the element used to wrap all children.

# 2019-02-22 New `eco-leaf` icon

**Added:**
- bpk-component-icon: 3.26.3 => 3.27.0
- bpk-mixins: 17.15.0 => 17.16.0
- bpk-svgs: 6.3.2 => 6.4.0
  - New '`eco-leaf`' icon added.

# 2019-02-21 Add mixin for primary color use

**Added:**
- bpk-mixins: 17.14.2 => 17.15.0
  - Added a mixin for primary colour: `bpk-apply-primary-color-to`.
    ```scss
    @import '~bpk-mixins';

    .selector {
      // Instead of
      // color: $bpk-color-blue-500;
      @include bpk-apply-primary-color-to(color);
    }
    ```

# 2019-02-19 Map markers and horizontal nav scrolling

**Added:**
 - bpk-component-horizontal-nav: 2.3.47 => 2.4.0
   - Added `autoScrollToSelected` prop. When used, the horizontal nav will ensure that the selected item is within view when loaded on narrow devices.
- bpk-component-map: 2.0.42 => 2.1.0
  - Added the component `BpkMapMarker`.


# 2019-02-12 New Hide icon

**Added:**
- bpk-component-icon: 3.26.1 => 3.26.2
- bpk-mixins: 17.14.1 => 17.14.2
- bpk-svgs: 6.3.1 => 6.3.2
  - Add `hide` icon.

# 2019-02-06 Revert breakpoint breaking change

**Fixed:**
 - bpk-component-breakpoint: 1.1.42 => 1.1.43
  - Downgrade `react-responsive` to revert react 16.3.0 breaking change.

# 2019-02-04 New grid layout icon

**Added:**

- bpk-component-icon: 3.25.0 => 3.26.0
- bpk-mixins: 17.13.0 => 17.14.0
- bpk-svgs: 6.2.0 => 6.3.0
  - Add `grid-layout` icon.

**Fixed:**
- bpk-component-banner-alert: 2.0.68 => 2.0.69
  - Upgrade `react-transition-group` to `"^2.5.3`.

# 2019-01-28 New social-like icon

**Added:**
- bpk-component-icon: 3.25.0
- bpk-mixins: 17.13.0
- bpk-svgs: 6.2.0
  - New social-like icon.

# 2019-01-23 New speaker icon

**Added:**
- bpk-component-icon: 3.24.0
- bpk-mixins: 17.12.0
- bpk-svgs: 6.1.0
  - New speaker icon.

# 2019-01-18 Bug fix for Calendar range selection

**Fixed:**
- bpk-component-calendar
  - Fix edge cases with Week component's support for range selection

# 2019-01-11 Bug fix for Scrollable Calendar

**Fixed:**
 - bpk-component-scrollable-calendar:
   - Fixed an error that was appearing when used with React < 16.3.

# 2019-01-11 Infinite scroll observer threshold prop

**Added:**

- bpk-component-infinite-scroll:
  - Added `loaderIntersectionTrigger` so that consumers can decide which percentage of the loading component needs to be visible before triggering the fetch method. Options are `small`, `half` and `full`, being `full` the default option.

# 2019-01-10 - New calendar properties

**Added:**

- bpk-component-calendar: 4.4.6 => 4.5.0
  - Add `cellClassName` for adding styles to the table cells in the grid.
  - Add `selectionStart` and `selectionEnd` properties so that the Week object can know to re-render itself if the user is selecting a range and changes the week's selected status.

**Fixed:**

- bpk-tokens: 27.4.5 => 27.4.6
  - Changed `spacingNone` from `0rem` to `0`. This won't affect any usage in CSS as they're equivalent.

# 2019-01-08 - Reduce bpk-component-scrollable-calendar bundle size

**Fixed:**

 - bpk-component-scrollable-calendar:
   - We've swapped out `react-virtualized` for `react-window`, which reduces the prod bundle size by around 62kb! 🎉

# 2019-01-07 - Fix background image bug

**Fixed:**

- bpk-component-image: 2.1.6 => 2.1.7
  - Fixed a bug with `BpkBackgroundImage` where inner content would not display unless it had an explicit opacity set.

# 2019-01-07 - Fix badge padding

**Fixed:**

- bpk-component-badge: 1.1.49 => 1.1.50
  - Badges with icons and no text now have correctly-spaced padding.

# 2018-12-19 - Fix exposure of iOS font token

**Fixed:**

 - bpk-tokens: 27.4.2 => 27.4.4
   - Correctly expose token `textHeavyFontWeight`.

# 2018-12-18 - Fix scrollable calendar DOM layout

**Fixed:**

- bpk-component-scrollable-calendar: 0.1.16 => 0.1.17
  - Remove an unnecessary wrapper element that complicated layouts.

# 2018-12-13 - Fixes for text and text input components

**Fixed:**

- react-native-bpk-component-text: 4.0.1 => 4.0.2
  - Remove warning about invalid prop type usage.

- react-native-bpk-component-text-input: 3.0.7 => 3.0.8
- react-native-bpk-component-phone-input: 3.0.7 => 3.0.8
  - Removed line height to fix an issue where overflowing content didn't scroll correctly.

# 2018-12-12 - Scrollable calendar uses react-virtualised again

**Fixed:**

- bpk-component-calendar: 4.4.0 => 4.4.1
   - Date buttons now have transparent backgrounds instead of white which caused display issues in scrollable calendar.

- bpk-component-scrollable-calendar: 0.1.15 => 0.1.16
  - Revert to use react-virtualized instead of bpk-component-infinite-scroll.

# 2018-12-07 - Navigation bar fix

**Fixed:**

- react-native-bpk-component-navigation-bar: 4.0.8 => 4.0.9
  - Remove the use of `StatusBar` on Android.


# 2018-12-05 Background image component and popover props

**Added:**

- bpk-component-popover:
  - Added `closeButtonProps` so that consumers can set props on the close button - for example, `tabIndex`.
- bpk-component-image
  - Introducing `BpkBackgroundImage` for rendering background images. See https://backpack.github.io/components/image?platform=web#background-image.

**Fixed:**

 - react-native-bpk-component-navigation-bar:
   - Long titles are now truncated.
   - **Android** Fixed a bug where the navigation bar would change the status bar colour and style without changing it back when being unmounted.


# 2018-11-30 Support custom class names on BpkCalendarDate

**Added:**
- bpk-component-calendar: 4.3.23 => 4.4.0
- bpk-component-datepicker: 8.1.26 => 8.1.27
- bpk-component-scrollable-calendar: 0.1.14 => 0.1.15
  - Added `className` property to BpkCalendarDate component

# 2018-11-27 Add RN card configuration for more rounded corners

**Added:**
 - react-native-bpk-component-card:
   - Added `cornerStyle` prop which can be `sm` (`4pt`, default) or `lg` (`24pt`).

 - react-native-bpk-component-touchable-overlay:
   - Added support for 'lg' border radius.

# 2018-11-26

**Added:**
 - react-native-bpk-component-badge: 2.0.5 => 2.1.0
     - Badges now accept an optional `accessoryView` that allows icons, or other content, to be placed alongside the text inside the badge. See https://backpack.github.io/components/badge/?platform=native#with-icons
     - We've also added a `BpkBadgeIcons` component which provides an easy way to configure icons to display within the `accessoryView`.

**Breaking:**

- react-native-bpk-component-text: 3.0.4 => 4.0.0
  - Now consuming token values for the new type scale (only XXL and XXXL styles have changed).

**Added**

- bpk-tokens: 27.3.0 => 27.4.0
  - Changed `fontSizeXxl` and `fontSizeXxl` tokens for Android and iOS. They are now `30` and `36` (previously `36` and `42`).
  - Changed `letterSpacingXxl` and `letterSpacingXxxl` tokens for Android. They are now `-0.8` and `-1.0` (previously `-1.0` and `-1.2`).
- bpk-component-calendar: 4.3.22 => 4.3.23
  - BpkCalendar accepts navProps, headerProps, gridProps and dateProps and passes them to sub-components


# 2018-11-22

**Added:**
 - bpk-react-utils: 2.6.13 => 2.7.0
   - Added `deprecated` function that accepts a prop type and adds a suitable console warning when the prop is used.

**Changed**

- bpk-component-badge: 1.1.43 => 1.1.44
  - Badges containing icons are now slightly taller (`20px` instead of `18px`) and the icon inside will be resized and positioned to fit better. See https://backpack.github.io/components/badge?platform=web#with-icons


# 2018-11-16 - Change elevation tokens

**Added, changed:**

- bpk-tokens: 27.2.1 => 27.3.0
  - Changed elevation token values. Also added a new `elevationXxl` token. See https://backpack.github.io/tokens/shadows for the new values.
- react-native-bpk-component-card: 1.2.50 => 1.2.51
  - Focused cards now have a slightly different shadow to reflect the above elevation token changes.

# 2018-11-15 - Change shadow and border radius tokens

**Changed:**
- bpk-tokens: 27.2.0 => 27.2.1
  - Updated iOS shadow tokens and deprecated XL shadow tokens on iOS.
  - Changed Android `borderRadiusSm` token to `4`.
  - Added `borderRadiusLg` tokens to Android and iOS.
- react-native-bpk-component-card: 1.2.49 => 1.2.50
- react-native-bpk-component-chip: 3.1.1 => 3.1.2
  - Updated to use new shadow tokens. Shadows are now slightly softer.
- react-native-bpk-styles: 1.1.20 => 1.1.21
  - Tweaked `shadows.large` to use large tokens instead of deprecated XL ones.

# 2018-11-14 - Update send-message icon

**Fixed:**

- bpk-svgs: 6.0.1 => 6.0.2
  - Updated `send-message` icon

# 2018-11-13 - Make scrollable calendar more performant

**Fixed:**
- bpk-component-calendar: 4.3.17 => 4.3.18
- bpk-component-datepicker: 8.1.20 => 8.1.21
- bpk-component-scrollable-calendar: 0.1.8 => 0.1.9
  - Use bpk-component-infinite-scroll instead of react-virtualized

# 2018-11-08 - Add `disabled` prop to native chips

**Added:**

- react-native-bpk-component-chip: 3.0.0 => 3.1.0
  - Added `disabled` prop to chips.

# 2018-11-08 - New chip design

**Breaking:**

- react-native-bpk-component-chip: 2.0.1 => 3.0.0
  - Chips now feature a beautiful new design. The `large` prop has also been removed. See https://backpack.github.io/components/chip?platform=native

# 2018-11-05 - Update some components to use `base` text style instead of `lg`

**Breaking:**
- react-native-bpk-component-navigation-bar: 3.0.1 => 4.0.0
  - (iOS only) Navigation bar text now uses `base` text style as the new type scale made these too large. ([See below for type scale changes](https://github.com/Skyscanner/backpack/blob/master/CHANGELOG.md#2018-10-31---new-type-scale))

- react-native-bpk-component-flat-list: 2.0.0 => 3.0.0
- react-native-bpk-component-phone-input: 2.0.2 => 3.0.0
  - (iOS only) Flat list now uses `base` text style as the new type scale made these too large. ([See below for type scale changes](https://github.com/Skyscanner/backpack/blob/master/CHANGELOG.md#2018-10-31---new-type-scale))

- react-native-bpk-component-section-list: 2.0.0 => 3.0.0
  - (iOS only) Section list now uses `base` text style as the new type scale made these too large. ([See below for type scale changes](https://github.com/Skyscanner/backpack/blob/master/CHANGELOG.md#2018-10-31---new-type-scale))


# 2018-11-02 - Add validation to RN Select component

**Added:**

- react-native-bpk-component-select:
  - Added `valid` and `validationMessage` props to make Select component to be consistent with Text Inputs. [See the docs](https://backpack.github.io/components/select/?platform=native)

# 2018-11-01 - Remove use of deprecated property

**Fixed:**

 - react-native-bpk-component-button-link: 4.0.0 => 4.0.1
 - react-native-bpk-component-button: 8.0.0 => 8.0.1
 - react-native-bpk-component-navigation-bar: 3.0.0 => 3.0.1
 - react-native-bpk-component-nudger: 2.0.0 => 2.0.1
   - Token values updated to support new type-scale.

# 2018-10-31 - New type scale

**Breaking:**
- react-native-bpk-component-alert: 1.0.35 => 2.0.0
- react-native-bpk-component-badge: 1.0.28 => 2.0.0
- react-native-bpk-component-banner-alert: 4.0.39 => 5.0.0
- react-native-bpk-component-button-link: 3.1.4 => 4.0.0
- react-native-bpk-component-button: 7.1.23 => 8.0.0
- react-native-bpk-component-chip: 1.0.24 => 2.0.0
- react-native-bpk-component-flat-list: 1.0.34 => 2.0.0
- react-native-bpk-component-horizontal-nav: 3.0.40 => 4.0.0
- react-native-bpk-component-navigation-bar: 2.0.44 => 3.0.0
- react-native-bpk-component-nudger: 1.0.51 => 2.0.0
- react-native-bpk-component-phone-input: 1.0.50 => 2.0.0
- react-native-bpk-component-picker: 2.0.37 => 3.0.0
- react-native-bpk-component-section-list: 1.0.34 => 2.0.0
- react-native-bpk-component-select: 1.0.33 => 2.0.0
- react-native-bpk-component-text-input: 2.3.20 => 3.0.0
- react-native-bpk-component-text: 2.2.0 => 3.0.0
  - Now consuming token values for the new type scale.

**Added:**

- bpk-tokens: 27.1.1 => 27.2.0
  - Token values updated to support new type scale on mobile platforms. (No change for web.)

# 2018-10-31 - New prop for native text and bugfix for native button

**Fixed:**

- react-native-bpk-component-button: 7.1.22 => 7.1.23
  - Fixed ripple effect for Android and React Native `0.57.x`

**Added:**

- react-native-bpk-component-text: 2.1.55 => 2.2.0
  - Added `weight` prop to control font weight. `emphasize` is now deprecated and will be removed in a future version. Use `weight="emphasized"` to emphasise text from now on.

# 2018-10-24 - Icons renamed and new prop for BpkInfiniteScroll

**Breaking:**

- bpk-svgs: 5.19.4 => 6.0.0
  - Icons renamed:
  - `bws--call-back` => `call-back`
  - `bws--end-call` => `end-call`
  - `bws--keypad` => `keypad`
  - `bws--mute` => `mute`
  - `bws--phone-call` => `phone-call`
  - `bws--send-message` => `send-message`
  - `bws--un-mute` => `unmute`
  - `send-message` icon replaced with new version

**Added:**

- bpk-component-infinite-scroll: 2.0.16 => 2.1.0
  - Added possibility to have different number of elements loaded on load and on scroll

# 2018-10-24 - New icons added

**Added:**

- bpk-component-icon: 3.23.8 => 3.23.9
- bpk-mixins: 17.11.19 => 17.11.20
- bpk-svgs: 5.19.3 => 5.19.4
- react-native-bpk-component-button-link: 3.1.1 => 3.1.2
- react-native-bpk-component-button: 7.1.20 => 7.1.21
- react-native-bpk-component-icon: 1.10.8 => 1.10.9
- react-native-bpk-component-navigation-bar: 2.0.41 => 2.0.42
  - New icons added:
  - `bws--call-back`
  - `bws--end-call`
  - `bws--keypad`
  - `bws--mute`
  - `bws--phone-call`
  - `bws--send-message`
  - `bws--un-mute`

# 2018-10-12 - Fix Infinite Scroll problem on IE11

**Fixed:**
- bpk-component-infinite-scroll: 2.0.13 => 2.0.14
  - Changed IntersectionObserver threshold from 1 to 0.99.

# 2018-10-11 - Fix React Native buttons on Android

**Fixed:**
 - react-native-bpk-component-button: 7.1.18 => 7.1.19
   - Fixed an issue where primary and featured buttons were the wrong size on Android.

# 2018-10-08 - Align web progress bar to mobile platforms

**Fixed:**
 - bpk-component-progress 1.0.90 => 1.0.91:
   - Changed non-stepped progress bar to have rounded corners to match RN Backpack progress bar

# 2018-10-05 - Fix more React Native dynamic text issues

**Added:**

- react-native-bpk-component-button-link: 3.0.32 => 3.1.0
  - Reverted `allowFontScalling={false}` change.
  - Add `textProps` prop.

**Fixed:**

- react-native-bpk-component-picker: 2.0.31 => 2.0.32
  - Prevent font scaling of button link in in iOS picker menu.

- bpk-component-autosuggest: 3.0.111 => 3.0.112
  - Updated `react-autosuggest` dependency: `9.4.1` => `9.4.2`

# 2018-10-03 - Fix for React Native button stretching

**Fixed:**

- react-native-bpk-component-button: 7.1.16 => 7.1.17
- react-native-bpk-component-nudger: 1.0.44 => 1.0.45
  - Fix issue with buttons stretching in flex containers.
  - Fix text / icon alignment issues on iOS.

- bpk-component-autosuggest:
  - bpk-component-autosuggest: 3.0.109 => 3.0.110

- bpk-react-utils:
  - bpk-react-utils: 2.6.10 => 2.6.11

# 2018-09-27 - Fix more React Native dynamic text issues

**Fixed:**
- react-native-bpk-component-badge: 1.0.23 => 1.0.24
  - Disabled font scaling.

- react-native-bpk-component-button-link: 3.0.29 => 3.0.30
  - Disabled font scaling.

- react-native-bpk-component-icon: 1.10.4 => 1.10.5
  - Font scaling is disabled by default.

- react-native-bpk-component-navigation-bar: 2.0.36 => 2.0.37
  - Title text now aligned with system and does not support font scaling.

- react-native-bpk-component-text-input: 2.3.13 => 2.3.14
  - Overflowing label text is now truncated.

# 2018-09-24 - Fix React Native button to support dynamic text sizes

**Fixed:**
- react-native-bpk-component-button: 7.1.14 => 7.1.15
  - The default button variant now correctly works with Dynamic Text sizes.

# 2018-09-21 - Fix issue in scrollable calendar component

**Fixed:**
 - bpk-component-scrollable-calendar: 0.1.0 => 0.1.1
   - Fixed an issue where `gridClassName` didn't work as expected.

# 2018-09-18 - Added functionality to scrollable-calendar and RN image

**Added:**
 - bpk-component-scrollable-calendar: 0.0.14 => 0.1.0
   - Introduced React Virtualized to improve performance.
 - bpk-tokens: 27.0.0 => 27.1.0
   - Added `spacingNone` (`0px`) to the available spacings
 - react-native-bpk-component-image: 1.0.2 => 1.1.0
   - Ability to add a custom image component e.g. `imageComponent={CustomImage}`.

# 2018-09-14 - Republished Icon

**Fixed:**
- bpk-component-icon: 3.23.3 => 3.23.4
  - Republished as previous publish partially failed

# 2018-09-13 - Move SVGs to bpk-svgs dist

**Added:**
- bpk-svgs: 5.18.11 => 5.19.0
  - The source SVGs are now available in `dist` under `dists/svgs`.

# 2018-09-06 - Fixed RN icon component for iOS

**Fixed:**
- react-native-bpk-component-icon: 1.10.1 => 1.10.2
- react-native-bpk-component-button-link: 3.0.26 => 3.0.27
- react-native-bpk-component-button: 7.1.11 => 7.1.12
- react-native-bpk-component-navigation-bar: 2.0.32 => 2.0.33
  - Fixed an issue where usage of the above components would cause a red screen.

# 2018-09-05 - New 'family' icon

**Added:**
- bpk-component-icon: 3.22.12 => 3.23.1
- bpk-mixins: 7.11.12 => 7.11.13
- bpk-svgs: 5.18.9 => 5.18.10
- react-native-bpk-component-icon: 1.9.11 => 1.10.1
- react-native-bpk-component-button-link: 3.0.25 => 3.0.26
- react-native-bpk-component-button: 7.1.10 => 7.1.11
- react-native-bpk-component-navigation-bar: 2.0.31 => 2.0.31
  - New icon: `family`.

# 2018-08-31 - Fixed DataTable and removed unused BarChart prop

**Fixed:**
- bpk-component-datatable: 0.1.34 => 0.1.35
  - Fixed an issue where sorting columns would cause an exception.

- bpk-component-barchart: 2.3.19 => 2.3.20
  - Removes `onBarTouch` prop as it ultimately had no effect

# 2018-08-28 - Fixed banner alert `Module not found` issue

**Breaking:**

- bpk-component-router-link: 1.0.77 => 2.0.0
  - upgraded react router from `2.x` to `4.x`

**Fixed:**

- bpk-react-utils: 2.6.6 => 2.6.7
  - fixed Portal to work with react 16.

- bpk-component-banner-alert: 2.0.40 => 2.0.41
  - Fixed issue with `Module not found` error.

- bpk-stylesheets: 3.2.122 => 3.2.123
  - Reverted previous breaking change to base stylesheet.

# 2018-08-22 - Fixed native phone input prop types

**Fixed:**
- react-native-bpk-component-phone-input: 1.0.34 => 1.0.35
  - fixed spread operation in PropTypes

# 2018-08-15 - Made breadcrumb more responsive

**Added:**
- bpk-component-calendar: 4.3.0 => 4.3.1
  - Expose `gridClassName` for composed calendars.
  - `changeMonthLabel` is now only required iff a Nav component is being used.

**Fixed:**
- bpk-component-breadcrumb: 1.0.13 => 1.0.14
  - Container now wraps  on smaller screens


# 2018-08-09 - Changes to the Infinite scroll component and Calendar.

**Added:**
- bpk-component-calendar: 4.2.44 => 4.3.0
  - Exposed BpkCalendarDatePropTypes for reuse in other components.

**Fixed:**
- bpk-component-infinite-scroll: 2.0.1 => 2.0.2
  - Changed to fetch only a subset of the data, and not all, on scroll.

# 2018-08-01 - Breaking changes to the infinite scroll component.

**Breaking:**
 - bpk-component-infinite-scroll: 1.0.10 => 2.0.1
   - Added DataSource class. Can be used to trigger updates when the data for infinite scroll has changed.
   - `onItemsFetch` prop replaced in favour of DataSource.

# 2018-07-30 - Fixed issue where modal scrim would not fade in.

**Fixed:**
- bpk-component-modal:  1.7.14 => 1.8.0
- bpk-component-dialog: 1.0.35 => 1.1.0
- bpk-component-datepicker: 8.0.43 => 8.1.0
  - Scrim fade animation wasn't rendering properly before, giving a janky feel. This has now been fixed so that it fades in nicely.

# 2018-07-30 - Fixed issue with DST transition during midnight in Safari.

**Fixed:**
 - bpk-component-datepicker: 8.0.43 => 8.1.0
  - Fixed issue with DST transition during midnight in Safari that would cause some days in the BRT time zone not to render.

# 2018-07-24 - Added icon account--add

**Added:**
 - bpk-component-icon: 3.22.2 => 3.23.0
 - bpk-mixins: 17.11.2 => 17.11.3
 - bpk-svgs: 5.18.2 => 5.18.3
 - react-native-bpk-component-button-link: 3.0.17 => 3.0.18
 - react-native-bpk-component-button-link: 3.0.17 => 3.0.18
 - react-native-bpk-component-icon: 1.9.3 => 1.10.0
 - react-native-bpk-component-navigation-bar: 2.0.23 => 2.0.24
   - New icon: account--add.

# 2018-07-24 - Added `withNotches` prop to ticket component

**Added:**
- bpk-component-ticket: 1.1.57 => 1.2.0
  - Added `withNotches` prop for optionally removing the notches.

# 2018-07-24 - Fixed issue with ticket component children height

**Fixed:**
- bpk-component-ticket: 1.1.56 => 1.1.57
  - Issue when non-padded containers not being rendered at full-height of the ticket component.

# 2018-07-20 - Added `tinymask` support to native text, plus dependencies update and bug fixes.

**Added:**
- react-native-bpk-component-text-input: 2.2.21 => 2.3.0
  - Added `tinymask` support via mask property

**Fixed:**
- bpk-component-barchart: 2.3.8 => 2.3.9
  - Upgraded `d3-scale` from `^1.0.5` -> `^2.1.0`.

- bpk-component-breakpoint: 1.1.4 => 1.1.5
  - Upgraded `react-respnsive` from `^3.0.0` -> `^4.1.0`.

- bpk-component-drawer: 1.2.13 => 1.2.24
  - Upgraded `react-transition-group` from `^2.2.1` -> `^2.4.0`.

- bpk-component-image: 1.2.23 => 1.2.24
  - Upgraded `react-transition-group` from `^2.2.1` -> `^2.4.0`.
  - Fixed loading behaviour in mobile Safari on slow networks.

- bpk-component-navigation-stack: 1.0.9 => 1.0.10
  - Upgraded `react-transition-group` from `^2.3.1` -> `^2.4.0`.

- bpk-component-slider: 1.1.36 => 1.1.38
  - Upgraded `react-slider` from `^0.11.1` -> `^0.11.2`.

- bpk-react-utils: 2.6.1 => 2.6.2
  - Upgraded `react-transition-group` from `^2.2.1` -> `^2.4.0`.
  - Upgraded `recompose` from `^0.26.0` -> `^0.27.1`.

- bpk-component-ticket: 1.1.54 => 1.1.55
  - Fixed an issue where the hover state would sometimes not apply.
  - When tickets have `padded={false}`, content overflowing the ticket borders will be hidden.


# 2018-07-19 - Update react-native-dash dependency

- react-native-bpk-component-card: 1.2.31 => 1.2.32
  - Update `react-native-dash` dependency to latest(0.0.9).

# 2018-07-18 - New native button abilities and a bug fix

**Added:**
- react-native-bpk-component-button: 7.0.6 => 7.1.0
  - Added `BUTTON_TYPES` and `ICON_ALIGNMENTS` exports.
  - Added `centerLeading` and `centerTrailing` to the possible values of `iconAlignment`.

**Fixed:**
- bpk-component-navigation-stack: 1.0.9 => 1.0.10
  - Fixed stack height in IE11.

# 2018-07-17 - Bug fixes

**Fixed:**
- bpk-component-infinite-scroll: 1.0.5 => 1.0.6
  - Scroll intersection evaluation changed. Previously, it an intersection of, exactly, 1 (100%) was expected. This change cover the case when the intersection ratio is almost 1 (i.e. 1.001).

- react-native-bpk-component-image: 1.0.1 => 1.0.2
  - Fixed `source` type to accept the same values as the `Image` component.

- react-native-bpk-component-horizontal-nav: 3.0.21 => 3.0.22
  - `BpkHorizontalNav` now displays correctly when using RTL.

- bpk-component-slider: 1.1.34 => 1.1.35
  - Fixed a bug where the handle would get stuck at the minimum value by upgrading `react-slider`. See [`react-slider#136`](https://github.com/mpowaga/react-slider/issues/136).

# 2018-07-12 - New icons and better 'close' link

**Added:**
- bpk-component-icon: 3.21.4 => 3.22.0
- bpk-mixins: 17.10.4 => 17.11.0
- bpk-svgs: 5.17.4 => 5.18.0
- react-native-bpk-component-button-link: 3.0.12 => 3.0.13
- react-native-bpk-component-button: 7.0.4 => 7.0.5
- react-native-bpk-component-icon: 1.8.7. => 1.9.0
- react-native-bpk-component-navigation-bar: 2.0.17 => 2.0.18
  - New icons: `gears-automatic` and `gears-manual`.

**Fixed:**
- bpk-component-datepicker: 8.0.39 => 8.0.40
- bpk-component-popover: 2.1.20 => 2.1.21
  - Popover footer close link is now text style `base`.

# 2018-07-11 - Release native image component

**Added:**

- react-native-bpk-component-image: 0.0.0 => 1.0.0
  - Introducing the native image component. See https://backpack.github.io/components/image?platform=native.

# 2018-07-05 - Fix bug in theme changing for react-native-component-navigation-bar


**Fixed:**

- react-native-bpk-component-navigation-bar: 2.0.15 => 2.0.16
  - Update `this.theme` on `componentDidUpdate` for RN navigation bar

# 2018-07-02 - New native chip component and web map enhancement

**Added:**

- react-native-bpk-component-chip: 0.0.0 => 1.0.0
  - Introducing the native chip component. See https://backpack.github.io/components/chip?platform=native.

**Fixed:**

- bpk-component-map: 2.0.0 => 2.0.1
  - Now `center` and `zoom` are controlled: changing them will change the values in the map.

# 2018-06-29 - Fix for image component SSR race condition

**Fixed:**

- bpk-component-image: 2.0.39 => 2.0.40
  - Fixed `onload` race condition when using server-side rendering.

# 2018-06-26 - Fix for `bpk-scrim-utils` and `bpk-component-calendar`

**Fixed:**

- bpk-scrim-utils: 3.2.1 => 3.2.2
  - Fixed incorrect prop type for `dark` prop.

- bpk-component-calendar: 4.2.35 => 4.2.36
  - Fixed calendar to work with different font sizes.

# 2018-06-25 - Map component improvements, plus adjusted height for the native badge component

**Breaking:**

- bpk-component-map: 1.0.5 => 2.0.0
  - Removed all exports except for `BpkMap`, `BpkOverlayView` and `withGoogleMapsScript`.
  - Introduced `BpkOverlayView` component to replace `OverlayView`.
  - Introduced `withGoogleMapsScript` HOC to replace `withScriptjs`.
  - Simplified `BpkMap`'s props by removing unused ones and renaming others.

**Fixed:**

- react-native-bpk-component-badge: 1.0.11 => 1.0.12
  - Adjusted height to `20pt/dp` for Android and iOS.

# 2018-06-22 - Update dependency and title for navigation bar

**Fixed:**

- react-native-bpk-component-button-link: 3.0.9 => 3.0.10
  - Loosened React Native peer dependency.

- bpk-component-navigation-bar: 1.2.5 => 1.2.6
  - `title` prop type is now node.

# 2018-06-20 - Add dark version of BpkScrim

**Added:**

- bpk-scrim-utils: 3.1.32 => 3.2.0
  - Add new prop `dark` for an alternative dark appearance of the scrim.

# 2018-06-20 - Add gradient definitions to React Native

**Breaking:**

- react-native-bpk-component-button: 6.0.15 => 7.0.0
  - `react-native-linear-gradient` is now a peer dependency instead of a dependency. The dependency is temporarily on `skyscanner/react-native-linear-gradient#new-gradient-implementation`.

**Added:**

- react-native-bpk-styles: 1.0.9 => 1.1.0
  - Added definitions for the Skyscanner primary gradient. `react-native-bpk-styles` now has a peer dependency on `react-native-linear-gradient`.

**Fixed:**

- bpk-component-navigation-bar: 1.2.3 => 1.2.4
  - `title` now accepts strings, in addition to elements

# 2018-06-19 - Native text font-weight fix for iOS 11 + RN `0.55.X`

- react-native-bpk-component-text: 2.1.38 => 2.1.39
  - An iOS 11 + React Native `0.55.X` specific fix to render font-weight correctly. Affects text styles `xs`, `sm`, `base`, `lg`, `xl` when they are `emphasize`'d and `xxl` regardless of emphasis.
  - Added flow types

# 2018-06-19 - Introduce native carousel component.

**Added:**

- react-native-bpk-component-carousel: 1.0.0

  - Introducing the React Native carousel component. See https://backpack.github.io/components/carousel?platform=native

- react-native-bpk-component-carousel-indicator: 1.0.0
  - Introducing the React Native carousel indicator component.

# 2018-06-14 - Introduce breadcrumb component and infinite scroll, plus fixing invalid text combination for `xxl` on iOS.

**Added:**

- bpk-component-breadcrumb: 1.0.0

  - Introducing the breadcrumb component for web , see https://backpack.github.io/components/breadcrumb/?platform=web

- bpk-component-infinite-scroll: 1.0.0
  - Introducing a React component for building infinite lists, see https://backpack.github.io/components/infinite-scroll?platform=web

**Fixed:**

- react-native-bpk-component-text: 2.1.37 => 2.1.38
  - In addition to issuing a prop warning when using emphasize in combination with `xxl` on iOS now nothing actually happens.

# 2018-06-08 - Introduce native map component, plus fixed display issues with native select and phone input.

**Added:**

- react-native-bpk-component-map: 0.0.1 => 1.0.0
  - Introducing the React Native map component, see: https://backpack.github.io/components/map?platform=native

**Fixed:**

- react-native-bpk-component-phone-input: 1.0.17 => 1.0.18

  - Fixed dialling code select display issue.

- react-native-bpk-component-select: 1.0.2 => 1.0.3
  - Fixed display issue when squashed in a flex container.

# 2018-06-06 - Introduce phone input component, plus new props for button, link and breakpoint.

**Added:**

- bpk-component-button: 2.0.21 => 2.1.0

  - Added `blank` and `rel` props.
  - When `blank` is set, `rel` is automatically set to `rel="noopener noreferrer"`.

- bpk-component-link: 1.1.18 => 1.2.0

  - When `blank` is set, `rel` is automatically set to `rel="noopener noreferrer"`.

- bpk-component-breakpoint: 1.0.63 => 1.1.0

  - Change `children` prop type to `oneOfType(node, func)` (added `node`).

- bpk-component-phone-input: 0.0.0 => 1.0.0

  - Introducing the web phone input component, see: https://backpack.github.io/components/phone-input/?platform=web

- bpk-component-select: 2.1.68 => 2.2.0
  - Add ability to display an image in the select component.

# 2018-05-31 - Add native alert component

**Added:**

- react-native-bpk-component-alert: 1.0.0
  - Introducing the React Native alert component, see https://backpack.github.io/components/alert?platform=native

# 2018-05-30 - Add mileage icon, RTL fix for IE

**Added:**

- bpk-component-icon: 3.20.2 => 3.21.0
- bpk-mixins: 17.9.0 => 17.10.0
- bpk-svgs: 5.16.0 => 5.17.0
- react-native-bpk-component-icon: 1.7.0 => 1.8.0
- react-native-bpk-component-button-link: 3.0.2 => 3.0.3
- react-native-bpk-component-button: 6.0.10 => 6.0.11
- react-native-bpk-component-navigation-bar: 2.0.6 => 2.0.7
  - New icon: `mileage`

**Fixed:**

- bpk-component-navigation-bar: 1.2.0 => 1.2.1
  - Fixed issue in IE where buttons were misplaced for RTL languages.

# 2018-05-25 - Introducing the map component

**Added:**

- bpk-component-map: 1.0.0
  - Introducing the map component for web, see https://backpack.github.io/components/map?platform=web

# 2018-05-24 - Fixed React Native Card component in Android API 21

**Fixed:**

- react-native-bpk-component-card: 1.2.21 => 1.2.22
  - fix visual layout in Android API level 21

# 2018-05-23 - Fixed modals in mobile Safari

**Fixed:**

- bpk-component-datepicker: 8.0.29 => 8.0.30
- bpk-component-dialog: 1.0.23 => 1.0.24
- bpk-component-modal: 1.7.2 => 1.7.3
  - Fixed a bug where the background would flicker when tapping modals in Mobile Safari.

# 2018-05-21 - Navigation bar update and fix disabled buttons on android

**Added:**

- bpk-component-navigation-bar: 1.0.2 => 1.2.0
  - The title prop now accepts nodes, so images and other elements can be passed in as well as text.

**Fixed:**

- react-native-bpk-component-button: 6.0.9 => 6.0.10
  - Fix button height for destructive and secondary disabled buttons on android.

# 2018-05-10 - Introducing navigation stack, section list and new props for horizontal-nav

**Added:**

- bpk-component-navigation-stack: 1.0.0

  - Introducing the Navigation Stack component, see: https://backpack.github.io/components/web/navigation-stack

- bpk-component-section-list: 1.0.0

  - Introducing the web section list component, see: https://backpack.github.io/components/web/section-list

- bpk-component-horizontal-nav: 2.2.0 => 2.3.0
  - `BpkHorizontalNavItem` can now be disabled with the `disabled` prop.

# 2018-05-08 - Introducing native select component

**Breaking:**

- react-native-bpk-component-picker: 1.0.11 => 2.0.0
  - `BpkPickerTrigger` has been removed, use `BpkSelect` instead.

**Added:**

- react-native-bpk-component-select: 0.0.1 => 1.0.0
  - New component `BpkSelect` for rendering tappable items that trigger a choice for the user.

# 2018-05-07 - React Native upgrade to version 0.55.3

**Fixed:**

- react-native-bpk-component-animate-height: 2.0.6 => 2.0.7

  - fixed to work with react-native 0.55.3.

- react-native-bpk-component-banner-alert: 4.0.0 => 4.0.1
  - fixed to work with react-native 0.55.3.

# 2018-05-04 - Fixed BpkNavigationBarButtonLink export

**Fixed:**

- `bpk-navigation-bar`: 1.1.0 => 1.1.1
  - fixed BpkNavigationBarButtonLink export in the index file.

# 2018-05-03 - Navigation bar theming and new props for scrollable components

**Added:**

- bpk-component-barchart:
- bpk-component-horizontal-nav:

  - Added `leadingScrollIndicatorClassName` and `trailingScrollIndicatorClassName` props for styling the scroll indicators.

- bpk-component-mobile-scroll-container:

  - Added `leadingIndicatorClassName` and `trailingIndicatorClassName` props for styling the scroll indicators.

- bpk-component-navigation-bar:
  - New `BpkNavigationBarButtonLink` component.
  - Added theming support.

# 2018-05-01 - Native flat list and section list components, plus web navigation bar component

**Added:**

- react-native-bpk-component-flat-list: 1.0.0
  - Introducing the React Native FlatList component, see: https://backpack.github.io/components/native/flat-list
- react-native-bpk-component-section-list: 1.0.0

  - Introducing the React Native SectionList component, see: https://backpack.github.io/components/native/section-list

- bpk-component-navigation-bar: 1.0.0

  - Introducing the web navigation bar, see: https://backpack.github.io/components/web/navigation-bar

- bpk-component-modal: 1.6.20 => 1.7.0

  - Ability to remove padding from inner content e.g. `padded={false}`.
  - Ability to add a custom class name to inner content e.g. `contentClassName="my-custom-class"`.

- bpk-react-utils: 2.5.1 => 2.6.0
  - the function returned by cssModules now accepts multiple class names and ignores values other than strings. see: https://github.com/Skyscanner/backpack/tree/master/packages/bpk-react-utils#cssmodulesjs

# 2018-04-26 - Native banner alerts and button links have a new default height

**Breaking:**

- react-native-bpk-component-banner-alert: 3.0.6 => 4.0.0

  - Default height of Android banner alert has changed from `52dp` to `48dp`

- react-native-bpk-component-button-link: 2.0.6 => 3.0.0
  - Default height of button links on both iOS and Android is now `32pt/dp`. Default height of large button links on iOS is now `36pt`.
  - Overflowing text will not wrap and instead result in ellipses.

# 2018-04-25 - Added icons for identity and profile settings

**Added:**

- bpk-component-icon: 3.19.3 => 3.20.0
- bpk-mixins: 17.7.0 => 17.8.0
- bpk-svgs: 5.15.1 => 5.16.0
- react-native-bpk-component-icon:
- react-native-bpk-component-button-link: 2.0.5 => 2.0.6
- react-native-bpk-component-button: 6.0.7 => 6.0.8
- react-native-bpk-component-navigation-bar: 2.0.2 => 2.0.3
  - New profile icons: `account--id-card`, `account--permit`, `add-circle`, `content--event` and `content--guides`.

# 2018-04-25 - Visual fixes for Android

**Fixed:**

- react-native-bpk-component-banner-alert: 3.0.4 => 3.0.5
- react-native-bpk-component-button-link: 2.0.4 => 2.0.5
- react-native-bpk-component-button: 6.0.6 => 6.0.7
- react-native-bpk-component-icon: 1.6.2 => 1.6.3
- react-native-bpk-component-navigation-bar: 2.0.1 => 2.0.2
- react-native-bpk-component-nudger: 1.0.11 => 1.0.12
- react-native-bpk-component-phone-input: 1.0.10 => 1.0.11
- react-native-bpk-component-picker: 1.0.7 => 1.0.8
- react-native-bpk-component-star-rating: 1.0.19 => 1.0.20
- react-native-bpk-component-text-input: 2.2.9 => 2.2.10

  - Android icons are now vertically centred within bounding box (large at `24dp` and small at `16dp`)

- react-native-bpk-component-button: 6.0.6 => 6.0.7
- react-native-bpk-component-nudger: 1.0.11 => 1.0.12
  - Fixed an issue where the outline of secondary and destructive buttons wouldn't render on Android devices with an API Level lower than 23.

# 2018-04-25 - Add native progress component

**Added:**

- react-native-bpk-component-progress: 1.0.0
  - Introducing the native progress component, see: https://backpack.github.io/components/native/progress.

# 2018-04-20 - Fix icon colour in Horizontal Nav Items

**Fixed:**

- bpk-component-horizontal-nav: 3.0.5 => 3.0.6
  - Fixed issue where icon colour would not be set inside horizontal nav items.

# 2018-04-18

**Breaking:**

- react-native-bpk-component-navigation-bar: 1.1.4 => 2.0.0
  - `BpkNavigationBarTextButtonIOS`, `BpkNavigationBarIconButtonIOS`, and `BpkNavigationBarButtonAndroid` can now be disabled with the `disabled` prop.
  - Introduces a new theme attribute `disabledTintColor`. This new attribute has to be supplied to define a valid theme, without it theming is disabled.

**Added:**

- bpk-component-code: 1.0.57 => 1.1.0
  - `BpkCode` and `BpkCodeBlock` now supports an alternate style more suitable for non-white backgrounds with the `alternate` prop.
  - `BpkCode` and `BpkCodeBlock` can now take a custom `className`.
  - `BpkCode` and `BpkCodeBlock` now spreads additional props down.
- bpk-component-table: 1.0.57 => 1.1.0
  - `BpkTableHeadCell` and `BpkTable` now supports an alternate style more suitable for non-white backgrounds with the `alternate` prop.
- bpk-component-content-container: 1.2.0 => 1.3.0
  - `BpkConentContainer` now supports an alternate style more suitable for non-white backgrounds with the `alternate` prop.
- bpk-mixins: 17.6.2 => 17.7.0
  - Added new mixins to support the above alternate styles. Also includes two new mixins for RTL aware margins. `bpk-margin-leading` and `bpk-margin-trailing`.

## 2018-04-17 - Context fixes and stylesheet improvements

**Added:**

- bpk-component-content-container: 1.1.62 => 1.2.0
  - `BpkContentContainer` now accepts a `className`.

**Fixed:**

- bpk-component-dialog: 1.0.17 => 1.0.18
- bpk-component-drawer: 1.2.9 => 1.2.10
- bpk-component-modal: 1.6.17 => 1.6.18
- bpk-component-popover: 2.1.8 => 2.1.9
- bpk-component-tooltip: 3.1.8 => 3.1.9

  - Context is now preserved in components passed to `children`.

- react-native-bpk-component-horizontal-nav: 3.0.4 => 3.0.5

  - Fixed measurements of native horizontal nav component.

- bpk-react-utils: 2.5.0 => 2.5.1

  - The `Portal` component now preserves context in it's `children` prop.

- bpk-stylesheets: 3.2.100 => 3.2.101
  - Prevent globals (`.hidden`, `.clearfix`) from being scoped by CSS modules.

## 2018-04-09 - Token output now sorted alphabetically

**Breaking:**

- bpk-tokens: 26.8.0 => 27.0.0
  - Major upgrade in underlying token library, including:
    - Token output is now sorted alphabetically
    - `".alias"` property has been replaced with an `"originalValue"` property in `*.ios.json`, `*.raw.ios.json` and `*.raw.android.json`.

**Fixed:**

- bpk-component-input: 3.3.11 => 3.3.12
  - The uppercase keys in `INPUT_TYPES` are now deprecated use lower case instead. e.g `INPUT_TYPES.EMAIL` -> `INPUT_TYPES.email`.

## 2018-04-04 - New flask icon

**Added:**

- bpk-component-icon: 3.18.1 => 3.19.0
- bpk-mixins: 17.5.1 => 17.6.0
- bpk-svgs: 5.14.1 => 5.15.0
- react-native-bpk-component-icon: 1.5.1 => 1.6.0
  - New flask icon.

## 2018-04-03 - Autosuggest default `renderInputComponent` fix

**Fixed:**

- bpk-component-autosuggest: 3.0.77 => 3.0.78
  - The default `renderInputComponent` prop now renders a `BpkInput` correctly

## 2018-04-03 - Native banner alert refactor

**Breaking:**

- react-native-bpk-component-animate-height: 1.0.37 => 2.0.0
- react-native-bpk-component-banner-alert: 2.1.14 => 3.0.0

  - Major refactor
  - `ALERT_TYPES` keys are now all lower case i.e: `ALERT_TYPES.success` instead of `ALERT_TYPES.SUCCESS`

- react-native-bpk-component-button-link: 1.1.7 => 2.0.0
  - Android ripple is no longer constrained to the boundaries of the button link, please use the `borderlessBackground` prop for this

## 2018-03-30 - Fix for full-screen modals with lots of content

**Fixed:**

- bpk-component-datepicker: 8.0.20 => 8.0.21
- bpk-component-modal: 1.6.14 => 1.6.15
- bpk-scrim-utils: 3.1.21 => 3.1.22
  - Fixed issue with full-screen modals that have too much content to display within the viewport.

## 2018-03-29 - Add support for leading and trailing icons in React Native navigation bar title

**Added:**

- react-native-bpk-component-navigation-bar: 1.1.0
  - Add support for leading and trailing icons in navigation bar title.

**Fixed:**

- react-native-bpk-component-banner-alert: 2.1.14
  - Fixed dev dependencies that should be dependencies.

## 2018-03-27 - React Native horizontal nav visual breaking change

**Breaking:**

- react-native-bpk-component-horizontal-nav: 3.0.0
  - fix spaceAround config resulting in a visual breaking change

## 2018-03-26 - iPad modal keyboards fixes and fieldset improvements

**Fixed:**

- bpk-component-datepicker: 8.0.18 => 8.0.19
- bpk-component-dialog: 1.0.12 => 1.0.13
- bpk-component-drawer: 1.2.4 => 1.2.5
- bpk-component-modal: 1.6.12 => 1.6.13
- bpk-scrim-utils: 3.1.19 => 3.1.20

  - Fix bug on iPad when virtual keyboards is used in a modal.

- bpk-component-fieldset: 1.1.11 => 1.1.12
  - When wrapping a BpkAutosuggest in a BpkFieldset, the label's `for` attribute will now be correctly set from the Autosuggest's `inputProps` prop.

## 2018-03-22 - Native Picker Component

**Added:**

- react-native-bpk-component-picker: 0.0.1 => 1.0.0
  - Introducing the React Native picker component.

**Fixed:**

- react-native-bpk-component-navigation-bar: 1.0.2 => 1.0.3
  - When providing an image for the title we no longer override the style. Instead, we append to it.

## 2018-03-21 - Native Navigation Bar Improvements

**Fixed:**

- react-native-bpk-component-navigation-bar: 1.0.0 => 1.0.2
  - `navigationBarStatusBarStyle` is now not supported on iOS.
  - New chevron style for `BpkNavigationBarBackButtonIOS` that better aligns with iOS.
  - Support user provided `style` prop.

## 2018-03-19 - Native Navigation Bars

**Breaking:**

- react-native-bpk-component-button: 5.0.0 => 6.0.0
  - Not actually a breaking change. This was released by mistake again. 5.0.0 and 6.0.0 are compatible.

**Added:**

- bpk-component-icon: 3.17.1 => 3.18.0
- bpk-mixins: 17.4.1 => 17.5.0
- bpk-svgs: 5.13.1 => 5.14.0
- react-native-bpk-component-icon: 1.4.1 => 1.5.0
  - New iOS native close icon: `native-ios--close`.
    - **Note:** to be used on iOS only...
- react-native-bpk-component-navigation-bar: 0.0.2 => 1.0.0
  - Introducing the React Native navigation bar component.

## 2018-03-16 - Android buttons style breaking change and React Native horizontal navigation now allows for small text

**Breaking:**

- react-native-bpk-component-button: 4.4.4 => 5.0.0
  - Android `secondary` and `destructive` buttons have been visually aligned with iOS by adding a border. Note that the existing visual look is available on both platforms via the [button-link component](https://backpack.github.io/components/native/button-link). This is a breaking change to prevent unintended updates to the button look and feel.

**Added**

- react-native-bpk-component-horizontal-nav: 2.0.26 => 2.1.0
  - New `small` prop is accepted in BpkHorizontalNavItem to allow for small text in the navigation item

## 2018-03-15 - New hotels amenities icons and native android back/forward/close icons

**Added:**

- bpk-component-icon: 3.16.1 => 3.17.0
- bpk-mixins: 17.3.7 => 17.4.0
- bpk-svgs: 5.12.3 => 5.13.0
- react-native-bpk-component-icon: 1.3.6 => 1.4.0
  - New hotels amenities icons: `hotels--smoking`, `hotels--pets-allowed`, `hotels--jacuzzi` and `hotels--disabled-facilities`.
  - New Android native back, forward and close icons: `native-android--back`, `native-android--forward` and `native-android--close`.
    - **Note:** to be used on Android only...

## 2018-03-15 - Native Panel component

**Added:**

- react-native-bpk-component-panel: 1.0.0
  - New native panel component, see https://backpack.github.io/components/native/panels.

## 2018-03-13 - Native Phone Number Input

**Added:**

- react-native-bpk-component-phone-input: 1.0.0
  - New phone input components, see https://backpack.github.io/components/native/phone-input.

## 2018-03-12 - Native nudger component and SSR OC fixes

**Added:**

- react-native-bpk-component-nudger: 0.0.1 => 1.0.0
  - Introducing the React Native nudger component.

**Fixed:**

- bpk-component-popover: 2.1.1 => 2.1.2
- bpk-component-tooltip: 3.1.1 => 3.1.2
- bpk-component-datepicker: 8.0.14 => 8.0.15
  - Fixed compatibility with server side OC
- bpk-scrim-utils: 3.1.15 => 3.1.16
  - Pass `onClose` prop to the wrapped component in `withScrim` HOC

## 2018-03-08 - Android buttons can be icon only and button links can be disabled

**Added:**

- bpk-component-drawer: 1.1.19 => 1.2.0

  - Arbitrary props are now passed to drawer container.

- react-native-bpk-component-button: 4.3.9 => 4.4.0

  - Android now supports the `iconOnly` prop.

- react-native-bpk-component-button-link: 1.0.1 => 1.1.0

  - New `disabled` prop.

- react-native-bpk-component-touchable-native-feedback: 1.0.0 => 1.1.0
  - New `borderlessBackground` prop.

**Fixed:**

- bpk-component-drawer: 1.1.19 => 1.2.0
- bpk-scrim-utils: 3.1.14 => 3.1.15
  - Fixed `closeOnScrimClick` behaviour.

## 2018-03-06 - New `BpkTouchableNativeFeedback` component

**Added:**

- react-native-bpk-component-touchable-native-feedback: 1.0.0
  - Introduced new `BpkTouchableNativeFeedback` for safe usage of `TouchableNativeFeedback` pre-Lollipop.

**Fixed:**

- react-native-bpk-component-banner-alert: 2.1.5 => 2.1.6
- react-native-bpk-component-button-link: 1.0.0 => 1.0.1
- react-native-bpk-component-button: 4.3.8 => 4.3.9
- react-native-bpk-component-card: 1.2.10 => 1.2.11
- react-native-bpk-component-horizontal-nav: 2.0.20 => 2.0.21
  - Changed every usage of `TouchableNativeFeedback` to `BpkTouchableNativeFeedback`, since it was crashing in Android pre-Lollipop.

## 2018-03-06 - New native link component, new native badge component, plus enhancements for native text input and web badge components

**Added:**

- react-native-bpk-component-button-link: 0.0.2 => 1.0.0

  - Introducing the new React Native button link component.

- react-native-bpk-component-text-input: 2.1.1 => 2.2.0

  - Introduced a new `accessoryView` prop that enables rendering any view on the leading side of the text input.

- react-native-bpk-component-badge: 0.0.0 => 1.0.0
  - Introducing the new React Native badge component.

**Fixed:**

- react-native-bpk-component-button: 4.3.7 => 4.3.8

  - Fixes crash on Android API level &lt; 21

- bpk-component-badge: 1.0.50 => 1.1.0
  - An optional `type` prop has been introduced to allow selection of different visual appearances.

## 2018-03-01 - Fix for Android button props

**Fixed:**

- react-native-bpk-component-button: 4.3.6 => 4.3.7
  - Android buttons now correctly ignore `large` and `iconOnly` props

## 2018-02-28 - Checkboxes and radio buttons can now accept React nodes

**Fixed:**

- bpk-component-checkbox: 1.4.13 => 1.4.14
- bpk-component-radio: 1.2.13 => 1.2.14
  - `label` prop-type is now `node` instead of `string`.

## 2018-02-23 - Popovers and tooltips positioning behaviour can now be customised, plus new native text input `description` prop

**Added:**

- bpk-component-card: 1.0.48 => 1.1.0

  - Added new prop `blank` which when set along with the use of `href` makes the card open the link in a new tab.

- bpk-component-icon: 3.15.5 => 3.16.0

  - Added new HOC `withDescription` to make it easy to provide a textual description of icons for screen readers.

- bpk-component-popover: 2.0.9 => 2.1.0
- bpk-component-tooltip: 3.0.8 => 3.1.0

  - New `popperModifiers` prop. Use this to customise the behaviour of the underlying positioning library. Please refer to its [documentation](https://github.com/FezVrasta/popper.js/blob/v1.12.9/docs/_includes/popper-documentation.md#modifiers) for details.

- react-native-bpk-component-text-input: 2.0.11 => 2.1.0
  - New `description` prop. Use this to add a brief description of the field that will appear underneath it.

**Fixed:**

- react-native-bpk-component-text: 2.1.28 => 2.1.29
  - Removed line height styles, allowing the built in native ones to be used instead.

## 2018-02-19 - Fix for janky RN banner alert animations & a visual update to `plus`, `minus` and `close` icons

**Added:**

- react-native-bpk-component-banner-alert: 2.0.9 => 2.1.0
  - New `bannerStyle` prop. These styles will be applied to the banner alerts outer `View` container, but still within it's animation container. This is useful for maintaining smooth animations whilst applying top/bottom margin.

**Fixed:**

- bpk-component-banner-alert: 2.0.8 => 2.0.9
- bpk-component-close-button: 1.0.49 => 1.0.50
- bpk-component-dialog: 1.0.4 => 1.0.5
- bpk-component-drawer: 1.1.16 => 1.1.17
- bpk-component-icon: 3.15.4 => 3.15.5
- bpk-component-modal: 1.6.4 => 1.6.5
- bpk-component-nudger: 1.0.50 => 1.0.51
- bpk-component-popover: 2.0.8 => 2.0.9
- bpk-mixins: 17.3.4 => 17.3.5
- bpk-svgs: 5.12.1 => 5.12.2
- react-native-bpk-component-banner-alert: 2.0.9 => 2.1.0
- react-native-bpk-component-button: 4.3.3 => 4.3.4
- react-native-bpk-component-icon: 1.3.2 => 1.3.3
  - Updated style of `plus`, `minus` and `close` icons.

## 2018-02-16 - Fixed mouse-clicks not always closing modals and dialogs

**Fixed:**

- bpk-component-modal: 1.6.3 => 1.6.4
- bpk-component-dialog: 1.0.3 => 1.0.4
  - A fix has been put in place to ensure modals and dialogs close when the user taps / clicks on the scrim.

## 2018-02-12 - Increased tap area for close button

**Fixed:**

- bpk-component-banner-alert: 2.0.7 => 2.0.8
- bpk-component-chip: 2.0.1 => 2.0.2
- bpk-component-close-button: 1.0.48 => 1.0.49
- bpk-component-datepicker: 8.0.8 => 8.0.9
- bpk-component-dialog: 1.0.2 => 1.0.3
- bpk-component-drawer: 1.1.14 => 1.1.15
- bpk-component-modal: 1.6.2 => 1.6.3
- bpk-component-popover: 2.0.7 => 2.0.8
  - Increased close button tap area for better touch support.

## 2018-02-09 - Fix for close button alignment in various components

**Fixed:**

- bpk-component-banner-alert: 2.0.6 => 2.0.7
- bpk-component-chip: 2.0.0 => 2.0.1
- bpk-component-close-button: 1.0.47 => 1.0.48
- bpk-component-datepicker: 8.0.7 => 8.0.8
- bpk-component-dialog: 1.0.1 => 1.0.2
- bpk-component-drawer: 1.1.13 => 1.1.14
- bpk-component-modal: 1.6.1 => 1.6.2
- bpk-component-popover: 2.0.6 => 2.0.7
  - Fixed close button alignment issues in some cases (see https://github.com/Skyscanner/backpack/pull/499#issuecomment-364414472)

## 2018-02-09 - `className` support for RTL and grid toggles

**Added:**

- bpk-component-grid-toggle: 1.0.46 => 1.1.0
- bpk-component-rtl-toggle: 1.0.46 => 1.1.0
  - `className` prop is now accepted.

## 2018-02-08 - Breaking changes on chip component, update accordion and datatable

**Breaking:**

- bpk-component-chip: 1.1.42 => 2.0.0
  - `closeLabel` is now a required prop.

**Added:**

- bpk-component-accordion: 1.1.56 => 1.2.0

  - When using `withAccordionItemState`, send all the props to the `BpkAccordion` component.

- bpk-component-datatable: 0.0.11 => 0.1.0
  - Supports changing column used for initial sorting.

## 2018-01-31 - Fix dialog for iOS

**Fixed:**

- bpk-component-dialog: 1.0.0 => 1.0.1
  - Fixed appearance in Safari for iOS.

## 2018-01-30 - New dialog component, clearable inputs, alternate links and full-screen modals!

**Added:**

- bpk-component-dialog: 0.0.5 => 1.0.0

  - New web Dialog component, see https://backpack.github.io/components/web/dialogs/

- bpk-component-input: 3.2.52 => 3.3.0

  - Added `clearButtonMode`, `onClear` and `clearButtonLabel` props. These allow inputs to have an optional clear button that appears when the input is focused.

- bpk-component-link: 1.0.44 => 1.1.0

  - The `alternate` style can now be themed.
  - The `white` prop has been deprecated in favour of `alternate` in `BpkLink` and `BpkButtonLink`

- bpk-component-modal: 1.5.2 => 1.6.0
  - New `fullScreen` prop as an accompaniment to `fullScreenOnMobile`. When true, it trumps the mobile prop.

## 2018-01-24 - Fieldset descriptions

**Added:**

- bpk-component-fieldset: 1.0.48 => 1.1.0
  - Adds a new `description` prop to describe the fieldset component.

**Fixed:**

- bpk-component-label: 3.2.49 => 3.2.50
- bpk-component-fieldset: 1.0.48 => 1.1.0
  - The label now has a bold font weight.

## 2018-01-23 - New `share-android` and `share-ios` icons

**Added:**

- bpk-component-icon: 3.14.20 => 3.15.0
- bpk-mixins: 17.2.6 => 17.3.0
- bpk-svgs: 5.11.13 => 5.12.0
- react-native-bpk-component-icon: 1.2.3 => 1.3.0
  - New icons, `share--android` & `share-ios`.
  - Updated `share` icon visuals.

## 2018-01-19 - Remove `selected` prop from button

**Breaking:**

- bpk-component-button: 1.6.83 => 2.0.0
- bpk-component-loading-button: 1.0.45 => 2.0.0
  - Removed `selected` prop. See the [migration guide](packages/bpk-component-button/docs/migrating-from-v1-to-v2.md).

**Fixed:**

- bpk-component-drawer: 1.1.8 => 1.1.9
  - Drawer components are now full-width on mobile screen sizes.
  - The header now remains fixed to the top of the screen when the drawer content overflows.

**Added**

- bpk-react-utils: 2.4.3 => 2.5.0
  - Portal now accepts a `closeOnEscPressed` prop.
- bpk-component-modal: 1.4.4 => 1.5.0
  - Modal now accepts a `closeOnEscPressed` prop.

## 2018-01-16 - New native button prop for positioning icons

**Added:**

- react-native-bpk-component-button: 4.2.16 => 4.3.0
  - New `iconAlignment` prop allows icons inside buttons to be leading or trailing.

**Fixed:**

- bpk-component-banner-alert: 2.0.0 => 2.0.1
- bpk-component-chip: 1.1.36 => 1.1.37
- bpk-component-close-button: 1.0.41 => 1.0.42
- bpk-component-drawer: 1.1.6 => 1.1.7
- bpk-component-modal: 1.4.2 => 1.4.3
- bpk-component-popover: 2.0.0 => 2.0.1
  - Close button hover / active styles now work in Firefox.

## 2018-01-10 - Replacing Tether with Popper.js and new API for web banner alerts

**Breaking:**

- bpk-component-datepicker: 7.2.5 => 8.0.0
- bpk-component-popover: 1.3.4 => 2.0.0
- bpk-component-tooltip: 2.0.35 => 3.0.0

  - Swapped out tether positioning library in favour of Popper.js
  - Removed `tetherOptions` prop
  - Added `placement` prop, accepts either `top`, `right`, `bottom` or `left`

- bpk-component-popover: 1.3.4 => 2.0.0

  - On mobile screen sizes, popovers now have a margin to prevent them from filling the entire width of their container.

- bpk-component-banner-alert: 1.6.4 => 2.0.0
  - Removed `dismissable` property in favour of `BpkBannerAlertDismissable`.
  - A banner alert with `children` will no longer be automatically expandable. Use the newly introduced `BpkBannerAlertExpandable` component instead.
  - The `ariaLive` prop has been removed from `BpkBannerAlert`.
  - `hideAfter` in `withBannerAlertState` is no longer valid for expandable banner alerts.
  - See the [migration guide](packages/bpk-component-banner-alert/docs/migrating-from-v1-to-v2.md).

**Added:**

- bpk-component-banner-alert: 1.6.4 => 2.0.0
  - Introduced new component for the different banner alert configurations.
    - `BpkBannerAlert` is now the default banner alert.
    - `BpkBannerAlertDismissable` is a banner alert with a dismiss behaviour.
    - `BpkBannerAlertExpandable` is a banner alert with expandable behaviour.

## 2018-01-09 - Prop tweaks, including fix for banner-alert when `show` is `false`

**Fixed:**

- bpk-component-banner-alert: 1.6.3 => 1.6.4

  - Fixed issue where banner was shown if `show` was initially set `false`.

- bpk-component-popover: 1.3.3 => 1.3.4
- bpk-react-utils: 2.4.2 => 2.4.3

  - `target` prop type is now correctly `oneOf([function, node])` instead of `oneOf([function, element])`

- bpk-component-tooltip: 2.0.34 => 2.0.35
  - `target` prop type is now correctly `node` instead of `element`

## 2018-01-04 - Fixing BpkBarChart events for bar hovering and focus

**Added:**

- bpk-component-barchart: 2.1.27 => 2.2.0
  - New `onBarFocus` function prop that is invoked when a bar is focused.

**Fixed:**

- bpk-component-barchart: 2.1.27 => 2.2.0
  - `onBarHover` now correctly attaches hover event.

## 2018-01-03 - New `closeOnScrimClick` prop for scrims and a web banner alert fix

**Added:**

- bpk-component-modal: 1.3.2 => 1.4.0
- bpk-scrim-utils: 3.0.3 => 3.1.0
  - New `closeOnScrimClick` prop, which is `true` by default.

**Fixed:**

- bpk-component-banner-alert: 1.6.2 => 1.6.3
  - Removed usage of `Object.values`.

## 2018-01-03 - New native icons constant

**Added:**

- react-native-bpk-component-icon: 1.1.15 => 1.2.0
  - `icons` object is now exposed, allowing users to refer to icon names using a constant.

## 2017-12-21 - Fix web button warnings

**Fixed:**

- bpk-component-button: 1.6.78 => 1.6.79
  - Fixed react warnings about `PropTypes` and `createClass`.

## 2017-12-21 - Android Support for React Native Banner Alert

**Added:**

- react-native-bpk-component-banner-alert: 1.2.0 => 2.0.0

  - Android support

- bpk-component-banner-alert: 1.5.2 => 1.6.0

  - `withBannerAlertState` HOC, see https://backpack.github.io/components/web/banner-alerts/#withBannerAlertState
  - `bannerClassName` prop added to allow styling to be applied to the internal banner rather than the outer container. See https://backpack.github.io/components/web/banner-alerts/#props

- bpk-component-modal: 1.2.0 => 1.3.0
  - The full screen behaviour on mobile can now be turned off by setting `fullScreenOnMobile` to false

## 2017-12-14 - React Native text inputs now correctly support placeholders

**Fixed:**

- react-native-bpk-component-text-input: 2.0.0 => 2.0.1
  - Reinstated `placeholder` prop support.

## 2017-12-14 - New description list component

**Added:**

- bpk-component-description-list: 1.0.0
  - New description list component. See https://backpack.github.io/components/web/typography#description-lists.

## 2017-12-13 - Fix banner alert `react-transition-group` dependency issues

- bpk-component-banner-alert: 1.5.1 => 1.5.2
  - Downgraded `react-transition-group` to `^1.2.1`.

## 2017-12-13 - Native text input redesign with Android support

**Breaking:**

- react-native-bpk-component-text-input: 1.1.3 => 2.0.0
  - Now supports Android.
  - A new floating label text design.
  - The `placeholder` prop has been removed. If supplied, it will be ignored.
  - The `small` prop has been removed. Existing components using it will now get the standard size.
  - The `disabled` prop has been replaced with `editable`, to follow React Native's built in [TextInput](https://facebook.github.io/react-native/docs/textinput.html) component.
  - A new optional prop, `validationMessage`, allows a message to be shown when `valid={false}`.
  - A new required `label` prop.

## 2017-12-12 - Fix missing dependency

**Fixed:**

- bpk-component-banner-alert: 1.5.0 => 1.5.1
  - fix missing dependency

## 2017-12-12 - Pagination and native star rating components

**Added:**

- bpk-component-pagination: 1.0.0

  - New pagination component. See https://backpack.github.io/components/web/pagination.

- react-native-bpk-component-star-rating: 1.0.0

  - New star rating component. See https://backpack.github.io/components/native/star-rating.

- bpk-component-banner-alert: 1.4.5 => 1.5.0

  - New `dismissable` configuration. See https://backpack.github.io/components/web/banner-alerts
  - New animations available when `show` is toggled. See https://backpack.github.io/components/web/banner-alerts

- react-native-bpk-component-banner-alert: 1.1.13 => 1.2.0
  - New animations available when `show` is toggled. See https://backpack.github.io/components/native/banner-alerts

## 2017-12-06 - More theming support

**Added:**

- bpk-component-drawer: 1.0.1 => 1.1.0
  - Drawer now supports theming.
- bpk-component-slider: 1.0.7 => 1.1.0
  - Slider now supports theming.

## 2017-12-05 - More theming support - modals, popovers, date pickers, checkboxes and radio buttons!

**Added:**

- bpk-component-modal: 1.1.45 => 1.2.0

  - Modal now supports theming.

- bpk-component-popover: 1.2.41 => 1.3.0

  - Popover now supports theming.

- bpk-component-datepicker: 7.1.32 => 7.2.0

  - Date pickers now support theming.

- bpk-react-utils: 2.3.8 => 2.4.0

  - Portal now accepts a `renderTarget` DOM element to render the portal in.

- bpk-component-checkbox: 1.3.40 => 1.4.0
- bpk-component-radio: 1.1.41 => 1.2.0
  - Now supports theming.

**Fixed:**

- bpk-theming: 1.0.0 => 1.0.1
  - The theme provider now accepts arbitrary props (such as `id`)

## 2017-11-30 - New Drawer component and theming support for calendar

**Breaking:**
-bpk-scrim-utils: 2.0.2 => 3.0.0

- Renamed prop: `contentClassName` to `containerClassName` to better reflect usage
- Renamed prop it passes to wrapped component: `getDialogRef` to `dialogRef` to align with convention

**Added:**

- bpk-mixins: 17.0.16 => 17.1.0
  - Adds `$bpk-zindex-drawer`
- bpk-tokens: 26.5.2 => 26.6.0
  - Adds value for drawer z-index.
- bpk-component-calendar: 4.1.27 => 4.2.0
  - Calendar now supports theming.
- bpk-component-drawer: 1.0.0
  - A new component which creates a drawer that slides into view from the side of the screen

## 2017-11-28 - Add support for refs in react-native-bpk-component-text-input

**Added:**

- react-native-bpk-component-text-input:
  - Added new `inputRef` prop to capture the `TextInput` ref.

## 2017-11-27 - Web theming support

**Breaking:**

- bpk-component-horizontal-nav: 1.0.43 => 2.0.0
  - New look in line with the native component

**Added:**

- Theming support:
  Theming support added for:
  - bpk-component-accordion
  - bpk-component-barchart
  - bpk-component-blockquote
  - bpk-component-button
  - bpk-component-horizontal-nav
  - bpk-component-link
  - bpk-component-nudger
  - bpk-component-progress
  - bpk-component-spinner
- bpk-theming: 1.0.0
  - New web theming utility, see https://backpack.github.io/components/utilities/theming
- bpk-component-theme-toggle: 1.0.0
  - New component to help switching themes on the fly

## 2017-11-23 - Fix accidental breaking change in web spinners

**Fixed:**

- bpk-component-loading-button: 1.0.35 => 1.0.36
- bpk-component-spinner: 2.2.0 => 2.2.1
  - Large and extra large now should have a default `type` of `dark`

## 2017-11-23 - Web spinners can now be primary, light or dark

**Added:**

- bpk-component-spinner: 2.1.38 => 2.2.0
  - New `type` prop. Options are `primary`, `light` or `dark`

**Fixed:**

- react-native-bpk-component-banner-alert: 1.1.9 => 1.1.10
- react-native-bpk-component-button: 4.2.6 => 4.2.7
- react-native-bpk-component-horizontal-nav: 2.0.1 => 2.0.2
  - Replaced `TouchableHighlight` with `BpkTouchableOverlay`.

## 2017-11-21 - React Native cards can now have a dividing line

**Added:**

- react-native-bpk-component-card: 1.1.7 => 1.2.0
  - `innerStyle` prop enables the ability to customise inner container styling
  - `withDivider` HOC, see https://backpack.github.io/components/native/cards/#with-divider

## 2017-11-21 - Improved image positioning, dependency upgrades and interface clarifications

**Breaking:**

- bpk-scrim-utils: 1.0.2 => 2.0.0

  - Removed `padded` prop in favour of more generic `contentClassName`
  - Fixed modal white background on iPhone not showing

- bpk-component-image: 1.1.15 => 2.0.0
  - `withLazyLoading` now applies styling options to the wrapper div it creates rather than the lazy loaded component.
  - Any `className` provided to `BpkImage` is now applied to the outermost div in the component.

**Added:**

- bpk-component-banner-alert: 1.3.8 => 1.4.0
  - New `dismissable` configuration, see https://backpack.github.io/components/web/banner-alerts

**Fixed:**

- bpk-component-button: 1.6.71 => 1.6.72

  - SVGs fill colour is automatically set to text colour.

- bpk-component-banner-alert: 1.3.8 => 1.4.0

  - Prevented `dismissButton` being constructed on non-dismissable banner-alerts to fix prop warning.

- bpk-component-image: 1.1.15 => 2.0.0

  - The image no longer positions incorrectly when text-align center is applied to its parent.

- bpk-react-utils: 2.3.7 => 2.3.8
- bpk-component-image: 1.1.15 => 2.0.0

  - Upgraded [react-transition-group](https://github.com/reactjs/react-transition-group) dependency to support React 16.

- bpk-component-fieldset: 1.0.34 => 1.0.35
  - BpkFieldset now correctly warns when the `label` prop is missing.

## 2017-11-17 - New native horizontal nav interface and enhancements to `bpk-animate-height`

**Breaking:**

- react-native-bpk-component-horizontal-nav: 1.0.1 => 2.0.0
  - `BpkHorizontalNavItem` no longer supports the `selected` prop. Instead, add an `id` prop to `BpkHorizontalNavItem` and a `selectedId` prop to `BpkHorizontalNav`. This allows the selected indicator line to animate when the `selectedId` prop changes. See https://backpack.github.io/components/native/horizontal-nav for an example.

**Added:**

- bpk-animate-height: 1.0.32 => 1.1.0
  - New `onAnimationComplete` function prop which is invoked when expand / collapse completes.

## 2017-11-16 - New platform specific extensions for React Native tokens

**Added:**

- bpk-tokens: 26.4.5 => 26.5.0

  - React native tokens can now be imported like so:
    ```
    import { spacingBase } from 'bpk-tokens/tokens/base.react.native';
    ```

- react-native-bpk-component-touchable-overlay: 1.0.0
  - Utility component to be used in favour of RN's TouchableHighlight (https://facebook.github.io/react-native/docs/touchablehighlight.html)

**Fixed:**

- bpk-component-modal: 1.1.38 => 1.1.39

  - Fixed appear animation

- react-native-bpk-component-card: 1.1.4 => 1.1.5

  - Add support for android

- react-native-bpk-component-animate-height:
  - Added props for `expandDelay` and `collapseDelay`.
  - Now removes itself from the tree when collapsed to `height: 0`.

## 2017-11-10 - New `withScrim` HOC, plus native horizontal nav and switch components

**Added:**

- bpk-scrim-utils: 1.0.0

  - New higher order component `withScrim`

- react-native-bpk-component-horizontal-nav: 1.0.0

  - New horizontal nav component, see https://backpack.github.io/components/native/horizontal-nav

- react-native-bpk-component-switch: 1.0.0
  - New switch component, see https://backpack.github.io/components/native/switches

## 2017-11-07 - New slider component

**Added:**

- bpk-component-slider: 1.0.0
  - New slider component, see https://backpack.github.io/components/web/sliders

**Fixed:**

- bpk-component-input: 3.2.36 => 3.2.37
  - Expose BpkInput underlying DOM node ref to parent components.

## 2017-11-06 - Internet explorer compatibility and other bugfixes

**Fixed:**

- bpk-component-calendar: 4.1.20 => 4.1.21
- bpk-component-datepicker: 7.1.22 => 7.1.23

  - Fix for weekend separator not showing in Internet Explorer and Edge.

- react-native-bpk-component-banner-alert: 1.1.5 => 1.1.6

  - Fix icon color of success alert.
  - User style now takes precedence over encapsulated style.

- bpk-animate-height: 1.0.30 => 1.0.31
- bpk-component-accordion: 1.1.37 => 1.1.38
- bpk-component-banner-alert: 1.3.5 => 1.3.6
- bpk-component-fieldset: 1.0.30 => 1.0.31
- bpk-component-form-validation: 1.0.30 => 1.0.31
- bpk-component-grid: 1.1.35 => 1.1.36
  - Removed usage of `Number.isNaN` & `Number.isFinite` which are unsupported in IE

## 2017-11-02 - Popover fix for target element refocus

**Fixed:**

- bpk-component-datepicker: 7.1.21 => 7.1.22
- bpk-component-popover: 1.2.33 => 1.2.34
  - Fix for target element refocus after close

## 2017-11-02 - New React Native Spinner component

**Added:**

- react-native-bpk-component-spinner: 0.0.1 => 1.0.0
  - New spinner component, see https://backpack.github.io/components/native/spinners

## 2017-10-31 - Fix for vertical alignment of text in select inputs

**Fixed:**

- bpk-mixins: 17.0.9 => 17.0.10
- bpk-component-select: 2.1.33 => 2.1.34

  - Fixed text vertical alignment

- bpk-component-icon: 3.14.4 => 3.14.5
- bpk-svgs: 5.11.4 => 5.11.5
  - React SVGs are now functional components as opposed to class components
  - **NOTE:** If you have backpack icon components in your snapshots tests you will see some snapshot failures as a
    result of this change. To minimise against such failures in the future, shallow rendering should be used. In this
    particular example using shallow rendering would have resulted in `Component` showing up instead of `SVG`.

## 2017-10-26 - Fix for Chrome 62 border radius leak

**Fixed:**

- bpk-component-horizontal-nav: 1.0.35 => 1.0.36
  - Explicitly set the border radius to 0 for BpkHorizontalNavItem.

## 2017-10-24 - Android support for button component

**Fixed:**

- react-native-bpk-component-button: 4.1.0 => 4.2.0
- react-native-bpk-component-card: 1.1.0 => 1.1.1
- react-native-bpk-component-animate-height: 1.0.2 => 1.0.3
  - import ViewPropTypes to prevent native build to break at compile time

**Added:**

- react-native-bpk-component-button: react-native-bpk-component-button: 4.1.0 => 4.2.0

  - Add Android support

  **Fixed:**

- bpk-component-nudger:
  - Removed redundant `role="alert"` from nudger input

## 2017-10-20 - Icon support for native buttons and focused prop for native cards

**Added:**

- react-native-bpk-component-card: 1.0.10 => 1.1.0
  - Now accepts a `focused` prop to add emphasis to a card, see https://backpack.github.io/components/native/cards/
- react-native-bpk-component-button: 4.0.4 => 4.1.0
  - The `icon` prop now accepts strings corresponding to a valid `BpkIcon`.
  - Elements can still be passed in as before if required.

**Changed:**

- bpk-component-breakpoint: 1.0.25 => 1.0.26
- Upgraded react-responsive to `v3.0.0` to fix prop type warning.

### 2017-10-18 - New neutral configuration for native and web banner alerts

**Added:**

- react-native-bpk-component-banner-alert: 1.0.1 => 1.1.0
  - New neutral configuration, see https://backpack.github.io/components/native/banner-alerts/

### 2017-10-17 - New native banner alert and animations for web banner alerts

**Added:**

- bpk-component-banner-alert: 1.2.17 => 1.3.1

  - Added animation to expandable banner-alerts + mew neutral configuration. See
  - New neutral configuration, see https://backpack.github.io/components/web/banner-alerts/

- react-native-bpk-component-banner-alert: 0.0.1 => 1.0.1
  - New banner alert component, see https://backpack.github.io/components/native/banner-alerts/

### 2017-10-16 - React Lists and List Items can now have a className prop added

**Added:**

- bpk-component-list:
  - The `className` prop has been added to BpkList and BpkListItem, mirroring functionality in other components that implement the prop

## 2017-10-13 - 17 new icons added and 5 existing icons changed

**Added:**

- bpk-svgs:
  - Added 17 new icons
  - alert--active
  - alert--add
  - alert--expired
  - alert--remove
  - baggage--add
  - baggage--remove
  - data
  - device-mid
  - device-wide
  - direct
  - landmark
  - menu--horizontal
  - menu--vertical
  - thumbs-down
  - thumbs-up
  - window--reduce
  - window

**Updated:**

- bpk-svgs:
  - Modified 5 icons:
    - expand
    - stops
    - new-window
    - ticket
    - time

**Fixed:**

- bpk-react-utils:
- Upgraded [recompose](https://github.com/acdlite/recompose) dependency to support React 16.

## 2017-10-12 - New React Native icon component installation instructions and simpler React Native button API

**Breaking:**

- react-native-bpk-component-button: 3.1.0 => 4.0.0
- The `selected` state has been removed. Buttons using `selected` will fall back and become standard buttons.

**Updated:**

- react-native-bpk-component-icon: 1.0.1 => 1.0.2
  - update installation instruction

## 2017-10-10 - React Native button components can now be themed

**Added:**

- bpk-tokens: 26.3.0 => 26.4.0

  - iOS & Android border size tokens
  - Android elevation tokens
  - iOS touchable highlight underlay tokens
  - iOS shadow tokens
  - iOS & Android radii tokens
  - Update Android text tokens

- react-native-bpk-component-button: 3.0.5 => 3.1.0

  - Primary and secondary buttons can now be themed.

- react-native-bpk-component-banner-alert:
  - New component `BpkBannerAlert`, see https://backpack.github.io/components/native/banner-alerts/

**Fixed:**

- bpk-tokens: 26.3.0 => 26.4.0

  - Fixed package meta data to point to correct entry file
    i.e. `"main": "index.js",` instead of `"main": "tokens/base.default.scss",`

- react-native-bpk-theming: 1.0.2 => 1.0.3

  - Removed TC39 stage 3 proposed syntax from `withTheme` HOC

- react-native-bpk-component-button: 3.0.5 => 3.1.0
- react-native-bpk-component-card: 1.0.5 => 1.0.6
- react-native-bpk-component-icon: 1.0.0 => 1.0.1
- react-native-bpk-component-text-input: 1.0.10 => 1.0.11
- react-native-bpk-component-text: 2.1.9 => 2.1.10
- react-native-bpk-theming: 1.0.2 => 1.0.3
  - React 16 pre-release versions are now supported as peer dependencies
  - i.e. `16.0.0-beta.5`, `16.0.0-rc.1` & `16.0.0` are good

## 2017-10-06 - React Native Icon Component

- react-native-bpk-component-icon: 0.0.4 => 1.0.0

## 2017-10-05 - New native font family tokens

**Added:**

- bpk-tokens: 26.2.2 => 26.3.0
  - iOS `FONT_FAMILY` token
  - Android `FONT_FAMILY` & `FONT_FAMILY_EMPHASIZE` token

**Fixed:**

- bpk-stylesheets: 3.2.64 => 3.2.65

  - Removed `.enable-jp-font-feature-settings` class

- bpk-mixins: 17.0.2 => 17.0.3
- bpk-tokens: 26.2.2 => 26.3.0
- bpk-svgs: 5.10.1 => 5.10.2
  - Re-categorized `STATE_SELECTED_BACKGROUND_COLOR` as `states`

## 2017-10-04 - Fixed ticket "notch" display issue in Safari 11

**Fixed:**

- bpk-component-ticket: 1.1.2 => 1.1.3

  - Ticket notch now displays correctly in Safari 11

- bpk-stylesheets: 3.2.63 => 3.2.64
  - Added ability to have `.enable-font-smoothing` class added to body element

## 2017-10-01 - Add React Native Icon component and Theme Provider

**Added:**

- react-native-bpk-theming 0.0.1 => 1.0.0

  - New `BpkThemeProvider` and `withTheme` utilities, see https://backpack.github.io/components/utilities/theming

- react-native-bpk-component-icon 0.0.1 => 0.0.2
  - New icon component, see https://backpack.github.io/components/native/icons/

## 2017-09-29 - Update tokens types value and add TTF icon font

**Fixed:**

- bpk-tokens:
  - Fixed various `type` values for web, iOS and android tokens e.g:
    - `LINE_HEIGHT_XS`'s type was `font-size` but is now `size`
    - `FONT_SIZE_XS`'s type was `size` but is now `font-size`
    - etc

**Added:**

- bpk-svgs:
  - Added TTF icon font

## 2017-09-27 - Image loading spinner will now be removed from DOM after fading

**Breaking:**

- bpk-mixins: 16.5.5 => 17.0.0
  - Removed image mixins as they are not applicable on their own

**Fixed:**

- bpk-component-image: 1.0.8 => 1.1.0
  - Loading spinner will now be removed from DOM once image is displayed

## 2017-09-26 - Ability to add arbitrary props to ticket stubs

**Added:**

- bpk-component-ticket: 1.0.18 => 1.1.0
  - New props: `stubProps` & `stubClassName`

## 2017-09-26 - New native Card component

**Added:**

- react-native-bpk-component-card: 0.0.3 => 1.0.0
  - New component BpkCard, see https://backpack.github.io/components/native/cards/

## 2017-09-26 - Applying custom styles to buttons is less surprising

**Breaking:**

- react-native-bpk-component-button: 2.0.0 => 3.0.0
  - Previously, applying custom `style` to the button was like so:
    ```
    style={{
      container: {...}
    }}
    ```
    Now things are more in line with expectations:
    ```
    style={{...}}
    ```

## 2017-09-25 - Color tokens can now be made opaque

- bpk-tokens: 26.1.1 => 26.2.0
  - Color tokens can now be made opaque with `setOpacity`

## 2017-09-25 - Bar chart bars now have hooks for hover and touch events

**Added:**

- bpk-component-barchart: 2.0.13 => 2.1.0
  - Added support for hover and touch events on bars.

**Fixed:**

- react-native-bpk-component-text-input: 1.0.3 => 1.0.4
  - Made tap area larger to make activation of the Text Input easier on a touch-device

## 2017-09-21 - New React Native Button properties

**Breaking:**

- react-native-bpk-component-button: 1.0.0 => 2.0.0
  - `title` prop is now required.

**Added:**

- react-native-bpk-component-button: 1.0.0 => 2.0.0
  - New `iconOnly` and `accessibilityLabel` props.

## 2017-09-20 - New React Native Button component

**Added:**

- react-native-bpk-component-button: 0.0.1 => 1.0.0
  - New component, see https://backpack.github.io/components/native/button

## 2017-09-20 - New React Native Text Input component

**Added:**

- react-native-bpk-component-text: 2.0.0 => 2.1.0

  - New `emphasize` prop
  - Error messages when invalid fontWeight and emphasis are used

- react-native-bpk-component-text-input: 0.0.1 => 1.0.0
  - New component, see https://backpack.github.io/components/native/text-input

**Fixed:**

- react-native-bpk-component-text: 2.0.0 => 2.1.0
  - Default color is now `gray700`
  - Passing in a StyleSheet style prop is now supported

## 2017-09-12 - New React Native Text component

**_Note:_** _There was an issue during the package publishing step which resulted in all changed packages being published twice by mistake. Apologies for any confusion._

**Breaking:**

- bpk-tokens: 25.0.0 => 26.0.0
  - Removed iOS and android letter spacing tokens

**Added:**

- react-native-bpk-component-text: 2.0.0
  - New component, see https://backpack.github.io/components/native/text

**Fixed:**

- bpk-animate-height: 1.0.13 => 1.0.14
- bpk-component-accordion: 1.1.20 => 1.1.21
- bpk-component-autosuggest: 3.0.33 => 3.0.34
- bpk-component-badge: 1.0.13 => 1.0.14
- bpk-component-banner-alert: 1.2.7 => 1.2.8
- bpk-component-barchart: 2.0.9 => 2.0.10
- bpk-component-blockquote: 1.1.7 => 1.1.8
- bpk-component-breakpoint: 1.0.13 => 1.0.14
- bpk-component-button: 1.6.52 => 1.6.53
- bpk-component-calendar: 4.1.3 => 4.1.4
- bpk-component-card: 1.0.13 => 1.0.14
- bpk-component-checkbox: 1.3.18 => 1.3.19
- bpk-component-chip: 1.1.8 => 1.1.9
- bpk-component-close-button: 1.0.13 => 1.0.14
- bpk-component-code: 1.0.13 => 1.0.14
- bpk-component-content-container: 1.1.19 => 1.1.20
- bpk-component-datepicker: 7.1.3 => 7.1.4
- bpk-component-fieldset: 1.0.13 => 1.0.14
- bpk-component-form-validation: 1.0.13 => 1.0.14
- bpk-component-grid-toggle: 1.0.13 => 1.0.14
- bpk-component-grid: 1.1.19 => 1.1.20
- bpk-component-heading: 2.1.19 => 2.1.20
- bpk-component-horizontal-nav: 1.0.19 => 1.0.20
- bpk-component-icon: 3.13.1 => 3.13.2
- bpk-component-image: 1.0.3 => 1.0.4
- bpk-component-input: 3.2.20 => 3.2.21
- bpk-component-label: 3.2.19 => 3.2.20
- bpk-component-link: 1.0.13 => 1.0.14
- bpk-component-list: 1.0.13 => 1.0.14
- bpk-component-loading-button: 1.0.13 => 1.0.14
- bpk-component-mobile-scroll-container: 1.0.13 => 1.0.14
- bpk-component-modal: 1.1.20 => 1.1.21
- bpk-component-nudger: 1.0.13 => 1.0.14
- bpk-component-panel: 1.0.13 => 1.0.14
- bpk-component-paragraph: 1.0.13 => 1.0.14
- bpk-component-popover: 1.2.16 => 1.2.17
- bpk-component-progress: 1.0.13 => 1.0.14
- bpk-component-radio: 1.1.19 => 1.1.20
- bpk-component-router-link: 1.0.13 => 1.0.14
- bpk-component-rtl-toggle: 1.0.13 => 1.0.14
- bpk-component-select: 2.1.19 => 2.1.20
- bpk-component-spinner: 2.1.19 => 2.1.20
- bpk-component-star-rating: 1.0.13 => 1.0.14
- bpk-component-table: 1.0.13 => 1.0.14
- bpk-component-text: 1.0.11 => 1.0.12
- bpk-component-textarea: 1.0.13 => 1.0.14
- bpk-component-ticket: 1.0.13 => 1.0.14
- bpk-component-tile: 0.0.18 => 0.0.19 (private)
- bpk-component-tooltip: 2.0.9 => 2.0.10
- bpk-react-utils: 2.3.2 => 2.3.3
  - Prepared for React 16 by supporting it as a peer dependency.

## 2017-09-07 - New fast train icon

**Added:**

- bpk-component-icon: 3.12.1 => 3.13.0
- bpk-mixins: 16.4.1 => 16.5.0
- bpk-svgs: 5.8.0 => 5.9.0
  - Added fast train icon

## 2017-09-06 - Bug fixes in BpkImage

**Fixed:**

- bpk-component-image: 1.0.0 => 1.0.1
  - Fixed issue where lazy-loading HOC would not detect scrolling within a div
  - Image background color will now be removed after the image is shown

## 2017-08-30 - Calendars/Date pickers can now set initially focused date / month

**Added:**

- bpk-component-calendar: 4.0.17 => 4.1.0
- bpk-component-datepicker: 7.0.18 => 7.1.0
  - Added `initiallyFocusedDate` prop that allows controlling which date is initially focused when `selectedDate` is not specified. If not supplied `minDate` will receive focus as before.

## 2017-08-30 - New image component

**Added:**

- bpk-component-image: 1.0.0
  - Added `BpkImage` component
  - Added `withLazyLoading` HOC which allows `BpkImage` to be loaded only when in view
  - Added `withLoadingBehavior` HOC which allows `BpkImage` to be shown only once loaded, displaying a spinner until that point

## 2017-08-25 - New unlock icon

**Added:**

- bpk-component-icon: 3.11.1 => 3.12.0
- bpk-mixins: 16.3.1 => 16.4.0
- bpk-svgs: 5.7.0 => 5.8.0
  - Added 1 new icon (unlock)

**Fixed:**

- bpk-component-button: 1.6.48 => 1.6.49

  - Fixed SyntheticEvent not being passed to the onClick handler.

- bpk-component-table: 1.0.9 => 1.0.10
  - `BpkTableBody`, `BpkTableHead`, `BpkTableHeadCell` & `BpkTableRow` now accept custom classes and arbitrary props

## 2017-08-17 (2) - Fix a missing dependency in several components

**Added:**

- bpk-react-utils: 2.2.2 => 2.3.0
  - Expose recompose's `wrapDisplayName` utility function

**Fixed:**

- bpk-component-accordion: 1.1.15 => 1.1.16
- bpk-component-barchart: 2.0.4 => 2.0.5
- bpk-component-icon: 3.11.0 => 3.11.1
- bpk-component-input: 3.2.15 => 3.2.16
- bpk-component-rtl-toggle: 1.0.8 => 1.0.9
- bpk-component-star-rating: 1.0.8 => 1.0.9
  - Import `wrapDisplayName` from bpk-react-utils instead of directly from recompose

## 2017-08-17 - New icons, customisable table rows, and CommonJS output for React Native

**Added:**

- bpk-component-icon: 3.10.3 => 3.11.0
- bpk-mixins: 16.2.3 => 16.3.0
- bpk-svgs: 5.6.2 => 5.7.0
  - added 1 new icon (cloakroom)
- bpk-tokens: 24.1.0 => 24.2.0
  - Added common JS output for React Native. `bpk-tokens/tokens/{platform}/base.react.native.common.js`

**Fixed:**

- bpk-component-table: 1.0.7 => 1.0.8
  - `BpkTableRow` now accepts arbitrary props
- bpk-component-icon: 3.10.3 => 3.11.0
  - Fixed displayName of `withAlignment` HOC
    **NOTE:** This may break your snapshot tests and thus your build. This is nothing to worry about and the
    snapshots can safely be updated. Just make sure to perform the update in isolation so that all the
    snapshot updates relate to this issue and don't introduce unrelated regressions.

## 2017-08-15 - Added new token outputs for iOS and Android (native and React Native)

**Added:**

- bpk-tokens: 24.0.1 => 24.1.0
  - Added new outputs for the iOS and Android platforms in `bpk-tokens/tokens/ios/base.ios.json`, `bpk-tokens/tokens/ios/base.react.native.es6.js`, `bpk-tokens/tokens/android/base.android.xml` and `bpk-tokens/tokens/android/base.react.native.es6.js`. These interfaces are not to be considered stable yet however and they may still change.

**Fixed:**

- bpk-tokens: 24.0.1 => 24.1.0
  - Remove unused output formats for iOS and Android which aren't relevant when the platform is web.

## 2017-08-11 - BpkBlockQuote design changes and new props for banners

**Added:**

- bpk-component-blockquote: 1.0.5 => 1.1.0
  - Updated match Jon Hicks' design

**Fixed:**

- bpk-component-banner-alert: 1.1.14 => 1.2.0
  - Added support for a custom className and other arbitrary props

## 2017-08-08 - Enhancements to Chip, bug fixed for popover and modal

**Added:**

- bpk-component-chip: 1.0.6 => 1.1.0
  - a `className` prop has been added to allow users to apply their own className
  - a `closeLabel` prop has been added to allow users to specify the label on the close button within the chip

**Fixed:**

- bpk-component-popover: 1.2.7 => 1.2.8
  - Fixed a bug where an on mouse down event starting inside the popover and ending outside the popover would incorrectly close the popover.
  - Fixed issues with mouse interaction in Safari on iOS which caused scrolling behaviour to incorrectly close portal elements.
- bpk-component-modal: 1.1.11 => 1.1.12
  - Fixed issue where clicking below the content in a full-screen modal caused it to incorrectly close.
  - Made touch-interaction consistent with `Portal` behaviour.

## 2017-08-03 - New icons, mobile friendly bar charts, and more styling options for tooltips

**Breaking:**

- bpk-component-tooltip: 1.2.3 => 2.0.0
  - The `className` prop has been renamed to `portalClassName`.
- bpk-component-barchart: 1.0.6 => 2.0.0
  - Increased the tappable area of bar chart bars by default
  - Added new prop `padding` in BpkBarchartBar to support this behaviour

**Added:**

- bpk-component-icon: 3.9.3 => 3.10.0
- bpk-mixins: 16.1.0 => 16.2.0
- bpk-svgs: 5.5.4 => 5.6.0

  - added 3 new icons (legroom-normal, legroom-extra, legroom-reduced)

- bpk-component-tooltip: 1.2.3 => 2.0.0
  - Add `portalStyle` prop that enables styling the tooltip portal.

## 2017-08-03 - Deprecated Heading & Paragraph components

**Changed:**

- bpk-component-heading:
- bpk-component-paragraph:

  - These components are now deprecated, please use `bpk-component-text` instead:

    **bpk-component-heading -> bpk-component-text:**

    If you were relying on the baked-in bottom margin:

    ```
    // old
    <BpkHeading level="h1">My Heading</BpkHeading>

    // new
    <BpkText tagName="h1" textStyle="xxl" className="MyHeading">
      My Heading
    </BpkText>

    .MyHeading {
      margin-bottom: $bpk-spacing-sm;
    }
    ```

    If you were opting out of the baked-in bottom margin:

    ```
    // old
    <BpkHeading level="h1" bottomMargin={false}>My Heading</BpkHeading>

    // new
    <BpkText tagName="h1" textStyle="xxl">My Heading</BpkText>
    ```

    **bpk-component-paragrapg -> bpk-component-text:**

    ```
    // old
    <BpkParagraph>My paragraph.</BpkParagraph>

    // new
    <BpkText tagName="p" textStyle="base" className="MyParagraph">
      My paragraph.
    </BpkText>

    .MyParagraph {
    margin-bottom: $bpk-spacing-sm;
    }
    ```

## 2017-08-03 - Additional "BEM" text mixins plus :bug: fixes

**Added:**

- bpk-mixins: 16.0.0 => 16.1.0

  - Added BEM `bpk-text--XX` mixins for text styles. These are similar but subtly different to existing
    `bpk-text-XX` mixins
  - By default, use the BEM-style mixins:

    ```scss
    .my-component {
      @include bpk-text; // resets margin
      @include bpk-text--sm; // applies sm text style
    }
    ```

  - If you want the text style but need to apply custom margin, use the `bpk-text-xx` stand-alone mixins:

    ```scss
    .my-component {
      margin: $bpk-spacing-sm 0 $bpk-spacing-base 0; // applies custom margin

      @include bpk-text-sm; // applies sm text style
    }
    ```

- bpk-react-utils: 2.1.1 => 2.2.0
  - Added `withDefaultProp` HOC to simplify using the same component with the same props in many places.

**Fixed:**

- bpk-component-table: 1.0.2 => 1.0.3

  - `BpkTableCell`'s now accept arbitrary props and classNames

- bpk-component-icon: 3.9.2 => 3.9.3

  - `withAlignment` HOC uses wrapping `span` to prevent overriding the style of an aligned component

- bpk-component-breakpoint: 1.0.2 => 1.0.3
  - Unpinned `react-responsive` to `^1.3.2` as the breaking change released in `1.3.2` has been resolved

## 2017-07-28 - New Text component and mixins

**Breaking:**

- bpk-mixins: 15.7.1 => 16.0.0

  - Text mixins (`bpk-text-base`, `bpk-text-lg` etc.) now set letter-spacing and font-weight explicitly. This means you
    cannot set `font-weight` any more before including the mixin. Instead, use the new `bpk-text-bold` mixin to embolden
    text:

    ```scss
    .selector {
      @include bpk-text-lg;
      @include bpk-text-bold;
    }
    ```

- bpk-tokens: 23.3.1 => 24.0.0

  - Aliases in `.raw.json` format are now objects with a `value` property i.e.

    ```json
    "WHITE": {
      "value": "#ffffff"
    },
    ```

    ...instead of...

    ```json
    "WHITE": "#ffffff",
    ```

**Added:**

- bpk-mixins: 15.7.1 => 16.0.0

  - New `bpk-text-xs` mixin in addition to the existing text styles (`sm`, `base`, `lg`, `xl`, `xxl`)

- bpk-tokens: 23.3.1 => 24.0.0

  - New theme for iOS, with specific text styles and spacings
  - Text style tokens for the base theme, in line with the new iOS theme

- bpk-component-text: 1.0.0
  - **New component** `BpkText` is the new preferred method for rendering text of all kinds. It utilizes the newly added
    mixins and allows separation of text style and semantics.

**Fixed:**

- bpk-tokens: 23.3.1 => 24.0.0
  - Android colours are now #AARRGGBB instead of #RRGGBBAA

## 2017-07-24 - Icon improvements and fixes

**No change:**

- All packages have moved to GitHub for development

**Fixed:**

- bpk-component-icon: 3.9.0 => 3.9.1
  - Ensure icons are precisely aligned to the grid
  - Scale the accessibility icon to fit the grid (`20px`)
  - Center the close-circle and tick-circle icons in the middle of their container
  - Fix missing glyph on the information--language-alert icon

## 2017-07-18 - Bar chart keyboard nav fix

**Fixed:**

- bpk-component-barchart: 1.0.2 => 1.0.3
  - Fixed a bug where in Chrome navigating a bar chart using the keyboard would overflow and hide half the bars.

## 2017-07-17 - Version stabilisation, Fix for Tooltip z-index, HOC for alignment, Fix for modal close bug

**No change:**

- bpk-animate-height: 0.0.22 => 1.0.0
- bpk-component-badge: 0.1.5 => 1.0.0
- bpk-component-blockquote: 0.1.5 => 1.0.0
- bpk-component-breakpoint: 0.1.28 => 1.0.0
- bpk-component-card: 0.1.5 => 1.0.0
- bpk-component-close-button: 0.1.6 => 1.0.0
- bpk-component-code: 0.1.5 => 1.0.0
- bpk-component-fieldset: 0.3.6 => 1.0.0
- bpk-component-form-validation: 0.1.5 => 1.0.0
- bpk-component-grid-toggle: 0.2.2 => 1.0.0
- bpk-component-link: 0.6.5 => 1.0.0
- bpk-component-list: 0.1.5 => 1.0.0
- bpk-component-loading-button: 0.1.6 => 1.0.0
- bpk-component-mobile-scroll-container: 0.0.6 => 1.0.0
- bpk-component-nudger: 0.1.6 => 1.0.0
- bpk-component-panel: 0.1.5 => 1.0.0
- bpk-component-paragraph: 0.3.5 => 1.0.0
- bpk-component-progress: 0.1.6 => 1.0.0
- bpk-component-router-link: 0.2.5 => 1.0.0
- bpk-component-rtl-toggle: 0.1.2 => 1.0.0
- bpk-component-star-rating: 0.0.11 => 1.0.0
- bpk-component-table: 0.1.6 => 1.0.0
- bpk-component-textarea: 0.1.5 => 1.0.0
- bpk-component-ticket: 0.1.6 => 1.0.0
- bpk-tether: 0.0.4 => 1.0.0
  - The packages have been stabilised at 1.0.0, but there are no breaking changes.

**Added:**

- bpk-component-tooltip: 1.1.5 => 1.2.0

  - A custom class name can now be supplied when rendering `BpkTooltip`.

- bpk-mixins: 15.6.4 => 15.7.0

  - Adds `$bpk-zindex-tooltip`

- bpk-tokens: 23.2.2 => 23.3.0

  - Adds value for tooltip z-index.

- bpk-component-icon: 3.8.0 => 3.9.0
  - `withAlignment` HOC updated to accept props. Existing styling will be spread with the new alignment styling.

**Fixed:**

- bpk-component-modal: 1.1.6 => 1.1.7

  - Fixed a bug where an on mouse down event starting inside the modal and ending outside the modal would incorrectly close the modal.

- bpk-component-tooltip: 1.1.5 => 1.2.0
  - The tooltip now correctly sets an appropriate z-index.

## 2017-07-14 - Datepicker/Breakpoint exception fix

**Fixed:**

- bpk-component-breakpoint: 0.1.27 => 0.1.28
- bpk-component-datepicker: 7.0.5 => 7.0.6
  - Pinned `react-responsive` to `v.1.3.0` as a breaking change was released in `v1.3.2`

## 2017-07-14 - Selectable bar chart

**Breaking:**

- bpk-component-barchart: 0.3.5 => 1.0.0

  - The `onBarClick` callback prop has changed signature:

    ```
    const onBarClick = (e, source) => { ... } // old
    const onBarClick = (e, { source }) => { ... } // new
    ```

**Added:**

- bpk-component-barchart: 0.3.5 => 1.0.0
  - `BpkBarchart`
    - Added `getBarSelection` callback prop which can be used to indicate that a given bar is selected
  - `BpkBarchartBar`
    - Added `selected` prop
- bpk-component-icon: 3.7.5 => 3.8.0
  - Replaced HOC's: `withButtonAlignment` & `withLargeButtonAlignment` with `withAlignment`
  - `withAlignment` provides similar alignment functionality to a given component, taking as extra arguments the line height of the parent and icon components.
  - `withButtonAlignment` & `withLargeButtonAlignment` are still available as wrappers around the new `withAlignment` function.

**Fixed:**

- bpk-component-banner-alert: 1.1.7 => 1.1.8
  - Add alert role to notification for use by accessibility tools

## 2017-07-12 - Add Chip component

**Added:**

- bpk-component-chip: 0.0.1 => 1.0.0
  - Introducing the new chip component: Docs: https://backpack.github.io/components/atoms/chips

**Fixed:**

- bpk-component-horizontal-nav: 1.0.4 => 1.0.5
  - Add tab and tablist roles for use by accessibility tools

## 2017-07-10 - Add `source` argument to popover's `onClose`

**Added:**

- bpk-component-popover: 1.1.3 => 1.2.0
- bpk-react-utils: 2.0.2 => 2.1.0

  - Add `source` argument to `onClose` callback:

    ```
    onClose(event, { source: <string> })
    ```

## 2017-07-10 - Fix undefined property access in progress bar component

**Fixed:**

- bpk-component-progress: 0.1.3 => 0.1.4
  - Fix for progress bar depending on undefined property `bpkColorWhite` -> `colorWhite`

## 2017-07-07 - Add shortcuts to toggle components

**Added:**

- bpk-component-grid-toggle: 0.1.2 => 0.2.0
- bpk-component-rtl-toggle: 0.0.75 => 0.1.0
  - Shortcuts have been added to allow grid and RTL to be toggled using ctrl+cmd+r and ctrl+cmd+g respectively

**Fixed:**

- bpk-component-datepicker: 7.0.0 => 7.0.1
  - When there is no date set, do not populate "aria-label" with "Thursday, 1st January 1970"

## 2017-06-30 - onMonthChange callback structure

**Breaking:**

- bpk-component-calendar: 3.3.2 => 4.0.0
- bpk-component-datepicker: 6.1.3 => 7.0.0
  - The `onMonthChange` signature has changed from `onMonthChange(<Date>)`
    to `onMonthChange(event, { month: <Date>, source: <string> })`

## 2017-06-28 - Fix "tablet-only" mixin/variable

**Fixed:**

- bpk-mixins: 15.6.0 => 15.6.1
- bpk-tokens: 23.2.1 => 23.2.2
  - Fix syntax bug in "tablet-only" Sass variables & mixins

## 2017-06-27 - Small checkbox labels and fix for popover crash

**Added:**

- bpk-component-checkbox: 1.2.0 => 1.3.0
  - New prop `smallLabel` renders the label at a smaller font size suitable for filters etc.
- bpk-mixins: 15.5.0 => 15.6.0
  - New mixins for small checkbox labels suitable for filters etc.

**Fixed:**

- bpk-component-popover: 1.1.0 => 1.1.1
- bpk-react-utils: 2.0.0 => 2.0.1
  - The Popover and Tether don't crash any longer when the popover target does not exist (when using a function)
    **Note:** It's still your job to figure out when the target doesn't exist if you want to log this or send a metric.
    You can do this in the function that you pass as `target` prop to the popover.

## 2017-06-26 - New bar chart component

**Added:**

- bpk-component-barchart: 0.3.0
  - Introducing the new bar chart component:
    Docs: https://backpack.github.io/components/molecules/barcharts

**Fixed:**

- bpk-component-star-rating: 0.0.4 => 0.0.5
  - Changed interactive star implementation from radio buttons to toggle buttons for more consistent cross-browser behaviour

## 2017-06-22 - Mobile side scroll for horizontal nav's

**Breaking:**

- bpk-component-horizontal-nav: 0.1.0 => 1.0.0
  - `spaceAround` is now a prop of `BpkHorizontalNavItem` instead of `BpkHorizontalNav`

**Added:**

- bpk-component-mobile-scroll-container: 0.0.0 => 0.0.1

  - A general purpose component to allow children to scroll horizontally if they overflow their containers

- bpk-component-horizontal-nav: 0.1.0 => 1.0.0
  - Horizontal navs now scroll horizontally using the new component above

**Fixed:**

- bpk-component-table: 0.1.0 => 0.1.1

  - `BpkTable`'s now accept arbitrary props and classNames

- bpk-component-banner-alert: 1.1.0 => 1.1.1
  - The message prop type is now `PropTypes.node` instead of `PropTypes.string` which enables rending more customized messages.

## 2017-06-21 - New star rating component

**Added:**

- bpk-component-star-rating: 0.0.3
  - Introducing the new star rating component:
    Docs: https://backpack.github.io/components/molecules/star-rating

**Fixed:**

- bpk-component-input: 3.2.0 => 3.2.1
  - Fix CSS modules for withOpenEvents classes.

## 2017-06-20 - CSS modules support across all packages

**Breaking:**

- bpk-react-utils:

  - TransitionInitialMount: Removes `classNamePrefix` in favour of `appearClassName` and `appearActiveClassName` for CSS Modules compatibility.

**Added:**

- bpk-component-accordion: 1.0.8 => 1.1.0
- bpk-component-badge: 0.0.54 => 0.1.0
- bpk-component-banner-alert: 1.0.16 => 1.1.0
- bpk-component-blockquote: 0.0.80 => 0.1.0
- bpk-component-calendar: 3.2.4 => 3.3.0
- bpk-component-card: 0.0.68 => 0.1.0
- bpk-component-checkbox: 1.1.10 => 1.2.0

- bpk-component-close-button: 0.0.46 => 0.1.0
- bpk-component-code: 0.0.80 => 0.1.0
- bpk-component-content-container: 1.0.71 => 1.1.0
- bpk-component-datepicker: 6.0.18 => 6.1.0
- bpk-component-fieldset: 0.2.9 => 0.3.0
- bpk-component-form-validation: 0.0.16 => 0.1.0
- bpk-component-grid-toggle: 0.0.87 => 0.1.0
- bpk-component-grid: 1.0.30 => 1.1.0
- bpk-component-heading: 2.0.11 => 2.1.0
- bpk-component-horizontal-nav: 0.0.19 => 0.1.0
- bpk-component-icon: 3.6.0 => 3.7.0
- bpk-component-input: 3.1.7 => 3.2.0
- bpk-component-label: 3.1.7 => 3.2.0
- bpk-component-link: 0.5.36 => 0.6.0
- bpk-component-list: 0.0.100 => 0.1.0
- bpk-component-loading-button: 0.0.28 => 0.1.0
- bpk-component-modal: 1.0.49 => 1.1.0
- bpk-component-nudger: 0.0.30 => 0.1.0
- bpk-component-panel: 0.0.4 => 0.1.0
- bpk-component-paragraph: 0.2.23 => 0.3.0
- bpk-component-popover: 1.0.51 => 1.1.0
- bpk-component-progress: 0.0.28 => 0.1.0
- bpk-component-radio: 1.0.13 => 1.1.0
- bpk-component-router-link: 0.1.86 => 0.2.0
- bpk-component-select: 2.0.24 => 2.1.0
- bpk-component-spinner: 2.0.13 => 2.1.0
- bpk-component-table: 0.0.100 => 0.1.0
- bpk-component-textarea: 0.0.12 => 0.1.0
- bpk-component-ticket: 0.0.21 => 0.1.0
- bpk-component-tooltip: 1.0.1 => 1.1.0
- bpk-mixins: 15.4.0 => 15.5.0
  - Added support for CSS Modules.

## 2017-06-20 - New icons (onsen, language, language-alert, language-question and airline-multiple)

**Added:**

- bpk-component-icon: 3.5.4 => 3.6.0
- bpk-mixins: 15.3.2 => 15.4.0
- bpk-svgs: 5.4.3 => 5.5.0
  - added 4 new icons (onsen, language, language-alert, language-question and airline-multiple)

## 2017-06-14 - Tooltips no longer appear on touch devices

**Breaking:**

- bpk-component-tooltip: 0.0.34 => 1.0.0
  - Added `hideOnTouchDevices` prop (defaults to true) to not render the tooltip on touch-capable devices.
    Prevents the need to double-tap links that have tooltips attached to them.

## 2017-06-13 - Panels release

**Added:**

- bpk-component-panel: 0.0.0 => 0.0.2
- bpk-mixins: 23.1.0 => 23.2.1
- bpk-tokens: 15.2.1 => 15.3.1
  - New panel component (https://backpack.github.io/components/atoms/panels)

:warning: `bpk-tokens@15.3.0`, and `bpk-mixins@23.2.0` were broken due to a previous bad release. Because many packages depend on these versions make sure you're not depending either of them.

## 2017-06-09 - Icon generation from single source, disabled calendar navigation

**Added:**

- bpk-component-calendar: 3.1.11 => 3.2.0
  - `BpkCalendarNav` now accepts a `disabled` prop to disable all navigation elements (buttons and select)

**Fixed:**

- bpk-component-icon: 3.5.0 => 3.5.1
- bpk-svgs: 5.4.0 => 5.4.1
  - All icons are now generated from a single source, rather than large and small SVGs

## 2017-06-05 - Removed the last `prop-type` warning (famous last words)

**Fixed:**

- bpk-react-utils: 1.4.4 => 1.4.5
  - Upgraded to `react-transition-group@1.1.3` (no more prop-type warnings)

## 2017-06-01 - Added 3 icons

**Added:**

- bpk-svgs:5.3.10 => 5.4.0
- bpk-component-icon:3.4.14 => 3.5.0
- bpk-mixins:15.1.0 => 15.2.0
  - added 3 new icons (insurance, baby-carriage and download)

## 2017-05-31 - Reduced dependency bloat of the button component

**Fixed:**

- bpk-component-button: 1.6.25 => 1.6.26
  - Removed the dependency on `bpk-react-utils` to reduce bloat for the button for non tree-shaking consumers

## 2017-05-23 - Autosuggest suggestion values can now accept elements

**Fixed:**

- bpk-component-autosuggest: 3.0.3 => 3.0.4
  - Suggestion `value` attribute is now of a `node` type therefore it accepts: numbers, strings, elements and arrays of them
  - `subHeading` attribute is now of a `node` type too

## 2017-05-23 - Better accordion API, abstraction for input events triggering a modal/popover

**Breaking:**

- bpk-component-accordion: 0.0.17 => 1.0.0
  - New API:
    - `BpkAccordionContainer` is now deprecated
    - Consumers using `BpkAccordionContainer` should now enhance `BpkAccordion` with the `withSingleItemAccordionState`
      higher-order component
    - Consumers using `BpkAccordionContainer` _with_ `allowMultiple` should now use a regular
      `BpkAccordion` component with each `BpkAccordionItem` enhanced using the `withAccordionItemState` higher-order component
    - In each case, `BpkAccordionItem` will now use the `initiallyExpanded` prop for items that should be initially expanded
    - Please refer to [the readme](https://backpack.github.io/components/molecules/accordions#readme) for examples

**Added:**

- bpk-component-input: 3.0.17 => 3.1.0
  - Added a new `withOpenEvents` higher-order component to encapsulate events triggering a modal or popover

## 2017-05-17 - Support for disabled labels, popover fix

**Added:**

- bpk-component-fieldset: 0.1.2 => 0.2.0
- bpk-component-label: 3.0.2 => 3.1.0
- bpk-mixins: 15.0.0 => 15.1.0
- bpk-tokens: 23.0.0 => 23.1.0
  - Labels now accept `disabled` prop to display in a different color when used with a disabled form element

**Fixed:**

- bpk-component-popover: 1.0.41 => 1.0.42
  - Popover now has a z-index on par with autosuggest

## 2017-05-16 - Release new major version of bpk-mixins

**Breaking:**

- bpk-mixins: 14.1.3 => 15.0.0
  - Upgraded `bpk-tokens` to `^23.0.0` which comes with the following breaking change:
    - Renamed `AUTOSUGGEST_LIST_ITEM_FOCUSED_BACKGROUND_COLOR` -> `AUTOSUGGEST_LIST_ITEM_HIGHLIGHTED_BACKGROUND_COLOR`

## 2017-05-16 - Fixed breaking change in bpk-component-autosuggest@2.1.3

**Fixed:**

- bpk-mixins: 14.1.1 => 14.1.3
  - Reverted `bpk-tokens` to `^22.1.0` as a result of a breaking change

## 2017-05-16 - Upgraded autosuggest to latest upstream major version

**Breaking:**

- bpk-component-autosuggest: 2.1.3 => 3.0.0
  - Updated `react-autosuggest` dependency: `8.0.0` => `9.0.1`
  - Upgrade instructions:
    - Change the `focusFirstSuggestion` prop to be `highlightFirstSuggestion`
    - Change the signature of `inputProps.onBlur` from `function onBlur(event, { focusedSuggestion })` to
      `function onBlur(event, { highlightedSuggestion })`
    - For additional (breaking) changes, please refer to
      the [release notes](https://github.com/moroshko/react-autosuggest/releases/tag/v9.0.0)
- bpk-tokens: 22.1.0 => 23.0.0
  - Renamed `AUTOSUGGEST_LIST_ITEM_FOCUSED_BACKGROUND_COLOR` -> `AUTOSUGGEST_LIST_ITEM_HIGHLIGHTED_BACKGROUND_COLOR`

**Fixed:**

- bpk-component-router-link: 0.1.76 => 0.1.77
- bpk-mixins: 14.1.0 => 14.1.1
  - Fixed router link active + visited color
  - Arbitrary props can now be passed through

## 2017-05-09 - Improved calendar performance

**Fixed:**

- bpk-component-datepicker: 6.0.4 => 6.0.5
- bpk-component-calendar: 3.1.3 => 3.1.4
  - Improved update/render performance of several components

## 2017-05-09 - "Required\*" labels for form elements & fixed `prop-types` warnings

**Breaking:**

- bpk-component-label: 2.0.45 => 3.0.0
  - The `label` prop has been deprecated in favour of `children`
  - i.e. `<BpkLabel>My label</BpkLabel>` instead of `<BpkLabel label="My label" />`

**Added:**

- bpk-component-checkbox: 1.0.3 => 1.1.0
- bpk-component-fieldset: 0.0.4 => 0.1.0
- bpk-component-label: 2.0.45 => 3.0.0
  - New `required` prop

**Fixed:**

- All components now depend on `prop-types` directly

## 2017-05-08 - Responsive headings and a new textarea component

**Breaking:**

- bpk-component-heading: 1.2.17 => 2.0.0
- bpk-mixins: 13.1.1 => 14.0.0
- bpk-tokens: 21.1.0 => 22.0.0
  - h1, h2, h3 and h4 heading styles are bumped one level down on mobile
  - i.e. h1 -> h2, h2 -> h3 etc
  - H4, H5 and H6 headings are now bold.
  - Consolidated `hX` margin top/bottom tokens
    - i.e. `H1_MARGIN_TOP` -> `HEADING_MARGIN_TOP` & `H3_MARGIN_BOTTOM` -> `HEADING_MARGIN_BOTTOM`

**Added:**

- bpk-component-textarea: 0.0.0 => 0.0.1
  - New form validation component (https://backpack.github.io/components/atoms/forms#textareas)

**Fixed:**

- bpk-component-datepicker: 6.0.2 => 6.0.3
  - Fixed calendar grid alignment on mobile

## 2017-05-04 - Multiline labels for checkboxes/radio buttons, bug fixes

**Fixed:**

- bpk-component-autosuggest: 2.1.0 => 2.1.1

  - Suggestion component can now receive a className

- bpk-component-checkbox: 1.0.1 => 1.0.2
- bpk-component-radio: 1.0.0 => 1.0.1
- bpk-mixins: 13.1.0 => 13.1.1

  - Checkboxes and radio buttons now display properly with multi line labels

- bpk-component-datepicker: 6.0.1 => 6.0.2
  - Datepicker no longer restores focus to other inputs when closed

## 2017-05-03 - Spinners come with less bloat

**Breaking:**

- bpk-component-spinner: 1.0.57 => 2.0.0
  - Removed `bpk-tokens` dependency which dramatically reduces component bloat
  - Removed explicit `fill` attribute, this is now applied via CSS class
  - Arbitrary props are now passed through to the SVG

**Added:**

- bpk-component-autosuggest: 2.0.32 => 2.1.0

  - `ref` callbacks now work:

    ```
    function storeInputReference(autosuggest) {
      if (autosuggest !== null) {
        this.input = autosuggest.input;
      }
    }

    <BpkAutosuggest ref={storeInputReference} ... />
    ```

## 2017-05-02 - Fluid calendar

**Added:**

- bpk-component-calendar: 3.0.0 => 3.1.0
  - Added prop `fixedWidth` (true by default). If set to `false`, the calendar will be of fluid width (does not
    work with transitions!)

## 2017-05-01 - More flexible calendar with higher-order components

**Breaking:**

- bpk-component-datepicker: 5.0.37 => 6.0.0
- bpk-component-calendar: 2.0.26 => 3.0.0
  - `onMonthChange` callback added
  - BpkCalendarView has been replaced by the higher-order component `composeCalendar`
  - Higher-order component `withCalendarState` has been added to provide focus management and keyboard input
  - Props deprecation
    - Renamed the `date` prop to `selectedDate`; `date` will be removed in future versions
    - Deprecating `dateModifiers`; if needed, the date component can be wrapped in a HOC to add this feature;
      `dateModifiers` will be removed in future versions

## 2017-05-01 - White labels for radio buttons and checkboxes

**Added:**

- bpk-component-checkbox: 1.0.0 => 1.0.1
- bpk-component-radio: 0.0.63 => 1.0.0
- bpk-mixins: 13.0.0 => 13.1.0
  - Radio buttons and checkboxes can now have white labels

## 2017-05-01 - New form validation & fieldset components

**Breaking:**

- bpk-component-checkbox: 0.1.8 => 1.0.0
- bpk-component-radio: 0.0.62 => 0.0.63

  - `label` prop is now required
  - `value` props are no longer magically set to the value of `name` prop if not provided

- bpk-mixins: 12.0.1 => 13.0.0
- bpk-tokens: 20.0.1 => 21.0.0
  - Removed `INPUT_INVALID_BACKGROUND_COLOR` & `SELECT_INVALID_BACKGROUND_COLOR` tokens
  - Removed `bpk-select--invalid` mixin as it was made redundant.

**Added:**

- bpk-animate-height: 0.0.0 => 0.0.1

  - Extracted `AnimateHeight` module out of `bpk-component-accordion` to its own package
  - Added `transitionOverflow` prop to customise the overflow behaviour during the transition

- bpk-component-fieldset: 0.0.0 => 0.0.1

  - New form validation component (https://backpack.github.io/components/atoms/forms#validation)

- bpk-component-form-validation: 0.0.0 => 0.0.1

  - New fieldset component (https://backpack.github.io/components/molecules/fieldsets)

- bpk-component-checkbox:
- bpk-component-radio:
  - Radio buttons and checkboxes can now have white labels

**Fixed:**

- bpk-component-input: 3.0.9 => 3.0.10
- bpk-component-select: 2.0.9 => 2.0.10

  - `aria-invalid` is now set when `valid={false}`

- bpk-component-checkbox: 0.1.8 => 1.0.0
- bpk-component-radio: 0.0.62 => 0.0.63
  - Updated checkbox and radio checked SVGs to use `BLUE_700` color

## 2017-04-20 (1) - Unified colours for hover, active and selected states

**Fixed:**

- bpk-component-datepicker: 5.0.34 => 5.0.35
- bpk-component-calendar: 2.0.23 => 2.0.24
- bpk-component-horizontal-nav: 0.0.3 => 0.0.4
- bpk-mixins: 12.0.0 => 12.0.1
- bpk-tokens: 20.0.0 => 20.0.1
  - Unified colours for hover, active and selected states

## 2017-04-20 (1) - Fixed datepicker prop pass through to input

**Fixed:**

- bpk-component-datepicker: 5.0.33 => 5.0.34
  - Event handlers `onClick`, `onFocus`, `onBlur`, `onKeyDown`, `onKeyUp` and `onTouchEnd`
    are now passed through to the input when provided in `inputProps`

## 2017-04-19 - Fixed datepicker date selection exception

**Fixed:**

- bpk-component-calendar: 2.0.22 => 2.0.23
- bpk-component-datepicker: 5.0.32 => 5.0.33
  - `onDateSelect` is now called after internal state operations have concluded
  - This fixes an internal react exception in the datepicker when selecting dates

## 2017-04-18 - New border mixins

**Breaking:**

- bpk-component-banner-alert: 0.0.51 => 1.0.0
- bpk-mixins: 11.1.3 => 12.0.0
- bpk-tokens: 19.0.2 => 20.0.0
  - Removed superfluous tokens:
    - `MODAL_HEADER_BOX_SHADOW`
    - `BANNER_ALERT_SUCCESS_BOX_SHADOW`
    - `BANNER_ALERT_WARN_BOX_SHADOW`
    - `BANNER_ALERT_ERROR_BOX_SHADOW`
  - Renamed tokens:
    - `BANNER_ALERT_SUCCESS_ICON_FILL` -> `BANNER_ALERT_SUCCESS_COLOR`
    - `BANNER_ALERT_WARN_ICON_FILL` -> `BANNER_ALERT_WARN_COLOR`
    - `BANNER_ALERT_ERROR_ICON_FILL` -> `BANNER_ALERT_ERROR_COLOR`

**Added:**

- bpk-mixins: 11.1.3 => 12.0.0
- bpk-tokens: 19.0.2 => 20.0.0
  - New mixins for applying borders:
    - `@include bpk-border-sm($color);`
    - `@include bpk-border-lg($color);`
    - `@include bpk-border-xl($color);`
  - Each border mixin size above also has an option for top, right, bottom & left borders:
    - `@include bpk-border-top-sm($color);`
    - `@include bpk-border-right-sm($color);`
    - `@include bpk-border-bottom-sm($color);`
    - `@include bpk-border-left-sm($color);`
  - Full docs here https://backpack.github.io/sassdoc/#borders-mixin-bpk-border-sm

**Fixed:**

- bpk-mixins: 11.1.3 => 12.0.0
  - Fixed `@include bpk-border-radius-pill;` mixin as it was completely broken

## 2017-04-17 - Tweaked button selected state color

**Fixed:**

- bpk-component-button: 1.6.13 => 1.6.14
- bpk-mixins: 11.1.2 => 11.1.3
- bpk-tokens: 19.0.1 => 19.0.2
  - Fixed button selected state color

## 2017-04-14 - New horizontal nav component

**Added:**

- bpk-component-horizontal-nav: 0.0.0 => 0.0.1
  - New horizontal navigation component (https://backpack.github.io/components/molecules/horizontal-nav)

## 2017-04-13 - Introducing the new BpkTicket component

**Added:**

- bpk-component-ticket: 0.0.0 => 0.0.1
- bpk-svgs: 5.2.0 => 5.3.0
  - Introducing the new BpkTicket component

## 2017-04-11 - Added deals icon and improved icon not found error handling

**Added:**

- bpk-component-icon: 3.3.19 => 3.4.0
- bpk-mixins: 11.0.3 => 11.1.0
- bpk-svgs: 5.1.3 => 5.2.0
  - Added deals icon

**Fixed:**

- bpk-component-loading-button: 0.0.5 => 0.0.6

  - Add 'withRtlSupport' to default icons

- bpk-mixins: 11.0.3 => 11.1.0
  - Improved error message when incorrect icon name is passed to icon mixins

## 2017-04-05 - Added `legacy` prop to breakpoint component

**Added:**

- bpk-component-breakpoint: 0.0.20 => 0.1.0
  - Add 'legacy' prop to allow component to receive legacy queries

## 2017-04-04 - Popovers now reposition when props change

**Added:**

- bpk-react-utils: 1.3.3 => 1.4.0
  - Add onRender handler to Portal to be called when props are updated

**Fixed:**

- bpk-component-popover: 1.0.26 => 1.0.27
  - Allow repositioning of Portal when props update

## 2017-04-03 - Replacing bpk-component-cta-button with bpk-component-loading-button

**Breaking:**

- bpk-component-cta-button:
  - **This component has been deprecated**
  - Consumers should now use `bpk-component-loading-button` instead

**Added:**

- bpk-component-loading-button: 0.0.0 => 0.0.3
  - Replaces `bpk-component-cta-button`

## 2017-03-31 - Popovers can now attach to native DOM elements

**Breaking:**

- bpk-component-modal: 1.0.23 => 1.0.24

  - Added the ability to pass a custom `className`

- bpk-component-popover: 1.0.24 => 1.0.25
- bpk-react-utils: 1.3.2 => 1.3.3
  - Added the ability to pass a function which returns a DOM element to target prop

## 2017-03-30 - Added new call to action button

**Added:**

- bpk-component-cta-button: 0.0.0 => 0.0.1
  - New call to action button component (https://backpack.github.io/components/atoms/calltoactions)

**Fixed:**

- bpk-component-accordion: 0.0.2 => 0.0.3
  - Aligned `bpk-mixin` dependency

## 2017-03-28 - Fixed disabled state color contrast for checkboxes & radio buttons and more bug fixes

**Fixed:**

- bpk-component-accordion: 0.0.1 => 0.0.2

  - Content in collapsed accordions are now correctly hidden

- bpk-component-popover: 1.0.22 => 1.0.23
- bpk-component-tooltip: 0.0.9 => 0.0.10

  - Popovers and tooltips now flip in RTL when positioned on the side

- bpk-component-checkbox: 0.1.0 => 0.1.1
- bpk-component-radio: 0.0.54 => 0.0.55
- bpk-mixins: 11.0.1 => 11.0.2
- bpk-svgs: 5.1.2 => 5.1.3
  - Fixing disabled states of checkboxes and radio buttons so that they render better on `gray-50` backgrounds.

## 2017-03-27 (2) - New progress bar component

**Added:**

- bpk-component-progress: 0.0.0 => 0.0.1
  - New progress bar component (https://backpack.github.io/components/molecules/progress)

## 2017-03-27 - Ability to add custom style and className props to portal elements

**Fixed:**

- bpk-component-popover: 1.0.20 => 1.0.21
  - Added feature to accept portalStyle and portalClassName props
- bpk-react-utils: 1.3.1 => 1.3.2
  - Added feature for the Portal component to accept custom style and className props

## 2017-03-23 - Introducing the accordion and nudger components

**Added:**

- bpk-component-accordion: 0.0.0 => 0.0.1
  - New accordion component (https://backpack.github.io/components/molecules/accordions/)
- bpk-component-nudger: 0.0.0 => 0.0.1
  - New nudger component (https://backpack.github.io/components/molecules/nudgers/)
- bpk-component-checkbox: 0.0.53 => 0.1.0
  - Added ability to add custom className and other arbitrary props
- bpk-component-paragraph: 0.1.63 => 0.2.0
  - Added ability to add custom className and other arbitrary props

## 2017-03-22 - More flexible docking and changed invalid state for inputs/selects

**Breaking:**

- bpk-component-input: 2.0.17 => 3.0.0
- bpk-component-select: 1.0.31 => 2.0.0
- bpk-mixins: 10.2.1 => 11.0.0
- bpk-tokens: 18.2.1 => 19.0.0
  - Changed the `invalid` state of inputs and selects from a red border to a light red background color.
  - Changed `red-50` to a lighter shade

**Added:**

- bpk-component-input: 2.0.17 => 3.0.0
- bpk-component-select: 1.0.31 => 2.0.0
  - Added `dockedFirst`, `dockedMiddle` and `dockedLast` props to BpkInput and BpkSelect in case you need
    finer control of docked inputs (e.g. when they are not direct sibling elements).

## 2017-03-20 (2) - TravelPro tokens fix

**Fixed:**

- bpk-tokens: 18.2.0 => 18.2.1
  - Some token aliases were not found and failed to be included in output files

## 2017-03-20 (1) - Modal `querySelectorAll` exception fix

**Fixed:**

- bpk-component-modal: 1.0.16 => 1.0.17
  - Locked down `react-transition-group` to `1.0.0` as they introduced a breaking change to the modal

## 2017-03-17 - New "featured" button and a flexible icon mixin

**Added:**

- bpk-component-button: 1.5.22 => 1.6.0
- bpk-mixins: 10.1.1 => 10.2.0
- bpk-tokens: 18.1.0 => 18.2.0
  - Add "featured" variant of buttons
- bpk-mixins: 10.1.1 => 10.2.0
- bpk-svgs: 5.0.5 => 5.1.0
  - Add more flexible `bpk-icon` mixin to include icons of any color

## 2017-03-14 - Fixed overzealous prop type warning in icon components

**Fixed:**

- bpk-component-icon: 3.3.12 => 3.3.13
  - Relaxed `className` prop type in internal component

## 2017-03-13 (2) - Fixed icon alignment on large buttons

**Added:**

- bpk-tokens: 18.0.2 => 18.1.0
  - Add tokens for icon sizes

**Fixed:**

- bpk-component-button: 1.5.21 => 1.5.22
- bpk-component-icon: 3.3.11 => 3.3.12
- bpk-component-spinner: 1.0.42 => 1.0.43
- bpk-mixins: 10.1.0 => 10.1.1
  - Fixed icon alignment on large buttons

## 2017-03-13 (1) - Better disabled checkboxes/radio buttons and better popover contrast

**Added:**

- bpk-mixins: 10.0.1 => 10.1.0
  - Added "layers" mixins for popovers and tooltips

**Fixed:**

- bpk-component-checkbox: 0.0.48 => 0.0.49
- bpk-component-radio: 0.0.48 => 0.0.49
- bpk-mixins: 10.0.1 => 10.1.0
- bpk-svgs: 5.0.3 => 5.0.4
  - Improved checkbox and radio button disabled states
- bpk-component-autosuggest: 2.0.10 => 2.0.11
- bpk-component-popover: 1.0.12 => 1.0.13
  - Improved popover-to-background contrast

## 2017-03-09 - Introducing the Tooltip component

**Added:**

- bpk-component-heading: 1.1.34 => 1.2.0
  - Allow consumers to pass in a custom `className`
- bpk-component-tooltip: 0.0.1
  - Introducing the Tooltip component
- bpk-react-utils: 1.2.2 => 1.3.0
  - The Portal component now accepts a `targetRef` callback for the parent component to receive a ref to the portal's
    target
- bpk-tether: 0.0.1
  - New packages to provide a wrapper around tether and related utilities

## 2017-03-03 (2) - Fixed datauri based icons in stock Android browser

**Fixed:**

- bpk-mixins: 10.0.0 => 10.0.1
- bpk-svgs: 5.0.2 => 5.0.3
  - Removed `style` prop from icon datauri variables
    This fixes the icons rendering on stock android browser

## 2017-03-03 - Fixed padding issues with grid components

**Breaking:**

- bpk-component-grid: 0.1.6 => 1.0.0

  - Removed `padded` prop from `BpkGridContainer` in favour of adding it to `BpkGridRow` components
    i.e. instead of the following:

    ```
    <BpkGridContainer padded={false}>
      <BpkGridRow>
        ...
      </BpkGridRow>
    </BpkGridContainer>
    ```

    ...consumers should now do:

    ```
    <BpkGridContainer>
      <BpkGridRow padded={false}>
        ...
      </BpkGridRow>
    </BpkGridContainer>
    ```

- bpk-mixins: 9.0.2 => 10.0.0

  - Removed `bpk-grid__container--padded` modifier mixin in favour of `bpk-grid__row--padded`
    i.e. instead of the following:

    ```
    .selector {
      @include bpk-grid__container();
      @include bpk-grid__container--padded();
    }
    ```

    ..consumers should now do:

    ```
    .selector {
      @include bpk-grid__row();
      @include bpk-grid__row--padded();
    }
    ```

**Added:**

- bpk-component-grid: 0.1.6 => 1.0.0
- bpk-mixins: 9.0.2 => 10.0.0
  - Added the ability to turn padding off on `BpkGridColumn` components
    Usage: `<BpkGridColumn width={1} padded={false}>Content</BpkGridColumn>`
  - Added the ability to add a custom `className` prop to all grid components
  - Added the ability to add arbitrary props to all grid components

**Fixed:**

- bpk-component-grid: 0.1.6 => 1.0.0
- bpk-mixins: 9.0.2 => 10.0.0

  - Fixed RTL support for grid columns using `offset`

- bpk-component-card: 0.0.37 => 0.0.38
  - Relaxed the `href` prop to no longer be required
  - If an `href` prop isn't provided, the component will render a `<div role="button" />`

## 2017-02-28 (2) - Better border-radius for multiline buttons

**Fixed:**

- bpk-tokens: 18.0.1 => 18.0.2
- bpk-mixins: 9.0.1 => 9.0.2
- bpk-component-button: 1.5.16 => 1.5.17
  - Constrained border-radius of buttons to support multi-line text better.

## 2017-02-28 (1) - Updated shadow opacity

**Fixed:**

- bpk-tokens: 18.0.0 => 18.0.1
  - Increased opacity of small shadow

## 2017-02-27 - Deprecated logo components

**Breaking:**

- bpk-component-logo:

  - **This component has been deprecated**
  - Consumers should now use our internal `bpk-logos` component instead

- bpk-mixins: 8.6.2 => 9.0.0
- bpk-svgs: 4.3.3 => 5.0.0
- bpk-tokens: 17.1.1 => 18.0.0
  - **Removed logo mixins**
  - Consumers who were using logo mixins from these packages should now use
    our internal `bpk-logos` component instead - Sass mixins are available at
    `bpk-logos/sass`

**Fixed:**

- bpk-component-datepicker: 5.0.5 => 5.0.6
  - Month selector used to be automatically opened on iPad

## 2017-02-23 - Tokens as ES6 module

**Added:**

- bpk-tokens: 17.1.0 => 17.1.1
  - Tokens can now be consumed individually or grouped by category using ES6 imports:
    ```
    import { colors, spacingXxl } from 'bpk-tokens/tokens/base.es6';
    ```

## 2017-02-22 (2) - Fixed icon scaling in React components

**Fixed:**

- bpk-component-icon: 3.3.3 => 3.3.4
- bpk-svgs: 4.3.1 => 4.3.2
  - Icon components now scale with custom browser font size

## 2017-02-22 (1) - Improved popover arrow positioning

**Fixed:**

- bpk-component-datepicker: 5.0.2 => 5.0.3
- bpk-component-popover: 1.0.3 => 1.0.4

  - Arrow position now stays true to the target element

- bpk-component-datepicker: 5.0.2 => 5.0.3
- bpk-component-modal: 1.0.3 => 1.0.4
- bpk-component-popover: 1.0.3 => 1.0.4
- bpk-react-utils: 1.2.1 => 1.2.2

  - Fixed `Object.assign` exception in popover based components

- bpk-react-utils: 1.2.1 => 1.2.2
  - Portal now closes on `touchend` instead of `touchstart`

## 2017-02-20 - Removed more traces of `react/lib`

**Fixed:**

- bpk-component-autosuggest: 2.0.0 => 2.0.1
- bpk-component-button: 1.5.10 => 1.5.11
- bpk-component-datepicker: 5.0.1 => 5.0.2
- bpk-component-modal: 1.0.2 => 1.0.3
- bpk-component-popover: 1.0.2 => 1.0.3
- bpk-react-utils: 1.2.0 => 1.2.1
  - Removed more traces of `react/lib` in the components above (bye bye `react-addons-css-transition-group`)
  - Fixed issue with users of Webpack externals and bloated bundles

## 2017-02-17 Improved autosuggest input options & `:visited` link styles

**Breaking:**

- bpk-component-autosuggest: 1.1.11 => 2.0.0
  - Upgraded `react-autosuggest` to `v8.0.0` & made use of `renderInputComponent` to truly compose `bpk-component-input`
    rather than just style the input that `react-autosuggest` renders

**Added:**

- bpk-component-link: 0.4.8 => 0.5.0
- bpk-mixins: 8.5.0 => 8.6.0
- bpk-tokens: 17.0.6 => 17.1.0
  - Added `:visited` link colour of `blue-700`

**Fixed:**

- bpk-component-datepicker: 5.0.0 => 5.0.1
  - Fixed bug with datepicker not closing on IE9

## 2017-02-16 - Added month transitions to calendar and datepicker

**Breaking:**

- bpk-component-datepicker:
- bpk-component-calendar:
  - Separates blocked/focused/selected/outside/today logic from `modifiers` logic. Modifiers now create classes like
    `bpk-calendar-date-modifier--MYMODIFIER` (was `bpk-calendar-date--MYMODIFIER`). This means you cannot mess any more
    with core functionality of the calendar/datepicker.
  - Removes (previously broken) support for blocked dates (except for a min/max date range)

**Added:**

- bpk-component-datepicker:
- bpk-component-calendar:
  - Sliding month transition added when navigation one month backwards or forwards

## 2017-02-15 - Added `fullWidth` option to grid container

- bpk-component-grid: 0.0.36 => 0.1.0

  - Added `fullWidth` prop to `BpkGridContainer` which allows it use the full width of the parent

- bpk-mixins: 8.4.0 => 8.5.0
  - Added `bpk-grid__container--full-width`

## 2017-02-15 - Datepicker / Popover a11y improvements

**Breaking:**

- bpk-component-datepicker: 3.0.0 => 4.0.0

  - Renamed prop `popoverLabel` to `title`

- bpk-component-modal: 0.5.0 => 1.0.0

  - Added new required prop `id` to reduce id naming collisions

- bpk-component-popover: 0.2.0 => 1.0.0
  - Added new required prop `id` to reduce id naming collisions
  - Added new required prop `label` for screen readers
  - Renamed prop `title` to `labelAsTitle` and type is now `bool` instead of `string`
    - **Consumers who were using `title` should now use `label` to set the string and pass `labelAsTitle` accordingly**
  - Popovers now behave a lot better for screen reader users

**Added:**

- bpk-mixins: 8.3.0 => 8.4.0

  - A new `bpk-locale` mixin to help with targeting locale specifics styles. TO BE USED SPARINGLY. Example:
    ```
    @include bpk-locale("ja-JP") {
      /* ja-JP scss goes here */
    }
    ```

- bpk-stylesheets: 3.1.9 => 3.2.0
  - A feature flag class on body `.enable-jp-font-feature-settings` to enable `font-feature-settings`
    for ja-JP locale

## 2017-02-13 - Autosuggest tertiary label bugfix

**Fixed:**

- bpk-component-autosuggest: 1.1.7 => 1.1.8
  - Suggestion tertiary labels will remain on the right hand side regardless of the presence
    of a sub heading

## 2017-02-03 - New sort icon, datepicker now renders in a modal on mobile

**Breaking:**

- bpk-component-datepicker: 2.0.0 => 3.0.0
  - Datepicker renders as a modal on mobile

**Added:**

- bpk-component-breakpoint: 0.0.2

  - A new component which encapsulates Backpacks viewport breakpoints and re-renders children when
    they change

- bpk-component-calendar: 1.1.0 => 1.2.0

  - Now accepts a custom `className` prop

- bpk-component-datepicker: 2.0.0 => 3.0.0
- bpk-component-popover: 0.1.0 => 0.2.0

  - Added opacity transition on open

- bpk-component-icon: 3.2.0 => 3.3.0
- bpk-mixins: 8.2.0 => 8.3.0
- bpk-svgs: 4.2.0 => 4.3.0

  - Added sort icon

- bpk-component-modal: 0.4.0 => 0.5.0

  - Now accepts a `target` prop - helpful for avoiding wrapper divs

- bpk-react-utils: 1.1.0 => 1.2.0
  - Added `TransitionInitialMount` to help with CSS transitions (from `bpk-component-modal`)

## 2017-02-02 - New Pin icon and calendar/datepicker fixes

**Breaking:**

- bpk-component-calendar: 0.0.7 => 1.0.0
- bpk-component-datepicker: 0.0.3 => 1.0.0
  - Removed "selected date" state management from components, which is not in the consumer's responsibility

**Added:**

- bpk-component-icon: 3.0.1 => 3.1.0
- bpk-mixins: 8.0.1 => 8.1.0
- bpk-svgs: 4.0.1 => 4.1.0
  - Pin icon

**Fixed:**

- bpk-component-calendar: 0.0.7 => 1.0.0
  - `minDate` and `maxDate` props are now internally set to the start of that day

## 2017-01-31 - Introducing the popover, calendar and datepicker components

**Added:**

- bpk-component-calendar: 0.0.7
  - New calendar component (https://backpack.github.io/components/molecules/calendar/)
- bpk-component-datepicker: 0.0.3
  - New datepicker component (https://backpack.github.io/components/molecules/datepicker/)
- bpk-component-popover: 0.0.5
  - New popover component (https://backpack.github.io/components/molecules/popovers/)

## 2017-01-26 - Input prop types are less strict & new portal implementation

**Breaking:**

- bpk-component-input: 1.0.14 => 2.0.0

  - Props `placeholder` and `onChange` are no longer required and are not explicitly listed in prop types any more

- bpk-react-utils: 0.1.0 => 1.0.0
  - deprecated `toPortalChild`
  - `react` & `react-dom` are now peer dependencies

**Added:**

- bpk-react-utils: 0.1.0 => 1.0.0
  - New `Portal` implementation - to be used instead of third party `react-portal`

**Fixed:**

- bpk-component-modal: 0.3.9 => 0.3.10
  - Swapped `react-portal` in favour of `bpk-react-utils` implementation

**The following packages received a patch bump due to the dependency changes above:**

- bpk-component-autosuggest: 1.1.3 => 1.1.4
- bpk-component-button: 1.5.3 => 1.5.4

## 2017-01-23 - Visual improvements to some icons, new 'headset' icon, fixed icon scaling issue when consumed via mixins, and fixed spinner scaling issue when consumed via both mixins and react component.

**Breaking:**

- bpk-component-icon: 2.0.0 => 3.0.1
- bpk-mixins: 7.0.0 => 8.0.1
- bpk-svgs: 3.0.0 => 4.0.1
  - Account: updated icon shape with sharper bottom edge and more angled shoulders.
  - Airports: simplified shape.
  - Arrows: scaled shape to suit baseline grid
  - Chevrons: scaled shape to suit baseline grid
  - City: simplified shape.
  - Edit: simplified shape, removed incongruous style from LG size.
  - Globe: improvements to shape. Music - simplified shape.
  - News: revised design to be front view rather than fake-3D
  - Plane seat: revised design to not look like a dentist chair
  - Upgrade: changed to not look like a mushroom

**Added:**

- bpk-mixins: 7.0.0 => 8.0.1
- bpk-svgs: 3.0.0 => 4.0.1
- bpk-component-icon: 2.0.0 => 3.0.1
  - Added headset icon

**Fixed:**

- bpk-component-spinner: 1.0.26 => 1.0.28
  - React components will now scale with user font size preference
- bpk-mixins: 7.0.0 => 8.0.1
  - Icons & Spinners consumed via mixins will now scale with user font size preference

## 2017-01-13 - Deprecated "stubby arrow" icon and fixed "onClose firing twice bug" in the modal

**Breaking:**

- bpk-component-icon: 1.3.2 => 2.0.0
- bpk-mixins: 6.8.0 => 7.0.0
- bpk-svgs: 2.2.1 => 3.0.0
  - Removed 'stubby' long-arrow-X icons
  - Renamed long-arrow-X-alt icons to long-arrow-X
  - Consumers who were relying on the 'alt' long arrow should now use the regular version and those who were using the regular version will now see a new style.

**Added:**

- bpk-component-close-button: 0.0.0 => 0.0.1
  - Pulled close button icon out of BpkModal for use in new popover component too
- bpk-react-utils: 0.0.1 => 0.1.0
  - Added `toPortalChild` helper

**Fixed:**

- bpk-component-icon: 1.3.2 => 2.0.0
- bpk-mixins: 6.8.0 => 7.0.0
- bpk-svgs: 2.2.1 => 3.0.0
  - chevron icon has been made more pointy
  - long-arrow arrows have a slightly updated style
- bpk-component-modal: 0.3.6 => 0.3.7
  - `onClose` called twice
  - Now consumes `bpk-component-close-button`

## 2017-01-11 - Custom classNames and arbitrary props for bpk-component-link

**Added:**

- bpk-component-link: 0.3.13 => 0.4.0
  - BpkLink and BpkButtonLink now pass through arbitrary props to `<a>` and `<button>` tag respectively
  - BpkLink and BpkButtonLink now properly handle className passed as prop

**The following packages received a patch bump due to the dependency changes above:**

- bpk-component-grid-toggle: 0.0.41 => 0.0.42
- bpk-component-modal: 0.3.5 => 0.3.6
- bpk-component-rtl-toggle: 0.0.25 => 0.0.26
- bpk-docs: 0.0.54 => 0.0.55

## 2017-01-10 - Added inline styling and CSS module support for button & autosuggest

**Added:**

- bpk-react-utils: 0.0.0 => 0.0.1

  - A new package to house backpack react component utilities, starting with a CSS module helper

- bpk-component-autosuggest: 1.0.11 => 1.1.0
- bpk-component-button: 1.4.4 => 1.5.0

  - Added dependency on `bpk-react-utils`
  - Added CSS module support

- bpk-component-button: 1.4.4 => 1.5.0

  - All additional/custom props are now passed through to `<button>` tag, including `style`

- bpk-mixins: 6.7.1 => 6.8.0
  - Added CSS module support (workaround for global `.bpk-no-touch-support` class)

## 2016-12-22 - Work around React regression in BpkButton

**Fixed:**

- bpk-component-button: 1.4.3 => 1.4.4
  - onClick event no longer fires on disabled buttons in Chrome, see https://github.com/facebook/react/pull/8329

**The following packages received a patch bump due to the dependency changes above:**

- bpk-component-modal: 0.3.3 => 0.3.4
- bpk-docs: 0.0.52 => 0.0.53

## 2016-12-21 - Updated yellow colours

**Breaking:**

- bpk-tokens: 17.0.0 => 17.0.1
- bpk-mixins: 6.7.0 => 6.7.1
  - updated tokens for yellow colours to make it a bit easier to read when used for text e.g. colour coded prices on month view.

## 2016-12-15 - Added toilets icon and added travelpro tokens

**Added:**

- bpk-mixins: 6.6.0 => 6.7.0
- bpk-svgs: 2.1.0 => 2.2.0
- bpk-component-icon: 1.2.0 => 1.3.0

  - Toilets icon

- bpk-tokens: 16.1.0 => 17.0.0
  - added travelpro tokens

## 2016-12-12 - Added power icon and tidied up Segoe flag from base stylesheet

**Breaking:**

- bpk-stylesheets: 3.0.2 => 3.1.0
- bpk-tokens: 16.0.0 => 16.1.0
  - Removed all traces of Segoe, including `FONT_FAMILY_SEGOE` and `.font-family-segoe`
  - Only bumped minor because we are certain that scaffold was the only consumer of this

**Added:**

- bpk-component-icon: 1.1.21 => 1.2.0
- bpk-svgs: 2.0.17 => 2.1.0
- bpk-mixins: 6.5.1 => 6.6.0
  - Power icon

## 2016-12-07 - Updated hover and active styles for primary buttons

**Breaking:**

- bpk-component-modal: 0.2.0 => 0.3.0

  - Removed aria-describedby attribute from modal, so screen reader does not read whole dialog contents

- bpk-component-button: 1.3.0 => 1.4.0

  - Changed hover and active states for primary buttons (including selected)

- bpk-tokens: 15.1.0 => 16.0.0
  - updated tokens for primary button hover and active states

## 2016-11-24 - Icon-only buttons, modal change, code bugfix

**Breaking:**

- bpk-component-modal: 0.1.1 => 0.2.0
  - scrim color changed to make it darker (gray 300, 70% opacity).

**Added:**

- bpk-tokens: 15.0.0 => 15.1.0
  - Added x-padding tokens for icon-only buttons (regular and large)
- bpk-mixins: 6.4.2 => 6.5.0
  - Added mixins for icon-only buttons (regular and large)
- bpk-component-button: 1.2.4 => 1.3.0
  - Added icon-only button variant

**Fixed:**

- bpk-component-code: 0.0.29 => 0.0.30
- bpk-mixins: 6.4.2 => 6.5.0
  - Fixed border radius and padding for code components

## 2016-11-21 - Removed Segoe UI from base font stack

**Breaking:**

- bpk-tokens: 14.4.1 => 15.0.0
  - Removed `Segoe UI` from the base font stack
  - Added alternative font stack including `Segoe UI`
- bpk-stylesheets: 2.0.10 => 3.0.0
  - Enabled the alternative font stack with `Segoe UI` when the `font-family-segoe` class is added to `<body>`

## 2016-11-18 - Updated React to 15.4.0

**Fixed:**

- Updated React to 15.4.0
- bpk-component-modal: 0.0.12 => 0.1.0
  - Updated dependencies for compatibility with current and future React versions
- bpk-svgs: 2.0.13 => 2.0.14
  - Added explicit dependency on `tinycolor2`

## 2016-11-15 - New badge component

**Added:**

- bpk-component-badge: 0.0.0 => 0.0.1
- bpk-mixins: 6.3.1 => 6.4.0
- bpk-tokens: 14.3.0 => 14.4.0
  - New badge component - limited for now to unblock the ads team

## 2016-11-09 - Destructive buttons `disabled` bugfix ;)

**Added:**

- bpk-tokens: 14.2.0 => 14.3.0
  - Added tokens for destructive button `disabled` state

**Fixed:**

- bpk-component-button: 1.2.0 => 1.2.1
- bpk-mixins: 6.3.0 => 6.3.1
- bpk-tokens: 14.2.0 => 14.3.0

  - Fixed destructive button `disabled` state

- bpk-component-button: 1.2.0 => 1.2.1
  - Fixed link button border radius in safari

## 2016-11-09 - Destructive buttons

**Added:**

- bpk-component-button: 1.1.7 => 1.2.0
- bpk-mixins: 6.2.0 => 6.3.0
- bpk-tokens: 14.1.0 => 14.2.0
  - Added `destructive` button style

## 2016-11-09 - Docked inputs & selects

**Breaking:**

- bpk-component-input: 0.0.20 => 1.0.0
- bpk-component-label: 1.0.2 => 2.0.0
- bpk-component-select: 0.0.20 => 1.0.0

  - Added use of `transform-object-rest-spread` so make sure you add it to your `.babelrc`

- bpk-component-input: 0.0.20 => 1.0.0

  - `placeholder` prop is now required

- bpk-component-select: 0.0.20 => 1.0.0
  - `options` prop is now deprecated, just pass options as children like normal

**Added:**

- bpk-component-input: 0.0.20 => 1.0.0
- bpk-component-label: 1.0.2 => 2.0.0
- bpk-component-select: 0.0.20 => 1.0.0

  - We are opting for a prop "pass through" approach, which means any additional props passed to these components
    will be rendered i.e. the backpack component wont swallow it up
  - This means that consumers can now add custom `className` props - they will be added to classes already supplied
    by backpack

- bpk-component-input: 0.0.20 => 1.0.0
- bpk-component-select: 0.0.20 => 1.0.0
- bpk-mixins: 6.1.1 => 6.2.0
- bpk-tokens: 14.0.0 => 14.1.0
  - Inputs & selects can now be made `large` & `docked` for one line search forms
  - Sass mixin API is as follows:
    - `@include bpk-input--docked-first-child;`, `@include bpk-input--docked-last-child;` and
      `@include bpk-input--docked-middle-child;` are available for fine grained control
    - `@include bpk-input--docked;` is available as a combo of the above which uses pseudo selectors behind the scenes
      to apply styles accordingly - it requires inputs / selects are placed together.

## 2016-11-04 - Autosuggest improvements

**Breaking:**

- bpk-component-autosuggest: 0.0.17 => 1.0.0

  - Updated to `^7.0.1` of `react-autosuggest`
  - Removed padding from suggestion containers with the idea

- bpk-tokens: 13.1.0 => 14.0.0

  - Removed automatic pluralisation of SCSS category names. This affects all token formats except
    SCSS. Examples include: `animation` -> `animations`, `box-shadow` -> `box-shadows` etc

- bpk-component-autosuggest: 0.0.17 => 1.0.0
  - Added `BpkAutosuggestSuggestion` component

## 2016-11-02 - Links can now be white

**Added:**

- bpk-component-link: 0.2.4 => 0.3.0
- bpk-mixins: 6.0.0 => 6.1.0
- bpk-tokens: 13.0.0 => 13.1.0
  - Links can now be white

## 2016-11-01 - Form labels are darker by default

**Breaking:**

- bpk-component-label: 0.0.17 => 1.0.0
- bpk-mixins: 5.6.1 => 6.0.0
- bpk-tokens: 12.5.0 => 13.0.0
  - Changed default label color to `gray-700` instead of `gray-300`

**Added:**

- bpk-component-label: 0.0.17 => 1.0.0
- bpk-mixins: 5.6.1 => 6.0.0
  - Labels can now be white

## 2016-10-31 - Select component IE background color fix

**Fixed:**

- bpk-mixins: 5.6.0 => 5.6.1
- bpk-component-select: 0.0.16 => 0.0.17
  - Fixed select background color on IE

## 2016-10-18 - Added animation duration tokens and variables

**Added:**

- bpk-tokens: 12.4.1 => 12.5.0
- bpk-mixins: 5.5.0 => 5.6.0
  - Added duration variables: `$bpk-duration-xs`, `$bpk-duration-sm` & `$bpk-duration-base`

**Fixed:**

- bpk-mixins: 5.5.0 => 5.6.0
- bpk-component-card: 0.0.6 => 0.0.7

  - Aligned card component animation to new duration variables

- bpk-component-modal: 0.0.3 => 0.0.4
  - Aligned modal component animations to new duration variables

## 2016-10-17 (2) - Disable `:hover` effects on touch devices

**Breaking:**

- bpk-stylesheets: 1.0.14 => 2.0.0
  - Added small JavaScript utility to add feature detection classes to html element
  - Consumers now have to include `/node_modules/bpk-stylesheets/base.js` as well as `/node_modules/bpk-stylesheets/base.css`
    on the page.
  - Default module export is now uncompiled `/index.js` which contains both script and style, with `/base.css` & `/base.js`
    exposed for compiled access

**Added:**

- bpk-mixins: 5.4.0 => 5.5.0
  - Added `bpk-hover` mixin to apply `:hover` effects to non-touch devices only

**Fixed:**

- bpk-component-banner-alert: 0.0.4 => 0.0.5
- bpk-component-modal: 0.0.2 => 0.0.3
- bpk-component-button: 1.1.0 => 1.1.1
- bpk-component-link: 0.2.0 => 0.2.1
- bpk-mixins: 5.4.0 => 5.5.0
  - `:hover` effects now disabled on touch devices

## 2016-10-17 (1) - Ability to add custom `className` to button

**Added:**

- bpk-component-button: 1.0.24 => 1.1.0
  - Can now pass through custom `className` to button

## 2016-10-13 - Modal component

**Added:**

- bpk-component-modal: 0.0.0 => 0.0.1

  - New modal component

- bpk-component-heading: 1.0.23 => 1.1.0

  - Ability to remove bottom margin from headings

- bpk-component-link: 0.1.22 => 0.2.0

  - Ability to style buttons as links

- bpk-mixins: 5.3.3 => 5.4.0
  - New modal component
  - Ability to remove bottom margin from headings
  - Ability to style buttons as links

**Fixed:**

- bpk-component-card: 0.0.4 => 0.0.5
  - Increased border radius

## 2016-09-28 (2) - Button wrap fix

**Fixed:**

- bpk-component-button: 1.0.22 => 1.0.23
- bpk-mixins: 5.3.2 => 5.3.3
  - Button text can now wrap

## 2016-09-28 (1) - Banner Alert Component

**Added:**

- bpk-component-banner-alert: 0.0.0 => 0.0.1
- bpk-tokens: 12.2.0 => 12.3.0
  - New banner alert component with success, warn and error variations

**Fixed:**

- bpk-component-blockquote: 0.0.14 => 0.0.15
- bpk-component-card: 0.0.2 => 0.0.3
- bpk-component-code: 0.0.14 => 0.0.15
- bpk-component-list: 0.0.34 => 0.0.35
  - Added missing "required" prop types

## 2016-09-27 - Card flicker on safari fix

**Fixed:**

- bpk-component-card: 0.0.1 => 0.0.2
- bpk-mixins: 5.3.0 => 5.3.1
  - Bug with card component animation causes flicker in Safari Version 10.0 (10602.1.50.0.10)

## 2016-09-26 - Card component

**Added:**

- bpk-component-card: 0.0.0 => 0.0.1
- bpk-mixins: 5.2.0 => 5.3.0
- bpk-tokens: 12.1.1 => 12.2.0
  - New 'card' component for clickable/touchable surfaces such as itineraries, news articles etc

## 2016-09-21 (2) - Mixin option for opt-in RTL support for icons

**Added:**

- bpk-mixins: 5.1.0 => 5.2.0
  - New mixin `bpk-icon--rtl-support` for RTL support in icons

## 2016-09-21 (1) - Opt-in RTL support for bpk-component-icon

Consumers should now add the `transform-object-rest-spread` plugin to their `.babelrc` as all components may or may not depend
on it.

**Added:**

- bpk-component-rtl-toggle: 0.0.0 => 0.0.1

  - New component to help with testing RTL layouts

- bpk-component-icon: 1.0.1 => 1.1.0
  - Three new HOC's: `withButtonAlignment`, `withLargeButtonAlignment` & `withRtlSupport`
  - `withRtlSupport` provides RTL support for icons on an opt-in basis (as not all icons should be flipped in RTL layouts)
  - `alignToButton` & `alignToLargeButton` remain (but are aliases to `withButtonAlignment` & `withLargeButtonAlignment`
    respectively)

**Fixed:**

- bpk-component-autosuggest: 0.0.5 => 0.0.6
  - Removed padding from right hand side of suggestion container (RTL fix)

## 2016-09-21 - RTL fixes

**Added:**

- bpk-mixins: 5.0.1 => 5.1.0
  - `bpk-rtl` mixin to help with targeting RTL specific styles

**Fixed:**

- bpk-tokens: 12.1.0 => 12.1.1

  - The values for `INPUT_PADDING_X` and `INPUT_PADDING_Y` were the wrong way around

- bpk-mixins: 5.0.1 => 5.1.0
- bpk-component-blockquote: 0.0.10 => 0.0.11
- bpk-component-code: 0.0.10 => 0.0.11
- bpk-component-input: 0.0.7 => 0.0.8
- bpk-component-select: 0.0.7 => 0.0.8
- bpk-component-table: 0.0.30 => 0.0.31
  - Fixed RTL support

## 2016-09-20 - SVG icon/logo/spinner bundling fixes

**Breaking:**

- bpk-svgs: 1.0.4 => 2.0.0

  - Added `width` & `height` to icon SVGs
  - Generating react components for each SVG
    using [react-svg-loader CLI](https://github.com/boopathi/react-svg-loader#cli).

- bpk-component-spinner: 0.2.12 => 1.0.0

  - We now expose three components `BpkSpinner`, `BpkLargeSpinner`, `BpkExtraLargeSpinner`
  - No need for raw-loader any more

- bpk-component-logo: 0.2.8 => 1.0.0

  - We now expose five components `BpkInlineLogo`, `BpkCloudLogo`, `BpkStackedLogo`, `BpkTianxunLogo`, `BpkTianxunStackedLogo`
  - No need for raw-loader any more

- bpk-component-icon: 0.2.12 => 1.0.0
  - We now expose hundreds of components (generated in bpk-svgs)
  - No need for raw-loader any more
  - Alignment to buttons is supported using higher order components (HOC)

**Added:**

- bpk-tokens: 12.0.0 => 12.1.0
  - Surfaced `SPACING_MD` (`18px`) as a token

**Fixed:**

- bpk-mixins: 5.0.0 => 5.0.1
  - No fundamental API changes but a lot of the handling for inline SVGs has been removed.

## 2016-09-14 - Autosuggest tweaks

**Breaking:**

- bpk-component-autosuggest@0.0.3
  - Interface now conforms to `react-autosuggest` 100%
  - Fixed bug with arrow displaying even when the suggestion were hidden

## 2016-09-13 - Content container changes & initial version of Autosuggest

**Added:**

- bpk-component-autosuggest@0.0.2
  - Initial version to be tested by B2B widgets squad

**Breaking:**

- bpk-component-content-container@1.0.0
  - no longer applying styling to bare html in content container by default, instead consumers can opt in using
    `bareHtml` prop
  - nested content containers have bottom margin
- bpk-mixins@5.0.0
  - no longer applying styling to bare html in content container by default, instead consumers can opt in using
    the `bpk-content-container--bare-html` mixin
- bpk-tokens@12.0.0
  - re-categorised some tokens for typesetting

**Fixed:**

- bpk-component-grid@0.0.3
  - added a `display: block;` to columns to override any `display: none;`'s as a result of setting width to 12

## 2016-09-07 - Box shadows!

**Added:**

- bpk-mixins: 4.0.0 => 4.1.0
  - Added mixins for box shadows and border-radii
- bpk-tokens: 11.0.0 => 11.1.0
  - Added tokens for box shadows
