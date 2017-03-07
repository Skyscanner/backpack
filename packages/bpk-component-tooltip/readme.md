# bpk-component-tooltip

> Backpack tooltip component.

## Installation

```sh
npm install bpk-component-tooltip --save
```

## Usage

```js
import React, { Component } from 'react';
import BpkButton from 'bpk-component-button';
import BpkTooltip from 'bpk-component-tooltip';

const App = () => (
  <BpkTooltip
    id="my-tooltip"
    target={<BpkButton onClick={() => null}>Buy now!</BpkButton>}
  >
    Save up to 40%! 🤑
  </BpkTooltip>
);
```

### Props

| Property              | PropType                      | Required | Default Value |
| --------------------- | ----------------------------- | -------- | ------------- |
| id                    | string                        | true     | -             |
| children              | node                          | true     | -             |
| target                | element                       | true     | -             |
| tetherOptions         | See http://tether.io/#options | false    | { attachment: 'top center', constraints: [ { to: 'window', attachment: 'together', pin: true, }, ], } |
| padded                | bool                          | false    | true          |
