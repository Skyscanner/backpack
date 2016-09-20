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
    <BpkInlineLogo color={TOKENS.colorWhite} />
    <BpkCloudLogo color={TOKENS.colorGray700} />
    <BpkStackedLogo color={TOKENS.colorBlue500} />
    <BpkTianxunLogo color={TOKENS.colorWhite} />
    <BpkTianxunStackedLogo color={TOKENS.colorGray700} />
  </div>
)
```

### Props

*BpkInlineLogo, BpkCloudLogo, BpkStackedLogo, BpkTianxunLogo & BpkTianxunStackedLogo:*

| Property | PropType | Required | Default Value        |
| -------- | -------- | -------- | -------------------- |
| color    | string   | false    | TOKENS.colorGray700  |
| height   | string   | false    | null                 |
