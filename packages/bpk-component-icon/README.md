# bpk-component-icon

> Backpack icon components.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Basic usage

```js
import React from 'react';
import BpkSmallFlightIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/flight';
import BpkLargeAccessibilityIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/accessibility';

import './icons.scss';

export default () => (
  <div>
    <BpkSmallFlightIcon className="abc-icon__flight" />
    <BpkLargeAccessibilityIcon className="abc-icon__a11y" />
  </div>
);
```

*`icons.scss`:*
```scss
@import '~bpk-mixins/index.scss';

.abc-icon__flight {
  fill: currentColor; // see https://css-tricks.com/currentcolor/
}

.abc-icon__a11y {
  fill: $bpk-color-sky-blue;
}
```

### Aligning to BpkButton components

```js
import React from 'react';
import BpkButton from '@skyscanner/backpack-web/bpk-component-button';
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
    <BpkButton large>
      <AlignedBpkLargeAccessibilityIcon />
    </BpkButton>
  </div>
);
```

### RTL support

```js
import React from 'react';
import BpkSmallFlightIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/flight';
import { withRtlSupport } from '@skyscanner/backpack-web/bpk-component-icon';

import './icons.scss';

const RtlSupportedBpkSmallFlightIcon = withRtlSupport(BpkSmallFlightIcon);

export default () => (
  <RtlSupportedBpkSmallFlightIcon className="abc-icon__flight" />
);
```
