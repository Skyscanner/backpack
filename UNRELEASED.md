# Unreleased

**Added:**
- bpk-component-tooltip:
  - Added the prop `renderTarget` to `BpkTooltipPortal` to allow rendering it inside any DOM element.

**Fixed:**
- bpk-component-badge:
  - Added a default font colour to badges to prevent the badge colour changing due to cascading styles.

**Breaking:**
- bpk-mixins:
- bpk-component-input: 
- bpk-component-fieldset:
    - `_forms.scss`:
        - Added `border-color` to `bpk-input--invalid` mixin for input fields to highlight red when there is an error on the input.
        - Updated `background` to `bpk-input--invalid` mixin for fields to change the color from white to red.

**Note**: The API hasn't changed, it's only breaking because it's a major visual change.