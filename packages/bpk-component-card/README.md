# bpk-component-card

> Backpack card component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

### BpkCard

```tsx
import BpkCard from '@skyscanner/backpack-web/bpk-component-card';

export default () => (
  <BpkCard>
    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
    ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis
    parturient montes, nascetur ridiculus mus.
  </BpkCard>
);
```

### BpkDividedCard

```tsx
import {
  BpkDividedCard,
  ORIENTATION,
} from '@skyscanner/backpack-web/bpk-component-card';

export default () => (
  <>
    <BpkDividedCard
      primaryContent={<span>foo</span>}
      secondaryContent={<span>bar</span>}
      orientation={ORIENTATION.vertical}
    />
    // Toggle shadow shadow with isElevated
    <BpkDividedCard
      primaryContent={<span>foo</span>}
      secondaryContent={<span>bar</span>}
      orientation={ORIENTATION.horizontal}
      isElevated={false}
    />
  </>
);
```

### BpkCardWrapper

```tsx
import { BpkCardWrapper } from '@skyscanner/backpack-web/bpk-component-card';
import { coreAccentDay } from '@skyscanner/bpk-foundations-web/tokens/base.es6';
import BpkCard from '@skyscanner/backpack-web/bpk-component-card';

export default () => (
  <BpkCardWrapper
    header={<span>Hoc header</span>}
    card={
      <BpkCard>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus.
      </BpkCard>
    }
    backgroundColor={coreAccentDay}
  />
);
```

## Props

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/card/web-h8uWtPZZ#section-props-64).
