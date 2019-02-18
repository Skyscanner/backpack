# Unreleased

**Added:**
- bpk-mixins:
  - Added a mixin for primary colour: `bpk-apply-primary-color-to`.
    ```scss
    @import '~bpk-mixins';

    .selector {
      // Instead of
      // color: $bpk-color-blue-500;
      @include bpk-apply-primary-color-to(color);
    }
    ```
