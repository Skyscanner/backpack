# bpk-component-logo

> Backpack logo component.

## Installation

```sh
npm install bpk-component-logo --save
```

## Usage

```js
import React from 'react'
import { colors } from 'bpk-tokens/tokens/base.es6'
import { BpkInlineLogo, BpkCloudLogo, BpkStackedLogo, BpkTianxunLogo, BpkTianxunStackedLogo } from 'bpk-component-logo'

export default MyComponent = () => (
  <div>
    <BpkInlineLogo fill={colors.colorWhite} />
    <BpkCloudLogo fill={colors.colorGray700} />
    <BpkStackedLogo fill={colors.colorBlue500} />
    <BpkTianxunLogo fill={colors.colorWhite} />
    <BpkTianxunStackedLogo fill={colors.colorGray700} />
  </div>
)
```

### Props

*BpkInlineLogo, BpkCloudLogo, BpkStackedLogo, BpkTianxunLogo & BpkTianxunStackedLogo:*

| Property | PropType | Required | Default Value        |
| -------- | -------- | -------- | -------------------- |
| fill     | string   | false    | TOKENS.colorGray700  |
| height   | string   | false    | null                 |
