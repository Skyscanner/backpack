# bpk-component-button

> Backpack button component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import { withButtonAlignment, withRtlSupport } from '@skyscanner/backpack-web/bpk-component-icon';
import ArrowIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/long-arrow-right';
import { BpkButtonV2, BUTTON_TYPES, SIZE_TYPES } from '@skyscanner/backpack-web/bpk-component-button';

const AlignedArrowIcon = withButtonAlignment(withRtlSupport(ArrowIcon));

export default () => (
  <div>
    <BpkButtonV2>Primary</BpkButtonV2>
    <BpkButtonV2 size={SIZE_TYPES.large}>Large primary</BpkButtonV2>
    <BpkButtonV2 type={BUTTON_TYPES.secondary}>Secondary</BpkButtonV2>
    <BpkButtonV2 type={BUTTON_TYPES.secondaryOnDark}>SecondaryOnDark</BpkButtonV2>
    <BpkButtonV2 type={BUTTON_TYPES.link}>Link</BpkButtonV2>
    <BpkButtonV2 type={BUTTON_TYPES.linkOnDark}>LinkOnDark</BpkButtonV2>
    <BpkButtonV2 type={BUTTON_TYPES.primaryOnDark}>PrimaryOnDark</BpkButtonV2>
    <BpkButtonV2 type={BUTTON_TYPES.primaryOnLight}>PrimaryOnLight</BpkButtonV2>
    <BpkButtonV2 iconOnly>
      <AlignedArrowIcon />
      <span className="visually-hidden">Search</span>
    </BpkButtonV2>
  </div>
);
```

## Props

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/button/web-eI5EFTLO#section-button-props-48).
