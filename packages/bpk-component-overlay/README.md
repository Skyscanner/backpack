# bpk-component-overlay

> Backpack overlay component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import BpkText from '@skyscanner/backpack-web/bpk-component-text';
import BpkOverlay, { OVERLAY_TYPES } from '@skyscanner/backpack-web/bpk-component-overlay';

export default () => (
  <div>
    { /* Basic example with tint */}
    <BpkOverlay
      overlayType={OVERLAY_TYPES.solidLow}
    >
      <BpkText>Hotels in Canada</BpkText>
    </BpkOverlay>

    { /* With the tint invisible */}
    <BpkOverlay>
      <BpkText>Hotels in Canada</BpkText>
    </BpkOverlay>

    { /* With foreground content */}
    <BpkOverlay foregroundContent={<BpkText>Visit Ottawa</BpkText>}>
      <BpkImage
        altText="altText here"
        aspectRatio={16}
        src="" />
    </BpkOverlay>
  </div>
);
```

## Props

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/overlay/web-akXtflyq#section-props-bd).
