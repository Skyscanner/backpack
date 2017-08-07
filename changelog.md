# Backpack changelog

## UNRELEASED

**Added:**
- bpk-component-chip:
  - a `className` prop has been added to allow users to apply their own className
  - a `closeLabel` prop has been added to allow users to specify the label on the close button within the chip

**Fixed:**
- bpk-component-popover
  - Fixed a bug where an on mouse down event starting inside the popover and ending outside the popover would incorrectly close the popover.

## 2017-08-03 - New icons, mobile friendly barcharts, and more styling options for tooltips

**Breaking:**
- bpk-component-tooltip: 1.2.3 => 2.0.0
  - The `className` prop has been renamed to `portalClassName`.
- bpk-component-barchart: 1.0.6 => 2.0.0
  - Increased the tappable area of barchart bars by default
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
  - Added BEM `bpk-text--XX` mixins for text styles. These are similar but subtley different to existing
    `bpk-text-XX` mixins
  - By default, use the BEM-style mixins:

    ```scss
    .my-component {
      @include bpk-text;     // resets margin
      @include bpk-text--sm; // applies sm text style
    }
    ```

  - If you want the text style but need to apply custom margin, use the `bpk-text-xx` standalone mixins:

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
  - Unpinned `react-responsive` to ^v1.3.2 as the breaking change released in v1.3.2 has been resolved

## 2017-07-28 - New Text component and mixins

**Breaking:**
- bpk-mixins: 15.7.1 => 16.0.0
  - Text mixins (`bpk-text-base`, `bpk-text-lg` etc.) now set letter-spacing and font-weight explicitly. This means you
  cannot set `font-weight` anymore before including the mixin. Instead, use the new `bpk-text-bold` mixin to bolden
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
  - New `bpk-text-xs` mixin in addition to the existing text styles (sm, base, lg, xl, xxl)

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
- All packages have moved to Github for development

**Fixed:**
- bpk-component-icon: 3.9.0 => 3.9.1
  - Ensure icons are precisely aligned to the grid
  - Scale the accessibility icon to fit the grid (20px)
  - Center the close-circle and tick-circle icons in the middle of their container
  - Fix missing glyph on the information--language-alert icon


## 2017-07-18 - Bar chart keyboard nav fix

**Fixed:**
- bpk-component-barchart: 1.0.2 => 1.0.3
  - Fixed a bug where in Chrome navigating a barchart using the keyboard would oveflow and hide half the bars.

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
  - The packages have been stablised at 1.0.0, but there are no breaking changes.

**Added:**
- bpk-component-tooltip: 1.1.5 => 1.2.0
  - A custom class name can now be supplied when rendering `BpkTooltip`.

- bpk-mixins: 15.6.4 => 15.7.0
  - Adds `$bpk-zindex-tooltip`

- bpk-tokens: 23.2.2 => 23.3.0
  - Adds value for tooltip z-index.

- bpk-component-icon:  3.8.0 => 3.9.0
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
  - Pinned `react-responsive` to v1.3.0 as a breaking change was released in v1.3.2

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
  - Introducing the new chip component: Docs: http://backpack.prod.aws.skyscnr.com/components/atoms/chips

**Fixed:**
- bpk-component-horizontal-nav: 1.0.4 => 1.0.5
  - Add tab and tablist roles for use by accessibility tools

## 2017-07-10 - Add `source` arg to popover's `onClose`

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
  - When there is no date set, do not pupulate "aria-label" with "Thursday, 1st January 1970"

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
  - Fix syntax bug in "tablet-only" sass variables & mixins

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
      Docs: http://backpack.prod.aws.skyscnr.com/components/molecules/barcharts

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
    Docs: http://backpack.prod.aws.skyscnr.com/components/molecules/star-rating

**Fixed:**
- bpk-component-input: 3.2.0 => 3.2.1
  - Fix CSS modules for withOpenEvents classes.

## 2017-06-20 - CSS modules support across all packages

**Breaking:**

