# bpk-scrim-utils

> Higher order component that adds a scrim behind components and manages scroll states

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

```js
import { withScrim } from '@skyscanner/backpack-web/bpk-scrim-utils';

const Box = props => (
  <div ref={props.dialogRef}>
    <BpkButton onClick={props.onClose}>Close</BpkButton>
    Hello
  </div>
);

const BoxWithScrim = withScrim(Box);
```