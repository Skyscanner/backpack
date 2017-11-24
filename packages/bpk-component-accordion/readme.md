# bpk-component-accordion

> Backpack accordion component.

## Installation

```sh
npm install bpk-component-accordion --save-dev
```

## Usage

### withSingleItemAccordionState(BpkAccordion)

The `withSingleItemAccordionState` higher-order component is used to limit one section to be expanded at any time.

```js
import React from 'react';
import { BpkAccordion, BpkAccordionItem, withSingleItemAccordionState } from 'bpk-component-accordion';

const SingleItemAccordion = withSingleItemAccordionState(BpkAccordion);

export default () => (
  <SingleItemAccordion>
    <BpkAccordionItem id="stops" title="Stops">
      My stops content.
    </BpkAccordionItem>
    <BpkAccordionItem id="departure-times" title="Departure times" initiallyExpanded>
      My departure times content.
    </BpkAccordionItem>
    <BpkAccordionItem id="journey-duration" title="Journey duration">
      My journey duration content.
    </BpkAccordionItem>
  </SingleItemAccordion>
)
```

### withAccordionItemState(BpkAccordionItem)

The `withAccordionItemState` higher-order component is used to allow multiple items to be expanded simultaneously.

```js
import React from 'react';
import { BpkAccordion, BpkAccordionItem, withAccordionItemState } from 'bpk-component-accordion';

const StatefulAccordionItem = withAccordionItemState(BpkAccordionItem);

export default () => (
  <BpkAccordion>
    <StatefulAccordionItem id="stops" title="Stops">
      My stops content.
    </StatefulAccordionItem>
    <StatefulAccordionItem id="departure-times" title="Departure times" initiallyExpanded>
      My departure times content.
    </StatefulAccordionItem>
    <StatefulAccordionItem id="journey-duration" title="Journey duration" initiallyExpanded>
      My journey duration content.
    </StatefulAccordionItem>
  </BpkAccordion>
)
```

## Props

### BpkAccordion

| Property  | PropType | Required | Default Value |
| --------- | -------- | -------- | ------------- |
| children  | node     | true     | -             |
| className | string   | false    | null          |

### BpkAccordionItem

| Property | PropType | Required | Default Value |
| -------- | -------- | -------- | ------------- |
| id       | string   | true     | -             |
| title    | string   | true     | -             |
| children | node     | true     | -             |
| expanded | bool     | false    | false         |
| onClick  | func     | false    | () => null    |

### withSingleItemAccordionState(BpkAccordion)

| Property                       | PropType | Required | Default Value |
| ------------------------------ | -------- | -------- | ------------- |
| ~~expanded~~ initiallyExpanded | bool     | false    | false         |

### withState(BpkAccordionItem)

| Property                       | PropType | Required | Default Value |
| ------------------------------ | -------- | -------- | ------------- |
| ~~expanded~~ initiallyExpanded | bool     | false    | false         |

## Theme Props

* `accordionColor`,
* `accordionHoverColor`,
* `accordionActiveColor`,
