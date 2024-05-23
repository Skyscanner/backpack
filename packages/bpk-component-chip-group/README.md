# bpk-component-chip-group

> Backpack chip group component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

### BpkMultiSelectChipGroup

This is a multiselectable chip group without any built in state management. State of chips must be managed by the consumer as passed in through the `chips` prop, using the `onClick` property of each chip to detect interaction.

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

### BpkMultiSelectChipGroupState

Like a `BpkChipGroup` (multi-selectable) but with basic state management similar to above built in. The `selected` property of each `ChipItem` will affect **only the first render** as the state is managed within the component afterwards.

```tsx
const StatefulExample = () => (
  <BpkMultiSelectChipGroupState
    type={CHIP_GROUP_TYPES.rail}
    ariaLabel="Filter cities"
    leadingNudgerLabel="Scroll back"
    trailingNudgerLabel="Scroll forward"
    chips={[{
      text: 'London',
    }, {
      text: 'Berlin',
      selected: true,  // controls initial state only in BpkChipGroupState
    }, {
      text: 'New York',
    }]}
  />
);
```

### BpkSingleSelectChipGroup

This is a wrapper around a `BpkChipGroup` that only allows a single chip to be `selected`, determined by the `selectedIndex` prop. If no chips should appear selected, this should be `undefined`.

```tsx
const SingleSelectExample = () => (
  <BpkSingleSelectChipGroup
    chips={[
      {
        text: 'London',
      },
      {
        text: 'Berlin',
      },
      {
        text: 'New York',  // will show as selected
      }
    ]}
    selectedIndex={2}
    ariaLabel="Select a city"
  />
);
```

### BpkSingleSelectChipGroupState

A wrapper around `BpkSingleSelectChipGroup` that provides basic state management for selecting/deselecting a single chip in the group. The `initiallySelectedIndex` prop controls the chip that will be selected on **first render only**.

```tsx
const SingleSelectStateExample = () => (
  <BpkSingleSelectChipGroupState
    chips={[
      {
        text: 'London',
      },
      {
        text: 'Berlin',  // will start selected
      },
      {
        text: 'New York',
      }
    ]}
    initiallySelectedIndex={1}
    ariaLabel="Select a city"
  />
);
```


## Props

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/chip-group/web-4eQsMvYv).
