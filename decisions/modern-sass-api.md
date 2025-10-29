# Transition to modern Sass API

## Decision
Backpack has completed its migration from the legacy Sass API to the **modern Sass API** to align with **Dart Sass** and **sass-embedded**. The old `bpk-mixins` package using `@import` has been deprecated and removed. Backpack now ships with a single, unified modern package:

* The new `bpk-mixins` package (`packages/bpk-mixins`) uses the modern Sass API and `@use` syntax, and is no longer compatible with `node-sass`.
* Component usage guidelines:
  * All components should now use the new `bpk-mixins` package.
  * All mixins must be imported using the `@use` rule.
  * Mixins should be imported **granularly**—only include the partials you actually need.
* Adding or modifying a mixin:
  * To add or modify a mixin, make the changes in `packages/bpk-mixins`.

## Examples

**Wrong (1)**
```scss
// BpkAwesomeComponent.module.scss
@use '../bpk-mixins' as mixins;

.bpk-awesome-component {
  margin-right: mixins.bpk-spacing-md();
}
```
Reason: You should import specific mixin modules, not the entire package.

**Wrong (2)**
```scss
// BpkAwesomeComponent.module.scss
@import '../bpk-mixins';

.bpk-awesome-component {
  margin-right: bpk-spacing-md();
}
```
Reason: `@import` is deprecated and no longer supported.

**Correct**
```scss
// BpkAwesomeComponent.module.scss
@use '../bpk-mixins/tokens';

.bpk-awesome-component {
  margin-right: tokens.bpk-spacing-md();
}
```

## Purpose of this change

The goal of this update is to:
* Fully adopt the modern Sass API (`@use` / `@forward`).
* Improve modularity and build performance.

## Anything Else
https://sass-lang.com/documentation/at-rules/use/#differences-from-import
