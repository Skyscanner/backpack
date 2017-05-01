# bpk-component-icon

> Backpack icon components.

## Installation

```sh
npm install bpk-component-icon --save-dev
```

## Basic usage

```js
import React from 'react';
import BpkSmallFlightIcon from 'bpk-component-icon/sm/flight';
import BpkLargeAccessibilityIcon from 'bpk-component-icon/lg/accessibility';

import './icons.scss';

export default () => (
  <div>
    <BpkSmallFlightIcon className="abc-icon__flight" />
    <BpkLargeAccessibilityIcon className="abc-icon__a11y" />
  </div>
);
```

*icons.scss:*
```scss
@import '~bpk-mixins';

.abc-icon__flight {
  fill: $bpk-color-white;
}

.abc-icon__a11y {
  fill: $bpk-color-blue-500;
}
```

## Aligning to BpkButton components

```js
import React from 'react';
import BpkButton from 'bpk-component-button';
import BpkSmallFlightIcon from 'bpk-component-icon/sm/flight';
import BpkLargeAccessibilityIcon from 'bpk-component-icon/lg/accessibility';
import { withButtonAlignment, withLargeButtonAlignment } from 'bpk-component-icon';

import './icons.scss';

const AlignedBpkSmallFlightIcon = withButtonAlignment(BpkSmallFlightIcon);
const AlignedBpkLargeAccessibilityIcon = withLargeButtonAlignment(BpkLargeAccessibilityIcon);

export default () => (
  <div>
    <BpkButton>
      <AlignedBpkSmallFlightIcon className="abc-icon__flight" />
    </BpkButton>
    <BpkButton large>
      <AlignedBpkLargeAccessibilityIcon className="abc-icon__a11y" />
    </BpkButton>
  </div>
);
```

## RTL support

```js
import React from 'react';
import BpkSmallFlightIcon from 'bpk-component-icon/sm/flight';
import { withRtlSupport } from 'bpk-component-icon';

import './icons.scss';

const RtlSupportedBpkSmallFlightIcon = withRtlSupport(BpkSmallFlightIcon);

export default () => (
  <RtlSupportedBpkSmallFlightIcon className="abc-icon__flight" />
);
```
