# bpk-component-icon

> Backpack icon components.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Basic usage

### Setting icon colour

Use the `fill` prop to set the icon colour directly. This is the recommended approach over using `className` with custom SCSS.

```js
import { textColors, coreColors } from '@skyscanner/bpk-foundations-web/tokens/base.es6';
import BpkSmallFlightIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/flight';
import BpkLargeAccessibilityIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/accessibility';

export default () => (
  <div>
    <BpkSmallFlightIcon fill={textColors.textPrimaryDay} />
    <BpkLargeAccessibilityIcon fill={coreColors.corePrimaryDay} />
  </div>
);
```

You can also use `currentColor` to inherit the colour from the parent element's `color` property:

```js
import BpkSmallFlightIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/flight';

export default () => (
  <span style={{ color: '#0770e3' }}>
    <BpkSmallFlightIcon fill="currentColor" />
  </span>
);
```

### Aligning to BpkButton components

```js
import { BpkButton, SIZE_TYPES } from '@skyscanner/backpack-web/bpk-component-button';
import BpkSmallFlightIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/flight';
import BpkLargeAccessibilityIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/accessibility';
import { withButtonAlignment, withLargeButtonAlignment } from '@skyscanner/backpack-web/bpk-component-icon';

const AlignedBpkSmallFlightIcon = withButtonAlignment(BpkSmallFlightIcon);
const AlignedBpkLargeAccessibilityIcon = withLargeButtonAlignment(BpkLargeAccessibilityIcon);

export default () => (
  <div>
    <BpkButton>
      <AlignedBpkSmallFlightIcon />
    </BpkButton>
    <BpkButton size={SIZE_TYPES.large}>
      <AlignedBpkLargeAccessibilityIcon />
    </BpkButton>
  </div>
);
```

### RTL support

```js
import { textColors } from '@skyscanner/bpk-foundations-web/tokens/base.es6';
import BpkSmallFlightIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/flight';
import { withRtlSupport } from '@skyscanner/backpack-web/bpk-component-icon';

const RtlSupportedBpkSmallFlightIcon = withRtlSupport(BpkSmallFlightIcon);

export default () => (
  <RtlSupportedBpkSmallFlightIcon fill={textColors.textPrimaryDay} />
);
```
