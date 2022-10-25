# bpk-component-spinner

> Backpack spinner components.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import React from 'react';
import { BpkSpinner, BpkLargeSpinner, BpkExtraLargeSpinner, SPINNER_TYPES } from '@skyscanner/backpack-web/bpk-component-spinner';

export default () => (
  <div>
    <BpkSpinner type={SPINNER_TYPES.primary} />
    <BpkLargeSpinner type={SPINNER_TYPES.light} />
    <BpkExtraLargeSpinner type={SPINNER_TYPES.dark} />
  </div>
);
```

## Props

| Property | PropType                          | Required | Default Value |
| -------- | --------------------------------- | -------- | ------------- |
| type     | oneOf('primary', 'light', 'dark') | false    | 'dark'        |

> `BpkSpinner` & `BpkLargeSpinner` only

| Property      | PropType | Required | Default Value |
| ------------- | -------- | -------- | ------------- |
| alignToButton | bool     | false    | false         |

## Theme Props

* `spinnerPrimaryColor`
