# bpk-mixins

> Sass mixins and variables for Backpack.

## Usage

### node-sass
```scss
@import '~@skyscanner/backpack-web/bpk-mixins/index';

.bpk-my-component {
  @include bpk-button;
}
```

### sass or sass-embedded
```scss
@use '@skyscanner/backpack-web/bpk-mixins-next' as mixins;

.bpk-my-component {
  @include mixins.bpk-button;
}
```
