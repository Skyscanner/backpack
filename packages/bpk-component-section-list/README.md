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