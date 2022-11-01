# bpk-component-list

> Backpack list component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import React from 'react';
import { BpkList, BpkListItem } from '@skyscanner/backpack-web/bpk-component-list';

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

## Props

### BpkList

| Property       | PropType | Required | Default Value |
| -------------- | -------- | -------- | ------------- |
| children       | -        | true     | -             |
| ordered        | bool     | false    | false         |
| className      | string   | false    | null          |
| ariaLabel      | string   | false    | null          |
| ariaLabelledby | string   | false    | null          |
| title          | string   | false    | null          |

### BpkListItem

| Property  | PropType | Required | Default Value |
| --------- | -------- | -------- | ------------- |
| children  | -        | true     | -             |
| className | string   | false    | null          |
