# bpk-component-accordion

> Backpack accordion component.

## Installation

```sh
npm install bpk-component-accordion --save
```

## Usage

```js
import React from 'react';
import { BpkAccordionContainer, BpkAccordionItem } from 'bpk-component-accordion';

export default () => (
  <BpkAccordionContainer>
    <BpkAccordionItem id="stops" title="Stops">
      My stops content.
    </BpkAccordionItem>
    <BpkAccordionItem id="departure-times" title="Departure times">
      My departure times content.
    </BpkAccordionItem>
    <BpkAccordionItem id="journey-duration" title="Journey duration">
      My journey duration content.
    </BpkAccordionItem>
  </BpkAccordionContainer>
)
```

### Props

#### BpkAccordionContainer

| Property      | PropType | Required | Default Value |
| ------------- | -------- | -------- | ------------- |
| allowMultiple | bool     | false    | false         |

#### BpkAccordion

| Property  | PropType | Required | Default Value |
| --------- | -------- | -------- | ------------- |
| children  | node     | true     | -             |
| className | string   | false    | null          |

#### BpkAccordionItem

| Property | PropType | Required | Default Value |
| -------- | -------- | -------- | ------------- |
| id       | string   | true     | -             |
| title    | string   | true     | -             |
| children | node     | true     | -             |
| expanded | bool     | false    | false         |
| onClick  | func     | false    | () => null    |
