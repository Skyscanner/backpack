# bpk-component-loading-button

> Backpack loading button component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import React from 'react';
import BpkLoadingButton from '@skyscanner/backpack-web/bpk-component-loading-button';
import BaggageIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/baggage';
import { withButtonAlignment, withRtlSupport } from '@skyscanner/backpack-web/bpk-component-icon';

const AlignedBaggageIcon = withButtonAlignment(withRtlSupport(BaggageIcon));
const icon = <AlignedBaggageIcon />;

export default () => (
  <div>
    <BpkLoadingButton>Primary</BpkLoadingButton>
    <BpkLoadingButton large>Large primary</BpkLoadingButton>
    <BpkLoadingButton secondary>Secondary</BpkLoadingButton>
    <BpkLoadingButton iconOnly>
      <span className="visually-hidden">Search</span>
    </BpkLoadingButton>
    <BpkLoadingButton icon={icon} iconDisabled={icon}>Custom Icon</BpkLoadingButton>
  </div>
);
```

## Props

| Property     | PropType             | Required | Default Value          |
| ------------ | -------------------- | -------- | ---------------------- |
| children     | node                 | true     | -                      |
| className    | string               | false    | null                   |
| disabled     | bool                 | false    | false                  |
| secondary    | bool                 | false    | false                  |
| destructive  | bool                 | false    | false                  |
| loading      | bool                 | false    | false                  |
| iconOnly     | bool                 | false    | false                  |
| icon         | element              | false    | null                   |
| iconDisabled | element              | false    | null                   |
| iconPosition | oneOf(ICON_POSITION) | false    | ICON_POSITION.TRAILING |
