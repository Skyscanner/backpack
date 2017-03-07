# bpk-tether

> Wrapper around the Tether library, along with related utilities

## Installation

```sh
npm install bpk-tether --save
```

## Tether Wrapper

A wrapper around the [Tether](http://tether.io/) library which extends the `Tether` object to emit a `position` event.

### Usage

```js
import { Tether } from 'bpk-tether';

this.tether = new Tether({
  classPrefix: 'bpk-popover-tether',
  element: popoverElement,
  target: targetElement,
  tetherOptions: tetherOptions,
});

this.tether.on('position', position => console.log('Tether was repositioned', position));
```

## getArrowPositionCallback

When using Tether to create a popover or tooltip with an arrow pointing towards the target element, we want to have
this arrow point to the target element at all times. To achieve this, the `getArrowPositionCallback` function returns
a callback to be used on the `position` event. When invoked, it repositions the arrow element to stick to the target
element.

### Usage

```js
import { Tether } from 'bpk-tether';

const classPrefix = 'bpk-popover-tether';

this.tether = new Tether({
  classPrefix,
  element: tetherElement,
  target: targetElement,
  tetherOptions: tetherOptions,
});

this.tether.on('position', getArrowPositionCallback(tetherElement, 'arrow-id', classPrefix));
```
