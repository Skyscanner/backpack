**Breaking:**

- bpk-component-breakpoint:
    - Updated the following `BREAKPOINTS`. If you are using any of the following breakpoints, please ensure your component still looks good with the new breakpoints.
        - `MOBILE`
        - `ABOVE_MOBILE`
        - `TABLET`
        - `TABLET_ONLY`
        - `ABOVE_TABLET`
        - `DESKTOP`

- bpk-component-rating:
   - Rating has been redesigned to have a fresh look.
   - `title` could be passed as string, image or component with high customize requirement.
   - `size` changes to distinguish style instead of font size.
       - `sm` deprecated.
       - `base` show default horizon style.
       - `lg` show vertical style.
   - New `showMaxValue` prop to show maximum rating value.
   - Remove `type`, which distinguish `pill` and `default` type.
   - Remove `vertical` as it's repetitive and it now is replaced by large `size`.
   - Update `ratingScale` default value from `zeroToTen` to `zeroToFive`.

**Added:**
- bpk-component-breakpoint:
    - Added the following new `BREAKPOINTS`:
        - `SMALL_MOBILE`
        - `SMALL_TABLET`
        - `SMALL_TABLET_ONLY`

**Fixed:**

bpk-component-mobile-scroll-container
- Fixed indicator style when scrollLeft of scrollerEl is a decimal value.
