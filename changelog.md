# Backpack changelog

## UNRELEASED

**Fixed:**
- bpk-component-code:
- bpk-mixins:
  - Fixed border radius and padding for code components

**Added:**
- bpk-tokens:
  - Added x-padding tokens for icon-only buttons (regular and large)
- bpk-mixins:
  - Added mixins for icon-only buttons (regular and large)
- bpk-component-button:
  - Added icon-only button variant

## 2016-11-21 - Removed Segoe UI from base font stack

**Changed:**
- bpk-tokens: 14.4.1 => 15.0.0
  - Removed `Segoe UI` from the base font stack
  - Added alternative font stack including `Segoe UI`
- bpk-stylesheets: 2.0.10 => 3.0.0
  - Enabled the alternative font stack with `Segoe UI` when the `font-family-segoe` class is added to `<body>`

**The following packages received a patch bump due to the dependency changes above:**
- bpk-component-autosuggest: 1.0.5 => 1.0.6
- bpk-component-badge: 0.0.2 => 0.0.3
- bpk-component-banner-alert: 0.0.15 => 0.0.16
- bpk-component-blockquote: 0.0.28 => 0.0.29
- bpk-component-button: 1.2.3 => 1.2.4
- bpk-component-card: 0.0.16 => 0.0.17
- bpk-component-checkbox: 0.0.25 => 0.0.26
- bpk-component-code: 0.0.28 => 0.0.29
- bpk-component-content-container: 1.0.19 => 1.0.20
- bpk-component-grid: 0.0.22 => 0.0.23
- bpk-component-grid-toggle: 0.0.34 => 0.0.35
- bpk-component-heading: 1.1.11 => 1.1.12
- bpk-component-icon: 1.1.18 => 1.1.19
- bpk-component-input: 1.0.4 => 1.0.5
- bpk-component-label: 2.0.4 => 2.0.5
- bpk-component-link: 0.3.6 => 0.3.7
- bpk-component-list: 0.0.48 => 0.0.49
- bpk-component-logo: 1.0.18 => 1.0.19
- bpk-component-modal: 0.1.0 => 0.1.1
- bpk-component-paragraph: 0.1.35 => 0.1.36
- bpk-component-radio: 0.0.25 => 0.0.26
- bpk-component-router-link: 0.1.34 => 0.1.35
- bpk-component-rtl-toggle: 0.0.18 => 0.0.19
- bpk-component-select: 1.0.4 => 1.0.5
- bpk-component-spinner: 1.0.18 => 1.0.19
- bpk-component-table: 0.0.48 => 0.0.49
- bpk-docs: 0.0.46 => 0.0.47
- bpk-mixins: 6.4.1 => 6.4.2
- bpk-svgs: 2.0.14 => 2.0.15

## 2016-11-18 - Updated React to 15.4.0

**Fixed:**
- Updated React to 15.4.0
- bpk-component-modal: 0.0.12 => 0.1.0
  - Updated dependencies for compatibility with current and future React versions
- bpk-svgs: 2.0.13 => 2.0.14
  - Added explicit dependency on `tinycolor2`

**The following packages received a patch bump due to the dependency changes above:**
- bpk-component-autosuggest: 1.0.4 => 1.0.5
- bpk-component-badge: 0.0.1 => 0.0.2
- bpk-component-banner-alert: 0.0.14 => 0.0.15
- bpk-component-blockquote: 0.0.27 => 0.0.28
- bpk-component-button: 1.2.2 => 1.2.3
- bpk-component-card: 0.0.15 => 0.0.16
- bpk-component-checkbox: 0.0.24 => 0.0.25
- bpk-component-code: 0.0.27 => 0.0.28
- bpk-component-content-container: 1.0.18 => 1.0.19
- bpk-component-grid: 0.0.21 => 0.0.22
- bpk-component-grid-toggle: 0.0.33 => 0.0.34
- bpk-component-heading: 1.1.10 => 1.1.11
- bpk-component-icon: 1.1.17 => 1.1.18
- bpk-component-input: 1.0.3 => 1.0.4
- bpk-component-label: 2.0.3 => 2.0.4
- bpk-component-link: 0.3.5 => 0.3.6
- bpk-component-list: 0.0.47 => 0.0.48
- bpk-component-logo: 1.0.17 => 1.0.18
- bpk-component-paragraph: 0.1.34 => 0.1.35
- bpk-component-radio: 0.0.24 => 0.0.25
- bpk-component-router-link: 0.1.33 => 0.1.34
- bpk-component-rtl-toggle: 0.0.17 => 0.0.18
- bpk-component-select: 1.0.3 => 1.0.4
- bpk-component-spinner: 1.0.17 => 1.0.18
- bpk-component-table: 0.0.47 => 0.0.48
- bpk-docs: 0.0.45 => 0.0.46
- bpk-mixins: 6.4.0 => 6.4.1
- bpk-stylesheets: 2.0.9 => 2.0.10
- bpk-tokens: 14.4.0 => 14.4.1

