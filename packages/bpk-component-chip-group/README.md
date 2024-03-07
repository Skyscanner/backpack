# bpk-component-chip-group

> Backpack chip group component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```tsx
import BpkChipGroup, { CHIP_GROUP_TYPES } from '@skyscanner/backpack-web/bpk-component-chip-group';
import BpkSelectableChip, { CHIP_TYPES, BpkDropdownChip } from '@skyscanner/backpack-web/bpk-component-chip';

export default () => (
  <BpkChipGroup
    type={CHIP_GROUP_TYPES.wrap}
    ariaLabel="Filter cities"
    chips={[{
      text: 'London',
    }, {
      text: 'Berlin',
      selected: true,
    }, {
      component: BpkDropdownChip,
      text: 'More',
      accessibilityLabel: 'Show more filters',
      onClick: (selected) => console.log(`Open dropdown: ${selected}`),
    }]}
    style={CHIP_TYPES.onDark}
  />
);
```

## Props

TODO: update to web tab
Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/chip-group/compose-LwGOKNct).
