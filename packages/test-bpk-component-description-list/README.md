# bpk-component-description-list

> Backpack description list component.

## Installation

```sh
npm install bpk-component-description-list --save-dev
```

## Usage

```js
import React from 'react';
import { BpkDescriptionList, BpkDescriptionTerm, BpkDescriptionDetails } from 'bpk-component-description-list';

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
