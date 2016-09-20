# bpk-component-spinner

> Backpack spinner components.

## Installation

```sh
npm install bpk-component-spinner --save
```

## Usage

```js
import React from 'react'
import TOKENS from 'bpk-tokens/tokens/base.common'
import { BpkSpinner, BpkLargeSpinner, BpkExtraLargeSpinner } from 'bpk-component-spinner'

export default MyComponent = () => (
  <div>
    <BpkSpinner color={TOKENS.colorWhite} />
    <BpkLargeSpinner color={TOKENS.colorGray700} />
    <BpkExtraLargeSpinner color={TOKENS.colorBlue500} />
  </div>
)
```

### Props

*BpkSpinner & BpkLargeSpinner:*

| Property      | PropType | Required | Default Value       |
| ------------- | -------- | -------- | ------------------- |
| fill          | string   | false    | TOKENS.colorGray700 |
| alignToButton | bool     | false    | false               |

*BpkExtraLargeSpinner:*

| Property      | PropType | Required | Default Value       |
| ------------- | -------- | -------- | ------------------- |
| fill          | string   | false    | TOKENS.colorGray700 |


