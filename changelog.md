# Backpack changelog

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
