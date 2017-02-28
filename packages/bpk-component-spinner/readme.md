# bpk-component-spinner

> Backpack spinner components.

## Installation

```sh
npm install bpk-component-spinner --save
```

## Usage

```js
import React from 'react';
import { colors } from 'bpk-tokens/tokens/base.es6';
import { BpkSpinner, BpkLargeSpinner, BpkExtraLargeSpinner } from 'bpk-component-spinner';

export default MyComponent = () => (
  <div>
    <BpkSpinner fill={colors.colorWhite} />
    <BpkLargeSpinner fill={colors.colorGray700} />
    <BpkExtraLargeSpinner fill={colors.colorBlue500} />
  </div>
);
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
