# Unreleased

**Breaking:**
- bpk-component-select
  - Added a new class `bpk-select--invalid` to allow the field to highlight when the field is invalid
  - `_forms.scss`:
      - Added `border-color` to `bpk-select--invalid` mixin for select fields to highlight red when there is an error on the input.
      - Updated `background` to `bpk-select--invalid` mixin for fields to change the color from white to red.

**Note**: The API hasn't changed, it's only breaking because it's a major visual change.