## 2016-11-15 - New badge component

**Added:**
- bpk-component-badge: 0.0.0 => 0.0.1
- bpk-mixins: 6.3.1 => 6.4.0
- bpk-tokens: 14.3.0 => 14.4.0
  - New badge component - limited for now to unblock the ads team

**The following packages received a patch bump due to the dependency changes above:**
- bpk-component-autosuggest: 1.0.3 => 1.0.4
- bpk-component-banner-alert: 0.0.13 => 0.0.14
- bpk-component-blockquote: 0.0.26 => 0.0.27
- bpk-component-button: 1.2.1 => 1.2.2
- bpk-component-card: 0.0.14 => 0.0.15
- bpk-component-checkbox: 0.0.23 => 0.0.24
- bpk-component-code: 0.0.26 => 0.0.27
- bpk-component-content-container: 1.0.17 => 1.0.18
- bpk-component-grid: 0.0.20 => 0.0.21
- bpk-component-grid-toggle: 0.0.32 => 0.0.33
- bpk-component-heading: 1.1.9 => 1.1.10
- bpk-component-icon: 1.1.16 => 1.1.17
- bpk-component-input: 1.0.2 => 1.0.3
- bpk-component-label: 2.0.2 => 2.0.3
- bpk-component-link: 0.3.4 => 0.3.5
- bpk-component-list: 0.0.46 => 0.0.47
- bpk-component-logo: 1.0.16 => 1.0.17
- bpk-component-modal: 0.0.11 => 0.0.12
- bpk-component-paragraph: 0.1.33 => 0.1.34
- bpk-component-radio: 0.0.23 => 0.0.24
- bpk-component-router-link: 0.1.32 => 0.1.33
- bpk-component-rtl-toggle: 0.0.16 => 0.0.17
- bpk-component-select: 1.0.2 => 1.0.3
- bpk-component-spinner: 1.0.16 => 1.0.17
- bpk-component-table: 0.0.46 => 0.0.47
- bpk-docs: 0.0.44 => 0.0.45
- bpk-stylesheets: 2.0.8 => 2.0.9
- bpk-svgs: 2.0.12 => 2.0.13

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

**The following packages received a patch bump due to the dependency changes above:**
- bpk-component-autosuggest: 1.0.2 => 1.0.3
- bpk-component-banner-alert: 0.0.12 => 0.0.13
- bpk-component-blockquote: 0.0.25 => 0.0.26
- bpk-component-button: 1.2.0 => 1.2.1
- bpk-component-card: 0.0.13 => 0.0.14
- bpk-component-checkbox: 0.0.22 => 0.0.23
- bpk-component-code: 0.0.25 => 0.0.26
- bpk-component-content-container: 1.0.16 => 1.0.17
- bpk-component-grid: 0.0.19 => 0.0.20
- bpk-component-grid-toggle: 0.0.31 => 0.0.32
- bpk-component-heading: 1.1.8 => 1.1.9
- bpk-component-icon: 1.1.15 => 1.1.16
- bpk-component-input: 1.0.1 => 1.0.2
- bpk-component-label: 2.0.1 => 2.0.2
- bpk-component-link: 0.3.3 => 0.3.4
- bpk-component-list: 0.0.45 => 0.0.46
- bpk-component-logo: 1.0.15 => 1.0.16
- bpk-component-modal: 0.0.10 => 0.0.11
- bpk-component-paragraph: 0.1.32 => 0.1.33
- bpk-component-radio: 0.0.22 => 0.0.23
- bpk-component-router-link: 0.1.31 => 0.1.32
- bpk-component-rtl-toggle: 0.0.15 => 0.0.16
- bpk-component-select: 1.0.1 => 1.0.2
- bpk-component-spinner: 1.0.15 => 1.0.16
- bpk-component-table: 0.0.45 => 0.0.46
- bpk-docs: 0.0.43 => 0.0.44
- bpk-mixins: 6.3.0 => 6.3.1
- bpk-stylesheets: 2.0.7 => 2.0.8
- bpk-svgs: 2.0.11 => 2.0.12
- bpk-tokens: 14.2.0 => 14.3.0

## 2016-11-09 - Destructive buttons

**Added:**
- bpk-component-button: 1.1.7 => 1.2.0
- bpk-mixins: 6.2.0 => 6.3.0
- bpk-tokens: 14.1.0 => 14.2.0
  - Added `destructive` button style

