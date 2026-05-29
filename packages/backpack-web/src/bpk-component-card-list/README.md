# bpk-component-card-list

> Backpack card list component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

### BpkCardList

The `BpkCardList` component is a versatile list container that supports multiple layouts (`grid`, `stack`, `row`, `rail`) and accessories (`button`, `expand`, `pagination`). It can be customized for both desktop and mobile views.

#### 1. How to use the Expand mode

The `expand` accessory requires external state management to control the expand/collapse expandText. You can use `useState` to manage this.

##### Example:

```js
import { useState } from 'react';
import BpkCardList, {
  LAYOUTS,
  ACCESSORY_DESKTOP_TYPES,
  ACCESSORY_MOBILE_TYPES,
} from '@skyscanner/backpack-web/bpk-component-card-list';

export default () => {
  const [expandText, setExpandText] = useState('Show more');

  return (
    <BpkCardList
      title="We think you’ll like"
      description="Check out these destinations for a spring getaway"
      buttonContent="See more"
      cardList={[
        <div key="1">Card 1</div>,
        <div key="2">Card 2</div>,
        <div key="3">Card 3</div>,
      ]}
      layoutDesktop={LAYOUTS.grid}
      layoutMobile={LAYOUTS.stack}
      accessoryDesktop={ACCESSORY_DESKTOP_TYPES.expand}
      accessoryMobile={ACCESSORY_MOBILE_TYPES.expand}
      expandText={expandText}
      onExpandClick={() =>
        setExpandText(expandText === 'Show more' ? 'Show less' : 'Show more')
      }
    />
  );
};
```

---

#### 2. How to control rendering `headerButton` or regular `button`

The `shouldShowHeaderButton` function determines whether to render the `headerButton`. If `buttonContent` exists and `accessoryDesktop` or `accessoryMobile` is not set to `button`, the `headerButton` will be rendered.

##### Example:

```js
import BpkCardList, {
  LAYOUTS,
  ACCESSORY_DESKTOP_TYPES,
  ACCESSORY_MOBILE_TYPES,
} from '@skyscanner/backpack-web/bpk-component-card-list';

export default () => (
  <BpkCardList
    title="We think you’ll like"
    description="Check out these destinations for a spring getaway"
    buttonContent="See more"
    buttonHref="https://www.skyscanner.net"
    cardList={[
      <div key="1">Card 1</div>,
      <div key="2">Card 2</div>,
      <div key="3">Card 3</div>,
    ]}
    layoutDesktop={LAYOUTS.grid}
    layoutMobile={LAYOUTS.stack}
    accessoryDesktop={ACCESSORY_DESKTOP_TYPES.pagination} // header button
    accessoryMobile={ACCESSORY_MOBILE_TYPES.button} // button accessary
  />
);
```

---

#### 3. How to include SVGs inside the `button`

You can pass React nodes containing SVGs to the `buttonContent` property.

##### Example:

```js
import BpkCardList, {
  LAYOUTS,
} from '@skyscanner/backpack-web/bpk-component-card-list';

import {
  withButtonAlignment,
  withLargeButtonAlignment,
} from '@skyscanner/backpack-web/bpk-component-icon';
import BpkSmallFlightIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/flight';

const AlignedRtlSupportedBpkSmallFlightIcon = withButtonAlignment(
  withRtlSupport(BpkSmallFlightIcon),
);

export default () => (
  <BpkCardList
    title="We think you’ll like"
    description="Check out these destinations for a spring getaway"
    buttonContent={
      <span>
        <AlignedRtlSupportedBpkSmallFlightIcon /> See more
      </span>
    }
    cardList={[
      <div key="1">Card 1</div>,
      <div key="2">Card 2</div>,
      <div key="3">Card 3</div>,
    ]}
    layoutDesktop={LAYOUTS.grid}
    layoutMobile={LAYOUTS.stack}
  />
);
```

---

#### 4. How to set a minimum width for cards to prevent layout issues

You can use the `className` property to apply styles that set a minimum width for cards, ensuring the layout remains readable after resizing to a small window, especially for Carousel.

##### Example:

```scss
.bpk-card {
  min-width: $bpk-one-pixel-rem * 250;
}
```

Apply the class to the card, then input it into BpkCardList inside a list:

```js
import { BpkCard } from '@skyscanner/backpack-web/bpk-component-card';

export default () => (
  <BpkCardList
    title="We think you’ll like"
    description="Check out these destinations for a spring getaway"
    cardList={[
      <BpkCard key="1" className="bpk-card" href="/" padded={false}>
        <div>Card Content 1</div>
      </BpkCard>,
      <BpkCard key="2" className="bpk-card" href="/" padded={false}>
        <div>Card Content 2</div>
      </BpkCard>,
      <BpkCard key="3" className="bpk-card" href="/" padded={false}>
        <div>Card Content 3</div>
      </BpkCard>,
    ]}
    layoutDesktop={LAYOUTS.row}
    layoutMobile={LAYOUTS.rail}
    accessoryDesktop={ACCESSORY_DESKTOP_TYPES.pagination}
  />
);
```

---

#### 5. How to render `<a>` instead of `<button>` for the button

By setting `buttonHref`, you can force the button to render as a `<a>` element instead of an `<button>`. It is passed into BpkButton

##### Example:

```js
import BpkCardList, {
  LAYOUTS,
} from '@skyscanner/backpack-web/bpk-component-card-list';

export default () => (
  <BpkCardList
    title="We think you’ll like"
    description="Check out these destinations for a spring getaway"
    buttonContent="Click me"
    buttonHref="https://www.skyscanner.net" // without this, it's a <button>
    cardList={[
      <div key="1">Card 1</div>,
      <div key="2">Card 2</div>,
      <div key="3">Card 3</div>,
    ]}
    layoutDesktop={LAYOUTS.grid}
    layoutMobile={LAYOUTS.stack}
  />
);
```

#### 6. Example with Chip Group

You can include a chip group for filtering or categorizing items within the card list.

##### Example:

```js
import BpkCardList, {
  LAYOUTS,
} from '@skyscanner/backpack-web/bpk-component-card-list';
import BpkMultiSelectChipGroup from '@skyscanner/backpack-web/bpk-component-chip-group';

const [selectedIndex, setSelectedIndex] = useState(0);
const cardListsContent = [
  [
    <div key="1">City 1 - Card 1</div>,
    <div key="2">City 1 - Card 2</div>,
    <div key="3">City 1 - Card 3</div>,
  ],
  [
    <div key="1">City 2 - Card 1</div>,
    <div key="2">City 2 - Card 2</div>,
    <div key="3">City 2 - Card 3</div>,
  ],
  [
    <div key="1">City 3 - Card 1</div>,
    <div key="2">City 3 - Card 2</div>,
    <div key="3">City 3 - Card 3</div>,
  ],
];

export default () => (
  <BpkCardList
    title="We think you’ll like"
    description="Check out these destinations for a spring getaway"
    chipGroup={
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
            text: 'New York', // will show as selected initially
          },
        ]}
        selectedIndex={selectedIndex}
        ariaLabel="Select a city"
        onItemClick={(chip, selected, index) => {
          setSelectedIndex(selected ? index : 0);
        }}
      />
    }
    buttonContent="See more"
    cardList={cardListsContent[selectedIndex]}
    layoutDesktop={LAYOUTS.grid}
    layoutMobile={LAYOUTS.stack}
  />
);
```

#### Others

In theory, initiallyShownCardsDesktop can be set to 3.5 to display half of the fourth card, provided it aligns with the design requirements.