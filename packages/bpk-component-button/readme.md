# bpk-component-button

> Backpack button component.

## Installation

```sh
npm install bpk-component-button --save-dev
```

## Usage

```js
import React from 'react';
import { withButtonAlignment, withRtlSupport } from 'bpk-component-icon';
import ArrowIcon from 'bpk-component-icon/sm/long-arrow-right-alt';
import BpkButton from 'bpk-component-button';

const AlignedArrowIcon = withButtonAlignment(withRtlSupport(ArrowIcon));

export default () => (
  <div>
    <BpkButton>Primary</BpkButton>
    <BpkButton large>Large primary</BpkButton>
    <BpkButton selected>Selected</BpkButton>
    <BpkButton secondary>Secondary</BpkButton>
    <BpkButton link>Link</BpkButton>
    <BpkButton iconOnly>
      <AlignedArrowIcon fill="white" />
      <span className="visually-hidden">Search</span>
    </BpkButton>
  </div>
);
```

### Props

| Property    | PropType | Required | Default Value |
| ----------- | -------- | -------- | ------------- |
| children    | -        | true     | -             |
| href        | string   | false    | null          |
| className   | string   | false    | null          |
| disabled    | bool     | false    | false         |
| submit      | bool     | false    | false         |
| secondary   | bool     | false    | false         |
| destructive | bool     | false    | false         |
| selected    | bool     | false    | false         |
| large       | bool     | false    | false         |
| link        | bool     | false    | false         |
| featured    | bool     | false    | false         |
| iconOnly    | bool     | false    | false         |
| onClick     | func     | false    | null          |