**The following packages received a patch bump due to the dependency changes above:**
- bpk-component-autosuggest: 1.0.1 => 1.0.2
- bpk-component-banner-alert: 0.0.11 => 0.0.12
- bpk-component-blockquote: 0.0.24 => 0.0.25
- bpk-component-card: 0.0.12 => 0.0.13
- bpk-component-checkbox: 0.0.21 => 0.0.22
- bpk-component-code: 0.0.24 => 0.0.25
- bpk-component-content-container: 1.0.15 => 1.0.16
- bpk-component-grid: 0.0.18 => 0.0.19
- bpk-component-grid-toggle: 0.0.30 => 0.0.31
- bpk-component-heading: 1.1.7 => 1.1.8
- bpk-component-icon: 1.1.14 => 1.1.15
- bpk-component-input: 1.0.0 => 1.0.1
- bpk-component-label: 2.0.0 => 2.0.1
- bpk-component-link: 0.3.2 => 0.3.3
- bpk-component-list: 0.0.44 => 0.0.45
- bpk-component-logo: 1.0.14 => 1.0.15
- bpk-component-modal: 0.0.9 => 0.0.10
- bpk-component-paragraph: 0.1.31 => 0.1.32
- bpk-component-radio: 0.0.21 => 0.0.22
- bpk-component-router-link: 0.1.30 => 0.1.31
- bpk-component-rtl-toggle: 0.0.14 => 0.0.15
- bpk-component-select: 1.0.0 => 1.0.1
- bpk-component-spinner: 1.0.14 => 1.0.15
- bpk-component-table: 0.0.44 => 0.0.45
- bpk-docs: 0.0.42 => 0.0.43
- bpk-stylesheets: 2.0.6 => 2.0.7
- bpk-svgs: 2.0.10 => 2.0.11

## 2016-11-09 - Docked inputs & selects

**Changed:**
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

**The following packages received a patch bump due to the dependency changes above:**
- bpk-component-autosuggest: 1.0.0 => 1.0.1
- bpk-component-banner-alert: 0.0.10 => 0.0.11
- bpk-component-blockquote: 0.0.23 => 0.0.24
- bpk-component-button: 1.1.6 => 1.1.7
- bpk-component-card: 0.0.11 => 0.0.12
- bpk-component-checkbox: 0.0.20 => 0.0.21
- bpk-component-code: 0.0.23 => 0.0.24
- bpk-component-content-container: 1.0.14 => 1.0.15
- bpk-component-grid: 0.0.17 => 0.0.18
- bpk-component-grid-toggle: 0.0.29 => 0.0.30
- bpk-component-heading: 1.1.6 => 1.1.7
- bpk-component-icon: 1.1.13 => 1.1.14
- bpk-component-link: 0.3.1 => 0.3.2
- bpk-component-list: 0.0.43 => 0.0.44
- bpk-component-logo: 1.0.13 => 1.0.14
- bpk-component-modal: 0.0.8 => 0.0.9
- bpk-component-paragraph: 0.1.30 => 0.1.31
- bpk-component-radio: 0.0.20 => 0.0.21
- bpk-component-router-link: 0.1.29 => 0.1.30
- bpk-component-rtl-toggle: 0.0.13 => 0.0.14
- bpk-component-spinner: 1.0.13 => 1.0.14
- bpk-component-table: 0.0.43 => 0.0.44
- bpk-docs: 0.0.41 => 0.0.42
- bpk-stylesheets: 2.0.5 => 2.0.6
- bpk-svgs: 2.0.9 => 2.0.10

## 2016-11-04 - Autosuggest improvements

**Changed:**
- bpk-component-autosuggest: 0.0.17 => 1.0.0
  - Updated to `^7.0.1` of `react-autosuggest`
  - Removed padding from suggestion containers with the idea

- bpk-tokens: 13.1.0 => 14.0.0
  - Removed automatic pluralisation of SCSS category names. This affects all token formats except
    SCSS. Examples include: `animation` -> `animations`, `box-shadow` -> `box-shadows` etc

- bpk-component-autosuggest: 0.0.17 => 1.0.0
  - Added `BpkAutosuggestSuggestion` component

