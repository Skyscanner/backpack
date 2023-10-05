# bpk-component-list

> Backpack list component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
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

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/list/web-WFg1PM34#section-props-0a).
