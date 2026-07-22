# bpk-component-chip-group

> Backpack chip group component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

### BpkMultiSelectChipGroup

This is a multiselectable chip group without any built in state management. State of chips must be managed by the consumer as passed in through the `chips` prop, using the `onClick` property of each chip to detect interaction. See [stories.tsx](/examples/bpk-component-chip-group/examples.tsx) for an example of how to manage state of chips.

```tsx
import BpkMultiSelectChipGroup, {
  BpkChipGroupState,
  BpkChipGroupSingleSelectState,
  CHIP_GROUP_TYPES,
  CHIP_COMPONENT,
} from '@skyscanner/backpack-web/bpk-component-chip-group';
import { CHIP_TYPES } from '@skyscanner/backpack-web/bpk-component-chip';
import { useState } from 'react';

const MainExample = () => (
  <BpkMultiSelectChipGroup
    type={CHIP_GROUP_TYPES.wrap}
    ariaLabel="Filter cities"
    chips={[{
      text: 'London',
    }, {
      text: 'Berlin',
      selected: true,  // must be managed by the consumer, see VerticalsExample
    }, {
      component: CHIP_COMPONENT.dropdown,
      text: 'More',
      accessibilityLabel: 'Show more filters',
      onClick: (selected) => console.log(`Open dropdown: ${selected}`),
    }]}
  />
);

const VerticalsExample = () => {
  const [route, setRoute] = useState('flights');

  return (
    <BpkMultiSelectChipGroup
      type={CHIP_GROUP_TYPES.rail}
      ariaLabel="Filter your search"
      ariaMultiselectable={false}
      leadingNudgerLabel="Scroll back"
      trailingNudgerLabel="Scroll forward"
      chips={[{
        text: 'Flights',
        selected: route === 'flights',
        onClick: () => setRoute('flights'),
      }, {
        text: 'Car Hire',
        selected: route === 'cars',
        onClick: () => setRoute('cars'),
      }, {
        text: 'Hotels',
        selected: route === 'hotels',
        onClick: () => setRoute('hotels'),
      }, {
        text: 'Trains',
        selected: route === 'trains',
        onClick: () => setRoute('trains'),
      }, {
        component: CHIP_COMPONENT.dropdown,
        text: 'More',
        accessibilityLabel: 'Show more filter options',
        onClick: (selected) => console.log(`Open dropdown: ${selected}`),
      }]}
    />
  );
};
```

### BpkSingleSelectChipGroup

This is a wrapper around a `BpkChipGroup` that only allows a single chip to be `selected`, determined by the `selectedIndex` prop. If no chips should appear selected, this should be `undefined`. State of selected chips should be managed using the `onItemClick` prop.

```tsx
const SingleSelectExample = () => {
  const [selectedIndex, setSelectedIndex] = useState(2);

  return (
    <BpkSingleSelectChipGroup
      type={CHIP_GROUP_TYPES.wrap}
      chips={[
        {
          text: 'London',
        },
        {
          text: 'Berlin',
        },
        {
          text: 'New York',  // will show as selected initially
        }
      ]}
      selectedIndex={selectedIndex}
      ariaLabel="Select a city"
      onItemClick={(chip, selected, index) => { setSelectedIndex(selected ? index : undefined) }}
    />
  );
};
```

## Anchoring a popover to a specific chip (`renderChip`)

By default the chip group renders each chip from the `chips` data array, and
those chips do not expose a ref — so a `BpkPopover` cannot anchor to an
individual chip. Use the optional `renderChip` render prop to take over
rendering of a chip slot and return your own element (e.g. a chip wrapped in a
`BpkPopover`). The group hands your function the computed `selected`, a pre-wired
`onClick` (which fires the item's `onClick(!selected, index)`), `chipStyle`,
`accessibilityLabel`, and `index`, so you don't rebuild the default bindings.

```tsx
import BpkMultiSelectChipGroup, {
  CHIP_GROUP_TYPES,
} from '@skyscanner/backpack-web/bpk-component-chip-group';
import { BpkDropdownChip } from '@skyscanner/backpack-web/bpk-component-chip';
import BpkPopover from '@skyscanner/backpack-web/bpk-component-popover';

import type { ChipItem, ChipRenderProps } from '@skyscanner/backpack-web/bpk-component-chip-group';

const chips: ChipItem[] = ['Flights', 'Hotels'].map((label, i) => ({
  text: label,
  renderChip: ({ accessibilityLabel, chipStyle, selected }: ChipRenderProps) => (
    <BpkPopover
      id={`popover-chip-${i}`}
      label={`${label} options`}
      labelAsTitle
      placement="bottom"
      closeButtonLabel={`Close ${label} options`}
      onClose={() => {}}
      target={
        <BpkDropdownChip
          accessibilityLabel={accessibilityLabel}
          type={chipStyle}
          selected={selected}
          onClick={() => {}}
        >
          {label}
        </BpkDropdownChip>
      }
    >
      Content for {label}
    </BpkPopover>
  ),
}));

<BpkMultiSelectChipGroup
  type={CHIP_GROUP_TYPES.wrap}
  chips={chips}
  ariaLabel="Select filters"
/>;
```

When `renderChip` is provided, the caller owns the returned element entirely —
including any accessibility attributes beyond those passed in `ChipRenderProps`.

## Props

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/chip-group/web-4eQsMvYv).