**The following packages received a patch bump due to the dependency changes above:**
- bpk-component-banner-alert: 0.0.9 => 0.0.10
- bpk-component-blockquote: 0.0.22 => 0.0.23
- bpk-component-button: 1.1.5 => 1.1.6
- bpk-component-card: 0.0.10 => 0.0.11
- bpk-component-checkbox: 0.0.19 => 0.0.20
- bpk-component-code: 0.0.22 => 0.0.23
- bpk-component-content-container: 1.0.13 => 1.0.14
- bpk-component-grid: 0.0.16 => 0.0.17
- bpk-component-grid-toggle: 0.0.28 => 0.0.29
- bpk-component-heading: 1.1.5 => 1.1.6
- bpk-component-icon: 1.1.12 => 1.1.13
- bpk-component-input: 0.0.19 => 0.0.20
- bpk-component-label: 1.0.1 => 1.0.2
- bpk-component-link: 0.3.0 => 0.3.1
- bpk-component-list: 0.0.42 => 0.0.43
- bpk-component-logo: 1.0.12 => 1.0.13
- bpk-component-modal: 0.0.7 => 0.0.8
- bpk-component-paragraph: 0.1.29 => 0.1.30
- bpk-component-radio: 0.0.19 => 0.0.20
- bpk-component-router-link: 0.1.28 => 0.1.29
- bpk-component-rtl-toggle: 0.0.12 => 0.0.13
- bpk-component-select: 0.0.19 => 0.0.20
- bpk-component-spinner: 1.0.12 => 1.0.13
- bpk-component-table: 0.0.42 => 0.0.43
- bpk-docs: 0.0.40 => 0.0.41
- bpk-mixins: 6.1.0 => 6.1.1
- bpk-stylesheets: 2.0.4 => 2.0.5
- bpk-svgs: 2.0.8 => 2.0.9

## 2016-11-02 - Links can now be white

**Added:**
- bpk-component-link: 0.2.4 => 0.3.0
- bpk-mixins: 6.0.0 => 6.1.0
- bpk-tokens: 13.0.0 => 13.1.0
  - Links can now be white

**The following packages received a patch bump due to the dependency changes above:**
- bpk-component-autosuggest: 0.0.16 => 0.0.17
- bpk-component-banner-alert: 0.0.8 => 0.0.9
- bpk-component-blockquote: 0.0.21 => 0.0.22
- bpk-component-button: 1.1.4 => 1.1.5
- bpk-component-card: 0.0.9 => 0.0.10
- bpk-component-checkbox: 0.0.18 => 0.0.19
- bpk-component-code: 0.0.21 => 0.0.22
- bpk-component-content-container: 1.0.12 => 1.0.13
- bpk-component-grid: 0.0.15 => 0.0.16
- bpk-component-grid-toggle: 0.0.27 => 0.0.28
- bpk-component-heading: 1.1.4 => 1.1.5
- bpk-component-icon: 1.1.11 => 1.1.12
- bpk-component-input: 0.0.18 => 0.0.19
- bpk-component-label: 1.0.0 => 1.0.1
- bpk-component-list: 0.0.41 => 0.0.42
- bpk-component-logo: 1.0.11 => 1.0.12
- bpk-component-modal: 0.0.6 => 0.0.7
- bpk-component-paragraph: 0.1.28 => 0.1.29
- bpk-component-radio: 0.0.18 => 0.0.19
- bpk-component-router-link: 0.1.27 => 0.1.28
- bpk-component-rtl-toggle: 0.0.11 => 0.0.12
- bpk-component-select: 0.0.18 => 0.0.19
- bpk-component-spinner: 1.0.11 => 1.0.12
- bpk-component-table: 0.0.41 => 0.0.42
- bpk-docs: 0.0.39 => 0.0.40
- bpk-stylesheets: 2.0.3 => 2.0.4
- bpk-svgs: 2.0.7 => 2.0.8

## 2016-11-01 - Form labels are darker by default

**Changed:**
- bpk-component-label: 0.0.17 => 1.0.0
- bpk-mixins: 5.6.1 => 6.0.0
- bpk-tokens: 12.5.0 => 13.0.0
  - Changed default label color to gray-700 instead of gray-300

**Added:**
- bpk-component-label: 0.0.17 => 1.0.0
- bpk-mixins: 5.6.1 => 6.0.0
  - Labels can now be white

**The following packages received a patch bump due to the dependency changes above:**
- bpk-component-autosuggest: 0.0.15 => 0.0.16
- bpk-component-banner-alert: 0.0.7 => 0.0.8
- bpk-component-blockquote: 0.0.20 => 0.0.21
- bpk-component-button: 1.1.3 => 1.1.4
- bpk-component-card: 0.0.8 => 0.0.9
- bpk-component-checkbox: 0.0.17 => 0.0.18
- bpk-component-code: 0.0.20 => 0.0.21
- bpk-component-content-container: 1.0.11 => 1.0.12
- bpk-component-grid: 0.0.14 => 0.0.15
- bpk-component-grid-toggle: 0.0.26 => 0.0.27
- bpk-component-heading: 1.1.3 => 1.1.4
- bpk-component-icon: 1.1.10 => 1.1.11
- bpk-component-input: 0.0.17 => 0.0.18
- bpk-component-link: 0.2.3 => 0.2.4
- bpk-component-list: 0.0.40 => 0.0.41
- bpk-component-logo: 1.0.10 => 1.0.11
- bpk-component-modal: 0.0.5 => 0.0.6
- bpk-component-paragraph: 0.1.27 => 0.1.28
- bpk-component-radio: 0.0.17 => 0.0.18
- bpk-component-router-link: 0.1.26 => 0.1.27
- bpk-component-rtl-toggle: 0.0.10 => 0.0.11
- bpk-component-select: 0.0.17 => 0.0.18
- bpk-component-spinner: 1.0.10 => 1.0.11
- bpk-component-table: 0.0.40 => 0.0.41
- bpk-docs: 0.0.38 => 0.0.39
- bpk-stylesheets: 2.0.2 => 2.0.3
- bpk-svgs: 2.0.6 => 2.0.7

