# bpk-component-breakpoint

> Backpack breakpoint component.

## Installation

```sh
npm install bpk-component-breakpoint --save-dev
```

## Usage

```js
import React from 'react';
import BpkBreakpoint, { BREAKPOINTS } from 'bpk-component-breakpoint';

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
