# bpk-component-logo

> Backpack logo component.

## Installation

```sh
npm install bpk-component-logo --save
```

> **Important:** This component needs Webpack's raw-loader as a devDependency:
```sh
npm install raw-loader --save-dev
```

## Usage

```js
import React from 'react'
import BpkLogo from 'bpk-component-logo'
import TOKENS from 'bpk-tokens/tokens/base.common'

export default MyComponent = () => (
  <BpkLogo logo='inline' color={TOKENS.colorBlue500} />
)
```

### Props

| Property | PropType                                                   | Required | Default Value        |
| -------- | ---------------------------------------------------------- | -------- | -------------------- |
| logo     | 'inline', 'stacked', 'cloud', 'tianxun', 'tianxun-stacked' | true     | -                    |
| color    | string                                                     | false    | TOKENS.colorGray700  |
| height   | string                                                     | false    | null                 |