## 2016-10-31 - Select component IE background color fix

**Fixed:**
- bpk-mixins: 5.6.0 => 5.6.1
- bpk-component-select: 0.0.16 => 0.0.17
  - Fixed select background color on IE

**The following packages received a patch bump due to the dependency changes above:**
- bpk-component-autosuggest: 0.0.14 => 0.0.15
- bpk-component-banner-alert: 0.0.6 => 0.0.7
- bpk-component-blockquote: 0.0.19 => 0.0.20
- bpk-component-button: 1.1.2 => 1.1.3
- bpk-component-card: 0.0.7 => 0.0.8
- bpk-component-checkbox: 0.0.16 => 0.0.17
- bpk-component-code: 0.0.19 => 0.0.20
- bpk-component-content-container: 1.0.10 => 1.0.11
- bpk-component-grid: 0.0.13 => 0.0.14
- bpk-component-grid-toggle: 0.0.25 => 0.0.26
- bpk-component-heading: 1.1.2 => 1.1.3
- bpk-component-icon: 1.1.9 => 1.1.10
- bpk-component-input: 0.0.16 => 0.0.17
- bpk-component-label: 0.0.16 => 0.0.17
- bpk-component-link: 0.2.2 => 0.2.3
- bpk-component-list: 0.0.39 => 0.0.40
- bpk-component-logo: 1.0.9 => 1.0.10
- bpk-component-modal: 0.0.4 => 0.0.5
- bpk-component-paragraph: 0.1.26 => 0.1.27
- bpk-component-radio: 0.0.16 => 0.0.17
- bpk-component-router-link: 0.1.25 => 0.1.26
- bpk-component-rtl-toggle: 0.0.9 => 0.0.10
- bpk-component-spinner: 1.0.9 => 1.0.10
- bpk-component-table: 0.0.39 => 0.0.40
- bpk-docs: 0.0.37 => 0.0.38
- bpk-stylesheets: 2.0.1 => 2.0.2

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

**The following packages received a patch bump due to the dependency changes above:**
- bpk-component-autosuggest: 0.0.13 => 0.0.14
- bpk-component-banner-alert: 0.0.5 => 0.0.6
- bpk-component-blockquote: 0.0.18 => 0.0.19
- bpk-component-button: 1.1.1 => 1.1.2
- bpk-component-checkbox: 0.0.15 => 0.0.16
- bpk-component-code: 0.0.18 => 0.0.19
- bpk-component-content-container: 1.0.9 => 1.0.10
- bpk-component-grid: 0.0.12 => 0.0.13
- bpk-component-grid-toggle: 0.0.24 => 0.0.25
- bpk-component-heading: 1.1.1 => 1.1.2
- bpk-component-icon: 1.1.8 => 1.1.9
- bpk-component-input: 0.0.15 => 0.0.16
- bpk-component-label: 0.0.15 => 0.0.16
- bpk-component-link: 0.2.1 => 0.2.2
- bpk-component-list: 0.0.38 => 0.0.39
- bpk-component-logo: 1.0.8 => 1.0.9
- bpk-component-paragraph: 0.1.25 => 0.1.26
- bpk-component-radio: 0.0.15 => 0.0.16
- bpk-component-router-link: 0.1.24 => 0.1.25
- bpk-component-rtl-toggle: 0.0.8 => 0.0.9
- bpk-component-select: 0.0.15 => 0.0.16
- bpk-component-spinner: 1.0.8 => 1.0.9
- bpk-component-table: 0.0.38 => 0.0.39
- bpk-docs: 0.0.36 => 0.0.37
- bpk-stylesheets: 2.0.0 => 2.0.1
- bpk-svgs: 2.0.5 => 2.0.6

## 2016-10-17 (2) - Disable `:hover` effects on touch devices

**Changed:**
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

