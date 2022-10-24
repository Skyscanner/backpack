# bpk-component-grid

> Backpack grid components.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import React from 'react';
import { BpkGridContainer, BpkGridRow, BpkGridColumn } from '@skyscanner/backpack-web/bpk-component-grid';

export default () => (
  <BpkGridContainer>
    <BpkGridRow>
      <BpkGridColumn width={8} tabletWidth={12}>
        Search controls
      </BpkGridColumn>
      <BpkGridColumn width={4} tabletWidth={0}>
        MPU
      </BpkGridColumn>
    </BpkGridRow>
    <BpkGridRow>
      <BpkGridColumn width={12}>
        Provider logos
      </BpkGridColumn>
    </BpkGridRow>
    <BpkGridRow>
      <BpkGridColumn width={4} mobileWidth={12}>
        Content panel
      </BpkGridColumn>
      <BpkGridColumn width={4} mobileWidth={12}>
        Content panel
      </BpkGridColumn>
      <BpkGridColumn width={4} mobileWidth={12}>
        Content panel
      </BpkGridColumn>
    </BpkGridRow>
    <BpkGridRow>
      <BpkGridColumn width={3} tabletWidth={6} mobileWidth={12}>
        Confidence statement
      </BpkGridColumn>
      <BpkGridColumn width={3} tabletWidth={6} mobileWidth={12}>
        Confidence statement
      </BpkGridColumn>
      <BpkGridColumn width={3} tabletWidth={6} mobileWidth={12}>
        Confidence statement
      </BpkGridColumn>
      <BpkGridColumn width={3} tabletWidth={6} mobileWidth={12}>
        Confidence statement
      </BpkGridColumn>
    </BpkGridRow>
  </BpkGridContainer>
);
```

## Props

### BpkGridContainer

| Property  | PropType | Required | Default Value |
| --------- | -------- | -------- | ------------- |
| children  | node     | true     | -             |
| debug     | bool     | false    | false         |
| fullWidth | bool     | false    | false         |

### BpkGridRow

| Property  | PropType | Required | Default Value |
| --------- | -------- | -------- | ------------- |
| children  | node     | true     | -             |
| padded    | bool     | false    | true          |

### BpkGridColumn

| Property     | PropType | Required | Default Value |
| ------------ | -------- | -------- | ------------- |
| children     | node     | true     | -             |
| width        | number   | true     | -             |
| mobileWidth  | number   | false    | null          |
| tabletWidth  | number   | false    | null          |
| offset       | number   | false    | null          |
| mobileOffset | number   | false    | null          |
| tabletOffset | number   | false    | null          |
| padded       | bool     | false    | true          |
| debug        | bool     | false    | false         |
