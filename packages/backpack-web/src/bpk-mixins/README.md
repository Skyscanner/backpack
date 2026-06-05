# bpk-mixins

> Sass mixins and variables for Backpack.

## Usage

### node-sass
```scss
@import '~@skyscanner/backpack-web/bpk-mixins';

.bpk-my-component {
  @include bpk-button;
}
```

### sass or sass-embedded

With modern tooling we recommend that you use granular import
```scss
@use '@skyscanner/backpack-web/bpk-mixins/buttons';

.bpk-my-component {
  @include buttons.bpk-button;
}
```
