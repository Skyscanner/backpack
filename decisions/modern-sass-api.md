# Transition to modern SASS API

## Decision
Backpack is transforming the way it works with SASS to align with modern SASS API used in
dart-sass and sass-embedded. Old API remains the default option, but at some point of time
in the future we will switch the default API to the new one

* Backpack is shipped with two versions of `bpk-mixins` package
  * `packages/bpk-mixins` that remains the stable option. It uses old SASS API and `@import` syntax
  * `packages/unstable__bpk-mixins` is a modern SASS API version compatible with `sass` and `sass-embedded` packages, but not with `node-sass`
* In the future the package using Old API will be deprecated and removed and the one using New API will be promoted to stable
* For our own components we use `unstable__bpk-mixins`
  * These mixins must be imported with `@use` at-rule
  * Mixins partials must be used in a granular way (use only those partials that you need to build a particular component, see "Wrong" and "Correct" examples below)
* If you need to add or modify a mixin, do it in `packages/bpk-mixins`. Then run `npm run unstable__bpk-mixins` to generate a new modern version of the package

## Examples

**Wrong (1)**
```
// BpkAwesomeComponent.module.scss

@use '../unstable__bpk-mixins' as mixins;

.bpk-awesome-component {
  margin-right: mixins.bpk-spacing-md();
}
```

**Wrong (2)**
```
// BpkAwesomeComponent.module.scss

@import '../bpk-mixins';

.bpk-awesome-component {
  margin-right: bpk-spacing-md();
}
```

**Correct**
```
// BpkAwesomeComponent.module.scss

@use '../unstable__bpk-mixins/tokens';

.bpk-awesome-component {
  margin-right: tokens.bpk-spacing-md();
}
```

## Thinking

The main reason behind such a change is to deliver modern API to consumers in a non-breaking manner. Using `unstable` prefix
means that we can't guarantee that this package structure won't change before becoming stable.

## Anything Else

https://sass-lang.com/documentation/at-rules/use/#differences-from-import
