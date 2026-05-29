# bpk-component-navigation-bar

> Backpack navigation bar component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

### BpkNavigationBar

```js
import ArrowIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/long-arrow-left';
import { withRtlSupport } from '@skyscanner/backpack-web/bpk-component-icon';

import BpkNavigationBar, { BpkNavigationBarIconButton, BpkNavigationBarButtonLink } from '@skyscanner/backpack-web/bpk-component-navigation-bar';

const ArrowIconWithRtl = withRtlSupport(ArrowIcon);

export default () => (
  <BpkNavigationBar
    title="Backpack"
    leadingButton={
      <BpkNavigationBarIconButton
        onClick={() => {}}
        icon={ArrowIconWithRtl}
        label="back"
      />
    }
    trailingButton={
      <BpkNavigationBarButtonLink onClick={() => {}}>Done</BpkNavigationBarButtonLink>
    }
  />
)
```

### BpkNavigationBarIconButton

```js
import ArrowIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/long-arrow-left';
import { BpkNavigationBarIconButton } from '@skyscanner/backpack-web/bpk-component-navigation-bar';

export default () => (
  <BpkNavigationBarIconButton
    onClick={() => {}}
    icon={ArrowIcon}
    label="back"
  />
)
```

### BpkNavigationBarButtonLink

```js
import { BpkNavigationBarButtonLink } from '@skyscanner/backpack-web/bpk-component-navigation-bar';

export default () => (
  <BpkNavigationBarButtonLink onClick={() => {}}>
    Done
  </BpkNavigationBarButtonLink>
)
```

## Props

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/navigation-bar/web-nBmynYpE#section-props-b0).
