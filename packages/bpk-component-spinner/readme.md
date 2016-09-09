# bpk-component-spinner

> Backpack spinner component.

## Installation

```sh
npm install bpk-component-spinner --save
```

> **Important:** This component needs Webpack's raw-loader as a devDependency:
```sh
npm install raw-loader --save-dev
```

## Usage

```js
import React from 'react'
import BpkSpinner from 'bpk-component-spinner'
import TOKENS from 'bpk-tokens/tokens/base.common'

export default MyComponent = () => (
  <BpkSpinner large color={TOKENS.white} alignToButton />
)
```

### Props

| Property      | PropType | Required | Default Value       |
| ------------- | -------- | -------- | ------------------- |
| large         | bool     | false    | false               |
| extraLarge    | bool     | false    | false               |
| color         | string   | false    | TOKENS.colorGray700 |
| alignToButton | bool     | false    | false               |


