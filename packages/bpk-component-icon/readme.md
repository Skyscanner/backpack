# bpk-component-icon

> Backpack icon components.

## Installation

```sh
npm install bpk-component-icon --save
```

## Usage

```js
import React from 'react'
import BpkSmallFlightIcon from 'bpk-component-icon/sm/flight'
import BpkLargeAccessibilityIcon from 'bpk-component-icon/lg/accessibility'
import TOKENS from 'bpk-tokens/tokens/base.common'

export default MyComponent = () => (
  <div>
    <BpkSmallFlightIcon fill={TOKENS.colorBlue500} />
    <BpkLargeAccessibilityIcon fill={TOKENS.colorGray700} />
  </div>
)
```

> Because of the way that they are generated, all props that are passed through to these components are rendered to the 
  DOM.
