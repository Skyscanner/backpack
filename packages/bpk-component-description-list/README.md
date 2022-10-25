# bpk-component-description-list

> Backpack description list component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import React from 'react';
import { BpkDescriptionList, BpkDescriptionTerm, BpkDescriptionDetails } from '@skyscanner/backpack-web/bpk-component-description-list';

export default () => (
  <BpkDescriptionList>
    <BpkDescriptionTerm>Apple</BpkDescriptionTerm>
    <BpkDescriptionDetails>A fruit</BpkDescriptionDetails>
  </BpkDescriptionList>
);
```

## Props

### BpkDescriptionList

| Property  | PropType | Required | Default Value |
| --------- | -------- | -------- | ------------- |
| children  | -        | true     | -             |
| className | string   | false    | null          |

### BpkDescriptionTerm

| Property  | PropType | Required | Default Value |
| --------- | -------- | -------- | ------------- |
| children  | -        | true     | -             |
| className | string   | false    | null          |

### BpkDescriptionDetails

| Property  | PropType | Required | Default Value |
| --------- | -------- | -------- | ------------- |
| children  | -        | true     | -             |
| className | string   | false    | null          |
