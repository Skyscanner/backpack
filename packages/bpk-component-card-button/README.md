# bpk-component-card-button

> Backpack card button component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

### BpkSaveButton

```js
import {
  BpkSaveButton,
  SIZE_TYPES,
  STYLE_TYPES
} from '@skyscanner/backpack-web/bpk-component-card-button';

export default () =>
  <BpkSaveButton
    checked={false}
    accessibilityLabel="Click to save"
    onCheckedChange={() => {
      console.log('save status changed!');
    }}
    size={SIZE_TYPES.small}
    style={STYLE_TYPES.contained}
  />;
```

## Props

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/card-button/web-l3E1ixIN#section-props-6c).
