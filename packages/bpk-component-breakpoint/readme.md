# bpk-component-breakpoint

> Backpack breakpoint component.

## Installation

```sh
npm install bpk-component-breakpoint --save
```

## Usage

```js
import React from 'react';
import BpkBreakpoint, { BREAKPOINTS } from 'bpk-component-breakpoint';

export default MyComponent = () => (
  <BpkBreakpoint query={BREAKPOINTS.MOBILE}>
    {isActive => isActive ? 'Mobile viewport is active' : 'Mobile viewport is inactive'}
  </BpkBreakpoint>
);
```

### Props

| Property  | PropType           | Required | Default Value |
| --------- | ------------------ | -------- | ------------- |
| children  | node               | true     | -             |
| query     | oneOf(BREAKPOINTS) | true     | -             |
