# bpk-component-loading-button

> Backpack loading button component.

## Installation

```sh
npm install bpk-component-loading-button --save-dev
```

## Usage

```js
import React from 'react';
import BpkLoadingButton from 'bpk-component-loading-button';
import BaggageIcon from 'bpk-component-icon/sm/baggage';
import { withButtonAlignment, withRtlSupport } from 'bpk-component-icon';

const AlignedBaggageIcon = withButtonAlignment(withRtlSupport(BaggageIcon));
const icon = <AlignedBaggageIcon />;

export default () => (
  <div>
    <BpkLoadingButton>Primary</BpkLoadingButton>
    <BpkLoadingButton large>Large primary</BpkLoadingButton>
    <BpkLoadingButton selected>Selected</BpkLoadingButton>
    <BpkLoadingButton secondary>Secondary</BpkLoadingButton>
    <BpkLoadingButton iconOnly>
      <span className="visually-hidden">Search</span>
    </BpkLoadingButton>
    <BpkLoadingButton icon={icon} iconDisabled={icon}>Custom Icon</BpkLoadingButton>
  </div>
);
```

## Props

| Property     | PropType | Required | Default Value |
| ------------ | -------- | -------- | ------------- |
| children     | node     | true     | -             |
| className    | string   | false    | null          |
| disabled     | bool     | false    | false         |
| loading      | bool     | false    | false         |
| iconOnly     | bool     | false    | false         |
| icon         | element  | false    | null          |
| iconSelected | element  | false    | null          |
| iconDisabled | element  | false    | null          |