**The following packages received a patch bump due to the dependency changes above:**
- bpk-component-autosuggest: 0.0.12 => 0.0.13
- bpk-component-blockquote: 0.0.17 => 0.0.18
- bpk-component-card: 0.0.5 => 0.0.6
- bpk-component-checkbox: 0.0.14 => 0.0.15
- bpk-component-code: 0.0.17 => 0.0.18
- bpk-component-content-container: 1.0.8 => 1.0.9
- bpk-component-grid: 0.0.11 => 0.0.12
- bpk-component-grid-toggle: 0.0.23 => 0.0.24
- bpk-component-heading: 1.1.0 => 1.1.1
- bpk-component-icon: 1.1.7 => 1.1.8
- bpk-component-input: 0.0.14 => 0.0.15
- bpk-component-label: 0.0.14 => 0.0.15
- bpk-component-list: 0.0.37 => 0.0.38
- bpk-component-logo: 1.0.7 => 1.0.8
- bpk-component-paragraph: 0.1.24 => 0.1.25
- bpk-component-radio: 0.0.14 => 0.0.15
- bpk-component-router-link: 0.1.23 => 0.1.24
- bpk-component-rtl-toggle: 0.0.7 => 0.0.8
- bpk-component-select: 0.0.14 => 0.0.15
- bpk-component-spinner: 1.0.7 => 1.0.8
- bpk-component-table: 0.0.37 => 0.0.38
- bpk-docs: 0.0.35 => 0.0.36
- bpk-svgs: 2.0.4 => 2.0.5
- bpk-tokens: 12.4.0 => 12.4.1

## 2016-10-17 (1) - Ability to add custom `className` to button

**Added:**
- bpk-component-button: 1.0.24 => 1.1.0
  - Can now pass through custom `className` to button

**The following packages received a patch bump due to the dependency changes above:**
- bpk-component-banner-alert: 0.0.3 => 0.0.4
- bpk-component-icon: 1.1.6 => 1.1.7
- bpk-component-modal: 0.0.1 => 0.0.2
- bpk-docs: 0.0.34 => 0.0.35

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

**The following packages received a patch bump due to the dependency changes above:**
- bpk-component-autosuggest: 0.0.11 => 0.0.12
- bpk-component-banner-alert: 0.0.2 => 0.0.3
- bpk-component-blockquote: 0.0.16 => 0.0.17
- bpk-component-button: 1.0.23 => 1.0.24
- bpk-component-checkbox: 0.0.13 => 0.0.14
- bpk-component-code: 0.0.16 => 0.0.17
- bpk-component-content-container: 1.0.7 => 1.0.8
- bpk-component-grid: 0.0.10 => 0.0.11
- bpk-component-grid-toggle: 0.0.22 => 0.0.23
- bpk-component-icon: 1.1.5 => 1.1.6
- bpk-component-input: 0.0.13 => 0.0.14
- bpk-component-label: 0.0.13 => 0.0.14
- bpk-component-list: 0.0.36 => 0.0.37
- bpk-component-logo: 1.0.6 => 1.0.7
- bpk-component-paragraph: 0.1.23 => 0.1.24
- bpk-component-radio: 0.0.13 => 0.0.14
- bpk-component-router-link: 0.1.22 => 0.1.23
- bpk-component-rtl-toggle: 0.0.6 => 0.0.7
- bpk-component-select: 0.0.13 => 0.0.14
- bpk-component-spinner: 1.0.6 => 1.0.7
- bpk-component-table: 0.0.36 => 0.0.37
- bpk-docs: 0.0.33 => 0.0.34
- bpk-stylesheets: 1.0.13 => 1.0.14
- bpk-svgs: 2.0.3 => 2.0.4
- bpk-tokens: 12.3.0 => 12.4.0

## 2016-09-28 (2) - Button wrap fix

**Fixed:**
- bpk-component-button: 1.0.22 => 1.0.23
- bpk-mixins: 5.3.2 => 5.3.3
  - Button text can now wrap

