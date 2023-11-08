# bpk-component-section-list

> Backpack section list component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import BpkSectionList, { BpkSectionListSection, BpkSectionListItem } from '@skyscanner/backpack-web/bpk-component-section-list';

export default () => (
  <BpkSectionList>
    <BpkSectionListSection headerText="Cities">
      <BpkSectionListItem>Tokyo</BpkSectionListItem>
      <BpkSectionListItem onClick={() => {}}>Rio de Janeiro</BpkSectionListItem>
      <BpkSectionListItem href="#">London</BpkSectionListItem>
    </BpkSectionListSection>
  </BpkSectionList>
);
```

## Props

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/section-list/web-rRcMai5c#section-props-0c).
