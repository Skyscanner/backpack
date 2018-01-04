# bpk-component-tooltip

> Backpack tooltip component.

## Installation

```sh
npm install bpk-component-tooltip --save-dev
```

## Usage

```js
import React, { Component } from 'react';
import BpkText from 'bpk-component-text';
import BpkTooltip from 'bpk-component-tooltip';

const App = () => (
  <BpkTooltip
    id="my-tooltip"
    target={<BpkText textStyle="lg">LHR</BpkText>}
  >
    London Heathrow
  </BpkTooltip>
);
```

## Props

| Property              | PropType                                  | Required | Default Value |
| --------------------- | ----------------------------------------- | -------- | ------------- |
| id                    | string                                    | true     | -             |
| children              | node                                      | true     | -             |
| target                | node                                      | true     | -             |
| hideOnTouchDevices    | bool                                      | false    | true          |
| placement             | oneOf(['top', 'right', 'bottom', 'left']) | false    | 'bottom'      |
| padded                | bool                                      | false    | true          |
| portalStyle           | object                                    | false    | null          |
| portalClassName       | string                                    | false    | null          |
