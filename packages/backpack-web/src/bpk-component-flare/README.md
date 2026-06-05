# bpk-component-flare

> Backpack example component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

Note that the default background color is white. You will need to apply a custom className if you wish to change this.

### React components

```js
import { BpkContentBubble } from '@skyscanner/backpack-web/bpk-component-flare';

export default MyComponent = () => (
  <div>
      <BpkContentBubble
      className="myCustomClassName"
      showPointer={false}
      rounded={false}
      content={...}
      />
  </div>
)
```

## Props

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/flare/web-hovv3Opv#section-props-cb).
