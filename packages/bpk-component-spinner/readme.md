# bpk-component-spinner

> Backpack spinner components.

## Installation

```sh
npm install bpk-component-spinner --save-dev
```

## Usage

```js
import React from 'react';
import { BpkSpinner, BpkLargeSpinner, BpkExtraLargeSpinner } from 'bpk-component-spinner';

import './spinners.scss';

export default () => (
  <div>
    <BpkSpinner className="abc-spinner" />
    <BpkLargeSpinner className="abc-spinner--large" />
    <BpkExtraLargeSpinner className="abc-spinner--extra-large" />
  </div>
);
```

*spinners.scss:*
```scss
@import '~bpk-mixins';

.abc-spinner {
  fill: $bpk-color-white;

  &--large {
    fill: $bpk-color-blue-500;
  }

  &--extra-large {
    fill: $bpk-color-gray-700;
  }
}
```

## Props

> `BpkSpinner` & `BpkLargeSpinner` only

| Property      | PropType | Required | Default Value       |
| ------------- | -------- | -------- | ------------------- |
| alignToButton | bool     | false    | false               |