**The following packages received a patch bump due to the dependency changes above:**
- bpk-component-autosuggest: 0.0.10 => 0.0.11
- bpk-component-banner-alert: 0.0.1 => 0.0.2
- bpk-component-blockquote: 0.0.15 => 0.0.16
- bpk-component-card: 0.0.3 => 0.0.4
- bpk-component-checkbox: 0.0.12 => 0.0.13
- bpk-component-code: 0.0.15 => 0.0.16
- bpk-component-content-container: 1.0.6 => 1.0.7
- bpk-component-grid: 0.0.9 => 0.0.10
- bpk-component-grid-toggle: 0.0.21 => 0.0.22
- bpk-component-heading: 1.0.22 => 1.0.23
- bpk-component-icon: 1.1.4 => 1.1.5
- bpk-component-input: 0.0.12 => 0.0.13
- bpk-component-label: 0.0.12 => 0.0.13
- bpk-component-link: 0.1.21 => 0.1.22
- bpk-component-list: 0.0.35 => 0.0.36
- bpk-component-logo: 1.0.5 => 1.0.6
- bpk-component-paragraph: 0.1.22 => 0.1.23
- bpk-component-radio: 0.0.12 => 0.0.13
- bpk-component-router-link: 0.1.21 => 0.1.22
- bpk-component-rtl-toggle: 0.0.5 => 0.0.6
- bpk-component-select: 0.0.12 => 0.0.13
- bpk-component-spinner: 1.0.5 => 1.0.6
- bpk-component-table: 0.0.35 => 0.0.36
- bpk-docs: 0.0.32 => 0.0.33
- bpk-stylesheets: 1.0.12 => 1.0.13

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

**The following packages received a patch bump due to the dependency changes above:**
- bpk-component-autosuggest: 0.0.9 => 0.0.10
- bpk-component-button: 1.0.21 => 1.0.22
- bpk-component-checkbox: 0.0.11 => 0.0.12
- bpk-component-content-container: 1.0.5 => 1.0.6
- bpk-component-grid: 0.0.8 => 0.0.9
- bpk-component-grid-toggle: 0.0.20 => 0.0.21
- bpk-component-heading: 1.0.21 => 1.0.22
- bpk-component-icon: 1.1.3 => 1.1.4
- bpk-component-input: 0.0.11 => 0.0.12
- bpk-component-label: 0.0.11 => 0.0.12
- bpk-component-link: 0.1.20 => 0.1.21
- bpk-component-logo: 1.0.4 => 1.0.5
- bpk-component-paragraph: 0.1.21 => 0.1.22
- bpk-component-radio: 0.0.11 => 0.0.12
- bpk-component-router-link: 0.1.20 => 0.1.21
- bpk-component-rtl-toggle: 0.0.4 => 0.0.5
- bpk-component-select: 0.0.11 => 0.0.12
- bpk-component-spinner: 1.0.4 => 1.0.5
- bpk-component-table: 0.0.34 => 0.0.35
- bpk-docs: 0.0.31 => 0.0.32
- bpk-mixins: 5.3.1 => 5.3.2
- bpk-stylesheets: 1.0.11 => 1.0.12
- bpk-svgs: 2.0.2 => 2.0.3

## 2016-09-27 - Card flicker on safari fix

**Fixed:**
- bpk-component-card: 0.0.1 => 0.0.2
- bpk-mixins: 5.3.0 => 5.3.1
  - Bug with card component animation causes flicker in Safari Version 10.0 (10602.1.50.0.10)

**The following packages received a patch bump due to the dependency changes above:**
- bpk-component-autosuggest: 0.0.8 => 0.0.9
- bpk-component-blockquote: 0.0.13 => 0.0.14
- bpk-component-button: 1.0.20 => 1.0.21
- bpk-component-checkbox: 0.0.10 => 0.0.11
- bpk-component-code: 0.0.13 => 0.0.14
- bpk-component-content-container: 1.0.4 => 1.0.5
- bpk-component-grid: 0.0.7 => 0.0.8
- bpk-component-grid-toggle: 0.0.19 => 0.0.20
- bpk-component-heading: 1.0.20 => 1.0.21
- bpk-component-icon: 1.1.2 => 1.1.3
- bpk-component-input: 0.0.10 => 0.0.11
- bpk-component-label: 0.0.10 => 0.0.11
- bpk-component-link: 0.1.19 => 0.1.20
- bpk-component-list: 0.0.33 => 0.0.34
- bpk-component-logo: 1.0.3 => 1.0.4
- bpk-component-paragraph: 0.1.20 => 0.1.21
- bpk-component-radio: 0.0.10 => 0.0.11
- bpk-component-router-link: 0.1.19 => 0.1.20
- bpk-component-rtl-toggle: 0.0.3 => 0.0.4
- bpk-component-select: 0.0.10 => 0.0.11
- bpk-component-spinner: 1.0.3 => 1.0.4
- bpk-component-table: 0.0.33 => 0.0.34
- bpk-docs: 0.0.30 => 0.0.31
- bpk-stylesheets: 1.0.10 => 1.0.11


## 2016-09-26 - Card component

**Added:**
- bpk-component-card: 0.0.0 => 0.0.1
- bpk-mixins: 5.2.0 => 5.3.0
- bpk-tokens: 12.1.1 => 12.2.0
  - New 'card' component for clickable/touchable surfaces such as itineraries, news articles etc

