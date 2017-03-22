# bpk-component-cta-button

> Backpack CTA button component.

## Installation

```sh
npm install bpk-component-cta-button --save
```

## Usage

```js
import React from 'react';
import { withButtonAlignment } from 'bpk-component-icon';
import BaggageIcon from 'bpk-component-icon/sm/baggage';
import BpkCtaButton from 'bpk-component-cta-button';

const AlignedBaggageIcon = withButtonAlignment(BaggageIcon);
const icon = <AlignedBaggageIcon />;

export default () => (
  <div>
    <BpkCtaButton>Primary</BpkCtaButton>
    <BpkCtaButton large>Large primary</BpkCtaButton>
    <BpkCtaButton selected>Selected</BpkCtaButton>
    <BpkCtaButton secondary>Secondary</BpkCtaButton>
    <BpkCtaButton iconOnly>
      <span className="visually-hidden">Search</span>
    </BpkCtaButton>
    <BpkCtaButton
      icon={icon}
      iconDisabled={icon}
    >Custom Icon</BpkCtaButton>
  </div>
);
```

### Props

| Property     | PropType | Required | Default Value |
| ------------ | -------- | -------- | ------------- |
| children     | -        | true     | -             |
| href         | string   | false    | null          |
| className    | string   | false    | null          |
| disabled     | bool     | false    | false         |
| loading      | bool     | false    | false         |
| submit       | bool     | false    | false         |
| secondary    | bool     | false    | false         |
| destructive  | bool     | false    | false         |
| selected     | bool     | false    | false         |
| large        | bool     | false    | false         |
| link         | bool     | false    | false         |
| featured     | bool     | false    | false         |
| iconOnly     | bool     | false    | false         |
| onClick      | func     | false    | null          |
| icon         | element  | false    | null          |
| iconSelected | element  | false    | null          |
| iconDisabled | element  | false    | null          |
