# Unreleased

**Added:**
- bpk-component-tooltip:
  - Added the prop `renderTarget` to `BpkTooltipPortal` to allow rendering it inside any DOM element.

**Fixed:**
- bpk-component-badge:
  - Added a default font colour to badges to prevent the badge colour changing due to cascading styles.

**Breaking:**
- bpk-mixins:
    - Added `border-color` to input fields to highlight red when there is an error on the input
    - Updated `background` to change the color from white to red
    - Added `background-color` to set background to red and also add transparency to the field