**The following packages received a patch bump due to the dependency changes above:**
- bpk-component-autosuggest: 0.0.7 => 0.0.8
- bpk-component-blockquote: 0.0.12 => 0.0.13
- bpk-component-button: 1.0.19 => 1.0.20
- bpk-component-checkbox: 0.0.9 => 0.0.10
- bpk-component-code: 0.0.12 => 0.0.13
- bpk-component-content-container: 1.0.3 => 1.0.4
- bpk-component-grid: 0.0.6 => 0.0.7
- bpk-component-grid-toggle: 0.0.18 => 0.0.19
- bpk-component-heading: 1.0.19 => 1.0.20
- bpk-component-icon: 1.1.1 => 1.1.2
- bpk-component-input: 0.0.9 => 0.0.10
- bpk-component-label: 0.0.9 => 0.0.10
- bpk-component-link: 0.1.18 => 0.1.19
- bpk-component-list: 0.0.32 => 0.0.33
- bpk-component-logo: 1.0.2 => 1.0.3
- bpk-component-paragraph: 0.1.19 => 0.1.20
- bpk-component-radio: 0.0.9 => 0.0.10
- bpk-component-router-link: 0.1.18 => 0.1.19
- bpk-component-rtl-toggle: 0.0.2 => 0.0.3
- bpk-component-select: 0.0.9 => 0.0.10
- bpk-component-spinner: 1.0.2 => 1.0.3
- bpk-component-table: 0.0.32 => 0.0.33
- bpk-docs: 0.0.29 => 0.0.30
- bpk-stylesheets: 1.0.9 => 1.0.10
- bpk-svgs: 2.0.1 => 2.0.2

## 2016-09-21 (2) - Mixin option for opt-in RTL support for icons

**Added:**
- bpk-mixins: 5.1.0 => 5.2.0
  - New mixin `bpk-icon--rtl-support` for RTL support in icons

**The following packages received a patch bump due to the dependency changes above:**
- bpk-component-autosuggest: 0.0.6 => 0.0.7
- bpk-component-blockquote: 0.0.11 => 0.0.12
- bpk-component-button: 1.0.18 => 1.0.19
- bpk-component-checkbox: 0.0.8 => 0.0.9
- bpk-component-code: 0.0.11 => 0.0.12
- bpk-component-content-container: 1.0.2 => 1.0.3
- bpk-component-grid: 0.0.5 => 0.0.6
- bpk-component-grid-toggle: 0.0.17 => 0.0.18
- bpk-component-heading: 1.0.18 => 1.0.19
- bpk-component-icon: 1.1.0 => 1.1.1
- bpk-component-input: 0.0.8 => 0.0.9
- bpk-component-label: 0.0.8 => 0.0.9
- bpk-component-link: 0.1.17 => 0.1.18
- bpk-component-list: 0.0.31 => 0.0.32
- bpk-component-logo: 1.0.1 => 1.0.2
- bpk-component-paragraph: 0.1.18 => 0.1.19
- bpk-component-radio: 0.0.8 => 0.0.9
- bpk-component-router-link: 0.1.17 => 0.1.18
- bpk-component-rtl-toggle: 0.0.1 => 0.0.2
- bpk-component-select: 0.0.8 => 0.0.9
- bpk-component-spinner: 1.0.1 => 1.0.2
- bpk-component-table: 0.0.31 => 0.0.32
- bpk-docs: 0.0.28 => 0.0.29
- bpk-stylesheets: 1.0.8 => 1.0.9

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

**The following packages received a patch bump due to the dependency changes above:**
- bpk-component-autosuggest: 0.0.4 => 0.0.5
- bpk-component-button: 1.0.17 => 1.0.18
- bpk-component-checkbox: 0.0.7 => 0.0.8
- bpk-component-content-container: 1.0.1 => 1.0.2
- bpk-component-grid: 0.0.4 => 0.0.5
- bpk-component-grid-toggle: 0.0.16 => 0.0.17
- bpk-component-heading: 1.0.17 => 1.0.18
- bpk-component-icon: 1.0.0 => 1.0.1
- bpk-component-label: 0.0.7 => 0.0.8
- bpk-component-link: 0.1.16 => 0.1.17
- bpk-component-list: 0.0.30 => 0.0.31
- bpk-component-logo: 1.0.0 => 1.0.1
- bpk-component-paragraph: 0.1.17 => 0.1.18
- bpk-component-radio: 0.0.7 => 0.0.8
- bpk-component-router-link: 0.1.16 => 0.1.17
- bpk-component-spinner: 1.0.0 => 1.0.1
- bpk-docs: 0.0.26 => 0.0.27
- bpk-stylesheets: 1.0.7 => 1.0.8
- bpk-svgs: 2.0.0 => 2.0.1


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
