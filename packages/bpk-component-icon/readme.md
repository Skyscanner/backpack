# bpk-component-icon

> Backpack icon components.

> **Note:** All icon components are generated using the [react-svg-loader cli](https://github.com/boopathi/react-svg-loader#cli) tool.
Whilst this alleviates the need to hand crank every component, it limits the ability to encapsulate styling options and
default fill color. See the examples below on how to overcome these limitations.  

## Installation

```sh
npm install bpk-component-icon --save
```

## Basic usage

```js
import React from 'react'
import { colors } from 'bpk-tokens/tokens/base.es6'
import BpkSmallFlightIcon from 'bpk-component-icon/sm/flight'
import BpkLargeAccessibilityIcon from 'bpk-component-icon/lg/accessibility'

export default MyComponent = () => (
  <div>
    <BpkSmallFlightIcon fill={colors.colorBlue500} />
    <BpkLargeAccessibilityIcon fill={colors.colorGray700} />
  </div>
)
```

> **Note:** Due to the way that they are generated, there are no prop types defined on any of the icon components. Any
props that you pass through will be rendered directly to the DOM.

## Aligning to BpkButton components

```js
import React from 'react'
import BpkButton from 'bpk-component-button'
import { colors } from 'bpk-tokens/tokens/base.es6'
import BpkSmallFlightIcon from 'bpk-component-icon/sm/flight'
import BpkLargeAccessibilityIcon from 'bpk-component-icon/lg/accessibility'
import { withButtonAlignment, withLargeButtonAlignment } from 'bpk-component-icon'

const AlignedBpkSmallFlightIcon = withButtonAlignment(BpkSmallFlightIcon)
const AlignedBpkLargeAccessibilityIcon = withLargeButtonAlignment(BpkLargeAccessibilityIcon)

export default MyComponent = () => (
  <BpkButton>
    <AlignedBpkSmallFlightIcon fill={colors.colorBlue500} />
    <AlignedBpkLargeAccessibilityIcon fill={colors.colorGray700} />
  </BpkButton>
)
```

## RTL support

```js
import React from 'react'
import BpkButton from 'bpk-component-button'
import { colors } from 'bpk-tokens/tokens/base.es6'
import BpkSmallFlightIcon from 'bpk-component-icon/sm/flight'
import { withRtlSupport } from 'bpk-component-icon'

const RtlSupportedBpkSmallFlightIcon = withRtlSupport(BpkSmallFlightIcon)

export default MyComponent = () => (
  <div>
    <RtlSupportedBpkSmallFlightIcon fill={colors.colorBlue500} />
  </div>
)
```
