**Breaking:**

- bpk-component-rating:
   - Rating has been redesigned to have a fresh look.
   - `title` could be passed as string, image or component with high customize requirement.
   - `size` changes to distinguish style instead of font size.
       - `sm` deprecated.
       - `base` show default horizon style.
       - `lg` show vertical style.
   - New `showScale` prop to show maximum scale of rating value.
   - Remove `type`, which distinguish `pill` and `default` type.
   - Remove `vertical` as it's repetitive and it now is replaced by large `size`.
   - Update `ratingScale` default value from `zeroToTen` to `zeroToFive`.