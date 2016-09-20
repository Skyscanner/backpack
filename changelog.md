# Backpack changelog

## UNRELEASED

**Added:**
- bpk-mixins:
  - `bpk-rtl` mixin to help with targeting RTL specific styles

**Fixed:**
- bpk-tokens:
  - The values for `INPUT_PADDING_X` and `INPUT_PADDING_Y` were the wrong way around

- bpk-mixins:
- bpk-component-blockquote:
- bpk-component-code:
- bpk-component-input:
- bpk-component-select:
- bpk-component-table:
  - Fixed RTL support

## 2016-09-20 - SVG icon/logo/spinner bundling fixes

**Changed:**
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
  
**The following packages received a patch bump due to the dependency changes above:**
- bpk-component-autosuggest: 0.0.3 => 0.0.4
- bpk-component-blockquote: 0.0.9 => 0.0.10
- bpk-component-button: 1.0.16 => 1.0.17
- bpk-component-checkbox: 0.0.6 => 0.0.7
- bpk-component-code: 0.0.9 => 0.0.10
- bpk-component-content-container: 1.0.0 => 1.0.1
- bpk-component-grid: 0.0.3 => 0.0.4
- bpk-component-grid-toggle: 0.0.15 => 0.0.16
- bpk-component-heading: 1.0.16 => 1.0.17
- bpk-component-input: 0.0.6 => 0.0.7
- bpk-component-label: 0.0.6 => 0.0.7
- bpk-component-link: 0.1.15 => 0.1.16
- bpk-component-list: 0.0.29 => 0.0.30
- bpk-component-paragraph: 0.1.16 => 0.1.17
- bpk-component-radio: 0.0.6 => 0.0.7
- bpk-component-router-link: 0.1.15 => 0.1.16
- bpk-component-select: 0.0.6 => 0.0.7
- bpk-component-table: 0.0.29 => 0.0.30
- bpk-docs: 0.0.25 => 0.0.26
- bpk-stylesheets: 1.0.6 => 1.0.7

## 2016-09-14 - Autosuggest tweaks

**Changed:**
- bpk-component-autosuggest@0.0.3
  - Interface now conforms to `react-autosuggest` 100%
  - Fixed bug with arrow displaying even when the suggestion were hidden

## 2016-09-13 - Content container changes & initial version of Autosuggest

**Added:**

- bpk-component-autosuggest@0.0.2
  - Initial version to be tested by B2B widgets squad

**Changed:**
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
  
**The following packages received a patch bump due to the dependency
changes above:**  
- bpk-component-blockquote@0.0.9
- bpk-component-button@1.0.16
- bpk-component-checkbox@0.0.6
- bpk-component-code@0.0.9
- bpk-component-grid-toggle@0.0.15
- bpk-component-heading@1.0.16
- bpk-component-icon@0.2.12
- bpk-component-input@0.0.6
- bpk-component-label@0.0.6
- bpk-component-link@0.1.15
- bpk-component-list@0.0.29
- bpk-component-logo@0.2.8
- bpk-component-paragraph@0.1.16
- bpk-component-radio@0.0.6
- bpk-component-router-link@0.1.15
- bpk-component-select@0.0.6
- bpk-component-spinner@0.2.12
- bpk-component-table@0.0.29
- bpk-docs@0.0.25
- bpk-stylesheets@1.0.6
- bpk-svgs@1.0.4

## 2016-09-07 - Box shadows!

**Added:**
- bpk-mixins: 4.0.0 => 4.1.0
  - Added mixins for box shadows and border-radii
- bpk-tokens: 11.0.0 => 11.1.0
  - Added tokens for box shadows

**The following packages received a patch bump due to the dependency
changes above:**
- bpk-component-blockquote: 0.0.7 => 0.0.8
- bpk-component-button: 1.0.14 => 1.0.15
- bpk-component-checkbox: 0.0.4 => 0.0.5
- bpk-component-code: 0.0.7 => 0.0.8
- bpk-component-content-container: 0.0.13 => 0.0.14
- bpk-component-grid: 0.0.1 => 0.0.2
- bpk-component-grid-toggle: 0.0.13 => 0.0.14
- bpk-component-heading: 1.0.14 => 1.0.15
- bpk-component-icon: 0.2.10 => 0.2.11
- bpk-component-input: 0.0.4 => 0.0.5
- bpk-component-label: 0.0.4 => 0.0.5
- bpk-component-link: 0.1.13 => 0.1.14
- bpk-component-list: 0.0.27 => 0.0.28
- bpk-component-logo: 0.2.6 => 0.2.7
- bpk-component-paragraph: 0.1.14 => 0.1.15
- bpk-component-radio: 0.0.4 => 0.0.5
- bpk-component-router-link: 0.1.13 => 0.1.14
- bpk-component-select: 0.0.4 => 0.0.5
- bpk-component-spinner: 0.2.10 => 0.2.11
- bpk-component-table: 0.0.27 => 0.0.28
- bpk-docs: 0.0.23 => 0.0.24
- bpk-stylesheets: 1.0.4 => 1.0.5
- bpk-svgs: 1.0.2 => 1.0.3