* bpk-react-utils:

  * TransitionInitialMount: Removes `classNamePrefix` in favour of `appearClassName` and `appearActiveClassName` for CSS Modules compatibility.

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
  - Added suppport for CSS Modules.

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
  - New panel component (http://backpack.prod.aws.skyscnr.com/components/atoms/panels)

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
  - Removed the dependency on `bpk-react-utils` to debloat the button for non tree-shaking consumers

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
    - Consumers using `BpkAccordionContainer` *with* `allowMultiple` should now use a regular
      `BpkAccordion` component with each `BpkAccordionItem` enhanced using the `withAccordionItemState` higher-order component
    - In each case, `BpkAccordionItem` will now use the `initiallyExpanded` prop for items that should be initially expanded
    - Please refer to [the readme](http://backpack.prod.aws.skyscnr.com/components/molecules/accordions#readme) for examples

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
  - Popover now has a zindex on par with autosuggest

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
- bpk-component-mixins: 14.1.0 => 14.1.1
  - Fixed router link actve + visited color
  - Arbitrary props can now be passed through

## 2017-05-09 - Improved calendar performance

**Fixed:**
- bpk-component-datepicker: 6.0.4 => 6.0.5
- bpk-component-calendar: 3.1.3 => 3.1.4
  - Improved update/render performance of several components

## 2017-05-09 - "Required*" labels for form elements & fixed `prop-types` warnings

**Breaking:**
- bpk-component-label: 2.0.45 => 3.0.0
  - The `label` prop has been deprecated in favor of `children`
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
  - Consolidated hX margin top/bottom tokens
    - i.e. `H1_MARGIN_TOP` -> `HEADING_MARGIN_TOP` & `H3_MARGIN_BOTTOM` -> `HEADING_MARGIN_BOTTOM`

**Added:**
- bpk-component-textarea: 0.0.0 => 0.0.1
  - New form validation component (http://backpack.prod.aws.skyscnr.com/components/atoms/forms#textareas)

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
  - Arbitrary props are now passed through to the svg

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
  - New form validation component (http://backpack.prod.aws.skyscnr.com/components/atoms/forms#validation)

- bpk-component-form-validation: 0.0.0 => 0.0.1
  - New fieldset component (http://backpack.prod.aws.skyscnr.com/components/molecules/fieldsets)

- bpk-component-checkbox:
- bpk-component-radio:
  - Radio buttons and checkboxes can now have white labels

**Fixed:**
- bpk-component-input: 3.0.9 => 3.0.10
- bpk-component-select: 2.0.9 => 2.0.10
  - `aria-invalid` is now set when `valid={false}`

- bpk-component-checkbox: 0.1.8 => 1.0.0
- bpk-component-radio: 0.0.62 => 0.0.63
  - Updated checkbox and radio checked svgs to use BLUE_700 color

## 2017-04-20 (1) - Unified colors for hover, active and selected states

**Fixed:**
- bpk-component-datepicker: 5.0.34 => 5.0.35
- bpk-component-calendar: 2.0.23 => 2.0.24
- bpk-component-horizontal-nav: 0.0.3 => 0.0.4
- bpk-mixins: 12.0.0 => 12.0.1
- bpk-tokens: 20.0.0 => 20.0.1
  - Unified colors for hover, active and selected states

## 2017-04-20 (1) - Fixed datepicker prop passthrough to input

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
  - Full docs here http://backpack.prod.aws.skyscnr.com/sassdoc/#borders-mixin-bpk-border-sm

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
  - New horizontal navigation component (http://backpack.prod.aws.skyscnr.com/components/molecules/horizontal-nav)

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
  - Added the ability to pass a function which returns a dom element to target prop

## 2017-03-30 - Added new call to action button

**Added:**
- bpk-component-cta-button: 0.0.0 => 0.0.1
  - New call to action button component (http://backpack.prod.aws.skyscnr.com/components/atoms/calltoactions)

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
  - Fixing disabled states of checkboxes and radio buttons so that they render better on gray-50 backgrounds.

## 2017-03-27 (2) - New progress bar component

**Added:**
- bpk-component-progress: 0.0.0 => 0.0.1
  - New progress bar component (http://backpack.prod.aws.skyscnr.com/components/molecules/progress)

## 2017-03-27 - Ability to add custom style and className props to portal elements

**Fixed:**
- bpk-component-popover: 1.0.20 => 1.0.21
  - Added feature to accept portalStyle and portalClassName props
- bpk-react-utils: 1.3.1 => 1.3.2
  - Added feature for the Portal component to accept custom style and className props

## 2017-03-23 - Introducing the accordion and nudger components

**Added:**
- bpk-component-accordion: 0.0.0 => 0.0.1
  - New accordion component (http://backpack.prod.aws.skyscnr.com/components/molecules/accordions/)
- bpk-component-nudger: 0.0.0 => 0.0.1
  - New nudger component (http://backpack.prod.aws.skyscnr.com/components/molecules/nudgers/)
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

## 2017-03-14 - Fixed overzealous proptype warning in icon components

**Fixed:**
- bpk-component-icon: 3.3.12 => 3.3.13
  - Relaxed `className` propType in internal component

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
  - New packages to provide a wrapper around tether and related utils

## 2017-03-03 (2) - Fixed datauri based icons in stock andoid browser

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
  - Increased opacity of shadow sm

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
  - Fixed issue with users of webpack externals and bloated bundles

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
    `bpk-calendar-date-modifier--MYMODIFIER` (was `bpk-calendar-date--MYMODIFIER`). This means you cannot mess anymore
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
  - Added `TransitionInitialMount` to help with css transitions (from `bpk-component-modal`)

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
  - New calendar component (http://backpack.prod.aws.skyscnr.com/components/molecules/calendar/)
- bpk-component-datepicker: 0.0.3
  - New datepicker component (http://backpack.prod.aws.skyscnr.com/components/molecules/datepicker/)
- bpk-component-popover: 0.0.5
  - New popover component (http://backpack.prod.aws.skyscnr.com/components/molecules/popovers/)

## 2017-01-26 - Input prop types are less strict & new portal implementation

**Breaking:**
- bpk-component-input: 1.0.14 => 2.0.0
  - Props `placeholder` and `onChange` are no longer required and are not explicitly listed in propTypes anymore

- bpk-react-utils: 0.1.0 => 1.0.0
  - deprecated `toPortalChild`
  - `react` & `react-dom` are now peer deps

**Added:**
- bpk-react-utils: 0.1.0 => 1.0.0
  - New `Portal` implementation - to be used instead of third party `react-portal`

**Fixed:**
- bpk-component-modal: 0.3.9 => 0.3.10
  - Swapped `react-portal` in favor of `bpk-react-utils` implementation

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

## 2017-01-11 - Custom classNames and arbitraty props for bpk-component-link

**Added:**
- bpk-component-link: 0.3.13 => 0.4.0
  - BpkLink and BpkButtonLink now pass through arbitrary props to `<a>` and `<button>` tag respectively
  - BpkLink and BpkButtonLink now properly handle className passed as prop

**The following packages received a patch bump due to the dependency changes above:**
- bpk-component-grid-toggle: 0.0.41 => 0.0.42
- bpk-component-modal: 0.3.5 => 0.3.6
- bpk-component-rtl-toggle: 0.0.25 => 0.0.26
- bpk-docs: 0.0.54 => 0.0.55

## 2017-01-10 - Added inline styling and css module support for button & autosuggest

**Added:**
- bpk-react-utils: 0.0.0 => 0.0.1
  - A new package to house backpack react component utilities, starting with a css module helper

- bpk-component-autosuggest: 1.0.11 => 1.1.0
- bpk-component-button: 1.4.4 => 1.5.0
  - Added dependency on `bpk-react-utils`
  - Added css module support

- bpk-component-button: 1.4.4 => 1.5.0
  - All additional/custom props are now passed through to `<button>` tag, including `style`

- bpk-mixins: 6.7.1 => 6.8.0
  - Added css module support (workaround for global `.bpk-no-touch-support` class)

## 2016-12-22 - Work around React regression in BpkButton

**Fixed:**
- bpk-component-button: 1.4.3 => 1.4.4
  - onClick event no longer fires on disabled buttons in Chrome. See https://github.com/facebook/react/pull/8329

**The following packages received a patch bump due to the dependency changes above:**
- bpk-component-modal: 0.3.3 => 0.3.4
- bpk-docs: 0.0.52 => 0.0.53

## 2016-12-21 - Updated yellow colors

**Breaking:**
- bpk-tokens: 17.0.0 => 17.0.1
- bpk-mixins: 6.7.0 => 6.7.1
  - updated tokens for yellow colors to make it a bit easier to read when used for text e.g. colour coded prices on month view.

## 2016-12-15 - Added toilets icon and added travelpro tokens

**Added:**
- bpk-mixins: 6.6.0 => 6.7.0
- bpk-svgs: 2.1.0 => 2.2.0
- bpk-component-icon: 1.2.0 => 1.3.0
  - Toilets icon

- bpk-tokens: 16.1.0 => 17.0.0
  - added travelpro tokens

## 2016-12-12 - Added power icon and tidied up segoe flag from base stylesheet

**Breaking:**
- bpk-stylesheets: 3.0.2 => 3.1.0
- bpk-tokens: 16.0.0 => 16.1.0
  - Removed all traces of segoe, including `FONT_FAMILY_SEGOE` and `.font-family-segoe`
  - Only bumped minor because we are certain that scaffold was the only consumer of this

**Added:**
- bpk-component-icon: 1.1.21 => 1.2.0
- bpk-svgs: 2.0.17 => 2.1.0
- bpk-mixins: 6.5.1 => 6.6.0
  - Power icon

## 2016-12-07 - Updated hover and active styles for primary buttons

**Breaking:**
- bpk-component-modal: 0.2.0 => 0.3.0
  - Removed aria-describedby attribute from modal, so screenreader does not read whole dialog contents

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
  - We are opting for a prop "passthrough" approach, which means any additional props passed to these components
    will be rendered i.e. the backpack component wont swallow it up
  - This means that consumers can now add custom `className` props - they will be added to classes already supplied
    by backpack

- bpk-component-input: 0.0.20 => 1.0.0
- bpk-component-select: 0.0.20 => 1.0.0
- bpk-mixins: 6.1.1 => 6.2.0
- bpk-tokens: 14.0.0 => 14.1.0
  - Inputs & selects can now be made `large` & `docked` for one line search forms
  - Sass mixin api is as follows:
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
  - Changed default label color to gray-700 instead of gray-300

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
  - Added small javascript utility to add feature detection classes to html element
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
  - Added missing "required" proptypes

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
  - Added `width` & `height` to icon svgs
  - Generating react components for each svg
    using [react-svg-loader cli](https://github.com/boopathi/react-svg-loader#cli).

- bpk-component-spinner: 0.2.12 => 1.0.0
  - We now expose three components `BpkSpinner`, `BpkLargeSpinner`, `BpkExtraLargeSpinner`
  - No need for raw-loader anymore

- bpk-component-logo: 0.2.8 => 1.0.0
  - We now expose five components `BpkInlineLogo`, `BpkCloudLogo`, `BpkStackedLogo`, `BpkTianxunLogo`, `BpkTianxunStackedLogo`
  - No need for raw-loader anymore

- bpk-component-icon: 0.2.12 => 1.0.0
  - We now expose hundreds of components (generated in bpk-svgs)
  - No need for raw-loader anymore
  - Alignment to buttons is supported using higher order components (HOC)

**Added:**
- bpk-tokens: 12.0.0 => 12.1.0
  - Surfaced SPACING_MD (18px) as a token

**Fixed:**
- bpk-mixins: 5.0.0 => 5.0.1
  - No fundamental api changes but a lot of the handling for inline svgs has been removed.

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
