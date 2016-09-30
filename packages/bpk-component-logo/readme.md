# bpk-component-logo

> Backpack logo component.

## Installation

```sh
npm install bpk-component-logo --save
```

## Usage

```js
import React from 'react'
import TOKENS from 'bpk-tokens/tokens/base.common'
import { BpkInlineLogo, BpkCloudLogo, BpkStackedLogo, BpkTianxunLogo, BpkTianxunStackedLogo } from 'bpk-component-logo'

export default MyComponent = () => (
  <div>
    <BpkInlineLogo fill={TOKENS.colorWhite} />
    <BpkCloudLogo fill={TOKENS.colorGray700} />
    <BpkStackedLogo fill={TOKENS.colorBlue500} />
    <BpkTianxunLogo fill={TOKENS.colorWhite} />
    <BpkTianxunStackedLogo fill={TOKENS.colorGray700} />
  </div>
)
```

### Props

*BpkInlineLogo, BpkCloudLogo, BpkStackedLogo, BpkTianxunLogo & BpkTianxunStackedLogo:*

| Property | PropType | Required | Default Value        |
| -------- | -------- | -------- | -------------------- |
| fill     | string   | false    | TOKENS.colorGray700  |
| height   | string   | false    | null                 |
