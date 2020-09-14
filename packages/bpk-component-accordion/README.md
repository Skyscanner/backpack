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

### Displaying icons

`BpkAccordionItem` supports the use of displaying icons alongside the title. To do this you will need to align your icon to the text using `withAlignment` and pass through the matching sizes for the icon you wish to use. For more information see [Alignment](https://backpack.github.io/components/alignment?platform=web)

```js
import React from 'react';
import { BpkAccordion, BpkAccordionItem } from 'bpk-component-accordion';
import { withAlignment } from 'bpk-component-icon';
import StopsIcon from 'bpk-component-icon/sm/stops';
import { lineHeightBase, iconSizeSm, colorPanjin } from 'bpk-tokens/tokens/base.es6';

const AlignedStopsIcon = withAlignment(StopsIcon, lineHeightBase, iconSizeSm);

<BpkAccordion>
  <BpkAccordionItem id="stops" title="Stops" icon={<AlignedStopsIcon fill={colorPanjin}/>}>
    My stops content.
  </BpkAccordionItem>
</BpkAccordion>

```

## Props

### BpkAccordion

| Property  | PropType | Required | Default Value |
| --------- | -------- | -------- | ------------- |
| children  | node     | true     | -             |
| className | string   | false    | null          |

### BpkAccordionItem

| Property  | PropType | Required | Default Value |
| --------- | -------- | -------- | ------------- |
| children  | node     | true     | -             |
| id        | string   | true     | -             |
| title     | string   | true     | -             |
| weight    | See prop details     | false    | WEIGHT_STYLES.regular         |
| expanded  | bool     | false    | false         |
| icon      | node     | false    | null          |
| onClick   | func     | false    | () => null    |
| tagName   | string   | false    | span          |
| textStyle | string   | false    | "base"        |

### withSingleItemAccordionState(BpkAccordion)

| Property                       | PropType | Required | Default Value |
| ------------------------------ | -------- | -------- | ------------- |
| ~~expanded~~ initiallyExpanded | bool     | false    | false         |

### withState(BpkAccordionItem)

| Property                       | PropType | Required | Default Value |
| ------------------------------ | -------- | -------- | ------------- |
| ~~expanded~~ initiallyExpanded | bool     | false    | false         |

## Prop Details

#### weight

This prop takes `WEIGHT_STYLES` that has been re-exported from `BpkText`. For valid options please refer to the [BpkText](https://backpack.github.io/components/text?platform=web#readme) docs.

## Theme Props

* `accordionColor`,
* `accordionHoverColor`,
* `accordionActiveColor`,
