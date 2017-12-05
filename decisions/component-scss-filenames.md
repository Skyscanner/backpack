# Component SCSS filenames

## Decision
SCSS files that contain the style of a given component should have the same name as the component JS file, but with the `.scss` extension. We currently have SCSS files that use dash case names like `bpk-button.scss` we agree to rename these when we change those files for other reasons.

## Examples

+ For `BpkCheckbox.js` the styles should be in `BpkCheckbox.scss`
+ For `BpkHorizontalNavItem.js` the styles should be in `BpkHorizontalNavItem.scss`

