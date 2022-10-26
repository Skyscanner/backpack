# bpk-component-tooltip

> Backpack tooltip component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import React, { Component } from 'react';
import BpkText from '@skyscanner/backpack-web/bpk-component-text';
import BpkTooltip from '@skyscanner/backpack-web/bpk-component-tooltip';

const App = () => (
  const targetRef = useRef(null);
  const target = (
    <div ref={targetRef} className={'my-tooltip-target'}>
      <BpkText textStyle="lg">LHR</BpkText>
    </div>
  );

  <BpkTooltip
    ariaLabel="London Heathrow"
    id="my-tooltip"
    target={target}
  >
    London Heathrow
  </BpkTooltip>
);
```

## Props

| Property              | PropType                                       | Required | Default Value       |
| --------------------- | ---------------------------------------------- | -------- | ------------------- |
| ariaLabel             | string                                         | true     | -                   |
| id                    | string                                         | true     | -                   |
| children              | node                                           | true     | -                   |
| target                | node                                           | true     | -                   |
| hideOnTouchDevices    | bool                                           | false    | true                |
| placement             | oneOf(['top', 'right', 'bottom', 'left'])      | false    | 'bottom'            |
| padded                | bool                                           | false    | true                |
| portalStyle           | object                                         | false    | null                |
| portalClassName       | string                                         | false    | null                |
| popperModifiers       | arrayOf(object)                                | false    | null                |
| renderTarget          | func                                           | false    | null                |
| type                  | oneOf(`TOOLTIP_TYPES.light`, `TOOLTIP_TYPES.dark`) | false    | `TOOLTIP_TYPES.light` |

### Prop Details

#### `ariaLabel`

Tooltips are invisible to assistive technologies such as screen readers. To improve accessibility, `ariaLabel` is required to describe the content of the tooltip to assistive technologies.

The label will be used on the `target` element, so any existing `aria-label` attached to `target` will be overridden.

#### `popperModifiers`

Please refer to the [documentation](https://popper.js.org/docs/v2/modifiers/) for the underlying positioning library "Popper.js". You can achieve various behaviours such as allowing the tooltip to overflow the viewport etc.

#### target

`target` should be a DOM element with a `ref` attached to it.
