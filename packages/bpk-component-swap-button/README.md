# bpk-component-boilerplate

> Backpack example component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```ts
import BpkSwapButton from '@skyscanner/backpack-web/bpk-swap-button';

export default () =>
  <BpkSwapButton
    ariaLabel="Swap Button"
    ariaLiveTextProps="Swapped"
    onClick={() => {console.log('swap');
    }}
  />;
```
