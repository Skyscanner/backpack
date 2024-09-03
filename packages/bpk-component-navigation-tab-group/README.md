# bpk-component-navigation-tab-group

> Backpack navigation tab group component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

### BpkNavigationTabGroup

This is a NavigationTab Group that only allows a single tab to be `selected`, determined by the `selectedIndex` prop. State of selected tab should be managed using the `onItemClick` prop.

```tsx
import { withRtlSupport } from '../../packages/bpk-component-icon';
import Car from '../../packages/bpk-component-icon/sm/cars';
import Explore from '../../packages/bpk-component-icon/sm/explore';
import Flight from '../../packages/bpk-component-icon/sm/flight';
import Hotel from '../../packages/bpk-component-icon/sm/hotels';
import BpkNavigationTabGroup from '../../packages/bpk-component-navigation-tab-group';
import { NAVIGATION_TAB_GROUP_TYPES } from '../../packages/bpk-component-navigation-tab-group/src/BpkNavigationTabGroup';
import type { BpkNavigationTabGroupProps } from '../../packages/bpk-component-navigation-tab-group';

const exploreIcons = withRtlSupport(Explore);

const hotelIcons = withRtlSupport(Hotel);

const carIcons = withRtlSupport(Car);

const flightIcons = withRtlSupport(Flight);

const tabs: BpkNavigationTabGroupProps['tabs'] = [
  { text: 'Flights', href: '/', icon: flightIcons },
  { text: 'Hotels', href: '/hotel', icon: hotelIcons },
  { text: 'Car hire', href: '/carhire', icon: carIcons },
  { text: 'Explore', href: '/Explore', icon: exploreIcons },
];

export default () => (
  <BpkNavigationTabGroup
    tabs={tabs}
    onItemClick={() => {}}
    selectedIndex={0}
    type={NAVIGATION_TAB_GROUP_TYPES.SurfaceContrast}
    ariaLabel="Navigation tabs"
  />
);
```

## Props

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/navigation-tab-group/web-4eQsMvYv).
