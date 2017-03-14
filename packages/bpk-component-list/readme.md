# bpk-component-list

> Backpack list component.

## Installation

```sh
npm install bpk-component-list --save
```

## Usage

```js
import React from 'react';
import { BpkList, BpkListItem } from 'bpk-component-list';

export default () => (
  <BpkList>
    <BpkListItem>Apples</BpkListItem>
    <BpkListItem>
      Oranges
      <BpkList ordered>
        <BpkListItem>Tangerines</BpkListItem>
        <BpkListItem>Nectarines</BpkListItem>
        <BpkListItem>Satsuma</BpkListItem>
      </BpkList>
    </BpkListItem>
    <BpkListItem>Pears</BpkListItem>
  </BpkList>
);
```

### Props

*BpkList:*

| Property | PropType | Required | Default Value |
| -------- | -------- | -------- | ------------- |
| children | -        | true     | -             |
| ordered  | bool     | false    | false         |

*BpkListItem:*

| Property | PropType | Required | Default Value |
| -------- | -------- | -------- | ------------- |
| children | -        | true     | -             |
