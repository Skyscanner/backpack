# bpk-component-icon

> Backpack icon component.

## Installation

```sh
npm install bpk-component-icon --save
```

> **Important:** This component needs Webpack's raw-loader as a devDependency:
```sh
npm install raw-loader --save-dev
```

## Usage

```js
import React from 'react'
import BpkIcon from 'bpk-component-icon'
import TOKENS from 'bpk-tokens/tokens/base.common'

export default MyComponent = () => (
  <BpkIcon icon='flight' color={TOKENS.colorBlue500} />
)
```

### Props

| Property      | PropType | Required | Default Value       |
| ------------- | -------- | -------- | ------------------- |
| icon          | string   | true     | -                   |
| large         | bool     | false    | -                   |
| color         | string   | false    | TOKENS.colorGray700 |
| alignToButton | bool     | false    | false               |
