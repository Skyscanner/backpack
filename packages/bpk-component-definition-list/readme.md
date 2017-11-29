# bpk-component-definition-list

> Backpack definition list component.

## Installation

```sh
npm install bpk-component-definition-list --save-dev
```

## Usage

```js
import React from 'react';
import { BpkDefinitionList, BpkDefinitionTerm, BpkDefinitionDescription } from 'bpk-component-definition-list';

export default () => (
  <BpkDefinitionList>
    <BpkDefinitionTerm>Apple</BpkDefinitionTerm>
    <BpkDefinitionDescription>A fruit</BpkDefinitionDescription>
  </BpkDefinitionList>
);
```

## Props

### BpkDefinitionList

| Property  | PropType | Required | Default Value |
| --------- | -------- | -------- | ------------- |
| children  | -        | true     | -             |
| className | string   | false    | null          |

### BpkDefinitionTerm

| Property  | PropType | Required | Default Value |
| --------- | -------- | -------- | ------------- |
| children  | -        | true     | -             |
| className | string   | false    | null          |

### BpkDefinitionDescription

| Property  | PropType | Required | Default Value |
| --------- | -------- | -------- | ------------- |
| children  | -        | true     | -             |
| className | string   | false    | null          |
