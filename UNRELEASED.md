**Breaking:**

## bpk-component-rating:
 > Currently, the implementation of Rating component in backpack is based on the deprecated design, which means it's not used for any public facing microsites, such as Hotels website, Banana, Hercules, etc. Therefore, we'd like to refresh `bpk-component-rating` to realize a new design in the backpack, so that we can maintain a consistent traveller experience of the hotels product in each verticals.

### What's change
 - Update `bpk-component-rating` to meet public microsites design.
 - Retain `ariaLabel`, `value`, `title`, `subtitle`, and `size`.
    - For `title`, it can also pass string, image and component with high customize requirement.
    - For `size`, it deprecate `sm` and support `base` which is default style and `lg` which show vertical style.
 - Add `showMaxValue` to support show max rating value, it would show maximum scale value along aside by value with '/' oblique line.
 - Remove `type` which distinguish `pill` and `default` type, as there is no `pill` in new design.
 - Remove `vertical` as it's repetitive and can be replaced by large `size`.
 - Update `ratingScale` from `zeroToTen` to `zeroToFive` to meet production scenario.