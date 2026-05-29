# bpk-component-checkbox

> Backpack checkbox component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import BpkCheckbox from '@skyscanner/backpack-web/bpk-component-checkbox';

export default () => (
  <BpkCheckbox
    name="prefer-directs"
    onChange={() => console.log('prefer directs changed!')}
    label="Prefer directs"
    checked
  />
);
```

## Props

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/checkbox/web-iTrW8zds#section-props-73).

---

## BpkCheckboxV2 (experimental)

A composable checkbox built on [Ark UI](https://ark-ui.com/). Usage is split across slot components: `Root`, `Control`, `Indicator`, `Label`, and `HiddenInput`.

> **RTL support:** `BpkCheckboxV2` is built on Ark UI and requires [`BpkProvider`](https://www.skyscanner.design/latest/components/layout/web) from `@skyscanner/backpack-web/bpk-component-layout` for correct RTL layout. Wrap your application (or the relevant subtree) with `<BpkProvider>`.
