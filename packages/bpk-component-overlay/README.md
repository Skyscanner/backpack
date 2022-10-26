# bpk-component-overlay

> Backpack overlay component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import React from 'react';
import BpkText from '@skyscanner/backpack-web/bpk-component-text';
import BpkOverlay, { BORDER_RADIUS_STYLES, OVERLAY_TYPES } from '@skyscanner/backpack-web/bpk-component-overlay';

export default () => (
  <div>
    { /* Basic example */}
    <BpkOverlay>
      <BpkText>Hotels in Canada</BpkText>
    </BpkOverlay>

    { /* With the tint invisible */}
    <BpkOverlay overlayType={OVERLAY_TYPES.none}>
      <BpkText>Hotels in Canada</BpkText>
    </BpkOverlay>

    { /* With a border radius style */}
    <BpkOverlay borderRadiusStyle={BORDER_RADIUS_STYLES.sm}>
      <BpkText>Hotels in Canada</BpkText>
    </BpkOverlay>

    { /* With foreground content */}
    <BpkOverlay foregroundContent={<BpkText>Visit Ottawa</BpkText>}>
      <BpkText>Hotels in Canada</BpkText>
    </BpkOverlay>
  </div>
);
```

## Props

| Property  | PropType | Required | Default Value |
| --------- | -------- | -------- | ------------- |
| children | Node | true | - |
| borderRadiusStyle | oneOf(BORDER_RADIUS_STYLES.none, BORDER_RADIUS_STYLES.sm) | false | BORDER_RADIUS_STYLES.none |
| className | string | false | null |
| foregroundContent | Node | false | null |
| overlayType | oneOf(OVERLAY_TYPES) | false | OVERLAY_TYPES.tint |
