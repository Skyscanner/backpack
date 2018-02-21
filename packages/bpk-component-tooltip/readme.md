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
| popperModifiers       | object                                    | false    | null          |

### Prop Details

#### popperModifiers

Please refer to the [documentation](https://github.com/FezVrasta/popper.js/blob/v1.12.9/docs/_includes/popper-documentation.md#modifiers) for the underlying positioning library "popper.js". You can achieve various behaviours such as allowing the tooltip to overflow the viewport etc.
