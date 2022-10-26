# bpk-component-breakpoint

> Backpack breakpoint component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import React from 'react';
import BpkBreakpoint, { BREAKPOINTS } from '@skyscanner/backpack-web/bpk-component-breakpoint';

export default () => (
  <BpkBreakpoint query={BREAKPOINTS.MOBILE}>
    {isActive => (isActive ? <span>Mobile viewport is active</span> : <span>Mobile viewport is inactive</span>)}
  </BpkBreakpoint>

  <BpkBreakpoint query={BREAKPOINTS.TABLET}>
    <span>Tablet viewport is active</span>
  </BpkBreakpoint>
);
```

## Props

| Property  | PropType               | Required | Default Value |
| --------- | ---------------------- | -------- | ------------- |
| children  | oneOfType(node, func)  | true     | -             |
| query     | oneOf(BREAKPOINTS)     | true     | -             |
| legacy    | bool                   | false    | false         |
