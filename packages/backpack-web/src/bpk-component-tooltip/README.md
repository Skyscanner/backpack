# bpk-component-tooltip

> Backpack tooltip component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import { useRef } from 'react';
import BpkText from '@skyscanner/backpack-web/bpk-component-text';
import BpkTooltip from '@skyscanner/backpack-web/bpk-component-tooltip';

const App = () => (
  const targetRef = useRef(null);
  const target = (
    <div ref={targetRef} className={'my-tooltip-target'}>
      <BpkText textStyle="lg">LHR</BpkText>
    </div>
  );

  <BpkTooltip
    ariaLabel="London Heathrow"
    id="my-tooltip"
    target={target}
  >
    London Heathrow
  </BpkTooltip>
);
```

## Props

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/tooltip/web-drGKsdVv#section-props-7a).
